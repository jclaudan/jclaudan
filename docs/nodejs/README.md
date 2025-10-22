# 🟢 Node.js - Guide Complet

## 📋 Table des matières
- [Introduction](#introduction)
- [Architecture et patterns](#architecture-et-patterns)
- [Meilleures pratiques](#meilleures-pratiques)
- [Design Patterns](#design-patterns)
- [Performance et optimisation](#performance-et-optimisation)
- [Sécurité](#sécurité)
- [Snippets utiles](#snippets-utiles)
- [Ressources](#ressources)

## 🚀 Introduction

Node.js est un runtime JavaScript basé sur le moteur V8 de Chrome qui permet d'exécuter JavaScript côté serveur. Il utilise un modèle d'E/S non-bloquant et orienté événements.

### Avantages clés
- **JavaScript partout** - Même langage frontend et backend
- **I/O non-bloquant** - Haute performance pour les applications I/O intensives
- **Écosystème riche** - NPM avec des millions de packages
- **Scalabilité** - Architecture événementielle
- **Temps réel** - WebSockets et streaming natifs

### Architecture Node.js

```javascript
// Structure d'une application Node.js typique
const express = require('express')
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Démarrage du serveur
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

## 🏛️ Architecture et patterns

### 1. Architecture en couches

```
src/
├── controllers/          # Couche présentation
│   ├── user.controller.js
│   └── auth.controller.js
├── services/            # Couche métier
│   ├── user.service.js
│   └── auth.service.js
├── repositories/        # Couche données
│   ├── user.repository.js
│   └── base.repository.js
├── models/             # Modèles de données
│   ├── user.model.js
│   └── index.js
├── middleware/         # Middleware personnalisés
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── utils/              # Utilitaires
│   ├── logger.js
│   └── helpers.js
└── config/             # Configuration
    ├── database.js
    └── app.js
```

### 2. Pattern MVC avec Express

```javascript
// models/user.model.js
class User {
  constructor(id, name, email, createdAt) {
    this.id = id
    this.name = name
    this.email = email
    this.createdAt = createdAt
  }

  static fromJSON(data) {
    return new User(data.id, data.name, data.email, data.createdAt)
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    }
  }
}

module.exports = User

// repositories/user.repository.js
const User = require('../models/user.model')
const db = require('../config/database')

class UserRepository {
  async findById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0] ? User.fromJSON(result.rows[0]) : null
  }

  async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0] ? User.fromJSON(result.rows[0]) : null
  }

  async save(user) {
    const result = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [user.name, user.email]
    )
    return User.fromJSON(result.rows[0])
  }

  async update(id, userData) {
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [userData.name, userData.email, id]
    )
    return result.rows[0] ? User.fromJSON(result.rows[0]) : null
  }

  async delete(id) {
    await db.query('DELETE FROM users WHERE id = $1', [id])
  }
}

module.exports = UserRepository

// services/user.service.js
const UserRepository = require('../repositories/user.repository')
const { ValidationError, NotFoundError } = require('../utils/errors')

class UserService {
  constructor() {
    this.userRepository = new UserRepository()
  }

  async createUser(userData) {
    this.validateUserData(userData)
    
    const existingUser = await this.userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new ValidationError('User with this email already exists')
    }

    const user = new User(null, userData.name, userData.email, new Date())
    return await this.userRepository.save(user)
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }

  async updateUser(id, userData) {
    const existingUser = await this.userRepository.findById(id)
    if (!existingUser) {
      throw new NotFoundError('User not found')
    }

    this.validateUserData(userData)
    return await this.userRepository.update(id, userData)
  }

  async deleteUser(id) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    await this.userRepository.delete(id)
  }

  validateUserData(userData) {
    if (!userData.name || userData.name.trim().length === 0) {
      throw new ValidationError('Name is required')
    }
    if (!userData.email || !this.isValidEmail(userData.email)) {
      throw new ValidationError('Valid email is required')
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

module.exports = UserService

// controllers/user.controller.js
const UserService = require('../services/user.service')
const { asyncHandler } = require('../utils/async-handler')

class UserController {
  constructor() {
    this.userService = new UserService()
  }

  createUser = asyncHandler(async (req, res) => {
    const user = await this.userService.createUser(req.body)
    res.status(201).json({
      success: true,
      data: user.toJSON()
    })
  })

  getUserById = asyncHandler(async (req, res) => {
    const user = await this.userService.getUserById(req.params.id)
    res.json({
      success: true,
      data: user.toJSON()
    })
  })

  updateUser = asyncHandler(async (req, res) => {
    const user = await this.userService.updateUser(req.params.id, req.body)
    res.json({
      success: true,
      data: user.toJSON()
    })
  })

  deleteUser = asyncHandler(async (req, res) => {
    await this.userService.deleteUser(req.params.id)
    res.status(204).send()
  })
}

module.exports = UserController
```

## 🎯 Meilleures pratiques

### 1. Gestion des erreurs

```javascript
// utils/errors.js
class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'

    Error.captureStackTrace(this, this.constructor)
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400)
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404)
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}

// utils/async-handler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

// middleware/error.middleware.js
const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  // Log error
  console.error(err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found'
    error = new NotFoundError(message)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new ValidationError(message)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ')
    error = new ValidationError(message)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = { AppError, ValidationError, NotFoundError, UnauthorizedError, asyncHandler, errorHandler }
```

### 2. Configuration et variables d'environnement

```javascript
// config/app.js
const dotenv = require('dotenv')
const path = require('path')

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env') })

const config = {
  // Application
  app: {
    name: process.env.APP_NAME || 'Node.js App',
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    url: process.env.APP_URL || 'http://localhost:3000'
  },

  // Base de données
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'nodejs_app',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    url: process.env.DATABASE_URL
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },

  // Email
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM || 'noreply@example.com'
  },

  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD
  }
}

module.exports = config
```

### 3. Logging structuré

```javascript
// utils/logger.js
const winston = require('winston')
const path = require('path')

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'nodejs-app' },
  transports: [
    // Écrire tous les logs avec niveau 'error' et moins vers error.log
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/error.log'), 
      level: 'error' 
    }),
    // Écrire tous les logs vers combined.log
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/combined.log') 
    })
  ]
})

// Si on n'est pas en production, logger aussi vers la console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }))
}

// Fonctions utilitaires
const logRequest = (req, res, next) => {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    logger.info('HTTP Request', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    })
  })
  
  next()
}

module.exports = { logger, logRequest }
```

### 4. Validation avec Joi

```javascript
// utils/validation.js
const Joi = require('joi')

const userValidation = {
  create: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).max(120).optional(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required()
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    age: Joi.number().integer().min(18).max(120).optional()
  })
}

const authValidation = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required()
  })
}

// Middleware de validation
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      })
    }
    next()
  }
}

module.exports = { userValidation, authValidation, validate }
```

## 🏗️ Design Patterns

### 1. Singleton Pattern

```javascript
// patterns/singleton.js
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance
    }
    
    this.connection = null
    DatabaseConnection.instance = this
  }

  async connect() {
    if (!this.connection) {
      // Simulation de connexion
      this.connection = { connected: true, timestamp: new Date() }
      console.log('Database connected')
    }
    return this.connection
  }

  async disconnect() {
    if (this.connection) {
      this.connection = null
      console.log('Database disconnected')
    }
  }

  getConnection() {
    return this.connection
  }
}

// Utilisation
const db1 = new DatabaseConnection()
const db2 = new DatabaseConnection()
console.log(db1 === db2) // true
```

### 2. Factory Pattern

```javascript
// patterns/factory.js
class NotificationFactory {
  static createNotification(type, config) {
    switch (type) {
      case 'email':
        return new EmailNotification(config)
      case 'sms':
        return new SmsNotification(config)
      case 'push':
        return new PushNotification(config)
      default:
        throw new Error(`Notification type ${type} not supported`)
    }
  }
}

class EmailNotification {
  constructor(config) {
    this.config = config
  }

  async send(message, recipient) {
    console.log(`Sending email to ${recipient}: ${message}`)
    // Logique d'envoi d'email
  }
}

class SmsNotification {
  constructor(config) {
    this.config = config
  }

  async send(message, recipient) {
    console.log(`Sending SMS to ${recipient}: ${message}`)
    // Logique d'envoi SMS
  }
}

class PushNotification {
  constructor(config) {
    this.config = config
  }

  async send(message, recipient) {
    console.log(`Sending push notification to ${recipient}: ${message}`)
    // Logique de notification push
  }
}

// Utilisation
const emailNotif = NotificationFactory.createNotification('email', { apiKey: 'xxx' })
await emailNotif.send('Hello!', 'user@example.com')
```

### 3. Observer Pattern

```javascript
// patterns/observer.js
class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }

  off(event, listener) {
    if (!this.events[event]) return
    
    this.events[event] = this.events[event].filter(l => l !== listener)
  }

  emit(event, ...args) {
    if (!this.events[event]) return
    
    this.events[event].forEach(listener => {
      try {
        listener(...args)
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error)
      }
    })
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args)
      this.off(event, onceWrapper)
    }
    this.on(event, onceWrapper)
  }
}

// Exemple d'utilisation
class UserService {
  constructor() {
    this.eventEmitter = new EventEmitter()
  }

  async createUser(userData) {
    const user = await this.saveUser(userData)
    this.eventEmitter.emit('user:created', user)
    return user
  }

  onUserCreated(callback) {
    this.eventEmitter.on('user:created', callback)
  }

  async saveUser(userData) {
    // Logique de sauvegarde
    return { id: '1', ...userData, createdAt: new Date() }
  }
}

// Utilisation
const userService = new UserService()

userService.onUserCreated((user) => {
  console.log(`New user created: ${user.name}`)
})

await userService.createUser({ name: 'John', email: 'john@example.com' })
```

### 4. Strategy Pattern

```javascript
// patterns/strategy.js
class PaymentProcessor {
  constructor() {
    this.strategies = new Map()
  }

  registerStrategy(name, strategy) {
    this.strategies.set(name, strategy)
  }

  async processPayment(method, amount, details) {
    const strategy = this.strategies.get(method)
    
    if (!strategy) {
      throw new Error(`Payment method ${method} not supported`)
    }

    return await strategy.process(amount, details)
  }
}

class CreditCardStrategy {
  async process(amount, details) {
    console.log(`Processing credit card payment of $${amount}`)
    // Logique de paiement par carte de crédit
    return {
      success: true,
      transactionId: `cc_${Date.now()}`,
      amount
    }
  }
}

class PayPalStrategy {
  async process(amount, details) {
    console.log(`Processing PayPal payment of $${amount}`)
    // Logique de paiement PayPal
    return {
      success: true,
      transactionId: `pp_${Date.now()}`,
      amount
    }
  }
}

class BankTransferStrategy {
  async process(amount, details) {
    console.log(`Processing bank transfer of $${amount}`)
    // Logique de virement bancaire
    return {
      success: true,
      transactionId: `bt_${Date.now()}`,
      amount
    }
  }
}

// Utilisation
const paymentProcessor = new PaymentProcessor()

paymentProcessor.registerStrategy('credit_card', new CreditCardStrategy())
paymentProcessor.registerStrategy('paypal', new PayPalStrategy())
paymentProcessor.registerStrategy('bank_transfer', new BankTransferStrategy())

const result = await paymentProcessor.processPayment('credit_card', 100, { cardNumber: '1234' })
console.log(result)
```

## ⚡ Performance et optimisation

### 1. Gestion de la mémoire

```javascript
// utils/memory-monitor.js
const v8 = require('v8')

class MemoryMonitor {
  static getMemoryUsage() {
    const usage = process.memoryUsage()
    const heapStats = v8.getHeapStatistics()
    
    return {
      rss: Math.round(usage.rss / 1024 / 1024 * 100) / 100, // MB
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024 * 100) / 100, // MB
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024 * 100) / 100, // MB
      external: Math.round(usage.external / 1024 / 1024 * 100) / 100, // MB
      heapLimit: Math.round(heapStats.heap_size_limit / 1024 / 1024 * 100) / 100 // MB
    }
  }

  static logMemoryUsage() {
    const memory = this.getMemoryUsage()
    console.log('Memory Usage:', memory)
  }

  static startMonitoring(intervalMs = 30000) {
    setInterval(() => {
      this.logMemoryUsage()
      
      // Forcer le garbage collection si disponible
      if (global.gc) {
        global.gc()
        console.log('Garbage collection triggered')
      }
    }, intervalMs)
  }
}

// Démarrage du monitoring
MemoryMonitor.startMonitoring()

module.exports = MemoryMonitor
```

### 2. Cache avec Redis

```javascript
// utils/cache.js
const redis = require('redis')
const config = require('../config/app')

class CacheService {
  constructor() {
    this.client = redis.createClient({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password
    })

    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err)
    })
  }

  async connect() {
    await this.client.connect()
  }

  async get(key) {
    try {
      const value = await this.client.get(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async set(key, value, ttl = 3600) {
    try {
      await this.client.setEx(key, ttl, JSON.stringify(value))
    } catch (error) {
      console.error('Cache set error:', error)
    }
  }

  async del(key) {
    try {
      await this.client.del(key)
    } catch (error) {
      console.error('Cache delete error:', error)
    }
  }

  async flush() {
    try {
      await this.client.flushAll()
    } catch (error) {
      console.error('Cache flush error:', error)
    }
  }
}

// Instance singleton
const cacheService = new CacheService()
module.exports = cacheService
```

### 3. Pool de connexions

```javascript
// config/database.js
const { Pool } = require('pg')
const config = require('./app')

class DatabasePool {
  constructor() {
    this.pool = new Pool({
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.username,
      password: config.database.password,
      max: 20, // Maximum de connexions dans le pool
      idleTimeoutMillis: 30000, // Fermer les connexions inactives après 30s
      connectionTimeoutMillis: 2000, // Timeout de connexion
    })

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
    })
  }

  async query(text, params) {
    const start = Date.now()
    try {
      const res = await this.pool.query(text, params)
      const duration = Date.now() - start
      console.log('Executed query', { text, duration, rows: res.rowCount })
      return res
    } catch (error) {
      console.error('Database query error:', error)
      throw error
    }
  }

  async getClient() {
    return await this.pool.connect()
  }

  async close() {
    await this.pool.end()
  }
}

module.exports = new DatabasePool()
```

## 🔒 Sécurité

### 1. Authentification JWT

```javascript
// middleware/auth.middleware.js
const jwt = require('jsonwebtoken')
const config = require('../config/app')
const { UnauthorizedError } = require('../utils/errors')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      throw new UnauthorizedError('Access denied. No token provided.')
    }

    const decoded = jwt.verify(token, config.jwt.secret)
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      })
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired'
      })
    }
    
    next(error)
  }
}

module.exports = authMiddleware
```

### 2. Rate Limiting

```javascript
// middleware/rate-limit.middleware.js
const rateLimit = require('express-rate-limit')

const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: message
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
}

// Rate limiting général
const generalLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requêtes par IP
  'Too many requests from this IP, please try again later.'
)

// Rate limiting pour l'authentification
const authLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // 5 tentatives de connexion
  'Too many login attempts, please try again later.'
)

// Rate limiting pour les API
const apiLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  1000, // 1000 requêtes par IP
  'API rate limit exceeded, please try again later.'
)

module.exports = {
  generalLimiter,
  authLimiter,
  apiLimiter
}
```

### 3. Validation et sanitisation

```javascript
// middleware/security.middleware.js
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const securityMiddleware = (app) => {
  // Helmet pour les headers de sécurité
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }))

  // Sanitisation MongoDB
  app.use(mongoSanitize())

  // Protection XSS
  app.use(xss())

  // Protection contre la pollution des paramètres
  app.use(hpp())

  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next()
    }
  })
}

module.exports = securityMiddleware
```

## 💡 Snippets avancés

### 1. Utilitaires async/await

```javascript
// utils/async-utils.js
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const timeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ])
}

const retry = async (fn, maxAttempts = 3, delay = 1000) => {
  let lastError
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      if (attempt === maxAttempts) {
        throw lastError
      }
      
      await sleep(delay * attempt)
    }
  }
}

const parallel = async (tasks, concurrency = 5) => {
  const results = []
  
  for (let i = 0; i < tasks.length; i += concurrency) {
    const batch = tasks.slice(i, i + concurrency)
    const batchResults = await Promise.all(batch.map(task => task()))
    results.push(...batchResults)
  }
  
  return results
}

module.exports = { sleep, timeout, retry, parallel }
```

### 2. Gestion des fichiers

```javascript
// utils/file-utils.js
const fs = require('fs').promises
const path = require('path')
const multer = require('multer')

// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

// Utilitaires de fichiers
const fileUtils = {
  async readFile(filePath) {
    try {
      return await fs.readFile(filePath, 'utf8')
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`)
    }
  },

  async writeFile(filePath, data) {
    try {
      await fs.writeFile(filePath, data, 'utf8')
    } catch (error) {
      throw new Error(`Error writing file: ${error.message}`)
    }
  },

  async deleteFile(filePath) {
    try {
      await fs.unlink(filePath)
    } catch (error) {
      throw new Error(`Error deleting file: ${error.message}`)
    }
  },

  async fileExists(filePath) {
    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }
}

module.exports = { upload, fileUtils }
```

### 3. Utilitaires de validation

```javascript
// utils/validation-utils.js
const validator = require('validator')

const validationUtils = {
  isValidEmail(email) {
    return validator.isEmail(email)
  },

  isValidUrl(url) {
    return validator.isURL(url)
  },

  isValidUUID(uuid) {
    return validator.isUUID(uuid)
  },

  sanitizeHtml(html) {
    return validator.escape(html)
  },

  isValidPassword(password) {
    // Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  },

  isValidPhoneNumber(phone) {
    return validator.isMobilePhone(phone)
  },

  isValidDate(date) {
    return validator.isISO8601(date)
  },

  normalizeEmail(email) {
    return validator.normalizeEmail(email)
  }
}

module.exports = validationUtils
```

### 4. Middleware de logging

```javascript
// middleware/request-logger.middleware.js
const { logger } = require('../utils/logger')

const requestLogger = (req, res, next) => {
  const start = Date.now()
  
  // Log de la requête entrante
  logger.info('Incoming Request', {
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    timestamp: new Date().toISOString()
  })

  // Intercepter la réponse
  const originalSend = res.send
  res.send = function(data) {
    const duration = Date.now() - start
    
    // Log de la réponse
    logger.info('Outgoing Response', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('Content-Length') || 0,
      timestamp: new Date().toISOString()
    })

    originalSend.call(this, data)
  }

  next()
}

module.exports = requestLogger
```

## 📋 Tableaux de Référence Complète Node.js

### 🎯 Modules Core

| Module | Description | Import | Exemple |
|--------|-------------|--------|---------|
| **fs** | Système de fichiers | `const fs = require('fs')` | `fs.readFileSync('file.txt')` |
| **path** | Manipulation de chemins | `const path = require('path')` | `path.join('/a', 'b', 'c')` |
| **http** | Serveur HTTP | `const http = require('http')` | `http.createServer((req, res) => {})` |
| **https** | Serveur HTTPS | `const https = require('https')` | `https.createServer(options, handler)` |
| **url** | Manipulation d'URLs | `const url = require('url')` | `url.parse('http://example.com')` |
| **querystring** | Paramètres de requête | `const qs = require('querystring')` | `qs.parse('a=1&b=2')` |
| **crypto** | Cryptographie | `const crypto = require('crypto')` | `crypto.createHash('sha256')` |
| **util** | Utilitaires | `const util = require('util')` | `util.promisify(fs.readFile)` |
| **events** | Système d'événements | `const EventEmitter = require('events')` | `new EventEmitter()` |
| **stream** | Streams | `const stream = require('stream')` | `new stream.Readable()` |
| **buffer** | Manipulation de buffers | `const Buffer = require('buffer')` | `Buffer.from('hello')` |
| **os** | Système d'exploitation | `const os = require('os')` | `os.platform()` |
| **child_process** | Processus enfants | `const cp = require('child_process')` | `cp.exec('ls')` |
| **cluster** | Clustering | `const cluster = require('cluster')` | `cluster.fork()` |
| **worker_threads** | Threads de travail | `const worker = require('worker_threads')` | `new worker.Worker('./worker.js')` |

### 🎯 Méthodes fs (Système de fichiers)

| Méthode | Type | Description | Exemple |
|---------|------|-------------|---------|
| **readFile** | Async | Lire un fichier | `fs.readFile('file.txt', callback)` |
| **readFileSync** | Sync | Lire un fichier (sync) | `fs.readFileSync('file.txt')` |
| **writeFile** | Async | Écrire un fichier | `fs.writeFile('file.txt', data, callback)` |
| **writeFileSync** | Sync | Écrire un fichier (sync) | `fs.writeFileSync('file.txt', data)` |
| **appendFile** | Async | Ajouter à un fichier | `fs.appendFile('file.txt', data, callback)` |
| **appendFileSync** | Sync | Ajouter à un fichier (sync) | `fs.appendFileSync('file.txt', data)` |
| **readdir** | Async | Lire un répertoire | `fs.readdir('.', callback)` |
| **readdirSync** | Sync | Lire un répertoire (sync) | `fs.readdirSync('.')` |
| **mkdir** | Async | Créer un répertoire | `fs.mkdir('newdir', callback)` |
| **mkdirSync** | Sync | Créer un répertoire (sync) | `fs.mkdirSync('newdir')` |
| **rmdir** | Async | Supprimer un répertoire | `fs.rmdir('dir', callback)` |
| **rmdirSync** | Sync | Supprimer un répertoire (sync) | `fs.rmdirSync('dir')` |
| **unlink** | Async | Supprimer un fichier | `fs.unlink('file.txt', callback)` |
| **unlinkSync** | Sync | Supprimer un fichier (sync) | `fs.unlinkSync('file.txt')` |
| **stat** | Async | Statistiques d'un fichier | `fs.stat('file.txt', callback)` |
| **statSync** | Sync | Statistiques d'un fichier (sync) | `fs.statSync('file.txt')` |
| **access** | Async | Vérifier l'accès | `fs.access('file.txt', callback)` |
| **accessSync** | Sync | Vérifier l'accès (sync) | `fs.accessSync('file.txt')` |

### 🎯 Méthodes path

| Méthode | Description | Exemple | Résultat |
|---------|-------------|---------|----------|
| **join** | Joindre des chemins | `path.join('/a', 'b', 'c')` | `/a/b/c` |
| **resolve** | Résoudre un chemin | `path.resolve('./file.txt')` | `/absolute/path/file.txt` |
| **dirname** | Répertoire parent | `path.dirname('/a/b/c.txt')` | `/a/b` |
| **basename** | Nom du fichier | `path.basename('/a/b/c.txt')` | `c.txt` |
| **extname** | Extension | `path.extname('file.txt')` | `.txt` |
| **parse** | Parser un chemin | `path.parse('/a/b/c.txt')` | `{ root: '/', dir: '/a/b', base: 'c.txt', ext: '.txt', name: 'c' }` |
| **format** | Formater un objet | `path.format({ dir: '/a/b', base: 'c.txt' })` | `/a/b/c.txt` |
| **isAbsolute** | Chemin absolu ? | `path.isAbsolute('/a/b')` | `true` |
| **relative** | Chemin relatif | `path.relative('/a/b', '/a/c')` | `../c` |
| **normalize** | Normaliser | `path.normalize('/a//b/../c')` | `/a/c` |

### 🎯 Méthodes http

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **createServer** | Créer un serveur | `http.createServer((req, res) => {})` |
| **request** | Faire une requête | `http.request(options, callback)` |
| **get** | Requête GET | `http.get(url, callback)` |
| **listen** | Écouter sur un port | `server.listen(3000)` |
| **close** | Fermer le serveur | `server.close()` |

### 🎯 Méthodes crypto

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **createHash** | Créer un hash | `crypto.createHash('sha256')` |
| **createHmac** | Créer un HMAC | `crypto.createHmac('sha256', key)` |
| **createCipher** | Créer un chiffreur | `crypto.createCipher('aes192', password)` |
| **createDecipher** | Créer un déchiffreur | `crypto.createDecipher('aes192', password)` |
| **createCipheriv** | Chiffreur avec IV | `crypto.createCipheriv('aes192', key, iv)` |
| **createDecipheriv** | Déchiffreur avec IV | `crypto.createDecipheriv('aes192', key, iv)` |
| **randomBytes** | Bytes aléatoires | `crypto.randomBytes(16)` |
| **pbkdf2** | PBKDF2 | `crypto.pbkdf2(password, salt, iterations, keylen, callback)` |
| **scrypt** | Scrypt | `crypto.scrypt(password, salt, keylen, callback)` |

### 🎯 Méthodes util

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **promisify** | Promisifier | `util.promisify(fs.readFile)` |
| **callbackify** | Callbackifier | `util.callbackify(asyncFunction)` |
| **inspect** | Inspecter un objet | `util.inspect(obj, { depth: null })` |
| **format** | Formater | `util.format('%s %d', 'hello', 42)` |
| **inherits** | Héritage | `util.inherits(Child, Parent)` |
| **isArray** | Est un tableau ? | `util.isArray([])` |
| **isDate** | Est une date ? | `util.isDate(new Date())` |
| **isRegExp** | Est une regex ? | `util.isRegExp(/test/)` |
| **isError** | Est une erreur ? | `util.isError(new Error())` |

### 🎯 Méthodes url

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **parse** | Parser une URL | `url.parse('http://example.com/path?query=1')` |
| **format** | Formater une URL | `url.format({ protocol: 'http:', host: 'example.com' })` |
| **resolve** | Résoudre une URL | `url.resolve('http://example.com/', '/path')` |

### 🎯 Méthodes querystring

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **parse** | Parser une query string | `querystring.parse('a=1&b=2')` |
| **stringify** | Stringifier un objet | `querystring.stringify({ a: 1, b: 2 })` |
| **escape** | Échapper | `querystring.escape('hello world')` |
| **unescape** | Déséchapper | `querystring.unescape('hello%20world')` |

### 🎯 Méthodes os

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **platform** | Plateforme | `os.platform()` |
| **arch** | Architecture | `os.arch()` |
| **cpus** | Processeurs | `os.cpus()` |
| **totalmem** | Mémoire totale | `os.totalmem()` |
| **freemem** | Mémoire libre | `os.freemem()` |
| **uptime** | Temps de fonctionnement | `os.uptime()` |
| **homedir** | Répertoire home | `os.homedir()` |
| **tmpdir** | Répertoire temp | `os.tmpdir()` |
| **hostname** | Nom d'hôte | `os.hostname()` |
| **networkInterfaces** | Interfaces réseau | `os.networkInterfaces()` |

### 🎯 Méthodes child_process

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **exec** | Exécuter une commande | `cp.exec('ls -la', callback)` |
| **execSync** | Exécuter une commande (sync) | `cp.execSync('ls -la')` |
| **spawn** | Lancer un processus | `cp.spawn('ls', ['-la'])` |
| **fork** | Forker un processus | `cp.fork('./worker.js')` |
| **execFile** | Exécuter un fichier | `cp.execFile('node', ['script.js'], callback)` |

### 🎯 Méthodes cluster

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **isMaster** | Est le processus maître ? | `cluster.isMaster` |
| **isWorker** | Est un worker ? | `cluster.isWorker` |
| **fork** | Forker un worker | `cluster.fork()` |
| **disconnect** | Déconnecter | `cluster.disconnect()` |
| **kill** | Tuer un worker | `cluster.kill(worker)` |

### 🎯 Méthodes worker_threads

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **Worker** | Créer un worker | `new worker.Worker('./worker.js')` |
| **isMainThread** | Thread principal ? | `worker.isMainThread` |
| **parentPort** | Port parent | `worker.parentPort` |
| **workerData** | Données du worker | `worker.workerData` |
| **MessageChannel** | Canal de message | `new worker.MessageChannel()` |

### 🎯 Méthodes events

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **on** | Écouter un événement | `emitter.on('event', handler)` |
| **once** | Écouter une fois | `emitter.once('event', handler)` |
| **emit** | Émettre un événement | `emitter.emit('event', data)` |
| **removeListener** | Supprimer un listener | `emitter.removeListener('event', handler)` |
| **removeAllListeners** | Supprimer tous les listeners | `emitter.removeAllListeners('event')` |
| **listenerCount** | Nombre de listeners | `emitter.listenerCount('event')` |
| **listeners** | Liste des listeners | `emitter.listeners('event')` |
| **setMaxListeners** | Limite de listeners | `emitter.setMaxListeners(10)` |

### 🎯 Méthodes stream

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **pipe** | Piping | `readable.pipe(writable)` |
| **unpipe** | Unpiping | `readable.unpipe(writable)` |
| **pause** | Pause | `readable.pause()` |
| **resume** | Reprendre | `readable.resume()` |
| **destroy** | Détruire | `stream.destroy()` |
| **end** | Terminer | `writable.end('data')` |
| **write** | Écrire | `writable.write('data')` |
| **read** | Lire | `readable.read(size)` |

### 🎯 Méthodes buffer

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **from** | Créer depuis | `Buffer.from('hello')` |
| **alloc** | Allouer | `Buffer.alloc(10)` |
| **allocUnsafe** | Allouer non sécurisé | `Buffer.allocUnsafe(10)` |
| **concat** | Concaténer | `Buffer.concat([buf1, buf2])` |
| **isBuffer** | Est un buffer ? | `Buffer.isBuffer(buf)` |
| **byteLength** | Longueur en bytes | `Buffer.byteLength('hello')` |
| **compare** | Comparer | `buf1.compare(buf2)` |
| **copy** | Copier | `buf.copy(target)` |
| **slice** | Découper | `buf.slice(0, 5)` |
| **toString** | En string | `buf.toString('utf8')` |
| **write** | Écrire | `buf.write('hello')` |
| **read** | Lire | `buf.readUInt32BE(0)` |

### 🎯 Variables globales

| Variable | Description | Exemple |
|----------|-------------|---------|
| **global** | Objet global | `global.myVar = 'value'` |
| **process** | Processus actuel | `process.env.NODE_ENV` |
| **console** | Console | `console.log('hello')` |
| **Buffer** | Constructeur Buffer | `Buffer.from('data')` |
| **setTimeout** | Timer | `setTimeout(callback, 1000)` |
| **setInterval** | Timer répétitif | `setInterval(callback, 1000)` |
| **clearTimeout** | Effacer timer | `clearTimeout(timerId)` |
| **clearInterval** | Effacer interval | `clearInterval(intervalId)` |
| **setImmediate** | Exécution immédiate | `setImmediate(callback)` |
| **clearImmediate** | Effacer immédiat | `clearImmediate(immediateId)` |

### 🎯 Propriétés de process

| Propriété | Description | Exemple |
|-----------|-------------|---------|
| **env** | Variables d'environnement | `process.env.NODE_ENV` |
| **argv** | Arguments de ligne de commande | `process.argv` |
| **cwd** | Répertoire de travail | `process.cwd()` |
| **chdir** | Changer de répertoire | `process.chdir('/path')` |
| **pid** | ID du processus | `process.pid` |
| **ppid** | ID du processus parent | `process.ppid` |
| **platform** | Plateforme | `process.platform` |
| **arch** | Architecture | `process.arch` |
| **version** | Version de Node.js | `process.version` |
| **versions** | Versions des modules | `process.versions` |
| **uptime** | Temps de fonctionnement | `process.uptime()` |
| **memoryUsage** | Utilisation mémoire | `process.memoryUsage()` |
| **cpuUsage** | Utilisation CPU | `process.cpuUsage()` |
| **hrtime** | Temps haute résolution | `process.hrtime()` |
| **nextTick** | Prochain tick | `process.nextTick(callback)` |
| **exit** | Quitter | `process.exit(0)` |
| **kill** | Tuer un processus | `process.kill(pid, signal)` |

### 🎯 Méthodes de console

| Méthode | Description | Exemple |
|---------|-------------|---------|
| **log** | Log normal | `console.log('hello')` |
| **info** | Log info | `console.info('info')` |
| **warn** | Log warning | `console.warn('warning')` |
| **error** | Log erreur | `console.error('error')` |
| **debug** | Log debug | `console.debug('debug')` |
| **trace** | Stack trace | `console.trace('trace')` |
| **dir** | Inspecter objet | `console.dir(obj)` |
| **time** | Démarrer timer | `console.time('label')` |
| **timeEnd** | Arrêter timer | `console.timeEnd('label')` |
| **timeLog** | Log timer | `console.timeLog('label')` |
| **count** | Compter | `console.count('label')` |
| **countReset** | Reset compteur | `console.countReset('label')` |
| **group** | Grouper logs | `console.group('group')` |
| **groupEnd** | Fin de groupe | `console.groupEnd()` |
| **table** | Tableau | `console.table(data)` |
| **assert** | Assertion | `console.assert(condition, message)` |
| **clear** | Effacer console | `console.clear()` |

### 📚 Ressources

### Documentation officielle
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [NPM Documentation](https://docs.npmjs.com/)

### Outils recommandés
- [PM2](https://pm2.keymetrics.io/) - Process manager
- [Winston](https://github.com/winstonjs/winston) - Logging
- [Joi](https://joi.dev/) - Validation
- [Helmet](https://helmetjs.github.io/) - Sécurité

### Patterns et bonnes pratiques
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Style Guide](https://github.com/expressjs/express)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

---

*Dernière mise à jour : Janvier 2024*
