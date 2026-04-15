import { useEffect, useRef, useCallback } from "react";

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1);
  const trailRef = useRef<TrailPoint[]>([]);
  const isMobileRef = useRef(false);
  const animFrameRef = useRef<number>(0);

  const updateTrail = useCallback(() => {
    const trail = trailRef.current;
    const pos = posRef.current;
    const target = targetRef.current;

    // Smooth cursor movement (higher = more responsive)
    pos.x += (target.x - pos.x) * 0.45;
    pos.y += (target.y - pos.y) * 0.45;

    // Add to trail
    trail.unshift({ x: pos.x, y: pos.y, alpha: 0.6 });
    if (trail.length > 8) trail.pop();

    // Fade trail
    for (let i = 0; i < trail.length; i++) {
      trail[i].alpha *= 0.85;
    }

    // Position the dot
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${pos.x - 4}px, ${pos.y - 4}px) scale(${scaleRef.current})`;
    }

    // Draw trail on canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let i = 1; i < trail.length; i++) {
          const p = trail[i];
          if (p.alpha < 0.02) continue;
          const size = (4 - i * 0.3) * dpr;
          if (size <= 0) continue;

          ctx.beginPath();
          ctx.arc(p.x * dpr, p.y * dpr, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 106, 0, ${p.alpha})`;
          ctx.fill();
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(updateTrail);
  }, []);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768 || 'ontouchstart' in window;
    if (isMobileRef.current) return;

    // Setup canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    const handleResize = () => {
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticTarget = target.closest(".magnetic-btn") as HTMLElement;

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        targetRef.current = {
          x: rect.left + rect.width / 2 + relX * 0.3,
          y: rect.top + rect.height / 2 + relY * 0.3,
        };
      } else {
        targetRef.current = { x: e.clientX, y: e.clientY };
      }

      // Check hover state
      const isHovering =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        !!target.closest("[data-cursor-hover]");

      scaleRef.current = isHovering ? 1.8 : 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animFrameRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateTrail]);

  if (typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)) {
    return null;
  }

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
      />
      {/* Glowing dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: '#FF6A00',
          boxShadow: '0 0 12px rgba(255,106,0,0.8), 0 0 24px rgba(255,106,0,0.4)',
          transition: 'width 0.2s, height 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
