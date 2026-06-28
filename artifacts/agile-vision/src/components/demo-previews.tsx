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
    <div className="mx-auto w-[260px] h-[520px] rounded-[2rem] border-4 border-foreground/20 bg-background overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground/20 rounded-b-xl z-10" />
      <div className="h-full overflow-hidden pt-5">
        {children}
      </div>
    </div>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[600px] rounded-md border overflow-hidden bg-background">
      <div className="flex items-center gap-2 px-3 py-2 bg-muted border-b">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-chart-5/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-chart-3/60" />
        </div>
        <div className="flex-1 bg-background rounded-sm px-3 py-1 text-xs text-muted-foreground truncate">
          app.yourbrand.com
        </div>
      </div>
      <div className="h-[400px] overflow-hidden">
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
  return (
    <BrowserFrame>
      <div className="h-full flex">
        <div className="w-44 border-r bg-card p-3 space-y-1 shrink-0">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-primary/10 text-primary">
            <Home className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Dashboard</span>
          </div>
          {[
            { icon: User, label: "Users" },
            { icon: ShoppingCart, label: "Orders" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground">
              <item.icon className="w-3.5 h-3.5" />
              <span className="text-xs">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">Dashboard</h3>
            <div className="flex items-center gap-1">
              <div className="text-xs bg-card border rounded-sm px-2 py-1 text-muted-foreground flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Filter
              </div>
              <div className="text-xs bg-primary text-primary-foreground rounded-sm px-2 py-1">Export</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Revenue", value: "$48.2K", change: "+12%", up: true },
              { label: "Users", value: "2,847", change: "+8%", up: true },
              { label: "Conv. Rate", value: "3.2%", change: "-0.4%", up: false },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-md bg-card border p-2.5"
              >
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <div className="text-lg font-bold mt-0.5">{stat.value}</div>
                <div className={`text-xs flex items-center gap-0.5 ${stat.up ? "text-chart-3" : "text-destructive"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="rounded-md bg-card border p-3"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-medium">Revenue Trend</span>
              <RefreshCw className="w-3 h-3 text-muted-foreground" />
            </div>
            <div className="flex items-end gap-1 h-16">
              {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className="flex-1 bg-primary/30 rounded-sm"
                  style={{ minHeight: 2 }}
                />
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
    { role: "user" as const, text: "How do I reset my password?" },
    { role: "bot" as const, text: "I can help with that! I've sent a reset link to your email. Check your inbox and click the link within 15 minutes." },
    { role: "user" as const, text: "Got it, thanks!" },
  ];

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-sm font-semibold">AI Assistant</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-chart-3" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden px-4 py-3 space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.4 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card border rounded-bl-sm"
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex justify-start"
          >
            <div className="bg-card border rounded-2xl rounded-bl-sm px-3 py-2">
              <motion.div
                className="flex gap-1"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="border-t px-3 py-2 flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-full px-3 py-2 text-xs text-muted-foreground">
            Type a message...
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Send className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function AgenticAIDemo() {
  const agents = [
    { name: "Research Agent", task: "Analyzing market data...", status: "active" as const },
    { name: "Writer Agent", task: "Drafting report summary", status: "waiting" as const },
    { name: "Review Agent", task: "Pending review", status: "idle" as const },
  ];

  return (
    <BrowserFrame>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Agent Orchestrator</span>
        </div>

        <div className="rounded-md bg-card border p-3">
          <div className="text-xs font-medium mb-2 text-muted-foreground">Active Pipeline</div>
          <div className="space-y-2">
            {agents.map((agent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.3 }}
                className="flex items-center gap-2"
              >
                <div className={`w-2 h-2 rounded-full ${
                  agent.status === "active" ? "bg-chart-3" :
                  agent.status === "waiting" ? "bg-chart-5" : "bg-muted-foreground/30"
                }`} />
                {agent.status === "active" && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-chart-3 absolute"
                    animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <div className="flex-1 rounded-md bg-muted/50 px-2.5 py-1.5">
                  <div className="text-xs font-medium">{agent.name}</div>
                  <div className="text-[10px] text-muted-foreground">{agent.task}</div>
                </div>
                <Zap className={`w-3 h-3 ${agent.status === "active" ? "text-chart-3" : "text-muted-foreground/30"}`} />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="rounded-md bg-card border p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium">Agent Metrics</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold">3</div>
              <span className="text-xs text-muted-foreground">Agents</span>
            </div>
            <div>
              <div className="text-lg font-bold">12</div>
              <span className="text-xs text-muted-foreground">Tasks done</span>
            </div>
            <div>
              <div className="text-lg font-bold">2.4s</div>
              <span className="text-xs text-muted-foreground">Avg latency</span>
            </div>
          </div>
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
