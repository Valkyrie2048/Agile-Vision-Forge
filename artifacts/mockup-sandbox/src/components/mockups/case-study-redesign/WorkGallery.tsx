import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const ACCENT = "hsl(158 58% 36%)";
const ACCENT2 = "hsl(220 70% 55%)";
const ACCENT3 = "hsl(40 85% 55%)";
const ACCENT4 = "hsl(280 60% 55%)";
const ACCENT5 = "hsl(0 70% 55%)";
const ACCENT6 = "hsl(180 60% 45%)";

const projects = [
  {
    slug: "gigamatic-finance",
    name: "GIGAMATIC Finance",
    category: "Fintech",
    tagline: "Independent financial comparisons and expert guides for smarter money decisions.",
    services: ["Product Strategy", "UX Design", "UI Design", "Brand Direction", "Front-End Dev"],
    platform: "Web",
    accentColor: ACCENT,
    coverBg: "linear-gradient(135deg, hsl(158 58% 10%), hsl(158 58% 4%))",
  },
  {
    slug: "gigamatic-insure",
    name: "GIGAMATIC Insure",
    category: "Insurtech",
    tagline: "Transparent insurance comparisons built on genuine independence, not commission.",
    services: ["Product Strategy", "UX Research", "UI Design", "Design Systems"],
    platform: "Web",
    accentColor: ACCENT2,
    coverBg: "linear-gradient(135deg, hsl(220 70% 12%), hsl(220 70% 5%))",
  },
  {
    slug: "gigamatic-careers",
    name: "GIGAMATIC Careers",
    category: "Future of Work",
    tagline: "AI-powered career intelligence for professionals navigating a rapidly changing market.",
    services: ["UX Strategy", "UI Design", "AI Integration", "Brand Direction"],
    platform: "Web · Mobile",
    accentColor: ACCENT3,
    coverBg: "linear-gradient(135deg, hsl(40 85% 14%), hsl(40 85% 5%))",
  },
  {
    slug: "gigamatic-ai",
    name: "GIGAMATIC AI",
    category: "AI Platform",
    tagline: "Enterprise AI tooling for teams that need precision, not just possibility.",
    services: ["Product Strategy", "UI Design", "Design Systems", "Front-End Dev"],
    platform: "Web",
    accentColor: ACCENT4,
    coverBg: "linear-gradient(135deg, hsl(280 60% 12%), hsl(280 60% 5%))",
  },
  {
    slug: "consciousness-institute",
    name: "Institute for AI & Consciousness",
    category: "Research",
    tagline: "Exploring the intersection of artificial intelligence and the future of human awareness.",
    services: ["Brand Direction", "Editorial Design", "UI Design", "Content Strategy"],
    platform: "Web",
    accentColor: ACCENT5,
    coverBg: "linear-gradient(135deg, hsl(0 70% 12%), hsl(0 70% 5%))",
  },
  {
    slug: "hudson-navigation",
    name: "Hudson Navigation",
    category: "Maritime Tech",
    tagline: "Next-generation AI navigation systems for commercial maritime operations.",
    services: ["Product Strategy", "UX Design", "UI Design", "Design Systems"],
    platform: "Web · Desktop",
    accentColor: ACCENT6,
    coverBg: "linear-gradient(135deg, hsl(180 60% 10%), hsl(180 60% 4%))",
  },
];

const categories = ["All", "Fintech", "Insurtech", "Future of Work", "AI Platform", "Research", "Maritime Tech"];

function HeroCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="#" className="block group cursor-pointer">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-[2rem] overflow-hidden border border-white/[0.06]"
        style={{
          background: project.coverBg,
          boxShadow: hovered ? `0 40px 120px -20px ${project.accentColor}40` : "none",
          transition: "box-shadow 0.7s ease",
        }}
      >
        <div className="w-full" style={{ aspectRatio: "16/7" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif italic text-white/10" style={{ fontSize: "clamp(3rem,8vw,8rem)" }}>{project.name}</span>
          </div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `radial-gradient(ellipse at 50% 60%, ${project.accentColor}25, transparent 70%)` }}
          />
          <div
            className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.7)" }}
          >
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        <div className="p-10 lg:p-14 border-t border-white/[0.06] flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: project.accentColor }}>{project.category}</span>
              <span className="text-white/20">·</span>
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/55">{project.platform}</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-[clamp(2.2rem,4vw,4.5rem)] text-white leading-[1] tracking-tight mb-4">{project.name}</h2>
            <p className="text-lg text-white/55 font-light leading-relaxed max-w-2xl">{project.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end flex-shrink-0 lg:max-w-xs">
            {project.services.slice(0, 4).map((s) => (
              <span key={s} className="text-[10px] font-mono tracking-wider text-white/65 border border-white/10 px-2.5 py-1 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

function AsymCard({ project, wide }: { project: typeof projects[0]; wide: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="#" className="block group cursor-pointer">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-[1.75rem] overflow-hidden border border-white/[0.06] flex flex-col h-full"
        style={{
          background: project.coverBg,
          boxShadow: hovered ? `0 24px 80px -12px ${project.accentColor}35` : "none",
          transition: "box-shadow 0.7s ease",
        }}
      >
        <div className="w-full flex-1 relative" style={{ minHeight: wide ? 300 : 220 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-['Playfair_Display'] italic text-white/8" style={{ fontSize: wide ? "5rem" : "3.5rem" }}>{project.name}</span>
          </div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accentColor}20, transparent 70%)` }}
          />
          <div
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.7)" }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="p-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: project.accentColor }}>{project.category}</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/55">{project.platform}</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-2xl lg:text-3xl text-white leading-[1.1] tracking-tight mb-3">{project.name}</h2>
          <p className="text-sm text-white/50 font-light leading-relaxed line-clamp-2 mb-5">{project.tagline}</p>
          <div className="flex items-center gap-2 text-xs font-medium text-white/55 group-hover:text-white/80 transition-colors">
            <span>View case study</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </a>
  );
}

function AccentCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="#" className="block group cursor-pointer">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-[2rem] overflow-hidden border border-white/[0.06] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12"
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}18 0%, ${project.accentColor}06 100%)`,
          boxShadow: hovered ? `0 30px 100px -20px ${project.accentColor}40` : "none",
          transition: "box-shadow 0.7s ease",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${project.accentColor}15, transparent 60%)` }}
        />
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: project.accentColor }}>{project.category}</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-[clamp(2.5rem,5vw,5rem)] text-white leading-[1] tracking-tight mb-6">{project.name}</h2>
          <p className="text-xl text-white/55 font-light leading-relaxed max-w-xl">{project.tagline}</p>
        </div>
        <div className="relative z-10 flex-shrink-0">
          <div
            className="w-20 h-20 rounded-full border flex items-center justify-center transition-all duration-500"
            style={{
              borderColor: `${project.accentColor}50`,
              backgroundColor: hovered ? `${project.accentColor}20` : "transparent",
            }}
          >
            <ArrowUpRight className="w-8 h-8" style={{ color: project.accentColor }} />
          </div>
        </div>
      </div>
    </a>
  );
}

export function WorkGallery() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

  return (
    <div className="min-h-screen" style={{ background: "#090909", color: "white" }}>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 lg:px-12">
        <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/55 mb-8">Vision AI Works — Selected Work</p>
        <h1 className="font-['Playfair_Display'] leading-[0.95] tracking-tight text-white mb-8" style={{ fontSize: "clamp(3rem,8vw,9rem)" }}>
          Work that <em className="italic text-white/35">works.</em>
        </h1>
        <p className="text-lg text-white/60 font-light leading-relaxed max-w-lg">
          Intelligent platforms across fintech, insurtech, AI, and the future of work.
        </p>
      </section>

      {/* Filter bar */}
      <div className="sticky top-0 z-40 border-b border-white/[0.06]" style={{ background: "rgba(9,9,9,0.9)", backdropFilter: "blur(20px)" }}>
        <div className="px-6 lg:px-12">
          <div className="flex items-center gap-6 overflow-x-auto py-4" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="whitespace-nowrap transition-all duration-200"
                style={{ color: active === cat ? "white" : "rgba(255,255,255,0.45)" }}
              >
                <span className="text-xs font-medium tracking-wide" style={{ borderBottom: active === cat ? "1px solid rgba(255,255,255,0.7)" : "none", paddingBottom: 2 }}>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Magazine grid */}
      <section className="px-6 lg:px-12 pt-16 pb-32">
        <div className="flex flex-col gap-8">

          {/* Row 0: Hero card (full width) */}
          {filtered[0] && <HeroCard project={filtered[0]} />}

          {/* Row 1: 60 / 40 split */}
          {filtered.length > 1 && (
            <div className="grid gap-8" style={{ gridTemplateColumns: "60fr 40fr" }}>
              {filtered[1] && <AsymCard project={filtered[1]} wide={true} />}
              {filtered[2] && <AsymCard project={filtered[2]} wide={false} />}
            </div>
          )}

          {/* Row 2: 40 / 60 split (reversed) */}
          {filtered.length > 3 && (
            <div className="grid gap-8" style={{ gridTemplateColumns: "40fr 60fr" }}>
              {filtered[3] && <AsymCard project={filtered[3]} wide={false} />}
              {filtered[4] && <AsymCard project={filtered[4]} wide={true} />}
            </div>
          )}

          {/* Row 3: Full-width accent card */}
          {filtered[5] && <AccentCard project={filtered[5]} />}

          {/* Remaining: standard 2-col grid */}
          {filtered.length > 6 && (
            <div className="grid grid-cols-2 gap-8">
              {filtered.slice(6).map(p => <AsymCard key={p.slug} project={p} wide={true} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-12 border-t border-white/[0.06] text-center">
        <h2 className="font-['Playfair_Display'] text-white mb-10 leading-[1] tracking-tight" style={{ fontSize: "clamp(2.5rem,5vw,6rem)" }}>
          Ready to build something <em className="italic" style={{ color: ACCENT }}>extraordinary?</em>
        </h2>
        <button
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105"
        >
          Start the conversation
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
