export const phase7Improvements = {
  title: "Phase 7: Project Improvements & Codebase Audit",
  description: "Real identified bugs, security risks, limitations, and bottlenecks in CodeLens discovered through deep codebase inspection.",

  auditCategories: [
    {
      category: "1. Real Identified Bugs & Code Smells",
      items: [
        {
          title: "Unhandled Non-UTF8 & Binary File Parsing in Tree-Sitter",
          severity: "Medium",
          description: "When indexing repositories containing compiled assets, binary blobs, or files encoded in ISO-8859-1/Windows-1252, `parse_source_code` attempts `.encode('utf-8')` or standard decoding without error handling, occasionally triggering `UnicodeDecodeError` and failing the file indexing process.",
          fix: "Wrap file reading in `errors='replace'` or inspect file magic bytes before dispatching to Tree-Sitter, automatically skipping binary and non-text files."
        },
        {
          title: "Temporary Git Clone Directory Disk Leak",
          severity: "Medium",
          description: "In `git_service.py`, repositories are cloned into local temporary directories during indexing. If a background indexing job crashes midway due to an out-of-memory error or network timeout, the temporary repository folder is not cleaned up in the `finally` block, leading to cumulative disk consumption on the server.",
          fix: "Use Python's `tempfile.TemporaryDirectory` within an asynchronous context manager to guarantee disk cleanup even upon unhandled exceptions."
        }
      ]
    },
    {
      category: "2. Security Vulnerabilities & Edge Cases",
      severity: "High",
      items: [
        {
          title: "Plaintext Token Exposure in Local Development Environment",
          severity: "High",
          description: "In development mode, `print(f'Starting {PROJECT_NAME}...')` and logging statements occasionally output request payloads. If debugging mode is left enabled in production, partial API tokens or GitHub access tokens could be exposed in standard output container logs.",
          fix: "Introduce structured logging via `structlog` or `loguru` with an explicit secret scrubbing filter that sanitizes any strings matching `ghp_` or `sk-`."
        },
        {
          title: "GitHub OAuth Token Revocation Sync",
          severity: "Medium",
          description: "When a user revokes CodeLens access from their GitHub account settings, the backend PostgreSQL record retains the stale `github_access_token` until the next login attempt fails with a 401 Unauthorized from the GitHub API.",
          fix: "Implement a GitHub webhook endpoint (`/api/v1/auth/github/webhook`) that listens for `application_revocation` events and automatically nullifies user credentials in the database."
        }
      ]
    },
    {
      category: "3. Architectural Bottlenecks & Scale Limitations",
      items: [
        {
          title: "Synchronous AST Traversal in Multi-File Parsing",
          severity: "High",
          description: "While FastAPI is asynchronous, Tree-Sitter AST parsing runs synchronously on Python's main CPU thread. In repositories with 5,000+ files, running `build_knowledge_graph` synchronously occupies the GIL, temporarily increasing response latency for concurrent REST API calls.",
          fix: "Offload AST parsing and graph construction to a dedicated worker pool using `concurrent.futures.ProcessPoolExecutor` or an external task queue (Celery/Temporal)."
        },
        {
          title: "In-Memory Pre-Computed Graph Payload Size",
          severity: "Medium",
          description: "For repositories exceeding 500k LoC, the pre-computed architecture graph JSON stored in PostgreSQL's `architecture_graphs.graph_data` column can reach 15MB+. Sending this entire JSON over REST causes high network transfer time and high frontend JSON parsing overhead.",
          fix: "Implement graph pagination and dynamic viewport LOD (Level of Detail) loading, streaming node clusters based on canvas zoom level."
        }
      ]
    },
    {
      category: "4. Production Hardening Roadmap",
      items: [
        {
          title: "Incremental AST Indexing via Git Commit Diffing",
          severity: "Enhancement",
          description: "Currently, re-indexing a repository parses the entire codebase from scratch. This wastes compute and OpenAI embedding tokens when only 2-3 files changed in a new commit.",
          fix: "Use `git diff --name-only <old_commit> <new_commit>` to re-parse and re-vectorize only modified and dependent files, updating existing Qdrant points in place."
        },
        {
          title: "Distributed Caching for Hot Vector Embeddings via Redis",
          severity: "Enhancement",
          description: "Frequent copilot questions regarding the same core files (e.g., `main.py`, `auth.py`) trigger repeated vector similarity searches in Qdrant.",
          fix: "Introduce an in-memory Redis semantic cache that stores top retrieved context chunks for popular query embeddings with a 1-hour TTL."
        }
      ]
    }
  ]
};

