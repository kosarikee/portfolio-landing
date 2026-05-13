# ============================================================
# Dockerfile — Next.js 16 production build (multi-stage)
# ============================================================

# ---------- Stage 1: Install ALL dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm ci --only=production --ignore-scripts && \
    cp -r node_modules /tmp/node_modules_prod && \
    npm ci --ignore-scripts

# ---------- Stage 2: Build application ----------
FROM node:20-alpine AS builder
WORKDIR /opt/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=deps /opt/app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# ---------- Stage 3: Production runner ----------
FROM node:20-alpine AS runner
WORKDIR /opt/app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Add non-root user for security
RUN addgroup --system --gid 1001 nextjs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output (Next.js 16 creates a subdirectory with package name)
COPY --from=builder /opt/app/.next/standalone ./

# Copy static assets for the standalone server
RUN cp -r .next/standalone/portfolio-landing/.next/static .next/static 2>/dev/null || true

# Copy public assets
COPY --from=builder /opt/app/public ./portfolio-landing/public

# Ensure correct ownership
RUN chown -R nextjs:nextjs /opt/app

USER nextjs

EXPOSE 3000

# server.js is inside the portfolio-landing subdirectory
CMD ["node", "portfolio-landing/server.js"]
