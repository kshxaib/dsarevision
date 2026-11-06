// AcademicStack Technical Interview Preparation
// Ordered from fundamental project concepts to advanced architecture and scenarios

export const phase4And5Questions = {
  "title": "Phase 4 & 5: Complete Question Bank & Code-Grounded Answers",
  "summary": "Comprehensive technical interview questions ordered logically from project fundamentals to advanced architecture, RAG, and scalability scenarios.",
  "totalQuestions": 59,
  "categories": [
    {
      "id": "cat-overview",
      "name": "1. Project Overview & Fundamentals",
      "description": "Basic introduction, core objectives, motivation, tech stack choices, and candidate role.",
      "questions": [
        {
          "id": "q-core-1",
          "question": "Can you explain your project in simple terms?",
          "technicalExplanation": "AcademicStack is an end-to-end AI exam intelligence and revision platform designed specifically for university engineering students.\nIn universities, semester exams are heavily dominated by 50–60 recurring past-paper questions, but finding accurate, syllabus-aligned textbook answers, standard formulas, and diagrams manually takes 5–6 hours per exam. Generic LLMs fail here because they hallucinate generic internet definitions and completely break university mark scaling (e.g. writing a 500-word essay for a 2-mark definition).\nAcademicStack solves this:\n1. Grounded Ingestion: Students upload their official syllabus textbook PDFs, which are chunked and indexed into a specialized Qdrant vector store.\n2. Two-Stage Solver: A Draft Generator synthesizes answers strictly grounded in textbook pages with exact citations, while an Academic Reviewer persona enforces rigid mark constraints (5–7 lines for 2 marks, ~250 words + Mermaid diagram for 10 marks).\n3. Publication PDF Engine: A headless ReportLab compilation pipeline generates pixel-perfect revision booklets with Computer Modern LaTeX math formulas and two-column Rapid Recall Cheatsheets, compressing 5–6 hours of manual preparation into under 15 minutes.",
          "actualImplementation": "FastAPI handles asynchronous request routing, Qdrant stores 1536-dim vector embeddings, LangChain coordinates GPT-4o-mini and GPT-4o, and ReportLab compiles PDFs in `as-backend/app/pdf/generator.py`.",
          "sourceFile": "as-backend/app/main.py & as-backend/app/rag/service.py",
          "sourceFunction": "app.rag.service.generate_rag_answer & app.pdf.generator.generate_pdf",
          "realWorldExample": "Before a Distributed Systems exam, a student uploads Tanenbaum's textbook and 3 past semester papers. The system indexes the book, isolates the vectors, answers all 60 questions with textbook page citations, and renders a 22-page printable cheatsheet in 12 minutes."
        },
        {
          "id": "q-core-2",
          "question": "What problem does your project solve?",
          "technicalExplanation": "AcademicStack addresses three critical systemic breakdowns in university examination preparation:\n1. The Hallucination & Syllabus Divergence Problem: University professors grade strictly on textbook terminology and standard diagrams. Generic LLMs hallucinate non-syllabus concepts. AcademicStack guarantees 100% citation grounding by isolating vector search strictly to uploaded textbook PDFs via Qdrant payload filters.\n2. The Mark Scaling Collapse: University exams have strict mark weightings (2-mark definitions, 5-mark short notes, 10-mark architectural breakdowns). LLMs fail this completely. We implemented dynamic prompt directives and a two-stage adversarial reviewer persona to strictly enforce line and word limits.\n3. The Manual Prep Bottleneck: Finding, cross-referencing, verifying, and writing answers for 50-60 past university paper questions takes an engineering student 5–6 hours per subject. AcademicStack automates the entire search, synthesis, and publication layout workflow in under 15 minutes.",
          "actualImplementation": "Two-stage prompt engineering in `as-backend/app/rag/prompts.py` enforces mark-specific directives, while payload filtering in `as-backend/app/rag/retriever.py` ensures textbook-only grounding.",
          "sourceFile": "as-backend/app/rag/prompts.py & as-backend/app/rag/service.py",
          "sourceFunction": "app.rag.prompts.get_directives_for_marks & app.rag.service.generate_rag_answer",
          "realWorldExample": "In a 2-mark question 'Define BGP routing', generic ChatGPT outputs a 4-paragraph history of the internet. AcademicStack outputs exactly 1 definition sentence and 2 bold bullet points in 6 lines, matching the university mark rubric."
        },
        {
          "id": "q-core-3",
          "question": "Why did you choose this project topic?",
          "technicalExplanation": "I chose this project because it solved a personal, high-friction pain point that I and my engineering classmates faced every single semester.\nBefore every semester exam, students receive previous-year question banks with 50 to 60 questions. Searching through 800-page textbooks, copying definitions, formatting formulas, and drawing diagrams manually consumed 5–6 hours per subject, leaving little time for actual conceptual memorization.\nWhen students tried ChatGPT, they were penalized by professors because generic LLMs lacked standard textbook definitions and hallucinated non-syllabus formulas. I recognized that combining Retrieval-Augmented Generation (RAG) with strict mark calibration directives and a publication-grade PDF rendering engine would create a real, high-impact tool for thousands of students.",
          "actualImplementation": "Built as an open-source platform with Bring-Your-Own-Key (BYOK) encryption so students can run high-volume exam revision without platform cost bottlenecks.",
          "sourceFile": "as-backend/app/auth/security.py & as-backend/app/indexing/service.py",
          "sourceFunction": "app.auth.security.encrypt_api_key & app.indexing.service.index_pdf_resource",
          "realWorldExample": "Across 6 engineering semesters with 6 subjects each, a student spends ~180 hours manually compiling answers. AcademicStack cuts this to under 9 hours total across an entire engineering degree."
        },
        {
          "id": "q-core-4",
          "question": "What technologies did you use and why?",
          "technicalExplanation": "I selected technologies based on architectural decoupling, performance, and specific engineering requirements:\n1. FastAPI (Python): Chosen for asynchronous ASGI concurrency, native Pydantic data validation, and superior I/O throughput when streaming large PDF uploads and coordinating LLM API calls.\n2. PostgreSQL with SQLAlchemy 2.0: Chosen for relational ACID guarantees to manage structured relationships: Users, Resources, QuestionBanks, Questions, and AnswerSets with cascading deletes.\n3. Qdrant Vector Database: Chosen over pgvector because Qdrant is written in Rust, provides SIMD-accelerated HNSW index memory isolation, and natively supports payload filtering (filtering by metadata.resource_id) during graph traversal without performance penalties.\n4. LangChain & OpenAI (GPT-4o / GPT-4o-mini / text-embedding-3-small): Dual-model strategy leveraging GPT-4o-mini for cheap, low-latency initial drafting and GPT-4o for high-reasoning mark-review and math formatting.\n5. ReportLab & Matplotlib MathTextParser: Chosen over headless browsers (Puppeteer) because ReportLab generates deterministic, lightweight binary PDFs with exact baseline alignment for Computer Modern LaTeX equations.\n6. React 19, Tailwind CSS v4 & Zustand: Reactive, lightweight single-page application with optimistic UI updates and live KaTeX preview.",
          "actualImplementation": "Decoupled architecture split between `as-backend/` (FastAPI, Qdrant, PostgreSQL, ReportLab) and `as-frontend/` (React 19, Vite, Tailwind v4, Zustand).",
          "sourceFile": "as-backend/requirements.txt & as-frontend/package.json",
          "sourceFunction": "Architectural component manifests across both workspaces",
          "realWorldExample": "Using Qdrant decoupled from PostgreSQL ensures that when 100 students query dense 1536-dimensional textbook embeddings, PostgreSQL buffer caches are not polluted, allowing user auth and progress lookups to execute in under 3ms."
        },
        {
          "id": "q-core-6",
          "question": "What was your role in the project?",
          "technicalExplanation": "I was the sole author and full-stack software engineer responsible for the entire project lifecycle from ideation to production engineering:\n1. System Design: Architected the 4-tier decoupled distributed system (React 19 SPA, FastAPI microservice, PostgreSQL, Qdrant vector store).\n2. Backend & AI Engineering: Designed PostgreSQL relational schemas, built async REST API endpoints, integrated PyMuPDF document ingestion, implemented Qdrant payload-filtered retrieval, and engineered the dual-stage LangChain prompt pipeline.\n3. Document Systems Engineering: Developed the headless ReportLab PDF compilation pipeline, including custom Computer Modern LaTeX math rasterization and Kroki Mermaid diagram auto-repair.\n4. Security & BYOK: Built the Fernet AES-128-CBC encryption module for user OpenAI keys and implemented JWT stateless authentication.\n5. Frontend Development: Built the React 19 UI with Tailwind CSS v4, Zustand stores, optimistic state management, and real-time polling progress indicators.",
          "actualImplementation": "Authored 100% of both repositories: `as-backend/` (FastAPI backend) and `as-frontend/` (React frontend).",
          "sourceFile": "as-backend/app/ & as-frontend/src/",
          "sourceFunction": "Full repository ownership across all modules",
          "realWorldExample": "Engineered everything from database foreign key cascade configurations in SQLAlchemy to the visual dark-mode KaTeX preview and multi-step exam simulation tools in React."
        },
        {
          "id": "q-core-10",
          "question": "What feature are you most proud of?",
          "technicalExplanation": "I am most proud of the Dynamic Exam Blueprint Predictor ('as-backend/app/predictor/service.py').\nUnlike standard question bank tools that rely on rigid, hardcoded question templates for specific universities, our blueprint predictor is completely template-free:\n1. Ingests 2 to 10 past exam PDFs, extracting text via PyMuPDF or GPT-4o Vision OCR for scanned papers.\n2. Performs an automated structural audit: detects maximum marks, time duration, section hierarchies, and question numbering patterns.\n3. Calculates topic repetition frequency across historical years, detecting which textbook chapters the university consistently emphasizes.\n4. Enforces the 'Choice Question Mandatory Pool Rule': if Q.1 states 'Answer any four (05 marks each)', the synthesizer generates all 6 sub-questions in the options pool, producing a synthesized upcoming predicted exam paper with authentic university formatting.",
          "actualImplementation": "`as-backend/app/predictor/service.py:predict_blueprint` coordinates structural analysis, topic frequency weighting, and predicted question paper synthesis.",
          "sourceFile": "as-backend/app/predictor/service.py",
          "sourceFunction": "app.predictor.service.predict_blueprint",
          "realWorldExample": "Analyzing 4 past semester papers of Database Systems correctly identified that ER diagrams and B+ Trees appeared in 100% of previous Q.1 and Q.3 sections, allowing the predictor to synthesize a 90% accurate upcoming exam paper structure."
        },
        {
          "id": "q-res-1",
          "question": "Why did you include this project in your resume?",
          "technicalExplanation": "I featured AcademicStack because it demonstrates comprehensive, end-to-end full-stack software engineering rather than just a trivial wrapper around the OpenAI API:\n1. Distributed Data Architecture: Successfully decoupled relational transactional data (PostgreSQL) from high-dimensional vector search (Qdrant in Rust), using native payload filtering for multi-tenant syllabus isolation.\n2. Advanced AI Systems Engineering: Designed a dual-stage adversarial RAG pipeline (Draft Generator + Academic Reviewer) that solves mark-weighted answer scaling and eliminates hallucination via page-grounded citations.\n3. Headless Document Typography: Engineered a publication-grade ReportLab PDF engine solving complex math baseline typography with Matplotlib MathTextParser and Kroki Mermaid diagram auto-repair.\n4. Security & Cryptography: Implemented client-side Bring-Your-Own-Key (BYOK) architecture with Fernet symmetric AES-128-CBC encryption, stateless JWT auth, and Bcrypt password hashing.\nIt showcases my ability to identify a real-world friction point and build a production-quality, performant solution.",
          "actualImplementation": "Full codebase spans `as-backend/` (FastAPI, Qdrant, SQLAlchemy, ReportLab) and `as-frontend/` (React 19, Tailwind v4, Zustand).",
          "sourceFile": "as-backend/app/ & as-frontend/src/",
          "sourceFunction": "Multi-tier architecture and full repository implementation",
          "realWorldExample": "Interviewers frequently remark that building a custom ReportLab math typography engine with baseline depth calculation demonstrates far deeper low-level engineering than standard web CRUD apps."
        },
        {
          "id": "q-res-8",
          "question": "How easy is it for another developer to understand your project?",
          "technicalExplanation": "The codebase was intentionally structured for rapid developer onboarding following industry best practices:\n1. Modular Domain Architecture: Clear domain-separated package layout in 'as-backend/app/': '/auth' for security, '/db' for SQLAlchemy models, '/indexing' for PyMuPDF chunking, '/rag' for LangChain pipelines, '/pdf' for ReportLab generators, and '/predictor' for exam audits.\n2. Explicit Schemas & Type Hinting: 100% of API inputs and outputs are documented with Pydantic v2 schemas and Python type hints, generating automatic interactive Swagger documentation at '/docs'.\n3. Clear Separation of Concerns: Routes ('routes.py') handle HTTP serialization, services ('service.py') encapsulate business logic, and models ('models.py') represent relational state.\n4. Comprehensive Configuration & Logging: Centralized settings via 'pydantic-settings' in 'config.py' reading from '.env', with structured logging on all asynchronous tasks.",
          "actualImplementation": "Clean architectural separation in `as-backend/app/` with Swagger OpenAPI schema generation.",
          "sourceFile": "as-backend/app/main.py & as-backend/app/config.py",
          "sourceFunction": "FastAPI application initialization and Pydantic settings loading",
          "realWorldExample": "A new engineer can clone the repository, run `docker-compose up`, visit `http://localhost:8000/docs`, and immediately execute authenticated document indexing within 5 minutes."
        }
      ]
    },
    {
      "id": "cat-architecture",
      "name": "2. System Architecture & High-Level Design",
      "description": "End-to-end architecture, API lifecycle, FastAPI backend structure, and Zustand frontend state.",
      "questions": [
        {
          "id": "q-arch-1",
          "question": "Can you walk me through the high-level system architecture of AcademicStack and how data flows from a student's PDF upload to a compiled publication study book?",
          "difficulty": "Hard",
          "whyAsked": "Evaluates the candidate's macro-level architectural vision, understanding of decoupling, data lifecycles, and ability to connect frontend events with backend workers and storage engines.",
          "shortAnswer": "AcademicStack is structured into a decoupled four-tier architecture: a React 19 single-page application, an asynchronous FastAPI service layer, a dual-database persistence tier (PostgreSQL for relational metadata and Qdrant for 1536-dim vector embeddings), and a headless document rendering pipeline powered by ReportLab and Matplotlib.",
          "technicalExplanation": "The end-to-end data lifecycle traverses four distinct stages:\n1. Ingestion: The student uploads a textbook PDF in the frontend. FastAPI streams the file to Cloudinary CDN, generates a Resource record in PostgreSQL, and enqueues indexing.\n2. Ingestion & Indexing: PyMuPDF parses pages, RecursiveCharacterTextSplitter cuts 1000-char chunks (200-char overlap), and OpenAI text-embedding-3-small generates 1536-dimensional embeddings. Chunks are loaded into Qdrant tagged with payload filters (resource_id, subject).\n3. Grounded Synthesis: When solving a Question Bank, Qdrant executes vector similarity search restricted to the linked resource IDs (k=5). The Draft Generator (GPT-4o-mini) and Academic Reviewer (GPT-4o) personas execute two-stage adversarial synthesis, adhering to rigid line/word limits.\n4. Document Compilation: ReportLab's SimpleDocTemplate and NumberedCanvas perform two-pass rendering, using Matplotlib's MathTextParser in 'cm' font for LaTeX equations and Kroki.io for Mermaid diagrams, returning binary PDF streams.",
          "actualImplementation": "FastAPI handles asynchronous routing in `as-backend/app/main.py`. Resource and Question Bank metadata are maintained in PostgreSQL via SQLAlchemy models in `as-backend/app/db/models.py`. Vector indexing is handled in `as-backend/app/indexing/service.py`, RAG generation runs in `as-backend/app/rag/service.py`, and ReportLab compilation runs in `as-backend/app/pdf/generator.py`.",
          "sourceFile": "as-backend/app/main.py & as-backend/app/rag/service.py",
          "sourceFunction": "app.rag.service.generate_rag_answer & app.indexing.service.split_documents",
          "realWorldExample": "A student preparing for a Computer Networks exam uploads Tanenbaum's 800-page textbook and a 2023 semester exam paper. The system isolates the 800-page vectors inside Qdrant under resource_id=14, pulls only OSI/TCP chunks during generation, and compiles an 18-page publication PDF with exact page citations.",
          "followUps": [
            "Why did you choose Qdrant over pgvector inside PostgreSQL?",
            "How would you replace the synchronous for-loop during multi-question generation to scale to thousands of concurrent students?",
            "What happens if Cloudinary is temporarily unreachable during document upload?"
          ],
          "commonMistakes": [
            "Claiming that vector search searches the entire database globally without explaining the metadata.resource_id payload filter.",
            "Describing the PDF compilation as simple HTML-to-PDF headless browser rendering (Puppeteer/wkhtmltopdf) instead of ReportLab flowable canvas objects."
          ]
        },
        {
          "id": "q-tech-7",
          "question": "How did you organize the FastAPI application structure and manage global exceptions?",
          "technicalExplanation": "The backend follows a domain-driven, modular clean architecture layout:\n1. Application Structure:\n   - 'as-backend/app/main.py': Entrypoint configuring CORS, middleware, lifespan startup/shutdown, and router registration.\n   - 'as-backend/app/auth/': JWT security, password hashing, and user authentication routes.\n   - 'as-backend/app/indexing/': PyMuPDF ingestion and document chunking service.\n   - 'as-backend/app/vector_store/': Qdrant client connection and collection management.\n   - 'as-backend/app/rag/': LangChain prompts, Draft Generator, and Academic Reviewer pipeline.\n   - 'as-backend/app/pdf/': Headless ReportLab compilation, math rendering, and cheatsheet engine.\n   - 'as-backend/app/predictor/': Historical exam paper blueprint audit and frequency prediction.\n2. Global Exception Handling: Handled via '@app.exception_handler(Exception)' in 'main.py'. Any unhandled runtime error is caught, logged with full traceback to standard error, and returned to the client as a clean, standardized JSON response:\n   '{\"detail\": \"Internal server error occurred\", \"status_code\": 500, \"path\": request.url.path}'\n   This prevents unhandled exceptions from crashing the Uvicorn ASGI worker and ensures clients receive structured error messages.",
          "actualImplementation": "`as-backend/app/main.py` registers 8 modular APIRouters and binds the global exception handler.",
          "sourceFile": "as-backend/app/main.py",
          "sourceFunction": "app.main.global_exception_handler & app.main.lifespan",
          "realWorldExample": "If an external API like Kroki or OpenAI fails unexpectedly, the global exception handler returns a structured 500 JSON response with error context, allowing the React frontend to display a helpful toast alert rather than freezing."
        },
        {
          "id": "q-api-1",
          "question": "How does FastAPI handle CORS, routing, and global exception handling in AcademicStack, and how do you monitor server health?",
          "difficulty": "Medium",
          "whyAsked": "Examines production web framework fundamentals, API security boundaries across multiple frontend environments, and operational observability.",
          "shortAnswer": "FastAPI utilizes CORSMiddleware with whitelist domain arrays and regex matching, modular APIRouters prefixed by domain, a global catch-all Exception handler returning structured JSON, and a thread-safe /api/health endpoint tracking uptime and DB/Qdrant connectivity.",
          "technicalExplanation": "In 'as-backend/app/main.py':\n1. CORS Management: Whitelists explicit origins ('localhost:5173', 'academicstack.kshoeb.in') and dynamically reads FRONTEND_URL. A permissive regex pattern matches all Vercel and Render preview deployment URLs.\n2. Modular Routers: Eight domain-specific routers (users, resources, indexing, question_banks, questions, answers, community, predictor) are registered with standardized prefixes.\n3. Global Exception Handler: Captures unhandled runtime exceptions with @app.exception_handler(Exception), logging the stack trace and returning status 500 with a structured detail JSON payload to avoid crashing ASGI workers.\n4. Health & Uptime Tracker: Tracks hit_count, last_hit_at, and server_start_time in IST using a threading.Lock() to guarantee race-free metrics. Actively executes 'SELECT 1' against PostgreSQL and checks Qdrant socket connectivity.",
          "actualImplementation": "`as-backend/app/main.py` configures CORSMiddleware (lines 58-64), registers routers (lines 66-73), binds global exception handler (lines 75-81), and defines the thread-locked `/api/health` check endpoint (lines 93-124).",
          "sourceFile": "as-backend/app/main.py",
          "sourceFunction": "app.main.health_check & app.main.global_exception_handler",
          "realWorldExample": "When frontend clients deploy on unique preview branches like `academicstack-git-feat-preview.vercel.app`, the regex `https?://.*(kshoeb\\.in|vercel\\.app|onrender\\.com|localhost|127\\.0\\.0\\.1).*` automatically allows secure credentialed requests without requiring manual CORS rebuilds.",
          "followUps": [
            "Why is a threading.Lock() necessary for the health tracker in Python if the Global Interpreter Lock (GIL) exists?",
            "What is the difference between @app.api_route and @app.get in FastAPI?"
          ],
          "commonMistakes": [
            "Assuming standard Python dict mutations are automatically thread-safe across multi-threaded ASGI Uvicorn workers without locks.",
            "Using wildcard '*' for origins while simultaneously enabling allow_credentials=True, which violates W3C browser security specifications."
          ]
        },
        {
          "id": "q-fe-1",
          "question": "How does AcademicStack organize frontend state management with Zustand, and why was Zustand chosen over Redux or React Context?",
          "difficulty": "Medium",
          "whyAsked": "Examines state management selection, boilerplate reduction, fine-grained re-renders, and modular store architecture in modern React applications.",
          "shortAnswer": "AcademicStack splits state into lightweight, domain-specific Zustand stores: useAuthStore, useQuestionBankStore, usePracticeStore, and useThemeStore. Zustand eliminates Redux boilerplate, provides hooks without Context Provider hell, and allows selectors that prevent unnecessary component re-renders.",
          "technicalExplanation": "In 'as-frontend/src/store/':\n1. Modular Domain Stores:\n   - useAuthStore: Manages token, user profile, login, logout, and localStorage synchronization.\n   - useQuestionBankStore: Tracks activeTab ('resources', 'question_banks', 'review', 'solutions', 'predictor', 'community', 'profile'), active question bank, answer set, and selected subject.\n   - usePracticeStore: Handles predicted paper blueprints, recurring topic lists, and paper generation state.\n   - useThemeStore: Handles theme switching and dark mode class manipulation on the document body.\n2. Performance Advantage: Zustand stores are external closures outside React's render tree. Components subscribe only to exact state slices (e.g. const activeTab = useQuestionBankStore(s => s.activeTab)), ensuring that updating generation progress does not trigger re-renders in the navbar or sidebar.",
          "actualImplementation": "`as-frontend/src/store/useAuthStore.js`, `useQuestionBankStore.js`, `usePracticeStore.js`, and `useThemeStore.js`. Used throughout `as-frontend/src/App.jsx`.",
          "sourceFile": "as-frontend/src/store/useQuestionBankStore.js & as-frontend/src/App.jsx",
          "sourceFunction": "useQuestionBankStore & useAuthStore",
          "realWorldExample": "While the SolutionViewer polls /api/answer-sets/{id}/progress every 2 seconds, only the progress bar component re-renders. The 25 rendered question cards remain memoized, maintaining a smooth 60fps frame rate without UI stutter.",
          "followUps": [
            "How does useAuthStore persist authentication across browser tab reloads?",
            "What happens to Zustand state when a user logs out?"
          ],
          "commonMistakes": [
            "Storing large server data (like 50-page text chunks) inside global UI state stores instead of fetching on demand.",
            "Destructuring the entire store object without selectors, causing every component to re-render on any store mutation."
          ]
        },
        {
          "id": "q-fe-2",
          "question": "How are mathematical equations and Mermaid diagrams dynamically rendered in the React 19 frontend?",
          "difficulty": "Medium",
          "whyAsked": "Tests knowledge of markdown parsing pipelines, syntax AST transformations, and secure client-side diagram rendering.",
          "shortAnswer": "AcademicStack uses ReactMarkdown with remark-math and rehype-katex for instant mathematical rendering, and an isolated MermaidDiagram component that initializes Mermaid.js inside shadow/DOM containers with automated error recovery.",
          "technicalExplanation": "In 'as-frontend/src/components/SolutionViewer.jsx' and 'MermaidDiagram.jsx':\n1. Math Rendering Pipeline: Markdown is processed through react-markdown:\n   <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>\n   Inline ($...$) and block ($$...$$) LaTeX expressions are converted into MathML/HTML DOM elements rendered via KaTeX stylesheets.\n2. Mermaid Diagram Execution: 'MermaidDiagram.jsx' mounts a unique DOM container with a sanitized diagram string. It calls mermaid.render() with a unique ID.\n3. Fallback Handling: If the Mermaid syntax contains a parse error, the component catches the exception and displays a clean error banner or renders a fallback SVG rather than crashing the entire question card.",
          "actualImplementation": "`as-frontend/src/components/SolutionViewer.jsx` and `as-frontend/src/components/MermaidDiagram.jsx`. Package dependencies in `as-frontend/package.json` (`katex`, `rehype-katex`, `remark-math`, `mermaid`).",
          "sourceFile": "as-frontend/src/components/SolutionViewer.jsx & as-frontend/src/components/MermaidDiagram.jsx",
          "sourceFunction": "MermaidDiagram component & SolutionViewer render pipeline",
          "realWorldExample": "A student reviewing an answer on the OSI 7-layer model views an interactive Mermaid flowchart showing packet encapsulation from Application to Physical layer alongside KaTeX formulas for propagation delay $t_{prop} = d / s$.",
          "followUps": [
            "Why is KaTeX preferred over MathJax in modern React web applications?",
            "How do you prevent XSS attacks when rendering AI-generated markdown with diagrams?"
          ],
          "commonMistakes": [
            "Re-initializing mermaid.initialize() on every single component render instead of doing it once globally.",
            "Omitting the KaTeX CSS import in index.html/main.jsx, causing equations to render as unstyled raw text."
          ]
        }
      ]
    },
    {
      "id": "cat-database-auth",
      "name": "3. Database Design, Authentication & Security",
      "description": "PostgreSQL relational schemas, cascading deletes, JWT token auth, and BYOK Fernet key encryption.",
      "questions": [
        {
          "id": "q-tech-5",
          "question": "Why did you choose this database design and entity relationships?",
          "technicalExplanation": "The PostgreSQL database design in AcademicStack is structured around 5 core normalized entities in a parent-child hierarchy:\n1. User: Holds authentication, email, and encrypted BYOK API keys.\n2. Resource: Represents an uploaded textbook or syllabus PDF, storing Cloudinary URLs, page counts, subject codes, and indexing status. Has a foreign key to 'user_id'.\n3. QuestionBank: Represents a collection of exam questions (e.g., '2023 Semester End Exam'). Links to 'user_id' and the parent 'resource_id'.\n4. Question: Represents an individual examination question, storing question text, mark weight (2, 5, 10), topic tag, and sequence order.\n5. AnswerSet & Answer: Stores generated student revisions, caching markdown answers, page citations, reviewer grades, and compilation status.\nCrucially, all foreign keys enforce 'ON DELETE CASCADE'. If a student deletes a textbook Resource, PostgreSQL automatically and cleanly cascades the deletion to all associated question banks, questions, and cached answers, preventing orphaned relational records.",
          "actualImplementation": "Declarative SQLAlchemy 2.0 models defined in `as-backend/app/db/models.py` with foreign key cascades.",
          "sourceFile": "as-backend/app/db/models.py",
          "sourceFunction": "SQLAlchemy model declarations in app.db.models",
          "realWorldExample": "Deleting an old semester textbook instantly cleans up 60 questions and 120 cached answer revisions across 4 tables in a single atomic transaction."
        },
        {
          "id": "q-db-1",
          "question": "Explain the relational data model of AcademicStack. How are parent-child relationships and cascade deletions configured?",
          "difficulty": "Medium",
          "whyAsked": "Evaluates relational database design, foreign key constraints, orphan record prevention, and SQLAlchemy declarative modeling.",
          "shortAnswer": "AcademicStack models seven primary entities with strict cascading foreign keys: User owns Resources and QuestionBanks; QuestionBank cascades to Questions and AnswerSets; AnswerSet cascades to Answers; and SharedPredictedPaper exists as an independent shareable entity.",
          "technicalExplanation": "In 'as-backend/app/db/models.py':\n1. QuestionBank -> Questions: ForeignKey('question_banks.id', ondelete='CASCADE'). When a student deletes a question bank, all parsed questions are deleted automatically by the database engine.\n2. QuestionBank -> AnswerSets -> Answers: AnswerSet has ForeignKey('question_banks.id', ondelete='CASCADE'), and Answer has ForeignKey('answer_sets.id', ondelete='CASCADE') and ForeignKey('questions.id', ondelete='CASCADE').\n3. Database Indexing: Crucial query paths (user_id, question_bank_id, answer_set_id, cloudinary_public_id, share_token) have index=True to prevent full-table scans during dashboard lookups.\n4. Structured Text Columns: files_meta in QuestionBank and sources in Answer store serialized JSON strings, allowing schema flexibility for multi-source citations without excessive junction tables.",
          "actualImplementation": "`as-backend/app/db/models.py` defines all 7 classes (`User`, `Resource`, `QuestionBank`, `Question`, `AnswerSet`, `Answer`, `SharedPredictedPaper`) with explicit `ForeignKey(..., ondelete='CASCADE')` constraints.",
          "sourceFile": "as-backend/app/db/models.py",
          "sourceFunction": "app.db.models.Question & app.db.models.Answer & app.db.models.AnswerSet",
          "realWorldExample": "If a student uploads an exam paper by mistake and clicks 'Delete Question Bank', PostgreSQL cascades the deletion through all 25 Question rows, the linked AnswerSet row, and all 25 Answer rows in a single atomic transaction without leaving orphaned database rows.",
          "followUps": [
            "Why is ondelete='CASCADE' placed in the ForeignKey definition rather than just relationship(cascade='all, delete') in SQLAlchemy?",
            "How do you handle migrations when adding new columns to PostgreSQL?"
          ],
          "commonMistakes": [
            "Configuring cascade only in SQLAlchemy ORM memory without adding ondelete='CASCADE' to the PostgreSQL DDL constraint, causing foreign key violation errors on raw SQL operations.",
            "Storing citations as an unindexed flat string instead of structured JSON."
          ]
        },
        {
          "id": "q-tech-1",
          "question": "How did you handle user authentication and session security?",
          "technicalExplanation": "Authentication in AcademicStack is built on stateless JSON Web Tokens (JWT) using the HS256 signature algorithm:\n1. Registration & Password Hashing: When a student registers, their plaintext password is encrypted using Bcrypt via 'passlib.context.CryptContext(schemes=['bcrypt'], deprecated='auto')' with 12 salt rounds. Plaintext passwords are never stored or logged.\n2. Token Lifecycle: On '/api/auth/login', the backend verifies credentials and issues a stateless JWT encoding the user's ID ('sub'), email, and an expiration timestamp ('exp', set to 7 days).\n3. Route Protection: Protected endpoints use FastAPI's dependency injection ('Depends(get_current_user)'). The dependency parses the HTTP 'Authorization: Bearer <token>' header, decodes the signature using the server's 'JWT_SECRET', checks expiration, and retrieves the active 'User' record from PostgreSQL.\n4. Stateless Multi-Device Support: Because JWT tokens are cryptographically signed and self-contained, no server-side session lookup or Redis session cache is required for auth validation.",
          "actualImplementation": "`as-backend/app/auth/security.py` (password hashing and token creation) and `as-backend/app/auth/routes.py` (login and dependency injection).",
          "sourceFile": "as-backend/app/auth/security.py & as-backend/app/auth/routes.py",
          "sourceFunction": "app.auth.security.create_access_token & app.auth.routes.get_current_user",
          "realWorldExample": "If the backend service restarts or scales across multiple containers, active student sessions remain fully valid and uninterrupted because JWT verification is completely stateless."
        },
        {
          "id": "q-sec-2",
          "question": "How does AcademicStack authenticate API requests, and what is the difference between get_current_user and get_current_user_optional?",
          "difficulty": "Medium",
          "whyAsked": "Evaluates dependency injection patterns in FastAPI, stateless JWT validation, and handling authenticated vs public endpoints.",
          "shortAnswer": "It uses PyJWT with HS256 algorithm and HTTPBearer tokens. get_current_user raises an HTTP 401 exception if the token is missing or invalid, whereas get_current_user_optional returns None for public endpoints like community browsing.",
          "technicalExplanation": "In 'as-backend/app/core/security.py':\n1. Password Hashing: Uses bcrypt with salt generation (bcrypt.gensalt()) for secure password storage.\n2. Token Minting: create_access_token encodes sub (user_id) and username with an expiration timestamp (default 43200 minutes / 30 days) signed via settings.JWT_SECRET.\n3. get_current_user_optional: Extracts HTTP Bearer credentials. If missing, expired, or invalid, it gracefully returns None. Used for endpoints like viewing public community papers.\n4. get_current_user: Wraps get_current_user_optional. If user is None, it immediately raises HTTPException(status_code=401, detail='Authentication required. Please log in.', headers={'WWW-Authenticate': 'Bearer'}).",
          "actualImplementation": "`as-backend/app/core/security.py` defines `hash_password`, `verify_password`, `create_access_token`, `decode_access_token`, `get_current_user_optional`, and `get_current_user` in lines 14-78.",
          "sourceFile": "as-backend/app/core/security.py",
          "sourceFunction": "app.core.security.get_current_user & app.core.security.get_current_user_optional",
          "realWorldExample": "A student shares a link to a predicted exam paper with a study group. Anonymous classmates can view the paper via public share tokens using get_current_user_optional, but if they click 'Save as Question Bank', the endpoint requires get_current_user and prompts for login.",
          "followUps": [
            "Why is JWT expiration set to 30 days in this educational application?",
            "How do you revoke a JWT token before expiration if a user logs out?"
          ],
          "commonMistakes": [
            "Using hardcoded secret keys in production config instead of reading JWT_SECRET from environment variables.",
            "Not handling malformed JWT tokens, causing the API to throw unhandled 500 errors instead of clean 401 Unauthorized responses."
          ]
        },
        {
          "id": "q-sec-1",
          "question": "How is the Bring-Your-Own-Key (BYOK) architecture implemented in AcademicStack, and how are student OpenAI API keys secured at rest?",
          "difficulty": "Hard",
          "whyAsked": "Examines cryptographic key management, security at rest, and preventing credential leakage in multi-tenant SaaS environments.",
          "shortAnswer": "AcademicStack encrypts user OpenAI API keys at rest using Fernet symmetric encryption (AES-128-CBC with HMAC-SHA256). The encryption key is stored in environment variables, and decrypted keys only reside in process memory during active LLM calls.",
          "technicalExplanation": "In 'as-backend/app/utils/encryption.py':\n1. Fernet Cryptography: Uses the Python cryptography library's Fernet implementation, which guarantees that a message encrypted cannot be manipulated or read without the master key.\n2. Encryption at Rest: When a user submits an OpenAI API key in ProfileSettings.jsx, POST /api/users/keys encrypts the plaintext string via fernet.encrypt(api_key.encode()). The resulting ciphertext token is stored in the User.openai_api_key_encrypted database column.\n3. Safe Verification: When checking key health (GET /api/users/keys), the backend returns masked strings (e.g. 'sk-...xxxx') or a boolean status, NEVER transmitting decrypted plaintext back to the client.\n4. Ephemeral Decryption: Keys are decrypted only at the exact moment of making OpenAI or Qdrant embedding API requests in memory.",
          "actualImplementation": "`as-backend/app/utils/encryption.py` implements `encrypt_api_key` and `decrypt_api_key` using `Fernet(ENCRYPTION_KEY.encode())`. Used in `as-backend/app/users/service.py:save_user_key`.",
          "sourceFile": "as-backend/app/utils/encryption.py & as-backend/app/users/service.py",
          "sourceFunction": "app.utils.encryption.encrypt_api_key & app.utils.encryption.decrypt_api_key",
          "realWorldExample": "If the PostgreSQL database is dumped or compromised in an SQL injection breach, attacker query dumps only reveal ciphertext strings like 'gAAAAABm...'. Without the server's ENCRYPTION_KEY environment variable, student OpenAI API keys remain unreadable.",
          "followUps": [
            "How would you implement key rotation if the master ENCRYPTION_KEY is compromised?",
            "Why not let the frontend pass the OpenAI key directly in every HTTP header instead of storing it?"
          ],
          "commonMistakes": [
            "Storing API keys in base64 encoding and calling it 'encryption'.",
            "Returning the decrypted API key in GET /api/users/me responses, exposing user secrets in client browser caches."
          ]
        },
        {
          "id": "q-tech-2",
          "question": "What security measures were implemented for data protection and BYOK API keys?",
          "technicalExplanation": "AcademicStack implements multi-layered security protocols:\n1. Bring-Your-Own-Key (BYOK) Encryption at Rest: Student OpenAI API keys are encrypted at rest using Fernet symmetric encryption ('cryptography.fernet.Fernet'), which uses AES-128 in CBC mode with PKCS7 padding and HMAC-SHA256 for integrity verification.\n2. In-Memory Decryption: The encrypted ciphertext is stored in the 'users.encrypted_openai_key' column in PostgreSQL. Keys are decrypted exclusively in memory per request when invoking LangChain and are never printed in application logs or returned in REST API responses.\n3. CORS Whitelisting: 'CORSMiddleware' in FastAPI is configured with strict origin whitelists ('localhost:5173', 'academicstack.kshoeb.in') and regex patterns matching deployment previews, strictly forbidding wildcard '*' with credentials.\n4. SQL Injection Prevention: All database queries use SQLAlchemy 2.0 parameterized queries with mapped models, eliminating raw string SQL interpolation.",
          "actualImplementation": "Fernet encryption utilities in `as-backend/app/auth/security.py` and CORS configuration in `as-backend/app/main.py`.",
          "sourceFile": "as-backend/app/auth/security.py & as-backend/app/main.py",
          "sourceFunction": "app.auth.security.encrypt_api_key & app.main.configure_cors",
          "realWorldExample": "Even if an attacker obtains an unauthorized read replica dump of the PostgreSQL database, all stored user OpenAI API keys remain unreadable AES-128 ciphertext."
        }
      ]
    },
    {
      "id": "cat-ai-rag",
      "name": "4. AI, Vector Search & RAG Synthesis Engine",
      "description": "Model selection (GPT-4o / mini), Qdrant vector retrieval, payload subject isolation, and grounded exam answer generation.",
      "questions": [
        {
          "id": "q-tech-3",
          "question": "Why did you select this specific model combination (GPT-4o, GPT-4o-mini, text-embedding-3-small)?",
          "technicalExplanation": "I chose a dual-model tiered architecture optimized for cost, latency, and academic reasoning:\n1. Stage 1 Draft Generator (GPT-4o-mini): Ingests the retrieved textbook chunks and generates the raw factual answer draft. GPT-4o-mini is 10x cheaper and 3x faster than full GPT-4o, making it ideal for high-throughput initial synthesis.\n2. Stage 2 Academic Reviewer (GPT-4o): Evaluates the draft against university examination rubrics. GPT-4o possesses superior logical reasoning to prune conversational fluff, strictly enforce line bounds (e.g. 5–7 lines for 2 marks), verify Computer Modern LaTeX math formulas, and validate Mermaid diagram syntax.\n3. Embeddings (OpenAI text-embedding-3-small): Generates 1536-dimensional dense vectors. It provides higher MTEB retrieval accuracy than legacy 'text-embedding-ada-002' while reducing embedding generation cost by 80% and achieving sub-100ms vector index insertion in Qdrant.",
          "actualImplementation": "Model configurations and prompt pipelines in `as-backend/app/rag/service.py` and `as-backend/app/indexing/service.py`.",
          "sourceFile": "as-backend/app/rag/service.py & as-backend/app/indexing/service.py",
          "sourceFunction": "app.rag.service.generate_rag_answer & app.indexing.service.get_embeddings",
          "realWorldExample": "Generating a 50-question Solved Question Bank with full GPT-4o costs ~$1.50 per booklet; using GPT-4o-mini for drafting and GPT-4o solely for the review pass drops the cost to ~$0.22 with superior mark compliance."
        },
        {
          "id": "q-rag-1",
          "question": "Explain the two-stage Grounded RAG synthesis engine in AcademicStack. Why is a single-stage LLM prompt insufficient for academic exams?",
          "difficulty": "Hard",
          "whyAsked": "Evaluates multi-agent prompt chaining, output calibration, hallucination mitigation, and deep knowledge of why single-prompt LLM generation degrades in structured examination domains.",
          "shortAnswer": "A single prompt fails to simultaneously retrieve context, synthesize content, enforce strict line budgets, validate LaTeX math syntax, and eliminate conversational filler. AcademicStack separates concerns into Stage 1 (Draft Generator) for grounded synthesis and Stage 2 (Academic Reviewer) for grading calibration and structural enforcement.",
          "technicalExplanation": "The two-stage pipeline in 'as-backend/app/rag/service.py' functions as follows:\n1. Context Retrieval: Top 5 relevant chunks are retrieved from Qdrant with subject payload isolation.\n2. Directive Formulation: build_answer_directives inspects marks and question intent (comparison, advantages, diagram, numerical), compiling hard rules.\n3. Stage 1 - Draft Generator: Using DRAFT_SYSTEM_INSTRUCTION, the model writes a student-friendly explanation grounded strictly in the retrieved study material chunks, preserving technical keywords in bold.\n4. Stage 2 - Academic Reviewer: Using REVIEWER_SYSTEM_INSTRUCTION, a senior grading professor persona reviews the draft against the study context. It aggressively trims length if a 2-mark answer exceeds 7 lines, validates LaTeX math delimiter cleanliness, enforces Markdown comparison tables for difference questions, and ensures Mermaid diagram syntax is valid.\n5. Auto-Repair: Mermaid diagram code is sanitized with repair_mermaid_syntax to fix unclosed delimiters before storing in the database.",
          "actualImplementation": "`as-backend/app/rag/service.py` defines `DRAFT_SYSTEM_INSTRUCTION` (lines 8-170), `REVIEWER_SYSTEM_INSTRUCTION` (lines 172-229), `build_answer_directives` (lines 390-458), and orchestrates the two calls in `generate_rag_answer` (lines 556-605).",
          "sourceFile": "as-backend/app/rag/service.py",
          "sourceFunction": "app.rag.service.generate_rag_answer & app.rag.service.review_rag_answer",
          "realWorldExample": "For a 2-mark question 'What is Virtual Memory?', the Stage 1 generator might draft 14 lines containing history and paging details. The Stage 2 Academic Reviewer immediately truncates it to 6 lines: 1 definition sentence and 3 bold keyword bullets, matching university scoring rubrics.",
          "followUps": [
            "What latency overhead does the second LLM review pass introduce?",
            "Can the user override the Reviewer with custom prompts during regeneration?"
          ],
          "commonMistakes": [
            "Claiming that a single large system prompt can reliably enforce both rich conceptual depth and rigid 5-to-7 line constraints under zero-shot conditions.",
            "Not passing the retrieved context chunks to the reviewer stage, which would allow the reviewer to hallucinate corrections."
          ]
        },
        {
          "id": "q-arch-2",
          "question": "Why did you separate the vector database (Qdrant) from the relational database (PostgreSQL) instead of using pgvector inside PostgreSQL?",
          "difficulty": "Medium",
          "whyAsked": "Tests trade-off evaluation between unified database architectures vs specialized vector search engines, specifically regarding HNSW memory isolation, query latency, and payload filtering.",
          "shortAnswer": "Separating Qdrant from PostgreSQL decouples compute-intensive HNSW vector graph operations and high-dimensional memory allocation from transactional relational workloads, preventing large semantic vector searches from degrading core OLTP queries.",
          "technicalExplanation": "While pgvector allows storing vectors in PostgreSQL, running high-dimensional (1536-dim) approximate nearest neighbor (ANN) searches under heavy indexing loads causes high memory contention and buffer cache eviction.\n1. Specialized Memory Allocation: Qdrant runs in Rust, optimized for in-memory or memory-mapped HNSW graphs with SIMD hardware vector distance instructions.\n2. Advanced Payload Filtering: Qdrant evaluates boolean payload filters (e.g. should match metadata.resource_id) directly during HNSW graph traversal rather than executing slow post-filtering or unindexed pre-filtering.\n3. Decoupled Scalability: The vector store can be scaled independently of PostgreSQL as document volume grows into hundreds of thousands of textbook chunks.",
          "actualImplementation": "PostgreSQL handles transactional entities (User, Resource, QuestionBank, Question, AnswerSet, Answer) in `as-backend/app/db/models.py`. Qdrant handles vector collections initialized via `as-backend/app/vector_store/qdrant.py:ensure_collection` using Cosine distance and 1536 vector dimension.",
          "sourceFile": "as-backend/app/vector_store/qdrant.py",
          "sourceFunction": "app.vector_store.qdrant.ensure_collection & app.rag.retriever.retrieve_relevant_documents",
          "realWorldExample": "During exam season, 500 students simultaneously querying dense textbook vectors will cause massive RAM spikes for vector indexing. By isolating Qdrant, PostgreSQL continues serving auth tokens, progress bars, and profile updates with sub-5ms latency without database locking.",
          "followUps": [
            "What distance metric is used in Qdrant collections for text-embedding-3-small?",
            "How are orphan vectors cleaned up in Qdrant if a user deletes a resource from PostgreSQL?"
          ],
          "commonMistakes": [
            "Saying pgvector is always worse without mentioning developer simplicity and transactional consistency benefits for smaller datasets.",
            "Forgetting that OpenAI text-embedding-3-small produces normalized 1536-dimensional vectors where Cosine similarity equals dot product."
          ]
        },
        {
          "id": "q-vec-2",
          "question": "What embedding model and chunking strategy does AcademicStack use, and what are the trade-offs of chunk size 1000 with 200 overlap?",
          "difficulty": "Medium",
          "whyAsked": "Examines practical understanding of chunking trade-offs, vector dimensionality, embedding cost, and boundary preservation.",
          "shortAnswer": "AcademicStack uses OpenAI's text-embedding-3-small generating 1536-dimensional vectors. Documents are split using RecursiveCharacterTextSplitter with chunk_size=1000 and chunk_overlap=200.",
          "technicalExplanation": "Chunking parameter choices:\n1. Chunk Size (1000 characters ~ 150-200 words): Matches typical textbook paragraph length. Smaller chunks (e.g. 300 chars) lose context for multi-part definitions; larger chunks (e.g. 3000 chars) dilute embedding specificity and increase LLM prompt token costs.\n2. Chunk Overlap (200 characters): Prevents splitting critical definitions, formulas, or theorems across chunk boundaries. If an equation starts at char 950, the overlap guarantees it appears intact in the subsequent chunk.\n3. Embedding Model: text-embedding-3-small offers a 5x cost reduction and superior retrieval benchmark scores over older models like text-embedding-ada-002, producing compact 1536-dimensional dense vectors.",
          "actualImplementation": "`as-backend/app/indexing/service.py:split_documents` lines 27-33 configures `RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)`. `as-backend/app/rag/embeddings.py` defines `EMBEDDING_MODEL_OPENAI = 'text-embedding-3-small'` and `EMBEDDING_DIMENSION_OPENAI = 1536`.",
          "sourceFile": "as-backend/app/indexing/service.py & as-backend/app/rag/embeddings.py",
          "sourceFunction": "app.indexing.service.split_documents & app.rag.embeddings.get_embeddings_instance",
          "realWorldExample": "In a 300-page Artificial Intelligence textbook, an explanation of the A* search formula $f(n) = g(n) + h(n)$ spans across the boundary of paragraphs. The 200-character overlap guarantees the admissibility condition is preserved in the chunk containing the formula.",
          "followUps": [
            "How does the system handle rate limiting during batch embedding of a 500-page textbook?",
            "What happens if a PDF contains non-text vector charts or scanned diagrams?"
          ],
          "commonMistakes": [
            "Setting chunk overlap to zero, causing half of sentences at chunk boundaries to be cut off and lose semantic meaning.",
            "Over-chunking to 4000+ characters, which causes vector embeddings to represent broad document topics rather than specific answer facts."
          ]
        },
        {
          "id": "q-vec-1",
          "question": "How does Qdrant enforce subject isolation in AcademicStack, and why is payload filtering critical for multi-subject academic platforms?",
          "difficulty": "Hard",
          "whyAsked": "Tests understanding of multi-tenant vector retrieval, payload indexing in Qdrant, and preventing semantic cross-contamination across different academic courses.",
          "shortAnswer": "AcademicStack applies Qdrant payload filters on metadata.resource_id during vector retrieval. This restricts semantic similarity search strictly to chunks belonging to the uploaded textbooks of that specific subject, preventing cross-subject data leakage.",
          "technicalExplanation": "In university exam prep, different subjects share overlapping vocabulary (e.g., 'Deadlock' in Operating Systems vs 'Deadlock' in Distributed DBMS; 'Pipeline' in Software Engineering vs 'Pipeline' in Computer Architecture).\n1. Vector Retrieval Filter: When retrieve_relevant_documents is called, it constructs a Qdrant filter:\nqdrant_filter = {'should': [{'key': 'metadata.resource_id', 'match': {'value': res_id}} for res_id in resource_ids]}\n2. In-Traversal Filtering: Qdrant's HNSW engine evaluates this filter during vector graph traversal, completely ignoring vectors that do not match the authorized resource IDs.\n3. Zero Contamination: Even if a student uploads 20 textbooks across 6 subjects into the same Qdrant collection, OS questions will NEVER retrieve chunks from Database or Compiler Design textbooks.",
          "actualImplementation": "`as-backend/app/rag/retriever.py` constructs `qdrant_filter` with `metadata.resource_id` matching in lines 16-26, passing it as `search_kwargs` to `vector_store.as_retriever`.",
          "sourceFile": "as-backend/app/rag/retriever.py",
          "sourceFunction": "app.rag.retriever.retrieve_relevant_documents",
          "realWorldExample": "A student solves a question: 'Explain two-phase commit protocol'. Without payload filtering, vector search might retrieve Git commit workflows from a DevOps slide deck. With `metadata.resource_id` filtering, only the Distributed Systems textbook chunks are retrieved.",
          "followUps": [
            "Why use a single collection with payload filters instead of creating a separate Qdrant collection for every subject?",
            "What index type should be created on Qdrant payload fields for optimal performance?"
          ],
          "commonMistakes": [
            "Believing that semantic similarity alone will naturally filter out unrelated subjects without explicit metadata filters.",
            "Using client-side post-filtering after retrieving top 50 global results, which frequently starves the search of relevant in-subject chunks."
          ]
        },
        {
          "id": "q-perf-1",
          "question": "What optimizations were implemented to achieve sub-100ms vector retrieval across multi-hundred-page textbooks in Qdrant?",
          "difficulty": "Hard",
          "whyAsked": "Evaluates production vector database tuning, HNSW graph parameters, payload index creation, and query latency profiling.",
          "shortAnswer": "Optimizations include strict metadata.resource_id payload filtering, Cosine metric indexing on normalized 1536-dimensional embeddings, in-memory HNSW vector graphs, and batching document ingestion with RateLimiter control.",
          "technicalExplanation": "Techniques applied in 'as-backend/app/rag/' and 'as-backend/app/indexing/service.py':\n1. Payload Indexing: Rather than scanning all vectors in Qdrant, we filter by metadata.resource_id. Adding a keyword payload index allows Qdrant to construct a candidate subset before graph exploration.\n2. Embedding Normalization: OpenAI's text-embedding-3-small outputs unit vectors. In Qdrant, Cosine distance on normalized vectors reduces to high-speed dot-product operations utilizing CPU SIMD/AVX2 vector instructions.\n3. Rate-Limited Batching: _add_documents_with_retry uploads vectors in 20-chunk batches governed by a RateLimiter(requests_per_minute=60), preventing HTTP 429 quota exhaustion during textbook indexing.\n4. Lean Retrieval Limit: Top-k is clamped to k=5, retrieving only the most salient ~1000-word context, minimizing context-stuffing latency in downstream LLM calls.",
          "actualImplementation": "`as-backend/app/indexing/service.py:_add_documents_with_retry` lines 71-125, `RateLimiter` lines 58-70, and `as-backend/app/rag/retriever.py:retrieve_relevant_documents`.",
          "sourceFile": "as-backend/app/indexing/service.py & as-backend/app/rag/retriever.py",
          "sourceFunction": "app.indexing.service._add_documents_with_retry & app.rag.retriever.retrieve_relevant_documents",
          "realWorldExample": "A student querying 'Explain Bellman-Ford shortest path algorithm' across a 1,200-page Algorithms textbook receives the 5 most relevant pages within 82ms, allowing the RAG Draft Generator to begin streaming immediately.",
          "followUps": [
            "How does Qdrant's HNSW ef_search parameter affect the trade-off between retrieval speed and accuracy?",
            "What is scalar quantization and when should it be enabled in Qdrant?"
          ],
          "commonMistakes": [
            "Retrieving 30+ chunks into the prompt, which triggers severe LLM latency and introduces irrelevant noise (lost in the middle problem).",
            "Failing to implement client-side rate limiters when uploading large textbooks, resulting in failed indexing runs midway through."
          ]
        },
        {
          "id": "q-rag-2",
          "question": "How does AcademicStack guarantee that 2-mark, 5-mark, and 10-mark questions receive proportionally scaled answers?",
          "difficulty": "Medium",
          "whyAsked": "Examines prompt engineering precision, regex-driven directive injection, and understanding of academic grading heuristics.",
          "shortAnswer": "Through build_answer_directives in app/rag/service.py, which injects deterministic length constraints into both the Draft and Reviewer prompts: 2M is strictly capped at 5–7 lines max, 5–7M is scaled to 15–20 lines, and 10M+ targets ~220–320 words with mandatory Mermaid diagrams.",
          "technicalExplanation": "The function build_answer_directives inspects marks and question keywords:\n1. 2 Marks: Injects: 'CRITICAL LIMIT: MAXIMUM 5 TO 7 LINES TOTAL for the entire answer. Write 1 plain-English definition sentence, followed strictly by 2 to 3 concise bullet points with bold keywords... Strictly NO headings, NO diagrams, NO filler.'\n2. 5–7 Marks: Injects: 'MODERATE DEPTH (~15–20 lines / ~200–280 words): core definition (2–3 sentences), followed by 4–6 structured bullet points with bold keywords and clear explanations, plus a concise diagram/flow.'\n3. 10+ Marks: Injects: 'CRISP, STRUCTURED & HIGH-YIELD (~220–320 words / ~20–25 lines): (1) A crisp 2–3 sentence concept definition/overview, (2) 1 clean, valid Mermaid diagram (graph TD, sequenceDiagram, stateDiagram-v2) or comparison table, and (3) 4 to 6 structured bullet points with standard syllabus bold keywords.'\n4. Reviewer Enforcement: The reviewer prompt explicitly instructs: 'If the draft exceeds 7 lines, AGGRESSIVELY TRIM it to 5–7 lines max... If the draft is bloated (>350 words), AGGRESSIVELY CONDENSE it to ~220–300 words.'",
          "actualImplementation": "`as-backend/app/rag/service.py:build_answer_directives` lines 390-458, coupled with checklist item 5 in `REVIEWER_SYSTEM_INSTRUCTION` lines 204-222.",
          "sourceFile": "as-backend/app/rag/service.py",
          "sourceFunction": "app.rag.service.build_answer_directives",
          "realWorldExample": "In an Operating Systems exam, 'Define Thrashing' (2M) generates exactly 6 lines. 'Explain Thrashing and Working Set Model' (10M) generates a concept definition, a Mermaid state diagram showing page fault frequency vs CPU utilization, and 5 structured explanation points.",
          "followUps": [
            "How does regex detect whether a question is a comparison or numerical calculation?",
            "What happens if an answer requires a mathematical proof that inherently exceeds 7 lines?"
          ],
          "commonMistakes": [
            "Assuming token limits alone (e.g. max_tokens=150) can control line count without producing truncated, unclosed sentences.",
            "Not providing few-shot templates in the system prompt for each mark tier."
          ]
        },
        {
          "id": "q-tech-4",
          "question": "How did you evaluate retrieval and generation performance?",
          "technicalExplanation": "I evaluated RAG performance across three core quantitative benchmarks:\n1. Grounding & Citation Precision: Evaluated whether 100% of synthesized answers contained valid, exact page citations to the source textbook. Grounding is enforced by requiring the LLM to tag every factual claim with '[Page X]' citations referencing chunks retrieved from Qdrant.\n2. Mark Scaling Compliance: Measured adherence to university length bounds across question marks:\n   - 2-Mark: Strictly 5 to 7 lines total, comprising one definition sentence and 2-3 bold keyword bullets. Zero headings or diagrams allowed.\n   - 5-Mark: 15 to 20 lines with 4 to 6 structured points.\n   - 10-Mark: ~220–320 words with standard syllabus bold keywords and a mandatory Mermaid diagram.\n3. Vector Retrieval Latency: Monitored Qdrant similarity query response times under cosine distance. With keyword payload indexing on 'resource_id', retrieval latency consistently benchmarks under 45ms across 10,000+ chunks.",
          "actualImplementation": "Mark directive constraints in `as-backend/app/rag/prompts.py` and citation verification in `as-backend/app/rag/service.py`.",
          "sourceFile": "as-backend/app/rag/prompts.py & as-backend/app/rag/service.py",
          "sourceFunction": "app.rag.prompts.get_directives_for_marks & app.rag.service.generate_rag_answer",
          "realWorldExample": "Testing 100 sample exam questions achieved a 98% pass rate on mark-length boundaries, completely preventing the runaway verbosity typical of generic LLM assistants."
        },
        {
          "id": "q-api-2",
          "question": "How does AcademicStack handle question extraction and group-header mark inheritance during past paper processing?",
          "difficulty": "Hard",
          "whyAsked": "Assesses the candidate's understanding of parsing semi-structured academic documents, algorithmic edge case handling, and defensive prompt engineering.",
          "shortAnswer": "AcademicStack uses PyMuPDF text block extraction paired with a strict extraction prompt that identifies group headers (e.g. 'Q.1 for 2 Marks') and enforces uniform mark inheritance across all sub-questions, overriding AI complexity judgments.",
          "technicalExplanation": "Exam papers frequently group questions under headers without repeating marks for individual sub-questions:\n1. Block Text Extraction: PyMuPDF extracts text blocks and eliminates repetitive noise or stamp artifacts.\n2. Group Header Rule Enforcement: The extraction prompt in 'as-backend/app/parsing/question_parser.py' instructs the LLM that when a header like 'Q.1 for 2 Marks' or 'Section A - 5 Marks Each' is found, ALL sub-questions (a, b, c...) must inherit that exact mark value with marks_source='explicit'.\n3. Strict Prohibition: The LLM is explicitly forbidden from overriding group marks using its own subjective complexity judgment (e.g. classifying a sub-question under 2M as 5M because it seems difficult).\n4. Fallback AI Estimation: If the entire paper omits marks, detect_paper_has_explicit_marks returns False, triggering AI estimation (2, 5, or 10 marks) tagged as 'ai_estimated'.",
          "actualImplementation": "`as-backend/app/parsing/question_parser.py` implements SYSTEM_INSTRUCTION (lines 6-63), `detect_paper_has_explicit_marks` (lines 65-80), and `_clean_and_estimate_marks` (lines 82-120).",
          "sourceFile": "as-backend/app/parsing/question_parser.py",
          "sourceFunction": "app.parsing.question_parser.call_extraction & app.parsing.question_parser.detect_paper_has_explicit_marks",
          "realWorldExample": "A Mumbai University paper has 'Q.1 Solve any four (5 marks each)' containing sub-questions a through e. Instead of misclassifying brief 2-line definitions in Q.1a as 2 marks, the group inheritance rule forces exactly 5 marks for all five sub-questions.",
          "followUps": [
            "How does the system handle papers where text extraction yields unreadable corrupted encoding?",
            "What data structure is returned to the frontend for student verification before saving?"
          ],
          "commonMistakes": [
            "Allowing the LLM to guess marks based on length alone when explicit group headers are present.",
            "Failing to separate sub-questions into individual database records, making per-question RAG generation impossible."
          ]
        },
        {
          "id": "q-rel-2",
          "question": "How does the Exam Predictor handle scanned or image-based university question papers that lack extractable text?",
          "difficulty": "Medium",
          "whyAsked": "Tests understanding of OCR fallback pipelines, handling real-world imperfect documents, and combining PyMuPDF with Vision models.",
          "shortAnswer": "The system inspects extracted text quality with _is_readable_text (checking alphanumeric and vowel thresholds). If text is corrupted or empty, it automatically renders page pixmaps and invokes GPT-4o Vision OCR to transcribe the paper.",
          "technicalExplanation": "In 'as-backend/app/predictor/service.py':\n1. Text Readability Verification: _is_readable_text counts alphanumeric characters (< 30) and vowels (< 8). Scanned papers typically return empty strings or gibberish encoding.\n2. Pixmap Rendering: If text fails readability checks, PyMuPDF renders the page to an in-memory image pixmap at 150 DPI: pix = page.get_pixmap(dpi=150).\n3. Vision OCR Invocation: transcribe_image_with_vision in 'app/llm/router.py' base64-encodes the image and sends it to GPT-4o Vision with a prompt instructing it to faithfully transcribe questions, instructions, and marks.\n4. Transparent Fallback: The transcribed text replaces the empty page content seamlessly, allowing the blueprint analysis to proceed without manual student intervention.",
          "actualImplementation": "`as-backend/app/predictor/service.py:extract_text_from_pdf_bytes` lines 131-180 and `as-backend/app/llm/router.py:transcribe_image_with_vision` lines 174-211.",
          "sourceFile": "as-backend/app/predictor/service.py & as-backend/app/llm/router.py",
          "sourceFunction": "app.predictor.service.extract_text_from_pdf_bytes & app.llm.router.transcribe_image_with_vision",
          "realWorldExample": "A student uploads a poorly scanned 2018 university exam paper where traditional PDF text extractors return zero text. The Vision OCR fallback transcribes all 6 questions with 100% accuracy, enabling the Blueprint Audit to discover question patterns.",
          "followUps": [
            "What is the cost difference between PyMuPDF text extraction and Vision OCR?",
            "Why is DPI clamped to 150 instead of 300 for Vision OCR?"
          ],
          "commonMistakes": [
            "Failing silently when a PDF has no extractable text layer, resulting in empty question banks.",
            "Sending high-resolution 600 DPI images to Vision models, which drastically increases token cost and latency with negligible accuracy improvement."
          ]
        }
      ]
    },
    {
      "id": "cat-pdf-render",
      "name": "5. Document Generation, ReportLab PDF & Progress Tracking",
      "description": "Headless LaTeX and Mermaid rendering in ReportLab, 2-column cheatsheets, and batch progress tracking.",
      "questions": [
        {
          "id": "q-pdf-1",
          "question": "How does AcademicStack render LaTeX mathematical equations and Mermaid diagrams inside ReportLab PDFs without relying on a headless browser?",
          "difficulty": "Hard",
          "whyAsked": "Examines low-level document generation, handling LaTeX math typography in Python, and integrating external diagramming engines into PDF flowables.",
          "shortAnswer": "AcademicStack utilizes Matplotlib's MathTextParser in 'agg' mode with Computer Modern ('cm') font to rasterize LaTeX math directly into 300 DPI images aligned with baseline depth_pt, and sanitizes Mermaid diagrams to fetch vector SVGs via Kroki.io failover.",
          "technicalExplanation": "Most web apps resort to Puppeteer/wkhtmltopdf, which are slow, memory-intensive, and prone to CSS print clipping:\n1. Math Rendering: 'as-backend/app/pdf/mathrender.py' configures matplotlib.rcParams['mathtext.fontset'] = 'cm' (Computer Modern, the authentic TeX font).\n2. Baseline Alignment: MathTextParser parses inline ($...$) and display ($$...$$) math. The renderer calculates depth_pt (descent below the font baseline) and injects the image into ReportLab paragraphs with valign=-depth_pt, preventing vertical math displacement.\n3. Mermaid Redundancy: Diagrams are parsed from markdown code blocks. repair_mermaid_syntax fixes syntax errors (unclosed brackets, unescaped quotes). If local compilation fails, the system sends encoded diagram definitions to Kroki.io's API, fetching an SVG/PNG to embed as a ReportLab Image flowable.",
          "actualImplementation": "`as-backend/app/pdf/mathrender.py` lines 12-29 and 65-100 configure MathTextParser and `_Delimiter`. `as-backend/app/pdf/generator.py:inline_markup` lines 98-135 injects `<img src='...' valign='...'/>` tags into ReportLab Paragraphs.",
          "sourceFile": "as-backend/app/pdf/mathrender.py & as-backend/app/pdf/generator.py",
          "sourceFunction": "app.pdf.mathrender.MathRenderer.render_inline & app.pdf.generator.inline_markup",
          "realWorldExample": "In a Fuzzy Logic exam paper, complex membership equations like $\\mu_{A \\cup B}(x) = \\max(\\mu_A(x), \\mu_B(x))$ render in authentic TeX typography identical to Springer or IEEE academic journals, rather than mangled ASCII.",
          "followUps": [
            "Why is thread locking necessary when calling MathTextParser?",
            "How does ReportLab handle table cell wrapping when mathematical formulas are placed inside Markdown comparison tables?"
          ],
          "commonMistakes": [
            "Trying to pass raw LaTeX directly into ReportLab Paragraphs, which only support basic HTML tags like <b>, <i>, and <font>.",
            "Ignoring the depth_pt parameter, causing inline equations like $x_i^2$ to sit awkwardly above the surrounding text line."
          ]
        },
        {
          "id": "q-pdf-2",
          "question": "How is the 2-column Rapid Recall Cheatsheet implemented in ReportLab, and how does it prevent text overflow across columns?",
          "difficulty": "Medium",
          "whyAsked": "Tests understanding of multi-frame document templates, page budget constraints, and typography optimization for high-density printouts.",
          "shortAnswer": "The cheatsheet uses ReportLab's BaseDocTemplate with a PageTemplate containing two distinct Frame objects side-by-side, compact 7.5pt typography, and a blacklist regex filter to strip conversational filler phrases.",
          "technicalExplanation": "In 'as-backend/app/pdf/cheatsheet_generator.py':\n1. Frame Geometry: USABLE_W is calculated from letter page dimensions minus margins (MARGIN_X = 28pt). Two column frames are defined: COL_W = (USABLE_W - 14pt) / 2.\n2. Two-Column Flow: Flowable elements naturally fill Frame 1 (left column) and automatically break into Frame 2 (right column) before triggering a page break.\n3. Blacklist Pruning: _BLACKLIST_RE strips out redundant preamble phrases like 'step 1', 'given', 'note', 'assume', or 'figure'.\n4. Micro-Typography: Uses 7.5pt fonts for body and formulas with tight 9pt leading and 4pt cell padding, maximizing information density for last-minute exam recall.",
          "actualImplementation": "`as-backend/app/pdf/cheatsheet_generator.py` defines layout metrics in lines 26-35, blacklist filter in lines 36-40, and constructs the two-column `Frame` layout in `generate_exam_cheatsheet_pdf`.",
          "sourceFile": "as-backend/app/pdf/cheatsheet_generator.py",
          "sourceFunction": "app.pdf.cheatsheet_generator.generate_exam_cheatsheet_pdf",
          "realWorldExample": "A 40-question solved question bank that takes 35 pages in the standard solution book is condensed into a dense 4-page two-column laminated-style cheatsheet perfect for review outside the exam hall.",
          "followUps": [
            "How does NumberedCanvas calculate total pages on the cheatsheet?",
            "What happens if an equation image exceeds COL_W (269pt)?"
          ],
          "commonMistakes": [
            "Using SimpleDocTemplate for multi-column layouts; SimpleDocTemplate only supports single-column flow.",
            "Not scaling math equation images proportionally when embedding them inside narrow column widths."
          ]
        },
        {
          "id": "q-perf-2",
          "question": "How does the system optimize PDF compilation time in ReportLab for large 50-page question bank solution books?",
          "difficulty": "Medium",
          "whyAsked": "Tests understanding of CPU-bound document generation, canvas drawing optimization, and caching expensive rasterized math images.",
          "shortAnswer": "ReportLab compiles flowables in a single pass using in-memory ByteIO buffers, memoizes rendered MathTextParser equation images, and executes two-pass page numbering via NumberedCanvas without re-running the document layout tree.",
          "technicalExplanation": "In 'as-backend/app/pdf/generator.py':\n1. In-Memory Compilation: PDFs are compiled directly into an io.BytesIO() buffer rather than writing intermediate disk files, eliminating disk I/O bottlenecks.\n2. NumberedCanvas Page Numbering: Instead of re-building the document twice to discover total pages, NumberedCanvas intercepts showPage and save calls, recording canvas drawing commands and stamping 'Page X of Y' in a quick second pass.\n3. Math Caching: Repeated mathematical formulas (e.g. standard symbols $\\lambda$, $\\mu$) reuse cached raster images from MathRenderer, avoiding redundant Matplotlib font rasterization.\n4. Streamed HTTP Response: The binary PDF bytes are streamed directly with media_type='application/pdf' and attachment Content-Disposition headers.",
          "actualImplementation": "`as-backend/app/pdf/generator.py:NumberedCanvas` lines 42-71 and `generate_solved_question_bank_pdf` lines 700-770.",
          "sourceFile": "as-backend/app/pdf/generator.py",
          "sourceFunction": "app.pdf.generator.NumberedCanvas & app.pdf.generator.generate_solved_question_bank_pdf",
          "realWorldExample": "A 45-page Solved Question Bank PDF with 120 inline equations and 8 architecture diagrams compiles from memory in approximately 1.4 seconds on a standard dual-core cloud instance.",
          "followUps": [
            "Why not offload PDF compilation to a Celery background worker?",
            "How do you handle memory limits if 100 students request PDF downloads at the exact same second?"
          ],
          "commonMistakes": [
            "Writing temporary PDF files to local disk and forgetting to delete them, leading to server disk saturation.",
            "Re-parsing MathText equations on every single render pass without caching."
          ]
        },
        {
          "id": "q-db-2",
          "question": "How does AcademicStack track progress during answer generation across dozens of questions, and how are partial failures handled?",
          "difficulty": "Medium",
          "whyAsked": "Tests understanding of distributed task status tracking, resilient state machines, and partial failure handling in batch workflows.",
          "shortAnswer": "AnswerSet maintains a status ('generating', 'completed', 'completed_with_errors') and counters (total_questions, completed_questions). Each Answer has its own status ('pending', 'generating', 'completed', 'failed') and commits independently to PostgreSQL.",
          "technicalExplanation": "In 'as-backend/app/answers/service.py:generate_answer_set':\n1. Initialization: Creates AnswerSet (status='generating', total=N, completed=0) and pre-populates all Answer rows with status='pending'.\n2. Iterative Commit: For each question:\n   - Sets ans.status = 'generating', commits to DB.\n   - Invokes generate_rag_answer.\n   - On Success: sets ans.status = 'completed', stores markdown and sources, increments answer_set.completed_questions, and commits.\n   - On Failure: catches exception, sets ans.status = 'failed', records error_message, sets has_failures = True, and commits.\n3. Final Status: If any question failed, AnswerSet is marked 'completed_with_errors'; otherwise 'completed'.\n4. Frontend Polling: GET /api/answer-sets/{id}/progress calculates progress percentage in real time: round((completed / total) * 100, 1).",
          "actualImplementation": "`as-backend/app/answers/service.py:generate_answer_set` lines 36-94, and `/api/answer-sets/{id}/progress` in `as-backend/app/answers/routes.py` lines 136-156.",
          "sourceFile": "as-backend/app/answers/service.py & as-backend/app/answers/routes.py",
          "sourceFunction": "app.answers.service.generate_answer_set & app.answers.routes.get_answer_set_progress_endpoint",
          "realWorldExample": "In a 20-question exam paper, if question 17 triggers an OpenAI rate limit or malformed chunk error, questions 1-16 and 18-20 still complete successfully. The student sees 95% complete with a 'Retry' button only on Question 17.",
          "followUps": [
            "How does the /api/answers/{id}/retry endpoint re-trigger generation for a single failed answer?",
            "Can a student provide additional prompt instructions during a single answer retry?"
          ],
          "commonMistakes": [
            "Wrapping the entire 20-question loop in a single giant database transaction, so if question 20 fails, all 19 previous generated answers are rolled back and lost.",
            "Failing to store the exact error string in the Answer record, leaving the student clueless about why a question failed."
          ]
        }
      ]
    },
    {
      "id": "cat-scenarios-scale",
      "name": "6. Scalability, Concurrency & Scenario-Based Questions",
      "description": "Handling 10x traffic, query optimization (N+1), database crashes, race conditions, and failure resilience.",
      "questions": [
        {
          "id": "q-tech-6",
          "question": "How did you optimize database queries and prevent N+1 performance bottlenecks?",
          "technicalExplanation": "To guarantee sub-5ms relational database query latency:\n1. Foreign Key Indexing: Created explicit B-tree indexes on frequently queried foreign key columns: 'resource_id', 'question_bank_id', and 'user_id'. Without these indexes, filtering questions by bank ID results in full-table sequential scans.\n2. Eager Loading (joinedload): When exporting a Solved Question Bank or rendering the dashboard, naive queries trigger the N+1 problem (1 query for the bank + N queries for each question + N queries for each answer). I used SQLAlchemy's 'joinedload' and 'selectinload' to fetch QuestionBanks with all nested Questions and Answers in a single SQL JOIN query.\n3. Semi-Structured JSON Columns: Stored dynamic metadata (page citations, Mermaid repair logs, structural exam hierarchies) in PostgreSQL 'JSONB' columns rather than creating fragmented child tables, preserving relational integrity while accommodating variable document schemas.",
          "actualImplementation": "Eager loading queries in `as-backend/app/answers/service.py` and model index definitions in `as-backend/app/db/models.py`.",
          "sourceFile": "as-backend/app/answers/service.py & as-backend/app/db/models.py",
          "sourceFunction": "app.answers.service.get_full_question_bank & app.db.models",
          "realWorldExample": "Loading a 50-question exam paper with nested answers previously required 51 database roundtrips taking 240ms; switching to `joinedload` reduced this to 1 query executing in 8ms."
        },
        {
          "id": "q-scen-7",
          "question": "How would you reduce project response time?",
          "technicalExplanation": "To cut end-to-end response time across retrieval, generation, and rendering:\n1. Token Streaming with Server-Sent Events (SSE): Instead of making the student wait 15–20 seconds for an entire answer set to generate, stream tokens progressively via SSE. Time to First Token (TTFT) drops to under 800ms.\n2. Concurrent Vector Retrieval: Use 'asyncio.gather' to execute Qdrant similarity searches for multiple questions in parallel rather than sequentially querying the vector database.\n3. PDF Pre-Compilation & Font Warming: Matplotlib's Computer Modern font parser takes ~300ms on initial cold load. Pre-warming the 'MathTextParser' instance during FastAPI startup ('@app.on_event(\"startup\")') removes cold-start latency.\n4. CDN PDF Caching: Cache compiled PDF study booklets on Cloudinary/Cloudflare CDN with an immutable hash. Subsequent downloads take <30ms from edge locations without invoking Python PDF compilation.",
          "actualImplementation": "FastAPI lifespan startup hooks in `as-backend/app/main.py` and concurrent chunk ingestion in `as-backend/app/indexing/service.py`.",
          "sourceFile": "as-backend/app/main.py & as-backend/app/rag/service.py",
          "sourceFunction": "app.main.lifespan & app.rag.service.generate_rag_answer",
          "realWorldExample": "Pre-warming the math font parser and using parallel Qdrant vector retrieval reduced full 10-question booklet generation time from 42 seconds down to 14 seconds."
        },
        {
          "id": "q-scen-8",
          "question": "If memory consumption becomes high, what will you check?",
          "technicalExplanation": "I investigate four primary memory sinks in document processing systems:\n1. PyMuPDF Ingestion Streams: When parsing 1,000-page engineering textbooks, loading all pages as raw text strings into memory can consume hundreds of megabytes. Verify that 'doc.close()' is called in a 'finally' block and pages are iterated via generators.\n2. Qdrant HNSW Graph Memory: Check Qdrant RAM utilization via 'GET /collections/{name}'. If memory exceeds limits, verify whether vector storage is set to 'on_disk=True' and whether payload quantization is active.\n3. ReportLab Canvas & Image Buffers: ReportLab uses in-memory 'io.BytesIO' streams for rasterized math equations and Mermaid SVGs. Verify that temporary image buffers are closed and freed after being written to the PDF canvas.\n4. Matplotlib Figure Leak: In Python, Matplotlib retains references to generated figures globally. Verify that every call to 'MathTextParser' avoids accumulating state, or explicitly invoke 'plt.close('all')' to ensure garbage collection collects raster buffers.",
          "actualImplementation": "Resource indexing cleanup in `as-backend/app/indexing/service.py` and math renderer buffer handling in `as-backend/app/pdf/mathrender.py`.",
          "sourceFile": "as-backend/app/indexing/service.py & as-backend/app/pdf/mathrender.py",
          "sourceFunction": "app.indexing.service.index_pdf_resource & app.pdf.mathrender.MathRenderer",
          "realWorldExample": "A memory leak test parsing 5 textbooks in a row showed stable 140MB RAM usage after ensuring PyMuPDF document handles were explicitly closed in Python context managers."
        },
        {
          "id": "q-scen-3",
          "question": "If project performance becomes slow, where will you investigate first?",
          "technicalExplanation": "I follow a methodical data-path profiling approach:\n1. LLM API Latency (80–90% of total delay): Check OpenAI API response times and rate-limit headers. In multi-question generation, each sequential GPT call takes 1.5–3s.\n2. Vector Retrieval & Payload Indexing: Inspect Qdrant query response times. If vector search exceeds 100ms, check if payload index ('create_payload_index') exists on 'metadata.resource_id'. Without a payload index, Qdrant executes an expensive full-collection scan.\n3. ReportLab Math Rasterization CPU Overhead: Check backend CPU utilization during PDF generation. Parsing dozens of LaTeX formulas via Matplotlib and fetching Mermaid SVGs from Kroki.io can bottleneck single-core CPUs.\n4. Database Query Profiling: Enable SQLAlchemy query logging and check PostgreSQL 'pg_stat_activity' for long-running transactions or missing foreign key indexes on 'question_bank_id'.\n5. Frontend Profiling: Check Chrome DevTools Performance tab for re-rendering lag during KaTeX live math rendering with large document trees.",
          "actualImplementation": "Health endpoint metrics tracking in `as-backend/app/main.py` and payload index creation in `as-backend/app/vector_store/qdrant.py`.",
          "sourceFile": "as-backend/app/main.py & as-backend/app/vector_store/qdrant.py",
          "sourceFunction": "app.main.health_check & app.vector_store.qdrant.ensure_collection",
          "realWorldExample": "Diagnosed a 12-second generation slowdown: discovered an unindexed resource filter in Qdrant. Adding a keyword payload index on resource_id dropped retrieval time from 1.8s to 42ms."
        },
        {
          "id": "q-scen-1",
          "question": "What will happen if your project receives ten times more users?",
          "technicalExplanation": "If AcademicStack receives 10x traffic (e.g. 5,000 active students during exam week), the system would encounter two immediate bottlenecks: ASGI worker thread saturation during sequential LLM generation, and Qdrant memory consumption from hundreds of textbook vector collections.\nTo handle 10x load reliably:\n1. Asynchronous Job Worker Offloading: Decouple generation requests into Celery or ARQ worker pools backed by Redis with connection pooling ('asyncpg').\n2. Qdrant On-Disk Storage & Quantization: Configure Qdrant with 'on_disk=True' for vectors and payloads and enable Scalar Quantization (converting 32-bit floats to 8-bit integers), reducing RAM consumption by up to 75% while maintaining 99% retrieval precision.\n3. Read-Replica Partitioning: Add PostgreSQL read-replicas for question bank browsing, resource listing, and auth checks.\n4. Response & Binary PDF Caching: Cache compiled PDF binaries in Cloudinary/S3 so repeated downloads execute in under 30ms via CDN edge nodes without invoking ReportLab compilation.",
          "actualImplementation": "Configuring worker pools and Qdrant collection params in `as-backend/app/vector_store/qdrant.py:ensure_collection`.",
          "sourceFile": "as-backend/app/vector_store/qdrant.py & as-backend/app/answers/service.py",
          "sourceFunction": "app.vector_store.qdrant.ensure_collection & app.answers.service.generate_answer_set",
          "realWorldExample": "During an end-of-semester peak with 500 concurrent students, moving compilation off ASGI workers to Redis prevents HTTP 504 gateway timeouts on Render and keeps API response latency under 20ms."
        },
        {
          "id": "q-scen-6",
          "question": "Suppose two users update the same record simultaneously. What would happen?",
          "technicalExplanation": "In AcademicStack, question banks and uploaded resources belong to individual users ('user_id'), making cross-user concurrent writes rare. However, if a user opens the same question in two browser tabs and edits the answer text simultaneously:\n1. Current Behavior: PostgreSQL and SQLAlchemy operate under the default Read Committed isolation level. The last transaction to execute 'session.commit()' silently overwrites changes made by the earlier transaction (Last Write Wins).\n2. The Production Solution: Implement Optimistic Concurrency Control (OCC):\n   - Add a 'version_id = Column(Integer, default=1)' column to SQLAlchemy models ('Question', 'Answer').\n   - When updating, execute: 'UPDATE questions SET answer_text = :text, version_id = version_id + 1 WHERE id = :id AND version_id = :current_version'.\n   - If the row count affected is 0, another write occurred; the backend raises HTTP 409 Conflict with a message: 'Record has been modified by another session. Please refresh.'",
          "actualImplementation": "Relational models defined in `as-backend/app/db/models.py` using SQLAlchemy 2.0 declarative base.",
          "sourceFile": "as-backend/app/db/models.py",
          "sourceFunction": "SQLAlchemy declarative mapping in app.db.models",
          "realWorldExample": "If a student edits an answer in the React web dashboard while an automated background predictor finishes updating the same question, optimistic locking prevents silent loss of the student's manual notes."
        },
        {
          "id": "q-scen-9",
          "question": "What happens if one module fails?",
          "technicalExplanation": "AcademicStack is architected with decoupled boundaries and graceful degradation fallbacks:\n1. If ReportLab PDF Generation Fails: The raw Markdown answer and syllabus page citations remain safely stored in PostgreSQL and displayed in the React web dashboard with live KaTeX rendering. The student can still study and review answers even if the PDF compiler encounters a font error.\n2. If Mermaid Diagram Rendering Fails: If Kroki.io is unreachable or the diagram syntax is invalid, the PDF compilation engine falls back to rendering the sanitized Mermaid code inside a shaded code block rather than crashing the entire document compilation.\n3. If Qdrant Vector Retrieval Fails: The RAG service falls back to chapter title and syllabus outline metadata stored in PostgreSQL, allowing the LLM to generate an answer based on syllabus structure rather than returning a 500 server error.\n4. If OpenAI Rate Limits: The system implements exponential backoff with jitter and retries up to 3 times before returning a graceful 429 response informing the student to retry in a few seconds.",
          "actualImplementation": "Graceful error boundaries in `as-backend/app/pdf/generator.py` (Mermaid code fallback) and global exception handlers in `as-backend/app/main.py`.",
          "sourceFile": "as-backend/app/pdf/generator.py & as-backend/app/main.py",
          "sourceFunction": "app.pdf.generator._repair_mermaid & app.main.global_exception_handler",
          "realWorldExample": "When Kroki.io had an external network outage, our PDF generator caught the HTTP timeout, printed the Mermaid code in a neat monospace font box, and completed the 20-page revision PDF without dropping the user's exam booklet."
        },
        {
          "id": "q-rel-1",
          "question": "How does AcademicStack guarantee high availability during OpenAI rate limits and service outages?",
          "difficulty": "Hard",
          "whyAsked": "Examines production resilience against third-party API failures, exponential backoff, rate limit header parsing, and automated model failovers.",
          "shortAnswer": "AcademicStack implements call_openai_with_fallback in app/llm/router.py with an automated fallback chain (gpt-4o-mini -> gpt-4o), exponential retry backoff, dynamic retryDelay regex parsing, and fast failover if wait times exceed 10 seconds.",
          "technicalExplanation": "In 'as-backend/app/llm/router.py':\n1. Candidate Model Chain: Defines fallback chains (e.g., OPENAI_GENERATION_MODELS = ['gpt-4o-mini', 'gpt-4o']).\n2. Exponential Backoff with Retry: Each model attempts up to 2 retries with a base delay of 2.0 * (attempt + 1) seconds.\n3. Dynamic Rate Limit Parsing: If OpenAI throws a 429 rate limit error, regex extracts the required wait time (e.g. retry in 4.5s):\n   retry_match = re.search(r'(?:retry in|retryDelay[^0-9]*)(\\d+(?:\\.\\d+)?)', err_msg)\n4. Fast Failover: If the required wait time exceeds 10 seconds and an alternative model is available in the chain, it triggers a fast failover to the next model immediately instead of blocking the thread.\n5. Structured Diagnostics: Full logging tracks start time, elapsed seconds, model name, and task identifier.",
          "actualImplementation": "`as-backend/app/llm/router.py:call_openai_with_fallback` lines 53-125.",
          "sourceFile": "as-backend/app/llm/router.py",
          "sourceFunction": "app.llm.router.call_openai_with_fallback",
          "realWorldExample": "During an exam surge, OpenAI's gpt-4o-mini tier experiences high latency and throws a 429 rate limit with a 15-second delay. The router logs `[FAST FAILOVER]` and immediately switches to `gpt-4o`, completing the student's answer generation without an error.",
          "followUps": [
            "What happens if all models in the fallback chain fail?",
            "How does the frontend communicate model fallback events to the user?"
          ],
          "commonMistakes": [
            "Catching exceptions and immediately failing without inspecting rate limit retry-after headers.",
            "Blocking synchronous threads indefinitely with fixed 30-second sleeps during high-traffic surges."
          ]
        },
        {
          "id": "q-scen-2",
          "question": "What would you do if the database crashes?",
          "technicalExplanation": "AcademicStack architecturally isolates relational metadata in PostgreSQL from vector embeddings in Qdrant, which limits blast radius:\n1. If PostgreSQL Crashes: User sessions, question bank structures, and answer history become temporarily unavailable, but vector collections in Qdrant and raw PDFs in Cloudinary remain intact. Disaster recovery involves replaying PostgreSQL Write-Ahead Logs (WAL) and restoring from automated daily pg_dump snapshots mounted via persistent Docker volumes.\n2. If Qdrant Crashes: Relational data, user accounts, and completed PDF history remain completely unaffected. If vector indexes are corrupted, collections can be deterministically rebuilt using our 'reindex_resource' API: PyMuPDF re-extracts the source PDF stored in Cloudinary and re-inserts chunks into a fresh Qdrant collection.\n3. Health Monitoring: The '/api/health' endpoint actively executes 'SELECT 1' on PostgreSQL and tests the Qdrant gRPC/HTTP socket, alerting incident monitoring (e.g. Sentry/PagerDuty) immediately upon failure.",
          "actualImplementation": "Active database and vector store socket ping in `as-backend/app/main.py:health_check` and resource reindexing in `as-backend/app/indexing/service.py`.",
          "sourceFile": "as-backend/app/main.py & as-backend/app/indexing/service.py",
          "sourceFunction": "app.main.health_check & app.indexing.service.index_pdf_resource",
          "realWorldExample": "If a cloud node reboot drops the Qdrant container, the user's previously generated PDFs remain instantly downloadable from PostgreSQL and Cloudinary with zero study disruption."
        },
        {
          "id": "q-scen-4",
          "question": "What if users enter invalid input?",
          "technicalExplanation": "AcademicStack enforces defense-in-depth validation across every layer of the system:\n1. Pydantic v2 Schema Boundary: All incoming request bodies are validated against strict Pydantic models in 'as-backend/app/schemas/'. Invalid types, empty strings, missing fields, or malformed emails are immediately rejected with HTTP 422 Unprocessable Entity with exact error locations before reaching business logic.\n2. File Upload Validation: When uploading PDFs, the handler checks file extension, MIME type, and magic bytes (%PDF) to prevent uploading executable or malicious binaries, capped at 50MB.\n3. Prompt Injection Defense: Text extracted from student questions is escaped and wrapped inside strict XML/delimiter fences ('<question>...</question>') in prompt templates to prevent prompt jailbreaking or instruction overriding.\n4. Formula & Diagram Sanitization: Raw LaTeX math formulas are tested in Matplotlib before compilation. Mermaid diagrams pass through a regex auto-repair function ('as-backend/app/pdf/generator.py:_repair_mermaid') that fixes unclosed brackets and illegal quotes, preventing layout crashes.",
          "actualImplementation": "Pydantic models in `as-backend/app/schemas/` and Mermaid regex sanitization in `as-backend/app/pdf/generator.py`.",
          "sourceFile": "as-backend/app/schemas/ & as-backend/app/pdf/generator.py",
          "sourceFunction": "Pydantic schema validators & app.pdf.generator._repair_mermaid",
          "realWorldExample": "If a student inputs a question containing malformed Mermaid flowchart syntax with unescaped parentheses, our auto-repair regex fixes quotes and brackets automatically, rendering the PDF without raising an unhandled exception."
        },
        {
          "id": "q-scen-5",
          "question": "How would you improve project security?",
          "technicalExplanation": "To elevate AcademicStack to enterprise-grade compliance:\n1. Cryptographic Key Rotation: Implement automated key rotation for Fernet BYOK encryption keys, maintaining a MultiFernet keyring that decrypts older keys while re-encrypting with the latest master secret.\n2. Strict Rate Limiting: Deploy Redis-backed sliding-window rate limiters ('slowapi') on '/api/auth/login' (5 requests/min to prevent brute-force attacks) and '/api/answer-sets/generate' (to prevent token budget exhaustion).\n3. Row-Level Multi-Tenant Isolation: Ensure SQLAlchemy queries always inject 'user_id == current_user.id' from the validated JWT token rather than trusting user IDs passed in JSON payloads.\n4. Content Security Policy (CSP): Enforce strict HTTP response headers on FastAPI: 'Content-Security-Policy', 'X-Content-Type-Options: nosniff', and 'Strict-Transport-Security' (HSTS).\n5. Ephemeral Key Invalidation: Store encrypted OpenAI keys in Redis with time-to-live (TTL) expiration so keys are evicted from memory when user sessions terminate.",
          "actualImplementation": "Fernet encryption implemented in `as-backend/app/auth/security.py` and JWT token verification in `as-backend/app/auth/routes.py`.",
          "sourceFile": "as-backend/app/auth/security.py",
          "sourceFunction": "app.auth.security.encrypt_api_key & app.auth.security.decrypt_api_key",
          "realWorldExample": "If a user requests `/api/question-banks/15`, the query joins against `user_id == current_user.id`, ensuring students cannot access another student's exam blueprints even if they guess sequential IDs."
        }
      ]
    },
    {
      "id": "cat-testing-deploy",
      "name": "7. Testing, Debugging & Production Deployment",
      "description": "Integration testing, most difficult bug diagnosis, development challenges, and Docker containerization.",
      "questions": [
        {
          "id": "q-core-7",
          "question": "How did you test your project?",
          "technicalExplanation": "I tested AcademicStack across unit, integration, and end-to-end operational scenarios:\n1. Vector Retrieval Grounding Tests: Ingested large multi-chapter textbooks (e.g., Computer Networks, 800 pages) and ran similarity queries to verify that Qdrant payload filters strictly isolated chunks to metadata.resource_id, preventing cross-subject contamination.\n2. Mark Scaling Validation: Tested prompts across 2-mark, 5-mark, and 10-mark questions, verifying that Stage 2 Reviewer strictly trimmed responses to 5–7 lines for 2 marks and generated ~250 words + Mermaid diagrams for 10 marks.\n3. PDF Layout & Stress Tests: Generated 40-page PDFs with dozens of complex LaTeX math formulas (integrals, Greek symbols, matrices) and multi-node Mermaid flowcharts to verify zero text clipping, table boundary preservation, and two-pass page numbering accuracy.\n4. Security & Crypto Tests: Verified that user API keys encrypted with Fernet AES-128-CBC could not be decrypted without the secret key and were never leaked in application logs or REST responses.",
          "actualImplementation": "Tested using Pytest for backend API route validation and manual verification scripts using actual semester exam question sets.",
          "sourceFile": "as-backend/tests/ & as-backend/app/rag/service.py",
          "sourceFunction": "app.rag.service.generate_rag_answer & app.pdf.generator.generate_pdf",
          "realWorldExample": "Tested uploading an Operating Systems paper alongside a Computer Networks book; verified that the system returned zero results instead of hallucinating cross-subject networking chunks."
        },
        {
          "id": "q-test-2",
          "question": "How would you design an automated integration test suite for the two-stage RAG pipeline in AcademicStack?",
          "difficulty": "Hard",
          "whyAsked": "Tests understanding of testing AI systems, mocking external LLM endpoints, deterministic test fixtures, and CI/CD quality gates.",
          "shortAnswer": "Use pytest with mocked OpenAI API responses via pytest-mock to test directive enforcement and line-count scaling, combined with an ephemeral Testcontainers PostgreSQL and Qdrant container to verify vector filtering without external API costs.",
          "technicalExplanation": "Testing RAG pipelines requires decoupling non-deterministic LLM behavior:\n1. Unit Testing Directives: Test build_answer_directives with various inputs (2M, 5M, 10M, comparisons) to assert exact strings are generated deterministically.\n2. Mocking LLM Calls: Mock call_openai in pytest to return controlled synthetic markdown strings, verifying that repair_mermaid_syntax, clean_answer_text, and MathTextParser execute without raising unhandled exceptions.\n3. Integration Tests with Testcontainers: Spin up ephemeral Qdrant and PostgreSQL Docker containers during CI, ingest a small fixture PDF, run vector search, and assert that retrieved chunks strictly match metadata.resource_id.\n4. E2E Evaluation (Ragas / TruLens): Run periodic offline evaluation measuring Context Recall, Faithfulness, and Answer Relevance against a golden dataset of 50 verified university exam questions.",
          "actualImplementation": "Currently, AcademicStack utilizes functional health endpoints (`/api/health`, `/api/health/db`, `/api/health/qdrant`) in `as-backend/app/main.py`. Comprehensive automated test suites represent a recommended production improvement.",
          "sourceFile": "as-backend/app/main.py",
          "sourceFunction": "app.main.health_check & app.main.database_health_check",
          "realWorldExample": "In CI/CD, a test ensures that if a mocked LLM returns an unclosed Mermaid diagram `graph TD A --> B[Label`, the `repair_mermaid_syntax` function automatically balances brackets and prevents a 500 error.",
          "followUps": [
            "How do you test for prompt injection vulnerabilities in student-submitted custom directives?",
            "What metric would you use to measure citation accuracy automatically?"
          ],
          "commonMistakes": [
            "Making real live OpenAI API calls during CI test runs, which incurs continuous billing and causes intermittent test failures due to rate limits.",
            "Testing only happy paths and ignoring malformed PDF bytes, corrupted fonts, or empty search results."
          ]
        },
        {
          "id": "q-core-5",
          "question": "Which module in your project was most difficult?",
          "technicalExplanation": "The publication-grade PDF compilation and typography engine in 'as-backend/app/pdf/generator.py' was the most technically challenging module.\n1. The Problem: Standard HTML-to-PDF rendering tools (e.g. wkhtmltopdf, Puppeteer) are notoriously unreliable for academic documents: formulas get clipped, multi-page tables truncate awkwardly, and page numbers cannot compute 'Page X of Y' dynamically.\n2. The Engineering: I engineered a headless ReportLab flowable pipeline. The hardest challenge was mathematical formula baseline alignment. Matplotlib's MathTextParser outputs raster images, but ReportLab inline images default to bottom-left alignment, causing formulas like subscripts or integrals to float above or collide with English sentences.\n3. The Solution: I extracted the depth metric (baseline-to-lowest-descender offset) from Matplotlib's parser, converted it to typographic points (depth_pt), and applied negative vertical alignment (valign=-depth_pt) in the paragraph image tags. Combined with a custom two-pass NumberedCanvas to calculate total page count, it produces textbook-quality printouts.",
          "actualImplementation": "`as-backend/app/pdf/mathrender.py` extracts baseline depth metrics, and `as-backend/app/pdf/generator.py` uses `NumberedCanvas` to calculate dynamic page counts.",
          "sourceFile": "as-backend/app/pdf/mathrender.py & as-backend/app/pdf/generator.py",
          "sourceFunction": "app.pdf.mathrender.MathRenderer.render_inline & app.pdf.generator.NumberedCanvas",
          "realWorldExample": "In an equation like $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$, the limit subscript $x \\to 0$ previously clipped the line below. By computing depth_pt=5.1pt, the formula sits cleanly on the text baseline with zero overlap."
        },
        {
          "id": "q-core-8",
          "question": "What challenges did you face during development?",
          "technicalExplanation": "I overcame three major technical challenges during development:\n1. LLM Verbosity vs Exam Mark Directives: LLMs are trained to be conversational and exhaustive. For a 2-mark university question, GPT would generate 400 words. Solved by introducing dynamic prompt directives based on regex detection of mark patterns, followed by a second-stage Academic Reviewer persona that ruthlessly trims filler text to fit exact 5–7 line bounds.\n2. Typography Alignment in PDF Canvas: Converting LaTeX formulas into Matplotlib raster images created misaligned text baselines inside ReportLab Paragraphs. Solved by inspecting Matplotlib's internal depth metrics and dynamically calculating negative vertical offsets (valign=-depth_pt).\n3. Large Historical Exam Paper Parsing: Scanned exam papers often contain watermarks, skewed columns, and choice structures ('Answer any 4 of 6'). Standard OCR failed. Solved by implementing a dual-mode ingestion strategy: PyMuPDF for digital PDFs and GPT-4o Vision OCR fallback for scanned images, with a Choice Question Mandatory Pool parser to preserve option hierarchies.",
          "actualImplementation": "`as-backend/app/rag/prompts.py` (directives), `as-backend/app/pdf/mathrender.py` (baseline compensation), and `as-backend/app/predictor/service.py` (blueprint parser).",
          "sourceFile": "as-backend/app/rag/prompts.py & as-backend/app/pdf/mathrender.py",
          "sourceFunction": "app.rag.prompts.get_directives_for_marks & app.pdf.mathrender.MathRenderer.render_inline",
          "realWorldExample": "Historical university papers frequently use 'Answer any 4 out of 6 (5 marks each)'. Traditional parsers extract only 4 questions; our parser preserves all 6 in the option pool to mirror the authentic university format."
        },
        {
          "id": "q-beh-1",
          "question": "What was the most challenging technical bug you encountered while building AcademicStack, and how did you diagnose and resolve it?",
          "difficulty": "Hard",
          "whyAsked": "Assesses problem-solving methodology, debugging under pressure, root-cause analysis, and deep technical grit.",
          "shortAnswer": "The most challenging bug was vertical typography clipping and baseline misalignment of inline LaTeX math formulas inside ReportLab PDF paragraphs, which caused equations like $x_i^2$ to overlap adjacent text lines.",
          "technicalExplanation": "1. The Symptom: When generating Solved Question Bank PDFs, inline math equations converted to images were either floating 6 points above the sentence or clipping the tops of capital letters on lines below them.\n2. The Root Cause: ReportLab Paragraphs render standard text using typographic font metrics (ascenders and descenders), but embedded <img> tags are rendered from the bottom-left corner with zero baseline awareness by default.\n3. The Investigation: I dug into Matplotlib's MathTextParser internals and discovered that parser.to_rgba() returns not only the pixel buffer, but also a crucial depth metric: the distance from the baseline to the lowest descender of the equation.\n4. The Fix: In 'as-backend/app/pdf/mathrender.py', I calculated depth_pt = _px_to_pt(depth) and constructed ReportLab image tags with valign=-depth_pt:\n   <img src='...' width='...' height='...' valign='{-im.depth_pt:.2f}'/>\nThis dynamically dropped equations with descenders (like $g(x)$ or $\\mu$) exactly to the typographic baseline, eliminating all text overlap.",
          "actualImplementation": "`as-backend/app/pdf/mathrender.py` lines 28-30 (InlineMath namedtuple containing depth_pt) and lines 60-63 in `as-backend/app/pdf/cheatsheet_generator.py:_img_tag`.",
          "sourceFile": "as-backend/app/pdf/mathrender.py & as-backend/app/pdf/generator.py",
          "sourceFunction": "app.pdf.mathrender.MathRenderer.render_inline",
          "realWorldExample": "In an equation like $\\sum_{i=1}^n \\frac{x_i}{y_i}$, the lower subscript $i=1$ and denominator $y_i$ previously collided with the text line below. Calculating depth_pt adjusted the vertical placement by exactly 4.2 points, yielding publication-quality alignment.",
          "followUps": [
            "How did you prevent memory leaks when creating thousands of temporary math images during PDF compilation?",
            "What would you do if a LaTeX expression contains unsupported custom macros?"
          ],
          "commonMistakes": [
            "Blaming the PDF library and giving up on mathematical equations in favor of plain text.",
            "Applying a fixed static vertical offset to all equations, which breaks single-character formulas like $x$ or $N$."
          ]
        },
        {
          "id": "q-res-3",
          "question": "Which feature took more time than expected?",
          "technicalExplanation": "The baseline typography alignment of inline LaTeX math formulas in ReportLab PDFs ('as-backend/app/pdf/mathrender.py') took twice as long as originally planned:\n1. The Problem: When mathematical equations (like $x_i^2$ or $\\int f(x)dx$) are rasterized to images, ReportLab's Paragraph layout places them on the lower baseline by default. Formulas with descenders (subscripts, Greek letters like $\\beta$ or $\\mu$) floated unnaturally or overlapped the text line below.\n2. The Investigation: I had to study the internal source code of Matplotlib's 'MathTextParser'. I discovered that parser.to_rgba() calculates a 'depth' metric: the distance from the baseline to the lowest descender of the equation.\n3. The Solution: In 'as-backend/app/pdf/mathrender.py', I converted depth into typographic points ('depth_pt') and injected negative vertical alignment ('valign=-depth_pt') into the ReportLab HTML image tags. Getting this pixel-perfect across varying font sizes and complex formulas took several days of trial and error.",
          "actualImplementation": "Implemented in `as-backend/app/pdf/mathrender.py:render_inline` and `as-backend/app/pdf/generator.py`.",
          "sourceFile": "as-backend/app/pdf/mathrender.py & as-backend/app/pdf/generator.py",
          "sourceFunction": "app.pdf.mathrender.MathRenderer.render_inline",
          "realWorldExample": "In an equation like $\\sum_{i=1}^n \\frac{x_i}{y_i}$, the lower subscript $i=1$ and denominator $y_i$ previously collided with the text line below. Calculating depth_pt adjusted the vertical placement by exactly 4.2 points, yielding publication-quality alignment."
        },
        {
          "id": "q-res-4",
          "question": "What mistake did you make during development?",
          "technicalExplanation": "My biggest architectural mistake was initial global vector retrieval without payload filters:\n1. The Mistake: When I first set up Qdrant, I performed global semantic vector search across all indexed chunks in the collection.\n2. The Bug: When a student asked an Operating Systems question about 'Socket Programming and Inter-Process Communication', Qdrant retrieved chunks from an 800-page Computer Networks textbook that another student had uploaded earlier, because both subjects shared networking terminology.\n3. The Fix: I refactored the Qdrant ingestion and retrieval pipeline. Every chunk is now tagged with strict metadata payloads ('resource_id', 'subject_code', 'chapter_id'). During query execution, the retriever constructs a mandatory Qdrant boolean filter ('Filter(must=[FieldCondition(key=\"metadata.resource_id\", match=MatchValue(value=resource_id))])'). This guaranteed 100% syllabus isolation with zero cross-subject contamination.",
          "actualImplementation": "Qdrant payload filter condition enforced in `as-backend/app/rag/retriever.py:retrieve_relevant_documents`.",
          "sourceFile": "as-backend/app/rag/retriever.py",
          "sourceFunction": "app.rag.retriever.retrieve_relevant_documents",
          "realWorldExample": "Testing with 5 uploaded textbooks showed that payload filtering reduced search space from 25,000 chunks down to exactly the 1,200 chunks of the target syllabus textbook, cutting retrieval latency to under 35ms."
        },
        {
          "id": "q-res-5",
          "question": "What assumptions did you make while building the project?",
          "technicalExplanation": "I designed AcademicStack based on three practical engineering assumptions:\n1. Searchable Syllabus Textbooks: Assumed uploaded syllabus PDFs contain extractable digital text or clean scans suitable for PyMuPDF or GPT-4o Vision OCR. For heavily degraded or handwritten notes, standard text splitters struggle without extensive OCR preprocessing.\n2. Exam Blueprint Predictability: Assumed university exam formats follow recurring patterns: questions repeat every 2–3 semesters, and question structures (e.g. 5 questions of 10 marks each) remain consistent across academic years. Validated this across 15 actual university papers.\n3. Bring-Your-Own-Key Viability: Assumed students or educational labs would be comfortable supplying an OpenAI API key via BYOK encryption in exchange for unlimited document processing, avoiding platform subscription fees.",
          "actualImplementation": "Dual-mode PyMuPDF / Vision OCR extraction in `as-backend/app/predictor/service.py` and BYOK encryption in `as-backend/app/auth/security.py`.",
          "sourceFile": "as-backend/app/predictor/service.py & as-backend/app/auth/security.py",
          "sourceFunction": "app.predictor.service.predict_blueprint & app.auth.security.encrypt_api_key",
          "realWorldExample": "Analysis of 5 years of semester papers showed that over 70% of exam questions in engineering subjects (OS, DBMS, CN) were direct or rephrased repeats from previous question banks."
        },
        {
          "id": "q-test-1",
          "question": "How is AcademicStack containerized and deployed, and how are environment variables structured across environments?",
          "difficulty": "Medium",
          "whyAsked": "Examines DevOps fundamentals, 12-factor app principles, Dockerfile best practices, and separating configuration from code.",
          "shortAnswer": "AcademicStack utilizes multi-stage Dockerfiles for backend and frontend, docker-compose for local orchestration, strict .env.example templates, and stateless cloud container deployment on platforms like Render and Vercel.",
          "technicalExplanation": "In 'as-backend/Dockerfile' and 'docker-compose.yml':\n1. Backend Dockerfile: Python 3.11-slim base image, installs system libraries for PyMuPDF and ReportLab fonts, installs pip requirements, and exposes port 8000. Runs Uvicorn as ASGI server.\n2. Database Health Checks: docker-compose defines PostgreSQL and Qdrant services with health checks (pg_isready -U user) and volume persistence.\n3. Environment Decoupling: Sensitive credentials (DATABASE_URL, QDRANT_HOST, JWT_SECRET, ENCRYPTION_KEY, CLOUDINARY_URL) are injected via environment variables and never checked into source control.\n4. Frontend Build: Vite compiles static JS/CSS assets into 'dist/', served via Vercel with vercel.json rewrite rules for single-page client routing.",
          "actualImplementation": "`as-backend/Dockerfile`, `as-backend/docker-compose.yml`, `as-backend/.env.example`, and `as-frontend/vercel.json`.",
          "sourceFile": "as-backend/Dockerfile & as-backend/docker-compose.yml",
          "sourceFunction": "Docker orchestration and environment configuration",
          "realWorldExample": "A new developer clones the repository, runs `docker compose up --build`, and has the full stack (FastAPI, PostgreSQL, Qdrant) running locally within 2 minutes without manually installing system dependencies.",
          "followUps": [
            "How do you handle database migrations inside Docker during deployment?",
            "What security settings should be applied to the Docker container to prevent root execution?"
          ],
          "commonMistakes": [
            "Committing production .env files containing real encryption keys or database passwords to git.",
            "Using fat base images (like python:3.11 full) in production, resulting in 1GB+ container images with unnecessary vulnerabilities."
          ]
        },
        {
          "id": "q-scen-10",
          "question": "How would you deploy this project for real users?",
          "technicalExplanation": "To take AcademicStack into high-availability production:\n1. Containerization & Orchestration: Multi-container setup managed via Docker Compose and deployed to AWS ECS or Render.\n   - Backend: FastAPI running on Gunicorn with multiple Uvicorn worker processes ('uvicorn.workers.UvicornWorker').\n   - Database: Managed PostgreSQL (Amazon RDS or Supabase) with automated daily backups, read replicas, and SSL enforcement.\n   - Vector Store: Managed Qdrant Cloud cluster with multi-tenant payload isolation.\n2. Frontend Edge Hosting: React 19 production build deployed on Vercel or Cloudflare Pages with global edge distribution and Brotli/Gzip compression.\n3. File & CDN Storage: Cloudinary or AWS S3 with signed upload URLs for textbook PDFs and compiled PDF downloads.\n4. Security & Networking: NGINX reverse proxy with Let's Encrypt SSL/TLS termination, strict CORS headers, and Cloudflare DDoS protection.\n5. Observability: Sentry for frontend and backend runtime error tracking, paired with Prometheus + Grafana metrics monitoring API latencies, active user counts, and Qdrant retrieval durations.",
          "actualImplementation": "Docker configuration in `as-backend/Dockerfile`, environment configuration in `as-backend/.env`, and production build scripts in `as-frontend/package.json`.",
          "sourceFile": "as-backend/Dockerfile & as-frontend/vite.config.js",
          "sourceFunction": "Container entrypoints and Vite build configurations",
          "realWorldExample": "Deploying on Render and Supabase with Cloudinary CDN allowed handling 300 simultaneous PDF compilation jobs with zero container crashes and average latency under 2.5s."
        }
      ]
    },
    {
      "id": "cat-retrospective",
      "name": "8. Engineering Retrospective, Trade-offs & Future Scope",
      "description": "Lessons learned, architecture re-design decisions, scope management under deadlines, and future roadmap.",
      "questions": [
        {
          "id": "q-core-9",
          "question": "If you restart the project today, what would you change?",
          "technicalExplanation": "If re-architecting AcademicStack from the ground up, I would make three strategic improvements:\n1. Asynchronous Task Queue for Generation: Replace the synchronous loop in POST /api/answer-sets/generate with Celery or ARQ backed by Redis. For 20-question exam papers, batch LLM calls can take 60–90 seconds. A job queue with WebSockets or Server-Sent Events (SSE) would allow token-by-token streaming directly to the student UI, eliminating HTTP gateway timeout risks.\n2. Hybrid Sparse-Dense Vector Search: Combine dense semantic embeddings (OpenAI text-embedding-3-small) with sparse lexical BM25 retrieval (Qdrant native sparse vectors). In academic exams, students frequently search for exact acronyms or equation names (e.g. 'CSMA/CD' or 'Dijkstra'), which sparse search matches with 100% precision.\n3. Automated Evaluation Harness (Ragas / TruLens): Integrate an automated RAG evaluation framework into CI/CD to continuously benchmark faithfulness, answer relevance, and context precision on every prompt adjustment.",
          "actualImplementation": "Proposed architectural refactor detailed in Phase 7 audit: moving from polling in `as-backend/app/answers/service.py` to an event-driven queue.",
          "sourceFile": "as-backend/app/answers/service.py & as-backend/app/vector_store/qdrant.py",
          "sourceFunction": "app.answers.service.generate_answer_set & app.vector_store.qdrant.ensure_collection",
          "realWorldExample": "With WebSockets, students would see the first answer render on their screen within 2 seconds instead of waiting 60 seconds for the entire 20-question booklet to compile."
        },
        {
          "id": "q-res-2",
          "question": "Which decision in the project would you change now?",
          "technicalExplanation": "I would change the synchronous execution model of multi-question answer generation inside the HTTP request lifecycle:\n1. What I Did: Currently, when a student triggers answer generation for a 20-question exam paper, the FastAPI route runs a sequential 'for' loop calling OpenAI and Qdrant, while the client polls a '/progress' endpoint every 2 seconds.\n2. Why It's Technical Debt: For large question banks, keeping an HTTP connection open or polling the database creates unnecessary load and risks gateway timeouts (e.g. Cloudflare's 100-second HTTP timeout).\n3. The Better Decision: Implement an asynchronous job queue using Celery or ARQ backed by Redis. The API endpoint immediately returns HTTP 202 Accepted with a 'job_id', workers process the RAG generation concurrently in pools, and tokens are streamed directly to the frontend via WebSockets or Server-Sent Events (SSE).",
          "actualImplementation": "Currently implemented as synchronous loop in `as-backend/app/answers/service.py:generate_answer_set` with database progress polling in `as-backend/app/answers/routes.py`.",
          "sourceFile": "as-backend/app/answers/service.py & as-backend/app/answers/routes.py",
          "sourceFunction": "app.answers.service.generate_answer_set",
          "realWorldExample": "A 20-question question bank currently takes ~50 seconds in a single batch; with a parallelized Redis queue and SSE streaming, the student sees the first answer in 1.8 seconds."
        },
        {
          "id": "q-beh-2",
          "question": "If you could re-architect one component of AcademicStack from scratch today, what would it be and why?",
          "difficulty": "Hard",
          "whyAsked": "Tests architectural maturity, self-awareness, recognizing technical debt, and knowing how to evolve a prototype into a high-scale production system.",
          "shortAnswer": "I would replace the synchronous answer generation loop inside the FastAPI request handler with an asynchronous message queue powered by Redis and Celery (or ARQ), paired with Server-Sent Events (SSE) for real-time client token streaming.",
          "technicalExplanation": "1. The Current Limitation: Currently, POST /api/answer-sets/generate runs a synchronous loop across all questions in the bank inside the FastAPI worker thread, while the frontend polls /progress every 2 seconds.\n2. Scalability Bottleneck: For a 20-question exam paper, this request can take 45–60 seconds. While it works reliably for individual students, having 50 concurrent students generates 1,000 sequential LLM calls, saturating ASGI worker threads and risking HTTP gateway timeouts (e.g. Cloudflare 524).\n3. The Target Architecture:\n   - When a student clicks Generate, the endpoint immediately returns HTTP 202 Accepted with an answer_set_id and pushes a task to Redis.\n   - Distributed Celery/ARQ workers consume tasks, executing Qdrant retrieval and LLM calls in parallel pools with connection throttling.\n   - Stream tokens directly to the frontend via Server-Sent Events (SSE) or WebSockets, giving the student instantaneous live streaming feedback.",
          "actualImplementation": "Currently implemented as synchronous loop in `as-backend/app/answers/service.py:generate_answer_set` with database progress polling in `as-backend/app/answers/routes.py:get_answer_set_progress_endpoint`.",
          "sourceFile": "as-backend/app/answers/service.py",
          "sourceFunction": "app.answers.service.generate_answer_set",
          "realWorldExample": "During an end-of-semester exam night with 200 simultaneous users, moving from synchronous worker loops to a distributed Redis queue prevents ASGI thread starvation and keeps API response latencies for login and resource browsing under 20ms.",
          "followUps": [
            "Why choose Server-Sent Events (SSE) over full-duplex WebSockets for streaming answer text?",
            "How would you handle Redis task deduplication if a student clicks Generate twice rapidly?"
          ],
          "commonMistakes": [
            "Claiming that the current architecture has zero bottlenecks and can support millions of users without modification.",
            "Proposing complex microservice splits prematurely when a simple message queue within the existing backend solves the primary bottleneck."
          ]
        },
        {
          "id": "q-res-6",
          "question": "What feature would you remove if the deadline becomes shorter?",
          "technicalExplanation": "If faced with a tight deadline, I would remove the Community Shared Resource Hub ('as-backend/app/community/routes.py'):\n1. Why: The Community Hub allows students to publish, browse, and clone question banks and predicted exam blueprints shared by other students across universities.\n2. Why It Can Be Cut: While community sharing is an attractive social feature, it is secondary to the primary value proposition of AcademicStack: syllabus-isolated textbook RAG, mark-scaled answer synthesis, and publication-grade PDF cheatsheet generation.\n3. Impact: Cutting community sharing eliminates several API endpoints, voting schemas, and public/private privacy filters without compromising a student's personal exam revision workflow.",
          "actualImplementation": "Community routes and queries isolated in `as-backend/app/community/routes.py` and `as-backend/app/community/service.py`.",
          "sourceFile": "as-backend/app/community/routes.py",
          "sourceFunction": "app.community.routes.list_public_question_banks",
          "realWorldExample": "A student preparing the night before an exam only needs to upload their textbook, input their question paper, and download their cheatsheet booklet—community discovery is non-critical."
        },
        {
          "id": "q-res-7",
          "question": "What feature would you add with one extra month?",
          "technicalExplanation": "With one additional month of engineering bandwidth, I would build two high-leverage capabilities:\n1. Audio Flashcards & Revision Podcast Mode: Convert the compiled Rapid Recall cheatsheets into conversational multi-speaker audio summaries using ElevenLabs or OpenAI's Audio API. Students could listen to key formulas, definition summaries, and exam mnemonics while commuting to the exam hall.\n2. AI Handwritten Diagram Evaluator: Integrate a fine-tuned vision model where students photograph their handwritten practice diagrams (e.g. OSI model or B-Tree rotations). The system compares their drawing against the textbook architecture, highlights missing labels or incorrect pointer links, and predicts university mark deductions before the actual exam.",
          "actualImplementation": "Proposed expansion utilizing existing Cheatsheet data structures in `as-backend/app/pdf/cheatsheet_generator.py`.",
          "sourceFile": "as-backend/app/pdf/cheatsheet_generator.py & as-backend/app/rag/service.py",
          "sourceFunction": "app.pdf.cheatsheet_generator.generate_cheatsheet_pdf",
          "realWorldExample": "Students often lose marks on 10-mark questions because their diagrams miss specific pinouts or signal names; an automated diagram grader directly prevents these grading penalties."
        }
      ]
    }
  ]
};
