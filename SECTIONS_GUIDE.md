# Codnite Landing Page - Section Guide

## 1. Hero Section
**Component:** `Hero.tsx`
- Fullscreen dark background with animated ember particles (Canvas API)
- Main headline: "Build. Collaborate. Dominate Code."
- Subtext about developers building together
- CTA button: "👉 Enter Codnite"
- Scroll indicator at bottom
- Animations: Text stagger reveal with blur-to-sharp effect

## 2. Problem Section
**Component:** `Problem.tsx`
- Three problem statements fade in on scroll:
  - "Coding alone feels slow."
  - "Tutorials don't build real skills."
  - "Projects get abandoned."
- Solution reveal: "What if coding felt multiplayer?"
- Animations: Each line fades in with vertical motion using GSAP ScrollTrigger

## 3. Product Reveal Section
**Component:** `ProductReveal.tsx`
- Split layout: Text on left, 3D-style mockup on right
- Headline: "Codnite is not a platform. It's a coding environment."
- Feature highlights with colored indicators:
  - Code Editor (orange)
  - Real-time Collaboration (cyan)
  - Challenges (purple)
  - Progress Tracking (green)
- Mockup: Terminal-style UI with live badges
- Animations: 3D rotation on scroll, feature highlights slide in

## 4. Features Section
**Component:** `Features.tsx`
- Grid of 4 interactive feature cards
- Each card has:
  - Large emoji icon
  - Title and description
  - Gradient glow effect on hover
  - Background gradient blur
- Features:
  - Code Together
  - Solve Challenges
  - Track Progress
  - Developer Community
- Animations: Cards scale and fade in on scroll

## 5. Experience Section
**Component:** `Experience.tsx`
- Animated gradient wave background (Canvas API)
- Centered text:
  - "This is not another platform you forget."
  - "This is where you show up daily."
  - "Built for developers who want real growth."
- Animations: Blur reveal effect, pulsing gradient

## 6. CTA Section
**Component:** `CTA.tsx`
- Minimal centered layout
- Headline: "Ready to stop watching and start building?"
- Large CTA button: "👉 Join Codnite"
- Small text: "No credit card required"
- Animations: Scale and blur reveal

## 7. Footer
**Component:** `Footer.tsx`
- Clean layout with logo and navigation links
- Links: About, Features, Pricing, Contact
- Copyright text
- Animations: Fade in on view

## Animation System

### Framer Motion
- Used for component-level animations
- Variants defined in `lib/animations.ts`
- Smooth transitions with custom easing

### GSAP + ScrollTrigger
- Used for scroll-based animations
- Scrub animations for smooth parallax effects
- Trigger points optimized for viewport

### Lenis
- Smooth scrolling throughout the page
- Custom easing function for natural feel
- Integrated with GSAP ScrollTrigger

## Color Palette

- Background: `#0A0A0A` (near black)
- Primary: `#FF6A00` (ember orange)
- Text: `#FFFFFF` (white)
- Secondary Text: `#9CA3AF` (gray-400)
- Borders: `#1F2937` (gray-800)

## Performance Optimizations

1. Canvas animations use requestAnimationFrame
2. GSAP ScrollTrigger with scrub for smooth performance
3. Lazy loading of heavy components
4. Optimized particle count (80 particles)
5. CSS transforms for hardware acceleration
6. Manual chunk splitting in Vite config
