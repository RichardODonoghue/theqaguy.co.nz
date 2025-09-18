FROM mcr.microsoft.com/playwright:v1.53.1-noble AS builder

WORKDIR /app

# Build stage needs dev deps (Tailwind/PostCSS/TypeScript)
ENV NODE_ENV=development
ENV NPM_CONFIG_PRODUCTION=false

COPY package*.json ./
RUN npm ci

# Copy source after deps to leverage cache
COPY . .

# Only codegen that doesn't need DB credentials
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build Next.js
RUN npm run build

# Slim node_modules for runtime
RUN npm prune --omit=dev


FROM mcr.microsoft.com/playwright:v1.53.1-noble AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

# Optional: run DB migrations at startup (uses runtime env DATABASE_URL)
# see entrypoint script below
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]