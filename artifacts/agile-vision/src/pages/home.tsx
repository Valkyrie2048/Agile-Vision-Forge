import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView, useMotionValue, useTransform, useScroll, useSpring, animate, AnimatePresence } from "framer-motion";
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
  Activity,
  TrendingUp,
  Factory,
  FileText,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { DemoPreview } from "@/components/demo-previews";
import { AINetworkGraph } from "@/components/ai-network-graph";
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

  // Mouse tracking — offset from center for orb parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(rawMouseY, { stiffness: 60, damping: 20 });

  // Cursor glow — absolute position within section
  const rawGlowX = useMotionValue(-9999);
  const rawGlowY = useMotionValue(-9999);
  const glowX = useSpring(rawGlowX, { stiffness: 120, damping: 25 });
  const glowY = useSpring(rawGlowY, { stiffness: 120, damping: 25 });
  const glowLeft = useTransform(glowX, (v) => v - 200);
  const glowTop = useTransform(glowY, (v) => v - 200);

  // Text 3D tilt from mouse
  const textRotateX = useTransform(mouseY, (v) => v / -180);
  const textRotateY = useTransform(mouseX, (v) => v / 220);

  // Per-orb parallax at different depths
  const orb1X = useTransform(mouseX, (v) => v * 0.04);
  const orb1Y = useTransform(mouseY, (v) => v * 0.04);
  const orb2X = useTransform(mouseX, (v) => v * -0.06);
  const orb2Y = useTransform(mouseY, (v) => v * -0.06);
  const orb3X = useTransform(mouseX, (v) => v * 0.08);
  const orb3Y = useTransform(mouseY, (v) => v * -0.03);
  const orb4X = useTransform(mouseX, (v) => v * -0.03);
  const orb4Y = useTransform(mouseY, (v) => v * 0.09);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawMouseX.set(e.clientX - cx);
    rawMouseY.set(e.clientY - cy);
    rawGlowX.set(e.clientX - rect.left);
    rawGlowY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
    rawGlowX.set(-9999);
    rawGlowY.set(-9999);
  };

  return (
    <section
      ref={sectionRef}
      data-warp-zone=""
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
      `}</style>

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(250 85% 15%) 0%, hsl(260 60% 10%) 30%, hsl(270 50% 8%) 60%, hsl(240 40% 6%) 100%)",
        }}
      />


      {/* Cursor glow spot — follows mouse */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          left: glowLeft,
          top: glowTop,
          background: "radial-gradient(circle, hsla(250,85%,65%,0.15) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Mouse-reactive orbs — outer div handles CSS float, inner motion handles mouse offset */}
      <motion.div className="absolute top-[10%] left-[15%] pointer-events-none" style={{ x: orb1X, y: orb1Y }}>
        <div className="w-[400px] h-[400px] rounded-full opacity-40 blur-[100px]"
          style={{ background: "hsl(250 85% 60%)", animation: "float1 20s ease-in-out infinite" }} />
      </motion.div>
      <motion.div className="absolute top-[60%] right-[10%] pointer-events-none" style={{ x: orb2X, y: orb2Y }}>
        <div className="w-[350px] h-[350px] rounded-full opacity-30 blur-[100px]"
          style={{ background: "hsl(280 80% 55%)", animation: "float2 25s ease-in-out infinite" }} />
      </motion.div>
      <motion.div className="absolute bottom-[20%] left-[40%] pointer-events-none" style={{ x: orb3X, y: orb3Y }}>
        <div className="w-[300px] h-[300px] rounded-full opacity-25 blur-[120px]"
          style={{ background: "hsl(220 90% 55%)", animation: "float3 18s ease-in-out infinite" }} />
      </motion.div>
      <motion.div className="absolute top-[30%] right-[35%] pointer-events-none" style={{ x: orb4X, y: orb4Y }}>
        <div className="w-[200px] h-[200px] rounded-full opacity-20 blur-[80px]"
          style={{ background: "hsl(255 80% 55%)", animation: "float4 22s ease-in-out infinite" }} />
      </motion.div>

      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <AINetworkGraph />

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

        <motion.div
          style={{ perspective: 1200, rotateX: textRotateX, rotateY: textRotateY }}
          className="mb-6"
        >
          <h1
            className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] text-white"
            data-testid="text-hero-title"
            data-hero-heading
          >
            <TextReveal delay={0.2}>We Build the</TextReveal>
            <br />
            <span className="relative inline-block">
              {/* Pulsing aura behind gradient text */}
              <motion.span
                className="absolute -inset-x-8 -inset-y-4 pointer-events-none rounded-full"
                aria-hidden="true"
                animate={{ opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "radial-gradient(ellipse at center, hsla(255,85%,65%,0.45) 0%, hsla(265,75%,60%,0.15) 50%, transparent 75%)",
                  filter: "blur(28px)",
                }}
              />
              <span className="gradient-text shimmer-text relative">
                <TextReveal delay={0.35}>Future with AI</TextReveal>
              </span>
            </span>
          </h1>
        </motion.div>

        <BlurReveal delay={0.5}>
          <p
            className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            From idea to launch — AI products, agentic systems, and intelligent software for ambitious companies.
          </p>
        </BlurReveal>

        <BlurReveal delay={0.7} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <MagneticButton>
            <Link href="/get-started">
              <Button size="lg" className="px-8 shadow-lg shadow-primary/30" data-testid="button-hero-get-started">
                Start a Project
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/simulator">
              <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10" data-testid="button-hero-simulator">
                Try the AI Simulator
              </Button>
            </Link>
          </MagneticButton>
        </BlurReveal>

        {/* Floating tech tags */}
        <BlurReveal delay={0.9}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["GPT-4o", "Claude", "LangChain", "React", "Node.js", "Python", "Supabase", "Vercel"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/6 border border-white/10 text-white/50 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
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
  const [activeModal, setActiveModal] = useState<number | null>(null);

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

  useEffect(() => {
    if (activeModal !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeModal]);

  const activeCap = activeModal !== null ? capabilities[activeModal] : null;

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
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative">
                <div className="absolute -inset-[1px] rounded-md overflow-hidden pointer-events-none z-[2]">
                  <div
                    className="absolute inset-0 rounded-md"
                    style={{ boxShadow: "inset 0 0 0 1px hsla(250,85%,65%,0.15)" }}
                  />
                  <div
                    className="absolute inset-0 shimmer-sweep-anim"
                    style={{ animationDelay: `${i * 0.6}s`, background: "linear-gradient(105deg, transparent 0%, transparent 35%, hsla(250,85%,70%,0.1) 42%, hsla(280,80%,70%,0.18) 50%, hsla(250,85%,70%,0.1) 58%, transparent 65%, transparent 100%)" }}
                  />
                </div>
                <Card
                  className="relative hover-elevate cursor-pointer overflow-visible"
                  data-testid={`card-capability-${i}`}
                  onClick={() => setActiveModal(i)}
                >
                  <div className="relative overflow-hidden rounded-t-md aspect-[16/10]">
                    <motion.img
                      src={cap.image}
                      alt={cap.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  </div>
                  <div className="relative p-5 pt-0 -mt-6 z-10">
                    <h3 className="font-semibold text-lg mb-1.5">{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeModal !== null && activeCap && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            data-testid="modal-capability-overlay"
          >
            <motion.div
              className="absolute inset-0 backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.75)" }}
              onClick={() => setActiveModal(null)}
              data-testid="modal-backdrop"
            />

            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-md"
              style={{ background: "linear-gradient(to bottom, hsl(250 20% 12%), hsl(250 15% 8%))" }}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              data-testid="modal-content"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-md">
                <img
                  src={activeCap.image}
                  alt={activeCap.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(250 20% 12%) 0%, hsla(250,20%,12%,0.4) 40%, hsla(250,85%,60%,0.1) 100%)" }} />

                <button
                  className="absolute top-4 right-4 w-9 h-9 rounded-md flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 transition-colors"
                  onClick={() => setActiveModal(null)}
                  data-testid="button-close-modal"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ background: "hsl(250 85% 60%)" }}>
                      <activeCap.icon className="w-5 h-5 text-white" />
                    </div>
                    <Badge className="no-default-hover-elevate no-default-active-elevate text-xs" style={{ background: "hsla(250,85%,60%,0.2)", color: "hsl(250 85% 75%)", border: "1px solid hsla(250,85%,60%,0.3)" }}>
                      Capability
                    </Badge>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{activeCap.title}</h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-white/70 leading-relaxed">{activeCap.detailedDescription}</p>

                <div>
                  <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">Key Capabilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCap.highlights.map((h, hi) => (
                      <motion.div
                        key={hi}
                        className="flex items-start gap-3 rounded-md p-3"
                        style={{ background: "hsla(250,30%,20%,0.4)", border: "1px solid hsla(250,30%,40%,0.2)" }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 + hi * 0.07 }}
                      >
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(250 85% 65%)" }} />
                        <span className="text-sm text-white/65 leading-snug">{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/get-started">
                    <Button size="lg" data-testid="button-modal-get-started" style={{ background: "hsl(250 85% 60%)" }}>
                      Start a Project
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white/15 text-white/80" onClick={() => setActiveModal(null)} data-testid="button-modal-close-bottom">
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const INDUSTRY_CARDS = [
  {
    icon: Activity,
    label: "Healthcare",
    tagline: "Clinical AI & Patient Intelligence",
    blurb: "Triage support, outcome prediction, and real-time clinical decision tools that keep clinicians in control.",
    accent: "hsl(160 75% 45%)",
    glow: "hsla(160,75%,45%,0.12)",
  },
  {
    icon: TrendingUp,
    label: "Finance",
    tagline: "Market Signals & Anomaly Detection",
    blurb: "Flash-crash alerts, portfolio risk models, and NLP-powered earnings analysis at institutional speed.",
    accent: "hsl(250 85% 65%)",
    glow: "hsla(250,85%,65%,0.12)",
  },
  {
    icon: ShoppingCart,
    label: "Retail & E-Commerce",
    tagline: "Demand Forecasting & Personalisation",
    blurb: "Dynamic pricing engines, inventory optimisation, and real-time recommendation layers at scale.",
    accent: "hsl(35 90% 55%)",
    glow: "hsla(35,90%,55%,0.12)",
  },
  {
    icon: Factory,
    label: "Manufacturing",
    tagline: "Vision-Based Defect Detection",
    blurb: "Computer-vision pipelines that flag solder bridges and missing components before they leave the line.",
    accent: "hsl(200 80% 55%)",
    glow: "hsla(200,80%,55%,0.12)",
  },
  {
    icon: FileText,
    label: "Media & Content",
    tagline: "Real-Time Brand Sentiment",
    blurb: "Token-level sentiment scoring, topic clustering, and audience-signal dashboards for content teams.",
    accent: "hsl(280 75% 65%)",
    glow: "hsla(280,75%,65%,0.12)",
  },
  {
    icon: Truck,
    label: "Logistics",
    tagline: "Last-Mile Route Optimisation",
    blurb: "Travelling-salesman solvers, live re-routing, and ETA prediction that cut delivery kilometres.",
    accent: "hsl(15 80% 55%)",
    glow: "hsla(15,80%,55%,0.12)",
  },
];

function IndustriesSection() {
  return (
    <section className="py-24" data-testid="section-industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BlurReveal>
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Industry Solutions
            </Badge>
          </BlurReveal>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <TextReveal>AI Built for Your Industry</TextReveal>
          </h2>
          <BlurReveal delay={0.2}>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every sector has its own rhythms, risks, and data. We ship AI tailored to the realities of your vertical — not generic templates.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {INDUSTRY_CARDS.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link href="/industries">
                <motion.div
                  className="group relative rounded-xl p-px h-full cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${ind.accent}44, transparent 60%)` }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="rounded-xl h-full flex flex-col gap-5 p-7 transition-colors duration-300"
                    style={{ background: "hsl(250 20% 9%)" }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 30% 30%, ${ind.glow} 0%, transparent 65%)` }}
                    />

                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative z-10"
                      style={{ background: `${ind.accent}20`, border: `1px solid ${ind.accent}50` }}
                    >
                      <ind.icon className="w-7 h-7" style={{ color: ind.accent }} />
                    </div>

                    <div className="relative z-10 flex-1">
                      <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ind.accent }}>
                        {ind.label}
                      </div>
                      <h3 className="font-semibold text-white text-lg leading-snug mb-3">{ind.tagline}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{ind.blurb}</p>
                    </div>

                    <div className="flex items-center gap-1.5 relative z-10">
                      <span className="text-sm font-semibold" style={{ color: ind.accent }}>See live demo</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" style={{ color: ind.accent }} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <BlurReveal delay={0.4} className="text-center">
          <MagneticButton className="inline-block">
            <Link href="/industries">
              <Button size="lg" className="px-8 shadow-lg shadow-primary/20">
                Explore All Industry Demos
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </MagneticButton>
        </BlurReveal>
      </div>
    </section>
  );
}

const projectTypes = [
  {
    id: "chatbot",
    label: "AI Chatbot",
    icon: MessageSquare,
    tagline: "Conversations that convert",
    description: "LLM-powered assistants that understand context, integrate with your systems, and resolve queries without a human in the loop.",
    bullets: ["Multi-channel (web, Slack, WhatsApp)", "CRM & helpdesk integrations", "Conversation analytics"],
  },
  {
    id: "agentic",
    label: "Agentic AI",
    icon: BrainCircuit,
    tagline: "AI that reasons and acts",
    description: "Multi-agent architectures that research, plan, and execute complex workflows autonomously — with human checkpoints where it matters.",
    bullets: ["Tool use and web browsing", "Long-running memory systems", "Human-in-the-loop controls"],
  },
  {
    id: "webapp",
    label: "Web App",
    icon: Globe,
    tagline: "Platforms that scale",
    description: "From MVP to enterprise-scale SaaS — real-time dashboards, AI-powered search, and the infrastructure to grow with you.",
    bullets: ["React, Next.js, TypeScript", "Real-time collaboration", "AI search & recommendations"],
  },
  {
    id: "mobile",
    label: "Mobile App",
    icon: Smartphone,
    tagline: "Concept to App Store",
    description: "Native-quality mobile apps with AI baked in from day one — on-device ML for instant results, cloud AI for complex tasks.",
    bullets: ["React Native & Swift/Kotlin", "On-device ML for offline AI", "App Store launch strategy"],
  },
  {
    id: "dataapp",
    label: "Analytics",
    icon: BarChart3,
    tagline: "Data that decides for you",
    description: "Predictive analytics, anomaly detection, and natural-language query interfaces that surface insight automatically.",
    bullets: ["Forecasting & trend detection", "Natural language queries", "ETL pipelines & warehousing"],
  },
  {
    id: "automation",
    label: "Automation",
    icon: Cog,
    tagline: "Reclaim your team's time",
    description: "End-to-end process automation combining AI document understanding, RPA, and deep system integrations — so your team works on what matters.",
    bullets: ["AI document processing", "API & webhook integration", "Error recovery & auto-retry"],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: ShoppingCart,
    tagline: "Sell smarter",
    description: "AI-personalised storefronts with dynamic pricing, real-time inventory, and recommendation engines that lift AOV.",
    bullets: ["Personalised product feeds", "Dynamic pricing engine", "Cart abandonment recovery"],
  },
  {
    id: "game",
    label: "Games",
    icon: Gamepad2,
    tagline: "Play, powered by AI",
    description: "Adaptive game experiences with AI-driven NPCs, procedural content, and real-time difficulty tuning that keeps players hooked.",
    bullets: ["Procedural world generation", "AI-driven NPC behaviour", "Real-time difficulty scaling"],
  },
  {
    id: "edtech",
    label: "EdTech",
    icon: GraduationCap,
    tagline: "Learning that adapts",
    description: "Adaptive learning platforms that personalise content, pace, and assessments to each learner in real time.",
    bullets: ["Adaptive content delivery", "AI tutoring & feedback", "Progress analytics dashboard"],
  },
];

function GetStartedPreview() {
  const [selected, setSelected] = useState("chatbot");
  const active = projectTypes.find(t => t.id === selected)!;

  const row1 = projectTypes.slice(0, 5);
  const row2 = projectTypes.slice(5);

  return (
    <section className="py-24 relative overflow-hidden" data-testid="section-get-started-preview"
      style={{ background: "hsl(250 18% 7%)" }}>
      {/* Subtle radial glow behind the demo */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 55%, hsl(250 85% 60% / 0.06) 0%, transparent 70%)" }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10">
          <BlurReveal>
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Our Work
            </Badge>
          </BlurReveal>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <TextReveal>We Build AI Solutions</TextReveal>
          </h2>
          <BlurReveal delay={0.2}>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Pick a product type and see a live demo of what we'd build for your business.
            </p>
          </BlurReveal>
        </div>

        {/* Tab rows — icon cards, 5 on top + 4 on bottom */}
        <BlurReveal delay={0.25}>
          <div className="flex flex-col items-center gap-2 mb-8">
            {[row1, row2].map((row, rowIdx) => (
              <div key={rowIdx} className="flex flex-wrap justify-center gap-2">
                {row.map((type) => {
                  const isActive = selected === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelected(type.id)}
                      data-testid={`preview-type-${type.id}`}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                      style={isActive ? {
                        background: "hsl(250 85% 60% / 0.15)",
                        borderColor: "hsl(250 85% 60% / 0.5)",
                        color: "hsl(250 85% 80%)",
                        boxShadow: "0 0 16px hsl(250 85% 60% / 0.15)",
                      } : {
                        background: "hsl(250 20% 10% / 0.6)",
                        borderColor: "hsl(250 20% 22%)",
                        color: "hsl(250 10% 50%)",
                      }}
                    >
                      <type.icon
                        className="w-4 h-4 shrink-0"
                        style={{ color: isActive ? "hsl(250 85% 70%)" : "hsl(250 10% 45%)" }}
                      />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </BlurReveal>

        {/* Live demo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected + "-demo"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mb-8"
          >
            <div className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid hsl(250 25% 18%)",
                background: "hsl(250 20% 5%)",
                boxShadow: "0 0 0 1px hsl(250 85% 60% / 0.06), 0 20px 60px -12px hsl(250 20% 3% / 0.8)",
              }}>
              {/* Accent bar */}
              <div className="h-px" style={{ background: "linear-gradient(90deg, transparent 10%, hsl(250 85% 60% / 0.5) 40%, hsl(270 75% 65% / 0.35) 60%, transparent 90%)" }} />
              <div className="p-5 sm:p-8">
                <DemoPreview projectType={selected} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Info below demo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected + "-info"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="pt-5 border-t flex flex-col items-center text-center" style={{ borderColor: "hsl(250 20% 18%)" }}>
              {/* Tagline */}
              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white leading-snug mb-3 tracking-tight">
                {active.tagline}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-md">
                {active.description}
              </p>

              <MagneticButton>
                <Link href="/get-started">
                  <Button size="default" data-testid="button-preview-get-started">
                    Build your {active.label}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </AnimatePresence>

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
    <section className="py-32 bg-card" data-testid="section-process">
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
  const nodes = [
    { name: "OpenAI",      x: 6,  y: 8,  cls: "text-xl",   op: 0.82, amp: 10, dur: 7,    del: 0 },
    { name: "React",       x: 39, y: 14, cls: "text-2xl",  op: 0.88, amp: 8,  dur: 8,    del: 1.2 },
    { name: "Anthropic",   x: 73, y: 7,  cls: "text-xl",   op: 0.78, amp: 12, dur: 9,    del: 0.5 },
    { name: "Python",      x: 86, y: 40, cls: "text-xl",   op: 0.72, amp: 9,  dur: 7.5,  del: 2 },
    { name: "TypeScript",  x: 18, y: 43, cls: "text-lg",   op: 0.58, amp: 11, dur: 10,   del: 0.8 },
    { name: "LangChain",   x: 53, y: 52, cls: "text-base", op: 0.52, amp: 8,  dur: 8.5,  del: 1.5 },
    { name: "Next.js",     x: 28, y: 70, cls: "text-lg",   op: 0.55, amp: 14, dur: 11,   del: 0.3 },
    { name: "Kubernetes",  x: 65, y: 67, cls: "text-base", op: 0.48, amp: 10, dur: 9.5,  del: 2.2 },
    { name: "AWS",         x: 10, y: 77, cls: "text-base", op: 0.45, amp: 9,  dur: 8,    del: 1 },
    { name: "Gemini",      x: 48, y: 28, cls: "text-base", op: 0.50, amp: 12, dur: 10.5, del: 1.8 },
    { name: "PostgreSQL",  x: 88, y: 65, cls: "text-sm",   op: 0.32, amp: 8,  dur: 12,   del: 0.4 },
    { name: "Docker",      x: 57, y: 82, cls: "text-sm",   op: 0.28, amp: 10, dur: 9,    del: 2.5 },
    { name: "Redis",       x: 23, y: 89, cls: "text-xs",   op: 0.25, amp: 7,  dur: 11,   del: 0.7 },
    { name: "Vercel",      x: 79, y: 83, cls: "text-sm",   op: 0.30, amp: 11, dur: 8.5,  del: 1.3 },
    { name: "FastAPI",     x: 35, y: 54, cls: "text-sm",   op: 0.38, amp: 9,  dur: 10,   del: 0.6 },
    { name: "LlamaIndex",  x: 71, y: 42, cls: "text-sm",   op: 0.35, amp: 13, dur: 11.5, del: 1.9 },
    { name: "Pinecone",    x: 91, y: 23, cls: "text-sm",   op: 0.33, amp: 8,  dur: 9.5,  del: 2.8 },
    { name: "HuggingFace", x: 3,  y: 56, cls: "text-xs",   op: 0.22, amp: 10, dur: 13,   del: 1.1 },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "hsl(250 20% 4%)", paddingTop: "6rem", paddingBottom: "4rem" }}
      data-testid="section-tech"
    >
      {/* Deep space background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 140% 90% at 50% 60%, hsl(250 35% 8% / 0.8) 0%, transparent 70%)" }} />

      {/* Aurora 1 — large purple, drifts slowly */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 800, height: 500, left: "5%", top: "-10%",
          background: "radial-gradient(ellipse, hsl(250 85% 55% / 0.13) 0%, transparent 70%)",
          filter: "blur(70px)" }}
        animate={{ x: [0, 100, -40, 0], y: [0, -30, 60, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* Aurora 2 — violet, upper right */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 450, height: 350, right: "2%", top: "5%",
          background: "radial-gradient(ellipse, hsl(270 70% 60% / 0.10) 0%, transparent 70%)",
          filter: "blur(55px)" }}
        animate={{ x: [0, -80, 30, 0], y: [0, 50, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Aurora 3 — ground haze */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 600, height: 200, left: "25%", bottom: "0%",
          background: "radial-gradient(ellipse, hsl(240 60% 45% / 0.07) 0%, transparent 70%)",
          filter: "blur(80px)" }}
        animate={{ x: [0, 60, -50, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      {/* Scan sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <div style={{
          position: "absolute", top: 0, bottom: 0, width: "350px",
          background: "linear-gradient(to right, transparent, hsl(250 80% 70% / 0.05), transparent)",
          animation: "scanSweep 14s ease-in-out infinite",
        }} />
      </div>

      {/* Header */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8" style={{ zIndex: 2 }}>
        <BlurReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The stack behind<br />everything we build.
            </h2>
            <p className="text-muted-foreground text-sm max-w-[200px] sm:text-right leading-relaxed">
              Best-in-class AI and infrastructure,<br className="hidden sm:block" /> chosen for scale.
            </p>
          </div>
        </BlurReveal>
      </div>

      {/* Floating node field */}
      <div className="relative w-full" style={{ height: 460, zIndex: 2 }}>
        {nodes.map((node, i) => (
          <motion.div
            key={node.name}
            className="absolute"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: node.op, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: i * 0.045, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className={`select-none font-semibold tracking-wide whitespace-nowrap ${node.cls}`}
              style={{ color: "hsl(250 25% 88%)" }}
              animate={{ y: [0, -node.amp, 0] }}
              transition={{ duration: node.dur, delay: node.del, repeat: Infinity, ease: "easeInOut" }}
            >
              {node.name}
            </motion.span>
          </motion.div>
        ))}
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

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "We handed Agile Vision a half-formed idea on a Monday. By Friday we had a working prototype. By the following month we had a product our customers actually use every day. The speed without the corners cut — that's the rare thing.",
      company: "GIGAMATIC",
    },
    {
      quote: "Our research sits at the edge of AI and human consciousness — not an easy brief for any technology partner. Agile Vision understood the nuance immediately and built us tooling that respects both the science and the stakes. Exceptional work.",
      company: "The Institute for AI and The Future of Consciousness",
    },
    {
      quote: "We needed an agentic system that could adapt to real-world variability without falling over. Agile Vision delivered exactly that. Our operational overhead dropped by over 40% in the first quarter and the system has been rock solid since.",
      company: "WaterBalanced Technology Inc.",
    },
  ];

  return (
    <section className="py-32 bg-card" data-testid="section-testimonials">
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
                  background: "linear-gradient(135deg, hsl(250 85% 60% / 0.3), hsl(265 80% 60% / 0.1), hsl(250 85% 60% / 0.05))",
                }}
              >
                <div className="rounded-md bg-card p-6 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-primary/30 mb-4 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    "{testimonial.quote}"
                  </p>
                  <div className="font-semibold text-sm">
                    {testimonial.company}
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

export default function Home() {
  usePageTitle("");
  return (
    <div>
      <ScrollProgressBar />
      <HeroSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <GetStartedPreview />
      <ProcessSection />
      <TestimonialsSection />
      <TechPartnersSection />
      <FinalCTASection />
    </div>
  );
}
