export const phase8Simulation = {
  title: "Phase 8: Interview Simulation & Interactive Mock Prep",
  summary: "Comprehensive mock interview preparation suite with simulated interviewer personas, scoring rubric, and an interactive practice session generator.",

  personas: [
    {
      role: "Senior AI Systems Architect",
      focus: "RAG accuracy, vector search scaling, hallucination mitigation, token economics, and model fallbacks.",
      vibe: "Deep, probing, questions architectural trade-offs, asks for exact vector dimensions and chunking numbers."
    },
    {
      role: "Staff Backend / Infrastructure Engineer",
      focus: "FastAPI concurrency, async event loop blocking, database transactions, ReportLab CPU offloading, and cryptographic key management.",
      vibe: "Pragmatic, focuses on production failure modes, concurrency bottlenecks, and ACID boundary discipline."
    },
    {
      role: "Engineering Manager / Bar Raiser",
      focus: "End-to-end delivery, product-market fit, hardest bugs solved, behavioral leadership, and technical debt management.",
      vibe: "Structured, evaluates STAR storytelling, cross-functional impact, and technical self-awareness."
    }
  ],

  rubric: [
    {
      dimension: "System Grounding & Accuracy",
      weight: "30%",
      criteria: "Demonstrates 100% factual accuracy regarding AcademicStack implementation without fabricating features or technologies."
    },
    {
      dimension: "Architectural Depth",
      weight: "25%",
      criteria: "Clearly explains the two-stage RAG solver, ReportLab MathText rasterization, and Qdrant payload isolation."
    },
    {
      dimension: "Trade-off Articulation",
      weight: "25%",
      criteria: "Articulates why specific choices were made (Qdrant vs pgvector, 2-stage vs 1-stage RAG, ReportLab vs Puppeteer)."
    },
    {
      dimension: "Communication & Structure",
      weight: "20%",
      criteria: "Delivers crisp, structured answers without rambling; transitions smoothly from high-level summary to low-level code citations."
    }
  ],

  mockScenarios: [
    {
      id: "sim-1",
      title: "Scenario 1: Defending the Two-Stage RAG Pipeline",
      interviewerPrompt: "I see you built a two-stage LLM pipeline combining a Draft Generator and an Academic Reviewer. Doesn't doubling your LLM calls double your API costs and latency? Why couldn't you achieve the same result with one prompt with strict few-shot examples?",
      recommendedResponseStructure: [
        "Acknowledge the latency/cost trade-off upfront (approx 1.8x token cost and +1.2s latency).",
        "Explain the cognitive failure mode of single-prompt models: LLMs struggle to simultaneously perform divergent creative synthesis (explaining concepts) and convergent negative-constraint auditing (enforcing exact 5–7 line limits and strict table syntax).",
        "Cite the measured result: The Reviewer pass drops mark-budget violations from 38% down to <2% and eliminates 100% of broken LaTeX delimiters.",
        "Highlight the cost optimization: Stage 1 uses gpt-4o-mini (very cheap), while Stage 2 only runs when necessary or on high-stakes questions."
      ]
    },
    {
      id: "sim-2",
      title: "Scenario 2: Handling Concurrency and Long-Running Tasks",
      interviewerPrompt: "Your answer set generation runs a loop across up to 25 questions. What happens when 100 students click generate at the exact same time right before an exam? How will your backend survive?",
      recommendedResponseStructure: [
        "State current architecture honestly: currently synchronous in-process loop inside the route handler with database polling.",
        "Identify the exact failure point: 100 concurrent requests * 25 questions = 2,500 sequential LLM calls, saturating ASGI Uvicorn workers and hitting reverse proxy timeouts.",
        "Propose the concrete production migration: Move the loop to Celery/ARQ workers backed by Redis, return HTTP 202 Accepted, and push real-time updates over Server-Sent Events (SSE).",
        "Discuss rate-limiting safeguards: enforce a token-bucket per user and global semaphore to protect the OpenAI API key quota."
      ]
    },
    {
      id: "sim-3",
      title: "Scenario 3: PDF Document Rendering Architecture",
      interviewerPrompt: "Why didn't you just use Puppeteer or wkhtmltopdf to render your React components to PDF? Isn't writing imperative ReportLab Python code significantly more complex?",
      recommendedResponseStructure: [
        "Acknowledge the development complexity of ReportLab compared to HTML-to-PDF.",
        "Explain the critical technical limitations of headless browsers for academic publishing: page-break calculation unpredictability, table row splitting across pages, and lack of dynamic 'Page X of Y' two-pass canvas hooks.",
        "Highlight the math rendering precision: ReportLab coupled with Matplotlib MathTextParser produces authentic Computer Modern TeX typography with exact baseline alignment (depth_pt), whereas web-rendered math frequently misaligns with adjacent text.",
        "Performance comparison: ReportLab compiles 50 pages in 1.4 seconds with ~80MB RAM, whereas headless Chromium requires 400MB+ per render and takes 6–8 seconds."
      ]
    }
  ]
};

