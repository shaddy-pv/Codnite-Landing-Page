import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Swords,
  Users,
  Terminal,
  Trophy,
  Zap,
  Coffee,
  Mic,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Check,
  Code2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Clock,
  Briefcase,
  Play,
  Share2,
  Award,
  Layers,
  Flame,
  Star,
  ChevronRight,
  Filter,
  CheckCircle,
  XCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import codniteLogo from '@/assets/horizontal_logo.png';
import Footer from '@/components/Footer';

const getAppUrl = (path: string = '') => {
  if (typeof window !== 'undefined' && window.location.port === '4173') {
    return `http://localhost:5173/app${path}`;
  }
  return `/app${path}`;
};

type CategoryType = 'all' | 'battles' | 'community' | 'placements' | 'ide' | 'projects' | 'hall-of-fame';

interface ProductItem {
  id: string;
  category: 'battles' | 'community' | 'placements' | 'ide' | 'projects' | 'hall-of-fame';
  badge: string;
  badgeColor: string;
  title: string;
  userQuestion: string; // "Why should I use this?"
  valueProposition: string;
  appRoute: string;
  actionLabel: string;
  keyBenefits: {
    icon: React.ElementType;
    title: string;
    description: string;
  }[];
  userPerks: string[];
  visualComponent: React.ReactNode;
}

export const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: { id: CategoryType; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All Features', icon: Layers },
    { id: 'battles', label: '1v1 Arena', icon: Swords },
    { id: 'community', label: 'Campus Living Room', icon: Coffee },
    { id: 'placements', label: 'Placement Prep', icon: Briefcase },
    { id: 'ide', label: 'Cloud IDE & Compiler', icon: Terminal },
    { id: 'projects', label: 'Projects & Open Source', icon: Code2 },
    { id: 'hall-of-fame', label: 'Hiring & Rank', icon: Trophy },
  ];

  const products: ProductItem[] = [
    {
      id: 'arena-duels',
      category: 'battles',
      badge: 'REAL-TIME 1V1 DUELS',
      badgeColor: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
      title: '1v1 Code Arena: Stop Practicing in Silence',
      userQuestion: 'Why should I duel instead of grinding problems alone?',
      valueProposition:
        'Solving problems alone gets boring fast and gives you zero sense of real interview pressure. In the Codnite Arena, you face off head-to-head against friends or peers across India. Feel the rush of synchronized timers, live opponent keystroke indicators, and the thrill of submitting first.',
      appRoute: '/battles',
      actionLabel: 'Enter 1v1 Arena',
      keyBenefits: [
        {
          icon: Zap,
          title: 'Adrenaline Over Boredom',
          description: '10-minute high-octane coding duels that keep you locked in and eliminate DSA procrastination.',
        },
        {
          icon: Clock,
          title: 'Live Opponent Telemetry',
          description: 'See when your rival is typing and how many test cases they have passed in real-time.',
        },
        {
          icon: Swords,
          title: 'DSA & Project Battles',
          description: 'Choose between fast-paced algorithmic problem battles or timed real-world project challenges.',
        },
        {
          icon: Share2,
          title: '1-Click Friendly Challenges',
          description: 'Generate an instant duel link, share it on WhatsApp or Discord, and settle bragging rights with your roommate.',
        },
      ],
      userPerks: [
        'Instant Battle Points awarded after every match',
        'Automatic test case validation with edge-case breakdowns',
        'Spectator mode to watch top campus coders duel live',
        'Detailed match history and execution speed analysis',
      ],
      visualComponent: (
        <div className="space-y-3 font-mono text-xs">
          {/* Match Status Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/70 border border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-white font-bold">1v1 Ranked Match #1084</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[11px] font-bold border border-orange-500/30">
                04:22 REMAINING
              </span>
            </div>
          </div>

          {/* Head-to-Head Duelist Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* You */}
            <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-xs">YOU (alex_dev)</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  12/12 PASSED ✓
                </span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-orange-500 h-full w-full" />
              </div>
              <span className="text-[10px] text-zinc-400 block">Submitted in 2m 14s · 0.2ms runtime</span>
            </div>

            {/* Rival */}
            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-300 font-bold text-xs">RIVAL (coder_rohan)</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                  9/12 RUNNING...
                </span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-zinc-600 h-full w-3/4 animate-pulse" />
              </div>
              <span className="text-[10px] text-zinc-500 block">Testing edge case #10 · C++20</span>
            </div>
          </div>

          {/* Victory Badge Banner */}
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-bold text-xs">Victory Confirmed · +100 Battle Points</span>
            </div>
            <span className="text-[10px] text-zinc-400">Rank: Emberstrike Tier</span>
          </div>
        </div>
      ),
    },
    {
      id: 'campus-lounge',
      category: 'community',
      badge: 'VIRTUAL CAMPUS LIVING ROOM',
      badgeColor: 'border-sky-500/30 bg-sky-500/10 text-sky-400',
      title: 'Campus Living Room: Never Code Alone at 2 AM',
      userQuestion: 'How does this help my day-to-day coding routine?',
      valueProposition:
        'Late-night debugging feels miserable when you are isolated. The Campus Living Room is a casual, drop-in virtual common room just for your university. Hop onto a couch, talk through problem logic with batchmates over live voice, clear doubts instantly, and challenge online peers with one click.',
      appRoute: '/communities',
      actionLabel: 'Join Campus Living Room',
      keyBenefits: [
        {
          icon: Coffee,
          title: 'Casual Drop-In Voice Couches',
          description: 'No Zoom links or calendar invites. Just sit on a virtual couch and start chatting about DSA problems.',
        },
        {
          icon: Mic,
          title: 'Live Peer Doubt Clearing',
          description: 'Stuck on dynamic programming or recursion? Ask seniors and classmates in the room for instant hints.',
        },
        {
          icon: Swords,
          title: 'Instant "Battle Ready" Status',
          description: 'Toggle your status to "Battle Ready" so friends can invite you to a duel right from the lounge.',
        },
        {
          icon: ShieldCheck,
          title: 'Exclusive Verified Campus Space',
          description: 'Only verified students from your university can access your living room, keeping it safe and focused.',
        },
      ],
      userPerks: [
        'Crystal clear voice channels built right inside your browser',
        'Presence indicator showing who is studying, resting, or dueling',
        'Community announcement board for campus hackathons and drives',
        'Private batch lounges for 2nd, 3rd, and 4th-year cohorts',
      ],
      visualComponent: (
        <div className="space-y-3 font-mono text-xs">
          {/* Lounge Header */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/70 border border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold">University Campus Living Room</span>
            </div>
            <span className="text-sky-400 text-xs font-semibold">14 Peers Online</span>
          </div>

          {/* Active Students in Lounge */}
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 font-bold flex items-center justify-center text-xs">
                  S
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold">You (Shadan)</span>
                    <span className="text-[10px] text-zinc-400">· CSE '26</span>
                  </div>
                  <span className="text-[10px] text-sky-300">🛋️ Main Couch · Mic Active</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Voice Connected
              </span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 font-bold flex items-center justify-center text-xs">
                  A
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-200 font-bold">Aman Sharma</span>
                    <span className="px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold">
                      ⚔️ Ready
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400">Solving Graph DP · Ready for duel</span>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-orange-500 hover:bg-orange-400 text-black text-[11px] font-bold cursor-pointer">
                Challenge
              </span>
            </div>
          </div>

          {/* Room Audio Status */}
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-zinc-400 text-[11px]">
            <span>Low-Latency Campus Mesh Audio</span>
            <span className="text-emerald-400 font-bold">0ms Buffer</span>
          </div>
        </div>
      ),
    },
    {
      id: 'campus-hubs',
      category: 'community',
      badge: 'CAMPUS HUBS & RIVALRIES',
      badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
      title: 'University Rivalries: Put Your College on the Map',
      userQuestion: 'What does my college get by being on Codnite?',
      valueProposition:
        'Every competitive programmer wants their college to be known. When you win battles on Codnite, your points contribute to your college aggregate rating on the All-India Leaderboard. Battle rival campuses, host custom internal contests, and build your institution’s coding legacy.',
      appRoute: '/communities',
      actionLabel: 'Explore College Hubs',
      keyBenefits: [
        {
          icon: GraduationCap,
          title: 'All-India College Leaderboards',
          description: 'See where your university ranks against IITs, NITs, VIT, SRM, and engineering colleges across India.',
        },
        {
          icon: Trophy,
          title: 'College vs College Showdowns',
          description: 'Coordinate clan battles against rival campus chapters and settle which institute has the sharper coders.',
        },
        {
          icon: Users,
          title: 'Campus Hackathons & Contests',
          description: 'Community leads and faculty can create hackathon-level challenges with dedicated Organizer and Judge studios.',
        },
        {
          icon: Award,
          title: 'Official Chapter Badge',
          description: 'Represent your university chapter or compete as an independent developer using any registered email.',
        },
      ],
      userPerks: [
        'Flexible campus affiliation (join with any registered email or student ID)',
        'Internal batch and year-wise leaderboards for healthy campus competition',
        'Organizer & Judge dashboards to review code and rate students (1 to 5 stars)',
        'Gamified milestone achievements and seasonal campus trophies',
      ],
      visualComponent: (
        <div className="space-y-3 font-mono text-xs">
          {/* Institutional Standing */}
          <div className="p-3 rounded-xl bg-black/70 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span className="text-white font-bold">All-India University Rankings</span>
            </div>
            <span className="text-amber-400 font-bold text-[11px]">SEASON 04 ACTIVE</span>
          </div>

          {/* Top Universities Leaderboard */}
          <div className="space-y-1.5">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 font-bold flex items-center justify-center text-[10px]">
                  #1
                </span>
                <span className="text-white font-bold">IIT Bombay Chapter</span>
              </div>
              <span className="text-amber-300 font-bold">14,820 Pts</span>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center text-[10px]">
                  #2
                </span>
                <span className="text-zinc-200 font-bold">NIT Trichy Coding Club</span>
              </div>
              <span className="text-zinc-400 font-bold">13,290 Pts</span>
            </div>

            <div className="p-2.5 rounded-lg bg-orange-500/15 border border-orange-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-orange-500/30 text-orange-300 font-bold flex items-center justify-center text-[10px]">
                  #3
                </span>
                <span className="text-white font-bold">Your University (Rising 🔥)</span>
              </div>
              <span className="text-orange-400 font-bold">12,940 Pts</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>You contributed +180 pts this week</span>
            <span className="text-emerald-400 font-bold">Top 5% Contributor</span>
          </div>
        </div>
      ),
    },
    {
      id: 'placement-diagnostics',
      category: 'placements',
      badge: 'PLACEMENT & EXAM READINESS',
      badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
      title: 'Company Placement Tracks: Pass on Your First Attempt',
      userQuestion: 'How does Codnite prepare me for real campus placements?',
      valueProposition:
        'Recruitment tests are ruthless: strict timers, tricky edge cases, and aptitude modules. Codnite gives you targeted assessment tracks modeled exactly on real company exams (TCS NQT, Infosys, Accenture, Cognizant, and product startups). Get comprehensive diagnostic scorecards before companies arrive on campus.',
      appRoute: '/assessments',
      actionLabel: 'Take Placement Diagnostic',
      keyBenefits: [
        {
          icon: Briefcase,
          title: 'Company-Specific Mock Exams',
          description: 'Practice the exact question patterns, aptitude sections, and coding constraints asked by top recruiters.',
        },
        {
          icon: Clock,
          title: 'Strict Proctored Timers',
          description: 'Experience real exam conditions with timed sections and anti-cheat locks to build nerve and speed.',
        },
        {
          icon: TrendingUp,
          title: 'Granular Diagnostic Scorecard',
          description: 'Discover your exact speed percentile, time-complexity traps, and weak topics before drive day.',
        },
        {
          icon: CheckCircle2,
          title: 'Zero Guesswork Preparation',
          description: 'Know with statistical certainty if you are ready to crack the initial online technical screening.',
        },
      ],
      userPerks: [
        'Curated tracks for TCS NQT, Infosys, Accenture, and product engineering',
        'Integrated MCQ aptitude, logical reasoning, and algorithmic coding',
        'Automatic test case breakdown with hidden edge cases revealed post-test',
        'Verifiable certificate of completion to attach to your job applications',
      ],
      visualComponent: (
        <div className="space-y-3 font-mono text-xs">
          {/* Diagnostic Header */}
          <div className="p-3 rounded-xl bg-black/70 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-white font-bold block">TCS NQT & Product Diagnostic</span>
              <span className="text-[10px] text-zinc-400">Section: Advanced Data Structures & Speed</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              VERIFIED 98.4%
            </span>
          </div>

          {/* Score Matrix */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
              <span className="text-[10px] text-zinc-400 block">Total Score</span>
              <span className="text-emerald-400 font-bold text-sm">96 / 100</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="text-[10px] text-zinc-400 block">Avg Speed</span>
              <span className="text-white font-bold text-sm">4.2 min/task</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="text-[10px] text-zinc-400 block">Accuracy</span>
              <span className="text-white font-bold text-sm">94.8%</span>
            </div>
          </div>

          {/* Topic Strengths Breakdown */}
          <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-300">Binary Trees & Recursion</span>
              <span className="text-emerald-400 font-bold">100% (High Mastery)</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
              <div className="bg-emerald-400 h-full w-full" />
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-300">Dynamic Programming (Knapsack/LCS)</span>
              <span className="text-amber-400 font-bold">85% (Needs Edge-case Polish)</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
              <div className="bg-amber-400 h-full w-[85%]" />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center justify-between">
            <span>PLACEMENT VERDICT: INTERVIEW READY</span>
            <span className="text-white">Tier-1 Shortlist Likely</span>
          </div>
        </div>
      ),
    },
    {
      id: 'cloud-ide',
      category: 'ide',
      badge: 'BROWSER CLOUD STUDIO',
      badgeColor: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
      title: 'Cloud Studio: Zero Setup, Instant Execution',
      userQuestion: 'Why code in Codnite instead of local VS Code or online compilers?',
      valueProposition:
        'Forget spending hours debugging Mingw, path variables, or broken Java installations. Codnite gives you a high-performance in-browser IDE with instant multi-language compilation. Write code, add custom test cases, view outputs side-by-side, and test edge cases in milliseconds on any computer.',
      appRoute: '/code-execution',
      actionLabel: 'Launch Cloud Studio',
      keyBenefits: [
        {
          icon: Terminal,
          title: 'Zero Setup & Instant Start',
          description: 'No installations required. Works smoothly on college lab computers, low-spec laptops, or tablets.',
        },
        {
          icon: Code2,
          title: 'Multi-Language Power',
          description: 'Write and compile in modern C++20, Java 21, Python 3, and TypeScript with intelligent auto-completion.',
        },
        {
          icon: Clock,
          title: 'Sub-Second Execution',
          description: 'Run code against heavy test inputs and receive results in under 500 milliseconds.',
        },
        {
          icon: Sparkles,
          title: 'Custom Test Suite Runner',
          description: 'Create and save your own edge-case test vectors with side-by-side expected vs actual output diffs.',
        },
      ],
      userPerks: [
        'Monaco editor engine with VS Code keybindings & dark mode themes',
        'Detailed execution metrics: memory consumption and execution duration',
        '1,200+ native curated DSA & algorithmic problems built-in, plus Codeforces contest sync',
        'Syntax error highlights and clear compiler error outputs',
      ],
      visualComponent: (
        <div className="space-y-3 font-mono text-xs">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/80 border border-zinc-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-white font-bold">solution.cpp (C++20 Clang)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                Monaco Engine
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Simulated Code Lines */}
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] leading-relaxed text-zinc-300 space-y-1">
            <p><span className="text-purple-400">#include</span> <span className="text-emerald-400">&lt;bits/stdc++.h&gt;</span></p>
            <p><span className="text-purple-400">using namespace</span> std;</p>
            <p><span className="text-blue-400">int</span> <span className="text-yellow-400">solve</span>(vector&lt;<span className="text-blue-400">int</span>&gt;&amp; nums) &#123;</p>
            <p className="pl-4 text-zinc-400">// Fast two-pointer optimization</p>
            <p className="pl-4"><span className="text-blue-400">int</span> left = <span className="text-amber-400">0</span>, right = nums.size() - <span className="text-amber-400">1</span>;</p>
            <p className="pl-4"><span className="text-purple-400">return</span> maxSubarray(nums, left, right);</p>
            <p>&#125;</p>
          </div>

          {/* Test Case Output Console */}
          <div className="p-2.5 rounded-xl bg-black/90 border border-zinc-800 space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-emerald-400 font-bold">✓ TEST 1: PASSED (0.4ms)</span>
              <span className="text-zinc-500">Memory: 4.2 MB</span>
            </div>
            <div className="p-1.5 rounded bg-zinc-900/90 text-zinc-400 text-[10px] flex items-center justify-between">
              <span>Input: [2, 7, 11, 15], Target = 9</span>
              <span className="text-emerald-400 font-bold">Output: [0, 1]</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'seasonal-pipeline',
      category: 'hall-of-fame',
      badge: 'SEASONAL RECRUITER PIPELINE',
      badgeColor: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
      title: 'Hall of Fame: Prove Your Skill & Get Placed',
      userQuestion: 'How does climbing the leaderboard help my career?',
      valueProposition:
        'Recruiters receive thousands of generic resumes with copied GitHub projects. Codnite operates three 4-month competitive seasons each year. Top 20 coders of each season gain direct placement referrals and interview fast-tracks with partner companies. Your public battle card provides verifiable proof of skill under pressure.',
      appRoute: '/leaderboard',
      actionLabel: 'View Hall of Fame',
      keyBenefits: [
        {
          icon: Trophy,
          title: '3 Seasonal Hiring Windows',
          description: 'Spring, Summer, and Fall seasons aligned directly with campus placement cycles across India.',
        },
        {
          icon: Briefcase,
          title: 'Top 20 Placement Fast-Track',
          description: 'Top rankers bypass automated ATS filters and get direct interview calls from partner companies.',
        },
        {
          icon: Award,
          title: '10-Tier Rank Progression',
          description: 'Climb through ranks from Spark 🔥 to Blaze ⚡, Apex, and Grandmaster with prestigious badges.',
        },
        {
          icon: Share2,
          title: 'Verifiable Battle Card',
          description: 'Share a tamper-proof battle profile on LinkedIn showing your win-rate, speed, and contest rating.',
        },
      ],
      userPerks: [
        'Seasonal champion trophies displayed permanently on your profile',
        'Daily problem-solving streak multipliers and XP bonuses',
        'Direct recruiter outreach via verified candidate profiles',
        'National, state, city, and college-specific leaderboard filters',
      ],
      visualComponent: (
        <div className="space-y-3 font-mono text-xs">
          {/* Player Battle Card */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-transparent border border-yellow-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 font-bold flex items-center justify-center text-sm shadow-md">
                  👑
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold text-sm">Shadan Siddiqui</span>
                    <span className="text-yellow-400 font-bold text-[10px]">APEX TIER</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">National Rank #14 · All-India Leaderboard</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                RECRUITER VERIFIED
              </span>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-black/60 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Battle Points</span>
                <span className="text-yellow-400 font-bold text-sm">2,140</span>
              </div>
              <div className="p-2 rounded-lg bg-black/60 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Win Rate</span>
                <span className="text-emerald-400 font-bold text-sm">82.4%</span>
              </div>
              <div className="p-2 rounded-lg bg-black/60 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Win Streak</span>
                <span className="text-orange-400 font-bold text-sm">9 Duels 🔥</span>
              </div>
            </div>

            {/* Placement Fast Track Badge */}
            <div className="p-2.5 rounded-lg bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-between text-yellow-300 text-[11px] font-bold">
              <span>STATUS: SEASON 04 TOP 20 SHORTLIST</span>
              <span className="text-white">Partner Referrals Active</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'projects-opensource',
      category: 'projects',
      badge: 'PROJECT SHOWCASE & OPEN SOURCE',
      badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
      title: 'Project Showcase: Build, Fork & Ship Real-World Open Source',
      userQuestion: 'How does Codnite help me build real-world software beyond DSA?',
      valueProposition:
        'Interviews and tech recruiters look for real engineering competence, not just rote DSA memorization. Codnite lets you clone any public GitHub repository directly into the Cloud Studio, fork open-source projects, collaborate in real-time with peers, and showcase your builds to thousands of developers and recruiters.',
      appRoute: '/challenges',
      actionLabel: 'Explore Project Showcase',
      keyBenefits: [
        {
          icon: Code2,
          title: 'Instant Browser Git Workspace',
          description: 'Clone and run any GitHub repository in your browser with zero local dependency headaches or broken node/python setups.',
        },
        {
          icon: Users,
          title: 'Open Source Community Hub',
          description: 'Find beginner-friendly issues, pair-program with campus contributors, and submit PRs with live reviews.',
        },
        {
          icon: Sparkles,
          title: 'Project Build Battles',
          description: 'Participate in timed project-building hackathons judged on architecture, code quality, and execution.',
        },
        {
          icon: Share2,
          title: 'Public Devlog & Showcase Feed',
          description: 'Publish interactive demos, receive stars, and get direct feedback from senior developers and alumni.',
        },
      ],
      userPerks: [
        'One-click GitHub repo import and browser terminal streaming',
        'Multi-file cloud workspace with live preview and syntax checking',
        'Collaborative pair-programming rooms with real-time cursor sync',
        'Verifiable project showcase portfolio badge to share on LinkedIn',
      ],
      visualComponent: (
        <div className="space-y-3 font-mono text-xs">
          {/* Project Header Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/70 border border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-white font-bold">github.com/shaddy-pv/Codnite</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              OPEN SOURCE
            </span>
          </div>

          {/* Repo Showcase Card */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-bold text-sm block">Codnite Web Client</span>
                <span className="text-[10px] text-zinc-400">React 19 · TypeScript · Monaco Editor · WebRTC</span>
              </div>
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] font-bold flex items-center gap-1">
                ⭐ 120+ Stars
              </span>
            </div>

            <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
              Real-time competitive coding platform with browser compilation and inter-collegiate tournament infrastructure.
            </p>

            <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
              <div className="p-2 rounded bg-black/60 border border-zinc-800 text-zinc-300 flex items-center justify-between">
                <span>Good First Issues</span>
                <span className="text-emerald-400 font-bold">4 Open</span>
              </div>
              <div className="p-2 rounded bg-black/60 border border-zinc-800 text-zinc-300 flex items-center justify-between">
                <span>Active Contributors</span>
                <span className="text-orange-400 font-bold">18 Peers</span>
              </div>
            </div>
          </div>

          {/* Live Git Telemetry */}
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Branch: main · Ready to fork & submit PR</span>
            <span className="text-emerald-400 font-bold">Sync Active</span>
          </div>
        </div>
      ),
    },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const comparisonData = [
    {
      metric: 'Adrenaline & Excitement',
      solo: 'Boring, easy to get distracted and quit after 1 problem',
      codnite: 'Live 10-min 1v1 duels with synchronized timers & real stakes',
    },
    {
      metric: 'Study Community',
      solo: 'Isolated coding alone in your room with no one to ask',
      codnite: 'Campus Living Room with drop-in voice couches & batchmates',
    },
    {
      metric: 'College Spirit & Pride',
      solo: 'No campus recognition or way to compare with peers',
      codnite: 'All-India College Leaderboards and inter-university showdowns',
    },
    {
      metric: 'Placement Preparation',
      solo: 'Random questions without understanding company patterns',
      codnite: 'TCS, Infosys & Accenture diagnostic tracks with speed scorecards',
    },
    {
      metric: 'Hiring Credibility',
      solo: 'Generic GitHub green squares that recruiters ignore',
      codnite: 'Top 20 Seasonal Placement referrals & verifiable battle profile',
    },
    {
      metric: 'Environment Setup',
      solo: 'Broken compilers, local path errors, and complex IDEs',
      codnite: '100% in-browser cloud studio with sub-second execution',
    },
  ];

  const faqs = [
    {
      question: 'Is Codnite completely free for college students?',
      answer:
        'Yes! Codnite is 100% free for college students and developers. You get full access to live 1v1 battles, the campus living room, placement diagnostics, cloud studio, and seasonal leaderboards without any subscription.',
    },
    {
      question: 'How do the 1v1 coding battles work?',
      answer:
        'When you enter a battle, you and your opponent are given the exact same algorithmic problem. Both of you write and test code simultaneously. You can see when your opponent types and how many test cases they pass. The first developer to submit a clean solution that passes all edge cases wins the duel and earns Battle Points to climb rank tiers.',
    },
    {
      question: 'What is the Campus Living Room?',
      answer:
        'It is a virtual common room exclusively for students from your engineering college. You can hop onto virtual couches, talk to your peers over high-clarity voice channels, brainstorm DSA logic, and invite anyone in the room to an instant battle.',
    },
    {
      question: 'How does the Top 20 Seasonal Placement Pipeline work?',
      answer:
        'Codnite runs three 4-month competitive seasons each calendar year (Spring, Summer, Fall). At the close of each season, the top 20 coders on the leaderboard receive direct placement referrals, interview shortlists, and partner recommendations, skipping standard ATS resume filters.',
    },
    {
      question: 'Can I practice in C++, Python, Java, or JavaScript?',
      answer:
        'Yes. Codnite supports modern C++20, Java 21, Python 3, JavaScript, and TypeScript across all 1v1 battles, assessments, and the cloud studio.',
    },
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-zinc-300 selection:bg-orange-500/30 selection:text-orange-200 overflow-x-hidden">
      {/* ── Top Header Navigation ── */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-6 py-3 sm:py-3.5">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group w-fit" data-cursor-hover>
            <img
              src={codniteLogo}
              alt="Codnite Logo"
              className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.03]"
              data-cursor-hover
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Back to Home</span>
            </Link>

            <a
              href={getAppUrl()}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FF6A00] text-white font-semibold text-xs sm:text-sm hover:bg-[#ff7b1a] transition-all duration-200 shadow-lg shadow-orange-500/20"
              data-cursor-hover
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero Section: User-Focused Hook ── */}
      <section className="relative px-4 sm:px-6 pt-12 sm:pt-20 pb-12 sm:pb-16 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Built For Developers Who Build</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Why Code in Isolation <br className="hidden sm:inline" />
            When You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">Duel, Hang Out & Get Hired?</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Stop grinding algorithmic problems alone in silence. Codnite transforms competitive programming into a high-octane multiplayer arena. Battle peers in real-time 1v1 duels, hang out in your campus living room, master placement tracks, and get discovered by top tech recruiters.
          </p>

          {/* Quick Value Metrics Pill Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto text-left font-mono">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-orange-400 font-bold text-lg sm:text-xl block">10-Min</span>
              <span className="text-zinc-400 text-xs">Live 1v1 Duels</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-sky-400 font-bold text-lg sm:text-xl block">0-Delay</span>
              <span className="text-zinc-400 text-xs">Campus Voice Lounges</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-emerald-400 font-bold text-lg sm:text-xl block">Top 20</span>
              <span className="text-zinc-400 text-xs">Placement Fast-Track</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-amber-400 font-bold text-lg sm:text-xl block">100%</span>
              <span className="text-zinc-400 text-xs">Free Cloud Studio</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Category Filter Pills ── */}
      <section className="px-4 sm:px-6 pb-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-semibold'
                    : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.06] hover:border-white/15'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Main Products Feature Cards: Deep Dives from User Perspective ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 space-y-10 sm:space-y-14">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((prod, index) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-3xl border border-white/[0.08] bg-zinc-950/80 p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl group hover:border-orange-500/30 transition-colors duration-300"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Side: User Value, Why Use It, and Benefits (7 cols on lg) */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* Category Badge & Headline */}
                  <div className="space-y-2.5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${prod.badgeColor}`}>
                      {prod.badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                      {prod.title}
                    </h2>
                  </div>

                  {/* User Perspective Question Box */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider font-mono">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{prod.userQuestion}</span>
                    </div>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {prod.valueProposition}
                    </p>
                  </div>

                  {/* 4 Concrete User Benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    {prod.keyBenefits.map((benefit, bIdx) => {
                      const BenefitIcon = benefit.icon;
                      return (
                        <div
                          key={bIdx}
                          className="p-3 rounded-xl bg-black/40 border border-white/[0.05] hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className="p-1 rounded-md bg-orange-500/10 text-orange-400">
                              <BenefitIcon className="w-3.5 h-3.5" />
                            </div>
                            <h3 className="text-white font-bold text-xs sm:text-sm">
                              {benefit.title}
                            </h3>
                          </div>
                          <p className="text-zinc-400 text-xs leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* User Perks Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 pt-1">
                    {prod.userPerks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <a
                      href={getAppUrl(prod.appRoute)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-orange-500/20 group/btn"
                      data-cursor-hover
                    >
                      <span>{prod.actionLabel}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>

                </div>

                {/* Right Side: Interactive Visual Mockup (5 cols on lg) */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl border border-zinc-800 bg-[#0E0E0E] p-4 sm:p-5 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono">Live Interface Preview</span>
                    </div>

                    {prod.visualComponent}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* ── Why Codnite Beats Solo Practice (Side-by-Side Comparison) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-3xl border border-white/[0.08] bg-zinc-950 p-6 sm:p-10 lg:p-12">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-mono font-bold uppercase">
              The Reality Check
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Traditional Solo Practice vs. The Codnite Arena
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              See why university developers are leaving traditional solo platforms to compete, collaborate, and level up together.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-mono text-xs uppercase">
                  <th className="py-3 px-4">Feature / Experience</th>
                  <th className="py-3 px-4 text-zinc-500">Traditional Solo Platforms</th>
                  <th className="py-3 px-4 text-orange-400 font-bold bg-orange-500/5 rounded-t-xl">The Codnite Experience</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {row.metric}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400/80 shrink-0 mt-0.5" />
                        <span>{row.solo}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-200 bg-orange-500/[0.02]">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{row.codnite}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Frequently Asked Questions ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="text-center mb-8 sm:mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Everything you need to know about getting started on Codnite.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden transition-colors hover:border-white/15"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-orange-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── High-Impact Bottom Call to Action ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-zinc-950 to-zinc-950 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-mono font-bold uppercase">
            <Flame className="w-3.5 h-3.5" />
            <span>Ready to Test Your Skills?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Step Into the Arena. <br />
            Represent Your Campus Today.
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Free forever for students. Join thousands of university developers leveling up their algorithmic problem-solving and placement readiness.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={getAppUrl('/battles')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2"
              data-cursor-hover
            >
              <Swords className="w-4 h-4" />
              <span>Enter 1v1 Battle Arena</span>
            </a>
            <a
              href={getAppUrl('/communities')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 hover:border-white/20 font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2"
              data-cursor-hover
            >
              <Coffee className="w-4 h-4" />
              <span>Join Campus Living Room</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Shared Footer ── */}
      <Footer />
    </div>
  );
};

export default Products;
