import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';


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
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]"
    >

      {/* Foreground Text Layer */}
      <motion.div
        style={{ y: yText }}
        className="relative z-10 text-center px-6 max-w-5xl pointer-events-none"
      >
        {/* Top badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-[#FF6A00]/20 bg-[#FF6A00]/[0.06] backdrop-blur-md"
          style={{ opacity: 0 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
          <span className="text-[#FF6A00]/90 text-xs font-mono tracking-wider uppercase">
            Developer Platform - Now Live
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="text-[3.2rem] sm:text-[4rem] md:text-[5.5rem] font-bold text-white mb-6 tracking-tight leading-[1.05]"
          style={{
            opacity: 0,
            textShadow: '0 0 60px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.7)',
          }}
        >
          Build. Collaborate.
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(135deg, #FF6A00 0%, #FFB340 50%, #FF6A00 100%)',
              filter: 'drop-shadow(0 0 40px rgba(255,106,0,0.5))',
            }}
          >
            Dominate Code.
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-base sm:text-lg md:text-2xl text-gray-400/90 mb-12 max-w-[700px] mx-auto leading-relaxed"
          style={{
            opacity: 0,
            textShadow: '0 0 20px rgba(0,0,0,0.7)',
          }}
        >
          Codnite is where developers stop learning alone and start building together.
        </p>

        {/* CTA buttons - re-enable pointer-events for clickable elements */}
        <div ref={ctaRef} className="flex flex-col items-center gap-4 pointer-events-auto" style={{ opacity: 0 }}>
          <button
            onClick={() => window.location.href = '/app'}
            className="magnetic-btn cta-breathe group relative px-8 py-4 bg-[#FF6A00] text-white text-lg font-semibold rounded-full hover:bg-[hsl(24,100%,55%)] transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,106,0,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,106,0,0.7)] hover:-translate-y-1 overflow-hidden"
            data-cursor-hover
          >
            <span className="relative z-10 flex items-center gap-2">
              Enter Codnite
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 rounded-full border border-white/20 edge-highlight pointer-events-none" />
          </button>
          <span className="text-gray-600 text-xs font-medium tracking-widest uppercase">Free to join • No credit card</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
