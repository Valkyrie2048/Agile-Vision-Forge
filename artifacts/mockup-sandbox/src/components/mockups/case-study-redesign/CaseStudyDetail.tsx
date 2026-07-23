import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Quote, Sparkles, BarChart3, TrendingUp, Search, BookOpen, Map, Mail } from "lucide-react";

const ACCENT = "hsl(158 58% 36%)";

const project = {
  name: "GIGAMATIC Finance",
  category: "Fintech",
  platform: "Web",
  status: "Live product — published",
  tagline: "Independent financial comparisons and expert guides for smarter money decisions.",
  summary:
    "A live financial media and comparison platform delivering 100% independent product comparisons, expert guides, market news, and life-stage planning content — helping consumers find the best savings accounts, credit cards, mortgages, and investments with no paid placement.",
  opportunity:
    "The financial comparison market is structurally compromised. Most 'independent' platforms earn revenue from the products they feature — creating a direct conflict between editorial integrity and commercial interest. GIGAMATIC Finance was built around genuine editorial independence as the product's core value.",
  vision:
    "A financial media platform where the independence is the differentiator. GIGAMATIC Finance covers financial products across savings, credit, mortgages, and investments — with expert guides, live market news, and life-stage content that meets consumers at the specific decisions they face.",
  services: ["Product Strategy", "UX Strategy", "User Experience Design", "User Interface Design", "Brand Direction", "Design Systems", "Front-End Development", "Editorial Direction"],
  designPrinciples: [
    { title: "Independence by design", description: "No promoted listings, no sponsored content, no commission-ordered results. Editorial independence is enforced at the product level." },
    { title: "Clarity over comprehensiveness", description: "Financial products are genuinely complex. The design surfaces what matters for a decision without overwhelming users." },
    { title: "Trust through restraint", description: "Fewer, clearer recommendations build more trust than exhaustive comparison tables optimised for engagement." },
    { title: "Context before comparison", description: "Users need to understand their situation before choosing a product. Guides and tools establish context first." },
  ],
  users: [
    { title: "Product shoppers", description: "People actively comparing savings accounts, credit cards, mortgages, or investment options who want unbiased rate comparisons." },
    { title: "Financial learners", description: "Readers building financial literacy through expert guides and accessible explainers on complex topics." },
  ],
  outcomes: [
    "Built a platform that earns consumer trust through structural independence — no commission-driven distortion, no promoted results.",
    "Delivered a design system that scales across comparison tables, editorial long-form, market news, and interactive product finders without visual fragmentation.",
    "Positioned GIGAMATIC Finance as a credible alternative to established comparison sites by making editorial integrity a visible, designed feature of the product.",
    "Created life-stage content architecture that contextualises financial decisions within the user's actual situation — not just the product category.",
  ],
  reflection:
    "The biggest design challenge wasn't visual — it was structural. Independence only becomes a product feature when it's legible to users. Every design decision, from how rates are displayed to how editorial content is labelled, had to make the independence visible.",
  capabilities: [
    { icon: "BarChart3", title: "Product comparison engine", description: "Side-by-side comparison of financial products across savings accounts, credit cards, mortgages, and robo-advisors — with live rates." },
    { icon: "BookOpen", title: "Expert financial guides", description: "In-depth guides covering how to evaluate, select, and apply for key financial products." },
    { icon: "TrendingUp", title: "Market news and rates", description: "Curated financial market news, interest rate updates, and economic context for consumers." },
    { icon: "Map", title: "Life stages content", description: "Content organised around life stage — starting out, building wealth, approaching retirement." },
    { icon: "Search", title: "Product finder", description: "A guided tool helping consumers identify the right product category and surface relevant comparisons." },
    { icon: "Mail", title: "Financial intelligence newsletter", description: "A weekly newsletter delivering curated financial insights — no fluff, no promotions." },
  ],
};

const SECTIONS = ["Hero", "Project Brief", "Vision & Principles", "Built For", "Core Capabilities", "The Outcomes", "Reflection"];

const ICON_MAP: Record<string, React.ElementType> = { BarChart3, TrendingUp, Search, BookOpen, Map, Mail, Sparkles };

function CapabilityIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className="w-5 h-5" />;
}

export function CaseStudyDetail() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("Hero");
  const containerRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);

      let current = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = sectionRefs.current[id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const containerTop = container.getBoundingClientRect().top;
          if (rect.top - containerTop < container.clientHeight * 0.35) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  function sectionRef(id: string) {
    return (el: HTMLElement | null) => { sectionRefs.current[id] = el; };
  }

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto relative"
      style={{ background: "#090909", color: "white", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
    >

      {/* ── STICKY PROGRESS BAR ── */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Thin accent progress line */}
        <div className="h-[2px] w-full" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div
            className="h-full transition-none"
            style={{ width: `${scrollProgress * 100}%`, background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}cc)` }}
          />
        </div>
        {/* Section label */}
        <div className="absolute top-4 right-6 flex items-center gap-3 pointer-events-none">
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/40">{activeSection}</span>
          <div className="w-px h-3 bg-white/15" />
          <span className="text-[9px] font-mono tracking-[0.2em] text-white/25">{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>

      {/* ── 1. HERO ── */}
      <section
        ref={sectionRef("Hero")}
        className="relative pt-28 pb-20 px-6 lg:px-12"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 100% 100% at 50% -20%, ${ACCENT}18 0%, transparent 70%)` }}
        />

        <div className="relative z-10 max-w-[90rem] mx-auto">
          <div className="mb-16">
            <a href="#" className="group flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-white/45 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Gallery
            </a>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-14">
            <div className="max-w-5xl">
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <span
                  className="text-xs font-mono tracking-[0.25em] uppercase px-4 py-2 rounded-full border border-white/10"
                  style={{ color: ACCENT, backgroundColor: `${ACCENT}14` }}
                >
                  {project.category}
                </span>
              </div>
              <h1
                className="font-['Playfair_Display'] text-white tracking-tight leading-[0.9]"
                style={{ fontSize: "clamp(3.5rem,9vw,11rem)" }}
              >
                {project.name}
              </h1>
            </div>

            <div className="flex flex-col gap-8 lg:text-right lg:min-w-[260px]">
              <p className="text-white/55 font-light leading-relaxed lg:ml-auto max-w-sm" style={{ fontSize: "clamp(1.1rem,1.8vw,1.6rem)" }}>
                {project.tagline}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/45 mb-1.5">Platform</div>
                  <div className="text-base font-medium text-white">{project.platform}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/45 mb-1.5">Status</div>
                  <div className="text-base font-medium" style={{ color: ACCENT }}>Live</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image placeholder */}
      <div className="w-full mb-20 border-y border-white/10" style={{ height: "45vh", background: `linear-gradient(135deg, ${ACCENT}12, ${ACCENT}04)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="font-['Playfair_Display'] italic text-white/10" style={{ fontSize: "clamp(3rem,8vw,8rem)" }}>{project.name}</span>
      </div>

      {/* ── MERGED: PROJECT BRIEF + OPPORTUNITY ── */}
      <section
        ref={sectionRef("Project Brief")}
        className="px-6 lg:px-12 mb-24 md:mb-36"
      >
        <div className="max-w-[90rem] mx-auto border-t border-white/[0.07] pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Opportunity quote with accent border */}
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/45 block mb-6">The Opportunity</span>
              <blockquote
                className="pl-8 md:pl-10"
                style={{ borderLeft: `2px solid ${ACCENT}` }}
              >
                <p className="text-white/75 font-light leading-[1.6] tracking-tight" style={{ fontSize: "clamp(1.1rem,1.8vw,1.5rem)" }}>
                  {project.opportunity}
                </p>
              </blockquote>
            </div>

            {/* Right: Summary + services */}
            <div className="flex flex-col justify-between gap-10">
              <div>
                <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/45 block mb-6">Project Brief</span>
                <p className="text-lg text-white/55 font-light leading-relaxed">
                  {project.summary}
                </p>
              </div>
              <div className="border-t border-white/[0.06] pt-6">
                <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40 mr-6">Services</span>
                <span className="text-sm text-white/55 font-light">{project.services.join(" · ")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & PRINCIPLES ── */}
      <section
        ref={sectionRef("Vision & Principles")}
        className="mb-24 md:mb-36 border-y border-white/[0.06] py-24 md:py-36"
        style={{ backgroundColor: `${ACCENT}08` }}
      >
        <div className="px-6 lg:px-12 max-w-[90rem] mx-auto">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-6" style={{ color: ACCENT }}>The Vision</div>
          <p className="text-white/85 font-light leading-[1.5] tracking-tight mb-24 max-w-4xl" style={{ fontSize: "clamp(1.3rem,2.5vw,2.4rem)" }}>
            {project.vision}
          </p>

          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/55 mb-10">Design Principles</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {project.designPrinciples.map((p, i) => (
              <div key={i}>
                <div className="text-[4rem] font-['Playfair_Display'] leading-none mb-4 tabular-nums select-none" style={{ color: `${ACCENT}20` }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="text-2xl font-['Playfair_Display'] text-white mb-2 tracking-tight">{p.title}</h4>
                <p className="text-base text-white/50 font-light leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR ── */}
      <section
        ref={sectionRef("Built For")}
        className="px-6 lg:px-12 mb-24 md:mb-36"
      >
        <div className="max-w-[90rem] mx-auto">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-16" style={{ color: ACCENT }}>Built For</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {project.users.map((user, i) => (
              <div key={i} className={`relative ${i % 2 !== 0 ? 'md:mt-20' : ''}`}>
                <span className="absolute -top-16 -left-4 font-['Playfair_Display'] leading-none opacity-[0.05] select-none" style={{ fontSize: "9rem", color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative pt-6 border-t border-white/20">
                  <h4 className="text-3xl font-['Playfair_Display'] text-white mb-4">{user.title}</h4>
                  <p className="text-lg text-white/55 font-light leading-relaxed max-w-md">{user.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section
        ref={sectionRef("Core Capabilities")}
        className="px-6 lg:px-12 mb-24 md:mb-36"
      >
        <div className="max-w-[90rem] mx-auto">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-10" style={{ color: ACCENT }}>Core Capabilities</div>

          {/* Hero capability */}
          <div
            className="relative rounded-[2.5rem] overflow-hidden mb-6"
            style={{ background: `linear-gradient(135deg, ${ACCENT}0D 0%, transparent 60%)` }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[2.5rem]" style={{ backgroundColor: ACCENT }} />
            <div className="p-12 lg:p-16 pl-14 lg:pl-20">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0" style={{ color: ACCENT }}>
                  <CapabilityIcon name={project.capabilities[0].icon} />
                </div>
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase pt-3.5" style={{ color: `${ACCENT}80` }}>Primary Capability</div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-['Playfair_Display'] text-white mb-4 leading-[1.1]">{project.capabilities[0].title}</h3>
              <p className="text-lg text-white/60 font-light leading-relaxed max-w-2xl">{project.capabilities[0].description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {project.capabilities.slice(1).map((cap, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/[0.018] border border-white/[0.06] flex flex-col hover:bg-white/[0.03] transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 mb-6 flex-shrink-0" style={{ color: ACCENT }}>
                  <CapabilityIcon name={cap.icon} />
                </div>
                <h4 className="text-xl font-['Playfair_Display'] text-white mb-3 leading-tight">{cap.title}</h4>
                <p className="text-sm text-white/45 font-light leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTCOMES (EDITORIAL REDESIGN) ── */}
      <section
        ref={sectionRef("The Outcomes")}
        className="px-6 lg:px-12 mb-0 border-t border-white/10 pt-24 md:pt-32"
      >
        <div className="max-w-[90rem] mx-auto">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-16" style={{ color: ACCENT }}>The Outcomes</div>

          <div className="flex flex-col">
            {project.outcomes.map((outcome, i) => (
              <div key={i}>
                <div className="py-10 md:py-14 group cursor-default">
                  <p
                    className="font-['Playfair_Display'] text-white/80 leading-[1.3] tracking-tight font-light group-hover:text-white transition-colors duration-500"
                    style={{ fontSize: "clamp(1.4rem,2.8vw,2.6rem)" }}
                  >
                    {outcome}
                  </p>
                </div>
                {i < project.outcomes.length - 1 && (
                  <div className="h-px bg-white/[0.06]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFLECTION ── */}
      <section
        ref={sectionRef("Reflection")}
        className="my-24 md:my-36 border-y border-white/10 py-24 md:py-36 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${ACCENT}06 0%, transparent 70%)` }}
        />
        <div className="px-6 lg:px-12 max-w-[80rem] mx-auto text-center relative z-10">
          <Quote className="w-8 h-8 mx-auto mb-10 text-white/10" />
          <p
            className="font-['Playfair_Display'] text-white/85 leading-[1.4] tracking-tight mx-auto"
            style={{ fontSize: "clamp(1.4rem,3vw,3rem)", maxWidth: "52rem" }}
          >
            "{project.reflection}"
          </p>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  );
}
