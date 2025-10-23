# Patterns de Programmation Fonctionnelle

## 1. Pure Functions Pattern

### Description
Fonctions qui produisent toujours le même résultat pour les mêmes entrées et n'ont pas d'effets de bord.

### Exemple - JavaScript
```javascript
// Pure function
function add(a, b) {
  return a + b
}

// Impure function (avec effet de bord)
let counter = 0
function increment() {
  counter++
  return counter
}

// Pure function avec objets
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

### Exemple - TypeScript
```typescript
// Pure function avec types
function calculateTax(amount: number, rate: number): number {
  return amount * rate
}

// Pure function avec objets
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

// Pure function avec arrays
function addItem<T>(array: T[], item: T): T[] {
  return [...array, item]
}

function removeItem<T>(array: T[], index: number): T[] {
  return array.filter((_, i) => i !== index)
}
```

## 2. Higher-Order Functions Pattern

### Description
Fonctions qui prennent d'autres fonctions comme arguments ou retournent des fonctions.

### Exemple - Map, Filter, Reduce
```javascript
// Map - transformer chaque élément
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(x => x * 2)
const strings = numbers.map(x => `Number: ${x}`)

// Filter - filtrer les éléments
const evenNumbers = numbers.filter(x => x % 2 === 0)
const positiveNumbers = numbers.filter(x => x > 0)

// Reduce - réduire à une seule valeur
const sum = numbers.reduce((acc, x) => acc + x, 0)
const product = numbers.reduce((acc, x) => acc * x, 1)

// Reduce pour construire un objet
const grouped = numbers.reduce((acc, x) => {
  const key = x % 2 === 0 ? 'even' : 'odd'
  acc[key] = (acc[key] || []).concat(x)
  return acc
}, {})
```

### Exemple - Function Composition
```javascript
// Fonctions utilitaires
const add = (a, b) => a + b
const multiply = (a, b) => a * b
const square = x => x * x

// Composition manuelle
const addAndSquare = (a, b) => square(add(a, b))

// Composition avec une fonction utilitaire
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value)
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value)

// Utilisation
const addThenSquare = pipe(add, square)
const result = addThenSquare(3, 4) // (3 + 4)² = 49
```

## 3. Currying Pattern

### Description
Transformer une fonction multi-paramètres en une série de fonctions unaires.

### Exemple - JavaScript
```javascript
// Fonction normale
function add(a, b, c) {
  return a + b + c
}

// Currying manuel
function addCurried(a) {
  return function(b) {
    return function(c) {
      return a + b + c
    }
  }
}

// Currying avec arrow functions
const addCurriedArrow = a => b => c => a + b + c

// Fonction de currying générique
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

// Utilisation
const curriedAdd = curry(add)
const add5 = curriedAdd(5)
const add5And10 = add5(10)
const result = add5And10(15) // 30
```

### Exemple - TypeScript
```typescript
// Currying avec types
function multiply(a: number): (b: number) => (c: number) => number {
  return (b: number) => (c: number) => a * b * c
}

// Currying générique avec types
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

// Utilisation
const curriedMultiply = curry(multiply)
const multiplyBy2 = curriedMultiply(2)
const multiplyBy2And3 = multiplyBy2(3)
const result = multiplyBy2And3(4) // 24
```

## 4. Partial Application Pattern

### Description
Appliquer partiellement des arguments à une fonction.

### Exemple - JavaScript
```javascript
// Partial application manuel
function greet(greeting, name) {
  return `${greeting}, ${name}!`
}

function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs)
  }
}

// Utilisation
const sayHello = partial(greet, 'Hello')
const sayGoodbye = partial(greet, 'Goodbye')

console.log(sayHello('John')) // "Hello, John!"
console.log(sayGoodbye('Jane')) // "Goodbye, Jane!"

// Partial application avec bind
const sayHelloBind = greet.bind(null, 'Hello')
console.log(sayHelloBind('John')) // "Hello, John!"
```

## 5. Monads Pattern

### Description
Gérer les effets de bord de manière fonctionnelle.

### Exemple - Maybe Monad
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

// Utilisation
const user = { name: 'John', address: { city: 'Paris' } }
const result = Maybe.of(user)
  .map(u => u.address)
  .map(addr => addr.city)
  .getOrElse('Unknown')

console.log(result) // "Paris"
```

### Exemple - Either Monad
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

// Utilisation
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
Mapper sur des structures de données.

### Exemple - JavaScript
```javascript
class Functor {
  constructor(value) {
    this.value = value
  }

  map(fn) {
    return new Functor(fn(this.value))
  }
}

// Utilisation
const functor = new Functor(5)
const result = functor
  .map(x => x * 2)
  .map(x => x + 1)
  .value

console.log(result) // 11
```

## 7. Function Composition Pattern

### Description
Combiner des fonctions simples pour créer des fonctions complexes.

### Exemple - JavaScript
```javascript
// Fonctions utilitaires
const add = (a, b) => a + b
const multiply = (a, b) => a * b
const square = x => x * x
const double = x => x * 2

// Composition
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value)
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value)

// Utilisation
const addThenSquare = pipe(add, square)
const squareThenDouble = pipe(square, double)

// Composition avec plusieurs arguments
const addThenSquareThenDouble = (a, b) => pipe(add, square, double)(a, b)

const result = addThenSquareThenDouble(3, 4) // ((3 + 4)²) * 2 = 98
```

## Bonnes Pratiques

1. **Immutable data** : Utiliser des données immutables
2. **Pure functions** : Préférer les fonctions pures
3. **Function composition** : Composer des fonctions simples
4. **Avoid side effects** : Éviter les effets de bord
5. **Type safety** : Utiliser TypeScript pour la sécurité des types

## Pièges à Éviter

1. **Over-abstraction** : Ne pas sur-abstraire
2. **Performance issues** : Attention aux performances
3. **Complexity** : Éviter la complexité excessive
4. **Mutating data** : Ne pas muter les données
