export const javaVault = {
  id: 'java',
  title: 'Java & JVM Internals',
  shortTitle: 'Java',
  category: 'Languages',
  icon: 'Coffee',
  accentColor: '#EF4444', // red-500
  description: 'JVM Memory Architecture, Garbage Collection, Multithreading & Concurrency (volatile, synchronized), HashMap internals, and Java 8+ features.',
  tags: ['JVM Internals', 'Garbage Collection', 'Multithreading', 'volatile & synchronized', 'HashMap Collision', 'Streams & Lambdas'],
  questions: [
    {
      id: 'java-q1',
      number: '01',
      topic: 'JVM Architecture',
      question: 'Explain JVM Architecture (Classloader, Runtime Data Areas, Execution Engine).',
      interviewTips: 'Break it clearly into ClassLoader -> Runtime Data Areas (Heap, Stack, Method Area, PC, Native Stack) -> Execution Engine (JIT Compiler, GC).',
      answer: `• 1. ClassLoader Subsystem:
  - Loading: Bootstrap ClassLoader -> Extension/Platform ClassLoader -> Application ClassLoader.
  - Linking: Verify (bytecode verification) -> Prepare (allocate static variables memory) -> Resolve (symbolic to direct references).
  - Initialization: Executes static blocks and assigns initial values to static variables.

• 2. Runtime Data Areas:
  - Heap: Shared across all threads. Stores all objects and instances. Divided into Young Generation (Eden, S0, S1) and Old Generation.
  - Method Area / Metaspace: Stores class structures, field/method data, runtime constant pool. (Moved to native memory in Java 8).
  - JVM Stack: Thread-private. Stores stack frames containing local variables, operand stack, and frame data.
  - Program Counter (PC) Register: Thread-private. Holds current instruction address.
  - Native Method Stack: Thread-private. Supports C/C++ native calls (JNI).

• 3. Execution Engine:
  - Interpreter (reads bytecode instruction by instruction).
  - JIT (Just-In-Time) Compiler: Compiles frequently executed "hot" bytecode into native machine code.
  - Garbage Collector (GC): Automatically reclaims unreachable heap objects.`
    },
    {
      id: 'java-q2',
      number: '02',
      topic: 'Collections Framework',
      question: 'How does HashMap work internally in Java? (Hashing, Rehashing, Treeify Threshold).',
      interviewTips: 'Java 8 optimizes linked list collision buckets to Red-Black Trees when bucket size exceeds TREEIFY_THRESHOLD (8).',
      answer: `• Structure:
  - Array of Nodes: Node<K, V>[] table (default initial capacity = 16, load factor = 0.75).
  - Node contains: final int hash, final K key, V value, Node<K, V> next.

• Insertion Flow (put(key, value)):
  1. Calculates hash: int hash = (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16) (Spreads higher bits to minimize collision).
  2. Bucket index: index = (n - 1) & hash (bitwise AND equivalent to modulo when n is power of 2).
  3. Collision Handling:
     - If bucket empty: creates new Node.
     - If bucket occupied: checks equals(). If key equals, overrides value.
     - If different keys hash to same bucket: adds to linked list.
     - Java 8 Optimization: When bucket chain length reaches 8 and total capacity >= 64, converts the linked list into a Balanced Red-Black Tree (TreeMap), reducing lookup from O(n) to O(log n).
  4. Resizing: When total elements exceed threshold (capacity × 0.75 = 12), capacity doubles (32), and elements are rehashed.`
    },
    {
      id: 'java-q3',
      number: '03',
      topic: 'Concurrency & Multithreading',
      question: 'volatile vs synchronized vs ReentrantLock: How does Java handle thread safety?',
      interviewTips: 'volatile guarantees Visibility (prevents CPU core caching) but does NOT guarantee Atomicity (count++ is not thread-safe with volatile).',
      answer: `• volatile Keyword:
  - Guarantees Visibility across CPU caches: Every read reads from main RAM; every write writes directly to main RAM.
  - Prevents instruction reordering (Memory Barrier).
  - Does NOT guarantee Atomicity: Compound operations like count++ (read, increment, write) still require synchronized or AtomicInteger.

• synchronized Keyword:
  - Mutual exclusion lock (Intrinsic Monitor Lock).
  - Guarantees both Atomicity and Visibility.
  - Only one thread can execute a synchronized method or synchronized(this) block at a time.
  - Releases lock automatically even if an exception is thrown.

• ReentrantLock:
  - Part of java.util.concurrent.locks.
  - Advantages over synchronized:
    - tryLock(timeout) avoids blocking indefinitely.
    - Supports Fairness policy (threads acquire lock in FIFO arrival order).
    - Supports multiple Condition variables (signal() / await()).
    - Must manually unlock in a finally block.`
    }
  ]
};
