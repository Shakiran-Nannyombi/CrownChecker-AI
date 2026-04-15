/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
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
  Users 
} from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary/30">
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
              <button className="btn-gradient">Try it Now</button>
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
              {/* Scan Status Overlay */}
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
            {/* Decorative Glow */}
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
            {/* Real-time AR Preview */}
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

            {/* Accuracy Ranking */}
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

            {/* Infinite Variety */}
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

            {/* Consultant Marketplace */}
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
              <button className="px-12 py-5 rounded-2xl bg-white text-surface font-bold text-lg hover:bg-primary hover:text-white transition-all active:scale-95 shadow-2xl shadow-primary/20">
                Try the AR Mirror
              </button>
            </div>
            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[100px] -z-10" />
          </div>
        </section>
      </main>

      {/* Footer */}
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
    </div>
  );
}
