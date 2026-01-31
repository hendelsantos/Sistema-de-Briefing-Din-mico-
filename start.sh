#!/bin/sh
set -e

echo "🔄 Syncing database schema..."
npx prisma db push --accept-data-loss --skip-generate

echo "✅ Database schema synced successfully"
echo "🚀 Starting Next.js application..."
exec npm run start:prod
