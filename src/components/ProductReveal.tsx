import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export const ProductReveal = React.memo(() => {
  // 3D Mouse Parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const highlights = [
    { label: 'Codnite IDE', description: 'Write, run, and debug code directly in your browser with sandboxed execution', color: '#FF6A00' },
    { label: '1v1 Code Battles', description: 'Head-to-head live algorithm duels, identical problem statements, fastest clean solution wins', color: '#FFB340' },
    { label: 'College Communities & Campus Lounge', description: 'Join your university hub with real-time spatial voice chat, study rooms, and campus battles', color: '#FF8533' },
    { label: 'XP & Leaderboards', description: 'Earn points, unlock badges, climb college and global ranks', color: '#FF6A00' }
  ];

  return (
    <section
      className="relative bg-transparent py-14 sm:py-18 md:py-20 overflow-hidden"
    >
      {/* Section top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl w-full grid lg:grid-cols-2 gap-10 lg:gap-14 items-center relative z-10">
        <div className="space-y-6 sm:space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight"
          >
            Codnite is not just a platform.
            <br />
            <span>It's a </span><span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(135deg, #FF6A00, #FFB340)',
            }}>coding arena</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg md:text-xl text-gray-400/90 leading-relaxed max-w-[500px]"
          >
            Solve problems, battle other developers, and grow with your college community directly in your browser.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.4 }
              }
            }}
            className="space-y-5 lg:mt-12"
          >
            {highlights.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="flex items-start gap-4 group"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-150 mt-2 flex-shrink-0"
                  style={{ backgroundColor: feature.color, boxShadow: `0 0 15px ${feature.color}40` }}
                />
                <div>
                  <span className="text-gray-200 text-lg font-medium tracking-wide group-hover:text-white transition-colors duration-300 block">
                    {feature.label}
                  </span>
                  <span className="text-gray-500 text-sm mt-0.5 block">
                    {feature.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3D Mockup - realistic Codnite session */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative lg:ml-10 py-6"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="glass-panel relative rounded-2xl p-6 md:p-8 will-change-transform shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_-8px_rgba(255,106,0,0.18)]"
          >
            {/* Glass diagonal specular sheen with contained rounded clipping */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.015] to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF6A00]/50 to-transparent" />
            </div>

            {/* Window chrome */}
            <div className="flex items-center gap-2.5 mb-6 relative z-10">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]/80"></div>
              <span className="text-zinc-500 text-xs font-mono ml-3">codnite - battle_arena.ts</span>
            </div>

            {/* Realistic code editor content */}
            <div className="space-y-3 font-mono text-[13px] md:text-sm selection:bg-[#FF6A00]/30 selection:text-white pb-4 relative z-10">
              <div>
                <span className="text-gray-600">{"1  "}</span>
                <span className="text-[#FA70AD]">import</span>
                <span className="text-gray-300">{" { "}</span>
                <span className="text-[#92C5F9]">Battle</span>
                <span className="text-gray-300">{", "}</span>
                <span className="text-[#92C5F9]">Problem</span>
                <span className="text-gray-300">{" } "}</span>
                <span className="text-[#FA70AD]">from</span>
                <span className="text-[#86F28E]">{" '@codnite/arena'"}</span>
              </div>
              <div>
                <span className="text-gray-600">{"2  "}</span>
              </div>
              <div>
                <span className="text-gray-600">{"3  "}</span>
                <span className="text-[#FA70AD]">const</span>
                <span className="text-[#92C5F9]">{" challenge"}</span>
                <span className="text-gray-300">{" = "}</span>
                <span className="text-[#FFB340]">Battle</span>
                <span className="text-gray-300">{".create({"}</span>
              </div>
              <div>
                <span className="text-gray-600">{"4  "}</span>
                <span className="text-gray-300 pl-6">{"mode: "}</span>
                <span className="text-[#86F28E]">'1v1'</span>
                <span className="text-gray-300">,</span>
              </div>
              <div>
                <span className="text-gray-600">{"5  "}</span>
                <span className="text-gray-300 pl-6">{"problem: "}</span>
                <span className="text-[#86F28E]">'two-sum'</span>
                <span className="text-gray-300">,</span>
              </div>
              <div>
                <span className="text-gray-600">{"6  "}</span>
                <span className="text-gray-300 pl-6">{"spectators: "}</span>
                <span className="text-[#FFB340]">true</span>
              </div>
              <div>
                <span className="text-gray-600">{"7  "}</span>
                <span className="text-gray-300">{")}"}</span>
                <span className="inline-block w-[8px] h-[1em] bg-[#FF6A00] ml-1 align-middle animate-blink"></span>
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] text-xs font-mono relative z-10">
              <div className="flex items-center gap-4">
                <span className="text-[#27C93F] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse"></span>
                  Connected
                </span>
                <span className="text-gray-600">TypeScript</span>
              </div>
              <span className="text-gray-600">Ln 7, Col 3</span>
            </div>

            {/* Floating Tags - Fully Visible, Contained */}
            <div className="absolute -top-3.5 right-3 sm:right-4 bg-zinc-900/95 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xl border border-white/15 backdrop-blur-md z-30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
              <span>1v1 Arena Live</span>
            </div>

            <div className="absolute -bottom-4 left-3 sm:left-4 bg-[#0A0A0A]/95 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-2xl border border-white/15 backdrop-blur-md z-30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shadow-[0_0_8px_#FF6A00]"></span>
              <span className="text-zinc-200">Codnite IDE Sandbox</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

export default ProductReveal;
