import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

export interface WarpTrigger { x: number; y: number; }

interface WarpDriveProps {
  trigger:    WarpTrigger | null;
  onComplete: () => void;
}

interface Star {
  angle:     number;   // initial radians
  spiral:    number;   // +1 | -1 — slow rotation during travel
  speed:     number;   // 0.35-1.0, per-star distance multiplier
  hue:       number;
  sat:       number;
  lum:       number;
  width:     number;   // base stroke width
  tailRatio: number;   // streak length as fraction of headDist
}

// ─────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────

const DURATION   = 2100;  // ms — longer for drama
const STAR_COUNT = 310;

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

const easeInCubic    = (t: number) => t * t * t;
const easeOutCubic   = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInQuart    = (t: number) => t * t * t * t;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function clamp(v: number, lo: number, hi: number) { return Math.min(hi, Math.max(lo, v)); }
function rng(lo: number, hi: number)               { return lo + Math.random() * (hi - lo); }
function phase(t: number, a: number, b: number)    { return clamp((t - a) / (b - a), 0, 1); }

// ─────────────────────────────────────────────────────────
// Star seeding
// ─────────────────────────────────────────────────────────

function seedStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => {
    const r       = Math.random();
    const isBlue  = r < 0.52;
    const isGold  = !isBlue && r < 0.68;
    // else purple
    return {
      angle:     rng(0, Math.PI * 2),
      spiral:    Math.random() < 0.5 ? 1 : -1,
      speed:     rng(0.32, 1.0),
      hue:       isBlue ? rng(205, 248) : isGold ? rng(36, 56) : rng(258, 292),
      sat:       isBlue ? rng(30, 80)  : isGold ? rng(65, 100) : rng(65, 95),
      lum:       rng(74, 100),
      width:     rng(0.22, 1.6),
      tailRatio: rng(0.09, 0.38),
    };
  });
}

// ─────────────────────────────────────────────────────────
// Travel progress (0 → 1)
//   0.00-0.12  compress inward from 0.40 → 0
//   0.12-1.00  explode outward   from 0   → 1
// ─────────────────────────────────────────────────────────

function starProgress(t: number): number {
  if (t <= 0.12) return 0.40 * (1 - easeInCubic(t / 0.12));
  return easeInCubic(phase(t, 0.12, 0.88));
}

// Speed factor (0-1): how fast stars appear to be moving right now
// Used for streak length and chromatic aberration amount.
function speedFactor(t: number): number {
  if (t <= 0.12) return easeInCubic(t / 0.12);
  return easeInOutCubic(phase(t, 0.12, 0.85));
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

    const stars     = seedStars();
    const startTime = performance.now();
    let   rafId: number;
    let   frame = 0;

    // Shockwave ring definitions
    const ringDefs = [
      { tBirth: 0.12, tLife: 0.52, speed: 0.88, hue: 265, lum: 90, lw: 2.8 },
      { tBirth: 0.29, tLife: 0.50, speed: 0.72, hue: 245, lum: 86, lw: 2.1 },
      { tBirth: 0.47, tLife: 0.48, speed: 0.94, hue: 255, lum: 91, lw: 1.7 },
    ];

    const draw = (now: number) => {
      frame++;
      const t = clamp((now - startTime) / DURATION, 0, 1);

      // ── derived values ─────────────────────────────────
      const compressP = phase(t, 0, 0.12);
      const sf        = speedFactor(t);
      const progress  = starProgress(t);
      // Global alpha: full during effect, fades out at tail
      const gAlpha    = 1 - easeInQuart(phase(t, 0.86, 1.0));

      // ── Layer 0: motion-blur persistence ───────────────
      // First frame: hard clear so we start clean
      if (frame === 1) ctx.clearRect(0, 0, W, H);

      // Each subsequent frame we lay a semi-transparent dark rect
      // which decays previous content into trails.
      // Compression: fast decay (sharp dots). Hyperspace: slow decay (long streaks).
      const trailAlpha = t < 0.12 ? 0.82
                       : t < 0.84 ? 0.20
                       :            0.75 + phase(t, 0.84, 1.0) * 0.20;
      ctx.fillStyle = `rgba(3,1,12,${trailAlpha})`;
      ctx.fillRect(0, 0, W, H);

      // ── Layer 1: nebula background blobs ───────────────
      // Soft coloured clouds add depth and colour to the tunnel.
      const nA = Math.min(phase(t, 0.09, 0.28), 1 - phase(t, 0.82, 0.93)) * 0.32;
      if (nA > 0.01) {
        ctx.save();
        ctx.filter = "blur(58px)";
        const blobs = [
          { rx: cx + W * 0.30,  ry: cy - H * 0.32, r: diag * 0.24, h: 258 },
          { rx: cx - W * 0.34,  ry: cy + H * 0.28, r: diag * 0.19, h: 218 },
          { rx: cx + W * 0.04,  ry: cy + H * 0.40, r: diag * 0.21, h: 278 },
        ];
        for (const b of blobs) {
          const bg = ctx.createRadialGradient(b.rx, b.ry, 0, b.rx, b.ry, b.r);
          bg.addColorStop(0,   `hsla(${b.h},75%,30%,${nA})`);
          bg.addColorStop(0.6, `hsla(${b.h},65%,18%,${nA * 0.45})`);
          bg.addColorStop(1,   "rgba(0,0,0,0)");
          ctx.fillStyle = bg;
          ctx.beginPath();
          ctx.arc(b.rx, b.ry, b.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.filter = "none";
        ctx.restore();
      }

      // ── Layer 2: star streaks + chromatic aberration ───
      const maxDist  = diag * 0.72;
      const spiralT  = phase(t, 0.12, 1.0) * 0.14; // slow angular drift

      ctx.save();
      ctx.lineCap = "round";
      for (const s of stars) {
        const headDist = maxDist * s.speed * progress;
        if (headDist < 2) continue;

        const effAngle = s.angle + s.spiral * spiralT;
        const cosA = Math.cos(effAngle);
        const sinA = Math.sin(effAngle);
        const hx   = cx + cosA * headDist;
        const hy   = cy + sinA * headDist;

        // Streak length: longer when moving fast AND further from centre (perspective)
        const rawStreak = headDist * s.tailRatio * sf * 2.6;
        const streakLen = clamp(rawStreak, 0, headDist * 0.92);
        const tailDist  = headDist - streakLen;
        const tx = cx + cosA * tailDist;
        const ty = cy + sinA * tailDist;

        if (streakLen < 0.8) continue;

        // Star brightness: fades in as it emerges, clips at extreme distance
        const df        = headDist / (maxDist * s.speed);
        const starAlpha = clamp(df * 3.5, 0, 1) * gAlpha
                        * (1 - clamp((df - 0.82) / 0.18, 0, 1));
        if (starAlpha < 0.03) continue;

        const w = s.width * (0.55 + sf * 1.9);

        // Chromatic aberration — perpendicular to travel direction
        const caAmt = clamp(sf * 3.5 + w * 0.8, 0, 7);
        const px = -sinA, py = cosA;   // perpendicular unit vector

        // Red fringe (+perp side)
        {
          const ox = px * caAmt, oy = py * caAmt;
          const g = ctx.createLinearGradient(tx + ox, ty + oy, hx + ox * 0.18, hy + oy * 0.18);
          g.addColorStop(0,   "rgba(255,55,75,0)");
          g.addColorStop(0.65, `rgba(255,80,105,${0.30 * starAlpha})`);
          g.addColorStop(1,    `rgba(255,115,135,${0.62 * starAlpha})`);
          ctx.beginPath();
          ctx.moveTo(tx + ox, ty + oy);
          ctx.lineTo(hx + ox * 0.18, hy + oy * 0.18);
          ctx.strokeStyle = g;
          ctx.lineWidth = w * 0.62;
          ctx.stroke();
        }

        // Cyan fringe (-perp side)
        {
          const ox = -px * caAmt, oy = -py * caAmt;
          const g = ctx.createLinearGradient(tx + ox, ty + oy, hx + ox * 0.18, hy + oy * 0.18);
          g.addColorStop(0,   "rgba(55,125,255,0)");
          g.addColorStop(0.65, `rgba(70,140,255,${0.30 * starAlpha})`);
          g.addColorStop(1,    `rgba(95,165,255,${0.62 * starAlpha})`);
          ctx.beginPath();
          ctx.moveTo(tx + ox, ty + oy);
          ctx.lineTo(hx + ox * 0.18, hy + oy * 0.18);
          ctx.strokeStyle = g;
          ctx.lineWidth = w * 0.62;
          ctx.stroke();
        }

        // Main streak
        {
          const g = ctx.createLinearGradient(tx, ty, hx, hy);
          g.addColorStop(0,    `hsla(${s.hue},${s.sat}%,${s.lum}%,0)`);
          g.addColorStop(0.52, `hsla(${s.hue},${s.sat}%,${s.lum}%,${0.68 * starAlpha})`);
          g.addColorStop(1,    `hsla(${s.hue},${clamp(s.sat + 18, 0, 100)}%,99%,${starAlpha})`);
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(hx, hy);
          ctx.strokeStyle = g;
          ctx.lineWidth = w;
          ctx.stroke();
        }

        // Bright head dot
        if (starAlpha > 0.22 && headDist > 12) {
          ctx.fillStyle = `rgba(255,255,255,${0.90 * starAlpha})`;
          ctx.beginPath();
          ctx.arc(hx, hy, w * 0.88, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // ── Layer 3: shockwave rings ────────────────────────
      ctx.save();
      for (const rd of ringDefs) {
        if (t < rd.tBirth) continue;
        const age = phase(t, rd.tBirth, rd.tBirth + rd.tLife);
        const r   = easeOutCubic(age) * diag * 0.74 * rd.speed;
        const ra  = (1 - age) * gAlpha;
        if (ra < 0.02) continue;

        // Main ring
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${rd.hue},80%,${rd.lum}%,${ra})`;
        ctx.lineWidth   = rd.lw * (1 + age * 1.8);
        ctx.stroke();

        // Inner white edge
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${ra * 0.38})`;
        ctx.lineWidth   = rd.lw * 0.45;
        ctx.stroke();
      }
      ctx.restore();

      // ── Layer 4: central singularity ───────────────────

      // Compression pupil: dark contracting hole
      if (t < 0.15) {
        const pR = 24 * (1 - easeInCubic(compressP));
        if (pR > 0.5) {
          ctx.save();
          const pg = ctx.createRadialGradient(cx, cy, 0, cx, cy, pR + 14);
          pg.addColorStop(0,               `rgba(0,0,0,${0.97 * compressP})`);
          pg.addColorStop(pR / (pR + 14),  `rgba(18,4,48,${0.55 * compressP})`);
          pg.addColorStop(1,               "rgba(0,0,0,0)");
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(cx, cy, pR + 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Birth flash — bright spike at launch moment (t≈0.12)
      const bfA = phase(t, 0.10, 0.18) * (1 - phase(t, 0.18, 0.33));
      if (bfA > 0.01) {
        const br = 8 + phase(t, 0.10, 0.20) * 72;
        ctx.save();
        const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, br);
        bg.addColorStop(0,    `rgba(255,255,255,${bfA})`);
        bg.addColorStop(0.18, `rgba(230,210,255,${0.82 * bfA})`);
        bg.addColorStop(0.55, `rgba(148,88,255,${0.42 * bfA})`);
        bg.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(cx, cy, br, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Sustained core glow (during hyperspace)
      const coreA = phase(t, 0.18, 0.32) * (1 - phase(t, 0.60, 0.86)) * gAlpha;
      if (coreA > 0.01) {
        const cr = 10 + phase(t, 0.18, 0.62) * 26;
        ctx.save();
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        cg.addColorStop(0,    `rgba(255,255,255,${coreA})`);
        cg.addColorStop(0.28, `rgba(205,180,255,${0.68 * coreA})`);
        cg.addColorStop(0.68, `rgba(130,75,255,${0.32 * coreA})`);
        cg.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── Layer 5: lens flare cross ───────────────────────
      const flP = phase(t, 0.38, 0.86);
      const flA = flP < 0.42
        ? easeInOutCubic(flP / 0.42)
        : 1 - easeOutCubic((flP - 0.42) / 0.58);
      if (flA > 0.02) {
        const rotOff = phase(t, 0.38, 0.86) * 0.10; // slow rotation
        const fl     = diag * 0.42 * flA;

        ctx.save();
        ctx.lineCap = "round";

        // 4 cardinal rays (longer, brighter)
        for (let k = 0; k < 4; k++) {
          const a  = k * Math.PI / 2 + rotOff;
          const fx = cx + Math.cos(a) * fl;
          const fy = cy + Math.sin(a) * fl;
          const lg = ctx.createLinearGradient(cx, cy, fx, fy);
          lg.addColorStop(0,    `rgba(255,255,255,${0.92 * flA})`);
          lg.addColorStop(0.05, `rgba(218,198,255,${0.72 * flA})`);
          lg.addColorStop(0.28, `rgba(155,105,255,${0.30 * flA})`);
          lg.addColorStop(1,    "rgba(100,60,255,0)");
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(fx, fy);
          ctx.strokeStyle = lg;
          ctx.lineWidth   = 2.4 * flA;
          ctx.stroke();
        }

        // 4 diagonal rays (shorter, subtler)
        for (let k = 0; k < 4; k++) {
          const a  = k * Math.PI / 2 + Math.PI / 4 + rotOff;
          const fx = cx + Math.cos(a) * fl * 0.54;
          const fy = cy + Math.sin(a) * fl * 0.54;
          const lg = ctx.createLinearGradient(cx, cy, fx, fy);
          lg.addColorStop(0, `rgba(205,182,255,${0.55 * flA})`);
          lg.addColorStop(1, "rgba(100,60,255,0)");
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(fx, fy);
          ctx.strokeStyle = lg;
          ctx.lineWidth   = 1.2 * flA;
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── Layer 6: outer bloom ────────────────────────────
      const blP = phase(t, 0.10, 0.80);
      const blA = blP < 0.35
        ? easeInQuart(blP / 0.35)
        : 1 - easeInOutCubic((blP - 0.35) / 0.65);
      if (blA > 0.02 && gAlpha > 0.01) {
        const br2 = 30 + blA * diag * 0.20;
        const bg  = ctx.createRadialGradient(cx, cy, 0, cx, cy, br2);
        bg.addColorStop(0,    `rgba(255,255,255,${0.88 * blA * gAlpha})`);
        bg.addColorStop(0.11, `rgba(222,198,255,${0.62 * blA * gAlpha})`);
        bg.addColorStop(0.36, `rgba(145,90,255,${0.28 * blA * gAlpha})`);
        bg.addColorStop(1,    "rgba(72,42,200,0)");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(cx, cy, br2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Layer 7: exit flash ─────────────────────────────
      // White surge at peak, fades to purple tint
      const exP = phase(t, 0.54, 0.84);
      const exA = exP < 0.28
        ? easeInQuart(exP / 0.28)
        : 1 - easeOutCubic((exP - 0.28) / 0.72);
      if (exA > 0.01 && gAlpha > 0.01) {
        ctx.fillStyle = `rgba(255,255,255,${exA * 0.34 * gAlpha})`;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Layer 8: vignette ───────────────────────────────
      const vigA = Math.min(phase(t, 0.06, 0.24), 1 - phase(t, 0.82, 1.0)) * gAlpha;
      if (vigA > 0.01) {
        const vg = ctx.createRadialGradient(cx, cy, 0, cx, cy, diag * 0.62);
        vg.addColorStop(0,   "rgba(0,0,0,0)");
        vg.addColorStop(0.52, `rgba(0,0,10,${0.20 * vigA})`);
        vg.addColorStop(1,    `rgba(0,0,24,${0.84 * vigA})`);
        ctx.fillStyle = vg;
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
