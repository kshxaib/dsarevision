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
  Terminal,
  Zap,
  HelpCircle,
  Star,
  Cpu
} from 'lucide-react';

import {
  codeLensProjectData,
  phase1Investigation,
  phase2Understanding,
  phase3Presentation,
  phase4And5Questions,
  phase6Engineering,
  phase7Improvements,
} from '../../data/projects/codeLens';

export default function CodeLensProject() {
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

  // Collect all question IDs
  const allQuestionIds = React.useMemo(() => {
    const ids = [];
    phase4And5Questions.categories.forEach((cat) => {
      cat.questions.forEach((q) => ids.push(q.id));
    });
    return ids;
  }, []);

  // Default: first 3 questions expanded
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
    <div className="space-y-5 sm:space-y-6 animate-fadeIn max-w-5xl">
      {/* ========================================================================= */}
      {/* TOP BANNER */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-accent/10 text-amber-accent font-semibold border border-amber-accent/20">
              PROJECT 02
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent text-muted-foreground border border-border">
              {codeLensProjectData.stats.totalQuestions} Questions Ordered (Basics → Deep)
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent text-muted-foreground border border-border">
              AST Knowledge Graph & Architecture Copilot
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-heading font-bold text-foreground tracking-tight">
              CodeLens Technical Interview Preparation
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
              {codeLensProjectData.subtitle}
            </p>
          </div>

          <p className="text-xs font-mono text-muted-foreground">
            Codebase Directory: <span className="text-foreground">{codeLensProjectData.codebasePath}</span>
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
                Full investigation of the CodeLens codebase topology, Tree-Sitter AST parsing engine, vector store, and interactive canvas layout.
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {phase1Investigation.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-background/60 border border-border">
                    <span className="text-xs font-mono text-muted-foreground block">{m.label}</span>
                    <span className="text-base sm:text-lg font-bold text-amber-accent font-mono block mt-0.5">{m.value}</span>
                    <span className="text-[11px] text-muted-foreground block mt-1 leading-snug">{m.detail}</span>
                  </div>
                ))}
              </div>

              {/* Technology Stack Table */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Cpu className="size-4 text-amber-accent" />
                  Engineering Technology Stack Justification
                </h3>
                <div className="divide-y divide-border/60 bg-background/60 p-4 rounded-xl border border-border">
                  {phase1Investigation.technologyStack.map((tech, idx) => (
                    <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="min-w-0 sm:w-1/3">
                        <span className="text-xs font-mono text-amber-accent block">{tech.category}</span>
                        <span className="text-sm font-semibold text-foreground block mt-0.5">{tech.technology}</span>
                      </div>
                      <p className="text-xs text-muted-foreground sm:w-2/3 leading-relaxed">
                        {tech.justification}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Codebase Repository Tree */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Terminal className="size-4 text-amber-accent" />
                  Key Monorepo Subsystems & Directory Tree
                </h3>
                <div className="divide-y divide-border/60 bg-background/60 p-4 rounded-xl border border-border font-mono text-xs">
                  {phase1Investigation.codebaseTree.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-foreground font-semibold">{item.path}</span>
                      <span className="text-muted-foreground font-sans text-xs sm:max-w-md text-left sm:text-right">
                        {item.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHASE 2: Project Understanding & Architectural Foundations */}
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
              {/* Macro Architecture Tier Grid */}
              <div className="p-5 rounded-xl bg-background/60 border border-border space-y-3">
                <span className="text-xs font-mono font-bold text-amber-accent block">
                  MACRO ARCHITECTURAL TOPOLOGY
                </span>
                <p className="text-sm font-semibold text-foreground">
                  {phase2Understanding.macroArchitecture.pattern}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {phase2Understanding.macroArchitecture.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {phase2Understanding.macroArchitecture.tiers.map((t, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-accent/30 border border-border space-y-1">
                      <span className="text-xs font-mono font-bold text-foreground block">{t.tier}</span>
                      <span className="text-[11px] font-mono text-amber-accent block">{t.technologies}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">{t.responsibility}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer Decoupling */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Shield className="size-4 text-amber-accent" />
                  Architectural Layer Decoupling & Boundary Isolation
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {phase2Understanding.layers.map((l, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-background/60 border border-border space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-sm font-semibold text-foreground">{l.name}</span>
                        <span className="text-xs font-mono text-amber-accent">{l.path}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {l.decouplingReason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Data Flows */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Zap className="size-4 text-amber-accent" />
                  System Data Lifecycles & Execution Flows
                </h3>
                <div className="space-y-3">
                  {phase2Understanding.dataFlows.map((f) => (
                    <div key={f.id} className="p-4 rounded-xl bg-background/60 border border-border space-y-2">
                      <h4 className="text-sm font-semibold text-amber-accent">{f.title}</h4>
                      <ol className="text-xs text-muted-foreground space-y-1.5 pl-4 list-decimal leading-relaxed">
                        {f.steps.map((st, sIdx) => (
                          <li key={sIdx}>{st}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Design Decisions */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Code className="size-4 text-amber-accent" />
                  Critical Architectural Trade-offs & Engineering Decisions
                </h3>
                <div className="space-y-3">
                  {phase2Understanding.designDecisions.map((dd, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-background/60 border border-border space-y-1.5">
                      <span className="text-xs font-mono font-bold text-amber-accent block">DECISION #{idx + 1}</span>
                      <h4 className="text-sm font-semibold text-foreground">{dd.decision}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{dd.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHASE 3: Interview Presentation Framework (STAR) */}
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
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Senior engineering STAR stories structured for executive alignment, architectural deep dives, and complex debugging demonstrations.
              </p>

              <div className="space-y-4 pt-2">
                {phase3Presentation.stories.map((s) => (
                  <div key={s.id} className="p-5 rounded-xl bg-background/60 border border-border space-y-3">
                    <span className="text-xs font-mono font-bold text-amber-accent uppercase tracking-wider block">
                      {s.topic}
                    </span>

                    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
                      <div>
                        <strong className="text-foreground font-mono">[Situation]: </strong>
                        <span className="text-muted-foreground">{s.situation}</span>
                      </div>
                      <div>
                        <strong className="text-foreground font-mono">[Task]: </strong>
                        <span className="text-muted-foreground">{s.task}</span>
                      </div>
                      <div>
                        <strong className="text-foreground font-mono">[Action]: </strong>
                        <span className="text-muted-foreground">{s.action}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-accent/25 border border-border">
                        <strong className="text-amber-accent font-mono">[Result]: </strong>
                        <span className="text-foreground font-medium">{s.result}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHASE 4: Complete Interview Question Bank */}
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

                          {/* Actual CodeLens Implementation */}
                          <div className="p-4 rounded-xl bg-accent/25 border border-border space-y-2">
                            <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                              <Code className="size-3.5 text-amber-accent" /> ACTUAL CODELENS IMPLEMENTATION
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

                          {/* Real-World Example */}
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
                            <strong className="text-foreground">CodeLens Reality:</strong> {t.codeLensAnalysis}
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
                Real identified bugs, security risks, limitations, and bottlenecks in CodeLens without modifying source code.
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cat.items.map((item, iIdx) => (
                      <div key={iIdx} className="p-4 rounded-xl bg-background/60 border border-border space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                              item.severity === 'High'
                                ? 'bg-hard/20 text-hard border border-hard/30'
                                : item.severity === 'Medium'
                                ? 'bg-amber-accent/20 text-amber-accent border border-amber-accent/30'
                                : 'bg-easy/20 text-easy border border-easy/30'
                            }`}
                          >
                            {item.severity}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                        <div className="p-2.5 rounded-lg bg-accent/30 border border-border text-xs text-muted-foreground">
                          <strong className="text-foreground font-mono">Suggested Fix: </strong>
                          {item.fix}
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

