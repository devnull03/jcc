cd build

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:<user>/<repo>.git main:build
