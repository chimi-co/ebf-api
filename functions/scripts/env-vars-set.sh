#!/bin/bash

if [ $1 == "dev" ]; then
  firebase use development
  firebase functions:config:set env="$(cat .env.development.json)"
fi

if [ $1 == "prod" ]; then
  firebase use production
  firebase functions:config:set env="$(cat .env.production.json)"
fi
