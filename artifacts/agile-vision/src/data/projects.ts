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

export interface AiBenefit {
  title: string;
  description: string;
}

export interface AiDeepDive {
  headline: string;
  status: "live" | "proposed" | "vision";
  statusLabel: string;
  useCase: { label: string; body: string };
  implementation: { label: string; body: string };
  benefits: AiBenefit[];
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
  aiDeepDive: AiDeepDive;
  aiLayers?: { number: string; icon: string; name: string; role: string; input: string; process: string; output: string }[];
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
    aiDeepDive: {
      headline: "Right guidance, right moment — AI as the editorial lens for personal finance",
      status: "proposed",
      statusLabel: "In Design — Roadmap Feature",
      useCase: {
        label: "The Use-Case",
        body: "Most financial comparison platforms display the same data to every visitor. A reader investigating first-time mortgage options has fundamentally different needs from one tracking savings rates for retirement planning — yet both see the same homepage. Without personalisation, the platform serves everyone adequately and nobody precisely. The AI opportunity is to learn what each reader actually needs — their financial life stage, their product interests, their rate sensitivity — and surface the most relevant comparisons, guides, and alerts without them having to know what to ask for.",
      },
      implementation: {
        label: "The Implementation",
        body: "A planned content personalisation layer tracks demonstrated interest signals — product categories browsed, guides read, market news followed — to build a reader profile used to surface relevant comparisons without configuration. A rate monitoring engine watches all 60+ products and triggers subscriber alerts when a product a reader has engaged with reaches a competitive threshold. A conversational product finder (in active design exploration) replaces the form-based product selector with a dialogue that can handle 'I'm not sure what I'm looking for' as a valid starting point, guiding users from situation to product without assuming prior financial literacy.",
      },
      benefits: [
        {
          title: "Guidance that finds you",
          description: "Relevant comparisons and guides surface before you search for them — matched to your life stage and demonstrated interests, not to a generic reader profile.",
        },
        {
          title: "Proactive rate intelligence",
          description: "Get alerted when products you've viewed move into competitive territory — before a rate window closes or a fixed term auto-renews at a worse rate.",
        },
        {
          title: "Discovery without jargon",
          description: "A conversational product finder that starts from your situation — 'I'm saving for a house deposit' — rather than requiring you to know the category name before you can compare.",
        },
      ],
    },
    coverImage: "/work/gigamatic-finance-cover.png",
    gallery: [
      { type: "browser", label: "Homepage", description: "The editorial homepage: independent positioning, product categories, and the financial guide library at a glance", screens: ["hero", "categories", "guides"], imagePath: "/work/gigamatic-finance-cover.png" },
      { type: "browser", label: "Product comparison", description: "Savings account comparison table with live rates, minimum deposits, and product features — updated daily, no paid placement", screens: ["comparison-table", "rate-details"], imagePath: "/work/gigamatic-finance-comparisons.png" },
      { type: "detail", label: "Financial guides", description: "Long-form guide layout — structured for deep reading with in-article comparison data and related products", screens: ["guide-body", "inline-comparison"], imagePath: "/work/gigamatic-finance-guides.png" },
      { type: "browser", label: "Market news", description: "Financial news feed with rate movements, economic context, and curated market commentary", screens: ["news-feed", "article-preview"], imagePath: "/work/gigamatic-finance-news.png" },
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
    aiDeepDive: {
      headline: "Ask GIGI — eliminating the drop-off that happens when insurance gets confusing",
      status: "live",
      statusLabel: "Live in Production",
      useCase: {
        label: "The Use-Case",
        body: "Insurance comparison is abandoned most often at points of confusion — unfamiliar coverage terminology, uncertainty about what level of coverage is appropriate, or not understanding how to evaluate carrier financial ratings. This confusion is costly: users leave without finding better coverage and the $720/year average saving goes unrealised. The traditional industry answer is a call-centre handoff — slow, expensive, and the exact experience most users are trying to avoid. Ask GIGI was designed to solve this in the browser, at the moment of confusion, without a queue.",
      },
      implementation: {
        label: "The Implementation",
        body: "Ask GIGI is a live, embedded LLM-powered chatbot integrated throughout the comparison flow — not siloed in a chat tab, but surfaced at the natural friction points: next to coverage level selectors, on the results page when quotes vary significantly, and within the Learning Hub alongside product guides. It answers coverage questions in plain language ('what is an excess?', 'do I need umbrella coverage?'), explains the meaningful differences between carrier quotes, guides users between insurance categories, and provides confidence at the moment of decision — without ever recommending a specific product for commercial reasons.",
      },
      benefits: [
        {
          title: "Instant coverage clarity",
          description: "Plain-language answers to policy questions at the exact moment confusion strikes — no waiting, no hold music, no being transferred between departments.",
        },
        {
          title: "Confidence in the comparison",
          description: "Users understand what they're comparing — not just what costs less — leading to decisions grounded in genuine fit rather than headline price alone.",
        },
        {
          title: "No drop-off moments",
          description: "Points of confusion become answered questions rather than reasons to abandon. Users who would have left the comparison flow get to a quote instead.",
        },
      ],
    },
    coverImage: "/work/gigamatic-insure-cover.png",
    gallery: [
      { type: "browser", label: "Homepage", description: "The quote widget takes centre stage: insurance type selector, instant comparison CTA, and social proof at a glance", screens: ["hero", "quote-widget", "stats"], imagePath: "/work/gigamatic-insure-cover.png" },
      { type: "browser", label: "Get a Quote", description: "AI-powered smart quote flow — paste a VIN, address, or URL and the system handles the rest across Auto, Home, Life, Business, and Health", screens: ["quote-flow", "category-tabs"], imagePath: "/work/gigamatic-insure-quote.png" },
      { type: "detail", label: "Quote results", description: "Side-by-side insurer comparison with monthly premium, coverage level, carrier rating, and direct quote links", screens: ["results-table"] },
      { type: "browser", label: "My Policies", description: "Post-purchase policy dashboard showing active coverage, renewal dates, and account management", screens: ["policies-list", "policy-detail"] },
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
    accentColor: "hsl(220 15% 55%)",
    accentColorLight: "hsla(220,15%,55%,0.08)",
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
    aiDeepDive: {
      headline: "Ask GIGI — a career intelligence assistant that responds to your specific situation, not a generic one",
      status: "live",
      statusLabel: "Live in Production",
      useCase: {
        label: "The Use-Case",
        body: "Career advice content is most consumed at the moment of a specific, personal decision — whether to accept a promotion, how to navigate a difficult manager, whether a sector pivot is realistic. Static editorial content can address these questions thematically; it cannot respond to the specifics of a reader's situation. The gap between 'I have a career question' and 'this article is relevant to my exact circumstances' is where most career platforms lose their audience. Ask GIGI was built to close that gap: an AI assistant that interprets the reader's situation and responds to it directly, then surfaces the most relevant editorial content to go deeper.",
      },
      implementation: {
        label: "The Implementation",
        body: "Ask GIGI is a live embedded AI career assistant that maps a reader's natural-language question or situation description to the platform's editorial framework and content library. It interprets open-ended questions — 'I've been offered a VP role at a Series B startup and a Director role at a Fortune 500, what should I be thinking about?' — provides an immediate, contextualised response, and surfaces specific articles and resources from the platform that are directly relevant. It functions simultaneously as an answer engine and a personalised content navigation layer, available at any point in the reading experience.",
      },
      benefits: [
        {
          title: "Your question, answered",
          description: "Immediate, specific responses to career questions rooted in your actual situation — not a search results page of tangentially related articles.",
        },
        {
          title: "Personalised content discovery",
          description: "The right articles and resources surface for your specific situation, not the most popular ones. Editorial depth becomes findable when you need it.",
        },
        {
          title: "A thinking partner, available always",
          description: "Career anxiety doesn't keep office hours. Ask GIGI is available at 11pm before a difficult conversation, on a Sunday before a Monday decision.",
        },
      ],
    },
    coverImage: "/work/gigamatic-careers-cover.png",
    gallery: [
      { type: "fullwidth", label: "Editorial homepage", description: "The editorial-first homepage: headline positioning, featured articles with editorial photography, and clear content category navigation", screens: ["homepage-hero", "featured-articles"], imagePath: "/work/gigamatic-careers-cover.png" },
      { type: "browser", label: "Trending news", description: "Curated career and workplace news from WSJ, Bloomberg, TechCrunch, HBR, Forbes, and 10+ elite publications — fresh content daily", screens: ["news-feed", "category-tabs"], imagePath: "/work/gigamatic-careers-news.png" },
      { type: "detail", label: "Job listings", description: "Real-time job board aggregated from across the web — search by title, skills, location, type, and salary level", screens: ["listings-grid", "filter-panel"], imagePath: "/work/gigamatic-careers-jobs.png" },
      { type: "browser", label: "Interactive tools", description: "Free, data-driven career tools — Salary Negotiation Calculator, Career Transition Readiness Quiz, Career Templates Library, and Role Comparison Tool", screens: ["tools-list"], imagePath: "/work/gigamatic-careers-tools.png" },
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
    aiDeepDive: {
      headline: "A platform about AI, built with AI — Ask GIGI as the meta-layer navigating 220+ tools and 45+ courses",
      status: "live",
      statusLabel: "Live in Production",
      useCase: {
        label: "The Use-Case",
        body: "With 220+ tools across 13 categories and 45+ courses from Stanford, MIT, and Google, GIGAMATIC AI faces its own discovery problem: how does a user find the right tool for their specific use case, or the right course for their current knowledge level, without spending an hour browsing? The platform needed an intelligent navigation layer that could interpret what a user is trying to accomplish — not what category they think they're in — and surface a specific, reasoned recommendation. This is the exact problem AI is positioned to solve, and the design decision to use it here is intentional and self-referential.",
      },
      implementation: {
        label: "The Implementation",
        body: "Ask GIGI functions as the conversational front-end to the entire directory and course library. It understands tool categories, capability differences, pricing models, and use-case fit — allowing users to describe what they're trying to do ('I need to generate product images for an e-commerce store without a design background') and receive a specific recommendation with rationale. My Stack builds a persistent personalisation layer: as users save tools and build their stack over time, the platform's understanding of their workflow deepens, enabling increasingly relevant recommendations across tools and courses.",
      },
      benefits: [
        {
          title: "From intent to tool in seconds",
          description: "Describe what you need to accomplish — not what category you're browsing — and get a specific, reasoned tool recommendation immediately.",
        },
        {
          title: "Stack-aware suggestions",
          description: "Recommendations account for what you already use. No duplicate functionality, no tools that conflict with your existing workflow.",
        },
        {
          title: "Learning paths, not just courses",
          description: "AI-curated sequences build on your current knowledge level and stated goals — not a flat list of 45 courses with no context for where to start.",
        },
      ],
    },
    coverImage: "/work/gigamatic-ai-cover.png",
    gallery: [
      { type: "browser", label: "Homepage", description: "The discovery hub: social proof from Stanford, MIT, and Google; platform stats; and dual entry points into tools and learning", screens: ["hero", "stats", "social-proof"], imagePath: "/work/gigamatic-ai-cover.png" },
      { type: "browser", label: "AI tools directory", description: "220+ verified AI tools across 13 categories — Writing, Image, Video, Code, Audio, Productivity and more — with filterable tool cards", screens: ["tools-grid", "category-filter"], imagePath: "/work/gigamatic-ai-tools.png" },
      { type: "detail", label: "Expert course library", description: "45+ courses curated from Stanford, MIT, Google, DeepLearning.AI, Hugging Face, and Fast.ai — free, structured, and filterable by level and topic", screens: ["learn-grid", "filters"], imagePath: "/work/gigamatic-ai-learn.png" },
      { type: "browser", label: "Platform overview", description: "The full product ecosystem — tools directory, learning hub, My Stack builder, AI news feed, events, and Ask GIGI — in one destination", screens: ["overview"], imagePath: "/work/gigamatic-ai-homepage.png" },
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
    tagline: "An independent research institute studying how artificial intelligence is reshaping cognition, identity, agency, and society — translating rigorous inquiry into public understanding and policy.",
    summary:
      "A live digital platform for an interdisciplinary research institute asking the most consequential questions raised by artificial intelligence — designed to serve researchers, policymakers, technologists, and informed general readers without deference to any interested party.",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "Brand Direction",
      "Front-End Development",
    ],
    platform: "Web",
    status: "Live — futureofconsciousness.global",
    accentColor: "hsl(43 55% 55%)",
    accentColorLight: "hsla(43,55%,55%,0.10)",
    opportunity:
      "The most consequential questions raised by artificial intelligence are not technical — they are human. How will intelligent systems change what it means to pay attention, to believe, to know, to feel, to create, to work, to be? Academic institutions engage with these questions rigorously but often inaccessibly. Technology platforms engage with them commercially. Public discourse oscillates between uncritical optimism and existential anxiety, with little rigorous inquiry in between. There was a genuine need for an independent intellectual institution that could ask these questions with the seriousness they deserve, translate the resulting research into public understanding, and do so without deference to any funder, platform, or commercial interest.",
    vision:
      "The Institute for AI and the Future of Consciousness is built as a platform for serious, accessible inquiry — a digital home for research, essays, op-eds, and public dialogue at the intersection of AI, mind, society, and human flourishing. The design vision is to occupy an intellectual position no existing institution holds: neither an academic archive nor a popular science publication, but something that treats its audience as intellectually capable, brings the full weight of interdisciplinary research to bear on urgent questions, and communicates it through a visual and editorial language worthy of the subject.",
    users: [
      { title: "Researchers and academics", description: "Scholars in philosophy of mind, AI ethics, cognitive science, and related disciplines seeking a platform for rigorous, publicly accessible publication and intellectual exchange." },
      { title: "Policy and ethics professionals", description: "People working in AI governance, legislation, and public policy who need independent frameworks, evidence, and analysis not shaped by commercial or institutional interests." },
      { title: "Thoughtful technologists", description: "Engineers, designers, and product leaders who want to engage seriously with the implications — for mind, agency, and society — of the systems they build." },
      { title: "Informed general readers", description: "People with no specialist background who are genuinely curious about the questions AI raises for human experience, identity, and the future — and who want to engage with those questions at depth." },
    ],
    capabilities: [
      { icon: "BookOpen", title: "Thinking — essays and analysis", description: "Long-form essays and analyses on AI and the human condition, organised by research domain: Attention & Cognition, Agency & Autonomy, Human Flourishing, Philosophy of Mind, Work & Society, Memory & Identity." },
      { icon: "FileText", title: "Op-Eds — briefing papers and perspectives", description: "12 publications across 4 research domains — briefing papers, perspectives, and letters from the Executive Director — totalling 411 pages of independent research and analysis." },
      { icon: "Mail", title: "Dispatch — newsletter", description: "A curated newsletter connecting the institute's community with new publications, events, and opportunities for engagement across its areas of inquiry." },
      { icon: "Users", title: "Engage — partnership and support", description: "Clear pathways for researchers, institutions, and supporters to become partners, get involved, or donate — funding the institute's independence from commercial interest." },
      { icon: "Globe", title: "Audiences — tailored entry points", description: "Distinct entry points designed for different audiences — researchers, policymakers, technologists, and general readers — ensuring the institute's work reaches and resonates with each." },
      { icon: "Mic", title: "Mission audio", description: "An audio statement of the institute's mission, providing an immediate and human introduction to its founding purpose and intellectual position." },
    ],
    designPrinciples: [
      { title: "Dark authority", description: "The deep navy and gold visual language communicates intellectual seriousness and independence — deliberately distinct from both the clinical white of academic publishing and the bright optimism of technology platforms." },
      { title: "Typography as intellectual signal", description: "Large display serif headings communicate the weight of the subject matter. The type hierarchy is designed to draw readers into depth, not encourage scanning." },
      { title: "Imagery that centers the human", description: "The neural network visualization of a human head is the visual anchor — intelligence as a human phenomenon, not a machine capability. The design avoids robot imagery and sci-fi aesthetics entirely." },
      { title: "Editorial restraint", description: "Content is allowed to occupy space. Category filters, pull quotes, and clear section labels help readers navigate a serious body of work without reducing it to headlines or optimised for dwell time." },
    ],
    aiRole: [
      { title: "Subject, not tool", description: "Artificial intelligence is the subject of the institute's inquiry, not an operational tool within the platform — a deliberate choice that keeps the human relationship to AI at the centre of the product." },
      { title: "Content discovery (proposed)", description: "Future work may explore AI-assisted navigation of the research library — surfacing connections across essays, op-eds, and briefing papers by theme and relevance for readers navigating a growing body of work." },
    ],
    aiDeepDive: {
      headline: "AI as subject, not instrument — a deliberate inversion that protects the platform's intellectual integrity",
      status: "vision",
      statusLabel: "Principled Design Decision",
      useCase: {
        label: "The Use-Case",
        body: "A research institute studying the effects of artificial intelligence on human cognition, identity, and agency faces a fundamental design question: should the platform itself deploy AI as an operational tool? The question is not technical — it is about intellectual coherence. An institution asking hard questions about AI's relationship to human consciousness cannot use AI as an unreflective operational layer without undermining the credibility of those questions. The 'use-case' here is not a feature to build, but a principle to hold: the design of this platform is itself a statement about the relationship between human judgment and algorithmic systems.",
      },
      implementation: {
        label: "The Implementation",
        body: "The platform's navigation, curation, and content discovery are designed without AI assistance — research domain filters, publication type navigation, and audience-specific entry points are human-curated and maintained by the institute's editorial team. This is an active architectural choice, not a technical omission. Any future AI-assisted navigation of the research library will be scoped with strict constraints: transparent in its operation, bounded in its scope, clearly distinguished from editorial curation, and subject to the same critical scrutiny the institute applies to AI in every other context.",
      },
      benefits: [
        {
          title: "Intellectual coherence",
          description: "Readers engaging with research on AI's effects on human cognition can be confident that the platform's curation reflects human editorial judgment — not the algorithmic optimisation the institute is studying.",
        },
        {
          title: "Trustworthy research discovery",
          description: "No engagement-optimised ranking distorts access to what matters most. Research surfaces because it is relevant, not because it performs well in a recommendation model.",
        },
        {
          title: "A model for responsible restraint",
          description: "The institute's deliberate non-use of AI in this context is itself a demonstration of the careful human agency it advocates for in its research — practice matching principle.",
        },
      ],
    },
    coverImage: "/work/institute-cover.png",
    gallery: [
      { type: "fullwidth", label: "Homepage", description: "Deep navy hero with gold-highlighted typewriter headline, neural head wireframe, and dual CTAs — establishing the institute's intellectual authority and independence from the first moment", screens: ["hero"], imagePath: "/work/institute-cover.png" },
      { type: "browser", label: "Thinking — essays", description: "Research domain filter tags (Attention & Cognition, Agency & Autonomy, Human Flourishing, Philosophy of Mind, Work & Society, Memory & Identity) and editorial essay cards with rich imagery and gold category badges", screens: ["thinking-listing"], imagePath: "/work/institute-thinking.png" },
      { type: "browser", label: "Op-Eds", description: "12 publications across 4 research domains — stats bar, publication type filters (Briefing Papers 5, Perspectives 6, Letters from the Executive Director 2), and timestamped article cards", screens: ["op-eds"], imagePath: "/work/institute-opeds.png" },
      { type: "browser", label: "About — Why We Exist", description: "The institute's founding position stated directly: the most consequential questions raised by artificial intelligence are not technical — they are human", screens: ["about"], imagePath: "/work/institute-about.png" },
    ],
    outcomes: [
      "Designed and built a live platform for a genuinely new kind of intellectual institution — independent, interdisciplinary, and publicly committed to asking the hardest questions about AI",
      "Published 12 research outputs across 4 domains — Attention & Cognition, Agency & Autonomy, Human Flourishing, and Philosophy of Mind — totalling 411 pages",
      "Established a visual and editorial language (deep navy, gold, display serif) that communicates intellectual authority without academic inaccessibility",
      "Built a structured publishing architecture with filterable research domains, publication types, and audience-specific entry points serving researchers, policymakers, technologists, and general readers",
      "Positioned the Institute as a credible, independent voice in public discourse on AI — distinct from academic institutions and commercial technology platforms",
    ],
    reflection:
      "The design challenge for this platform was finding a visual language that could hold the weight of what it is about. The intersection of artificial intelligence, consciousness, and human flourishing has almost no visual vocabulary that isn't either cold and technical or anxious and dystopian. The deep navy and gold system emerged from an attempt to signal a different kind of seriousness — intellectual, philosophical, human-centred — without resorting to either register. The neural wireframe of a human head became the visual anchor precisely because it keeps the subject where it belongs: not the machine, but the mind the machine is changing.",
  },
  {
    slug: "hudson-navigation",
    name: "Hudson Navigation",
    category: "Travel Technology",
    filterCategory: "Travel",
    tagline: "An iOS travel companion that thinks ahead — planning your trip in conversation, adapting when circumstances change, and handling disruption before you have to ask.",
    summary:
      "Hudson Navigation is a working prototype and strategic product vision for an agentic iOS travel application. Built on the premise that travel apps have been digitized without being meaningfully improved, Hudson treats contextual intelligence as the core product rather than a layered feature — combining conversational trip planning, location-aware recommendations, and human-confirmed agentic replanning into a single, calm experience that behaves less like a search engine and more like a well-briefed travel companion.",
    website: "hudson-app-6bs.pages.dev",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "AI Product Design",
      "Interaction Design",
      "Prototyping",
      "Design Systems",
    ],
    platform: "iOS",
    status: "Live prototype — product vision",
    accentColor: "hsl(195 85% 50%)",
    accentColorLight: "hsla(195,85%,50%,0.12)",
    opportunity:
      "Travel planning has been digitized without being meaningfully improved. Google Flights is powerful, but it does not know you are connecting through Frankfurt or that you prefer a window seat on long hauls. TripAdvisor has tens of millions of reviews, but it cannot tell you which of them apply to a Tuesday morning in November with a child in tow. Itinerary apps look organized until the moment your first flight slips thirty minutes and everything downstream shifts. The apps that exist are fundamentally search and booking interfaces wearing the costume of travel companions — they retrieve information on demand but do not model what you need before you ask, adapt when circumstances change, or act on your behalf when the situation calls for it. The gap between what a well-briefed, attentive human travel companion provides and what current applications offer is enormous — and it is precisely the gap that agentic AI is positioned to close.",
    vision:
      "Hudson is built around a single product thesis: the value of an intelligent travel companion is not in the database it can query but in the judgment it can exercise. That means accepting natural language as the starting point for planning — not forms, not category menus, not destination inputs — so that 'four days in Kyoto, interested in food and local architecture, want to avoid the big tourist routes' becomes a valid and productive input. It means building a recommendation layer that responds to where you are, what time it is, what the weather is doing, and what you have already done — surfacing contextually relevant options before you think to search for them. And it means designing an agentic capability that can detect a disruption, research alternatives, and present a complete replanning recommendation in minutes — not as an autonomous action, but as a prepared proposal waiting for your confirmation. Hudson does not aim to replace traveler judgment. It aims to do the cognitive work that gets in the way of using it.",
    users: [
      {
        title: "Independent travelers",
        description: "Solo travelers and couples who research and plan their own journeys — people who want genuine personalization and resent generic tourist lists, but do not want to spend hours cross-referencing guides, forums, and booking sites to get it.",
      },
      {
        title: "Business travelers",
        description: "Frequent flyers managing multi-leg itineraries across time zones, with low tolerance for friction and a high cost to disruption. For this group, the value is not discovery but reliability — knowing that when something changes, the response is already prepared.",
      },
      {
        title: "Exploratory travelers",
        description: "People who prefer loose frameworks over fixed plans — who want to know their options at each decision point without having committed to an hour-by-hour schedule. Hudson's context-aware suggestions are designed for exactly this mode: informed spontaneity rather than algorithmic prescription.",
      },
      {
        title: "Travelers navigating disruption",
        description: "Anyone mid-journey when circumstances change — a delay, a cancellation, a weather event, a personal change of plan. The highest-stress moments in travel are the ones current apps are worst at handling: they announce the problem and leave the solution to you.",
      },
      {
        title: "First-time visitors",
        description: "Travelers visiting an unfamiliar city or region who lack the local knowledge to distinguish a genuinely good recommendation from a sponsored placement — and who need the most from a system that has already filtered for relevance.",
      },
    ],
    capabilities: [
      {
        icon: "MessageSquare",
        title: "Conversational trip planning",
        description: "Start from what you actually want, not from a destination search box. Hudson accepts natural language inputs — vague, specific, or anywhere in between — and builds toward a structured, logistically coherent itinerary through dialogue. 'Three days in Lisbon, interested in food and contemporary architecture, not the Alfama tourist circuit' is a complete and valid starting point.",
      },
      {
        icon: "Map",
        title: "Preference-driven itinerary creation",
        description: "Itineraries generated from your stated preferences, demonstrated travel history, real-time availability, and practical logistics — not from a popularity ranking or a sponsored placement. The system understands that the best restaurant for you is not the most reviewed, and the best neighbourhood is not the most photographed.",
      },
      {
        icon: "RefreshCw",
        title: "Real-time itinerary adaptation",
        description: "When circumstances change — a delayed flight, a restaurant that closed, a preference shift mid-trip — Hudson detects the impact on the downstream itinerary and prepares an updated plan. Changes are surfaced as proposals, not executed automatically. The traveler remains in control; the app does the work of preparing the options.",
      },
      {
        icon: "Navigation",
        title: "Location-aware recommendations",
        description: "A recommendation engine that knows where you are, what time it is, what the weather is doing, and what you have already done — and surfaces contextually relevant suggestions without being asked. The goal is not to interrupt the experience of being somewhere, but to surface a useful option at the moment it becomes relevant.",
      },
      {
        icon: "Bell",
        title: "Calm, well-timed alerts",
        description: "Hudson is not a source of constant notifications. Alerts are issued when the information is actionable and time-sensitive: a gate change that requires you to move now, a reservation reminder timed to your walk from the previous activity, a weather change that affects a plan made yesterday. Nothing that can wait, waits until it becomes urgent.",
      },
      {
        icon: "UserCheck",
        title: "Human-confirmed agentic actions",
        description: "The system can research hotel alternatives, identify rebooking options, and prepare a replanning recommendation — but it cannot execute any booking or consequential action without explicit user confirmation. This is a deliberate design constraint, not a technical limitation. Agentic capability without oversight is not a travel companion; it is a liability.",
      },
    ],
    designPrinciples: [
      {
        title: "Calm intelligence over constant presence",
        description: "Travel is already cognitively demanding. Hudson is designed to reduce that load, not add to it. The interface surfaces what matters when it matters — and is otherwise quiet. The measure of a good notification is not frequency but precision: the right information at the moment it becomes useful.",
      },
      {
        title: "Proposals, not actions",
        description: "Every consequential thing the AI does on a user's behalf is presented as a prepared proposal, not an executed decision. The agent researches, structures, and presents — the traveler confirms. This boundary is held consistently throughout the product, not just for bookings. Trust in agentic systems is built through predictability about where human control begins.",
      },
      {
        title: "Preference as the starting point",
        description: "The default state of every recommendation engine is a popularity ranking. Hudson's default is your preference history. The system is designed to start from what it knows about you — and to be explicit when it does not yet know enough to be useful, rather than covering that gap with generic suggestions.",
      },
      {
        title: "Native iOS, not cross-platform compromise",
        description: "Hudson is built for iOS as a platform commitment, not a market prioritization. The interaction model follows iOS Human Interface Guidelines — familiar navigation patterns, native notification design, system-level location and privacy controls. A travel companion needs to integrate into the fabric of how a phone is used, not stand apart from it.",
      },
    ],
    aiRole: [
      {
        title: "Conversational planning engine",
        description: "The prototype's core working feature: a natural language planning interface that accepts unstructured trip descriptions and iterates toward a fully structured, time-ordered itinerary through conversational refinement. The engine handles ambiguity gracefully — 'something interesting for the afternoon' is as valid a starting point as a specific venue request.",
      },
      {
        title: "Contextual recommendation layer",
        description: "A recommendation system designed to combine live location, time of day, current weather, stated preferences, and the record of what has already been done on the trip. The design challenge is not building the layer — it is deciding when to surface suggestions and when to stay silent. Surfacing too often trains users to dismiss; surfacing too rarely misses the moments of genuine value.",
      },
      {
        title: "Agentic disruption management",
        description: "The highest-value capability in the product vision: an agentic system that monitors live travel data (flights, rail, weather), detects disruptions before they become crises, and prepares a complete replanning recommendation — alternative routing, updated hotel check-in windows, rescheduled reservations — ready for one-tap human confirmation. The system acts as a prepared response, not an autonomous one.",
      },
    ],
    aiDeepDive: {
      headline: "From search engine to travel companion — designing the intelligence layer that closes the gap",
      status: "vision",
      statusLabel: "Working Prototype + Product Vision",
      useCase: {
        label: "The Problem",
        body: "Consider three moments that define the real experience of travel. You land in a city with a layover you did not plan for and no idea what is worth doing for four hours near the airport. Your connecting flight slips forty minutes, puts your connection at risk, and the airline app tells you only that the new departure time is 18:45. You are mid-trip and a restaurant you booked three weeks ago has closed — you discover this at 7pm on a Thursday when everything nearby that matters is already full. These are not edge cases. They are the defining moments of modern travel. Current applications have no useful response to any of them because they are retrieval interfaces — they answer queries you know to ask, in a format you have to interpret, and leave the decision-making entirely to you. Hudson was designed from the beginning to close that gap: not by adding features to an itinerary app, but by treating contextual intelligence as the core product.",
      },
      implementation: {
        label: "The Architecture",
        body: "Hudson operates across three AI layers that work in concert rather than in sequence. The conversational planning engine accepts natural language as its primary input — not as a search query but as a brief to build from. 'Four days in Kyoto, food-first, contemporary architecture, nothing on the tourist circuit' becomes the foundation for an itinerary that is structured, time-ordered, and logistically coherent, refined through dialogue until it matches what the traveler actually has in mind. The contextual recommendation engine maintains a live model of where the traveler is, what time it is, what the weather is doing, what has already been done on the trip, and what preferences the system has inferred from prior interactions — and uses that model to surface relevant suggestions at the moment they become useful, without being asked. The agentic disruption layer watches live travel data streams, identifies changes with downstream itinerary impact, researches and evaluates alternatives, and prepares a complete replanning recommendation — new routing, updated timings, rescheduled reservations — in the background. When a disruption occurs, the traveler receives a prepared response, not a notification that something has gone wrong. Every consequential action proposed by the agentic layer requires explicit human confirmation before execution.",
      },
      benefits: [
        {
          title: "Plans that start from you, not from a popularity list",
          description: "Tell Hudson what you want in plain language. The system builds toward a real itinerary through conversation — handling logistics, checking availability, and flagging tradeoffs — rather than returning a list of venues you have to evaluate yourself.",
        },
        {
          title: "Recommendations that know the moment",
          description: "The right suggestion at 10am after a long morning of walking is different from the right suggestion at 6pm before dinner. Hudson's recommendation layer knows the difference — responding to location, time, weather, and what you have already done — and surfaces options at the moment they are actually useful.",
        },
        {
          title: "Disruption handled before you have to deal with it",
          description: "When your flight slips or a booking falls through, Hudson has already identified the impact, researched the alternatives, and prepared a replanning recommendation. You receive a solution to review, not a problem to solve — at the moment the disruption occurs, not after an hour of searching.",
        },
        {
          title: "Agentic capability with full human control",
          description: "Hudson can prepare bookings, research alternatives, and structure complex replanning — but it cannot act without your confirmation. The boundary between AI preparation and human decision is explicit, consistent, and enforced by design. You always know what the system has done and what it is proposing to do.",
        },
      ],
    },
    aiLayers: [
      {
        number: "01",
        icon: "MessageSquare",
        name: "Conversational Planning Engine",
        role: "Turns a natural language brief into a structured trip",
        input: "Unstructured trip description in plain language",
        process: "Large language model interprets intent, iterates through dialogue to resolve ambiguity, validates logistics and real-time availability, and produces a time-ordered itinerary — no forms, no category menus",
        output: "Personalised, logistically coherent itinerary",
      },
      {
        number: "02",
        icon: "Map",
        name: "Contextual Recommendation Layer",
        role: "Surfaces the right suggestion at the right moment",
        input: "Live GPS position, time of day, weather, preference history, trip activity log",
        process: "Real-time context model scores candidate recommendations by personal relevance, timing appropriateness, and proximity — surfacing only what clears the threshold, without asking",
        output: "Contextual suggestion delivered before you think to search",
      },
      {
        number: "03",
        icon: "RefreshCw",
        name: "Agentic Disruption Manager",
        role: "Detects problems and prepares solutions before you have to",
        input: "Live flight, rail, and weather data streams monitored against the active itinerary",
        process: "Detects disruptions, models downstream itinerary impact, researches and evaluates alternatives, assembles a complete replanning recommendation — then stops and waits for explicit human confirmation before any action is taken",
        output: "Prepared replanning proposal, ready for one-tap approval",
      },
    ],
    coverImage: "/work/hudson-cover.png",
    gallery: [
      { type: "phone", label: "App identity", description: "HUDSON — AI Navigator. The splash screen establishes the product's character before a single feature is shown: dark, precise, and quietly capable. The cyan loading bar and bold condensed wordmark signal speed and intelligence without announcing it.", screens: ["splash"], imagePath: "/work/hudson-cover.png" },
      { type: "phone", label: "Conversational planning", description: "Natural language as the starting point for a structured trip — the planning interface accepts vague inputs, builds an itinerary through dialogue, and refines it on request. No forms, no category menus: 'move the sake district to Day 2' is a complete and valid instruction.", screens: ["planning-chat", "itinerary-preview"], imagePath: "/work/hudson-chat.png" },
      { type: "phone", label: "AI-generated itinerary", description: "A day-by-day view built from preference, not popularity — colour-coded by category, with AI-sourced contextual notes on each stop. Hudson booked the timed museum entry and held the sake bar reservation before you thought to ask.", screens: ["itinerary-day", "stop-detail"], imagePath: "/work/hudson-itinerary.png" },
      { type: "phone", label: "Disruption response", description: "Flight delayed, connection threatened — Hudson detects it, researches alternatives, and surfaces a complete replanning proposal in 42 seconds. Rebook, adjust check-in, shift the dinner reservation. All prepared. None executed until you confirm.", screens: ["alert-screen", "replan-options", "confirm-action"], imagePath: "/work/hudson-disruption.png" },
    ],
    outcomes: [
      "Designed and shipped a working iOS prototype (live at hudson-app-6bs.pages.dev) demonstrating the core interaction model: conversational planning, contextual recommendations, and agentic disruption response",
      "Established a product architecture that treats contextual intelligence as the primary value proposition — not a feature layer on top of a booking engine",
      "Developed a conversational planning model that accepts natural language as a complete and valid trip brief, producing structured, logistically coherent itineraries through dialogue",
      "Designed an agentic action framework with an explicit and consistent boundary between AI preparation and human confirmation — addressing the core trust challenge in consumer agentic products",
      "Created a calm, glanceable interface design that reduces travel cognitive load rather than adding to it — including a notification model built around precision timing rather than frequency",
      "Defined a layered AI architecture — conversational planning engine, contextual recommendation layer, agentic disruption management — that can be developed incrementally from prototype to production",
    ],
    reflection:
      "The central design challenge in Hudson Navigation was not building intelligence — it was deciding what to do with it. The agentic capabilities the product envisions are genuinely powerful: a system that can detect a flight delay, model the downstream itinerary impact, identify alternatives, and surface a complete replanning recommendation in minutes is a real step change from anything currently available. But power without predictability is not useful in a consumer product. The design work that mattered most was not the planning interface or the recommendation engine — it was defining the moments of handoff: where the AI stops preparing and the human starts deciding, how that boundary is communicated, and how it is held consistently enough that travelers trust it.\n\nThe other insight that shaped the product was about what intelligent travel assistance actually looks like in use. The temptation in building a smart companion is to make it present — constantly surfacing options, proactively checking in, demonstrating its awareness. But travel is already demanding. The interface decisions that improved the product most were the ones that made Hudson quieter: a notification model that fires only when information is actionable, a recommendation system that surfaces suggestions without requiring a response, a planning approach that does the logistical work in the background rather than asking the traveler to manage it. The best version of agentic travel intelligence is not one you notice — it is one you simply benefit from.",
  },
  {
    slug: "spaceplace-canada",
    name: "SpacePlace Canada",
    category: "Civic & Culture",
    filterCategory: "Civic & Culture",
    tagline: "A public campaign to build Toronto a new planetarium — the city's first window on the sky in thirty years.",
    summary:
      "A campaign platform and digital presence for SpacePlace Canada — the organisation working to build a 21st-century public planetarium in Toronto. The McLaughlin Planetarium closed in 1995, leaving the largest city in North America without a public space for astronomy, science education, and collective wonder. SpacePlace Canada exists to change that: a dome theatre, interactive exhibits, classrooms, and a production studio — built for Toronto, made in Canada.",
    website: "quiet-brioche-84fd4c.netlify.app",
    services: [
      "Brand Strategy",
      "Campaign Design",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "Front-End Development",
      "Copywriting",
      "Content Strategy",
    ],
    platform: "Web",
    status: "Live — campaign site",
    accentColor: "hsl(47 96% 48%)",
    accentColorLight: "hsla(47,96%,48%,0.10)",
    opportunity:
      "Toronto is the largest city in North America without a public planetarium. The McLaughlin Planetarium closed in 1995 — and in the thirty years since, a generation of Torontonians has grown up without a place to see the sky. A city of six million people, home to some of the world's leading universities and research institutions, has no public infrastructure for astronomy, space science education, or the kind of communal awe that only a dome overhead can produce. SpacePlace Canada was founded to close that gap — and needed a digital presence that could make that absence feel urgent, the vision feel real, and the campaign feel worth joining.",
    vision:
      "SpacePlace Canada's vision is a 21st-century planetarium for Toronto: a dome theatre for immersive sky experiences, interactive exhibits for all ages, dedicated classroom space for school programming, and a production studio capable of creating original content for the dome. The platform's role is to build the community of support that makes the institution possible — connecting donors, school partners, corporate sponsors, and individuals who believe Toronto deserves a window on the universe.",
    users: [
      { title: "Toronto families", description: "Parents and children looking for science-led experiences and public spaces that inspire curiosity and wonder — and who feel the absence of a planetarium acutely." },
      { title: "Schools and educators", description: "Teachers and school administrators seeking curriculum-aligned space and astronomy programming for students across the city." },
      { title: "Corporate and institutional partners", description: "Organisations looking to support a visible, civic cultural institution with clear community and educational impact." },
      { title: "Campaign supporters", description: "Individuals who believe in the mission and want to follow the story, share it, and contribute to making the planetarium a reality." },
    ],
    capabilities: [
      { icon: "Star", title: "Campaign story platform", description: "A single, compelling narrative site that tells the story of Toronto's lost planetarium, the gap it left, and the institution SpacePlace Canada is building to replace it." },
      { icon: "Users", title: "Schools programme", description: "A dedicated section connecting educators and schools with the SpacePlace Canada education mission — setting the context for future curriculum-aligned programming." },
      { icon: "Calendar", title: "Events and community", description: "A programme of public events building the community of support and keeping the campaign story active and growing." },
      { icon: "Handshake", title: "Partners and sponsors", description: "A clear framework for corporate and institutional partnership — communicating the scope, values, and impact of supporting SpacePlace Canada." },
      { icon: "Newspaper", title: "Campaign news", description: "A news and updates feed keeping supporters informed as the campaign progresses — milestones, media coverage, and moments worth celebrating." },
      { icon: "Mail", title: "Mission newsletter", description: "A low-frequency email list — one update a month, the story as it happens — for supporters who want to follow the campaign without social media noise." },
    ],
    designPrinciples: [
      { title: "Make the absence felt", description: "The campaign works because the gap is real. The design makes Toronto's thirty years without a planetarium tangible — not as a complaint, but as a shared loss worth fixing together." },
      { title: "The sky as identity", description: "Dark navy, golden yellow, and the unobstructed night sky as the visual foundation. The design feels like looking up — open, expansive, full of possibility." },
      { title: "Warmth over urgency", description: "Civic campaigns that resort to pressure tactics lose the trust of the communities they need. The design is confident and inviting, not demanding. Support the campaign because you believe in it — not because you were pushed." },
      { title: "Built for everyone under it", description: "The planetarium's promise — for science, for wonder, for everyone — is held in the design. Accessible, clear, welcoming to anyone who's ever looked up." },
    ],
    aiRole: [
      { title: "Personalised supporter journeys (proposed)", description: "A planned engagement layer would tailor the campaign experience by visitor type — parent, educator, donor, corporate partner — surfacing the most relevant content and calls to action without requiring registration." },
      { title: "Campaign progress intelligence (design exploration)", description: "Exploration of how AI could surface dynamic campaign milestones, supporter counts, and progress signals that make each visit feel alive and worth sharing — not a static page." },
      { title: "School matching and outreach (future vision)", description: "The long-term vision includes an AI-assisted matching system connecting SpacePlace Canada with schools and educators whose science curriculum priorities align with the planetarium's future programming." },
    ],
    aiDeepDive: {
      headline: "From campaign to community — AI as the connective tissue between a mission and the people who believe in it",
      status: "proposed",
      statusLabel: "Design Exploration — Campaign Roadmap",
      useCase: {
        label: "The Use-Case",
        body: "A civic campaign site has a fundamental problem: every visitor arrives with a different relationship to the mission. A Toronto parent who went to the McLaughlin Planetarium as a child has an emotional connection that requires almost no persuasion. A school principal looking for science programming needs to understand what the institution will offer students. A corporate sustainability lead needs to understand the community impact case. A first-time visitor who stumbled in from a news article needs to understand why Toronto doesn't already have a planetarium. Serving all of these audiences from a single static homepage produces a site that is adequate for everyone and compelling for nobody. The AI opportunity is to recognise who is arriving and meet them where they are.",
      },
      implementation: {
        label: "The Implementation",
        body: "A proposed personalisation layer would use lightweight behavioural signals — entry path, content engaged with, time spent by section — to infer visitor type without requiring registration or explicit identification. Parents browsing the Schools section would surface child-oriented event content and future programming details. Visitors who engage with the partnership section would see corporate impact framing and clear contact pathways. First-time visitors following a news link would receive the foundational campaign story before being invited deeper. A dynamic campaign progress module would use real milestone data to surface the most recent and most shareable moment in the campaign — keeping the site alive between formal news events. Longer term, a school matching tool would use stated curriculum priorities and grade levels to connect educators with relevant programming proposals and campaign contacts.",
      },
      benefits: [
        {
          title: "A campaign that meets you where you are",
          description: "Whether you're a parent, a teacher, a potential donor, or someone who just learned Toronto has no planetarium — the site leads with what matters to you, not a one-size-fits-all pitch.",
        },
        {
          title: "Progress that pulls people back",
          description: "Dynamic milestone content gives supporters a reason to return and share — turning a static campaign page into a living story worth following.",
        },
        {
          title: "Schools connected to the mission early",
          description: "Educators who care about space science and astronomy can find and express interest in future programming before the planetarium opens — building the institutional relationships that make a launch meaningful.",
        },
      ],
    },
    coverImage: "/work/spaceplace-cover.png",
    gallery: [
      { type: "fullwidth", label: "Homepage", description: "The campaign hero: deep space photography, gold headline lettering, and a single email CTA — 'One email a month. The story as it happens.' — alongside the 1995/TODAY/NEXT timeline framing the mission", screens: ["hero", "timeline"], imagePath: "/work/spaceplace-cover.png" },
      { type: "browser", label: "About the mission", description: "The founding argument: why Toronto — the largest city in North America without a public planetarium — needs a new window on the sky, and what SpacePlace Canada is building to provide it", screens: ["mission-statement", "case-for-support"] },
      { type: "browser", label: "Schools programme", description: "Education outreach section connecting teachers and school administrators with the SpacePlace Canada science education mission and future curriculum-aligned programming", screens: ["schools-hero", "programme-overview"] },
      { type: "browser", label: "Support the campaign", description: "The campaign's public call to action: newsletter sign-up, events, and partnership pathways that build the community of support the planetarium needs to become real", screens: ["support-cta", "newsletter-form"] },
    ],
    outcomes: [
      "Designed and built a live campaign platform that communicates a thirty-year civic gap and makes the case for a new public planetarium with clarity and emotional resonance",
      "Established a visual identity rooted in the night sky — dark navy, golden yellow, and expansive space photography — that gives the campaign a distinctive and memorable presence",
      "Created a campaign architecture that serves multiple audiences (families, schools, corporate partners, individual supporters) from a single, coherent narrative site",
      "Built a newsletter acquisition flow anchored in a low-commitment promise: one email a month, the story as it happens",
      "Delivered a platform positioned to grow with the campaign — from early community building through to institutional launch",
    ],
    reflection:
      "The core design challenge for SpacePlace Canada was making absence visible. The McLaughlin Planetarium closed in 1995 — which means every Torontonian under forty-five has grown up in a city without one. That absence is so familiar it has become invisible. The campaign's job is to make people feel it again: to remind them that something is missing, and that something can be done about it. The design approach was to let the night sky do most of the work. Dark, expansive, and lit by stars, the visual environment makes the case before a word is read. The challenge was then to connect that feeling — of standing under an open sky — to a civic institution that doesn't yet exist. The 1995/TODAY/NEXT timeline was the key: a three-panel argument that turns absence into narrative and narrative into momentum.",
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
  "Civic & Culture",
];
