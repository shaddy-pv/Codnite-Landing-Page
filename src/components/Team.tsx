import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Github, Linkedin, GraduationCap } from 'lucide-react';
import shadanPhoto from '@/assets/shadan.jpg';
import shivamPhoto from '@/assets/shivam.jpeg';

interface TeamMember {
  id: string;
  nameLine1: string;
  nameLine2: string;
  role: string;
  bio: string;
  college: string;
  photo: string;
  socials: {
    github?: string;
    linkedin?: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'shadan',
    nameLine1: 'Md Shadan',
    nameLine2: 'Siddiqui',
    role: 'FOUNDER & CEO',
    bio: 'Conceived and engineered Codnite from the ground up, building the in-browser cloud compiler, real-time 1v1 duel arena, collegiate tournament leagues, and career placement tracks.',
    college: 'United College of Engineering and Research',
    photo: shadanPhoto,
    socials: {
      linkedin: 'https://linkedin.com/in/md-shadan-siddiqui/',
      github: 'https://github.com/shaddy-pv/',
    },
  },
  {
    id: 'shivam',
    nameLine1: 'Shivam',
    nameLine2: 'Kushwaha',
    role: 'FOUNDING ENGINEER',
    bio: 'Backend contributor who developed the Codeforces problem API integration, contest problem synchronization, and platform dataset ingestion.',
    college: 'United College of Engineering and Research',
    photo: shivamPhoto,
    socials: {
      linkedin: 'https://www.linkedin.com/in/shivam0512/',
      github: 'https://github.com/Shivam-0512',
    },
  },
];

export function Team() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((curr) => (curr === 0 ? TEAM_MEMBERS.length - 1 : curr - 1));
  };

  const next = () => {
    setActiveIndex((curr) => (curr === TEAM_MEMBERS.length - 1 ? 0 : curr + 1));
  };

  const currentMember = TEAM_MEMBERS[activeIndex];
  const otherIndex = activeIndex === 0 ? 1 : 0;
  const otherMember = TEAM_MEMBERS[otherIndex];

  return (
    <section id="team" className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-transparent select-none">
      {/* Section top divider line */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Subtle ambient light halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-[#FF6A00]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

        {/* ── Top Section Header (Tightened Spacing) ── */}
        <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-2">
            <span>Meet the </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              team
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            The engineers turning algorithmic preparation and university rivalries into an intense, real-time arena.
          </p>
        </div>

        {/* ── Spotlight Presentation Showcase (Tightly Spaced Side-by-Side Images) ── */}
        <div className="relative w-full max-w-2xl lg:max-w-3xl mx-auto flex items-center justify-center min-h-[380px] sm:min-h-[420px]">

          {/* Peeking Inactive Card (Left Silhouette - Shown on xl screens where margins permit) */}
          <div
            onClick={prev}
            className="hidden xl:block absolute right-[100%] mr-5 top-1/2 -translate-y-1/2 w-[195px] h-[300px] rounded-[28px] overflow-hidden bg-[#121212]/90 border border-white/[0.06] opacity-30 hover:opacity-60 transition-all duration-300 cursor-pointer scale-95 blur-[0.5px] z-0 shadow-xl"
            title={`Switch to ${otherMember.nameLine1}`}
          >
            <img
              src={otherMember.photo}
              alt={otherMember.nameLine1}
              className="w-full h-full object-cover object-top grayscale"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Active Spotlight Card */}
          <div className="relative z-10 w-full flex items-center justify-center px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMember.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full"
              >
                {/* Founder Photo */}
                <div className="shrink-0 w-[210px] xs:w-[240px] sm:w-[260px] md:w-[290px] aspect-[4/5] rounded-[28px] overflow-hidden bg-zinc-900 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(255,106,0,0.15)] relative group">
                  <img
                    src={currentMember.photo}
                    alt={`${currentMember.nameLine1} ${currentMember.nameLine2}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-chip text-[11px] text-zinc-300 backdrop-blur-md">
                    <GraduationCap className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span className="truncate">{currentMember.college}</span>
                  </div>
                </div>

                {/* Founder Details */}
                <div className="text-center md:text-left flex flex-col justify-center">
                  {/* Role Tag */}
                  <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#FF6A00] font-semibold mb-1.5">
                    {currentMember.role}
                  </span>

                  {/* 2-Line Name */}
                  <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.16] sm:leading-[1.12] tracking-tight mb-3.5 sm:mb-4">
                    <span className="block">{currentMember.nameLine1}</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400">
                      {currentMember.nameLine2}
                    </span>
                  </h3>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mb-5 sm:mb-6 font-normal">
                    {currentMember.bio}
                  </p>

                  {/* Social Links Row */}
                  <div className="flex items-center justify-center md:justify-start gap-2.5 text-zinc-400 pt-1">
                    {currentMember.socials.linkedin && (
                      <a
                        href={currentMember.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl glass-chip hover:glass-chip-orange text-zinc-300 hover:text-orange-400 transition-all duration-200 flex items-center gap-2 text-xs font-medium"
                        aria-label={`${currentMember.nameLine1} on LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4 fill-current" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {currentMember.socials.github && (
                      <a
                        href={currentMember.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl glass-chip hover:glass-chip-orange text-zinc-300 hover:text-orange-400 transition-all duration-200 flex items-center gap-2 text-xs font-medium"
                        aria-label={`${currentMember.nameLine1} on GitHub`}
                      >
                        <Github className="w-4 h-4 fill-current" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Peeking Inactive Card (Right Silhouette - Shown on xl screens where margins permit) */}
          <div
            onClick={next}
            className="hidden xl:block absolute left-[100%] ml-5 top-1/2 -translate-y-1/2 w-[195px] h-[300px] rounded-[28px] overflow-hidden bg-[#121212]/90 border border-white/[0.06] opacity-30 hover:opacity-60 transition-all duration-300 cursor-pointer scale-95 blur-[0.5px] z-0 shadow-xl"
            title={`Switch to ${otherMember.nameLine1}`}
          >
            <img
              src={otherMember.photo}
              alt={otherMember.nameLine1}
              className="w-full h-full object-cover object-top grayscale"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        </div>

        {/* ── Navigation Controls (Refined Frosted Dark Glass Buttons) ── */}
        <div className="flex items-center justify-center gap-3 mt-6 sm:mt-7">
          <button
            onClick={prev}
            aria-label="Previous team member"
            className="w-11 h-11 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={next}
            aria-label="Next team member"
            className="w-11 h-11 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group backdrop-blur-md"
          >
            <ArrowRight className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* ── Build With Us Note ── */}
        <div className="mt-8 sm:mt-9 text-center">
          <p className="text-xs sm:text-sm text-zinc-500">
            Want to collaborate, contribute, or build with us? Email{' '}
            <a
              href="mailto:codnite.dev@gmail.com"
              className="text-[#FF6A00] font-medium hover:underline"
            >
              codnite.dev@gmail.com
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}

export default Team;
