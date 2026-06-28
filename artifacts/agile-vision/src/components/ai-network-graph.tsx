import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

type NodeType = "model" | "tool" | "data" | "output";

interface NodeDef {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  connections: string[];
  metrics: { latency: string; throughput: string; accuracy: string };
}

interface SimNode extends NodeDef {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  t: number;
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

// ─────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────

const NODE_DEFS: NodeDef[] = [
  {
    id: "gpt4o", label: "GPT-4o", type: "model",
    description: "Multimodal reasoning & generation",
    connections: ["websearch", "codeexec", "vectordb", "planner", "apiresponse"],
    metrics: { latency: "340ms", throughput: "2.1k tok/s", accuracy: "97.4%" },
  },
  {
    id: "claude", label: "Claude 3.5", type: "model",
    description: "Long-context analysis & writing",
    connections: ["memory", "filestore", "planner", "reportgen"],
    metrics: { latency: "280ms", throughput: "1.8k tok/s", accuracy: "96.8%" },
  },
  {
    id: "gemini", label: "Gemini Pro", type: "model",
    description: "Image & video understanding",
    connections: ["filestore", "apiresponse"],
    metrics: { latency: "410ms", throughput: "1.5k tok/s", accuracy: "94.2%" },
  },
  {
    id: "mistral", label: "Mistral 8x7B", type: "model",
    description: "Fast parallel inference",
    connections: ["codeexec", "stream"],
    metrics: { latency: "120ms", throughput: "4.2k tok/s", accuracy: "91.7%" },
  },
  {
    id: "embedder", label: "Embedder", type: "model",
    description: "Semantic vector encoding",
    connections: ["vectordb", "memory"],
    metrics: { latency: "45ms", throughput: "8.4k tok/s", accuracy: "99.1%" },
  },
  {
    id: "websearch", label: "Web Search", type: "tool",
    description: "Real-time web retrieval",
    connections: ["stream", "dashboard"],
    metrics: { latency: "520ms", throughput: "42 req/s", accuracy: "88.3%" },
  },
  {
    id: "codeexec", label: "Code Exec", type: "tool",
    description: "Safe sandboxed runtime",
    connections: ["apiresponse"],
    metrics: { latency: "890ms", throughput: "8 req/s", accuracy: "99.6%" },
  },
  {
    id: "memory", label: "Memory", type: "tool",
    description: "Persistent agent context",
    connections: ["vectordb"],
    metrics: { latency: "12ms", throughput: "200 req/s", accuracy: "99.9%" },
  },
  {
    id: "planner", label: "Planner", type: "tool",
    description: "Multi-step task decomposition",
    connections: ["evaluator", "emailagent", "sqlstore"],
    metrics: { latency: "230ms", throughput: "15 req/s", accuracy: "93.5%" },
  },
  {
    id: "evaluator", label: "Evaluator", type: "tool",
    description: "Output quality scoring",
    connections: ["apiresponse", "dashboard"],
    metrics: { latency: "180ms", throughput: "28 req/s", accuracy: "96.2%" },
  },
  {
    id: "vectordb", label: "Vector DB", type: "data",
    description: "Semantic embedding store",
    connections: ["filestore"],
    metrics: { latency: "8ms", throughput: "1.2k req/s", accuracy: "99.9%" },
  },
  {
    id: "filestore", label: "File Store", type: "data",
    description: "Document & media storage",
    connections: [],
    metrics: { latency: "35ms", throughput: "320 req/s", accuracy: "99.8%" },
  },
  {
    id: "stream", label: "Event Stream", type: "data",
    description: "Real-time event pipeline",
    connections: ["dashboard", "webhook"],
    metrics: { latency: "4ms", throughput: "50k evt/s", accuracy: "99.9%" },
  },
  {
    id: "sqlstore", label: "SQL Store", type: "data",
    description: "Structured data queries",
    connections: ["dashboard"],
    metrics: { latency: "18ms", throughput: "800 req/s", accuracy: "99.7%" },
  },
  {
    id: "apiresponse", label: "API Response", type: "output",
    description: "Structured JSON output",
    connections: ["webhook"],
    metrics: { latency: "< 1ms", throughput: "5k req/s", accuracy: "99.9%" },
  },
  {
    id: "dashboard", label: "Dashboard", type: "output",
    description: "Live analytics UI",
    connections: [],
    metrics: { latency: "60ms", throughput: "200 ws/s", accuracy: "98.1%" },
  },
  {
    id: "emailagent", label: "Email Agent", type: "output",
    description: "Automated communications",
    connections: ["reportgen"],
    metrics: { latency: "1.2s", throughput: "180/min", accuracy: "95.4%" },
  },
  {
    id: "webhook", label: "Webhook", type: "output",
    description: "External system triggers",
    connections: [],
    metrics: { latency: "< 1ms", throughput: "2k req/s", accuracy: "99.9%" },
  },
  {
    id: "reportgen", label: "Report Gen", type: "output",
    description: "Document synthesis",
    connections: [],
    metrics: { latency: "3.4s", throughput: "12/min", accuracy: "92.8%" },
  },
];

// Derive edges list once (directed pairs [fromIdx, toIdx])
const IDX: Record<string, number> = {};
NODE_DEFS.forEach((n, i) => { IDX[n.id] = i; });

const EDGES: [number, number][] = [];
NODE_DEFS.forEach((n, i) => {
  n.connections.forEach(targetId => {
    const j = IDX[targetId];
    if (j !== undefined) EDGES.push([i, j]);
  });
});

// Set of connected-node pairs for fast lookup
const CONNECTED_SET = new Set<string>(
  EDGES.map(([a, b]) => `${a}-${b}`).concat(EDGES.map(([a, b]) => `${b}-${a}`))
);

function isConnected(a: number, b: number) {
  return CONNECTED_SET.has(`${a}-${b}`);
}

// ─────────────────────────────────────────────────────────
// Tour steps
// ─────────────────────────────────────────────────────────

interface TourStep {
  title: string;
  description: string;
  path: string[];
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "RAG: Retrieval-Augmented Generation",
    description: "A user request arrives at GPT-4o, which queries the Vector DB for relevant context, then returns a structured API Response in milliseconds.",
    path: ["gpt4o", "vectordb", "apiresponse"],
  },
  {
    title: "Semantic Memory Pipeline",
    description: "The Embedder converts raw text into dense vectors and stores them in the Vector DB, which syncs to File Store for long-term persistence.",
    path: ["embedder", "vectordb", "filestore"],
  },
  {
    title: "Autonomous Agent Loop",
    description: "Claude 3.5 orchestrates a Planner that decomposes complex tasks, routes them through an Evaluator for quality scoring, then surfaces insights on the Dashboard.",
    path: ["claude", "planner", "evaluator", "dashboard"],
  },
  {
    title: "Real-Time Event Pipeline",
    description: "Mistral generates and executes code at high speed inside a safe sandbox, producing an API Response that triggers downstream Webhooks instantly.",
    path: ["mistral", "codeexec", "apiresponse", "webhook"],
  },
];

// Node-reveal timing per step (ms per node + hold after all revealed)
const TOUR_NODE_REVEAL_MS = 480;
const TOUR_HOLD_MS = 2000;
const TOUR_START_IDLE_MS = 5000;
const TOUR_STORAGE_KEY = "agile-vision-tour-seen";

const TYPE_COLOR: Record<NodeType, { h: number; s: number; l: number }> = {
  model:  { h: 250, s: 22, l: 68 },
  tool:   { h: 250, s: 22, l: 68 },
  data:   { h: 250, s: 22, l: 68 },
  output: { h: 250, s: 22, l: 68 },
};

const TYPE_LABEL: Record<NodeType, string> = {
  model: "Model", tool: "Tool", data: "Data", output: "Output",
};

const TYPE_BADGE_BG: Record<NodeType, string> = {
  model:  "rgba(120,80,240,0.25)",
  tool:   "rgba(60,130,230,0.25)",
  data:   "rgba(40,190,170,0.25)",
  output: "rgba(60,190,100,0.25)",
};

const TYPE_BADGE_BORDER: Record<NodeType, string> = {
  model:  "rgba(160,120,255,0.5)",
  tool:   "rgba(100,170,255,0.5)",
  data:   "rgba(60,220,190,0.5)",
  output: "rgba(80,220,130,0.5)",
};

const TYPE_TEXT: Record<NodeType, string> = {
  model:  "rgb(200,170,255)",
  tool:   "rgb(140,190,255)",
  data:   "rgb(80,230,210)",
  output: "rgb(100,230,150)",
};

function hsl(c: { h: number; s: number; l: number }, alpha = 1) {
  return `hsla(${c.h},${c.s}%,${c.l}%,${alpha})`;
}

function nodeColor(type: NodeType, alpha = 1) {
  return hsl(TYPE_COLOR[type], alpha);
}

const NODE_RADIUS = 2.5;
const IDEAL_EDGE_LEN = 140;
const REPULSION_K = 9000;
const SPRING_K = 0.004;
const CENTER_K = 0.005;
const DAMPING = 0.88;

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────

export function AINetworkGraph() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  // Simulation state (all in refs for perf)
  const nodesRef = useRef<SimNode[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const hoveredIdxRef = useRef<number | null>(null);
  const frameRef = useRef(0);
  const exclRadiusRef = useRef(280); // exclusion zone radius, measured from hero heading

  // Tour refs (read inside the draw loop, must be refs not state)
  const tourNodesRef = useRef<Set<number>>(new Set());   // indices of currently lit tour nodes
  const tourEdgesRef = useRef<Set<string>>(new Set());   // "a-b" strings for lit tour edges
  const tourActiveRef = useRef(false);
  const tourTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Hover state — drives cursor style only (no card)
  const [hoveredNode, setHoveredNode] = useState<boolean>(false);

  // Tour UI state
  const [tourStep, setTourStep] = useState<number | null>(null);          // null = not started/done
  const [tourRevealCount, setTourRevealCount] = useState(0);              // how many nodes revealed so far

  const dismissTour = useCallback(() => {
    // Clear all pending timers
    tourTimersRef.current.forEach(clearTimeout);
    tourTimersRef.current = [];
    // Clear draw-loop refs
    tourNodesRef.current = new Set();
    tourEdgesRef.current = new Set();
    tourActiveRef.current = false;
    // Clear React state
    setTourStep(null);
    setTourRevealCount(0);
    // Remember we've seen it
    try { localStorage.setItem(TOUR_STORAGE_KEY, "1"); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = () => window.innerWidth < 768;

    // ── Init simulation nodes ─────────────────────────────
    const init = (w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const initR = exclRadiusRef.current + 30; // start at ring centre
      nodesRef.current = NODE_DEFS.map((def, i) => {
        const angle  = (i / NODE_DEFS.length) * Math.PI * 2;
        const jitter = 0.92 + Math.random() * 0.16;
        return {
          ...def,
          x: cx + Math.cos(angle) * initR * jitter,
          y: cy + Math.sin(angle) * initR * jitter,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        };
      });

      // Seed pulses — one per edge, staggered
      pulsesRef.current = EDGES.map(([from, to], i) => ({
        fromIdx: from, toIdx: to,
        t: (i / EDGES.length),
        speed: 0.0015 + Math.random() * 0.002,
      }));
      // Add extra pulses for busier edges
      EDGES.forEach(([from, to]) => {
        if (Math.random() > 0.5) {
          pulsesRef.current.push({
            fromIdx: from, toIdx: to,
            t: Math.random(),
            speed: 0.0015 + Math.random() * 0.002,
          });
        }
      });
    };

    // ── Resize ────────────────────────────────────────────
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrapper.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width;
      const h = rect.height;

      // Measure exclusion zone from hero heading element
      const headingEl = document.querySelector<HTMLElement>('[data-hero-heading]');
      if (headingEl) {
        // h1 is block-level; its height is the reliable measurement.
        // Width: heading text fills ~55% of block width when centred.
        const hr = headingEl.getBoundingClientRect();
        const headingHalfH = hr.height / 2;
        // Add badge above (~62px) + subtitle/buttons/tags below (~120px) for full content
        const contentHalfH = headingHalfH + 90;
        // Use viewport-relative width estimate: heading text ≈ 52% of viewport at large sizes
        const contentHalfW = Math.min(w * 0.27, 360);
        const measured = Math.sqrt(contentHalfW * contentHalfW + contentHalfH * contentHalfH);
        exclRadiusRef.current = Math.min(Math.max(measured + 38, 160), Math.min(w, h) * 0.43);
      } else {
        exclRadiusRef.current = Math.min(w, h) * 0.40;
      }

      if (nodesRef.current.length === 0) init(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    // Mobile: no auto-cycle (panel removed)
    const mobileCycleTimer: ReturnType<typeof setInterval> | null = null;

    // ── Physics step ─────────────────────────────────────
    const step = (w: number, h: number) => {
      const nodes = nodesRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const mouse = mouseRef.current;

      // Reset accelerations
      const ax = new Float64Array(nodes.length);
      const ay = new Float64Array(nodes.length);

      // Repulsion between all pairs
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist2 = dx * dx + dy * dy + 1;
          const f = REPULSION_K / dist2;
          const dist = Math.sqrt(dist2);
          ax[i] += (dx / dist) * f;
          ay[i] += (dy / dist) * f;
          ax[j] -= (dx / dist) * f;
          ay[j] -= (dy / dist) * f;
        }
      }

      // Spring attraction for connected pairs
      for (const [a, b] of EDGES) {
        const dx = nodes[b].x - nodes[a].x;
        const dy = nodes[b].y - nodes[a].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const stretch = dist - IDEAL_EDGE_LEN;
        const f = stretch * SPRING_K;
        ax[a] += (dx / dist) * f;
        ay[a] += (dy / dist) * f;
        ax[b] -= (dx / dist) * f;
        ay[b] -= (dy / dist) * f;
      }

      // Center exclusion + ring attraction
      const EXCL_R   = exclRadiusRef.current;
      const TARGET_R  = EXCL_R + 28;   // ring centre — nodes attracted here
      const OUTER_R   = EXCL_R + 85;   // outer soft wall
      for (let i = 0; i < nodes.length; i++) {
        const dxc = nodes[i].x - cx;
        const dyc = nodes[i].y - cy;
        const distC = Math.sqrt(dxc * dxc + dyc * dyc) || 1;
        const nx = dxc / distC;
        const ny = dyc / distC;

        if (distC < EXCL_R) {
          // Hard wall: snap to boundary + strip inward velocity
          nodes[i].x = cx + nx * EXCL_R;
          nodes[i].y = cy + ny * EXCL_R;
          const vDotN = nodes[i].vx * nx + nodes[i].vy * ny;
          if (vDotN < 0) {
            nodes[i].vx -= 1.4 * vDotN * nx;
            nodes[i].vy -= 1.4 * vDotN * ny;
          }
        }

        if (distC > EXCL_R) {
          // Bidirectional ring attraction toward TARGET_R
          const ringErr = distC - TARGET_R;
          const ringK   = ringErr < 0 ? 0.14 : 0.10;
          ax[i] -= nx * ringErr * ringK;
          ay[i] -= ny * ringErr * ringK;

          // Outer soft wall
          if (distC > OUTER_R) {
            ax[i] -= nx * (distC - OUTER_R) * CENTER_K * 1.8;
            ay[i] -= ny * (distC - OUTER_R) * CENTER_K * 1.8;
          }
        }
      }

      // Mouse repulsion
      if (mouse.x > -999) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist2 = dx * dx + dy * dy + 1;
          if (dist2 < 22500) { // 150px
            const dist = Math.sqrt(dist2);
            const f = 1800 / dist2;
            ax[i] += (dx / dist) * f;
            ay[i] += (dy / dist) * f;
          }
        }
      }

      // Integrate + damp (skip position update for hovered node — freeze it in place)
      const hoveredIdx = hoveredIdxRef.current;
      for (let i = 0; i < nodes.length; i++) {
        if (i === hoveredIdx) {
          // Drain velocity so it stops quickly without snapping
          nodes[i].vx *= 0.5;
          nodes[i].vy *= 0.5;
          continue;
        }
        nodes[i].vx = (nodes[i].vx + ax[i]) * DAMPING;
        nodes[i].vy = (nodes[i].vy + ay[i]) * DAMPING;
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;

        // Soft boundary
        const pad = NODE_RADIUS + 8;
        if (nodes[i].x < pad) nodes[i].vx += (pad - nodes[i].x) * 0.15;
        if (nodes[i].x > w - pad) nodes[i].vx -= (nodes[i].x - (w - pad)) * 0.15;
        if (nodes[i].y < pad) nodes[i].vy += (pad - nodes[i].y) * 0.15;
        if (nodes[i].y > h - pad) nodes[i].vy -= (nodes[i].y - (h - pad)) * 0.15;
      }
    };

    // ── Hit test ─────────────────────────────────────────
    const hitTest = (mx: number, my: number): number | null => {
      const nodes = nodesRef.current;
      let best: number | null = null;
      let bestD = (NODE_RADIUS + 20) * (NODE_RADIUS + 20);
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - mx;
        const dy = nodes[i].y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD) { bestD = d2; best = i; }
      }
      return best;
    };

    // ── Draw ─────────────────────────────────────────────
    const draw = () => {
      const rect = wrapper.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      step(w, h);
      frameRef.current += 1;

      const nodes = nodesRef.current;
      const hovered = hoveredIdxRef.current;
      const pulses = pulsesRef.current;
      const ripples = ripplesRef.current;
      const tourNodes = tourNodesRef.current;
      const tourEdges = tourEdgesRef.current;
      const isTour = tourActiveRef.current;

      // Helper: node opacity — no active-node dimming
      const nodeAlpha = (i: number) => {
        if (isTour) {
          if (tourNodes.has(i)) return 1;
          return 0.06;
        }
        return 0.18;
      };

      const edgeAlpha = (a: number, b: number) => {
        if (isTour) {
          if (tourEdges.has(`${a}-${b}`) || tourEdges.has(`${b}-${a}`)) return 0.75;
          return 0.03;
        }
        return 0.08;
      };

      // ── 1. Edges ──
      for (const [a, b] of EDGES) {
        const na = nodes[a];
        const nb = nodes[b];
        const alpha = edgeAlpha(a, b);
        const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
        grad.addColorStop(0, nodeColor(na.type, alpha));
        grad.addColorStop(1, nodeColor(nb.type, alpha));
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = (isTour && (tourEdges.has(`${a}-${b}`) || tourEdges.has(`${b}-${a}`))) ? 2 : 0.8;
        ctx.stroke();
      }

      // ── 2. Pulse particles ──
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;
        const na = nodes[p.fromIdx];
        const nb = nodes[p.toIdx];
        const px = na.x + (nb.x - na.x) * p.t;
        const py = na.y + (nb.y - na.y) * p.t;

        const ea = edgeAlpha(p.fromIdx, p.toIdx);
        if (ea < 0.1) continue;

        const col = nodeColor(na.type, Math.min(ea * 3, 0.95));
        // Glow
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 5);
        pg.addColorStop(0, col);
        pg.addColorStop(1, nodeColor(na.type, 0));
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();
        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
      }

      // ── 3. Node glows — interactive nodes only ──
      for (let i = 0; i < nodes.length; i++) {
        const isHov = i === hovered;
        const isTourNode = isTour && tourNodes.has(i);
        if (!isHov && !isTourNode) continue;
        const n = nodes[i];
        const alpha = nodeAlpha(i);
        if (alpha < 0.1) continue;
        const glowR = isTourNode ? 28 : isHov ? 22 : 16;
        const coreAlpha = isTourNode ? 0.30 : isHov ? 0.22 : 0.10;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        g.addColorStop(0, nodeColor(n.type, coreAlpha * alpha));
        g.addColorStop(1, nodeColor(n.type, 0));
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ── 4. Node circles ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const alpha = nodeAlpha(i);
        if (alpha < 0.03) continue;
        const isHov = i === hovered;
        const isTourNode = isTour && tourNodes.has(i);
        const isInteractive = isHov || isTourNode;

        if (isInteractive) {
          const r = NODE_RADIUS + 3;
          const c = TYPE_COLOR[n.type];

          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = nodeColor(n.type, isTourNode ? 0.9 : 0.55);
          ctx.lineWidth = isTourNode ? 2 : 1.2;
          ctx.stroke();

          const fill = ctx.createRadialGradient(
            n.x - r * 0.25, n.y - r * 0.25, 0, n.x, n.y, r
          );
          fill.addColorStop(0, hsl({ h: c.h, s: c.s, l: Math.min(c.l + 15, 90) }, alpha));
          fill.addColorStop(1, hsl({ h: c.h, s: c.s - 10, l: c.l - 12 }, alpha));
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = fill;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = nodeColor(n.type, 0.5 * alpha);
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Idle: plain dim dot, no gradient
          ctx.beginPath();
          ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor(n.type, alpha);
          ctx.fill();
        }
      }

      // ── 5. Labels — only on hovered / active / tour nodes ──
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (let i = 0; i < nodes.length; i++) {
        const isHovL = i === hovered;
        const isTourL = isTour && tourNodes.has(i);
        if (!isHovL && !isTourL) continue;
        const n = nodes[i];
        const alpha = nodeAlpha(i);
        if (alpha < 0.1) continue;
        const labelY = n.y + NODE_RADIUS + 5;
        ctx.fillStyle = `rgba(255,255,255,${0.9 * alpha})`;
        ctx.fillText(n.label, n.x, labelY);
      }

      // ── 6. Ripples ──
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 2.8;
        rp.alpha *= 0.93;
        if (rp.alpha < 0.01) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rp.color.replace("1)", `${rp.alpha})`);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // ── 7. Tour node "live" dots (pulsing) ──
      if (isTour) {
        const pulse = Math.sin(frameRef.current * 0.06) * 0.4 + 0.6;
        for (const idx of tourNodes) {
          const n = nodes[idx];
          ctx.beginPath();
          ctx.arc(n.x - NODE_RADIUS - 1, n.y - NODE_RADIUS - 1, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor(n.type, pulse);
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    // ── Mouse / click on the interaction overlay ─────────
    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current = { x: mx, y: my };

      if (!isMobile()) {
        const hit = hitTest(mx, my);
        if (hit !== hoveredIdxRef.current) {
          hoveredIdxRef.current = hit;
          setHoveredNode(hit !== null);
        }
      }
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      hoveredIdxRef.current = null;
      setHoveredNode(false);
    };

    const onClick = (e: MouseEvent) => {
      if (isMobile()) return;
      const rect = wrapper.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const hit = hitTest(mx, my);
      // Stop node clicks from bubbling to the hero ripple trigger
      if (hit !== null) e.stopPropagation();
    };

    const overlay = wrapperRef.current?.querySelector<HTMLDivElement>(".ai-network-overlay");
    overlay?.addEventListener("mousemove", onMove);
    overlay?.addEventListener("mouseleave", onLeave);
    overlay?.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      if (mobileCycleTimer) clearInterval(mobileCycleTimer);
      overlay?.removeEventListener("mousemove", onMove);
      overlay?.removeEventListener("mouseleave", onLeave);
      overlay?.removeEventListener("click", onClick);
    };
  }, []);

  // ── Tour orchestration ───────────────────────────────────
  useEffect(() => {
    // Check if already seen
    try {
      if (localStorage.getItem(TOUR_STORAGE_KEY)) return;
    } catch { /* ignore */ }

    const scheduleStep = (stepIdx: number) => {
      if (stepIdx >= TOUR_STEPS.length) {
        // Tour complete
        const t = setTimeout(() => dismissTour(), 600);
        tourTimersRef.current.push(t);
        return;
      }

      const step = TOUR_STEPS[stepIdx];
      const pathIndices = step.path.map(id => IDX[id]).filter(i => i !== undefined);

      // Reset highlights for new step
      tourNodesRef.current = new Set();
      tourEdgesRef.current = new Set();
      tourActiveRef.current = true;
      setTourStep(stepIdx);
      setTourRevealCount(0);

      // Reveal each node in the path one at a time
      pathIndices.forEach((nodeIdx, i) => {
        const t = setTimeout(() => {
          tourNodesRef.current = new Set([...tourNodesRef.current, nodeIdx]);

          // Add edge from previous node if applicable
          if (i > 0) {
            const prevIdx = pathIndices[i - 1];
            tourEdgesRef.current = new Set([
              ...tourEdgesRef.current,
              `${prevIdx}-${nodeIdx}`,
              `${nodeIdx}-${prevIdx}`,
            ]);
          }
          setTourRevealCount(i + 1);

          // Spawn a ripple on this node
          const nodes = nodesRef.current;
          if (nodes[nodeIdx]) {
            const n = nodes[nodeIdx];
            const col = TYPE_COLOR[n.type];
            ripplesRef.current.push({
              x: n.x, y: n.y,
              radius: NODE_RADIUS + 4,
              maxRadius: 80,
              alpha: 0.7,
              color: `hsla(${col.h},${col.s}%,${col.l}%,1)`,
            });
          }
        }, i * TOUR_NODE_REVEAL_MS);
        tourTimersRef.current.push(t);
      });

      // After all nodes revealed + hold, advance to next step
      const advanceDelay = pathIndices.length * TOUR_NODE_REVEAL_MS + TOUR_HOLD_MS;
      const advanceTimer = setTimeout(() => {
        scheduleStep(stepIdx + 1);
      }, advanceDelay);
      tourTimersRef.current.push(advanceTimer);
    };

    const startTimer = setTimeout(() => {
      scheduleStep(0);
    }, TOUR_START_IDLE_MS);
    tourTimersRef.current.push(startTimer);

    return () => {
      tourTimersRef.current.forEach(clearTimeout);
      tourTimersRef.current = [];
    };
  }, [dismissTour]);

  // ── Tour UI overlay ──────────────────────────────────────
  const renderTour = () => {
    if (tourStep === null) return null;
    const step = TOUR_STEPS[tourStep];
    const pathLen = step.path.length;

    // Build the path label with arrows
    const pathLabels = step.path.map(id => NODE_DEFS[IDX[id]]?.label ?? id);

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 72,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(480px, calc(100% - 32px))",
          zIndex: 40,
          filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.6))",
          animation: "tourFadeIn 0.4s ease-out",
        }}
      >
        <div
          style={{
            background: "rgba(8,5,22,0.93)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(160,120,255,0.25)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Progress bar */}
          <div style={{ height: 2, background: "rgba(255,255,255,0.06)" }}>
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #8b5cf6, #60a5fa)",
                width: `${((tourStep + tourRevealCount / pathLen) / TOUR_STEPS.length) * 100}%`,
                transition: "width 0.4s ease",
              }}
            />
          </div>

          <div style={{ padding: "16px 18px 14px" }}>
            {/* Step counter + title */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
                    color: "rgba(160,130,255,0.7)", background: "rgba(140,92,246,0.15)",
                    border: "1px solid rgba(140,92,246,0.3)", borderRadius: 4, padding: "1px 7px",
                  }}>
                    {tourStep + 1} / {TOUR_STEPS.length}
                  </span>
                  <span style={{ fontSize: 9, color: "rgba(200,190,240,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Data flow
                  </span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f0ecff", lineHeight: 1.3, marginBottom: 6 }}>
                  {step.title}
                </div>
              </div>
            </div>

            {/* Path visualization */}
            <div style={{
              display: "flex", alignItems: "center",
              marginBottom: 10, flexWrap: "wrap", gap: 4,
            }}>
              {pathLabels.map((label, i) => {
                const nodeIdx = IDX[step.path[i]];
                const nodeType = NODE_DEFS[nodeIdx]?.type ?? "model";
                const revealed = i < tourRevealCount;
                return (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {i > 0 && (
                      <svg width="14" height="10" viewBox="0 0 14 10" style={{ opacity: revealed ? 0.7 : 0.2, transition: "opacity 0.3s" }}>
                        <path d="M0 5h10M8 2l4 3-4 3" stroke="rgba(200,180,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 6,
                      background: revealed ? TYPE_BADGE_BG[nodeType] : "rgba(255,255,255,0.04)",
                      border: `1px solid ${revealed ? TYPE_BADGE_BORDER[nodeType] : "rgba(255,255,255,0.08)"}`,
                      color: revealed ? TYPE_TEXT[nodeType] : "rgba(200,190,240,0.3)",
                      transition: "all 0.35s ease",
                      boxShadow: revealed ? `0 0 12px ${TYPE_BADGE_BORDER[nodeType]}` : "none",
                    }}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Description */}
            <div style={{ fontSize: 11, color: "rgba(200,190,240,0.6)", lineHeight: 1.55, marginBottom: 12 }}>
              {step.description}
            </div>

            {/* Step dots + skip */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 5 }}>
                {TOUR_STEPS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === tourStep ? 18 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === tourStep
                        ? "linear-gradient(90deg,#8b5cf6,#60a5fa)"
                        : i < tourStep ? "rgba(140,92,246,0.45)" : "rgba(255,255,255,0.12)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
              {/* Skip button — needs pointer-events */}
              <button
                onClick={dismissTour}
                style={{
                  pointerEvents: "all",
                  background: "transparent",
                  border: "1px solid rgba(200,180,255,0.2)",
                  borderRadius: 6,
                  padding: "4px 12px",
                  color: "rgba(200,180,255,0.5)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(200,180,255,0.9)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,180,255,0.45)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(200,180,255,0.5)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,180,255,0.2)";
                }}
              >
                Skip tour
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0"
      style={{ zIndex: 4 }}
    >
      <style>{`
        @keyframes tourFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        data-testid="ai-network-graph"
      />
      {/* Transparent interaction overlay — sits above canvas but below hero content (z-10) */}
      <div
        className="ai-network-overlay absolute inset-0"
        style={{ zIndex: 6, cursor: hoveredNode ? "pointer" : "default" }}
      />
      {renderTour()}
    </div>
  );
}
