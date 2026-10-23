export const reactVault = {
  id: 'react',
  title: 'React.js & Architecture',
  shortTitle: 'React',
  category: 'Web & Frameworks',
  icon: 'Atom',
  accentColor: '#38BDF8', // sky-400
  description: 'Virtual DOM, Reconciliation & Diffing, Fiber Architecture, Hooks (useEffect, useMemo, useCallback), State Management, and Performance.',
  tags: ['Virtual DOM', 'Reconciliation', 'React Fiber', 'Hooks', 'useMemo & useCallback', 'Performance', 'Custom Hooks'],
  questions: [
    {
      id: 'react-q1',
      number: '01',
      topic: 'Core Architecture',
      question: 'How does the Virtual DOM work and what is React Reconciliation (Diffing Algorithm)?',
      interviewTips: 'Mention why keys are essential in lists (enables React to track which items changed, added, or removed without re-rendering all siblings).',
      answer: `• Virtual DOM (VDOM):
  - A lightweight, in-memory JavaScript representation of the real DOM.
  - Updating real DOM nodes is computationally expensive (triggers layout reflow & repaints); manipulating JS objects is extremely fast.

• Reconciliation Process:
  1. Render: When component state changes, React generates a new Virtual DOM tree.
  2. Diffing: React compares the new VDOM tree with the previous snapshot using an O(n) heuristic diffing algorithm:
     - Different element types (e.g. <div> to <span>) unmount old tree and destroy its state.
     - Same element types: React preserves underlying DOM node and only patches changed attributes/styles.
     - Children with keys: React uses 'key' prop to match existing children in the new tree, avoiding wasteful recreation.
  3. Commit: React batches and applies the minimal set of calculated mutations to the real browser DOM in one go.`
    },
    {
      id: 'react-q2',
      number: '02',
      topic: 'Hooks',
      question: 'Explain useMemo vs useCallback with practical examples. When should you NOT use them?',
      interviewTips: 'Overusing useMemo/useCallback introduces memory overhead and dependency array comparison costs that can exceed simple recalculations.',
      answer: `• useMemo(callback, deps):
  - Caches the RESULT of an expensive computation.
  - Recomputes only when one of the dependencies changes.
\`\`\`javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

• useCallback(callback, deps):
  - Caches the FUNCTION INSTANCE itself across re-renders.
  - Crucial when passing callbacks to memoized child components (React.memo) to prevent unnecessary child re-renders due to referential inequality.
\`\`\`javascript
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
\`\`\`

• When NOT to use them:
  - Trivial, cheap calculations (e.g., filtering an array of 10 items or primitive math).
  - Passing callbacks to standard native DOM elements (<button onClick={fn}>).`
    },
    {
      id: 'react-q3',
      number: '03',
      topic: 'Hooks',
      question: 'Explain the useEffect lifecycle, dependency array nuances, and cleanup functions.',
      interviewTips: 'Explain how cleanup prevents memory leaks in subscriptions, event listeners, and timers.',
      answer: `• Dependency Array Variations:
  1. useEffect(() => { ... }) (No array): Runs after EVERY single render.
  2. useEffect(() => { ... }, []) (Empty array): Runs ONCE after initial mount (equivalent to componentDidMount).
  3. useEffect(() => { ... }, [a, b]) (With deps): Runs on mount and whenever 'a' or 'b' change referentially.

• Cleanup Function:
  - Returned function inside useEffect:
\`\`\`javascript
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  return () => {
    // Cleanup runs before component unmounts and before re-running effect on dependency change
    window.removeEventListener('resize', handleResize);
  };
}, []);
\`\`\``
    },
    {
      id: 'react-q4',
      number: '04',
      topic: 'Performance',
      question: 'How do you optimize performance in a large React application?',
      interviewTips: 'Mention React DevTools Profiler, React.lazy code splitting, virtualization (react-window), and transition APIs.',
      answer: `1. Code Splitting & Lazy Loading:
   - Use React.lazy() and Suspense to dynamically load routes and heavyweight modals only when needed.
2. Windowing / List Virtualization:
   - For long lists (1,000+ items), use @tanstack/react-virtual or react-window to render only visible viewport items.
3. Memoization:
   - Wrap pure presentational components in React.memo().
   - Use useCallback and useMemo to preserve reference stability.
4. State Colocation:
   - Keep state as close to where it is used as possible. Avoid pushing fast-updating state (e.g., input values) to global store.
5. Concurrent Features (React 18+):
   - Use useTransition and useDeferredValue to mark non-urgent UI updates as interruptible, keeping input responses snappy.`
    }
  ]
};
