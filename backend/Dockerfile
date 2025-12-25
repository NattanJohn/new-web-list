# Backend - Express API
FROM node:18-alpine

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install --omit=dev

# Copia código
COPY . .

EXPOSE 3001
CMD ["npm", "start"]
