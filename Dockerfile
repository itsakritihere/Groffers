# Stage 1: build the app
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=""
ARG VITE_CART_STORAGE_KEY="zada-cart"
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CART_STORAGE_KEY=$VITE_CART_STORAGE_KEY
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
