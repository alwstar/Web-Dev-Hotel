FROM node:22.3.0-alpine as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM nginx:latest
COPY --from=build /app/src/dist/travel-web-app/browser /usr/share/nginx/html
RUN ls /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]