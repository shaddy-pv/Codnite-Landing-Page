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
    { label: 'Monaco Code Editor', description: 'Write, run, and debug code directly in your browser', color: '#FF6A00' },
    { label: '1v1 Code Battles', description: 'Challenge anyone — same problem, fastest clean solution wins', color: '#FFB340' },
    { label: 'College Communities', description: 'Join your university hub. Team battles, shared rankings', color: '#FF8533' },
    { label: 'XP & Leaderboards', description: 'Earn points, unlock badges, climb college and global ranks', color: '#FF6A00' }
  ];

  return (
    <section
      className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 py-32 overflow-hidden relative"
    >
      {/* Section top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        <div className="space-y-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight"
          >
            Codnite is not just a platform.
            <br />
            It's a <span className="text-transparent bg-clip-text" style={{
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
            Solve problems, battle other developers, and grow with your college community — all from your browser.
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

        {/* 3D Mockup — realistic Codnite session */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative lg:ml-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#FF6A00]/[0.04] blur-[100px] rounded-full pointer-events-none" />

          <motion.div
            style={{ rotateX, rotateY }}
            className="relative bg-[#0F0F0F] rounded-2xl p-6 md:p-8 border border-white/[0.06] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] will-change-transform backdrop-blur-xl"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]/80"></div>
              <span className="text-gray-600 text-xs font-mono ml-3">codnite — battle_arena.ts</span>
            </div>

            {/* Realistic code editor content */}
            <div className="space-y-3 font-mono text-[13px] md:text-sm selection:bg-[#FF6A00]/30 selection:text-white pb-4">
              <div>
                <span className="text-gray-600">1  </span>
                <span className="text-[#FA70AD]">import</span>
                <span className="text-gray-300"> {'{'} </span>
                <span className="text-[#92C5F9]">Battle</span>
                <span className="text-gray-300">{', '}</span>
                <span className="text-[#92C5F9]">Problem</span>
                <span className="text-gray-300"> {'}'} </span>
                <span className="text-[#FA70AD]">from</span>
                <span className="text-[#86F28E]"> '@codnite/arena'</span>
              </div>
              <div>
                <span className="text-gray-600">2  </span>
              </div>
              <div>
                <span className="text-gray-600">3  </span>
                <span className="text-[#FA70AD]">const</span>
                <span className="text-[#92C5F9]"> challenge</span>
                <span className="text-gray-300"> = </span>
                <span className="text-[#FFB340]">Battle</span>
                <span className="text-gray-300">.create({'{'}</span>
              </div>
              <div>
                <span className="text-gray-600">4  </span>
                <span className="text-gray-300 pl-6">mode: </span>
                <span className="text-[#86F28E]">'1v1'</span>
                <span className="text-gray-300">,</span>
              </div>
              <div>
                <span className="text-gray-600">5  </span>
                <span className="text-gray-300 pl-6">problem: </span>
                <span className="text-[#86F28E]">'two-sum'</span>
                <span className="text-gray-300">,</span>
              </div>
              <div>
                <span className="text-gray-600">6  </span>
                <span className="text-gray-300 pl-6">spectators: </span>
                <span className="text-[#FFB340]">true</span>
              </div>
              <div>
                <span className="text-gray-600">7  </span>
                <span className="text-gray-300">{'})'}</span>
                <span className="inline-block w-[8px] h-[1em] bg-[#FF6A00] ml-1 align-middle animate-blink"></span>
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] text-xs font-mono">
              <div className="flex items-center gap-4">
                <span className="text-[#27C93F] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse"></span>
                  Connected
                </span>
                <span className="text-gray-600">TypeScript</span>
              </div>
              <span className="text-gray-600">Ln 7, Col 3</span>
            </div>

            {/* Floating Tags */}
            <div className="absolute -top-4 -right-4 bg-[#FF6A00] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-[0_10px_20px_-5px_rgba(255,106,0,0.5)] border border-[#FF6A00]/50 backdrop-blur-sm z-20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Live Battle
            </div>

            <div className="absolute -bottom-5 -left-6 bg-[#0A0A0A]/90 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl border border-white/[0.06] backdrop-blur-md z-20 flex items-center gap-2.5">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 border border-black"></div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 border border-black"></div>
              </div>
              2 devs battling
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

export default ProductReveal;
