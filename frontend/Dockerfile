# Frontend - Next.js 16 (Node 20.x requerido pelo Next 16)
# Com otimizações: gzip, brotli, caching headers
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --prefer-offline --no-audit

FROM deps AS build
WORKDIR /app
COPY . .
# Permite configurar a URL da API em build-time (fallback no compose)
ARG NEXT_PUBLIC_API_URL=http://backend:3001
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

# Receber ARG novamente neste stage
ARG NEXT_PUBLIC_API_URL=http://backend:3001
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Instalar gzip e brotli para compressão
RUN apk add --no-cache gzip brotli

COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.mjs ./next.config.mjs

RUN npm install --omit=dev --prefer-offline --no-audit

# Pre-compress assets estáticos
RUN find /app/public -type f \( -name "*.js" -o -name "*.css" -o -name "*.json" -o -name "*.svg" \) | while read f; do \
  gzip -9 -k "$f"; \
  brotli -9 -k "$f"; \
done

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"
CMD ["npm", "start"]
