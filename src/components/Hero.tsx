import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { CodeBrain } from './CodeBrain';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Parallax configuration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // GSAP text reveal animations
  useEffect(() => {
    if (!headlineRef.current || !subRef.current || !ctaRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Badge fade in
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
        );
      }

      // Headline clip-path wipe reveal
      tl.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 60,
          clipPath: 'inset(100% 0% 0% 0%)',
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Subtitle
      tl.fromTo(
        subRef.current,
        {
          opacity: 0,
          y: 40,
          clipPath: 'inset(100% 0% 0% 0%)',
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.6'
      );

      // CTA button
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #0D0500 40%, #0A0A0A 100%)',
      }}
    >
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />

      {/* Background Parallax Layer — cinematic gradients */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        {/* Orange top-left glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.12)_0%,transparent_70%)] blur-3xl mix-blend-screen" />
        {/* Deep amber bottom-right glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08)_0%,transparent_70%)] blur-3xl mix-blend-screen" />
        {/* Center ambient glow */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.05)_0%,transparent_60%)] blur-3xl mix-blend-screen" />
        {/* Subtle fiery red top accent */}
        <div className="absolute top-[-5%] right-[20%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,50,0,0.08)_0%,transparent_70%)] blur-3xl mix-blend-screen" />
      </motion.div>

      {/* Code Brain Canvas — centerpiece */}
      <div className="absolute inset-0 z-[2]">
        <CodeBrain />
      </div>

      {/* Foreground Text Layer — elevated above brain with backdrop for legibility */}
      <motion.div
        style={{ y: yText }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        {/* Top badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#FF6A00]/20 bg-[#FF6A00]/5 backdrop-blur-sm"
          style={{ opacity: 0 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
          <span className="text-[#FF6A00]/80 text-xs font-mono tracking-wider uppercase">
            Developer Platform — Now Live
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="text-[3.5rem] md:text-[5.5rem] font-bold text-white mb-6 tracking-tight leading-[1.08]"
          style={{
            opacity: 0,
            textShadow: '0 0 60px rgba(0,0,0,0.8), 0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          Build. Collaborate.
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(135deg, #FF6A00 0%, #FFB340 50%, #FF6A00 100%)',
              filter: 'drop-shadow(0 0 30px rgba(255,106,0,0.4))',
            }}
          >
            Dominate Code.
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-lg md:text-2xl text-gray-400/90 mb-12 max-w-[700px] mx-auto leading-relaxed"
          style={{
            opacity: 0,
            textShadow: '0 0 30px rgba(0,0,0,0.6)',
          }}
        >
          Codnite is where developers stop learning alone and start building together.
        </p>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <button
            onClick={() => window.location.href = '/app'}
            className="magnetic-btn cta-breathe group relative px-8 py-4 bg-[#FF6A00] text-white text-lg font-medium rounded-full hover:bg-[hsl(24,100%,55%)] transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,106,0,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,106,0,0.7)] hover:-translate-y-1 overflow-hidden"
            data-cursor-hover
          >
            <span className="relative z-10 flex items-center gap-2">
              Enter Codnite
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 rounded-full border border-white/20 edge-highlight pointer-events-none" />
          </button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[30px] h-[50px] border-[1.5px] border-gray-600/50 rounded-full flex justify-center p-[6px]">
          <motion.div
            animate={{
              y: [0, 16, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 bg-[#FF6A00]/80 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
