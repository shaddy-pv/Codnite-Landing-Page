import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import codniteLogo from "@/assets/codinte-logo-2-removebg-preview (1).png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2.5 group" data-cursor-hover>
            <img 
              src={codniteLogo} 
              alt="Codnite Logo" 
              className="h-9 w-9 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" 
            />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-[#FF6A00] group-hover:to-orange-400 transition-all duration-300">
              Codnite
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
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
              className="magnetic-btn bg-[#FF6A00] text-white hover:bg-[hsl(24,100%,55%)] hover:shadow-[0_0_30px_-5px_rgba(255,106,0,0.6)] hover:-translate-y-[2px] transition-all duration-300 rounded-full px-7 py-2.5 shadow-none border-none font-semibold !overflow-hidden relative text-sm"
              onClick={() => window.location.href = '/app'}
              data-cursor-hover
            >
              <div className="absolute inset-0 rounded-full border border-white/10 edge-highlight pointer-events-none" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-8 space-y-6 animate-fade-in bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/[0.04] absolute top-full left-0 right-0 px-6 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-400 hover:text-white transition-colors font-medium py-2 text-lg"
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="w-full bg-[#FF6A00] text-white hover:bg-[hsl(24,100%,55%)] transition-colors rounded-full py-6 text-lg font-semibold"
              onClick={() => {
                setIsOpen(false);
                window.location.href = '/app';
              }}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
