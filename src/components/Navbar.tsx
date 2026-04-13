import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import codniteLogo from "@/assets/codinte-logo-2-removebg-preview (1).png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <img 
              src={codniteLogo} 
              alt="Codnite Logo" 
              className="h-8 w-8 transition-transform group-hover:rotate-12" 
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
                className="text-gray-400 hover:text-white transition-colors font-medium text-sm tracking-wide link-underline inline-block pb-1"
                data-cursor-hover
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="magnetic-btn bg-[#FF6A00] text-white hover:bg-[hsl(24,100%,55%)] hover:shadow-[0_0_30px_-5px_rgba(255,106,0,0.6)] hover:-translate-y-[2px] transition-all duration-300 rounded-full px-6 shadow-none border-none font-medium !overflow-hidden relative"
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
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 space-y-6 animate-fade-in bg-[#0A0A0A] border-t border-white/5 absolute top-full left-0 right-0 px-6 shadow-2xl">
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
              className="w-full bg-[#FF6A00] text-white hover:bg-[hsl(24,100%,55%)] transition-colors rounded-full py-6 text-lg"
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
