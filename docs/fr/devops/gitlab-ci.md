# 🦊 GitLab CI/CD - Guide Complet

## 📋 Table des matières
- [Introduction](#introduction)
- [Concepts fondamentaux](#concepts-fondamentaux)
- [Configuration GitLab CI](#configuration-gitlab-ci)
- [Pipelines avancés](#pipelines-avancés)
- [Variables et secrets](#variables-et-secrets)
- [Artifacts et cache](#artifacts-et-cache)
- [Déploiement](#déploiement)
- [Monitoring et debugging](#monitoring-et-debugging)
- [Bonnes pratiques](#bonnes-pratiques)
- [Exemples pratiques](#exemples-pratiques)

## 🚀 Introduction

GitLab CI/CD est un système d'intégration et de déploiement continu intégré à GitLab. Il permet d'automatiser le build, les tests et le déploiement de vos applications.

### Avantages
- **Intégration native** avec GitLab
- **Interface graphique** intuitive
- **Parallélisation** des jobs
- **Artifacts** et cache intégrés
- **Variables** et secrets sécurisés

## 🎯 Concepts fondamentaux

### Pipeline
Un pipeline est une suite de jobs qui s'exécutent dans un ordre défini.

### Job
Un job est une tâche individuelle qui s'exécute dans un environnement isolé.

### Stage
Un stage est un groupe de jobs qui s'exécutent en parallèle.

### Runner
Un runner est un agent qui exécute les jobs du pipeline.

## ⚙️ Configuration GitLab CI

### Fichier .gitlab-ci.yml

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"
  DOCKER_DRIVER: overlay2

# Job de build
build:
  stage: build
  image: node:18-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour
  only:
    - main
    - develop

# Job de test
test:
  stage: test
  image: node:18-alpine
  services:
    - postgres:15
  variables:
    POSTGRES_DB: test_db
    POSTGRES_USER: test_user
    POSTGRES_PASSWORD: test_password
  script:
    - npm ci
    - npm run test
  coverage: '/Coverage: \d+\.\d+%/'
  artifacts:
    reports:
      junit: coverage/junit.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura.xml

# Job de déploiement
deploy_staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - echo "Deploying to staging..."
    - curl -X POST $STAGING_WEBHOOK_URL
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

deploy_production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - echo "Deploying to production..."
    - curl -X POST $PRODUCTION_WEBHOOK_URL
  environment:
    name: production
    url: https://example.com
  only:
    - main
  when: manual
```

### Stages et Jobs

```yaml
stages:
  - build
  - test
  - security
  - deploy

build_frontend:
  stage: build
  image: node:18-alpine
  script:
    - cd frontend
    - npm ci
    - npm run build
  artifacts:
    paths:
      - frontend/dist/

build_backend:
  stage: build
  image: node:18-alpine
  script:
    - cd backend
    - npm ci
    - npm run build
  artifacts:
    paths:
      - backend/dist/

test_unit:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm run test:unit
  coverage: '/Coverage: \d+\.\d+%/'

test_integration:
  stage: test
  image: node:18-alpine
  services:
    - postgres:15
  script:
    - npm ci
    - npm run test:integration

security_scan:
  stage: security
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST $SECURITY_SCAN_URL
  allow_failure: true

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploying application..."
  environment:
    name: production
```

## 🚀 Pipelines avancés

### Pipeline avec conditions

```yaml
build:
  stage: build
  image: node:18-alpine
  script:
    - npm ci
    - npm run build
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      when: always
    - if: $CI_MERGE_REQUEST_ID
      when: manual
    - when: never

test:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm run test
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
    - if: $CI_MERGE_REQUEST_ID
    - if: $CI_COMMIT_BRANCH =~ /^feature\/.*/
```

### Pipeline avec matrices

```yaml
test_matrix:
  stage: test
  image: node:18-alpine
  parallel:
    matrix:
      - NODE_VERSION: ["16", "18", "20"]
      - OS: ["alpine", "ubuntu"]
  script:
    - echo "Testing on Node $NODE_VERSION with $OS"
    - npm ci
    - npm run test
```

### Pipeline avec includes

```yaml
# .gitlab-ci.yml
include:
  - local: '/templates/frontend.yml'
  - local: '/templates/backend.yml'
  - remote: 'https://example.com/security-scan.yml'

stages:
  - build
  - test
  - security
  - deploy
```

## 🔐 Variables et secrets

### Variables de pipeline

```yaml
variables:
  NODE_VERSION: "18"
  DOCKER_DRIVER: overlay2
  GIT_DEPTH: 0

build:
  stage: build
  variables:
    BUILD_ENV: "production"
  script:
    - echo "Building with Node $NODE_VERSION"
    - echo "Environment: $BUILD_ENV"
```

### Variables protégées

```yaml
deploy:
  stage: deploy
  script:
    - echo "Deploying to $DEPLOY_URL"
    - curl -X POST -H "Authorization: Bearer $API_TOKEN" $DEPLOY_URL
  only:
    - main
  environment:
    name: production
```

### Variables de fichier

```yaml
build:
  stage: build
  variables:
    DOCKER_CONFIG: $DOCKER_CONFIG
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

## 📦 Artifacts et cache

### Artifacts

```yaml
build:
  stage: build
  image: node:18-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
      - coverage/
    reports:
      junit: coverage/junit.xml
    expire_in: 1 week
    when: always

test:
  stage: test
  image: node:18-alpine
  dependencies:
    - build
  script:
    - npm ci
    - npm run test
  artifacts:
    reports:
      junit: test-results/junit.xml
    expire_in: 1 day
```

### Cache

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/

build:
  stage: build
  image: node:18-alpine
  cache:
    key: ${CI_COMMIT_REF_SLUG}-build
    paths:
      - node_modules/
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run build
```

## 🚀 Déploiement

### Déploiement Docker

```yaml
build_docker:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  only:
    - main

deploy_docker:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - curl -X POST -H "Authorization: Bearer $DEPLOY_TOKEN" \
        -d "image=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA" \
        $DEPLOY_WEBHOOK_URL
  environment:
    name: production
    url: https://example.com
  only:
    - main
```

### Déploiement Kubernetes

```yaml
deploy_k8s:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context $KUBE_CONTEXT
    - kubectl set image deployment/app app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - kubectl rollout status deployment/app
  environment:
    name: production
    url: https://example.com
  only:
    - main
```

## 📊 Monitoring et debugging

### Logs et debugging

```yaml
debug:
  stage: debug
  image: alpine:latest
  script:
    - echo "Pipeline variables:"
    - echo "CI_COMMIT_SHA: $CI_COMMIT_SHA"
    - echo "CI_COMMIT_REF_NAME: $CI_COMMIT_REF_NAME"
    - echo "CI_PROJECT_NAME: $CI_PROJECT_NAME"
    - echo "CI_ENVIRONMENT: $CI_ENVIRONMENT"
  when: manual
  allow_failure: true
```

### Notifications

```yaml
notify:
  stage: notify
  image: alpine:latest
  script:
    - echo "Pipeline completed successfully"
    - curl -X POST -H "Content-Type: application/json" \
        -d '{"text":"Pipeline completed for $CI_PROJECT_NAME"}' \
        $SLACK_WEBHOOK_URL
  when: on_success
  only:
    - main
```

## 🎯 Bonnes pratiques

### Structure de pipeline

```yaml
# .gitlab-ci.yml
stages:
  - validate
  - build
  - test
  - security
  - deploy

variables:
  NODE_VERSION: "18"
  DOCKER_DRIVER: overlay2

# Validation
validate:
  stage: validate
  image: node:18-alpine
  script:
    - npm ci
    - npm run lint
    - npm run type-check
  only:
    - merge_requests
    - main

# Build
build:
  stage: build
  image: node:18-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour
  only:
    - main

# Tests
test_unit:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm run test:unit
  coverage: '/Coverage: \d+\.\d+%/'

test_integration:
  stage: test
  image: node:18-alpine
  services:
    - postgres:15
  script:
    - npm ci
    - npm run test:integration

# Sécurité
security_scan:
  stage: security
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST $SECURITY_SCAN_URL
  allow_failure: true

# Déploiement
deploy:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploying to production..."
  environment:
    name: production
    url: https://example.com
  only:
    - main
  when: manual
```

### Gestion des erreurs

```yaml
build:
  stage: build
  image: node:18-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    when: always
  allow_failure: false

test:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm run test
  artifacts:
    reports:
      junit: test-results/junit.xml
    when: always
  allow_failure: true
```

## 💡 Exemples pratiques

### Pipeline Vue.js

```yaml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

build_vue:
  stage: build
  image: node:18-alpine
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour
  only:
    - main

test_vue:
  stage: test
  image: node:18-alpine
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
  script:
    - npm ci
    - npm run test:unit
    - npm run test:e2e
  artifacts:
    reports:
      junit: test-results/junit.xml
  coverage: '/Coverage: \d+\.\d+%/'

deploy_vue:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache rsync
    - rsync -av dist/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
  environment:
    name: production
    url: https://example.com
  only:
    - main
```

### Pipeline NestJS

```yaml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

build_nestjs:
  stage: build
  image: node:18-alpine
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour
  only:
    - main

test_nestjs:
  stage: test
  image: node:18-alpine
  services:
    - postgres:15
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
  script:
    - npm ci
    - npm run test
    - npm run test:e2e
  artifacts:
    reports:
      junit: test-results/junit.xml
  coverage: '/Coverage: \d+\.\d+%/' 

deploy_nestjs:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST -H "Authorization: Bearer $DEPLOY_TOKEN" \
        -d "image=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA" \
        $DEPLOY_WEBHOOK_URL
  environment:
    name: production
    url: https://api.example.com
  only:
    - main
```

## 📚 Ressources

### Documentation officielle
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [GitLab CI/CD Variables](https://docs.gitlab.com/ee/ci/variables/)
- [GitLab CI/CD Environments](https://docs.gitlab.com/ee/ci/environments/)

### Outils et extensions
- [GitLab Runner](https://docs.gitlab.com/runner/)
- [GitLab Container Registry](https://docs.gitlab.com/ee/user/packages/container_registry/)
- [GitLab Package Registry](https://docs.gitlab.com/ee/user/packages/)

### Bonnes pratiques
- [GitLab CI/CD Best Practices](https://docs.gitlab.com/ee/ci/pipelines/pipeline_efficiency.html)
- [GitLab CI/CD Security](https://docs.gitlab.com/ee/ci/security/)
- [GitLab CI/CD Performance](https://docs.gitlab.com/ee/ci/pipelines/pipeline_efficiency.html)

---

*Dernière mise à jour : Janvier 2024*
