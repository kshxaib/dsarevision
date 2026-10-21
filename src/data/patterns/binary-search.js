import { p } from '../helper.js';

export const binarySearch = {
    id: 'binary-search',
    name: 'Binary Search',
    icon: '🔍',
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
          idea: 'Binary Search (one half is always sorted):\n\n• If left half sorted (nums[low] <= nums[mid]): Check if target is in [nums[low], nums[mid]]. If yes, search left; else search right.\n• Else right half sorted: Check if target is in [nums[mid], nums[high]]. If yes, search right; else search left.',
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
      {
        id: 'find-minimum-in-rotated-sorted-array',
        title: 'Find Minimum in Rotated Sorted Array',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/',
        definition: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.',
        examples: [
          { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'The original array was [1,2,3,4,5] rotated 3 times.' },
          { input: 'nums = [4,5,6,7,0,1,2]', output: '0', explanation: 'The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.' },
          { input: 'nums = [11,13,15,17]', output: '11', explanation: 'The original array was [11,13,15,17] and it was rotated 4 times.' }
        ],
        brute: {
          idea: 'Traverse the entire array linearly from start to end and track the smallest element seen so far.',
          code: `class Solution {
    public int findMin(int[] nums) {
        int n = nums.length;
        int min = Integer.MAX_VALUE;

        // Linearly scan every element to find minimum
        for(int i = 0; i < n; i++){
            min = Math.min(min, nums[i]);
        }

        return min;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Traverse through all n elements once.\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space.',
          walkthrough: [
            "Initialize min = Integer.MAX_VALUE.",
            "Iterate through nums from index 0 to n - 1.",
            "Update min = Math.min(min, nums[i]) at each element.",
            "Return min after the loop ends."
          ]
        },
        optimal: {
          idea: 'In a rotated sorted array, dividing at mid gives at least one sorted half. If the left half [low...mid] is sorted, nums[low] is the smallest in that range—record it and explore the right half (low = mid + 1). If the left half is unsorted, the right half is sorted and nums[mid] is a minimum candidate—record it and explore the left half (high = mid - 1).',
          code: `class Solution {
    public int findMin(int[] nums) {
        int n = nums.length;

        int min = Integer.MAX_VALUE;
        int low = 0;
        int high = n-1;

        while(low <= high){
            int mid = low + (high - low)/2;

            // If left half [low...mid] is sorted
            if(nums[low] <= nums[mid]){
                min = Math.min(min, nums[low]);            // nums[low] is the minimum in left half
                low = mid + 1;                             // Eliminate left half, search right
            } else {
                // Right half [mid...high] is sorted
                min = Math.min(min, nums[mid]);            // nums[mid] is candidate minimum
                high = mid - 1;                            // Eliminate right half, search left
            }
        }

        return min;
    }
}`,
          time: 'O(log n)',
          timeDesc: '• In each iteration, we identify the sorted half, record its minimum, and eliminate half of the search space.\n• Total iterations = ⌈log₂ n⌉.\n• Total Time: O(log n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space using pointers low, high, mid, and min.',
          walkthrough: [
            "Initialize low = 0, high = n - 1, and min = Integer.MAX_VALUE.",
            "While low <= high, compute mid = low + (high - low) / 2.",
            "If nums[low] <= nums[mid], the left half is sorted: record min = Math.min(min, nums[low]) and move right (low = mid + 1).",
            "Else, the right half is sorted: record min = Math.min(min, nums[mid]) and move left (high = mid - 1).",
            "Return min."
          ]
        }
      },
      {
        id: 'time-based-key-value-store',
        title: 'Time Based Key-Value Store',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/time-based-key-value-store/description/',
        definition: 'Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key\'s value at a certain timestamp.\n\nImplement the TimeMap class:\n• TimeMap() Initializes the object of the data structure.\n• void set(String key, String value, int timestamp) Stores the key with the value at the given time stamp.\n• String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns "".',
        examples: [
          {
            input: '["TimeMap", "set", "get", "get", "set", "get", "get"]\n[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]',
            output: '[null, null, "bar", "bar", null, "bar2", "bar2"]',
            explanation: 'TimeMap timeMap = new TimeMap();\ntimeMap.set("foo", "bar", 1);  // store key "foo" and value "bar" along with timestamp = 1\ntimeMap.get("foo", 1);         // returns "bar"\ntimeMap.get("foo", 3);         // returns "bar" (largest timestamp_prev <= 3 is 1)\ntimeMap.set("foo", "bar2", 4); // store key "foo" and value "bar2" along with timestamp = 4\ntimeMap.get("foo", 4);         // returns "bar2"\ntimeMap.get("foo", 5);         // returns "bar2"'
          }
        ],
        brute: {
          idea: 'Store key-value pairs in a nested HashMap<String, HashMap<Integer, String>>. On get, linearly iterate through all timestamps recorded for the key to find the largest timestamp <= target.',
          code: `class TimeMap {
    HashMap<String, HashMap<Integer, String>> map;

    public TimeMap() {
        map = new HashMap<>();    
    }
    
    public void set(String key, String value, int timestamp) {
        if(!map.containsKey(key)){
            map.put(key, new HashMap<>());
        }

        map.get(key).put(timestamp, value);
    }
    
    public String get(String key, int timestamp) {
        if(!map.containsKey(key)){
            return "";
        }

        HashMap<Integer, String> innerMap = map.get(key);

        int maxTimestamp = -1;
        String ans = "";

        // Linearly scan all timestamps recorded for this key
        for(int time : innerMap.keySet()){
            if(time <= timestamp && time > maxTimestamp){
                ans = innerMap.get(time);
                maxTimestamp = time;
            }
        }

        return ans;
    }
}`,
          time: 'set: O(1), get: O(n)',
          timeDesc: '• set: O(1) average time to insert into nested HashMap.\n• get: O(n) where n is the number of timestamps stored for the key, as it scans all keys in innerMap.',
          space: 'O(m)',
          spaceDesc: 'O(m) space where m is the total number of (key, value, timestamp) entries stored.',
          walkthrough: [
            "TimeMap(): Initialize a nested HashMap<String, HashMap<Integer, String>>.",
            "set(key, value, timestamp): If key doesn't exist, create an inner map. Put (timestamp -> value) into innerMap.",
            "get(key, timestamp): If key doesn't exist in map, return \"\".",
            "Iterate over innerMap.keySet(): if time <= timestamp and time > maxTimestamp, update maxTimestamp and ans.",
            "Return ans."
          ]
        },
        optimal: {
          idea: 'Maintain a list of timestamps for each key in addition to the map. Since set calls arrive in strictly increasing timestamp order, the timestamp list is already sorted. On get, apply Binary Search on the timestamps list to find the largest timestamp <= target in O(log n) time.',
          code: `class TimeMap {
    HashMap<String, HashMap<Integer, String>> map;
    HashMap<String, List<Integer>> timestamps;

    public TimeMap() {
        map = new HashMap<>();
        timestamps = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        if (!map.containsKey(key)) {
            map.put(key, new HashMap<>());
            timestamps.put(key, new ArrayList<>());
        }

        map.get(key).put(timestamp, value);
        timestamps.get(key).add(timestamp);              // Timestamps arrive in strictly increasing order
    }
    
    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) {
            return "";
        }

        List<Integer> times = timestamps.get(key);

        int low = 0;
        int high = times.size() - 1;
        String ans = "";

        // Binary search for the largest timestamp <= target timestamp
        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (times.get(mid) <= timestamp) {
                ans = map.get(key).get(times.get(mid));  // Valid candidate, try to find a larger one
                low = mid + 1;
            } else {
                high = mid - 1;                          // Timestamp is too large, search left
            }
        }

        return ans;
    }
}`,
          time: 'set: O(1), get: O(log n)',
          timeDesc: '• set: O(1) average time to append to list and insert into map.\n• get: O(log n) binary search across the n timestamps for the given key.',
          space: 'O(m)',
          spaceDesc: 'O(m) auxiliary space where m is the total number of entries stored across maps and lists.',
          walkthrough: [
            "TimeMap(): Initialize map (key -> timestamp -> value) and timestamps (key -> List of timestamps).",
            "set(key, value, timestamp): Add entry to map and append timestamp to timestamps list (preserves sorted order).",
            "get(key, timestamp): If key doesn't exist, return \"\".",
            "Binary search on times list: initialize low = 0, high = times.size() - 1, and ans = \"\".",
            "If times.get(mid) <= timestamp: save candidate value ans = map.get(key).get(times.get(mid)) and move right (low = mid + 1) to find closer timestamp.",
            "Else: move left (high = mid - 1).",
            "Return ans."
          ]
        }
      },
      {
        id: 'median-of-two-sorted-arrays',
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/description/',
        definition: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
        examples: [
          { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000', explanation: 'merged array = [1,2,3] and median is 2.' },
          { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000', explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.' }
        ],
        brute: {
          idea: 'Merge both sorted arrays into a single sorted array of size (n + m) using two pointers. Then find the middle element(s) to compute the median.',
          code: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int n = nums1.length;
        int m = nums2.length;

        int[] merged = new int[n + m];

        int i = 0;
        int j = 0;
        int k = 0;

        // Merge both sorted arrays
        while (i < n && j < m) {
            if (nums1[i] <= nums2[j]) {
                merged[k++] = nums1[i++];
            } else {
                merged[k++] = nums2[j++];
            }
        }

        while (i < n) {
            merged[k++] = nums1[i++];
        }

        while (j < m) {
            merged[k++] = nums2[j++];
        }

        int total = n + m;
        int mid = total / 2;

        // If odd, return the middle element
        if (total % 2 == 1) {
            return merged[mid];
        }

        // If even, return average of the two middle elements
        return (double)(merged[mid - 1] +  merged[mid]) / 2.0;
    }
}`,
          time: 'O(n + m)',
          timeDesc: '• Merging both sorted arrays linearly takes O(n + m) time.\n• Total Time: O(n + m)',
          space: 'O(n + m)',
          spaceDesc: 'O(n + m) auxiliary space for the merged array.',
          walkthrough: [
            "Initialize an array merged of size n + m with pointers i = 0, j = 0, k = 0.",
            "Compare elements from nums1 and nums2, adding the smaller element to merged.",
            "Copy any remaining elements from either array.",
            "If total length is odd, return merged[total / 2].",
            "If even, return (merged[mid - 1] + merged[mid]) / 2.0."
          ]
        },
        better: {
          idea: 'Instead of storing the entire merged array, iterate through both arrays with two pointers and only keep track of the two middle elements (prev and curr) until reaching index (n + m) / 2.',
          code: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int n = nums1.length;
        int m = nums2.length;
        int total = n + m;

        int i = 0, j = 0;
        int counter = 0;
        int prev = 0, curr = 0;

        // Track only the two middle elements up to index total / 2
        while (counter <= total / 2) {
            prev = curr;

            if (i >= n) {
                curr = nums2[j++];
            } else if (j >= m) {
                curr = nums1[i++];
            } else if (nums1[i] <= nums2[j]) {
                curr = nums1[i++];
            } else {
                curr = nums2[j++];
            }

            counter++;
        }

        if (total % 2 == 1) {
            return curr;
        }

        return ((double) prev + curr) / 2.0;
    }
}`,
          time: 'O(n + m)',
          timeDesc: '• Iterate up to (n + m) / 2 steps.\n• Total Time: O(n + m)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space using pointers and two tracking variables.',
          walkthrough: [
            "Initialize counter = 0, prev = 0, curr = 0, i = 0, and j = 0.",
            "Simulate the merge step by step up to counter <= total / 2.",
            "In each step, record prev = curr and update curr with the next smallest element from nums1 or nums2.",
            "If total length is odd, return curr.",
            "If even, return (prev + curr) / 2.0."
          ]
        },
        optimal: {
          idea: 'Binary search on the partition of the smaller array:\n\n• Partition both arrays so left side has (m + n + 1) / 2 elements.\n• Valid condition: left1 <= right2 && left2 <= right1.\n• Median: max(lefts) for odd, or average(max(lefts), min(rights)) for even.',
          code: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int n = nums1.length;
        int m = nums2.length;
        int total = n + m;

        // Always binary search on the smaller array
        if (n > m) {
            return findMedianSortedArrays(nums2, nums1);
        }

        int leftPartitionSize = (total + 1) / 2;

        int low = 0;
        int high = n;

        while(low <= high){
            int partition1 = low + (high - low) / 2;
            int partition2 = leftPartitionSize - partition1;

            int left1 = partition1 == 0 ? Integer.MIN_VALUE : nums1[partition1 - 1];
            int left2 = partition2 == 0 ? Integer.MIN_VALUE : nums2[partition2 - 1];

            int right1 = partition1 == n ? Integer.MAX_VALUE : nums1[partition1];
            int right2 = partition2 == m ? Integer.MAX_VALUE : nums2[partition2];

            // Valid partition condition
            if(left1 <= right2 && left2 <= right1){
                if(total % 2 == 1){
                    return Math.max(left1, left2);
                } else {
                    return (Math.max(left1, left2) + Math.min(right1, right2)) / 2.0;
                }
            }

            if(left1 > left2){
                high = partition1 - 1;
            } else {
                low = partition1 + 1;
            }
        }

        return 0.0;
    }
}`,
          time: 'O(log(min(n, m)))',
          timeDesc: '• Binary search runs on the smaller array of length min(n, m).\n• Total iterations = O(log(min(n, m))).\n• Total Time: O(log(min(n, m)))',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space.',
          walkthrough: [
            "Ensure nums1 is the smaller array (if n > m, swap arguments).",
            "Set leftPartitionSize = (total + 1) / 2, with search range low = 0, high = n.",
            "Calculate partition1 = (low + high) / 2 and partition2 = leftPartitionSize - partition1.",
            "Determine border values: left1, left2, right1, right2 (handling edges with MIN_VALUE and MAX_VALUE).",
            "If left1 <= right2 and left2 <= right1: partition is valid. Return max(left1, left2) if odd, or average of max(left1, left2) and min(right1, right2) if even.",
            "If left1 > left2: shift partition left by setting high = partition1 - 1.",
            "Else: shift partition right by setting low = partition1 + 1."
          ]
        }
      }
    ]
  };
