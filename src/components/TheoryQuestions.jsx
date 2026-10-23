import { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { theoryQuestions } from '../data/theoryQuestions';

// Curated comparison table for Question 1
const arrayVsLinkedListTable = (
  <div className="mt-4">
    <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">
      At a glance: Array vs Linked list
    </h3>
    <table className="text-left border-collapse text-xs w-full border border-border rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-muted/40 text-muted-foreground border-b border-border">
          <th className="font-medium p-2.5 pr-4">Property</th>
          <th className="font-medium p-2.5 pr-4">Array</th>
          <th className="font-medium p-2.5">Linked list</th>
        </tr>
      </thead>
      <tbody className="divide-y border-border">
        <tr>
          <td className="font-medium p-2.5 pr-4 text-foreground">Memory layout</td>
          <td className="text-muted-foreground p-2.5 pr-4">Contiguous</td>
          <td className="text-muted-foreground p-2.5">Non-contiguous nodes</td>
        </tr>
        <tr>
          <td className="font-medium p-2.5 pr-4 text-foreground">Access</td>
          <td className="font-mono text-primary p-2.5 pr-4">O(1)</td>
          <td className="font-mono text-muted-foreground p-2.5">O(n)</td>
        </tr>
        <tr>
          <td className="font-medium p-2.5 pr-4 text-foreground">Insertion / Deletion</td>
          <td className="text-muted-foreground p-2.5 pr-4">O(n) due to shifting</td>
          <td className="font-mono text-primary p-2.5">O(1) with pointer reference</td>
        </tr>
        <tr>
          <td className="font-medium p-2.5 pr-4 text-foreground">Cache Locality</td>
          <td className="text-emerald-400 p-2.5 pr-4">Excellent (CPU prefetch)</td>
          <td className="text-rose-400 p-2.5">Poor (cache line misses)</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default function TheoryQuestions() {
  // Expanded questions state (default: first question open)
  const [expandedIds, setExpandedIds] = useState(
    () => new Set(['what-is-a-data-structure'])
  );

  const toggleQuestion = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Questions sorted number-wise (01, 02, 03... 23)
  const sortedQuestions = useMemo(() => {
    return [...theoryQuestions].sort((a, b) => {
      return parseInt(a.number, 10) - parseInt(b.number, 10);
    });
  }, []);

  return (
    <div className="w-full pt-1 pb-10 animate-fadeIn">
      {/* Number-wise Question List with Card Separation */}
      <div className="space-y-3">
        {sortedQuestions.map((q) => {
          const isExpanded = expandedIds.has(q.id);

          return (
            <div
              key={q.id}
              className="rounded-xl border border-border bg-card overflow-hidden shadow-xs transition-colors"
            >
              {/* Question Row Header */}
              <div
                onClick={() => toggleQuestion(q.id)}
                className={`flex px-4 sm:px-6 py-4 items-center gap-3 sm:gap-4 w-full cursor-pointer select-none transition-colors ${
                  isExpanded ? 'bg-accent/40' : 'hover:bg-accent/20'
                }`}
              >
                {/* Clean Number without box or gradient */}
                <span className="font-mono text-sm font-semibold text-muted-foreground shrink-0 select-none">
                  #{q.number}
                </span>

                {/* Question Title */}
                <span className="font-medium text-sm sm:text-base text-foreground flex-1 leading-snug">
                  {q.question}
                </span>

                {/* Chevron Toggle */}
                {isExpanded ? (
                  <ChevronDown className="text-muted-foreground size-4 shrink-0" />
                ) : (
                  <ChevronRight className="text-muted-foreground size-4 shrink-0" />
                )}
              </div>

              {/* Expanded Answer Content */}
              {isExpanded && (
                <div className="border-t border-border px-5 sm:px-8 py-5 bg-card/70 animate-fadeIn space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line font-sans">
                    {q.answer}
                  </p>

                  {/* Render Comparison table for Question 01 */}
                  {q.id === 'what-is-a-data-structure' && arrayVsLinkedListTable}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
