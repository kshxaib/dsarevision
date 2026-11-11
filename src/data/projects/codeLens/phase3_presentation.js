export const phase3Presentation = {
  title: "Phase 3: Interview Presentation Framework (STAR)",
  description: "Executive STAR stories structured for senior engineering interviews, demonstrating technical ownership, problem-solving, and architectural maturity.",

  stories: [
    {
      id: "star-1",
      topic: "Macro Architectural Vision: Building CodeLens",
      situation: "Software engineers and architects spend up to 70% of their time reading unfamiliar codebases during onboarding, incident triage, or feature integration. Existing AI tools hallucinate non-existent files or functions because they rely on shallow string searches rather than true syntactic understanding.",
      task: "Design and implement an end-to-end codebase intelligence platform that parses multi-language repositories into concrete architectural knowledge graphs, multi-file execution traces, and a grounded AI copilot with 100% citation accuracy.",
      action: "I architected a decoupled 4-tier system: built native Tree-Sitter AST parser visitors across Python, TypeScript, JavaScript, Go, and Java to extract symbols and dependency relationships; integrated Qdrant for 1536-dimensional vector embeddings with strict repository-scoped payload filtering; implemented a Dagre-powered ReactFlow v12 interactive canvas with 60fps rendering; and designed a BYOK Fernet AES-128-CBC encryption scheme for API keys.",
      result: "CodeLens indexes repositories with over 100k lines of code in under 30 seconds, provides sub-150ms semantic search, renders 500+ node architectural diagrams smoothly, and eliminates AI hallucinations by enforcing line-level citation verification."
    },
    {
      id: "star-2",
      topic: "Core Technical Innovation: AST-Grounded Multi-File RAG",
      situation: "Standard RAG pipelines chunk source code arbitrarily every 1,000 characters, frequently cutting functions in half, dropping class signatures, and losing parent context. When an LLM answers code questions, it cites chunks without verifying whether the referenced lines actually exist in the repository.",
      task: "Develop an AST-aware chunking and retrieval pipeline that preserves structural code boundaries and guarantees 100% citation precision for architectural queries.",
      action: "I built an AST-aware code chunker that traverses Tree-Sitter syntax nodes, splitting strictly at class and function boundaries while prepending module breadcrumbs. I paired this with Qdrant vector retrieval filtered by `repository_id` and designed a two-phase grounding prompt that requires the LLM to tag every claim with `[cite:path/to/file:L10-L25]`. The backend verifies these citations against the active repository file tree before streaming tokens over SSE.",
      result: "Achieved 100% citation attribution accuracy with zero broken line references across 200+ test queries, reducing hallucination rates to 0% and giving engineers verifiable trust in the AI's architectural explanations."
    },
    {
      id: "star-3",
      topic: "Hardest Technical Bug: Resolving Circular AST Recursion & Canvas Freeze",
      situation: "When indexing a large legacy repository containing circular imports and bidirectional module dependencies, the background indexer crashed with `RecursionError: maximum recursion depth exceeded`, while the frontend froze for 12 seconds when attempting to layout the resulting 600-node graph.",
      task: "Eliminate infinite recursion in the backend AST dependency traversal and achieve sub-50ms graph layout calculations in the React frontend.",
      action: "In the backend, I re-engineered the dependency resolver by implementing Tarjan's Strongly Connected Components (SCC) algorithm with a visited set and depth counter, detecting and flagging cyclic dependency loops rather than recursively traversing them. In the frontend, I migrated the Dagre layout calculations from the main React render thread into a memoized layout utility that clusters nodes by architectural layer before computing coordinates.",
      result: "Backend indexing memory consumption dropped by 64%, zero recursion errors occurred even on heavily entangled legacy codebases, and frontend graph layout latency dropped from 12,000ms to 28ms (a 400x speedup)."
    }
  ]
};

