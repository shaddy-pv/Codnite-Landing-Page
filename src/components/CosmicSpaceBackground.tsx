import React, { useEffect, useRef, useCallback } from 'react';
import { runWhenIdle } from '@/lib/idle';

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  depth: number; // 1 (far), 2 (mid), 3 (close)
  baseAlpha: number;
  alpha: number;
  phase: number;
  twinkleSpeed: number;
  color: string;
  hasSpikes?: boolean;
  spikeLength?: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Stardust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

export const CosmicSpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const stardustRef = useRef<Stardust[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: -9999,
    y: -9999,
    targetX: 0,
    targetY: 0,
  });
  const isVisibleRef = useRef<boolean>(true);

  // Generate crisp, naturalistic celestial stars
  const initUniverse = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const starCount = isMobile ? 60 : 120;
    const dustCount = isMobile ? 5 : 10;

    // Pure astronomical neutrals (crisp whites, silver, warm starlight)
    const starColors = [
      '#FFFFFF',
      '#FAFAFA',
      '#F4F4F5',
      '#E4E4E7',
      '#D4D4D8',
      '#FFFBF0',
      '#FEF3C7',
    ];

    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const rand = Math.random();
      let depth = 1;
      let size = 0.45 + Math.random() * 0.8;
      let baseAlpha = 0.2 + Math.random() * 0.45;

      if (rand > 0.72 && rand <= 0.93) {
        depth = 2;
        size = 1.0 + Math.random() * 0.9;
        baseAlpha = 0.45 + Math.random() * 0.4;
      } else if (rand > 0.93) {
        depth = 3;
        size = 1.7 + Math.random() * 1.2;
        baseAlpha = 0.7 + Math.random() * 0.3;
      }

      // Elegant 4-point cross diffraction spikes for select hero stars
      const hasSpikes = depth === 3 && Math.random() > 0.45;
      const spikeLength = hasSpikes ? 7 + Math.random() * 11 : 0;

      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const x = Math.random() * width;
      const y = Math.random() * height;

      stars.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size,
        depth,
        baseAlpha,
        alpha: baseAlpha,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.3 + Math.random() * 1.5,
        color,
        hasSpikes,
        spikeLength,
      });
    }
    starsRef.current = stars;

    // Faint cosmic stardust motes (subtle silver dust)
    const stardust: Stardust[] = [];
    for (let i = 0; i < dustCount; i++) {
      stardust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.1 - Math.random() * 0.25,
        size: 0.7 + Math.random() * 1.2,
        alpha: 0.08 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    stardustRef.current = stardust;
  }, []);

  // Spawn clean, realistic shooting star (meteor)
  const spawnShootingStar = useCallback((originX?: number, originY?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    let startX: number;
    let startY: number;
    let angle: number;

    if (originX !== undefined && originY !== undefined) {
      startX = originX;
      startY = originY;
      angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.35;
    } else {
      const fromTop = Math.random() > 0.4;
      if (fromTop) {
        startX = Math.random() * w * 0.9;
        startY = -20;
        angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25;
      } else {
        startX = w + 20;
        startY = Math.random() * h * 0.5;
        angle = (3 * Math.PI / 4) + (Math.random() - 0.5) * 0.25;
      }
    }

    const speed = 15 + Math.random() * 9;

    shootingStarsRef.current.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: 110 + Math.random() * 90,
      size: 1.4 + Math.random() * 1.0,
      alpha: 1,
      life: 0,
      maxLife: 42 + Math.floor(Math.random() * 20),
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMounted = true;
    let lastTime = performance.now();
    let shootingStarTimer = 0;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      if (!canvasRef.current) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initUniverse(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON' || target.tagName === 'A')) {
        return;
      }
      spawnShootingStar(e.clientX, e.clientY);
    };

    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
      if (isVisibleRef.current) {
        lastTime = performance.now();
      }
    };

    let curParallaxX = 0;
    let curParallaxY = 0;

    const render = (now: number) => {
      if (!isMounted) return;
      animRef.current = requestAnimationFrame(render);

      if (!isVisibleRef.current || width === 0 || height === 0) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      curParallaxX += (mouseRef.current.targetX - curParallaxX) * 0.04;
      curParallaxY += (mouseRef.current.targetY - curParallaxY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Periodic natural shooting star
      shootingStarTimer += dt;
      if (shootingStarTimer > 5.5 + Math.random() * 3.5) {
        spawnShootingStar();
        shootingStarTimer = 0;
      }

      const stars = starsRef.current;
      const mouse = mouseRef.current;
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      const scrollOffset = scrollY * 0.04;

      // ── 1. Cosmic Stardust Motes (Crisp Silver Dust) ──
      for (let i = 0; i < stardustRef.current.length; i++) {
        const dust = stardustRef.current[i];
        dust.x += dust.vx;
        dust.y += dust.vy;
        dust.phase += dt * 0.6;

        if (dust.y < -10) dust.y = height + 10;
        if (dust.x < -10) dust.x = width + 10;
        if (dust.x > width + 10) dust.x = -10;

        const pulse = Math.sin(dust.phase) * 0.3 + 0.7;
        const dustAlpha = dust.alpha * pulse;

        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${dustAlpha.toFixed(3)})`;
        ctx.fill();
      }


      // ── 3. Draw Stars (Batched Draw Paths for Maximum Frame Rate) ──
      // Batch 1: Distant background stars (drawn in single fast path)
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (star.depth !== 1) continue;
        const px = star.baseX + curParallaxX * 4;
        const py = ((star.baseY - scrollOffset * 0.35) % height + height) % height;
        ctx.moveTo(px + star.size, py);
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
      }
      ctx.fill();

      // Batch 2: Midground and foreground stars with organic twinkle
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (star.depth === 1) continue;

        const depthParallaxMultiplier = star.depth === 2 ? 10 : 20;
        const px = star.baseX + curParallaxX * depthParallaxMultiplier;
        const py = ((star.baseY - scrollOffset * (star.depth * 0.35)) % height + height) % height;

        star.phase += dt * star.twinkleSpeed;
        const twinkle = Math.sin(star.phase) * 0.35 + 0.65;
        const currentAlpha = Math.max(0.15, Math.min(1, star.baseAlpha * twinkle));

        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();

        // Subtle specular halo for bright hero stars
        if (star.depth === 3 && currentAlpha > 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      // ── 4. Draw Shooting Stars (Clean Silver-White Meteors) ──
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const meteor = shootingStarsRef.current[i];
        meteor.life++;

        if (meteor.life > meteor.maxLife) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }

        meteor.x += meteor.vx;
        meteor.y += meteor.vy;

        const progress = meteor.life / meteor.maxLife;
        const meteorAlpha = Math.sin(progress * Math.PI) * 0.9;

        const tailX = meteor.x - (meteor.vx / Math.hypot(meteor.vx, meteor.vy)) * meteor.length;
        const tailY = meteor.y - (meteor.vy / Math.hypot(meteor.vx, meteor.vy)) * meteor.length;

        // Clean white-to-transparent tail gradient
        const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.65, 'rgba(224, 242, 254, 0.35)');
        grad.addColorStop(1, `rgba(255, 255, 255, ${meteorAlpha.toFixed(3)})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = meteor.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Brilliant head
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.size * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${meteorAlpha.toFixed(3)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${(meteorAlpha * 0.25).toFixed(3)})`;
        ctx.fill();
      }
    };

    const cleanupIdle = runWhenIdle(() => {
      if (!isMounted || !canvasRef.current) return;
      resize();
      window.addEventListener('resize', resize, { passive: true });
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('click', handleClick);
      document.addEventListener('visibilitychange', handleVisibility);

      if (reduceMotion) {
        render(0);
      } else {
        animRef.current = requestAnimationFrame(render);
      }
    });

    return () => {
      isMounted = false;
      cleanupIdle();
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [initUniverse, spawnShootingStar]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{
        backgroundColor: '#030306', // Pure obsidian deep space
      }}
    >
      {/* ── Subtle Astronomical Coordinate Grid (Faint Matrix) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)',
        }}
      />

      {/* ── Deep Space Atmospheric Nebula (Feathered, zero GPU filter overhead) ── */}
      <div
        className="absolute top-[10%] left-[20%] w-[70vw] h-[60vh] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.14) 0%, rgba(30, 41, 59, 0.04) 45%, transparent 70%)',
        }}
      />

      {/* ── Canvas Starfield & Meteors ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default CosmicSpaceBackground;
