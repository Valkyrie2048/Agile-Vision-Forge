import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";

/* Derive a dark gradient from the project's accent color */
function coverBg(project: Project): string {
  const tinted = project.accentColorLight.replace(/,[\d.]+\)$/, ",0.18)");
  return `linear-gradient(135deg, ${tinted}, #060606)`;
}

/* ─── HERO CARD (index 0 — full-width) ────────────────────────────────── */
function HeroProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Single unified card — image area on top, meta panel at bottom */}
        <div
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] flex flex-col"
          style={{
            background: coverBg(project), /* always gradient — shows in meta panel even when image overlays image area */
            boxShadow: hovered ? `0 40px 120px -20px ${project.accentColor}40` : "none",
            transition: "box-shadow 0.7s ease",
          }}
        >
          {/* ── Image area ── */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/7", flexShrink: 0 }}>
            {/* Screenshot */}
            {project.coverImage && (
              <img
                src={project.coverImage}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-[1.03] transition-transform duration-1000"
              />
            )}
            {/* Gradient overlay so meta panel reads cleanly */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-10" />
            {/* Hover radial glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
              style={{ background: `radial-gradient(ellipse at 50% 60%, ${project.accentColor}25, transparent 70%)` }}
            />
            {/* Hover arrow button */}
            <div
              className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-all duration-300 z-30"
              style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.7)" }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          {/* ── Meta panel — inside the card ── */}
          <div className="p-10 lg:p-14 border-t border-white/[0.06] flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[10px] font-mono tracking-[0.2em] uppercase"
                  style={{ color: project.accentColor }}
                >
                  {project.category}
                </span>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/55">
                  {project.platform}
                </span>
              </div>
              <h2 className="font-serif text-[clamp(2.2rem,4vw,4.5rem)] text-white leading-[1.0] tracking-tight mb-4">
                {project.name}
              </h2>
              <p className="text-lg text-white/55 font-light leading-relaxed max-w-2xl">
                {project.tagline}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end flex-shrink-0 lg:max-w-xs">
              {project.services.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-mono tracking-wider text-white/65 border border-white/10 px-2.5 py-1 rounded-full"
                >
                  {s}
                </span>
              ))}
              {project.services.length > 4 && (
                <span className="text-[10px] font-mono text-white/45 px-1 py-1">
                  +{project.services.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ─── SPLIT CARD (used in asymmetric pairs) ────────────────────────────── */
function SplitProjectCard({
  project,
  index,
  wide = false,
}: {
  project: Project;
  index: number;
  wide?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
        className="group cursor-pointer flex flex-col h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Single unified card */}
        <div
          className="rounded-[1.75rem] overflow-hidden border border-white/[0.06] flex flex-col h-full"
          style={{
            background: coverBg(project), /* always gradient — shows in meta panel even when image overlays image area */
            boxShadow: hovered ? `0 24px 80px -12px ${project.accentColor}35` : "none",
            transition: "box-shadow 0.7s ease",
          }}
        >
          {/* ── Image area ── */}
          <div
            className="relative w-full flex-1 overflow-hidden"
            style={{ minHeight: wide ? 300 : 220 }}
          >
            {/* Screenshot */}
            {project.coverImage && (
              <img
                src={project.coverImage}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-[1.03] transition-transform duration-1000"
              />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none z-10" />
            {/* Hover radial glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
              style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accentColor}20, transparent 70%)` }}
            />
            {/* Hover arrow button */}
            <div
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl transition-all duration-300 z-30"
              style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.7)" }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* ── Meta panel — inside the card ── */}
          <div className="p-8 border-t border-white/[0.06]">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase"
                style={{ color: project.accentColor }}
              >
                {project.category}
              </span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/55">
                {project.platform}
              </span>
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl text-white leading-[1.1] tracking-tight mb-3">
              {project.name}
            </h2>
            <p className="text-sm text-white/50 font-light leading-relaxed line-clamp-2 mb-5">
              {project.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-white/55 group-hover:text-white/80 transition-colors duration-300">
              <span>View case study</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1 duration-300" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ─── ACCENT CARD (full-width, pure text — no image) ───────────────────── */
function AccentProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
        className="group cursor-pointer relative overflow-hidden rounded-[2rem] border border-white/[0.06] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12"
        style={{
          background: `linear-gradient(135deg, ${project.accentColorLight.replace(/,[\d.]+\)$/, ",0.18)")}, #060606)`,
          boxShadow: hovered ? `0 30px 100px -20px ${project.accentColor}40` : "none",
          transition: "box-shadow 0.7s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${project.accentColor}15, transparent 60%)` }}
        />

        {/* Text block */}
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-[10px] font-mono tracking-[0.2em] uppercase"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </span>
          </div>
          <h2
            className="font-serif text-white leading-[1.0] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.5rem,5vw,5rem)" }}
          >
            {project.name}
          </h2>
          <p className="text-xl text-white/55 font-light leading-relaxed max-w-xl">
            {project.tagline}
          </p>
        </div>

        {/* Circular arrow button */}
        <div className="relative z-10 flex-shrink-0">
          <motion.div
            className="w-20 h-20 rounded-full border flex items-center justify-center"
            style={{ borderColor: `${project.accentColor}50` }}
            animate={{ backgroundColor: hovered ? `${project.accentColor}20` : "transparent" }}
            transition={{ duration: 0.4 }}
          >
            <ArrowUpRight className="w-8 h-8" style={{ color: project.accentColor }} />
          </motion.div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ─── MAGAZINE GRID ─────────────────────────────────────────────────────── */
function MagazineGrid({ items }: { items: Project[] }) {
  if (items.length === 0) {
    return (
      <div className="py-40 text-center text-lg text-foreground/55 font-light font-serif italic">
        No projects in this category yet.
      </div>
    );
  }

  const sections: React.ReactNode[] = [];
  let i = 0;

  // Row 0 — Full-width hero card
  if (items[i]) {
    sections.push(<HeroProjectCard key={items[i].slug} project={items[i]} index={i} />);
    i++;
  }

  // Row 1 — 60 / 40 split
  if (items[i]) {
    const a = items[i];
    const b = items[i + 1];
    sections.push(
      <div key="row-1" className="grid gap-8 items-stretch" style={{ gridTemplateColumns: b ? "60fr 40fr" : "1fr" }}>
        <SplitProjectCard project={a} index={i} wide={true} />
        {b && <SplitProjectCard project={b} index={i + 1} wide={false} />}
      </div>
    );
    i += b ? 2 : 1;
  }

  // Row 2 — 40 / 60 split (reversed)
  if (items[i]) {
    const a = items[i];
    const b = items[i + 1];
    sections.push(
      <div key="row-2" className="grid gap-8 items-stretch" style={{ gridTemplateColumns: b ? "40fr 60fr" : "1fr" }}>
        <SplitProjectCard project={a} index={i} wide={false} />
        {b && <SplitProjectCard project={b} index={i + 1} wide={true} />}
      </div>
    );
    i += b ? 2 : 1;
  }

  // Row 3 — Full-width accent card
  if (items[i]) {
    sections.push(<AccentProjectCard key={items[i].slug} project={items[i]} index={i} />);
    i++;
  }

  // Remaining — standard 2-col grid
  if (items[i]) {
    const remaining = items.slice(i);
    sections.push(
      <div key="row-rest" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {remaining.map((p, j) => (
          <SplitProjectCard key={p.slug} project={p} index={i + j} wide={true} />
        ))}
      </div>
    );
  }

  return <div className="flex flex-col gap-8">{sections}</div>;
}

/* ─── PAGE ──────────────────────────────────────────────────────────────── */
export default function Work() {
  usePageMeta({
    title: "Selected Work",
    description: "A curated collection of intelligent digital products designed by Vision AI Works.",
    url: "/work",
    type: "website",
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.filterCategory === activeCategory);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-white">

      {/* Hero */}
      <section className="pt-44 pb-16 px-6 lg:px-12 xl:px-16">
        <div className="max-w-[90rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-foreground/55 mb-10">
              Vision AI Works — Selected Work
            </p>
            <h1 className="font-serif text-[clamp(3.5rem,9vw,9.5rem)] leading-[0.95] tracking-tight text-foreground mb-10">
              Work that{" "}
              <em className="not-italic text-foreground/35 italic">works.</em>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/55 font-light leading-relaxed max-w-xl">
              Intelligent platforms across fintech, insurtech, AI, and the future of work —
              proof of craft, delivered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[4.5rem] z-40 bg-background/85 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4">
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.filterCategory === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2.5 whitespace-nowrap transition-all duration-300 ${
                    isActive ? "text-foreground" : "text-foreground/45 hover:text-foreground/75"
                  }`}
                >
                  <span
                    className={`text-xs font-medium tracking-wide ${
                      isActive ? "border-b border-foreground/70 pb-px" : "pb-px"
                    }`}
                  >
                    {cat}
                  </span>
                  <span className="text-[9px] font-mono bg-white/8 border border-white/10 px-1.5 py-0.5 rounded text-foreground/55">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Magazine grid */}
      <section className="px-6 lg:px-12 xl:px-16 pt-16 pb-32">
        <div className="max-w-[90rem] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <MagazineGrid items={filtered} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-40 px-6 lg:px-12 overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] leading-[1] tracking-tight text-foreground mb-10">
              Ready to build something{" "}
              <em className="italic text-primary">extraordinary?</em>
            </h2>
            <Link href="/contact">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-base tracking-wide transition-all duration-300 hover:scale-105 hover:bg-white/92 shadow-lg shadow-white/5">
                Start the conversation
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
