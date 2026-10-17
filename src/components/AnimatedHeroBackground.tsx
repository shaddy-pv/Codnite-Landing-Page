'use client';

import { useEffect, useRef } from 'react';

export const AnimatedHeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const parallax = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let W = 0, H = 0;
    let particles: Particle[] = [];
    let hexCells: HexCell[] = [];
    let circuits: Circuit[] = [];
    let binColumns: BinColumn[] = [];
    let time = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      init();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / W;
      mouse.current.y = e.clientY / H;
    };

    // ─────────────────────────────────────────
    //  PARTICLES
    // ─────────────────────────────────────────
    class Particle {
      x=0; y=0; vx=0; vy=0; size=0; alpha=0;
      life=0; maxLife=0; isOrange=true;
      constructor() { this.reset(true); }
      reset(scatter = false) {
        this.x = Math.random() * W;
        // Bias toward the middle-lower area where sparks are visible in ref
        this.y = scatter ? Math.random() * H : H * 0.35 + Math.random() * H * 0.65;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = -(Math.random() * 1.5 + 0.2);
        this.size = Math.random() * 2.2 + 0.3;
        this.alpha = 0;
        this.maxLife = 180 + Math.random() * 280;
        this.life = scatter ? Math.random() * this.maxLife : 0;
        this.isOrange = Math.random() > 0.2; // 80% orange, 20% blue
      }
      update() {
        this.life++;
        if (this.life > this.maxLife) { this.reset(); return; }
        const t = this.life / this.maxLife;
        this.alpha = t < 0.12 ? t / 0.12 : t > 0.8 ? (1 - t) / 0.2 : 1;
        this.alpha *= 0.85;
        this.x += this.vx + Math.sin(this.life * 0.025) * 0.4;
        this.y += this.vy;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        const color = this.isOrange ? '#FF8C1A' : '#5AAFFF';
        const glow  = this.isOrange ? '#FF6A00' : '#2D7DFF';
        ctx.shadowBlur = 14;
        ctx.shadowColor = glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      }
    }

    // ─────────────────────────────────────────
    //  CORNER HEX CELLS
    // ─────────────────────────────────────────
    class HexCell {
      cx: number; cy: number; r: number; side: 'L'|'R';
      alpha=0; targetAlpha=0; timer=0; interval=0;
      constructor(cx: number, cy: number, r: number, side: 'L'|'R') {
        this.cx=cx; this.cy=cy; this.r=r; this.side=side;
        this.alpha = Math.random() * 0.2;
        this.targetAlpha = Math.random() * 0.25;
        this.timer = Math.random() * 200;
        this.interval = 100 + Math.random() * 350;
      }
      update() {
        this.timer++;
        if (this.timer > this.interval) {
          this.targetAlpha = Math.random() * 0.35 + 0.02;
          this.timer = 0;
          this.interval = 80 + Math.random() * 400;
        }
        this.alpha += (this.targetAlpha - this.alpha) * 0.025;
      }
      draw(ox: number, oy: number) {
        const x = this.cx + ox, y = this.cy + oy;
        const color = this.side === 'L' ? '#FF6A00' : '#2D7DFF';
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8;
        ctx.shadowBlur = 6;
        ctx.shadowColor = color;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = Math.PI / 3 * i - Math.PI / 6;
          if (i === 0) {
            ctx.moveTo(x + this.r * Math.cos(a), y + this.r * Math.sin(a));
          } else {
            ctx.lineTo(x + this.r * Math.cos(a), y + this.r * Math.sin(a));
          }
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
    }

    // ─────────────────────────────────────────
    //  CIRCUIT TRACES
    // ─────────────────────────────────────────
    interface Pt { x: number; y: number; }
    class Circuit {
      nodes: Pt[]; side: 'L'|'R';
      pulses: { t: number; spd: number; col: string }[] = [];
      segs: { len: number; cum: number }[] = [];
      total = 0;
      baseAlpha: number;
      baseCol: string; glow: string;

      constructor(nodes: Pt[], side: 'L'|'R') {
        this.nodes = nodes; this.side = side;
        this.baseAlpha = 0.45 + Math.random() * 0.35;
        this.baseCol = side === 'L' ? 'rgba(255,106,0,0.55)' : 'rgba(45,125,255,0.55)';
        this.glow    = side === 'L' ? '#FF6A00' : '#2D7DFF';

        for (let i = 0; i < nodes.length - 1; i++) {
          const l = Math.hypot(nodes[i+1].x - nodes[i].x, nodes[i+1].y - nodes[i].y);
          this.segs.push({ len: l, cum: this.total });
          this.total += l;
        }
        // Pre-seed a couple of pulses
        for (let i = 0; i < 2; i++) this.spawn(Math.random());
      }
      spawn(t = 0) {
        const whiteOrAccent = Math.random() > 0.5;
        this.pulses.push({
          t,
          spd: 0.002 + Math.random() * 0.003,
          col: whiteOrAccent ? '#FFFFFF' : (this.side === 'L' ? '#FFD580' : '#9AB8FF'),
        });
      }
      ptAt(t: number): Pt | null {
        const d = t * this.total;
        for (let i = 0; i < this.segs.length; i++) {
          const s = this.segs[i];
          if (d <= s.cum + s.len) {
            const f = (d - s.cum) / s.len;
            return { x: this.nodes[i].x + (this.nodes[i+1].x - this.nodes[i].x) * f,
                     y: this.nodes[i].y + (this.nodes[i+1].y - this.nodes[i].y) * f };
          }
        }
        return this.nodes[this.nodes.length-1];
      }
      update() {
        this.pulses.forEach(p => p.t += p.spd);
        this.pulses = this.pulses.filter(p => p.t < 1);
        if (this.pulses.length < 3 && Math.random() < 0.012) this.spawn();
      }
      draw(ox: number, oy: number) {
        // Base trace
        ctx.save();
        ctx.globalAlpha = this.baseAlpha * 0.75;
        ctx.strokeStyle = this.baseCol;
        ctx.lineWidth = 1.3;
        ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        ctx.shadowBlur = 8; ctx.shadowColor = this.glow;
        ctx.beginPath();
        ctx.moveTo(this.nodes[0].x + ox, this.nodes[0].y + oy);
        for (let i = 1; i < this.nodes.length; i++)
          ctx.lineTo(this.nodes[i].x + ox, this.nodes[i].y + oy);
        ctx.stroke();

        // Terminal dots at nodes
        ctx.shadowBlur = 10;
        for (const n of this.nodes) {
          ctx.globalAlpha = this.baseAlpha;
          ctx.beginPath();
          ctx.arc(n.x + ox, n.y + oy, 2, 0, Math.PI * 2);
          ctx.fillStyle = this.glow;
          ctx.fill();
          // outer ring
          ctx.globalAlpha = this.baseAlpha * 0.35;
          ctx.beginPath();
          ctx.arc(n.x + ox, n.y + oy, 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        // Pulses
        for (const p of this.pulses) {
          const pos = this.ptAt(p.t);
          if (!pos) continue;
          const fade = 1 - Math.abs(p.t - 0.5) * 2;
          ctx.save();
          ctx.globalAlpha = 0.9 * fade;
          ctx.shadowBlur = 22; ctx.shadowColor = p.col;
          ctx.beginPath();
          ctx.arc(pos.x + ox, pos.y + oy, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = p.col;
          ctx.fill();
          // Trail
          const trail = this.ptAt(Math.max(0, p.t - 0.05));
          if (trail) {
            ctx.globalAlpha = 0.3 * fade;
            ctx.beginPath();
            ctx.arc(trail.x + ox, trail.y + oy, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }
    }

    // ─────────────────────────────────────────
    //  BINARY COLUMNS
    // ─────────────────────────────────────────
    class BinColumn {
      x: number; y: number; chars: string[];
      spd: number; alpha: number;
      col: string; shadow: string;
      constructor(x: number, col: string, shadow: string) {
        this.x=x; this.col=col; this.shadow=shadow;
        this.y = Math.random() * H;
        this.chars = Array.from({length:22}, () => String(Math.round(Math.random())));
        this.spd = 0.35 + Math.random() * 0.55;
        this.alpha = 0.18 + Math.random() * 0.22;
      }
      update() {
        this.y += this.spd;
        if (this.y > H + 250) {
          this.y = -250;
          this.chars = Array.from({length:22}, () => String(Math.round(Math.random())));
        }
        if (Math.random() < 0.015) {
          const i = Math.floor(Math.random() * this.chars.length);
          this.chars[i] = this.chars[i] === '0' ? '1' : '0';
        }
      }
      draw() {
        const lh = 15;
        ctx.save();
        ctx.font = '10px monospace';
        ctx.shadowBlur = 7; ctx.shadowColor = this.shadow;
        this.chars.forEach((c, i) => {
          const fy = this.y + i * lh;
          const n = fy / H;
          const fade = n < 0.08 ? n/0.08 : n > 0.65 ? (1-n)/0.35 : 1;
          ctx.globalAlpha = this.alpha * Math.max(0, fade);
          ctx.fillStyle = this.col;
          ctx.fillText(c, this.x, fy);
        });
        ctx.restore();
      }
    }

    // ─────────────────────────────────────────
    //  HORIZON (curved arc + floor hex grid)
    // ─────────────────────────────────────────
    const drawHorizon = (px: number, py: number) => {
      // Horizon sits at ~68% down the screen - matching reference image exactly
      const hY = H * 0.68 + py * 0.4;
      const cX = W / 2  + px * 0.25;

      // ── 3D Floor Hex Grid ──────────────────
      // Clip to below the horizon
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, hY - 2, W, H - hY + 2);
      ctx.clip();

      const hexR = W * 0.048; // hex radius in perspective space
      const rows = 14;
      for (let row = 0; row < rows; row++) {
        const v = (row + 0.5) / rows; // 0 = horizon, 1 = bottom
        // depth perspective - deeper near horizon
        const depth = 1 - v * 0.88;
        const persp = depth * depth;
        const screenY = hY + (H - hY) * (1 - persp);
        const hSize = hexR * persp;

        const cols = Math.ceil(W / (hSize * 2.2)) + 2;
        for (let col = -cols; col <= cols; col++) {
          const offsetX = (row % 2 === 0 ? 0 : hSize * Math.sqrt(3) * 0.5);
          const screenX = cX + (col * hSize * Math.sqrt(3) + offsetX) * persp * 2.8;

          // Only draw visible hexes
          if (screenX < -hSize * 2 || screenX > W + hSize * 2) continue;

          // Opacity: bright near the horizon arc, fades toward bottom & edges
          const edgeFade = 1 - Math.abs(screenX - W/2) / (W * 0.52);
          const rowFade  = v < 0.08 ? v / 0.08 : v > 0.85 ? (1 - v) / 0.15 : 1;
          const alpha    = Math.max(0, edgeFade) * rowFade * 0.55;
          if (alpha < 0.01) continue;

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = '#FF6A00';
          ctx.lineWidth   = Math.max(0.2, persp * 1.1);
          ctx.shadowBlur  = 5 * persp;
          ctx.shadowColor = '#FF6A00';
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const a = Math.PI / 3 * k;
            const hx = screenX + hSize * Math.cos(a);
            const hy = screenY + hSize * 0.5 * Math.sin(a); // flatten vertically
            if (k === 0) {
              ctx.moveTo(hx, hy);
            } else {
              ctx.lineTo(hx, hy);
            }
          }
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      }
      ctx.restore();

      // ── Ambient orange glow rising from horizon ──
      const glowPulse = 0.87 + 0.13 * Math.sin(time * 0.018);
      const rg = ctx.createRadialGradient(cX, hY, 0, cX, hY, W * 0.62);
      rg.addColorStop(0,    `rgba(220,80,0,${0.28 * glowPulse})`);
      rg.addColorStop(0.25, `rgba(255,106,0,${0.14 * glowPulse})`);
      rg.addColorStop(0.6,  `rgba(150,40,0,${0.05 * glowPulse})`);
      rg.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.save();
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // ── Horizon arc layers ──
      // Arc geometry: large ellipse positioned so only top arc is visible
      const arcRX = W * 0.72;  // horizontal radius
      const arcRY = H * 0.28;  // vertical radius  - gives nice curve matching reference
      const arcCY = hY + arcRY; // center below visible area

      const drawArc = (lw: number, a: number, col: string, blur: number, startAngle = Math.PI + 0.02, endAngle = Math.PI * 2 - 0.02) => {
        ctx.save();
        ctx.globalAlpha = a * glowPulse;
        ctx.strokeStyle = col;
        ctx.lineWidth = lw;
        ctx.shadowBlur = blur;
        ctx.shadowColor = col;
        ctx.beginPath();
        ctx.ellipse(cX, arcCY, arcRX, arcRY, 0, startAngle, endAngle);
        ctx.stroke();
        ctx.restore();
      };

      // Outer violet/blue halo
      drawArc(1.5, 0.30, '#7A2EFF', 25);
      drawArc(2,   0.35, '#2D7DFF', 18);
      // Orange core
      drawArc(1.5, 0.55, '#FF4500', 5);
      drawArc(2.5, 0.80, '#FF6A00', 15);
      drawArc(1.5, 1.00, '#FFD580', 0); // bright white-orange center line

      // ── Energy rings emanating outward ──
      for (let i = 0; i < 3; i++) {
        const phase = ((time * 0.007 + i * 0.333) % 1);
        const ringAlpha = (1 - phase) * 0.15 * glowPulse;
        const rRX = arcRX * (0.6 + phase * 0.7);
        const rRY = arcRY * (0.6 + phase * 0.7);
        ctx.save();
        ctx.globalAlpha = ringAlpha;
        ctx.strokeStyle = '#FF6A00';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 8; ctx.shadowColor = '#FF6A00';
        ctx.beginPath();
        ctx.ellipse(cX, arcCY, rRX, rRY, 0, Math.PI + 0.1, Math.PI * 2 - 0.1);
        ctx.stroke();
        ctx.restore();
      }
    };

    // ─────────────────────────────────────────
    //  INIT
    // ─────────────────────────────────────────
    const init = () => {
      // Particles - generous count for the ember effect
      const N = Math.min(400, Math.floor(W * H / 6500));
      particles = Array.from({length: N}, () => new Particle());

      // ── Corner Hex cells ──
      hexCells = [];
      const R = 30; // hex outer radius
      const hexW = R * Math.sqrt(3);
      const hexH = R * 1.5;

      // Left - top-left quadrant only
      const leftW = W * 0.34, leftH = H * 0.56;
      for (let row = -1; row < leftH / hexH + 1; row++) {
        for (let col = -1; col < leftW / hexW + 1; col++) {
          const cx = col * hexW + (row % 2 !== 0 ? hexW / 2 : 0);
          const cy = row * hexH;
          if (cx > leftW + R || cy > leftH + R) continue;
          // Radial fade from top-left
          const nx = cx / leftW, ny = cy / leftH;
          const dist = Math.hypot(nx, ny);
          if (dist > 1.15) continue;
          hexCells.push(new HexCell(cx, cy, R, 'L'));
        }
      }
      // Right - mirror
      const rightStart = W * 0.66;
      for (let row = -1; row < leftH / hexH + 1; row++) {
        for (let col = -1; col < leftW / hexW + 1; col++) {
          const lcx = col * hexW + (row % 2 !== 0 ? hexW / 2 : 0);
          const cy  = row * hexH;
          const cx  = W - lcx;
          if (cx < rightStart - R || cy > leftH + R) continue;
          const nx = (W - cx) / (W * 0.34), ny = cy / leftH;
          if (Math.hypot(nx, ny) > 1.15) continue;
          hexCells.push(new HexCell(cx, cy, R, 'R'));
        }
      }

      // ── Circuit traces ──
      circuits = [];
      const buildTraces = (side: 'L'|'R') => {
        const f = side === 'R' ? -1 : 1;
        const ox = side === 'R' ? W : 0;

        // Staircase PCB traces going from edge toward center, then running horizontally
        const templates: Pt[][] = [
          // Top group
          [
            {x: ox + f*0,   y: H*0.07},
            {x: ox + f*90,  y: H*0.07},
            {x: ox + f*130, y: H*0.12},
            {x: ox + f*130, y: H*0.19},
            {x: ox + f*180, y: H*0.24},
            {x: ox + f*300, y: H*0.24},
          ],
          [
            {x: ox + f*0,   y: H*0.16},
            {x: ox + f*70,  y: H*0.16},
            {x: ox + f*110, y: H*0.21},
            {x: ox + f*110, y: H*0.32},
            {x: ox + f*160, y: H*0.37},
            {x: ox + f*260, y: H*0.37},
          ],
          [
            {x: ox + f*0,   y: H*0.27},
            {x: ox + f*55,  y: H*0.27},
            {x: ox + f*95,  y: H*0.32},
            {x: ox + f*95,  y: H*0.45},
            {x: ox + f*145, y: H*0.50},
            {x: ox + f*230, y: H*0.50},
          ],
          // Mid
          [
            {x: ox + f*0,   y: H*0.38},
            {x: ox + f*65,  y: H*0.38},
            {x: ox + f*105, y: H*0.43},
            {x: ox + f*200, y: H*0.43},
          ],
          // Lower blue-accent
          [
            {x: ox + f*0,   y: H*0.58},
            {x: ox + f*95,  y: H*0.58},
            {x: ox + f*135, y: H*0.63},
            {x: ox + f*135, y: H*0.76},
            {x: ox + f*185, y: H*0.81},
            {x: ox + f*310, y: H*0.81},
          ],
          [
            {x: ox + f*0,   y: H*0.68},
            {x: ox + f*75,  y: H*0.68},
            {x: ox + f*115, y: H*0.73},
            {x: ox + f*215, y: H*0.73},
          ],
        ];
        templates.forEach(t => circuits.push(new Circuit(t, side)));
      };
      buildTraces('L');
      buildTraces('R');

      // ── Binary columns ──
      binColumns = [];
      // Left: a few columns near the left edge
      [14, 28, 42, 56, 70].forEach(x =>
        binColumns.push(new BinColumn(x, '#FF6A00', '#FF6A00')));
      // Right: mirrored
      [W-14, W-28, W-42, W-56, W-70].forEach(x =>
        binColumns.push(new BinColumn(x, '#2D7DFF', '#2D7DFF')));
    };

    // ─────────────────────────────────────────
    //  RENDER LOOP
    // ─────────────────────────────────────────
    const DEPTH = { HEX: 0.9, CIRCUIT: 1.5, BINARY: 0.5, PARTICLE: 1.8 };

    const render = () => {
      time++;

      // Smooth parallax
      const tx = (mouse.current.x - 0.5) * 2;
      const ty = (mouse.current.y - 0.5) * 2;
      parallax.current.x += (tx - parallax.current.x) * 0.04;
      parallax.current.y += (ty - parallax.current.y) * 0.04;
      const bpx = parallax.current.x * 16; // base parallax
      const bpy = parallax.current.y * 9;

      // ── Background ──
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, W, H);

      // Subtle warm center-bottom glow (always present)
      const bg = ctx.createRadialGradient(W/2, H*0.65, 0, W/2, H*0.65, W*0.55);
      bg.addColorStop(0,   'rgba(30,10,0,0.8)');
      bg.addColorStop(0.5, 'rgba(10,5,0,0.5)');
      bg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Layer 1: Horizon ──
      drawHorizon(bpx * 0.5, bpy * 0.5);

      // ── Layer 2: Corner Hex cells ──
      hexCells.forEach(h => {
        h.update();
        const ox = h.side === 'L' ?  bpx * DEPTH.HEX : -bpx * DEPTH.HEX;
        h.draw(ox, bpy * DEPTH.HEX);
      });

      // ── Layer 3: Binary digits ──
      binColumns.forEach(b => { b.update(); b.draw(); });

      // ── Layer 4: Circuit traces ──
      circuits.forEach(c => {
        c.update();
        c.draw(bpx * DEPTH.CIRCUIT, bpy * DEPTH.CIRCUIT);
      });

      // ── Layer 5: Particles ──
      particles.forEach(p => { p.update(); p.draw(); });

      // ── Vignette (darken edges, keep center bright) ──
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.18, W/2, H/2, W*0.82);
      vig.addColorStop(0,    'rgba(0,0,0,0)');
      vig.addColorStop(0.55, 'rgba(0,0,0,0)');
      vig.addColorStop(1,    'rgba(0,0,0,0.78)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize',    resize);
    resize();
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize',    resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

export default AnimatedHeroBackground;
