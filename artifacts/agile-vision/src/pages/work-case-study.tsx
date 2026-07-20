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
  ArrowUpRight, Zap, CheckCircle2, Lightbulb, Image as ImageIcon,
  Quote,
  Check
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
  return <Icon className="w-6 h-6" />;
}

function Eyebrow({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      className="text-xs font-mono tracking-[0.3em] uppercase mb-6"
      style={{ color: color ?? "rgba(255,255,255,0.4)" }}
    >
      {children}
    </div>
  );
}

function Rule() {
  return <div className="h-px bg-white/[0.07] my-32 md:my-48 max-w-[120rem] mx-auto w-full" />;
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
  const statusCfg = STATUS_CONFIG[ai.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.live;

  return (
    <div className="min-h-screen bg-[#090909] selection:bg-white/15 selection:text-white overflow-x-hidden">
      
      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 lg:px-12 xl:px-16"
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
            className="mb-24"
          >
            <Link href="/work">
              <button className="group flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
                Back to Gallery
              </button>
            </Link>
          </motion.div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-16"
          >
            <div className="max-w-6xl">
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <span
                  className="text-xs font-mono tracking-[0.25em] uppercase px-4 py-2 rounded-full border border-white/10"
                  style={{ color: project.accentColor, backgroundColor: `${project.accentColor}10` }}
                >
                  {project.category}
                </span>
                {project.website && (
                  <a
                    href={`https://${project.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
                  >
                    Visit Live Site
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
              <h1
                className="font-serif text-white tracking-tight leading-[0.9]"
                style={{ fontSize: "clamp(4rem, 10vw, 12rem)" }}
              >
                {project.name}
              </h1>
            </div>

            <div className="flex flex-col gap-10 lg:text-right lg:min-w-[300px]">
              <p
                className="text-white/60 font-light leading-relaxed max-w-xl lg:ml-auto"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)" }}
              >
                {project.tagline}
              </p>
              <div className="grid grid-cols-2 gap-8 lg:flex lg:flex-col lg:items-end lg:gap-8 border-t lg:border-t-0 border-white/10 pt-8 lg:pt-0">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-2">Platform</div>
                  <div className="text-lg font-medium text-white">{project.platform}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-2">Status</div>
                  <div className="text-lg font-medium" style={{ color: project.accentColor }}>{project.status}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. HERO IMAGE FULL BLEED ───────────────────────────── */}
      {project.coverImage && (
        <section className="relative z-20 w-full mb-32 md:mb-48">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="w-full"
          >
            <div
              className="relative w-full h-[50vh] md:h-[85vh] bg-zinc-900 border-y border-white/10"
              style={{
                boxShadow: `0 0 150px -40px ${project.accentColor}30`,
              }}
            >
              <img
                src={project.coverImage}
                alt={`${project.name} interface`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </section>
      )}

      <div className="px-6 lg:px-12 xl:px-16">
        <div className="max-w-[120rem] mx-auto">
          {/* ─── 3. OPPORTUNITY (MASSIVE STATEMENT) ────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="mb-32 md:mb-48 max-w-7xl"
          >
            <Eyebrow color={project.accentColor}>The Opportunity</Eyebrow>
            <h2 className="text-white font-light leading-[1.3] tracking-tight" style={{ fontSize: "clamp(2rem, 4vw, 4.5rem)" }}>
              {project.opportunity}
            </h2>
          </motion.section>

          {/* ─── 4. VISION & PRINCIPLES ───────────────────────────────── */}
          <section className="mb-32 md:mb-48">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
              >
                <Eyebrow color={project.accentColor}>The Vision</Eyebrow>
                <p className="text-white/70 font-light leading-relaxed text-xl md:text-3xl">
                  {project.vision}
                </p>
                
                <div className="mt-16">
                  <Eyebrow>Services Provided</Eyebrow>
                  <div className="flex flex-wrap gap-3">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="text-sm font-medium text-white/70 bg-white/5 border border-white/10 rounded-full px-5 py-2.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-16 lg:border-l border-white/10 lg:pl-20"
              >
                <div>
                  <Eyebrow>Design Principles</Eyebrow>
                  <div className="space-y-10">
                    {project.designPrinciples.map((p, i) => (
                      <div key={i} className="relative">
                        <h4 className="text-2xl font-serif text-white mb-3 tracking-tight">{p.title}</h4>
                        <p className="text-lg text-white/50 font-light leading-relaxed">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ─── 5. USERS ─────────────────────────────────────────────── */}
          {project.users && project.users.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="mb-32 md:mb-48 py-20 border-y border-white/10"
            >
              <Eyebrow color={project.accentColor}>Built For</Eyebrow>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 md:gap-8">
                {project.users.map((user, i) => (
                  <div key={i} className="flex flex-col">
                    <span 
                      className="text-6xl font-serif mb-6 opacity-20"
                      style={{ color: project.accentColor }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-2xl font-medium text-white mb-4">{user.title}</h4>
                    <p className="text-lg text-white/50 font-light leading-relaxed">{user.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ─── 6. AI DEEP DIVE ──────────────────────────────────────── */}
          <section className="mb-32 md:mb-48 relative">
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 pointer-events-none"
              style={{ backgroundColor: project.accentColor }}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <div className="flex flex-wrap items-center gap-6 mb-12">
                <Eyebrow color={project.accentColor}>AI Architecture</Eyebrow>
                <span className={`inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border ${statusCfg.bg} ${statusCfg.text} -mt-6`}>
                  <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                  {ai.statusLabel}
                </span>
              </div>
              
              <h2 className="font-serif text-white tracking-tight leading-[1.1] mb-24 max-w-6xl" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
                {ai.headline}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                <div className="p-12 md:p-16 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-4 mb-8">
                    <Lightbulb className="w-8 h-8" style={{ color: project.accentColor }} />
                    <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-white/60">{ai.useCase.label}</h3>
                  </div>
                  <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">{ai.useCase.body}</p>
                </div>
                
                <div className="p-12 md:p-16 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-4 mb-8">
                    <Zap className="w-8 h-8" style={{ color: project.accentColor }} />
                    <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-white/60">{ai.implementation.label}</h3>
                  </div>
                  <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">{ai.implementation.body}</p>
                </div>
              </div>

              <div>
                <Eyebrow>The AI Advantage</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
                  {ai.benefits.map((benefit, i) => (
                    <div key={i}>
                      <div 
                        className="w-16 h-1 bg-white/20 mb-8"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <h4 className="text-2xl font-serif text-white mb-4">{benefit.title}</h4>
                      <p className="text-lg text-white/60 font-light leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* ─── 7. AI LAYERS (OPTIONAL) ──────────────────────────────── */}
          {project.aiLayers && project.aiLayers.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="mb-32 md:mb-48"
            >
              <Eyebrow color={project.accentColor}>Processing Pipeline</Eyebrow>
              <div className="flex flex-col gap-12">
                {project.aiLayers.map((layer, i) => (
                  <div 
                    key={i} 
                    className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 p-12 lg:p-16 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] relative overflow-hidden group"
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
                    />
                    
                    <div className="relative z-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-6 mb-8">
                          <span className="text-5xl font-serif text-white/20">{layer.number}</span>
                          <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10"
                            style={{ color: project.accentColor }}
                          >
                            <CapabilityIcon name={layer.icon} />
                          </div>
                        </div>
                        <h3 className="text-3xl font-serif text-white mb-4">{layer.name}</h3>
                        <p className="text-xl text-white/50 font-light">{layer.role}</p>
                      </div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
                      <div className="space-y-4">
                        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">Input</div>
                        <p className="text-base text-white/70 font-light leading-relaxed">{layer.input}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">Process</div>
                        <p className="text-base text-white/70 font-light leading-relaxed">{layer.process}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">Output</div>
                        <p className="text-base text-white/70 font-light leading-relaxed">{layer.output}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ─── 8. CAPABILITIES ──────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="mb-32 md:mb-48"
          >
            <Eyebrow color={project.accentColor}>Core Capabilities</Eyebrow>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Prominent First Capability */}
              <div className="lg:col-span-7 p-12 lg:p-20 rounded-[3rem] bg-white/[0.03] border border-white/[0.05] flex flex-col justify-center">
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center bg-white/5 border border-white/10 mb-12"
                  style={{ color: project.accentColor }}
                >
                  <CapabilityIcon name={project.capabilities[0].icon} />
                </div>
                <h3 className="text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">{project.capabilities[0].title}</h3>
                <p className="text-xl lg:text-2xl text-white/60 font-light leading-relaxed">{project.capabilities[0].description}</p>
              </div>
              
              {/* Supporting Grid */}
              <div className="lg:col-span-5 grid grid-cols-1 gap-8">
                {project.capabilities.slice(1).map((cap, i) => (
                  <div key={i} className="p-10 rounded-[2rem] bg-white/[0.015] border border-white/[0.05] flex items-start gap-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center bg-white/5 border border-white/10 mt-1"
                      style={{ color: project.accentColor }}
                    >
                      <CapabilityIcon name={cap.icon} />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-white mb-2">{cap.title}</h4>
                      <p className="text-base text-white/50 font-light leading-relaxed">{cap.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ─── 9. GALLERY ───────────────────────────────────────────── */}
          <section className="mb-32 md:mb-48 space-y-16">
            <Eyebrow color={project.accentColor}>Visual Showcase</Eyebrow>
            {project.gallery.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="w-full flex flex-col"
              >
                <div 
                  className={`relative w-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center ${i === 0 ? 'aspect-[21/9] md:aspect-[2.5/1]' : 'aspect-video'}`}
                >
                  {item.imagePath ? (
                    <img 
                      src={item.imagePath} 
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-6 p-12 text-center">
                      <div 
                        className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10"
                        style={{ boxShadow: `0 0 60px -10px ${project.accentColor}50` }}
                      >
                        <ImageIcon className="w-10 h-10" style={{ color: project.accentColor }} />
                      </div>
                      <div className="text-3xl font-serif text-white/40">{item.label}</div>
                    </div>
                  )}
                </div>
                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
                  <h4 className="text-xl font-medium text-white">{item.label}</h4>
                  <p className="text-lg text-white/50 font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* ─── 10. OUTCOMES & REFLECTION ────────────────────────────── */}
          <section className="mb-32 md:mb-48">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
              >
                <Eyebrow color={project.accentColor}>Outcomes</Eyebrow>
                <ul className="space-y-12">
                  {project.outcomes.map((outcome, i) => (
                    <li key={i} className="flex gap-8 items-start">
                      <div 
                        className="mt-2 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-white/5"
                        style={{ color: project.accentColor }}
                      >
                        <Check className="w-5 h-5" />
                      </div>
                      <p className="text-2xl lg:text-3xl text-white/90 font-light leading-relaxed">{outcome}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="lg:border-l border-white/10 lg:pl-20 flex flex-col justify-center"
              >
                <Quote className="w-16 h-16 text-white/10 mb-12" />
                <p className="text-3xl lg:text-5xl font-serif text-white leading-[1.3] tracking-tight italic">
                  "{project.reflection}"
                </p>
              </motion.div>
            </div>
          </section>

        </div>
      </div>

      {/* ─── 11. PREV / NEXT NAVIGATION ────────────────────────────── */}
      <section className="border-t border-white/10 grid grid-cols-1 md:grid-cols-2 min-h-[40vh]">
        {prevProject ? (
          <Link
            href={`/work/${prevProject.slug}`}
            className="group relative p-16 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 overflow-hidden hover:bg-white/[0.02] transition-colors"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"
              style={{ backgroundColor: prevProject.accentColor }}
            />
            <Eyebrow>Previous Project</Eyebrow>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 transition-transform duration-500 group-hover:-translate-y-2">
              {prevProject.name}
            </h3>
            <div className="flex items-center gap-4 text-white/50 group-hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6 transition-transform duration-500 group-hover:-translate-x-2" />
              <span className="text-sm font-mono uppercase tracking-widest">View Project</span>
            </div>
          </Link>
        ) : (
          <div className="p-16 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 opacity-30">
            <Eyebrow>Previous Project</Eyebrow>
            <div className="text-4xl md:text-5xl font-serif text-white/30">End of Gallery</div>
          </div>
        )}

        {nextProject ? (
          <Link
            href={`/work/${nextProject.slug}`}
            className="group relative p-16 md:p-24 flex flex-col justify-center text-right items-end overflow-hidden hover:bg-white/[0.02] transition-colors"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"
              style={{ backgroundColor: nextProject.accentColor }}
            />
            <Eyebrow>Next Project</Eyebrow>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 transition-transform duration-500 group-hover:-translate-y-2">
              {nextProject.name}
            </h3>
            <div className="flex items-center gap-4 text-white/50 group-hover:text-white transition-colors">
              <span className="text-sm font-mono uppercase tracking-widest">View Project</span>
              <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
            </div>
          </Link>
        ) : (
          <div className="p-16 md:p-24 flex flex-col justify-center text-right items-end opacity-30">
            <Eyebrow>Next Project</Eyebrow>
            <div className="text-4xl md:text-5xl font-serif text-white/30">End of Gallery</div>
          </div>
        )}
      </section>

    </div>
  );
}
