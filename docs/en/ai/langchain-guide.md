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
| **LLMChain** | `import { LLMChain } from "langchain/chains"` | Simple LLM chain | `new LLMChain({ llm, prompt })` |
| **ConversationChain** | `import { ConversationChain } from "langchain/chains"` | Conversational chain | `new ConversationChain({ llm, memory })` |
| **RetrievalQAChain** | `import { RetrievalQAChain } from "langchain/chains"` | Q&A chain with retrieval | `RetrievalQAChain.fromLLM(llm, retriever)` |
| **MapReduceChain** | `import { MapReduceChain } from "langchain/chains"` | Map-reduce chain | `MapReduceChain.fromLLM(llm, mapPrompt, reducePrompt)` |
| **StuffDocumentsChain** | `import { StuffDocumentsChain } from "langchain/chains"` | Document chain | `StuffDocumentsChain.fromLLM(llm, documentPrompt)` |
| **RefineDocumentsChain** | `import { RefineDocumentsChain } from "langchain/chains"` | Refinement chain | `RefineDocumentsChain.fromLLM(llm, questionPrompt, refinePrompt)` |

### 🎯 Agents

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **ReAct Agent** | `import { initializeAgent } from "langchain/agents"` | Reasoning + Acting agent | `initializeAgent(tools, llm, "react-docstore")` |
| **Conversational Agent** | `import { initializeAgent } from "langchain/agents"` | Conversational agent | `initializeAgent(tools, llm, "conversational-react-description")` |
| **Self Ask With Search** | `import { initializeAgent } from "langchain/agents"` | Self-questioning agent | `initializeAgent(tools, llm, "self-ask-with-search")` |
| **Chat Agent** | `import { initializeAgent } from "langchain/agents"` | Chat agent | `initializeAgent(tools, llm, "chat-zero-shot-react-description")` |
| **Plan and Execute** | `import { initializeAgent } from "langchain/agents"` | Planning agent | `initializeAgent(tools, llm, "plan-and-execute")` |

### 🎯 Tools

| Tool | Import | Description | Example |
|------|--------|-------------|---------|
| **Calculator** | `import { Calculator } from "langchain/tools"` | Calculator | `new Calculator()` |
| **Web Search** | `import { SerpAPI } from "langchain/tools"` | Web search | `new SerpAPI()` |
| **Wikipedia** | `import { WikipediaQueryRun } from "langchain/tools"` | Wikipedia | `new WikipediaQueryRun()` |
| **DuckDuckGo** | `import { DuckDuckGoSearch } from "langchain/tools"` | DuckDuckGo search | `new DuckDuckGoSearch()` |
| **Code Execution** | `import { PythonREPLTool } from "langchain/tools"` | Python execution | `new PythonREPLTool()` |
| **File System** | `import { ReadFileTool } from "langchain/tools"` | File reading | `new ReadFileTool()` |
| **Custom Tool** | `import { Tool } from "langchain/tools"` | Custom tool | `new Tool({ name, description, func })` |

### 🎯 Memory Types

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **BufferMemory** | `import { BufferMemory } from "langchain/memory"` | Buffer memory | `new BufferMemory()` |
| **ConversationBufferMemory** | `import { ConversationBufferMemory } from "langchain/memory"` | Conversational memory | `new ConversationBufferMemory()` |
| **ConversationSummaryMemory** | `import { ConversationSummaryMemory } from "langchain/memory"` | Memory with summary | `new ConversationSummaryMemory({ llm })` |
| **ConversationTokenBufferMemory** | `import { ConversationTokenBufferMemory } from "langchain/memory"` | Memory with token limit | `new ConversationTokenBufferMemory({ llm, maxTokenLimit: 2000 })` |
| **VectorStoreRetrieverMemory** | `import { VectorStoreRetrieverMemory } from "langchain/memory"` | Vector memory | `new VectorStoreRetrieverMemory({ retriever })` |
| **EntityMemory** | `import { EntityMemory } from "langchain/memory"` | Entity memory | `new EntityMemory({ llm })` |

### 🎯 Vector Stores

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **Chroma** | `import { Chroma } from "langchain/vectorstores/chroma"` | Chroma vector database | `new Chroma(embeddings, config)` |
| **Pinecone** | `import { PineconeStore } from "langchain/vectorstores/pinecone"` | Pinecone vector database | `PineconeStore.fromExistingIndex(index, embeddings)` |
| **Weaviate** | `import { WeaviateStore } from "langchain/vectorstores/weaviate"` | Weaviate vector database | `new WeaviateStore(embeddings, config)` |
| **FAISS** | `import { FAISS } from "langchain/vectorstores/faiss"` | FAISS vector database | `new FAISS(embeddings, config)` |
| **HnswLib** | `import { HnswLib } from "langchain/vectorstores/hnswlib"` | HnswLib vector database | `new HnswLib(embeddings, config)` |
| **Qdrant** | `import { QdrantVectorStore } from "langchain/vectorstores/qdrant"` | Qdrant vector database | `new QdrantVectorStore(embeddings, config)` |

### 🎯 Embeddings

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **OpenAI** | `import { OpenAIEmbeddings } from "langchain/embeddings/openai"` | OpenAI embeddings | `new OpenAIEmbeddings()` |
| **Cohere** | `import { CohereEmbeddings } from "langchain/embeddings/cohere"` | Cohere embeddings | `new CohereEmbeddings()` |
| **Hugging Face** | `import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf"` | Hugging Face embeddings | `new HuggingFaceInferenceEmbeddings()` |
| **Google** | `import { GooglePaLMEmbeddings } from "langchain/embeddings/googlepalm"` | Google PaLM embeddings | `new GooglePaLMEmbeddings()` |
| **Local** | `import { LocalEmbeddings } from "langchain/embeddings/local"` | Local embeddings | `new LocalEmbeddings()` |

### 🎯 Text Splitters

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **RecursiveCharacterTextSplitter** | `import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"` | Recursive splitter | `new RecursiveCharacterTextSplitter()` |
| **CharacterTextSplitter** | `import { CharacterTextSplitter } from "langchain/text_splitter"` | Character splitter | `new CharacterTextSplitter()` |
| **TokenTextSplitter** | `import { TokenTextSplitter } from "langchain/text_splitter"` | Token splitter | `new TokenTextSplitter()` |
| **MarkdownHeaderTextSplitter** | `import { MarkdownHeaderTextSplitter } from "langchain/text_splitter"` | Markdown splitter | `new MarkdownHeaderTextSplitter()` |
| **PythonCodeTextSplitter** | `import { PythonCodeTextSplitter } from "langchain/text_splitter"` | Python splitter | `new PythonCodeTextSplitter()` |
| **NLTKTextSplitter** | `import { NLTKTextSplitter } from "langchain/text_splitter"` | NLTK splitter | `new NLTKTextSplitter()` |

### 🎯 Document Loaders

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **TextLoader** | `import { TextLoader } from "langchain/document_loaders/fs/text"` | Text loader | `new TextLoader("path/to/file.txt")` |
| **CSVLoader** | `import { CSVLoader } from "langchain/document_loaders/fs/csv"` | CSV loader | `new CSVLoader("path/to/file.csv")` |
| **PDFLoader** | `import { PDFLoader } from "langchain/document_loaders/fs/pdf"` | PDF loader | `new PDFLoader("path/to/file.pdf")` |
| **DirectoryLoader** | `import { DirectoryLoader } from "langchain/document_loaders/fs/directory"` | Directory loader | `new DirectoryLoader("path/to/dir")` |
| **WebBaseLoader** | `import { WebBaseLoader } from "langchain/document_loaders/web/web_base"` | Web loader | `new WebBaseLoader("https://example.com")` |
| **YoutubeLoader** | `import { YoutubeLoader } from "langchain/document_loaders/web/youtube"` | YouTube loader | `new YoutubeLoader("video_id")` |
| **NotionLoader** | `import { NotionLoader } from "langchain/document_loaders/fs/notion"` | Notion loader | `new NotionLoader("path/to/notion")` |

### 🎯 Output Parsers

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **CommaSeparatedListOutputParser** | `StandardOutputParser } from "langchain/output_parsers"` | Comma-separated list parser | `new CommaSeparatedListOutputParser()` |
| **StructuredOutputParser** | `import { StructuredOutputParser } from "langchain/output_parsers"` | Structured parser | `StructuredOutputParser.fromZodSchema(schema)` |
| **PydanticOutputParser** | `import { PydanticOutputParser } from "langchain/output_parsers"` | Pydantic parser | `new PydanticOutputParser(pydanticObject)` |
| **RegexParser** | `import { RegexParser } from "langchain/output_parsers"` | Regex parser | `new RegexParser(pattern, outputKeys)` |
| **OutputFixingParser** | `import { OutputFixingParser } from "langchain/output_parsers"` | Fixing parser | `new OutputFixingParser(parser, llm)` |

### 🎯 Callbacks

| Type | Import | Description | Example |
|------|--------|-------------|---------|
| **BaseCallbackHandler** | `import { BaseCallbackHandler } from "langchain/callbacks"` | Base handler | `class CustomHandler extends BaseCallbackHandler` |
| **ConsoleCallbackHandler** | `import { ConsoleCallbackHandler } from "langchain/callbacks"` | Console handler | `new ConsoleCallbackHandler()` |
| **FileCallbackHandler** | `import { FileCallbackHandler } from "langchain/callbacks"` | File handler | `new FileCallbackHandler("path/to/file")` |
| **LangChainTracer** | `import { LangChainTracer } from "langchain/callbacks"` | LangChain tracer | `new LangChainTracer()` |
| **WandbCallbackHandler** | `import { WandbCallbackHandler } from "langchain/callbacks"` | Weights & Biases handler | `new WandbCallbackHandler()` |

---

## 🚀 Introduction

LangChain.js is a JavaScript/TypeScript library for building applications with language models. It provides abstractions and modular components to create sophisticated AI applications.

## 🎯 Installation and Configuration

### Installation

```bash
# Basic installation
npm install langchain

# Installation with specific providers
npm install @langchain/openai @langchain/anthropic @langchain/cohere

# Installation with vector stores
npm install @langchain/pinecone @langchain/weaviate @langchain/chroma

# Installation with tools
npm install @langchain/community
```

### Configuration

```typescript
// OpenAI configuration
import { ChatOpenAI } from "langchain/chat_models/openai"

const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4",
  temperature: 0.7,
  maxTokens: 1000,
})

// Anthropic configuration
import { ChatAnthropic } from "langchain/chat_models/anthropic"

const claude = new ChatAnthropic({
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  modelName: "claude-3-sonnet-20240229",
  temperature: 0.7,
})
```

## 🎯 Basic Usage

### Simple LLM

```typescript
import { OpenAI } from "langchain/llms/openai"

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
})

const response = await llm.call("What is the capital of France?")
console.log(response) // "The capital of France is Paris."
```

### Chat Model

```typescript
import { ChatOpenAI } from "langchain/chat_models/openai"
import { HumanMessage, SystemMessage } from "langchain/schema"

const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4",
})

const messages = [
  new SystemMessage("You are a helpful assistant."),
  new HumanMessage("What is the weather like today?")
]

const response = await chat.call(messages)
console.log(response.content)
```

### Prompt Templates

```typescript
import { PromptTemplate } from "langchain/prompts"

const prompt = PromptTemplate.fromTemplate(
  "What is a {adjective} way to describe a {noun}?"
)

const formattedPrompt = await prompt.format({
  adjective: "funny",
  noun: "cat"
})

console.log(formattedPrompt)
// "What is a funny way to describe a cat?"
```

### Chains

```typescript
import { LLMChain } from "langchain/chains"
import { PromptTemplate } from "langchain/prompts"
import { OpenAI } from "langchain/llms/openai"

const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY })
const prompt = PromptTemplate.fromTemplate("What is a {adjective} way to describe a {noun}?")
const chain = new LLMChain({ llm, prompt })

const result = await chain.call({
  adjective: "funny",
  noun: "cat"
})

console.log(result.text)
```

## 🎯 Agents and Tools

### Simple Agent

```typescript
import { initializeAgent } from "langchain/agents"
import { Tool } from "langchain/tools"
import { ChatOpenAI } from "langchain/chat_models/openai"

const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0
})

const tools = [
  new Tool({
    name: "calculator",
    description: "Useful for doing math",
    func: (input: string) => {
      try {
        return eval(input).toString()
      } catch (error) {
        return "Error: Invalid math expression"
      }
    }
  })
]

const agent = initializeAgent(tools, llm, "zero-shot-react-description")

const result = await agent.call({
  input: "What is 15 * 3?"
})

console.log(result.output)
```

### Agent with Memory

```typescript
import { initializeAgent } from "langchain/agents"
import { BufferMemory } from "langchain/memory"
import { ChatOpenAI } from "langchain/chat_models/openai"

const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0
})

const memory = new BufferMemory({
  memoryKey: "chat_history",
  returnMessages: true
})

const agent = initializeAgent(
  tools,
  llm,
  "conversational-react-description",
  { memory }
)

const result = await agent.call({
  input: "My name is John. What is my name?"
})

console.log(result.output)
```

## 🎯 RAG Systems

### Simple RAG

```typescript
import { RetrievalQAChain } from "langchain/chains"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { Chroma } from "langchain/vectorstores/chroma"
import { TextLoader } from "langchain/document_loaders/fs/text"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

// Load and split documents
const loader = new TextLoader("path/to/document.txt")
const documents = await loader.load()

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200
})

const texts = await textSplitter.splitDocuments(documents)

// Create embeddings and vector store
const embeddings = new OpenAIEmbeddings()
const vectorStore = await Chroma.fromDocuments(texts, embeddings)

// Create RAG chain
const llm = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY })
const retriever = vectorStore.asRetriever()
const chain = RetrievalQAChain.fromLLM(llm, retriever)

// Ask a question
const result = await chain.call({
  query: "What is the main topic of the document?"
})

console.log(result.text)
```

### RAG with Custom Prompt

```typescript
import { RetrievalQAChain } from "langchain/chains"
import { PromptTemplate } from "langchain/prompts"
import { ChatOpenAI } from "langchain/chat_models/openai"

const llm = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY })

const promptTemplate = new PromptTemplate({
  template: `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context:
{context}

Question: {question}
Answer:`,
  inputVariables: ["context", "question"]
})

const chain = RetrievalQAChain.fromLLM(llm, retriever, {
  prompt: promptTemplate
})

const result = await chain.call({
  query: "What is the main topic of the document?"
})
```

## 🎯 NestJS Integration

### LangChain Service

```typescript
// langchain.service.ts
import { Injectable } from '@nestjs/common'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { PromptTemplate } from 'langchain/prompts'
import { LLMChain } from 'langchain/chains'

@Injectable()
export class LangChainService {
  private llm: ChatOpenAI
  private prompt: PromptTemplate

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4',
      temperature: 0.7
    })

    this.prompt = PromptTemplate.fromTemplate(
      'You are a helpful assistant. Answer the following question: {question}'
    )
  }

  async generateResponse(question: string): Promise<string> {
    const chain = new LLMChain({
      llm: this.llm,
      prompt: this.prompt
    })

    const result = await chain.call({ question })
    return result.text
  }
}
```

### AI Controller

```typescript
// ai.controller.ts
import { Controller, Post, Body } from '@nestjs/common'
import { LangChainService } from './langchain.service'

@Controller('ai')
export class AIController {
  constructor(private readonly langChainService: LangChainService) {}

  @Post('chat')
  async chat(@Body() body: { message: string }) {
    const response = await this.langChainService.generateResponse(body.message)
    return { response }
  }
}
```

### AI Module

```typescript
// ai.module.ts
import { Module } from '@nestjs/common'
import { LangChainService } from './langchain.service'
import { AIController } from './ai.controller'

@Module({
  providers: [LangChainService],
  controllers: [AIController],
  exports: [LangChainService]
})
export class AIModule {}
```

## 🎯 Testing and Debugging

### Unit Tests

```typescript
// langchain.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing'
import { LangChainService } from './langchain.service'

describe('LangChainService', () => {
  let service: LangChainService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LangChainService]
    }).compile()

    service = module.get<LangChainService>(LangChainService)
  })

  it('should generate response', async () => {
    const question = 'What is the capital of France?'
    const response = await service.generateResponse(question)
    
    expect(response).toBeDefined()
    expect(typeof response).toBe('string')
  })
})
```

### Debugging with Callbacks

```typescript
import { ConsoleCallbackHandler } from 'langchain/callbacks'

const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  callbacks: [new ConsoleCallbackHandler()]
})

const response = await llm.call([
  new HumanMessage("What is the capital of France?")
])
```

## 🎯 Optimization and Performance

### Token Management

```typescript
import { TokenTextSplitter } from 'langchain/text_splitter'

const textSplitter = new TokenTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100
})

const texts = await textSplitter.splitDocuments(documents)
```

### Embedding Cache

```typescript
import { CacheBackedEmbeddings } from 'langchain/embeddings/cache_backed'
import { LocalFileStore } from 'langchain/storage/file_system'

const store = new LocalFileStore('./cache')
const embeddings = new CacheBackedEmbeddings(
  new OpenAIEmbeddings(),
  store
)
```

### Response Streaming

```typescript
import { ChatOpenAI } from 'langchain/chat_models/openai'

const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  streaming: true
})

const stream = await llm.stream([
  new HumanMessage("Tell me a story")
])

for await (const chunk of stream) {
  console.log(chunk.content)
}
```

## 📚 Resources

### Official Documentation
- [LangChain.js Documentation](https://js.langchain.com/)
- [LangChain Python Documentation](https://python.langchain.com/)
- [LangSmith Documentation](https://docs.smith.langchain.com/)

### Examples and Tutorials
- [LangChain Examples](https://github.com/langchain-ai/langchain/tree/master/examples)
- [LangChain Templates](https://github.com/langchain-ai/langchain/tree/master/templates)
- [LangChain Community](https://github.com/langchain-ai/langchain/tree/master/libs/community)

### Tools and Integrations
- [LangSmith](https://smith.langchain.com/) - Debugging and monitoring
- [LangGraph](https://github.com/langchain-ai/langgraph) - Graph-based workflows
- [LangServe](https://github.com/langchain-ai/langserve) - LangChain server

---

*Last updated: January 2024*
