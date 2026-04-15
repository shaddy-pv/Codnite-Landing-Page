import React, { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lazy load below-fold sections
const Problem = lazy(() => import('@/components/Problem'));
const ProductReveal = lazy(() => import('@/components/ProductReveal'));
const Features = lazy(() => import('@/components/Features'));
const Experience = lazy(() => import('@/components/Experience'));
const CTA = lazy(() => import('@/components/CTA'));
const Footer = lazy(() => import('@/components/Footer'));
const FeedbackButton = lazy(() => import('@/components/FeedbackButton'));

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

      {!loadingComplete && <Loader onComplete={() => setLoadingComplete(true)} />}

      <Navbar />
      <Hero />

      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
        <Problem />
        <ProductReveal />
        <Features />
        <Experience />
        <CTA />
        <Footer />
        <FeedbackButton />
      </Suspense>
    </div>
  );
};

export default Index;
