#!/bin/bash
set -e

export KYERO_API_BASE_URL=http://localhost:3100

echo "E2E account app"

concurrently "npm run mocks-ci" "turbo run e2e --filter=@kyero/account" --kill-others --success first

echo "E2E frontend app"

turbo run e2e --filter=@kyero/frontend

echo "E2E join app"

turbo run e2e --filter=@kyero/join