import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
        className="group block relative cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Image Container */}
          <div 
            className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl md:rounded-[2rem] bg-zinc-900 border border-white/5 transition-transform duration-700 ease-out"
            style={{ 
              transform: hovered ? 'scale(0.98)' : 'scale(1)',
              boxShadow: hovered ? `0 20px 80px -20px \${project.accentColor}30` : 'none'
            }}
          >
            {/* Background Glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
              style={{ background: `radial-gradient(circle at 50% 50%, \${project.accentColor}40 0%, transparent 70%)` }}
            />

            {project.coverImage ? (
              <motion.img
                src={project.coverImage}
                alt={project.name}
                className="w-full h-full object-cover object-top relative z-10"
                animate={{ scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : (
              <div 
                className="absolute inset-0 z-10 flex items-center justify-center"
                style={{ background: `radial-gradient(circle at center, \${project.accentColorLight}, transparent)` }}
              >
                <div className="text-4xl font-serif italic text-white/50">{project.name}</div>
              </div>
            )}

            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Hover Floating Button */}
            <motion.div 
              className="absolute bottom-8 right-8 z-30 w-16 h-16 rounded-full bg-white text-black flex items-center justify-center backdrop-blur-md"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <ArrowUpRight className="w-6 h-6" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12 px-2">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span 
                  className="text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-white/10"
                  style={{ color: project.accentColor }}
                >
                  {project.category}
                </span>
                <span className="text-sm font-medium text-white/40">{project.platform}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white group-hover:text-white/90 transition-colors">
                {project.name}
              </h2>
            </div>
            
            <div className="flex-1 md:max-w-md">
              <p className="text-base md:text-lg text-white/60 leading-relaxed font-light">
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.services.slice(0, 3).map(service => (
                  <span key={service} className="text-xs text-white/40 border border-white/10 px-3 py-1.5 rounded-full">
                    {service}
                  </span>
                ))}
                {project.services.length > 3 && (
                  <span className="text-xs text-white/30 px-2 py-1.5">
                    +{project.services.length - 3} more
                  </span>
                )}
              </div>
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
    description: "A curated collection of intelligent digital products designed by Vision AI Works.",
    url: "/work",
    type: "website",
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter(p => p.filterCategory === activeCategory);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-white">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl sm:text-7xl lg:text-[7rem] font-medium tracking-tighter text-white leading-[1.05] mb-8 font-serif">
              Work that <span className="text-white/40 italic">works.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/50 leading-relaxed font-light max-w-2xl">
              We design and build intelligent platforms across fintech, insurtech, AI, and the future of work. Proof of craft, delivered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 lg:px-8 pb-12 sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto no-scrollbar py-4">
          {projectCategories.map(cat => {
            const isActive = activeCategory === cat;
            const count = cat === "All" ? projects.length : projects.filter(p => p.filterCategory === cat).length;
            
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`group flex items-center gap-2 whitespace-nowrap transition-all duration-300 \${
                  isActive ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                <span className={`text-sm font-medium tracking-wide \${isActive ? "border-b border-white pb-1" : "pb-1"}`}>
                  {cat}
                </span>
                <span className="text-[10px] font-mono mb-1 bg-white/10 px-1.5 py-0.5 rounded text-white/50">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-32"
            >
              {filtered.length === 0 ? (
                <div className="py-32 text-center text-xl text-white/40 font-light">
                  No projects found for this category.
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

      {/* Call to Action */}
      <section className="py-32 px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-medium text-white mb-8 tracking-tight">
              Ready to build something <i className="text-primary">extraordinary?</i>
            </h2>
            <Link href="/contact">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-lg transition-transform hover:scale-105 hover:bg-white/90">
                Start the conversation
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
