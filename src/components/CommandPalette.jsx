import { useEffect } from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';

const diffBadgeClass = {
  Easy: 'text-easy border-easy/30 bg-easy/10',
  Medium: 'text-medium border-medium/30 bg-medium/10',
  Hard: 'text-hard border-hard/30 bg-hard/10',
};

export default function CommandPalette({
  open,
  onOpenChange,
  patterns,
  onSelectProblem,
}) {
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Problems"
      description="Quickly search and jump to any DSA problem"
      className="bg-ink-surface border border-ink-border text-ink-text max-w-lg shadow-2xl"
    >
      <CommandInput
        placeholder="Type problem name or pattern..."
        className="bg-transparent text-ink-text placeholder:text-ink-subtle border-none"
      />
      <CommandList className="max-h-80 overflow-y-auto p-2">
        <CommandEmpty className="py-6 text-center text-sm text-ink-subtle">
          No problems found.
        </CommandEmpty>
        {patterns.map((pattern) => (
          <CommandGroup
            key={pattern.id}
            heading={pattern.name}
            className="text-ink-subtle font-mono text-[11px] uppercase tracking-wider mb-2"
          >
            {pattern.problems.map((problem) => (
              <CommandItem
                key={problem.id}
                value={`${problem.title} ${pattern.name}`}
                onSelect={() => {
                  onSelectProblem(pattern.id, problem);
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-ink-elevated data-[selected=true]:bg-ink-elevated transition-colors text-ink-text text-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="truncate">{problem.title}</span>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0.5 border font-medium shrink-0 ${diffBadgeClass[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
