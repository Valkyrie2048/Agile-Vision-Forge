# Agile Vision - Technology Studio Website

## Overview
Modern, VC-backed technology studio website for Agile Vision, specializing in AI and Agentic AI products, chatbots, and intelligent automation for consumers and SMBs.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: Express.js with PostgreSQL (Drizzle ORM)
- **Theme**: Dark-first with light mode toggle, purple accent gradient
- **Font**: Inter (sans), Playfair Display (serif), JetBrains Mono (mono)

## Pages
- `/` - Home page with hero, services, process, tech stack, CTA
- `/wizard` - Interactive 4-step project wizard with embedded demos
- `/contact` - Contact form

## Key Features
- Interactive project wizard with 6 demo types (mobile, webapp, dataapp, 3D game, automation, chatbot)
- Contact form and wizard submissions stored in PostgreSQL
- Dark/light theme toggle
- Responsive design with mobile navigation
- Animated transitions via Framer Motion

## Database Tables
- `contact_submissions` - Contact form entries
- `project_submissions` - Wizard project submissions

## Email Integration
- Email integration (Resend) was not set up by user
- Submissions are stored in database only
- Target email: configured server-side (not exposed in frontend)

## Recent Changes
- 2026-02-18: Initial build - full website with all pages and backend

## User Preferences
- Footer: ©2026 Agile Vision Technology Inc. All rights reserved.
- Contact email: m.graham@live.ca (not displayed on frontend)
