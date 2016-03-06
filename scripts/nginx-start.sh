#!/bin/bash
if [ -z "$NODE_ENV" ]; then
  echo "NODE_ENV not set. Should be set to 'dev' in development environment."
  exit 1
fi
if [ "$NODE_ENV" = "dev" ]; then
  CONFIGDIR=$( cd $(dirname $0)/../config/nginx ; pwd -P )
  sudo nginx -c "$CONFIGDIR/nginx.dev.conf"
fi
