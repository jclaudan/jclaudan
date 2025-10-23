# 🔴 NestJS - Guide Complet

## 📋 Table des matières
- [Introduction](#introduction)
- [Architecture hexagonale](#architecture-hexagonale)
- [Meilleures pratiques](#meilleures-pratiques)
- [Design Patterns](#design-patterns)
- [Principes SOLID](#principes-solid)
- [Snippets utiles](#snippets-utiles)
- [Ressources](#ressources)

## 🚀 Introduction

NestJS est un framework Node.js progressif pour construire des applications serveur efficaces et évolutives. Il utilise TypeScript par défaut et combine des éléments de la programmation orientée objet, de la programmation fonctionnelle et de la programmation réactive.

### Avantages clés
- **Architecture modulaire** - Structure claire et organisée
- **TypeScript natif** - Support complet du typage statique
- **Décorateurs** - Syntaxe élégante et expressive
- **Dependency Injection** - Gestion automatique des dépendances
- **Microservices ready** - Support natif des microservices

## 🏛️ Architecture hexagonale

### Structure du projet

```
src/
├── domain/                 # Couche domaine (business logic)
│   ├── entities/          # Entités métier
│   ├── repositories/      # Interfaces des repositories
│   ├── services/          # Services métier
│   └── value-objects/     # Objets de valeur
├── application/           # Couche application
│   ├── use-cases/        # Cas d'usage
│   ├── dto/              # Data Transfer Objects
│   └── interfaces/       # Interfaces d'application
├── infrastructure/        # Couche infrastructure
│   ├── database/         # Configuration base de données
│   ├── repositories/     # Implémentations des repositories
│   ├── external/         # Services externes
│   └── config/           # Configuration
└── presentation/         # Couche présentation
    ├── controllers/      # Contrôleurs REST/GraphQL
    ├── guards/           # Guards d'authentification
    ├── interceptors/     # Intercepteurs
    └── pipes/            # Pipes de validation
```

### Implémentation de l'architecture hexagonale

#### 1. Couche Domaine

```typescript
// domain/entities/user.entity.ts
export class User {
  constructor(
    private readonly id: string,
    private readonly email: string,
    private readonly name: string,
    private readonly createdAt: Date
  ) {}

  getId(): string {
    return this.id
  }

  getEmail(): string {
    return this.email
  }

  getName(): string {
    return this.name
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  isValid(): boolean {
    return this.email.includes('@') && this.name.length > 0
  }
}

// domain/repositories/user.repository.interface.ts
export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<User>
  delete(id: string): Promise<void>
}

// domain/services/user.service.ts
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(email: string, name: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email)
    
    if (existingUser) {
      throw new Error('User already exists')
    }

    const user = new User(
      this.generateId(),
      email,
      name,
      new Date()
    )

    if (!user.isValid()) {
      throw new Error('Invalid user data')
    }

    return await this.userRepository.save(user)
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}
```

#### 2. Couche Application

```typescript
// application/use-cases/create-user.use-case.ts
export class CreateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(email: string, name: string): Promise<User> {
    return await this.userService.createUser(email, name)
  }
}

// application/dto/create-user.dto.ts
export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(2)
  name: string
}
```

#### 3. Couche Infrastructure

```typescript
// infrastructure/repositories/typeorm-user.repository.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user.repository.interface'

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>
  ) {}

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { id }
    })

    if (!userEntity) {
      return null
    }

    return this.toDomain(userEntity)
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { email }
    })

    if (!userEntity) {
      return null
    }

    return this.toDomain(userEntity)
  }

  async save(user: User): Promise<User> {
    const userEntity = this.toEntity(user)
    const savedEntity = await this.userEntityRepository.save(userEntity)
    return this.toDomain(savedEntity)
  }

  async delete(id: string): Promise<void> {
    await this.userEntityRepository.delete(id)
  }

  private toDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.email,
      entity.name,
      entity.createdAt
    )
  }

  private toEntity(user: User): UserEntity {
    const entity = new UserEntity()
    entity.id = user.getId()
    entity.email = user.getEmail()
    entity.name = user.getName()
    entity.createdAt = user.getCreatedAt()
    return entity
  }
}
```

#### 4. Couche Présentation

```typescript
// presentation/controllers/user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case'
import { CreateUserDto } from '../../application/dto/create-user.dto'

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(
      createUserDto.email,
      createUserDto.name
    )

    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      createdAt: user.getCreatedAt()
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    // Implementation
  }
}
```

## 🎯 Meilleures pratiques

### 1. Configuration des modules

```typescript
// app.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { DatabaseModule } from './infrastructure/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

### 2. Gestion des erreurs

```typescript
// common/exceptions/business.exception.ts
export class BusinessException extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 400
  ) {
    super(message)
    this.name = 'BusinessException'
  }
}

// common/filters/business-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { BusinessException } from '../exceptions/business.exception'

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      code: exception.code,
      message: exception.message,
      timestamp: new Date().toISOString(),
    })
  }
}
```

### 3. Validation avec DTOs

```typescript
// common/dto/pagination.dto.ts
import { IsOptional, IsPositive, Max, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  page?: number = 1

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Max(100)
  limit?: number = 10
}

// common/pipes/validation.pipe.ts
import { ValidationPipe } from '@nestjs/common'

export const GlobalValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
})
```

### 4. Configuration avec ConfigModule

```typescript
// config/database.config.ts
import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'nestjs_app',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
}))

// config/app.config.ts
export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
}))
```

## 🏗️ Design Patterns

### 1. Repository Pattern

```typescript
// domain/repositories/base.repository.interface.ts
export interface BaseRepository<T, ID> {
  findById(id: ID): Promise<T | null>
  findAll(): Promise<T[]>
  save(entity: T): Promise<T>
  update(id: ID, entity: Partial<T>): Promise<T>
  delete(id: ID): Promise<void>
}

// infrastructure/repositories/base.repository.ts
export abstract class BaseRepository<T, ID> implements BaseRepository<T, ID> {
  constructor(
    protected readonly repository: Repository<any>
  ) {}

  async findById(id: ID): Promise<T | null> {
    const entity = await this.repository.findOne({ where: { id } })
    return entity ? this.toDomain(entity) : null
  }

  async findAll(): Promise<T[]> {
    const entities = await this.repository.find()
    return entities.map(entity => this.toDomain(entity))
  }

  async save(domainEntity: T): Promise<T> {
    const entity = this.toEntity(domainEntity)
    const savedEntity = await this.repository.save(entity)
    return this.toDomain(savedEntity)
  }

  async update(id: ID, partialEntity: Partial<T>): Promise<T> {
    await this.repository.update(id, partialEntity)
    return this.findById(id)
  }

  async delete(id: ID): Promise<void> {
    await this.repository.delete(id)
  }

  protected abstract toDomain(entity: any): T
  protected abstract toEntity(domainEntity: T): any
}
```

### 2. Factory Pattern

```typescript
// domain/factories/user.factory.ts
export class UserFactory {
  static create(
    email: string,
    name: string,
    type: UserType = UserType.STANDARD
  ): User {
    switch (type) {
      case UserType.ADMIN:
        return new AdminUser(email, name)
      case UserType.PREMIUM:
        return new PremiumUser(email, name)
      default:
        return new StandardUser(email, name)
    }
  }

  static fromPersistence(data: any): User {
    return new User(
      data.id,
      data.email,
      data.name,
      new Date(data.createdAt)
    )
  }
}
```

### 3. Observer Pattern avec Events

```typescript
// domain/events/user-created.event.ts
export class UserCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly timestamp: Date
  ) {}
}

// application/event-handlers/user-created.handler.ts
@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    private readonly emailService: EmailService,
    private readonly analyticsService: AnalyticsService
  ) {}

  async handle(event: UserCreatedEvent) {
    // Envoyer email de bienvenue
    await this.emailService.sendWelcomeEmail(event.email)
    
    // Tracker l'événement
    await this.analyticsService.trackUserRegistration(event.userId)
  }
}

// domain/services/user.service.ts
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus
  ) {}

  async createUser(email: string, name: string): Promise<User> {
    const user = new User(this.generateId(), email, name, new Date())
    const savedUser = await this.userRepository.save(user)
    
    // Publier l'événement
    await this.eventBus.publish(
      new UserCreatedEvent(savedUser.getId(), savedUser.getEmail(), new Date())
    )
    
    return savedUser
  }
}
```

### 4. Strategy Pattern

```typescript
// domain/strategies/payment.strategy.interface.ts
export interface PaymentStrategy {
  processPayment(amount: number, details: any): Promise<PaymentResult>
}

// domain/strategies/credit-card.strategy.ts
export class CreditCardStrategy implements PaymentStrategy {
  async processPayment(amount: number, details: any): Promise<PaymentResult> {
    // Logique de paiement par carte de crédit
    return new PaymentResult(true, 'Payment successful', 'txn_123')
  }
}

// domain/strategies/paypal.strategy.ts
export class PayPalStrategy implements PaymentStrategy {
  async processPayment(amount: number, details: any): Promise<PaymentResult> {
    // Logique de paiement PayPal
    return new PaymentResult(true, 'Payment successful', 'pp_123')
  }
}

// application/services/payment.service.ts
export class PaymentService {
  private strategies: Map<string, PaymentStrategy> = new Map()

  constructor() {
    this.strategies.set('credit_card', new CreditCardStrategy())
    this.strategies.set('paypal', new PayPalStrategy())
  }

  async processPayment(
    method: string,
    amount: number,
    details: any
  ): Promise<PaymentResult> {
    const strategy = this.strategies.get(method)
    
    if (!strategy) {
      throw new Error(`Payment method ${method} not supported`)
    }

    return await strategy.processPayment(amount, details)
  }
}
```

## 🎯 Principes SOLID

### 1. Single Responsibility Principle (SRP)

```typescript
// ❌ Mauvaise pratique - Classe avec plusieurs responsabilités
class UserManager {
  async createUser(userData: any) {
    // Validation
    if (!userData.email) throw new Error('Email required')
    
    // Persistance
    const user = await this.userRepository.save(userData)
    
    // Email
    await this.emailService.sendWelcomeEmail(user.email)
    
    // Logging
    this.logger.log(`User created: ${user.id}`)
    
    return user
  }
}

// ✅ Bonne pratique - Séparation des responsabilités
class UserValidator {
  validate(userData: any): void {
    if (!userData.email) throw new Error('Email required')
    if (!userData.name) throw new Error('Name required')
  }
}

class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly validator: UserValidator
  ) {}

  async createUser(userData: any): Promise<User> {
    this.validator.validate(userData)
    return await this.userRepository.save(userData)
  }
}

class UserEventHandler {
  constructor(
    private readonly emailService: EmailService,
    private readonly logger: Logger
  ) {}

  async handleUserCreated(event: UserCreatedEvent): Promise<void> {
    await this.emailService.sendWelcomeEmail(event.email)
    this.logger.log(`User created: ${event.userId}`)
  }
}
```

### 2. Open/Closed Principle (OCP)

```typescript
// Interface pour les différents types de notifications
interface NotificationStrategy {
  send(message: string, recipient: string): Promise<void>
}

// Implémentations extensibles
class EmailNotificationStrategy implements NotificationStrategy {
  async send(message: string, recipient: string): Promise<void> {
    // Logique d'envoi d'email
  }
}

class SmsNotificationStrategy implements NotificationStrategy {
  async send(message: string, recipient: string): Promise<void> {
    // Logique d'envoi SMS
  }
}

class PushNotificationStrategy implements NotificationStrategy {
  async send(message: string, recipient: string): Promise<void> {
    // Logique de notification push
  }
}

// Service ouvert à l'extension, fermé à la modification
class NotificationService {
  constructor(private readonly strategies: NotificationStrategy[]) {}

  async sendNotification(
    type: string,
    message: string,
    recipient: string
  ): Promise<void> {
    const strategy = this.strategies.find(s => s.constructor.name.includes(type))
    
    if (!strategy) {
      throw new Error(`Notification type ${type} not supported`)
    }

    await strategy.send(message, recipient)
  }
}
```

### 3. Liskov Substitution Principle (LSP)

```typescript
// Interface de base
interface Shape {
  area(): number
  perimeter(): number
}

// Implémentations qui respectent le contrat
class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  area(): number {
    return this.width * this.height
  }

  perimeter(): number {
    return 2 * (this.width + this.height)
  }
}

class Circle implements Shape {
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius * this.radius
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius
  }
}

// Service qui utilise les formes sans connaître leur type concret
class ShapeCalculator {
  calculateTotalArea(shapes: Shape[]): number {
    return shapes.reduce((total, shape) => total + shape.area(), 0)
  }
}
```

### 4. Interface Segregation Principle (ISP)

```typescript
// ❌ Interface trop large
interface UserOperations {
  createUser(userData: any): Promise<User>
  updateUser(id: string, userData: any): Promise<User>
  deleteUser(id: string): Promise<void>
  sendEmail(userId: string, message: string): Promise<void>
  generateReport(userId: string): Promise<Report>
}

// ✅ Interfaces séparées et spécialisées
interface UserRepository {
  create(userData: any): Promise<User>
  update(id: string, userData: any): Promise<User>
  delete(id: string): Promise<void>
  findById(id: string): Promise<User | null>
}

interface EmailService {
  sendEmail(userId: string, message: string): Promise<void>
}

interface ReportService {
  generateReport(userId: string): Promise<Report>
}

// Classes qui implémentent seulement ce dont elles ont besoin
class UserService implements UserRepository {
  async create(userData: any): Promise<User> {
    // Implémentation
  }
  
  async update(id: string, userData: any): Promise<User> {
    // Implémentation
  }
  
  async delete(id: string): Promise<void> {
    // Implémentation
  }
  
  async findById(id: string): Promise<User | null> {
    // Implémentation
  }
}
```

### 5. Dependency Inversion Principle (DIP)

```typescript
// Abstractions (interfaces)
interface UserRepository {
  findById(id: string): Promise<User | null>
  save(user: User): Promise<User>
}

interface EmailService {
  sendWelcomeEmail(email: string): Promise<void>
}

// Implémentations concrètes
class TypeOrmUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    // Implémentation TypeORM
  }
  
  async save(user: User): Promise<User> {
    // Implémentation TypeORM
  }
}

class SendGridEmailService implements EmailService {
  async sendWelcomeEmail(email: string): Promise<void> {
    // Implémentation SendGrid
  }
}

// Service de haut niveau qui dépend des abstractions
class UserService {
  constructor(
    private readonly userRepository: UserRepository, // Abstraction
    private readonly emailService: EmailService      // Abstraction
  ) {}

  async createUser(userData: any): Promise<User> {
    const user = await this.userRepository.save(userData)
    await this.emailService.sendWelcomeEmail(user.getEmail())
    return user
  }
}

// Injection des dépendances dans le module
@Module({
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'EmailService',
      useClass: SendGridEmailService,
    },
  ],
})
export class UserModule {}
```

## 💡 Snippets avancés

### 1. Intercepteur de logging

```typescript
// common/interceptors/logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { method, url } = request
    const now = Date.now()

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse()
        const { statusCode } = response
        const contentLength = response.get('content-length')
        
        console.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${Date.now() - now}ms`
        )
      })
    )
  }
}
```

### 2. Guard d'authentification

```typescript
// common/guards/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Token not found')
    }

    try {
      const payload = this.jwtService.verify(token)
      request.user = payload
      return true
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
```

### 3. Pipe de transformation

```typescript
// common/pipes/parse-int.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10)
    
    if (isNaN(val)) {
      throw new BadRequestException(`Validation failed. "${value}" is not an integer.`)
    }
    
    return val
  }
}
```

### 4. Middleware de rate limiting

```typescript
// common/middleware/rate-limit.middleware.ts
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requests: Map<string, { count: number; resetTime: number }> = new Map()

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 minutes
    const maxRequests = 100

    const userRequests = this.requests.get(ip)

    if (!userRequests || now > userRequests.resetTime) {
      this.requests.set(ip, { count: 1, resetTime: now + windowMs })
      return next()
    }

    if (userRequests.count >= maxRequests) {
      throw new HttpException(
        'Too many requests',
        HttpStatus.TOO_MANY_REQUESTS
      )
    }

    userRequests.count++
    next()
  }
}
```

### 5. Service de cache

```typescript
// common/services/cache.service.ts
import { Injectable, Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    return await this.cacheManager.get<T>(key)
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl)
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key)
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset()
  }
}
```

## 🧩 Modules et Injection de Dépendances

### Modules

```typescript
// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporté pour être utilisé dans d'autres modules
})
export class UsersModule {}

// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Disponible dans toute l'application
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    UsersModule,
  ],
})
export class AppModule {}
```

### Injection de Dépendances

```typescript
// Constructor Injection (recommandé)
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('CONFIG_OPTIONS')
    private readonly configOptions: ConfigOptions,
    @Optional() @Inject('CACHE_MANAGER')
    private readonly cacheManager: Cache,
  ) {}
}

// Property Injection
@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
}

// Method Injection
@Injectable()
export class UsersService {
  private userRepository: Repository<User>;

  @InjectRepository(User)
  setUserRepository(repository: Repository<User>) {
    this.userRepository = repository;
  }
}
```

### Providers personnalisés

```typescript
// Factory Provider
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Connection> => {
        return await createConnection({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        });
      },
    },
  ],
})
export class DatabaseModule {}

// Value Provider
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.API_KEY,
    },
  ],
})
export class ConfigModule {}

// Class Provider
@Module({
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
  ],
})
export class UsersModule {}
```

## 🧪 Tests

### Tests Unitaires

```typescript
// users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, name: 'John', email: 'john@example.com' }];
      mockRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = { name: 'John', email: 'john@example.com' };
      const user = { id: 1, ...createUserDto };
      mockRepository.save.mockResolvedValue(user);

      const result = await service.create(createUserDto);
      expect(result).toEqual(user);
      expect(mockRepository.save).toHaveBeenCalledWith(createUserDto);
    });
  });
});
```

### Tests d'Intégration

```typescript
// users.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/users (POST)', () => {
    const createUserDto = {
      name: 'John',
      email: 'john@example.com',
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe(createUserDto.name);
        expect(res.body.email).toBe(createUserDto.email);
      });
  });
});
```

### Tests de Contrôleur

```typescript
// users.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, name: 'John', email: 'john@example.com' }];
      mockUsersService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();
      expect(result).toEqual(users);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
```

## 🛡️ Guards

### Guard d'Authentification

```typescript
// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

### Guard de Rôles

```typescript
// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

// Décorateur pour les rôles
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Utilisation
@Post()
@Roles('admin', 'user')
@UseGuards(AuthGuard, RolesGuard)
async create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

### Guard de Throttling

```typescript
// throttler.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.user?.id || req.ip;
  }
}

// Utilisation
@UseGuards(CustomThrottlerGuard)
@Throttle(10, 60) // 10 requêtes par minute
@Get()
async findAll() {
  return this.usersService.findAll();
}
```

## 🔄 Interceptors

### Intercepteur de Logging

```typescript
// logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const contentLength = response.get('content-length');
        
        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${Date.now() - now}ms`
        );
      })
    );
  }
}
```

### Intercepteur de Transformation

```typescript
// transform.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
  message: string;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map(data => ({
        data,
        statusCode,
        message: 'Success',
        timestamp: new Date().toISOString(),
      }))
    );
  }
}
```

### Intercepteur de Cache

```typescript
// cache.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/cache-manager';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = this.generateCacheKey(request);
    
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    return next.handle().pipe(
      tap(async (data) => {
        await this.cacheManager.set(cacheKey, data, 300); // Cache for 5 minutes
      })
    );
  }

  private generateCacheKey(request: any): string {
    const { method, url, query } = request;
    return `${method}:${url}:${JSON.stringify(query)}`;
  }
}
```

### Intercepteur de Timeout

```typescript
// timeout.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000), // 5 seconds timeout
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      })
    );
  }
}
```

## 🔧 Pipes

### Pipe de Validation Personnalisé

```typescript
// validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = errors.map(error => 
        Object.values(error.constraints || {}).join(', ')
      );
      throw new BadRequestException(errorMessages);
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

### Pipe de Transformation

```typescript
// parse-int.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    
    if (isNaN(val)) {
      throw new BadRequestException(`Validation failed. "${value}" is not an integer.`);
    }
    
    return val;
  }
}

// Utilisation
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.findOne(id);
}
```

### Pipe de Transformation de Date

```typescript
// parse-date.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string, metadata: ArgumentMetadata): Date {
    const date = new Date(value);
    
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`Validation failed. "${value}" is not a valid date.`);
    }
    
    return date;
  }
}
```

### Pipe de Transformation de Fichier

```typescript
// file-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly maxSize: number = 1024 * 1024, // 1MB
    private readonly allowedTypes: string[] = ['image/jpeg', 'image/png']
  ) {}

  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException(`File size exceeds ${this.maxSize} bytes`);
    }

    if (!this.allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(`File type ${file.mimetype} not allowed`);
    }

    return file;
  }
}
```

## 📚 Référence Complète NestJS

### 🆕 Améliorations NestJS 2024

#### NestJS 10+ - Nouvelles fonctionnalités
```typescript
// Microservices avec gRPC amélioré
@Controller()
export class UsersController {
  @GrpcMethod('UsersService', 'FindOne')
  async findOne(data: FindOneRequest): Promise<User> {
    return this.usersService.findOne(data.id);
  }
}

// WebSockets avec Socket.IO
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'events'
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }
}

// GraphQL avec Code First
@Resolver()
export class UsersResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.create(input);
  }
}
```

#### Améliorations Performance
```typescript
// Cache avec Redis
@Injectable()
export class UsersService {
  @Cacheable('users', 300) // Cache 5 minutes
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  @CacheEvict('users')
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto);
  }
}

// Compression et optimisation
@UseInterceptors(CompressionInterceptor)
@Controller('api')
export class ApiController {
  @Get('large-data')
  async getLargeData() {
    return this.dataService.getLargeData();
  }
}
```

### 📖 Syntaxe Complète NestJS

#### 1. Décorateurs de Contrôleur
```typescript
import {
  Controller, Get, Post, Put, Delete, Patch,
  Body, Param, Query, Headers, Req, Res,
  HttpCode, HttpStatus, Header, Redirect,
  UseGuards, UseInterceptors, UsePipes,
  UseFilters, SetMetadata, Render, Ip,
  Session, HostParam, Next, UploadedFile,
  UploadedFiles, ParseIntPipe, ParseUUIDPipe,
  ParseBoolPipe, ParseArrayPipe, ParseEnumPipe,
  ParseFloatPipe, DefaultValuePipe, ValidationPipe,
  BadRequestException, NotFoundException,
  ForbiddenException, UnauthorizedException,
  InternalServerErrorException, ConflictException,
  UnprocessableEntityException, PayloadTooLargeException,
  RequestTimeoutException, GoneException,
  HttpVersionNotSupportedException, NotImplementedException,
  ServiceUnavailableException, GatewayTimeoutException
} from '@nestjs/common';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-cache')
  async findAll(@Query() query: FindUsersDto): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('include', ParseBoolPipe) include?: boolean
  ): Promise<User> {
    return this.usersService.findOne(id, include);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ParseEnumPipe(UserStatus)) status: UserStatus
  ): Promise<User> {
    return this.usersService.updateStatus(id, status);
  }

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ url: string }> {
    return this.usersService.uploadAvatar(id, file);
  }

  @Get(':id/export')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="user.pdf"')
  async exportUser(@Param('id', ParseIntPipe) id: number): Promise<Buffer> {
    return this.usersService.exportUser(id);
  }
}
```

#### 2. Décorateurs de Service
```typescript
import {
  Injectable, OnModuleInit, OnModuleDestroy,
  OnApplicationBootstrap, OnApplicationShutdown,
  BeforeApplicationShutdown, Logger, Scope,
  Inject, Optional, Self, SkipSelf, Host,
  forwardRef, InjectRepository, InjectConnection,
  InjectModel, InjectDataSource, InjectEntityManager
} from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UsersService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('CONFIG_OPTIONS')
    private readonly configOptions: ConfigOptions,
    @Optional() @Inject('CACHE_MANAGER')
    private readonly cacheManager: Cache,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async onModuleInit() {
    this.logger.log('UsersService initialized');
  }

  async onModuleDestroy() {
    this.logger.log('UsersService destroyed');
  }

  async findAll(query: FindUsersDto): Promise<User[]> {
    const { page, limit, search, sortBy, sortOrder } = query;
    
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    
    if (search) {
      queryBuilder.where('user.name ILIKE :search', { search: `%${search}%` });
    }
    
    if (sortBy) {
      queryBuilder.orderBy(`user.${sortBy}`, sortOrder || 'ASC');
    }
    
    queryBuilder.skip((page - 1) * limit).take(limit);
    
    return queryBuilder.getMany();
  }

  async findOne(id: number, include?: boolean): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: include ? ['profile', 'roles'] : []
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
```

#### 3. Décorateurs de Module
```typescript
import {
  Module, Global, DynamicModule, ModuleRef,
  OnModuleInit, OnModuleDestroy, OnApplicationBootstrap,
  OnApplicationShutdown, BeforeApplicationShutdown
} from '@nestjs/common';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }
      }),
      inject: [ConfigService]
    }),
    CacheModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 300
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [UsersController, RolesController],
  providers: [
    UsersService,
    RolesService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: [DataSource]
    },
    {
      provide: 'ASYNC_DATABASE_CONNECTION',
      useFactory: async (): Promise<Connection> => {
        return await createConnection({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [User, Role, Permission],
          synchronize: process.env.NODE_ENV === 'development'
        });
      }
    }
  ],
  exports: [UsersService, RolesService, 'USER_REPOSITORY']
})
export class UsersModule implements OnModuleInit, OnModuleDestroy {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    console.log('UsersModule initialized');
  }

  async onModuleDestroy() {
    console.log('UsersModule destroyed');
  }

  static forRoot(options: DatabaseOptions): DynamicModule {
    return {
      module: UsersModule,
      providers: [
        {
          provide: 'DATABASE_OPTIONS',
          useValue: options
        }
      ],
      exports: ['DATABASE_OPTIONS']
    };
  }

  static forFeature(entities: any[]): DynamicModule {
    return {
      module: UsersModule,
      imports: [TypeOrmModule.forFeature(entities)],
      providers: entities.map(entity => ({
        provide: `${entity.name}_REPOSITORY`,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
        inject: [DataSource]
      })),
      exports: entities.map(entity => `${entity.name}_REPOSITORY`)
    };
  }
}
```

## 📋 Tableaux de Référence Complète NestJS

### 🎯 Décorateurs de Contrôleur

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **@Controller** | `@nestjs/common` | Définit un contrôleur | `@Controller('users')` |
| **@Get** | `@nestjs/common` | Route GET | `@Get(':id')` |
| **@Post** | `@nestjs/common` | Route POST | `@Post()` |
| **@Put** | `@nestjs/common` | Route PUT | `@Put(':id')` |
| **@Delete** | `@nestjs/common` | Route DELETE | `@Delete(':id')` |
| **@Patch** | `@nestjs/common` | Route PATCH | `@Patch(':id')` |
| **@Options** | `@nestjs/common` | Route OPTIONS | `@Options()` |
| **@Head** | `@nestjs/common` | Route HEAD | `@Head()` |
| **@All** | `@nestjs/common` | Toutes les routes | `@All('*')` |

### 🎯 Décorateurs de Paramètres

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **@Body** | `@nestjs/common` | Corps de la requête | `@Body() createUserDto` |
| **@Param** | `@nestjs/common` | Paramètres d'URL | `@Param('id') id: string` |
| **@Query** | `@nestjs/common` | Paramètres de requête | `@Query() query: FindUsersDto` |
| **@Headers** | `@nestjs/common` | En-têtes HTTP | `@Headers() headers: any` |
| **@Req** | `@nestjs/common` | Objet Request | `@Req() req: Request` |
| **@Res** | `@nestjs/common` | Objet Response | `@Res() res: Response` |
| **@Ip** | `@nestjs/common` | Adresse IP | `@Ip() ip: string` |
| **@Session** | `@nestjs/common` | Session | `@Session() session: any` |
| **@HostParam** | `@nestjs/common` | Paramètre d'hôte | `@HostParam('host') host: string` |
| **@Next** | `@nestjs/common` | Fonction next() | `@Next() next: Function` |

### 🎯 Décorateurs de Validation

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **@UsePipes** | `@nestjs/common` | Appliquer des pipes | `@UsePipes(ValidationPipe)` |
| **@UseGuards** | `@nestjs/common` | Appliquer des guards | `@UseGuards(AuthGuard)` |
| **@UseInterceptors** | `@nestjs/common` | Appliquer des interceptors | `@UseInterceptors(LoggingInterceptor)` |
| **@UseFilters** | `@nestjs/common` | Appliquer des filters | `@UseFilters(HttpExceptionFilter)` |
| **@SetMetadata** | `@nestjs/common` | Définir des métadonnées | `@SetMetadata('roles', ['admin'])` |
| **@Render** | `@nestjs/common` | Rendu de template | `@Render('index')` |
| **@Redirect** | `@nestjs/common` | Redirection | `@Redirect('https://example.com')` |
| **@Header** | `@nestjs/common` | Définir un en-tête | `@Header('Cache-Control', 'no-cache')` |
| **@HttpCode** | `@nestjs/common` | Code de statut HTTP | `@HttpCode(HttpStatus.OK)` |

### 🎯 Décorateurs de Service

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **@Injectable** | `@nestjs/common` | Service injectable | `@Injectable()` |
| **@Inject** | `@nestjs/common` | Injection de dépendance | `@Inject('CONFIG_OPTIONS')` |
| **@Optional** | `@nestjs/common` | Dépendance optionnelle | `@Optional() @Inject('CACHE')` |
| **@Self** | `@nestjs/common` | Injection locale | `@Self() @Inject('SERVICE')` |
| **@SkipSelf** | `@nestjs/common` | Ignorer l'injecteur local | `@SkipSelf() @Inject('SERVICE')` |
| **@Host** | `@nestjs/common` | Injection d'hôte | `@Host() @Inject('SERVICE')` |
| **@forwardRef** | `@nestjs/common` | Référence circulaire | `@Inject(forwardRef(() => Service))` |

### 🎯 Décorateurs de Module

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **@Module** | `@nestjs/common` | Définit un module | `@Module({ imports: [], controllers: [], providers: [] })` |
| **@Global** | `@nestjs/common` | Module global | `@Global() @Module({})` |
| **@DynamicModule** | `@nestjs/common` | Module dynamique | `static forRoot(): DynamicModule` |

### 🎯 Décorateurs de Lifecycle

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **OnModuleInit** | `@nestjs/common` | Initialisation du module | `implements OnModuleInit` |
| **OnModuleDestroy** | `@nestjs/common` | Destruction du module | `implements OnModuleDestroy` |
| **OnApplicationBootstrap** | `@nestjs/common` | Bootstrap de l'application | `implements OnApplicationBootstrap` |
| **OnApplicationShutdown** | `@nestjs/common` | Arrêt de l'application | `implements OnApplicationShutdown` |
| **BeforeApplicationShutdown** | `@nestjs/common` | Avant arrêt de l'application | `implements BeforeApplicationShutdown` |

### 🎯 Pipes Intégrés

| Pipe | Import | Description | Exemple |
|------|--------|-------------|---------|
| **ParseIntPipe** | `@nestjs/common` | Parse en entier | `@Param('id', ParseIntPipe) id: number` |
| **ParseFloatPipe** | `@nestjs/common` | Parse en flottant | `@Param('price', ParseFloatPipe) price: number` |
| **ParseBoolPipe** | `@nestjs/common` | Parse en booléen | `@Query('active', ParseBoolPipe) active: boolean` |
| **ParseArrayPipe** | `@nestjs/common` | Parse en tableau | `@Query('tags', ParseArrayPipe) tags: string[]` |
| **ParseUUIDPipe** | `@nestjs/common` | Parse en UUID | `@Param('id', ParseUUIDPipe) id: string` |
| **ParseEnumPipe** | `@nestjs/common` | Parse en énumération | `@Body('status', ParseEnumPipe(UserStatus)) status: UserStatus` |
| **DefaultValuePipe** | `@nestjs/common` | Valeur par défaut | `@Query('page', new DefaultValuePipe(1)) page: number` |
| **ValidationPipe** | `@nestjs/common` | Validation de données | `@UsePipes(new ValidationPipe())` |

### 🎯 Guards

| Guard | Import | Description | Exemple |
|-------|--------|-------------|---------|
| **CanActivate** | `@nestjs/common` | Interface de guard | `implements CanActivate` |
| **AuthGuard** | `@nestjs/passport` | Guard d'authentification | `@UseGuards(AuthGuard('jwt'))` |
| **RolesGuard** | Custom | Guard de rôles | `@UseGuards(RolesGuard)` |
| **ThrottlerGuard** | `@nestjs/throttler` | Guard de limitation | `@UseGuards(ThrottlerGuard)` |

### 🎯 Interceptors

| Interceptor | Import | Description | Exemple |
|-------------|--------|-------------|---------|
| **NestInterceptor** | `@nestjs/common` | Interface d'interceptor | `implements NestInterceptor` |
| **LoggingInterceptor** | Custom | Logging des requêtes | `@UseInterceptors(LoggingInterceptor)` |
| **TransformInterceptor** | Custom | Transformation des réponses | `@UseInterceptors(TransformInterceptor)` |
| **CacheInterceptor** | `@nestjs/cache-manager` | Cache des réponses | `@UseInterceptors(CacheInterceptor)` |
| **TimeoutInterceptor** | Custom | Timeout des requêtes | `@UseInterceptors(TimeoutInterceptor)` |

### 🎯 Exception Filters

| Filter | Import | Description | Exemple |
|--------|--------|-------------|---------|
| **ExceptionFilter** | `@nestjs/common` | Interface de filter | `implements ExceptionFilter` |
| **HttpExceptionFilter** | Custom | Filter d'exceptions HTTP | `@UseFilters(HttpExceptionFilter)` |
| **AllExceptionsFilter** | Custom | Filter de toutes les exceptions | `@UseFilters(AllExceptionsFilter)` |
| **ValidationExceptionFilter** | Custom | Filter de validation | `@UseFilters(ValidationExceptionFilter)` |

### 🎯 Exceptions HTTP

| Exception | Import | Code | Description |
|-----------|--------|------|-------------|
| **BadRequestException** | `@nestjs/common` | 400 | Requête malformée |
| **UnauthorizedException** | `@nestjs/common` | 401 | Non autorisé |
| **ForbiddenException** | `@nestjs/common` | 403 | Interdit |
| **NotFoundException** | `@nestjs/common` | 404 | Non trouvé |
| **MethodNotAllowedException** | `@nestjs/common` | 405 | Méthode non autorisée |
| **NotAcceptableException** | `@nestjs/common` | 406 | Non acceptable |
| **ConflictException** | `@nestjs/common` | 409 | Conflit |
| **GoneException** | `@nestjs/common` | 410 | Disparu |
| **HttpVersionNotSupportedException** | `@nestjs/common` | 505 | Version HTTP non supportée |
| **PayloadTooLargeException** | `@nestjs/common` | 413 | Charge utile trop grande |
| **UnsupportedMediaTypeException** | `@nestjs/common` | 415 | Type de média non supporté |
| **UnprocessableEntityException** | `@nestjs/common` | 422 | Entité non traitable |
| **InternalServerErrorException** | `@nestjs/common` | 500 | Erreur serveur interne |
| **NotImplementedException** | `@nestjs/common` | 501 | Non implémenté |
| **BadGatewayException** | `@nestjs/common` | 502 | Mauvaise passerelle |
| **ServiceUnavailableException** | `@nestjs/common` | 503 | Service indisponible |
| **GatewayTimeoutException** | `@nestjs/common` | 504 | Timeout de passerelle |

### 🎯 Codes de Statut HTTP

| Code | Constante | Description |
|------|-----------|-------------|
| **200** | `HttpStatus.OK` | Succès |
| **201** | `HttpStatus.CREATED` | Créé |
| **202** | `HttpStatus.ACCEPTED` | Accepté |
| **204** | `HttpStatus.NO_CONTENT` | Pas de contenu |
| **400** | `HttpStatus.BAD_REQUEST` | Requête incorrecte |
| **401** | `HttpStatus.UNAUTHORIZED` | Non autorisé |
| **403** | `HttpStatus.FORBIDDEN` | Interdit |
| **404** | `HttpStatus.NOT_FOUND` | Non trouvé |
| **500** | `HttpStatus.INTERNAL_SERVER_ERROR` | Erreur serveur |

### 🎯 Microservices

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **@MessagePattern** | `@nestjs/microservices` | Pattern de message | `@MessagePattern('user.get')` |
| **@EventPattern** | `@nestjs/microservices` | Pattern d'événement | `@EventPattern('user.created')` |
| **@Ctx** | `@nestjs/microservices` | Contexte | `@Ctx() context: RmqContext` |
| **@Payload** | `@nestjs/microservices` | Charge utile | `@Payload() data: any` |
| **@Client** | `@nestjs/microservices` | Client microservice | `@Client('USER_SERVICE') client: ClientProxy` |

### 🎯 WebSockets

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **@WebSocketGateway** | `@nestjs/websockets` | Gateway WebSocket | `@WebSocketGateway(3001)` |
| **@WebSocketServer** | `@nestjs/websockets` | Serveur WebSocket | `@WebSocketServer() server: Server` |
| **@SubscribeMessage** | `@nestjs/websockets` | Abonnement message | `@SubscribeMessage('message')` |
| **@MessageBody** | `@nestjs/websockets` | Corps du message | `@MessageBody() data: string` |
| **@ConnectedSocket** | `@nestjs/websockets` | Socket connecté | `@ConnectedSocket() client: Socket` |

### 🎯 GraphQL

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **@Resolver** | `@nestjs/graphql` | Résolveur GraphQL | `@Resolver(() => User)` |
| **@Query** | `@nestjs/graphql` | Requête GraphQL | `@Query(() => [User])` |
| **@Mutation** | `@nestjs/graphql` | Mutation GraphQL | `@Mutation(() => User)` |
| **@Subscription** | `@nestjs/graphql` | Abonnement GraphQL | `@Subscription(() => User)` |
| **@Args** | `@nestjs/graphql` | Arguments | `@Args('id') id: number` |
| **@Context** | `@nestjs/graphql` | Contexte | `@Context() context: any` |

### 🎯 Cache

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **@Cacheable** | `@nestjs/cache-manager` | Cacheable | `@Cacheable('users', 300)` |
| **@CacheKey** | `@nestjs/cache-manager` | Clé de cache | `@CacheKey('user')` |
| **@CacheTTL** | `@nestjs/cache-manager` | TTL de cache | `@CacheTTL(300)` |
| **@CacheEvict** | `@nestjs/cache-manager` | Éviction de cache | `@CacheEvict('users')` |

### 🎯 File Upload

| Décorateur | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **@UploadedFile** | `@nestjs/platform-express` | Fichier uploadé | `@UploadedFile() file: Express.Multer.File` |
| **@UploadedFiles** | `@nestjs/platform-express` | Fichiers uploadés | `@UploadedFiles() files: Express.Multer.File[]` |
| **@FileInterceptor** | `@nestjs/platform-express` | Interceptor de fichier | `@UseInterceptors(FileInterceptor('file'))` |
| **@FilesInterceptor** | `@nestjs/platform-express` | Interceptor de fichiers | `@UseInterceptors(FilesInterceptor('files'))` |

### 📚 Ressources

### Documentation officielle
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeORM Documentation](https://typeorm.io/)

### Architecture et patterns
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

### Outils recommandés
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- [Swagger/OpenAPI](https://docs.nestjs.com/openapi/introduction)
- [GraphQL](https://docs.nestjs.com/graphql/quick-start)

---

*Dernière mise à jour : Janvier 2024*
