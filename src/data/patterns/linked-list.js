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
      {
        id: 'linked-list-cycle',
        title: 'Linked List Cycle',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/description/',
        definition: 'Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Return true if there is a cycle in the linked list. Otherwise, return false.',
        examples: [
          { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).' },
          { input: 'head = [1,2], pos = 0', output: 'true', explanation: 'There is a cycle in the linked list, where the tail connects to the 0th node.' },
          { input: 'head = [1], pos = -1', output: 'false', explanation: 'There is no cycle in the linked list.' }
        ],
        brute: {
          idea: 'Traverse the linked list while storing visited node references in a HashSet. If a node is encountered that is already present in the set, a cycle exists.',
          code: `public class Solution {
    public boolean hasCycle(ListNode head) {
        HashSet<ListNode> set = new HashSet<>();

        ListNode curr = head;
        while(curr != null){
            // If current node reference is already in set, cycle detected
            if(set.contains(curr)){
                return true;
            }

            set.add(curr);
            curr = curr.next;
        }

        return false;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Traverse each node in the list once.\n• HashSet lookup and insertion take O(1) average time.\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space to store node references in the HashSet.',
          walkthrough: [
            "Initialize an empty HashSet<ListNode> set to store visited node references.",
            "Set pointer curr = head.",
            "While curr is not null:",
            "  Check if set.contains(curr): if true, a cycle exists, return true immediately.",
            "  Otherwise, add curr to set.",
            "  Advance curr = curr.next.",
            "If curr reaches null, the list terminates without a loop, return false."
          ]
        },
        optimal: {
          idea: "Floyd's Tortoise and Hare algorithm: Use two pointers moving at different speeds. The slow pointer advances 1 step at a time while the fast pointer advances 2 steps. If there is a cycle, the fast pointer will eventually catch up and meet the slow pointer.",
          code: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        // Floyd's Cycle Detection Algorithm (Slow & Fast pointers)
        while(fast != null && fast.next != null){
            slow = slow.next;                              // Moves 1 step
            fast = fast.next.next;                         // Moves 2 steps

            if(slow == fast){
                return true;                               // Pointers met, cycle detected
            }
        }

        return false;                                      // Reached end of list, no cycle
    }
}`,
          time: 'O(n)',
          timeDesc: '• If no cycle exists, fast pointer reaches the end in n/2 steps: O(n).\n• If a cycle exists, fast pointer reduces distance to slow by 1 each iteration and meets within at most n steps: O(n).\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space using two pointer references slow and fast.',
          walkthrough: [
            "Initialize two pointers: slow = head and fast = head.",
            "Loop while fast is not null and fast.next is not null:",
            "  Advance slow by 1 step: slow = slow.next.",
            "  Advance fast by 2 steps: fast = fast.next.next.",
            "  If slow == fast, a cycle is confirmed, return true.",
            "If the loop exits (fast or fast.next reaches null), no cycle exists, return false."
          ]
        }
      },
      {
        id: 'remove-nth-node-from-end-of-list',
        title: 'Remove Nth Node From End of List',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/',
        definition: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
        examples: [
          { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
          { input: 'head = [1], n = 1', output: '[]' },
          { input: 'head = [1,2], n = 1', output: '[1]' }
        ],
        brute: {
          idea: 'Traverse the linked list and collect all node values into an ArrayList. Calculate the index to remove (size - n), remove it from the ArrayList, and rebuild a new linked list.',
          code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ArrayList<Integer> list = new ArrayList<>();

        // Collect all node values into an ArrayList
        ListNode curr = head;
        while (curr != null) {
            list.add(curr.val);
            curr = curr.next;
        }

        // Identify and remove the target index
        int removingIdx = list.size() - n;
        list.remove(removingIdx);

        // Reconstruct linked list from modified ArrayList
        ListNode dummy = new ListNode(-1);
        curr = dummy;
        for (int i = 0; i < list.size(); i++) {
            curr.next = new ListNode(list.get(i));
            curr = curr.next;
        }

        return dummy.next;
    }
}`,
          time: 'O(L)',
          timeDesc: '• Traversing the list of length L: O(L).\n• Removing element at index (L - n): O(L).\n• Reconstructing the linked list: O(L).\n• Total Time: O(L)',
          space: 'O(L)',
          spaceDesc: 'O(L) auxiliary space to store elements in ArrayList and create new list nodes.',
          walkthrough: [
            "Initialize an ArrayList list to store integer values.",
            "Traverse the linked list from head, adding each node's value to list.",
            "Compute target index to remove: removingIdx = list.size() - n.",
            "Remove the element at removingIdx from list.",
            "Initialize dummy = ListNode(-1) and curr = dummy.",
            "Iterate through remaining elements in list, creating new nodes and linking via curr.next.",
            "Return dummy.next."
          ]
        },
        optimal: {
          idea: 'Use a two-pointer sliding window technique with a dummy node. First advance pointer2 by n nodes. Then advance both pointer1 and pointer2 together until pointer2 reaches the last node. pointer1 will then be positioned immediately before the node to be removed.',
          code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;

        ListNode pointer1 = dummy;        
        ListNode pointer2 = dummy;

        // Advance pointer2 by n steps ahead
        for(int i=0; i<n; i++){
            pointer2 = pointer2.next;
        }      

        // Move both pointers until pointer2 reaches the last node
        while(pointer2.next != null){
            pointer1 = pointer1.next;
            pointer2 = pointer2.next;
        } 

        // Skip the nth node from the end
        pointer1.next = pointer1.next.next;
        return dummy.next;
    }
}`,
          time: 'O(L)',
          timeDesc: '• Single pass through the list of length L: O(L).\n• Total Time: O(L)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space using two pointer references and a dummy node.',
          walkthrough: [
            "Create a dummy head node dummy with dummy.next = head to handle edge cases like removing the head node.",
            "Initialize pointer1 = dummy and pointer2 = dummy.",
            "Advance pointer2 forward by n steps.",
            "While pointer2.next is not null, move both pointer1 and pointer2 forward by 1 step.",
            "When pointer2 reaches the end, pointer1 points right before the node to delete.",
            "Delete target node: pointer1.next = pointer1.next.next.",
            "Return dummy.next."
          ]
        }
      },
      {
        id: 'reorder-list',
        title: 'Reorder List',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/reorder-list/description/',
        definition: 'You are given the head of a singly linked-list: L0 → L1 → … → Ln - 1 → Ln. Reorder the list to be on the following form: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → … You may not modify the values in the list\'s nodes. Only nodes themselves may be changed.',
        examples: [
          { input: 'head = [1,2,3,4]', output: '[1,4,2,3]' },
          { input: 'head = [1,2,3,4,5]', output: '[1,5,2,4,3]' }
        ],
        brute: {
          idea: 'Collect all node values in an ArrayList. Use two pointers (i at start, j at end) to alternate picking elements from the front and back, overwriting the linked list node values in the required reordered sequence.',
          code: `class Solution {
    public void reorderList(ListNode head) {
        ArrayList<Integer> list = new ArrayList<>();

        // Store all node values in an ArrayList
        ListNode curr = head;
        while(curr != null){
            list.add(curr.val);
            curr = curr.next;
        }

        // Two pointers from both ends
        int i = 0, j = list.size() - 1;
        int count = 0;
        curr = head;

        // Alternate taking elements from start and end
        while(i <= j){
            int val;

            if(count % 2 == 0){
                val = list.get(i);
                i++;
            } else {
                val = list.get(j);
                j--;
            }

            curr.val = val;
            curr = curr.next;
            count++;
        }
    }
}`,
          time: 'O(n)',
          timeDesc: '• Traversing the list to populate ArrayList: O(n).\n• Traversing again with two pointers to reassign node values: O(n).\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space for the ArrayList storing n elements.',
          walkthrough: [
            "Traverse the linked list and append each node's val to an ArrayList list.",
            "Initialize two pointers i = 0 (start) and j = list.size() - 1 (end).",
            "Set curr = head and counter count = 0.",
            "While i <= j:",
            "  If count is even, pick value from start list.get(i) and increment i.",
            "  If count is odd, pick value from end list.get(j) and decrement j.",
            "  Assign curr.val = val, advance curr = curr.next, and increment count."
          ]
        },
        optimal: {
          idea: 'Three-step in-place solution:\n1. Find middle of the list using slow & fast pointers.\n2. Reverse the second half.\n3. Interleave/merge the first and reversed second halves alternately.',
          code: `class Solution {
    public void reorderList(ListNode head) {
        if(head == null || head.next == null){
            return;
        }        

        // 1. Find middle of the linked list
        ListNode slow = head;
        ListNode fast = head;
        while(fast != null && fast.next != null){
            slow = slow.next;
            fast = fast.next.next;
        }

        // 2. Split list and reverse the second half
        ListNode secondHalf = slow.next;
        slow.next = null;

        ListNode curr = secondHalf;
        ListNode prev = null;
        ListNode next = null;
        while(curr != null){
            next = curr.next;
            curr.next = prev;

            prev = curr;
            curr = next;
        }

        // 3. Merge first half and reversed second half alternately
        ListNode pointer1 = head;
        ListNode pointer2 = prev;

        while(pointer2 != null){
            ListNode next1 = pointer1.next;
            ListNode next2 = pointer2.next;

            pointer1.next = pointer2;
            pointer2.next = next1;

            pointer1 = next1;
            pointer2 = next2;
        }
    }
}`,
          time: 'O(n)',
          timeDesc: '• Finding middle takes n/2 steps: O(n).\n• Reversing second half takes n/2 steps: O(n).\n• Merging both halves takes n/2 steps: O(n).\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space as all node pointers are rearranged in-place.',
          walkthrough: [
            "Handle edge case: if head is null or head.next is null, return immediately.",
            "Step 1 (Find middle): Use slow and fast pointers. When fast reaches the end, slow is at the middle.",
            "Step 2 (Reverse second half): Disconnect second half (slow.next = null) and iteratively reverse it using prev, curr, next pointers.",
            "Step 3 (Merge): Set pointer1 = head (first half) and pointer2 = prev (reversed second half).",
            "While pointer2 is not null, interleave: link pointer1.next = pointer2, pointer2.next = next1, and advance both pointers."
          ]
        }
      },
      {
        id: 'add-two-numbers',
        title: 'Add Two Numbers',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers/description/',
        definition: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
        examples: [
          { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', explanation: '342 + 465 = 807.' },
          { input: 'l1 = [0], l2 = [0]', output: '[0]' },
          { input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]', output: '[8,9,9,9,0,0,0,1]' }
        ],
        optimal: {
          idea: 'Simulate elementary addition column-by-column using a dummy node:\n\n• sum = carry + l1.val + l2.val\n• Create node with sum % 10, update carry = sum / 10\n• Advance pointers until both lists and carry are exhausted.',
          code: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(-1);
        ListNode curr = dummy;

        int carry = 0;

        // Loop as long as either list has nodes or a leftover carry exists
        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;

            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }

            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }

            carry = sum / 10;                              // Update carry for the next position

            curr.next = new ListNode(sum % 10);            // Create node with current digit
            curr = curr.next;
        }

        return dummy.next;
    }
}`,
          time: 'O(max(n, m))',
          timeDesc: '• n and m are the lengths of l1 and l2 respectively.\n• The loop runs at most max(n, m) + 1 times (if there is a trailing carry).\n• Total Time: O(max(n, m))',
          space: 'O(max(n, m))',
          spaceDesc: 'The length of the new linked list is at most max(n, m) + 1 (or O(1) auxiliary space excluding the output list).',
          walkthrough: [
            "Initialize dummy = new ListNode(-1) and curr = dummy to build the result list.",
            "Initialize carry = 0.",
            "Loop while l1 != null || l2 != null || carry != 0: set sum = carry.",
            "If l1 != null, add l1.val to sum and advance l1 = l1.next.",
            "If l2 != null, add l2.val to sum and advance l2 = l2.next.",
            "Calculate new carry = sum / 10.",
            "Create a new node with digit value sum % 10, attach it as curr.next, and advance curr.",
            "Return dummy.next, which points to the start of the sum list."
          ]
        }
      },
      {
        id: 'find-the-duplicate-number',
        title: 'Find the Duplicate Number',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number/description/',
        definition: 'Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array nums and using only constant extra space.',
        examples: [
          { input: 'nums = [1,3,4,2,2]', output: '2' },
          { input: 'nums = [3,1,3,4,2]', output: '3' },
          { input: 'nums = [3,3,3,3,3]', output: '3' }
        ],
        optimal: {
          idea: 'Treat array as a linked list (i -> nums[i]) and use Floyd\'s Cycle Detection:\n\n• Phase 1: Move slow (1 step) and fast (2 steps) until they collide in the cycle.\n• Phase 2: Reset slow to 0. Move both by 1 step; they will meet at the cycle entrance (the duplicate number).',
          code: `class Solution {
    public int findDuplicate(int[] nums) {
        // Floyd's Tortoise and Hare (Cycle Detection)
        int slow = 0;
        int fast = 0;

        // Phase 1: Detect cycle intersection
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        // Phase 2: Find entrance to cycle (duplicate number)
        slow = 0;
        while(slow != fast){
            slow = nums[slow];
            fast = nums[fast];
        }

        return slow;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Phase 1 takes at most O(n) steps inside the cycle.\n• Phase 2 takes at most O(n) steps to reach the cycle entrance.\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space using only two integer pointers (slow and fast).',
          walkthrough: [
            "Model the array as a directed graph / linked list where index i points to nums[i].",
            "Phase 1: Initialize slow = 0 and fast = 0. In a do-while loop, advance slow by 1 step (nums[slow]) and fast by 2 steps (nums[nums[fast]]) until slow == fast.",
            "Phase 2: Reset slow = 0 while keeping fast at the meeting point.",
            "Advance both slow and fast by 1 step at a time (slow = nums[slow], fast = nums[fast]) until slow == fast.",
            "Return slow (the entrance to the cycle is the duplicate value)."
          ]
        }
      },
      {
        id: 'copy-list-with-random-pointer',
        title: 'Copy List with Random Pointer',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/description/',
        definition: 'A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list.',
        examples: [
          { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]' },
          { input: 'head = [[1,1],[2,1]]', output: '[[1,1],[2,1]]' },
          { input: 'head = [[3,null],[3,0],[3,null]]', output: '[[3,null],[3,0],[3,null]]' }
        ],
        brute: {
          idea: 'Use a HashMap to store the mapping from each original node to its newly cloned copy (originalNode -> clonedNode). In the first pass, traverse the original linked list and create a clone node for each original node, placing the pair into the map. In the second pass, assign the cloned node\'s next and random pointers using map lookups. Finally, return the clone corresponding to head.',
          code: `class Solution {
    public Node copyRandomList(Node head) {
        Map<Node, Node> map = new HashMap<>(); 

        Node temp = head;

        // Pass 1: Create a copy of each node and store mapping (original -> copy)
        while (temp != null) {
            Node copyNode = new Node(temp.val);
            map.put(temp, copyNode);

            temp = temp.next;
        }

        temp = head;

        // Pass 2: Connect next and random pointers using the map
        while (temp != null) {
            Node copiedNode = map.get(temp);

            copiedNode.next = map.get(temp.next);
            copiedNode.random = map.get(temp.random);

            temp = temp.next;
        }

        return map.get(head);
    }
}`,
          time: 'O(n)',
          timeDesc: '• Pass 1: Traverse the original list to create nodes and populate the map: O(n).\n• Pass 2: Traverse again to connect next and random pointers via O(1) hash map lookups: O(n).\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space to store all n nodes in the HashMap.',
          walkthrough: [
            "Initialize a HashMap<Node, Node> to map each original node to its newly instantiated copy.",
            "Pass 1: Traverse original list from head. For each node temp, create copyNode = new Node(temp.val) and store map.put(temp, copyNode).",
            "Pass 2: Reset temp = head. For each node, retrieve copiedNode = map.get(temp).",
            "Set copiedNode.next = map.get(temp.next) and copiedNode.random = map.get(temp.random).",
            "Return map.get(head), the head of the new cloned deep copy list."
          ]
        },
        optimal: {
          idea: 'Three-step in-place interleave in O(1) auxiliary space:\n\n1. Interleave: Insert clone node right after each original node (A -> A\' -> B -> B\').\n2. Random pointers: copiedNode.random = curr.random.next.\n3. Unweave: Extract cloned list and restore original list links.',
          code: `class Solution {
    public Node copyRandomList(Node head) {
        if(head == null){
            return head;
        }        

        // Step 1: Insert copied nodes directly after each original node
        insertCopyInBetween(head);

        // Step 2: Assign random pointers for all copied nodes
        connectRandomPointers(head);

        // Step 3: Separate the copied list from the original list
        return extractCopiedList(head);
    }

    private void insertCopyInBetween(Node head){
        Node curr = head;

        while(curr != null){
            Node nextNode = curr.next;
            Node copyNode = new Node(curr.val);

            copyNode.next = nextNode;
            curr.next = copyNode;

            curr = nextNode;
        }
    }

    private void connectRandomPointers(Node head){
        Node curr = head;

        while(curr != null){
            Node copiedNode = curr.next;

            if(curr.random != null){
                copiedNode.random = curr.random.next;
            } else {
                copiedNode.random = null;
            }

            curr = curr.next.next;
        }
    }

    private Node extractCopiedList(Node head){
        Node dummy = new Node(-1);
        Node dTemp = dummy;

        Node curr = head;
        while(curr != null){
            dTemp.next = curr.next;
            dTemp = dTemp.next;

            curr.next = curr.next.next;
            curr = curr.next;
        }

        return dummy.next;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Step 1: Interleaving copy nodes takes O(n).\n• Step 2: Assigning random pointers takes O(n).\n• Step 3: Unweaving and restoring original list takes O(n).\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space as the pointer manipulation is done in-place without any extra hash tables or collections.',
          walkthrough: [
            "Handle edge case: if head is null, return null immediately.",
            "Step 1 (insertCopyInBetween): For every original node curr, create copyNode = new Node(curr.val), set copyNode.next = curr.next, and splice it in as curr.next = copyNode.",
            "Step 2 (connectRandomPointers): Traverse interleaved list. For each original node curr, set curr.next.random = (curr.random != null) ? curr.random.next : null, and advance curr = curr.next.next.",
            "Step 3 (extractCopiedList): Use a dummy node to extract the copied nodes (dTemp.next = curr.next) while simultaneously restoring the original list links (curr.next = curr.next.next).",
            "Return dummy.next, which is the head of the deep copy list."
          ]
        }
      },
      {
        id: 'merge-k-sorted-lists',
        title: 'Merge K Sorted Lists',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/description/',
        definition: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
        examples: [
          { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]', explanation: 'The lists merged into one sorted list: 1->1->2->3->4->4->5->6.' },
          { input: 'lists = []', output: '[]' },
          { input: 'lists = [[]]', output: '[]' }
        ],
        brute: {
          idea: 'Traverse all k linked lists and collect all node values into an ArrayList. Sort the array using Collections.sort(), then iterate through the sorted values to construct a new linked list.',
          code: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        ArrayList<Integer> list = new ArrayList<>();

        // Collect all node values across all k lists
        for(int i=0; i<lists.length; i++){
            ListNode temp = lists[i];

            while(temp != null){
                list.add(temp.val);
                temp = temp.next;
            }
        }        

        // Sort all extracted values
        Collections.sort(list);

        ListNode dummy = new ListNode(-1);
        ListNode dTemp = dummy;

        // Reconstruct the sorted linked list
        for(int i=0; i<list.size(); i++){
            dTemp.next = new ListNode(list.get(i));
            dTemp = dTemp.next;
        }

        return dummy.next;
    }
}`,
          time: 'O(N log N)',
          timeDesc: '• Let N be the total number of nodes across all k lists.\n• Extracting values takes O(N).\n• Sorting array of size N takes O(N log N).\n• Rebuilding linked list takes O(N).\n• Total Time: O(N log N)',
          space: 'O(N)',
          spaceDesc: 'O(N) auxiliary space to store all node values in the ArrayList and create new nodes.',
          walkthrough: [
            "Initialize an ArrayList<Integer> list to collect node values.",
            "Traverse each list in the lists array and append each node value to list.",
            "Sort the array list in ascending order using Collections.sort(list).",
            "Create a dummy node and iterate through the sorted list, creating a new ListNode for each value and linking it.",
            "Return dummy.next as the head of the sorted list."
          ]
        },
        better: {
          idea: 'Merge the k lists sequentially one by one using a standard 2-way linked list merge function. Start with the first list as the accumulated head, and repeatedly merge it with the next list for all k lists.',
          code: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists.length == 0) {
            return null;
        }

        ListNode head = lists[0];

        // Iteratively merge cumulative list with each subsequent list
        for (int i = 1; i < lists.length; i++) {
            head = mergeLL(head, lists[i]);
        }

        return head;
    }

    // Standard two-way merge for two sorted linked lists
    private ListNode mergeLL(ListNode firstLL, ListNode secondLL) {
        ListNode dummy = new ListNode(-1);
        ListNode temp = dummy;

        while (firstLL != null && secondLL != null) {
            if (firstLL.val <= secondLL.val) {
                temp.next = firstLL;
                firstLL = firstLL.next;
            } else {
                temp.next = secondLL;
                secondLL = secondLL.next;
            }

            temp = temp.next;
        }

        if (firstLL != null) {
            temp.next = firstLL;
        }

        if (secondLL != null) {
            temp.next = secondLL;
        }

        return dummy.next;
    }
}`,
          time: 'O(k · N)',
          timeDesc: '• In the i-th merge step, merging with the accumulated list of length ~i·(N/k) takes O(i·N/k).\n• Summing over k lists: O(N/k · (1 + 2 + ... + k)) = O(N/k · k²) = O(k · N).\n• Total Time: O(k · N)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space since existing node pointers are rearranged in-place.',
          walkthrough: [
            "Edge case check: If lists.length == 0, return null.",
            "Initialize head = lists[0].",
            "Loop i from 1 to lists.length - 1, updating head = mergeLL(head, lists[i]).",
            "In mergeLL: use a dummy node and two pointers to merge two sorted lists by comparing values and appending the smaller node.",
            "Attach any remaining nodes from firstLL or secondLL.",
            "Return the final merged head."
          ]
        },
        optimal: {
          idea: 'Use a Min-Heap (PriorityQueue<ListNode>) of size k:\n\n• Add the head of each non-empty list to the heap.\n• Repeatedly poll the smallest node, attach it to the result list, and push its next node if present.',
          code: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if(lists.length == 0){
            return null;
        }

        // Min-heap ordered by node values
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);

        // Add the head of each non-empty list
        for(int i=0; i<lists.length; i++){
            ListNode temp = lists[i];
            if(temp != null){
                pq.add(temp);
            }
        }

        ListNode dummy = new ListNode(-1);
        ListNode temp = dummy;

        // Extract minimum node and push its next node
        while(!pq.isEmpty()){
            ListNode smallestNode = pq.remove();
            temp.next = smallestNode;
            temp = temp.next;

            if(smallestNode.next != null){
                pq.add(smallestNode.next);
            }
        }

        return dummy.next;
    }
}`,
          time: 'O(N log k)',
          timeDesc: '• Let N be the total number of nodes and k be the number of linked lists.\n• Inserting the initial k heads takes O(k log k).\n• Each of the N nodes is inserted and extracted from the priority queue of size k once: N · O(log k).\n• Total Time: O(N log k)',
          space: 'O(k)',
          spaceDesc: 'O(k) auxiliary space for the PriorityQueue containing at most k node references simultaneously.',
          walkthrough: [
            "Edge case check: If lists.length == 0, return null immediately.",
            "Initialize a PriorityQueue<ListNode> with a comparator sorting by node.val ascending.",
            "Iterate through lists array and push all non-null head nodes into the priority queue.",
            "Initialize dummy = new ListNode(-1) and temp = dummy.",
            "While pq is not empty: remove smallestNode = pq.remove(), attach it to temp.next, and advance temp.",
            "If smallestNode.next != null, add smallestNode.next into the queue.",
            "Return dummy.next as the head of the completely merged sorted linked list."
          ]
        }
      },
      {
        id: 'reverse-nodes-in-k-group',
        title: 'Reverse Nodes in k-Group',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/description/',
        definition: 'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is. You may not alter the values in the list\'s nodes, only nodes themselves may be changed.',
        examples: [
          { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' },
          { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]' }
        ],
        optimal: {
          idea: 'Reverse in groups of k in-place:\n\n1. Find k-th node: If fewer than k nodes remain, preserve them and break.\n2. Isolate & reverse: Detach k-group (kthNode.next = null) and reverse it in-place.\n3. Connect: Link previous group tail to the new reversed head.\n4. Repeat for the remaining list.',
          code: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode temp = head;
        ListNode prev = null;

        while(temp != null){
            ListNode kthNode = findKthNode(temp, k);

            // If remaining nodes are fewer than k, attach as is and break
            if(kthNode == null){
                if(prev != null){
                    prev.next = temp;
                }
                break;
            }

            ListNode nextNode = kthNode.next;
            kthNode.next = null;                           // Detach current k-group

            reverse(temp);                                 // Reverse current k-group

            // If it's the first group, kthNode becomes the new head of the entire list
            if(temp == head){
                head = kthNode;
            } else {
                prev.next = kthNode;                       // Connect previous group tail to new group head
            }

            prev = temp;                                   // temp is now the tail of reversed group
            temp = nextNode;                               // Move to the next group
        }

        return head;
    }

    // Helper to find the k-th node from temp
    public ListNode findKthNode(ListNode temp, int k) {
        int count = 1;
        while (temp != null && count < k) {
            temp = temp.next;
            count++;
        }
        return temp;
    }

    // Helper to reverse an isolated sublist
    public void reverse(ListNode temp) {
        ListNode curr = temp;
        ListNode prev = null;

        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;

            prev = curr;
            curr = next;
        }
    }
}`,
          time: 'O(n)',
          timeDesc: '• Finding the k-th node traverses each node once: O(n).\n• Reversing each group traverses each node once: O(n).\n• Total Time: O(2n) = O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space since node pointers are reversed in-place without recursion stack or auxiliary data structures.',
          walkthrough: [
            "Initialize temp = head and prev = null.",
            "In a loop while temp != null, find kthNode = findKthNode(temp, k).",
            "If kthNode == null (fewer than k nodes remain), link prev.next = temp and break.",
            "Save nextNode = kthNode.next and isolate the k-group by setting kthNode.next = null.",
            "Call reverse(temp) to reverse the isolated group in-place.",
            "If temp == head, update head = kthNode (the k-th node is the new overall list head); otherwise set prev.next = kthNode.",
            "Set prev = temp (the original group head is now the group tail) and advance temp = nextNode.",
            "Return the updated head."
          ]
        }
      },
      {
        id: 'lru-cache',
        title: 'LRU Cache',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/lru-cache/description/',
        definition: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) in O(1) average time complexity.',
        examples: [
          {
            input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
            output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
            explanation: 'LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache: {1=1}\nlRUCache.put(2, 2); // cache: {1=1, 2=2}\nlRUCache.get(1);    // return 1 (1 is MRU)\nlRUCache.put(3, 3); // evicts key 2, cache: {1=1, 3=3}\nlRUCache.get(2);    // return -1 (not found)\nlRUCache.put(4, 4); // evicts key 1, cache: {4=4, 3=3}\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4'
          }
        ],
        optimal: {
          idea: 'Combine a Doubly Linked List (DLL) with a HashMap to achieve O(1) operations:\n\n• HashMap<Integer, Node>: Gives O(1) direct lookup to find any cached node.\n• Doubly Linked List: Tracks recency using a dummy head (MRU) and dummy tail (LRU).\n\nKey Operations:\n• get(key): If key exists, move its node to the MRU position (right after head) and return its value.\n• put(key, value): If key exists, update and move to MRU. If capacity is reached, evict the LRU node (tail.prev) from both the map and DLL.',
          code: `class LRUCache {
    class Node {
        int key;
        int val;
        Node next;
        Node prev;

        Node(int key, int val){
            this.key = key;
            this.val = val;
        }
    }

    Node head = new Node(-1, -1);                          // Dummy MRU head
    Node tail = new Node(-1, -1);                          // Dummy LRU tail

    int cap;
    HashMap<Integer, Node> map = new HashMap<>();

    public LRUCache(int capacity) {
        cap = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if(map.containsKey(key)){
            Node existingNode = map.get(key);
            int val = existingNode.val;

            map.remove(key);
            deleteNode(existingNode);

            addNode(existingNode);                         // Move to MRU position (right after head)

            map.put(key, head.next);
            return val;
        }

        return -1;
    }

    public void put(int key, int value) {
        if(map.containsKey(key)){
            Node existingNode = map.get(key);
            map.remove(key);
            deleteNode(existingNode);
        }

        if(map.size() == cap){
            map.remove(tail.prev.key);                     // Evict LRU node (right before tail)
            deleteNode(tail.prev);
        }

        addNode(new Node(key, value));                     // Add new node at MRU position
        map.put(key, head.next);
    }

    // Insert node right after dummy head (MRU position)
    public void addNode(Node newNode){
        Node temp = head.next;
        newNode.next = temp;
        newNode.prev = head;

        head.next = newNode;
        temp.prev = newNode;
    }

    // Remove node from doubly linked list in O(1)
    public void deleteNode(Node node){
        Node prevNode = node.prev;
        Node nextNode = node.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }
}`,
          time: 'O(1)',
          timeDesc: '• get(key): O(1) average time for hash map lookup, node deletion, and node insertion.\n• put(key, value): O(1) average time for hash map lookup, deletion, eviction, and insertion.\n• Total Time: O(1) per operation',
          space: 'O(capacity)',
          spaceDesc: 'O(capacity) auxiliary space to store at most capacity entries in the Doubly Linked List and HashMap.',
          walkthrough: [
            "Initialize LRUCache: store capacity cap and connect dummy head and tail (head.next = tail, tail.prev = head).",
            "get(key): Check if map contains key. If found, extract val, remove from map, call deleteNode(existingNode), call addNode(existingNode) to put it at MRU, re-add to map, and return val. Otherwise return -1.",
            "put(key, value): If key is already in map, remove it and delete existingNode from DLL.",
            "If map.size() == cap: Evict the least recently used node by removing tail.prev.key from map and calling deleteNode(tail.prev).",
            "Instantiate new Node(key, value), add it right after head via addNode, and insert into map.",
            "addNode(newNode): Link newNode between head and head.next in O(1).",
            "deleteNode(node): Reconnect node.prev and node.next in O(1)."
          ]
        }
      },
    ]
  };
