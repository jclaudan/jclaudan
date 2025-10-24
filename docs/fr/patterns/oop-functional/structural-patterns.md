# Patterns de Structure (Structural Patterns)

## 1. Adapter Pattern

### Description
Le pattern Adapter permet à des interfaces incompatibles de travailler ensemble. Il agit comme un pont entre deux interfaces incompatibles.

### Exemple - TypeScript
```typescript
// Interface existante (legacy)
interface LegacyPrinter {
  printLegacy(text: string): void
}

// Nouvelle interface
interface ModernPrinter {
  print(text: string): void
}

// Implémentation legacy
class OldPrinter implements LegacyPrinter {
  printLegacy(text: string): void {
    console.log(`[LEGACY] ${text}`)
  }
}

// Adapter pour faire fonctionner l'ancien avec le nouveau
class PrinterAdapter implements ModernPrinter {
  constructor(private legacyPrinter: LegacyPrinter) {}

  print(text: string): void {
    this.legacyPrinter.printLegacy(text)
  }
}

// Utilisation
const oldPrinter = new OldPrinter()
const adapter = new PrinterAdapter(oldPrinter)
adapter.print('Hello World') // Utilise l'interface moderne
```

### Exemple - Adapter pour API
```typescript
// API externe (format différent)
interface ExternalUserAPI {
  getUserData(id: number): { name: string; email_address: string; created_at: string }
}

// Interface interne
interface InternalUser {
  id: number
  fullName: string
  email: string
  createdAt: Date
}

// Adapter pour convertir les données
class UserAPIAdapter {
  constructor(private externalAPI: ExternalUserAPI) {}

  async getUser(id: number): Promise<InternalUser> {
    const externalUser = this.externalAPI.getUserData(id)
    
    return {
      id,
      fullName: externalUser.name,
      email: externalUser.email_address,
      createdAt: new Date(externalUser.created_at)
    }
  }
}
```

## 2. Bridge Pattern

### Description
Le pattern Bridge sépare l'abstraction de son implémentation, permettant aux deux de varier indépendamment.

### Exemple - TypeScript
```typescript
// Implémentation
interface DrawingAPI {
  drawCircle(x: number, y: number, radius: number): void
  drawRectangle(x: number, y: number, width: number, height: number): void
}

class VectorDrawingAPI implements DrawingAPI {
  drawCircle(x: number, y: number, radius: number): void {
    console.log(`Drawing vector circle at (${x}, ${y}) with radius ${radius}`)
  }

  drawRectangle(x: number, y: number, width: number, height: number): void {
    console.log(`Drawing vector rectangle at (${x}, ${y}) with size ${width}x${height}`)
  }
}

class RasterDrawingAPI implements DrawingAPI {
  drawCircle(x: number, y: number, radius: number): void {
    console.log(`Drawing raster circle at (${x}, ${y}) with radius ${radius}`)
  }

  drawRectangle(x: number, y: number, width: number, height: number): void {
    console.log(`Drawing raster rectangle at (${x}, ${y}) with size ${width}x${height}`)
  }
}

// Abstraction
abstract class Shape {
  constructor(protected drawingAPI: DrawingAPI) {}

  abstract draw(): void
}

class Circle extends Shape {
  constructor(
    private x: number,
    private y: number,
    private radius: number,
    drawingAPI: DrawingAPI
  ) {
    super(drawingAPI)
  }

  draw(): void {
    this.drawingAPI.drawCircle(this.x, this.y, this.radius)
  }
}

class Rectangle extends Shape {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    drawingAPI: DrawingAPI
  ) {
    super(drawingAPI)
  }

  draw(): void {
    this.drawingAPI.drawRectangle(this.x, this.y, this.width, this.height)
  }
}

// Utilisation
const vectorAPI = new VectorDrawingAPI()
const rasterAPI = new RasterDrawingAPI()

const vectorCircle = new Circle(10, 10, 5, vectorAPI)
const rasterCircle = new Circle(20, 20, 5, rasterAPI)

vectorCircle.draw() // Drawing vector circle...
rasterCircle.draw() // Drawing raster circle...
```

## 3. Composite Pattern

### Description
Le pattern Composite permet de composer des objets en structures d'arbre pour représenter des hiérarchies partie-tout.

### Exemple - TypeScript
```typescript
interface Component {
  operation(): string
  add(component: Component): void
  remove(component: Component): void
  getChild(index: number): Component | null
}

class Leaf implements Component {
  constructor(private name: string) {}

  operation(): string {
    return `Leaf: ${this.name}`
  }

  add(component: Component): void {
    throw new Error('Cannot add to leaf')
  }

  remove(component: Component): void {
    throw new Error('Cannot remove from leaf')
  }

  getChild(index: number): Component | null {
    return null
  }
}

class Composite implements Component {
  private children: Component[] = []

  constructor(private name: string) {}

  operation(): string {
    const results = this.children.map(child => child.operation())
    return `Composite: ${this.name} [${results.join(', ')}]`
  }

  add(component: Component): void {
    this.children.push(component)
  }

  remove(component: Component): void {
    const index = this.children.indexOf(component)
    if (index > -1) {
      this.children.splice(index, 1)
    }
  }

  getChild(index: number): Component | null {
    return this.children[index] || null
  }
}

// Exemple d'utilisation - Structure de fichiers
class FileSystemComponent implements Component {
  constructor(private name: string, private isDirectory: boolean = false) {
    this.children = []
  }

  private children: Component[]

  operation(): string {
    if (this.isDirectory) {
      const childrenResults = this.children.map(child => child.operation())
      return `📁 ${this.name} [${childrenResults.join(', ')}]`
    }
    return `📄 ${this.name}`
  }

  add(component: Component): void {
    if (this.isDirectory) {
      this.children.push(component)
    } else {
      throw new Error('Cannot add to file')
    }
  }

  remove(component: Component): void {
    if (this.isDirectory) {
      const index = this.children.indexOf(component)
      if (index > -1) {
        this.children.splice(index, 1)
      }
    }
  }

  getChild(index: number): Component | null {
    return this.children[index] || null
  }
}

// Utilisation
const root = new FileSystemComponent('root', true)
const documents = new FileSystemComponent('documents', true)
const images = new FileSystemComponent('images', true)

const file1 = new FileSystemComponent('readme.txt')
const file2 = new FileSystemComponent('config.json')
const image1 = new FileSystemComponent('photo.jpg')

root.add(documents)
root.add(images)
documents.add(file1)
documents.add(file2)
images.add(image1)

console.log(root.operation())
```

## 4. Decorator Pattern

### Description
Le pattern Decorator permet d'ajouter dynamiquement de nouveaux comportements à des objets en les enveloppant dans des objets décorateurs.

### Exemple - TypeScript
```typescript
interface Coffee {
  getCost(): number
  getDescription(): string
}

class SimpleCoffee implements Coffee {
  getCost(): number {
    return 10
  }

  getDescription(): string {
    return 'Simple coffee'
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  getCost(): number {
    return this.coffee.getCost()
  }

  getDescription(): string {
    return this.coffee.getDescription()
  }
}

class MilkDecorator extends CoffeeDecorator {
  getCost(): number {
    return this.coffee.getCost() + 2
  }

  getDescription(): string {
    return this.coffee.getDescription() + ', milk'
  }
}

class SugarDecorator extends CoffeeDecorator {
  getCost(): number {
    return this.coffee.getCost() + 1
  }

  getDescription(): string {
    return this.coffee.getDescription() + ', sugar'
  }
}

class WhipDecorator extends CoffeeDecorator {
  getCost(): number {
    return this.coffee.getCost() + 3
  }

  getDescription(): string {
    return this.coffee.getDescription() + ', whip'
  }
}

// Utilisation
let coffee: Coffee = new SimpleCoffee()
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`)

coffee = new MilkDecorator(coffee)
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`)

coffee = new SugarDecorator(coffee)
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`)

coffee = new WhipDecorator(coffee)
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`)
```

### Exemple - Decorator pour validation
```typescript
interface Validator {
  validate(data: any): boolean
  getErrors(): string[]
}

class BaseValidator implements Validator {
  protected errors: string[] = []

  validate(data: any): boolean {
    return true
  }

  getErrors(): string[] {
    return this.errors
  }
}

abstract class ValidatorDecorator implements Validator {
  constructor(protected validator: Validator) {}

  validate(data: any): boolean {
    return this.validator.validate(data)
  }

  getErrors(): string[] {
    return this.validator.getErrors()
  }
}

class RequiredValidator extends ValidatorDecorator {
  validate(data: any): boolean {
    const isValid = this.validator.validate(data)
    if (!data || data === '') {
      this.validator.getErrors().push('Field is required')
      return false
    }
    return isValid
  }
}

class EmailValidator extends ValidatorDecorator {
  validate(data: any): boolean {
    const isValid = this.validator.validate(data)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (data && !emailRegex.test(data)) {
      this.validator.getErrors().push('Invalid email format')
      return false
    }
    return isValid
  }
}

class LengthValidator extends ValidatorDecorator {
  constructor(validator: Validator, private minLength: number, private maxLength: number) {
    super(validator)
  }

  validate(data: any): boolean {
    const isValid = this.validator.validate(data)
    if (data && (data.length < this.minLength || data.length > this.maxLength)) {
      this.validator.getErrors().push(`Length must be between ${this.minLength} and ${this.maxLength}`)
      return false
    }
    return isValid
  }
}
```

## 5. Facade Pattern

### Description
Le pattern Facade fournit une interface simplifiée vers un sous-système complexe.

### Exemple - TypeScript
```typescript
// Sous-systèmes complexes
class CPU {
  freeze(): void {
    console.log('CPU: Freezing...')
  }

  jump(position: number): void {
    console.log(`CPU: Jumping to position ${position}`)
  }

  execute(): void {
    console.log('CPU: Executing...')
  }
}

class Memory {
  load(position: number, data: string): void {
    console.log(`Memory: Loading data "${data}" at position ${position}`)
  }
}

class HardDrive {
  read(lba: number, size: number): string {
    console.log(`HardDrive: Reading ${size} bytes from LBA ${lba}`)
    return 'boot data'
  }
}

// Facade
class ComputerFacade {
  private cpu: CPU
  private memory: Memory
  private hardDrive: HardDrive

  constructor() {
    this.cpu = new CPU()
    this.memory = new Memory()
    this.hardDrive = new HardDrive()
  }

  start(): void {
    console.log('Starting computer...')
    this.cpu.freeze()
    this.memory.load(0, this.hardDrive.read(0, 1024))
    this.cpu.jump(0)
    this.cpu.execute()
    console.log('Computer started successfully!')
  }

  shutdown(): void {
    console.log('Shutting down computer...')
    // Logique d'arrêt
    console.log('Computer shut down successfully!')
  }
}

// Utilisation
const computer = new ComputerFacade()
computer.start()
computer.shutdown()
```

### Exemple - Facade pour API
```typescript
// Services complexes
class UserService {
  async getUser(id: string): Promise<any> {
    console.log(`Fetching user ${id}`)
    return { id, name: 'John Doe', email: 'john@example.com' }
  }
}

class OrderService {
  async getOrders(userId: string): Promise<any[]> {
    console.log(`Fetching orders for user ${userId}`)
    return [
      { id: '1', userId, total: 100 },
      { id: '2', userId, total: 200 }
    ]
  }
}

class PaymentService {
  async getPayments(orderId: string): Promise<any[]> {
    console.log(`Fetching payments for order ${orderId}`)
    return [{ id: '1', orderId, amount: 100, status: 'completed' }]
  }
}

// Facade pour simplifier l'accès
class UserDashboardFacade {
  private userService: UserService
  private orderService: OrderService
  private paymentService: PaymentService

  constructor() {
    this.userService = new UserService()
    this.orderService = new OrderService()
    this.paymentService = new PaymentService()
  }

  async getUserDashboard(userId: string): Promise<any> {
    const user = await this.userService.getUser(userId)
    const orders = await this.orderService.getOrders(userId)
    
    const ordersWithPayments = await Promise.all(
      orders.map(async (order) => {
        const payments = await this.paymentService.getPayments(order.id)
        return { ...order, payments }
      })
    )

    return {
      user,
      orders: ordersWithPayments,
      summary: {
        totalOrders: orders.length,
        totalAmount: orders.reduce((sum, order) => sum + order.total, 0)
      }
    }
  }
}
```

## 6. Flyweight Pattern

### Description
Le pattern Flyweight minimise l'utilisation de la mémoire en partageant efficacement les objets similaires.

### Exemple - TypeScript
```typescript
// État intrinsèque (partagé)
interface TreeType {
  name: string
  color: string
  texture: string
}

// État extrinsèque (unique)
interface TreePosition {
  x: number
  y: number
}

class TreeTypeFactory {
  private static treeTypes: Map<string, TreeType> = new Map()

  static getTreeType(name: string, color: string, texture: string): TreeType {
    const key = `${name}_${color}_${texture}`
    
    if (!this.treeTypes.has(key)) {
      this.treeTypes.set(key, { name, color, texture })
      console.log(`Creating new tree type: ${key}`)
    } else {
      console.log(`Reusing existing tree type: ${key}`)
    }

    return this.treeTypes.get(key)!
  }

  static getTreeTypesCount(): number {
    return this.treeTypes.size
  }
}

class Tree {
  constructor(
    private treeType: TreeType,
    private position: TreePosition
  ) {}

  render(): void {
    console.log(
      `Rendering ${this.treeType.name} tree at (${this.position.x}, ${this.position.y}) ` +
      `with color ${this.treeType.color} and texture ${this.treeType.texture}`
    )
  }
}

class Forest {
  private trees: Tree[] = []

  plantTree(x: number, y: number, name: string, color: string, texture: string): void {
    const treeType = TreeTypeFactory.getTreeType(name, color, texture)
    const tree = new Tree(treeType, { x, y })
    this.trees.push(tree)
  }

  render(): void {
    this.trees.forEach(tree => tree.render())
  }

  getTreeCount(): number {
    return this.trees.length
  }

  getTreeTypeCount(): number {
    return TreeTypeFactory.getTreeTypesCount()
  }
}

// Utilisation
const forest = new Forest()

// Planter des arbres (certains types seront réutilisés)
forest.plantTree(1, 1, 'Oak', 'Green', 'Rough')
forest.plantTree(2, 2, 'Oak', 'Green', 'Rough') // Réutilise le type
forest.plantTree(3, 3, 'Pine', 'Dark Green', 'Smooth')
forest.plantTree(4, 4, 'Oak', 'Green', 'Rough') // Réutilise le type
forest.plantTree(5, 5, 'Pine', 'Dark Green', 'Smooth') // Réutilise le type

console.log(`Total trees: ${forest.getTreeCount()}`)
console.log(`Tree types: ${forest.getTreeTypeCount()}`)
forest.render()
```

## 7. Proxy Pattern

### Description
Le pattern Proxy fournit un substitut ou un espace réservé pour un autre objet pour contrôler l'accès à celui-ci.

### Exemple - TypeScript
```typescript
interface Image {
  display(): void
}

class RealImage implements Image {
  private filename: string

  constructor(filename: string) {
    this.filename = filename
    this.loadFromDisk()
  }

  private loadFromDisk(): void {
    console.log(`Loading image: ${this.filename}`)
  }

  display(): void {
    console.log(`Displaying image: ${this.filename}`)
  }
}

class ImageProxy implements Image {
  private realImage: RealImage | null = null
  private filename: string

  constructor(filename: string) {
    this.filename = filename
  }

  display(): void {
    if (this.realImage === null) {
      this.realImage = new RealImage(this.filename)
    }
    this.realImage.display()
  }
}

// Utilisation
const image1 = new ImageProxy('photo1.jpg')
const image2 = new ImageProxy('photo2.jpg')

// L'image n'est chargée que lors de l'affichage
image1.display() // Loading image: photo1.jpg, Displaying image: photo1.jpg
image1.display() // Displaying image: photo1.jpg (pas de rechargement)
image2.display() // Loading image: photo2.jpg, Displaying image: photo2.jpg
```

### Exemple - Proxy pour API avec cache
```typescript
interface ApiService {
  fetchData(endpoint: string): Promise<any>
}

class RealApiService implements ApiService {
  async fetchData(endpoint: string): Promise<any> {
    console.log(`Making API call to ${endpoint}`)
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { data: `Data from ${endpoint}`, timestamp: Date.now() }
  }
}

class CachedApiService implements ApiService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private realService: RealApiService
  private cacheTimeout: number

  constructor(cacheTimeout: number = 300000) { // 5 minutes par défaut
    this.realService = new RealApiService()
    this.cacheTimeout = cacheTimeout
  }

  async fetchData(endpoint: string): Promise<any> {
    const cached = this.cache.get(endpoint)
    const now = Date.now()

    if (cached && (now - cached.timestamp) < this.cacheTimeout) {
      console.log(`Returning cached data for ${endpoint}`)
      return cached.data
    }

    console.log(`Cache miss for ${endpoint}, fetching from API`)
    const data = await this.realService.fetchData(endpoint)
    this.cache.set(endpoint, { data, timestamp: now })
    return data
  }

  clearCache(): void {
    this.cache.clear()
    console.log('Cache cleared')
  }
}

// Utilisation
const apiService = new CachedApiService()

// Premier appel - va à l'API
apiService.fetchData('/users').then(data => console.log(data))

// Deuxième appel - utilise le cache
setTimeout(() => {
  apiService.fetchData('/users').then(data => console.log(data))
}, 100)
```

### Exemple - Proxy de protection
```typescript
interface BankAccount {
  deposit(amount: number): void
  withdraw(amount: number): boolean
  getBalance(): number
}

class RealBankAccount implements BankAccount {
  private balance: number = 0

  deposit(amount: number): void {
    this.balance += amount
    console.log(`Deposited ${amount}. New balance: ${this.balance}`)
  }

  withdraw(amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount
      console.log(`Withdrew ${amount}. New balance: ${this.balance}`)
      return true
    }
    console.log('Insufficient funds')
    return false
  }

  getBalance(): number {
    return this.balance
  }
}

class ProtectedBankAccount implements BankAccount {
  private realAccount: RealBankAccount
  private accessLevel: 'read' | 'write'

  constructor(accessLevel: 'read' | 'write') {
    this.realAccount = new RealBankAccount()
    this.accessLevel = accessLevel
  }

  deposit(amount: number): void {
    if (this.accessLevel === 'write') {
      this.realAccount.deposit(amount)
    } else {
      console.log('Access denied: Read-only account')
    }
  }

  withdraw(amount: number): boolean {
    if (this.accessLevel === 'write') {
      return this.realAccount.withdraw(amount)
    } else {
      console.log('Access denied: Read-only account')
      return false
    }
  }

  getBalance(): number {
    return this.realAccount.getBalance()
  }
}

// Utilisation
const readOnlyAccount = new ProtectedBankAccount('read')
const writeAccount = new ProtectedBankAccount('write')

readOnlyAccount.getBalance() // OK
readOnlyAccount.deposit(100) // Access denied

writeAccount.deposit(100) // OK
writeAccount.withdraw(50) // OK
```

## Bonnes Pratiques

1. **Adapter Pattern** : Utiliser pour intégrer des systèmes existants sans les modifier
2. **Bridge Pattern** : Séparer l'abstraction de l'implémentation pour plus de flexibilité
3. **Composite Pattern** : Traiter uniformément les objets individuels et composites
4. **Decorator Pattern** : Ajouter des fonctionnalités dynamiquement sans héritage
5. **Facade Pattern** : Simplifier les interfaces complexes
6. **Flyweight Pattern** : Optimiser l'utilisation mémoire avec des objets partagés
7. **Proxy Pattern** : Contrôler l'accès aux objets (lazy loading, cache, sécurité)

## Pièges à Éviter

1. **Adapter Pattern** : Ne pas créer trop d'adaptateurs, cela peut complexifier le code
2. **Bridge Pattern** : Éviter de créer trop de niveaux d'abstraction
3. **Composite Pattern** : Attention aux performances avec de grandes structures
4. **Decorator Pattern** : Éviter les chaînes de décorateurs trop longues
5. **Facade Pattern** : Ne pas exposer trop de détails du sous-système
6. **Flyweight Pattern** : S'assurer que l'état partagé est vraiment immutable
7. **Proxy Pattern** : Éviter les proxies trop complexes qui deviennent difficiles à maintenir

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
