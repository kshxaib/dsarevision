import { p } from '../helper.js';

export const sorting = {
  id: 'sorting',
  name: 'Sorting Algorithms',
  problems: [
    {
      id: 'selection-sort',
      title: 'Selection Sort',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/sort-an-array/description/',
      image: null,
      definition: 'Repeatedly find the minimum element from the unsorted array and place it at the correct position.',
      examples: [
        {
          input: 'arr = [64, 25, 12, 22, 11]',
          output: '[11, 12, 22, 25, 64]',
          explanation: 'In each pass, find the smallest element in the unsorted suffix and swap it to the front.'
        },
        {
          input: 'arr = [5, 4, 3, 2, 1]',
          output: '[1, 2, 3, 4, 5]',
          explanation: 'Elements are placed in ascending order by repeatedly selecting the minimum.'
        }
      ],
      optimal: {
        idea: 'Find the minimum element in the unsorted suffix and swap it with the element at the current index.',
        code: `class Solution {
    public void selectionSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i <= n - 2; i++) { // : O(N) outer passes
            int minIdx = i;

            for (int j = i + 1; j <= n - 1; j++) { // : O(N) find minimum element
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }

            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
        time: 'O(n²)',
        timeDesc: 'O(n²) comparisons across nested passes.',
        space: 'O(1)',
        spaceDesc: 'O(1) in-place sorting.'
      }
    },
    {
      id: 'bubble-sort',
      title: 'Bubble Sort',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/sort-an-array/description/',
      image: null,
      definition: 'Repeatedly compare adjacent elements and swap if they are in the wrong order. After each pass, the largest unsorted element moves to the end.',
      examples: [
        {
          input: 'arr = [64, 34, 25, 12, 22, 11, 90]',
          output: '[11, 12, 22, 25, 34, 64, 90]',
          explanation: 'Adjacent pairs are compared and swapped, bubbling the largest value to the end of the array each pass.'
        },
        {
          input: 'arr = [5, 1, 4, 2, 8]',
          output: '[1, 2, 4, 5, 8]',
          explanation: 'Passes continue until no swaps are needed.'
        }
      ],
      optimal: {
        idea: 'Repeatedly compare adjacent elements and swap them if out of order, bubbling the largest to the end each pass. Break early if no swaps occurred.',
        code: `class Solution {
    public void bubbleSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i <= n - 2; i++) { // : O(N) outer passes
            boolean swapped = false;

            for (int j = 0; j <= n - i - 2; j++) { // : compare adjacent pairs
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            if (!swapped) {
                break;
            }
        }
    }
}`,
        time: 'O(n²)',
        timeDesc: 'O(n²) worst case, O(n) best case if already sorted.',
        space: 'O(1)',
        spaceDesc: 'O(1) in-place sorting.'
      }
    },
    {
      id: 'insertion-sort',
      title: 'Insertion Sort',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/sort-an-array/description/',
      image: null,
      definition: 'Builds a sorted array one element at a time by inserting each element into its correct position.',
      examples: [
        {
          input: 'arr = [12, 11, 13, 5, 6]',
          output: '[5, 6, 11, 12, 13]',
          explanation: 'Elements from the unsorted part are inserted into their correct position on the left.'
        },
        {
          input: 'arr = [4, 3, 2, 10, 12, 1, 5, 6]',
          output: '[1, 2, 3, 4, 5, 6, 10, 12]',
          explanation: 'Each element shifts larger predecessors to the right before placing itself.'
        }
      ],
      optimal: {
        idea: 'Pick each element and shift larger elements to the right to insert it into its sorted position.',
        code: `class Solution {
    public void insertionSort(int[] arr) {
        int n = arr.length;

        for (int i = 1; i <= n - 1; i++) { // : O(N) outer passes
            int curr = arr[i];
            int prev = i - 1;

            while (prev >= 0 && arr[prev] > curr) { // : shift larger elements to the right
                arr[prev + 1] = arr[prev];
                prev--;
            }

            arr[prev + 1] = curr;
        }
    }
}`,
        time: 'O(n²)',
        timeDesc: 'O(n²) worst case, O(n) best case if already sorted.',
        space: 'O(1)',
        spaceDesc: 'O(1) in-place sorting.'
      }
    },
    {
      id: 'merge-sort',
      title: 'Merge Sort',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/sort-an-array/description/',
      image: null,
      definition: 'Divides the array into halves, recursively sorts them, and merges the sorted halves.',
      examples: [
        {
          input: 'nums = [5, 2, 3, 1]',
          output: '[1, 2, 3, 5]',
          explanation: 'Divide into halves recursively down to single items, then merge back in sorted order.'
        },
        {
          input: 'nums = [5, 1, 1, 2, 0, 0]',
          output: '[0, 0, 1, 1, 2, 5]',
          explanation: 'Halves are split and merged back into non-decreasing order.'
        }
      ],
      optimal: {
        idea: 'Recursively split the array in halves, sort each half, and merge the two sorted halves using a temporary buffer.',
        code: `class Solution {
    public void mergeSort(int[] nums, int left, int right) {
        if (left >= right) {
            return;
        }

        int mid = left + (right - left) / 2;

        mergeSort(nums, left, mid); // : recursively sort left half
        mergeSort(nums, mid + 1, right); // : recursively sort right half

        merge(nums, left, mid, right); // : merge two sorted halves
    }

    private void merge(int[] nums, int left, int mid, int right) {
        int temp[] = new int[right - left + 1]; // : O(N) temporary merge buffer
        int i = left;
        int j = mid + 1;
        int k = 0;

        while (i <= mid && j <= right) { // : compare and copy smaller element
            if (nums[i] <= nums[j]) {
                temp[k++] = nums[i++];
            } else {
                temp[k++] = nums[j++];
            }
        }

        while (i <= mid) { // : copy remaining left elements
            temp[k++] = nums[i++];
        }

        while (j <= right) { // : copy remaining right elements
            temp[k++] = nums[j++];
        }

        for (int x = left; x <= right; x++) { // : copy back to original array
            nums[x] = temp[x - left];
        }
    }
}`,
        time: 'O(n log n)',
        timeDesc: 'O(n log n) divide and conquer across all cases.',
        space: 'O(n)',
        spaceDesc: 'O(n) auxiliary buffer for merging.'
      }
    },
    {
      id: 'quick-sort',
      title: 'Quick Sort',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/sort-an-array/description/',
      image: null,
      definition: 'Selects a pivot, partitions the array around it, and recursively sorts the left and right subarrays.',
      examples: [
        {
          input: 'nums = [10, 80, 30, 90, 40, 50, 70]',
          output: '[10, 30, 40, 50, 70, 80, 90]',
          explanation: 'Partition around pivot so smaller elements go left and larger go right, then sort recursively.'
        },
        {
          input: 'nums = [5, 2, 3, 1]',
          output: '[1, 2, 3, 5]',
          explanation: 'Subarrays are partitioned until all lengths are 0 or 1.'
        }
      ],
      optimal: {
        idea: 'Partition the array around a pivot placing smaller elements left and larger right, then recursively sort both partitions.',
        code: `class Solution {
    public void sort(int[] nums, int start, int end) {
        if (start >= end) {
            return;
        }

        int pIdx = partition(nums, start, end); // : partition around pivot

        sort(nums, start, pIdx - 1); // : recursively sort left partition
        sort(nums, pIdx + 1, end); // : recursively sort right partition
    }

    private int partition(int[] nums, int start, int end) {
        int pivot = nums[end];
        int i = start - 1;

        for (int j = start; j <= end - 1; j++) { // : scan and place elements smaller than pivot
            if (nums[j] < pivot) {
                i++;
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
            }
        }

        i++;
        int temp = nums[i];
        nums[i] = nums[end];
        nums[end] = temp;

        return i;
    }
}`,
        time: 'O(n log n)',
        timeDesc: 'O(n log n) average case, O(n²) worst case.',
        space: 'O(log n)',
        spaceDesc: 'O(log n) recursion call stack depth.'
      }
    }
  ]
};
