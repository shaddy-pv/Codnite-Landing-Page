'use client';

import { CSSProperties, ReactNode } from 'react';

interface FloatingStatCardProps {
  children: ReactNode;
  className?: string;
  delay?: number; // seconds
  duration?: number; // seconds
}

/**
 * Requires the .animate-hero-float class + @keyframes from hero-animations.css
 * to be loaded globally (import it once in app/globals.css).
 */
export default function FloatingStatCard({
  children,
  className = '',
  delay = 0,
  duration = 6,
}: FloatingStatCardProps) {
  const style = {
    '--float-delay': `${delay}s`,
    '--float-duration': `${duration}s`,
  } as CSSProperties;

  return (
    <div
      style={style}
      className={`animate-hero-float rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md shadow-lg shadow-black/30 ${className}`}
    >
      {children}
    </div>
  );
}
