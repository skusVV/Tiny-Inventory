#!/bin/sh
set -e

echo "Running database seed..."
npm run db:seed

echo "Starting application..."
exec node dist/main.js

