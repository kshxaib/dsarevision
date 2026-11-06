export const phase1Investigation = {
  title: "Phase 1: Complete Project Investigation",
  summary: "Comprehensive codebase investigation of AcademicStack (D:\\Shoaib\\AcademicStack), mapping the entire backend architecture, frontend workspace, database models, file manifest, and end-to-end execution flows.",
  targetProject: "Shoaib/Academic Stack (D:\\Shoaib\\AcademicStack)",
  verifiedAt: "2026-11-06",
  projectType: "Full-Stack AI University Exam Intelligence & Publication-Grade Study Engine",
  
  systemManifest: {
    backend: {
      framework: "FastAPI 0.141.1 (Python 3.11+)",
      webServer: "Uvicorn / Gunicorn ASGI",
      orm: "SQLAlchemy 2.0+ with Alembic migrations",
      database: "PostgreSQL with connection pooling (psycopg2-binary 2.9.12)",
      vectorStore: "Qdrant 1.19.0 (QdrantVectorStore, QdrantClient)",
      llmOrchestration: "LangChain 1.3.16 (langchain-openai 1.6.0, langchain-core 1.6.0)",
      llmModels: "OpenAI GPT-4o-mini (Primary) with automated fallback to GPT-4o",
      embeddings: "OpenAI text-embedding-3-small (1536-dimensional embeddings)",
      pdfPublishing: "ReportLab 5.0.1, Matplotlib 3.11.1 (MathTextParser 'agg', mathtext.fontset = 'cm')",
      documentParsing: "PyMuPDF 1.28.2 (fitz), pdfplumber, Pillow 12.3.0",
      security: "Bcrypt 5.0.0 (password hashing), PyJWT 2.13.0 (HS256 access tokens), Cryptography Fernet (symmetric API key encryption)",
      cloudStorage: "Cloudinary 1.46.0 CDN (PDF storage & asset delivery)"
    },
    frontend: {
      framework: "React 19.2.8",
      bundler: "Vite 8.2.0 (@vitejs/plugin-react 6.0.4)",
      styling: "TailwindCSS v4.3.3 (@tailwindcss/vite)",
      stateManagement: "Zustand 5.0.15 (modular domain stores)",
      typographyMath: "KaTeX 0.18.4 (rehype-katex 7.0.1, remark-math 6.0.0, remark-gfm 4.0.1)",
      diagramming: "Mermaid.js 11.17.2 with automated syntax validation and Kroki.io fallback",
      motion: "Motion 13.1.1 (framer-motion successor)",
      icons: "Lucide React 1.33.0"
    }
  },

  directoryStructure: [
    {
      path: "AcademicStack/",
      description: "Root repository directory containing backend, frontend, and asset documentation",
      children: [
        {
          path: "as-backend/",
          description: "FastAPI REST API server, RAG orchestration, Qdrant vector retrieval, and ReportLab PDF compilation",
          children: [
            { path: "app/main.py", description: "FastAPI entry point, CORS configuration, exception handling, and /api/health endpoint with thread-safe counters" },
            { path: "app/core/config.py", description: "Application configuration settings (DB URL, Qdrant host/port, JWT secrets, expiry)" },
            { path: "app/core/security.py", description: "JWT bearer security dependencies, token generation, decoding, and bcrypt password hashing" },
            { path: "app/db/database.py", description: "SQLAlchemy engine instantiation, sessionmaker, and get_db dependency" },
            { path: "app/db/models.py", description: "Database schemas: User, Resource, QuestionBank, Question, AnswerSet, Answer, SharedPredictedPaper" },
            { path: "app/db/init_db.py", description: "Schema bootstrapping and Base.metadata.create_all execution" },
            { path: "app/users/", description: "User registration, authentication, profile management, and BYOK encrypted OpenAI key lifecycle" },
            { path: "app/resources/", description: "Course material syllabus PDF upload, Cloudinary sync, and subject categorization" },
            { path: "app/indexing/", description: "Document chunking (PyMuPDFLoader, RecursiveCharacterTextSplitter) and Qdrant vector embedding service" },
            { path: "app/question_banks/", description: "Question paper extraction from PDF, group-header mark parsing, and manual question curation" },
            { path: "app/questions/", description: "Granular question CRUD, mark adjustments, and repeat-frequency tracking" },
            { path: "app/rag/", description: "Two-stage Draft & Review synthesis engine, mark scaling directives, citation extraction, and vector filtering" },
            { path: "app/predictor/", description: "Exam Blueprint Audit service, frequency multiplier analyzer, and predicted exam paper synthesizer" },
            { path: "app/pdf/", description: "ReportLab PDF layout engine, 2-column cheatsheet builder, MathTextParser Computer Modern LaTeX rasterizer" },
            { path: "app/community/", description: "Public repository for community shared question banks, answer sets, and predicted papers" },
            { path: "app/storage/cloudinary.py", description: "Cloudinary upload, streaming download, and public ID management" },
            { path: "app/utils/encryption.py", description: "Fernet AES-128-CBC symmetric encryption and decryption for user API keys" },
            { path: "app/vector_store/qdrant.py", description: "Qdrant connection health verification, collection bootstrapping, and payload filtering helpers" }
          ]
        },
        {
          path: "as-frontend/",
          description: "React 19 single-page workspace with dark glassmorphism aesthetic and responsive student tools",
          children: [
            { path: "src/App.jsx", description: "Root UI router handling authentication gates, workspace tabs, and public predicted paper share tokens" },
            { path: "src/components/WorkspaceLayout.jsx", description: "Top navigation, tab switching (Resources, Question Banks, Review, Solutions, Predictor, Community, Profile)" },
            { path: "src/components/ResourceManager.jsx", description: "PDF syllabus drag-and-drop uploader, indexing progress indicators, and subject filters" },
            { path: "src/components/QuestionBankManager.jsx", description: "Past exam paper upload, extraction trigger, and question bank list view" },
            { path: "src/components/QuestionReview.jsx", description: "Interactive pre-solve audit screen to review extracted questions, adjust marks, and trigger AI solver" },
            { path: "src/components/SolutionViewer.jsx", description: "Collapsible answer cards with KaTeX math rendering, auto-repaired Mermaid diagrams, retry modal, and PDF export" },
            { path: "src/components/PredictedPaperGenerator.jsx", description: "Multi-paper exam blueprint analyzer, recurring question detector, and practice paper builder" },
            { path: "src/components/CommunityHub.jsx", description: "Public repository to explore and clone peer-shared study materials, solutions, and predicted papers" },
            { path: "src/components/ProfileSettings.jsx", description: "User credentials and encrypted OpenAI API key BYOK configuration" },
            { path: "src/store/useAuthStore.js", description: "Zustand store for JWT tokens, user profile state, and login/logout handlers" },
            { path: "src/store/useQuestionBankStore.js", description: "Active question bank, answer set tracking, selected subject, and tab state" },
            { path: "src/store/usePracticeStore.js", description: "Predicted paper drafts, blueprint audit results, and practice session tracking" },
            { path: "src/store/useThemeStore.js", description: "Theme state provider and dark mode class injection" }
          ]
        }
      ]
    }
  ],

  executionFlows: [
    {
      name: "1. Syllabus Document Ingestion & Semantic Vector Indexing",
      steps: [
        "Student uploads university syllabus or textbook PDF via ResourceManager.jsx in the frontend.",
        "POST /api/resources transmits multipart file stream to backend; file is uploaded to Cloudinary CDN returning a secure public_id and HTTPS URL.",
        "Resource record is committed to PostgreSQL with status='uploaded'.",
        "POST /api/indexing/resource/{id} initiates asynchronous indexing workflow:",
        "PyMuPDFLoader reads file bytes into memory and parses text across pages, preserving page numbers in metadata.",
        "RecursiveCharacterTextSplitter divides document into 1000-character chunks with 200-character overlap to preserve semantic continuity across headings.",
        "enrich_documents appends resource_id, subject, chapter, and chunk_index to metadata payload.",
        "Rate-limited batching loop (20 chunks per batch, 60 req/min) invokes OpenAI text-embedding-3-small generating 1536-dimensional dense vectors.",
        "Vectors are committed into Qdrant collection with payload filters indexing metadata.resource_id.",
        "Resource record status is updated to 'indexed' in PostgreSQL."
      ]
    },
    {
      name: "2. Exam Question Bank Extraction & Group-Header Mark Audit",
      steps: [
        "Student uploads historical university question paper PDF via QuestionBankManager.jsx.",
        "Backend receives PDF, uploads original document to Cloudinary CDN, and invokes extract_text_from_pdf_bytes.",
        "PyMuPDF extracts text blocks; if text is corrupted or scanned, transcribe_image_with_vision triggers GPT-4o Vision OCR fallback.",
        "question_parser.py executes call_extraction with specialized extraction prompt:",
        "Identifies group headers (e.g., 'Q.1 for 2 Marks' or 'Section B - 5 Marks Each') and distributes marks across sub-questions.",
        "If marks are explicitly printed, marks_source is marked 'explicit'; if missing, marks_source is marked 'ai_estimated' (2, 5, or 10 marks).",
        "Parsed questions are returned as structured JSON array, and student reviews/edits them in QuestionReview.jsx before saving to PostgreSQL."
      ]
    },
    {
      name: "3. Two-Stage Grounded RAG Solution Synthesis & Scaling",
      steps: [
        "User clicks 'Generate Solved Answers' in QuestionReview.jsx, triggering POST /api/answer-sets/generate.",
        "Backend creates AnswerSet record (status='generating') and creates placeholder Answer rows in PostgreSQL.",
        "For each Question in the bank, generate_rag_answer executes:",
        "Step A - Vector Retrieval: retrieve_relevant_documents queries Qdrant with the question text, strictly filtered by metadata.resource_id matching the linked syllabus resources, retrieving top 5 most relevant chunks (k=5).",
        "Step B - Directive Formulation: build_answer_directives inspects question marks and phrasing, injecting rigid constraints: 2M (strictly 5-7 lines max), 5-7M (15-20 lines, 4-6 bullet points), 10M+ (crisp 220-320 words, mandatory Mermaid diagram or comparison table), numericals (mandatory worked calculations), comparisons (mandatory Markdown table).",
        "Step C - Stage 1 (Draft Generator): call_generation prompts OpenAI gpt-4o-mini (falling back to gpt-4o) using DRAFT_SYSTEM_INSTRUCTION to write a student-friendly explanation grounded strictly in the retrieved context.",
        "Step D - Stage 2 (Academic Reviewer): call_review feeds draft and context to REVIEWER_SYSTEM_INSTRUCTION, trimming bloat, enforcing mark bounds, formatting LaTeX math ($$ and $), and fixing Mermaid syntax.",
        "Step E - Auto-Repair & Persistence: repair_mermaid_syntax corrects unclosed delimiters, and final answer is saved to PostgreSQL with source citations."
      ]
    },
    {
      name: "4. Algorithmic Exam Blueprint Audit & Paper Predictor",
      steps: [
        "Student uploads 2 to 10 historical semester exam question papers in PredictedPaperGenerator.jsx.",
        "POST /api/predictor/generate parses each paper via PyMuPDF or Vision OCR, labeling exam session years.",
        "analyze_and_predict_paper prompts OpenAI with SYSTEM_PROMPT enforcing zero hardcoded templates:",
        "Phase 1 Blueprint Audit: Detects maximum marks (e.g. 80), time allowed (3 Hours), main question hierarchy (Q.1 to Q.6), and sub-question layouts.",
        "Enforces Choice Question Mandatory Pool Rule: If Q.1 states 'Answer any four (05 marks each)', the engine guarantees all 6 options (a to f) are generated so choice is preserved.",
        "Phase 2 Paper Synthesis: Formulates high-probability exam questions clustered by recurring syllabus topics, returning structured JSON.",
        "Student can view the interactive paper, export publication PDF, or save the predicted paper as a new Question Bank to solve with RAG."
      ]
    },
    {
      name: "5. Dual-Tier Publication-Grade PDF Publishing Engine",
      steps: [
        "Solved Question Bank PDF: GET /api/answer-sets/{id}/pdf invokes generate_solved_question_bank_pdf.",
        "ReportLab SimpleDocTemplate initialises with custom NumberedCanvas to perform two-pass total page calculation ('Page X of Y').",
        "MathTextParser('agg') from Matplotlib parses all inline ($...$) and block ($$...$$) LaTeX expressions using Computer Modern ('cm') fontset, rendering raster images aligned to typography baseline using depth_pt.",
        "Mermaid diagrams are fetched as vector SVGs or high-res images via Kroki.io API failover and embedded in the document story.",
        "Rapid Recall Cheatsheet: GET /api/answer-sets/{id}/cheatsheet-pdf invokes generate_exam_cheatsheet_pdf.",
        "ReportLab BaseDocTemplate configures 2-column Frame layout (COL_W = 269pt, COL_GAP = 14pt) with 7.5pt compact typography.",
        "Filters out conversational filler words and step headers, rendering high-yield revision flash cards with tight margin packing."
      ]
    }
  ]
};

