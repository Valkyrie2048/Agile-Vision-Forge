import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ExternalLink,
  BarChart3, TrendingUp, CreditCard, Sparkles, Shield, Lock,
  Search, FileText, Heart, Scale, Users,
  User, GitBranch, ArrowRightLeft, Map, Briefcase, GraduationCap,
  MessageSquare, Brain, Eye, UserCheck, AlertCircle,
  BookOpen, Library, Calendar, Mail, Globe,
  RefreshCw, Navigation, Bell,
} from "lucide-react";
import { projects, type Project, type ProjectCapability } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ICON_MAP: Record<string, React.ElementType> = {
  BarChart3, TrendingUp, CreditCard, Sparkles, Shield, Lock,
  Search, FileText, Heart, Scale, Users,
  User, GitBranch, ArrowRightLeft, Map, Briefcase, GraduationCap,
  MessageSquare, Brain, Eye, UserCheck, AlertCircle,
  BookOpen, Library, Calendar, Mail, Globe,
  RefreshCw, Navigation, Bell,
};

function CapabilityIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className="w-5 h-5" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 leading-tight">
      {children}
    </h2>
  );
}

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  };
}

function HeroVisual({ project }: { project: Project }) {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden border border-white/8"
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

function GalleryMockup({ item, project }: { item: Project["gallery"][0]; project: Project }) {
  const screenCount = item.screens.length;

  if (item.type === "phone") {
    return (
      <div className="flex justify-center gap-4">
        {Array.from({ length: Math.min(screenCount, 2) }).map((_, i) => (
          <div
            key={i}
            className="w-[140px] sm:w-[160px] rounded-[1.75rem] border-4 overflow-hidden flex-shrink-0"
            style={{
              borderColor: "hsl(250 30% 28%)",
              background: "hsl(250 20% 7%)",
              boxShadow: `0 24px 48px -12px hsl(250 20% 4% / 0.8), 0 0 0 1px ${project.accentColor}20`,
            }}
          >
            <div className="w-20 h-5 bg-white/10 rounded-b-xl mx-auto" />
            <div
              className="h-[280px] p-3 flex flex-col gap-2"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.accentColorLight} 0%, transparent 60%)` }}
            >
              <div className="h-2.5 rounded w-3/4" style={{ background: project.accentColor, opacity: 0.4 }} />
              <div className="h-1.5 rounded w-full bg-white/10" />
              <div className="h-1.5 rounded w-5/6 bg-white/8" />
              <div className="flex-1 rounded-xl border" style={{ borderColor: `${project.accentColor}25`, background: `${project.accentColor}08` }}>
                <div className="p-2 space-y-1.5">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: project.accentColor, opacity: 0.3 + j * 0.1 }} />
                      <div className="flex-1 h-1.5 rounded bg-white/10" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-8 rounded-xl" style={{ background: project.accentColor, opacity: 0.25 + i * 0.1 }} />
            </div>
            <div
              className="py-2 flex justify-around"
              style={{ background: "hsl(250 20% 9%)", borderTop: "1px solid hsl(250 20% 15%)" }}
            >
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="w-5 h-5 rounded-full" style={{ background: j === 0 ? project.accentColor : "hsl(250 20% 18%)", opacity: j === 0 ? 0.7 : 1 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (item.type === "detail") {
    return (
      <div
        className="w-full rounded-xl overflow-hidden border"
        style={{ borderColor: `${project.accentColor}25`, background: `${project.accentColor}06` }}
      >
        <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: `${project.accentColor}20` }}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: project.accentColor, opacity: 0.6 }} />
            <div className="text-xs font-medium text-white/50">{item.label}</div>
          </div>
          <div className="text-[10px] text-white/25 font-mono">component detail</div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg p-4 border"
              style={{ borderColor: `${project.accentColor}20`, background: i === 0 ? `${project.accentColor}12` : "hsl(250 20% 8%)" }}
            >
              <div className="w-6 h-6 rounded-md mb-2" style={{ background: project.accentColor, opacity: 0.3 + i * 0.1 }} />
              <div className="h-2 rounded w-3/4 bg-white/20 mb-1.5" />
              <div className="h-1.5 rounded w-full bg-white/8" />
              <div className="h-1.5 rounded w-5/6 mt-1 bg-white/8" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (item.type === "fullwidth") {
    return (
      <div
        className="w-full rounded-xl overflow-hidden border"
        style={{ borderColor: `${project.accentColor}20`, background: "hsl(250 20% 6%)" }}
      >
        <div
          className="h-12 border-b flex items-center px-5 gap-4"
          style={{ borderColor: `${project.accentColor}20`, background: `${project.accentColor}06` }}
        >
          <div className="h-2 rounded w-48" style={{ background: project.accentColor, opacity: 0.4 }} />
          <div className="flex-1" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 w-16 rounded" style={{ background: i === 0 ? project.accentColor : "hsl(250 20% 15%)", opacity: i === 0 ? 0.5 : 1 }} />
            ))}
          </div>
        </div>
        <div
          className="h-56 flex items-center justify-center"
          style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accentColorLight} 0%, transparent 70%)` }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold font-serif italic mb-1" style={{ color: project.accentColor, opacity: 0.7 }}>
              {project.name}
            </div>
            <div className="text-xs text-white/25 uppercase tracking-widest">{item.description}</div>
          </div>
        </div>
        <div className="p-5 grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg p-3 border" style={{ borderColor: `${project.accentColor}15`, background: `${project.accentColor}05` }}>
              <div className="h-1.5 rounded w-4/5 bg-white/15 mb-1.5" />
              <div className="h-1.5 rounded w-full bg-white/8" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl overflow-hidden border"
      style={{ borderColor: `${project.accentColor}20`, background: "hsl(250 20% 6%)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: `${project.accentColor}15`, background: `${project.accentColor}05` }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div
          className="flex-1 rounded px-3 py-1 text-[11px] font-mono text-white/25"
          style={{ background: "hsl(250 20% 10%)" }}
        >
          {project.website ?? "app." + project.name.toLowerCase().replace(/\s/g, "") + ".com"}
        </div>
      </div>
      <div className="p-5">
        <div
          className="h-48 rounded-lg mb-4 flex items-center justify-center"
          style={{ background: `radial-gradient(ellipse at 50% 30%, ${project.accentColorLight} 0%, transparent 70%), hsl(250 20% 8%)` }}
        >
          <div
            className="text-2xl font-bold font-serif italic"
            style={{ color: project.accentColor, opacity: 0.6 }}
          >
            {item.label}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded p-3 border"
              style={{ borderColor: `${project.accentColor}15`, background: `${project.accentColor}06` }}
            >
              <div className="h-4 rounded mb-1.5" style={{ background: project.accentColor, opacity: 0.2 + i * 0.1 }} />
              <div className="h-1.5 rounded w-4/5 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
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
            <Button variant="outline">Back to Work</Button>
          </Link>
        </div>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="pt-28 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="mb-8">
            <Link href="/work">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Selected Work
              </button>
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge
                variant="outline"
                className="text-xs font-medium"
                style={{ borderColor: `${project.accentColor}50`, color: project.accentColor }}
              >
                {project.category}
              </Badge>
              <span className="text-xs text-white/30">{project.platform}</span>
              <span className="text-xs text-white/30">·</span>
              <span className="text-xs text-white/30 italic">{project.status}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-5">
              {project.name}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-6">
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.services.map(s => (
                <span
                  key={s}
                  className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/45"
                >
                  {s}
                </span>
              ))}
            </div>
            {project.website && (
              <a
                href={`https://${project.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: project.accentColor }}
              >
                {project.website}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </motion.div>

          <motion.div {...reveal(0.1)} className="relative h-[320px] sm:h-[420px] lg:h-[500px] rounded-2xl overflow-hidden mb-0">
            <HeroVisual project={project} />
          </motion.div>
        </div>
      </section>

      {/* ── 2. Snapshot ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()}>
            <div
              className="rounded-2xl border border-white/8 overflow-hidden"
              style={{ background: "hsl(250 20% 5%)" }}
            >
              <div
                className="px-6 py-4 border-b border-white/8"
                style={{ background: `${project.accentColor}08` }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: project.accentColor }}>
                  Project Snapshot
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-white/6">
                {[
                  { label: "Client", value: project.name },
                  { label: "Industry", value: project.category },
                  { label: "Platform", value: project.platform },
                  { label: "Role", value: "Design & Strategy" },
                  { label: "Services", value: project.services.slice(0, 2).join(", ") + (project.services.length > 2 ? "…" : "") },
                  { label: "Status", value: project.status.split("—")[0].trim() },
                ].map(item => (
                  <div key={item.label} className="px-5 py-5">
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1.5">{item.label}</div>
                    <div className="text-sm font-medium text-white/80 leading-snug">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Opportunity ──────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <motion.div {...reveal()}>
              <SectionLabel>The Opportunity</SectionLabel>
              <SectionTitle>What problem does this product address?</SectionTitle>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()}>
            <div
              className="relative rounded-2xl overflow-hidden p-8 sm:p-12 lg:p-16"
              style={{ background: `linear-gradient(135deg, ${project.accentColorLight} 0%, transparent 60%), hsl(250 20% 5%)` }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
              />
              <SectionLabel>The Product Vision</SectionLabel>
              <p className="text-xl sm:text-2xl font-semibold text-foreground leading-[1.6] max-w-3xl">
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
            <SectionLabel>Experience Strategy</SectionLabel>
            <SectionTitle>Who is this product for?</SectionTitle>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.users.map((u, i) => (
              <motion.div
                key={i}
                {...reveal(i * 0.07)}
                className="rounded-xl border border-white/8 p-6"
                style={{ background: "hsl(250 20% 5%)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${project.accentColor}15` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: project.accentColor }} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{u.title}</h3>
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
            <SectionLabel>Key Product Capabilities</SectionLabel>
            <SectionTitle>What the product does</SectionTitle>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.capabilities.map((cap, i) => (
              <motion.div
                key={i}
                {...reveal(i * 0.06)}
                className="rounded-xl border border-white/8 p-6 group hover:border-white/15 transition-colors"
                style={{ background: "hsl(250 20% 5%)" }}
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

      {/* ── 7. Design Approach ──────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="mb-10">
            <SectionLabel>Design Approach</SectionLabel>
            <SectionTitle>How the product is designed</SectionTitle>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {project.designPrinciples.map((p, i) => (
              <motion.div
                key={i}
                {...reveal(i * 0.07)}
                className="flex gap-5 p-6 rounded-xl border border-white/8"
                style={{ background: "hsl(250 20% 5%)" }}
              >
                <div
                  className="w-1 rounded-full flex-shrink-0 self-stretch"
                  style={{ background: project.accentColor, opacity: 0.5 }}
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

      {/* ── 8. AI Role ──────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="mb-10">
            <SectionLabel>Artificial Intelligence</SectionLabel>
            <SectionTitle>How AI supports this experience</SectionTitle>
          </motion.div>
          <div className="space-y-4">
            {project.aiRole.map((item, i) => (
              <motion.div
                key={i}
                {...reveal(i * 0.08)}
                className="rounded-xl border border-white/8 p-6"
                style={{ background: "hsl(250 20% 5%)" }}
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

      {/* ── 9. Gallery ──────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="mb-10">
            <SectionLabel>Product Gallery</SectionLabel>
            <SectionTitle>Interface explorations</SectionTitle>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {project.gallery.map((item, i) => (
              <motion.div
                key={i}
                {...reveal(i * 0.08)}
                className={item.type === "fullwidth" ? "lg:col-span-2" : ""}
              >
                <div className="mb-3">
                  <span
                    className="text-[11px] font-medium uppercase tracking-widest"
                    style={{ color: project.accentColor }}
                  >
                    {item.label}
                  </span>
                  <p className="text-xs text-white/35 mt-0.5">{item.description}</p>
                </div>
                <GalleryMockup item={item} project={project} />
              </motion.div>
            ))}
          </div>
          <motion.div {...reveal(0.1)} className="mt-6 text-center">
            <p className="text-xs text-white/25 italic">
              Interface visualizations — placeholder mockups representing the product concept and design direction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 10. Outcomes ────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <motion.div {...reveal()}>
              <SectionLabel>Outcome</SectionLabel>
              <SectionTitle>Value delivered</SectionTitle>
            </motion.div>
            <motion.div {...reveal(0.1)}>
              <ul className="space-y-4">
                {project.outcomes.map((outcome, i) => (
                  <li key={i} className="flex gap-4">
                    <div
                      className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()}>
            <div
              className="relative rounded-2xl overflow-hidden p-8 sm:p-12"
              style={{ background: "hsl(250 20% 5%)", border: `1px solid ${project.accentColor}20` }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}60, transparent)` }}
              />
              <SectionLabel>Reflection</SectionLabel>
              <blockquote className="text-lg sm:text-xl font-serif italic text-foreground/85 leading-[1.75] max-w-3xl">
                &ldquo;{project.reflection}&rdquo;
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 12. CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal()} className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Start a project</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-tight">
              Have a complex idea that deserves a better digital experience?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Vision AI Works helps organizations turn ambitious ideas into intelligent, usable, and compelling digital products.
            </p>
            <Link href="/get-started">
              <Button
                className="gap-2 px-6 py-3 h-auto text-base"
                style={{ background: "linear-gradient(135deg, hsl(250 85% 60%), hsl(270 80% 55%))" }}
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Prev / Next navigation ──────────────────────────── */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link href={`/work/${prevProject.slug}`}>
                <motion.div
                  {...reveal()}
                  className="group rounded-xl border border-white/8 p-6 hover:border-white/15 transition-colors cursor-pointer"
                  style={{ background: "hsl(250 20% 5%)" }}
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-3 text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    Previous project
                  </div>
                  <div className="text-base font-semibold text-white group-hover:text-primary transition-colors">
                    {prevProject.name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{prevProject.category}</div>
                </motion.div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link href={`/work/${nextProject.slug}`}>
                <motion.div
                  {...reveal(0.05)}
                  className="group rounded-xl border border-white/8 p-6 hover:border-white/15 transition-colors cursor-pointer text-right sm:text-right"
                  style={{ background: "hsl(250 20% 5%)" }}
                >
                  <div className="flex items-center justify-end gap-2 text-muted-foreground mb-3 text-sm">
                    Next project
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-base font-semibold text-white group-hover:text-primary transition-colors">
                    {nextProject.name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{nextProject.category}</div>
                </motion.div>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div className="mt-8 text-center">
            <Link href="/work">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto">
                <ArrowLeft className="w-4 h-4" />
                Back to Selected Work
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
