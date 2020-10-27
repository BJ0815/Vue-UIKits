# Start with fully-featured Node.js base image
FROM node:14.4.0

# USER node
WORKDIR /home/node/app

# Copy dependency information and install all dependencies
COPY package.json package-lock.json ./

RUN npm ci

# Copy source code (and all other relevant files)
COPY . .

EXPOSE 6006
# Build code
# RUN npm run build-storybook
CMD [ "npm", "run", "storybook"]
