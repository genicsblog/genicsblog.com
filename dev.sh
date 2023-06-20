#!/bin/sh

# This script removes the need for having docker to build the site locally.
# You can run it through "./dev.sh"

if [ ! -d ".theme" ]
then
  echo "No cached '.theme' directory found. Fetching the latest theme files..."
  git clone https://github.com/genicsblog/theme-files .theme -q
  rm -rf .theme/.git
fi

rsync -r --exclude '.theme' . .theme/
cd .theme

if [ ! -d "node_modules" ]
then
  echo "Installing node dependencies..."
  npm i --silent
fi

if [ ! -d "vendor" ]
then
  echo "Installing gem dependencies..."
  bundle config set --local path 'vendor'
  bundle install --quiet
fi

bundle exec jekyll serve
