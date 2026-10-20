import { theoryQuestions } from '../data/theoryQuestions';

export default function TheoryQuestions() {
  return (
    <div className="animate-fadeIn max-w-[840px] mx-auto py-2 space-y-8">
      {/* Page Header */}
      <div className="border-b border-ink-border pb-5">
        <h1 className="text-2xl font-heading font-bold text-ink-text">
          DSA Theory & Interview Questions
        </h1>
      </div>

      {/* Cards List */}
      <div className="space-y-6">
        {theoryQuestions.map((q) => {
          const ans = q.interviewAnswer;

          return (
            <article
              key={q.id}
              id={q.id}
              className="bg-ink-surface border border-ink-border rounded-xl overflow-hidden shadow-sm hover:border-ink-faint transition-colors"
            >
              {/* Question Header Banner */}
              <div className="bg-ink-elevated/70 border-b border-ink-border px-5 py-3.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-amber-accent">
                    Q{q.number}
                  </span>
                  <span className="text-ink-border font-mono">•</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-subtle">
                    {q.category}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-heading font-bold text-ink-text">
                  {q.question}
                </h2>
              </div>

              {/* Answer Content Body */}
              <div className="p-5 sm:p-6 space-y-4 text-sm">
                {/* Core Answer */}
                <p className="text-ink-text text-[14px] leading-relaxed">
                  {ans?.definition || q.summary}
                </p>

                {/* Key Points */}
                {ans?.keyPoints && ans.keyPoints.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Key Points
                    </span>
                    <ul className="space-y-1.5">
                      {ans.keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-ink-muted text-xs sm:text-sm">
                          <span className="text-amber-accent font-bold mt-1 text-xs">•</span>
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Classification */}
                {ans?.classification && (
                  <div className="space-y-2 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Classification
                    </span>
                    <div className="space-y-2 text-xs">
                      {ans.classification.map((cls, idx) => (
                        <div key={idx} className="leading-relaxed">
                          <strong className="text-ink-text">{cls.type}: </strong>
                          <span className="text-ink-muted">{cls.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Types */}
                {ans?.types && (
                  <div className="space-y-1.5 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Types
                    </span>
                    <ul className="space-y-1 text-xs sm:text-sm">
                      {ans.types.map((type, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-ink-muted">
                          <span className="text-easy font-bold">•</span>
                          <span>{type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Advantages */}
                {ans?.advantages && (
                  <div className="space-y-2 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Advantages
                    </span>
                    <div className="space-y-1.5 text-xs">
                      {ans.advantages.map((adv, idx) => (
                        <div key={idx} className="leading-relaxed">
                          <strong className="text-easy">{adv.title}: </strong>
                          <span className="text-ink-muted">{adv.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trade-offs */}
                {ans?.tradeoffs && (
                  <div className="space-y-1.5 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Trade-offs
                    </span>
                    <ul className="space-y-1 text-xs">
                      {ans.tradeoffs.map((to, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-ink-muted">
                          <span className="text-medium font-bold">•</span>
                          <span>{to}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Operations Table */}
                {ans?.operations && (
                  <div className="space-y-2 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Basic Operations
                    </span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-ink-border rounded-lg overflow-hidden">
                        <thead className="bg-ink-elevated text-ink-subtle uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="p-2.5 border-b border-ink-border font-semibold">Operation</th>
                            <th className="p-2.5 border-b border-ink-border font-semibold">Time Complexity</th>
                            <th className="p-2.5 border-b border-ink-border font-semibold">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-ink-border">
                          {ans.operations.map((op, idx) => (
                            <tr key={idx} className="hover:bg-ink-elevated/40">
                              <td className="p-2.5 font-mono font-semibold text-ink-text">{op.name}</td>
                              <td className="p-2.5 font-mono text-amber-accent">{op.time}</td>
                              <td className="p-2.5 text-ink-muted">{op.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Complexities */}
                {ans?.complexities && (
                  <div className="space-y-2 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Time Complexities
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {Object.entries(ans.complexities).map(([op, comp]) => (
                        <div key={op} className="p-2.5 rounded-lg bg-ink-elevated border border-ink-border/70">
                          <div className="text-[10px] uppercase font-semibold text-ink-subtle">{op}</div>
                          <div className="font-mono text-amber-accent font-medium mt-0.5 text-xs">{comp}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tree Terminology */}
                {ans?.terms && (
                  <div className="space-y-2 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Key Terminology
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                      {ans.terms.map((t, idx) => (
                        <div key={idx} className="leading-relaxed">
                          <strong className="text-ink-text">{t.term}: </strong>
                          <span className="text-ink-muted">{t.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Traversal Methods */}
                {ans?.methods && (
                  <div className="space-y-2 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Traversal Methods
                    </span>
                    <div className="space-y-2 text-xs">
                      {ans.methods.map((m, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <strong className="text-ink-text block">{m.name}</strong>
                          <p className="text-ink-muted leading-relaxed">{m.order}</p>
                          {m.note && (
                            <p className="text-amber-accent/90 font-medium text-[11px]">
                              💡 {m.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comparison Table */}
                {ans?.comparison && (
                  <div className="space-y-2 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Detailed Comparison
                    </span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-ink-border rounded-lg overflow-hidden">
                        <thead className="bg-ink-elevated text-ink-subtle uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="p-2.5 border-b border-ink-border font-semibold">Aspect</th>
                            <th className="p-2.5 border-b border-ink-border font-semibold">
                              {ans.comparison[0].full !== undefined ? 'Full Binary Tree' : 'Directed Graph'}
                            </th>
                            <th className="p-2.5 border-b border-ink-border font-semibold">
                              {ans.comparison[0].complete !== undefined ? 'Complete Binary Tree' : 'Undirected Graph'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-ink-border">
                          {ans.comparison.map((row, idx) => (
                            <tr key={idx} className="hover:bg-ink-elevated/40">
                              <td className="p-2.5 font-semibold text-ink-text whitespace-nowrap">{row.aspect || row.feature}</td>
                              <td className="p-2.5 text-ink-muted">{row.full || row.directed}</td>
                              <td className="p-2.5 text-ink-muted">{row.complete || row.undirected}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Representations */}
                {ans?.representations && (
                  <div className="space-y-2 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Representations
                    </span>
                    <div className="space-y-2 text-xs">
                      {ans.representations.map((rep, idx) => (
                        <div key={idx} className="leading-relaxed">
                          <strong className="text-ink-text">{rep.name}: </strong>
                          <span className="text-ink-muted">{rep.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Applications */}
                {ans?.applications && (
                  <div className="space-y-1.5 pt-2 border-t border-ink-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle block">
                      Real-World Applications
                    </span>
                    <ul className="space-y-1 text-xs">
                      {ans.applications.map((app, idx) => {
                        if (typeof app === 'string') {
                          return (
                            <li key={idx} className="flex items-start gap-2 text-ink-muted">
                              <span className="text-amber-accent font-bold">•</span>
                              <span>{app}</span>
                            </li>
                          );
                        }
                        return (
                          <li key={idx} className="flex items-start gap-2 text-ink-muted">
                            <span className="text-amber-accent font-bold">•</span>
                            <span><strong className="text-ink-text">{app.domain}:</strong> {app.detail}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
