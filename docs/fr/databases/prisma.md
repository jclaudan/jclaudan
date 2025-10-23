# 🔷 Prisma ORM - Guide Complet

> **Prisma** est un ORM (Object-Relational Mapping) moderne pour TypeScript et Node.js qui simplifie l'accès aux bases de données avec un typage fort et une API intuitive.

## 📋 Table des matières
- [🚀 Introduction](#-introduction)
- [⚙️ Installation et Configuration](#️-installation-et-configuration)
- [📊 Définition du Schéma](#-définition-du-schéma)
- [🔄 Migrations](#-migrations)
- [💾 Opérations CRUD](#-opérations-crud)
- [🔍 Requêtes Avancées](#-requêtes-avancées)
- [🔗 Relations](#-relations)
- [🏗️ Intégration NestJS](#️-intégration-nestjs)
- [✅ Tests](#-tests)
- [🎯 Bonnes Pratiques](#-bonnes-pratiques)
- [📚 Ressources](#-ressources)

---

## 🚀 Introduction

### Qu'est-ce que Prisma ?

Prisma est un ORM de nouvelle génération qui offre :
- **Typage fort** : TypeScript natif avec auto-complétion
- **API intuitive** : Syntaxe simple et expressive
- **Générateur de client** : Client type-safe généré automatiquement
- **Migration automatique** : Gestion des changements de schéma
- **Multi-base** : Support PostgreSQL, MySQL, SQLite, MongoDB

### Avantages par rapport aux autres ORM

| Aspect | Prisma | TypeORM | Mongoose |
|--------|--------|---------|----------|
| **Typage** | Natif TypeScript | TypeScript optionnel | JavaScript |
| **API** | Moderne et intuitive | Décorateurs | Callbacks/Promises |
| **Performance** | Optimisé | Correct | Bon |
| **Migration** | Automatique | Manuelle | Manuelle |
| **Learning Curve** | Facile | Moyenne | Moyenne |

### Quand utiliser Prisma ?

✅ **Utiliser Prisma quand :**
- Projet TypeScript/Node.js
- Besoin de typage fort
- Base de données relationnelle
- Équipe avec différents niveaux d'expérience
- Projet nécessitant des migrations fréquentes

❌ **Ne pas utiliser Prisma quand :**
- Base de données NoSQL uniquement (sauf MongoDB)
- Projet très simple sans relations complexes
- Besoin de requêtes SQL très spécifiques

---

## ⚙️ Installation et Configuration

### Installation

```bash
# Installation de Prisma
npm install prisma @prisma/client

# Installation en dev
npm install -D prisma
```

### Initialisation

```bash
# Initialiser Prisma
npx prisma init

# Ou avec un provider spécifique
npx prisma init --datasource-provider postgresql
```

### Configuration de la base de données

```bash
# .env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

**Providers supportés :**
- PostgreSQL : `postgresql://`
- MySQL : `mysql://`
- SQLite : `file:./dev.db`
- MongoDB : `mongodb://`
- SQL Server : `sqlserver://`

### Configuration du schéma

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## 📊 Définition du Schéma

### Types de données Prisma

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  age       Int?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  posts     Post[]
  profile   Profile?
}
```

### Types de champs disponibles

| Type | Description | Exemple |
|------|-------------|---------|
| `String` | Texte | `"Hello World"` |
| `Int` | Entier 32-bit | `42` |
| `BigInt` | Entier 64-bit | `9007199254740991` |
| `Float` | Nombre décimal | `3.14` |
| `Decimal` | Décimal précis | `3.14159` |
| `Boolean` | Booléen | `true` |
| `DateTime` | Date et heure | `2024-01-01T00:00:00Z` |
| `Json` | JSON | `{"key": "value"}` |
| `Bytes` | Données binaires | `[1, 2, 3]` |

### Attributs de champ

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?  @map("user_name")
  age       Int      @default(18)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("users")
}
```

### Attributs disponibles

| Attribut | Description | Exemple |
|----------|-------------|---------|
| `@id` | Clé primaire | `@id` |
| `@unique` | Valeur unique | `@unique` |
| `@default(value)` | Valeur par défaut | `@default(0)` |
| `@map("name")` | Nom en base | `@map("user_name")` |
| `@updatedAt` | Mise à jour auto | `@updatedAt` |
| `@db.VarChar(255)` | Type DB spécifique | `@db.VarChar(255)` |

### Index et contraintes

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
  
  @@index([name])
  @@index([email, name])
  @@unique([email])
  @@map("users")
}
```

### Énumérations

```prisma
enum Role {
  USER
  ADMIN
  MODERATOR
}

enum Status {
  PENDING
  APPROVED
  REJECTED
}

model User {
  id     Int    @id @default(autoincrement())
  role   Role   @default(USER)
  status Status @default(PENDING)
}
```

---

## 🔄 Migrations

### Création de migrations

```bash
# Créer une migration
npx prisma migrate dev --name init

# Créer une migration sans appliquer
npx prisma migrate dev --create-only

# Appliquer les migrations en production
npx prisma migrate deploy
```

### Structure des migrations

```
prisma/
├── migrations/
│   ├── 20240101000000_init/
│   │   └── migration.sql
│   └── 20240102000000_add_user_table/
│       └── migration.sql
└── schema.prisma
```

### Gestion des migrations

```bash
# Voir le statut des migrations
npx prisma migrate status

# Réinitialiser la base de données
npx prisma migrate reset

# Résoudre les conflits
npx prisma migrate resolve --applied "20240101000000"
```

### Seeding (Données de test)

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Créer des utilisateurs de test
  await prisma.user.createMany({
    data: [
      { email: 'user1@example.com', name: 'User 1' },
      { email: 'user2@example.com', name: 'User 2' },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

```json
// package.json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

```bash
# Exécuter le seeding
npx prisma db seed
```

---

## 💾 Opérations CRUD

### Configuration du client

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Création (Create)

```typescript
// Créer un utilisateur
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John Doe',
    age: 30,
  },
})

// Créer plusieurs utilisateurs
const users = await prisma.user.createMany({
  data: [
    { email: 'user1@example.com', name: 'User 1' },
    { email: 'user2@example.com', name: 'User 2' },
  ],
})

// Créer avec des relations
const userWithPosts = await prisma.user.create({
  data: {
    email: 'author@example.com',
    name: 'Author',
    posts: {
      create: [
        { title: 'First Post', content: 'Content 1' },
        { title: 'Second Post', content: 'Content 2' },
      ],
    },
  },
  include: {
    posts: true,
  },
})
```

### Lecture (Read)

```typescript
// Trouver un utilisateur unique
const user = await prisma.user.findUnique({
  where: {
    id: 1,
  },
})

// Trouver par email
const user = await prisma.user.findUnique({
  where: {
    email: 'john@example.com',
  },
})

// Trouver le premier utilisateur
const firstUser = await prisma.user.findFirst({
  where: {
    name: {
      contains: 'John',
    },
  },
})

// Trouver plusieurs utilisateurs
const users = await prisma.user.findMany({
  where: {
    isActive: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
  take: 10,
  skip: 0,
})
```

### Mise à jour (Update)

```typescript
// Mettre à jour un utilisateur
const updatedUser = await prisma.user.update({
  where: {
    id: 1,
  },
  data: {
    name: 'John Updated',
    age: 31,
  },
})

// Mise à jour multiple
const updatedUsers = await prisma.user.updateMany({
  where: {
    isActive: false,
  },
  data: {
    isActive: true,
  },
})

// Upsert (créer ou mettre à jour)
const user = await prisma.user.upsert({
  where: {
    email: 'john@example.com',
  },
  update: {
    name: 'John Updated',
  },
  create: {
    email: 'john@example.com',
    name: 'John Doe',
  },
})
```

### Suppression (Delete)

```typescript
// Supprimer un utilisateur
const deletedUser = await prisma.user.delete({
  where: {
    id: 1,
  },
})

// Supprimer plusieurs utilisateurs
const deletedUsers = await prisma.user.deleteMany({
  where: {
    isActive: false,
  },
})

// Supprimer tous les utilisateurs
const deletedAll = await prisma.user.deleteMany()
```

---

## 🔍 Requêtes Avancées

### Filtrage et conditions

```typescript
// Conditions de base
const users = await prisma.user.findMany({
  where: {
    age: 25,                    // Égalité
    age: { gt: 18 },           // Plus grand que
    age: { gte: 18 },          // Plus grand ou égal
    age: { lt: 65 },           // Plus petit que
    age: { lte: 65 },          // Plus petit ou égal
    age: { in: [18, 25, 30] }, // Dans une liste
    age: { notIn: [18, 25] },  // Pas dans une liste
    name: { contains: 'John' }, // Contient
    name: { startsWith: 'J' },  // Commence par
    name: { endsWith: 'n' },    // Fini par
    email: { not: 'admin@example.com' }, // Différent
  },
})
```

### Requêtes complexes

```typescript
// Conditions OR
const users = await prisma.user.findMany({
  where: {
    OR: [
      { age: { lt: 18 } },
      { age: { gt: 65 } },
    ],
  },
})

// Conditions AND
const users = await prisma.user.findMany({
  where: {
    AND: [
      { isActive: true },
      { age: { gte: 18 } },
    ],
  },
})

// Conditions NOT
const users = await prisma.user.findMany({
  where: {
    NOT: {
      email: {
        contains: 'test',
      },
    },
  },
})
```

### Tri et pagination

```typescript
// Tri simple
const users = await prisma.user.findMany({
  orderBy: {
    createdAt: 'desc',
  },
})

// Tri multiple
const users = await prisma.user.findMany({
  orderBy: [
    { name: 'asc' },
    { createdAt: 'desc' },
  ],
})

// Pagination
const users = await prisma.user.findMany({
  skip: 20,  // Ignorer les 20 premiers
  take: 10,  // Prendre 10 résultats
})

// Pagination avec cursor
const users = await prisma.user.findMany({
  cursor: { id: 10 },
  take: 10,
  orderBy: { id: 'asc' },
})
```

### Agrégations

```typescript
// Compter les utilisateurs
const count = await prisma.user.count()

// Compter avec conditions
const activeCount = await prisma.user.count({
  where: {
    isActive: true,
  },
})

// Agrégations avancées
const stats = await prisma.user.aggregate({
  _count: {
    id: true,
  },
  _avg: {
    age: true,
  },
  _sum: {
    age: true,
  },
  _min: {
    age: true,
  },
  _max: {
    age: true,
  },
})

// Agrégation par groupe
const groupBy = await prisma.user.groupBy({
  by: ['isActive'],
  _count: {
    id: true,
  },
  _avg: {
    age: true,
  },
})
```

---

## 🔗 Relations

### Types de relations

#### Relation 1:1 (One-to-One)

```prisma
model User {
  id      Int     @id @default(autoincrement())
  email   String  @unique
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  avatar String?
  userId Int    @unique
  user   User   @relation(fields: [userId], references: [id])
}
```

#### Relation 1:N (One-to-Many)

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  posts Post[]
}

model Post {
  id     Int    @id @default(autoincrement())
  title  String
  content String?
  userId Int
  user   User @relation(fields: [userId], references: [id])
}
```

#### Relation N:N (Many-to-Many)

```prisma
model User {
  id    Int      @id @default(autoincrement())
  email String   @unique
  roles UserRole[]
}

model Role {
  id    Int      @id @default(autoincrement())
  name  String   @unique
  users UserRole[]
}

model UserRole {
  userId Int
  roleId Int
  user   User @relation(fields: [userId], references: [id])
  role   Role @relation(fields: [roleId], references: [id])

  @@id([userId, roleId])
}
```

### Requêtes avec relations

```typescript
// Inclure les relations
const userWithPosts = await prisma.user.findUnique({
  where: {
    id: 1,
  },
  include: {
    posts: true,
    profile: true,
  },
})

// Sélectionner des champs spécifiques
const userWithPosts = await prisma.user.findUnique({
  where: {
    id: 1,
  },
  select: {
    id: true,
    email: true,
    posts: {
      select: {
        id: true,
        title: true,
      },
    },
  },
})

// Filtrage sur les relations
const usersWithPosts = await prisma.user.findMany({
  where: {
    posts: {
      some: {
        published: true,
      },
    },
  },
  include: {
    posts: {
      where: {
        published: true,
      },
    },
  },
})
```

### Requêtes imbriquées

```typescript
// Créer avec relations imbriquées
const user = await prisma.user.create({
  data: {
    email: 'author@example.com',
    name: 'Author',
    posts: {
      create: [
        {
          title: 'Post 1',
          content: 'Content 1',
          comments: {
            create: [
              { content: 'Great post!' },
              { content: 'Thanks for sharing!' },
            ],
          },
        },
      ],
    },
  },
})

// Mettre à jour avec relations
const user = await prisma.user.update({
  where: {
    id: 1,
  },
  data: {
    posts: {
      create: {
        title: 'New Post',
        content: 'New content',
      },
    },
  },
})

// Connecter des relations existantes
const user = await prisma.user.update({
  where: {
    id: 1,
  },
  data: {
    posts: {
      connect: {
        id: 5,
      },
    },
  },
})
```

---

## 🏗️ Intégration NestJS

### Installation et configuration

```bash
# Installation
npm install @nestjs/config
npm install prisma @prisma/client
```

### Service Prisma

```typescript
// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }
}
```

### Module Prisma

```typescript
// src/prisma/prisma.module.ts
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

### Repository Pattern

```typescript
// src/users/users.repository.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    })
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        posts: true,
      },
    })
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
```

### Service utilisateur

```typescript
// src/users/users.service.ts
import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { CreateUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto)
  }

  async findAll() {
    return this.usersRepository.findAll()
  }

  async findOne(id: number) {
    return this.usersRepository.findOne(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    return this.usersRepository.remove(id)
  }
}
```

### Controller

```typescript
// src/users/users.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto, UpdateUserDto } from './dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
```

### DTOs avec validation

```typescript
// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsOptional, IsInt, Min } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  name: string

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number
}

// src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

### Gestion des erreurs

```typescript
// src/prisma/prisma-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Response } from 'express'

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT
        message = 'Resource already exists'
        break
      case 'P2025':
        status = HttpStatus.NOT_FOUND
        message = 'Resource not found'
        break
      default:
        message = exception.message
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.code,
    })
  }
}
```

---

## ✅ Tests

### Configuration des tests

```typescript
// src/test/prisma-test.module.ts
import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  providers: [
    {
      provide: PrismaService,
      useValue: {
        user: {
          create: jest.fn(),
          findMany: jest.fn(),
          findUnique: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
      },
    },
  ],
  exports: [PrismaService],
})
export class PrismaTestModule {}
```

### Tests unitaires

```typescript
// src/users/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { UsersRepository } from './users.repository'
import { PrismaService } from '../prisma/prisma.service'

describe('UsersService', () => {
  let service: UsersService
  let repository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get<UsersRepository>(UsersRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        age: 25,
      }

      const expectedUser = { id: 1, ...createUserDto }

      jest.spyOn(repository, 'create').mockResolvedValue(expectedUser)

      const result = await service.create(createUserDto)

      expect(result).toEqual(expectedUser)
      expect(repository.create).toHaveBeenCalledWith(createUserDto)
    })
  })
})
```

### Tests d'intégration

```typescript
// test/users.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { PrismaService } from '../src/prisma/prisma.service'

describe('Users (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    prisma = moduleFixture.get<PrismaService>(PrismaService)

    await app.init()
  })

  afterEach(async () => {
    await prisma.user.deleteMany()
    await app.close()
  })

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'test@example.com',
        name: 'Test User',
        age: 25,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id')
        expect(res.body.email).toBe('test@example.com')
      })
  })
})
```

---

## 🎯 Bonnes Pratiques

### Performance

```typescript
// ✅ Bon : Sélectionner seulement les champs nécessaires
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true,
  },
})

// ❌ Éviter : Récupérer tous les champs
const users = await prisma.user.findMany()

// ✅ Bon : Utiliser include avec parcimonie
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      select: {
        id: true,
        title: true,
      },
    },
  },
})

// ✅ Bon : Pagination pour les grandes listes
const users = await prisma.user.findMany({
  take: 20,
  skip: 0,
  orderBy: { createdAt: 'desc' },
})
```

### Gestion des erreurs

```typescript
// ✅ Bon : Gestion spécifique des erreurs Prisma
try {
  const user = await prisma.user.create({
    data: { email: 'existing@example.com' },
  })
} catch (error) {
  if (error.code === 'P2002') {
    throw new ConflictException('Email already exists')
  }
  throw new InternalServerErrorException()
}

// ✅ Bon : Utiliser les codes d'erreur Prisma
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

if (error instanceof PrismaClientKnownRequestError) {
  switch (error.code) {
    case 'P2002':
      // Constraint violation
      break
    case 'P2025':
      // Record not found
      break
  }
}
```

### Transactions

```typescript
// ✅ Bon : Utiliser les transactions pour les opérations complexes
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { email: 'user@example.com', name: 'User' },
  })

  const post = await tx.post.create({
    data: {
      title: 'First Post',
      content: 'Content',
      userId: user.id,
    },
  })

  return { user, post }
})

// ✅ Bon : Transactions avec rollback automatique
try {
  await prisma.$transaction(async (tx) => {
    // Opérations multiples
  })
} catch (error) {
  // Transaction automatiquement annulée
}
```

### Configuration de production

```typescript
// ✅ Bon : Configuration optimisée pour la production
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

// ✅ Bon : Connexion pool optimisée
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?connection_limit=20&pool_timeout=20',
    },
  },
})
```

### Sécurité

```typescript
// ✅ Bon : Validation des entrées
import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(2)
  name: string
}

// ✅ Bon : Échapper les requêtes SQL (automatique avec Prisma)
const users = await prisma.user.findMany({
  where: {
    name: {
      contains: searchTerm, // Automatiquement échappé
    },
  },
})

// ✅ Bon : Limiter les résultats
const users = await prisma.user.findMany({
  take: 100, // Limite de sécurité
})
```

---

## 📚 Ressources

### Documentation officielle
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

### Outils et extensions
- [Prisma Studio](https://www.prisma.io/studio) - Interface graphique
- [Prisma Extension pour VS Code](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [Prisma CLI](https://www.prisma.io/docs/reference/api-reference/command-reference)

### Communauté
- [Discord Prisma](https://pris.ly/discord)
- [GitHub Prisma](https://github.com/prisma/prisma)
- [Blog Prisma](https://www.prisma.io/blog)

### Exemples et tutoriels
- [Prisma Examples](https://github.com/prisma/prisma-examples)
- [NestJS + Prisma](https://docs.nestjs.com/recipes/prisma)
- [Next.js + Prisma](https://www.prisma.io/docs/getting-started/setup-nextjs)

---

*Cette documentation couvre les aspects essentiels de Prisma ORM pour développer des applications Node.js modernes avec un typage fort et une gestion de base de données efficace.*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

