export const nodejsVault = {
  id: 'nodejs',
  title: 'Node.js & Backend Architecture',
  shortTitle: 'Node.js',
  category: 'Web & Frameworks',
  icon: 'Server',
  accentColor: '#22C55E', // green-500
  description: 'Libuv Architecture, Event Loop Phases, Streams & Buffers, Worker Threads vs Cluster Module, and Error Handling.',
  tags: ['Libuv', 'Event Loop', 'Streams', 'Buffers', 'Cluster & Workers', 'Middleware', 'Performance'],
  questions: [
    {
      id: 'node-q1',
      number: '01',
      topic: 'Architecture & Event Loop',
      question: 'Explain Node.js Architecture (V8 + Libuv) and the 6 phases of the Node.js Event Loop.',
      interviewTips: 'Differentiate process.nextTick() (runs immediately after current operation, before the next phase) from setImmediate().',
      answer: `• Architecture:
  - V8 Engine: Compiles and executes JavaScript to machine code.
  - Libuv: C library that abstracts non-blocking asynchronous I/O and provides a multi-threaded Thread Pool (default 4 threads, configurable via UV_THREADPOOL_SIZE) for blocking tasks like fs, crypto, and zlib.

• Node.js Event Loop 6 Phases:
  1. Timers: Executes callbacks scheduled by setTimeout() and setInterval().
  2. Pending Callbacks: Executes I/O callbacks deferred to the next loop iteration (e.g., system errors).
  3. Idle, Prepare: Used internally by Libuv only.
  4. Poll: Retrieves new I/O events; calculates how long to block; executes I/O callbacks.
  5. Check: Executes setImmediate() callbacks.
  6. Close Callbacks: Executes close event handlers (e.g. socket.on('close', ...)).

• process.nextTick() vs setImmediate():
  - process.nextTick() is NOT part of the event loop phases; its queue is processed immediately after the current operation finishes, before moving to ANY event loop phase.`
    },
    {
      id: 'node-q2',
      number: '02',
      topic: 'Streams & Buffers',
      question: 'What are Streams and Buffers in Node.js, and why are they critical for scale?',
      interviewTips: 'Give the classic 2GB video file example: Buffering loads 2GB into RAM, crashing the server; Streaming uses chunks of ~64KB.',
      answer: `• Buffer:
  - Raw binary data allocated outside the V8 JavaScript heap in fixed-size chunks of physical memory.

• Streams:
  - Collections of data that might not be available all at once and don't have to fit in memory.
  - Four fundamental types:
    1. Readable (fs.createReadStream, req)
    2. Writable (fs.createWriteStream, res)
    3. Duplex (net.Socket - both read and write)
    4. Transform (zlib.createGzip - modifies data as it is read/written)

• Why Streams Matter:
  - Memory Efficiency: Chunks of ~64KB are processed sequentially via pipeline() or pipe().
  - Backpressure Handling: If the destination (Writable) is slower than source (Readable), streams pause reading automatically to prevent memory overflow.`
    },
    {
      id: 'node-q3',
      number: '03',
      topic: 'Concurrency & Scaling',
      question: 'Cluster Module vs Worker Threads: How do you scale CPU-heavy workloads in Node.js?',
      interviewTips: 'Cluster = multiple isolated Node processes sharing a server port. Worker Threads = multiple OS threads sharing memory via SharedArrayBuffer within one process.',
      answer: `• Cluster Module (Multi-Process):
  - Spawns multiple instances of the Node.js process (one per CPU core) using child_process.fork().
  - Master process listens on the network port and distributes incoming connections using Round-Robin (except on Windows).
  - Processes have isolated memory spaces; IPC occurs via message passing.
  - Best for: Scaling web server throughput across multi-core servers.

• Worker Threads (Multi-Threading):
  - Run multiple threads within a SINGLE Node.js process using the worker_threads module.
  - Can share memory directly using SharedArrayBuffer.
  - Best for: CPU-intensive operations that would block the Event Loop (Image/video processing, cryptographic hashing, complex mathematical calculations).`
    }
  ]
};
