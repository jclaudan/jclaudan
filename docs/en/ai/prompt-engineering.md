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
| **Temperature** | Creativity control | `temperature: 0.7` | Balance creativity/precision |

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

### 🎯 Advanced Techniques

| Technique | Description | Implementation | Use Case |
|-----------|-------------|----------------|----------|
| **Few-Shot Chain-of-Thought** | Combining examples with reasoning | `"Examples:\n1. Q: X\nA: Let's think... Y\nTask: Z"` | Complex reasoning with examples |
| **Self-Reflection** | Model evaluates its own response | `"Answer: {answer}\nIs this correct? Explain."` | Quality assurance |
| **Constitutional AI** | Following principles and rules | `"Follow these principles: {rules}\nTask: {task}"` | Aligned responses |
| **Tool-Augmented** | Using external tools | `"Use {tool} to {action}"` | Enhanced capabilities |
| **Multi-Modal** | Text + images/audio | `"Describe this image: {image}"` | Visual understanding |
| **Conversational** | Multi-turn dialogue | `"Previous: {history}\nCurrent: {question}"` | Chat applications |

### 🎯 Prompt Optimization

| Aspect | Technique | Example | Benefit |
|--------|-----------|---------|---------|
| **Clarity** | Use clear, specific instructions | `"Write a 3-sentence summary"` | Better compliance |
| **Examples** | Provide high-quality examples | `"Good: X\nBad: Y\nTask: Z"` | Better understanding |
| **Format** | Specify output format | `"Format: JSON with keys: {keys}"` | Structured output |
| **Constraints** | Set clear boundaries | `"Maximum 100 words, no jargon"` | Controlled output |
| **Context** | Provide relevant context | `"For a {audience}, explain {topic}"` | Appropriate tone |
| **Iteration** | Refine based on results | `"Version 1: {prompt}\nVersion 2: {improved}"` | Continuous improvement |

## 🚀 Prompt Engineering Examples

### Basic Classification

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

const llm = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Zero-shot classification
const zeroShotPrompt = PromptTemplate.fromTemplate(`
Classify the following text as positive, negative, or neutral:

Text: {text}
Classification:
`);

const zeroShotChain = new LLMChain({
  llm: llm,
  prompt: zeroShotPrompt,
});

const response = await zeroShotChain.call({
  text: "I love this product! It's amazing.",
});

console.log(response.text); // "positive"
```

### Few-Shot Learning

```typescript
// Few-shot classification
const fewShotPrompt = PromptTemplate.fromTemplate(`
Classify the sentiment of the following texts:

Examples:
Text: "This is the best movie ever!" → Sentiment: positive
Text: "I hate this weather." → Sentiment: negative
Text: "The weather is okay." → Sentiment: neutral

Text: {text}
Sentiment:
`);

const fewShotChain = new LLMChain({
  llm: llm,
  prompt: fewShotPrompt,
});

const response = await fewShotChain.call({
  text: "This restaurant has good food but slow service.",
});

console.log(response.text); // "neutral"
```

### Chain-of-Thought Reasoning

```typescript
// Chain-of-thought prompt
const chainOfThoughtPrompt = PromptTemplate.fromTemplate(`
Let's solve this problem step by step:

Problem: {problem}

Solution:
1. First, let's understand what we're asked to find
2. Then, let's identify the given information
3. Next, let's determine the approach
4. Finally, let's solve step by step

Answer:
`);

const chainOfThoughtChain = new LLMChain({
  llm: llm,
  prompt: chainOfThoughtPrompt,
});

const response = await chainOfThoughtChain.call({
  problem: "If a train travels 120 km in 2 hours, what is its average speed?",
});

console.log(response.text);
// Output will include step-by-step reasoning leading to "60 km/h"
```

### Role-Based Prompting

```typescript
// Role-based prompt
const rolePrompt = PromptTemplate.fromTemplate(`
You are an expert {role} with {experience} years of experience.
Your task is to {task}.

Context: {context}

Please provide your expert opinion:
`);

const roleChain = new LLMChain({
  llm: llm,
  prompt: rolePrompt,
});

const response = await roleChain.call({
  role: "software architect",
  experience: "10",
  task: "design a scalable microservices architecture",
  context: "We need to handle 1 million users with real-time features",
});

console.log(response.text);
```

### Multi-Step Task

```typescript
// Multi-step task prompt
const multiStepPrompt = PromptTemplate.fromTemplate(`
Complete this multi-step task:

Task: {task}

Steps:
1. Analyze the requirements
2. Identify potential solutions
3. Evaluate pros and cons
4. Recommend the best approach
5. Provide implementation details

Response:
`);

const multiStepChain = new LLMChain({
  llm: llm,
  prompt: multiStepPrompt,
});

const response = await multiStepChain.call({
  task: "Choose a database for a high-traffic e-commerce application",
});

console.log(response.text);
```

### Conditional Logic

```typescript
// Conditional prompt
const conditionalPrompt = PromptTemplate.fromTemplate(`
Analyze this situation and provide appropriate advice:

Situation: {situation}

If the situation involves technical issues, provide technical solutions.
If the situation involves business decisions, provide business recommendations.
If the situation involves personal matters, provide personal advice.

Response:
`);

const conditionalChain = new LLMChain({
  llm: llm,
  prompt: conditionalPrompt,
});

const response = await conditionalChain.call({
  situation: "Our application is experiencing slow response times during peak hours",
});

console.log(response.text);
```

## 🎯 Best Practices

### Prompt Design

1. **Be specific and clear** in your instructions
2. **Provide context** when necessary
3. **Use examples** to guide the model
4. **Specify output format** explicitly
5. **Test and iterate** on your prompts

### Performance Optimization

1. **Use appropriate temperature** for your use case
2. **Implement prompt caching** for repeated queries
3. **Batch similar requests** when possible
4. **Monitor token usage** and costs
5. **Use streaming** for long responses

### Quality Assurance

1. **Validate outputs** against expected formats
2. **Implement error handling** for edge cases
3. **Use human evaluation** for critical tasks
4. **Monitor for bias** and inappropriate content
5. **Implement feedback loops** for improvement

### Advanced Techniques

1. **Chain multiple prompts** for complex tasks
2. **Use tool augmentation** for enhanced capabilities
3. **Implement self-reflection** for quality assurance
4. **Use constitutional AI** for aligned responses
5. **Experiment with different models** for optimal results

## 📚 Resources

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [LangChain Prompt Templates](https://js.langchain.com/docs/modules/model_io/prompts/)
- [Prompt Engineering Best Practices](https://www.promptingguide.ai/)
- [Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903)

---

*Last updated: January 2024*