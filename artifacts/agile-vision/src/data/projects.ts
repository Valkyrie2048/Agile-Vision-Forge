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
}

export interface Project {
  slug: string;
  name: string;
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
    tagline: "A financial platform designed around the realities of independent and nontraditional work.",
    summary:
      "A product concept for a financial platform that helps gig workers, freelancers, and contractors understand their income, access appropriate financial products, and build lasting financial confidence.",
    website: "gigamatic.finance",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "Brand Direction",
      "Design Systems",
      "AI Product Design",
    ],
    platform: "Web · iOS · Android",
    status: "Product concept — in design exploration",
    accentColor: "hsl(210 85% 55%)",
    accentColorLight: "hsla(210,85%,55%,0.12)",
    opportunity:
      "The global workforce is undergoing a structural shift. Tens of millions of people now earn income through freelance work, platform employment, contract arrangements, or multiple income streams — yet the financial products and services available to them were designed for a different era. Traditional lenders, banks, and financial tools assume stable, salaried employment. For independent workers, this creates compounding disadvantages: difficulty obtaining mortgages, invisible credit histories, inadequate savings infrastructure, and a lack of clear financial insight. GIGAMATIC Finance addresses this gap by reimagining financial services from the ground up for the realities of independent and nontraditional work.",
    vision:
      "GIGAMATIC Finance is designed as a central financial home for independent workers — a single platform where fragmented income becomes intelligible, financial products become accessible, and the complexity of running your own financial life becomes manageable. The product vision centers on income visibility, intelligent insights, and personalized pathways to financial products that actually fit the way people work.",
    users: [
      { title: "Freelancers", description: "Designers, developers, writers, and other self-employed professionals managing project-based income." },
      { title: "Gig workers", description: "Platform workers on Uber, Deliveroo, or similar services managing variable, hourly earnings." },
      { title: "Contractors", description: "Independent consultants and contractors operating through limited companies or direct engagements." },
      { title: "Portfolio workers", description: "People combining employment, freelance projects, and passive income across multiple streams." },
    ],
    capabilities: [
      { icon: "BarChart3", title: "Consolidated income visibility", description: "Connect multiple income sources — invoices, bank feeds, platform earnings — into a single, clear financial picture." },
      { icon: "TrendingUp", title: "Income trends and insights", description: "Understand patterns in earnings over time and identify seasonality, growth, or risk factors in income." },
      { icon: "CreditCard", title: "Financial product discovery", description: "Browse and compare financial products — mortgages, loans, insurance — filtered to match independent worker profiles." },
      { icon: "Sparkles", title: "Personalized recommendations", description: "Proposed AI layer that surfaces relevant financial products, tax considerations, and savings opportunities based on individual income patterns." },
      { icon: "Shield", title: "Financial readiness indicators", description: "Clear signals about readiness for major financial decisions — lending eligibility, mortgage readiness, emergency fund health." },
      { icon: "Lock", title: "User-controlled financial data", description: "Explicit consent and control over how financial data is shared with third-party products and providers." },
    ],
    designPrinciples: [
      { title: "Trust through transparency", description: "Every data connection, insight, and recommendation explains where it comes from and what it means, building confidence rather than confusion." },
      { title: "Non-judgmental language", description: "Financial interfaces for independent workers often carry embedded assumptions about what is 'normal.' GIGAMATIC Finance uses language that respects the diversity of modern work." },
      { title: "Clarity over complexity", description: "Income data is inherently complex. The design system is built to surface the most relevant information at the right moment, not to expose raw financial data." },
      { title: "Mobile-first accessibility", description: "Independent workers manage their finances across devices and contexts. The experience is designed for high usability on mobile without sacrificing depth on desktop." },
    ],
    aiRole: [
      { title: "Income pattern analysis (proposed)", description: "A planned AI layer would analyze connected income sources to identify trends, flag anomalies, and contextualize earnings relative to prior periods." },
      { title: "Product matching (design exploration)", description: "The product vision includes an intelligent matching model that aligns users with financial products whose eligibility criteria fit nontraditional income profiles." },
      { title: "Readiness indicators (prototype)", description: "Prototype work has explored AI-generated readiness signals — presenting a holistic view of financial health rather than a single credit score." },
    ],
    gallery: [
      { type: "browser", label: "Dashboard overview", description: "Income summary, connected sources, and financial readiness at a glance", screens: ["income-summary", "connected-sources", "readiness-gauge"] },
      { type: "phone", label: "Mobile income view", description: "Weekly earnings breakdown across active income streams", screens: ["weekly-earnings", "stream-list"] },
      { type: "detail", label: "Product discovery", description: "Browsing mortgages and loans filtered by independent worker eligibility", screens: ["product-filter", "eligibility-card"] },
      { type: "browser", label: "Insights dashboard", description: "Twelve-month income trends with seasonality markers", screens: ["trend-chart", "seasonality-flags"] },
    ],
    outcomes: [
      "Established a clear product vision for a financial platform serving an underserved worker demographic",
      "Designed an information architecture that consolidates complex multi-source income data into a coherent experience",
      "Created a scalable design system grounded in financial trust and non-judgmental communication",
      "Explored AI-assisted product matching as a differentiating capability versus traditional financial comparison sites",
      "Positioned GIGAMATIC Finance for future development and potential partnerships with aligned financial providers",
    ],
    reflection:
      "The most important insight from this project was recognizing how much financial product design has assumed a single employer, a regular salary, and a linear career path. Designing for the inverse — multiple, variable, and self-directed income — required questioning nearly every default pattern in financial UX. The result is a product that treats financial complexity not as an edge case to manage around, but as the central design challenge.",
  },
  {
    slug: "gigamatic-insure",
    name: "GIGAMATIC Insure",
    category: "Insurtech",
    filterCategory: "Insurtech",
    tagline: "Insurance and benefits designed for people whose careers do not follow a traditional employment model.",
    summary:
      "A product concept for an insurance and benefits platform that helps independent workers discover, understand, and access coverage that fits the realities of self-directed working lives.",
    website: "gigamatic.insure",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "AI Product Design",
      "Prototyping",
    ],
    platform: "Web · iOS",
    status: "Product concept — in design exploration",
    accentColor: "hsl(160 70% 45%)",
    accentColorLight: "hsla(160,70%,45%,0.12)",
    opportunity:
      "Employment-linked benefits — health insurance, income protection, life cover, workplace pensions — remain inaccessible to a growing portion of the workforce. Independent workers either go without essential coverage, purchase products that do not suit their situation, or spend significant time navigating a market designed for different needs. Insurance for the self-employed is not just a product gap; it is a design gap. The information, language, and purchasing journeys available assume a static, employer-mediated relationship with coverage that does not exist for millions of workers.",
    vision:
      "GIGAMATIC Insure is designed to be the simplest, clearest entry point to insurance and benefits for independent workers. The product vision centers on personalized discovery, plain-language explanations, and guided decision support — helping people understand what they need, compare options that fit their situation, and make informed decisions without the experience of a licensed advisor being necessary to navigate the process.",
    users: [
      { title: "First-time independent workers", description: "People recently moving into self-employment who have never had to source their own insurance or benefits." },
      { title: "Established freelancers", description: "Long-term independent workers reviewing or expanding their coverage as income and circumstances change." },
      { title: "Gig platform workers", description: "Platform workers seeking accessible health and income protection outside of employment entitlement." },
      { title: "Portfolio career workers", description: "People combining employment and self-employment who need to understand gaps in existing coverage." },
    ],
    capabilities: [
      { icon: "Search", title: "Personalized insurance discovery", description: "A guided onboarding experience that surfaces relevant categories of coverage based on individual work patterns and circumstances." },
      { icon: "FileText", title: "Simplified policy explanations", description: "Complex policy language translated into clear, plain-language summaries — with explicit disclosure of what is and is not included." },
      { icon: "Heart", title: "Health and wellness benefits", description: "An exploration of health coverage, dental, optical, and wellness-related benefits available to independent workers." },
      { icon: "Shield", title: "Income protection pathways", description: "Guidance on income protection, critical illness, and related products designed for variable-income earners." },
      { icon: "Scale", title: "Comparison and recommendation", description: "Proposed capability to compare products across providers based on coverage, cost, and suitability to income profile." },
      { icon: "Users", title: "Provider connections", description: "Connections to relevant insurers and benefit providers appropriate to the user's profile and location." },
    ],
    designPrinciples: [
      { title: "Reduce complexity, not information", description: "Insurance decisions are consequential. The design makes complexity navigable without hiding important detail from users who want it." },
      { title: "Clear eligibility communication", description: "Users must be able to understand whether products are available to them before investing time in the discovery process." },
      { title: "Informed, not directed", description: "GIGAMATIC Insure is designed as a discovery and education platform, not a regulated insurance advisor. Recommendations are clearly labeled as informational guidance." },
      { title: "Trust and privacy", description: "Data shared in the discovery process is handled with explicit consent and used only to improve relevance — never sold or shared without permission." },
    ],
    aiRole: [
      { title: "Coverage gap identification (proposed)", description: "A planned AI layer would analyze work patterns, existing coverage, and life circumstances to surface potential gaps in protection." },
      { title: "Policy comparison summarization (design exploration)", description: "Prototype work has explored using language models to generate plain-language summaries of policy documentation for comparison purposes." },
      { title: "Discovery personalization (future vision)", description: "The long-term product vision includes intelligent discovery that improves with usage — learning which types of products are most relevant to individual circumstances over time." },
    ],
    gallery: [
      { type: "phone", label: "Discovery onboarding", description: "Guided questions to surface relevant coverage categories", screens: ["onboarding-q1", "onboarding-q2", "coverage-suggestions"] },
      { type: "browser", label: "Coverage explorer", description: "Browsing insurance categories with plain-language summaries", screens: ["category-grid", "product-detail"] },
      { type: "detail", label: "Policy card comparison", description: "Side-by-side comparison of two income protection products", screens: ["compare-view"] },
      { type: "phone", label: "Eligibility check", description: "Clear communication of product availability based on work type", screens: ["eligibility-screen"] },
    ],
    outcomes: [
      "Designed an insurance discovery experience that respects user intelligence without requiring prior insurance literacy",
      "Created a product architecture that clearly separates informational guidance from regulated advice",
      "Established a design language that builds trust in a category historically characterized by opacity",
      "Explored AI-assisted gap identification as a differentiating alternative to simple product catalogues",
      "Positioned GIGAMATIC Insure as the insurance dimension of the broader GIGAMATIC ecosystem",
    ],
    reflection:
      "The defining challenge in designing GIGAMATIC Insure was navigating the boundary between being genuinely helpful and being a regulated insurance advisor. Designing in that space required precision — every piece of language, every recommendation, every call to action needed to respect that distinction while still providing real value. It is a constraint that, rather than limiting the design, ended up shaping its most distinctive features: radical transparency, user-controlled discovery, and a commitment to informed decisions over conversion optimization.",
  },
  {
    slug: "gigamatic-careers",
    name: "GIGAMATIC Careers",
    category: "Future of Work",
    filterCategory: "Future of Work",
    tagline: "A career platform built for modern, flexible, and multidimensional working lives.",
    summary:
      "A product concept for a career platform that helps people understand their work history, map transferable skills, explore income opportunities, and navigate career paths across employment, contract work, and the gig economy.",
    website: "gigamatic.careers",
    services: [
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "AI Product Design",
      "Design Systems",
    ],
    platform: "Web · iOS · Android",
    status: "Product concept — in design exploration",
    accentColor: "hsl(280 75% 60%)",
    accentColorLight: "hsla(280,75%,60%,0.12)",
    opportunity:
      "Career platforms were built for a linear, employer-centric model of work that fewer people actually experience. Resumes flatten complex, multidimensional work histories into a format designed to satisfy applicant-tracking systems. Job boards treat employment and contract work as categorically different. Skills are systematized into formal qualifications that fail to capture practical, cross-domain expertise. For independent workers, career changers, and people with non-traditional work histories, existing career platforms are not just insufficient — they are often actively misleading about the value and relevance of what those workers bring.",
    vision:
      "GIGAMATIC Careers is designed to be a living career platform — a place where the full texture of a person's work history becomes visible and actionable. The product vision moves beyond the resume to create a dynamic capability profile: a representation of what someone can actually do, where they have done it, and how it translates across different types of opportunity.",
    users: [
      { title: "Career changers", description: "People moving between industries or employment types who need to understand how their existing skills translate." },
      { title: "Portfolio workers", description: "Individuals combining employment, freelance, and contract work who need a coherent representation of their full capability." },
      { title: "Returning workers", description: "People returning to work after breaks for caregiving, study, or other reasons, navigating a changed market with evolving skills." },
      { title: "Early-career independents", description: "Young workers building careers outside traditional employment structures who need tools designed for their path." },
    ],
    capabilities: [
      { icon: "User", title: "Dynamic career profile", description: "A living work history that captures employment, contract work, freelance projects, and skills development beyond a static resume format." },
      { icon: "GitBranch", title: "Skills and experience mapping", description: "Structured capture of practical skills — technical, creative, interpersonal — regardless of how they were developed or in what context." },
      { icon: "ArrowRightLeft", title: "Transferable skills discovery", description: "Exploration of how existing skills apply across different roles, industries, and opportunity types." },
      { icon: "Map", title: "Personalized career pathways", description: "Proposed capability to model potential career directions based on current profile, stated goals, and relevant opportunity data." },
      { icon: "Briefcase", title: "Opportunity matching", description: "Relevant job, contract, and project opportunities matched to capability profile rather than keyword-matching against job titles." },
      { icon: "GraduationCap", title: "Learning recommendations", description: "Curated development recommendations aligned to identified skill gaps and target career directions." },
    ],
    designPrinciples: [
      { title: "Inclusive career language", description: "The platform is designed to name and value work done outside formal employment — avoiding language that implies non-traditional work is lesser." },
      { title: "User agency and control", description: "People decide what to include in their career profile, how it is presented, and to whom it is visible. The platform serves the worker, not the employer." },
      { title: "Explainable recommendations", description: "Career guidance is presented with transparent reasoning — users can see why a pathway or opportunity is being suggested and adjust accordingly." },
      { title: "Avoiding determinism", description: "AI career guidance is designed to expand perceived options, not constrain them. No recommendation implies that any path is foreclosed." },
    ],
    aiRole: [
      { title: "Capability extraction (prototype)", description: "Prototype work has explored using language models to help users articulate their practical skills from work history descriptions — surfacing capabilities they may not have formally identified." },
      { title: "Pathway modelling (future vision)", description: "The product vision includes AI-assisted career pathway modelling — presenting a range of plausible directions based on profile data without reducing choice to a single predicted outcome." },
      { title: "Opportunity relevance scoring (proposed)", description: "A proposed matching layer that scores opportunity relevance based on the full capability profile rather than title-to-title keyword matching." },
    ],
    gallery: [
      { type: "browser", label: "Career profile", description: "Dynamic work history with skills, projects, and capability tags", screens: ["profile-overview", "skills-grid"] },
      { type: "phone", label: "Skills mapping", description: "Interactive exploration of transferable skills across domains", screens: ["skills-mobile", "transferable-view"] },
      { type: "browser", label: "Opportunity matching", description: "Relevant opportunities matched by capability profile", screens: ["opportunity-list", "match-reasoning"] },
      { type: "detail", label: "Pathway explorer", description: "Visualizing possible career directions from current profile", screens: ["pathway-map"] },
    ],
    outcomes: [
      "Established a product vision for a career platform that treats nontraditional work history as an asset, not an exception",
      "Designed a capability profile model that goes beyond the resume format to represent real, practical expertise",
      "Created a transferable-skills framework that makes career mobility legible for a diverse range of worker backgrounds",
      "Explored explainable AI career guidance as a principled alternative to opaque recommendation systems",
      "Positioned GIGAMATIC Careers as the career and opportunity dimension of the broader GIGAMATIC ecosystem",
    ],
    reflection:
      "The most valuable design insight from GIGAMATIC Careers was the realization that most career tools are built for recruiters, not workers. Once the product perspective shifted entirely to the individual — asking what they need to understand and act on, rather than what makes them efficiently searchable — nearly every design decision changed. The result is a platform that treats career intelligence as something workers build for themselves, not as data they submit for someone else's use.",
  },
  {
    slug: "gigamatic-ai",
    name: "GIGAMATIC AI",
    category: "Artificial Intelligence",
    filterCategory: "Artificial Intelligence",
    tagline: "An intelligent layer connecting work, income, financial health, protection, and opportunity.",
    summary:
      "A strategic product concept for the AI intelligence layer underlying the GIGAMATIC platform — enabling personalized guidance, conversational navigation, and cross-product context across Finance, Insure, and Careers.",
    website: "gigamatic.ai",
    services: [
      "AI Product Design",
      "Product Architecture",
      "Product Strategy",
      "UX Strategy",
      "User Experience Design",
      "User Interface Design",
      "Prototyping",
    ],
    platform: "Cross-platform · Web · iOS · Android",
    status: "Strategic design vision — prototype stage",
    accentColor: "hsl(250 85% 60%)",
    accentColorLight: "hsla(250,85%,60%,0.12)",
    opportunity:
      "The GIGAMATIC platform addresses three interconnected dimensions of independent work: finances, protection, and career. These domains are deeply interrelated — a change in income affects financial readiness, which affects insurance needs, which affects career decisions. Yet most products treat them in isolation, forcing users to manually connect insights across fragmented experiences. GIGAMATIC AI is designed to be the intelligence layer that holds this context across the platform — surfacing connections, identifying opportunities, and guiding users through complex decisions that span all three domains.",
    vision:
      "GIGAMATIC AI is the strategic vision for an intelligence layer that learns from cross-product context to provide guidance that a single-domain product never could. The product concept explores an AI system that understands a user's full situation — their income patterns, their coverage gaps, their career trajectory — and can surface insights, answer questions, and assist with decisions in a way that is both personalized and explainable. Advanced capabilities are presented as a strategic product vision, with careful attention to consent, control, and the distinction between guidance and regulated professional advice.",
    users: [
      { title: "GIGAMATIC platform users", description: "People using one or more of the Finance, Insure, or Careers products who would benefit from cross-domain intelligence." },
      { title: "Complex circumstance workers", description: "Independent workers navigating simultaneous financial, protection, and career decisions — the users who benefit most from connected context." },
      { title: "Goal-oriented planners", description: "Users with specific outcomes in mind — buying a home, transitioning careers, building savings — who need guidance that spans multiple product domains." },
    ],
    capabilities: [
      { icon: "Sparkles", title: "Personalized cross-platform insights", description: "Insights that draw on context from Finance, Insure, and Careers together — surfacing connections invisible from within any single product." },
      { icon: "MessageSquare", title: "Conversational navigation", description: "A conversational interface that helps users explore their situation, understand their options, and navigate to the right product experience." },
      { icon: "Brain", title: "Intelligent recommendations", description: "Proposed recommendation layer that identifies relevant products, actions, and opportunities based on full user context rather than single-product signals." },
      { icon: "Eye", title: "Explainable reasoning", description: "Every recommendation and insight is designed to show its reasoning — users can always understand why something is being surfaced." },
      { icon: "UserCheck", title: "User-controlled memory", description: "Users explicitly control what context the AI retains, what it can act on, and when it requires human confirmation before proceeding." },
      { icon: "AlertCircle", title: "Proactive opportunity identification", description: "Proposed capability to proactively identify opportunities — a product that may now be relevant, a career move worth exploring, a financial risk to address." },
    ],
    designPrinciples: [
      { title: "Explainability as a product value", description: "The AI layer is designed to make its reasoning visible at every point — turning explainability from a compliance requirement into a core user experience." },
      { title: "Consent and control", description: "Every AI action that uses cross-domain context requires explicit user consent. Users can review, adjust, and revoke any permission at any time." },
      { title: "Guidance, not advice", description: "The system is designed to provide intelligent guidance — surfacing options, explaining tradeoffs, and recommending pathways — while clearly maintaining the distinction from licensed financial or career advice." },
      { title: "Human review for consequential decisions", description: "Any action with significant consequences — a financial product application, a major career transition, an insurance change — requires explicit human confirmation before the AI assists in executing it." },
    ],
    aiRole: [
      { title: "Cross-domain context model (future vision)", description: "The strategic vision includes a user context model that holds relevant information across Finance, Insure, and Careers — enabling guidance that recognizes the interconnected nature of financial and career decisions." },
      { title: "Conversational interface (prototype)", description: "Prototype work has explored a conversational AI interface that allows users to ask questions about their financial and career situation in natural language and receive contextually relevant responses." },
      { title: "Agentic workflow assistance (design exploration)", description: "Design exploration has considered agentic AI that can assist with multi-step tasks — researching options, comparing products, preparing applications — under explicit user direction and with confirmation checkpoints throughout." },
    ],
    gallery: [
      { type: "browser", label: "AI intelligence hub", description: "Cross-platform insights dashboard with personalized recommendations", screens: ["insights-hub", "recommendation-cards"] },
      { type: "phone", label: "Conversational assistant", description: "Natural language guidance interface for navigating complex decisions", screens: ["chat-interface", "recommendation-response"] },
      { type: "detail", label: "Explainability panel", description: "Transparent reasoning behind AI-generated recommendations", screens: ["reasoning-view"] },
      { type: "browser", label: "Consent and memory controls", description: "User-controlled AI context and permission management", screens: ["permissions-panel", "memory-controls"] },
    ],
    outcomes: [
      "Established a clear strategic vision for AI as a cross-platform intelligence layer rather than a feature added within individual products",
      "Designed a consent and explainability framework that treats transparency as a product differentiator",
      "Explored conversational AI navigation as an alternative to traditional information architecture for complex, multi-domain decisions",
      "Created a design language for agentic AI that emphasizes human control, confirmation, and reversibility",
      "Demonstrated the potential of connected intelligence across financial, protection, and career domains for independent workers",
    ],
    reflection:
      "The central insight from designing GIGAMATIC AI was that the most valuable thing AI can do in this context is not answer questions — it is ask them. A person navigating independent working life faces compounding decisions across domains that conventional products address in silos. An intelligence layer that holds the full picture and knows what question to surface at the right moment is worth more than any single feature. Designing for that required reimagining the relationship between the AI and the user — not as a search engine or a chatbot, but as a collaborator with memory, context, and appropriate humility.",
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
    gallery: [
      { type: "fullwidth", label: "Institute homepage", description: "Editorial homepage with featured research and clear intellectual positioning", screens: ["homepage-hero", "featured-research"] },
      { type: "browser", label: "Article reading experience", description: "Long-form article layout with structured typography and related content", screens: ["article-body", "related-articles"] },
      { type: "detail", label: "Research library", description: "Navigable collection of publications organized by theme and discipline", screens: ["library-grid", "filter-system"] },
      { type: "browser", label: "Contributor profile", description: "Rich academic profile connecting researcher to their body of work", screens: ["contributor-page"] },
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
    gallery: [
      { type: "phone", label: "Conversational planning", description: "Natural language trip planning with iterative refinement", screens: ["planning-chat", "itinerary-preview"] },
      { type: "phone", label: "Live itinerary view", description: "Day-by-day view adapting to current time, location, and preferences", screens: ["itinerary-today", "next-up-card"] },
      { type: "detail", label: "Location-aware suggestions", description: "Contextual recommendations surfaced near current location", screens: ["nearby-suggestions", "detail-card"] },
      { type: "phone", label: "Disruption handling", description: "Agent-assisted replanning with human confirmation checkpoint", screens: ["alert-screen", "replan-options", "confirm-action"] },
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
