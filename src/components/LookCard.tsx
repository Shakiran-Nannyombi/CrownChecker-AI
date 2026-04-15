import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";

export default function LookCard({ look, featured = false }: { look: any; featured?: boolean }) {
  return (
    <div className={`group relative rounded-[2rem] overflow-hidden bg-surface-container border border-white/5 ${featured ? 'aspect-16/10' : 'aspect-square'}`}>
      <img 
        src={look.image} 
        alt={look.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute top-6 right-6">
        <div className="glass-card px-4 py-2 rounded-xl border border-white/10 flex flex-col items-center">
          <div className="text-[8px] font-bold uppercase tracking-widest text-white/60">Match Accuracy</div>
          <div className="text-xl font-bold text-white">{look.accuracy}</div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 right-8">
        {look.series && (
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">{look.series}</div>
        )}
        <h3 className={`${featured ? 'text-4xl' : 'text-2xl'} font-bold text-white mb-6`}>{look.title}</h3>
        
        {featured ? (
          <div className="flex gap-3">
            <button className="bg-primary text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary-dark transition-colors">
              Try In AR
            </button>
            <button className="glass-card w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              <Heart size={16} />
            </button>
          </div>
        ) : (
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            View Details <ArrowRight size={14} />
          </button>
        )}
      </div>

      {featured && look.id === 2 && (
        <div className="absolute bottom-8 right-8">
          <button className="glass-card px-6 py-3 rounded-full flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
            <Box size={18} /> Live Preview
          </button>
        </div>
      )}
    </div>
  );
}

