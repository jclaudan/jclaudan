# 🔍 RAG Systems - Complete Guide

## 📋 Complete RAG Reference Tables

### 🎯 RAG Components

| Component | Description | Tools | Example |
|-----------|-------------|-------|---------|
| **Retrieval** | Retrieval of relevant documents | VectorStore, Embeddings | `vectorStore.similaritySearch(query)` |
| **Augmentation** | Context enrichment | PromptTemplate, Context | `prompt.format({ context, question })` |
| **Generation** | Response generation | LLM, ChatModel | `llm.generate([prompt])` |
| **Vector Store** | Vector storage | Chroma, Pinecone, Weaviate | `new Chroma(embeddings, config)` |
| **Embeddings** | Vector conversion | OpenAI, Cohere, HuggingFace | `new OpenAIEmbeddings()` |
| **Text Splitter** | Document splitting | RecursiveCharacterTextSplitter | `splitter.splitDocuments(docs)` |
| **Retriever** | Retrieval interface | VectorStoreRetriever | `vectorStore.asRetriever()` |
| **Reranker** | Result reranking | CrossEncoder, Cohere | `reranker.rank(query, docs)` |

### 🎯 RAG Types

| Type | Description | Advantages | Disadvantages |
|------|-------------|------------|---------------|
| **Basic RAG** | Simple RAG with retrieval and generation | Simple to implement | Limited quality |
| **Multi-Step RAG** | RAG with multiple retrieval steps | Better accuracy | More complex |
| **Hybrid RAG** | Combination of vector + textual search | Better coverage | More resources |
| **Self-RAG** | RAG with self-evaluation | Response quality | More calculations |
| **Agentic RAG** | RAG with agents for decisions | Very intelligent | Very complex |
| **Graph RAG** | RAG with knowledge graphs | Complex relations | High complexity |

### 🎯 Vector Stores

| Store | Description | Advantages | Disadvantages |
|-------|-------------|------------|---------------|
| **Chroma** | Open source vector database | Simple, fast | Limited in production |
| **Pinecone** | Cloud vector database | Scalable, performant | Paid |
| **Weaviate** | Open source vector database | GraphQL, flexible | Complex |
| **FAISS** | Facebook library | Very fast | No persistence |
| **Qdrant** | Rust vector database | Performant, modern | Less mature |
| **Milvus** | Distributed vector database | Very scalable | Complex |

### 🎯 Embeddings

| Type | Description | Dimensions | Performance |
|------|-------------|------------|-------------|
| **OpenAI text-embedding-ada-002** | OpenAI embeddings | 1536 | Excellent |
| **OpenAI text-embedding-3-small** | New OpenAI embeddings | 1536 | Excellent |
| **OpenAI text-embedding-3-large** | New OpenAI embeddings | 3072 | Excellent |
| **Cohere embed-english-v2.0** | Cohere embeddings | 4096 | Very good |
| **Cohere embed-multilingual-v2.0** | Multilingual embeddings | 768 | Very good |
| **Hugging Face sentence-transformers** | Open source models | Variable | Good |
| **Google PaLM** | Google embeddings | 768 | Good |

### 🎯 Text Splitters

| Type | Description | Advantages | Disadvantages |
|------|-------------|------------|---------------|
| **RecursiveCharacterTextSplitter** | Recursive character splitting | Flexible, intelligent | May cut sentences |
| **CharacterTextSplitter** | Simple character splitting | Simple, fast | May cut words |
| **TokenTextSplitter** | Token-based splitting | Respects limits | Complex |
| **MarkdownHeaderTextSplitter** | Markdown header splitting | Structure preserved | Markdown specific |
| **PythonCodeTextSplitter** | Python code splitting | Syntax preserved | Python specific |
| **NLTKTextSplitter** | NLTK-based splitting | Linguistic | NLTK dependency |

### 🎯 Retrieval Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| **Similarity Search** | Similarity-based search | General Q&A |
| **MMR (Maximal Marginal Relevance)** | Result diversity | Diversified search |
| **Hybrid Search** | Vector + textual | Precise search |
| **Semantic Search** | Semantic search | Contextual understanding |
| **Graph Search** | Graph-based search | Complex relations |
| **Temporal Search** | Temporal search | Chronological data |

### 🎯 RAG Prompt Templates

| Template | Description | Example |
|----------|-------------|---------|
| **Basic RAG** | Basic template | `"Context: {context}\nQuestion: {question}\nAnswer:"` |
| **Few-Shot RAG** | Template with examples | `"Examples:\nQ: {example_q}\nA: {example_a}\n\nContext: {context}\nQuestion: {question}\nAnswer:"` |
| **Chain-of-Thought RAG** | Template with reasoning | `"Context: {context}\nQuestion: {question}\nLet's think step by step:\nAnswer:"` |
| **Self-Reflection RAG** | Template with self-evaluation | `"Context: {context}\nQuestion: {question}\nAnswer: {answer}\nIs this answer correct? {reflection}"` |
| **Multi-Step RAG** | Multi-step template | `"Step 1: Find relevant information\nStep 2: Analyze the context\nStep 3: Generate answer\n\nContext: {context}\nQuestion: {question}\nAnswer:"` |

### 🎯 Evaluation Metrics

| Metric | Description | Range | Usage |
|--------|-------------|-------|-------|
| **Precision** | Result precision | 0-1 | Retrieval quality |
| **Recall** | Result recall | 0-1 | Retrieval coverage |
| **F1 Score** | Harmonic mean | 0-1 | Precision/recall balance |
| **MRR (Mean Reciprocal Rank)** | Mean reciprocal rank | 0-1 | First result quality |
| **NDCG (Normalized DCG)** | Normalized cumulative gain | 0-1 | Ranking quality |
| **BLEU Score** | Generation quality | 0-1 | Reference similarity |
| **ROUGE Score** | Summary quality | 0-1 | Summary quality |
| **Semantic Similarity** | Semantic similarity | 0-1 | Semantic quality |

---

## 🚀 Introduction

RAG (Retrieval-Augmented Generation) systems combine information retrieval with text generation to create intelligent and contextual Q&A systems.

## 🎯 Basic RAG Architecture

### Main Components

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

## 🎯 Advanced RAG with NestJS

### RAG Service

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

    // Custom prompt
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

### RAG Controller

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

## 🎯 Hybrid RAG

### Vector + Textual Search Combination

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
    // Vector search
    const vectorResults = await this.vectorStore.similaritySearch(query, k)
    
    // Textual search
    const textResults = await this.textStore.similaritySearch(query, k)
    
    // Combination and deduplication
    const combinedResults = this.combineResults(vectorResults, textResults)
    
    // Reranking
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
    // Using a reranker (e.g., CrossEncoder)
    const reranker = new CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
    
    const pairs = results.map(doc => [query, doc.pageContent])
    const scores = await reranker.predict(pairs)
    
    return results
      .map((doc, index) => ({ ...doc, score: scores[index] }))
      .sort((a, b) => b.score - a.score)
  }
}
```

## 🎯 Multi-Step RAG

### Multi-Step Search

```typescript
class MultiStepRAGService {
  private vectorStore: Chroma
  private llm: ChatOpenAI

  async multiStepQuery(question: string): Promise<string> {
    // Step 1: Initial search
    const initialResults = await this.vectorStore.similaritySearch(question, 10)
    
    // Step 2: Generate sub-questions
    const subQuestions = await this.generateSubQuestions(question, initialResults)
    
    // Step 3: Search for each sub-question
    const subResults = await Promise.all(
      subQuestions.map(async (subQ) => {
        const results = await this.vectorStore.similaritySearch(subQ, 5)
        return { question: subQ, results }
      })
    )
    
    // Step 4: Final synthesis
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

### RAG with Self-Evaluation

```typescript
class SelfRAGService {
  private vectorStore: Chroma
  private llm: ChatOpenAI

  async selfRAGQuery(question: string): Promise<string> {
    // Step 1: Initial search
    const retrievedDocs = await this.vectorStore.similaritySearch(question, 5)
    
    // Step 2: Generate answer
    const answer = await this.generateAnswer(question, retrievedDocs)
    
    // Step 3: Self-evaluation
    const evaluation = await this.evaluateAnswer(question, answer, retrievedDocs)
    
    // Step 4: Improvement if necessary
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

## 🎯 RAG System Evaluation

### Performance Metrics

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
    // Using a semantic similarity model
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

## 🎯 Performance Optimization

### Cache and Optimization

```typescript
import { CacheBackedEmbeddings } from 'langchain/embeddings/cache_backed'
import { LocalFileStore } from 'langchain/storage/file_system'

class OptimizedRAGService {
  private embeddings: CacheBackedEmbeddings
  private vectorStore: Chroma
  private cache: Map<string, string> = new Map()

  constructor() {
    // Embedding cache
    const store = new LocalFileStore('./cache')
    this.embeddings = new CacheBackedEmbeddings(
      new OpenAIEmbeddings(),
      store
    )
  }

  async query(question: string): Promise<string> {
    // Cache check
    if (this.cache.has(question)) {
      return this.cache.get(question)!
    }

    // Vector search
    const results = await this.vectorStore.similaritySearch(question, 5)
    
    // Answer generation
    const answer = await this.generateAnswer(question, results)
    
    // Caching
    this.cache.set(question, answer)
    
    return answer
  }

  // Cache cleanup
  clearCache(): void {
    this.cache.clear()
  }
}
```

## 📚 Resources

### Official Documentation
- [LangChain RAG Documentation](https://js.langchain.com/docs/use_cases/question_answering/)
- [Vector Stores Documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/)
- [Embeddings Documentation](https://js.langchain.com/docs/modules/data_connection/text_embedding/)

### Tools and Services
- [Pinecone](https://www.pinecone.io/) - Vector database
- [Weaviate](https://weaviate.io/) - Vector database
- [Chroma](https://www.trychroma.com/) - Open source vector database
- [Qdrant](https://qdrant.tech/) - Rust vector database

### Research and Evaluation
- [RAG Evaluation](https://github.com/langchain-ai/langchain/tree/master/templates/rag-evaluation)
- [RAG Templates](https://github.com/langchain-ai/langchain/tree/master/templates)
- [RAG Best Practices](https://python.langchain.com/docs/use_cases/question_answering/)

---

*Last updated: January 2024*
