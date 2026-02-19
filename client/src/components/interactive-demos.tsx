import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send, MessageSquare, Brain, Cog, BarChart3,
  ArrowRight, Zap, CheckCircle2, Clock, Loader2,
  Mail, FileText, Database, Globe, Shield, Bell,
  TrendingUp, Users, DollarSign, Activity, Filter,
  Bot, Target, Search as SearchIcon, Sparkles, RotateCcw,
} from "lucide-react";

const chatResponses: Record<string, string> = {
  "help me write an email": "Sure! Here's a professional email draft:\n\nSubject: Follow-up on Our Discussion\n\nHi [Name],\n\nThank you for taking the time to meet with me. I wanted to follow up on the key points we discussed and outline the next steps...\n\nWould you like me to customize this further?",
  "what can you do": "I can help with a wide range of tasks:\n\n• Draft emails, reports, and documents\n• Analyze data and generate insights\n• Answer questions about your business\n• Automate repetitive workflows\n• Provide 24/7 customer support\n• Translate content into 50+ languages\n\nWhat would you like to try?",
  "analyze my sales data": "Based on your recent sales data, here are the key insights:\n\n- Revenue is up 23% month-over-month\n- Top-performing product: Enterprise Plan (+45%)\n- Churn rate increased slightly in the SMB segment\n- Recommendation: Focus retention efforts on SMB accounts with personalized outreach.\n\nWant me to generate a detailed report?",
  "default": "Great question! I've analyzed your request and here's what I found:\n\nI can process natural language queries, pull data from connected systems, and provide intelligent recommendations tailored to your business context.\n\nThe more specific your question, the more targeted my response. Try asking about data analysis, content creation, or workflow automation!",
};

const suggestedPrompts = [
  "What can you do?",
  "Analyze my sales data",
  "Help me write an email",
];

type ChatMessage = { role: "user" | "bot"; text: string };

function InteractiveChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi! I'm your AI assistant. Ask me anything or try one of the suggestions below." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentBotReply, setCurrentBotReply] = useState("");
  const [replyDone, setReplyDone] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentBotReply]);

  const getResponse = (query: string) => {
    const q = query.toLowerCase().trim();
    for (const key of Object.keys(chatResponses)) {
      if (key !== "default" && q.includes(key)) return chatResponses[key];
    }
    return chatResponses["default"];
  };

  const handleSend = useCallback((text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setIsTyping(true);
    setReplyDone(false);

    const response = getResponse(msg);
    setTimeout(() => {
      setIsTyping(false);
      setCurrentBotReply("");
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setCurrentBotReply(response.slice(0, i));
        if (i >= response.length) {
          clearInterval(interval);
          setMessages((prev) => [...prev, { role: "bot", text: response }]);
          setCurrentBotReply("");
          setReplyDone(true);
        }
      }, 12);
    }, 800 + Math.random() * 400);
  }, [input, isTyping]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-card/50">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(250 85% 60%), hsl(280 80% 60%))" }}>
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <span className="text-sm font-semibold">AI Assistant</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 1 && (
            <button
              onClick={() => {
                setMessages([{ role: "bot", text: "Hi! I'm your AI assistant. Ask me anything or try one of the suggestions below." }]);
                setInput("");
                setIsTyping(false);
                setCurrentBotReply("");
                setReplyDone(true);
              }}
              className="text-muted-foreground/60 hover:text-foreground transition-colors"
              data-testid="button-reset-chat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <Badge variant="secondary" className="text-[10px]">Demo</Badge>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3" data-testid="chat-messages">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            data-testid={`chat-message-${msg.role}-${i}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-card border rounded-bl-md"
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <motion.div className="w-2 h-2 rounded-full bg-muted-foreground/60" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                <motion.div className="w-2 h-2 rounded-full bg-muted-foreground/60" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} />
                <motion.div className="w-2 h-2 rounded-full bg-muted-foreground/60" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
              </div>
            </div>
          </div>
        )}
        {currentBotReply && (
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-card border rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line">
              {currentBotReply}
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block w-0.5 h-4 bg-foreground ml-0.5 align-middle" />
            </div>
          </div>
        )}
        {messages.length === 1 && replyDone && (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedPrompts.map((prompt, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => handleSend(prompt)}
                className="text-xs border rounded-full px-3 py-1.5 text-muted-foreground hover-elevate cursor-pointer"
                data-testid={`button-suggestion-${i}`}
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t px-3 py-2.5 flex items-center gap-2 bg-card/30">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          disabled={isTyping || !replyDone}
          className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 disabled:opacity-50"
          data-testid="input-chat"
        />
        <Button
          size="icon"
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping || !replyDone}
          className="rounded-full shrink-0"
          data-testid="button-send-chat"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

type WorkflowStep = {
  id: number;
  label: string;
  icon: typeof Mail;
  status: "pending" | "running" | "complete";
};

const availableSteps = [
  { label: "Receive Email", icon: Mail },
  { label: "AI Classify", icon: Brain },
  { label: "Extract Data", icon: Database },
  { label: "Enrich CRM", icon: Users },
  { label: "Send Notification", icon: Bell },
  { label: "Generate Report", icon: FileText },
  { label: "API Call", icon: Globe },
  { label: "Security Check", icon: Shield },
];

function InteractiveWorkflow() {
  const [steps, setSteps] = useState<WorkflowStep[]>([
    { id: 1, label: "Receive Email", icon: Mail, status: "pending" },
    { id: 2, label: "AI Classify", icon: Brain, status: "pending" },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [runComplete, setRunComplete] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const nextId = useRef(3);

  const addStep = (step: typeof availableSteps[0]) => {
    setSteps((prev) => [...prev, { id: nextId.current++, label: step.label, icon: step.icon, status: "pending" as const }]);
    setShowAddMenu(false);
    setRunComplete(false);
  };

  const removeStep = (id: number) => {
    if (steps.length <= 1) return;
    setSteps((prev) => prev.filter((s) => s.id !== id));
    setRunComplete(false);
  };

  const runPipeline = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setRunComplete(false);
    setSteps((prev) => prev.map((s) => ({ ...s, status: "pending" as const })));

    let i = 0;
    const interval = setInterval(() => {
      setSteps((prev) => prev.map((s, idx) => ({
        ...s,
        status: idx === i ? "running" : idx < i ? "complete" : "pending",
      }) as WorkflowStep));
      i++;
      if (i > steps.length) {
        clearInterval(interval);
        setSteps((prev) => prev.map((s) => ({ ...s, status: "complete" as const })));
        setIsRunning(false);
        setRunComplete(true);
      }
    }, 600);
  }, [isRunning, steps.length]);

  const usedLabels = new Set(steps.map((s) => s.label));
  const available = availableSteps.filter((s) => !usedLabels.has(s.label));

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b bg-card/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(160 85% 40%), hsl(180 70% 45%))" }}>
            <Cog className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold">Workflow Builder</span>
            <div className="text-xs text-muted-foreground">{steps.length} steps</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(steps.length > 2 || runComplete) && !isRunning && (
            <button
              onClick={() => {
                setSteps([
                  { id: 1, label: "Receive Email", icon: Mail, status: "pending" },
                  { id: 2, label: "AI Classify", icon: Brain, status: "pending" },
                ]);
                setRunComplete(false);
                nextId.current = 3;
              }}
              className="text-muted-foreground/60 hover:text-foreground transition-colors"
              data-testid="button-reset-workflow"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <Badge variant="secondary" className="text-[10px]">Demo</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        <AnimatePresence>
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    step.status === "complete" ? "bg-emerald-500/20" :
                    step.status === "running" ? "bg-primary/20" : "bg-muted"
                  }`}>
                    {step.status === "complete" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : step.status === "running" ? (
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    ) : (
                      <step.icon className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-0.5 h-4 mt-1 transition-colors ${
                      step.status === "complete" ? "bg-emerald-500/40" : "bg-muted"
                    }`} />
                  )}
                </div>
                <div className="flex-1 rounded-md bg-card border p-2.5 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-medium">{step.label}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {step.status === "complete" ? "Done" : step.status === "running" ? "Processing..." : `Step ${i + 1}`}
                    </div>
                  </div>
                  {!isRunning && (
                    <button
                      onClick={() => removeStep(step.id)}
                      className="text-muted-foreground/40 hover:text-destructive text-xs px-1"
                      data-testid={`button-remove-step-${step.id}`}
                    >
                      x
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {runComplete && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-emerald-500/10 border border-emerald-500/20 p-3 mt-3"
            data-testid="workflow-complete-banner"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400" data-testid="text-pipeline-time">Pipeline completed in {(steps.length * 0.6).toFixed(1)}s</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="border-t px-3 py-2.5 flex items-center gap-2 bg-card/30 relative">
        {showAddMenu && available.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full left-3 right-3 mb-1 bg-card border rounded-md shadow-lg p-2 grid grid-cols-2 gap-1 z-10"
          >
            {available.map((step, i) => (
              <button
                key={i}
                onClick={() => addStep(step)}
                className="flex items-center gap-2 px-2.5 py-2 rounded-md text-xs hover-elevate cursor-pointer text-left"
                data-testid={`button-add-${step.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <step.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                {step.label}
              </button>
            ))}
          </motion.div>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddMenu(!showAddMenu)}
          disabled={isRunning || available.length === 0}
          data-testid="button-add-step"
        >
          + Add Step
        </Button>
        <div className="flex-1" />
        <Button
          size="sm"
          onClick={runPipeline}
          disabled={isRunning || steps.length === 0}
          data-testid="button-run-pipeline"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Run Pipeline
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

type MetricData = { revenue: string; users: string; conversion: string; growth: string };
const metricSets: Record<string, MetricData> = {
  "7d": { revenue: "$12.4K", users: "847", conversion: "3.8%", growth: "+18%" },
  "30d": { revenue: "$48.2K", users: "2,847", conversion: "3.2%", growth: "+12%" },
  "90d": { revenue: "$142K", users: "8,391", conversion: "3.5%", growth: "+24%" },
  "1y": { revenue: "$523K", users: "31,204", conversion: "3.4%", growth: "+67%" },
};

const chartSets: Record<string, number[]> = {
  "7d": [65, 72, 58, 80, 75, 90, 85],
  "30d": [40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100],
  "90d": [30, 45, 55, 50, 65, 70, 80, 75, 85, 90, 88, 95],
  "1y": [20, 35, 40, 55, 50, 60, 70, 65, 80, 85, 90, 100],
};

function InteractiveDashboard() {
  const [period, setPeriod] = useState("30d");
  const [activeFilter, setActiveFilter] = useState("all");
  const metrics = metricSets[period];
  const chartData = chartSets[period];

  const statCards = [
    { label: "Revenue", value: metrics.revenue, icon: DollarSign, color: "text-emerald-500" },
    { label: "Users", value: metrics.users, icon: Users, color: "text-blue-500" },
    { label: "Conversion", value: metrics.conversion, icon: TrendingUp, color: "text-purple-500" },
    { label: "Growth", value: metrics.growth, icon: Activity, color: "text-orange-500" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b bg-card/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(220 85% 55%), hsl(250 70% 55%))" }}>
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold">Smart Dashboard</span>
        </div>
        <Badge variant="secondary" className="text-[10px]">Demo</Badge>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-1">
            {["7d", "30d", "90d", "1y"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-xs px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                  period === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover-elevate"
                }`}
                data-testid={`button-period-${p}`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {["all", "organic", "paid"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs px-2.5 py-1.5 rounded-md transition-colors capitalize cursor-pointer ${
                  activeFilter === f ? "bg-primary/20 text-primary" : "text-muted-foreground hover-elevate"
                }`}
                data-testid={`button-filter-${f}`}
              >
                {f === "all" ? <Filter className="w-3 h-3 inline mr-1" /> : null}
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {statCards.map((stat, i) => (
            <motion.div
              key={`${period}-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-md bg-card border p-2.5"
              data-testid={`stat-${stat.label.toLowerCase()}`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                <span className="text-[10px] text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-base font-bold" data-testid={`text-${stat.label.toLowerCase()}-value`}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-md bg-card border p-3">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-medium">Revenue Trend</span>
            <span className="text-[10px] text-muted-foreground">{activeFilter !== "all" ? activeFilter : "all channels"}</span>
          </div>
          <div className="flex items-end gap-1 h-24">
            {chartData.map((h, i) => (
              <motion.div
                key={`${period}-${activeFilter}-${i}`}
                initial={{ height: 0 }}
                animate={{ height: `${h * (activeFilter === "organic" ? 0.7 : activeFilter === "paid" ? 0.5 : 1)}%` }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="flex-1 rounded-sm"
                style={{
                  minHeight: 2,
                  background: `linear-gradient(180deg, hsl(250 85% 60%) 0%, hsl(250 85% 60% / 0.3) 100%)`,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[9px] text-muted-foreground/50">
            <span>{period === "7d" ? "Mon" : period === "30d" ? "Week 1" : period === "90d" ? "Month 1" : "Jan"}</span>
            <span>{period === "7d" ? "Sun" : period === "30d" ? "Week 4" : period === "90d" ? "Month 3" : "Dec"}</span>
          </div>
        </div>

        <div className="rounded-md bg-card border p-3">
          <span className="text-xs font-medium mb-2 block">Top Sources</span>
          <div className="space-y-2">
            {[
              { name: "Direct", pct: 42 },
              { name: "Google", pct: 28 },
              { name: "Social", pct: 18 },
              { name: "Referral", pct: 12 },
            ].map((source, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-14">{source.name}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    key={`${period}-${i}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${source.pct}%` }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <span className="text-[10px] font-medium w-8 text-right">{source.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type Agent = {
  name: string;
  icon: typeof SearchIcon;
  status: "idle" | "thinking" | "working" | "done";
  task: string;
  result?: string;
};

const agentScenarios: Record<string, { agents: Agent[]; summary: string }> = {
  "Research competitor pricing": {
    agents: [
      { name: "Web Scraper", icon: Globe, status: "idle", task: "Crawling competitor websites", result: "Found pricing data from 8 competitors" },
      { name: "Data Analyst", icon: BarChart3, status: "idle", task: "Comparing pricing tiers", result: "Analysis complete: You're 15% below market avg" },
      { name: "Report Writer", icon: FileText, status: "idle", task: "Generating insights report", result: "3-page competitive pricing report ready" },
    ],
    summary: "Competitive analysis complete. You're positioned 15% below market average with an opportunity to increase Enterprise tier pricing by $50/mo.",
  },
  "Draft a marketing campaign": {
    agents: [
      { name: "Audience Analyst", icon: Users, status: "idle", task: "Segmenting target demographics", result: "Identified 3 high-value segments" },
      { name: "Content Creator", icon: FileText, status: "idle", task: "Writing copy for each channel", result: "Email, social, and ad copy generated" },
      { name: "Strategy Agent", icon: Target, status: "idle", task: "Optimizing campaign schedule", result: "2-week rollout plan with A/B tests" },
    ],
    summary: "Campaign ready! Targeting 3 segments across email, social, and paid ads. Estimated reach: 45K contacts with projected 4.2% conversion rate.",
  },
  "default": {
    agents: [
      { name: "Research Agent", icon: SearchIcon, status: "idle", task: "Gathering information", result: "Compiled key data points" },
      { name: "Analysis Agent", icon: Brain, status: "idle", task: "Processing and reasoning", result: "Generated actionable insights" },
      { name: "Execution Agent", icon: Zap, status: "idle", task: "Taking action on findings", result: "Deliverables prepared" },
    ],
    summary: "Task complete! All agents collaborated successfully. Results are ready for your review.",
  },
};

const agentSuggestions = [
  "Research competitor pricing",
  "Draft a marketing campaign",
];

function InteractiveAgenticAI() {
  const [input, setInput] = useState("");
  const [goal, setGoal] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [agents, summaryText]);

  const startMission = useCallback((text?: string) => {
    const goalText = text || input.trim();
    if (!goalText || isRunning) return;
    setInput("");
    setGoal(goalText);
    setSummary("");
    setSummaryText("");
    setIsRunning(true);

    const q = goalText.toLowerCase();
    let scenario = agentScenarios["default"];
    for (const key of Object.keys(agentScenarios)) {
      if (key !== "default" && q.includes(key.toLowerCase())) { scenario = agentScenarios[key]; break; }
    }

    const agentsCopy = scenario.agents.map((a) => ({ ...a, status: "idle" as const }));
    setAgents(agentsCopy);

    let i = 0;
    const runAgent = () => {
      if (i >= agentsCopy.length) {
        setTimeout(() => {
          setSummary(scenario.summary);
          let j = 0;
          const typeInterval = setInterval(() => {
            j++;
            setSummaryText(scenario.summary.slice(0, j));
            if (j >= scenario.summary.length) { clearInterval(typeInterval); setIsRunning(false); }
          }, 15);
        }, 400);
        return;
      }
      setAgents((prev) => prev.map((a, idx) => ({
        ...a,
        status: idx === i ? "thinking" : idx < i ? "done" : "idle",
      }) as Agent));

      setTimeout(() => {
        setAgents((prev) => prev.map((a, idx) => ({
          ...a,
          status: idx === i ? "working" : idx < i ? "done" : "idle",
        }) as Agent));

        setTimeout(() => {
          setAgents((prev) => prev.map((a, idx) => ({
            ...a,
            status: idx <= i ? "done" : "idle",
          }) as Agent));
          i++;
          runAgent();
        }, 800);
      }, 600);
    };

    setTimeout(runAgent, 400);
  }, [input, isRunning]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b bg-card/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(30 90% 55%), hsl(350 80% 55%))" }}>
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold">Agentic AI</span>
            <div className="text-xs text-muted-foreground">Multi-agent orchestration</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {goal && !isRunning && (
            <button
              onClick={() => {
                setGoal("");
                setAgents([]);
                setSummaryText("");
                setInput("");
              }}
              className="text-muted-foreground/60 hover:text-foreground transition-colors"
              data-testid="button-reset-agents"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <Badge variant="secondary" className="text-[10px]">Demo</Badge>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {!goal && !isRunning && (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(30 90% 55% / 0.2), hsl(350 80% 55% / 0.2))" }}>
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-sm font-medium mb-1">Give your AI team a mission</p>
            <p className="text-xs text-muted-foreground mb-4">Type a goal and watch autonomous agents collaborate to complete it</p>
            <div className="flex flex-col gap-2 max-w-xs mx-auto">
              {agentSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => startMission(s)}
                  className="text-xs border rounded-md px-3 py-2 text-muted-foreground hover-elevate cursor-pointer text-left flex items-center gap-2"
                  data-testid={`button-agent-suggestion-${i}`}
                >
                  <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {goal && (
          <>
            <div className="rounded-md bg-primary/10 border border-primary/20 p-3">
              <div className="text-[10px] text-primary font-medium mb-1">MISSION</div>
              <p className="text-sm font-medium">{goal}</p>
            </div>

            <div className="space-y-2">
              {agents.map((agent, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="rounded-md bg-card border p-3"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      agent.status === "done" ? "bg-emerald-500/20" :
                      agent.status === "working" ? "bg-primary/20" :
                      agent.status === "thinking" ? "bg-yellow-500/20" : "bg-muted"
                    }`}>
                      {agent.status === "done" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> :
                       agent.status === "working" || agent.status === "thinking" ? <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" /> :
                       <agent.icon className="w-3.5 h-3.5 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium">{agent.name}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {agent.status === "thinking" ? "Thinking..." :
                         agent.status === "working" ? agent.task :
                         agent.status === "done" ? agent.result : "Waiting..."}
                      </div>
                    </div>
                    {agent.status === "done" && (
                      <Badge variant="secondary" className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Done</Badge>
                    )}
                    {(agent.status === "working" || agent.status === "thinking") && (
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {summaryText && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-emerald-500/10 border border-emerald-500/20 p-3"
                data-testid="agent-mission-complete"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Mission Complete</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {summaryText}
                  {summaryText.length < summary.length && (
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block w-0.5 h-3 bg-foreground ml-0.5 align-middle" />
                  )}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>

      <div className="border-t px-3 py-2.5 flex items-center gap-2 bg-card/30">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && startMission()}
          placeholder="Describe a goal for your AI team..."
          disabled={isRunning}
          className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 disabled:opacity-50"
          data-testid="input-agent-goal"
        />
        <Button
          size="icon"
          onClick={() => startMission()}
          disabled={!input.trim() || isRunning}
          className="rounded-full shrink-0"
          data-testid="button-send-goal"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

const demos = [
  { id: "chatbot", label: "AI Chatbot", icon: MessageSquare, component: InteractiveChatbot },
  { id: "workflow", label: "Workflow Builder", icon: Cog, component: InteractiveWorkflow },
  { id: "dashboard", label: "Smart Dashboard", icon: BarChart3, component: InteractiveDashboard },
  { id: "agentic", label: "Agentic AI", icon: Brain, component: InteractiveAgenticAI },
];

export function ProductPlayground() {
  const [activeDemo, setActiveDemo] = useState("chatbot");
  const ActiveComponent = demos.find((d) => d.id === activeDemo)!.component;

  return (
    <div data-testid="product-playground">
      <div className="flex gap-1.5 sm:gap-2 mb-6 justify-center flex-wrap">
        {demos.map((demo) => {
          const isActive = activeDemo === demo.id;
          return (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border text-muted-foreground hover-elevate"
              }`}
              data-testid={`tab-demo-${demo.id}`}
            >
              <demo.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{demo.label}</span>
              <span className="sm:hidden">{demo.label.split(" ").pop()}</span>
            </button>
          );
        })}
      </div>

      <div className="relative">
        <div className="rounded-xl border bg-background overflow-hidden shadow-xl" style={{ minHeight: 520 }}>
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-muted/40 border-b">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-chart-5/50" />
              <div className="w-3 h-3 rounded-full bg-chart-3/50" />
            </div>
            <div className="flex-1 bg-background/60 rounded-md px-3 py-1 text-xs text-muted-foreground/70 truncate font-mono">
              playground.agilevision.ai/{activeDemo}
            </div>
          </div>
          <div style={{ height: 480 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDemo}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full"
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute -inset-2 rounded-2xl opacity-20 -z-10 blur-2xl" style={{ background: "linear-gradient(135deg, hsl(250 85% 60% / 0.4), hsl(280 80% 60% / 0.3), hsl(200 80% 50% / 0.2))" }} />
      </div>
    </div>
  );
}
