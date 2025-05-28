#!/bin/bash
echo Please input commit description
read commit_desc

cd ..
git add ./
git commit -m "$commit_desc"
git push

# Load nvm explicitly
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use desired Node version (adjust to match your .nvmrc or required version)
nvm use 21

# Now deploy using correct Node version
pm2 deploy ecosystem.json dev-api-assets
