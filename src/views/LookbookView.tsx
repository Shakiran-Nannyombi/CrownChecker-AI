import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LookCard from "../components/LookCard";
import { View } from "../types";

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
  const [activeCategory, setActiveCategory] = useState("All Styles");

  const categories = ["All Styles", "Fades", "Long", "Braids"];
  const subCategories = ["Short", "Mid", "Shoulder+"];

  const looks = [
    {
      id: 1,
      title: "The Sharp Taper",
      series: "High-Fade Editorial",
      accuracy: "98%",
      image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=1000",
      featured: true
    },
    {
      id: 2,
      title: "Micro Box Braids",
      series: "Braided Series",
      accuracy: "84%",
      image: "https://images.unsplash.com/photo-1621605815841-28d944683b83?auto=format&fit=crop&q=80&w=600",
      featured: true
    },
    {
      id: 3,
      title: "Nature Flow",
      accuracy: "72%",
      image: "https://images.unsplash.com/photo-1599351431247-f10b21ce5602?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 4,
      title: "The Minimalist",
      accuracy: "91%",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 5,
      title: "Modern Pomp",
      accuracy: "65%",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600"
    }
  ];

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

      <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Editorial Header Section */}
        <header className="mb-16 mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold font-display tracking-tighter text-on-surface mb-6 leading-none">
              CROWN<br/><span className="text-primary italic">CHECK</span> LOOKS
            </h1>
            <p className="text-lg text-on-surface-variant font-sans leading-relaxed opacity-80">
              A curated selection of styles analyzed against your unique facial structure. Discover your next evolution with technical precision and editorial grace.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary font-bold tracking-wider font-sans uppercase text-sm">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>blur_on</span>
              AI PROFILE ACTIVE
            </div>
            <div className="h-[2px] w-32 bg-primary/20 self-start md:self-end"></div>
          </div>
        </header>

        {/* Filters Section */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-bold font-sans text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-bright"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-px h-8 bg-outline-variant/30 hidden md:block"></div>
            <div className="flex flex-wrap gap-2">
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  className="px-5 py-2 rounded-xl bg-surface-container-highest/40 border border-outline-variant/10 text-on-surface-variant hover:text-primary transition-all font-sans text-xs uppercase tracking-widest font-bold"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Gallery */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-20">
          <LookCard look={looks[0]} featured />
          <LookCard look={looks[1]} featured />
          <LookCard look={looks[2]} />
          <LookCard look={looks[3]} />
          <LookCard look={looks[4]} />
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 z-[60] bg-gradient-to-br from-primary to-primary-container text-on-primary p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all hidden md:flex items-center gap-3 font-display">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>view_in_ar</span>
        <span className="font-bold uppercase text-xs tracking-widest">Live Preview</span>
      </button>

      <Footer />
    </motion.div>
  );
}
