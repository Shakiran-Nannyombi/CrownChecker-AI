import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { View } from "../types";

const TIERS = [
  {
    name: "Silver",
    level: "Free Forever",
    price: "0",
    period: "/ month",
    description: "Everything you need to start exploring your look.",
    features: [
      { icon: "photo_camera",    text: "3 AI Mirror scans per month" },
      { icon: "style",           text: "Basic hairstyle library" },
      { icon: "view_in_ar",      text: "Static AR preview" },
      { icon: "palette",         text: "5 colour shades" },
      { icon: "support_agent",   text: "Community support" },
    ],
    button: "Get Started Free",
    featured: false,
  },
  {
    name: "Gold",
    level: "Most Popular",
    price: "29",
    period: "/ month",
    description: "Unlimited scans, full editorial library, and live AR — the full Crown experience.",
    features: [
      { icon: "all_inclusive",   text: "Unlimited Mirror scans" },
      { icon: "auto_stories",    text: "Full editorial hairstyle library" },
      { icon: "spatial_tracking",text: "Motion-tracked live AR" },
      { icon: "palette",         text: "Unlimited colour synthesis" },
      { icon: "brush",           text: "Makeup & beard overlay filters" },
      { icon: "download",        text: "HD photo exports" },
      { icon: "support_agent",   text: "Priority email support" },
    ],
    button: "Elevate to Gold",
    featured: true,
    badge: "Most Coveted",
  },
  {
    name: "Platinum",
    level: "Elite Access",
    price: "89",
    period: "/ month",
    description: "Concierge-level service with dedicated consultant access and bespoke AR filters.",
    features: [
      { icon: "star",            text: "Everything in Gold" },
      { icon: "groups",          text: "Priority consultant booking" },
      { icon: "tune",            text: "Custom AR filter creation" },
      { icon: "diamond",         text: "Concierge styling support" },
      { icon: "local_offer",     text: "Exclusive salon partner perks" },
      { icon: "card_membership", text: "Early access to new features" },
      { icon: "headset_mic",     text: "Dedicated account manager" },
    ],
    button: "Claim Platinum",
    featured: false,
  },
];

const FEATURES = [
  {
    icon: "view_in_ar",
    title: "AR Precision Engine",
    body: "Our Prism Engine maps hair follicles with sub-millimetre accuracy — your preview is indistinguishable from the real thing.",
    wide: true,
  },
  {
    icon: "brush",
    title: "Colour Craft",
    body: "Hyper-realistic dye simulation with light-refractive accuracy across 100+ shades.",
    wide: false,
  },
  {
    icon: "biotech",
    title: "Growth Simulation",
    body: "Predict how a style grows out over 3–6 months before you commit.",
    wide: false,
  },
  {
    icon: "face_retouching_natural",
    title: "Face Shape AI",
    body: "478-point landmark mapping personalises every recommendation to your exact geometry.",
    wide: false,
  },
  {
    icon: "person_search",
    title: "Expert Human Review",
    body: "Platinum renders are reviewed by master stylists for structural and cultural authenticity.",
    wide: false,
  },
];

export default function PricingView({
  onBack,
  onNavigate,
  onLogout,
  theme,
  toggleTheme,
}: {
  onBack: () => void;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const [annual, setAnnual] = useState(false);

  const displayPrice = (raw: string) => {
    if (raw === "0") return "0";
    const n = parseInt(raw, 10);
    return annual ? String(Math.round(n * 10)) : raw;
  };

  return (
    <motion.div
      key="pricing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-surface min-h-screen flex flex-col"
    >
      <Navbar
        currentView="pricing"
        onNavigate={onNavigate}
        isLoggedIn={true}
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* ── Hero with image background + overlay ── */}
      <div className="relative overflow-hidden min-h-[480px] flex items-end">
        {/* verified: luxury barber chair / barbershop interior */}
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1600&h=700"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

        {/* Primary glow — bottom left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 700px 500px at -5% 110%, color-mix(in srgb, var(--color-primary) 28%, transparent), transparent)",
          }}
        />
        {/* Secondary glow — top right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 500px 400px at 105% -10%, color-mix(in srgb, var(--color-tertiary) 20%, transparent), transparent)",
          }}
        />

        {/* Fade to page */}
        <div
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-surface))" }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold font-display tracking-tighter text-white leading-none mb-5">
              Invest in<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-tertiary) 100%)" }}
              >
                Your Crown.
              </span>
            </h1>
            <p className="text-white/55 text-lg font-sans leading-relaxed max-w-xl">
              CrownCheck AI combines live AR scanning, editorial hairstyle libraries, and master consultant access — choose the tier that matches your vision.
            </p>
          </div>

          {/* Annual toggle */}
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <button
              onClick={() => setAnnual((v) => !v)}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-3 hover:bg-white/15 transition-all"
            >
              <span className="text-white/70 font-sans text-sm">Monthly</span>
              <span
                className={`relative w-10 h-5 rounded-full transition-colors ${annual ? "bg-primary" : "bg-white/20"}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${annual ? "left-5" : "left-0.5"}`}
                />
              </span>
              <span className="text-white/70 font-sans text-sm">Annual</span>
            </button>
            {annual && (
              <span className="text-primary font-bold font-sans text-xs tracking-wider uppercase">
                2 months free included
              </span>
            )}
          </div>
        </div>
      </div>

      <main className="px-4 md:px-8 w-full pb-32">

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch -mt-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-[2rem] flex flex-col transition-all duration-500 overflow-hidden
                ${tier.featured
                  ? "shadow-2xl shadow-primary/20 scale-[1.03] z-10"
                  : "hover:-translate-y-1"
                }`}
            >
              {/* Card background */}
              {tier.featured ? (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(145deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 70%, var(--color-secondary)) 60%, var(--color-secondary) 100%)",
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-surface-container-low" />
              )}

              {/* Most Coveted badge */}
              {tier.featured && (
                <div className="absolute top-0 inset-x-0 flex justify-center">
                  <span className="bg-on-primary text-primary font-bold font-sans text-[10px] uppercase tracking-widest px-5 py-1.5 rounded-b-2xl shadow-lg">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="relative z-10 flex flex-col flex-1 p-8 pt-10">
                {/* Header */}
                <div className="mb-8">
                  <span className={`font-sans text-[10px] uppercase tracking-[0.2em] font-bold block mb-2 ${tier.featured ? "text-on-primary/60" : "text-primary"}`}>
                    {tier.level}
                  </span>
                  <h2 className={`font-display text-4xl font-extrabold mb-1 ${tier.featured ? "text-on-primary" : "text-on-surface"}`}>
                    {tier.name}
                  </h2>
                  <p className={`font-sans text-sm leading-relaxed ${tier.featured ? "text-on-primary/65" : "text-on-surface-variant"}`}>
                    {tier.description}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className={`font-display text-5xl font-extrabold ${tier.featured ? "text-on-primary" : "text-on-surface"}`}>
                      ${displayPrice(tier.price)}
                    </span>
                    <span className={`font-sans text-sm ${tier.featured ? "text-on-primary/55" : "text-outline"}`}>
                      {annual && tier.price !== "0" ? "/ year" : tier.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 grow mb-8">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span
                        className={`material-symbols-outlined text-[18px] shrink-0 ${tier.featured ? "text-on-primary" : "text-secondary"}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {f.icon}
                      </span>
                      <span className={`font-sans text-sm ${tier.featured ? "text-on-primary/90" : "text-on-surface-variant"}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full py-4 rounded-xl font-bold font-display text-sm transition-all active:scale-95
                    ${tier.featured
                      ? "bg-on-primary text-primary hover:opacity-90 shadow-xl"
                      : tier.name === "Platinum"
                        ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-on-surface hover:from-primary/30 hover:to-secondary/30"
                        : "border border-outline-variant text-on-surface hover:bg-surface-container-highest"
                    }`}
                >
                  {tier.button}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature highlight bento */}
        <section className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-on-surface mb-10 tracking-tight">
            What's powering<br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              every plan
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`rounded-[1.5rem] p-7 bg-surface-container border border-outline-variant/10 hover:border-primary/20 transition-all group ${f.wide ? "md:col-span-2" : ""}`}
              >
                <span
                  className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 transition-transform"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {f.icon}
                </span>
                <h3 className="font-display text-lg font-bold text-on-surface mb-2">{f.title}</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="mt-16 max-w-6xl mx-auto relative rounded-[2rem] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1594254773847-9fce26e950bc?auto=format&fit=crop&q=80&w=1400&h=400"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, var(--color-surface-container-highest) 55%, transparent)" }}
          />
          <div className="relative z-10 px-8 md:px-14 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-lg">
              <h3 className="font-display text-3xl font-extrabold text-on-surface leading-tight">
                Not sure which plan fits?
              </h3>
              <p className="font-sans text-on-surface-variant leading-relaxed">
                Book a free 15-minute consultation with one of our master stylists and let them guide you to the right tier.
              </p>
            </div>
            <button
              onClick={() => onNavigate("consultants")}
              className="shrink-0 px-8 py-4 rounded-xl font-bold font-display text-sm bg-primary text-on-primary shadow-lg shadow-primary/25 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
            >
              Talk to a Consultant
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </motion.div>
  );
}
