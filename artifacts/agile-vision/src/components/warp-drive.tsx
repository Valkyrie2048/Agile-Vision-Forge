import { useEffect, useRef } from "react";

export interface WarpTrigger { x: number; y: number; }

interface WarpDriveProps {
  trigger:    WarpTrigger | null;
  onComplete: () => void;
}

// ─────────────────────────────────────────────────────────
// WebGL warp-tunnel pulse
//
// A raw-WebGL fragment shader renders an infinite perspective
// tunnel centred on the click vanishing point.  Rings expand
// outward from the horizon (r→0) to the screen edge, making
// the viewer feel like they are accelerating through deep space.
//
// Canvas uses CSS mix-blend-mode: screen so every pure-black
// pixel composites away — hero text, nodes and buttons stay
// fully readable.
// ─────────────────────────────────────────────────────────

// ── Vertex shader — one fullscreen triangle pair ──────────
const VERT = /* glsl */`
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// ── Fragment shader ───────────────────────────────────────
const FRAG = /* glsl */`
precision highp float;

uniform float u_t;       // 0.0 → 1.0 over DURATION ms
uniform vec2  u_origin;  // click pos in framebuffer px (y-up)
uniform vec2  u_res;     // framebuffer size in px

#define PI 3.14159265358979323846

void main() {
  // ── UV: centred on click, normalised by half viewport height ──
  vec2 px  = gl_FragCoord.xy - u_origin;
  vec2 uv  = px / (u_res.y * 0.5);
  float r  = length(uv);
  float th = atan(uv.y, uv.x);   // −π … +π

  // ── Perspective tunnel ─────────────────────────────────────
  // depth = k/r  →  large near horizon (r≈0), small near screen edge
  float k     = 0.55;
  float depth = k / max(r, 0.006);

  // Warp speed: accelerates quickly, plateaus, then ring flush slows
  float accel  = u_t * 18.0 + u_t * u_t * 5.0;
  float animD  = fract(depth + accel);   // sawtooth [0,1) per ring band

  // ── Ring brightness functions ──────────────────────────────
  // Soft belly glow peaks at animD = 0.5
  float belly   = pow(animD * (1.0 - animD) * 4.0, 4.0);
  // Sharp leading edge at animD ≈ 0  (front face of each ring)
  float leading = pow(max(0.0, 1.0 - animD * 7.0), 3.0);
  // Outer corona  at animD ≈ 1  (trailing edge receding behind you)
  float trailing = pow(max(0.0, animD - 0.75) * 4.0, 2.5);
  float glow     = belly * 0.50 + leading * 0.65 + trailing * 0.30;

  // ── Spiral accent — 6-fold symmetry ───────────────────────
  float spAngle = th / PI + depth * 0.12 + u_t * 0.40;
  float spBand  = sin(spAngle * 6.0 * PI);
  float spiral  = pow(max(0.0, spBand), 10.0) * 0.30 * belly;

  // ── Chromatic split — R/G/B rings at slightly different depths ─
  float dr = k / max(r * 1.00, 0.006);
  float dg = k / max(r * 1.02, 0.006);
  float db = k / max(r * 1.04, 0.006);
  float ar = fract(dr + accel);
  float ag = fract(dg + accel);
  float ab = fract(db + accel);
  float chromaBelly   = pow(ar*(1.-ar)*4., 4.) * 0.5
                      + pow(ag*(1.-ag)*4., 4.) * 0.5
                      + pow(ab*(1.-ab)*4., 4.) * 0.5;
  chromaBelly *= 0.20;   // subtle additive fringe

  // ── Radial masks ──────────────────────────────────────────
  float inner = smoothstep(0.04, 0.28, r);       // hollow centre = tunnel mouth
  float outer = 1.0 - smoothstep(1.35, 2.20, r); // clip off-screen
  float mask  = inner * outer;

  // Depth haze: rings very close to horizon are slightly dimmer
  float haze = 1.0 - smoothstep(8.0, 20.0, depth) * 0.45;

  // ── Time envelope ─────────────────────────────────────────
  float fadeIn  = smoothstep(0.0,  0.07, u_t);
  float fadeOut = 1.0 - smoothstep(0.76, 1.00, u_t);
  float env     = fadeIn * fadeOut;

  // ── Color palette ─────────────────────────────────────────
  // Brand: hsl(250 85% 60%) ≈ rgb(97,38,230)
  vec3 DEEP   = vec3(0.05, 0.01, 0.15);   // very dark purple wall
  vec3 BRAND  = vec3(0.38, 0.12, 0.84);   // brand purple
  vec3 BRIGHT = vec3(0.62, 0.40, 0.97);   // lighter purple
  vec3 WHITE  = vec3(0.94, 0.88, 1.00);   // near-white lavender
  vec3 GOLD   = vec3(1.00, 0.86, 0.50);   // gold accent on leading edge
  vec3 CYAN   = vec3(0.20, 0.80, 1.00);   // subtle cyan fringe

  // Base layer: tunnel wall (screens away on black background)
  vec3 col = DEEP * mask * 0.10;

  // Ring belly glow
  col += BRAND  * belly   * mask * haze * 0.20;
  col += BRIGHT * glow    * mask * haze * 0.14;

  // Leading edge punch
  col += WHITE  * leading * leading * mask * 0.18;
  col += GOLD   * pow(leading, 5.0) * mask * 0.10;

  // Trailing corona
  col += BRAND  * trailing * mask * 0.07;

  // Spiral accent
  col += CYAN   * spiral * mask * 0.08;
  col += BRIGHT * spiral * mask * 0.05;

  // Chromatic fringe
  col += WHITE * chromaBelly * mask * 0.03;

  // ── Origin bloom (warp initiation flash) ──────────────────
  float bloom    = pow(max(0.0, 1.0 - r * 3.8), 2.2);
  float bloomEnv = smoothstep(0.0, 0.05, u_t) * (1.0 - smoothstep(0.08, 0.36, u_t));
  col += WHITE  * bloom * bloomEnv * 0.22;
  col += BRIGHT * bloom * bloomEnv * 0.10;
  col += GOLD   * bloom * bloomEnv * 0.04;

  // ── Horizon glow (light at end of tunnel) ─────────────────
  float horizonR   = pow(max(0.0, 1.0 - r * 18.0), 1.5);
  float horizonEnv = smoothstep(0.06, 0.18, u_t) * (1.0 - smoothstep(0.50, 0.78, u_t));
  col += BRIGHT * horizonR * horizonEnv * 0.12;
  col += WHITE  * horizonR * horizonEnv * 0.08;

  // Apply time envelope
  col *= env;

  // Output opaque — CSS mix-blend-mode:screen handles compositing.
  // Black areas screen away, coloured areas add light to the scene.
  gl_FragColor = vec4(col, 1.0);
}
`;

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

function makeShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("WarpDrive shader error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function makeProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vert = makeShader(gl, gl.VERTEX_SHADER,   VERT);
  const frag = makeShader(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vert || !frag) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("WarpDrive link error:", gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

// Fullscreen quad: two triangles covering NDC [-1,1]²
const QUAD_VERTS = new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]);

const DURATION = 2500; // ms

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────

export function WarpDrive({ trigger, onComplete }: WarpDriveProps) {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!trigger) return;

    // Honour reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => onCompleteRef.current(), 60);
      return () => clearTimeout(id);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Canvas sizing ────────────────────────────────────────
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W   = window.innerWidth;
    const H   = window.innerHeight;
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    // ── WebGL context ────────────────────────────────────────
    // alpha:false  → canvas is opaque black; CSS mix-blend-mode:screen
    // makes black areas transparent to the viewer.
    const gl = canvas.getContext("webgl", {
      alpha:                 false,
      antialias:             false,
      depth:                 false,
      stencil:               false,
      powerPreference:       "high-performance",
    });
    if (!gl) {
      // WebGL not available — skip gracefully
      onCompleteRef.current();
      return;
    }

    // ── Shader program ───────────────────────────────────────
    const prog = makeProgram(gl);
    if (!prog) {
      onCompleteRef.current();
      return;
    }

    // ── Geometry buffer ──────────────────────────────────────
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, QUAD_VERTS, gl.STATIC_DRAW);

    gl.useProgram(prog);

    const aPosLoc  = gl.getAttribLocation(prog,  "a_pos");
    const uTLoc    = gl.getUniformLocation(prog,  "u_t");
    const uOriLoc  = gl.getUniformLocation(prog,  "u_origin");
    const uResLoc  = gl.getUniformLocation(prog,  "u_res");

    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    // ── Static uniforms ──────────────────────────────────────
    const fw = Math.round(W * dpr);
    const fh = Math.round(H * dpr);
    gl.viewport(0, 0, fw, fh);
    gl.uniform2f(uResLoc, fw, fh);

    // WebGL Y-axis is bottom-up; CSS/screen Y is top-down
    gl.uniform2f(uOriLoc,
      trigger.x * dpr,
      (H - trigger.y) * dpr,
    );

    gl.clearColor(0, 0, 0, 1);

    // ── Animation loop ───────────────────────────────────────
    const start = performance.now();
    let rafId: number;

    const draw = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTLoc, t);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (t < 1.0) {
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
        mixBlendMode:  "screen",
      }}
    />
  );
}
