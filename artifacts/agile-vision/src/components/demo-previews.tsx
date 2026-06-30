import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Brain, Send, Heart, Home, Search, Plus, MessageSquare, User,
  ShoppingCart, Settings, BarChart3, ArrowUpRight, ArrowDownRight,
  Zap, BookOpen, GraduationCap, Package, Star, Gamepad2, Mail,
  CheckCircle2, RefreshCw, Globe, Sparkles, Target, Wifi, WifiOff,
  Webhook, AlertCircle, ThumbsUp, ThumbsDown, Database,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Frames
// ─────────────────────────────────────────────────────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center py-2">
      <div
        className="w-[290px] h-[560px] rounded-[2.5rem] border-4 bg-[hsl(250_20%_7%)] overflow-hidden relative"
        style={{
          borderColor: "hsl(250 30% 30%)",
          boxShadow: "0 0 0 1px hsl(250 85% 60% / 0.12), 0 32px 64px -16px hsl(250 20% 4% / 0.8), inset 0 1px 0 hsl(250 60% 60% / 0.1)",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/10 rounded-b-2xl z-10" />
        <div className="h-full overflow-hidden pt-6">{children}</div>
      </div>
    </div>
  );
}

function BrowserFrame({ children, url = "app.yourbrand.com" }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="w-full rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border-b border-white/8">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 bg-white/[0.06] rounded-md px-3 py-1 text-xs text-white/40 truncate font-mono">{url}</div>
      </div>
      <div className="h-[480px] overflow-hidden">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. AI Chatbot — Multi-channel · CRM integrations · Analytics
// ─────────────────────────────────────────────────────────────

const CHANNELS = [
  { id: "web",      label: "Web",      color: "text-primary",     dot: "bg-primary" },
  { id: "slack",    label: "Slack",    color: "text-yellow-400",  dot: "bg-yellow-400" },
  { id: "whatsapp", label: "WhatsApp", color: "text-emerald-400", dot: "bg-emerald-400" },
] as const;
type Channel = typeof CHANNELS[number]["id"];

const CRM_LABELS: Record<Channel, string> = {
  web:      "CRM synced · Zendesk · Salesforce",
  slack:    "CRM synced · Salesforce · HubSpot",
  whatsapp: "CRM synced · WhatsApp Business API",
};

const CHAT_FLOWS: Record<string, { bot: string; chips: string[]; intent: string }> = {
  "Order status?": {
    bot: "Order #AV-8821 shipped via FedEx — arriving tomorrow by 8pm. Tracking: FX 4821 0093 2241.",
    chips: ["Change address", "Cancel order", "Talk to agent"],
    intent: "order_tracking",
  },
  "Change address": {
    bot: "The package hasn't reached the local depot yet — I can reroute it. What's the new delivery address?",
    chips: ["123 Main St", "Use saved address", "Never mind"],
    intent: "address_change",
  },
  "Track my parcel": {
    bot: "Your parcel left the sorting facility 2 hours ago and is out for delivery. ETA: 2–4pm today.",
    chips: ["Get SMS alerts", "Change address", "Thanks!"],
    intent: "order_tracking",
  },
  "Talk to agent": {
    bot: "Connecting you now — average wait is under 90 seconds. 🎧",
    chips: ["Keep chatting"],
    intent: "escalation",
  },
  "Thanks!":      { bot: "Happy to help! Anything else I can do?",         chips: ["Order status?", "Track parcel"], intent: "closing" },
  "Never mind":   { bot: "No problem — let me know if you need anything.", chips: ["Order status?", "Track parcel"], intent: "closing" },
  "Cancel order": { bot: "Cancel order #AV-8821? This can't be undone.",   chips: ["Yes, cancel", "Keep order"],     intent: "cancellation" },
  "Keep order":   { bot: "Great, your order stays. Anything else?",        chips: ["Track parcel", "Thanks!"],       intent: "retention" },
  "Yes, cancel":  { bot: "Done — order cancelled. Refund in 3–5 days.",    chips: ["Thanks!"],                       intent: "cancellation" },
  "Keep chatting":{ bot: "Of course! What can I help you with?",           chips: ["Order status?", "Track parcel"], intent: "self_serve" },
  "Track parcel": { bot: "Your parcel left the sorting facility 2 hours ago — out for delivery. ETA: 2–4pm.", chips: ["Change address", "Thanks!"], intent: "order_tracking" },
};

export function ChatbotDemo() {
  type Msg = { role: "user" | "bot"; text: string };
  const [channel, setChannel] = useState<Channel>("web");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm Aria, your AI support assistant. How can I help you today?" },
  ]);
  const [chips, setChips] = useState(["Order status?", "Track my parcel", "Talk to agent"]);
  const [typing, setTyping] = useState(false);
  const [intent, setIntent] = useState("greeting");
  const [csat] = useState(4.9);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = (text: string) => {
    if (typing) return;
    setMsgs(m => [...m, { role: "user", text }]);
    setChips([]);
    setTyping(true);
    setTimeout(() => {
      const flow = CHAT_FLOWS[text];
      setMsgs(m => [...m, { role: "bot", text: flow?.bot ?? "Looking into that for you…" }]);
      setChips(flow?.chips ?? ["Order status?", "Track my parcel"]);
      setIntent(flow?.intent ?? intent);
      setTyping(false);
    }, 800);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const ch = CHANNELS.find(c => c.id === channel)!;

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col">
        {/* Channel tabs — surfaces "Multi-channel" bullet */}
        <div className="flex border-b border-white/8">
          {CHANNELS.map(c => (
            <button key={c.id} onClick={() => setChannel(c.id)}
              className={`flex-1 py-2 text-[10px] font-semibold transition-colors ${
                channel === c.id ? `${c.color} border-b-2 border-current` : "text-white/30"
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Header — CRM integrations bullet */}
        <div className="px-4 py-2.5 border-b border-white/8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Brain className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white">Aria — Support AI</div>
            <div className="text-[9px] text-white/35 truncate">{CRM_LABELS[channel]}</div>
          </div>
          <motion.div className={`w-2 h-2 rounded-full ${ch.dot}`}
            animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 scrollbar-hide">
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-white/[0.08] border border-white/10 text-white/85 rounded-bl-sm"
              }`}>{m.text}</div>
            </motion.div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-white/[0.08] border border-white/10 rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                <motion.div className="flex gap-1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}>
                  {[0,1,2].map(j => <div key={j} className="w-1.5 h-1.5 rounded-full bg-white/50" />)}
                </motion.div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies — plain conditional render, no animation complexity */}
        <div className="px-3 pb-2 space-y-1.5">
          {chips.length > 0 && !typing && (
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
              {chips.map(c => (
                <button key={c} onClick={() => send(c)}
                  className="text-[11px] px-3 py-1 rounded-full border border-primary/40 text-primary bg-primary/10 hover:bg-primary/20 active:scale-95 transition-colors whitespace-nowrap shrink-0 leading-none">
                  {c}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-[11px] text-white/25">
              Or type a message…
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Send className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>

        {/* Analytics strip — surfaces "Conversation analytics" bullet */}
        <div className="border-t border-white/8 px-4 py-2 flex items-center justify-between">
          <span className="text-[9px] text-white/25">Intent: <span className="text-white/50">{intent}</span></span>
          <span className="text-[9px] text-white/25">CSAT <span className="text-yellow-400">★ {csat}</span></span>
          <span className="text-[9px] text-white/25">Session #{msgs.length + 141}</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Agentic AI — Tool use · Memory · Human-in-the-loop
// ─────────────────────────────────────────────────────────────

const PIPELINE_STEPS = [
  { agent: "Planner",  action: "Decompose goal into 4 subtasks",              tool: "task_graph",   ms: 350 },
  { agent: "Research", action: "Web search + scrape 14 competitor pages",     tool: "web_browse",   ms: 3200 },
  { agent: "Memory",   action: "Recall Q2 benchmarks from long-term store",   tool: "memory_store", ms: 800 },
  { agent: "Analyst",  action: "Run pricing trend & sentiment models",         tool: "ml_inference", ms: 1800 },
  { agent: "Reviewer", action: "Human checkpoint — approve before delivery",  tool: "human_loop",   ms: 0 },
];

function AgenticAIDemo() {
  const [running, setRunning] = useState(false);
  const [active, setActive] = useState(-1);   // step currently running
  const [done, setDone] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const [awaitingApproval, setAwaitingApproval] = useState(false);
  const [approved, setApproved] = useState<boolean | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setRunning(false); setActive(-1); setDone([]);
    setAwaitingApproval(false); setApproved(null);
  };

  const run = () => {
    reset();
    setStarted(true);
    setRunning(true);
    let elapsed = 0;
    PIPELINE_STEPS.slice(0, 4).forEach((s, i) => {
      const t1 = setTimeout(() => setActive(i), elapsed);
      elapsed += s.ms;
      const t2 = setTimeout(() => { setDone(d => [...d, i]); setActive(-1); }, elapsed);
      timers.current.push(t1, t2);
    });
    const t3 = setTimeout(() => {
      setActive(4);
      setAwaitingApproval(true);
      setRunning(false);
    }, elapsed + 300);
    timers.current.push(t3);
  };

  const approve = () => {
    setApproved(true);
    setAwaitingApproval(false);
    setDone(d => [...d, 4]);
    setActive(-1);
  };
  const reject = () => {
    setApproved(false);
    setAwaitingApproval(false);
    setActive(-1);
  };

  const allDone = done.length === 5 && approved;
  const totalSec = (PIPELINE_STEPS.slice(0,4).reduce((s,x) => s + x.ms, 0) / 1000).toFixed(1);

  return (
    <BrowserFrame url="agents.yourbrand.com/pipeline">
      <div className="h-full flex flex-col p-5 gap-3" style={{ background: "hsl(250 20% 7%)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Market Intelligence Agent</div>
            <div className="text-[10px] text-white/35">Goal: Q3 competitor pricing analysis</div>
          </div>
          <button onClick={run} disabled={running || awaitingApproval}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              running || awaitingApproval
                ? "bg-white/8 text-white/25 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25"
            }`}>
            <RefreshCw className={`w-3 h-3 ${running ? "animate-spin" : ""}`} />
            {!started ? "Run Agent" : running ? "Running…" : "Run Again"}
          </button>
        </div>

        {/* Memory strip — surfaces "Long-running memory" bullet */}
        <AnimatePresence>
          {started && done.includes(2) && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }}
              className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-3 py-2 flex items-center gap-2">
              <Database className="w-3 h-3 text-yellow-400 shrink-0" />
              <span className="text-[10px] text-yellow-300/70">Memory recalled: Q2 benchmarks · 3 prior runs · 28 entities</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pipeline steps */}
        <div className="flex-1 space-y-2">
          {PIPELINE_STEPS.map((s, i) => {
            const isDone = done.includes(i);
            const isActive = active === i;
            const isReviewer = i === 4;
            return (
              <div key={i} className={`rounded-lg border px-3 py-2.5 transition-colors duration-300 ${
                isActive ? "border-primary/40 bg-primary/8" :
                isDone && approved !== false ? "border-emerald-500/20 bg-emerald-500/5" :
                isDone && approved === false && isReviewer ? "border-red-500/20 bg-red-500/5" :
                "border-white/6 bg-white/[0.02]"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    isDone && !(isReviewer && approved === false) ? "bg-emerald-500/20 text-emerald-400" :
                    isDone && approved === false && isReviewer ? "bg-red-500/20 text-red-400" :
                    isActive ? "bg-primary/20 text-primary" :
                    "bg-white/8 text-white/25"
                  }`}>
                    {isDone && !(isReviewer && approved === false) ? "✓" :
                     isDone && approved === false && isReviewer ? "✗" : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/35">{s.agent}</span>
                      <span className="text-[9px] font-mono text-white/20 bg-white/5 px-1.5 py-0.5 rounded">{s.tool}</span>
                      {isActive && !awaitingApproval && (
                        <motion.div className="flex gap-0.5" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity }}>
                          {[0,1,2].map(j => <div key={j} className="w-1 h-1 rounded-full bg-primary" />)}
                        </motion.div>
                      )}
                    </div>
                    <div className={`text-xs mt-0.5 ${!started && i > 0 ? "text-white/20" : "text-white/65"}`}>{s.action}</div>
                  </div>
                  {isDone && i < 4 && (
                    <span className="text-[9px] text-white/25 font-mono shrink-0">{(PIPELINE_STEPS[i].ms / 1000).toFixed(1)}s</span>
                  )}
                </div>

                {/* Human-in-the-loop controls — surfaces that bullet directly */}
                <AnimatePresence>
                  {awaitingApproval && isReviewer && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 pt-2 border-t border-white/8 flex items-center gap-2">
                      <span className="text-[10px] text-white/40 flex-1">Review complete — approve to deliver?</span>
                      <button onClick={approve}
                        className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                        <ThumbsUp className="w-3 h-3" /> Approve
                      </button>
                      <button onClick={reject}
                        className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-md bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors">
                        <ThumbsDown className="w-3 h-3" /> Reject
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Steps done",   value: started ? `${done.length} / 5` : "—" },
            { label: "Sources read", value: started && done.includes(1) ? "14" : "—" },
            { label: "Total time",   value: allDone ? `${totalSec}s` : "—" },
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

// ─────────────────────────────────────────────────────────────
// 3. Web App — React/TS · Real-time collaboration · AI search
// ─────────────────────────────────────────────────────────────

const WEBAPP_DATA = {
  "7D":  { rev: "$18.4K", users: "1,240", churn: "1.2%", revD: "+6%",  usersD: "+4%",  bars: [70,80,65,90,75,85,100] },
  "30D": { rev: "$84.7K", users: "6,241", churn: "1.8%", revD: "+18%", usersD: "+11%", bars: [40,55,45,70,60,80,75,90,85,95,88,100] },
  "90D": { rev: "$241K",  users: "18.9K", churn: "2.1%", revD: "+31%", usersD: "+24%", bars: [30,35,40,45,50,48,60,65,70,75,80,85,88,90,96,97,100] },
} as const;

const AI_SUGGESTIONS = ["Revenue by region", "Churn risk users", "Top upsell segments", "Anomaly detected: 14 Jun"];

export function WebAppDemo() {
  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");
  const [searching, setSearching] = useState(false);
  const [suggestion, setSuggestion] = useState(0);
  const d = WEBAPP_DATA[range];

  useEffect(() => {
    if (!searching) return;
    const t = setInterval(() => setSuggestion(s => (s + 1) % AI_SUGGESTIONS.length), 1400);
    return () => clearInterval(t);
  }, [searching]);

  return (
    <BrowserFrame url="dashboard.yourbrand.com">
      <div className="h-full flex" style={{ background: "hsl(250 20% 7%)" }}>
        {/* Sidebar */}
        <div className="w-40 border-r border-white/8 p-3 space-y-0.5 shrink-0 flex flex-col">
          <div className="text-[9px] font-bold uppercase tracking-widest text-white/25 px-2 pt-1 pb-1.5">Navigation</div>
          {[
            { icon: Home, label: "Dashboard", active: true },
            { icon: User, label: "Users", active: false },
            { icon: BarChart3, label: "Analytics", active: false },
            { icon: Settings, label: "Settings", active: false },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2 px-2 py-2 rounded-md text-xs ${
              item.active ? "bg-primary/15 text-primary font-medium" : "text-white/35"
            }`}>
              <item.icon className="w-3.5 h-3.5 shrink-0" />{item.label}
            </div>
          ))}

          {/* AI recommendations panel — surfaces that bullet */}
          <div className="mt-auto mx-0 rounded-md bg-primary/10 border border-primary/20 p-2">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-semibold text-primary">AI Insight</span>
            </div>
            <p className="text-[9px] text-white/45 leading-snug">Upsell campaign is driving 18% revenue lift — expand to 3 new segments.</p>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
          {/* Header with collab badge — surfaces "Real-time collaboration" bullet */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-white">Dashboard</h3>
              {/* Real-time collaboration indicator */}
              <div className="flex items-center gap-1.5 mt-0.5">
                {["JL","MK","RT"].map((av, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center text-[7px] font-bold text-primary">{av}</div>
                ))}
                <span className="text-[9px] text-white/30">3 live</span>
                <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              </div>
            </div>
            <div className="flex gap-1.5 bg-white/[0.05] rounded-md p-0.5">
              {(["7D","30D","90D"] as const).map(r => (
                <button key={r} onClick={() => setRange(r)}
                  className={`text-[10px] px-2 py-1 rounded font-medium transition-all ${
                    range === r ? "bg-primary text-white" : "text-white/40 hover:text-white/70"
                  }`}>{r}</button>
              ))}
            </div>
          </div>

          {/* AI Search — surfaces "AI search & recommendations" bullet */}
          <div className="relative">
            <button onClick={() => setSearching(s => !s)}
              className={`w-full flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-all ${
                searching ? "border-primary/50 bg-primary/8" : "border-white/10 bg-white/[0.04]"
              }`}>
              <Search className="w-3.5 h-3.5 text-white/30 shrink-0" />
              <AnimatePresence mode="wait">
                {searching ? (
                  <motion.span key={suggestion} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }}
                    className="text-primary/80 flex-1 text-left">{AI_SUGGESTIONS[suggestion]}</motion.span>
                ) : (
                  <span className="text-white/25 flex-1 text-left">AI search — try "churn risk users"</span>
                )}
              </AnimatePresence>
              {searching && <Sparkles className="w-3 h-3 text-primary shrink-0" />}
            </button>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Revenue",      value: d.rev,   change: d.revD,   up: true },
              { label: "Active Users", value: d.users, change: d.usersD, up: true },
              { label: "Churn Rate",   value: d.churn, change: "−0.6%",  up: false },
            ].map((stat, i) => (
              <motion.div key={`${range}-${i}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border border-white/8 bg-white/[0.04] p-3">
                <span className="text-[10px] text-white/35">{stat.label}</span>
                <div className="text-lg font-bold text-white mt-0.5">{stat.value}</div>
                <div className={`text-[10px] flex items-center gap-0.5 font-medium ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/70">Monthly Revenue</span>
              <span className="text-[10px] text-emerald-400 font-medium">↑ {d.revD} this period</span>
            </div>
            <div className="flex items-end gap-1 flex-1">
              {d.bars.map((h, i) => (
                <motion.div key={`${range}-bar-${i}`}
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.025, duration: 0.3, ease: "easeOut" }}
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

// ─────────────────────────────────────────────────────────────
// 4. Mobile App — React Native · On-device ML · App Store
// ─────────────────────────────────────────────────────────────

const POSTS = [
  { id: 0, av: "SK", user: "Sarah K.", time: "2m",  text: "Shipped with on-device ML — works fully offline!", tag: "ML", likes: 24 },
  { id: 1, av: "AR", user: "Alex R.",  time: "18m", text: "App Store review approved in 14 hours. New record.", tag: "Launch", likes: 41 },
];

const ML_DETECTIONS = ["Running Shoe · Nike Air Max", "Coffee Mug · Ceramic", "Laptop · MacBook Pro"];

export function MobileAppDemo() {
  const [likes, setLikes] = useState<Record<number, number>>({ 0: 24, 1: 41 });
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [offline, setOffline] = useState(true);
  const [mlIdx, setMlIdx] = useState(0);
  const [scanning, setScanning] = useState(false);

  const tap = (id: number) => {
    setLikes(l => ({ ...l, [id]: l[id] + (liked[id] ? -1 : 1) }));
    setLiked(l => ({ ...l, [id]: !l[id] }));
  };

  const scan = () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => {
      setMlIdx(i => (i + 1) % ML_DETECTIONS.length);
      setScanning(false);
    }, 900);
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col">
        {/* Status bar — surfaces "On-device ML for offline AI" bullet */}
        <div className={`px-4 py-1.5 flex items-center justify-between transition-colors ${
          offline ? "bg-yellow-500/10 border-b border-yellow-500/20" : "bg-emerald-500/10 border-b border-emerald-500/20"
        }`}>
          <button onClick={() => setOffline(o => !o)} className="flex items-center gap-1.5">
            {offline ? <WifiOff className="w-3 h-3 text-yellow-400" /> : <Wifi className="w-3 h-3 text-emerald-400" />}
            <span className={`text-[9px] font-semibold ${offline ? "text-yellow-400" : "text-emerald-400"}`}>
              {offline ? "Offline · ML running locally" : "Online · cloud AI active"}
            </span>
          </button>
          <span className="text-[9px] text-white/30">tap to toggle</span>
        </div>

        <div className="px-4 py-2.5 border-b border-white/8 flex items-center justify-between">
          <span className="font-semibold text-sm text-white">DevFeed</span>
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-white/35" />
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-3 h-3 text-primary" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
          {/* On-device ML card — surfaces that bullet */}
          <button onClick={scan}
            className="w-full rounded-xl border border-white/8 bg-white/[0.04] p-3 text-left transition-all hover:border-primary/30 active:scale-[0.98]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
                <Brain className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[10px] font-semibold text-white/70">On-Device ML Scanner</span>
              <span className="ml-auto text-[9px] text-white/30">tap to scan</span>
            </div>
            <div className="rounded-lg bg-white/[0.05] border border-white/8 h-12 flex items-center justify-center">
              {scanning ? (
                <motion.div className="flex gap-1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }}>
                  {[0,1,2].map(j => <div key={j} className="w-1.5 h-1.5 rounded-full bg-primary" />)}
                </motion.div>
              ) : (
                <motion.div key={mlIdx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-xs text-emerald-400 font-medium">
                  ✓ {ML_DETECTIONS[mlIdx]}
                </motion.div>
              )}
            </div>
          </button>

          {/* Posts with tappable hearts */}
          {POSTS.map(post => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: post.id * 0.15 }}
              className="rounded-xl bg-white/[0.05] border border-white/8 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-primary/25 flex items-center justify-center text-[10px] font-bold text-primary">
                  {post.av}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-white">{post.user}</span>
                  <span className="text-[10px] text-white/30 ml-2">{post.time}</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-medium">{post.tag}</span>
              </div>
              <p className="text-xs text-white/65 mb-2.5 leading-relaxed">{post.text}</p>
              <button onClick={() => tap(post.id)} className="flex items-center gap-1.5">
                <motion.div animate={{ scale: liked[post.id] ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.2 }}>
                  <Heart className={`w-3.5 h-3.5 ${liked[post.id] ? "fill-red-400 text-red-400" : "text-white/35"}`} />
                </motion.div>
                <span className="text-xs text-white/40">{likes[post.id]}</span>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/8 px-6 py-3 flex justify-around">
          {[Home, Search, Plus, MessageSquare, User].map((Icon, i) => (
            <Icon key={i} className={`w-4 h-4 ${i === 0 ? "text-primary" : "text-white/25"}`} />
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. Data Analytics — Forecasting · NL queries · ETL pipelines
// ─────────────────────────────────────────────────────────────

const NL_QUERIES = [
  { chip: "Revenue forecast",    answer: "Projected $312K next quarter (+23% QoQ). Peak week: Oct 14–20.", confidence: 91, chart: [60,65,70,72,75,80,85,90,95,100] },
  { chip: "Top churn signals",   answer: "Users who skip onboarding step 3 churn 4× faster (p < 0.01).",   confidence: 88, chart: [100,90,80,70,65,60,55,45,35,20] },
  { chip: "Best upsell segment", answer: "Power users active 3+ days/week have 62% upsell conversion.",    confidence: 94, chart: [20,30,40,55,65,70,75,80,90,100] },
];

const ETL_SOURCES = ["Snowflake · synced 2m ago", "Stripe · live", "HubSpot · synced 5m ago"];

export function DataAppDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [etlIdx, setEtlIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setEtlIdx(i => (i + 1) % ETL_SOURCES.length), 2000);
    return () => clearInterval(t);
  }, []);

  const query = (i: number) => {
    if (loading || selected === i) return;
    setLoading(true); setSelected(null);
    setTimeout(() => { setSelected(i); setLoading(false); }, 750);
  };

  const result = selected !== null ? NL_QUERIES[selected] : null;

  return (
    <BrowserFrame url="analytics.yourbrand.com">
      <div className="h-full flex flex-col p-5 gap-4" style={{ background: "hsl(250 20% 7%)" }}>
        {/* ETL status strip — surfaces "ETL pipelines & warehousing" bullet */}
        <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2">
          <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <AnimatePresence mode="wait">
            <motion.span key={etlIdx} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-[10px] text-white/50 flex-1">
              ETL · {ETL_SOURCES[etlIdx]}
            </motion.span>
          </AnimatePresence>
          <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </div>

        <div>
          <div className="text-sm font-semibold text-white mb-0.5">AI Analytics</div>
          <div className="text-[10px] text-white/35">Ask in plain English — no SQL required</div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] flex items-center gap-2 px-3 py-2.5">
          <Search className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <span className="text-xs text-white/30 flex-1">
            {selected !== null ? NL_QUERIES[selected].chip : "e.g. \u201cWhat\u2019s driving churn?\u201d"}
          </span>
          {loading && <motion.div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent"
            animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} />}
        </div>

        {/* NL query chips — surfaces "Natural language queries" bullet */}
        <div className="flex gap-2">
          {NL_QUERIES.map((q, i) => (
            <button key={i} onClick={() => query(i)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                selected === i ? "bg-primary border-primary text-white" : "border-white/15 text-white/50 hover:border-white/30 bg-white/[0.03]"
              }`}>{q.chip}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {result && !loading && (
            <motion.div key={selected} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col gap-3">
              <div className="rounded-lg border border-primary/25 bg-primary/8 p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-primary">AI Answer</span>
                  </div>
                  {/* Forecasting confidence — surfaces "Forecasting & trend detection" bullet */}
                  <span className="text-[10px] text-emerald-400 font-medium">{result.confidence}% confidence</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{result.answer}</p>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3 flex-1">
                <div className="text-[10px] text-white/35 mb-2 font-medium uppercase tracking-wider">10-week trend</div>
                <div className="flex items-end gap-1.5 h-14">
                  {result.chart.map((h, i) => (
                    <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                      className="flex-1 rounded-sm"
                      style={{ height: `${h}%`, minHeight: 2, transformOrigin: "bottom",
                        background: `hsl(250 85% ${40 + h * 0.25}% / 0.75)` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {!result && !loading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Target className="w-8 h-8 text-white/10 mx-auto mb-2" />
                <p className="text-xs text-white/25">Select a question to see AI analysis</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </BrowserFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. Automation — AI doc processing · API webhooks · Error recovery
// ─────────────────────────────────────────────────────────────

const AUTO_STEPS = [
  { label: "Invoice received",        icon: Mail,          detail: "finance@acme.com → AP inbox",                  webhook: "" },
  { label: "AI extracts fields",      icon: Brain,         detail: "Vendor · Amount · PO# · Due date — 6 fields",  webhook: "" },
  { label: "3-way PO match",          icon: CheckCircle2,  detail: "Invoice vs PO vs receipt — ✓ matched",         webhook: "" },
  { label: "Routes to approver",      icon: Webhook,       detail: "API webhook → Slack #ap-approvals · Sarah C.", webhook: "webhook" },
  { label: "Payment scheduled",       icon: Zap,           detail: "ACH · Net-30 · ref INV-2024-0391",             webhook: "" },
];

export function AutomationDemo() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [retried, setRetried] = useState(false);

  const trigger = () => {
    if (running) return;
    setStep(-1); setRunning(true); setRetried(false);
    AUTO_STEPS.forEach((_, i) => {
      // Simulate a network error-and-retry on step 2 (surfaces "Error recovery" bullet)
      const delay = 400 + i * 650 + (i >= 2 && !retried ? 0 : 0);
      setTimeout(() => {
        setStep(i);
        if (i === 2) setRetried(true);
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
              running ? "bg-white/8 text-white/25 cursor-not-allowed" : "bg-emerald-500/90 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20"
            }`}>
            <Zap className="w-3 h-3" />
            {step === -1 ? "Trigger" : running ? "Running…" : "Run Again"}
          </button>
        </div>

        <div className="flex-1 space-y-2">
          {AUTO_STEPS.map((s, i) => {
            const isDone = i <= step;
            const isActive = i === step && running;
            return (
              <motion.div key={i}
                animate={{ opacity: i <= step + 1 ? 1 : 0.3 }} transition={{ duration: 0.3 }}
                className={`rounded-lg border px-3 py-2.5 transition-colors duration-500 ${
                  isActive ? "border-emerald-500/40 bg-emerald-500/8" :
                  isDone   ? "border-emerald-500/20 bg-emerald-500/5" :
                             "border-white/6 bg-white/[0.02]"
                }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isDone ? "bg-emerald-500/20" : "bg-white/8"
                  }`}>
                    <s.icon className={`w-3.5 h-3.5 ${isDone ? "text-emerald-400" : "text-white/20"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-medium ${isDone ? "text-white/85" : "text-white/25"}`}>{s.label}</span>
                      {/* Webhook badge — surfaces "API & webhook integration" bullet */}
                      {isDone && s.webhook === "webhook" && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/20 font-medium">
                          webhook
                        </motion.span>
                      )}
                    </div>
                    {isDone && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-white/35 mt-0.5">
                        {s.detail}
                      </motion.div>
                    )}
                    {/* Error recovery indicator — surfaces that bullet */}
                    {isDone && i === 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                        className="flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-2.5 h-2.5 text-yellow-400/70" />
                        <span className="text-[9px] text-yellow-400/70">Auto-retried 1× · network timeout recovered</span>
                      </motion.div>
                    )}
                  </div>
                  {isActive && (
                    <motion.div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                      animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                  )}
                  {isDone && !isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Processed today", value: step >= 0 ? "143" : "142" },
            { label: "Straight-through", value: "94%" },
            { label: "Avg cycle time",   value: "8 sec" },
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

// ─────────────────────────────────────────────────────────────
// 7. E-Commerce — Personalised feeds · Dynamic pricing · Cart abandonment
// ─────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 0, name: "Horizon Pro Earbuds", base: 149, ai: 139, tag: "Flash deal −7%",  tagColor: "text-emerald-400 bg-emerald-500/15", rating: 4.8, sold: "1,240" },
  { id: 1, name: "SmartDesk Lamp X2",   base: 89,  ai: 94,  tag: "High demand +6%", tagColor: "text-orange-400 bg-orange-500/15",   rating: 4.6, sold: "680" },
];

export function ECommerceDemo() {
  const [cart, setCart] = useState(0);
  const [added, setAdded] = useState<Record<number, boolean>>({});
  const [bump, setBump] = useState(false);
  const [showAbandonment, setShowAbandonment] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [countdown, setCountdown] = useState(300);

  // Cart abandonment toast — surfaces that bullet
  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setShowAbandonment(true), 2500);
    return () => clearTimeout(t);
  }, [dismissed]);

  useEffect(() => {
    if (!showAbandonment) return;
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [showAbandonment]);

  const addToCart = (id: number) => {
    setCart(c => c + 1);
    setAdded(a => ({ ...a, [id]: true }));
    setBump(true);
    setShowAbandonment(false);
    setDismissed(true);
    setTimeout(() => setBump(false), 300);
  };

  const mins = Math.floor(countdown / 60);
  const secs = String(countdown % 60).padStart(2, "0");

  return (
    <BrowserFrame url="store.yourbrand.com">
      <div className="h-full flex flex-col relative" style={{ background: "hsl(250 20% 7%)" }}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between shrink-0">
          <span className="text-sm font-semibold text-white">AI Store</span>
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-white/35" />
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-white/70" />
              <AnimatePresence>
                {cart > 0 && (
                  <motion.div key={cart} initial={{ scale: 0.5 }} animate={{ scale: bump ? 1.4 : 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-[9px] text-white flex items-center justify-center font-bold">
                    {cart}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
          {/* Personalised feed label — surfaces that bullet */}
          <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/8 px-3 py-2">
            <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
            <div>
              <span className="text-xs font-semibold text-primary">Personalised for you</span>
              <p className="text-[9px] text-white/40 mt-0.5">Updated based on your browsing + purchase history</p>
            </div>
          </div>

          {/* Products with dynamic pricing — surfaces that bullet */}
          {PRODUCTS.map(p => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: p.id * 0.1 }}
              className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-white/20" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white mb-1">{p.name}</div>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] text-white/40">{p.rating} · {p.sold} sold</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-bold text-white">${p.ai}</span>
                    <span className="text-[10px] text-white/30 line-through">${p.base}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${p.tagColor}`}>
                      AI · {p.tag}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => !added[p.id] && addToCart(p.id)}
                className={`w-full mt-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  added[p.id]
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                    : "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20"
                }`}>
                {added[p.id] ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Cart abandonment toast — surfaces that bullet */}
        <AnimatePresence>
          {showAbandonment && !dismissed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 mx-3 mb-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm p-3">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-yellow-300">Leaving already?</div>
                  <div className="text-[10px] text-white/55 mt-0.5">
                    Use <span className="font-bold text-yellow-300">SAVE10</span> for 10% off — expires {mins}:{secs}
                  </div>
                </div>
                <button onClick={() => { setShowAbandonment(false); setDismissed(true); }}
                  className="text-white/30 hover:text-white/60 text-xs leading-none">✕</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// 8. Game — Procedural world · AI NPCs · Difficulty scaling
// ─────────────────────────────────────────────────────────────

export function GameDemo() {
  const [score, setScore] = useState(12450);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [burst, setBurst] = useState<{ x: number; y: number; id: number } | null>(null);
  const [nextId, setNextId] = useState(0);
  const [npcPositions, setNpcPositions] = useState([
    { x: 20, y: 30 }, { x: 70, y: 60 }, { x: 45, y: 75 },
  ]);

  // NPCs drift around procedurally — surfaces "AI-driven NPC behaviour" bullet
  useEffect(() => {
    const t = setInterval(() => {
      setNpcPositions(ps => ps.map(p => ({
        x: Math.max(5, Math.min(90, p.x + (Math.random() - 0.5) * 8)),
        y: Math.max(20, Math.min(85, p.y + (Math.random() - 0.5) * 8)),
      })));
    }, 1200);
    return () => clearInterval(t);
  }, []);

  const collect = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const gain = difficulty === "Hard" ? 250 : difficulty === "Medium" ? 100 : 50;
    const newScore = score + gain;
    setScore(newScore);
    setBurst({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: nextId });
    setNextId(n => n + 1);
    if (newScore > 15000) setDifficulty("Hard");
    else if (newScore > 13000) setDifficulty("Medium");
    setTimeout(() => setBurst(null), 600);
  };

  // Scatter NPCs on click
  const scatter = () => {
    setNpcPositions(ps => ps.map(p => ({
      x: Math.max(5, Math.min(90, p.x + (Math.random() - 0.5) * 30)),
      y: Math.max(20, Math.min(85, p.y + (Math.random() - 0.5) * 30)),
    })));
  };

  return (
    <BrowserFrame url="game.yourbrand.com">
      <div className="h-full flex flex-col" style={{ background: "linear-gradient(180deg, hsl(228 30% 6%) 0%, hsl(250 40% 10%) 100%)" }}>
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/6 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/70 bg-white/8 rounded px-2 py-1">{score.toLocaleString()} pts</span>
            <div className="flex gap-0.5">
              {[1,2,3].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
            </div>
          </div>
          {/* Real-time difficulty scaling badge — surfaces that bullet */}
          <div className={`text-xs font-bold px-2 py-1 rounded border ${
            difficulty === "Hard"   ? "border-red-500/40 bg-red-500/10 text-red-400" :
            difficulty === "Medium" ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400" :
                                      "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
          }`}>AI: {difficulty}</div>
        </div>

        <div className="flex-1 relative overflow-hidden cursor-crosshair select-none"
          onClick={(e) => { collect(e); scatter(); }}>
          {/* Procedural orbit rings — surfaces "Procedural world generation" bullet */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[0,1,2,3].map(ring => (
              <motion.div key={ring} className="absolute rounded-full border border-white/6"
                style={{ width: 80 + ring * 60, height: 80 + ring * 60 }}
                animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 12 + ring * 4, repeat: Infinity, ease: "linear" }} />
            ))}
            <motion.div className="w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-2xl shadow-primary/40"
              style={{ background: "linear-gradient(135deg, hsl(250 85% 60%), hsl(280 80% 60%))" }}
              animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <Gamepad2 className="w-7 h-7 text-white" />
            </motion.div>
          </div>

          {/* AI NPCs — surfaces "AI-driven NPC behaviour" bullet */}
          {npcPositions.map((pos, i) => (
            <motion.div key={i}
              animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5">
              <div className="text-[8px] text-white/30 font-bold">AI</div>
              <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary/60" />
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {burst && (
              <motion.div key={burst.id}
                initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.55 }}
                className="absolute pointer-events-none text-xs font-bold text-primary"
                style={{ left: burst.x - 20, top: burst.y - 16 }}>
                +{difficulty === "Hard" ? 250 : difficulty === "Medium" ? 100 : 50}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
            <p className="text-[10px] text-white/20">Click to score · AI scales difficulty &amp; NPCs in real time</p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// 9. EdTech — Adaptive delivery · AI tutoring · Progress analytics
// ─────────────────────────────────────────────────────────────

const MODULES = [
  { title: "Intro to Machine Learning", color: "hsl(250 85% 60%)", adaptive: true },
  { title: "Neural Networks Deep Dive", color: "hsl(280 80% 60%)", adaptive: false },
  { title: "NLP Fundamentals",          color: "hsl(200 80% 55%)", adaptive: false },
];

const AI_TIPS = [
  "You're 2× faster than average on this topic — great momentum!",
  "Try the practice quiz before moving on — it predicts a 20% score boost.",
  "Tip: re-watch the backpropagation segment — it's the key concept for Module 2.",
];

export function EdTechDemo() {
  const [progress, setProgress] = useState([72, 38, 0]);
  const [xp, setXp] = useState(620);
  const [tip, setTip] = useState(0);
  const [advancing, setAdvancing] = useState<number | null>(null);

  const advance = (i: number) => {
    if (advancing !== null || progress[i] >= 100) return;
    setAdvancing(i);
    setTimeout(() => {
      setProgress(p => { const n = [...p]; n[i] = Math.min(100, n[i] + 18); return n; });
      setXp(x => x + 55);
      setTip(t => (t + 1) % AI_TIPS.length);
      setAdvancing(null);
    }, 600);
  };

  return (
    <BrowserFrame url="learn.yourbrand.com">
      <div className="h-full flex flex-col p-5 gap-3" style={{ background: "hsl(250 20% 7%)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-white">AI Learning Platform</span>
          </div>
          <span className="text-xs text-primary font-bold">Level 7</span>
        </div>

        {/* XP bar */}
        <div className="rounded-lg border border-white/8 bg-white/[0.04] p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/55 font-medium">XP Progress</span>
            <span className="text-xs text-white/35">{xp} / 1000 XP</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(250 85% 60%), hsl(280 80% 60%))" }}
              animate={{ width: `${xp / 10}%` }} transition={{ duration: 0.5 }} />
          </div>
        </div>

        {/* AI Tutor — surfaces "AI tutoring & feedback" bullet */}
        <div className="rounded-lg border border-primary/25 bg-primary/8 p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">AI Tutor</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={tip} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-xs text-white/65 leading-relaxed">{AI_TIPS[tip]}</motion.p>
          </AnimatePresence>
        </div>

        {/* Modules with adaptive badge — surfaces "Adaptive content delivery" bullet */}
        <div className="space-y-2 flex-1">
          {MODULES.map((mod, i) => (
            <div key={i} className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-3.5 h-3.5 shrink-0" style={{ color: mod.color }} />
                <span className="text-xs font-medium text-white/80 flex-1 truncate">{mod.title}</span>
                {mod.adaptive && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/20 font-semibold shrink-0">Adaptive</span>
                )}
              </div>
              <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden mb-2">
                <motion.div className="h-full rounded-full" style={{ background: mod.color }}
                  animate={{ width: `${progress[i]}%` }} transition={{ duration: 0.5 }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/30">
                  {progress[i] >= 100 ? "Complete ✓" : `${progress[i]}%`}
                </span>
                <button onClick={() => advance(i)} disabled={advancing !== null || progress[i] >= 100}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-all ${
                    progress[i] >= 100       ? "text-emerald-400 bg-emerald-500/10 cursor-default" :
                    advancing === i          ? "text-white/30 bg-white/5 cursor-wait" :
                    "text-white bg-primary/80 hover:bg-primary"
                  }`}>
                  {progress[i] >= 100 ? "Done" : progress[i] === 0 ? "Start" : advancing === i ? "…" : "Continue"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Progress analytics — surfaces "Progress analytics dashboard" bullet */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Pace",      value: "2× avg" },
            { label: "Streak",    value: "6 days" },
            { label: "Est. done", value: "Nov 14" },
          ].map((m, i) => (
            <div key={i} className="rounded-lg border border-white/8 bg-white/[0.03] p-2 text-center">
              <div className="text-xs font-bold text-white">{m.value}</div>
              <div className="text-[9px] text-white/30 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────────────────────

const DEMO_MAP: Record<string, () => JSX.Element> = {
  chatbot:   ChatbotDemo,
  agentic:   AgenticAIDemo,
  webapp:    WebAppDemo,
  mobile:    MobileAppDemo,
  dataapp:   DataAppDemo,
  automation: AutomationDemo,
  ecommerce: ECommerceDemo,
  game:      GameDemo,
  edtech:    EdTechDemo,
};

export function DemoPreview({ projectType }: { projectType: string }) {
  const DemoComponent = DEMO_MAP[projectType];
  if (!DemoComponent) return null;
  return (
    <motion.div key={projectType} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}>
      <DemoComponent />
    </motion.div>
  );
}
