# 🏗️ Microservices - Guide Complet

## 📋 Tableaux de Référence Complète Microservices

### 🎯 Concepts Clés

| Concept | Description | Avantages | Inconvénients |
|---------|-------------|-----------|---------------|
| **Microservice** | Service autonome et indépendant | Scalabilité, indépendance | Complexité, communication |
| **API Gateway** | Point d'entrée unique | Centralisation, sécurité | Point de défaillance |
| **Service Discovery** | Découverte automatique des services | Flexibilité, résilience | Complexité |
| **Load Balancing** | Distribution de charge | Performance, disponibilité | Configuration |
| **Circuit Breaker** | Protection contre les pannes | Résilience, stabilité | Complexité |
| **Event Sourcing** | Stockage d'événements | Audit, historique | Complexité |
| **CQRS** | Séparation lecture/écriture | Performance, scalabilité | Complexité |
| **Saga Pattern** | Transactions distribuées | Consistance, résilience | Complexité |
| **Containerisation** | Isolation des services | Portabilité, déploiement | Gestion |
| **Orchestration** | Coordination des services | Automatisation, gestion | Complexité |

### 🎯 Technologies et Outils

| Catégorie | Outil | Description | Usage |
|-----------|-------|-------------|-------|
| **Conteneurisation** | Docker | Conteneurs | Isolation des services |
| **Orchestration** | Kubernetes | Orchestration | Gestion des conteneurs |
| **Service Mesh** | Istio | Communication | Gestion du trafic |
| **API Gateway** | Kong | Passerelle API | Routage, sécurité |
| **Service Discovery** | Consul | Découverte | Enregistrement des services |
| **Message Broker** | RabbitMQ | Messages | Communication asynchrone |
| **Event Streaming** | Apache Kafka | Streaming | Événements en temps réel |
| **Database** | PostgreSQL | Base de données | Stockage relationnel |
| **NoSQL** | MongoDB | Base de données | Stockage document |
| **Cache** | Redis | Cache | Performance |
| **Monitoring** | Prometheus | Métriques | Surveillance |
| **Logging** | ELK Stack | Logs | Centralisation |
| **Tracing** | Jaeger | Traçage | Debugging |

### 🎯 Patterns de Communication

| Pattern | Description | Protocole | Usage |
|---------|-------------|-----------|-------|
| **Synchronous** | Communication synchrone | HTTP/REST | Requêtes directes |
| **Asynchronous** | Communication asynchrone | Message Queue | Événements |
| **Event-Driven** | Basé sur événements | Pub/Sub | Découplage |
| **Request-Response** | Requête-réponse | HTTP/gRPC | Communication directe |
| **Publish-Subscribe** | Publication-souscription | MQTT/AMQP | Diffusion |
| **Request-Reply** | Requête-réponse | HTTP/gRPC | Communication bidirectionnelle |
| **Fire-and-Forget** | Envoi et oubli | UDP/Message | Notifications |
| **Streaming** | Streaming | WebSocket/gRPC | Temps réel |
| **Batch** | Traitement par lots | File | Traitement différé |
| **Polling** | Interrogation | HTTP | Vérification périodique |

### 🎯 Patterns de Données

| Pattern | Description | Usage | Exemple |
|---------|-------------|-------|---------|
| **Database per Service** | Base de données par service | Isolation | PostgreSQL par service |
| **Shared Database** | Base de données partagée | Simplicité | Base de données commune |
| **Saga Pattern** | Transactions distribuées | Consistance | Workflow distribué |
| **Event Sourcing** | Stockage d'événements | Audit | Historique des changements |
| **CQRS** | Séparation lecture/écriture | Performance | Modèles séparés |
| **API Composition** | Composition d'API | Agrégation | Données multiples |
| **Data Replication** | Réplication de données | Performance | Copies locales |
| **Data Federation** | Fédération de données | Intégration | Vue unifiée |
| **Data Lake** | Lac de données | Analytics | Stockage massif |
| **Data Warehouse** | Entrepôt de données | Reporting | Données structurées |

### 🎯 Patterns de Sécurité

| Pattern | Description | Implémentation | Usage |
|---------|-------------|----------------|-------|
| **API Gateway** | Passerelle API | Kong, Zuul | Point d'entrée unique |
| **Service-to-Service** | Service à service | mTLS, JWT | Communication sécurisée |
| **OAuth 2.0** | Authentification | OAuth 2.0 | Autorisation |
| **JWT** | Tokens JWT | JWT | Authentification |
| **mTLS** | TLS mutuel | Certificats | Chiffrement |
| **Rate Limiting** | Limitation de débit | Redis, Nginx | Protection |
| **CORS** | Cross-Origin | Headers | Sécurité web |
| **Input Validation** | Validation d'entrée | Schemas | Sécurité des données |
| **Encryption** | Chiffrement | AES, RSA | Protection des données |
| **Secrets Management** | Gestion des secrets | Vault, K8s | Sécurité des clés |

### 🎯 Patterns de Monitoring

| Pattern | Description | Outil | Usage |
|---------|-------------|-------|-------|
| **Health Checks** | Vérifications de santé | K8s, Consul | Disponibilité |
| **Metrics** | Métriques | Prometheus | Performance |
| **Logging** | Journalisation | ELK Stack | Debugging |
| **Tracing** | Traçage | Jaeger, Zipkin | Debugging |
| **Alerting** | Alertes | AlertManager | Notification |
| **Dashboards** | Tableaux de bord | Grafana | Visualisation |
| **APM** | Application Performance | New Relic | Monitoring |
| **Synthetic Monitoring** | Monitoring synthétique | Pingdom | Tests |
| **Real User Monitoring** | Monitoring utilisateur | Google Analytics | Expérience |
| **Infrastructure Monitoring** | Monitoring infrastructure | Datadog | Infrastructure |

### 🎯 Patterns de Déploiement

| Pattern | Description | Outil | Usage |
|---------|-------------|-------|-------|
| **Blue-Green** | Déploiement bleu-vert | K8s, Docker | Zéro temps d'arrêt |
| **Canary** | Déploiement canari | Istio, K8s | Déploiement progressif |
| **Rolling** | Déploiement progressif | K8s, Docker | Mise à jour continue |
| **Feature Flags** | Drapeaux de fonctionnalité | LaunchDarkly | Activation progressive |
| **A/B Testing** | Tests A/B | K8s, Istio | Tests utilisateur |
| **Dark Launch** | Lancement sombre | Feature Flags | Tests en production |
| **Shadow** | Déploiement ombre | K8s | Tests de charge |
| **Parallel** | Déploiement parallèle | K8s | Comparaison |
| **Immutable** | Déploiement immutable | Docker | Consistance |
| **GitOps** | GitOps | ArgoCD, Flux | Automatisation |

### 🎯 Patterns de Résilience

| Pattern | Description | Implémentation | Usage |
|---------|-------------|----------------|-------|
| **Circuit Breaker** | Disjoncteur | Hystrix, Resilience4j | Protection |
| **Retry** | Nouvelle tentative | Exponential Backoff | Récupération |
| **Timeout** | Délai d'attente | HTTP, gRPC | Performance |
| **Bulkhead** | Cloisonnement | Thread Pools | Isolation |
| **Rate Limiting** | Limitation de débit | Token Bucket | Protection |
| **Fallback** | Solution de secours | Default Values | Continuité |
| **Graceful Degradation** | Dégradation gracieuse | Feature Flags | Expérience |
| **Chaos Engineering** | Ingénierie du chaos | Chaos Monkey | Tests |
| **Health Checks** | Vérifications de santé | K8s, Consul | Disponibilité |
| **Self-Healing** | Auto-réparation | K8s, Consul | Résilience |

### 🎯 Patterns de Scaling

| Pattern | Description | Méthode | Usage |
|---------|-------------|---------|-------|
| **Horizontal Scaling** | Mise à l'échelle horizontale | Load Balancer | Performance |
| **Vertical Scaling** | Mise à l'échelle verticale | Ressources | Capacité |
| **Auto Scaling** | Mise à l'échelle automatique | K8s HPA | Dynamique |
| **Load Balancing** | Équilibrage de charge | Nginx, HAProxy | Distribution |
| **Caching** | Mise en cache | Redis, Memcached | Performance |
| **CDN** | Réseau de distribution | CloudFlare | Global |
| **Database Sharding** | Partitionnement | MongoDB, PostgreSQL | Données |
| **Read Replicas** | Répliques de lecture | PostgreSQL | Performance |
| **Event Streaming** | Streaming d'événements | Kafka | Temps réel |
| **Serverless** | Sans serveur | AWS Lambda | Événementiel |

---

## 🚀 Introduction

Les microservices sont une architecture de développement logiciel qui structure une application comme une collection de services faiblement couplés, hautement maintenables et testables, organisés autour des capacités métier.

## 🎯 Avantages et Inconvénients

### Avantages
- **Scalabilité** : Chaque service peut être mis à l'échelle indépendamment
- **Indépendance** : Les équipes peuvent développer et déployer indépendamment
- **Technologie** : Chaque service peut utiliser la technologie la plus appropriée
- **Résilience** : La panne d'un service n'affecte pas l'ensemble du système
- **Maintenabilité** : Code plus petit et plus facile à maintenir

### Inconvénients
- **Complexité** : Gestion de la communication entre services
- **Réseau** : Latence et problèmes de réseau
- **Données** : Gestion des transactions distribuées
- **Débogage** : Plus difficile de tracer les problèmes
- **Déploiement** : Orchestration complexe des déploiements

## 🎯 Architecture de Base

### Structure d'un Microservice

```typescript
// microservice.ts
interface Microservice {
  name: string
  version: string
  port: number
  dependencies: string[]
  endpoints: Endpoint[]
  health: HealthStatus
}

interface Endpoint {
  path: string
  method: string
  handler: Function
  middleware: Middleware[]
}

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded'
  checks: HealthCheck[]
  timestamp: Date
}
```

### Implémentation avec NestJS

```typescript
// user.service.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto)
    return await this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
```

## 🎯 Communication Inter-Services

### Synchronous Communication

```typescript
// http-client.service.ts
import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.get<T>(url, { headers })
    )
    return response.data
  }

  async post<T>(
    url: string,
    data: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.post<T>(url, data, { headers })
    )
    return response.data
  }
}

// user.service.ts
@Injectable()
export class UserService {
  constructor(
    private readonly httpClient: HttpClientService,
    @Inject('ORDER_SERVICE_URL') private orderServiceUrl: string
  ) {}

  async getUserWithOrders(userId: string): Promise<UserWithOrders> {
    const user = await this.findOne(userId)
    const orders = await this.httpClient.get<Order[]>(
      `${this.orderServiceUrl}/users/${userId}/orders`
    )
    
    return {
      ...user,
      orders
    }
  }
}
```

### Asynchronous Communication

```typescript
// event.service.ts
import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class EventService {
  constructor(private eventEmitter: EventEmitter2) {}

  async publish(event: string, data: any): Promise<void> {
    this.eventEmitter.emit(event, data)
  }

  async subscribe(event: string, handler: Function): Promise<void> {
    this.eventEmitter.on(event, handler)
  }
}

// user.service.ts
@Injectable()
export class UserService {
  constructor(
    private readonly eventService: EventService,
    // ... autres dépendances
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto)
    
    // Publier l'événement
    await this.eventService.publish('user.created', {
      userId: user.id,
      email: user.email,
      timestamp: new Date()
    })
    
    return user
  }
}
```

## 🎯 Service Discovery

### Consul Integration

```typescript
// consul.service.ts
import { Injectable } from '@nestjs/common'
import { Consul } from 'consul'

@Injectable()
export class ConsulService {
  private consul: Consul

  constructor() {
    this.consul = new Consul({
      host: process.env.CONSUL_HOST || 'localhost',
      port: process.env.CONSUL_PORT || 8500
    })
  }

  async registerService(service: ServiceRegistration): Promise<void> {
    await this.consul.agent.service.register({
      id: service.id,
      name: service.name,
      address: service.address,
      port: service.port,
      check: {
        http: `http://${service.address}:${service.port}/health`,
        interval: '10s'
      }
    })
  }

  async discoverService(serviceName: string): Promise<ServiceInstance[]> {
    const services = await this.consul.health.service({
      service: serviceName,
      passing: true
    })
    
    return services[0].map(service => ({
      id: service.Service.ID,
      name: service.Service.Service,
      address: service.Service.Address,
      port: service.Service.Port
    }))
  }
}
```

## 🎯 API Gateway

### Kong Integration

```typescript
// api-gateway.service.ts
import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class ApiGatewayService {
  constructor(private readonly httpService: HttpService) {}

  async createRoute(route: RouteConfig): Promise<void> {
    await this.httpService.post('/routes', {
      name: route.name,
      paths: route.paths,
      service: {
        name: route.serviceName
      }
    }).toPromise()
  }

  async createService(service: ServiceConfig): Promise<void> {
    await this.httpService.post('/services', {
      name: service.name,
      url: service.url
    }).toPromise()
  }

  async addPlugin(plugin: PluginConfig): Promise<void> {
    await this.httpService.post('/plugins', {
      name: plugin.name,
      config: plugin.config
    }).toPromise()
  }
}
```

## 🎯 Circuit Breaker

### Implementation avec Resilience4j

```typescript
// circuit-breaker.service.ts
import { Injectable } from '@nestjs/common'
import { CircuitBreaker, CircuitBreakerConfig } from 'resilience4j'

@Injectable()
export class CircuitBreakerService {
  private circuitBreakers: Map<string, CircuitBreaker> = new Map()

  createCircuitBreaker(
    name: string,
    config: CircuitBreakerConfig
  ): CircuitBreaker {
    const circuitBreaker = CircuitBreaker.of(name, config)
    this.circuitBreakers.set(name, circuitBreaker)
    return circuitBreaker
  }

  async executeWithCircuitBreaker<T>(
    circuitBreakerName: string,
    operation: () => Promise<T>,
    fallback?: () => Promise<T>
  ): Promise<T> {
    const circuitBreaker = this.circuitBreakers.get(circuitBreakerName)
    
    if (!circuitBreaker) {
      throw new Error(`Circuit breaker ${circuitBreakerName} not found`)
    }

    const decoratedFunction = CircuitBreaker.decorateFunction(
      circuitBreaker,
      operation
    )

    try {
      return await decoratedFunction()
    } catch (error) {
      if (fallback) {
        return await fallback()
      }
      throw error
    }
  }
}
```

## 🎯 Monitoring et Observabilité

### Prometheus Metrics

```typescript
// metrics.service.ts
import { Injectable } from '@nestjs/common'
import { register, Counter, Histogram, Gauge } from 'prom-client'

@Injectable()
export class MetricsService {
  private requestCounter: Counter<string>
  private requestDuration: Histogram<string>
  private activeConnections: Gauge<string>

  constructor() {
    this.requestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code']
    })

    this.requestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route']
    })

    this.activeConnections = new Gauge({
      name: 'active_connections',
      help: 'Number of active connections'
    })

    register.registerMetric(this.requestCounter)
    register.registerMetric(this.requestDuration)
    register.registerMetric(this.activeConnections)
  }

  incrementRequestCounter(method: string, route: string, statusCode: number): void {
    this.requestCounter.inc({ method, route, status_code: statusCode })
  }

  recordRequestDuration(method: string, route: string, duration: number): void {
    this.requestDuration.observe({ method, route }, duration)
  }

  setActiveConnections(count: number): void {
    this.activeConnections.set(count)
  }
}
```

### Health Checks

```typescript
// health.controller.ts
import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.checkExternalService('order-service'),
      () => this.checkExternalService('payment-service')
    ])
  }

  private async checkExternalService(serviceName: string) {
    // Implémentation de la vérification de santé
    return { [serviceName]: { status: 'up' } }
  }
}
```

## 🎯 Déploiement avec Kubernetes

### Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
```

### Kubernetes Manifests

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: user-service-secrets
              key: database-url
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
```

## 📚 Ressources

### Documentation officielle
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Istio Documentation](https://istio.io/latest/docs/)
- [Consul Documentation](https://www.consul.io/docs)

### Outils et services
- [Kong](https://konghq.com/) - API Gateway
- [Prometheus](https://prometheus.io/) - Monitoring
- [Grafana](https://grafana.com/) - Visualisation
- [Jaeger](https://www.jaegertracing.io/) - Tracing
- [ELK Stack](https://www.elastic.co/elastic-stack/) - Logging

### Communautés et ressources
- [Microservices.io](https://microservices.io/) - Patterns et pratiques
- [12-Factor App](https://12factor.net/) - Méthodologie
- [Cloud Native Computing Foundation](https://cncf.io/) - Standards

---

*Dernière mise à jour : Janvier 2024*
