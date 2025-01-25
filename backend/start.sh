#!/bin/sh
node proxy.js &
node mainServer.js &
wait