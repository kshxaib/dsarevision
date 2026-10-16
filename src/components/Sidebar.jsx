export default function Sidebar({
  patterns,
  activePattern,
  onSelectPattern,
  isOpen,
  onToggle,
}) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-bg-raised)] border-r border-[var(--color-border)] z-40 flex flex-col transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="px-5 py-5 border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-semibold tracking-tight text-[var(--color-text-primary)]">
              DSA Revision
            </h1>
            <button
              onClick={onToggle}
              className="lg:hidden text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Pattern List */}
        <nav className="flex-1 overflow-y-auto py-2 sidebar-scroll">
          {patterns.map(pattern => {
            const isActive = activePattern === pattern.id;

            return (
              <button
                key={pattern.id}
                onClick={() => {
                  onSelectPattern(pattern.id);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full text-left px-5 py-2.5 flex items-center justify-between transition-colors duration-100 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border-l-2 border-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] border-l-2 border-transparent'
                }`}
              >
                <span className={`text-[13px] truncate ${isActive ? 'font-medium' : ''}`}>
                  {pattern.name}
                </span>
                <span className="text-[11px] text-[var(--color-text-tertiary)] font-mono tabular-nums ml-3 shrink-0">
                  {pattern.problems.length}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[var(--color-border)]">
          <p className="text-[11px] text-[var(--color-text-tertiary)]">
            {patterns.reduce((sum, p) => sum + p.problems.length, 0)} problems · {patterns.length} patterns
          </p>
        </div>
      </aside>
    </>
  );
}
