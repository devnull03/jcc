cd build

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:devnull03/jcc.git main:build
