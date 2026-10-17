import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, CornerDownLeft, ArrowUpDown, BookOpen, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const diffBadgeClass = {
  Easy: 'text-easy border-easy/30 bg-easy/10',
  Medium: 'text-medium border-medium/30 bg-medium/10',
  Hard: 'text-hard border-hard/30 bg-hard/10',
};

export default function CommandPalette({
  open,
  onOpenChange,
  patterns,
  onSelectProblem,
  revisedProblems = new Set(),
}) {
  const [query, setQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  // Reset state and focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedDifficulty('ALL');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Flatten all problems with pattern context
  const allProblems = useMemo(() => {
    const list = [];
    for (const pat of patterns) {
      for (const prob of pat.problems) {
        list.push({
          patternId: pat.id,
          patternName: pat.name,
          patternIcon: pat.icon,
          problem: prob,
        });
      }
    }
    return list;
  }, [patterns]);

  // Filter problems based on query and difficulty
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProblems.filter((item) => {
      // Difficulty filter
      if (selectedDifficulty !== 'ALL' && item.problem.difficulty.toUpperCase() !== selectedDifficulty) {
        return false;
      }
      if (!q) return true;

      const titleMatch = item.problem.title.toLowerCase().includes(q);
      const patternMatch = item.patternName.toLowerCase().includes(q);
      const defMatch = item.problem.definition?.toLowerCase().includes(q);
      const diffMatch = item.problem.difficulty.toLowerCase().startsWith(q);

      return titleMatch || patternMatch || defMatch || diffMatch;
    });
  }, [allProblems, query, selectedDifficulty]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedDifficulty]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!open) return null;

  const handleSelect = (item) => {
    onSelectProblem(item.patternId, item.problem);
    onOpenChange(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onOpenChange(false);
      return;
    }

    if (filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4 animate-in fade-in duration-150"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-xl bg-[#121215] border border-ink-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-ink-border bg-ink-surface/50">
          <Search className="w-4 h-4 text-amber-accent shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, patterns, difficulty..."
            className="flex-1 bg-transparent text-sm text-ink-text placeholder:text-ink-subtle outline-none border-none font-sans focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 ring-offset-0 shadow-none"
            style={{ outline: 'none', boxShadow: 'none' }}
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-ink-subtle hover:text-ink-text hover:bg-ink-surface transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => onOpenChange(false)}
            className="text-[11px] font-mono text-ink-faint hover:text-ink-subtle bg-ink-elevated px-2 py-0.5 rounded border border-ink-border transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-ink-border/50 bg-[#0F0F12] text-xs">
          <span className="text-[11px] text-ink-faint mr-1 font-mono">Difficulty:</span>
          {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((diff) => {
            const isActive = selectedDifficulty === diff;
            return (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-accent/15 text-amber-accent font-semibold border border-amber-accent/30'
                    : 'text-ink-subtle hover:text-ink-text hover:bg-ink-surface border border-transparent'
                }`}
              >
                {diff === 'ALL' ? 'All' : diff.charAt(0) + diff.slice(1).toLowerCase()}
              </button>
            );
          })}
          <div className="ml-auto text-[11px] font-mono text-ink-faint">
            {filtered.length} {filtered.length === 1 ? 'problem' : 'problems'}
          </div>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[50vh]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-ink-subtle text-sm flex flex-col items-center gap-2">
              <BookOpen className="w-8 h-8 text-ink-faint" />
              <p>No problems found for &quot;<span className="text-ink-text">{query}</span>&quot;</p>
              <p className="text-xs text-ink-faint">Try searching by topic, name, or change difficulty filter.</p>
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={`${item.patternId}-${item.problem.id}`}
                  data-selected={isSelected ? 'true' : 'false'}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-ink-elevated border border-ink-border text-ink-text shadow-sm'
                      : 'text-ink-muted hover:text-ink-text hover:bg-ink-surface border border-transparent'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium truncate ${isSelected ? 'text-amber-accent' : 'text-ink-text'}`}>
                        {item.problem.title}
                      </span>
                      {revisedProblems.has(item.problem.id) && (
                        <Check className="w-3.5 h-3.5 text-[#2cbb5d] stroke-[2.8] shrink-0" title="Revised" />
                      )}
                    </div>
                    <span className="text-[11px] text-ink-subtle font-mono truncate block mt-0.5">
                      {item.patternName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-1.5 py-0.5 border font-medium ${diffBadgeClass[item.problem.difficulty]}`}
                    >
                      {item.problem.difficulty}
                    </Badge>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-amber-accent shrink-0 ml-1" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer / Shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-ink-border bg-ink-surface/30 text-[11px] text-ink-faint font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" /> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-ink-elevated rounded border border-ink-border text-[10px]">↵</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-ink-elevated rounded border border-ink-border text-[10px]">esc</kbd> Close
            </span>
          </div>
          <span className="text-amber-accent/70">DSA Revision</span>
        </div>
      </div>
    </div>
  );
}
