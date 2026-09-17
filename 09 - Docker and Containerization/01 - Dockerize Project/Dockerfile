# Use official Node.js lightweight alpine image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first to take advantage of Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 8080 to match the server port
EXPOSE 8080

# Run the node server
CMD ["npm", "start"]
    