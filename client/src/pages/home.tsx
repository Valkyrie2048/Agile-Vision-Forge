import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Bot,
  Cpu,
  Globe,
  Smartphone,
  ArrowRight,
  Sparkles,
  Blocks,
  BrainCircuit,
  MessageSquare,
  BarChart3,
  Shield,
  Rocket,
  CheckCircle2,
  Users,
  Zap,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(250 85% 60% / 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div {...fadeUp}>
          <Badge variant="secondary" className="mb-6" data-testid="badge-hero">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Native Technology Studio
          </Badge>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6"
          data-testid="text-hero-title"
        >
          We Build the Future
          <br />
          <span className="gradient-text">With Intelligent Software</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          data-testid="text-hero-subtitle"
        >
          Agile Vision is a technology studio specializing in AI-powered products,
          agentic systems, and intelligent chatbots for startups and SMBs.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/wizard">
            <Button size="lg" data-testid="button-hero-wizard">
              Start Your Project
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" data-testid="button-hero-contact">
              Get in Touch
            </Button>
          </Link>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-8 flex-wrap text-sm text-muted-foreground"
        >
          {[
            { icon: CheckCircle2, text: "50+ Products Shipped" },
            { icon: Users, text: "Trusted by Leading SMBs" },
            { icon: Zap, text: "2x Faster Delivery" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-primary" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: BrainCircuit,
      title: "Agentic AI Systems",
      description:
        "Autonomous AI agents that reason, plan, and execute complex workflows. Build systems that think and act independently.",
    },
    {
      icon: MessageSquare,
      title: "AI Chatbots & Assistants",
      description:
        "Conversational AI that understands context, learns from interactions, and delivers human-like responses at scale.",
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile apps with embedded AI capabilities. From concept to App Store in weeks.",
    },
    {
      icon: Globe,
      title: "Web Applications",
      description:
        "Modern, scalable web platforms with intelligent features. Real-time dashboards, SaaS products, and data-driven tools.",
    },
    {
      icon: BarChart3,
      title: "Data & Analytics",
      description:
        "Transform raw data into actionable insights with AI-powered analytics, visualization, and predictive modeling.",
    },
    {
      icon: Blocks,
      title: "Process Automation",
      description:
        "Eliminate repetitive tasks with intelligent automation. Connect systems, optimize workflows, and reduce operational costs.",
    },
  ];

  return (
    <section className="py-24 relative" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Cpu className="w-3 h-3 mr-1" />
            What We Build
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            End-to-End AI Product Development
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From intelligent chatbots to autonomous agents, we build the full
            spectrum of AI-powered products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card
                className="p-6 h-full hover-elevate cursor-default"
                data-testid={`card-service-${i}`}
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      description: "We learn your business, goals, and users to define the right solution.",
    },
    {
      num: "02",
      title: "Design & Prototype",
      description: "Interactive prototypes and architecture validated before a single line of code.",
    },
    {
      num: "03",
      title: "Build & Iterate",
      description: "Agile sprints with continuous delivery. You see progress every week.",
    },
    {
      num: "04",
      title: "Launch & Scale",
      description: "Production deployment with monitoring, support, and growth optimization.",
    },
  ];

  return (
    <section className="py-24 bg-card" data-testid="section-process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Rocket className="w-3 h-3 mr-1" />
            Our Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            From Idea to Launch in Weeks
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our streamlined process ensures rapid delivery without compromising quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="text-4xl font-bold gradient-text mb-3">
                {step.num}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  const technologies = [
    "OpenAI", "LangChain", "Claude", "React", "Next.js", "Node.js",
    "Python", "TensorFlow", "PostgreSQL", "AWS", "Vercel", "Docker",
  ];

  return (
    <section className="py-24" data-testid="section-tech">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-3 h-3 mr-1" />
            Technology
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Built on Best-in-Class Technology
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We leverage the latest AI frameworks and cloud infrastructure to build reliable, scalable products.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {technologies.map((tech, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-sm py-2 px-4"
              data-testid={`badge-tech-${i}`}
            >
              {tech}
            </Badge>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-card" data-testid="section-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="relative rounded-md overflow-visible p-8 sm:p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, hsl(250 85% 60% / 0.15) 0%, hsl(280 80% 60% / 0.1) 50%, hsl(320 80% 60% / 0.05) 100%)",
          }}
        >
          <div className="absolute inset-0 rounded-md border border-primary/20 pointer-events-none" />

          <Bot className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to Build Something Incredible?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Use our interactive wizard to scope your project and get a
            personalized demo of what we can build for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/wizard">
              <Button size="lg" data-testid="button-cta-wizard">
                Launch Project Wizard
                <Sparkles className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" data-testid="button-cta-contact">
                Talk to Our Team
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
      <ServicesSection />
      <ProcessSection />
      <TechStackSection />
      <CTASection />
    </div>
  );
}
