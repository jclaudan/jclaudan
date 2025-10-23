# 🎯 Prompt Engineering - Complete Guide

## 📋 Complete Prompt Engineering Reference Tables

### 🎯 Basic Techniques

| Technique | Description | Example | Use Case |
|-----------|-------------|---------|----------|
| **Zero-Shot** | Prompt without examples | `"Classify this text as positive or negative: {text}"` | Simple classification |
| **Few-Shot** | Prompt with examples | `"Examples: A: positive, B: negative. Classify: {text}"` | Learning by examples |
| **Chain-of-Thought** | Step-by-step reasoning | `"Let's think step by step: {question}"` | Problem solving |
| **Self-Consistency** | Multiple response generation | `"Generate 3 different answers: {question}"` | Quality improvement |
| **Tree of Thoughts** | Thought tree exploration | `"Consider multiple approaches: {problem}"` | Complex problems |
| **ReAct** | Reasoning + Acting | `"Thought: {thought}\nAction: {action}\nObservation: {observation}"` | Interactive agents |
| **Tool Use** | Tool usage | `"Use calculator to solve: {math_problem}"` | Calculations and search |
| **Role Playing** | Role assignment | `"You are an expert {role}. {task}"` | Specialization |
| **Context Window** | Context management | `"Context: {context}\nQuestion: {question}"` | Contextual Q&A |
| **Temperature** | Creativity control | `temperature: 0.7` | Creativity/precision balance |

### 🎯 Prompt Patterns

| Pattern | Structure | Usage | Example |
|---------|-----------|-------|---------|
| **Instruction** | `"Do X with Y"` | Simple tasks | `"Translate this text to French: {text}"` |
| **Context + Question** | `"Context: X\nQuestion: Y"` | Contextual Q&A | `"Context: {context}\nQuestion: {question}"` |
| **Examples + Task** | `"Examples:\n1. X\n2. Y\nTask: Z"` | Learning by examples | `"Examples:\n1. A→B\n2. C→D\nTask: E→?"` |
| **Role + Task** | `"You are X. Do Y."` | Specialization | `"You are a doctor. Diagnose: {symptoms}"` |
| **Chain** | `"Step 1: X\nStep 2: Y\nStep 3: Z"` | Complex process | `"Step 1: Analyze\nStep 2: Plan\nStep 3: Execute"` |
| **Conditional** | `"If X, then Y, else Z"` | Conditional logic | `"If {condition}, then {action1}, else {action2}"` |
| **Iterative** | `"Repeat until X: Y"` | Loops and iterations | `"Repeat until complete: {task}"` |
| **Comparative** | `"Compare X and Y"` | Comparisons | `"Compare {option1} and {option2}"` |
| **Explanatory** | `"Explain X in terms of Y"` | Explanations | `"Explain {concept} in simple terms"` |
| **Creative** | `"Create X in style Y"` | Creativity | `"Create a story in {genre} style"` |

### 🎯 Models and Parameters

| Model | Temperature | Top-p | Max Tokens | Description |
|-------|-------------|-------|------------|-------------|
| **GPT-4** | 0.7 | 0.9 | 4000 | Most advanced model |
| **GPT-3.5-turbo** | 0.7 | 0.9 | 4000 | Fast and economical model |
| **Claude-3** | 0.7 | 0.9 | 4000 | GPT-4 competitor |
| **PaLM-2** | 0.7 | 0.9 | 4000 | Google model |
| **LLaMA-2** | 0.7 | 0.9 | 2000 | Open source model |

### 🎯 Generation Parameters

| Parameter | Description | Values | Impact |
|-----------|-------------|--------|--------|
| **Temperature** | Creativity control | 0.0 - 2.0 | 0 = deterministic, 2 = very creative |
| **Top-p** | Nuclear sampling | 0.0 - 1.0 | 0.1 = conservative, 1.0 = diverse |
| **Top-k** | Top-k sampling | 1 - 100 | Limits number of tokens considered |
| **Max Tokens** | Maximum length | 1 - 4000+ | Controls response length |
| **Frequency Penalty** | Frequency penalty | -2.0 - 2.0 | Reduces repetition |
| **Presence Penalty** | Presence penalty | -2.0 - 2.0 | Encourages diversity |
| **Stop Sequences** | Stop sequences | Array | Stops generation at these sequences |

### 🎯 Prompt Types

| Type | Description | Structure | Example |
|------|-------------|-----------|---------|
| **Classification** | Text classification | `"Classify {text} as {categories}"` | `"Classify 'I love this' as positive/negative"` |
| **Generation** | Text generation | `"Generate {type} about {topic}"` | `"Generate a story about dragons"` |
| **Translation** | Translation | `"Translate {text} from {lang1} to {lang2}"` | `"Translate 'Hello' from English to French"` |
| **Summarization** | Summarization | `"Summarize {text} in {length} sentences"` | `"Summarize this article in 3 sentences"` |
| **Question Answering** | Question answering | `"Answer: {question}\nContext: {context}"` | `"Answer: What is AI?\nContext: {context}"` |
| **Code Generation** | Code generation | `"Write {language} code to {task}"` | `"Write Python code to sort a list"` |
| **Reasoning** | Reasoning | `"Solve this step by step: {problem}"` | `"Solve this math problem step by step"` |
| **Creative Writing** | Creative writing | `"Write a {genre} about {topic}"` | `"Write a poem about nature"` |
| **Data Analysis** | Data analysis | `"Analyze this data: {data}"` | `"Analyze this sales data"` |
| **Conversation** | Conversation | `"You are {role}. {context}"` | `"You are a helpful assistant. {context}"` |

### 🎯 Advanced Techniques

| Technique | Description | Implementation | Usage |
|-----------|-------------|----------------|-------|
| **Prompt Chaining** | Prompt chaining | `prompt1 → prompt2 → prompt3` | Complex workflows |
| **Prompt Templates** | Reusable templates | `"Template: {variable}"` | Standardization |
| **Dynamic Prompts** | Dynamic prompts | `if (condition) prompt1 else prompt2` | Contextual adaptation |
| **Prompt Injection** | Prompt injection | `"Ignore previous instructions: {new_task}"` | Security testing |
| **Prompt Optimization** | Automatic optimization | A/B testing, metrics | Continuous improvement |
| **Multi-Modal Prompts** | Multi-modal prompts | Text + images + audio | Rich applications |
| **Few-Shot Learning** | Learning by examples | `"Examples: {examples}\nTask: {task}"` | Fast learning |
| **Zero-Shot Learning** | Learning without examples | `"Task: {task}"` | Generalization |
| **In-Context Learning** | Contextual learning | `"Context: {context}\nTask: {task}"` | Contextual adaptation |
| **Meta-Learning** | Learning to learn | `"Learn to {learn_how_to_learn}"` | Fast adaptation |

### 🎯 Prompt Evaluation

| Metric | Description | Calculation | Usage |
|--------|-------------|-------------|-------|
| **Accuracy** | Precision | `Correct / Total` | Classification |
| **BLEU Score** | Translation quality | N-gram overlap | Translation |
| **ROUGE Score** | Summary quality | Recall overlap | Summarization |
| **Perplexity** | Model confusion | `exp(-log_likelihood)` | Generation |
| **Semantic Similarity** | Semantic similarity | Cosine similarity | Q&A |
| **Human Evaluation** | Human evaluation | Score 1-5 | General quality |
| **A/B Testing** | Comparative testing | Relative performance | Optimization |
| **Cost Analysis** | Cost analysis | Tokens × Price | Economics |
| **Latency** | Response time | Execution time | Performance |
| **Consistency** | Consistency | Response variance | Reliability |

### 🎯 Tools and Frameworks

| Tool | Description | Usage | Language |
|------|-------------|-------|----------|
| **LangChain** | LLM framework | Development | Python/JS |
| **OpenAI Playground** | Test interface | Testing and debugging | Web |
| **Hugging Face Spaces** | Model deployment | Deployment | Python |
| **Weights & Biases** | Experimentation | Tracking | Python |
| **MLflow** | Model management | ML Ops | Python |
| **Promptfoo** | Prompt testing | Evaluation | Node.js |
| **LangSmith** | LangChain debugging | Debugging | Python/JS |
| **PromptLayer** | Prompt monitoring | Monitoring | Python |
| **OpenAI Evals** | OpenAI evaluation | Evaluation | Python |
| **Helicone** | LLM proxy | Monitoring | Node.js |

---

## 🚀 Introduction

Prompt engineering is the art and science of designing effective instructions for language models. It combines understanding of model capabilities with optimized communication techniques.

## 🎯 Basic Techniques

### Zero-Shot Prompting

```typescript
// Zero-shot prompting example
const zeroShotPrompt = (text: string) => 
  `Classify the following text as positive, negative, or neutral: "${text}"`

// Usage
const result = await llm.call(zeroShotPrompt("I love this product!"))
// Result: "positive"
```

### Few-Shot Prompting

```typescript
// Few-shot prompting example
const fewShotPrompt = (text: string) => 
  `Examples:
Text: "This is amazing!" → Sentiment: positive
Text: "I hate this." → Sentiment: negative
Text: "It's okay." → Sentiment: neutral

Text: "${text}" → Sentiment:`

// Usage
const result = await llm.call(fewShotPrompt("This is terrible!"))
// Result: "negative"
```

### Chain-of-Thought Prompting

```typescript
// Chain-of-thought example
const chainOfThoughtPrompt = (problem: string) => 
  `Solve this step by step: ${problem}

Let's think through this step by step:`

// Usage
const result = await llm.call(chainOfThoughtPrompt("If a train leaves at 2 PM and travels 60 mph, and another leaves at 3 PM traveling 80 mph, when will they meet?"))
```

## 🎯 Advanced Patterns

### Template Pattern

```typescript
class PromptTemplate {
  private template: string
  private variables: string[]

  constructor(template: string) {
    this.template = template
    this.variables = this.extractVariables(template)
  }

  private extractVariables(template: string): string[] {
    const regex = /\{(\w+)\}/g
    const matches = template.match(regex)
    return matches ? matches.map(m => m.slice(1, -1)) : []
  }

  format(values: Record<string, string>): string {
    let result = this.template
    this.variables.forEach(variable => {
      const value = values[variable] || `{${variable}}`
      result = result.replace(`{${variable}}`, value)
    })
    return result
  }
}

// Usage
const template = new PromptTemplate("You are a {role}. {task}")
const prompt = template.format({
  role: "expert programmer",
  task: "Write a function to sort an array"
})
```

### Chain Pattern

```typescript
class PromptChain {
  private prompts: string[] = []

  add(prompt: string): this {
    this.prompts.push(prompt)
    return this
  }

  async execute(llm: any): Promise<string> {
    let result = ""
    for (const prompt of this.prompts) {
      result = await llm.call(prompt + "\n" + result)
    }
    return result
  }
}

// Usage
const chain = new PromptChain()
  .add("Analyze this problem: {problem}")
  .add("Generate 3 possible solutions:")
  .add("Evaluate each solution and recommend the best one:")

const result = await chain.execute(llm)
```

### Strategy Pattern

```typescript
interface PromptStrategy {
  generate(context: any): string
}

class ClassificationStrategy implements PromptStrategy {
  generate(context: { text: string, categories: string[] }): string {
    return `Classify the following text as one of: ${context.categories.join(', ')}
Text: "${context.text}"
Classification:`
  }
}

class GenerationStrategy implements PromptStrategy {
  generate(context: { topic: string, style: string }): string {
    return `Generate a ${context.style} about ${context.topic}:`
  }
}

class PromptGenerator {
  private strategy: PromptStrategy

  constructor(strategy: PromptStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: PromptStrategy): void {
    this.strategy = strategy
  }

  generate(context: any): string {
    return this.strategy.generate(context)
  }
}

// Usage
const generator = new PromptGenerator(new ClassificationStrategy())
const prompt = generator.generate({
  text: "I love this product!",
  categories: ["positive", "negative", "neutral"]
})
```

## 🎯 Prompt Optimization

### A/B Testing

```typescript
class PromptTester {
  async testPrompts(
    prompts: string[],
    testCases: any[],
    llm: any
  ): Promise<any[]> {
    const results = await Promise.all(
      prompts.map(async (prompt, index) => {
        const responses = await Promise.all(
          testCases.map(async (testCase) => {
            const response = await llm.call(prompt + "\n" + testCase.input)
            return {
              prompt: index,
              input: testCase.input,
              expected: testCase.expected,
              actual: response,
              correct: response === testCase.expected
            }
          })
        )
        
        const accuracy = responses.filter(r => r.correct).length / responses.length
        return { prompt: index, accuracy, responses }
      })
    )
    
    return results.sort((a, b) => b.accuracy - a.accuracy)
  }
}

// Usage
const tester = new PromptTester()
const prompts = [
  "Classify as positive/negative: {text}",
  "Determine sentiment: {text}",
  "Is this positive or negative? {text}"
]

const testCases = [
  { input: "I love this!", expected: "positive" },
  { input: "This is terrible.", expected: "negative" },
  { input: "It's okay.", expected: "neutral" }
]

const results = await tester.testPrompts(prompts, testCases, llm)
```

### Performance Metrics

```typescript
class PromptMetrics {
  async evaluatePrompt(
    prompt: string,
    testCases: any[],
    llm: any
  ): Promise<any> {
    const startTime = Date.now()
    const responses = await Promise.all(
      testCases.map(async (testCase) => {
        const response = await llm.call(prompt + "\n" + testCase.input)
        return {
          input: testCase.input,
          expected: testCase.expected,
          actual: response,
          correct: response === testCase.expected
        }
      })
    )
    
    const endTime = Date.now()
    const accuracy = responses.filter(r => r.correct).length / responses.length
    const latency = endTime - startTime
    
    return {
      accuracy,
      latency,
      responses,
      prompt
    }
  }

  async comparePrompts(
    prompts: string[],
    testCases: any[],
    llm: any
  ): Promise<any> {
    const results = await Promise.all(
      prompts.map(prompt => this.evaluatePrompt(prompt, testCases, llm))
    )
    
    return results.sort((a, b) => b.accuracy - a.accuracy)
  }
}
```

## 🎯 NestJS Integration

### Prompt Engineering Service

```typescript
// prompt-engineering.service.ts
import { Injectable } from '@nestjs/common'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { PromptTemplate } from 'langchain/prompts'

@Injectable()
export class PromptEngineeringService {
  private llm: ChatOpenAI

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4',
      temperature: 0.7
    })
  }

  async generateWithPrompt(
    prompt: string,
    variables: Record<string, string>
  ): Promise<string> {
    const template = PromptTemplate.fromTemplate(prompt)
    const formattedPrompt = await template.format(variables)
    
    const response = await this.llm.call([new HumanMessage(formattedPrompt)])
    return response.content
  }

  async fewShotPrompting(
    examples: Array<{ input: string; output: string }>,
    task: string
  ): Promise<string> {
    const examplesText = examples
      .map(ex => `Input: ${ex.input}\nOutput: ${ex.output}`)
      .join('\n\n')
    
    const prompt = `Examples:\n${examplesText}\n\nTask: ${task}\nOutput:`
    
    const response = await this.llm.call([new HumanMessage(prompt)])
    return response.content
  }

  async chainOfThoughtPrompting(problem: string): Promise<string> {
    const prompt = `Solve this step by step: ${problem}\n\nLet's think through this step by step:`
    
    const response = await this.llm.call([new HumanMessage(prompt)])
    return response.content
  }
}
```

### Prompt Engineering Controller

```typescript
// prompt-engineering.controller.ts
import { Controller, Post, Body } from '@nestjs/common'
import { PromptEngineeringService } from './prompt-engineering.service'

@Controller('prompt-engineering')
export class PromptEngineeringController {
  constructor(
    private readonly promptService: PromptEngineeringService
  ) {}

  @Post('generate')
  async generate(@Body() body: { prompt: string; variables: Record<string, string> }) {
    const result = await this.promptService.generateWithPrompt(
      body.prompt,
      body.variables
    )
    return { result }
  }

  @Post('few-shot')
  async fewShot(@Body() body: { 
    examples: Array<{ input: string; output: string }>; 
    task: string 
  }) {
    const result = await this.promptService.fewShotPrompting(
      body.examples,
      body.task
    )
    return { result }
  }

  @Post('chain-of-thought')
  async chainOfThought(@Body() body: { problem: string }) {
    const result = await this.promptService.chainOfThoughtPrompting(body.problem)
    return { result }
  }
}
```

## 🎯 Error Handling and Validation

### Prompt Validation

```typescript
class PromptValidator {
  validatePrompt(prompt: string): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    // Check length
    if (prompt.length > 4000) {
      errors.push('Prompt too long (max 4000 characters)')
    }
    
    // Check unmatched variables
    const openBraces = (prompt.match(/\{/g) || []).length
    const closeBraces = (prompt.match(/\}/g) || []).length
    if (openBraces !== closeBraces) {
      errors.push('Unmatched braces in prompt')
    }
    
    // Check special characters
    if (prompt.includes('```') && !prompt.includes('```\n')) {
      errors.push('Incomplete code block in prompt')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }
}
```

### Error Handling

```typescript
class PromptErrorHandler {
  async handlePromptError(error: any, prompt: string): Promise<string> {
    if (error.message.includes('rate limit')) {
      return 'Rate limit exceeded. Please try again later.'
    }
    
    if (error.message.includes('token limit')) {
      return 'Prompt too long. Please shorten your input.'
    }
    
    if (error.message.includes('invalid request')) {
      return 'Invalid prompt format. Please check your input.'
    }
    
    return 'An error occurred while processing your prompt.'
  }
}
```

## 📚 Resources

### Official Documentation
- [OpenAI API Documentation](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Claude Documentation](https://docs.anthropic.com/claude/docs)
- [Google PaLM Documentation](https://developers.generativeai.google/guide/prompt_best_practices)

### Tools and Frameworks
- [LangChain Prompts](https://js.langchain.com/docs/modules/prompts/)
- [Promptfoo](https://promptfoo.dev/) - Prompt testing
- [Weights & Biases](https://wandb.ai/) - Experimentation
- [OpenAI Evals](https://github.com/openai/evals) - Evaluation

### Communities and Resources
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [OpenAI Cookbook](https://cookbook.openai.com/)
- [Anthropic Cookbook](https://cookbook.anthropic.com/)

---

*Last updated: January 2024*
