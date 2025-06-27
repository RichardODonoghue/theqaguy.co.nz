FROM node:23.8.0-alpine AS builder

# TODO: uncomment once prisma set up
# RUN apk add --no-cache openssl

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG REDIS_SERVER
ENV REDIS_SERVER=${REDIS_SERVER}

# TODO: uncomment once prisma set up
# RUN npx prisma generate --schema=./prisma/schema.prisma

# RUN npx prisma db push

RUN npm run build

FROM node:23.8.0-alpine AS runner

# Install openssl to fix Prisma's dependency on it
# TODO: uncomment once prisma set up
# RUN apk add --no-cache openssl

# Set the working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]