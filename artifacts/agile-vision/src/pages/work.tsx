import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BrowserFrame, PhoneFrame } from "@/components/device-frames";

function ProjectCard({ project, index, isFeatured = false }: { project: Project; index: number; isFeatured?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
        className="group relative cursor-pointer h-full flex flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Number + rule */}
        <div className="flex items-center gap-6 mb-8">
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/20">{num}</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <div className={`flex flex-col gap-10 lg:gap-12 flex-1 ${isFeatured ? 'lg:flex-row items-center' : ''}`}>
          
          {/* Image */}
          <div className={`w-full flex-shrink-0 ${isFeatured ? 'lg:w-[60%]' : ''}`}>
            <div
              className="relative w-full overflow-hidden rounded-2xl bg-[#0d0d0d]"
              style={{
                aspectRatio: project.platform === "iOS" ? "3/4" : (isFeatured ? "16/10" : "4/3"),
                transform: hovered ? "scale(0.985)" : "scale(1)",
                transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.7s ease",
                boxShadow: hovered
                  ? `0 30px 100px -15px ${project.accentColor}40`
                  : "0 0 0 0 transparent",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none z-0"
                style={{ background: `radial-gradient(circle at 50% 60%, ${project.accentColor}35 0%, transparent 70%)` }}
              />

              {project.coverImage ? (
                project.platform === "iOS" ? (
                  <PhoneFrame src={project.coverImage} alt={project.name} accentColor={project.accentColor} />
                ) : (
                  <div className="absolute inset-4 md:inset-5">
                    <BrowserFrame src={project.coverImage} alt={project.name} accentColor={project.accentColor} url={project.website} />
                  </div>
                )
              ) : (
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center"
                  style={{ background: `radial-gradient(ellipse at center, ${project.accentColorLight}30, transparent)` }}
                >
                  <span className="text-4xl font-serif italic text-white/20">{project.name}</span>
                </div>
              )}

              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

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

          {/* Meta */}
          <div className={`w-full flex flex-col justify-center flex-1 ${isFeatured ? 'lg:w-[40%] lg:pl-4 xl:pl-8' : ''}`}>
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

            <h2 className={`${isFeatured ? 'text-[2.5rem] md:text-[3rem] lg:text-[4rem]' : 'text-[2rem] md:text-[2.5rem]'} font-serif tracking-tight text-white leading-[1.05] group-hover:text-white/90 transition-colors duration-300 mb-5`}>
              {project.name}
            </h2>

            <p className="text-sm md:text-base text-white/40 font-light italic leading-[1.7] mb-8 max-w-md">
              "{project.problemStatement}"
            </p>

            {project.keyStats && project.keyStats.length > 0 && (
              <div className={`grid grid-cols-2 ${isFeatured ? 'lg:grid-cols-3' : ''} gap-6 mb-8 pt-6 border-t border-white/[0.07]`}>
                {project.keyStats.slice(0, isFeatured ? 3 : 2).map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl lg:text-3xl font-serif text-white tracking-tight leading-none mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/30">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/35 group-hover:text-white/75 transition-colors duration-300">
              <span>Explore Case Study</span>
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
    <div className="min-h-screen bg-[#090909] selection:bg-primary/30 selection:text-white">
      {/* Hero */}
      <section className="pt-44 pb-16 px-6 lg:px-12 xl:px-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30 mb-8">
              Selected Work
            </p>
            <h1 className="font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] tracking-tight text-white mb-10">
              Proof of Craft
            </h1>
            <p className="text-lg sm:text-xl text-white/45 font-light leading-relaxed max-w-2xl">
              Intelligent platforms across fintech, insurtech, AI, and the future of work. We don't just build software — we craft digital experiences that command attention.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[4.5rem] z-40 bg-[#090909]/85 backdrop-blur-2xl border-y border-white/[0.06] mb-12 md:mb-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 xl:px-16">
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
                    className={`text-xs font-mono uppercase tracking-[0.1em] ${
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

      {/* Project list - Masonry / Featured Layout */}
      <section className="px-6 lg:px-12 xl:px-16 pb-32">
        <div className="max-w-[120rem] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-24 md:gap-32 lg:gap-40"
            >
              {filtered.length === 0 ? (
                <div className="py-40 text-center text-lg text-white/30 font-light font-serif italic">
                  No projects in this category yet.
                </div>
              ) : (
                <>
                  {/* First item is featured, full width */}
                  <div className="w-full">
                    <ProjectCard project={filtered[0]} index={0} isFeatured={true} />
                  </div>

                  {/* Rest in a 2-column masonry-style grid */}
                  {filtered.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-32">
                      {filtered.slice(1).map((project, i) => (
                        <div key={project.slug} className={`${i % 2 === 1 ? 'md:mt-24' : ''}`}>
                           <ProjectCard project={project} index={i + 1} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-40 px-6 lg:px-12 overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
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
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-base tracking-wide transition-all duration-300 hover:scale-105 hover:bg-white/92 shadow-lg shadow-white/5">
              Start the conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
