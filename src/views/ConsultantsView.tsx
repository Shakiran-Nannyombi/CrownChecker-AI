import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";
import Logo from "../components/Logo";
import { View } from "../types";

export default function ConsultantsView({ onBack, onNavigate, onLogout, theme, toggleTheme }: { onBack: () => void; onNavigate: (view: View) => void; onLogout: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
  const [activeFilter, setActiveFilter] = useState("All Masters");

  const filters = ["All Masters", "Precision Fades", "Avant-Garde Color", "Sculptural Form"];

  const consultants = [
    {
      id: 1,
      name: "Elena Kross",
      role: "MASTER STYLIST",
      rating: 4.9,
      consultations: 124,
      tags: ["AVANT-GARDE COLOR", "DIGITAL TEXTURE"],
      image: "https://images.unsplash.com/photo-1599351431247-f10b21ce5602?auto=format&fit=crop&q=80&w=1000",
      featured: true
    },
    {
      id: 2,
      name: "Marcus Thorne",
      role: "PRECISION FADES & SCULPTING",
      rating: 4.8,
      available: true,
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600",
      description: "Specializing in translating complex AI geometries into wearable street-ready masterpieces."
    }
  ];

  return (
    <motion.div
      key="consultants"
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
          <button onClick={() => onNavigate("mirror")} className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">Mirror</button>
          <button onClick={() => onNavigate("lookbook")} className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">Lookbook</button>
          <button className="text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Consultants</button>
          <button className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">Pricing</button>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={16} />
            <input 
              type="text" 
              placeholder="Search specialists..."
              className="bg-surface-container-high/50 border border-white/5 rounded-full py-2 pl-12 pr-6 text-xs outline-none focus:border-primary/50 transition-all w-64"
            />
          </div>
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

      <div className="mb-12">
        <div className="badge bg-primary/10 text-primary border border-primary/20 mb-6 flex items-center gap-2 py-2 px-4 w-fit">
          <CheckCircle size={14} />
          CERTIFIED AI VISIONARIES
        </div>
        <h1 className="display-hero text-6xl md:text-8xl leading-[0.9] mb-8">
          The Marketplace of <br />
          <span className="text-primary italic">Future Forms</span>
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          Connect with elite stylists who bridge the gap between AI-simulated aesthetics 
          and master craftsmanship. From precision fades to digital-first color transformations.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-12">
        <div className="flex bg-surface-container rounded-full p-1 border border-white/5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeFilter === filter 
                  ? "bg-primary text-white shadow-lg shadow-primary/30" 
                  : "text-on-surface/40 hover:text-on-surface"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-on-surface/40 hover:border-primary hover:text-primary transition-all">
          <Filter size={14} /> Refine Vision
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Featured Consultant */}
        <div className="lg:col-span-8 relative rounded-[2.5rem] overflow-hidden bg-surface-container border border-white/5 group aspect-video">
          <img 
            src={consultants[0].image} 
            alt={consultants[0].name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Award size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{consultants[0].role}</span>
            </div>
            <h2 className="text-6xl font-bold text-white mb-4">{consultants[0].name}</h2>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-white">
                <Star className="text-primary fill-primary" size={16} />
                <span className="font-bold">{consultants[0].rating}</span>
                <span className="text-white/40 text-xs">{consultants[0].consultations} Consultations</span>
              </div>
              <div className="flex gap-2">
                {consultants[0].tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-[8px] font-bold text-white/60 tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="btn-gradient px-8 py-4">Book AR Consultation</button>
              <button className="glass-card px-8 py-4 text-white hover:bg-white/10 transition-colors">View Lookbook</button>
            </div>
          </div>
        </div>

        {/* Sidebar Consultant */}
        <div className="lg:col-span-4 bg-surface-container-low rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col">
          <div className="relative h-64">
            <img 
              src={consultants[1].image} 
              alt={consultants[1].name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 badge bg-primary/20 text-primary border border-primary/30 py-1 px-3 text-[8px]">
              AVAILABLE NOW
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-1">{consultants[1].name}</h3>
              <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-4">{consultants[1].role}</div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                {consultants[1].description}
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface/40">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="text-primary fill-primary" size={14} />
                  <span className="font-bold">4.8</span>
                </div>
              </div>
              <button className="w-full py-4 rounded-xl bg-surface-container-high text-on-surface font-bold hover:bg-primary hover:text-white transition-all">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Row */}
      <div className="bg-surface-container-low rounded-[2.5rem] p-12 border border-white/5 flex flex-col md:flex-row items-center gap-12 mb-16">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=300" 
            alt="Sasha Vane"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-[8px] font-bold text-primary tracking-widest">CHROME FINISHING</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-[8px] font-bold text-primary tracking-widest">FLUID DYNAMICS</span>
          </div>
          <h3 className="text-3xl font-bold mb-2">Sasha Vane</h3>
          <p className="text-on-surface-variant leading-relaxed max-w-xl">
            Master of fluid silhouette and iridescent finishing. Sasha uses proprietary 
            CrownCheck algorithms to predict hair growth patterns for 6-month styles.
          </p>
        </div>
        <div className="text-center md:text-right space-y-4">
          <div className="flex items-center justify-center md:justify-end gap-3 text-2xl font-bold">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <CreditCard size={20} />
            </div>
            $120 <span className="text-sm font-normal text-on-surface/40">/ Session</span>
          </div>
          <button className="btn-gradient px-8 py-4">Book AR Consultation</button>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-surface-container rounded-[3rem] overflow-hidden border border-white/5 grid grid-cols-1 lg:grid-cols-2">
        <div className="p-16 flex flex-col justify-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">THE TECH STACK</div>
          <h2 className="text-5xl font-bold mb-8 leading-tight">Live AR <br />Blueprint Mapping</h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-12">
            Our consultants don't just guess. Using CrownCheck's spatial engine, they project a 1:1 holographic model of your future look onto your current profile, ensuring zero translation errors between vision and reality.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Box size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Spatial Sync</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Zap size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Growth Sim</span>
            </div>
          </div>
        </div>
        <div className="relative min-h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1621605815841-28d944683b83?auto=format&fit=crop&q=80&w=1000" 
            alt="AR Blueprint"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-linear-to-r from-surface-container to-transparent" />
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

