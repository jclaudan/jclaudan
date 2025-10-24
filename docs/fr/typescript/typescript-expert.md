# TypeScript Expert - Guide Avancé

## 1. Compiler API et Transformers

### Utilisation du Compiler API

```typescript
// compiler-api-example.ts
import * as ts from 'typescript'

// Créer un programme TypeScript
const program = ts.createProgram(['src/**/*.ts'], {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.CommonJS,
  strict: true
})

// Analyser les fichiers
const sourceFiles = program.getSourceFiles()
const checker = program.getTypeChecker()

// Parcourir les déclarations
sourceFiles.forEach(sourceFile => {
  if (sourceFile.isDeclarationFile) return
  
  ts.forEachChild(sourceFile, node => {
    if (ts.isFunctionDeclaration(node) && node.name) {
      const symbol = checker.getSymbolAtLocation(node.name)
      if (symbol) {
        const type = checker.getTypeOfSymbolAtLocation(symbol, node.name)
        console.log(`Function: ${node.name.text}, Type: ${checker.typeToString(type)}`)
      }
    }
  })
})
```

### Création de Transformers

```typescript
// transformer-example.ts
import * as ts from 'typescript'

// Transformer pour ajouter des logs
function addLoggingTransformer(context: ts.TransformationContext): ts.Transformer<ts.SourceFile> {
  return (sourceFile: ts.SourceFile) => {
    function visit(node: ts.Node): ts.Node {
      if (ts.isFunctionDeclaration(node)) {
        // Ajouter un log au début de la fonction
        const logStatement = ts.createStatement(
          ts.createCall(
            ts.createPropertyAccess(ts.createIdentifier('console'), 'log'),
            undefined,
            [ts.createStringLiteral(`Calling function: ${node.name?.text || 'anonymous'}`)]
          )
        )
        
        const newBody = node.body ? ts.createBlock([
          logStatement,
          ...node.body.statements
        ]) : undefined
        
        return ts.updateFunctionDeclaration(
          node,
          node.decorators,
          node.modifiers,
          node.asteriskToken,
          node.name,
          node.typeParameters,
          node.parameters,
          node.type,
          newBody
        )
      }
      
      return ts.visitEachChild(node, visit, context)
    }
    
    return ts.visitNode(sourceFile, visit)
  }
}

// Utiliser le transformer
const result = ts.transform(sourceFile, [addLoggingTransformer])
```

## 2. Types Avancés et Utilitaires

### Types Conditionnels Complexes

```typescript
// Types conditionnels avancés
type NonNullable<T> = T extends null | undefined ? never : T

type Flatten<T> = T extends (infer U)[] ? U : T

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T]

// Exemple d'utilisation
interface User {
  id: number
  name: string
  email?: string
  address?: {
    street: string
    city: string
  }
}

type RequiredUserFields = RequiredKeys<User> // "id" | "name"
type OptionalUserFields = OptionalKeys<User> // "email" | "address"
```

### Types de Mappage Avancés

```typescript
// Mappage avec transformation
type StringToNumber<T> = {
  [K in keyof T]: T[K] extends string ? number : T[K]
}

type CapitalizeKeys<T> = {
  [K in keyof T as Capitalize<string & K>]: T[K]
}

type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}

type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

// Exemple d'utilisation
interface Config {
  port: string
  host: string
  timeout: number
  retries: number
}

type NumericConfig = PickByType<Config, number> // { timeout: number; retries: number }
type StringConfig = PickByType<Config, string> // { port: string; host: string }
```

### Types de Fonction Avancés

```typescript
// Types de fonction avec contraintes
type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>

type EventHandler<T = any> = (event: T) => void | Promise<void>

type Validator<T> = (value: unknown) => value is T

type Transformer<T, R> = (input: T) => R

// Types de fonction avec surcharge
type OverloadedFunction = {
  (x: string): string
  (x: number): number
  (x: boolean): boolean
}

// Types de fonction avec génériques
type GenericFunction<T> = <U extends T>(value: U) => U

// Exemple d'utilisation
const processValue: GenericFunction<string | number> = <U extends string | number>(value: U): U => {
  return value
}
```

## 3. Décorateurs et Métadonnées

### Décorateurs Personnalisés

```typescript
// Décorateur de validation
function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  
  descriptor.value = function (...args: any[]) {
    // Validation des arguments
    const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey)
    
    for (let i = 0; i < args.length; i++) {
      const expectedType = paramTypes[i]
      const actualType = typeof args[i]
      
      if (expectedType.name.toLowerCase() !== actualType) {
        throw new Error(`Invalid argument type at position ${i}`)
      }
    }
    
    return originalMethod.apply(this, args)
  }
}

// Décorateur de cache
function Cache(ttl: number = 60000) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const cache = new Map()
    
    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args)
      const cached = cache.get(key)
      
      if (cached && Date.now() - cached.timestamp < ttl) {
        return cached.value
      }
      
      const result = originalMethod.apply(this, args)
      cache.set(key, {
        value: result,
        timestamp: Date.now()
      })
      
      return result
    }
  }
}

// Utilisation
class UserService {
  @Validate
  @Cache(30000)
  async getUser(id: number): Promise<User> {
    // Implémentation
  }
}
```

### Métadonnées et Réflexion

```typescript
// Configuration des métadonnées
import 'reflect-metadata'

// Décorateur pour enregistrer les métadonnées
function Injectable(target: any) {
  Reflect.defineMetadata('injectable', true, target)
}

function Inject(token: string) {
  return function (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {
    const existingTokens = Reflect.getMetadata('inject-tokens', target) || []
    existingTokens[parameterIndex] = token
    Reflect.defineMetadata('inject-tokens', existingTokens, target)
  }
}

// Container d'injection de dépendances
class DIContainer {
  private services = new Map<string, any>()
  
  register<T>(token: string, implementation: new (...args: any[]) => T) {
    this.services.set(token, implementation)
  }
  
  resolve<T>(token: string): T {
    const implementation = this.services.get(token)
    if (!implementation) {
      throw new Error(`Service ${token} not found`)
    }
    
    const paramTypes = Reflect.getMetadata('design:paramtypes', implementation) || []
    const injectTokens = Reflect.getMetadata('inject-tokens', implementation) || []
    
    const args = paramTypes.map((paramType: any, index: number) => {
      const injectToken = injectTokens[index]
      if (injectToken) {
        return this.resolve(injectToken)
      }
      return new paramType()
    })
    
    return new implementation(...args)
  }
}

// Utilisation
@Injectable
class DatabaseService {
  connect() {
    console.log('Connected to database')
  }
}

@Injectable
class UserService {
  constructor(@Inject('DatabaseService') private db: DatabaseService) {}
  
  getUsers() {
    this.db.connect()
    return ['user1', 'user2']
  }
}

// Configuration du container
const container = new DIContainer()
container.register('DatabaseService', DatabaseService)
container.register('UserService', UserService)

const userService = container.resolve<UserService>('UserService')
```

## 4. Types de Module et Import/Export

### Types de Module Avancés

```typescript
// Module avec types génériques
export interface Repository<T, K = string> {
  findById(id: K): Promise<T | null>
  save(entity: T): Promise<T>
  delete(id: K): Promise<void>
  findAll(): Promise<T[]>
}

// Module avec types conditionnels
export type ModuleConfig<T extends string> = T extends 'development'
  ? { debug: true; logLevel: 'debug' }
  : T extends 'production'
  ? { debug: false; logLevel: 'error' }
  : { debug: boolean; logLevel: 'info' }

// Module avec types de fonction
export type EventEmitter<T extends Record<string, any>> = {
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void
  emit<K extends keyof T>(event: K, data: T[K]): void
  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void
}

// Module avec types de validation
export type ValidatedModule<T> = {
  validate: (data: unknown) => data is T
  create: (data: T) => T
  update: (id: string, data: Partial<T>) => Promise<T>
}
```

### Import/Export Dynamiques

```typescript
// Import dynamique avec types
type ModuleLoader<T> = () => Promise<{ default: T }>

async function loadModule<T>(loader: ModuleLoader<T>): Promise<T> {
  const module = await loader()
  return module.default
}

// Import conditionnel
type ConditionalImport<T> = T extends 'user'
  ? typeof import('./user-module')
  : T extends 'product'
  ? typeof import('./product-module')
  : never

async function loadConditionalModule<T extends string>(
  type: T
): Promise<ConditionalImport<T>> {
  switch (type) {
    case 'user':
      return import('./user-module')
    case 'product':
      return import('./product-module')
    default:
      throw new Error(`Unknown module type: ${type}`)
  }
}

// Import avec validation de type
async function loadValidatedModule<T>(
  path: string,
  validator: (module: any) => module is T
): Promise<T> {
  const module = await import(path)
  
  if (!validator(module)) {
    throw new Error(`Module ${path} does not match expected type`)
  }
  
  return module
}
```

## 5. Types de Performance et Optimisation

### Types de Performance

```typescript
// Types pour le profiling
type PerformanceEntry = {
  name: string
  startTime: number
  duration: number
  entryType: string
}

type PerformanceObserver = {
  observe: (entryTypes: string[]) => void
  disconnect: () => void
  takeRecords: () => PerformanceEntry[]
}

// Types pour le cache
type CacheEntry<T> = {
  value: T
  timestamp: number
  ttl: number
}

type Cache<T> = {
  get: (key: string) => T | undefined
  set: (key: string, value: T, ttl?: number) => void
  delete: (key: string) => boolean
  clear: () => void
  size: number
}

// Types pour la mémoire
type MemoryInfo = {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

type MemoryMonitor = {
  getMemoryInfo: () => MemoryInfo
  startMonitoring: (interval: number) => void
  stopMonitoring: () => void
}
```

### Types d'Optimisation

```typescript
// Types pour l'optimisation des requêtes
type QueryOptimizer<T> = {
  optimize: (query: T) => T
  explain: (query: T) => string
  profile: (query: T) => PerformanceEntry[]
}

// Types pour l'optimisation des rendus
type RenderOptimizer = {
  shouldUpdate: (oldProps: any, newProps: any) => boolean
  memoize: <T>(fn: () => T) => () => T
  debounce: <T extends (...args: any[]) => any>(fn: T, delay: number) => T
  throttle: <T extends (...args: any[]) => any>(fn: T, delay: number) => T
}

// Types pour l'optimisation des données
type DataOptimizer<T> = {
  compress: (data: T) => string
  decompress: (compressed: string) => T
  serialize: (data: T) => string
  deserialize: (serialized: string) => T
}
```

## 6. Types de Sécurité

### Types de Validation

```typescript
// Types pour la validation de sécurité
type SecurityValidator<T> = {
  validate: (input: unknown) => input is T
  sanitize: (input: T) => T
  encrypt: (input: T) => string
  decrypt: (encrypted: string) => T
}

// Types pour l'authentification
type AuthToken = {
  userId: string
  role: string
  permissions: string[]
  expiresAt: number
  signature: string
}

type AuthValidator = {
  validateToken: (token: string) => AuthToken | null
  generateToken: (user: User) => string
  refreshToken: (token: string) => string
  revokeToken: (token: string) => void
}

// Types pour l'autorisation
type Permission = string
type Role = string

type Authorization = {
  hasPermission: (user: User, permission: Permission) => boolean
  hasRole: (user: User, role: Role) => boolean
  canAccess: (user: User, resource: string) => boolean
}
```

### Types de Chiffrement

```typescript
// Types pour le chiffrement
type EncryptionKey = {
  publicKey: string
  privateKey: string
  algorithm: string
}

type EncryptionService = {
  generateKeyPair: () => EncryptionKey
  encrypt: (data: string, key: string) => string
  decrypt: (encrypted: string, key: string) => string
  sign: (data: string, privateKey: string) => string
  verify: (data: string, signature: string, publicKey: string) => boolean
}

// Types pour le hachage
type HashService = {
  hash: (data: string, salt?: string) => string
  verify: (data: string, hash: string) => boolean
  generateSalt: (length?: number) => string
}
```

## 7. Types de Test et Validation

### Types de Test

```typescript
// Types pour les tests unitaires
type TestCase<T, R> = {
  name: string
  input: T
  expected: R
  actual?: R
  passed?: boolean
}

type TestSuite<T, R> = {
  name: string
  cases: TestCase<T, R>[]
  setup?: () => void
  teardown?: () => void
}

type TestRunner = {
  run: <T, R>(suite: TestSuite<T, R>) => Promise<TestResult>
  runAll: (suites: TestSuite<any, any>[]) => Promise<TestResult[]>
}

// Types pour les tests d'intégration
type IntegrationTest = {
  name: string
  steps: TestStep[]
  expectedResult: any
  timeout?: number
}

type TestStep = {
  action: string
  input: any
  expectedOutput?: any
  wait?: number
}

// Types pour les tests de performance
type PerformanceTest = {
  name: string
  function: () => Promise<any>
  iterations: number
  maxDuration: number
  threshold: number
}
```

### Types de Validation

```typescript
// Types pour la validation de données
type ValidationRule<T> = {
  validate: (value: T) => boolean
  message: string
}

type ValidationSchema<T> = {
  [K in keyof T]: ValidationRule<T[K]>[]
}

type ValidationResult<T> = {
  valid: boolean
  errors: Partial<Record<keyof T, string[]>>
  data?: T
}

type Validator<T> = {
  validate: (data: unknown) => ValidationResult<T>
  validateField: <K extends keyof T>(field: K, value: T[K]) => string[]
  isValid: (data: unknown) => data is T
}
```

## 8. Types d'API et Communication

### Types d'API REST

```typescript
// Types pour les API REST
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type ApiEndpoint<T = any, R = any> = {
  method: HttpMethod
  path: string
  request: T
  response: R
}

type ApiClient = {
  request: <T, R>(endpoint: ApiEndpoint<T, R>, data?: T) => Promise<R>
  get: <R>(path: string) => Promise<R>
  post: <T, R>(path: string, data: T) => Promise<R>
  put: <T, R>(path: string, data: T) => Promise<R>
  delete: <R>(path: string) => Promise<R>
}

// Types pour les API GraphQL
type GraphQLQuery<T = any> = {
  query: string
  variables?: T
}

type GraphQLResponse<T = any> = {
  data?: T
  errors?: GraphQLError[]
}

type GraphQLClient = {
  query: <T>(query: GraphQLQuery) => Promise<GraphQLResponse<T>>
  mutate: <T>(mutation: GraphQLQuery) => Promise<GraphQLResponse<T>>
  subscribe: <T>(subscription: GraphQLQuery) => AsyncIterator<GraphQLResponse<T>>
}
```

### Types de Communication

```typescript
// Types pour WebSocket
type WebSocketMessage<T = any> = {
  type: string
  data: T
  timestamp: number
  id?: string
}

type WebSocketClient = {
  connect: () => Promise<void>
  disconnect: () => void
  send: <T>(message: WebSocketMessage<T>) => void
  on: <T>(type: string, handler: (data: T) => void) => void
  off: <T>(type: string, handler: (data: T) => void) => void
}

// Types pour les événements
type EventEmitter<T extends Record<string, any>> = {
  on: <K extends keyof T>(event: K, handler: (data: T[K]) => void) => void
  off: <K extends keyof T>(event: K, handler: (data: T[K]) => void) => void
  emit: <K extends keyof T>(event: K, data: T[K]) => void
  once: <K extends keyof T>(event: K, handler: (data: T[K]) => void) => void
}
```

## Bonnes Pratiques Expertes

1. **Types Stricts** : Utiliser des types stricts pour éviter les erreurs
2. **Validation Runtime** : Valider les types à l'exécution
3. **Performance** : Optimiser les types pour les performances
4. **Sécurité** : Implémenter des types de sécurité robustes
5. **Tests** : Tester les types et les validations
6. **Documentation** : Documenter les types complexes
7. **Réutilisabilité** : Créer des types réutilisables
8. **Maintenabilité** : Maintenir les types à jour

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
