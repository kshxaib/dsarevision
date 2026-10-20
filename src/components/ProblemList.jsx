import { ChevronRight, Check, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const diffBadgeClass = {
  Easy: 'bg-easy/10 text-easy border-easy/30 hover:bg-easy/20',
  Medium: 'bg-medium/10 text-medium border-medium/30 hover:bg-medium/20',
  Hard: 'bg-hard/10 text-hard border-hard/30 hover:bg-hard/20',
};

export default function ProblemList({
  pattern,
  patternIndex,
  onSelectProblem,
  revisedProblems = new Set(),
  onToggleRevised,
}) {
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

              {/* Difficulty Badge */}
              <Badge
                variant="outline"
                className={`text-[10px] font-semibold px-2 py-0.5 border shrink-0 ${diffBadgeClass[problem.difficulty]}`}
              >
                {problem.difficulty}
              </Badge>

              {/* Chevron icon */}
              <ChevronRight className="w-3.5 h-3.5 text-ink-faint group-hover:text-ink-subtle transition-colors shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
