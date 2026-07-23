import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";

/* ─── HERO CARD (index 0 — full-width, landscape) ─────────────────────── */
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
        <div
          className="relative w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/[0.06]"
          style={{
            aspectRatio: "21/9",
            transform: hovered ? "scale(0.993)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.7s ease",
            boxShadow: hovered
              ? `0 40px 120px -20px ${project.accentColor}35`
              : "0 0 0 0 transparent",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none z-0"
            style={{ background: `radial-gradient(circle at 50% 60%, ${project.accentColor}30 0%, transparent 70%)` }}
          />
          {project.coverImage ? (
            <motion.img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-full object-cover object-top relative z-10"
              animate={{ scale: hovered ? 1.03 : 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{ background: `radial-gradient(ellipse at center, ${project.accentColorLight}30, transparent)` }}
            >
              <span className="font-serif italic text-white/15" style={{ fontSize: "clamp(3rem,8vw,8rem)" }}>
                {project.name}
              </span>
            </div>
          )}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div
            className="absolute bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Meta panel below */}
        <div className="pt-8 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: project.accentColor }}>
                {project.category}
              </span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/65">{project.platform}</span>
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,4rem)] text-white leading-[1.0] tracking-tight group-hover:text-white/90 transition-colors duration-300 mb-3">
              {project.name}
            </h2>
            <p className="text-base text-white/50 font-light leading-relaxed max-w-2xl">{project.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end flex-shrink-0 md:max-w-xs">
            {project.services.slice(0, 4).map((s) => (
              <span key={s} className="text-[10px] font-mono tracking-wider text-white/65 border border-white/10 px-2.5 py-1 rounded-full">
                {s}
              </span>
            ))}
            {project.services.length > 4 && (
              <span className="text-[10px] font-mono text-white/45 px-1 py-1">+{project.services.length - 4}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-medium text-white/55 group-hover:text-white/85 transition-colors duration-300 pb-2">
          <span>View case study</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-300" />
        </div>
      </motion.article>
    </Link>
  );
}

/* ─── SPLIT CARD (stacked, used in asymmetric pairs) ───────────────────── */
function SplitProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
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
        <div
          className="relative w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/[0.06] flex-shrink-0"
          style={{
            aspectRatio: "4/3",
            transform: hovered ? "scale(0.985)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.7s ease",
            boxShadow: hovered
              ? `0 24px 80px -12px ${project.accentColor}30`
              : "0 0 0 0 transparent",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 60%, ${project.accentColor}30 0%, transparent 70%)` }}
          />
          {project.coverImage ? (
            <motion.img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-full object-cover object-top relative z-10"
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{ background: `radial-gradient(ellipse at center, ${project.accentColorLight}30, transparent)` }}
            >
              <span className="text-2xl font-serif italic text-white/20">{project.name}</span>
            </div>
          )}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div
            className="absolute bottom-4 right-4 z-30 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>

        <div className="pt-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: project.accentColor }}>
              {project.category}
            </span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/65">{project.platform}</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-white leading-[1.1] tracking-tight group-hover:text-white/90 transition-colors duration-300 mb-3">
            {project.name}
          </h2>
          <p className="text-sm text-white/45 font-light leading-relaxed line-clamp-2 mb-5 flex-1">{project.tagline}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.services.slice(0, 3).map((s) => (
              <span key={s} className="text-[10px] font-mono tracking-wider text-white/55 border border-white/10 px-2.5 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-white/55 group-hover:text-white/85 transition-colors duration-300">
            <span>View case study</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-300" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ─── ACCENT CARD (full-width, typography-driven) ──────────────────────── */
function AccentProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
        className="group cursor-pointer relative overflow-hidden rounded-2xl border border-white/[0.06] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10"
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}14 0%, ${project.accentColor}05 60%, transparent 100%)`,
          boxShadow: hovered ? `0 30px 100px -20px ${project.accentColor}35` : "none",
          transition: "box-shadow 0.7s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${project.accentColor}12, transparent 60%)` }}
        />
        {project.coverImage && (
          <div className="relative w-full md:w-64 lg:w-80 xl:w-96 flex-shrink-0 overflow-hidden rounded-xl border border-white/[0.06]" style={{ aspectRatio: "4/3" }}>
            <motion.img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-full object-cover object-top"
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        )}
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: project.accentColor }}>
              {project.category}
            </span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/65">{project.platform}</span>
          </div>
          <h2
            className="font-serif text-white leading-[1.0] tracking-tight group-hover:text-white/90 transition-colors duration-300 mb-5"
            style={{ fontSize: "clamp(2rem,4.5vw,4.5rem)" }}
          >
            {project.name}
          </h2>
          <p className="text-lg text-white/50 font-light leading-relaxed max-w-xl mb-7">{project.tagline}</p>
          <div className="flex items-center gap-2 text-[11px] font-medium text-white/55 group-hover:text-white/85 transition-colors duration-300">
            <span>View case study</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-300" />
          </div>
        </div>
        <motion.div
          className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full border flex items-center justify-center hidden md:flex"
          style={{ borderColor: `${project.accentColor}40` }}
          animate={{
            backgroundColor: hovered ? `${project.accentColor}18` : "transparent",
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-6 h-6" style={{ color: project.accentColor }} />
        </motion.div>
      </motion.article>
    </Link>
  );
}

/* ─── MAGAZINE GRID RENDERER ────────────────────────────────────────────── */
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

  // Row 0 — Hero card (full width)
  if (items[i]) {
    sections.push(<HeroProjectCard key={items[i].slug} project={items[i]} index={i} />);
    i++;
  }

  // Row 1 — 60 / 40 pair
  if (items[i]) {
    const a = items[i];
    const b = items[i + 1];
    sections.push(
      <div key="row-1" className="grid gap-8 items-start" style={{ gridTemplateColumns: b ? "60fr 40fr" : "1fr" }}>
        <SplitProjectCard project={a} index={i} />
        {b && <SplitProjectCard project={b} index={i + 1} />}
      </div>
    );
    i += b ? 2 : 1;
  }

  // Row 2 — 40 / 60 pair (reversed)
  if (items[i]) {
    const a = items[i];
    const b = items[i + 1];
    sections.push(
      <div key="row-2" className="grid gap-8 items-start" style={{ gridTemplateColumns: b ? "40fr 60fr" : "1fr" }}>
        <SplitProjectCard project={a} index={i} />
        {b && <SplitProjectCard project={b} index={i + 1} />}
      </div>
    );
    i += b ? 2 : 1;
  }

  // Row 3 — Full-width accent card
  if (items[i]) {
    sections.push(<AccentProjectCard key={items[i].slug} project={items[i]} index={i} />);
    i++;
  }

  // Remaining — 2-col standard grid
  if (items[i]) {
    const remaining = items.slice(i);
    sections.push(
      <div key="row-rest" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {remaining.map((p, j) => (
          <SplitProjectCard key={p.slug} project={p} index={i + j} />
        ))}
      </div>
    );
  }

  return <div className="flex flex-col gap-16 md:gap-20">{sections}</div>;
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
