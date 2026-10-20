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
      {
        id: 'merge-two-sorted-lists',
        title: 'Merge Two Sorted Lists',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/description/',
        definition: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
        examples: [
          { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
          { input: 'list1 = [], list2 = []', output: '[]' },
          { input: 'list1 = [], list2 = [0]', output: '[0]' }
        ],
        brute: {
          idea: 'Collect all values from both linked lists into an ArrayList, sort the array in ascending order, and then reconstruct a new sorted linked list.',
          code: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ArrayList<Integer> arr = new ArrayList<>();

        // Collect all elements from list1
        while (list1 != null) {
            arr.add(list1.val);
            list1 = list1.next;
        }

        // Collect all elements from list2
        while (list2 != null) {
            arr.add(list2.val);
            list2 = list2.next;
        }

        // Sort all elements
        Collections.sort(arr);

        // Reconstruct merged linked list
        ListNode dummy = new ListNode(-1);
        ListNode temp = dummy;

        for (int val : arr) {
            temp.next = new ListNode(val);
            temp = temp.next;
        }

        return dummy.next;
    }
}`,
          time: 'O((n + m) log(n + m))',
          timeDesc: '• Traversing both lists to populate array: O(n + m).\n• Sorting the array of size (n + m): O((n + m) log(n + m)).\n• Creating the new linked list: O(n + m).\n• Total Time: O((n + m) log(n + m))',
          space: 'O(n + m)',
          spaceDesc: 'O(n + m) auxiliary space for the ArrayList and new linked list nodes.',
          walkthrough: [
            "Initialize an empty ArrayList arr to store values.",
            "Traverse list1 and add all node values to arr.",
            "Traverse list2 and add all node values to arr.",
            "Sort arr in ascending order using Collections.sort(arr).",
            "Initialize a dummy node ListNode(-1) with pointer temp = dummy.",
            "Iterate through sorted values in arr, creating new nodes and linking via temp.next.",
            "Return dummy.next as head of merged list."
          ]
        },
        optimal: {
          idea: 'Use a two-pointer approach to splice the existing nodes of both sorted lists in-place. Compare node values from list1 and list2, link the smaller node to the merged list, and advance the corresponding pointer.',
          code: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1);
        ListNode temp = dummy;

        ListNode temp1 = list1;
        ListNode temp2 = list2;

        // Compare and link the smaller node
        while(temp1 != null && temp2 != null){
            if(temp1.val <= temp2.val){
                temp.next = temp1;
                temp1 = temp1.next;
            } else {
                temp.next = temp2;
                temp2 = temp2.next;
            }

            temp = temp.next;
        }

        // Append remaining nodes from list1
        while(temp1 != null){
            temp.next = temp1;
            temp1 = temp1.next;
            temp = temp.next;
        }

        // Append remaining nodes from list2
        while(temp2 != null){
            temp.next = temp2;
            temp2 = temp2.next;
            temp = temp.next;
        }

        return dummy.next;
    }
}`,
          time: 'O(n + m)',
          timeDesc: '• Traverse each node in list1 and list2 at most once.\n• Total Time: O(n + m)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space since we rearrange existing nodes in-place using pointers.',
          walkthrough: [
            "Create a dummy head node ListNode(-1) and pointer temp = dummy.",
            "Initialize temp1 = list1 and temp2 = list2.",
            "While both temp1 and temp2 are not null:",
            "  If temp1.val <= temp2.val, attach temp1 to temp.next and advance temp1.",
            "  Else, attach temp2 to temp.next and advance temp2.",
            "  Advance temp.",
            "Attach any remaining elements of temp1 to temp.next.",
            "Attach any remaining elements of temp2 to temp.next.",
            "Return dummy.next as head of the merged sorted list."
          ]
        }
      },
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
