import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Loader from '@/components/Loader';
import HeroSection from '@/components/HeroSection';
import { Navbar } from '@/components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { runWhenIdle } from '@/lib/idle';

// Statically import sections to enable synchronous hydration match
import Problem from '@/components/Problem';
import ProductReveal from '@/components/ProductReveal';
import Features from '@/components/Features';
import HallOfFame from '@/components/HallOfFame';
import Experience from '@/components/Experience';
import Team from '@/components/Team';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import FeedbackButton from '@/components/FeedbackButton';
import CosmicSpaceBackground from '@/components/CosmicSpaceBackground';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let updateFn: ((time: number) => void) | null = null;

    const cleanupIdle = runWhenIdle(() => {
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 0.65,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5,
        infinite: false,
      } as any);

      // Synchronize GSAP ScrollTrigger with Lenis
      lenis.on('scroll', ScrollTrigger.update);
      (window as any).lenis = lenis;

      updateFn = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateFn);
      gsap.ticker.lagSmoothing(200, 16);
    });

    return () => {
      cleanupIdle();
      (window as any).lenis = null;
      if (updateFn) {
        gsap.ticker.remove(updateFn);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-[#080808] text-white overflow-x-clip relative selection:bg-orange-500/30 selection:text-orange-200 min-h-screen">
      {/* Full-Page Unified Cosmic Space Background across every section */}
      <CosmicSpaceBackground />

      {/* Global Mouse Effect: Hacktron-Style Crosshairs, Telemetry HUD & Target Ring */}
      <CustomCursor />

      {!loadingComplete && <Loader onComplete={() => setLoadingComplete(true)} />}

      <div className="relative z-10">
        <Navbar />
        <HeroSection isLoaded={loadingComplete} />
        <Problem />
        <ProductReveal />
        <Features />
        <HallOfFame />
        <Experience />
        <Team />
        <CTA />
        <Footer />
        <FeedbackButton />
      </div>
    </div>
  );
};

export default Index;
