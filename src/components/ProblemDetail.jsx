import { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle2, Link as LinkIcon, Check, ChevronDown } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const diffColorClass = {
  Easy: 'text-easy',
  Medium: 'text-medium',
  Hard: 'text-hard',
};

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const trimmed = (code || '').trim();
  const lineCount = trimmed ? trimmed.split('\n').length : 1;
  const [editorHeight, setEditorHeight] = useState(Math.max(lineCount * 22 + 28, 90));

  const handleCopy = () => {
    navigator.clipboard.writeText(trimmed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditorMount = (editor) => {
    const updateHeight = () => {
      const contentHeight = editor.getContentHeight();
      if (contentHeight > 40) {
        setEditorHeight(contentHeight + 8);
      }
    };
    updateHeight();
    editor.onDidContentSizeChange(updateHeight);
  };

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
      <div className="bg-[#1e1e1e]">
        <Editor
          height={`${editorHeight}px`}
          language="java"
          value={trimmed}
          theme="vs-dark"
          onMount={handleEditorMount}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            lineHeight: 22,
            lineNumbers: 'on',
            lineNumbersMinChars: 3,
            renderLineHighlight: 'none',
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            scrollbar: { vertical: 'hidden', horizontal: 'auto', alwaysConsumeMouseWheel: false },
            padding: { top: 12, bottom: 12 },
            domReadOnly: true,
            contextmenu: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}

function formatInline(text) {
  if (!text) return '';
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let match;
  let lastIndex = 0;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={key++} className="font-semibold text-ink-text">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-ink-elevated text-ink-text border border-ink-border/60 font-mono text-xs">
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

function parseIdeaToLines(idea) {
  if (!idea) return [];
  // If text already has newlines or bullet markers, preserve its explicit structure
  if (idea.includes('\n') || idea.includes('•')) {
    return idea.split('\n');
  }

  // If it's a single long sentence / paragraph, intelligently break into structured bullet points
  const sentences = idea.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g);
  if (sentences && sentences.length > 1) {
    return sentences
      .map(s => s.trim())
      .filter(Boolean)
      .map((s, idx) => {
        return idx === 0 ? `• **Core Idea:** ${s}` : `• ${s}`;
      });
  }

  return [idea];
}

function IdeaSection({ idea }) {
  if (!idea) return null;

  const lines = parseIdeaToLines(idea);

  return (
    <div className="my-2">
      <p className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-2">
        Intuition & Approach
      </p>

      <div className="space-y-2 text-sm text-ink-muted leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Indented sub-bullets
          const isSub = line.startsWith('  ') || line.startsWith('\t');
          const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*');
          const isNumbered = /^\d+\.\s/.test(trimmed);

          if (isSub) {
            const clean = trimmed.replace(/^(•|-|\*|\d+\.)\s*/, '');
            const numPrefix = trimmed.match(/^(\d+\.)\s*/);
            return (
              <div key={idx} className="flex items-start gap-2.5 ml-5 text-[13px]">
                {numPrefix ? (
                  <span className="text-[11px] font-mono font-medium text-ink-subtle shrink-0 mt-0.5">
                    {numPrefix[1]}
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-subtle mt-2 shrink-0" />
                )}
                <span className="flex-1 text-ink-muted">{formatInline(clean)}</span>
              </div>
            );
          }

          if (isBullet) {
            const clean = trimmed.replace(/^(•|-|\*)\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ink-subtle mt-2 shrink-0" />
                <span className="flex-1 text-ink-text/90 font-normal">{formatInline(clean)}</span>
              </div>
            );
          }

          if (isNumbered) {
            const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
            return (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="text-xs font-mono font-medium text-ink-muted shrink-0 mt-0.5">
                  {numMatch[1]}.
                </span>
                <span className="flex-1 text-ink-text/90 font-normal">{formatInline(numMatch[2])}</span>
              </div>
            );
          }

          // Header lines ending with colon or starting with 'Pattern:'
          if (trimmed.endsWith(':') || trimmed.toLowerCase().startsWith('pattern:')) {
            return (
              <p key={idx} className="font-semibold text-ink-text text-sm pt-1">
                {formatInline(trimmed)}
              </p>
            );
          }

          // Standard paragraph line
          return (
            <p key={idx} className="text-ink-muted">
              {formatInline(trimmed)}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function ApproachContent({ approach, image }) {
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
        <IdeaSection idea={approach.idea} />
      )}
      {approach.code && (
        <div>
          <p className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-1">Code</p>
          <CodeBlock code={approach.code} />
        </div>
      )}
      {image && (
        <DiagramSection image={image} />
      )}
      {(approach.time || approach.space) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {approach.time && (
            <div className="rounded-lg border border-ink-border bg-ink-surface/60 px-3.5 py-2.5 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-ink-subtle font-medium">Time Complexity:</span>
                <span className="font-mono font-bold text-ink-text">{approach.time}</span>
              </div>
              {approach.timeDesc && (
                <div className="text-[11px] text-ink-muted leading-relaxed space-y-0.5 pt-1 border-t border-ink-border/50">
                  {approach.timeDesc.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i}>{formatInline(line)}</p>
                  ))}
                </div>
              )}
            </div>
          )}
          {approach.space && (
            <div className="rounded-lg border border-ink-border bg-ink-surface/60 px-3.5 py-2.5 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-ink-subtle font-medium">Space Complexity:</span>
                <span className="font-mono font-bold text-ink-text">{approach.space}</span>
              </div>
              {approach.spaceDesc && (
                <div className="text-[11px] text-ink-muted leading-relaxed space-y-0.5 pt-1 border-t border-ink-border/50">
                  {approach.spaceDesc.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i}>{formatInline(line)}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DiagramSection({ image }) {
  const [isOpen, setIsOpen] = useState(false);
  const imageUrl = typeof image === 'string' ? image : image.url;

  return (
    <div className="my-3 rounded-lg border border-ink-border hover:border-ink-faint bg-ink-surface transition-colors overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-ink-elevated transition-colors cursor-pointer select-none group"
      >
        <span className="text-[13px] font-medium text-ink-muted group-hover:text-ink-text transition-colors">
          Dry Run
        </span>

        <div className="flex items-center gap-1.5 text-xs text-ink-subtle group-hover:text-ink-muted font-medium transition-colors">
          <span>{isOpen ? 'Hide dry run' : 'View dry run'}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Smooth CSS Grid Collapse / Expand */}
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-3 border-t border-ink-border bg-[#0a0a0a]">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-zoom-in"
              title="Open full size in new tab"
            >
              <img
                src={imageUrl}
                alt="Recursion Tree"
                className="max-h-[650px] w-auto max-w-full rounded object-contain mx-auto"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
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

  // Only render tabs for approaches that actually exist and are defined for this problem
  const candidateApproaches = [
    { id: 'brute', label: 'Brute Force', data: problem.brute },
    { id: 'better', label: 'Better', data: problem.better },
    { id: 'optimal', label: 'Optimal', data: problem.optimal },
  ];
  const populated = candidateApproaches.filter(
    app => app.data && (Boolean(app.data.code?.trim()) || Boolean(app.data.idea?.trim()))
  );
  const approachList = populated.length > 0 ? populated : candidateApproaches.filter(app => Boolean(app.data));

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
          <span className={`text-xs font-semibold ${diffColorClass[problem.difficulty] || 'text-ink-muted'}`}>
            {problem.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {problem.leetcodeUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={problem.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-ink-surface border border-ink-border hover:border-amber-accent/50 hover:bg-ink-elevated transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#FFA116" />
                  </svg>
                </a>
              </TooltipTrigger>
              <TooltipContent>{problem.leetcodeUrl.includes('neetcode.io') ? 'NeetCode' : 'LeetCode'}</TooltipContent>
            </Tooltip>
          )}

          {problem.youtubeUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={problem.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-ink-surface border border-ink-border hover:border-red-500/50 hover:bg-ink-elevated transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000" />
                    <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF" />
                  </svg>
                </a>
              </TooltipTrigger>
              <TooltipContent>YouTube</TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 inline-flex items-center justify-center bg-ink-surface border-ink-border text-ink-muted hover:text-ink-text hover:border-ink-faint hover:bg-ink-elevated transition-colors"
                onClick={handleCopyLink}
              >
                {linkCopied ? <CheckCircle2 className="w-4 h-4 text-easy" /> : <LinkIcon className="w-4 h-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{linkCopied ? 'Copied!' : 'Copy link'}</TooltipContent>
          </Tooltip>

          <Button
            size="sm"
            onClick={onToggleRevised}
            className={`h-8 text-xs font-semibold transition-colors ${isRevised
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

      {/* Approaches Section - Only show tabs/header if more than 1 approach exists */}
      {approachList.length === 1 ? (
        <div className="mb-8">
          <ApproachContent
            approach={approachList[0].data}
            image={problem.image || approachList[0].data?.image}
          />
        </div>
      ) : approachList.length > 1 ? (
        <div className="mb-8">
          <h3 className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-3">Approaches</h3>
          <Tabs key={`${problem.id}-${approachList.map(a => a.id).join('-')}`} defaultValue={approachList[0].id} className="w-full">
            <TabsList className="bg-ink-surface border border-ink-border rounded-lg p-1 h-auto w-fit flex gap-1">
              {approachList.map(app => (
                <TabsTrigger
                  key={app.id}
                  value={app.id}
                  className="text-[13px] px-4 py-1.5 rounded-md text-ink-subtle data-[state=active]:bg-ink-elevated data-[state=active]:text-ink-text data-[state=active]:font-medium transition-all"
                >
                  {app.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-4">
              {approachList.map(app => (
                <TabsContent key={app.id} value={app.id} className="mt-0">
                  <ApproachContent
                    approach={app.data}
                    image={problem.image || app.data?.image}
                  />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      ) : null}

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
                <span
                  className={`text-xs font-medium shrink-0 ${diffColorClass[p.difficulty] || 'text-ink-muted'}`}
                >
                  {p.difficulty}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
