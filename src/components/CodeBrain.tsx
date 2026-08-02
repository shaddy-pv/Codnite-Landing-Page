import { useEffect, useRef, useCallback } from 'react';
import brainImgUrl from '@/assets/brain.png';

// ─── Programming Syntax Symbols ───
const SYNTAX = [
  '<', '>', '{', '}', '(', ')', '[', ']', ';', ':', '"', "'",
  '/', '\\', '|', '+', '-', '*', '&', '^', '%', '$', '#',
  '@', '!', '~', '=>', '&&', '||', '==', '::', '//',
];

// Catmull-Rom spline
function catmullRom(p0: number[], p1: number[], p2: number[], p3: number[], t: number): number[] {
  const t2 = t * t, t3 = t2 * t;
  return [
    0.5 * ((2*p1[0]) + (-p0[0]+p2[0])*t + (2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2 + (-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),
    0.5 * ((2*p1[1]) + (-p0[1]+p2[1])*t + (2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2 + (-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3),
  ];
}

function smoothPath(pts: number[][], density = 12): number[][] {
  if (pts.length < 2) return pts;
  const pad = [pts[0], ...pts, pts[pts.length - 1]];
  const out: number[][] = [];
  for (let i = 1; i < pad.length - 2; i++) {
    for (let t = 0; t < 1; t += 1 / density) {
      out.push(catmullRom(pad[i-1], pad[i], pad[i+1], pad[i+2], t));
    }
  }
  return out;
}

// ─── Types ───
interface BrainSym {
  homeX: number; homeY: number;
  x: number; y: number;
  vx: number; vy: number;
  symbol: string; size: number;
  baseAlpha: number; color: string;
  phase: number; isEdge: boolean;
  fontStr: string;
  brightness: number;
}

interface Signal {
  pathIdx: number; progress: number; speed: number;
  symbol: string; size: number; color: string;
  fontStr: string;
  glowFontStr: string;
}

interface FloatSym {
  x: number; y: number;
  vx: number; vy: number;
  symbol: string; size: number;
  alpha: number; phase: number;
  fontStr: string;
}

interface Wave {
  cx: number; cy: number;
  radius: number; maxR: number; speed: number;
}

const FNT_SUFFIX = "px 'Courier New',monospace";

function makeFontStr(size: number): string {
  return `${Math.round(size)}${FNT_SUFFIX}`;
}

export const CodeBrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const tRef = useRef(0);
  const animRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const visibleRef = useRef(true);

  const symsRef = useRef<BrainSym[]>([]);
  const sigsRef = useRef<Signal[]>([]);
  const floatsRef = useRef<FloatSym[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const wTimerRef = useRef(0);
  const pathScreensRef = useRef<number[][][]>([]);
  const cwRef = useRef(0);
  const chRef = useRef(0);

  // Load image once
  useEffect(() => {
    const img = new Image();
    img.src = brainImgUrl;
    img.onload = () => {
      imgRef.current = img;
      // Re-initialize once the image is loaded
      window.dispatchEvent(new Event('resize'));
    };
  }, []);

  // ─── Initialize Everything ───
  const init = useCallback((w: number, h: number) => {
    if (!imgRef.current) return;
    const img = imgRef.current;

    cwRef.current = w;
    chRef.current = h;

    // Use offscreen canvas to extract image data
    const targetSize = Math.min(w, h) * 0.85; // occupy 85% of smaller screen dimension
    const aspect = img.width / img.height;
    
    let drawW = targetSize;
    let drawH = targetSize / aspect;
    if (drawH > targetSize) {
      drawH = targetSize;
      drawW = targetSize * aspect;
    }

    const offCanvas = document.createElement('canvas');
    offCanvas.width = drawW;
    offCanvas.height = drawH;
    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    offCtx.drawImage(img, 0, 0, drawW, drawH);
    const imgData = offCtx.getImageData(0, 0, drawW, drawH);
    const data = imgData.data;

    const syms: BrainSym[] = [];
    const GRID = 10; // Denser grid for clearer detailed definition

    const offsetX = (w - drawW) / 2;
    const offsetY = (h - drawH) / 2;

    // 1. Build the Brain Symbols based on image brightness
    // Use a dense scan (step 2) to catch thin lines, but spawn probabilistically to maintain performance
    for (let y = 0; y < drawH; y += 2) {
      for (let x = 0; x < drawW; x += 2) {
        const i = (y * drawW + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 20) continue; // Skip transparent pixels

        // Calculate brightness
        const brightness = (r + g + b) / (3 * 255);
        if (brightness < 0.08) continue; // Skip dark areas

        // Probabilistic spawn: brighter pixels are more likely to spawn a symbol
        // This ensures thin bright lines are captured, while dark areas don't overcrowd
        const spawnChance = brightness * 0.35; 
        if (Math.random() > spawnChance) continue;

        const isEdge = brightness > 0.6;
        
        const baseAlpha = 0.2 + brightness * 0.8;
        const size = 8 + brightness * 8;
        
        // Add some jitter for a more organic feel
        const ox = (Math.random() - 0.5) * 4;
        const oy = (Math.random() - 0.5) * 4;

        const px = offsetX + x + ox;
        const py = offsetY + y + oy;

        // Determine color based on brightness to match the reference glowing effect
        let color = '255,106,0'; 
        if (brightness > 0.8) color = '255,230,160';
        else if (brightness > 0.5) color = '255,180,50';
        else if (brightness > 0.3) color = '255,130,20';

        syms.push({
          homeX: px, homeY: py,
          x: px, y: py,
          vx: 0, vy: 0,
          symbol: SYNTAX[Math.floor(Math.random() * SYNTAX.length)],
          size, baseAlpha, color,
          phase: Math.random() * Math.PI * 2,
          isEdge,
          fontStr: makeFontStr(size),
          brightness
        });
      }
    }
    symsRef.current = syms;

    // 2. Generate Neural Pathways dynamically across the brain
    const paths: number[][][] = [];
    const numPaths = 20; // Number of glowing lines
    
    for (let p = 0; p < numPaths; p++) {
      if (syms.length === 0) break;
      let current = syms[Math.floor(Math.random() * syms.length)];
      const pathPts = [[current.homeX, current.homeY]];
      
      const steps = 4 + Math.floor(Math.random() * 4); // 4 to 7 steps per path
      
      for (let step = 0; step < steps; step++) {
        let closest = null;
        let minDist = Infinity;
        
        // Sample random nodes to find the next connection point
        for (let i = 0; i < 40; i++) {
          const candidate = syms[Math.floor(Math.random() * syms.length)];
          const dx = candidate.homeX - current.homeX;
          const dy = candidate.homeY - current.homeY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          // Only connect if it's within a reasonable distance (not too short, not across the whole brain)
          if (dist > 20 && dist < 120 && dist < minDist) {
            minDist = dist;
            closest = candidate;
          }
        }
        
        if (closest) {
          pathPts.push([closest.homeX, closest.homeY]);
          current = closest;
        } else {
          break;
        }
      }
      
      if (pathPts.length >= 3) {
        paths.push(smoothPath(pathPts, 12));
      }
    }
    pathScreensRef.current = paths;

    // 3. Signal particles running along the paths
    const sigs: Signal[] = [];
    for (let i = 0; i < paths.length; i++) {
      for (let j = 0; j < 2; j++) {
        const sz = 10 + Math.random() * 5;
        sigs.push({
          pathIdx: i,
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.003,
          symbol: SYNTAX[Math.floor(Math.random() * SYNTAX.length)],
          size: sz,
          color: Math.random() > 0.4 ? '255,220,100' : '255,255,220',
          fontStr: makeFontStr(sz),
          glowFontStr: makeFontStr(sz + 10),
        });
      }
    }
    sigsRef.current = sigs;

    // 4. Ambient floaters in the background
    const floats: FloatSym[] = [];
    for (let i = 0; i < 15; i++) {
      const sz = 10 + Math.random() * 15;
      floats.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.05 - Math.random() * 0.15,
        symbol: SYNTAX[Math.floor(Math.random() * SYNTAX.length)],
        size: sz,
        alpha: 0.01 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
        fontStr: makeFontStr(sz),
      });
    }
    floatsRef.current = floats;

    wavesRef.current = [];
    wTimerRef.current = 0;
  }, []);

  // ─── Canvas Setup & Animation ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let cw = 0, ch = 0;

    // Visibility observer: pause rendering when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    const parent = canvas.parentElement;
    if (parent) observer.observe(parent);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parentEl = canvas.parentElement;
      if (!parentEl) return;
      cw = parentEl.clientWidth;
      ch = parentEl.clientHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(cw, ch);
    };

    resize();
    window.addEventListener('resize', resize);

    // GLOBAL mouse listener 
    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseleave', onLeave);

    // ─── Main Render Loop ───
    let lastFont = '';

    const setFont = (f: string) => {
      if (f !== lastFont) {
        ctx.font = f;
        lastFont = f;
      }
    };

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);

      if (!visibleRef.current || !cw || !ch) return;

      const dt = 0.016;
      tRef.current += dt;
      const t = tRef.current;
      const mouse = mouseRef.current;

      // 1. Clear background
      ctx.clearRect(0, 0, cw, ch);

      const brainCx = cw * 0.50;
      const brainCy = ch * 0.50;
      const brainR = Math.min(cw, ch) * 0.40;

      // 2. Background radial glow
      const bgP = 0.6 + Math.sin(t * 0.7) * 0.4;
      const bgG = ctx.createRadialGradient(brainCx, brainCy, 0, brainCx, brainCy, brainR * 1.5);
      bgG.addColorStop(0, `rgba(255,70,0,${0.06 * bgP})`);
      bgG.addColorStop(0.35, `rgba(200,50,0,${0.03 * bgP})`);
      bgG.addColorStop(0.65, `rgba(255,100,0,${0.015 * bgP})`);
      bgG.addColorStop(1, 'transparent');
      ctx.fillStyle = bgG;
      ctx.fillRect(0, 0, cw, ch);

      // 3. Draw static glowing neural pathways behind the brain
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      for (const pts of pathScreensRef.current) {
        if (pts.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i][0], pts[i][1]);
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255,106,0,0.15)`;
        ctx.stroke();
        // Inner brighter core
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = `rgba(255,180,50,0.3)`;
        ctx.stroke();
      }

      // 4. Glow waves originating from the center
      wTimerRef.current += dt;
      if (wTimerRef.current > 3 && wavesRef.current.length < 2) {
        wTimerRef.current = 0;
        wavesRef.current.push({
          cx: brainCx + (Math.random() - 0.5) * brainR * 0.2,
          cy: brainCy + (Math.random() - 0.5) * brainR * 0.2,
          radius: 0, maxR: brainR * 1.2,
          speed: 80 + Math.random() * 50,
        });
      }
      for (let i = wavesRef.current.length - 1; i >= 0; i--) {
        const w = wavesRef.current[i];
        w.radius += w.speed * dt;
        if (w.radius > w.maxR) { wavesRef.current.splice(i, 1); continue; }
        const wA = 0.4 * (1 - w.radius / w.maxR);
        ctx.beginPath();
        ctx.arc(w.cx, w.cy, w.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,150,30,${wA * 0.08})`;
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.strokeStyle = `rgba(255,106,0,${wA * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 5. Ambient floating symbols
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const f of floatsRef.current) {
        f.x += f.vx; f.y += f.vy;
        if (f.x < -50) f.x = cw + 50;
        if (f.x > cw + 50) f.x = -50;
        if (f.y < -50) f.y = ch + 50;
        if (f.y > ch + 50) f.y = -50;
        const fa = f.alpha + Math.sin(t + f.phase) * 0.01;
        if (fa <= 0) continue;
        setFont(f.fontStr);
        ctx.fillStyle = `rgba(255,106,0,${fa})`;
        ctx.fillText(f.symbol, f.x, f.y);
      }

      // 6. BRAIN SYMBOLS — The core logic
      const REP_R = 150; // Mouse repulsion radius
      const REP_F = 14;  // Repulsion force
      const SPR = 0.08;  // Spring back force
      const DMP = 0.82;  // Damping for smooth settling
      const waves = wavesRef.current;
      const waveLen = waves.length;

      for (const s of symsRef.current) {
        // Mouse repulsion
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const REP_R2 = REP_R * REP_R;

        if (d2 < REP_R2 && d2 > 1) {
          const d = Math.sqrt(d2);
          const f = (1 - d / REP_R) * REP_F;
          s.vx += (dx / d) * f;
          s.vy += (dy / d) * f;
        }

        // Spring back home
        s.vx += (s.homeX - s.x) * SPR;
        s.vy += (s.homeY - s.y) * SPR;
        s.vx *= DMP;
        s.vy *= DMP;
        s.x += s.vx;
        s.y += s.vy;

        // Pulsation based on edge and brightness
        const pulse = s.isEdge
          ? 0.6 + 0.4 * Math.sin(t * 1.5 + s.phase)
          : 0.4 + 0.6 * Math.sin(t * 2.0 + s.phase);

        let alpha = s.baseAlpha * pulse;

        // Wave boost
        if (waveLen > 0) {
          for (let wi = 0; wi < waveLen; wi++) {
            const wave = waves[wi];
            const wd = Math.sqrt((s.x - wave.cx) ** 2 + (s.y - wave.cy) ** 2);
            const diff = Math.abs(wd - wave.radius);
            if (diff < 60) {
              alpha += (1 - diff / 60) * (1 - wave.radius / wave.maxR) * 0.6;
            }
          }
        }

        // Mouse proximity glow
        const REP_R_GLOW = REP_R * 1.4;
        if (d2 < REP_R_GLOW * REP_R_GLOW && d2 > 0) {
          const d = Math.sqrt(d2);
          alpha += (1 - d / REP_R_GLOW) * 0.4;
        }

        // Displacement glow (glows brighter when pushed by mouse)
        const dispX = s.homeX - s.x;
        const dispY = s.homeY - s.y;
        const disp = Math.sqrt(dispX * dispX + dispY * dispY);
        alpha += Math.min(disp / 40, 0.6);

        alpha = Math.min(alpha, 1);
        if (alpha < 0.02) continue;

        // Draw symbol
        setFont(s.fontStr);
        ctx.fillStyle = `rgba(${s.color},${alpha})`;
        ctx.fillText(s.symbol, s.x, s.y);

        // Extra glow halo for bright/edge particles
        if (s.brightness > 0.6 && alpha > 0.4) {
          ctx.fillStyle = `rgba(${s.color},${alpha * 0.1})`;
          ctx.fillText(s.symbol, s.x, s.y);
        }
      }

      // 7. Signal particles traveling along neural pathways
      for (const sig of sigsRef.current) {
        sig.progress += sig.speed;
        if (sig.progress > 1) sig.progress -= 1;

        const pts = pathScreensRef.current[sig.pathIdx];
        if (!pts || pts.length < 2) continue;

        const idx = sig.progress * (pts.length - 1);
        const i0 = Math.floor(idx);
        const frac = idx - i0;
        if (i0 >= pts.length - 1) continue;

        const x = pts[i0][0] + (pts[i0+1][0] - pts[i0][0]) * frac;
        const y = pts[i0][1] + (pts[i0+1][1] - pts[i0][1]) * frac;

        const sA = 0.5 + 0.5 * Math.sin(t * 8 + sig.progress * 30);

        // Signal glow halo
        ctx.fillStyle = `rgba(${sig.color},${sA * 0.15})`;
        setFont(sig.glowFontStr);
        ctx.fillText(sig.symbol, x, y);

        // Signal core
        ctx.fillStyle = `rgba(${sig.color},${sA * 0.9})`;
        setFont(sig.fontStr);
        ctx.fillText(sig.symbol, x, y);

        // White hot center spark
        ctx.fillStyle = `rgba(255,255,255,${sA * 0.7})`;
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }

      // 8. Mouse flashlight (ambient glow under cursor)
      if (mouse.x > 0 && mouse.x < cw && mouse.y > 0 && mouse.y < ch) {
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        mg.addColorStop(0, 'rgba(255,120,30,0.06)');
        mg.addColorStop(0.5, 'rgba(255,80,0,0.015)');
        mg.addColorStop(1, 'transparent');
        ctx.fillStyle = mg;
        ctx.fillRect(mouse.x - 180, mouse.y - 180, 360, 360);
      }

      // 9. Central bloom
      const bP = 0.45 + Math.sin(t * 0.8) * 0.55;
      const bl = ctx.createRadialGradient(brainCx, brainCy, 0, brainCx, brainCy, brainR * 0.5);
      bl.addColorStop(0, `rgba(255,106,0,${0.03 * bP})`);
      bl.addColorStop(0.5, `rgba(255,140,40,${0.015 * bP})`);
      bl.addColorStop(1, 'transparent');
      ctx.fillStyle = bl;
      ctx.fillRect(0, 0, cw, ch);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[2]"
      style={{
        width: '100vw',
        height: '100vh',
        mixBlendMode: 'screen',
        pointerEvents: 'none', 
      }}
      aria-hidden="true"
    />
  );
};

export default CodeBrain;
