# 🧪 Models and AI Testing - Complete Guide

## 📋 Complete Model and Testing Reference Tables

### 🎯 Language Models

| Model | Provider | Type | Size | Cost | Performance |
|-------|----------|------|------|------|-------------|
| **GPT-4** | OpenAI | Chat | 1.76T | $0.03/1K tokens | Excellent |
| **GPT-4 Turbo** | OpenAI | Chat | 1.76T | $0.01/1K tokens | Excellent |
| **GPT-3.5-turbo** | OpenAI | Chat | 175B | $0.002/1K tokens | Very good |
| **Claude-3 Opus** | Anthropic | Chat | 1.4T | $0.015/1K tokens | Excellent |
| **Claude-3 Sonnet** | Anthropic | Chat | 1.4T | $0.003/1K tokens | Very good |
| **Claude-3 Haiku** | Anthropic | Chat | 1.4T | $0.00025/1K tokens | Good |
| **PaLM-2** | Google | Chat | 540B | $0.0005/1K tokens | Good |
| **LLaMA-2 70B** | Meta | Completion | 70B | Open source | Good |
| **LLaMA-2 13B** | Meta | Completion | 13B | Open source | Average |
| **LLaMA-2 7B** | Meta | Completion | 7B | Open source | Average |

### 🎯 Selection Criteria

| Criteria | Description | Weight | Evaluation |
|----------|-------------|--------|------------|
| **Performance** | Quality of responses | 40% | BLEU, ROUGE, Human Eval |
| **Cost** | Cost per token | 25% | $/1K tokens |
| **Latency** | Response time | 20% | ms per request |
| **Availability** | Uptime and reliability | 10% | % availability |
| **Features** | Tools and capabilities | 5% | Function calling, etc. |

### 🎯 Evaluation Metrics

| Metric | Description | Range | Usage |
|--------|-------------|-------|-------|
| **Perplexity** | Confusion measure | 0-∞ | Generation quality |
| **BLEU Score** | Translation quality | 0-1 | Translation, generation |
| **ROUGE Score** | Summarization quality | 0-1 | Summarization, Q&A |
| **Semantic Similarity** | Semantic similarity | 0-1 | Q&A, search |
| **Human Evaluation** | Human evaluation | 1-5 | General quality |
| **Accuracy** | Precision | 0-1 | Classification, Q&A |
| **F1 Score** | F1 Score | 0-1 | Classification |
| **MRR** | Mean Reciprocal Rank | 0-1 | Search |
| **NDCG** | Normalized DCG | 0-1 | Ranking |
| **Cost per Task** | Cost per task | $ | Economics |

### 🎯 Test Types

| Type | Description | Framework | Usage |
|------|-------------|-----------|-------|
| **Unit Tests** | Unit tests | Jest, Mocha | Individual functions |
| **Integration Tests** | Integration tests | Supertest | Complete flows |
| **E2E Tests** | End-to-end tests | Playwright, Cypress | User scenarios |
| **Load Tests** | Load tests | Artillery, K6 | Performance |
| **A/B Tests** | Comparative tests | Custom | Model comparison |
| **Regression Tests** | Regression tests | Jest Snapshot | Stability |
| **Stress Tests** | Stress tests | Custom | Limits |
| **Security Tests** | Security tests | Custom | Security |
| **Compliance Tests** | Compliance tests | Custom | Compliance |
| **Usability Tests** | Usability tests | Custom | User experience |

### 🎯 Testing Tools

| Tool | Description | Language | Usage |
|------|-------------|----------|-------|
| **Jest** | Testing framework | JavaScript | Unit tests |
| **Mocha** | Testing framework | JavaScript | Unit tests |
| **Playwright** | E2E tests | JavaScript | Browser tests |
| **Cypress** | E2E tests | JavaScript | Browser tests |
| **Artillery** | Load tests | JavaScript | Performance |
| **K6** | Load tests | JavaScript | Performance |
| **Supertest** | API tests | JavaScript | API tests |
| **Puppeteer** | Browser tests | JavaScript | Automated tests |
| **Selenium** | Browser tests | Multi-language | Automated tests |
| **Postman** | API tests | GUI | API tests |

### 🎯 Performance Metrics

| Metric | Description | Calculation | Usage |
|--------|-------------|-------------|-------|
| **Response Time** | Response time | `end_time - start_time` | Performance |
| **Throughput** | Throughput | `requests_per_second` | Capacity |
| **Latency** | Latency | `p50, p95, p99` | Performance |
| **Error Rate** | Error rate | `errors / total_requests` | Reliability |
| **Success Rate** | Success rate | `successful_requests / total_requests` | Reliability |
| **CPU Usage** | CPU usage | `current_cpu / max_cpu` | Resources |
| **Memory Usage** | Memory usage | `current_memory / max_memory` | Resources |
| **Token Usage** | Token usage | `tokens_per_request` | Cost |
| **Cost per Request** | Cost per request | `total_cost / requests` | Economics |
| **Availability** | Availability | `uptime / total_time` | Reliability |

### 🎯 Testing Strategies

| Strategy | Description | Implementation | Usage |
|----------|-------------|----------------|-------|
| **Test Pyramid** | Test pyramid | Unit → Integration → E2E | Structure |
| **TDD** | Test-Driven Development | Red → Green → Refactor | Development |
| **BDD** | Behavior-Driven Development | Given → When → Then | Behavior |
| **Property-Based Testing** | Property-based testing | Automatic generation | Robustness |
| **Mutation Testing** | Mutation testing | Code modification | Quality |
| **Chaos Engineering** | Chaos engineering | Failure injection | Resilience |
| **Contract Testing** | Contract testing | API contracts | Integration |
| **Visual Testing** | Visual testing | Image comparison | UI |
| **Accessibility Testing** | Accessibility testing | WCAG | Accessibility |
| **Performance Testing** | Performance testing | Performance metrics | Performance |

### 🎯 Test Environments

| Environment | Description | Usage | Configuration |
|-------------|-------------|-------|---------------|
| **Development** | Development | Local tests | Mock, Stub |
| **Staging** | Pre-production | Integration tests | Test data |
| **Production** | Production | Live tests | Real data |
| **Sandbox** | Sandbox | Isolated tests | Isolated environment |
| **Docker** | Containers | Reproducible tests | Docker images |
| **Kubernetes** | Orchestration | Distributed tests | K8s clusters |
| **Cloud** | Cloud | Scalable tests | AWS, GCP, Azure |
| **Local** | Local | Fast tests | Local machine |
| **CI/CD** | Continuous integration | Automated tests | Pipeline |
| **Monitoring** | Monitoring | Continuous tests | Real-time metrics |

---

## 🚀 Introduction

Testing and evaluating AI models is essential to ensure the quality, performance, and reliability of artificial intelligence systems. This guide covers best practices for testing and evaluating language models.

## 🎯 Model Selection

### Selection Criteria

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

### Model Comparison

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

## 🎯 Unit Tests

### Model Tests

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

### Agent Tests

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

## 🎯 Integration Tests

### RAG Tests

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
    
    // Add test documents
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

### API Tests

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

## 🎯 Performance Tests

### Load Tests

```typescript
// load.test.ts
import { test, expect } from '@playwright/test'

test.describe('Load Tests', () => {
  test('should handle concurrent requests', async ({ page }) => {
    const promises = []
    
    // Simulate 10 concurrent requests
    for (let i = 0; i < 10; i++) {
      promises.push(
        page.request.post('/ai/generate', {
          data: { prompt: `Test prompt ${i}` }
        })
      )
    }
    
    const responses = await Promise.all(promises)
    
    // Verify all requests succeeded
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
    expect(responseTime).toBeLessThan(5000) // Less than 5 seconds
  })
})
```

### Stress Tests

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
    
    // Send 100 rapid requests
    for (let i = 0; i < 100; i++) {
      promises.push(
        page.request.post('/ai/generate', {
          data: { prompt: `Rapid test ${i}` }
        })
      )
    }
    
    const responses = await Promise.all(promises)
    
    // Verify most requests succeeded
    const successCount = responses.filter(r => r.status() === 200).length
    expect(successCount).toBeGreaterThan(90) // At least 90% success
  })
})
```

## 🎯 A/B Tests

### A/B Test Framework

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

## 🎯 Monitoring and Observability

### Real-time Metrics

```typescript
class ModelMonitor {
  private metrics: Map<string, Metric[]> = new Map()
  private alerts: Alert[] = []

  recordMetric(metricName: string, value: number, timestamp: Date = new Date()): void {
    if (!this.metrics.has(metricName)) {
      this.metrics.set(metricName, [])
    }
    
    this.metrics.get(metricName)!.push({ value, timestamp })
    
    // Check alerts
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

## 📚 Resources

### Official documentation
- [OpenAI API Documentation](https://platform.openai.com/docs/guides/production-best-practices)
- [Anthropic Claude Documentation](https://docs.anthropic.com/claude/docs)
- [LangChain Testing](https://js.langchain.com/docs/guides/testing)

### Tools and frameworks
- [Jest](https://jestjs.io/) - Testing framework
- [Playwright](https://playwright.dev/) - E2E tests
- [Artillery](https://artillery.io/) - Load tests
- [Prometheus](https://prometheus.io/) - Monitoring
- [Grafana](https://grafana.com/) - Visualization

### Communities and resources
- [Testing AI Systems](https://github.com/langchain-ai/langchain/tree/master/templates/rag-evaluation)
- [AI Testing Best Practices](https://www.promptingguide.ai/techniques/testing)
- [Model Evaluation](https://openai.com/research/measuring-ai-capabilities)

---

*Last updated: January 2024*
