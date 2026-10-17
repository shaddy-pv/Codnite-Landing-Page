// Level and badge definitions for Codnite
export interface LevelBadge {
  level: number;
  name: string;
  icon: string;
  color: string;
  glowColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  dotColor: string;
}

export const LEVEL_BADGES: LevelBadge[] = [
  {
    level: 1,
    name: 'Spark',
    icon: '🔥',
    color: 'text-orange-400',
    glowColor: 'rgba(249,115,22,0.8)',
    badgeBg: 'bg-orange-500/[0.04]',
    badgeBorder: 'border-orange-500/20',
    badgeText: 'text-orange-300',
    dotColor: 'bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)]',
  },
  {
    level: 2,
    name: 'Driftwalker',
    icon: '🌊',
    color: 'text-sky-400',
    glowColor: 'rgba(56,189,248,0.8)',
    badgeBg: 'bg-sky-500/[0.04]',
    badgeBorder: 'border-sky-500/20',
    badgeText: 'text-sky-300',
    dotColor: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]',
  },
  {
    level: 3,
    name: 'Ironclad',
    icon: '🛡️',
    color: 'text-slate-300',
    glowColor: 'rgba(148,163,184,0.8)',
    badgeBg: 'bg-slate-500/[0.04]',
    badgeBorder: 'border-slate-500/20',
    badgeText: 'text-slate-300',
    dotColor: 'bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.8)]',
  },
  {
    level: 4,
    name: 'Voidbreaker',
    icon: '🌀',
    color: 'text-violet-400',
    glowColor: 'rgba(139,92,246,0.8)',
    badgeBg: 'bg-violet-500/[0.04]',
    badgeBorder: 'border-violet-500/20',
    badgeText: 'text-violet-300',
    dotColor: 'bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]',
  },
  {
    level: 5,
    name: 'Emberstrike',
    icon: '⚡',
    color: 'text-amber-400',
    glowColor: 'rgba(245,158,11,0.8)',
    badgeBg: 'bg-amber-500/[0.04]',
    badgeBorder: 'border-amber-500/20',
    badgeText: 'text-amber-300',
    dotColor: 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
  },
  {
    level: 6,
    name: 'Frostweaver',
    icon: '❄️',
    color: 'text-cyan-400',
    glowColor: 'rgba(6,182,212,0.8)',
    badgeBg: 'bg-cyan-500/[0.04]',
    badgeBorder: 'border-cyan-500/20',
    badgeText: 'text-cyan-300',
    dotColor: 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]',
  },
  {
    level: 7,
    name: 'Shadowmeld',
    icon: '🌑',
    color: 'text-purple-400',
    glowColor: 'rgba(168,85,247,0.8)',
    badgeBg: 'bg-purple-500/[0.04]',
    badgeBorder: 'border-purple-500/20',
    badgeText: 'text-purple-300',
    dotColor: 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]',
  },
  {
    level: 8,
    name: 'Solaris',
    icon: '☀️',
    color: 'text-yellow-400',
    glowColor: 'rgba(234,179,8,0.8)',
    badgeBg: 'bg-yellow-500/[0.04]',
    badgeBorder: 'border-yellow-500/20',
    badgeText: 'text-yellow-300',
    dotColor: 'bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.8)]',
  },
  {
    level: 9,
    name: 'Nebula',
    icon: '🌌',
    color: 'text-indigo-400',
    glowColor: 'rgba(99,102,241,0.8)',
    badgeBg: 'bg-indigo-500/[0.04]',
    badgeBorder: 'border-indigo-500/20',
    badgeText: 'text-indigo-300',
    dotColor: 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]',
  },
  {
    level: 10,
    name: 'Apex Phantom',
    icon: '👁️',
    color: 'text-rose-400',
    glowColor: 'rgba(244,63,94,0.8)',
    badgeBg: 'bg-rose-500/[0.04]',
    badgeBorder: 'border-rose-500/20',
    badgeText: 'text-rose-300',
    dotColor: 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]',
  },
];

export function computeLevelFromPoints(points: number): {
  level: number;
  currentLevelPoints: number;
  nextLevelPoints: number;
  progress: number;
} {
  let level = 1;
  let accumulated = 0;

  while (level > 0) {
    const needed = level * 100;
    if (accumulated + needed > points) {
      const currentLevelPoints = accumulated;
      const nextLevelPoints = accumulated + needed;
      const progress = Math.min(100, ((points - currentLevelPoints) / needed) * 100);
      return { level, currentLevelPoints, nextLevelPoints, progress };
    }
    accumulated += needed;
    level++;
  }

  return { level: 1, currentLevelPoints: 0, nextLevelPoints: 100, progress: 0 };
}

export function getBadgeForPoints(points: number): LevelBadge {
  const { level } = computeLevelFromPoints(points || 0);
  const clamped = Math.min(Math.max(level, 1), 10);
  return LEVEL_BADGES[clamped - 1];
}
