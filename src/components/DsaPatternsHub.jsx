import { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Check, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';

const diffColorClass = {
  Easy: 'text-easy',
  Medium: 'text-medium',
  Hard: 'text-hard',
};

const patternDescriptions = {
  'arrays-hashing': 'Organize data for constant-time access and lookup.',
  'two-pointers': 'Move through ordered data with coordinated indices.',
  'sliding-window': 'Maintain a focused range while scanning a sequence.',
  'stack': 'Use ordering constraints to model state and history.',
  'binary-search': 'Narrow a monotonic search space by halves.',
  'linked-list': 'Manipulate connected nodes with pointer discipline.',
  'trees': 'Traverse hierarchical data and exploit ordering.',
  'tries': 'Index strings by shared prefixes and characters.',
  'heap-priority-queue': 'Keep the most important element accessible.',
  'backtracking': 'Explore choices systematically and undo dead ends.',
  'graphs': 'Model relationships with traversal and connectivity.',
  'advanced-graphs': 'Solve weighted, directed, and flow-based problems.',
  '1d-dynamic-programming': 'Build optimal solutions from overlapping subproblems.',
  '2d-dynamic-programming': 'Multi-dimensional state transitions and grid problems.',
  'greedy': 'Make locally optimal choices toward a global solution.',
  'intervals': 'Sort and merge overlapping ranges efficiently.',
  'math-geometry': 'Apply mathematical structure to spatial problems.',
  'bit-manipulation': 'Use binary representations for compact operations.',
};

export default function DsaPatternsHub({
  patterns,
  revisedProblems = new Set(),
  onSelectPattern,
  onSelectProblem,
  onToggleRevised,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const q = searchQuery.trim().toLowerCase();

  // All individual problems matching search and filters across all patterns
  const allMatchingProblems = useMemo(() => {
    if (!q) return [];

    const list = [];
    patterns.forEach((pat, patIdx) => {
      pat.problems.forEach((prob) => {
        const titleMatches = prob.title.toLowerCase().includes(q);
        const defMatches = prob.definition ? prob.definition.toLowerCase().includes(q) : false;
        if (!titleMatches && !defMatches) return;

        if (difficultyFilter !== 'all' && prob.difficulty.toLowerCase() !== difficultyFilter) {
          return;
        }

        const isRev = revisedProblems.has(prob.id);
        if (statusFilter === 'revised' && !isRev) return;
        if (statusFilter === 'remaining' && isRev) return;

        list.push({
          ...prob,
          patternId: pat.id,
          patternName: pat.name,
          patternIndex: patIdx + 1,
        });
      });
    });
    return list;
  }, [patterns, q, difficultyFilter, statusFilter, revisedProblems]);

  // Filter patterns and their problem statistics
  const filteredPatterns = useMemo(() => {
    return patterns
      .map((pat, patIdx) => {
        const desc = patternDescriptions[pat.id] || 'Algorithmic problem-solving pattern.';
        const matchesPatName = pat.name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);

        // Filter problems inside this pattern based on search, difficulty, and revision status
        const matchingProblems = pat.problems.filter((prob) => {
          if (q && !matchesPatName) {
            const titleMatches = prob.title.toLowerCase().includes(q);
            const defMatches = prob.definition ? prob.definition.toLowerCase().includes(q) : false;
            if (!titleMatches && !defMatches) return false;
          }

          if (difficultyFilter !== 'all' && prob.difficulty.toLowerCase() !== difficultyFilter) {
            return false;
          }

          const isRev = revisedProblems.has(prob.id);
          if (statusFilter === 'revised' && !isRev) return false;
          if (statusFilter === 'remaining' && isRev) return false;

          return true;
        });

        const easyCount = pat.problems.filter((p) => p.difficulty === 'Easy').length;
        const medCount = pat.problems.filter((p) => p.difficulty === 'Medium').length;
        const hardCount = pat.problems.filter((p) => p.difficulty === 'Hard').length;
        const revCount = pat.problems.filter((p) => revisedProblems.has(p.id)).length;
        const percentage = pat.problems.length > 0 ? Math.round((revCount / pat.problems.length) * 100) : 0;

        return {
          ...pat,
          patternNumber: String(patIdx + 1).padStart(2, '0'),
          description: desc,
          easyCount,
          medCount,
          hardCount,
          revCount,
          percentage,
          matchingProblemCount: matchingProblems.length,
          visible: (q || difficultyFilter !== 'all' || statusFilter !== 'all') ? (matchesPatName || matchingProblems.length > 0) : true,
        };
      })
      .filter((p) => p.visible);
  }, [patterns, q, difficultyFilter, statusFilter, revisedProblems]);

  return (
    <div className="mx-auto pt-2 pb-12 px-2 sm:px-4 max-w-6xl animate-fadeIn">
      {/* Filter Row */}
      <div className="flex mb-6 items-center gap-3 flex-wrap sm:flex-nowrap">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="-translate-y-1/2 text-ink-subtle absolute top-1/2 left-3.5 size-4 pointer-events-none" />
          <Input
            placeholder="Search patterns or problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-ink-surface/70 border-ink-border text-ink-text placeholder:text-ink-subtle text-sm font-sans rounded-lg focus-visible:ring-1 focus-visible:ring-amber-accent/50 focus-visible:border-amber-accent/60"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="relative">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-36 h-10 px-3 rounded-lg border border-ink-border bg-ink-surface/70 text-ink-text text-xs font-sans focus:outline-none focus:border-amber-accent/60 focus:ring-1 focus:ring-amber-accent/50 cursor-pointer appearance-none pr-8"
          >
            <option value="all">Difficulty: All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle text-xs">
            ▾
          </span>
        </div>

        {/* Revision Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40 h-10 px-3 rounded-lg border border-ink-border bg-ink-surface/70 text-ink-text text-xs font-sans focus:outline-none focus:border-amber-accent/60 focus:ring-1 focus:ring-amber-accent/50 cursor-pointer appearance-none pr-8"
          >
            <option value="all">Revision: All</option>
            <option value="revised">Revised</option>
            <option value="remaining">Not revised</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle text-xs">
            ▾
          </span>
        </div>
      </div>

      {/* If searching, display Matching Problems Section */}
      {q && (
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted flex items-center gap-2">
              <span>Matching Problems</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-ink-elevated text-ink-text font-mono border border-ink-border">
                {allMatchingProblems.length}
              </span>
            </h2>
          </div>

          {allMatchingProblems.length > 0 ? (
            <div className="border border-ink-border rounded-xl overflow-hidden divide-y divide-ink-border bg-ink-surface/60 shadow-xs">
              {allMatchingProblems.map((problem) => {
                const isRevised = revisedProblems.has(problem.id);
                return (
                  <div
                    key={problem.id}
                    onClick={() => onSelectProblem?.(problem)}
                    className="w-full text-left group flex items-center gap-3.5 px-4 py-3 hover:bg-ink-surface transition-colors cursor-pointer"
                  >
                    {/* Real Tick Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleRevised?.(problem.id);
                      }}
                      title={isRevised ? 'Mark as unrevised' : 'Mark as revised'}
                      className="w-5 h-5 flex items-center justify-center shrink-0 cursor-pointer text-ink-subtle hover:text-ink-text"
                    >
                      {isRevised ? (
                        <Check className="w-4 h-4 text-[#2cbb5d] stroke-[2.8]" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-sm border border-ink-border group-hover:border-ink-subtle transition-colors" />
                      )}
                    </button>

                    {/* Title & Pattern Badge & Definition */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[13px] font-medium text-ink-text group-hover:text-white transition-colors">
                          {problem.title}
                        </span>
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-ink-elevated text-ink-muted border border-ink-border inline-flex items-center gap-1.5">
                          <span className="text-amber-accent font-bold">
                            {String(problem.patternIndex).padStart(2, '0')}
                          </span>
                          <span>{problem.patternName}</span>
                        </span>
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
                        <p className="text-xs text-ink-subtle mt-0.5 truncate max-w-xl">
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

                    <ArrowUpRight className="text-ink-subtle group-hover:text-amber-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all size-4 shrink-0" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-6 px-4 rounded-xl border border-dashed border-ink-border bg-ink-surface/30 text-center text-xs text-ink-subtle">
              No problem titles found matching "{searchQuery.trim()}".
            </div>
          )}

          {/* Section header for Patterns */}
          <div className="mt-8 mb-3 px-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted flex items-center gap-2">
              <span>Matching Patterns</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-ink-elevated text-ink-text font-mono border border-ink-border">
                {filteredPatterns.length}
              </span>
            </h2>
          </div>
        </div>
      )}

      {/* 2-Column Grid of Patterns with Clean Technical Design */}
      <div className="grid gap-3.5 grid-cols-1 md:grid-cols-2">
        {filteredPatterns.map((pat) => (
          <div
            key={pat.id}
            onClick={() => onSelectPattern(pat.id)}
            className="rounded-xl bg-ink-surface/70 border border-ink-border p-4.5 hover:border-amber-accent/50 hover:bg-ink-surface transition-all duration-150 cursor-pointer group shadow-xs relative overflow-hidden"
          >
            {/* Header: Clean Number Index + Name + Arrow */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-start gap-3 min-w-0">
                {/* Clean Numeric Index instead of dummy emoji */}
                <span className="font-mono text-sm font-bold text-amber-accent/90 shrink-0 mt-0.5 group-hover:text-amber-accent transition-colors">
                  {pat.patternNumber}
                </span>
                <div className="min-w-0">
                  <h2 className="font-semibold text-sm text-ink-text group-hover:text-white transition-colors truncate">
                    {pat.name}
                  </h2>
                  <p className="text-ink-subtle text-xs mt-1 leading-relaxed line-clamp-2">
                    {pat.description}
                  </p>
                </div>
              </div>

              <div className="p-1 rounded-md text-ink-subtle group-hover:text-amber-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0">
                <ArrowUpRight className="size-4" />
              </div>
            </div>

            {/* Stats Row */}
            <div className="text-xs flex mt-4 items-center gap-3 flex-wrap text-ink-subtle">
              <span className="text-ink-text font-medium">{pat.problems.length} problems</span>
              <span className="text-ink-border">·</span>
              <span>
                <strong className="text-ink-text font-medium">{pat.revCount}</strong>/{pat.problems.length} revised
              </span>

              {/* Clean Difficulty Pills */}
              <div className="ml-auto flex items-center gap-2 text-[11px] font-mono">
                {pat.easyCount > 0 && (
                  <span className="text-easy font-medium">
                    {pat.easyCount}E
                  </span>
                )}
                {pat.medCount > 0 && (
                  <span className="text-medium font-medium">
                    {pat.medCount}M
                  </span>
                )}
                {pat.hardCount > 0 && (
                  <span className="text-hard font-medium">
                    {pat.hardCount}H
                  </span>
                )}
              </div>
            </div>

            {/* Subtle Progress Bar */}
            <div className="w-full bg-ink-elevated mt-3 h-1 rounded-full overflow-hidden">
              <div
                className="bg-amber-accent h-full transition-all duration-300 rounded-full"
                style={{ width: `${pat.percentage}%` }}
              />
            </div>
          </div>
        ))}

        {filteredPatterns.length === 0 && (!q || allMatchingProblems.length === 0) && (
          <div className="col-span-full py-12 text-center text-ink-subtle text-sm border border-dashed border-ink-border rounded-xl bg-ink-surface/20">
            No patterns or problems found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}


