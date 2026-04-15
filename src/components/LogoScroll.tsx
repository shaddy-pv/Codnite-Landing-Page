import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import codniteLogo from '@/assets/codinte-logo-2-removebg-preview (1).png';

gsap.registerPlugin(ScrollTrigger);

const CODE_SYMBOLS = ['{', '}', '<', '>', '/', '\\', '[', ']', '#', '@', '!', '*', ';', ':', '=', '+'];

export const LogoScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const orbitRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !logoRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // Phase 1: Logo materializes from scattered symbols (0% - 40%)
      // Orbiting symbols converge inward
      orbitRefs.current.forEach((el, i) => {
        if (!el) return;
        const angle = (i / orbitRefs.current.length) * Math.PI * 2;
        const startRadius = 250;
        const startX = Math.cos(angle) * startRadius;
        const startY = Math.sin(angle) * startRadius;

        tl.fromTo(
          el,
          { x: startX, y: startY, opacity: 0.8, scale: 1.5, rotation: Math.random() * 360 },
          { x: 0, y: 0, opacity: 0, scale: 0.3, rotation: 0, ease: 'power2.in', duration: 0.4 },
          0
        );
      });

      // Logo scales up from nothing
      tl.fromTo(
        logoRef.current,
        { scale: 0.2, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 0.4 },
        0.05
      );

      // Glow emerges
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.35 },
        0.1
      );

      // Ring expands
      tl.fromTo(
        ringRef.current,
        { scale: 0.5, opacity: 0, borderWidth: '2px' },
        { scale: 1, opacity: 0.3, borderWidth: '1px', ease: 'power2.out', duration: 0.35 },
        0.15
      );

      // Subtitle fades in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.5, y: 0, ease: 'power2.out', duration: 0.15 },
        0.35
      );

      // Phase 2: Logo rotates 360° (40% - 70%)
      tl.to(
        logoRef.current,
        { rotation: 360, ease: 'power2.inOut', duration: 0.3 },
        0.4
      );

      // Glow pulses during rotation
      tl.to(glowRef.current, { scale: 1.4, opacity: 0.8, duration: 0.15 }, 0.4);
      tl.to(glowRef.current, { scale: 1, opacity: 0.5, duration: 0.15 }, 0.55);

      // Ring expands during rotation
      tl.to(ringRef.current, { scale: 1.3, opacity: 0.15, duration: 0.3 }, 0.4);

      // Phase 3: Logo scales up + fades out (70% - 100%)
      tl.to(
        logoRef.current,
        { scale: 2, opacity: 0, filter: 'blur(10px)', ease: 'power2.in', duration: 0.3 },
        0.7
      );

      tl.to(subtitleRef.current, { opacity: 0, y: -15, duration: 0.15 }, 0.7);
      tl.to(glowRef.current, { opacity: 0, scale: 2.5, duration: 0.3 }, 0.7);
      tl.to(ringRef.current, { opacity: 0, scale: 2, duration: 0.3 }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-[150vh] bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="h-screen w-full flex items-center justify-center relative">
        {/* Background glow */}
        <div
          ref={glowRef}
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,106,0,0.2) 0%, rgba(255,61,0,0.08) 35%, transparent 65%)',
            filter: 'blur(40px)',
            opacity: 0,
          }}
        />

        {/* Decorative ring */}
        <div
          ref={ringRef}
          className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-[#FF6A00]/20 pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* Orbiting code symbols */}
        <div className="absolute pointer-events-none">
          {CODE_SYMBOLS.map((symbol, i) => (
            <span
              key={i}
              ref={(el) => { orbitRefs.current[i] = el; }}
              className="absolute text-[#FF6A00]/60 font-mono text-lg md:text-xl pointer-events-none select-none"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                willChange: 'transform, opacity',
              }}
            >
              {symbol}
            </span>
          ))}
        </div>

        {/* Logo */}
        <img
          ref={logoRef}
          src={codniteLogo}
          alt="Codnite"
          className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] object-contain relative z-10 will-change-transform"
          style={{ opacity: 0 }}
          draggable={false}
        />

        {/* Ambient subtitle */}
        <p
          ref={subtitleRef}
          className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center text-gray-500/40 text-xs md:text-sm font-mono tracking-[0.35em] uppercase select-none"
          style={{ opacity: 0 }}
        >
          United by code
        </p>
      </div>
    </section>
  );
};

export default LogoScroll;
