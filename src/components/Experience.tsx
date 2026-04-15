import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, School, Code2, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Sign Up Free',
    description: 'Create your account with Google, GitHub, or email. Takes 30 seconds.',
  },
  {
    icon: School,
    step: '02',
    title: 'Join Your College',
    description: 'Find your university and join the community. Compete with and for your college.',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Solve & Battle',
    description: 'Pick a problem, write code, run tests. Challenge others to 1v1 battles.',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Climb the Ranks',
    description: 'Earn XP, unlock badges, and rise on your college and global leaderboard.',
  },
];

export const Experience = React.memo(() => {
  return (
    <section id="how-it-works" className="relative bg-[#0A0A0A] px-6 py-32 overflow-hidden">
      {/* Section top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0 mix-blend-screen">
        <div className="absolute top-[30%] left-[20%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.06)_0%,transparent_60%)] blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] mb-6">
            How it{' '}
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(135deg, #FF6A00, #FFB340)',
            }}>works</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            From sign-up to leaderboard in four simple steps.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative group"
              >
                {/* Connecting line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%+4px)] w-[calc(100%-24px)] h-[1px] bg-gradient-to-r from-[#FF6A00]/20 to-transparent z-0" />
                )}

                <div className="relative bg-[#0F0F0F] rounded-2xl p-7 border border-white/[0.04] hover:border-[#FF6A00]/15 transition-all duration-500 h-full">
                  {/* Step number */}
                  <div className="text-[#FF6A00]/20 text-5xl font-bold absolute top-4 right-5 select-none">
                    {step.step}
                  </div>

                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 bg-[#FF6A00]/[0.08] border border-[#FF6A00]/10 group-hover:bg-[#FF6A00]/[0.12] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#FF6A00]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Experience;
