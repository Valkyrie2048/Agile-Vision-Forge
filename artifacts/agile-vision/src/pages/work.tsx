import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const isReversed = index % 2 === 1;

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
        className="group relative cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Number + rule */}
        <div className="flex items-center gap-6 mb-10 md:mb-12">
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/20">{num}</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Side-by-side layout */}
        <div className={`flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16 items-start ${isReversed ? "lg:flex-row-reverse" : ""}`}>

          {/* Image — 58% */}
          <div className="w-full lg:w-[58%] flex-shrink-0">
            <div
              className="relative w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/[0.06]"
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
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none z-0"
                style={{ background: `radial-gradient(circle at 50% 60%, ${project.accentColor}35 0%, transparent 70%)` }}
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
                  <span className="text-4xl font-serif italic text-white/20">{project.name}</span>
                </div>
              )}

              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                className="absolute bottom-5 right-5 z-30 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* Meta — 42% */}
          <div className="w-full lg:w-[42%] flex flex-col justify-center lg:py-6 xl:py-10">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase"
                style={{ color: project.accentColor }}
              >
                {project.category}
              </span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/35">
                {project.platform}
              </span>
            </div>

            <h2 className="text-[2rem] sm:text-[2.4rem] md:text-[2.75rem] font-serif tracking-tight text-white leading-[1.05] group-hover:text-white/90 transition-colors duration-300 mb-6">
              {project.name}
            </h2>

            <p className="text-base text-white/50 leading-[1.75] font-light mb-8">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.services.slice(0, 3).map((service) => (
                <span
                  key={service}
                  className="text-[10px] font-mono tracking-wider text-white/35 border border-white/10 px-2.5 py-1 rounded-full"
                >
                  {service}
                </span>
              ))}
              {project.services.length > 3 && (
                <span className="text-[10px] font-mono text-white/25 px-1 py-1">
                  +{project.services.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] font-medium text-white/35 group-hover:text-white/75 transition-colors duration-300">
              <span>View case study</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-300" />
            </div>
          </div>

        </div>
      </motion.article>
    </Link>
  );
}

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
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30 mb-10">
              Vision AI Works — Selected Work
            </p>
            <h1 className="font-serif text-[clamp(3.5rem,9vw,9.5rem)] leading-[0.95] tracking-tight text-white mb-10">
              AI Work that{" "}
              <em className="not-italic italic" style={{ color: "hsl(258 80% 62%)" }}>Works.</em>
            </h1>
            <p className="text-lg sm:text-xl text-white/45 font-light leading-relaxed max-w-xl">
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
                    isActive ? "text-white" : "text-white/35 hover:text-white/70"
                  }`}
                >
                  <span
                    className={`text-xs font-medium tracking-wide ${
                      isActive ? "border-b border-white/80 pb-px" : "pb-px"
                    }`}
                  >
                    {cat}
                  </span>
                  <span className="text-[9px] font-mono bg-white/8 border border-white/10 px-1.5 py-0.5 rounded text-white/40">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project list */}
      <section className="px-6 lg:px-12 xl:px-16 pt-20 pb-32">
        <div className="max-w-[90rem] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-28 md:gap-40"
            >
              {filtered.length === 0 ? (
                <div className="py-40 text-center text-lg text-white/30 font-light font-serif italic">
                  No projects in this category yet.
                </div>
              ) : (
                filtered.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} />
                ))
              )}
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
            <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] leading-[1] tracking-tight text-white mb-10">
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
