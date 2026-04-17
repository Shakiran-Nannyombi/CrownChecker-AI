import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import { View } from "../types";
import type { FaceDetector } from "@mediapipe/tasks-vision";

/* ─── Style catalogue ─────────────────────────────────────── */
const STYLES = [
  { name: "Modern Buzz",     category: "Fades",  image: "https://images.unsplash.com/photo-1599351431247-f10b21ce5602?auto=format&fit=crop&q=80&w=600" },
  { name: "Textured Crop",   category: "Fades",  image: "https://images.unsplash.com/photo-1621605815841-28d944683b83?auto=format&fit=crop&q=80&w=600" },
  { name: "Box Braids",      category: "Braids", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=600" },
  { name: "Taper Pompadour", category: "Fades",  image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600" },
  { name: "Wavy Flow",       category: "Long",   image: "https://images.unsplash.com/photo-1592647425550-8fe915cfa1f7?auto=format&fit=crop&q=80&w=600" },
  { name: "Bald Fade",       category: "Fades",  image: "https://images.unsplash.com/photo-1516914915600-240abe828880?auto=format&fit=crop&q=80&w=600" },
  { name: "Loc'd Out",       category: "Long",   image: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&w=600" },
  { name: "Micro Braids",    category: "Braids", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=600" },
];
const CATEGORIES = ["All", "Fades", "Braids", "Long"];

/* ─── Component ───────────────────────────────────────────── */
export default function MirrorView({
  onNavigate,
  onLogout,
  theme,
  toggleTheme,
}: {
  onBack: () => void;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  /* refs */
  const videoRef      = useRef<HTMLVideoElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const captureCanvas = useRef<HTMLCanvasElement>(null);
  const rafRef        = useRef<number>(0);
  const detectorRef   = useRef<FaceDetector | null>(null);
  const facesRef      = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const hairImgs      = useRef<Map<string, HTMLImageElement>>(new Map());
  const styleRef      = useRef(STYLES[0].name);
  const opacityRef    = useRef(50);
  const streamRef     = useRef<MediaStream | null>(null);

  /* state */
  const [modelStatus, setModelStatus]   = useState<"loading" | "ready" | "error">("loading");
  const [cameraReady, setCameraReady]   = useState(false);
  const [cameraError, setCameraError]   = useState<string | null>(null);
  const [facingMode, setFacingMode]     = useState<"user" | "environment">("user");
  const [category, setCategory]         = useState("All");
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0].name);
  const [overlayOpacity, setOverlayOpacity] = useState(50);
  const [captured, setCaptured]         = useState<string | null>(null);
  const [faceFound, setFaceFound]       = useState(false);

  /* keep refs in sync with state so render loop sees latest values */
  useEffect(() => { styleRef.current  = selectedStyle; },   [selectedStyle]);
  useEffect(() => { opacityRef.current = overlayOpacity; }, [overlayOpacity]);

  /* ── Preload hair images ── */
  useEffect(() => {
    STYLES.forEach((s) => {
      if (hairImgs.current.has(s.name)) return;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = s.image;
      hairImgs.current.set(s.name, img);
    });
  }, []);

  /* ── Load MediaPipe Face Detector ── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { FaceDetector, FilesetResolver } = await import("@mediapipe/tasks-vision");
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.15/wasm"
        );
        const detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          minDetectionConfidence: 0.6,
        });
        if (!cancelled) {
          detectorRef.current = detector;
          setModelStatus("ready");
        }
      } catch (e) {
        console.warn("MediaPipe failed to load:", e);
        if (!cancelled) setModelStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  /* ── Camera ── */
  const startCamera = useCallback(async (mode: "user" | "environment") => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setCameraReady(false);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setCameraError("Camera access denied. Please allow camera in your browser settings.");
    }
  }, []);

  useEffect(() => {
    startCamera(facingMode);
    return () => { streamRef.current?.getTracks().forEach((t) => t.stop()); };
  }, [facingMode, startCamera]);

  /* ── Render + detection loop ── */
  useEffect(() => {
    if (!cameraReady) return;
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isFront = facingMode === "user";
    let lastDetect = 0;

    const loop = () => {
      if (video.readyState < 2) { rafRef.current = requestAnimationFrame(loop); return; }

      /* sync canvas dimensions */
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width  = video.videoWidth  || 1280;
        canvas.height = video.videoHeight || 720;
      }
      const W = canvas.width;
      const H = canvas.height;

      /* draw video frame — mirrored for front cam via canvas flip */
      ctx.save();
      if (isFront) { ctx.translate(W, 0); ctx.scale(-1, 1); }
      ctx.drawImage(video, 0, 0, W, H);
      ctx.restore();

      /* face detection ~15 fps */
      const now = performance.now();
      if (detectorRef.current && now - lastDetect > 66) {
        lastDetect = now;
        try {
          const result = detectorRef.current.detectForVideo(video, now);
          if (result.detections.length > 0) {
            const bb = result.detections[0].boundingBox!;
            /* mirror x coord for front cam */
            const rawX = isFront ? W - bb.originX - bb.width : bb.originX;
            facesRef.current = { x: rawX, y: bb.originY, w: bb.width, h: bb.height };
            setFaceFound(true);
          } else {
            facesRef.current = null;
            setFaceFound(false);
          }
        } catch { /* ignore errors mid-stream */ }
      }

      /* draw hair overlay */
      const face    = facesRef.current;
      const hairImg = hairImgs.current.get(styleRef.current);
      if (face && hairImg?.complete && hairImg.naturalWidth > 0) {
        const hairW = face.w * 1.55;
        const hairH = hairW * (hairImg.naturalHeight / hairImg.naturalWidth);
        const hairX = face.x + face.w / 2 - hairW / 2;
        /* align so bottom ~25% of hair image lines up with the hairline */
        const hairY = face.y - hairH * 0.75;

        ctx.save();
        ctx.globalAlpha           = opacityRef.current / 100;
        ctx.globalCompositeOperation = "source-over";
        /* soft fade at bottom of overlay */
        const grad = ctx.createLinearGradient(0, hairY, 0, hairY + hairH);
        grad.addColorStop(0,   "rgba(0,0,0,1)");
        grad.addColorStop(0.6, "rgba(0,0,0,1)");
        grad.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.drawImage(hairImg, hairX, hairY, hairW, hairH);
        /* apply fade mask */
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillStyle = grad;
        ctx.fillRect(hairX, hairY, hairW, hairH);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cameraReady, facingMode]);

  /* ── Capture ── */
  const handleCapture = () => {
    const src = canvasRef.current;
    const dst = captureCanvas.current;
    if (!src || !dst) return;
    dst.width  = src.width;
    dst.height = src.height;
    const ctx = dst.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(src, 0, 0);
    setCaptured(dst.toDataURL("image/png"));
  };

  const filtered = category === "All" ? STYLES : STYLES.filter((s) => s.category === category);

  /* ── UI ── */
  return (
    <motion.div
      key="mirror"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-black"
    >
      <Navbar
        currentView="mirror"
        onNavigate={onNavigate}
        isLoggedIn={true}
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* ── Main camera area ── */}
      <div className="relative flex-1 overflow-hidden" style={{ minHeight: "calc(100vh - 64px)" }}>

        {/* hidden video source */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="hidden"
          onCanPlay={() => setCameraReady(true)}
        />

        {/* canvas = camera + AR overlay */}
        {!cameraError ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-surface-container-lowest text-center px-8">
            <span className="material-symbols-outlined text-6xl text-outline">videocam_off</span>
            <p className="text-on-surface-variant font-sans max-w-xs">{cameraError}</p>
            <button onClick={() => startCamera(facingMode)} className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold font-sans">
              Retry
            </button>
          </div>
        )}

        {/* Loading / status overlays */}
        <AnimatePresence>
          {(!cameraReady || modelStatus === "loading") && !cameraError && (
            <motion.div
              initial={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-4 z-20"
            >
              <span className="material-symbols-outlined text-5xl text-primary animate-spin">progress_activity</span>
              <p className="text-white/50 font-sans text-sm">
                {modelStatus === "loading" ? "Loading face detection…" : "Starting camera…"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Face-lock indicator */}
        {cameraReady && modelStatus !== "loading" && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border transition-all duration-500 ${faceFound ? "border-primary/40" : "border-white/10"}`}>
              <div className={`w-2 h-2 rounded-full transition-colors ${faceFound ? "bg-primary animate-pulse" : "bg-white/20"}`} />
              <span className="font-sans text-[10px] uppercase tracking-widest text-white/70 font-bold">
                {faceFound ? "Face Locked" : "Align your face"}
              </span>
            </div>
          </div>
        )}

        {/* ── Top controls ── */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
          {/* Opacity slider */}
          <div className="glass-panel px-3 py-2 rounded-full flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">opacity</span>
            <input
              type="range" min={10} max={80} value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(Number(e.target.value))}
              className="w-20 accent-primary"
            />
          </div>
          {/* Flip */}
          <button
            onClick={() => setFacingMode((m) => (m === "user" ? "environment" : "user"))}
            className="glass-panel w-11 h-11 rounded-full flex items-center justify-center text-white hover:text-primary transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined text-xl">flip_camera_ios</span>
          </button>
        </div>

        {/* ── Shutter controls ── */}
        <div className="absolute z-20 flex items-center gap-6" style={{ bottom: "calc(180px + 1rem)", left: "50%", transform: "translateX(-50%)" }}>
          <button
            onClick={() => onNavigate("lookbook")}
            className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-white hover:text-primary transition-all active:scale-90"
          >
            <span className="material-symbols-outlined">collections</span>
          </button>
          <button
            onClick={handleCapture}
            className="p-1 rounded-full border-4 border-primary/60 hover:border-primary transition-all active:scale-90"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-[0_0_28px_rgba(244,179,219,0.6)]">
              <span className="material-symbols-outlined text-3xl">photo_camera</span>
            </div>
          </button>
          <button className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-white hover:text-primary transition-all active:scale-90">
            <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>

        {/* ── Style dock (bottom) ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-4 pt-16 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
          {/* Category pills */}
          <div className="px-5 mb-3 flex gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all ${
                  category === cat ? "bg-primary text-on-primary" : "bg-white/10 text-white/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Style strip */}
          <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-2">
            {filtered.map((style) => {
              const active = selectedStyle === style.name;
              return (
                <button
                  key={style.name}
                  onClick={() => setSelectedStyle(style.name)}
                  className="shrink-0 flex flex-col items-center gap-1.5 group"
                >
                  <motion.div
                    animate={{ scale: active ? 1.08 : 1 }}
                    className={`w-16 h-20 md:w-20 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      active
                        ? "border-primary shadow-[0_0_18px_rgba(244,179,219,0.6)]"
                        : "border-white/10 opacity-45 grayscale group-hover:opacity-90 group-hover:grayscale-0"
                    }`}
                  >
                    <img src={style.image} alt={style.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </motion.div>
                  <span className={`font-sans text-[9px] uppercase font-bold tracking-wider transition-colors ${active ? "text-primary" : "text-white/35"}`}>
                    {style.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={captureCanvas} className="hidden" />

      {/* ── Capture preview modal ── */}
      <AnimatePresence>
        {captured && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-8"
            onClick={() => setCaptured(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={captured} alt="Captured" className="w-full" />
              <div className="flex gap-3 p-4 bg-surface-container">
                <a
                  href={captured}
                  download="crowncheck.png"
                  className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-bold text-center font-sans text-sm"
                >
                  Save Photo
                </a>
                <button
                  onClick={() => setCaptured(null)}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold font-sans text-sm"
                >
                  Discard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
