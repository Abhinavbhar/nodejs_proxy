#!/bin/bash
node /usr/share/nginx/backend/proxy.js &
node /usr/share/nginx/app/mainServer.js &
wait