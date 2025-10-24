# 🎨 Design Patterns - Guide Complet

## 📋 Table des matières

- [Introduction](#introduction)
- [Vue 3 Composition API Patterns](#vue-3-composition-api-patterns)
- [TypeScript Patterns](#typescript-patterns)
- [Node.js Patterns](#nodejs-patterns)
- [NestJS Patterns](#nestjs-patterns)
- [Patterns Fonctionnels](#patterns-fonctionnels)
- [Patterns Orientés Objet](#patterns-orientés-objet)
- [Patterns Classiques (Gang of Four)](#patterns-classiques-gang-of-four)
- [Génériques TypeScript Avancés](#génériques-typescript-avancés)
- [Ressources](#ressources)

## 🚀 Introduction

Ce guide couvre les design patterns essentiels pour le développement moderne avec Vue.js 3, TypeScript, Node.js et NestJS. Les patterns sont organisés par technologie et par paradigme de programmation.

### Objectifs
- **Maîtriser** les patterns de conception modernes
- **Appliquer** les patterns dans chaque technologie
- **Comprendre** les avantages et inconvénients
- **Implémenter** des solutions robustes et maintenables

## 🎯 Vue 3 Composition API Patterns

### Tableau de Référence Patterns Vue 3

| Pattern | Description | Usage | Avantages |
|---------|-------------|-------|-----------|
| **Composable Pattern** | Fonctions de composition réutilisables | Logique partagée | Réutilisabilité, testabilité |
| **Provider Pattern** | Fourniture de données via provide/inject | État global | Découplage, flexibilité |
| **Observer Pattern** | Réactivité avec watch/watchEffect | Surveillance de changements | Réactivité, performance |
| **Factory Pattern** | Création de composants dynamiques | Composants dynamiques | Flexibilité, extensibilité |
| **Strategy Pattern** | Algorithmes interchangeables | Logique conditionnelle | Extensibilité, maintenabilité |
| **Decorator Pattern** | Enrichissement de composants | Fonctionnalités additionnelles | Modularité, réutilisabilité |
| **Proxy Pattern** | Contrôle d'accès aux données | Validation, logging | Contrôle, sécurité |
| **Singleton Pattern** | Instance unique | Services, stores | Consistance, performance |
| **Module Pattern** | Encapsulation de logique | Organisation du code | Encapsulation, réutilisabilité |
| **Mixin Pattern** | Partage de fonctionnalités | Logique commune | Réutilisabilité, composition |

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

// Usage dans un composant
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

### Tableau de Référence Patterns TypeScript

| Pattern | Description | Usage | Avantages |
|---------|-------------|-------|-----------|
| **Singleton** | Instance unique | Services, caches | Consistance, performance |
| **Factory** | Création d'objets | Objets complexes | Flexibilité, extensibilité |
| **Builder** | Construction d'objets | Objets complexes | Lisibilité, flexibilité |
| **Observer** | Notification de changements | Événements | Découplage, réactivité |
| **Strategy** | Algorithmes interchangeables | Logique conditionnelle | Extensibilité, testabilité |
| **Decorator** | Enrichissement d'objets | Fonctionnalités additionnelles | Modularité, réutilisabilité |
| **Proxy** | Contrôle d'accès | Validation, logging | Contrôle, sécurité |
| **Command** | Encapsulation d'actions | Undo/Redo, queues | Flexibilité, extensibilité |
| **Adapter** | Interface commune | Intégrations | Compatibilité, réutilisabilité |
| **Facade** | Interface simplifiée | APIs complexes | Simplicité, maintenabilité |

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
    // Initialisation de la connexion
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

### Tableau de Référence Patterns Node.js

| Pattern | Description | Usage | Avantages |
|---------|-------------|-------|-----------|
| **Module Pattern** | Encapsulation de code | Organisation | Encapsulation, réutilisabilité |
| **Middleware Pattern** | Traitement de requêtes | Express.js | Modularité, réutilisabilité |
| **Observer Pattern** | Événements | EventEmitter | Découplage, réactivité |
| **Promise Pattern** | Gestion asynchrone | Async/await | Lisibilité, gestion d'erreurs |
| **Stream Pattern** | Traitement de flux | Fichiers, réseau | Performance, mémoire |
| **Worker Pattern** | Traitement parallèle | CPU intensif | Performance, scalabilité |
| **Circuit Breaker** | Protection contre pannes | Services externes | Résilience, stabilité |
| **Retry Pattern** | Nouvelle tentative | Opérations échouées | Résilience, fiabilité |
| **Rate Limiting** | Limitation de débit | APIs | Protection, performance |
| **Caching Pattern** | Mise en cache | Données fréquentes | Performance, efficacité |

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

### Tableau de Référence Patterns NestJS

| Pattern | Description | Usage | Avantages |
|---------|-------------|-------|-----------|
| **Dependency Injection** | Injection de dépendances | Services | Testabilité, modularité |
| **Repository Pattern** | Abstraction des données | Accès aux données | Testabilité, flexibilité |
| **Service Layer** | Logique métier | Business logic | Séparation des préoccupations |
| **Controller Pattern** | Gestion des requêtes | APIs REST | Organisation, réutilisabilité |
| **Guard Pattern** | Protection des routes | Authentification | Sécurité, réutilisabilité |
| **Interceptor Pattern** | Interception de requêtes | Logging, transformation | Modularité, réutilisabilité |
| **Pipe Pattern** | Validation/transformation | Données | Validation, transformation |
| **Filter Pattern** | Gestion d'erreurs | Exception handling | Centralisation, réutilisabilité |
| **Module Pattern** | Organisation du code | Structure | Modularité, réutilisabilité |
| **Factory Pattern** | Création de services | Services dynamiques | Flexibilité, extensibilité |

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
    // Validation métier
    if (await this.userRepository.findByEmail(createUserDto.email)) {
      throw new ConflictException('Email already exists')
    }
    
    // Création de l'utilisateur
    const user = await this.userRepository.create(createUserDto)
    
    // Envoi d'email de bienvenue
    await this.emailService.sendWelcomeEmail(user.email)
    
    // Émission d'événement
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

## 🎯 Patterns Fonctionnels

### Tableau de Référence Patterns Fonctionnels

| Pattern | Description | Usage | Avantages |
|---------|-------------|-------|-----------|
| **Pure Functions** | Fonctions pures | Calculs | Testabilité, prédictibilité |
| **Higher-Order Functions** | Fonctions d'ordre supérieur | Transformation | Réutilisabilité, composition |
| **Function Composition** | Composition de fonctions | Pipeline | Lisibilité, modularité |
| **Currying** | Application partielle | Configuration | Flexibilité, réutilisabilité |
| **Partial Application** | Application partielle | Configuration | Flexibilité, réutilisabilité |
| **Memoization** | Mise en cache | Performance | Performance, efficacité |
| **Monad Pattern** | Gestion d'effets | Gestion d'erreurs | Sécurité, composition |
| **Functor Pattern** | Transformation | Données | Composition, réutilisabilité |
| **Monoid Pattern** | Combinaison | Agrégation | Associativité, identité |
| **Lens Pattern** | Accès aux données | Données immutables | Sécurité, composition |

### Function Composition

```typescript
// Fonctions pures
const add = (x: number) => (y: number) => x + y
const multiply = (x: number) => (y: number) => x * y
const square = (x: number) => x * x

// Composition de fonctions
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

## 🎯 Patterns Orientés Objet

### Tableau de Référence Patterns OOP

| Pattern | Description | Usage | Avantages |
|---------|-------------|-------|-----------|
| **Inheritance** | Héritage | Réutilisabilité | Réutilisabilité, polymorphisme |
| **Composition** | Composition | Flexibilité | Flexibilité, testabilité |
| **Aggregation** | Agrégation | Relations | Relations, modularité |
| **Encapsulation** | Encapsulation | Données | Sécurité, maintenabilité |
| **Polymorphism** | Polymorphisme | Flexibilité | Flexibilité, extensibilité |
| **Abstraction** | Abstraction | Interfaces | Simplicité, maintenabilité |
| **Interface Segregation** | Ségrégation d'interfaces | Interfaces | Flexibilité, maintenabilité |
| **Dependency Inversion** | Inversion de dépendance | Couplage | Testabilité, flexibilité |
| **Open/Closed** | Ouvert/Fermé | Extensibilité | Extensibilité, maintenabilité |
| **Single Responsibility** | Responsabilité unique | Classes | Maintenabilité, testabilité |

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

// Implémentations
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

// Classe principale utilisant la composition
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

## 🎯 Patterns Classiques (Gang of Four)

### Tableau de Référence Patterns Classiques

| Pattern | Catégorie | Description | Usage | Avantages |
|---------|-----------|-------------|-------|-----------|
| **Singleton** | Création | Instance unique | Services, caches | Consistance, performance |
| **Factory** | Création | Création d'objets | Objets complexes | Flexibilité, extensibilité |
| **Abstract Factory** | Création | Familles d'objets | Interfaces multi-plateformes | Cohérence, extensibilité |
| **Builder** | Création | Construction d'objets | Objets complexes | Lisibilité, flexibilité |
| **Prototype** | Création | Clonage d'objets | Coût de création élevé | Performance, flexibilité |
| **Object Pool** | Création | Réutilisation d'objets | Ressources coûteuses | Performance, mémoire |
| **Variadic Functions** | Création | Fonctions flexibles | Paramètres variables | Flexibilité, simplicité |
| **Adapter** | Structure | Interface commune | Intégrations | Compatibilité, réutilisabilité |
| **Bridge** | Structure | Séparation abstraction/implémentation | Multi-plateformes | Flexibilité, extensibilité |
| **Composite** | Structure | Traitement uniforme | Structures hiérarchiques | Simplicité, extensibilité |
| **Decorator** | Structure | Enrichissement dynamique | Fonctionnalités additionnelles | Modularité, réutilisabilité |
| **Facade** | Structure | Interface simplifiée | Systèmes complexes | Simplicité, maintenabilité |
| **Flyweight** | Structure | Partage d'objets | Objets similaires | Performance, mémoire |
| **Proxy** | Structure | Contrôle d'accès | Validation, cache | Contrôle, sécurité |
| **Observer** | Comportement | Notification de changements | Événements | Découplage, réactivité |
| **Strategy** | Comportement | Algorithmes interchangeables | Logique conditionnelle | Extensibilité, testabilité |
| **Command** | Comportement | Encapsulation d'actions | Undo/Redo, queues | Flexibilité, extensibilité |
| **State Machine** | Comportement | Gestion d'états | Machines à états | Clarté, maintenabilité |
| **Template Method** | Comportement | Squelette d'algorithme | Algorithmes similaires | Réutilisabilité, extensibilité |
| **Chain of Responsibility** | Comportement | Chaîne de traitement | Validation, logging | Découplage, flexibilité |
| **Mediator** | Comportement | Communication centralisée | Interactions complexes | Découplage, maintenabilité |
| **Memento** | Comportement | Sauvegarde d'état | Undo/Redo | Récupération, historique |
| **Iterator** | Comportement | Parcours de collections | Collections | Abstraction, flexibilité |
| **Visitor** | Comportement | Opérations sur structures | Structures complexes | Extensibilité, séparation |
| **Reactive Programming** | Comportement | Programmation réactive | Flux de données | Performance, réactivité |
| **Saga** | Comportement | Transactions distribuées | Microservices | Consistance, résilience |
| **Sentinel** | Comportement | Valeurs sentinelles | Terminaison, validation | Simplicité, performance |

### Fichiers de Documentation

- **[Patterns de Création](oop-functional/creational-patterns.md)** - Singleton, Factory, Abstract Factory, Builder, Prototype, Object Pool, Variadic Functions
- **[Patterns de Structure](oop-functional/structural-patterns.md)** - Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- **[Patterns de Comportement](oop-functional/behavioral-patterns.md)** - Observer, Strategy, Command, State Machine, Template Method, Chain of Responsibility, Mediator, Memento, Iterator, Visitor, Reactive Programming, Saga, Sentinel

## 🎯 Génériques TypeScript Avancés

### Tableau de Référence Génériques Avancés

| Concept | Description | Usage | Avantages |
|---------|-------------|-------|-----------|
| **Génériques de Base** | Paramètres de type | Fonctions, classes, interfaces | Réutilisabilité, type safety |
| **Contraintes** | Limitation des types | Validation de types | Sécurité, flexibilité |
| **Types Conditionnels** | Types dépendants | Logique de types | Flexibilité, expressivité |
| **Types Mappés** | Transformation de types | Utility types | Productivité, réutilisabilité |
| **Génériques Variadiques** | Types de longueur variable | Tuples, rest parameters | Flexibilité, expressivité |
| **Contraintes Multiples** | Plusieurs contraintes | Types complexes | Sécurité, expressivité |
| **Utility Types Personnalisés** | Types utilitaires | Réutilisabilité | Productivité, maintenabilité |

### Fichier de Documentation

- **[Génériques TypeScript Avancés](typescript/generics-advanced.md)** - Génériques de base, contraintes, types conditionnels, types mappés, génériques variadiques, contraintes multiples, utility types personnalisés

## 📚 Documentation Disponible

### Patterns

- **[Patterns Vue 3](./vue3/)** - Patterns Vue 3 Composition API
- **[Patterns Node.js](./nodejs/)** - Patterns Node.js
- **[Patterns NestJS](./nestjs/)** - Patterns NestJS
- **[Patterns TypeScript](./typescript/)** - Patterns TypeScript
- **[Patterns OOP vs Fonctionnel](./oop-functional/)** - Comparaison des paradigmes
- **[DTOs et Patterns de Validation](./dto-patterns.md)** - Guide complet des DTOs et validation

## 📚 Ressources

### Documentation officielle
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [NestJS Documentation](https://docs.nestjs.com/)

### Livres et ressources
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Refactoring: Improving the Design of Existing Code](https://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0134757599)

### Communautés et ressources
- [Vue.js Community](https://vuejs.org/community/)
- [TypeScript Community](https://www.typescriptlang.org/community/)
- [Node.js Community](https://nodejs.org/en/community/)
- [NestJS Community](https://discord.gg/nestjs)

---

*Dernière mise à jour : Janvier 2024*