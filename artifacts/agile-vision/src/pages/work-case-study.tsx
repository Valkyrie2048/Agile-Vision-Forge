import { useRoute, Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowLeft, ArrowRight,
  BarChart3, TrendingUp, CreditCard, Sparkles, Shield, Lock,
  Search, FileText, Heart, Scale, Users,
  User, GitBranch, ArrowRightLeft, Map, Briefcase, GraduationCap,
  MessageSquare, Brain, Eye, UserCheck, AlertCircle,
  BookOpen, Library, Calendar, Mail, Globe, Mic,
  RefreshCw, Navigation, Bell,
  Star, Handshake, Newspaper,
  ArrowUpRight, Zap, CheckCircle2, Lightbulb, Image as ImageIcon,
  Quote,
  Check
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useEffect, useRef, useState } from "react";
import { BrowserFrame, PhoneFrame } from "@/components/device-frames";

const ICON_MAP: Record<string, React.ElementType> = {
  BarChart3, TrendingUp, CreditCard, Sparkles, Shield, Lock,
  Search, FileText, Heart, Scale, Users,
  User, GitBranch, ArrowRightLeft, Map, Briefcase, GraduationCap,
  MessageSquare, Brain, Eye, UserCheck, AlertCircle,
  BookOpen, Library, Calendar, Mail, Globe, Mic,
  RefreshCw, Navigation, Bell,
  Star, Handshake, Newspaper,
};

function CapabilityIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className="w-6 h-6" />;
}

function Eyebrow({ children, color, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div
      className={`text-xs font-mono tracking-[0.3em] uppercase mb-6 ${className}`}
      style={{ color: color ?? "rgba(255,255,255,0.4)" }}
    >
      {children}
    </div>
  );
}

function Rule() {
  return <div className="h-px bg-white/[0.07] my-32 md:my-48 max-w-[120rem] mx-auto w-full" />;
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");
  const isNumber = /^[0-9]+[kmM+%$]*$/.test(value) || /^\$?[0-9]+(\.[0-9]+)?[a-zA-Z%]*$/.test(value);
  
  useEffect(() => {
    if (!inView || !isNumber) {
      if (inView) setDisplay(value);
      return;
    }
    
    let start = 0;
    const match = value.match(/^([^\\d]*)([\\d,.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3];
    const end = parseFloat(numStr);
    
    if (isNaN(end)) {
      setDisplay(value);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * easeOutQuart;
      
      let formatted = "";
      if (Number.isInteger(end)) {
        formatted = Math.round(current).toString();
      } else {
        formatted = current.toFixed(1);
      }
      
      setDisplay(`${prefix}${formatted}${suffix}`);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(value); // exact match at end
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, value, isNumber]);

  return <span ref={ref}>{display}</span>;
}

const STATUS_CONFIG = {
  live: {
    dot: "bg-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    text: "text-emerald-400",
  },
  proposed: {
    dot: "bg-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    text: "text-amber-400",
  },
  vision: {
    dot: "bg-sky-400",
    bg: "bg-sky-400/10 border-sky-400/20",
    text: "text-sky-400",
  },
};

export default function WorkCaseStudy() {
  const [, params] = useRoute("/work/:slug");
  const slug = params?.slug;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  usePageMeta({
    title: project?.name ?? "Case Study",
    description: project?.tagline ?? "",
    url: slug ? `/work/${slug}` : undefined,
    type: "article",
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-[#090909] flex flex-col items-center justify-center text-white/40 gap-8">
        <p className="text-2xl font-serif italic">Project not found.</p>
        <Link href="/work" className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Gallery
        </Link>
      </div>
    );
  }

  const ai = project.aiDeepDive;
  const statusCfg = STATUS_CONFIG[ai.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.live;

  const visionShort = (() => {
    const sentences = project.vision.split('. ').filter(s => s.trim().length > 20);
    return sentences.length >= 2 ? sentences.slice(0, 2).join('. ') + '.' : project.vision;
  })();

  const toBullets = (text: string, max: number) =>
    text.split('. ').filter(s => s.trim().length > 30).slice(0, max)
      .map(s => { const t = s.trim(); return t.endsWith('.') ? t : t + '.'; });

  const opportunityBullets = toBullets(project.opportunity, 4);
  const useCaseBullets = ai.useCase.bullets ?? toBullets(ai.useCase.body, 4);
  const implementationBullets = ai.implementation.bullets ?? toBullets(ai.implementation.body, 4);

  return (
    <div className="min-h-screen bg-[#090909] selection:bg-white/15 selection:text-white overflow-x-hidden">
      
      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-20 pb-6 md:pt-28 md:pb-10 px-6 lg:px-12 xl:px-16"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 100% 100% at 50% -20%, ${project.accentColor}1A 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-[120rem] mx-auto w-full relative z-10 flex flex-col items-start justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Link href="/work" className="group flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
              Back to Gallery
            </Link>
          </motion.div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full"
          >
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <span
                className="text-xs font-mono tracking-[0.25em] uppercase px-4 py-2 rounded-full border border-white/10"
                style={{ color: project.accentColor, backgroundColor: `${project.accentColor}10` }}
              >
                {project.category}
              </span>
              <span className="text-xs font-mono tracking-[0.25em] uppercase px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70">
                {project.platform}
              </span>
              {project.website && (
                <a
                  href={`https://${project.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors ml-4"
                >
                  Visit Live Site
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
            
            <h1
              className="font-serif text-white tracking-tight leading-[0.9] max-w-7xl mb-12"
              style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
            >
              {project.name}
            </h1>
            
            <p
              className="text-white/60 font-light leading-relaxed max-w-3xl mb-12"
              style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}
            >
              {project.tagline}
            </p>

            {project.keyStats && project.keyStats.length > 0 && (
              <div className="grid grid-cols-3 gap-0 divide-x divide-white/[0.08] pt-10 border-t border-white/[0.08] max-w-2xl">
                {project.keyStats.map((stat, i) => (
                  <div key={i} className={`flex flex-col gap-2 ${i === 0 ? "pr-10" : "px-10"}`}>
                    <div
                      className="font-serif tracking-tight leading-none"
                      style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)", color: project.accentColor }}
                    >
                      <CountUp value={stat.value} />
                    </div>
                    <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/35">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── 2. HERO IMAGE FULL BLEED ───────────────────────────── */}
      {project.coverImage && (
        <section className="relative z-20 w-full mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="w-full"
          >
            <div
              className="relative w-full h-[60vh] md:h-[90vh] bg-zinc-950 border-y border-white/10"
              style={{
                boxShadow: `0 0 200px -50px ${project.accentColor}40`,
              }}
            >
              <img
                src={project.coverImage}
                alt={`${project.name} interface`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── 3. GALLERY ─────────────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 1 && (
        <section className="mb-32 md:mb-48 px-6 lg:px-12 xl:px-16">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="mb-16"
            >
              <Eyebrow color={project.accentColor}>Gallery</Eyebrow>
              <h2
                className="font-serif text-white tracking-tight leading-tight"
                style={{ fontSize: "clamp(1.8rem, 2.5vw, 2.8rem)" }}
              >
                The platform, in detail
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {project.gallery.slice(1).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: (i % 2) * 0.1 }}
                  className={item.type === "fullwidth" ? "md:col-span-2" : ""}
                >
                  <div className={item.type === "phone" ? "h-[520px]" : "h-[340px] md:h-[420px]"}>
                    {item.type === "browser" && item.imagePath ? (
                      <BrowserFrame
                        src={item.imagePath}
                        alt={item.label}
                        accentColor={project.accentColor}
                        url={project.website}
                      />
                    ) : item.type === "phone" && item.imagePath ? (
                      <PhoneFrame
                        src={item.imagePath}
                        alt={item.label}
                        accentColor={project.accentColor}
                      />
                    ) : item.imagePath ? (
                      <div className="w-full h-full rounded-2xl overflow-hidden border border-white/[0.07] bg-zinc-950">
                        <img
                          src={item.imagePath}
                          alt={item.label}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-white/65 mb-2">
                      {item.label}
                    </h3>
                    <p className="text-sm text-white/55 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 4. THE PROBLEM ──────────────────────────────────────────── */}
      <div className="px-6 lg:px-12 xl:px-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="mb-32 md:mb-48"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32 items-start">
              <div className="sticky top-32">
                <Eyebrow color={project.accentColor}>The Challenge</Eyebrow>
                <div className="h-px w-12 bg-white/20 mt-8" />
              </div>
              <div className="pt-2">
                <h2
                  className="font-serif text-white tracking-tight leading-[1.2] mb-16 italic"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
                >
                  "{project.problemStatement}"
                </h2>
                <div className="space-y-12 max-w-3xl">
                  {opportunityBullets.map((bullet, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <span className="font-mono text-xs text-white/20 mt-1">{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-base lg:text-lg text-white/50 font-light leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* ─── 4. VISION & PRINCIPLES ───────────────────────────────── */}
      <section className="mb-32 md:mb-48 relative border-y border-white/[0.06]" style={{ backgroundColor: `${project.accentColor}09` }}>
        <div className="px-6 lg:px-12 xl:px-16 py-32 md:py-48">
          <div className="max-w-[120rem] mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="mb-24 md:mb-32 max-w-6xl mx-auto text-center"
            >
              <Eyebrow color={project.accentColor} className="mx-auto">The Vision</Eyebrow>
              <p
                className="text-white/90 font-serif font-light leading-[1.4] tracking-tight mt-12"
                style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)" }}
              >
                {visionShort}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Eyebrow className="text-center">Design Principles</Eyebrow>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {project.designPrinciples.map((p, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-4 p-10 rounded-2xl border border-white/[0.05] bg-[#090909]/40 backdrop-blur-sm"
                  >
                    <span
                      className="text-[10px] font-mono tracking-[0.2em]"
                      style={{ color: `${project.accentColor}` }}
                    >
                      Principle {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-serif text-white tracking-tight">{p.title}</h3>
                    <p className="text-base text-white/60 font-light leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 5. CAPABILITIES ─────────────────────────────────────────── */}
      {project.capabilities && project.capabilities.length > 0 && (
        <section className="mb-32 md:mb-48 px-6 lg:px-12 xl:px-16">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32 items-start">
                <div className="lg:sticky lg:top-32">
                  <Eyebrow color={project.accentColor}>What It Does</Eyebrow>
                  <h2
                    className="font-serif text-white tracking-tight leading-tight mt-4"
                    style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
                  >
                    Platform capabilities
                  </h2>
                  <div className="h-px w-12 bg-white/20 mt-8" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.05] border border-white/[0.05] rounded-2xl overflow-hidden">
                  {project.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-8 bg-[#0d0d0d] hover:bg-white/[0.02] transition-colors"
                    >
                      <div
                        className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center mb-5 flex-shrink-0"
                        style={{ color: project.accentColor }}
                      >
                        <CapabilityIcon name={cap.icon} />
                      </div>
                      <h3 className="text-base font-serif text-white mb-3 tracking-tight">
                        {cap.title}
                      </h3>
                      <p className="text-sm text-white/45 font-light leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── 5b. AI ROLE ─────────────────────────────────────────────── */}
      {project.aiRole && project.aiRole.length > 0 && (
        <section className="mb-32 md:mb-48 px-6 lg:px-12 xl:px-16">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <Eyebrow color={project.accentColor}>How AI ships in this product</Eyebrow>
              <div className="space-y-0 mt-12 max-w-5xl">
                {project.aiRole.map((role, i) => {
                  const titleLower = role.title.toLowerCase();
                  const isLive = titleLower.includes("(live)");
                  const isProposed = titleLower.includes("(proposed)");
                  const roleCfg = isLive
                    ? STATUS_CONFIG.live
                    : isProposed
                    ? STATUS_CONFIG.proposed
                    : STATUS_CONFIG.vision;
                  const statusLabel = isLive ? "Live" : isProposed ? "Proposed" : "Roadmap";
                  const cleanTitle = role.title.replace(/\s*\([^)]+\)\s*$/, "").trim();
                  return (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row gap-10 items-start py-12 border-b border-white/[0.06]"
                    >
                      <div className="w-full md:w-2/5 flex-shrink-0">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono tracking-[0.2em] uppercase whitespace-nowrap mb-5 ${roleCfg.bg} ${roleCfg.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${roleCfg.dot}`} />
                          {statusLabel}
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-serif text-white tracking-tight leading-tight">
                          {cleanTitle}
                        </h3>
                      </div>
                      <div className="w-full md:w-3/5">
                        <p className="text-lg lg:text-xl text-white/55 font-light leading-[1.7]">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── 6. AI DEEP DIVE (TECHNICAL & DRAMATIC) ──────────────────────────────────────── */}
      <section className="mb-32 md:mb-48 relative border-y border-white/10 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] blur-[120px] opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${project.accentColor}, transparent 70%)` }}
        />
        
        <div className="px-6 lg:px-12 xl:px-16 py-32 md:py-48 relative z-10">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="flex flex-col items-center text-center mb-32">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                  <Eyebrow color={project.accentColor} className="mb-0">AI Architecture</Eyebrow>
                  <span className={`inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border ${statusCfg.bg} ${statusCfg.text}`}>
                    <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                    {ai.statusLabel}
                  </span>
                </div>
                
                <h2 className="font-serif text-white tracking-tight leading-[1.05] max-w-6xl mx-auto" style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)" }}>
                  {ai.headline}
                </h2>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-32">
                {/* Use Case Block */}
                <div className="p-12 md:p-16 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ color: project.accentColor }}>
                        <Lightbulb className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-white/60">{ai.useCase.label}</h3>
                    </div>
                    <ul className="space-y-6 flex-1">
                      {useCaseBullets.slice(0, 4).map((bullet, i) => (
                        <li key={i} className="flex gap-5 items-start">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: project.accentColor }} />
                          <p className="text-base text-white/70 font-light leading-relaxed">{bullet}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Implementation Block */}
                <div className="p-12 md:p-16 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ color: project.accentColor }}>
                        <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-white/60">{ai.implementation.label}</h3>
                    </div>
                    <ul className="space-y-6 flex-1">
                      {implementationBullets.slice(0, 4).map((bullet, i) => (
                        <li key={i} className="flex gap-5 items-start">
                          <div className="w-5 h-5 rounded flex items-center justify-center border border-white/20 mt-0.5 flex-shrink-0 bg-white/5">
                            <span className="text-[10px] font-mono text-white/50">{i + 1}</span>
                          </div>
                          <p className="text-base text-white/70 font-light leading-relaxed">{bullet}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {project.aiLayers && project.aiLayers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="mt-16"
                >
                  <div className="text-center mb-12">
                    <Eyebrow color={project.accentColor} className="mx-auto">
                      AI Architecture
                    </Eyebrow>
                    <h3 className="font-serif text-white text-2xl md:text-3xl tracking-tight mt-4">
                      Three layers, one system
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {(project.aiLayers as Array<{ number: string; icon: string; name: string; role: string; input: string; process: string; output: string }>).map((layer, i) => (
                      <div
                        key={i}
                        className="p-8 rounded-2xl border border-white/[0.07] bg-[#080808] flex flex-col gap-8"
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-xs font-mono text-white/25 mt-1 flex-shrink-0">
                            {layer.number}
                          </span>
                          <div>
                            <h4 className="font-serif text-white text-xl tracking-tight">
                              {layer.name}
                            </h4>
                            <p
                              className="text-xs font-mono tracking-[0.15em] uppercase mt-2"
                              style={{ color: project.accentColor }}
                            >
                              {layer.role}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-5 border-t border-white/[0.05] pt-6">
                          <div>
                            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 block mb-2">
                              Input
                            </span>
                            <p className="text-sm text-white/55 font-light leading-relaxed">
                              {layer.input}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 block mb-2">
                              Process
                            </span>
                            <p className="text-sm text-white/55 font-light leading-relaxed">
                              {layer.process}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 block mb-2">
                              Output
                            </span>
                            <p className="text-sm text-white/55 font-light leading-relaxed">
                              {layer.output}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 7. BENEFITS (TRIUMPHANT CLOSE) ───────────────────────── */}
      {project.aiDeepDive?.benefits && project.aiDeepDive.benefits.length > 0 && (
        <section className="px-6 lg:px-12 xl:px-16 pb-32 md:pb-48">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="text-center mb-24">
                <Eyebrow color={project.accentColor} className="mx-auto">Outcomes</Eyebrow>
                <h2 className="font-serif text-[clamp(2.5rem,4vw,4rem)] text-white tracking-tight mt-8">
                  {project.name} in Action
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.aiDeepDive.benefits.slice(0, 3).map((benefit: { title: string; description: string }, i: number) => (
                  <div key={i} className="relative flex flex-col p-10 md:p-12 rounded-[2rem] bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-colors">
                    <span 
                      className="text-[4rem] font-serif leading-none mb-8 opacity-20"
                      style={{ color: project.accentColor }}
                    >
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl font-serif text-white mb-4">{benefit.title}</h3>
                    <p className="text-base text-white/50 font-light leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── 8. OUTCOMES ─────────────────────────────────────────── */}
      {project.outcomes && project.outcomes.length > 0 && (
        <section className="px-6 lg:px-12 xl:px-16 pb-24 md:pb-32">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32 items-start">
                <div className="lg:sticky lg:top-32">
                  <Eyebrow color={project.accentColor}>What We Delivered</Eyebrow>
                  <h2
                    className="font-serif text-white tracking-tight leading-tight mt-4"
                    style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
                  >
                    Outcomes
                  </h2>
                  <div className="h-px w-12 bg-white/20 mt-8" />
                </div>
                <div className="divide-y divide-white/[0.05]">
                  {project.outcomes.map((outcome, i) => (
                    <div key={i} className="flex gap-6 items-start py-9 first:pt-0">
                      <span className="font-mono text-xs text-white/25 mt-1.5 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-lg lg:text-xl text-white/65 font-light leading-relaxed">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── 9. REFLECTION ───────────────────────────────────────── */}
      {project.reflection && (
        <section className="px-6 lg:px-12 xl:px-16 pb-32 md:pb-48">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="max-w-5xl mx-auto text-center"
            >
              <Quote
                className="w-12 h-12 mx-auto mb-10 opacity-25"
                style={{ color: project.accentColor }}
              />
              <p
                className="font-serif text-white/85 leading-[1.5] tracking-tight"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)" }}
              >
                {project.reflection}
              </p>
              <div className="mt-12 h-px w-20 bg-white/10 mx-auto" />
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── FOOTER CTA ────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-12 xl:px-16 border-t border-white/[0.06] bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.05] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] text-white tracking-tight leading-[1] mb-12">
              Ready to transform your <em className="italic text-primary">industry?</em>
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-medium text-lg tracking-wide transition-all duration-300 hover:scale-105 hover:bg-white/90 shadow-2xl shadow-white/5">
              Work with us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
