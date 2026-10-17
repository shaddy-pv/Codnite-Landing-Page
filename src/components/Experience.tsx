import React, { useRef, useEffect, useState } from 'react';
import {
  UserPlus,
  School,
  Code2,
  Award,
  ArrowRight,
  Check,
  Search,
  Flame,
  Zap,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  // Helper to calculate exact translation needed to place Card at dead center
  const getCardCenterTranslation = (index: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = track.querySelectorAll('.station-panel');
    if (!cards[index]) return 0;

    const card = cards[index] as HTMLElement;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const viewportCenter = window.innerWidth / 2;
    return -(cardCenter - viewportCenter);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    // Small delay to ensure all DOM dimensions and fonts are computed
    const timer = setTimeout(() => {
      const targetCard4X = getCardCenterTranslation(3);
      const totalTravel = Math.abs(targetCard4X);
      if (totalTravel === 0) return;

      const ctx = gsap.context(() => {
        const tween = gsap.to(track, {
          x: () => getCardCenterTranslation(3),
          ease: 'none',
          id: 'how-it-works-tween',
          scrollTrigger: {
            id: 'how-it-works-st',
            trigger: wrap,
            start: 'top top',
            end: () => `+=${Math.abs(getCardCenterTranslation(3))}`,
            pin: true,
            scrub: 0.3,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.progress >= 0.95) {
                setActiveStationIndex(3);
                return;
              }

              const cards = track.querySelectorAll('.station-panel');
              const currentX = gsap.getProperty(track, 'x') as number;
              const viewportCenter = window.innerWidth / 2;

              let closestIdx = 0;
              let closestDist = Infinity;

              cards.forEach((c, idx) => {
                const el = c as HTMLElement;
                const centerOnScreen = el.offsetLeft + el.offsetWidth / 2 + currentX;
                const dist = Math.abs(centerOnScreen - viewportCenter);
                if (dist < closestDist) {
                  closestDist = dist;
                  closestIdx = idx;
                }
              });

              setActiveStationIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
            },
          },
        });
        scrollTriggerRef.current = tween.scrollTrigger ?? null;
      }, wrap);

      return () => ctx.revert();
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const scrollToStation = (index: number) => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    const cards = track.querySelectorAll('.station-panel');
    if (!cards[index]) return;

    // 1. Immediately slide track to the targeted card
    const targetX = getCardCenterTranslation(index);
    setActiveStationIndex(index);

    gsap.to(track, {
      x: targetX,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // 2. Calculate exact page scroll offset using ScrollTrigger bounds (never jumps to top/hero)
    const maxTravel = Math.abs(getCardCenterTranslation(3));
    const travelFraction = maxTravel > 0 ? Math.min(1, Math.abs(targetX) / maxTravel) : 0;

    const st = scrollTriggerRef.current || ScrollTrigger.getById('how-it-works-st');

    let targetScroll: number;
    if (st && typeof st.start === 'number' && typeof st.end === 'number') {
      targetScroll = st.start + travelFraction * (st.end - st.start);
    } else {
      const pinSpacer = wrap.parentElement?.classList.contains('pin-spacer')
        ? wrap.parentElement
        : wrap;
      const rect = pinSpacer.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      targetScroll = absoluteTop + travelFraction * maxTravel;
    }

    // 3. Smoothly sync window scroll
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetScroll, {
        duration: 0.6,
        lock: false,
      });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="how-it-works"
      ref={wrapRef}
      className="relative bg-[#070709] border-y border-zinc-800/80 overflow-hidden select-none"
    >
      {/* Precision Technical Grid Background (Matte, No Neon Glow) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(#3f3f46 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '24px 24px, 120px 120px',
        }}
      />

      {/* Pinned 100dvh Viewport Shell with Navbar Clearance */}
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-between pt-20 sm:pt-24 pb-4 overflow-hidden z-20">
        
        {/* Clean, Uncluttered Section Header: ONLY "How it works" */}
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800/80 pb-4 shrink-0">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              <span>How it </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                works
              </span>
            </h2>
          </div>

          {/* Tactical Jump Buttons */}
          <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-end">
            {[
              { id: '01', label: 'SIGN UP' },
              { id: '02', label: 'COLLEGE' },
              { id: '03', label: 'PRACTICE & DUEL' },
              { id: '04', label: 'RANKS & BADGES' },
            ].map((st, i) => (
              <button
                key={st.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToStation(i);
                }}
                className={`px-3 py-1.5 font-mono text-xs border transition-all cursor-pointer ${
                  activeStationIndex === i
                    ? 'bg-orange-500 text-black font-bold border-orange-500 shadow-sm'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                }`}
              >
                <span>{st.id}</span>
                <span className="hidden md:inline ml-1.5">{st.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Continuous Scrolling Track */}
        <div
          ref={trackRef}
          className="flex flex-1 items-center will-change-transform my-auto py-2 gap-8 sm:gap-12"
          style={{
            // Card 1 starts centered
            paddingLeft: 'max(20px, calc(50vw - 310px))',
          }}
        >
          {/* ── STEP 01: [QUICK SIGN UP] ── */}
          <div className="station-panel shrink-0 w-[90vw] sm:w-[580px] lg:w-[620px]">
            <div className="rounded-2xl border border-zinc-800 bg-[#0c0c10] p-6 sm:p-8 flex flex-col justify-between h-[430px] sm:h-[450px] relative shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 font-mono text-xs">
                <span className="text-orange-400 font-bold flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-orange-500" />
                  STEP 01 // QUICK ACCOUNT SETUP
                </span>
                <span className="text-zinc-500">~30 seconds</span>
              </div>

              {/* Airy Content Body */}
              <div className="my-auto space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                    Create Your Developer Profile
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Instant sign in with GitHub, Google, or student email. Pick your coding languages and jump straight into matches.
                  </p>
                </div>

                {/* Spacious Auth UI Preview */}
                <div className="rounded-xl bg-black/60 border border-zinc-800/80 p-5 space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="py-3 px-4 rounded-lg border border-zinc-800 bg-zinc-900/60 flex items-center justify-center gap-2.5 text-zinc-200">
                      <span className="w-4 h-4 rounded-full bg-white text-black font-bold flex items-center justify-center text-[10px]">
                        G
                      </span>
                      <span className="text-xs font-sans font-medium">Google Sign In</span>
                    </div>

                    <div className="py-3 px-4 rounded-lg border border-zinc-800 bg-zinc-900/60 flex items-center justify-center gap-2.5 text-zinc-200">
                      <span className="w-4 h-4 bg-zinc-700 text-white font-bold flex items-center justify-center text-[10px] rounded-full">
                        git
                      </span>
                      <span className="text-xs font-sans font-medium">GitHub OAuth</span>
                    </div>
                  </div>

                  {/* Preferred Language Chips */}
                  <div>
                    <span className="text-[11px] text-zinc-500 uppercase tracking-wider block mb-2.5">
                      SUPPORTED DUEL LANGUAGES:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['C++20', 'Python 3', 'Java 21', 'TypeScript'].map((lang, idx) => (
                        <span
                          key={lang}
                          className={`px-3 py-1.5 text-xs rounded-md border ${
                            idx === 0 || idx === 1
                              ? 'border-orange-500/40 bg-orange-500/10 text-orange-300 font-bold'
                              : 'border-zinc-800 bg-zinc-900/50 text-zinc-400'
                          }`}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── STEP 02: [SELECT COLLEGE] ── */}
          <div className="station-panel shrink-0 w-[90vw] sm:w-[580px] lg:w-[620px]">
            <div className="rounded-2xl border border-zinc-800 bg-[#0c0c10] p-6 sm:p-8 flex flex-col justify-between h-[430px] sm:h-[450px] relative shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 font-mono text-xs">
                <span className="text-orange-400 font-bold flex items-center gap-2">
                  <School className="w-4 h-4 text-orange-500" />
                  STEP 02 // UNIVERSITY HUB
                </span>
                <span className="text-zinc-500">Campus Community</span>
              </div>

              <div className="my-auto space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                    Find & Link Your College Chapter
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Search for your university to connect with campus peers, practice together, and represent your college on the leaderboard.
                  </p>
                </div>

                {/* College Directory Search Preview */}
                <div className="rounded-xl bg-black/60 border border-zinc-800/80 p-5 space-y-3.5 font-mono text-xs">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-400">
                    <Search className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="text-zinc-300">Search your university or campus...</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1 font-sans text-xs">
                    <div className="p-3.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80 space-y-1">
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                        Campus Leaderboard
                      </span>
                      <span className="text-zinc-400 text-[11px] block leading-relaxed">
                        Climb internal college rankings and lead your batch.
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80 space-y-1">
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        College Tournaments
                      </span>
                      <span className="text-zinc-400 text-[11px] block leading-relaxed">
                        Represent your university in live coding clashes.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── STEP 03: [SOLVE & DUEL 1V1] ── */}
          <div className="station-panel shrink-0 w-[90vw] sm:w-[580px] lg:w-[620px]">
            <div className="rounded-2xl border border-zinc-800 bg-[#0c0c10] p-6 sm:p-8 flex flex-col justify-between h-[430px] sm:h-[450px] relative shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 font-mono text-xs">
                <span className="text-orange-400 font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-orange-500" />
                  STEP 03 // DSA PRACTICE & 1V1 DUELS
                </span>
                <span className="text-zinc-500">Real-time Judge</span>
              </div>

              <div className="my-auto space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                    1,200+ Native Problems or Battle 1v1
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Solve from 1,200+ in-house native algorithmic & DSA challenges with automated test execution, or enter live head-to-head 1v1 duels against peer coders.
                  </p>
                </div>

                {/* Problem & Test Runner Preview */}
                <div className="rounded-xl bg-black/60 border border-zinc-800/80 p-5 space-y-3.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-white font-bold text-sm">Two Sum</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                        EASY
                      </span>
                    </div>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5 text-xs">
                      <Check className="w-3.5 h-3.5" />
                      3 / 3 Passed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between">
                      <span className="text-zinc-500 text-[11px]">Runtime</span>
                      <span className="text-white font-bold text-xs">1.1ms <span className="text-emerald-400 font-normal text-[10px]">(Top 96%)</span></span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between">
                      <span className="text-zinc-500 text-[11px]">Memory</span>
                      <span className="text-white font-bold text-xs">10.4 MB</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center text-xs text-orange-300 font-medium">
                    <Zap className="w-4 h-4 text-orange-400 mr-2.5 shrink-0" />
                    <span>1v1 Duel Arena: Live timer, identical problems, fastest clean code wins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── STEP 04: [RANKS & BADGES] ── */}
          <div className="station-panel shrink-0 w-[90vw] sm:w-[580px] lg:w-[620px]">
            <div className="rounded-2xl border border-zinc-800 bg-[#0c0c10] p-6 sm:p-8 flex flex-col justify-between h-[430px] sm:h-[450px] relative shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 font-mono text-xs">
                <span className="text-orange-400 font-bold flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-500" />
                  STEP 04 // RECOGNITION & BADGES
                </span>
                <span className="text-zinc-500">Progression</span>
              </div>

              <div className="my-auto space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                    Earn XP, Badges & Campus Glory
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Earn points for every clean solve and duel victory. Maintain daily streaks, unlock achievement badges, and climb campus leaderboards.
                  </p>
                </div>

                {/* Profile Progression UI Preview */}
                <div className="rounded-xl bg-black/60 border border-zinc-800/80 p-5 space-y-3.5 font-mono text-xs">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 border border-zinc-800 bg-zinc-900/60 rounded-lg">
                      <span className="text-[10px] text-zinc-500 block uppercase">TOTAL POINTS</span>
                      <span className="text-base font-bold text-white">840 XP</span>
                    </div>
                    <div className="p-2.5 border border-zinc-800 bg-zinc-900/60 rounded-lg">
                      <span className="text-[10px] text-zinc-500 block uppercase">DAILY STREAK</span>
                      <span className="text-base font-bold text-orange-400 flex items-center justify-center gap-1">
                        <Flame className="w-3.5 h-3.5" /> 7 Days
                      </span>
                    </div>
                    <div className="p-2.5 border border-zinc-800 bg-zinc-900/60 rounded-lg">
                      <span className="text-[10px] text-zinc-500 block uppercase">TIER LEVEL</span>
                      <span className="text-base font-bold text-emerald-400">Level 3</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs font-sans">
                    <div className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 flex items-center gap-2.5">
                      <span className="text-lg">⚔️</span>
                      <div>
                        <span className="text-white font-bold block text-xs">First Blood</span>
                        <span className="text-zinc-400 text-[10px]">Won first 1v1 duel</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 flex items-center gap-2.5">
                      <span className="text-lg">🔥</span>
                      <div>
                        <span className="text-white font-bold block text-xs">Streak Master</span>
                        <span className="text-zinc-400 text-[10px]">7 consecutive days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="/app"
                  className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors uppercase tracking-wider shadow-lg"
                >
                  <span>Start Your First Duel (Free)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Explicit Physical Spacer so Card 4 has room to center cleanly without flex clipping */}
          <div
            className="shrink-0"
            style={{
              width: 'max(40px, calc(50vw - 310px))',
            }}
          />
        </div>

        {/* Bottom Precision Progress Ruler */}
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between border-t border-zinc-800/80 pt-3 font-mono text-xs text-zinc-500 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 font-bold">
              STEP 0{activeStationIndex + 1} // 04
            </span>
            <span className="hidden sm:inline text-zinc-600">
              [ | · · · · | · · · · | · · · · | ]
            </span>
          </div>

          <div className="w-32 sm:w-64 h-1 bg-zinc-800 rounded-none overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-150"
              style={{ width: `${((activeStationIndex + 1) / 4) * 100}%` }}
            />
          </div>

          <span className="text-orange-400 font-bold">
            {Math.round(((activeStationIndex + 1) / 4) * 100)}% COMPLETE
          </span>
        </div>
      </div>
    </section>
  );
};

export default Experience;
