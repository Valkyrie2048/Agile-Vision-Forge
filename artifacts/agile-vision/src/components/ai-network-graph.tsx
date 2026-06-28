import { useEffect, useRef, useState } from "react";

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
  metrics: { latency: string; throughput: string; uptime: string };
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
    metrics: { latency: "340ms", throughput: "2.1k tok/s", uptime: "99.97%" },
  },
  {
    id: "claude", label: "Claude 3.5", type: "model",
    description: "Long-context analysis & writing",
    connections: ["memory", "filestore", "planner", "reportgen"],
    metrics: { latency: "280ms", throughput: "1.8k tok/s", uptime: "99.94%" },
  },
  {
    id: "gemini", label: "Gemini Pro", type: "model",
    description: "Image & video understanding",
    connections: ["filestore", "apiresponse"],
    metrics: { latency: "410ms", throughput: "1.5k tok/s", uptime: "99.91%" },
  },
  {
    id: "mistral", label: "Mistral 8x7B", type: "model",
    description: "Fast parallel inference",
    connections: ["codeexec", "stream"],
    metrics: { latency: "120ms", throughput: "4.2k tok/s", uptime: "99.88%" },
  },
  {
    id: "embedder", label: "Embedder", type: "model",
    description: "Semantic vector encoding",
    connections: ["vectordb", "memory"],
    metrics: { latency: "45ms", throughput: "8.4k tok/s", uptime: "99.99%" },
  },
  {
    id: "websearch", label: "Web Search", type: "tool",
    description: "Real-time web retrieval",
    connections: ["stream", "dashboard"],
    metrics: { latency: "520ms", throughput: "42 req/s", uptime: "99.82%" },
  },
  {
    id: "codeexec", label: "Code Exec", type: "tool",
    description: "Safe sandboxed runtime",
    connections: ["apiresponse"],
    metrics: { latency: "890ms", throughput: "8 req/s", uptime: "99.76%" },
  },
  {
    id: "memory", label: "Memory", type: "tool",
    description: "Persistent agent context",
    connections: ["vectordb"],
    metrics: { latency: "12ms", throughput: "200 req/s", uptime: "99.99%" },
  },
  {
    id: "planner", label: "Planner", type: "tool",
    description: "Multi-step task decomposition",
    connections: ["evaluator", "emailagent", "sqlstore"],
    metrics: { latency: "230ms", throughput: "15 req/s", uptime: "99.91%" },
  },
  {
    id: "evaluator", label: "Evaluator", type: "tool",
    description: "Output quality scoring",
    connections: ["apiresponse", "dashboard"],
    metrics: { latency: "180ms", throughput: "28 req/s", uptime: "99.95%" },
  },
  {
    id: "vectordb", label: "Vector DB", type: "data",
    description: "Semantic embedding store",
    connections: ["filestore"],
    metrics: { latency: "8ms", throughput: "1.2k req/s", uptime: "99.99%" },
  },
  {
    id: "filestore", label: "File Store", type: "data",
    description: "Document & media storage",
    connections: [],
    metrics: { latency: "35ms", throughput: "320 req/s", uptime: "99.98%" },
  },
  {
    id: "stream", label: "Event Stream", type: "data",
    description: "Real-time event pipeline",
    connections: ["dashboard", "webhook"],
    metrics: { latency: "4ms", throughput: "50k evt/s", uptime: "99.99%" },
  },
  {
    id: "sqlstore", label: "SQL Store", type: "data",
    description: "Structured data queries",
    connections: ["dashboard"],
    metrics: { latency: "18ms", throughput: "800 req/s", uptime: "99.97%" },
  },
  {
    id: "apiresponse", label: "API Response", type: "output",
    description: "Structured JSON output",
    connections: ["webhook"],
    metrics: { latency: "< 1ms", throughput: "5k req/s", uptime: "99.99%" },
  },
  {
    id: "dashboard", label: "Dashboard", type: "output",
    description: "Live analytics UI",
    connections: [],
    metrics: { latency: "60ms", throughput: "200 ws/s", uptime: "99.94%" },
  },
  {
    id: "emailagent", label: "Email Agent", type: "output",
    description: "Automated communications",
    connections: ["reportgen"],
    metrics: { latency: "1.2s", throughput: "180/min", uptime: "99.88%" },
  },
  {
    id: "webhook", label: "Webhook", type: "output",
    description: "External system triggers",
    connections: [],
    metrics: { latency: "< 1ms", throughput: "2k req/s", uptime: "99.97%" },
  },
  {
    id: "reportgen", label: "Report Gen", type: "output",
    description: "Document synthesis",
    connections: [],
    metrics: { latency: "3.4s", throughput: "12/min", uptime: "99.92%" },
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

const TYPE_COLOR: Record<NodeType, { h: number; s: number; l: number }> = {
  model:  { h: 252, s: 85, l: 67 },
  tool:   { h: 214, s: 88, l: 66 },
  data:   { h: 174, s: 72, l: 54 },
  output: { h: 143, s: 62, l: 58 },
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

const NODE_RADIUS = 18;
const IDEAL_EDGE_LEN = 160;
const REPULSION_K = 6000;
const SPRING_K = 0.04;
const CENTER_K = 0.003;
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
  const activeIdxRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  // React state for hover card only
  const [hoveredNode, setHoveredNode] = useState<{ node: SimNode; sx: number; sy: number } | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

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
      const r = Math.min(w, h) * 0.35;
      nodesRef.current = NODE_DEFS.map((def, i) => {
        const angle = (i / NODE_DEFS.length) * Math.PI * 2;
        const jitter = 0.4 + Math.random() * 0.6;
        return {
          ...def,
          x: cx + Math.cos(angle) * r * jitter,
          y: cy + Math.sin(angle) * r * jitter,
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
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;
      if (nodesRef.current.length === 0) init(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    // ── Mobile auto-cycle ─────────────────────────────────
    let mobileCycleTimer: ReturnType<typeof setInterval> | null = null;
    let mobileCycleIdx = 0;
    if (isMobile()) {
      mobileCycleTimer = setInterval(() => {
        mobileCycleIdx = (mobileCycleIdx + 1) % NODE_DEFS.length;
        activeIdxRef.current = mobileCycleIdx;
        setActiveIdx(mobileCycleIdx);
      }, 3000);
    }

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

      // Center gravity
      for (let i = 0; i < nodes.length; i++) {
        ax[i] += (cx - nodes[i].x) * CENTER_K;
        ay[i] += (cy - nodes[i].y) * CENTER_K;
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

      // Integrate + damp
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].vx = (nodes[i].vx + ax[i]) * DAMPING;
        nodes[i].vy = (nodes[i].vy + ay[i]) * DAMPING;
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;

        // Soft boundary
        const pad = NODE_RADIUS + 24;
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
      let bestD = (NODE_RADIUS + 12) * (NODE_RADIUS + 12);
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
      const active = activeIdxRef.current;
      const hovered = hoveredIdxRef.current;
      const pulses = pulsesRef.current;
      const ripples = ripplesRef.current;

      // Helper: node opacity
      const nodeAlpha = (i: number) => {
        if (active === null) return 1;
        if (i === active) return 1;
        if (isConnected(i, active)) return 0.85;
        return 0.12;
      };

      const edgeAlpha = (a: number, b: number) => {
        if (active === null) return 0.22;
        if (a === active || b === active) return 0.7;
        return 0.04;
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
        ctx.lineWidth = active !== null && (a === active || b === active) ? 1.5 : 0.8;
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

      // ── 3. Node glows ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const alpha = nodeAlpha(i);
        if (alpha < 0.1) continue;
        const isHov = i === hovered;
        const isAct = i === active;
        const glowR = isAct ? 56 : isHov ? 46 : 34;
        const coreAlpha = isAct ? 0.35 : isHov ? 0.28 : 0.14;
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
        if (alpha < 0.05) continue;
        const isHov = i === hovered;
        const isAct = i === active;
        const r = isHov || isAct ? NODE_RADIUS + 3 : NODE_RADIUS;
        const c = TYPE_COLOR[n.type];

        // Border ring (active/hovered)
        if (isAct || isHov) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = nodeColor(n.type, isAct ? 0.9 : 0.55);
          ctx.lineWidth = isAct ? 2 : 1.2;
          ctx.stroke();
        }

        // Fill
        const fill = ctx.createRadialGradient(
          n.x - r * 0.25, n.y - r * 0.25, 0,
          n.x, n.y, r
        );
        fill.addColorStop(0, hsl({ h: c.h, s: c.s, l: Math.min(c.l + 15, 90) }, alpha));
        fill.addColorStop(1, hsl({ h: c.h, s: c.s - 10, l: c.l - 12 }, alpha));
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();

        // Inner stroke
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = nodeColor(n.type, 0.5 * alpha);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── 5. Labels ──
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const alpha = nodeAlpha(i);
        if (alpha < 0.1) continue;
        const labelY = n.y + NODE_RADIUS + 6;
        ctx.fillStyle = `rgba(255,255,255,${0.75 * alpha})`;
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

      // ── 7. Active node "live" dot (pulsing) ──
      if (active !== null) {
        const n = nodes[active];
        const pulse = Math.sin(frameRef.current * 0.06) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(n.x - NODE_RADIUS + 5, n.y - NODE_RADIUS + 5, 4, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor(n.type, pulse);
        ctx.fill();
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
          if (hit !== null) {
            const n = nodesRef.current[hit];
            setHoveredNode({ node: n, sx: n.x, sy: n.y });
          } else {
            setHoveredNode(null);
          }
        } else if (hit !== null) {
          // Update card position smoothly
          const n = nodesRef.current[hit];
          setHoveredNode(prev => prev ? { ...prev, sx: n.x, sy: n.y } : null);
        }
      }
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      hoveredIdxRef.current = null;
      setHoveredNode(null);
    };

    const onClick = (e: MouseEvent) => {
      if (isMobile()) return;
      const rect = wrapper.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const hit = hitTest(mx, my);

      if (hit === null) {
        activeIdxRef.current = null;
        setActiveIdx(null);
        return;
      }

      if (hit === activeIdxRef.current) {
        activeIdxRef.current = null;
        setActiveIdx(null);
        return;
      }

      activeIdxRef.current = hit;
      setActiveIdx(hit);

      // Spawn ripple
      const n = nodesRef.current[hit];
      const col = TYPE_COLOR[n.type];
      ripplesRef.current.push({
        x: n.x, y: n.y,
        radius: NODE_RADIUS + 4,
        maxRadius: 90,
        alpha: 0.8,
        color: `hsla(${col.h},${col.s}%,${col.l}%,1)`,
      });
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

  // ── Hover card ──────────────────────────────────────────
  const renderCard = () => {
    if (!hoveredNode) return null;
    const { node, sx, sy } = hoveredNode;
    const wrapper = wrapperRef.current;
    if (!wrapper) return null;
    const wh = wrapper.getBoundingClientRect().height;

    // Position above node if in bottom half, else below
    const above = sy > wh / 2;
    const cardTop = above ? sy - NODE_RADIUS - 8 - 170 : sy + NODE_RADIUS + 14;
    const rawLeft = sx - 110; // card width ~220
    const containerW = wrapper.getBoundingClientRect().width;
    const cardLeft = Math.max(8, Math.min(rawLeft, containerW - 228));

    const connectedNames = NODE_DEFS.filter((_, i) => isConnected(IDX[node.id], i) && i !== IDX[node.id]).map(n => n.label);

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: cardLeft,
          top: cardTop,
          width: 220,
          zIndex: 30,
          filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))",
        }}
      >
        <div
          style={{
            background: "rgba(12,8,28,0.92)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${TYPE_BADGE_BORDER[node.type]}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{ padding: "10px 12px 8px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                  padding: "2px 7px", borderRadius: 4,
                  background: TYPE_BADGE_BG[node.type],
                  border: `1px solid ${TYPE_BADGE_BORDER[node.type]}`,
                  color: TYPE_TEXT[node.type],
                }}
              >
                {TYPE_LABEL[node.type]}
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f0ecff", marginBottom: 2 }}>{node.label}</div>
            <div style={{ fontSize: 11, color: "rgba(200,190,240,0.6)", lineHeight: 1.4 }}>{node.description}</div>
          </div>

          {/* Metrics */}
          <div style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { label: "Latency", value: node.metrics.latency },
              { label: "Throughput", value: node.metrics.throughput },
              { label: "Uptime", value: node.metrics.uptime },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "rgba(200,190,240,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: TYPE_TEXT[node.type], fontFamily: "JetBrains Mono, monospace" }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Connections */}
          {connectedNames.length > 0 && (
            <div style={{ padding: "7px 12px 9px" }}>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(200,190,240,0.35)", marginBottom: 5 }}>Connected to</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {connectedNames.slice(0, 5).map(name => (
                  <span key={name} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "rgba(255,255,255,0.07)", color: "rgba(200,190,240,0.65)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {name}
                  </span>
                ))}
                {connectedNames.length > 5 && (
                  <span style={{ fontSize: 9, color: "rgba(200,190,240,0.4)" }}>+{connectedNames.length - 5} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // "Click to explore" hint — only show if nothing is active
  const renderHint = () => {
    if (activeIdx !== null) return null;
    return (
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: 15 }}
      >
        <div
          style={{
            fontSize: 10, color: "rgba(200,180,255,0.35)", letterSpacing: "0.1em",
            textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <span style={{ width: 24, height: 1, background: "rgba(200,180,255,0.2)", display: "inline-block" }} />
          Click any node to explore
          <span style={{ width: 24, height: 1, background: "rgba(200,180,255,0.2)", display: "inline-block" }} />
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
      {renderCard()}
      {renderHint()}
    </div>
  );
}
