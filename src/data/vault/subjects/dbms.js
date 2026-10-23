export const dbmsVault = {
  id: 'dbms',
  title: 'DBMS & Database Systems',
  shortTitle: 'DBMS',
  category: 'Core CS',
  icon: 'Database',
  accentColor: '#10B981', // emerald-500
  description: 'ACID properties, Indexing (B/B+ Trees), Normalization (1NF to BCNF), Transactions, Concurrency Control, and Recovery.',
  tags: ['ACID', 'Transactions', 'Indexing', 'B+ Trees', 'Normalization', 'Isolation Levels', 'Concurrency'],
  questions: [
    {
      id: 'dbms-q1',
      number: '01',
      topic: 'Transactions',
      question: 'What are ACID properties in DBMS and why are they fundamental?',
      interviewTips: 'Give practical banking transfer example (Debit $100 from A, Credit $100 to B).',
      answer: `• Atomicity ("All or Nothing"):
  - Entire transaction succeeds or is completely rolled back to its previous state.
  - Implemented via: Write-Ahead Logging (WAL) and Undo logs.

• Consistency ("Correct State Transitions"):
  - Transaction takes the database from one valid state to another, satisfying all integrity constraints (Foreign keys, uniqueness, check constraints).

• Isolation ("Independent Concurrent Execution"):
  - Intermediate states of a transaction are invisible to other concurrent transactions until committed.
  - Implemented via: 2-Phase Locking (2PL), MVCC (Multi-Version Concurrency Control).

• Durability ("Survival of Committed Data"):
  - Once committed, changes survive system crashes, power failures, and reboot.
  - Implemented via: Redo logs / Write-Ahead Logging flushed to disk (fsync).`
    },
    {
      id: 'dbms-q2',
      number: '02',
      topic: 'Transactions & Concurrency',
      question: 'Explain Transaction Isolation Levels and Read Phenomena (Dirty, Non-repeatable, Phantom).',
      interviewTips: 'Memorize the standard isolation matrix. Most production DBs (Postgres/MySQL) default to Read Committed or Repeatable Read.',
      answer: `• Read Phenomena:
  1. Dirty Read: Transaction reads uncommitted data written by another transaction (which might roll back).
  2. Non-Repeatable Read: Re-reading the same row within a transaction produces different values because another transaction modified & committed it.
  3. Phantom Read: Re-executing a range query returns new rows inserted by another committed transaction.

• ANSI SQL Isolation Levels:
  1. Read Uncommitted:
     - Allows: Dirty Read, Non-repeatable Read, Phantom Read. (Fastest, zero isolation).
  2. Read Committed (Postgres default):
     - Prevents: Dirty Read.
     - Allows: Non-repeatable Read, Phantom Read.
  3. Repeatable Read (MySQL InnoDB default):
     - Prevents: Dirty Read, Non-repeatable Read.
     - Solves Phantom Reads in InnoDB via Next-Key Locks / MVCC snapshots.
  4. Serializable:
     - Prevents: All anomalies (Strict sequential execution equivalent). Highest safety, lowest concurrency.`
    },
    {
      id: 'dbms-q3',
      number: '03',
      topic: 'Indexing',
      question: 'How does Indexing work? Compare B-Trees vs B+ Trees and Clustered vs Non-Clustered Indexes.',
      interviewTips: 'Emphasize that B+ trees keep ALL data/record pointers in leaves linked sequentially, making range queries O(log N + k).',
      answer: `• Clustered vs Non-Clustered Index:
  - Clustered Index: Determines physical order of data on disk. A table can have only ONE clustered index (usually the Primary Key).
  - Non-Clustered Index: Separate structure containing index keys and row pointers (RID or primary key) pointing to the actual data. A table can have multiple non-clustered indexes.

• B-Tree vs B+ Tree:
  - B-Tree: Stores keys and actual record pointers in internal nodes as well as leaf nodes.
  - B+ Tree (Used in MySQL InnoDB, Postgres, Oracle):
    1. Internal nodes only store routing keys (much higher branching factor / fan-out, fits more keys per disk block).
    2. Leaf nodes contain ALL records/pointers and are linked via a doubly linked list.
    3. Superior for range queries (scan leaf chain without tree traversal) and disk I/O efficiency.`
    },
    {
      id: 'dbms-q4',
      number: '04',
      topic: 'Database Design',
      question: 'Explain Database Normalization: 1NF, 2NF, 3NF, and BCNF.',
      interviewTips: 'State the progressive rule: "The key, the whole key, and nothing but the key, so help me Codd".',
      answer: `• Purpose of Normalization:
  - Eliminate data redundancy and avoid insertion, update, and deletion anomalies.

• Normal Forms:
  1. 1NF (Atomic Values):
     - Each column must contain atomic (indivisible) values. No repeating groups or arrays.
  2. 2NF (No Partial Dependency):
     - Must be in 1NF + every non-prime attribute must be fully functionally dependent on the entire Candidate Key (relevant when primary key is composite).
  3. 3NF (No Transitive Dependency):
     - Must be in 2NF + no non-prime attribute should transitively depend on the primary key (X -> Y, Y -> Z where Z is non-prime is disallowed).
  4. BCNF (Boyce-Codd Normal Form):
     - Stricter 3NF: For every functional dependency X -> Y, X must be a Super Key.`
    },
    {
      id: 'dbms-q5',
      number: '05',
      topic: 'Transactions & Concurrency',
      question: 'What is Concurrency Control? Explain Two-Phase Locking (2PL) vs MVCC.',
      interviewTips: 'PostgreSQL, MySQL InnoDB, and Oracle rely heavily on MVCC to provide non-blocking reads ("readers do not block writers, writers do not block readers").',
      answer: `• Two-Phase Locking (2PL):
  - Pessimistic concurrency control guaranteeing serializability.
  - Growing Phase: Transaction acquires locks as needed; cannot release any lock.
  - Shrinking Phase: Transaction releases locks; cannot acquire any new lock.
  - Strict 2PL: All exclusive (X) locks held until transaction commits/aborts (prevents cascading aborts).

• MVCC (Multi-Version Concurrency Control):
  - Optimistic concurrency control.
  - Instead of overwriting data or locking rows during reads, the DB creates a new version of the row with a transaction ID / timestamp.
  - Readers view a consistent point-in-time snapshot without blocking writers.
  - Writers modify the latest version without blocking readers.`
    },
    {
      id: 'dbms-q6',
      number: '06',
      topic: 'System Architecture',
      question: 'What is the CAP Theorem and when do you choose SQL vs NoSQL?',
      interviewTips: 'Clarify that Partition Tolerance (P) is mandatory in distributed systems over real networks, so the trade-off is between C and A during network partitions.',
      answer: `• CAP Theorem:
  - In a distributed data store, you can only guarantee at most 2 out of 3 properties:
    1. Consistency (C): Every read receives the most recent write or an error.
    2. Availability (A): Every non-failing node returns a response (without guarantee it is latest).
    3. Partition Tolerance (P): System continues to function despite dropped/delayed messages.
  - In reality, networks partition (cables cut, packet drop), so distributed DBs choose CP (HBase, CockroachDB) or AP (Cassandra, DynamoDB).

• SQL (RDBMS) vs NoSQL:
  - Choose SQL (PostgreSQL, MySQL): Structured schema, complex joins, financial data requiring strict ACID guarantees.
  - Choose NoSQL (MongoDB, Cassandra, Redis): Dynamic/unstructured schema, horizontal scalability, high write throughput, cache/key-value lookups.`
    }
  ]
};
