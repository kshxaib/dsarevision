export default function StepWalkthrough({ walkthrough }) {
  if (!walkthrough) return null;

  // Normalize steps to array of strings
  let steps = [];

  if (Array.isArray(walkthrough)) {
    steps = walkthrough.map(s => (typeof s === 'string' ? s : s.explanation || JSON.stringify(s)));
  } else if (typeof walkthrough === 'object') {
    if (Array.isArray(walkthrough.steps)) {
      steps = walkthrough.steps.map(s => (typeof s === 'string' ? s : s.explanation || ''));
    } else {
      steps = Object.values(walkthrough).filter(v => typeof v === 'string');
    }
  } else if (typeof walkthrough === 'string') {
    steps = walkthrough.split('\n').filter(line => line.trim().length > 0);
  }

  if (steps.length === 0) return null;

  return (
    <div className="pt-2">
      <p className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-2">
        Walkthrough
      </p>
      <div className="divide-y divide-ink-border border-y border-ink-border">
        {steps.map((text, idx) => (
          <div
            key={idx}
            className="py-3 text-[13px] sm:text-sm text-ink-text leading-relaxed font-sans"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
