# Build stage
FROM node:18 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build app
COPY . .
# Modificar el comando de build para asegurar que use la configuración de producción
RUN npm run build -- --configuration=production

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copiar los archivos de la aplicación - Actualizar esta ruta
COPY --from=build /app/dist/angular-erp/browser/* .
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV PORT=80
EXPOSE ${PORT}

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
