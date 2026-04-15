/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Moon, 
  Sun,
  Globe, 
  Target, 
  Eye, 
  EyeOff,
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

type View = "landing" | "signup" | "signin" | "mirror" | "lookbook" | "consultants";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectView, setRedirectView] = useState<View | null>(null);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  const handleProtectedNavigation = (targetView: View) => {
    const protectedViews: View[] = ["mirror", "lookbook", "consultants"];
    if (protectedViews.includes(targetView) && !isLoggedIn) {
      setRedirectView(targetView);
      setView("signin");
    } else {
      setView(targetView);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    if (redirectView) {
      setView(redirectView);
      setRedirectView(null);
    } else {
      setView("mirror");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView("landing");
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary/30 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <LandingView 
            onStart={() => setView("signup")} 
            onSignIn={() => setView("signin")} 
            onNavigate={handleProtectedNavigation}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : view === "signup" ? (
          <SignupView 
            onBack={() => setView("landing")} 
            onSignIn={() => setView("signin")} 
            onComplete={handleLogin}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : view === "signin" ? (
          <SigninView 
            onBack={() => setView("landing")} 
            onSignUp={() => setView("signup")} 
            onComplete={handleLogin}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : view === "mirror" ? (
          <MirrorView 
            onBack={() => setView("landing")}
            onNavigate={handleProtectedNavigation}
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : (
          <PlaceholderView 
            title={view.charAt(0).toUpperCase() + view.slice(1)} 
            onBack={() => setView("landing")}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LandingView({ 
  onStart, 
  onSignIn, 
  onNavigate,
  isLoggedIn,
  onLogout,
  theme, 
  toggleTheme 
}: { 
  onStart: () => void; 
  onSignIn: () => void;
  onNavigate: (view: View) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
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
        <div className="font-display font-extrabold text-2xl tracking-tighter flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Scissors size={20} />
          </div>
          <span className="bg-gradient-to-r from-on-surface to-on-surface/70 bg-clip-text text-transparent">CrownCheck <span className="text-primary">AI</span></span>
        </div>
        <div className="hidden md:flex gap-10 items-center">
          <button 
            onClick={() => onNavigate("mirror")}
            className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors"
          >
            Mirror
          </button>
          <button 
            onClick={() => onNavigate("lookbook")}
            className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors"
          >
            Lookbook
          </button>
          <button 
            onClick={() => onNavigate("consultants")}
            className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors"
          >
            Consultants
          </button>
          <a
            href="#"
            className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors"
          >
            Pricing
          </a>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="text-on-surface/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-on-surface/5"
          >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="text-on-surface/60 hover:text-on-surface transition-colors p-2 rounded-full hover:bg-on-surface/5">
            <Globe size={20} />
          </button>
          {isLoggedIn ? (
            <button 
              onClick={onLogout}
              className="text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-all"
            >
              Log Out
            </button>
          ) : (
            <>
              <button 
                onClick={onSignIn}
                className="text-xs font-bold uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onStart}
                className="text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all"
              >
                Sign Up
              </button>
            </>
          )}
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
            <div className="rounded-3xl overflow-hidden aspect-[4/5] relative bg-surface-container shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1000" 
                alt="AI Hairstyle Visualization"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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
                  src="https://images.unsplash.com/photo-1621605815841-28d944683b83?auto=format&fit=crop&q=80&w=600" 
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
                {[
                  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=100",
                  "https://images.unsplash.com/photo-1592647425550-8fe915cfa1f7?auto=format&fit=crop&q=80&w=100",
                  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=100"
                ].map((src, i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-surface-container-low overflow-hidden bg-surface-container">
                    <img src={src} alt="Style" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-surface-container-low bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface/40">
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
              <div className="hidden lg:block w-64 aspect-square rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1516914915600-240abe828880?auto=format&fit=crop&q=80&w=600" 
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

function SignupView({ onBack, onSignIn, onComplete, theme, toggleTheme }: { onBack: () => void; onSignIn: () => void; onComplete: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
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
                    required
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
                      required
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
                      required
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

function SigninView({ onBack, onSignUp, onComplete, theme, toggleTheme }: { onBack: () => void; onSignUp: () => void; onComplete: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:border-primary focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-14 focus:border-primary focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
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
          © 2024 CROWNCHECK AI. ALL RIGHTS RESERVED.
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

function MirrorView({ onBack, onNavigate, onLogout, theme, toggleTheme }: { onBack: () => void; onNavigate: (view: View) => void; onLogout: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Scissors size={20} />
          </div>
          <span className="bg-gradient-to-r from-on-surface to-on-surface/70 bg-clip-text text-transparent">CrownCheck <span className="text-primary">AI</span></span>
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
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
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
              className="flex-shrink-0 group"
            >
              <div className={`w-48 aspect-[3/4] rounded-2xl overflow-hidden mb-4 border-2 transition-all ${
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
        <div className="text-[10px] font-bold uppercase tracking-widest">© 2024 CROWNCHECK AI. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service", "Contact Support"].map(link => (
            <button key={link} className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">{link}</button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PlaceholderView({ title, onBack, theme, toggleTheme }: { title: string; onBack: () => void; theme: "dark" | "light"; toggleTheme: () => void }) {
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
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-2xl shadow-primary/20">
            <Scissors size={32} />
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
