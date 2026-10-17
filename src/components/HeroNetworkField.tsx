'use client';

import { useEffect, useRef } from 'react';
import { runWhenIdle } from '@/lib/idle';

/**
 * HeroNetworkField
 * Canvas 2D node-network background for the Codnite hero.
 * No extra deps (no three.js / r3f) - cheap on bundle size and paint cost.
 *
 * Swap ACCENT_RGB to match your exact Codnite orange.
 */

const ACCENT_RGB = '255, 106, 0'; // <- replace with your brand orange
const CONNECT_DIST = 150;
const MAX_DIST = 150;
const MOUSE_DIST = 150;

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
    let isMounted = true;

    const isMobile = () => window.innerWidth < 768;
    const rgba = (o: number) => `rgba(${ACCENT_RGB}, ${o})`;

    function resize() {
      if (!canvasRef.current) return;
      const c = canvasRef.current;
      const parent = c.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = width * dpr;
      c.height = height * dpr;
      c.style.width = width + 'px';
      c.style.height = height + 'px';
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

      // Draw faint connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx!.beginPath();
            ctx!.strokeStyle = rgba(alpha);
            ctx!.lineWidth = 0.8;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Mouse interactive connections
      if (mouseRef.current.x > 0) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = mouseRef.current.x - nodes[i].x;
          const dy = mouseRef.current.y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_DIST) {
            const alpha = (1 - dist / MOUSE_DIST) * 0.45;
            ctx!.beginPath();
            ctx!.strokeStyle = rgba(alpha);
            ctx!.lineWidth = 1;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx!.stroke();
          }
        }
      }

      // Draw and update animated particles along connections
      for (const p of particles) {
        if (!nodes[p.from] || !nodes[p.to]) continue;
        p.t += p.speed;
        if (p.t >= 1) {
          Object.assign(p, spawnParticle());
          continue;
        }

        const px = nodes[p.from].x + (nodes[p.to].x - nodes[p.from].x) * p.t;
        const py = nodes[p.from].y + (nodes[p.to].y - nodes[p.from].y) * p.t;

        ctx!.beginPath();
        ctx!.fillStyle = rgba(0.85);
        ctx!.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Draw nodes with subtle pulse
      for (const node of nodes) {
        const pulse = Math.sin(time * 0.002 + node.phase) * 0.4 + 0.6;
        ctx!.beginPath();
        ctx!.fillStyle = rgba(0.55 * pulse);
        ctx!.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx!.fill();

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off canvas edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
    }

    function loop(time: number) {
      if (!isMounted) return;
      drawFrame(time);
      raf = requestAnimationFrame(loop);
    }

    function onMouseMove(e: MouseEvent) {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    const cleanupIdle = runWhenIdle(() => {
      if (!isMounted || !canvasRef.current) return;

      resize();
      window.addEventListener('resize', resize);
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);

      if (reduceMotion) {
        drawFrame(0); // static single frame, no RAF loop
      } else {
        raf = requestAnimationFrame(loop);
      }
    });

    return () => {
      isMounted = false;
      cleanupIdle();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', onMouseMove);
        canvasRef.current.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      suppressHydrationWarning
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
