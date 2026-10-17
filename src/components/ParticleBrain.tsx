import { useRef, useEffect } from "react";

const COLORS = ["#8052ff","#926aff","#b094ff","#ffb829","#15846e","#00d4ff","#ff6b9d","#ffffff","#8052ff","#ffb829"];

interface Tri {
  x: number; y: number;
  bx: number; by: number; // brain target
  vx: number; vy: number;
  color: string; size: number;
  opacity: number; phase: number;
  ambient: boolean;
}

export default function ParticleBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let tris: Tri[] = [];
    let W = 0, H = 0;
    let frame = 0;
    let mx = 0.5, my = 0.5;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      build();
    };

    // Generate brain shape points (two lobes)
    const brainPts = (n: number): [number,number][] => {
      const pts: [number,number][] = [];
      const cx = W * 0.5, cy = H * 0.5;
      const rx = Math.min(W,H) * 0.38, ry = Math.min(W,H) * 0.33;

      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        // Two-lobe brain outline (parametric)
        const lobe = Math.cos(t) > 0 ? 1 : 0.85;
        const bumpX = 1 + 0.15 * Math.sin(3 * t) + 0.08 * Math.sin(7 * t);
        const bumpY = 1 + 0.1 * Math.cos(5 * t) + 0.05 * Math.cos(9 * t);
        // Fill interior too
        const r = Math.random();
        const ri = r * r; // bias toward edge
        pts.push([
          cx + Math.cos(t) * rx * bumpX * lobe * (0.3 + 0.7 * ri),
          cy + Math.sin(t) * ry * bumpY * (0.3 + 0.7 * ri) - ry * 0.05
        ]);
      }
      return pts;
    };

    const build = () => {
      tris = [];
      const N = Math.min(1200, Math.floor(W * H / 800));
      const brain = N * 0.85 | 0;
      const ambient = N - brain;

      const pts = brainPts(brain);
      pts.forEach(([bx, by], i) => {
        tris.push({
          x: bx + (Math.random() - 0.5) * W,
          y: by + (Math.random() - 0.5) * H,
          bx, by,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          color: COLORS[i % COLORS.length],
          size: Math.random() * 2.5 + 0.8,
          opacity: Math.random() * 0.5 + 0.2,
          phase: Math.random() * Math.PI * 2,
          ambient: false,
        });
      });
      // Ambient scattered particles
      for (let i = 0; i < ambient; i++) {
        const ax = Math.random() * W, ay = Math.random() * H;
        tris.push({
          x: ax, y: ay, bx: ax, by: ay,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 1.2 + 0.4,
          opacity: Math.random() * 0.25 + 0.05,
          phase: Math.random() * Math.PI * 2,
          ambient: true,
        });
      }
    };

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / W;
      my = (e.clientY - r.top) / H;
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      frame++;

      tris.forEach(t => {
        if (!t.ambient) {
          // Drift toward brain position
          const dx = t.bx - t.x, dy = t.by - t.y;
          t.x += dx * 0.008 + t.vx;
          t.y += dy * 0.008 + t.vy;
          // Slow gentle drift
          t.vx += (Math.random() - 0.5) * 0.02;
          t.vy += (Math.random() - 0.5) * 0.02;
          t.vx *= 0.92; t.vy *= 0.92;

          // Mouse proximity repulse
          const mdx = (t.x/W - mx) * W, mdy = (t.y/H - my) * H;
          const md = Math.sqrt(mdx*mdx + mdy*mdy);
          if (md < 100) { t.x += (mdx/md)*1.5; t.y += (mdy/md)*1.5; }
        } else {
          t.x += t.vx; t.y += t.vy;
          if (t.x < 0) t.x = W; if (t.x > W) t.x = 0;
          if (t.y < 0) t.y = H; if (t.y > H) t.y = 0;
        }

        // Pulsing opacity
        const op = t.opacity * (0.6 + 0.4 * Math.sin(frame * 0.02 + t.phase));

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, op));
        ctx.strokeStyle = t.color;
        ctx.fillStyle = t.color;
        ctx.lineWidth = t.ambient ? 0.6 : 0.9;
        ctx.beginPath();
        const s = t.size;
        ctx.moveTo(t.x, t.y - s);
        ctx.lineTo(t.x - s * 0.866, t.y + s * 0.5);
        ctx.lineTo(t.x + s * 0.866, t.y + s * 0.5);
        ctx.closePath();
        if (t.size > 1.8 && !t.ambient) ctx.fill(); else ctx.stroke();
        ctx.restore();
      });
    };

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("mousemove", onMouse); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}
