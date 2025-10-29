# 🔧 Architecture Backend : Structure et Patterns

## 📋 Table des matières
- [Introduction](#introduction)
- [Structure des dossiers](#structure-des-dossiers)
- [Couches applicatives](#couches-applicatives)
- [Architecture hexagonale](#architecture-hexagonale)
- [Patterns de conception](#patterns-de-conception)
- [Gestion des dépendances](#gestion-des-dépendances)
- [Configuration et environnements](#configuration-et-environnements)
- [Exemples concrets](#exemples-concrets)
- [Templates d'architecture](#templates-darchitecture)
- [Checklist de validation](#checklist-de-validation)
- [Ressources](#ressources)

## 🎯 Introduction

L'architecture backend définit l'organisation du code, la séparation des responsabilités et les patterns qui guident le développement d'une application serveur robuste et maintenable.

### 🎯 Objectifs

- **Structurer** le code de manière logique et maintenable
- **Séparer** les responsabilités selon les couches
- **Appliquer** les patterns de conception appropriés
- **Gérer** les dépendances et l'injection
- **Configurer** les environnements de développement

---

## 📁 Structure des dossiers

### 📊 Approches d'organisation

| Approche | Description | Avantages | Inconvénients | Cas d'usage |
|----------|-------------|-----------|---------------|-------------|
| **Par couche** | Organisation par type de composant | Simplicité, séparation claire | Couplage entre features | Applications simples |
| **Par feature** | Organisation par fonctionnalité | Cohésion, évolutivité | Duplication possible | Applications complexes |
| **Hybride** | Combinaison des deux approches | Flexibilité, optimisation | Complexité de navigation | Applications évolutives |

### 🔍 Structures détaillées

#### Structure par couche

```
src/
├── controllers/          # Couche de présentation
│   ├── user.controller.ts
│   ├── product.controller.ts
│   └── order.controller.ts
├── services/             # Couche métier
│   ├── user.service.ts
│   ├── product.service.ts
│   └── order.service.ts
├── repositories/         # Couche d'accès aux données
│   ├── user.repository.ts
│   ├── product.repository.ts
│   └── order.repository.ts
├── models/               # Modèles de données
│   ├── user.model.ts
│   ├── product.model.ts
│   └── order.model.ts
├── middleware/           # Middleware
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   └── error.middleware.ts
├── utils/                # Utilitaires
│   ├── logger.ts
│   ├── validation.ts
│   └── helpers.ts
├── config/               # Configuration
│   ├── database.ts
│   ├── redis.ts
│   └── app.ts
└── types/                # Types TypeScript
    ├── user.types.ts
    ├── product.types.ts
    └── common.types.ts
```

#### Structure par feature

```
src/
├── features/
│   ├── user/
│   │   ├── controllers/
│   │   │   └── user.controller.ts
│   │   ├── services/
│   │   │   └── user.service.ts
│   │   ├── repositories/
│   │   │   └── user.repository.ts
│   │   ├── models/
│   │   │   └── user.model.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── interfaces/
│   │   │   └── user.interface.ts
│   │   └── user.module.ts
│   ├── product/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── dto/
│   │   ├── interfaces/
│   │   └── product.module.ts
│   └── order/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── models/
│       ├── dto/
│       ├── interfaces/
│       └── order.module.ts
├── shared/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── types/
│   └── constants/
└── app.module.ts
```

#### Structure hybride

```
src/
├── core/                 # Fonctionnalités core
│   ├── auth/
│   ├── user/
│   └── organization/
├── modules/              # Modules métier
│   ├── product/
│   ├── order/
│   └── payment/
├── shared/               # Code partagé
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── types/
│   └── constants/
├── infrastructure/       # Infrastructure
│   ├── database/
│   ├── cache/
│   ├── external/
│   └── monitoring/
└── app.module.ts
```

---

## 🏗️ Couches applicatives

### 📝 Architecture en couches

#### Couche de présentation (Controllers)

**Responsabilités**
- Réception des requêtes HTTP
- Validation des données d'entrée
- Orchestration des appels aux services
- Formatage des réponses
- Gestion des erreurs HTTP

**Exemple NestJS**
```typescript
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async getUsers(@Query() query: GetUsersQueryDto): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll(query);
    return users.map(user => new UserResponseDto(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);
    return new UserResponseDto(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.create(createUserDto);
    return new UserResponseDto(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    const user = await this.userService.update(id, updateUserDto);
    return new UserResponseDto(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
```

#### Couche métier (Services)

**Responsabilités**
- Logique métier de l'application
- Orchestration des opérations complexes
- Validation des règles métier
- Gestion des transactions
- Coordination entre repositories

**Exemple NestJS**
```typescript
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { User } from '../models/user.model';
import { EmailService } from '../services/email.service';
import { PasswordService } from '../services/password.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly passwordService: PasswordService
  ) {}

  async findAll(query: GetUsersQueryDto): Promise<User[]> {
    const { page, limit, search, sortBy, sortOrder } = query;
    
    const filters = this.buildFilters(search);
    const sortOptions = this.buildSortOptions(sortBy, sortOrder);
    
    return this.userRepository.findAll(filters, sortOptions, page, limit);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hasher le mot de passe
    const hashedPassword = await this.passwordService.hash(createUserDto.password);

    // Créer l'utilisateur
    const userData = {
      ...createUserDto,
      password: hashedPassword,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const user = await this.userRepository.create(userData);

    // Envoyer l'email de bienvenue
    await this.emailService.sendWelcomeEmail(user.email, user.name);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    // Vérifier si l'email est modifié et s'il existe déjà
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    // Hasher le nouveau mot de passe s'il est fourni
    if (updateUserDto.password) {
      updateUserDto.password = await this.passwordService.hash(updateUserDto.password);
    }

    const updatedUser = await this.userRepository.update(id, {
      ...updateUserDto,
      updatedAt: new Date()
    });

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.delete(id);
    
    // Envoyer un email de confirmation de suppression
    await this.emailService.sendAccountDeletedEmail(user.email, user.name);
  }

  private buildFilters(search?: string): any {
    const filters: any = {};
    
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    return filters;
  }

  private buildSortOptions(sortBy?: string, sortOrder?: string): any {
    const sort: any = {};
    
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1; // Par défaut, trier par date de création décroissante
    }
    
    return sort;
  }
}
```

#### Couche d'accès aux données (Repositories)

**Responsabilités**
- Abstraction de l'accès aux données
- Implémentation des requêtes
- Gestion de la persistance
- Optimisation des performances
- Gestion des transactions

**Exemple avec Prisma**
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filters: any,
    sortOptions: any,
    page: number,
    limit: number
  ): Promise<User[]> {
    return this.prisma.user.findMany({
      where: filters,
      orderBy: sortOptions,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        profile: true,
        roles: true
      }
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        roles: true
      }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        roles: true
      }
    });
  }

  async create(userData: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...userData,
        profile: {
          create: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone
          }
        }
      },
      include: {
        profile: true,
        roles: true
      }
    });
  }

  async update(id: string, userData: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: userData,
      include: {
        profile: true,
        roles: true
      }
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
      include: {
        profile: true,
        roles: true
      }
    });
  }

  async count(filters: any): Promise<number> {
    return this.prisma.user.count({
      where: filters
    });
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        id: {
          in: ids
        }
      },
      include: {
        profile: true,
        roles: true
      }
    });
  }

  async updateLastLogin(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        lastLoginAt: new Date()
      }
    });
  }
}
```

---

## 🔄 Architecture hexagonale

### 🎯 Principe

L'architecture hexagonale (Ports and Adapters) isole le domaine métier des détails d'implémentation en utilisant des ports et des adaptateurs.

### 🏗️ Structure hexagonale

![Diagramme Mermaid](https://raw.githubusercontent.com/jclaudan/jclaudan/main/assets/mermaid/backend-architecture-0-fr-methodology-03-architecture-backend-architecture.png)

### 📝 Implémentation

#### Domain Core

**Entities**
```typescript
// src/domain/entities/user.entity.ts
export class User {
  constructor(
    private readonly id: string,
    private readonly email: string,
    private readonly name: string,
    private readonly password: string,
    private readonly roles: string[],
    private readonly createdAt: Date,
    private readonly updatedAt: Date
  ) {}

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getRoles(): string[] {
    return this.roles;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  canAccess(resource: string, action: string): boolean {
    // Logique métier pour déterminer l'accès
    return this.roles.some(role => this.checkPermission(role, resource, action));
  }

  private checkPermission(role: string, resource: string, action: string): boolean {
    // Logique de vérification des permissions
    const permissions = {
      admin: ['*:*'],
      user: ['read:profile', 'update:profile'],
      guest: ['read:public']
    };

    const rolePermissions = permissions[role] || [];
    return rolePermissions.some(permission => {
      if (permission === '*:*') return true;
      const [permissionAction, permissionResource] = permission.split(':');
      return permissionAction === action && permissionResource === resource;
    });
  }

  isEmailVerified(): boolean {
    // Logique métier pour vérifier l'email
    return true; // Simplifié pour l'exemple
  }

  updateLastLogin(): User {
    return new User(
      this.id,
      this.email,
      this.name,
      this.password,
      this.roles,
      this.createdAt,
      new Date()
    );
  }
}
```

**Use Cases**
```typescript
// src/domain/use-cases/user.use-case.ts
import { User } from '../entities/user.entity';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { EmailServicePort } from '../ports/email.service.port';
import { PasswordServicePort } from '../ports/password.service.port';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly emailService: EmailServicePort,
    private readonly passwordService: PasswordServicePort
  ) {}

  async execute(userData: CreateUserData): Promise<User> {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hasher le mot de passe
    const hashedPassword = await this.passwordService.hash(userData.password);

    // Créer l'utilisateur
    const user = new User(
      this.generateId(),
      userData.email,
      userData.name,
      hashedPassword,
      userData.roles || ['user'],
      new Date(),
      new Date()
    );

    // Sauvegarder l'utilisateur
    const savedUser = await this.userRepository.save(user);

    // Envoyer l'email de bienvenue
    await this.emailService.sendWelcomeEmail(savedUser.getEmail(), savedUser.getName());

    return savedUser;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }
}

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly passwordService: PasswordServicePort
  ) {}

  async execute(id: string, userData: UpdateUserData): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Vérifier si l'email est modifié et s'il existe déjà
    if (userData.email && userData.email !== user.getEmail()) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
    }

    // Créer un nouvel utilisateur avec les données mises à jour
    const updatedUser = new User(
      user.getId(),
      userData.email || user.getEmail(),
      userData.name || user.getName(),
      userData.password ? await this.passwordService.hash(userData.password) : user.getPassword(),
      userData.roles || user.getRoles(),
      user.getCreatedAt(),
      new Date()
    );

    return this.userRepository.save(updatedUser);
  }
}
```

#### Ports

**Input Ports**
```typescript
// src/domain/ports/user.controller.port.ts
export interface UserControllerPort {
  createUser(userData: CreateUserData): Promise<UserResponse>;
  getUser(id: string): Promise<UserResponse>;
  updateUser(id: string, userData: UpdateUserData): Promise<UserResponse>;
  deleteUser(id: string): Promise<void>;
}
```

**Output Ports**
```typescript
// src/domain/ports/user.repository.port.ts
import { User } from '../entities/user.entity';

export interface UserRepositoryPort {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
}

// src/domain/ports/email.service.port.ts
export interface EmailServicePort {
  sendWelcomeEmail(email: string, name: string): Promise<void>;
  sendPasswordResetEmail(email: string, token: string): Promise<void>;
}

// src/domain/ports/password.service.port.ts
export interface PasswordServicePort {
  hash(password: string): Promise<string>;
  verify(password: string, hash: string): Promise<boolean>;
}
```

#### Adapters

**Web Controller Adapter**
```typescript
// src/adapters/web/user.controller.adapter.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserControllerPort } from '../../domain/ports/user.controller.port';
import { CreateUserUseCase } from '../../domain/use-cases/user.use-case';

@Controller('users')
export class UserControllerAdapter implements UserControllerPort {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Post()
  async createUser(@Body() userData: CreateUserData): Promise<UserResponse> {
    const user = await this.createUserUseCase.execute(userData);
    return this.mapToResponse(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.getUserUseCase.execute(id);
    return this.mapToResponse(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UpdateUserData
  ): Promise<UserResponse> {
    const user = await this.updateUserUseCase.execute(id, userData);
    return this.mapToResponse(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }

  private mapToResponse(user: User): UserResponse {
    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      roles: user.getRoles(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt()
    };
  }
}
```

**Database Adapter**
```typescript
// src/adapters/database/user.repository.adapter.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    const userData = {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      password: user.getPassword(),
      roles: user.getRoles(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt()
    };

    const savedUser = await this.prisma.user.upsert({
      where: { id: user.getId() },
      update: userData,
      create: userData
    });

    return this.mapToEntity(savedUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    return user ? this.mapToEntity(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    return user ? this.mapToEntity(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => this.mapToEntity(user));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    });
  }

  private mapToEntity(userData: any): User {
    return new User(
      userData.id,
      userData.email,
      userData.name,
      userData.password,
      userData.roles,
      userData.createdAt,
      userData.updatedAt
    );
  }
}
```

---

## 🎨 Patterns de conception

### 📝 Patterns fondamentaux

#### Repository Pattern

**Principe**
Abstraction de l'accès aux données avec une interface uniforme.

```typescript
// Interface du repository
interface Repository<T, ID> {
  save(entity: T): Promise<T>;
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: ID, entity: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
}

// Implémentation concrète
class UserRepository implements Repository<User, string> {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: userData
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
```

#### Factory Pattern

**Principe**
Création d'objets sans exposer la logique de création.

```typescript
// Interface de la factory
interface UserFactory {
  createUser(userData: CreateUserData): User;
  createAdminUser(userData: CreateUserData): User;
  createGuestUser(userData: CreateUserData): User;
}

// Implémentation de la factory
class UserFactoryImpl implements UserFactory {
  createUser(userData: CreateUserData): User {
    return new User(
      this.generateId(),
      userData.email,
      userData.name,
      userData.password,
      ['user'],
      new Date(),
      new Date()
    );
  }

  createAdminUser(userData: CreateUserData): User {
    return new User(
      this.generateId(),
      userData.email,
      userData.name,
      userData.password,
      ['admin', 'user'],
      new Date(),
      new Date()
    );
  }

  createGuestUser(userData: CreateUserData): User {
    return new User(
      this.generateId(),
      userData.email,
      userData.name,
      userData.password,
      ['guest'],
      new Date(),
      new Date()
    );
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
```

#### Strategy Pattern

**Principe**
Définition d'une famille d'algorithmes, les encapsuler et les rendre interchangeables.

```typescript
// Interface de la stratégie
interface PaymentStrategy {
  processPayment(amount: number, paymentData: any): Promise<PaymentResult>;
}

// Implémentations concrètes
class CreditCardStrategy implements PaymentStrategy {
  async processPayment(amount: number, paymentData: any): Promise<PaymentResult> {
    // Logique de paiement par carte de crédit
    return {
      success: true,
      transactionId: this.generateTransactionId(),
      amount
    };
  }

  private generateTransactionId(): string {
    return `cc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

class PayPalStrategy implements PaymentStrategy {
  async processPayment(amount: number, paymentData: any): Promise<PaymentResult> {
    // Logique de paiement PayPal
    return {
      success: true,
      transactionId: this.generateTransactionId(),
      amount
    };
  }

  private generateTransactionId(): string {
    return `pp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

class StripeStrategy implements PaymentStrategy {
  async processPayment(amount: number, paymentData: any): Promise<PaymentResult> {
    // Logique de paiement Stripe
    return {
      success: true,
      transactionId: this.generateTransactionId(),
      amount
    };
  }

  private generateTransactionId(): string {
    return `stripe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Context qui utilise la stratégie
class PaymentService {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  async processPayment(amount: number, paymentData: any): Promise<PaymentResult> {
    return this.strategy.processPayment(amount, paymentData);
  }
}
```

#### Observer Pattern

**Principe**
Définition d'une dépendance un-à-plusieurs entre objets.

```typescript
// Interface de l'observateur
interface Observer {
  update(event: string, data: any): void;
}

// Interface du sujet observable
interface Observable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(event: string, data: any): void;
}

// Implémentation du sujet observable
class EventEmitter implements Observable {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(event: string, data: any): void {
    this.observers.forEach(observer => observer.update(event, data));
  }
}

// Implémentation des observateurs
class EmailNotificationService implements Observer {
  update(event: string, data: any): void {
    if (event === 'user.created') {
      this.sendWelcomeEmail(data.user.email, data.user.name);
    } else if (event === 'user.deleted') {
      this.sendAccountDeletedEmail(data.user.email, data.user.name);
    }
  }

  private async sendWelcomeEmail(email: string, name: string): Promise<void> {
    // Logique d'envoi d'email de bienvenue
    console.log(`Sending welcome email to ${email} for user ${name}`);
  }

  private async sendAccountDeletedEmail(email: string, name: string): Promise<void> {
    // Logique d'envoi d'email de suppression de compte
    console.log(`Sending account deleted email to ${email} for user ${name}`);
  }
}

class AuditService implements Observer {
  update(event: string, data: any): void {
    this.logEvent(event, data);
  }

  private logEvent(event: string, data: any): void {
    console.log(`Audit log: ${event}`, {
      timestamp: new Date().toISOString(),
      event,
      data
    });
  }
}

// Utilisation
const eventEmitter = new EventEmitter();
const emailService = new EmailNotificationService();
const auditService = new AuditService();

eventEmitter.subscribe(emailService);
eventEmitter.subscribe(auditService);

// Émission d'événements
eventEmitter.notify('user.created', { user: { email: 'user@example.com', name: 'John Doe' } });
eventEmitter.notify('user.deleted', { user: { email: 'user@example.com', name: 'John Doe' } });
```

#### Singleton Pattern

**Principe**
Assurer qu'une classe n'a qu'une seule instance et fournir un point d'accès global.

```typescript
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: any;

  private constructor() {
    // Initialisation de la connexion
    this.connection = this.initializeConnection();
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getConnection(): any {
    return this.connection;
  }

  private initializeConnection(): any {
    // Logique d'initialisation de la connexion
    return {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      connected: true
    };
  }
}

// Utilisation
const dbConnection = DatabaseConnection.getInstance();
const connection = dbConnection.getConnection();
```

---

## 🔗 Gestion des dépendances

### 📝 Injection de dépendances

#### Principe

L'injection de dépendances permet de découpler les classes de leurs dépendances en les injectant depuis l'extérieur.

#### Implémentation avec NestJS

**Module avec injection**
```typescript
// user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { PrismaModule } from '../shared/prisma.module';
import { EmailModule } from '../shared/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class UserModule {}
```

**Service avec injection**
```typescript
// user.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { EmailService } from '../shared/services/email.service';
import { PasswordService } from '../shared/services/password.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly passwordService: PasswordService
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    // Logique métier
    const hashedPassword = await this.passwordService.hash(userData.password);
    
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    await this.emailService.sendWelcomeEmail(user.email, user.name);
    
    return user;
  }
}
```

#### Implémentation manuelle

**Container de dépendances**
```typescript
class DIContainer {
  private services: Map<string, any> = new Map();
  private factories: Map<string, () => any> = new Map();

  register<T>(name: string, service: T): void {
    this.services.set(name, service);
  }

  registerFactory<T>(name: string, factory: () => T): void {
    this.factories.set(name, factory);
  }

  resolve<T>(name: string): T {
    if (this.services.has(name)) {
      return this.services.get(name);
    }

    if (this.factories.has(name)) {
      const factory = this.factories.get(name);
      const service = factory();
      this.services.set(name, service);
      return service;
    }

    throw new Error(`Service ${name} not found`);
  }
}

// Utilisation
const container = new DIContainer();

// Enregistrement des services
container.register('userRepository', new UserRepository());
container.register('emailService', new EmailService());
container.register('passwordService', new PasswordService());

// Enregistrement d'une factory
container.registerFactory('userService', () => {
  const userRepository = container.resolve('userRepository');
  const emailService = container.resolve('emailService');
  const passwordService = container.resolve('passwordService');
  
  return new UserService(userRepository, emailService, passwordService);
});

// Résolution des dépendances
const userService = container.resolve('userService');
```

---

## ⚙️ Configuration et environnements

### 📝 Gestion des environnements

#### Configuration avec NestJS

**Configuration module**
```typescript
// config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.config';
import { RedisConfig } from './redis.config';
import { EmailConfig } from './email.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DatabaseConfig, RedisConfig, EmailConfig],
      envFilePath: ['.env.local', '.env']
    })
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
```

**Configuration de base de données**
```typescript
// config/database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'myapp',
  ssl: process.env.DB_SSL === 'true',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true'
}));
```

**Configuration Redis**
```typescript
// config/redis.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB, 10) || 0,
  ttl: parseInt(process.env.REDIS_TTL, 10) || 3600
}));
```

**Configuration email**
```typescript
// config/email.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT, 10) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  from: process.env.EMAIL_FROM || 'noreply@example.com'
}));
```

#### Variables d'environnement

**Fichier .env**
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=myapp
DB_SSL=false
DB_SYNCHRONIZE=true
DB_LOGGING=true

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
REDIS_TTL=3600

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=noreply@example.com

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# App
APP_PORT=3000
APP_ENV=development
APP_URL=http://localhost:3000
```

**Fichier .env.example**
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=myapp
DB_SSL=false
DB_SYNCHRONIZE=true
DB_LOGGING=true

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
REDIS_TTL=3600

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=noreply@example.com

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# App
APP_PORT=3000
APP_ENV=development
APP_URL=http://localhost:3000
```

---

## 💡 Exemples concrets

### 🏗️ Architecture complète avec NestJS

#### Structure du projet

```
src/
├── app.module.ts
├── main.ts
├── features/
│   ├── user/
│   │   ├── controllers/
│   │   │   └── user.controller.ts
│   │   ├── services/
│   │   │   └── user.service.ts
│   │   ├── repositories/
│   │   │   └── user.repository.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   ├── update-user.dto.ts
│   │   │   └── user-response.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── interfaces/
│   │   │   └── user.interface.ts
│   │   └── user.module.ts
│   ├── product/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── interfaces/
│   │   └── product.module.ts
│   └── order/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── dto/
│       ├── entities/
│       ├── interfaces/
│       └── order.module.ts
├── shared/
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── services/
│   │   ├── email.service.ts
│   │   ├── password.service.ts
│   │   └── jwt.service.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validation.ts
│   │   └── helpers.ts
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   └── email.config.ts
│   ├── types/
│   │   ├── common.types.ts
│   │   └── response.types.ts
│   └── constants/
│       ├── error.constants.ts
│       └── app.constants.ts
└── infrastructure/
    ├── database/
    │   ├── prisma.service.ts
    │   └── migrations/
    ├── cache/
    │   └── redis.service.ts
    ├── external/
    │   └── stripe.service.ts
    └── monitoring/
        └── logger.service.ts
```

#### Module principal

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import { ProductModule } from './features/product/product.module';
import { OrderModule } from './features/order/order.module';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { RedisModule } from './infrastructure/cache/redis.module';
import { EmailModule } from './shared/services/email.module';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env']
    }),
    PrismaModule,
    RedisModule,
    EmailModule,
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule
  ]
})
export class AppModule {}
```

#### Service principal

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from './shared/utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration globale
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  // Configuration CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
  });

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Démarrage du serveur
  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
  
  Logger.log(`Application is running on: http://localhost:${port}`);
  Logger.log(`API documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
```

---

## 📋 Templates d'architecture

### 🏗️ Template d'architecture monolithe

![Diagramme Mermaid](https://raw.githubusercontent.com/jclaudan/jclaudan/main/assets/mermaid/backend-architecture-1-fr-methodology-03-architecture-backend-architecture.png)

### 🏗️ Template d'architecture microservices

![Diagramme Mermaid](https://raw.githubusercontent.com/jclaudan/jclaudan/main/assets/mermaid/backend-architecture-2-fr-methodology-03-architecture-backend-architecture.png)

### 🏗️ Template d'architecture hexagonale

![Diagramme Mermaid](https://raw.githubusercontent.com/jclaudan/jclaudan/main/assets/mermaid/backend-architecture-3-fr-methodology-03-architecture-backend-architecture.png)

---

## ✅ Checklist de validation

### 📋 Structure du projet

- [ ] **Organisation des dossiers** claire et logique
- [ ] **Séparation des responsabilités** respectée
- [ ] **Couches applicatives** bien définies
- [ ] **Patterns d'architecture** appliqués
- [ ] **Gestion des dépendances** implémentée

### 📋 Qualité du code

- [ ] **Standards de code** respectés
- [ ] **Documentation** complète
- [ ] **Tests** implémentés
- [ ] **Gestion des erreurs** robuste
- [ ] **Performance** optimisée

### 📋 Architecture

- [ ] **Scalabilité** de l'architecture évaluée
- [ ] **Maintenabilité** de l'architecture validée
- [ ] **Évolutivité** de l'architecture assurée
- [ ] **Sécurité** de l'architecture intégrée
- [ ] **Monitoring** de l'architecture mis en place

### 📋 Configuration

- [ ] **Environnements** configurés
- [ ] **Variables d'environnement** définies
- [ ] **Configuration de base de données** validée
- [ ] **Configuration de cache** validée
- [ ] **Configuration d'email** validée

---

## 📚 Ressources

### 🎓 Formation
- [Architecture globale](./global-architecture.md)
- [Architecture frontend](./frontend-architecture.md)
- [Architecture base de données](./database-architecture.md)
- [NestJS](../../nestjs/README.md)

### 🛠️ Outils
- [NestJS](https://nestjs.com/) - Framework Node.js
- [Prisma](https://www.prisma.io/) - ORM TypeScript
- [TypeScript](https://www.typescriptlang.org/) - Langage de programmation
- [Docker](https://www.docker.com/) - Containerisation

### 📖 Références
- [Clean Architecture](https://www.oreilly.com/library/view/clean-architecture/9780134278842/) - Robert C. Martin
- [Domain-Driven Design](https://www.oreilly.com/library/view/domain-driven-design/9780321125217/) - Eric Evans
- [NestJS Documentation](https://docs.nestjs.com/) - Documentation officielle
- [Prisma Documentation](https://www.prisma.io/docs/) - Documentation officielle

---

<div align="center">

[![Retour au Profil](../../../README.md)](../../../README.md)

</div>

---

*Dernière mise à jour : Janvier 2024*
