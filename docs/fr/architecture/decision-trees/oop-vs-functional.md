# 🧩 Arbre de décision : POO vs Programmation Fonctionnelle

## 🎯 Objectif
Décider quand utiliser la Programmation Orientée Objet (POO) vs la Programmation Fonctionnelle (PF) selon le contexte et les besoins du projet.

---

## 1️⃣ Compréhension des paradigmes

### 🎯 Objectif
Comprendre les différences fondamentales entre POO et PF.

### 📊 Comparaison des paradigmes

| Aspect | POO | Programmation Fonctionnelle |
|--------|-----|---------------------------|
| **État** | Mutable, encapsulé dans les objets | Immutable, évite les effets de bord |
| **Focus** | Objets et leurs interactions | Fonctions et transformations de données |
| **Composition** | Héritage et polymorphisme | Composition de fonctions |
| **Parallélisme** | Difficile (état partagé) | Facile (pas d'effets de bord) |
| **Debugging** | Complexe (état caché) | Simple (déterministe) |
| **Performance** | Optimisé pour l'état | Optimisé pour les transformations |

---

## 2️⃣ Critères de décision

### 🎯 Objectif
Identifier les critères qui influencent le choix du paradigme.

### 💬 Questions à se poser

| Critère | POO | PF | Question clé |
|---------|-----|----|--------------|
| **Complexité de l'état** | État complexe et mutable | État simple et immutable | L'application a-t-elle un état complexe ? |
| **Parallélisme** | Limité | Excellent | Avez-vous besoin de parallélisme ? |
| **Équipe** | Familière avec POO | Familière avec PF | Quelle est l'expertise de l'équipe ? |
| **Performance** | Optimisée pour l'état | Optimisée pour les calculs | Quels sont les besoins de performance ? |
| **Maintenance** | Complexe | Simple | Priorité à la simplicité ? |

---

## 3️⃣ Arbre de décision

### 🎯 Objectif
Guide visuel pour choisir le bon paradigme.

```
                    Votre projet a-t-il besoin de gestion d'état complexe ?
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
            OUI - État complexe    NON - État simple    ÉTAT MIXTE
                    │                      │                      │
                    ▼                      ▼                      ▼
            L'état change-t-il    Avez-vous besoin      Utilisez un
            fréquemment ?         de parallélisme ?     APPROCHE HYBRIDE
                    │                      │                      │
              ┌─────┴─────┐        ┌───────┴───────┐              │
              │           │        │               │              │
              ▼           ▼        ▼               ▼              ▼
        POO avec état   PF avec   PF (calculs   POO (logique
        mutable        état       parallèles)   métier)
        encapsulé      immutable                complexe)
```

---

## 4️⃣ Cas d'usage POO

### 🎯 Objectif
Identifier les situations où POO est le meilleur choix.

### 📝 Exemples concrets

#### ✅ Système de gestion d'utilisateurs

```typescript
// POO - État complexe et mutable
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

  // Encapsulation et logique métier complexe
  canAccess(resource: Resource): boolean {
    return this.permissions.some(p => 
      p.resource === resource && p.action === 'read'
    )
  }
}
```

#### ✅ Système de commandes e-commerce

```typescript
// POO - Gestion d'état complexe
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

## 5️⃣ Cas d'usage Programmation Fonctionnelle

### 🎯 Objectif
Identifier les situations où PF est le meilleur choix.

### 📝 Exemples concrets

#### ✅ Traitement de données

```typescript
// PF - Transformations de données
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

// Fonctions pures
const isAdult = (age: number): boolean => age >= 18

const createDisplayName = (user: User): string => 
  `${user.name} (${user.email})`

const processUser = (user: User): ProcessedUser => ({
  id: user.id,
  displayName: createDisplayName(user),
  isAdult: isAdult(user.age),
  department: user.department
})

// Composition de fonctions
const processUsers = (users: User[]): ProcessedUser[] =>
  users
    .filter(user => user.age > 0) // Validation
    .map(processUser)              // Transformation
    .sort((a, b) => a.displayName.localeCompare(b.displayName)) // Tri
```

#### ✅ Calculs mathématiques

```typescript
// PF - Calculs parallélisables
interface Point {
  x: number
  y: number
}

interface Circle {
  center: Point
  radius: number
}

// Fonctions pures
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

## 6️⃣ Approche hybride

### 🎯 Objectif
Combiner les deux paradigmes pour optimiser les avantages.

### 📝 Exemple : Système de gestion de commandes

```typescript
// POO pour la gestion d'état complexe
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

// PF pour les transformations de données
const orderTransformations = {
  // Fonctions pures pour les calculs
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

// Utilisation hybride
class OrderController {
  constructor(private orderService: OrderService) {}

  createOrderSummary(orderId: string): OrderSummary | null {
    const order = this.orderService.getOrder(orderId)
    
    if (!order) {
      return null
    }

    // Utilisation de fonctions pures pour la transformation
    return orderTransformations.formatOrderSummary(order)
  }

  calculateOrderTotal(orderId: string): number {
    const order = this.orderService.getOrder(orderId)
    
    if (!order) {
      return 0
    }

    // Utilisation de fonctions pures pour les calculs
    const tax = orderTransformations.calculateTax(order.total, 0.2)
    const discount = orderTransformations.calculateDiscount(order.total, 10)
    
    return order.total + tax - discount
  }
}
```

---

## 7️⃣ Tableau de décision détaillé

### 🎯 Objectif
Guide complet pour choisir le bon paradigme.

| Critère | POO | PF | Recommandation |
|---------|-----|----|--------------|
| **Gestion d'état complexe** | ✅ Excellent | ❌ Limité | POO |
| **Parallélisme** | ❌ Difficile | ✅ Excellent | PF |
| **Debugging** | ❌ Complexe | ✅ Simple | PF |
| **Performance calculs** | ❌ Limité | ✅ Excellent | PF |
| **Encapsulation** | ✅ Excellent | ❌ Limité | POO |
| **Réutilisabilité** | ✅ Bon | ✅ Excellent | Les deux |
| **Courbe d'apprentissage** | ✅ Familière | ❌ Raide | POO |
| **Maintenance** | ❌ Complexe | ✅ Simple | PF |

---

## 8️⃣ Exemples par domaine

### 🎯 Objectif
Exemples concrets par domaine d'application.

### 📝 Domaines et recommandations

| Domaine | Recommandation | Justification | Exemple |
|---------|----------------|---------------|---------|
| **Systèmes bancaires** | POO | État complexe, sécurité, encapsulation | Comptes, transactions |
| **Traitement de données** | PF | Transformations, parallélisme | ETL, analytics |
| **Jeux vidéo** | POO | État complexe, interactions | Entités, systèmes |
| **Calculs scientifiques** | PF | Précision, parallélisme | Simulations, modèles |
| **Interfaces utilisateur** | Hybride | État UI + transformations | React, Vue |
| **APIs REST** | Hybride | État serveur + transformations | Contrôleurs, services |

---

## 9️⃣ Migration entre paradigmes

### 🎯 Objectif
Guide pour migrer d'un paradigme à l'autre.

### 📝 Stratégies de migration

#### De POO vers PF

```typescript
// Avant (POO)
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

// Après (PF)
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

#### De PF vers POO

```typescript
// Avant (PF)
const processUser = (user: User): ProcessedUser => ({
  ...user,
  displayName: `${user.name} (${user.email})`,
  isAdult: user.age >= 18
})

// Après (POO)
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

## 📈 Synthèse finale

### ✅ Checklist de décision

- [ ] **État complexe** → POO
- [ ] **Parallélisme requis** → PF
- [ ] **Équipe familière** → Choix selon expertise
- [ ] **Performance calculs** → PF
- [ ] **Maintenance simple** → PF
- [ ] **Encapsulation requise** → POO
- [ ] **Besoin hybride** → Approche combinée

### 🧱 Recommandations finales

1. **Commencez simple** : PF pour les nouveaux projets
2. **Migrez progressivement** : Par modules ou composants
3. **Formez l'équipe** : Investissez dans la formation
4. **Mesurez l'impact** : Performance, maintenabilité, productivité
5. **Adaptez selon le contexte** : Pas de solution universelle
