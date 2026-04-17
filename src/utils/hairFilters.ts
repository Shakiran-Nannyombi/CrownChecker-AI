/**
 * Canvas-drawn hair filters positioned using MediaPipe FaceLandmarker landmarks.
 *
 * Each filter receives an offscreen CanvasRenderingContext2D, the 478 normalized
 * face landmarks, canvas dimensions, and whether the frame is mirrored.
 * It draws the hair onto the offscreen canvas; the caller composites that onto
 * the live video feed.
 */

type Lm = { x: number; y: number; z: number };

/* ─── Landmark helpers ───────────────────────────────────────────── */
function metrics(lm: readonly Lm[], W: number, H: number, isFront: boolean) {
  const px = (l: Lm) => (isFront ? 1 - l.x : l.x) * W;
  const py = (l: Lm) => l.y * H;

  const crown  = { x: px(lm[10]),  y: py(lm[10])  }; // forehead top center
  const chin   = { x: px(lm[152]), y: py(lm[152]) }; // chin bottom
  const leftC  = { x: px(lm[234]), y: py(lm[234]) }; // left cheekbone
  const rightC = { x: px(lm[454]), y: py(lm[454]) }; // right cheekbone
  const leftT  = { x: px(lm[127]), y: py(lm[127]) }; // left temple (near ear)
  const rightT = { x: px(lm[356]), y: py(lm[356]) }; // right temple

  const cx    = (leftC.x + rightC.x) / 2;
  const faceW = Math.abs(rightC.x - leftC.x);
  const faceH = chin.y - crown.y;
  // Actual top of skull estimated ~40% of face-height above the forehead landmark
  const headTopY = crown.y - faceH * 0.40;

  return { crown, chin, leftC, rightC, leftT, rightT, cx, faceW, faceH, headTopY };
}

/** Pseudo-random but deterministic float in [0,1] from an integer seed. */
function rng(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

/* ─── 1. AFRO ────────────────────────────────────────────────────── */
export function drawAfro(
  ctx: CanvasRenderingContext2D,
  lm: readonly Lm[], W: number, H: number, isFront: boolean, color = "#2a1205",
) {
  const { crown, cx, faceW, headTopY } = metrics(lm, W, H, isFront);
  const R  = faceW * 0.82;
  const cy = headTopY - R * 0.18;

  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // Shadow
  ctx.beginPath();
  ctx.ellipse(cx + R * 0.06, cy + R * 0.08, R * 1.02, R * 0.95, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fill();

  // Main body with radial gradient
  const grad = ctx.createRadialGradient(cx - R * 0.22, cy - R * 0.28, R * 0.04, cx, cy, R * 1.05);
  grad.addColorStop(0,    lighten(color, 60));
  grad.addColorStop(0.35, lighten(color, 20));
  grad.addColorStop(0.72, color);
  grad.addColorStop(1,    darken(color, 40));
  ctx.beginPath();
  ctx.ellipse(cx, cy, R, R * 0.93, 0, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Tight coil texture
  const r = rng(Math.round(cx + cy * 1000));
  ctx.globalAlpha = 0.45;
  for (let i = 0; i < 220; i++) {
    const angle = r() * Math.PI * 2;
    const dist  = Math.sqrt(r()) * R * 0.88;
    const tx = cx + Math.cos(angle) * dist;
    const ty = cy + Math.sin(angle) * dist * 0.93;
    const cr = R * 0.033;
    ctx.beginPath();
    ctx.arc(tx, ty, cr, r() * 0.3, Math.PI * 1.6 + r() * 0.4);
    ctx.strokeStyle = r() > 0.5 ? darken(color, 30) : lighten(color, 25);
    ctx.lineWidth = R * 0.014;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Specular highlight
  const shine = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.38, 0, cx - R * 0.1, cy - R * 0.2, R * 0.55);
  shine.addColorStop(0,   "rgba(255,220,160,0.22)");
  shine.addColorStop(0.6, "rgba(255,200,100,0.06)");
  shine.addColorStop(1,   "transparent");
  ctx.beginPath();
  ctx.ellipse(cx, cy, R, R * 0.93, 0, 0, Math.PI * 2);
  ctx.fillStyle = shine;
  ctx.fill();

  // Fade bottom into face
  applyBottomFade(ctx, crown.y - R * 0.05, faceW * 0.55, W, H);
  ctx.restore();
}

/* ─── 2. HIGH TOP FADE ───────────────────────────────────────────── */
export function drawHighTop(
  ctx: CanvasRenderingContext2D,
  lm: readonly Lm[], W: number, H: number, isFront: boolean, color = "#111111",
) {
  const { crown, chin, cx, faceW, faceH, headTopY, leftT, rightT } = metrics(lm, W, H, isFront);
  const topH  = faceH * 0.58;   // height of the flat top block
  const topW  = faceW * 0.72;
  const topY  = headTopY - topH * 0.1;

  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // Flat top block
  const blockGrad = ctx.createLinearGradient(cx - topW / 2, 0, cx + topW / 2, 0);
  blockGrad.addColorStop(0,   darken(color, 20));
  blockGrad.addColorStop(0.15, lighten(color, 10));
  blockGrad.addColorStop(0.85, lighten(color, 10));
  blockGrad.addColorStop(1,   darken(color, 20));
  // Top face
  ctx.beginPath();
  ctx.roundRect(cx - topW / 2, topY, topW, topH + faceH * 0.15, [topW * 0.12, topW * 0.12, 0, 0]);
  ctx.fillStyle = blockGrad;
  ctx.fill();

  // Side fade gradients
  [leftT, rightT].forEach((ear, side) => {
    const dir = side === 0 ? -1 : 1;
    const fg = ctx.createLinearGradient(
      ear.x + dir * faceW * 0.05, 0,
      ear.x - dir * faceW * 0.25, 0,
    );
    fg.addColorStop(0,   "transparent");
    fg.addColorStop(0.5, `${color}88`);
    fg.addColorStop(1,   color);
    ctx.beginPath();
    ctx.ellipse(
      ear.x - dir * faceW * 0.05, crown.y + faceH * 0.3,
      faceW * 0.28, faceH * 0.5, 0, 0, Math.PI * 2,
    );
    ctx.fillStyle = fg;
    ctx.fill();
  });

  // Top surface highlight
  const topShine = ctx.createLinearGradient(0, topY, 0, topY + topH * 0.35);
  topShine.addColorStop(0,   "rgba(255,255,255,0.14)");
  topShine.addColorStop(1,   "transparent");
  ctx.beginPath();
  ctx.roundRect(cx - topW / 2, topY, topW, topH * 0.35, [topW * 0.12]);
  ctx.fillStyle = topShine;
  ctx.fill();

  applyBottomFade(ctx, crown.y + faceH * 0.12, faceH * 0.35, W, H);
  ctx.restore();
}

/* ─── 3. BOX BRAIDS ─────────────────────────────────────────────── */
export function drawBoxBraids(
  ctx: CanvasRenderingContext2D,
  lm: readonly Lm[], W: number, H: number, isFront: boolean, color = "#1a0a00",
) {
  const { crown, cx, faceW, faceH, headTopY, leftT, rightT } = metrics(lm, W, H, isFront);
  const capR = faceW * 0.5;

  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // Hair cap (dome on top)
  const capGrad = ctx.createRadialGradient(cx - capR * 0.2, headTopY - capR * 0.1, 0, cx, headTopY + capR * 0.2, capR * 1.1);
  capGrad.addColorStop(0,   lighten(color, 50));
  capGrad.addColorStop(0.5, color);
  capGrad.addColorStop(1,   darken(color, 30));
  ctx.beginPath();
  ctx.ellipse(cx, headTopY + capR * 0.3, capR, capR * 0.6, 0, Math.PI, 0);
  ctx.fillStyle = capGrad;
  ctx.fill();

  // Individual box braids
  const braidCount = 9;
  const spreadL = leftT.x - faceW * 0.08;
  const spreadR = rightT.x + faceW * 0.08;
  const braidLength = faceH * 2.2;

  for (let i = 0; i < braidCount; i++) {
    const t    = i / (braidCount - 1);
    const bx   = spreadL + (spreadR - spreadL) * t;
    const by   = crown.y - faceH * 0.05;
    const bw   = faceW * 0.055;
    const sway = (t - 0.5) * faceW * 0.18; // braids angle outward

    drawSingleBraid(ctx, bx + sway * 0.3, by, bw, braidLength, color, i);
  }

  applyBottomFade(ctx, crown.y + faceH * 0.1, faceH * 0.28, W, H);
  ctx.restore();
}

function drawSingleBraid(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, len: number, color: string, seed: number,
) {
  const segH = w * 1.4;
  const segs = Math.ceil(len / segH);
  const r    = rng(seed * 31337);

  for (let s = 0; s < segs; s++) {
    const sy    = y + s * segH;
    const light = s % 2 === 0;
    const c1    = light ? lighten(color, 30) : darken(color, 15);
    const c2    = light ? lighten(color, 10) : darken(color, 25);
    const seg   = ctx.createLinearGradient(x - w, sy, x + w, sy + segH);
    seg.addColorStop(0,    darken(color, 20));
    seg.addColorStop(0.25, c1);
    seg.addColorStop(0.75, c2);
    seg.addColorStop(1,    darken(color, 20));

    ctx.beginPath();
    ctx.roundRect(x - w / 2, sy, w, segH + 1, w * 0.35);
    ctx.fillStyle = seg;
    ctx.fill();
    // dividing line
    if (s < segs - 1) {
      ctx.beginPath();
      ctx.moveTo(x - w / 2, sy + segH);
      ctx.lineTo(x + w / 2, sy + segH);
      ctx.strokeStyle = darken(color, 40);
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }
  // Bead at tip (random color variety)
  const beadColors = ["#d4af37", "#c0392b", "#8e44ad", "#1abc9c", "#e67e22"];
  const bc = beadColors[seed % beadColors.length];
  ctx.beginPath();
  ctx.arc(x, y + len, w * 0.6, 0, Math.PI * 2);
  ctx.fillStyle = bc;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x - w * 0.2, y + len - w * 0.2, w * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fill();
}

/* ─── 4. DREADLOCKS / LOCS ──────────────────────────────────────── */
export function drawLocs(
  ctx: CanvasRenderingContext2D,
  lm: readonly Lm[], W: number, H: number, isFront: boolean, color = "#3b2010",
) {
  const { crown, cx, faceW, faceH, headTopY, leftT, rightT } = metrics(lm, W, H, isFront);
  const locCount  = 7;
  const locW      = faceW * 0.075;
  const locLen    = faceH * 2.5;
  const spreadL   = leftT.x - faceW * 0.05;
  const spreadR   = rightT.x + faceW * 0.05;
  const startY    = crown.y - faceH * 0.08;

  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // Hair cap
  const capGrad = ctx.createRadialGradient(cx, headTopY, 0, cx, headTopY + faceW * 0.3, faceW * 0.65);
  capGrad.addColorStop(0,   lighten(color, 40));
  capGrad.addColorStop(0.6, color);
  capGrad.addColorStop(1,   darken(color, 35));
  ctx.beginPath();
  ctx.ellipse(cx, headTopY + faceW * 0.25, faceW * 0.52, faceW * 0.28, 0, Math.PI, 0);
  ctx.fillStyle = capGrad;
  ctx.fill();

  for (let i = 0; i < locCount; i++) {
    const t    = i / (locCount - 1);
    const lx   = spreadL + (spreadR - spreadL) * t;
    const sway = Math.sin(t * Math.PI) * faceW * 0.06;
    drawSingleLoc(ctx, lx + sway, startY, locW, locLen, color, i);
  }

  applyBottomFade(ctx, crown.y + faceH * 0.1, faceH * 0.3, W, H);
  ctx.restore();
}

function drawSingleLoc(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, len: number, color: string, seed: number,
) {
  const r      = rng(seed * 7919);
  const twist  = 22;
  const segH   = len / twist;

  for (let s = 0; s < twist; s++) {
    const sy     = y + s * segH;
    const wobble = (r() - 0.5) * w * 0.3;
    const nx     = x + wobble;
    const segW   = w * (1 - s / (twist * 1.8)); // taper toward tip
    const grad   = ctx.createLinearGradient(nx - segW, sy, nx + segW, sy);
    grad.addColorStop(0,    darken(color, 25));
    grad.addColorStop(0.35, lighten(color, 22));
    grad.addColorStop(0.65, lighten(color, 8));
    grad.addColorStop(1,    darken(color, 25));

    ctx.beginPath();
    ctx.ellipse(nx, sy + segH / 2, segW / 2, segH * 0.58, 0, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
  // Tapered tip
  ctx.beginPath();
  ctx.ellipse(x, y + len, w * 0.18, w * 0.4, 0, 0, Math.PI * 2);
  ctx.fillStyle = darken(color, 30);
  ctx.fill();
}

/* ─── 5. MOHAWK / FAUX HAWK ─────────────────────────────────────── */
export function drawMohawk(
  ctx: CanvasRenderingContext2D,
  lm: readonly Lm[], W: number, H: number, isFront: boolean, color = "#cc1a00",
) {
  const { crown, cx, faceW, faceH, headTopY } = metrics(lm, W, H, isFront);
  const stripW  = faceW * 0.22;
  const stripH  = faceH * 0.75;
  const stripY  = headTopY - stripH * 0.2;
  const spikes  = 5;

  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // Main raised strip
  const stripGrad = ctx.createLinearGradient(cx - stripW / 2, 0, cx + stripW / 2, 0);
  stripGrad.addColorStop(0,    darken(color, 30));
  stripGrad.addColorStop(0.25, lighten(color, 20));
  stripGrad.addColorStop(0.75, lighten(color, 20));
  stripGrad.addColorStop(1,    darken(color, 30));

  // Spike tips
  for (let s = 0; s < spikes; s++) {
    const t   = s / (spikes - 1);
    const sx  = cx - stripW * 0.35 + stripW * 0.7 * t;
    const sy  = stripY + s * (stripH / spikes);
    const sh  = stripH / spikes;
    const sw  = stripW * (0.55 + (1 - Math.abs(t - 0.5) * 2) * 0.3);

    // Spike body
    ctx.beginPath();
    ctx.moveTo(sx - sw / 2, sy + sh);
    ctx.quadraticCurveTo(sx - sw * 0.6, sy + sh * 0.3, sx, sy - sh * 0.2);
    ctx.quadraticCurveTo(sx + sw * 0.6, sy + sh * 0.3, sx + sw / 2, sy + sh);
    ctx.closePath();
    ctx.fillStyle = stripGrad;
    ctx.fill();
  }

  // Shaved sides (subtle skin-toned fade)
  for (const side of [-1, 1]) {
    const fg = ctx.createLinearGradient(
      cx + (side * stripW * 0.5), 0, cx + (side * faceW * 0.5), 0,
    );
    fg.addColorStop(0,   `${color}30`);
    fg.addColorStop(0.7, "transparent");
    ctx.beginPath();
    ctx.ellipse(
      cx + side * faceW * 0.28, crown.y + faceH * 0.3,
      faceW * 0.25, faceH * 0.45, 0, 0, Math.PI * 2,
    );
    ctx.fillStyle = fg;
    ctx.fill();
  }

  // Highlight along center of strip
  const hl = ctx.createLinearGradient(0, stripY, 0, stripY + stripH);
  hl.addColorStop(0,   "rgba(255,255,255,0.25)");
  hl.addColorStop(0.5, "rgba(255,255,255,0.05)");
  hl.addColorStop(1,   "transparent");
  ctx.fillStyle = hl;
  ctx.fillRect(cx - stripW * 0.18, stripY, stripW * 0.36, stripH);

  applyBottomFade(ctx, crown.y + faceH * 0.08, faceH * 0.3, W, H);
  ctx.restore();
}

/* ─── 6. CORNROWS ───────────────────────────────────────────────── */
export function drawCornrows(
  ctx: CanvasRenderingContext2D,
  lm: readonly Lm[], W: number, H: number, isFront: boolean, color = "#1a0a00",
) {
  const { crown, cx, faceW, faceH, headTopY, leftC, rightC } = metrics(lm, W, H, isFront);
  const rowCount = 6;
  const rowW     = faceW * 0.058;
  const rowH     = faceH * 0.62;
  const startY   = headTopY + faceH * 0.02;

  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // Scalp base
  const scalp = ctx.createLinearGradient(leftC.x, 0, rightC.x, 0);
  scalp.addColorStop(0,   "transparent");
  scalp.addColorStop(0.1, `${color}60`);
  scalp.addColorStop(0.9, `${color}60`);
  scalp.addColorStop(1,   "transparent");
  ctx.beginPath();
  ctx.ellipse(cx, startY + rowH / 2, faceW * 0.52, rowH * 0.52, 0, 0, Math.PI * 2);
  ctx.fillStyle = scalp;
  ctx.fill();

  for (let row = 0; row < rowCount; row++) {
    const t  = row / (rowCount - 1);
    const rx = leftC.x + (rightC.x - leftC.x) * t + (faceW / (rowCount - 1)) * 0.08;
    drawSingleCornrow(ctx, rx, startY, rowW, rowH, color, row);
  }

  // Nape gathering at bottom
  const napeGrad = ctx.createLinearGradient(0, startY + rowH * 0.75, 0, startY + rowH * 1.05);
  napeGrad.addColorStop(0,   "transparent");
  napeGrad.addColorStop(1,   darken(color, 10));
  ctx.beginPath();
  ctx.ellipse(cx, startY + rowH, faceW * 0.48, faceH * 0.12, 0, 0, Math.PI * 2);
  ctx.fillStyle = napeGrad;
  ctx.fill();

  applyBottomFade(ctx, crown.y + faceH * 0.25, faceH * 0.32, W, H);
  ctx.restore();
}

function drawSingleCornrow(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, len: number, color: string, seed: number,
) {
  const stitches = 14;
  const stitchH  = len / stitches;

  for (let s = 0; s < stitches; s++) {
    const sy    = y + s * stitchH;
    const twist = s % 2 === 0;
    const grad  = ctx.createLinearGradient(x - w, sy, x + w, sy + stitchH);
    grad.addColorStop(0,    darken(color, 25));
    grad.addColorStop(twist ? 0.3 : 0.7, lighten(color, 28));
    grad.addColorStop(1,    darken(color, 15));

    ctx.beginPath();
    ctx.ellipse(x, sy + stitchH / 2, w * 0.48, stitchH * 0.55, 0, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    if (s < stitches - 1) {
      ctx.beginPath();
      ctx.moveTo(x - w * 0.4, sy + stitchH);
      ctx.lineTo(x + w * 0.4, sy + stitchH);
      ctx.strokeStyle = darken(color, 35);
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
  }
}

/* ─── Shared utilities ───────────────────────────────────────────── */

/** Fade the bottom of the filter canvas to transparent so it blends into the face. */
function applyBottomFade(
  ctx: CanvasRenderingContext2D,
  startY: number, fadeH: number, W: number, H: number,
) {
  const g = ctx.createLinearGradient(0, startY, 0, startY + fadeH);
  g.addColorStop(0,   "rgba(0,0,0,1)");
  g.addColorStop(0.5, "rgba(0,0,0,0.6)");
  g.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.globalCompositeOperation = "destination-in";
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = "source-over";
}

function lighten(hex: string, pct: number): string {
  return adjustBrightness(hex, pct);
}
function darken(hex: string, pct: number): string {
  return adjustBrightness(hex, -pct);
}
function adjustBrightness(hex: string, pct: number): string {
  const n   = parseInt(hex.replace("#", ""), 16);
  const r   = Math.min(255, Math.max(0, ((n >> 16) & 255) + pct * 2.5));
  const g   = Math.min(255, Math.max(0, ((n >> 8)  & 255) + pct * 2.5));
  const b   = Math.min(255, Math.max(0, (n         & 255) + pct * 2.5));
  return `rgb(${r|0},${g|0},${b|0})`;
}

/* ─── Filter registry ────────────────────────────────────────────── */
export const HAIR_FILTERS = [
  {
    id: "afro",
    name: "Afro",
    category: "Natural",
    defaultColor: "#2a1205",
    colors: ["#2a1205", "#6b3a1f", "#c8a844", "#cc1a00", "#6600cc"],
    colorNames: ["Black", "Brown", "Blonde", "Red", "Purple"],
    draw: drawAfro,
  },
  {
    id: "hightop",
    name: "High Top",
    category: "Natural",
    defaultColor: "#111111",
    colors: ["#111111", "#3b1f0a", "#a07830", "#cc1a00", "#0055cc"],
    colorNames: ["Black", "Brown", "Blonde", "Red", "Blue"],
    draw: drawHighTop,
  },
  {
    id: "boxbraids",
    name: "Box Braids",
    category: "Braids",
    defaultColor: "#1a0a00",
    colors: ["#1a0a00", "#6b3a1f", "#c8a844", "#6600cc", "#dd3388"],
    colorNames: ["Black", "Brown", "Blonde", "Purple", "Pink"],
    draw: drawBoxBraids,
  },
  {
    id: "locs",
    name: "Locs",
    category: "Natural",
    defaultColor: "#3b2010",
    colors: ["#3b2010", "#1a0a00", "#c8a844", "#6600cc", "#008855"],
    colorNames: ["Brown", "Black", "Blonde", "Purple", "Green"],
    draw: drawLocs,
  },
  {
    id: "mohawk",
    name: "Mohawk",
    category: "Bold",
    defaultColor: "#cc1a00",
    colors: ["#cc1a00", "#6600cc", "#0055cc", "#dd3388", "#111111"],
    colorNames: ["Red", "Purple", "Blue", "Pink", "Black"],
    draw: drawMohawk,
  },
  {
    id: "cornrows",
    name: "Cornrows",
    category: "Braids",
    defaultColor: "#1a0a00",
    colors: ["#1a0a00", "#3b1f0a", "#6b3a1f", "#6600cc", "#dd3388"],
    colorNames: ["Black", "Dark Brown", "Brown", "Purple", "Pink"],
    draw: drawCornrows,
  },
] as const;

export type FilterId = typeof HAIR_FILTERS[number]["id"];
