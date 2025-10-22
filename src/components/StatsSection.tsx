import { useState } from "react";

type StatItem = {
  id: string;
  value: string;
  label: string;
};

 const Cloud: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <div
      className={
        `pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 z-20 ` +
        `transition-all duration-300 ` +
        (visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95")
      }
    >
      <div className="relative">
        {/* Cloud SVG */}
        <svg width="230" height="90" viewBox="0 0 230 90" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl">
          <defs>
            <filter id="softBlur" x="-50%" y="-50%" width="250%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            </filter>
          </defs>
          <path
            d="M50 65C34 65 24 57 24 46C24 35 33 27 45 27C48 18 57 12 68 12C82 12 93 21 96 33C104 29 112 28 120 30C131 18 152 19 162 31C178 30 192 41 192 55C192 69 180 80 165 80H76C64 80 55 75 50 65Z"
            fill="white" fillOpacity="0.95" filter="url(#softBlur)"
          />
          {/* Small puffs */}
          <circle cx="22" cy="48" r="8" fill="white" fillOpacity="0.9" />
          <circle cx="202" cy="56" r="7" fill="white" fillOpacity="0.9" />
        </svg>

        {/* Message */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <div className="w-[170px] translate-y-[1px] text-[13px] leading-tight font-semibold text-gray-800 text-center [text-shadow:0_1px_1px_rgba(0,0,0,0.1)] select-none">
            <span className="mr-1"></span>New hai na?Kr lo register 😭😭
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const stats: StatItem[] = [
    { id: "developers", value: "000+", label: "Developers" },
    { id: "challenges", value: "5+", label: "Coding Challenges" },
    { id: "universities", value: "115+", label: "Universities" },
  ];

  return (
    <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
      {stats.map((s) => (
        <div
          key={s.id}
          className="space-y-1 relative"
          onMouseEnter={() => setHovered(s.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="text-3xl md:text-4xl font-bold text-primary">{s.value}</div>
          <div className="text-sm text-muted-foreground">{s.label}</div>

          {/* Cloud */}
          <Cloud visible={hovered === s.id} />
        </div>
      ))}
    </div>
  );
};

export default StatsSection;


