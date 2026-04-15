import { motion } from "motion/react";
import { View } from "../types";

export default function SignupView({ 
  onBack, 
  onSignIn, 
  onComplete, 
  theme, 
  toggleTheme 
}: { 
  onBack: () => void; 
  onSignIn: () => void; 
  onComplete: () => void; 
  theme: "dark" | "light"; 
  toggleTheme: () => void 
}) {
  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-surface relative overflow-x-hidden selection:bg-primary/30"
    >
      {/* Hero Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      <main className="flex-grow flex items-center justify-center p-6 z-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] bg-surface-container-low shadow-2xl border border-outline/10">
          {/* Left Side: Editorial Content */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-surface-container relative overflow-hidden">
            <div className="z-10">
              <button 
                onClick={onBack}
                className="text-4xl font-display font-black tracking-tighter text-primary mb-2 hover:opacity-80 transition-opacity"
              >
                CrownCheck AI
              </button>
              <p className="text-on-surface-variant font-sans text-lg max-w-xs leading-relaxed">
                Elevate your aesthetic with AI-driven grooming precision.
              </p>
            </div>
            
            <div className="z-10 mt-12 space-y-8">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <div>
                  <h3 className="font-display font-bold text-on-surface">AR Visualization</h3>
                  <p className="text-sm text-on-surface-variant font-sans">Real-time hairstyle and beard overlays with perfect tracking.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
                <div>
                  <h3 className="font-display font-bold text-on-surface">Precision Matching</h3>
                  <p className="text-sm text-on-surface-variant font-sans">Our AI analyzes your face shape to recommend the ideal crown.</p>
                </div>
              </div>
            </div>

            {/* Background Graphic */}
            <div className="absolute right-[-20%] bottom-[-10%] w-full h-2/3 opacity-40">
              <img 
                alt="Barber shop silhouette" 
                className="w-full h-full object-cover grayscale rounded-tl-[100px]" 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600" 
              />
            </div>
          </div>

          {/* Right Side: Sign Up Form */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface-container-lowest">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-display font-bold tracking-tight text-on-surface mb-2">Create Account</h2>
              <p className="text-on-surface-variant font-sans text-sm">Begin your journey to refined precision.</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
              <div className="space-y-2">
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-on-surface-variant px-1">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-xl">person</span>
                  <input 
                    className="w-full bg-surface-container-low border-b-2 border-secondary-container text-on-surface py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all duration-300 rounded-t-xl placeholder:text-outline/50 font-sans" 
                    placeholder="Alexander Sterling" 
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-on-surface-variant px-1">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-xl">mail</span>
                  <input 
                    className="w-full bg-surface-container-low border-b-2 border-secondary-container text-on-surface py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all duration-300 rounded-t-xl placeholder:text-outline/50 font-sans" 
                    placeholder="alexander@crowncheck.ai" 
                    type="email"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-on-surface-variant px-1">Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-xl">lock</span>
                    <input 
                      className="w-full bg-surface-container-low border-b-2 border-secondary-container text-on-surface py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all duration-300 rounded-t-xl placeholder:text-outline/50 font-sans" 
                      placeholder="••••••••" 
                      type="password"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-on-surface-variant px-1">Confirm</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-xl">shield_lock</span>
                    <input 
                      className="w-full bg-surface-container-low border-b-2 border-secondary-container text-on-surface py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all duration-300 rounded-t-xl placeholder:text-outline/50 font-sans" 
                      placeholder="••••••••" 
                      type="password"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input 
                  className="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary/20 cursor-pointer" 
                  id="terms" 
                  type="checkbox"
                  required
                />
                <label className="text-sm text-on-surface-variant font-sans cursor-pointer" htmlFor="terms">
                  I agree to the <span className="text-primary hover:underline transition-all">Terms of Service</span> and Privacy Policy.
                </label>
              </div>

              <button 
                className="w-full bg-primary-container text-on-primary-container font-display font-bold py-5 rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-300 mt-4 flex items-center justify-center gap-2" 
                type="submit"
              >
                Create Account
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>

            <div className="mt-8 text-center font-sans">
              <p className="text-on-surface-variant text-sm">
                Already a member? <button onClick={onSignIn} className="text-secondary font-bold hover:text-primary transition-colors duration-200">Sign In</button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest border-t border-outline/10 z-10">
        <div className="mb-4 md:mb-0">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-outline">© 2026 CrownCheck AI. All Rights Reserved.</p>
        </div>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service", "Contact Support", "Careers"].map(link => (
            <button key={link} className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-outline hover:text-primary transition-colors duration-200">{link}</button>
          ))}
        </div>
      </footer>
    </motion.div>
  );
}
