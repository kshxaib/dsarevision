import { p } from '../helper.js';

export const binarySearch = {
    id: 'binary-search',
    name: 'Binary Search',
    icon: '🔍',
    timestamp: '6:19:22',
    problems: [
      {
        id: 'binary-search-problem',
        title: 'Binary Search',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/binary-search/description/',
        definition: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
        examples: [
          { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
          { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' }
        ],
        brute: {
          idea: 'Perform a linear search by traversing the array from beginning to end, comparing each element with the target. If target is found, return its index; otherwise return -1.',
          code: `class Solution {
    public int search(int[] nums, int target) {
        int n = nums.length;

        // Linear scan through all elements
        for(int i = 0; i < n; i++){
            if(nums[i] == target){
                return i;                                  // Target found at index i
            }
        }

        return -1;                                         // Target not present
    }
}`,
          time: 'O(n)',
          timeDesc: '• Traverse the array linearly from start to end.\n• In the worst case (target not present or at the end), check all n elements: O(n).',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space.',
          walkthrough: [
            "Initialize n = nums.length.",
            "Iterate through the array with loop index i from 0 to n - 1.",
            "Check if nums[i] == target: if matched, immediately return index i.",
            "If the loop finishes without finding target, return -1."
          ]
        },
        optimal: {
          idea: 'Take advantage of the sorted array using Binary Search. Maintain search space [low, high]. Compare the middle element nums[mid] with target: if equal, return mid. If nums[mid] < target, discard the left half (low = mid + 1); otherwise discard the right half (high = mid - 1).',
          code: `class Solution {
    public int search(int[] nums, int target) {
        int n = nums.length;

        int low = 0;
        int high = n-1;

        while(low <= high){
            int mid = low + (high - low)/2;                // Avoid potential integer overflow

            if(nums[mid] == target){
                return mid;                                // Target found at mid
            }

            else if(nums[mid] < target){
                low = mid +1;                              // Target lies in right half
            } else {
                high = mid -1;                             // Target lies in left half
            }
        }

        return -1;                                         // Target not found in array
    }
}`,
          time: 'O(log n)',
          timeDesc: '• The search space is halved in every iteration.\n• Total iterations = ⌈log₂ n⌉.\n• Total Time: O(log n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space using pointers low, high, and mid.',
          walkthrough: [
            "Initialize low = 0 and high = n - 1.",
            "While low <= high, calculate mid = low + (high - low) / 2 to avoid overflow.",
            "If nums[mid] == target: target is found, return mid.",
            "Else if nums[mid] < target: target is greater than mid, eliminate left half by low = mid + 1.",
            "Else: target is smaller than mid, eliminate right half by high = mid - 1.",
            "If low > high without finding target, return -1."
          ]
        }
      },
      {
        id: 'search-a-2d-matrix',
        title: 'Search a 2D Matrix',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix/description/',
        definition: 'You are given an m x n integer matrix matrix with the following two properties: each row is sorted in non-decreasing order, and the first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise. You must write a solution in O(log(m * n)) time complexity.',
        examples: [
          { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true' },
          { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'false' }
        ],
        brute: {
          idea: 'Traverse the entire matrix using two nested loops and compare each element matrix[i][j] with the target. If target is found, return true; otherwise return false.',
          code: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int n = matrix.length;
        int m = matrix[0].length;

        // Traverse every row and column
        for(int i = 0; i < n; i++){
            for(int j = 0; j < m; j++){
                if(matrix[i][j] == target){
                    return true;                           // Target found
                }
            }
        }

        return false;                                      // Target not in matrix
    }
}`,
          time: 'O(n * m)',
          timeDesc: '• In the worst case, every element of the n x m matrix is checked.\n• Total Time: O(n * m)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space.',
          walkthrough: [
            "Initialize n = matrix.length and m = matrix[0].length.",
            "Use nested loops to check every element matrix[i][j] in the matrix.",
            "If matrix[i][j] == target, return true immediately.",
            "If both loops finish without finding target, return false."
          ]
        },
        optimal: {
          idea: 'Treat the entire n x m sorted matrix as a single 1D sorted array of length n * m. Apply Binary Search on range [0, n * m - 1]. Map any 1D index mid back to 2D coordinates using row = mid / m and col = mid % m.',
          code: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int n = matrix.length;
        int m = matrix[0].length;

        int low = 0;
        int high = n * m - 1;                              // Total elements = n * m

        while(low <= high){
            int mid = low + (high - low)/2;

            // Map 1D index mid to 2D coordinates
            int row = mid / m;
            int col = mid % m;

            int element = matrix[row][col];

            if(element == target){
                return true;                               // Target found
            } else if(element < target){
                low = mid + 1;                             // Target in right half
            } else {
                high = mid - 1;                            // Target in left half
            }
        }

        return false;                                      // Target not found
    }
}`,
          time: 'O(log(n * m))',
          timeDesc: '• Binary search across n * m virtual elements.\n• Total Time: O(log(n * m)) = O(log n + log m)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space.',
          walkthrough: [
            "Initialize n = matrix.length, m = matrix[0].length, low = 0, and high = n * m - 1.",
            "While low <= high, calculate middle index mid = low + (high - low) / 2.",
            "Map 1D mid to 2D coordinates: row = mid / m and col = mid % m.",
            "If matrix[row][col] == target: return true.",
            "Else if matrix[row][col] < target: search the right half by setting low = mid + 1.",
            "Else: search the left half by setting high = mid - 1.",
            "If low > high without matching target, return false."
          ]
        }
      },
      p('Koko Eating Bananas', 'Medium', 'Find minimum eating speed to finish all bananas in h hours.'),
      p('Find Minimum In Rotated Sorted Array', 'Medium', 'Find the minimum element in a rotated sorted array.'),
      p('Search In Rotated Sorted Array', 'Medium', 'Search for target in a rotated sorted array.'),
      p('Time Based Key Value Store', 'Medium', 'Design key-value store with timestamp-based retrieval.'),
      p('Median of Two Sorted Arrays', 'Hard', 'Find the median of two sorted arrays in O(log(m+n)).'),
    ]
  };
