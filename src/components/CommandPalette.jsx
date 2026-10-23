import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  History,
  CircleHelp,
  CornerDownLeft,
  GitBranch,
  BookOpen,
  Code2,
  Database,
  Network,
  Cpu,
  Server,
  Globe,
  Terminal,
  Coffee,
  Table2,
  Layers3,
  Settings,
  X,
} from 'lucide-react';
import { vaultSubjects } from '../data/vault';
import { theoryQuestions } from '../data/theoryQuestions';

const MODULE_ICONS = {
  'dsa-patterns': GitBranch,
  'dsa-theory': BookOpen,
  cn: Network,
  os: Cpu,
  dbms: Database,
  sql: Table2,
  oops: Layers3,
  js: Code2,
  react: Code2,
  node: Server,
  fastapi: Terminal,
  java: Coffee,
  htmlcss: Globe,
};

const DEFAULT_RECENT_SEARCHES = [
  'TCP three-way handshake',
  'Sliding Window',
  'What is the difference between ACID and BASE?',
  'Process vs Thread',
];

export default function CommandPalette({
  open,
  onOpenChange,
  patterns = [],
  onSelectProblem,
  onSelectTheory,
  onSelectVaultHub,
  onSelectVaultSubject,
  revisedProblems = new Set(),
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('vault_recent_searches');
      return saved ? JSON.parse(saved) : DEFAULT_RECENT_SEARCHES;
    } catch {
      return DEFAULT_RECENT_SEARCHES;
    }
  });

  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Save recent search term
  const recordRecentSearch = (term) => {
    if (!term || typeof term !== 'string') return;
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('vault_recent_searches', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const removeRecentSearch = (e, termToRemove) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((s) => s !== termToRemove);
      try {
        localStorage.setItem('vault_recent_searches', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  // Focus and reset state when opened
  useEffect(() => {
    if (open) {
      setQuery('');
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

  // All Available Modules
  const allModules = useMemo(() => {
    const list = [
      {
        id: 'dsa-patterns',
        type: 'module',
        moduleType: 'dsa',
        title: 'DSA Patterns',
        subtitle: `${patterns.length} patterns`,
        icon: GitBranch,
      },
      {
        id: 'dsa-theory',
        type: 'module',
        moduleType: 'theory',
        title: 'DSA Theory',
        subtitle: `${theoryQuestions.length} questions`,
        icon: BookOpen,
      },
    ];

    vaultSubjects.forEach((sub) => {
      list.push({
        id: sub.id,
        type: 'module',
        moduleType: 'vault',
        title: sub.title,
        subtitle: `${sub.questions.length} questions`,
        icon: MODULE_ICONS[sub.id] || Code2,
      });
    });

    return list;
  }, [patterns]);

  // All Questions (Vault + Theory + DSA Problems)
  const allQuestions = useMemo(() => {
    const list = [];

    // 1. Vault questions
    vaultSubjects.forEach((sub) => {
      sub.questions.forEach((q) => {
        list.push({
          id: `vault-q-${q.id}`,
          type: 'question',
          targetType: 'vault-subject',
          subjectId: sub.id,
          questionId: q.id,
          title: q.question,
          subtitle: `${sub.category} / ${sub.title}${q.topic ? ' / ' + q.topic : ''}`,
          keywords: `${q.question} ${q.topic || ''} ${sub.title} ${sub.category} ${(q.tags || []).join(' ')}`,
        });
      });
    });

    // 2. Theory questions
    theoryQuestions.forEach((q) => {
      list.push({
        id: `theory-q-${q.id}`,
        type: 'question',
        targetType: 'theory',
        questionId: q.id,
        title: q.question,
        subtitle: `DSA Theory / ${q.category}`,
        keywords: `${q.question} ${q.category} dsa theory`,
      });
    });

    // 3. DSA Problems
    patterns.forEach((pat, patIdx) => {
      const pNum = String(patIdx + 1).padStart(2, '0');
      pat.problems.forEach((prob) => {
        list.push({
          id: `dsa-prob-${prob.id}`,
          type: 'question',
          targetType: 'dsa',
          patternId: pat.id,
          problem: prob,
          title: prob.title,
          subtitle: `DSA Patterns / ${pNum}. ${pat.name}`,
          keywords: `${prob.title} ${pat.name} ${prob.difficulty} dsa pattern problem`,
        });
      });
    });

    return list;
  }, [patterns]);

  // Filtered Results Based on Search Query
  const { filteredRecent, filteredQuestions, filteredModules } = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      // Empty query state: Recent searches, curated popular questions, and primary modules
      const recents = recentSearches.map((text, idx) => ({
        id: `recent-${idx}`,
        type: 'recent',
        text,
      }));

      // Curated sample questions matching Screen7 preview
      const defaultSampleTitles = [
        'Explain the TCP three-way handshake',
        'What is the difference between ACID and BASE?',
        'Two Sum',
        'Process vs Thread',
      ];
      const sampleQuestions = defaultSampleTitles
        .map((title) => allQuestions.find((item) => item.title.toLowerCase().includes(title.toLowerCase())))
        .filter(Boolean);

      // Default sample modules from Screen7
      const sampleModules = allModules.filter((m) =>
        ['dsa-patterns', 'dsa-theory', 'cn', 'os', 'dbms'].includes(m.id)
      );

      return {
        filteredRecent: recents,
        filteredQuestions: sampleQuestions.length > 0 ? sampleQuestions : allQuestions.slice(0, 4),
        filteredModules: sampleModules.length > 0 ? sampleModules : allModules.slice(0, 4),
      };
    }

    // Matching Questions
    const matchedQuestions = allQuestions
      .filter((item) => item.keywords.toLowerCase().includes(q))
      .slice(0, 8);

    // Matching Modules
    const matchedModules = allModules
      .filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.subtitle.toLowerCase().includes(q) ||
          m.id.toLowerCase().includes(q)
      )
      .slice(0, 6);

    return {
      filteredRecent: [],
      filteredQuestions: matchedQuestions,
      filteredModules: matchedModules,
    };
  }, [query, recentSearches, allQuestions, allModules]);

  // Combined flat list for unified keyboard navigation
  const flatItems = useMemo(() => {
    const list = [];
    filteredRecent.forEach((item) => list.push(item));
    filteredQuestions.forEach((item) => list.push(item));
    filteredModules.forEach((item) => list.push(item));
    return list;
  }, [filteredRecent, filteredQuestions, filteredModules]);

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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

  const handleSelectItem = (item) => {
    if (!item) return;

    if (item.type === 'recent') {
      setQuery(item.text);
      return;
    }

    if (item.type === 'question') {
      recordRecentSearch(item.title);
      if (item.targetType === 'dsa') {
        onSelectProblem(item.patternId, item.problem);
      } else if (item.targetType === 'theory') {
        onSelectTheory();
      } else if (item.targetType === 'vault-subject') {
        onSelectVaultSubject(item.subjectId);
      }
      onOpenChange(false);
      return;
    }

    if (item.type === 'module') {
      recordRecentSearch(item.title);
      if (item.moduleType === 'dsa') {
        window.location.hash = '#dsa-patterns';
      } else if (item.moduleType === 'theory') {
        onSelectTheory();
      } else if (item.moduleType === 'vault') {
        onSelectVaultSubject(item.id);
      }
      onOpenChange(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onOpenChange(false);
      return;
    }

    if (flatItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatItems[selectedIndex]) {
        handleSelectItem(flatItems[selectedIndex]);
      }
    }
  };

  const hasResults = flatItems.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* Dimmed backdrop overlay matching Screen7 */}
      <div
        className="bg-foreground/50 fixed inset-0 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />

      {/* Spotlight Command Modal (exact Screen7 layout and styling) */}
      <div
        className="shadow-2xl rounded-xl bg-card text-card-foreground border border-border fixed z-50 inset-x-0 top-20 md:top-28 mx-auto w-[92vw] sm:w-[640px] max-w-[640px] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="border-t-border border-r-border border-b border-b-border border-l-border flex px-5 py-4 items-center gap-3 bg-card">
          <Search className="text-muted-foreground size-5 shrink-0" />
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, modules, and topics…"
            className="bg-transparent text-sm outline-none flex-1 min-w-0 placeholder:text-muted-foreground text-foreground border-none ring-0 focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
              title="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
          <kbd
            onClick={() => onOpenChange(false)}
            className="font-mono rounded-md bg-muted text-muted-foreground text-xs border border-border px-2 py-1 cursor-pointer select-none"
          >
            Esc
          </kbd>
        </div>

        {/* Scrollable Results Container */}
        <div ref={listRef} className="px-3 py-4 max-h-[60vh] overflow-y-auto">
          {/* 1. RECENT SEARCHES */}
          {filteredRecent.length > 0 && (
            <div>
              <div className="font-semibold text-muted-foreground text-xs tracking-wider px-2">
                RECENT SEARCHES
              </div>
              <div className="flex mt-2 flex-col gap-1">
                {filteredRecent.map((item) => {
                  const globalIdx = flatItems.indexOf(item);
                  const isSelected = globalIdx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      data-selected={isSelected ? 'true' : 'false'}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      className={`rounded-md text-sm flex p-2 items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground hover:bg-accent/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <History className="text-muted-foreground size-4 shrink-0" />
                        <span className="truncate">{item.text}</span>
                      </div>
                      <button
                        onClick={(e) => removeRecentSearch(e, item.text)}
                        className="text-muted-foreground hover:text-foreground p-1 text-xs opacity-60 hover:opacity-100"
                        title="Remove from history"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. QUESTIONS */}
          {filteredQuestions.length > 0 && (
            <div className={filteredRecent.length > 0 ? 'mt-6' : ''}>
              <div className="font-semibold text-muted-foreground text-xs tracking-wider px-2">
                QUESTIONS
              </div>
              <div className="flex mt-2 flex-col gap-1">
                {filteredQuestions.map((item) => {
                  const globalIdx = flatItems.indexOf(item);
                  const isSelected = globalIdx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      data-selected={isSelected ? 'true' : 'false'}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      className={`rounded-md flex px-2 py-3 items-center gap-3 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-accent text-accent-foreground'
                          : 'hover:bg-accent/60 text-foreground'
                      }`}
                    >
                      <CircleHelp
                        className={`shrink-0 size-4 ${
                          isSelected ? 'text-accent-foreground' : 'text-muted-foreground'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-ellipsis whitespace-nowrap text-sm overflow-hidden">
                          {item.title}
                        </div>
                        <div className="text-muted-foreground text-xs mt-1 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                      <CornerDownLeft
                        className={`shrink-0 size-4 ${
                          isSelected ? 'text-accent-foreground' : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. MODULES */}
          {filteredModules.length > 0 && (
            <div className={filteredRecent.length > 0 || filteredQuestions.length > 0 ? 'mt-6' : ''}>
              <div className="font-semibold text-muted-foreground text-xs tracking-wider px-2">
                MODULES
              </div>
              <div className="flex mt-2 flex-col gap-1">
                {filteredModules.map((item) => {
                  const globalIdx = flatItems.indexOf(item);
                  const isSelected = globalIdx === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      data-selected={isSelected ? 'true' : 'false'}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      className={`rounded-md flex px-2 py-3 items-center gap-3 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-accent text-accent-foreground'
                          : 'hover:bg-accent/60 text-foreground'
                      }`}
                    >
                      <Icon
                        className={`shrink-0 size-4 ${
                          isSelected ? 'text-accent-foreground' : 'text-muted-foreground'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{item.title}</div>
                        <div className="text-muted-foreground text-xs mt-1 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                      <CornerDownLeft
                        className={`shrink-0 size-4 ${
                          isSelected ? 'text-accent-foreground' : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Empty State: No resources found */}
          {!hasResults && (
            <div className="text-center rounded-lg bg-muted/50 border border-border mt-4 px-4 py-6">
              <div className="font-medium text-sm">No resources found</div>
              <div className="text-muted-foreground text-xs mt-1">
                Try a broader search or check your spelling
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="text-muted-foreground text-xs border-x-border border-t border-t-border border-b-border flex px-5 py-3 items-center justify-between bg-card/50">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1">
              <kbd className="font-mono bg-muted text-muted-foreground px-1.5 py-0.5 rounded border border-border text-[11px]">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="font-mono bg-muted text-muted-foreground px-1.5 py-0.5 rounded border border-border text-[11px]">
                Enter
              </kbd>
              Open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="font-mono bg-muted text-muted-foreground px-1.5 py-0.5 rounded border border-border text-[11px]">
                ⌘K
              </kbd>
              Close
            </span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground/70 hidden sm:inline">
            Resource Vault
          </span>
        </div>
      </div>
    </div>
  );
}
