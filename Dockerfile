FROM mcr.microsoft.com/playwright:v1.53.1-noble AS builder

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
# Scope env to this RUN so dev deps are installed, without global deprecation warning
RUN npm_config_production=false npm ci

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build

# Trim for runtime
RUN npm prune --omit=dev


FROM mcr.microsoft.com/playwright:v1.53.1-noble AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]