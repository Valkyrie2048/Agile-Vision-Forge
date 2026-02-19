# Agile Vision - Technology Studio Website

## Overview
Modern, VC-backed technology studio website for Agile Vision, specializing in AI and Agentic AI products, chatbots, and intelligent automation for consumers and SMBs.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: Express.js with PostgreSQL (Drizzle ORM)
- **Theme**: Dark-first with light mode toggle, purple accent gradient (hsl 250 85% 60%)
- **Font**: Inter (sans), Playfair Display (serif), JetBrains Mono (mono)

## Pages
- `/` - Home page with cinematic hero, bento grid capabilities, filter-based demo previews, process timeline, tech partner marquee, testimonials, final CTA
- `/get-started` - Product Playground (4 interactive demos) + project inquiry form
- `/contact` - Contact form with "Let's Talk" headline, trust signals, decorative gradients
- `/blog` - Magazine-style blog listing with featured hero card, category filtering (7 categories), 3-column grid
- `/blog/:slug` - Full-width hero article page with reading progress bar, table of contents sidebar, pull quotes, related articles, back-to-top button

## Blog (client/src/data/blog-articles.ts)
- 8 expert articles covering AI, Design, Development, Automation, Emerging Tech, Future Trends
- Categories: All, AI & Machine Learning, Design, Development, Automation, Emerging Tech, Future Trends
- AI-generated images in client/public/images/blog/ (.png format)
- Written in first person, personal but professional tone as the founder
- Pull quotes supported via > "quote" markdown syntax
- No em dashes in any content

## Key Features
- Cinematic hero with animated gradient mesh and floating orbs
- Bento grid layout showcasing capabilities with images
- Product Playground: 4 interactive demos (AI Chatbot, Workflow Builder, Smart Dashboard, Agentic AI) with real input/interaction
- Filter-based demo previews on home page (9 project types)
- Infinite-scroll tech partner marquee
- Testimonials with gradient-bordered cards
- Project inquiry form with project type selection
- Contact form with trust signals
- Dark/light theme toggle
- Responsive design with mobile navigation
- Animated transitions via Framer Motion

## Interactive Demos (client/src/components/interactive-demos.tsx)
- **AI Chatbot**: Type messages, get simulated streaming responses with typing indicator and suggested prompts
- **Workflow Builder**: Add/remove automation steps, run pipeline with real-time status animation
- **Smart Dashboard**: Toggle date ranges (7d/30d/90d/1y) and filters (all/organic/paid), animated charts and metrics
- **Agentic AI**: Type a goal, watch 3 AI agents collaborate with thinking/working/done states and typed summary

## Database Tables
- `contact_submissions` - Contact form entries
- `project_submissions` - Project inquiry submissions

## Email Integration
- Email integration (nodemailer) configured for optional SMTP
- Submissions are always stored in database
- Target email: m.graham@live.ca (configured server-side, not exposed in frontend)

## Recent Changes
- 2026-02-19: Made AI Analysis section interactive: hidden by default with "Generate Analysis" button; clicking triggers animated analyzing steps, typed summary reveal, staggered takeaway appearance, and fade-in impact/relevance footer
- 2026-02-19: Added "Agile Vision AI Analysis" section at end of each blog article with summary, key takeaways, impact score badge, and audience relevance; data stored in aiAnalysis field on BlogArticle type
- 2026-02-19: Blog redesign - magazine-style listing with featured hero, article page with full-width hero image, reading progress bar, TOC sidebar, pull quotes, related articles; 8 articles rewritten (no em dashes), AI-generated creative images
- 2026-02-19: Complete redesign - replaced basic layout with award-worthy design; replaced multi-step wizard with streamlined form; added bento grid, animated metrics, testimonials, tech marquee
- 2026-02-18: Initial build - full website with all pages and backend

## User Preferences
- Footer: ©2026 Agile Vision Technology Inc. All rights reserved.
- Contact email: m.graham@live.ca (not displayed on frontend)
- Design: impressive, modern, conversion-focused (not basic)
