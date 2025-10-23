# Creational Patterns

## 1. Singleton Pattern

### Description
Ensure that a class has only one instance and provide a global access point.

### Example - TypeScript
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

// Usage
const db1 = DatabaseConnection.getInstance()
const db2 = DatabaseConnection.getInstance()
console.log(db1 === db2) // true
```

### Example - Modern JavaScript
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

// Usage
const logger = Logger.getInstance()
logger.log('Application started')
```

## 2. Factory Pattern

### Description
Create objects without specifying their exact class.

### Example - Simple Factory
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

// Usage
const dog = AnimalFactory.createAnimal('dog')
const cat = AnimalFactory.createAnimal('cat')
```

### Example - Abstract Factory
```typescript
interface Button {
  render(): string
}

interface Dialog {
  render(): string
}

class WindowsButton implements Button {
  render(): string {
    return 'Windows Button'
  }
}

class MacButton implements Button {
  render(): string {
    return 'Mac Button'
  }
}

class WindowsDialog implements Dialog {
  render(): string {
    return 'Windows Dialog'
  }
}

class MacDialog implements Dialog {
  render(): string {
    return 'Mac Dialog'
  }
}

interface UIFactory {
  createButton(): Button
  createDialog(): Dialog
}

class WindowsUIFactory implements UIFactory {
  createButton(): Button {
    return new WindowsButton()
  }

  createDialog(): Dialog {
    return new WindowsDialog()
  }
}

class MacUIFactory implements UIFactory {
  createButton(): Button {
    return new MacButton()
  }

  createDialog(): Dialog {
    return new MacDialog()
  }
}
```

## 3. Builder Pattern

### Description
Build complex objects step by step.

### Example - TypeScript
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

// Usage
const pizza = new Pizza()
  .setDough('thin')
  .setSauce('tomato')
  .addTopping('cheese')
  .addTopping('pepperoni')
  .build()
```

### Example - Director Pattern
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
Create objects by cloning an existing instance.

### Example - TypeScript
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

// Usage
const originalCircle = new Circle(10, 20, 'red', 5)
const clonedCircle = originalCircle.clone()
clonedCircle.move(30, 40)
```

## 5. Object Pool Pattern

### Description
Reuse expensive objects instead of creating/destroying them.

### Example - TypeScript
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

## Best Practices

1. **Use when appropriate**: Use patterns only when necessary
2. **Don't over-engineer**: Don't over-engineer
3. **Consider alternatives**: Consider modern alternatives
4. **Document patterns**: Document pattern usage
5. **Test thoroughly**: Test thoroughly

## Pitfalls to Avoid

1. **Singleton overuse**: Don't abuse Singleton
2. **Complex inheritance**: Avoid complex inheritance
3. **Tight coupling**: Avoid tight coupling
4. **Performance issues**: Watch out for performance issues


<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>

