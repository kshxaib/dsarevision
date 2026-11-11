export const phase2Understanding = {
  title: "Phase 2: Project Understanding & Architectural Foundations",
  description: "Macro-architectural vision, data lifecycle flows, component decoupling, and core engineering trade-offs.",

  macroArchitecture: {
    pattern: "Decoupled 4-Tier Distributed System with Asynchronous Ingestion & Event-Driven Streaming",
    summary: "CodeLens separates concerns across a modern React 19 interactive canvas, an asynchronous FastAPI service layer, a dual-persistence engine (PostgreSQL 16 for metadata & Qdrant for vector embeddings), and an isolated AST parsing engine powered by Tree-Sitter.",
    tiers: [
      {
        tier: "Client Presentation Tier",
        technologies: "React 19 + TypeScript + @xyflow/react + TailwindCSS + Zustand",
        responsibility: "Renders 60fps interactive architectural graphs, sequence message timelines, real-time SSE token streaming, and dynamic file inspectors."
      },
      {
        tier: "Asynchronous Service Tier",
        technologies: "FastAPI + Uvicorn + Pydantic v2 + Python-JOSE",
        responsibility: "Exposes RESTful endpoints, handles GitHub OAuth token handshakes, coordinates background indexing tasks, and streams OpenAI responses via SSE."
      },
      {
        tier: "AST Extraction & Graph Engine",
        technologies: "Tree-Sitter 0.22+ (Python, TS, JS, Go, Java) + NetworkX / Tarjan Algorithmic Traversal",
        responsibility: "Parses source code into Concrete Syntax Trees, extracts symbol hierarchies, classifies architectural entities, detects cyclic dependencies, and traces call sequences."
      },
      {
        tier: "Dual Persistence & Cryptographic Tier",
        technologies: "PostgreSQL 16 (SQLAlchemy 2.0) + Qdrant Vector DB + Fernet AES-128-CBC",
        responsibility: "Stores relational account entities and cached graph JSON in PostgreSQL; stores 1536-dimensional code vectors with repository payload isolation in Qdrant; secures user keys with Fernet."
      }
    ]
  },

  layers: [
    {
      name: "Frontend Interactive Canvas Layer",
      path: "frontend/src/components/architecture/",
      decouplingReason: "The ReactFlow v12 canvas is decoupled from the backend graph generation through a normalized JSON schema (`nodes`, `edges`). The UI computes Dagre hierarchical layouts in a background Web Worker/memoized hook without blocking the main rendering thread."
    },
    {
      name: "API Routing & Authentication Gateway",
      path: "backend/app/api/",
      decouplingReason: "Separated into dedicated domain routers (`auth.py`, `repositories.py`, `chats.py`, `user.py`). Auth is injected via FastAPI's `Depends(get_current_user)`, ensuring controllers never handle low-level JWT decoding or database session management directly."
    },
    {
      name: "Tree-Sitter Concrete Syntax Tree (CST) Parser",
      path: "backend/app/parser/",
      decouplingReason: "Completely decoupled from runtime execution. Tree-Sitter operates purely on syntax byte streams, safely analyzing untested, untrusted, or incomplete source code without executing scripts or requiring runtime dependencies."
    },
    {
      name: "Vector Store & Hybrid RAG Retrieval",
      path: "backend/app/rag/",
      decouplingReason: "Vector persistence in Qdrant is abstracted behind `retriever.py` and `vector_store.py`. If Qdrant is upgraded or replaced with another vector engine, the RAG prompt pipeline and chat controllers remain completely untouched."
    },
    {
      name: "Relational Persistence & Foreign Key Cascade Layer",
      path: "backend/app/db/",
      decouplingReason: "SQLAlchemy declarative models enforce strict relational referential integrity. Deleting a Repository atomically removes files, conversation threads, chat messages, and graph caches via `ON DELETE CASCADE`."
    }
  ],

  dataFlows: [
    {
      id: "flow-1",
      title: "Repository Ingestion & AST Knowledge Graph Synthesis",
      steps: [
        "1. The user inputs a GitHub repository URL or connects their GitHub account via OAuth.",
        "2. FastAPI's `git_service.py` clones the repository into a secure temporary directory and creates a `Repository` record in PostgreSQL with status 'indexing'.",
        "3. `indexer.py` traverses the file tree, filtering out `.git`, `node_modules`, `__pycache__`, and binary files.",
        "4. `ast_parser.py` loads the language-specific Tree-Sitter grammar and builds an AST for each source file.",
        "5. `knowledge_graph.py` extracts symbols (classes, functions, routes), classifies architectural entities (Controller, Service, Model, External Service), and computes dependency edges.",
        "6. Tarjan's strongly connected components algorithm audits the graph for cyclic dependency loops.",
        "7. Code chunks are generated with symbol breadcrumbs and vectorized via OpenAI `text-embedding-3-small` (1536d) into Qdrant with payload metadata `repository_id`.",
        "8. Pre-computed graph JSON is saved in PostgreSQL (`architecture_graphs`), and the repository status transitions to 'indexed'."
      ]
    },
    {
      id: "flow-2",
      title: "Grounded AI Copilot Query & Real-Time Token Streaming",
      steps: [
        "1. The user asks an architectural question (e.g., 'How does the authentication middleware validate tokens?').",
        "2. FastAPI receives the request over SSE on `/api/v1/chats/{chat_id}/messages`.",
        "3. `retriever.py` queries Qdrant with cosine similarity, strictly scoped to `repository_id` with payload filtering, returning top 6 code chunks with AST metadata.",
        "4. `prompts.py` constructs a strict, anti-hallucination system prompt requiring exact line citations (`[cite:path/to/file:L10-L25]`).",
        "5. OpenAI GPT-4o streams completion tokens back to the FastAPI backend.",
        "6. FastAPI yields SSE events (`status`, `token`, `complete`) to the React frontend in real-time.",
        "7. React renders markdown with interactive file chips that open the code viewer modal directly at the cited lines."
      ]
    },
    {
      id: "flow-3",
      title: "Interactive Canvas Exploration & Blast Radius Calculation",
      steps: [
        "1. The frontend fetches the pre-computed graph JSON from `/api/v1/repositories/{id}/graph`.",
        "2. `layout.ts` invokes Dagre to calculate node positions `(x, y)` and bounding dimensions based on architectural layer hierarchy (Presentation -> Application -> Domain -> Infrastructure).",
        "3. ReactFlow v12 renders custom `ArchitectureNode` and `ArchitectureEdge` components at 60fps.",
        "4. When a user clicks a node (e.g., `AuthService`), `blast_radius.py` calculates multi-hop upstream and downstream dependents up to depth 3.",
        "5. The canvas highlights impacted edges in amber and dims unaffected nodes, presenting an immediate change-impact risk assessment."
      ]
    },
    {
      id: "flow-4",
      title: "Automated Request-to-Database Sequence Trace Extraction",
      steps: [
        "1. The user selects an API endpoint (e.g., `POST /api/v1/repositories`).",
        "2. `sequence_extractor.py` parses the AST of the route handler, identifying function invocations, parameter passing, and service calls.",
        "3. It traces execution down into service layer methods (`services/indexer.py`), database queries (`db/session.py`), and external client calls (`git_service.py`).",
        "4. The extractor synthesizes a structured sequence flow model with callers, callees, interaction types (`CALL`, `ASYNC_CALL`, `RETURN`), and line numbers.",
        "5. The frontend renders the trace in `SequenceView` with step timelines and interactive participant headers."
      ]
    }
  ],

  designDecisions: [
    {
      decision: "Tree-Sitter Concrete Syntax Tree (CST) vs. Regex Text Extraction",
      rationale: "Regex parsers fail on multi-line function signatures, nested closures, generic type annotations, and decorator chains. Tree-Sitter parses real concrete syntax trees in C-speed bindings, providing exact token offsets, scope awareness, and 100% syntax extraction across 5 programming languages without executing untrusted user code."
    },
    {
      decision: "Dedicated Qdrant Vector DB vs. PostgreSQL pgvector",
      rationale: "pgvector shares PostgreSQL CPU, memory, and buffer pools with transactional relational operations. Building HNSW indexes during repository indexing spikes database CPU to 100%, degrading API throughput. Qdrant is an independent, Rust-engineered vector database that handles millions of vectors with native payload filtering and sub-100ms cosine distance searches."
    },
    {
      decision: "Dagre Hierarchical Layout + ReactFlow v12 vs. D3 Force Simulation",
      rationale: "D3 force-directed simulations constantly jitter and shift node positions, causing visual disorientation for developers trying to understand software architecture. Dagre enforces deterministic, hierarchical layering (Presentation -> Business Logic -> Persistence), creating clean, predictable architectural blueprints."
    },
    {
      decision: "Bring Your Own Key (BYOK) with Fernet AES-128-CBC Encryption",
      rationale: "Enterprise developers refuse to enter proprietary API keys into shared databases. CodeLens encrypts user OpenAI API keys at rest using Fernet (AES-128-CBC with PKCS7 padding and HMAC-SHA256). Keys are decrypted strictly in memory per LLM request and are never logged or exposed in API responses."
    },
    {
      decision: "Server-Sent Events (SSE) vs. WebSockets for Copilot Streaming",
      rationale: "WebSockets introduce stateful connection overhead, complex reconnection handling, and firewall/proxy traversal issues. SSE operates over standard HTTP/1.1 or HTTP/2, supports automatic reconnection out of the box, works seamlessly with cloud load balancers, and matches the unidirectional nature of LLM token streaming."
    }
  ]
};

