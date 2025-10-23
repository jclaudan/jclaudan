# 🏛️ Hexagonal Architecture & SOLID Principles

## 📋 Table of Contents
- [Introduction](#introduction)
- [Hexagonal Architecture](#hexagonal-architecture)
- [SOLID Principles](#solid-principles)
- [Practical Implementation](#practical-implementation)
- [Design Patterns](#design-patterns)
- [Concrete Examples](#concrete-examples)
- [Resources](#resources)

## 🚀 Introduction

Hexagonal architecture (Ports & Adapters) and SOLID principles are fundamental concepts for creating maintainable, testable, and scalable applications. This documentation presents their practical implementation in modern development.

### Why these architectures?

- **Maintainability** - Easy to understand and modify code
- **Testability** - Simplified unit and integration testing
- **Scalability** - Adding new features without breaking existing ones
- **Flexibility** - Changing infrastructure without impacting business logic
- **Separation of concerns** - Each layer has a specific role

## 🏛️ Hexagonal Architecture

### Concept

Hexagonal architecture, also called "Ports & Adapters", places business logic at the center and surrounds it with adapters that handle external interactions.

```
                    ┌─────────────────┐
                    │   Adapters      │
                    │   (Infra)       │
                    └─────────────────┘
                           │
                    ┌─────────────────┐
                    │     Ports       │
                    │  (Interfaces)   │
                    └─────────────────┘
                           │
                    ┌─────────────────┐
                    │   Application   │
                    │   (Use Cases)   │
                    └─────────────────┘
                           │
                    ┌─────────────────┐
                    │     Domain      │
                    │   (Entities)    │
                    └─────────────────┘
```

### Layer Structure

#### 1. Domain Layer

```typescript
// domain/entities/user.entity.ts
export class User {
  private constructor(
    private readonly id: UserId,
    private readonly email: Email,
    private readonly name: UserName,
    private readonly createdAt: Date
  ) {}

  static create(email: string, name: string): User {
    return new User(
      UserId.generate(),
      Email.create(email),
      UserName.create(name),
      new Date()
    )
  }

  getId(): UserId {
    return this.id
  }

  getEmail(): Email {
    return this.email
  }

  getName(): UserName {
    return this.name
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  isValid(): boolean {
    return this.email.isValid() && this.name.isValid()
  }

  changeEmail(newEmail: string): void {
    this.email = Email.create(newEmail)
  }

  changeName(newName: string): void {
    this.name = UserName.create(newName)
  }
}

// domain/value-objects/user-id.value-object.ts
export class UserId {
  private constructor(private readonly value: string) {}

  static create(value: string): UserId {
    if (!value || value.trim().length === 0) {
      throw new Error('User ID cannot be empty')
    }
    return new UserId(value)
  }

  static generate(): UserId {
    return new UserId(crypto.randomUUID())
  }

  getValue(): string {
    return this.value
  }

  equals(other: UserId): boolean {
    return this.value === other.value
  }
}

// domain/value-objects/email.value-object.ts
export class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!this.isValid(value)) {
      throw new Error('Invalid email format')
    }
    return new Email(value.toLowerCase().trim())
  }

  private static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  getValue(): string {
    return this.value
  }

  isValid(): boolean {
    return Email.isValid(this.value)
  }

  equals(other: Email): boolean {
    return this.value === other.value
  }
}

// domain/repositories/user.repository.interface.ts
export interface UserRepository {
  findById(id: UserId): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  save(user: User): Promise<User>
  delete(id: UserId): Promise<void>
  exists(email: Email): Promise<boolean>
}

// domain/services/user.domain.service.ts
export class UserDomainService {
  constructor(private readonly userRepository: UserRepository) {}

  async isEmailUnique(email: Email): Promise<boolean> {
    const existingUser = await this.userRepository.findByEmail(email)
    return existingUser === null
  }

  async canChangeEmail(user: User, newEmail: Email): Promise<boolean> {
    if (user.getEmail().equals(newEmail)) {
      return true
    }
    return await this.isEmailUnique(newEmail)
  }
}
```

#### 2. Application Layer

```typescript
// application/use-cases/create-user.use-case.ts
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDomainService: UserDomainService,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResult> {
    const email = Email.create(command.email)
    const name = UserName.create(command.name)

    // Check email uniqueness
    const isEmailUnique = await this.userDomainService.isEmailUnique(email)
    if (!isEmailUnique) {
      throw new Error('Email already exists')
    }

    // Create user
    const user = User.create(command.email, command.name)

    // Save
    const savedUser = await this.userRepository.save(user)

    // Publish event
    await this.eventBus.publish(new UserCreatedEvent(savedUser))

    return {
      id: savedUser.getId().getValue(),
      email: savedUser.getEmail().getValue(),
      name: savedUser.getName().getValue(),
      createdAt: savedUser.getCreatedAt()
    }
  }
}

// application/use-cases/update-user.use-case.ts
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDomainService: UserDomainService
  ) {}

  async execute(command: UpdateUserCommand): Promise<UpdateUserResult> {
    const userId = UserId.create(command.id)
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    // Update email if provided
    if (command.email) {
      const newEmail = Email.create(command.email)
      const canChangeEmail = await this.userDomainService.canChangeEmail(user, newEmail)
      
      if (!canChangeEmail) {
        throw new Error('Email already exists')
      }
      
      user.changeEmail(command.email)
    }

    // Update name if provided
    if (command.name) {
      user.changeName(command.name)
    }

    const updatedUser = await this.userRepository.save(user)

    return {
      id: updatedUser.getId().getValue(),
      email: updatedUser.getEmail().getValue(),
      name: updatedUser.getName().getValue(),
      createdAt: updatedUser.getCreatedAt()
    }
  }
}

// application/dto/create-user.dto.ts
export interface CreateUserCommand {
  email: string
  name: string
}

export interface CreateUserResult {
  id: string
  email: string
  name: string
  createdAt: Date
}

export interface UpdateUserCommand {
  id: string
  email?: string
  name?: string
}

export interface UpdateUserResult {
  id: string
  email: string
  name: string
  createdAt: Date
}
```

#### 3. Infrastructure Layer

```typescript
// infrastructure/repositories/typeorm-user.repository.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user.repository.interface'
import { UserEntity } from '../database/entities/user.entity'

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>
  ) {}

  async findById(id: UserId): Promise<User | null> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { id: id.getValue() }
    })

    if (!userEntity) {
      return null
    }

    return this.toDomain(userEntity)
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { email: email.getValue() }
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

  async delete(id: UserId): Promise<void> {
    await this.userEntityRepository.delete(id.getValue())
  }

  async exists(email: Email): Promise<boolean> {
    const count = await this.userEntityRepository.count({
      where: { email: email.getValue() }
    })
    return count > 0
  }

  private toDomain(entity: UserEntity): User {
    return User.create(entity.email, entity.name)
  }

  private toEntity(user: User): UserEntity {
    const entity = new UserEntity()
    entity.id = user.getId().getValue()
    entity.email = user.getEmail().getValue()
    entity.name = user.getName().getValue()
    entity.createdAt = user.getCreatedAt()
    return entity
  }
}

// infrastructure/database/entities/user.entity.ts
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date
}

// infrastructure/external/email.service.ts
import { Injectable } from '@nestjs/common'
import { EmailService } from '../../application/interfaces/email.service.interface'

@Injectable()
export class SendGridEmailService implements EmailService {
  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    // SendGrid implementation
    console.log(`Sending welcome email to ${email} for ${name}`)
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    // SendGrid implementation
    console.log(`Sending password reset email to ${email}`)
  }
}
```

#### 4. Presentation Layer

```typescript
// presentation/controllers/user.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common'
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case'
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case'
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case'

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.createUserUseCase.execute({
      email: createUserDto.email,
      name: createUserDto.name
    })

    return {
      success: true,
      data: result
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const result = await this.getUserUseCase.execute({ id })
    
    return {
      success: true,
      data: result
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const result = await this.updateUserUseCase.execute({
      id,
      email: updateUserDto.email,
      name: updateUserDto.name
    })

    return {
      success: true,
      data: result
    }
  }
}

// presentation/dto/user.dto.ts
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(2)
  name: string
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string
}
```

## 🎯 SOLID Principles

### 1. Single Responsibility Principle (SRP)

**Principle:** A class should have only one reason to change.

```typescript
// ❌ Bad practice - Class with multiple responsibilities
class UserManager {
  async createUser(userData: any) {
    // Validation
    if (!userData.email) throw new Error('Email required')
    
    // Persistence
    const user = await this.userRepository.save(userData)
    
    // Email
    await this.emailService.sendWelcomeEmail(user.email)
    
    // Logging
    this.logger.log(`User created: ${user.id}`)
    
    return user
  }
}

// ✅ Good practice - Separation of responsibilities
class UserValidator {
  validate(userData: CreateUserCommand): void {
    if (!userData.email) throw new ValidationError('Email required')
    if (!userData.name) throw new ValidationError('Name required')
  }
}

class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly validator: UserValidator
  ) {}

  async createUser(userData: CreateUserCommand): Promise<User> {
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

**Principle:** Entities should be open for extension but closed for modification.

```typescript
// Interface for different notification types
interface NotificationStrategy {
  send(message: string, recipient: string): Promise<void>
}

// Extensible implementations
class EmailNotificationStrategy implements NotificationStrategy {
  async send(message: string, recipient: string): Promise<void> {
    console.log(`Sending email to ${recipient}: ${message}`)
  }
}

class SmsNotificationStrategy implements NotificationStrategy {
  async send(message: string, recipient: string): Promise<void> {
    console.log(`Sending SMS to ${recipient}: ${message}`)
  }
}

class PushNotificationStrategy implements NotificationStrategy {
  async send(message: string, recipient: string): Promise<void> {
    console.log(`Sending push notification to ${recipient}: ${message}`)
  }
}

// Service open for extension, closed for modification
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

// Extension without modification
class SlackNotificationStrategy implements NotificationStrategy {
  async send(message: string, recipient: string): Promise<void> {
    console.log(`Sending Slack message to ${recipient}: ${message}`)
  }
}
```

### 3. Liskov Substitution Principle (LSP)

**Principle:** Objects of a superclass should be replaceable with objects of a subclass without altering behavior.

```typescript
// Base interface
interface Shape {
  area(): number
  perimeter(): number
}

// Implementations that respect the contract
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

class Square extends Rectangle {
  constructor(side: number) {
    super(side, side)
  }
}

// Service that uses shapes without knowing their concrete type
class ShapeCalculator {
  calculateTotalArea(shapes: Shape[]): number {
    return shapes.reduce((total, shape) => total + shape.area(), 0)
  }

  calculateTotalPerimeter(shapes: Shape[]): number {
    return shapes.reduce((total, shape) => total + shape.perimeter(), 0)
  }
}

// Usage - all shapes are interchangeable
const shapes: Shape[] = [
  new Rectangle(5, 10),
  new Circle(3),
  new Square(4)
]

const calculator = new ShapeCalculator()
const totalArea = calculator.calculateTotalArea(shapes)
const totalPerimeter = calculator.calculateTotalPerimeter(shapes)
```

### 4. Interface Segregation Principle (ISP)

**Principle:** No client should be forced to depend on methods it does not use.

```typescript
// ❌ Interface too broad
interface UserOperations {
  createUser(userData: CreateUserCommand): Promise<User>
  updateUser(id: string, userData: UpdateUserCommand): Promise<User>
  deleteUser(id: string): Promise<void>
  sendEmail(userId: string, message: string): Promise<void>
  generateReport(userId: string): Promise<Report>
}

// ✅ Separate and specialized interfaces
interface UserRepository {
  create(userData: CreateUserCommand): Promise<User>
  update(id: string, userData: UpdateUserCommand): Promise<User>
  delete(id: string): Promise<void>
  findById(id: string): Promise<User | null>
}

interface EmailService {
  sendEmail(userId: string, message: string): Promise<void>
}

interface ReportService {
  generateReport(userId: string): Promise<Report>
}

// Classes that implement only what they need
class UserService implements UserRepository {
  async create(userData: CreateUserCommand): Promise<User> {
    // Implementation
    return { id: '1', ...userData, createdAt: new Date(), updatedAt: new Date() }
  }
  
  async update(id: string, userData: UpdateUserCommand): Promise<User> {
    // Implementation
    return { id, ...userData, createdAt: new Date(), updatedAt: new Date() }
  }
  
  async delete(id: string): Promise<void> {
    // Implementation
  }
  
  async findById(id: string): Promise<User | null> {
    // Implementation
    return null
  }
}

class EmailNotificationService implements EmailService {
  async sendEmail(userId: string, message: string): Promise<void> {
    // Implementation
    console.log(`Sending email to user ${userId}: ${message}`)
  }
}
```

### 5. Dependency Inversion Principle (DIP)

**Principle:** High-level modules should not depend on low-level modules. Both should depend on abstractions.

```typescript
// Abstractions (interfaces)
interface UserRepository {
  findById(id: string): Promise<User | null>
  save(user: User): Promise<User>
}

interface EmailService {
  sendWelcomeEmail(email: string): Promise<void>
}

interface EventBus {
  publish(event: DomainEvent): Promise<void>
}

// Concrete implementations
class TypeOrmUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    // TypeORM implementation
    return null
  }
  
  async save(user: User): Promise<User> {
    // TypeORM implementation
    return user
  }
}

class SendGridEmailService implements EmailService {
  async sendWelcomeEmail(email: string): Promise<void> {
    // SendGrid implementation
    console.log(`Sending welcome email to ${email}`)
  }
}

class InMemoryEventBus implements EventBus {
  async publish(event: DomainEvent): Promise<void> {
    // In-memory implementation
    console.log(`Publishing event: ${event.constructor.name}`)
  }
}

// High-level service that depends on abstractions
class UserService {
  constructor(
    private readonly userRepository: UserRepository, // Abstraction
    private readonly emailService: EmailService,     // Abstraction
    private readonly eventBus: EventBus              // Abstraction
  ) {}

  async createUser(userData: CreateUserCommand): Promise<User> {
    const user = await this.userRepository.save(userData as User)
    await this.emailService.sendWelcomeEmail(user.email)
    await this.eventBus.publish(new UserCreatedEvent(user))
    return user
  }
}

// Dependency injection in module
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
    {
      provide: 'EventBus',
      useClass: InMemoryEventBus,
    },
  ],
})
export class UserModule {}
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
      UserId.create(data.id),
      Email.create(data.email),
      UserName.create(data.name),
      new Date(data.createdAt)
    )
  }
}

// domain/factories/notification.factory.ts
export class NotificationFactory {
  static create(type: NotificationType, config: any): Notification {
    switch (type) {
      case NotificationType.EMAIL:
        return new EmailNotification(config)
      case NotificationType.SMS:
        return new SmsNotification(config)
      case NotificationType.PUSH:
        return new PushNotification(config)
      default:
        throw new Error(`Unknown notification type: ${type}`)
    }
  }
}
```

### 3. Observer Pattern with Events

```typescript
// domain/events/user-created.event.ts
export class UserCreatedEvent implements DomainEvent {
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
    // Send welcome email
    await this.emailService.sendWelcomeEmail(event.email)
    
    // Track event
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
    const user = new User(
      UserId.generate(),
      Email.create(email),
      UserName.create(name),
      new Date()
    )
    
    const savedUser = await this.userRepository.save(user)
    
    // Publish event
    await this.eventBus.publish(
      new UserCreatedEvent(savedUser.getId().getValue(), savedUser.getEmail().getValue(), new Date())
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
    // Credit card payment logic
    return new PaymentResult(true, 'Payment successful', 'txn_123')
  }
}

// domain/strategies/paypal.strategy.ts
export class PayPalStrategy implements PaymentStrategy {
  async processPayment(amount: number, details: any): Promise<PaymentResult> {
    // PayPal payment logic
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

## 💡 Advanced Examples

### 1. Complete Module with NestJS

```typescript
// user.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './presentation/controllers/user.controller'
import { CreateUserUseCase } from './application/use-cases/create-user.use-case'
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case'
import { GetUserUseCase } from './application/use-cases/get-user.use-case'
import { TypeOrmUserRepository } from './infrastructure/repositories/typeorm-user.repository'
import { SendGridEmailService } from './infrastructure/external/email.service'
import { InMemoryEventBus } from './infrastructure/events/event-bus'
import { UserEntity } from './infrastructure/database/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    // Use Cases
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserUseCase,
    
    // Repositories
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    
    // External Services
    {
      provide: 'EmailService',
      useClass: SendGridEmailService,
    },
    
    // Event Bus
    {
      provide: 'EventBus',
      useClass: InMemoryEventBus,
    },
  ],
})
export class UserModule {}
```

### 2. Unit Tests

```typescript
// application/use-cases/create-user.use-case.spec.ts
describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase
  let userRepository: jest.Mocked<UserRepository>
  let userDomainService: jest.Mocked<UserDomainService>
  let eventBus: jest.Mocked<EventBus>

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
    }

    userDomainService = {
      isEmailUnique: jest.fn(),
      canChangeEmail: jest.fn(),
    }

    eventBus = {
      publish: jest.fn(),
    }

    useCase = new CreateUserUseCase(
      userRepository,
      userDomainService,
      eventBus
    )
  })

  it('should create a user successfully', async () => {
    // Arrange
    const command: CreateUserCommand = {
      email: 'test@example.com',
      name: 'Test User'
    }

    userDomainService.isEmailUnique.mockResolvedValue(true)
    userRepository.save.mockResolvedValue(
      User.create(command.email, command.name)
    )

    // Act
    const result = await useCase.execute(command)

    // Assert
    expect(userDomainService.isEmailUnique).toHaveBeenCalledWith(
      expect.any(Email)
    )
    expect(userRepository.save).toHaveBeenCalledWith(expect.any(User))
    expect(eventBus.publish).toHaveBeenCalledWith(expect.any(UserCreatedEvent))
    expect(result.email).toBe(command.email)
    expect(result.name).toBe(command.name)
  })

  it('should throw error if email already exists', async () => {
    // Arrange
    const command: CreateUserCommand = {
      email: 'existing@example.com',
      name: 'Test User'
    }

    userDomainService.isEmailUnique.mockResolvedValue(false)

    // Act & Assert
    await expect(useCase.execute(command)).rejects.toThrow('Email already exists')
  })
})
```

## 📚 Resources

### Architecture
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

### SOLID Principles
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)
- [Open/Closed Principle](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html)

### Design Patterns
- [Design Patterns](https://refactoring.guru/design-patterns)
- [Gang of Four Patterns](https://en.wikipedia.org/wiki/Design_Patterns)
- [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/)

### Tools and frameworks
- [NestJS](https://docs.nestjs.com/) - Node.js framework
- [TypeORM](https://typeorm.io/) - TypeScript ORM
- [Jest](https://jestjs.io/) - Testing framework

---

*Last updated: January 2024*
