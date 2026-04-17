import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { View } from "../types";

const CONSULTANTS = [
  {
    id: 1,
    name: "Amara Osei",
    tag: "Precision Fades & Sculpting",
    specialty: ["Precision Fades", "All Masters"],
    bio: "Translating AI geometries into street-ready masterpieces. Former lead at New York Fashion Week, specialising in skin fades and crisp lineups.",
    rating: 4.9,
    sessions: 138,
    price: "$95",
    available: true,
    badges: ["Precision Fades", "Geometric Line-up"],
    // verified: Black man with beard from "black man fade haircut" Unsplash search
    image: "https://images.unsplash.com/photo-1657273363317-c2cb4d2d1e16?auto=format&fit=crop&q=80&w=800&h=900",
    featured: true,
  },
  {
    id: 2,
    name: "Tobe Nkosi",
    tag: "Natural Texture Expert",
    specialty: ["Avant-Garde Color", "All Masters"],
    bio: "Master of afro-textured hair — from wash-n-gos to sculpted afro shapes. Bridging cultural identity with modern technique.",
    rating: 4.8,
    sessions: 214,
    price: "$110",
    available: true,
    badges: ["Afro Texture", "Natural Color"],
    // verified: Black man with afro — Tobe Mokolo, from "afro hair black man" search #3
    image: "https://images.unsplash.com/photo-1643904524951-2a3a58856745?auto=format&fit=crop&q=80&w=800&h=900",
    featured: true,
  },
  {
    id: 3,
    name: "Zara Mensah",
    tag: "Braids & Locs Architect",
    specialty: ["Sculptural Form", "All Masters"],
    bio: "Sasha uses proprietary CrownCheck algorithms to predict hair growth for 6-month protective styles. Cornrows, locs, and braided sculptures are her signature.",
    rating: 5.0,
    sessions: 97,
    price: "$120",
    available: false,
    badges: ["Cornrows", "Locs Design"],
    // verified: woman with cornrows and denim jacket — explicitly confirmed on Unsplash
    image: "https://images.unsplash.com/photo-1673470907547-1c0c6a996095?auto=format&fit=crop&q=80&w=800&h=900",
  },
  {
    id: 4,
    name: "Kwame Darko",
    tag: "Fade Specialist",
    specialty: ["Precision Fades", "All Masters"],
    bio: "Clean, consistent fades every time. Kwame's technical precision has earned him a following across London and Accra.",
    rating: 4.7,
    sessions: 302,
    price: "$80",
    available: true,
    badges: ["Low Fade", "Shadow Fade"],
    // verified: Black man with beard and black shirt — fade search result #7
    image: "https://images.unsplash.com/photo-1648389824823-483ec5ca228a?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: 5,
    name: "Nia Adjei",
    tag: "Box Braids & Colour",
    specialty: ["Avant-Garde Color", "Sculptural Form", "All Masters"],
    bio: "Expert in vivid colour and intricate braided structures. Nia blends technique with artistry for truly bespoke looks.",
    rating: 4.9,
    sessions: 178,
    price: "$130",
    available: true,
    badges: ["Box Braids", "Colour Work"],
    // verified: Black woman with box braids and glasses — confirmed on Unsplash
    image: "https://images.unsplash.com/photo-1616166183781-0fdd2ef83374?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

export default function ConsultantsView({
  onBack,
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
  const [activeFilter, setActiveFilter] = useState("All Masters");
  const filters = ["All Masters", "Precision Fades", "Avant-Garde Color", "Sculptural Form"];

  const visible = CONSULTANTS.filter((c) => c.specialty.includes(activeFilter));
  const [featured1, featured2, ...rest] = visible;

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

      {/* ── Hero with image background + overlay ── */}
      <div className="relative overflow-hidden min-h-[520px] flex items-end">
        {/* Background image — verified: Black barber cutting a client's fade (Virginia, USA) */}
        <img
          src="https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&q=80&w=1600&h=700"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark gradient overlay — keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

        {/* Theme colour accent — subtle glow from left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 800px 600px at -10% 100%, color-mix(in srgb, var(--color-primary) 25%, transparent), transparent)",
          }}
        />

        {/* Fade to page background at the bottom */}
        <div
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-surface))" }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 space-y-5">
          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tighter leading-none text-white max-w-3xl">
            The Marketplace of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-tertiary">
              Future Forms
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed font-sans">
            Connect with elite stylists who bridge AI-simulated aesthetics and master craftsmanship
            — from precision fades to digital-first colour transformations.
          </p>
          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2 text-white/50 font-sans text-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">groups</span>
              {CONSULTANTS.length} master stylists
            </div>
            <div className="flex items-center gap-2 text-white/50 font-sans text-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">star</span>
              4.8 avg rating
            </div>
            <div className="flex items-center gap-2 text-white/50 font-sans text-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">view_in_ar</span>
              Live AR sessions
            </div>
          </div>
        </div>
      </div>

      <main className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Filters */}
        <section className="mb-10 flex flex-wrap gap-3 items-center pt-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-sans text-sm border transition-all ${
                activeFilter === filter
                  ? "bg-primary text-on-primary border-primary font-semibold shadow-lg shadow-primary/20"
                  : "bg-surface-container-low text-on-surface-variant hover:text-primary border-outline-variant/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </section>

        {/* Consultant grid */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Featured card 1 */}
          {featured1 && (
            <article className="md:col-span-7 group relative overflow-hidden rounded-[2rem] bg-surface-container shadow-2xl transition-all hover:-translate-y-1 min-h-[420px]">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                alt={featured1.name}
                src={featured1.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              {featured1.available && (
                <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Available Now</span>
                </div>
              )}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 space-y-4">
                <div className="flex flex-wrap gap-2 mb-1">
                  {featured1.badges.map((b) => (
                    <span key={b} className="px-3 py-1 rounded-full glass-panel border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/80">{b}</span>
                  ))}
                </div>
                <div>
                  <p className="text-primary font-bold text-xs tracking-widest uppercase font-sans mb-1">{featured1.tag}</p>
                  <h2 className="text-4xl font-bold font-display text-white">{featured1.name}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-tertiary font-bold flex items-center gap-1 text-sm">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {featured1.rating}
                    </span>
                    <span className="text-white/40 text-xs font-sans">{featured1.sessions} sessions</span>
                    <span className="text-white/40 text-xs font-sans">from {featured1.price}</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button className="px-7 py-3.5 rounded-xl bg-primary text-on-primary font-bold font-display text-sm shadow-[0_0_20px_rgba(244,179,219,0.3)] hover:brightness-110 active:scale-95 transition-all">
                    Book AR Consultation
                  </button>
                  <button onClick={() => onNavigate("lookbook")}
                    className="px-7 py-3.5 rounded-xl glass-panel text-white font-semibold border border-white/20 hover:bg-white/15 transition-all font-display text-sm">
                    View Lookbook
                  </button>
                </div>
              </div>
            </article>
          )}

          {/* Featured card 2 */}
          {featured2 && (
            <article className="md:col-span-5 group relative overflow-hidden rounded-[2rem] bg-surface-container shadow-2xl transition-all hover:-translate-y-1 min-h-[420px]">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                alt={featured2.name}
                src={featured2.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              {featured2.available && (
                <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Available Now</span>
                </div>
              )}
              <div className="relative z-10 h-full flex flex-col justify-end p-7 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {featured2.badges.map((b) => (
                    <span key={b} className="px-3 py-1 rounded-full glass-panel border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/80">{b}</span>
                  ))}
                </div>
                <div>
                  <p className="text-primary font-bold text-xs tracking-widest uppercase font-sans mb-1">{featured2.tag}</p>
                  <h2 className="text-3xl font-bold font-display text-white">{featured2.name}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-tertiary font-bold flex items-center gap-1 text-sm">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {featured2.rating}
                    </span>
                    <span className="text-white/40 text-xs font-sans">{featured2.sessions} sessions</span>
                  </div>
                </div>
                <button className="self-start px-6 py-3 rounded-xl bg-primary text-on-primary font-bold font-display text-sm hover:brightness-110 active:scale-95 transition-all">
                  Book Consultation
                </button>
              </div>
            </article>
          )}

          {/* Remaining cards */}
          {rest.map((c) => (
            <article key={c.id}
              className="md:col-span-4 flex flex-col bg-surface-container rounded-[2rem] overflow-hidden border border-outline-variant/10 hover:border-primary/20 transition-all group shadow-lg">
              <div className="h-52 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={c.name}
                  src={c.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {c.available ? (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white">Available</span>
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/50">Fully Booked</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest font-sans mb-0.5">{c.tag}</p>
                  <h3 className="text-xl font-bold font-display text-on-surface">{c.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-tertiary font-bold flex items-center gap-1 text-xs">
                      <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {c.rating}
                    </span>
                    <span className="text-on-surface-variant text-xs font-sans">{c.sessions} sessions</span>
                  </div>
                </div>
                <p className="text-on-surface-variant/80 text-sm leading-relaxed font-sans line-clamp-2">{c.bio}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-on-surface font-bold font-sans">from {c.price}</span>
                  <button className="px-5 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-on-primary font-bold font-sans text-sm transition-all active:scale-95">
                    Book
                  </button>
                </div>
              </div>
            </article>
          ))}

          {visible.length === 0 && (
            <div className="md:col-span-12 py-24 text-center text-on-surface-variant font-sans">
              No stylists match this filter yet.
            </div>
          )}
        </motion.div>

        {/* Tech section */}
        <section className="mt-20 relative rounded-[2.5rem] overflow-hidden border border-primary/10">
          <img
            src="https://images.unsplash.com/photo-1594254773847-9fce26e950bc?auto=format&fit=crop&q=80&w=1400&h=500"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--color-surface-container-highest) 50%, transparent)" }} />
          <div className="relative z-10 p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-primary font-bold tracking-widest uppercase font-sans text-xs">The Tech Stack</span>
              <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight text-on-surface">
                Live AR <br />Blueprint Mapping
              </h2>
              <p className="text-on-surface-variant leading-relaxed font-sans">
                Our consultants project a 1:1 holographic model of your future look onto your current profile — zero translation errors between vision and reality.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: "view_in_ar", label: "Spatial Sync" },
                  { icon: "biotech",    label: "Growth Sim" },
                  { icon: "auto_fix_high", label: "AI Match" },
                ].map(({ icon, label }) => (
                  <div key={label} className="bg-surface-container p-4 rounded-2xl flex-1 border border-outline-variant/10 text-center">
                    <span className="material-symbols-outlined text-primary block mb-1">{icon}</span>
                    <div className="font-bold text-[10px] uppercase tracking-widest text-on-surface">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center justify-end">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
                <img
                  src="https://images.unsplash.com/photo-1643904524951-2a3a58856745?auto=format&fit=crop&q=80&w=600&h=600"
                  alt="AR Tech preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--color-primary) 30%, transparent), transparent)" }} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
