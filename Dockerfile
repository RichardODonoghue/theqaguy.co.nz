FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Upgrade npm
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG REDIS_SERVER
ENV REDIS_SERVER=${REDIS_SERVER}

RUN npm run build

FROM node:23-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]