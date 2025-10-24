# Patterns de Création

## 1. Singleton Pattern

### Description
Assurer qu'une classe n'a qu'une seule instance et fournir un point d'accès global.

### Exemple - TypeScript
```typescript
class DatabaseConnection {
  private static instance: DatabaseConnection
  private connection: string

  private constructor() {
    this.connection = 'Connected to database'
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  public query(sql: string): string {
    return `Executing: ${sql}`
  }
}

// Utilisation
const db1 = DatabaseConnection.getInstance()
const db2 = DatabaseConnection.getInstance()
console.log(db1 === db2) // true
```

### Exemple - JavaScript Moderne
```javascript
class Logger {
  static #instance = null

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new Logger()
    }
    return this.#instance
  }

  log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`)
  }
}

// Utilisation
const logger = Logger.getInstance()
logger.log('Application started')
```

## 2. Factory Pattern

### Description
Créer des objets sans spécifier leur classe exacte.

### Exemple - Simple Factory
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
  static createAnimal(type: string): Animal {
    switch (type) {
      case 'dog':
        return new Dog()
      case 'cat':
        return new Cat()
      default:
        throw new Error(`Unknown animal type: ${type}`)
    }
  }
}

// Utilisation
const dog = AnimalFactory.createAnimal('dog')
const cat = AnimalFactory.createAnimal('cat')
```

## 2.1 Abstract Factory Pattern

### Description
Le pattern Abstract Factory fournit une interface pour créer des familles d'objets liés ou dépendants sans spécifier leurs classes concrètes.

### Exemple - Abstract Factory Complet
```typescript
// Interfaces des produits
interface Button {
  render(): string
  onClick(): void
}

interface Dialog {
  render(): string
  show(): void
}

interface TextField {
  render(): string
  setText(text: string): void
  getText(): string
}

// Implémentations Windows
class WindowsButton implements Button {
  render(): string {
    return 'Windows Button'
  }

  onClick(): void {
    console.log('Windows button clicked')
  }
}

class WindowsDialog implements Dialog {
  render(): string {
    return 'Windows Dialog'
  }

  show(): void {
    console.log('Showing Windows dialog')
  }
}

class WindowsTextField implements TextField {
  private text: string = ''

  render(): string {
    return 'Windows TextField'
  }

  setText(text: string): void {
    this.text = text
  }

  getText(): string {
    return this.text
  }
}

// Implémentations Mac
class MacButton implements Button {
  render(): string {
    return 'Mac Button'
  }

  onClick(): void {
    console.log('Mac button clicked')
  }
}

class MacDialog implements Dialog {
  render(): string {
    return 'Mac Dialog'
  }

  show(): void {
    console.log('Showing Mac dialog')
  }
}

class MacTextField implements TextField {
  private text: string = ''

  render(): string {
    return 'Mac TextField'
  }

  setText(text: string): void {
    this.text = text
  }

  getText(): string {
    return this.text
  }
}

// Implémentations Linux
class LinuxButton implements Button {
  render(): string {
    return 'Linux Button'
  }

  onClick(): void {
    console.log('Linux button clicked')
  }
}

class LinuxDialog implements Dialog {
  render(): string {
    return 'Linux Dialog'
  }

  show(): void {
    console.log('Showing Linux dialog')
  }
}

class LinuxTextField implements TextField {
  private text: string = ''

  render(): string {
    return 'Linux TextField'
  }

  setText(text: string): void {
    this.text = text
  }

  getText(): string {
    return this.text
  }
}

// Factory abstraite
interface UIFactory {
  createButton(): Button
  createDialog(): Dialog
  createTextField(): TextField
}

// Factories concrètes
class WindowsUIFactory implements UIFactory {
  createButton(): Button {
    return new WindowsButton()
  }

  createDialog(): Dialog {
    return new WindowsDialog()
  }

  createTextField(): TextField {
    return new WindowsTextField()
  }
}

class MacUIFactory implements UIFactory {
  createButton(): Button {
    return new MacButton()
  }

  createDialog(): Dialog {
    return new MacDialog()
  }

  createTextField(): TextField {
    return new MacTextField()
  }
}

class LinuxUIFactory implements UIFactory {
  createButton(): Button {
    return new LinuxButton()
  }

  createDialog(): Dialog {
    return new LinuxDialog()
  }

  createTextField(): TextField {
    return new LinuxTextField()
  }
}

// Factory de factories
class UIFactoryProvider {
  static getFactory(platform: 'windows' | 'mac' | 'linux'): UIFactory {
    switch (platform) {
      case 'windows':
        return new WindowsUIFactory()
      case 'mac':
        return new MacUIFactory()
      case 'linux':
        return new LinuxUIFactory()
      default:
        throw new Error(`Unsupported platform: ${platform}`)
    }
  }
}

// Application utilisant l'Abstract Factory
class Application {
  private factory: UIFactory
  private components: { button: Button; dialog: Dialog; textField: TextField }

  constructor(platform: 'windows' | 'mac' | 'linux') {
    this.factory = UIFactoryProvider.getFactory(platform)
    this.createComponents()
  }

  private createComponents(): void {
    this.components = {
      button: this.factory.createButton(),
      dialog: this.factory.createDialog(),
      textField: this.factory.createTextField()
    }
  }

  render(): void {
    console.log('Rendering application:')
    console.log(this.components.button.render())
    console.log(this.components.dialog.render())
    console.log(this.components.textField.render())
  }

  interact(): void {
    this.components.button.onClick()
    this.components.dialog.show()
    this.components.textField.setText('Hello World')
    console.log(`Text: ${this.components.textField.getText()}`)
  }
}

// Utilisation
const windowsApp = new Application('windows')
windowsApp.render()
windowsApp.interact()

const macApp = new Application('mac')
macApp.render()
macApp.interact()
```

### Exemple - Abstract Factory pour Base de Données
```typescript
// Interfaces des produits
interface Connection {
  connect(): void
  disconnect(): void
  query(sql: string): any[]
}

interface Transaction {
  begin(): void
  commit(): void
  rollback(): void
}

interface QueryBuilder {
  select(fields: string[]): QueryBuilder
  from(table: string): QueryBuilder
  where(condition: string): QueryBuilder
  build(): string
}

// Implémentations PostgreSQL
class PostgreSQLConnection implements Connection {
  connect(): void {
    console.log('Connecting to PostgreSQL')
  }

  disconnect(): void {
    console.log('Disconnecting from PostgreSQL')
  }

  query(sql: string): any[] {
    console.log(`Executing PostgreSQL query: ${sql}`)
    return [{ id: 1, name: 'John' }]
  }
}

class PostgreSQLTransaction implements Transaction {
  begin(): void {
    console.log('Starting PostgreSQL transaction')
  }

  commit(): void {
    console.log('Committing PostgreSQL transaction')
  }

  rollback(): void {
    console.log('Rolling back PostgreSQL transaction')
  }
}

class PostgreSQLQueryBuilder implements QueryBuilder {
  private query: string = ''

  select(fields: string[]): QueryBuilder {
    this.query = `SELECT ${fields.join(', ')}`
    return this
  }

  from(table: string): QueryBuilder {
    this.query += ` FROM ${table}`
    return this
  }

  where(condition: string): QueryBuilder {
    this.query += ` WHERE ${condition}`
    return this
  }

  build(): string {
    return this.query
  }
}

// Implémentations MySQL
class MySQLConnection implements Connection {
  connect(): void {
    console.log('Connecting to MySQL')
  }

  disconnect(): void {
    console.log('Disconnecting from MySQL')
  }

  query(sql: string): any[] {
    console.log(`Executing MySQL query: ${sql}`)
    return [{ id: 1, name: 'Jane' }]
  }
}

class MySQLTransaction implements Transaction {
  begin(): void {
    console.log('Starting MySQL transaction')
  }

  commit(): void {
    console.log('Committing MySQL transaction')
  }

  rollback(): void {
    console.log('Rolling back MySQL transaction')
  }
}

class MySQLQueryBuilder implements QueryBuilder {
  private query: string = ''

  select(fields: string[]): QueryBuilder {
    this.query = `SELECT ${fields.join(', ')}`
    return this
  }

  from(table: string): QueryBuilder {
    this.query += ` FROM ${table}`
    return this
  }

  where(condition: string): QueryBuilder {
    this.query += ` WHERE ${condition}`
    return this
  }

  build(): string {
    return this.query
  }
}

// Factory abstraite
interface DatabaseFactory {
  createConnection(): Connection
  createTransaction(): Transaction
  createQueryBuilder(): QueryBuilder
}

// Factories concrètes
class PostgreSQLFactory implements DatabaseFactory {
  createConnection(): Connection {
    return new PostgreSQLConnection()
  }

  createTransaction(): Transaction {
    return new PostgreSQLTransaction()
  }

  createQueryBuilder(): QueryBuilder {
    return new PostgreSQLQueryBuilder()
  }
}

class MySQLFactory implements DatabaseFactory {
  createConnection(): Connection {
    return new MySQLConnection()
  }

  createTransaction(): Transaction {
    return new MySQLTransaction()
  }

  createQueryBuilder(): QueryBuilder {
    return new MySQLQueryBuilder()
  }
}

// Utilisation
class DatabaseService {
  private factory: DatabaseFactory
  private connection: Connection
  private transaction: Transaction
  private queryBuilder: QueryBuilder

  constructor(databaseType: 'postgresql' | 'mysql') {
    this.factory = databaseType === 'postgresql' 
      ? new PostgreSQLFactory() 
      : new MySQLFactory()
    
    this.connection = this.factory.createConnection()
    this.transaction = this.factory.createTransaction()
    this.queryBuilder = this.factory.createQueryBuilder()
  }

  async executeQuery(): Promise<any[]> {
    this.connection.connect()
    this.transaction.begin()

    try {
      const query = this.queryBuilder
        .select(['id', 'name'])
        .from('users')
        .where('active = true')
        .build()

      const result = this.connection.query(query)
      this.transaction.commit()
      return result
    } catch (error) {
      this.transaction.rollback()
      throw error
    } finally {
      this.connection.disconnect()
    }
  }
}
```

## 3. Builder Pattern

### Description
Construire des objets complexes étape par étape.

### Exemple - TypeScript
```typescript
class Pizza {
  private dough: string = ''
  private sauce: string = ''
  private toppings: string[] = []

  setDough(dough: string): Pizza {
    this.dough = dough
    return this
  }

  setSauce(sauce: string): Pizza {
    this.sauce = sauce
    return this
  }

  addTopping(topping: string): Pizza {
    this.toppings.push(topping)
    return this
  }

  build(): string {
    return `Pizza with ${this.dough} dough, ${this.sauce} sauce, and toppings: ${this.toppings.join(', ')}`
  }
}

// Utilisation
const pizza = new Pizza()
  .setDough('thin')
  .setSauce('tomato')
  .addTopping('cheese')
  .addTopping('pepperoni')
  .build()
```

### Exemple - Director Pattern
```typescript
class Car {
  private brand: string = ''
  private model: string = ''
  private engine: string = ''
  private wheels: number = 4

  setBrand(brand: string): Car {
    this.brand = brand
    return this
  }

  setModel(model: string): Car {
    this.model = model
    return this
  }

  setEngine(engine: string): Car {
    this.engine = engine
    return this
  }

  setWheels(wheels: number): Car {
    this.wheels = wheels
    return this
  }

  build(): string {
    return `${this.brand} ${this.model} with ${this.engine} engine and ${this.wheels} wheels`
  }
}

class CarBuilder {
  private car: Car

  constructor() {
    this.car = new Car()
  }

  buildSportsCar(): Car {
    return this.car
      .setBrand('Ferrari')
      .setModel('488 GTB')
      .setEngine('V8 Twin Turbo')
      .setWheels(4)
  }

  buildSUV(): Car {
    return this.car
      .setBrand('Toyota')
      .setModel('RAV4')
      .setEngine('2.5L Hybrid')
      .setWheels(4)
  }
}
```

## 4. Prototype Pattern

### Description
Créer des objets en clonant une instance existante.

### Exemple - TypeScript
```typescript
interface Cloneable {
  clone(): Cloneable
}

class Shape implements Cloneable {
  protected x: number
  protected y: number
  protected color: string

  constructor(x: number, y: number, color: string) {
    this.x = x
    this.y = y
    this.color = color
  }

  clone(): Shape {
    return new Shape(this.x, this.y, this.color)
  }

  move(x: number, y: number): void {
    this.x = x
    this.y = y
  }

  draw(): string {
    return `Drawing shape at (${this.x}, ${this.y}) with color ${this.color}`
  }
}

class Circle extends Shape {
  private radius: number

  constructor(x: number, y: number, color: string, radius: number) {
    super(x, y, color)
    this.radius = radius
  }

  clone(): Circle {
    return new Circle(this.x, this.y, this.color, this.radius)
  }

  draw(): string {
    return `Drawing circle at (${this.x}, ${this.y}) with radius ${this.radius} and color ${this.color}`
  }
}

// Utilisation
const originalCircle = new Circle(10, 20, 'red', 5)
const clonedCircle = originalCircle.clone()
clonedCircle.move(30, 40)
```

## 5. Object Pool Pattern

### Description
Réutiliser des objets coûteux au lieu de les créer/détruire.

### Exemple - TypeScript
```typescript
class Connection {
  private id: string
  private isActive: boolean = false

  constructor(id: string) {
    this.id = id
  }

  connect(): void {
    this.isActive = true
    console.log(`Connection ${this.id} established`)
  }

  disconnect(): void {
    this.isActive = false
    console.log(`Connection ${this.id} closed`)
  }

  isConnected(): boolean {
    return this.isActive
  }
}

class ConnectionPool {
  private available: Connection[] = []
  private inUse: Connection[] = []
  private maxSize: number

  constructor(maxSize: number = 10) {
    this.maxSize = maxSize
  }

  getConnection(): Connection | null {
    if (this.available.length > 0) {
      const connection = this.available.pop()!
      this.inUse.push(connection)
      return connection
    }

    if (this.inUse.length < this.maxSize) {
      const connection = new Connection(`conn-${Date.now()}`)
      this.inUse.push(connection)
      return connection
    }

    return null
  }

  releaseConnection(connection: Connection): void {
    const index = this.inUse.indexOf(connection)
    if (index > -1) {
      this.inUse.splice(index, 1)
      connection.disconnect()
      this.available.push(connection)
    }
  }
}
```

## 6. Variadic Functions Pattern

### Description
Le pattern Variadic Functions permet de créer des fonctions qui acceptent un nombre variable d'arguments, offrant une flexibilité dans l'appel des fonctions.

### Exemple - TypeScript
```typescript
// Fonction variadique basique
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0)
}

// Utilisation
console.log(sum(1, 2, 3)) // 6
console.log(sum(1, 2, 3, 4, 5)) // 15
console.log(sum()) // 0

// Fonction variadique avec types mixtes
function formatMessage(template: string, ...values: any[]): string {
  return template.replace(/{(\d+)}/g, (match, index) => {
    return values[parseInt(index)] || match
  })
}

// Utilisation
const message = formatMessage('Hello {0}, you have {1} messages', 'John', 5)
console.log(message) // "Hello John, you have 5 messages"

// Fonction variadique avec contraintes
function createUser(name: string, ...roles: string[]): { name: string; roles: string[] } {
  return {
    name,
    roles: roles.length > 0 ? roles : ['user'] // Rôle par défaut
  }
}

// Utilisation
const user1 = createUser('Alice')
const user2 = createUser('Bob', 'admin', 'moderator')
console.log(user1) // { name: 'Alice', roles: ['user'] }
console.log(user2) // { name: 'Bob', roles: ['admin', 'moderator'] }
```

### Exemple - Fonctions Variadiques Avancées
```typescript
// Fonction variadique avec génériques
function merge<T>(...objects: Partial<T>[]): T {
  return Object.assign({}, ...objects) as T
}

interface User {
  id: number
  name: string
  email: string
  age?: number
}

// Utilisation
const user = merge<User>(
  { id: 1, name: 'John' },
  { email: 'john@example.com' },
  { age: 30 }
)
console.log(user) // { id: 1, name: 'John', email: 'john@example.com', age: 30 }

// Fonction variadique avec validation
function validateAndProcess<T>(
  validator: (value: T) => boolean,
  processor: (value: T) => any,
  ...values: T[]
): any[] {
  return values
    .filter(validator)
    .map(processor)
}

// Utilisation
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const evenSquares = validateAndProcess(
  (n: number) => n % 2 === 0,
  (n: number) => n * n,
  ...numbers
)
console.log(evenSquares) // [4, 16, 36, 64, 100]

// Fonction variadique avec curry
function curryVariadic<T extends any[], R>(
  fn: (...args: T) => R
): (...args: T) => R {
  return (...args: T) => fn(...args)
}

// Utilisation
const add = curryVariadic((...numbers: number[]) => 
  numbers.reduce((sum, num) => sum + num, 0)
)

console.log(add(1, 2, 3, 4, 5)) // 15
```

### Exemple - Pattern Variadic avec Classes
```typescript
// Classe avec constructeur variadique
class Logger {
  private levels: string[]
  private prefix: string

  constructor(prefix: string, ...levels: string[]) {
    this.prefix = prefix
    this.levels = levels.length > 0 ? levels : ['info', 'warn', 'error']
  }

  log(level: string, message: string): void {
    if (this.levels.includes(level)) {
      console.log(`[${this.prefix}] ${level.toUpperCase()}: ${message}`)
    }
  }

  info(message: string): void {
    this.log('info', message)
  }

  warn(message: string): void {
    this.log('warn', message)
  }

  error(message: string): void {
    this.log('error', message)
  }
}

// Utilisation
const logger = new Logger('MyApp', 'info', 'error')
logger.info('Application started')
logger.warn('This will not be logged')
logger.error('An error occurred')

// Classe avec méthodes variadiques
class QueryBuilder {
  private conditions: string[] = []
  private fields: string[] = []

  select(...fields: string[]): QueryBuilder {
    this.fields = fields
    return this
  }

  where(...conditions: string[]): QueryBuilder {
    this.conditions.push(...conditions)
    return this
  }

  build(): string {
    const selectClause = this.fields.length > 0 
      ? `SELECT ${this.fields.join(', ')}` 
      : 'SELECT *'
    
    const whereClause = this.conditions.length > 0 
      ? ` WHERE ${this.conditions.join(' AND ')}` 
      : ''

    return selectClause + whereClause
  }
}

// Utilisation
const query = new QueryBuilder()
  .select('id', 'name', 'email')
  .where('active = true', 'created_at > NOW() - INTERVAL 1 DAY')
  .build()

console.log(query) // "SELECT id, name, email WHERE active = true AND created_at > NOW() - INTERVAL 1 DAY"
```

### Exemple - Fonctions Variadiques avec Rest Parameters
```typescript
// Fonction avec rest parameters et paramètres nommés
function createApiEndpoint(
  baseUrl: string,
  version: string,
  ...pathSegments: string[]
): string {
  return `${baseUrl}/api/v${version}/${pathSegments.join('/')}`
}

// Utilisation
const userEndpoint = createApiEndpoint('https://api.example.com', '1', 'users', 'profile')
console.log(userEndpoint) // "https://api.example.com/api/v1/users/profile"

// Fonction variadique avec destructuring
function processUserData(
  userId: string,
  ...updates: Array<{ field: string; value: any }>
): { userId: string; updates: Array<{ field: string; value: any }> } {
  return {
    userId,
    updates: updates.map(update => ({
      field: update.field,
      value: update.value,
      timestamp: new Date()
    }))
  }
}

// Utilisation
const result = processUserData(
  'user123',
  { field: 'name', value: 'John Doe' },
  { field: 'email', value: 'john@example.com' },
  { field: 'age', value: 30 }
)

console.log(result)

// Fonction variadique avec types conditionnels
function createEvent<T extends string>(
  type: T,
  ...data: T extends 'user' ? [string, number] : T extends 'product' ? [string, number, string] : never[]
): { type: T; data: any } {
  return { type, data }
}

// Utilisation
const userEvent = createEvent('user', 'John', 30)
const productEvent = createEvent('product', 'Laptop', 999, 'Electronics')
console.log(userEvent) // { type: 'user', data: ['John', 30] }
console.log(productEvent) // { type: 'product', data: ['Laptop', 999, 'Electronics'] }
```

## Bonnes Pratiques

1. **Use when appropriate** : Utiliser les patterns seulement quand nécessaire
2. **Don't over-engineer** : Ne pas sur-ingénierer
3. **Consider alternatives** : Considérer les alternatives modernes
4. **Document patterns** : Documenter l'utilisation des patterns
5. **Test thoroughly** : Tester soigneusement
6. **Variadic functions** : Utiliser avec parcimonie pour éviter la confusion
7. **Type safety** : Toujours typer les paramètres variadiques

## Pièges à Éviter

1. **Singleton overuse** : Ne pas abuser du Singleton
2. **Complex inheritance** : Éviter l'héritage complexe
3. **Tight coupling** : Éviter le couplage fort
4. **Performance issues** : Attention aux problèmes de performance



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>

