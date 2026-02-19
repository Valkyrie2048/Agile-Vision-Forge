# Agile Vision - Technology Studio Website

## Overview
Modern, VC-backed technology studio website for Agile Vision, specializing in AI and Agentic AI products, chatbots, and intelligent automation for consumers and SMBs.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: Express.js with PostgreSQL (Drizzle ORM)
- **Theme**: Dark-first with light mode toggle, purple accent gradient (hsl 250 85% 60%)
- **Font**: Inter (sans), Playfair Display (serif), JetBrains Mono (mono)

## Pages
- `/` - Home page with cinematic hero, bento grid capabilities with embedded demos, animated metrics, process timeline, tech partner marquee, testimonials, final CTA
- `/get-started` - Streamlined single-page project inquiry form with live demo preview (replaced old multi-step wizard)
- `/contact` - Contact form with "Let's Talk" headline, trust signals, decorative gradients

## Key Features
- Cinematic hero with animated gradient mesh and floating orbs
- Bento grid layout showcasing capabilities with embedded interactive demos (ChatbotDemo, WebAppDemo, AutomationDemo)
- Animated counter metrics (97% satisfaction, 50+ products, 3x ROI, $12M+ revenue)
- Infinite-scroll tech partner marquee
- Testimonials with gradient-bordered cards
- Single-page project inquiry form (no wizard friction)
- Contact form with trust signals
- Dark/light theme toggle
- Responsive design with mobile navigation
- Animated transitions via Framer Motion

## Database Tables
- `contact_submissions` - Contact form entries
- `project_submissions` - Project inquiry submissions

## Email Integration
- Email integration (nodemailer) configured for optional SMTP
- Submissions are always stored in database
- Target email: m.graham@live.ca (configured server-side, not exposed in frontend)

## Recent Changes
- 2026-02-19: Complete redesign - replaced basic layout with award-worthy design; replaced multi-step wizard with streamlined form; added bento grid, animated metrics, testimonials, tech marquee
- 2026-02-18: Initial build - full website with all pages and backend

## User Preferences
- Footer: ©2026 Agile Vision Technology Inc. All rights reserved.
- Contact email: m.graham@live.ca (not displayed on frontend)
- Design: impressive, modern, conversion-focused (not basic)
