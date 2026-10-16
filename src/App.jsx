import { useState } from 'react';
import { patterns } from './data/problems';
import Sidebar from './components/Sidebar';
import ProblemDetail from './components/ProblemDetail';

const difficultyColor = {
  Easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Hard: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePatternId, setActivePatternId] = useState(patterns[0].id);
  const [activeProblem, setActiveProblem] = useState(null);

  const activePattern = patterns.find(p => p.id === activePatternId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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
      <main className="lg:ml-72 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
          <div className="flex items-center gap-4 px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
              <span
                className="text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
                onClick={() => setActiveProblem(null)}
              >
                {activePattern?.icon} {activePattern?.name}
              </span>
              {activeProblem && (
                <>
                  <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-slate-200 font-medium">{activeProblem.title}</span>
                </>
              )}
            </nav>


          </div>
        </header>

        <div className="p-6 max-w-4xl">
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
                <h2 className="text-xl font-bold text-slate-100 mb-1">{activePattern.name}</h2>
                <p className="text-sm text-slate-500">{activePattern.problems.length} problems</p>
              </div>

              <div className="space-y-2">
                {activePattern.problems.map((problem, idx) => (
                  <button
                    key={problem.id}
                    onClick={() => setActiveProblem(problem)}
                    className="w-full text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/50 hover:border-slate-700/60 transition-all">
                      <span className="text-xs text-slate-600 font-mono w-6 text-right shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                          {problem.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {problem.definition}
                        </p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${difficultyColor[problem.difficulty]}`}>
                        {problem.difficulty}
                      </span>
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
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
