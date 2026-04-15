import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import SymbolParticles from '@/components/SymbolParticles';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';

import { Problem } from '@/components/Problem';
import { ProductReveal } from '@/components/ProductReveal';
import { Features } from '@/components/Features';
import { Experience } from '@/components/Experience';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.25,
      wheelMultiplier: 1.2,
      smoothTouch: false,
    } as any);

    // Synchronize GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#0A0A0A] overflow-x-hidden relative selection:bg-orange-500/30 selection:text-orange-200">
      <CustomCursor />

      {/* Symbol particles — fixed background layer */}
      <SymbolParticles />

      {!loadingComplete && <Loader onComplete={() => setLoadingComplete(true)} />}

      <Navbar />
      <Hero />

      <Problem />
      <ProductReveal />
      <Features />
      <Experience />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
