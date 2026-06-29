import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity, TrendingUp, ShoppingCart, Cpu, FileText, Package,
  RefreshCw, Play, Zap, TrendingDown, RotateCcw, Pause,
  AlertTriangle, CheckCircle2, ArrowRight, Sparkles,
} from "lucide-react";

// ── Shared ────────────────────────────────────────────────────

function DemoCard({ title, description, onReset, children }: {
  title: string; description: string; onReset?: () => void; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <div>
          <p className="text-xs font-semibold text-primary uppercase tracking-widest">Live Demo</p>
          <h3 className="text-sm font-semibold text-white mt-0.5">{title}</h3>
          <p className="text-xs text-white/40 mt-0.5">{description}</p>
        </div>
        {onReset && (
          <Button size="icon" variant="ghost" onClick={onReset}
            className="text-white/40 hover:text-white shrink-0 ml-4">
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function RangeSlider({ label, value, min, max, onChange, unit = "" }: {
  label: string; value: number; min: number; max: number;
  onChange: (v: number) => void; unit?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-white/50">
        <span>{label}</span>
        <span className="text-white/80 font-medium">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary bg-white/10"
      />
    </div>
  );
}

// ── 1. Healthcare — Triage Prioritization ─────────────────────

const PATIENT_POOL = [
  { name: "Emma R.", condition: "Chest Pain", severity: 5, hr: 112, bp: "88/60", confidence: 94 },
  { name: "James T.", condition: "Shortness of Breath", severity: 4, hr: 98, bp: "102/72", confidence: 87 },
  { name: "Olivia M.", condition: "High Fever", severity: 3, hr: 104, bp: "118/76", confidence: 76 },
  { name: "Noah K.", condition: "Abdominal Pain", severity: 3, hr: 88, bp: "124/80", confidence: 68 },
  { name: "Ava S.", condition: "Laceration", severity: 2, hr: 78, bp: "120/78", confidence: 91 },
  { name: "Liam B.", condition: "Migraine", severity: 2, hr: 72, bp: "116/74", confidence: 82 },
  { name: "Sophia L.", condition: "Nausea/Vomiting", severity: 1, hr: 76, bp: "118/76", confidence: 59 },
  { name: "Mason D.", condition: "Ankle Sprain", severity: 1, hr: 70, bp: "122/80", confidence: 73 },
  { name: "Isabella W.", condition: "Cardiac Arrhythmia", severity: 5, hr: 138, bp: "82/52", confidence: 97 },
  { name: "Ethan H.", condition: "Severe Headache", severity: 4, hr: 94, bp: "148/96", confidence: 81 },
  { name: "Charlotte N.", condition: "Allergic Reaction", severity: 4, hr: 106, bp: "100/68", confidence: 89 },
  { name: "Benjamin C.", condition: "Back Pain", severity: 2, hr: 74, bp: "126/82", confidence: 62 },
];

const SEV_COLOR: Record<number, string> = {
  5: "bg-red-500/20 border-red-500/40 text-red-400",
  4: "bg-orange-500/20 border-orange-500/40 text-orange-400",
  3: "bg-yellow-500/20 border-yellow-500/40 text-yellow-400",
  2: "bg-blue-500/20 border-blue-500/40 text-blue-400",
  1: "bg-white/10 border-white/20 text-white/50",
};

function TriageDemo() {
  const [threshold, setThreshold] = useState(70);
  const [patients, setPatients] = useState(PATIENT_POOL.slice(0, 4).map((p, i) => ({ ...p, id: i })));
  const [key, setKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef(4);

  const start = useCallback(() => {
    timerRef.current = setInterval(() => {
      if (countRef.current >= PATIENT_POOL.length) { clearInterval(timerRef.current!); return; }
      const next = { ...PATIENT_POOL[countRef.current], id: countRef.current };
      countRef.current++;
      setPatients(prev => [...prev.slice(-7), next]);
    }, 1800);
  }, []);

  useEffect(() => { start(); return () => clearInterval(timerRef.current!); }, [key, start]);

  const reset = () => {
    clearInterval(timerRef.current!);
    countRef.current = 4;
    setPatients(PATIENT_POOL.slice(0, 4).map((p, i) => ({ ...p, id: i })));
    setKey(k => k + 1);
  };

  const sorted = [...patients].sort((a, b) => {
    const aOk = a.confidence >= threshold, bOk = b.confidence >= threshold;
    if (aOk && !bOk) return -1;
    if (!aOk && bOk) return 1;
    if (aOk && bOk) return b.severity - a.severity;
    return 0;
  });

  return (
    <DemoCard title="AI Triage Queue" description="Drag the confidence threshold to re-rank incoming patients" onReset={reset}>
      <div className="mb-4">
        <RangeSlider label="AI Confidence Threshold" value={threshold} min={50} max={95}
          onChange={setThreshold} unit="%" />
      </div>
      <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {sorted.map(p => (
            <motion.div key={p.id} layout
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-xs ${SEV_COLOR[p.severity]}`}>
              <span className="font-bold text-[10px] w-3 text-center">{p.severity}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{p.name}</div>
                <div className="opacity-70">{p.condition} · HR {p.hr} · BP {p.bp}</div>
              </div>
              <div className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${p.confidence >= threshold ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/30"}`}>
                {p.confidence}%
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </DemoCard>
  );
}

// ── 2. Finance — Anomaly Detection ───────────────────────────

function buildPath(pts: number[], w: number, h: number, padX = 32, padY = 16): string {
  if (pts.length < 2) return "";
  const min = Math.min(...pts), max = Math.max(...pts), range = max - min || 1;
  const iw = w - padX * 2, ih = h - padY * 2;
  return pts.map((v, i) => {
    const x = padX + (i / (pts.length - 1)) * iw;
    const y = padY + (1 - (v - min) / range) * ih;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function ptCoords(idx: number, pts: number[], w: number, h: number, padX = 32, padY = 16) {
  const min = Math.min(...pts), max = Math.max(...pts), range = max - min || 1;
  const iw = w - padX * 2, ih = h - padY * 2;
  const x = padX + (idx / (pts.length - 1)) * iw;
  const y = padY + (1 - (pts[idx] - min) / range) * ih;
  return { x, y };
}

function detectAnomalies(data: number[], window = 20): number[] {
  return data.reduce<number[]>((acc, val, i) => {
    if (i < window) return acc;
    const slice = data.slice(i - window, i);
    const mean = slice.reduce((s, v) => s + v, 0) / slice.length;
    const std = Math.sqrt(slice.reduce((s, v) => s + (v - mean) ** 2, 0) / slice.length);
    if (Math.abs(val - mean) > 2.2 * std) acc.push(i);
    return acc;
  }, []);
}

function AnomalyChartDemo() {
  const W = 480, H = 160;
  const [prices, setPrices] = useState<number[]>(() => {
    const arr: number[] = [100];
    for (let i = 1; i < 40; i++) arr.push(+(arr[i - 1] + (Math.random() - 0.5) * 1.2).toFixed(2));
    return arr;
  });
  const [running, setRunning] = useState(true);
  const [key, setKey] = useState(0);
  const lastRef = useRef(prices[prices.length - 1]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const next = +(lastRef.current + (Math.random() - 0.5) * 1.4).toFixed(2);
      lastRef.current = next;
      setPrices(prev => [...prev.slice(-59), next]);
    }, 500);
    return () => clearInterval(id);
  }, [running, key]);

  const reset = () => {
    const arr: number[] = [100];
    for (let i = 1; i < 40; i++) arr.push(+(arr[i - 1] + (Math.random() - 0.5) * 1.2).toFixed(2));
    lastRef.current = arr[arr.length - 1];
    setPrices(arr);
    setRunning(true);
    setKey(k => k + 1);
  };

  const inject = (dir: 1 | -1) => {
    const spike = +(lastRef.current + dir * 6).toFixed(2);
    lastRef.current = spike;
    setPrices(prev => [...prev.slice(-59), spike]);
  };

  const anomalies = detectAnomalies(prices);
  const path = buildPath(prices, W, H);
  const latest = prices[prices.length - 1];

  return (
    <DemoCard title="Anomaly Detection" description="Live tick data — inject a spike or dip to watch the model react" onReset={reset}>
      <div className="mb-3 flex gap-2">
        <Button size="sm" variant="outline" onClick={() => inject(1)}
          className="h-7 text-xs border-orange-500/40 text-orange-400 hover:bg-orange-500/10">
          <Zap className="w-3 h-3 mr-1" /> Inject Spike
        </Button>
        <Button size="sm" variant="outline" onClick={() => inject(-1)}
          className="h-7 text-xs border-blue-500/40 text-blue-400 hover:bg-blue-500/10">
          <TrendingDown className="w-3 h-3 mr-1" /> Inject Dip
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs font-mono text-white/60">${latest.toFixed(2)}</span>
          <Button size="sm" variant="ghost" onClick={() => setRunning(r => !r)}
            className="h-7 w-7 p-0 text-white/50 hover:text-white">
            {running ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-lg bg-black/20" style={{ height: 160 }}>
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(250 85% 60%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(250 85% 60%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {path && <>
          <path d={`${path} V${H - 16} L32,${H - 16} Z`} fill="url(#chartFill)" />
          <path d={path} fill="none" stroke="hsl(250 85% 60%)" strokeWidth="1.5" />
        </>}
        {anomalies.map(i => {
          const { x, y } = ptCoords(i, prices, W, H);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={6} fill="hsl(0 80% 55%)" fillOpacity={0.25} stroke="hsl(0 80% 55%)" strokeWidth={1.5} />
              <text x={x} y={y - 10} textAnchor="middle" fontSize={9} fill="hsl(0 80% 65%)">anomaly</text>
            </g>
          );
        })}
        {anomalies.length === 0 && prices.length > 20 && (
          <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.2)">no anomalies detected</text>
        )}
      </svg>
      {anomalies.length > 0 && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
          <AlertTriangle className="w-3 h-3" />
          {anomalies.length} anomal{anomalies.length === 1 ? "y" : "ies"} flagged
        </div>
      )}
    </DemoCard>
  );
}

// ── 3. Retail — Demand Forecast Sandbox ─────────────────────

function heuristic(season: number, price: number, promo: number): number[] {
  const base = 1200;
  const s = 1 + (season - 50) / 100 * 0.6;
  const p = 1 - (price - 50) / 100 * 0.55;
  const pr = 1 + (promo / 100) * 0.45;
  return Array.from({ length: 8 }, (_, i) => {
    const wave = 1 + Math.sin(i * 0.9 + season / 25) * 0.08;
    return Math.round(base * s * p * pr * wave);
  });
}

function DemandForecastDemo() {
  const [season, setSeason] = useState(55);
  const [price, setPrice] = useState(50);
  const [promo, setPromo] = useState(30);
  const W = 480, H = 140;

  const forecast = heuristic(season, price, promo);
  const maxVal = Math.max(...forecast);
  const barW = (W - 40) / forecast.length - 6;
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

  return (
    <DemoCard title="Demand Forecast Sandbox" description="Adjust variables — chart updates instantly">
      <div className="space-y-3 mb-4">
        <RangeSlider label="Seasonality Index" value={season} min={0} max={100} onChange={setSeason} />
        <RangeSlider label="Price Point" value={price} min={0} max={100} onChange={setPrice} unit="%" />
        <RangeSlider label="Promo Multiplier" value={promo} min={0} max={100} onChange={setPromo} unit="%" />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }}>
        {forecast.map((v, i) => {
          const bh = (v / maxVal) * (H - 36);
          const x = 20 + i * ((W - 40) / forecast.length);
          const y = H - 20 - bh;
          const intensity = 40 + Math.round((v / maxVal) * 60);
          return (
            <g key={i}>
              <motion.rect
                x={x} y={y} width={barW} height={bh} rx={3}
                fill={`hsl(250 85% ${intensity}%)`}
                initial={false}
                animate={{ y, height: bh }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <text x={x + barW / 2} y={H - 4} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.35)">{weeks[i]}</text>
              <text x={x + barW / 2} y={y - 3} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.5)">
                {v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
              </text>
            </g>
          );
        })}
      </svg>
    </DemoCard>
  );
}

// ── 4. Manufacturing — Defect Scanner ────────────────────────

const TILE_PATTERNS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function ProductTile({ idx, defect, scanComplete }: { idx: number; defect: { confidence: number } | null; scanComplete: boolean }) {
  const s = idx * 137 + 31;
  const cx = 20 + (s % 40), cy = 12 + (s % 16), r = 4 + (s % 6);
  const lx = 10 + (s % 20), ly = 30 + (s % 10);
  return (
    <div className="relative aspect-[4/3]">
      <svg viewBox="0 0 80 60" className="w-full h-full rounded" style={{ background: "rgba(255,255,255,0.03)" }}>
        <rect x="8" y="8" width="64" height="44" rx="3" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r} fill="rgba(255,255,255,0.06)" />
        <line x1={lx} y1={ly} x2={lx + 30 + (s % 20)} y2={ly + (s % 8)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x={50 - (s % 10)} y={38 + (s % 8)} width={8 + (s % 10)} height={4 + (s % 4)} rx="1" fill="rgba(255,255,255,0.06)" />
      </svg>
      <AnimatePresence>
        {scanComplete && defect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 rounded border-2 border-red-500 pointer-events-none">
            <span className="absolute -top-2.5 right-0 text-[9px] bg-red-500 text-white px-1 rounded font-mono">
              {defect.confidence}%
            </span>
          </motion.div>
        )}
        {scanComplete && !defect && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 rounded border border-emerald-500/30 pointer-events-none" />
        )}
      </AnimatePresence>
    </div>
  );
}

function DefectScannerDemo() {
  const [scanning, setScanning] = useState(false);
  const [scanY, setScanY] = useState(0);
  const [defects, setDefects] = useState<Record<number, { confidence: number }>>({});
  const [done, setDone] = useState(false);
  const [key, setKey] = useState(0);

  const reset = () => { setScanning(false); setScanY(0); setDefects({}); setDone(false); setKey(k => k + 1); };

  const runScan = () => {
    if (scanning) return;
    setDefects({}); setDone(false); setScanning(true); setScanY(0);
    const start = performance.now();
    const duration = 2200;
    const defectIdxs = new Set<number>();
    while (defectIdxs.size < 3) defectIdxs.add(Math.floor(Math.random() * 12));

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setScanY(t * 100);
      if (t < 1) { requestAnimationFrame(tick); return; }
      const result: Record<number, { confidence: number }> = {};
      defectIdxs.forEach(i => { result[i] = { confidence: 72 + Math.floor(Math.random() * 25) }; });
      setDefects(result);
      setDone(true);
      setScanning(false);
    };
    requestAnimationFrame(tick);
  };

  const defectCount = Object.keys(defects).length;

  return (
    <DemoCard title="Computer Vision Defect Scanner" description='Click "Run Scan" to analyse the product batch' onReset={reset}>
      <div className="relative mb-3">
        <div className="grid grid-cols-4 gap-2">
          {TILE_PATTERNS.map(i => (
            <ProductTile key={`${key}-${i}`} idx={i} defect={defects[i] ?? null} scanComplete={done} />
          ))}
        </div>
        {scanning && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded">
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_12px_2px_hsl(250_85%_60%)]"
              style={{ top: `${scanY}%` }}
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button size="sm" onClick={runScan} disabled={scanning}
          className="bg-primary/80 hover:bg-primary text-white text-xs">
          <Play className="w-3 h-3 mr-1" />
          {scanning ? "Scanning..." : "Run Scan"}
        </Button>
        {done && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-red-400">
              <AlertTriangle className="w-3 h-3" />{defectCount} defect{defectCount !== 1 ? "s" : ""}
            </span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />{12 - defectCount} passed
            </span>
          </motion.div>
        )}
      </div>
    </DemoCard>
  );
}

// ── 5. Media — Sentiment Analyzer ────────────────────────────

const POS = new Set(["amazing","awesome","beautiful","best","brilliant","celebrate","cheerful","clean","creative","delight","dynamic","easy","effective","elegant","energetic","enjoy","excellent","exceptional","exciting","fantastic","fast","friendly","fun","great","happy","helpful","impressive","innovative","inspiring","joy","love","magnificent","modern","nice","perfect","pleasant","positive","powerful","premium","professional","quality","reliable","remarkable","robust","safe","satisfied","smooth","stunning","superb","versatile","vibrant","wonderful","win","success","clear","quick","smart","powerful","leading","top","superior","effortless","seamless","intuitive"]);
const NEG = new Set(["awful","bad","boring","broken","cheap","complex","confusing","crash","dangerous","defective","difficult","disappointing","dull","error","expensive","fail","failure","frustrating","hard","hate","horrible","inconsistent","inferior","issue","messy","misleading","negative","obsolete","overpriced","painful","poor","problem","risk","slow","terrible","ugly","unreliable","unstable","useless","weak","worst","wrong","bug","glitch","clunky","bloated","laggy","crashing","broken"]);

const PLACEHOLDER = "Type your copy here and watch the AI score each word as you type...";

function SentimentAnalyzerDemo() {
  const [text, setText] = useState("");
  const [key, setKey] = useState(0);

  const tokens = text.trim().split(/\s+/).filter(Boolean).map(raw => {
    const word = raw.toLowerCase().replace(/[^a-z]/g, "");
    const score = POS.has(word) ? 1 : NEG.has(word) ? -1 : 0;
    return { raw, score };
  });

  const totalScore = tokens.reduce((s, t) => s + t.score, 0);
  const polarity = tokens.length ? totalScore / tokens.length : 0;
  const polarityLabel = polarity > 0.15 ? "Positive" : polarity < -0.15 ? "Negative" : "Neutral";
  const polarityColor = polarity > 0.15 ? "text-emerald-400" : polarity < -0.15 ? "text-red-400" : "text-white/50";
  const meterPct = Math.min(100, Math.max(0, (polarity + 1) / 2 * 100));

  return (
    <DemoCard title="Live Sentiment Analyzer" description="Every token scores against an embedded lexicon in real time"
      onReset={() => { setText(""); setKey(k => k + 1); }}>
      <textarea key={key}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={PLACEHOLDER}
        rows={3}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/25 resize-none focus:outline-none focus:border-primary/50 mb-3"
      />
      {tokens.length > 0 && (
        <>
          <div className="flex flex-wrap gap-1 mb-3">
            {tokens.map((t, i) => (
              <span key={i} className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                t.score === 1 ? "bg-emerald-500/20 text-emerald-300" :
                t.score === -1 ? "bg-red-500/20 text-red-300" :
                "text-white/40"
              }`}>{t.raw}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ background: polarity > 0.15 ? "hsl(160 80% 50%)" : polarity < -0.15 ? "hsl(0 80% 55%)" : "hsl(250 40% 60%)" }}
                animate={{ width: `${meterPct}%` }}
                transition={{ duration: 0.3 }} />
            </div>
            <span className={`text-xs font-semibold w-16 text-right ${polarityColor}`}>{polarityLabel}</span>
          </div>
        </>
      )}
    </DemoCard>
  );
}

// ── 6. Logistics — Route Optimizer ───────────────────────────

type RouteNode = { id: number; x: number; y: number; label: string; isDepot: boolean };

const INIT_NODES: RouteNode[] = [
  { id: 0, x: 200, y: 135, label: "Depot", isDepot: true },
  { id: 1, x: 75,  y: 55,  label: "A", isDepot: false },
  { id: 2, x: 330, y: 45,  label: "B", isDepot: false },
  { id: 3, x: 355, y: 215, label: "C", isDepot: false },
  { id: 4, x: 60,  y: 220, label: "D", isDepot: false },
  { id: 5, x: 195, y: 40,  label: "E", isDepot: false },
];

function routeDist(nodes: RouteNode[], route: number[]): number {
  let d = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const a = nodes[route[i]], b = nodes[route[i + 1]];
    d += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return d;
}

function nearestNeighbor(nodes: RouteNode[]): number[] {
  const visited = new Set([0]);
  const route = [0];
  while (visited.size < nodes.length) {
    const cur = nodes[route[route.length - 1]];
    let best = Infinity, bestIdx = -1;
    for (let i = 0; i < nodes.length; i++) {
      if (visited.has(i)) continue;
      const d = Math.hypot(nodes[i].x - cur.x, nodes[i].y - cur.y);
      if (d < best) { best = d; bestIdx = i; }
    }
    route.push(bestIdx);
    visited.add(bestIdx);
  }
  route.push(0);
  return route;
}

function RouteOptimizerDemo() {
  const [nodes, setNodes] = useState<RouteNode[]>(INIT_NODES);
  const [route, setRoute] = useState<number[]>([]);
  const [animStep, setAnimStep] = useState(0);
  const [optimizing, setOptimizing] = useState(false);
  const [saved, setSaved] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<number | null>(null);
  const [key, setKey] = useState(0);

  const optimize = useCallback((currentNodes = nodes) => {
    const opt = nearestNeighbor(currentNodes);
    const naive = [0, 1, 2, 3, 4, 5, 0];
    const optD = routeDist(currentNodes, opt);
    const naiveD = routeDist(currentNodes, naive);
    const pct = Math.round((1 - optD / naiveD) * 100);
    setSaved(pct);
    setRoute(opt);
    setAnimStep(0);
    setOptimizing(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnimStep(step);
      if (step >= opt.length - 1) { clearInterval(interval); setOptimizing(false); }
    }, 280);
  }, [nodes]);

  const reset = () => {
    setNodes(INIT_NODES);
    setRoute([]);
    setAnimStep(0);
    setSaved(null);
    setKey(k => k + 1);
  };

  const onPointerDown = (id: number) => (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    dragRef.current = id;
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (dragRef.current === null) return;
    const rect = svgRef.current!.getBoundingClientRect();
    const scaleX = 420 / rect.width, scaleY = 280 / rect.height;
    const x = Math.max(20, Math.min(400, (e.clientX - rect.left) * scaleX));
    const y = Math.max(20, Math.min(260, (e.clientY - rect.top) * scaleY));
    setNodes(prev => prev.map(n => n.id === dragRef.current ? { ...n, x, y } : n));
  };

  const onPointerUp = () => {
    if (dragRef.current !== null && route.length > 0) optimize();
    dragRef.current = null;
  };

  const visibleEdges = route.slice(0, animStep + 1);

  return (
    <DemoCard title="Route Optimizer" description="Drag nodes to reposition — click Optimize to animate the solution" onReset={reset}>
      <svg key={key} ref={svgRef} viewBox="0 0 420 280" className="w-full rounded-lg bg-black/20 mb-3 touch-none"
        style={{ height: 200 }} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>
        {visibleEdges.map((_, i) => {
          if (i >= visibleEdges.length - 1) return null;
          const a = nodes[route[i]], b = nodes[route[i + 1]];
          return (
            <motion.line key={`${i}-${key}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="hsl(250 85% 60%)" strokeWidth={1.5} strokeDasharray="4 2"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 0.25 }} />
          );
        })}
        {nodes.map(n => (
          <g key={n.id} style={{ cursor: "grab" }}
            onPointerDown={onPointerDown(n.id)}>
            <circle cx={n.x} cy={n.y} r={n.isDepot ? 14 : 10}
              fill={n.isDepot ? "hsl(250 85% 25%)" : "hsl(250 50% 18%)"}
              stroke={n.isDepot ? "hsl(250 85% 60%)" : "rgba(255,255,255,0.2)"} strokeWidth={1.5} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={n.isDepot ? 9 : 10}
              fill="white" fontWeight="600" style={{ pointerEvents: "none", userSelect: "none" }}>
              {n.isDepot ? "D" : n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex items-center gap-3">
        <Button size="sm" onClick={() => optimize()} disabled={optimizing}
          className="bg-primary/80 hover:bg-primary text-white text-xs">
          <Play className="w-3 h-3 mr-1" />
          {optimizing ? "Optimizing..." : "Optimize Route"}
        </Button>
        {saved !== null && !optimizing && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {saved > 0 ? `${saved}% distance saved vs. naive order` : "Already near-optimal"}
          </motion.span>
        )}
      </div>
    </DemoCard>
  );
}

// ── Industry data ─────────────────────────────────────────────

const INDUSTRIES = [
  {
    id: "healthcare", label: "Healthcare", icon: Activity,
    headline: "AI That Thinks Alongside Clinicians",
    positioning: "Healthcare decisions happen under time pressure, with incomplete information. We build AI systems that surface the right data at the right moment — helping clinicians prioritize, diagnose, and act with confidence. From triage automation to patient flow optimization, our tools are built to augment expertise, not replace judgment.",
    useCases: ["Intelligent patient triage and queue prioritization", "Predictive readmission and deterioration alerts", "Clinical documentation automation", "Medical imaging analysis and anomaly flagging", "Operational capacity and staffing optimization"],
    Demo: TriageDemo,
  },
  {
    id: "finance", label: "Finance", icon: TrendingUp,
    headline: "Real-Time Intelligence for High-Stakes Decisions",
    positioning: "In financial markets, milliseconds and signals matter. We build AI systems that stream, analyze, and flag — detecting anomalies before they become incidents, automating compliance checks, and surfacing insights buried in transaction data. Our models run at the edge, close to the data, where latency is not an option.",
    useCases: ["Real-time anomaly and fraud detection", "Algorithmic risk scoring and credit modeling", "Regulatory compliance automation", "Portfolio optimization and rebalancing signals", "Sentiment-driven market intelligence"],
    Demo: AnomalyChartDemo,
  },
  {
    id: "retail", label: "Retail & E-Commerce", icon: ShoppingCart,
    headline: "Sell Smarter with Predictive Commerce",
    positioning: "Retail success depends on being in the right place with the right product at the right price. We build AI-powered demand forecasting, dynamic pricing engines, and personalization systems that turn inventory chaos into competitive advantage. Every slider you adjust reflects a real variable our models optimize continuously.",
    useCases: ["Demand forecasting with seasonal and promotional modeling", "Dynamic pricing and margin optimization", "Personalized product recommendation engines", "Inventory replenishment and supplier coordination", "Customer churn prediction and win-back automation"],
    Demo: DemandForecastDemo,
  },
  {
    id: "manufacturing", label: "Manufacturing", icon: Cpu,
    headline: "Zero-Defect Production with Computer Vision",
    positioning: "A single defective batch can cost millions. We build computer vision systems that inspect every unit at line speed — catching surface defects, dimensional anomalies, and assembly errors invisible to human inspectors. Our models run on-premise or at the edge, integrating directly with existing MES and SCADA systems.",
    useCases: ["Automated visual inspection and defect classification", "Predictive maintenance and failure forecasting", "Assembly line throughput optimization", "Energy consumption and yield optimization", "Supply chain risk monitoring and alerting"],
    Demo: DefectScannerDemo,
  },
  {
    id: "media", label: "Media & Content", icon: FileText,
    headline: "Content Intelligence at Scale",
    positioning: "The attention economy moves faster than any editorial team can. We build AI systems that analyze sentiment, optimize headlines, generate first drafts, and surface trending signals — giving media and content teams an unfair advantage. Every word your audience reads can be scored, refined, and personalized in real time.",
    useCases: ["Real-time sentiment analysis and brand monitoring", "AI-assisted content generation and editing", "Headline optimization and A/B testing automation", "Audience segmentation and personalization", "Content moderation and policy enforcement at scale"],
    Demo: SentimentAnalyzerDemo,
  },
  {
    id: "logistics", label: "Logistics", icon: Package,
    headline: "Route Intelligence That Pays for Itself",
    positioning: "Logistics networks are optimization problems at scale. We build AI systems that find the best routes, predict delays before they happen, and dynamically replan when reality diverges from the schedule. Drag any node in the demo to watch the optimizer instantly recalculate — that is exactly how our production systems behave.",
    useCases: ["Last-mile route optimization with dynamic replanning", "Delivery time prediction and SLA management", "Fleet utilization and load optimization", "Warehouse slotting and pick-path optimization", "Carrier selection and freight cost optimization"],
    Demo: RouteOptimizerDemo,
  },
];

// ── Page ──────────────────────────────────────────────────────

export default function Industries() {
  usePageMeta({
    title: "Industries",
    description: "AI solutions built for Healthcare, Finance, Retail, Manufacturing, Media, and Logistics — with live interactive demos you can try right now.",
    type: "website",
  });

  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollTo = (idx: number) => {
    setActive(idx);
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = sectionRefs.current.indexOf(e.target as HTMLElement);
          if (idx !== -1) setActive(idx);
        }
      });
    }, { threshold: 0.4 });
    sectionRefs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-primary/12 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="secondary" className="mb-6 bg-white/10 border-white/20 text-white/80">
              <Sparkles className="w-3 h-3 mr-1" /> Six Industries. Six Live Demos.
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
              AI Built for Your<br />
              <span className="gradient-text">Industry</span>
            </h1>
            <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
              Every sector has its own rhythms, risks, and data. Explore how Agile Vision builds AI tailored to your vertical — and interact with live demos that run entirely in your browser.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky tab bar */}
      <div className="sticky top-16 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <button key={ind.id} onClick={() => scrollTo(i)}
                  className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors shrink-0 ${
                    active === i
                      ? "border-primary text-white"
                      : "border-transparent text-white/40 hover:text-white/70"
                  }`}>
                  <Icon className="w-3.5 h-3.5" />
                  {ind.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Industry sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-24">
        {INDUSTRIES.map((ind, i) => {
          const Icon = ind.icon;
          const { Demo } = ind;
          return (
            <section key={ind.id} id={ind.id}
              ref={el => { sectionRefs.current[i] = el; }}
              className="scroll-mt-32">
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                {/* Copy */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <Badge variant="outline" className="border-white/15 text-white/50 text-xs">{ind.label}</Badge>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                    {ind.headline}
                  </h2>
                  <p className="text-white/55 leading-relaxed mb-6 text-sm">{ind.positioning}</p>
                  <ul className="space-y-2">
                    {ind.useCases.map((uc, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/50">
                        <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        {uc}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Demo */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}>
                  <Demo />
                </motion.div>
              </div>

              {i < INDUSTRIES.length - 1 && (
                <div className="mt-24 border-t border-white/5" />
              )}
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="border-t border-white/5 py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Ready to Build?</h2>
          <p className="text-white/50 mb-8">Tell us your industry and your biggest operational pain point. We will propose a tailored AI solution within 48 hours.</p>
          <a href="/get-started">
            <Button size="lg" className="px-8 shadow-lg shadow-primary/25">
              Start a Conversation <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
