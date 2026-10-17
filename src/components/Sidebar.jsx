import { useState, useEffect, useCallback } from 'react';
import {
  Hash, GitBranch, Layers, BookOpen, Search,
  Link2, TreePine, Type, ArrowUpCircle, Undo2, Network,
  Map, TrendingUp, Grid3x3, Scissors, Calendar, Calculator, Zap
} from 'lucide-react';

const patternIcons = {
  'arrays-hashing': Hash,
  'two-pointers': GitBranch,
  'sliding-window': Layers,
  'stack': BookOpen,
  'binary-search': Search,
  'linked-list': Link2,
  'trees': TreePine,
  'tries': Type,
  'heap-priority-queue': ArrowUpCircle,
  'backtracking': Undo2,
  'graphs': Network,
  'advanced-graphs': Map,
  '1d-dynamic-programming': TrendingUp,
  '2d-dynamic-programming': Grid3x3,
  'greedy': Scissors,
  'intervals': Calendar,
  'math-geometry': Calculator,
  'bit-manipulation': Zap,
};

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
  onOpenCommand,
  isOpen = false,
  onClose,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
        className={`fixed top-0 left-0 h-full w-64 bg-[#0F0F11] border-r border-ink-border z-50 flex flex-col overflow-hidden transition-transform duration-200 ${
          isMobile ? (isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full') : 'translate-x-0'
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

        {/* Section Label */}
        <div className="px-3.5 pt-3 pb-1.5 shrink-0 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint block">
            Patterns
          </span>
          <span className="text-[10px] font-mono text-ink-subtle">
            {patterns.length}
          </span>
        </div>

        {/* Patterns List with Dedicated Scrollbar */}
        <div className="flex-1 overflow-y-auto px-2 py-1 sidebar-scroll">
          <nav className="space-y-0.5">
            {patterns.map((pattern) => {
              const isActive = activePattern === pattern.id;
              const Icon = patternIcons[pattern.id] || Hash;

              return (
                <button
                  key={pattern.id}
                  onClick={() => handleSelect(pattern.id)}
                  className={`w-full h-9 flex items-center rounded-lg px-2.5 transition-colors relative group cursor-pointer ${
                    isActive
                      ? 'bg-amber-accent-muted text-ink-text font-medium'
                      : 'text-ink-muted hover:text-ink-text hover:bg-ink-surface'
                  }`}
                >
                  {/* Amber active indicator bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-amber-accent rounded-r" />
                  )}

                  {/* Icon */}
                  <span className="w-5 h-5 flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-accent' : 'text-ink-muted group-hover:text-ink-text'}`} />
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
