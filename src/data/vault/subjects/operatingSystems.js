export const operatingSystemsVault = {
  id: 'os',
  title: 'Operating Systems',
  shortTitle: 'OS',
  category: 'Core CS',
  icon: 'Cpu',
  accentColor: '#F59E0B', // amber-500
  description: 'Process vs Thread, CPU Scheduling, Deadlocks (Coffman conditions), Virtual Memory, Paging, Page Faults, and Synchronization.',
  tags: ['Process & Threads', 'Deadlocks', 'Virtual Memory', 'Paging', 'Scheduling', 'Semaphores & Mutex'],
  questions: [
    {
      id: 'os-q1',
      number: '01',
      topic: 'Processes & Threads',
      question: 'What is the difference between a Process and a Thread? What is a Context Switch?',
      interviewTips: 'Highlight that threads share the same address space (heap, code, global data) but each thread has its own private stack and registers.',
      answer: `• Process:
  - An executing instance of a program in its own isolated virtual memory space.
  - Contains: Text (code), Data (globals), Heap (dynamically allocated memory), Stack (local variables/frames).
  - Heavyweight: Inter-Process Communication (IPC) requires OS primitives (Pipes, Sockets, Shared Memory).

• Thread (Lightweight Process):
  - Smallest unit of CPU execution within a process.
  - Shares: Code segment, Data segment, and open OS resources (files, sockets).
  - Private: Has its own Program Counter (PC), Register set, and Stack.

• Context Switching:
  - Saving the state (PCB / registers) of the currently running process/thread and restoring the state of another scheduled process/thread.
  - Process context switch is significantly more expensive than thread context switch because it invalidates the CPU TLB (Translation Lookaside Buffer) cache.`
    },
    {
      id: 'os-q2',
      number: '02',
      topic: 'Deadlocks',
      question: 'What is a Deadlock? What are the 4 Coffman conditions required for a deadlock?',
      interviewTips: 'Remember the acronym MNCP: Mutual Exclusion, No Preemption, Circular Wait, Hold & Wait. Breaking ANY ONE condition prevents deadlock.',
      answer: `• Deadlock Definition:
  - A permanent state where a set of processes are blocked because each process holds a resource and waits for another resource held by another process.

• 4 Necessary Coffman Conditions:
  1. Mutual Exclusion: At least one resource must be held in a non-shareable mode (only one process at a time).
  2. Hold and Wait: A process must be holding at least one resource and waiting to acquire additional resources held by others.
  3. No Preemption: Resources cannot be forcibly taken away; they can only be released voluntarily by the holding process.
  4. Circular Wait: A closed loop exists where P0 waits for resource held by P1, P1 waits for P2, ..., Pn waits for P0.

• Deadlock Prevention Strategies:
  - Eliminate Circular Wait by imposing a strict global ordering on resource acquisition (e.g. always acquire Resource A before Resource B).`
    },
    {
      id: 'os-q3',
      number: '03',
      topic: 'Memory Management',
      question: 'Explain Virtual Memory, Paging, Page Tables, and Page Faults.',
      interviewTips: 'Explain the role of the MMU (Memory Management Unit) and TLB (Translation Lookaside Buffer) hardware cache.',
      answer: `• Virtual Memory:
  - Memory management technique that creates an illusion for each process that it has a large, contiguous block of RAM, even if physical RAM is smaller and fragmented.

• Paging:
  - Virtual address space is divided into fixed-size chunks called Pages (typically 4 KB).
  - Physical RAM is divided into equal-sized chunks called Page Frames.
  - The Page Table maps virtual page numbers (VPN) to physical frame numbers (PFN).
  - TLB (Translation Lookaside Buffer): High-speed hardware cache on CPU that caches recent virtual-to-physical translations to avoid double memory lookups.

• Page Fault:
  - Hardware interrupt triggered when a program accesses a virtual page whose 'valid' bit is 0 (page not currently in physical RAM).
  - OS handles page fault:
    1. Pauses thread.
    2. Reads missing page from disk (swap space) into an empty physical frame.
    3. Updates page table.
    4. Resumes thread instruction.`
    },
    {
      id: 'os-q4',
      number: '04',
      topic: 'Concurrency & Synchronization',
      question: 'Mutex vs Semaphore: What are they and how do they differ?',
      interviewTips: 'Crucial distinction: A Mutex has ownership (only the locking thread can unlock). A Semaphore has no ownership (any thread can post/signal).',
      answer: `• Mutex (Mutual Exclusion Object):
  - Locking mechanism used to synchronize access to a critical section.
  - Binary in nature (Locked or Unlocked).
  - Ownership: Only the specific thread that acquired the mutex can release/unlock it.

• Semaphore:
  - Signaling mechanism based on an integer counter (Dijkstra).
  - wait() / P(): Decrements counter; blocks if counter <= 0.
  - signal() / V(): Increments counter; wakes up a blocked process.
  - Types:
    - Binary Semaphore (values 0 and 1, similar to a mutex but without thread ownership).
    - Counting Semaphore (value N, controls access to a finite pool of N identical resources like connection pools).`
    }
  ]
};
