FROM node:24.21.0-alpine3.24
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY package*.json ./
RUN npm install
ENV PATH=/var/www/app/node_modules/.bin:$PATH
RUN mkdir -p /var/www/app/src
WORKDIR /var/www/app/src
COPY src .