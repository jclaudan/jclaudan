# 🌐 Architecture Globale : Fondements et Patterns

## 📋 Table des matières
- [Introduction](#introduction)
- [Types d'architectures](#types-darchitectures)
- [Patterns d'architecture](#patterns-darchitecture)
- [Flux de données](#flux-de-données)
- [Communication entre services](#communication-entre-services)
- [Sécurité et authentification](#sécurité-et-authentification)
- [Gestion des erreurs](#gestion-des-erreurs)
- [Monitoring et observabilité](#monitoring-et-observabilité)
- [Templates d'architecture](#templates-darchitecture)
- [Checklist de validation](#checklist-de-validation)
- [Ressources](#ressources)

## 🎯 Introduction

L'architecture globale définit la structure fondamentale de votre système, les interactions entre composants et les patterns qui guident l'évolution de votre application. Ce guide vous présente les différents types d'architectures et leurs applications.

### 🎯 Objectifs

- **Comprendre** les types d'architectures disponibles
- **Identifier** les patterns d'architecture appropriés
- **Définir** les flux de données et communications
- **Intégrer** la sécurité dès la conception
- **Planifier** la gestion des erreurs et le monitoring

---

## 🏗️ Types d'architectures

### 📊 Classification des architectures

| Type | Description | Avantages | Inconvénients | Cas d'usage |
|------|-------------|-----------|---------------|-------------|
| **Monolithe** | Application unique | Simple, rapide, cohérent | Scalabilité limitée, couplage | Applications simples |
| **Microservices** | Services indépendants | Scalable, flexible, résilient | Complexe, réseau distribué | Applications complexes |
| **Serverless** | Fonctions sans serveur | Scalable, économique, simple | Cold start, vendor lock-in | Applications événementielles |
| **Hybride** | Combinaison d'approches | Optimisé, flexible | Complexe, gestion multiple | Applications évolutives |

### 🔍 Caractéristiques détaillées

#### Architecture monolithe

**Principe**
Une seule application déployée qui gère toutes les fonctionnalités.

**Avantages**
- **Simplicité** : Un seul déploiement
- **Performance** : Communication locale
- **Cohérence** : Base de données unique
- **Développement rapide** : Pas de complexité réseau

**Inconvénients**
- **Scalabilité limitée** : Un seul point de montée en charge
- **Couplage fort** : Modification difficile
- **Technologies uniques** : Pas de polyglottisme
- **Point de défaillance unique** : Risque global

**Cas d'usage**
- Applications internes
- Prototypes et MVP
- Applications avec logique métier simple
- Équipes petites et co-localisées

#### Architecture microservices

**Principe**
Système composé de services indépendants, chacun gérant une fonctionnalité métier.

**Avantages**
- **Scalabilité indépendante** : Chaque service peut évoluer
- **Technologies multiples** : Polyglottisme possible
- **Résilience** : Isolation des pannes
- **Équipes autonomes** : Développement parallèle

**Inconvénients**
- **Complexité** : Gestion distribuée
- **Réseau distribué** : Latence et fiabilité
- **Transactions distribuées** : Complexité ACID
- **Debugging difficile** : Traçabilité complexe

**Cas d'usage**
- Applications complexes
- Équipes multiples
- Besoins de scalabilité
- Évolution rapide des fonctionnalités

#### Architecture serverless

**Principe**
Exécution de fonctions à la demande sans gestion de serveur.

**Avantages**
- **Scalabilité automatique** : Gestion transparente
- **Coût optimisé** : Paiement à l'usage
- **Maintenance minimale** : Pas de serveur à gérer
- **Déploiement simple** : Fonctions indépendantes

**Inconvénients**
- **Cold start** : Latence initiale
- **Limites d'exécution** : Contraintes temporelles
- **Vendor lock-in** : Dépendance au provider
- **Debugging complexe** : Environnement distribué

**Cas d'usage**
- APIs événementielles
- Traitement de données
- Intégrations tierces
- Applications avec charge variable

#### Architecture hybride

**Principe**
Combinaison intelligente de différents types d'architectures.

**Avantages**
- **Optimisation** : Meilleur des deux mondes
- **Flexibilité** : Adaptation au contexte
- **Évolutivité** : Migration progressive
- **Performance** : Optimisation par composant

**Inconvénients**
- **Complexité** : Gestion multiple
- **Courbe d'apprentissage** : Expertise requise
- **Maintenance** : Outils multiples
- **Coût** : Gestion complexe

**Cas d'usage**
- Applications en évolution
- Migration progressive
- Besoins mixtes
- Optimisation continue

---

## 🎨 Patterns d'architecture

### 📝 Patterns fondamentaux

#### Architecture en couches (Layered Architecture)

**Principe**
Organisation du système en couches hiérarchiques avec des responsabilités distinctes.

![Diagramme Mermaid](assets/mermaid/global-architecture-0-fr-methodology-03-architecture-global-architecture.png)

**Avantages**
- **Séparation claire** des responsabilités
- **Maintenabilité** élevée
- **Testabilité** facilitée
- **Compréhension** intuitive

**Inconvénients**
- **Performance** : Couches multiples
- **Couplage** : Dépendances entre couches
- **Rigidité** : Évolution difficile
- **Complexité** : Gestion des couches

#### Architecture hexagonale (Ports and Adapters)

**Principe**
Isolation du domaine métier avec des ports et adaptateurs pour les interfaces externes.

![Diagramme Mermaid](assets/mermaid/global-architecture-1-fr-methodology-03-architecture-global-architecture.png)

**Avantages**
- **Isolation** du domaine métier
- **Testabilité** maximale
- **Flexibilité** des adaptateurs
- **Évolutivité** facilitée

**Inconvénients**
- **Complexité** initiale
- **Courbe d'apprentissage**
- **Over-engineering** possible
- **Performance** potentiellement impactée

#### Clean Architecture

**Principe**
Organisation en cercles concentriques avec dépendances vers l'intérieur.

![Diagramme Mermaid](assets/mermaid/global-architecture-2-fr-methodology-03-architecture-global-architecture.png)

**Avantages**
- **Indépendance** du framework
- **Testabilité** élevée
- **Flexibilité** maximale
- **Maintenabilité** excellente

**Inconvénients**
- **Complexité** élevée
- **Temps de développement**
- **Over-engineering**
- **Performance** potentiellement impactée

#### Domain-Driven Design (DDD)

**Principe**
Conception centrée sur le domaine métier avec modélisation explicite.

![Diagramme Mermaid](assets/mermaid/global-architecture-3-fr-methodology-03-architecture-global-architecture.png)

**Avantages**
- **Modélisation** du domaine métier
- **Communication** facilitée
- **Évolutivité** du domaine
- **Cohérence** métier

**Inconvénients**
- **Complexité** de modélisation
- **Temps de conception**
- **Expertise** métier requise
- **Over-engineering** possible

### 🏗️ Patterns de communication

#### Event-Driven Architecture

**Principe**
Communication asynchrone basée sur des événements.

![Diagramme Mermaid](assets/mermaid/global-architecture-4-fr-methodology-03-architecture-global-architecture.png)

**Avantages**
- **Découplage** maximal
- **Scalabilité** élevée
- **Résilience** améliorée
- **Évolutivité** facilitée

**Inconvénients**
- **Complexité** de gestion
- **Debugging** difficile
- **Cohérence** éventuelle
- **Performance** potentiellement impactée

#### CQRS (Command Query Responsibility Segregation)

**Principe**
Séparation des opérations de lecture et d'écriture.

![Diagramme Mermaid](assets/mermaid/global-architecture-5-fr-methodology-03-architecture-global-architecture.png)

**Avantages**
- **Optimisation** des lectures
- **Scalabilité** indépendante
- **Flexibilité** des modèles
- **Performance** améliorée

**Inconvénients**
- **Complexité** de synchronisation
- **Cohérence** éventuelle
- **Over-engineering**
- **Maintenance** complexe

---

## 🔄 Flux de données

### 📊 Patterns de flux

#### Flux synchrone

**Principe**
Communication directe avec attente de réponse.

![Diagramme Mermaid](assets/mermaid/global-architecture-6-fr-methodology-03-architecture-global-architecture.png)

**Avantages**
- **Simplicité** de gestion
- **Cohérence** forte
- **Debugging** facilité
- **Performance** prévisible

**Inconvénients**
- **Couplage** fort
- **Latence** cumulative
- **Point de défaillance** unique
- **Scalabilité** limitée

#### Flux asynchrone

**Principe**
Communication sans attente de réponse immédiate.

![Diagramme Mermaid](assets/mermaid/global-architecture-7-fr-methodology-03-architecture-global-architecture.png)

**Avantages**
- **Découplage** des services
- **Résilience** améliorée
- **Scalabilité** élevée
- **Performance** optimisée

**Inconvénients**
- **Complexité** de gestion
- **Cohérence** éventuelle
- **Debugging** difficile
- **Monitoring** complexe

#### Flux hybride

**Principe**
Combinaison de flux synchrones et asynchrones selon le contexte.

![Diagramme Mermaid](assets/mermaid/global-architecture-8-fr-methodology-03-architecture-global-architecture.png)

**Avantages**
- **Optimisation** par contexte
- **Flexibilité** maximale
- **Performance** adaptée
- **Évolutivité** facilitée

**Inconvénients**
- **Complexité** de gestion
- **Cohérence** à maintenir
- **Debugging** complexe
- **Maintenance** multiple

---

## 🔗 Communication entre services

### 📡 Protocoles de communication

#### REST (Representational State Transfer)

**Principe**
Communication basée sur HTTP avec ressources identifiées par URI.

```typescript
// Exemple d'API REST
interface UserAPI {
  // GET /users
  getUsers(): Promise<User[]>;
  
  // GET /users/:id
  getUser(id: string): Promise<User>;
  
  // POST /users
  createUser(user: CreateUserDto): Promise<User>;
  
  // PUT /users/:id
  updateUser(id: string, user: UpdateUserDto): Promise<User>;
  
  // DELETE /users/:id
  deleteUser(id: string): Promise<void>;
}
```

**Avantages**
- **Simplicité** de compréhension
- **Standardisation** HTTP
- **Cache** natif
- **Outils** nombreux

**Inconvénients**
- **Over-fetching/under-fetching**
- **Versioning** complexe
- **Performance** limitée
- **Couplage** potentiel

#### GraphQL

**Principe**
Query language permettant de récupérer exactement les données nécessaires.

```graphql
# Schema GraphQL
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User
  users: [User!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
}
```

**Avantages**
- **Flexibilité** des requêtes
- **Performance** optimisée
- **Type safety** fort
- **Évolutivité** facilitée

**Inconvénients**
- **Complexité** de mise en place
- **Cache** complexe
- **Performance** potentiellement impactée
- **Courbe d'apprentissage**

#### gRPC

**Principe**
Communication haute performance basée sur HTTP/2 et Protocol Buffers.

```protobuf
// user.proto
syntax = "proto3";

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc CreateUser(CreateUserRequest) returns (User);
  rpc UpdateUser(UpdateUserRequest) returns (User);
  rpc DeleteUser(DeleteUserRequest) returns (Empty);
}

message User {
  string id = 1;
  string name = 2;
  string email = 3;
}

message GetUserRequest {
  string id = 1;
}
```

**Avantages**
- **Performance** élevée
- **Type safety** fort
- **Streaming** bidirectionnel
- **Polyglottisme**

**Inconvénients**
- **Complexité** de mise en place
- **Debugging** difficile
- **Écosystème** limité
- **Courbe d'apprentissage**

### 📨 Patterns de communication

#### Request-Response

**Principe**
Communication synchrone avec attente de réponse.

```typescript
// Exemple de communication request-response
class UserService {
  async getUser(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }
}
```

**Avantages**
- **Simplicité** de gestion
- **Cohérence** forte
- **Debugging** facilité
- **Performance** prévisible

**Inconvénients**
- **Couplage** fort
- **Latence** cumulative
- **Point de défaillance** unique
- **Scalabilité** limitée

#### Publish-Subscribe

**Principe**
Communication asynchrone basée sur des événements.

```typescript
// Exemple de publish-subscribe
class EventBus {
  private subscribers: Map<string, Function[]> = new Map();
  
  subscribe(event: string, callback: Function): void {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event)!.push(callback);
  }
  
  publish(event: string, data: any): void {
    const callbacks = this.subscribers.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }
}
```

**Avantages**
- **Découplage** maximal
- **Scalabilité** élevée
- **Résilience** améliorée
- **Évolutivité** facilitée

**Inconvénients**
- **Complexité** de gestion
- **Debugging** difficile
- **Cohérence** éventuelle
- **Performance** potentiellement impactée

#### Message Queue

**Principe**
Communication asynchrone via une file d'attente de messages.

```typescript
// Exemple de message queue
class MessageQueue {
  private queue: Message[] = [];
  
  async publish(message: Message): Promise<void> {
    this.queue.push(message);
    // Traitement asynchrone
    this.processQueue();
  }
  
  async subscribe(callback: (message: Message) => Promise<void>): Promise<void> {
    // Écoute des messages
    while (true) {
      const message = await this.getNextMessage();
      await callback(message);
    }
  }
}
```

**Avantages**
- **Fiabilité** élevée
- **Scalabilité** excellente
- **Résilience** maximale
- **Performance** optimisée

**Inconvénients**
- **Complexité** de gestion
- **Latence** potentielle
- **Debugging** difficile
- **Maintenance** complexe

---

## 🔒 Sécurité et authentification

### 🛡️ Modèles de sécurité

#### Authentification

**JWT (JSON Web Token)**
```typescript
// Exemple d'authentification JWT
interface JWTPayload {
  sub: string; // User ID
  email: string;
  role: string;
  iat: number; // Issued at
  exp: number; // Expires at
}

class AuthService {
  generateToken(user: User): string {
    const payload: JWTPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
  
  verifyToken(token: string): JWTPayload {
    return jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
  }
}
```

**OAuth 2.0**
```typescript
// Exemple d'authentification OAuth 2.0
class OAuthService {
  async authenticateWithGoogle(code: string): Promise<User> {
    const tokenResponse = await this.exchangeCodeForToken(code);
    const userInfo = await this.getUserInfo(tokenResponse.access_token);
    
    return this.createOrUpdateUser(userInfo);
  }
  
  private async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code'
      })
    });
    
    return response.json();
  }
}
```

#### Autorisation

**RBAC (Role-Based Access Control)**
```typescript
// Exemple d'autorisation RBAC
enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

enum Permission {
  READ_USERS = 'read:users',
  WRITE_USERS = 'write:users',
  DELETE_USERS = 'delete:users',
  READ_POSTS = 'read:posts',
  WRITE_POSTS = 'write:posts'
}

const rolePermissions: Record<Role, Permission[]> = {
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
};

class AuthorizationService {
  hasPermission(userRole: Role, permission: Permission): boolean {
    const permissions = rolePermissions[userRole];
    return permissions.includes(permission);
  }
  
  canAccess(userRole: Role, resource: string, action: string): boolean {
    const permission = `${action}:${resource}` as Permission;
    return this.hasPermission(userRole, permission);
  }
}
```

**ABAC (Attribute-Based Access Control)**
```typescript
// Exemple d'autorisation ABAC
interface UserAttributes {
  role: Role;
  department: string;
  clearanceLevel: number;
  location: string;
}

interface ResourceAttributes {
  type: string;
  owner: string;
  classification: string;
  department: string;
}

interface Policy {
  id: string;
  name: string;
  rules: AccessRule[];
}

interface AccessRule {
  condition: string;
  effect: 'allow' | 'deny';
}

class ABACService {
  evaluateAccess(
    user: UserAttributes,
    resource: ResourceAttributes,
    action: string
  ): boolean {
    const policies = this.getPolicies(resource.type);
    
    for (const policy of policies) {
      const result = this.evaluatePolicy(policy, user, resource, action);
      if (result !== null) {
        return result;
      }
    }
    
    return false; // Default deny
  }
  
  private evaluatePolicy(
    policy: Policy,
    user: UserAttributes,
    resource: ResourceAttributes,
    action: string
  ): boolean | null {
    for (const rule of policy.rules) {
      if (this.evaluateCondition(rule.condition, user, resource, action)) {
        return rule.effect === 'allow';
      }
    }
    
    return null; // No match
  }
}
```

### 🔐 Sécurité des données

#### Chiffrement

**Chiffrement en transit**
```typescript
// Exemple de chiffrement en transit
class SecureTransport {
  async sendSecureData(data: any, endpoint: string): Promise<any> {
    const encryptedData = await this.encrypt(data);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
        'X-Encrypted': 'true'
      },
      body: JSON.stringify(encryptedData)
    });
    
    return response.json();
  }
  
  private async encrypt(data: any): Promise<string> {
    const key = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: new Uint8Array(12) },
      key,
      new TextEncoder().encode(JSON.stringify(data))
    );
    
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  }
}
```

**Chiffrement au repos**
```typescript
// Exemple de chiffrement au repos
class SecureStorage {
  private encryptionKey: string;
  
  constructor(encryptionKey: string) {
    this.encryptionKey = encryptionKey;
  }
  
  async storeSecure(data: any, key: string): Promise<void> {
    const encryptedData = await this.encrypt(data);
    await this.storage.setItem(key, encryptedData);
  }
  
  async retrieveSecure(key: string): Promise<any> {
    const encryptedData = await this.storage.getItem(key);
    if (!encryptedData) return null;
    
    return this.decrypt(encryptedData);
  }
  
  private async encrypt(data: any): Promise<string> {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.encryptionKey),
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: new Uint8Array(12) },
      key,
      new TextEncoder().encode(JSON.stringify(data))
    );
    
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  }
}
```

#### Validation des données

**Validation côté serveur**
```typescript
// Exemple de validation avec class-validator
import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
  
  @IsEmail()
  email: string;
  
  @IsString()
  @MinLength(8)
  password: string;
  
  @IsOptional()
  @IsString()
  role?: string;
}

class UserService {
  async createUser(userData: CreateUserDto): Promise<User> {
    // Validation automatique
    const errors = await validate(userData);
    if (errors.length > 0) {
      throw new ValidationError('Invalid user data', errors);
    }
    
    // Traitement des données
    return this.userRepository.create(userData);
  }
}
```

**Validation côté client**
```typescript
// Exemple de validation avec Zod
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.string().optional()
});

type User = z.infer<typeof userSchema>;

class UserForm {
  validate(data: unknown): User {
    try {
      return userSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError('Invalid form data', error.errors);
      }
      throw error;
    }
  }
}
```

---

## ⚠️ Gestion des erreurs

### 🎯 Stratégies de gestion d'erreurs

#### Types d'erreurs

**Erreurs métier**
```typescript
// Exemple de gestion des erreurs métier
class BusinessError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'BusinessError';
  }
}

class UserNotFoundError extends BusinessError {
  constructor(userId: string) {
    super(`User with ID ${userId} not found`, 'USER_NOT_FOUND', 404);
  }
}

class InsufficientPermissionsError extends BusinessError {
  constructor(action: string) {
    super(`Insufficient permissions for action: ${action}`, 'INSUFFICIENT_PERMISSIONS', 403);
  }
}
```

**Erreurs techniques**
```typescript
// Exemple de gestion des erreurs techniques
class TechnicalError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public cause?: Error
  ) {
    super(message);
    this.name = 'TechnicalError';
  }
}

class DatabaseError extends TechnicalError {
  constructor(message: string, cause?: Error) {
    super(message, 'DATABASE_ERROR', 500, cause);
  }
}

class ExternalServiceError extends TechnicalError {
  constructor(serviceName: string, message: string, cause?: Error) {
    super(`External service ${serviceName} error: ${message}`, 'EXTERNAL_SERVICE_ERROR', 502, cause);
  }
}
```

#### Gestion centralisée

**Error Handler**
```typescript
// Exemple de gestion centralisée des erreurs
class ErrorHandler {
  handle(error: Error, context: any): ErrorResponse {
    if (error instanceof BusinessError) {
      return this.handleBusinessError(error, context);
    }
    
    if (error instanceof TechnicalError) {
      return this.handleTechnicalError(error, context);
    }
    
    return this.handleUnknownError(error, context);
  }
  
  private handleBusinessError(error: BusinessError, context: any): ErrorResponse {
    return {
      statusCode: error.statusCode,
      error: {
        code: error.code,
        message: error.message,
        timestamp: new Date().toISOString(),
        requestId: context.requestId
      }
    };
  }
  
  private handleTechnicalError(error: TechnicalError, context: any): ErrorResponse {
    // Log l'erreur pour debugging
    this.logger.error('Technical error occurred', {
      error: error.message,
      code: error.code,
      cause: error.cause,
      context
    });
    
    return {
      statusCode: error.statusCode,
      error: {
        code: error.code,
        message: 'An internal error occurred',
        timestamp: new Date().toISOString(),
        requestId: context.requestId
      }
    };
  }
  
  private handleUnknownError(error: Error, context: any): ErrorResponse {
    // Log l'erreur pour debugging
    this.logger.error('Unknown error occurred', {
      error: error.message,
      stack: error.stack,
      context
    });
    
    return {
      statusCode: 500,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
        requestId: context.requestId
      }
    };
  }
}
```

#### Retry et Circuit Breaker

**Retry Pattern**
```typescript
// Exemple de retry pattern
class RetryService {
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries) {
          break;
        }
        
        // Attendre avant de réessayer
        await this.delay(delay * Math.pow(2, attempt - 1)); // Exponential backoff
      }
    }
    
    throw lastError!;
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

**Circuit Breaker Pattern**
```typescript
// Exemple de circuit breaker pattern
enum CircuitState {
  CLOSED = 'closed',
  OPEN = 'open',
  HALF_OPEN = 'half-open'
}

class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  
  constructor(
    private threshold: number = 5,
    private timeout: number = 60000
  ) {}
  
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = CircuitState.HALF_OPEN;
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess(): void {
    this.failureCount = 0;
    this.state = CircuitState.CLOSED;
  }
  
  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = CircuitState.OPEN;
    }
  }
}
```

---

## 📊 Monitoring et observabilité

### 🔍 Métriques et logs

#### Logging structuré

**Structured Logging**
```typescript
// Exemple de logging structuré
interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  requestId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

class StructuredLogger {
  private context: Record<string, any> = {};
  
  setContext(context: Record<string, any>): void {
    this.context = { ...this.context, ...context };
  }
  
  info(message: string, metadata?: Record<string, any>): void {
    this.log('info', message, metadata);
  }
  
  error(message: string, error?: Error, metadata?: Record<string, any>): void {
    this.log('error', message, {
      ...metadata,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : undefined
    });
  }
  
  private log(level: LogEntry['level'], message: string, metadata?: Record<string, any>): void {
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...this.context,
      ...metadata
    };
    
    console.log(JSON.stringify(logEntry));
  }
}
```

#### Métriques

**Custom Metrics**
```typescript
// Exemple de métriques personnalisées
class MetricsCollector {
  private metrics: Map<string, number> = new Map();
  private counters: Map<string, number> = new Map();
  private histograms: Map<string, number[]> = new Map();
  
  incrementCounter(name: string, value: number = 1): void {
    const current = this.counters.get(name) || 0;
    this.counters.set(name, current + value);
  }
  
  recordHistogram(name: string, value: number): void {
    const current = this.histograms.get(name) || [];
    current.push(value);
    this.histograms.set(name, current);
  }
  
  setGauge(name: string, value: number): void {
    this.metrics.set(name, value);
  }
  
  getMetrics(): Record<string, any> {
    return {
      counters: Object.fromEntries(this.counters),
      gauges: Object.fromEntries(this.metrics),
      histograms: Object.fromEntries(
        Array.from(this.histograms.entries()).map(([name, values]) => [
          name,
          {
            count: values.length,
            sum: values.reduce((a, b) => a + b, 0),
            min: Math.min(...values),
            max: Math.max(...values),
            avg: values.reduce((a, b) => a + b, 0) / values.length
          }
        ])
      )
    };
  }
}
```

#### Health Checks

**Health Check Service**
```typescript
// Exemple de health check
interface HealthCheck {
  name: string;
  status: 'healthy' | 'unhealthy';
  message?: string;
  details?: Record<string, any>;
}

class HealthCheckService {
  private checks: Map<string, () => Promise<HealthCheck>> = new Map();
  
  registerCheck(name: string, check: () => Promise<HealthCheck>): void {
    this.checks.set(name, check);
  }
  
  async runChecks(): Promise<{
    status: 'healthy' | 'unhealthy';
    checks: HealthCheck[];
  }> {
    const results: HealthCheck[] = [];
    
    for (const [name, check] of this.checks) {
      try {
        const result = await check();
        results.push(result);
      } catch (error) {
        results.push({
          name,
          status: 'unhealthy',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    const overallStatus = results.every(check => check.status === 'healthy') 
      ? 'healthy' 
      : 'unhealthy';
    
    return {
      status: overallStatus,
      checks: results
    };
  }
}

// Exemple d'utilisation
const healthCheckService = new HealthCheckService();

healthCheckService.registerCheck('database', async () => {
  try {
    await database.ping();
    return {
      name: 'database',
      status: 'healthy',
      details: { connection: 'active' }
    };
  } catch (error) {
    return {
      name: 'database',
      status: 'unhealthy',
      message: 'Database connection failed'
    };
  }
});

healthCheckService.registerCheck('external-api', async () => {
  try {
    const response = await fetch('https://api.external.com/health');
    return {
      name: 'external-api',
      status: response.ok ? 'healthy' : 'unhealthy',
      details: { status: response.status }
    };
  } catch (error) {
    return {
      name: 'external-api',
      status: 'unhealthy',
      message: 'External API unreachable'
    };
  }
});
```

---

## 📋 Templates d'architecture

### 🏗️ Template d'architecture monolithe

![Diagramme Mermaid](assets/mermaid/global-architecture-9-fr-methodology-03-architecture-global-architecture.png)

**Structure de dossiers**
```
src/
├── controllers/       # Contrôleurs
├── services/          # Services métier
├── repositories/      # Accès aux données
├── models/           # Modèles de données
├── middleware/       # Middleware
├── utils/            # Utilitaires
├── config/           # Configuration
└── tests/            # Tests
```

### 🏗️ Template d'architecture microservices

![Diagramme Mermaid](assets/mermaid/global-architecture-10-fr-methodology-03-architecture-global-architecture.png)

**Structure de dossiers**
```
services/
├── user-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   └── models/
│   ├── tests/
│   └── docker/
├── product-service/
│   ├── src/
│   ├── tests/
│   └── docker/
└── order-service/
    ├── src/
    ├── tests/
    └── docker/
```

### 🏗️ Template d'architecture serverless

![Diagramme Mermaid](assets/mermaid/global-architecture-11-fr-methodology-03-architecture-global-architecture.png)

**Structure de dossiers**
```
functions/
├── user/
│   ├── handler.ts
│   ├── model.ts
│   └── test.ts
├── product/
│   ├── handler.ts
│   ├── model.ts
│   └── test.ts
└── order/
    ├── handler.ts
    ├── model.ts
    └── test.ts
```

### 🏗️ Template d'architecture hybride

![Diagramme Mermaid](assets/mermaid/global-architecture-12-fr-methodology-03-architecture-global-architecture.png)

**Structure de dossiers**
```
src/
├── monolith/          # Application monolithe
│   ├── controllers/
│   ├── services/
│   └── models/
├── microservices/     # Services indépendants
│   ├── user-service/
│   ├── product-service/
│   └── order-service/
├── shared/            # Code partagé
│   ├── utils/
│   ├── models/
│   └── types/
└── infrastructure/    # Infrastructure
    ├── docker/
    ├── kubernetes/
    └── terraform/
```

---

## ✅ Checklist de validation

### 📋 Analyse de l'architecture

- [ ] **Type d'architecture** choisi selon les besoins
- [ ] **Patterns d'architecture** identifiés et appliqués
- [ ] **Flux de données** définis et documentés
- [ ] **Communication entre services** planifiée
- [ ] **Sécurité** intégrée dès la conception

### 📋 Validation technique

- [ ] **Scalabilité** de l'architecture évaluée
- [ ] **Performance** anticipée et optimisée
- [ ] **Résilience** et gestion des pannes planifiée
- [ ] **Monitoring** et observabilité intégrés
- [ ] **Tests** de l'architecture définis

### 📋 Validation métier

- [ ] **Besoins métier** couverts par l'architecture
- [ ] **Évolutivité** de l'architecture assurée
- [ ] **Maintenabilité** de l'architecture validée
- [ ] **Coûts** de l'architecture estimés
- [ ] **Risques** de l'architecture identifiés

### 📋 Documentation

- [ ] **Schémas d'architecture** créés et validés
- [ ] **Documentation** de l'architecture complète
- [ ] **Guidelines** de développement définis
- [ ] **Standards** de code établis
- [ ] **Formation** de l'équipe planifiée

---

## 📚 Ressources

### 🎓 Formation
- [Architecture backend](./backend-architecture.md)
- [Architecture frontend](./frontend-architecture.md)
- [Architecture base de données](./database-architecture.md)
- [Microservices](../architecture/microservices-complete-guide.md)

### 🛠️ Outils
- [Draw.io](https://app.diagrams.net/) - Diagrammes d'architecture
- [Mermaid](https://mermaid-js.github.io/) - Diagrammes en code
- [Archimate](https://www.opengroup.org/archimate) - Modélisation d'architecture
- [C4 Model](https://c4model.com/) - Modélisation d'architecture

### 📖 Références
- [Clean Architecture](https://www.oreilly.com/library/view/clean-architecture/9780134278842/) - Robert C. Martin
- [Microservices Patterns](https://www.oreilly.com/library/view/microservices-patterns/9781617294549/) - Chris Richardson
- [Domain-Driven Design](https://www.oreilly.com/library/view/domain-driven-design/9780321125217/) - Eric Evans
- [Building Microservices](https://www.oreilly.com/library/view/building-microservices/9781491950340/) - Sam Newman

---

<div align="center">

[![Retour au Profil](../../../README.md)](../../../README.md)

</div>

---

*Dernière mise à jour : Janvier 2024*
