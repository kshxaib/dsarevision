import { useState, useEffect, useCallback } from 'react';
import {
  Hash, GitBranch, Layers, BookOpen, Search, Binary,
  Link2, TreePine, Type, ArrowUpCircle, Undo2, Network,
  Map, TrendingUp, Grid3x3, Scissors, Calendar, Calculator, Zap,
  PanelLeftClose, PanelLeft, X
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  isOpen,
  onToggle,
  collapsed,
  onToggleCollapse,
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
    if (isMobile) onToggle();
  }, [onSelectPattern, isMobile, onToggle]);

  return (
    <>
      {/* Mobile overlay with smooth opacity fade */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
          isOpen && isMobile ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      {/* Sidebar with smooth width & transform transitions */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#0F0F11] border-r border-ink-border z-50 flex flex-col overflow-hidden will-change-[width,transform] transition-[width,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
          collapsed ? 'w-16' : 'w-64'
        } ${
          isMobile ? (isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full') : 'translate-x-0'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center h-14 border-b border-ink-border shrink-0 transition-all duration-300 ${
          collapsed ? 'justify-center px-2' : 'justify-between px-3.5'
        }`}>
          {collapsed ? (
            <button
              onClick={onToggleCollapse}
              title="Expand sidebar"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-subtle hover:text-ink-text hover:bg-ink-surface transition-colors cursor-pointer"
              aria-label="Expand sidebar"
            >
              <PanelLeft className="w-4 h-4 text-amber-accent" />
            </button>
          ) : (
            <>
              <button
                onClick={() => handleSelect(patterns[0]?.id)}
                className="font-heading text-sm font-semibold text-ink-text tracking-tight hover:text-amber-accent transition-colors cursor-pointer whitespace-nowrap"
              >
                DSA Revision
              </button>

              {isMobile ? (
                <button
                  onClick={onToggle}
                  className="text-ink-subtle hover:text-ink-text transition-colors p-1.5 rounded-md hover:bg-ink-surface"
                  aria-label="Close sidebar"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onToggleCollapse}
                  className="text-ink-subtle hover:text-ink-text transition-colors p-1.5 rounded-md hover:bg-ink-surface cursor-pointer shrink-0"
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Search trigger */}
        <div className="px-2.5 pt-3 pb-1 shrink-0 overflow-hidden">
          {collapsed ? (
            <button
              onClick={onOpenCommand}
              title="Search problems (⌘K)"
              className="w-full h-9 flex items-center justify-center rounded-lg text-ink-subtle hover:text-ink-muted hover:bg-ink-surface border border-transparent hover:border-ink-border transition-colors cursor-pointer"
              aria-label="Search problems"
            >
              <Search className="w-4 h-4 shrink-0" />
            </button>
          ) : (
            <button
              onClick={onOpenCommand}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-ink-subtle bg-ink-surface border border-ink-border rounded-lg hover:border-ink-faint hover:text-ink-muted transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="flex-1 text-left truncate">Search problems...</span>
              <kbd className="text-[10px] text-ink-faint font-mono bg-ink-elevated px-1.5 py-0.5 rounded border border-ink-border shrink-0">⌘K</kbd>
            </button>
          )}
        </div>

        {/* Section label */}
        <div className="px-3.5 pt-3 pb-1 shrink-0 overflow-hidden">
          <span
            className={`text-[10px] font-semibold uppercase tracking-widest text-ink-faint block whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              collapsed ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'
            }`}
          >
            Patterns
          </span>
        </div>

        {/* Patterns list */}
        <ScrollArea className="flex-1 px-1.5">
          <nav className="py-1 space-y-0.5">
            {patterns.map((pattern) => {
              const isActive = activePattern === pattern.id;
              const Icon = patternIcons[pattern.id] || Hash;

              return (
                <button
                  key={pattern.id}
                  onClick={() => handleSelect(pattern.id)}
                  title={collapsed ? `${pattern.name} (${pattern.problems.length})` : undefined}
                  className={`w-full h-9 flex items-center rounded-lg transition-colors relative group cursor-pointer overflow-hidden ${
                    isActive
                      ? 'bg-amber-accent-muted text-ink-text font-medium'
                      : 'text-ink-muted hover:text-ink-text hover:bg-ink-surface'
                  } ${collapsed ? 'justify-center px-0' : 'px-2.5'}`}
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
                  <span
                    className={`flex-1 text-[13px] text-left truncate ml-2.5 whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                      collapsed
                        ? 'opacity-0 -translate-x-3 pointer-events-none w-0 ml-0'
                        : 'opacity-100 translate-x-0'
                    }`}
                  >
                    {pattern.name}
                  </span>

                  {/* Dots and count */}
                  <span
                    className={`flex items-center gap-2 shrink-0 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                      collapsed
                        ? 'opacity-0 scale-75 pointer-events-none w-0 overflow-hidden'
                        : 'opacity-100 scale-100'
                    }`}
                  >
                    <DifficultyDots problems={pattern.problems} />
                    <span className="text-[11px] text-ink-subtle font-mono tabular-nums w-4 text-right">
                      {pattern.problems.length}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-ink-border h-12 flex items-center px-3.5 shrink-0 overflow-hidden">
          <p
            className={`text-[11px] text-ink-faint whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              collapsed
                ? 'opacity-0 -translate-x-3 pointer-events-none w-0'
                : 'opacity-100 translate-x-0 w-full'
            }`}
          >
            {totalProblems} problems across {patterns.length} patterns
          </p>
          {collapsed && (
            <p className="text-[11px] text-ink-faint font-mono text-center w-full animate-fadeIn">
              {totalProblems}
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
