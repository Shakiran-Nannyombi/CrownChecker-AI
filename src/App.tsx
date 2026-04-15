/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Moon, 
  Globe, 
  Target, 
  Eye, 
  Smartphone, 
  BarChart3, 
  LayoutGrid, 
  Users,
  User,
  Mail,
  Lock,
  Scissors,
  ArrowRight
} from "lucide-react";

type View = "landing" | "signup";

export default function App() {
  const [view, setView] = useState<View>("landing");

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <LandingView onStart={() => setView("signup")} />
        ) : (
          <SignupView onBack={() => setView("landing")} />
        )}
      </AnimatePresence>
    </div>
  );
}

function LandingView({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-surface/80 backdrop-blur-md">
        <div className="font-display font-extrabold text-2xl tracking-tighter flex items-center gap-1">
          <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">CrownCheck AI</span>
        </div>
        <div className="hidden md:flex gap-10 items-center">
          {["Mirror", "Lookbook", "Consultants", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <button className="text-on-surface/60 hover:text-on-surface transition-colors">
            <Moon size={20} />
          </button>
          <button className="text-on-surface/60 hover:text-on-surface transition-colors">
            <Globe size={20} />
          </button>
          <button 
            onClick={onStart}
            className="text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-48 pb-32 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="badge mb-8 inline-block">Future of Grooming</div>
            <h1 className="display-hero mb-8">
              Find your <br />
              crown.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md mb-12 leading-relaxed">
              AI-powered precision meets high-fashion artistry. 
              Scan your profile and visualize your next 
              transformation in stunning AR.
            </p>
            <div className="flex flex-wrap gap-6">
              <button onClick={onStart} className="btn-gradient">Try it Now</button>
              <button className="btn-outline">View Lookbook</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/5] relative">
              <img 
                src="https://images.unsplash.com/photo-1620331311520-246422ff82f9?auto=format&fit=crop&q=80&w=1000" 
                alt="AI Hairstyle Visualization"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 right-8 glass-card p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Target size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Scan Status</div>
                  <div className="text-xl font-bold">98.4% Accuracy</div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[120px] rounded-full" />
          </motion.div>
        </section>

        {/* Intersection Section */}
        <section className="py-32 px-8 text-center max-w-4xl mx-auto">
          <h2 className="headline-section mb-20">
            The intersection of <br />
            <span className="text-on-surface/40 italic">Algorithm & Aesthetic</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <Target size={24} />
                <h3 className="text-xl font-bold">Precision Detection</h3>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Our proprietary neural networks analyze facial structure, 
                hair density, and growth patterns to identify exactly what 
                works for you. No more guessing at the barbershop.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <Eye size={24} />
                <h3 className="text-xl font-bold">Hyper-Real AR</h3>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Experience a mirror-like preview that moves with you. Our 
                light-wrapping technology ensures that virtual hairstyles 
                react to your environment's lighting in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Core Capabilities</div>
              <h2 className="headline-section">Everything you need <br />to refine your look.</h2>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
                <ChevronLeft size={20} />
              </button>
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-surface-container-low rounded-3xl p-12 overflow-hidden relative group">
              <div className="max-w-md relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-6">Real-time AR Preview</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Toggle through hundreds of styles in milliseconds. 
                  Our AR lens tracks 128 facial anchor points for a 
                  stable, zero-latency experience.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 w-2/3 aspect-[9/19] bg-surface-container-high rounded-t-[3rem] border-x-8 border-t-8 border-surface-container-highest shadow-2xl overflow-hidden">
                 <img 
                  src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=600" 
                  alt="Phone Mockup"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="md:col-span-4 bg-surface-container-low rounded-3xl p-12 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-6">Accuracy Ranking</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Get a 'Fit Score' for every style based on 
                  your unique head shape and bone structure.
                </p>
              </div>
              <div className="mt-12 p-6 glass-card rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Style Compatibility</span>
                  <span className="text-sm font-bold text-primary">92%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "92%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-primary-dark"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-surface-container-low rounded-3xl p-12">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                <LayoutGrid size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-6">Infinite Variety</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-12">
                Access a global library of styles curated by 
                world-class barbers and digital stylists.
              </p>
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-surface-container-low overflow-hidden">
                    <img src={`https://picsum.photos/seed/hair${i}/100/100`} alt="Style" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-surface-container-low bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-white/40">
                  +500
                </div>
              </div>
            </div>

            <div className="md:col-span-8 bg-surface-container-low rounded-3xl p-12 flex items-center justify-between gap-12 group">
              <div className="max-w-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                  <Users size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-6">Consultant Marketplace</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Connect with professional stylists who can interpret your 
                  AI results and bring your favorite AR look to life in the real 
                  world.
                </p>
              </div>
              <div className="hidden lg:block w-64 aspect-square rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600" 
                  alt="Barber"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-primary/20 to-primary-dark/20 p-24 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="headline-section mb-8">Ready to redefine <br />your reflection?</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto mb-12 text-lg">
                Download CrownCheck AI and discover the hairstyle you 
                were meant to wear.
              </p>
              <button onClick={onStart} className="px-12 py-5 rounded-2xl bg-white text-surface font-bold text-lg hover:bg-primary hover:text-white transition-all active:scale-95 shadow-2xl shadow-primary/20">
                Try the AR Mirror
              </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[100px] -z-10" />
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}

function SignupView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
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
                  <Scissors size={24} />
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
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=800" 
              alt="Stylized Portrait"
              className="w-full h-full object-cover object-top opacity-40 grayscale"
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

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Alexander Sterling"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:border-primary focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="email" 
                    placeholder="alexander@crowncheck.ai"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:border-primary focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
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
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:border-primary focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Confirm</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:border-primary focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="terms"
                className="w-5 h-5 rounded border-white/10 bg-white/5 checked:bg-primary transition-all cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-on-surface-variant cursor-pointer">
                I agree to the <span className="text-on-surface hover:text-primary transition-colors">Terms of Service</span> and <span className="text-on-surface hover:text-primary transition-colors">Privacy Policy</span>.
              </label>
            </div>

            <button className="w-full btn-gradient py-5 flex items-center justify-center gap-3 group">
              Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center">
              <p className="text-sm text-on-surface-variant">
                Already a member? <button onClick={onBack} className="text-on-surface font-bold hover:text-primary transition-colors">Sign In</button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-12 w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 opacity-20">
        <div className="text-[10px] font-bold uppercase tracking-widest">
          © 2024 CROWNCHECK AI. ALL RIGHTS RESERVED.
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

function Footer() {
  return (
    <footer className="py-16 px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">
          © 2024 CROWNCHECK AI. ALL RIGHTS RESERVED.
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
