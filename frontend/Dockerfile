# 1. Stage de Dependências
FROM node:20-alpine AS deps
WORKDIR /app

# Instala dependências necessárias para builds nativos (se houver)
RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm install --prefer-offline --no-audit

# 2. Stage de Build
FROM node:20-alpine AS build
WORKDIR /app

# Copia as dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# DEFINIÇÃO DA URL DA API NO MOMENTO DO BUILD (Crucial para Next.js)
ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Desabilita telemetria para build mais rápido
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# 3. Stage de Execução (Runner)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Repetir o ARG/ENV para garantir que esteja disponível em runtime
ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Instalar utilitários para compressão e healthcheck
RUN apk add --no-cache gzip brotli curl

# Copia apenas o necessário do build anterior
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.mjs ./next.config.mjs

# Instala apenas dependências de produção
RUN npm install --omit=dev --prefer-offline --no-audit

# Otimização de Assets (Pre-compressão)
RUN find /app/public -type f \( -name "*.js" -o -name "*.css" -o -name "*.json" -o -name "*.svg" \) | while read f; do \
    gzip -9 -k "$f" && \
    brotli -9 -k "$f" || true; \
done

EXPOSE 3000

# Healthcheck aprimorado usando curl
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["npm", "start"]