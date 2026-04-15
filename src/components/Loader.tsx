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

      // ── Phase 1: Orbiting symbols converge fast (0s – 0.5s) ──
      orbitRefs.current.forEach((el, i) => {
        if (!el) return;
        const angle = (i / CODE_SYMBOLS.length) * Math.PI * 2;
        const startRadius = 200;
        const startX = Math.cos(angle) * startRadius;
        const startY = Math.sin(angle) * startRadius;

        gsap.set(el, {
          x: startX, y: startY,
          opacity: 0, scale: 1.3,
          rotation: Math.random() * 360,
        });

        tl.to(el, { opacity: 0.7, duration: 0.15, ease: 'power2.out' }, 0.02 * i);
        tl.to(el, {
          x: 0, y: 0, opacity: 0, scale: 0.3, rotation: 0,
          ease: 'power2.in', duration: 0.4,
        }, 0.15 + 0.01 * i);
      });

      // ── Phase 2: Logo materializes (0.3s – 0.8s) ──
      tl.fromTo(logo,
        { scale: 0.2, opacity: 0, filter: 'blur(15px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 0.5 },
        0.3
      );

      tl.fromTo(glow,
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.4 },
        0.35
      );

      tl.fromTo(ring,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 0.3, ease: 'power2.out', duration: 0.4 },
        0.4
      );

      // ── Phase 3: Quick hold (0.8s – 1.0s) ──
      tl.to({}, { duration: 0.2 }, 0.8);

      // ── Phase 4: Exit — scale up & fade out (1.0s – 1.5s) ──
      tl.to(logo, { scale: 1.8, opacity: 0, filter: 'blur(8px)', ease: 'power2.in', duration: 0.4 }, 1.0);
      tl.to(glow, { opacity: 0, scale: 2, duration: 0.4 }, 1.0);
      tl.to(ring, { opacity: 0, scale: 1.8, duration: 0.4 }, 1.0);
      tl.to(container, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 1.2);
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
