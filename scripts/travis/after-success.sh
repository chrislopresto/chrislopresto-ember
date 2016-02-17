#!/usr/bin/env bash
set -e
if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$EMBER_CHANNEL" == "default" ]; then
  echo "Deploying to production!"
  ember deploy production --verbose
else
  echo "Skipping deploy: not a commit on master"
fi
