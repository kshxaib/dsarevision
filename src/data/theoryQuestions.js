export const theoryCategories = [
  'All',
  'Fundamentals',
  'Arrays',
  'Linked Lists',
  'Stacks & Queues',
  'Trees',
  'Graphs'
];

export const theoryQuestions = [
  {
    id: 'what-is-a-data-structure',
    number: '01',
    question: 'What is a Data Structure?',
    category: 'Fundamentals',
    timestamp: '0:22',
    timestampSeconds: 22,
    youtubeUrl: 'https://www.youtube.com/watch?t=22s',
    summary: 'A way to store and organize data in memory for efficient access, processing, and modification. Categorized into Linear and Non-linear structures.',
    interviewAnswer: {
      definition: 'A data structure is a specialized format for organizing, storing, and managing data in computer memory so that specific operations can be performed with high efficiency.',
      keyPoints: [
        'Defines not only the data storage format, but also the mathematical and logical relationships between data items and legal operations allowed on them.',
        'Directly impacts performance: choosing the right data structure minimizes Time Complexity (execution speed) and Space Complexity (memory footprint).',
        'Can be broadly classified into Linear and Non-Linear structures, as well as Static and Dynamic structures.'
      ],
      classification: [
        {
          type: 'Linear Data Structures',
          desc: 'Elements are arranged sequentially; each element has a unique predecessor and successor (except the first and last elements). Examples: Arrays, Linked Lists, Stacks, Queues.'
        },
        {
          type: 'Non-Linear Data Structures',
          desc: 'Elements are arranged hierarchically or interconnected in interconnected networks. Examples: Trees, Graphs, Heaps, Tries.'
        },
        {
          type: 'Static vs. Dynamic',
          desc: 'Static structures have a fixed memory size declared at compile-time (e.g., standard Arrays). Dynamic structures grow or shrink dynamically in heap memory during runtime (e.g., Linked Lists, Dynamic Arrays).'
        }
      ]
    }
  },
  {
    id: 'what-is-an-array',
    number: '02',
    question: 'What is an array?',
    category: 'Arrays',
    timestamp: '1:22',
    timestampSeconds: 82,
    youtubeUrl: 'https://www.youtube.com/watch?t=82s',
    summary: 'A collection of elements of the same data type stored in contiguous memory locations with fixed size.',
    interviewAnswer: {
      definition: 'An array is a linear data structure that stores a collection of elements of the identical data type in contiguous (sequential) memory blocks.',
      keyPoints: [
        'Contiguous Memory: Elements are stored side-by-side in RAM, allowing constant-time O(1) direct random access via indexing.',
        'Address Formula: Address(A[i]) = Base_Address + (i * Element_Size). Pointer arithmetic enables instant lookup without traversing prior elements.',
        'Fixed Capacity (Static): Standard arrays have a fixed size decided at initialization and cannot be resized without allocating a new block.',
        'Cache Locality: Contiguous physical layout provides high spatial locality of reference, maximizing CPU cache hit rates.'
      ],
      complexities: {
        access: 'O(1) - Instant by index',
        search: 'O(n) linear search, O(log n) if sorted (binary search)',
        insertion: 'O(n) due to shifting subsequent elements',
        deletion: 'O(n) due to shifting remaining elements left'
      }
    }
  },
  {
    id: 'what-is-a-multi-dimensional-array',
    number: '03',
    question: 'What is a multi-dimensional array?',
    category: 'Arrays',
    timestamp: '2:14',
    timestampSeconds: 134,
    youtubeUrl: 'https://www.youtube.com/watch?t=134s',
    summary: "An 'array of arrays' (such as 2D matrices or 3D grids) used to store multi-dimensional tabular data like rows and columns.",
    interviewAnswer: {
      definition: 'A multi-dimensional array is an array that contains other arrays as its elements. The most common is a 2D array, which represents data in tabular rows and columns.',
      keyPoints: [
        'Conceptually Multi-dimensional, Physically 1-dimensional: Computer RAM is strictly a single contiguous address space. Multi-dimensional coordinates (row, col) are mapped to 1D physical addresses.',
        'Row-Major Order (Used by C, C++, Java): Elements of row 0 are placed first, followed by row 1, etc. Index formula: Address(A[i][j]) = Base + ((i * total_cols) + j) * size.',
        'Column-Major Order (Used by Fortran, MATLAB): Columns are stored contiguously in memory.',
        'Practical Applications: Image pixel buffers (RGB 3D array), Dynamic Programming grids, Graph adjacency matrices, and game boards (Chess, Sudoku).'
      ]
    }
  },
  {
    id: 'what-is-a-linked-list',
    number: '04',
    question: 'What is a linked list?',
    category: 'Linked Lists',
    timestamp: '3:23',
    timestampSeconds: 203,
    youtubeUrl: 'https://www.youtube.com/watch?t=203s',
    summary: 'A linear data structure consisting of discrete nodes connected by pointers/references, where each node holds data and the address of the next node.',
    interviewAnswer: {
      definition: 'A linked list is a linear, dynamic data structure where elements (nodes) are allocated in heap memory and connected using references or pointers rather than contiguous memory slots.',
      keyPoints: [
        'Node Anatomy: Each node consists of two parts: (1) Data payload, and (2) Pointer/reference to the next node in the sequence.',
        'Head & Tail: Traversal begins at the `head` pointer. The sequence ends when a node points to `null` (the tail).',
        'Dynamic Allocation: Memory is requested node-by-node at runtime, eliminating the need to declare a fixed capacity upfront.',
        'Sequential Access: Does not support O(1) random access; reaching index k requires traversing k nodes from the head in O(k) time.'
      ],
      types: [
        'Singly Linked List: Each node points only to the next node (unidirectional).',
        'Doubly Linked List: Each node contains both next and previous pointers (bidirectional).',
        'Circular Linked List: The last node points back to the head node, forming a closed ring.'
      ]
    }
  },
  {
    id: 'advantages-of-linked-list-over-arrays',
    number: '05',
    question: 'Advantages of linked list over arrays?',
    category: 'Linked Lists',
    timestamp: '4:15',
    timestampSeconds: 255,
    youtubeUrl: 'https://www.youtube.com/watch?t=255s',
    summary: 'Dynamic size, zero memory pre-allocation wastage, and O(1) insertion/deletion at known positions without element shifting.',
    interviewAnswer: {
      definition: 'While arrays excel at fast index access, linked lists provide superior flexibility for dynamic updates and variable-sized collections.',
      advantages: [
        {
          title: 'Dynamic Sizing',
          detail: 'Grows or shrinks at runtime without needing fixed buffer allocation or expensive O(n) reallocation and copying when capacity is exceeded.'
        },
        {
          title: 'O(1) Insertion & Deletion',
          detail: 'Adding or removing a node at the head or after a known node takes O(1) pointer updates. In contrast, arrays require shifting up to n elements: O(n).'
        },
        {
          title: 'Zero Memory Pre-allocation Waste',
          detail: 'Memory is allocated only when a node is added, unlike arrays which must reserve unused contiguous space in advance.'
        }
      ],
      tradeoffs: [
        'Memory Overhead: Each node requires extra memory to store pointer references (4 or 8 bytes per pointer).',
        'No Random Access: Must traverse sequentially from head O(n) to reach an index.',
        'Cache Performance: Nodes are scattered throughout the heap, leading to more CPU cache misses compared to arrays.'
      ]
    }
  },
  {
    id: 'what-is-a-doubly-linked-list',
    number: '06',
    question: 'What is a doubly linked list?',
    category: 'Linked Lists',
    timestamp: '5:13',
    timestampSeconds: 313,
    youtubeUrl: 'https://www.youtube.com/watch?t=313s',
    summary: 'A linked list where each node maintains two pointers: one pointing forward to the next node and one pointing backward to the previous node.',
    interviewAnswer: {
      definition: 'A Doubly Linked List (DLL) is a two-way linked list where each node contains a data field, a `next` pointer pointing to the successor, and a `prev` pointer pointing to the predecessor.',
      keyPoints: [
        'Bidirectional Traversal: Can be traversed forward (head to tail) and backward (tail to head) with equal ease.',
        'O(1) Node Deletion Given Reference: In a singly linked list, deleting a node requires finding its previous node in O(n) time. In a DLL, node.prev.next = node.next and node.next.prev = node.prev achieve true O(1) deletion.',
        'Efficient Insertions Before a Node: A new node can be inserted immediately before any referenced node in O(1).',
        'Trade-off: Consumes more memory per node (two pointer fields) and requires careful handling to keep bidirectional pointers synchronized.'
      ],
      applications: [
        'LRU Cache (Least Recently Used): Paired with a HashMap to achieve O(1) get and put operations with eviction.',
        'Navigation Systems: Undo/Redo operations and browser Forward/Backward history.'
      ]
    }
  },
  {
    id: 'applications-of-a-linked-list',
    number: '07',
    question: 'Applications of a linked list?',
    category: 'Linked Lists',
    timestamp: '6:13',
    timestampSeconds: 373,
    youtubeUrl: 'https://www.youtube.com/watch?t=373s',
    summary: 'Implementing Stacks and Queues, OS directory maintenance and process scheduling, browser history, music players, and hash collision chaining.',
    interviewAnswer: {
      definition: 'Linked lists serve as fundamental building blocks across systems software, operating systems, and application architecture where dynamic ordering is essential.',
      applications: [
        {
          domain: 'Core Data Structures',
          detail: 'Forms the underlying implementation of dynamic Stacks, Queues, Deques, and Graph Adjacency Lists.'
        },
        {
          domain: 'Hash Table Chaining',
          detail: 'Separate Chaining collision resolution in HashMaps (e.g., Java HashMap buckets before converting to Red-Black trees).'
        },
        {
          domain: 'Operating Systems',
          detail: 'Task scheduling queues (Ready Queue, Blocked Queue) and free-memory block tracking lists (malloc/free implementations).'
        },
        {
          domain: 'Media Players & Viewers',
          detail: 'Next/Previous track playlists (Circular Doubly Linked Lists allow infinite circular looping).'
        },
        {
          domain: 'Polynomial Arithmetic',
          detail: 'Representing and manipulating sparse mathematical polynomials with variable degrees and coefficients.'
        }
      ]
    }
  },
  {
    id: 'what-is-a-stack',
    number: '08',
    question: 'What is a stack?',
    category: 'Stacks & Queues',
    timestamp: '6:48',
    timestampSeconds: 408,
    youtubeUrl: 'https://www.youtube.com/watch?t=408s',
    summary: "A linear data structure following the LIFO (Last-In-First-Out) principle, where all additions and removals happen exclusively at the 'top'.",
    interviewAnswer: {
      definition: 'A stack is an abstract data type (ADT) operating under the LIFO (Last-In-First-Out) or FILO (First-In-Last-Out) discipline. Elements can only be pushed onto or popped from a single endpoint called the `top`.',
      keyPoints: [
        'Single Point of Access: All insertions and deletions take place at the `top` of the stack.',
        'Constant Time Operations: Core operations push, pop, and peek execute in strict O(1) time complexity.',
        'The Call Stack: Underlying mechanism used by programming language runtimes to execute function calls, recursion, and local scope management.',
        'Real-World Analogies: A stack of cafeteria plates, browser back-button stack, Ctrl+Z undo stack.'
      ]
    }
  },
  {
    id: 'basic-operations-of-a-stack',
    number: '09',
    question: 'Basic operations of a stack?',
    category: 'Stacks & Queues',
    timestamp: '8:05',
    timestampSeconds: 485,
    youtubeUrl: 'https://www.youtube.com/watch?t=485s',
    summary: 'Push (insert), Pop (remove top), Peek/Top (view top), IsEmpty (check empty), and IsFull (check full capacity).',
    interviewAnswer: {
      definition: 'Standard operations defined for the Stack ADT with constant time execution:',
      operations: [
        {
          name: 'Push(x)',
          time: 'O(1)',
          desc: 'Adds element x to the top of the stack. Guard against Stack Overflow if fixed-size array.'
        },
        {
          name: 'Pop()',
          time: 'O(1)',
          desc: 'Removes and returns the top element from the stack. Guard against Stack Underflow if empty.'
        },
        {
          name: 'Peek() / Top()',
          time: 'O(1)',
          desc: 'Returns the value of the top element without removing it.'
        },
        {
          name: 'IsEmpty()',
          time: 'O(1)',
          desc: 'Returns true if stack contains no elements (top == -1 or size == 0).'
        },
        {
          name: 'IsFull()',
          time: 'O(1)',
          desc: 'Returns true if an array-backed stack has reached its maximum allocated capacity.'
        }
      ],
      interviewTip: 'Always mention checking for Stack Overflow (when pushing to a full stack) and Stack Underflow (when popping from an empty stack) during coding interviews.'
    }
  },
  {
    id: 'what-is-a-queue',
    number: '10',
    question: 'What is a Queue?',
    category: 'Stacks & Queues',
    timestamp: '8:53',
    timestampSeconds: 533,
    youtubeUrl: 'https://www.youtube.com/watch?t=533s',
    summary: "A linear data structure following the FIFO (First-In-First-Out) principle, where elements are inserted at the 'rear' and removed from the 'front'.",
    interviewAnswer: {
      definition: 'A queue is an ordered linear collection where insertion takes place at one end (`rear` / `tail`) and deletion takes place at the opposite end (`front` / `head`), adhering to FIFO (First-In-First-Out).',
      keyPoints: [
        'FIFO Discipline: The first element added is guaranteed to be the first element removed (like a real-world checkout queue).',
        'Two Independent Pointers: Front tracks the next item to consume; Rear tracks where the next item arrives.',
        'Primary Types: Linear Queue, Circular Queue (wraps around to reuse vacant front slots), Priority Queue (orders by priority value), Deque (Double-Ended Queue).'
      ],
      applications: [
        'Breadth-First Search (BFS) graph and tree traversals.',
        'Asynchronous messaging systems (RabbitMQ, Kafka, AWS SQS).',
        'OS CPU scheduling (Round-Robin ready queue) and printer spooling.'
      ]
    }
  },
  {
    id: 'basic-operations-of-a-queue',
    number: '11',
    question: 'Basic operations of a queue?',
    category: 'Stacks & Queues',
    timestamp: '9:19',
    timestampSeconds: 559,
    youtubeUrl: 'https://www.youtube.com/watch?t=559s',
    summary: 'Enqueue (insert at rear), Dequeue (remove from front), Front/Peek (inspect head), Rear (inspect tail), and IsEmpty.',
    interviewAnswer: {
      definition: 'Core operations defining the Queue ADT:',
      operations: [
        {
          name: 'Enqueue(x)',
          time: 'O(1)',
          desc: 'Inserts element x at the rear of the queue. If fixed-capacity array, checks for Queue Overflow.'
        },
        {
          name: 'Dequeue()',
          time: 'O(1)',
          desc: 'Removes and returns the element at the front of the queue. Checks for Queue Underflow.'
        },
        {
          name: 'Front() / Peek()',
          time: 'O(1)',
          desc: 'Returns the front element without dequeuing it.'
        },
        {
          name: 'Rear()',
          time: 'O(1)',
          desc: 'Returns the latest element inserted at the rear without modifying the queue.'
        },
        {
          name: 'IsEmpty() / IsFull()',
          time: 'O(1)',
          desc: 'Verifies whether the queue has 0 elements or is at full allocated capacity.'
        }
      ],
      interviewTip: 'Explain how Circular Queues use modulo arithmetic (rear = (rear + 1) % capacity) to prevent false overflow when elements are dequeued.'
    }
  },
  {
    id: 'what-is-a-tree-data-structure',
    number: '12',
    question: 'What is a Tree data structure?',
    category: 'Trees',
    timestamp: '10:02',
    timestampSeconds: 602,
    youtubeUrl: 'https://www.youtube.com/watch?t=602s',
    summary: 'A non-linear, hierarchical data structure consisting of nodes connected by edges, with a single designated root node and no cycles.',
    interviewAnswer: {
      definition: 'A tree is an acyclic, connected, non-linear hierarchical data structure consisting of N nodes interconnected by exactly N - 1 edges, originating from a single root node.',
      keyPoints: [
        'Hierarchical Relationships: Models parent-child relationships unlike linear structures (arrays, linked lists).',
        'Acyclic Nature: There is exactly one unique path between any two nodes in a tree (no cycles or loops).',
        'Recursive Structure: Every node acts as the root of its own subtree, naturally favoring recursive algorithms.',
        'Efficiency Advantage: Balanced search trees achieve O(log n) search, insertion, and deletion, outperforming linked lists (O(n) search) and static arrays (O(n) insertion).'
      ],
      applications: [
        'File system directory hierarchies (folders and files).',
        'DOM (Document Object Model) in web browsers.',
        'Abstract Syntax Trees (AST) in compilers and interpreters.'
      ]
    }
  },
  {
    id: 'basic-tree-terminology',
    number: '13',
    question: 'Basic tree terminology?',
    category: 'Trees',
    timestamp: '10:32',
    timestampSeconds: 632,
    youtubeUrl: 'https://www.youtube.com/watch?t=632s',
    summary: 'Root, Edge, Parent, Child, Leaf, Sibling, Degree, Depth, and Height.',
    interviewAnswer: {
      definition: 'Key architectural terms used to describe and analyze tree structures:',
      terms: [
        { term: 'Root', desc: 'The topmost node of the tree with no parent. Every tree has exactly one root.' },
        { term: 'Edge', desc: 'The directed or undirected connection linking a parent node to its child.' },
        { term: 'Parent & Child', desc: 'If an edge connects node A to node B (downward), A is the parent and B is the child.' },
        { term: 'Leaf (External Node)', desc: 'A node with zero children (degree = 0).' },
        { term: 'Internal Node', desc: 'A non-leaf node with at least one child.' },
        { term: 'Siblings', desc: 'Nodes that share the exact same parent node.' },
        { term: 'Degree', desc: 'Degree of a node = number of children it has. Degree of tree = maximum degree among all nodes.' },
        { term: 'Depth of a Node', desc: 'Number of edges on the path from the root down to that node (Root depth = 0).' },
        { term: 'Height of a Node', desc: 'Number of edges on the longest downward path from that node to a leaf (Leaf height = 0).' },
        { term: 'Height of a Tree', desc: 'The height of the root node (maximum depth of any leaf).' }
      ]
    }
  },
  {
    id: 'what-are-binary-trees',
    number: '14',
    question: 'What are Binary Trees?',
    category: 'Trees',
    timestamp: '12:26',
    timestampSeconds: 746,
    youtubeUrl: 'https://www.youtube.com/watch?t=746s',
    summary: 'A hierarchical tree structure where each parent node can have at most two children, known as the left child and right child.',
    interviewAnswer: {
      definition: 'A binary tree is a specialized tree structure where the degree of every node is at most 2 (i.e., each node has 0, 1, or 2 children: designated as `left` and `right`).',
      keyPoints: [
        'Node Structure: Contains data, a left pointer/reference, and a right pointer/reference.',
        'Maximum Nodes at Level l: 2^l (where root is level 0).',
        'Maximum Nodes in Tree of Height h: 2^(h + 1) - 1.',
        'Minimum Height with N Nodes: ⌈log₂(N + 1)⌉ - 1 (achieved when completely balanced).'
      ],
      types: [
        'Full Binary Tree: Every node has either 0 or 2 children.',
        'Complete Binary Tree: All levels filled except possibly the last, which is filled left-to-right.',
        'Perfect Binary Tree: All internal nodes have 2 children, and all leaves are at the exact same level.',
        'Degenerate / Skewed Tree: Every internal node has only 1 child, degenerating into a linked list (O(n) height).'
      ]
    }
  },
  {
    id: 'tree-traversal-methods',
    number: '15',
    question: 'Tree traversal methods?',
    category: 'Trees',
    timestamp: '12:49',
    timestampSeconds: 769,
    youtubeUrl: 'https://www.youtube.com/watch?t=769s',
    summary: 'Depth First Search (DFS: Inorder, Preorder, Postorder) and Breadth First Search (BFS: Level Order Traversal).',
    interviewAnswer: {
      definition: 'Tree traversal refers to visiting every node in the tree exactly once in a systematic order. Classified into DFS and BFS:',
      methods: [
        {
          name: 'Inorder (DFS: Left → Root → Right)',
          order: 'Traverse left subtree, visit root, traverse right subtree.',
          note: 'CRITICAL INTERVIEW FACT: Inorder traversal of a Binary Search Tree (BST) visits nodes in strictly sorted ascending order!'
        },
        {
          name: 'Preorder (DFS: Root → Left → Right)',
          order: 'Visit root, traverse left subtree, traverse right subtree.',
          note: 'Used for creating a serialized copy of a tree and generating prefix expressions.'
        },
        {
          name: 'Postorder (DFS: Left → Right → Root)',
          order: 'Traverse left subtree, traverse right subtree, visit root.',
          note: 'Used for bottom-up operations like tree deletion (freeing children before parent) and calculating subtree sizes/heights.'
        },
        {
          name: 'Level Order (BFS)',
          order: 'Visits nodes level-by-level from top to bottom, left to right.',
          note: 'Implemented iteratively using a Queue data structure. Time: O(n), Space: O(w) where w is max width.'
        }
      ]
    }
  },
  {
    id: 'what-is-a-binary-search-tree-bst',
    number: '16',
    question: 'What is a Binary Search Tree (BST)?',
    category: 'Trees',
    timestamp: '15:13',
    timestampSeconds: 913,
    youtubeUrl: 'https://www.youtube.com/watch?t=913s',
    summary: 'A sorted binary tree where every node satisfies: all values in left subtree < node value < all values in right subtree.',
    interviewAnswer: {
      definition: 'A Binary Search Tree (BST) is a binary tree where all nodes adhere to the BST Invariant: for any node X, all keys in its left subtree are strictly smaller than X.val, and all keys in its right subtree are strictly greater than X.val.',
      keyPoints: [
        'Strict Ordering: Enables binary search principles on a hierarchical structure.',
        'Average Case Performance: Search, Insertion, and Deletion take O(log n) time when balanced.',
        'Worst Case Degradation: If elements are inserted in already-sorted order, the tree degenerates into a linear chain (skewed tree) with O(n) height and operations.',
        'Self-Balancing Trees: Real-world systems use AVL trees or Red-Black trees (e.g., Java TreeMap, C++ std::map) which automatically rotate on insertion/deletion to preserve O(log n) height.'
      ]
    }
  },
  {
    id: 'full-vs-complete-binary-tree',
    number: '17',
    question: 'Full vs. Complete Binary Tree?',
    category: 'Trees',
    timestamp: '15:50',
    timestampSeconds: 950,
    youtubeUrl: 'https://www.youtube.com/watch?t=950s',
    summary: 'Full tree: every node has 0 or 2 children. Complete tree: every level is completely filled except possibly the last, which is filled left-to-right.',
    interviewAnswer: {
      definition: 'These two common binary tree classifications are frequently confused in technical interviews:',
      comparison: [
        {
          aspect: 'Definition',
          full: 'Every node has either 0 or 2 children. No node has exactly 1 child.',
          complete: 'All levels are completely filled except possibly the last level, where nodes are populated from left to right without gaps.'
        },
        {
          aspect: 'Leaf Placement',
          full: 'Leaves can exist at different levels as long as non-leaves have 2 children.',
          complete: 'Leaves can only be on the last level or second-to-last level.'
        },
        {
          aspect: 'Primary Application',
          full: 'Huffman Coding and prefix parse trees.',
          complete: 'Binary Heaps (Priority Queues) — because completeness allows efficient array mapping: parent = i/2, left = 2i, right = 2i + 1.'
        }
      ]
    }
  },
  {
    id: 'what-are-b-trees',
    number: '18',
    question: 'What are B-trees?',
    category: 'Trees',
    timestamp: '16:30',
    timestampSeconds: 990,
    youtubeUrl: 'https://www.youtube.com/watch?t=990s',
    summary: 'Self-balancing multi-way search trees designed for optimizing reads/writes of large blocks of data on secondary disk storage and database systems.',
    interviewAnswer: {
      definition: 'A B-tree is a self-balancing search tree where internal nodes can have more than two children (multi-way). It is specially designed to work efficiently with disks, SSDs, and storage systems.',
      keyPoints: [
        'Why not Binary Search Trees for DBs? Disk I/O is thousands of times slower than memory access. A binary tree has high depth, requiring many disk seeks. B-trees are wide and flat (large branching factor), drastically reducing disk I/O reads.',
        'Block / Page Size Match: Each B-tree node is sized to match a hardware disk page (e.g., 4KB or 8KB) and holds hundreds of keys per node.',
        'Guaranteed Depth Balance: All leaf nodes reside at the exact same depth level.',
        'B+ Tree Variant: In databases (MySQL InnoDB), internal nodes only store routing keys, while all actual data pointers and linked lists reside in leaves for fast range scans.'
      ]
    }
  },
  {
    id: 'what-is-a-graph-data-structure',
    number: '19',
    question: 'What is a graph data structure?',
    category: 'Graphs',
    timestamp: '17:33',
    timestampSeconds: 1053,
    youtubeUrl: 'https://www.youtube.com/watch?t=1053s',
    summary: 'A non-linear network structure consisting of a finite set of vertices (nodes) and edges (connections) linking pairs of vertices: G = (V, E).',
    interviewAnswer: {
      definition: 'A graph G = (V, E) is a non-linear data structure consisting of a set of vertices (or nodes, V) and a set of edges (E) that connect pairs of vertices, modeling complex network relationships.',
      representations: [
        {
          name: 'Adjacency Matrix',
          desc: 'A 2D array of size |V| × |V| where matrix[u][v] = 1 (or weight) if an edge exists. Space: O(V²). Best for dense graphs; provides O(1) edge lookup.'
        },
        {
          name: 'Adjacency List',
          desc: 'An array or HashMap of lists where adj[u] contains all neighboring vertices of u. Space: O(V + E). Best for sparse graphs and standard in coding interviews.'
        }
      ],
      coreAlgorithms: [
        'Breadth-First Search (BFS): Shortest path in unweighted graphs.',
        'Depth-First Search (DFS): Cycle detection, topological sort, connected components.',
        'Dijkstra’s Algorithm: Shortest path in weighted graphs with non-negative weights.',
        'Kruskal’s & Prim’s: Minimum Spanning Trees (MST).'
      ]
    }
  },
  {
    id: 'directed-vs-undirected-graph',
    number: '20',
    question: 'Directed vs. Undirected graph?',
    category: 'Graphs',
    timestamp: '17:55',
    timestampSeconds: 1075,
    youtubeUrl: 'https://www.youtube.com/watch?t=1075s',
    summary: 'In directed graphs (digraphs), edges have a specific one-way direction (u → v); in undirected graphs, edges are bidirectional (u ↔ v).',
    interviewAnswer: {
      definition: 'Graphs are categorized based on whether edge relationships have inherent directionality:',
      comparison: [
        {
          feature: 'Edge Direction',
          directed: 'Ordered pairs (u, v): edge goes strictly from u to v. Traversal from v to u is not permitted unless an opposite edge exists.',
          undirected: 'Unordered pairs (u, v): edge is bidirectional (u ↔ v). You can travel freely in both directions.'
        },
        {
          feature: 'Degrees',
          directed: 'Distinguishes between In-degree (incoming edges) and Out-degree (outgoing edges).',
          undirected: 'A vertex has a single Degree count (total incident edges). Handshaking theorem: sum of degrees = 2 × |E|.'
        },
        {
          feature: 'Real-World Analogy',
          directed: 'Twitter/Instagram follower model (A follows B, but B does not necessarily follow A), web page hyperlinks, package dependencies.',
          undirected: 'Facebook friendship model (mutual connection), computer networks with two-way Ethernet cables, two-way street networks.'
        }
      ]
    }
  }
];
