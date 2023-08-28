#!/bin/bash
set -e

apt-get update && apt-get upgrade -y && apt-get install -y git ssh

# Load SSH key
mkdir -p ~/.ssh
echo "${SSH_PRIVATE_KEY}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

REMOTE_REPOSITORY='git@github.com:Kyero/clients.git'

git remote -v
ssh -o StrictHostKeyChecking=no -T git@github.com || true
git fetch --unshallow || true
git status
git config --global user.email 'kyero.dev@kyero.com'
git config --global user.name 'Kyero McDev'
git push -f "${REMOTE_REPOSITORY}" "${CI_COMMIT_ID}:staging-frontend"
git push -f "${REMOTE_REPOSITORY}" "${CI_COMMIT_ID}:production-frontend"