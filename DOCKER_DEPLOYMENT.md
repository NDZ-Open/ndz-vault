# Docker Deployment Guide

## Overview

This application is configured for Docker deployment on Hetzner (or any Docker host). Votes are stored persistently in a JSON file that survives container restarts and redeployments.

## Prerequisites

- Docker and Docker Compose installed on your server
- Environment variables configured (see below)

## Environment Variables

Create a `.env` file in the project root:

```env
FLARUM_URL=https://ndz.ng
JWT_SECRET=your-secret-key-here
```

## Building and Running

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Using Docker directly

```bash
# Build the image
docker build -t ndz-vault .

# Run the container
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  -e FLARUM_URL=https://ndz.ng \
  -e JWT_SECRET=your-secret-key \
  -e DATA_DIR=/app/data \
  --name ndz-vault \
  --restart unless-stopped \
  ndz-vault
```

## Persistent Storage

Vote data is stored in `/data/votes.json` which is mounted as a Docker volume. This ensures:

- ✅ Votes persist across container restarts
- ✅ Votes persist across redeployments
- ✅ Data survives container recreation

The `./data` directory on your host is mounted to `/app/data` in the container.

## Health Check

The container includes a health check that verifies the app is running. Check status with:

```bash
docker-compose ps
```

## Updating the Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build
```

## Backup

To backup vote data:

```bash
# Copy the votes file
cp ./data/votes.json ./backups/votes-$(date +%Y%m%d).json
```

## Troubleshooting

### Check logs
```bash
docker-compose logs -f app
```

### Access container shell
```bash
docker-compose exec app sh
```

### Verify data directory
```bash
docker-compose exec app ls -la /app/data
```

