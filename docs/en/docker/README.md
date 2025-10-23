# 🐳 Docker & Docker Compose - Complete Guide

## 📋 Table of Contents
- [Introduction](#introduction)
- [Docker Architecture](#docker-architecture)
- [Best Practices](#best-practices)
- [Advanced Docker Compose](#advanced-docker-compose)
- [Production Security](#production-security)
- [Performance and Optimization](#performance-and-optimization)
- [Monitoring and Debugging](#monitoring-and-debugging)
- [CI/CD with Docker](#cicd-with-docker)
- [Advanced Patterns](#advanced-patterns)
- [Advanced Snippets](#advanced-snippets)
- [Resources](#resources)

## 🚀 Introduction

Docker is a containerization platform that allows creating, deploying, and running applications in lightweight, portable containers. This documentation covers current best practices used by senior-level developers in the industry.

### New Docker 2024 Features

- **Docker Compose v2** : Performance improvements and new features
- **BuildKit** : Faster and more secure build engine
- **Docker Scout** : Integrated vulnerability scanner
- **Docker Desktop** : Improved user interface
- **Multi-platform builds** : Native support for ARM64 and AMD64

### Core Concepts

- **Container** : Runtime instance of a Docker image
- **Image** : Read-only template for creating containers
- **Dockerfile** : Script to build images
- **Registry** : Docker image repository (Docker Hub, ECR, GCR)
- **Volume** : Persistent storage for containers
- **Network** : Communication between containers

## 🏗️ Docker Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│           Application               │
├─────────────────────────────────────┤
│           Container                 │
├─────────────────────────────────────┤
│           Docker Engine             │
├─────────────────────────────────────┤
│           Host OS                   │
└─────────────────────────────────────┘
```

### Docker Components

```bash
# Component architecture
Docker Client (CLI)
    ↓
Docker Daemon (dockerd)
    ↓
Docker Registry
    ↓
Docker Images
    ↓
Docker Containers
```

## 🎯 Best Practices

### 1. Optimized Dockerfile with 2024 Best Practices

```dockerfile
# Multi-stage build for size optimization
FROM node:18-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy source code
COPY . .

# Build application
RUN yarn build

# Production stage
FROM node:18-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Install production dependencies only
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

# Copy built files
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Startup command
CMD ["node", "server.js"]
```

### 2. Optimized .dockerignore (2024)

```dockerignore
# Dependencies
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Builds
.next
out
dist
build

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Git
.git
.gitignore
README.md

# Docker
Dockerfile*
docker-compose*
.dockerignore
```

### 3. Advanced Docker Compose Configuration (2024)

```yaml
# docker-compose.yml
version: '3.9'

services:
  # Main application
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    container_name: myapp-prod
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    env_file:
      - .env.production
    ports:
      - "3000:3000"
    volumes:
      - app_data:/app/data
      - app_logs:/app/logs
    networks:
      - app-network
    depends_on:
      - postgres
      - redis
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s

  # PostgreSQL database
  postgres:
    image: postgres:15-alpine
    container_name: postgres-prod
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_INITDB_ARGS: "--encoding=UTF-8 --lc-collate=C --lc-ctype=C"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    networks:
      - app-network
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  # Redis for caching
  redis:
    image: redis:7-alpine
    container_name: redis-prod
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - app-network
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
    deploy:
      resources:
        limits:
          cpus: '0.25'
          memory: 256M
        reservations:
          cpus: '0.1'
          memory: 128M

  # Nginx reverse proxy
  nginx:
    image: nginx:alpine
    container_name: nginx-prod
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./ssl:/etc/nginx/ssl:ro
      - nginx_logs:/var/log/nginx
    networks:
      - app-network
    depends_on:
      - app
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Monitoring with Prometheus
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    networks:
      - app-network
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  # Grafana for visualization
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning
    networks:
      - app-network
    depends_on:
      - prometheus

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  app_data:
    driver: local
  app_logs:
    driver: local
  nginx_logs:
    driver: local
  prometheus_data:
    driver: local
  grafana_data:
    driver: local

networks:
  app-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

## 🐳 Advanced Docker Compose

### 1. Docker Compose Version Management

It is **crucial** to specify the Docker Compose version in your YAML files to ensure compatibility and stability. Here are the recommended versions:

```yaml
# Recommended version for 2024
version: '3.9'

# Currently supported versions:
# - 3.9 (recommended for production)
# - 3.8 (compatible with most features)
# - 3.7 (for older environments)
```

**Why specify version?**
- **Compatibility** : Ensures your configuration works with the installed Docker Compose version
- **Stability** : Avoids unexpected behaviors during updates
- **Features** : Access to specific features of each version
- **Production** : Guarantees reproducibility between environments

### 2. Multi-environment Configuration

```yaml
# docker-compose.override.yml (development)
version: '3.9'

services:
  app:
    build:
      target: development
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    command: yarn dev

  postgres:
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=myapp_dev
      - POSTGRES_USER=dev
      - POSTGRES_PASSWORD=dev

  redis:
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
```

```yaml
# docker-compose.prod.yml (production)
version: '3.9'

services:
  app:
    build:
      target: production
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  postgres:
    restart: unless-stopped
    environment:
      - POSTGRES_DB=myapp_prod
      - POSTGRES_USER=prod
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M

  redis:
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    deploy:
      resources:
        limits:
          cpus: '0.25'
          memory: 256M
```

### 2. Docker Swarm Stack

```yaml
# docker-stack.yml
version: '3.9'

services:
  app:
    image: myapp:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
        monitor: 60s
        max_failure_ratio: 0.3
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
      placement:
        constraints:
          - node.role == worker
          - node.labels.environment == production
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    networks:
      - app-network
    secrets:
      - db_password
      - redis_password

  postgres:
    image: postgres:15-alpine
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.role == manager
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: app
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    secrets:
      - db_password

  redis:
    image: redis:7-alpine
    deploy:
      replicas: 1
    command: redis-server --appendonly yes --requirepass-file /run/secrets/redis_password
    volumes:
      - redis_data:/data
    networks:
      - app-network
    secrets:
      - redis_password

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local

networks:
  app-network:
    driver: overlay
    attachable: true

secrets:
  db_password:
    external: true
  redis_password:
    external: true
```

## 🔒 Production Security

### 1. Secure Dockerfile

```dockerfile
# Secure Dockerfile
FROM node:18-alpine AS base

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Build stage
FROM base AS builder
WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies with security audit
RUN yarn install --frozen-lockfile --production=false && \
    yarn audit --level moderate

# Copy source code
COPY . .

# Build application
RUN yarn build

# Production stage
FROM base AS production

# Set secure environment variables
ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=1024" \
    NEXT_TELEMETRY_DISABLED=1

# Create working directory
WORKDIR /app

# Copy necessary files with correct permissions
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/yarn.lock ./

# Install production dependencies only
RUN yarn install --frozen-lockfile --production=true && \
    yarn cache clean && \
    rm -rf /tmp/* /var/cache/apk/*

# Copy built files
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Create necessary directories
RUN mkdir -p /app/logs /app/data && \
    chown -R nextjs:nodejs /app/logs /app/data

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Secure health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]

# Startup command
CMD ["node", "server.js"]
```

### 2. Security Configuration

```yaml
# docker-compose.security.yml
version: '3.9'

services:
  app:
    # Limit privileges
    privileged: false
    read_only: true
    tmpfs:
      - /tmp:noexec,nosuid,size=100m
      - /var/tmp:noexec,nosuid,size=100m
    
    # Limit system capabilities
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    
    # Limit resources
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
          pids: 100
        reservations:
          cpus: '0.5'
          memory: 512M
    
    # Secure environment variables
    environment:
      - NODE_ENV=production
      - NODE_OPTIONS=--max-old-space-size=1024
    env_file:
      - .env.production
    
    # Read-only volumes
    volumes:
      - app_data:/app/data:ro
      - app_logs:/app/logs:rw
```

### 3. Security Script

```bash
#!/bin/bash
# security-scan.sh

set -e

echo "🔍 Scanning Docker images for vulnerabilities..."

# Scan image with Trivy
trivy image --severity HIGH,CRITICAL myapp:latest

# Scan with Docker Scout
docker scout cves myapp:latest

# Check for secrets
detect-secrets scan --all-files

# Audit dependencies
yarn audit --level moderate

echo "✅ Security scan completed"
```

## ⚡ Performance and Optimization

### 1. Image Optimization

```dockerfile
# Performance-optimized Dockerfile
FROM node:18-alpine AS base

# Optimize layers
RUN apk add --no-cache --virtual .build-deps \
    python3 \
    make \
    g++ \
    && apk add --no-cache \
    dumb-init \
    curl

# Optimized build stage
FROM base AS builder
WORKDIR /app

# Dependency caching
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Build with optimizations
COPY . .
RUN yarn build && \
    yarn cache clean

# Minimal production stage
FROM node:18-alpine AS production

# Install only necessary dependencies
RUN apk add --no-cache dumb-init curl

# Create user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

WORKDIR /app

# Copy optimized files
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production=true && \
    yarn cache clean && \
    rm -rf /tmp/* /var/cache/apk/*

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# Optimized health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
```

### 2. Performance Configuration

```yaml
# docker-compose.performance.yml
version: '3.9'

services:
  app:
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '1.0'
          memory: 1G
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
        monitor: 60s
        max_failure_ratio: 0.3
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
    
    # Network optimizations
    sysctls:
      - net.core.somaxconn=65535
      - net.ipv4.tcp_max_syn_backlog=65535
    
    # Performance environment variables
    environment:
      - NODE_OPTIONS=--max-old-space-size=1536
      - UV_THREADPOOL_SIZE=16
      - NODE_ENV=production

  postgres:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    
    # PostgreSQL optimizations
    command: >
      postgres
      -c shared_buffers=256MB
      -c effective_cache_size=1GB
      -c maintenance_work_mem=64MB
      -c checkpoint_completion_target=0.9
      -c wal_buffers=16MB
      -c default_statistics_target=100
      -c random_page_cost=1.1
      -c effective_io_concurrency=200
      -c work_mem=4MB
      -c min_wal_size=1GB
      -c max_wal_size=4GB
      -c max_worker_processes=8
      -c max_parallel_workers_per_gather=4
      -c max_parallel_workers=8
      -c max_parallel_maintenance_workers=4

  redis:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    
    # Redis optimizations
    command: >
      redis-server
      --maxmemory 400mb
      --maxmemory-policy allkeys-lru
      --save 900 1
      --save 300 10
      --save 60 10000
      --appendonly yes
      --appendfsync everysec
      --tcp-keepalive 60
      --timeout 300
```

## 📊 Monitoring and Debugging

### 1. Monitoring Configuration

```yaml
# docker-compose.monitoring.yml
version: '3.9'

services:
  # Prometheus for metrics
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    networks:
      - monitoring
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
      - '--web.enable-admin-api'

  # Grafana for visualization
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
      - GF_USERS_ALLOW_SIGN_UP=false
      - GF_SECURITY_DISABLE_GRAVATAR=true
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning
    networks:
      - monitoring
    depends_on:
      - prometheus

  # Node Exporter for system metrics
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(syslost|proc|dev|host|etc)($$|/)'
    networks:
      - monitoring

  # cAdvisor for container metrics
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro
    privileged: true
    devices:
      - /dev/kmsg
    networks:
      - monitoring

  # Jaeger for distributed tracing
  jaeger:
    image: jaegertracing/all-in-one:latest
    container_name: jaeger
    restart: unless-stopped
    ports:
      - "16686:16686"
      - "14268:14268"
    environment:
      - COLLECTOR_OTLP_ENABLED=true
    networks:
      - monitoring

volumes:
  prometheus_data:
    driver: local
  grafana_data:
    driver: local

networks:
  monitoring:
    driver: bridge
```

### 2. Prometheus Configuration

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "rules/*.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  - job_name: 'app'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/api/metrics'
    scrape_interval: 5s

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']
```

### 3. Debug Scripts

```bash
#!/bin/bash
# debug-container.sh

CONTAINER_NAME=${1:-myapp-prod}

echo "🔍 Debugging container: $CONTAINER_NAME"

# Check container status
echo "📊 Container status:"
docker ps -f name=$CONTAINER_NAME

# Recent logs
echo "📝 Recent logs:"
docker logs --tail 100 $CONTAINER_NAME

# Resource usage
echo "💾 Resource usage:"
docker stats --no-stream $CONTAINER_NAME

# Detailed information
echo "ℹ️ Container info:"
docker inspect $CONTAINER_NAME | jq '.[0].State'

# Running processes
echo "🔄 Running processes:"
docker exec $CONTAINER_NAME ps aux

# Disk usage
echo "💿 Disk usage:"
docker exec $CONTAINER_NAME df -h

# Environment variables
echo "🌍 Environment variables:"
docker exec $CONTAINER_NAME env | sort

# Connectivity test
echo "🌐 Connectivity test:"
docker exec $CONTAINER_NAME curl -f http://localhost:3000/api/health || echo "Health check failed"
```

## 🚀 CI/CD with Docker

### 1. GitHub Actions

```yaml
# .github/workflows/docker.yml
name: Docker Build and Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          target: production

      - name: Security scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # Add deployment logic here
```

### 2. Deployment Script

```bash
#!/bin/bash
# deploy.sh

set -e

ENVIRONMENT=${1:-production}
IMAGE_TAG=${2:-latest}

echo "🚀 Deploying to $ENVIRONMENT with image tag: $IMAGE_TAG"

# Environment variables
export COMPOSE_PROJECT_NAME=myapp
export IMAGE_TAG=$IMAGE_TAG

# Database backup
if [ "$ENVIRONMENT" = "production" ]; then
    echo "📦 Creating database backup..."
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec postgres pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup_$(date +%Y%m%d_%H%M%S).sql
fi

# Pull new image
echo "⬇️ Pulling new image..."
docker-compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml pull

# Zero downtime deployment
echo "🔄 Deploying with zero downtime..."
docker-compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml up -d --no-deps app

# Wait for application to be ready
echo "⏳ Waiting for application to be ready..."
timeout 60 bash -c 'until curl -f http://localhost:3000/api/health; do sleep 2; done'

# Check application health
echo "🏥 Health check..."
if curl -f http://localhost:3000/api/health; then
    echo "✅ Deployment successful!"
    
    # Clean up old images
    echo "🧹 Cleaning up old images..."
    docker image prune -f
    
    # Restart other services if necessary
    docker-compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml restart nginx
else
    echo "❌ Deployment failed! Rolling back..."
    docker-compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml rollback app
    exit 1
fi
```

## 🎯 Advanced Patterns

### 1. Optimized Multi-stage Builds

```dockerfile
# Optimized multi-stage Dockerfile
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production stage
FROM base AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copy built files with correct permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Development Configuration

```yaml
# docker-compose.dev.yml
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true
    ports:
      - "3000:3000"
    command: yarn dev
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp_dev
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_dev_data:/data
    ports:
      - "6379:6379"

  # Development tools
  adminer:
    image: adminer:latest
    ports:
      - "8080:8080"
    depends_on:
      - postgres

  redis-commander:
    image: rediscommander/redis-commander:latest
    environment:
      REDIS_HOSTS: local:redis:6379
    ports:
      - "8081:8081"
    depends_on:
      - redis

volumes:
  postgres_dev_data:
  redis_dev_data:
```

## 💡 Advanced Snippets

### 1. Utility Scripts

```bash
#!/bin/bash
# docker-utils.sh

# Function to clean up Docker
cleanup_docker() {
    echo "🧹 Cleaning up Docker..."
    docker system prune -af
    docker volume prune -f
    docker network prune -f
    docker image prune -af
}

# Function to monitor containers
monitor_containers() {
    echo "📊 Monitoring containers..."
    watch -n 1 'docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.Size}}"'
}

# Function to backup volumes
backup_volumes() {
    local backup_dir="./backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    echo "📦 Backing up volumes..."
    
    # Backup PostgreSQL
    docker run --rm -v postgres_data:/data -v "$backup_dir":/backup alpine \
        tar czf /backup/postgres_data.tar.gz -C /data .
    
    # Backup Redis
    docker run --rm -v redis_data:/data -v "$backup_dir":/backup alpine \
        tar czf /backup/redis_data.tar.gz -C /data .
    
    echo "✅ Backup completed in $backup_dir"
}

# Function to restore volumes
restore_volumes() {
    local backup_dir=$1
    
    if [ -z "$backup_dir" ]; then
        echo "❌ Please provide backup directory"
        return 1
    fi
    
    echo "📥 Restoring volumes from $backup_dir..."
    
    # Restore PostgreSQL
    docker run --rm -v postgres_data:/data -v "$backup_dir":/backup alpine \
        tar xzf /backup/postgres_data.tar.gz -C /data
    
    # Restore Redis
    docker run --rm -v redis_data:/data -v "$backup_dir":/backup alpine \
        tar xzf /backup/redis_data.tar.gz -C /data
    
    echo "✅ Restore completed"
}

# Function to test connectivity
test_connectivity() {
    echo "🌐 Testing connectivity..."
    
    # Test application
    curl -f http://localhost:3000/api/health || echo "❌ App health check failed"
    
    # Test PostgreSQL
    docker exec postgres-prod pg_isready -U $POSTGRES_USER || echo "❌ PostgreSQL not ready"
    
    # Test Redis
    docker exec redis-prod redis-cli ping || echo "❌ Redis not ready"
}

# Main menu
case "$1" in
    cleanup)
        cleanup_docker
        ;;
    monitor)
        monitor_containers
        ;;
    backup)
        backup_volumes
        ;;
    restore)
        restore_volumes "$2"
        ;;
    test)
        test_connectivity
        ;;
    *)
        echo "Usage: $0 {cleanup|monitor|backup|restore|test}"
        echo "  cleanup  - Clean up Docker resources"
        echo "  monitor  - Monitor running containers"
        echo "  backup   - Backup volumes"
        echo "  restore  - Restore volumes from backup"
        echo "  test     - Test connectivity"
        ;;
esac
```

### 2. Optimized Nginx Configuration

```nginx
# nginx/nginx.conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 16M;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

    # Upstream
    upstream app {
        least_conn;
        server app:3000 max_fails=3 fail_timeout=30s;
        keepalive 32;
    }

    # Main server block
    server {
        listen 80;
        server_name localhost;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Referrer-Policy "strict-origin-when-cross-origin";

        # Health check
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # API routes with rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_connect_timeout 30s;
            proxy_send_timeout 30s;
            proxy_read_timeout 30s;
        }

        # Login endpoint with strict rate limiting
        location /api/auth/login {
            limit_req zone=login burst=5 nodelay;
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Static files
        location /static/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            proxy_pass http://app;
        }

        # Main application
        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

### 3. Advanced Monitoring Script

```bash
#!/bin/bash
# advanced-monitoring.sh

# Configuration
ALERT_EMAIL="admin@example.com"
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
THRESHOLD_CPU=80
THRESHOLD_MEMORY=85
THRESHOLD_DISK=90

# Function to send alerts
send_alert() {
    local message="$1"
    local severity="$2"
    
    # Email
    echo "$message" | mail -s "Docker Alert - $severity" "$ALERT_EMAIL"
    
    # Slack
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"🚨 Docker Alert ($severity): $message\"}" \
        "$SLACK_WEBHOOK"
}

# Function to check resources
check_resources() {
    echo "🔍 Checking resource usage..."
    
    # CPU
    local cpu_usage=$(docker stats --no-stream --format "table {{.CPUPerc}}" | tail -n +2 | sed 's/%//' | awk '{sum+=$1} END {print sum/NR}')
    if (( $(echo "$cpu_usage > $THRESHOLD_CPU" | bc -l) )); then
        send_alert "High CPU usage: ${cpu_usage}%" "WARNING"
    fi
    
    # Memory
    local mem_usage=$(docker stats --no-stream --format "table {{.MemPerc}}" | tail -n +2 | sed 's/%//' | awk '{sum+=$1} END {print sum/NR}')
    if (( $(echo "$mem_usage > $THRESHOLD_MEMORY" | bc -l) )); then
        send_alert "High memory usage: ${mem_usage}%" "WARNING"
    fi
    
    # Disk
    local disk_usage=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ "$disk_usage" -gt "$THRESHOLD_DISK" ]; then
        send_alert "High disk usage: ${disk_usage}%" "CRITICAL"
    fi
}

# Function to check container health
check_containers() {
    echo "🏥 Checking container health..."
    
    local unhealthy_containers=$(docker ps --filter "health=unhealthy" --format "{{.Names}}")
    if [ -n "$unhealthy_containers" ]; then
        send_alert "Unhealthy containers: $unhealthy_containers" "CRITICAL"
    fi
    
    local exited_containers=$(docker ps -a --filter "status=exited" --format "{{.Names}}")
    if [ -n "$exited_containers" ]; then
        send_alert "Exited containers: $exited_containers" "WARNING"
    fi
}

# Function to check error logs
check_logs() {
    echo "📝 Checking error logs..."
    
    local error_count=$(docker logs $(docker ps -q) 2>&1 | grep -i error | wc -l)
    if [ "$error_count" -gt 10 ]; then
        send_alert "High error count in logs: $error_count errors" "WARNING"
    fi
}

# Function to generate report
generate_report() {
    echo "📊 Generating monitoring report..."
    
    local report_file="monitoring_report_$(date +%Y%m%d_%H%M%S).txt"
    
    {
        echo "=== Docker Monitoring Report ==="
        echo "Date: $(date)"
        echo ""
        echo "=== Container Status ==="
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo ""
        echo "=== Resource Usage ==="
        docker stats --no-stream
        echo ""
        echo "=== Volume Usage ==="
        docker system df -v
        echo ""
        echo "=== Network Status ==="
        docker network ls
    } > "$report_file"
    
    echo "📄 Report saved to: $report_file"
}

# Main menu
case "$1" in
    resources)
        check_resources
        ;;
    containers)
        check_containers
        ;;
    logs)
        check_logs
        ;;
    report)
        generate_report
        ;;
    all)
        check_resources
        check_containers
        check_logs
        generate_report
        ;;
    *)
        echo "Usage: $0 {resources|containers|logs|report|all}"
        echo "  resources  - Check resource usage"
        echo "  containers - Check container health"
        echo "  logs       - Check error logs"
        echo "  report     - Generate monitoring report"
        echo "  all        - Run all checks"
        ;;
esac
```

## 📚 Resources

### Official documentation
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Swarm Documentation](https://docs.docker.com/engine/swarm/)

### Best practices
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Production Docker](https://docs.docker.com/config/containers/resource_constraints/)
- [Docker Security](https://docs.docker.com/engine/security/)

### Recommended tools
- [Trivy](https://trivy.dev/) - Vulnerability scanner
- [Docker Scout](https://docs.docker.com/scout/) - Image security
- [Prometheus](https://prometheus.io/) - Monitoring
- [Grafana](https://grafana.com/) - Visualization

### Patterns and architectures
- [12-Factor App](https://12factor.net/)
- [Microservices Patterns](https://microservices.io/)
- [Container Patterns](https://www.oreilly.com/library/view/container-patterns/9781492056280/)

---

*Last updated: January 2024*
