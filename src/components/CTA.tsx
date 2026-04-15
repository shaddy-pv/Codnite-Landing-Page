import React from 'react';
import { motion } from 'framer-motion';

export const CTA = React.memo(() => {
  return (
    <section className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* Cinematic noise and glows */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.1)_0%,transparent_60%)] blur-3xl mix-blend-screen pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.2 } 
          }
        }}
        className="max-w-4xl text-center relative z-10"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.8, ease: "easeOut" } 
            }
          }}
          className="text-[4rem] md:text-7xl font-bold text-white mb-12 leading-[1.1] tracking-tight"
        >
          Ready to stop watching
          <br />
          and start <span className="text-[#FF6A00] animate-pulse-glow inline-block rounded-sm px-1">building</span>?
        </motion.h2>

        <motion.div
           variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.8, ease: "easeOut" } 
            }
          }}
        >
          <button
            className="magnetic-btn cta-breathe group relative px-12 py-5 bg-[#FF6A00] text-white text-xl font-medium rounded-full hover:bg-[hsl(24,100%,55%)] transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,106,0,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,106,0,0.7)] hover:-translate-y-1 overflow-hidden"
            data-cursor-hover
          >
            <span className="relative z-10 flex items-center gap-3">
              Join Codnite
            </span>
            <div className="absolute inset-0 rounded-full border border-white/20 edge-highlight pointer-events-none" />
          </button>
        </motion.div>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.8, ease: "easeOut" } 
            }
          }}
          className="text-gray-500/80 mt-10 text-sm font-medium tracking-wide uppercase"
        >
          No credit card required
        </motion.p>
      </motion.div>
    </section>
  );
});

export default CTA;
