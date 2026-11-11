import { phase1Investigation } from './phase1_investigation';
import { phase2Understanding } from './phase2_understanding';
import { phase3Presentation } from './phase3_presentation';
import { phase4And5Questions } from './phase4_5_questions';
import { phase6Engineering } from './phase6_engineering';
import { phase7Improvements } from './phase7_improvements';

export const codeLensProjectData = {
  id: "project-2",
  name: "CodeLens",
  subtitle: "AI-Powered Codebase Intelligence, AST Knowledge Graph & Architecture Copilot",
  codebasePath: "D:\\Shoaib\\CodeLens",
  stats: {
    totalPhases: 7,
    totalQuestions: phase4And5Questions.totalQuestions,
    categoriesCount: phase4And5Questions.categories.length,
    backendFramework: "FastAPI + Tree-Sitter + Qdrant + PostgreSQL",
    frontendFramework: "React 19 + TypeScript + @xyflow/react + Zustand",
    visualizationEngine: "Dagre Hierarchical Canvas + Mermaid.js",
  },
  phases: {
    phase1: phase1Investigation,
    phase2: phase2Understanding,
    phase3: phase3Presentation,
    phase4And5: phase4And5Questions,
    phase6: phase6Engineering,
    phase7: phase7Improvements,
  }
};

export {
  phase1Investigation,
  phase2Understanding,
  phase3Presentation,
  phase4And5Questions,
  phase6Engineering,
  phase7Improvements,
};

