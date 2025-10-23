# 🎯 Ingénierie de Prompts - Guide Complet

## 📋 Tableaux de Référence Complète Prompt Engineering

### 🎯 Techniques de Base

| Technique | Description | Exemple | Cas d'usage |
|-----------|-------------|---------|-------------|
| **Zero-Shot** | Prompt sans exemples | `"Classify this text as positive or negative: {text}"` | Classification simple |
| **Few-Shot** | Prompt avec exemples | `"Examples: A: positive, B: negative. Classify: {text}"` | Apprentissage par exemples |
| **Chain-of-Thought** | Raisonnement étape par étape | `"Let's think step by step: {question}"` | Résolution de problèmes |
| **Self-Consistency** | Génération de plusieurs réponses | `"Generate 3 different answers: {question}"` | Amélioration de la qualité |
| **Tree of Thoughts** | Exploration d'arbres de pensée | `"Consider multiple approaches: {problem}"` | Problèmes complexes |
| **ReAct** | Reasoning + Acting | `"Thought: {thought}\nAction: {action}\nObservation: {observation}"` | Agents interactifs |
| **Tool Use** | Utilisation d'outils | `"Use calculator to solve: {math_problem}"` | Calculs et recherche |
| **Role Playing** | Attribution de rôle | `"You are an expert {role}. {task}"` | Spécialisation |
| **Context Window** | Gestion du contexte | `"Context: {context}\nQuestion: {question}"` | Q&A contextuel |
| **Temperature** | Contrôle de créativité | `temperature: 0.7` | Équilibre créativité/précision |

### 🎯 Patterns de Prompts

| Pattern | Structure | Usage | Exemple |
|---------|-----------|-------|---------|
| **Instruction** | `"Do X with Y"` | Tâches simples | `"Translate this text to French: {text}"` |
| **Context + Question** | `"Context: X\nQuestion: Y"` | Q&A contextuel | `"Context: {context}\nQuestion: {question}"` |
| **Examples + Task** | `"Examples:\n1. X\n2. Y\nTask: Z"` | Apprentissage par exemples | `"Examples:\n1. A→B\n2. C→D\nTask: E→?"` |
| **Role + Task** | `"You are X. Do Y."` | Spécialisation | `"You are a doctor. Diagnose: {symptoms}"` |
| **Chain** | `"Step 1: X\nStep 2: Y\nStep 3: Z"` | Processus complexe | `"Step 1: Analyze\nStep 2: Plan\nStep 3: Execute"` |
| **Conditional** | `"If X, then Y, else Z"` | Logique conditionnelle | `"If {condition}, then {action1}, else {action2}"` |
| **Iterative** | `"Repeat until X: Y"` | Boucles et itérations | `"Repeat until complete: {task}"` |
| **Comparative** | `"Compare X and Y"` | Comparaisons | `"Compare {option1} and {option2}"` |
| **Explanatory** | `"Explain X in terms of Y"` | Explications | `"Explain {concept} in simple terms"` |
| **Creative** | `"Create X in style Y"` | Créativité | `"Create a story in {genre} style"` |

### 🎯 Modèles et Paramètres

| Modèle | Température | Top-p | Max Tokens | Description |
|--------|-------------|-------|------------|-------------|
| **GPT-4** | 0.7 | 0.9 | 4000 | Modèle le plus avancé |
| **GPT-3.5-turbo** | 0.7 | 0.9 | 4000 | Modèle rapide et économique |
| **Claude-3** | 0.7 | 0.9 | 4000 | Modèle concurrent de GPT-4 |
| **PaLM-2** | 0.7 | 0.9 | 4000 | Modèle Google |
| **LLaMA-2** | 0.7 | 0.9 | 2000 | Modèle open source |

### 🎯 Paramètres de Génération

| Paramètre | Description | Valeurs | Impact |
|-----------|-------------|---------|--------|
| **Temperature** | Contrôle de la créativité | 0.0 - 2.0 | 0 = déterministe, 2 = très créatif |
| **Top-p** | Échantillonnage nucléaire | 0.0 - 1.0 | 0.1 = conservateur, 1.0 = diversifié |
| **Top-k** | Échantillonnage top-k | 1 - 100 | Limite le nombre de tokens considérés |
| **Max Tokens** | Longueur maximale | 1 - 4000+ | Contrôle la longueur de la réponse |
| **Frequency Penalty** | Pénalité de fréquence | -2.0 - 2.0 | Réduit la répétition |
| **Presence Penalty** | Pénalité de présence | -2.0 - 2.0 | Encourage la diversité |
| **Stop Sequences** | Séquences d'arrêt | Array | Arrête la génération à ces séquences |

### 🎯 Types de Prompts

| Type | Description | Structure | Exemple |
|------|-------------|-----------|---------|
| **Classification** | Classification de texte | `"Classify {text} as {categories}"` | `"Classify 'I love this' as positive/negative"` |
| **Generation** | Génération de texte | `"Generate {type} about {topic}"` | `"Generate a story about dragons"` |
| **Translation** | Traduction | `"Translate {text} from {lang1} to {lang2}"` | `"Translate 'Hello' from English to French"` |
| **Summarization** | Résumé | `"Summarize {text} in {length} sentences"` | `"Summarize this article in 3 sentences"` |
| **Question Answering** | Réponse à des questions | `"Answer: {question}\nContext: {context}"` | `"Answer: What is AI?\nContext: {context}"` |
| **Code Generation** | Génération de code | `"Write {language} code to {task}"` | `"Write Python code to sort a list"` |
| **Reasoning** | Raisonnement | `"Solve this step by step: {problem}"` | `"Solve this math problem step by step"` |
| **Creative Writing** | Écriture créative | `"Write a {genre} about {topic}"` | `"Write a poem about nature"` |
| **Data Analysis** | Analyse de données | `"Analyze this data: {data}"` | `"Analyze this sales data"` |
| **Conversation** | Conversation | `"You are {role}. {context}"` | `"You are a helpful assistant. {context}"` |

### 🎯 Techniques Avancées

| Technique | Description | Implémentation | Usage |
|-----------|-------------|----------------|-------|
| **Prompt Chaining** | Enchaînement de prompts | `prompt1 → prompt2 → prompt3` | Workflows complexes |
| **Prompt Templates** | Templates réutilisables | `"Template: {variable}"` | Standardisation |
| **Dynamic Prompts** | Prompts dynamiques | `if (condition) prompt1 else prompt2` | Adaptation contextuelle |
| **Prompt Injection** | Injection de prompts | `"Ignore previous instructions: {new_task}"` | Tests de sécurité |
| **Prompt Optimization** | Optimisation automatique | A/B testing, métriques | Amélioration continue |
| **Multi-Modal Prompts** | Prompts multimodaux | Texte + images + audio | Applications riches |
| **Few-Shot Learning** | Apprentissage par exemples | `"Examples: {examples}\nTask: {task}"` | Apprentissage rapide |
| **Zero-Shot Learning** | Apprentissage sans exemples | `"Task: {task}"` | Généralisation |
| **In-Context Learning** | Apprentissage en contexte | `"Context: {context}\nTask: {task}"` | Adaptation contextuelle |
| **Meta-Learning** | Apprentissage d'apprentissage | `"Learn to {learn_how_to_learn}"` | Adaptation rapide |

### 🎯 Évaluation des Prompts

| Métrique | Description | Calcul | Usage |
|----------|-------------|--------|-------|
| **Accuracy** | Précision | `Correct / Total` | Classification |
| **BLEU Score** | Qualité de traduction | N-gram overlap | Traduction |
| **ROUGE Score** | Qualité de résumé | Recall overlap | Résumé |
| **Perplexity** | Confusion du modèle | `exp(-log_likelihood)` | Génération |
| **Semantic Similarity** | Similarité sémantique | Cosine similarity | Q&A |
| **Human Evaluation** | Évaluation humaine | Score 1-5 | Qualité générale |
| **A/B Testing** | Test comparatif | Performance relative | Optimisation |
| **Cost Analysis** | Analyse des coûts | Tokens × Prix | Économie |
| **Latency** | Temps de réponse | Temps d'exécution | Performance |
| **Consistency** | Consistance | Variance des réponses | Fiabilité |

### 🎯 Outils et Frameworks

| Outil | Description | Usage | Langage |
|-------|-------------|-------|---------|
| **LangChain** | Framework pour LLM | Développement | Python/JS |
| **OpenAI Playground** | Interface de test | Test et debug | Web |
| **Hugging Face Spaces** | Déploiement de modèles | Déploiement | Python |
| **Weights & Biases** | Expérimentation | Tracking | Python |
| **MLflow** | Gestion de modèles | ML Ops | Python |
| **Promptfoo** | Test de prompts | Évaluation | Node.js |
| **LangSmith** | Debugging LangChain | Debug | Python/JS |
| **PromptLayer** | Monitoring de prompts | Monitoring | Python |
| **OpenAI Evals** | Évaluation OpenAI | Évaluation | Python |
| **Helicone** | Proxy pour LLM | Monitoring | Node.js |

---

## 🚀 Introduction

L'ingénierie de prompts est l'art et la science de concevoir des instructions efficaces pour les modèles de langage. Elle combine la compréhension des capacités des modèles avec des techniques de communication optimisées.

## 🎯 Techniques de Base

### Zero-Shot Prompting

```typescript
// Exemple de zero-shot prompting
const zeroShotPrompt = (text: string) => 
  `Classify the following text as positive, negative, or neutral: "${text}"`

// Usage
const result = await llm.call(zeroShotPrompt("I love this product!"))
// Résultat: "positive"
```

### Few-Shot Prompting

```typescript
// Exemple de few-shot prompting
const fewShotPrompt = (text: string) => 
  `Examples:
Text: "This is amazing!" → Sentiment: positive
Text: "I hate this." → Sentiment: negative
Text: "It's okay." → Sentiment: neutral

Text: "${text}" → Sentiment:`

// Usage
const result = await llm.call(fewShotPrompt("This is terrible!"))
// Résultat: "negative"
```

### Chain-of-Thought Prompting

```typescript
// Exemple de chain-of-thought
const chainOfThoughtPrompt = (problem: string) => 
  `Solve this step by step: ${problem}

Let's think through this step by step:`

// Usage
const result = await llm.call(chainOfThoughtPrompt("If a train leaves at 2 PM and travels 60 mph, and another leaves at 3 PM traveling 80 mph, when will they meet?"))
```

## 🎯 Patterns Avancés

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

## 🎯 Optimisation des Prompts

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

### Métriques de Performance

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

## 🎯 Intégration avec NestJS

### Service de Prompt Engineering

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

### Contrôleur de Prompt Engineering

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

## 🎯 Gestion des Erreurs et Validation

### Validation des Prompts

```typescript
class PromptValidator {
  validatePrompt(prompt: string): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    // Vérifier la longueur
    if (prompt.length > 4000) {
      errors.push('Prompt too long (max 4000 characters)')
    }
    
    // Vérifier les variables non fermées
    const openBraces = (prompt.match(/\{/g) || []).length
    const closeBraces = (prompt.match(/\}/g) || []).length
    if (openBraces !== closeBraces) {
      errors.push('Unmatched braces in prompt')
    }
    
    // Vérifier les caractères spéciaux
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

### Gestion des Erreurs

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

## 📚 Ressources

### Documentation officielle
- [OpenAI API Documentation](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Claude Documentation](https://docs.anthropic.com/claude/docs)
- [Google PaLM Documentation](https://developers.generativeai.google/guide/prompt_best_practices)

### Outils et frameworks
- [LangChain Prompts](https://js.langchain.com/docs/modules/prompts/)
- [Promptfoo](https://promptfoo.dev/) - Test de prompts
- [Weights & Biases](https://wandb.ai/) - Expérimentation
- [OpenAI Evals](https://github.com/openai/evals) - Évaluation

### Communautés et ressources
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [OpenAI Cookbook](https://cookbook.openai.com/)
- [Anthropic Cookbook](https://cookbook.anthropic.com/)

---

*Dernière mise à jour : Janvier 2024*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

