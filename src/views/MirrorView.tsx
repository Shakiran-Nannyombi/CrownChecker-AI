import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import { View } from "../types";
import type { ImageSegmenter, FaceLandmarker } from "@mediapipe/tasks-vision";
import { HAIR_FILTERS, type FilterId } from "../utils/hairFilters";
import {
  drawEyebrows, drawEyelashes, drawLips,
  BROW_STYLES, BROW_COLORS, LASH_STYLES, LIP_COLORS, LIP_FINISHES,
  type BrowStyle, type LashStyle, type LipFinish,
} from "../utils/makeupFilters";

/* ─── Colour palette (Colors mode) ──────────────────────────────── */
const PALETTE = [
  { name: "Jet Black",  hex: "#111111", group: "Natural" },
  { name: "Dk Brown",   hex: "#3b1f0a", group: "Natural" },
  { name: "Brown",      hex: "#6b3a1f", group: "Natural" },
  { name: "Auburn",     hex: "#7b3226", group: "Natural" },
  { name: "Dk Blonde",  hex: "#a07830", group: "Natural" },
  { name: "Blonde",     hex: "#c8a844", group: "Natural" },
  { name: "Fire Red",   hex: "#cc1a00", group: "Bold"    },
  { name: "Copper",     hex: "#b05a2a", group: "Bold"    },
  { name: "Burgundy",   hex: "#6e1a35", group: "Bold"    },
  { name: "Purple",     hex: "#6600cc", group: "Fantasy" },
  { name: "Blue",       hex: "#0055cc", group: "Fantasy" },
  { name: "Teal",       hex: "#009999", group: "Fantasy" },
  { name: "Rose Pink",  hex: "#dd3388", group: "Fantasy" },
  { name: "Silver",     hex: "#b0b8c8", group: "Fantasy" },
  { name: "Emerald",    hex: "#008855", group: "Fantasy" },
] as const;
const COLOR_GROUPS = ["Natural", "Bold", "Fantasy"] as const;

type Mode = "colours" | "styles" | "makeup";

export default function MirrorView({
  onNavigate, onLogout, theme, toggleTheme,
}: {
  onBack: () => void;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  /* ── canvas / stream refs ── */
  const videoRef      = useRef<HTMLVideoElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const captureCanvas = useRef<HTMLCanvasElement>(null);
  const filterBuf     = useRef(document.createElement("canvas"));
  const colorOverlay  = useRef(document.createElement("canvas"));
  const maskBuf       = useRef(document.createElement("canvas"));
  const streamRef     = useRef<MediaStream | null>(null);
  const rafRef        = useRef<number>(0);

  /* ── model refs ── */
  const segRef        = useRef<ImageSegmenter | null>(null);
  const landRef       = useRef<FaceLandmarker | null>(null);

  /* ── live data refs ── */
  const maskRef       = useRef<Uint8Array | null>(null);
  const landmarksRef  = useRef<{ x: number; y: number; z: number }[] | null>(null);
  const maskDirty     = useRef(false);

  /* values read in rAF without re-renders */
  const colorRef      = useRef(PALETTE[0].hex);
  const opacityRef    = useRef(70);
  const modeRef       = useRef<Mode>("colours");
  const filterIdRef   = useRef<FilterId>("afro");
  const filterColRef  = useRef(HAIR_FILTERS[0].defaultColor);

  /* ── state ── */
  const [segStatus,  setSegStatus]  = useState<"loading"|"ready"|"error">("loading");
  const [landStatus, setLandStatus] = useState<"idle"|"loading"|"ready"|"error">("idle");
  const [cameraReady,  setCameraReady]  = useState(false);
  const [cameraError,  setCameraError]  = useState<string | null>(null);
  const [facingMode,   setFacingMode]   = useState<"user"|"environment">("user");
  const [mode,         setMode]         = useState<Mode>("colours");
  const [colorGroup,   setColorGroup]   = useState<typeof COLOR_GROUPS[number]>("Natural");
  const [selectedColor, setSelectedColor] = useState(PALETTE[0].hex);
  const [overlayOpacity, setOverlayOpacity] = useState(70);
  const [filterId,     setFilterId]     = useState<FilterId>("afro");
  const [filterColor,  setFilterColor]  = useState(HAIR_FILTERS[0].defaultColor);
  const [hairDetected, setHairDetected] = useState(false);
  const [captured,     setCaptured]     = useState<string | null>(null);
  const [savedShots,   setSavedShots]   = useState<string[]>([]);
  const [showGallery,  setShowGallery]  = useState(false);

  /* ── Makeup state ── */
  const [browsOn,    setBrowsOn]    = useState(false);
  const [lashesOn,   setLashesOn]   = useState(false);
  const [lipsOn,     setLipsOn]     = useState(false);
  const [browStyle,  setBrowStyle]  = useState<BrowStyle>("bold");
  const [browColor,  setBrowColor]  = useState(BROW_COLORS[0].hex);
  const [lashStyle,  setLashStyle]  = useState<LashStyle>("dramatic");
  const [lipColor,   setLipColor]   = useState(LIP_COLORS[2].hex);
  const [lipFinish,  setLipFinish]  = useState<LipFinish>("glossy");
  const [mkSection,  setMkSection]  = useState<"brows"|"lashes"|"lips">("brows");

  /* makeup refs for render loop */
  const browsOnRef    = useRef(false);
  const lashesOnRef   = useRef(false);
  const lipsOnRef     = useRef(false);
  const browStyleRef  = useRef<BrowStyle>("bold");
  const browColorRef  = useRef(BROW_COLORS[0].hex);
  const lashStyleRef  = useRef<LashStyle>("dramatic");
  const lipColorRef   = useRef(LIP_COLORS[2].hex);
  const lipFinishRef  = useRef<LipFinish>("glossy");

  /* keep refs in sync */
  useEffect(() => { colorRef.current     = selectedColor;  }, [selectedColor]);
  useEffect(() => { opacityRef.current   = overlayOpacity; }, [overlayOpacity]);
  useEffect(() => { modeRef.current      = mode;           }, [mode]);
  useEffect(() => { filterIdRef.current  = filterId;       }, [filterId]);
  useEffect(() => { filterColRef.current = filterColor;    }, [filterColor]);
  useEffect(() => { browsOnRef.current   = browsOn;        }, [browsOn]);
  useEffect(() => { lashesOnRef.current  = lashesOn;       }, [lashesOn]);
  useEffect(() => { lipsOnRef.current    = lipsOn;         }, [lipsOn]);
  useEffect(() => { browStyleRef.current = browStyle;      }, [browStyle]);
  useEffect(() => { browColorRef.current = browColor;      }, [browColor]);
  useEffect(() => { lashStyleRef.current = lashStyle;      }, [lashStyle]);
  useEffect(() => { lipColorRef.current  = lipColor;       }, [lipColor]);
  useEffect(() => { lipFinishRef.current = lipFinish;      }, [lipFinish]);

  /* ── Load hair color segmenter ── */
  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const { ImageSegmenter, FilesetResolver } = await import("@mediapipe/tasks-vision");
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.15/wasm"
        );
        const seg = await ImageSegmenter.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/image_segmenter/hair_segmenter/float32/1/hair_segmenter.tflite",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          outputCategoryMask: true,
          outputConfidenceMasks: false,
        });
        if (!dead) { segRef.current = seg; setSegStatus("ready"); }
      } catch { if (!dead) setSegStatus("error"); }
    })();
    return () => { dead = true; segRef.current?.close(); };
  }, []);

  /* ── Load face landmarker on mount (background, non-blocking) ── */
  const [landRetry, setLandRetry] = useState(0);
  useEffect(() => {
    if (landRef.current) return;
    let dead = false;
    setLandStatus("loading");
    const timer = setTimeout(() => { if (!dead) setLandStatus("error"); }, 40_000);
    (async () => {
      try {
        const { FaceLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision");
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.15/wasm"
        );
        const lm = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          runningMode: "VIDEO",
          numFaces: 1,
          minFaceDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
        });
        if (!dead) { clearTimeout(timer); landRef.current = lm; setLandStatus("ready"); }
      } catch { if (!dead) { clearTimeout(timer); setLandStatus("error"); } }
    })();
    return () => { dead = true; clearTimeout(timer); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landRetry]);

  /* ── Camera ── */
  const startCamera = useCallback(async (fm: "user" | "environment") => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setCameraReady(false); setCameraError(null);

    // getUserMedia requires a secure context — on Chrome, only localhost or HTTPS works.
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setCameraError(
        "INSECURE_CONTEXT"
      );
      return;
    }

    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: fm, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = s;
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err) {
      const name = (err as DOMException).name;
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setCameraError("PERMISSION_DENIED");
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        setCameraError("NO_CAMERA");
      } else if (name === "NotReadableError" || name === "TrackStartError") {
        setCameraError("CAMERA_IN_USE");
      } else {
        setCameraError("UNKNOWN");
      }
    }
  }, []);

  useEffect(() => {
    startCamera(facingMode);
    return () => { streamRef.current?.getTracks().forEach((t) => t.stop()); };
  }, [facingMode, startCamera]);

  /* ── Main render + AI loop ── */
  useEffect(() => {
    if (!cameraReady) return;
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isFront = facingMode === "user";
    let lastAI = 0;

    /* rebuild colour-blend overlay from hair mask */
    const rebuildColorOverlay = (W: number, H: number) => {
      const mask = maskRef.current; if (!mask) return;
      const oc = colorOverlay.current, mc = maskBuf.current;
      oc.width = mc.width = W; oc.height = mc.height = H;
      const ocx = oc.getContext("2d")!;
      ocx.fillStyle = colorRef.current;
      ocx.fillRect(0, 0, W, H);
      const mcx = mc.getContext("2d")!;
      const id  = mcx.createImageData(W, H);
      let anyHair = false;
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] === 1) { id.data[i * 4 + 3] = 255; anyHair = true; }
      }
      mcx.putImageData(id, 0, 0);
      setHairDetected(anyHair);
      ocx.globalCompositeOperation = "destination-in";
      ocx.drawImage(mc, 0, 0);
      ocx.globalCompositeOperation = "source-over";
      maskDirty.current = false;
    };

    const loop = () => {
      if (video.readyState < 2) { rafRef.current = requestAnimationFrame(loop); return; }
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width  = video.videoWidth  || 1280;
        canvas.height = video.videoHeight || 720;
      }
      const W = canvas.width, H = canvas.height;

      /* draw mirrored video */
      ctx.save();
      if (isFront) { ctx.translate(W, 0); ctx.scale(-1, 1); }
      ctx.drawImage(video, 0, 0, W, H);
      ctx.restore();

      const now = performance.now();
      const currentMode = modeRef.current;

      /* run AI at ~15 fps for the active mode */
      if (now - lastAI > 66) {
        lastAI = now;

        if (currentMode === "colours" && segRef.current) {
          try {
            segRef.current.segmentForVideo(video, now, (result) => {
              const raw = result.categoryMask?.getAsUint8Array();
              if (raw) {
                if (isFront) {
                  const flipped = new Uint8Array(raw.length);
                  for (let y = 0; y < H; y++)
                    for (let x = 0; x < W; x++)
                      flipped[y * W + x] = raw[y * W + (W - 1 - x)];
                  maskRef.current = flipped;
                } else {
                  maskRef.current = new Uint8Array(raw);
                }
                maskDirty.current = true;
              }
              result.categoryMask?.close();
            });
          } catch { /* ignore */ }
        }

        if ((currentMode === "styles" || currentMode === "makeup") && landRef.current) {
          try {
            const result = landRef.current.detectForVideo(video, now);
            landmarksRef.current = result.faceLandmarks[0] ?? null;
            setHairDetected(!!landmarksRef.current);
          } catch { /* ignore */ }
        }
      }

      /* ── Apply colour filter ── */
      if (currentMode === "colours") {
        if (maskDirty.current || colorOverlay.current.width !== W) rebuildColorOverlay(W, H);
        if (maskRef.current) {
          ctx.globalCompositeOperation = "color";
          ctx.globalAlpha = opacityRef.current / 100;
          ctx.drawImage(colorOverlay.current, 0, 0);
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1;
        }
        maskDirty.current = false;
      }

      /* ── Apply makeup filters ── */
      if (currentMode === "makeup" && landmarksRef.current) {
        const fb    = filterBuf.current;
        if (fb.width !== W || fb.height !== H) { fb.width = W; fb.height = H; }
        const fbCtx = fb.getContext("2d");
        if (fbCtx) {
          fbCtx.clearRect(0, 0, W, H);
          if (browsOnRef.current)
            drawEyebrows(fbCtx, landmarksRef.current, W, H, isFront, browColorRef.current, browStyleRef.current);
          if (lashesOnRef.current)
            drawEyelashes(fbCtx, landmarksRef.current, W, H, isFront, lashStyleRef.current);
          if (lipsOnRef.current)
            drawLips(fbCtx, landmarksRef.current, W, H, isFront, lipColorRef.current, lipFinishRef.current);
          ctx.globalAlpha = opacityRef.current / 100;
          ctx.drawImage(fb, 0, 0);
          ctx.globalAlpha = 1;
        }
      }

      /* ── Apply drawn hair filter ── */
      if (currentMode === "styles" && landmarksRef.current) {
        const filter = HAIR_FILTERS.find((f) => f.id === filterIdRef.current);
        if (filter) {
          const fb = filterBuf.current;
          if (fb.width !== W || fb.height !== H) { fb.width = W; fb.height = H; }
          const fbCtx = fb.getContext("2d");
          if (fbCtx) {
            filter.draw(fbCtx, landmarksRef.current, W, H, isFront, filterColRef.current);
            ctx.globalAlpha = opacityRef.current / 100;
            ctx.drawImage(fb, 0, 0);
            ctx.globalAlpha = 1;
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cameraReady, facingMode]);

  useEffect(() => { maskDirty.current = true; }, [selectedColor]);

  /* ── Capture ── */
  const handleCapture = () => {
    const src = canvasRef.current, dst = captureCanvas.current;
    if (!src || !dst) return;
    dst.width = src.width; dst.height = src.height;
    dst.getContext("2d")?.drawImage(src, 0, 0);
    const dataUrl = dst.toDataURL("image/png");
    setCaptured(dataUrl);
    setSavedShots((prev) => [dataUrl, ...prev]);
  };

  /* ── Quick-save (favourite) — downloads immediately ── */
  const handleQuickSave = () => {
    const src = canvasRef.current, dst = captureCanvas.current;
    if (!src || !dst) return;
    dst.width = src.width; dst.height = src.height;
    dst.getContext("2d")?.drawImage(src, 0, 0);
    const dataUrl = dst.toDataURL("image/png");
    setSavedShots((prev) => [dataUrl, ...prev]);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `crowncheck-fav-${Date.now()}.png`;
    a.click();
  };

  const activeFilter = HAIR_FILTERS.find((f) => f.id === filterId)!;

  /* ── UI ─────────────────────────────────────────────────────────── */
  return (
    <motion.div
      key="mirror"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="h-screen flex flex-col bg-black overflow-hidden"
    >
      <Navbar currentView="mirror" onNavigate={onNavigate} isLoggedIn={true}
        onLogout={onLogout} theme={theme} toggleTheme={toggleTheme} />

      <div className="relative flex-1 overflow-hidden min-h-0">

        <video ref={videoRef} autoPlay playsInline muted className="hidden"
          onCanPlay={() => setCameraReady(true)} />

        {/* Canvas always present so the render loop can start */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {cameraError && (() => {
          const ERRORS: Record<string, { icon: string; title: string; body: string; hint?: string }> = {
            INSECURE_CONTEXT: {
              icon: "lock",
              title: "Secure connection required",
              body: "Chrome only allows camera access on localhost or HTTPS.",
              hint: "Open this page at http://localhost:3000 in your browser.",
            },
            PERMISSION_DENIED: {
              icon: "videocam_off",
              title: "Camera blocked",
              body: 'Click the camera icon in Chrome\'s address bar → "Always allow" → Retry.',
              hint: "Or go to Chrome Settings → Privacy → Camera and allow this site.",
            },
            NO_CAMERA: {
              icon: "no_photography",
              title: "No camera found",
              body: "Connect a webcam or allow browser access to your built-in camera.",
            },
            CAMERA_IN_USE: {
              icon: "warning",
              title: "Camera in use",
              body: "Another app or browser tab is using your camera. Close it and retry.",
            },
            UNKNOWN: {
              icon: "error",
              title: "Camera error",
              body: "Something went wrong starting the camera.",
              hint: "Try refreshing the page (Ctrl+R).",
            },
          };
          const e = ERRORS[cameraError] ?? ERRORS.UNKNOWN;
          return (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/90 text-center px-10 z-20">
              <span className="material-symbols-outlined text-7xl text-primary/60">{e.icon}</span>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-white">{e.title}</h3>
                <p className="text-white/50 font-sans text-sm max-w-xs leading-relaxed">{e.body}</p>
                {e.hint && <p className="text-primary/70 font-sans text-xs max-w-xs">{e.hint}</p>}
              </div>
              <button onClick={() => startCamera(facingMode)}
                className="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold font-sans text-sm hover:brightness-110 active:scale-95 transition-all">
                Retry
              </button>
            </div>
          );
        })()}

        {/* Loading splash — only blocks while camera is starting */}
        <AnimatePresence>
          {!cameraReady && !cameraError && (
            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 z-30">
              <span className="material-symbols-outlined text-5xl text-primary animate-spin">progress_activity</span>
              <p className="text-white/40 font-sans text-sm uppercase tracking-widest">Starting camera…</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status pill */}
        {cameraReady && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border transition-all duration-500 ${hairDetected ? "border-primary/40" : "border-white/10"}`}>
              <div className={`w-2 h-2 rounded-full transition-colors ${hairDetected ? "bg-primary animate-pulse" : "bg-white/20"}`} />
              <span className="font-sans text-[10px] uppercase tracking-widest text-white/70 font-bold">
                {mode === "styles"
                  ? (hairDetected ? "Face tracked" : "Position your face")
                  : (hairDetected ? "Hair detected" : "Show your hair")}
              </span>
            </div>
          </div>
        )}

        {/* Top controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
          <div className="glass-panel px-3 py-2 rounded-full flex items-center gap-2">
            <span className="text-[10px] font-sans uppercase tracking-widest text-white/50">Blend</span>
            <input type="range" min={30} max={100} value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(Number(e.target.value))}
              className="w-20 accent-primary" />
          </div>
          <button onClick={() => setFacingMode((m) => m === "user" ? "environment" : "user")}
            className="glass-panel w-11 h-11 rounded-full flex items-center justify-center text-white hover:text-primary transition-colors active:scale-90">
            <span className="material-symbols-outlined text-xl">flip_camera_ios</span>
          </button>
        </div>

        {/* ── Bottom dock ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-safe bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-8">

          {/* Mode toggle */}
          <div className="flex gap-2 px-5 mb-3 overflow-x-auto no-scrollbar">
            {([
              { id: "colours", icon: "palette",   label: "Colours" },
              { id: "styles",  icon: "face",       label: "Styles"  },
              { id: "makeup",  icon: "auto_awesome", label: "Makeup"},
            ] as { id: Mode; icon: string; label: string }[]).map(({ id: m, icon, label }) => (
              <button key={m} onClick={() => setMode(m)}
                className={`shrink-0 flex items-center gap-1.5 px-5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${mode === m ? "bg-primary text-on-primary" : "bg-white/10 text-white/50 hover:text-white"}`}>
                <span className="material-symbols-outlined text-[14px]">{icon}</span>
                {label}
              </button>
            ))}
            <button onClick={() => setOverlayOpacity(0)}
              className={`ml-auto px-4 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${overlayOpacity === 0 ? "bg-white text-black" : "bg-white/10 text-white/40 hover:text-white"}`}>
              Off
            </button>
          </div>

          <AnimatePresence mode="wait">

            {/* ── Colours panel ── */}
            {mode === "colours" && (
              <motion.div key="colours" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                {segStatus === "loading" && (
                  <div className="flex items-center gap-2 px-5 mb-2">
                    <span className="material-symbols-outlined text-primary animate-spin text-sm">progress_activity</span>
                    <span className="text-white/40 font-sans text-[10px] uppercase tracking-widest">Loading colour AI…</span>
                  </div>
                )}
                {segStatus === "error" && (
                  <div className="flex items-center gap-2 px-5 mb-2">
                    <span className="text-white/30 font-sans text-[10px]">Hair colour AI unavailable.</span>
                  </div>
                )}
                <div className="flex gap-2 px-5 mb-3 overflow-x-auto no-scrollbar">
                  {COLOR_GROUPS.map((g) => (
                    <button key={g} onClick={() => setColorGroup(g)}
                      className={`shrink-0 px-4 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all ${g === colorGroup ? "bg-white/20 text-white" : "text-white/30 hover:text-white"}`}>
                      {g}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 px-5 overflow-x-auto no-scrollbar pb-1">
                  {PALETTE.filter((c) => c.group === colorGroup).map((color) => {
                    const active = selectedColor === color.hex && overlayOpacity > 0;
                    return (
                      <button key={color.hex}
                        onClick={() => { setSelectedColor(color.hex); if (overlayOpacity === 0) setOverlayOpacity(70); }}
                        className="shrink-0 flex flex-col items-center gap-1.5 group">
                        <motion.div
                          animate={{ scale: active ? 1.18 : 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className={`w-11 h-11 rounded-full border-2 transition-all ${active ? "border-white shadow-[0_0_14px_rgba(255,255,255,0.5)]" : "border-white/20 group-hover:border-white/50"}`}
                          style={{ backgroundColor: color.hex }} />
                        <span className={`font-sans text-[8px] uppercase font-bold tracking-wider whitespace-nowrap ${active ? "text-white" : "text-white/30"}`}>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── Styles panel ── */}
            {mode === "styles" && (
              <motion.div key="styles" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                {landStatus === "loading" && (
                  <div className="flex items-center justify-center gap-3 py-7 px-5">
                    <span className="material-symbols-outlined text-primary animate-spin text-xl">progress_activity</span>
                    <span className="text-white/50 font-sans text-xs uppercase tracking-widest">Loading face AI…</span>
                  </div>
                )}
                {landStatus === "error" && (
                  <div className="flex items-center justify-center gap-3 py-7 px-5">
                    <span className="text-white/40 font-sans text-xs">Failed to load face AI.</span>
                    <button onClick={() => { landRef.current = null; setLandRetry((r) => r + 1); }}
                      className="text-primary font-sans text-xs font-bold underline">Retry</button>
                  </div>
                )}
                {landStatus === "ready" && (<>
                  {/* Filter cards */}
                  <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar mb-3 pb-1">
                    {HAIR_FILTERS.map((f) => {
                      const active = filterId === f.id && overlayOpacity > 0;
                      return (
                        <button key={f.id}
                          onClick={() => { setFilterId(f.id); setFilterColor(f.defaultColor); if (overlayOpacity === 0) setOverlayOpacity(80); }}
                          className="shrink-0 flex flex-col items-center gap-1.5 group">
                          <motion.div
                            animate={{ scale: active ? 1.1 : 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${active ? "border-primary shadow-[0_0_16px_rgba(244,179,219,0.5)]" : "border-white/10 opacity-50 group-hover:opacity-90"}`}
                            style={{ background: `linear-gradient(135deg, ${f.defaultColor}cc, ${f.defaultColor}44)` }}>
                            <span className="material-symbols-outlined text-2xl text-white/80">
                              {f.id === "afro"      ? "trip_origin"   :
                               f.id === "hightop"   ? "rectangle"     :
                               f.id === "boxbraids" ? "more_vert"      :
                               f.id === "locs"      ? "format_list_bulleted" :
                               f.id === "mohawk"    ? "vertical_align_top" :
                                                      "reorder"}
                            </span>
                          </motion.div>
                          <span className={`font-sans text-[9px] uppercase font-bold tracking-wider whitespace-nowrap ${active ? "text-primary" : "text-white/35"}`}>{f.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  {/* Per-filter colour options */}
                  {activeFilter && (
                    <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
                      {activeFilter.colors.map((c, i) => {
                        const active = filterColor === c && overlayOpacity > 0;
                        return (
                          <button key={c}
                            onClick={() => { setFilterColor(c); if (overlayOpacity === 0) setOverlayOpacity(80); }}
                            className="shrink-0 flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 rounded-full border-2 transition-all ${active ? "border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.4)]" : "border-white/20"}`}
                              style={{ backgroundColor: c }} />
                            <span className={`font-sans text-[7px] uppercase font-bold tracking-wider whitespace-nowrap ${active ? "text-white" : "text-white/25"}`}>
                              {activeFilter.colorNames[i]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>)}
              </motion.div>
            )}
            {/* ── Makeup panel ── */}
            {mode === "makeup" && (
              <motion.div key="makeup" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                {landStatus === "loading" && (
                  <div className="flex items-center justify-center gap-3 py-7 px-5">
                    <span className="material-symbols-outlined text-primary animate-spin text-xl">progress_activity</span>
                    <span className="text-white/50 font-sans text-xs uppercase tracking-widest">Loading face AI…</span>
                  </div>
                )}
                {landStatus === "error" && (
                  <div className="flex items-center justify-center gap-3 py-7 px-5">
                    <span className="text-white/40 font-sans text-xs">Failed to load face AI.</span>
                    <button onClick={() => { landRef.current = null; setLandRetry((r) => r + 1); }}
                      className="text-primary font-sans text-xs font-bold underline">Retry</button>
                  </div>
                )}
                {landStatus === "ready" && (<>
                {/* Sub-section tabs */}
                <div className="flex gap-2 px-5 mb-3">
                  {([
                    { id: "brows",  label: "Brows",  on: browsOn,  toggle: () => { setBrowsOn(!browsOn); if (!browsOn && overlayOpacity === 0) setOverlayOpacity(85); } },
                    { id: "lashes", label: "Lashes", on: lashesOn, toggle: () => { setLashesOn(!lashesOn); if (!lashesOn && overlayOpacity === 0) setOverlayOpacity(85); } },
                    { id: "lips",   label: "Lips",   on: lipsOn,   toggle: () => { setLipsOn(!lipsOn); if (!lipsOn && overlayOpacity === 0) setOverlayOpacity(85); } },
                  ] as { id: typeof mkSection; label: string; on: boolean; toggle: () => void }[]).map(({ id, label, on, toggle }) => (
                    <button key={id} onClick={() => { setMkSection(id); toggle(); }}
                      className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all border ${mkSection === id && on ? "bg-primary text-on-primary border-primary" : on ? "bg-white/15 text-white border-white/20" : "bg-white/5 text-white/35 border-white/10"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${on ? "bg-primary" : "bg-white/20"}`} />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Brows options */}
                {mkSection === "brows" && (
                  <div className="px-5 space-y-2">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                      {BROW_STYLES.map((s) => (
                        <button key={s.id} onClick={() => setBrowStyle(s.id)}
                          className={`shrink-0 px-4 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all ${browStyle === s.id ? "bg-white/25 text-white" : "text-white/30 hover:text-white"}`}>
                          {s.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                      {BROW_COLORS.map((c) => (
                        <button key={c.hex} onClick={() => setBrowColor(c.hex)}
                          className="shrink-0 flex flex-col items-center gap-1">
                          <div className={`w-9 h-9 rounded-full border-2 transition-all ${browColor === c.hex ? "border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.35)]" : "border-white/20"}`}
                            style={{ backgroundColor: c.hex }} />
                          <span className={`font-sans text-[7px] uppercase tracking-wider ${browColor === c.hex ? "text-white" : "text-white/25"}`}>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lashes options */}
                {mkSection === "lashes" && (
                  <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
                    {LASH_STYLES.map((s) => (
                      <button key={s.id} onClick={() => setLashStyle(s.id)}
                        className={`shrink-0 flex flex-col items-center gap-1.5 group`}>
                        <div className={`w-16 h-14 rounded-xl flex items-center justify-center border-2 transition-all ${lashStyle === s.id ? "border-primary bg-white/10 shadow-[0_0_14px_rgba(244,179,219,0.4)]" : "border-white/10 bg-white/5 opacity-50 group-hover:opacity-80"}`}>
                          <span className="material-symbols-outlined text-white text-2xl">{s.icon}</span>
                        </div>
                        <span className={`font-sans text-[9px] uppercase font-bold tracking-wider ${lashStyle === s.id ? "text-primary" : "text-white/30"}`}>{s.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Lips options */}
                {mkSection === "lips" && (
                  <div className="px-5 space-y-2">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar mb-1">
                      {LIP_FINISHES.map((f) => (
                        <button key={f.id} onClick={() => setLipFinish(f.id)}
                          className={`shrink-0 px-4 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all ${lipFinish === f.id ? "bg-white/25 text-white" : "text-white/30 hover:text-white"}`}>
                          {f.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                      {LIP_COLORS.map((c) => (
                        <button key={c.hex} onClick={() => setLipColor(c.hex)}
                          className="shrink-0 flex flex-col items-center gap-1">
                          <div className={`w-9 h-9 rounded-full border-2 transition-all ${lipColor === c.hex ? "border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.35)]" : "border-white/20"}`}
                            style={{ backgroundColor: c.hex }} />
                          <span className={`font-sans text-[7px] uppercase tracking-wider ${lipColor === c.hex ? "text-white" : "text-white/25"}`}>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                </>)}
              </motion.div>
            )}

          </AnimatePresence>

          {/* Shutter row — always visible at the bottom of the dock */}
          <div className="flex items-center justify-center gap-8 mt-4 pb-6 px-5">
            <button onClick={() => setShowGallery(true)}
              className="relative w-12 h-12 glass-panel rounded-full flex items-center justify-center text-white hover:text-primary transition-all active:scale-90">
              <span className="material-symbols-outlined">collections</span>
              {savedShots.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] font-bold flex items-center justify-center">
                  {savedShots.length > 9 ? "9+" : savedShots.length}
                </span>
              )}
            </button>
            <button onClick={handleCapture}
              className="p-1 rounded-full border-4 border-primary/60 hover:border-primary transition-all active:scale-90">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-[0_0_28px_rgba(244,179,219,0.6)]">
                <span className="material-symbols-outlined text-3xl">photo_camera</span>
              </div>
            </button>
            <button onClick={handleQuickSave}
              className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-white hover:text-primary transition-all active:scale-90">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
        </div>
      </div>

      <canvas ref={captureCanvas} className="hidden" />

      {/* Session gallery modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col"
            onClick={() => setShowGallery(false)}>
            <div className="flex items-center justify-between px-6 pt-6 pb-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="font-display text-white font-bold text-lg">Session Photos</h2>
              <button onClick={() => setShowGallery(false)}
                className="w-10 h-10 glass-panel rounded-full flex items-center justify-center text-white hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {savedShots.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-white/30">
                <span className="material-symbols-outlined text-5xl">photo_library</span>
                <p className="font-sans text-sm">No photos yet — tap the shutter to capture</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-4 pb-6" onClick={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-3 gap-2">
                  {savedShots.map((shot, i) => (
                    <div key={i} className="relative aspect-[9/16] rounded-xl overflow-hidden group">
                      <img src={shot} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100">
                        <a href={shot} download={`crowncheck-${i + 1}.png`}
                          className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-lg">
                          <span className="material-symbols-outlined text-sm">download</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capture modal */}
      <AnimatePresence>
        {captured && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-8"
            onClick={() => setCaptured(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <img src={captured} alt="Captured" className="w-full" />
              <div className="flex gap-3 p-4 bg-surface-container">
                <a href={captured} download="crowncheck.png"
                  className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-bold text-center font-sans text-sm">Save Photo</a>
                <button onClick={() => setCaptured(null)}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold font-sans text-sm">Discard</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
