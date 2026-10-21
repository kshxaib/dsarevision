import { p } from '../helper.js';

export const twoPointers = {
    id: 'two-pointers',
    name: 'Two Pointers',
    icon: '👆',
    problems: [
      {
        id: 'valid-palindrome',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/description/',
        definition: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.',
        examples: [
          { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
          { input: 's = "race a car"', output: 'false' }
        ],
        brute: {
          idea: 'Filter out non-alphanumeric characters and convert each valid character to lowercase using a StringBuilder. Reverse the filtered string and check if it equals the original filtered string.',
          code: `class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder sb = new StringBuilder();

        for(int i=0; i<s.length(); i++){                   // Loop: O(n)
            char ch = s.charAt(i);

            if(Character.isLetterOrDigit(ch)){             // Filter alphanumeric: O(1)
                sb.append(Character.toLowerCase(ch));      // Append: O(1)
            }
        }

        String str = sb.toString();                        // Convert to string: O(n)
        String rev = sb.reverse().toString();              // Reverse & convert: O(n)

        return str.equals(rev);                            // Comparison: O(n)
    }
}`,
          time: 'O(n)',
          timeDesc: '• Filter loop traversing string: O(n)\n• Reverse string: O(n)\n• String equality comparison: O(n)\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space to store the filtered and reversed strings.',
          walkthrough: [
            "Initialize a StringBuilder sb to store filtered characters.",
            "Iterate through each character of string s from index 0 to s.length() - 1.",
            "If character is alphanumeric (Character.isLetterOrDigit), append its lowercase form to sb.",
            "Convert sb to string str, then reverse sb and convert to string rev.",
            "Return str.equals(rev)."
          ]
        },
        optimal: {
          idea: 'Use two pointers starting from both ends (left and right). Move inward while skipping non-alphanumeric characters, and compare characters in lowercase.',
          code: `class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder sb = new StringBuilder();

        int left=0, right=s.length() -1;

        while(left < right){                               // Two pointers: O(n)
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;                                    // Skip non-alphanumeric
            }

            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;                                   // Skip non-alphanumeric
            }

            if (Character.toLowerCase(s.charAt(left)) !=
                Character.toLowerCase(s.charAt(right))) {  // Comparison: O(1)
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Pointers left and right meet in the middle, visiting each character at most once: O(n)\n• Character checks and comparisons: O(1)\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space using two pointers in-place.',
          walkthrough: [
            "Initialize two pointers: left = 0 and right = s.length() - 1.",
            "While left < right, advance left forward until an alphanumeric character is found.",
            "Decrement right backward until an alphanumeric character is found.",
            "Compare lowercase characters at left and right: if they do not match, return false.",
            "Increment left and decrement right.",
            "If pointers meet without mismatch, return true."
          ]
        }
      },
      {
        id: 'two-sum-ii-input-array-is-sorted',
        title: 'Two Sum II Input Array Is Sorted',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/',
        definition: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.',
        examples: [
          { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]' },
          { input: 'numbers = [2,3,4], target = 6', output: '[1,3]' }
        ],
        brute: {
          idea: 'Check every pair of elements using nested loops. When a pair adds up to target, return their 1-indexed positions [i+1, j+1].',
          code: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        for(int i=0; i<numbers.length; i++){               // Outer loop: O(n)
            for(int j=i+1; j<numbers.length; j++){         // Inner loop: O(n)
                if(numbers[i] + numbers[j] == target){     // Comparison: O(1)
                    return new int[] {i+1, j+1};
                }
            }
        }

        return new int[] {-1, -1};
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop: O(n)\n• Inner loop: O(n)\n• Comparison: O(1)\n• Total Time: O(n · n) = O(n²)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space (no extra data structures used).',
          walkthrough: [
            "Iterate through numbers array using outer loop pointer i from 0 to numbers.length - 1.",
            "Iterate through subsequent numbers using inner loop pointer j from i + 1 to numbers.length - 1.",
            "If numbers[i] + numbers[j] == target, return new int[]{i + 1, j + 1} for 1-based indexing.",
            "If no matching pair is found after both loops complete, return {-1, -1}."
          ]
        },
        optimal: {
          idea: 'Since the array is sorted, use two pointers at opposite ends (left and right). Adjust pointers inward based on whether the sum is less than or greater than the target.',
          code: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;

        while(left < right){                               // Two pointers: O(n)
            int sum = numbers[left] + numbers[right];

            if(sum == target){                             // Match found: O(1)
                return new int[] {left+1, right+1};
            } else if(sum < target){
                left++;                                    // Need larger sum
            } else {
                right--;                                   // Need smaller sum
            }
        }

        return new int[] {-1, -1};
    }
}`,
          time: 'O(n)',
          timeDesc: '• Two pointers traverse array from both ends in a single pass: O(n)\n• Sum calculation and pointer moves: O(1)\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space using two pointer variables in-place.',
          walkthrough: [
            "Initialize left pointer at 0 and right pointer at numbers.length - 1.",
            "While left < right, calculate sum = numbers[left] + numbers[right].",
            "If sum == target, return new int[]{left + 1, right + 1} (1-indexed).",
            "If sum < target, increment left to increase the sum.",
            "If sum > target, decrement right to decrease the sum.",
            "If no pair sums to target, return {-1, -1}."
          ]
        }
      },
      {
        id: '3sum',
        title: '3Sum',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/3sum/description/',
        definition: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.',
        examples: [
          { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
          { input: 'nums = [0,1,1]', output: '[]' }
        ],
        brute: {
          idea: 'Check all triplets (i, j, k) using three nested loops. When a triplet sums to zero, sort the three numbers and add it to a HashSet to filter out duplicates.',
          code: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Set<List<Integer>> set = new HashSet<>();

        for (int i = 0; i < nums.length; i++) {            // Outer loop: O(n)
            for (int j = i + 1; j < nums.length; j++) {    // Inner loop: O(n)
                for (int k = j + 1; k < nums.length; k++) {// Inner-most loop: O(n)

                    if (nums[i] + nums[j] + nums[k] == 0) {// Sum check: O(1)
                        List<Integer> triplet = Arrays.asList(nums[i], nums[j], nums[k]);
                        Collections.sort(triplet);         // Sort 3 elements: O(1)
                        set.add(triplet);                  // Insert: O(1) avg
                    }
                }
            }
        }

        result.addAll(set);
        return result;
    }
}`,
          time: 'O(n³)',
          timeDesc: '• Three nested loops iterating through triplets: O(n³)\n• Sorting triplet of 3 elements: O(1)\n• HashSet operations: O(1) avg\n• Total Time: O(n³)',
          space: 'O(u)',
          spaceDesc: 'O(u) auxiliary space to store unique triplets in the HashSet (where u ≤ n²).',
          walkthrough: [
            "Initialize a HashSet set to store unique sorted triplets.",
            "Iterate i from 0 to nums.length - 1 using outer loop.",
            "Iterate j from i + 1 to nums.length - 1 using middle loop.",
            "Iterate k from j + 1 to nums.length - 1 using inner-most loop.",
            "If nums[i] + nums[j] + nums[k] == 0, create a list of the 3 numbers, sort it, and add it to set.",
            "Add all unique triplets from set into result list and return it."
          ]
        },
        optimal: {
          idea: 'Sort the array first. Iterate through each number as the anchor, and use two pointers (left and right) on the remaining elements. Skip duplicate values at each step to prevent duplicate triplets.',
          code: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();

        Arrays.sort(nums);                                 // Sorting: O(n log n)

        for(int i=0; i<nums.length; i++){                  // Loop: O(n)
            if (i > 0 && nums[i] == nums[i - 1]) {         // Skip duplicates
                continue;
            }

            int left = i+1;
            int right = nums.length -1;

            while(left < right){                           // Two pointers: O(n)
                int sum = nums[i] + nums[left] + nums[right];

                if(sum == 0){                              // Triplet found: O(1)
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    left++;
                    right--;

                    while(left < right && nums[left] == nums[left -1]){
                        left++;                            // Skip duplicate lefts
                    }

                    while(left < right && nums[right] == nums[right +1]){
                        right--;                           // Skip duplicate rights
                    }
                    
                } else if(sum < 0){
                    left++;                                // Need larger sum
                } else {
                    right--;                               // Need smaller sum
                }
            }
        }

        return result;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Sorting the array: O(n log n)\n• Outer loop fixing anchor element i: O(n)\n• Inner two-pointer traversal: O(n)\n• Total Time: O(n log n + n²) = O(n²)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space (output list does not count as extra memory; O(log n) sorting stack space).',
          walkthrough: [
            "Sort the array nums in ascending order using Arrays.sort(nums).",
            "Iterate i from 0 to nums.length - 1. If i > 0 and nums[i] == nums[i - 1], skip duplicate anchor.",
            "Initialize two pointers: left = i + 1 and right = nums.length - 1.",
            "While left < right, calculate sum = nums[i] + nums[left] + nums[right].",
            "If sum == 0, add triplet to result, advance left and right, and skip duplicate elements for both pointers.",
            "If sum < 0, increment left to increase sum; if sum > 0, decrement right to decrease sum.",
            "Return result."
          ]
        }
      },
      {
        id: 'container-with-most-water',
        title: 'Container With Most Water',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/description/',
        definition: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
        examples: [
          { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
          { input: 'height = [1,1]', output: '1' }
        ],
        brute: {
          idea: 'Check every pair of vertical lines (i, j) using two nested loops. The water contained between them is the width (j - i) multiplied by the shorter height (min(height[i], height[j])). Keep track of the maximum water found.',
          code: `class Solution {
    public int maxArea(int[] height) {
        int maxWtr = 0;

        for(int i=0; i<height.length; i++){                // Outer loop: O(n)
            for(int j=i+1; j<height.length; j++){          // Inner loop: O(n)
                int wtrLvl = Math.min(height[i], height[j]);
                int widht = j-i;
                int wtr = wtrLvl * widht;

                maxWtr = Math.max(maxWtr, wtr);
            }
        }

        return maxWtr;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop iterating through each line i: O(n)\n• Inner loop evaluating pair line j: O(n)\n• Area calculation: O(1)\n• Total Time: O(n · n) = O(n²)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space (only a few primitive variables used).',
          walkthrough: [
            "Initialize maxWtr = 0.",
            "Iterate through height array with outer loop index i from 0 to height.length - 1.",
            "Iterate through subsequent lines with inner loop index j from i + 1 to height.length - 1.",
            "Calculate width = j - i and water level wtrLvl = Math.min(height[i], height[j]).",
            "Calculate water area wtr = wtrLvl * width and update maxWtr = Math.max(maxWtr, wtr).",
            "Return maxWtr."
          ]
        },
        optimal: {
          idea: 'Use two pointers at the widest boundaries (left at start, right at end). Calculate the area at each step, and greedily move inward the pointer that has the shorter line to potentially discover a taller container.',
          code: `class Solution {
    public int maxArea(int[] height) {
        int maxWtr = 0;
       
        int left = 0;
        int right = height.length -1;

        while(left < right){                               // Two pointers: O(n)
            int wtrLvl = Math.min(height[left], height[right]);
            int widht = right - left;
            int wtr = widht * wtrLvl;

            maxWtr = Math.max(maxWtr, wtr);

            if(height[left] < height[right]){
                left++;                                    // Move pointer with smaller height
            } else {
                right--;                                   // Move pointer with smaller height
            }
        }

        return maxWtr;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Pointers move toward each other, visiting each vertical line at most once: O(n)\n• Area computation and comparisons: O(1)\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space using two pointers in-place.',
          walkthrough: [
            "Initialize left = 0, right = height.length - 1, and maxWtr = 0.",
            "While left < right, calculate the width (right - left) and water level Math.min(height[left], height[right]).",
            "Compute current water area and update maxWtr = Math.max(maxWtr, wtr).",
            "If height[left] < height[right], increment left; otherwise decrement right.",
            "Return maxWtr."
          ]
        }
      },
      {
        id: 'trapping-rain-water',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/description/',
        definition: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
        examples: [
          { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
          { input: 'height = [4,2,0,3,2,5]', output: '9' }
        ],
        brute: {
          idea: 'For every element, find the maximum height to its left and right. The water trapped above that bar is the minimum of those two maximums minus the bar\'s height.',
          code: `class Solution {
    public int trap(int[] height) {
        int n = height.length;
        int totalTrappedWtr = 0;

        for(int i=0; i<n; i++){                            // Outer loop: O(n)
            int leftMax = 0;
            int rightMax = 0;

            for(int j=0; j<=i; j++){                       // Scan left: O(n)
                leftMax = Math.max(leftMax, height[j]);
            }

            for (int j = i; j < n; j++) {                  // Scan right: O(n)
                rightMax = Math.max(rightMax, height[j]);
            }

            totalTrappedWtr += Math.min(leftMax, rightMax) - height[i];
        }

        return totalTrappedWtr;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop iterating through each bar i: O(n)\n• Scanning left for leftMax: O(n)\n• Scanning right for rightMax: O(n)\n• Total Time: O(n · (n + n)) = O(n²)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space (no extra arrays allocated).',
          walkthrough: [
            "Initialize totalTrappedWtr = 0.",
            "Iterate through each bar i from 0 to n - 1.",
            "Scan left from 0 to i to find leftMax.",
            "Scan right from i to n - 1 to find rightMax.",
            "Calculate water trapped above bar i as Math.min(leftMax, rightMax) - height[i], and add it to totalTrappedWtr.",
            "Return totalTrappedWtr."
          ]
        },
        optimal: {
          idea: 'Two pointers (left and right) with leftMax and rightMax:\n\n• Shorter boundary limits water trapped: process the smaller side first.\n• If height[left] < height[right]: update leftMax or trap (leftMax - height[left]); left++.\n• Otherwise: update rightMax or trap (rightMax - height[right]); right--.',
          code: `class Solution {
    public int trap(int[] height) {
        int left = 0;
        int right = height.length - 1;

        int leftMax = 0;
        int rightMax = 0;
        int totalTrappedWtr = 0;

        while(left < right){                               // Two pointers: O(n)
            if(height[left] < height[right]){
                if(height[left] >= leftMax){
                    leftMax = height[left];                // Update left boundary
                } else {
                    totalTrappedWtr += leftMax - height[left]; // Trap water on left
                }
                left++;

            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];              // Update right boundary
                } else {
                    totalTrappedWtr += rightMax - height[right]; // Trap water on right
                }
                right--;
            }
        }

        return totalTrappedWtr;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Two pointers move inward until they meet, processing each bar once: O(n)\n• Constant-time comparisons and pointer updates: O(1)\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space using two pointers and variables in-place.',
          walkthrough: [
            "Initialize left = 0, right = height.length - 1, leftMax = 0, rightMax = 0, and totalTrappedWtr = 0.",
            "While left < right, compare height[left] with height[right].",
            "If height[left] < height[right]: update leftMax if height[left] >= leftMax, else add (leftMax - height[left]) to totalTrappedWtr. Increment left.",
            "Otherwise: update rightMax if height[right] >= rightMax, else add (rightMax - height[right]) to totalTrappedWtr. Decrement right.",
            "Return totalTrappedWtr."
          ]
        }
      },
    ]
  };
