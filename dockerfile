# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Build the NestJS application
RUN yarn run build

# Expose the port the app runs on
EXPOSE 3000

# Start the server using the production build
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]