import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swords, Code2, Trophy, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Features = React.memo(() => {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: '1v1 Code Battles',
      description: 'Challenge friends or get matched with developers at your level. Same problem, same clock - fastest clean solution wins. Spectators can watch live.',
      icon: Swords,
      gradient: 'from-[#FF6A00]/15 to-transparent',
      accentColor: '#FF6A00',
    },
    {
      title: '1000+ Coding Problems',
      description: 'From arrays to dynamic programming. Write real code in our Monaco editor, run against test cases, get instant feedback on every submission.',
      icon: Code2,
      gradient: 'from-[#FFB340]/15 to-transparent',
      accentColor: '#FFB340',
    },
    {
      title: 'XP, Badges & Leaderboards',
      description: 'Earn points for every solve, streak, and battle win. Track your progress with daily streaks. Climb your college ranking and the global leaderboard.',
      icon: Trophy,
      gradient: 'from-[#FF8533]/15 to-transparent',
      accentColor: '#FF8533',
    },
    {
      title: 'College Communities',
      description: 'Join your university\'s coding hub. College battles, role hierarchy (Leader, Co-Leader, Elite, Member), shared rankings, and community posts.',
      icon: Users,
      gradient: 'from-[#FF6A00]/15 to-transparent',
      accentColor: '#FF6A00',
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

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="min-h-screen bg-transparent px-6 py-32 relative flex items-center justify-center overflow-hidden"
    >
      {/* Section top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.03)_0%,transparent_50%)] blur-3xl mix-blend-screen pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 md:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] mb-6">
            Everything you need to{' '}
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(135deg, #FF6A00, #FFB340)',
            }}>level up</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            A complete toolkit built for developers who want real growth, not just another tutorial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="feature-card group relative bg-[#0F0F0F] rounded-2xl p-8 lg:p-10 border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(255,106,0,0.15)] will-change-transform"
              >
                {/* Internal Layered Gradient Reveal */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF6A00]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${feature.accentColor}10`,
                      border: `1px solid ${feature.accentColor}15`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6 transition-all duration-500 group-hover:rotate-12"
                      style={{ color: feature.accentColor }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed max-w-[400px] text-sm md:text-base">
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
