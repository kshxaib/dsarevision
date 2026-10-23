import { useState, useMemo } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

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
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter patterns and their problems
  const filteredPatterns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return patterns
      .map((pat) => {
        const desc = patternDescriptions[pat.id] || 'Algorithmic problem-solving pattern.';
        const matchesPatName = pat.name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);

        // Filter problems inside this pattern based on search, difficulty, and revision status
        const matchingProblems = pat.problems.filter((prob) => {
          if (q && !matchesPatName) {
            const titleMatches = prob.title.toLowerCase().includes(q);
            if (!titleMatches) return false;
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
          description: desc,
          easyCount,
          medCount,
          hardCount,
          revCount,
          percentage,
          visible: (q || difficultyFilter !== 'all' || statusFilter !== 'all') ? matchingProblems.length > 0 : true,
        };
      })
      .filter((p) => p.visible);
  }, [patterns, searchQuery, difficultyFilter, statusFilter, revisedProblems]);

  return (
    <div className="mx-auto pt-2 pb-10 px-4 sm:px-6 max-w-6xl animate-fadeIn">
      {/* Filter Row */}
      <div className="flex mb-6 items-center gap-3 flex-wrap sm:flex-nowrap">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="-translate-y-1/2 text-muted-foreground absolute top-1/2 left-3 size-4" />
          <Input
            placeholder="Search patterns and problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 bg-card border-border text-foreground placeholder:text-muted-foreground text-sm font-sans"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="relative">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-36 h-10 px-3 rounded-lg border border-border bg-card text-foreground text-xs font-sans focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer appearance-none pr-8"
          >
            <option value="all">Difficulty: All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
            ▾
          </span>
        </div>

        {/* Revision Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40 h-10 px-3 rounded-lg border border-border bg-card text-foreground text-xs font-sans focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer appearance-none pr-8"
          >
            <option value="all">Revision: All</option>
            <option value="revised">Revised</option>
            <option value="remaining">Not revised</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
            ▾
          </span>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
        {filteredPatterns.map((pat) => (
          <div
            key={pat.id}
            onClick={() => onSelectPattern(pat.id)}
            className="rounded-lg bg-card border border-border p-4 hover:border-sidebar-primary/60 transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="flex justify-between items-start gap-3">
              <div>
                <h2 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {pat.name}
                </h2>
                <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                  {pat.description}
                </p>
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all size-4 shrink-0 mt-0.5" />
            </div>

            <div className="text-xs flex mt-4 items-center gap-4 flex-wrap text-muted-foreground">
              <span className="text-foreground font-medium">{pat.problems.length} problems</span>
              <span>
                <strong className="text-foreground">{pat.revCount}</strong> / {pat.problems.length} revised
              </span>
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                Easy {pat.easyCount} · Med {pat.medCount} · Hard {pat.hardCount}
              </span>
            </div>

            <div className="rounded-full bg-muted mt-2 h-1 overflow-hidden">
              <div
                className="rounded-full bg-primary h-1 transition-all duration-300"
                style={{ width: `${pat.percentage}%` }}
              />
            </div>
          </div>
        ))}

        {filteredPatterns.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground text-sm border border-dashed border-border rounded-xl">
            No patterns or problems found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
