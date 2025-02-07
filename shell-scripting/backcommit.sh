#!/bin/bash
if [ -z "$1" ]; then
   echo "Usage: backcommit <YYYY-MM-DD HH:MM:SS>"
   exit 1
fi

BACKDATE="$1"

git add .
GIT_COMMITTER_DATE="$BACKDATE" git commit --amend --no-edit --date "$BACKDATE"
git push origin main --force
 
#-z flag check where $1 is empty or not


