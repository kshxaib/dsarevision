import {
  Hash, GitBranch, Layers, BookOpen, Search, Binary,
  Link2, TreePine, Type, ArrowUpCircle, Undo2, Network,
  Map, TrendingUp, Grid3x3, Scissors, Calendar, Calculator, Zap,
  Flame, Target, BookCheck, CheckCircle2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard({ patterns, onSelectPattern, revisedProblems = new Set() }) {
  const totalProblems = patterns.reduce((s, p) => s + p.problems.length, 0);
  const totalRevised = patterns.reduce(
    (s, p) => s + p.problems.filter(prob => revisedProblems.has(prob.id)).length,
    0
  );
  const pctComplete = totalProblems > 0 ? Math.round((totalRevised / totalProblems) * 100) : 0;

  const patternsWithProgress = patterns.filter(p =>
    p.problems.some(prob => revisedProblems.has(prob.id))
  ).length;

  return (
    <div className="animate-fadeIn">
      {/* Greeting Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-ink-text mb-1">
          {getGreeting()} 👋
        </h1>
        <p className="text-sm text-ink-muted">
          Track your DSA revision progress across {patterns.length} patterns and {totalProblems} core problems.
        </p>
      </div>

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <Card className="bg-ink-surface border-ink-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-accent-muted border border-amber-accent/20">
                <Target className="w-4 h-4 text-amber-accent" />
              </div>
              <div>
                <p className="text-[11px] text-ink-subtle uppercase tracking-wider font-semibold">Revised</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xl font-heading font-bold text-ink-text">{totalRevised}</span>
                  <span className="text-xs text-ink-subtle">/ {totalProblems}</span>
                  <span className="text-xs text-amber-accent font-medium ml-1">({pctComplete}%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ink-surface border-ink-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-accent-muted border border-amber-accent/20">
                <Flame className="w-4 h-4 text-amber-accent" />
              </div>
              <div>
                <p className="text-[11px] text-ink-subtle uppercase tracking-wider font-semibold">Active Streak</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-heading font-bold text-ink-text">
                    {totalRevised > 0 ? '1' : '0'}
                  </span>
                  <span className="text-xs text-ink-subtle">day streak</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ink-surface border-ink-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-accent-muted border border-amber-accent/20">
                <BookCheck className="w-4 h-4 text-amber-accent" />
              </div>
              <div>
                <p className="text-[11px] text-ink-subtle uppercase tracking-wider font-semibold">Patterns In Progress</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-heading font-bold text-ink-text">{patternsWithProgress}</span>
                  <span className="text-xs text-ink-subtle">/ {patterns.length} patterns</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patterns Grid Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-heading font-semibold text-ink-text">All Patterns</h2>
        <span className="text-xs text-ink-subtle">{patterns.length} patterns available</span>
      </div>

      {/* Pattern Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {patterns.map(pattern => {
          const Icon = patternIcons[pattern.id] || Hash;
          const easy = pattern.problems.filter(p => p.difficulty === 'Easy').length;
          const med = pattern.problems.filter(p => p.difficulty === 'Medium').length;
          const hard = pattern.problems.filter(p => p.difficulty === 'Hard').length;
          const revisedCount = pattern.problems.filter(p => revisedProblems.has(p.id)).length;
          const patternPct = pattern.problems.length > 0 ? Math.round((revisedCount / pattern.problems.length) * 100) : 0;
          const isComplete = pattern.problems.length > 0 && revisedCount === pattern.problems.length;

          return (
            <Card
              key={pattern.id}
              className="bg-ink-surface border-ink-border hover:border-ink-faint hover:-translate-y-0.5 transition-all duration-150 cursor-pointer group"
              onClick={() => onSelectPattern(pattern.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-ink-elevated border border-ink-border group-hover:border-amber-accent/40 group-hover:bg-amber-accent-muted transition-colors">
                      <Icon className="w-4 h-4 text-ink-muted group-hover:text-amber-accent transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-ink-text group-hover:text-white transition-colors truncate">
                        {pattern.name}
                      </h3>
                      <p className="text-xs text-ink-subtle mt-0.5">
                        {revisedCount}/{pattern.problems.length} revised
                      </p>
                    </div>
                  </div>
                  {isComplete && (
                    <CheckCircle2 className="w-4 h-4 text-easy shrink-0 mt-1" />
                  )}
                </div>

                {/* Difficulty counts */}
                <div className="flex items-center gap-2.5 mb-3">
                  {easy > 0 && (
                    <span className="flex items-center gap-1 text-[11px] text-easy font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-easy" />
                      {easy}E
                    </span>
                  )}
                  {med > 0 && (
                    <span className="flex items-center gap-1 text-[11px] text-medium font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-medium" />
                      {med}M
                    </span>
                  )}
                  {hard > 0 && (
                    <span className="flex items-center gap-1 text-[11px] text-hard font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-hard" />
                      {hard}H
                    </span>
                  )}
                </div>

                {/* Progress bar in amber */}
                <div className="w-full bg-ink-elevated h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-accent h-full transition-all duration-300 rounded-full"
                    style={{ width: `${patternPct}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
