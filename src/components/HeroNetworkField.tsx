'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroNetworkField
 * Canvas 2D node-network background for the Codnite hero.
 * No extra deps (no three.js / r3f) — cheap on bundle size and paint cost.
 *
 * Swap ACCENT_RGB to match your exact Codnite orange.
 */

const ACCENT_RGB = '255, 106, 0'; // <- replace with your brand orange
const CONNECT_DIST = 150;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
}

interface Particle {
  from: number;
  to: number;
  t: number;
  speed: number;
}

export default function HeroNetworkField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let particles: Particle[] = [];
    let raf = 0;

    const isMobile = () => window.innerWidth < 768;
    const rgba = (o: number) => `rgba(${ACCENT_RGB}, ${o})`;

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + 'px';
      canvas!.style.height = height + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function spawnParticle(): Particle {
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      if (to === from) to = (to + 1) % nodes.length;
      return { from, to, t: 0, speed: 0.004 + Math.random() * 0.006 };
    }

    function seed() {
      const count = isMobile() ? 22 : 55;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: 1.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      }));
      particles = Array.from({ length: isMobile() ? 6 : 14 }, spawnParticle);
    }

    function drawFrame(time: number) {
      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          const dx = mouseRef.current.x - n.x;
          const dy = mouseRef.current.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            n.x -= dx * 0.0015;
            n.y -= dy * 0.0015;
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < CONNECT_DIST) {
            const o = (1 - dist / CONNECT_DIST) * 0.35;
            ctx!.strokeStyle = rgba(o);
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pulse = reduceMotion
          ? 0.6
          : 0.5 + Math.sin(time * 0.002 + n.phase) * 0.5;
        const r = n.radius + pulse * 1.2;
        const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grad.addColorStop(0, rgba(0.5 * pulse + 0.2));
        grad.addColorStop(1, rgba(0));
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = rgba(0.9);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduceMotion) {
        for (const p of particles) {
          p.t += p.speed;
          if (p.t >= 1) Object.assign(p, spawnParticle());
          const a = nodes[p.from];
          const b = nodes[p.to];
          if (!a || !b) continue;
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          ctx!.fillStyle = rgba(0.9);
          ctx!.beginPath();
          ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function loop(time: number) {
      drawFrame(time);
      if (!reduceMotion) raf = requestAnimationFrame(loop);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function onMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    if (reduceMotion) {
      drawFrame(0); // static single frame, no RAF loop
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
