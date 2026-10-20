import { p } from '../helper.js';

export const linkedList = {
    id: 'linked-list',
    name: 'Linked List',
    icon: '🔗',
    problems: [
      {
        id: 'reverse-linked-list',
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/description/',
        definition: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        examples: [
          { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
          { input: 'head = [1,2]', output: '[2,1]' },
          { input: 'head = []', output: '[]' }
        ],
        brute: {
          idea: 'Traverse the original linked list and collect all node values into an ArrayList. Then iterate backwards through the list to construct a new reversed linked list.',
          code: `class Solution {
    public ListNode reverseList(ListNode head) {
        ArrayList<Integer> arr = new ArrayList<>();

        // Store all node values in an ArrayList
        while (head != null) {
            arr.add(head.val);
            head = head.next;
        }

        ListNode dummy = new ListNode(-1);
        ListNode curr = dummy;

        // Reconstruct reversed linked list from ArrayList
        for (int i = arr.size() - 1; i >= 0; i--) {
            curr.next = new ListNode(arr.get(i));
            curr = curr.next;
        }

        return dummy.next;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Pass 1: Traverse the original list to store values in the array: O(n).\n• Pass 2: Traverse array in reverse to create new nodes: O(n).\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space to store n values in the ArrayList and allocate n new nodes.',
          walkthrough: [
            "Initialize an empty ArrayList arr to hold integer values.",
            "Traverse the linked list from head, adding head.val to arr at each node.",
            "Create a dummy head node ListNode(-1) and pointer curr = dummy.",
            "Iterate through arr backwards from index arr.size() - 1 down to 0.",
            "For each element, create a new ListNode and link it via curr.next, then advance curr.",
            "Return dummy.next as the head of the newly created reversed list."
          ]
        },
        optimal: {
          idea: 'Reverse the list iteratively in-place using three pointers (prev, curr, next). In each step, save curr.next, redirect curr.next to point backward to prev, and advance both pointers forward.',
          code: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        ListNode next = null;

        // In-place iterative reversal using 3 pointers
        while(curr != null){
            next = curr.next;                              // Save next node
            curr.next = prev;                              // Reverse current node's pointer

            prev = curr;                                   // Move prev forward
            curr = next;                                   // Move curr forward
        }        

        head = prev;                                       // prev is new head of reversed list
        return head;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Single pass through all n nodes in the linked list.\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space using three pointer references.',
          walkthrough: [
            "Initialize prev = null, curr = head, and next = null.",
            "While curr is not null:",
            "  1. Save the next node: next = curr.next.",
            "  2. Reverse the link: curr.next = prev.",
            "  3. Advance prev: prev = curr.",
            "  4. Advance curr: curr = next.",
            "When curr becomes null, prev points to the last node of original list (the new head).",
            "Set head = prev and return head."
          ]
        }
      },
      p('Merge Two Sorted Lists', 'Easy', 'Merge two sorted linked lists into one sorted list.'),
      p('Linked List Cycle', 'Easy', 'Detect if a linked list has a cycle.'),
      p('Remove Nth Node From End of List', 'Medium', 'Remove the nth node from the end of a linked list.'),
      p('Reorder List', 'Medium', 'Reorder list as L0→Ln→L1→Ln-1→L2→Ln-2→...'),
      p('Add Two Numbers', 'Medium', 'Add two numbers represented as reversed linked lists.'),
      p('Find the Duplicate Number', 'Medium', 'Find the duplicate in an array of n+1 integers in range [1, n].'),
      p('Copy List With Random Pointer', 'Medium', 'Deep copy a linked list with next and random pointers.'),
      p('Merge K Sorted Lists', 'Hard', 'Merge k sorted linked lists into one sorted list.'),
      p('Reverse Nodes in K Group', 'Hard', 'Reverse linked list nodes in groups of k.'),
      p('LRU Cache', 'Medium', 'Design a Least Recently Used (LRU) cache.'),
    ]
  };
