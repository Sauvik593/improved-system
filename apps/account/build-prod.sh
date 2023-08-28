#!/bin/bash

echo "Making a production build with source maps"

npm run build:remix:prod && npm run build:css

echo "Setup sentry release..."

sentry-cli releases set-commits "$VERSION" --auto

echo "Uploading sourcemaps to Sentry..."

sentry-upload-sourcemaps

echo "Removing sourcemaps from build folder..."
rm ./public/**/*.map
rm ./build/**/*.map

echo "Done!"