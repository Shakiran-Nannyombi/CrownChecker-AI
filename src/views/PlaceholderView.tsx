import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";
import Logo from "../components/Logo";
import { View } from "../types";

export default function PlaceholderView({ title, onBack, theme, toggleTheme }: { title: string; onBack: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
  return (
    <motion.div
      key="placeholder"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-50">
        <button 
          onClick={toggleTheme}
          className="text-on-surface/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-on-surface/5"
        >
          {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
      
      <div className="text-center max-w-2xl">
        <div className="font-display font-extrabold text-5xl tracking-tighter mb-8 flex items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-2xl shadow-primary/20">
            <Logo size={32} />
          </div>
          <span>{title}</span>
        </div>
        <h2 className="headline-section mb-6">Coming Soon</h2>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-12">
          We're currently refining the {title} experience to meet our standards of ethereal precision. 
          Check back soon for the full reveal.
        </p>
        <button onClick={onBack} className="btn-outline flex items-center gap-3 mx-auto">
          <ChevronLeft size={20} /> Back to Landing
        </button>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full -z-10" />
    </motion.div>
  );
}

