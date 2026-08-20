# AGENTS.md

## Quick Start

```bash
npm run dev        # dev server on port 3030 (not 3000)
npm run build      # production build
npm start          # start production server

npm run lint       # biome check
npm run format     # biome format --write
```

## Docker

```bash
npm run build:docker     # build image
npm run start:docker     # run (requires .env.local, maps 3000:3000)
```

Multi-stage Dockerfile. Runtime uses Overmind (built from source in Stage 1) to run Next.js + periodic `sync-github-stats` via the Procfile. CI pushes to GHCR (`.github/workflows/docker-publish.yml`).

## Architecture

Next.js 16 (App Router, React Server Components) + Tailwind CSS v4 + shadcn/ui. TypeScript strict mode with `@/*` path alias (maps to root).

**GitHub stats**: must run `npm run sync:github` (runs `tsx scripts/sync-github-stats.ts`) to write stats to Redis before data appears. Flow: `lib/github-api.ts` (rate-limited via Bottleneck) → Redis (`lib/redis.ts`) → `lib/github-cache.ts` (read with `dynamic()` from next/server) → `lib/github-stats.ts` (types + mock fallback).

**Blog**: fetched from Dev.to API with 1-hour revalidation via `lib/devto.ts`.

**OG images**: each section in `app/api/og/` has a route using `@vercel/og`.

## Environment

Required in `.env.local`: `GITHUB_TOKEN`, `GITHUB_USERNAME`. Optional: `GITHUB_ORGS`, `REDIS_URI` (default `redis://localhost:6379`).

## Structure

- `app/` — page layout (`app/page.tsx`, `app/layout.tsx`) + OG image API routes
- `components/` — page sections (hero, about, employment, projects, blog, github-stats, starred-repos, navbar, contact, skill-badges, theme-toggle) + shadcn/ui primitives in `components/ui/`
- `lib/` — `github-api.ts`, `github-cache.ts`, `github-stats.ts`, `redis.ts`, `devto.ts`, `skills.ts`, `utils.ts`, `get-strict-context.tsx`
- `scripts/` — `sync-github-stats.ts`, `run-sync.sh`
- `portfolio-video/` — separate HyperFrames project (see `portfolio-video/AGENTS.md`)

## Code Style

Biome: 2-space indent, `source.organizeImports` **off**, `noUnknownAtRules` disabled for Tailwind.
