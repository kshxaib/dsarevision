import { useState, useEffect } from 'react';
import { patterns } from './data/problems';
import Sidebar from './components/Sidebar';
import ProblemList from './components/ProblemList';
import ProblemDetail from './components/ProblemDetail';
import TheoryQuestions from './components/TheoryQuestions';
import CommandPalette from './components/CommandPalette';
import { Menu } from 'lucide-react';

function resolveInitialState() {
  const hash = window.location.hash.replace('#', '').trim();

  if (hash === 'theory' || hash === 'theory-questions') {
    return { isTheory: true, patternId: patterns[0]?.id || '', problem: null };
  }

  if (hash) {
    // 1. Check if hash matches a pattern (e.g. #binary-search, #arrays-hashing)
    const foundPat = patterns.find(p => p.id === hash);
    if (foundPat) {
      return { isTheory: false, patternId: foundPat.id, problem: null };
    }

    // 2. Check if hash matches a problem
    for (const pat of patterns) {
      const found = pat.problems.find(p => p.id === hash);
      if (found) {
        return { isTheory: false, patternId: pat.id, problem: found };
      }
    }
  }

  // 3. Fallback to localStorage
  try {
    const savedPatternId = localStorage.getItem('dsa_active_pattern');
    const savedProblemId = localStorage.getItem('dsa_active_problem');

    const pat = patterns.find(p => p.id === savedPatternId) || patterns[0];
    let prob = null;
    if (savedProblemId && savedProblemId !== savedPatternId && pat) {
      prob = pat.problems.find(p => p.id === savedProblemId) || null;
    }
    return {
      isTheory: false,
      patternId: pat?.id || patterns[0]?.id || '',
      problem: prob,
    };
  } catch {
    return {
      isTheory: false,
      patternId: patterns[0]?.id || '',
      problem: null,
    };
  }
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTheoryView, setIsTheoryView] = useState(() => resolveInitialState().isTheory);
  const [activePatternId, setActivePatternId] = useState(() => resolveInitialState().patternId);
  const [activeProblem, setActiveProblem] = useState(() => resolveInitialState().problem);
  const [commandOpen, setCommandOpen] = useState(false);

  // Load revised problems from localStorage
  const [revisedProblems, setRevisedProblems] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa_revised_problems');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist revised problems
  const handleToggleRevised = (problemId) => {
    setRevisedProblems(prev => {
      const next = new Set(prev);
      if (next.has(problemId)) {
        next.delete(problemId);
      } else {
        next.add(problemId);
      }
      try {
        localStorage.setItem('dsa_revised_problems', JSON.stringify([...next]));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return next;
    });
  };

  // Change Pattern
  const handleSelectPattern = (id) => {
    setIsTheoryView(false);
    setActivePatternId(id);
    setActiveProblem(null);
    try {
      localStorage.setItem('dsa_active_pattern', id);
      localStorage.removeItem('dsa_active_problem');
    } catch {}
    window.location.hash = '#' + id;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Select Theory View
  const handleSelectTheory = () => {
    setIsTheoryView(true);
    setActiveProblem(null);
    window.location.hash = '#theory';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Change Problem
  const handleSelectProblem = (prob) => {
    setIsTheoryView(false);
    setActiveProblem(prob);
    try {
      localStorage.setItem('dsa_active_pattern', activePatternId);
      localStorage.setItem('dsa_active_problem', prob.id);
    } catch {}
    window.location.hash = '#' + prob.id;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Back from problem to pattern list
  const handleBackToPattern = () => {
    setIsTheoryView(false);
    setActiveProblem(null);
    try {
      localStorage.removeItem('dsa_active_problem');
    } catch {}
    window.location.hash = '#' + activePatternId;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Select problem from Command Palette
  const handleSelectProblemFromSearch = (patternId, problem) => {
    setIsTheoryView(false);
    setActivePatternId(patternId);
    setActiveProblem(problem);
    try {
      localStorage.setItem('dsa_active_pattern', patternId);
      localStorage.setItem('dsa_active_problem', problem.id);
    } catch {}
    window.location.hash = '#' + problem.id;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Sync URL hash and handle browser back/forward buttons
  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '').trim();
    if (!currentHash) {
      const targetHash = isTheoryView ? 'theory' : activeProblem ? activeProblem.id : activePatternId;
      if (targetHash) {
        window.history.replaceState(null, '', '#' + targetHash);
      }
    }

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) return;

      // 0. Check if hash is theory
      if (hash === 'theory' || hash === 'theory-questions') {
        setIsTheoryView(true);
        setActiveProblem(null);
        return;
      }

      setIsTheoryView(false);

      // 1. Check if hash matches a pattern
      const foundPat = patterns.find(p => p.id === hash);
      if (foundPat) {
        setActivePatternId(foundPat.id);
        setActiveProblem(null);
        try {
          localStorage.setItem('dsa_active_pattern', foundPat.id);
          localStorage.removeItem('dsa_active_problem');
        } catch {}
        return;
      }

      // 2. Check if hash matches a problem
      for (const pat of patterns) {
        const found = pat.problems.find(p => p.id === hash);
        if (found) {
          setActivePatternId(pat.id);
          setActiveProblem(found);
          try {
            localStorage.setItem('dsa_active_pattern', pat.id);
            localStorage.setItem('dsa_active_problem', found.id);
          } catch {}
          return;
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [activePatternId, activeProblem, isTheoryView]);

  // Save scroll position for refresh restoration
  useEffect(() => {
    const handleScroll = () => {
      try {
        sessionStorage.setItem('dsa_scroll_y', window.scrollY.toString());
      } catch {}
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Restore scroll position on initial load
  useEffect(() => {
    try {
      const savedY = sessionStorage.getItem('dsa_scroll_y');
      if (savedY) {
        const y = parseInt(savedY, 10);
        if (!isNaN(y) && y > 0) {
          requestAnimationFrame(() => {
            window.scrollTo({ top: y, behavior: 'instant' });
          });
        }
      }
    } catch {}
  }, []);

  const activePattern = patterns.find(p => p.id === activePatternId) || patterns[0];

  return (
    <div className="min-h-screen bg-ink-bg text-ink-text flex">
      {/* Sidebar */}
      <Sidebar
        patterns={patterns}
        activePattern={activePatternId}
        onSelectPattern={handleSelectPattern}
        isTheoryActive={isTheoryView}
        onSelectTheory={handleSelectTheory}
        onOpenCommand={() => setCommandOpen(true)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile sidebar trigger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-ink-surface border border-ink-border text-ink-subtle hover:text-ink-text shadow-lg cursor-pointer"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-72">
        {/* Main page content - clean ~880px max-width */}
        <main className="flex-1 w-full max-w-[880px] mx-auto px-4 sm:px-6 py-8">
          {isTheoryView ? (
            <TheoryQuestions />
          ) : activeProblem ? (
            <ProblemDetail
              problem={activeProblem}
              patternName={activePattern?.name || ''}
              onBack={handleBackToPattern}
              allProblems={activePattern?.problems || []}
              onSelectProblem={handleSelectProblem}
              isRevised={revisedProblems.has(activeProblem.id)}
              onToggleRevised={() => handleToggleRevised(activeProblem.id)}
            />
          ) : (
            <ProblemList
              pattern={activePattern}
              patternIndex={patterns.findIndex(p => p.id === activePattern?.id)}
              onSelectProblem={handleSelectProblem}
              revisedProblems={revisedProblems}
              onToggleRevised={handleToggleRevised}
            />
          )}
        </main>
      </div>

      {/* ⌘K Command Dialog */}
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        patterns={patterns}
        onSelectProblem={handleSelectProblemFromSearch}
        onSelectTheory={handleSelectTheory}
        revisedProblems={revisedProblems}
      />
    </div>
  );
}
