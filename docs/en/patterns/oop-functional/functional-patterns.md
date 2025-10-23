# Functional Programming Patterns

## 1. Pure Functions Pattern

### Description
Functions that always produce the same result for the same inputs and have no side effects.

### Example - JavaScript
```javascript
// Pure function
function add(a, b) {
  return a + b
}

// Impure function (with side effect)
let counter = 0
function increment() {
  counter++
  return counter
}

// Pure function with objects
function updateUser(user, newName) {
  return {
    ...user,
    name: newName,
    updatedAt: new Date()
  }
}

// Impure function (mutation)
function updateUserImpure(user, newName) {
  user.name = newName
  user.updatedAt = new Date()
  return user
}
```

### Example - TypeScript
```typescript
// Pure function with types
function calculateTax(amount: number, rate: number): number {
  return amount * rate
}

// Pure function with objects
interface User {
  id: number
  name: string
  email: string
}

function updateUserName(user: User, newName: string): User {
  return {
    ...user,
    name: newName
  }
}

// Pure function with arrays
function addItem<T>(array: T[], item: T): T[] {
  return [...array, item]
}

function removeItem<T>(array: T[], index: number): T[] {
  return array.filter((_, i) => i !== index)
}
```

## 2. Higher-Order Functions Pattern

### Description
Functions that take other functions as arguments or return functions.

### Example - Map, Filter, Reduce
```javascript
// Map - transform each element
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(x => x * 2)
const strings = numbers.map(x => `Number: ${x}`)

// Filter - filter elements
const evenNumbers = numbers.filter(x => x % 2 === 0)
const positiveNumbers = numbers.filter(x => x > 0)

// Reduce - reduce to a single value
const sum = numbers.reduce((acc, x) => acc + x, 0)
const product = numbers.reduce((acc, x) => acc * x, 1)

// Reduce to build an object
const grouped = numbers.reduce((acc, x) => {
  const key = x % 2 === 0 ? 'even' : 'odd'
  acc[key] = (acc[key] || []).concat(x)
  return acc
}, {})
```

### Example - Function Composition
```javascript
// Utility functions
const add = (a, b) => a + b
const multiply = (a, b) => a * b
const square = x => x * x

// Manual composition
const addAndSquare = (a, b) => square(add(a, b))

// Composition with utility function
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value)
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value)

// Usage
const addThenSquare = pipe(add, square)
const result = addThenSquare(3, 4) // (3 + 4)² = 49
```

## 3. Currying Pattern

### Description
Transform a multi-parameter function into a series of unary functions.

### Example - JavaScript
```javascript
// Normal function
function add(a, b, c) {
  return a + b + c
}

// Manual currying
function addCurried(a) {
  return function(b) {
    return function(c) {
      return a + b + c
    }
  }
}

// Currying with arrow functions
const addCurriedArrow = a => b => c => a + b + c

// Generic currying function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs))
    }
  }
}

// Usage
const curriedAdd = curry(add)
const add5 = curriedAdd(5)
const add5And10 = add5(10)
const result = add5And10(15) // 30
```

### Example - TypeScript
```typescript
// Currying with types
function multiply(a: number): (b: number) => (c: number) => number {
  return (b: number) => (c: number) => a * b * c
}

// Generic currying with types
function curry<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return (...nextArgs: any[]) => curried(...args, ...nextArgs)
  }
}

// Usage
const curriedMultiply = curry(multiply)
const multiplyBy2 = curriedMultiply(2)
const multiplyBy2And3 = multiplyBy2(3)
const result = multiplyBy2And3(4) // 24
```

## 4. Partial Application Pattern

### Description
Partially apply arguments to a function.

### Example - JavaScript
```javascript
// Manual partial application
function greet(greeting, name) {
  return `${greeting}, ${name}!`
}

function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs)
  }
}

// Usage
const sayHello = partial(greet, 'Hello')
const sayGoodbye = partial(greet, 'Goodbye')

console.log(sayHello('John')) // "Hello, John!"
console.log(sayGoodbye('Jane')) // "Goodbye, Jane!"

// Partial application with bind
const sayHelloBind = greet.bind(null, 'Hello')
console.log(sayHelloBind('John')) // "Hello, John!"
```

## 5. Monads Pattern

### Description
Manage side effects in a functional way.

### Example - Maybe Monad
```javascript
class Maybe {
  constructor(value) {
    this.value = value
  }

  static of(value) {
    return new Maybe(value)
  }

  static nothing() {
    return new Maybe(null)
  }

  map(fn) {
    return this.value === null || this.value === undefined
      ? Maybe.nothing()
      : Maybe.of(fn(this.value))
  }

  flatMap(fn) {
    return this.value === null || this.value === undefined
      ? Maybe.nothing()
      : fn(this.value)
  }

  getOrElse(defaultValue) {
    return this.value === null || this.value === undefined
      ? defaultValue
      : this.value
  }
}

// Usage
const user = { name: 'John', address: { city: 'Paris' } }
const result = Maybe.of(user)
  .map(u => u.address)
  .map(addr => addr.city)
  .getOrElse('Unknown')

console.log(result) // "Paris"
```

### Example - Either Monad
```javascript
class Either {
  constructor(left, right) {
    this.left = left
    this.right = right
  }

  static left(value) {
    return new Either(value, null)
  }

  static right(value) {
    return new Either(null, value)
  }

  map(fn) {
    return this.right !== null
      ? Either.right(fn(this.right))
      : Either.left(this.left)
  }

  flatMap(fn) {
    return this.right !== null
      ? fn(this.right)
      : Either.left(this.left)
  }

  getOrElse(defaultValue) {
    return this.right !== null ? this.right : defaultValue
  }
}

// Usage
function divide(a, b) {
  return b === 0
    ? Either.left('Division by zero')
    : Either.right(a / b)
}

const result = divide(10, 2)
  .map(x => x * 2)
  .getOrElse(0)

console.log(result) // 10
```

## 6. Functors Pattern

### Description
Map over data structures.

### Example - JavaScript
```javascript
class Functor {
  constructor(value) {
    this.value = value
  }

  map(fn) {
    return new Functor(fn(this.value))
  }
}

// Usage
const functor = new Functor(5)
const result = functor
  .map(x => x * 2)
  .map(x => x + 1)
  .value

console.log(result) // 11
```

## 7. Function Composition Pattern

### Description
Combine simple functions to create complex functions.

### Example - JavaScript
```javascript
// Utility functions
const add = (a, b) => a + b
const multiply = (a, b) => a * b
const square = x => x * x
const double = x => x * 2

// Composition
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value)
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value)

// Usage
const addThenSquare = pipe(add, square)
const squareThenDouble = pipe(square, double)

// Composition with multiple arguments
const addThenSquareThenDouble = (a, b) => pipe(add, square, double)(a, b)

const result = addThenSquareThenDouble(3, 4) // ((3 + 4)²) * 2 = 98
```

## Best Practices

1. **Immutable data**: Use immutable data
2. **Pure functions**: Prefer pure functions
3. **Function composition**: Compose simple functions
4. **Avoid side effects**: Avoid side effects
5. **Type safety**: Use TypeScript for type safety

## Pitfalls to Avoid

1. **Over-abstraction**: Don't over-abstract
2. **Performance issues**: Watch out for performance issues
3. **Complexity**: Avoid excessive complexity
4. **Mutating data**: Don't mutate data