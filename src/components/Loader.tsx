import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import codniteLogo from '@/assets/codinte-logo-2-removebg-preview (1).png';

const CODE_SYMBOLS = ['{', '}', '<', '>', '/', '\\', '[', ']', '#', '@', '!', '*', ';', ':', '=', '+'];

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const glow = glowRef.current;
    const subtitle = subtitleRef.current;
    const ring = ringRef.current;
    if (!container || !logo || !glow || !subtitle || !ring) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete();
        },
      });

      // ─── Phase 1: Orbiting symbols converge inward (0s – 1.2s) ───
      orbitRefs.current.forEach((el, i) => {
        if (!el) return;
        const angle = (i / CODE_SYMBOLS.length) * Math.PI * 2;
        const startRadius = 250;
        const startX = Math.cos(angle) * startRadius;
        const startY = Math.sin(angle) * startRadius;

        // Set initial positions
        gsap.set(el, {
          x: startX,
          y: startY,
          opacity: 0,
          scale: 1.5,
          rotation: Math.random() * 360,
        });

        // Stagger them in with a slight rotation drift
        tl.to(
          el,
          {
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.out',
          },
          0.05 * i
        );

        // Converge them inward
        tl.to(
          el,
          {
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.3,
            rotation: 0,
            ease: 'power2.in',
            duration: 0.8,
          },
          0.3 + 0.02 * i
        );
      });

      // ─── Phase 2: Logo materializes (0.6s – 1.6s) ───
      tl.fromTo(
        logo,
        { scale: 0.2, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 0.9 },
        0.6
      );

      // Glow emerges
      tl.fromTo(
        glow,
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.8 },
        0.7
      );

      // Ring expands
      tl.fromTo(
        ring,
        { scale: 0.5, opacity: 0, borderWidth: '2px' },
        { scale: 1, opacity: 0.3, borderWidth: '1px', ease: 'power2.out', duration: 0.8 },
        0.8
      );

      // ─── Phase 3: Logo rotates 360° with glow pulse (1.6s – 2.6s) ───
      tl.to(
        logo,
        { rotation: 360, ease: 'power2.inOut', duration: 1.0 },
        1.6
      );

      // Glow pulses during rotation
      tl.to(glow, { scale: 1.4, opacity: 0.8, duration: 0.5, ease: 'power2.out' }, 1.6);
      tl.to(glow, { scale: 1, opacity: 0.5, duration: 0.5, ease: 'power2.in' }, 2.1);

      // Ring expands during rotation
      tl.to(ring, { scale: 1.3, opacity: 0.15, duration: 1.0 }, 1.6);

      // ─── Phase 4: Subtitle fades in (2.3s – 2.7s) ───
      tl.fromTo(
        subtitle,
        { opacity: 0, y: 20 },
        { opacity: 0.5, y: 0, ease: 'power2.out', duration: 0.4 },
        2.3
      );

      // ─── Hold briefly ───
      tl.to({}, { duration: 0.5 }, 2.7);

      // ─── Phase 5: Exit — everything scales up & fades out (3.2s – 3.8s) ───
      tl.to(
        logo,
        { scale: 2, opacity: 0, filter: 'blur(10px)', ease: 'power2.in', duration: 0.6 },
        3.2
      );
      tl.to(subtitle, { opacity: 0, y: -15, duration: 0.3 }, 3.2);
      tl.to(glow, { opacity: 0, scale: 2.5, duration: 0.6 }, 3.2);
      tl.to(ring, { opacity: 0, scale: 2, duration: 0.6 }, 3.2);

      // Container fades
      tl.to(container, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 3.5);
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,106,0,0.2) 0%, rgba(255,61,0,0.08) 35%, transparent 65%)',
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
            ref={(el) => {
              orbitRefs.current[i] = el;
            }}
            className="absolute text-[#FF6A00]/60 font-mono text-lg md:text-xl pointer-events-none select-none"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              willChange: 'transform, opacity',
              opacity: 0,
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

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center text-gray-500/40 text-xs md:text-sm font-mono tracking-[0.35em] uppercase select-none"
        style={{ opacity: 0 }}
      >
        United by code
      </p>
    </div>
  );
};

export default Loader;
