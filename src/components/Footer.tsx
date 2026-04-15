export default function Footer() {
  return (
    <footer className="bg-surface full-width mt-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center border-t border-outline/10">
        <div className="mb-8 md:mb-0">
          <p className="font-sans text-xs uppercase tracking-[0.1em] text-on-surface/40">
            © 2026 CrownCheck AI. All Rights Reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {["Privacy Policy", "Terms of Service", "Contact Support", "Careers"].map((link) => (
            <a 
              key={link} 
              href="#" 
              className="font-sans text-xs uppercase tracking-[0.1em] text-on-surface/40 hover:text-primary transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
