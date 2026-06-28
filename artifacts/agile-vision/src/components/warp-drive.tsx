import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

export interface WarpTrigger { x: number; y: number; }

interface WarpDriveProps {
  trigger:    WarpTrigger | null;
  onComplete: () => void;
}

// ─────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────

const DURATION = 1700; // ms

// Per ring: birth and life are fractions of DURATION.
// Outer rings live longer so they don't vanish while still large.
const RINGS = [
  { birth: 0.00, life: 0.70, maxR: 0.54, h: 250, s: 92, l: 70, lw: 7.0 },
  { birth: 0.06, life: 0.66, maxR: 0.44, h: 255, s: 88, l: 82, lw: 4.5 },
  { birth: 0.13, life: 0.70, maxR: 0.64, h: 222, s: 86, l: 70, lw: 5.5 },
  { birth: 0.21, life: 0.72, maxR: 0.74, h:  45, s: 92, l: 72, lw: 4.5 },
  { birth: 0.31, life: 0.70, maxR: 0.80, h: 265, s: 84, l: 73, lw: 3.8 },
  { birth: 0.42, life: 0.66, maxR: 0.70, h: 200, s: 78, l: 73, lw: 3.2 },
  { birth: 0.55, life: 0.62, maxR: 0.60, h: 250, s: 76, l: 70, lw: 2.6 },
] as const;

// ─────────────────────────────────────────────────────────
// Easing
// ─────────────────────────────────────────────────────────

// Fast burst that decelerates — perfect for wave expansion
const easeOutExpo  = (t: number) => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
const easeInCubic  = (t: number) => t * t * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}
function phase(t: number, a: number, b: number) {
  return clamp((t - a) / (b - a), 0, 1);
}

// Ring alpha: holds near full brightness for the first 40% of its life,
// then falls off with a cubic curve so the disappearance feels crisp.
function ringAlpha(age: number): number {
  return age < 0.40 ? 1.0 : 1 - easeInCubic((age - 0.40) / 0.60);
}

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────

export function WarpDrive({ trigger, onComplete }: WarpDriveProps) {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!trigger) return;

    // Reduced-motion: skip animation entirely
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
      ctx.clearRect(0, 0, W, H);

      // ── Origin bloom ─────────────────────────────────────
      // A vivid radial burst at the click point that lingers briefly
      // before fading, giving the rings a clear source to emanate from.
      const bloomAge  = phase(t, 0, 0.58);
      const bloomFade = bloomAge < 0.42
        ? 1.0
        : 1 - easeOutCubic((bloomAge - 0.42) / 0.58);
      const bloomR = easeOutCubic(Math.min(bloomAge / 0.30, 1)) * 88;

      if (bloomR > 0.5 && bloomFade > 0.02) {
        const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, bloomR);
        bg.addColorStop(0,    `rgba(255,255,255,${bloomFade * 0.96})`);
        bg.addColorStop(0.18, `rgba(235,215,255,${bloomFade * 0.72})`);
        bg.addColorStop(0.52, `rgba(160,110,255,${bloomFade * 0.36})`);
        bg.addColorStop(1,    "rgba(130,80,255,0)");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(cx, cy, bloomR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Concentric rings ─────────────────────────────────
      ctx.save();
      for (const ring of RINGS) {
        if (t < ring.birth) continue;

        // age 0 → 1 within this ring's own lifespan
        const age  = phase(t, ring.birth, ring.birth + ring.life);
        const r    = easeOutExpo(age) * diag * ring.maxR;
        const alph = ringAlpha(age) * 0.92;
        if (alph < 0.018 || r < 1) continue;

        // Wide diffuse glow (blurred halo behind the ring)
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${ring.h},${ring.s}%,${ring.l}%,${alph * 0.30})`;
        ctx.lineWidth   = ring.lw * (2.4 + age * 3.2);
        ctx.stroke();

        // Core ring — sharper, fully saturated
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${ring.h},${ring.s}%,${Math.min(ring.l + 14, 94)}%,${alph})`;
        ctx.lineWidth   = ring.lw * 0.72;
        ctx.stroke();

        // Bright leading edge
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alph * 0.54})`;
        ctx.lineWidth   = ring.lw * 0.26;
        ctx.stroke();
      }
      ctx.restore();

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
