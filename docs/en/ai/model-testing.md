# 🧪 Model Testing - Complete Guide

## 📋 Complete Model Testing Reference Tables

### 🎯 Testing Types

| Type | Description | Framework | Use Case | Example |
|------|-------------|-----------|----------|---------|
| **Unit Tests** | Individual component testing | Jest, Mocha | Function validation | `expect(model.predict("test")).toBe("expected")` |
| **Integration Tests** | Component interaction testing | Supertest | API testing | `request(app).post("/api/chat").expect(200)` |
| **E2E Tests** | End-to-end testing | Playwright, Cypress | User workflow testing | `page.click("#send-button")` |
| **Load Tests** | Performance under load | Artillery, K6 | Scalability testing | `artillery run load-test.yml` |
| **A/B Tests** | Comparative testing | Custom Framework | Model comparison | `compareModels(modelA, modelB)` |
| **Regression Tests** | Change impact testing | Jest Snapshot | Version comparison | `expect(output).toMatchSnapshot()` |

### 🎯 Evaluation Metrics

| Metric | Description | Tool | Use Case | Example |
|--------|-------------|------|----------|---------|
| **Perplexity** | Model confusion measure | LangChain Evaluator | Language model quality | `evaluator.evaluatePerplexity(model, text)` |
| **BLEU Score** | Translation quality | BLEU Calculator | Translation tasks | `bleuScore(reference, candidate)` |
| **ROUGE Score** | Summary quality | ROUGE Calculator | Summarization tasks | `rougeScore(reference, summary)` |
| **Semantic Similarity** | Semantic similarity | Cosine Similarity | Content similarity | `cosineSimilarity(embedding1, embedding2)` |
| **Human Evaluation** | Human assessment | A/B Testing | Quality assessment | `humanEvaluation(response1, response2)` |
| **Cost Analysis** | Token usage analysis | Token Counter | Cost optimization | `tokenCounter.countTokens(prompt)` |
| **Latency** | Response time | Performance Monitor | Performance testing | `performanceMonitor.measureLatency()` |

### 🎯 Testing Frameworks

| Framework | Description | Best For | Example |
|-----------|-------------|----------|---------|
| **Jest** | JavaScript testing framework | Unit testing | `describe("Model", () => { test("should predict", () => {}) })` |
| **Mocha** | Flexible testing framework | Custom testing | `describe("Model", () => { it("should predict", () => {}) })` |
| **Playwright** | E2E testing framework | Browser testing | `await page.click("#button")` |
| **Cypress** | E2E testing framework | User interaction testing | `cy.get("#button").click()` |
| **Supertest** | HTTP testing library | API testing | `request(app).post("/api").expect(200)` |
| **Artillery** | Load testing framework | Performance testing | `artillery run load-test.yml` |
| **K6** | Load testing framework | Scalability testing | `http.post("https://api.example.com")` |

### 🎯 Model Comparison

| Aspect | Metric | Tool | Example |
|--------|--------|------|---------|
| **Accuracy** | Correct predictions | Custom evaluator | `accuracy = correct / total` |
| **Precision** | True positives rate | Confusion matrix | `precision = tp / (tp + fp)` |
| **Recall** | Sensitivity | Confusion matrix | `recall = tp / (tp + fn)` |
| **F1 Score** | Harmonic mean | Custom calculator | `f1 = 2 * (precision * recall) / (precision + recall)` |
| **Speed** | Response time | Performance monitor | `speed = endTime - startTime` |
| **Cost** | Token usage | Token counter | `cost = tokens * pricePerToken` |

## 🚀 Model Testing Implementation Examples

### Unit Testing

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

describe("Language Model Tests", () => {
  let llm: ChatOpenAI;
  let chain: LLMChain;

  beforeEach(() => {
    llm = new ChatOpenAI({
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = PromptTemplate.fromTemplate(`
      Classify the following text as positive, negative, or neutral:
      Text: {text}
      Classification:
    `);

    chain = new LLMChain({
      llm: llm,
      prompt: prompt,
    });
  });

  test("should classify positive text correctly", async () => {
    const response = await chain.call({
      text: "I love this product!",
    });

    expect(response.text.toLowerCase()).toContain("positive");
  });

  test("should classify negative text correctly", async () => {
    const response = await chain.call({
      text: "This is terrible.",
    });

    expect(response.text.toLowerCase()).toContain("negative");
  });

  test("should handle neutral text", async () => {
    const response = await chain.call({
      text: "The weather is okay.",
    });

    expect(response.text.toLowerCase()).toContain("neutral");
  });
});
```

### Integration Testing

```typescript
import request from "supertest";
import express from "express";
import { ChatOpenAI } from "langchain/chat_models/openai";

const app = express();
app.use(express.json());

// Mock API endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  
  const llm = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await llm.predict(message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

describe("Chat API Integration Tests", () => {
  test("should respond to chat messages", async () => {
    const response = await request(app)
      .post("/api/chat")
      .send({ message: "Hello, how are you?" })
      .expect(200);

    expect(response.body.response).toBeDefined();
    expect(typeof response.body.response).toBe("string");
  });

  test("should handle empty messages", async () => {
    const response = await request(app)
      .post("/api/chat")
      .send({ message: "" })
      .expect(400);

    expect(response.body.error).toBeDefined();
  });

  test("should handle long messages", async () => {
    const longMessage = "a".repeat(10000);
    
    const response = await request(app)
      .post("/api/chat")
      .send({ message: longMessage })
      .expect(200);

    expect(response.body.response).toBeDefined();
  });
});
```

### E2E Testing with Playwright

```typescript
import { test, expect } from "@playwright/test";

test.describe("Chat Application E2E Tests", () => {
  test("should send and receive messages", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Wait for the chat interface to load
    await page.waitForSelector("#chat-input");

    // Type a message
    await page.fill("#chat-input", "Hello, how are you?");
    
    // Send the message
    await page.click("#send-button");

    // Wait for the response
    await page.waitForSelector("#chat-messages .message:last-child");

    // Check that the message was sent
    const messages = await page.$$("#chat-messages .message");
    expect(messages.length).toBeGreaterThan(0);

    // Check that a response was received
    const lastMessage = await page.textContent("#chat-messages .message:last-child");
    expect(lastMessage).toBeDefined();
  });

  test("should handle multiple messages", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const messages = [
      "What is the weather like?",
      "Tell me a joke",
      "What is 2 + 2?"
    ];

    for (const message of messages) {
      await page.fill("#chat-input", message);
      await page.click("#send-button");
      await page.waitForSelector("#chat-messages .message:last-child");
    }

    const messageElements = await page.$$("#chat-messages .message");
    expect(messageElements.length).toBe(messages.length * 2); // Sent + received
  });
});
```

### Load Testing with Artillery

```yaml
# load-test.yml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10
    - duration: 120
      arrivalRate: 20
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "Chat API Load Test"
    weight: 100
    flow:
      - post:
          url: "/api/chat"
          json:
            message: "Hello, how are you?"
          capture:
            - json: "$.response"
              as: "chatResponse"
      - think: 2
```

### Model Comparison Testing

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatAnthropic } from "langchain/chat_models/anthropic";

class ModelComparator {
  private models: { [key: string]: any } = {};

  constructor() {
    this.models = {
      "gpt-3.5-turbo": new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0,
        openAIApiKey: process.env.OPENAI_API_KEY,
      }),
      "gpt-4": new ChatOpenAI({
        modelName: "gpt-4",
        temperature: 0,
        openAIApiKey: process.env.OPENAI_API_KEY,
      }),
      "claude-3": new ChatAnthropic({
        modelName: "claude-3-sonnet-20240229",
        anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      }),
    };
  }

  async compareModels(prompt: string) {
    const results: { [key: string]: any } = {};

    for (const [modelName, model] of Object.entries(this.models)) {
      const startTime = Date.now();
      
      try {
        const response = await model.predict(prompt);
        const endTime = Date.now();
        
        results[modelName] = {
          response,
          latency: endTime - startTime,
          success: true,
        };
      } catch (error) {
        results[modelName] = {
          error: error.message,
          success: false,
        };
      }
    }

    return results;
  }

  async runBenchmark(testCases: string[]) {
    const benchmarkResults: { [key: string]: any } = {};

    for (const testCase of testCases) {
      const results = await this.compareModels(testCase);
      benchmarkResults[testCase] = results;
    }

    return benchmarkResults;
  }
}

// Usage
const comparator = new ModelComparator();
const testCases = [
  "What is the capital of France?",
  "Explain quantum computing in simple terms",
  "Write a short poem about technology",
];

const results = await comparator.runBenchmark(testCases);
console.log(JSON.stringify(results, null, 2));
```

### Performance Testing

```typescript
import { performance } from "perf_hooks";
import { ChatOpenAI } from "langchain/chat_models/openai";

class PerformanceMonitor {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async measureLatency(prompt: string, iterations: number = 10) {
    const latencies: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      
      await this.llm.predict(prompt);
      
      const endTime = performance.now();
      latencies.push(endTime - startTime);
    }

    return {
      average: latencies.reduce((a, b) => a + b) / latencies.length,
      min: Math.min(...latencies),
      max: Math.max(...latencies),
      median: latencies.sort((a, b) => a - b)[Math.floor(latencies.length / 2)],
      latencies,
    };
  }

  async measureThroughput(prompts: string[]) {
    const startTime = performance.now();
    
    const promises = prompts.map(prompt => this.llm.predict(prompt));
    await Promise.all(promises);
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    return {
      totalTime,
      throughput: prompts.length / (totalTime / 1000), // requests per second
      averageTimePerRequest: totalTime / prompts.length,
    };
  }
}

// Usage
const monitor = new PerformanceMonitor();

// Measure latency
const latencyResults = await monitor.measureLatency("Hello, how are you?", 20);
console.log("Latency Results:", latencyResults);

// Measure throughput
const testPrompts = Array(50).fill("What is the weather like?");
const throughputResults = await monitor.measureThroughput(testPrompts);
console.log("Throughput Results:", throughputResults);
```

## 🎯 Best Practices

### Test Design

1. **Design comprehensive test cases** covering edge cases
2. **Use realistic data** for testing
3. **Implement proper error handling** in tests
4. **Use appropriate test frameworks** for your use case
5. **Implement continuous testing** in CI/CD pipelines

### Performance Testing

1. **Test under realistic load** conditions
2. **Monitor resource usage** during tests
3. **Implement proper benchmarking** metrics
4. **Use appropriate load testing tools** for your scale
5. **Monitor performance regressions** over time

### Quality Assurance

1. **Implement automated testing** for critical paths
2. **Use human evaluation** for quality assessment
3. **Monitor model drift** and performance degradation
4. **Implement feedback loops** for continuous improvement
5. **Use A/B testing** for model comparison

### Security Testing

1. **Test for prompt injection** vulnerabilities
2. **Validate input sanitization** and output filtering
3. **Test rate limiting** and abuse prevention
4. **Monitor for inappropriate content** generation
5. **Implement proper authentication** and authorization testing

## 📚 Resources

- [Jest Testing Framework](https://jestjs.io/)
- [Playwright E2E Testing](https://playwright.dev/)
- [Artillery Load Testing](https://artillery.io/)
- [Model Evaluation Best Practices](https://www.promptingguide.ai/techniques/evaluation)

---

*Last updated: January 2024*