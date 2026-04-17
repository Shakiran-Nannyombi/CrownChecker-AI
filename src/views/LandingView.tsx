import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroCollage from "../components/HeroCollage";
import { View } from "../types";

export default function LandingView({
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
      className="bg-surface"
    >
      <Navbar
        currentView="landing"
        onNavigate={onNavigate}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        onSignIn={onSignIn}
      />

      <main>
        {/* Hero Section */}
        <HeroCollage
          title={<>Find your <span className="text-transparent bg-clip-text bg-linear-to-br from-primary to-secondary">crown.</span></>}
          subtitle="AI-powered precision meets high-fashion artistry. Scan your profile and visualize your next transformation in stunning AR."
          onCTA={onStart}
          onSecondary={() => onNavigate("lookbook")}
          stats={[
            { value: '98.4%', label: 'Scan Accuracy' },
            { value: '500+', label: 'Curated Styles' },
            { value: '1,200+', label: 'Expert Consultants' },
          ]}
          images={[
            // [0] Main portrait — verified: Black man with beard, clean portrait (consultant #1)
            "https://images.unsplash.com/photo-1657273363317-c2cb4d2d1e16?auto=format&fit=crop&q=80&w=800&h=1000",
            // [1] Review avatar — verified: man brushing afro in barbershop (Kingsley Hemans)
            "https://images.unsplash.com/photo-1674267521468-88f139e6c52b?auto=format&fit=crop&q=80&w=100",
            // [2] Style card thumb — verified: taper fade + beard (lookbook Fades)
            "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=120",
            // [3] Extra — verified: natural afro smiling (lookbook Afro)
            "https://images.unsplash.com/photo-1534351842133-0db61b907aac?auto=format&fit=crop&q=80&w=120",
          ]}
        />

        {/* About Section */}
        <section className="py-32 bg-surface-container-low">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <h2 className="headline-section">
                The intersection of <br /><span className="text-outline">Algorithm & Aesthetic</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Precision Detection
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Our proprietary neural networks analyze facial structure, hair density, and growth patterns to identify exactly what works for you. No more guessing at the barbershop.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined">view_in_ar</span>
                    Hyper-Real AR
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Experience a mirror-like preview that moves with you. Our light-wrapping technology ensures that virtual hairstyles react to your environment's lighting in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-32 bg-surface">
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="headline-section">Everything you need <br />to refine your look.</h2>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors text-primary">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Feature 1 */}
              <div className="md:col-span-8 bg-surface-container rounded-[2rem] p-10 flex flex-col justify-between min-h-[450px] relative overflow-hidden group">
                <div className="relative z-10 max-w-md">
                  <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary">camera_front</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Real-time AR Preview</h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed">
                    Toggle through hundreds of styles in milliseconds. Our AR lens tracks 128 facial anchor points for a stable, zero-latency experience.
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  {/* verified: Black barber cutting client's fade — barbershop in Virginia */}
                  <img
                    className="w-full h-full object-cover rounded-tl-[4rem]"
                    alt="Barber precision fade"
                    src="https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&q=80&w=700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              {/* Feature 2 */}
              <div className="md:col-span-4 bg-primary-container/20 rounded-[2rem] p-10 border border-primary/10 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Accuracy Ranking</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  Get a 'Fit Score' for every style based on your unique head shape and bone structure.
                </p>
                <div className="mt-auto bg-surface-container-lowest p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-sans uppercase">Style Compatibility</span>
                    <span className="text-primary font-bold">92%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="md:col-span-4 bg-surface-container-high rounded-[2rem] p-10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-secondary">grid_view</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">Infinite Variety</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Access a global library of styles curated by world-class barbers and digital stylists.
                  </p>
                </div>
                <div className="flex -space-x-3 pt-8">
                  {[
                    // verified: afro + beard (lookbook Afro #3)
                    "https://images.unsplash.com/photo-1643904524791-2ca626c9b54c?auto=format&fit=crop&q=80&w=100",
                    // verified: cornrow feed-ins (lookbook Cornrows)
                    "https://images.unsplash.com/photo-1673470907547-1c0c6a996095?auto=format&fit=crop&q=80&w=100",
                    // verified: natural locs (lookbook Locs)
                    "https://images.unsplash.com/photo-1653263169788-9332cdbf07f5?auto=format&fit=crop&q=80&w=100",
                  ].map((src, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-surface-container-high overflow-hidden">
                      <img src={src} className="w-full h-full object-cover" alt="style" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest border-2 border-surface-container-high flex items-center justify-center">
                    <span className="text-xs font-bold">+500</span>
                  </div>
                </div>
              </div>
              {/* Feature 4 */}
              <div className="md:col-span-8 bg-surface-container-low rounded-[2rem] p-10 flex items-center gap-12 group">
                <div className="flex-1">
                  <h3 className="text-3xl font-display font-bold mb-4">Consultant Marketplace</h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed">
                    Connect with professional stylists who can interpret your AI results and bring your favorite AR look to life in the real world.
                  </p>
                </div>
                <div className="w-48 h-48 rounded-2xl overflow-hidden shrink-0 hidden md:block">
                  {/* verified: Black man with beard — consultant profile (Consultants page) */}
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    alt="Professional stylist consultant"
                    src="https://images.unsplash.com/photo-1657273363317-c2cb4d2d1e16?auto=format&fit=crop&q=80&w=400"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Bottom gradient + CTA */}
      <div
        className="relative"
        style={{
          background:
            "radial-gradient(ellipse 120% 60% at 50% 100%, color-mix(in srgb, var(--color-primary-container) 60%, var(--color-surface)), var(--color-surface))",
        }}
      >
        <section className="py-32 relative">
          <div className="container mx-auto px-8">
            <div className="rounded-[3rem] p-12 md:p-24 text-center space-y-8 relative overflow-hidden shadow-2xl border border-primary/15"
              style={{ background: "color-mix(in srgb, var(--color-primary-container) 20%, var(--color-surface-container))" }}>

              {/* Subtle inner glow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[3rem]"
                style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--color-primary) 12%, transparent), transparent)" }}
              />

              <h2 className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter relative z-10 text-on-surface">
                Ready to redefine <br />your reflection?
              </h2>
              <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-sans relative z-10">
                Download CrownCheck AI and discover the hairstyle you were meant to wear.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 relative z-10">
                <button onClick={onStart} className="px-12 py-6 bg-primary text-on-primary font-display font-bold rounded-2xl text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                  Try the AR Mirror
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </motion.div>
  );
}
