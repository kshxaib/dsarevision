import { p } from '../helper.js';

export const heapPriorityQueue = {
    id: 'heap-priority-queue',
    name: 'Heap & Priority Queue',
    icon: '⏫',
    problems: [
      {
        id: 'kth-largest-element-in-an-array',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/description/',
        definition: 'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting?',
        examples: [
          {
            input: 'nums = [3,2,1,5,6,4], k = 2',
            output: '5',
            explanation: 'The sorted array is [1,2,3,4,5,6], and the 2nd largest element is 5.'
          },
          {
            input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4',
            output: '4',
            explanation: 'The sorted array is [1,2,2,3,3,4,5,5,6], and the 4th largest element is 4.'
          }
        ],
        optimal: {
          idea: 'Maintain a Min-Heap of size k. Add the first k elements into the heap. For each remaining element, if it is greater than the smallest element currently in the heap (pq.peek()), pop the root and push the new element. At the end, the heap contains the k largest elements seen, and pq.peek() is precisely the kth largest element.',
          code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        for (int i = 0; i < k; i++) {
            pq.add(nums[i]);
        }

        for (int i = k; i < nums.length; i++) {
            int curr = nums[i];

            if (curr > pq.peek()) {
                pq.remove();
                pq.add(curr);
            }
        }

        return pq.peek();
    }
}`,
          time: 'O(N log k)',
          timeDesc: '• Pushing first k elements: O(k log k)\n• Processing remaining (N - k) elements: at most O((N - k) log k)\n• Total Time: O(N log k), significantly faster than O(N log N) sorting when k << N.',
          space: 'O(k)',
          spaceDesc: '• The priority queue holds at most k elements simultaneously.',
          walkthrough: [
            'Initialize a standard Min-Heap (PriorityQueue<Integer> pq) where the smallest element is at the root.',
            'Push the first k elements of nums into pq.',
            'Iterate from index k to nums.length - 1. For each number curr, compare it with pq.peek().',
            'If curr > pq.peek(), remove the smallest element with pq.remove() and add curr via pq.add(curr).',
            'Return pq.peek(). The heap now holds the k largest elements, with the kth largest sitting at the top.'
          ]
        }
      },
      p('Last Stone Weight', 'Easy', 'Simulate stone smashing and return the last stone weight.'),
      p('K Closest Points to Origin', 'Medium', 'Find the k closest points to the origin.'),
      p('Kth Largest Element in a Stream', 'Easy', 'Design a class to find the kth largest element in a stream.'),
      p('Task Scheduler', 'Medium', 'Find minimum intervals to execute all tasks with cooldown.'),
      p('Find Median from Data Stream', 'Hard', 'Find the median from continuously arriving numbers.'),
      p('Design Twitter', 'Medium', 'Design a simplified Twitter with follow, unfollow, post, and feed.'),
    ]
  };
