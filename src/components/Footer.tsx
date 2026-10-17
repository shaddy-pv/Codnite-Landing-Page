import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import codniteLogo from '@/assets/horizontal_logo.png';

const getAppUrl = (path: string = '') => {
  if (typeof window !== 'undefined' && window.location.port === '4173') {
    return `http://localhost:5173/app${path}`;
  }
  return `/app${path}`;
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: '1v1 Battles', href: '/#features' },
    { label: 'Campus Living Room', href: '/#features' },
    { label: 'Skill Assessments', href: '/#features' },
    { label: 'Campus Hubs', href: '/#features' },
    { label: 'Placement Pipeline', href: '/#features' },
  ];

  const platformLinks = [
    { label: 'Products Suite', href: '/products' },
    { label: 'Hall of Fame', href: '/#hall-of-fame' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Meet the Team', href: '/#team' },
    { label: 'Launch Web App', href: getAppUrl() },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact Support', href: 'mailto:codnite.dev@gmail.com' },
    { label: 'Product Feedback', href: 'https://docs.google.com/forms/d/e/1FAIpQLSf8ZovgP7JX4jj1Q0nRUAUaFWwLPmkdf8wpav3mqKfLFU6T2Q/viewform?usp=dialog' },
  ];

  return (
    <footer className="bg-transparent border-t border-white/[0.06] pt-12 sm:pt-16 pb-8 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10">
          
          {/* ── Left Column: Brand & Mission (5 cols on lg) ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-4 lg:col-span-5"
          >
            <a href="/" className="inline-block group w-fit -ml-2.5 sm:-ml-4" data-cursor-hover>
              <img
                src={codniteLogo}
                alt="Codnite Logo"
                className="h-10 sm:h-12 md:h-[56px] w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </a>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mt-1 sm:mt-1.5 mb-3.5">
              The competitive coding arena for university developers. Battle 1v1 in real-time, master algorithms, and climb campus rankings.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] text-zinc-300 text-xs font-medium select-none transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>All Systems Operational</span>
            </div>
          </motion.div>

          {/* ── Right Columns: 3 Balanced Link Columns (7 cols on lg, stretched to right edge) ── */}
          <div className="md:col-span-8 lg:col-span-7 flex flex-wrap justify-between gap-6 sm:gap-8 lg:gap-12">
            
            {/* Column 1: Product */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="min-w-[130px]"
            >
              <h4 className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4 tracking-wider uppercase font-mono">
                Product
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {productLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-zinc-400 hover:text-[#FF6A00] transition-colors duration-200 text-xs sm:text-sm inline-block"
                      data-cursor-hover
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 2: Platform */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="min-w-[130px]"
            >
              <h4 className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4 tracking-wider uppercase font-mono">
                Platform
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {platformLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-zinc-400 hover:text-[#FF6A00] transition-colors duration-200 text-xs sm:text-sm inline-block"
                      data-cursor-hover
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Legal & Support (aligned flush to right container edge) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="min-w-[140px]"
            >
              <h4 className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4 tracking-wider uppercase font-mono">
                Legal & Support
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {legalLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-zinc-400 hover:text-[#FF6A00] transition-colors duration-200 text-xs sm:text-sm inline-block"
                      data-cursor-hover
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

        </div>

        {/* ── Subtle Divider Line ── */}
        <div className="section-divider my-6 sm:my-8" />

        {/* ── Professional Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-zinc-500">
            <span>© {currentYear} Codnite. All rights reserved.</span>
            <span className="hidden sm:inline text-zinc-700">·</span>
            <span className="text-zinc-400">Built for developers who build.</span>
          </div>

          {/* Social Links on Right Edge */}
          <div className="flex items-center gap-2 text-zinc-400">
            <a
              href="https://x.com/md_shadann"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200"
              aria-label="X (Twitter) Profile"
              data-cursor-hover
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/md-shadan-siddiqui/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200"
              aria-label="Codnite LinkedIn"
              data-cursor-hover
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:codnite.dev@gmail.com"
              className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200"
              aria-label="Contact Email"
              data-cursor-hover
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
