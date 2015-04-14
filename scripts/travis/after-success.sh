#!/usr/bin/env bash
set -e
if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo "Deploying to production!"
  ember deploy --environment=production
  REVISION="$(ember deploy:list --environment production | grep '^1) chrislopresto' | sed 's/^1) //' | sed 's/\\s+$//')"
  ember deploy:activate --environment=production --revision $REVISION
else
  echo "Skipping deploy: not a commit on master"
fi
