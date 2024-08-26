#!/bin/bash

if [ $1 == "dev" ]; then
  firebase use development
  firebase functions:config:get env > .env.development.json
fi

if [ $1 == "prod" ]; then
  firebase use production
  firebase functions:config:get env > .env.production.json
fi
