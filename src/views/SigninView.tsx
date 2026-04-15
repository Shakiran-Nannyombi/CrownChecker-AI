import { useState } from "react";
import { motion } from "motion/react";
import { View } from "../types";

export default function SigninView({ 
  onBack, 
  onSignUp, 
  onComplete, 
  theme, 
  toggleTheme 
}: { 
  onBack: () => void; 
  onSignUp: () => void; 
  onComplete: () => void; 
  theme: "dark" | "light"; 
  toggleTheme: () => void 
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      key="signin"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-surface relative overflow-x-hidden selection:bg-primary/30 font-sans"
    >
      {/* Hero Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]"></div>
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
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
                <div>
                  <h3 className="font-display font-bold text-on-surface">Secure Access</h3>
                  <p className="text-sm text-on-surface-variant font-sans">Enter your credentials to access your personalized grooming profile.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                <div>
                  <h3 className="font-display font-bold text-on-surface">Style History</h3>
                  <p className="text-sm text-on-surface-variant font-sans">Review past transformations and consultant recommendations.</p>
                </div>
              </div>
            </div>

            {/* Background Graphic */}
            <div className="absolute right-[-20%] bottom-[-10%] w-full h-2/3 opacity-40">
              <img 
                alt="Barber shop silhouette" 
                className="w-full h-full object-cover grayscale rounded-tl-[100px]" 
                src="https://images.unsplash.com/photo-1599351431247-f10b21ce5602?auto=format&fit=crop&q=80&w=600" 
              />
            </div>
          </div>

          {/* Right Side: Sign In Form */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface-container-lowest">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-display font-bold tracking-tight text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant font-sans text-sm">Sign in to access your digital lookbook and AR tools.</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
              <div className="space-y-2">
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-on-surface-variant px-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <input 
                    className="w-full bg-surface-container-low border-b-2 border-secondary-container text-on-surface py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all duration-300 rounded-t-xl placeholder:text-outline/50 font-sans" 
                    placeholder="name@example.com" 
                    type="email" 
                    required 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 px-1">
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-on-surface-variant">Password</label>
                  <button type="button" className="text-[10px] uppercase font-bold tracking-tighter text-primary hover:text-primary-container transition-colors font-sans">Forgot password?</button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input 
                    className="w-full bg-surface-container-low border-b-2 border-secondary-container text-on-surface py-4 pl-12 pr-12 rounded-t-xl placeholder:text-outline/50 focus:outline-none focus:border-primary transition-all duration-300 font-sans" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"} 
                    required 
                  />
                  <button 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3 py-2">
                <input 
                  className="w-4 h-4 rounded-sm bg-surface-container-low border-outline-variant text-primary focus:ring-primary cursor-pointer" 
                  id="remember" 
                  type="checkbox" 
                />
                <label className="text-sm text-on-surface-variant cursor-pointer font-sans" htmlFor="remember">Stay logged in for 30 days</label>
              </div>

              <button 
                className="w-full bg-primary-container text-on-primary-container font-display font-bold py-5 rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-300 mt-4 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]" 
                type="submit"
              >
                Sign In
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-outline-variant/30 text-center font-sans">
              <p className="text-sm text-on-surface-variant">
                Don't have an account? 
                <button onClick={onSignUp} className="text-primary font-bold hover:underline underline-offset-4 ml-1">Sign up</button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest border-t border-outline/10 z-10 font-sans">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-outline">© 2026 CrownCheck AI. All Rights Reserved.</p>
        <div className="flex gap-8 mt-6 md:mt-0 font-sans">
          {["Privacy Policy", "Terms of Service", "Contact Support"].map(link => (
            <button key={link} className="text-[10px] font-bold uppercase tracking-[0.1em] text-outline hover:text-primary transition-colors duration-200">{link}</button>
          ))}
        </div>
      </footer>
    </motion.div>
  );
}
