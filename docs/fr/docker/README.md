# 🐳 Docker & Docker Compose - Guide Complet

## 📋 Table des matières
- [Introduction](#introduction)
- [Architecture Docker](#architecture-docker)
- [Meilleures pratiques](#meilleures-pratiques)
- [Docker Compose avancé](#docker-compose-avancé)
- [Sécurité en production](#sécurité-en-production)
- [Performance et optimisation](#performance-et-optimisation)
- [Monitoring et debugging](#monitoring-et-debugging)
- [CI/CD avec Docker](#cicd-avec-docker)
- [Patterns avancés](#patterns-avancés)
- [Snippets avancés](#snippets-avancés)
- [Ressources](#ressources)

## 🚀 Introduction

Docker est une plateforme de conteneurisation qui permet de créer, déployer et exécuter des applications dans des conteneurs légers et portables. Cette documentation couvre les meilleures pratiques actuelles utilisées par les développeurs de niveau senior dans l'industrie.

### Nouvelles fonctionnalités Docker 2024

- **Docker Compose v2** : Amélioration des performances et nouvelles fonctionnalités
- **BuildKit** : Moteur de build plus rapide et sécurisé
- **Docker Scout** : Scanner de vulnérabilités intégré
- **Docker Desktop** : Interface utilisateur améliorée
- **Multi-platform builds** : Support natif pour ARM64 et AMD64

### Concepts fondamentaux

- **Conteneur** : Instance d'exécution d'une image Docker
- **Image** : Template en lecture seule pour créer des conteneurs
- **Dockerfile** : Script pour construire des images
- **Registry** : Dépôt d'images Docker (Docker Hub, ECR, GCR)
- **Volume** : Stockage persistant pour les conteneurs
- **Network** : Communication entre conteneurs

## 🏗️ Architecture Docker

### Architecture en couches

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

### Composants Docker

```bash
# Architecture des composants
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

## 🎯 Meilleures pratiques

### 1. Dockerfile optimisé avec les meilleures pratiques 2024

```dockerfile
# Multi-stage build pour optimiser la taille
FROM node:18-alpine AS builder

# Installer les dépendances de build
RUN apk add --no-cache python3 make g++

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile --production=false

# Copier le code source
COPY . .

# Build de l'application
RUN yarn build

# Stage de production
FROM node:18-alpine AS production

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Installer uniquement les dépendances de production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

# Copier les fichiers buildés
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Changer vers l'utilisateur non-root
USER nextjs

# Exposer le port
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Commande de démarrage
CMD ["node", "server.js"]
```

### 2. .dockerignore optimisé (2024)

```dockerignore
# Dépendances
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Builds
.next
out
dist
build

# Environnement
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

### 3. Configuration Docker Compose avancée (2024)

```yaml
# docker-compose.yml
version: '3.9'

services:
  # Application principale
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

  # Base de données PostgreSQL
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

  # Redis pour le cache
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

  # Monitoring avec Prometheus
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

  # Grafana pour la visualisation
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

## 🐳 Docker Compose avancé

### 1. Gestion des versions Docker Compose

Il est **crucial** de spécifier la version de Docker Compose dans vos fichiers YAML pour assurer la compatibilité et la stabilité. Voici les versions recommandées :

```yaml
# Version recommandée pour 2024
version: '3.9'

# Versions supportées actuellement :
# - 3.9 (recommandée pour la production)
# - 3.8 (compatible avec la plupart des fonctionnalités)
# - 3.7 (pour les environnements plus anciens)
```

**Pourquoi spécifier la version ?**
- **Compatibilité** : Assure que votre configuration fonctionne avec la version de Docker Compose installée
- **Stabilité** : Évite les comportements inattendus lors des mises à jour
- **Fonctionnalités** : Accès aux fonctionnalités spécifiques de chaque version
- **Production** : Garantit la reproductibilité entre environnements

### 2. Configuration multi-environnement

```yaml
# docker-compose.override.yml (développement)
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

### 2. Stack Docker Swarm

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

## 🔒 Sécurité en production

### 1. Dockerfile sécurisé

```dockerfile
# Dockerfile sécurisé
FROM node:18-alpine AS base

# Installer les mises à jour de sécurité
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Stage de build
FROM base AS builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY yarn.lock ./

# Installer les dépendances avec audit de sécurité
RUN yarn install --frozen-lockfile --production=false && \
    yarn audit --level moderate

# Copier le code source
COPY . .

# Build de l'application
RUN yarn build

# Stage de production
FROM base AS production

# Définir les variables d'environnement sécurisées
ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=1024" \
    NEXT_TELEMETRY_DISABLED=1

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires avec les bonnes permissions
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/yarn.lock ./

# Installer uniquement les dépendances de production
RUN yarn install --frozen-lockfile --production=true && \
    yarn cache clean && \
    rm -rf /tmp/* /var/cache/apk/*

# Copier les fichiers buildés
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Créer les répertoires nécessaires
RUN mkdir -p /app/logs /app/data && \
    chown -R nextjs:nodejs /app/logs /app/data

# Changer vers l'utilisateur non-root
USER nextjs

# Exposer le port
EXPOSE 3000

# Health check sécurisé
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Utiliser dumb-init pour gérer les signaux
ENTRYPOINT ["dumb-init", "--"]

# Commande de démarrage
CMD ["node", "server.js"]
```

### 2. Configuration de sécurité

```yaml
# docker-compose.security.yml
version: '3.9'

services:
  app:
    # Limiter les privilèges
    privileged: false
    read_only: true
    tmpfs:
      - /tmp:noexec,nosuid,size=100m
      - /var/tmp:noexec,nosuid,size=100m
    
    # Limiter les capacités système
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    
    # Limiter les ressources
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
          pids: 100
        reservations:
          cpus: '0.5'
          memory: 512M
    
    # Variables d'environnement sécurisées
    environment:
      - NODE_ENV=production
      - NODE_OPTIONS=--max-old-space-size=1024
    env_file:
      - .env.production
    
    # Volumes en lecture seule
    volumes:
      - app_data:/app/data:ro
      - app_logs:/app/logs:rw
```

### 3. Script de sécurité

```bash
#!/bin/bash
# security-scan.sh

set -e

echo "🔍 Scanning Docker images for vulnerabilities..."

# Scanner l'image avec Trivy
trivy image --severity HIGH,CRITICAL myapp:latest

# Scanner avec Docker Scout
docker scout cves myapp:latest

# Vérifier les secrets
detect-secrets scan --all-files

# Audit des dépendances
yarn audit --level moderate

echo "✅ Security scan completed"
```

## ⚡ Performance et optimisation

### 1. Optimisation des images

```dockerfile
# Dockerfile optimisé pour la performance
FROM node:18-alpine AS base

# Optimiser les couches
RUN apk add --no-cache --virtual .build-deps \
    python3 \
    make \
    g++ \
    && apk add --no-cache \
    dumb-init \
    curl

# Stage de build optimisé
FROM base AS builder
WORKDIR /app

# Cache des dépendances
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Build avec optimisations
COPY . .
RUN yarn build && \
    yarn cache clean

# Stage de production minimal
FROM node:18-alpine AS production

# Installer uniquement les dépendances nécessaires
RUN apk add --no-cache dumb-init curl

# Créer l'utilisateur
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

WORKDIR /app

# Copier les fichiers optimisés
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production=true && \
    yarn cache clean && \
    rm -rf /tmp/* /var/cache/apk/*

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# Health check optimisé
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
```

### 2. Configuration de performance

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
    
    # Optimisations réseau
    sysctls:
      - net.core.somaxconn=65535
      - net.ipv4.tcp_max_syn_backlog=65535
    
    # Variables d'environnement de performance
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
    
    # Optimisations PostgreSQL
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
    
    # Optimisations Redis
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

## 📊 Monitoring et debugging

### 1. Configuration de monitoring

```yaml
# docker-compose.monitoring.yml
version: '3.9'

services:
  # Prometheus pour les métriques
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

  # Grafana pour la visualisation
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

  # Node Exporter pour les métriques système
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
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    networks:
      - monitoring

  # cAdvisor pour les métriques de conteneurs
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

  # Jaeger pour le tracing distribué
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

### 2. Configuration Prometheus

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

### 3. Scripts de debugging

```bash
#!/bin/bash
# debug-container.sh

CONTAINER_NAME=${1:-myapp-prod}

echo "🔍 Debugging container: $CONTAINER_NAME"

# Vérifier l'état du conteneur
echo "📊 Container status:"
docker ps -f name=$CONTAINER_NAME

# Logs récents
echo "📝 Recent logs:"
docker logs --tail 100 $CONTAINER_NAME

# Utilisation des ressources
echo "💾 Resource usage:"
docker stats --no-stream $CONTAINER_NAME

# Informations détaillées
echo "ℹ️ Container info:"
docker inspect $CONTAINER_NAME | jq '.[0].State'

# Processus en cours
echo "🔄 Running processes:"
docker exec $CONTAINER_NAME ps aux

# Utilisation du disque
echo "💿 Disk usage:"
docker exec $CONTAINER_NAME df -h

# Variables d'environnement
echo "🌍 Environment variables:"
docker exec $CONTAINER_NAME env | sort

# Test de connectivité
echo "🌐 Connectivity test:"
docker exec $CONTAINER_NAME curl -f http://localhost:3000/api/health || echo "Health check failed"
```

## 🚀 CI/CD avec Docker

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
          # Ajouter ici la logique de déploiement
```

### 2. Script de déploiement

```bash
#!/bin/bash
# deploy.sh

set -e

ENVIRONMENT=${1:-production}
IMAGE_TAG=${2:-latest}

echo "🚀 Deploying to $ENVIRONMENT with image tag: $IMAGE_TAG"

# Variables d'environnement
export COMPOSE_PROJECT_NAME=myapp
export IMAGE_TAG=$IMAGE_TAG

# Backup de la base de données
if [ "$ENVIRONMENT" = "production" ]; then
    echo "📦 Creating database backup..."
    docker compose -f docker-compose.yml -f docker-compose.prod.yml exec postgres pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup_$(date +%Y%m%d_%H%M%S).sql
fi

# Pull de la nouvelle image
echo "⬇️ Pulling new image..."
docker compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml pull

# Déploiement avec zéro downtime
echo "🔄 Deploying with zero downtime..."
docker compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml up -d --no-deps app

# Attendre que l'application soit prête
echo "⏳ Waiting for application to be ready..."
timeout 60 bash -c 'until curl -f http://localhost:3000/api/health; do sleep 2; done'

# Vérifier la santé de l'application
echo "🏥 Health check..."
if curl -f http://localhost:3000/api/health; then
    echo "✅ Deployment successful!"
    
    # Nettoyer les anciennes images
    echo "🧹 Cleaning up old images..."
    docker image prune -f
    
    # Redémarrer les autres services si nécessaire
    docker compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml restart nginx
else
    echo "❌ Deployment failed! Rolling back..."
    docker compose -f docker-compose.yml -f docker-compose.$ENVIRONMENT.yml rollback app
    exit 1
fi
```

## 🎯 Patterns avancés

### 1. Multi-stage builds optimisés

```dockerfile
# Dockerfile multi-stage optimisé
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Stage de dépendances
FROM base AS deps
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage de build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage de production
FROM base AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copier les fichiers buildés avec les bonnes permissions
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

### 2. Configuration de développement

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

  # Outils de développement
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

## 💡 Snippets avancés

### 1. Scripts utilitaires

```bash
#!/bin/bash
# docker-utils.sh

# Fonction pour nettoyer Docker
cleanup_docker() {
    echo "🧹 Cleaning up Docker..."
    docker system prune -af
    docker volume prune -f
    docker network prune -f
    docker image prune -af
}

# Fonction pour surveiller les conteneurs
monitor_containers() {
    echo "📊 Monitoring containers..."
    watch -n 1 'docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.Size}}"'
}

# Fonction pour sauvegarder les volumes
backup_volumes() {
    local backup_dir="./backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    echo "📦 Backing up volumes..."
    
    # Sauvegarder PostgreSQL
    docker run --rm -v postgres_data:/data -v "$backup_dir":/backup alpine \
        tar czf /backup/postgres_data.tar.gz -C /data .
    
    # Sauvegarder Redis
    docker run --rm -v redis_data:/data -v "$backup_dir":/backup alpine \
        tar czf /backup/redis_data.tar.gz -C /data .
    
    echo "✅ Backup completed in $backup_dir"
}

# Fonction pour restaurer les volumes
restore_volumes() {
    local backup_dir=$1
    
    if [ -z "$backup_dir" ]; then
        echo "❌ Please provide backup directory"
        return 1
    fi
    
    echo "📥 Restoring volumes from $backup_dir..."
    
    # Restaurer PostgreSQL
    docker run --rm -v postgres_data:/data -v "$backup_dir":/backup alpine \
        tar xzf /backup/postgres_data.tar.gz -C /data
    
    # Restaurer Redis
    docker run --rm -v redis_data:/data -v "$backup_dir":/backup alpine \
        tar xzf /backup/redis_data.tar.gz -C /data
    
    echo "✅ Restore completed"
}

# Fonction pour tester la connectivité
test_connectivity() {
    echo "🌐 Testing connectivity..."
    
    # Test de l'application
    curl -f http://localhost:3000/api/health || echo "❌ App health check failed"
    
    # Test de PostgreSQL
    docker exec postgres-prod pg_isready -U $POSTGRES_USER || echo "❌ PostgreSQL not ready"
    
    # Test de Redis
    docker exec redis-prod redis-cli ping || echo "❌ Redis not ready"
}

# Menu principal
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

### 2. Configuration Nginx optimisée

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

### 3. Script de monitoring avancé

```bash
#!/bin/bash
# advanced-monitoring.sh

# Configuration
ALERT_EMAIL="admin@example.com"
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
THRESHOLD_CPU=80
THRESHOLD_MEMORY=85
THRESHOLD_DISK=90

# Fonction pour envoyer des alertes
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

# Fonction pour vérifier les ressources
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

# Fonction pour vérifier la santé des conteneurs
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

# Fonction pour vérifier les logs d'erreur
check_logs() {
    echo "📝 Checking error logs..."
    
    local error_count=$(docker logs $(docker ps -q) 2>&1 | grep -i error | wc -l)
    if [ "$error_count" -gt 10 ]; then
        send_alert "High error count in logs: $error_count errors" "WARNING"
    fi
}

# Fonction pour générer un rapport
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

# Menu principal
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

## 📚 Ressources

### Documentation officielle
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Swarm Documentation](https://docs.docker.com/engine/swarm/)

### Meilleures pratiques
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Production Docker](https://docs.docker.com/config/containers/resource_constraints/)
- [Docker Security](https://docs.docker.com/engine/security/)

### Outils recommandés
- [Trivy](https://trivy.dev/) - Scanner de vulnérabilités
- [Docker Scout](https://docs.docker.com/scout/) - Sécurité des images
- [Prometheus](https://prometheus.io/) - Monitoring
- [Grafana](https://grafana.com/) - Visualisation

### Patterns et architectures
- [12-Factor App](https://12factor.net/)
- [Microservices Patterns](https://microservices.io/)
- [Container Patterns](https://www.oreilly.com/library/view/container-patterns/9781492056280/)

---

*Dernière mise à jour : Janvier 2024*
