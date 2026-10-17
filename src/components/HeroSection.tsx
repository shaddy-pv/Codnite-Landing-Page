import React, { useState } from 'react';
import AsciiHeroBackground from './AsciiHeroBackground';
import ScrambleText from './ScrambleText';
import { ArrowRight, Trophy } from 'lucide-react';

interface HeroSectionProps {
  isLoaded?: boolean;
}

// Helper for main app URL in dev and prod
const getAppUrl = (path: string = '') => {
  if (typeof window !== 'undefined' && window.location.port === '4173') {
    return `http://localhost:5173/app${path}`;
  }
  return `/app${path}`;
};

// Check if user has an active authenticated session
const getGetStartedUrl = () => {
  if (typeof window === 'undefined') return '/app/?action=signup';
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const hasSession = Boolean(token && user);

  const isDevPort = window.location.port === '4173';
  const baseUrl = isDevPort ? 'http://localhost:5173/app' : '/app';

  return hasSession ? `${baseUrl}/` : `${baseUrl}/?action=signup`;
};

export default function HeroSection({ isLoaded = true }: HeroSectionProps) {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  return (
    <section className="relative min-h-[800px] sm:min-h-[100dvh] overflow-hidden bg-transparent flex flex-col justify-start lg:justify-center">
      {/* Real-Time ASCII Human Brain Canvas - Positioned below CTAs on mobile, right-anchored on desktop */}
      <div className="absolute inset-0 opacity-85 sm:opacity-95 md:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
        <AsciiHeroBackground />
      </div>

      {/* Hero Content anchored on Left Side */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl pt-24 sm:pt-28 lg:pt-20 pb-8 lg:pb-12 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto text-left">

          {/* Main Headline - Stacked Line-by-Line with Responsive Scaling */}
          <h1
            className="relative text-[1.95rem] xs:text-[2.2rem] sm:text-5xl lg:text-6xl xl:text-[3.4rem] 2xl:text-[3.75rem] font-extrabold tracking-tight text-white leading-[1.08] select-none"
          >
            {/* Line 1: Code. -> Solve. */}
            <span
              className="block w-fit h-[1.14em] leading-[1.14em] whitespace-nowrap overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredLine(0)}
              onMouseLeave={() => setHoveredLine(null)}
            >
              <ScrambleText
                text="Code."
                hoverText="Solve."
                isHovered={hoveredLine === 0}
                ready={isLoaded}
                delay={100}
              />
            </span>

            {/* Line 2: Connect. -> Learn. */}
            <span
              className="block w-fit h-[1.14em] leading-[1.14em] whitespace-nowrap overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredLine(1)}
              onMouseLeave={() => setHoveredLine(null)}
            >
              <ScrambleText
                text="Connect."
                hoverText="Learn."
                isHovered={hoveredLine === 1}
                ready={isLoaded}
                delay={220}
              />
            </span>

            {/* Line 3: Compete. -> Lead. */}
            <span
              className="block w-fit h-[1.14em] leading-[1.14em] whitespace-nowrap overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredLine(2)}
              onMouseLeave={() => setHoveredLine(null)}
            >
              <ScrambleText
                text="Compete."
                hoverText="Lead."
                isHovered={hoveredLine === 2}
                ready={isLoaded}
                delay={340}
              />
            </span>

            {/* Line 4: Climb the Rank. -> And Get Placed. */}
            <span
              className="block w-fit h-[1.14em] leading-[1.14em] whitespace-nowrap overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredLine(3)}
              onMouseLeave={() => setHoveredLine(null)}
            >
              <ScrambleText
                text="Climb the Rank."
                hoverText="And Get Placed."
                isHovered={hoveredLine === 3}
                ready={isLoaded}
                delay={460}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] via-[#FFA229] to-[#FFD060]"
              />
            </span>
          </h1>

          {/* Description - Constrained strictly with drop shadow for supreme legibility on mobile */}
          <p className="mt-4 sm:mt-5 max-w-[440px] text-sm sm:text-base text-zinc-300/90 leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            Battle in live 1v1 algorithmic duels, tackle placement challenges, and climb campus rankings. Connect through active developer feeds, peer messaging, and tournament arenas.
          </p>

          {/* Action CTAs - Side-by-side on mobile, same row on tablet/desktop */}
          <div className="mt-7 sm:mt-8 flex flex-row items-stretch gap-3 w-full sm:w-auto max-w-xs sm:max-w-none">
            <a
              href={getGetStartedUrl()}
              onClick={(e) => {
                e.preventDefault();
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
                const hasSession = Boolean(token && user);

                const isDevPort = typeof window !== 'undefined' && window.location.port === '4173';
                const baseUrl = isDevPort ? 'http://localhost:5173/app' : '/app';

                window.location.href = hasSession ? `${baseUrl}/` : `${baseUrl}/?action=signup`;
              }}
              className="group relative flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#FFA229] px-5 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-[15px] font-bold text-black transition-all duration-200 hover:from-[#ff7919] hover:to-[#ffb24d] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_16px_-2px_rgba(255,106,0,0.35)] text-center select-none cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </a>
            <button
              onClick={() => {
                if ((window as any).lenis) {
                  (window as any).lenis.scrollTo('#hall-of-fame');
                } else {
                  document.getElementById('hall-of-fame')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-[#0d0d12]/80 px-5 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-[15px] font-semibold text-zinc-200 backdrop-blur-md transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-white hover:-translate-y-0.5 text-center select-none"
            >
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Leaderboard</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
