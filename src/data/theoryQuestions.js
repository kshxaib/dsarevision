export const theoryCategories = [
  'All',
  'Fundamentals',
  'Arrays',
  'Hashing',
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
    answer: `A data structure is a specialized format for organizing, storing, and managing data in computer memory so that operations can be performed efficiently. It is broadly categorized into:
• Linear Data Structures: Elements are arranged sequentially where each element has a unique predecessor and successor (e.g., Arrays, Linked Lists, Stacks, Queues).
• Non-Linear Data Structures: Elements are organized hierarchically or in interconnected networks (e.g., Trees, Graphs, Heaps).`
  },
  {
    id: 'what-is-an-array',
    number: '02',
    question: 'What is an array?',
    category: 'Arrays',
    answer: `An array is a linear data structure that stores elements of the same data type in contiguous memory locations with a fixed capacity.
• Random Access: Provides instant O(1) element access using pointer arithmetic: Address(A[i]) = Base + (i * size).
• Fixed Size: Standard static arrays have a fixed size decided at initialization that cannot be changed dynamically.
• Time Complexities: Access O(1), Search O(n) (or O(log n) if sorted), Insertion & Deletion O(n) due to shifting subsequent elements.`
  },
  {
    id: 'what-is-a-multi-dimensional-array',
    number: '03',
    question: 'What is a multi-dimensional array?',
    category: 'Arrays',
    answer: `A multi-dimensional array is an array of arrays, most commonly a 2D array representing data in tabular rows and columns.
• Memory Mapping: Physical RAM is strictly 1-dimensional. Multi-dimensional coordinates are mapped to 1D addresses, usually via Row-Major order (C/C++, Java): Address(A[i][j]) = Base + ((i * total_cols) + j) * size.
• Use Cases: Matrices, Dynamic Programming tables, image pixel buffers, and grid-based games (Chess, Sudoku).`
  },
  {
    id: 'what-is-a-linked-list',
    number: '04',
    question: 'What is a linked list?',
    category: 'Linked Lists',
    answer: `A linked list is a linear, dynamic data structure where discrete nodes are allocated across heap memory and connected via pointers or references rather than contiguous slots.
• Node Anatomy: Each node contains a data payload and a pointer/reference to the next node in the sequence.
• Dynamic Allocation: Memory is allocated node-by-node at runtime without needing fixed pre-allocated capacity.
• Traversal: Does not support O(1) random index access; reaching the k-th node requires sequential O(k) traversal from the head.
• Types: Singly Linked List (unidirectional), Doubly Linked List (bidirectional), and Circular Linked List (last node points back to head).`
  },
  {
    id: 'advantages-of-linked-list-over-arrays',
    number: '05',
    question: 'Advantages of linked list over arrays?',
    category: 'Linked Lists',
    answer: `• Dynamic Sizing: Can grow or shrink dynamically at runtime without upfront size limits or costly O(n) array reallocation and copying.
• O(1) Insertions & Deletions: Adding or removing a node at the head or after a known reference takes O(1) pointer updates, avoiding the O(n) element shifting required by arrays.
• Zero Pre-allocation Waste: Memory is allocated only when a node is added, unlike arrays that must reserve unused contiguous blocks upfront.
• Trade-offs: Extra memory overhead for storing pointer references and no constant-time random access (sequential traversal only).`
  },
  {
    id: 'what-is-a-doubly-linked-list',
    number: '06',
    question: 'What is a doubly linked list?',
    category: 'Linked Lists',
    answer: `A Doubly Linked List (DLL) is a two-way linked list where each node contains three fields: data, a next pointer to the successor node, and a prev pointer to the predecessor node.
• Bidirectional Traversal: Can be traversed forward (head to tail) and backward (tail to head) with equal efficiency.
• O(1) Node Deletion: Given a direct pointer to any node, it can be deleted in O(1) time without searching from the head: node.prev.next = node.next and node.next.prev = node.prev.
• Applications: LRU Cache (paired with a HashMap for O(1) access and eviction), browser forward and back navigation, and Undo/Redo operations.`
  },
  {
    id: 'applications-of-a-linked-list',
    number: '07',
    question: 'Applications of a linked list?',
    category: 'Linked Lists',
    answer: `• Building Dynamic Data Structures: Underlying foundation for dynamic Stacks, Queues, Deques, and Graph Adjacency Lists.
• Hash Table Collision Handling: Separate Chaining in HashMaps (e.g., bucket linked lists in Java HashMap).
• Operating Systems: Process ready and waiting queues, memory block free lists in allocators.
• Media Applications: Music and video playlists (Circular Doubly Linked Lists enable continuous looping and previous/next navigation).`
  },
  {
    id: 'what-is-a-stack',
    number: '08',
    question: 'What is a stack?',
    category: 'Stacks & Queues',
    answer: `A stack is a linear data structure that operates under the LIFO (Last-In-First-Out) principle. Elements can only be added or removed from a single endpoint called the top.
• Constant Time: Core operations push, pop, and peek execute in strict O(1) time.
• Applications: Call stack for recursion and function calls, expression evaluation (postfix/prefix), bracket matching (valid parentheses), and browser back-button history.`
  },
  {
    id: 'basic-operations-of-a-stack',
    number: '09',
    question: 'Basic operations of a stack?',
    category: 'Stacks & Queues',
    answer: `• push(x): Adds element x to the top of the stack (O(1)). Throws Stack Overflow if a fixed-size array is full.
• pop(): Removes and returns the top element (O(1)). Throws Stack Underflow if the stack is empty.
• peek() or top(): Returns the value of the top element without removing it (O(1)).
• isEmpty(): Returns true if the stack contains no elements (O(1)).
• isFull(): Returns true if a fixed-capacity stack has reached its maximum size (O(1)).`
  },
  {
    id: 'what-is-a-queue',
    number: '10',
    question: 'What is a Queue?',
    category: 'Stacks & Queues',
    answer: `A queue is a linear data structure that operates under the FIFO (First-In-First-Out) principle. Elements are inserted at the rear (tail) and removed from the front (head).
• Two Pointers: Front tracks the next item to consume; rear tracks where the next item arrives.
• Main Variants: Circular Queue (wraps around via modulo to reuse vacant front slots), Priority Queue (orders by priority), and Deque (Double-Ended Queue).
• Applications: Breadth-First Search (BFS), CPU task scheduling (Round-Robin ready queue), and asynchronous message queues (Kafka, RabbitMQ).`
  },
  {
    id: 'basic-operations-of-a-queue',
    number: '11',
    question: 'Basic operations of a queue?',
    category: 'Stacks & Queues',
    answer: `• enqueue(x): Adds element x at the rear of the queue (O(1)). Throws Queue Overflow if full.
• dequeue(): Removes and returns the element at the front of the queue (O(1)). Throws Queue Underflow if empty.
• front() or peek(): Returns the front element without removing it (O(1)).
• rear(): Returns the most recently inserted element at the rear (O(1)).
• isEmpty() & isFull(): Verify if the queue contains 0 elements or has reached full capacity (O(1)).`
  },
  {
    id: 'what-is-a-tree-data-structure',
    number: '12',
    question: 'What is a Tree data structure?',
    category: 'Trees',
    answer: `A tree is a non-linear, hierarchical data structure consisting of N nodes interconnected by exactly N - 1 edges, originating from a single root node with no cycles.
• Acyclic: There is exactly one unique path between any two nodes.
• Recursive: Every node is the root of its own subtree, making tree problems naturally recursive.
• Applications: File system directory trees, the Document Object Model (DOM) in web browsers, and Abstract Syntax Trees (AST) in compilers.`
  },
  {
    id: 'basic-tree-terminology',
    number: '13',
    question: 'Basic tree terminology?',
    category: 'Trees',
    answer: `• Root: Topmost node with no parent. Every tree has exactly one root.
• Parent & Child: If an edge connects node A downward to node B, A is the parent and B is the child.
• Leaf (External Node): A node with no children (degree 0).
• Internal Node: A node with at least one child.
• Siblings: Nodes that share the same parent node.
• Degree: Number of children a node has. Tree degree is the maximum degree among all nodes.
• Depth: Number of edges from the root down to a specific node (Root depth = 0).
• Height: Number of edges on the longest downward path from a node to a leaf (Tree height = height of the root).`
  },
  {
    id: 'what-are-binary-trees',
    number: '14',
    question: 'What are Binary Trees?',
    category: 'Trees',
    answer: `A binary tree is a hierarchical tree structure where every node has at most two children, known as the left child and right child (degree ≤ 2).
• Maximum nodes at level l: 2^l (root is level 0).
• Maximum nodes in a tree of height h: 2^(h + 1) - 1.
• Minimum height with N nodes: ⌈log₂(N + 1)⌉ - 1.
• Types: Full (each node has 0 or 2 children), Complete (all levels filled except possibly the last, which is filled left-to-right), and Perfect (all internal nodes have 2 children and all leaves are at the same level).`
  },
  {
    id: 'tree-traversal-methods',
    number: '15',
    question: 'Tree traversal methods?',
    category: 'Trees',
    answer: `Tree traversal visits every node in the tree systematically:
• Depth First Search (DFS):
  - Inorder (Left → Root → Right): Traverses a Binary Search Tree (BST) in strictly sorted ascending order.
  - Preorder (Root → Left → Right): Used for tree cloning and prefix expression serialization.
  - Postorder (Left → Right → Root): Used for bottom-up cleanup, tree deletion, and calculating subtree sizes and heights.
• Breadth First Search (BFS):
  - Level Order: Visits nodes level-by-level from top to bottom, left to right, implemented using a Queue (Time: O(n), Space: O(w) where w is max width).`
  },
  {
    id: 'what-is-a-binary-search-tree-bst',
    number: '16',
    question: 'What is a Binary Search Tree (BST)?',
    category: 'Trees',
    answer: `A Binary Search Tree (BST) is a binary tree where all nodes satisfy the BST invariant:
• For every node X, all values in its left subtree are strictly less than X.val, and all values in its right subtree are strictly greater than X.val.
• Time Complexity: Search, Insertion, and Deletion take O(log n) time on average. If elements are inserted in sorted order without balancing, the tree degenerates into a skewed linear chain with O(n) operations.
• Self-Balancing Trees (AVL, Red-Black Trees): Automatically balance during modifications to maintain guaranteed O(log n) performance.`
  },
  {
    id: 'full-vs-complete-binary-tree',
    number: '17',
    question: 'Full vs. Complete Binary Tree?',
    category: 'Trees',
    answer: `• Full Binary Tree: Every node has either 0 or 2 children (no node has exactly 1 child). Used in Huffman coding and prefix parsing.
• Complete Binary Tree: All levels are completely filled except possibly the last level, where nodes are packed strictly from left to right without gaps. Used in Binary Heaps (Priority Queues) because it maps directly to a 1D array without pointer overhead.`
  },
  {
    id: 'what-are-b-trees',
    number: '18',
    question: 'What are B-trees?',
    category: 'Trees',
    answer: `A B-tree is a self-balancing search tree where internal nodes can store multiple keys and have more than two children.
• Purpose: Optimized for disk storage, databases (e.g., MySQL, PostgreSQL), and file systems where disk read/write is slow.
• Wide & Flat: By storing hundreds of keys per node block, B-trees minimize tree height and drastically reduce costly disk I/O seeks compared to binary trees.
• B+ Tree Variant: All data records and pointers reside exclusively in leaf nodes linked sequentially, making range queries extremely fast.`
  },
  {
    id: 'what-is-a-graph-data-structure',
    number: '19',
    question: 'What is a graph data structure?',
    category: 'Graphs',
    answer: `A graph G = (V, E) is a non-linear network data structure consisting of a set of vertices (nodes, V) and edges (connections, E) linking pairs of vertices.
• Adjacency Matrix: A 2D array of size V × V where matrix[u][v] = 1 (or edge weight). Takes O(V²) space; best for dense graphs with O(1) edge lookups.
• Adjacency List: An array or HashMap of lists where list[u] stores all adjacent neighbors of vertex u. Takes O(V + E) space; standard for sparse graphs and coding interviews.
• Core Algorithms: BFS (shortest path in unweighted graphs), DFS (cycle detection and topological sort), and Dijkstra's algorithm (shortest path with non-negative weights).`
  },
  {
    id: 'directed-vs-undirected-graph',
    number: '20',
    question: 'Directed vs. Undirected graph?',
    category: 'Graphs',
    answer: `• Directed Graph (Digraph): Edges have a specific one-way direction from vertex u to vertex v (ordered pair (u, v)). Traversal from v to u is not permitted unless an opposite edge exists. Tracks in-degree (incoming edges) and out-degree (outgoing edges). Example: Twitter/Instagram followers, web hyperlinks.
• Undirected Graph: Edges are bidirectional connections (unordered pair {u, v}). Traversal is permitted freely in both directions. Vertices have a single degree count. Example: Facebook mutual friendships, two-way street networks.`
  },
  {
    id: 'what-is-hashing',
    number: '21',
    question: 'What is Hashing and how does it work?',
    category: 'Hashing',
    answer: `Hashing is a pre-storing and fetching technique that maps keys to fixed-size table indices using a Hash Function, enabling average O(1) search, insert, and delete operations instead of repeated O(n) array scans.
• Number Hashing Limits: Local arrays in functions can hold up to ~10⁶ elements due to stack limits; global arrays can hold up to ~10⁷. When numbers exceed 10⁷ (or reach 10⁹+), HashMaps are required.
• Character Hashing: Uses an array of size 26 for lowercase English letters (index = char - 'a') or size 256 for all standard ASCII characters (index = (int) char).
• Hash Map: When keys are unbounded, negative, strings, or sparse, a hash function converts keys into bucket indices in dynamic memory.`
  },
  {
    id: 'hash-collisions-and-map-structures',
    number: '22',
    question: 'How are Hash Collisions handled and how do Map vs. Unordered Map compare?',
    category: 'Hashing',
    answer: `A collision occurs when two distinct keys produce the same hash index (h(k₁) = h(k₂)). Handled via:
• Separate Chaining: Each bucket holds a linked list (or Red-Black tree as in Java 8+ HashMap when chain length > 8) to store colliding elements.
• Open Addressing: Elements are stored directly in the table. On collision, probes search for the next available slot (Linear Probing, Quadratic Probing, or Double Hashing).

Ordered Map vs. Unordered Map:
• Ordered Map (TreeMap / std::map): Implemented as a Red-Black Tree. Keys are always sorted. Search, insert, and delete take guaranteed O(log n) time.
• Unordered Map (HashMap / std::unordered_map): Implemented as a Hash Table. Keys have no order. Provides average O(1) time (worst case O(n) on heavy collisions).`
  },
  {
    id: 'static-vs-dynamic-arrays',
    number: '23',
    question: 'Static Arrays vs. Dynamic Arrays (ArrayList) and how resizing works?',
    category: 'Arrays',
    answer: `• Static Arrays: Have a fixed capacity declared at allocation time and cannot grow or shrink.
• Dynamic Arrays (ArrayList / std::vector): Automatically resize their backing array when capacity is exhausted.
• Geometric Doubling: When full, a dynamic array allocates a new array of 2× capacity, copies all existing elements over, and updates its internal reference.
• Amortized O(1) Append: Although a resize pass takes O(n) copying time, resizing occurs exponentially less frequently. Distributing this cost over all insertions yields an average (amortized) cost of O(1) per append.`
  }
];
