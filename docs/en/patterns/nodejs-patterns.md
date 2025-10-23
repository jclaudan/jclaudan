# 🟠 Node.js - Design Patterns & Paradigms

## 📋 Table of Contents

- [Introduction](#introduction)
- [Basic Patterns](#basic-patterns)
- [Asynchronous Patterns](#asynchronous-patterns)
- [Performance Patterns](#performance-patterns)
- [Architecture Patterns](#architecture-patterns)
- [Advanced Patterns](#advanced-patterns)

## 🚀 Introduction

This guide covers all Node.js-specific design patterns, including OOP and functional paradigms with practical examples.

## 🎯 Basic Patterns

### 1. Singleton Pattern

#### OOP - Classic
```typescript
class DatabaseConnection {
  private static instance: DatabaseConnection
  private connection: any = null

  private constructor() {}

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  async connect(): Promise<void> {
    if (!this.connection) {
      // Simulate database connection
      this.connection = { connected: true, timestamp: Date.now() }
      console.log('Database connected')
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      this.connection = null
      console.log('Database disconnected')
    }
  }

  getConnection(): any {
    return this.connection
  }
}

// Usage
const db1 = DatabaseConnection.getInstance()
const db2 = DatabaseConnection.getInstance()
console.log(db1 === db2) // true
```

#### Functional - Module Pattern
```typescript
// database.ts
interface DatabaseState {
  connected: boolean
  timestamp: number
}

let connection: DatabaseState | null = null

export const database = {
  async connect(): Promise<void> {
    if (!connection) {
      connection = { connected: true, timestamp: Date.now() }
      console.log('Database connected')
    }
  },

  async disconnect(): Promise<void> {
    connection = null
    console.log('Database disconnected')
  },

  getConnection(): DatabaseState | null {
    return connection
  }
}
```

### 2. Factory Pattern

#### OOP - Classic
```typescript
interface Logger {
  log(message: string): void
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[CONSOLE] ${message}`)
  }
}

class FileLogger implements Logger {
  constructor(private filename: string) {}

  log(message: string): void {
    const fs = require('fs')
    fs.appendFileSync(this.filename, `[FILE] ${message}\n`)
  }
}

class DatabaseLogger implements Logger {
  constructor(private connection: any) {}

  log(message: string): void {
    // Simulate database logging
    console.log(`[DATABASE] ${message}`)
  }
}

type LoggerType = 'console' | 'file' | 'database'

class LoggerFactory {
  static createLogger(type: LoggerType, options?: any): Logger {
    switch (type) {
      case 'console':
        return new ConsoleLogger()
      case 'file':
        return new FileLogger(options.filename)
      case 'database':
        return new DatabaseLogger(options.connection)
      default:
        throw new Error(`Unknown logger type: ${type}`)
    }
  }
}

// Usage
const consoleLogger = LoggerFactory.createLogger('console')
const fileLogger = LoggerFactory.createLogger('file', { filename: 'app.log' })
const dbLogger = LoggerFactory.createLogger('database', { connection: {} })
```

#### Functional - Factory Functions
```typescript
type LoggerConfig = {
  type: 'console' | 'file' | 'database'
  filename?: string
  connection?: any
}

const createLogger = (config: LoggerConfig): Logger => {
  const { type, ...options } = config
  
  const loggerMap = {
    console: () => new ConsoleLogger(),
    file: () => new FileLogger(options.filename!),
    database: () => new DatabaseLogger(options.connection!)
  }
  
  const factory = loggerMap[type]
  if (!factory) {
    throw new Error(`Unknown logger type: ${type}`)
  }
  
  return factory()
}

// Usage
const logger = createLogger({ type: 'file', filename: 'app.log' })
```

### 3. Observer Pattern

#### OOP - Classic
```typescript
interface EventEmitter {
  on(event: string, listener: Function): void
  off(event: string, listener: Function): void
  emit(event: string, ...args: any[]): void
}

class EventEmitterImpl implements EventEmitter {
  private listeners: Map<string, Function[]> = new Map()

  on(event: string, listener: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(listener)
  }

  off(event: string, listener: Function): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      const index = eventListeners.indexOf(listener)
      if (index > -1) {
        eventListeners.splice(index, 1)
      }
    }
  }

  emit(event: string, ...args: any[]): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach(listener => listener(...args))
    }
  }
}

// Usage
const emitter = new EventEmitterImpl()
emitter.on('user:created', (user) => {
  console.log('User created:', user)
})
emitter.on('user:created', (user) => {
  console.log('Sending welcome email to:', user.email)
})

emitter.emit('user:created', { id: 1, name: 'John', email: 'john@example.com' })
```

#### Functional - Event Bus
```typescript
type EventCallback = (...args: any[]) => void

const createEventBus = () => {
  const listeners: Map<string, EventCallback[]> = new Map()

  return {
    on(event: string, callback: EventCallback) {
      if (!listeners.has(event)) {
        listeners.set(event, [])
      }
      listeners.get(event)!.push(callback)
    },

    off(event: string, callback: EventCallback) {
      const eventListeners = listeners.get(event)
      if (eventListeners) {
        const index = eventListeners.indexOf(callback)
        if (index > -1) {
          eventListeners.splice(index, 1)
        }
      }
    },

    emit(event: string, ...args: any[]) {
      const eventListeners = listeners.get(event)
      if (eventListeners) {
        eventListeners.forEach(callback => callback(...args))
      }
    }
  }
}

// Usage
const eventBus = createEventBus()
eventBus.on('data:received', (data) => {
  console.log('Data received:', data)
})
eventBus.emit('data:received', { id: 1, value: 'test' })
```

## 🎯 Asynchronous Patterns

### 1. Promise Pattern

```typescript
class PromisePool {
  private promises: Promise<any>[] = []
  private maxConcurrency: number

  constructor(maxConcurrency: number = 5) {
    this.maxConcurrency = maxConcurrency
  }

  async add<T>(promiseFactory: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const execute = async () => {
        try {
          const result = await promiseFactory()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }

      this.promises.push(execute())
      
      if (this.promises.length >= this.maxConcurrency) {
        Promise.race(this.promises).then(() => {
          this.promises = this.promises.filter(p => p !== execute())
        })
      }
    })
  }

  async waitAll(): Promise<void> {
    await Promise.all(this.promises)
  }
}

// Usage
const pool = new PromisePool(3)

const tasks = Array.from({ length: 10 }, (_, i) => 
  pool.add(() => 
    new Promise(resolve => 
      setTimeout(() => resolve(`Task ${i} completed`), Math.random() * 1000)
    )
  )
)

await pool.waitAll()
console.log('All tasks completed')
```

### 2. Async Iterator Pattern

```typescript
class AsyncDataStream {
  private data: any[] = []
  private index = 0

  constructor(initialData: any[] = []) {
    this.data = initialData
  }

  async *[Symbol.asyncIterator]() {
    while (this.index < this.data.length) {
      yield this.data[this.index++]
    }
  }

  add(item: any): void {
    this.data.push(item)
  }

  async *fetchFromAPI(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    
    for (const item of data) {
      yield item
    }
  }
}

// Usage
const stream = new AsyncDataStream([1, 2, 3, 4, 5])

for await (const item of stream) {
  console.log(item)
}

// Async generator
async function* fetchUsers() {
  const response = await fetch('/api/users')
  const users = await response.json()
  
  for (const user of users) {
    yield user
  }
}

for await (const user of fetchUsers()) {
  console.log('User:', user.name)
}
```

### 3. Circuit Breaker Pattern

```typescript
enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN'
}

class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED
  private failureCount = 0
  private lastFailureTime = 0
  private readonly failureThreshold: number
  private readonly timeout: number

  constructor(failureThreshold: number = 5, timeout: number = 60000) {
    this.failureThreshold = failureThreshold
    this.timeout = timeout
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = CircuitState.HALF_OPEN
      } else {
        throw new Error('Circuit breaker is OPEN')
      }
    }

    try {
      const result = await operation()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess(): void {
    this.failureCount = 0
    this.state = CircuitState.CLOSED
  }

  private onFailure(): void {
    this.failureCount++
    this.lastFailureTime = Date.now()
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = CircuitState.OPEN
    }
  }

  getState(): CircuitState {
    return this.state
  }
}

// Usage
const circuitBreaker = new CircuitBreaker(3, 5000)

const riskyOperation = async () => {
  if (Math.random() < 0.7) {
    throw new Error('Operation failed')
  }
  return 'Success'
}

try {
  const result = await circuitBreaker.execute(riskyOperation)
  console.log(result)
} catch (error) {
  console.log('Circuit breaker state:', circuitBreaker.getState())
  console.log('Error:', error.message)
}
```

## 🎯 Performance Patterns

### 1. Object Pool Pattern

```typescript
class ObjectPool<T> {
  private pool: T[] = []
  private createFn: () => T
  private resetFn: (obj: T) => void
  private maxSize: number

  constructor(createFn: () => T, resetFn: (obj: T) => void, maxSize: number = 10) {
    this.createFn = createFn
    this.resetFn = resetFn
    this.maxSize = maxSize
  }

  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!
    }
    return this.createFn()
  }

  release(obj: T): void {
    if (this.pool.length < this.maxSize) {
      this.resetFn(obj)
      this.pool.push(obj)
    }
  }

  get size(): number {
    return this.pool.length
  }
}

// Usage
class DatabaseConnection {
  id: string = ''
  connected: boolean = false

  connect(): void {
    this.connected = true
    this.id = Math.random().toString(36)
  }

  disconnect(): void {
    this.connected = false
    this.id = ''
  }

  reset(): void {
    this.disconnect()
  }
}

const connectionPool = new ObjectPool(
  () => new DatabaseConnection(),
  (conn) => conn.reset(),
  5
)

const conn1 = connectionPool.acquire()
conn1.connect()
console.log('Connection 1:', conn1.id)

connectionPool.release(conn1)
console.log('Pool size:', connectionPool.size)
```

### 2. Memoization Pattern

```typescript
function memoize<T extends (...args: any[]) => any>(
  fn: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>()

  return ((...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Usage
const expensiveCalculation = (n: number): number => {
  console.log('Calculating...')
  return n * n * n
}

const memoizedCalculation = memoize(expensiveCalculation)

console.log(memoizedCalculation(5)) // "Calculating..." then 125
console.log(memoizedCalculation(5)) // 125 (from cache)
```

### 3. Lazy Loading Pattern

```typescript
class LazyLoader<T> {
  private _value: T | undefined
  private _factory: () => Promise<T>
  private _promise: Promise<T> | undefined

  constructor(factory: () => Promise<T>) {
    this._factory = factory
  }

  async getValue(): Promise<T> {
    if (this._value !== undefined) {
      return this._value
    }

    if (this._promise) {
      return this._promise
    }

    this._promise = this._factory().then(value => {
      this._value = value
      return value
    })

    return this._promise
  }

  get isLoaded(): boolean {
    return this._value !== undefined
  }
}

// Usage
const lazyData = new LazyLoader(async () => {
  console.log('Loading data from API...')
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { data: 'expensive data' }
})

console.log(lazyData.isLoaded) // false
const data = await lazyData.getValue() // "Loading data from API..." then { data: 'expensive data' }
console.log(lazyData.isLoaded) // true
```

## 🎯 Architecture Patterns

### 1. Middleware Pattern

```typescript
type Middleware<T> = (context: T, next: () => Promise<void>) => Promise<void>

class MiddlewarePipeline<T> {
  private middlewares: Middleware<T>[] = []

  use(middleware: Middleware<T>): this {
    this.middlewares.push(middleware)
    return this
  }

  async execute(context: T): Promise<void> {
    let index = 0

    const next = async (): Promise<void> => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++]
        await middleware(context, next)
      }
    }

    await next()
  }
}

// Usage
interface RequestContext {
  url: string
  method: string
  headers: Record<string, string>
  body: any
}

const pipeline = new MiddlewarePipeline<RequestContext>()

pipeline
  .use(async (context, next) => {
    console.log('Logging middleware:', context.method, context.url)
    await next()
  })
  .use(async (context, next) => {
    console.log('Authentication middleware')
    await next()
  })
  .use(async (context, next) => {
    console.log('Processing request')
    await next()
  })

const context: RequestContext = {
  url: '/api/users',
  method: 'GET',
  headers: {},
  body: null
}

await pipeline.execute(context)
```

### 2. Repository Pattern

```typescript
interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>
  findAll(): Promise<T[]>
  save(entity: T): Promise<T>
  update(entity: T): Promise<T>
  delete(id: ID): Promise<void>
}

class InMemoryRepository<T extends { id: ID }, ID> implements Repository<T, ID> {
  private entities: Map<ID, T> = new Map()

  async findById(id: ID): Promise<T | null> {
    return this.entities.get(id) || null
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.entities.values())
  }

  async save(entity: T): Promise<T> {
    this.entities.set(entity.id, entity)
    return entity
  }

  async update(entity: T): Promise<T> {
    if (!this.entities.has(entity.id)) {
      throw new Error(`Entity with id ${entity.id} not found`)
    }
    this.entities.set(entity.id, entity)
    return entity
  }

  async delete(id: ID): Promise<void> {
    this.entities.delete(id)
  }
}

// Usage
interface User {
  id: string
  name: string
  email: string
}

const userRepository = new InMemoryRepository<User, string>()

const user: User = { id: '1', name: 'John', email: 'john@example.com' }
await userRepository.save(user)
const foundUser = await userRepository.findById('1')
console.log(foundUser) // { id: '1', name: 'John', email: 'john@example.com' }
```

### 3. Service Layer Pattern

```typescript
interface UserService {
  createUser(userData: Omit<User, 'id'>): Promise<User>
  getUserById(id: string): Promise<User | null>
  updateUser(id: string, userData: Partial<User>): Promise<User>
  deleteUser(id: string): Promise<void>
  getAllUsers(): Promise<User[]>
}

class UserServiceImpl implements UserService {
  constructor(private userRepository: Repository<User, string>) {}

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const user: User = {
      id: Math.random().toString(36),
      ...userData
    }
    return this.userRepository.save(user)
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id)
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findById(id)
    if (!existingUser) {
      throw new Error(`User with id ${id} not found`)
    }
    
    const updatedUser = { ...existingUser, ...userData }
    return this.userRepository.update(updatedUser)
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id)
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll()
  }
}

// Usage
const userRepository = new InMemoryRepository<User, string>()
const userService = new UserServiceImpl(userRepository)

const newUser = await userService.createUser({
  name: 'Jane',
  email: 'jane@example.com'
})
console.log('Created user:', newUser)
```

## 🎯 Advanced Patterns

### 1. Event Sourcing Pattern

```typescript
interface Event {
  id: string
  type: string
  data: any
  timestamp: number
}

interface Aggregate {
  id: string
  version: number
  apply(event: Event): void
}

class EventStore {
  private events: Event[] = []

  append(aggregateId: string, event: Event): void {
    this.events.push(event)
  }

  getEvents(aggregateId: string): Event[] {
    return this.events.filter(event => event.data.aggregateId === aggregateId)
  }

  getAllEvents(): Event[] {
    return [...this.events]
  }
}

class UserAggregate implements Aggregate {
  id: string
  version: number = 0
  name: string = ''
  email: string = ''

  constructor(id: string) {
    this.id = id
  }

  apply(event: Event): void {
    switch (event.type) {
      case 'UserCreated':
        this.name = event.data.name
        this.email = event.data.email
        break
      case 'UserUpdated':
        if (event.data.name) this.name = event.data.name
        if (event.data.email) this.email = event.data.email
        break
    }
    this.version++
  }

  static fromEvents(events: Event[]): UserAggregate {
    const aggregate = new UserAggregate(events[0].data.aggregateId)
    events.forEach(event => aggregate.apply(event))
    return aggregate
  }
}

// Usage
const eventStore = new EventStore()

// Create user
const userCreatedEvent: Event = {
  id: '1',
  type: 'UserCreated',
  data: { aggregateId: 'user-1', name: 'John', email: 'john@example.com' },
  timestamp: Date.now()
}
eventStore.append('user-1', userCreatedEvent)

// Update user
const userUpdatedEvent: Event = {
  id: '2',
  type: 'UserUpdated',
  data: { aggregateId: 'user-1', name: 'John Doe' },
  timestamp: Date.now()
}
eventStore.append('user-1', userUpdatedEvent)

// Rebuild aggregate
const events = eventStore.getEvents('user-1')
const user = UserAggregate.fromEvents(events)
console.log('User:', user) // { id: 'user-1', version: 2, name: 'John Doe', email: 'john@example.com' }
```

### 2. CQRS Pattern

```typescript
// Command
interface Command {
  type: string
  data: any
}

interface CommandHandler<T extends Command> {
  handle(command: T): Promise<void>
}

// Query
interface Query {
  type: string
  data: any
}

interface QueryHandler<T extends Query, R> {
  handle(query: T): Promise<R>
}

// Command Bus
class CommandBus {
  private handlers: Map<string, CommandHandler<any>> = new Map()

  register<T extends Command>(commandType: string, handler: CommandHandler<T>): void {
    this.handlers.set(commandType, handler)
  }

  async execute<T extends Command>(command: T): Promise<void> {
    const handler = this.handlers.get(command.type)
    if (!handler) {
      throw new Error(`No handler for command: ${command.type}`)
    }
    await handler.handle(command)
  }
}

// Query Bus
class QueryBus {
  private handlers: Map<string, QueryHandler<any, any>> = new Map()

  register<T extends Query, R>(queryType: string, handler: QueryHandler<T, R>): void {
    this.handlers.set(queryType, handler)
  }

  async execute<T extends Query, R>(query: T): Promise<R> {
    const handler = this.handlers.get(query.type)
    if (!handler) {
      throw new Error(`No handler for query: ${query.type}`)
    }
    return handler.handle(query)
  }
}

// Usage
interface CreateUserCommand extends Command {
  type: 'CreateUser'
  data: { name: string; email: string }
}

interface GetUserQuery extends Query {
  type: 'GetUser'
  data: { id: string }
}

class CreateUserHandler implements CommandHandler<CreateUserCommand> {
  async handle(command: CreateUserCommand): Promise<void> {
    console.log('Creating user:', command.data)
    // Implementation
  }
}

class GetUserHandler implements QueryHandler<GetUserQuery, User> {
  async handle(query: GetUserQuery): Promise<User> {
    console.log('Getting user:', query.data.id)
    // Implementation
    return { id: query.data.id, name: 'John', email: 'john@example.com' }
  }
}

const commandBus = new CommandBus()
const queryBus = new QueryBus()

commandBus.register('CreateUser', new CreateUserHandler())
queryBus.register('GetUser', new GetUserHandler())

await commandBus.execute({ type: 'CreateUser', data: { name: 'John', email: 'john@example.com' } })
const user = await queryBus.execute({ type: 'GetUser', data: { id: '1' } })
```

### 3. Saga Pattern

```typescript
interface SagaStep {
  execute(): Promise<void>
  compensate(): Promise<void>
}

class Saga {
  private steps: SagaStep[] = []
  private executedSteps: SagaStep[] = []

  addStep(step: SagaStep): this {
    this.steps.push(step)
    return this
  }

  async execute(): Promise<void> {
    try {
      for (const step of this.steps) {
        await step.execute()
        this.executedSteps.push(step)
      }
    } catch (error) {
      await this.compensate()
      throw error
    }
  }

  private async compensate(): Promise<void> {
    for (const step of this.executedSteps.reverse()) {
      try {
        await step.compensate()
      } catch (error) {
        console.error('Compensation failed:', error)
      }
    }
  }
}

// Usage
class CreateUserStep implements SagaStep {
  constructor(private userData: any) {}

  async execute(): Promise<void> {
    console.log('Creating user:', this.userData)
    // Implementation
  }

  async compensate(): Promise<void> {
    console.log('Rolling back user creation')
    // Implementation
  }
}

class SendWelcomeEmailStep implements SagaStep {
  constructor(private userId: string) {}

  async execute(): Promise<void> {
    console.log('Sending welcome email to user:', this.userId)
    // Implementation
  }

  async compensate(): Promise<void> {
    console.log('Rolling back welcome email')
    // Implementation
  }
}

const saga = new Saga()
  .addStep(new CreateUserStep({ name: 'John', email: 'john@example.com' }))
  .addStep(new SendWelcomeEmailStep('user-1'))

try {
  await saga.execute()
  console.log('Saga completed successfully')
} catch (error) {
  console.log('Saga failed, compensation executed')
}
```

## 📚 Resources

### Official Documentation
- [Node.js Documentation](https://nodejs.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Node.js Design Patterns](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

### Patterns and Best Practices
- [Node.js Patterns](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
- [Async Patterns](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [Performance Patterns](https://nodejs.org/en/docs/guides/simple-profiling/)

---

*Last updated: January 2024*