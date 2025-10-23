# 🔷 Prisma ORM - Complete Guide

> **Prisma** is a modern ORM (Object-Relational Mapping) for TypeScript and Node.js that simplifies database access with strong typing and an intuitive API.

## 📋 Table of Contents
- [🚀 Introduction](#-introduction)
- [⚙️ Installation and Setup](#️-installation-and-setup)
- [📊 Schema Definition](#-schema-definition)
- [🔄 Migrations](#-migrations)
- [💾 CRUD Operations](#-crud-operations)
- [🔍 Advanced Queries](#-advanced-queries)
- [🔗 Relations](#-relations)
- [🏗️ NestJS Integration](#️-nestjs-integration)
- [✅ Testing](#-testing)
- [🎯 Best Practices](#-best-practices)
- [📚 Resources](#-resources)

---

## 🚀 Introduction

### What is Prisma?

Prisma is a next-generation ORM that offers:
- **Strong typing**: Native TypeScript with auto-completion
- **Intuitive API**: Simple and expressive syntax
- **Client generator**: Type-safe client generated automatically
- **Automatic migration**: Schema change management
- **Multi-database**: Support for PostgreSQL, MySQL, SQLite, MongoDB

### Advantages over other ORMs

| Aspect | Prisma | TypeORM | Mongoose |
|--------|--------|---------|----------|
| **Typing** | Native TypeScript | Optional TypeScript | JavaScript |
| **API** | Modern and intuitive | Decorators | Callbacks/Promises |
| **Performance** | Optimized | Good | Good |
| **Migration** | Automatic | Manual | Manual |
| **Learning Curve** | Easy | Medium | Medium |

### When to use Prisma?

✅ **Use Prisma when:**
- TypeScript/Node.js project
- Need for strong typing
- Relational database
- Team with different experience levels
- Project requiring frequent migrations

❌ **Don't use Prisma when:**
- NoSQL database only (except MongoDB)
- Very simple project without complex relations
- Need for very specific SQL queries

---

## ⚙️ Installation and Setup

### Installation

```bash
# Install Prisma
npm install prisma @prisma/client

# Install in dev
npm install -D prisma
```

### Initialization

```bash
# Initialize Prisma
npx prisma init

# Or with specific provider
npx prisma init --datasource-provider postgresql
```

### Database Configuration

```bash
# .env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

**Supported providers:**
- PostgreSQL: `postgresql://`
- MySQL: `mysql://`
- SQLite: `file:./dev.db`
- MongoDB: `mongodb://`
- SQL Server: `sqlserver://`

### Schema Configuration

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

## 📊 Schema Definition

### Prisma Data Types

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

### Available Field Types

| Type | Description | Example |
|------|-------------|---------|
| `String` | Text | `"Hello World"` |
| `Int` | 32-bit integer | `42` |
| `BigInt` | 64-bit integer | `9007199254740991` |
| `Float` | Decimal number | `3.14` |
| `Decimal` | Precise decimal | `3.14159` |
| `Boolean` | Boolean | `true` |
| `DateTime` | Date and time | `2024-01-01T00:00:00Z` |
| `Json` | JSON | `{"key": "value"}` |
| `Bytes` | Binary data | `[1, 2, 3]` |

### Field Attributes

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

### Available Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| `@id` | Primary key | `@id` |
| `@unique` | Unique value | `@unique` |
| `@default(value)` | Default value | `@default(0)` |
| `@map("name")` | Database name | `@map("user_name")` |
| `@updatedAt` | Auto update | `@updatedAt` |
| `@db.VarChar(255)` | Specific DB type | `@db.VarChar(255)` |

### Indexes and Constraints

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

### Enums

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

### Creating Migrations

```bash
# Create a migration
npx prisma migrate dev --name init

# Create migration without applying
npx prisma migrate dev --create-only

# Apply migrations in production
npx prisma migrate deploy
```

### Migration Structure

```
prisma/
├── migrations/
│   ├── 20240101000000_init/
│   │   └── migration.sql
│   └── 20240102000000_add_user_table/
│       └── migration.sql
└── schema.prisma
```

### Migration Management

```bash
# Check migration status
npx prisma migrate status

# Reset database
npx prisma migrate reset

# Resolve conflicts
npx prisma migrate resolve --applied "20240101000000"
```

### Seeding (Test Data)

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test users
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
# Run seeding
npx prisma db seed
```

---

## 💾 CRUD Operations

### Client Configuration

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Create

```typescript
// Create a user
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John Doe',
    age: 30,
  },
})

// Create multiple users
const users = await prisma.user.createMany({
  data: [
    { email: 'user1@example.com', name: 'User 1' },
    { email: 'user2@example.com', name: 'User 2' },
  ],
})

// Create with relations
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

### Read

```typescript
// Find unique user
const user = await prisma.user.findUnique({
  where: {
    id: 1,
  },
})

// Find by email
const user = await prisma.user.findUnique({
  where: {
    email: 'john@example.com',
  },
})

// Find first user
const firstUser = await prisma.user.findFirst({
  where: {
    name: {
      contains: 'John',
    },
  },
})

// Find multiple users
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

### Update

```typescript
// Update user
const updatedUser = await prisma.user.update({
  where: {
    id: 1,
  },
  data: {
    name: 'John Updated',
    age: 31,
  },
})

// Update multiple users
const updatedUsers = await prisma.user.updateMany({
  where: {
    isActive: false,
  },
  data: {
    isActive: true,
  },
})

// Upsert (create or update)
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

### Delete

```typescript
// Delete user
const deletedUser = await prisma.user.delete({
  where: {
    id: 1,
  },
})

// Delete multiple users
const deletedUsers = await prisma.user.deleteMany({
  where: {
    isActive: false,
  },
})

// Delete all users
const deletedAll = await prisma.user.deleteMany()
```

---

## 🔍 Advanced Queries

### Filtering and Conditions

```typescript
// Basic conditions
const users = await prisma.user.findMany({
  where: {
    age: 25,                    // Equality
    age: { gt: 18 },           // Greater than
    age: { gte: 18 },          // Greater than or equal
    age: { lt: 65 },           // Less than
    age: { lte: 65 },          // Less than or equal
    age: { in: [18, 25, 30] }, // In list
    age: { notIn: [18, 25] },  // Not in list
    name: { contains: 'John' }, // Contains
    name: { startsWith: 'J' },  // Starts with
    name: { endsWith: 'n' },    // Ends with
    email: { not: 'admin@example.com' }, // Different
  },
})
```

### Complex Queries

```typescript
// OR conditions
const users = await prisma.user.findMany({
  where: {
    OR: [
      { age: { lt: 18 } },
      { age: { gt: 65 } },
    ],
  },
})

// AND conditions
const users = await prisma.user.findMany({
  where: {
    AND: [
      { isActive: true },
      { age: { gte: 18 } },
    ],
  },
})

// NOT conditions
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

### Sorting and Pagination

```typescript
// Simple sorting
const users = await prisma.user.findMany({
  orderBy: {
    createdAt: 'desc',
  },
})

// Multiple sorting
const users = await prisma.user.findMany({
  orderBy: [
    { name: 'asc' },
    { createdAt: 'desc' },
  ],
})

// Pagination
const users = await prisma.user.findMany({
  skip: 20,  // Skip first 20
  take: 10,  // Take 10 results
})

// Cursor pagination
const users = await prisma.user.findMany({
  cursor: { id: 10 },
  take: 10,
  orderBy: { id: 'asc' },
})
```

### Aggregations

```typescript
// Count users
const count = await prisma.user.count()

// Count with conditions
const activeCount = await prisma.user.count({
  where: {
    isActive: true,
  },
})

// Advanced aggregations
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

// Group by aggregation
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

### Relation Types

#### 1:1 (One-to-One) Relation

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

#### 1:N (One-to-Many) Relation

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

#### N:N (Many-to-Many) Relation

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

### Queries with Relations

```typescript
// Include relations
const userWithPosts = await prisma.user.findUnique({
  where: {
    id: 1,
  },
  include: {
    posts: true,
    profile: true,
  },
})

// Select specific fields
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

// Filter on relations
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

### Nested Queries

```typescript
// Create with nested relations
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

// Update with relations
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

// Connect existing relations
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

## 🏗️ NestJS Integration

### Installation and Setup

```bash
# Installation
npm install @nestjs/config
npm install prisma @prisma/client
```

### Prisma Service

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

### Prisma Module

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

### User Service

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

### DTOs with Validation

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

### Error Handling

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

## ✅ Testing

### Test Configuration

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

### Unit Tests

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

### Integration Tests

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

## 🎯 Best Practices

### Performance

```typescript
// ✅ Good: Select only necessary fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true,
  },
})

// ❌ Avoid: Fetch all fields
const users = await prisma.user.findMany()

// ✅ Good: Use include sparingly
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

// ✅ Good: Pagination for large lists
const users = await prisma.user.findMany({
  take: 20,
  skip: 0,
  orderBy: { createdAt: 'desc' },
})
```

### Error Handling

```typescript
// ✅ Good: Specific Prisma error handling
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

// ✅ Good: Use Prisma error codes
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
// ✅ Good: Use transactions for complex operations
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

// ✅ Good: Transactions with automatic rollback
try {
  await prisma.$transaction(async (tx) => {
    // Multiple operations
  })
} catch (error) {
  // Transaction automatically rolled back
}
```

### Production Configuration

```typescript
// ✅ Good: Production optimized configuration
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

// ✅ Good: Optimized connection pool
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?connection_limit=20&pool_timeout=20',
    },
  },
})
```

### Security

```typescript
// ✅ Good: Input validation
import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(2)
  name: string
}

// ✅ Good: SQL injection prevention (automatic with Prisma)
const users = await prisma.user.findMany({
  where: {
    name: {
      contains: searchTerm, // Automatically escaped
    },
  },
})

// ✅ Good: Limit results
const users = await prisma.user.findMany({
  take: 100, // Security limit
})
```

---

## 📚 Resources

### Official Documentation
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

### Tools and Extensions
- [Prisma Studio](https://www.prisma.io/studio) - Graphical interface
- [Prisma Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [Prisma CLI](https://www.prisma.io/docs/reference/api-reference/command-reference)

### Community
- [Prisma Discord](https://pris.ly/discord)
- [GitHub Prisma](https://github.com/prisma/prisma)
- [Prisma Blog](https://www.prisma.io/blog)

### Examples and Tutorials
- [Prisma Examples](https://github.com/prisma/prisma-examples)
- [NestJS + Prisma](https://docs.nestjs.com/recipes/prisma)
- [Next.js + Prisma](https://www.prisma.io/docs/getting-started/setup-nextjs)

---

*This documentation covers the essential aspects of Prisma ORM for developing modern Node.js applications with strong typing and efficient database management.*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

