import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";

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
  const cols = 4 + (seed % 3);
  const rows = 3 + (seed % 2);

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 55% 35%, ${project.accentColorLight} 0%, transparent 65%)` }}
    >
      <div className="relative w-full h-full">
        {Array.from({ length: cols * rows }).map((_, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const s = (i * 97 + seed) % 100;
          const opacity = 0.03 + (s % 35) * 0.0018;
          return (
            <div
              key={i}
              className="absolute border"
              style={{
                left: `${(col / cols) * 100 + 0.5}%`,
                top: `${(row / rows) * 100 + 0.5}%`,
                width: `${100 / cols - 1}%`,
                height: `${100 / rows - 1}%`,
                borderColor: `${project.accentColor}40`,
                backgroundColor: project.accentColor,
                opacity,
              }}
            />
          );
        })}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `radial-gradient(circle at 50% 50%, transparent 30%, hsl(250 20% 7% / 0.7) 100%)` }}
        >
          <div className="text-center px-8">
            <div
              className="text-5xl font-bold tracking-tight mb-1 font-serif italic"
              style={{ color: project.accentColor, textShadow: `0 0 60px ${project.accentColor}` }}
            >
              {project.name.split(" ")[0]}
            </div>
            <div className="text-xs font-medium uppercase tracking-widest mt-2" style={{ color: project.accentColor, opacity: 0.5 }}>
              {project.platform}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className="group relative w-full rounded-2xl overflow-hidden cursor-pointer"
        style={{
          border: `1px solid ${hovered ? project.accentColor + "28" : "rgba(255,255,255,0.07)"}`,
          background: "hsl(250 20% 4%)",
          boxShadow: hovered ? `0 0 48px -12px ${project.accentColor}28` : "none",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">

          {/* Image — left side */}
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.025 : 1 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <ProjectVisual project={project} index={index} />
            </motion.div>

            {/* Number overlay */}
            <div className="absolute top-5 left-5 font-mono text-xs font-bold text-white/20">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Content — right side */}
          <div className="flex flex-col justify-between p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/6">
            <div>
              {/* Category + status */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ color: project.accentColor, background: `${project.accentColor}15` }}
                >
                  {project.category}
                </span>
                {project.website && (
                  <span className="text-[11px] text-white/25 font-mono">{project.website}</span>
                )}
              </div>

              {/* Name */}
              <h3
                className="font-bold text-white leading-tight tracking-tight mb-4"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                {project.name}
              </h3>

              {/* Tagline */}
              <p className="text-white/55 leading-relaxed mb-7 text-[15px]">
                {project.tagline}
              </p>

              {/* Services */}
              <div className="flex flex-wrap gap-1.5">
                {project.services.slice(0, 4).map(s => (
                  <span key={s} className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-white/35">
                    {s}
                  </span>
                ))}
                {project.services.length > 4 && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full border border-white/8 text-white/20">
                    +{project.services.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-2" style={{ color: project.accentColor }}>
              <span className="text-sm font-semibold">View case study</span>
              <motion.div animate={{ x: hovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
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

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
              Selected Work
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-foreground mb-6 max-w-3xl">
              Digital products designed for a more intelligent future.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Platforms, applications, and digital experiences across fintech, insurtech, AI, travel, career development, and research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap gap-2 border-b border-white/6 pb-10"
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
                  <span className={`ml-1.5 text-[10px] ${activeCategory === cat ? "text-white/60" : "text-white/20"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Project list */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5"
            >
              {filtered.length === 0 ? (
                <div className="text-center py-24 text-muted-foreground">
                  No projects in this category yet.
                </div>
              ) : (
                filtered.map((project, i) => (
                  <ProjectRow key={project.slug} project={project} index={i} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
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
