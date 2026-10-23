import { ChevronRight, Search, Menu, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TopHeader({
  breadcrumbSection = 'Workspace',
  breadcrumbPage = 'DSA Patterns',
  viewMode = 'dsa-hub',
  totalPatterns = 18,
  totalProblems = 150,
  dsaPercentage = 38,
  onOpenCommand,
  onOpenMobileSidebar,
}) {
  const isDsaView = viewMode === 'dsa-hub' || viewMode === 'dsa';

  return (
    <header className="bg-card border-t-border border-r-border border-b border-b-border border-l-border flex px-4 sm:px-8 justify-between items-center h-16 sticky top-0 z-30 backdrop-blur-md">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="size-5" />
        </button>

        <div className="text-muted-foreground text-xs sm:text-sm flex items-center gap-2 font-sans truncate">
          <span className="truncate">{breadcrumbSection}</span>
          <ChevronRight className="size-3.5 sm:size-4 shrink-0 text-muted-foreground/60" />
          <span className="text-foreground font-medium truncate">{breadcrumbPage}</span>
        </div>
      </div>

      {/* Right Stats & Actions */}
      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
        {isDsaView ? (
          <>
            <span className="hidden sm:inline">{totalPatterns} patterns</span>
            <span className="bg-border w-px h-4 hidden sm:inline" />
            <span className="hidden sm:inline">{totalProblems} problems</span>
            <span className="bg-border w-px h-4 hidden sm:inline" />
            <span className="font-mono text-foreground font-medium">{dsaPercentage}% revised</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenCommand}
              className="size-8 cursor-pointer text-muted-foreground hover:text-foreground"
              title="Search"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={onOpenCommand}
              className="text-muted-foreground hover:text-foreground text-xs px-2 sm:px-3 gap-2 h-8 hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              <Search className="size-3.5 sm:size-4" />
              <span className="hidden sm:inline">Search anything</span>
              <kbd className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border border-border">
                ⌘ K
              </kbd>
            </Button>
            <div
              className="font-semibold rounded-full bg-primary text-primary-foreground text-xs flex justify-center items-center size-8 shadow-xs select-none cursor-default"
              title="Resource Vault"
            >
              RV
            </div>
          </>
        )}
      </div>
    </header>
  );
}
