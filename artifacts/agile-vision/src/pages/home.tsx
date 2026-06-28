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


function ParticleField({ mousePos }: { mousePos: React.RefObject<{ x: number; y: number }> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NUM = 110;
    const MAX_DIST = 170;
    const MOUSE_RADIUS = 160;

    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4,
    }));

    let rafId: number;

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mousePos.current?.x ?? -9999;
      const my = mousePos.current?.y ?? -9999;
      const hasMouseIn = mx > 0 && mx < w;

      for (const p of particles) {
        if (hasMouseIn) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
            const d = Math.sqrt(d2) || 1;
            const force = (MOUSE_RADIUS - d) / MOUSE_RADIUS;
            p.vx += (dx / d) * force * 0.6;
            p.vy += (dy / d) * force * 0.6;
          }
        }

        // Damping + speed clamp — high retention for fluid glide
        p.vx *= 0.993;
        p.vy *= 0.993;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;
      }

      // Connections
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.2;
            ctx.strokeStyle = `hsla(260, 80%, 72%, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        ctx.fillStyle = "hsla(265, 75%, 78%, 0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [mousePos]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
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

  // Shared mouse position ref for canvas particle field
  const mousePos = useRef({ x: -9999, y: -9999 });

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
    mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
    rawGlowX.set(-9999);
    rawGlowY.set(-9999);
    mousePos.current = { x: -9999, y: -9999 };
  };

  return (
    <section
      ref={sectionRef}
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
      <ParticleField mousePos={mousePos} />

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

        <BlurReveal delay={0.3} className="flex flex-col items-center gap-2 mb-8">
          <div className="flex justify-center gap-2">
            {projectTypes.slice(0, 5).map((type) => (
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
          </div>
          <div className="flex justify-center gap-2">
            {projectTypes.slice(5).map((type) => (
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
          </div>
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
      <FinalCTASection />
    </div>
  );
}
