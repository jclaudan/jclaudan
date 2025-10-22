# ESNext Evolution - De Vanilla JS à ES2024

## 🎯 Objectif
Guide complet de l'évolution de JavaScript depuis ES5 jusqu'à ES2024, avec exemples pratiques et patterns modernes.

---

## 1️⃣ ES5 (2009) - Fondations

### 🎯 Objectif
Comprendre les bases de JavaScript moderne.

### 📝 Fonctionnalités clés

```javascript
// Variables et fonctions
var name = "John";
var age = 30;

function greet(name) {
  return "Hello, " + name;
}

// Objets et prototypes
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return "Hello, I'm " + this.name;
};

var person = new Person("John", 30);

// Array methods
var numbers = [1, 2, 3, 4, 5];
var doubled = numbers.map(function(n) {
  return n * 2;
});

var filtered = numbers.filter(function(n) {
  return n > 2;
});

var sum = numbers.reduce(function(acc, n) {
  return acc + n;
}, 0);
```

---

## 2️⃣ ES6/ES2015 - Révolution moderne

### 🎯 Objectif
Introduction des fonctionnalités modernes essentielles.

### 📝 Variables et constantes

```javascript
// let et const
let name = "John";        // Variable mutable
const age = 30;           // Constante

// Block scoping
if (true) {
  let blockScoped = "visible only here";
  const alsoBlockScoped = "also here";
}
// blockScoped n'est pas accessible ici

// Temporal Dead Zone
console.log(hoisted); // undefined
var hoisted = "I'm hoisted";

console.log(notHoisted); // ReferenceError
let notHoisted = "I'm not hoisted";
```

### 📝 Arrow Functions

```javascript
// Fonctions traditionnelles
function add(a, b) {
  return a + b;
}

// Arrow functions
const add = (a, b) => a + b;
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// Array methods avec arrow functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const filtered = numbers.filter(n => n > 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// this binding
const obj = {
  name: "John",
  traditional: function() {
    console.log(this.name); // "John"
  },
  arrow: () => {
    console.log(this.name); // undefined (pas de this binding)
  }
};
```

### 📝 Template Literals

```javascript
// Concatenation traditionnelle
const name = "John";
const age = 30;
const message = "Hello, " + name + ". You are " + age + " years old.";

// Template literals
const message = `Hello, ${name}. You are ${age} years old.`;

// Multi-line strings
const html = `
  <div class="user">
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// Expressions complexes
const price = 19.99;
const tax = 0.08;
const total = `Total: $${(price * (1 + tax)).toFixed(2)}`;
```

### 📝 Destructuring

```javascript
// Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Object destructuring
const user = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

const { name, age, email } = user;
const { name: userName, age: userAge } = user; // Renommage

// Destructuring avec valeurs par défaut
const { name = "Anonymous", phone = "N/A" } = user;

// Destructuring dans les paramètres
function greetUser({ name, age = 0 }) {
  return `Hello ${name}, you are ${age} years old`;
}
```

### 📝 Classes

```javascript
// Classes ES6
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }

  static createAdult(name) {
    return new Person(name, 18);
  }
}

// Héritage
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    return `${this.name} is studying`;
  }
}

// Getters et setters
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }

  set diameter(value) {
    this.radius = value / 2;
  }
}
```

### 📝 Modules

```javascript
// Export
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

export default class Calculator {
  // ...
}

// Import
import Calculator, { PI, add } from './calculator.js';
import * as utils from './utils.js';

// Dynamic import
const module = await import('./dynamic-module.js');
```

---

## 3️⃣ ES7/ES2016 - Améliorations

### 🎯 Objectif
Ajouts mineurs mais utiles.

### 📝 Array.includes

```javascript
// Avant
const numbers = [1, 2, 3, 4, 5];
const hasThree = numbers.indexOf(3) !== -1;

// Après
const hasThree = numbers.includes(3);
```

### 📝 Exponentiation Operator

```javascript
// Avant
const power = Math.pow(2, 3); // 8

// Après
const power = 2 ** 3; // 8
const power = 2 ** 3 ** 2; // 512 (right-associative)
```

---

## 4️⃣ ES8/ES2017 - Async/Await et plus

### 🎯 Objectif
Révolution dans la gestion asynchrone.

### 📝 Async/Await

```javascript
// Promises traditionnelles
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json())
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// Async/await
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Gestion d'erreurs améliorée
async function processUsers(userIds) {
  const results = [];
  
  for (const id of userIds) {
    try {
      const user = await fetchUser(id);
      results.push(user);
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      // Continue avec les autres utilisateurs
    }
  }
  
  return results;
}
```

### 📝 Object.entries et Object.values

```javascript
const user = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

// Object.keys (ES5)
const keys = Object.keys(user); // ["name", "age", "email"]

// Object.values (ES8)
const values = Object.values(user); // ["John", 30, "john@example.com"]

// Object.entries (ES8)
const entries = Object.entries(user); // [["name", "John"], ["age", 30], ["email", "john@example.com"]]

// Utilisation pratique
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// Conversion en Map
const userMap = new Map(Object.entries(user));
```

### 📝 String padding

```javascript
// padStart
const number = "5";
const padded = number.padStart(3, "0"); // "005"

// padEnd
const text = "Hello";
const padded = text.padEnd(10, "!"); // "Hello!!!!!"

// Utilisation pratique
const formatTime = (hours, minutes) => {
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
```

---

## 5️⃣ ES9/ES2018 - Spread, Rest et Async

### 🎯 Objectif
Améliorations des opérateurs et async iterators.

### 📝 Object Rest/Spread

```javascript
// Object spread
const user = { name: "John", age: 30 };
const userWithEmail = { ...user, email: "john@example.com" };

// Object rest
const { name, ...rest } = user;
console.log(rest); // { age: 30 }

// Merge d'objets
const defaults = { theme: "light", language: "en" };
const userPrefs = { theme: "dark" };
const config = { ...defaults, ...userPrefs }; // { theme: "dark", language: "en" }
```

### 📝 Async Iterators

```javascript
// Async generator
async function* fetchUsers() {
  const userIds = [1, 2, 3, 4, 5];
  
  for (const id of userIds) {
    try {
      const user = await fetchUser(id);
      yield user;
    } catch (error) {
      console.error(`Failed to fetch user ${id}`);
    }
  }
}

// Utilisation
for await (const user of fetchUsers()) {
  console.log(user);
}
```

---

## 6️⃣ ES10/ES2019 - Améliorations mineures

### 🎯 Objectif
Petites améliorations utiles.

### 📝 Array.flat et Array.flatMap

```javascript
// Array.flat
const nested = [1, [2, 3], [4, [5, 6]]];
const flattened = nested.flat(); // [1, 2, 3, 4, [5, 6]]
const fullyFlattened = nested.flat(2); // [1, 2, 3, 4, 5, 6]

// Array.flatMap
const words = ["hello world", "goodbye world"];
const letters = words.flatMap(word => word.split(" ")); // ["hello", "world", "goodbye", "world"]
```

### 📝 Object.fromEntries

```javascript
// Conversion Map vers Object
const map = new Map([
  ["name", "John"],
  ["age", 30]
]);
const obj = Object.fromEntries(map); // { name: "John", age: 30 }

// Conversion Array vers Object
const entries = [["name", "John"], ["age", 30]];
const obj = Object.fromEntries(entries); // { name: "John", age: 30 }
```

---

## 7️⃣ ES11/ES2020 - BigInt et Optional Chaining

### 🎯 Objectif
Gestion des grands nombres et navigation sécurisée.

### 📝 BigInt

```javascript
// Limite des nombres JavaScript
const maxSafeInteger = Number.MAX_SAFE_INTEGER; // 9007199254740991

// BigInt
const bigNumber = BigInt("9007199254740992");
const anotherBig = 9007199254740993n; // Syntaxe littérale

// Opérations
const sum = bigNumber + anotherBig;
const product = bigNumber * anotherBig;

// Conversion
const regularNumber = Number(bigNumber);
const bigFromNumber = BigInt(regularNumber);
```

### 📝 Optional Chaining

```javascript
// Avant
const user = {
  profile: {
    address: {
      street: "123 Main St"
    }
  }
};

// Accès sécurisé
const street = user && user.profile && user.profile.address && user.profile.address.street;

// Après
const street = user?.profile?.address?.street;

// Avec fonction
const result = user?.getName?.();

// Avec array
const firstItem = array?.[0];
```

### 📝 Nullish Coalescing

```javascript
// Avant
const name = user.name || "Anonymous";
const age = user.age || 0; // Problème si age est 0

// Après
const name = user.name ?? "Anonymous";
const age = user.age ?? 0; // Utilise 0 si age est null ou undefined

// Combinaison avec optional chaining
const street = user?.profile?.address?.street ?? "Unknown";
```

---

## 8️⃣ ES12/ES2021 - Logical Assignment

### 🎯 Objectif
Opérateurs d'assignation logique.

### 📝 Logical Assignment Operators

```javascript
// Logical OR assignment
let name = "";
name ||= "Anonymous"; // name = "Anonymous"

// Logical AND assignment
let user = null;
user &&= { name: "John" }; // user reste null

// Nullish coalescing assignment
let config = {};
config.theme ??= "light"; // config.theme = "light"
config.theme ??= "dark";  // config.theme reste "light"
```

---

## 9️⃣ ES13/ES2022 - Top-level await et Private fields

### 🎯 Objectif
Await au niveau module et encapsulation.

### 📝 Top-level await

```javascript
// Dans un module
const response = await fetch('/api/data');
const data = await response.json();
export default data;

// Utilisation
import data from './data.js';
console.log(data); // Données déjà chargées
```

### 📝 Private fields

```javascript
class BankAccount {
  #balance = 0; // Champ privé
  #accountNumber; // Champ privé

  constructor(accountNumber) {
    this.#accountNumber = accountNumber;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }

  // Méthode privée
  #validateAmount(amount) {
    return amount > 0;
  }
}

const account = new BankAccount("12345");
account.deposit(100);
console.log(account.getBalance()); // 100
// console.log(account.#balance); // SyntaxError
```

---

## 🔟 ES14/ES2023 - Array methods et Hashbang

### 🎯 Objectif
Nouvelles méthodes d'array et hashbang.

### 📝 Array methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// findLast
const lastEven = numbers.findLast(n => n % 2 === 0); // 4

// findLastIndex
const lastEvenIndex = numbers.findLastIndex(n => n % 2 === 0); // 3

// toReversed (non-mutating)
const reversed = numbers.toReversed(); // [5, 4, 3, 2, 1]
console.log(numbers); // [1, 2, 3, 4, 5] (inchangé)

// toSorted (non-mutating)
const sorted = numbers.toSorted((a, b) => b - a); // [5, 4, 3, 2, 1]
console.log(numbers); // [1, 2, 3, 4, 5] (inchangé)

// toSpliced (non-mutating)
const spliced = numbers.toSpliced(1, 2, 10, 11); // [1, 10, 11, 4, 5]
console.log(numbers); // [1, 2, 3, 4, 5] (inchangé)

// with (non-mutating)
const withReplacement = numbers.with(2, 99); // [1, 2, 99, 4, 5]
console.log(numbers); // [1, 2, 3, 4, 5] (inchangé)
```

### 📝 Hashbang

```javascript
#!/usr/bin/env node
// Fichier: my-script.js

console.log("Hello from Node.js script!");
```

---

## 1️⃣1️⃣ ES15/ES2024 - Pattern matching et plus

### 🎯 Objectif
Pattern matching et améliorations futures.

### 📝 Pattern Matching (Proposal)

```javascript
// Pattern matching (proposal)
const result = match(value) {
  case 0: return "zero";
  case 1: return "one";
  case n when n > 1: return "positive";
  case n when n < 0: return "negative";
  default: return "unknown";
};
```

---

## 📈 Patterns modernes et bonnes pratiques

### 🎯 Objectif
Utiliser les fonctionnalités modernes efficacement.

### 📝 Functional Programming

```javascript
// Composition de fonctions
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const add = (a) => (b) => a + b;
const multiply = (a) => (b) => a * b;

const calculate = pipe(
  add(5),
  multiply(2),
  (x) => x.toString()
);

const result = calculate(10); // "30"

// Immutabilité
const updateUser = (user, updates) => ({
  ...user,
  ...updates,
  updatedAt: new Date().toISOString()
});

// Currying
const createLogger = (level) => (message) => {
  console.log(`[${level}] ${message}`);
};

const logError = createLogger("ERROR");
const logInfo = createLogger("INFO");
```

### 📝 Async Patterns

```javascript
// Promise.allSettled
const promises = [
  fetchUser(1),
  fetchUser(2),
  fetchUser(999) // Peut échouer
];

const results = await Promise.allSettled(promises);
results.forEach((result, index) => {
  if (result.status === "fulfilled") {
    console.log(`User ${index + 1}:`, result.value);
  } else {
    console.error(`User ${index + 1} failed:`, result.reason);
  }
});

// Async generators
async function* paginateAPI(endpoint) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${endpoint}?page=${page}`);
    const data = await response.json();
    
    yield* data.items;
    
    hasMore = data.hasMore;
    page++;
  }
}

// Utilisation
for await (const item of paginateAPI("/api/items")) {
  console.log(item);
}
```

### 📝 Error Handling

```javascript
// Try-catch moderne
async function fetchUserWithRetry(id, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const user = await fetchUser(id);
      return user;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(`Failed to fetch user ${id} after ${maxRetries} attempts`);
      }
      
      // Attendre avant de réessayer
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// Result pattern
class Result {
  constructor(value, error) {
    this.value = value;
    this.error = error;
    this.isSuccess = !error;
    this.isFailure = !!error;
  }

  static success(value) {
    return new Result(value, null);
  }

  static failure(error) {
    return new Result(null, error);
  }
}

async function safeFetchUser(id) {
  try {
    const user = await fetchUser(id);
    return Result.success(user);
  } catch (error) {
    return Result.failure(error);
  }
}
```

---

## ✅ Checklist de migration

### 🎯 Objectif
Vérifier l'adoption des fonctionnalités modernes.

- [ ] **ES6+** : let/const, arrow functions, template literals
- [ ] **ES2017** : async/await, Object.entries/values
- [ ] **ES2018** : Object rest/spread, async iterators
- [ ] **ES2020** : Optional chaining, nullish coalescing
- [ ] **ES2021** : Logical assignment operators
- [ ] **ES2022** : Top-level await, private fields
- [ ] **ES2023** : Array methods non-mutating
- [ ] **Patterns** : Functional programming, error handling

### 🧱 Recommandations

1. **Migration progressive** : Adoptez les fonctionnalités par ordre de priorité
2. **Tests** : Testez chaque migration
3. **Performance** : Mesurez l'impact sur les performances
4. **Compatibilité** : Vérifiez la compatibilité des navigateurs
5. **Formation** : Formez l'équipe aux nouvelles fonctionnalités
