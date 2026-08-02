'use client';

import { CSSProperties, useEffect, useRef } from 'react';
import HeroNetworkField from './HeroNetworkField';
import FloatingStatCard from './FloatingStatCard';

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function onMove(e: MouseEvent) {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    }

    function tick() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      el!.style.setProperty('--px', currentX.toFixed(3));
      el!.style.setProperty('--py', currentY.toFixed(3));
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const parallaxStyle = { '--px': 0, '--py': 0 } as CSSProperties;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0c]">
      <HeroNetworkField />

      {/* subtle vignette so text stays readable over the network */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0c_75%)]" />

      <div
        ref={parallaxRef}
        style={parallaxStyle}
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center"
      >
        <span className="mb-4 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-medium tracking-wide text-orange-400">
          Built for AKTU &amp; Tier-2 Colleges
        </span>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Compete. Code. <span className="text-orange-500">Climb the Rank.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/60 sm:text-lg">
          1v1 coding battles, college leaderboards, and placement-focused
          problems — built for students who actually want to get better.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400">
            Start Battling
          </button>
          <button className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white">
            View Leaderboard
          </button>
        </div>

        {/* Floating cards — desktop only, layered above the vignette */}
        <div
          className="pointer-events-none absolute left-[6%] top-[22%] hidden lg:block"
          style={{
            transform:
              'translate3d(calc(var(--px, 0) * -14px), calc(var(--py, 0) * -10px), 0)',
          }}
        >
          <FloatingStatCard delay={0} duration={6.5}>
            <p className="text-xs text-white/50">Battle Won</p>
            <p className="text-sm font-semibold text-orange-400">+25 XP</p>
          </FloatingStatCard>
        </div>

        <div
          className="pointer-events-none absolute right-[8%] top-[30%] hidden lg:block"
          style={{
            transform:
              'translate3d(calc(var(--px, 0) * 16px), calc(var(--py, 0) * -12px), 0)',
          }}
        >
          <FloatingStatCard delay={1.2} duration={7}>
            <p className="text-xs text-white/50">College Rank</p>
            <p className="text-sm font-semibold text-white">#3</p>
          </FloatingStatCard>
        </div>

        <div
          className="pointer-events-none absolute bottom-[18%] left-[10%] hidden lg:block"
          style={{
            transform:
              'translate3d(calc(var(--px, 0) * -10px), calc(var(--py, 0) * 14px), 0)',
          }}
        >
          <FloatingStatCard delay={2.1} duration={6}>
            <p className="text-xs text-white/50">Rahul joined</p>
            <p className="text-sm font-semibold text-white">Live now</p>
          </FloatingStatCard>
        </div>

        <div
          className="pointer-events-none absolute bottom-[14%] right-[6%] hidden lg:block"
          style={{
            transform:
              'translate3d(calc(var(--px, 0) * 12px), calc(var(--py, 0) * 10px), 0)',
          }}
        >
          <FloatingStatCard delay={0.6} duration={7.5}>
            <p className="text-xs text-white/50">Problems Solved</p>
            <p className="text-sm font-semibold text-orange-400">1,000+</p>
          </FloatingStatCard>
        </div>
      </div>
    </section>
  );
}
