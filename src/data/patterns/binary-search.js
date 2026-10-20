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
      {
        id: 'koko-eating-bananas',
        title: 'Koko Eating Bananas',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/description/',
        definition: 'Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them and will not eat any more bananas during this hour. Return the minimum integer k such that she can eat all the bananas within h hours.',
        examples: [
          { input: 'piles = [3,6,7,11], h = 8', output: '4' },
          { input: 'piles = [30,11,23,4,20], h = 5', output: '30' },
          { input: 'piles = [30,11,23,4,20], h = 6', output: '23' }
        ],
        brute: {
          idea: 'The minimum possible speed is 1, and the maximum speed needed is the largest pile. Linearly test every speed k from 1 up to max(piles), calculating the total hours required. The first speed where total hours <= h is the answer.',
          code: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int n = piles.length;

        // Find the maximum pile size (upper bound on speed)
        int max = Integer.MIN_VALUE;
        for(int i=0; i<n; i++){
            max = Math.max(max, piles[i]);
        }

        // Linearly test speeds from 1 up to max
        for (int k = 1; k <= max; k++) {
            int totalHrs = calculateTotalHours(piles, k);

            if (totalHrs <= h) {
                return k;                                  // First valid speed is minimum
            }
        }

        return max;
    }

    // Calculate total hours required at eating speed h
    private int calculateTotalHours(int piles[], int h){
        int totalHr = 0;

        for(int i=0; i<piles.length; i++){
            totalHr += Math.ceil((double)piles[i]/h);      // Round up each pile's eating time
        }

        return totalHr;
    }
}`,
          time: 'O(max(piles) * n)',
          timeDesc: '• Finding the maximum element takes O(n).\n• In the worst case, speeds from 1 to max are tested, each taking O(n) hours calculation.\n• Total Time: O(max(piles) * n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space.',
          walkthrough: [
            "Find the maximum pile size max in piles (Koko never needs to eat faster than the largest pile per hour).",
            "Iterate eating speed k from 1 to max.",
            "For each speed k, compute total hours required: sum of Math.ceil((double)pile / k) for all piles.",
            "If totalHrs <= h, return k immediately (the first speed that finishes within h hours is minimal).",
            "If loop terminates, return max."
          ]
        },
        optimal: {
          idea: 'Apply Binary Search on Answer within the speed search space [1, max(piles)]. For any candidate speed mid, calculate total hours required. If totalHrs <= h, mid is feasible, so record it and search for a smaller speed (high = mid - 1); otherwise search for a higher speed (low = mid + 1).',
          code: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int n = piles.length;

        // Find the maximum pile size
        int max = Integer.MIN_VALUE;
        for(int i=0; i<n; i++){
            max = Math.max(max, piles[i]);
        }

        int minBananaPerHr = Integer.MAX_VALUE;
        int low = 1;                                       // Minimum possible speed
        int high = max;                                    // Maximum possible speed

        // Binary search on speed range [1, max]
        while(low <= high){
            int mid = low + (high - low)/2;
            int totalHrs = calculateTotalHours(piles, mid);

            if(totalHrs <= h){
                minBananaPerHr = mid;                      // Possible answer, try smaller speed
                high = mid -1;
            } else {
                low = mid +1;                              // Speed too slow, need to eat faster
            }
        }

        return minBananaPerHr;
    }

    // Calculate total hours required at eating speed h
    private int calculateTotalHours(int piles[], int h){
        int totalHr = 0;

        for(int i=0; i<piles.length; i++){
            totalHr += Math.ceil((double)piles[i]/h);      // Ceiling division
        }

        return totalHr;
    }
}`,
          time: 'O(n * log(max(piles)))',
          timeDesc: '• Finding maximum pile takes O(n).\n• Binary search runs for O(log(max(piles))) iterations.\n• In each iteration, calculateTotalHours takes O(n).\n• Total Time: O(n * log(max(piles)))',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space.',
          walkthrough: [
            "Find the maximum pile size max in piles, which defines the upper bound on speed.",
            "Initialize binary search range low = 1 and high = max.",
            "While low <= high, pick speed mid = low + (high - low) / 2 and compute total hours needed.",
            "If totalHrs <= h: Koko can finish in time at this speed. Save mid as a potential answer and try smaller speeds by setting high = mid - 1.",
            "Else: Koko is too slow (exceeds h hours), so increase speed by setting low = mid + 1.",
            "Return minBananaPerHr."
          ]
        }
      },
      {
        id: 'search-in-rotated-sorted-array',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/description/',
        definition: 'Given the array nums after the possible rotation and an integer target (k), return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.',
        examples: [
          { input: 'nums = [4,5,6,7,0,1,2], k = 0', output: '4', explanation: 'k = 0 exists in nums at index 4' },
          { input: 'nums = [4,5,6,7,0,1,2], k = 3', output: '-1', explanation: 'k = 3 does not exist in nums so return -1' },
          { input: 'nums = [1], k = 0', output: '-1', explanation: 'k = 0 does not exist in nums so return -1' }
        ],
        brute: {
          idea: 'Traverse the entire array linearly from start to end and compare each element nums[i] with target k. If found, return its index i; if the loop finishes without a match, return -1.',
          code: `class Solution {
    public int search(int[] nums, int k) {
        int n = nums.length;

        // Linearly scan every element
        for(int i = 0; i < n; i++){
            if(nums[i] == k){
                return i;                                  // Target found at index i
            }
        }

        return -1;                                         // Target not present
    }
}`,
          time: 'O(n)',
          timeDesc: '• Traverse the array linearly from start to end.\n• In the worst case (target not present or at the end), check all n elements.\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space.',
          walkthrough: [
            "Initialize n = nums.length.",
            "Iterate from index i = 0 to n - 1.",
            "If nums[i] == k, return index i immediately.",
            "If loop terminates without finding k, return -1."
          ]
        },
        optimal: {
          idea: 'In a rotated sorted array, dividing the array at mid always produces at least one sorted half. Identify which half (left [start...mid] or right [mid...end]) is sorted. Then check if target k falls within that sorted half\'s boundaries to eliminate the other half.',
          code: `class Solution {
    public int search(int[] nums, int k) {
       int start = 0;
       int end = nums.length - 1;

       while(start <= end){
            int mid = start + (end - start)/2;

            if(nums[mid] == k){
                return mid;
            }

            // Check if the left half [start...mid] is sorted
            if(nums[start] <= nums[mid]) {   
                if(nums[start] <= k && k < nums[mid]){
                    end = mid - 1;                         // k lies in left sorted half
                } else {
                    start = mid + 1;                       // k lies in right half
                }
            } else {                         
                // Right half [mid...end] is sorted
                if(nums[mid] < k && k <= nums[end]){
                    start = mid + 1;                       // k lies in right sorted half
                } else {
                    end = mid - 1;                         // k lies in left half
                }
            }
       }

       return -1;
    }
}`,
          time: 'O(log n)',
          timeDesc: '• In each step, we identify the sorted half and discard half of the search space.\n• Total iterations = ⌈log₂ n⌉.\n• Total Time: O(log n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space using pointers start, end, and mid.',
          walkthrough: [
            "Initialize start = 0 and end = nums.length - 1.",
            "While start <= end, calculate mid = start + (end - start) / 2.",
            "If nums[mid] == k, return mid.",
            "If nums[start] <= nums[mid], the left half is sorted: if nums[start] <= k < nums[mid], search left (end = mid - 1); else search right (start = mid + 1).",
            "Otherwise, the right half is sorted: if nums[mid] < k <= nums[end], search right (start = mid + 1); else search left (end = mid - 1).",
            "If start > end without finding k, return -1."
          ]
        }
      },
      p('Find Minimum In Rotated Sorted Array', 'Medium', 'Find the minimum element in a rotated sorted array.'),
      p('Time Based Key Value Store', 'Medium', 'Design key-value store with timestamp-based retrieval.'),
      p('Median of Two Sorted Arrays', 'Hard', 'Find the median of two sorted arrays in O(log(m+n)).'),
    ]
  };
