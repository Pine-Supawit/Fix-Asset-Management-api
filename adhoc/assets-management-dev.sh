#!/bin/bash
echo Please input commit description
read commit_desc
cd ..
git add ./ 
git commit -m "$commit_desc"
git push
pm2 deploy ecosystem.json dev-api-assets
