# ==========================================
# Etapa 1: Construcción (Node.js)
# Usamos Node 22 para cumplir con los requisitos de Vite
# ==========================================
FROM node:22-slim AS builder

# Instalamos actualizaciones de seguridad básicas
RUN apt-get update && apt-get upgrade -y

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos dependencias (npm ci es más robusto para Docker)
RUN npm ci

# Copiamos el resto del código
COPY . .

# Inyección de Secretos (Igual que antes)
ARG VITE_RAWG_API_KEY
ENV VITE_RAWG_API_KEY=$VITE_RAWG_API_KEY

# Ahora el build debería pasar sin problemas de versión
RUN npm run build

# ==========================================
# Etapa 2: Servidor de Producción (Nginx)
# ==========================================
FROM nginx:stable-alpine

# Actualizamos seguridad en el entorno final
RUN apk update && apk upgrade

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]