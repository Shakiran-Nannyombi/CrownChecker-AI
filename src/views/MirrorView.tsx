import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { View } from "../types";

export default function MirrorView({ 
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
  const [selectedStyle, setSelectedStyle] = useState("Textured Crop");

  const categories = ["All Styles", "Fades", "Braids", "Long"];
  const styles = [
    { name: "Modern Buzz", image: "https://images.unsplash.com/photo-1599351431247-f10b21ce5602?auto=format&fit=crop&q=80&w=300" },
    { name: "Textured Crop", image: "https://images.unsplash.com/photo-1621605815841-28d944683b83?auto=format&fit=crop&q=80&w=300" },
    { name: "Box Braids", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=300" },
    { name: "Taper Pompadour", image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=300" },
    { name: "Wavy Flow", image: "https://images.unsplash.com/photo-1592647425550-8fe915cfa1f7?auto=format&fit=crop&q=80&w=300" },
    { name: "Bald Fade", image: "https://images.unsplash.com/photo-1516914915600-240abe828880?auto=format&fit=crop&q=80&w=300" },
  ];

  return (
    <motion.div
      key="mirror"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-surface"
    >
      <Navbar 
        currentView="mirror"
        onNavigate={onNavigate}
        isLoggedIn={true} 
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="relative min-h-screen pt-4 pb-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Mirror Viewport Section */}
            <div className="w-full lg:w-2/3 xl:w-3/4 relative mx-auto">
              <div className="mb-6">
                <span className="badge">Augmented Reality Interface</span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface font-display">The Mirror</h1>
              </div>
              
              <div className="relative w-full mirror-viewport bg-surface-container rounded-xl overflow-hidden group">
                <img 
                  alt="Live AR feedback" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" 
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1600" 
                />
                {/* Scanning Reticle Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    className="w-64 h-64 border-2 border-primary/40 rounded-full flex items-center justify-center"
                  >
                    <div className="w-48 h-48 border border-primary/20 rounded-full"></div>
                  </motion.div>
                </div>
                {/* Top Floating Controls */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                  <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface/80 font-bold">Live AI Detection</span>
                  </div>
                  <button className="glass-panel w-12 h-12 rounded-full flex items-center justify-center text-on-surface hover:bg-primary-container transition-colors duration-300">
                    <span className="material-symbols-outlined">flip_camera_ios</span>
                  </button>
                </div>
                {/* Bottom Floating Controls */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
                  <button className="w-14 h-14 glass-panel rounded-full flex items-center justify-center text-on-surface hover:text-primary transition-all active:scale-90">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </button>
                  <button className="group relative p-1 rounded-full border-4 border-primary/50 hover:border-primary transition-all">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-[0_0_20px_rgba(244,179,219,0.4)] active:scale-90 transition-transform">
                      <span className="material-symbols-outlined text-3xl">photo_camera</span>
                    </div>
                  </button>
                  <button className="w-14 h-14 glass-panel rounded-full flex items-center justify-center text-on-surface hover:text-primary transition-all active:scale-90">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="hidden xl:flex flex-col gap-8 w-1/4 pt-20">
              <div className="bg-surface-container-low p-8 rounded-xl border border-outline/10">
                <h3 className="font-display text-lg font-bold mb-4 text-primary">Detection Specs</h3>
                <ul className="space-y-6">
                  <li className="flex flex-col gap-1">
                    <span className="font-sans text-[10px] uppercase text-outline font-bold tracking-widest">Face Shape</span>
                    <span className="text-on-surface font-medium">Strong Jawline / Oval</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="font-sans text-[10px] uppercase text-outline font-bold tracking-widest">Hair Texture</span>
                    <span className="text-on-surface font-medium">Type 2C Wavy</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="font-sans text-[10px] uppercase text-outline font-bold tracking-widest">Suggested Fade</span>
                    <span className="text-on-surface font-medium">Mid-Drop Fade</span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden group">
                <img 
                  alt="Style match" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  src="https://images.unsplash.com/photo-1599351431247-f10b21ce5602?auto=format&fit=crop&q=80&w=300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-primary font-bold">Top Consultant Choice</span>
                  <p className="text-sm font-bold text-on-surface font-display">The Executive Cut</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Style Carousel */}
        <div className="fixed bottom-0 left-0 right-0 z-40 pb-6 pt-12 bg-gradient-to-t from-surface via-surface/95 to-transparent">
          <div className="container mx-auto px-8">
            <div className="flex items-end justify-between mb-4">
              <div className="flex gap-4">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${
                      activeCategory === cat ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface/60 hover:text-on-surface'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => onNavigate("lookbook")}
                className="text-primary font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                View Full Lookbook <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 scrolling-touch">
              {styles.map((style) => (
                <div 
                  key={style.name} 
                  className="flex-shrink-0 w-32 md:w-44 group cursor-pointer"
                  onClick={() => setSelectedStyle(style.name)}
                >
                  <div className={`aspect-[3/4] rounded-xl overflow-hidden mb-3 border-2 transition-all duration-300 ${
                    selectedStyle === style.name ? 'border-primary shadow-[0_0_15px_rgba(244,179,219,0.3)]' : 'border-transparent opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100'
                  }`}>
                    <img alt={style.name} className="w-full h-full object-cover" src={style.image} />
                  </div>
                  <p className={`font-sans text-[10px] uppercase text-center font-bold tracking-widest transition-colors ${
                    selectedStyle === style.name ? 'text-primary' : 'text-outline hover:text-on-surface'
                  }`}>
                    {style.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
