import { useState } from 'react';
import Editor from '@monaco-editor/react';

const difficultyColor = {
  Easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Hard: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

function ApproachSection({ label, approach, accentClass }) {
  const isEmpty = !approach.idea && !approach.code;

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 overflow-hidden">
      <div className={`px-5 py-3 border-b border-slate-700/60 ${accentClass}`}>
        <h4 className="font-semibold text-sm tracking-wide uppercase">{label}</h4>
      </div>
      <div className="p-5 space-y-4">
        {isEmpty ? (
          <p className="text-slate-500 italic text-sm">Not yet added — fill in the approach details in problems.js</p>
        ) : (
          <>
            {approach.idea && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Idea</p>
                <p className="text-slate-300 text-sm leading-relaxed">{approach.idea}</p>
              </div>
            )}
            {approach.code && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Code</p>
                <div className="rounded-lg overflow-hidden border border-slate-700/50">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {approach.time && (
                  <div className="rounded-xl bg-slate-900/60 border border-slate-700/60 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Time Complexity:</span>
                      <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/15 px-2.5 py-0.5 rounded-md border border-indigo-500/30">
                        {approach.time}
                      </span>
                    </div>
                    {approach.timeDesc && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {approach.timeDesc}
                      </p>
                    )}
                  </div>
                )}
                {approach.space && (
                  <div className="rounded-xl bg-slate-900/60 border border-slate-700/60 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Space Complexity:</span>
                      <span className="text-xs font-mono font-bold text-violet-400 bg-violet-500/15 px-2.5 py-0.5 rounded-md border border-violet-500/30">
                        {approach.space}
                      </span>
                    </div>
                    {approach.spaceDesc && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {approach.spaceDesc}
                      </p>
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
    { key: 'brute', label: 'Brute Force', accent: 'bg-rose-500/10 text-rose-400' },
    { key: 'better', label: 'Better', accent: 'bg-amber-500/10 text-amber-400' },
    { key: 'optimal', label: 'Optimal', accent: 'bg-emerald-500/10 text-emerald-400' },
  ];

  const hasExamples = problem.examples.some(e => e.input || e.output);

  return (
    <div className="animate-fadeIn">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-6 group cursor-pointer"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back to problems</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl font-bold text-slate-100">{problem.title}</h2>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${difficultyColor[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>
        <p className="text-slate-400 leading-relaxed">{problem.definition}</p>
      </div>

      {/* Examples */}
      {hasExamples && (
        <div className="mb-8 space-y-3">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Examples</h3>
          {problem.examples.map((ex, i) => (
            ex.input || ex.output ? (
              <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-500 mb-2">Example {i + 1}</p>
                {ex.input && (
                  <div className="flex gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-400 shrink-0 mt-0.5">Input:</span>
                    <code className="text-sm font-mono text-slate-300">{ex.input}</code>
                  </div>
                )}
                {ex.output && (
                  <div className="flex gap-2">
                    <span className="text-xs font-semibold text-slate-400 shrink-0 mt-0.5">Output:</span>
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
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Approaches</h3>
        <div className="flex gap-1 bg-slate-800/50 p-1 rounded-lg border border-slate-700/50 w-fit">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-slate-700 text-slate-100 shadow-sm'
                  : 'text-slate-400 hover:text-slate-300'
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
            accentClass={tab.accent}
          />
        )
      ))}
    </div>
  );
}
