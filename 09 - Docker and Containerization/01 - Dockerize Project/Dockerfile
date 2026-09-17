FROM node:24.21.0-alpine3.24
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY . .
RUN npm i
RUN npm i nodemon
EXPOSE 4000
CMD ["npx", "nodemon", "server.js"]