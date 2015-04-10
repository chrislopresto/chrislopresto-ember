#!/usr/bin/env bash

rm -rf node_modules bower_components dist tmp
npm install && bower install
git reset --hard HEAD
