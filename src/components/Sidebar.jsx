import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, BookOpen } from 'lucide-react';

function DifficultyDots({ problems }) {
  const easy = problems.filter(p => p.difficulty === 'Easy').length;
  const med = problems.filter(p => p.difficulty === 'Medium').length;
  const hard = problems.filter(p => p.difficulty === 'Hard').length;
  return (
    <div className="flex items-center gap-1 shrink-0">
      {easy > 0 && <span className="w-1.5 h-1.5 rounded-full bg-easy" />}
      {med > 0 && <span className="w-1.5 h-1.5 rounded-full bg-medium" />}
      {hard > 0 && <span className="w-1.5 h-1.5 rounded-full bg-hard" />}
    </div>
  );
}

export default function AppSidebar({
  patterns,
  activePattern,
  onSelectPattern,
  isTheoryActive = false,
  onSelectTheory,
  onOpenCommand,
  isOpen = false,
  onClose,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auto-scroll active pattern into view in sidebar
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activePattern]);

  const totalProblems = patterns.reduce((s, p) => s + p.problems.length, 0);

  const handleSelect = useCallback((id) => {
    onSelectPattern(id);
    if (isMobile && onClose) onClose();
  }, [onSelectPattern, isMobile, onClose]);

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Fixed Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0F0F11] border-r border-ink-border z-50 flex flex-col overflow-hidden transition-transform duration-200 ${isMobile ? (isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full') : 'translate-x-0'
          }`}
      >
        {/* Search Bar at the Very Top */}
        <div className="p-3 border-b border-ink-border shrink-0">
          <button
            onClick={onOpenCommand}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-ink-subtle bg-ink-surface border border-ink-border rounded-lg hover:border-ink-faint hover:text-ink-muted transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="flex-1 text-left truncate">Search problems...</span>
            <kbd className="text-[10px] text-ink-faint font-mono bg-ink-elevated px-1.5 py-0.5 rounded border border-ink-border shrink-0">⌘K</kbd>
          </button>
        </div>

        {/* Theory Questions Link */}
        <div className="px-2 pt-2.5 pb-1 shrink-0">
          <button
            onClick={() => {
              if (onSelectTheory) onSelectTheory();
              if (isMobile && onClose) onClose();
            }}
            className={`w-full h-9 flex items-center rounded-lg px-2.5 transition-colors cursor-pointer group ${
              isTheoryActive
                ? 'bg-amber-accent-muted text-ink-text font-medium border border-amber-accent/20'
                : 'text-ink-muted hover:text-ink-text hover:bg-ink-surface'
            }`}
          >
            <BookOpen className={`w-4 h-4 shrink-0 mr-2.5 transition-colors ${isTheoryActive ? 'text-amber-accent' : 'text-ink-muted group-hover:text-ink-text'}`} />
            <span className="flex-1 text-[13px] text-left truncate">Theory Questions</span>
            <span className={`text-[11px] font-mono tabular-nums ${isTheoryActive ? 'text-amber-accent' : 'text-ink-subtle'}`}>
              20
            </span>
          </button>
        </div>

        {/* Section Label */}
        <div className="px-3.5 pt-3 pb-1.5 shrink-0 flex items-center justify-between border-t border-ink-border/50 mt-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint block">
            Patterns
          </span>
          <span className="text-[10px] font-mono text-ink-subtle">
            {patterns.length}
          </span>
        </div>

        {/* Patterns List with Dedicated Scrollbar */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-2 py-1 sidebar-scroll">
          <nav className="space-y-0.5">
            {patterns.map((pattern, index) => {
              const isActive = activePattern === pattern.id;

              return (
                <button
                  key={pattern.id}
                  data-active={isActive ? 'true' : 'false'}
                  onClick={() => handleSelect(pattern.id)}
                  className={`w-full h-9 flex items-center rounded-lg px-2.5 transition-colors relative group cursor-pointer ${isActive
                      ? 'bg-amber-accent-muted text-ink-text font-medium'
                      : 'text-ink-muted hover:text-ink-text hover:bg-ink-surface'
                    }`}
                >
                  {/* Aesthetic Number */}
                  <span
                    className={`font-mono text-xs font-semibold w-5 text-center shrink-0 transition-colors ${
                      isActive
                        ? 'text-amber-accent'
                        : 'text-ink-muted group-hover:text-ink-text'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Pattern Name */}
                  <span className="flex-1 text-[13px] text-left truncate ml-2.5">
                    {pattern.name}
                  </span>

                  {/* Dots and count */}
                  <span className="flex items-center gap-2 shrink-0">
                    <DifficultyDots problems={pattern.problems} />
                    <span className="text-[11px] text-ink-subtle font-mono tabular-nums w-4 text-right">
                      {pattern.problems.length}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-ink-border h-11 flex items-center px-3.5 shrink-0 text-[11px] text-ink-faint">
          {totalProblems} problems across {patterns.length} patterns
        </div>
      </aside>
    </>
  );
}
