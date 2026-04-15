import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { View } from "../types";

export default function PricingView({
  onBack,
  onNavigate,
  onLogout,
  theme,
  toggleTheme
}: {
  onBack: () => void;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const tiers = [
    {
      name: "Silver",
      level: "Entry Level",
      price: "0",
      features: ["3 AI Scans per month", "Basic Hairstyle Library", "Static AR Preview"],
      button: "Start Journey",
      featured: false
    },
    {
      name: "Gold",
      level: "The Professional",
      price: "29",
      features: ["Unlimited Prism Scans", "Full Editorial Library", "Motion-Tracked AR", "Color Synthesis Engine"],
      button: "Elevate Status",
      featured: true,
      badge: "Most Coveted"
    },
    {
      name: "Platinum",
      level: "The Inner Circle",
      price: "89",
      features: ["Priority Consultant Access", "Custom AR Filter Creation", "Concierge Styling Support", "Exclusive Salon Perks"],
      button: "Claim Elite",
      featured: false
    }
  ];

  return (
    <motion.div
      key="pricing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-surface min-h-screen"
    >
      <Navbar 
        currentView="pricing"
        onNavigate={onNavigate}
        isLoggedIn={true} // Assuming logged in for this view, or check prop if available
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-24 flex flex-col md:flex-row items-end gap-12">
          <div className="md:w-2/3">
            <h1 className="display-hero text-primary mb-6">
              Investment in <br />
              Your Identity.
            </h1>
            <p className="font-sans text-xl text-on-surface-variant max-w-xl leading-relaxed">
              The CrownCheck Prism experience combines cutting-edge AR synthesis with world-class editorial styling. Choose the tier that defines your vision.
            </p>
          </div>
          <div className="md:w-1/3 hidden md:block">
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden grayscale contrast-125 opacity-40">
              <img 
                className="w-full h-full object-cover" 
                alt="Editorial fashion" 
                src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=600" 
              />
            </div>
          </div>
        </section>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-xl p-10 flex flex-col transition-all duration-500 ${
                tier.featured 
                  ? "bg-gradient-to-br from-primary to-primary-container shadow-2xl scale-105 z-10 hover:scale-[1.07]" 
                  : "bg-surface-container-low hover:translate-y-[-4px]"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-on-primary text-primary font-sans text-[10px] px-4 py-1 rounded-full uppercase tracking-widest font-bold">
                  {tier.badge}
                </div>
              )}
              <div className="mb-12">
                <span className={`font-sans text-xs uppercase tracking-widest mb-4 block ${tier.featured ? 'text-on-primary/60' : 'text-outline'}`}>
                  {tier.level}
                </span>
                <h2 className={`font-display text-4xl font-bold ${tier.featured ? 'text-on-primary' : 'text-on-surface'}`}>
                  {tier.name}
                </h2>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-3xl font-display font-bold ${tier.featured ? 'text-on-primary' : 'text-on-surface'}`}>
                    ${tier.price}
                  </span>
                  <span className={`font-sans text-sm uppercase ${tier.featured ? 'text-on-primary/60' : 'text-outline'}`}>
                    / Monthly
                  </span>
                </div>
              </div>
              <ul className="space-y-6 flex-grow mb-12">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-lg ${tier.featured ? 'text-on-primary' : 'text-secondary'}`}>
                      {tier.name === "Platinum" ? "verified" : tier.featured ? "auto_awesome" : "check_circle"}
                    </span>
                    <span className={tier.featured ? "text-on-primary font-medium" : "text-on-surface-variant"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-sans font-bold transition-all ${
                tier.featured 
                  ? "bg-on-primary text-primary shadow-xl hover:opacity-90" 
                  : "border border-outline-variant text-on-surface hover:bg-surface-container-highest"
              }`}>
                {tier.button}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison Bento */}
        <section className="mt-32">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 glass-panel p-8 rounded-xl">
              <h3 className="font-display text-2xl text-primary mb-4">AR Precision</h3>
              <p className="text-on-surface-variant font-sans leading-relaxed">
                Our proprietary Prism Engine maps hair follicles with sub-millimeter accuracy, ensuring your preview is indistinguishable from reality.
              </p>
            </div>
            <div className="bg-surface-container p-8 rounded-xl">
              <div className="material-symbols-outlined text-4xl text-secondary mb-4">brush</div>
              <h3 className="font-display text-xl text-on-surface mb-2">Color Craft</h3>
              <p className="text-on-surface-variant text-sm font-sans">Hyper-realistic dye simulation with light-refractive accuracy.</p>
            </div>
            <div className="bg-surface-container p-8 rounded-xl">
              <div className="material-symbols-outlined text-4xl text-secondary mb-4">person_search</div>
              <h3 className="font-display text-xl text-on-surface mb-2">Expert Eye</h3>
              <p className="text-on-surface-variant text-sm font-sans">Human stylists review Platinum renders for structural integrity.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
