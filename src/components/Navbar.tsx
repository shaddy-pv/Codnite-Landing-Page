import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import codniteLogo from "@/assets/horizontal_logo.png";

// Helper for main app URL in dev and prod
const getAppUrl = (path: string = '') => {
  if (typeof window !== 'undefined' && window.location.port === '4173') {
    return `http://localhost:5173/app${path}`;
  }
  return `/app${path}`;
};

const handleAuthNavigation = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const hasSession = Boolean(token && user);

  const isDevPort = typeof window !== 'undefined' && window.location.port === '4173';
  const baseUrl = isDevPort ? 'http://localhost:5173/app' : '/app';

  window.location.href = hasSession ? `${baseUrl}/` : `${baseUrl}/?action=signup`;
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll threshold for backdrop blur via IntersectionObserver (Taste Skill Section 5.D compliant)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '50px';
    sentinel.style.left = '0';
    sentinel.style.width = '1px';
    sentinel.style.height = '1px';
    sentinel.style.pointerEvents = 'none';
    sentinel.style.opacity = '0';
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
    }, { threshold: 0 });

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Features", href: "/#features" },
    { name: "Hall of Fame", href: "/#hall-of-fame" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Team", href: "/#team" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-[env(safe-area-inset-top,0px)] ${
      scrolled 
        ? 'bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]' 
        : 'bg-transparent'
    }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2.5 group -ml-2.5 sm:-ml-4" data-cursor-hover>
            <img 
              src={codniteLogo} 
              alt="Codnite Logo" 
              className="h-10 sm:h-12 md:h-[56px] w-auto object-contain transition-transform duration-300 hover:scale-105" 
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wide link-underline inline-block pb-1"
                data-cursor-hover
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="magnetic-btn bg-[#FF6A00] text-white hover:bg-[hsl(24,100%,55%)] hover:shadow-[0_0_30px_-5px_rgba(255,106,0,0.6)] hover:-translate-y-[2px] transition-all duration-300 rounded-full px-7 py-2.5 shadow-none border-none font-semibold !overflow-hidden relative text-sm cursor-pointer"
              onClick={handleAuthNavigation}
              data-cursor-hover
            >
              <div className="absolute inset-0 rounded-full border border-white/10 edge-highlight pointer-events-none" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button with 44px Accessible Touch Area */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white active:scale-95 transition-all"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Backdrop Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 top-16 bg-black/65 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 z-50 bg-[#0C0C0C]/98 backdrop-blur-2xl border-b border-white/[0.08] px-5 sm:px-6 py-6 shadow-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-gray-300 hover:text-[#FF6A00] hover:bg-white/[0.03] transition-colors font-medium py-3 px-3 rounded-xl text-base border-b border-white/[0.04] last:border-none"
                >
                  <span>{link.name}</span>
                  <span className="text-zinc-600 text-xs">→</span>
                </a>
              ))}
              <div className="pt-3">
                <Button 
                  className="w-full bg-gradient-to-r from-[#FF6A00] to-[#FFA229] text-black hover:from-[#ff7919] hover:to-[#ffb24d] transition-all rounded-xl py-3.5 text-base font-bold shadow-[0_0_20px_rgba(255,106,0,0.4)] cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    handleAuthNavigation();
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
