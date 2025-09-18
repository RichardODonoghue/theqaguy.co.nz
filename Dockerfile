FROM mcr.microsoft.com/playwright:v1.53.1-noble AS builder

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm ci

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npx prisma db push

RUN npm run build

RUN npm prune --omit=dev

FROM mcr.microsoft.com/playwright:v1.53.1-noble AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]