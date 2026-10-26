import { useState, useEffect, useMemo } from 'react';
import { Menu } from 'lucide-react';
import { patterns } from './data/problems';
import { vaultSubjects, getVaultSubjectById } from './data/vault';
import Sidebar from './components/Sidebar';
import DsaPatternsHub from './components/DsaPatternsHub';
import ProblemList from './components/ProblemList';
import ProblemDetail from './components/ProblemDetail';
import TheoryQuestions from './components/TheoryQuestions';
import VaultHub from './components/VaultHub';
import VaultSubjectView from './components/VaultSubjectView';
import CommandPalette from './components/CommandPalette';
import PasswordGate from './components/PasswordGate';

function resolveInitialState() {
  const hash = window.location.hash.replace('#', '').trim();

  // 1. Default / Theory
  if (!hash || hash === 'overview' || hash === 'theory' || hash === 'theory-questions') {
    return {
      viewMode: 'theory',
      patternId: patterns[0]?.id || '',
      problem: null,
      vaultSubjectId: null,
    };
  }

  // 2. DSA Patterns Explorer Hub
  if (hash === 'dsa-patterns' || hash === 'patterns') {
    return {
      viewMode: 'dsa-hub',
      patternId: patterns[0]?.id || '',
      problem: null,
      vaultSubjectId: null,
    };
  }

  // 3. Theory
  if (hash === 'theory' || hash === 'theory-questions') {
    return {
      viewMode: 'theory',
      patternId: patterns[0]?.id || '',
      problem: null,
      vaultSubjectId: null,
    };
  }

  // 4. Vault Hub
  if (hash === 'vault') {
    return {
      viewMode: 'vault',
      patternId: patterns[0]?.id || '',
      problem: null,
      vaultSubjectId: null,
    };
  }

  // 5. Specific Vault Subject
  if (hash.startsWith('vault-')) {
    const subId = hash.replace('vault-', '');
    const foundSub = getVaultSubjectById(subId);
    if (foundSub) {
      return {
        viewMode: 'vault-subject',
        patternId: patterns[0]?.id || '',
        problem: null,
        vaultSubjectId: foundSub.id,
      };
    }
  }

  // 6. Pattern or Problem
  const foundPat = patterns.find((p) => p.id === hash);
  if (foundPat) {
    return {
      viewMode: 'dsa',
      patternId: foundPat.id,
      problem: null,
      vaultSubjectId: null,
    };
  }

  for (const pat of patterns) {
    const found = pat.problems.find((p) => p.id === hash);
    if (found) {
      return {
        viewMode: 'dsa',
        patternId: pat.id,
        problem: found,
        vaultSubjectId: null,
      };
    }
  }

  return {
    viewMode: 'theory',
    patternId: patterns[0]?.id || '',
    problem: null,
    vaultSubjectId: null,
  };
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState(() => resolveInitialState().viewMode);
  const [activePatternId, setActivePatternId] = useState(() => resolveInitialState().patternId);
  const [activeProblem, setActiveProblem] = useState(() => resolveInitialState().problem);
  const [activeVaultSubjectId, setActiveVaultSubjectId] = useState(
    () => resolveInitialState().vaultSubjectId
  );
  const [commandOpen, setCommandOpen] = useState(false);

  // Authentication gate state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return (
        sessionStorage.getItem('vault_authenticated') === 'true' ||
        localStorage.getItem('vault_authenticated') === 'true'
      );
    } catch {
      return false;
    }
  });

  const handleLock = () => {
    try {
      sessionStorage.removeItem('vault_authenticated');
      localStorage.removeItem('vault_authenticated');
    } catch (e) {
      console.error(e);
    }
    setIsAuthenticated(false);
  };

  // Load revised DSA problems from localStorage
  const [revisedProblems, setRevisedProblems] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa_revised_problems');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Load revised Vault questions from localStorage
  const [revisedVaultQuestions, setRevisedVaultQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('vault_revised_questions');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist revised DSA problems
  const handleToggleRevised = (problemId) => {
    setRevisedProblems((prev) => {
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

  // Persist revised Vault questions
  const handleToggleVaultRevised = (questionId) => {
    setRevisedVaultQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      try {
        localStorage.setItem('vault_revised_questions', JSON.stringify([...next]));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return next;
    });
  };

  // Dynamic Statistics
  const { totalStats, moduleStats, overallPercentage, dsaPercentage, totalDsa } = useMemo(() => {
    const totalDsaCount = patterns.reduce((acc, p) => acc + p.problems.length, 0);
    const revisedDsa = patterns.reduce(
      (acc, p) => acc + p.problems.filter((pr) => revisedProblems.has(pr.id)).length,
      0
    );
    const dsaPct = totalDsaCount > 0 ? Math.round((revisedDsa / totalDsaCount) * 100) : 0;

    const totalVault = vaultSubjects.reduce((acc, s) => acc + s.questions.length, 0);
    const revisedVault = vaultSubjects.reduce(
      (acc, s) => acc + s.questions.filter((q) => revisedVaultQuestions.has(q.id)).length,
      0
    );

    const totalQuestions = totalDsaCount + totalVault;
    const totalRevised = revisedDsa + revisedVault;
    const remaining = totalQuestions - totalRevised;
    const overallPct = totalQuestions > 0 ? Math.round((totalRevised / totalQuestions) * 100) : 0;

    // Module stats breakdown
    const coreCsSubjects = vaultSubjects.filter((s) => s.category === 'Core CS');
    const totalCoreCs = coreCsSubjects.reduce((a, s) => a + s.questions.length, 0);
    const revCoreCs = coreCsSubjects.reduce(
      (a, s) => a + s.questions.filter((q) => revisedVaultQuestions.has(q.id)).length,
      0
    );

    const webDevSubjects = vaultSubjects.filter((s) => s.category === 'Web & Frameworks');
    const totalWebDev = webDevSubjects.reduce((a, s) => a + s.questions.length, 0);
    const revWebDev = webDevSubjects.reduce(
      (a, s) => a + s.questions.filter((q) => revisedVaultQuestions.has(q.id)).length,
      0
    );

    const langSubjects = vaultSubjects.filter((s) => s.category === 'Languages');
    const totalLang = langSubjects.reduce((a, s) => a + s.questions.length, 0);
    const revLang = langSubjects.reduce(
      (a, s) => a + s.questions.filter((q) => revisedVaultQuestions.has(q.id)).length,
      0
    );

    return {
      totalStats: {
        totalQuestions,
        revisedCount: totalRevised,
        remainingCount: remaining,
        totalModules: vaultSubjects.length,
      },
      moduleStats: [
        {
          id: 'dsa-patterns',
          title: 'DSA Patterns',
          percentage: dsaPct,
          route: 'dsa-patterns',
        },
        {
          id: 'dsa-theory',
          title: 'DSA Theory',
          percentage: 42,
          route: 'theory',
        },
        {
          id: 'core-cs',
          title: 'Core CS (5 Modules)',
          percentage: totalCoreCs > 0 ? Math.round((revCoreCs / totalCoreCs) * 100) : 0,
          route: 'vault-cn',
        },
      ],
      overallPercentage: overallPct,
      dsaPercentage: dsaPct,
      totalDsa: totalDsaCount,
    };
  }, [revisedProblems, revisedVaultQuestions]);

  // Unified Navigation Router
  const handleNavigate = (target) => {
    if (target === 'overview' || target === 'theory') {
      setViewMode('theory');
      setActiveProblem(null);
      setActiveVaultSubjectId(null);
      window.location.hash = '#theory';
    } else if (target === 'dsa-patterns') {
      setViewMode('dsa-hub');
      setActiveProblem(null);
      setActiveVaultSubjectId(null);
      window.location.hash = '#dsa-patterns';
    } else if (target === 'vault') {
      setViewMode('vault');
      setActiveProblem(null);
      setActiveVaultSubjectId(null);
      window.location.hash = '#vault';
    } else if (target.startsWith('vault-')) {
      const subId = target.replace('vault-', '');
      setViewMode('vault-subject');
      setActiveVaultSubjectId(subId);
      setActiveProblem(null);
      window.location.hash = '#' + target;
    } else {
      // Check if target is a pattern
      const foundPat = patterns.find((p) => p.id === target);
      if (foundPat) {
        setViewMode('dsa');
        setActivePatternId(foundPat.id);
        setActiveProblem(null);
        window.location.hash = '#' + foundPat.id;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // DSA Problem selection
  const handleSelectProblem = (prob) => {
    setViewMode('dsa');
    const parent = patterns.find((p) => p.problems.some((pr) => pr.id === prob.id));
    if (parent) {
      setActivePatternId(parent.id);
    }
    setActiveProblem(prob);
    setActiveVaultSubjectId(null);
    window.location.hash = '#' + prob.id;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToPattern = () => {
    setViewMode('dsa');
    const targetPattern = activeProblem
      ? patterns.find((p) => p.problems.some((pr) => pr.id === activeProblem.id))
      : null;
    const targetId = targetPattern?.id || activePatternId;
    setActivePatternId(targetId);
    setActiveProblem(null);
    window.location.hash = '#' + targetId;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Sync URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash || hash === 'overview' || hash === 'theory' || hash === 'theory-questions') {
        setViewMode('theory');
        setActiveProblem(null);
        setActiveVaultSubjectId(null);
        return;
      }
      if (hash === 'dsa-patterns' || hash === 'patterns') {
        setViewMode('dsa-hub');
        setActiveProblem(null);
        setActiveVaultSubjectId(null);
        return;
      }
      if (hash === 'vault') {
        setViewMode('vault');
        setActiveProblem(null);
        setActiveVaultSubjectId(null);
        return;
      }
      if (hash.startsWith('vault-')) {
        const subId = hash.replace('vault-', '');
        const found = getVaultSubjectById(subId);
        if (found) {
          setViewMode('vault-subject');
          setActiveVaultSubjectId(found.id);
          setActiveProblem(null);
          return;
        }
      }
      const foundPat = patterns.find((p) => p.id === hash);
      if (foundPat) {
        setViewMode('dsa');
        setActivePatternId(foundPat.id);
        setActiveProblem(null);
        return;
      }
      for (const pat of patterns) {
        const found = pat.problems.find((p) => p.id === hash);
        if (found) {
          setViewMode('dsa');
          setActivePatternId(pat.id);
          setActiveProblem(found);
          return;
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const currentProblem = useMemo(() => {
    if (!activeProblem) return null;
    for (const pat of patterns) {
      const found = pat.problems.find((pr) => pr.id === activeProblem.id);
      if (found) return found;
    }
    return activeProblem;
  }, [activeProblem]);

  const activePattern = useMemo(() => {
    if (currentProblem) {
      const parent = patterns.find((p) => p.problems.some((pr) => pr.id === currentProblem.id));
      if (parent) return parent;
    }
    return patterns.find((p) => p.id === activePatternId) || patterns[0];
  }, [currentProblem, activePatternId]);

  const activeVaultSubject = activeVaultSubjectId
    ? getVaultSubjectById(activeVaultSubjectId)
    : null;

  // Compute breadcrumb info
  const { breadcrumbSection, breadcrumbPage } = useMemo(() => {
    if (viewMode === 'overview') {
      return { breadcrumbSection: 'Learning', breadcrumbPage: 'Overview' };
    }
    if (viewMode === 'dsa-hub') {
      return { breadcrumbSection: 'Workspace', breadcrumbPage: 'DSA Patterns' };
    }
    if (viewMode === 'theory') {
      return { breadcrumbSection: 'Learning', breadcrumbPage: 'DSA Theory' };
    }
    if (viewMode === 'vault') {
      return { breadcrumbSection: 'Learning', breadcrumbPage: 'Core CS Vault' };
    }
    if (viewMode === 'vault-subject' && activeVaultSubject) {
      return {
        breadcrumbSection: activeVaultSubject.category || 'Core CS',
        breadcrumbPage: activeVaultSubject.title,
      };
    }
    if (viewMode === 'dsa') {
      if (activeProblem) {
        return {
          breadcrumbSection: activePattern?.name || 'DSA Patterns',
          breadcrumbPage: activeProblem.title,
        };
      }
      return {
        breadcrumbSection: 'DSA Patterns',
        breadcrumbPage: activePattern?.name || 'Patterns',
      };
    }
    return { breadcrumbSection: 'Learning', breadcrumbPage: 'Overview' };
  }, [viewMode, activeVaultSubject, activeProblem, activePattern]);

  // Current view identifier for Sidebar active state
  const sidebarCurrentView = useMemo(() => {
    if (viewMode === 'theory') return 'theory';
    if (viewMode === 'dsa-hub') return 'dsa-patterns';
    if (viewMode === 'vault-subject' && activeVaultSubjectId) {
      return 'vault-' + activeVaultSubjectId;
    }
    if (viewMode === 'dsa') return 'dsa-patterns';
    return 'theory';
  }, [viewMode, activeVaultSubjectId]);

  return (
    <div data-appearance="dark">
      <div className="bg-background text-foreground w-full min-h-screen">
        {/* Security Gate Modal */}
        {!isAuthenticated && (
          <PasswordGate onAuthenticated={() => setIsAuthenticated(true)} />
        )}

        <div
          className={`flex min-h-screen transition-all duration-300 ${
            !isAuthenticated
              ? 'filter blur-2xl pointer-events-none select-none h-screen overflow-hidden'
              : ''
          }`}
        >
          {/* Redesigned Sidebar */}
          <Sidebar
            currentView={sidebarCurrentView}
            overallPercentage={overallPercentage}
            dsaPercentage={dsaPercentage}
            onNavigate={handleNavigate}
            onOpenCommand={() => setCommandOpen(true)}
            onLock={handleLock}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Layout Area */}
          <div className="flex ml-0 lg:ml-66 flex-col flex-1 min-h-screen">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden fixed top-3 left-3 z-40 p-2 rounded-lg bg-card/90 backdrop-blur-md border border-border text-muted-foreground hover:text-foreground shadow-sm cursor-pointer"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>

            {/* Main Content Area (reduced top gap) */}
            <main className="px-4 sm:px-8 pt-3 sm:pt-4 pb-12 flex-1">
              {viewMode === 'theory' ? (
                <TheoryQuestions />
              ) : viewMode === 'dsa-hub' ? (
                <DsaPatternsHub
                  patterns={patterns}
                  revisedProblems={revisedProblems}
                  onSelectPattern={(patId) => {
                    setViewMode('dsa');
                    setActivePatternId(patId);
                    setActiveProblem(null);
                    window.location.hash = '#' + patId;
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  onSelectProblem={handleSelectProblem}
                  onToggleRevised={handleToggleRevised}
                />
              ) : viewMode === 'vault' ? (
                <VaultHub
                  onSelectSubject={(id) => handleNavigate('vault-' + id)}
                  revisedQuestionIds={revisedVaultQuestions}
                />
              ) : viewMode === 'vault-subject' && activeVaultSubject ? (
                <VaultSubjectView
                  subject={activeVaultSubject}
                />
              ) : currentProblem ? (
                <ProblemDetail
                  problem={currentProblem}
                  patternName={activePattern?.name || ''}
                  onBack={handleBackToPattern}
                  allProblems={activePattern?.problems || []}
                  onSelectProblem={handleSelectProblem}
                  isRevised={revisedProblems.has(currentProblem.id)}
                  onToggleRevised={() => handleToggleRevised(currentProblem.id)}
                />
              ) : (
                <ProblemList
                  pattern={activePattern}
                  patternIndex={patterns.findIndex((p) => p.id === activePattern?.id)}
                  onSelectProblem={handleSelectProblem}
                  revisedProblems={revisedProblems}
                  onToggleRevised={handleToggleRevised}
                />
              )}
            </main>
          </div>
        </div>

        {/* ⌘K Command Dialog */}
        <CommandPalette
          open={commandOpen}
          onOpenChange={setCommandOpen}
          patterns={patterns}
          onSelectProblem={(patId, prob) => {
            setViewMode('dsa');
            setActivePatternId(patId);
            setActiveProblem(prob);
            window.location.hash = '#' + prob.id;
          }}
          onSelectTheory={() => handleNavigate('theory')}
          onSelectVaultHub={() => handleNavigate('vault')}
          onSelectVaultSubject={(subId) => handleNavigate('vault-' + subId)}
          revisedProblems={revisedProblems}
        />
      </div>
    </div>
  );
}
