# Génériques TypeScript Avancés

## 1. Génériques de Base

### Description
Les génériques permettent de créer des composants réutilisables qui fonctionnent avec plusieurs types plutôt qu'un seul.

### Exemple - Génériques Simples
```typescript
// Fonction générique simple
function identity<T>(arg: T): T {
  return arg
}

// Utilisation
const stringIdentity = identity<string>('Hello')
const numberIdentity = identity<number>(42)
const inferredIdentity = identity('Hello') // TypeScript infère le type

// Interface générique
interface Container<T> {
  value: T
  getValue(): T
  setValue(value: T): void
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value
  }

  setValue(value: T): void {
    this.value = value
  }
}

// Utilisation
const stringBox = new Box<string>('Hello')
const numberBox = new Box<number>(42)
```

### Exemple - Génériques avec Contraintes
```typescript
// Contrainte de base
interface Lengthwise {
  length: number
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

// Utilisation
logLength('Hello') // OK - string a une propriété length
logLength([1, 2, 3]) // OK - array a une propriété length
// logLength(42) // Erreur - number n'a pas de propriété length

// Contrainte avec keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const person = { name: 'John', age: 30, city: 'Paris' }
const name = getProperty(person, 'name') // string
const age = getProperty(person, 'age') // number
// const invalid = getProperty(person, 'invalid') // Erreur
```

## 2. Génériques Avancés

### Exemple - Types Conditionnels
```typescript
// Type conditionnel basique
type IsArray<T> = T extends any[] ? true : false

type Test1 = IsArray<string[]> // true
type Test2 = IsArray<number> // false

// Type conditionnel avec inférence
type Flatten<T> = T extends (infer U)[] ? U : T

type Str = Flatten<string[]> // string
type Num = Flatten<number> // number

// Type conditionnel distributif
type ToArray<T> = T extends any ? T[] : never

type StrArrOrNumArr = ToArray<string | number> // string[] | number[]

// Type conditionnel non-distributif
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never

type StrOrNumArr = ToArrayNonDist<string | number> // (string | number)[]
```

### Exemple - Types Mappés
```typescript
// Type mappé basique
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// Type mappé avec modificateurs
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

type Optional<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

// Type mappé avec filtrage
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

// Type mappé avec transformation
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

## 3. Génériques Variadiques

### Description
Les génériques variadiques permettent de travailler avec des tuples de types de longueur variable.

### Exemple - Tuple Types
```typescript
// Tuple type basique
type Tuple<T extends readonly unknown[]> = T

type StringTuple = Tuple<[string, string, string]>
type MixedTuple = Tuple<[string, number, boolean]>

// Tuple avec rest parameters
type Head<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never
type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer T] ? T : []

type TestHead = Head<[string, number, boolean]> // string
type TestTail = Tail<[string, number, boolean]> // [number, boolean]

// Tuple avec concaténation
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U]

type ConcatTest = Concat<[string, number], [boolean, string]> // [string, number, boolean, string]
```

### Exemple - Rest Parameters avec Génériques
```typescript
// Fonction avec rest parameters typés
function callWithArgs<T extends readonly unknown[], R>(
  fn: (...args: T) => R,
  ...args: T
): R {
  return fn(...args)
}

// Utilisation
const add = (a: number, b: number) => a + b
const result = callWithArgs(add, 1, 2) // TypeScript sait que args est [number, number]

// Fonction variadique avec contraintes
function createTuple<T extends readonly unknown[]>(...args: T): T {
  return args
}

const tuple1 = createTuple('hello', 42, true) // Type: [string, number, boolean]
const tuple2 = createTuple(1, 2, 3, 4, 5) // Type: [number, number, number, number, number]
```

## 4. Génériques avec Contraintes Multiples

### Exemple - Contraintes Complexes
```typescript
// Contrainte avec intersection
interface Serializable {
  serialize(): string
}

interface Deserializable {
  deserialize(data: string): void
}

function processData<T extends Serializable & Deserializable>(obj: T): T {
  const serialized = obj.serialize()
  const newObj = Object.create(Object.getPrototypeOf(obj))
  newObj.deserialize(serialized)
  return newObj
}

// Contrainte avec union
type StringOrNumber = string | number

function processValue<T extends StringOrNumber>(value: T): T {
  if (typeof value === 'string') {
    return value.toUpperCase() as T
  }
  return (value * 2) as T
}

// Contrainte avec générique
interface Comparable<T> {
  compareTo(other: T): number
}

function findMax<T extends Comparable<T>>(items: T[]): T | undefined {
  if (items.length === 0) return undefined
  
  return items.reduce((max, current) => 
    current.compareTo(max) > 0 ? current : max
  )
}

class Person implements Comparable<Person> {
  constructor(public name: string, public age: number) {}

  compareTo(other: Person): number {
    return this.age - other.age
  }
}
```

## 5. Mapped Types avec Génériques

### Exemple - Types Mappés Avancés
```typescript
// Type mappé avec conditions
type NonNullable<T> = {
  [P in keyof T]: T[P] extends null | undefined ? never : T[P]
}

// Type mappé avec transformation de clés
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void
}

interface User {
  name: string
  age: number
  email: string
}

type UserEventHandlers = EventHandlers<User>
// {
//   onName: (value: string) => void
//   onAge: (value: number) => void
//   onEmail: (value: string) => void
// }

// Type mappé avec filtrage conditionnel
type StringProperties<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K]
}

type UserStringProps = StringProperties<User> // { name: string; email: string }

// Type mappé récursif
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

interface NestedObject {
  level1: {
    level2: {
      value: string
    }
  }
}

type DeepReadonlyNested = DeepReadonly<NestedObject>
// {
//   readonly level1: {
//     readonly level2: {
//       readonly value: string
//     }
//   }
// }
```

## 6. Utility Types Personnalisés avec Génériques

### Exemple - Types Utilitaires Avancés
```typescript
// Type pour extraire les types de retour
type ReturnTypes<T extends Record<string, (...args: any[]) => any>> = {
  [K in keyof T]: ReturnType<T[K]>
}

const api = {
  getUser: (id: string) => ({ id, name: 'John' }),
  getPosts: (userId: string) => [{ id: 1, title: 'Post 1' }],
  getComments: (postId: number) => [{ id: 1, text: 'Comment 1' }]
}

type ApiReturnTypes = ReturnTypes<typeof api>
// {
//   getUser: { id: string; name: string }
//   getPosts: { id: number; title: string }[]
//   getComments: { id: number; text: string }[]
// }

// Type pour créer des builders
type Builder<T> = {
  [K in keyof T]-?: (value: T[K]) => Builder<T>
} & {
  build(): T
}

function createBuilder<T>(): Builder<T> {
  const data = {} as T
  
  return new Proxy({} as Builder<T>, {
    get(target, prop) {
      if (prop === 'build') {
        return () => data
      }
      
      return (value: any) => {
        (data as any)[prop] = value
        return target
      }
    }
  })
}

// Utilisation
interface User {
  name: string
  age: number
  email: string
}

const userBuilder = createBuilder<User>()
const user = userBuilder
  .name('John Doe')
  .age(30)
  .email('john@example.com')
  .build()

// Type pour les états de machine à états
type StateMachine<T extends string, U extends string> = {
  [K in T]: {
    [L in U]?: T
  }
}

type TrafficLightState = 'red' | 'yellow' | 'green'
type TrafficLightEvent = 'next' | 'emergency'

const trafficLightMachine: StateMachine<TrafficLightState, TrafficLightEvent> = {
  red: { next: 'green', emergency: 'red' },
  yellow: { next: 'red' },
  green: { next: 'yellow', emergency: 'red' }
}
```

## 7. Exemples Pratiques et Cas d'Usage

### Exemple - Repository Pattern avec Génériques
```typescript
interface Entity {
  id: string
  createdAt: Date
  updatedAt: Date
}

interface Repository<T extends Entity> {
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>
  update(id: string, updates: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
}

class User implements Entity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

class UserRepository implements Repository<User> {
  private users: User[] = []

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null
  }

  async findAll(): Promise<User[]> {
    return [...this.users]
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user = new User(
      Math.random().toString(36),
      userData.name,
      userData.email,
      new Date(),
      new Date()
    )
    this.users.push(user)
    return user
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    
    this.users[userIndex] = { ...this.users[userIndex], ...updates, updatedAt: new Date() }
    return this.users[userIndex]
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex > -1) {
      this.users.splice(userIndex, 1)
    }
  }
}
```

### Exemple - API Client avec Génériques
```typescript
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      data,
      status: response.status,
      message: 'Success'
    }
  }

  async post<T, U>(endpoint: string, body: T): Promise<ApiResponse<U>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      data,
      status: response.status,
      message: 'Success'
    }
  }
}

// Utilisation
interface User {
  id: string
  name: string
  email: string
}

interface CreateUserRequest {
  name: string
  email: string
}

const apiClient = new ApiClient('https://api.example.com')

// GET avec type de retour
const usersResponse = await apiClient.get<User[]>('/users')
const users = usersResponse.data // Type: User[]

// POST avec type de body et de retour
const newUserResponse = await apiClient.post<CreateUserRequest, User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
const newUser = newUserResponse.data // Type: User
```

### Exemple - Event System avec Génériques
```typescript
type EventMap = {
  userCreated: { id: string; name: string; email: string }
  userUpdated: { id: string; changes: Partial<User> }
  userDeleted: { id: string }
  orderPlaced: { orderId: string; userId: string; total: number }
}

type EventHandler<T> = (data: T) => void | Promise<void>

class EventEmitter<TEventMap extends Record<string, any>> {
  private handlers: Map<keyof TEventMap, EventHandler<any>[]> = new Map()

  on<K extends keyof TEventMap>(
    event: K,
    handler: EventHandler<TEventMap[K]>
  ): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, [])
    }
    this.handlers.get(event)!.push(handler)
  }

  off<K extends keyof TEventMap>(
    event: K,
    handler: EventHandler<TEventMap[K]>
  ): void {
    const eventHandlers = this.handlers.get(event)
    if (eventHandlers) {
      const index = eventHandlers.indexOf(handler)
      if (index > -1) {
        eventHandlers.splice(index, 1)
      }
    }
  }

  async emit<K extends keyof TEventMap>(
    event: K,
    data: TEventMap[K]
  ): Promise<void> {
    const eventHandlers = this.handlers.get(event)
    if (eventHandlers) {
      await Promise.all(eventHandlers.map(handler => handler(data)))
    }
  }
}

// Utilisation
const eventEmitter = new EventEmitter<EventMap>()

// Handlers typés
eventEmitter.on('userCreated', (data) => {
  console.log(`User created: ${data.name} (${data.email})`)
  // data est typé comme { id: string; name: string; email: string }
})

eventEmitter.on('orderPlaced', (data) => {
  console.log(`Order placed: ${data.orderId} for user ${data.userId}`)
  // data est typé comme { orderId: string; userId: string; total: number }
})

// Émission d'événements
await eventEmitter.emit('userCreated', {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
})

await eventEmitter.emit('orderPlaced', {
  orderId: 'order-123',
  userId: '1',
  total: 99.99
})
```

## Bonnes Pratiques

1. **Nommage des paramètres génériques** : Utiliser des noms descriptifs (T, U, V pour des types simples, ou des noms plus explicites)
2. **Contraintes appropriées** : Utiliser des contraintes pour limiter les types acceptés
3. **Inférence de types** : Laisser TypeScript inférer les types quand c'est possible
4. **Documentation** : Documenter les génériques complexes avec des commentaires
5. **Tests** : Tester les génériques avec différents types
6. **Performance** : Éviter les génériques trop complexes qui peuvent ralentir la compilation

## Pièges à Éviter

1. **Génériques trop complexes** : Éviter les génériques imbriqués trop profonds
2. **Contraintes trop strictes** : Ne pas sur-contraindre les génériques
3. **any dans les génériques** : Éviter l'utilisation d'any dans les définitions génériques
4. **Génériques inutiles** : Ne pas utiliser de génériques quand un type simple suffit
5. **Circular references** : Éviter les références circulaires dans les types génériques

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
