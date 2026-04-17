import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { View } from "../types";

export default function ConsultantsView({
  onBack,
  onNavigate,
  onLogout,
  theme,
  toggleTheme
}: {
  onBack: () => void;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void
}) {
  const [activeFilter, setActiveFilter] = useState("All Masters");
  const filters = ["All Masters", "Precision Fades", "Avant-Garde Color", "Sculptural Form"];

  return (
    <motion.div
      key="consultants"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-surface"
    >
      <Navbar
        currentView="consultants"
        onNavigate={onNavigate}
        isLoggedIn={true}
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* ── Full-bleed hero ── */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, color-mix(in srgb, var(--color-primary) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 5%, transparent) 1px, transparent 1px)`,
          backgroundSize: '6rem 4rem',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle 900px at 0% 0%, color-mix(in srgb, var(--color-primary-container) 55%, transparent), transparent)' }}
        />
        <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--color-surface))' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 space-y-4">
          <div className="badge border border-primary/20">
            <span className="material-symbols-outlined text-primary text-[18px] mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            Certified AI Visionaries
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tighter leading-none text-on-surface max-w-4xl">
            The Marketplace of <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-tertiary">Future Forms</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed font-sans">
            Connect with elite stylists who bridge the gap between AI-simulated aesthetics and master craftsmanship. From precision fades to digital-first color transformations.
          </p>
        </div>
      </div>

      <main className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Filters */}
        <section className="mb-12 flex flex-wrap gap-4 items-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-sans text-sm border transition-all ${activeFilter === filter
                ? "bg-primary-container text-on-primary-container font-semibold border-primary/30"
                : "bg-surface-container-low text-on-surface-variant hover:text-primary border-outline-variant/10 font-medium"
                }`}
            >
              {filter}
            </button>
          ))}
          <div className="h-6 w-px bg-outline-variant/30 mx-2 hidden md:block"></div>
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all text-sm font-medium font-sans">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Refine Vision
          </button>
        </section>

        {/* Consultant Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Consultant 1: Elena Kross */}
          <article className="md:col-span-8 group relative overflow-hidden rounded-[2rem] bg-surface-container shadow-2xl transition-all hover:-translate-y-1 aspect-video md:aspect-video">
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                alt="Elena Kross"
                src="https://images.unsplash.com/photo-1599351431247-f10b21ce5602?auto=format&fit=crop&q=80&w=1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase font-sans">
                    <span className="material-symbols-outlined text-[16px]">military_tech</span>
                    Master Stylist
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold font-display text-on-surface">Elena Kross</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-tertiary">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-bold">4.9</span>
                    </div>
                    <span className="text-on-surface-variant text-sm font-medium font-sans">124 Consultations</span>
                  </div>
                </div>
                <div className="hidden md:flex gap-3">
                  <span className="px-4 py-1.5 rounded-full glass-panel border border-white/10 text-[10px] font-bold uppercase tracking-wider text-on-surface">Avant-Garde Color</span>
                  <span className="px-4 py-1.5 rounded-full glass-panel border border-white/10 text-[10px] font-bold uppercase tracking-wider text-on-surface">Digital Texture</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex-1 md:flex-none px-8 py-4 rounded-xl bg-linear-to-r from-primary to-primary-container text-on-primary font-bold tracking-tight transition-all active:scale-95 shadow-[0_0_20px_rgba(244,179,219,0.3)] font-display">
                  Book AR Consultation
                </button>
                <button
                  onClick={() => onNavigate("lookbook")}
                  className="flex-1 md:flex-none px-8 py-4 rounded-xl bg-surface-container-highest/60 backdrop-blur-md text-on-surface font-semibold border border-outline-variant/30 hover:bg-surface-container-highest transition-all font-display"
                >
                  View Lookbook
                </button>
              </div>
            </div>
          </article>

          {/* Consultant 2: Marcus Thorne */}
          <article className="md:col-span-4 group flex flex-col bg-surface-container rounded-[2rem] overflow-hidden transition-all hover:bg-surface-container-high border border-transparent hover:border-outline-variant/20 shadow-xl">
            <div className="h-64 overflow-hidden relative">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Marcus Thorne"
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600"
              />
              <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface">Available Now</span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold font-display mb-1 text-on-surface">Marcus Thorne</h3>
                <p className="text-on-surface-variant text-[10px] font-bold mb-4 uppercase tracking-widest font-sans">Precision Fades & Sculpting</p>
                <p className="text-on-surface-variant/80 text-sm leading-relaxed line-clamp-3 font-sans">
                  Specializing in translating complex AI geometries into wearable street-ready masterpieces. Former lead stylist for Neo-Tokyo fashion week.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant font-sans">Rating</span>
                  <span className="text-tertiary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8
                  </span>
                </div>
                <button className="w-full py-4 rounded-xl bg-surface-container-highest text-primary font-bold border border-primary/20 hover:bg-primary-container/20 transition-all font-display">
                  Book Consultation
                </button>
              </div>
            </div>
          </article>

          {/* Consultant 3: Sasha Vane */}
          <article className="md:col-span-12 flex flex-col md:flex-row items-center gap-8 p-8 rounded-[2rem] bg-surface-container border border-outline-variant/10 hover:border-primary/20 transition-all group">
            <div className="w-40 h-40 shrink-0 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
              <img
                className="w-full h-full object-cover"
                alt="Sasha Vane"
                src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=300"
              />
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-[10px] font-bold uppercase border border-secondary/20">Chrome Finishing</span>
                <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-[10px] font-bold uppercase border border-secondary/20">Fluid Dynamics</span>
              </div>
              <h3 className="text-3xl font-bold font-display text-on-surface">Sasha Vane</h3>
              <p className="text-on-surface-variant max-w-xl font-sans text-sm">Master of fluid silhouette and iridescent finishing. Sasha uses proprietary CrownCheck algorithms to predict hair growth patterns for 6-month styles.</p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <div className="flex items-center justify-center md:justify-end gap-2 text-lg font-bold mb-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                <span className="text-on-surface">$120 / Session</span>
              </div>
              <button className="px-8 py-4 rounded-xl bg-primary text-on-primary font-bold shadow-lg hover:shadow-primary/20 transition-all active:scale-95 font-display">
                Book AR Consultation
              </button>
            </div>
          </article>

          {/* Consultant 4 & 5: Julian Grey & Miki Sato */}
          {[
            { name: "Julian Grey", tag: "Synthetic Textures", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200", rating: 5 },
            { name: "Miki Sato", tag: "Cyber-Organic Forms", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200", rating: 4 }
          ].map((c) => (
            <article key={c.name} className="md:col-span-6 bg-surface-container-low rounded-[2rem] p-8 flex gap-6 items-start hover:bg-surface-container transition-colors border border-outline-variant/5 group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" alt={c.name} src={c.img} />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold font-display text-on-surface">{c.name}</h4>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1 font-sans">{c.tag}</p>
                </div>
                <div className="flex gap-1 text-tertiary">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: `'FILL' ${s <= c.rating ? 1 : 0}` }}>star</span>
                  ))}
                </div>
                <button className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all font-sans">
                  Reserve Slot <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Tech Section */}
        <section className="mt-24 relative rounded-[3rem] overflow-hidden bg-surface-container-highest/30 border border-primary/10">
          <div className="p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-primary font-bold tracking-widest uppercase font-sans text-xs">The Tech Stack</span>
              <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight text-on-surface">Live AR <br />Blueprint Mapping</h2>
              <p className="text-on-surface-variant leading-relaxed text-lg font-sans">
                Our consultants don't just guess. Using CrownCheck's spatial engine, they project a 1:1 holographic model of your future look onto your current profile, ensuring zero translation errors between vision and reality.
              </p>
              <div className="flex gap-4">
                <div className="bg-surface-container-low p-4 rounded-2xl flex-1 border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary mb-2">view_in_ar</span>
                  <div className="font-bold text-xs uppercase tracking-widest text-on-surface">Spatial Sync</div>
                </div>
                <div className="bg-surface-container-low p-4 rounded-2xl flex-1 border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary mb-2">biotech</span>
                  <div className="font-bold text-xs uppercase tracking-widest text-on-surface">Growth Sim</div>
                </div>
              </div>
            </div>
            <div className="relative h-96 md:h-full rounded-3xl overflow-hidden min-h-[400px]">
              <img
                className="w-full h-full object-cover"
                alt="AR Tech"
                src="https://images.unsplash.com/photo-1621605815841-28d944683b83?auto=format&fit=crop&q=80&w=1000"
              />
              <div className="absolute inset-0 bg-primary/20 backdrop-overlay pointer-events-none mix-blend-overlay"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
