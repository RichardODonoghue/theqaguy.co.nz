FROM mcr.microsoft.com/playwright:latest AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npm run build

FROM mcr.microsoft.com/playwright:latest AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]