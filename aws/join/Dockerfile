FROM public.ecr.aws/docker/library/node:16.16.0-bullseye-slim as base

ENV NODE_ENV production

ARG NEXT_PUBLIC_STRAPI_API_URL_CD 
ARG STRAPI_TOKEN_CD
ARG NEXT_PUBLIC_STRAPI_MEDIA_URL_CD 
ARG NEXT_PUBLIC_IMAGE_RESIZER_URL_CD
ARG NEXT_PUBLIC_BASE_URL_CD

ENV NEXT_PUBLIC_STRAPI_API_URL=$NEXT_PUBLIC_STRAPI_API_URL_CD
ENV STRAPI_TOKEN=$STRAPI_TOKEN_CD
ENV NEXT_PUBLIC_STRAPI_MEDIA_URL=$NEXT_PUBLIC_STRAPI_MEDIA_URL_CD
ENV NEXT_PUBLIC_IMAGE_RESIZER_URL=$NEXT_PUBLIC_IMAGE_RESIZER_URL_CD
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL_CD

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
# 3000 - join
EXPOSE 3000

RUN npm run build:join 

CMD ["npm", "run", "start:join"]
