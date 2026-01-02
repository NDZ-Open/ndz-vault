# Voting Storage Solution

## Current Implementation

The voting system uses file-based storage (`/data/votes.json`) which works on traditional servers but **will NOT persist on serverless platforms like Netlify** because:

- Serverless functions have read-only filesystems (except `/tmp` which is ephemeral)
- Files written during function execution are lost after the function completes
- Each deployment creates a fresh filesystem

## Solutions for Production

### Option 1: Use a Database (Recommended)
- **Supabase** (PostgreSQL) - Free tier available
- **PlanetScale** (MySQL) - Free tier available  
- **MongoDB Atlas** - Free tier available
- **Railway** - Simple PostgreSQL hosting

### Option 2: Use External JSON Storage
- **JSONBin.io** - Free tier: 10,000 requests/month
- **Firebase Realtime Database** - Free tier available
- **Upstash Redis** - Serverless Redis, free tier available

### Option 3: Use Netlify Functions with External Storage
- Store votes in Netlify's environment variables (limited)
- Use Netlify's KV store (if available)
- Use a third-party API

## Migration Path

When you're ready to migrate to a database:

1. Update `/src/routes/api/vote/+server.ts` to use database instead of file system
2. Keep the same API interface (POST/GET endpoints)
3. Frontend code won't need changes

## Current File Structure

```
/data/
  votes.json  # Stores vote counts per resource
```

The file is gitignored to prevent committing vote data, but the directory structure is preserved with `.gitkeep`.

