# 🦊 GitLab CI/CD - Complete Guide

## 📋 Table of Contents
- [Introduction](#introduction)
- [Fundamental Concepts](#fundamental-concepts)
- [GitLab CI Configuration](#gitlab-ci-configuration)
- [Advanced Pipelines](#advanced-pipelines)
- [Variables and Secrets](#variables-and-secrets)
- [Artifacts and Cache](#artifacts-and-cache)
- [Deployment](#deployment)
- [Monitoring and Debugging](#monitoring-and-debugging)
- [Best Practices](#best-practices)
- [Practical Examples](#practical-examples)

## 🚀 Introduction

GitLab CI/CD is a continuous integration and deployment system integrated with GitLab. It allows you to automate the build, testing, and deployment of your applications.

### Advantages
- **Native integration** with GitLab
- **Intuitive graphical interface**
- **Job parallelization**
- **Integrated artifacts** and cache
- **Secure variables** and secrets

## 🎯 Fundamental Concepts

### Pipeline
A pipeline is a series of jobs that execute in a defined order.

### Job
A job is an individual task that executes in an isolated environment.

### Stage
A stage is a group of jobs that execute in parallel.

### Runner
A runner is an agent that executes pipeline jobs.

## ⚙️ GitLab CI Configuration

### .gitlab-ci.yml File

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"
  DOCKER_DRIVER: overlay2

# Build job
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

# Test job
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

# Deployment job
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

### Stages and Jobs

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

## 🚀 Advanced Pipelines

### Pipeline with Conditions

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

### Pipeline with Matrices

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

### Pipeline with Includes

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

## 🔐 Variables and Secrets

### Pipeline Variables

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

### Protected Variables

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

### File Variables

```yaml
build:
  stage: build
  variables:
    DOCKER_CONFIG: $DOCKER_CONFIG
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

## 📦 Artifacts and Cache

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

## 🚀 Deployment

### Docker Deployment

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

### Kubernetes Deployment

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

## 📊 Monitoring and Debugging

### Logs and Debugging

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

## 🎯 Best Practices

### Pipeline Structure

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

# Security
security_scan:
  stage: security
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST $SECURITY_SCAN_URL
  allow_failure: true

# Deployment
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

### Error Handling

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

## 💡 Practical Examples

### Vue.js Pipeline

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

### NestJS Pipeline

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

## 📚 Resources

### Official documentation
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [GitLab CI/CD Variables](https://docs.gitlab.com/ee/ci/variables/)
- [GitLab CI/CD Environments](https://docs.gitlab.com/ee/ci/environments/)

### Tools and extensions
- [GitLab Runner](https://docs.gitlab.com/runner/)
- [GitLab Container Registry](https://docs.gitlab.com/ee/user/packages/container_registry/)
- [GitLab Package Registry](https://docs.gitlab.com/ee/user/packages/)

### Best practices
- [GitLab CI/CD Best Practices](https://docs.gitlab.com/ee/ci/pipelines/pipeline_efficiency.html)
- [GitLab CI/CD Security](https://docs.gitlab.com/ee/ci/security/)
- [GitLab CI/CD Performance](https://docs.gitlab.com/ee/ci/pipelines/pipeline_efficiency.html)

---

*Last updated: January 2024*
