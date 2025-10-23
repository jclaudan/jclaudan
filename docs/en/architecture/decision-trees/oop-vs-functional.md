# 🧩 Decision Tree: OOP vs Functional Programming

## 🎯 Objective
Decide when to use Object-Oriented Programming (OOP) vs Functional Programming (FP) based on context and project needs.

---

## 1️⃣ Understanding Paradigms

### 🎯 Objective
Understand the fundamental differences between OOP and FP.

### 📊 Paradigm Comparison

| Aspect | OOP | Functional Programming |
|--------|-----|------------------------|
| **State** | Mutable, encapsulated in objects | Immutable, avoids side effects |
| **Focus** | Objects and their interactions | Functions and data transformations |
| **Composition** | Inheritance and polymorphism | Function composition |
| **Parallelism** | Difficult (shared state) | Easy (no side effects) |
| **Debugging** | Complex (hidden state) | Simple (deterministic) |
| **Performance** | Optimized for state | Optimized for transformations |

---

## 2️⃣ Decision Criteria

### 🎯 Objective
Identify criteria that influence paradigm choice.

### 💬 Questions to Ask

| Criterion | OOP | FP | Key Question |
|-----------|-----|----|--------------|
| **State complexity** | Complex and mutable state | Simple and immutable state | Does the application have complex state? |
| **Parallelism** | Limited | Excellent | Do you need parallelism? |
| **Team** | Familiar with OOP | Familiar with FP | What is the team's expertise? |
| **Performance** | Optimized for state | Optimized for calculations | What are the performance needs? |
| **Maintenance** | Complex | Simple | Priority on simplicity? |

---

## 3️⃣ Decision Tree

### 🎯 Objective
Visual guide to choose the right paradigm.

```
                    Does your project need complex state management?
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
            YES - Complex state    NO - Simple state    MIXED STATE
                    │                      │                      │
                    ▼                      ▼                      ▼
            Does state change      Do you need         Use a
            frequently?            parallelism?        HYBRID APPROACH
                    │                      │                      │
              ┌─────┴─────┐        ┌───────┴───────┐              │
              │           │        │               │              │
              ▼           ▼        ▼               ▼              ▼
        OOP with mutable  FP with  FP (parallel   OOP (complex
        encapsulated      immutable calculations)  business
        state             state                   logic)
```

---

## 4️⃣ OOP Use Cases

### 🎯 Objective
Identify situations where OOP is the best choice.

### 📝 Concrete Examples

#### ✅ User Management System

```typescript
// OOP - Complex and mutable state
class User {
  private id: string
  private name: string
  private email: string
  private permissions: Permission[]
  private lastLogin: Date

  constructor(id: string, name: string, email: string) {
    this.id = id
    this.name = name
    this.email = email
    this.permissions = []
    this.lastLogin = new Date()
  }

  addPermission(permission: Permission): void {
    if (!this.hasPermission(permission)) {
      this.permissions.push(permission)
    }
  }

  hasPermission(permission: Permission): boolean {
    return this.permissions.some(p => p.id === permission.id)
  }

  updateLastLogin(): void {
    this.lastLogin = new Date()
  }

  // Encapsulation and complex business logic
  canAccess(resource: Resource): boolean {
    return this.permissions.some(p => 
      p.resource === resource && p.action === 'read'
    )
  }
}
```

#### ✅ E-commerce Order System

```typescript
// OOP - Complex state management
class Order {
  private id: string
  private items: OrderItem[]
  private status: OrderStatus
  private customer: Customer
  private total: number

  constructor(id: string, customer: Customer) {
    this.id = id
    this.customer = customer
    this.items = []
    this.status = 'pending'
    this.total = 0
  }

  addItem(product: Product, quantity: number): void {
    const existingItem = this.items.find(item => item.productId === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push(new OrderItem(product, quantity))
    }
    
    this.calculateTotal()
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.productId !== productId)
    this.calculateTotal()
  }

  private calculateTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + item.getTotal(), 0)
  }

  processPayment(payment: Payment): boolean {
    if (this.status !== 'pending') {
      throw new Error('Order cannot be processed')
    }

    if (payment.amount !== this.total) {
      throw new Error('Payment amount mismatch')
    }

    this.status = 'paid'
    return true
  }
}
```

---

## 5️⃣ Functional Programming Use Cases

### 🎯 Objective
Identify situations where FP is the best choice.

### 📝 Concrete Examples

#### ✅ Data Processing

```typescript
// FP - Data transformations
interface User {
  id: string
  name: string
  email: string
  age: number
  department: string
}

interface ProcessedUser {
  id: string
  displayName: string
  isAdult: boolean
  department: string
}

// Pure functions
const isAdult = (age: number): boolean => age >= 18

const createDisplayName = (user: User): string => 
  `${user.name} (${user.email})`

const processUser = (user: User): ProcessedUser => ({
  id: user.id,
  displayName: createDisplayName(user),
  isAdult: isAdult(user.age),
  department: user.department
})

// Function composition
const processUsers = (users: User[]): ProcessedUser[] =>
  users
    .filter(user => user.age > 0) // Validation
    .map(processUser)              // Transformation
    .sort((a, b) => a.displayName.localeCompare(b.displayName)) // Sort
```

#### ✅ Mathematical Calculations

```typescript
// FP - Parallelizable calculations
interface Point {
  x: number
  y: number
}

interface Circle {
  center: Point
  radius: number
}

// Pure functions
const distance = (p1: Point, p2: Point): number =>
  Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

const isPointInCircle = (point: Point, circle: Circle): boolean =>
  distance(point, circle.center) <= circle.radius

const calculateArea = (circle: Circle): number =>
  Math.PI * circle.radius ** 2

// Composition
const findCirclesContainingPoint = (
  point: Point,
  circles: Circle[]
): Circle[] =>
  circles.filter(circle => isPointInCircle(point, circle))

const totalArea = (circles: Circle[]): number =>
  circles.reduce((sum, circle) => sum + calculateArea(circle), 0)
```

---

## 6️⃣ Hybrid Approach

### 🎯 Objective
Combine both paradigms to optimize advantages.

### 📝 Example: Order Management System

```typescript
// OOP for complex state management
class OrderService {
  private orders: Map<string, Order> = new Map()

  createOrder(customerId: string): Order {
    const order = new Order(generateId(), customerId)
    this.orders.set(order.id, order)
    return order
  }

  getOrder(id: string): Order | undefined {
    return this.orders.get(id)
  }
}

// FP for data transformations
const orderTransformations = {
  // Pure functions for calculations
  calculateTax: (amount: number, rate: number): number =>
    amount * rate,

  calculateDiscount: (amount: number, discountPercent: number): number =>
    amount * (discountPercent / 100),

  formatOrderSummary: (order: Order): OrderSummary => ({
    id: order.id,
    customerName: order.customer.name,
    totalItems: order.items.length,
    totalAmount: order.total,
    status: order.status
  })
}

// Hybrid usage
class OrderController {
  constructor(private orderService: OrderService) {}

  createOrderSummary(orderId: string): OrderSummary | null {
    const order = this.orderService.getOrder(orderId)
    
    if (!order) {
      return null
    }

    // Use pure functions for transformation
    return orderTransformations.formatOrderSummary(order)
  }

  calculateOrderTotal(orderId: string): number {
    const order = this.orderService.getOrder(orderId)
    
    if (!order) {
      return 0
    }

    // Use pure functions for calculations
    const tax = orderTransformations.calculateTax(order.total, 0.2)
    const discount = orderTransformations.calculateDiscount(order.total, 10)
    
    return order.total + tax - discount
  }
}
```

---

## 7️⃣ Detailed Decision Table

### 🎯 Objective
Complete guide to choose the right paradigm.

| Criterion | OOP | FP | Recommendation |
|-----------|-----|----|--------------|
| **Complex state management** | ✅ Excellent | ❌ Limited | OOP |
| **Parallelism** | ❌ Difficult | ✅ Excellent | FP |
| **Debugging** | ❌ Complex | ✅ Simple | FP |
| **Calculation performance** | ❌ Limited | ✅ Excellent | FP |
| **Encapsulation** | ✅ Excellent | ❌ Limited | OOP |
| **Reusability** | ✅ Good | ✅ Excellent | Both |
| **Learning curve** | ✅ Familiar | ❌ Steep | OOP |
| **Maintenance** | ❌ Complex | ✅ Simple | FP |

---

## 8️⃣ Examples by Domain

### 🎯 Objective
Concrete examples by application domain.

### 📝 Domains and Recommendations

| Domain | Recommendation | Justification | Example |
|--------|----------------|---------------|---------|
| **Banking systems** | OOP | Complex state, security, encapsulation | Accounts, transactions |
| **Data processing** | FP | Transformations, parallelism | ETL, analytics |
| **Video games** | OOP | Complex state, interactions | Entities, systems |
| **Scientific calculations** | FP | Precision, parallelism | Simulations, models |
| **User interfaces** | Hybrid | UI state + transformations | React, Vue |
| **REST APIs** | Hybrid | Server state + transformations | Controllers, services |

---

## 9️⃣ Migration Between Paradigms

### 🎯 Objective
Guide to migrate from one paradigm to another.

### 📝 Migration Strategies

#### From OOP to FP

```typescript
// Before (OOP)
class Calculator {
  private result: number = 0

  add(value: number): void {
    this.result += value
  }

  multiply(value: number): void {
    this.result *= value
  }

  getResult(): number {
    return this.result
  }
}

// After (FP)
const add = (a: number, b: number): number => a + b
const multiply = (a: number, b: number): number => a * b

const calculate = (operations: Array<(x: number) => number>): number =>
  operations.reduce((result, operation) => operation(result), 0)

// Usage
const result = calculate([
  (x) => add(x, 5),
  (x) => multiply(x, 2)
])
```

#### From FP to OOP

```typescript
// Before (FP)
const processUser = (user: User): ProcessedUser => ({
  ...user,
  displayName: `${user.name} (${user.email})`,
  isAdult: user.age >= 18
})

// After (OOP)
class UserProcessor {
  private user: User

  constructor(user: User) {
    this.user = user
  }

  process(): ProcessedUser {
    return {
      ...this.user,
      displayName: this.createDisplayName(),
      isAdult: this.isAdult()
    }
  }

  private createDisplayName(): string {
    return `${this.user.name} (${this.user.email})`
  }

  private isAdult(): boolean {
    return this.user.age >= 18
  }
}
```

---

## 📈 Final Summary

### ✅ Decision Checklist

- [ ] **Complex state** → OOP
- [ ] **Parallelism required** → FP
- [ ] **Familiar team** → Choice based on expertise
- [ ] **Calculation performance** → FP
- [ ] **Simple maintenance** → FP
- [ ] **Encapsulation required** → OOP
- [ ] **Hybrid need** → Combined approach

### 🧱 Final Recommendations

1. **Start simple** : FP for new projects
2. **Migrate progressively** : By modules or components
3. **Train the team** : Invest in training
4. **Measure impact** : Performance, maintainability, productivity
5. **Adapt to context** : No universal solution
