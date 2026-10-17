import React, { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  hoverText?: string;
  isHovered?: boolean;
  delay?: number;
  duration?: number;
  ready?: boolean;
  className?: string;
}

// Clean, uniform cyber glyphs for initial site load decode
const TERMINAL_GLYPHS = '0123456789ABCDEFHKMNPXYZ#*+';

function getRandomScramble(str: string): string {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') res += ' ';
    else res += TERMINAL_GLYPHS[Math.floor(Math.random() * TERMINAL_GLYPHS.length)];
  }
  return res;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  hoverText,
  isHovered = false,
  delay = 0,
  duration = 750,
  ready = true,
  className = '',
}) => {
  // Initialize in scrambled state for initial page load decode
  const [displayText, setDisplayText] = useState<string>(() => getRandomScramble(text));
  const [hasResolved, setHasResolved] = useState<boolean>(false);
  const frameRef = useRef<number>(0);

  // ── 1. Initial Site Load Scramble Decode Animation ──
  useEffect(() => {
    if (!ready) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplayText(text);
      setHasResolved(true);
      return;
    }

    if (hasResolved) return;

    const startInitialAnimation = () => {
      const startTime = performance.now();
      const length = text.length;

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1.0, elapsed / duration);

        let result = '';
        let allSettled = true;

        for (let i = 0; i < length; i++) {
          const char = text[i];
          if (char === ' ') {
            result += ' ';
            continue;
          }

          const charThreshold = (i / length) * 0.65;

          if (progress >= charThreshold + 0.35) {
            result += char;
          } else {
            allSettled = false;
            if (progress >= charThreshold) {
              result +=
                Math.random() > 0.4
                  ? char
                  : TERMINAL_GLYPHS[Math.floor(Math.random() * TERMINAL_GLYPHS.length)];
            } else {
              result += TERMINAL_GLYPHS[Math.floor(Math.random() * TERMINAL_GLYPHS.length)];
            }
          }
        }

        setDisplayText(result);

        if (!allSettled && progress < 1.0) {
          frameRef.current = requestAnimationFrame(update);
        } else {
          setDisplayText(text);
          setHasResolved(true);
        }
      };

      frameRef.current = requestAnimationFrame(update);
    };

    const timeoutId = window.setTimeout(startInitialAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameRef.current);
    };
  }, [ready, text, delay, duration, hasResolved]);

  const hasHoverAlternative = Boolean(hoverText && hoverText !== text);

  return (
    <span
      className="relative inline-flex flex-col h-[1.14em] leading-[1.14em] overflow-hidden align-top select-none"
      aria-label={isHovered && hoverText ? hoverText : text}
    >
      <span
        className="inline-flex flex-col transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: isHovered && hasHoverAlternative ? 'translateY(-50%)' : 'translateY(0%)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Primary Text: Scrambles on page load, smoothly rolls up on hover */}
        <span
          className={`block h-[1.14em] leading-[1.14em] whitespace-nowrap transition-all duration-350 ease-out ${
            isHovered && hasHoverAlternative
              ? 'opacity-0 -translate-y-1 filter blur-[1px]'
              : 'opacity-100 translate-y-0 filter blur-0'
          } ${className}`}
        >
          {displayText}
        </span>

        {/* Hover Alternative Text: Normal smooth slide in from below without scramble */}
        {hasHoverAlternative && (
          <span
            className={`block h-[1.14em] leading-[1.14em] whitespace-nowrap transition-all duration-350 ease-out ${
              isHovered
                ? 'opacity-100 translate-y-0 filter blur-0'
                : 'opacity-0 translate-y-1 filter blur-[1px]'
            } ${className}`}
          >
            {hoverText}
          </span>
        )}
      </span>
    </span>
  );
};

export default ScrambleText;
