# Use official Node.js image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose port 5050 inside the container (optional but good practice)
EXPOSE 5050

# Default command to run your backend
CMD ["node", "server.js"]