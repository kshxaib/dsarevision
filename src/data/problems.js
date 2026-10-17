// Helper to create a template problem entry
const p = (title, difficulty, definition, leetcodeSlug) => {
  const slug = leetcodeSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    id: slug,
    title,
    difficulty,
    definition,
    leetcodeUrl: `https://leetcode.com/problems/${slug}/description/`,
    examples: [
      { input: '', output: '' },
      { input: '', output: '' }
    ],
    brute: { idea: '', code: '', time: '', space: '', timeDesc: '', spaceDesc: '' },
    better: { idea: '', code: '', time: '', space: '', timeDesc: '', spaceDesc: '' },
    optimal: { idea: '', code: '', time: '', space: '', timeDesc: '', spaceDesc: '' }
  };
};

export const patterns = [
  {
    id: 'arrays-hashing',
    name: 'Arrays & Hashing',
    icon: '📦',
    timestamp: '0:02:09',
    problems: [
      {
        id: 'contains-duplicate',
        title: 'Contains Duplicate',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/description/',
        definition: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
        examples: [
          { input: 'nums = [1,2,3,1]', output: 'true' },
          { input: 'nums = [1,2,3,4]', output: 'false' },
          { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' }
        ],
        brute: {
          idea: 'Compare every pair of elements using nested loops. If any two elements at different indices are equal, return true.',
          code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        int n = nums.length;

        for(int i=0; i<n; i++){                            // Outer loop: O(n)
            for(int j=0; j<n; j++){                        // Inner loop: O(n)
                if(i == j){
                    continue;
                }
                if(nums[i] == nums[j]){                    // Comparison: O(1)
                    return true;
                }
            }
        }

        return false;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop: O(n)\n• Inner loop: O(n)\n• Comparison: O(1)\n• Total Time: O(n · n) = O(n²)',
          space: 'O(1)',
          spaceDesc: 'No extra space used.',
          walkthrough: [
            "Initialize n = nums.length.",
            "Iterate outer loop with pointer i from 0 to n-1.",
            "Iterate inner loop with pointer j from 0 to n-1. If i == j, continue to avoid comparing the element with itself.",
            "Check if nums[i] == nums[j]: if equal, a duplicate exists, return true.",
            "If both loops finish without finding any duplicate, return false."
          ]
        },
        better: {
          idea: 'Sort the array first. If there are duplicates, they will end up adjacent to each other.',
          code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        int n = nums.length;

        Arrays.sort(nums);                                 // Sorting: O(n log n)

        for(int i=0; i<n-1; i++){                          // Loop: O(n)
            if(nums[i] == nums[i+1]){                      // Comparison: O(1)
                return true;
            }
        }

        return false;
    }
}`,
          time: 'O(n log n)',
          timeDesc: '• Sorting: O(n log n)\n• Linear scan loop: O(n)\n• Total Time: O(n log n)',
          space: 'O(1)',
          spaceDesc: 'In-place sorting with O(log n) recursion stack space.',
          walkthrough: [
            "Initialize n = nums.length.",
            "Sort the array nums in ascending order using Arrays.sort(nums).",
            "After sorting, any duplicate elements must be adjacent to each other.",
            "Iterate i from 0 to n-2: check if nums[i] == nums[i+1].",
            "If any adjacent pair is equal, return true.",
            "If loop finishes without finding adjacent equals, return false."
          ]
        },
        optimal: {
          idea: 'Use a HashSet to store seen elements. As soon as an element is seen again, return true immediately.',
          code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        int n = nums.length;

        HashSet<Integer> hash = new HashSet<>();

        for(int i=0; i<n; i++){                            // Loop: O(n)
            if(hash.contains(nums[i])){                    // Lookup: O(1) avg
                return true;
            } else {
                hash.add(nums[i]);                         // Insert: O(1) avg
            }
        }

        return false;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Single pass loop: O(n)\n• HashSet lookup & insert: O(1) average\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'HashSet stores up to n elements in worst case.',
          walkthrough: [
            "Initialize n = nums.length and an empty HashSet<Integer> hash = new HashSet<>().",
            "Iterate through the array with index i from 0 to n-1.",
            "Check if hash.contains(nums[i]).",
            "If the set already contains nums[i], it is a duplicate, return true.",
            "Otherwise, add the element into the set: hash.add(nums[i]).",
            "If the loop finishes without finding any duplicate, return false."
          ]
        }
      },
      {
        id: 'valid-anagram',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/description/',
        definition: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
        examples: [
          { input: 's = "anagram", t = "nagaram"', output: 'true' },
          { input: 's = "rat", t = "car"', output: 'false' }
        ],
        brute: {
          idea: 'For each character in s, search for a match in t and mark it as visited (using "#") to avoid duplicate counting.',
          code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.length() != t.length()){                      // O(1) length check
            return false;
        }

        char arr[] = t.toCharArray();

        for(int i=0; i<s.length(); i++){                   // Outer loop: n times
            boolean found = false;

            for(int j=0; j<t.length(); j++){               // Inner loop: n times
                if(s.charAt(i) == arr[j]){
                    arr[j] = '#';                          // Mark visited: O(1)
                    found = true;
                    break;
                }
            }

            if(!found){
                return false;
            }
        }

        return true;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop iterates through all n characters of s: O(n)\n• Inner loop scans up to n characters of t: O(n)\n• Total Time: O(n · n) = O(n²)',
          space: 'O(n)',
          spaceDesc: 'Character array created for mutable marking of visited characters.',
          walkthrough: [
            "Check if lengths of s and t are equal: if s.length() != t.length(), return false immediately.",
            "Convert string t into a character array arr = t.toCharArray() to allow marking used characters.",
            "Iterate through each character of string s using outer loop pointer i.",
            "Search for matching character in arr using inner loop j. When found, mark arr[j] = '#' (to prevent reusing) and set found = true.",
            "If found is false (character not found in t), return false.",
            "If all characters are matched successfully, return true."
          ]
        },
        optimal: {
          idea: 'Count character frequencies using a fixed-size integer array of length 26. Increment for s and decrement for t.',
          code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.length() != t.length()){                      // O(1) length check
            return false;
        }

        int freq[] = new int[26];

        for(int i=0; i<s.length(); i++){                   // Single pass: O(n)
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }

        for(int count : freq){                             // Fixed 26 counts: O(1)
            if(count != 0){
                return false;
            }
        }

        return true;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Single loop through strings of length n: O(n)\n• Checking fixed 26 element array: O(26) ≈ O(1)\n• Total Time: O(n + 26) = O(n)',
          space: 'O(1)',
          spaceDesc: 'Constant space: fixed 26-element integer array for English letters.',
          walkthrough: [
            "Check if s.length() != t.length(): if not equal, return false.",
            "Initialize a fixed-size frequency array freq of size 26 for lowercase English letters.",
            "Iterate through string indices: increment count for s.charAt(i) and decrement count for t.charAt(i).",
            "Check the frequency array: if any character count is not 0, characters don't match, return false.",
            "If all 26 counts are 0, return true."
          ]
        }
      },
      {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/two-sum/description/',
        definition: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        examples: [
          { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
          { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
        ],
        brute: {
          idea: 'Check every pair of elements using nested loops. If the sum of any two elements equals target, return their indices.',
          code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        int n = nums.length;

        for(int i=0; i<n; i++){                            // Outer loop: O(n)
            for(int j=i+1; j<n; j++){                      // Inner loop: O(n)
                if(nums[i] + nums[j] == target){           // Comparison: O(1)
                    return new int[] {i, j};
                }
            }
        }

        return new int[] {-1, -1};
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop: O(n)\n• Inner loop: O(n)\n• Comparison: O(1)\n• Total Time: O(n · n) = O(n²)',
          space: 'O(1)',
          spaceDesc: 'No extra memory used; only integer loop indices.',
          walkthrough: [
            "Initialize n = nums.length.",
            "Run outer loop pointer i from 0 to n - 1.",
            "Run inner loop pointer j from i + 1 to n - 1 to check all subsequent elements.",
            "Check if nums[i] + nums[j] == target.",
            "If sum matches target, return new int[] {i, j} immediately.",
            "If both loops finish without finding any pair, return new int[] {-1, -1}."
          ]
        },
        optimal: {
          idea: 'Use a HashMap to store each visited number and its index. For each element, check if the required complement (need = target - nums[i]) already exists in the map.',
          code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        int n = nums.length;

        HashMap<Integer, Integer> map = new HashMap<>();

        for(int i=0; i<n; i++){                            // Loop: O(n)
            int need = target - nums[i];                   // Operation: O(1)

            if(map.containsKey(need)){                     // Lookup: O(1) avg
                return new int[] {map.get(need), i};
            }

            map.put(nums[i], i);                           // Insert: O(1) avg
        }

        return new int[] {-1, -1};
    }
}`,
          time: 'O(n)',
          timeDesc: '• Loop: O(n)\n• Lookup (containsKey) & Insert (put): O(1) avg\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'HashMap stores up to n elements and their corresponding indices.',
          walkthrough: [
            "Initialize n = nums.length and an empty HashMap<Integer, Integer> map = new HashMap<>().",
            "Iterate through the array with index i from 0 to n - 1.",
            "Compute the required complement: int need = target - nums[i].",
            "Check if map.containsKey(need): if found, return new int[] {map.get(need), i}.",
            "Otherwise, record the current element and its index in the map: map.put(nums[i], i).",
            "If loop finishes without finding a pair, return new int[] {-1, -1}."
          ]
        }
      },
      {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/description/',
        definition: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
        examples: [
          { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
          { input: 'strs = [""]', output: '[[""]]' }
        ],
        brute: {
          idea: 'Iterate through all strings. For each unvisited string, form a new group and scan the remaining array to find all anagrams using a helper function, marking visited strings along the way.',
          code: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> result = new ArrayList<>();
        boolean visited[] = new boolean[strs.length];

        for(int i=0; i<strs.length; i++){                  // Outer loop: O(n)
            if(visited[i]){
                continue;
            }

            List<String> group = new ArrayList<>();
            group.add(strs[i]);
            visited[i] = true;

            for(int j=i+1; j<strs.length; j++){            // Inner loop: O(n)
                if(!visited[j] && isAnagram(strs[i], strs[j])){ // Helper isAnagram: O(k)
                    group.add(strs[j]);
                    visited[j] = true;
                }
            }

            result.add(group);
        }

        return result;
    }

    public boolean isAnagram(String s, String t){
        if(s.length() != t.length()){                      // Check: O(1)
            return false;
        }

        int freq[] = new int[26];

        for (int i = 0; i < s.length(); i++) {             // Loop: O(k)
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }

        for (int count : freq) {                           // Fixed loop: O(26) ≈ O(1)
            if (count != 0) {
                return false;
            }
        }

        return true;
    }
}`,
          time: 'O(n² · k)',
          timeDesc: '• Outer loop: O(n)\n• Inner loop: O(n)\n• Helper isAnagram: O(k)\n• Total Time: O(n · n · k) = O(n² · k)',
          space: 'O(n)',
          spaceDesc: 'Boolean visited array of size n to track processed strings.',
          walkthrough: [
            "Initialize result list and a boolean visited[] array of size strs.length.",
            "Iterate through strs with index i. If visited[i] is true, skip using continue.",
            "Create a new list group, add strs[i], and mark visited[i] = true.",
            "Inner loop j from i+1 to strs.length - 1: if not visited and isAnagram(strs[i], strs[j]) is true, add strs[j] to group and mark visited[j] = true.",
            "Add group to result and repeat until all strings are visited.",
            "Return result."
          ]
        },
        better: {
          idea: 'Sort each string alphabetically to form a canonical key. All anagrams will produce the same sorted key, which can be grouped using a HashMap.',
          code: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        HashMap<String, List<String>> map = new HashMap<>();

        for(String s: strs){                               // Loop: O(n)
            char arr[] = s.toCharArray();
            Arrays.sort(arr);                              // Sorting: O(k log k)

            String key = new String(arr);

            map.putIfAbsent(key, new ArrayList<>());
            map.get(key).add(s);                           // Insert: O(1) avg
        } 

        return new ArrayList<>(map.values());
    }
}`,
          time: 'O(n · k log k)',
          timeDesc: '• Loop over all n strings: O(n)\n• Sorting each string: O(k log k)\n• Total Time: O(n · k log k)',
          space: 'O(n · k)',
          spaceDesc: 'HashMap stores all strings and their sorted keys.',
          walkthrough: [
            "Initialize a HashMap<String, List<String>> map = new HashMap<>().",
            "Loop through each string s in strs.",
            "Convert s to character array arr = s.toCharArray() and sort it using Arrays.sort(arr).",
            "Construct the sorted key: String key = new String(arr).",
            "Add s to the group in map using map.putIfAbsent(key, new ArrayList<>()) and map.get(key).add(s).",
            "Return new ArrayList<>(map.values())."
          ]
        },
        optimal: {
          idea: 'Instead of sorting, build a character count frequency array (size 26) for each string and serialize it as a delimiter-separated key (e.g., "1#0#...#") for the HashMap.',
          code: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        HashMap<String, List<String>> map = new HashMap<>();

        for(String s: strs){                               // Outer loop: O(n)
            int freq[] = new int[26];

            for(int i=0; i<s.length(); i++){               // Inner loop: O(k)
                freq[s.charAt(i) - 'a']++;
            }

            StringBuilder key = new StringBuilder();

            for(int count : freq){                         // Fixed loop: O(26) ≈ O(1)
                key.append(count).append("#");
            }

            map.putIfAbsent(key.toString(), new ArrayList<>());
            map.get(key.toString()).add(s);                // Insert: O(1) avg
        } 

        return new ArrayList<>(map.values());
    }
}`,
          time: 'O(n · k)',
          timeDesc: '• Outer loop: O(n)\n• Inner loop (frequency counting): O(k)\n• Fixed loop (serializing 26 counts): O(26) ≈ O(1)\n• Total Time: O(n · (k + 26)) = O(n · k)',
          space: 'O(n · k)',
          spaceDesc: 'HashMap stores all strings grouped by their 26-count frequency signature key.',
          walkthrough: [
            "Initialize HashMap<String, List<String>> map = new HashMap<>().",
            "Loop through each string s in strs.",
            "Count the frequency of each lowercase character using an integer array freq of size 26.",
            "Serialize the frequency counts into a unique key string using StringBuilder with '#' delimiter.",
            "Add string s into the corresponding bucket in map using map.putIfAbsent(key.toString(), ...) and map.get(key.toString()).add(s).",
            "Return new ArrayList<>(map.values())."
          ]
        }
      },
      p('Top K Frequent Elements', 'Medium', 'Find the k most frequent elements in an array.'),
      p('Encode and Decode Strings', 'Medium', 'Design an algorithm to encode/decode a list of strings.'),
      p('Product of Array Except Self', 'Medium', 'Return an array where each element is the product of all other elements.'),
      p('Valid Sudoku', 'Medium', 'Determine if a 9×9 Sudoku board is valid.'),
      p('Longest Consecutive Sequence', 'Medium', 'Find the length of the longest consecutive elements sequence.'),
    ]
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    icon: '👆',
    timestamp: '1:35:31',
    problems: [
      p('Valid Palindrome', 'Easy', 'Check if a string is a palindrome, considering only alphanumeric characters.'),
      p('Two Sum II', 'Medium', 'Find two numbers in a sorted array that add up to target.'),
      p('3Sum', 'Medium', 'Find all unique triplets in the array that sum to zero.'),
      p('Container With Most Water', 'Medium', 'Find two lines that together with x-axis form a container holding the most water.'),
      p('Trapping Rain Water', 'Hard', 'Calculate how much water can be trapped between elevation bars after raining.'),
    ]
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    icon: '🪟',
    timestamp: '3:22:29',
    problems: [
      p('Best Time to Buy And Sell Stock', 'Easy', 'Find maximum profit from buying and selling a stock once.'),
      p('Longest Substring Without Repeating Characters', 'Medium', 'Find the length of the longest substring without repeating characters.'),
      p('Longest Repeating Character Replacement', 'Medium', 'Find longest substring with at most k character replacements.'),
      p('Permutation In String', 'Medium', 'Check if one string\'s permutation is a substring of another.'),
      p('Minimum Window Substring', 'Hard', 'Find minimum window in s that contains all characters of t.'),
      p('Sliding Window Maximum', 'Hard', 'Find the maximum in each sliding window of size k.'),
    ]
  },
  {
    id: 'stack',
    name: 'Stack',
    icon: '📚',
    timestamp: '4:59:44',
    problems: [
      p('Valid Parentheses', 'Easy', 'Check if the input string has valid and properly closed brackets.'),
      p('Min Stack', 'Medium', 'Design a stack that supports push, pop, top, and getMin in O(1).'),
      p('Evaluate Reverse Polish Notation', 'Medium', 'Evaluate an arithmetic expression in Reverse Polish Notation.'),
      p('Generate Parentheses', 'Medium', 'Generate all valid combinations of n pairs of parentheses.'),
      p('Daily Temperatures', 'Medium', 'Find number of days until a warmer temperature for each day.'),
      p('Car Fleet', 'Medium', 'Determine the number of car fleets that arrive at the destination.'),
      p('Largest Rectangle In Histogram', 'Hard', 'Find the largest rectangular area in a histogram.'),
    ]
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    icon: '🔍',
    timestamp: '6:19:22',
    problems: [
      p('Binary Search', 'Easy', 'Find target value in a sorted array.'),
      p('Search a 2D Matrix', 'Medium', 'Search for a target in a row-column sorted matrix.'),
      p('Koko Eating Bananas', 'Medium', 'Find minimum eating speed to finish all bananas in h hours.'),
      p('Find Minimum In Rotated Sorted Array', 'Medium', 'Find the minimum element in a rotated sorted array.'),
      p('Search In Rotated Sorted Array', 'Medium', 'Search for target in a rotated sorted array.'),
      p('Time Based Key Value Store', 'Medium', 'Design key-value store with timestamp-based retrieval.'),
      p('Median of Two Sorted Arrays', 'Hard', 'Find the median of two sorted arrays in O(log(m+n)).'),
    ]
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    icon: '🔗',
    timestamp: '8:22:13',
    problems: [
      p('Reverse Linked List', 'Easy', 'Reverse a singly linked list.'),
      p('Merge Two Sorted Lists', 'Easy', 'Merge two sorted linked lists into one sorted list.'),
      p('Reorder List', 'Medium', 'Reorder list as L0→Ln→L1→Ln-1→L2→Ln-2→...'),
      p('Remove Nth Node From End of List', 'Medium', 'Remove the nth node from the end of a linked list.'),
      p('Copy List With Random Pointer', 'Medium', 'Deep copy a linked list with next and random pointers.'),
      p('Add Two Numbers', 'Medium', 'Add two numbers represented as reversed linked lists.'),
      p('Linked List Cycle', 'Easy', 'Detect if a linked list has a cycle.'),
      p('Find The Duplicate Number', 'Medium', 'Find the duplicate in an array of n+1 integers in range [1, n].'),
      p('LRU Cache', 'Medium', 'Design a Least Recently Used (LRU) cache.'),
      p('Merge K Sorted Lists', 'Hard', 'Merge k sorted linked lists into one sorted list.'),
      p('Reverse Nodes In K Group', 'Hard', 'Reverse linked list nodes in groups of k.'),
    ]
  },
  {
    id: 'trees',
    name: 'Trees',
    icon: '🌲',
    timestamp: '10:33:35',
    problems: [
      p('Invert Binary Tree', 'Easy', 'Mirror/invert a binary tree.'),
      p('Maximum Depth of Binary Tree', 'Easy', 'Find the maximum depth of a binary tree.'),
      p('Diameter of Binary Tree', 'Easy', 'Find the longest path between any two nodes in a tree.'),
      p('Balanced Binary Tree', 'Easy', 'Check if a binary tree is height-balanced.'),
      p('Same Tree', 'Easy', 'Check if two binary trees are structurally identical.'),
      p('Subtree of Another Tree', 'Easy', 'Check if a tree is a subtree of another tree.'),
      p('Lowest Common Ancestor of a BST', 'Medium', 'Find the lowest common ancestor of two nodes in a BST.'),
      p('Binary Tree Level Order Traversal', 'Medium', 'Traverse the tree level by level (BFS).'),
      p('Binary Tree Right Side View', 'Medium', 'Return the values visible from the right side of the tree.'),
      p('Count Good Nodes in Binary Tree', 'Medium', 'Count nodes where the path from root has no greater value.'),
      p('Validate Binary Search Tree', 'Medium', 'Check if a binary tree is a valid BST.'),
      p('Kth Smallest Element in a BST', 'Medium', 'Find the kth smallest element in a BST.'),
      p('Construct Binary Tree from Preorder and Inorder', 'Medium', 'Build a tree from preorder and inorder traversal arrays.'),
      p('Binary Tree Maximum Path Sum', 'Hard', 'Find the maximum path sum in a binary tree.'),
      p('Serialize and Deserialize Binary Tree', 'Hard', 'Convert a tree to a string and reconstruct it back.'),
    ]
  },
  {
    id: 'tries',
    name: 'Tries',
    icon: '🔤',
    timestamp: '13:20:24',
    problems: [
      p('Implement Trie Prefix Tree', 'Medium', 'Implement a trie with insert, search, and startsWith methods.'),
      p('Design Add and Search Words Data Structure', 'Medium', 'Trie supporting wildcard "." character search.'),
      p('Word Search II', 'Hard', 'Find all words from a dictionary that exist in a 2D board.'),
    ]
  },
  {
    id: 'heap-priority-queue',
    name: 'Heap / Priority Queue',
    icon: '⏫',
    timestamp: '14:01:28',
    problems: [
      p('Kth Largest Element in a Stream', 'Easy', 'Design a class to find the kth largest element in a stream.'),
      p('Last Stone Weight', 'Easy', 'Simulate stone smashing and return the last stone weight.'),
      p('K Closest Points to Origin', 'Medium', 'Find the k closest points to the origin.'),
      p('Kth Largest Element in an Array', 'Medium', 'Find the kth largest element in an unsorted array.'),
      p('Task Scheduler', 'Medium', 'Find minimum intervals to execute all tasks with cooldown.'),
      p('Design Twitter', 'Medium', 'Design a simplified Twitter with follow, unfollow, post, and feed.'),
      p('Find Median from Data Stream', 'Hard', 'Find the median from continuously arriving numbers.'),
    ]
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    icon: '🔙',
    timestamp: '16:15:43',
    problems: [
      p('Subsets', 'Medium', 'Generate all possible subsets of a set of distinct integers.'),
      p('Combination Sum', 'Medium', 'Find all combinations that sum to target (elements reusable).'),
      p('Permutations', 'Medium', 'Generate all permutations of an array of distinct integers.'),
      p('Subsets II', 'Medium', 'Generate all subsets, handling duplicate elements.'),
      p('Combination Sum II', 'Medium', 'Find combinations that sum to target (each element used once).'),
      p('Word Search', 'Medium', 'Search for a word in a 2D board of characters.'),
      p('Palindrome Partitioning', 'Medium', 'Partition a string into all possible palindrome substrings.'),
      p('Letter Combinations of a Phone Number', 'Medium', 'Generate all letter combinations from phone keypad digits.'),
      p('N Queens', 'Hard', 'Place n queens on an n×n chessboard with no conflicts.'),
    ]
  },
  {
    id: 'graphs',
    name: 'Graphs',
    icon: '🕸️',
    timestamp: '17:44:08',
    problems: [
      p('Number of Islands', 'Medium', 'Count the number of islands in a 2D grid.'),
      p('Clone Graph', 'Medium', 'Deep copy an undirected graph.'),
      p('Max Area of Island', 'Medium', 'Find the island with the maximum area.'),
      p('Pacific Atlantic Water Flow', 'Medium', 'Find cells that can flow water to both Pacific and Atlantic oceans.'),
      p('Surrounded Regions', 'Medium', 'Capture all surrounded regions on a board.'),
      p('Rotting Oranges', 'Medium', 'Find minimum time for all oranges to become rotten.'),
      p('Walls and Gates', 'Medium', 'Fill each empty room with distance to its nearest gate.'),
      p('Course Schedule', 'Medium', 'Determine if all courses can be finished (cycle detection).'),
      p('Course Schedule II', 'Medium', 'Find a valid order to take all courses (topological sort).'),
      p('Redundant Connection', 'Medium', 'Find the edge that creates a cycle in an undirected graph.'),
      p('Number of Connected Components in an Undirected Graph', 'Medium', 'Count connected components in an undirected graph.'),
      p('Graph Valid Tree', 'Medium', 'Check if an undirected graph forms a valid tree.'),
      p('Word Ladder', 'Hard', 'Find shortest transformation sequence from begin to end word.'),
    ]
  },
  {
    id: 'advanced-graphs',
    name: 'Advanced Graphs',
    icon: '🗺️',
    timestamp: '21:42:50',
    problems: [
      p('Reconstruct Itinerary', 'Hard', 'Reconstruct a travel itinerary from flight tickets (Eulerian path).'),
      p('Min Cost to Connect All Points', 'Medium', 'Find minimum cost to connect all points (MST).'),
      p('Network Delay Time', 'Medium', 'Find time for signal to reach all nodes (Dijkstra).'),
      p('Swim in Rising Water', 'Hard', 'Find minimum time to swim from top-left to bottom-right.'),
      p('Alien Dictionary', 'Hard', 'Derive character order from a sorted alien dictionary.'),
      p('Cheapest Flights Within K Stops', 'Medium', 'Find cheapest flight path with at most k stops.'),
    ]
  },
  {
    id: '1d-dynamic-programming',
    name: '1D Dynamic Programming',
    icon: '📈',
    timestamp: '23:46:50',
    problems: [
      p('Climbing Stairs', 'Easy', 'Count the number of ways to climb n stairs (1 or 2 steps at a time).'),
      p('Min Cost Climbing Stairs', 'Easy', 'Find the minimum cost to reach the top of the stairs.'),
      p('House Robber', 'Medium', 'Find maximum money robbing non-adjacent houses.'),
      p('House Robber II', 'Medium', 'House robber problem but houses are in a circle.'),
      p('Longest Palindromic Substring', 'Medium', 'Find the longest palindromic substring.'),
      p('Palindromic Substrings', 'Medium', 'Count the total number of palindromic substrings.'),
      p('Decode Ways', 'Medium', 'Count ways to decode a digit string into letters (A=1...Z=26).'),
      p('Coin Change', 'Medium', 'Find the fewest coins needed to make up a given amount.'),
      p('Maximum Product Subarray', 'Medium', 'Find the contiguous subarray with the largest product.'),
      p('Word Break', 'Medium', 'Check if a string can be segmented into dictionary words.'),
      p('Longest Increasing Subsequence', 'Medium', 'Find the length of the longest strictly increasing subsequence.'),
      p('Partition Equal Subset Sum', 'Medium', 'Check if an array can be partitioned into two equal-sum subsets.'),
    ]
  },
  {
    id: '2d-dynamic-programming',
    name: '2D Dynamic Programming',
    icon: '📊',
    timestamp: '28:45:52',
    problems: [
      p('Unique Paths', 'Medium', 'Count unique paths from top-left to bottom-right in a grid.'),
      p('Longest Common Subsequence', 'Medium', 'Find the length of the longest common subsequence of two strings.'),
      p('Best Time to Buy and Sell Stock with Cooldown', 'Medium', 'Maximum profit with a cooldown period after selling.'),
      p('Coin Change II', 'Medium', 'Count the number of ways to make an amount with given coins.'),
      p('Target Sum', 'Medium', 'Count ways to assign +/- signs to elements to reach a target sum.'),
      p('Interleaving String', 'Medium', 'Check if s3 is formed by interleaving s1 and s2.'),
      p('Longest Increasing Path in a Matrix', 'Hard', 'Find the longest increasing path in a 2D matrix.'),
      p('Distinct Subsequences', 'Hard', 'Count distinct subsequences of s that equal t.'),
      p('Edit Distance', 'Medium', 'Find minimum operations to convert one string to another.'),
      p('Burst Balloons', 'Hard', 'Find maximum coins collected by strategically bursting balloons.'),
      p('Regular Expression Matching', 'Hard', 'Implement regex matching with "." and "*" support.'),
    ]
  },
  {
    id: 'greedy',
    name: 'Greedy',
    icon: '🤑',
    timestamp: '31:54:37',
    problems: [
      p('Maximum Subarray', 'Medium', 'Find the contiguous subarray with the largest sum (Kadane\'s algorithm).'),
      p('Jump Game', 'Medium', 'Determine if you can reach the last index by jumping.'),
      p('Jump Game II', 'Medium', 'Find the minimum number of jumps to reach the last index.'),
      p('Gas Station', 'Medium', 'Find the starting gas station index for a complete circuit.'),
      p('Hand of Straights', 'Medium', 'Check if a hand can be rearranged into groups of consecutive cards.'),
      p('Merge Triplets to Form Target Triplet', 'Medium', 'Check if target triplet can be formed by merging given triplets.'),
      p('Partition Labels', 'Medium', 'Partition string into maximum parts where each letter appears in one part.'),
      p('Valid Parenthesis String', 'Medium', 'Check if string with wildcards "*" has valid parentheses.'),
    ]
  },
  {
    id: 'intervals',
    name: 'Intervals',
    icon: '📐',
    timestamp: '33:55:28',
    problems: [
      p('Insert Interval', 'Medium', 'Insert a new interval and merge overlapping intervals.'),
      p('Merge Intervals', 'Medium', 'Merge all overlapping intervals.'),
      p('Non Overlapping Intervals', 'Medium', 'Find minimum interval removals for a non-overlapping set.'),
      p('Meeting Rooms', 'Easy', 'Check if a person can attend all meetings without overlap.'),
      p('Meeting Rooms II', 'Medium', 'Find the minimum number of conference rooms required.'),
      p('Minimum Interval to Include Each Query', 'Hard', 'Find the smallest interval containing each query value.'),
    ]
  },
  {
    id: 'math-geometry',
    name: 'Math & Geometry',
    icon: '📐',
    timestamp: '35:26:18',
    problems: [
      p('Rotate Image', 'Medium', 'Rotate an n×n matrix 90 degrees clockwise in-place.'),
      p('Spiral Matrix', 'Medium', 'Return all elements of a matrix in spiral order.'),
      p('Set Matrix Zeroes', 'Medium', 'Set entire row and column to zero if any element is zero.'),
      p('Happy Number', 'Easy', 'Determine if a number eventually reaches 1 by summing squares of digits.'),
      p('Plus One', 'Easy', 'Add one to a number represented as an array of digits.'),
      p('Pow(x, n)', 'Medium', 'Implement the power function efficiently.'),
      p('Multiply Strings', 'Medium', 'Multiply two numbers represented as strings.'),
      p('Detect Squares', 'Medium', 'Design a data structure to count axis-aligned squares from points.'),
    ]
  },
  {
    id: 'bit-manipulation',
    name: 'Bit Manipulation',
    icon: '⚡',
    timestamp: '37:11:53',
    problems: [
      p('Single Number', 'Easy', 'Find the element that appears only once (all others appear twice).'),
      p('Number of 1 Bits', 'Easy', 'Count the number of set bits (1s) in a 32-bit integer.'),
      p('Counting Bits', 'Easy', 'Return an array of the count of 1-bits for every number from 0 to n.'),
      p('Reverse Bits', 'Easy', 'Reverse the bits of a given 32-bit unsigned integer.'),
      p('Missing Number', 'Easy', 'Find the missing number in range [0, n] from an array of n distinct numbers.'),
      p('Sum of Two Integers', 'Medium', 'Calculate sum of two integers without using + or - operators.'),
      p('Reverse Integer', 'Medium', 'Reverse digits of a 32-bit signed integer.'),
    ]
  }
];
