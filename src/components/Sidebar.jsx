const difficultyColor = {
  Easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Hard: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

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
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/50 z-40 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Mobile close */}
        <div className="p-4 border-b border-slate-700/50 lg:hidden">
          <button
            onClick={onToggle}
            className="text-slate-400 hover:text-slate-200 cursor-pointer ml-auto block"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Pattern List */}
        <nav className="flex-1 overflow-y-auto py-3 sidebar-scroll">
          {patterns.map(pattern => {
            const isActive = activePattern === pattern.id;
            const easyCount = pattern.problems.filter(p => p.difficulty === 'Easy').length;
            const medCount = pattern.problems.filter(p => p.difficulty === 'Medium').length;
            const hardCount = pattern.problems.filter(p => p.difficulty === 'Hard').length;

            return (
              <button
                key={pattern.id}
                onClick={() => {
                  onSelectPattern(pattern.id);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-500/10 border-r-2 border-indigo-500 text-slate-100'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border-r-2 border-transparent'
                }`}
              >
                <span className="text-lg shrink-0">{pattern.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? 'text-slate-100' : ''}`}>
                    {pattern.name}
                  </p>
                  <div className="flex gap-2 mt-0.5">
                    {easyCount > 0 && <span className="text-[10px] text-emerald-500">{easyCount}E</span>}
                    {medCount > 0 && <span className="text-[10px] text-amber-500">{medCount}M</span>}
                    {hardCount > 0 && <span className="text-[10px] text-rose-500">{hardCount}H</span>}
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono shrink-0">
                  {pattern.problems.length}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <p className="text-[11px] text-slate-600 text-center">
            {patterns.reduce((sum, p) => sum + p.problems.length, 0)} problems across {patterns.length} patterns
          </p>
        </div>
      </aside>
    </>
  );
}
