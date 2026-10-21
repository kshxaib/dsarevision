import { useState } from 'react';
import { ChevronDown, ChevronsUpDown, ChevronsDownUp } from 'lucide-react';
import { theoryQuestions, theoryCategories } from '../data/theoryQuestions';

export default function TheoryQuestions() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Default: All questions expanded
  const [expandedIds, setExpandedIds] = useState(
    () => new Set(theoryQuestions.map((q) => q.id))
  );

  const filteredQuestions = selectedCategory === 'All'
    ? theoryQuestions
    : theoryQuestions.filter((q) => q.category === selectedCategory);

  const allFilteredExpanded = filteredQuestions.length > 0 && 
    filteredQuestions.every((q) => expandedIds.has(q.id));

  const toggleQuestion = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allFilteredExpanded) {
      // Collapse all in current view
      setExpandedIds((prev) => {
        const next = new Set(prev);
        filteredQuestions.forEach((q) => next.delete(q.id));
        return next;
      });
    } else {
      // Expand all in current view
      setExpandedIds((prev) => {
        const next = new Set(prev);
        filteredQuestions.forEach((q) => next.add(q.id));
        return next;
      });
    }
  };

  return (
    <div className="animate-fadeIn max-w-[840px] mx-auto py-2 space-y-6">
      {/* Page Header */}
      <div className="border-b border-ink-border pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl font-heading font-bold text-ink-text">
            DSA Theory & Interview Questions
          </h1>
          
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Global Expand / Collapse Button */}
            <button
              onClick={toggleAll}
              className="flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-ink-text bg-ink-surface border border-ink-border hover:border-ink-faint px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer"
              title={allFilteredExpanded ? 'Collapse all questions' : 'Expand all questions'}
            >
              {allFilteredExpanded ? (
                <>
                  <ChevronsDownUp className="w-3.5 h-3.5 text-amber-accent" />
                  <span>Collapse All</span>
                </>
              ) : (
                <>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-amber-accent" />
                  <span>Expand All</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap mt-4 pt-4 border-t border-ink-border/50">
          {theoryCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1 rounded-md transition-all font-mono cursor-pointer ${
                  isSelected
                    ? 'bg-amber-accent text-ink-base font-semibold shadow-sm'
                    : 'bg-ink-surface text-ink-muted border border-ink-border hover:border-ink-faint hover:text-ink-text'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3.5">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedIds.has(q.id);

          return (
            <article
              key={q.id}
              id={q.id}
              className="bg-ink-surface border border-ink-border rounded-xl overflow-hidden shadow-sm hover:border-ink-faint transition-all"
            >
              {/* Question Header (Click to toggle) */}
              <button
                type="button"
                onClick={() => toggleQuestion(q.id)}
                className="w-full text-left bg-ink-elevated/70 hover:bg-ink-elevated/90 px-5 py-3.5 flex items-center justify-between gap-4 transition-colors cursor-pointer select-none"
              >
                <div className="flex items-baseline gap-2.5 min-w-0">
                  <span className="font-mono text-sm font-bold text-amber-accent shrink-0">
                    Q{q.number}.
                  </span>
                  <h2 className="text-base font-heading font-bold text-ink-text leading-snug">
                    {q.question}
                  </h2>
                </div>

                <div
                  className={`p-1.5 rounded-md border border-ink-border/60 bg-ink-surface text-ink-subtle hover:text-ink-text transition-transform duration-200 shrink-0 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Direct Answer (Collapsible) */}
              {isExpanded && (
                <div className="p-5 sm:p-6 text-sm text-ink-muted leading-relaxed whitespace-pre-line font-sans border-t border-ink-border/70 animate-fadeIn">
                  {q.answer}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
