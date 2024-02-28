# Stage 1: Building the app
FROM node:18-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code
COPY . .

# Build your Next.js app
RUN yarn build

# Stage 2: Run the app in production mode
FROM node:18-alpine as runner

# Set the working directory in the container
WORKDIR /app

# Copy the build artifacts from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["yarn", "start"]

