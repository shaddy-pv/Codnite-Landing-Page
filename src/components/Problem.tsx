import React from 'react';
import { motion } from 'framer-motion';

export const Problem = React.memo(() => {
  const problems = [
    "Coding alone feels slow.",
    "Tutorials don't build real skills.",
    "Projects get abandoned."
  ];

  return (
    <section className="min-h-[80vh] bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] blur-3xl mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.04)_0%,transparent_70%)] blur-3xl mix-blend-screen pointer-events-none" />
      
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-4xl w-full space-y-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.25 } 
            }
          }}
          className="space-y-8 md:space-y-10"
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
              className="text-[2rem] sm:text-[2.5rem] md:text-6xl font-bold text-center tracking-tight leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500/80 to-gray-600/50">
                {problem}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-4xl sm:text-5xl md:text-[5rem] font-bold text-white text-center mt-16 md:mt-20 leading-[1.1] tracking-tight"
        >
          What if coding felt{' '}
          <span className="text-transparent bg-clip-text" style={{
            backgroundImage: 'linear-gradient(135deg, #FF6A00, #FFB340)',
            filter: 'drop-shadow(0 0 25px rgba(255,106,0,0.4))',
          }}>multiplayer</span>?
        </motion.div>
      </div>
    </section>
  );
});

export default Problem;
