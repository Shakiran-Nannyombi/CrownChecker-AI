/**
 * Canvas-drawn makeup filters using MediaPipe FaceLandmarker 478-point mesh.
 * All coordinates are normalised (0-1); scale by W/H before drawing.
 */

type Lm = { x: number; y: number; z: number };
type Pt = { x: number; y: number };

/* ─── Coordinate helpers ─────────────────────────────────────────── */
const toPt = (lm: Lm, W: number, H: number, isFront: boolean): Pt => ({
  x: (isFront ? 1 - lm.x : lm.x) * W,
  y: lm.y * H,
});
const pts = (idx: number[], lm: readonly Lm[], W: number, H: number, f: boolean): Pt[] =>
  idx.map((i) => toPt(lm[i], W, H, f));

const avg = (arr: Pt[]): Pt => ({
  x: arr.reduce((s, p) => s + p.x, 0) / arr.length,
  y: arr.reduce((s, p) => s + p.y, 0) / arr.length,
});

/* smooth path through points using quad-bezier midpoint technique */
function smoothPath(ctx: CanvasRenderingContext2D, p: Pt[], closed = false) {
  if (p.length < 2) return;
  ctx.moveTo(p[0].x, p[0].y);
  for (let i = 0; i < p.length - 1; i++) {
    const mx = (p[i].x + p[i + 1].x) / 2;
    const my = (p[i].y + p[i + 1].y) / 2;
    ctx.quadraticCurveTo(p[i].x, p[i].y, mx, my);
  }
  if (closed) ctx.closePath();
  else ctx.lineTo(p[p.length - 1].x, p[p.length - 1].y);
}

function lighten(hex: string, pct: number) { return adjustBrightness(hex, pct); }
function darken(hex: string, pct: number)  { return adjustBrightness(hex, -pct); }
function adjustBrightness(hex: string, pct: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, ((n >> 16) & 255) + pct * 2.5));
  const g = Math.min(255, Math.max(0, ((n >>  8) & 255) + pct * 2.5));
  const b = Math.min(255, Math.max(0, (n         & 255) + pct * 2.5));
  return `rgb(${r | 0},${g | 0},${b | 0})`;
}

/* ─── Landmark index maps ────────────────────────────────────────── */
// Eyebrows  (upper/lower edge points, inner→outer)
const R_BROW_UP = [70,  63,  105, 66,  107];
const R_BROW_LO = [46,  53,  52,  65,  55 ];
const L_BROW_UP = [300, 293, 334, 296, 336];
const L_BROW_LO = [276, 283, 282, 295, 285];

// Upper eyelid (inner → outer corner), used for lash placement
const R_LID = [33,  246, 161, 160, 159, 158, 157, 173, 133];
const L_LID = [362, 466, 388, 387, 386, 385, 384, 398, 263];

// Lip outer contour (clockwise from left corner)
const LIP_OUT = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291,
                 375, 321, 405, 314, 17, 84, 181, 91, 146];
// Lip inner contour (mouth opening)
const LIP_IN  = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308,
                 324, 318, 402, 317, 14, 87, 178, 88,  95];

/* ═══════════════════════════════════════════════════════════════════
   1. EYEBROWS
   ═══════════════════════════════════════════════════════════════════ */
export type BrowStyle = "natural" | "bold" | "arched" | "feathered";

export function drawEyebrows(
  ctx: CanvasRenderingContext2D,
  lm: readonly Lm[], W: number, H: number, isFront: boolean,
  color: string, style: BrowStyle,
) {
  const brows = [
    { upper: pts(R_BROW_UP, lm, W, H, isFront), lower: pts(R_BROW_LO, lm, W, H, isFront) },
    { upper: pts(L_BROW_UP, lm, W, H, isFront), lower: pts(L_BROW_LO, lm, W, H, isFront) },
  ];

  ctx.save();

  for (const { upper, lower } of brows) {
    const thickness = Math.abs(upper[2].y - lower[2].y);

    if (style === "natural" || style === "bold") {
      /* thickness multiplier — bold is 1.6× thicker */
      const tm = style === "bold" ? 1.6 : 1.0;
      const top = upper.map((p) => ({ x: p.x, y: p.y - thickness * (tm - 1) * 0.5 }));

      ctx.beginPath();
      smoothPath(ctx, top);
      for (let i = lower.length - 1; i >= 0; i--) ctx.lineTo(lower[i].x, lower[i].y);
      ctx.closePath();

      const grad = ctx.createLinearGradient(top[0].x, 0, top[top.length - 1].x, 0);
      grad.addColorStop(0,    darken(color, 20));
      grad.addColorStop(0.15, color);
      grad.addColorStop(0.85, color);
      grad.addColorStop(1,    darken(color, 20));
      ctx.fillStyle = grad;
      ctx.globalAlpha = style === "bold" ? 0.92 : 0.80;
      ctx.fill();

    } else if (style === "arched") {
      /* boost the centre point upward for a dramatic arch */
      const arched = upper.map((p, i) => ({
        x: p.x,
        y: p.y - thickness * (i === 2 ? 1.6 : i === 1 || i === 3 ? 0.9 : 0.3),
      }));
      ctx.beginPath();
      smoothPath(ctx, arched);
      for (let i = lower.length - 1; i >= 0; i--) ctx.lineTo(lower[i].x, lower[i].y);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.88;
      ctx.fill();

    } else if (style === "feathered") {
      /* individual hair stroke technique */
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      for (let i = 0; i < upper.length; i++) {
        const u = upper[i];
        const l = lower[Math.min(i, lower.length - 1)];
        const strands = 5;
        for (let s = 0; s < strands; s++) {
          const t   = s / strands;
          const sx  = u.x + (l.x - u.x) * t + (s - strands / 2) * 0.8;
          const sy  = u.y + (l.y - u.y) * t;
          const ex  = sx + (Math.sin(i + s) * 1.5);
          const ey  = sy - thickness * (0.6 + t * 0.25);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = 0.55 + t * 0.25;
          ctx.stroke();
        }
      }
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

/* ═══════════════════════════════════════════════════════════════════
   2. EYELASHES
   ═══════════════════════════════════════════════════════════════════ */
export type LashStyle = "natural" | "dramatic" | "wispy" | "cat-eye";

export function drawEyelashes(
  ctx: CanvasRenderingContext2D,
  lm: readonly Lm[], W: number, H: number, isFront: boolean,
  style: LashStyle,
) {
  const eyes: Pt[][] = [
    pts(R_LID, lm, W, H, isFront),
    pts(L_LID, lm, W, H, isFront),
  ];

  ctx.save();
  ctx.strokeStyle = "#0a0a0a";
  ctx.lineCap     = "round";

  for (let e = 0; e < 2; e++) {
    const lid = eyes[e];
    const eyeW = Math.abs(lid[lid.length - 1].x - lid[0].x);

    /* thick base line along lid */
    ctx.beginPath();
    smoothPath(ctx, lid);
    ctx.lineWidth   = eyeW * 0.055;
    ctx.globalAlpha = 0.95;
    ctx.stroke();

    /* individual lash spikes */
    for (let i = 0; i < lid.length; i++) {
      const p = lid[i];
      const t = i / (lid.length - 1); // 0 = inner corner, 1 = outer corner

      /* tangent direction along the lid */
      const prev  = lid[Math.max(0, i - 1)];
      const next  = lid[Math.min(lid.length - 1, i + 1)];
      const dx    = next.x - prev.x;
      const dy    = next.y - prev.y;
      const dlen  = Math.sqrt(dx * dx + dy * dy) || 1;
      /* outward normal (upward from lid) */
      const nx    = -dy / dlen;
      const ny    =  dx / dlen;

      let len: number;
      let widthFactor: number;

      switch (style) {
        case "natural":
          len         = eyeW * (0.08 + t * 0.04);
          widthFactor = 0.022;
          break;
        case "dramatic":
          len         = eyeW * (0.16 + t * 0.14);
          widthFactor = 0.040;
          break;
        case "wispy":
          len         = eyeW * (i % 2 === 0 ? 0.14 : 0.07) * (0.75 + t * 0.35);
          widthFactor = 0.028;
          break;
        default: /* cat-eye */
          len         = eyeW * (0.05 + t * t * 0.22);
          widthFactor = 0.030;
          break;
      }

      const curl  = 0.18;                       // slight upward curl
      const ex    = p.x + nx * len;
      const ey    = p.y + ny * len - len * curl;
      const cpx   = p.x + nx * len * 0.45;
      const cpy   = p.y + ny * len * 0.45 - len * curl * 0.4;

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.quadraticCurveTo(cpx, cpy, ex, ey);
      ctx.lineWidth   = eyeW * widthFactor * (1 - t * 0.25);
      ctx.globalAlpha = 0.92;
      ctx.stroke();
    }

    /* cat-eye wing extension from outer corner */
    if (style === "cat-eye") {
      const outer = lid[lid.length - 1];
      const wlen  = eyeW * 0.14;
      const wingX = outer.x + (e === 0 ? -wlen : wlen);   // direction differs per eye
      const wingY = outer.y - wlen * 0.55;
      ctx.beginPath();
      ctx.moveTo(outer.x, outer.y);
      ctx.quadraticCurveTo(
        outer.x + (e === 0 ? -wlen * 0.4 : wlen * 0.4), outer.y - wlen * 0.1,
        wingX, wingY,
      );
      ctx.lineWidth   = eyeW * 0.038;
      ctx.globalAlpha = 0.95;
      ctx.stroke();
    }

    /* lower lashes — subtle for dramatic style */
    if (style === "dramatic") {
      const R_LOW = [33, 7, 163, 144, 145, 153, 154, 155, 133];
      const L_LOW = [362, 382, 381, 380, 374, 373, 390, 249, 263];
      const lower = pts(e === 0 ? R_LOW : L_LOW, lm, W, H, isFront);
      for (let i = 1; i < lower.length - 1; i++) {
        const p  = lower[i];
        const t  = i / (lower.length - 1);
        const l  = eyeW * (0.04 + t * 0.02);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + l);
        ctx.lineWidth   = eyeW * 0.018;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
      }
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

/* ═══════════════════════════════════════════════════════════════════
   3. LIPS
   ═══════════════════════════════════════════════════════════════════ */
export type LipFinish = "matte" | "glossy" | "ombre";

export function drawLips(
  ctx: CanvasRenderingContext2D,
  lm: readonly Lm[], W: number, H: number, isFront: boolean,
  color: string, finish: LipFinish,
) {
  const outer = pts(LIP_OUT, lm, W, H, isFront);
  const inner = pts(LIP_IN,  lm, W, H, isFront);
  const cen   = avg(outer);
  const topPt = outer.reduce((m, p) => (p.y < m.y ? p : m), outer[0]);
  const xVals = outer.map((p) => p.x);
  const lipW  = Math.max(...xVals) - Math.min(...xVals);

  /* fill outer lip shape */
  ctx.save();
  ctx.beginPath();
  smoothPath(ctx, outer, true);

  if (finish === "glossy") {
    ctx.fillStyle   = color;
    ctx.globalAlpha = 0.85;
    ctx.fill();

    /* gloss highlight — two bright spots on upper + lower lip */
    const shine1 = ctx.createRadialGradient(cen.x, topPt.y + 4, 0, cen.x, topPt.y + 4, lipW * 0.28);
    shine1.addColorStop(0,   "rgba(255,255,255,0.55)");
    shine1.addColorStop(0.5, "rgba(255,255,255,0.15)");
    shine1.addColorStop(1,   "transparent");
    ctx.fillStyle   = shine1;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    smoothPath(ctx, outer, true);
    ctx.fill();

    const botPt = outer.reduce((m, p) => (p.y > m.y ? p : m), outer[0]);
    const shine2 = ctx.createRadialGradient(cen.x, botPt.y - 4, 0, cen.x, botPt.y - 4, lipW * 0.18);
    shine2.addColorStop(0,   "rgba(255,255,255,0.30)");
    shine2.addColorStop(1,   "transparent");
    ctx.fillStyle   = shine2;
    ctx.beginPath();
    smoothPath(ctx, outer, true);
    ctx.fill();

  } else if (finish === "ombre") {
    const grad = ctx.createRadialGradient(cen.x, cen.y, 0, cen.x, cen.y, lipW * 0.52);
    grad.addColorStop(0,   lighten(color, 35));
    grad.addColorStop(0.5, color);
    grad.addColorStop(1,   darken(color, 25));
    ctx.fillStyle   = grad;
    ctx.globalAlpha = 0.90;
    ctx.fill();

  } else { /* matte */
    ctx.fillStyle   = color;
    ctx.globalAlpha = 0.88;
    ctx.fill();
  }

  /* erase mouth opening */
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  smoothPath(ctx, inner, true);
  ctx.fillStyle = "rgba(255,255,255,1)";
  ctx.globalAlpha = 1;
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  /* lip liner */
  ctx.beginPath();
  smoothPath(ctx, outer, true);
  ctx.strokeStyle = darken(color, 18);
  ctx.lineWidth   = lipW * 0.012;
  ctx.globalAlpha = 0.55;
  ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.restore();
}

/* ─── Registries ─────────────────────────────────────────────────── */
export const BROW_STYLES: { id: BrowStyle; label: string }[] = [
  { id: "natural",   label: "Natural"   },
  { id: "bold",      label: "Bold"      },
  { id: "arched",    label: "Arched"    },
  { id: "feathered", label: "Feathered" },
];

export const BROW_COLORS = [
  { name: "Ebony",  hex: "#1a1008" },
  { name: "Brown",  hex: "#5c3317" },
  { name: "Taupe",  hex: "#8b7355" },
  { name: "Blonde", hex: "#c8a060" },
  { name: "Grey",   hex: "#808080" },
];

export const LASH_STYLES: { id: LashStyle; label: string; icon: string }[] = [
  { id: "natural",  label: "Natural",  icon: "remove" },
  { id: "dramatic", label: "Dramatic", icon: "expand_less" },
  { id: "wispy",    label: "Wispy",    icon: "waves" },
  { id: "cat-eye",  label: "Cat Eye",  icon: "arrow_forward" },
];

export const LIP_COLORS = [
  { name: "Nude",    hex: "#c47e6a" },
  { name: "Pink",    hex: "#e8677a" },
  { name: "Red",     hex: "#c41230" },
  { name: "Berry",   hex: "#862040" },
  { name: "Coral",   hex: "#e8603c" },
  { name: "Mauve",   hex: "#9e6070" },
  { name: "Plum",    hex: "#5c1f3a" },
  { name: "Orange",  hex: "#e05c20" },
];

export const LIP_FINISHES: { id: LipFinish; label: string }[] = [
  { id: "matte",  label: "Matte"  },
  { id: "glossy", label: "Glossy" },
  { id: "ombre",  label: "Ombré"  },
];
