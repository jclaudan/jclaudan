# 🔍 Systèmes RAG - Guide Complet

## 📋 Tableaux de Référence Complète RAG

### 🎯 Composants RAG

| Composant | Description | Outils | Exemple |
|-----------|-------------|--------|---------|
| **Retrieval** | Récupération de documents pertinents | VectorStore, Embeddings | `vectorStore.similaritySearch(query)` |
| **Augmentation** | Enrichissement du contexte | PromptTemplate, Context | `prompt.format({ context, question })` |
| **Génération** | Génération de réponse | LLM, ChatModel | `llm.generate([prompt])` |
| **Vector Store** | Stockage vectoriel | Chroma, Pinecone, Weaviate | `new Chroma(embeddings, config)` |
| **Embeddings** | Conversion en vecteurs | OpenAI, Cohere, HuggingFace | `new OpenAIEmbeddings()` |
| **Text Splitter** | Découpage de documents | RecursiveCharacterTextSplitter | `splitter.splitDocuments(docs)` |
| **Retriever** | Interface de récupération | VectorStoreRetriever | `vectorStore.asRetriever()` |
| **Reranker** | Reclassement des résultats | CrossEncoder, Cohere | `reranker.rank(query, docs)` |

### 🎯 Types de RAG

| Type | Description | Avantages | Inconvénients |
|------|-------------|-----------|---------------|
| **Basic RAG** | RAG simple avec récupération et génération | Simple à implémenter | Qualité limitée |
| **Multi-Step RAG** | RAG avec plusieurs étapes de récupération | Meilleure précision | Plus complexe |
| **Hybrid RAG** | Combinaison recherche vectorielle + textuelle | Meilleure couverture | Plus de ressources |
| **Self-RAG** | RAG avec auto-évaluation | Qualité de réponse | Plus de calculs |
| **Agentic RAG** | RAG avec agents pour décisions | Très intelligent | Très complexe |
| **Graph RAG** | RAG avec graphes de connaissances | Relations complexes | Complexité élevée |

### 🎯 Vector Stores

| Store | Description | Avantages | Inconvénients |
|-------|-------------|-----------|---------------|
| **Chroma** | Base vectorielle open source | Simple, rapide | Limité en production |
| **Pinecone** | Base vectorielle cloud | Scalable, performant | Payant |
| **Weaviate** | Base vectorielle open source | GraphQL, flexible | Complexe |
| **FAISS** | Bibliothèque Facebook | Très rapide | Pas de persistance |
| **Qdrant** | Base vectorielle Rust | Performant, moderne | Moins mature |
| **Milvus** | Base vectorielle distribuée | Très scalable | Complexe |

### 🎯 Embeddings

| Type | Description | Dimensions | Performance |
|------|-------------|------------|-------------|
| **OpenAI text-embedding-ada-002** | Embeddings OpenAI | 1536 | Excellente |
| **OpenAI text-embedding-3-small** | Nouveaux embeddings OpenAI | 1536 | Excellente |
| **OpenAI text-embedding-3-large** | Nouveaux embeddings OpenAI | 3072 | Excellente |
| **Cohere embed-english-v2.0** | Embeddings Cohere | 4096 | Très bonne |
| **Cohere embed-multilingual-v2.0** | Embeddings multilingues | 768 | Très bonne |
| **Hugging Face sentence-transformers** | Modèles open source | Variable | Bonne |
| **Google PaLM** | Embeddings Google | 768 | Bonne |

### 🎯 Text Splitters

| Type | Description | Avantages | Inconvénients |
|-------|-------------|-----------|---------------|
| **RecursiveCharacterTextSplitter** | Découpage récursif par caractère | Flexible, intelligent | Peut couper des phrases |
| **CharacterTextSplitter** | Découpage simple par caractère | Simple, rapide | Peut couper des mots |
| **TokenTextSplitter** | Découpage par tokens | Respecte les limites | Complexe |
| **MarkdownHeaderTextSplitter** | Découpage par en-têtes Markdown | Structure préservée | Spécifique Markdown |
| **PythonCodeTextSplitter** | Découpage de code Python | Syntaxe préservée | Spécifique Python |
| **NLTKTextSplitter** | Découpage avec NLTK | Linguistique | Dépendance NLTK |

### 🎯 Retrieval Strategies

| Stratégie | Description | Cas d'usage |
|-----------|-------------|-------------|
| **Similarity Search** | Recherche par similarité | Q&A général |
| **MMR (Maximal Marginal Relevance)** | Diversité des résultats | Recherche diversifiée |
| **Hybrid Search** | Vectoriel + textuel | Recherche précise |
| **Semantic Search** | Recherche sémantique | Compréhension contextuelle |
| **Graph Search** | Recherche dans un graphe | Relations complexes |
| **Temporal Search** | Recherche temporelle | Données chronologiques |

### 🎯 Prompt Templates RAG

| Template | Description | Exemple |
|----------|-------------|---------|
| **Basic RAG** | Template de base | `"Context: {context}\nQuestion: {question}\nAnswer:"` |
| **Few-Shot RAG** | Template avec exemples | `"Examples:\nQ: {example_q}\nA: {example_a}\n\nContext: {context}\nQuestion: {question}\nAnswer:"` |
| **Chain-of-Thought RAG** | Template avec raisonnement | `"Context: {context}\nQuestion: {question}\nLet's think step by step:\nAnswer:"` |
| **Self-Reflection RAG** | Template avec auto-évaluation | `"Context: {context}\nQuestion: {question}\nAnswer: {answer}\nIs this answer correct? {reflection}"` |
| **Multi-Step RAG** | Template multi-étapes | `"Step 1: Find relevant information\nStep 2: Analyze the context\nStep 3: Generate answer\n\nContext: {context}\nQuestion: {question}\nAnswer:"` |

### 🎯 Evaluation Metrics

| Métrique | Description | Range | Usage |
|----------|-------------|-------|-------|
| **Precision** | Précision des résultats | 0-1 | Qualité de récupération |
| **Recall** | Rappel des résultats | 0-1 | Couverture de récupération |
| **F1 Score** | Moyenne harmonique | 0-1 | Équilibre précision/rappel |
| **MRR (Mean Reciprocal Rank)** | Rang moyen réciproque | 0-1 | Qualité du premier résultat |
| **NDCG (Normalized DCG)** | Gain cumulatif normalisé | 0-1 | Qualité du classement |
| **BLEU Score** | Qualité de génération | 0-1 | Similarité avec référence |
| **ROUGE Score** | Qualité de résumé | 0-1 | Qualité du résumé |
| **Semantic Similarity** | Similarité sémantique | 0-1 | Qualité sémantique |

---

## 🚀 Introduction

Les systèmes RAG (Retrieval-Augmented Generation) combinent la récupération d'informations avec la génération de texte pour créer des systèmes de Q&A intelligents et contextuels.

## 🎯 Architecture RAG de Base

### Composants Principaux

```typescript
// 1. Document Loader
import { TextLoader } from "langchain/document_loaders/fs/text"
const loader = new TextLoader("path/to/document.txt")
const documents = await loader.load()

// 2. Text Splitter
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200
})
const texts = await textSplitter.splitDocuments(documents)

// 3. Embeddings
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
const embeddings = new OpenAIEmbeddings()

// 4. Vector Store
import { Chroma } from "langchain/vectorstores/chroma"
const vectorStore = await Chroma.fromDocuments(texts, embeddings)

// 5. Retriever
const retriever = vectorStore.asRetriever()

// 6. LLM
import { ChatOpenAI } from "langchain/chat_models/openai"
const llm = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY })

// 7. RAG Chain
import { RetrievalQAChain } from "langchain/chains"
const chain = RetrievalQAChain.fromLLM(llm, retriever)
```

## 🎯 RAG Avancé avec NestJS

### Service RAG

```typescript
// rag.service.ts
import { Injectable } from '@nestjs/common'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Chroma } from 'langchain/vectorstores/chroma'
import { RetrievalQAChain } from 'langchain/chains'
import { PromptTemplate } from 'langchain/prompts'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

@Injectable()
export class RAGService {
  private chain: RetrievalQAChain
  private vectorStore: Chroma
  private embeddings: OpenAIEmbeddings

  constructor() {
    this.embeddings = new OpenAIEmbeddings()
    this.initializeChain()
  }

  private async initializeChain() {
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4',
      temperature: 0.7
    })

    // Prompt personnalisé
    const promptTemplate = new PromptTemplate({
      template: `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context:
{context}

Question: {question}
Answer:`,
      inputVariables: ['context', 'question']
    })

    this.chain = RetrievalQAChain.fromLLM(llm, this.vectorStore?.asRetriever(), {
      prompt: promptTemplate
    })
  }

  async addDocuments(documents: string[]): Promise<void> {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    })

    const texts = await textSplitter.createDocuments(documents)
    
    if (!this.vectorStore) {
      this.vectorStore = await Chroma.fromDocuments(texts, this.embeddings)
    } else {
      await this.vectorStore.addDocuments(texts)
    }

    await this.initializeChain()
  }

  async query(question: string): Promise<string> {
    if (!this.chain) {
      throw new Error('RAG system not initialized. Please add documents first.')
    }

    const result = await this.chain.call({ query: question })
    return result.text
  }

  async similaritySearch(query: string, k: number = 4): Promise<any[]> {
    if (!this.vectorStore) {
      throw new Error('Vector store not initialized')
    }

    return await this.vectorStore.similaritySearch(query, k)
  }
}
```

### Contrôleur RAG

```typescript
// rag.controller.ts
import { Controller, Post, Body, Get, Query } from '@nestjs/common'
import { RAGService } from './rag.service'

@Controller('rag')
export class RAGController {
  constructor(private readonly ragService: RAGService) {}

  @Post('documents')
  async addDocuments(@Body() body: { documents: string[] }) {
    await this.ragService.addDocuments(body.documents)
    return { message: 'Documents added successfully' }
  }

  @Post('query')
  async query(@Body() body: { question: string }) {
    const answer = await this.ragService.query(body.question)
    return { answer }
  }

  @Get('search')
  async search(@Query('query') query: string, @Query('k') k: number = 4) {
    const results = await this.ragService.similaritySearch(query, k)
    return { results }
  }
}
```

## 🎯 RAG Hybride

### Combinaison Recherche Vectorielle + Textuelle

```typescript
import { Chroma } from 'langchain/vectorstores/chroma'
import { ElasticSearch } from 'langchain/vectorstores/elasticsearch'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

class HybridRAGService {
  private vectorStore: Chroma
  private textStore: ElasticSearch
  private embeddings: OpenAIEmbeddings

  constructor() {
    this.embeddings = new OpenAIEmbeddings()
  }

  async hybridSearch(query: string, k: number = 4): Promise<any[]> {
    // Recherche vectorielle
    const vectorResults = await this.vectorStore.similaritySearch(query, k)
    
    // Recherche textuelle
    const textResults = await this.textStore.similaritySearch(query, k)
    
    // Combinaison et déduplication
    const combinedResults = this.combineResults(vectorResults, textResults)
    
    // Reclassement
    return this.rerankResults(query, combinedResults)
  }

  private combineResults(vectorResults: any[], textResults: any[]): any[] {
    const combined = [...vectorResults, ...textResults]
    const unique = new Map()
    
    combined.forEach(doc => {
      if (!unique.has(doc.metadata.id)) {
        unique.set(doc.metadata.id, doc)
      }
    })
    
    return Array.from(unique.values())
  }

  private async rerankResults(query: string, results: any[]): Promise<any[]> {
    // Utilisation d'un reranker (ex: CrossEncoder)
    const reranker = new CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
    
    const pairs = results.map(doc => [query, doc.pageContent])
    const scores = await reranker.predict(pairs)
    
    return results
      .map((doc, index) => ({ ...doc, score: scores[index] }))
      .sort((a, b) => b.score - a.score)
  }
}
```

## 🎯 RAG Multi-Step

### Recherche en Plusieurs Étapes

```typescript
class MultiStepRAGService {
  private vectorStore: Chroma
  private llm: ChatOpenAI

  async multiStepQuery(question: string): Promise<string> {
    // Étape 1: Recherche initiale
    const initialResults = await this.vectorStore.similaritySearch(question, 10)
    
    // Étape 2: Génération de sous-questions
    const subQuestions = await this.generateSubQuestions(question, initialResults)
    
    // Étape 3: Recherche pour chaque sous-question
    const subResults = await Promise.all(
      subQuestions.map(async (subQ) => {
        const results = await this.vectorStore.similaritySearch(subQ, 5)
        return { question: subQ, results }
      })
    )
    
    // Étape 4: Synthèse finale
    const finalAnswer = await this.synthesizeAnswer(question, subResults)
    
    return finalAnswer
  }

  private async generateSubQuestions(question: string, context: any[]): Promise<string[]> {
    const prompt = `Based on the main question: "${question}"
And the following context: ${context.map(c => c.pageContent).join('\n')}

Generate 3-5 sub-questions that would help answer the main question more comprehensively.

Sub-questions:`

    const response = await this.llm.call([new HumanMessage(prompt)])
    return response.content.split('\n').filter(q => q.trim())
  }

  private async synthesizeAnswer(question: string, subResults: any[]): Promise<string> {
    const context = subResults.map(sr => 
      `Question: ${sr.question}\nAnswer: ${sr.results.map(r => r.pageContent).join('\n')}`
    ).join('\n\n')

    const prompt = `Main Question: ${question}

Context from sub-questions:
${context}

Provide a comprehensive answer based on the context above:`

    const response = await this.llm.call([new HumanMessage(prompt)])
    return response.content
  }
}
```

## 🎯 Self-RAG

### RAG avec Auto-Évaluation

```typescript
class SelfRAGService {
  private vectorStore: Chroma
  private llm: ChatOpenAI

  async selfRAGQuery(question: string): Promise<string> {
    // Étape 1: Recherche initiale
    const retrievedDocs = await this.vectorStore.similaritySearch(question, 5)
    
    // Étape 2: Génération de réponse
    const answer = await this.generateAnswer(question, retrievedDocs)
    
    // Étape 3: Auto-évaluation
    const evaluation = await this.evaluateAnswer(question, answer, retrievedDocs)
    
    // Étape 4: Amélioration si nécessaire
    if (evaluation.needsImprovement) {
      const improvedAnswer = await this.improveAnswer(question, answer, evaluation)
      return improvedAnswer
    }
    
    return answer
  }

  private async generateAnswer(question: string, context: any[]): Promise<string> {
    const prompt = `Context: ${context.map(c => c.pageContent).join('\n')}
Question: ${question}
Answer:`

    const response = await this.llm.call([new HumanMessage(prompt)])
    return response.content
  }

  private async evaluateAnswer(question: string, answer: string, context: any[]): Promise<any> {
    const prompt = `Question: ${question}
Answer: ${answer}
Context: ${context.map(c => c.pageContent).join('\n')}

Evaluate the answer on the following criteria:
1. Relevance to the question (1-5)
2. Accuracy based on context (1-5)
3. Completeness (1-5)
4. Needs improvement (yes/no)

Provide your evaluation in JSON format:`

    const response = await this.llm.call([new HumanMessage(prompt)])
    return JSON.parse(response.content)
  }

  private async improveAnswer(question: string, answer: string, evaluation: any): Promise<string> {
    const prompt = `Question: ${question}
Original Answer: ${answer}
Evaluation: ${JSON.stringify(evaluation)}

Improve the answer based on the evaluation:`

    const response = await this.llm.call([new HumanMessage(prompt)])
    return response.content
  }
}
```

## 🎯 Évaluation des Systèmes RAG

### Métriques de Performance

```typescript
class RAGEvaluator {
  async evaluateRAG(
    questions: string[],
    groundTruth: string[],
    ragService: RAGService
  ): Promise<any> {
    const results = await Promise.all(
      questions.map(async (question, index) => {
        const answer = await ragService.query(question)
        const similarity = await this.calculateSimilarity(answer, groundTruth[index])
        return { question, answer, similarity }
      })
    )

    const avgSimilarity = results.reduce((sum, r) => sum + r.similarity, 0) / results.length
    
    return {
      averageSimilarity: avgSimilarity,
      results
    }
  }

  private async calculateSimilarity(answer: string, groundTruth: string): Promise<number> {
    // Utilisation d'un modèle de similarité sémantique
    const embeddings = new OpenAIEmbeddings()
    const answerEmbedding = await embeddings.embedQuery(answer)
    const truthEmbedding = await embeddings.embedQuery(groundTruth)
    
    return this.cosineSimilarity(answerEmbedding, truthEmbedding)
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
    
    return dotProduct / (magnitudeA * magnitudeB)
  }
}
```

## 🎯 Optimisation des Performances

### Cache et Optimisation

```typescript
import { CacheBackedEmbeddings } from 'langchain/embeddings/cache_backed'
import { LocalFileStore } from 'langchain/storage/file_system'

class OptimizedRAGService {
  private embeddings: CacheBackedEmbeddings
  private vectorStore: Chroma
  private cache: Map<string, string> = new Map()

  constructor() {
    // Cache des embeddings
    const store = new LocalFileStore('./cache')
    this.embeddings = new CacheBackedEmbeddings(
      new OpenAIEmbeddings(),
      store
    )
  }

  async query(question: string): Promise<string> {
    // Vérification du cache
    if (this.cache.has(question)) {
      return this.cache.get(question)!
    }

    // Recherche vectorielle
    const results = await this.vectorStore.similaritySearch(question, 5)
    
    // Génération de réponse
    const answer = await this.generateAnswer(question, results)
    
    // Mise en cache
    this.cache.set(question, answer)
    
    return answer
  }

  // Nettoyage du cache
  clearCache(): void {
    this.cache.clear()
  }
}
```

## 📚 Ressources

### Documentation officielle
- [LangChain RAG Documentation](https://js.langchain.com/docs/use_cases/question_answering/)
- [Vector Stores Documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/)
- [Embeddings Documentation](https://js.langchain.com/docs/modules/data_connection/text_embedding/)

### Outils et services
- [Pinecone](https://www.pinecone.io/) - Base de données vectorielle
- [Weaviate](https://weaviate.io/) - Base de données vectorielle
- [Chroma](https://www.trychroma.com/) - Base de données vectorielle open source
- [Qdrant](https://qdrant.tech/) - Base de données vectorielle Rust

### Recherche et évaluation
- [RAG Evaluation](https://github.com/langchain-ai/langchain/tree/master/templates/rag-evaluation)
- [RAG Templates](https://github.com/langchain-ai/langchain/tree/master/templates)
- [RAG Best Practices](https://python.langchain.com/docs/use_cases/question_answering/)

---

*Dernière mise à jour : Janvier 2024*
