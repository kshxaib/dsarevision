import { useState } from 'react';
import { ChevronRight, Check, ExternalLink, ChevronDown } from 'lucide-react';

const diffColorClass = {
  Easy: 'text-easy',
  Medium: 'text-medium',
  Hard: 'text-hard',
};

export default function ProblemList({
  pattern,
  patternIndex,
  onSelectProblem,
  revisedProblems = new Set(),
  onToggleRevised,
}) {
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const cheatSheet = pattern?.cheatSheet;

  return (
    <div className="animate-fadeIn">
      {/* Pattern Header */}
      <div className="mb-6 pb-4 border-b border-ink-border">
        <div className="flex items-center gap-2.5">
          {typeof patternIndex === 'number' && patternIndex >= 0 && (
            <span className="text-2xl font-mono font-bold text-amber-accent">
              {String(patternIndex + 1).padStart(2, '0')}
            </span>
          )}
          <h1 className="text-2xl font-heading font-bold text-ink-text">
            {pattern.name}
          </h1>
        </div>
      </div>

      {/* Pattern Cheat Sheet (if available) */}
      {cheatSheet && (
        <div className="mb-6 rounded-[10px] border border-ink-border bg-ink-surface/70 overflow-hidden">
          {/* Header Bar */}
          <div
            onClick={() => setCheatSheetOpen(!cheatSheetOpen)}
            className={`flex items-center justify-between px-4 py-3 bg-ink-surface cursor-pointer select-none hover:bg-ink-elevated/70 transition-colors ${
              cheatSheetOpen ? 'border-b border-ink-border/50' : ''
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-sm font-heading font-semibold text-ink-text">
                Cheat Sheet
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-ink-subtle shrink-0">
              <span>{cheatSheetOpen ? 'Hide' : 'Show'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  cheatSheetOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>

          {/* Collapsible Content */}
          <div
            className={`grid transition-all duration-200 ease-in-out ${
              cheatSheetOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-4 space-y-4 text-xs">
                {/* Summary */}
                {cheatSheet.summary && (
                  <p className="text-[13px] text-ink-muted leading-relaxed pb-3 border-b border-ink-border/40">
                    {cheatSheet.summary}
                  </p>
                )}

                {/* 3 Structured Columns */}
                {cheatSheet.sections && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                    {cheatSheet.sections.map((section, sIdx) => (
                      <div
                        key={sIdx}
                        className="rounded-lg border border-ink-border/70 bg-ink-elevated/40 p-3 space-y-2.5"
                      >
                        <h2 className="text-[11px] font-semibold text-ink-text uppercase tracking-wider">
                          {section.title}
                        </h2>

                        <div className="space-y-2.5">
                          {section.items.map((item, iIdx) => (
                            <div key={iIdx} className="space-y-0.5">
                              <span className="font-medium text-amber-accent text-xs block">
                                {item.label}
                              </span>
                              <p className="text-[11px] text-ink-muted leading-relaxed">
                                {item.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Problems List */}
      <div className="border border-ink-border rounded-[10px] overflow-hidden divide-y divide-ink-border bg-ink-surface/50">
        {pattern.problems.map((problem) => {
          const isRevised = revisedProblems.has(problem.id);

          return (
            <div
              key={problem.id}
              onClick={() => onSelectProblem(problem)}
              className="w-full text-left group flex items-center gap-3 px-4 py-3.5 hover:bg-ink-surface transition-colors duration-150 cursor-pointer"
            >
              {/* Real Tick */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRevised?.(problem.id);
                }}
                title={isRevised ? 'Mark as unrevised' : 'Mark as revised'}
                className="w-5 h-5 flex items-center justify-center shrink-0 cursor-pointer"
                aria-label={isRevised ? `Mark ${problem.title} as unrevised` : `Mark ${problem.title} as revised`}
              >
                {isRevised && (
                  <Check className="w-4 h-4 text-[#2cbb5d] stroke-[2.8]" />
                )}
              </button>

              {/* Problem Title & Definition */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-ink-text group-hover:text-white transition-colors truncate">
                    {problem.title}
                  </p>

                  {problem.leetcodeUrl && (
                    <a
                      href={problem.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title={problem.leetcodeUrl.includes('neetcode.io') ? 'Open on NeetCode' : 'Open on LeetCode'}
                      className="text-ink-subtle hover:text-amber-accent p-0.5 rounded transition-colors inline-flex items-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {problem.definition && (
                  <p className="text-xs text-ink-subtle mt-0.5 truncate max-w-lg">
                    {problem.definition}
                  </p>
                )}
              </div>

              {/* Difficulty */}
              <span
                className={`text-xs font-medium shrink-0 ${diffColorClass[problem.difficulty] || 'text-ink-muted'}`}
              >
                {problem.difficulty}
              </span>

              {/* Chevron icon */}
              <ChevronRight className="w-3.5 h-3.5 text-ink-faint group-hover:text-ink-subtle transition-colors shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
