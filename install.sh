#!/usr/bin/env bash

rm -rf node_modules bower_components dist tmp
ember install
git reset --hard HEAD
