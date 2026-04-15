import { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  phase: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  trail: { x: number; y: number; alpha: number }[];
  life: number;
  maxLife: number;
}

/**
 * StarryBackground — fixed canvas behind all sections (except hero).
 * Stars twinkle gently. Click anywhere below the hero to trigger a shooting star.
 * pointer-events: none — clicks are captured via window listener so content stays interactive.
 */
export const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const animRef = useRef(0);
  const tRef = useRef(0);
  const visibleRef = useRef(true);

  // Generate stars on init/resize
  const initStars = useCallback((w: number, h: number) => {
    const stars: Star[] = [];
    // Target ~1 star per 4000 px² — enough to feel full but not cluttered
    const count = Math.floor((w * h) / 4000);

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.5 + Math.random() * 1.8,
        baseAlpha: 0.15 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.3 + Math.random() * 1.5,
      });
    }
    starsRef.current = stars;
  }, []);

  // Spawn a shooting star from the clicked position
  const spawnShootingStar = useCallback((clickX: number, clickY: number) => {
    // Find nearest star within 60px of click
    let nearest: Star | null = null;
    let nearestDist = 60;

    for (const star of starsRef.current) {
      const dx = star.x - clickX;
      const dy = star.y - clickY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < nearestDist) {
        nearest = star;
        nearestDist = dist;
      }
    }

    // If no star near click, spawn from click position anyway
    const startX = nearest ? nearest.x : clickX;
    const startY = nearest ? nearest.y : clickY;

    // If we consumed a star, make it invisible (set alpha to 0)
    if (nearest) {
      nearest.baseAlpha = 0;
      // Respawn this star elsewhere after the shooting star finishes
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas && nearest) {
          nearest.x = Math.random() * canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
          nearest.y = Math.random() * canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
          nearest.baseAlpha = 0.15 + Math.random() * 0.6;
        }
      }, 2000);
    }

    // Random diagonal direction (slightly downward, either left or right)
    const angle = (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.5) - 0.2;
    const speed = 8 + Math.random() * 6;

    shootingRef.current.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed + 2, // slight downward bias
      size: 2 + Math.random() * 2,
      alpha: 1,
      trail: [],
      life: 0,
      maxLife: 40 + Math.random() * 30,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let cw = 0, ch = 0;
    const dprRef = { current: 1 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars(cw, ch);
    };

    resize();
    window.addEventListener('resize', resize);

    // Visibility — pause when tab is hidden
    const onVisibility = () => { visibleRef.current = !document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    // Click handler — window level so it works through content
    const onClick = (e: MouseEvent) => {
      // Only trigger below the hero (roughly 100vh)
      const heroHeight = window.innerHeight;
      if (e.clientY < 80) return; // Don't trigger in navbar area

      // Translate page click to canvas coordinates
      // The canvas is fixed, so clientX/clientY = canvas coordinates
      spawnShootingStar(e.clientX, e.clientY);
    };

    window.addEventListener('click', onClick);

    // ─── Render Loop ───
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current || !cw || !ch) return;

      const dt = 0.016;
      tRef.current += dt;
      const t = tRef.current;

      // Clear with transparency — this canvas layers BEHIND content
      ctx.clearRect(0, 0, cw, ch);

      // ── Draw Stars ──
      for (const star of starsRef.current) {
        if (star.baseAlpha <= 0) continue;

        const twinkle = 0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.phase);
        const alpha = star.baseAlpha * twinkle;
        if (alpha < 0.03) continue;

        // Warm star color (subtle orange/white tint matching Codnite theme)
        const warmth = star.baseAlpha;
        const r = Math.floor(255);
        const g = Math.floor(220 + warmth * 35);
        const b = Math.floor(180 + warmth * 75);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();

        // Glow halo for brighter stars
        if (star.size > 1.2 && alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,200,150,${alpha * 0.06})`;
          ctx.fill();
        }
      }

      // ── Draw Shooting Stars ──
      for (let i = shootingRef.current.length - 1; i >= 0; i--) {
        const ss = shootingRef.current[i];
        ss.life++;

        if (ss.life > ss.maxLife) {
          shootingRef.current.splice(i, 1);
          continue;
        }

        // Update position
        ss.x += ss.vx;
        ss.y += ss.vy;

        // Fade out over life
        ss.alpha = 1 - (ss.life / ss.maxLife);

        // Add to trail
        ss.trail.unshift({ x: ss.x, y: ss.y, alpha: ss.alpha });
        if (ss.trail.length > 25) ss.trail.pop();

        // Fade trail
        for (let j = 0; j < ss.trail.length; j++) {
          ss.trail[j].alpha *= 0.88;
        }

        // Draw trail
        for (let j = ss.trail.length - 1; j >= 1; j--) {
          const p = ss.trail[j];
          if (p.alpha < 0.02) continue;
          const trailSize = ss.size * (1 - j / ss.trail.length) * 0.8;
          if (trailSize <= 0) continue;

          ctx.beginPath();
          ctx.arc(p.x, p.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,180,80,${p.alpha * 0.5})`;
          ctx.fill();
        }

        // Draw head
        if (ss.alpha > 0) {
          // Bright core
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, ss.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,240,200,${ss.alpha})`;
          ctx.fill();

          // Glow
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, ss.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,150,50,${ss.alpha * 0.15})`;
          ctx.fill();

          // White hot center
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, ss.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${ss.alpha * 0.8})`;
          ctx.fill();
        }
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [initStars, spawnShootingStar]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ top: 0, left: 0 }}
      aria-hidden="true"
    />
  );
};

export default StarryBackground;
