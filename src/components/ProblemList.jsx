import { ChevronRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const diffBadgeClass = {
  Easy: 'bg-easy/10 text-easy border-easy/30 hover:bg-easy/20',
  Medium: 'bg-medium/10 text-medium border-medium/30 hover:bg-medium/20',
  Hard: 'bg-hard/10 text-hard border-hard/30 hover:bg-hard/20',
};

export default function ProblemList({
  pattern,
  onSelectProblem,
  revisedProblems = new Set(),
}) {
  const revisedCount = pattern.problems.filter(p => revisedProblems.has(p.id)).length;

  return (
    <div className="animate-fadeIn">
      {/* Pattern Header */}
      <div className="flex items-end justify-between mb-6 pb-4 border-b border-ink-border">
        <div>
          <h1 className="text-2xl font-heading font-bold text-ink-text mb-1">
            {pattern.name}
          </h1>
          <p className="text-sm text-ink-subtle">
            {pattern.problems.length} problems
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-amber-accent font-semibold px-2.5 py-1 rounded-full bg-amber-accent-muted border border-amber-accent/20">
            {revisedCount} / {pattern.problems.length} Revised
          </span>
        </div>
      </div>

      {/* Problems List */}
      <div className="border border-ink-border rounded-[10px] overflow-hidden divide-y divide-ink-border bg-ink-surface/50">
        {pattern.problems.map((problem, idx) => {
          const isRevised = revisedProblems.has(problem.id);

          return (
            <button
              key={problem.id}
              onClick={() => onSelectProblem(problem)}
              className="w-full text-left group hover:bg-ink-surface transition-colors duration-150 cursor-pointer"
            >
              <div className="flex items-center gap-4 px-5 py-3.5">
                <span className="text-[11px] text-ink-faint font-mono tabular-nums w-5 text-right shrink-0">
                  {idx + 1}
                </span>

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
                        title="Open on LeetCode"
                        className="text-ink-subtle hover:text-amber-accent p-0.5 rounded transition-colors inline-flex items-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {isRevised && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-easy shrink-0" />
                    )}
                  </div>
                  {problem.definition && (
                    <p className="text-xs text-ink-subtle mt-0.5 truncate max-w-lg">
                      {problem.definition}
                    </p>
                  )}
                </div>

                <Badge
                  variant="outline"
                  className={`text-[10px] font-semibold px-2 py-0.5 border shrink-0 ${diffBadgeClass[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </Badge>

                <ChevronRight className="w-3.5 h-3.5 text-ink-faint group-hover:text-ink-subtle transition-colors shrink-0" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
