import { useState } from 'react';
import { patterns } from './data/problems';
import Sidebar from './components/Sidebar';
import ProblemDetail from './components/ProblemDetail';

const difficultyStyle = {
  Easy: 'text-emerald-400',
  Medium: 'text-amber-400',
  Hard: 'text-rose-400',
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePatternId, setActivePatternId] = useState(patterns[0].id);
  const [activeProblem, setActiveProblem] = useState(null);

  const activePattern = patterns.find(p => p.id === activePatternId);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <Sidebar
        patterns={patterns}
        activePattern={activePatternId}
        onSelectPattern={(id) => {
          setActivePatternId(id);
          setActiveProblem(null);
        }}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3 px-6 py-3.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm">
              <span
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer transition-colors"
                onClick={() => setActiveProblem(null)}
              >
                {activePattern?.name}
              </span>
              {activeProblem && (
                <>
                  <span className="text-[var(--color-text-tertiary)]">/</span>
                  <span className="text-[var(--color-text-primary)] font-medium">{activeProblem.title}</span>
                </>
              )}
            </nav>
          </div>
        </header>

        <div className="p-6 max-w-3xl">
          {activeProblem ? (
            /* Problem Detail View */
            <ProblemDetail
              problem={activeProblem}
              onBack={() => setActiveProblem(null)}
            />
          ) : activePattern ? (
            /* Problem List View */
            <div className="animate-fadeIn">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-0.5">
                  {activePattern.name}
                </h2>
                <p className="text-sm text-[var(--color-text-tertiary)]">
                  {activePattern.problems.length} problems
                </p>
              </div>

              <div className="border border-[var(--color-border)] rounded-lg overflow-hidden divide-y divide-[var(--color-border)]">
                {activePattern.problems.map((problem, idx) => (
                  <button
                    key={problem.id}
                    onClick={() => setActiveProblem(problem)}
                    className="w-full text-left group cursor-pointer hover:bg-[var(--color-bg-surface)] transition-colors duration-100"
                  >
                    <div className="flex items-center gap-4 px-5 py-3.5">
                      <span className="text-[11px] text-[var(--color-text-tertiary)] font-mono tabular-nums w-5 text-right shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-[var(--color-text-primary)] group-hover:text-white transition-colors truncate">
                          {problem.title}
                        </p>
                      </div>
                      <span className={`text-[11px] font-medium shrink-0 ${difficultyStyle[problem.difficulty]}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
