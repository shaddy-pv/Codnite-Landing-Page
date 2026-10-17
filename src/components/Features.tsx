import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  AudioWaveform,
  Terminal,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Code2,
  Flame,
  Award,
  Radio,
  Layers,
  Volume2,
  Check,
  Coffee,
  Users,
  Mic,
  Swords,
  Trophy,
  Briefcase,
} from 'lucide-react';

interface FolderData {
  id: string;
  tabNumber: string;
  tabLabel: string;
  shortLabel: string;
  badge: string;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  accentText: string;
  icon: React.ElementType;
  headline: string;
  summary: string;
  appRoute?: string;
  specs: {
    title: string;
    desc: string;
  }[];
  showcase: {
    title: string;
    subtitle: string;
    tag: string;
    details: React.ReactNode;
  };
}

// Helper to reliably navigate to the main web app in both local dev (port 4173 -> 5173) and production (/app/*)
const getFeatureAppUrl = (route: string = '') => {
  if (typeof window !== 'undefined' && window.location.port === '4173') {
    return `http://localhost:5173/app${route}`;
  }
  return `/app${route}`;
};

export const Features: React.FC = () => {
  const [activeFolderId, setActiveFolderId] = useState('duels');
  const [hoveredFolderId, setHoveredFolderId] = useState<string | null>(null);

  const folders: FolderData[] = [
    {
      id: 'duels',
      tabNumber: '01',
      tabLabel: '1V1 DUEL ARENA',
      shortLabel: '1V1 DUELS',
      badge: 'ARENA BATTLE MODES',
      accentColor: '#FF6A00',
      accentBorder: 'border-orange-500',
      accentBg: 'bg-orange-500/10',
      accentText: 'text-orange-400',
      icon: Zap,
      headline: 'Project-Based & Problem-Based Battles',
      summary:
        'Challenge any developer worldwide in live 1v1 duels, represent your campus in college tournaments, and compete in DSA and real-world project battles with instant automated verification.',
      appRoute: '/battles',
      specs: [
        {
          title: '1v1 Challenge: Friends & Developers',
          desc: 'Invite friends via duel link or get matched instantly against developers globally in real-time coding combat.',
        },
        {
          title: 'College vs College Battles',
          desc: 'Represent your university in collegiate tournaments, clan rivalries, and institutional leaderboard clashes.',
        },
        {
          title: 'Project-Based & Problem-Based Battles',
          desc: 'Compete in algorithmic DSA challenges or build real-world projects with live automated evaluation.',
        },
      ],
      showcase: {
        title: 'Ranked 1v1 Battle HUD',
        subtitle: 'Live synchronized match viewport',
        tag: 'DUEL MODE',
        details: (
          <div className="space-y-3 font-mono text-xs">
            {/* Match Header */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-bold">Two Sum</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-bold">
                  EASY
                </span>
              </div>
              <span className="text-orange-400 font-bold">04:18 REMAINING</span>
            </div>

            {/* Duelists Head-to-Head */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/30 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white font-bold">YOU (alex_dev)</span>
                  <span className="text-emerald-400 font-bold">12 / 12 ✓</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-full" />
                </div>
                <span className="text-[10px] text-zinc-400 block">Status: Submitted in 2m 14s</span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-300">OPPONENT</span>
                  <span className="text-amber-400">9 / 12 ...</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-600 w-3/4" />
                </div>
                <span className="text-[10px] text-zinc-500 block">Status: Compiling test case #10</span>
              </div>
            </div>

            {/* Victory Badge */}
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Match Verified: Victory
              </span>
              <span className="text-zinc-400 text-[10px]">Faster submission wins</span>
            </div>

            {/* Battle Mode Selector */}
            <div className="rounded-lg border border-zinc-800 bg-black/40 overflow-hidden">
              <div className="px-3 py-2 border-b border-zinc-800/80">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Choose Battle Mode</span>
              </div>
              <div className="p-2 space-y-2">
                {/* Mode 1: DSA Problem */}
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <Terminal className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white font-bold text-[11px]">DSA Problem Battle</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 font-bold shrink-0">ACTIVE</span>
                    </div>
                    <span className="text-zinc-400 text-[10px]">Algorithmic challenge · Auto-judged · Faster solution wins</span>
                  </div>
                </div>
                {/* Mode 2: Project Build */}
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <Code2 className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <span className="text-zinc-300 font-bold text-[11px] block">Project Build Battle</span>
                    <span className="text-zinc-500 text-[10px]">Real-world project · GitHub repo submission · Panel judged</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ),
      },
    },
    {
      id: 'voice',
      tabNumber: '02',
      tabLabel: 'CAMPUS LIVING ROOM',
      shortLabel: 'LIVING ROOM',
      badge: 'CAMPUS HANGOUT',
      accentColor: '#38BDF8',
      accentBorder: 'border-sky-500',
      accentBg: 'bg-sky-500/10',
      accentText: 'text-sky-400',
      icon: Coffee,
      headline: 'Virtual Living Room for Your College',
      summary:
        'Hang out with verified college peers in an exclusive virtual room. Talk over live voice, collaborate on DSA problems, and challenge friends to a coding duel right from the couch.',
      appRoute: '/communities',
      specs: [
        {
          title: 'College-Exclusive Student Hub',
          desc: 'Connect with verified classmates from your university in a safe, focused environment.',
        },
        {
          title: 'Drop-In Live Voice & Doubt Solving',
          desc: 'Hop onto virtual couches, unmute, and discuss algorithmic problems or placement interview concepts.',
        },
        {
          title: 'Instant 1v1 Battle Invites',
          desc: 'Spot Battle Ready friends in the room and challenge them to a live coding duel with one click.',
        },
      ],
      showcase: {
        title: 'Campus Living Room HUD',
        subtitle: 'Live student presence & voice lounge',
        tag: 'COLLEGE SPACE',
        details: (
          <div className="space-y-3 font-mono text-xs">
            {/* Lounge Header */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-zinc-800">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-sky-400" />
                <span className="text-white font-bold">United College Living Room</span>
              </div>
              <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>12 ONLINE</span>
              </span>
            </div>

            {/* Room Occupants on Couches/Desks */}
            <div className="space-y-2">
              {/* Occupant 1: You */}
              <div className="p-2.5 rounded-lg bg-sky-500/5 border border-sky-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-300 font-bold flex items-center justify-center text-xs border border-sky-400/40">
                    U
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-bold text-xs">You (Shadan)</span>
                      <span className="text-[10px] text-zinc-500">· Final Year</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">🛋️ Chilling on Couch</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-400">
                  <Mic className="w-3 h-3 text-emerald-400" />
                  <span>Mic Active</span>
                </div>
              </div>

              {/* Occupant 2: Peer Battle Ready */}
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-300 font-bold flex items-center justify-center text-xs border border-orange-500/40">
                    S
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-200 font-bold text-xs">Shivam K.</span>
                      <span className="text-[10px] text-orange-400 font-semibold bg-orange-500/10 px-1 rounded">⚔️ Ready</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">💻 Solving Graph DSA</span>
                  </div>
                </div>
                <a
                  href="/app/battles?create=true"
                  className="px-2.5 py-1 rounded-md bg-orange-500 hover:bg-orange-400 text-black text-[11px] font-bold flex items-center gap-1 transition-colors"
                >
                  <Swords className="w-3 h-3" />
                  <span>Duel</span>
                </a>
              </div>

              {/* Occupant 3: Peer Speaking */}
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs border border-emerald-500/40">
                    R
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-200 font-bold text-xs">Rohan M.</span>
                      <span className="text-[10px] text-emerald-400 animate-pulse">🔊 Speaking</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">☕ Coffee Station</span>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">CSE '26</span>
              </div>
            </div>

            {/* Bottom Status Pill */}
            <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-between text-[11px] text-sky-300">
              <span className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-sky-400" />
                <span>Voice Connected: United College Campus Server</span>
              </span>
              <span className="text-white font-bold">Zero Delay</span>
            </div>
          </div>
        ),
      },
    },
    {
      id: 'dsa',
      tabNumber: '03',
      tabLabel: 'DSA & ASSESSMENTS',
      shortLabel: 'DSA & TESTS',
      badge: 'SKILL & CRITICAL THINKING',
      accentColor: '#10B981',
      accentBorder: 'border-emerald-500',
      accentBg: 'bg-emerald-500/10',
      accentText: 'text-emerald-400',
      icon: Terminal,
      headline: 'Solve DSA Problems & Build Critical Thinking Through Assessments',
      summary:
        'Master algorithmic patterns across Arrays, Trees, DP, and Graphs. Build problem-solving skills and validate your readiness with timed, company-style assessments judged instantly against edge cases.',
      appRoute: '/problems',
      specs: [
        {
          title: 'Curated Problem Bank: Basics to Advanced',
          desc: 'Structured progressions covering high-frequency interview patterns from top product companies.',
        },
        {
          title: 'Timed Skill & Mock Assessments',
          desc: 'Simulate corporate recruitment rounds evaluating algorithmic precision, speed, and critical thinking under pressure.',
        },
        {
          title: 'Instant Automated Judge & Telemetry',
          desc: 'Sandboxed execution supporting C++20, Python 3, Java 21, and TypeScript with runtime and memory percentiles.',
        },
      ],
      showcase: {
        title: 'Timed Assessment Telemetry',
        subtitle: 'Automated test suite & scoring engine',
        tag: 'SKILL EVALUATION',
        details: (
          <div className="space-y-3 font-mono text-xs">
            {/* Header */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-zinc-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-bold">Assessment #04: Graph & Tree Traversal</span>
              </div>
              <span className="text-zinc-400">Language: C++20 Clang</span>
            </div>

            {/* Score & Skill Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/30">
                <span className="text-[10px] text-zinc-400 block">Assessment Score</span>
                <span className="text-emerald-400 font-bold text-sm">100 / 100</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Critical Thinking</span>
                <span className="text-white font-bold text-sm">98.4 Percentile</span>
              </div>
            </div>

            {/* Test Matrix */}
            <div className="p-3 rounded-lg bg-black/80 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-2 text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Case #1: Primary Tree Traversal
                </span>
                <span className="text-emerald-400 font-bold">Passed • 0.2ms</span>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-2 text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Case #2: Cyclic & Disjoint Components
                </span>
                <span className="text-emerald-400 font-bold">Passed • 0.4ms</span>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-2 text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Case #3: 10,000 Heavy Scale Vectors
                </span>
                <span className="text-emerald-400 font-bold">Passed • 0.7ms</span>
              </div>
            </div>

            {/* Performance Metric */}
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
              <span className="font-bold">STATUS: ALL TEST CASES PASSED</span>
              <span className="text-white font-bold">Faster than 98.4% of submissions</span>
            </div>
          </div>
        ),
      },
    },
    {
      id: 'hubs',
      tabNumber: '04',
      tabLabel: 'CAMPUS HUBS & PORTAL',
      shortLabel: 'CAMPUS HUBS',
      badge: 'COLLEGE PORTAL & ADMIN',
      accentColor: '#F59E0B',
      accentBorder: 'border-amber-500',
      accentBg: 'bg-amber-500/10',
      accentText: 'text-amber-400',
      icon: GraduationCap,
      headline: 'Campus Chapters, Hackathons & Organizer Studios',
      summary:
        'Join your college chapter with your registered email or compete as an independent developer. Community leads, clubs, and faculty get dedicated Organizer and Judge studios to host hackathons, rate student submissions with 1-to-5 stars, and track performance.',
      appRoute: '/communities',
      specs: [
        {
          title: 'Campus Chapters & Student Hubs',
          desc: 'Join your university chapter with any registered email and compete on internal batch and university leaderboards.',
        },
        {
          title: 'Campus Hackathons & Custom Contests',
          desc: 'Create hackathon-level challenges with dedicated Organizer and Judge dashboards to evaluate code and award badges.',
        },
        {
          title: '1-to-5 Star Student & Peer Ratings',
          desc: 'Admins, judges, and duelists can rate students across battles, challenges, and hackathon project quality.',
        },
      ],
      showcase: {
        title: 'College Assessment Studio',
        subtitle: 'Custom test & cohort deployment engine',
        tag: 'COLLEGE STUDIO',
        details: (
          <div className="space-y-3 font-mono text-xs">
            {/* Header: Institution & Chapter status */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-zinc-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-white font-bold">Campus Assessment Studio</span>
              </div>
              <span className="text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 whitespace-nowrap shrink-0">
                FACULTY / LEAD
              </span>
            </div>

            {/* Target Cohort Selector Pills */}
            <div className="p-2.5 rounded-lg bg-black/40 border border-zinc-800 space-y-1.5">
              <span className="text-[10px] text-zinc-400 block font-bold uppercase tracking-wider">
                Target Student Cohort
              </span>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="px-2 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold whitespace-nowrap">
                  Year 3
                </span>
                <span className="px-2 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold whitespace-nowrap">
                  CSE & IT
                </span>
                <span className="px-2 py-1 rounded-md bg-amber-500/25 text-white border border-amber-500/50 font-bold flex items-center gap-1 whitespace-nowrap">
                  <span>Section B</span>
                  <Check className="w-3 h-3 text-amber-400" />
                </span>
              </div>
            </div>

            {/* Assessment Blueprint & Rules */}
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1.5">
                <span className="text-white font-bold text-xs truncate">Mid-Term DSA Assessment</span>
                <span className="text-amber-400 font-bold text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 shrink-0">
                  90 MINS
                </span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Problem Pool</span>
                  <span className="text-white font-semibold">3 Tasks (Trees, DP, Graph)</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Evaluation</span>
                  <span className="text-emerald-400 font-bold">Automated Sandbox Judge</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Anti-Cheat</span>
                  <span className="text-emerald-400 font-bold">Tab-Lock Active</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Compilers</span>
                  <span className="text-zinc-300">C++, Python, Java, TS</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-0.5">
              <a
                href={getFeatureAppUrl('/communities')}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <span>Deploy Assessment to Section B</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1">
                <span>Target: 64 Students Enrolled</span>
                <button
                  type="button"
                  className="text-amber-400 hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer"
                >
                  Copy Access Link →
                </button>
              </div>
            </div>
          </div>
        ),
      },
    },
    {
      id: 'placements',
      tabNumber: '05',
      tabLabel: 'PLACEMENT SEASONS',
      shortLabel: 'PLACEMENTS',
      badge: '4-MONTH HIRING PIPELINE',
      accentColor: '#8B5CF6',
      accentBorder: 'border-purple-500',
      accentBg: 'bg-purple-500/10',
      accentText: 'text-purple-400',
      icon: Trophy,
      headline: '3 Annual Seasons: Climb Leaderboards & Get Placed',
      summary:
        'Compete in three 4-month seasons per year. The top 20 coders each season earn direct placement opportunities, fast-track interviews, and verified hiring partner referrals.',
      appRoute: '/leaderboard',
      specs: [
        {
          title: 'Three 4-Month Seasons Every Year',
          desc: 'Spring, Summer, and Fall cycles aligned directly with corporate campus placement calendars.',
        },
        {
          title: 'Top 20 Placement Fast-Track',
          desc: 'Top rankers skip ATS screening and receive direct interview shortlists from partnered tech recruiters.',
        },
        {
          title: 'Verified Skill & Battle Portfolio',
          desc: 'Showcase your battle rating, assessment scores, and seasonal rank as verifiable proof of real coding competence.',
        },
      ],
      showcase: {
        title: 'Annual Placement Calendar',
        subtitle: '3 seasonal cycles & partner interview pipeline',
        tag: 'ANNUAL ROADMAP',
        details: (
          <div className="space-y-2 font-mono text-xs">
            {/* Header: 3-Season Cycle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-zinc-800">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-white font-bold">3 Seasonal Hiring Cycles</span>
              </div>
              <span className="text-purple-400 font-bold text-[10px] px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 whitespace-nowrap shrink-0">
                ANNUAL CALENDAR
              </span>
            </div>

            {/* Season 01: Active Season */}
            <div className="p-2.5 rounded-lg bg-purple-500/15 border border-purple-500/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-white font-bold text-xs">Season 01: Spring Drive</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 whitespace-nowrap shrink-0">
                  CURRENT ACTIVE
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-300 pt-1 border-t border-purple-500/20">
                <span className="text-zinc-400 text-[10px]">Jan 01 – Apr 30 (4 Months)</span>
                <span className="text-purple-300 font-bold text-[10px] whitespace-nowrap">
                  Top 20 Qualify
                </span>
              </div>
            </div>

            {/* Season 02: Upcoming */}
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  <span className="text-zinc-200 font-bold text-xs">Season 02: Summer Accelerator</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 whitespace-nowrap shrink-0">
                  CYCLE 2
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800">
                <span className="text-zinc-500 text-[10px]">May 01 – Aug 31 (4 Months)</span>
                <span className="text-zinc-400 font-bold text-[10px] whitespace-nowrap">
                  Top 20 Qualify
                </span>
              </div>
            </div>

            {/* Season 03: Upcoming */}
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  <span className="text-zinc-200 font-bold text-xs">Season 03: Fall Campus Clashes</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 whitespace-nowrap shrink-0">
                  CYCLE 3
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800">
                <span className="text-zinc-500 text-[10px]">Sep 01 – Dec 31 (4 Months)</span>
                <span className="text-zinc-400 font-bold text-[10px] whitespace-nowrap">
                  Top 20 Qualify
                </span>
              </div>
            </div>

            {/* Qualification & Handover Protocol */}
            <div className="p-2.5 rounded-lg bg-black/60 border border-zinc-800 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-zinc-300">
                <Briefcase className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Partner Interview Pipeline</span>
              </div>
              <span className="text-purple-300 font-bold whitespace-nowrap">Zero ATS Filter</span>
            </div>
          </div>
        ),
      },
    },
  ];

  const activeFolder = folders.find(f => f.id === activeFolderId)!;

  return (
    <section id="features" className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      {/* Section top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Clean Headline: Zero AI slop, transparent background */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            <span>One Unified Arena to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              Compete, Learn & Get Hired
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            From real-time 1v1 coding duels and campus living rooms to timed skill assessments and 4-month seasonal placement pipelines.
          </p>
        </div>

        {/* ── 3D INTERACTIVE LAYERED FOLDER STRUCTURE ── */}
        <div className="relative w-full max-w-5xl mx-auto">

          {/* FOLDER TABS HEADER ROW (Full-Width Continuous Tab Rail with Responsive Scrolling) */}
          <div className="flex w-full relative z-30 -mb-px overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {folders.map((folder, index) => {
              const isActive = activeFolderId === folder.id;
              const isFirst = index === 0;
              const isLast = index === folders.length - 1;

              return (
                <button
                  key={folder.id}
                  onClick={() => setActiveFolderId(folder.id)}
                  className={`group relative flex-1 min-w-[105px] sm:min-w-0 py-3 sm:py-3.5 px-2.5 sm:px-4 font-mono text-xs transition-all duration-200 flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 select-none outline-none shrink-0 sm:shrink ${isFirst ? 'rounded-tl-2xl' : ''
                    } ${isLast ? 'rounded-tr-2xl' : 'border-r border-zinc-800/80'
                    } ${isActive
                      ? 'bg-[#0d0d12] text-white border-t-2 z-30 shadow-lg'
                      : 'bg-[#09090d]/85 text-zinc-400 border-t border-b border-zinc-800/80 hover:text-zinc-200 hover:bg-zinc-900/60 z-10'
                    }`}
                  style={{
                    borderTopColor: isActive ? folder.accentColor : undefined,
                    borderLeftColor: isFirst ? (isActive ? '#3f3f46' : 'rgba(63,63,70,0.4)') : undefined,
                    borderLeftWidth: isFirst ? '1px' : undefined,
                    borderRightColor: isLast ? (isActive ? '#3f3f46' : 'rgba(63,63,70,0.4)') : undefined,
                    borderRightWidth: isLast ? '1px' : undefined,
                  }}
                >
                  {/* Accent Status Dot */}
                  <span
                    className="w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125"
                    style={{ backgroundColor: folder.accentColor }}
                  />

                  <span className="font-bold tracking-wider">{folder.tabNumber}</span>
                  <span className="truncate font-semibold hidden md:inline">{folder.tabLabel}</span>
                  <span className="truncate font-semibold md:hidden">{folder.shortLabel}</span>

                  {/* Seamless Bottom Bridge (Erases the seam so tab merges directly into folder body) */}
                  {isActive && (
                    <span className="absolute -bottom-1 inset-x-0 h-1.5 bg-[#0d0d12] z-30" />
                  )}
                </button>
              );
            })}
          </div>

          {/* FOLDER BODY CONTAINER (Seamless Continuation of Top Tab Rail) */}
          <div className="relative rounded-b-2xl border-x border-b border-zinc-800 bg-[#0d0d12]/90 backdrop-blur-xl shadow-2xl overflow-hidden p-6 sm:p-10 z-20">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFolder.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >

                {/* Left Column: Feature Narrative & Engineering Specs */}
                <div className="lg:col-span-7 space-y-6">

                  {/* Category Pill */}
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span
                      className="px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border"
                      style={{
                        backgroundColor: `${activeFolder.accentColor}15`,
                        borderColor: `${activeFolder.accentColor}40`,
                        color: activeFolder.accentColor,
                      }}
                    >
                      {activeFolder.badge}
                    </span>
                    <span className="text-zinc-500">CORE PILLAR</span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                      {activeFolder.headline}
                    </h3>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                      {activeFolder.summary}
                    </p>
                  </div>

                  {/* Architectural Specs List */}
                  <div className="space-y-3 pt-2">
                    {activeFolder.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl border border-zinc-800/80 bg-black/40 flex items-start gap-3.5"
                      >
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            backgroundColor: `${activeFolder.accentColor}20`,
                            color: activeFolder.accentColor,
                          }}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <div>
                          <span className="text-white font-bold text-sm block mb-0.5">
                            {spec.title}
                          </span>
                          <span className="text-zinc-400 text-xs leading-relaxed block">
                            {spec.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <a
                      href={getFeatureAppUrl(activeFolder.appRoute || '')}
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-orange-400 transition-colors"
                    >
                      <span>Explore this feature in web app</span>
                      <ArrowRight className="w-4 h-4 text-orange-400" />
                    </a>
                  </div>
                </div>

                {/* Right Column: High-Fidelity UI Artifact Showcase */}
                <div className="lg:col-span-5">
                  <div className="rounded-xl border border-zinc-800 bg-[#08080c] p-5 shadow-2xl relative overflow-hidden">
                    {/* Top Accent Gradient Line */}
                    <div
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{ backgroundColor: activeFolder.accentColor }}
                    />

                    {/* Showcase Card Header */}
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 font-mono text-xs">
                      <div>
                        <span className="text-white font-bold block">{activeFolder.showcase.title}</span>
                        <span className="text-zinc-500 text-[10px]">{activeFolder.showcase.subtitle}</span>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold border"
                        style={{
                          backgroundColor: `${activeFolder.accentColor}15`,
                          borderColor: `${activeFolder.accentColor}30`,
                          color: activeFolder.accentColor,
                        }}
                      >
                        {activeFolder.showcase.tag}
                      </span>
                    </div>

                    {/* Live Artifact Details */}
                    {activeFolder.showcase.details}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* PHYSICAL SHADOW & UNDERLYING FOLDER LIP (Shows physical depth behind active folder) */}
          <div className="h-2 w-[98%] mx-auto bg-zinc-900/60 rounded-b-xl border-x border-b border-zinc-800/80 -mt-px" />
          <div className="h-2 w-[95%] mx-auto bg-zinc-950/40 rounded-b-xl border-x border-b border-zinc-800/40 -mt-px opacity-70" />

        </div>

      </div>
    </section>
  );
};

export default Features;
