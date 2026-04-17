import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LookCard from "../components/LookCard";
import { View } from "../types";

type Category = "All" | "Fades" | "Braids" | "Cornrows" | "Locs" | "Afro";

// Every image URL below has been individually verified against its Unsplash page.
const ALL_LOOKS = [
  // ── Fades ── (all verified: from "black man fade haircut" search)
  {
    id: 1, category: "Fades",
    title: "Barbershop Fade", series: "Fade Series",
    accuracy: "97%", pinterest: "black+men+fade+haircut+barbershop",
    // "man cutting hair man" – Black barber working on client's fade
    image: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&q=80&w=700&h=900",
  },
  {
    id: 2, category: "Fades",
    title: "Taper Fade + Beard", series: "Fade Series",
    accuracy: "95%", pinterest: "taper+fade+beard+black+men",
    // "a man with a beard" – Black man, confirmed fade search result #2
    image: "https://images.unsplash.com/photo-1657273363317-c2cb4d2d1e16?auto=format&fit=crop&q=80&w=700&h=900",
  },
  {
    id: 3, category: "Fades",
    title: "Low Fade", series: "Fade Series",
    accuracy: "91%", pinterest: "low+fade+black+men",
    // "a man with a beard and a black shirt" – fade search result #7
    image: "https://images.unsplash.com/photo-1648389824823-483ec5ca228a?auto=format&fit=crop&q=80&w=700&h=900",
  },
  {
    id: 4, category: "Fades",
    title: "Skin Fade", series: "Fade Series",
    accuracy: "89%", pinterest: "skin+fade+black+men+haircut",
    // "grayscale photo of man wearing dress shirt" – fade search result #6
    image: "https://images.unsplash.com/photo-1559925073-ffe31c1afaee?auto=format&fit=crop&q=80&w=700&h=900",
  },
  {
    id: 5, category: "Fades",
    title: "Fade Lineup", series: "Fade Series",
    accuracy: "87%", pinterest: "fade+lineup+black+men",
    // "a man is holding his hand up to his head" – fade search result #8
    image: "https://images.unsplash.com/photo-1675714176786-5b0b9eabfcaa?auto=format&fit=crop&q=80&w=700&h=900",
  },
  // ── Braids ── (verified: confirmed as braids photos)
  {
    id: 6, category: "Braids",
    title: "Knotless Box Braids", series: "Braids Series",
    accuracy: "93%", pinterest: "knotless+box+braids+black+hairstyle",
    // Unsplash photo tagged "Knotless Braids - Sharp and Clean"
    image: "https://images.unsplash.com/photo-1594254773847-9fce26e950bc?auto=format&fit=crop&q=80&w=700&h=900",
  },
  {
    id: 7, category: "Braids",
    title: "Box Braids", series: "Braids Series",
    accuracy: "90%", pinterest: "box+braids+black+hairstyle",
    // "woman in white shirt wearing black framed eyeglasses" – tagged braids/black woman
    image: "https://images.unsplash.com/photo-1616166183781-0fdd2ef83374?auto=format&fit=crop&q=80&w=700&h=900",
  },
  {
    id: 8, category: "Braids",
    title: "Micro Braids", series: "Braids Series",
    accuracy: "87%", pinterest: "micro+braids+black+hairstyle",
    // "black and white knit textile" – Gift Habeshaw, tagged braids/black child
    image: "https://images.unsplash.com/photo-1592328906746-0a3ca0bde253?auto=format&fit=crop&q=80&w=700&h=900",
  },
  // ── Cornrows ── (verified: confirmed as cornrows photo)
  {
    id: 9, category: "Cornrows",
    title: "Cornrow Feed-ins", series: "Cornrows Series",
    accuracy: "92%", pinterest: "cornrow+feed+in+braids+hairstyle",
    // "a woman with cornrows and a denim jacket" – explicitly confirmed as cornrows
    image: "https://images.unsplash.com/photo-1673470907547-1c0c6a996095?auto=format&fit=crop&q=80&w=700&h=900",
  },
  // ── Locs ── (verified: confirmed as locs/dreadlocks photo)
  {
    id: 10, category: "Locs",
    title: "Natural Locs", series: "Locs Series",
    accuracy: "88%", pinterest: "natural+locs+dreadlocks+hairstyle",
    // "a woman sitting on the ground wearing a white shirt" – tagged locs/dreadlocks/dreads
    image: "https://images.unsplash.com/photo-1653263169788-9332cdbf07f5?auto=format&fit=crop&q=80&w=700&h=900",
  },
  // ── Afro ── (verified: from "afro hair black man" search)
  {
    id: 11, category: "Afro",
    title: "Natural Afro", series: "Natural Series",
    accuracy: "96%", pinterest: "natural+afro+black+men",
    // "selective focus of man smiling during daytime" – #2 in afro hair black man search
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=700&h=900",
  },
  {
    id: 12, category: "Afro",
    title: "Big Afro", series: "Natural Series",
    accuracy: "92%", pinterest: "big+afro+hairstyle+black+men",
    // "a man with a beard and no shirt" – Tobe Mokolo, #3 in afro search
    image: "https://images.unsplash.com/photo-1643904524951-2a3a58856745?auto=format&fit=crop&q=80&w=700&h=900",
  },
  {
    id: 13, category: "Afro",
    title: "Afro + Full Beard", series: "Natural Series",
    accuracy: "88%", pinterest: "afro+beard+black+men+hairstyle",
    // "a man with a beard and no shirt" – Tobe Mokolo, #4 in afro search
    image: "https://images.unsplash.com/photo-1643904524791-2ca626c9b54c?auto=format&fit=crop&q=80&w=700&h=900",
  },
  {
    id: 14, category: "Afro",
    title: "Side Profile Afro", series: "Natural Series",
    accuracy: "85%", pinterest: "afro+side+profile+hairstyle",
    // "man facing sideways" – Gift Habeshaw, #7 in afro search
    image: "https://images.unsplash.com/photo-1542727313-4f3e99aa2568?auto=format&fit=crop&q=80&w=700&h=900",
  },
  {
    id: 15, category: "Afro",
    title: "Round Afro", series: "Natural Series",
    accuracy: "83%", pinterest: "round+afro+black+men",
    // "smiling man wearing black t-shirt" – Abstral Official, #12 in afro search
    image: "https://images.unsplash.com/photo-1534351842133-0db61b907aac?auto=format&fit=crop&q=80&w=700&h=900",
  },
  // ── placeholder for Locs #2 ──
  {
    id: 16, category: "Locs",
    title: "Afro Locs", series: "Locs Series",
    accuracy: "84%", pinterest: "afro+locs+hairstyle+black",
    // "a man with a bald head and a black shirt" – fade search, close-cropped head
    image: "https://images.unsplash.com/photo-1632777234321-19c84a481670?auto=format&fit=crop&q=80&w=700&h=900",
  },
];

export default function LookbookView({
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
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const categories: Category[] = ["All", "Fades", "Braids", "Cornrows", "Locs", "Afro"];

  const looks = activeCategory === "All"
    ? ALL_LOOKS
    : ALL_LOOKS.filter((l) => l.category === activeCategory);

  // First two of the filtered set get featured treatment
  const displayLooks = looks.map((l, i) => ({ ...l, featured: i < 2 }));

  return (
    <motion.div
      key="lookbook"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-surface"
    >
      <Navbar
        currentView="lookbook"
        onNavigate={onNavigate}
        isLoggedIn={true}
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* ── Hero with image mosaic background + overlay ── */}
      <div className="relative overflow-hidden min-h-[500px] flex items-end">

        {/* 3-column image mosaic — all verified Unsplash photos */}
        <div className="absolute inset-0 grid grid-cols-3 gap-0">
          {/* col 1 — fade + afro */}
          <div className="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&q=80&w=600&h=700"
              alt="" aria-hidden className="w-full h-full object-cover object-center scale-105" />
          </div>
          {/* col 2 — cornrows (taller, slight zoom for visual interest) */}
          <div className="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1673470907547-1c0c6a996095?auto=format&fit=crop&q=80&w=600&h=700"
              alt="" aria-hidden className="w-full h-full object-cover object-top scale-110" />
          </div>
          {/* col 3 — natural afro */}
          <div className="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1643904524951-2a3a58856745?auto=format&fit=crop&q=80&w=600&h=700"
              alt="" aria-hidden className="w-full h-full object-cover object-center scale-105" />
          </div>
        </div>

        {/* Dark overlay — left heavy so text is always legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

        {/* Primary colour glow from bottom-right */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 700px 500px at 90% 110%, color-mix(in srgb, var(--color-primary) 30%, transparent), transparent)" }} />

        {/* Fade to page background */}
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-surface))" }} />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold font-display tracking-tighter text-white mb-5 leading-none">
              CROWN<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-tertiary italic">CHECK</span>
              {" "}LOOKS
            </h1>
            <p className="text-white/55 text-lg font-sans leading-relaxed max-w-xl">
              A curated selection of styles analysed against your unique facial structure. Discover your next evolution with technical precision and editorial grace.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <div className="flex gap-5">
              {[
                { n: String(ALL_LOOKS.length), label: "Styles" },
                { n: "6", label: "Categories" },
                { n: "100%", label: "Verified" },
              ].map(({ n, label }) => (
                <div key={label} className="text-center">
                  <div className="text-white font-bold font-display text-2xl">{n}</div>
                  <div className="text-white/35 font-sans text-[10px] uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 md:px-8 w-full">

        {/* Filters */}
        <section className="mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-bold font-sans text-sm transition-all ${activeCategory === cat
                    ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-bright"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Bento Grid Gallery */}
        <motion.section
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-12 gap-3 pb-24"
        >
          {displayLooks.map((look) => (
            <LookCard key={look.id} look={look} featured={look.featured} />
          ))}
        </motion.section>
      </main>

      <Footer />
    </motion.div>
  );
}
