FROM public.ecr.aws/docker/library/node:16.16.0-bullseye-slim as base

ENV NODE_ENV production

# add turborepo
RUN npm install --global turbo

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY  ["package-lock.json", "package.json", "./"]  /usr/src/app/

# Copy source files
COPY . /usr/src/app

# Install app dependencies
RUN npm --production=false install

# Ports
# 3000 - frontend(remix)
# 8002 - hot reloading
EXPOSE 3000

RUN npm run build:frontend

CMD ["npm", "run", "start:frontend"]