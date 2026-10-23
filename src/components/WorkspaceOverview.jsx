import {
  ArrowRight,
  Search,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function WorkspaceOverview({
  totalStats,
  moduleStats = [],
  continueTopic,
  onResumeSession,
  onOpenCommand,
  onNavigate,
}) {
  const continueTitle = continueTopic?.title || 'TCP Handshake & Connection Teardown';
  const continueSubtitle = continueTopic?.subtitle || 'Core CS / Computer Networks';
  const continuePct = continueTopic?.percentage || 33;

  return (
    <div className="mx-auto max-w-275 animate-fadeIn">
      {/* Top Welcome & Search Pill Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight text-foreground">
            Your Interview Prep Workspace
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Pick up where you left off.
          </p>
        </div>
        <div
          onClick={onOpenCommand}
          className="rounded-md bg-card text-muted-foreground hover:text-foreground text-sm border border-border flex px-3 py-2 items-center gap-2 cursor-pointer transition-colors"
          title="Press ⌘K to open command search"
        >
          <Search className="size-4 shrink-0" />
          <span>Search and quick navigation</span>
          <kbd className="font-mono text-muted-foreground text-xs ml-1 bg-muted px-1.5 py-0.5 rounded border border-border">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Continue Revision Card */}
      <section
        onClick={() => onNavigate(continueTopic?.target || 'vault-cn')}
        className="rounded-xl bg-card border border-border mt-10 p-6 cursor-pointer hover:border-primary/50 transition-all group"
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-muted-foreground text-sm">
              Continue Revision
            </div>
            <h2 className="font-semibold text-xl mt-2 text-foreground group-hover:text-primary transition-colors">
              {continueTitle}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {continueSubtitle}
            </p>
          </div>
          <ArrowRight className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all size-5 shrink-0" />
        </div>
        <div className="rounded-full bg-muted mt-6 h-1 overflow-hidden">
          <div
            className="rounded-full bg-primary h-1 transition-all duration-300"
            style={{ width: `${Math.max(continuePct, 5)}%` }}
          />
        </div>
      </section>

      {/* 4 Stat Cards in Grid */}
      <div className="grid mt-6 gap-4 grid-cols-2 sm:grid-cols-4">
        <div className="rounded-lg bg-card border border-border p-4">
          <div className="text-muted-foreground text-xs">
            Total Questions
          </div>
          <div className="font-semibold text-xl mt-2 text-foreground font-mono">
            {totalStats.totalQuestions}
          </div>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <div className="text-muted-foreground text-xs">Revised</div>
          <div className="font-semibold text-xl mt-2 text-foreground font-mono">
            {totalStats.revisedCount}
          </div>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <div className="text-muted-foreground text-xs">Remaining</div>
          <div className="font-semibold text-xl mt-2 text-foreground font-mono">
            {totalStats.remainingCount}
          </div>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <div className="text-muted-foreground text-xs">Modules</div>
          <div className="font-semibold text-xl mt-2 text-foreground font-mono">
            {totalStats.totalModules}
          </div>
        </div>
      </div>

      {/* My Learning Modules */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg text-foreground">
            My Learning Modules
          </h2>
          <button
            onClick={() => onNavigate('vault')}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Explore Core CS subjects →
          </button>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {moduleStats.map((mod) => (
            <div
              key={mod.id}
              onClick={() => onNavigate(mod.route)}
              className="rounded-lg bg-card border border-border p-4 cursor-pointer hover:border-primary/40 hover:bg-muted/10 transition-all group"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {mod.title}
                </span>
                <span className="text-muted-foreground text-xs font-mono">
                  {mod.percentage}%
                </span>
              </div>
              <div className="rounded-full bg-muted mt-4 h-1 overflow-hidden">
                <div
                  className="rounded-full bg-primary h-1 transition-all duration-300"
                  style={{ width: `${Math.max(mod.percentage, 3)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
