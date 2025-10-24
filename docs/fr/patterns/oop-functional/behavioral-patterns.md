# Patterns de Comportement (Behavioral Patterns)

## 1. Observer Pattern

### Description
Le pattern Observer permet de définir une dépendance un-à-plusieurs entre objets, de sorte que lorsqu'un objet change d'état, tous ses dépendants sont notifiés et mis à jour automatiquement.

### Exemple - TypeScript
```typescript
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

## 2. Strategy Pattern

### Description
Le pattern Strategy permet de définir une famille d'algorithmes, de les encapsuler et de les rendre interchangeables.

### Exemple - TypeScript
```typescript
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

## 3. Command Pattern

### Description
Le pattern Command encapsule une demande comme un objet, permettant de paramétrer les clients avec différentes demandes, de mettre en file d'attente ou de journaliser les demandes, et de supporter les opérations d'annulation.

### Exemple - TypeScript
```typescript
interface Command {
  execute(): void
  undo(): void
}

class Light {
  private isOn: boolean = false

  turnOn(): void {
    this.isOn = true
    console.log('Light is ON')
  }

  turnOff(): void {
    this.isOn = false
    console.log('Light is OFF')
  }

  getState(): boolean {
    return this.isOn
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn()
  }

  undo(): void {
    this.light.turnOff()
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff()
  }

  undo(): void {
    this.light.turnOn()
  }
}

class RemoteControl {
  private commands: Command[] = []
  private currentCommand: number = -1

  setCommand(command: Command): void {
    this.commands.push(command)
    this.currentCommand = this.commands.length - 1
  }

  pressButton(): void {
    if (this.currentCommand >= 0) {
      this.commands[this.currentCommand].execute()
    }
  }

  pressUndo(): void {
    if (this.currentCommand >= 0) {
      this.commands[this.currentCommand].undo()
      this.currentCommand--
    }
  }
}
```

## 4. State Pattern / State Machine

### Description
Le pattern State permet à un objet de modifier son comportement lorsque son état interne change.

### Exemple - TypeScript
```typescript
interface State {
  handle(context: Context): void
}

class Context {
  private state: State

  constructor(state: State) {
    this.state = state
  }

  setState(state: State): void {
    this.state = state
  }

  request(): void {
    this.state.handle(this)
  }
}

class ConcreteStateA implements State {
  handle(context: Context): void {
    console.log('Handling in State A')
    context.setState(new ConcreteStateB())
  }
}

class ConcreteStateB implements State {
  handle(context: Context): void {
    console.log('Handling in State B')
    context.setState(new ConcreteStateA())
  }
}

// Exemple d'utilisation
const context = new Context(new ConcreteStateA())
context.request() // Handles in State A, switches to State B
context.request() // Handles in State B, switches to State A
```

### Exemple - State Machine Avancée
```typescript
enum OrderState {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

class OrderStateMachine {
  private state: OrderState = OrderState.PENDING
  private transitions: Map<OrderState, OrderState[]> = new Map()

  constructor() {
    this.transitions.set(OrderState.PENDING, [OrderState.CONFIRMED, OrderState.CANCELLED])
    this.transitions.set(OrderState.CONFIRMED, [OrderState.SHIPPED, OrderState.CANCELLED])
    this.transitions.set(OrderState.SHIPPED, [OrderState.DELIVERED])
    this.transitions.set(OrderState.DELIVERED, [])
    this.transitions.set(OrderState.CANCELLED, [])
  }

  canTransitionTo(newState: OrderState): boolean {
    const allowedTransitions = this.transitions.get(this.state) || []
    return allowedTransitions.includes(newState)
  }

  transitionTo(newState: OrderState): boolean {
    if (this.canTransitionTo(newState)) {
      console.log(`Transitioning from ${this.state} to ${newState}`)
      this.state = newState
      return true
    }
    console.log(`Cannot transition from ${this.state} to ${newState}`)
    return false
  }

  getCurrentState(): OrderState {
    return this.state
  }
}
```

## 5. Template Method Pattern

### Description
Le pattern Template Method définit le squelette d'un algorithme dans une méthode, en reportant certaines étapes aux sous-classes.

### Exemple - TypeScript
```typescript
abstract class DataProcessor {
  // Template method
  public process(data: any[]): any[] {
    const validatedData = this.validate(data)
    const transformedData = this.transform(validatedData)
    const filteredData = this.filter(transformedData)
    return this.sort(filteredData)
  }

  protected validate(data: any[]): any[] {
    console.log('Validating data...')
    return data.filter(item => item != null)
  }

  protected abstract transform(data: any[]): any[]
  protected abstract filter(data: any[]): any[]

  protected sort(data: any[]): any[] {
    console.log('Sorting data...')
    return data.sort()
  }
}

class UserDataProcessor extends DataProcessor {
  protected transform(data: any[]): any[] {
    console.log('Transforming user data...')
    return data.map(user => ({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
      processedAt: new Date()
    }))
  }

  protected filter(data: any[]): any[] {
    console.log('Filtering active users...')
    return data.filter(user => user.isActive)
  }
}

class ProductDataProcessor extends DataProcessor {
  protected transform(data: any[]): any[] {
    console.log('Transforming product data...')
    return data.map(product => ({
      ...product,
      priceWithTax: product.price * 1.2,
      processedAt: new Date()
    }))
  }

  protected filter(data: any[]): any[] {
    console.log('Filtering available products...')
    return data.filter(product => product.stock > 0)
  }
}
```

## 6. Chain of Responsibility Pattern

### Description
Le pattern Chain of Responsibility évite le couplage entre l'expéditeur et le récepteur d'une demande en donnant à plusieurs objets la possibilité de traiter la demande.

### Exemple - TypeScript
```typescript
abstract class Handler {
  protected nextHandler?: Handler

  setNext(handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }

  handle(request: any): any {
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }
    return null
  }
}

class AuthenticationHandler extends Handler {
  handle(request: any): any {
    if (request.token) {
      console.log('Authentication successful')
      return super.handle(request)
    }
    console.log('Authentication failed')
    return null
  }
}

class AuthorizationHandler extends Handler {
  handle(request: any): any {
    if (request.role === 'admin') {
      console.log('Authorization successful')
      return super.handle(request)
    }
    console.log('Authorization failed')
    return null
  }
}

class ValidationHandler extends Handler {
  handle(request: any): any {
    if (request.data && request.data.length > 0) {
      console.log('Validation successful')
      return super.handle(request)
    }
    console.log('Validation failed')
    return null
  }
}

class BusinessLogicHandler extends Handler {
  handle(request: any): any {
    console.log('Processing business logic...')
    return { result: 'Success', data: request.data }
  }
}

// Utilisation
const authHandler = new AuthenticationHandler()
const authzHandler = new AuthorizationHandler()
const validationHandler = new ValidationHandler()
const businessHandler = new BusinessLogicHandler()

authHandler
  .setNext(authzHandler)
  .setNext(validationHandler)
  .setNext(businessHandler)

const request = {
  token: 'valid-token',
  role: 'admin',
  data: ['item1', 'item2']
}

const result = authHandler.handle(request)
```

## 7. Mediator Pattern

### Description
Le pattern Mediator définit comment un ensemble d'objets interagit. Il favorise le couplage faible en empêchant les objets de se référencer explicitement les uns les autres.

### Exemple - TypeScript
```typescript
interface Mediator {
  notify(sender: Component, event: string): void
}

abstract class Component {
  protected mediator: Mediator

  constructor(mediator: Mediator) {
    this.mediator = mediator
  }
}

class Button extends Component {
  click(): void {
    this.mediator.notify(this, 'click')
  }
}

class TextBox extends Component {
  private text: string = ''

  setText(text: string): void {
    this.text = text
    this.mediator.notify(this, 'textChanged')
  }

  getText(): string {
    return this.text
  }
}

class CheckBox extends Component {
  private checked: boolean = false

  check(): void {
    this.checked = true
    this.mediator.notify(this, 'checked')
  }

  uncheck(): void {
    this.checked = false
    this.mediator.notify(this, 'unchecked')
  }

  isChecked(): boolean {
    return this.checked
  }
}

class DialogMediator implements Mediator {
  private button: Button
  private textBox: TextBox
  private checkBox: CheckBox

  constructor(button: Button, textBox: TextBox, checkBox: CheckBox) {
    this.button = button
    this.textBox = textBox
    this.checkBox = checkBox
  }

  notify(sender: Component, event: string): void {
    if (sender === this.button && event === 'click') {
      if (this.checkBox.isChecked()) {
        console.log(`Processing text: ${this.textBox.getText()}`)
      } else {
        console.log('Checkbox must be checked to process text')
      }
    }

    if (sender === this.checkBox && event === 'checked') {
      this.button.click()
    }
  }
}
```

## 8. Memento Pattern

### Description
Le pattern Memento capture et externalise l'état interne d'un objet sans violer l'encapsulation.

### Exemple - TypeScript
```typescript
class Memento {
  constructor(private state: string) {}

  getState(): string {
    return this.state
  }
}

class Originator {
  private state: string = ''

  setState(state: string): void {
    this.state = state
  }

  getState(): string {
    return this.state
  }

  saveStateToMemento(): Memento {
    return new Memento(this.state)
  }

  getStateFromMemento(memento: Memento): void {
    this.state = memento.getState()
  }
}

class Caretaker {
  private mementos: Memento[] = []

  add(memento: Memento): void {
    this.mementos.push(memento)
  }

  get(index: number): Memento {
    return this.mementos[index]
  }
}

// Utilisation
const originator = new Originator()
const caretaker = new Caretaker()

originator.setState('State #1')
caretaker.add(originator.saveStateToMemento())

originator.setState('State #2')
caretaker.add(originator.saveStateToMemento())

originator.setState('State #3')
console.log(`Current State: ${originator.getState()}`)

originator.getStateFromMemento(caretaker.get(0))
console.log(`First saved State: ${originator.getState()}`)

originator.getStateFromMemento(caretaker.get(1))
console.log(`Second saved State: ${originator.getState()}`)
```

## 9. Iterator Pattern / Generator Pattern

### Description
Le pattern Iterator fournit un moyen d'accéder séquentiellement aux éléments d'un objet agrégé sans exposer sa représentation sous-jacente.

### Exemple - TypeScript
```typescript
interface Iterator<T> {
  hasNext(): boolean
  next(): T
}

interface Iterable<T> {
  createIterator(): Iterator<T>
}

class ConcreteIterator<T> implements Iterator<T> {
  private index: number = 0

  constructor(private collection: T[]) {}

  hasNext(): boolean {
    return this.index < this.collection.length
  }

  next(): T {
    if (this.hasNext()) {
      return this.collection[this.index++]
    }
    throw new Error('No more elements')
  }
}

class ConcreteCollection<T> implements Iterable<T> {
  private items: T[] = []

  addItem(item: T): void {
    this.items.push(item)
  }

  createIterator(): Iterator<T> {
    return new ConcreteIterator(this.items)
  }
}

// Exemple avec Generator
function* numberGenerator(start: number, end: number): Generator<number> {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

function* fibonacciGenerator(): Generator<number> {
  let a = 0, b = 1
  while (true) {
    yield a
    ;[a, b] = [b, a + b]
  }
}

// Utilisation
const collection = new ConcreteCollection<string>()
collection.addItem('Item 1')
collection.addItem('Item 2')
collection.addItem('Item 3')

const iterator = collection.createIterator()
while (iterator.hasNext()) {
  console.log(iterator.next())
}

// Utilisation des générateurs
for (const num of numberGenerator(1, 5)) {
  console.log(num)
}

const fib = fibonacciGenerator()
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value)
}
```

## 10. Visitor Pattern

### Description
Le pattern Visitor représente une opération à effectuer sur les éléments d'une structure d'objets. Il permet de définir une nouvelle opération sans changer les classes des éléments sur lesquels elle opère.

### Exemple - TypeScript
```typescript
interface Element {
  accept(visitor: Visitor): void
}

interface Visitor {
  visitConcreteElementA(element: ConcreteElementA): void
  visitConcreteElementB(element: ConcreteElementB): void
}

class ConcreteElementA implements Element {
  accept(visitor: Visitor): void {
    visitor.visitConcreteElementA(this)
  }

  operationA(): string {
    return 'ConcreteElementA'
  }
}

class ConcreteElementB implements Element {
  accept(visitor: Visitor): void {
    visitor.visitConcreteElementB(this)
  }

  operationB(): string {
    return 'ConcreteElementB'
  }
}

class ConcreteVisitor1 implements Visitor {
  visitConcreteElementA(element: ConcreteElementA): void {
    console.log(`Visitor1: ${element.operationA()}`)
  }

  visitConcreteElementB(element: ConcreteElementB): void {
    console.log(`Visitor1: ${element.operationB()}`)
  }
}

class ConcreteVisitor2 implements Visitor {
  visitConcreteElementA(element: ConcreteElementA): void {
    console.log(`Visitor2: ${element.operationA()}`)
  }

  visitConcreteElementB(element: ConcreteElementB): void {
    console.log(`Visitor2: ${element.operationB()}`)
  }
}

class ObjectStructure {
  private elements: Element[] = []

  add(element: Element): void {
    this.elements.push(element)
  }

  accept(visitor: Visitor): void {
    this.elements.forEach(element => element.accept(visitor))
  }
}
```

## 11. Reactive Programming Pattern

### Description
Le pattern Reactive Programming traite les flux de données et la propagation des changements de manière asynchrone et non-bloquante.

### Exemple - TypeScript avec RxJS
```typescript
import { Observable, Subject, BehaviorSubject, fromEvent, interval, map, filter, debounceTime, switchMap } from 'rxjs'

// Observable simple
const numberObservable = new Observable<number>(subscriber => {
  let count = 0
  const interval = setInterval(() => {
    subscriber.next(count++)
    if (count > 5) {
      subscriber.complete()
    }
  }, 1000)

  return () => clearInterval(interval)
})

// Subject pour la communication
class EventBus {
  private subject = new Subject<any>()

  emit(event: string, data: any): void {
    this.subject.next({ event, data })
  }

  on(event: string): Observable<any> {
    return this.subject.pipe(
      filter(({ event: e }) => e === event),
      map(({ data }) => data)
    )
  }
}

// BehaviorSubject pour l'état
class StateManager {
  private state = new BehaviorSubject<any>({})

  getState(): Observable<any> {
    return this.state.asObservable()
  }

  updateState(newState: any): void {
    this.state.next({ ...this.state.value, ...newState })
  }

  getCurrentState(): any {
    return this.state.value
  }
}

// Exemple d'utilisation avec recherche en temps réel
class SearchService {
  private searchSubject = new Subject<string>()

  search(query: string): void {
    this.searchSubject.next(query)
  }

  getSearchResults(): Observable<any[]> {
    return this.searchSubject.pipe(
      debounceTime(300),
      filter(query => query.length > 2),
      switchMap(query => this.performSearch(query))
    )
  }

  private performSearch(query: string): Observable<any[]> {
    // Simulation d'une recherche API
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next([
          { id: 1, title: `Result for ${query}` },
          { id: 2, title: `Another result for ${query}` }
        ])
        subscriber.complete()
      }, 500)
    })
  }
}
```

## 12. Saga Pattern

### Description
Le pattern Saga gère les transactions distribuées en décomposant une transaction globale en une série de transactions locales avec des mécanismes de compensation.

### Exemple - TypeScript
```typescript
interface SagaStep {
  execute(): Promise<void>
  compensate(): Promise<void>
}

interface SagaOrchestrator {
  execute(): Promise<void>
  compensate(): Promise<void>
}

class OrderSagaStep implements SagaStep {
  constructor(private orderId: string) {}

  async execute(): Promise<void> {
    console.log(`Creating order ${this.orderId}`)
    // Logique de création de commande
  }

  async compensate(): Promise<void> {
    console.log(`Cancelling order ${this.orderId}`)
    // Logique d'annulation de commande
  }
}

class PaymentSagaStep implements SagaStep {
  constructor(private orderId: string, private amount: number) {}

  async execute(): Promise<void> {
    console.log(`Processing payment for order ${this.orderId}: $${this.amount}`)
    // Logique de traitement du paiement
  }

  async compensate(): Promise<void> {
    console.log(`Refunding payment for order ${this.orderId}`)
    // Logique de remboursement
  }
}

class InventorySagaStep implements SagaStep {
  constructor(private orderId: string, private items: string[]) {}

  async execute(): Promise<void> {
    console.log(`Reserving inventory for order ${this.orderId}: ${this.items.join(', ')}`)
    // Logique de réservation d'inventaire
  }

  async compensate(): Promise<void> {
    console.log(`Releasing inventory for order ${this.orderId}`)
    // Logique de libération d'inventaire
  }
}

class OrderSagaOrchestrator implements SagaOrchestrator {
  private steps: SagaStep[] = []
  private executedSteps: SagaStep[] = []

  constructor(orderId: string, amount: number, items: string[]) {
    this.steps = [
      new OrderSagaStep(orderId),
      new PaymentSagaStep(orderId, amount),
      new InventorySagaStep(orderId, items)
    ]
  }

  async execute(): Promise<void> {
    try {
      for (const step of this.steps) {
        await step.execute()
        this.executedSteps.push(step)
      }
      console.log('Saga completed successfully')
    } catch (error) {
      console.error('Saga failed, starting compensation:', error)
      await this.compensate()
    }
  }

  async compensate(): Promise<void> {
    // Compensation dans l'ordre inverse
    for (let i = this.executedSteps.length - 1; i >= 0; i--) {
      try {
        await this.executedSteps[i].compensate()
      } catch (error) {
        console.error('Compensation failed:', error)
      }
    }
  }
}
```

## 13. Sentinel Pattern

### Description
Le pattern Sentinel utilise des valeurs sentinelles pour marquer la fin d'une séquence ou pour indiquer des conditions spéciales.

### Exemple - TypeScript
```typescript
// Sentinel pour terminaison de liste
class SentinelLinkedList<T> {
  private head: Node<T> | null = null
  private sentinel: Node<T>

  constructor() {
    this.sentinel = new Node(null as T)
    this.head = this.sentinel
  }

  add(value: T): void {
    const newNode = new Node(value)
    newNode.next = this.head
    this.head = newNode
  }

  find(value: T): Node<T> | null {
    let current = this.head
    while (current !== this.sentinel) {
      if (current.value === value) {
        return current
      }
      current = current.next
    }
    return null
  }

  display(): void {
    let current = this.head
    while (current !== this.sentinel) {
      console.log(current.value)
      current = current.next
    }
  }
}

class Node<T> {
  constructor(
    public value: T,
    public next: Node<T> | null = null
  ) {}
}

// Sentinel pour validation
class ValidationSentinel {
  static readonly INVALID_EMAIL = 'INVALID_EMAIL'
  static readonly INVALID_PHONE = 'INVALID_PHONE'
  static readonly INVALID_AGE = 'INVALID_AGE'

  static validateUser(user: any): string | null {
    if (!this.isValidEmail(user.email)) {
      return this.INVALID_EMAIL
    }
    if (!this.isValidPhone(user.phone)) {
      return this.INVALID_PHONE
    }
    if (!this.isValidAge(user.age)) {
      return this.INVALID_AGE
    }
    return null // Pas d'erreur
  }

  private static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  private static isValidPhone(phone: string): boolean {
    return /^\+?[\d\s-()]+$/.test(phone)
  }

  private static isValidAge(age: number): boolean {
    return age >= 0 && age <= 150
  }
}

// Sentinel pour recherche
class SearchSentinel {
  static readonly NOT_FOUND = -1

  static binarySearch(arr: number[], target: number): number {
    let left = 0
    let right = arr.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      
      if (arr[mid] === target) {
        return mid
      } else if (arr[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    return this.NOT_FOUND
  }
}
```

## Bonnes Pratiques

1. **Choisir le bon pattern** : Utiliser le pattern approprié selon le contexte
2. **Éviter la sur-ingénierie** : Ne pas appliquer des patterns inutilement
3. **Documenter les patterns** : Expliquer pourquoi un pattern est utilisé
4. **Tester les patterns** : S'assurer que les patterns fonctionnent correctement
5. **Considérer les alternatives** : Évaluer d'autres solutions possibles

## Pièges à Éviter

1. **Observer Pattern** : Attention aux fuites mémoire avec les observateurs
2. **State Pattern** : Éviter les transitions d'état invalides
3. **Command Pattern** : Gérer correctement l'annulation des commandes
4. **Chain of Responsibility** : S'assurer qu'une demande est toujours traitée
5. **Mediator Pattern** : Éviter que le médiateur devienne trop complexe

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
