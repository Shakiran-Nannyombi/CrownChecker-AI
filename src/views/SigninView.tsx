import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";
import { View } from "../types";

export default function SigninView({ onBack, onSignUp, onComplete, theme, toggleTheme }: { onBack: () => void; onSignUp: () => void; onComplete: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      key="signin"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="text-center mb-12">
        <button 
          onClick={onBack}
          className="font-display font-extrabold text-5xl tracking-tighter mb-2 block"
        >
          CrownCheck <span className="text-primary">AI</span>
        </button>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">The Ethereal Precision</p>
      </div>

      <div className="w-full max-lg bg-surface-container-low rounded-[2.5rem] p-12 md:p-16 shadow-2xl border border-white/5 relative">
        <div className="mb-12">
          <h2 className="headline-section text-4xl mb-4">Welcome Back</h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Sign in to access your digital lookbook and AR styling tools.
          </p>
        </div>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:border-primary focus:bg-white/8 outline-none transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Password</label>
                <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary-container transition-colors">Forgot Password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-14 focus:border-primary focus:bg-white/8 outline-none transition-all placeholder:text-white/10"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="stay-logged"
              className="w-5 h-5 rounded border-white/10 bg-white/5 checked:bg-primary transition-all cursor-pointer"
            />
            <label htmlFor="stay-logged" className="text-sm text-on-surface-variant cursor-pointer">
              Stay logged in for 30 days
            </label>
          </div>

          <button type="submit" className="w-full btn-gradient py-5 opacity-80 hover:opacity-100 transition-opacity">
            SIGN IN
          </button>

          <div className="pt-4 border-t border-white/5 text-center">
            <p className="text-sm text-on-surface-variant">
              Don't have an account? <button type="button" onClick={onSignUp} className="text-on-surface font-bold hover:text-primary transition-colors">Sign up</button>
            </p>
          </div>
        </form>
      </div>

      {/* Bottom Visuals */}
      <div className="mt-12 flex gap-6 opacity-40">
        <div className="w-40 aspect-square rounded-2xl overflow-hidden border border-white/10">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" alt="Style 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="w-40 aspect-square rounded-2xl overflow-hidden border border-white/10">
          <img src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=300" alt="Style 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="mt-16 w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 opacity-20">
        <div className="text-[10px] font-bold uppercase tracking-widest">
          © 2026 CROWNCHECK AI. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service", "Contact Support"].map((link) => (
            <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

