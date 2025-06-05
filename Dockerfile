# Use official Node.js LTS image
FROM node:20-alpine

WORKDIR /app

# Copy backend files
COPY package*.json ./
COPY utils ./utils
COPY server.js ./

# Disable ytdl-core update checks (avoid network errors on startup)
ENV YTDL_NO_UPDATE=1

# Copy frontend static files (built assets)
COPY public ./public

RUN npm install --production

EXPOSE 4000

CMD ["node", "server.js"]
