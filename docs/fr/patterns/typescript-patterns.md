# 🔵 TypeScript - Design Patterns & Paradigmes

## 📋 Table des matières

- [Introduction](#introduction)
- [Patterns de Base](#patterns-de-base)
- [Patterns avec Génériques](#patterns-avec-génériques)
- [Patterns Fonctionnels](#patterns-fonctionnels)
- [Patterns Avancés](#patterns-avancés)
- [Patterns de Performance](#patterns-de-performance)

## 🚀 Introduction

Ce guide couvre tous les design patterns spécifiques à TypeScript, incluant les paradigmes POO et fonctionnels avec des exemples pratiques.

## 🎯 Patterns de Base

### 1. Singleton Pattern

#### POO - Classique
```typescript
class Singleton {
  private static instance: Singleton
  private data: any = {}

  private constructor() {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }

  setData(key: string, value: any): void {
    this.data[key] = value
  }

  getData(key: string): any {
    return this.data[key]
  }
}

// Usage
const instance1 = Singleton.getInstance()
const instance2 = Singleton.getInstance()
console.log(instance1 === instance2) // true
```

#### Fonctionnel - Module Pattern
```typescript
// singleton.ts
interface SingletonData {
  [key: string]: any
}

class SingletonImpl {
  private data: SingletonData = {}

  setData(key: string, value: any): void {
    this.data[key] = value
  }

  getData(key: string): any {
    return this.data[key]
  }
}

// Export unique instance
export const singleton = new SingletonImpl()
```

### 2. Factory Pattern

#### POO - Classique
```typescript
interface Product {
  name: string
  price: number
  getDescription(): string
}

class Book implements Product {
  constructor(
    public name: string,
    public price: number,
    public author: string
  ) {}

  getDescription(): string {
    return `Book: ${this.name} by ${this.author} - $${this.price}`
  }
}

class Electronics implements Product {
  constructor(
    public name: string,
    public price: number,
    public brand: string
  ) {}

  getDescription(): string {
    return `Electronics: ${this.name} by ${this.brand} - $${this.price}`
  }
}

type ProductType = 'book' | 'electronics'

class ProductFactory {
  static createProduct(
    type: ProductType,
    name: string,
    price: number,
    extra: any
  ): Product {
    switch (type) {
      case 'book':
        return new Book(name, price, extra.author)
      case 'electronics':
        return new Electronics(name, price, extra.brand)
      default:
        throw new Error(`Unknown product type: ${type}`)
    }
  }
}

// Usage
const book = ProductFactory.createProduct('book', 'Clean Code', 50, { author: 'Robert Martin' })
const laptop = ProductFactory.createProduct('electronics', 'MacBook Pro', 2000, { brand: 'Apple' })
```

#### Fonctionnel - Factory Functions
```typescript
type ProductConfig = {
  type: 'book' | 'electronics'
  name: string
  price: number
  author?: string
  brand?: string
}

const createProduct = (config: ProductConfig): Product => {
  const { type, name, price, ...extra } = config
  
  const productMap = {
    book: () => new Book(name, price, extra.author!),
    electronics: () => new Electronics(name, price, extra.brand!)
  }
  
  const factory = productMap[type]
  if (!factory) {
    throw new Error(`Unknown product type: ${type}`)
  }
  
  return factory()
}

// Usage
const book = createProduct({
  type: 'book',
  name: 'Clean Code',
  price: 50,
  author: 'Robert Martin'
})
```

### 3. Observer Pattern

#### POO - Classique
```typescript
interface Observer<T> {
  update(data: T): void
}

interface Subject<T> {
  addObserver(observer: Observer<T>): void
  removeObserver(observer: Observer<T>): void
  notify(data: T): void
}

class EventSubject<T> implements Subject<T> {
  private observers: Observer<T>[] = []

  addObserver(observer: Observer<T>): void {
    this.observers.push(observer)
  }

  removeObserver(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer.update(data))
  }
}

// Concrete Observer
class Logger<T> implements Observer<T> {
  constructor(private name: string) {}

  update(data: T): void {
    console.log(`[${this.name}] Received:`, data)
  }
}

// Usage
const subject = new EventSubject<string>()
const logger1 = new Logger('Logger 1')
const logger2 = new Logger('Logger 2')

subject.addObserver(logger1)
subject.addObserver(logger2)
subject.notify('Hello World!')
```

#### Fonctionnel - Event Emitter
```typescript
type EventCallback<T> = (data: T) => void

class EventEmitter<T> {
  private listeners: Map<string, EventCallback<T>[]> = new Map()

  on(event: string, callback: EventCallback<T>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  off(event: string, callback: EventCallback<T>): void {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  emit(event: string, data: T): void {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }
}

// Usage
const emitter = new EventEmitter<string>()
emitter.on('message', (data) => console.log('Received:', data))
emitter.emit('message', 'Hello World!')
```

## 🎯 Patterns avec Génériques

### 1. Generic Factory Pattern

```typescript
interface Factory<T, K extends string> {
  create(type: K, ...args: any[]): T
}

interface Product {
  id: string
  name: string
}

class GenericProductFactory<T extends Product, K extends string> implements Factory<T, K> {
  private creators: Map<K, (...args: any[]) => T> = new Map()

  register(type: K, creator: (...args: any[]) => T): void {
    this.creators.set(type, creator)
  }

  create(type: K, ...args: any[]): T {
    const creator = this.creators.get(type)
    if (!creator) {
      throw new Error(`Unknown type: ${type}`)
    }
    return creator(...args)
  }
}

// Usage
interface Book extends Product {
  author: string
  pages: number
}

interface Electronics extends Product {
  brand: string
  warranty: number
}

type ProductType = 'book' | 'electronics'

const factory = new GenericProductFactory<Book | Electronics, ProductType>()

factory.register('book', (id: string, name: string, author: string, pages: number): Book => ({
  id,
  name,
  author,
  pages
}))

factory.register('electronics', (id: string, name: string, brand: string, warranty: number): Electronics => ({
  id,
  name,
  brand,
  warranty
}))

const book = factory.create('book', '1', 'Clean Code', 'Robert Martin', 400)
const laptop = factory.create('electronics', '2', 'MacBook Pro', 'Apple', 1)
```

### 2. Generic Repository Pattern

```typescript
interface Entity {
  id: string
}

interface Repository<T extends Entity> {
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  save(entity: T): Promise<T>
  update(entity: T): Promise<T>
  delete(id: string): Promise<void>
}

class InMemoryRepository<T extends Entity> implements Repository<T> {
  private entities: Map<string, T> = new Map()

  async findById(id: string): Promise<T | null> {
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

  async delete(id: string): Promise<void> {
    this.entities.delete(id)
  }
}

// Usage
interface User extends Entity {
  id: string
  name: string
  email: string
}

const userRepository = new InMemoryRepository<User>()
```

### 3. Generic Builder Pattern

```typescript
interface Builder<T> {
  build(): T
}

class QueryBuilder<T> implements Builder<string> {
  private select: string = '*'
  private from: string = ''
  private where: string[] = []
  private orderBy: string[] = []
  private limit?: number

  selectFields(fields: string[]): this {
    this.select = fields.join(', ')
    return this
  }

  fromTable(table: string): this {
    this.from = table
    return this
  }

  whereCondition(condition: string): this {
    this.where.push(condition)
    return this
  }

  orderByField(field: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderBy.push(`${field} ${direction}`)
    return this
  }

  setLimit(limit: number): this {
    this.limit = limit
    return this
  }

  build(): string {
    let query = `SELECT ${this.select} FROM ${this.from}`
    
    if (this.where.length > 0) {
      query += ` WHERE ${this.where.join(' AND ')}`
    }
    
    if (this.orderBy.length > 0) {
      query += ` ORDER BY ${this.orderBy.join(', ')}`
    }
    
    if (this.limit) {
      query += ` LIMIT ${this.limit}`
    }
    
    return query
  }
}

// Usage
const query = new QueryBuilder()
  .selectFields(['id', 'name', 'email'])
  .fromTable('users')
  .whereCondition('age > 18')
  .whereCondition('status = "active"')
  .orderByField('name', 'ASC')
  .setLimit(10)
  .build()

console.log(query)
// SELECT id, name, email FROM users WHERE age > 18 AND status = "active" ORDER BY name ASC LIMIT 10
```

## 🎯 Patterns Fonctionnels

### 1. Monad Pattern

```typescript
interface Monad<T> {
  map<U>(fn: (value: T) => U): Monad<U>
  flatMap<U>(fn: (value: T) => Monad<U>): Monad<U>
  value: T
}

class Maybe<T> implements Monad<T> {
  constructor(public value: T | null) {}

  static of<T>(value: T | null): Maybe<T> {
    return new Maybe(value)
  }

  static none<T>(): Maybe<T> {
    return new Maybe<T>(null)
  }

  map<U>(fn: (value: T) => U): Maybe<U> {
    return this.value === null ? Maybe.none<U>() : Maybe.of(fn(this.value))
  }

  flatMap<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
    return this.value === null ? Maybe.none<U>() : fn(this.value)
  }

  isSome(): boolean {
    return this.value !== null
  }

  isNone(): boolean {
    return this.value === null
  }

  getOrElse(defaultValue: T): T {
    return this.value === null ? defaultValue : this.value
  }
}

// Usage
const result = Maybe.of(5)
  .map(x => x * 2)
  .map(x => x + 1)
  .getOrElse(0)

console.log(result) // 11

const noneResult = Maybe.none<number>()
  .map(x => x * 2)
  .getOrElse(0)

console.log(noneResult) // 0
```

### 2. Currying Pattern

```typescript
// Basic currying
const add = (a: number) => (b: number) => a + b
const add5 = add(5)
console.log(add5(3)) // 8

// Generic currying function
type Curried<T extends any[], R> = T extends [infer H, ...infer T]
  ? (arg: H) => Curried<T, R>
  : R

function curry<T extends any[], R>(
  fn: (...args: T) => R
): Curried<T, R> {
  return ((...args: any[]) => {
    if (args.length >= fn.length) {
      return fn(...args as T)
    }
    return curry(fn.bind(null, ...args))
  }) as Curried<T, R>
}

// Usage
const multiply = (a: number, b: number, c: number) => a * b * c
const curriedMultiply = curry(multiply)

console.log(curriedMultiply(2)(3)(4)) // 24
console.log(curriedMultiply(2, 3)(4)) // 24
console.log(curriedMultiply(2)(3, 4)) // 24
```

### 3. Function Composition Pattern

```typescript
type UnaryFunction<T, R> = (arg: T) => R

function compose<T1, T2, T3>(
  f: (arg: T2) => T3,
  g: (arg: T1) => T2
): (arg: T1) => T3 {
  return (arg: T1) => f(g(arg))
}

function pipe<T1, T2, T3>(
  value: T1,
  f: (arg: T1) => T2,
  g: (arg: T2) => T3
): T3 {
  return g(f(value))
}

// Usage
const add1 = (x: number) => x + 1
const multiply2 = (x: number) => x * 2
const toString = (x: number) => x.toString()

const composed = compose(toString, compose(multiply2, add1))
console.log(composed(5)) // "12"

const piped = pipe(5, add1, multiply2)
console.log(piped) // 12
```

### 4. Partial Application Pattern

```typescript
function partial<T extends any[], U extends any[], R>(
  fn: (...args: [...T, ...U]) => R,
  ...args1: T
): (...args2: U) => R {
  return (...args2: U) => fn(...args1, ...args2)
}

// Usage
const greet = (greeting: string, name: string, punctuation: string) => 
  `${greeting} ${name}${punctuation}`

const sayHello = partial(greet, 'Hello')
const sayGoodbye = partial(greet, 'Goodbye')

console.log(sayHello('John', '!')) // "Hello John!"
console.log(sayGoodbye('Jane', '.')) // "Goodbye Jane."
```

## 🎯 Patterns Avancés

### 1. Decorator Pattern

```typescript
interface Component {
  operation(): string
}

class ConcreteComponent implements Component {
  operation(): string {
    return 'ConcreteComponent'
  }
}

abstract class Decorator implements Component {
  constructor(protected component: Component) {}

  operation(): string {
    return this.component.operation()
  }
}

class ConcreteDecoratorA extends Decorator {
  operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`
  }
}

class ConcreteDecoratorB extends Decorator {
  operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`
  }
}

// Usage
const component = new ConcreteComponent()
const decorated = new ConcreteDecoratorA(
  new ConcreteDecoratorB(component)
)

console.log(decorated.operation()) // "ConcreteDecoratorA(ConcreteDecoratorB(ConcreteComponent))"
```

### 2. Strategy Pattern

```typescript
interface PaymentStrategy {
  pay(amount: number): string
}

class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}

  pay(amount: number): string {
    return `Paid $${amount} using credit card ending in ${this.cardNumber.slice(-4)}`
  }
}

class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): string {
    return `Paid $${amount} using PayPal account ${this.email}`
  }
}

class BankTransferPayment implements PaymentStrategy {
  constructor(private accountNumber: string) {}

  pay(amount: number): string {
    return `Paid $${amount} using bank transfer to account ${this.accountNumber}`
  }
}

class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy
  }

  processPayment(amount: number): string {
    return this.strategy.pay(amount)
  }
}

// Usage
const processor = new PaymentProcessor(new CreditCardPayment('1234567890123456'))
console.log(processor.processPayment(100)) // "Paid $100 using credit card ending in 3456"

processor.setStrategy(new PayPalPayment('user@example.com'))
console.log(processor.processPayment(50)) // "Paid $50 using PayPal account user@example.com"
```

### 3. Command Pattern

```typescript
interface Command {
  execute(): void
  undo(): void
}

class Light {
  private isOn: boolean = false

  turnOn(): void {
    this.isOn = true
    console.log('Light is on')
  }

  turnOff(): void {
    this.isOn = false
    console.log('Light is off')
  }

  getState(): boolean {
    return this.isOn
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn()
  }

  undo(): void {
    this.light.turnOff()
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff()
  }

  undo(): void {
    this.light.turnOn()
  }
}

class RemoteControl {
  private commands: Command[] = []
  private currentCommand: number = -1

  setCommand(command: Command): void {
    this.commands.push(command)
    this.currentCommand = this.commands.length - 1
  }

  pressButton(): void {
    if (this.currentCommand >= 0) {
      this.commands[this.currentCommand].execute()
    }
  }

  pressUndo(): void {
    if (this.currentCommand >= 0) {
      this.commands[this.currentCommand].undo()
      this.currentCommand--
    }
  }
}

// Usage
const light = new Light()
const lightOn = new LightOnCommand(light)
const lightOff = new LightOffCommand(light)

const remote = new RemoteControl()
remote.setCommand(lightOn)
remote.pressButton() // Light is on

remote.setCommand(lightOff)
remote.pressButton() // Light is off
remote.pressUndo() // Light is on
```

### 4. State Pattern

```typescript
interface State {
  handle(context: Context): void
}

class Context {
  private state: State

  constructor(state: State) {
    this.state = state
  }

  setState(state: State): void {
    this.state = state
  }

  request(): void {
    this.state.handle(this)
  }
}

class ConcreteStateA implements State {
  handle(context: Context): void {
    console.log('Handling in State A')
    context.setState(new ConcreteStateB())
  }
}

class ConcreteStateB implements State {
  handle(context: Context): void {
    console.log('Handling in State B')
    context.setState(new ConcreteStateA())
  }
}

// Usage
const context = new Context(new ConcreteStateA())
context.request() // "Handling in State A"
context.request() // "Handling in State B"
context.request() // "Handling in State A"
```

## 🎯 Patterns de Performance

### 1. Memoization Pattern

```typescript
function memoize<T extends (...args: any[]) => any>(
  fn: T
): T {
  const cache = new Map<string, ReturnType<T>>()

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
const expensiveFunction = (n: number): number => {
  console.log('Computing...')
  return n * n
}

const memoizedExpensiveFunction = memoize(expensiveFunction)

console.log(memoizedExpensiveFunction(5)) // "Computing..." then 25
console.log(memoizedExpensiveFunction(5)) // 25 (from cache)
```

### 2. Lazy Loading Pattern

```typescript
class Lazy<T> {
  private _value: T | undefined
  private _factory: () => T

  constructor(factory: () => T) {
    this._factory = factory
  }

  get value(): T {
    if (this._value === undefined) {
      this._value = this._factory()
    }
    return this._value
  }

  get isLoaded(): boolean {
    return this._value !== undefined
  }
}

// Usage
const lazyData = new Lazy(() => {
  console.log('Loading expensive data...')
  return { data: 'expensive data' }
})

console.log(lazyData.isLoaded) // false
console.log(lazyData.value) // "Loading expensive data..." then { data: 'expensive data' }
console.log(lazyData.isLoaded) // true
```

### 3. Object Pool Pattern

```typescript
class ObjectPool<T> {
  private pool: T[] = []
  private createFn: () => T
  private resetFn: (obj: T) => void

  constructor(createFn: () => T, resetFn: (obj: T) => void) {
    this.createFn = createFn
    this.resetFn = resetFn
  }

  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!
    }
    return this.createFn()
  }

  release(obj: T): void {
    this.resetFn(obj)
    this.pool.push(obj)
  }

  get size(): number {
    return this.pool.length
  }
}

// Usage
class ExpensiveObject {
  data: any = null
  
  reset(): void {
    this.data = null
  }
}

const pool = new ObjectPool(
  () => new ExpensiveObject(),
  (obj) => obj.reset()
)

const obj1 = pool.acquire()
const obj2 = pool.acquire()
console.log(pool.size) // 0

pool.release(obj1)
pool.release(obj2)
console.log(pool.size) // 2
```

## 📚 Ressources

### Documentation officielle
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Design Patterns](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### Patterns et bonnes pratiques
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Effective TypeScript](https://effectivetypescript.com/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

*Dernière mise à jour : Janvier 2024*
