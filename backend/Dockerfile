# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./
EXPOSE 8000
CMD ["node", "index.js"]