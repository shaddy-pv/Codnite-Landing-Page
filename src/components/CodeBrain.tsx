import { useEffect, useRef, useCallback } from 'react';

// ─── Programming Syntax Symbols ───
const SYNTAX = [
  '<', '>', '{', '}', '(', ')', '[', ']', ';', ':', '"', "'",
  '/', '\\', '|', '+', '-', '*', '&', '^', '%', '$', '#',
  '@', '!', '~', '=>', '&&', '||', '==', '::', '//',
];

// ─── Brain Shape (union of ellipses forming a side-profile brain) ───
const BRAIN = [
  { cx: 0.46, cy: 0.40, rx: 0.32, ry: 0.26 }, // Main cerebrum
  { cx: 0.24, cy: 0.36, rx: 0.14, ry: 0.18 }, // Frontal lobe
  { cx: 0.28, cy: 0.28, rx: 0.12, ry: 0.13 }, // Upper frontal
  { cx: 0.54, cy: 0.26, rx: 0.16, ry: 0.12 }, // Parietal
  { cx: 0.68, cy: 0.36, rx: 0.11, ry: 0.15 }, // Occipital
  { cx: 0.36, cy: 0.57, rx: 0.15, ry: 0.08 }, // Temporal
  { cx: 0.65, cy: 0.60, rx: 0.10, ry: 0.07 }, // Cerebellum
  { cx: 0.55, cy: 0.72, rx: 0.035, ry: 0.09 }, // Brainstem
];

// Check if a normalized point is inside the brain
function isInBrain(nx: number, ny: number): boolean {
  for (const e of BRAIN) {
    const val = ((nx - e.cx) / e.rx) ** 2 + ((ny - e.cy) / e.ry) ** 2;
    if (val < 1) return true;
  }
  return false;
}

// Check if point is on the outer edge of the brain shape
function isOuterEdge(nx: number, ny: number): boolean {
  if (!isInBrain(nx, ny)) return false;
  const step = 0.022; // slightly larger step for fewer checks
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]]; // reduced from 8 to 4 directions
  for (const [dx, dy] of dirs) {
    if (!isInBrain(nx + dx * step, ny + dy * step)) return true;
  }
  return false;
}

// Organic fold texture pattern (simulates gyri/sulci)
function foldValue(nx: number, ny: number): number {
  const f1 = Math.sin(nx * 28 + Math.sin(ny * 12) * 2.5);
  const f2 = Math.sin(ny * 20 + Math.sin(nx * 8) * 2.0);
  return (f1 * f2 + 1) * 0.5; // 0–1
}

// ─── Neural Pathway Curves ───
const PATHWAYS = [
  [[0.22, 0.38], [0.34, 0.33], [0.48, 0.32], [0.62, 0.35], [0.72, 0.40]],
  [[0.20, 0.30], [0.26, 0.40], [0.32, 0.50], [0.38, 0.56]],
  [[0.52, 0.24], [0.60, 0.30], [0.66, 0.38], [0.70, 0.46]],
  [[0.32, 0.36], [0.44, 0.38], [0.56, 0.40], [0.64, 0.44]],
  [[0.28, 0.44], [0.40, 0.43], [0.52, 0.45], [0.62, 0.50]],
  [[0.42, 0.22], [0.44, 0.32], [0.46, 0.44], [0.50, 0.56]],
  [[0.56, 0.52], [0.60, 0.56], [0.64, 0.60]],
  [[0.52, 0.60], [0.54, 0.66], [0.55, 0.74], [0.55, 0.80]],
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
  fontStr: string; // Pre-computed font string
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

// Pre-build font string to avoid per-frame string concat
function makeFontStr(size: number): string {
  return `${Math.round(size)}${FNT_SUFFIX}`;
}

// ─── Component ───
export const CodeBrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  const toScreen = useCallback((nx: number, ny: number, w: number, h: number) => {
    const scale = Math.min(w, h) * 1.15;
    return [w * 0.50 + (nx - 0.5) * scale, h * 0.46 + (ny - 0.5) * scale];
  }, []);

  const fromScreen = useCallback((sx: number, sy: number, w: number, h: number) => {
    const scale = Math.min(w, h) * 1.15;
    return [(sx - w * 0.50) / scale + 0.5, (sy - h * 0.46) / scale + 0.5];
  }, []);

  // ─── Initialize Everything ───
  const init = useCallback((w: number, h: number) => {
    const syms: BrainSym[] = [];
    const GRID = 22; // ← was 13, now significantly sparser to reduce draw calls

    // Scan screen grid, fill brain shape with symbols
    for (let sy = 0; sy < h; sy += GRID) {
      for (let sx = 0; sx < w; sx += GRID) {
        const [nx, ny] = fromScreen(sx, sy, w, h);
        if (!isInBrain(nx, ny)) continue;

        const edge = isOuterEdge(nx, ny);
        const fold = foldValue(nx, ny);

        // Determine visual properties based on position
        let baseAlpha: number;
        let size: number;

        if (edge) {
          baseAlpha = 0.55 + fold * 0.35;
          size = 9 + Math.random() * 4;
        } else {
          let minEllipseVal = Infinity;
          for (const e of BRAIN) {
            const val = ((nx - e.cx) / e.rx) ** 2 + ((ny - e.cy) / e.ry) ** 2;
            if (val < minEllipseVal) minEllipseVal = val;
          }
          const depth = 1 - minEllipseVal;

          if (depth < 0.25) {
            baseAlpha = 0.10 + fold * 0.15;
            size = 7 + Math.random() * 3;
          } else {
            baseAlpha = 0.03 + fold * 0.08;
            size = 6 + Math.random() * 3;
          }
        }

        const ox = (Math.random() - 0.5) * 4;
        const oy = (Math.random() - 0.5) * 4;

        const cr = Math.random();
        let color: string;
        if (cr < 0.40) color = '255,106,0';
        else if (cr < 0.65) color = '255,150,30';
        else if (cr < 0.80) color = '255,190,60';
        else if (cr < 0.92) color = '255,220,140';
        else color = '255,200,80';

        syms.push({
          homeX: sx + ox, homeY: sy + oy,
          x: sx + ox, y: sy + oy,
          vx: 0, vy: 0,
          symbol: SYNTAX[Math.floor(Math.random() * SYNTAX.length)],
          size, baseAlpha, color,
          phase: Math.random() * Math.PI * 2,
          isEdge: edge,
          fontStr: makeFontStr(size),
        });
      }
    }

    // Place dense symbols along each ellipse perimeter (brain outline)
    const scaleVal = Math.min(w, h) * 1.15;
    for (const e of BRAIN) {
      const [ecx, ecy] = toScreen(e.cx, e.cy, w, h);
      const erx = e.rx * scaleVal;
      const ery = e.ry * scaleVal;
      const circumference = Math.PI * 2 * Math.sqrt((erx * erx + ery * ery) / 2);
      const count = Math.floor(circumference / 14); // ← was 6, now sparser

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const px = ecx + Math.cos(angle) * erx + (Math.random() - 0.5) * 6;
        const py = ecy + Math.sin(angle) * ery + (Math.random() - 0.5) * 6;

        const [nnx, nny] = fromScreen(px, py, w, h);
        let insideCount = 0;
        for (const e2 of BRAIN) {
          const v = ((nnx - e2.cx) / e2.rx) ** 2 + ((nny - e2.cy) / e2.ry) ** 2;
          if (v < 0.75) insideCount++;
        }
        if (insideCount > 1) continue;

        const cr2 = Math.random();
        const col = cr2 < 0.4 ? '255,106,0' : cr2 < 0.7 ? '255,150,30' : '255,200,70';
        const sz = 9 + Math.random() * 4;
        syms.push({
          homeX: px, homeY: py,
          x: px, y: py,
          vx: 0, vy: 0,
          symbol: SYNTAX[Math.floor(Math.random() * SYNTAX.length)],
          size: sz,
          baseAlpha: 0.50 + Math.random() * 0.40,
          color: col,
          phase: Math.random() * Math.PI * 2,
          isEdge: true,
          fontStr: makeFontStr(sz),
        });
      }
    }

    // Pathway curves → screen coords
    const pathScreens = PATHWAYS.map(p =>
      smoothPath(p, 12).map(pt => toScreen(pt[0], pt[1], w, h))
    );
    pathScreensRef.current = pathScreens;

    // Place symbols along pathway curves (nerve fibers)
    for (const pathPts of pathScreens) {
      for (let i = 0; i < pathPts.length; i += 5) { // ← was 3, now sparser
        const pt = pathPts[Math.min(i, pathPts.length - 1)];
        const ox = (Math.random() - 0.5) * 5;
        const oy = (Math.random() - 0.5) * 5;
        const cr3 = Math.random();
        const col = cr3 < 0.4 ? '255,106,0' : cr3 < 0.7 ? '255,160,40' : '255,210,80';
        const sz = 7 + Math.random() * 3;
        syms.push({
          homeX: pt[0] + ox, homeY: pt[1] + oy,
          x: pt[0] + ox, y: pt[1] + oy,
          vx: 0, vy: 0,
          symbol: SYNTAX[Math.floor(Math.random() * SYNTAX.length)],
          size: sz,
          baseAlpha: 0.30 + Math.random() * 0.30,
          color: col,
          phase: Math.random() * Math.PI * 2,
          isEdge: false,
          fontStr: makeFontStr(sz),
        });
      }
    }

    symsRef.current = syms;

    // Signal particles — reduced from 4 to 2 per path
    const sigs: Signal[] = [];
    for (let i = 0; i < pathScreens.length; i++) {
      for (let j = 0; j < 2; j++) {
        const sz = 10 + Math.random() * 4;
        sigs.push({
          pathIdx: i,
          progress: Math.random(),
          speed: 0.002 + Math.random() * 0.004,
          symbol: SYNTAX[Math.floor(Math.random() * SYNTAX.length)],
          size: sz,
          color: Math.random() > 0.35 ? '255,210,80' : '255,255,220',
          fontStr: makeFontStr(sz),
          glowFontStr: makeFontStr(sz + 8),
        });
      }
    }
    sigsRef.current = sigs;

    // Ambient floaters — reduced from 40 to 15
    const floats: FloatSym[] = [];
    for (let i = 0; i < 15; i++) {
      const sz = 10 + Math.random() * 12;
      floats.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.08 - Math.random() * 0.15,
        symbol: SYNTAX[Math.floor(Math.random() * SYNTAX.length)],
        size: sz,
        alpha: 0.015 + Math.random() * 0.035,
        phase: Math.random() * Math.PI * 2,
        fontStr: makeFontStr(sz),
      });
    }
    floatsRef.current = floats;

    wavesRef.current = [];
    wTimerRef.current = 0;
  }, [toScreen, fromScreen]);

  // ─── Canvas Setup & Animation ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let cw = 0, ch = 0;

    // ─── Visibility observer: pause rendering when off-screen ───
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

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);

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

      // Skip rendering when off-screen
      if (!visibleRef.current || !cw || !ch) return;

      const dt = 0.016;
      tRef.current += dt;
      const t = tRef.current;
      const mouse = mouseRef.current;

      // ── Clear ──
      ctx.fillStyle = '#05030A';
      ctx.fillRect(0, 0, cw, ch);

      const brainCx = cw * 0.50;
      const brainCy = ch * 0.44;
      const brainR = Math.min(cw, ch) * 0.40;

      // ── 1. Background radial glow ──
      const bgP = 0.6 + Math.sin(t * 0.7) * 0.4;
      const bgG = ctx.createRadialGradient(brainCx, brainCy, 0, brainCx, brainCy, brainR * 1.2);
      bgG.addColorStop(0, `rgba(255,70,0,${0.07 * bgP})`);
      bgG.addColorStop(0.35, `rgba(200,50,0,${0.03 * bgP})`);
      bgG.addColorStop(0.65, `rgba(255,100,0,${0.015 * bgP})`);
      bgG.addColorStop(1, 'transparent');
      ctx.fillStyle = bgG;
      ctx.fillRect(0, 0, cw, ch);

      // ── 2. Neural network halo rings ──
      ctx.setLineDash([3, 8]);
      ctx.lineWidth = 0.7;
      for (let r = 0; r < 3; r++) {
        const rad = brainR * (0.95 + r * 0.15);
        const rA = (0.045 - r * 0.013) * (0.5 + Math.sin(t * 0.5 + r * 1.1) * 0.5);
        ctx.beginPath();
        ctx.arc(brainCx, brainCy, rad, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,106,0,${rA})`;
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // ── 4. Glow waves — max 2 active ──
      wTimerRef.current += dt;
      if (wTimerRef.current > 2.5 && wavesRef.current.length < 2) {
        wTimerRef.current = 0;
        wavesRef.current.push({
          cx: brainCx + (Math.random() - 0.5) * brainR * 0.4,
          cy: brainCy + (Math.random() - 0.5) * brainR * 0.3,
          radius: 0, maxR: brainR * 1.1,
          speed: 85 + Math.random() * 65,
        });
      }
      for (let i = wavesRef.current.length - 1; i >= 0; i--) {
        const w = wavesRef.current[i];
        w.radius += w.speed * dt;
        if (w.radius > w.maxR) { wavesRef.current.splice(i, 1); continue; }
        const wA = 0.3 * (1 - w.radius / w.maxR);
        ctx.beginPath();
        ctx.arc(w.cx, w.cy, w.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,150,30,${wA * 0.05})`;
        ctx.lineWidth = 15; // ← was 35
        ctx.stroke();
        ctx.strokeStyle = `rgba(255,106,0,${wA * 0.18})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // ── 5. Ambient floating symbols ──
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const f of floatsRef.current) {
        f.x += f.vx; f.y += f.vy;
        if (f.x < -50) f.x = cw + 50;
        if (f.x > cw + 50) f.x = -50;
        if (f.y < -50) f.y = ch + 50;
        if (f.y > ch + 50) f.y = -50;
        const fa = f.alpha + Math.sin(t + f.phase) * 0.008;
        if (fa <= 0) continue;
        setFont(f.fontStr);
        ctx.fillStyle = `rgba(255,106,0,${fa})`;
        ctx.fillText(f.symbol, f.x, f.y);
      }

      // ── 6. BRAIN SYMBOLS — the main visual ──
      const REP_R = 140;
      const REP_F = 11;
      const SPR = 0.05;
      const DMP = 0.85;
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

        // Pulsation
        const pulse = s.isEdge
          ? 0.55 + 0.45 * Math.sin(t * 1.8 + s.phase)
          : 0.4 + 0.6 * Math.sin(t * 2.2 + s.phase);

        let alpha = s.baseAlpha * pulse;

        // Wave boost — only check if waves exist
        if (waveLen > 0) {
          for (let wi = 0; wi < waveLen; wi++) {
            const wave = waves[wi];
            const wd = Math.sqrt((s.x - wave.cx) ** 2 + (s.y - wave.cy) ** 2);
            const diff = Math.abs(wd - wave.radius);
            if (diff < 50) {
              alpha += (1 - diff / 50) * (1 - wave.radius / wave.maxR) * 0.55;
            }
          }
        }

        // Mouse proximity glow
        const REP_R_GLOW = REP_R * 1.3;
        if (d2 < REP_R_GLOW * REP_R_GLOW && d2 > 0) {
          const d = Math.sqrt(d2);
          alpha += (1 - d / REP_R_GLOW) * 0.35;
        }

        // Displacement glow
        const dispX = s.homeX - s.x;
        const dispY = s.homeY - s.y;
        const disp = Math.sqrt(dispX * dispX + dispY * dispY);
        alpha += Math.min(disp / 30, 0.5);

        alpha = Math.min(alpha, 1);
        if (alpha < 0.03) continue; // ← was 0.012, skip dim symbols earlier

        // Draw symbol
        setFont(s.fontStr);
        ctx.fillStyle = `rgba(${s.color},${alpha})`;
        ctx.fillText(s.symbol, s.x, s.y);

        // Extra glow halo for bright edge particles
        if (s.isEdge && alpha > 0.4) { // ← was 0.3
          ctx.fillStyle = `rgba(${s.color},${alpha * 0.06})`;
          // Skip separate font set for glow — just use same font for slight visual simplification
          ctx.fillText(s.symbol, s.x, s.y);
        }
      }

      // ── 7. Signal particles ──
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

        const sA = 0.5 + 0.5 * Math.sin(t * 10 + sig.progress * 40);

        // Glow halo
        ctx.fillStyle = `rgba(${sig.color},${sA * 0.12})`;
        setFont(sig.glowFontStr);
        ctx.fillText(sig.symbol, x, y);

        // Core
        ctx.fillStyle = `rgba(${sig.color},${sA * 0.85})`;
        setFont(sig.fontStr);
        ctx.fillText(sig.symbol, x, y);

        // White hot center
        ctx.fillStyle = `rgba(255,255,255,${sA * 0.5})`;
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }

      // ── 8. Mouse flashlight ──
      if (mouse.x > 0 && mouse.x < cw && mouse.y > 0 && mouse.y < ch) {
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
        mg.addColorStop(0, 'rgba(255,110,20,0.04)');
        mg.addColorStop(0.5, 'rgba(255,70,0,0.012)');
        mg.addColorStop(1, 'transparent');
        ctx.fillStyle = mg;
        ctx.fillRect(mouse.x - 160, mouse.y - 160, 320, 320);
      }

      // ── 9. Central bloom ──
      const bP = 0.45 + Math.sin(t * 0.8) * 0.55;
      const bl = ctx.createRadialGradient(brainCx, brainCy, 0, brainCx, brainCy, brainR * 0.4);
      bl.addColorStop(0, `rgba(255,106,0,${0.025 * bP})`);
      bl.addColorStop(0.5, `rgba(255,130,30,${0.01 * bP})`);
      bl.addColorStop(1, 'transparent');
      ctx.fillStyle = bl;
      ctx.fillRect(0, 0, cw, ch);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
    };
  }, [init, toScreen]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[2] pointer-events-auto"
      style={{
        width: '100vw',
        height: '100vh',
        mixBlendMode: 'screen',
        backgroundColor: '#05030A',
      }}
      aria-hidden="true"
    />
  );
};

export default CodeBrain;
