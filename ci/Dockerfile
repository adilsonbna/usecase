# Use Node.js LTS as base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install
RUN npm install prom-client

# Copy the application files
COPY . .

# Expose the necessary ports
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
