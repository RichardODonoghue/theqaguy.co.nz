#!/usr/bin/env bash
set -e

# Run migrations if DATABASE_URL is present
if [ -n "${DATABASE_URL}" ]; then
  echo "Running Prisma migrations..."
  npx prisma migrate deploy || {
    echo "Prisma migrate failed; continuing without blocking startup."
  }
fi

exec "$@"