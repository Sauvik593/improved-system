#!/bin/bash
set -e

echo "Making a production build with source maps"

NODE_ENV=production npm run build:remix:prod && npm run build:css

echo "Setup sentry release..."

sentry-cli releases set-commits "$VERSION" --commit "Kyero/clients@${VERSION}" --org=kyero --project=new-frontend --auth-token=$SENTRY_AUTH_TOKEN

echo "Uploading sourcemaps to Sentry..."

sentry-cli releases files "$VERSION" upload-sourcemaps ./public --url-prefix '~/new-frontend-assets' --strip-common-prefix
sentry-cli releases files "$VERSION" upload-sourcemaps ./build 

echo "Removing sourcemaps from build folder..."

rm ./public/**/*.map
rm ./build/*.map

echo "Deploying release to Sentry..."

sentry-cli releases deploys $VERSION new -e $SENTRY_ENV

echo "Done!"