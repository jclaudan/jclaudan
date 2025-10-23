# 🔗 LangChain.js - Complete Guide

## 📋 Complete LangChain.js Reference Tables

### 🎯 Core Components

| Component | Import | Description | Example |
|-----------|--------|-------------|---------|
| **LLM** | `import { OpenAI } from "langchain/llms/openai"` | Language model | `new OpenAI({ temperature: 0.7 })` |
| **ChatModel** | `import { ChatOpenAI } from "langchain/chat_models/openai"` | Chat model | `new ChatOpenAI({ modelName: "gpt-4" })` |
| **PromptTemplate** | `import { PromptTemplate } from "langchain/prompts"` | Prompt template | `PromptTemplate.fromTemplate("Hello {name}")` |
| **ChatPromptTemplate** | `import { ChatPromptTemplate } from "langchain/prompts"` | Chat template | `ChatPromptTemplate.fromMessages([...])` |
| **Chain** | `import { LLMChain } from "langchain/chains"` | Processing chain | `new LLMChain({ llm, prompt })` |
| **Agent** | `import { initializeAgent } from "langchain/agents"` | AI agent | `initializeAgent(tools, llm, agentType)` |
| **Tool** | `import { Tool } from "langchain/tools"` | Custom tool | `new Tool({ name, description, func })` |
| **Memory** | `import { BufferMemory } from "langchain/memory"` | Conversational memory | `new BufferMemory()` |
| **VectorStore** | `import { Chroma } from "langchain/vectorstores/chroma"` | Vector database | `new Chroma(embeddings, config)` |
| **Retriever** | `import { VectorStoreRetriever } from "langchain/vectorstores/base"` | Retriever | `vectorStore.asRetriever()` |
| **Document** | `import { Document } from "langchain/document"` | Document | `new Document({ pageContent, metadata })` |
| **TextSplitter** | `import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"` | Text splitter | `new RecursiveCharacterTextSplitter()` |
| **Embeddings** | `import { OpenAIEmbeddings } from "langchain/embeddings/openai"` | Embeddings | `new OpenAIEmbeddings()` |

### 🎯 LLM Providers

| Provider | Model | Import | Configuration |
|----------|-------|--------|---------------|
| **OpenAI** | GPT-4 | `import { ChatOpenAI } from "langchain/chat_models/openai"` | `{ modelName: "gpt-4", temperature: 0.7 }` |
| **OpenAI** | GPT-3.5-turbo | `import { ChatOpenAI } from "langchain/chat_models/openai"` | `{ modelName: "gpt-3.5-turbo", temperature: 0.7 }` |
| **OpenAI** | text-davinci-003 | `import { OpenAI } from "langchain/llms/openai"` | `{ modelName: "text-davinci-003", temperature: 0.7 }` |
| **Anthropic** | Claude-3 | `import { ChatAnthropic } from "langchain/chat_models/anthropic"` | `{ modelName: "claude-3-sonnet-20240229" }` |
| **Google** | PaLM-2 | `import { ChatGooglePaLM } from "langchain/chat_models/googlepalm"` | `{ modelName: "chat-bison-001" }` |
| **Hugging Face** | T5 | `import { HuggingFaceInference } from "langchain/llms/hf"` | `{ model: "google/flan-t5-large" }` |
| **Cohere** | Command | `import { Cohere } from "langchain/llms/cohere"` | `{ model: "command" }` |
| **Replicate** | LLaMA | `import { Replicate } from "langchain/llms/replicate"` | `{ model: "meta/llama-2-70b-chat" }` |

### 🎯 Prompt Templates

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **PromptTemplate** | `import { PromptTemplate } from "langchain/prompts"` | Simple template | `PromptTemplate.fromTemplate("Hello {name}")` |
| **ChatPromptTemplate** | `import { ChatPromptTemplate } from "langchain/prompts"` | Chat template | `ChatPromptTemplate.fromMessages([...])` |
| **FewShotPromptTemplate** | `import { FewShotPromptTemplate } from "langchain/prompts"` | Template with examples | `FewShotPromptTemplate.fromExamples([...])` |
| **SystemMessagePromptTemplate** | `import { SystemMessagePromptTemplate } from "langchain/prompts"` | System message | `SystemMessagePromptTemplate.fromTemplate("You are {role}")` |
| **HumanMessagePromptTemplate** | `import { HumanMessagePromptTemplate } from "langchain/prompts"` | Human message | `HumanMessagePromptTemplate.fromTemplate("{input}")` |
| **AIMessagePromptTemplate** | `import { AIMessagePromptTemplate } from "langchain/prompts"` | AI message | `AIMessagePromptTemplate.fromTemplate("{response}")` |

### 🎯 Chains

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **LLMChain** | `import { LLMChain } from "langchain/chains"` | Basic LLM chain | `new LLMChain({ llm, prompt })` |
| **ConversationChain** | `import { ConversationChain } from "langchain/chains"` | Conversational chain | `new ConversationChain({ llm, memory })` |
| **RetrievalQAChain** | `import { RetrievalQAChain } from "langchain/chains"` | RAG chain | `RetrievalQAChain.fromLLM(llm, retriever)` |
| **MapReduceDocumentsChain** | `import { MapReduceDocumentsChain } from "langchain/chains"` | Document processing | `new MapReduceDocumentsChain(...)` |
| **StuffDocumentsChain** | `import { StuffDocumentsChain } from "langchain/chains"` | Document stuffing | `new StuffDocumentsChain(...)` |
| **RefineDocumentsChain** | `import { RefineDocumentsChain } from "langchain/chains"` | Document refinement | `new RefineDocumentsChain(...)` |

### 🎯 Memory Types

| Type | Import | Description | Use Case |
|------|--------|-------------|----------|
| **BufferMemory** | `import { BufferMemory } from "langchain/memory"` | Simple conversation buffer | Basic chat |
| **ConversationBufferWindowMemory** | `import { ConversationBufferWindowMemory } from "langchain/memory"` | Limited conversation buffer | Recent context only |
| **ConversationSummaryMemory** | `import { ConversationSummaryMemory } from "langchain/memory"` | Summarized conversation | Long conversations |
| **ConversationTokenBufferMemory** | `import { ConversationTokenBufferMemory } from "langchain/memory"` | Token-limited buffer | Token management |
| **VectorStoreRetrieverMemory** | `import { VectorStoreRetrieverMemory } from "langchain/memory"` | Vector-based memory | Semantic search |

### 🎯 Vector Stores

| Type | Import | Description | Use Case |
|------|--------|-------------|----------|
| **Chroma** | `import { Chroma } from "langchain/vectorstores/chroma"` | ChromaDB vector store | Local development |
| **Pinecone** | `import { PineconeStore } from "langchain/vectorstores/pinecone"` | Pinecone vector store | Production scale |
| **Weaviate** | `import { WeaviateStore } from "langchain/vectorstores/weaviate"` | Weaviate vector store | Enterprise |
| **FAISS** | `import { FAISS } from "langchain/vectorstores/faiss"` | FAISS vector store | Research/experiments |
| **HNSWLib** | `import { HNSWLib } from "langchain/vectorstores/hnswlib"` | HNSWLib vector store | Local vector search |

### 🎯 Tools

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **Calculator** | `import { Calculator } from "langchain/tools"` | Math calculations | `new Calculator()` |
| **SerpAPI** | `import { SerpAPI } from "langchain/tools"` | Web search | `new SerpAPI({ apiKey })` |
| **WikipediaQueryRun** | `import { WikipediaQueryRun } from "langchain/tools"` | Wikipedia search | `new WikipediaQueryRun()` |
| **BashProcess** | `import { BashProcess } from "langchain/tools"` | Bash commands | `new BashProcess()` |
| **DynamicTool** | `import { DynamicTool } from "langchain/tools"` | Custom tool | `new DynamicTool({ name, description, func })` |

## 🚀 Quick Start Examples

### Basic LLM Usage

```typescript
import { OpenAI } from "langchain/llms/openai";

const llm = new OpenAI({
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const response = await llm.predict("What is the capital of France?");
console.log(response);
```

### Chat Model with Memory

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

const chat = new ChatOpenAI({
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const memory = new BufferMemory();

const chain = new ConversationChain({
  llm: chat,
  memory: memory,
});

const response = await chain.call({
  input: "Hello, my name is John."
});
console.log(response.response);

const followUp = await chain.call({
  input: "What's my name?"
});
console.log(followUp.response); // "Your name is John."
```

### RAG System

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import { RetrievalQAChain } from "langchain/chains";

// Initialize components
const llm = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Create vector store
const vectorStore = await Chroma.fromDocuments(
  documents,
  embeddings,
  {
    collectionName: "my-collection",
  }
);

// Create retriever
const retriever = vectorStore.asRetriever();

// Create RAG chain
const chain = RetrievalQAChain.fromLLM(llm, retriever);

const response = await chain.call({
  query: "What is the main topic of the documents?",
});

console.log(response.text);
```

### Agent with Tools

```typescript
import { initializeAgent, AgentType } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { Calculator } from "langchain/tools";
import { SerpAPI } from "langchain/tools";

const llm = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const tools = [
  new Calculator(),
  new SerpAPI({
    apiKey: process.env.SERPAPI_API_KEY,
  }),
];

const agent = initializeAgent(tools, llm, AgentType.ZERO_SHOT_REACT_DESCRIPTION);

const response = await agent.call({
  input: "What is 25 * 4, and what's the current weather in Paris?",
});

console.log(response.output);
```

## 🎯 Best Practices

### Performance Optimization

1. **Use appropriate models** for your use case
2. **Implement caching** for repeated queries
3. **Batch requests** when possible
4. **Use streaming** for long responses
5. **Monitor token usage** and costs

### Error Handling

```typescript
import { OpenAI } from "langchain/llms/openai";

const llm = new OpenAI({
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

try {
  const response = await llm.predict("Your question here");
  console.log(response);
} catch (error) {
  if (error.message.includes("rate limit")) {
    console.log("Rate limit exceeded, retrying...");
    // Implement retry logic
  } else if (error.message.includes("authentication")) {
    console.log("Authentication failed");
    // Handle auth error
  } else {
    console.log("Unexpected error:", error.message);
  }
}
```

### Cost Management

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai";

// Use cheaper models for simple tasks
const simpleLLM = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});

// Use more expensive models for complex tasks
const complexLLM = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.7,
});
```

## 📚 Resources

- [LangChain.js Documentation](https://js.langchain.com/)
- [LangSmith Platform](https://smith.langchain.com/)
- [LangChain Templates](https://github.com/langchain-ai/langchain/tree/master/templates)
- [LangChain Hub](https://github.com/langchain-ai/langchain/tree/master/langchain)

---

*Last updated: January 2024*