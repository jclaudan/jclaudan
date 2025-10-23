# 🔒 Sécurité : Protection et Bonnes Pratiques

## 📋 Table des matières
- [Introduction](#introduction)
- [OWASP Top 10](#owasp-top-10)
- [Authentification et autorisation](#authentification-et-autorisation)
- [Protection des données](#protection-des-données)
- [Sécurité des API](#sécurité-des-api)
- [Sécurité frontend](#sécurité-frontend)
- [Exemples concrets](#exemples-concrets)
- [Templates de configuration](#templates-de-configuration)
- [Checklist de validation](#checklist-de-validation)
- [Ressources](#ressources)

## 🎯 Introduction

La sécurité est un aspect critique du développement d'applications modernes. Ce guide présente les bonnes pratiques, les outils et les techniques pour protéger votre application contre les menaces courantes.

### 🎯 Objectifs

- **Comprendre** les principales menaces de sécurité
- **Implémenter** l'authentification et l'autorisation
- **Protéger** les données sensibles
- **Sécuriser** les APIs et le frontend
- **Auditer** et monitorer la sécurité

---

## 🚨 OWASP Top 10

### 📝 Les 10 principales vulnérabilités

#### 1. Injection

**Description**
Les attaques par injection se produisent quand des données non fiables sont envoyées à un interpréteur.

**Exemples**
- Injection SQL
- Injection NoSQL
- Injection de commandes
- Injection LDAP

**Protection**
```typescript
// ❌ Vulnérable à l'injection SQL
const query = `SELECT * FROM users WHERE id = ${userId}`

// ✅ Protection avec requêtes paramétrées
const query = 'SELECT * FROM users WHERE id = ?'
const result = await db.query(query, [userId])

// ✅ Protection avec ORM
const user = await User.findById(userId)
```

#### 2. Broken Authentication

**Description**
Les faiblesses dans les mécanismes d'authentification permettent aux attaquants de compromettre les comptes.

**Protection**
```typescript
// ✅ Authentification sécurisée
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '15m'
    })
  }

  generateRefreshToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '7d'
    })
  }
}
```

#### 3. Sensitive Data Exposure

**Description**
L'exposition de données sensibles peut compromettre la sécurité et la confidentialité.

**Protection**
```typescript
// ✅ Chiffrement des données sensibles
import crypto from 'crypto'

class EncryptionService {
  private readonly algorithm = 'aes-256-gcm'
  private readonly key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32)

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipher(this.algorithm, this.key, iv)
    
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const authTag = cipher.getAuthTag()
    
    return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted
  }

  decrypt(encryptedText: string): string {
    const [ivHex, authTagHex, encrypted] = encryptedText.split(':')
    
    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')
    
    const decipher = crypto.createDecipher(this.algorithm, this.key, iv)
    decipher.setAuthTag(authTag)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }
}
```

#### 4. XML External Entities (XXE)

**Description**
Les attaques XXE exploitent les processeurs XML pour accéder à des fichiers locaux.

**Protection**
```typescript
// ✅ Configuration sécurisée du parser XML
import xml2js from 'xml2js'

const parser = new xml2js.Parser({
  explicitArray: false,
  ignoreAttrs: false,
  explicitCharkey: false,
  trim: true,
  normalize: true,
  normalizeTags: false,
  explicitRoot: false,
  validator: null,
  xmlns: false,
  explicitNamespaces: false,
  stripPrefix: false,
  async: false,
  strict: true,
  attrkey: '_attr',
  charkey: '_',
  mergeAttrs: false,
  explicitChildren: false,
  childkey: '$$',
  charsAsChildren: false,
  includeWhiteChars: false,
  emptyTag: '',
  renderOpts: {
    pretty: false,
    indent: '  ',
    newline: '\n'
  },
  headless: false,
  renderOpts: {
    pretty: false,
    indent: '  ',
    newline: '\n'
  },
  // Désactiver les entités externes
  explicitArray: false,
  mergeAttrs: false,
  explicitChildren: false,
  charsAsChildren: false,
  includeWhiteChars: false,
  emptyTag: '',
  renderOpts: {
    pretty: false,
    indent: '  ',
    newline: '\n'
  },
  headless: false,
  renderOpts: {
    pretty: false,
    indent: '  ',
    newline: '\n'
  }
})
```

#### 5. Broken Access Control

**Description**
Les faiblesses dans le contrôle d'accès permettent aux utilisateurs d'accéder à des ressources non autorisées.

**Protection**
```typescript
// ✅ Contrôle d'accès basé sur les rôles
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    
    return requiredRoles.some((role) => user.roles?.includes(role))
  }
}

// Utilisation
@UseGuards(RolesGuard)
@Roles('admin')
@Get('admin-only')
adminOnlyEndpoint() {
  return { message: 'This is admin only' }
}
```

#### 6. Security Misconfiguration

**Description**
Les erreurs de configuration de sécurité peuvent exposer des informations sensibles.

**Protection**
```typescript
// ✅ Configuration sécurisée
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'

// Configuration Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}))

// Compression
app.use(compression())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)
```

#### 7. Cross-Site Scripting (XSS)

**Description**
Les attaques XSS injectent du code malveillant dans les pages web.

**Protection**
```typescript
// ✅ Protection XSS
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window
const purify = DOMPurify(window)

class XSSProtection {
  sanitizeInput(input: string): string {
    return purify.sanitize(input)
  }

  sanitizeHtml(html: string): string {
    return purify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
      ALLOWED_ATTR: ['href', 'title']
    })
  }
}

// Utilisation
const xssProtection = new XSSProtection()
const cleanInput = xssProtection.sanitizeInput(userInput)
```

#### 8. Insecure Deserialization

**Description**
La désérialisation non sécurisée peut permettre l'exécution de code arbitraire.

**Protection**
```typescript
// ✅ Désérialisation sécurisée
import { validate, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'

class SecureDeserializer {
  async deserialize<T>(data: any, targetClass: new () => T): Promise<T> {
    const instance = plainToClass(targetClass, data)
    const errors = await validate(instance)
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.map(e => e.toString()).join(', ')}`)
    }
    
    return instance
  }
}

// Utilisation
const deserializer = new SecureDeserializer()
const user = await deserializer.deserialize(userData, User)
```

#### 9. Using Components with Known Vulnerabilities

**Description**
L'utilisation de composants avec des vulnérabilités connues expose l'application.

**Protection**
```bash
# ✅ Audit des dépendances
npm audit
npm audit fix

# ✅ Mise à jour des dépendances
npm update
npm outdated

# ✅ Utilisation de Snyk
npx snyk test
npx snyk monitor
```

#### 10. Insufficient Logging & Monitoring

**Description**
L'insuffisance de logging et de monitoring empêche la détection des attaques.

**Protection**
```typescript
// ✅ Logging sécurisé
import winston from 'winston'
import { Request, Response, NextFunction } from 'express'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// Middleware de logging
export const securityLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    
    logger.info('HTTP Request', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      userId: req.user?.id
    })
  })
  
  next()
}
```

---

## 🔐 Authentification et autorisation

### 📝 JWT (JSON Web Tokens)

#### Configuration JWT

```typescript
// auth/jwt.service.ts
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '15m'
    })
  }

  generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d'
    })
  }

  verifyAccessToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET')
    })
  }

  verifyRefreshToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_REFRESH_SECRET')
    })
  }
}
```

#### Middleware d'authentification

```typescript
// auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    
    if (!token) {
      throw new UnauthorizedException('Token not found')
    }
    
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET')
      })
      
      request.user = payload
      return true
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
```

#### Stratégie d'authentification

```typescript
// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles
    }
  }
}
```

### 📝 OAuth 2.0

#### Configuration OAuth

```typescript
// auth/oauth.service.ts
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class OAuthService {
  constructor(private configService: ConfigService) {}

  async authenticateWithGoogle(code: string): Promise<any> {
    const tokenResponse = await this.exchangeCodeForToken(code)
    const userInfo = await this.getUserInfo(tokenResponse.access_token)
    
    return this.createOrUpdateUser(userInfo)
  }

  private async exchangeCodeForToken(code: string): Promise<any> {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: this.configService.get('GOOGLE_CLIENT_ID'),
      client_secret: this.configService.get('GOOGLE_CLIENT_SECRET'),
      redirect_uri: this.configService.get('GOOGLE_REDIRECT_URI'),
      grant_type: 'authorization_code'
    })
    
    return response.data
  }

  private async getUserInfo(accessToken: string): Promise<any> {
    const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    
    return response.data
  }

  private async createOrUpdateUser(userInfo: any): Promise<any> {
    // Logique de création ou mise à jour de l'utilisateur
    return userInfo
  }
}
```

### 📝 RBAC (Role-Based Access Control)

#### Configuration RBAC

```typescript
// auth/rbac.service.ts
import { Injectable } from '@nestjs/common'

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export enum Permission {
  READ_USERS = 'read:users',
  WRITE_USERS = 'write:users',
  DELETE_USERS = 'delete:users',
  READ_POSTS = 'read:posts',
  WRITE_POSTS = 'write:posts'
}

@Injectable()
export class RbacService {
  private readonly rolePermissions: Record<Role, Permission[]> = {
    [Role.ADMIN]: [
      Permission.READ_USERS,
      Permission.WRITE_USERS,
      Permission.DELETE_USERS,
      Permission.READ_POSTS,
      Permission.WRITE_POSTS
    ],
    [Role.USER]: [
      Permission.READ_USERS,
      Permission.READ_POSTS,
      Permission.WRITE_POSTS
    ],
    [Role.GUEST]: [
      Permission.READ_POSTS
    ]
  }

  hasPermission(userRole: Role, permission: Permission): boolean {
    const permissions = this.rolePermissions[userRole]
    return permissions.includes(permission)
  }

  canAccess(userRole: Role, resource: string, action: string): boolean {
    const permission = `${action}:${resource}` as Permission
    return this.hasPermission(userRole, permission)
  }
}
```

#### Guard RBAC

```typescript
// auth/rbac.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RbacService, Permission } from './rbac.service'

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rbacService: RbacService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>('permissions', [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredPermissions) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    
    const hasPermission = requiredPermissions.some(permission =>
      this.rbacService.hasPermission(user.role, permission)
    )

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions')
    }

    return true
  }
}
```

---

## 🛡️ Protection des données

### 📝 Chiffrement

#### Chiffrement en transit

```typescript
// security/encryption.service.ts
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as crypto from 'crypto'

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm'
  private readonly key: Buffer

  constructor(private configService: ConfigService) {
    this.key = crypto.scryptSync(
      this.configService.get('ENCRYPTION_KEY'),
      'salt',
      32
    )
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipher(this.algorithm, this.key, iv)
    
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const authTag = cipher.getAuthTag()
    
    return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted
  }

  decrypt(encryptedText: string): string {
    const [ivHex, authTagHex, encrypted] = encryptedText.split(':')
    
    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')
    
    const decipher = crypto.createDecipher(this.algorithm, this.key, iv)
    decipher.setAuthTag(authTag)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }
}
```

#### Chiffrement au repos

```typescript
// security/storage.service.ts
import { Injectable } from '@nestjs/common'
import { EncryptionService } from './encryption.service'

@Injectable()
export class SecureStorageService {
  constructor(private encryptionService: EncryptionService) {}

  async storeSecure(data: any, key: string): Promise<void> {
    const encryptedData = this.encryptionService.encrypt(JSON.stringify(data))
    // Stocker les données chiffrées
    await this.storage.setItem(key, encryptedData)
  }

  async retrieveSecure(key: string): Promise<any> {
    const encryptedData = await this.storage.getItem(key)
    if (!encryptedData) return null
    
    const decryptedData = this.encryptionService.decrypt(encryptedData)
    return JSON.parse(decryptedData)
  }

  private storage = {
    setItem: async (key: string, value: string) => {
      // Implémentation du stockage sécurisé
    },
    getItem: async (key: string): Promise<string | null> => {
      // Implémentation de la récupération sécurisée
      return null
    }
  }
}
```

### 📝 Validation des données

#### Validation côté serveur

```typescript
// validation/user.dto.ts
import { IsEmail, IsString, MinLength, MaxLength, IsOptional, Matches } from 'class-validator'
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
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  })
  password: string

  @ApiProperty({ description: 'User phone number', example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid international phone number'
  })
  phone?: string
}
```

#### Validation côté client

```typescript
// validation/user.validation.ts
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string()
    .email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional()
})

export type User = z.infer<typeof userSchema>

export function validateUser(data: unknown): User {
  try {
    return userSchema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`)
    }
    throw error
  }
}
```

---

## 🔒 Sécurité des API

### 📝 Rate Limiting

```typescript
// security/rate-limit.service.ts
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

@Injectable()
export class RateLimitService {
  private redis: Redis

  constructor(private configService: ConfigService) {
    this.redis = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
      password: this.configService.get('REDIS_PASSWORD')
    })
  }

  async checkRateLimit(
    key: string,
    limit: number,
    windowMs: number
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const current = await this.redis.incr(key)
    
    if (current === 1) {
      await this.redis.expire(key, Math.ceil(windowMs / 1000))
    }
    
    const ttl = await this.redis.ttl(key)
    const resetTime = Date.now() + (ttl * 1000)
    
    return {
      allowed: current <= limit,
      remaining: Math.max(0, limit - current),
      resetTime
    }
  }
}
```

### 📝 CORS Configuration

```typescript
// security/cors.config.ts
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ConfigService } from '@nestjs/config'

export const corsConfig = (configService: ConfigService): CorsOptions => ({
  origin: (origin, callback) => {
    const allowedOrigins = configService.get('ALLOWED_ORIGINS').split(',')
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
})
```

### 📝 Input Sanitization

```typescript
// security/sanitization.service.ts
import { Injectable } from '@nestjs/common'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

@Injectable()
export class SanitizationService {
  private purify: DOMPurify.DOMPurifyI

  constructor() {
    const window = new JSDOM('').window
    this.purify = DOMPurify(window)
  }

  sanitizeInput(input: string): string {
    return this.purify.sanitize(input)
  }

  sanitizeHtml(html: string): string {
    return this.purify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
      ALLOWED_ATTR: ['href', 'title']
    })
  }

  sanitizeObject(obj: any): any {
    if (typeof obj === 'string') {
      return this.sanitizeInput(obj)
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item))
    }
    
    if (obj && typeof obj === 'object') {
      const sanitized: any = {}
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = this.sanitizeObject(value)
      }
      return sanitized
    }
    
    return obj
  }
}
```

---

## 🌐 Sécurité frontend

### 📝 Protection XSS

```typescript
// security/xss-protection.ts
import DOMPurify from 'dompurify'

export class XSSProtection {
  static sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input)
  }

  static sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
      ALLOWED_ATTR: ['href', 'title']
    })
  }

  static escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }
    
    return text.replace(/[&<>"']/g, (m) => map[m])
  }
}
```

### 📝 Protection CSRF

```typescript
// security/csrf-protection.ts
export class CSRFProtection {
  private static token: string | null = null

  static generateToken(): string {
    this.token = this.generateRandomToken()
    return this.token
  }

  static validateToken(token: string): boolean {
    return this.token === token
  }

  static getToken(): string | null {
    return this.token
  }

  private static generateRandomToken(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }
}
```

### 📝 Content Security Policy

```typescript
// security/csp.config.ts
export const cspConfig = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", "data:", "https:"],
  'font-src': ["'self'", "https:"],
  'connect-src': ["'self'", "https:"],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"]
}
```

---

## 💡 Exemples concrets

### 🏗️ Configuration complète de sécurité

#### Configuration NestJS

```typescript
// main.ts
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { AppModule } from './app.module'
import { corsConfig } from './security/cors.config'
import { cspConfig } from './security/csp.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Configuration Helmet
  app.use(helmet({
    contentSecurityPolicy: cspConfig,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }))

  // Compression
  app.use(compression())

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limite chaque IP à 100 requêtes par windowMs
    message: 'Too many requests from this IP, please try again later.'
  })
  app.use(limiter)

  // CORS
  app.enableCors(corsConfig)

  // Validation globale
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the application')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  // Démarrage du serveur
  const port = process.env.APP_PORT || 3000
  await app.listen(port)
  
  console.log(`Application is running on: http://localhost:${port}`)
  console.log(`API documentation: http://localhost:${port}/api/docs`)
}

bootstrap()
```

#### Configuration Vue.js

```typescript
// security/vue-security.ts
import { App } from 'vue'
import { XSSProtection } from './xss-protection'
import { CSRFProtection } from './csrf-protection'

export function setupSecurity(app: App) {
  // Protection XSS globale
  app.config.globalProperties.$sanitize = XSSProtection.sanitizeInput
  app.config.globalProperties.$escapeHtml = XSSProtection.escapeHtml

  // Protection CSRF
  app.config.globalProperties.$csrfToken = CSRFProtection.getToken()

  // Intercepteur de requêtes pour ajouter le token CSRF
  app.config.globalProperties.$http.interceptors.request.use((config: any) => {
    const token = CSRFProtection.getToken()
    if (token) {
      config.headers['X-CSRF-Token'] = token
    }
    return config
  })

  // Intercepteur de réponses pour gérer les erreurs de sécurité
  app.config.globalProperties.$http.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 403) {
        // Gérer l'erreur CSRF
        CSRFProtection.generateToken()
      }
      return Promise.reject(error)
    }
  )
}
```

---

## 📋 Templates de configuration

### 🏗️ Template de configuration de sécurité

```typescript
// security/security.config.ts
import { ConfigService } from '@nestjs/config'

export const securityConfig = (configService: ConfigService) => ({
  // JWT
  jwt: {
    secret: configService.get('JWT_SECRET'),
    expiresIn: configService.get('JWT_EXPIRES_IN', '15m'),
    refreshSecret: configService.get('JWT_REFRESH_SECRET'),
    refreshExpiresIn: configService.get('JWT_REFRESH_EXPIRES_IN', '7d')
  },

  // Encryption
  encryption: {
    key: configService.get('ENCRYPTION_KEY'),
    algorithm: 'aes-256-gcm'
  },

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limite chaque IP à 100 requêtes par windowMs
  },

  // CORS
  cors: {
    origin: configService.get('ALLOWED_ORIGINS').split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },

  // CSP
  csp: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", "data:", "https:"],
    'font-src': ["'self'", "https:"],
    'connect-src': ["'self'", "https:"],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"]
  }
})
```

---

## ✅ Checklist de validation

### 📋 Sécurité générale

- [ ] **OWASP Top 10** couvert
- [ ] **Authentification** sécurisée implémentée
- [ ] **Autorisation** basée sur les rôles
- [ ] **Chiffrement** des données sensibles
- [ ] **Validation** des données d'entrée

### 📋 Sécurité des API

- [ ] **Rate limiting** configuré
- [ ] **CORS** configuré correctement
- [ ] **Input sanitization** implémentée
- [ ] **Output encoding** appliqué
- [ ] **Headers de sécurité** configurés

### 📋 Sécurité frontend

- [ ] **Protection XSS** implémentée
- [ ] **Protection CSRF** configurée
- [ ] **Content Security Policy** définie
- [ ] **Validation côté client** implémentée
- [ ] **Gestion sécurisée des tokens**

### 📋 Monitoring et audit

- [ ] **Logging sécurisé** configuré
- [ ] **Monitoring des tentatives d'intrusion**
- [ ] **Audit des accès** implémenté
- [ ] **Alertes de sécurité** configurées
- [ ] **Tests de sécurité** automatisés

---

## 📚 Ressources

### 🎓 Formation
- [Standards de code](./coding-standards.md)
- [Stratégie de tests](./testing-strategy.md)
- [Setup de projet](./project-setup.md)
- [Architecture globale](../03-architecture/global-architecture.md)

### 🛠️ Outils
- [Helmet](https://helmetjs.github.io/) - Headers de sécurité
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Hachage de mots de passe
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JWT
- [class-validator](https://www.npmjs.com/package/class-validator) - Validation
- [DOMPurify](https://www.npmjs.com/package/dompurify) - Sanitisation HTML

### 📖 Références
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - OWASP
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) - OWASP
- [JWT.io](https://jwt.io/) - JWT
- [Security Headers](https://securityheaders.com/) - Security Headers

---

<div align="center">

[![Retour au Profil](../../../README.md)](../../../README.md)

</div>

---

*Dernière mise à jour : Janvier 2024*
