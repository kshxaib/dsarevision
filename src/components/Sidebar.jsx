import { useState, useEffect } from 'react';
import { Lock, Search } from 'lucide-react';

export default function AppSidebar({
  currentView = 'dsa-patterns',
  onNavigate,
  onOpenCommand,
  onLock,
  isOpen = false,
  onClose,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleItemClick = (target) => {
    if (onNavigate) onNavigate(target);
    if (isMobile && onClose) onClose();
  };

  const navItemClass = (active) =>
    `rounded-md text-sm flex px-3 items-center gap-3 h-9 transition-colors cursor-pointer select-none ${
      active
        ? 'font-medium bg-sidebar-accent text-sidebar-accent-foreground shadow-xs'
        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-sidebar text-sidebar-foreground border-y-sidebar-border border-r border-r-sidebar-border border-l-sidebar-border flex fixed z-50 inset-y-0 left-0 flex-col w-66 transition-transform duration-200 ${
          isMobile
            ? isOpen
              ? 'translate-x-0 shadow-2xl'
              : '-translate-x-full'
            : 'translate-x-0'
        }`}
      >
        {/* 1. Sabse Upar Search Bar */}
        <div className="px-3 pt-3 shrink-0">
          <div
            onClick={onOpenCommand}
            className="rounded-md bg-sidebar-accent/50 hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-accent-foreground text-sm border border-sidebar-border flex px-3 items-center justify-between h-9 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="size-4" />
              <span>Search resources</span>
            </div>
            <kbd className="font-mono text-muted-foreground text-xs">⌘K</kbd>
          </div>
        </div>

        {/* Navigation Area */}
        <nav className="px-3 py-4 flex-1 overflow-y-auto space-y-5 sidebar-scroll">
          {/* 2. DSA Theory & 3. DSA Patterns */}
          <div className="flex flex-col gap-1">
            <div
              onClick={() => handleItemClick('theory')}
              className={navItemClass(currentView === 'theory')}
            >
              {/* Real Binary Search Tree / Algorithm */}
              <svg
                className={`size-4 shrink-0 transition-colors ${
                  currentView === 'theory' ? 'text-amber-accent' : 'text-muted-foreground'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="4" r="2.5" />
                <circle cx="6" cy="18" r="2.5" />
                <circle cx="18" cy="18" r="2.5" />
                <path d="M10.5 6.2L7.5 15.8" />
                <path d="M13.5 6.2L16.5 15.8" />
              </svg>
              <span>DSA Theory</span>
            </div>
            <div
              onClick={() => handleItemClick('dsa-patterns')}
              className={navItemClass(currentView === 'dsa-patterns' || currentView === 'dsa-problem')}
            >
              {/* Real Algorithm Flow & Logic Pattern */}
              <svg
                className={`size-4 shrink-0 transition-colors ${
                  currentView === 'dsa-patterns' || currentView === 'dsa-problem'
                    ? 'text-amber-accent'
                    : 'text-muted-foreground'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="18" r="3" />
                <path d="M6 9v6" />
                <path d="M9 6h5a4 4 0 0 1 4 4v5" />
              </svg>
              <span>DSA Patterns</span>
            </div>
          </div>

          {/* 4. Core Subjects */}
          <div>
            <p className="font-medium text-muted-foreground text-xs tracking-wider px-2 pb-2">
              CORE SUBJECTS
            </p>
            <div className="text-sidebar-foreground/80 text-sm flex flex-col gap-1">
              <div
                onClick={() => handleItemClick('vault-cn')}
                className={navItemClass(currentView === 'vault-cn')}
              >
                {/* Real Network Globe */}
                <svg
                  className={`size-4 shrink-0 transition-colors ${
                    currentView === 'vault-cn' ? 'text-amber-accent' : 'text-muted-foreground'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <line x1="3.6" y1="9" x2="20.4" y2="9" />
                  <line x1="3.6" y1="15" x2="20.4" y2="15" />
                  <path d="M11.5 3a15 15 0 0 0 0 18" />
                  <path d="M12.5 3a15 15 0 0 1 0 18" />
                </svg>
                <span>Computer Networks</span>
              </div>
              <div
                onClick={() => handleItemClick('vault-dbms')}
                className={navItemClass(currentView === 'vault-dbms')}
              >
                {/* Real Database Storage Array */}
                <svg
                  className={`size-4 shrink-0 transition-colors ${
                    currentView === 'vault-dbms' ? 'text-amber-accent' : 'text-muted-foreground'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <ellipse cx="12" cy="5" rx="8" ry="2.5" />
                  <path d="M4 5v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5V5" />
                  <path d="M4 11v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-6" />
                  <circle cx="8" cy="11" r="0.75" fill="currentColor" />
                  <circle cx="8" cy="17" r="0.75" fill="currentColor" />
                </svg>
                <span>DBMS</span>
              </div>
              <div
                onClick={() => handleItemClick('vault-sql')}
                className={navItemClass(currentView === 'vault-sql')}
              >
                {/* Real SQL Badge */}
                <svg
                  className={`size-4 shrink-0 transition-colors ${
                    currentView === 'vault-sql' ? 'text-amber-accent' : 'text-muted-foreground'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
                  <text
                    x="12"
                    y="14.5"
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize="8.5"
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    letterSpacing="0.5"
                  >
                    SQL
                  </text>
                </svg>
                <span>SQL</span>
              </div>
              <div
                onClick={() => handleItemClick('vault-os')}
                className={navItemClass(currentView === 'vault-os')}
              >
                {/* Real Operating Systems Terminal / Shell */}
                <svg
                  className={`size-4 shrink-0 transition-colors ${
                    currentView === 'vault-os' ? 'text-amber-accent' : 'text-muted-foreground'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span>Operating Systems</span>
              </div>
              <div
                onClick={() => handleItemClick('vault-oops')}
                className={navItemClass(currentView === 'vault-oops')}
              >
                {/* Real OOP 3D Object Cube */}
                <svg
                  className={`size-4 shrink-0 transition-colors ${
                    currentView === 'vault-oops' ? 'text-amber-accent' : 'text-muted-foreground'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <span>OOP & SOLID</span>
              </div>
            </div>
          </div>
        </nav>

        {/* 5. Niche Vault Lock Ka Button */}
        {onLock && (
          <div className="border-x-sidebar-border border-t border-t-sidebar-border border-b-sidebar-border p-3 shrink-0 bg-sidebar">
            <button
              onClick={onLock}
              className="rounded-md text-sidebar-foreground/80 hover:text-sidebar-accent-foreground text-sm flex px-3 items-center gap-3 h-9 hover:bg-sidebar-accent cursor-pointer transition-colors w-full text-left"
            >
              <Lock className="size-4 text-muted-foreground" />
              <span>Lock Vault</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
