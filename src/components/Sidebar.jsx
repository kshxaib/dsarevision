import { useState, useEffect } from 'react';
import {
  BookOpen,
  Cpu,
  Database,
  GitBranch,
  Layers3,
  Lock,
  Network,
  Search,
  Table2,
} from 'lucide-react';

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
              <BookOpen className="size-4 text-amber-accent" />
              <span>DSA Theory</span>
            </div>
            <div
              onClick={() => handleItemClick('dsa-patterns')}
              className={navItemClass(currentView === 'dsa-patterns' || currentView === 'dsa-problem')}
            >
              <GitBranch className="size-4 text-emerald-400" />
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
                <Network className="size-4 text-sky-400" />
                <span>Computer Networks</span>
              </div>
              <div
                onClick={() => handleItemClick('vault-dbms')}
                className={navItemClass(currentView === 'vault-dbms')}
              >
                <Database className="size-4 text-emerald-400" />
                <span>DBMS</span>
              </div>
              <div
                onClick={() => handleItemClick('vault-sql')}
                className={navItemClass(currentView === 'vault-sql')}
              >
                <Table2 className="size-4 text-cyan-400" />
                <span>SQL</span>
              </div>
              <div
                onClick={() => handleItemClick('vault-os')}
                className={navItemClass(currentView === 'vault-os')}
              >
                <Cpu className="size-4 text-amber-400" />
                <span>Operating Systems</span>
              </div>
              <div
                onClick={() => handleItemClick('vault-oops')}
                className={navItemClass(currentView === 'vault-oops')}
              >
                <Layers3 className="size-4 text-purple-400" />
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
