import { motion } from "framer-motion";
import {
  Smartphone, Globe, BarChart3, Gamepad2, Cog, MessageSquare,
  Search, Bell, Heart, Share2, Home, User, ShoppingCart, Settings,
  Play, TrendingUp, ArrowUpRight,
  ArrowDownRight, Filter, Download, RefreshCw, Brain, Send,
  Plus, Star, Mail, Zap, BookOpen, GraduationCap, Package, Tag,
} from "lucide-react";

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

export function MobileAppDemo() {
  const posts = [
    { user: "Sarah K.", time: "2m", text: "Just launched our new AI assistant!", likes: 24 },
    { user: "Mike R.", time: "15m", text: "Incredible results from the latest model", likes: 18 },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b flex items-center justify-between gap-2">
          <span className="font-semibold text-sm">Your App</span>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Bell className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex-1 overflow-hidden px-4 py-3 space-y-3">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="rounded-md bg-card p-3 border"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-medium">{post.user}</span>
                  <span className="text-xs text-muted-foreground ml-2">{post.time}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{post.text}</p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span className="text-xs">{post.likes}</span>
                </div>
                <Share2 className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="rounded-md bg-primary/10 p-3 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">AI Suggestion</span>
            </div>
            <p className="text-xs text-muted-foreground">Trending topics in your network today...</p>
          </motion.div>
        </div>
        <div className="border-t px-6 py-2 flex items-center justify-between">
          {[Home, Search, Plus, MessageSquare, User].map((Icon, i) => (
            <Icon key={i} className={`w-4 h-4 ${i === 0 ? "text-primary" : "text-muted-foreground"}`} />
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function WebAppDemo() {
  const bars = [40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100];
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
            <div key={i} className={`flex items-center gap-2 px-2 py-2 rounded-md text-xs transition-colors ${
              item.active ? "bg-primary/15 text-primary font-medium" : "text-white/40"
            }`}>
              <item.icon className="w-3.5 h-3.5 shrink-0" />
              {item.label}
            </div>
          ))}
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-white">Dashboard</h3>
              <p className="text-[10px] text-white/35">June 2026 · Live</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-xs border border-white/10 rounded-md px-2 py-1 text-white/40 flex items-center gap-1">
                <Filter className="w-3 h-3" />Last 30d
              </div>
              <div className="text-xs bg-primary text-white rounded-md px-2.5 py-1 font-medium">Export</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Revenue", value: "$84.7K", change: "+18%", up: true },
              { label: "Active Users", value: "6,241", change: "+11%", up: true },
              { label: "Churn Rate", value: "1.8%", change: "-0.6%", up: false },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                className="rounded-lg border border-white/8 bg-white/[0.04] p-3">
                <span className="text-[10px] text-white/40">{stat.label}</span>
                <div className="text-xl font-bold text-white mt-0.5">{stat.value}</div>
                <div className={`text-[10px] flex items-center gap-0.5 font-medium ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change} vs last month
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-white/80">Monthly Revenue</span>
              <span className="text-[10px] text-emerald-400 font-medium">↑ 18% YoY</span>
            </div>
            <div className="flex items-end gap-1.5 h-20">
              {bars.map((h, i) => (
                <motion.div key={i} className="flex-1 rounded-sm"
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: 0.6 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                  style={{ height: `${h}%`, minHeight: 2, transformOrigin: "bottom",
                    background: i === bars.length - 1 ? "hsl(250 85% 65%)" : "hsl(250 85% 60% / 0.3)" }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {["Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"].map((m, i) => (
                <span key={i} className="text-[8px] text-white/20">{m}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function DataAppDemo() {
  return (
    <BrowserFrame>
      <div className="h-full p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold">AI Analytics Dashboard</h3>
            <p className="text-xs text-muted-foreground">Real-time insights powered by ML</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-xs bg-card border rounded-sm px-2 py-1 text-muted-foreground">Last 30 days</div>
            <div className="text-xs bg-card border rounded-sm px-2 py-1 text-muted-foreground flex items-center gap-1">
              <Download className="w-3 h-3" /> Export
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Predictions", value: "12,847", icon: Brain },
            { label: "Accuracy", value: "97.3%", icon: TrendingUp },
            { label: "Models Active", value: "8", icon: Cog },
            { label: "Data Points", value: "2.4M", icon: BarChart3 },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-md bg-card border p-2.5 text-center"
            >
              <stat.icon className="w-4 h-4 text-primary mx-auto mb-1" />
              <div className="text-sm font-bold">{stat.value}</div>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="rounded-md bg-card border p-3"
          >
            <span className="text-xs font-medium mb-2 block">Model Performance</span>
            <div className="space-y-2">
              {["Sentiment Analysis", "Churn Prediction", "Demand Forecast"].map((model, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-28 truncate">{model}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${92 + i * 2}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <span className="text-xs font-medium w-8">{92 + i * 2}%</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="rounded-md bg-card border p-3"
          >
            <span className="text-xs font-medium mb-2 block">Real-time Feed</span>
            <div className="space-y-1.5">
              {[
                { text: "New anomaly detected in sales data", time: "2s ago" },
                { text: "Model retrained with 98.1% acc", time: "1m ago" },
                { text: "Pipeline completed successfully", time: "5m ago" },
                { text: "Alert: Unusual traffic pattern", time: "12m ago" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground leading-tight">{item.text}</p>
                    <span className="text-xs text-muted-foreground/60">{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function GameDemo() {
  return (
    <BrowserFrame>
      <div className="h-full relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(228 30% 8%) 0%, hsl(250 40% 12%) 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(250 85% 60% / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(280 80% 60% / 0.1) 0%, transparent 50%)" }} />
        <div className="relative h-full p-4 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-3">
              <div className="text-xs text-white/80 font-mono bg-white/10 rounded-sm px-2 py-1">Score: 12,450</div>
              <div className="text-xs text-white/80 font-mono bg-white/10 rounded-sm px-2 py-1">Level 7</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1,2,3].map(i => (
                  <Star key={i} className="w-3 h-3 text-chart-5 fill-chart-5" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {[0, 1, 2, 3, 4].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full border border-white/10"
                  style={{
                    width: 60 + ring * 50,
                    height: 60 + ring * 50,
                    top: -(ring * 25),
                    left: -(ring * 25),
                  }}
                  animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 8 + ring * 2, repeat: Infinity, ease: "linear" }}
                />
              ))}
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
                style={{ background: "linear-gradient(135deg, hsl(250 85% 60%), hsl(280 80% 60%))" }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gamepad2 className="w-6 h-6 text-white" />
              </motion.div>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    top: Math.sin((i / 6) * Math.PI * 2) * 90 - 4,
                    left: Math.cos((i / 6) * Math.PI * 2) * 90 + 24,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.3, 0.8],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-1 bg-white/10 rounded-md px-3 py-1.5 text-white/80">
              <Play className="w-3 h-3" />
              <span className="text-xs">Play</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 rounded-md px-3 py-1.5 text-white/80">
              <Settings className="w-3 h-3" />
              <span className="text-xs">Settings</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 rounded-md px-3 py-1.5 text-white/80">
              <Star className="w-3 h-3" />
              <span className="text-xs">Leaderboard</span>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function AutomationDemo() {
  const steps = [
    { label: "Trigger: New Email", status: "complete", icon: Mail },
    { label: "AI: Classify Intent", status: "complete", icon: Brain },
    { label: "Route to Team", status: "running", icon: User },
    { label: "Auto-Response", status: "pending", icon: Send },
  ];

  return (
    <BrowserFrame>
      <div className="h-full p-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold">Workflow Automation</h3>
            <p className="text-xs text-muted-foreground">AI-powered process orchestration</p>
          </div>
          <div className="text-xs bg-chart-3/20 text-chart-3 rounded-sm px-2 py-1 font-medium">Active</div>
        </div>

        <div className="space-y-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="flex items-center gap-3"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                step.status === "complete" ? "bg-chart-3/20" :
                step.status === "running" ? "bg-primary/20" : "bg-muted"
              }`}>
                <step.icon className={`w-3.5 h-3.5 ${
                  step.status === "complete" ? "text-chart-3" :
                  step.status === "running" ? "text-primary" : "text-muted-foreground"
                }`} />
              </div>
              <div className="flex-1 rounded-md bg-card border p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium">{step.label}</span>
                  {step.status === "running" && (
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </div>
              </div>
              
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="rounded-md bg-card border p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium">Performance</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold">847</div>
              <span className="text-xs text-muted-foreground">Runs today</span>
            </div>
            <div>
              <div className="text-lg font-bold">99.8%</div>
              <span className="text-xs text-muted-foreground">Success rate</span>
            </div>
            <div>
              <div className="text-lg font-bold">1.2s</div>
              <span className="text-xs text-muted-foreground">Avg time</span>
            </div>
          </div>
        </motion.div>
      </div>
    </BrowserFrame>
  );
}

export function ChatbotDemo() {
  const messages = [
    { role: "user" as const, text: "What's the status of order #AV-8821?" },
    { role: "bot" as const, text: "Order #AV-8821 shipped yesterday via FedEx. Estimated delivery: tomorrow by 8pm. Tracking: FX 4821 0093 2241." },
    { role: "user" as const, text: "Can I change the delivery address?" },
    { role: "bot" as const, text: "Yes — the package hasn't reached the local depot yet. I've flagged it for rerouting. What's the new address?" },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b border-white/8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(250 85% 60% / 0.2)" }}>
            <Brain className="w-4.5 h-4.5 text-primary" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold">Aria — Support AI</span>
            <div className="flex items-center gap-1.5">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-xs text-white/40">Online · typically replies instantly</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.45 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-white/[0.07] border border-white/10 text-white/85 rounded-bl-sm"
              }`}>{msg.text}</div>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
            className="flex justify-start">
            <div className="bg-white/[0.07] border border-white/10 rounded-2xl rounded-bl-sm px-3.5 py-2.5">
              <motion.div className="flex gap-1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }}>
                {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50" />)}
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="border-t border-white/8 px-3 py-3 flex items-center gap-2">
          <div className="flex-1 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-xs text-white/30">
            Reply to Aria...
          </div>
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Send className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function AgenticAIDemo() {
  const steps = [
    { agent: "Planner", action: "Decompose goal into subtasks", status: "done", time: "0.3s" },
    { agent: "Research", action: "Pull competitor pricing data from 14 sources", status: "done", time: "4.1s" },
    { agent: "Analyst", action: "Running sentiment + trend models", status: "active", time: "..." },
    { agent: "Writer", action: "Draft executive summary", status: "queued", time: "" },
    { agent: "Reviewer", action: "Fact-check and quality gate", status: "queued", time: "" },
  ];

  return (
    <BrowserFrame url="agents.yourbrand.com/pipeline">
      <div className="h-full flex flex-col p-5 gap-4" style={{ background: "hsl(250 20% 7%)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-white">Market Intelligence Pipeline</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <motion.div className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            Running
          </div>
        </div>

        <div className="space-y-2">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.2 }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 border ${
                s.status === "active"
                  ? "border-primary/40 bg-primary/8"
                  : s.status === "done"
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-white/6 bg-white/[0.03]"
              }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                s.status === "done" ? "bg-emerald-500/20 text-emerald-400" :
                s.status === "active" ? "bg-primary/20 text-primary" :
                "bg-white/8 text-white/30"
              }`}>
                {s.status === "done" ? "✓" : i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{s.agent}</span>
                  {s.status === "active" && (
                    <motion.div className="flex gap-0.5" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }}>
                      {[0,1,2].map(j => <div key={j} className="w-1 h-1 rounded-full bg-primary" />)}
                    </motion.div>
                  )}
                </div>
                <div className={`text-xs mt-0.5 ${s.status === "queued" ? "text-white/25" : "text-white/70"}`}>
                  {s.action}
                </div>
              </div>
              {s.time && <span className="text-[10px] text-white/30 font-mono shrink-0">{s.time}</span>}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="mt-auto grid grid-cols-3 gap-3">
          {[
            { label: "Tasks done", value: "2 / 5" },
            { label: "Sources read", value: "14" },
            { label: "Time elapsed", value: "4.4s" },
          ].map((m, i) => (
            <div key={i} className="rounded-lg border border-white/8 bg-white/[0.03] p-3 text-center">
              <div className="text-base font-bold text-white">{m.value}</div>
              <div className="text-[10px] text-white/35 mt-0.5">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </BrowserFrame>
  );
}

function ECommerceDemo() {
  const products = [
    { name: "Wireless Pro Headphones", price: "$299", rating: 4.8, tag: "Best Seller" },
    { name: "Smart Fitness Watch", price: "$199", rating: 4.6, tag: "New" },
  ];

  return (
    <BrowserFrame>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-sm font-semibold">AI Store</span>
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <div className="relative">
              <ShoppingCart className="w-3.5 h-3.5 text-muted-foreground" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary text-[8px] text-primary-foreground flex items-center justify-center">2</div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-md bg-primary/10 border border-primary/20 p-2.5 flex items-center gap-2"
        >
          <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-xs text-primary">AI recommends: Items matching your browsing history</span>
        </motion.div>

        <div className="space-y-2.5">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.3 }}
              className="rounded-md bg-card border p-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                    <span className="text-xs font-semibold">{product.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{product.tag}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-chart-5 fill-chart-5" />
                    <span className="text-[10px] text-muted-foreground">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold">{product.price}</span>
                    <div className="text-[10px] px-2 py-1 rounded-md bg-primary text-primary-foreground">Add to Cart</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function EdTechDemo() {
  const modules = [
    { title: "Intro to Machine Learning", progress: 85, lessons: 12 },
    { title: "Neural Networks Deep Dive", progress: 42, lessons: 8 },
    { title: "NLP Fundamentals", progress: 0, lessons: 10 },
  ];

  return (
    <BrowserFrame>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">AI Learning Platform</span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-md bg-card border p-3"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-medium">Your Progress</span>
            <span className="text-xs text-primary font-semibold">Level 7</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">680 / 1000 XP to Level 8</div>
        </motion.div>

        <div className="space-y-2">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.25 }}
              className="rounded-md bg-card border p-2.5"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-xs font-medium flex-1">{mod.title}</span>
                <span className="text-[10px] text-muted-foreground">{mod.lessons} lessons</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mod.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.2 }}
                  className={`h-full rounded-full ${mod.progress > 0 ? "bg-chart-3" : ""}`}
                />
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">
                {mod.progress > 0 ? `${mod.progress}% complete` : "Not started"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

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
    <motion.div
      key={projectType}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <DemoComponent />
    </motion.div>
  );
}
