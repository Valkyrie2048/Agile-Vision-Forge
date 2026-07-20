import { useRoute, Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ExternalLink,
  BarChart3, TrendingUp, CreditCard, Sparkles, Shield, Lock,
  Search, FileText, Heart, Scale, Users,
  User, GitBranch, ArrowRightLeft, Map, Briefcase, GraduationCap,
  MessageSquare, Brain, Eye, UserCheck, AlertCircle,
  BookOpen, Library, Calendar, Mail, Globe, Mic,
  RefreshCw, Navigation, Bell,
  ArrowUpRight
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

function SectionHeading({ title, subtitle, color }: { title: string; subtitle: string; color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16 md:mb-24"
    >
      <div 
        className="text-xs font-mono tracking-widest uppercase mb-4"
        style={{ color }}
      >
        {subtitle}
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight max-w-4xl">
        {title}
      </h2>
    </motion.div>
  );
}

export default function WorkCaseStudy() {
  const [, params] = useRoute("/work/:slug");
  const slug = params?.slug;
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  usePageMeta({
    title: project?.name ?? "Case Study",
    description: project?.tagline ?? "",
    url: slug ? `/work/\${slug}` : undefined,
    type: "article",
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white/50 space-y-6">
        <p className="text-xl font-serif italic">Project not found.</p>
        <Link href="/work">
          <button className="flex items-center gap-2 text-sm hover:text-white transition-colors border-b border-white/20 pb-1 hover:border-white">
            <ArrowLeft className="w-4 h-4" /> Return to Gallery
          </button>
        </Link>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background selection:bg-white/20 selection:text-white">
      {/* 1. Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 lg:px-8 overflow-hidden min-h-[80vh] flex flex-col justify-between"
      >
        <div className="absolute inset-0 bg-background z-0" />
        
        {/* Glow */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{ background: `radial-gradient(circle at 50% 0%, \${project.accentColor}, transparent 70%)` }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <Link href="/work">
              <button className="flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-white/50 hover:text-white transition-colors group">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Gallery
              </button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-end">
            <motion.div 
              style={{ y, opacity }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span 
                  className="text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"
                  style={{ color: project.accentColor, backgroundColor: `\${project.accentColor}10` }}
                >
                  {project.category}
                </span>
                {project.website && (
                  <a
                    href={`https://\${project.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/60 hover:text-white transition-colors group"
                  >
                    Live Site
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-serif text-white leading-[0.95] tracking-tight mb-8">
                {project.name}
              </h1>
              <p className="text-xl md:text-3xl text-white/60 font-light leading-relaxed max-w-3xl">
                {project.tagline}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-row lg:flex-col gap-8 lg:gap-12 lg:pb-4 border-t lg:border-t-0 border-white/10 pt-8 lg:pt-0"
            >
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-2">Platform</div>
                <div className="text-sm font-medium text-white">{project.platform}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-2">Status</div>
                <div className="text-sm font-medium" style={{ color: project.accentColor }}>{project.status}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {project.coverImage && (
        <section className="px-6 lg:px-8 relative z-20 -mt-12 md:-mt-24">
          <div className="max-w-[100rem] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10"
              style={{ boxShadow: `0 40px 100px -20px \${project.accentColor}20` }}
            >
              <img 
                src={project.coverImage} 
                alt={`\${project.name} preview`}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* 2. Overview */}
      <section className="py-24 md:py-40 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-32">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-10">
                {project.tagline}
              </h2>
              <div className="space-y-12">
                <div>
                  <div className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: project.accentColor }}>The Opportunity</div>
                  <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
                    {project.opportunity}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: project.accentColor }}>The Vision</div>
                  <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
                    {project.vision}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-16 lg:border-l border-white/10 lg:pl-16"
            >
              <div>
                <div className="text-xs font-mono tracking-widest uppercase text-white/40 mb-6">Services</div>
                <ul className="space-y-3">
                  {project.services.map(s => (
                    <li key={s} className="text-sm text-white/80 flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: project.accentColor }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="text-xs font-mono tracking-widest uppercase text-white/40 mb-6">Design Principles</div>
                <div className="space-y-8">
                  {project.designPrinciples.map((p, i) => (
                    <div key={i}>
                      <h4 className="text-white font-medium mb-2">{p.title}</h4>
                      <p className="text-sm text-white/50 leading-relaxed font-light">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Capabilities & AI */}
      <section className="py-24 md:py-40 px-6 lg:px-8 bg-zinc-950/50 border-y border-white/5 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading 
            title="System Intelligence" 
            subtitle="Capabilities & AI" 
            color={project.accentColor} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `\${project.accentColor}15`, color: project.accentColor }}
                >
                  <CapabilityIcon name={cap.icon} />
                </div>
                <h3 className="text-lg font-medium text-white mb-3">{cap.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>

          {project.aiRole && project.aiRole.length > 0 && (
            <div className="mt-24 md:mt-32">
              <div className="text-xs font-mono tracking-widest uppercase mb-12 text-white/40 border-b border-white/10 pb-4">
                AI Integration
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {project.aiRole.map((role, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="pt-1 text-white/20">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif text-white mb-3">{role.title}</h4>
                      <p className="text-white/60 font-light leading-relaxed">{role.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-24 md:py-40 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              title="Interface & Experience" 
              subtitle="Gallery" 
              color={project.accentColor} 
            />

            <div className="flex flex-col gap-24 md:gap-40">
              {project.gallery.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col \${i % 2 !== 0 ? 'md:flex-col-reverse' : ''} gap-8 md:gap-12`}
                >
                  {item.imagePath ? (
                    <div className="w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10">
                      <img 
                        src={item.imagePath} 
                        alt={item.label}
                        className="w-full h-auto"
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-full aspect-video rounded-2xl md:rounded-[2rem] flex items-center justify-center bg-zinc-900 border border-white/10"
                      style={{ background: `radial-gradient(ellipse at center, \${project.accentColor}20, transparent)` }}
                    >
                      <span className="text-2xl font-serif italic text-white/30">{item.label}</span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-4">{item.label}</h3>
                      <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl">{item.description}</p>
                    </div>
                    <div className="text-sm font-mono text-white/30">
                      {String(i + 1).padStart(2, '0')} / {String(project.gallery.length).padStart(2, '0')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Outcomes & Reflection */}
      <section className="py-24 md:py-40 px-6 lg:px-8 bg-zinc-950/80 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
          {project.outcomes && project.outcomes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-12">Outcomes</h2>
              <ul className="space-y-8">
                {project.outcomes.map((outcome, i) => (
                  <li key={i} className="flex gap-6 items-start">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ backgroundColor: `\${project.accentColor}20`, color: project.accentColor }}
                    >
                      <span className="text-sm font-medium">{i + 1}</span>
                    </div>
                    <p className="text-lg text-white/70 font-light leading-relaxed">{outcome}</p>
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
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:border-l border-white/10 lg:pl-16"
            >
              <div className="text-xs font-mono tracking-widest uppercase mb-8" style={{ color: project.accentColor }}>Reflection</div>
              <p className="text-xl text-white/60 font-serif leading-relaxed italic">
                "{project.reflection}"
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* 6. Navigation Footer */}
      <section className="border-t border-white/5 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {prevProject ? (
            <Link href={`/work/\${prevProject.slug}`}>
              <div className="group p-12 md:p-24 cursor-pointer hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl"
                  style={{ backgroundColor: prevProject.accentColor }}
                />
                <div className="relative z-10">
                  <div className="text-xs font-mono tracking-widest uppercase text-white/40 mb-6 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Previous Project
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-white/90 transition-colors">
                    {prevProject.name}
                  </h3>
                </div>
              </div>
            </Link>
          ) : <div className="hidden md:block p-12 md:p-24" />}

          {nextProject ? (
            <Link href={`/work/\${nextProject.slug}`}>
              <div className="group p-12 md:p-24 cursor-pointer hover:bg-white/[0.02] transition-colors text-right relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl"
                  style={{ backgroundColor: nextProject.accentColor }}
                />
                <div className="relative z-10 flex flex-col items-end">
                  <div className="text-xs font-mono tracking-widest uppercase text-white/40 mb-6 flex items-center gap-2">
                    Next Project <ArrowRight className="w-4 h-4" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-white/90 transition-colors">
                    {nextProject.name}
                  </h3>
                </div>
              </div>
            </Link>
          ) : <div className="hidden md:block p-12 md:p-24" />}
        </div>
      </section>
    </div>
  );
}
