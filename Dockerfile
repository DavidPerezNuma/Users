# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY server/package*.json ./
RUN npm install

# Stage 2: Runtime
FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY server ./

EXPOSE 3000
CMD ["npm", "run", "dev"]
