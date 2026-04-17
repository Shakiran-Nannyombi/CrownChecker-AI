import { View } from "../types";

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  onSignIn?: () => void;
}

export default function Navbar({
  currentView,
  onNavigate,
  isLoggedIn,
  onLogout,
  theme,
  toggleTheme,
  onSignIn
}: NavbarProps) {
  return (
    <header className="backdrop-blur-xl sticky top-0 z-50 transition-all duration-300" style={{ backgroundColor: 'color-mix(in srgb, var(--color-surface) 80%, transparent)' }}>
      <nav className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 hover:opacity-90 transition-all"
          >
            <img
              src="/logo-nobackground.png"
              alt="CrownCheck AI"
              className="h-11 w-auto"
            />
            <span
              className="text-3xl font-black tracking-tighter font-display bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 40%, var(--color-tertiary) 70%, var(--color-primary) 100%)",
              }}
            >
              CrownCheck<span className="opacity-80"> AI</span>
            </span>
          </button>
          <div className="hidden md:flex gap-6 items-center">
            {[
              { id: "mirror", label: "Mirror" },
              { id: "lookbook", label: "Lookbook" },
              { id: "consultants", label: "Consultants" },
              { id: "pricing", label: "Pricing" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as View)}
                className={`font-display font-bold tracking-tight transition-all duration-300 ${currentView === item.id
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface/60 hover:text-on-surface hover:opacity-80"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="material-symbols-outlined text-primary scale-95 duration-150 active:scale-90"
          >
            {theme === "dark" ? "light_mode" : "dark_mode"}
          </button>
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="material-symbols-outlined text-primary scale-95 duration-150 active:scale-90"
            >
              logout
            </button>
          ) : (
            <button
              onClick={onSignIn}
              className="material-symbols-outlined text-primary scale-95 duration-150 active:scale-90"
            >
              account_circle
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
