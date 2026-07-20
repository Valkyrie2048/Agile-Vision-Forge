import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Badge } from "@/components/ui/badge";

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  if (project.coverImage) {
    return (
      <div className="w-full h-full overflow-hidden">
        <img
          src={project.coverImage}
          alt={`${project.name} screenshot`}
          className="w-full h-full object-cover object-top"
        />
      </div>
    );
  }

  const seed = index * 137 + 31;
  const cols = 3 + (seed % 3);
  const rows = 2 + (seed % 2);

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 60% 40%, ${project.accentColorLight} 0%, transparent 70%)` }}
    >
      <div className="relative w-full h-full">
        {Array.from({ length: cols * rows }).map((_, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const cellW = 100 / cols;
          const cellH = 100 / rows;
          const s = (i * 97 + seed) % 100;
          const opacity = 0.04 + (s % 40) * 0.002;
          return (
            <div
              key={i}
              className="absolute border"
              style={{
                left: `${col * cellW + 1}%`,
                top: `${row * cellH + 1}%`,
                width: `${cellW - 2}%`,
                height: `${cellH - 2}%`,
                borderColor: `${project.accentColor}40`,
                backgroundColor: project.accentColor,
                opacity,
              }}
            />
          );
        })}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `radial-gradient(circle at 50% 50%, transparent 40%, hsl(250 20% 7% / 0.6) 100%)` }}
        >
          <div className="text-center px-6">
            <div
              className="text-4xl font-bold tracking-tight mb-1 font-serif italic"
              style={{ color: project.accentColor, textShadow: `0 0 40px ${project.accentColor}` }}
            >
              {project.name.split(" ")[0]}
            </div>
            <div className="text-xs font-medium uppercase tracking-widest" style={{ color: project.accentColor, opacity: 0.6 }}>
              {project.platform}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="group relative col-span-1 lg:col-span-3 rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: "hsl(250 20% 5%)",
          border: `1px solid ${hovered ? project.accentColor + "30" : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered ? `0 0 40px -10px ${project.accentColor}30` : "none",
          transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
          {/* Image */}
          <div className="relative h-72 lg:h-[480px] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.03 : 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <ProjectVisual project={project} index={index} />
            </motion.div>
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ background: `linear-gradient(135deg, ${project.accentColor}18, ${project.accentColor}08)` }}
            >
              <div
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{ background: project.accentColor, color: "hsl(250 20% 5%)" }}
              >
                View Case Study <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge
                  variant="outline"
                  className="text-[11px] font-medium"
                  style={{ borderColor: `${project.accentColor}40`, color: project.accentColor }}
                >
                  {project.category}
                </Badge>
                {project.website && (
                  <span className="text-[11px] text-white/30 font-mono">{project.website}</span>
                )}
              </div>

              <div
                className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 font-mono"
                style={{ color: project.accentColor, opacity: 0.5 }}
              >
                Featured Project
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
                {project.name}
              </h3>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                {project.tagline}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.services.slice(0, 5).map(s => (
                  <span key={s} className="text-[11px] px-3 py-1 rounded-full border border-white/10 text-white/40">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2" style={{ color: project.accentColor }}>
              <span className="text-sm font-semibold">Open case study</span>
              <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: (index % 3) * 0.06 }}
        className="group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer h-full"
        style={{
          background: "hsl(250 20% 5%)",
          border: `1px solid ${hovered ? project.accentColor + "30" : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered ? `0 0 32px -8px ${project.accentColor}28` : "none",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image area */}
        <div className="relative h-60 overflow-hidden flex-shrink-0">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <ProjectVisual project={project} index={index} />
          </motion.div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-end justify-start p-4"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: `linear-gradient(to top, ${project.accentColor}22 0%, transparent 60%)` }}
          >
            <div
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full"
              style={{ background: project.accentColor + "ee", color: "hsl(250 20% 5%)" }}
            >
              View case study <ArrowUpRight className="w-3 h-3" />
            </div>
          </motion.div>

          {/* Category badge overlay */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="outline"
              className="text-[10px] font-medium backdrop-blur-sm"
              style={{
                borderColor: `${project.accentColor}50`,
                color: project.accentColor,
                background: `${project.accentColor}12`,
              }}
            >
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-base font-bold text-white mb-2 leading-snug">{project.name}</h3>
          <p className="text-white/55 text-sm leading-relaxed flex-1 mb-5">{project.tagline}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.services.slice(0, 3).map(s => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/35">
                {s}
              </span>
            ))}
            {project.services.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/8 text-white/25">
                +{project.services.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: project.accentColor }}>
            <span>Case study</span>
            <motion.div animate={{ x: hovered ? 3 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Work() {
  usePageMeta({
    title: "Selected Work",
    description:
      "A collection of platforms, applications, and digital experiences created across financial technology, artificial intelligence, travel, career development, insurance, research, and human flourishing.",
    url: "/work",
    type: "website",
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter(p => p.filterCategory === activeCategory);

  const featured = activeCategory === "All" ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 max-w-full"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                Selected Work
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
                Digital products designed for a more intelligent future.
              </h1>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-5xl font-bold text-white/8 font-mono leading-none">
                {String(projects.length).padStart(2, "0")}
              </div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Projects</div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mt-6"
          >
            Platforms, applications, and digital experiences across fintech, insurtech, AI, travel, career development, and research.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2 border-b border-white/6 pb-8"
          >
            {projectCategories.map(cat => {
              const count = cat === "All" ? projects.length : projects.filter(p => p.filterCategory === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    activeCategory === cat
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                      : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 bg-white/[0.02]"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className={`ml-1.5 text-[10px] ${activeCategory === cat ? "text-white/70" : "text-white/25"}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-24 text-muted-foreground">
                  No projects in this category yet.
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Featured project — full width, only in "All" view */}
                  {featured && (
                    <FeaturedCard project={featured} index={0} />
                  )}

                  {/* Remaining projects — 3-column grid */}
                  {rest.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {rest.map((project, i) => (
                        <ProjectCard
                          key={project.slug}
                          project={project}
                          index={featured ? i + 1 : i}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Start a project</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Have a complex idea that deserves<br className="hidden sm:block" /> a better digital experience?
              </h2>
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
