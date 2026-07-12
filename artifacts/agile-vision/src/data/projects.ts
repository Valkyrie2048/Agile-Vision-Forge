export interface ProjectCapability {
  icon: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  type: "browser" | "phone" | "detail" | "fullwidth";
  label: string;
  description: string;
  screens: string[];
  imagePath?: string;
}

export interface Project {
  slug: string;
  name: string;
  coverImage?: string;
  category: string;
  filterCategory: string;
  tagline: string;
  summary: string;
  website?: string;
  services: string[];
  platform: string;
  status: string;
  accentColor: string;
  accentColorLight: string;
  opportunity: string;
  vision: string;
  users: { title: string; description: string }[];
  capabilities: ProjectCapability[];
  designPrinciples: { title: string; description: string }[];
  aiRole: { title: string; description: string }[];
  gallery: GalleryItem[];
  outcomes: string[];
  reflection: string;
}

export const projects: Project[] = [
  {
    slug: "gigamatic-finance",
    name: "GIGAMATIC Finance",
    category: "Fintech",
    filterCategory: "Fintech",
    tagline: "Independent financial comparisons and expert guides for smarter money decisions.",
    summary:
      "A live financial media and comparison platform delivering 100% independent product comparisons, expert guides, market news, and life-stage financial planning content — helping consumers find the best savings accounts, credit cards, mortgages, and investment products with no paid placement and no commission-driven agenda.",
    website: "gigamatic.finance",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "Brand Direction",
      "Design Systems",
      "Front-End Development",
      "Editorial Direction",
    ],
    platform: "Web",
    status: "Live product — published",
    accentColor: "hsl(158 58% 22%)",
    accentColorLight: "hsla(158,58%,22%,0.10)",
    opportunity:
      "The financial comparison market is structurally compromised. Most 'independent' comparison platforms earn revenue from the products they feature — creating a direct conflict between editorial integrity and commercial interest. Consumers navigating savings rates, mortgage options, credit cards, and investment products cannot easily distinguish genuine guidance from dressed-up advertising. GIGAMATIC Finance was built around a different model: genuine editorial independence as the product's core value, where no promoted listings, no commission tables, and no sponsored content exist to distort the comparison.",
    vision:
      "A financial media platform where the independence is the differentiator. GIGAMATIC Finance covers 60+ financial products across savings, credit, mortgages, and investments — with 14 expert guides, live market news, and life-stage content that meets consumers at the specific decisions they face. The product is designed to earn trust over time through consistent editorial rigour, not to optimize for conversion. With 10,000+ newsletter subscribers and a growing readership, it positions itself as the financial media destination for people who want signal over noise.",
    users: [
      { title: "Product shoppers", description: "People actively comparing savings accounts, credit cards, mortgages, or investment options who want unbiased rate and feature comparisons." },
      { title: "Financial learners", description: "Readers building their financial literacy through expert guides and accessible explainers on complex topics." },
      { title: "Market followers", description: "People tracking interest rate movements, economic news, and financial market developments in plain language." },
      { title: "Life-stage decision makers", description: "Consumers navigating significant financial transitions — first home, career change, retirement planning — who need contextually relevant guidance." },
    ],
    capabilities: [
      { icon: "BarChart3", title: "Product comparison engine", description: "Side-by-side comparison of 60+ financial products across savings accounts, credit cards, mortgages, and robo-advisors — with live rates, fees, and feature breakdowns." },
      { icon: "BookOpen", title: "Expert financial guides", description: "14 in-depth guides covering how to evaluate, select, and apply for key financial products — written for informed consumers, not specialists." },
      { icon: "TrendingUp", title: "Market news and rates", description: "Curated financial market news, interest rate updates, and economic context for consumers tracking conditions relevant to their decisions." },
      { icon: "Map", title: "Life stages content", description: "Financially-oriented content organized around life stage — starting out, building wealth, approaching retirement — surfacing relevant guidance at the right moment." },
      { icon: "Search", title: "Product finder", description: "A guided tool helping consumers identify the right product category and surface relevant comparisons based on their specific situation." },
      { icon: "Mail", title: "Financial intelligence newsletter", description: "A weekly newsletter delivering curated financial insights to 10,000+ subscribers — no fluff, no promotions, just signal." },
    ],
    designPrinciples: [
      { title: "Independence by design", description: "No promoted listings, no sponsored content, no commission-ordered results. Editorial independence is enforced at the product level, not just stated in a disclaimer." },
      { title: "Clarity over comprehensiveness", description: "Financial products are genuinely complex. The design surfaces what matters for a decision without overwhelming users with irrelevant detail." },
      { title: "Trust through restraint", description: "The visual language is clean, confident, and deliberately calm — resisting the urgency-based design patterns common in financial comparison sites." },
      { title: "Readable at every level", description: "Guides and comparisons are written and designed to serve both first-time product shoppers and financially literate readers without condescension at either end." },
    ],
    aiRole: [
      { title: "Content personalisation (proposed)", description: "A planned layer would surface guides, comparisons, and news most relevant to a reader's demonstrated interests and financial life stage." },
      { title: "Rate alert intelligence (future vision)", description: "The product roadmap includes intelligent rate monitoring — alerting subscribers when products they have viewed or saved reach competitive thresholds." },
      { title: "Product matching (design exploration)", description: "Exploration of how a guided, conversational interface could replace form-based product finders for readers who are uncertain about which category of product they need." },
    ],
    coverImage: "/work/gigamatic-finance-cover.svg",
    gallery: [
      { type: "browser", label: "Homepage", description: "The editorial homepage: independent positioning, product categories, and the financial guide library at a glance", screens: ["hero", "categories", "guides"], imagePath: "/work/gigamatic-finance-dashboard.svg" },
      { type: "browser", label: "Product comparison", description: "Savings account comparison table with live rates, minimum deposits, and product features", screens: ["comparison-table", "rate-details"], imagePath: "/work/gigamatic-finance-mobile.svg" },
      { type: "detail", label: "Expert guide", description: "Long-form guide layout — structured for deep reading with in-article comparison data and related products", screens: ["guide-body", "inline-comparison"], imagePath: "/work/gigamatic-finance-products.svg" },
      { type: "browser", label: "Market news", description: "Financial news feed with rate movements, economic context, and curated market commentary", screens: ["news-feed", "article-preview"], imagePath: "/work/gigamatic-finance-insights.svg" },
    ],
    outcomes: [
      "Built and launched a live financial media platform with 60+ products compared and 14 expert financial guides",
      "Established a 100% independent editorial model with no promoted listings or commission-based product ordering",
      "Grew to 10,000+ newsletter subscribers through a consistent signal-over-noise content approach",
      "Designed a comparison and guide architecture that serves both first-time product shoppers and financially literate readers",
      "Positioned GIGAMATIC Finance as a credible alternative to commission-driven financial comparison platforms",
    ],
    reflection:
      "The most significant design challenge in GIGAMATIC Finance was resisting the patterns that dominate financial comparison design — urgency cues, promotional framing, artificial scarcity signals. Every default in the category pushes toward conversion optimization at the expense of trust. Building against those defaults required deliberate choices at every level: the tone of comparison copy, the absence of 'best' badges with commercial strings attached, the decision to show rates without promotional distortion. The result is a platform whose design communicates independence before a user reads a single word of editorial policy.",
  },
  {
    slug: "gigamatic-insure",
    name: "GIGAMATIC Insure",
    category: "Insurtech",
    filterCategory: "Insurtech",
    tagline: "Compare quotes from 40+ top insurers in under 5 minutes — no paperwork, no hassle.",
    summary:
      "A live insurance comparison marketplace connecting consumers with quotes from 40+ top-rated insurers across auto, home, life, health, business, and renters insurance. With 2M+ quotes compared and an average saving of $720/year, the platform makes switching effortless and finding better coverage fast.",
    website: "gigamatic.insure",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "Brand Direction",
      "Front-End Development",
    ],
    platform: "Web",
    status: "Live product — published",
    accentColor: "hsl(145 90% 42%)",
    accentColorLight: "hsla(145,90%,42%,0.10)",
    opportunity:
      "Insurance shopping remains one of the most friction-heavy consumer experiences on the internet. Traditional comparison sites are cluttered, ad-heavy, and frequently hand off to call centres rather than delivering a quote in the browser. Many consumers avoid switching entirely because the process is perceived as too complex or time-consuming — leaving significant annual savings unrealised. GIGAMATIC Insure was designed to collapse that friction: a clean, fast, multi-carrier comparison experience that gets a consumer from zero to a meaningful set of quotes in under five minutes, with no paperwork and no unsolicited calls.",
    vision:
      "An insurance marketplace where the experience is the product. GIGAMATIC Insure puts the quote widget at the centre of the homepage — not buried behind a marketing pitch. The interface is dark and confident, the brand language is direct, and the comparison flow is optimized for speed and clarity over lead-generation friction. Beyond one-time comparisons, the My Policies dashboard gives users an ongoing view of their coverage, creating a platform that is useful after purchase, not just before it. Integrated finance tools extend the value across auto refinance, mortgage rates, and personal finance products.",
    users: [
      { title: "First-time buyers", description: "People purchasing their first auto or home insurance policy who need clear product explanations alongside competitive quotes." },
      { title: "Switchers seeking savings", description: "Existing policyholders who know they are overpaying and want a fast, low-friction path to better rates." },
      { title: "Homeowners and renters", description: "People comparing home and renters coverage across carriers who want feature-level clarity, not just headline prices." },
      { title: "Small business owners", description: "Business owners comparing commercial coverage options who need multi-product flexibility in a single marketplace." },
    ],
    capabilities: [
      { icon: "Search", title: "Instant quote comparison", description: "Compare quotes from 40+ top-rated insurers in under 5 minutes — with no paperwork, no phone calls, and no commitment required." },
      { icon: "Shield", title: "Multi-category coverage", description: "Auto, home, life, health, business, and renters insurance in one marketplace — with a consistent comparison interface across categories." },
      { icon: "FileText", title: "My Policies dashboard", description: "Post-purchase dashboard giving users visibility into their active policies, renewal dates, and coverage details in one place." },
      { icon: "CreditCard", title: "Integrated finance tools", description: "Extend beyond insurance into adjacent financial products — auto refinance, mortgage rates, credit cards, and personal loans — within the same platform." },
      { icon: "BookOpen", title: "Learning Hub", description: "Plain-language guides to insurance categories, coverage decisions, and how to evaluate quotes — designed for people buying insurance for the first time." },
      { icon: "Sparkles", title: "Ask GIGI", description: "An AI-powered chatbot providing instant answers to coverage questions, policy explanations, and navigation assistance across the platform." },
    ],
    designPrinciples: [
      { title: "Quote first", description: "The comparison widget is the homepage. The product's value is immediate — users can begin comparing before scrolling, without reading marketing copy first." },
      { title: "Speed as trust", description: "Getting to a meaningful set of quotes in under five minutes is itself a trust signal. Every step of the quote flow is designed to reduce friction, not add it." },
      { title: "Dark and confident", description: "The near-black visual language signals seriousness and differentiates from cluttered, light-background comparison sites. The electric green accent communicates speed and action." },
      { title: "Useful after purchase", description: "My Policies exists because the comparison experience should not end at click-through. Ongoing policy visibility creates a platform relationship, not a one-time transaction." },
    ],
    aiRole: [
      { title: "Ask GIGI (live)", description: "An embedded AI chatbot providing real-time answers to coverage questions, quote navigation, and policy explanations — reducing drop-off at points of confusion in the comparison flow." },
      { title: "Coverage recommendation (proposed)", description: "A planned capability to surface recommended coverage levels and policy features based on user-provided profile data and stated risk tolerance." },
      { title: "Renewal intelligence (future vision)", description: "The product roadmap includes proactive renewal alerts with real-time comparison data — surfacing better quotes before a policy auto-renews at a worse rate." },
    ],
    coverImage: "/work/gigamatic-insure-cover.svg",
    gallery: [
      { type: "browser", label: "Homepage", description: "The quote widget takes centre stage: insurance type selector, instant comparison CTA, and social proof at a glance", screens: ["hero", "quote-widget", "stats"], imagePath: "/work/gigamatic-insure-onboarding.svg" },
      { type: "browser", label: "Coverage categories", description: "Full insurance category selection — auto, home, life, health, business, renters — with integrated finance product access", screens: ["category-grid"], imagePath: "/work/gigamatic-insure-coverage.svg" },
      { type: "detail", label: "Quote results", description: "Side-by-side insurer comparison with monthly premium, coverage level, carrier rating, and direct quote links", screens: ["results-table"], imagePath: "/work/gigamatic-insure-comparison.svg" },
      { type: "browser", label: "My Policies", description: "Post-purchase policy dashboard showing active coverage, renewal dates, and account management", screens: ["policies-list", "policy-detail"], imagePath: "/work/gigamatic-insure-eligibility.svg" },
    ],
    outcomes: [
      "Built and launched a live insurance comparison marketplace with 40+ carrier integrations across six insurance categories",
      "Achieved 2M+ quotes compared with an average consumer saving of $720/year",
      "Designed and shipped a sub-5-minute quote comparison flow with no paperwork or call-centre handoff",
      "Extended the platform beyond insurance into integrated finance tools — auto refinance, mortgage rates, and personal finance products",
      "Shipped Ask GIGI, an embedded AI chatbot reducing user confusion and drop-off in the quote comparison flow",
    ],
    reflection:
      "GIGAMATIC Insure taught us that in a category defined by friction, removing steps is more powerful than adding features. The homepage quote widget — putting the comparison directly in the hero without a marketing pitch in front of it — was the most important single design decision in the project. Every subsequent decision was tested against that principle: does this step serve the user's goal of getting to a meaningful comparison, or does it serve a lead-generation metric that conflicts with it? The My Policies dashboard emerged from the same logic: if the platform is genuinely useful, users should have reason to return after purchase — not just before it.",
  },
  {
    slug: "gigamatic-careers",
    name: "GIGAMATIC Careers",
    category: "Future of Work",
    filterCategory: "Future of Work",
    tagline: "Strategic career insights for the decisions that define your professional life.",
    summary:
      "A live career media platform publishing expert editorial content on career transitions, leadership, management, and professional development — combining in-depth articles with career tools, curated learning resources, job listings, and ongoing industry news for professionals who want strategic insight, not generic advice.",
    website: "gigamatic.careers",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "Brand Direction",
      "Front-End Development",
      "Editorial Direction",
    ],
    platform: "Web",
    status: "Live product — published",
    accentColor: "hsl(220 15% 18%)",
    accentColorLight: "hsla(220,15%,18%,0.08)",
    opportunity:
      "Career advice is one of the most abundant and least valuable categories of content on the internet. Generic productivity tips, motivational platitudes, and listicles dominate a space where professionals face genuinely consequential decisions — whether to take a management track or stay individual contributor, how to navigate a sector transition, when to leave a role, how to build leverage before you need it. Premium career intelligence exists — in executive coaching, in elite MBA programmes, in well-networked professional communities — but it is expensive, inaccessible, and rarely available in a readable format. GIGAMATIC Careers was built to change that ratio: serious, strategically useful editorial content about the decisions that define careers, freely available in a reading experience that matches the quality of the writing.",
    vision:
      "A career media platform that treats its audience as intelligent professionals navigating real complexity. The editorial positioning focuses on career transitions, leadership development, and strategic career planning — with a visual language drawn from the best editorial and long-form journalism traditions: generous typography, strong imagery, and a reading experience that prioritizes the content over the chrome. Alongside the editorial core, job listings, curated learning resources, and career tools extend the platform's utility beyond reading into the decisions themselves.",
    users: [
      { title: "Mid-career professionals", description: "Experienced workers navigating significant career decisions — transitions, promotions, pivots — who need strategic depth, not generic tips." },
      { title: "Emerging leaders", description: "Professionals stepping into management or leadership for the first time who want frameworks and insight from people who have navigated the same transition." },
      { title: "Career pivoters", description: "People considering meaningful changes — industry, function, or employment type — who need both strategic perspective and practical intelligence on what those moves actually involve." },
      { title: "Ambitious early-career readers", description: "Early-career professionals building strategic foundations and career awareness that most people only develop through expensive experience." },
    ],
    capabilities: [
      { icon: "BookOpen", title: "Expert editorial content", description: "In-depth articles on career transitions, leadership, management, and professional development — written with strategic depth for a professional audience." },
      { icon: "GitBranch", title: "Career path coverage", description: "Dedicated content tracks on career path decisions — IC vs management, startup vs corporate, sector transitions — with featured and evergreen coverage." },
      { icon: "Briefcase", title: "Job listings", description: "Curated job board integrated with the editorial platform — surfacing relevant opportunities in the context of career intelligence content." },
      { icon: "GraduationCap", title: "Learning resources", description: "Curated learning recommendations — courses, programmes, and resources — organised by career stage and development goal." },
      { icon: "Globe", title: "Industry news", description: "Curated career and workplace news for professionals tracking developments relevant to their industry, function, or career stage." },
      { icon: "Sparkles", title: "Ask GIGI", description: "An AI-powered career assistant providing instant responses to career questions, content recommendations, and navigation across the platform's resources." },
    ],
    designPrinciples: [
      { title: "Typography is the product", description: "Long-form reading is the primary experience. Type hierarchy, measure, leading, and image-text relationships are treated as fundamental product decisions, not aesthetic choices." },
      { title: "Editorial visual language", description: "The platform draws on the visual conventions of the best long-form journalism — generous whitespace, large editorial images, confident typographic hierarchy — rather than the SaaS-product design that dominates career tools." },
      { title: "Substance over signalling", description: "No listicles, no clickbait headlines, no motivational filler. Editorial standards are treated as a product quality metric, enforced through commissioning decisions and design that rewards depth." },
      { title: "Career tools in editorial context", description: "Job listings, learning resources, and career tools are integrated into the editorial experience — surfaced as useful complements to reading, not as separate product sections competing for attention." },
    ],
    aiRole: [
      { title: "Ask GIGI (live)", description: "An embedded AI career assistant providing instant responses to reader questions, content recommendations, and guidance across the platform's editorial and tool resources." },
      { title: "Content discovery (proposed)", description: "A planned layer that surfaces editorially relevant content based on a reader's demonstrated interests, career stage, and reading history." },
      { title: "Job matching (future vision)", description: "The product roadmap includes intelligent job matching — connecting readers to listings relevant to their career trajectory and stated professional goals, surfaced in editorial context." },
    ],
    coverImage: "/work/gigamatic-careers-cover.svg",
    gallery: [
      { type: "fullwidth", label: "Editorial homepage", description: "The editorial-first homepage: headline positioning, featured articles with editorial photography, and clear content category navigation", screens: ["homepage-hero", "featured-articles"], imagePath: "/work/gigamatic-careers-profile.svg" },
      { type: "browser", label: "Article reading experience", description: "Long-form article layout — generous typography, full-bleed editorial photography, structured reading experience with related content", screens: ["article-body", "related"], imagePath: "/work/gigamatic-careers-skills.svg" },
      { type: "detail", label: "Job listings", description: "Curated job board integrated with the editorial platform — company, role, location, and type with search and filter", screens: ["listings-grid", "filter-panel"], imagePath: "/work/gigamatic-careers-opportunities.svg" },
      { type: "browser", label: "Learning resources", description: "Curated learning organised by career stage and development goal — courses, programmes, and resources surfaced alongside editorial content", screens: ["learning-grid"], imagePath: "/work/gigamatic-careers-pathway.svg" },
    ],
    outcomes: [
      "Built and launched a live career media platform with a consistent editorial voice and professional-grade reading experience",
      "Established a content architecture spanning career path articles, leadership editorial, management guidance, job listings, and learning resources",
      "Designed a visual language for career editorial that draws on the best long-form journalism traditions rather than SaaS product conventions",
      "Shipped Ask GIGI as an integrated career AI assistant — providing instant guidance, content recommendations, and platform navigation",
      "Positioned GIGAMATIC Careers as a strategic alternative to the generic advice content that dominates the career media category",
    ],
    reflection:
      "The central design decision in GIGAMATIC Careers was choosing editorial visual conventions over product design conventions. The instinct in most digital career platforms is to reach for cards, dashboards, progress bars, and feature lists — the visual language of SaaS. We chose something different: the visual language of the best editorial publications, where typography is the interface, photography earns its space, and the reading experience is the product. That decision shaped everything — headline treatment, image selection, article layout, the weight given to white space. The result is a platform that communicates seriousness through form before a reader reaches the content.",
  },
  {
    slug: "gigamatic-ai",
    name: "GIGAMATIC AI",
    category: "Artificial Intelligence",
    filterCategory: "Artificial Intelligence",
    tagline: "Discover, compare, and master the AI tools powering the modern era.",
    summary:
      "A live AI discovery and learning platform featuring 220+ verified AI tools across 13 categories, 45+ expert courses curated from Stanford, MIT, and Google, 22 video series, a personal 'My Stack' tool builder, real-time AI news, and an AI chatbot — all free, all in one place.",
    website: "gigamatic.ai",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "Brand Direction",
      "Front-End Development",
      "AI Integration",
    ],
    platform: "Web",
    status: "Live product — published",
    accentColor: "hsl(258 80% 62%)",
    accentColorLight: "hsla(258,80%,62%,0.12)",
    opportunity:
      "The AI tools landscape is expanding faster than anyone can track — hundreds of new tools launch each month across writing, image generation, coding, video, audio, and productivity categories. For individuals trying to understand what is available, what is worth using, and how to build effective AI workflows, the signal-to-noise problem is severe. Simultaneously, AI education is scattered across dozens of platforms with unclear quality signals, inconsistent depth, and significant paywalls. GIGAMATIC AI was built to solve both problems at once: a single, curated, free platform that functions as both an authoritative tool directory and a structured learning hub — letting users discover, evaluate, and master AI in the same place.",
    vision:
      "GIGAMATIC AI is designed as the definitive starting point for anyone navigating the AI landscape — from professionals looking for the right tool for a specific task to learners building structured AI literacy from world-class institutions. The product vision centres on quality of curation over volume of coverage, genuine utility over engagement optimization, and a personal layer that makes value accumulate over time. My Stack lets users build and reference their personal AI toolkit; Ask GIGI provides instant, contextual answers; and a real-time AI news feed keeps the platform current in a space that changes daily.",
    users: [
      { title: "Professionals adopting AI", description: "Knowledge workers evaluating AI tools for writing, research, coding, or productivity — looking for curated options rather than an undifferentiated list of everything." },
      { title: "Structured learners", description: "People who want to build serious AI literacy through expert-curated courses from institutions like Stanford, MIT, Google, and Hugging Face." },
      { title: "Teams building AI workflows", description: "Teams selecting and standardising AI tools across functions — using the directory and comparison features to evaluate options and build a shared stack." },
      { title: "AI practitioners staying current", description: "Developers, researchers, and AI practitioners using the news feed, events calendar, and tool updates to track a fast-moving space." },
    ],
    capabilities: [
      { icon: "Search", title: "AI tools directory", description: "220+ verified AI tools across 13 categories — writing, image, video, code, audio, productivity, and more — with descriptions, use cases, and comparison." },
      { icon: "Sparkles", title: "My Stack", description: "A personal AI tool builder letting users curate, organise, and reference the tools they actually use — building a persistent, shareable AI stack over time." },
      { icon: "GraduationCap", title: "Expert course library", description: "45+ courses curated from Stanford, MIT, Google, DeepLearning.AI, Hugging Face, and Fast.ai — free, structured, and organised by skill level and topic." },
      { icon: "TrendingUp", title: "AI news feed", description: "Real-time AI news curated for practitioners and adopters — product launches, research developments, and industry movements without the noise." },
      { icon: "Calendar", title: "Events", description: "Upcoming AI events, conferences, workshops, and online sessions — curated for learners, practitioners, and builders in the AI space." },
      { icon: "MessageSquare", title: "Ask GIGI", description: "An AI-powered assistant providing instant answers to tool questions, learning recommendations, and platform navigation — available throughout the product." },
    ],
    designPrinciples: [
      { title: "Curation over comprehensiveness", description: "220+ tools is not the full AI landscape — it is a curated selection of verified, quality tools. The editorial decision to exclude is as important as the decision to include." },
      { title: "Dark and immersive", description: "The deep navy-to-purple visual language positions GIGAMATIC AI as native to the AI era — confident, sophisticated, and designed for people who take AI seriously." },
      { title: "Personal and accumulative", description: "My Stack makes the platform's value compound over time. A tool directory is a reference; a personal stack is a relationship — something users build, return to, and share." },
      { title: "Learning integrated with discovery", description: "Tools and courses are connected, not siloed. Discovering a tool should surface relevant learning; completing a course should reveal new tools to explore." },
    ],
    aiRole: [
      { title: "Ask GIGI (live)", description: "An embedded AI assistant providing real-time tool recommendations, course guidance, and platform navigation across the directory — reducing the time from 'I need to do X' to 'here is the tool for that.'" },
      { title: "Tool comparison intelligence (proposed)", description: "A planned capability to generate structured comparisons between similar tools — surfacing the meaningful differences that matter for specific use cases." },
      { title: "Personalised learning paths (future vision)", description: "The product roadmap includes AI-curated learning paths — building structured sequences of courses, tools, and practice based on a user's stated goals and existing knowledge." },
    ],
    coverImage: "/work/gigamatic-ai-cover.svg",
    gallery: [
      { type: "browser", label: "Homepage", description: "The discovery hub: social proof from Stanford, MIT, and Google; platform stats; and dual entry points into tools and learning", screens: ["hero", "stats", "social-proof"], imagePath: "/work/gigamatic-ai-hub.svg" },
      { type: "browser", label: "AI tools directory", description: "220+ tools organised by category — filterable by use case, pricing model, and feature — with verified tool cards", screens: ["tools-grid", "category-filter"], imagePath: "/work/gigamatic-ai-consent.svg" },
      { type: "detail", label: "My Stack", description: "The personal AI toolkit builder — saved tools organised by category, with quick access and stack sharing", screens: ["stack-view", "add-tool"], imagePath: "/work/gigamatic-ai-explainability.svg" },
      { type: "browser", label: "Ask GIGI", description: "The platform's AI assistant — answering tool questions, recommending courses, and navigating the directory through conversation", screens: ["chat-interface"], imagePath: "/work/gigamatic-ai-chat.svg" },
    ],
    outcomes: [
      "Built and launched a live AI discovery platform featuring 220+ verified tools across 13 categories",
      "Curated 45+ expert AI courses from Stanford, MIT, Google, and Hugging Face — free and structured in one place",
      "Shipped My Stack, a personal AI tool builder that creates accumulating platform value beyond one-time discovery",
      "Shipped Ask GIGI, an AI assistant providing instant tool recommendations and learning guidance across the platform",
      "Positioned GIGAMATIC AI as the definitive starting point for professionals and learners navigating the AI tools landscape",
    ],
    reflection:
      "The defining product decision in GIGAMATIC AI was the commitment to curation over comprehensiveness. In a space where the default instinct is to list everything and let search sort it out, we chose to take a position: 220+ tools that we have verified, evaluated, and decided are worth a user's attention. That editorial decision shaped the design — a directory that feels like a selection rather than a dump, where the quality signal is the product. My Stack emerged from a related insight: discovery is a moment, but a stack is a practice. If you want people to return, give them something worth building.",
  },
  {
    slug: "institute-ai-consciousness",
    name: "The Institute for AI and the Future of Consciousness",
    category: "Research & Nonprofit",
    filterCategory: "Research and Nonprofit",
    tagline: "A research and public-interest initiative exploring how artificial intelligence may shape consciousness, human agency, flourishing, society, and the future of intelligent life.",
    summary:
      "A digital platform concept for an interdisciplinary research institute exploring AI, consciousness, and human flourishing — combining serious intellectual publishing with accessible public dialogue.",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "Brand Direction",
      "Front-End Development",
    ],
    platform: "Web",
    status: "Product concept — in design exploration",
    accentColor: "hsl(240 60% 65%)",
    accentColorLight: "hsla(240,60%,65%,0.10)",
    opportunity:
      "The intersection of artificial intelligence, consciousness, and human flourishing is one of the most consequential intellectual territories of this era — yet public discourse in this space is often polarized between utopian optimism and existential anxiety, with little in between. Academic institutions engage with these questions rigorously but often inaccessibly. Technology platforms engage with them commercially. There is a genuine need for an intellectual space that takes these questions seriously, brings together researchers, philosophers, technologists, and ethicists, and makes the resulting inquiry available to a broader public without simplifying it.",
    vision:
      "The Institute for AI and the Future of Consciousness is designed as a platform for serious, accessible inquiry — a digital home for research, essays, public events, and collaborative dialogue at the intersection of AI, mind, society, and human flourishing. The product vision centers on intellectual credibility and genuine accessibility: neither an academic repository nor a popular science blog, but something in between that treats its audience as capable of engaging with difficult, important ideas.",
    users: [
      { title: "Researchers and academics", description: "Scholars in philosophy of mind, AI ethics, cognitive science, and related disciplines seeking a platform for publication and collaboration." },
      { title: "Thoughtful technologists", description: "Engineers, designers, and product leaders who want to engage with the deeper implications of the systems they build." },
      { title: "Policy and ethics professionals", description: "People working in AI governance, ethics, and public policy who need access to current intellectual frameworks and debate." },
      { title: "Informed general readers", description: "People with no specialist background who are genuinely curious about the questions AI raises for mind, society, and the future." },
    ],
    capabilities: [
      { icon: "BookOpen", title: "Research and essay publishing", description: "A structured publishing platform for long-form research articles, opinion essays, and accessible explainers across the institute's areas of inquiry." },
      { icon: "Library", title: "Research library", description: "An organized repository of institute publications and curated external work, navigable by theme, author, and topic." },
      { icon: "Users", title: "Contributor profiles", description: "Rich profiles for researchers, writers, and contributors — connecting people to the full body of their work within the platform." },
      { icon: "Calendar", title: "Events and initiatives", description: "Public-facing information about lectures, symposia, workshops, and collaborative initiatives — online and in person." },
      { icon: "Mail", title: "Newsletter and community", description: "Subscription-based communication connecting the institute's community with new publications, events, and opportunities for engagement." },
      { icon: "Globe", title: "Partnership and collaboration", description: "Information about research partnerships, academic affiliations, and opportunities for institutional collaboration." },
    ],
    designPrinciples: [
      { title: "Academic credibility without institutional coldness", description: "The visual language is rigorous and precise, but warm and human — designed to feel like a place of genuine inquiry, not bureaucratic archive." },
      { title: "Typography as architecture", description: "Long-form reading is the primary content mode. Type hierarchy, measure, and leading are treated as fundamental design decisions, not aesthetic choices." },
      { title: "No robot imagery", description: "Visualizations of AI in this context are conceptual and abstract — philosophical diagrams, structural patterns, and human-centered imagery. No stock photographs of holograms, no sci-fi aesthetic." },
      { title: "Philosophical depth in visual language", description: "The visual system draws on the aesthetics of scientific publishing, philosophical tradition, and contemporary intellectual culture — confident, restrained, and serious." },
    ],
    aiRole: [
      { title: "Content discovery (proposed)", description: "A proposed capability to help readers navigate the research library by theme, relevance, and reading level — surfacing connections across publications and topics." },
      { title: "Research synthesis (design exploration)", description: "Design exploration has considered tools that help researchers identify thematic connections across the institute's growing body of work." },
      { title: "Public engagement tools (future vision)", description: "The long-term vision includes AI-assisted tools for public engagement — helping general readers access difficult ideas through guided reading, contextual explanation, and structured dialogue." },
    ],
    coverImage: "/work/institute-cover.svg",
    gallery: [
      { type: "fullwidth", label: "Institute homepage", description: "Editorial homepage with featured research and clear intellectual positioning", screens: ["homepage-hero", "featured-research"], imagePath: "/work/institute-homepage.svg" },
      { type: "browser", label: "Article reading experience", description: "Long-form article layout with structured typography and related content", screens: ["article-body", "related-articles"], imagePath: "/work/institute-article.svg" },
      { type: "detail", label: "Research library", description: "Navigable collection of publications organized by theme and discipline", screens: ["library-grid", "filter-system"], imagePath: "/work/institute-library.svg" },
      { type: "browser", label: "Contributor profile", description: "Rich academic profile connecting researcher to their body of work", screens: ["contributor-page"], imagePath: "/work/institute-contributor.svg" },
    ],
    outcomes: [
      "Established a product vision and digital identity for a research initiative with no precedent in its specific combination of scope and perspective",
      "Designed a publishing platform that makes serious intellectual work accessible without sacrificing its rigor or depth",
      "Created a visual language that communicates intellectual seriousness through typography, space, and restraint rather than complexity",
      "Developed an information architecture that serves both specialist researchers and interested general readers within a single coherent experience",
      "Positioned the institute for credible digital presence as a genuinely new kind of intellectual institution",
    ],
    reflection:
      "The defining challenge in designing this platform was creating a visual and editorial language for a subject — AI, consciousness, and human flourishing — that has almost no visual vocabulary that isn't either cold and technical or anxious and dystopian. The design process became an act of invention: finding visual forms that communicate the seriousness of these questions while keeping human experience, not machine intelligence, at the center of the visual frame.",
  },
  {
    slug: "hudson-navigation",
    name: "Hudson Navigation",
    category: "Travel Technology",
    filterCategory: "Travel",
    tagline: "An agentic iOS travel companion designed to help people explore, plan, navigate, and adapt throughout a journey.",
    summary:
      "A product concept for an intelligent iOS travel application that combines conversational planning, location awareness, and agentic AI assistance to move beyond static itineraries toward genuinely adaptive travel support.",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "AI Product Design",
      "Prototyping",
    ],
    platform: "iOS",
    status: "Product concept — prototype stage",
    accentColor: "hsl(195 85% 50%)",
    accentColorLight: "hsla(195,85%,50%,0.12)",
    opportunity:
      "Travel planning has been digitized without being meaningfully improved. The tools available to travelers — search engines, booking platforms, static itinerary apps — require the same effortful, fragmented research process that existed before them, now spread across more screens. Itineraries become obsolete the moment circumstances change. Recommendations are algorithmically optimized for engagement, not genuine personal relevance. There is a significant gap between what an experienced, attentive travel companion could provide and what current applications offer — a gap that agentic AI is uniquely positioned to close.",
    vision:
      "Hudson Navigation is designed as a genuinely intelligent travel companion for iOS — an application that understands context, learns preferences, and helps travelers navigate not just geographically but situationally. The product vision moves beyond search and booking to create an experience that adapts in real time to changing circumstances, surfaces relevant opportunities before the traveler thinks to ask, and handles logistical complexity with appropriate human oversight. Advanced capabilities are presented as a strategic product vision, with clear checkpoints for human confirmation before consequential actions.",
    users: [
      { title: "Independent travelers", description: "Solo travelers and couples who plan and navigate their own journeys without tour operators or package holidays." },
      { title: "Business travelers", description: "Frequent business travelers managing complex itineraries, connections, and unexpected disruptions across multiple trips." },
      { title: "Exploratory travelers", description: "People who travel with loose frameworks rather than fixed plans — wanting discovery and spontaneity alongside safety and reliability." },
      { title: "Travelers in disruption", description: "Anyone facing a flight cancellation, weather event, or unexpected circumstance who needs rapid, contextually intelligent replanning." },
    ],
    capabilities: [
      { icon: "MessageSquare", title: "Conversational trip planning", description: "Natural language trip planning that accepts vague inputs — 'three days in Japan, interested in food and contemporary architecture' — and iterates toward a personalized plan." },
      { icon: "Map", title: "Intelligent itinerary creation", description: "Itineraries generated from stated preferences, travel history, real-time availability, and practical logistics — not generic tourist lists." },
      { icon: "RefreshCw", title: "Real-time itinerary adaptation", description: "Proposed capability to detect disruptions, changed circumstances, or new preferences and suggest or apply itinerary adjustments with user confirmation." },
      { icon: "Navigation", title: "Location-aware recommendations", description: "Contextual suggestions that respond to current location, time of day, weather, and recent activity — surfaced without interrupting the experience of being somewhere." },
      { icon: "Bell", title: "Proactive travel alerts", description: "Timely, relevant notifications — not a stream of push notifications, but well-timed information that matters: a gate change, a booking confirmation, a reservation reminder." },
      { icon: "UserCheck", title: "Human approval before bookings", description: "Agentic capabilities that can research and prepare actions — hotel alternatives, rebooking options, activity reservations — but require explicit human confirmation before executing." },
    ],
    designPrinciples: [
      { title: "Calm and glanceable", description: "Travel involves cognitive load. The interface is designed to surface what matters at the moment it matters — not to demand attention, but to provide it when sought." },
      { title: "Trust in agentic actions", description: "Every action the AI takes on a user's behalf is clearly communicated, reversible, and confirmed before execution. The agent is helpful, not autonomous." },
      { title: "Native iOS interaction patterns", description: "The experience follows iOS Human Interface Guidelines — using familiar patterns for navigation, notifications, and interaction rather than reinventing them unnecessarily." },
      { title: "Privacy and location sensitivity", description: "Location data is used to provide relevant context — and only that. Users control what is retained, what is shared, and when location access is used." },
    ],
    aiRole: [
      { title: "Conversational planning (prototype)", description: "Prototype work has explored natural language trip planning — accepting conversational inputs and iterating toward a structured itinerary through dialogue rather than form-filling." },
      { title: "Contextual recommendation engine (design exploration)", description: "Design exploration has considered a recommendation layer that combines location, time, preferences, and real-time data to surface suggestions that feel genuinely relevant rather than algorithmically generic." },
      { title: "Agentic disruption management (future vision)", description: "The long-term product vision includes an agentic capability that can detect travel disruptions, research alternatives, and prepare a replanning recommendation — requiring explicit human approval before any rebooking or consequential action is taken." },
    ],
    coverImage: "/work/hudson-cover.svg",
    gallery: [
      { type: "phone", label: "Conversational planning", description: "Natural language trip planning with iterative refinement", screens: ["planning-chat", "itinerary-preview"], imagePath: "/work/hudson-planning.svg" },
      { type: "phone", label: "Live itinerary view", description: "Day-by-day view adapting to current time, location, and preferences", screens: ["itinerary-today", "next-up-card"], imagePath: "/work/hudson-itinerary.svg" },
      { type: "detail", label: "Location-aware suggestions", description: "Contextual recommendations surfaced near current location", screens: ["nearby-suggestions", "detail-card"], imagePath: "/work/hudson-nearby.svg" },
      { type: "phone", label: "Disruption handling", description: "Agent-assisted replanning with human confirmation checkpoint", screens: ["alert-screen", "replan-options", "confirm-action"], imagePath: "/work/hudson-disruption.svg" },
    ],
    outcomes: [
      "Established a product vision for an iOS travel application that treats contextual intelligence as the core value proposition rather than an added feature",
      "Designed a conversational planning experience that makes complex, personalized trip planning accessible through natural language",
      "Created an agentic action framework that balances genuine helpfulness with appropriate human oversight and confirmation",
      "Explored the design of proactive, calm AI assistance that enhances the travel experience without becoming an intrusive source of notifications",
      "Demonstrated the potential of agentic AI in a consumer travel context while maintaining clear boundaries around consequential autonomous actions",
    ],
    reflection:
      "The most important design insight from Hudson Navigation was the distinction between an application that does things for you and one that does things with you. Agentic AI in travel is genuinely powerful — the ability to detect disruption, research alternatives, and surface a ready-made plan at the moment it's needed is a real step change from current tools. But the design of that power matters enormously. The product decisions that made this concept compelling were not about what the AI could do autonomously — they were about designing the moments of handoff, confirmation, and control that make autonomous action trustworthy.",
  },
];

export const projectCategories = [
  "All",
  "Artificial Intelligence",
  "Fintech",
  "Insurtech",
  "Travel",
  "Future of Work",
  "Research and Nonprofit",
];
