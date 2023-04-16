#!/usr/bin/env sh

set -e

npm run build

cd docs/.vuepress/dist

git init
git config user.name 'AiXueXiDeYu'
git config user.email '2458002563@qq.com'
git add -A
git commit -m 'deploy'

git push -f git@github.com:AiXueXiDeYu/blog.git master:gh-pages

cd -