#!/bin/sh
echo "Running ember-try for channel: ${EMBER_CHANNEL}"
cp -f "./config/ember-try-${EMBER_CHANNEL}.js" ./config/ember-try.js
ember try:testall
EXIT_CODE=$?
rm ./config/ember-try.js
exit ${EXIT_CODE}
