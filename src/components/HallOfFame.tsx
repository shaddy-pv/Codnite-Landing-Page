import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Trophy,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Target,
  Swords,
  Code2,
  GraduationCap,
  TrendingUp,
  Shield,
  Zap,
  Activity,
  Layers,
} from 'lucide-react';
import { computeLevelFromPoints, getBadgeForPoints } from '../lib/levelBadges';

// ── Types ──
interface UserStats {
  problemsSolved: number;
  totalBattles: number;
  battlesWon: number;
  currentStreak?: number;
}

interface User {
  _id: string;
  rank: number;
  username: string;
  avatarUrl?: string;
  collegeId?: { name: string; shortName?: string };
  points: number;
  stats: UserStats;
  badge?: string;
}

// ── Real Production Fallback Data (10 Verified Live Users) ──
const FALLBACK_USERS: User[] = [
  {
    _id: '1',
    rank: 1,
    username: 'Md Shadan Siddiqui',
    avatarUrl:
      'https://res.cloudinary.com/drpzsse9b/image/upload/v1772614855/codnite/avatars/avatar_69a643ae241806710a16e1fc.jpg',
    collegeId: { name: 'United College of Engineering and Research', shortName: 'UCER' },
    points: 3210,
    stats: { problemsSolved: 29, totalBattles: 5, battlesWon: 5, currentStreak: 5 },
    badge: 'Solaris',
  },
  {
    _id: '2',
    rank: 2,
    username: 'Mubashshira Siddiqui',
    avatarUrl:
      'https://ui-avatars.com/api/?name=Mubashshira+Siddiqui&background=0284c7&color=fff&size=200&bold=true',
    collegeId: { name: 'United College of Engineering and Research', shortName: 'UCER' },
    points: 1740,
    stats: { problemsSolved: 0, totalBattles: 3, battlesWon: 3, currentStreak: 1 },
    badge: 'Frostweaver',
  },
  {
    _id: '3',
    rank: 3,
    username: 'CodeMaster_Bot',
    avatarUrl:
      'https://ui-avatars.com/api/?name=CodeMaster+Bot&background=7c3aed&color=fff&size=200&bold=true',
    collegeId: { name: 'Codnite Arena Engine', shortName: 'ARENA' },
    points: 750,
    stats: { problemsSolved: 0, totalBattles: 0, battlesWon: 0, currentStreak: 0 },
    badge: 'Voidbreaker',
  },
  {
    _id: '4',
    rank: 4,
    username: 'Shivam Kushwaha',
    avatarUrl:
      'https://lh3.googleusercontent.com/a/ACg8ocK_BswOB1fVcWYPfhtUxYH_jr7kHsLHxIu-1eXs4m-Hs8gr-Ekr=s96-c',
    collegeId: { name: 'United College of Engineering and Research', shortName: 'UCER' },
    points: 735,
    stats: { problemsSolved: 4, totalBattles: 2, battlesWon: 2, currentStreak: 1 },
    badge: 'Voidbreaker',
  },
  {
    _id: '5',
    rank: 5,
    username: 'Isha',
    avatarUrl:
      'https://lh3.googleusercontent.com/a/ACg8ocI9EdG3ALxori9GhQQSXMPxi2_FX_eBhRSVgiCEzosI6sVKNYym=s96-c',
    collegeId: { name: 'United College of Engineering and Research', shortName: 'UCER' },
    points: 115,
    stats: { problemsSolved: 1, totalBattles: 0, battlesWon: 0, currentStreak: 1 },
    badge: 'Driftwalker',
  },
  {
    _id: '6',
    rank: 6,
    username: 'Neeraj Maurya',
    avatarUrl:
      'https://lh3.googleusercontent.com/a/ACg8ocLWh5tbNbi3G8jU7kujv0fyf-VeP2cZpUekN4BCQGtlNQWIvqX3=s96-c',
    collegeId: { name: 'United College of Engineering and Research', shortName: 'UCER' },
    points: 40,
    stats: { problemsSolved: 0, totalBattles: 0, battlesWon: 0, currentStreak: 1 },
    badge: 'Spark',
  },
  {
    _id: '7',
    rank: 7,
    username: 'Harsh Vardhan Singh',
    avatarUrl:
      'https://ui-avatars.com/api/?name=Harsh+Vardhan&background=27272a&color=fff&size=200&bold=true',
    collegeId: { name: 'Collegiate Division', shortName: 'DIV' },
    points: 20,
    stats: { problemsSolved: 0, totalBattles: 0, battlesWon: 0, currentStreak: 1 },
    badge: 'Spark',
  },
  {
    _id: '8',
    rank: 8,
    username: 'Sagar Gupta',
    avatarUrl:
      'https://lh3.googleusercontent.com/a/ACg8ocKFaAXBrkuOxy9oABf-LMun-Mj0nIVfisU8KpvLNYXYP5OO3Ssm=s96-c',
    collegeId: { name: 'Collegiate Division', shortName: 'DIV' },
    points: 15,
    stats: { problemsSolved: 0, totalBattles: 0, battlesWon: 0, currentStreak: 1 },
    badge: 'Spark',
  },
  {
    _id: '9',
    rank: 9,
    username: 'Mridul Singh',
    avatarUrl:
      'https://lh3.googleusercontent.com/a/ACg8ocLtbkLlWYA8KpbuRMbYTn3n81exe_BZF5beLVMVBKXh_yTHzEPMIA=s96-c',
    collegeId: { name: 'United College of Engineering and Research', shortName: 'UCER' },
    points: 15,
    stats: { problemsSolved: 0, totalBattles: 0, battlesWon: 0, currentStreak: 1 },
    badge: 'Spark',
  },
  {
    _id: '10',
    rank: 10,
    username: 'IIT Bombay Fest',
    avatarUrl:
      'https://lh3.googleusercontent.com/a/ACg8ocLFDZJFVOSj72RhlCY2GO34_6dJ-nW_fDwxxmVkbVmSlDcXIQ=s96-c',
    collegeId: { name: 'IIT Bombay Arena Chapter', shortName: 'IITB' },
    points: 10,
    stats: { problemsSolved: 0, totalBattles: 0, battlesWon: 0, currentStreak: 2 },
    badge: 'Spark',
  },
];

// Helper to reliably navigate to the main web app in both local dev (port 4173 -> 5173) and production (/app/*)
const getMainAppUrl = (path: string) => {
  if (typeof window !== 'undefined' && window.location.port === '4173') {
    return `http://localhost:5173/app${path}`;
  }
  return `/app${path}`;
};

export const HallOfFame: React.FC = () => {
  const [users, setUsers] = useState<User[]>(FALLBACK_USERS);
  const [activeUserId, setActiveUserId] = useState<string>('1');
  const [viewTab, setViewTab] = useState<'console' | 'podium'>('console');

  // Fetch real leaderboard data from production API
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://codnite-backend-3.onrender.com/api';
    fetch(`${apiUrl}/leaderboard?limit=10`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.leaderboard && data.leaderboard.length >= 3) {
          const mapped: User[] = data.leaderboard.map((u: any, idx: number) => {
            const badgeObj = getBadgeForPoints(u.points || 0);
            return {
              _id: u.id || u._id || String(idx + 1),
              rank: idx + 1,
              username: u.name || u.username || `Gladiator_${idx + 1}`,
              avatarUrl: u.avatarUrl,
              collegeId: u.college || {
                name: u.collegeName || 'Collegiate Division',
                shortName: u.college?.shortName || (u.collegeName ? u.collegeName.slice(0, 4).toUpperCase() : 'DIV'),
              },
              points: u.points || 0,
              stats: {
                problemsSolved:
                  u.stats?.problemsSolved || u.stats?.problemAcceptedCount || u.acceptedCount || 0,
                totalBattles: u.stats?.totalBattles || 0,
                battlesWon: u.stats?.battlesWon || 0,
                currentStreak: u.currentStreak || u.stats?.currentStreak || 1,
              },
              badge: badgeObj.name,
            };
          });
          setUsers(mapped);
          if (mapped.length > 0) {
            setActiveUserId(mapped[0]._id);
          }
        }
      })
      .catch((err) => console.warn('Leaderboard API fetch note (using verified fallback):', err));
  }, []);

  const activeGladiator = users.find((u) => u._id === activeUserId) || users[0] || FALLBACK_USERS[0];
  const gladiatorLevel = computeLevelFromPoints(activeGladiator.points);
  const gladiatorBadge = getBadgeForPoints(activeGladiator.points);

  const champion = users[0] || FALLBACK_USERS[0];
  const silver = users[1] || FALLBACK_USERS[1];
  const bronze = users[2] || FALLBACK_USERS[2];

  // Tactical styling based on gladiator rank / badge
  const getGladiatorTheme = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          border: 'border-amber-400/40 hover:border-amber-400/60',
          specular: 'via-amber-400/60',
          badgeBg: 'bg-amber-500/10 border-amber-400/30 text-amber-300',
          rankText: 'text-amber-300',
          ring: 'border-amber-400/80',
          gradientText: 'from-amber-100 via-amber-300 to-amber-500',
          tag: 'APEX GRANDMASTER',
        };
      case 2:
        return {
          border: 'border-cyan-400/35 hover:border-cyan-300/55',
          specular: 'via-cyan-300/60',
          badgeBg: 'bg-cyan-500/10 border-cyan-400/30 text-cyan-200',
          rankText: 'text-slate-200',
          ring: 'border-cyan-300/80',
          gradientText: 'from-slate-100 via-cyan-200 to-slate-400',
          tag: 'FROST CONTENDER',
        };
      case 3:
        return {
          border: 'border-orange-500/35 hover:border-orange-400/55',
          specular: 'via-orange-400/60',
          badgeBg: 'bg-orange-500/10 border-orange-400/30 text-orange-300',
          rankText: 'text-orange-300',
          ring: 'border-orange-400/80',
          gradientText: 'from-orange-100 via-amber-400 to-orange-500',
          tag: 'VOID CONTENDER',
        };
      default:
        return {
          border: 'border-white/15 hover:border-white/30',
          specular: 'via-zinc-400/60',
          badgeBg: 'bg-white/5 border-white/15 text-zinc-300',
          rankText: 'text-zinc-300',
          ring: 'border-zinc-500/80',
          gradientText: 'from-zinc-100 via-zinc-300 to-zinc-500',
          tag: 'ARENA GLADIATOR',
        };
    }
  };

  const theme = getGladiatorTheme(activeGladiator.rank);

  return (
    <section id="hall-of-fame" className="py-20 sm:py-28 relative bg-transparent overflow-hidden">
      {/* Precision Top Divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Subtle Tactical Background Ambient Matrix */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            <span>Hall of </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              Fame
            </span>
          </h2>

          <p className="mt-2 text-zinc-400 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto text-balance">
            The proving ground of collegiate algorithmic gladiators. Top rated engineers this season.
          </p>

          {/* View Mode Segmented Control (Clean, Sleek, Non-glowy) */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl relative">
            <button
              onClick={() => setViewTab('console')}
              className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs transition-colors duration-200 flex items-center gap-2 select-none ${
                viewTab === 'console'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {viewTab === 'console' && (
                <motion.div
                  layoutId="hofActiveTabPill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-white/[0.08] border border-white/15 rounded-xl shadow-sm"
                />
              )}
              <Activity className={`w-3.5 h-3.5 relative z-10 transition-colors ${viewTab === 'console' ? 'text-orange-400' : 'text-zinc-500'}`} />
              <span className="relative z-10 font-semibold tracking-tight">Arena Command Console</span>
            </button>

            <button
              onClick={() => setViewTab('podium')}
              className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs transition-colors duration-200 flex items-center gap-2 select-none ${
                viewTab === 'podium'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {viewTab === 'podium' && (
                <motion.div
                  layoutId="hofActiveTabPill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-white/[0.08] border border-white/15 rounded-xl shadow-sm"
                />
              )}
              <Trophy className={`w-3.5 h-3.5 relative z-10 transition-colors ${viewTab === 'podium' ? 'text-amber-400' : 'text-zinc-500'}`} />
              <span className="relative z-10 font-semibold tracking-tight">Apex Podium (Top 3)</span>
            </button>
          </div>
        </div>

        {/* ── VIEW 1: ARENA COMMAND CONSOLE (FLAGSHIP INTERACTIVE DECK) ── */}
        {viewTab === 'console' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-center max-w-6xl mx-auto">
            
            {/* ── LEFT PANEL: THE DYNAMIC GLADIATOR COMBAT DOSSIER (7 cols) ── */}
            <div className="lg:col-span-7 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGladiator._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`relative rounded-3xl bg-black/40 backdrop-blur-2xl border ${theme.border} p-6 sm:p-7 overflow-hidden shadow-2xl transition-all duration-300 min-h-[490px] flex flex-col justify-between`}
                >
                  {/* Specular Top Rim */}
                  <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${theme.specular} to-transparent`} />

                  {/* Header Row: Rank Badge + Division Status */}
                  <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-extrabold ${theme.badgeBg}`}>
                      {activeGladiator.rank === 1 && <Crown className="w-4 h-4 fill-amber-400/30 text-amber-400" />}
                      <span>#{activeGladiator.rank.toString().padStart(2, '0')} {theme.tag}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LIVE TELEMETRY</span>
                    </div>
                  </div>

                  {/* Gladiator Identity Section */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-5 relative z-10">
                    {/* Clean Avatar without glowing blob or crown pin */}
                    <div className="relative shrink-0">
                      <img
                        src={
                          activeGladiator.avatarUrl ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(activeGladiator.username)}&background=ea580c&color=fff&size=200&bold=true`
                        }
                        alt={activeGladiator.username}
                        className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full border-2 ${theme.ring} object-cover`}
                      />
                    </div>

                    {/* Handle & Collegiate Info */}
                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h3 className="font-extrabold text-white text-2xl sm:text-3xl tracking-tight leading-tight truncate">
                          {activeGladiator.username}
                        </h3>
                        {activeGladiator.rank === 1 && (
                          <span title="Verified Apex Gladiator">
                            <CheckCircle2 className="w-5 h-5 text-amber-400 fill-amber-400/20 shrink-0" />
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-zinc-400 text-xs sm:text-sm mt-1">
                        <GraduationCap className="w-4 h-4 text-orange-400 shrink-0" />
                        <span className="truncate">{activeGladiator.collegeId?.name || 'Collegiate Division'}</span>
                      </div>

                      {/* Role & Level Pill */}
                      <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <div className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1.5 ${gladiatorBadge.badgeBg} ${gladiatorBadge.badgeBorder} ${gladiatorBadge.badgeText}`}>
                          <span>{gladiatorBadge.icon}</span>
                          <span>{gladiatorBadge.name} Tier</span>
                        </div>
                        <span className="text-xs font-mono text-zinc-500">·</span>
                        <span className="text-xs font-mono text-zinc-400">Level {gladiatorLevel.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hero XP Meter */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-5 relative z-10">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Combat Rating / XP</span>
                      <div className="text-right">
                        <span className={`text-2xl sm:text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                          {activeGladiator.points.toLocaleString()}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 ml-1.5 font-bold">XP</span>
                      </div>
                    </div>

                    {/* Level Progress Rail */}
                    <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden p-0.5 border border-white/[0.06]">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-300 rounded-full transition-all duration-500"
                        style={{ width: `${gladiatorLevel.progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 mt-1.5">
                      <span>Level {gladiatorLevel.level} ({gladiatorBadge.name})</span>
                      <span>{Math.round(gladiatorLevel.progress)}% to Level {gladiatorLevel.level + 1}</span>
                    </div>
                  </div>

                  {/* 4 Combat Telemetry Tiles (Guaranteed Rich Metrics for Every User) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center relative z-10 mb-5">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/[0.08]">
                      <span className="block text-lg sm:text-xl font-mono font-black text-white leading-tight">
                        {activeGladiator.stats.problemsSolved}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 flex items-center justify-center gap-1 mt-1">
                        <Code2 className="w-3 h-3 text-orange-400" /> Solved
                      </span>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/[0.08]">
                      <span className="block text-lg sm:text-xl font-mono font-black text-emerald-400 leading-tight">
                        Lvl {gladiatorLevel.level}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 flex items-center justify-center gap-1 mt-1">
                        <Shield className="w-3 h-3 text-emerald-400" /> Rank Tier
                      </span>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/[0.08]">
                      <span className="block text-lg sm:text-xl font-mono font-black text-amber-400 leading-tight">
                        {activeGladiator.stats.currentStreak || 1}d
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 flex items-center justify-center gap-1 mt-1">
                        <Flame className="w-3 h-3 text-amber-400" /> Streak
                      </span>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/[0.08]">
                      <span className="block text-lg sm:text-xl font-mono font-black text-cyan-300 leading-tight">
                        {activeGladiator.rank === 1
                          ? 'Top 0.1%'
                          : activeGladiator.rank <= 3
                          ? 'Top 1%'
                          : `Rank #${activeGladiator.rank}`}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 flex items-center justify-center gap-1 mt-1">
                        <Target className="w-3 h-3 text-cyan-400" /> Global ELO
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/[0.08] relative z-10 text-xs font-mono mt-auto">
                    <span className="text-zinc-500">
                      GLADIATOR ID: <span className="text-zinc-400">#{activeGladiator._id.slice(0, 8)}</span>
                    </span>
                    <a
                      href={getMainAppUrl('/battles?create=true')}
                      onClick={() => {
                        try {
                          sessionStorage.setItem('openCreateBattle', 'true');
                        } catch (_e) {
                          void 0;
                        }
                      }}
                      className="text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors font-semibold"
                    >
                      <span>Challenge in 1v1 Arena</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── RIGHT PANEL: LIVE TOURNAMENT LADDER (5 cols) ── */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 p-4 sm:p-5 shadow-2xl min-h-[490px] flex flex-col justify-between">
                
                <div>
                  {/* Ladder Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/[0.08] px-2">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                        Live Arena Roster
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {users.length} Gladiators Sync'd
                    </span>
                  </div>

                  {/* Contenders List with enabled native scrolling and Lenis prevention */}
                  <div
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    className="space-y-1.5 max-h-[355px] overflow-y-auto overscroll-contain pr-1.5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/[0.02] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-orange-500/80"
                  >
                  {users.slice(0, 10).map((user) => {
                    const isSelected = user._id === activeGladiator._id;
                    const isTop1 = user.rank === 1;
                    const isTop2 = user.rank === 2;
                    const isTop3 = user.rank === 3;
                    const badge = getBadgeForPoints(user.points);

                    return (
                      <button
                        key={user._id}
                        onClick={() => setActiveUserId(user._id)}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex items-center justify-between gap-3 group outline-none ${
                          isSelected
                            ? 'bg-orange-500/15 border border-orange-500/40 shadow-[0_0_15px_rgba(255,106,0,0.2)]'
                            : 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/15'
                        }`}
                      >
                        {/* Left: Rank Badge + Avatar + Names */}
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Rank Icon */}
                          <div className="shrink-0 flex justify-center w-6">
                            {isTop1 ? (
                              <span className="w-6 h-6 rounded-full bg-amber-400 text-black font-black font-mono text-xs flex items-center justify-center shadow-md">
                                1
                              </span>
                            ) : isTop2 ? (
                              <span className="w-6 h-6 rounded-full bg-slate-300 text-black font-black font-mono text-xs flex items-center justify-center">
                                2
                              </span>
                            ) : isTop3 ? (
                              <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-black font-mono text-xs flex items-center justify-center">
                                3
                              </span>
                            ) : (
                              <span className="text-zinc-500 font-mono text-xs font-bold">
                                {user.rank}
                              </span>
                            )}
                          </div>

                          {/* Avatar */}
                          <img
                            src={
                              user.avatarUrl ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=222&color=fff&size=80&bold=true`
                            }
                            alt={user.username}
                            className={`w-8 h-8 rounded-full object-cover shrink-0 border ${
                              isSelected
                                ? 'border-orange-400'
                                : isTop1
                                ? 'border-amber-400'
                                : isTop2
                                ? 'border-slate-300'
                                : isTop3
                                ? 'border-orange-500'
                                : 'border-white/10'
                            }`}
                          />

                          {/* Info */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-orange-200' : 'text-white'}`}>
                                {user.username}
                              </span>
                              {isTop1 && <Crown className="w-3 h-3 text-amber-400 shrink-0 fill-amber-400" />}
                            </div>
                            <div className="text-[11px] text-zinc-400 truncate flex items-center gap-1">
                              <span>{badge.icon}</span>
                              <span className="truncate">{user.collegeId?.shortName || 'UCER'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: XP Score */}
                        <div className="text-right shrink-0">
                          <div className={`font-mono font-extrabold text-xs sm:text-sm ${
                            isTop1 ? 'text-amber-300' : isTop2 ? 'text-slate-200' : isTop3 ? 'text-orange-400' : 'text-zinc-300'
                          }`}>
                            {user.points.toLocaleString()}
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">XP</span>
                        </div>
                      </button>
                    );
                  })}
                  </div>
                </div>

                <div className="mt-3 text-center pt-2.5 border-t border-white/[0.06]">
                  <span className="text-[11px] font-mono text-zinc-500">
                    💡 Click any gladiator to inspect live combat telemetry
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}


        {/* ── VIEW 2: APEX PODIUM (CLASSIC 3-TIER STAGE) ── */}
        {viewTab === 'podium' && (
          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* #02 Silver */}
              <div className="rounded-2xl bg-black/35 backdrop-blur-xl border border-slate-400/25 p-5 text-center">
                <div className="w-8 h-8 rounded-full bg-slate-300 text-black font-black font-mono text-sm mx-auto mb-3 flex items-center justify-center">
                  2
                </div>
                <img
                  src={silver.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(silver.username)}&background=0284c7&color=fff&size=100&bold=true`}
                  alt={silver.username}
                  className="w-16 h-16 rounded-full border-2 border-slate-300 mx-auto mb-3 object-cover shadow-lg"
                />
                <h4 className="font-bold text-white text-base truncate">{silver.username}</h4>
                <p className="text-xs text-zinc-400 truncate mt-0.5">{silver.collegeId?.name || 'UCER'}</p>
                <div className="mt-3 text-xl font-mono font-extrabold text-slate-200">
                  {silver.points.toLocaleString()} <span className="text-xs text-slate-400">XP</span>
                </div>
              </div>

              {/* #01 Gold (Elevated) */}
              <div className="rounded-3xl bg-black/45 backdrop-blur-2xl border-2 border-amber-400/50 p-7 text-center md:-translate-y-4 shadow-[0_0_35px_rgba(251,191,36,0.18)]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-mono font-bold text-amber-300 mb-3">
                  <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>#01 CHAMPION</span>
                </div>
                <img
                  src={champion.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(champion.username)}&background=ea580c&color=fff&size=120&bold=true`}
                  alt={champion.username}
                  className="w-20 h-20 rounded-full border-2 border-amber-300 mx-auto mb-3 object-cover shadow-xl"
                />
                <h4 className="font-black text-white text-xl truncate">{champion.username}</h4>
                <p className="text-xs text-zinc-400 truncate mt-0.5">{champion.collegeId?.name || 'UCER'}</p>
                <div className="mt-4 text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
                  {champion.points.toLocaleString()} <span className="text-sm text-amber-400">XP</span>
                </div>
              </div>

              {/* #03 Bronze */}
              <div className="rounded-2xl bg-black/35 backdrop-blur-xl border border-orange-500/25 p-5 text-center">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-black font-mono text-sm mx-auto mb-3 flex items-center justify-center">
                  3
                </div>
                <img
                  src={bronze.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(bronze.username)}&background=7c3aed&color=fff&size=100&bold=true`}
                  alt={bronze.username}
                  className="w-16 h-16 rounded-full border-2 border-orange-500 mx-auto mb-3 object-cover shadow-lg"
                />
                <h4 className="font-bold text-white text-base truncate">{bronze.username}</h4>
                <p className="text-xs text-zinc-400 truncate mt-0.5">{bronze.collegeId?.name || 'UCER'}</p>
                <div className="mt-3 text-xl font-mono font-extrabold text-orange-400">
                  {bronze.points.toLocaleString()} <span className="text-xs text-orange-500">XP</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── BOTTOM TACTICAL ACTION DOCK (Clean, Premium, Non-Glowy) ── */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href={getMainAppUrl('/leaderboard')}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <span>View Complete Global Leaderboard</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href={getMainAppUrl('/battles?create=true')}
            onClick={() => {
              try {
                sessionStorage.setItem('openCreateBattle', 'true');
              } catch (_e) {
                void 0;
              }
            }}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-all backdrop-blur-md active:scale-[0.98]"
          >
            <Swords className="w-4 h-4 text-orange-400" />
            <span>Create or Join 1v1 Battle</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default HallOfFame;


