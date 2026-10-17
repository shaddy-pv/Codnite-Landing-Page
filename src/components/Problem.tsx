import React from 'react';
import { motion } from 'framer-motion';

export const Problem = React.memo(() => {
  const problems = [
    "Coding alone feels slow.",
    "Tutorials don't build real skills.",
    "Projects get abandoned."
  ];

  return (
    <section className="relative bg-transparent flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-4xl w-full space-y-6 sm:space-y-8 relative z-10">
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
          className="space-y-4 sm:space-y-6 md:space-y-8"
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
              className="text-2xl xs:text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500/80 to-gray-600/50">
                {problem}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mt-6 sm:mt-8 md:mt-10 leading-[1.15] tracking-tight"
        >
          <span>What if coding felt </span>
          <span className="text-transparent bg-clip-text" style={{
            backgroundImage: 'linear-gradient(135deg, #FF6A00, #FFB340)',
          }}>multiplayer</span>?
        </motion.div>
      </div>
    </section>
  );
});

export default Problem;
