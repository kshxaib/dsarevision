import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function VaultSubjectView({ subject }) {
  // Default: first question expanded
  const [expandedIds, setExpandedIds] = useState(
    () => new Set(subject.questions.length > 0 ? [subject.questions[0].id] : [])
  );

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

  return (
    <div className="w-full pt-1 pb-10 animate-fadeIn">
      {/* Question Cards List */}
      <div className="space-y-3">
        {subject.questions.map((q) => {
          const isExpanded = expandedIds.has(q.id);

          return (
            <article
              key={q.id}
              id={q.id}
              className="bg-card border border-border rounded-xl overflow-hidden transition-colors shadow-xs"
            >
              {/* Question Header */}
              <div
                onClick={() => toggleQuestion(q.id)}
                className={`w-full px-4 sm:px-6 py-4 flex items-center justify-between gap-3 sm:gap-4 transition-colors select-none cursor-pointer ${
                  isExpanded ? 'bg-accent/40' : 'hover:bg-accent/20'
                }`}
              >
                <div className="flex-1 flex items-center gap-3 sm:gap-4 min-w-0">
                  {/* Clean Number without box or gradient */}
                  <span className="font-mono text-sm font-semibold text-muted-foreground shrink-0 select-none">
                    Q{q.number}.
                  </span>
                  <h2 className="text-sm sm:text-base font-medium text-foreground leading-snug">
                    {q.question}
                  </h2>
                </div>

                <div className="shrink-0 text-muted-foreground">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Answer Content */}
              {isExpanded && (
                <div className="p-5 sm:p-6 text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-sans border-t border-border bg-card/70 space-y-4 animate-fadeIn">
                  <div>{q.answer}</div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
