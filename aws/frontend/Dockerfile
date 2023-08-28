FROM public.ecr.aws/docker/library/node:18.17.1-bullseye-slim as base

ENV NODE_ENV production

ARG VERSION_CD
ARG SECRET_SENTRY_AUTH_TOKEN
ARG SENTRY_ENV_CD

ENV VERSION=$VERSION_CD
ENV SENTRY_AUTH_TOKEN=$SECRET_SENTRY_AUTH_TOKEN
ENV SENTRY_ORG=kyero
ENV SENTRY_PROJECT=new-frontend
ENV SENTRY_ENV=$SENTRY_ENV_CD

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

RUN npm install @sentry/cli -g --unsafe-perm
RUN npm run prod-frontend

CMD ["npm", "run", "start:frontend"]