import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ExternalLink,
  BarChart3, TrendingUp, CreditCard, Sparkles, Shield, Lock,
  Search, FileText, Heart, Scale, Users,
  User, GitBranch, ArrowRightLeft, Map, Briefcase, GraduationCap,
  MessageSquare, Brain, Eye, UserCheck, AlertCircle,
  BookOpen, Library, Calendar, Mail, Globe, Mic,
  RefreshCw, Navigation, Bell,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Badge } from "@/components/ui/badge";

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

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  };
}

function HeroVisual({ project }: { project: Project }) {
  if (project.coverImage) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={project.coverImage}
          alt={`${project.name} product screenshot`}
          className="w-full h-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full"
      style={{ background: `radial-gradient(ellipse at 60% 40%, ${project.accentColorLight} 0%, transparent 70%), hsl(250 20% 6%)` }}
    >
      <div className="absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => {
          const s = i * 97 + 31;
          const left = (s % 100);
          const top = ((s * 3) % 100);
          const opacity = 0.03 + (i % 5) * 0.015;
          const size = 40 + (i % 80);
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                border: `1px solid ${project.accentColor}`,
                opacity,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div
            className="text-6xl sm:text-7xl font-bold italic font-serif mb-2"
            style={{ color: project.accentColor, textShadow: `0 0 60px ${project.accentColor}` }}
          >
            {project.name.split(" ")[0]}
          </div>
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-white/30">
            {project.platform}
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryItem({ item, project, index }: { item: Project["gallery"][0]; project: Project; index: number }) {
  if (item.imagePath) {
    return (
      <motion.div
        {...reveal(index * 0.06)}
        className={item.type === "fullwidth" ? "col-span-1 lg:col-span-2" : ""}
      >
        <div
          className="w-full rounded-xl overflow-hidden"
          style={{ border: `1px solid rgba(255,255,255,0.07)` }}
        >
          <img
            src={item.imagePath}
            alt={item.label}
            className="w-full h-auto block"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: project.accentColor }}
            >
              {item.label}
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-lg">{item.description}</p>
          </div>
          <div
            className="text-xs font-mono text-white/20 flex-shrink-0 mt-0.5"
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </motion.div>
    );
  }

  // Fallback for items without imagePath
  return (
    <motion.div
      {...reveal(index * 0.06)}
      className={item.type === "fullwidth" ? "col-span-1 lg:col-span-2" : ""}
    >
      <div
        className="w-full rounded-xl overflow-hidden"
        style={{ borderColor: `${project.accentColor}20`, background: "hsl(250 20% 6%)", border: `1px solid ${project.accentColor}20` }}
      >
        <div
          className="h-64 flex items-center justify-center"
          style={{ background: `radial-gradient(ellipse at 50% 30%, ${project.accentColorLight} 0%, transparent 70%)` }}
        >
          <div className="text-xl font-serif italic font-bold" style={{ color: project.accentColor, opacity: 0.5 }}>
            {item.label}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: project.accentColor }}>
            {item.label}
          </div>
          <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
        </div>
        <div className="text-xs font-mono text-white/20 flex-shrink-0 mt-0.5">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkCaseStudy() {
  const [, params] = useRoute("/work/:slug");
  const slug = params?.slug;
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];

  usePageMeta({
    title: project?.name ?? "Case Study",
    description: project?.tagline ?? "",
    url: slug ? `/work/${slug}` : undefined,
    type: "article",
  });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg mb-4">Project not found.</p>
          <Link href="/work">
            <button className="px-4 py-2 border border-white/15 rounded-lg text-sm hover:border-white/30 transition-colors">
              Back to Work
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;
  const hasRealScreenshots = project.gallery.some(item => item.imagePath);

  return (
    <div className="min-h-screen bg-background">

      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="pt-28 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Back nav */}
          <motion.div {...reveal()} className="mb-10">
            <Link href="/work">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                Selected Work
              </button>
            </Link>
          </motion.div>

          {/* Two-column hero: text left, metadata right on desktop */}
          <motion.div {...reveal(0.05)} className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 mb-10 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <Badge
                  variant="outline"
                  className="text-xs font-medium"
                  style={{ borderColor: `${project.accentColor}50`, color: project.accentColor }}
                >
                  {project.category}
                </Badge>
                {project.website && (
                  <a
                    href={`https://${project.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs transition-opacity hover:opacity-80"
                    style={{ color: project.accentColor }}
                  >
                    {project.website}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight mb-5">
                {project.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {project.tagline}
              </p>
            </div>

            {/* Meta panel */}
            <div className="lg:text-right space-y-4 lg:min-w-[200px]">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Platform</div>
                <div className="text-sm font-medium text-white/70">{project.platform}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Status</div>
                <div className="text-sm font-medium" style={{ color: project.accentColor }}>{project.status}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Services</div>
                <div className="flex flex-wrap lg:justify-end gap-1.5">
                  {project.services.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/40">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Full-width hero visual */}
          <motion.div
            {...reveal(0.1)}
            className="relative w-full h-[320px] sm:h-[460px] lg:h-[560px] rounded-2xl overflow-hidden"
            style={{ border: `1px solid rgba(255,255,255,0.07)` }}
          >
            <HeroVisual project={project} />
            {/* Accent line at top of visual */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}80, transparent)` }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 2. Snapshot ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 rounded-2xl overflow-hidden"
              style={{ background: "hsl(250 20% 4%)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                { label: "Client", value: project.name.split(" ").slice(0, 2).join(" ") },
                { label: "Industry", value: project.category },
                { label: "Platform", value: project.platform },
                { label: "Role", value: "Design & Strategy" },
                { label: "Services", value: project.services.slice(0, 2).join(", ") + (project.services.length > 2 ? "…" : "") },
                { label: "Status", value: project.status.split("—")[0].trim() },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="px-5 py-5 border-r border-b border-white/5 last:border-r-0"
                  style={i === 0 ? { borderTop: `2px solid ${project.accentColor}` } : {}}
                >
                  <div className="text-[10px] uppercase tracking-widest text-white/25 mb-1.5">{item.label}</div>
                  <div className="text-sm font-medium text-white/75 leading-snug">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Opportunity ──────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            <motion.div {...reveal()}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: project.accentColor }}>
                The Opportunity
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight font-serif">
                What problem does this product address?
              </h2>
            </motion.div>
            <motion.div {...reveal(0.1)}>
              <p className="text-base sm:text-lg text-muted-foreground leading-[1.85]">
                {project.opportunity}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Vision ───────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()}>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-8" style={{ color: project.accentColor }}>
              The Product Vision
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
              <div
                className="hidden lg:block w-1 self-stretch rounded-full flex-shrink-0"
                style={{ background: `linear-gradient(to bottom, ${project.accentColor}, transparent)`, minHeight: "120px" }}
              />
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-[1.5] tracking-tight">
                {project.vision}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. Experience Strategy ──────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="mb-10">
            <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: project.accentColor }}>
              Experience Strategy
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-serif leading-tight">
              Who is this product for?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.users.map((u, i) => (
              <motion.div
                key={i}
                {...reveal(i * 0.07)}
                className="rounded-xl border border-white/7 p-6"
                style={{ background: "hsl(250 20% 4%)" }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center mb-4"
                  style={{ background: `${project.accentColor}18` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: project.accentColor }} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{u.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{u.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Capabilities ─────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="mb-10">
            <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: project.accentColor }}>
              Key Product Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-serif leading-tight">
              What the product does
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {project.capabilities.map((cap, i) => (
              <motion.div
                key={i}
                {...reveal(i * 0.05)}
                className="p-6 group hover:z-10 transition-colors"
                style={{ background: "hsl(250 20% 4%)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${project.accentColor}12`, color: project.accentColor }}
                >
                  <CapabilityIcon name={cap.icon} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Gallery ──────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="mb-12">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: project.accentColor }}>
                  Product Gallery
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-serif leading-tight">
                  Interface design
                </h2>
              </div>
              <div className="text-xs text-white/20 font-mono">
                {project.gallery.length} screens
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {project.gallery.map((item, i) => (
              <GalleryItem key={i} item={item} project={project} index={i} />
            ))}
          </div>

          {!hasRealScreenshots && (
            <motion.div {...reveal(0.1)} className="mt-8 text-center">
              <p className="text-xs text-white/20 italic">
                Interface visualizations representing the product concept and design direction.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── 8. Design Approach ──────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="mb-10">
            <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: project.accentColor }}>
              Design Approach
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-serif leading-tight">
              How the product is designed
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {project.designPrinciples.map((p, i) => (
              <motion.div
                key={i}
                {...reveal(i * 0.07)}
                className="flex gap-5 p-6 rounded-xl border border-white/7"
                style={{ background: "hsl(250 20% 4%)" }}
              >
                <div
                  className="w-1 rounded-full flex-shrink-0 self-stretch"
                  style={{ background: project.accentColor, opacity: 0.6 }}
                />
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. AI Role ──────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="mb-10">
            <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: project.accentColor }}>
              Artificial Intelligence
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-serif leading-tight">
              How AI supports this experience
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {project.aiRole.map((item, i) => (
              <motion.div
                key={i}
                {...reveal(i * 0.08)}
                className="rounded-xl border border-white/7 p-6"
                style={{ background: "hsl(250 20% 4%)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${project.accentColor}15`, color: project.accentColor }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Outcomes ────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            <motion.div {...reveal()}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: project.accentColor }}>
                Outcome
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-serif leading-tight">
                Value delivered
              </h2>
            </motion.div>
            <motion.div {...reveal(0.1)}>
              <ul className="space-y-5">
                {project.outcomes.map((outcome, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div
                      className="mt-2.5 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: project.accentColor }}
                    />
                    <p className="text-base text-muted-foreground leading-relaxed">{outcome}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 11. Reflection ──────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()}>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-10" style={{ color: project.accentColor }}>
              Reflection
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-start">
              <div
                className="hidden lg:block w-px self-stretch"
                style={{ background: `linear-gradient(to bottom, ${project.accentColor}60, transparent)`, minHeight: "160px" }}
              />
              <blockquote
                className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-foreground/80 leading-[1.6]"
              >
                &ldquo;{project.reflection}&rdquo;
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 12. Prev / Next ──────────────────────────────────── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link href={`/work/${prevProject.slug}`}>
                <motion.div
                  {...reveal()}
                  className="group rounded-xl border border-white/7 p-6 hover:border-white/15 transition-all cursor-pointer overflow-hidden relative"
                  style={{ background: "hsl(250 20% 4%)" }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                    style={{ background: prevProject.accentColor, opacity: 0.5 }}
                  />
                  <div className="flex items-center gap-2 text-muted-foreground mb-4 text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    Previous project
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-primary transition-colors leading-snug mb-1">
                    {prevProject.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{prevProject.category}</div>
                </motion.div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link href={`/work/${nextProject.slug}`}>
                <motion.div
                  {...reveal(0.05)}
                  className="group rounded-xl border border-white/7 p-6 hover:border-white/15 transition-all cursor-pointer text-right overflow-hidden relative"
                  style={{ background: "hsl(250 20% 4%)" }}
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 w-[3px] rounded-r-xl"
                    style={{ background: nextProject.accentColor, opacity: 0.5 }}
                  />
                  <div className="flex items-center justify-end gap-2 text-muted-foreground mb-4 text-sm">
                    Next project
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-primary transition-colors leading-snug mb-1">
                    {nextProject.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{nextProject.category}</div>
                </motion.div>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div className="mt-8 text-center">
            <Link href="/work">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto group">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                Back to Selected Work
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 13. CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Start a project</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
                Have a complex idea that deserves a better digital experience?
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Vision AI Works helps organizations turn ambitious ideas into intelligent, usable, and compelling digital products.
              </p>
            </div>
            <Link href="/get-started">
              <button
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, hsl(250 85% 60%), hsl(270 80% 55%))" }}
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
