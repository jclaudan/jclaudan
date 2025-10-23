# 🚀 Setup de Projet : Configuration et Initialisation

## 📋 Table des matières
- [Introduction](#introduction)
- [Initialisation des repositories](#initialisation-des-repositories)
- [Structure de base recommandée](#structure-de-base-recommandée)
- [Gestion des environnements](#gestion-des-environnements)
- [Configuration des outils](#configuration-des-outils)
- [Exemples concrets](#exemples-concrets)
- [Templates de configuration](#templates-de-configuration)
- [Checklist de validation](#checklist-de-validation)
- [Ressources](#ressources)

## 🎯 Introduction

Le setup de projet définit l'initialisation, la structure et la configuration de base d'un projet de développement, garantissant une base solide pour le développement et la maintenance.

### 🎯 Objectifs

- **Initialiser** un repository Git structuré
- **Configurer** les outils de développement
- **Établir** une structure de projet cohérente
- **Gérer** les environnements de développement
- **Automatiser** les processus de développement

---

## 🔧 Initialisation des repositories

### 📝 Types de repositories

#### Repository monolithique

**Principe**
Un seul repository contenant toute l'application (frontend + backend + infrastructure).

**Avantages**
- **Simplicité** : Un seul repository à gérer
- **Cohérence** : Versioning unifié
- **Déploiement** : Déploiement coordonné
- **Développement** : Changements atomiques

**Inconvénients**
- **Scalabilité** : Limité par la taille
- **Équipes** : Conflits potentiels
- **Technologies** : Contraintes technologiques
- **Déploiement** : Déploiement global

**Structure**
```
my-project/
├── frontend/
├── backend/
├── infrastructure/
├── docs/
├── scripts/
└── README.md
```

#### Repository polyrepo

**Principe**
Plusieurs repositories indépendants pour chaque service ou composant.

**Avantages**
- **Indépendance** : Développement autonome
- **Scalabilité** : Équipes indépendantes
- **Technologies** : Choix technologiques libres
- **Déploiement** : Déploiement indépendant

**Inconvénients**
- **Complexité** : Gestion multiple
- **Cohérence** : Versioning complexe
- **Dépendances** : Gestion des dépendances
- **Déploiement** : Coordination nécessaire

**Structure**
```
my-project-frontend/
my-project-backend/
my-project-infrastructure/
my-project-docs/
```

#### Repository monorepo

**Principe**
Un seul repository contenant plusieurs projets avec des outils de gestion unifiés.

**Avantages**
- **Cohérence** : Versioning unifié
- **Partage** : Code partagé facile
- **Refactoring** : Changements atomiques
- **Développement** : Développement coordonné

**Inconvénients**
- **Complexité** : Outils de gestion
- **Performance** : Temps de build
- **Équipes** : Conflits potentiels
- **Déploiement** : Déploiement sélectif

**Structure**
```
my-project/
├── apps/
│   ├── frontend/
│   ├── backend/
│   └── mobile/
├── packages/
│   ├── shared/
│   ├── ui/
│   └── utils/
├── tools/
├── docs/
└── README.md
```

### 📝 Initialisation Git

#### Repository monolithique

```bash
# Initialisation du repository
git init my-project
cd my-project

# Configuration Git
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Création de la structure
mkdir -p frontend backend infrastructure docs scripts
touch README.md .gitignore

# Premier commit
git add .
git commit -m "Initial commit: Project structure"
```

#### Repository monorepo

```bash
# Initialisation du repository
git init my-project
cd my-project

# Configuration Git
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Création de la structure
mkdir -p apps packages tools docs
mkdir -p apps/frontend apps/backend apps/mobile
mkdir -p packages/shared packages/ui packages/utils
touch README.md .gitignore

# Premier commit
git add .
git commit -m "Initial commit: Monorepo structure"
```

#### Configuration .gitignore

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
.next/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output/

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

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Database
*.db
*.sqlite
*.sqlite3

# Docker
.dockerignore
Dockerfile
docker-compose.yml

# Terraform
*.tfstate
*.tfstate.*
.terraform/
.terraform.lock.hcl

# Kubernetes
*.kubeconfig
```

---

## 📁 Structure de base recommandée

### 📝 Structure monolithique

```
my-project/
├── frontend/                 # Application frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── utils/
│   │   └── main.js
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── backend/                  # Application backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── infrastructure/           # Infrastructure as Code
│   ├── docker/
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.backend
│   │   └── docker-compose.yml
│   ├── kubernetes/
│   │   ├── frontend-deployment.yaml
│   │   ├── backend-deployment.yaml
│   │   └── ingress.yaml
│   └── terraform/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── docs/                     # Documentation
│   ├── api/
│   ├── architecture/
│   ├── deployment/
│   └── README.md
├── scripts/                  # Scripts utilitaires
│   ├── setup.sh
│   ├── deploy.sh
│   └── backup.sh
├── .github/                  # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
├── .gitignore
├── README.md
└── package.json
```

### 📝 Structure monorepo

```
my-project/
├── apps/                     # Applications
│   ├── frontend/             # Application frontend
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── README.md
│   ├── backend/              # Application backend
│   │   ├── src/
│   │   ├── prisma/
│   │   ├── package.json
│   │   └── README.md
│   └── mobile/               # Application mobile
│       ├── src/
│       ├── package.json
│       └── README.md
├── packages/                 # Packages partagés
│   ├── shared/               # Code partagé
│   │   ├── src/
│   │   ├── package.json
│   │   └── README.md
│   ├── ui/                   # Composants UI
│   │   ├── src/
│   │   ├── package.json
│   │   └── README.md
│   └── utils/                # Utilitaires
│       ├── src/
│       ├── package.json
│       └── README.md
├── tools/                    # Outils de développement
│   ├── eslint-config/
│   ├── typescript-config/
│   └── jest-config/
├── docs/                     # Documentation
│   ├── api/
│   ├── architecture/
│   └── README.md
├── .github/                  # GitHub Actions
│   └── workflows/
├── .gitignore
├── README.md
├── package.json
├── lerna.json
└── nx.json
```

---

## 🌍 Gestion des environnements

### 📝 Variables d'environnement

#### Configuration des environnements

**Fichier .env.example**
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=myapp
DB_SSL=false

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=noreply@example.com

# External APIs
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# App
APP_PORT=3000
APP_ENV=development
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
```

**Fichier .env.development**
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=myapp_dev
DB_SSL=false

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT
JWT_SECRET=dev-secret-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=dev-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=dev-email@gmail.com
EMAIL_PASSWORD=dev-password
EMAIL_FROM=dev@example.com

# External APIs
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
GOOGLE_CLIENT_ID=dev-google-client-id
GOOGLE_CLIENT_SECRET=dev-google-client-secret

# App
APP_PORT=3000
APP_ENV=development
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
```

**Fichier .env.production**
```bash
# Database
DB_HOST=prod-db-host
DB_PORT=5432
DB_USERNAME=prod-user
DB_PASSWORD=prod-password
DB_NAME=myapp_prod
DB_SSL=true

# Redis
REDIS_HOST=prod-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=prod-redis-password
REDIS_DB=0

# JWT
JWT_SECRET=prod-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=prod-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=true
EMAIL_USER=prod-email@gmail.com
EMAIL_PASSWORD=prod-password
EMAIL_FROM=noreply@example.com

# External APIs
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
GOOGLE_CLIENT_ID=prod-google-client-id
GOOGLE_CLIENT_SECRET=prod-google-client-secret

# App
APP_PORT=3000
APP_ENV=production
APP_URL=https://api.example.com
FRONTEND_URL=https://example.com
```

#### Gestion des secrets

**Configuration avec dotenv**
```javascript
// config/database.js
import dotenv from 'dotenv'

dotenv.config()

export const databaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'myapp',
  ssl: process.env.DB_SSL === 'true'
}
```

**Configuration avec validation**
```javascript
// config/config.js
import Joi from 'joi'

const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1h')
})

const { error, value } = configSchema.validate(process.env)

if (error) {
  throw new Error(`Configuration validation error: ${error.message}`)
}

export default value
```

---

## ⚙️ Configuration des outils

### 📝 Configuration TypeScript

#### Configuration TypeScript backend

**tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/controllers/*": ["src/controllers/*"],
      "@/services/*": ["src/services/*"],
      "@/repositories/*": ["src/repositories/*"],
      "@/models/*": ["src/models/*"],
      "@/middleware/*": ["src/middleware/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"]
    }
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

#### Configuration TypeScript frontend

**tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/pages/*": ["src/pages/*"],
      "@/stores/*": ["src/stores/*"],
      "@/composables/*": ["src/composables/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"]
    }
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

### 📝 Configuration Vite

**vite.config.js**
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/pages': resolve(__dirname, 'src/pages'),
      '@/stores': resolve(__dirname, 'src/stores'),
      '@/composables': resolve(__dirname, 'src/composables'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/types': resolve(__dirname, 'src/types')
    }
  },
  server: {
    port: 3001,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@headlessui/vue', '@heroicons/vue']
        }
      }
    }
  }
})
```

### 📝 Configuration NestJS

**nest-cli.json**
```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "webpack": true,
    "tsConfigPath": "tsconfig.json"
  }
}
```

**main.ts**
```typescript
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Configuration globale
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  // Configuration CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true
  })

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the application')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  // Démarrage du serveur
  const port = process.env.APP_PORT || 3000
  await app.listen(port)
  
  console.log(`Application is running on: http://localhost:${port}`)
  console.log(`API documentation: http://localhost:${port}/api/docs`)
}

bootstrap()
```

### 📝 Configuration Prisma

**schema.prisma**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orders    Order[]

  @@map("users")
}

model Order {
  id        String   @id @default(uuid())
  userId    String
  total     Decimal
  status    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
  items     OrderItem[]

  @@map("orders")
}

model OrderItem {
  id        String  @id @default(uuid())
  orderId   String
  productId String
  quantity  Int
  unitPrice Decimal
  order     Order   @relation(fields: [orderId], references: [id])

  @@map("order_items")
}
```

---

## 💡 Exemples concrets

### 🏗️ Setup complet d'un projet e-commerce

#### Structure du projet

```
ecommerce-project/
├── frontend/                 # Application Vue.js
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   └── organisms/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── composables/
│   │   ├── utils/
│   │   ├── types/
│   │   └── main.ts
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tsconfig.json
│   └── README.md
├── backend/                  # Application NestJS
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── products/
│   │   │   └── orders/
│   │   ├── shared/
│   │   │   ├── middleware/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   └── types/
│   │   ├── infrastructure/
│   │   │   ├── database/
│   │   │   ├── cache/
│   │   │   └── external/
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── README.md
├── infrastructure/           # Infrastructure as Code
│   ├── docker/
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.backend
│   │   └── docker-compose.yml
│   ├── kubernetes/
│   │   ├── frontend-deployment.yaml
│   │   ├── backend-deployment.yaml
│   │   └── ingress.yaml
│   └── terraform/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── docs/                     # Documentation
│   ├── api/
│   ├── architecture/
│   ├── deployment/
│   └── README.md
├── scripts/                  # Scripts utilitaires
│   ├── setup.sh
│   ├── deploy.sh
│   └── backup.sh
├── .github/                  # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
├── .gitignore
├── README.md
└── package.json
```

#### Configuration package.json racine

```json
{
  "name": "ecommerce-project",
  "version": "1.0.0",
  "description": "E-commerce application with Vue.js frontend and NestJS backend",
  "private": true,
  "workspaces": [
    "frontend",
    "backend"
  ],
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run start:dev",
    "dev:frontend": "cd frontend && npm run dev",
    "build": "npm run build:backend && npm run build:frontend",
    "build:backend": "cd backend && npm run build",
    "build:frontend": "cd frontend && npm run build",
    "test": "npm run test:backend && npm run test:frontend",
    "test:backend": "cd backend && npm run test",
    "test:frontend": "cd frontend && npm run test",
    "lint": "npm run lint:backend && npm run lint:frontend",
    "lint:backend": "cd backend && npm run lint",
    "lint:frontend": "cd frontend && npm run lint",
    "setup": "./scripts/setup.sh",
    "deploy": "./scripts/deploy.sh"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "cross-env": "^7.0.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

#### Configuration package.json frontend

```json
{
  "name": "ecommerce-frontend",
  "version": "1.0.0",
  "description": "E-commerce frontend application",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "type-check": "vue-tsc --noEmit"
  },
  "dependencies": {
    "vue": "^3.3.8",
    "vue-router": "^4.2.5",
    "pinia": "^2.1.7",
    "@headlessui/vue": "^1.7.16",
    "@heroicons/vue": "^2.0.18",
    "axios": "^1.6.2",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.5.0",
    "@vue/tsconfig": "^0.4.0",
    "typescript": "~5.2.0",
    "vite": "^5.0.0",
    "vue-tsc": "^1.8.22",
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "c8": "^8.0.1",
    "eslint": "^8.53.0",
    "@typescript-eslint/eslint-plugin": "^6.12.0",
    "@typescript-eslint/parser": "^6.12.0",
    "eslint-plugin-vue": "^9.18.1"
  }
}
```

#### Configuration package.json backend

```json
{
  "name": "ecommerce-backend",
  "version": "1.0.0",
  "description": "E-commerce backend API",
  "scripts": {
    "start": "node dist/main",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "build": "nest build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:deploy": "prisma migrate deploy",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@nestjs/common": "^10.2.10",
    "@nestjs/core": "^10.2.10",
    "@nestjs/platform-express": "^10.2.10",
    "@nestjs/swagger": "^7.1.17",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.2",
    "@nestjs/config": "^3.1.1",
    "@prisma/client": "^5.6.0",
    "prisma": "^5.6.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "bcryptjs": "^2.4.3",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "joi": "^17.11.0",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "redis": "^4.6.10",
    "stripe": "^14.7.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.2.1",
    "@nestjs/schematics": "^10.0.3",
    "@nestjs/testing": "^10.2.10",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.8",
    "@types/node": "^20.9.0",
    "@types/passport-jwt": "^3.0.13",
    "@types/passport-local": "^1.0.38",
    "@types/bcryptjs": "^2.4.6",
    "@types/compression": "^1.7.5",
    "@typescript-eslint/eslint-plugin": "^6.12.0",
    "@typescript-eslint/parser": "^6.12.0",
    "eslint": "^8.53.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.1",
    "jest": "^29.7.0",
    "prettier": "^3.1.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.2.2"
  }
}
```

#### Script de setup

```bash
#!/bin/bash
# scripts/setup.sh

set -e

echo "🚀 Setting up e-commerce project..."

# Vérifier les prérequis
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm 8+ first."
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Installer les dépendances
echo "📦 Installing dependencies..."
npm install

# Installer les dépendances frontend
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Installer les dépendances backend
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Générer le client Prisma
echo "🔧 Generating Prisma client..."
cd backend
npx prisma generate
cd ..

# Copier les fichiers d'environnement
echo "🔧 Setting up environment files..."
if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend/.env"
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
fi

# Démarrer les services Docker
echo "🐳 Starting Docker services..."
docker compose -f infrastructure/docker/docker-compose.yml up -d

# Attendre que la base de données soit prête
echo "⏳ Waiting for database to be ready..."
sleep 10

# Exécuter les migrations
echo "🗄️ Running database migrations..."
cd backend
npx prisma migrate dev --name init
cd ..

echo "✅ Setup completed successfully!"
echo ""
echo "🎉 Your e-commerce project is ready!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "To access the applications:"
echo "  Frontend: http://localhost:3001"
echo "  Backend: http://localhost:3000"
echo "  API Docs: http://localhost:3000/api/docs"
echo ""
echo "To stop Docker services:"
echo "  docker compose -f infrastructure/docker/docker-compose.yml down"
```

---

## 📋 Templates de configuration

### 🏗️ Template Docker Compose

```yaml
# infrastructure/docker/docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: ecommerce-postgres
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - ecommerce-network

  redis:
    image: redis:7-alpine
    container_name: ecommerce-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - ecommerce-network

  backend:
    build:
      context: ../../backend
      dockerfile: ../infrastructure/docker/Dockerfile.backend
    container_name: ecommerce-backend
    environment:
      - NODE_ENV=development
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=password
      - DB_NAME=ecommerce
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    volumes:
      - ../../backend:/app
      - /app/node_modules
    networks:
      - ecommerce-network

  frontend:
    build:
      context: ../../frontend
      dockerfile: ../infrastructure/docker/Dockerfile.frontend
    container_name: ecommerce-frontend
    ports:
      - "3001:3001"
    volumes:
      - ../../frontend:/app
      - /app/node_modules
    networks:
      - ecommerce-network

volumes:
  postgres_data:
  redis_data:

networks:
  ecommerce-network:
    driver: bridge
```

### 🏗️ Template Dockerfile Backend

```dockerfile
# infrastructure/docker/Dockerfile.backend
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "start:prod"]
```

### 🏗️ Template Dockerfile Frontend

```dockerfile
# infrastructure/docker/Dockerfile.frontend
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3001

# Commande de démarrage
CMD ["npm", "run", "dev"]
```

### 🏗️ Template GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
    - uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Install frontend dependencies
      run: cd frontend && npm ci

    - name: Install backend dependencies
      run: cd backend && npm ci

    - name: Generate Prisma client
      run: cd backend && npx prisma generate

    - name: Run database migrations
      run: cd backend && npx prisma migrate deploy

    - name: Run backend tests
      run: cd backend && npm run test

    - name: Run frontend tests
      run: cd frontend && npm run test

    - name: Run linting
      run: npm run lint

    - name: Build applications
      run: npm run build
```

---

## ✅ Checklist de validation

### 📋 Initialisation du projet

- [ ] **Repository Git** initialisé et configuré
- [ ] **Structure de dossiers** créée et organisée
- [ ] **Fichiers de configuration** créés et configurés
- [ ] **Variables d'environnement** définies et documentées
- [ ] **Scripts de setup** créés et testés

### 📋 Configuration des outils

- [ ] **TypeScript** configuré pour frontend et backend
- [ ] **Vite** configuré pour le frontend
- [ ] **NestJS** configuré pour le backend
- [ ] **Prisma** configuré et schéma défini
- [ ] **ESLint et Prettier** configurés

### 📋 Gestion des environnements

- [ ] **Variables d'environnement** configurées pour tous les environnements
- [ ] **Fichiers .env.example** créés et documentés
- [ ] **Validation des configurations** implémentée
- [ ] **Gestion des secrets** sécurisée
- [ ] **Configuration des environnements** testée

### 📋 Infrastructure

- [ ] **Docker** configuré pour le développement
- [ ] **Docker Compose** configuré pour les services
- [ ] **Scripts de déploiement** créés
- [ ] **CI/CD** configuré avec GitHub Actions
- [ ] **Documentation** complète et à jour

---

## 📚 Ressources

### 🎓 Formation
- [Standards de code](./coding-standards.md)
- [Stratégie de tests](./testing-strategy.md)
- [Sécurité](./security.md)
- [Architecture globale](../03-architecture/global-architecture.md)

### 🛠️ Outils
- [Node.js](https://nodejs.org/) - Runtime JavaScript
- [TypeScript](https://www.typescriptlang.org/) - Langage de programmation
- [Vite](https://vitejs.dev/) - Build tool
- [NestJS](https://nestjs.com/) - Framework Node.js
- [Prisma](https://www.prisma.io/) - ORM TypeScript
- [Docker](https://www.docker.com/) - Containerisation

### 📖 Références
- [Node.js Documentation](https://nodejs.org/docs/) - Documentation officielle
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Documentation officielle
- [Vite Documentation](https://vitejs.dev/guide/) - Documentation officielle
- [NestJS Documentation](https://docs.nestjs.com/) - Documentation officielle
- [Prisma Documentation](https://www.prisma.io/docs/) - Documentation officielle

---

<div align="center">

[![Retour au Profil](../../../README.md)](../../../README.md)

</div>

---

*Dernière mise à jour : Janvier 2024*
