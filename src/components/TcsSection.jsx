import { useState, useMemo } from 'react';
import { ExternalLink, Search, CheckCircle2, Circle, ChevronDown } from 'lucide-react';
import { tcsPatterns, totalTcsProblems } from '../data/tcsProblems';

const diffColorClass = {
  Easy: 'text-easy',
  Medium: 'text-medium',
  Hard: 'text-hard',
};

export default function TcsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [openPatterns, setOpenPatterns] = useState(() => new Set());

  const togglePattern = (patternId) => {
    setOpenPatterns((prev) => {
      const next = new Set(prev);
      if (next.has(patternId)) {
        next.delete(patternId);
      } else {
        next.add(patternId);
      }
      return next;
    });
  };

  // Solved / completed problems tracked in localStorage for user convenience
  const [completedProblems, setCompletedProblems] = useState(() => {
    try {
      const saved = localStorage.getItem('tcs_completed_problems');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleCompleted = (seq) => {
    setCompletedProblems((prev) => {
      const next = new Set(prev);
      if (next.has(seq)) {
        next.delete(seq);
      } else {
        next.add(seq);
      }
      try {
        localStorage.setItem('tcs_completed_problems', JSON.stringify([...next]));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Filter patterns and problems
  const displayedPatterns = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return tcsPatterns
      .map((pat) => {
        const filteredProblems = pat.problems.filter((p) => {
          const matchesQuery =
            !q ||
            p.title.toLowerCase().includes(q) ||
            p.seq.toString().includes(q) ||
            (p.topics && p.topics.toLowerCase().includes(q));

          const matchesDiff =
            difficultyFilter === 'all' ||
            p.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

          return matchesQuery && matchesDiff;
        });

        return {
          ...pat,
          problems: filteredProblems,
          totalCount: pat.problems.length,
        };
      })
      .filter((pat) => pat.problems.length > 0);
  }, [searchQuery, difficultyFilter]);

  const solvedCount = completedProblems.size;
  const progressPercent = Math.round((solvedCount / totalTcsProblems) * 100) || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            TCS 190 Problems
          </h1>
        </div>

        {/* Progress & Solved Counter */}
        <div className="flex items-center gap-4 bg-card/60 border border-border/80 px-4 py-2.5 rounded-lg">
          <div>
            <div className="text-xs text-muted-foreground">Solved Progress</div>
            <div className="text-base font-semibold text-foreground">
              {solvedCount} / {totalTcsProblems}{' '}
              <span className="text-xs text-muted-foreground font-normal">
                ({progressPercent}%)
              </span>
            </div>
          </div>
          <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search problems by title, sequence number or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card/70 border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-card/70 border border-border p-1 rounded-lg text-xs">
          {['all', 'easy', 'medium', 'hard'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`px-3 py-1 rounded capitalize font-medium transition-colors ${
                difficultyFilter === d
                  ? 'bg-amber-500 text-black shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Sections per Pattern */}
      {displayedPatterns.length === 0 ? (
        <div className="text-center py-16 bg-card/40 border border-border rounded-xl">
          <p className="text-muted-foreground text-sm">No problems found matching your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedPatterns.map((pat) => {
            const isExpanded = searchQuery.trim() !== '' || openPatterns.has(pat.id);
            return (
              <div
                key={pat.id}
                className="bg-card/40 border border-border/80 rounded-xl overflow-hidden shadow-xs"
              >
                {/* Pattern Header (Collapsible) */}
                <button
                  type="button"
                  onClick={() => togglePattern(pat.id)}
                  className={`w-full px-4 py-3.5 bg-card/90 hover:bg-card flex items-center justify-between cursor-pointer transition-colors text-left ${
                    isExpanded ? 'border-b border-border/80' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <h2 className="font-semibold text-sm sm:text-base text-foreground">
                      {pat.name}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
                      {pat.problems.length} {pat.problems.length === 1 ? 'problem' : 'problems'}
                    </span>
                  </div>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${
                      isExpanded ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </button>

                {/* Problems Table / List */}
                {isExpanded && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border/50 text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/20">
                          <th className="py-2.5 px-3 w-12 text-center">Status</th>
                          <th className="py-2.5 px-3 w-14 font-mono">#</th>
                          <th className="py-2.5 px-3">Title</th>
                          <th className="py-2.5 px-3 w-28 text-center">Difficulty</th>
                          <th className="py-2.5 px-3 w-28 text-right font-mono">Frequency</th>
                          <th className="py-2.5 px-3 w-20 text-center">Solve</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {pat.problems.map((prob) => {
                          const isDone = completedProblems.has(prob.seq);
                          return (
                            <tr
                              key={prob.seq}
                              className={`hover:bg-muted/30 transition-colors ${
                                isDone ? 'bg-muted/10' : ''
                              }`}
                            >
                              {/* Checkbox / Solved state */}
                              <td className="py-2.5 px-3 text-center">
                                <button
                                  onClick={() => toggleCompleted(prob.seq)}
                                  className="text-muted-foreground hover:text-amber-400 transition-colors inline-flex items-center justify-center"
                                  title={isDone ? 'Mark as unsolved' : 'Mark as solved'}
                                >
                                  {isDone ? (
                                    <CheckCircle2 className="size-4 text-emerald-400" />
                                  ) : (
                                    <Circle className="size-4 text-muted-foreground/60 hover:text-muted-foreground" />
                                  )}
                                </button>
                              </td>

                              {/* Sequence Number */}
                              <td className="py-2.5 px-3 font-mono text-xs text-muted-foreground">
                                {prob.seq}
                              </td>

                              {/* Problem Title */}
                              <td className="py-2.5 px-3">
                                <a
                                  href={prob.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`group inline-flex items-center gap-1.5 font-medium hover:text-amber-400 transition-colors ${
                                    isDone ? 'text-muted-foreground line-through' : 'text-foreground'
                                  }`}
                                >
                                  <span>{prob.title}</span>
                                  <ExternalLink className="size-3 text-muted-foreground group-hover:text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                                </a>
                                {prob.topics && (
                                  <div className="text-[11px] text-muted-foreground/70 truncate max-w-md mt-0.5">
                                    {prob.topics}
                                  </div>
                                )}
                              </td>

                              {/* Difficulty */}
                              <td className="py-2.5 px-3 text-center">
                                <span
                                  className={`text-xs font-medium ${
                                    diffColorClass[prob.difficulty] || 'text-muted-foreground'
                                  }`}
                                >
                                  {prob.difficulty}
                                </span>
                              </td>

                              {/* Frequency */}
                              <td className="py-2.5 px-3 text-right">
                                <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted/60 text-foreground font-medium">
                                  {typeof prob.frequency === 'number'
                                    ? prob.frequency.toFixed(1)
                                    : prob.frequency}
                                  %
                                </span>
                              </td>

                              {/* Direct LeetCode Link */}
                              <td className="py-2.5 px-3 text-center">
                                <a
                                  href={prob.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center p-1.5 rounded-md text-xs text-muted-foreground hover:text-amber-400 hover:bg-muted transition-colors"
                                  title="Open on LeetCode"
                                >
                                  <ExternalLink className="size-4" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

