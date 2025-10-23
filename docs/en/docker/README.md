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

Docker is a containerization platform that allows you to create, deploy, and run applications in lightweight, portable containers. This documentation covers current best practices used by senior-level developers in the industry.

### New Docker Features 2024

- **Docker Compose v2**: Improved performance and new features
- **BuildKit**: Faster and more secure build engine
- **Docker Scout**: Integrated vulnerability scanner
- **Docker Desktop**: Enhanced user interface
- **Multi-platform builds**: Native support for ARM64 and AMD64

### Fundamental Concepts

- **Container**: Runtime instance of a Docker image
- **Image**: Read-only template for creating containers
- **Dockerfile**: Script to build images
- **Registry**: Docker image repository (Docker Hub, ECR, GCR)
- **Volume**: Persistent storage for containers
- **Network**: Communication between containers

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

| Component | Description | Function |
|-----------|-------------|----------|
| **Docker Engine** | Core containerization engine | Manages containers and images |
| **Docker CLI** | Command-line interface | User interaction with Docker |
| **Docker API** | RESTful API | Programmatic access to Docker |
| **Docker Registry** | Image storage system | Stores and distributes images |
| **Docker Compose** | Multi-container orchestration | Defines and runs multi-container applications |

## 🚀 Best Practices

### Dockerfile Best Practices

#### 1. Use Multi-stage Builds

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

#### 2. Optimize Layer Caching

```dockerfile
# Bad: Changes in any file invalidate cache
COPY . .
RUN npm install

# Good: Separate dependency installation
COPY package*.json ./
RUN npm ci --only=production
COPY . .
```

#### 3. Use Specific Base Images

```dockerfile
# Bad: Uses latest tag
FROM node:latest

# Good: Uses specific version
FROM node:18.17.0-alpine
```

#### 4. Minimize Image Size

```dockerfile
# Use Alpine Linux for smaller images
FROM node:18-alpine

# Remove unnecessary packages
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    python3 \
    make \
    && npm install \
    && apk del .build-deps

# Clean up
RUN rm -rf /tmp/* /var/cache/apk/*
```

#### 5. Security Best Practices

```dockerfile
# Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Use specific versions and scan for vulnerabilities
FROM node:18.17.0-alpine@sha256:abc123...

# Set proper permissions
RUN chown -R nextjs:nodejs /app
```

### Docker Compose Best Practices

#### 1. Environment Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

#### 2. Network Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    networks:
      - frontend-network

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    networks:
      - backend-network
      - frontend-network

  db:
    image: postgres:15-alpine
    networks:
      - backend-network

networks:
  frontend-network:
    driver: bridge
  backend-network:
    driver: bridge
```

## 🐳 Advanced Docker Compose

### Multi-environment Setup

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    environment:
      - NODE_ENV=${NODE_ENV:-development}
    env_file:
      - .env.${NODE_ENV:-development}
    ports:
      - "${APP_PORT:-3000}:3000"
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "${DB_PORT:-5432}:5432"

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    ports:
      - "${REDIS_PORT:-6379}:6379"

volumes:
  postgres_data:
  redis_data:
```

### Health Checks

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: postgres:15-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Resource Limits

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  db:
    image: postgres:15-alpine
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## 🔒 Production Security

### Security Best Practices

#### 1. Use Non-root Users

```dockerfile
# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Switch to non-root user
USER nextjs
```

#### 2. Scan for Vulnerabilities

```bash
# Scan image for vulnerabilities
docker scout quickview node:18-alpine

# Scan with detailed report
docker scout cves node:18-alpine

# Scan local image
docker scout quickview my-app:latest
```

#### 3. Use Secrets Management

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    secrets:
      - db_password
      - api_key
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password
      - API_KEY_FILE=/run/secrets/api_key

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    file: ./secrets/api_key.txt
```

#### 4. Network Security

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    networks:
      - frontend-network
      - backend-network

  db:
    image: postgres:15-alpine
    networks:
      - backend-network
    # No external access

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    networks:
      - frontend-network

networks:
  frontend-network:
    driver: bridge
  backend-network:
    driver: bridge
    internal: true
```

## ⚡ Performance and Optimization

### Build Optimization

#### 1. Use BuildKit

```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1

# Build with BuildKit
docker build --progress=plain -t my-app .
```

#### 2. Multi-stage Builds

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
EXPOSE 3000
CMD ["npm", "start"]
```

#### 3. Layer Optimization

```dockerfile
# Bad: Multiple RUN commands
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
RUN apt-get clean

# Good: Single RUN command
RUN apt-get update && \
    apt-get install -y curl git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### Runtime Optimization

#### 1. Resource Limits

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

#### 2. Volume Optimization

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    volumes:
      - ./app:/app
      - /app/node_modules  # Anonymous volume for node_modules
      - app_cache:/app/.cache

volumes:
  app_cache:
    driver: local
```

## 📊 Monitoring and Debugging

### Logging Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  db:
    image: postgres:15-alpine
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Health Monitoring

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: postgres:15-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Debugging Tools

```bash
# View container logs
docker logs -f container_name

# Execute commands in running container
docker exec -it container_name /bin/sh

# Inspect container
docker inspect container_name

# View container stats
docker stats container_name
```

## 🔄 CI/CD with Docker

### GitHub Actions Example

```yaml
# .github/workflows/docker.yml
name: Docker Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: |
          my-app:latest
          my-app:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
```

### Dockerfile for CI/CD

```dockerfile
# Multi-stage build for CI/CD
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS deps
RUN npm ci --only=production

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM base AS production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎯 Advanced Patterns

### Microservices Architecture

```yaml
# docker-compose.yml
version: '3.8'

services:
  # API Gateway
  gateway:
    build: ./gateway
    ports:
      - "80:80"
    depends_on:
      - auth-service
      - user-service
      - product-service

  # Authentication Service
  auth-service:
    build: ./auth-service
    environment:
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - auth-db

  # User Service
  user-service:
    build: ./user-service
    environment:
      - DB_HOST=user-db
    depends_on:
      - user-db

  # Product Service
  product-service:
    build: ./product-service
    environment:
      - DB_HOST=product-db
    depends_on:
      - product-db

  # Databases
  auth-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: auth
      POSTGRES_USER: auth_user
      POSTGRES_PASSWORD: ${AUTH_DB_PASSWORD}
    volumes:
      - auth_data:/var/lib/postgresql/data

  user-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: users
      POSTGRES_USER: user_user
      POSTGRES_PASSWORD: ${USER_DB_PASSWORD}
    volumes:
      - user_data:/var/lib/postgresql/data

  product-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: products
      POSTGRES_USER: product_user
      POSTGRES_PASSWORD: ${PRODUCT_DB_PASSWORD}
    volumes:
      - product_data:/var/lib/postgresql/data

volumes:
  auth_data:
  user_data:
  product_data:
```

### Development Environment

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  app:
    build: .
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    ports:
      - "3000:3000"
    command: npm run dev

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: dev_db
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_dev_data:/data

volumes:
  postgres_dev_data:
  redis_dev_data:
```

## 📚 Resources

### Official Documentation
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)

### Best Practices
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [Docker Performance Best Practices](https://docs.docker.com/config/containers/resource_constraints/)

### Tools and Extensions
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Docker Scout](https://docs.docker.com/scout/)
- [Docker Buildx](https://docs.docker.com/build/buildx/)

---

*Last updated: January 2024*