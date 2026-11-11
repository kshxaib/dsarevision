import { Cpu, Shield, Zap, Database } from 'lucide-react';

export const phase6Engineering = {
  title: "Phase 6: Real-World Engineering Knowledge",
  description: "Production scalability, security boundaries, asynchronous I/O, and transactional ACID guarantees.",

  domains: [
    {
      id: "dom-scale",
      name: "Scalability & High-Throughput Indexing",
      badge: "Production Distributed Systems",
      icon: Cpu,
      topics: [
        {
          title: "AST-Aware Chunking & Batch Vector Ingestion",
          concept: "Preserving syntactic boundaries while indexing multi-hundred-thousand line repositories without hitting OpenAI rate limits.",
          codeLensAnalysis: "Naively splitting code every 1,000 characters breaks function definitions and loses class context. CodeLens uses Tree-Sitter to chunk code at AST statement boundaries, attaching parent scope breadcrumbs (e.g. `class AuthService -> def validate_token`). Embeddings are created in concurrent batches of 32 vectors, maximizing OpenAI throughput.",
          productionDesign: "1. Tree-Sitter AST traversal cuts code into semantically coherent 300–800 token units.\n2. Ingestion batches 32 chunks per API call to OpenAI 'text-embedding-3-small'.\n3. Qdrant upserts vectors with payload indexing on 'repository_id' and 'file_path'.",
          keyMetrics: "100k LoC parsed and indexed in <30 seconds; 0% broken function signatures."
        },
        {
          title: "Hierarchical Graph Rendering & Virtualized Canvas (60 FPS)",
          concept: "Preventing DOM thrashing and layout lag when visualizing large software architectures with 500+ nodes and 1,000+ dependency edges.",
          codeLensAnalysis: "Standard DOM graph visualizers crash when rendering hundreds of nodes simultaneously. CodeLens uses `@xyflow/react` (ReactFlow v12) with viewport culling (only rendering nodes in active viewport) and offloads Dagre hierarchical coordinates calculation to pre-render layout stages.",
          productionDesign: "1. Dagre calculates coordinates (x, y) across 4 architectural tiers.\n2. ReactFlow viewport culling unmounts off-screen DOM nodes.\n3. Bidirectional edge routing eliminates visual edge overlapping.",
          keyMetrics: "60 FPS smooth pan and zoom across 500+ interconnected nodes; sub-30ms layout computation."
        }
      ]
    },
    {
      id: "dom-sec",
      name: "Security Boundaries & BYOK Cryptography",
      badge: "Zero-Trust Data Protection",
      icon: Shield,
      topics: [
        {
          title: "Bring-Your-Own-Key (BYOK) Encryption at Rest",
          concept: "Guaranteeing that proprietary developer API keys cannot be leaked even in the event of an unauthorized database read replica dump.",
          codeLensAnalysis: "CodeLens implements symmetric Fernet encryption (`cryptography.fernet.Fernet`), utilizing AES-128 in CBC mode with PKCS7 padding and HMAC-SHA256 authentication. Plaintext keys are decrypted strictly in ephemeral request memory when invoking LangChain/OpenAI and are never persisted in logs.",
          productionDesign: "1. Plaintext API key encrypted via Fernet before writing to 'users.openai_api_key'.\n2. Key decrypted exclusively in-memory inside 'app.rag.service.stream_chat_response'.\n3. Masked string (e.g. 'sk-proj...x9A4') returned to client UI for confirmation.",
          keyMetrics: "AES-128-CBC encryption at rest; 0 plaintext keys stored in PostgreSQL or application logs."
        },
        {
          title: "Tenant Vector Isolation & Cross-Repo Leak Prevention",
          concept: "Enforcing multi-tenant security within a shared vector database collection.",
          codeLensAnalysis: "In multi-repository platforms, naive vector similarity search risks returning code snippets from private repositories belonging to other organizations. CodeLens enforces mandatory Qdrant payload filters: every similarity search includes `{ key: 'repository_id', match: { value: repo_id } }`.",
          productionDesign: "1. Every vector payload contains indexed 'repository_id' integer field.\n2. All Qdrant search queries inject strict boolean filter clause.\n3. Vector store guarantees zero cross-tenant code chunk leakage.",
          keyMetrics: "100% tenant isolation across thousands of repositories in a single Qdrant collection."
        }
      ]
    },
    {
      id: "dom-async",
      name: "Asynchronous I/O & Real-Time Event Streaming",
      badge: "High-Concurrency Async",
      icon: Zap,
      topics: [
        {
          title: "Server-Sent Events (SSE) for Real-Time Token Streaming",
          concept: "Streaming large LLM responses with sub-100ms first-token latency without the overhead of full-duplex WebSockets.",
          codeLensAnalysis: "CodeLens uses standard HTTP Server-Sent Events (SSE) via FastAPI's `StreamingResponse`. The server streams JSON-formatted event packets: initial retrieval status (`event: status`), individual text tokens (`event: token`), and completion payloads containing verified line citations (`event: complete`).",
          productionDesign: "1. Client opens unidirectional HTTP stream to '/api/v1/chats/{id}/messages'.\n2. FastAPI yields asynchronous generator yielding SSE frames.\n3. React EventSource listener parses tokens and renders live markdown without UI stutter.",
          keyMetrics: "Sub-120ms time-to-first-token; zero stateful WebSocket reconnection overhead."
        },
        {
          title: "Non-Blocking Background Ingestion & Progress Tracking",
          concept: "Executing long-running git clone and AST parsing jobs without freezing FastAPI's asynchronous event loop.",
          codeLensAnalysis: "Cloning a multi-megabyte git repository and building ASTs is CPU and network intensive. Running this on the main thread would block incoming REST requests. CodeLens offloads indexing to background workers (`BackgroundTasks` / thread pools), updating the database `index_status` ('not_indexed', 'indexing', 'indexed', 'failed').",
          productionDesign: "1. POST '/api/v1/repositories' immediately returns 202 Accepted.\n2. Indexer runs in background thread, updating file count and symbol count.\n3. Frontend polls or receives WebSocket/SSE updates until indexing reaches 100%.",
          keyMetrics: "FastAPI main event loop latency remains under 5ms during 50MB repo indexing."
        }
      ]
    },
    {
      id: "dom-db",
      name: "Transactional Persistence & Relational Integrity",
      badge: "ACID Relational Architecture",
      icon: Database,
      topics: [
        {
          title: "Foreign Key Cascades & Clean Relational Deletions",
          concept: "Preventing orphaned files, chat messages, and graph caches when a user deletes a repository.",
          codeLensAnalysis: "The PostgreSQL database uses SQLAlchemy 2.0 models with explicit `ForeignKey('repositories.id', ondelete='CASCADE')` across `files`, `conversations`, `messages`, `repository_access`, and `architecture_graphs`. Deleting a repository atomically purges all child records in a single database transaction.",
          productionDesign: "1. Cascading deletes configured on all 5 child tables.\n2. Deleting a Repository atomically executes single atomic PostgreSQL transaction.\n3. Vector store cleanup routine purges corresponding Qdrant vectors by 'repository_id'.",
          keyMetrics: "Zero orphaned database records; 100% transactional consistency on deletion."
        },
        {
          title: "Preventing N+1 Queries in File Tree & Graph Fetching",
          concept: "Loading nested file trees and architecture metadata without executing dozens of round-trip SQL queries.",
          codeLensAnalysis: "Querying a repository and iterating its files or conversations naively issues 1 query for the repository plus N queries for each child table. CodeLens uses SQLAlchemy's `joinedload` and `selectinload` to fetch the repository and all nested child records in a single optimized SQL JOIN query.",
          productionDesign: "1. Eager loading via 'selectinload(Repository.files)' and 'joinedload(Conversation.messages)'.\n2. B-tree indexes placed on all foreign keys ('user_id', 'repository_id', 'conversation_id').\n3. Pre-computed graph structures cached in PostgreSQL 'JSON' columns.",
          keyMetrics: "Database query time reduced from 280ms (N+1 queries) to 7ms (1 SQL JOIN query)."
        }
      ]
    }
  ]
};

