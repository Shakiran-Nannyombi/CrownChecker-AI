/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { View } from "./types";
import LandingView from "./views/LandingView";
import SignupView from "./views/SignupView";
import SigninView from "./views/SigninView";
import MirrorView from "./views/MirrorView";
import LookbookView from "./views/LookbookView";
import PricingView from "./views/PricingView";
import ConsultantsView from "./views/ConsultantsView";
import PlaceholderView from "./views/PlaceholderView";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectView, setRedirectView] = useState<View | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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
        ) : view === "lookbook" ? (
          <LookbookView
            onBack={() => setView("landing")}
            onNavigate={handleProtectedNavigation}
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : view === "consultants" ? (
          <ConsultantsView
            onBack={() => setView("landing")}
            onNavigate={handleProtectedNavigation}
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : view === "pricing" ? (
          <PricingView
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
