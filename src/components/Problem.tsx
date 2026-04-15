import React from 'react';
import { motion } from 'framer-motion';

export const Problem = React.memo(() => {
  const problems = [
    "Coding alone feels slow.",
    "Tutorials don't build real skills.",
    "Projects get abandoned."
  ];

  return (
    <section className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] blur-3xl mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.03)_0%,transparent_70%)] blur-3xl mix-blend-screen pointer-events-none" />

      <div className="max-w-4xl w-full space-y-16 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.2 } 
            }
          }}
          className="space-y-12 md:space-y-16"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.8, ease: "easeOut" } 
                }
              }}
              className="text-[2.5rem] md:text-6xl font-bold text-gray-500/80 text-center tracking-tight leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500/80 to-gray-600/60">
                {problem}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-5xl md:text-[5rem] font-bold text-white text-center mt-32 leading-[1.1] tracking-tight"
        >
          What if coding felt{' '}
          <span className="text-[#FF6A00] drop-shadow-[0_0_20px_rgba(255,106,0,0.3)]">multiplayer</span>?
        </motion.div>
      </div>
    </section>
  );
});

export default Problem;
