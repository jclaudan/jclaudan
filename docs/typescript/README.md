# 🔵 TypeScript - Guide Complet

> **TypeScript** est un sur-ensemble typé de JavaScript qui se compile en JavaScript pur. Il ajoute des types statiques optionnels, des outils de développement avancés et une meilleure expérience de développement pour JavaScript.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-typescript)
- [🚀 Introduction](#-introduction)
- [🟢 Débutant - Types de Base](#-débutant---types-de-base)
- [🟡 Intermédiaire - Types Avancés](#-intermédiaire---types-avancés)
- [🟠 Confirmé - Patterns et Bonnes Pratiques](#-confirmé---patterns-et-bonnes-pratiques)
- [🔴 Senior - Architecture et SOLID](#-senior---architecture-et-solid)
- [⚫ Expert - Types Conditionnels et Avancés](#-expert---types-conditionnels-et-avancés)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète TypeScript

### 🎯 Types Primitifs

| Type | Description | Exemple | Utilisation |
|------|-------------|---------|-------------|
| **string** | Chaîne de caractères | `"Hello World"` | Texte, noms, messages |
| **number** | Nombre | `42`, `3.14` | Calculs, compteurs, IDs |
| **boolean** | Booléen | `true`, `false` | Conditions, flags |
| **null** | Valeur nulle | `null` | Absence de valeur |
| **undefined** | Non défini | `undefined` | Variable non initialisée |
| **void** | Pas de retour | `void` | Fonctions sans retour |
| **never** | Jamais atteint | `never` | Fonctions qui ne retournent jamais |
| **any** | N'importe quel type | `any` | Éviter si possible |
| **unknown** | Type inconnu | `unknown` | Alternative sûre à `any` |

### 🎯 Types de Base

| Type | Description | Exemple | Utilisation |
|------|-------------|---------|-------------|
| **Array** | Tableau | `string[]`, `Array<number>` | Collections d'éléments |
| **Tuple** | Tuple | `[string, number]` | Tableau de taille fixe |
| **Object** | Objet | `{ name: string }` | Structures de données |
| **Function** | Fonction | `(x: number) => string` | Fonctions typées |
| **Enum** | Énumération | `enum Color { Red, Blue }` | Constantes nommées |
| **Union** | Union | `string \| number` | Plusieurs types possibles |
| **Intersection** | Intersection | `A & B` | Combinaison de types |
| **Literal** | Littéral | `"success" \| "error"` | Valeurs spécifiques |

### 🎯 Types Utilitaires

| Type | Description | Exemple | Utilisation |
|------|-------------|---------|-------------|
| **Partial<T>** | Toutes les propriétés optionnelles | `Partial<User>` | Mises à jour partielles |
| **Required<T>** | Toutes les propriétés obligatoires | `Required<User>` | Validation stricte |
| **Pick<T, K>** | Sélectionner des propriétés | `Pick<User, 'id' \| 'name'>` | Sous-ensembles |
| **Omit<T, K>** | Exclure des propriétés | `Omit<User, 'password'>` | Masquer des données |
| **Record<K, V>** | Objet avec clés typées | `Record<string, number>` | Maps typées |
| **Exclude<T, U>** | Exclure des types | `Exclude<string \| number, string>` | Filtrage de types |
| **Extract<T, U>** | Extraire des types | `Extract<string \| number, string>` | Sélection de types |
| **NonNullable<T>** | Exclure null/undefined | `NonNullable<string \| null>` | Types non-nullables |
| **ReturnType<T>** | Type de retour | `ReturnType<() => string>` | Types de fonctions |
| **Parameters<T>** | Paramètres de fonction | `Parameters<(a: string) => void>` | Types de paramètres |

### 🎯 Modificateurs de Propriétés

| Modificateur | Description | Exemple | Utilisation |
|--------------|-------------|---------|-------------|
| **readonly** | Lecture seule | `readonly name: string` | Immutabilité |
| **optional** | Optionnel | `name?: string` | Propriétés facultatives |
| **required** | Obligatoire | `name: string` | Propriétés obligatoires |
| **public** | Public | `public name: string` | Accès public (défaut) |
| **private** | Privé | `private name: string` | Accès privé |
| **protected** | Protégé | `protected name: string` | Accès protégé |
| **static** | Statique | `static count: number` | Propriétés de classe |
| **abstract** | Abstrait | `abstract method()` | Méthodes abstraites |

### 🎯 Décorateurs

| Décorateur | Description | Exemple | Utilisation |
|------------|-------------|---------|-------------|
| **@Component** | Composant | `@Component({})` | Frameworks (Angular) |
| **@Injectable** | Service | `@Injectable()` | Injection de dépendance |
| **@Input** | Propriété d'entrée | `@Input() name: string` | Communication parent-enfant |
| **@Output** | Événement de sortie | `@Output() change = new EventEmitter()` | Communication enfant-parent |
| **@HostListener** | Écouteur d'événement | `@HostListener('click')` | Gestion d'événements |
| **@ViewChild** | Référence d'enfant | `@ViewChild('input')` | Accès aux éléments DOM |
| **@Pipe** | Pipe personnalisé | `@Pipe({ name: 'custom' })` | Transformation de données |
| **@Directive** | Directive | `@Directive({ selector: '[custom]' })` | Comportement personnalisé |

### 🎯 Configuration TypeScript

| Option | Description | Valeur par défaut | Utilisation |
|--------|-------------|-------------------|-------------|
| **target** | Version JavaScript cible | `ES3` | Compatibilité navigateur |
| **module** | Système de modules | `CommonJS` | Gestion des modules |
| **lib** | Bibliothèques incluses | `[]` | APIs disponibles |
| **strict** | Mode strict | `false` | Vérifications strictes |
| **noImplicitAny** | Erreur sur `any` implicite | `false` | Typage strict |
| **strictNullChecks** | Vérification null/undefined | `false` | Gestion des nulls |
| **strictFunctionTypes** | Types de fonctions stricts | `false` | Vérification des fonctions |
| **noImplicitReturns** | Retour explicite requis | `false` | Fonctions complètes |
| **noUnusedLocals** | Variables locales inutilisées | `false` | Code propre |
| **noUnusedParameters** | Paramètres inutilisés | `false` | Signatures propres |
| **exactOptionalPropertyTypes** | Types optionnels exacts | `false` | Précision des types |
| **noImplicitOverride** | Override explicite | `false` | Héritage clair |
| **noPropertyAccessFromIndexSignature** | Accès par index | `false` | Accès aux propriétés |
| **noUncheckedIndexedAccess** | Accès indexé vérifié | `false` | Sécurité des accès |

### 🎯 Commandes TypeScript

| Commande | Description | Exemple | Utilisation |
|----------|-------------|---------|-------------|
| **tsc** | Compiler TypeScript | `tsc file.ts` | Compilation |
| **tsc --init** | Initialiser config | `tsc --init` | Créer tsconfig.json |
| **tsc --watch** | Mode watch | `tsc --watch` | Compilation continue |
| **tsc --noEmit** | Vérification sans compilation | `tsc --noEmit` | Validation |
| **tsc --strict** | Mode strict | `tsc --strict` | Vérifications strictes |
| **tsc --build** | Build incrémental | `tsc --build` | Compilation optimisée |
| **tsc --showConfig** | Afficher config | `tsc --showConfig` | Voir la configuration |
| **tsc --listFiles** | Lister fichiers | `tsc --listFiles` | Fichiers compilés |
| **tsc --version** | Version | `tsc --version` | Version TypeScript |

---

## 🚀 Introduction

TypeScript est un sur-ensemble typé de JavaScript qui se compile en JavaScript pur. Il ajoute des types statiques optionnels, des outils de développement avancés et une meilleure expérience de développement.

### Qu'est-ce que TypeScript ?
TypeScript est un langage de programmation développé par Microsoft qui étend JavaScript en ajoutant un système de types statiques. Il permet de détecter les erreurs à la compilation, d'améliorer l'expérience de développement et de faciliter la maintenance du code.

### Pourquoi choisir TypeScript ?
- **🎯 Typage Statique** : Détection d'erreurs à la compilation
- **🔍 IntelliSense** : Autocomplétion et documentation intégrée
- **🔄 Refactoring** : Refactoring sécurisé à grande échelle
- **📝 Interfaces** : Contrats clairs entre composants
- **🔧 Génériques** : Code réutilisable et type-safe
- **⚡ Performance** : Meilleure optimisation du code
- **🛡️ Sécurité** : Prévention des erreurs courantes
- **📚 Documentation** : Types comme documentation vivante

## 🎯 Types avancés

### 1. Types utilitaires

```typescript
// Types utilitaires intégrés
interface User {
  id: number
  name: string
  email: string
  age: number
  isActive: boolean
}

// Partial<T> - Rend toutes les propriétés optionnelles
type PartialUser = Partial<User>
// { id?: number; name?: string; email?: string; age?: number; isActive?: boolean }

// Required<T> - Rend toutes les propriétés obligatoires
type RequiredUser = Required<PartialUser>
// { id: number; name: string; email: string; age: number; isActive: boolean }

// Pick<T, K> - Sélectionne certaines propriétés
type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>
// { id: number; name: string; email: string }

// Omit<T, K> - Exclut certaines propriétés
type UserWithoutId = Omit<User, 'id'>
// { name: string; email: string; age: number; isActive: boolean }

// Record<K, V> - Crée un objet avec des clés et valeurs typées
type UserRoles = Record<string, string[]>
// { [key: string]: string[] }

// Exclude<T, U> - Exclut des types
type NonNullable<T> = Exclude<T, null | undefined>

// Extract<T, U> - Extrait des types
type StringOrNumber = string | number
type OnlyString = Extract<StringOrNumber, string> // string
```

### 2. Types conditionnels

```typescript
// Type conditionnel basique
type IsString<T> = T extends string ? true : false

type Test1 = IsString<string>  // true
type Test2 = IsString<number>  // false

// Type conditionnel avec inférence
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Func = () => string
type FuncReturn = ReturnType<Func> // string

// Type conditionnel distributif
type ToArray<T> = T extends any ? T[] : never

type StrArrOrNumArr = ToArray<string | number> // string[] | number[]

// Type conditionnel non-distributif
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never

type StrOrNumArr = ToArrayNonDist<string | number> // (string | number)[]
```

### 3. Types mappés

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

### 4. Types de template literals

```typescript
// Template literal types
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<'click'> // 'onClick'
type MouseEvent = EventName<'mouse'> // 'onMouse'

// Types de template avec inférence
type ParseEventName<T> = T extends `on${infer U}` ? Uncapitalize<U> : never

type ClickEventParsed = ParseEventName<'onClick'> // 'click'

// Types de template complexes
type ApiEndpoint<T extends string> = `/api/${T}`

type UserEndpoint = ApiEndpoint<'users'> // '/api/users'
type ProductEndpoint = ApiEndpoint<'products'> // '/api/products'
```

## 🎯 Meilleures pratiques

### 1. Configuration TypeScript

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

### 2. Définition de types

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

### 3. Gestion des erreurs

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

### 4. Validation avec Zod

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
    // Initialisation de la connexion
    return { connected: true }
  }

  public getConnection(): any {
    return this.connection
  }
}

// Utilisation
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
  makeSound(): string {
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

// Utilisation
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

// Exemple d'utilisation
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
    // Logique de sauvegarde
    return { id: '1', ...userData, createdAt: new Date(), updatedAt: new Date() }
  }
}

// Observateur
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
    // Logique de paiement par carte de crédit
    return {
      success: true,
      transactionId: `cc_${Date.now()}`
    }
  }
}

class PayPalPayment implements PaymentStrategy {
  async pay(amount: number): Promise<PaymentResult> {
    // Logique de paiement PayPal
    return {
      success: true,
      transactionId: `pp_${Date.now()}`
    }
  }
}

class BankTransferPayment implements PaymentStrategy {
  async pay(amount: number): Promise<PaymentResult> {
    // Logique de virement bancaire
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

## 🎯 Principes SOLID

### 1. Single Responsibility Principle (SRP)

```typescript
// ❌ Mauvaise pratique - Classe avec plusieurs responsabilités
class UserManager {
  async createUser(userData: any) {
    // Validation
    if (!userData.email) throw new Error('Email required')
    
    // Persistance
    const user = await this.userRepository.save(userData)
    
    // Email
    await this.emailService.sendWelcomeEmail(user.email)
    
    // Logging
    this.logger.log(`User created: ${user.id}`)
    
    return user
  }
}

// ✅ Bonne pratique - Séparation des responsabilités
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
// Interface pour les différents types de notifications
interface NotificationStrategy {
  send(message: string, recipient: string): Promise<void>
}

// Implémentations extensibles
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

// Service ouvert à l'extension, fermé à la modification
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
// Interface de base
interface Shape {
  area(): number
  perimeter(): number
}

// Implémentations qui respectent le contrat
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

// Service qui utilise les formes sans connaître leur type concret
class ShapeCalculator {
  calculateTotalArea(shapes: Shape[]): number {
    return shapes.reduce((total, shape) => total + shape.area(), 0)
  }
}
```

### 4. Interface Segregation Principle (ISP)

```typescript
// ❌ Interface trop large
interface UserOperations {
  createUser(userData: CreateUser): Promise<User>
  updateUser(id: string, userData: UpdateUser): Promise<User>
  deleteUser(id: string): Promise<void>
  sendEmail(userId: string, message: string): Promise<void>
  generateReport(userId: string): Promise<Report>
}

// ✅ Interfaces séparées et spécialisées
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

// Classes qui implémentent seulement ce dont elles ont besoin
class UserService implements UserRepository {
  async create(userData: CreateUser): Promise<User> {
    // Implémentation
    return { id: '1', ...userData, createdAt: new Date(), updatedAt: new Date() }
  }
  
  async update(id: string, userData: UpdateUser): Promise<User> {
    // Implémentation
    return { id, ...userData, createdAt: new Date(), updatedAt: new Date() }
  }
  
  async delete(id: string): Promise<void> {
    // Implémentation
  }
  
  async findById(id: string): Promise<User | null> {
    // Implémentation
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

// Implémentations concrètes
class TypeOrmUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    // Implémentation TypeORM
    return null
  }
  
  async save(user: User): Promise<User> {
    // Implémentation TypeORM
    return user
  }
}

class SendGridEmailService implements EmailService {
  async sendWelcomeEmail(email: string): Promise<void> {
    // Implémentation SendGrid
    console.log(`Sending welcome email to ${email}`)
  }
}

// Service de haut niveau qui dépend des abstractions
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

### 1. Architecture en couches

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
    // Implémentation TypeORM
    return null
  }

  async findByEmail(email: string): Promise<User | null> {
    // Implémentation TypeORM
    return null
  }

  async save(user: User): Promise<User> {
    // Implémentation TypeORM
    return user
  }

  async delete(id: string): Promise<void> {
    // Implémentation TypeORM
  }
}
```

## 💡 Snippets avancés

### 1. Utilitaires de types

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

// Exemple d'utilisation
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

### 2. Gestion des promesses

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

// Exemple d'utilisation
async function fetchUserData(id: string) {
  return await retry(
    () => fetch(`/api/users/${id}`).then(res => res.json()),
    3,
    1000
  )
}
```

### 3. Validation de types à l'exécution

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

// Exemple d'utilisation
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

  // TypeScript sait maintenant que data est { id: string; name: string; ... }
  console.log(`Processing user ${data.id}: ${data.name}`)
}
```

### 4. Gestion des erreurs avec Result

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

// Exemple d'utilisation
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

// Utilisation
const result = await fetchUser('123')

if (isSuccess(result)) {
  console.log('User:', result.data)
} else {
  console.error('Error:', result.error)
}
```

## 📚 Référence Complète TypeScript

### 🆕 Améliorations TypeScript 2024

#### TypeScript 5.0+ - Nouvelles fonctionnalités
```typescript
// const assertions améliorées
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
} as const;

// Template literal types
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // 'onClick'
type MouseEvent = EventName<'mouse'>; // 'onMouse'

// Conditional types avancés
type NonNullable<T> = T extends null | undefined ? never : T;
type Flatten<T> = T extends Array<infer U> ? U : T;

// Mapped types avec as clauses
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// Utility types étendus
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

#### Améliorations Performance
```typescript
// Type-only imports
import type { User, CreateUserDto } from './types';
import { createUser } from './services';

// Type assertions sûres
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Branded types pour la sécurité
type UserId = number & { readonly __brand: unique symbol };
type ProductId = number & { readonly __brand: unique symbol };

function createUserId(id: number): UserId {
  return id as UserId;
}

// Const assertions
const routes = ['/home', '/about', '/contact'] as const;
type Route = typeof routes[number]; // '/home' | '/about' | '/contact'
```

### 📖 Syntaxe Complète TypeScript

#### 1. Types Primitifs et Avancés
```typescript
// Types primitifs
let name: string = 'John';
let age: number = 30;
let isActive: boolean = true;
let data: null = null;
let value: undefined = undefined;
let id: symbol = Symbol('id');

// Types littéraux
let status: 'pending' | 'approved' | 'rejected' = 'pending';
let count: 1 | 2 | 3 | 4 | 5 = 1;

// Types d'union
let id: string | number = '123';
id = 123;

// Types d'intersection
interface User {
  name: string;
  age: number;
}

interface Admin {
  permissions: string[];
}

type AdminUser = User & Admin;

// Types optionnels
interface Config {
  apiUrl: string;
  timeout?: number;
  retries?: number;
}

// Types readonly
interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
  age: number;
}

// Types génériques
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Types conditionnels
type NonNullable<T> = T extends null | undefined ? never : T;
type IsArray<T> = T extends any[] ? true : false;

// Types mappés
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Types de template literal
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // 'onClick'

// Types d'index
interface StringArray {
  [index: number]: string;
}

interface Dictionary {
  [key: string]: any;
}

// Types de fonction
type Handler = (event: Event) => void;
type AsyncHandler = (event: Event) => Promise<void>;

// Types de constructeur
type Constructor<T = {}> = new (...args: any[]) => T;

// Types de classe
class User {
  constructor(public name: string, public age: number) {}
}

type UserConstructor = typeof User;
type UserInstance = InstanceType<typeof User>;
```

#### 2. Interfaces et Classes
```typescript
// Interface de base
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  readonly createdAt: Date;
}

// Interface avec méthodes
interface UserService {
  create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  findById(id: number): Promise<User | null>;
  update(id: number, updates: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}

// Interface générique
interface Repository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: number, updates: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

// Interface avec index signature
interface Config {
  [key: string]: any;
  apiUrl: string;
  timeout: number;
}

// Interface avec call signature
interface SearchFunction {
  (source: string, subString: string): boolean;
}

// Interface avec construct signature
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

// Classe avec implémentation d'interface
class UserRepository implements Repository<User> {
  private users: User[] = [];

  async findById(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user: User = {
      ...userData,
      id: Date.now(),
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  async update(id: number, updates: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }

  async delete(id: number): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users.splice(userIndex, 1);
  }
}

// Classe abstraite
abstract class BaseService<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  abstract validate(entity: T): boolean;

  async create(entity: Omit<T, 'id'>): Promise<T> {
    if (!this.validate(entity as T)) {
      throw new Error('Validation failed');
    }
    return this.repository.create(entity);
  }
}

// Classe concrète
class UserService extends BaseService<User> {
  validate(user: User): boolean {
    return !!(user.name && user.email);
  }
}
```

#### 3. Types Avancés et Utilitaires
```typescript
// Utility types
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;
type NonNullable<T> = T extends null | undefined ? never : T;

// Types conditionnels
type IsArray<T> = T extends any[] ? true : false;
type IsString<T> = T extends string ? true : false;
type IsNumber<T> = T extends number ? true : false;

// Types de fonction
type FunctionType = (...args: any[]) => any;
type AsyncFunctionType = (...args: any[]) => Promise<any>;

// Types de paramètres
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// Types de constructeur
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

// Types de template literal
type Capitalize<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S;
type Uncapitalize<S extends string> = S extends `${infer F}${infer R}` ? `${Lowercase<F>}${R}` : S;
type Uppercase<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${Uppercase<R>}` : S;
type Lowercase<S extends string> = S extends `${infer F}${infer R}` ? `${Lowercase<F>}${Lowercase<R>}` : S;

// Types de mapped
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// Types de branded
type Brand<T, B> = T & { readonly __brand: B };
type UserId = Brand<number, 'UserId'>;
type ProductId = Brand<number, 'ProductId'>;

// Types de nominal
type Nominal<T, B> = T & { readonly __nominal: B };
type Email = Nominal<string, 'Email'>;
type Password = Nominal<string, 'Password'>;
```

## 📋 Tableaux de Référence Complète TypeScript

### 🎯 Types Primitifs

| Type | Description | Exemple | Valeurs |
|------|-------------|---------|---------|
| **string** | Chaîne de caractères | `let name: string = 'John'` | `'hello'`, `"world"`, `` `template` `` |
| **number** | Nombre | `let age: number = 30` | `42`, `3.14`, `0xFF`, `0b1010` |
| **boolean** | Booléen | `let isActive: boolean = true` | `true`, `false` |
| **null** | Valeur nulle | `let data: null = null` | `null` |
| **undefined** | Valeur non définie | `let value: undefined = undefined` | `undefined` |
| **void** | Absence de valeur | `function log(): void {}` | `undefined` |
| **never** | Jamais de valeur | `function error(): never { throw new Error() }` | Aucune |
| **any** | N'importe quel type | `let anything: any = 42` | Toute valeur |
| **unknown** | Type inconnu | `let userInput: unknown = getUserInput()` | Toute valeur |

### 🎯 Types Littéraux

| Type | Description | Exemple | Valeurs possibles |
|------|-------------|---------|-------------------|
| **String Literal** | Chaîne littérale | `let status: 'pending' = 'pending'` | `'pending'` uniquement |
| **Number Literal** | Nombre littéral | `let count: 42 = 42` | `42` uniquement |
| **Boolean Literal** | Booléen littéral | `let flag: true = true` | `true` ou `false` uniquement |
| **Template Literal** | Template littéral | `type Event = \`on\${string}\`` | `'onclick'`, `'onload'`, etc. |

### 🎯 Types d'Union et d'Intersection

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Union** | `A \| B` | A ou B | `let id: string \| number = '123'` |
| **Intersection** | `A & B` | A et B | `type User = Person & Admin` |
| **Discriminated Union** | `A \| B` avec discriminant | Union avec champ discriminant | `type Shape = Circle \| Rectangle` |

### 🎯 Types de Tableau

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Array** | `T[]` | Tableau de T | `let numbers: number[] = [1, 2, 3]` |
| **Array Generic** | `Array<T>` | Tableau générique | `let names: Array<string> = ['a', 'b']` |
| **ReadonlyArray** | `ReadonlyArray<T>` | Tableau en lecture seule | `let ro: ReadonlyArray<number> = [1, 2, 3]` |
| **Tuple** | `[T, U, V]` | Tuple typé | `let tuple: [string, number] = ['hello', 42]` |
| **ReadonlyTuple** | `readonly [T, U]` | Tuple en lecture seule | `let roTuple: readonly [string, number]` |

### 🎯 Types d'Objet

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Object** | `object` | Objet non primitif | `let obj: object = {}` |
| **Object Literal** | `{ prop: type }` | Objet littéral | `let user: { name: string; age: number }` |
| **Index Signature** | `{ [key: string]: type }` | Signature d'index | `let dict: { [key: string]: any }` |
| **Mapped Type** | `{ [K in keyof T]: U }` | Type mappé | `type Partial<T> = { [K in keyof T]?: T[K] }` |

### 🎯 Types de Fonction

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Function** | `(param: type) => returnType` | Fonction | `let fn: (x: number) => string` |
| **Function Type** | `Function` | Type fonction | `let fn: Function = () => {}` |
| **Constructor** | `new (param: type) => type` | Constructeur | `let Ctor: new (x: number) => MyClass` |
| **Call Signature** | `{ (param: type): returnType }` | Signature d'appel | `let callable: { (x: number): string }` |

### 🎯 Types Génériques

| Concept | Syntaxe | Description | Exemple |
|---------|---------|-------------|---------|
| **Generic Function** | `<T>(param: T) => T` | Fonction générique | `function identity<T>(x: T): T` |
| **Generic Interface** | `interface I<T> { prop: T }` | Interface générique | `interface Box<T> { value: T }` |
| **Generic Class** | `class C<T> { prop: T }` | Classe générique | `class Container<T> { item: T }` |
| **Generic Constraint** | `<T extends U>` | Contrainte générique | `function log<T extends { name: string }>(obj: T)` |
| **Default Generic** | `<T = string>` | Valeur par défaut | `interface Api<T = any> { data: T }` |

### 🎯 Types Conditionnels

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Conditional** | `T extends U ? X : Y` | Type conditionnel | `type IsArray<T> = T extends any[] ? true : false` |
| **Infer** | `infer U` | Inférence de type | `type ReturnType<T> = T extends (...args: any) => infer R ? R : any` |
| **Distributive** | `T extends U ? T : never` | Conditionnel distributif | `type NonNullable<T> = T extends null \| undefined ? never : T` |

### 🎯 Types Utilitaires

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Partial** | `Partial<T>` | Tous les champs optionnels | `Partial<User>` |
| **Required** | `Required<T>` | Tous les champs requis | `Required<Partial<User>>` |
| **Readonly** | `Readonly<T>` | Tous les champs en lecture seule | `Readonly<User>` |
| **Pick** | `Pick<T, K>` | Sélectionner des clés | `Pick<User, 'name' \| 'email'>` |
| **Omit** | `Omit<T, K>` | Exclure des clés | `Omit<User, 'id'>` |
| **Record** | `Record<K, V>` | Objet avec clés K et valeurs V | `Record<string, number>` |
| **Exclude** | `Exclude<T, U>` | Exclure U de T | `Exclude<'a' \| 'b' \| 'c', 'a'>` |
| **Extract** | `Extract<T, U>` | Extraire U de T | `Extract<'a' \| 'b' \| 'c', 'a' \| 'b'>` |
| **NonNullable** | `NonNullable<T>` | Exclure null et undefined | `NonNullable<string \| null>` |

### 🎯 Types de Template Literal

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Capitalize** | `Capitalize<S>` | Première lettre en majuscule | `Capitalize<'hello'>` → `'Hello'` |
| **Uncapitalize** | `Uncapitalize<S>` | Première lettre en minuscule | `Uncapitalize<'Hello'>` → `'hello'` |
| **Uppercase** | `Uppercase<S>` | Tout en majuscules | `Uppercase<'hello'>` → `'HELLO'` |
| **Lowercase** | `Lowercase<S>` | Tout en minuscules | `Lowercase<'HELLO'>` → `'hello'` |

### 🎯 Types Avancés

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Branded** | `T & { __brand: B }` | Type marqué | `type UserId = number & { __brand: 'UserId' }` |
| **Nominal** | `T & { __nominal: B }` | Type nominal | `type Email = string & { __nominal: 'Email' }` |
| **Flavor** | `T & { __flavor: B }` | Type aromatisé | `type Timestamp = number & { __flavor: 'Timestamp' }` |
| **Opaque** | `T & { readonly __opaque: unique symbol }` | Type opaque | `type Opaque<T, B> = T & { readonly __opaque: B }` |

### 🎯 Modificateurs d'Accès

| Modificateur | Description | Exemple |
|--------------|-------------|---------|
| **public** | Accès public (défaut) | `public name: string` |
| **private** | Accès privé | `private secret: string` |
| **protected** | Accès protégé | `protected value: number` |
| **readonly** | Lecture seule | `readonly id: number` |
| **static** | Statique | `static count: number` |
| **abstract** | Abstrait | `abstract method(): void` |

### 🎯 Modificateurs de Propriété

| Modificateur | Description | Exemple |
|--------------|-------------|---------|
| **?** | Optionnel | `name?: string` |
| **!** | Assertion de non-null | `name!: string` |
| **readonly** | Lecture seule | `readonly id: number` |
| **override** | Surcharge | `override method(): void` |

### 🎯 Modificateurs de Classe

| Modificateur | Description | Exemple |
|--------------|-------------|---------|
| **abstract** | Classe abstraite | `abstract class Shape` |
| **sealed** | Classe scellée | `sealed class Final` |
| **final** | Classe finale | `final class Immutable` |

### 🎯 Modificateurs de Méthode

| Modificateur | Description | Exemple |
|--------------|-------------|---------|
| **async** | Asynchrone | `async fetch(): Promise<Data>` |
| **generator** | Générateur | `*generate(): Generator<number>` |
| **async generator** | Générateur asynchrone | `async *asyncGenerate(): AsyncGenerator<number>` |
| **override** | Surcharge | `override method(): void` |
| **abstract** | Abstraite | `abstract method(): void` |

### 🎯 Types de Module

| Concept | Syntaxe | Description | Exemple |
|---------|---------|-------------|---------|
| **Import** | `import { name } from 'module'` | Import nommé | `import { User } from './user'` |
| **Import Default** | `import name from 'module'` | Import par défaut | `import React from 'react'` |
| **Import All** | `import * as name from 'module'` | Import de tout | `import * as utils from './utils'` |
| **Import Type** | `import type { T } from 'module'` | Import de type | `import type { User } from './user'` |
| **Export** | `export { name }` | Export nommé | `export { User, Admin }` |
| **Export Default** | `export default name` | Export par défaut | `export default class User` |
| **Re-export** | `export { name } from 'module'` | Ré-export | `export { User } from './user'` |

### 🎯 Types de Namespace

| Concept | Syntaxe | Description | Exemple |
|---------|---------|-------------|---------|
| **Namespace** | `namespace Name { }` | Namespace | `namespace Utils { }` |
| **Nested Namespace** | `namespace A.B { }` | Namespace imbriqué | `namespace MyApp.Utils { }` |
| **Namespace Merge** | `namespace A { } namespace A { }` | Fusion de namespace | `namespace Global { }` |
| **Ambient Namespace** | `declare namespace` | Namespace ambiant | `declare namespace NodeJS { }` |

### 🎯 Types de Décorateur

| Décorateur | Syntaxe | Description | Exemple |
|------------|---------|-------------|---------|
| **Class Decorator** | `@decorator class C { }` | Décorateur de classe | `@Component class MyComponent { }` |
| **Method Decorator** | `@decorator method() { }` | Décorateur de méthode | `@Log method() { }` |
| **Property Decorator** | `@decorator prop: type` | Décorateur de propriété | `@Required name: string` |
| **Parameter Decorator** | `method(@decorator param: type)` | Décorateur de paramètre | `method(@Validate id: number)` |

### 🎯 Types de Mapped

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Basic Mapped** | `{ [K in keyof T]: T[K] }` | Mappage de base | `{ [K in keyof User]: User[K] }` |
| **Key Remapping** | `{ [K in keyof T as NewKey]: T[K] }` | Remappage de clés | `{ [K in keyof T as \`get\${K}\`]: () => T[K] }` |
| **Conditional Mapped** | `{ [K in keyof T]: T[K] extends U ? X : Y }` | Mappage conditionnel | `{ [K in keyof T]: T[K] extends string ? T[K] : never }` |
| **Filtered Mapped** | `{ [K in keyof T as T[K] extends U ? K : never]: T[K] }` | Mappage filtré | `{ [K in keyof T as T[K] extends string ? K : never]: T[K] }` |

### 🎯 Types de Recursive

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Recursive Type** | `type T = T[]` | Type récursif | `type Tree = { value: number; children: Tree[] }` |
| **Recursive Interface** | `interface I { prop: I }` | Interface récursive | `interface Node { children: Node[] }` |
| **Recursive Generic** | `type T<U> = U extends infer V ? T<V> : never` | Générique récursif | `type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }` |

### 📚 Ressources

### Documentation officielle
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript Config](https://www.typescriptlang.org/tsconfig)

### Outils recommandés
- [Zod](https://zod.dev/) - Validation de schémas
- [ts-node](https://typestrong.org/ts-node/) - Exécution TypeScript
- [tsx](https://github.com/esbuild-kit/tsx) - Alternative rapide à ts-node

### Patterns et bonnes pratiques
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Effective TypeScript](https://effectivetypescript.com/)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)

---

*Dernière mise à jour : Janvier 2024*
