import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

function ProjectCard({ project, index, featured }: { project: Project; index: number; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="group relative col-span-1 lg:col-span-2 rounded-2xl overflow-hidden border border-white/8 bg-white/[0.025]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ProjectVisual project={project} index={index} />
            </motion.div>
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="text-[11px] font-medium border-white/15 text-white/50"
                  style={{ borderColor: `${project.accentColor}40`, color: project.accentColor }}
                >
                  {project.category}
                </Badge>
                {project.website && (
                  <span className="text-[11px] text-white/30 font-mono">{project.website}</span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{project.name}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{project.tagline}</p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.services.slice(0, 4).map(s => (
                  <span key={s} className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-white/40">
                    {s}
                  </span>
                ))}
                {project.services.length > 4 && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-white/30">
                    +{project.services.length - 4} more
                  </span>
                )}
              </div>
            </div>
            <Link href={`/work/${project.slug}`}>
              <Button
                variant="outline"
                className="group/btn gap-2 border-white/15 text-white hover:border-white/30 hover:bg-white/5 w-full sm:w-auto"
                style={{ borderColor: `${project.accentColor}50` }}
              >
                View Case Study
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.025] flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ProjectVisual project={project} index={index} />
        </motion.div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge
            variant="outline"
            className="text-[11px] font-medium"
            style={{ borderColor: `${project.accentColor}40`, color: project.accentColor }}
          >
            {project.category}
          </Badge>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 leading-snug">{project.name}</h3>
        <p className="text-white/55 text-sm leading-relaxed mb-4 flex-1">{project.tagline}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.services.slice(0, 3).map(s => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/35">
              {s}
            </span>
          ))}
        </div>
        <Link href={`/work/${project.slug}`}>
          <button
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: project.accentColor }}
          >
            View Case Study
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </motion.div>
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

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Selected Work
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-6">
              Digital products designed for a more intelligent future.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              A collection of platforms, applications, and digital experiences created across financial technology, artificial intelligence, travel, career development, insurance, research, and human flourishing.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {projectCategories.map(cat => (
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
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-24 text-muted-foreground">
                  No projects in this category yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {filtered.map((project, i) => {
                    const isFeatured = i === 0 && activeCategory === "All";
                    return (
                      <ProjectCard
                        key={project.slug}
                        project={project}
                        index={i}
                        featured={isFeatured}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Start a project</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                Have a complex idea that deserves a better digital experience?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
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
        </div>
      </section>
    </div>
  );
}
