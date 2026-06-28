import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

interface StreakDef {
  angle: number;
  speed: number;
  maxDist: number;
  width: number;
  tailLag: number;
  hue: number;
  brightL: number;
}

export interface WarpTrigger {
  x: number;
  y: number;
}

interface WarpDriveProps {
  trigger: WarpTrigger | null;
  onComplete: () => void;
}

// ─────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────

const DURATION = 1250;
const STREAK_COUNT = 240;

function seedStreaks(diag: number): StreakDef[] {
  const out: StreakDef[] = [];
  for (let i = 0; i < STREAK_COUNT; i++) {
    out.push({
      angle:    Math.random() * Math.PI * 2,
      speed:    0.35 + Math.random() * 0.65,
      maxDist:  diag * (0.28 + Math.random() * 0.72),
      width:    0.25 + Math.random() * 1.4,
      tailLag:  0.06 + Math.random() * 0.22,
      hue:      Math.random() < 0.65 ? 248 + Math.random() * 22 : 200 + Math.random() * 50,
      brightL:  78 + Math.random() * 22,
    });
  }
  return out;
}

// ─────────────────────────────────────────────────────────
// Easing helpers
// ─────────────────────────────────────────────────────────

function easeInCubic(t: number) { return t * t * t; }
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

// Travel progress: shoots fast then eases to a stop just past screen edge
function travelEase(t: number): number {
  if (t < 0.55) return easeInCubic(t / 0.55) * 0.78;
  return 0.78 + easeOutCubic((t - 0.55) / 0.45) * 0.22;
}

// Overall alpha envelope: quick fade-in, hold, fade-out
function globalAlpha(t: number): number {
  if (t < 0.08) return t / 0.08;
  if (t < 0.65) return 1;
  return easeOutCubic(1 - (t - 0.65) / 0.35);
}

// Bloom envelope: rises fast, peaks at t≈0.3, then falls
function bloomAlpha(t: number): number {
  if (t < 0.3) return easeInCubic(t / 0.3);
  return easeOutCubic(1 - (t - 0.3) / 0.7);
}

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────

export function WarpDrive({ trigger, onComplete }: WarpDriveProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!trigger) return;

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

    const cx   = trigger.x;
    const cy   = trigger.y;
    const diag = Math.sqrt(W * W + H * H);

    const streaks = seedStreaks(diag);
    const startTime = performance.now();
    let rafId: number;

    const draw = (now: number) => {
      const elapsed = now - startTime;
      const t       = Math.min(elapsed / DURATION, 1);
      const travel  = travelEase(t);
      const gAlpha  = globalAlpha(t);
      const bAlpha  = bloomAlpha(t);

      ctx.clearRect(0, 0, W, H);

      // ── Vignette ──────────────────────────────────────
      const vig = ctx.createRadialGradient(cx, cy, 0, cx, cy, diag * 0.55);
      vig.addColorStop(0,   `rgba(0,0,0,0)`);
      vig.addColorStop(0.5, `rgba(0,0,12,${0.35 * gAlpha})`);
      vig.addColorStop(1,   `rgba(0,0,22,${0.75 * gAlpha})`);
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ── Streaks ───────────────────────────────────────
      ctx.save();
      for (const s of streaks) {
        const headDist = travel * s.speed * s.maxDist;
        const tailDist = Math.max(0, headDist - headDist * s.tailLag);

        if (headDist < 0.5) continue;

        const hx = cx + Math.cos(s.angle) * headDist;
        const hy = cy + Math.sin(s.angle) * headDist;
        const tx = cx + Math.cos(s.angle) * tailDist;
        const ty = cy + Math.sin(s.angle) * tailDist;

        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, `hsla(${s.hue},85%,${s.brightL}%,0)`);
        grad.addColorStop(0.55, `hsla(${s.hue},85%,${s.brightL}%,${0.55 * gAlpha})`);
        grad.addColorStop(1,  `hsla(${s.hue},95%,98%,${0.92 * gAlpha})`);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = s.width;
        ctx.lineCap     = "round";
        ctx.stroke();
      }
      ctx.restore();

      // ── Inner bright core ring ─────────────────────────
      // Small tight halo around origin so streaks "come from" something
      const coreR  = 4 + travel * 18;
      const corePk = Math.min(1, (1 - Math.abs(t - 0.2) / 0.28));
      if (corePk > 0) {
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
        core.addColorStop(0, `rgba(255,255,255,${0.95 * corePk * gAlpha})`);
        core.addColorStop(0.4, `rgba(200,170,255,${0.55 * corePk * gAlpha})`);
        core.addColorStop(1, `rgba(130,90,255,0)`);
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Outer bloom ───────────────────────────────────
      const bloomR = 30 + bAlpha * diag * 0.18;
      if (bAlpha > 0.01) {
        const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, bloomR);
        bloom.addColorStop(0,    `rgba(255,255,255,${0.72 * bAlpha * gAlpha})`);
        bloom.addColorStop(0.12, `rgba(210,185,255,${0.5  * bAlpha * gAlpha})`);
        bloom.addColorStop(0.4,  `rgba(140,100,255,${0.22 * bAlpha * gAlpha})`);
        bloom.addColorStop(1,    `rgba(80,50,200,0)`);
        ctx.fillStyle = bloom;
        ctx.beginPath();
        ctx.arc(cx, cy, bloomR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Full-screen white flash at peak ───────────────
      const flash = Math.max(0, 1 - Math.abs(t - 0.28) / 0.12);
      if (flash > 0.01) {
        ctx.fillStyle = `rgba(255,255,255,${flash * 0.18 * gAlpha})`;
        ctx.fillRect(0, 0, W, H);
      }

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
        zIndex:        9999,
        pointerEvents: "none",
      }}
    />
  );
}
