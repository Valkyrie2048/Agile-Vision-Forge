import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
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
} from "lucide-react";
import capAgenticAi from "../assets/images/cap-agentic-ai.png";
import capChatbots from "../assets/images/cap-chatbots.png";
import capWebapps from "../assets/images/cap-webapps.png";
import capMobile from "../assets/images/cap-mobile.png";
import capAnalytics from "../assets/images/cap-analytics.png";
import capAutomation from "../assets/images/cap-automation.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

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

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        <motion.div {...fadeUp}>
          <Badge variant="secondary" className="mb-8 bg-white/10 border-white/20 text-white/90" data-testid="badge-hero">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Native Technology Studio
          </Badge>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-6 text-white"
          data-testid="text-hero-title"
        >
          We Engineer
          <br />
          <span className="gradient-text">Intelligence</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
          data-testid="text-hero-subtitle"
        >
          Agile Vision is a technology studio that designs and builds AI-powered
          products, agentic systems, and intelligent software for ambitious companies.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/get-started">
            <Button size="lg" data-testid="button-hero-get-started">
              Get Started
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <a href="#capabilities">
            <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-sm border-white/20 text-white" data-testid="button-hero-see-work">
              See Our Work
            </Button>
          </a>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: 50, suffix: "+", label: "Products Shipped" },
            { value: 3, suffix: "x", label: "Avg. ROI" },
            { value: 97, suffix: "%", label: "Client Satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="text-center" data-testid={`stat-hero-${i}`}>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const capabilities = [
    {
      image: capAgenticAi,
      title: "Agentic AI Systems",
      description: "Autonomous AI agents that reason, plan, and execute complex workflows with human-like decision making.",
    },
    {
      image: capWebapps,
      title: "Web Applications",
      description: "Modern, scalable web platforms with intelligent features, real-time dashboards, and SaaS products.",
    },
    {
      image: capAnalytics,
      title: "Data & Analytics",
      description: "Transform raw data into actionable insights with AI-powered analytics and predictive modeling.",
    },
    {
      image: capChatbots,
      title: "AI Chatbots",
      description: "Conversational AI that understands context and delivers human-like responses at scale.",
    },
    {
      image: capMobile,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile apps with embedded AI capabilities. Concept to App Store in weeks.",
    },
    {
      image: capAutomation,
      title: "Process Automation",
      description: "Intelligent automation that connects systems, optimizes workflows, and reduces operational costs.",
    },
  ];

  return (
    <section id="capabilities" className="py-24 bg-card" data-testid="section-capabilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            What We Build
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            End-to-End <span className="gradient-text">AI Product</span> Development
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From intelligent chatbots to autonomous agents, we build the full spectrum of AI-powered products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card
                className="group relative hover-elevate cursor-default overflow-visible"
                data-testid={`card-capability-${i}`}
              >
                <div className="relative overflow-hidden rounded-t-md aspect-[16/10]">
                  <img
                    src={cap.image}
                    alt={cap.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                </div>
                <div className="relative p-5 pt-0 -mt-6 z-10">
                  <h3 className="font-semibold text-lg mb-1.5">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const metrics = [
    { value: 97, suffix: "%", label: "Client Satisfaction" },
    { value: 50, suffix: "+", label: "Products Shipped" },
    { value: 3, suffix: "x", label: "Average ROI" },
    { value: 12, prefix: "$", suffix: "M+", label: "Revenue Generated for Clients" },
  ];

  return (
    <section className="py-24 relative overflow-hidden" data-testid="section-metrics">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(250 85% 12%) 0%, hsl(260 50% 8%) 50%, hsl(240 40% 6%) 100%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Results That <span className="gradient-text">Speak</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Our track record of delivering measurable impact for every client.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
              data-testid={`metric-${i}`}
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} prefix={metric.prefix || ""} />
              </div>
              <div className="text-sm text-white/50">{metric.label}</div>
            </motion.div>
          ))}
        </div>
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
        <motion.div {...fadeUp} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Zap className="w-3 h-3 mr-1" />
            Our Process
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            From Idea to <span className="gradient-text">Launch</span> in Weeks
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our streamlined process ensures rapid delivery without compromising quality.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="h-full origin-left"
              style={{ background: "linear-gradient(90deg, transparent, hsl(250 85% 60% / 0.5), transparent)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
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
        <motion.div {...fadeUp} className="text-center">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Technology Partners</h3>
          <p className="text-muted-foreground text-sm">Built on best-in-class frameworks and infrastructure</p>
        </motion.div>
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
        <motion.div {...fadeUp} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Quote className="w-3 h-3 mr-1" />
            Testimonials
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            What Our <span className="gradient-text">Clients</span> Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
            Let's Build Something{" "}
            <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
            Ready to turn your vision into an intelligent product? Let's talk about what we can create together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-started">
              <Button size="lg" data-testid="button-final-start-project">
                Start a Project
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-sm border-white/20 text-white" data-testid="button-final-contact">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle("");
  return (
    <div>
      <HeroSection />
      <CapabilitiesSection />
      <MetricsSection />
      <ProcessSection />
      <TechPartnersSection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
}
