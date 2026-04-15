import { motion } from 'framer-motion';
import codniteLogo from '@/assets/codinte-logo-2-removebg-preview (1).png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Get Started', href: '/app' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  const connectLinks = [
    { label: 'Contact', href: 'mailto:shadanmd566@gmail.com' },
    { label: 'Feedback', href: 'https://docs.google.com/forms/d/e/1FAIpQLSf8ZovgP7JX4jj1Q0nRUAUaFWwLPmkdf8wpav3mqKfLFU6T2Q/viewform?usp=dialog' },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.06] px-6 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo + Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex items-center gap-3 group mb-4">
              <img
                src={codniteLogo}
                alt="Codnite Logo"
                className="w-9 h-9 object-contain transition-transform duration-300 group-hover:rotate-12"
              />
              <span className="text-white font-bold text-xl tracking-tight">Codnite</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-[240px]">
              Where developers stop learning alone and start building together.
            </p>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-[#FF6A00] transition-colors duration-300 text-sm"
                    data-cursor-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-[#FF6A00] transition-colors duration-300 text-sm"
                    data-cursor-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">Connect</h4>
            <ul className="space-y-3">
              {connectLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-500 hover:text-[#FF6A00] transition-colors duration-300 text-sm"
                    data-cursor-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="section-divider my-10" />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-600 text-sm">
            © {currentYear} Codnite. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs font-mono tracking-wider">
            Built for developers who build.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
