# 📝 Standards de Code : Conventions et Bonnes Pratiques

## 📋 Table des matières
- [Introduction](#introduction)
- [Conventions de nommage](#conventions-de-nommage)
- [Principes SOLID et Clean Code](#principes-solid-et-clean-code)
- [Documentation du code](#documentation-du-code)
- [Configuration des outils](#configuration-des-outils)
- [Exemples concrets](#exemples-concrets)
- [Templates de configuration](#templates-de-configuration)
- [Checklist de validation](#checklist-de-validation)
- [Ressources](#ressources)

## 🎯 Introduction

Les standards de code définissent les conventions, les bonnes pratiques et les outils qui garantissent la cohérence, la lisibilité et la maintenabilité du code dans un projet de développement.

### 🎯 Objectifs

- **Établir** des conventions de nommage cohérentes
- **Appliquer** les principes SOLID et Clean Code
- **Documenter** le code de manière efficace
- **Configurer** les outils de formatage et de linting
- **Maintenir** la qualité et la cohérence du code

---

## 🏷️ Conventions de nommage

### 📝 Conventions générales

#### Variables et fonctions

**camelCase**
```typescript
// Variables
const userName = 'john_doe'
const userEmail = 'john@example.com'
const isActive = true
const userCount = 42

// Fonctions
function getUserById(id: string): User {
  // Implementation
}

function calculateTotalPrice(items: Item[]): number {
  // Implementation
}

function isValidEmail(email: string): boolean {
  // Implementation
}
```

**PascalCase**
```typescript
// Classes
class UserService {
  // Implementation
}

class EmailValidator {
  // Implementation
}

class PaymentProcessor {
  // Implementation
}

// Interfaces
interface User {
  id: string
  name: string
  email: string
}

interface OrderItem {
  productId: string
  quantity: number
  price: number
}

// Types
type UserRole = 'admin' | 'user' | 'guest'
type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered'
```

**kebab-case**
```typescript
// Fichiers et dossiers
// user-service.ts
// email-validator.ts
// payment-processor.ts

// URLs et routes
const routes = {
  '/user-profile': UserProfilePage,
  '/order-history': OrderHistoryPage,
  '/payment-methods': PaymentMethodsPage
}

// Classes CSS
const cssClasses = {
  'user-card': 'user-card',
  'order-item': 'order-item',
  'payment-form': 'payment-form'
}
```

**SCREAMING_SNAKE_CASE**
```typescript
// Constantes
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_ATTEMPTS = 3
const DEFAULT_PAGE_SIZE = 20
const JWT_EXPIRES_IN = '1h'

// Configuration
const DATABASE_CONFIG = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  NAME: process.env.DB_NAME
}
```

### 📝 Conventions spécifiques

#### Frontend (Vue.js/React)

**Composants Vue.js**
```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card">
    <img :src="user.avatar" :alt="user.name" class="user-card__avatar" />
    <div class="user-card__info">
      <h3 class="user-card__name">{{ user.name }}</h3>
      <p class="user-card__email">{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  user: User
}

const props = defineProps<Props>()
</script>

<style scoped>
.user-card {
  /* Styles */
}

.user-card__avatar {
  /* Styles */
}

.user-card__info {
  /* Styles */
}

.user-card__name {
  /* Styles */
}

.user-card__email {
  /* Styles */
}
</style>
```

**Composants React**
```tsx
// UserCard.tsx
import React from 'react'

interface UserCardProps {
  user: User
  onEdit: (user: User) => void
  onDelete: (userId: string) => void
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} className="user-card__avatar" />
      <div className="user-card__info">
        <h3 className="user-card__name">{user.name}</h3>
        <p className="user-card__email">{user.email}</p>
      </div>
      <div className="user-card__actions">
        <button onClick={() => onEdit(user)} className="btn btn--primary">
          Edit
        </button>
        <button onClick={() => onDelete(user.id)} className="btn btn--danger">
          Delete
        </button>
      </div>
    </div>
  )
}
```

#### Backend (NestJS)

**Controllers**
```typescript
// user.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id)
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id)
  }
}
```

**Services**
```typescript
// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id)
    return this.userRepository.update(id, updateUserDto)
  }

  async delete(id: string): Promise<void> {
    await this.findById(id)
    return this.userRepository.delete(id)
  }
}
```

**DTOs**
```typescript
// dto/user.dto.ts
import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsString()
  @MinLength(8)
  password: string
}

export class UpdateUserDto {
  @ApiProperty({ description: 'User name', example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string

  @ApiProperty({ description: 'User email', example: 'john@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string
}
```

---

## 🏗️ Principes SOLID et Clean Code

### 📝 Principes SOLID

#### Single Responsibility Principle (SRP)

**Principe**
Une classe ne doit avoir qu'une seule raison de changer.

**Exemple incorrect**
```typescript
// ❌ Mauvaise pratique - Multiple responsabilités
class User {
  constructor(
    private name: string,
    private email: string,
    private password: string
  ) {}

  // Responsabilité 1: Gestion des données utilisateur
  getName(): string {
    return this.name
  }

  getEmail(): string {
    return this.email
  }

  // Responsabilité 2: Validation (ne devrait pas être ici)
  validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(this.email)
  }

  // Responsabilité 3: Persistance (ne devrait pas être ici)
  save(): Promise<void> {
    return fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(this)
    })
  }

  // Responsabilité 4: Envoi d'email (ne devrait pas être ici)
  sendWelcomeEmail(): Promise<void> {
    return fetch('/api/emails', {
      method: 'POST',
      body: JSON.stringify({ to: this.email, template: 'welcome' })
    })
  }
}
```

**Exemple correct**
```typescript
// ✅ Bonne pratique - Responsabilité unique
class User {
  constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly password: string
  ) {}

  getName(): string {
    return this.name
  }

  getEmail(): string {
    return this.email
  }

  getPassword(): string {
    return this.password
  }
}

class EmailValidator {
  static validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

class UserRepository {
  async save(user: User): Promise<void> {
    return fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    })
  }
}

class EmailService {
  async sendWelcomeEmail(email: string): Promise<void> {
    return fetch('/api/emails', {
      method: 'POST',
      body: JSON.stringify({ to: email, template: 'welcome' })
    })
  }
}
```

#### Open/Closed Principle (OCP)

**Principe**
Les entités doivent être ouvertes à l'extension mais fermées à la modification.

**Exemple incorrect**
```typescript
// ❌ Mauvaise pratique - Modification nécessaire pour chaque nouveau type
class PaymentProcessor {
  processPayment(amount: number, paymentType: string): void {
    if (paymentType === 'credit_card') {
      // Logique pour carte de crédit
      console.log(`Processing credit card payment: $${amount}`)
    } else if (paymentType === 'paypal') {
      // Logique pour PayPal
      console.log(`Processing PayPal payment: $${amount}`)
    } else if (paymentType === 'stripe') {
      // Logique pour Stripe
      console.log(`Processing Stripe payment: $${amount}`)
    }
    // Il faut modifier cette classe pour ajouter de nouveaux types
  }
}
```

**Exemple correct**
```typescript
// ✅ Bonne pratique - Ouvert à l'extension, fermé à la modification
interface PaymentStrategy {
  processPayment(amount: number): Promise<void>
}

class CreditCardPayment implements PaymentStrategy {
  async processPayment(amount: number): Promise<void> {
    console.log(`Processing credit card payment: $${amount}`)
    // Logique spécifique à la carte de crédit
  }
}

class PayPalPayment implements PaymentStrategy {
  async processPayment(amount: number): Promise<void> {
    console.log(`Processing PayPal payment: $${amount}`)
    // Logique spécifique à PayPal
  }
}

class StripePayment implements PaymentStrategy {
  async processPayment(amount: number): Promise<void> {
    console.log(`Processing Stripe payment: $${amount}`)
    // Logique spécifique à Stripe
  }
}

class PaymentProcessor {
  constructor(private paymentStrategy: PaymentStrategy) {}

  async processPayment(amount: number): Promise<void> {
    await this.paymentStrategy.processPayment(amount)
  }

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy
  }
}

// Utilisation
const processor = new PaymentProcessor(new CreditCardPayment())
await processor.processPayment(100)

// Extension sans modification
processor.setPaymentStrategy(new PayPalPayment())
await processor.processPayment(100)
```

#### Liskov Substitution Principle (LSP)

**Principe**
Les objets d'une classe dérivée doivent pouvoir remplacer les objets de la classe de base sans altérer le comportement du programme.

**Exemple incorrect**
```typescript
// ❌ Mauvaise pratique - Violation du LSP
class Bird {
  fly(): void {
    console.log('Flying...')
  }
}

class Eagle extends Bird {
  fly(): void {
    console.log('Eagle flying...')
  }
}

class Penguin extends Bird {
  fly(): void {
    throw new Error('Penguins cannot fly!')
  }
}

// Problème: Un Penguin ne peut pas remplacer un Bird
function makeBirdFly(bird: Bird): void {
  bird.fly() // Cela échouera pour un Penguin
}
```

**Exemple correct**
```typescript
// ✅ Bonne pratique - Respect du LSP
interface Flyable {
  fly(): void
}

interface Swimmable {
  swim(): void
}

class Bird {
  eat(): void {
    console.log('Eating...')
  }
}

class Eagle extends Bird implements Flyable {
  fly(): void {
    console.log('Eagle flying...')
  }
}

class Penguin extends Bird implements Swimmable {
  swim(): void {
    console.log('Penguin swimming...')
  }
}

// Utilisation correcte
function makeFlyableBirdFly(bird: Flyable): void {
  bird.fly()
}

function makeSwimmableBirdSwim(bird: Swimmable): void {
  bird.swim()
}
```

#### Interface Segregation Principle (ISP)

**Principe**
Les clients ne doivent pas dépendre d'interfaces qu'ils n'utilisent pas.

**Exemple incorrect**
```typescript
// ❌ Mauvaise pratique - Interface trop large
interface Worker {
  work(): void
  eat(): void
  sleep(): void
}

class Human implements Worker {
  work(): void {
    console.log('Human working...')
  }

  eat(): void {
    console.log('Human eating...')
  }

  sleep(): void {
    console.log('Human sleeping...')
  }
}

class Robot implements Worker {
  work(): void {
    console.log('Robot working...')
  }

  eat(): void {
    throw new Error('Robots cannot eat!')
  }

  sleep(): void {
    throw new Error('Robots cannot sleep!')
  }
}
```

**Exemple correct**
```typescript
// ✅ Bonne pratique - Interfaces séparées
interface Workable {
  work(): void
}

interface Eatable {
  eat(): void
}

interface Sleepable {
  sleep(): void
}

class Human implements Workable, Eatable, Sleepable {
  work(): void {
    console.log('Human working...')
  }

  eat(): void {
    console.log('Human eating...')
  }

  sleep(): void {
    console.log('Human sleeping...')
  }
}

class Robot implements Workable {
  work(): void {
    console.log('Robot working...')
  }
}

// Utilisation
function makeWork(worker: Workable): void {
  worker.work()
}

function makeEat(eater: Eatable): void {
  eater.eat()
}
```

#### Dependency Inversion Principle (DIP)

**Principe**
Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau. Les deux doivent dépendre d'abstractions.

**Exemple incorrect**
```typescript
// ❌ Mauvaise pratique - Dépendance directe
class EmailService {
  sendEmail(to: string, message: string): void {
    console.log(`Sending email to ${to}: ${message}`)
  }
}

class UserService {
  private emailService: EmailService

  constructor() {
    this.emailService = new EmailService() // Dépendance directe
  }

  createUser(name: string, email: string): void {
    // Logique de création d'utilisateur
    this.emailService.sendEmail(email, 'Welcome!')
  }
}
```

**Exemple correct**
```typescript
// ✅ Bonne pratique - Inversion de dépendance
interface EmailService {
  sendEmail(to: string, message: string): Promise<void>
}

class SmtpEmailService implements EmailService {
  async sendEmail(to: string, message: string): Promise<void> {
    console.log(`Sending SMTP email to ${to}: ${message}`)
  }
}

class SendGridEmailService implements EmailService {
  async sendEmail(to: string, message: string): Promise<void> {
    console.log(`Sending SendGrid email to ${to}: ${message}`)
  }
}

class UserService {
  constructor(private emailService: EmailService) {}

  async createUser(name: string, email: string): Promise<void> {
    // Logique de création d'utilisateur
    await this.emailService.sendEmail(email, 'Welcome!')
  }
}

// Injection de dépendance
const emailService = new SmtpEmailService()
const userService = new UserService(emailService)
```

### 📝 Clean Code

#### Noms significatifs

**Exemple incorrect**
```typescript
// ❌ Mauvaise pratique - Noms non significatifs
function calc(a: number, b: number): number {
  return a * b
}

const d = new Date()
const u = getUserById(1)
const p = getProductById(1)
```

**Exemple correct**
```typescript
// ✅ Bonne pratique - Noms significatifs
function calculateTotalPrice(price: number, quantity: number): number {
  return price * quantity
}

const currentDate = new Date()
const user = getUserById(1)
const product = getProductById(1)
```

#### Fonctions petites et focalisées

**Exemple incorrect**
```typescript
// ❌ Mauvaise pratique - Fonction trop longue et complexe
function processOrder(order: Order): void {
  // Validation
  if (!order.userId) {
    throw new Error('User ID is required')
  }
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items')
  }
  if (order.total <= 0) {
    throw new Error('Order total must be positive')
  }

  // Calcul du total
  let calculatedTotal = 0
  for (const item of order.items) {
    calculatedTotal += item.price * item.quantity
  }
  if (calculatedTotal !== order.total) {
    throw new Error('Order total does not match calculated total')
  }

  // Vérification du stock
  for (const item of order.items) {
    const product = getProductById(item.productId)
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product ${item.productId}`)
    }
  }

  // Sauvegarde
  saveOrder(order)

  // Envoi d'email
  const user = getUserById(order.userId)
  sendEmail(user.email, 'Order confirmed', `Your order ${order.id} has been confirmed`)

  // Mise à jour du stock
  for (const item of order.items) {
    const product = getProductById(item.productId)
    product.stock -= item.quantity
    saveProduct(product)
  }
}
```

**Exemple correct**
```typescript
// ✅ Bonne pratique - Fonctions petites et focalisées
function processOrder(order: Order): void {
  validateOrder(order)
  verifyStockAvailability(order.items)
  saveOrder(order)
  sendOrderConfirmationEmail(order)
  updateProductStock(order.items)
}

function validateOrder(order: Order): void {
  if (!order.userId) {
    throw new Error('User ID is required')
  }
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items')
  }
  if (order.total <= 0) {
    throw new Error('Order total must be positive')
  }
  validateOrderTotal(order)
}

function validateOrderTotal(order: Order): void {
  const calculatedTotal = calculateOrderTotal(order.items)
  if (calculatedTotal !== order.total) {
    throw new Error('Order total does not match calculated total')
  }
}

function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

function verifyStockAvailability(items: OrderItem[]): void {
  for (const item of items) {
    const product = getProductById(item.productId)
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product ${item.productId}`)
    }
  }
}

function sendOrderConfirmationEmail(order: Order): void {
  const user = getUserById(order.userId)
  const message = `Your order ${order.id} has been confirmed`
  sendEmail(user.email, 'Order confirmed', message)
}

function updateProductStock(items: OrderItem[]): void {
  for (const item of items) {
    const product = getProductById(item.productId)
    product.stock -= item.quantity
    saveProduct(product)
  }
}
```

#### Éviter les commentaires inutiles

**Exemple incorrect**
```typescript
// ❌ Mauvaise pratique - Commentaires inutiles
// Fonction qui calcule le total
function calculateTotal(items: Item[]): number {
  let total = 0 // Initialiser le total à 0
  for (const item of items) { // Parcourir chaque item
    total += item.price // Ajouter le prix au total
  }
  return total // Retourner le total
}

// Vérifier si l'utilisateur est actif
function isUserActive(user: User): boolean {
  return user.status === 'active' // Retourner true si le statut est actif
}
```

**Exemple correct**
```typescript
// ✅ Bonne pratique - Code auto-documenté
function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce((total, item) => total + item.price, 0)
}

function isUserActive(user: User): boolean {
  return user.status === 'active'
}

// Commentaire utile pour expliquer la logique métier complexe
function calculateDiscountPrice(price: number, user: User): number {
  // Les utilisateurs premium ont 20% de réduction
  // Les utilisateurs avec plus de 10 commandes ont 10% de réduction
  if (user.isPremium) {
    return price * 0.8
  }
  if (user.orderCount > 10) {
    return price * 0.9
  }
  return price
}
```

---

## 📚 Documentation du code

### 📝 JSDoc/TSDoc

#### Documentation des fonctions

```typescript
/**
 * Calcule le prix total d'une commande en appliquant les remises
 * @param items - Les articles de la commande
 * @param user - L'utilisateur qui passe la commande
 * @param discountCode - Code de réduction optionnel
 * @returns Le prix total calculé avec les remises appliquées
 * @throws {Error} Si le code de réduction est invalide
 * @example
 * ```typescript
 * const items = [
 *   { price: 100, quantity: 2 },
 *   { price: 50, quantity: 1 }
 * ]
 * const user = { isPremium: true, orderCount: 5 }
 * const total = calculateOrderTotal(items, user, 'SAVE10')
 * console.log(total) // 225 (250 - 10% de réduction premium)
 * ```
 */
function calculateOrderTotal(
  items: OrderItem[],
  user: User,
  discountCode?: string
): number {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  
  if (discountCode && !isValidDiscountCode(discountCode)) {
    throw new Error(`Invalid discount code: ${discountCode}`)
  }
  
  let discount = 0
  if (user.isPremium) {
    discount = subtotal * 0.1 // 10% de réduction premium
  } else if (discountCode) {
    discount = subtotal * 0.05 // 5% de réduction avec code
  }
  
  return subtotal - discount
}
```

#### Documentation des classes

```typescript
/**
 * Service de gestion des utilisateurs
 * 
 * Ce service fournit toutes les opérations CRUD pour les utilisateurs,
 * incluant la validation, l'authentification et la gestion des rôles.
 * 
 * @example
 * ```typescript
 * const userService = new UserService(userRepository, emailService)
 * const user = await userService.createUser({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'password123'
 * })
 * ```
 */
class UserService {
  /**
   * Crée un nouvel utilisateur
   * @param userData - Données de l'utilisateur à créer
   * @returns L'utilisateur créé avec l'ID généré
   * @throws {ValidationError} Si les données sont invalides
   * @throws {ConflictError} Si l'email existe déjà
   */
  async createUser(userData: CreateUserDto): Promise<User> {
    // Implementation
  }

  /**
   * Trouve un utilisateur par son ID
   * @param id - ID de l'utilisateur
   * @returns L'utilisateur trouvé
   * @throws {NotFoundError} Si l'utilisateur n'existe pas
   */
  async findUserById(id: string): Promise<User> {
    // Implementation
  }
}
```

#### Documentation des interfaces

```typescript
/**
 * Représente un utilisateur dans le système
 * 
 * @interface User
 */
interface User {
  /** Identifiant unique de l'utilisateur */
  id: string
  
  /** Nom complet de l'utilisateur */
  name: string
  
  /** Adresse email de l'utilisateur (unique) */
  email: string
  
  /** Mot de passe hashé de l'utilisateur */
  password: string
  
  /** Rôles de l'utilisateur dans le système */
  roles: UserRole[]
  
  /** Indique si l'utilisateur est actif */
  isActive: boolean
  
  /** Date de création de l'utilisateur */
  createdAt: Date
  
  /** Date de dernière mise à jour */
  updatedAt: Date
}

/**
 * Rôles disponibles pour les utilisateurs
 * 
 * @typedef {('admin' | 'user' | 'guest')} UserRole
 */
type UserRole = 'admin' | 'user' | 'guest'
```

### 📝 README et documentation

#### README de projet

```markdown
# E-commerce Application

Une application e-commerce moderne construite avec Vue.js, NestJS et PostgreSQL.

## 🚀 Fonctionnalités

- **Gestion des utilisateurs** : Inscription, connexion, profil
- **Catalogue de produits** : Recherche, filtrage, catégorisation
- **Panier et commandes** : Gestion du panier, processus de commande
- **Paiements** : Intégration Stripe pour les paiements sécurisés
- **Administration** : Interface d'administration complète

## 🛠️ Technologies

- **Frontend** : Vue.js 3, TypeScript, Vite, Pinia
- **Backend** : NestJS, TypeScript, Prisma, PostgreSQL
- **Infrastructure** : Docker, Kubernetes, GitHub Actions

## 📋 Prérequis

- Node.js 18+
- npm 8+
- Docker
- PostgreSQL 15+

## 🚀 Installation

1. Cloner le repository
```bash
git clone https://github.com/username/ecommerce-app.git
cd ecommerce-app
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer .env avec vos configurations
```

4. Démarrer les services
```bash
npm run setup
npm run dev
```

## 📖 Documentation

- [Guide d'architecture](./docs/architecture.md)
- [Documentation API](./docs/api.md)
- [Guide de déploiement](./docs/deployment.md)

## 🤝 Contribution

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les détails.

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](./LICENSE) pour plus de détails.
```

#### Documentation API

```markdown
# API Documentation

## Authentication

Toutes les routes protégées nécessitent un token JWT dans l'en-tête Authorization.

```bash
Authorization: Bearer <your-jwt-token>
```

## Users

### GET /api/users

Récupère la liste des utilisateurs.

**Query Parameters:**
- `page` (number): Numéro de page (défaut: 1)
- `limit` (number): Nombre d'éléments par page (défaut: 20)
- `search` (string): Terme de recherche

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "roles": ["user"],
      "createdAt": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### POST /api/users

Crée un nouvel utilisateur.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "roles": ["user"],
  "createdAt": "2023-01-01T00:00:00Z"
}
```
```

---

## ⚙️ Configuration des outils

### 📝 ESLint

#### Configuration ESLint TypeScript

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    
    // General
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Code style
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', 'never'],
    'keyword-spacing': 'error',
    'space-infix-ops': 'error'
  },
  overrides: [
    {
      files: ['*.test.ts', '*.spec.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ]
}
```

#### Configuration ESLint Vue.js

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Vue.js
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'error',
    'vue/no-unused-components': 'warn',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    
    // TypeScript
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // General
    'no-console': 'warn',
    'no-debugger': 'error'
  }
}
```

### 📝 Prettier

#### Configuration Prettier

```json
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "embeddedLanguageFormatting": "auto"
}
```

### 📝 Husky et lint-staged

#### Configuration Husky

```json
{
  "name": "ecommerce-project",
  "version": "1.0.0",
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint . --ext .ts,.vue,.js",
    "lint:fix": "eslint . --ext .ts,.vue,.js --fix",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "husky": "^8.0.3",
    "lint-staged": "^15.1.0",
    "eslint": "^8.53.0",
    "prettier": "^3.1.0"
  },
  "lint-staged": {
    "*.{ts,vue,js}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

#### Configuration Husky hooks

```bash
#!/bin/sh
# .husky/pre-commit
npx lint-staged
```

```bash
#!/bin/sh
# .husky/pre-push
npm run test
npm run build
```

---

## 💡 Exemples concrets

### 🏗️ Configuration complète d'un projet

#### Structure des fichiers de configuration

```
project/
├── .eslintrc.js
├── .eslintignore
├── .prettierrc
├── .prettierignore
├── .husky/
│   ├── pre-commit
│   └── pre-push
├── package.json
└── tsconfig.json
```

#### Configuration complète ESLint

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    
    // General
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-labels': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'yield-star-spacing': ['error', 'after'],
    
    // Code style
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', 'never'],
    'keyword-spacing': 'error',
    'space-infix-ops': 'error',
    'space-before-blocks': 'error',
    'space-in-parens': ['error', 'never'],
    'spaced-comment': ['error', 'always'],
    'key-spacing': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'func-call-spacing': 'error',
    'brace-style': 'error',
    'camelcase': 'error',
    'eol-last': 'error',
    'new-cap': 'error',
    'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-new-object': 'error',
    'no-trailing-spaces': 'error',
    'object-property-newline': 'error',
    'padded-blocks': ['error', 'never'],
    'quote-props': ['error', 'as-needed']
  },
  overrides: [
    {
      files: ['*.test.ts', '*.spec.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
}
```

#### Configuration complète Prettier

```json
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "embeddedLanguageFormatting": "auto",
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 120
      }
    },
    {
      "files": "*.md",
      "options": {
        "proseWrap": "always"
      }
    }
  ]
}
```

---

## 📋 Templates de configuration

### 🏗️ Template package.json

```json
{
  "name": "ecommerce-project",
  "version": "1.0.0",
  "description": "E-commerce application with Vue.js frontend and NestJS backend",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run start:dev",
    "dev:frontend": "cd frontend && npm run dev",
    "build": "npm run build:backend && npm run build:frontend",
    "build:backend": "cd backend && npm run build",
    "build:frontend": "cd frontend && npm run build",
    "test": "npm run test:backend && npm run test:frontend",
    "test:backend": "cd backend && npm run test",
    "test:frontend": "cd frontend && npm run test",
    "lint": "npm run lint:backend && npm run lint:frontend",
    "lint:backend": "cd backend && npm run lint",
    "lint:frontend": "cd frontend && npm run lint",
    "lint:fix": "npm run lint:fix:backend && npm run lint:fix:frontend",
    "lint:fix:backend": "cd backend && npm run lint:fix",
    "lint:fix:frontend": "cd frontend && npm run lint:fix",
    "format": "npm run format:backend && npm run format:frontend",
    "format:backend": "cd backend && npm run format",
    "format:frontend": "cd frontend && npm run format",
    "prepare": "husky install"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "cross-env": "^7.0.3",
    "husky": "^8.0.3",
    "lint-staged": "^15.1.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "lint-staged": {
    "*.{ts,vue,js}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

### 🏗️ Template .eslintignore

```gitignore
# Dependencies
node_modules/
dist/
build/

# Generated files
*.generated.*
*.d.ts

# Test files
*.test.ts
*.spec.ts

# Configuration files
*.config.js
*.config.ts

# Documentation
docs/
*.md

# Logs
logs/
*.log
```

### 🏗️ Template .prettierignore

```gitignore
# Dependencies
node_modules/
dist/
build/

# Generated files
*.generated.*
*.d.ts

# Package files
package-lock.json
yarn.lock

# Documentation
docs/
*.md

# Logs
logs/
*.log
```

---

## ✅ Checklist de validation

### 📋 Conventions de nommage

- [ ] **Variables et fonctions** en camelCase
- [ ] **Classes et interfaces** en PascalCase
- [ ] **Constantes** en SCREAMING_SNAKE_CASE
- [ ] **Fichiers et dossiers** en kebab-case
- [ ] **Noms significatifs** et descriptifs

### 📋 Principes SOLID et Clean Code

- [ ] **Single Responsibility** respecté
- [ ] **Open/Closed** respecté
- [ ] **Liskov Substitution** respecté
- [ ] **Interface Segregation** respecté
- [ ] **Dependency Inversion** respecté
- [ ] **Fonctions petites** et focalisées
- [ ] **Code auto-documenté** sans commentaires inutiles

### 📋 Documentation

- [ ] **JSDoc/TSDoc** pour toutes les fonctions publiques
- [ ] **Documentation des classes** complète
- [ ] **README** à jour et informatif
- [ ] **Documentation API** complète
- [ ] **Exemples d'utilisation** fournis

### 📋 Configuration des outils

- [ ] **ESLint** configuré et fonctionnel
- [ ] **Prettier** configuré et fonctionnel
- [ ] **Husky** configuré pour les hooks Git
- [ ] **lint-staged** configuré pour les commits
- [ ] **Scripts npm** configurés

---

## 📚 Ressources

### 🎓 Formation
- [Setup de projet](./project-setup.md)
- [Stratégie de tests](./testing-strategy.md)
- [Sécurité](./security.md)
- [Architecture backend](../03-architecture/backend-architecture.md)

### 🛠️ Outils
- [ESLint](https://eslint.org/) - Linter JavaScript/TypeScript
- [Prettier](https://prettier.io/) - Formateur de code
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [lint-staged](https://github.com/okonet/lint-staged) - Lint sur les fichiers stagés

### 📖 Références
- [Clean Code](https://www.oreilly.com/library/view/clean-code/9780136083238/) - Robert C. Martin
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID) - Wikipedia
- [ESLint Documentation](https://eslint.org/docs/) - Documentation officielle
- [Prettier Documentation](https://prettier.io/docs/) - Documentation officielle

---

<div align="center">

[![Retour au Profil](../../../README.md)](../../../README.md)

</div>

---

*Dernière mise à jour : Janvier 2024*
