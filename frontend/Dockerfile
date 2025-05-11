# client/Dockerfile

FROM node:20 as build

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
