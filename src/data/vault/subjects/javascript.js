export const javascriptVault = {
  id: 'javascript',
  title: 'JavaScript & ES6+',
  shortTitle: 'JavaScript',
  category: 'Web & Frameworks',
  icon: 'FileCode',
  accentColor: '#FBBF24', // amber-400
  description: 'Event Loop, Microtasks vs Macrotasks, Closures, Prototypal Inheritance, Promises & Async/Await, Hoisting, and Debounce vs Throttle.',
  tags: ['Event Loop', 'Closures', 'Promises & Async', 'Prototypes', 'Hoisting', 'Debounce & Throttle'],
  questions: [
    {
      id: 'js-q1',
      number: '01',
      topic: 'Event Loop & Runtime',
      question: 'Explain the JavaScript Event Loop, Microtask Queue, and Macrotask Queue.',
      interviewTips: 'Predicting console.log output order with setTimeout vs Promise.resolve().then() is ubiquitous in JS interviews.',
      answer: `• JavaScript is single-threaded and non-blocking, powered by an Event Loop.
• Runtime Components:
  1. Call Stack: Executes synchronous code frames (LIFO).
  2. Web APIs (Browser / Node C++ APIs): Handles timers, fetch requests, DOM events in background threads.
  3. Microtask Queue: Highest priority queue. Contains Promise callbacks (.then, .catch, .finally), queueMicrotask(), and MutationObserver.
  4. Macrotask (Task) Queue: Lower priority queue. Contains setTimeout, setInterval, setImmediate, and I/O callbacks.

• Event Loop Execution Rule:
  1. Execute all synchronous code in the Call Stack until empty.
  2. Drain the entire Microtask Queue completely (including microtasks spawned while draining).
  3. Render UI updates if needed.
  4. Pick ONE macrotask from Macrotask Queue and push it to Call Stack.
  5. Repeat loop.

• Code Output Example:
\`\`\`javascript
console.log('1');
setTimeout(() => console.log('2'), 0); // Macrotask
Promise.resolve().then(() => console.log('3')); // Microtask
console.log('4');
// Output Order: 1 -> 4 -> 3 -> 2
\`\`\``
    },
    {
      id: 'js-q2',
      number: '02',
      topic: 'Closures & Scope',
      question: 'What is a Closure in JavaScript and what are its practical use cases?',
      interviewTips: 'A closure is created every time a function is created at function creation time.',
      answer: `• Definition:
  - A closure is a function bundled together with references to its surrounding lexical environment.
  - Gives an inner function access to an outer function's scope even after the outer function has returned and finished executing.

• Practical Use Cases:
  1. Data Privacy / Private Variables (Module Pattern):
\`\`\`javascript
function createCounter() {
  let count = 0; // Private variable encapsulated in closure
  return {
    increment: () => ++count,
    getCount: () => count
  };
}
const counter = createCounter();
counter.increment(); // 1
console.log(counter.count); // undefined (cannot access private variable)
\`\`\`
  2. Function Currying & Partial Application.
  3. Maintaining state in asynchronous callbacks and event handlers.`
    },
    {
      id: 'js-q3',
      number: '03',
      topic: 'Execution & Hoisting',
      question: 'What is Hoisting? Compare var, let, and const (Temporal Dead Zone).',
      interviewTips: 'Clarify that let and const ARE hoisted, but they remain uninitialized in the TDZ until execution reaches the declaration line.',
      answer: `• Hoisting:
  - During the creation phase of the execution context, variable and function declarations are scanned and allocated in memory before code executes.

• var vs let vs const:
  - var:
    - Function-scoped.
    - Hoisted and initialized with 'undefined'.
    - Can be re-declared and updated.
  - let & const:
    - Block-scoped (bounded by curly braces {}).
    - Hoisted to top of block, but NOT initialized.
    - Temporal Dead Zone (TDZ): The region between start of block and declaration line. Accessing them inside TDZ throws ReferenceError.
    - const cannot be reassigned and must be initialized upon declaration.`
    },
    {
      id: 'js-q4',
      number: '04',
      topic: 'Asynchronous JS',
      question: 'Explain Promises, Promise.all vs Promise.allSettled vs Promise.race.',
      interviewTips: 'Promise.all fails-fast on first rejection. Promise.allSettled waits for all promises regardless of rejection.',
      answer: `• Promise Combinators:
  1. Promise.all([p1, p2, p3]):
     - Waits for ALL promises to resolve.
     - Short-circuits immediately (fails fast) if ANY single promise rejects.
  2. Promise.allSettled([p1, p2, p3]):
     - Waits for ALL promises to complete (resolved or rejected).
     - Never rejects; returns an array of objects: { status: 'fulfilled', value } or { status: 'rejected', reason }.
  3. Promise.race([p1, p2, p3]):
     - Settles as soon as the FIRST promise settles (resolves OR rejects).
  4. Promise.any([p1, p2, p3]):
     - Resolves as soon as the FIRST promise resolves successfully. Ignores rejections unless ALL reject (AggregateError).`
    },
    {
      id: 'js-q5',
      number: '05',
      topic: 'Performance & Optimization',
      question: 'Debounce vs Throttle: What are they and how to implement them?',
      interviewTips: 'Debounce: Search bar autocomplete. Throttle: Window resize or infinite scroll handlers.',
      answer: `• Debounce:
  - Delays execution until after a specified silence period has passed since the last event invocation.
\`\`\`javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
\`\`\`

• Throttle:
  - Guarantees execution at most once per specified time interval, regardless of how many times triggered.
\`\`\`javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
\`\`\``
    }
  ]
};
