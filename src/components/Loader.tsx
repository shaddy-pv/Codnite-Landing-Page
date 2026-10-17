import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import codniteLogo from '@/assets/codinte-logo-2-removebg-preview (1).png';

const CODE_SYMBOLS = ['{', '}', '<', '>', '/', '\\', '[', ']', '#', '@', '!', '*', ';', ':', '=', '+'];

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const glow = glowRef.current;
    const ring = ringRef.current;
    if (!container || !logo || !glow || !ring) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete();
        },
      });

      // ── Phase 1: Orbiting symbols converge (0s - 0.45s) ──
      orbitRefs.current.forEach((el, i) => {
        if (!el) return;
        const angle = (i / CODE_SYMBOLS.length) * Math.PI * 2;
        const startRadius = 180;
        const startX = Math.cos(angle) * startRadius;
        const startY = Math.sin(angle) * startRadius;

        gsap.set(el, {
          x: startX,
          y: startY,
          opacity: 0,
          scale: 1.2,
          rotation: Math.random() * 360,
        });

        tl.to(el, { opacity: 0.75, duration: 0.15, ease: 'power2.out' }, 0.015 * i);
        tl.to(el, {
          x: 0,
          y: 0,
          opacity: 0,
          scale: 0.25,
          rotation: 0,
          ease: 'power2.in',
          duration: 0.35,
        }, 0.12 + 0.01 * i);
      });

      // ── Phase 2: Logo materializes with glow (0.28s - 0.75s) ──
      tl.fromTo(logo,
        { scale: 0.3, opacity: 0, filter: 'blur(12px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 0.45 },
        0.28
      );

      tl.fromTo(glow,
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.4 },
        0.32
      );

      tl.fromTo(ring,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 0.3, ease: 'power2.out', duration: 0.4 },
        0.35
      );

      // ── Phase 3: Quick hold (0.75s - 0.95s) ──
      tl.to({}, { duration: 0.2 }, 0.75);

      // ── Phase 4: Smooth exit - scale up & fade out (0.95s - 1.35s) ──
      tl.to(logo, { scale: 1.6, opacity: 0, filter: 'blur(8px)', ease: 'power2.in', duration: 0.35 }, 0.95);
      tl.to(glow, { opacity: 0, scale: 1.8, duration: 0.35 }, 0.95);
      tl.to(ring, { opacity: 0, scale: 1.6, duration: 0.35 }, 0.95);
      tl.to(container, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 1.05);
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
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,106,0,0.2) 0%, rgba(255,61,0,0.08) 35%, transparent 65%)',
          filter: 'blur(40px)',
          opacity: 0,
        }}
      />

      {/* Decorative ring */}
      <div
        ref={ringRef}
        className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full border border-[#FF6A00]/20 pointer-events-none"
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
              left: '50%', top: '50%',
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
        className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] object-contain relative z-10 will-change-transform"
        style={{ opacity: 0 }}
        draggable={false}
      />
    </div>
  );
};

export default Loader;
