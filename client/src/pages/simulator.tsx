import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  MessageSquare,
  Cog,
  BarChart3,
  Users,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Zap,
  TrendingUp,
  Shield,
  Target,
  Layers,
  RefreshCw,
  Play,
  Bot,
  Workflow,
  LineChart,
  Package,
  Headphones,
  FileText,
  Search,
  Activity,
  Cpu,
  type LucideIcon,
} from "lucide-react";

interface Scenario {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  industry: string;
  painPoints: string[];
  currentMetrics: { label: string; value: string; icon: LucideIcon }[];
  workflowSteps: { label: string; duration: string; bottleneck: boolean; description: string }[];
  aiSolutions: { title: string; description: string; icon: LucideIcon }[];
  improvements: { label: string; before: string; after: string; change: string; icon: LucideIcon }[];
  summary: string;
}

const scenarios: Scenario[] = [
  {
    id: "customer-support",
    title: "Customer Support Overload",
    icon: Headphones,
    description: "Your support team is drowning in repetitive tickets while response times keep climbing.",
    industry: "Customer Service",
    painPoints: ["Long wait times frustrate customers", "Agents spend 60% of time on repetitive queries", "No 24/7 coverage leads to overnight ticket pileup", "Inconsistent response quality across agents"],
    currentMetrics: [
      { label: "Avg. Response Time", value: "4.2 hours", icon: Clock },
      { label: "Monthly Ticket Volume", value: "12,000+", icon: MessageSquare },
      { label: "Agent Utilization", value: "94%", icon: Users },
      { label: "Customer Satisfaction", value: "62%", icon: Target },
    ],
    workflowSteps: [
      { label: "Ticket Created", duration: "Instant", bottleneck: false, description: "Customer submits a support request via email, chat, or phone" },
      { label: "Queue & Triage", duration: "45 min", bottleneck: true, description: "Ticket sits in queue waiting for manual categorization and priority assignment" },
      { label: "Agent Assignment", duration: "30 min", bottleneck: true, description: "Supervisor manually routes ticket to available agent with right expertise" },
      { label: "Research & Context", duration: "20 min", bottleneck: false, description: "Agent searches knowledge base and past tickets for relevant information" },
      { label: "Draft Response", duration: "15 min", bottleneck: false, description: "Agent composes personalized response with solution or next steps" },
      { label: "Resolution", duration: "Variable", bottleneck: false, description: "Follow-up exchanges until customer issue is fully resolved" },
    ],
    aiSolutions: [
      { title: "AI Chatbot Triage", description: "Instantly categorize, prioritize, and resolve up to 70% of common queries without human intervention", icon: Bot },
      { title: "Smart Routing", description: "AI matches tickets to the best-suited agent based on expertise, workload, and historical resolution data", icon: Workflow },
      { title: "Response Copilot", description: "AI drafts contextual responses using your knowledge base, past resolutions, and customer history", icon: BrainCircuit },
    ],
    improvements: [
      { label: "Response Time", before: "4.2 hours", after: "8 minutes", change: "-97%", icon: Clock },
      { label: "Resolution Rate", before: "68%", after: "94%", change: "+38%", icon: CheckCircle2 },
      { label: "Customer Satisfaction", before: "62%", after: "91%", change: "+47%", icon: Target },
      { label: "Cost per Ticket", before: "$12.40", after: "$3.20", change: "-74%", icon: DollarSign },
    ],
    summary: "By deploying an AI-powered support ecosystem, your team can resolve most queries instantly while empowering agents to focus on complex, high-value interactions. The result: happier customers, lower costs, and a support team that scales effortlessly.",
  },
  {
    id: "data-processing",
    title: "Manual Data Processing",
    icon: FileText,
    description: "Your team manually extracts, transforms, and enters data across multiple systems every day.",
    industry: "Operations",
    painPoints: ["Hours spent on copy-paste between systems", "Human errors in data entry cost thousands", "Reporting delayed by manual aggregation", "Staff burnout from repetitive tasks"],
    currentMetrics: [
      { label: "Hours on Data Entry", value: "120/week", icon: Clock },
      { label: "Error Rate", value: "8.3%", icon: AlertTriangle },
      { label: "Systems Involved", value: "7 platforms", icon: Layers },
      { label: "Monthly Labor Cost", value: "$18,500", icon: DollarSign },
    ],
    workflowSteps: [
      { label: "Data Collection", duration: "2 hours", bottleneck: false, description: "Staff logs into multiple platforms to download reports and export CSVs" },
      { label: "Manual Extraction", duration: "3 hours", bottleneck: true, description: "Key data points are manually identified and copied from various formats" },
      { label: "Cross-Referencing", duration: "2 hours", bottleneck: true, description: "Data is compared across sources to identify discrepancies and fill gaps" },
      { label: "Data Entry", duration: "4 hours", bottleneck: true, description: "Clean data is manually entered into the central system record by record" },
      { label: "Verification", duration: "1.5 hours", bottleneck: false, description: "A second person reviews entries for accuracy and completeness" },
      { label: "Report Generation", duration: "1 hour", bottleneck: false, description: "Aggregated data is formatted into reports for stakeholders" },
    ],
    aiSolutions: [
      { title: "Intelligent Document Processing", description: "AI extracts structured data from any document format with 99%+ accuracy", icon: FileText },
      { title: "Automated Data Pipeline", description: "Connect all 7 systems with AI-powered ETL that runs continuously without human oversight", icon: Workflow },
      { title: "Anomaly Detection", description: "Real-time validation catches errors before they propagate, flagging only true exceptions for review", icon: Shield },
    ],
    improvements: [
      { label: "Processing Time", before: "120 hrs/week", after: "8 hrs/week", change: "-93%", icon: Clock },
      { label: "Error Rate", before: "8.3%", after: "0.4%", change: "-95%", icon: AlertTriangle },
      { label: "Monthly Cost", before: "$18,500", after: "$4,200", change: "-77%", icon: DollarSign },
      { label: "Report Delivery", before: "2 days", after: "Real-time", change: "Instant", icon: TrendingUp },
    ],
    summary: "AI-powered automation eliminates the tedious manual work that consumes your team's time and introduces errors. Data flows seamlessly between systems in real-time, freeing your people to focus on analysis and decision-making instead of data entry.",
  },
  {
    id: "lead-management",
    title: "Slow Lead Response",
    icon: Target,
    description: "Leads go cold because your team can't qualify and respond fast enough to capture intent.",
    industry: "Sales & Marketing",
    painPoints: ["Average lead response time exceeds 24 hours", "No prioritization means hot leads get buried", "Manual follow-up sequences are inconsistent", "Valuable leads slip through the cracks"],
    currentMetrics: [
      { label: "Avg. Response Time", value: "26 hours", icon: Clock },
      { label: "Lead-to-Meeting Rate", value: "4.2%", icon: Target },
      { label: "Monthly Leads", value: "850", icon: Users },
      { label: "Revenue Lost", value: "$45K/month", icon: DollarSign },
    ],
    workflowSteps: [
      { label: "Lead Captured", duration: "Instant", bottleneck: false, description: "Lead fills out a form, downloads content, or engages with your marketing" },
      { label: "CRM Entry", duration: "2 hours", bottleneck: false, description: "Lead data is entered or synced to CRM with basic information" },
      { label: "Manual Scoring", duration: "12 hours", bottleneck: true, description: "Sales team manually reviews and scores leads based on limited criteria" },
      { label: "Assignment", duration: "6 hours", bottleneck: true, description: "Leads are distributed to reps based on territory or round-robin" },
      { label: "Initial Outreach", duration: "8 hours", bottleneck: true, description: "Rep crafts personalized email or makes first call attempt" },
      { label: "Follow-up", duration: "Days", bottleneck: false, description: "Multi-touch follow-up sequence executed manually by each rep" },
    ],
    aiSolutions: [
      { title: "Instant Lead Scoring", description: "AI analyzes behavioral signals, firmographic data, and intent to score leads within seconds of capture", icon: Zap },
      { title: "AI Sales Agent", description: "Autonomous agent engages leads within 60 seconds via personalized, conversational outreach across channels", icon: Bot },
      { title: "Predictive Pipeline", description: "ML models predict conversion probability and recommend optimal engagement strategies per lead", icon: LineChart },
    ],
    improvements: [
      { label: "Response Time", before: "26 hours", after: "58 seconds", change: "-99%", icon: Clock },
      { label: "Lead-to-Meeting", before: "4.2%", after: "18.7%", change: "+345%", icon: Target },
      { label: "Revenue Recovered", before: "$0", after: "$45K/mo", change: "+$540K/yr", icon: DollarSign },
      { label: "Rep Productivity", before: "Baseline", after: "3.2x", change: "+220%", icon: TrendingUp },
    ],
    summary: "Speed wins deals. AI ensures every lead gets an instant, personalized response while intelligently prioritizing the highest-value opportunities. Your sales team focuses on closing instead of chasing, dramatically improving conversion rates and revenue.",
  },
  {
    id: "inventory-ops",
    title: "Inventory & Supply Chain Chaos",
    icon: Package,
    description: "Stockouts and overstock are costing you money because demand forecasting relies on gut feeling.",
    industry: "Retail & E-Commerce",
    painPoints: ["Frequent stockouts on popular items", "Excess inventory tying up capital", "Supplier delays caught too late", "Manual reorder decisions based on intuition"],
    currentMetrics: [
      { label: "Stockout Rate", value: "15%", icon: AlertTriangle },
      { label: "Excess Inventory", value: "$320K", icon: DollarSign },
      { label: "Forecast Accuracy", value: "61%", icon: BarChart3 },
      { label: "Manual Planning Hours", value: "40/week", icon: Clock },
    ],
    workflowSteps: [
      { label: "Sales Review", duration: "3 hours", bottleneck: false, description: "Team reviews last week's sales data from POS and e-commerce platforms" },
      { label: "Demand Estimation", duration: "4 hours", bottleneck: true, description: "Planners estimate future demand using spreadsheets and historical trends" },
      { label: "Stock Check", duration: "2 hours", bottleneck: false, description: "Physical and digital inventory counts are reconciled across locations" },
      { label: "Reorder Decisions", duration: "3 hours", bottleneck: true, description: "Purchase orders are manually created based on estimated needs" },
      { label: "Supplier Coordination", duration: "Variable", bottleneck: true, description: "Back-and-forth with suppliers on availability, pricing, and delivery dates" },
      { label: "Receiving & Shelving", duration: "Ongoing", bottleneck: false, description: "Incoming shipments are inspected, logged, and distributed to locations" },
    ],
    aiSolutions: [
      { title: "AI Demand Forecasting", description: "ML models analyze sales patterns, seasonality, events, and external signals to predict demand with 95%+ accuracy", icon: LineChart },
      { title: "Automated Reordering", description: "Smart system triggers purchase orders at optimal quantities and timing based on real-time inventory and forecasts", icon: RefreshCw },
      { title: "Supply Chain Intelligence", description: "AI monitors supplier performance, detects risks early, and suggests alternative sourcing to prevent disruptions", icon: Shield },
    ],
    improvements: [
      { label: "Stockout Rate", before: "15%", after: "2.1%", change: "-86%", icon: AlertTriangle },
      { label: "Excess Inventory", before: "$320K", after: "$85K", change: "-73%", icon: DollarSign },
      { label: "Forecast Accuracy", before: "61%", after: "94%", change: "+54%", icon: BarChart3 },
      { label: "Planning Time", before: "40 hrs/week", after: "5 hrs/week", change: "-88%", icon: Clock },
    ],
    summary: "AI transforms your supply chain from reactive to predictive. By accurately forecasting demand and automating replenishment, you eliminate costly stockouts and excess inventory while freeing your team from manual planning drudgery.",
  },
  {
    id: "content-creation",
    title: "Content Production Bottleneck",
    icon: FileText,
    description: "Your marketing team can't produce enough quality content to keep up with demand across channels.",
    industry: "Marketing",
    painPoints: ["Content creation takes too long", "Inconsistent brand voice across channels", "Can't personalize content at scale", "SEO optimization is an afterthought"],
    currentMetrics: [
      { label: "Content Output", value: "8 pieces/week", icon: FileText },
      { label: "Time per Article", value: "6 hours", icon: Clock },
      { label: "Channels Covered", value: "3 of 7", icon: Layers },
      { label: "Organic Traffic", value: "Declining", icon: TrendingUp },
    ],
    workflowSteps: [
      { label: "Topic Research", duration: "2 hours", bottleneck: false, description: "Writer researches trending topics, keywords, and competitor content" },
      { label: "Outline & Draft", duration: "3 hours", bottleneck: true, description: "First draft is written from scratch with limited reuse of existing content" },
      { label: "Review Cycle", duration: "1-2 days", bottleneck: true, description: "Multiple rounds of edits between writer, editor, and stakeholders" },
      { label: "Design Assets", duration: "2 hours", bottleneck: false, description: "Graphics team creates visuals, thumbnails, and social media variants" },
      { label: "Channel Adaptation", duration: "1 hour", bottleneck: true, description: "Content is manually reformatted for each distribution channel" },
      { label: "Publishing", duration: "30 min", bottleneck: false, description: "Final content is scheduled and published across platforms" },
    ],
    aiSolutions: [
      { title: "AI Content Studio", description: "Generate first drafts, outlines, and variations in minutes while maintaining your brand voice and SEO best practices", icon: BrainCircuit },
      { title: "Multi-Channel Adapter", description: "Automatically transform one piece of content into optimized versions for every channel: blog, social, email, video scripts", icon: Layers },
      { title: "Performance Optimizer", description: "AI analyzes content performance and continuously recommends improvements for engagement and conversion", icon: LineChart },
    ],
    improvements: [
      { label: "Content Output", before: "8/week", after: "35/week", change: "+338%", icon: FileText },
      { label: "Time per Piece", before: "6 hours", after: "45 minutes", change: "-88%", icon: Clock },
      { label: "Channels Covered", before: "3 of 7", after: "7 of 7", change: "100%", icon: Layers },
      { label: "Organic Traffic", before: "Declining", after: "+140%", change: "Growing", icon: TrendingUp },
    ],
    summary: "AI-augmented content production lets your marketing team produce more high-quality, on-brand content across every channel without adding headcount. Your team focuses on strategy and creativity while AI handles the heavy lifting of drafting, adapting, and optimizing.",
  },
  {
    id: "quality-assurance",
    title: "Quality Control Gaps",
    icon: Search,
    description: "Defects slip through manual inspection processes, leading to returns, rework, and reputation damage.",
    industry: "Manufacturing & Services",
    painPoints: ["Human inspectors miss subtle defects", "Quality checks slow down production", "Inconsistent standards across shifts", "Costly recalls and warranty claims"],
    currentMetrics: [
      { label: "Defect Detection", value: "82%", icon: Search },
      { label: "Inspection Time", value: "45 sec/unit", icon: Clock },
      { label: "Return Rate", value: "4.7%", icon: RefreshCw },
      { label: "Annual QA Cost", value: "$420K", icon: DollarSign },
    ],
    workflowSteps: [
      { label: "Production Output", duration: "Continuous", bottleneck: false, description: "Products come off the line or services are delivered to customers" },
      { label: "Visual Inspection", duration: "45 sec each", bottleneck: true, description: "Human inspectors visually check each item for defects and irregularities" },
      { label: "Measurement Check", duration: "30 sec each", bottleneck: false, description: "Physical measurements are taken and compared against specifications" },
      { label: "Documentation", duration: "15 sec each", bottleneck: false, description: "Results are logged on paper forms or basic digital systems" },
      { label: "Defect Routing", duration: "Variable", bottleneck: true, description: "Failed items are manually sorted for rework, scrap, or further review" },
      { label: "Trend Analysis", duration: "Weekly", bottleneck: true, description: "Quality data is compiled weekly for trend reports and root cause analysis" },
    ],
    aiSolutions: [
      { title: "Computer Vision QA", description: "AI-powered visual inspection detects defects invisible to the human eye at production line speed", icon: Search },
      { title: "Predictive Quality", description: "ML models predict quality issues before they occur by analyzing process parameters in real-time", icon: Shield },
      { title: "Automated Reporting", description: "Real-time quality dashboards with AI-driven root cause analysis and corrective action recommendations", icon: BarChart3 },
    ],
    improvements: [
      { label: "Defect Detection", before: "82%", after: "99.2%", change: "+21%", icon: Search },
      { label: "Inspection Speed", before: "45 sec/unit", after: "0.3 sec/unit", change: "-99%", icon: Clock },
      { label: "Return Rate", before: "4.7%", after: "0.8%", change: "-83%", icon: RefreshCw },
      { label: "Annual QA Cost", before: "$420K", after: "$180K", change: "-57%", icon: DollarSign },
    ],
    summary: "AI-powered quality assurance catches every defect at superhuman speed and accuracy while predicting problems before they happen. The result: near-zero defect rates, faster throughput, and dramatic cost savings on warranties and rework.",
  },
];

function PulsingDot({ color = "red", delay = 0 }: { color?: string; delay?: number }) {
  const cls: Record<string, string> = { red: "bg-red-500", green: "bg-emerald-500", purple: "bg-purple-500" };
  return (
    <span className="relative flex h-2.5 w-2.5">
      <motion.span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${cls[color] || cls.red}`} animate={{ scale: [1, 2, 1], opacity: [0.75, 0, 0.75] }} transition={{ duration: 1.5, repeat: Infinity, delay }} />
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${cls[color] || cls.red}`} />
    </span>
  );
}

function TypewriterText({ text, speed = 20, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span>{displayed}<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-primary">|</motion.span></span>;
}

function GlowOrb({ size, x, y, color, delay }: { size: number; x: string; y: string; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: `blur(${size * 0.6}px)` }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <motion.div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(250,85%,60%,0.08) 0%, transparent 70%)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function RadarSweep() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.div
        className="w-[600px] h-[600px] rounded-full"
        style={{ background: "conic-gradient(from 0deg, transparent 0%, transparent 85%, hsla(250,85%,60%,0.15) 90%, hsla(250,85%,60%,0.3) 95%, transparent 100%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function TerminalLine({ text, delay, type = "info" }: { text: string; delay: number; type?: "info" | "warn" | "success" | "error" }) {
  const colors = { info: "text-blue-400", warn: "text-amber-400", success: "text-emerald-400", error: "text-red-400" };
  const prefixes = { info: "[SCAN]", warn: "[WARN]", success: "[OK]", error: "[ERR]" };
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="font-mono text-[11px] leading-relaxed flex gap-2"
    >
      <span className={colors[type]}>{prefixes[type]}</span>
      <span className="text-muted-foreground">{text}</span>
    </motion.div>
  );
}

function CircularProgress({ progress, size = 120, strokeWidth = 6, children }: { progress: number; size?: number; strokeWidth?: number; children?: React.ReactNode }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-muted/30" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="url(#progressGradient)" strokeWidth={strokeWidth} fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(250, 85%, 60%)" />
            <stop offset="100%" stopColor="hsl(280, 80%, 65%)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function NodeGraph({ steps, activeStep }: { steps: { label: string; bottleneck: boolean }[]; activeStep: number }) {
  return (
    <div className="flex items-center justify-between gap-1 py-4 overflow-x-auto px-2">
      {steps.map((step, i) => {
        const revealed = i < activeStep;
        const current = i === activeStep - 1;
        return (
          <div key={i} className="flex items-center gap-1 flex-shrink-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: revealed ? 1 : 0.5, opacity: revealed ? 1 : 0.2 }}
              transition={{ duration: 0.4, type: "spring" }}
              className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold border-2 transition-colors ${
                step.bottleneck && revealed ? "border-red-500 bg-red-500/10 text-red-500" :
                current ? "border-primary bg-primary/10 text-primary" :
                revealed ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" :
                "border-muted bg-muted/50 text-muted-foreground"
              }`}
            >
              {revealed ? (step.bottleneck ? <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />) : i + 1}
              {current && (
                <motion.div className="absolute inset-0 rounded-full border-2 border-primary" animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
              )}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                className={`w-4 sm:w-8 h-0.5 rounded-full ${revealed ? (step.bottleneck ? "bg-red-500/40" : "bg-emerald-500/40") : "bg-muted"}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: revealed ? 1 : 0.3 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ImpactGauge({ label, change, icon: Icon, delay }: { label: string; change: string; icon: LucideIcon; delay: number }) {
  const isPositive = change.includes("+") || change.includes("Instant") || change.includes("Growing");
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 120 }}
      className="text-center"
    >
      <motion.div
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl mx-auto mb-3 flex items-center justify-center relative overflow-hidden ${isPositive ? "bg-emerald-500/10" : "bg-emerald-500/10"}`}
        whileHover={{ scale: 1.05, rotate: 2 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
        />
        <div className="relative">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 mb-1" />
          <div className="text-sm sm:text-lg font-bold text-emerald-500">{change}</div>
        </div>
      </motion.div>
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
}

export default function Simulator() {
  usePageTitle("AI Problem Solving Simulator");
  const [phase, setPhase] = useState<"discovery" | "scanning" | "transformation" | "report">("discovery");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [customProblem, setCustomProblem] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState(0);
  const [transformStep, setTransformStep] = useState(0);
  const [showImprovements, setShowImprovements] = useState(false);
  const [terminalLines, setTerminalLines] = useState<{ text: string; type: "info" | "warn" | "success" | "error" }[]>([]);
  const scanTimerRef = useRef<number | null>(null);
  const transformTimerRef = useRef<number | null>(null);
  const transformTimeoutRef = useRef<number | null>(null);
  const improvementTimeoutRef = useRef<number | null>(null);
  const terminalTimerRef = useRef<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const startScan = useCallback((scenario: Scenario) => {
    setSelectedScenario(scenario);
    setPhase("scanning");
    setScanProgress(0);
    setScanStep(0);
    setTerminalLines([]);
    scrollToTop();

    const termLines = [
      { text: `Initializing environment scan for ${scenario.industry}...`, type: "info" as const },
      { text: `Connecting to workflow analysis engine...`, type: "info" as const },
      { text: `Mapping ${scenario.workflowSteps.length} workflow stages...`, type: "info" as const },
      ...scenario.workflowSteps.map((s, i) => ({
        text: `Stage ${i + 1}: ${s.label} (${s.duration})${s.bottleneck ? " -- BOTTLENECK DETECTED" : " -- OK"}`,
        type: (s.bottleneck ? "warn" : "success") as "info" | "warn" | "success" | "error",
      })),
      { text: `Identified ${scenario.painPoints.length} critical pain points`, type: "error" as const },
      { text: `Analyzing ${scenario.currentMetrics.length} performance metrics...`, type: "info" as const },
      { text: `Environment scan complete. Preparing AI recommendations...`, type: "success" as const },
    ];
    let tIdx = 0;
    terminalTimerRef.current = window.setInterval(() => {
      if (tIdx < termLines.length) {
        const line = termLines[tIdx];
        tIdx++;
        if (line) {
          setTerminalLines(prev => [...prev, line]);
          if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      } else {
        if (terminalTimerRef.current) { clearInterval(terminalTimerRef.current); terminalTimerRef.current = null; }
      }
    }, 350);

    let progress = 0;
    let step = 0;
    const stepInterval = 100 / scenario.workflowSteps.length;

    scanTimerRef.current = window.setInterval(() => {
      progress += 0.6;
      if (progress >= (step + 1) * stepInterval && step < scenario.workflowSteps.length) {
        step++;
        setScanStep(step);
      }
      setScanProgress(Math.min(progress, 100));
      if (progress >= 100) {
        if (scanTimerRef.current) clearInterval(scanTimerRef.current);
        transformTimeoutRef.current = window.setTimeout(() => {
          setPhase("transformation");
          setTransformStep(0);
          setShowImprovements(false);
          scrollToTop();
          let tStep = 0;
          transformTimerRef.current = window.setInterval(() => {
            tStep++;
            setTransformStep(tStep);
            if (tStep >= scenario.aiSolutions.length + 1) {
              if (transformTimerRef.current) clearInterval(transformTimerRef.current);
              improvementTimeoutRef.current = window.setTimeout(() => setShowImprovements(true), 800);
            }
          }, 1500);
        }, 1000);
      }
    }, 50);
  }, [scrollToTop]);

  const goToReport = useCallback(() => {
    setPhase("report");
    scrollToTop();
  }, [scrollToTop]);

  const clearAllTimers = useCallback(() => {
    [scanTimerRef, transformTimerRef, terminalTimerRef].forEach(r => { if (r.current) { clearInterval(r.current); r.current = null; } });
    [transformTimeoutRef, improvementTimeoutRef].forEach(r => { if (r.current) { clearTimeout(r.current); r.current = null; } });
  }, []);

  const reset = useCallback(() => {
    clearAllTimers();
    setPhase("discovery");
    setSelectedScenario(null);
    setCustomProblem("");
    setScanProgress(0);
    setScanStep(0);
    setTransformStep(0);
    setShowImprovements(false);
    setTerminalLines([]);
    scrollToTop();
  }, [scrollToTop, clearAllTimers]);

  useEffect(() => () => clearAllTimers(), [clearAllTimers]);

  const phaseLabels = ["Discovery", "Environment Scan", "AI Transformation", "Impact Report"];
  const phaseKeys: typeof phase[] = ["discovery", "scanning", "transformation", "report"];
  const currentPhaseIndex = phaseKeys.indexOf(phase);

  const matchScenario = useCallback((text: string): Scenario => {
    const lower = text.toLowerCase();
    const keywordMap: [string[], string][] = [
      [["support", "ticket", "customer service", "helpdesk", "chat", "response time"], "customer-support"],
      [["data", "entry", "spreadsheet", "manual", "extract", "processing", "csv", "report"], "data-processing"],
      [["lead", "sales", "crm", "prospect", "follow-up", "conversion", "pipeline"], "lead-management"],
      [["inventory", "stock", "supply", "warehouse", "shipping", "order", "forecast"], "inventory-ops"],
      [["content", "blog", "marketing", "social media", "writing", "seo", "copy"], "content-creation"],
      [["quality", "defect", "inspection", "manufacturing", "qa", "testing", "compliance"], "quality-assurance"],
    ];
    let best = scenarios[0];
    let bestScore = 0;
    for (const [keywords, id] of keywordMap) {
      const score = keywords.filter(k => lower.includes(k)).length;
      if (score > bestScore) { bestScore = score; best = scenarios.find(s => s.id === id) || scenarios[0]; }
    }
    return best;
  }, []);

  return (
    <div ref={topRef} className="min-h-screen relative">
      <section className="relative pt-28 pb-16 overflow-hidden">
        <GridBackground />
        <GlowOrb size={400} x="10%" y="10%" color="hsla(250,85%,60%,0.06)" delay={0} />
        <GlowOrb size={300} x="70%" y="20%" color="hsla(280,80%,60%,0.05)" delay={2} />
        <GlowOrb size={250} x="50%" y="60%" color="hsla(250,85%,60%,0.04)" delay={1} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6"
              animate={{ borderColor: ["hsla(250,85%,60%,0.2)", "hsla(250,85%,60%,0.5)", "hsla(250,85%,60%,0.2)"] }}
              transition={{ duration: 3, repeat: Infinity }}
              data-testid="badge-simulator"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <Cpu className="w-4 h-4" />
              </motion.div>
              AI Problem Solving Simulator
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.1]" data-testid="text-simulator-title">
              See How AI Transforms{" "}
              <span className="relative">
                <span className="gradient-text">Your Business</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-purple-400 to-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed" data-testid="text-simulator-subtitle">
              Select a challenge, watch us scan your environment in real-time, and witness the transformative power of AI on your operations.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center mt-12 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            data-testid="progress-phases"
          >
            {phaseLabels.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-500 relative ${
                      i <= currentPhaseIndex
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-muted/80 text-muted-foreground"
                    }`}
                    animate={i === currentPhaseIndex ? { boxShadow: ["0 0 0 0 hsla(250,85%,60%,0)", "0 0 0 8px hsla(250,85%,60%,0.15)", "0 0 0 0 hsla(250,85%,60%,0)"] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {i < currentPhaseIndex ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </motion.div>
                  <span className={`text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap ${i <= currentPhaseIndex ? "text-primary" : "text-muted-foreground/60"}`}>
                    {label}
                  </span>
                </div>
                {i < phaseLabels.length - 1 && (
                  <div className="relative w-8 sm:w-16 lg:w-24 h-1 mx-1 sm:mx-3 -mt-6 rounded-full overflow-hidden bg-muted/50">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-purple-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: i < currentPhaseIndex ? "100%" : "0%" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 relative z-10">
        <AnimatePresence mode="wait">
          {phase === "discovery" && (
            <motion.div key="discovery" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30, filter: "blur(8px)" }} transition={{ duration: 0.5 }}>
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3" data-testid="text-discovery-heading">
                  What challenge is holding your business back?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">Choose a scenario to begin your AI transformation simulation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {scenarios.map((scenario, idx) => (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  >
                    <Card
                      className={`relative p-5 cursor-pointer transition-all duration-300 h-full group overflow-hidden ${
                        selectedScenario?.id === scenario.id
                          ? "border-primary shadow-xl shadow-primary/15 bg-primary/5 ring-1 ring-primary/20"
                          : "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                      }`}
                      onClick={() => setSelectedScenario(scenario)}
                      data-testid={`card-scenario-${scenario.id}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <div className="flex items-start gap-3.5 mb-3">
                          <motion.div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                              selectedScenario?.id === scenario.id ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-primary/10 text-primary group-hover:bg-primary/15"
                            }`}
                            animate={selectedScenario?.id === scenario.id ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <scenario.icon className="w-5 h-5" />
                          </motion.div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-sm mb-0.5">{scenario.title}</h3>
                            <Badge variant="secondary" className="text-[10px] font-normal">{scenario.industry}</Badge>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{scenario.description}</p>
                      </div>
                      {selectedScenario?.id === scenario.id && (
                        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} className="absolute top-3 right-3">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                          </div>
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-xl mx-auto mb-10">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-xl blur-xl opacity-50" />
                  <Card className="relative p-6 bg-card/80 backdrop-blur-sm">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                      <BrainCircuit className="w-4 h-4 text-primary" />
                      Or describe your unique challenge
                    </h3>
                    <Textarea
                      placeholder="e.g., Our sales team spends 3 hours daily updating CRM records manually, and we're losing deals because follow-ups fall through the cracks..."
                      value={customProblem}
                      onChange={(e) => setCustomProblem(e.target.value)}
                      className="min-h-[80px] resize-none mb-3 bg-background/50"
                      data-testid="input-custom-problem"
                    />
                    <p className="text-[11px] text-muted-foreground/70">Custom problems are intelligently matched to our closest scenario for the demo experience.</p>
                  </Card>
                </div>
              </motion.div>

              <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    disabled={!selectedScenario && !customProblem.trim()}
                    onClick={() => {
                      const scenario = selectedScenario || matchScenario(customProblem);
                      startScan(scenario);
                    }}
                    className="gap-3 px-10 py-6 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                    data-testid="button-start-simulation"
                  >
                    <Play className="w-5 h-5" />
                    Launch Simulation
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {phase === "scanning" && selectedScenario && (
            <motion.div key="scanning" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30, filter: "blur(8px)" }} transition={{ duration: 0.5 }}>
              <div className="text-center mb-8">
                <motion.div className="inline-flex items-center gap-2 text-primary mb-3" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <Activity className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Live Analysis</span>
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-scanning-heading">
                  Scanning Your Environment
                </h2>
                <p className="text-muted-foreground">{selectedScenario.title} - {selectedScenario.industry}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="p-5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-primary" />
                        Workflow Mapping
                      </h3>
                      <span className="font-mono text-xs text-primary font-semibold">{Math.round(scanProgress)}%</span>
                    </div>

                    <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
                      <motion.div className="h-full rounded-full relative" style={{ width: `${scanProgress}%`, background: "linear-gradient(90deg, hsl(250,85%,60%), hsl(280,80%,65%), hsl(250,85%,60%))", backgroundSize: "200% 100%" }} animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }} transition={{ duration: 2, repeat: Infinity }} />
                    </div>

                    <NodeGraph steps={selectedScenario.workflowSteps.map(s => ({ label: s.label, bottleneck: s.bottleneck }))} activeStep={scanStep} />

                    <div className="space-y-2 mt-4">
                      {selectedScenario.workflowSteps.map((step, i) => {
                        const revealed = i < scanStep;
                        const current = i === scanStep - 1;
                        if (!revealed) return null;
                        return (
                          <motion.div
                            key={step.label}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.4 }}
                            className={`p-3 rounded-lg border transition-all ${
                              step.bottleneck ? "border-red-500/20 bg-red-500/5" :
                              current ? "border-primary/20 bg-primary/5" : "border-transparent bg-muted/30"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-xs">{step.label}</span>
                              <Badge variant={step.bottleneck ? "destructive" : "secondary"} className="text-[9px] px-1.5 py-0">{step.duration}</Badge>
                              {step.bottleneck && (
                                <span className="flex items-center gap-1 text-[9px] text-red-500 font-medium">
                                  <AlertTriangle className="w-2.5 h-2.5" /> Bottleneck
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground">{step.description}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </Card>

                  <AnimatePresence>
                    {scanProgress > 50 && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Card className="p-5 border-red-500/15 bg-gradient-to-br from-red-500/5 to-transparent">
                          <h4 className="font-semibold text-sm flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            Critical Pain Points Identified
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {selectedScenario.painPoints.map((point, i) => (
                              <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="flex items-start gap-2">
                                <PulsingDot color="red" delay={i * 0.3} />
                                <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
                              </motion.div>
                            ))}
                          </div>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  <Card className="p-5 relative overflow-hidden" data-testid="card-scan-metrics">
                    <RadarSweep />
                    <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 relative z-10">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      Current Metrics
                    </h3>
                    <div className="space-y-3 relative z-10">
                      {selectedScenario.currentMetrics.map((metric, i) => (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: scanProgress > (i + 1) * 15 ? 1 : 0.15, x: scanProgress > (i + 1) * 15 ? 0 : 10 }}
                          transition={{ duration: 0.5 }}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-background/50"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <metric.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold">{metric.value}</div>
                            <div className="text-[10px] text-muted-foreground">{metric.label}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4 bg-zinc-950 dark:bg-zinc-950 border-zinc-800 overflow-hidden" data-testid="card-terminal">
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[10px] text-zinc-500 ml-2 font-mono">scan_output.log</span>
                    </div>
                    <div ref={terminalRef} className="h-48 overflow-y-auto space-y-1 scrollbar-thin">
                      {terminalLines.map((line, i) => line ? (
                        <TerminalLine key={i} text={line.text} type={line.type} delay={0} />
                      ) : null)}
                      {scanProgress < 100 && (
                        <motion.div className="flex items-center gap-1 mt-1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}>
                          <span className="text-primary font-mono text-[11px]">$</span>
                          <span className="w-2 h-3 bg-primary/60 animate-pulse" />
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {phase === "transformation" && selectedScenario && (
            <motion.div key="transformation" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30, filter: "blur(8px)" }} transition={{ duration: 0.5 }}>
              <div className="text-center mb-10">
                <motion.div className="inline-flex items-center gap-2 text-emerald-500 mb-3" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Deploying Solutions</span>
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-transformation-heading">
                  AI Transformation In Progress
                </h2>
                <p className="text-muted-foreground">Deploying intelligent automation to eliminate bottlenecks...</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-5 mb-12">
                {selectedScenario.aiSolutions.map((solution, i) => {
                  const deployed = transformStep > i + 1;
                  const deploying = transformStep === i + 1;
                  const waiting = transformStep <= i;
                  return (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: waiting ? 0.25 : 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <Card className={`p-6 transition-all duration-700 relative overflow-hidden ${
                        deploying ? "border-primary/50 shadow-2xl shadow-primary/15" :
                        deployed ? "border-emerald-500/30" : ""
                      }`}>
                        {deploying && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                        <div className="relative flex items-start gap-5">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-700 ${
                            deployed ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25" :
                            deploying ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {deployed ? (
                              <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200 }}>
                                <CheckCircle2 className="w-7 h-7" />
                              </motion.div>
                            ) : deploying ? (
                              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                <Cog className="w-7 h-7" />
                              </motion.div>
                            ) : (
                              <solution.icon className="w-7 h-7" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <h3 className="font-semibold text-base">{solution.title}</h3>
                              {deploying && (
                                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
                                  <Badge className="bg-primary/10 text-primary text-[10px] gap-1">
                                    <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                                    Deploying
                                  </Badge>
                                </motion.div>
                              )}
                              {deployed && (
                                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
                                  <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px] gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Live
                                  </Badge>
                                </motion.div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{solution.description}</p>
                            {deploying && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                                <motion.div className="h-full bg-primary rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {showImprovements && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 150, damping: 12 }}
                        className="relative inline-block mb-4"
                      >
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                          <Zap className="w-10 h-10 text-white" />
                        </div>
                        <motion.div
                          className="absolute -inset-3 rounded-3xl border-2 border-emerald-500/30"
                          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                      <h3 className="text-2xl font-bold" data-testid="text-improvements-heading">Transformation Complete</h3>
                      <p className="text-muted-foreground mt-1">All AI solutions deployed successfully. Here are your projected improvements.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10">
                      {selectedScenario.improvements.map((imp, i) => (
                        <ImpactGauge key={imp.label} label={imp.label} change={imp.change} icon={imp.icon} delay={i * 0.2} />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                      {selectedScenario.improvements.map((imp, i) => (
                        <motion.div key={imp.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }}>
                          <Card className="p-4 text-center border-emerald-500/10">
                            <div className="text-[11px] text-muted-foreground mb-2">{imp.label}</div>
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-xs line-through text-muted-foreground/60">{imp.before}</span>
                              <ArrowRight className="w-3 h-3 text-emerald-500" />
                              <span className="text-base font-bold text-emerald-500">{imp.after}</span>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div className="flex justify-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button size="lg" onClick={goToReport} className="gap-3 px-10 py-6 text-base shadow-lg shadow-primary/20" data-testid="button-view-report">
                          View Full Impact Report
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {phase === "report" && selectedScenario && (
            <motion.div key="report" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }}>
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 12 }}
                  className="relative inline-block mb-5"
                >
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary via-purple-500 to-primary flex items-center justify-center shadow-2xl shadow-primary/30">
                    <BarChart3 className="w-12 h-12 text-white" />
                  </div>
                  <motion.div
                    className="absolute -inset-2 rounded-[20px] border-2 border-primary/20"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="text-report-heading">AI Impact Report</h2>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Badge variant="outline" className="font-normal">{selectedScenario.title}</Badge>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <Badge variant="outline" className="font-normal">{selectedScenario.industry}</Badge>
                </div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6 sm:p-8 mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
                  <div className="relative">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <BrainCircuit className="w-5 h-5 text-primary" />
                      Executive Summary
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-[15px]" data-testid="text-report-summary">
                      <TypewriterText text={selectedScenario.summary} speed={15} />
                    </p>
                  </div>
                </Card>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {selectedScenario.improvements.map((imp, i) => (
                  <motion.div key={imp.label} initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 120 }}>
                    <Card className="p-5 text-center relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <imp.icon className="w-7 h-7 mx-auto mb-3 text-primary" />
                        <div className="text-xs text-muted-foreground mb-3 font-medium">{imp.label}</div>
                        <div className="space-y-1.5 mb-3">
                          <div className="text-xs text-muted-foreground/60">
                            Before: <span className="font-medium text-foreground/70">{imp.before}</span>
                          </div>
                          <div className="text-emerald-500">
                            After: <span className="text-xl font-bold">{imp.after}</span>
                          </div>
                        </div>
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">{imp.change}</Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <Card className="p-6 sm:p-8 mb-8">
                  <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Recommended AI Solutions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {selectedScenario.aiSolutions.map((solution, i) => (
                      <motion.div key={solution.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.15 }} whileHover={{ y: -3 }}>
                        <div className="p-5 rounded-xl bg-muted/50 h-full border border-transparent hover:border-primary/20 transition-colors">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-purple-500/10 flex items-center justify-center mb-4">
                            <solution.icon className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="font-semibold text-sm mb-2">{solution.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{solution.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                <Card className="p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-purple-500/5 to-primary/8" />
                    <GlowOrb size={200} x="5%" y="20%" color="hsla(250,85%,60%,0.06)" delay={0} />
                    <GlowOrb size={150} x="80%" y="30%" color="hsla(280,80%,60%,0.05)" delay={1.5} />
                  </div>
                  <div className="relative text-center">
                    <h3 className="text-2xl font-bold mb-3">Ready to Transform Your Business?</h3>
                    <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                      This simulation is just the beginning. Let our team build a custom AI solution tailored to your exact needs and environment.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link href="/get-started">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button size="lg" className="gap-2 px-8 py-6 text-base shadow-lg shadow-primary/20" data-testid="button-get-started">
                            <Sparkles className="w-5 h-5" />
                            Start Your Project
                          </Button>
                        </motion.div>
                      </Link>
                      <Link href="/contact">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button size="lg" variant="outline" className="gap-2 px-8 py-6 text-base" data-testid="button-contact">
                            Talk to Our Team
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div className="flex justify-center mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                <Button variant="ghost" onClick={reset} className="gap-2 text-muted-foreground hover:text-foreground" data-testid="button-try-another">
                  <RefreshCw className="w-4 h-4" />
                  Try Another Scenario
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
