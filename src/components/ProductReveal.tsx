import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export const ProductReveal = React.memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // 3D Mouse Parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const features = [
    { label: 'Code Editor', color: '#FF6A00' },
    { label: 'Real-time Collaboration', color: '#00D9FF' },
    { label: 'Challenges', color: '#FFB340' },
    { label: 'Progress Tracking', color: '#10B981' }
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 py-32 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        <div className="space-y-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight"
          >
            Codnite is not a platform.
            <br />
            It's a <span className="text-[#FF6A00] drop-shadow-sm">coding environment</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl text-gray-400/90 leading-relaxed max-w-[500px]"
          >
            Learn, build, compete, and grow — all directly from your browser.
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
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                  style={{ backgroundColor: feature.color, boxShadow: `0 0 15px ${feature.color}` }}
                />
                <span className="text-gray-300/90 text-lg font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3D Mockup area */}
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
          {/* Subtle background glow for the mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#FF6A00]/5 blur-[100px] rounded-full pointer-events-none" />

          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative bg-[#0F0F12] rounded-2xl p-8 border border-gray-800/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] will-change-transform backdrop-blur-xl"
          >
            <div className="flex gap-2.5 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80 hover:bg-[#FF5F56] transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 hover:bg-[#FFBD2E] transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]/80 hover:bg-[#27C93F] transition-colors"></div>
            </div>

            <div className="space-y-4 font-mono text-sm md:text-base selection:bg-[#FF6A00]/30 selection:text-white pb-6">
              <div className="text-[#FFB340]">
                <span className="text-[#FA70AD]">const</span> buildFuture = () =&gt; {'{'}
              </div>
              <div className="pl-6 text-[#92C5F9]">
                <span className="text-gray-500">return</span> <span className="text-[#86F28E]">'together'</span>;
                <span className="inline-block w-[8px] h-[1em] bg-[#FF6A00] ml-1 align-middle animate-blink ml-1"></span>
              </div>
              <div className="text-[#FFB340]">{'}'}</div>
            </div>

            {/* Floating Tags */}
            <div className="absolute -top-5 -right-5 bg-[#FF6A00] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-[0_10px_20px_-5px_rgba(255,106,0,0.5)] border border-[#FF6A00]/50 backdrop-blur-sm z-20">
              Live
            </div>

            <div className="absolute -bottom-6 -left-8 bg-black/80 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-2xl border border-gray-800/80 backdrop-blur-md z-20 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 border border-black"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 border border-black"></div>
              </div>
              2 developers coding
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

export default ProductReveal;
