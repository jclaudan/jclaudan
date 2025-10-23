# 🔍 RAG Systems - Complete Guide

## 📋 Complete RAG Reference Tables

### 🎯 RAG Components

| Component | Description | Tools | Example |
|-----------|-------------|-------|---------|
| **Retrieval** | Retrieving relevant documents | VectorStore, Embeddings | `vectorStore.similaritySearch(query)` |
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
| **Hybrid RAG** | Vector + textual search combination | Better coverage | More resources |
| **Self-RAG** | RAG with self-evaluation | Response quality | More computation |
| **Agentic RAG** | RAG with agents for decisions | Very intelligent | Very complex |
| **Graph RAG** | RAG with knowledge graphs | Complex relations | High complexity |

### 🎯 Vector Stores

| Vector Store | Description | Best For | Setup Complexity |
|--------------|-------------|----------|------------------|
| **Chroma** | Open-source vector database | Development, prototyping | Low |
| **Pinecone** | Managed vector database | Production, scale | Medium |
| **Weaviate** | GraphQL vector database | Enterprise, complex queries | High |
| **FAISS** | Facebook AI Similarity Search | Research, experiments | Medium |
| **HNSWLib** | Hierarchical Navigable Small World | Local development | Low |
| **Qdrant** | Vector similarity search engine | Performance, features | Medium |

### 🎯 Embedding Models

| Provider | Model | Dimensions | Best For | Cost |
|----------|-------|------------|----------|------|
| **OpenAI** | text-embedding-ada-002 | 1536 | General purpose | Pay per token |
| **OpenAI** | text-embedding-3-small | 1536 | Cost-effective | Lower cost |
| **OpenAI** | text-embedding-3-large | 3072 | High quality | Higher cost |
| **Cohere** | embed-english-v3.0 | 1024 | Multilingual | Pay per token |
| **Hugging Face** | sentence-transformers/all-MiniLM-L6-v2 | 384 | Free, local | Free |
| **Google** | textembedding-gecko | 768 | Google ecosystem | Pay per token |

### 🎯 Text Splitters

| Type | Description | Use Case | Example |
|------|-------------|----------|---------|
| **RecursiveCharacterTextSplitter** | Recursive character splitting | General purpose | `new RecursiveCharacterTextSplitter()` |
| **CharacterTextSplitter** | Simple character splitting | Simple text | `new CharacterTextSplitter({ separator: "\n" })` |
| **TokenTextSplitter** | Token-based splitting | Token-aware splitting | `new TokenTextSplitter({ chunkSize: 1000 })` |
| **SemanticChunker** | Semantic-aware splitting | Meaningful chunks | `new SemanticChunker({ threshold: 0.8 })` |
| **MarkdownHeaderTextSplitter** | Markdown header splitting | Documentation | `new MarkdownHeaderTextSplitter()` |
| **PythonCodeTextSplitter** | Python code splitting | Code files | `new PythonCodeTextSplitter()` |

## 🚀 RAG Implementation Examples

### Basic RAG System

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import { RetrievalQAChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";

// Initialize components
const llm = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Prepare documents
const documents = [
  new Document({
    pageContent: "Paris is the capital of France...",
    metadata: { source: "geography.txt" }
  }),
  // ... more documents
];

// Split documents
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const splits = await textSplitter.splitDocuments(documents);

// Create vector store
const vectorStore = await Chroma.fromDocuments(
  splits,
  embeddings,
  {
    collectionName: "knowledge-base",
  }
);

// Create retriever
const retriever = vectorStore.asRetriever({
  k: 4, // Number of documents to retrieve
});

// Create RAG chain
const chain = RetrievalQAChain.fromLLM(llm, retriever);

// Query the system
const response = await chain.call({
  query: "What is the capital of France?",
});

console.log(response.text);
```

### Hybrid RAG System

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import { BM25Retriever } from "langchain/retrievers/bm25";
import { EnsembleRetriever } from "langchain/retrievers/ensemble";
import { RetrievalQAChain } from "langchain/chains";

// Initialize components
const llm = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Vector retriever
const vectorStore = await Chroma.fromDocuments(documents, embeddings);
const vectorRetriever = vectorStore.asRetriever();

// BM25 retriever (keyword-based)
const bm25Retriever = new BM25Retriever({
  documents: documents,
  k: 4,
});

// Ensemble retriever (combines both)
const ensembleRetriever = new EnsembleRetriever({
  retrievers: [vectorRetriever, bm25Retriever],
  weights: [0.7, 0.3], // 70% vector, 30% BM25
});

// Create RAG chain with ensemble retriever
const chain = RetrievalQAChain.fromLLM(llm, ensembleRetriever);

const response = await chain.call({
  query: "What are the main features of the product?",
});

console.log(response.text);
```

### Multi-Step RAG System

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import { RetrievalQAChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

// Initialize components
const llm = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Step 1: Initial retrieval
const vectorStore = await Chroma.fromDocuments(documents, embeddings);
const retriever = vectorStore.asRetriever({
  k: 10, // Retrieve more documents initially
});

// Step 2: Create custom prompt for multi-step reasoning
const promptTemplate = PromptTemplate.fromTemplate(`
Context: {context}

Question: {question}

Based on the context above, please:
1. Identify the most relevant information
2. Analyze the information step by step
3. Provide a comprehensive answer

Answer:
`);

// Step 3: Create RAG chain with custom prompt
const chain = RetrievalQAChain.fromLLM(llm, retriever, {
  prompt: promptTemplate,
});

const response = await chain.call({
  query: "Explain the relationship between climate change and renewable energy",
});

console.log(response.text);
```

### Self-RAG System

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import { RetrievalQAChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

// Initialize components
const llm = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Create vector store
const vectorStore = await Chroma.fromDocuments(documents, embeddings);
const retriever = vectorStore.asRetriever();

// Self-RAG prompt template
const selfRAGPrompt = PromptTemplate.fromTemplate(`
Context: {context}

Question: {question}

Please evaluate the quality of the retrieved context and provide an answer. If the context is insufficient, indicate what additional information would be needed.

Answer:
`);

// Create RAG chain
const chain = RetrievalQAChain.fromLLM(llm, retriever, {
  prompt: selfRAGPrompt,
});

const response = await chain.call({
  query: "What are the latest developments in AI?",
});

console.log(response.text);
```

## 🎯 Best Practices

### Document Preparation

1. **Clean your documents** before processing
2. **Use appropriate chunk sizes** (500-1000 tokens)
3. **Add metadata** for better retrieval
4. **Consider document structure** (headers, sections)
5. **Handle different file formats** appropriately

### Retrieval Optimization

1. **Tune retrieval parameters** (k, similarity threshold)
2. **Use hybrid retrieval** for better coverage
3. **Implement reranking** for better relevance
4. **Monitor retrieval quality** with metrics
5. **Experiment with different embedding models**

### Response Quality

1. **Use appropriate prompts** for your use case
2. **Implement response validation** and filtering
3. **Add source citations** to responses
4. **Handle edge cases** gracefully
5. **Implement feedback loops** for improvement

### Performance Optimization

1. **Cache embeddings** and vector stores
2. **Use batch processing** for large datasets
3. **Implement async processing** for better throughput
4. **Monitor memory usage** and optimize accordingly
5. **Use appropriate vector store** for your scale

## 📚 Resources

- [LangChain RAG Documentation](https://js.langchain.com/docs/use_cases/question_answering/)
- [Vector Database Comparison](https://weaviate.io/blog/vector-database-comparison)
- [RAG Best Practices](https://www.pinecone.io/learn/what-is-retrieval-augmented-generation/)
- [Embedding Models Guide](https://platform.openai.com/docs/guides/embeddings)

---

*Last updated: January 2024*