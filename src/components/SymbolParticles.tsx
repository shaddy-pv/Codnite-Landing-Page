import { useEffect, useRef } from 'react';

const CODE_SYMBOLS = ['.', '/', '[', ']', '{', '}', '<', '>', '&', '^', '%', '$', '#', '@', '!', '*', '(', ')', ';', ':', '|', '\\', '=', '+', '~'];

interface FloatingSymbol {
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
  size: number;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
}

const SYMBOL_COUNT = 30;
const REPEL_RADIUS = 120;
const REPEL_FORCE = 3;

export const SymbolParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbolsRef = useRef<FloatingSymbol[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on mobile or low-end devices
    if (window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)) {
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initSymbols();
    };

    const initSymbols = () => {
      const symbols: FloatingSymbol[] = [];
      for (let i = 0; i < SYMBOL_COUNT; i++) {
        symbols.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
          symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
          size: 12 + Math.random() * 18,
          alpha: 0.03 + Math.random() * 0.05,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
        });
      }
      symbolsRef.current = symbols;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const mouse = mouseRef.current;
      const symbols = symbolsRef.current;

      for (let i = 0; i < symbols.length; i++) {
        const s = symbols[i];

        // Mouse repel
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          const angle = Math.atan2(dy, dx);
          s.vx += Math.cos(angle) * force * 0.05;
          s.vy += Math.sin(angle) * force * 0.05;
        }

        // Apply velocity with damping
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.98;
        s.vy *= 0.98;

        // Restore base velocity (slow drift)
        s.vx += (Math.random() - 0.5) * 0.01;
        s.vy += (Math.random() - 0.5) * 0.008;

        // Clamp velocity
        const maxVel = 0.8;
        s.vx = Math.max(-maxVel, Math.min(maxVel, s.vx));
        s.vy = Math.max(-maxVel, Math.min(maxVel, s.vy));

        // Wrap around edges
        if (s.x < -30) s.x = w + 30;
        if (s.x > w + 30) s.x = -30;
        if (s.y < -30) s.y = h + 30;
        if (s.y > h + 30) s.y = -30;

        // Rotate
        s.rotation += s.rotationSpeed;

        // Draw
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.font = `${s.size}px 'Courier New', monospace`;
        ctx.fillStyle = `rgba(255, 106, 0, ${s.alpha})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.symbol, 0, 0);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[0] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default SymbolParticles;
