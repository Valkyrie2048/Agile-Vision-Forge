import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
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
  ChevronRight,
  Bot,
  Workflow,
  LineChart,
  Package,
  Headphones,
  FileText,
  Search,
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

function AnimatedCounter({ value, suffix = "", prefix = "", duration = 1.5 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const controls = animate(motionVal, value, { duration, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [value]);

  return <span>{display}</span>;
}

function PulsingDot({ color = "red", delay = 0 }: { color?: string; delay?: number }) {
  const colors: Record<string, string> = {
    red: "bg-red-500",
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    purple: "bg-purple-500",
  };
  return (
    <span className="relative flex h-2.5 w-2.5">
      <motion.span
        className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${colors[color] || colors.red}`}
        animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
      />
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${colors[color] || colors.red}`} />
    </span>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 z-10"
      initial={{ top: 0 }}
      animate={{ top: "100%" }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
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
  const scanTimerRef = useRef<number | null>(null);
  const transformTimerRef = useRef<number | null>(null);
  const transformTimeoutRef = useRef<number | null>(null);
  const improvementTimeoutRef = useRef<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const startScan = useCallback((scenario: Scenario) => {
    setSelectedScenario(scenario);
    setPhase("scanning");
    setScanProgress(0);
    setScanStep(0);
    scrollToTop();

    let progress = 0;
    let step = 0;
    const stepInterval = 100 / scenario.workflowSteps.length;

    scanTimerRef.current = window.setInterval(() => {
      progress += 0.8;
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
            if (tStep >= (scenario.aiSolutions.length + 1)) {
              if (transformTimerRef.current) clearInterval(transformTimerRef.current);
              improvementTimeoutRef.current = window.setTimeout(() => setShowImprovements(true), 600);
            }
          }, 1200);
        }, 800);
      }
    }, 40);
  }, [scrollToTop]);

  const goToReport = useCallback(() => {
    setPhase("report");
    scrollToTop();
  }, [scrollToTop]);

  const clearAllTimers = useCallback(() => {
    if (scanTimerRef.current) { clearInterval(scanTimerRef.current); scanTimerRef.current = null; }
    if (transformTimerRef.current) { clearInterval(transformTimerRef.current); transformTimerRef.current = null; }
    if (transformTimeoutRef.current) { clearTimeout(transformTimeoutRef.current); transformTimeoutRef.current = null; }
    if (improvementTimeoutRef.current) { clearTimeout(improvementTimeoutRef.current); improvementTimeoutRef.current = null; }
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
    scrollToTop();
  }, [scrollToTop, clearAllTimers]);

  useEffect(() => {
    return () => { clearAllTimers(); };
  }, [clearAllTimers]);

  const phaseLabels = ["Problem Discovery", "Environment Scan", "AI Transformation", "Impact Report"];
  const phaseKeys: typeof phase[] = ["discovery", "scanning", "transformation", "report"];
  const currentPhaseIndex = phaseKeys.indexOf(phase);

  return (
    <div ref={topRef} className="min-h-screen">
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary" data-testid="badge-simulator">
              <Sparkles className="w-3 h-3 mr-1" /> AI Problem Solving Simulator
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4" data-testid="text-simulator-title">
              See How AI Transforms{" "}
              <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                Your Business
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-simulator-subtitle">
              Describe your challenge and watch as we model your environment, identify bottlenecks, and simulate how AI can dramatically improve your operations.
            </p>
          </motion.div>

          <div className="flex items-center justify-center gap-0 mt-10 mb-2" data-testid="progress-phases">
            {phaseLabels.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500 ${
                      i <= currentPhaseIndex
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < currentPhaseIndex ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-medium transition-colors ${i <= currentPhaseIndex ? "text-primary" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
                {i < phaseLabels.length - 1 && (
                  <div className={`w-8 sm:w-16 lg:w-24 h-0.5 mx-1 sm:mx-2 rounded-full transition-colors duration-500 -mt-5 ${i < currentPhaseIndex ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <AnimatePresence mode="wait">
          {phase === "discovery" && (
            <motion.div
              key="discovery"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2" data-testid="text-discovery-heading">What challenge is holding your business back?</h2>
                <p className="text-muted-foreground">Select a common scenario below, or describe your unique situation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {scenarios.map((scenario) => (
                  <motion.div key={scenario.id} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                    <Card
                      className={`relative p-5 cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${
                        selectedScenario?.id === scenario.id ? "border-primary shadow-lg shadow-primary/10 bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedScenario(scenario)}
                      data-testid={`card-scenario-${scenario.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          selectedScenario?.id === scenario.id ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                        }`}>
                          <scenario.icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm mb-1">{scenario.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{scenario.description}</p>
                          <Badge variant="secondary" className="mt-2 text-[10px]">{scenario.industry}</Badge>
                        </div>
                      </div>
                      {selectedScenario?.id === scenario.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-lg blur-xl" />
                  <Card className="relative p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4 text-primary" />
                      Or describe your unique challenge
                    </h3>
                    <Textarea
                      placeholder="e.g., Our sales team spends 3 hours daily updating CRM records manually, and we're losing deals because follow-ups fall through the cracks..."
                      value={customProblem}
                      onChange={(e) => setCustomProblem(e.target.value)}
                      className="min-h-[100px] resize-none mb-4"
                      data-testid="input-custom-problem"
                    />
                    <p className="text-xs text-muted-foreground mb-4">
                      For the demo, selecting a scenario above gives the richest simulation experience. Custom problems will be matched to the closest scenario.
                    </p>
                  </Card>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  size="lg"
                  disabled={!selectedScenario && !customProblem.trim()}
                  onClick={() => {
                    if (selectedScenario) {
                      startScan(selectedScenario);
                    } else if (customProblem.trim()) {
                      const lower = customProblem.toLowerCase();
                      const keywordMap: [string[], string][] = [
                        [["support", "ticket", "customer service", "helpdesk", "chat", "response time"], "customer-support"],
                        [["data", "entry", "spreadsheet", "manual", "extract", "processing", "csv", "report"], "data-processing"],
                        [["lead", "sales", "crm", "prospect", "follow-up", "conversion", "pipeline"], "lead-management"],
                        [["inventory", "stock", "supply", "warehouse", "shipping", "order", "forecast"], "inventory-ops"],
                        [["content", "blog", "marketing", "social media", "writing", "seo", "copy"], "content-creation"],
                        [["quality", "defect", "inspection", "manufacturing", "qa", "testing", "compliance"], "quality-assurance"],
                      ];
                      let bestMatch = scenarios[0];
                      let bestScore = 0;
                      for (const [keywords, id] of keywordMap) {
                        const score = keywords.filter(k => lower.includes(k)).length;
                        if (score > bestScore) {
                          bestScore = score;
                          bestMatch = scenarios.find(s => s.id === id) || scenarios[0];
                        }
                      }
                      startScan(bestMatch);
                    }
                  }}
                  className="gap-2 px-8"
                  data-testid="button-start-simulation"
                >
                  <Play className="w-4 h-4" />
                  Launch Simulation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {phase === "scanning" && selectedScenario && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2" data-testid="text-scanning-heading">
                  Analyzing Your Environment
                </h2>
                <p className="text-muted-foreground">Mapping your current workflow and identifying bottlenecks...</p>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <PulsingDot color="purple" />
                    Scanning in progress...
                  </span>
                  <span className="font-mono text-primary font-semibold">{Math.round(scanProgress)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-purple-400 to-primary rounded-full"
                    style={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {selectedScenario.currentMetrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: scanProgress > (i + 1) * 15 ? 1 : 0.3, scale: scanProgress > (i + 1) * 15 ? 1 : 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="p-4 text-center relative overflow-hidden">
                      {scanProgress <= (i + 1) * 15 && <ScanLine />}
                      <metric.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                      <div className="text-lg font-bold">{metric.value}</div>
                      <div className="text-[11px] text-muted-foreground">{metric.label}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="p-6 relative overflow-hidden" data-testid="card-workflow-scan">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-primary" />
                  Current Workflow Analysis
                </h3>
                <div className="space-y-3">
                  {selectedScenario.workflowSteps.map((step, i) => {
                    const isRevealed = i < scanStep;
                    const isActive = i === scanStep - 1;
                    return (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isRevealed ? 1 : 0.2, x: isRevealed ? 0 : -10 }}
                        transition={{ duration: 0.4 }}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                          isActive ? "bg-primary/5 border border-primary/20" : isRevealed ? "bg-muted/50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            step.bottleneck && isRevealed ? "bg-red-500/10 text-red-500 ring-1 ring-red-500/30" : isRevealed ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}>
                            {i + 1}
                          </div>
                          {step.bottleneck && isRevealed && <PulsingDot color="red" delay={i * 0.3} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-medium text-sm">{step.label}</span>
                            <Badge variant={step.bottleneck ? "destructive" : "secondary"} className="text-[9px] px-1.5 py-0">
                              {step.duration}
                            </Badge>
                            {step.bottleneck && isRevealed && (
                              <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-red-500/30 text-red-500">
                                <AlertTriangle className="w-2.5 h-2.5 mr-0.5" /> Bottleneck
                              </Badge>
                            )}
                          </div>
                          {isRevealed && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-muted-foreground"
                            >
                              {step.description}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>

              {scanProgress > 60 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className="p-5 border-red-500/20 bg-red-500/5">
                    <h4 className="font-semibold text-sm flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      Pain Points Detected
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedScenario.painPoints.map((point, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <PulsingDot color="red" delay={i * 0.4} />
                          <span className="text-muted-foreground text-xs">{point}</span>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === "transformation" && selectedScenario && (
            <motion.div
              key="transformation"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2" data-testid="text-transformation-heading">
                  Applying AI Solutions
                </h2>
                <p className="text-muted-foreground">Watch as intelligent automation transforms your workflow...</p>
              </div>

              <div className="space-y-4 mb-10">
                {selectedScenario.aiSolutions.map((solution, i) => {
                  const isActive = transformStep > i;
                  const isCurrent = transformStep === i + 1;
                  return (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        x: isActive ? 0 : -15,
                      }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                      <Card className={`p-5 transition-all duration-500 ${isCurrent ? "border-primary shadow-lg shadow-primary/10 bg-primary/5" : isActive ? "border-emerald-500/30 bg-emerald-500/5" : ""}`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                            isActive ? "bg-emerald-500 text-white" : isCurrent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            {isActive && !isCurrent ? (
                              <CheckCircle2 className="w-6 h-6" />
                            ) : isCurrent ? (
                              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                <Cog className="w-6 h-6" />
                              </motion.div>
                            ) : (
                              <solution.icon className="w-6 h-6" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{solution.title}</h3>
                              {isCurrent && (
                                <Badge className="bg-primary/10 text-primary text-[10px]">
                                  <PulsingDot color="purple" /> <span className="ml-1">Deploying...</span>
                                </Badge>
                              )}
                              {isActive && !isCurrent && (
                                <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px]">
                                  <CheckCircle2 className="w-3 h-3 mr-0.5" /> Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{solution.description}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {showImprovements && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-center mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                          <Zap className="w-8 h-8 text-emerald-500" />
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-bold" data-testid="text-improvements-heading">Transformation Complete</h3>
                      <p className="text-muted-foreground text-sm mt-1">Here's how your metrics improve with AI</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {selectedScenario.improvements.map((imp, i) => (
                        <motion.div
                          key={imp.label}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: i * 0.15, duration: 0.5 }}
                        >
                          <Card className="p-4 text-center border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 to-transparent">
                            <imp.icon className="w-5 h-5 mx-auto mb-2 text-emerald-500" />
                            <div className="text-[11px] text-muted-foreground mb-1">{imp.label}</div>
                            <div className="flex items-center justify-center gap-1.5 mb-2">
                              <span className="text-xs line-through text-muted-foreground">{imp.before}</span>
                              <ArrowRight className="w-3 h-3 text-emerald-500" />
                              <span className="text-sm font-bold text-emerald-500">{imp.after}</span>
                            </div>
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                              {imp.change}
                            </Badge>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <Button size="lg" onClick={goToReport} className="gap-2 px-8" data-testid="button-view-report">
                        View Full Impact Report
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {phase === "report" && selectedScenario && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary/20"
                >
                  <BarChart3 className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-report-heading">
                  AI Impact Report
                </h2>
                <p className="text-muted-foreground">
                  {selectedScenario.title} — {selectedScenario.industry}
                </p>
              </div>

              <Card className="p-6 sm:p-8 mb-8 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-primary" />
                  Executive Summary
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-report-summary">
                  {selectedScenario.summary}
                </p>
              </Card>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {selectedScenario.improvements.map((imp, i) => (
                  <motion.div
                    key={imp.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-5 text-center">
                      <imp.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-xs text-muted-foreground mb-2">{imp.label}</div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">
                          Before: <span className="font-medium text-foreground">{imp.before}</span>
                        </div>
                        <div className="text-xs text-emerald-500 font-bold">
                          After: <span className="text-lg">{imp.after}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                          {imp.change}
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="p-6 mb-8">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Recommended AI Solutions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedScenario.aiSolutions.map((solution, i) => (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div className="p-4 rounded-lg bg-muted/50 h-full">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                          <solution.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{solution.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{solution.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 sm:p-8 border-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5" />
                <div className="relative text-center">
                  <h3 className="text-xl font-bold mb-2">Ready to Transform Your Business?</h3>
                  <p className="text-muted-foreground text-sm mb-6 max-w-lg mx-auto">
                    This simulation is just the beginning. Let our team build a custom AI solution tailored to your exact needs and environment.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/get-started">
                      <Button size="lg" className="gap-2 px-8" data-testid="button-get-started">
                        <Sparkles className="w-4 h-4" />
                        Start Your Project
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="gap-2 px-8" data-testid="button-contact">
                        Talk to Our Team
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center mt-8">
                <Button variant="ghost" onClick={reset} className="gap-2 text-muted-foreground" data-testid="button-try-another">
                  <RefreshCw className="w-4 h-4" />
                  Try Another Scenario
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
