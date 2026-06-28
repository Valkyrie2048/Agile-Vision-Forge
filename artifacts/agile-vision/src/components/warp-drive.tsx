import { useEffect, useRef } from "react";

export interface WarpTrigger { x: number; y: number; }

interface WarpDriveProps {
  trigger:    WarpTrigger | null;
  onComplete: () => void;
}

// ─────────────────────────────────────────────────────────
// Cinematic pulse — feature-film shockwave aesthetic.
// Drawn with "screen" composite so rings ADD light to the
// scene rather than sitting opaquely on top of content.
// Background, hero text, and nodes remain fully readable.
// ─────────────────────────────────────────────────────────

const DURATION = 2100; // ms — slow, stately wave

// Per ring config.  maxR is a fraction of the viewport diagonal.
// coreW = core stroke width (px).  glowW = soft halo width (px).
const RINGS = [
  { birth: 0.00, life: 0.84, maxR: 0.60, h: 255, s: 55, l: 93, coreW: 1.8, glowW: 30 },
  { birth: 0.09, life: 0.82, maxR: 0.72, h: 250, s: 48, l: 95, coreW: 1.5, glowW: 26 },
  { birth: 0.20, life: 0.80, maxR: 0.81, h: 220, s: 52, l: 91, coreW: 1.2, glowW: 22 },
  { birth: 0.34, life: 0.78, maxR: 0.88, h: 260, s: 42, l: 93, coreW: 1.0, glowW: 18 },
  { birth: 0.50, life: 0.74, maxR: 0.78, h: 250, s: 38, l: 95, coreW: 0.8, glowW: 15 },
] as const;

// Slow deceleration — rings expand fast then drift to a halt
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const easeInQuad   = (t: number) => t * t;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}
function phase(t: number, a: number, b: number) {
  return clamp((t - a) / (b - a), 0, 1);
}

// Alpha: quick fade-in over first 16% of life, full plateau until 52%, smooth decay.
function ringAlpha(age: number): number {
  if (age < 0.16) return age / 0.16;
  if (age < 0.52) return 1.0;
  return 1 - easeInQuad((age - 0.52) / 0.48);
}

export function WarpDrive({ trigger, onComplete }: WarpDriveProps) {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!trigger) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const id = setTimeout(() => onCompleteRef.current(), 60);
      return () => clearTimeout(id);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W   = window.innerWidth;
    const H   = window.innerHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx        = trigger.x;
    const cy        = trigger.y;
    const diag      = Math.sqrt(W * W + H * H);
    const startTime = performance.now();
    let   rafId: number;

    const draw = (now: number) => {
      const t = clamp((now - startTime) / DURATION, 0, 1);

      // Clear to fully transparent — "screen" composite will add light
      // on top of whatever is rendered behind this canvas element.
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";

      // ── Origin spark ────────────────────────────────────
      // A tight radial glow at the click point — appears briefly,
      // fades before the first ring has expanded far.
      const sparkP = phase(t, 0, 0.28);
      const sparkA = sparkP < 0.5
        ? sparkP / 0.5
        : 1 - (sparkP - 0.5) / 0.5;

      if (sparkA > 0.02) {
        const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 48);
        sg.addColorStop(0,    `rgba(255,255,255,${sparkA * 0.65})`);
        sg.addColorStop(0.35, `rgba(210,200,255,${sparkA * 0.24})`);
        sg.addColorStop(1,    "rgba(160,140,255,0)");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(cx, cy, 48, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Rings ─────────────────────────────────────────
      for (const ring of RINGS) {
        if (t < ring.birth) continue;
        const age  = phase(t, ring.birth, ring.birth + ring.life);
        const r    = easeOutQuart(age) * diag * ring.maxR;
        const a    = ringAlpha(age);
        if (a < 0.014 || r < 1) continue;

        // Diffuse halo — very soft and wide, barely-there purple tint
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${ring.h},${ring.s}%,${ring.l}%,${a * 0.13})`;
        ctx.lineWidth   = ring.glowW;
        ctx.stroke();

        // Core ring — thin, sharp white line
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${a * 0.44})`;
        ctx.lineWidth   = ring.coreW;
        ctx.stroke();
      }

      // Restore for next clear
      ctx.globalCompositeOperation = "source-over";

      if (t < 1) {
        rafId = requestAnimationFrame(draw);
      } else {
        onCompleteRef.current();
      }
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [trigger]);

  if (!trigger) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100%",
        height:        "100%",
        zIndex:        45,
        pointerEvents: "none",
      }}
    />
  );
}
