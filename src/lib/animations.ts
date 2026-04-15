import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = {
  initial: { opacity: 0, y: 60, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
};

export const slideIn = (direction: 'left' | 'right' = 'left') => ({
  initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
});

export const blurReveal = {
  initial: { opacity: 0, filter: 'blur(20px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
};

export const initScrollAnimations = () => {
  ScrollTrigger.refresh();
};
