# TypeScript Typing Patterns

## 1. Type Guards Pattern

### Description
Check and refine types at runtime.

### Example - typeof Guards
```typescript
function processValue(value: string | number): string {
  if (typeof value === 'string') {
    // TypeScript knows that value is string here
    return value.toUpperCase()
  } else {
    // TypeScript knows that value is number here
    return value.toString()
  }
}

// Usage
console.log(processValue('hello')) // "HELLO"
console.log(processValue(42)) // "42"
```

### Example - instanceof Guards
```typescript
class Dog {
  name: string
  breed: string

  constructor(name: string, breed: string) {
    this.name = name
    this.breed = breed
  }

  bark(): string {
    return 'Woof!'
  }
}

class Cat {
  name: string
  color: string

  constructor(name: string, color: string) {
    this.name = name
    this.color = color
  }

  meow(): string {
    return 'Meow!'
  }
}

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return animal.bark()
  } else if (animal instanceof Cat) {
    return animal.meow()
  }
  throw new Error('Unknown animal type')
}
```

### Example - User-defined Guards
```typescript
interface User {
  id: number
  name: string
  email: string
}

interface Admin {
  id: number
  name: string
  email: string
  permissions: string[]
}

function isAdmin(user: User | Admin): user is Admin {
  return 'permissions' in user
}

function processUser(user: User | Admin): string {
  if (isAdmin(user)) {
    // TypeScript knows that user is Admin here
    return `Admin ${user.name} has ${user.permissions.length} permissions`
  } else {
    // TypeScript knows that user is User here
    return `User ${user.name} with email ${user.email}`
  }
}
```

### Example - Discriminated Unions
```typescript
interface LoadingState {
  status: 'loading'
}

interface SuccessState {
  status: 'success'
  data: any
}

interface ErrorState {
  status: 'error'
  error: string
}

type ApiState = LoadingState | SuccessState | ErrorState

function handleApiState(state: ApiState): string {
  switch (state.status) {
    case 'loading':
      return 'Loading...'
    case 'success':
      return `Data: ${state.data}`
    case 'error':
      return `Error: ${state.error}`
    default:
      // TypeScript ensures all cases are covered
      const exhaustiveCheck: never = state
      return exhaustiveCheck
  }
}
```

## 2. Generic Constraints Pattern

### Description
Constrain generic types with constraints.

### Example - Basic Constraints
```typescript
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(item: T): T {
  console.log(`Length: ${item.length}`)
  return item
}

// Usage
logLength('hello') // Length: 5
logLength([1, 2, 3]) // Length: 3
logLength({ length: 10 }) // Length: 10
```

### Example - Keyof Constraints
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

interface Person {
  name: string
  age: number
  email: string
}

const person: Person = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
}

// Usage
const name = getProperty(person, 'name') // string
const age = getProperty(person, 'age') // number
// const invalid = getProperty(person, 'invalid') // Error!
```

### Example - Conditional Constraints
```typescript
type NonNullable<T> = T extends null | undefined ? never : T

function ensureNotNull<T>(value: T): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error('Value is null or undefined')
  }
  return value as NonNullable<T>
}

// Usage
const value1 = ensureNotNull('hello') // string
const value2 = ensureNotNull(42) // number
const value3 = ensureNotNull(null) // throws error
```

## 3. Mapped Types Pattern

### Description
Create new types by mapping over existing properties.

### Example - Basic Mapped Types
```typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

interface User {
  id: number
  name: string
  email: string
}

// Usage
type PartialUser = Partial<User>
// { id?: number; name?: string; email?: string; }

type RequiredUser = Required<PartialUser>
// { id: number; name: string; email: string; }

type ReadonlyUser = Readonly<User>
// { readonly id: number; readonly name: string; readonly email: string; }
```

### Example - Advanced Mapped Types
```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}

type Record<K extends keyof any, T> = {
  [P in K]: T
}

interface User {
  id: number
  name: string
  email: string
  password: string
}

// Usage
type PublicUser = Pick<User, 'id' | 'name' | 'email'>
// { id: number; name: string; email: string; }

type UserWithoutPassword = Omit<User, 'password'>
// { id: number; name: string; email: string; }

type UserRoles = Record<'admin' | 'user' | 'guest', boolean>
// { admin: boolean; user: boolean; guest: boolean; }
```

## 4. Conditional Types Pattern

### Description
Types that depend on conditions.

### Example - Basic Conditional Types
```typescript
type IsArray<T> = T extends any[] ? true : false

type Test1 = IsArray<string[]> // true
type Test2 = IsArray<string> // false
type Test3 = IsArray<number[]> // true
```

### Example - Advanced Conditional Types
```typescript
type NonNullable<T> = T extends null | undefined ? never : T

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Parameters<T> = T extends (...args: infer P) => any ? P : never

// Usage
function getUser(id: number): { id: number; name: string } {
  return { id, name: 'John' }
}

type UserReturnType = ReturnType<typeof getUser>
// { id: number; name: string; }

type UserParameters = Parameters<typeof getUser>
// [number]
```

### Example - Recursive Conditional Types
```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

interface NestedObject {
  level1: {
    level2: {
      level3: string
    }
  }
}

type ReadonlyNested = DeepReadonly<NestedObject>
// {
//   readonly level1: {
//     readonly level2: {
//       readonly level3: string
//     }
//   }
// }
```

## 5. Template Literal Types Pattern

### Description
Types based on template literals.

### Example - Basic Template Literals
```typescript
type EventName<T extends string> = `on${Capitalize<T>}`

type MouseEvents = EventName<'click' | 'hover' | 'drag'>
// 'onClick' | 'onHover' | 'onDrag'

type CSSProperty<T extends string> = `--${T}`

type CustomProperties = CSSProperty<'primary' | 'secondary' | 'accent'>
// '--primary' | '--secondary' | '--accent'
```

### Example - Advanced Template Literals
```typescript
type Path<T extends string> = T extends `${infer P}/${infer S}`
  ? P | `${P}/${Path<S>}`
  : T

type ApiPaths = Path<'api/users/profile/settings'>
// 'api' | 'api/users' | 'api/users/profile' | 'api/users/profile/settings'

type ExtractRouteParams<T extends string> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? Param | ExtractRouteParams<Rest>
  : T extends `${infer _Start}:${infer Param}`
  ? Param
  : never

type RouteParams = ExtractRouteParams<'/users/:id/posts/:postId'>
// 'id' | 'postId'
```

## 6. Branded Types Pattern

### Description
Create distinct types to avoid type errors.

### Example - Basic Branded Types
```typescript
type Brand<T, B> = T & { __brand: B }

type UserId = Brand<string, 'UserId'>
type ProductId = Brand<string, 'ProductId'>

function createUserId(id: string): UserId {
  return id as UserId
}

function createProductId(id: string): ProductId {
  return id as ProductId
}

function getUser(id: UserId): User {
  // Implementation
}

function getProduct(id: ProductId): Product {
  // Implementation
}

// Usage
const userId = createUserId('123')
const productId = createProductId('456')

getUser(userId) // OK
getUser(productId) // Error: Type 'ProductId' is not assignable to type 'UserId'
```

## Best Practices

1. **Use type guards**: Use type guards for safety
2. **Prefer interfaces**: Prefer interfaces over types for objects
3. **Use generic constraints**: Use generic constraints
4. **Document complex types**: Document complex types
5. **Use utility types**: Use utility types

## Pitfalls to Avoid

1. **any type**: Avoid the `any` type
2. **Type assertions**: Avoid unsafe type assertions
3. **Complex conditional types**: Avoid overly complex conditional types
4. **Circular references**: Avoid circular references



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>

