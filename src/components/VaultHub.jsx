import { useState, useMemo } from 'react';
import { Search, Sparkles, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { vaultSubjects, vaultCategories } from '../data/vault';
import VaultIcon from './VaultIcons';

export default function VaultHub({ onSelectSubject, revisedQuestionIds = new Set() }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate global stats
  const stats = useMemo(() => {
    let totalQuestions = 0;
    let revisedCount = 0;

    vaultSubjects.forEach((sub) => {
      sub.questions.forEach((q) => {
        totalQuestions++;
        if (revisedQuestionIds.has(q.id)) {
          revisedCount++;
        }
      });
    });

    return {
      totalSubjects: vaultSubjects.length,
      totalQuestions,
      revisedCount,
      percentage: totalQuestions > 0 ? Math.round((revisedCount / totalQuestions) * 100) : 0,
    };
  }, [revisedQuestionIds]);

  // Filter subjects by category & search query
  const filteredSubjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return vaultSubjects.filter((sub) => {
      // Category filter
      if (selectedCategory !== 'All' && sub.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      // Search match
      const titleMatch = sub.title.toLowerCase().includes(q) || sub.shortTitle.toLowerCase().includes(q);
      const descMatch = sub.description.toLowerCase().includes(q);
      const tagsMatch = sub.tags.some((tag) => tag.toLowerCase().includes(q));
      const questionsMatch = sub.questions.some((item) =>
        item.question.toLowerCase().includes(q) || item.topic?.toLowerCase().includes(q)
      );

      return titleMatch || descMatch || tagsMatch || questionsMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="animate-fadeIn max-w-[880px] mx-auto py-2 space-y-7">
      {/* Hero Header */}
      <div className="border-b border-ink-border pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-accent-muted border border-amber-accent/20 text-amber-accent text-xs font-mono mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Subject Revision Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-ink-text tracking-tight">
              Resource Revision Vault
            </h1>
            <p className="text-sm text-ink-muted mt-1 leading-relaxed">
              Curated high-yield interview questions, architectural concepts, and deep-dive notes for Computer Networks, Operating Systems, DBMS, SQL, and OOP & SOLID principles.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-3 bg-ink-surface border border-ink-border rounded-xl p-3 shrink-0">
            <div className="text-center px-2">
              <span className="block font-mono text-base font-bold text-amber-accent">
                {stats.totalSubjects}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-ink-subtle">
                Subjects
              </span>
            </div>
            <div className="w-px h-8 bg-ink-border" />
            <div className="text-center px-2">
              <span className="block font-mono text-base font-bold text-ink-text">
                {stats.totalQuestions}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-ink-subtle">
                Questions
              </span>
            </div>
            <div className="w-px h-8 bg-ink-border" />
            <div className="text-center px-2">
              <span className="block font-mono text-base font-bold text-easy">
                {stats.revisedCount}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-ink-subtle">
                Revised
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-3 pt-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-ink-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, topic (e.g. ACID, Event Loop, Virtual DOM, TCP, JVM)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-ink-surface border border-ink-border rounded-xl text-ink-text placeholder:text-ink-subtle focus:outline-none focus:border-amber-accent/50 focus:ring-1 focus:ring-amber-accent/50 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-ink-subtle hover:text-ink-text px-1.5 py-0.5 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {vaultCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg transition-all font-mono cursor-pointer ${
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
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSubjects.map((sub) => {
          const subRevised = sub.questions.filter((q) => revisedQuestionIds.has(q.id)).length;
          const subTotal = sub.questions.length;
          const isComplete = subTotal > 0 && subRevised === subTotal;

          return (
            <div
              key={sub.id}
              onClick={() => onSelectSubject(sub.id)}
              className="group bg-ink-surface border border-ink-border hover:border-ink-faint rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg cursor-pointer relative overflow-hidden"
            >
              {/* Top Row: Icon + Category Badge + Question Count */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${sub.accentColor}18`,
                      color: sub.accentColor,
                    }}
                  >
                    <VaultIcon name={sub.icon} className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-ink-elevated border border-ink-border text-ink-muted">
                      {sub.category}
                    </span>
                    <span className="text-xs font-mono text-ink-subtle">
                      {subTotal} Qs
                    </span>
                  </div>
                </div>

                {/* Title & Short Description */}
                <h2 className="text-base font-heading font-bold text-ink-text group-hover:text-amber-accent transition-colors">
                  {sub.title}
                </h2>
                <p className="text-xs text-ink-muted mt-1.5 line-clamp-2 leading-relaxed">
                  {sub.description}
                </p>

                {/* Key Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mt-3.5">
                  {sub.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-ink-elevated/80 text-ink-subtle border border-ink-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                  {sub.tags.length > 4 && (
                    <span className="text-[10px] font-mono text-ink-faint">
                      +{sub.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Row: Revision Progress & Action */}
              <div className="mt-5 pt-3.5 border-t border-ink-border/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-mono text-ink-subtle">
                  {isComplete ? (
                    <span className="inline-flex items-center gap-1 text-easy font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      All revised
                    </span>
                  ) : (
                    <span>
                      <strong className="text-ink-text">{subRevised}</strong>/{subTotal} revised
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 font-mono text-amber-accent group-hover:translate-x-0.5 transition-transform">
                  <span>Revise</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12 border border-dashed border-ink-border rounded-xl">
          <BookOpen className="w-8 h-8 text-ink-subtle mx-auto mb-2 opacity-50" />
          <p className="text-sm text-ink-muted font-medium">No subjects found matching your query.</p>
          <p className="text-xs text-ink-subtle mt-1">Try clearing filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
