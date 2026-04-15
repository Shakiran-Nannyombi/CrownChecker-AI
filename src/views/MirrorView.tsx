import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";
import Logo from "../components/Logo";
import { View } from "../types";

export default function MirrorView({ onBack, onNavigate, onLogout, theme, toggleTheme }: { onBack: () => void; onNavigate: (view: View) => void; onLogout: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
  const [activeCategory, setActiveCategory] = useState("ALL STYLES");
  const [selectedStyle, setSelectedStyle] = useState("TEXTURED CROP");

  const categories = ["ALL STYLES", "FADES", "BRAIDS", "LONG"];
  const styles = [
    { name: "MODERN BUZZ", image: "https://images.unsplash.com/photo-1599351431247-f10b21ce5602?auto=format&fit=crop&q=80&w=300" },
    { name: "TEXTURED CROP", image: "https://images.unsplash.com/photo-1621605815841-28d944683b83?auto=format&fit=crop&q=80&w=300" },
    { name: "BOX BRAIDS", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=300" },
    { name: "TAPER POMPADOUR", image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=300" },
    { name: "WAVY FLOW", image: "https://images.unsplash.com/photo-1592647425550-8fe915cfa1f7?auto=format&fit=crop&q=80&w=300" },
    { name: "BALD FADE", image: "https://images.unsplash.com/photo-1516914915600-240abe828880?auto=format&fit=crop&q=80&w=300" },
  ];

  return (
    <motion.div
      key="mirror"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col pt-24 pb-12 px-8 max-w-[1600px] mx-auto"
    >
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-surface/80 backdrop-blur-md border-b border-white/5">
        <div 
          className="font-display font-extrabold text-2xl tracking-tighter flex items-center gap-2 group cursor-pointer"
          onClick={onBack}
        >
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Logo size={20} />
          </div>
          <span className="bg-linear-to-r from-on-surface to-on-surface/70 bg-clip-text text-transparent">CrownCheck <span className="text-primary">AI</span></span>
        </div>
        
        <div className="hidden md:flex gap-10 items-center">
          <button className="text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Mirror</button>
          <button onClick={() => onNavigate("lookbook")} className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">Lookbook</button>
          <button onClick={() => onNavigate("consultants")} className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">Consultants</button>
          <button className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">Pricing</button>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="text-on-surface/60 hover:text-primary transition-colors">
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            onClick={onLogout}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface/60 hover:text-primary transition-colors"
          >
            <User size={20} />
          </button>
        </div>
      </nav>

      <div className="mb-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Augmented Reality Interface</div>
        <h1 className="display-hero text-6xl md:text-7xl">The Mirror</h1>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main AR View */}
        <div className="lg:col-span-9 relative rounded-[2.5rem] overflow-hidden bg-surface-container shadow-2xl border border-white/5">
          {/* Mock Camera Feed */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1600" 
              alt="Camera Feed"
              className="w-full h-full object-cover brightness-75"
              referrerPolicy="no-referrer"
            />
            {/* AR Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="w-80 h-80 border-2 border-primary/40 rounded-full flex items-center justify-center"
              >
                <div className="w-72 h-72 border border-primary/20 rounded-full" />
              </motion.div>
            </div>
          </div>

          {/* Camera Controls */}
          <div className="absolute top-8 left-8 flex items-center gap-4">
            <div className="badge bg-primary/20 text-primary border border-primary/30 flex items-center gap-2 py-2 px-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Live AI Detection
            </div>
          </div>

          <div className="absolute top-8 right-8">
            <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:bg-primary transition-colors">
              <Camera size={20} />
            </button>
          </div>

          {/* Style Categories Overlay */}
          <div className="absolute bottom-8 left-8 flex gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-lg shadow-primary/30" 
                    : "glass-card text-white/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-8">
          {/* Detection Specs */}
          <div className="bg-surface-container-low rounded-[2rem] p-8 border border-white/5">
            <h3 className="text-primary font-bold text-lg mb-6">Detection Specs</h3>
            <div className="space-y-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-2">Face Shape</div>
                <div className="text-xl font-bold">Strong Jawline / Oval</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-2">Hair Texture</div>
                <div className="text-xl font-bold">Type 2C Wavy</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-2">Suggested Fade</div>
                <div className="text-xl font-bold">Mid-Drop Fade</div>
              </div>
            </div>
          </div>

          {/* Style Match Card */}
          <div className="bg-surface-container-low rounded-[2rem] overflow-hidden border border-white/5 group">
            <div className="aspect-square relative">
              <img 
                src="https://images.unsplash.com/photo-1599351431247-f10b21ce5602?auto=format&fit=crop&q=80&w=600" 
                alt="Style Match"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface-container-low via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Top Consultant Choice</div>
                <div className="text-2xl font-bold mb-4">The Executive Cut</div>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">
                  View Full Lookbook <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Style Carousel */}
      <div className="mt-12">
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {styles.map((style) => (
            <button
              key={style.name}
              onClick={() => setSelectedStyle(style.name)}
              className="shrink-0 group"
            >
              <div className={`w-48 aspect-3/4 rounded-2xl overflow-hidden mb-4 border-2 transition-all ${
                selectedStyle === style.name ? "border-primary scale-105 shadow-xl shadow-primary/20" : "border-transparent opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
              }`}>
                <img src={style.image} alt={style.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-widest text-center transition-colors ${
                selectedStyle === style.name ? "text-primary" : "text-on-surface/40"
              }`}>
                {style.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-40">
        <div className="text-[10px] font-bold uppercase tracking-widest">© 2026 CROWNCHECK AI. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service", "Contact Support"].map(link => (
            <button key={link} className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">{link}</button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

