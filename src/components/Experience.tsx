import React from 'react';
import { motion } from 'framer-motion';

export const Experience = React.memo(() => {
  return (
    <section className="relative min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 py-32 overflow-hidden">
      {/* Dynamic CSS Background replacing Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0 mix-blend-screen">
        <motion.div 
          animate={{
            x: ["-5%", "5%"],
            y: ["5%", "-5%"],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.1)_0%,transparent_60%)] blur-[80px]" 
        />
        <motion.div 
          animate={{
            x: ["5%", "-5%"],
            y: ["-5%", "5%"],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08)_0%,transparent_60%)] blur-[80px]" 
        />
      </div>

      <div className="relative z-10 max-w-4xl text-center">
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
          className="space-y-8"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 0.8, ease: "easeOut" } 
              }
            }}
            className="text-[3.5rem] md:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            This is not another platform you forget.
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 0.8, ease: "easeOut" } 
              }
            }}
            className="text-3xl md:text-4xl text-[#FF6A00] font-semibold drop-shadow-[0_0_20px_rgba(255,106,0,0.3)] tracking-tight"
          >
            This is where you show up daily.
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 0.8, ease: "easeOut" } 
              }
            }}
            className="text-xl md:text-2xl text-gray-400 mt-12 font-medium"
          >
            Built for developers who want real growth.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
});

export default Experience;
