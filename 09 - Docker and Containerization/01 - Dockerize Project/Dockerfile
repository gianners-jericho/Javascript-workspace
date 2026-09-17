# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package configuration files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all application code
COPY . .

# Expose port 8080 to match assignment requirements
EXPOSE 8080

# Command to launch the server when the container starts
CMD ["npm", "start"]