#!/usr/bin/env sh

cd server
exec yarn start &
cd ../client
exec yarn start
