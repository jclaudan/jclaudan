# 🎨 Design Patterns - Complete Guide

## 📋 Table of Contents

- [Introduction](#introduction)
- [Vue 3 Composition API Patterns](#vue-3-composition-api-patterns)
- [TypeScript Patterns](#typescript-patterns)
- [Node.js Patterns](#nodejs-patterns)
- [NestJS Patterns](#nestjs-patterns)
- [Functional Patterns](#functional-patterns)
- [Object-Oriented Patterns](#object-oriented-patterns)
- [Resources](#resources)

## 🚀 Introduction

This guide covers essential design patterns for modern development with Vue.js 3, TypeScript, Node.js, and NestJS. Patterns are organized by technology and programming paradigm.

### Objectives
- **Master** modern design patterns
- **Apply** patterns in each technology
- **Understand** advantages and disadvantages
- **Implement** robust and maintainable solutions

## 🎯 Vue 3 Composition API Patterns

### Vue 3 Patterns Reference Table

| Pattern | Description | Usage | Advantages |
|---------|-------------|-------|------------|
| **Composable Pattern** | Reusable composition functions | Shared logic | Reusability, testability |
| **Provider Pattern** | Data provision via provide/inject | Global state | Decoupling, flexibility |
| **Observer Pattern** | Reactivity with watch/watchEffect | Change monitoring | Reactivity, performance |
| **Factory Pattern** | Dynamic component creation | Dynamic components | Flexibility, extensibility |
| **Strategy Pattern** | Interchangeable algorithms | Conditional logic | Extensibility, maintainability |
| **Decorator Pattern** | Component enrichment | Additional features | Modularity, reusability |
| **Proxy Pattern** | Data access control | Validation, logging | Control, security |
| **Singleton Pattern** | Single instance | Services, stores | Consistency, performance |
| **Module Pattern** | Logic encapsulation | Code organization | Encapsulation, reusability |
| **Mixin Pattern** | Feature sharing | Common logic | Reusability, composition |

### Composable Pattern

```typescript
// useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  const double = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)
  
  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
    double,
    isEven
  }
}

// Usage in a component
export default {
  setup() {
    const { count, increment, decrement, double } = useCounter(10)
    
    return {
      count,
      increment,
      decrement,
      double
    }
  }
}
```

### Provider Pattern

```typescript
// useAuth.ts
import { provide, inject, ref, computed } from 'vue'

const AuthSymbol = Symbol('auth')

export function provideAuth() {
  const user = ref(null)
  const loading = ref(false)
  
  const isAuthenticated = computed(() => !!user.value)
  
  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    try {
      user.value = await authService.login(credentials)
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    user.value = null
  }
  
  const auth = {
    user: readonly(user),
    loading: readonly(loading),
    isAuthenticated,
    login,
    logout
  }
  
  provide(AuthSymbol, auth)
  return auth
}

export function useAuth() {
  const auth = inject(AuthSymbol)
  if (!auth) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return auth
}

// Usage
export default {
  setup() {
    provideAuth()
    return {}
  }
}
```

## 🎯 TypeScript Patterns

### TypeScript Patterns Reference Table

| Pattern | Description | Usage | Advantages |
|---------|-------------|-------|------------|
| **Singleton** | Single instance | Services, caches | Consistency, performance |
| **Factory** | Object creation | Complex objects | Flexibility, extensibility |
| **Builder** | Object construction | Complex objects | Readability, flexibility |
| **Observer** | Change notification | Events | Decoupling, reactivity |
| **Strategy** | Interchangeable algorithms | Conditional logic | Extensibility, testability |
| **Decorator** | Object enrichment | Additional features | Modularity, reusability |
| **Proxy** | Access control | Validation, logging | Control, security |
| **Command** | Action encapsulation | Undo/Redo, queues | Flexibility, extensibility |
| **Adapter** | Common interface | Integrations | Compatibility, reusability |
| **Facade** | Simplified interface | Complex APIs | Simplicity, maintainability |

### Singleton Pattern

```typescript
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
  
  private initializeConnection() {
    // Connection initialization
    return {}
  }
  
  public getConnection() {
    return this.connection
  }
}

// Usage
const db1 = DatabaseConnection.getInstance()
const db2 = DatabaseConnection.getInstance()
console.log(db1 === db2) // true
```

### Factory Pattern

```typescript
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

class AnimalFactory {
  static createAnimal(type: 'dog' | 'cat'): Animal {
    switch (type) {
      case 'dog':
        return new Dog()
      case 'cat':
        return new Cat()
      default:
        throw new Error('Unknown animal type')
    }
  }
}

// Usage
const dog = AnimalFactory.createAnimal('dog')
const cat = AnimalFactory.createAnimal('cat')
```

### Builder Pattern

```typescript
class User {
  constructor(
    public name: string,
    public email: string,
    public age?: number,
    public phone?: string,
    public address?: string
  ) {}
}

class UserBuilder {
  private name: string = ''
  private email: string = ''
  private age?: number
  private phone?: string
  private address?: string
  
  setName(name: string): UserBuilder {
    this.name = name
    return this
  }
  
  setEmail(email: string): UserBuilder {
    this.email = email
    return this
  }
  
  setAge(age: number): UserBuilder {
    this.age = age
    return this
  }
  
  setPhone(phone: string): UserBuilder {
    this.phone = phone
    return this
  }
  
  setAddress(address: string): UserBuilder {
    this.address = address
    return this
  }
  
  build(): User {
    return new User(this.name, this.email, this.age, this.phone, this.address)
  }
}

// Usage
const user = new UserBuilder()
  .setName('John Doe')
  .setEmail('john@example.com')
  .setAge(30)
  .setPhone('123-456-7890')
  .build()
```

## 🎯 Node.js Patterns

### Node.js Patterns Reference Table

| Pattern | Description | Usage | Advantages |
|---------|-------------|-------|------------|
| **Module Pattern** | Code encapsulation | Organization | Encapsulation, reusability |
| **Middleware Pattern** | Request processing | Express.js | Modularity, reusability |
| **Observer Pattern** | Events | EventEmitter | Decoupling, reactivity |
| **Promise Pattern** | Asynchronous handling | Async/await | Readability, error handling |
| **Stream Pattern** | Stream processing | Files, network | Performance, memory |
| **Worker Pattern** | Parallel processing | CPU intensive | Performance, scalability |
| **Circuit Breaker** | Failure protection | External services | Resilience, stability |
| **Retry Pattern** | Retry attempts | Failed operations | Resilience, reliability |
| **Rate Limiting** | Rate limiting | APIs | Protection, performance |
| **Caching Pattern** | Caching | Frequent data | Performance, efficiency |

### Middleware Pattern

```typescript
import { Request, Response, NextFunction } from 'express'

interface Middleware {
  (req: Request, res: Response, next: NextFunction): void | Promise<void>
}

class MiddlewareChain {
  private middlewares: Middleware[] = []
  
  use(middleware: Middleware): MiddlewareChain {
    this.middlewares.push(middleware)
    return this
  }
  
  async execute(req: Request, res: Response): Promise<void> {
    let index = 0
    
    const next = async (): Promise<void> => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++]
        await middleware(req, res, next)
      }
    }
    
    await next()
  }
}

// Usage
const chain = new MiddlewareChain()
  .use(loggingMiddleware)
  .use(authMiddleware)
  .use(validationMiddleware)
  .use(handlerMiddleware)
```

### Observer Pattern

```typescript
import { EventEmitter } from 'events'

class UserService extends EventEmitter {
  private users: User[] = []
  
  async createUser(userData: CreateUserData): Promise<User> {
    const user = new User(userData)
    this.users.push(user)
    
    this.emit('user:created', user)
    this.emit('user:count', this.users.length)
    
    return user
  }
  
  async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex(u => u.id === id)
    if (index !== -1) {
      const user = this.users.splice(index, 1)[0]
      this.emit('user:deleted', user)
      this.emit('user:count', this.users.length)
    }
  }
}

// Usage
const userService = new UserService()

userService.on('user:created', (user: User) => {
  console.log('User created:', user.name)
})

userService.on('user:count', (count: number) => {
  console.log('Total users:', count)
})
```

## 🎯 NestJS Patterns

### NestJS Patterns Reference Table

| Pattern | Description | Usage | Advantages |
|---------|-------------|-------|------------|
| **Dependency Injection** | Dependency injection | Services | Testability, modularity |
| **Repository Pattern** | Data abstraction | Data access | Testability, flexibility |
| **Service Layer** | Business logic | Business logic | Separation of concerns |
| **Controller Pattern** | Request handling | REST APIs | Organization, reusability |
| **Guard Pattern** | Route protection | Authentication | Security, reusability |
| **Interceptor Pattern** | Request interception | Logging, transformation | Modularity, reusability |
| **Pipe Pattern** | Validation/transformation | Data | Validation, transformation |
| **Filter Pattern** | Error handling | Exception handling | Centralization, reusability |
| **Module Pattern** | Code organization | Structure | Modularity, reusability |
| **Factory Pattern** | Service creation | Dynamic services | Flexibility, extensibility |

### Repository Pattern

```typescript
// user.repository.ts
export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
  create(userData: CreateUserDto): Promise<User>
  update(id: string, userData: UpdateUserDto): Promise<User>
  delete(id: string): Promise<void>
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userEntity: Repository<User>
  ) {}
  
  async findById(id: string): Promise<User | null> {
    return await this.userEntity.findOne({ where: { id } })
  }
  
  async findAll(): Promise<User[]> {
    return await this.userEntity.find()
  }
  
  async create(userData: CreateUserDto): Promise<User> {
    const user = this.userEntity.create(userData)
    return await this.userEntity.save(user)
  }
  
  async update(id: string, userData: UpdateUserDto): Promise<User> {
    await this.userEntity.update(id, userData)
    return await this.findById(id)
  }
  
  async delete(id: string): Promise<void> {
    await this.userEntity.delete(id)
  }
}
```

### Service Layer Pattern

```typescript
// user.service.ts
@Injectable()
export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private emailService: EmailService,
    private eventService: EventService
  ) {}
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Business validation
    if (await this.userRepository.findByEmail(createUserDto.email)) {
      throw new ConflictException('Email already exists')
    }
    
    // User creation
    const user = await this.userRepository.create(createUserDto)
    
    // Welcome email sending
    await this.emailService.sendWelcomeEmail(user.email)
    
    // Event emission
    this.eventService.emit('user.created', user)
    
    return user
  }
  
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    
    return await this.userRepository.update(id, updateUserDto)
  }
}
```

## 🎯 Functional Patterns

### Functional Patterns Reference Table

| Pattern | Description | Usage | Advantages |
|---------|-------------|-------|------------|
| **Pure Functions** | Pure functions | Calculations | Testability, predictability |
| **Higher-Order Functions** | Higher-order functions | Transformation | Reusability, composition |
| **Function Composition** | Function composition | Pipeline | Readability, modularity |
| **Currying** | Partial application | Configuration | Flexibility, reusability |
| **Partial Application** | Partial application | Configuration | Flexibility, reusability |
| **Memoization** | Caching | Performance | Performance, efficiency |
| **Monad Pattern** | Effect management | Error handling | Safety, composition |
| **Functor Pattern** | Transformation | Data | Composition, reusability |
| **Monoid Pattern** | Combination | Aggregation | Associativity, identity |
| **Lens Pattern** | Data access | Immutable data | Safety, composition |

### Function Composition

```typescript
// Pure functions
const add = (x: number) => (y: number) => x + y
const multiply = (x: number) => (y: number) => x * y
const square = (x: number) => x * x

// Function composition
const compose = <T>(...fns: Array<(arg: T) => T>) => (value: T) =>
  fns.reduceRight((acc, fn) => fn(acc), value)

const pipe = <T>(...fns: Array<(arg: T) => T>) => (value: T) =>
  fns.reduce((acc, fn) => fn(acc), value)

// Usage
const addAndSquare = compose(square, add(5))
const addAndSquarePipe = pipe(add(5), square)

console.log(addAndSquare(3)) // (3 + 5)² = 64
console.log(addAndSquarePipe(3)) // (3 + 5)² = 64
```

### Memoization Pattern

```typescript
function memoize<T extends (...args: any[]) => any>(
  fn: T
): T {
  const cache = new Map()
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Usage
const expensiveCalculation = memoize((n: number) => {
  console.log('Calculating...')
  return n * n * n
})

console.log(expensiveCalculation(5)) // Calculating... 125
console.log(expensiveCalculation(5)) // 125 (from cache)
```

## 🎯 Object-Oriented Patterns

### OOP Patterns Reference Table

| Pattern | Description | Usage | Advantages |
|---------|-------------|-------|------------|
| **Inheritance** | Inheritance | Reusability | Reusability, polymorphism |
| **Composition** | Composition | Flexibility | Flexibility, testability |
| **Aggregation** | Aggregation | Relations | Relations, modularity |
| **Encapsulation** | Encapsulation | Data | Security, maintainability |
| **Polymorphism** | Polymorphism | Flexibility | Flexibility, extensibility |
| **Abstraction** | Abstraction | Interfaces | Simplicity, maintainability |
| **Interface Segregation** | Interface segregation | Interfaces | Flexibility, maintainability |
| **Dependency Inversion** | Dependency inversion | Coupling | Testability, flexibility |
| **Open/Closed** | Open/Closed | Extensibility | Extensibility, maintainability |
| **Single Responsibility** | Single responsibility | Classes | Maintainability, testability |

### Composition Pattern

```typescript
// Interfaces
interface Flyable {
  fly(): void
}

interface Swimmable {
  swim(): void
}

interface Walkable {
  walk(): void
}

// Implementations
class FlyBehavior implements Flyable {
  fly(): void {
    console.log('Flying...')
  }
}

class SwimBehavior implements Swimmable {
  swim(): void {
    console.log('Swimming...')
  }
}

class WalkBehavior implements Walkable {
  walk(): void {
    console.log('Walking...')
  }
}

// Main class using composition
class Animal {
  constructor(
    private flyBehavior: Flyable,
    private swimBehavior: Swimmable,
    private walkBehavior: Walkable
  ) {}
  
  fly(): void {
    this.flyBehavior.fly()
  }
  
  swim(): void {
    this.swimBehavior.swim()
  }
  
  walk(): void {
    this.walkBehavior.walk()
  }
}

// Usage
const bird = new Animal(
  new FlyBehavior(),
  new SwimBehavior(),
  new WalkBehavior()
)

bird.fly() // Flying...
bird.swim() // Swimming...
bird.walk() // Walking...
```

## 📚 Resources

### Official Documentation
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [NestJS Documentation](https://docs.nestjs.com/)

### Books and Resources
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Refactoring: Improving the Design of Existing Code](https://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0134757599)

### Communities and Resources
- [Vue.js Community](https://vuejs.org/community/)
- [TypeScript Community](https://www.typescriptlang.org/community/)
- [Node.js Community](https://nodejs.org/en/community/)
- [NestJS Community](https://discord.gg/nestjs)

---

*Last updated: January 2024*
