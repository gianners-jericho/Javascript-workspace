FROM node:20-alpine
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY package*.json ./
RUN npm install
RUN npm install nodemon -g
COPY . .
EXPOSE 8080
CMD {"npm", "start"}