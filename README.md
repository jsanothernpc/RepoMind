# RepoMind 🧠

### AI-Powered GitHub Repository Knowledge Assistant

RepoMind is an AI-powered developer assistant that allows users to connect a GitHub repository and interact with its codebase using natural language.

Instead of manually searching through files and understanding a large codebase, users can ask questions such as:

* "How does authentication work in this project?"
* "Where is the payment logic implemented?"
* "Explain the flow of user registration."
* "Which class handles GitHub API communication?"
* "What does this service do?"

RepoMind uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant code from the repository and provide context-aware answers using an LLM.

---
---

## 🎥 Demo

[![RepoMind Demo](https://img.youtube.com/vi/CwqJrELJcfQ/maxresdefault.jpg)](https://youtu.be/CwqJrELJcfQ)

▶️ **[Watch the RepoMind Demo on YouTube](https://youtu.be/CwqJrELJcfQ)**

See RepoMind in action — GitHub authentication, repository connection,
code indexing, RAG-based code search, AI chat, and source citations.


## ✨ Features

### 🔐 GitHub OAuth2 Authentication

* Login using GitHub OAuth2.
* Secure user authentication through Spring Security.
* Maintains the authenticated user's context throughout the application.

### 📂 GitHub Repository Integration

* Connect GitHub repositories to RepoMind.
* Fetch repository information and source files through the GitHub API.
* Handles GitHub API communication through a dedicated service layer.
* Includes rate-limiting support for GitHub API requests.

### 🔎 Repository Indexing

When a repository is indexed:

1. RepoMind retrieves repository files from GitHub.
2. Filters files that are relevant for code analysis.
3. Splits source code into smaller chunks.
4. Generates vector embeddings for the chunks.
5. Stores the vectors in PostgreSQL using **PGVector**.

This creates a searchable semantic representation of the repository.

### 🤖 RAG-Based AI Chat

When a user asks a question:

```text
User Question
      ↓
Retrieve relevant code chunks
      ↓
Build AI prompt with repository context
      ↓
Send context + question to LLM
      ↓
Generate answer
      ↓
Return response with citations
```

The model answers using the retrieved repository context instead of relying only on its general training knowledge.

### 📚 Code Citations

AI responses can include citations pointing back to the relevant repository files and code context.

This makes the generated answers easier to verify and helps reduce unsupported answers.

### 💬 Persistent Chat Sessions

RepoMind supports chat sessions and stores conversation messages so users can continue their repository-related discussions.

### ⚡ Streaming AI Responses

AI responses are streamed to the client rather than waiting for the complete response before displaying anything.

This provides a more interactive chat experience.

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      Next.js UI       │
                         │      React Client     │
                         └──────────┬───────────┘
                                    │
                                    │ HTTP / Streaming
                                    ▼
                         ┌──────────────────────┐
                         │   Spring Boot API    │
                         │      Backend         │
                         └──────────┬───────────┘
                                    │
               ┌────────────────────┼────────────────────┐
               │                    │                    │
               ▼                    ▼                    ▼
       ┌──────────────┐     ┌──────────────┐    ┌──────────────┐
       │   GitHub     │     │ PostgreSQL   │    │  Spring AI   │
       │     API      │     │  + PGVector  │    │   + OpenAI   │
       └──────────────┘     └──────────────┘    └──────────────┘
                                    ▲
                                    │
                                    │ Vector Search
                                    │
                             ┌──────┴───────┐
                             │      RAG     │
                             │ Retrieval    │
                             └──────────────┘
```

---

# 🔄 RAG Pipeline

RepoMind follows a two-stage RAG architecture.

## 1. Indexing Phase

```text
GitHub Repository
        ↓
Fetch Repository Files
        ↓
Filter Relevant Code Files
        ↓
Split Code into Chunks
        ↓
Generate Embeddings
        ↓
Store Embeddings
        ↓
PostgreSQL + PGVector
```

The repository is converted from raw source code into searchable vector representations.

---

## 2. Question Answering Phase

```text
User Question
      ↓
Generate Query Embedding
      ↓
Similarity Search
      ↓
Retrieve Relevant Code Chunks
      ↓
Build Prompt
      ↓
LLM
      ↓
Generated Answer
      ↓
Citations
```

This allows the AI to answer questions based on the actual repository contents.

---

# 🛠️ Tech Stack

## Backend

* Java
* Spring Boot
* Spring MVC
* Spring Data JPA
* Spring Security
* OAuth2
* Spring AI
* OpenAI
* PostgreSQL
* PGVector
* Maven
* Lombok

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack React Query

## Infrastructure

* Docker
* Docker Compose
* PostgreSQL
* PGVector

The backend currently uses Spring Boot `4.1.1`, Java `25`, and Spring AI `2.0.1`.

---

# 📁 Project Structure

```text
RepoMind/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   └── java/
│   │   │       └── repoMind/
│   │   │           └── backend/
│   │   │
│   │   ├── controllers/
│   │   │   ├── AuthController.java
│   │   │   ├── ChatController.java
│   │   │   └── RepoController.java
│   │   │
│   │   ├── services/
│   │   │   ├── ChatService.java
│   │   │   ├── RepoService.java
│   │   │   ├── UserService.java
│   │   │   │
│   │   │   ├── ai/
│   │   │   │   ├── ChatPromptBuilder.java
│   │   │   │   ├── ChatStreamHandler.java
│   │   │   │   ├── CitationMapper.java
│   │   │   │   ├── CodeContextRetriever.java
│   │   │   │   └── RagSettings.java
│   │   │   │
│   │   │   ├── github/
│   │   │   │   ├── GithubApiClient.java
│   │   │   │   └── GitHubRateLimiter.java
│   │   │   │
│   │   │   └── indexing/
│   │   │       ├── CodeChunker.java
│   │   │       ├── CodeFileFilter.java
│   │   │       └── IndexingService.java
│   │   │
│   │   ├── security/
│   │   ├── repository/
│   │   ├── entity/
│   │   ├── dto/
│   │   ├── config/
│   │   └── exceptions/
│   │
│   └── pom.xml
│
├── client/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── package.json
│
├── docker/
│   └── postgres/
│       └── init-extensions.sql
│
├── docker-compose.yml
└── README.md
```

The repository separates the frontend and backend into `client` and `backend`, with Docker configuration for PostgreSQL/PGVector.

---

# 🔑 Core Backend Components

### Controllers

The application exposes REST endpoints through:

* `AuthController`
* `ChatController`
* `RepoController`

Controllers handle HTTP requests and delegate business logic to services.

### Services

Important services include:

* `ChatService` — manages chat functionality.
* `RepoService` — manages connected repositories.
* `UserService` — handles user-related operations.
* `IndexingService` — processes repositories for vector search.
* `GithubApiClient` — communicates with GitHub.
* `CodeContextRetriever` — retrieves relevant code for RAG.
* `ChatPromptBuilder` — constructs prompts using retrieved context.
* `ChatStreamHandler` — handles streamed AI responses.
* `CitationMapper` — converts retrieved context into response citations.

---

# 🔐 Authentication Flow

RepoMind uses GitHub OAuth2 authentication.

```text
User
 ↓
Login with GitHub
 ↓
GitHub OAuth2
 ↓
Spring Security
 ↓
GitHub OAuth2 User Service
 ↓
Application User
 ↓
Authenticated Session
```

Spring Security handles the OAuth2 authentication flow while `GithubOAuth2UserService` maps GitHub user information into the application's user model.

---

# 🧩 Repository Indexing

The indexing subsystem consists of three important components:

### `CodeFileFilter`

Determines which repository files should be processed.

This prevents irrelevant files from unnecessarily entering the indexing pipeline.

### `CodeChunker`

Splits source files into smaller pieces.

Chunking is important because an entire repository or source file is usually too large to send directly to an LLM.

### `IndexingService`

Coordinates the complete indexing process:

```text
Repository
    ↓
Fetch files
    ↓
Filter files
    ↓
Chunk source code
    ↓
Create embeddings
    ↓
Store vectors
```

---

# 🧠 Retrieval-Augmented Generation

RepoMind uses RAG to connect the LLM with the user's actual repository.

Without RAG:

```text
Question → LLM → Generic Answer
```

With RAG:

```text
Question
   ↓
Vector Search
   ↓
Relevant Repository Code
   ↓
LLM + Retrieved Context
   ↓
Repository-Specific Answer
```

This is particularly useful for understanding private, newly created, or unfamiliar codebases.

---

# 🗄️ Data Storage

RepoMind uses PostgreSQL for application data and PGVector for vector similarity search.

The Docker Compose configuration provides a PostgreSQL instance using the PGVector image.

The application stores information such as:

* Users
* Connected repositories
* Chat sessions
* Chat messages
* Indexing status

Vector representations of code are stored in PostgreSQL using PGVector.

---

# 🐳 Running PostgreSQL with Docker

From the project root:

```bash
docker compose up -d
```

The PostgreSQL container is configured for:

```text
Database: devpilot
Username: postgres
Password: postgres
Port: 5433
```

The Docker setup uses the `pgvector/pgvector:pg16` image.

---

# ⚙️ Environment Variables

Create the required environment configuration for the backend.

Typical configuration includes:

```env
OPENAI_API_KEY=your_openai_api_key

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

DB_HOST=localhost
DB_PORT=5433
DB_NAME=devpilot
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

> Do not commit API keys, OAuth secrets, database passwords, or other credentials to GitHub.

---

# ▶️ Running the Backend

Navigate to the backend:

```bash
cd backend
```

Run using Maven:

```bash
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

---

# ▶️ Running the Frontend

Navigate to the client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend is built with Next.js and React.

---

# 🔄 Complete Application Flow

A typical RepoMind workflow looks like this:

```text
                USER
                  │
                  ▼
        ┌─────────────────┐
        │  GitHub Login   │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Connect GitHub  │
        │   Repository    │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Repository      │
        │ Indexing        │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Code Filtering  │
        │ + Chunking      │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │   Embeddings    │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ PostgreSQL +    │
        │    PGVector     │
        └────────┬────────┘
                 │
                 │
       User asks a question
                 │
                 ▼
        ┌─────────────────┐
        │ Query Retrieval │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Relevant Code   │
        │    Context      │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Prompt Builder  │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │       LLM       │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ AI Answer +     │
        │   Citations     │
        └─────────────────┘
```

---

# 🎯 Why RepoMind?

Large repositories can contain hundreds or thousands of files, making it difficult for developers to quickly understand an unfamiliar codebase.

RepoMind combines:

* GitHub API integration
* Semantic search
* Vector embeddings
* RAG
* LLMs
* Code chunking
* Repository-aware prompting
* AI response streaming
* Source citations

to create a conversational interface for exploring software repositories.

---

# 🚀 Future Improvements

Potential improvements include:

* Support for additional Git hosting platforms
* Incremental repository indexing
* Automatic re-indexing when a repository changes
* Improved code-aware chunking
* More advanced retrieval strategies
* Hybrid keyword + vector search
* Repository architecture visualization
* Pull-request analysis
* Code-change explanations
* Multi-repository conversations
* Improved citation and source navigation
* Background indexing jobs

---

# 📚 Key Concepts Demonstrated

This project demonstrates practical implementation of:

### Backend

* REST APIs
* Spring Boot
* Spring Security
* OAuth2
* JPA
* Layered architecture
* DTOs
* Exception handling
* External API integration

### Generative AI

* LLM integration
* Spring AI
* Prompt engineering
* Embeddings
* Vector databases
* RAG
* Semantic search
* Context retrieval
* Streaming responses
* AI citations

### Infrastructure

* Docker
* Docker Compose
* PostgreSQL
* PGVector

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Server/client communication
* Streaming AI responses

---

# 👨‍💻 Project

**RepoMind — AI-Powered GitHub Repository Knowledge Assistant**

Built using **Spring Boot + Spring AI + RAG + PostgreSQL/PGVector + Next.js**.

[GitHub Repository](https://github.com/jsanothernpc/RepoMind)
