import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Brain, Send, Heart, Home, Search, Plus, MessageSquare, User,
  ShoppingCart, Settings, BarChart3, TrendingUp, ArrowUpRight,
  ArrowDownRight, Filter, Zap, BookOpen, GraduationCap, Package,
  Star, Play, Gamepad2, Mail, Cog, CheckCircle2, RefreshCw, Globe,
  ChevronRight, Sparkles, Target, Download,
} from "lucide-react";

// ── Frames ────────────────────────────────────────────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="w-[300px] h-[560px] rounded-[2.5rem] border-4 border-white/20 bg-background overflow-hidden relative shadow-2xl shadow-black/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/10 rounded-b-2xl z-10" />
        <div className="h-full overflow-hidden pt-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({ children, url = "app.yourbrand.com" }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="w-full rounded-xl border border-white/10 overflow-hidden bg-background shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border-b border-white/8">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 bg-white/[0.06] rounded-md px-3 py-1 text-xs text-white/40 truncate font-mono">
          {url}
        </div>
      </div>
      <div className="h-[480px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// ── 1. AI Chatbot ─────────────────────────────────────────────

const CHAT_FLOWS: Record<string, { bot: string; chips: string[] }> = {
  "Order status?": {
    bot: "Order #AV-8821 shipped via FedEx — arriving tomorrow by 8pm. Tracking: FX 4821 0093 2241.",
    chips: ["Change address", "Cancel order", "Talk to agent"],
  },
  "Change address": {
    bot: "The package is still en route to the depot. I can reroute it — what's the new delivery address?",
    chips: ["123 Main St", "Use saved address", "Cancel"],
  },
  "Track my parcel": {
    bot: "Your parcel left the sorting facility 2 hours ago and is out for delivery. ETA: 2–4pm today.",
    chips: ["Get SMS updates", "Change address", "Thanks!"],
  },
  "Talk to agent": {
    bot: "I'm connecting you to a human agent now. Average wait time is under 90 seconds. 🎧",
    chips: ["Cancel", "Keep chatting with AI"],
  },
  "Thanks!": { bot: "Happy to help! Is there anything else I can do for you today?", chips: ["Order status?", "Track my parcel"] },
  "Cancel": { bot: "No problem — I'm here if you need anything else.", chips: ["Order status?", "Track my parcel"] },
  "Cancel order": { bot: "Are you sure you want to cancel order #AV-8821? This action can't be undone.", chips: ["Yes, cancel it", "Keep my order"] },
  "Keep my order": { bot: "Great, your order stays in place! Anything else?", chips: ["Track my parcel", "Thanks!"] },
  "Yes, cancel it": { bot: "Done — order #AV-8821 has been cancelled and your refund is processing (3–5 days).", chips: ["Thanks!", "Track my parcel"] },
};

export function ChatbotDemo() {
  type Msg = { role: "user" | "bot"; text: string };
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm Aria, your AI support assistant. How can I help you today?" },
  ]);
  const [chips, setChips] = useState(["Order status?", "Track my parcel", "Talk to agent"]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = (text: string) => {
    if (typing) return;
    setMsgs(m => [...m, { role: "user", text }]);
    setChips([]);
    setTyping(true);
    setTimeout(() => {
      const flow = CHAT_FLOWS[text];
      const botText = flow?.bot ?? "I'm looking into that for you…";
      const nextChips = flow?.chips ?? ["Order status?", "Track my parcel"];
      setMsgs(m => [...m, { role: "bot", text: botText }]);
      setChips(nextChips);
      setTyping(false);
    }, 900);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col" style={{ background: "hsl(250 20% 7%)" }}>
        <div className="px-4 py-3 border-b border-white/8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/20">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">Aria — Support AI</div>
            <div className="flex items-center gap-1.5">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-xs text-white/40">Online · replies instantly</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 scrollbar-hide">
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-white/[0.08] border border-white/10 text-white/85 rounded-bl-sm"
              }`}>{m.text}</div>
            </motion.div>
          ))}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/[0.08] border border-white/10 rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                <motion.div className="flex gap-1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}>
                  {[0,1,2].map(j => <div key={j} className="w-1.5 h-1.5 rounded-full bg-white/50" />)}
                </motion.div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="px-3 pb-3 space-y-2">
          <AnimatePresence>
            {chips.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex flex-wrap gap-1.5">
                {chips.map(c => (
                  <button key={c} onClick={() => send(c)}
                    className="text-[11px] px-2.5 py-1.5 rounded-full border border-primary/40 text-primary bg-primary/10 hover:bg-primary/20 transition-colors">
                    {c}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-xs text-white/25">
              Or type a message…
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Send className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── 2. Agentic AI ─────────────────────────────────────────────

const PIPELINE_STEPS = [
  { agent: "Planner", action: "Break goal into 4 subtasks", tool: "task_graph", ms: 280 },
  { agent: "Research", action: "Fetch data from 14 sources + web search", tool: "web_browse", ms: 3900 },
  { agent: "Analyst", action: "Run sentiment & trend models on corpus", tool: "ml_inference", ms: 2100 },
  { agent: "Writer", action: "Draft 3-page executive summary", tool: "llm_generate", ms: 1400 },
  { agent: "Reviewer", action: "Fact-check · quality gate · approve", tool: "human_loop", ms: 600 },
];

function AgenticAIDemo() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(0); // steps completed
  const [started, setStarted] = useState(false);

  const run = () => {
    setRunning(true);
    setStarted(true);
    setDone(0);
    PIPELINE_STEPS.forEach((_, i) => {
      const delay = PIPELINE_STEPS.slice(0, i + 1).reduce((s, s2) => s + s2.ms, 0);
      setTimeout(() => {
        setDone(i + 1);
        if (i === PIPELINE_STEPS.length - 1) setRunning(false);
      }, delay);
    });
  };

  const totalMs = PIPELINE_STEPS.reduce((s, s2) => s + s2.ms, 0);

  return (
    <BrowserFrame url="agents.yourbrand.com/pipeline">
      <div className="h-full flex flex-col p-5 gap-4" style={{ background: "hsl(250 20% 7%)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Market Intelligence Agent</div>
            <div className="text-[10px] text-white/35">Goal: Q3 competitor pricing analysis</div>
          </div>
          <button onClick={run} disabled={running}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              running ? "bg-white/8 text-white/30 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25"
            }`}>
            <RefreshCw className={`w-3 h-3 ${running ? "animate-spin" : ""}`} />
            {!started ? "Run Pipeline" : running ? "Running…" : "Run Again"}
          </button>
        </div>

        <div className="flex-1 space-y-2">
          {PIPELINE_STEPS.map((s, i) => {
            const status = !started ? "idle" : i < done ? "done" : i === done && running ? "active" : "idle";
            return (
              <motion.div key={i}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 border transition-colors duration-300 ${
                  status === "active" ? "border-primary/40 bg-primary/8" :
                  status === "done" ? "border-emerald-500/20 bg-emerald-500/5" :
                  "border-white/6 bg-white/[0.02]"
                }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold transition-colors duration-300 ${
                  status === "done" ? "bg-emerald-500/20 text-emerald-400" :
                  status === "active" ? "bg-primary/20 text-primary" :
                  "bg-white/8 text-white/25"
                }`}>
                  {status === "done" ? "✓" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/35">{s.agent}</span>
                    <span className="text-[9px] font-mono text-white/20 bg-white/5 px-1.5 py-0.5 rounded">{s.tool}</span>
                    {status === "active" && (
                      <motion.div className="flex gap-0.5" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity }}>
                        {[0,1,2].map(j => <div key={j} className="w-1 h-1 rounded-full bg-primary" />)}
                      </motion.div>
                    )}
                  </div>
                  <div className={`text-xs mt-0.5 transition-colors duration-300 ${status === "idle" && !started ? "text-white/20" : "text-white/65"}`}>
                    {s.action}
                  </div>
                </div>
                {status === "done" && (
                  <span className="text-[9px] text-white/25 font-mono shrink-0">{(s.ms / 1000).toFixed(1)}s</span>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Steps done", value: started ? `${done} / ${PIPELINE_STEPS.length}` : "—" },
            { label: "Sources read", value: started && done >= 2 ? "14" : "—" },
            { label: "Total time", value: done === PIPELINE_STEPS.length ? `${(totalMs / 1000).toFixed(1)}s` : "—" },
          ].map((m, i) => (
            <div key={i} className="rounded-lg border border-white/8 bg-white/[0.03] p-3 text-center">
              <div className="text-base font-bold text-white">{m.value}</div>
              <div className="text-[10px] text-white/30 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ── 3. Web App ────────────────────────────────────────────────

const WEBAPP_DATA: Record<string, { rev: string; users: string; churn: string; revD: string; usersD: string; bars: number[] }> = {
  "7D":  { rev: "$18.4K", users: "1,240", churn: "1.2%", revD: "+6%",  usersD: "+4%",  bars: [70,80,65,90,75,85,100] },
  "30D": { rev: "$84.7K", users: "6,241", churn: "1.8%", revD: "+18%", usersD: "+11%", bars: [40,55,45,70,60,80,75,90,85,95,88,100] },
  "90D": { rev: "$241K",  users: "18.9K", churn: "2.1%", revD: "+31%", usersD: "+24%", bars: [30,35,40,45,50,48,60,65,70,75,80,85,88,90,95,96,97,100] },
};

export function WebAppDemo() {
  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");
  const d = WEBAPP_DATA[range];

  return (
    <BrowserFrame url="dashboard.yourbrand.com">
      <div className="h-full flex" style={{ background: "hsl(250 20% 7%)" }}>
        <div className="w-40 border-r border-white/8 p-3 space-y-0.5 shrink-0">
          <div className="text-[9px] font-bold uppercase tracking-widest text-white/25 px-2 pt-2 pb-1.5">Navigation</div>
          {[
            { icon: Home, label: "Dashboard", active: true },
            { icon: User, label: "Users", active: false },
            { icon: ShoppingCart, label: "Orders", active: false },
            { icon: BarChart3, label: "Analytics", active: false },
            { icon: Settings, label: "Settings", active: false },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2 px-2 py-2 rounded-md text-xs transition-colors cursor-default ${
              item.active ? "bg-primary/15 text-primary font-medium" : "text-white/35"
            }`}>
              <item.icon className="w-3.5 h-3.5 shrink-0" />
              {item.label}
            </div>
          ))}
          <div className="mt-4 mx-2 rounded-md bg-primary/10 border border-primary/20 p-2">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-semibold text-primary">AI Insight</span>
            </div>
            <p className="text-[9px] text-white/45 leading-snug">Revenue up 18% — upsell campaign driving most gains.</p>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Dashboard</h3>
              <p className="text-[10px] text-white/30">Live · Jun 2026</p>
            </div>
            <div className="flex gap-1 bg-white/[0.05] rounded-md p-0.5">
              {(["7D","30D","90D"] as const).map(r => (
                <button key={r} onClick={() => setRange(r)}
                  className={`text-[10px] px-2 py-1 rounded transition-all font-medium ${
                    range === r ? "bg-primary text-white shadow" : "text-white/40 hover:text-white/70"
                  }`}>{r}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Revenue", value: d.rev, change: d.revD, up: true },
              { label: "Active Users", value: d.users, change: d.usersD, up: true },
              { label: "Churn Rate", value: d.churn, change: "−0.6%", up: false },
            ].map((stat, i) => (
              <motion.div key={`${range}-${i}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border border-white/8 bg-white/[0.04] p-3">
                <span className="text-[10px] text-white/35">{stat.label}</span>
                <div className="text-xl font-bold text-white mt-0.5">{stat.value}</div>
                <div className={`text-[10px] flex items-center gap-0.5 font-medium ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-white/70">Monthly Revenue</span>
              <span className="text-[10px] text-emerald-400 font-medium">↑ {d.revD} vs prev period</span>
            </div>
            <div className="flex items-end gap-1 h-16">
              {d.bars.map((h, i) => (
                <motion.div key={`${range}-bar-${i}`}
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.35, ease: "easeOut" }}
                  className="flex-1 rounded-sm"
                  style={{ height: `${h}%`, minHeight: 2, transformOrigin: "bottom",
                    background: i === d.bars.length - 1 ? "hsl(250 85% 65%)" : "hsl(250 85% 60% / 0.35)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ── 4. Data Analytics ─────────────────────────────────────────

const NL_QUERIES = [
  { chip: "Revenue forecast", answer: "Projected $312K next quarter (+23% QoQ). Peak week: 14–20 Oct.", chart: [60,65,70,72,75,80,85,90,95,100] },
  { chip: "Churn drivers", answer: "Top signal: users who skip onboarding step 3 churn 4× faster (p < 0.01).", chart: [100,90,80,70,65,60,55,45,35,20] },
  { chip: "Best upsell segment", answer: "Power users active >3 days/week have 62% upsell conversion rate.", chart: [20,30,40,55,65,70,75,80,90,100] },
];

export function DataAppDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const query = (i: number) => {
    if (loading || selected === i) return;
    setLoading(true);
    setSelected(null);
    setTimeout(() => { setSelected(i); setLoading(false); }, 800);
  };

  const result = selected !== null ? NL_QUERIES[selected] : null;

  return (
    <BrowserFrame url="analytics.yourbrand.com">
      <div className="h-full flex flex-col p-5 gap-4" style={{ background: "hsl(250 20% 7%)" }}>
        <div>
          <div className="text-sm font-semibold text-white mb-0.5">AI Analytics</div>
          <div className="text-[10px] text-white/35">Ask a question in plain English — no SQL required</div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] flex items-center gap-2 px-3 py-2.5">
          <Search className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <span className="text-xs text-white/30 flex-1">
            {selected !== null ? NL_QUERIES[selected].chip : "e.g. \u201cWhat\u2019s driving churn this month?\u201d"}
          </span>
          {loading && <motion.div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent"
            animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} />}
        </div>

        <div className="flex gap-2">
          {NL_QUERIES.map((q, i) => (
            <button key={i} onClick={() => query(i)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                selected === i
                  ? "bg-primary border-primary text-white"
                  : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80 bg-white/[0.03]"
              }`}>{q.chip}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {result && !loading && (
            <motion.div key={selected} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col gap-3">
              <div className="rounded-lg border border-primary/25 bg-primary/8 p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-primary">AI Answer</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{result.answer}</p>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3 flex-1">
                <div className="text-[10px] text-white/35 mb-2 font-medium uppercase tracking-wider">Trend (10 weeks)</div>
                <div className="flex items-end gap-1.5 h-16">
                  {result.chart.map((h, i) => (
                    <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                      className="flex-1 rounded-sm"
                      style={{ height: `${h}%`, minHeight: 2, transformOrigin: "bottom",
                        background: `hsl(250 85% ${40 + h * 0.25}% / 0.7)` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {!result && !loading && (
            <motion.div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Target className="w-8 h-8 text-white/10 mx-auto mb-2" />
                <p className="text-xs text-white/25">Tap a question above to see AI-powered analysis</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserFrame>
  );
}

// ── 5. Automation ─────────────────────────────────────────────

const AUTO_STEPS = [
  { label: "Invoice received via email", icon: Mail, detail: "finance@acme.com → AP inbox" },
  { label: "AI extracts fields", icon: Brain, detail: "Vendor · Amount · PO# · Due date" },
  { label: "3-way PO match", icon: CheckCircle2, detail: "Invoice vs PO vs receipt — ✓ matched" },
  { label: "Routes to approver", icon: User, detail: "Sarah Chen · <$10K auto-approve" },
  { label: "Payment scheduled", icon: Zap, detail: "ACH · Net-30 · ref: INV-2024-0391" },
];

export function AutomationDemo() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);

  const trigger = () => {
    if (running) return;
    setStep(-1);
    setRunning(true);
    AUTO_STEPS.forEach((_, i) => {
      setTimeout(() => {
        setStep(i);
        if (i === AUTO_STEPS.length - 1) setRunning(false);
      }, 400 + i * 700);
    });
  };

  return (
    <BrowserFrame url="automation.yourbrand.com/ap-workflow">
      <div className="h-full flex flex-col p-5 gap-4" style={{ background: "hsl(250 20% 7%)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">AP Invoice Automation</div>
            <div className="text-[10px] text-white/35">AI document processing · zero-touch payments</div>
          </div>
          <button onClick={trigger} disabled={running}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              running ? "bg-white/8 text-white/30 cursor-not-allowed" : "bg-emerald-500/90 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/25"
            }`}>
            <Zap className="w-3 h-3" />
            {step === -1 ? "Trigger" : running ? "Running…" : "Run Again"}
          </button>
        </div>

        <div className="flex-1 space-y-2">
          {AUTO_STEPS.map((s, i) => {
            const done = i <= step;
            const active = i === step && running;
            return (
              <motion.div key={i}
                animate={{ opacity: i <= step + 1 ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 border transition-colors duration-500 ${
                  active ? "border-emerald-500/40 bg-emerald-500/8" :
                  done ? "border-emerald-500/20 bg-emerald-500/5" :
                  "border-white/6 bg-white/[0.02]"
                }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                  done ? "bg-emerald-500/20" : "bg-white/8"
                }`}>
                  <s.icon className={`w-3.5 h-3.5 ${done ? "text-emerald-400" : "text-white/25"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-medium transition-colors duration-300 ${done ? "text-white/85" : "text-white/25"}`}>
                    {s.label}
                  </div>
                  {done && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-[10px] text-white/35 mt-0.5">{s.detail}</motion.div>
                  )}
                </div>
                {active && (
                  <motion.div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                )}
                {done && !active && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Processed today", value: step >= 0 ? "143" : "142" },
            { label: "Straight-through %", value: "94%" },
            { label: "Avg cycle time", value: "8s" },
          ].map((m, i) => (
            <div key={i} className="rounded-lg border border-white/8 bg-white/[0.03] p-2.5 text-center">
              <div className="text-sm font-bold text-white">{m.value}</div>
              <div className="text-[9px] text-white/30 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ── 6. AI Chatbot (already above) ────────────────────────────
// ── 7. Agentic AI (already above) ────────────────────────────

// ── 8. Mobile App ─────────────────────────────────────────────

const POSTS = [
  { id: 0, user: "Sarah K.", avatar: "SK", time: "2m", text: "Just shipped with on-device AI — works fully offline 🚀", likes: 24, tag: "ML" },
  { id: 1, user: "Alex R.", avatar: "AR", time: "18m", text: "App Store review approved in 14 hours flat. New record.", likes: 41, tag: "Launch" },
  { id: 2, user: "Priya M.", avatar: "PM", time: "1h", text: "React Native + Core ML = buttery smooth object detection.", likes: 18, tag: "Native" },
];

export function MobileAppDemo() {
  const [likes, setLikes] = useState<Record<number, number>>({ 0: 24, 1: 41, 2: 18 });
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const tap = (id: number) => {
    if (liked[id]) {
      setLikes(l => ({ ...l, [id]: l[id] - 1 }));
      setLiked(l => ({ ...l, [id]: false }));
    } else {
      setLikes(l => ({ ...l, [id]: l[id] + 1 }));
      setLiked(l => ({ ...l, [id]: true }));
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col" style={{ background: "hsl(250 20% 7%)" }}>
        <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
          <span className="font-semibold text-sm text-white">DevFeed</span>
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-white/40" />
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-3 h-3 text-primary" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-background" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
          {POSTS.map(post => (
            <motion.div key={post.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: post.id * 0.15 }}
              className="rounded-xl bg-white/[0.05] border border-white/8 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-primary/25 flex items-center justify-center text-[10px] font-bold text-primary">
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-white">{post.user}</span>
                  <span className="text-[10px] text-white/30 ml-2">{post.time}</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-medium">{post.tag}</span>
              </div>
              <p className="text-xs text-white/70 mb-2.5 leading-relaxed">{post.text}</p>
              <div className="flex items-center gap-4">
                <button onClick={() => tap(post.id)}
                  className="flex items-center gap-1.5 transition-transform active:scale-110">
                  <motion.div animate={{ scale: liked[post.id] ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.25 }}>
                    <Heart className={`w-3.5 h-3.5 transition-colors ${liked[post.id] ? "fill-red-400 text-red-400" : "text-white/35"}`} />
                  </motion.div>
                  <span className="text-xs text-white/40">{likes[post.id]}</span>
                </button>
                <MessageSquare className="w-3.5 h-3.5 text-white/25" />
                <Globe className="w-3.5 h-3.5 text-white/25" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/8 px-6 py-3 flex items-center justify-around">
          {[
            { Icon: Home, active: true },
            { Icon: Search, active: false },
            { Icon: Plus, active: false },
            { Icon: MessageSquare, active: false },
            { Icon: User, active: false },
          ].map(({ Icon, active }, i) => (
            <Icon key={i} className={`w-4 h-4 ${active ? "text-primary" : "text-white/25"}`} />
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── 9. E-Commerce ─────────────────────────────────────────────

const PRODUCTS = [
  { id: 0, name: "Horizon Pro Earbuds", base: 149, ai: 139, tag: "AI: −7% flash deal", rating: 4.8, sales: "1,240 sold" },
  { id: 1, name: "SmartDesk Lamp X2", base: 89, ai: 94, tag: "AI: +6% high demand", rating: 4.6, sales: "680 sold" },
];

export function ECommerceDemo() {
  const [cart, setCart] = useState(0);
  const [added, setAdded] = useState<Record<number, boolean>>({});
  const [bump, setBump] = useState(false);

  const addToCart = (id: number) => {
    setCart(c => c + 1);
    setAdded(a => ({ ...a, [id]: true }));
    setBump(true);
    setTimeout(() => setBump(false), 300);
  };

  return (
    <BrowserFrame url="store.yourbrand.com">
      <div className="h-full flex flex-col" style={{ background: "hsl(250 20% 7%)" }}>
        <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
          <span className="text-sm font-semibold text-white">AI Store</span>
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-white/35" />
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-white/70" />
              <AnimatePresence>
                {cart > 0 && (
                  <motion.div key={cart} initial={{ scale: 0.5 }} animate={{ scale: bump ? 1.4 : 1 }} exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-[9px] text-white flex items-center justify-center font-bold">
                    {cart}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 flex-1 overflow-y-auto space-y-3 scrollbar-hide">
          <div className="rounded-lg border border-primary/25 bg-primary/8 px-3 py-2 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-primary">AI Recommendations</span>
              <p className="text-[10px] text-white/45 mt-0.5">Personalised for your browsing — updated every 30 min</p>
            </div>
          </div>

          {PRODUCTS.map(p => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: p.id * 0.15 }}
              className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-white/25" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white mb-1">{p.name}</div>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] text-white/45">{p.rating} · {p.sales}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">${p.ai}</span>
                    <span className="text-[10px] text-white/30 line-through">${p.base}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                      p.ai < p.base ? "bg-emerald-500/15 text-emerald-400" : "bg-orange-500/15 text-orange-400"
                    }`}>{p.tag}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => !added[p.id] && addToCart(p.id)}
                className={`w-full mt-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  added[p.id]
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                    : "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/25"
                }`}>
                {added[p.id] ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ── 10. Game ──────────────────────────────────────────────────

export function GameDemo() {
  const [score, setScore] = useState(12450);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [burst, setBurst] = useState<{x: number; y: number; id: number} | null>(null);
  const [nextId, setNextId] = useState(0);

  const collect = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const gain = difficulty === "Hard" ? 250 : difficulty === "Medium" ? 100 : 50;
    const newScore = score + gain;
    setScore(newScore);
    setBurst({ x, y, id: nextId });
    setNextId(n => n + 1);
    if (newScore > 15000) setDifficulty("Hard");
    else if (newScore > 13000) setDifficulty("Medium");
    setTimeout(() => setBurst(null), 600);
  };

  const diffColor = difficulty === "Hard" ? "text-red-400" : difficulty === "Medium" ? "text-yellow-400" : "text-emerald-400";

  return (
    <BrowserFrame url="game.yourbrand.com">
      <div className="h-full flex flex-col" style={{ background: "linear-gradient(180deg, hsl(228 30% 6%) 0%, hsl(250 40% 10%) 100%)" }}>
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-white/70 bg-white/8 rounded px-2 py-1">{score.toLocaleString()} pts</div>
            <div className="flex gap-0.5">
              {[1,2,3].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
            </div>
          </div>
          <div className={`text-xs font-bold px-2 py-1 rounded border ${
            difficulty === "Hard" ? "border-red-500/40 bg-red-500/10 text-red-400" :
            difficulty === "Medium" ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400" :
            "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
          }`}>
            AI: {difficulty}
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden cursor-crosshair select-none" onClick={collect}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[0,1,2,3,4].map(ring => (
              <motion.div key={ring}
                className="absolute rounded-full border border-white/8"
                style={{ width: 70 + ring * 55, height: 70 + ring * 55 }}
                animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 10 + ring * 3, repeat: Infinity, ease: "linear" }} />
            ))}
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-2xl shadow-primary/40"
              style={{ background: "linear-gradient(135deg, hsl(250 85% 60%), hsl(280 80% 60%))" }}
              animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <Gamepad2 className="w-7 h-7 text-white" />
            </motion.div>
            {[0,1,2,3,4,5].map(i => (
              <motion.div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-primary/70"
                style={{ top: Math.sin((i / 6) * Math.PI * 2) * 100 - 5, left: Math.cos((i / 6) * Math.PI * 2) * 100 + 28 }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }} />
            ))}
          </div>

          <AnimatePresence>
            {burst && (
              <motion.div key={burst.id}
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -40, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="absolute pointer-events-none text-xs font-bold text-primary"
                style={{ left: burst.x - 20, top: burst.y - 16 }}>
                +{difficulty === "Hard" ? 250 : difficulty === "Medium" ? 100 : 50}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
            <p className="text-[11px] text-white/25">Click anywhere to collect · AI adjusts difficulty live</p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ── 11. EdTech ────────────────────────────────────────────────

const MODULES = [
  { title: "Intro to Machine Learning", lessons: 12, color: "hsl(250 85% 60%)" },
  { title: "Neural Networks Deep Dive", lessons: 8, color: "hsl(280 80% 60%)" },
  { title: "NLP Fundamentals", lessons: 10, color: "hsl(200 80% 55%)" },
];

const AI_TIPS = [
  "You're making great progress! Try the practice quiz before moving on.",
  "Based on your pace, you'll finish Module 2 in about 3 more sessions.",
  "Tip: pause and re-watch the backpropagation section — it's the key concept.",
];

export function EdTechDemo() {
  const [progress, setProgress] = useState([85, 42, 0]);
  const [xp, setXp] = useState(680);
  const [tip, setTip] = useState(0);
  const [advancing, setAdvancing] = useState<number | null>(null);

  const advance = (i: number) => {
    if (advancing !== null || progress[i] >= 100) return;
    setAdvancing(i);
    setTimeout(() => {
      setProgress(p => { const n = [...p]; n[i] = Math.min(100, n[i] + 15); return n; });
      setXp(x => x + 45);
      setTip(t => (t + 1) % AI_TIPS.length);
      setAdvancing(null);
    }, 600);
  };

  return (
    <BrowserFrame url="learn.yourbrand.com">
      <div className="h-full flex flex-col p-5 gap-4" style={{ background: "hsl(250 20% 7%)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-white">AI Learning Platform</span>
          </div>
          <span className="text-xs text-primary font-bold">Level 7</span>
        </div>

        <div className="rounded-lg border border-white/8 bg-white/[0.04] p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/60 font-medium">XP Progress</span>
            <span className="text-xs text-white/40">{xp} / 1000 XP to Level 8</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(250 85% 60%), hsl(280 80% 60%))" }}
              animate={{ width: `${xp / 10}%` }} transition={{ duration: 0.5 }} />
          </div>
        </div>

        <div className="rounded-lg border border-primary/25 bg-primary/8 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">AI Tutor</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={tip} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-xs text-white/65 leading-relaxed">{AI_TIPS[tip]}</motion.p>
          </AnimatePresence>
        </div>

        <div className="space-y-2 flex-1">
          {MODULES.map((mod, i) => (
            <div key={i} className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-3.5 h-3.5 shrink-0" style={{ color: mod.color }} />
                <span className="text-xs font-medium text-white/80 flex-1">{mod.title}</span>
                <span className="text-[10px] text-white/30">{mod.lessons} lessons</span>
              </div>
              <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden mb-2">
                <motion.div className="h-full rounded-full"
                  style={{ background: mod.color }}
                  animate={{ width: `${progress[i]}%` }} transition={{ duration: 0.5 }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/30">
                  {progress[i] >= 100 ? "Complete ✓" : `${progress[i]}% complete`}
                </span>
                <button onClick={() => advance(i)}
                  disabled={advancing !== null || progress[i] >= 100}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-all ${
                    progress[i] >= 100
                      ? "text-emerald-400 bg-emerald-500/10 cursor-default"
                      : advancing === i
                      ? "text-white/30 bg-white/5 cursor-wait"
                      : "text-white bg-primary/80 hover:bg-primary cursor-pointer"
                  }`}>
                  {progress[i] >= 100 ? "Done" : progress[i] === 0 ? "Start" : advancing === i ? "…" : "Continue"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ── Map ───────────────────────────────────────────────────────

const DEMO_MAP: Record<string, () => JSX.Element> = {
  mobile: MobileAppDemo,
  webapp: WebAppDemo,
  dataapp: DataAppDemo,
  game: GameDemo,
  automation: AutomationDemo,
  chatbot: ChatbotDemo,
  agentic: AgenticAIDemo,
  ecommerce: ECommerceDemo,
  edtech: EdTechDemo,
};

export function DemoPreview({ projectType }: { projectType: string }) {
  const DemoComponent = DEMO_MAP[projectType];
  if (!DemoComponent) return null;
  return (
    <motion.div key={projectType} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}>
      <DemoComponent />
    </motion.div>
  );
}
