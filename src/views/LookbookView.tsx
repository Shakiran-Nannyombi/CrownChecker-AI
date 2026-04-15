import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";
import { View } from "../types";
import LookCard from "../components/LookCard";

export default function LookbookView({ onBack, onNavigate, onLogout, theme, toggleTheme }: { onBack: () => void; onNavigate: (view: View) => void; onLogout: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
  const [activeCategory, setActiveCategory] = useState("All Styles");

  const categories = ["All Styles", "Fades", "Long", "Braids"];
  const subCategories = ["SHORT", "MID", "SHOULDER+"];

  const looks = [
    {
      id: 1,
      title: "The Sharp Taper",
      series: "HIGH-FADE EDITORIAL",
      accuracy: "98%",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1000",
      featured: true
    },
    {
      id: 2,
      title: "Micro Box Braids",
      series: "BRAIDED SERIES",
      accuracy: "84%",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=1000",
      featured: true
    },
    {
      id: 3,
      title: "Nature Flow",
      accuracy: "72%",
      image: "https://images.unsplash.com/photo-1592647425550-8fe915cfa1f7?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 4,
      title: "The Minimalist",
      accuracy: "91%",
      image: "https://images.unsplash.com/photo-1599351431247-f10b21ce5602?auto=format&fit=crop&q=80&w=600"
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
      className="min-h-screen flex flex-col pt-24 pb-12 px-8 max-w-[1600px] mx-auto"
    >
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-surface/80 backdrop-blur-md border-b border-white/5">
        <div 
          className="font-display font-extrabold text-2xl tracking-tighter flex items-center gap-2 group cursor-pointer"
          onClick={onBack}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Scissors size={20} />
          </div>
          <span className="bg-gradient-to-r from-on-surface to-on-surface/70 bg-clip-text text-transparent">CrownCheck <span className="text-primary">AI</span></span>
        </div>
        
        <div className="hidden md:flex gap-10 items-center">
          <button onClick={() => onNavigate("mirror")} className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">Mirror</button>
          <button className="text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Lookbook</button>
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="max-w-2xl">
          <h1 className="display-hero text-6xl md:text-8xl leading-[0.9] mb-6">
            CROWN<br />
            <span className="text-primary italic">CHECK</span>LOOKS
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            A curated selection of styles analyzed against your unique facial structure. 
            Discover your next evolution with technical precision and editorial grace.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-surface-container-high/50 px-6 py-4 rounded-2xl border border-white/5">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-primary">AI Profile Active</div>
            <div className="w-24 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
              <div className="w-3/4 h-full bg-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-12">
        <div className="flex bg-surface-container rounded-full p-1 border border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/30" 
                  : "text-on-surface/40 hover:text-on-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="w-px h-8 bg-white/10 mx-2 hidden sm:block" />
        <div className="flex gap-2">
          {subCategories.map((sub) => (
            <button
              key={sub}
              className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-on-surface/40 hover:border-primary hover:text-primary transition-all"
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Featured Row */}
        <div className="md:col-span-8">
          <LookCard look={looks[0]} featured />
        </div>
        <div className="md:col-span-4">
          <LookCard look={looks[1]} featured />
        </div>

        {/* Standard Row */}
        <div className="md:col-span-4">
          <LookCard look={looks[2]} />
        </div>
        <div className="md:col-span-4">
          <LookCard look={looks[3]} />
        </div>
        <div className="md:col-span-4">
          <LookCard look={looks[4]} />
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center opacity-40">
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

