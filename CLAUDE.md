# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server on port 3030
npm run build        # Build for production
npm run start        # Start production server

# Code quality
npm run lint         # Run Biome linter
npm run format       # Format code with Biome

# GitHub stats sync (writes to Redis)
npm run sync:github  # Sync GitHub stats to Redis cache

# Docker
npm run build:docker # Build Docker image
npm run start:docker # Run container (requires .env.local)
```

## Architecture

This is a Next.js 16 personal portfolio site using the App Router with React Server Components.

### Data Flow

GitHub stats are fetched via a standalone sync script (`scripts/sync-github-stats.ts`) that writes to Redis. The Next.js app reads from Redis cache using `lib/github-cache.ts` with dynamic rendering (via `connection()` from next/server). Blog posts are fetched from Dev.to API with 1-hour revalidation.

### Key Files

- `lib/redis.ts` - Redis client (ioredis) with connection handling
- `lib/github-cache.ts` - Read/write cached stats from Redis
- `lib/github-api.ts` - GitHub API wrapper with rate limiting (Bottleneck)
- `lib/github-stats.ts` - Stats types and mock data fallback
- `lib/devto.ts` - Dev.to API for blog posts
- `lib/skills.ts` - Static skills data with Tailwind color mappings

### Components

Main page sections are in `/components`: hero, about, employment, projects, blog, github-stats, starred-repos, navbar. UI primitives from shadcn/ui are in `/components/ui`.

### Environment Variables

Required in `.env.local`:
- `GITHUB_TOKEN` - GitHub personal access token
- `GITHUB_USERNAME` - GitHub username for stats
- `GITHUB_ORGS` - Comma-separated org names (optional)
- `REDIS_URI` - Redis connection string (default: redis://localhost:6379)

### Docker Deployment

Uses multi-stage build with Overmind process manager. Procfile runs both Next.js app and periodic GitHub sync script.
