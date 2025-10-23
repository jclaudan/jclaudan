# 🔵 TypeScript - Complete Guide

> **TypeScript** is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static types, advanced development tools and a better development experience for JavaScript.

## 📋 Table of Contents
- [🎯 Complete Reference Tables](#-complete-reference-tables-typescript)
- [🚀 Introduction](#-introduction)
- [🟢 Basic Types](#-beginner---basic-types)
- [🟡 Advanced Types](#-intermediate---advanced-types)
- [🟠 Patterns and Best Practices](#-advanced---patterns-and-best-practices)
- [🔴 Architecture and SOLID](#-senior---architecture-and-solid)
- [⚫ Conditional and Advanced Types](#-expert---conditional-and-advanced-types)
- [📚 Resources](#-resources)

---

## 🎯 Complete Reference Tables TypeScript

### 🎯 Primitive Types

| Type | Description | Example | Usage |
|------|-------------|---------|-------|
| **string** | Character string | `"Hello World"` | Text, names, messages |
| **number** | Number | `42`, `3.14` | Calculations, counters, IDs |
| **boolean** | Boolean | `true`, `false` | Conditions, flags |
| **null** | Null value | `null` | Absence of value |
| **undefined** | Undefined | `undefined` | Uninitialized variable |
| **void** | No return | `void` | Functions without return |
| **never** | Never reached | `never` | Functions that never return |
| **any** | Any type | `any` | Avoid if possible |
| **unknown** | Unknown type | `unknown` | Safe alternative to `any` |

### 🎯 Basic Types

| Type | Description | Example | Usage |
|------|-------------|---------|-------|
| **Array** | Array | `string[]`, `Array<number>` | Element collections |
| **Tuple** | Tuple | `[string, number]` | Fixed-size array |
| **Object** | Object | `{ name: string }` | Data structures |
| **Function** | Function | `(x: number) => string` | Typed functions |
| **Enum** | Enumeration | `enum Color { Red, Blue }` | Named constants |
| **Union** | Union | `string \| number` | Multiple possible types |
| **Intersection** | Intersection | `A & B` | Type combination |
| **Literal** | Literal | `"success" \| "error"` | Specific values |

### 🎯 Utility Types

| Type | Description | Example | Usage |
|------|-------------|---------|-------|
| **Partial<T>** | All properties optional | `Partial<User>` | Partial updates |
| **Required<T>** | All properties required | `Required<User>` | Strict validation |
| **Pick<T, K>** | Select properties | `Pick<User, 'id' \| 'name'>` | Subsets |
| **Omit<T, K>** | Exclude properties | `Omit<User, 'password'>` | Hide data |
| **Record<K, V>** | Object with typed keys | `Record<string, number>` | Typed maps |
| **Exclude<T, U>** | Exclude types | `Exclude<string \| number, string>` | Type filtering |
| **Extract<T, U>** | Extract types | `Extract<string \| number, string>` | Type selection |
| **NonNullable<T>** | Exclude null/undefined | `NonNullable<string \| null>` | Non-nullable types |
| **ReturnType<T>** | Return type | `ReturnType<() => string>` | Function types |
| **Parameters<T>** | Function parameters | `Parameters<(a: string) => void>` | Parameter types |

### 🎯 Property Modifiers

| Modifier | Description | Example | Usage |
|----------|-------------|---------|-------|
| **readonly** | Read-only | `readonly name: string` | Immutability |
| **optional** | Optional | `name?: string` | Optional properties |
| **required** | Required | `name: string` | Required properties |
| **public** | Public | `public name: string` | Public access (default) |
| **private** | Private | `private name: string` | Private access |
| **protected** | Protected | `protected name: string` | Protected access |
| **static** | Static | `static count: number` | Class properties |
| **abstract** | Abstract | `abstract method()` | Abstract methods |

### 🎯 Decorators

| Decorator | Description | Example | Usage |
|-----------|-------------|---------|-------|
| **@Component** | Component | `@Component({})` | Frameworks (Angular) |
| **@Injectable** | Service | `@Injectable()` | Dependency injection |
| **@Input** | Input property | `@Input() name: string` | Parent-child communication |
| **@Output** | Output event | `@Output() change = new EventEmitter()` | Child-parent communication |
| **@HostListener** | Event listener | `@HostListener('click')` | Event handling |
| **@ViewChild** | Child reference | `@ViewChild('input')` | DOM element access |
| **@Pipe** | Custom pipe | `@Pipe({ name: 'custom' })` | Data transformation |
| **@Directive** | Directive | `@Directive({ selector: '[custom]' })` | Custom behavior |

### 🎯 TypeScript Configuration

| Option | Description | Default Value | Usage |
|--------|-------------|---------------|-------|
| **target** | Target JavaScript version | `ES3` | Browser compatibility |
| **module** | Module system | `CommonJS` | Module management |
| **lib** | Included libraries | `[]` | Available APIs |
| **strict** | Strict mode | `false` | Strict checks |
| **noImplicitAny** | Error on implicit `any` | `false` | Strict typing |
| **strictNullChecks** | Null/undefined checking | `false` | Null handling |
| **strictFunctionTypes** | Strict function types | `false` | Function checking |
| **noImplicitReturns** | Explicit return required | `false` | Complete functions |
| **noUnusedLocals** | Unused local variables | `false` | Clean code |
| **noUnusedParameters** | Unused parameters | `false` | Clean signatures |
| **exactOptionalPropertyTypes** | Exact optional types | `false` | Type precision |
| **noImplicitOverride** | Explicit override | `false` | Clear inheritance |
| **noPropertyAccessFromIndexSignature** | Index access | `false` | Property access |
| **noUncheckedIndexedAccess** | Checked indexed access | `false` | Access safety |

### 🎯 TypeScript Commands

| Command | Description | Example | Usage |
|---------|-------------|---------|-------|
| **tsc** | Compile TypeScript | `tsc file.ts` | Compilation |
| **tsc --init** | Initialize config | `tsc --init` | Create tsconfig.json |
| **tsc --watch** | Watch mode | `tsc --watch` | Continuous compilation |
| **tsc --noEmit** | Check without compilation | `tsc --noEmit` | Validation |
| **tsc --strict** | Strict mode | `tsc --strict` | Strict checks |
| **tsc --build** | Incremental build | `tsc --build` | Optimized compilation |
| **tsc --showConfig** | Show config | `tsc --showConfig` | See configuration |
| **tsc --listFiles** | List files | `tsc --listFiles` | Compiled files |
| **tsc --version** | Version | `tsc --version` | TypeScript version |

---

## 🚀 Introduction

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static types, advanced development tools and a better development experience.

### What is TypeScript?
TypeScript is a programming language developed by Microsoft that extends JavaScript by adding a static type system. It allows error detection at compilation time, improves development experience and facilitates code maintenance.

### Why choose TypeScript?
- **🎯 Static Typing**: Error detection at compilation time
- **🔍 IntelliSense**: Autocompletion and integrated documentation
- **🔄 Refactoring**: Safe refactoring at scale
- **📝 Interfaces**: Clear contracts between components
- **🔧 Generics**: Reusable and type-safe code
- **⚡ Performance**: Better code optimization
- **🛡️ Security**: Prevention of common errors
- **📚 Documentation**: Types as living documentation

## 🎯 Advanced Types

### 1. Utility Types

```typescript
// Built-in utility types
interface User {
  id: number
  name: string
  email: string
  age: number
  isActive: boolean
}

// Partial<T> - Makes all properties optional
type PartialUser = Partial<User>
// { id?: number; name?: string; email?: string; age?: number; isActive?: boolean }

// Required<T> - Makes all properties required
type RequiredUser = Required<PartialUser>
// { id: number; name: string; email: string; age: number; isActive: boolean }

// Pick<T, K> - Selects certain properties
type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>
// { id: number; name: string; email: string }

// Omit<T, K> - Excludes certain properties
type UserWithoutId = Omit<User, 'id'>
// { name: string; email: string; age: number; isActive: boolean }

// Record<K, V> - Creates an object with typed keys and values
type UserRoles = Record<string, string[]>
// { [key: string]: string[] }

// Exclude<T, U> - Excludes types
type NonNullable<T> = Exclude<T, null | undefined>

// Extract<T, U> - Extracts types
type StringOrNumber = string | number
type OnlyString = Extract<StringOrNumber, string> // string
```

### 2. Conditional Types

```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false

type Test1 = IsString<string>  // true
type Test2 = IsString<number>  // false

// Conditional type with inference
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Func = () => string
type FuncReturn = ReturnType<Func> // string

// Distributive conditional type
type ToArray<T> = T extends any ? T[] : never

type StrArrOrNumArr = ToArray<string | number> // string[] | number[]

// Non-distributive conditional type
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never

type StrOrNumArr = ToArrayNonDist<string | number> // (string | number)[]
```

### 3. Mapped Types

```typescript
// Basic mapped type
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// Mapped type with modifiers
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

type Optional<T> = {
  [P in keyof T]?: T[P]
}

// Mapped type with filtering
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

// Mapped type with transformation
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

interface Person {
  name: string
  age: number
}

type PersonGetters = Getters<Person>
// { getName: () => string; getAge: () => number }
```

### 4. Template Literal Types

```typescript
// Template literal types
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<'click'> // 'onClick'
type MouseEvent = EventName<'mouse'> // 'onMouse'

// Template types with inference
type ParseEventName<T> = T extends `on${infer U}` ? Uncapitalize<U> : never

type ClickEventParsed = ParseEventName<'onClick'> // 'click'

// Complex template types
type ApiEndpoint<T extends string> = `/api/${T}`

type UserEndpoint = ApiEndpoint<'users'> // '/api/users'
type ProductEndpoint = ApiEndpoint<'products'> // '/api/products'
```

## 🎯 Best Practices

### 1. TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020", "DOM"],
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
    "noUncheckedIndexedAccess": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### 2. Type Definition

```typescript
// types/common.ts
export type ID = string | number

export interface BaseEntity {
  id: ID
  createdAt: Date
  updatedAt: Date
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// types/user.ts
export interface User extends BaseEntity {
  email: string
  name: string
  isActive: boolean
  profile?: UserProfile
}

export interface UserProfile {
  avatar?: string
  bio?: string
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark'
  language: string
  notifications: boolean
}

// types/api.ts
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}
```

### 3. Error Handling

```typescript
// types/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly isOperational: boolean = true
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public readonly field?: string) {
    super(message, 'VALIDATION_ERROR', 400)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401)
  }
}

// utils/error-handler.ts
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export function handleError(error: unknown): AppError {
  if (isAppError(error)) {
    return error
  }
  
  if (error instanceof Error) {
    return new AppError(error.message, 'UNKNOWN_ERROR')
  }
  
  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR')
}
```

### 4. Validation with Zod

```typescript
// schemas/user.schema.ts
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(50),
  age: z.number().min(18).max(120),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export const UpdateUserSchema = CreateUserSchema.partial()

export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>

// utils/validation.ts
export function validateUser(data: unknown): User {
  return UserSchema.parse(data)
}

export function validateCreateUser(data: unknown): CreateUser {
  return CreateUserSchema.parse(data)
}

export function validateUpdateUser(data: unknown): UpdateUser {
  return UpdateUserSchema.parse(data)
}
```

## 🏗️ Design Patterns

### 1. Singleton Pattern

```typescript
// patterns/singleton.ts
class DatabaseConnection {
  private static instance: DatabaseConnection
  private connection: any

  private constructor() {
    this.connection = this.initializeConnection()
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  private initializeConnection(): any {
    // Connection initialization
    return { connected: true }
  }

  public getConnection(): any {
    return this.connection
  }
}

// Usage
const db1 = DatabaseConnection.getInstance()
const db2 = DatabaseConnection.getInstance()
console.log(db1 === db2) // true
```

### 2. Factory Pattern

```typescript
// patterns/factory.ts
interface Animal {
  makeSound(): string
}

class Dog implements Animal {
  makeSound(): string {
    return 'Woof!'
  }
}

class Cat implements Animal {
  makeSound(): string {
    return 'Meow!'
  }
}

class Bird implements Animal {
  makeSound(): string opened {
    return 'Tweet!'
  }
}

type AnimalType = 'dog' | 'cat' | 'bird'

class AnimalFactory {
  public static createAnimal(type: AnimalType): Animal {
    switch (type) {
      case 'dog':
        return new Dog()
      case 'cat':
        return new Cat()
      case 'bird':
        return new Bird()
      default:
        throw new Error(`Unknown animal type: ${type}`)
    }
  }
}

// Usage
const dog = AnimalFactory.createAnimal('dog')
console.log(dog.makeSound()) // "Woof!"
```

### 3. Observer Pattern

```typescript
// patterns/observer.ts
interface Observer<T> {
  update(data: T): void
}

interface Subject<T> {
  attach(observer: Observer<T>): void
  detach(observer: Observer<T>): void
  notify(data: T): void
}

class EventEmitter<T> implements Subject<T> {
  private observers: Observer<T>[] = []

  attach(observer: Observer<T>): void {
    this.observers.push(observer)
  }

  detach(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer.update(data))
  }
}

// Example usage
class UserService {
  private userCreatedEmitter = new EventEmitter<User>()

  public onUserCreated(observer: Observer<User>): void {
    this.userCreatedEmitter.attach(observer)
  }

  public async createUser(userData: CreateUser): Promise<User> {
    const user = await this.saveUser(userData)
    this.userCreatedEmitter.notify(user)
    return user
  }

  private async saveUser(userData: CreateUser): Promise<User> {
    // Save logic
    return { id: '1', ...userData, createdAt: new Date(), updatedAt: new Date() }
  }
}

// Observer
class EmailNotificationService implements Observer<User> {
  update(user: User): void {
    console.log(`Sending welcome email to ${user.email}`)
  }
}
```

### 4. Strategy Pattern

```typescript
// patterns/strategy.ts
interface PaymentStrategy {
  pay(amount: number): Promise<PaymentResult>
}

interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
}

class CreditCardPayment implements PaymentStrategy {
  async pay(amount: number): Promise<PaymentResult> {
    // Credit card payment logic
    return {
      success: true,
      transactionId: `cc_${Date.now()}`
    }
  }
}

class PayPalPayment implements PaymentStrategy {
  async pay(amount: number): Promise<PaymentResult> {
    // PayPal payment logic
    return {
      success: true,
      transactionId: `pp_${Date.now()}`
    }
  }
}

class BankTransferPayment implements PaymentStrategy {
  async pay(amount: number): Promise<PaymentResult> {
    // Bank transfer logic
    return {
      success: true,
      transactionId: `bt_${Date.now()}`
    }
  }
}

class PaymentProcessor {
  private strategies: Map<string, PaymentStrategy> = new Map()

  constructor() {
    this.strategies.set('credit_card', new CreditCardPayment())
    this.strategies.set('paypal', new PayPalPayment())
    this.strategies.set('bank_transfer', new BankTransferPayment())
  }

  async processPayment(method: string, amount: number): Promise<PaymentResult> {
    const strategy = this.strategies.get(method)
    
    if (!strategy) {
      return {
        success: false,
        error: `Payment method ${method} not supported`
      }
    }

    return await strategy.pay(amount)
  }
}
```

## 🎯 SOLID Principles

### 1. Single Responsibility Principle (SRP)

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
  validate(userData: CreateUser): void {
    if (!userData.email) throw new ValidationError('Email required')
    if (!userData.name) throw new ValidationError('Name required')
  }
}

class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly validator: UserValidator
  ) {}

  async createUser(userData: CreateUser): Promise<User> {
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
// Interface for different types of notifications
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
```

### 3. Liskov Substitution Principle (LSP)

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

// Service that uses shapes without knowing their concrete type
class ShapeCalculator {
  calculateTotalArea(shapes: Shape[]): number {
    return shapes.reduce((total, shape) => total + shape.area(), 0)
  }
}
```

### 4. Interface Segregation Principle (ISP)

```typescript
// ❌ Interface too broad
interface UserOperations {
  createUser(userData: CreateUser): Promise<User>
  updateUser(id: string, userData: UpdateUser): Promise<User>
  deleteUser(id: string): Promise<void>
  sendEmail(userId: string, message: string): Promise<void>
  generateReport(userId: string): Promise<Report>
}

// ✅ Separate and specialized interfaces
interface UserRepository {
  create(userData: CreateUser): Promise<User>
  update(id: string, userData: UpdateUser): Promise<User>
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
  async create(userData: CreateUser): Promise<User> {
    // Implementation
    return { id: '1', ...userData, createdAt: new Date(), updatedAt: new Date() }
  }
  
  async update(id: string, userData: UpdateUser): Promise<User> {
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

// High-level service that depends on abstractions
class UserService {
  constructor(
    private readonly userRepository: UserRepository, // Abstraction
    private readonly emailService: EmailService      // Abstraction
  ) {}

  async createUser(userData: CreateUser): Promise<User> {
    const user = await this.userRepository.save(userData as User)
    await this.emailService.sendWelcomeEmail(user.email)
    return user
  }
}
```

## 🏛️ Architecture

### 1. Layered Architecture

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

// application/services/user.service.ts
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

// infrastructure/repositories/typeorm-user.repository.ts
export class TypeOrmUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    // TypeORM implementation
    return null
  }

  async findByEmail(email: string): Promise<User | null> {
    // TypeORM implementation
    return null
  }

  async save(user: User): Promise<User> {
    // TypeORM implementation
    return user
  }

  async delete(id: string): Promise<void> {
    // TypeORM implementation
  }
}
```

## 💡 Advanced Snippets

### 1. Type Utilities

```typescript
// utils/types.ts
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

export type NonNullable<T> = T extends null | undefined ? never : T

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

// Usage example
interface User {
  id: string
  name: string
  email: string
  profile?: {
    avatar?: string
    bio?: string
  }
}

type PartialUser = DeepPartial<User>
type ReadonlyUser = DeepReadonly<User>
type UserWithoutId = Optional<User, 'id'>
type UserWithRequiredProfile = Required<User, 'profile'>
```

### 2. Promise Management

```typescript
// utils/promise.ts
export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ])
}

export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxAttempts) {
        throw lastError
      }
      
      await sleep(delay * attempt)
    }
  }

  throw lastError!
}

// Usage example
async function fetchUserData(id: string) {
  return await retry(
    () => fetch(`/api/users/${id}`).then(res => res.json()),
    3,
    1000
  )
}
```

### 3. Runtime Type Validation

```typescript
// utils/type-guards.ts
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function hasProperty<T extends string>(
  obj: unknown,
  prop: T
): obj is Record<T, unknown> {
  return isObject(obj) && prop in obj
}

// Usage example
function processUserData(data: unknown) {
  if (!isObject(data)) {
    throw new Error('Data must be an object')
  }

  if (!hasProperty(data, 'id') || !isString(data.id)) {
    throw new Error('Data must have a string id property')
  }

  if (!hasProperty(data, 'name') || !isString(data.name)) {
    throw new Error('Data must have a string name property')
  }

  // TypeScript now knows that data is { id: string; name: string; ... }
  console.log(`Processing user ${data.id}: ${data.name}`)
}
```

### 4. Error Handling with Result

```typescript
// utils/result.ts
export type Result<T, E = Error> = Success<T> | Failure<E>

export class Success<T> {
  readonly success = true as const
  constructor(public readonly data: T) {}
}

export class Failure<E> {
  readonly success = false as const
  constructor(public readonly error: E) {}
}

export function success<T>(data: T): Success<T> {
  return new Success(data)
}

export function failure<E>(error: E): Failure<E> {
  return new Failure(error)
}

export function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
  return result.success
}

export function isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
  return !result.success
}

// Usage example
async function fetchUser(id: string): Promise<Result<User, string>> {
  try {
    const response = await fetch(`/api/users/${id}`)
    
    if (!response.ok) {
      return failure(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const user = await response.json()
    return success(user)
  } catch (error) {
    return failure(`Network error: ${error}`)
  }
}

// Usage
const result = await fetchUser('123')

if (isSuccess(result)) {
  console.log('User:', result.data)
} else {
  console.error('Error:', result.error)
}
```

## 📚 Resources

### Official documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript Config](https://www.typescriptlang.org/tsconfig)

### Recommended tools
- [Zod](https://zod.dev/) - Schema validation
- [ts-node](https://typestrong.org/ts-node/) - TypeScript execution
- [tsx](https://github.com/esbuild-kit/tsx) - Fast alternative to ts-node

### Patterns and best practices
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Effective TypeScript](https://effectivetypescript.com/)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)

---

*Last updated: January 2024*
