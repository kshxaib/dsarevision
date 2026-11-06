import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Check,
  Sparkles,
  BookOpen,
  Shield,
  Code,
  Database,
  AlertTriangle,
  Terminal,
  Zap,
  HelpCircle,
  Star,
  Cpu
} from 'lucide-react';

import {
  academicStackProjectData,
  phase1Investigation,
  phase2Understanding,
  phase3Presentation,
  phase4And5Questions,
  phase6Engineering,
  phase7Improvements,
} from '../../data/projects/academicStack';

export default function AcademicStackProject() {
  const ALL_PHASES = ['phase-1', 'phase-2', 'phase-3', 'phase-4-5', 'phase-6', 'phase-7'];
  const [expandedPhases, setExpandedPhases] = useState(() => new Set(ALL_PHASES));

  const togglePhase = (phaseId) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  };

  // Collect all question IDs for expand/collapse all
  const allQuestionIds = React.useMemo(() => {
    const ids = [];
    phase4And5Questions.categories.forEach((cat) => {
      cat.questions.forEach((q) => ids.push(q.id));
    });
    return ids;
  }, []);

  // Default: first question in each category or all expanded
  const [expandedQuestionIds, setExpandedQuestionIds] = useState(() => new Set(allQuestionIds.slice(0, 3)));

  // Toggle single question accordion
  const toggleQuestion = (id) => {
    setExpandedQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-5 sm:space-y-6 pb-24 animate-fadeIn">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground tracking-tight">
            AcademicStack Technical Interview Preparation
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-4xl leading-relaxed">
            The AI-powered university exam intelligence, blueprint prediction, and publication-grade study engine.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHASE 1: Complete Project Investigation */}
      {/* ========================================================================= */}
      <section id="phase-1">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div
            onClick={() => togglePhase('phase-1')}
            className="flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-amber-accent block">PHASE 01</span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground group-hover:text-amber-accent transition-colors">
                Complete Project Investigation
              </h2>
            </div>
            <div className="shrink-0 pt-1 sm:pt-0">
              <div className="p-1.5 rounded-lg bg-accent/60 group-hover:bg-accent text-muted-foreground group-hover:text-foreground transition-all">
                <ChevronDown
                  className={`size-5 transition-transform duration-200 ${
                    expandedPhases.has('phase-1') ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {expandedPhases.has('phase-1') && (
            <div className="mt-4 pt-4 border-t border-border space-y-6 animate-fadeIn">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Full investigation of the AcademicStack repository topology, backend orchestration, frontend workspace, and end-to-end execution flows.
              </p>

              {/* Architecture Stack Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-background/60 border border-border space-y-3">
                  <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                    <Cpu className="size-4 text-amber-accent" /> Backend & AI Architecture
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2 font-mono">
                    <li><strong className="text-foreground">Framework:</strong> {phase1Investigation.systemManifest.backend.framework}</li>
                    <li><strong className="text-foreground">Vector Store:</strong> {phase1Investigation.systemManifest.backend.vectorStore}</li>
                    <li><strong className="text-foreground">Relational DB:</strong> {phase1Investigation.systemManifest.backend.database}</li>
                    <li><strong className="text-foreground">LLM Chain:</strong> {phase1Investigation.systemManifest.backend.llmOrchestration}</li>
                    <li><strong className="text-foreground">Models:</strong> {phase1Investigation.systemManifest.backend.llmModels}</li>
                    <li><strong className="text-foreground">Embeddings:</strong> {phase1Investigation.systemManifest.backend.embeddings}</li>
                    <li><strong className="text-foreground">PDF Engine:</strong> {phase1Investigation.systemManifest.backend.pdfPublishing}</li>
                    <li><strong className="text-foreground">Security:</strong> {phase1Investigation.systemManifest.backend.security}</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-background/60 border border-border space-y-3">
                  <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                    <Code className="size-4 text-amber-accent" /> Frontend & Visual Tooling
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2 font-mono">
                    <li><strong className="text-foreground">Framework:</strong> {phase1Investigation.systemManifest.frontend.framework}</li>
                    <li><strong className="text-foreground">Bundler:</strong> {phase1Investigation.systemManifest.frontend.bundler}</li>
                    <li><strong className="text-foreground">Styling:</strong> {phase1Investigation.systemManifest.frontend.styling}</li>
                    <li><strong className="text-foreground">State Store:</strong> {phase1Investigation.systemManifest.frontend.stateManagement}</li>
                    <li><strong className="text-foreground">Math Typography:</strong> {phase1Investigation.systemManifest.frontend.typographyMath}</li>
                    <li><strong className="text-foreground">Diagramming:</strong> {phase1Investigation.systemManifest.frontend.diagramming}</li>
                    <li><strong className="text-foreground">Icons:</strong> {phase1Investigation.systemManifest.frontend.icons}</li>
                  </ul>
                </div>
              </div>

              {/* Execution Flows */}
              <div className="space-y-4 pt-4 border-t border-border/60">
                <h3 className="text-lg font-heading font-bold text-foreground">End-to-End System Execution Flows</h3>
                <div className="grid grid-cols-1 gap-4">
                  {phase1Investigation.executionFlows.map((flow, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-card border border-border space-y-3">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <span className="size-6 rounded-full bg-amber-accent/20 text-amber-accent text-xs font-mono font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        {flow.name}
                      </h4>
                      <div className="space-y-2 pl-8 border-l border-border/80 ml-3">
                        {flow.steps.map((step, sIdx) => (
                          <p key={sIdx} className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            <span className="text-foreground font-medium">•</span> {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHASE 2: Project Understanding */}
      {/* ========================================================================= */}
      <section id="phase-2">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div
            onClick={() => togglePhase('phase-2')}
            className="flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-amber-accent block">PHASE 02</span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground group-hover:text-amber-accent transition-colors">
                Project Understanding & Architectural Foundations
              </h2>
            </div>
            <div className="shrink-0 pt-1 sm:pt-0">
              <div className="p-1.5 rounded-lg bg-accent/60 group-hover:bg-accent text-muted-foreground group-hover:text-foreground transition-all">
                <ChevronDown
                  className={`size-5 transition-transform duration-200 ${
                    expandedPhases.has('phase-2') ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {expandedPhases.has('phase-2') && (
            <div className="mt-4 pt-4 border-t border-border space-y-6 animate-fadeIn">
              {/* Solved Engineering Challenges */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">Solved Engineering Challenges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase2Understanding.problemStatement.criticalPainPoints.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-background/60 border border-border space-y-2">
                      <h4 className="text-sm font-semibold text-amber-accent flex items-center gap-2">
                        <AlertTriangle className="size-4 text-amber-accent shrink-0" />
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground"><strong className="text-destructive">Problem:</strong> {item.problem}</p>
                      <p className="text-xs text-muted-foreground"><strong className="text-easy">AcademicStack Solution:</strong> {item.solution}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database Schemas */}
              <div className="space-y-4 pt-4 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-heading font-bold text-foreground flex items-center gap-2">
                    <Database className="size-5 text-amber-accent" />
                    Database Entities & Relational Schemas (PostgreSQL)
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground">SQLAlchemy 2.0+ Declarative</span>
                </div>

                <div className="space-y-4">
                  {phase2Understanding.databaseSchema.map((tbl) => (
                    <div key={tbl.tableName} className="rounded-xl border border-border overflow-hidden bg-background/50">
                      <div className="px-4 py-3 bg-accent/40 flex items-center justify-between border-b border-border">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-accent">TABLE</span>
                          <span className="text-sm font-semibold text-foreground font-mono">{tbl.tableName}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{tbl.description}</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-background/80 text-muted-foreground font-mono border-b border-border">
                            <tr>
                              <th className="px-4 py-2">Column</th>
                              <th className="px-4 py-2">Type</th>
                              <th className="px-4 py-2">Constraints</th>
                              <th className="px-4 py-2">Role</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/50 text-muted-foreground font-mono">
                            {tbl.columns.map((col) => (
                              <tr key={col.name} className="hover:bg-accent/20">
                                <td className="px-4 py-2 font-medium text-foreground">{col.name}</td>
                                <td className="px-4 py-2 text-amber-accent">{col.type}</td>
                                <td className="px-4 py-2 text-[11px] text-muted-foreground">{col.constraints}</td>
                                <td className="px-4 py-2 font-sans text-xs text-muted-foreground">{col.detail}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Endpoints */}
              <div className="space-y-4 pt-4 border-t border-border/60">
                <h3 className="text-lg font-heading font-bold text-foreground flex items-center gap-2">
                  <Terminal className="size-5 text-amber-accent" />
                  REST API Endpoint Inventory (FastAPI)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {phase2Understanding.apiEndpoints.map((ep, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-background/60 border border-border flex items-start gap-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                          ep.method === 'GET'
                            ? 'bg-blue-500/15 text-blue-400'
                            : ep.method === 'POST'
                            ? 'bg-easy/15 text-easy'
                            : ep.method === 'DELETE'
                            ? 'bg-destructive/15 text-destructive'
                            : 'bg-amber-accent/15 text-amber-accent'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="text-foreground font-medium block truncate">{ep.path}</span>
                        <span className="text-[11px] font-sans text-muted-foreground">{ep.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHASE 3: Interview Presentation */}
      {/* ========================================================================= */}
      <section id="phase-3">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div
            onClick={() => togglePhase('phase-3')}
            className="flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-amber-accent block">PHASE 03</span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground group-hover:text-amber-accent transition-colors">
                Interview Presentation Framework (STAR)
              </h2>
            </div>
            <div className="shrink-0 pt-1 sm:pt-0">
              <div className="p-1.5 rounded-lg bg-accent/60 group-hover:bg-accent text-muted-foreground group-hover:text-foreground transition-all">
                <ChevronDown
                  className={`size-5 transition-transform duration-200 ${
                    expandedPhases.has('phase-3') ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {expandedPhases.has('phase-3') && (
            <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fadeIn">
              {(() => {
                const pitch = phase3Presentation.pitches.find((p) => p.framework?.includes('STAR')) || phase3Presentation.pitches[2];
                return (
                  <div className="p-5 rounded-xl bg-background/80 border border-border space-y-3">
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-card border border-border">
                        <strong className="text-xs font-mono text-amber-accent block">SITUATION</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">{pitch.content.situation}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-card border border-border">
                        <strong className="text-xs font-mono text-amber-accent block">TASK</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">{pitch.content.task}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-card border border-border">
                        <strong className="text-xs font-mono text-amber-accent block">ACTION</strong>
                        <p className="text-xs text-muted-foreground mt-0.5 whitespace-pre-line">{pitch.content.action}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-card border border-border">
                        <strong className="text-xs font-mono text-easy block">RESULT</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">{pitch.content.result}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHASE 4 & 5: Complete Question Bank & Comprehensive Answers */}
      {/* ========================================================================= */}
      <section id="phase-4-5">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div
            onClick={() => togglePhase('phase-4-5')}
            className="flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-amber-accent block">PHASE 04</span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground group-hover:text-amber-accent transition-colors">
                Complete Interview Question Bank
              </h2>
            </div>
            <div className="shrink-0 pt-1 sm:pt-0">
              <div className="p-1.5 rounded-lg bg-accent/60 group-hover:bg-accent text-muted-foreground group-hover:text-foreground transition-all">
                <ChevronDown
                  className={`size-5 transition-transform duration-200 ${
                    expandedPhases.has('phase-4-5') ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {expandedPhases.has('phase-4-5') && (
            <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fadeIn">
              {/* Direct List of all Questions */}
              <div className="space-y-4 pt-1">
            {phase4And5Questions.categories.flatMap((c) => c.questions).map((q, idx) => {
              const isExpanded = expandedQuestionIds.has(q.id);

              return (
                <article
                  key={q.id}
                  id={q.id}
                  className="rounded-xl border border-border bg-card overflow-hidden shadow-xs transition-colors"
                >
                  {/* Question Header */}
                  <div
                    onClick={() => toggleQuestion(q.id)}
                    className={`w-full px-4 sm:px-6 py-4 flex items-start justify-between gap-3 sm:gap-4 transition-colors select-none cursor-pointer ${
                      isExpanded ? 'bg-accent/40' : 'hover:bg-accent/20'
                    }`}
                  >
                    <div className="flex-1 flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
                      <span className="font-mono text-sm font-semibold text-amber-accent shrink-0 select-none">
                        Q{idx + 1}.
                      </span>
                      <h4 className="text-sm sm:text-base font-medium text-foreground leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    <div className="shrink-0 text-muted-foreground pt-0.5">
                      <ChevronDown
                        className={`size-4 sm:size-5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Answer Block */}
                  {isExpanded && (
                    <div className="px-5 sm:px-8 py-5 border-t border-border bg-card/70 animate-fadeIn space-y-4">
                      {/* Interview Answer */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-mono font-bold text-amber-accent flex items-center gap-1.5">
                          <Zap className="size-3.5" /> INTERVIEW ANSWER
                        </span>
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line font-sans">
                          {q.technicalExplanation}
                        </p>
                      </div>

                      {/* 4. Actual Academic Stack Implementation */}
                      <div className="p-4 rounded-xl bg-accent/25 border border-border space-y-2">
                        <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                          <Code className="size-3.5 text-amber-accent" /> ACTUAL ACADEMICSTACK IMPLEMENTATION
                        </span>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {q.actualImplementation}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent/50 text-amber-accent border border-border">
                            File: {q.sourceFile}
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent/50 text-muted-foreground border border-border">
                            Symbol: {q.sourceFunction}
                          </span>
                        </div>
                      </div>

                      {/* 5. Real-World Example */}
                      <div className="p-3.5 rounded-xl bg-accent/25 border border-border space-y-1">
                        <span className="text-xs font-mono font-bold text-amber-accent flex items-center gap-1.5">
                          <Sparkles className="size-3.5" /> CONCRETE REAL-WORLD EXAMPLE
                        </span>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {q.realWorldExample}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHASE 6: Real-World Engineering Knowledge */}
      {/* ========================================================================= */}
      <section id="phase-6">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div
            onClick={() => togglePhase('phase-6')}
            className="flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-amber-accent block">PHASE 06</span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground group-hover:text-amber-accent transition-colors">
                Real-World Engineering Knowledge
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Production scalability, security boundaries, asynchronous I/O, and transactional ACID guarantees.
              </p>
            </div>
            <div className="shrink-0 pt-1 sm:pt-0">
              <div className="p-1.5 rounded-lg bg-accent/60 group-hover:bg-accent text-muted-foreground group-hover:text-foreground transition-all">
                <ChevronDown
                  className={`size-5 transition-transform duration-200 ${
                    expandedPhases.has('phase-6') ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {expandedPhases.has('phase-6') && (
            <div className="mt-4 pt-4 border-t border-border animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {phase6Engineering.domains.map((dom) => (
                  <div key={dom.id} className="p-6 rounded-2xl bg-background/70 border border-border space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                        <dom.icon className="size-5 text-amber-accent" />
                        {dom.name}
                      </h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/40 text-muted-foreground">
                        {dom.badge}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {dom.topics.map((t, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-card border border-border space-y-2">
                          <h4 className="text-sm font-semibold text-amber-accent">{t.title}</h4>
                          <span className="text-xs font-mono text-muted-foreground block">{t.concept}</span>
                          <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                            <strong className="text-foreground">AcademicStack Reality:</strong> {t.academicStackAnalysis}
                          </p>
                          <div className="p-3 rounded-lg bg-background/80 border border-border/80 text-xs text-muted-foreground whitespace-pre-line font-mono">
                            {t.productionDesign}
                          </div>
                          <span className="text-[11px] font-mono text-easy block pt-1">
                            ✓ {t.keyMetrics}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHASE 7: Project Improvements */}
      {/* ========================================================================= */}
      <section id="phase-7">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div
            onClick={() => togglePhase('phase-7')}
            className="flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-amber-accent block">PHASE 07</span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground group-hover:text-amber-accent transition-colors">
                Project Improvements & Codebase Audit
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Real identified bugs, security risks, limitations, and bottlenecks in AcademicStack without modifying source code.
              </p>
            </div>
            <div className="shrink-0 pt-1 sm:pt-0">
              <div className="p-1.5 rounded-lg bg-accent/60 group-hover:bg-accent text-muted-foreground group-hover:text-foreground transition-all">
                <ChevronDown
                  className={`size-5 transition-transform duration-200 ${
                    expandedPhases.has('phase-7') ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {expandedPhases.has('phase-7') && (
            <div className="mt-4 pt-4 border-t border-border space-y-6 animate-fadeIn">
              {phase7Improvements.auditCategories.map((cat, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-base font-semibold text-foreground border-b border-border/80 pb-2">
                    {cat.category}
                  </h3>
                  <div className="space-y-4">
                    {cat.items.map((item) => (
                      <div key={item.id} className="p-4 rounded-xl bg-background/60 border border-border space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                item.severity === 'High'
                                  ? 'bg-destructive/15 text-destructive border border-destructive/30'
                                  : 'bg-medium/15 text-medium border border-medium/30'
                              }`}
                            >
                              {item.severity}
                            </span>
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-mono text-muted-foreground">{item.location}</span>
                        </div>
                        <p className="text-xs text-muted-foreground"><strong className="text-foreground">Current Behavior:</strong> {item.currentBehavior}</p>
                        <p className="text-xs text-muted-foreground"><strong className="text-destructive">Production Impact:</strong> {item.impact}</p>
                        <div className="p-3 rounded-lg bg-card border border-border">
                          <span className="text-[11px] font-mono font-bold text-easy block mb-1">PROPOSED REFACTORING:</span>
                          <pre className="text-xs font-mono text-muted-foreground whitespace-pre-line overflow-x-auto">
                            {item.proposedFix}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
