import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">
          © 2026 CROWNCHECK AI. ALL RIGHTS RESERVED.
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {["Privacy Policy", "Terms of Service", "Contact Support", "Careers"].map((link) => (
            <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
