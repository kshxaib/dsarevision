import { useState } from 'react';
import Editor from '@monaco-editor/react';

const difficultyStyle = {
  Easy: 'text-emerald-400',
  Medium: 'text-amber-400',
  Hard: 'text-rose-400',
};

function ApproachSection({ label, approach }) {
  const isEmpty = !approach.idea && !approach.code;

  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden animate-fadeIn">
      <div className="px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]">
        <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{label}</h4>
      </div>
      <div className="p-5 space-y-5">
        {isEmpty ? (
          <p className="text-[var(--color-text-tertiary)] text-sm italic">Not yet added — fill in the approach details in problems.js</p>
        ) : (
          <>
            {approach.idea && (
              <div>
                <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1.5">Idea</p>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{approach.idea}</p>
              </div>
            )}
            {approach.code && (
              <div>
                <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1.5">Code</p>
                <div className="rounded-lg overflow-hidden border border-[var(--color-border)]">
                  <Editor
                    height={`${Math.min(Math.max(approach.code.trim().split('\n').length * 20, 80), 400)}px`}
                    language="javascript"
                    value={approach.code.trim()}
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
            )}
            {(approach.time || approach.space) && (
              <div className="flex gap-4 pt-1">
                {approach.time && (
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">Time</p>
                    <p className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{approach.time}</p>
                    {approach.timeDesc && (
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-relaxed">{approach.timeDesc}</p>
                    )}
                  </div>
                )}
                {approach.space && (
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">Space</p>
                    <p className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{approach.space}</p>
                    {approach.spaceDesc && (
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-relaxed">{approach.spaceDesc}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ProblemDetail({ problem, onBack }) {
  const [activeTab, setActiveTab] = useState('brute');

  const tabs = [
    { key: 'brute', label: 'Brute Force' },
    { key: 'better', label: 'Better' },
    { key: 'optimal', label: 'Optimal' },
  ];

  const hasExamples = problem.examples.some(e => e.input || e.output);

  return (
    <div className="animate-fadeIn">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors mb-6 cursor-pointer text-sm"
      >
        <span>←</span>
        <span>Back</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{problem.title}</h2>
          <span className={`text-xs font-medium ${difficultyStyle[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>
        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{problem.definition}</p>
      </div>

      {/* Examples */}
      {hasExamples && (
        <div className="mb-8 space-y-3">
          <h3 className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">Examples</h3>
          {problem.examples.map((ex, i) => (
            ex.input || ex.output ? (
              <div key={i} className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-lg p-4">
                <p className="text-[11px] text-[var(--color-text-tertiary)] mb-2">Example {i + 1}</p>
                {ex.input && (
                  <div className="flex gap-2 mb-1">
                    <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] shrink-0 mt-0.5">Input:</span>
                    <code className="text-sm font-mono text-[var(--color-text-secondary)]">{ex.input}</code>
                  </div>
                )}
                {ex.output && (
                  <div className="flex gap-2">
                    <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] shrink-0 mt-0.5">Output:</span>
                    <code className="text-sm font-mono text-emerald-400">{ex.output}</code>
                  </div>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Approach Tabs */}
      <div className="mb-4">
        <h3 className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">Approaches</h3>
        <div className="flex gap-0 border border-[var(--color-border)] rounded-lg overflow-hidden w-fit">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-[13px] font-medium transition-colors duration-100 cursor-pointer ${
                i > 0 ? 'border-l border-[var(--color-border)]' : ''
              } ${
                activeTab === tab.key
                  ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-raised)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Approach */}
      {tabs.map(tab => (
        activeTab === tab.key && (
          <ApproachSection
            key={tab.key}
            label={tab.label}
            approach={problem[tab.key]}
          />
        )
      ))}
    </div>
  );
}
