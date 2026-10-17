import { useState, useEffect } from 'react';
import { patterns } from './data/problems';
import Sidebar from './components/Sidebar';
import ProblemList from './components/ProblemList';
import ProblemDetail from './components/ProblemDetail';
import CommandPalette from './components/CommandPalette';
import { Menu } from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePatternId, setActivePatternId] = useState(patterns[0]?.id || '');
  const [activeProblem, setActiveProblem] = useState(null);
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

  // URL Hash listener on load / change
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      for (const pat of patterns) {
        const found = pat.problems.find(p => p.id === hash);
        if (found) {
          setActivePatternId(pat.id);
          setActiveProblem(found);
          break;
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const activePattern = patterns.find(p => p.id === activePatternId) || patterns[0];
  const totalProblems = patterns.reduce((s, p) => s + p.problems.length, 0);

  const handleSelectProblemFromSearch = (patternId, problem) => {
    setActivePatternId(patternId);
    setActiveProblem(problem);
  };

  return (
    <div className="min-h-screen bg-ink-bg text-ink-text flex">
      {/* Sidebar */}
      <Sidebar
        patterns={patterns}
        activePattern={activePatternId}
        onSelectPattern={(id) => {
          setActivePatternId(id);
          setActiveProblem(null);
        }}
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
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">


        {/* Main page content - clean ~880px max-width */}
        <main className="flex-1 w-full max-w-[880px] mx-auto px-4 sm:px-6 py-8">
          {activeProblem ? (
            <ProblemDetail
              problem={activeProblem}
              patternName={activePattern?.name || ''}
              onBack={() => setActiveProblem(null)}
              allProblems={activePattern?.problems || []}
              onSelectProblem={(prob) => setActiveProblem(prob)}
              isRevised={revisedProblems.has(activeProblem.id)}
              onToggleRevised={() => handleToggleRevised(activeProblem.id)}
            />
          ) : (
            <ProblemList
              pattern={activePattern}
              onSelectProblem={(prob) => setActiveProblem(prob)}
              revisedProblems={revisedProblems}
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
      />
    </div>
  );
}
