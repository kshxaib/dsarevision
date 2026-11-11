// CodeLens Technical Interview Preparation
// Ordered from fundamental project concepts to advanced architecture and scenarios

export const phase4And5Questions = {
  "title": "Phase 4 & 5: Complete Question Bank & Code-Grounded Answers",
  "summary": "Comprehensive technical interview questions ordered logically from project fundamentals to advanced architecture, RAG, and scalability scenarios.",
  "totalQuestions": 59,
  "categories": [
    {
      "id": "cl-cat-overview",
      "name": "1. Project Overview & Fundamentals",
      "description": "Basic introduction, core problem statement, tech stack choices, and candidate role in CodeLens.",
      "questions": [
        {
          "id": "cl-q-core-1",
          "question": "Can you explain your project in simple terms?",
          "technicalExplanation": "CodeLens is an AI-powered codebase intelligence platform and architectural copilot:\n1. Core Function: When a software engineer or team lead opens a new or massive repository (100k+ lines of code), CodeLens parses the code into an interactive visual knowledge graph showing how modules, classes, and services connect.\n2. AI Architecture Copilot: Engineers can ask high-level questions like \"How does authentication flow from request to database?\" and receive grounded answers with exact file paths and verified line-number citations.\n3. Execution Trace Synthesizer: It automatically traces API requests across controller routes, service layers, and database queries into live sequence diagrams without manual code instrumentation.\n4. Privacy & Cost Isolation: Users bring their own OpenAI API key (BYOK), which is encrypted with AES-128 at rest, ensuring complete data privacy and zero shared token expenses.",
          "actualImplementation": "The full system integrates FastAPI on the backend with Tree-Sitter AST parsing, Qdrant vector search, PostgreSQL persistence, and React 19 with @xyflow/react on the frontend.",
          "sourceFile": "backend/app/main.py & frontend/src/App.tsx",
          "sourceFunction": "app.main.lifespan & frontend.App",
          "realWorldExample": "A new senior engineer joining a team uploads a 50,000-line legacy fintech repo; within 25 seconds, CodeLens displays the full system architecture diagram and maps the payment transaction lifecycle without reading raw files manually."
        },
        {
          "id": "cl-q-core-2",
          "question": "What problem does your project solve?",
          "technicalExplanation": "CodeLens solves three primary engineering challenges in modern software development:\n1. High Cognitive Load & Onboarding Latency: Developers spend up to 70% of their time reading unfamiliar codebases rather than writing features. File trees in IDEs present flat hierarchies that fail to convey cross-module dependencies.\n2. AI Hallucinations in Code Assistance: Generic LLM assistants lack whole-repository context, frequently inventing non-existent function names, hallucinating import paths, and giving outdated architectural advice.\n3. Hidden Architectural Debt & Circular Dependencies: Multi-package codebases often suffer from cyclic imports and undocumented blast radiuses where modifying one class silently breaks downstream microservices.",
          "actualImplementation": "Solved via Tree-Sitter concrete syntax trees (`app/parser/ast_parser.py`), Dagre hierarchical layouts (`frontend/src/components/architecture/layout.ts`), and Tarjan's cycle detection (`app/parser/knowledge_graph.py`).",
          "sourceFile": "backend/app/parser/knowledge_graph.py & frontend/src/components/architecture/layout.ts",
          "sourceFunction": "app.parser.knowledge_graph.build_knowledge_graph & layout.getLayoutedElements",
          "realWorldExample": "Before a major refactor, an engineer uses CodeLens's Blast Radius engine to discover that changing the 'UserSession' interface impacts 14 downstream service handlers across 3 separate directories."
        },
        {
          "id": "cl-q-core-3",
          "question": "Why did you choose this project topic?",
          "technicalExplanation": "I chose this project topic based on personal developer friction and emerging software engineering needs:\n1. Real Developer Pain Point: In every internship, open-source project, or production codebase I encountered, understanding legacy architecture by grepping files was tedious, error-prone, and slow.\n2. Limitations of Existing LLM Code Tools: Standard copilot extensions only inspect the currently active editor tab or 2–3 open files, failing to grasp macro-architectural relationships.\n3. Deep Technical Breadth: Building CodeLens allowed me to master compiler theory (AST parsing with Tree-Sitter), distributed vector retrieval (Qdrant), complex canvas rendering (@xyflow/react), and zero-trust cryptographic security (Fernet BYOK).",
          "actualImplementation": "Architected across 5 dedicated Tree-Sitter grammars and high-performance ReactFlow canvas components.",
          "sourceFile": "backend/app/parser/ast_parser.py & frontend/src/pages/ArchitectureMapPage.tsx",
          "sourceFunction": "app.parser.ast_parser.parse_source_code & ArchitectureMapPage",
          "realWorldExample": "Instead of spending 3 days tracing an async Celery worker pipeline across 40 files, an engineer visualizes the complete event lifecycle in CodeLens in 10 seconds."
        },
        {
          "id": "cl-q-core-4",
          "question": "What technologies did you use and why?",
          "technicalExplanation": "I selected technologies based on performance, type safety, and architectural decoupling:\n1. Backend (FastAPI + Python 3.11+): Asynchronous event loop, native Pydantic v2 validation, sub-millisecond ASGI routing, and first-class Server-Sent Events (SSE) streaming support.\n2. AST Parsing (Tree-Sitter 0.22+): Native C-bindings providing incremental, fault-tolerant Concrete Syntax Tree (CST) parsing across Python, TypeScript, JavaScript, Go, and Java without executing code.\n3. Vector Engine (Qdrant): High-performance Rust vector database with native payload indexing, allowing sub-150ms cosine similarity searches strictly isolated by repository ID.\n4. Relational Database (PostgreSQL 16 + SQLAlchemy 2.0): ACID persistence for users, repository metadata, chat logs, and pre-computed graph JSON caches with cascading deletes.\n5. Frontend (React 19, TypeScript, @xyflow/react, Dagre, Zustand): 60fps graph rendering with viewport culling, deterministic hierarchical layout calculations, and modular domain state stores.",
          "actualImplementation": "Backend requirements defined in `backend/requirements.txt` and frontend dependencies in `frontend/package.json`.",
          "sourceFile": "backend/requirements.txt & frontend/package.json",
          "sourceFunction": "FastAPI, Tree-Sitter, Qdrant-Client, ReactFlow v12, Zustand",
          "realWorldExample": "Tree-Sitter parses a 2,000-line Python file with complex decorators and nested async functions in 12ms, while regex would take 250ms and fail on multi-line signatures."
        },
        {
          "id": "cl-q-core-5",
          "question": "What was your role in the project?",
          "technicalExplanation": "As the sole architect and lead full-stack engineer, I had end-to-end technical ownership:\n1. Architecture & System Design: Designed the decoupled 4-tier system layout, API contracts, PostgreSQL schemas, and Qdrant vector collection strategies.\n2. AST & Compiler Parsing: Implemented the Tree-Sitter grammar visitors in Python to extract symbols, classes, methods, route decorators, and dependency relationships across 5 languages.\n3. RAG & AI Copilot Pipeline: Built the hybrid retrieval pipeline, grounding system prompt, line-level citation parser, and real-time SSE token streaming server.\n4. Interactive Frontend Canvas: Engineered the ReactFlow v12 canvas, Dagre layout integration, sequence trace renderer, and Zustand workspace store.\n5. Security & Infrastructure: Implemented GitHub OAuth 2.0 web application flow, Fernet AES-128 API key encryption, and Docker containerization.",
          "actualImplementation": "Full codebase developed across `backend/app/` and `frontend/src/`.",
          "sourceFile": "backend/app/main.py & frontend/src/App.tsx",
          "sourceFunction": "Full system development and integration",
          "realWorldExample": "Personally authored the Tarjan's SCC cycle detection algorithm that eliminated infinite recursion during legacy repository AST parsing."
        },
        {
          "id": "cl-q-core-6",
          "question": "What feature are you most proud of?",
          "technicalExplanation": "The feature I am most proud of is the AST-Grounded Execution Trace Synthesizer:\n1. Automated Lifecycle Reconstruction: Without requiring developers to inject telemetry or run debuggers, it automatically traces API endpoints down through service layers, helper utilities, and database ORM queries.\n2. Algorithmic AST Ingestion: It inspects function calls, parameter passing, and HTTP method decorators using Tree-Sitter, identifying caller-callee relationships.\n3. Real-Time Sequence Diagram: It renders the extracted call hierarchy into an interactive Mermaid.js diagram and step-by-step participant timeline.\n4. Line Attribution: Every message in the sequence links directly to the exact source code file and line numbers, eliminating ambiguity.",
          "actualImplementation": "Built in `backend/app/parser/sequence_extractor.py` and `frontend/src/components/sequence/SequenceView.tsx`.",
          "sourceFile": "backend/app/parser/sequence_extractor.py & frontend/src/components/sequence/SequenceView.tsx",
          "sourceFunction": "app.parser.sequence_extractor.extract_sequence_diagram & SequenceView",
          "realWorldExample": "Selecting 'POST /api/v1/auth/login' immediately outputs a 6-step sequence diagram showing: Client -> AuthController -> AuthService.verify_password -> UserRepository.find_by_email -> JWT.encode -> Client."
        },
        {
          "id": "cl-q-core-7",
          "question": "Why did you include this project in your resume?",
          "technicalExplanation": "I included CodeLens because it highlights elite engineering depth across multiple complex domains:\n1. Compiler Theory & ASTs: Demonstrates practical mastery of concrete syntax trees and language grammars beyond routine CRUD web applications.\n2. Advanced AI Systems & RAG: Proves the ability to build zero-hallucination, line-grounded generative AI systems with real-time SSE streaming.\n3. High-Performance Frontend: Showcases 60fps canvas graphics manipulation, virtualized rendering with ReactFlow v12, and Dagre graph theory algorithms.\n4. Enterprise Security: Demonstrates understanding of zero-trust architecture, BYOK symmetric cryptography (Fernet), and multi-tenant vector isolation.",
          "actualImplementation": "Referenced as the flagship system project demonstrating full-stack engineering maturity.",
          "sourceFile": "backend/app/parser/ast_parser.py & backend/app/rag/service.py",
          "sourceFunction": "Tree-Sitter CST Engine & Grounded RAG Copilot",
          "realWorldExample": "Interviewers frequently dive into how Tree-Sitter avoids executing malicious code and how Qdrant payload filters guarantee multi-tenant data privacy."
        },
        {
          "id": "cl-q-core-8",
          "question": "How easy is it for another developer to understand your project?",
          "technicalExplanation": "The project is designed for high maintainability and developer ergonomics:\n1. Clean Modular Architecture: The backend strictly separates API routes ('app/api'), parser logic ('app/parser'), vector retrieval ('app/rag'), database models ('app/db'), and background services ('app/services').\n2. Comprehensive TypeScript Types: Every frontend entity (nodes, edges, chat messages, sequence participants) is defined in 'frontend/src/types/index.ts'.\n3. Reproducible Docker Setup: Includes a production-ready 'docker-compose.yml' that orchestrates FastAPI, PostgreSQL 16, and Qdrant with one command ('docker-compose up').\n4. Self-Documenting Interactive Swagger: FastAPI automatically serves interactive OpenAPI documentation at '/docs' with detailed request/response schemas.",
          "actualImplementation": "Docker configuration in `docker-compose.yml` and API schemas in `backend/app/schemas/`.",
          "sourceFile": "docker-compose.yml & backend/app/schemas/",
          "sourceFunction": "Docker Compose & Pydantic v2 API Schemas",
          "realWorldExample": "A new contributor cloned the repository, ran `docker-compose up -d`, and started interacting with the API via Swagger UI in under 2 minutes."
        }
      ]
    },
    {
      "id": "cl-cat-architecture",
      "name": "2. System Architecture & High-Level Design",
      "description": "End-to-end data lifecycle, API layout, FastAPI backend structure, and Zustand frontend state.",
      "questions": [
        {
          "id": "cl-q-arch-1",
          "question": "Can you walk me through the high-level system architecture of CodeLens and how data flows from repository ingestion to interactive canvas visualization?",
          "technicalExplanation": "CodeLens is structured into a decoupled 4-tier architecture:\n1. Presentation Tier: React 19 single-page application utilizing TypeScript, @xyflow/react (ReactFlow v12) for graph rendering, and Zustand for state.\n2. Service Tier: Asynchronous FastAPI application coordinating REST routes, background tasks, and SSE token streaming.\n3. Parsing Engine: Tree-Sitter concrete syntax tree extractors running in isolated Python threads to extract symbols, classes, routes, and call sequences.\n4. Dual Storage Tier: PostgreSQL 16 for ACID relational data and pre-computed graph JSON; Qdrant for 1536-dimensional vector search.\nData Flow: When a repo is added, FastAPI clones it, runs Tree-Sitter to build the AST, classifies entities into a Knowledge Graph, detects cycles via Tarjan's algorithm, embeds code chunks into Qdrant, and caches the layouted graph in PostgreSQL. The frontend fetches the graph and renders it via Dagre at 60fps.",
          "actualImplementation": "FastAPI lifespan and router mounts in `backend/app/main.py`; indexing pipeline in `backend/app/services/indexer.py`.",
          "sourceFile": "backend/app/main.py & backend/app/services/indexer.py",
          "sourceFunction": "app.main.lifespan & app.services.indexer.index_repository",
          "realWorldExample": "Ingesting an open-source Go backend creates 120 AST nodes, 340 dependency edges, and 1,200 Qdrant vector points in 18 seconds."
        },
        {
          "id": "cl-q-arch-2",
          "question": "How did you organize the FastAPI application structure and manage global exceptions in CodeLens?",
          "technicalExplanation": "The backend follows a domain-driven, modular clean architecture layout:\n1. Domain Routers: Modular routers registered under '/api/v1' in 'app/main.py':\n   - 'app/api/auth.py': GitHub OAuth 2.0 handshake and JWT access tokens.\n   - 'app/api/repositories.py': Repository CRUD, git cloning, and indexing triggers.\n   - 'app/api/chats.py': Conversation threads and SSE streaming RAG copilot.\n   - 'app/api/user.py': User profile and BYOK Fernet OpenAI key management.\n   - 'app/api/health.py': Health check with database and Qdrant readiness probes.\n2. Global Exception Handling: Handled in 'main.py' via '@app.exception_handler(Exception)'. Any unhandled error is caught, logged with traceback, and returned to the client as:\n   '{\"detail\": \"Internal server error occurred\", \"status_code\": 500, \"path\": request.url.path}'.",
          "actualImplementation": "Router mounts in `backend/app/main.py` and modular controller files in `backend/app/api/`.",
          "sourceFile": "backend/app/main.py & backend/app/api/repositories.py",
          "sourceFunction": "app.main.lifespan & app.api.repositories.router",
          "realWorldExample": "If Qdrant becomes temporarily unreachable during a search, the global handler intercepts the error and returns a clean 503 Service Unavailable JSON rather than crashing the ASGI process."
        },
        {
          "id": "cl-q-arch-3",
          "question": "How does FastAPI handle CORS, routing, and health monitoring in CodeLens?",
          "technicalExplanation": "FastAPI configures enterprise networking and lifecycle monitoring:\n1. Strict CORS Middleware: 'CORSMiddleware' in 'main.py' uses an explicit regex pattern:\n   'r\"https?://.*(kshoeb\\.in|vercel\\.app|onrender\\.com|localhost|127\\.0\\.0\\.1).*\"'\n   strictly forbidding wildcard '*' when 'allow_credentials=True', preventing cross-site token interception.\n2. Route Prefixes: All API endpoints are organized under '/api/v1' for seamless backward compatibility.\n3. Health Monitoring: '/api/v1/health' performs active readiness checks: executes 'SELECT 1' against PostgreSQL and pings Qdrant's REST health port, returning database latencies and memory health.",
          "actualImplementation": "Configured in `backend/app/main.py` and `backend/app/api/health.py`.",
          "sourceFile": "backend/app/main.py & backend/app/api/health.py",
          "sourceFunction": "app.main.configure_cors & app.api.health.health_check",
          "realWorldExample": "Kubernetes and Render liveness probes ping '/health' every 15 seconds; if the database connection pool is exhausted, it reports 'unhealthy' before traffic is routed to that container."
        },
        {
          "id": "cl-q-arch-4",
          "question": "How does CodeLens organize frontend state management with Zustand, and why was Zustand chosen over Redux or React Context?",
          "technicalExplanation": "The frontend uses Zustand 5 for lightweight, modular state management:\n1. Domain Store Separation:\n   - 'useAuthStore': Manages authenticated user state, JWT access token, and masked BYOK OpenAI key status.\n   - 'useWorkspaceStore': Manages active repository, file tree, active visual mode ('architecture', 'dataflow', 'sequence', 'workflow', 'lifecycle'), pre-computed graph data, selected node, and blast radius state.\n2. Why Zustand over Redux: Redux requires massive boilerplate (actions, reducers, dispatchers, dispatch wrappers). Zustand achieves complete state reactivity with clean hook selectors ('const activeRepo = useWorkspaceStore(s => s.activeRepository)') with zero boilerplate.\n3. Why Zustand over React Context: React Context triggers re-renders on all consuming child components whenever any property updates. Zustand uses selector subscriptions, only re-rendering the exact component that consumes the changed field.",
          "actualImplementation": "Implemented in `frontend/src/store/useAuthStore.ts` and `frontend/src/store/useWorkspaceStore.ts`.",
          "sourceFile": "frontend/src/store/useAuthStore.ts & frontend/src/store/useWorkspaceStore.ts",
          "sourceFunction": "useAuthStore & useWorkspaceStore",
          "realWorldExample": "Selecting a node on the canvas updates 'selectedNode' in Zustand; only the sidebar inspector re-renders, while the 500-node canvas maintains an uninterrupted 60 FPS."
        },
        {
          "id": "cl-q-arch-5",
          "question": "How does CodeLens render interactive architectural diagrams and graph layouts at 60 FPS using ReactFlow and Dagre?",
          "technicalExplanation": "High-performance graph rendering is achieved through a multi-stage layout pipeline:\n1. Hierarchical Layout (Dagre): 'layout.ts' accepts normalized nodes and edges, passes them to Dagre's directed graph engine, and calculates exact coordinates (x, y) along horizontal or vertical ranks (TB or LR).\n2. Custom Node Components: Registered in ReactFlow v12 as 'ArchitectureNode' (with status badges, symbol counts, and layer indicators) and 'ArchitectureEdge' (with animated dashed lines and interaction markers).\n3. Viewport Culling & Virtualization: ReactFlow v12 natively unmounts off-screen nodes from the DOM tree, ensuring that only visible nodes are painted by the browser compositor.\n4. Bidirectional Edge Routing: Automatically curves edges to prevent overlapping lines between service dependencies and database entities.",
          "actualImplementation": "Layout engine in `frontend/src/components/architecture/layout.ts` and custom nodes in `frontend/src/components/architecture/ArchitectureNode.tsx`.",
          "sourceFile": "frontend/src/components/architecture/layout.ts & frontend/src/components/architecture/ArchitectureNode.tsx",
          "sourceFunction": "getLayoutedElements & ArchitectureNode",
          "realWorldExample": "Panning and zooming across a 600-node microservice repository consumes less than 8% CPU in Chrome DevTools performance traces."
        }
      ]
    },
    {
      "id": "cl-cat-database-auth",
      "name": "3. Database Design, Authentication & Security",
      "description": "PostgreSQL relational schemas, cascading deletes, JWT token auth, and BYOK Fernet key encryption.",
      "questions": [
        {
          "id": "cl-q-db-1",
          "question": "Why did you choose this database design and entity relationships in PostgreSQL?",
          "technicalExplanation": "The PostgreSQL database design in CodeLens is structured around 7 normalized entities in a parent-child hierarchy:\n1. User: Stores GitHub ID, username, email, avatar URL, and encrypted BYOK OpenAI API keys.\n2. Repository: Represents a parsed codebase, storing GitHub repo ID, full name, clone URL, default branch, indexing status ('indexing', 'indexed'), and symbol counts.\n3. RepositoryAccess: Junction table enforcing multi-user permissions ('owner', 'write', 'read') with a unique constraint on '(user_id, repository_id)'.\n4. File: Stores individual parsed source file paths, language tags, line counts, and content hashes.\n5. Conversation & Message: Tracks AI chat threads and messages with JSON 'sources' citations.\n6. ArchitectureGraph: Caches pre-computed graph JSON keyed by '(repository_id, commit_sha)', preventing costly on-the-fly re-layouts.\n7. ON DELETE CASCADE: All foreign keys enforce cascade deletion. Deleting a Repository atomically cleans up all associated files, chat threads, messages, permissions, and graph caches.",
          "actualImplementation": "Defined in `backend/app/db/models.py` using SQLAlchemy 2.0 declarative models.",
          "sourceFile": "backend/app/db/models.py",
          "sourceFunction": "SQLAlchemy declarative models in app.db.models",
          "realWorldExample": "Deleting a 500-file repository in CodeLens purges 500 file rows, 40 chat messages, and 3 cached graph trees in a single atomic SQL transaction."
        },
        {
          "id": "cl-q-db-2",
          "question": "Explain the relational data model of CodeLens. How are parent-child relationships and cascade deletions configured?",
          "technicalExplanation": "Referential integrity and cascade rules are strictly configured at the database level:\n1. Foreign Key Cascades:\n   - 'files.repository_id -> repositories.id (ON DELETE CASCADE)'\n   - 'conversations.repository_id -> repositories.id (ON DELETE CASCADE)'\n   - 'conversations.user_id -> users.id (ON DELETE CASCADE)'\n   - 'messages.conversation_id -> conversations.id (ON DELETE CASCADE)'\n   - 'architecture_graphs.repository_id -> repositories.id (ON DELETE CASCADE)'\n2. Passive Deletes: SQLAlchemy models specify 'passive_deletes=True' and 'cascade=\"all, delete-orphan\"'. This tells SQLAlchemy to let PostgreSQL execute the cascades natively at the engine level rather than issuing hundreds of individual DELETE statements in Python.\n3. Unique Constraints: Enforced on 'uq_repository_file (repository_id, file_path)' and 'uq_repo_arch_commit (repository_id, commit_sha)' to guarantee zero duplicate files or commit caches.",
          "actualImplementation": "Configured on relationships in `backend/app/db/models.py`.",
          "sourceFile": "backend/app/db/models.py",
          "sourceFunction": "app.db.models.Repository & app.db.models.Conversation",
          "realWorldExample": "Attempting to insert a duplicate file path into the same repository raises an immediate database IntegrityError, preventing data corruption."
        },
        {
          "id": "cl-q-auth-1",
          "question": "How did you handle user authentication and session security with GitHub OAuth and JWT?",
          "technicalExplanation": "Authentication in CodeLens is built on a secure GitHub OAuth 2.0 and JWT flow:\n1. GitHub OAuth 2.0 Flow:\n   - The user clicks 'Login with GitHub'. The frontend redirects to GitHub's authorization endpoint with client ID and scopes ('read:user', 'repo').\n   - GitHub redirects back to '/api/v1/auth/github/callback' with an authorization code.\n   - FastAPI exchanges the code for a GitHub access token, queries 'https://api.github.com/user', and upserts the 'User' record in PostgreSQL.\n2. Stateless JWT Session:\n   - On successful handshake, FastAPI signs a stateless JSON Web Token (JWT) encoding the user ID ('sub'), username, and an expiration timestamp (e.g. 7 days) using HS256.\n   - The token is returned to the client and stored in 'localStorage'/'sessionStorage' via Zustand.\n3. Route Protection: Protected endpoints use FastAPI's 'Depends(get_current_user)', validating the 'Authorization: Bearer <token>' header on every request.",
          "actualImplementation": "Implemented in `backend/app/api/auth.py` and `backend/app/core/security.py`.",
          "sourceFile": "backend/app/api/auth.py & backend/app/core/security.py",
          "sourceFunction": "app.api.auth.github_callback & app.core.security.create_access_token",
          "realWorldExample": "If the backend server restarts, active sessions remain uninterrupted because JWT token verification is completely stateless."
        },
        {
          "id": "cl-q-auth-2",
          "question": "How does CodeLens authenticate API requests and enforce repository access permissions across users?",
          "technicalExplanation": "CodeLens enforces granular multi-tenant permission controls:\n1. Dependency Injection: Protected routes inject 'current_user: User = Depends(get_current_user)' from 'app/api/auth.py'.\n2. Repository Access Check: Before accessing any repository data or chat thread, controllers query the 'repository_access' table:\n   'SELECT permission FROM repository_access WHERE user_id = :uid AND repository_id = :rid'\n3. Unauthorized Access Rejection: If no access record exists, FastAPI immediately raises 'HTTPException(status_code=403, detail=\"Access denied to this repository\")'.\n4. Token Masking: Public endpoints (e.g. repository health) use 'get_current_user_optional', allowing public repository inspection while restricting settings and private code viewers.",
          "actualImplementation": "Permission verification routines in `backend/app/api/repositories.py` and `backend/app/api/chats.py`.",
          "sourceFile": "backend/app/api/repositories.py & backend/app/api/auth.py",
          "sourceFunction": "app.api.auth.get_current_user & app.api.repositories.get_repository",
          "realWorldExample": "If an unauthorized user attempts to trigger indexing on a private repository by crafting a manual curl request with their JWT, they receive a 403 Forbidden response."
        },
        {
          "id": "cl-q-sec-1",
          "question": "How is the Bring-Your-Own-Key (BYOK) architecture implemented in CodeLens, and how are student OpenAI API keys secured at rest?",
          "technicalExplanation": "CodeLens implements enterprise-grade Bring-Your-Own-Key (BYOK) encryption:\n1. Symmetric Encryption at Rest: Student and developer OpenAI API keys are encrypted at rest using Fernet symmetric encryption ('cryptography.fernet.Fernet'), which implements AES-128 in CBC mode with PKCS7 padding and HMAC-SHA256 for integrity.\n2. In-Memory Decryption: The ciphertext is stored in 'users.openai_api_key' in PostgreSQL. Keys are decrypted exclusively in memory per request inside 'app.rag.service.stream_chat_response' and are never printed in logs or returned in REST API responses.\n3. Key Masking: When returning user profile data to the React UI, the backend masks the key:\n   'sk-proj-abc••••••••xyz9', confirming that a key is configured without exposing the secret.\n4. Key Revocation: Users can revoke or replace their key at any time, instantly nullifying the stored ciphertext.",
          "actualImplementation": "Fernet cryptography in `backend/app/core/security.py` and key endpoints in `backend/app/api/user.py`.",
          "sourceFile": "backend/app/core/security.py & backend/app/api/user.py",
          "sourceFunction": "app.core.security.encrypt_api_key & app.api.user.update_api_key",
          "realWorldExample": "Even if an attacker gains full read access to a PostgreSQL database dump, all user OpenAI API keys remain unreadable AES-128 ciphertext."
        },
        {
          "id": "cl-q-sec-2",
          "question": "What security measures were implemented for data protection, input validation, and SQL injection prevention?",
          "technicalExplanation": "Multi-layered defense-in-depth security is enforced across the platform:\n1. SQL Injection Prevention: All relational database queries use SQLAlchemy 2.0 parameterized queries with mapped ORM models. Raw string SQL interpolation is strictly forbidden.\n2. Input Sanitization & Validation: All incoming REST payloads are strictly validated against Pydantic v2 schemas ('app/schemas/'), rejecting malformed JSON, excessive string lengths, and unexpected fields.\n3. Path Traversal Protection: When indexing files from git repositories, file paths are sanitized with 'Path(path).resolve()' and verified to reside inside the sandboxed repository root, preventing '../etc/passwd' traversal attacks.\n4. Safe AST Ingestion: Tree-Sitter operates purely on syntax trees without executing scripts, completely preventing remote code execution (RCE) during codebase parsing.",
          "actualImplementation": "Pydantic schemas in `backend/app/schemas/` and path sanitization in `backend/app/services/indexer.py`.",
          "sourceFile": "backend/app/schemas/ & backend/app/services/indexer.py",
          "sourceFunction": "Pydantic request models & app.services.indexer._safe_read_file",
          "realWorldExample": "A malicious repository containing a file named '../../app/core/config.py' is safely normalized to 'app/core/config.py' within the isolated clone directory."
        }
      ]
    },
    {
      "id": "cl-cat-ai-rag",
      "name": "4. AI, Vector Search & AST Knowledge Engine",
      "description": "Model selection (GPT-4o / mini), Qdrant vector retrieval, payload subject isolation, and grounded exam answer generation.",
      "questions": [
        {
          "id": "cl-q-ai-1",
          "question": "Why did you select this specific model combination (GPT-4o, GPT-4o-mini, text-embedding-3-small)?",
          "technicalExplanation": "The AI pipeline uses a tiered architecture optimized for latency, cost, and code reasoning:\n1. Fast Query & Status Classification (GPT-4o-mini): Evaluates whether a query is purely conversational (e.g. 'Hello', 'What can you do?') vs. architectural code-seeking. GPT-4o-mini responds in under 200ms at 10x lower cost.\n2. Deep Architectural Synthesis (GPT-4o): Ingests the top retrieved code chunks and AST symbol context. GPT-4o has superior multi-file logical reasoning, capable of tracing execution across files, citing exact line numbers, and explaining architectural trade-offs without hallucinating.\n3. Dense Vector Embeddings (text-embedding-3-small): Generates 1536-dimensional dense vector embeddings. It provides higher MTEB code-retrieval accuracy than legacy 'text-embedding-ada-002' while reducing embedding cost by 80% and achieving sub-100ms vector index insertion in Qdrant.",
          "actualImplementation": "Model configurations in `backend/app/rag/service.py` and `backend/app/rag/embeddings.py`.",
          "sourceFile": "backend/app/rag/service.py & backend/app/rag/embeddings.py",
          "sourceFunction": "app.rag.service.stream_chat_response & app.rag.embeddings.get_embedding",
          "realWorldExample": "Conversational greetings bypass expensive Qdrant vector retrieval entirely; complex questions like 'Explain the JWT verification flow' utilize GPT-4o with verified file citations."
        },
        {
          "id": "cl-q-ai-2",
          "question": "Explain the Grounded Multi-File RAG Copilot in CodeLens. Why is standard keyword search or raw chunk pasting insufficient for codebase reasoning?",
          "technicalExplanation": "Standard keyword search (grep) and naive RAG fail on codebases because:\n1. Code is Structural, Not Just Textual: Grepping for 'authenticate' returns comments, variable names, and string literals, missing the actual class inheritance and route decorators.\n2. Naive Chunking Breaks Code Units: Splitting every 1,000 characters cuts methods in half and separates docstrings from function bodies.\n3. Grounded Multi-File RAG Solution:\n   - Tree-Sitter AST chunks code at function/class boundaries with hierarchical breadcrumbs (e.g. 'backend/app/api/auth.py > router > def login').\n   - Qdrant executes cosine similarity search filtered by 'repository_id', retrieving top 6 semantically relevant chunks.\n   - System prompts strictly forbid ungrounded speculation, requiring the model to cite exact line ranges ('[cite:path:L10-L25]').",
          "actualImplementation": "Retriever in `backend/app/rag/retriever.py` and prompt engineering in `backend/app/rag/prompts.py`.",
          "sourceFile": "backend/app/rag/retriever.py & backend/app/rag/prompts.py",
          "sourceFunction": "app.rag.retriever.retrieve_context & app.rag.prompts.build_system_prompt",
          "realWorldExample": "When asked 'Where are passwords hashed?', CodeLens retrieves the Bcrypt context in `security.py` with breadcrumbs and cites lines 15-28 rather than guessing."
        },
        {
          "id": "cl-q-ai-3",
          "question": "Why did you separate the vector database (Qdrant) from the relational database (PostgreSQL) instead of using pgvector inside PostgreSQL?",
          "technicalExplanation": "I chose a dedicated Qdrant vector database over pgvector for three critical reasons:\n1. Compute & Resource Contention: Building HNSW vector indexes on tens of thousands of 1536d code chunks requires substantial CPU and RAM. In pgvector, indexing spikes PostgreSQL CPU to 100%, degrading user authentication and transactional database queries.\n2. Specialized Rust-Based Vector Engine: Qdrant is written in Rust and designed specifically for high-throughput vector search. It executes HNSW graph traversals and scalar quantization with sub-20ms latency.\n3. Native Payload Filtering: Qdrant filters vectors on metadata payloads ('repository_id', 'file_path') before or during HNSW graph exploration, ensuring 100% tenant isolation without sequential table scans.",
          "actualImplementation": "Qdrant connection in `backend/app/rag/vector_store.py` and PostgreSQL session in `backend/app/db/session.py`.",
          "sourceFile": "backend/app/rag/vector_store.py & backend/app/db/session.py",
          "sourceFunction": "app.rag.vector_store.get_qdrant_client & app.db.session.engine",
          "realWorldExample": "Indexing a 100k LoC repository builds 2,500 vector points in Qdrant; PostgreSQL CPU utilization remains flat at 2%, keeping user logins snappy."
        },
        {
          "id": "cl-q-ai-4",
          "question": "What embedding model and chunking strategy does CodeLens use, and how does AST-aware chunking differ from naive fixed-length splitting?",
          "technicalExplanation": "CodeLens implements an AST-aware semantic chunking strategy:\n1. Naive Fixed-Length Splitting (Bad): Cuts text every 1,000 characters with 200 overlap. This routinely splits a function header from its body, breaks SQL query strings, and drops decorator annotations.\n2. AST-Aware Chunking (CodeLens):\n   - Tree-Sitter parses the concrete syntax tree, identifying top-level declarations (classes, functions, interfaces, methods).\n   - If a function is under 800 tokens, it is preserved as an atomic chunk.\n   - If a class is large, its methods are chunked individually, each prepended with the class signature and docstring breadcrumbs.\n3. Embeddings: Chunks are encoded via OpenAI 'text-embedding-3-small' (1536 dimensions), achieving high semantic density with optimal token efficiency.",
          "actualImplementation": "Implemented in `backend/app/services/chunker.py` and `backend/app/rag/embeddings.py`.",
          "sourceFile": "backend/app/services/chunker.py & backend/app/rag/embeddings.py",
          "sourceFunction": "app.services.chunker.chunk_file_ast & app.rag.embeddings.get_embeddings_batch",
          "realWorldExample": "A 40-line FastAPI route handler with a decorator, Pydantic type hints, and docstring is indexed as one cohesive semantic vector instead of being sliced across 2 arbitrary text chunks."
        },
        {
          "id": "cl-q-ai-5",
          "question": "How does Qdrant enforce repository isolation in CodeLens, and why is payload filtering critical for multi-tenant codebase intelligence?",
          "technicalExplanation": "Repository isolation is enforced through mandatory Qdrant payload filtering:\n1. Payload Metadata Tagging: Every vector inserted into Qdrant is accompanied by a metadata payload:\n   'payload = {\"repository_id\": repo_id, \"file_path\": path, \"start_line\": s, \"end_line\": e}'\n2. Indexed Payload Field: An explicit keyword payload index is created in Qdrant on 'repository_id'.\n3. Search Query Constraint: All vector similarity queries construct a strict filter:\n   'Filter(must=[FieldCondition(key=\"repository_id\", match=MatchValue(value=repo_id))])'\n4. Zero Cross-Tenant Leakage: Vectors from other repositories are completely excluded from HNSW distance calculations, making it mathematically impossible for private code to appear in another user's search results.",
          "actualImplementation": "Search query filters built in `backend/app/rag/retriever.py`.",
          "sourceFile": "backend/app/rag/retriever.py",
          "sourceFunction": "app.rag.retriever.retrieve_context",
          "realWorldExample": "If Repository A and Repository B both contain an 'auth.py' file with identical function names, queries in Repo A only ever retrieve chunks tagged with Repo A's integer ID."
        },
        {
          "id": "cl-q-ai-6",
          "question": "What optimizations were implemented to achieve sub-150ms vector retrieval across tens of thousands of code chunks in Qdrant?",
          "technicalExplanation": "Sub-150ms vector search latency is achieved through four key optimizations:\n1. Payload B-Tree Indexing: Created an explicit schema index on 'repository_id' inside Qdrant. Without this, Qdrant must scan every point payload sequentially.\n2. Cosine Distance Metric: Configured Qdrant collections with Cosine distance, which is accelerated by AVX-512 SIMD vector instructions on modern CPU architectures.\n3. Focused Context Limit: Capped vector retrieval at top-k=6 most relevant chunks, providing complete architectural context while keeping payload transfer under 35KB.\n4. Asynchronous Connection Pooling: Cached the 'QdrantClient' instance across requests rather than opening a new HTTP handshake per query.",
          "actualImplementation": "Collection setup and client caching in `backend/app/rag/vector_store.py`.",
          "sourceFile": "backend/app/rag/vector_store.py",
          "sourceFunction": "app.rag.vector_store.init_collection & app.rag.vector_store.get_qdrant_client",
          "realWorldExample": "Benchmarking 1,000 vector queries across a 25,000-chunk index yielded a p95 retrieval latency of 42ms."
        },
        {
          "id": "cl-q-ai-7",
          "question": "How does CodeLens guarantee zero-hallucination code reasoning and enforce exact line-level citations?",
          "technicalExplanation": "Zero-hallucination code intelligence is enforced via a two-phase grounding pipeline:\n1. Strict Anti-Hallucination Directives: The system prompt instructs GPT-4o:\n   'You are an expert codebase copilot. Answer strictly using the provided codebase context chunks. If information is missing from the context, explicitly state that it is not found. Do not invent files, classes, or line numbers.'\n2. Structured Citation Tagging: The model must cite claims using the exact format:\n   '[cite:relative/path/to/file.py:L15-L35]'.\n3. Citation Verification Regex: 'parse_citations_from_response' parses all '[cite:...]' tags and verifies them against the active repository's PostgreSQL 'files' records.\n4. Interactive Frontend Code Chips: Citations render as clickable chips in React; clicking a chip opens the code viewer modal scrolled directly to the cited line range.",
          "actualImplementation": "Implemented in `backend/app/rag/prompts.py` and `frontend/src/components/chat/ChatMessageMarkdown.tsx`.",
          "sourceFile": "backend/app/rag/prompts.py & frontend/src/components/chat/ChatMessageMarkdown.tsx",
          "sourceFunction": "app.rag.prompts.parse_citations_from_response & ChatMessageMarkdown",
          "realWorldExample": "If an engineer asks about Redis caching in a repository that uses PostgreSQL only, the model responds: 'Redis caching was not found in this codebase', citing zero fake lines."
        },
        {
          "id": "cl-q-ai-8",
          "question": "How did you evaluate retrieval and generation performance in the CodeLens Copilot?",
          "technicalExplanation": "I evaluated RAG performance using three quantitative benchmarks:\n1. Citation Precision: Tested across 100 sample architectural questions; measured what percentage of generated citations pointed to existing files and valid line numbers (achieved 99.2% precision).\n2. Retrieval Recall (Top-6): Evaluated whether the ground-truth implementation file was present in Qdrant's top-6 retrieved chunks for queries specifying feature names (achieved 94.6% recall).\n3. First-Token Latency (TTFT): Measured time from request dispatch to the first streamed SSE token, maintaining a p95 latency under 650ms.",
          "actualImplementation": "Benchmarking scripts in testing suite and prompt evaluation tests in `backend/tests/`.",
          "sourceFile": "backend/app/rag/service.py & backend/app/rag/retriever.py",
          "sourceFunction": "app.rag.service.stream_chat_response",
          "realWorldExample": "On 50 architectural queries on an unfamiliar open-source project, CodeLens correctly identified the entrypoint controller and database model 49 out of 50 times."
        },
        {
          "id": "cl-q-ai-9",
          "question": "How does Tree-Sitter concrete syntax tree (CST) parsing work across Python, TypeScript, JavaScript, Go, and Java?",
          "technicalExplanation": "Tree-Sitter provides native, multi-language syntactic extraction:\n1. Extension Mapping: 'detect_language' maps file extensions (.py, .ts, .tsx, .js, .go, .java) to specific Tree-Sitter grammar modules.\n2. Parser Caching: Parsers are compiled C-bindings wrapped in Python ('_PARSER_CACHE') to avoid reloading grammars on every file.\n3. Fault-Tolerant Parsing: Tree-Sitter produces a valid Concrete Syntax Tree (CST) even if code contains syntax errors or incomplete statements, unlike Python's native 'ast.parse()' which crashes with SyntaxError.\n4. Node Traversal: Visitors traverse node types ('function_definition', 'class_declaration', 'method_declaration', 'import_statement') to extract identifier names, line numbers, parameter lists, and decorators.",
          "actualImplementation": "Defined in `backend/app/parser/ast_parser.py` using language bindings.",
          "sourceFile": "backend/app/parser/ast_parser.py",
          "sourceFunction": "app.parser.ast_parser.parse_source_code & app.parser.ast_parser._init_parser",
          "realWorldExample": "A TypeScript file with experimental decorators and unclosed JSX tags is parsed cleanly into a CST without crashing the indexer."
        },
        {
          "id": "cl-q-ai-10",
          "question": "How does the Blast Radius analysis engine determine the upstream and downstream impact of modifying a class or function?",
          "technicalExplanation": "The Blast Radius engine calculates change impact across the knowledge graph:\n1. Graph Resolution: 'TraceService' resolves the target symbol or file into an architectural node ID.\n2. Breadth-First Search (BFS) Traversal:\n   - Downstream Dependencies: Traverses outgoing edges to find all services, models, and external APIs that the target depends on.\n   - Upstream Dependents: Traverses incoming edges up to 'max_depth=3' to find all controllers, workflows, and UI components that depend on the target.\n3. Impact Level Scoring: Calculates total impacted nodes:\n   - < 3 nodes: 'low' risk.\n   - 3–7 nodes: 'medium' risk.\n   - > 7 nodes: 'high' risk.\n4. Visual Highlighting: The frontend canvas highlights the target in amber, impacted edges in red/amber, and dims unaffected nodes.",
          "actualImplementation": "Implemented in `backend/app/parser/blast_radius.py` and `backend/app/services/trace_service.py`.",
          "sourceFile": "backend/app/parser/blast_radius.py & backend/app/services/trace_service.py",
          "sourceFunction": "app.parser.blast_radius.compute_blast_radius & TraceService.compute_symbol_blast_radius",
          "realWorldExample": "Auditing 'UserRepository' reveals 18 upstream dependents across 4 API routers, instantly warning the developer that altering its schema is high risk."
        }
      ]
    },
    {
      "id": "cl-cat-pdf-render",
      "name": "5. Code Visualization, Trace Synthesis & Dynamic Canvases",
      "description": "5 visual view modes (Architecture, Dataflow, Sequence, Workflow, Lifecycle) and automated trace extraction.",
      "questions": [
        {
          "id": "cl-q-vis-1",
          "question": "How does CodeLens automatically extract request-to-database execution traces and synthesize live sequence diagrams?",
          "technicalExplanation": "Execution traces are synthesized directly from AST syntax trees without runtime tracing:\n1. Endpoint Discovery: 'sequence_extractor.py' identifies route decorators ('@router.get', '@router.post', 'app.post') to establish the entrypoint controller and actor.\n2. Call Hierarchy Traversal: Inspects function bodies, identifying calls to service methods, database sessions ('db.query', 'db.execute'), and external API clients.\n3. Participant Classification: Organizes participants into architectural roles: Actor -> Controller -> Service -> Database -> External Service.\n4. Message Flow Model: Generates ordered 'SequenceMessage' instances with interaction types ('CALL', 'ASYNC_CALL', 'RETURN') and line references.\n5. Mermaid & React Rendering: The frontend renders the sequence into an interactive step timeline and live Mermaid.js diagram.",
          "actualImplementation": "Built in `backend/app/parser/sequence_extractor.py` and `frontend/src/components/sequence/SequenceView.tsx`.",
          "sourceFile": "backend/app/parser/sequence_extractor.py & frontend/src/components/sequence/SequenceView.tsx",
          "sourceFunction": "app.parser.sequence_extractor.extract_sequence_diagram & SequenceView",
          "realWorldExample": "Traces 'POST /api/v1/chats' through 'chats.py' -> 'service.py' -> 'Qdrant' -> 'OpenAI' -> 'PostgreSQL' with exact step numbers."
        },
        {
          "id": "cl-q-vis-2",
          "question": "How are the 5 visual view modes (Architecture, Dataflow, Sequence, Workflow, Lifecycle) structured and rendered?",
          "technicalExplanation": "CodeLens provides 5 specialized architectural perspectives:\n1. Architecture View: High-level system blueprint showing packages, controllers, services, database models, and external services arranged in hierarchical layers.\n2. Data Flow View: Illustrates how data inputs (REST requests, webhooks) transform through pipelines and persist into database tables.\n3. Sequence View: Step-by-step participant call chains illustrating the exact execution order of specific API endpoints.\n4. Workflow View: Business logic flowcharts showing branching logic, conditionals, and background job queues.\n5. Lifecycle View: Entity state-machine diagrams showing state transitions (e.g. Order: 'created' -> 'paid' -> 'shipped').\nAll 5 views share a normalized ReactFlow canvas core with custom node and edge renderers.",
          "actualImplementation": "View components in `frontend/src/components/` (architecture, dataflow, sequence, workflow, lifecycle).",
          "sourceFile": "frontend/src/components/architecture/ArchitectureMapPage.tsx & frontend/src/types/index.ts",
          "sourceFunction": "View switching in ArchitectureMapPage & workspace store",
          "realWorldExample": "A frontend engineer inspects the Architecture View for service boundaries, then switches to Sequence View to see how the login API authenticates tokens."
        },
        {
          "id": "cl-q-vis-3",
          "question": "How did you optimize canvas performance for large codebases with 500+ nodes and prevent browser layout thrashing?",
          "technicalExplanation": "60fps canvas performance on large graphs was achieved via three optimizations:\n1. Pre-Rendered Dagre Coordinates: Node coordinates (x, y) are computed once during graph load and cached in memory. Dagre does not run during pan, zoom, or drag events.\n2. ReactFlow Viewport Culling: ReactFlow v12 automatically unmounts off-screen nodes from the DOM, keeping active DOM node count below 50 regardless of total graph size.\n3. Memoized Edge Components: Custom 'ArchitectureEdge' components use 'React.memo' with custom comparison props, preventing re-renders unless source or target positions change.\n4. Debounced Minimap Navigation: The minimap preview canvas uses a throttled update listener (60ms), preventing high CPU consumption during rapid zooming.",
          "actualImplementation": "Implemented in `frontend/src/components/architecture/layout.ts` and `frontend/src/components/architecture/ArchitectureEdge.tsx`.",
          "sourceFile": "frontend/src/components/architecture/layout.ts & frontend/src/components/architecture/ArchitectureEdge.tsx",
          "sourceFunction": "getLayoutedElements & ArchitectureEdge",
          "realWorldExample": "Smooth 60 FPS performance maintained while navigating a 750-node enterprise monorepo graph on an ordinary laptop without GPU acceleration."
        },
        {
          "id": "cl-q-vis-4",
          "question": "How does CodeLens track background repository indexing progress, and how are partial ingestion failures handled?",
          "technicalExplanation": "Repository indexing runs as an asynchronous, resilient background pipeline:\n1. Status Progression: The 'repositories.index_status' column in PostgreSQL tracks progression:\n   'not_indexed' -> 'indexing' -> 'indexed' (or 'failed').\n2. Granular Metric Updates: As files are processed, the background worker updates 'file_count' and 'symbol_count' in PostgreSQL.\n3. Partial Failure Resilience: If an individual file fails to parse (e.g. corrupted syntax or unsupported encoding), the indexer catches the file exception, logs an indexing warning, and continues processing remaining files.\n4. Atomic Completion: Only when all files are parsed and vectors are committed to Qdrant does the status transition to 'indexed'. If a fatal crash occurs, status is set to 'failed' with error details.",
          "actualImplementation": "Handled in `backend/app/services/indexer.py`.",
          "sourceFile": "backend/app/services/indexer.py",
          "sourceFunction": "app.services.indexer.index_repository",
          "realWorldExample": "In a repository of 500 files where 2 test files contain intentional syntax errors, 498 files index successfully and the graph renders with an alert badge."
        }
      ]
    },
    {
      "id": "cl-cat-scenarios-scale",
      "name": "6. Scalability, Concurrency & Scenario-Based Questions",
      "description": "Handling 10x traffic, query optimization (N+1), database crashes, race conditions, and failure resilience.",
      "questions": [
        {
          "id": "cl-q-scen-1",
          "question": "How did you optimize database queries and prevent N+1 performance bottlenecks in CodeLens?",
          "technicalExplanation": "To guarantee sub-10ms relational database query latency:\n1. Foreign Key B-Tree Indexing: Created explicit B-tree indexes on frequently queried foreign key columns: 'repository_id', 'user_id', and 'conversation_id'.\n2. Eager Loading (selectinload & joinedload): Naive queries fetching a repository and its files trigger the N+1 problem (1 query for repo + N queries for files). I used SQLAlchemy's 'selectinload(Repository.files)' and 'joinedload(Conversation.messages)' to fetch nested entities in a single SQL query.\n3. Semi-Structured JSON Columns: Stored pre-computed architecture graphs in PostgreSQL 'JSON' columns ('architecture_graphs.graph_data'), eliminating the need to query thousands of individual node and edge rows over SQL JOINs.",
          "actualImplementation": "Eager loading in `backend/app/api/repositories.py` and model index definitions in `backend/app/db/models.py`.",
          "sourceFile": "backend/app/api/repositories.py & backend/app/db/models.py",
          "sourceFunction": "app.api.repositories.get_repository & app.db.models",
          "realWorldExample": "Loading a repository workspace previously issued 120 SQL queries taking 310ms; switching to eager loading reduced this to 2 queries executing in 6ms."
        },
        {
          "id": "cl-q-scen-2",
          "question": "How would you reduce project response time and time-to-first-token in the AI Copilot?",
          "technicalExplanation": "Time-to-first-token (TTFT) and response latency are minimized via:\n1. Server-Sent Events (SSE) Streaming: Tokens stream to the client as soon as OpenAI generates them, reducing perceived latency from 5+ seconds to under 250ms.\n2. Conversational Fast-Path: 'is_conversational_query' detects greetings and non-code queries, skipping Qdrant vector retrieval entirely.\n3. Qdrant Payload Indexing: Pre-filtering on 'repository_id' restricts vector search to a small subset of the collection, completing in under 45ms.\n4. Parallel Context Assembly: Context retrieval and prompt preparation execute concurrently using Python's 'asyncio'.",
          "actualImplementation": "Implemented in `backend/app/rag/service.py` and `backend/app/rag/prompts.py`.",
          "sourceFile": "backend/app/rag/service.py & backend/app/rag/prompts.py",
          "sourceFunction": "app.rag.service.stream_chat_response & app.rag.prompts.is_conversational_query",
          "realWorldExample": "Users see the AI response begin typing within 220ms, creating a fluid conversational experience."
        },
        {
          "id": "cl-q-scen-3",
          "question": "If memory consumption becomes high during repository parsing, what will you check?",
          "technicalExplanation": "If memory usage spikes during indexing, I investigate four specific areas:\n1. File Content Buffering: Check whether 'indexer.py' is loading entire multi-megabyte files into RAM simultaneously instead of streaming lines or chunking sequentially.\n2. Tree-Sitter AST Object Caching: Verify that Tree-Sitter AST tree references are deallocated after symbol extraction rather than accumulated in long-lived lists.\n3. Large Non-Code Assets: Verify that '.gitignore' patterns (e.g. 'node_modules', '.git', '*.png', '*.zip', '*.parquet') are strictly filtered out before parsing.\n4. Process Garbage Collection: Inspect whether Python's cyclic garbage collector needs explicit invocation ('gc.collect()') after parsing repositories exceeding 100k LoC.",
          "actualImplementation": "File filtering rules in `backend/app/services/indexer.py`.",
          "sourceFile": "backend/app/services/indexer.py",
          "sourceFunction": "app.services.indexer.index_repository & app.services.indexer._should_ignore",
          "realWorldExample": "Excluding 'node_modules' and compiled binaries reduced indexing memory consumption from 1.8GB to under 180MB on a medium-sized web app."
        },
        {
          "id": "cl-q-scen-4",
          "question": "If project performance becomes slow, where will you investigate first?",
          "technicalExplanation": "I conduct a systematic diagnostic investigation across the 4 tiers:\n1. Qdrant Vector Latency: Check Qdrant metrics to determine whether unindexed payload searches or high collection sizes are causing slow similarity queries.\n2. PostgreSQL Slow Query Log: Inspect 'pg_stat_statements' to identify sequential table scans or missing foreign key indexes on 'repository_access' or 'files'.\n3. OpenAI API Latencies: Verify whether external OpenAI API response latency is elevated or encountering HTTP 429 rate limits.\n4. Event Loop Blocking: Profile FastAPI using 'py-spy' to confirm that CPU-intensive Tree-Sitter parsing is not executing synchronously on the main ASGI event loop.",
          "actualImplementation": "Health readiness probe in `backend/app/api/health.py`.",
          "sourceFile": "backend/app/api/health.py",
          "sourceFunction": "app.api.health.health_check",
          "realWorldExample": "Using the health probe isolated a slow response to an external OpenAI rate limit delay rather than an internal database issue."
        },
        {
          "id": "cl-q-scen-5",
          "question": "What will happen if your project receives ten times more users and simultaneous repository indexing requests?",
          "technicalExplanation": "Scaling to 10x traffic requires addressing compute and concurrency bottlenecks:\n1. Background Worker Decoupling: In-process background tasks would saturate server CPU. I would migrate indexing jobs to a distributed task queue (Celery or Temporal) backed by Redis/RabbitMQ.\n2. Stateless API Horizontal Scaling: FastAPI containers are completely stateless; they scale horizontally behind an Nginx or AWS ALB load balancer.\n3. Qdrant Clustering & Sharding: Enable Qdrant distributed sharding across nodes, partitioning collections by 'repository_id' for parallel search throughput.\n4. PostgreSQL Read Replicas: Route read-heavy queries (dashboard, file trees, graph JSON) to read replicas while keeping writes on the primary database.",
          "actualImplementation": "Stateless architecture in `backend/app/main.py` ready for container replication.",
          "sourceFile": "backend/app/main.py & docker-compose.yml",
          "sourceFunction": "Horizontal scaling design",
          "realWorldExample": "Deploying 4 FastAPI worker containers behind a load balancer handles 20 concurrent repository indexing jobs without dropped requests."
        },
        {
          "id": "cl-q-scen-6",
          "question": "Suppose two users update or re-index the same repository simultaneously. What would happen?",
          "technicalExplanation": "Concurrency conflicts on repository indexing are managed cleanly:\n1. State Guard (Optimistic Check): When an indexing request arrives, the backend checks 'repository.index_status'. If status is already 'indexing', subsequent requests return '409 Conflict' with message 'Repository is currently being indexed'.\n2. Database Row Locking: In a high-concurrency production setup, use PostgreSQL 'SELECT ... FOR UPDATE' on the repository row to serialize state transitions.\n3. Idempotent Vector Upsert: Qdrant vector point IDs are deterministic hashes of '(repository_id, file_path, chunk_index)'. Even if dual indexing runs, vector points overwrite idempotently without creating duplicate embeddings.",
          "actualImplementation": "State checking in `backend/app/api/repositories.py`.",
          "sourceFile": "backend/app/api/repositories.py",
          "sourceFunction": "app.api.repositories.trigger_reindex",
          "realWorldExample": "Two developers clicking 'Re-index' at the exact same second are handled safely: the first triggers the pipeline, and the second receives a notification that indexing is already underway."
        },
        {
          "id": "cl-q-scen-7",
          "question": "What happens if one module (e.g., Qdrant vector database or Tree-Sitter parser) fails?",
          "technicalExplanation": "CodeLens is designed with graceful failure isolation:\n1. Qdrant Outage: If Qdrant goes down, the visual architecture canvas, file viewer, and sequence diagrams continue functioning 100% normally because they rely on PostgreSQL graph JSON. Only the AI chat copilot returns a graceful 503 error.\n2. Parser Failure on Individual File: If Tree-Sitter encounters an unsupported file or syntax bug, the indexer logs a warning, skips the single file, and continues indexing the rest of the codebase.\n3. OpenAI Outage / Invalid Key: If OpenAI fails or the user's BYOK key is invalid, the backend returns a clear UI notification: 'Invalid OpenAI API key. Please update your key in Settings.'",
          "actualImplementation": "Exception handling blocks in `backend/app/rag/service.py` and `backend/app/services/indexer.py`.",
          "sourceFile": "backend/app/rag/service.py & backend/app/services/indexer.py",
          "sourceFunction": "app.rag.service.stream_chat_response & app.services.indexer.index_repository",
          "realWorldExample": "A vector database restart does not prevent engineers from inspecting architecture diagrams or reviewing code files."
        },
        {
          "id": "cl-q-scen-8",
          "question": "How does CodeLens guarantee high availability during OpenAI rate limits and API service outages?",
          "technicalExplanation": "The platform implements defensive resilience against external LLM rate limits:\n1. Exponential Backoff with Jitter: When OpenAI returns HTTP 429 Too Many Requests, the client retries with exponential backoff (1s, 2s, 4s) plus randomized jitter.\n2. BYOK Rate Limit Isolation: Because each user provides their own OpenAI API key, one user exhausting their personal rate limit never impacts other users on the platform.\n3. Ingestion Batching: Vector embeddings are generated in batches of 32 chunks, staying well below OpenAI's Tier 1 Requests-Per-Minute (RPM) thresholds.\n4. Offline Mock Key Support: Supports mock keys ('sk-MOCK_...') for automated end-to-end testing and CI/CD pipelines without incurring OpenAI API charges.",
          "actualImplementation": "Rate limit catching in `backend/app/rag/service.py` and mock handling.",
          "sourceFile": "backend/app/rag/service.py",
          "sourceFunction": "app.rag.service.stream_chat_response",
          "realWorldExample": "A student on a free OpenAI tier encountering a rate limit receives an informative prompt to wait 20 seconds, while other active users continue uninterrupted."
        },
        {
          "id": "cl-q-scen-9",
          "question": "What would you do if the PostgreSQL database crashes?",
          "technicalExplanation": "A comprehensive disaster recovery strategy ensures data resilience:\n1. Automated Volume Backups: In production, PostgreSQL runs on managed cloud storage with automated daily WAL (Write-Ahead Logging) snapshots and point-in-time recovery (PITR).\n2. Container Health Recovery: Docker Compose and Kubernetes define restart policies ('restart: unless-stopped') that automatically reboot crashed database containers.\n3. Stateless Codebase Regeneration: Because CodeLens is designed around git repositories, even in a total database loss scenario, repositories can be re-cloned and re-indexed from GitHub in minutes.\n4. Connection Pool Self-Healing: SQLAlchemy engine uses 'pool_pre_ping=True', automatically discarding stale connections when the database restarts.",
          "actualImplementation": "Engine resilience configured in `backend/app/db/session.py`.",
          "sourceFile": "backend/app/db/session.py",
          "sourceFunction": "create_engine with pool_pre_ping=True",
          "realWorldExample": "When PostgreSQL restarts after a server update, FastAPI reconnects automatically on the very next HTTP request without requiring a manual server restart."
        },
        {
          "id": "cl-q-scen-10",
          "question": "What if users enter invalid repository URLs or malicious code files?",
          "technicalExplanation": "Incoming user repositories are validated defensively:\n1. URL & Git Remote Verification: 'git_service.py' verifies that repository URLs match valid GitHub HTTPS patterns before dispatching git clone commands.\n2. Sandboxed File Extraction: Repositories are cloned into ephemeral temporary folders. File traversals strictly verify that resolved paths remain inside the sandbox.\n3. Safe Non-Executing AST: Code files are parsed purely as text syntax bytes by Tree-Sitter; no code is executed, preventing shell injections or malicious script execution.\n4. File Size Limits: Files exceeding 1MB or containing binary characters are skipped automatically, preventing memory exhaustion attacks.",
          "actualImplementation": "Validation in `backend/app/services/git_service.py` and `backend/app/services/indexer.py`.",
          "sourceFile": "backend/app/services/git_service.py & backend/app/services/indexer.py",
          "sourceFunction": "app.services.git_service.clone_repository & app.services.indexer._safe_read_file",
          "realWorldExample": "Entering a URL with shell metacharacters like 'https://github.com/foo/bar; rm -rf /' fails regex validation immediately with a 400 Bad Request."
        },
        {
          "id": "cl-q-scen-11",
          "question": "How would you improve project security and enterprise compliance?",
          "technicalExplanation": "To achieve enterprise SOC2 and HIPAA compliance:\n1. Ephemeral Code Storage: Remove raw source code from PostgreSQL's 'files.content' column, storing only AST symbol metadata and vector embeddings to guarantee zero source code persistence at rest.\n2. Role-Based Access Control (RBAC): Expand permissions into granular roles: Organization Admin, Team Architect, and Read-Only Developer.\n3. Secret Scrubbing on Ingestion: Integrate tools like 'trufflehog' or 'gitleaks' during repo ingestion to detect and redact API keys or database passwords committed in code.\n4. Audit Logging: Maintain an immutable audit log recording who viewed, queried, or exported architecture diagrams.",
          "actualImplementation": "Architectural roadmap outlined in `phase7_improvements.js`.",
          "sourceFile": "src/data/projects/codeLens/phase7_improvements.js",
          "sourceFunction": "Security Hardening Roadmap",
          "realWorldExample": "Enterprise clients can securely index proprietary codebases with guaranteed ephemeral processing and zero plain source retention."
        }
      ]
    },
    {
      "id": "cl-cat-testing-deploy",
      "name": "7. Testing, Debugging & Production Deployment",
      "description": "Integration testing, most difficult bug diagnosis, development challenges, and Docker containerization.",
      "questions": [
        {
          "id": "cl-q-test-1",
          "question": "How did you test your project?",
          "technicalExplanation": "Testing was structured across three automated layers using Pytest and Jest/Vitest:\n1. Unit Testing (AST Parsers): Tested Tree-Sitter visitors on synthetic code snippets across all 5 languages, asserting exact extraction of classes, functions, and parameters.\n2. RAG & Retrieval Mocking: Mocked OpenAI completions and Qdrant similarity searches using 'sk-MOCK_' keys to verify prompt generation, citation parsing, and SSE streaming without incurring API fees.\n3. Integration Tests: Tested end-to-end repository indexing on a fixture git repository, asserting that PostgreSQL tables ('repositories', 'files', 'architecture_graphs') populated with valid foreign key cascades.\n4. Frontend Canvas Testing: Verified Dagre layout calculations and node position outputs using Vitest.",
          "actualImplementation": "Test suites structured in `backend/tests/` and frontend unit tests.",
          "sourceFile": "backend/tests/ & frontend/package.json",
          "sourceFunction": "Pytest test cases & Vitest runners",
          "realWorldExample": "A test asserts that a Python file containing 3 classes and 8 methods produces exactly 11 symbols and 1 ArchNode with high confidence."
        },
        {
          "id": "cl-q-test-2",
          "question": "How would you design an automated integration test suite for the Tree-Sitter AST parser and RAG pipeline?",
          "technicalExplanation": "An automated integration test pipeline requires:\n1. Golden Sample Repositories: Maintain a small test repository fixture containing known classes, cyclic imports, route handlers, and database models.\n2. AST Assertion: Run 'build_knowledge_graph(fixture_files)', asserting:\n   - Node count equals expected entity count.\n   - Cyclic import edges are flagged with 'relationship_type=\"circular_dependency\"'.\n3. Retrieval Precision Assertion: Query Qdrant with known architectural questions (e.g. 'How is auth verified?'), asserting that 'backend/app/core/security.py' ranks in the top 3 results.\n4. Citation Syntax Validation: Assert that the generated response passes 'parse_citations_from_response' with zero broken file paths.",
          "actualImplementation": "Integration test structure designed for CI/CD.",
          "sourceFile": "backend/tests/",
          "sourceFunction": "test_ast_knowledge_graph & test_rag_pipeline",
          "realWorldExample": "CI/CD runs this suite on every GitHub pull request, ensuring no regression in AST extraction or citation accuracy."
        },
        {
          "id": "cl-q-test-3",
          "question": "Which module in your project was most difficult to build?",
          "technicalExplanation": "The most difficult module was the Multi-Language Tree-Sitter AST Visitor & Dependency Resolver:\n1. Language Grammar Inconsistencies: Python uses indentation and colons; TypeScript uses braces, interfaces, and decorators; Go uses package-level scopes; Java uses explicit package hierarchies. Normalizing these into a single unified 'ArchNode' schema required custom grammar visitors for each language.\n2. Import Path Resolution: Resolving Python relative imports ('from ..services import auth') vs TypeScript path aliases ('@/components/ui/button') required building a custom virtual file index ('FileIndex') that maps import specifiers to real repository file paths.\n3. Cyclic Import Loops: Preventing infinite loops during dependency traversal required implementing Tarjan's Strongly Connected Components algorithm.",
          "actualImplementation": "Built in `backend/app/parser/dependency_resolver.py` and `backend/app/parser/knowledge_graph.py`.",
          "sourceFile": "backend/app/parser/dependency_resolver.py & backend/app/parser/knowledge_graph.py",
          "sourceFunction": "app.parser.dependency_resolver.resolve_python_import & app.parser.knowledge_graph.build_knowledge_graph",
          "realWorldExample": "Resolving '@components/auth' to 'frontend/src/components/auth/index.tsx' correctly required parsing 'tsconfig.json' compiler paths."
        },
        {
          "id": "cl-q-test-4",
          "question": "What challenges did you face during development?",
          "technicalExplanation": "Key engineering hurdles overcome during development:\n1. Tree-Sitter Version Migrations: Tree-Sitter 0.22 transitioned from C compilation scripts to native pre-built language wheels ('tree-sitter-python', etc.), requiring a complete overhaul of parser initialization.\n2. Real-Time Token Streaming with Citations: Streaming tokens over SSE while simultaneously verifying line-level citations required a two-pass parser that yields tokens dynamically and emits a final 'complete' event with structured sources.\n3. ReactFlow 60 FPS Performance: Prevented canvas lag on 500+ nodes by decoupling layout calculation (Dagre) from interactive canvas state (ReactFlow).",
          "actualImplementation": "Parser caching in `backend/app/parser/ast_parser.py` and SSE events in `backend/app/rag/service.py`.",
          "sourceFile": "backend/app/parser/ast_parser.py & backend/app/rag/service.py",
          "sourceFunction": "app.parser.ast_parser._init_parser & app.rag.service.stream_chat_response",
          "realWorldExample": "Diagnosed a 12-second canvas freeze and reduced it to 28ms by eliminating inline Dagre calculations on React state updates."
        },
        {
          "id": "cl-q-test-5",
          "question": "What was the most challenging technical bug you encountered while building CodeLens, and how did you diagnose and resolve it?",
          "technicalExplanation": "The most challenging technical bug was the Circular AST Recursion & Canvas Freeze:\n1. Symptom: Indexing a legacy repository crashed the backend with 'RecursionError: maximum recursion depth exceeded', while the frontend froze when trying to render the resulting graph.\n2. Root Cause Diagnosis: The dependency resolver recursively followed import statements without maintaining a visited set. Two files importing each other ('models.py' <-> 'session.py') caused an infinite recursive loop. In the frontend, Dagre attempted to compute hierarchical ranks on a cyclic graph without cycle-breaking.\n3. Resolution:\n   - Backend: Implemented Tarjan's Strongly Connected Components (SCC) algorithm, tracking visited nodes and breaking cycle edges into flagged 'circular_dependency' relationships.\n   - Frontend: Clustered nodes by architectural layer before computing Dagre coordinates and memoized the layout hook.",
          "actualImplementation": "Cycle detection in `backend/app/parser/knowledge_graph.py` and layout memoization in `frontend/src/components/architecture/layout.ts`.",
          "sourceFile": "backend/app/parser/knowledge_graph.py & frontend/src/components/architecture/layout.ts",
          "sourceFunction": "app.parser.knowledge_graph.build_knowledge_graph & layout.getLayoutedElements",
          "realWorldExample": "Memory usage dropped by 64%, and graph layout computation speed increased by 400x (from 12s to 28ms)."
        },
        {
          "id": "cl-q-test-6",
          "question": "Which feature took more time than expected?",
          "technicalExplanation": "The Automated Request-to-Database Sequence Extractor took twice as long as anticipated:\n1. Why it was difficult: Tracing execution across files requires more than simple import resolution. The extractor must follow function calls from an API route decorator ('@router.post'), into service method invocations, through dependency-injected database sessions, down to SQLAlchemy ORM queries.\n2. Async & Await Nuances: Differentiating between synchronous function calls and asynchronous coroutines ('await service.call()') required inspecting Tree-Sitter AST call node parentage.\n3. Outcome: The extra effort resulted in a standout feature: automated Mermaid sequence diagram reconstruction without requiring runtime instrumentation.",
          "actualImplementation": "Built in `backend/app/parser/sequence_extractor.py`.",
          "sourceFile": "backend/app/parser/sequence_extractor.py",
          "sourceFunction": "app.parser.sequence_extractor.extract_sequence_diagram",
          "realWorldExample": "Accurately distinguishes between an internal helper method and an asynchronous database query across 3 nested files."
        },
        {
          "id": "cl-q-test-7",
          "question": "What mistake did you make during development?",
          "technicalExplanation": "An architectural mistake I made early on was attempting to compute Dagre graph layouts on the backend:\n1. The Mistake: I originally ran Dagre layout algorithms in Python on the backend and saved exact (x, y) coordinates into PostgreSQL.\n2. Why it Failed: Screen resolutions, node expanding/collapsing, and viewport dimensions differ between client displays (e.g. mobile vs 4K desktop monitor). Fixed backend coordinates caused distorted layouts and overlapping text in the React browser.\n3. The Fix: Shifted layout calculation to the frontend: the backend returns clean normalized graph topology ('nodes', 'edges'), and the frontend's 'layout.ts' calculates optimal coordinates dynamically based on the user's viewport.",
          "actualImplementation": "Frontend layout computation in `frontend/src/components/architecture/layout.ts`.",
          "sourceFile": "frontend/src/components/architecture/layout.ts",
          "sourceFunction": "getLayoutedElements",
          "realWorldExample": "Moving layout to the client enabled instant rank toggling (Top-to-Bottom vs Left-to-Right) without making network requests."
        },
        {
          "id": "cl-q-test-8",
          "question": "What assumptions did you make while building the project?",
          "technicalExplanation": "Key assumptions made during architecture and scoping:\n1. Text-Based Source Code: Assumed repository files are UTF-8 text files; added defensive checks to skip compiled binaries and images.\n2. Standard Repository Layouts: Assumed common package structures (e.g., 'src/', 'app/', 'lib/'). Added fallbacks for flat and monorepo codebases.\n3. LLM API Availability: Assumed the user provides an active OpenAI API key with sufficient quota; added clear UI error banners for quota exhaustion.\n4. Ephemeral Web Worker Lifecycles: Assumed browser environments have modern Web Worker and Canvas support (Chrome, Firefox, Safari).",
          "actualImplementation": "Validated across ingestion filters in `backend/app/services/indexer.py`.",
          "sourceFile": "backend/app/services/indexer.py",
          "sourceFunction": "app.services.indexer._safe_read_file",
          "realWorldExample": "Gracefully ignores binary '.pyc' files that might have been accidentally committed to a repository."
        },
        {
          "id": "cl-q-test-9",
          "question": "How is CodeLens containerized and deployed with Docker and environment variables?",
          "technicalExplanation": "The system is fully containerized via Docker and Docker Compose:\n1. Multi-Stage Dockerfile: Uses Python 3.11-slim, installing Tree-Sitter C compilers in a build stage and copying compiled wheels into a minimal runtime image.\n2. Orchestration (docker-compose.yml): Coordinates three decoupled services:\n   - 'backend': FastAPI app running on port 8000 via Uvicorn.\n   - 'postgres': PostgreSQL 16 image with persistent Docker volume storage.\n   - 'qdrant': Qdrant vector database running on ports 6333 (HTTP) and 6334 (gRPC).\n3. Environment Variable Hierarchy: Managed via '.env':\n   - 'DATABASE_URL', 'QDRANT_URL', 'ENCRYPTION_SECRET_KEY', 'JWT_SECRET_KEY', 'GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET'.",
          "actualImplementation": "Configured in `docker-compose.yml` and `backend/app/core/config.py`.",
          "sourceFile": "docker-compose.yml & backend/app/core/config.py",
          "sourceFunction": "Docker Compose orchestration & app.core.config.Settings",
          "realWorldExample": "Running 'docker-compose up -d' launches the full distributed system in under 20 seconds on any fresh developer machine."
        },
        {
          "id": "cl-q-test-10",
          "question": "How would you deploy this project for real enterprise production users?",
          "technicalExplanation": "For production deployment at enterprise scale:\n1. Container Hosting (AWS ECS / Kubernetes): Deploy the FastAPI backend across an autoscaling container cluster behind an Application Load Balancer (ALB).\n2. Managed Databases: Use AWS RDS PostgreSQL (Multi-AZ with automated backups) and Qdrant Cloud or a dedicated Qdrant cluster on Kubernetes.\n3. Distributed Task Queue: Move repository ingestion to Celery or Temporal workers with Redis message brokers, isolating long-running git clones from API servers.\n4. CDN Frontend: Build the Vite React application as static assets deployed to AWS CloudFront / Vercel with global edge caching.",
          "actualImplementation": "Production deployment roadmap in `phase7_improvements.js`.",
          "sourceFile": "src/data/projects/codeLens/phase7_improvements.js",
          "sourceFunction": "Production Hardening Roadmap",
          "realWorldExample": "Enables CodeLens to handle thousands of concurrent developers across multiple enterprise organizations with 99.9% uptime."
        }
      ]
    },
    {
      "id": "cl-cat-retrospective",
      "name": "8. Engineering Retrospective, Trade-offs & Future Scope",
      "description": "Lessons learned, architecture re-design decisions, scope management under deadlines, and future roadmap.",
      "questions": [
        {
          "id": "cl-q-retro-1",
          "question": "If you restart the project today, what would you change?",
          "technicalExplanation": "With the experience gained from building CodeLens, I would implement two changes:\n1. Incremental Git Commit Diffing from Day One: Rather than re-indexing entire repositories when a new commit is pushed, use 'git diff' to re-parse only changed files and update affected Qdrant vector points in place.\n2. Web Workers for Dagre Layout: Move the Dagre layout calculations into a dedicated Web Worker on the client to completely isolate heavy graph math from the main UI thread.",
          "actualImplementation": "Outlined in `phase7_improvements.js` under Production Hardening Roadmap.",
          "sourceFile": "src/data/projects/codeLens/phase7_improvements.js",
          "sourceFunction": "Production Hardening Roadmap",
          "realWorldExample": "Incremental diffing would reduce re-indexing time from 30 seconds to 1.2 seconds for routine 3-file commits."
        },
        {
          "id": "cl-q-retro-2",
          "question": "Which decision in the project would you change now?",
          "technicalExplanation": "I would reconsider storing full source code in PostgreSQL's 'files.content' column:\n1. Original Decision: Saved raw source code text in PostgreSQL to enable instant code viewer modal inspection.\n2. The Problem: For repositories with 50,000 files, the database size balloons rapidly, increasing backup times and RAM usage.\n3. The Better Approach: Store only symbol metadata and AST line coordinates in PostgreSQL, fetching raw source code on-demand from the GitHub API or a temporary cached object store (AWS S3) when the user clicks a citation.",
          "actualImplementation": "Discussed in `phase7_improvements.js` under Architectural Bottlenecks.",
          "sourceFile": "src/data/projects/codeLens/phase7_improvements.js",
          "sourceFunction": "Audit Category 3",
          "realWorldExample": "Reduces PostgreSQL database storage footprint by 80% across 1,000 indexed repositories."
        },
        {
          "id": "cl-q-retro-3",
          "question": "If you could re-architect one component of CodeLens from scratch today, what would it be and why?",
          "technicalExplanation": "I would re-architect the background indexing orchestration:\n1. Current Architecture: Uses FastAPI's in-process 'BackgroundTasks', which runs in a thread pool within the same ASGI process.\n2. Why it Needs Redesign: Heavy git clones and Tree-Sitter AST parsing compete for CPU cycles with incoming REST requests and SSE streaming connections.\n3. The New Architecture: Decouple into an asynchronous event-driven worker architecture using Celery/RabbitMQ or Temporal, allowing indexing workers to scale independently from web API servers.",
          "actualImplementation": "Documented in `phase7_improvements.js` under Architectural Bottlenecks.",
          "sourceFile": "src/data/projects/codeLens/phase7_improvements.js",
          "sourceFunction": "Audit Category 3",
          "realWorldExample": "A burst of 10 repository indexing requests would queue cleanly in RabbitMQ without impacting API responsiveness."
        },
        {
          "id": "cl-q-retro-4",
          "question": "What feature would you remove if the deadline becomes shorter?",
          "technicalExplanation": "Under strict deadline constraints, I would temporarily remove the Entity Lifecycle View:\n1. Why: While the Architecture, Sequence, and Data Flow views are essential for understanding codebase structure and API lifecycles, the Lifecycle View (state machines) only applies to specific domain entities (e.g. Order, Payment).\n2. Impact: Removing Lifecycle View reduces parsing scope while preserving 95% of CodeLens's core architectural and copilot capabilities.",
          "actualImplementation": "Modular view isolation in `frontend/src/components/lifecycle/LifecycleView.tsx`.",
          "sourceFile": "frontend/src/components/lifecycle/LifecycleView.tsx",
          "sourceFunction": "LifecycleView",
          "realWorldExample": "Allows the core AST knowledge graph and AI Copilot to ship 2 weeks earlier without compromising core functionality."
        },
        {
          "id": "cl-q-retro-5",
          "question": "What feature would you add with one extra month?",
          "technicalExplanation": "With one extra month of engineering runway, I would add Automated PR Architecture Impact Auditing (CI/CD Bot):\n1. GitHub Action Integration: A GitHub Action that runs CodeLens against Pull Requests before they are merged.\n2. Automated Blast Radius Comment: Automatically comments on the PR with an interactive visual diff: 'This PR modifies AuthService. Blast Radius: 12 impacted endpoints, 2 cyclic dependencies detected.'\n3. Architectural Linter: Flags architectural rule violations (e.g. 'Controllers must not query Database Models directly, use Service layer').",
          "actualImplementation": "Planned CI/CD expansion building on `backend/app/parser/blast_radius.py`.",
          "sourceFile": "backend/app/parser/blast_radius.py",
          "sourceFunction": "app.parser.blast_radius.compute_blast_radius",
          "realWorldExample": "Teams catch architectural decay and accidental circular imports in PR code reviews before merging to main."
        }
      ]
    }
  ]
};
