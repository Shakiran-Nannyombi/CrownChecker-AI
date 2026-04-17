import { motion } from "motion/react";

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
  toggleTheme: () => void;
}) {
  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary/30"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <main className="grow flex items-center justify-center p-6 z-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] bg-surface-container-low shadow-2xl border border-outline/10">

          {/* Left: Editorial panel */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-surface-container relative overflow-hidden">
            <div className="z-10">
              <button onClick={onBack} className="text-4xl font-display font-black tracking-tighter text-primary mb-2 hover:opacity-80 transition-opacity">
                CrownCheck AI
              </button>
              <p className="text-on-surface-variant font-sans text-lg max-w-xs leading-relaxed">
                Elevate your aesthetic with AI-driven grooming precision.
              </p>
            </div>

            <div className="z-10 space-y-8">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <div>
                  <h3 className="font-display font-bold text-on-surface">AR Visualization</h3>
                  <p className="text-sm text-on-surface-variant font-sans">Real-time hairstyle overlays with perfect facial tracking.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
                <div>
                  <h3 className="font-display font-bold text-on-surface">Precision Matching</h3>
                  <p className="text-sm text-on-surface-variant font-sans">AI analyzes your face shape to recommend your ideal crown.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                <div>
                  <h3 className="font-display font-bold text-on-surface">Expert Consultants</h3>
                  <p className="text-sm text-on-surface-variant font-sans">Connect with elite stylists who bring your AR look to life.</p>
                </div>
              </div>
            </div>

            {/* Background image */}
            <div className="absolute right-0 bottom-0 w-full h-1/2 opacity-30 pointer-events-none">
              <img
                alt="Salon style"
                className="w-full h-full object-cover grayscale rounded-tl-[80px]"
                src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=600"
              />
            </div>

            {/* Floating preview cards */}
            <div className="absolute top-8 right-8 flex flex-col gap-3 z-20">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border border-primary/20">
                <img src="https://images.unsplash.com/photo-1570158268183-d296b2892211?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="style preview" />
              </div>
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border border-primary/20">
                <img src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="style preview" />
              </div>
            </div>
          </div>

          {/* Right: Sign Up form */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface-container-lowest">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-display font-bold tracking-tight text-on-surface mb-2">Create Account</h2>
              <p className="text-on-surface-variant font-sans text-sm">Begin your journey to refined precision.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-on-surface-variant px-1">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-xl">person</span>
                  <input
                    className="w-full bg-surface-container-low border-b-2 border-secondary-container text-on-surface py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all duration-300 rounded-t-xl placeholder:text-outline/50 font-sans"
                    placeholder="Your full name"
                    type="text"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-on-surface-variant px-1">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-xl">mail</span>
                  <input
                    className="w-full bg-surface-container-low border-b-2 border-secondary-container text-on-surface py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all duration-300 rounded-t-xl placeholder:text-outline/50 font-sans"
                    placeholder="you@crowncheck.ai"
                    type="email"
                    required
                  />
                </div>
              </div>

              {/* Password grid */}
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

              {/* Terms */}
              <div className="flex items-center gap-3 pt-2">
                <input className="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary/20 cursor-pointer" id="terms" type="checkbox" required />
                <label className="text-sm text-on-surface-variant font-sans cursor-pointer" htmlFor="terms">
                  I agree to the <span className="text-primary hover:underline transition-all cursor-pointer">Terms of Service</span> and Privacy Policy.
                </label>
              </div>

              <button
                className="w-full bg-primary-container text-on-primary-container font-display font-bold py-5 rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
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

      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center border-t border-outline/10 z-10 bg-surface-container-lowest">
        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">© 2026 CrownCheck AI. All Rights Reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          {["Privacy Policy", "Terms of Service", "Contact Support", "Careers"].map(link => (
            <button key={link} className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors duration-200">{link}</button>
          ))}
        </div>
      </footer>
    </motion.div>
  );
}
