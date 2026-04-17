import React from "react";
import { motion } from "motion/react";

const animationStyle = `
@keyframes gentle-float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}
.gentle-float { animation: gentle-float 5s ease-in-out infinite; }
.gentle-float-slow { animation: gentle-float 7s ease-in-out infinite; }
.gentle-float-fast { animation: gentle-float 4s ease-in-out infinite; }
`;

interface HeroCollageProps {
  title: React.ReactNode;
  subtitle: string;
  stats: { value: string; label: string }[];
  images: string[];
  onCTA: () => void;
  onSecondary: () => void;
}

export default function HeroCollage({
  title,
  subtitle,
  stats,
  images,
  onCTA,
  onSecondary,
}: HeroCollageProps) {
  // images[0] = main portrait, rest used for the style stack card
  const portrait = images[0] ?? "";
  const styleImgs = images.slice(1, 4);

  return (
    <>
      <style>{animationStyle}</style>
      <section className="relative w-full overflow-hidden bg-surface min-h-screen flex items-center">

        {/* ── Soft gradient blobs (light-mode native, theme colors) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 700px 600px at 80% 50%, color-mix(in srgb, var(--color-primary) 18%, transparent), transparent)",
              "radial-gradient(ellipse 500px 400px at 10% 80%, color-mix(in srgb, var(--color-secondary) 14%, transparent), transparent)",
              "radial-gradient(ellipse 400px 300px at 90% 10%, color-mix(in srgb, var(--color-tertiary) 12%, transparent), transparent)",
            ].join(", "),
          }}
        />

        {/* ── Main content grid ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ══ LEFT COLUMN ══ */}
          <div className="flex flex-col gap-8">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display font-extrabold tracking-tighter leading-[1.02] text-5xl sm:text-6xl md:text-7xl text-on-surface uppercase"
            >
              {title}
            </motion.h1>

            {/* Subtitle + CTA row */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-base md:text-lg text-on-surface-variant font-sans leading-relaxed max-w-xs"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex gap-3 shrink-0"
              >
                <button
                  onClick={onCTA}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-bold text-sm text-on-primary hover:opacity-90 active:scale-95 transition-all shadow-lg"
                  style={{ background: "var(--color-on-surface)" }}
                >
                  Try it Now
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </button>
                <button
                  onClick={onSecondary}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-bold text-sm text-on-surface border border-outline-variant hover:bg-surface-container transition-all"
                >
                  View Lookbook
                </button>
              </motion.div>
            </div>

            {/* Bottom row: AI card + floating style tiles */}
            <div className="flex flex-col sm:flex-row gap-5 mt-2">

              {/* ── "AI Mirror Active" dark accent card (like the "Special Offer" card) ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="relative rounded-[1.5rem] overflow-hidden p-6 flex flex-col justify-between gap-3 w-full sm:w-52 min-h-[160px] shrink-0"
                style={{
                  background: "linear-gradient(135deg, var(--color-surface-container-highest) 0%, var(--color-primary-container) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-sans">AI Mirror</span>
                  <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center shadow">
                    <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_outward</span>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-display font-extrabold text-on-surface leading-none">Live</p>
                  <p className="text-3xl font-display font-extrabold text-primary leading-none">AR Ready</p>
                </div>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  Try 500+ styles on your face in real-time
                </p>
              </motion.div>

              {/* Stats + floating cards column */}
              <div className="flex flex-col gap-4 flex-1">

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex gap-6"
                >
                  {stats.map((stat, i) => (
                    <div key={i}>
                      <p
                        className="text-2xl font-display font-extrabold bg-clip-text text-transparent"
                        style={{
                          backgroundImage: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 60%, var(--color-tertiary) 100%)",
                        }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-[10px] font-sans text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>

                {/* Scan accuracy floating card (like the review card) */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-surface-container rounded-2xl p-4 shadow-lg border border-outline-variant/10 gentle-float-slow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border-2"
                      style={{ borderColor: "var(--color-primary)" }}>
                      {styleImgs[0] && <img src={styleImgs[0]} className="w-full h-full object-cover" alt="" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface font-display">"Perfect match for my face shape"</p>
                      <p className="text-[10px] text-on-surface-variant font-sans">via CrownCheck AI ✦</p>
                    </div>
                  </div>
                </motion.div>

                {/* Top style card (like the product card) */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-surface-container rounded-2xl p-4 shadow-lg border border-outline-variant/10 flex items-center gap-4 gentle-float"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-primary-container/30">
                    {styleImgs[1] && <img src={styleImgs[1]} className="w-full h-full object-cover" alt="" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary font-sans">Top Match</p>
                    <p className="text-sm font-bold text-on-surface font-display truncate">Precision Skin Fade</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className="material-symbols-outlined text-primary text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-base font-display font-extrabold text-on-surface shrink-0">97%</p>
                </motion.div>

              </div>
            </div>
          </div>

          {/* ══ RIGHT COLUMN — Portrait + floating scan UI ══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Portrait image */}
            <div
              className="relative w-full max-w-sm lg:max-w-md aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl"
              style={{
                boxShadow: "0 40px 80px -20px color-mix(in srgb, var(--color-primary) 30%, transparent)",
              }}
            >
              <img
                src={portrait}
                alt="CrownCheck AI hairstyle scan"
                className="w-full h-full object-cover object-top"
              />
              {/* Subtle gradient at bottom */}
              <div
                className="absolute bottom-0 inset-x-0 h-1/3 pointer-events-none"
                style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--color-surface-container-highest) 60%, transparent), transparent)" }}
              />
            </div>

            {/* AR scan ring overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-40 h-40 rounded-full border-2 animate-pulse"
                style={{ borderColor: "color-mix(in srgb, var(--color-primary) 50%, transparent)" }}
              >
                <div
                  className="w-full h-full rounded-full border flex items-center justify-center"
                  style={{ borderColor: "color-mix(in srgb, var(--color-primary) 25%, transparent)" }}
                >
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ background: "color-mix(in srgb, var(--color-primary) 40%, transparent)" }}
                  />
                </div>
              </div>
            </div>

            {/* Top-right: "View styles" circle button (like the arrow button in CAREON) */}
            <div
              className="absolute top-6 right-6 w-14 h-14 rounded-full bg-surface shadow-xl border border-outline-variant/20 flex items-center justify-center gentle-float-fast cursor-pointer hover:bg-primary hover:text-on-primary transition-all"
              onClick={onSecondary}
            >
              <span className="material-symbols-outlined text-on-surface text-[20px]">arrow_outward</span>
            </div>

            {/* Bottom: Scan status chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-xl border border-outline-variant/10 flex items-center gap-3 whitespace-nowrap gentle-float-slow"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-on-surface-variant">Scan Active</p>
              <p className="text-sm font-display font-extrabold text-on-surface">98.4% Accuracy</p>
            </motion.div>

            {/* Mid-right: "500+ styles" floating chip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 bg-surface rounded-2xl px-3 py-2 shadow-xl border border-outline-variant/10 gentle-float"
            >
              <p
                className="text-xl font-display font-extrabold bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
              >
                500+
              </p>
              <p className="text-[9px] font-sans text-on-surface-variant uppercase tracking-widest">Styles</p>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  );
}
