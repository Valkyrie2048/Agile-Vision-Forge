import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────
// Types  (same interface as before so App.tsx is unchanged)
// ─────────────────────────────────────────────────────────

export interface WarpTrigger { x: number; y: number; }

interface WarpDriveProps {
  trigger:    WarpTrigger | null;
  onComplete: () => void;
}

// ─────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────

const DURATION = 1400; // ms — total ripple lifetime

// Each ring: birth (0–1 of DURATION), maxR (fraction of diagonal),
// hue, sat, lum, base lineWidth
const RINGS = [
  { birth: 0.00, maxR: 0.50, h: 250, s: 85, l: 66, lw: 5.0 },
  { birth: 0.10, maxR: 0.58, h: 220, s: 80, l: 66, lw: 4.2 },
  { birth: 0.20, maxR: 0.64, h:  45, s: 85, l: 68, lw: 3.6 },
  { birth: 0.32, maxR: 0.68, h: 265, s: 78, l: 70, lw: 3.0 },
  { birth: 0.44, maxR: 0.56, h: 200, s: 72, l: 70, lw: 2.5 },
] as const;

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInQuad   = (t: number) => t * t;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}
function phase(t: number, a: number, b: number) {
  return clamp((t - a) / (b - a), 0, 1);
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

    // Reduced-motion: skip animation, fire callback immediately
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

      // ── Origin spark ─────────────────────────────────────
      // Brief white flash at the click point as the first ring is born.
      const sparkP = phase(t, 0, 0.14);
      if (sparkP < 1) {
        const sparkA = 1 - sparkP;
        const sparkR = 5 + sparkP * 22;
        const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, sparkR);
        sg.addColorStop(0,   `rgba(255,255,255,${sparkA * 0.92})`);
        sg.addColorStop(0.4, `rgba(220,200,255,${sparkA * 0.55})`);
        sg.addColorStop(1,   "rgba(180,140,255,0)");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(cx, cy, sparkR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Concentric rings ─────────────────────────────────
      ctx.save();
      for (const ring of RINGS) {
        if (t < ring.birth) continue;

        const age   = phase(t, ring.birth, 1.0);
        const r     = easeOutCubic(age) * diag * ring.maxR;
        const alpha = (1 - easeInQuad(age)) * 0.88;
        if (alpha < 0.015 || r < 1) continue;

        // Wide soft glow (blurred halo behind the ring)
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${ring.h},${ring.s}%,${ring.l}%,${alpha * 0.35})`;
        ctx.lineWidth   = ring.lw * (1.8 + age * 2.8);
        ctx.stroke();

        // Core ring — sharper, brighter
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${ring.h},${ring.s}%,${Math.min(ring.l + 16, 94)}%,${alpha})`;
        ctx.lineWidth   = ring.lw * 0.65;
        ctx.stroke();

        // Leading white edge (crisp inner highlight)
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.48})`;
        ctx.lineWidth   = ring.lw * 0.22;
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
        zIndex:        45,       // below nav (z-50), above content (z-2)
        pointerEvents: "none",
      }}
    />
  );
}
