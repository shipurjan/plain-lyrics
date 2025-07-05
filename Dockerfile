FROM node:22.17.0-alpine3.22 AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@10.12.4
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false
RUN pnpm store prune \
    && rm -rf /root/.pnpm-store /root/.npm /tmp/* /var/tmp/*

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build
RUN pnpm run lint
RUN pnpm run lint:types
RUN pnpm store prune \
    && rm -rf /root/.pnpm-store /root/.npm /tmp/* /var/tmp/* .next/cache /app/.next/cache

FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["pnpm", "dev"]
