import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";
import Logo from "../components/Logo";
import { View } from "../types";

export default function SignupView({ onBack, onSignIn, onComplete, theme, toggleTheme }: { onBack: () => void; onSignIn: () => void; onComplete: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 blur-[150px] rounded-full -z-10" />

      <div className="w-full max-w-6xl bg-surface-container-low rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5">
        {/* Left Section - Brand & Features */}
        <div className="md:w-[45%] bg-surface-container p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <button 
              onClick={onBack}
              className="font-display font-extrabold text-3xl tracking-tighter mb-4 block"
            >
              CrownCheck <span className="text-primary">AI</span>
            </button>
            <p className="text-on-surface-variant leading-relaxed max-w-[280px]">
              Elevate your aesthetic with AI-driven grooming precision.
            </p>
          </div>

          <div className="relative z-10 mt-12">
            <div className="space-y-10">
              <div className="flex gap-4">
                <div className="text-primary mt-1">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">AR Visualization</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Real-time hairstyle and beard overlays with perfect tracking.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-primary mt-1">
                  <Logo size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Precision Matching</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Our AI analyzes your face shape to recommend the ideal crown.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stylized Portrait Image */}
          <div className="absolute bottom-0 right-0 w-full h-2/3 pointer-events-none">
            <div className="absolute inset-0 bg-linear-to-t from-surface-container via-surface-container/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=800" 
              alt="Stylized Portrait"
              className="w-full h-full object-cover object-top opacity-40"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-[55%] p-12 md:p-16 flex flex-col justify-center">
          <div className="mb-12">
            <h2 className="headline-section text-4xl mb-4">Create Account</h2>
            <p className="text-on-surface-variant">Begin your journey to refined precision.</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="text" 
                    required
                    placeholder="Alexander Sterling"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:border-primary focus:bg-white/8 outline-none transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="email" 
                    required
                    placeholder="alexander@crowncheck.ai"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:border-primary focus:bg-white/8 outline-none transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:border-primary focus:bg-white/8 outline-none transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Confirm</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:border-primary focus:bg-white/8 outline-none transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="terms"
                required
                className="w-5 h-5 rounded border-white/10 bg-white/5 checked:bg-primary transition-all cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-on-surface-variant cursor-pointer">
                I agree to the <span className="text-on-surface hover:text-primary transition-colors">Terms of Service</span> and <span className="text-on-surface hover:text-primary transition-colors">Privacy Policy</span>.
              </label>
            </div>

            <button type="submit" className="w-full btn-gradient py-5 flex items-center justify-center gap-3 group">
              Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center">
              <p className="text-sm text-on-surface-variant">
                Already a member? <button type="button" onClick={onSignIn} className="text-on-surface font-bold hover:text-primary transition-colors">Sign In</button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-12 w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 opacity-20">
        <div className="text-[10px] font-bold uppercase tracking-widest">
          © 2026 CROWNCHECK AI. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service", "Contact Support", "Careers"].map((link) => (
            <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

