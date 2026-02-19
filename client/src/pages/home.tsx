import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView, useMotionValue, useTransform, useScroll, useSpring, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Quote,
  Rocket,
  Search,
  Lightbulb,
  Code2,
  Zap,
  Smartphone,
  Globe,
  MessageSquare,
  Cog,
  BarChart3,
  BrainCircuit,
  ShoppingCart,
  Gamepad2,
  GraduationCap,
  X,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { DemoPreview } from "@/components/demo-previews";
import capAgenticAi from "../assets/images/cap-agentic-ai.png";
import capChatbots from "../assets/images/cap-chatbots.png";
import capWebapps from "../assets/images/cap-webapps.png";
import capMobile from "../assets/images/cap-mobile.png";
import capAnalytics from "../assets/images/cap-analytics.png";
import capAutomation from "../assets/images/cap-automation.png";

function TextReveal({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) {
  const words = children.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

function BlurReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const reset = () => {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    if (value >= 100) return Math.round(latest);
    return Math.round(latest * 10) / 10;
  });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration });
    }
  }, [isInView, motionValue, value, duration]);

  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      setDisplay(String(v));
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(250 85% 60%), hsl(280 80% 55%))",
      }}
    />
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.15); }
          66% { transform: translate(25px, -40px) scale(0.85); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.2); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-30px, -20px) scale(0.95); }
          75% { transform: translate(20px, 40px) scale(1.05); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
      `}</style>

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(250 85% 15%) 0%, hsl(260 60% 10%) 30%, hsl(270 50% 8%) 60%, hsl(240 40% 6%) 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: "grain 8s steps(10) infinite",
        }}
      />

      <div
        className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full opacity-40 blur-[100px] pointer-events-none"
        style={{ background: "hsl(250 85% 60%)", animation: "float1 20s ease-in-out infinite" }}
      />
      <div
        className="absolute top-[60%] right-[10%] w-[350px] h-[350px] rounded-full opacity-30 blur-[100px] pointer-events-none"
        style={{ background: "hsl(280 80% 55%)", animation: "float2 25s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[20%] left-[40%] w-[300px] h-[300px] rounded-full opacity-25 blur-[120px] pointer-events-none"
        style={{ background: "hsl(220 90% 55%)", animation: "float3 18s ease-in-out infinite" }}
      />
      <div
        className="absolute top-[30%] right-[35%] w-[200px] h-[200px] rounded-full opacity-20 blur-[80px] pointer-events-none"
        style={{ background: "hsl(300 70% 50%)", animation: "float4 22s ease-in-out infinite" }}
      />

      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10"
      >
        <BlurReveal delay={0.1}>
          <Badge variant="secondary" className="mb-8 bg-white/10 border-white/20 text-white/90" data-testid="badge-hero">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Native Technology Studio
          </Badge>
        </BlurReveal>

        <h1
          className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-6 text-white"
          data-testid="text-hero-title"
        >
          <TextReveal delay={0.2}>We Build the</TextReveal>
          <br />
          <span className="gradient-text">
            <TextReveal delay={0.35}>Future with AI</TextReveal>
          </span>
        </h1>

        <BlurReveal delay={0.5}>
          <p
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            Agile Vision is a technology studio that designs and builds AI-powered
            products, agentic systems, and intelligent software for ambitious companies.
          </p>
        </BlurReveal>

        <BlurReveal delay={0.7} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton>
            <Link href="/get-started">
              <Button size="lg" data-testid="button-hero-get-started">
                Get Started
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a href="#capabilities">
              <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-sm border-white/20 text-white" data-testid="button-hero-see-work">
                See Our Work
              </Button>
            </a>
          </MagneticButton>
        </BlurReveal>

        <BlurReveal delay={0.9} className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: 50, suffix: "+", label: "Products Shipped" },
            { value: 3, suffix: "x", label: "Avg. ROI" },
            { value: 24, suffix: "hr", label: "Avg. Turnaround" },
          ].map((stat, i) => (
            <div key={i} className="text-center" data-testid={`stat-hero-${i}`}>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={(stat as any).prefix || ""} />
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </BlurReveal>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}

function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeOverlay, setActiveOverlay] = useState<number | null>(null);

  const capabilities: {
    image: string;
    title: string;
    description: string;
    detailedDescription: string;
    highlights: string[];
    icon: LucideIcon;
  }[] = [
    {
      image: capAgenticAi,
      title: "Agentic AI Systems",
      description: "Autonomous AI agents that reason, plan, and execute complex workflows with human-like decision making.",
      detailedDescription: "We design multi-agent architectures where specialized AI agents collaborate to tackle complex business problems. Our agentic systems handle everything from research and analysis to decision-making and execution, operating autonomously while keeping humans in the loop for critical checkpoints.",
      highlights: [
        "Multi-agent orchestration and collaboration",
        "Tool use, web browsing, and API integration",
        "Memory systems for long-running tasks",
        "Human-in-the-loop safety controls",
      ],
      icon: BrainCircuit,
    },
    {
      image: capWebapps,
      title: "Web Applications",
      description: "Modern, scalable web platforms with intelligent features, real-time dashboards, and SaaS products.",
      detailedDescription: "From MVP to enterprise-scale, we build performant web applications using modern frameworks and cloud-native architecture. Every platform we ship includes AI-powered features that give your users superpowers, whether that is intelligent search, personalized recommendations, or automated workflows.",
      highlights: [
        "React, Next.js, and modern TypeScript stacks",
        "Real-time collaboration and live dashboards",
        "AI-powered search, filtering, and recommendations",
        "Scalable cloud infrastructure and CI/CD pipelines",
      ],
      icon: Globe,
    },
    {
      image: capAnalytics,
      title: "Data & Analytics",
      description: "Transform raw data into actionable insights with AI-powered analytics and predictive modeling.",
      detailedDescription: "We build intelligent data platforms that go beyond traditional BI. Our analytics solutions use machine learning to surface patterns, predict trends, and generate recommendations automatically. From data pipelines to executive dashboards, we make your data work harder.",
      highlights: [
        "Predictive modeling and forecasting",
        "Automated anomaly detection and alerting",
        "Interactive dashboards with natural language queries",
        "ETL pipelines and data warehouse architecture",
      ],
      icon: BarChart3,
    },
    {
      image: capChatbots,
      title: "AI Chatbots",
      description: "Conversational AI that understands context and delivers human-like responses at scale.",
      detailedDescription: "Our chatbots go far beyond scripted flows. Built on large language models and fine-tuned for your domain, they understand nuance, maintain context across conversations, and integrate deeply with your business systems to resolve issues, answer questions, and drive conversions.",
      highlights: [
        "LLM-powered with domain-specific fine-tuning",
        "Multi-channel deployment (web, SMS, WhatsApp, Slack)",
        "CRM and helpdesk integrations",
        "Conversation analytics and continuous improvement",
      ],
      icon: MessageSquare,
    },
    {
      image: capMobile,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile apps with embedded AI capabilities. Concept to App Store in weeks.",
      detailedDescription: "We ship beautiful, high-performance mobile apps with AI baked in from day one. Whether it is on-device ML for instant results or cloud-connected intelligence for complex tasks, our apps feel fast, intuitive, and genuinely smart. We handle everything from UX design to App Store submission.",
      highlights: [
        "React Native and Swift/Kotlin development",
        "On-device ML for offline AI capabilities",
        "Push notifications and real-time sync",
        "App Store optimization and launch strategy",
      ],
      icon: Smartphone,
    },
    {
      image: capAutomation,
      title: "Process Automation",
      description: "Intelligent automation that connects systems, optimizes workflows, and reduces operational costs.",
      detailedDescription: "We identify repetitive, time-consuming processes in your business and replace them with intelligent automation. Our solutions combine RPA, AI decision-making, and system integrations to create end-to-end automated workflows that save time, reduce errors, and free your team for higher-value work.",
      highlights: [
        "End-to-end workflow automation design",
        "AI-powered document processing and extraction",
        "System integration via APIs and webhooks",
        "Monitoring dashboards and error recovery",
      ],
      icon: Cog,
    },
  ];

  return (
    <section ref={sectionRef} id="capabilities" className="py-24 bg-card" data-testid="section-capabilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BlurReveal>
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              What We Build
            </Badge>
          </BlurReveal>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <TextReveal>End-to-End AI Product Development</TextReveal>
          </h2>
          <BlurReveal delay={0.2}>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From intelligent chatbots to autonomous agents, we build the full spectrum of AI-powered products.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => {
            const isActive = activeOverlay === i;
            const IconComp = cap.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Card
                  className="group relative hover-elevate cursor-pointer overflow-visible"
                  data-testid={`card-capability-${i}`}
                  onClick={() => setActiveOverlay(isActive ? null : i)}
                >
                  <div className="relative overflow-hidden rounded-t-md aspect-[16/10]">
                    <motion.img
                      src={cap.image}
                      alt={cap.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: isActive ? 1.12 : 1 }}
                      whileHover={{ scale: isActive ? 1.12 : 1.08 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                    <motion.div
                      className="absolute inset-0 rounded-t-md flex flex-col justify-end p-5 overflow-y-auto"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? "auto" as const : "none" as const,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ background: "linear-gradient(to top, hsla(250,30%,8%,0.97) 0%, hsla(250,30%,8%,0.92) 50%, hsla(250,30%,12%,0.85) 100%)" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "hsl(250 85% 60%)" }}>
                          <IconComp className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-white text-base">{cap.title}</h4>
                      </div>
                      <p className="text-sm text-white/75 leading-relaxed mb-3.5">{cap.detailedDescription}</p>
                      <div className="space-y-1.5">
                        {cap.highlights.map((h, hi) => (
                          <motion.div
                            key={hi}
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, delay: isActive ? 0.15 + hi * 0.06 : 0 }}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "hsl(250 85% 60%)" }} />
                            <span className="text-xs text-white/65 leading-snug">{h}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.button
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-md flex items-center justify-center bg-white/10 backdrop-blur-sm z-10"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                      transition={{ duration: 0.2 }}
                      style={{ pointerEvents: isActive ? "auto" : "none" }}
                      onClick={(e) => { e.stopPropagation(); setActiveOverlay(null); }}
                      data-testid={`button-close-overlay-${i}`}
                    >
                      <X className="w-3.5 h-3.5 text-white" />
                    </motion.button>
                  </div>

                  <div className="relative p-5 pt-0 -mt-6 z-10">
                    <h3 className="font-semibold text-lg mb-1.5">{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const projectTypes = [
  { id: "mobile", label: "Mobile App", icon: Smartphone },
  { id: "webapp", label: "Web App", icon: Globe },
  { id: "chatbot", label: "AI Chatbot", icon: MessageSquare },
  { id: "automation", label: "Automation", icon: Cog },
  { id: "dataapp", label: "Analytics", icon: BarChart3 },
  { id: "agentic", label: "Agentic AI", icon: BrainCircuit },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingCart },
  { id: "game", label: "Games", icon: Gamepad2 },
  { id: "edtech", label: "EdTech", icon: GraduationCap },
];

function GetStartedPreview() {
  const [selected, setSelected] = useState("chatbot");

  return (
    <section className="py-24" data-testid="section-get-started-preview">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BlurReveal>
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Start Your Project
            </Badge>
          </BlurReveal>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <TextReveal>What Will You Build?</TextReveal>
          </h2>
          <BlurReveal delay={0.2}>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose a project type and see what we can create for you.
            </p>
          </BlurReveal>
        </div>

        <BlurReveal delay={0.3} className="flex flex-wrap justify-center gap-2 mb-8">
          {projectTypes.map((type) => (
            <Button
              key={type.id}
              variant={selected === type.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelected(type.id)}
              data-testid={`preview-type-${type.id}`}
            >
              <type.icon className="w-3.5 h-3.5 mr-1.5" />
              {type.label}
            </Button>
          ))}
        </BlurReveal>

        <BlurReveal delay={0.4} className="w-full">
          <DemoPreview projectType={selected} />
        </BlurReveal>

        <BlurReveal delay={0.5} className="text-center mt-10">
          <MagneticButton className="inline-block">
            <Link href="/get-started">
              <Button size="lg" data-testid="button-preview-get-started">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </MagneticButton>
        </BlurReveal>
      </div>
    </section>
  );
}


function ProcessSection() {
  const steps = [
    { num: "01", title: "Discovery", description: "Deep-dive into your business, users, and goals to define the right solution.", icon: Search },
    { num: "02", title: "Design", description: "Interactive prototypes and architecture validated before writing code.", icon: Lightbulb },
    { num: "03", title: "Build", description: "Agile sprints with continuous delivery. You see progress every week.", icon: Code2 },
    { num: "04", title: "Launch", description: "Production deployment with monitoring, support, and growth optimization.", icon: Rocket },
  ];

  return (
    <section className="py-24 bg-card" data-testid="section-process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BlurReveal>
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Our Process
            </Badge>
          </BlurReveal>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <TextReveal>From Idea to Launch in Weeks</TextReveal>
          </h2>
          <BlurReveal delay={0.2}>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our streamlined process ensures rapid delivery without compromising quality.
            </p>
          </BlurReveal>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full origin-left"
              style={{ background: "linear-gradient(90deg, transparent, hsl(250 85% 60% / 0.5), transparent)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center relative"
              >
                <motion.div
                  whileInView={{ scale: [0.5, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative z-10"
                >
                  <step.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <div className="text-sm font-mono text-primary mb-2">{step.num}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechPartnersSection() {
  const technologies = [
    "OpenAI", "Anthropic", "LangChain", "React", "Python", "AWS",
    "Node.js", "TensorFlow", "PostgreSQL", "Docker", "Next.js", "Vercel",
    "TypeScript", "FastAPI", "Redis", "Kubernetes",
  ];

  const doubled = [...technologies, ...technologies];

  return (
    <section className="py-20 overflow-hidden" data-testid="section-tech">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <BlurReveal className="text-center">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Technology Partners</h3>
          <p className="text-muted-foreground text-sm">Built on best-in-class frameworks and infrastructure</p>
        </BlurReveal>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 w-max"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {doubled.map((tech, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-sm py-2 px-5 shrink-0 no-default-hover-elevate no-default-active-elevate"
              data-testid={`badge-tech-${i}`}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Agile Vision transformed our customer support with an AI chatbot that reduced ticket volume by 60%. Their team understood our needs from day one and delivered beyond expectations.",
      name: "Sarah Chen",
      title: "VP of Engineering",
      company: "NovaTech Solutions",
    },
    {
      quote: "We went from concept to a fully deployed AI analytics platform in just 6 weeks. The quality of their work and speed of execution is unlike anything I've seen in 15 years of building products.",
      name: "Marcus Williams",
      title: "CTO",
      company: "DataStream Analytics",
    },
    {
      quote: "Their agentic AI system automated our entire document processing pipeline. We saved over 200 hours per month and the ROI paid for the project in the first quarter alone.",
      name: "Elena Rodriguez",
      title: "Head of Operations",
      company: "Meridian Financial",
    },
  ];

  return (
    <section className="py-24 bg-card" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BlurReveal>
            <Badge variant="secondary" className="mb-4">
              <Quote className="w-3 h-3 mr-1" />
              Testimonials
            </Badge>
          </BlurReveal>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <TextReveal>What Our Clients Say</TextReveal>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                className="rounded-md p-px h-full"
                style={{
                  background: "linear-gradient(135deg, hsl(250 85% 60% / 0.3), hsl(280 80% 60% / 0.1), hsl(250 85% 60% / 0.05))",
                }}
              >
                <div className="rounded-md bg-card p-6 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-primary/30 mb-4 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-24 relative overflow-hidden" data-testid="section-cta">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(250 85% 15%) 0%, hsl(270 60% 12%) 50%, hsl(240 50% 8%) 100%)",
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{ background: "hsl(250 85% 50%)" }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-6" data-testid="text-final-cta-title">
            <TextReveal>Let's Build Something</TextReveal>{" "}
            <span className="gradient-text">
              <TextReveal delay={0.3}>Extraordinary</TextReveal>
            </span>
          </h2>
          <BlurReveal delay={0.4}>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
              Ready to turn your vision into an intelligent product? Let's talk about what we can create together.
            </p>
          </BlurReveal>

          <BlurReveal delay={0.6} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Link href="/get-started">
                <Button size="lg" data-testid="button-final-start-project">
                  Start a Project
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-sm border-white/20 text-white" data-testid="button-final-contact">
                  Contact Us
                </Button>
              </Link>
            </MagneticButton>
          </BlurReveal>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle("");
  return (
    <div>
      <ScrollProgressBar />
      <HeroSection />
      <CapabilitiesSection />
      <GetStartedPreview />
      <ProcessSection />
      <TechPartnersSection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
}
