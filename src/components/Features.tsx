import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Trophy, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Features = React.memo(() => {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: 'Code Together',
      description: 'Real-time collaboration with shared workspace.',
      icon: Zap,
      gradient: 'from-[#FF6A00]/20 to-transparent',
      borderColor: 'border-[#FF6A00]/10',
      hoverBorderColor: 'group-hover:border-[#FF6A00]/40'
    },
    {
      title: 'Solve Challenges',
      description: 'Practical coding problems with instant feedback.',
      icon: Trophy,
      gradient: 'from-[#7C3AED]/20 to-transparent',
      borderColor: 'border-[#7C3AED]/10',
      hoverBorderColor: 'group-hover:border-[#7C3AED]/40'
    },
    {
      title: 'Track Progress',
      description: 'Stay consistent with visible growth and stats.',
      icon: TrendingUp,
      gradient: 'from-[#00D9FF]/20 to-transparent',
      borderColor: 'border-[#00D9FF]/10',
      hoverBorderColor: 'group-hover:border-[#00D9FF]/40'
    },
    {
      title: 'Developer Community',
      description: 'Build with real developers, not alone.',
      icon: Users,
      gradient: 'from-[#10B981]/20 to-transparent',
      borderColor: 'border-[#10B981]/10',
      hoverBorderColor: 'group-hover:border-[#10B981]/40'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.feature-card');
      
      gsap.set(cards, { opacity: 0, y: 40 });

      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: batch => gsap.to(batch, {
          opacity: 1, 
          y: 0, 
          stagger: 0.15, 
          duration: 0.8,
          ease: 'power2.out',
          overwrite: true
        }),
        once: true
      });
    }, sectionRef);

    return () => ctx.revert(); // Only kills triggers created in this context
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="min-h-screen bg-[#0A0A0A] px-6 py-32 relative flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.03)_0%,transparent_50%)] blur-3xl mix-blend-screen pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-24 tracking-tight leading-[1.2]"
        >
          Everything you need to{' '}
          <span className="text-[#FF6A00] animate-pulse-glow inline-block px-1 rounded-sm">level up</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={index}
                className={`feature-card group relative bg-gradient-to-br from-gray-900/50 to-black/80 rounded-2xl p-8 lg:p-10 border ${feature.borderColor} ${feature.hoverBorderColor} transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(255,106,0,0.2)] will-change-transform backdrop-blur-sm`}
              >
                {/* Internal Layered Gradient Reveal */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen`} />
                <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF6A00]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-black/50 border border-gray-800 rounded-xl flex items-center justify-center mb-6 group-hover:border-gray-700 transition-colors duration-300 shadow-inner">
                    <Icon className="w-7 h-7 text-gray-400 group-hover:text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-[400px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Features;
