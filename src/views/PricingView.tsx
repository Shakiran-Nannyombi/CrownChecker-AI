import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";
import { View } from "../types";

export default function PricingView({ onBack, onNavigate, onLogout, theme, toggleTheme }: { onBack: () => void; onNavigate: (view: View) => void; onLogout: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
  const tiers = [
    {
      name: "Silver",
      level: "ENTRY LEVEL",
      price: "0",
      features: ["3 AI Scans per month", "Basic Hairstyle Library", "Static AR Preview"],
      button: "Start Journey",
      featured: false
    },
    {
      name: "Gold",
      level: "THE PROFESSIONAL",
      price: "29",
      features: ["Unlimited Prism Scans", "Full Editorial Library", "Motion-Tracked AR", "Color Synthesis Engine"],
      button: "Elevate Status",
      featured: true,
      badge: "MOST COVETED"
    },
    {
      name: "Platinum",
      level: "THE INNER CIRCLE",
      price: "89",
      features: ["Priority Consultant Access", "Custom AR Filter Creation", "Concierge Styling Support", "Exclusive Salon Perks"],
      button: "Claim Elite",
      featured: false
    }
  ];

  return (
    <motion.div
      key="pricing"
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
          <button onClick={() => onNavigate("lookbook")} className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">Lookbook</button>
          <button onClick={() => onNavigate("consultants")} className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">Consultants</button>
          <button className="text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Pricing</button>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
        <div className="max-w-2xl">
          <h1 className="display-hero text-6xl md:text-8xl leading-[0.9] mb-8">
            Investment in <br />
            <span className="text-primary italic">Your Identity.</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            The CrownCheck Prism experience combines cutting-edge AR synthesis with world-class editorial styling. Choose the tier that defines your vision.
          </p>
        </div>
        <div className="relative rounded-[3rem] overflow-hidden aspect-square lg:aspect-[4/5] group">
          <img 
            src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=1000" 
            alt="Editorial Identity"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-stretch">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`relative rounded-[2.5rem] p-12 flex flex-col border transition-all duration-500 ${
              tier.featured 
                ? "bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border-primary/30 shadow-2xl shadow-primary/10 scale-105 z-10" 
                : "bg-surface-container-low border-white/5 hover:border-white/10"
            }`}
          >
            {tier.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] font-bold uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg">
                {tier.badge}
              </div>
            )}
            <div className="mb-12">
              <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-4">{tier.level}</div>
              <h2 className="text-5xl font-bold mb-4">{tier.name}</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">$</span>
                <span className="text-6xl font-bold">{tier.price}</span>
                <span className="text-xs text-on-surface/40 font-bold uppercase tracking-widest ml-2">/ MONTHLY</span>
              </div>
            </div>
            
            <ul className="space-y-6 mb-12 flex-1">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${tier.featured ? 'bg-primary/20 text-primary' : 'bg-white/5 text-on-surface/40'}`}>
                    {tier.featured ? <Sparkles size={12} /> : <CheckCircle size={12} />}
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
              tier.featured 
                ? "bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20" 
                : "bg-surface-container-high text-on-surface hover:bg-white/10"
            }`}>
              {tier.button}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-surface-container-low p-12 rounded-[2.5rem] border border-white/5">
          <h3 className="text-primary font-bold text-xl mb-6">AR Precision</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Our proprietary Prism Engine maps hair follicles with sub-millimeter accuracy, ensuring your preview is indistinguishable from reality.
          </p>
        </div>
        <div className="bg-surface-container-low p-12 rounded-[2.5rem] border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8">
            <Zap size={24} />
          </div>
          <h3 className="font-bold text-xl mb-6">Color Craft</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Hyper-realistic dye simulation with light-refractive accuracy.
          </p>
        </div>
        <div className="bg-surface-container-low p-12 rounded-[2.5rem] border border-white/5">
          <div className="font-display font-extrabold text-2xl tracking-tighter text-on-surface/20 mb-8">CONSULTA</div>
          <h3 className="font-bold text-xl mb-6">Expert Eye</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Human stylists review Platinum renders for structural integrity.
          </p>
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

