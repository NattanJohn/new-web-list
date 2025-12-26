# Backend - Express API
# Com otimizações: caching, healthcheck
FROM node:18-alpine

WORKDIR /app

# Instala dependências com cache otimizado
COPY package*.json ./
RUN npm install --omit=dev --prefer-offline --no-audit

# Copia código (após npm install para aproveitar cache)
COPY . .

EXPOSE 3001

# Health check para orquestração
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/articles || exit 1

CMD ["npm", "start"]
