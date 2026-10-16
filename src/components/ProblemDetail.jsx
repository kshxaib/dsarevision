import { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, Link as LinkIcon, Check } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import StepWalkthrough from './StepWalkthrough';

const diffBadgeClass = {
  Easy: 'bg-easy/10 text-easy border-easy/30',
  Medium: 'bg-medium/10 text-medium border-medium/30',
  Hard: 'bg-hard/10 text-hard border-hard/30',
};

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n').length;

  return (
    <div className="rounded-lg overflow-hidden border border-ink-border my-3">
      {/* Code header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-ink-elevated border-b border-ink-border">
        <span className="text-[11px] text-ink-subtle font-mono">java</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              className="text-ink-subtle hover:text-ink-muted transition-colors p-1"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-easy" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>{copied ? 'Copied!' : 'Copy code'}</TooltipContent>
        </Tooltip>
      </div>
      <div className="bg-code-bg">
        <Editor
          height={`${Math.min(Math.max(lines * 21, 90), 420)}px`}
          language="java"
          value={code.trim()}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            lineNumbers: 'on',
            renderLineHighlight: 'none',
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            scrollbar: { vertical: 'hidden', horizontal: 'auto' },
            padding: { top: 12, bottom: 12 },
            domReadOnly: true,
            contextmenu: false,
          }}
        />
      </div>
    </div>
  );
}

function ApproachContent({ approach }) {
  if (!approach || (!approach.idea && !approach.code)) {
    return (
      <p className="text-ink-subtle italic text-sm py-4">
        Not yet added — approach details to be revised.
      </p>
    );
  }

  return (
    <div className="space-y-4 py-1">
      {approach.idea && (
        <div>
          <p className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-1.5">Idea</p>
          <p className="text-ink-muted text-sm leading-relaxed">{approach.idea}</p>
        </div>
      )}
      {approach.code && (
        <div>
          <p className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-1">Code</p>
          <CodeBlock code={approach.code} />
        </div>
      )}
      {approach.walkthrough && (
        <StepWalkthrough walkthrough={approach.walkthrough} />
      )}
      {(approach.time || approach.space) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {approach.time && (
            <Card className="bg-ink-elevated border-ink-border">
              <CardContent className="p-4">
                <p className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-1">Time Complexity</p>
                <p className="text-base font-mono font-bold text-ink-text">{approach.time}</p>
                {approach.timeDesc && (
                  <p className="text-xs text-ink-subtle mt-1 leading-relaxed">{approach.timeDesc}</p>
                )}
              </CardContent>
            </Card>
          )}
          {approach.space && (
            <Card className="bg-ink-elevated border-ink-border">
              <CardContent className="p-4">
                <p className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-1">Space Complexity</p>
                <p className="text-base font-mono font-bold text-ink-text">{approach.space}</p>
                {approach.spaceDesc && (
                  <p className="text-xs text-ink-subtle mt-1 leading-relaxed">{approach.spaceDesc}</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProblemDetail({
  problem,
  patternName,
  onBack,
  onBackToDashboard,
  allProblems,
  onSelectProblem,
  isRevised = false,
  onToggleRevised,
}) {
  const [linkCopied, setLinkCopied] = useState(false);

  const hasExamples = problem.examples && problem.examples.some(e => e.input || e.output);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}#${problem.id}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  // Find next problems in the list for "Up next"
  const currentIdx = allProblems?.findIndex(p => p.id === problem.id) ?? -1;
  const upNext = allProblems?.slice(currentIdx + 1, currentIdx + 4) ?? [];

  return (
    <div className="animate-fadeIn">
      {/* Title Bar */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onBack}
            title={`Back to ${patternName}`}
            className="p-1.5 -ml-1.5 rounded-lg text-ink-subtle hover:text-ink-text hover:bg-ink-surface transition-colors cursor-pointer"
            aria-label="Back to problems list"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-heading font-bold text-ink-text">{problem.title}</h1>
          <Badge
            variant="outline"
            className={`text-[10px] font-semibold px-2 py-0.5 border ${diffBadgeClass[problem.difficulty]}`}
          >
            {problem.difficulty}
          </Badge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs bg-ink-surface border-ink-border text-ink-muted hover:text-ink-text hover:border-ink-faint hover:bg-ink-elevated"
                onClick={handleCopyLink}
              >
                {linkCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-easy mr-1.5" /> : <LinkIcon className="w-3.5 h-3.5 mr-1.5" />}
                {linkCopied ? 'Copied' : 'Copy link'}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy problem share link</TooltipContent>
          </Tooltip>

          <Button
            size="sm"
            onClick={onToggleRevised}
            className={`h-8 text-xs font-semibold transition-colors ${
              isRevised
                ? 'bg-easy/20 text-easy border border-easy/40 hover:bg-easy/30'
                : 'bg-amber-accent text-ink-bg hover:bg-amber-accent-hover font-bold'
            }`}
          >
            {isRevised ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" />
                Revised
              </>
            ) : (
              'Mark as revised'
            )}
          </Button>
        </div>
      </div>

      {/* Problem Definition */}
      {problem.definition && (
        <p className="text-ink-muted text-sm leading-relaxed mb-6">{problem.definition}</p>
      )}

      {/* Examples Section - Max 2 & Shrunk */}
      {hasExamples && (
        <div className="mb-6 space-y-2">
          <h3 className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider">Examples</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {problem.examples.slice(0, 2).map((ex, i) => (
              (ex.input || ex.output) ? (
                <div key={i} className="rounded-lg bg-ink-surface border border-ink-border p-2.5 sm:p-3 text-xs">
                  <p className="text-[10px] text-ink-faint font-semibold uppercase tracking-wider mb-1.5">Example {i + 1}</p>
                  {ex.input && (
                    <div className="flex items-baseline gap-1.5 mb-1 font-mono text-[12px] truncate">
                      <span className="text-[11px] font-sans font-medium text-ink-subtle shrink-0">Input:</span>
                      <span className="text-ink-muted truncate">{ex.input}</span>
                    </div>
                  )}
                  {ex.output && (
                    <div className="flex items-baseline gap-1.5 font-mono text-[12px] truncate">
                      <span className="text-[11px] font-sans font-medium text-ink-subtle shrink-0">Output:</span>
                      <span className="text-easy font-semibold">{ex.output}</span>
                    </div>
                  )}
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {/* Approaches Tabs */}
      <div className="mb-8">
        <h3 className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-3">Approaches</h3>
        <Tabs defaultValue="brute" className="w-full">
          <TabsList className="bg-ink-surface border border-ink-border rounded-lg p-1 h-auto w-fit flex gap-1">
            <TabsTrigger
              value="brute"
              className="text-[13px] px-4 py-1.5 rounded-md text-ink-subtle data-[state=active]:bg-ink-elevated data-[state=active]:text-ink-text data-[state=active]:font-medium transition-all"
            >
              Brute Force
            </TabsTrigger>
            <TabsTrigger
              value="better"
              className="text-[13px] px-4 py-1.5 rounded-md text-ink-subtle data-[state=active]:bg-ink-elevated data-[state=active]:text-ink-text data-[state=active]:font-medium transition-all"
            >
              Better
            </TabsTrigger>
            <TabsTrigger
              value="optimal"
              className="text-[13px] px-4 py-1.5 rounded-md text-ink-subtle data-[state=active]:bg-ink-elevated data-[state=active]:text-ink-text data-[state=active]:font-medium transition-all"
            >
              Optimal
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="brute" className="mt-0">
              <ApproachContent approach={problem.brute} />
            </TabsContent>
            <TabsContent value="better" className="mt-0">
              <ApproachContent approach={problem.better} />
            </TabsContent>
            <TabsContent value="optimal" className="mt-0">
              <ApproachContent approach={problem.optimal} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Up Next Section */}
      {upNext.length > 0 && (
        <div className="pt-4 border-t border-ink-border">
          <h3 className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-3">Up Next in {patternName}</h3>
          <div className="border border-ink-border rounded-[10px] overflow-hidden divide-y divide-ink-border bg-ink-surface/40">
            {upNext.map(p => (
              <button
                key={p.id}
                onClick={() => onSelectProblem(p)}
                className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 hover:bg-ink-surface transition-colors cursor-pointer group"
              >
                <span className="text-[13px] text-ink-muted group-hover:text-ink-text transition-colors truncate">
                  {p.title}
                </span>
                <Badge
                  variant="outline"
                  className={`text-[10px] font-semibold px-2 py-0.5 border shrink-0 ${diffBadgeClass[p.difficulty]}`}
                >
                  {p.difficulty}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
