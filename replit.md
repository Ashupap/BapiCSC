# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### CSC Balasore Landing Page (`artifacts/csc-landing`)
- **Type**: react-vite, preview at `/`
- **Purpose**: High-conversion landing page for CSC & Bank of Baroda BC Point in Balasore, Odisha
- **Theme**: "Skip the Queue: Easy CSC Services"
- **Features**:
  - English / Odia language toggle (top right of header)
  - Sticky header with owner branding and trust signals
  - Hero carousel (3 slides, auto-rotate)
  - Express service scrolling ticker ribbon
  - "How It Works" 3-step section
  - Service Engine: 100+ services with Fuse.js fuzzy search, category filters
  - Service Basket (cart-style) with WhatsApp deep-link quote generation
  - Document checklist per service + upload simulation
  - About section with owner credentials
  - FAQ accordion
  - Google Maps placeholder + Contact section
  - Floating WhatsApp Chat Now button
- **Colors**: Primary #F06421 (BoB Orange), Secondary #003366 (Navy Blue), BG #F8FAFC
- **Dependencies added**: fuse.js, framer-motion (existing), lucide-react (existing)
- **Key files**:
  - `src/data/services.ts` — 102 services with Odia translations
  - `src/contexts/LanguageContext.tsx` — EN/Odia language context
  - `src/pages/LandingPage.tsx` — main page assembly
  - `src/components/` — Header, HeroCarousel, ExpressRibbon, HowItWorks, ServiceEngine, AboutSection, FAQSection, Footer, WhatsAppFAB

### API Server (`artifacts/api-server`)
- **Type**: Express API, preview at `/api`
- **Purpose**: Shared backend for all artifacts

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
