import React, { useEffect, useRef } from 'react';

// ASCII Character Ramp from darkest to brightest (18 levels)
const ASCII_RAMP = '   ..::--==++**##%%@@';

// Precomputed color palettes (zero garbage collection allocations in 60FPS loop)
const WHITE_PALETTE = Array.from({ length: 21 }, (_, i) => `rgba(255, 255, 255, ${(i / 20).toFixed(2)})`);
const GOLD_PALETTE = Array.from({ length: 21 }, (_, i) => {
  const p = i / 20;
  const g = Math.floor(185 + p * 55);
  const b = Math.floor(25 + p * 145);
  const a = (0.80 + p * 0.20).toFixed(2);
  return `rgba(255, ${g}, ${b}, ${a})`;
});

// Anatomical cerebral vascular branching paths (normalized coordinates [nx, ny] relative to 1376x768 brain asset)
interface VeinBranch {
  pts: [number, number][];
  width: number;
}

const VEIN_BRANCHES: VeinBranch[] = [
  // --- 1. Sylvian Stem & Middle Cerebral Artery (MCA) Vascular Tree ---
  // Main MCA Trunk (Sylvian origin)
  { pts: [[0.65, 0.65], [0.65, 0.58], [0.64, 0.50], [0.63, 0.44]], width: 10.0 },

  // Rolandic / Central Sulcal Branch (ascending toward vertex)
  { pts: [[0.63, 0.44], [0.64, 0.35], [0.66, 0.25], [0.68, 0.16], [0.70, 0.09]], width: 7.5 },
  { pts: [[0.64, 0.35], [0.60, 0.28], [0.57, 0.22]], width: 5.0 },
  { pts: [[0.66, 0.25], [0.71, 0.21], [0.75, 0.16]], width: 5.0 },
  { pts: [[0.68, 0.16], [0.64, 0.13]], width: 4.0 },

  // Post-Central Branch (ascending to parietal convexity)
  { pts: [[0.64, 0.50], [0.69, 0.44], [0.74, 0.34], [0.78, 0.24], [0.80, 0.14]], width: 7.0 },
  { pts: [[0.74, 0.34], [0.79, 0.30], [0.83, 0.22], [0.85, 0.16]], width: 4.8 },
  { pts: [[0.69, 0.44], [0.73, 0.38], [0.76, 0.34]], width: 4.2 },

  // Pre-Central / Frontal Ascending Branch
  { pts: [[0.63, 0.44], [0.59, 0.40], [0.54, 0.35], [0.49, 0.30]], width: 7.2 },
  { pts: [[0.54, 0.35], [0.50, 0.42], [0.45, 0.45], [0.42, 0.48]], width: 5.0 },
  { pts: [[0.54, 0.35], [0.51, 0.27], [0.47, 0.21], [0.43, 0.17]], width: 5.0 },
  { pts: [[0.49, 0.30], [0.44, 0.30], [0.40, 0.34]], width: 4.2 },
  { pts: [[0.47, 0.21], [0.42, 0.23], [0.39, 0.28]], width: 4.0 },

  // Angular & Posterior MCA Branches (Parieto-Occipital)
  { pts: [[0.65, 0.58], [0.71, 0.53], [0.78, 0.47], [0.85, 0.41], [0.90, 0.33]], width: 7.5 },
  { pts: [[0.78, 0.47], [0.83, 0.51], [0.89, 0.49], [0.94, 0.44]], width: 5.2 },
  { pts: [[0.85, 0.41], [0.90, 0.41], [0.94, 0.37]], width: 4.5 },
  { pts: [[0.90, 0.33], [0.95, 0.31], [0.97, 0.27]], width: 4.0 },

  // --- 2. Anterior Cerebral Artery (Frontal contour & arch) ---
  { pts: [[0.53, 0.60], [0.48, 0.53], [0.44, 0.45], [0.41, 0.35], [0.42, 0.25], [0.46, 0.17], [0.52, 0.12]], width: 7.5 },
  { pts: [[0.48, 0.53], [0.43, 0.56], [0.38, 0.57]], width: 4.8 },
  { pts: [[0.44, 0.45], [0.39, 0.44], [0.36, 0.40]], width: 4.8 },
  { pts: [[0.41, 0.35], [0.37, 0.33], [0.36, 0.27]], width: 4.5 },
  { pts: [[0.46, 0.17], [0.50, 0.21], [0.54, 0.21]], width: 4.2 },

  // --- 3. Occipito-Parietal System ---
  { pts: [[0.74, 0.62], [0.80, 0.58], [0.86, 0.52], [0.92, 0.44], [0.96, 0.36]], width: 7.0 },
  { pts: [[0.86, 0.52], [0.91, 0.54], [0.96, 0.52]], width: 4.8 },
  { pts: [[0.92, 0.44], [0.96, 0.44], [0.98, 0.40]], width: 4.0 },

  // --- 4. Temporal Lobe System (Vein of Labbé & superficial temporal) ---
  { pts: [[0.60, 0.65], [0.65, 0.68], [0.72, 0.67], [0.78, 0.65]], width: 6.5 },
  { pts: [[0.65, 0.68], [0.62, 0.72], [0.57, 0.74]], width: 4.5 },
  { pts: [[0.72, 0.67], [0.75, 0.71], [0.80, 0.70]], width: 4.5 },
  { pts: [[0.60, 0.65], [0.55, 0.66], [0.50, 0.64], [0.46, 0.61]], width: 4.5 },

  // --- 5. Cerebellar & Brainstem System ---
  { pts: [[0.77, 0.74], [0.82, 0.77], [0.88, 0.79], [0.92, 0.81]], width: 6.0 },
  { pts: [[0.82, 0.77], [0.81, 0.83], [0.84, 0.88]], width: 4.5 },
  { pts: [[0.88, 0.79], [0.87, 0.84], [0.89, 0.88]], width: 4.5 },
  { pts: [[0.75, 0.76], [0.76, 0.84], [0.77, 0.92]], width: 5.0 }
];

function createVeinCanvas(sourceW: number, sourceH: number): HTMLCanvasElement {
  const vCanvas = document.createElement('canvas');
  vCanvas.width = sourceW;
  vCanvas.height = sourceH;
  const vCtx = vCanvas.getContext('2d');
  if (!vCtx) return vCanvas;

  vCtx.clearRect(0, 0, sourceW, sourceH);
  vCtx.lineCap = 'round';
  vCtx.lineJoin = 'round';

  for (const branch of VEIN_BRANCHES) {
    const pts = branch.pts;
    if (pts.length < 2) continue;

    vCtx.beginPath();
    const p0x = pts[0][0] * sourceW;
    const p0y = pts[0][1] * sourceH;
    vCtx.moveTo(p0x, p0y);

    for (let i = 0; i < pts.length - 1; i++) {
      const p1x = pts[i][0] * sourceW;
      const p1y = pts[i][1] * sourceH;
      const p2x = pts[i + 1][0] * sourceW;
      const p2y = pts[i + 1][1] * sourceH;
      const midX = (p1x + p2x) / 2;
      const midY = (p1y + p2y) / 2;
      vCtx.quadraticCurveTo(p1x, p1y, midX, midY);
    }
    const last = pts[pts.length - 1];
    vCtx.lineTo(last[0] * sourceW, last[1] * sourceH);

    vCtx.strokeStyle = '#FFFFFF';
    vCtx.lineWidth = branch.width;
    vCtx.stroke();
  }

  return vCanvas;
}

function hash2D(c: number, r: number, seed: number): number {
  let h = (c * 374761393 + r * 668265263 + seed * 1274126177) ^ 0x5bf03635;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export const AsciiHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let imgLoaded = false;
    const img = new Image();
    img.src = '/human-brain-ascii.webp';
    img.onerror = () => {
      // Fallback to png if webp not supported
      img.src = '/human-brain-ascii.png';
    };

    // Sampling canvas (at low grid resolution for fast sampling)
    const sampleCanvas = document.createElement('canvas');
    const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });

    // Companion vein sampling canvas
    const veinSampleCanvas = document.createElement('canvas');
    const veinSampleCtx = veinSampleCanvas.getContext('2d', { willReadFrequently: true });

    // High-resolution pre-rendered vein network template canvas
    let veinCanvas: HTMLCanvasElement | null = null;

    // Optimized cell size for razor-sharp typography at maximum 60FPS throughput
    const cellW = 7;
    const cellH = 11;

    interface BrainCell {
      c: number;
      r: number;
      idx: number;
      lum: number;
    }

    interface VeinCell {
      c: number;
      r: number;
      idx: number;
      veinVal: number;
      normY: number;
    }

    let cols = 0;
    let rows = 0;
    let brainCells: BrainCell[] = [];
    let veinCells: VeinCell[] = [];

    // Scroll transformation vectors (deterministic precomputed arrays)
    let scatterDirX: Float32Array | null = null;
    let scatterDirY: Float32Array | null = null;
    let scatterMaxDist: Float32Array | null = null;
    let scatterThresh: Float32Array | null = null;
    let scatterArc: Float32Array | null = null;
    let scatterZ: Float32Array | null = null;

    // Interactive mouse state
    let mouseX = -9999;
    let mouseY = -9999;
    let smoothMouseX = -9999;
    let smoothMouseY = -9999;
    let isMouseActive = false;
    let parallaxX = 0;
    let parallaxY = 0;

    // Continuous scroll transformation state
    let targetScrollProgress = 0;
    let smoothScrollProgress = 0;

    const updateGridSize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      if (width <= 0 || height <= 0) return;

      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);

      sampleCanvas.width = cols;
      sampleCanvas.height = rows;
      veinSampleCanvas.width = cols;
      veinSampleCanvas.height = rows;

      const totalCells = cols * rows;

      // Precompute deterministic scroll dispersion vectors for all cells
      scatterDirX = new Float32Array(totalCells);
      scatterDirY = new Float32Array(totalCells);
      scatterMaxDist = new Float32Array(totalCells);
      scatterThresh = new Float32Array(totalCells);
      scatterArc = new Float32Array(totalCells);
      scatterZ = new Float32Array(totalCells);

      const isMobileGrid = width < 768;
      const centerC = isMobileGrid ? cols * 0.5 : cols * 0.64;
      const centerR = isMobileGrid ? rows * 0.78 : rows * 0.55;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;

          const dc = c - centerC;
          const dr = (r - centerR) * 1.35;
          const distFromCenter = Math.hypot(dc, dr);
          const normDist = Math.min(1.0, distFromCenter / (rows * 0.42));

          const h1 = hash2D(c, r, 101);
          const h2 = hash2D(c, r, 202);
          const h3 = hash2D(c, r, 303);
          const h4 = hash2D(c, r, 404);
          const h5 = hash2D(c, r, 505);

          // Staggered detachment threshold:
          // Outer cortex particles start loosening at progress 0.04-0.16.
          // Deep core particles stay intact longer, loosening at progress 0.26-0.42.
          scatterThresh[idx] = 0.04 + (1 - normDist) * 0.26 + h1 * 0.12;

          // 360-degree omnidirectional dispersion:
          // Particles scatter outward across all 360 degrees from the brain center,
          // blended with organic fluid noise so they disperse evenly without clumping
          const radialAngle = Math.atan2(dr, dc);
          const turbulence = (h2 - 0.5) * 1.5 + Math.sin(c * 0.08 + r * 0.06) * 0.8;
          const angle360 = radialAngle + turbulence;

          scatterDirX[idx] = Math.cos(angle360);
          scatterDirY[idx] = Math.sin(angle360);

          // Subtle, restrained travel distances (25px to 80px) for clean organic deconstruction
          scatterMaxDist[idx] = 25 + h3 * 55;

          // Gentle perpendicular orbital arc offset during flight
          scatterArc[idx] = (h4 - 0.5) * 20;

          // 3D Depth z (-1 to +1)
          scatterZ[idx] = (h5 - 0.5) * 2;
        }
      }
    };

    // Pre-sample brain texture and vein contours strictly ONCE (zero getImageData during 60 FPS loop!)
    const resampleBrain = () => {
      if (!imgLoaded || cols === 0 || rows === 0 || !sampleCtx || !veinSampleCtx) return;

      const imgAspect = img.width / img.height;
      const cellAspectMult = cellH / cellW;
      const gridAspectThreshold = imgAspect * cellAspectMult;

      let drawW = cols;
      let drawH = rows;
      let drawX = 0;
      let drawY = 0;

      const isMobile = cols * cellW < 768;
      const isTablet = cols * cellW >= 768 && cols * cellW < 1024;

      // The human-brain-ascii.png source (1376x768) contains the brain strictly on the right (x: 480..1376).
      // Left 0..479 is empty black space. On mobile, we crop to the actual brain so it centers perfectly!
      const brainSrcX = 480;
      const brainSrcY = 0;
      const brainSrcW = 896;
      const brainSrcH = 768;
      const brainGridAspect = (brainSrcW / brainSrcH) * (cellH / cellW); // ~1.9444

      if (isMobile) {
        // Mobile portrait: scale to 88% screen width, center horizontally
        const targetW = Math.min(Math.round(cols * 0.88), cols - 2);
        drawW = targetW;
        drawH = Math.round(targetW / brainGridAspect);
        // Center perfectly: account for the brain being cropped from right side of source image
        drawX = Math.round((cols - drawW) / 2);
        
        // Buttons finish around row 47 (~470px). Center the brain in the remaining space below buttons
        const contentBottomRow = Math.round(470 / cellH);
        const availRows = Math.max(drawH, rows - contentBottomRow);
        drawY = contentBottomRow + Math.max(0, Math.round((availRows - drawH) / 2));
      } else if (isTablet) {
        // Tablet: balanced scale, slightly right and lower
        const brainScale = 0.78;
        drawH = Math.round(rows * brainScale);
        drawW = Math.round(drawH * gridAspectThreshold);
        drawX = Math.round(cols * 0.52 - drawW / 2);
        drawY = Math.round(rows * 0.50 - drawH / 2);
      } else {
        // Desktop: full right-side split presentation with 100% production scale and visual symmetry
        if (cols / rows > gridAspectThreshold) {
          drawW = cols;
          drawH = Math.round(cols / gridAspectThreshold);
          drawY = Math.round((rows - drawH) / 2);
        } else {
          drawH = rows;
          drawW = Math.round(rows * gridAspectThreshold);
          drawX = Math.round(cols - drawW);
        }

        const brainScale = 0.85;
        const origCenterX = drawX + drawW / 2;
        const origCenterY = drawY + drawH / 2;
        drawW = drawW * brainScale;
        drawH = drawH * brainScale;
        const rightShift = cols * 0.035;
        const downShift = rows * 0.02;
        drawX = origCenterX - drawW / 2 + rightShift;
        drawY = origCenterY - drawH / 2 + downShift;
      }

      sampleCtx.fillStyle = '#000000';
      sampleCtx.fillRect(0, 0, cols, rows);

      if (isMobile) {
        sampleCtx.drawImage(img, brainSrcX, brainSrcY, brainSrcW, brainSrcH, drawX, drawY, drawW, drawH);
        if (veinCanvas) {
          veinSampleCtx.fillStyle = '#000000';
          veinSampleCtx.fillRect(0, 0, cols, rows);
          veinSampleCtx.drawImage(veinCanvas, brainSrcX, brainSrcY, brainSrcW, brainSrcH, drawX, drawY, drawW, drawH);
        }
      } else {
        sampleCtx.drawImage(img, drawX, drawY, drawW, drawH);
        if (veinCanvas) {
          veinSampleCtx.fillStyle = '#000000';
          veinSampleCtx.fillRect(0, 0, cols, rows);
          veinSampleCtx.drawImage(veinCanvas, drawX, drawY, drawW, drawH);
        }
      }

      const imgData = sampleCtx.getImageData(0, 0, cols, rows).data;
      const veinImgData = veinSampleCtx.getImageData(0, 0, cols, rows).data;

      const nextBrainCells: BrainCell[] = [];
      const nextVeinCells: VeinCell[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p = idx * 4;
          const red = imgData[p];
          const green = imgData[p + 1];
          const blue = imgData[p + 2];

          let lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
          lum = Math.pow(lum, 1.2) * 1.35;
          lum = Math.max(0, Math.min(1, lum));

          const vVal = veinImgData[p] / 255;
          const isVein = lum > 0.08 && vVal > 0.08;

          if (isVein) {
            const normY = drawH > 0 ? (r - drawY) / drawH : 0.5;
            nextVeinCells.push({
              c,
              r,
              idx,
              veinVal: vVal,
              normY
            });
          } else if (lum >= 0.05) {
            nextBrainCells.push({
              c,
              r,
              idx,
              lum
            });
          }
        }
      }

      brainCells = nextBrainCells;
      veinCells = nextVeinCells;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      updateGridSize();
      resampleBrain();
    };

    const onImageReady = () => {
      imgLoaded = true;
      veinCanvas = createVeinCanvas(img.naturalWidth || 1376, img.naturalHeight || 768);
      resize();
    };

    if (img.complete && img.naturalWidth > 0) {
      onImageReady();
    } else {
      img.onload = onImageReady;
    }

    window.addEventListener('resize', resize);

    // Track scroll for continuous, physically reversible particle deconstruction
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      const scrollY = -rect.top;
      // Complete deconstruction & graceful dissolve before next section covers it
      const progress = Math.min(1.0, Math.max(0, scrollY / (heroHeight * 0.58)));
      targetScrollProgress = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Track mouse across the entire Hero section
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isMouseActive = true;
      } else {
        isMouseActive = false;
      }
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let isRunning = false;

    const startLoop = () => {
      if (!isRunning && isVisibleRef.current) {
        isRunning = true;
        cancelAnimationFrame(animationFrameId);
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };

    // Pause rendering when hero is scrolled out of view (true 0% idle CPU)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
          }
        });
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    const startTime = performance.now();
    let lastTime = performance.now();

    // ── Main Render Loop ──
    const render = (now: number) => {
      if (!isVisibleRef.current) {
        isRunning = false;
        return;
      }

      animationFrameId = requestAnimationFrame(render);

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (
        width <= 0 ||
        height <= 0 ||
        !imgLoaded ||
        brainCells.length === 0
      ) {
        return;
      }

      const dt = Math.min((now - lastTime) * 0.001, 0.05);
      lastTime = now;
      const time = (now - startTime) * 0.001;

      // Delta-time based smooth mouse interpolation
      if (smoothMouseX === -9999) {
        smoothMouseX = width < 768 ? width * 0.5 : width * 0.72;
        smoothMouseY = width < 768 ? height * 0.72 : height * 0.50;
      }
      if (isMouseActive) {
        const mouseEase = 1 - Math.exp(-12 * dt);
        smoothMouseX += (mouseX - smoothMouseX) * mouseEase;
        smoothMouseY += (mouseY - smoothMouseY) * mouseEase;
      }

      // Continuous spring-like scroll interpolation
      const scrollEase = 1 - Math.exp(-8 * dt);
      smoothScrollProgress += (targetScrollProgress - smoothScrollProgress) * scrollEase;

      // Parallax easing (subtle 3D float)
      const targetParallaxX = isMouseActive ? ((smoothMouseX - width * 0.78) / width) * 14 : 0;
      const targetParallaxY = isMouseActive ? ((smoothMouseY - height * 0.5) / height) * 10 : 0;
      const parallaxEase = 1 - Math.exp(-6 * dt);
      parallaxX += (targetParallaxX - parallaxX) * parallaxEase;
      parallaxY += (targetParallaxY - parallaxY) * parallaxEase;

      // Clear main canvas completely
      ctx.clearRect(0, 0, width, height);

      // ── Step C: Topographic Contour Waves in Background (Hacktron Style) ──
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const baseY = (height / 7) * (i + 1);
        for (let x = 0; x <= width; x += 25) {
          const wave = Math.sin(x * 0.003 + time * 0.35 + i) * 30 + Math.cos(x * 0.006 - time * 0.2 + i * 2) * 18;
          const y = baseY + wave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // ── Step E: Render Monospace ASCII Characters ──
      ctx.save();
      ctx.font = '9px "JetBrains Mono", "SF Mono", Consolas, monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      // ── Ascending Neural Signal Wave Propagation (End to Top / Brainstem to Cortex) ──
      const cycleDuration = 4.8;
      const cycleTime = time % cycleDuration;
      const travelDuration = 3.8;
      const isUpActive = cycleTime <= travelDuration + 0.25;
      const upProgress = Math.min(1.0, cycleTime / travelDuration);
      const upWavePos = 1.15 - upProgress * 1.30;

      // ── PASS 1: High-Performance Crisp White Brain Matter (Batched fast array) ──
      ctx.shadowBlur = 0;

      for (let i = 0; i < brainCells.length; i++) {
        const cell = brainCells[i];
        const { c, r, idx, lum } = cell;

        let px = c * cellW + cellW / 2 + parallaxX;
        let py = r * cellH + cellH / 2 + parallaxY;
        let alphaScale = 1.0;

        // Scroll-Driven Continuous Particle Deconstruction
        if (smoothScrollProgress > 0.001 && scatterThresh && scatterDirX && scatterDirY && scatterMaxDist && scatterArc) {
          const thresh = scatterThresh[idx];
          if (smoothScrollProgress > thresh) {
            const localP = Math.min(1.0, (smoothScrollProgress - thresh) / (1.0 - thresh));
            const smoothP = localP * localP * (3 - 2 * localP);

            const dirX = scatterDirX[idx];
            const dirY = scatterDirY[idx];
            const maxDist = scatterMaxDist[idx];
            const arc = scatterArc[idx];
            const arcOffset = Math.sin(smoothP * Math.PI) * arc;

            const driftDist = maxDist * smoothP;
            px += dirX * driftDist - dirY * arcOffset;
            py += dirY * driftDist + dirX * arcOffset;

            alphaScale = Math.max(0, 1.0 - Math.pow(smoothP, 1.35));
          }
        }

        // Proximity-Based Magnetic Mouse Influence
        if (isMouseActive) {
          const dx = px - smoothMouseX;
          const dy = py - smoothMouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 32400) { // 180px radius
            const dist = Math.sqrt(distSq);
            const mForce = Math.pow(1 - dist / 180, 2) * 11;
            px += (dx / (dist + 0.1)) * mForce;
            py += (dy / (dist + 0.1)) * mForce;
          }
        }

        let effectiveLum = lum;
        let isSpot = false;
        if (isMouseActive) {
          const dx = px - smoothMouseX;
          const dy = py - smoothMouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 36100) { // 190px radius
            const dist = Math.sqrt(distSq);
            const spot = Math.pow(1 - dist / 190, 2) * 0.5;
            effectiveLum = Math.min(1, lum + spot);
            if (spot > 0.06) isSpot = true;
          }
        }

        const shimmer = Math.sin(c * 0.18 + r * 0.14 + time * 2.0) * 0.06;
        effectiveLum = Math.max(0, Math.min(1, effectiveLum + shimmer));

        const charIdx = Math.floor(effectiveLum * (ASCII_RAMP.length - 1));
        const char = ASCII_RAMP[charIdx] || '.';

        const whiteAlpha = isSpot
          ? Math.min(1.0, effectiveLum * 1.25)
          : Math.min(0.85, effectiveLum * 1.05);

        const aIdx = Math.min(20, Math.max(0, Math.round(whiteAlpha * alphaScale * 20)));
        ctx.fillStyle = WHITE_PALETTE[aIdx] || WHITE_PALETTE[0];
        ctx.fillText(char, px, py);
      }

      // ── PASS 2: Batched Glowing Golden Veins (High-Performance Hardware Render) ──
      for (let i = 0; i < veinCells.length; i++) {
        const cell = veinCells[i];
        const { c, r, idx, veinVal, normY } = cell;

        let px = c * cellW + cellW / 2 + parallaxX;
        let py = r * cellH + cellH / 2 + parallaxY;
        let alphaScale = 1.0;

        // Scroll-Driven Continuous Particle Deconstruction
        if (smoothScrollProgress > 0.001 && scatterThresh && scatterDirX && scatterDirY && scatterMaxDist && scatterArc) {
          const thresh = scatterThresh[idx];
          if (smoothScrollProgress > thresh) {
            const localP = Math.min(1.0, (smoothScrollProgress - thresh) / (1.0 - thresh));
            const smoothP = localP * localP * (3 - 2 * localP);

            const dirX = scatterDirX[idx];
            const dirY = scatterDirY[idx];
            const maxDist = scatterMaxDist[idx];
            const arc = scatterArc[idx];
            const arcOffset = Math.sin(smoothP * Math.PI) * arc;

            const driftDist = maxDist * smoothP;
            px += dirX * driftDist - dirY * arcOffset;
            py += dirY * driftDist + dirX * arcOffset;

            alphaScale = Math.max(0, 1.0 - Math.pow(smoothP, 1.35));
          }
        }

        // Proximity-Based Magnetic Mouse Influence
        if (isMouseActive) {
          const dx = px - smoothMouseX;
          const dy = py - smoothMouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 32400) {
            const dist = Math.sqrt(distSq);
            const mForce = Math.pow(1 - dist / 180, 2) * 11;
            px += (dx / (dist + 0.1)) * mForce;
            py += (dy / (dist + 0.1)) * mForce;
          }
        }

        const pathCurvature = Math.sin(c * 0.16 + r * 0.11) * 0.06;
        const signalY = normY + pathCurvature;

        let neuralSignal = 0;
        if (isUpActive) {
          const distUp = upWavePos - signalY;
          if (distUp > -0.28 && distUp < 0.10) {
            const k = distUp < 0 ? 9 : 24;
            neuralSignal = Math.exp(- (distUp * k) * (distUp * k));
          }
        }

        const synChatter = neuralSignal > 0.08
          ? Math.sin(c * 1.8 + r * 2.4 + time * 18) * 0.12 * neuralSignal
          : 0;

        const basalRest = 0.18 + Math.sin(time * 2.0 + r * 0.09) * 0.05;
        const pulseSurge = Math.min(1.0, Math.max(0, basalRest + neuralSignal * 0.88 + synChatter));

        const vStrength = veinVal * 0.65 + pulseSurge * 0.55;
        let char = '*';
        if (vStrength > 0.72) char = '@';
        else if (vStrength > 0.52) char = '%';
        else if (vStrength > 0.34) char = '#';

        const gIdx = Math.min(20, Math.max(0, Math.round(pulseSurge * 20)));
        ctx.fillStyle = GOLD_PALETTE[gIdx] || GOLD_PALETTE[0];
        ctx.fillText(char, px, py);
      }

      ctx.restore();

      // ── Step G: Vignette Post-Effect ──
      ctx.save();
      const vRadius = Math.hypot(width / 2, height / 2);
      const vignetteGrad = ctx.createRadialGradient(
        width / 2, height / 2, vRadius * 0.35,
        width / 2, height / 2, vRadius
      );
      vignetteGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignetteGrad.addColorStop(0.75, 'rgba(0, 0, 0, 0.35)');
      vignetteGrad.addColorStop(1, 'rgba(0, 0, 0, 0.85)');

      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    };

    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
};

export default AsciiHeroBackground;
