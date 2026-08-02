import React from 'react';
import { motion } from 'framer-motion';

export const Circuitry = ({ className = "" }) => {
  // A complex SVG path representing PCB traces
  // Using multiple paths for different glow intensities and animations
  return (
    <svg 
      viewBox="0 0 400 800" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMinYMid slice"
    >
      <defs>
        <linearGradient id="circuit-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2D7DFF" stopOpacity="0" />
        </linearGradient>
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#neon-glow)" strokeWidth="2">
        {/* Main traces */}
        <path 
          d="M 0 100 L 100 100 L 150 150 L 150 300 L 200 350 L 300 350" 
          stroke="url(#circuit-glow)" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M 0 200 L 80 200 L 120 240 L 120 400 L 180 460 L 250 460" 
          stroke="#FF6A00" 
          strokeOpacity="0.5"
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M 0 500 L 100 500 L 160 560 L 160 700 L 220 760 L 350 760" 
          stroke="#FF6A00" 
          strokeOpacity="0.3"
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Nodes / terminals */}
        <circle cx="300" cy="350" r="4" fill="#FF6A00" />
        <circle cx="250" cy="460" r="3" fill="#FF6A00" fillOpacity="0.5" />
        <circle cx="350" cy="760" r="5" fill="#FF6A00" fillOpacity="0.3" />
        <circle cx="100" cy="100" r="2" fill="#FF6A00" />
        <circle cx="80" cy="200" r="2" fill="#FF6A00" />
        <circle cx="150" cy="300" r="2" fill="#FF6A00" />
        <circle cx="120" cy="400" r="2" fill="#FF6A00" />
        <circle cx="160" cy="700" r="2" fill="#FF6A00" />

        {/* Animated Pulses */}
        <motion.path
          d="M 0 100 L 100 100 L 150 150 L 150 300 L 200 350 L 300 350"
          stroke="#FFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 0 200 L 80 200 L 120 240 L 120 400 L 180 460 L 250 460"
          stroke="#2D7DFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 0 }}
          transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 0 500 L 100 500 L 160 560 L 160 700 L 220 760 L 350 760"
          stroke="#FF8C1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 0 }}
          transition={{ duration: 5, delay: 2, repeat: Infinity, ease: "linear" }}
        />
      </g>
    </svg>
  );
};
