# 🟢 Node.js - Complete Guide

## 📋 Table of Contents
- [Introduction](#introduction)
- [Architecture and Patterns](#architecture-and-patterns)
- [Best Practices](#best-practices)
- [Design Patterns](#design-patterns)
- [Performance and Optimization](#performance-and-optimization)
- [Security](#security)
- [Useful Snippets](#useful-snippets)
- [Resources](#resources)

## 🚀 Introduction

Node.js is a JavaScript runtime based on Chrome's V8 engine that allows JavaScript to be executed server-side. It uses a non-blocking I/O model and is event-driven.

### Key Advantages
- **JavaScript Everywhere** - Same language for frontend and backend
- **Non-blocking I/O** - High performance for I/O intensive applications
- **Rich Ecosystem** - NPM with millions of packages
- **Scalability** - Event-driven architecture
- **Real-time** - Native WebSockets and streaming

### Node.js Architecture

```javascript
// Structure of a typical Node.js application
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

// Server startup
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

## 🏛️ Architecture and Patterns

### 1. Layered Architecture

```
src/
├── controllers/          # Presentation layer
│   ├── user.controller.js
│   └── auth.controller.js
├── services/            # Business layer
│   ├── user.service.js
│   └── auth.service.js
├── repositories/        # Data layer
│   ├── user.repository.js
│   └── base.repository.js
├── models/             # Data models
│   ├── user.model.js
│   └── index.js
├── middleware/         # Custom middleware
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── utils/              # Utilities
│   ├── logger.js
│   └── helpers.js
└── config/             # Configuration
    ├── database.js
    └── app.js
```

### 2. MVC Pattern with Express

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

## 🎯 Best Practices

### 1. Error Handling

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

### 2. Configuration and Environment Variables

```javascript
// config/app.js
const dotenv = require('dotenv')
const path = require('path')

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') })

const config = {
  // Application
  app: {
    name: process.env.APP_NAME || 'Node.js App',
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    url: process.env.APP_URL || 'http://localhost:3000'
  },

  // Database
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

### 3. Structured Logging

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
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/error.log'), 
      level: 'error' 
    }),
    // Write all logs to combined.log
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/combined.log') 
    })
  ]
})

// If not in production, also log to console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }))
}

// Utility functions
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

### 4. Validation with Joi

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

// Validation middleware
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
      // Connection simulation
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

// Usage
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
    // Email sending logic
  }
}

class SmsNotification {
  constructor(config) {
    this.config = config
  }

  async send(message, recipient) {
    console.log(`Sending SMS to ${recipient}: ${message}`)
    // SMS sending logic
  }
}

class PushNotification {
  constructor(config) {
    this.config = config
  }

  async send(message, recipient) {
    console.log(`Sending push notification to ${recipient}: ${message}`)
    // Push notification logic
  }
}

// Usage
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

// Usage example
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
    // Save logic
    return { id: '1', ...userData, createdAt: new Date() }
  }
}

// Usage
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
    // Credit card payment logic
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
    // PayPal payment logic
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
    // Bank transfer logic
    return {
      success: true,
      transactionId: `bt_${Date.now()}`,
      amount
    }
  }
}

// Usage
const paymentProcessor = new PaymentProcessor()

paymentProcessor.registerStrategy('credit_card', new CreditCardStrategy())
paymentProcessor.registerStrategy('paypal', new PayPalStrategy())
paymentProcessor.registerStrategy('bank_transfer', new BankTransferStrategy())

const result = await paymentProcessor.processPayment('credit_card', 100, { cardNumber: '1234' })
console.log(result)
```

## ⚡ Performance and Optimization

### 1. Memory Management

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
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc()
        console.log('Garbage collection triggered')
      }
    }, intervalMs)
  }
}

// Start monitoring
MemoryMonitor.startMonitoring()

module.exports = MemoryMonitor
```

### 2. Cache with Redis

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

// Singleton instance
const cacheService = new CacheService()
module.exports = cacheService
```

### 3. Connection Pooling

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
      max: 20, // Maximum connections in pool
      idleTimeoutMillis: 30000, // Close idle connections after 30s
      connectionTimeoutMillis: 2000, // Connection timeout
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

## 🔒 Security

### 1. JWT Authentication

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

// General rate limiting
const generalLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests per IP
  'Too many requests from this IP, please try again later.'
)

// Authentication rate limiting
const authLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // 5 login attempts
  'Too many login attempts, please try again later.'
)

// API rate limiting
const apiLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  1000, // 1000 requests per IP
  'API rate limit exceeded, please try again later.'
)

module.exports = {
  generalLimiter,
  authLimiter,
  apiLimiter
}
```

### 3. Validation and Sanitization

```javascript
// middleware/security.middleware.js
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const securityMiddleware = (app) => {
  // Helmet for security headers
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

  // MongoDB sanitization
  app.use(mongoSanitize())

  // XSS protection
  app.use(xss())

  // Parameter pollution protection
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

## 💡 Advanced Snippets

### 1. Async/Await Utilities

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

### 2. File Management

```javascript
// utils/file-utils.js
const fs = require('fs').promises
const path = require('path')
const multer = require('multer')

// Multer configuration
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

// File utilities
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

### 3. Validation Utilities

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
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character
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

### 4. Logging Middleware

```javascript
// middleware/request-logger.middleware.js
const { logger } = require('../utils/logger')

const requestLogger = (req, res, next) => {
  const start = Date.now()
  
  // Log incoming request
  logger.info('Incoming Request', {
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    timestamp: new Date().toISOString()
  })

  // Intercept response
  const originalSend = res.send
  res.send = function(data) {
    const duration = Date.now() - start
    
    // Log response
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

## 📋 Complete Node.js Reference Tables

### 🎯 Core Modules

| Module | Description | Import | Example |
|--------|-------------|--------|---------|
| **fs** | File system | `const fs = require('fs')` | `fs.readFileSync('file.txt')` |
| **path** | Path manipulation | `const path = require('path')` | `path.join('/a', 'b', 'c')` |
| **http** | HTTP server | `const http = require('http')` | `http.createServer((req, res) => {})` |
| **https** | HTTPS server | `const https = require('https')` | `https.createServer(options, handler)` |
| **url** | URL manipulation | `const url = require('url')` | `url.parse('http://example.com')` |
| **querystring** | Query parameters | `const qs = require('querystring')` | `qs.parse('a=1&b=2')` |
| **crypto** | Cryptography | `const crypto = require('crypto')` | `crypto.createHash('sha256')` |
| **util** | Utilities | `const util = require('util')` | `util.promisify(fs.readFile)` |
| **events** | Event system | `const EventEmitter = require('events')` | `new EventEmitter()` |
| **stream** | Streams | `const stream = require('stream')` | `new stream.Readable()` |
| **buffer** | Buffer manipulation | `const Buffer = require('buffer')` | `Buffer.from('hello')` |
| **os** | Operating system | `const os = require('os')` | `os.platform()` |
| **child_process** | Child processes | `const cp = require('child_process')` | `cp.exec('ls')` |
| **cluster** | Clustering | `const cluster = require('cluster')` | `cluster.fork()` |
| **worker_threads** | Worker threads | `const worker = require('worker_threads')` | `new worker.Worker('./worker.js')` |

### 🎯 fs Methods (File System)

| Method | Type | Description | Example |
|---------|------|-------------|---------|
| **readFile** | Async | Read a file | `fs.readFile('file.txt', callback)` |
| **readFileSync** | Sync | Read a file (sync) | `fs.readFileSync('file.txt')` |
| **writeFile** | Async | Write a file | `fs.writeFile('file.txt', data, callback)` |
| **writeFileSync** | Sync | Write a file (sync) | `fs.writeFileSync('file.txt', data)` |
| **appendFile** | Async | Append to a file | `fs.appendFile('file.txt', data, callback)` |
| **appendFileSync** | Sync | Append to a file (sync) | `fs.appendFileSync('file.txt', data)` |
| **readdir** | Async | Read directory | `fs.readdir('.', callback)` |
| **readdirSync** | Sync | Read directory (sync) | `fs.readdirSync('.')` |
| **mkdir** | Async | Create directory | `fs.mkdir('newdir', callback)` |
| **mkdirSync** | Sync | Create directory (sync) | `fs.mkdirSync('newdir')` |
| **rmdir** | Async | Remove directory | `fs.rmdir('dir', callback)` |
| **rmdirSync** | Sync | Remove directory (sync) | `fs.rmdirSync('dir')` |
| **unlink** | Async | Remove file | `fs.unlink('file.txt', callback)` |
| **unlinkSync** | Sync | Remove file (sync) | `fs.unlinkSync('file.txt')` |
| **stat** | Async | File statistics | `fs.stat('file.txt', callback)` |
| **statSync** | Sync | File statistics (sync) | `fs.statSync('file.txt')` |
| **access** | Async | Check access | `fs.access('file.txt', callback)` |
| **accessSync** | Sync | Check access (sync) | `fs.accessSync('file.txt')` |

### 🎯 path Methods

| Method | Description | Example | Result |
|---------|-------------|---------|----------|
| **join** | Join paths | `path.join('/a', 'b', 'c')` | `/a/b/c` |
| **resolve** | Resolve path | `path.resolve('./file.txt')` | `/absolute/path/file.txt` |
| **dirname** | Parent directory | `path.dirname('/a/b/c.txt')` | `/a/b` |
| **basename** | File name | `path.basename('/a/b/c.txt')` | `c.txt` |
| **extname** | Extension | `path.extname('file.txt')` | `.txt` |
| **parse** | Parse path | `path.parse('/a/b/c.txt')` | `{ root: '/', dir: '/a/b', base: 'c.txt', ext: '.txt', name: 'c' }` |
| **format** | Format object | `path.format({ dir: '/a/b', base: 'c.txt' })` | `/a/b/c.txt` |
| **isAbsolute** | Absolute path? | `path.isAbsolute('/a/b')` | `true` |
| **relative** | Relative path | `path.relative('/a/b', '/a/c')` | `../c` |
| **normalize** | Normalize | `path.normalize('/a//b/../c')` | `/a/c` |

### 🎯 http Methods

| Method | Description | Example |
|---------|-------------|---------|
| **createServer** | Create server | `http.createServer((req, res) => {})` |
| **request** | Make request | `http.request(options, callback)` |
| **get** | GET request | `http.get(url, callback)` |
| **listen** | Listen on port | `server.listen(3000)` |
| **close** | Close server | `server.close()` |

### 🎯 crypto Methods

| Method | Description | Example |
|---------|-------------|---------|
| **createHash** | Create hash | `crypto.createHash('sha256')` |
| **createHmac** | Create HMAC | `crypto.createHmac('sha256', key)` |
| **createCipher** | Create cipher | `crypto.createCipher('aes192', password)` |
| **createDecipher** | Create decipher | `crypto.createDecipher('aes192', password)` |
| **createCipheriv** | Cipher with IV | `crypto.createCipheriv('aes192', key, iv)` |
| **createDecipheriv** | Decipher with IV | `crypto.createDecipheriv('aes192', key, iv)` |
| **randomBytes** | Random bytes | `crypto.randomBytes(16)` |
| **pbkdf2** | PBKDF2 | `crypto.pbkdf2(password, salt, iterations, keylen, callback)` |
| **scrypt** | Scrypt | `crypto.scrypt(password, salt, keylen, callback)` |

### 🎯 util Methods

| Method | Description | Example |
|---------|-------------|---------|
| **promisify** | Promisify | `util.promisify(fs.readFile)` |
| **callbackify** | Callbackify | `util.callbackify(asyncFunction)` |
| **inspect** | Inspect object | `util.inspect(obj, { depth: null })` |
| **format** | Format | `util.format('%s %d', 'hello', 42)` |
| **inherits** | Inheritance | `util.inherits(Child, Parent)` |
| **isArray** | Is array? | `util.isArray([])` |
| **isDate** | Is date? | `util.isDate(new Date())` |
| **isRegExp** | Is regex? | `util.isRegExp(/test/)` |
| **isError** | Is error? | `util.isError(new Error())` |

### 🎯 url Methods

| Method | Description | Example |
|---------|-------------|---------|
| **parse** | Parse URL | `url.parse('http://example.com/path?query=1')` |
| **format** | Format URL | `url.format({ protocol: 'http:', host: 'example.com' })` |
| **resolve** | Resolve URL | `url.resolve('http://example.com/', '/path')` |

### 🎯 querystring Methods

| Method | Description | Example |
|---------|-------------|---------|
| **parse** | Parse query string | `querystring.parse('a=1&b=2')` |
| **stringify** | Stringify object | `querystring.stringify({ a: 1, b: 2 })` |
| **escape** | Escape | `querystring.escape('hello world')` |
| **unescape** | Unescape | `querystring.unescape('hello%20world')` |

### 🎯 os Methods

| Method | Description | Example |
|---------|-------------|---------|
| **platform** | Platform | `os.platform()` |
| **arch** | Architecture | `os.arch()` |
| **cpus** | CPUs | `os.cpus()` |
| **totalmem** | Total memory | `os.totalmem()` |
| **freemem** | Free memory | `os.freemem()` |
| **uptime** | Uptime | `os.uptime()` |
| **homedir** | Home directory | `os.homedir()` |
| **tmpdir** | Temp directory | `os.tmpdir()` |
| **hostname** | Hostname | `os.hostname()` |
| **networkInterfaces** | Network interfaces | `os.networkInterfaces()` |

### 🎯 child_process Methods

| Method | Description | Example |
|---------|-------------|---------|
| **exec** | Execute command | `cp.exec('ls -la', callback)` |
| **execSync** | Execute command (sync) | `cp.execSync('ls -la')` |
| **spawn** | Spawn process | `cp.spawn('ls', ['-la'])` |
| **fork** | Fork process | `cp.fork('./worker.js')` |
| **execFile** | Execute file | `cp.execFile('node', ['script.js'], callback)` |

### 🎯 cluster Methods

| Method | Description | Example |
|---------|-------------|---------|
| **isMaster** | Is master process? | `cluster.isMaster` |
| **isWorker** | Is worker? | `cluster.isWorker` |
| **fork** | Fork worker | `cluster.fork()` |
| **disconnect** | Disconnect | `cluster.disconnect()` |
| **kill** | Kill worker | `cluster.kill(worker)` |

### 🎯 worker_threads Methods

| Method | Description | Example |
|---------|-------------|---------|
| **Worker** | Create worker | `new worker.Worker('./worker.js')` |
| **isMainThread** | Main thread? | `worker.isMainThread` |
| **parentPort** | Parent port | `worker.parentPort` |
| **workerData** | Worker data | `worker.workerData` |
| **MessageChannel** | Message channel | `new worker.MessageChannel()` |

### 🎯 events Methods

| Method | Description | Example |
|---------|-------------|---------|
| **on** | Listen to event | `emitter.on('event', handler)` |
| **once** | Listen once | `emitter.once('event', handler)` |
| **emit** | Emit event | `emitter.emit('event', data)` |
| **removeListener** | Remove listener | `emitter.removeListener('event', handler)` |
| **removeAllListeners** | Remove all listeners | `emitter.removeAllListeners('event')` |
| **listenerCount** | Listener count | `emitter.listenerCount('event')` |
| **listeners** | Listeners list | `emitter.listeners('event')` |
| **setMaxListeners** | Max listeners limit | `emitter.setMaxListeners(10)` |

### 🎯 stream Methods

| Method | Description | Example |
|---------|-------------|---------|
| **pipe** | Piping | `readable.pipe(writable)` |
| **unpipe** | Unpiping | `readable.unpipe(writable)` |
| **pause** | Pause | `readable.pause()` |
| **resume** | Resume | `readable.resume()` |
| **destroy** | Destroy | `stream.destroy()` |
| **end** | End | `writable.end('data')` |
| **write** | Write | `writable.write('data')` |
| **read** | Read | `readable.read(size)` |

### 🎯 buffer Methods

| Method | Description | Example |
|---------|-------------|---------|
| **from** | Create from | `Buffer.from('hello')` |
| **alloc** | Allocate | `Buffer.alloc(10)` |
| **allocUnsafe** | Allocate unsafe | `Buffer.allocUnsafe(10)` |
| **concat** | Concatenate | `Buffer.concat([buf1, buf2])` |
| **isBuffer** | Is buffer? | `Buffer.isBuffer(buf)` |
| **byteLength** | Byte length | `Buffer.byteLength('hello')` |
| **compare** | Compare | `buf1.compare(buf2)` |
| **copy** | Copy | `buf.copy(target)` |
| **slice** | Slice | `buf.slice(0, 5)` |
| **toString** | To string | `buf.toString('utf8')` |
| **write** | Write | `buf.write('hello')` |
| **read** | Read | `buf.readUInt32BE(0)` |

### 🎯 Global Variables

| Variable | Description | Example |
|----------|-------------|---------|
| **global** | Global object | `global.myVar = 'value'` |
| **process** | Current process | `process.env.NODE_ENV` |
| **console** | Console | `console.log('hello')` |
| **Buffer** | Buffer constructor | `Buffer.from('data')` |
| **setTimeout** | Timer | `setTimeout(callback, 1000)` |
| **setInterval** | Repeating timer | `setInterval(callback, 1000)` |
| **clearTimeout** | Clear timer | `clearTimeout(timerId)` |
| **clearInterval** | Clear interval | `clearInterval(intervalId)` |
| **setImmediate** | Immediate execution | `setImmediate(callback)` |
| **clearImmediate** | Clear immediate | `clearImmediate(immediateId)` |

### 🎯 process Properties

| Property | Description | Example |
|-----------|-------------|---------|
| **env** | Environment variables | `process.env.NODE_ENV` |
| **argv** | Command line arguments | `process.argv` |
| **cwd** | Current working directory | `process.cwd()` |
| **chdir** | Change directory | `process.chdir('/path')` |
| **pid** | Process ID | `process.pid` |
| **ppid** | Parent process ID | `process.ppid` |
| **platform** | Platform | `process.platform` |
| **arch** | Architecture | `process.arch` |
| **version** | Node.js version | `process.version` |
| **versions** | Module versions | `process.versions` |
| **uptime** | Uptime | `process.uptime()` |
| **memoryUsage** | Memory usage | `process.memoryUsage()` |
| **cpuUsage** | CPU usage | `process.cpuUsage()` |
| **hrtime** | High resolution time | `process.hrtime()` |
| **nextTick** | Next tick | `process.nextTick(callback)` |
| **exit** | Exit | `process.exit(0)` |
| **kill** | Kill process | `process.kill(pid, signal)` |

### 🎯 console Methods

| Method | Description | Example |
|---------|-------------|---------|
| **log** | Normal log | `console.log('hello')` |
| **info** | Info log | `console.info('info')` |
| **warn** | Warning log | `console.warn('warning')` |
| **error** | Error log | `console.error('error')` |
| **debug** | Debug log | `console.debug('debug')` |
| **trace** | Stack trace | `console.trace('trace')` |
| **dir** | Inspect object | `console.dir(obj)` |
| **time** | Start timer | `console.time('label')` |
| **timeEnd** | End timer | `console.timeEnd('label')` |
| **timeLog** | Log timer | `console.timeLog('label')` |
| **count** | Count | `console.count('label')` |
| **countReset** | Reset counter | `console.countReset('label')` |
| **group** | Group logs | `console.group('group')` |
| **groupEnd** | End group | `console.groupEnd()` |
| **table** | Table | `console.table(data)` |
| **assert** | Assertion | `console.assert(condition, message)` |
| **clear** | Clear console | `console.clear()` |

## 📚 Resources

### Official Documentation
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [NPM Documentation](https://docs.npmjs.com/)

### Recommended Tools
- [PM2](https://pm2.keymetrics.io/) - Process manager
- [Winston](https://github.com/winstonjs/winston) - Logging
- [Joi](https://joi.dev/) - Validation
- [Helmet](https://helmetjs.github.io/) - Security

### Patterns and Best Practices
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Style Guide](https://github.com/expressjs/express)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

---

*Last updated: October 2024*
