# 🔗 LangChain.js - Guide Complet

## 📋 Tableaux de Référence Complète LangChain.js

### 🎯 Core Components

| Composant | Import | Description | Exemple |
|-----------|--------|-------------|---------|
| **LLM** | `import { OpenAI } from "langchain/llms/openai"` | Modèle de langage | `new OpenAI({ temperature: 0.7 })` |
| **ChatModel** | `import { ChatOpenAI } from "langchain/chat_models/openai"` | Modèle de chat | `new ChatOpenAI({ modelName: "gpt-4" })` |
| **PromptTemplate** | `import { PromptTemplate } from "langchain/prompts"` | Template de prompt | `PromptTemplate.fromTemplate("Hello {name}")` |
| **ChatPromptTemplate** | `import { ChatPromptTemplate } from "langchain/prompts"` | Template de chat | `ChatPromptTemplate.fromMessages([...])` |
| **Chain** | `import { LLMChain } from "langchain/chains"` | Chaîne de traitement | `new LLMChain({ llm, prompt })` |
| **Agent** | `import { initializeAgent } from "langchain/agents"` | Agent IA | `initializeAgent(tools, llm, agentType)` |
| **Tool** | `import { Tool } from "langchain/tools"` | Outil personnalisé | `new Tool({ name, description, func })` |
| **Memory** | `import { BufferMemory } from "langchain/memory"` | Mémoire conversationnelle | `new BufferMemory()` |
| **VectorStore** | `import { Chroma } from "langchain/vectorstores/chroma"` | Base vectorielle | `new Chroma(embeddings, config)` |
| **Retriever** | `import { VectorStoreRetriever } from "langchain/vectorstores/base"` | Récupérateur | `vectorStore.asRetriever()` |
| **Document** | `import { Document } from "langchain/document"` | Document | `new Document({ pageContent, metadata })` |
| **TextSplitter** | `import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"` | Découpeur de texte | `new RecursiveCharacterTextSplitter()` |
| **Embeddings** | `import { OpenAIEmbeddings } from "langchain/embeddings/openai"` | Embeddings | `new OpenAIEmbeddings()` |

### 🎯 LLM Providers

| Fournisseur | Modèle | Import | Configuration |
|-------------|--------|--------|---------------|
| **OpenAI** | GPT-4 | `import { ChatOpenAI } from "langchain/chat_models/openai"` | `{ modelName: "gpt-4", temperature: 0.7 }` |
| **OpenAI** | GPT-3.5-turbo | `import { ChatOpenAI } from "langchain/chat_models/openai"` | `{ modelName: "gpt-3.5-turbo", temperature: 0.7 }` |
| **OpenAI** | text-davinci-003 | `import { OpenAI } from "langchain/llms/openai"` | `{ modelName: "text-davinci-003", temperature: 0.7 }` |
| **Anthropic** | Claude-3 | `import { ChatAnthropic } from "langchain/chat_models/anthropic"` | `{ modelName: "claude-3-sonnet-20240229" }` |
| **Google** | PaLM-2 | `import { ChatGooglePaLM } from "langchain/chat_models/googlepalm"` | `{ modelName: "chat-bison-001" }` |
| **Hugging Face** | T5 | `import { HuggingFaceInference } from "langchain/llms/hf"` | `{ model: "google/flan-t5-large" }` |
| **Cohere** | Command | `import { Cohere } from "langchain/llms/cohere"` | `{ model: "command" }` |
| **Replicate** | LLaMA | `import { Replicate } from "langchain/llms/replicate"` | `{ model: "meta/llama-2-70b-chat" }` |

### 🎯 Prompt Templates

| Type | Import | Description | Exemple |
|------|--------|-------------|---------|
| **PromptTemplate** | `import { PromptTemplate } from "langchain/prompts"` | Template simple | `PromptTemplate.fromTemplate("Hello {name}")` |
| **ChatPromptTemplate** | `import { ChatPromptTemplate } from "langchain/prompts"` | Template de chat | `ChatPromptTemplate.fromMessages([...])` |
| **FewShotPromptTemplate** | `import { FewShotPromptTemplate } from "langchain/prompts"` | Template avec exemples | `FewShotPromptTemplate.fromExamples([...])` |
| **SystemMessagePromptTemplate** | `import { SystemMessagePromptTemplate } from "langchain/prompts"` | Message système | `SystemMessagePromptTemplate.fromTemplate("You are {role}")` |
| **HumanMessagePromptTemplate** | `import { HumanMessagePromptTemplate } from "langchain/prompts"` | Message humain | `HumanMessagePromptTemplate.fromTemplate("{input}")` |
| **AIMessagePromptTemplate** | `import { AIMessagePromptTemplate } from "langchain/prompts"` | Message IA | `AIMessagePromptTemplate.fromTemplate("{response}")` |

### 🎯 Chains

| Type | Import | Description | Exemple |
|------|--------|-------------|---------|
| **LLMChain** | `import { LLMChain } from "langchain/chains"` | Chaîne LLM simple | `new LLMChain({ llm, prompt })` |
| **ConversationChain** | `import { ConversationChain } from "langchain/chains"` | Chaîne conversationnelle | `new ConversationChain({ llm, memory })` |
| **RetrievalQAChain** | `import { RetrievalQAChain } from "langchain/chains"` | Chaîne Q&A avec récupération | `RetrievalQAChain.fromLLM(llm, retriever)` |
| **MapReduceChain** | `import { MapReduceChain } from "langchain/chains"` | Chaîne map-reduce | `MapReduceChain.fromLLM(llm, mapPrompt, reducePrompt)` |
| **StuffDocumentsChain** | `import { StuffDocumentsChain } from "langchain/chains"` | Chaîne de documents | `StuffDocumentsChain.fromLLM(llm, documentPrompt)` |
| **RefineDocumentsChain** | `import { RefineDocumentsChain } from "langchain/chains"` | Chaîne de raffinement | `RefineDocumentsChain.fromLLM(llm, questionPrompt, refinePrompt)` |

### 🎯 Agents

| Type | Import | Description | Exemple |
|------|--------|-------------|---------|
| **ReAct Agent** | `import { initializeAgent } from "langchain/agents"` | Agent Reasoning + Acting | `initializeAgent(tools, llm, "react-docstore")` |
| **Conversational Agent** | `import { initializeAgent } from "langchain/agents"` | Agent conversationnel | `initializeAgent(tools, llm, "conversational-react-description")` |
| **Self Ask With Search** | `import { initializeAgent } from "langchain/agents"` | Agent auto-questionnement | `initializeAgent(tools, llm, "self-ask-with-search")` |
| **Chat Agent** | `import { initializeAgent } from "langchain/agents"` | Agent de chat | `initializeAgent(tools, llm, "chat-zero-shot-react-description")` |
| **Plan and Execute** | `import { initializeAgent } from "langchain/agents"` | Agent planification | `initializeAgent(tools, llm, "plan-and-execute")` |

### 🎯 Tools

| Outil | Import | Description | Exemple |
|-------|--------|-------------|---------|
| **Calculator** | `import { Calculator } from "langchain/tools"` | Calculatrice | `new Calculator()` |
| **Web Search** | `import { SerpAPI } from "langchain/tools"` | Recherche web | `new SerpAPI()` |
| **Wikipedia** | `import { WikipediaQueryRun } from "langchain/tools"` | Wikipedia | `new WikipediaQueryRun()` |
| **DuckDuckGo** | `import { DuckDuckGoSearch } from "langchain/tools"` | Recherche DuckDuckGo | `new DuckDuckGoSearch()` |
| **Code Execution** | `import { PythonREPLTool } from "langchain/tools"` | Exécution Python | `new PythonREPLTool()` |
| **File System** | `import { ReadFileTool } from "langchain/tools"` | Lecture de fichiers | `new ReadFileTool()` |
| **Custom Tool** | `import { Tool } from "langchain/tools"` | Outil personnalisé | `new Tool({ name, description, func })` |

### 🎯 Memory Types

| Type | Import | Description | Exemple |
|------|--------|-------------|---------|
| **BufferMemory** | `import { BufferMemory } from "langchain/memory"` | Mémoire tampon | `new BufferMemory()` |
| **ConversationBufferMemory** | `import { ConversationBufferMemory } from "langchain/memory"` | Mémoire conversationnelle | `new ConversationBufferMemory()` |
| **ConversationSummaryMemory** | `import { ConversationSummaryMemory } from "langchain/memory"` | Mémoire avec résumé | `new ConversationSummaryMemory({ llm })` |
| **ConversationTokenBufferMemory** | `import { ConversationTokenBufferMemory } from "langchain/memory"` | Mémoire avec limite de tokens | `new ConversationTokenBufferMemory({ llm, maxTokenLimit: 2000 })` |
| **VectorStoreRetrieverMemory** | `import { VectorStoreRetrieverMemory } from "langchain/memory"` | Mémoire vectorielle | `new VectorStoreRetrieverMemory({ retriever })` |
| **EntityMemory** | `import { EntityMemory } from "langchain/memory"` | Mémoire d'entités | `new EntityMemory({ llm })` |

### 🎯 Vector Stores

| Type | Import | Description | Exemple |
|------|--------|-------------|---------|
| **Chroma** | `import { Chroma } from "langchain/vectorstores/chroma"` | Base vectorielle Chroma | `new Chroma(embeddings, config)` |
| **Pinecone** | `import { PineconeStore } from "langchain/vectorstores/pinecone"` | Base vectorielle Pinecone | `PineconeStore.fromExistingIndex(index, embeddings)` |
| **Weaviate** | `import { WeaviateStore } from "langchain/vectorstores/weaviate"` | Base vectorielle Weaviate | `new WeaviateStore(embeddings, config)` |
| **FAISS** | `import { FAISS } from "langchain/vectorstores/faiss"` | Base vectorielle FAISS | `new FAISS(embeddings, config)` |
| **HnswLib** | `import { HnswLib } from "langchain/vectorstores/hnswlib"` | Base vectorielle HnswLib | `new HnswLib(embeddings, config)` |
| **Qdrant** | `import { QdrantVectorStore } from "langchain/vectorstores/qdrant"` | Base vectorielle Qdrant | `new QdrantVectorStore(embeddings, config)` |

### 🎯 Embeddings

| Type | Import | Description | Exemple |
|------|--------|-------------|---------|
| **OpenAI** | `import { OpenAIEmbeddings } from "langchain/embeddings/openai"` | Embeddings OpenAI | `new OpenAIEmbeddings()` |
| **Cohere** | `import { CohereEmbeddings } from "langchain/embeddings/cohere"` | Embeddings Cohere | `new CohereEmbeddings()` |
| **Hugging Face** | `import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf"` | Embeddings Hugging Face | `new HuggingFaceInferenceEmbeddings()` |
| **Google** | `import { GooglePaLMEmbeddings } from "langchain/embeddings/googlepalm"` | Embeddings Google PaLM | `new GooglePaLMEmbeddings()` |
| **Local** | `import { LocalEmbeddings } from "langchain/embeddings/local"` | Embeddings locaux | `new LocalEmbeddings()` |

### 🎯 Text Splitters

| Type | Import | Description | Exemple |
|------|--------|-------------|---------|
| **RecursiveCharacterTextSplitter** | `import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"` | Découpeur récursif | `new RecursiveCharacterTextSplitter()` |
| **CharacterTextSplitter** | `import { CharacterTextSplitter } from "langchain/text_splitter"` | Découpeur par caractère | `new CharacterTextSplitter()` |
| **TokenTextSplitter** | `import { TokenTextSplitter } from "langchain/text_splitter"` | Découpeur par tokens | `new TokenTextSplitter()` |
| **MarkdownHeaderTextSplitter** | `import { MarkdownHeaderTextSplitter } from "langchain/text_splitter"` | Découpeur Markdown | `new MarkdownHeaderTextSplitter()` |
| **PythonCodeTextSplitter** | `import { PythonCodeTextSplitter } from "langchain/text_splitter"` | Découpeur Python | `new PythonCodeTextSplitter()` |
| **NLTKTextSplitter** | `import { NLTKTextSplitter } from "langchain/text_splitter"` | Découpeur NLTK | `new NLTKTextSplitter()` |

### 🎯 Document Loaders

| Type | Import | Description | Exemple |
|------|--------|-------------|---------|
| **TextLoader** | `import { TextLoader } from "langchain/document_loaders/fs/text"` | Chargeur de texte | `new TextLoader("path/to/file.txt")` |
| **CSVLoader** | `import { CSVLoader } from "langchain/document_loaders/fs/csv"` | Chargeur CSV | `new CSVLoader("path/to/file.csv")` |
| **PDFLoader** | `import { PDFLoader } from "langchain/document_loaders/fs/pdf"` | Chargeur PDF | `new PDFLoader("path/to/file.pdf")` |
| **DirectoryLoader** | `import { DirectoryLoader } from "langchain/document_loaders/fs/directory"` | Chargeur de répertoire | `new DirectoryLoader("path/to/dir")` |
| **WebBaseLoader** | `import { WebBaseLoader } from "langchain/document_loaders/web/web_base"` | Chargeur web | `new WebBaseLoader("https://example.com")` |
| **YoutubeLoader** | `import { YoutubeLoader } from "langchain/document_loaders/web/youtube"` | Chargeur YouTube | `new YoutubeLoader("video_id")` |
| **NotionLoader** | `import { NotionLoader } from "langchain/document_loaders/fs/notion"` | Chargeur Notion | `new NotionLoader("path/to/notion")` |

### 🎯 Output Parsers

| Type | Import | Description | Exemple |
|------|--------|-------------|---------|
| **CommaSeparatedListOutputParser** | `import { CommaSeparatedListOutputParser } from "langchain/output_parsers"` | Parser liste séparée par virgules | `new CommaSeparatedListOutputParser()` |
| **StructuredOutputParser** | `import { StructuredOutputParser } from "langchain/output_parsers"` | Parser structuré | `StructuredOutputParser.fromZodSchema(schema)` |
| **PydanticOutputParser** | `import { PydanticOutputParser } from "langchain/output_parsers"` | Parser Pydantic | `new PydanticOutputParser(pydanticObject)` |
| **RegexParser** | `import { RegexParser } from "langchain/output_parsers"` | Parser regex | `new RegexParser(pattern, outputKeys)` |
| **OutputFixingParser** | `import { OutputFixingParser } from "langchain/output_parsers"` | Parser de correction | `new OutputFixingParser(parser, llm)` |

### 🎯 Callbacks

| Type | Import | Description | Exemple |
|------|--------|-------------|---------|
| **BaseCallbackHandler** | `import { BaseCallbackHandler } from "langchain/callbacks"` | Handler de base | `class CustomHandler extends BaseCallbackHandler` |
| **ConsoleCallbackHandler** | `import { ConsoleCallbackHandler } from "langchain/callbacks"` | Handler console | `new ConsoleCallbackHandler()` |
| **FileCallbackHandler** | `import { FileCallbackHandler } from "langchain/callbacks"` | Handler fichier | `new FileCallbackHandler("path/to/file")` |
| **LangChainTracer** | `import { LangChainTracer } from "langchain/callbacks"` | Tracer LangChain | `new LangChainTracer()` |
| **WandbCallbackHandler** | `import { WandbCallbackHandler } from "langchain/callbacks"` | Handler Weights & Biases | `new WandbCallbackHandler()` |

---

## 🚀 Introduction

LangChain.js est une bibliothèque JavaScript/TypeScript pour construire des applications avec des modèles de langage. Elle fournit des abstractions et des composants modulaires pour créer des applications IA sophistiquées.

## 🎯 Installation et Configuration

### Installation

```bash
# Installation de base
npm install langchain

# Installation avec des providers spécifiques
npm install @langchain/openai @langchain/anthropic @langchain/cohere

# Installation avec des vector stores
npm install @langchain/pinecone @langchain/weaviate @langchain/chroma

# Installation avec des outils
npm install @langchain/community
```

### Configuration

```typescript
// Configuration OpenAI
import { ChatOpenAI } from "langchain/chat_models/openai"

const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4",
  temperature: 0.7,
  maxTokens: 1000,
})

// Configuration Anthropic
import { ChatAnthropic } from "langchain/chat_models/anthropic"

const claude = new ChatAnthropic({
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  modelName: "claude-3-sonnet-20240229",
  temperature: 0.7,
})
```

## 🎯 Utilisation de Base

### LLM Simple

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

## 🎯 Agents et Outils

### Agent Simple

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

### Agent avec Mémoire

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

## 🎯 Systèmes RAG

### RAG Simple

```typescript
import { RetrievalQAChain } from "langchain/chains"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { Chroma } from "langchain/vectorstores/chroma"
import { TextLoader } from "langchain/document_loaders/fs/text"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

// Charger et diviser les documents
const loader = new TextLoader("path/to/document.txt")
const documents = await loader.load()

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200
})

const texts = await textSplitter.splitDocuments(documents)

// Créer les embeddings et la base vectorielle
const embeddings = new OpenAIEmbeddings()
const vectorStore = await Chroma.fromDocuments(texts, embeddings)

// Créer la chaîne RAG
const llm = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY })
const retriever = vectorStore.asRetriever()
const chain = RetrievalQAChain.fromLLM(llm, retriever)

// Poser une question
const result = await chain.call({
  query: "What is the main topic of the document?"
})

console.log(result.text)
```

### RAG avec Prompt Personnalisé

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

## 🎯 Intégration avec NestJS

### Service LangChain

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

### Contrôleur IA

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

### Module IA

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

## 🎯 Tests et Débogage

### Tests Unitaires

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

### Débogage avec Callbacks

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

## 🎯 Optimisation et Performance

### Gestion des Tokens

```typescript
import { TokenTextSplitter } from 'langchain/text_splitter'

const textSplitter = new TokenTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100
})

const texts = await textSplitter.splitDocuments(documents)
```

### Cache des Embeddings

```typescript
import { CacheBackedEmbeddings } from 'langchain/embeddings/cache_backed'
import { LocalFileStore } from 'langchain/storage/file_system'

const store = new LocalFileStore('./cache')
const embeddings = new CacheBackedEmbeddings(
  new OpenAIEmbeddings(),
  store
)
```

### Streaming des Réponses

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

## 📚 Ressources

### Documentation officielle
- [LangChain.js Documentation](https://js.langchain.com/)
- [LangChain Python Documentation](https://python.langchain.com/)
- [LangSmith Documentation](https://docs.smith.langchain.com/)

### Exemples et tutoriels
- [LangChain Examples](https://github.com/langchain-ai/langchain/tree/master/examples)
- [LangChain Templates](https://github.com/langchain-ai/langchain/tree/master/templates)
- [LangChain Community](https://github.com/langchain-ai/langchain/tree/master/libs/community)

### Outils et intégrations
- [LangSmith](https://smith.langchain.com/) - Debugging et monitoring
- [LangGraph](https://github.com/langchain-ai/langgraph) - Graph-based workflows
- [LangServe](https://github.com/langchain-ai/langserve) - Serveur LangChain

---

*Dernière mise à jour : Janvier 2024*
