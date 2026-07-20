import { useRoute, Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft, ArrowRight,
  BarChart3, TrendingUp, CreditCard, Sparkles, Shield, Lock,
  Search, FileText, Heart, Scale, Users,
  User, GitBranch, ArrowRightLeft, Map, Briefcase, GraduationCap,
  MessageSquare, Brain, Eye, UserCheck, AlertCircle,
  BookOpen, Library, Calendar, Mail, Globe, Mic,
  RefreshCw, Navigation, Bell,
  ArrowUpRight, Zap, CheckCircle2, Lightbulb,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useRef } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  BarChart3, TrendingUp, CreditCard, Sparkles, Shield, Lock,
  Search, FileText, Heart, Scale, Users,
  User, GitBranch, ArrowRightLeft, Map, Briefcase, GraduationCap,
  MessageSquare, Brain, Eye, UserCheck, AlertCircle,
  BookOpen, Library, Calendar, Mail, Globe, Mic,
  RefreshCw, Navigation, Bell,
};

function CapabilityIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className="w-5 h-5" />;
}

function Eyebrow({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      className="text-[10px] font-mono tracking-[0.3em] uppercase mb-4"
      style={{ color: color ?? "rgba(255,255,255,0.3)" }}
    >
      {children}
    </div>
  );
}

function Rule() {
  return <div className="h-px bg-white/[0.07] my-16 md:my-24" />;
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
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  usePageMeta({
    title: project?.name ?? "Case Study",
    description: project?.tagline ?? "",
    url: slug ? `/work/${slug}` : undefined,
    type: "article",
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white/40 gap-8">
        <p className="text-2xl font-serif italic">Project not found.</p>
        <Link href="/work">
          <button className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Gallery
          </button>
        </Link>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const ai = project.aiDeepDive;
  const statusCfg = STATUS_CONFIG[ai.status];

  return (
    <div className="min-h-screen bg-background selection:bg-white/15 selection:text-white overflow-x-hidden">

      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col justify-between pt-28 pb-20 md:pt-40 md:pb-28 px-6 lg:px-12 xl:px-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${project.accentColor}22 0%, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 bg-background/50 pointer-events-none" />

        <div className="max-w-[90rem] mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 md:mb-28"
          >
            <Link href="/work">
              <button className="group flex items-center gap-2.5 text-[10px] font-mono tracking-[0.25em] uppercase text-white/40 hover:text-white/80 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                Gallery
              </button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-12 lg:gap-20 items-end">
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span
                  className="text-[10px] font-mono tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full border border-white/10"
                  style={{ color: project.accentColor, backgroundColor: `${project.accentColor}0f` }}
                >
                  {project.category}
                </span>
                {project.website && (
                  <a
                    href={`https://${project.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-colors"
                  >
                    Live Site
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
              <h1
                className="font-serif text-white tracking-tight leading-[0.93] mb-8 md:mb-10"
                style={{ fontSize: "clamp(3rem, 8.5vw, 9rem)" }}
              >
                {project.name}
              </h1>
              <p
                className="text-white/50 font-light leading-[1.6] max-w-2xl"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
              >
                {project.tagline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-row lg:flex-col gap-8 lg:gap-10 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-8 lg:pt-0 lg:pl-10"
            >
              <div>
                <Eyebrow>Platform</Eyebrow>
                <p className="text-sm font-medium text-white">{project.platform}</p>
              </div>
              <div>
                <Eyebrow>Status</Eyebrow>
                <p className="text-sm font-medium" style={{ color: project.accentColor }}>
                  {project.status}
                </p>
              </div>
              <div>
                <Eyebrow>Services</Eyebrow>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {project.services.slice(0, 2).join(", ")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. HERO IMAGE ───────────────────────────────────── */}
      {project.coverImage && (
        <section className="px-4 md:px-6 lg:px-8 relative z-20 -mt-8 md:-mt-16">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="max-w-[96rem] mx-auto"
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-white/[0.08] bg-zinc-900"
              style={{
                aspectRatio: "21/9",
                boxShadow: `0 60px 120px -30px ${project.accentColor}18`,
              }}
            >
              <img
                src={project.coverImage}
                alt={`${project.name} interface`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── 3. OVERVIEW ─────────────────────────────────────── */}
      <section className="px-6 lg:px-12 xl:px-16 pt-28 md:pt-40 pb-0">
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9 }}
            >
              <h2
                className="font-serif text-white tracking-tight leading-[1.1] mb-14"
                style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
              >
                {project.tagline}
              </h2>
              <div className="space-y-14">
                <div>
                  <Eyebrow color={project.accentColor}>The Opportunity</Eyebrow>
                  <p className="text-[1.05rem] md:text-[1.15rem] text-white/58 font-light leading-[1.8]">
                    {project.opportunity}
                  </p>
                </div>
                <div>
                  <Eyebrow color={project.accentColor}>The Vision</Eyebrow>
                  <p className="text-[1.05rem] md:text-[1.15rem] text-white/58 font-light leading-[1.8]">
                    {project.vision}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="lg:border-l border-white/[0.08] lg:pl-14 space-y-14"
            >
              <div>
                <Eyebrow>Services Delivered</Eyebrow>
                <ul className="space-y-2.5">
                  {project.services.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-sm text-white/70">
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow>Design Principles</Eyebrow>
                <div className="space-y-8">
                  {project.designPrinciples.map((p, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-semibold text-white mb-1.5">{p.title}</h4>
                      <p className="text-sm text-white/45 font-light leading-[1.7]">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="px-6 lg:px-12 xl:px-16">
        <div className="max-w-[90rem] mx-auto">
          <Rule />
        </div>
      </div>

      {/* ─── 4. AI DEEP DIVE ─────────────────────────────────── */}
      <section className="px-6 lg:px-12 xl:px-16 pb-20 md:pb-28 relative overflow-hidden">
        {/* Accent glow behind the section */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${project.accentColor}, transparent)`,
          }}
        />

        <div className="max-w-[90rem] mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-14 md:mb-20"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Eyebrow color={project.accentColor}>AI Integration</Eyebrow>
              {/* Status badge */}
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full border ${statusCfg.bg} ${statusCfg.text} -mt-3`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                {ai.statusLabel}
              </span>
            </div>
            <h2
              className="font-serif text-white tracking-tight leading-[1.05] max-w-4xl"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3.25rem)" }}
            >
              {ai.headline}
            </h2>
          </motion.div>

          {/* Use-case + Implementation — two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 mb-14 md:mb-20">
            {/* Use-Case */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="p-8 md:p-10 rounded-2xl border border-white/[0.07] bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${project.accentColor}18`, color: project.accentColor }}
                >
                  <Lightbulb className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
                  {ai.useCase.label}
                </span>
              </div>
              <p className="text-[1rem] md:text-[1.05rem] text-white/65 font-light leading-[1.85]">
                {ai.useCase.body}
              </p>
            </motion.div>

            {/* Implementation */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="p-8 md:p-10 rounded-2xl border border-white/[0.07] bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${project.accentColor}18`, color: project.accentColor }}
                >
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
                  {ai.implementation.label}
                </span>
              </div>
              <p className="text-[1rem] md:text-[1.05rem] text-white/65 font-light leading-[1.85]">
                {ai.implementation.body}
              </p>
            </motion.div>
          </div>

          {/* Benefits — full-width row */}
          <div>
            <div className="flex items-center gap-5 mb-10">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${project.accentColor}18`, color: project.accentColor }}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
                Benefits to Users
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {ai.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-7 rounded-2xl border border-white/[0.08] bg-white/[0.025] relative overflow-hidden group"
                >
                  {/* Subtle number watermark */}
                  <div
                    className="absolute top-4 right-5 text-[4rem] font-serif leading-none select-none pointer-events-none opacity-[0.04]"
                    style={{ color: project.accentColor }}
                  >
                    {i + 1}
                  </div>
                  <div
                    className="w-1.5 h-1.5 rounded-full mb-5"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <h4 className="text-sm font-semibold text-white mb-3 leading-snug">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-white/50 font-light leading-[1.75]">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 lg:px-12 xl:px-16">
        <div className="max-w-[90rem] mx-auto">
          <Rule />
        </div>
      </div>

      {/* ─── 4.5 AI LAYERS ───────────────────────────────────── */}
      {project.aiLayers && project.aiLayers.length > 0 && (
        <section className="px-6 lg:px-12 xl:px-16 pb-24 md:pb-32">
          <div className="max-w-[90rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="mb-12 md:mb-16"
            >
              <Eyebrow color={project.accentColor}>Intelligence Architecture</Eyebrow>
              <h2
                className="font-serif text-white tracking-tight leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Three layers. One coherent system.
              </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-stretch">
              {project.aiLayers.map((layer, i, arr) => (
                <div key={i} className="flex flex-col lg:flex-row items-stretch flex-1 min-w-0">
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: i * 0.12 }}
                    className="flex-1 min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.025] overflow-hidden flex flex-col"
                  >
                    {/* Layer header */}
                    <div
                      className="px-7 pt-7 pb-6 border-b border-white/[0.06]"
                      style={{ background: `linear-gradient(135deg, ${project.accentColor}0a 0%, transparent 60%)` }}
                    >
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${project.accentColor}18`, color: project.accentColor }}
                        >
                          <CapabilityIcon name={layer.icon} />
                        </div>
                        <span
                          className="text-[3.5rem] font-serif leading-none select-none opacity-[0.07] -mt-1"
                          style={{ color: project.accentColor }}
                        >
                          {layer.number}
                        </span>
                      </div>
                      <h3 className="text-[0.95rem] font-semibold text-white mb-1.5 leading-snug">{layer.name}</h3>
                      <p className="text-xs text-white/40 font-light leading-relaxed">{layer.role}</p>
                    </div>

                    {/* Data flow */}
                    <div className="px-7 py-6 flex flex-col gap-4 flex-1">
                      <div>
                        <div className="text-[9px] font-mono tracking-[0.25em] uppercase mb-2" style={{ color: `${project.accentColor}80` }}>Input</div>
                        <p className="text-[0.8rem] text-white/50 font-light leading-[1.65]">{layer.input}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${project.accentColor}40, ${project.accentColor}10)` }} />
                        <div className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0" style={{ borderColor: `${project.accentColor}30` }}>
                          <Zap className="w-2.5 h-2.5" style={{ color: project.accentColor }} />
                        </div>
                        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${project.accentColor}10, ${project.accentColor}40)` }} />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono tracking-[0.25em] uppercase mb-2 text-white/25">Process</div>
                        <p className="text-[0.8rem] text-white/45 font-light leading-[1.65]">{layer.process}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${project.accentColor}40, ${project.accentColor}10)` }} />
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: project.accentColor }} />
                        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${project.accentColor}10, ${project.accentColor}40)` }} />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono tracking-[0.25em] uppercase mb-2" style={{ color: `${project.accentColor}80` }}>Output</div>
                        <p className="text-[0.8rem] font-medium leading-[1.65]" style={{ color: `${project.accentColor}cc` }}>{layer.output}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Connector arrow between cards */}
                  {i < arr.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center w-10 flex-shrink-0">
                      <ArrowRight className="w-4 h-4 text-white/15" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 5. CAPABILITIES ─────────────────────────────────── */}
      <section className="px-6 lg:px-12 xl:px-16 pb-28 md:pb-40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-[90rem] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-20"
          >
            <Eyebrow color={project.accentColor}>Capabilities</Eyebrow>
            <h2
              className="font-serif text-white tracking-tight leading-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 5rem)" }}
            >
              System Intelligence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {project.capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="group p-7 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${project.accentColor}18`, color: project.accentColor }}
                >
                  <CapabilityIcon name={cap.icon} />
                </div>
                <h3 className="text-[0.95rem] font-semibold text-white mb-2.5 leading-snug">{cap.title}</h3>
                <p className="text-sm text-white/45 font-light leading-[1.75]">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. GALLERY ──────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="border-t border-white/[0.06] px-6 lg:px-12 xl:px-16 pt-28 md:pt-40 pb-28 md:pb-40">
          <div className="max-w-[90rem] mx-auto">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="flex items-end justify-between gap-8 mb-14 md:mb-18"
            >
              <div>
                <Eyebrow color={project.accentColor}>Gallery</Eyebrow>
                <h2
                  className="font-serif text-white tracking-tight leading-tight"
                  style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
                >
                  Interface &amp; Experience
                </h2>
              </div>
              <span className="text-[10px] font-mono text-white/25 pb-1 flex-shrink-0">
                {String(project.gallery.length).padStart(2, "0")} screens
              </span>
            </motion.div>

            {/* 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {project.gallery.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.1 }}
                  className="flex flex-col gap-5"
                >
                  {/* Image tile */}
                  <div
                    className="relative w-full overflow-hidden rounded-xl md:rounded-2xl bg-zinc-900 border border-white/[0.07]"
                    style={{ aspectRatio: "16/10" }}
                  >
                    {item.imagePath ? (
                      <img
                        src={item.imagePath}
                        alt={item.label}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background: `radial-gradient(ellipse at 50% 40%, ${project.accentColor}18 0%, transparent 70%)`,
                        }}
                      >
                        <span className="font-serif italic text-white/20 text-2xl">{item.label}</span>
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div className="flex items-start gap-4 px-1">
                    <span className="text-[1.6rem] font-serif leading-none text-white/[0.08] select-none tabular-nums flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug">{item.label}</h3>
                      <p className="text-xs md:text-[0.8rem] text-white/40 font-light leading-[1.75]">{item.description}</p>
                    </div>
                    <span
                      className="ml-auto text-[9px] font-mono tracking-[0.2em] uppercase flex-shrink-0 mt-0.5 opacity-50"
                      style={{ color: project.accentColor }}
                    >
                      {item.type ?? "screen"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ─── 7. OUTCOMES + REFLECTION ────────────────────────── */}
      <section className="border-t border-white/[0.06] px-6 lg:px-12 xl:px-16 py-28 md:py-40">
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28">
            {project.outcomes && project.outcomes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              >
                <Eyebrow color={project.accentColor}>Results</Eyebrow>
                <h2
                  className="font-serif text-white tracking-tight leading-tight mb-12"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                  Outcomes
                </h2>
                <ul className="space-y-8">
                  {project.outcomes.map((outcome, i) => (
                    <li key={i} className="flex gap-6 items-start">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${project.accentColor}18`, color: project.accentColor }}
                      >
                        <span className="text-[11px] font-semibold tabular-nums">{i + 1}</span>
                      </div>
                      <p className="text-[1rem] md:text-[1.05rem] text-white/65 font-light leading-[1.8]">
                        {outcome}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {project.reflection && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="lg:border-l border-white/[0.08] lg:pl-16 flex flex-col justify-center"
              >
                <Eyebrow color={project.accentColor}>Reflection</Eyebrow>
                <div className="font-serif leading-none text-[6rem] md:text-[8rem] text-white/[0.06] select-none -mb-6 -ml-1">
                  "
                </div>
                <p
                  className="font-serif italic text-white/70 leading-[1.55]"
                  style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)" }}
                >
                  {project.reflection}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ─── 8. PREV / NEXT ──────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
          {prevProject ? (
            <Link href={`/work/${prevProject.slug}`}>
              <div className="group relative p-12 md:p-20 lg:p-28 cursor-pointer overflow-hidden transition-colors hover:bg-white/[0.02]">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-700"
                  style={{ background: `radial-gradient(ellipse at 30% 50%, ${prevProject.accentColor}, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-white/30 mb-6 group-hover:text-white/50 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    Previous
                  </div>
                  <h3
                    className="font-serif text-white/70 group-hover:text-white transition-colors leading-tight"
                    style={{ fontSize: "clamp(1.75rem, 3.5vw, 3.25rem)" }}
                  >
                    {prevProject.name}
                  </h3>
                </div>
              </div>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}

          {nextProject ? (
            <Link href={`/work/${nextProject.slug}`}>
              <div className="group relative p-12 md:p-20 lg:p-28 cursor-pointer overflow-hidden transition-colors hover:bg-white/[0.02] text-right">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-700"
                  style={{ background: `radial-gradient(ellipse at 70% 50%, ${nextProject.accentColor}, transparent 70%)` }}
                />
                <div className="relative z-10 flex flex-col items-end">
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-white/30 mb-6 group-hover:text-white/50 transition-colors">
                    Next
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3
                    className="font-serif text-white/70 group-hover:text-white transition-colors leading-tight"
                    style={{ fontSize: "clamp(1.75rem, 3.5vw, 3.25rem)" }}
                  >
                    {nextProject.name}
                  </h3>
                </div>
              </div>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>
      </section>
    </div>
  );
}
