import { phase1Investigation } from './phase1_investigation';
import { phase2Understanding } from './phase2_understanding';
import { phase3Presentation } from './phase3_presentation';
import { phase4And5Questions } from './phase4_5_questions';
import { phase6Engineering } from './phase6_engineering';
import { phase7Improvements } from './phase7_improvements';
import { phase8Simulation } from './phase8_simulation';
import { phase9Cheatsheet } from './phase9_cheatsheet';

export const academicStackProjectData = {
  id: "project-1",
  name: "AcademicStack",
  subtitle: "AI-Powered University Exam Preparation, Pattern Prediction & Publication-Grade Study Engine",
  codebasePath: "D:\\Shoaib\\AcademicStack",
  stats: {
    totalPhases: 9,
    totalQuestions: phase4And5Questions.totalQuestions,
    categoriesCount: phase4And5Questions.categories.length,
    backendFramework: "FastAPI + Qdrant + PostgreSQL",
    frontendFramework: "React 19 + Tailwind v4 + Zustand",
    publishingEngine: "ReportLab + Matplotlib MathText",
  },
  phases: {
    phase1: phase1Investigation,
    phase2: phase2Understanding,
    phase3: phase3Presentation,
    phase4And5: phase4And5Questions,
    phase6: phase6Engineering,
    phase7: phase7Improvements,
    phase8: phase8Simulation,
    phase9: phase9Cheatsheet,
  }
};

export {
  phase1Investigation,
  phase2Understanding,
  phase3Presentation,
  phase4And5Questions,
  phase6Engineering,
  phase7Improvements,
  phase8Simulation,
  phase9Cheatsheet,
};

