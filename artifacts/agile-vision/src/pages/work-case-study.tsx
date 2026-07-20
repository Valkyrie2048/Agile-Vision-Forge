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
  Star, Handshake, Newspaper,
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

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const ai = project.aiDeepDive;
  const statusCfg = STATUS_CONFIG[ai.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.live;
  const displayGallery = project.gallery.filter(item => item.imagePath);

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
                style={{ fontSize: "clamp(3rem, 6vw, 7rem)" }}
              >
                {project.name}
              </h1>
            </div>

            <div className="flex flex-col gap-10 lg:text-right lg:min-w-[300px]">
              <p
                className="text-white/60 font-light leading-relaxed max-w-xl lg:ml-auto"
                style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
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

      {/* ─── 2.3. AI FEATURES ──────────────────────────────────────────── */}
      {project.aiRole && project.aiRole.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-6 lg:px-12 xl:px-16 mb-12"
        >
          <div className="max-w-[120rem] mx-auto">
            <div className="border-y border-white/[0.06] py-10">
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="text-[10px] font-mono tracking-[0.35em] uppercase"
                  style={{ color: project.accentColor }}
                >
                  AI Capabilities
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.aiRole.map((role, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <span className="text-sm font-mono text-white/80 leading-snug">{role.title}</span>
                    </div>
                    <p className="text-xs text-white/40 font-light leading-relaxed pl-[18px]">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 2.5. PROJECT BRIEF ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="px-6 lg:px-12 xl:px-16 mb-24 md:mb-32"
      >
        <div className="max-w-[120rem] mx-auto">
          <div className="border-t border-white/[0.07] pt-16 flex flex-col md:flex-row gap-8 md:gap-24">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 flex-shrink-0 mt-1">Project Brief</span>
            <p className="text-base md:text-lg text-white/55 font-light leading-relaxed max-w-4xl">{project.summary}</p>
          </div>
        </div>
      </motion.div>

      {/* ─── 3. OPPORTUNITY ──────────────────────────────────────────── */}
      <div className="px-6 lg:px-12 xl:px-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="mb-32 md:mb-48 max-w-5xl"
          >
            <div
              className="border-l-2 pl-8 md:pl-12 mb-0"
              style={{ borderColor: project.accentColor }}
            >
              <p className="text-white/80 font-light leading-[1.6] tracking-tight" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.5rem)" }}>
                {project.opportunity}
              </p>
            </div>
          </motion.section>
        </div>
      </div>

      {/* ─── 4. VISION & PRINCIPLES ───────────────────────────────── */}
      <section className="mb-32 md:mb-48 relative border-y border-white/[0.06]" style={{ backgroundColor: `${project.accentColor}09` }}>
        <div className="px-6 lg:px-12 xl:px-16 py-32 md:py-48">
          <div className="max-w-[120rem] mx-auto">

            {/* Vision — full editorial width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="mb-24 md:mb-32 max-w-5xl"
            >
              <Eyebrow color={project.accentColor}>The Vision</Eyebrow>
              <p
                className="text-white/85 font-light leading-[1.55] tracking-tight"
                style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.5rem)" }}
              >
                {project.vision}
              </p>
            </motion.div>

            {/* Services — inline list, no pills */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-24 md:mb-40 border-t border-white/[0.06] pt-12"
            >
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mr-8">Services</span>
              <span className="text-sm text-white/40 font-light">
                {project.services.join(" · ")}
              </span>
            </motion.div>

            {/* Design Principles — with large numbered anchors */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Eyebrow>Design Principles</Eyebrow>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 mt-12">
                {project.designPrinciples.map((p, i) => (
                  <div key={i} className="relative pl-0 group">
                    <div
                      className="text-[5rem] font-serif leading-none tabular-nums select-none mb-4"
                      style={{ color: `${project.accentColor}20` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h4 className="text-xl lg:text-2xl font-serif text-white mb-3 tracking-tight leading-tight">{p.title}</h4>
                    <p className="text-sm lg:text-base text-white/55 font-light leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 5. USERS (ASYMMETRIC/CHARACTER FOCUSED) ─────────────────────────────────────────────── */}
      {project.users && project.users.length > 0 && (
        <div className="px-6 lg:px-12 xl:px-16">
          <div className="max-w-[120rem] mx-auto">
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="mb-32 md:mb-48"
            >
              <Eyebrow color={project.accentColor}>Built For</Eyebrow>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mt-20">
                {project.users.map((user, i) => (
                  <div key={i} className={`flex flex-col relative ${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
                    <span 
                      className="absolute -top-24 -left-6 text-[10rem] md:text-[14rem] font-serif leading-none opacity-[0.055] select-none"
                      style={{ color: project.accentColor }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative z-10 pt-8 border-t border-white/20">
                      <h4 className="text-2xl lg:text-3xl font-serif text-white mb-4">{user.title}</h4>
                      <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-lg">{user.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      )}

      {/* ─── 6. AI DEEP DIVE (TECHNICAL & DRAMATIC) ──────────────────────────────────────── */}
      <section className="mb-32 md:mb-48 relative border-y border-white/10 overflow-hidden bg-black">
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
                
                <h2 className="font-serif text-white tracking-tight leading-[1.05] max-w-6xl mx-auto" style={{ fontSize: "clamp(2rem, 3.5vw, 3.75rem)" }}>
                  {ai.headline}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
                <div className="p-12 md:p-16 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ color: project.accentColor }}>
                        <Lightbulb className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-white/60">{ai.useCase.label}</h3>
                    </div>
                    <p className="text-base text-white/75 font-light leading-relaxed">{ai.useCase.body}</p>
                  </div>
                </div>
                
                <div className="p-12 md:p-16 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ color: project.accentColor }}>
                        <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-white/60">{ai.implementation.label}</h3>
                    </div>
                    <p className="text-base text-white/75 font-light leading-relaxed">{ai.implementation.body}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.08] mt-24">
                <div className="mb-10 pt-12">
                  <Eyebrow color={project.accentColor}>The AI Advantage</Eyebrow>
                </div>
                {ai.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex gap-10 lg:gap-16 items-start py-12 border-b border-white/[0.06] group"
                  >
                    <span
                      className="text-[3rem] lg:text-[4rem] font-serif leading-none flex-shrink-0 tabular-nums select-none"
                      style={{ color: `${project.accentColor}35` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1">
                      <h4 className="text-lg lg:text-xl font-serif text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-white/55 font-light leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="px-6 lg:px-12 xl:px-16">
        <div className="max-w-[120rem] mx-auto">
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
              <div className="flex flex-col gap-8">
                {project.aiLayers.map((layer, i) => (
                  <div 
                    key={i} 
                    className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-12 p-12 lg:p-16 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] relative overflow-hidden group"
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
                    />
                    
                    <div className="relative z-10 flex flex-col justify-center">
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
                        <h3 className="text-2xl lg:text-3xl font-serif text-white mb-4 tracking-tight">{layer.name}</h3>
                        <p className="text-sm text-white/50 font-light">{layer.role}</p>
                      </div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">Input</div>
                        <p className="text-sm text-white/70 font-light leading-relaxed">{layer.input}</p>
                      </div>
                      <div className="space-y-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">Process</div>
                        <p className="text-sm text-white/70 font-light leading-relaxed">{layer.process}</p>
                      </div>
                      <div className="space-y-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">Output</div>
                        <p className="text-sm text-white/70 font-light leading-relaxed">{layer.output}</p>
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

            <div className="grid grid-cols-1 gap-6 mt-10">
              {/* Hero capability — accent left border strip */}
              <div
                className="relative rounded-[2.5rem] overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${project.accentColor}0D 0%, transparent 60%)` }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[2.5rem]"
                  style={{ backgroundColor: project.accentColor }}
                />
                <div className="p-12 lg:p-20 pl-14 lg:pl-24">
                  <div className="flex items-start gap-8 mb-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0"
                      style={{ color: project.accentColor }}
                    >
                      <CapabilityIcon name={project.capabilities[0].icon} />
                    </div>
                    <div className="text-[10px] font-mono tracking-[0.3em] uppercase pt-4" style={{ color: `${project.accentColor}80` }}>
                      Primary Capability
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-serif text-white mb-5 leading-[1.1] max-w-3xl">
                    {project.capabilities[0].title}
                  </h3>
                  <p className="text-sm lg:text-base text-white/65 font-light leading-relaxed max-w-3xl">
                    {project.capabilities[0].description}
                  </p>
                </div>
              </div>

              {/* Supporting grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {project.capabilities.slice(1).map((cap, i) => (
                  <div
                    key={i}
                    className="p-8 lg:p-10 rounded-[2rem] bg-white/[0.018] border border-white/[0.06] flex flex-col group hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 mb-7 group-hover:border-white/20 transition-colors"
                      style={{ color: project.accentColor }}
                    >
                      <CapabilityIcon name={cap.icon} />
                    </div>
                    <h4 className="text-lg lg:text-xl font-serif text-white mb-3 leading-tight">{cap.title}</h4>
                    <p className="text-sm text-white/50 font-light leading-relaxed mt-auto">{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* ─── 9. GALLERY (EDITORIAL SPREAD) ───────────────────────────────────────────── */}
      <section className="mb-32 md:mb-48 relative">
        <div className="w-full flex flex-col gap-12 md:gap-24">
          {displayGallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="w-full"
            >
              {/* Item 0: Full bleed, tall */}
              <div className="w-full h-[60vh] md:h-[90vh] relative bg-zinc-900 overflow-hidden border-y border-white/10 group">
                <img 
                  src={displayGallery[0].imagePath!} 
                  alt={displayGallery[0].label}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="px-6 lg:px-12 xl:px-16 mt-8">
                <div className="max-w-[120rem] mx-auto border-t border-white/[0.06] pt-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex items-baseline gap-4 flex-shrink-0">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: `${project.accentColor}70` }}>01</span>
                    <h4 className="text-lg font-serif text-white/80">{displayGallery[0].label}</h4>
                  </div>
                  <p className="text-base text-white/45 font-light leading-relaxed max-w-2xl">{displayGallery[0].description}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Items 1 & 2: Side-by-side */}
          {displayGallery.length > 1 && (
            <div className="px-6 lg:px-12 xl:px-16">
              <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                {displayGallery.slice(1, 3).map((item, i) => (
                  <motion.div
                    key={`pair-${i}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="flex flex-col"
                  >
                    <div className="w-full aspect-[4/3] rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden mb-8 group relative">
                      <img 
                        src={item.imagePath!} 
                        alt={item.label}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                    <div className="border-t border-white/[0.06] pt-5 flex items-baseline gap-4 mb-3">
                      <span className="text-[10px] font-mono tracking-[0.3em] uppercase flex-shrink-0" style={{ color: `${project.accentColor}70` }}>
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <h4 className="text-lg font-serif text-white/80">{item.label}</h4>
                    </div>
                    <p className="text-sm text-white/40 font-light leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Items 3+: Alternating full or portrait */}
          {displayGallery.length > 3 && (
            <div className="px-6 lg:px-12 xl:px-16">
               <div className="max-w-[120rem] mx-auto space-y-24">
                  {displayGallery.slice(3).map((item, i) => {
                    const isFullWidth = i % 3 === 0;
                    return (
                      <motion.div
                        key={`rest-${i}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className={`flex flex-col ${isFullWidth ? '' : 'max-w-4xl mx-auto'}`}
                      >
                         <div className={`w-full bg-zinc-900 border border-white/10 overflow-hidden mb-8 rounded-3xl group relative ${isFullWidth ? 'aspect-video md:aspect-[21/9]' : 'aspect-square md:aspect-[4/3]'}`}>
                            <img 
                              src={item.imagePath!} 
                              alt={item.label}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                            />
                         </div>
                         <div className={`border-t border-white/[0.06] pt-5 flex flex-col ${isFullWidth ? 'md:flex-row md:items-start md:justify-between gap-6' : 'gap-2'}`}>
                           <div className="flex items-baseline gap-4 flex-shrink-0">
                             <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: `${project.accentColor}70` }}>
                               {String(i + 4).padStart(2, "0")}
                             </span>
                             <h4 className="text-lg font-serif text-white/80">{item.label}</h4>
                           </div>
                           <p className={`text-sm text-white/40 font-light leading-relaxed ${isFullWidth ? 'max-w-2xl' : ''}`}>{item.description}</p>
                         </div>
                      </motion.div>
                    )
                  })}
               </div>
            </div>
          )}
        </div>
      </section>

      <div className="px-6 lg:px-12 xl:px-16">
        <div className="max-w-[120rem] mx-auto">
          {/* ─── 10. OUTCOMES ────────────────────────────────────────────── */}
          <section className="mb-0 border-t border-white/10 pt-32">
            <Eyebrow color={project.accentColor}>The Outcomes</Eyebrow>
            <div className="mt-16">
              {project.outcomes.map((outcome, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  className="flex gap-10 items-start py-10 border-b border-white/[0.06] group"
                >
                  <span
                    className="text-[3.5rem] lg:text-[4.5rem] font-serif leading-none flex-shrink-0 tabular-nums select-none transition-opacity duration-500 group-hover:opacity-40"
                    style={{ color: `${project.accentColor}28` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base lg:text-lg text-white/75 font-light leading-relaxed pt-3 group-hover:text-white/90 transition-colors duration-500">
                    {outcome}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ─── 10b. REFLECTION (FULL WIDTH) ────────────────────────────── */}
      <section className="my-32 md:my-48 border-y border-white/10 py-32 md:py-48 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${project.accentColor}08 0%, transparent 70%)` }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="px-6 lg:px-12 xl:px-16 max-w-[100rem] mx-auto text-center"
        >
          <Quote className="w-10 h-10 mx-auto mb-12 text-white/10" />
          <p
            className="font-serif text-white/90 leading-[1.4] tracking-tight mx-auto"
            style={{ fontSize: "clamp(1.1rem, 2vw, 2rem)", maxWidth: "56rem" }}
          >
            "{project.reflection}"
          </p>
        </motion.div>
      </section>

      <div className="px-6 lg:px-12 xl:px-16">
        <div className="max-w-[120rem] mx-auto">

          {/* ─── 11. NEXT/PREV NAVIGATION ─────────────────────────────── */}
          <section className="pb-32 md:pb-48">
            <div className="flex flex-col sm:flex-row gap-6">
              {prevProject && (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="flex-1 group relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] p-12 lg:p-16 hover:bg-white/[0.04] transition-all duration-300 hover:border-white/10"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(45deg, ${prevProject.accentColor}, transparent)` }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-white/20 group-hover:text-white/40 transition-colors">←</span>
                      <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/30">Previous</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-serif text-white tracking-tight mb-3 group-hover:text-white transition-colors">{prevProject.name}</h3>
                    <p className="text-sm text-white/35 font-light line-clamp-2 group-hover:text-white/50 transition-colors">{prevProject.tagline}</p>
                  </div>
                </Link>
              )}
              {nextProject && (
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="flex-1 group relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] p-12 lg:p-16 hover:bg-white/[0.04] transition-all duration-300 hover:border-white/10 text-right"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(225deg, ${nextProject.accentColor}, transparent)` }} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-end gap-3 mb-8">
                      <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/30">Next</span>
                      <span className="text-white/20 group-hover:text-white/40 transition-colors">→</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-serif text-white tracking-tight mb-3 group-hover:text-white transition-colors">{nextProject.name}</h3>
                    <p className="text-sm text-white/35 font-light line-clamp-2 group-hover:text-white/50 transition-colors">{nextProject.tagline}</p>
                  </div>
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
