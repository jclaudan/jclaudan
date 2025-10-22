# 🧪 Modèles et Tests IA - Guide Complet

## 📋 Tableaux de Référence Complète Modèles et Tests

### 🎯 Modèles de Langage

| Modèle | Fournisseur | Type | Taille | Coût | Performance |
|--------|-------------|------|--------|------|-------------|
| **GPT-4** | OpenAI | Chat | 1.76T | $0.03/1K tokens | Excellente |
| **GPT-4 Turbo** | OpenAI | Chat | 1.76T | $0.01/1K tokens | Excellente |
| **GPT-3.5-turbo** | OpenAI | Chat | 175B | $0.002/1K tokens | Très bonne |
| **Claude-3 Opus** | Anthropic | Chat | 1.4T | $0.015/1K tokens | Excellente |
| **Claude-3 Sonnet** | Anthropic | Chat | 1.4T | $0.003/1K tokens | Très bonne |
| **Claude-3 Haiku** | Anthropic | Chat | 1.4T | $0.00025/1K tokens | Bonne |
| **PaLM-2** | Google | Chat | 540B | $0.0005/1K tokens | Bonne |
| **LLaMA-2 70B** | Meta | Completion | 70B | Open source | Bonne |
| **LLaMA-2 13B** | Meta | Completion | 13B | Open source | Moyenne |
| **LLaMA-2 7B** | Meta | Completion | 7B | Open source | Moyenne |

### 🎯 Critères de Sélection

| Critère | Description | Poids | Évaluation |
|---------|-------------|-------|------------|
| **Performance** | Qualité des réponses | 40% | BLEU, ROUGE, Human Eval |
| **Coût** | Coût par token | 25% | $/1K tokens |
| **Latence** | Temps de réponse | 20% | ms par requête |
| **Disponibilité** | Uptime et fiabilité | 10% | % de disponibilité |
| **Fonctionnalités** | Outils et capacités | 5% | Function calling, etc. |

### 🎯 Métriques d'Évaluation

| Métrique | Description | Range | Usage |
|----------|-------------|-------|-------|
| **Perplexity** | Mesure de confusion | 0-∞ | Qualité de génération |
| **BLEU Score** | Qualité de traduction | 0-1 | Traduction, génération |
| **ROUGE Score** | Qualité de résumé | 0-1 | Résumé, Q&A |
| **Semantic Similarity** | Similarité sémantique | 0-1 | Q&A, recherche |
| **Human Evaluation** | Évaluation humaine | 1-5 | Qualité générale |
| **Accuracy** | Précision | 0-1 | Classification, Q&A |
| **F1 Score** | F1 Score | 0-1 | Classification |
| **MRR** | Mean Reciprocal Rank | 0-1 | Recherche |
| **NDCG** | Normalized DCG | 0-1 | Classement |
| **Cost per Task** | Coût par tâche | $ | Économie |

### 🎯 Types de Tests

| Type | Description | Framework | Usage |
|------|-------------|-----------|-------|
| **Unit Tests** | Tests unitaires | Jest, Mocha | Fonctions individuelles |
| **Integration Tests** | Tests d'intégration | Supertest | Flux complets |
| **E2E Tests** | Tests end-to-end | Playwright, Cypress | Scénarios utilisateur |
| **Load Tests** | Tests de charge | Artillery, K6 | Performance |
| **A/B Tests** | Tests comparatifs | Custom | Comparaison modèles |
| **Regression Tests** | Tests de régression | Jest Snapshot | Stabilité |
| **Stress Tests** | Tests de stress | Custom | Limites |
| **Security Tests** | Tests de sécurité | Custom | Sécurité |
| **Compliance Tests** | Tests de conformité | Custom | Conformité |
| **Usability Tests** | Tests d'utilisabilité | Custom | Expérience utilisateur |

### 🎯 Outils de Test

| Outil | Description | Langage | Usage |
|-------|-------------|---------|-------|
| **Jest** | Framework de test | JavaScript | Tests unitaires |
| **Mocha** | Framework de test | JavaScript | Tests unitaires |
| **Playwright** | Tests E2E | JavaScript | Tests navigateur |
| **Cypress** | Tests E2E | JavaScript | Tests navigateur |
| **Artillery** | Tests de charge | JavaScript | Performance |
| **K6** | Tests de charge | JavaScript | Performance |
| **Supertest** | Tests API | JavaScript | Tests d'API |
| **Puppeteer** | Tests navigateur | JavaScript | Tests automatisés |
| **Selenium** | Tests navigateur | Multi-langage | Tests automatisés |
| **Postman** | Tests API | GUI | Tests d'API |

### 🎯 Métriques de Performance

| Métrique | Description | Calcul | Usage |
|----------|-------------|--------|-------|
| **Response Time** | Temps de réponse | `end_time - start_time` | Performance |
| **Throughput** | Débit | `requests_per_second` | Capacité |
| **Latency** | Latence | `p50, p95, p99` | Performance |
| **Error Rate** | Taux d'erreur | `errors / total_requests` | Fiabilité |
| **Success Rate** | Taux de succès | `successful_requests / total_requests` | Fiabilité |
| **CPU Usage** | Utilisation CPU | `current_cpu / max_cpu` | Ressources |
| **Memory Usage** | Utilisation mémoire | `current_memory / max_memory` | Ressources |
| **Token Usage** | Utilisation de tokens | `tokens_per_request` | Coût |
| **Cost per Request** | Coût par requête | `total_cost / requests` | Économie |
| **Availability** | Disponibilité | `uptime / total_time` | Fiabilité |

### 🎯 Stratégies de Test

| Stratégie | Description | Implémentation | Usage |
|-----------|-------------|----------------|-------|
| **Test Pyramid** | Pyramide de tests | Unit → Integration → E2E | Structure |
| **TDD** | Test-Driven Development | Red → Green → Refactor | Développement |
| **BDD** | Behavior-Driven Development | Given → When → Then | Comportement |
| **Property-Based Testing** | Tests basés sur propriétés | Génération automatique | Robustesse |
| **Mutation Testing** | Tests de mutation | Modification du code | Qualité |
| **Chaos Engineering** | Ingénierie du chaos | Injection de pannes | Résilience |
| **Contract Testing** | Tests de contrat | Contrats d'API | Intégration |
| **Visual Testing** | Tests visuels | Comparaison d'images | UI |
| **Accessibility Testing** | Tests d'accessibilité | WCAG | Accessibilité |
| **Performance Testing** | Tests de performance | Métriques de performance | Performance |

### 🎯 Environnements de Test

| Environnement | Description | Usage | Configuration |
|---------------|-------------|-------|---------------|
| **Development** | Développement | Tests locaux | Mock, Stub |
| **Staging** | Pré-production | Tests d'intégration | Données de test |
| **Production** | Production | Tests en direct | Données réelles |
| **Sandbox** | Bac à sable | Tests isolés | Environnement isolé |
| **Docker** | Conteneurs | Tests reproductibles | Images Docker |
| **Kubernetes** | Orchestration | Tests distribués | Clusters K8s |
| **Cloud** | Cloud | Tests scalables | AWS, GCP, Azure |
| **Local** | Local | Tests rapides | Machine locale |
| **CI/CD** | Intégration continue | Tests automatisés | Pipeline |
| **Monitoring** | Surveillance | Tests en continu | Métriques temps réel |

---

## 🚀 Introduction

Le test et l'évaluation des modèles IA sont essentiels pour garantir la qualité, la performance et la fiabilité des systèmes d'intelligence artificielle. Ce guide couvre les meilleures pratiques pour tester et évaluer les modèles de langage.

## 🎯 Sélection de Modèles

### Critères de Sélection

```typescript
interface ModelSelectionCriteria {
  performance: number // 0-1
  cost: number // $ per 1K tokens
  latency: number // ms
  availability: number // 0-1
  features: string[] // Function calling, etc.
}

class ModelSelector {
  private weights = {
    performance: 0.4,
    cost: 0.25,
    latency: 0.2,
    availability: 0.1,
    features: 0.05
  }

  selectModel(models: Model[], criteria: ModelSelectionCriteria): Model {
    const scores = models.map(model => this.calculateScore(model, criteria))
    const bestModelIndex = scores.indexOf(Math.max(...scores))
    return models[bestModelIndex]
  }

  private calculateScore(model: Model, criteria: ModelSelectionCriteria): number {
    const performanceScore = this.normalizeScore(model.performance, 0, 1)
    const costScore = this.normalizeScore(1 - model.cost, 0, 1)
    const latencyScore = this.normalizeScore(1 - model.latency, 0, 1)
    const availabilityScore = model.availability
    const featuresScore = this.calculateFeaturesScore(model.features, criteria.features)

    return (
      performanceScore * this.weights.performance +
      costScore * this.weights.cost +
      latencyScore * this.weights.latency +
      availabilityScore * this.weights.availability +
      featuresScore * this.weights.features
    )
  }

  private normalizeScore(value: number, min: number, max: number): number {
    return (value - min) / (max - min)
  }

  private calculateFeaturesScore(modelFeatures: string[], requiredFeatures: string[]): number {
    const matchingFeatures = modelFeatures.filter(f => requiredFeatures.includes(f))
    return matchingFeatures.length / requiredFeatures.length
  }
}
```

### Comparaison de Modèles

```typescript
class ModelComparator {
  async compareModels(
    models: Model[],
    testCases: TestCase[]
  ): Promise<ComparisonResult> {
    const results = await Promise.all(
      models.map(async model => {
        const modelResults = await this.testModel(model, testCases)
        return {
          model: model.name,
          results: modelResults,
          metrics: this.calculateMetrics(modelResults)
        }
      })
    )

    return {
      models: results,
      bestModel: this.findBestModel(results),
      summary: this.generateSummary(results)
    }
  }

  private async testModel(model: Model, testCases: TestCase[]): Promise<ModelResult[]> {
    const results = []
    
    for (const testCase of testCases) {
      const startTime = Date.now()
      const response = await model.generate(testCase.input)
      const endTime = Date.now()
      
      results.push({
        input: testCase.input,
        expected: testCase.expected,
        actual: response,
        latency: endTime - startTime,
        tokens: this.countTokens(response),
        cost: this.calculateCost(response, model.costPerToken)
      })
    }
    
    return results
  }

  private calculateMetrics(results: ModelResult[]): ModelMetrics {
    const latencies = results.map(r => r.latency)
    const costs = results.map(r => r.cost)
    const accuracies = results.map(r => this.calculateAccuracy(r.expected, r.actual))
    
    return {
      averageLatency: latencies.reduce((a, b) => a + b, 0) / latencies.length,
      p95Latency: this.percentile(latencies, 95),
      averageCost: costs.reduce((a, b) => a + b, 0) / costs.length,
      accuracy: accuracies.reduce((a, b) => a + b, 0) / accuracies.length,
      totalTokens: results.reduce((sum, r) => sum + r.tokens, 0)
    }
  }
}
```

## 🎯 Tests Unitaires

### Tests de Modèles

```typescript
// model.test.ts
import { describe, it, expect, beforeEach } from '@jest/globals'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { ModelTester } from './model-tester'

describe('Model Tests', () => {
  let model: ChatOpenAI
  let tester: ModelTester

  beforeEach(() => {
    model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
      temperature: 0
    })
    tester = new ModelTester(model)
  })

  it('should generate correct responses for classification', async () => {
    const testCases = [
      { input: 'I love this product!', expected: 'positive' },
      { input: 'This is terrible.', expected: 'negative' },
      { input: 'It is okay.', expected: 'neutral' }
    ]

    const results = await tester.testClassification(testCases)
    
    expect(results.accuracy).toBeGreaterThan(0.8)
    expect(results.results.every(r => r.correct)).toBe(true)
  })

  it('should handle edge cases', async () => {
    const edgeCases = [
      { input: '', expected: 'error' },
      { input: 'a'.repeat(10000), expected: 'error' },
      { input: '!@#$%^&*()', expected: 'neutral' }
    ]

    const results = await tester.testEdgeCases(edgeCases)
    
    expect(results.results.every(r => r.handled)).toBe(true)
  })

  it('should respect temperature settings', async () => {
    const modelLowTemp = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
      temperature: 0
    })

    const modelHighTemp = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
      temperature: 1
    })

    const input = 'Write a creative story about a cat'
    
    const lowTempResponse = await modelLowTemp.call([new HumanMessage(input)])
    const highTempResponse = await modelHighTemp.call([new HumanMessage(input)])
    
    expect(lowTempResponse.content).not.toBe(highTempResponse.content)
  })
})
```

### Tests d'Agents

```typescript
// agent.test.ts
import { describe, it, expect, beforeEach } from '@jest/globals'
import { ReActAgent } from './agents/react-agent'
import { Calculator } from 'langchain/tools'

describe('Agent Tests', () => {
  let agent: ReActAgent

  beforeEach(() => {
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo'
    })
    
    const memory = new BufferMemory()
    const tools = [new Calculator()]
    
    agent = new ReActAgent('test-agent', 'Test agent', llm, memory, tools)
  })

  it('should use tools correctly', async () => {
    const result = await agent.execute('What is 15 * 3?')
    
    expect(result.output).toContain('45')
    expect(result.actions).toHaveLength(1)
    expect(result.actions[0].type).toBe('tool_call')
  })

  it('should maintain conversation context', async () => {
    await agent.execute('My name is John')
    const result = await agent.execute('What is my name?')
    
    expect(result.output).toContain('John')
  })

  it('should handle errors gracefully', async () => {
    const result = await agent.execute('Calculate the square root of -1')
    
    expect(result.output).toContain('error')
    expect(result.state).toBe('completed')
  })
})
```

## 🎯 Tests d'Intégration

### Tests RAG

```typescript
// rag.test.ts
import { describe, it, expect, beforeEach } from '@jest/globals'
import { RAGService } from './rag.service'
import { Chroma } from 'langchain/vectorstores/chroma'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

describe('RAG Integration Tests', () => {
  let ragService: RAGService
  let vectorStore: Chroma

  beforeEach(async () => {
    const embeddings = new OpenAIEmbeddings()
    vectorStore = new Chroma(embeddings, { collectionName: 'test' })
    ragService = new RAGService(vectorStore)
    
    // Ajouter des documents de test
    await ragService.addDocuments([
      'Vue.js is a progressive JavaScript framework.',
      'TypeScript is a typed superset of JavaScript.',
      'Node.js is a JavaScript runtime built on Chrome\'s V8 engine.'
    ])
  })

  it('should retrieve relevant documents', async () => {
    const results = await ragService.similaritySearch('What is Vue.js?', 3)
    
    expect(results).toHaveLength(3)
    expect(results[0].pageContent).toContain('Vue.js')
  })

  it('should generate accurate answers', async () => {
    const answer = await ragService.query('What is Vue.js?')
    
    expect(answer).toContain('Vue.js')
    expect(answer).toContain('framework')
  })

  it('should handle queries with no relevant context', async () => {
    const answer = await ragService.query('What is quantum computing?')
    
    expect(answer).toContain("don't know")
  })
})
```

### Tests d'API

```typescript
// api.test.ts
import { describe, it, expect, beforeEach } from '@jest/globals'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './app.module'

describe('AI API Tests', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('should generate text', async () => {
    const response = await request(app.getHttpServer())
      .post('/ai/generate')
      .send({ prompt: 'Hello, world!' })
      .expect(200)

    expect(response.body.result).toBeDefined()
    expect(typeof response.body.result).toBe('string')
  })

  it('should handle RAG queries', async () => {
    const response = await request(app.getHttpServer())
      .post('/rag/query')
      .send({ question: 'What is Vue.js?' })
      .expect(200)

    expect(response.body.answer).toBeDefined()
    expect(typeof response.body.answer).toBe('string')
  })

  it('should validate input', async () => {
    const response = await request(app.getHttpServer())
      .post('/ai/generate')
      .send({})
      .expect(400)

    expect(response.body.message).toContain('prompt')
  })
})
```

## 🎯 Tests de Performance

### Tests de Charge

```typescript
// load.test.ts
import { test, expect } from '@playwright/test'

test.describe('Load Tests', () => {
  test('should handle concurrent requests', async ({ page }) => {
    const promises = []
    
    // Simuler 10 requêtes simultanées
    for (let i = 0; i < 10; i++) {
      promises.push(
        page.request.post('/ai/generate', {
          data: { prompt: `Test prompt ${i}` }
        })
      )
    }
    
    const responses = await Promise.all(promises)
    
    // Vérifier que toutes les requêtes ont réussi
    responses.forEach(response => {
      expect(response.status()).toBe(200)
    })
  })

  test('should maintain response time under load', async ({ page }) => {
    const startTime = Date.now()
    
    const response = await page.request.post('/ai/generate', {
      data: { prompt: 'Test prompt' }
    })
    
    const endTime = Date.now()
    const responseTime = endTime - startTime
    
    expect(response.status()).toBe(200)
    expect(responseTime).toBeLessThan(5000) // Moins de 5 secondes
  })
})
```

### Tests de Stress

```typescript
// stress.test.ts
import { test, expect } from '@playwright/test'

test.describe('Stress Tests', () => {
  test('should handle large inputs', async ({ page }) => {
    const largeInput = 'a'.repeat(10000)
    
    const response = await page.request.post('/ai/generate', {
      data: { prompt: largeInput }
    })
    
    expect(response.status()).toBe(200)
  })

  test('should handle rapid requests', async ({ page }) => {
    const promises = []
    
    // Envoyer 100 requêtes rapidement
    for (let i = 0; i < 100; i++) {
      promises.push(
        page.request.post('/ai/generate', {
          data: { prompt: `Rapid test ${i}` }
        })
      )
    }
    
    const responses = await Promise.all(promises)
    
    // Vérifier que la plupart des requêtes ont réussi
    const successCount = responses.filter(r => r.status() === 200).length
    expect(successCount).toBeGreaterThan(90) // Au moins 90% de succès
  })
})
```

## 🎯 Tests A/B

### Framework de Test A/B

```typescript
class ABTestFramework {
  async runABTest(
    modelA: Model,
    modelB: Model,
    testCases: TestCase[],
    metrics: string[]
  ): Promise<ABTestResult> {
    const resultsA = await this.testModel(modelA, testCases)
    const resultsB = await this.testModel(modelB, testCases)
    
    const comparison = this.compareResults(resultsA, resultsB, metrics)
    
    return {
      modelA: { name: modelA.name, results: resultsA },
      modelB: { name: modelB.name, results: resultsB },
      comparison,
      winner: this.determineWinner(comparison)
    }
  }

  private compareResults(
    resultsA: ModelResult[],
    resultsB: ModelResult[],
    metrics: string[]
  ): ComparisonResult {
    const comparison: ComparisonResult = {}
    
    for (const metric of metrics) {
      const valuesA = resultsA.map(r => r[metric])
      const valuesB = resultsB.map(r => r[metric])
      
      comparison[metric] = {
        modelA: this.calculateStatistic(valuesA),
        modelB: this.calculateStatistic(valuesB),
        difference: this.calculateDifference(valuesA, valuesB),
        significance: this.calculateSignificance(valuesA, valuesB)
      }
    }
    
    return comparison
  }

  private determineWinner(comparison: ComparisonResult): string {
    const metrics = Object.keys(comparison)
    let scoreA = 0
    let scoreB = 0
    
    for (const metric of metrics) {
      const { modelA, modelB } = comparison[metric]
      
      if (modelA.value > modelB.value) {
        scoreA++
      } else if (modelB.value > modelA.value) {
        scoreB++
      }
    }
    
    return scoreA > scoreB ? 'modelA' : 'modelB'
  }
}
```

## 🎯 Monitoring et Observabilité

### Métriques en Temps Réel

```typescript
class ModelMonitor {
  private metrics: Map<string, Metric[]> = new Map()
  private alerts: Alert[] = []

  recordMetric(metricName: string, value: number, timestamp: Date = new Date()): void {
    if (!this.metrics.has(metricName)) {
      this.metrics.set(metricName, [])
    }
    
    this.metrics.get(metricName)!.push({ value, timestamp })
    
    // Vérifier les alertes
    this.checkAlerts(metricName, value)
  }

  getMetric(metricName: string, timeRange: TimeRange): Metric[] {
    const metrics = this.metrics.get(metricName) || []
    return metrics.filter(m => 
      m.timestamp >= timeRange.start && m.timestamp <= timeRange.end
    )
  }

  calculateAverage(metricName: string, timeRange: TimeRange): number {
    const metrics = this.getMetric(metricName, timeRange)
    if (metrics.length === 0) return 0
    
    const sum = metrics.reduce((acc, m) => acc + m.value, 0)
    return sum / metrics.length
  }

  private checkAlerts(metricName: string, value: number): void {
    const relevantAlerts = this.alerts.filter(a => a.metricName === metricName)
    
    for (const alert of relevantAlerts) {
      if (this.evaluateAlert(alert, value)) {
        this.triggerAlert(alert, value)
      }
    }
  }
}
```

## 📚 Ressources

### Documentation officielle
- [OpenAI API Documentation](https://platform.openai.com/docs/guides/production-best-practices)
- [Anthropic Claude Documentation](https://docs.anthropic.com/claude/docs)
- [LangChain Testing](https://js.langchain.com/docs/guides/testing)

### Outils et frameworks
- [Jest](https://jestjs.io/) - Framework de test
- [Playwright](https://playwright.dev/) - Tests E2E
- [Artillery](https://artillery.io/) - Tests de charge
- [Prometheus](https://prometheus.io/) - Monitoring
- [Grafana](https://grafana.com/) - Visualisation

### Communautés et ressources
- [Testing AI Systems](https://github.com/langchain-ai/langchain/tree/master/templates/rag-evaluation)
- [AI Testing Best Practices](https://www.promptingguide.ai/techniques/testing)
- [Model Evaluation](https://openai.com/research/measuring-ai-capabilities)

---

*Dernière mise à jour : Janvier 2024*
