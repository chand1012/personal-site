# =============================================================================
# Stage 1: Build Overmind from source
# =============================================================================
FROM golang:1.23-alpine AS overmind-builder

RUN apk add --no-cache git

WORKDIR /build

# Clone and build overmind
RUN git clone --depth 1 https://github.com/DarthSim/overmind.git . && \
    go build -o overmind .

# =============================================================================
# Stage 2: Build Next.js application
# =============================================================================
FROM node:24-alpine AS app-builder

WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# =============================================================================
# Stage 3: Runtime container
# =============================================================================
FROM node:24-alpine AS runtime

# Install tmux (required by overmind) and bash
RUN apk add --no-cache tmux bash

WORKDIR /app

# Copy overmind binary from builder
COPY --from=overmind-builder /build/overmind /usr/local/bin/overmind

# Copy package files and install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Install tsx globally for running the sync script
RUN npm install -g tsx

# Copy built Next.js application
COPY --from=app-builder /app/.next ./.next
COPY --from=app-builder /app/public ./public

# Copy Next.js config
COPY next.config.mjs ./

# Copy Procfile for overmind
COPY Procfile ./

# Copy sync scripts (including TypeScript source)
COPY scripts ./scripts
RUN chmod +x ./scripts/*.sh

# Create a non-root user for security with a valid shell
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs -s /bin/bash -h /app

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose Next.js port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Sync endpoint should point to localhost since both run in same container
ENV SYNC_ENDPOINT_URL=http://localhost:3000
# Redis connection (override in production)
ENV REDIS_URI=redis://localhost:6379

# Start both processes with overmind
CMD ["overmind", "start"]
