import { p } from '../helper.js';

export const arraysHashing = {
    id: 'arrays-hashing',
    name: 'Arrays & Hashing',
    icon: '📦',
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

        for(int i=0; i<s.length(); i++){                   // Outer loop: O(n)
            boolean found = false;

            for(int j=0; j<t.length(); j++){               // Inner loop: O(n)
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
      {
        id: 'top-k-frequent-elements',
        title: 'Top K Frequent Elements',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/description/',
        definition: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
        examples: [
          { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
          { input: 'nums = [1], k = 1', output: '[1]' }
        ],
        brute: {
          idea: 'Count the frequency of each element using a HashMap. Extract all unique elements into a list, sort them descending by frequency, and pick the first k elements.',
          code: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();

        for(int i=0; i<nums.length; i++){                  // Loop: O(n)
            map.put(nums[i], map.getOrDefault(nums[i], 0) + 1); // Insert / Update: O(1) avg
        }

        List<Integer> list = new ArrayList<>(map.keySet());

        list.sort((a, b) -> map.get(b) - map.get(a));     // Sorting: O(d log d)

        int ans[] = new int[k];
        for(int i=0; i<k; i++){                            // Loop: O(k)
            ans[i] = list.get(i);
        }

        return ans;
    }
}`,
          time: 'O(n + d log d)',
          timeDesc: '• Frequency map loop: O(n)\n• Sorting distinct elements list (d elements): O(d log d)\n• Extracting top k elements: O(k)\n• Total Time: O(n + d log d)',
          space: 'O(d)',
          spaceDesc: 'HashMap and list store up to d distinct elements (where d ≤ n).',
          walkthrough: [
            "Create a HashMap<Integer, Integer> map to count the frequency of each number in nums.",
            "Loop through nums and update counts using map.put(nums[i], map.getOrDefault(nums[i], 0) + 1).",
            "Extract all unique numbers into a list: new ArrayList<>(map.keySet()).",
            "Sort the list in descending order of frequency using list.sort((a, b) -> map.get(b) - map.get(a)).",
            "Initialize an integer array ans of size k and copy the first k numbers from the sorted list.",
            "Return ans."
          ]
        },
        optimal: {
          idea: 'Count frequencies in a HashMap, then maintain a Min-Heap (PriorityQueue) of size k. For each unique number, push into the heap; if size exceeds k, pop the minimum element so only the top k frequent elements remain.',
          code: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();

        for(int i=0; i<nums.length; i++){                  // Loop: O(n)
            map.put(nums[i], map.getOrDefault(nums[i], 0) + 1); // Insert / Update: O(1) avg
        }

        Queue<Integer> heap = new PriorityQueue<>(
            (a, b) -> map.get(a) - map.get(b)
        );

        for(int key : map.keySet()){                       // Loop: O(d)
            heap.add(key);                                 // Heap push: O(log k)

            if(heap.size() > k){
                heap.poll();                               // Heap pop: O(log k)
            }
        }

        int ans[] = new int[k];
        for(int i=0; i<k; i++){                            // Loop: O(k)
            ans[i] = heap.poll();                          // Heap pop: O(log k)
        }

        return ans;
    }
}`,
          time: 'O(n + d log k)',
          timeDesc: '• Frequency map loop: O(n)\n• Min-Heap operations for d elements (size k): O(d log k)\n• Extracting k elements from heap: O(k log k)\n• Total Time: O(n + d log k)',
          space: 'O(d + k)',
          spaceDesc: 'HashMap stores d distinct elements, PriorityQueue stores at most k + 1 elements.',
          walkthrough: [
            "Count the frequency of each element in nums using a HashMap.",
            "Initialize a Min-Heap (PriorityQueue) ordered by frequency: (a, b) -> map.get(a) - map.get(b).",
            "Iterate through each unique key in map.keySet() and add it to heap.",
            "If heap size exceeds k, remove the lowest frequency element using heap.poll().",
            "After all keys are processed, the heap contains exactly the top k frequent numbers.",
            "Extract elements into result array ans and return it."
          ]
        }
      },
      {
        id: 'encode-and-decode-strings',
        title: 'Encode and Decode Strings',
        difficulty: 'Medium',
        leetcodeUrl: 'https://neetcode.io/problems/string-encode-and-decode/question',
        definition: 'Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.',
        examples: [
          { input: 'strs = ["neet","code","love","you"]', output: '["neet","code","love","you"]' },
          { input: 'strs = ["we","say",":","yes"]', output: '["we","say",":","yes"]' }
        ],
        optimal: {
          idea: 'Use length-prefix encoding. Prepend each string with its length followed by a ":" delimiter (e.g., "4:neet"). During decoding, scan for ":" to read the length prefix, allowing reliable substring slicing regardless of special characters inside strings.',
          code: `class Solution {

    public String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();

        for (String s : strs) {                            // Loop: O(n)
            sb.append(s.length()).append(':').append(s);
        }

        return sb.toString();
    }

    public List<String> decode(String str) {
        List<String> result = new ArrayList<>();
        int i=0;

        while(i < str.length()){                           // Outer loop: O(N)
            int j = i;

            while(str.charAt(j) != ':'){                   // Inner scan: O(length digits)
                j++;
            }

            int len = Integer.parseInt(str.substring(i, j));
            i = j+1;

            result.add(str.substring(i, i+len));           // Substring extraction: O(len)
            i = i+len;
        }

        return result;
    }
}`,
          time: 'O(N)',
          timeDesc: '• encode: iterates through all strings and appends characters: O(N)\n• decode: scans length digits and extracts substrings: O(N)\n• Total Time: O(N) where N is total characters',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space (excluding the output string and list).',
          walkthrough: [
            "In encode, iterate through each string s in strs and append its length, ':' delimiter, and the string itself.",
            "In decode, initialize pointer i = 0 and an empty result list.",
            "While i < str.length(), find the next ':' delimiter using inner scan pointer j.",
            "Parse the length integer from str.substring(i, j) and update i = j + 1.",
            "Extract the exact string of length len using str.substring(i, i + len) and add to result.",
            "Advance pointer i by len and continue until the entire string is decoded.",
            "Return result."
          ]
        }
      },
      {
        id: 'product-of-array-except-self',
        title: 'Product of Array Except Self',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/description/',
        definition: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.',
        examples: [
          { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
          { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' }
        ],
        brute: {
          idea: 'For each index i, iterate through the entire array using a helper function to compute the product of all elements except the one at index i.',
          code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int result[] = new int[nums.length];

        for(int i=0; i<nums.length; i++){                  // Outer loop: O(n)
            result[i] = PES(nums, i);                      // Helper call: O(n)
        }

        return result;
    }

    public int PES(int nums[], int i){
        int product = 1;

        for(int j=0; j<nums.length; j++){                  // Inner loop: O(n)
            if(j == i){
                continue;
            }

            product = product * nums[j];
        }

        return product;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop: O(n)\n• Inner helper loop: O(n)\n• Total Time: O(n · n) = O(n²)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space (excluding the returned result array).',
          walkthrough: [
            "Initialize an integer array result of length nums.length.",
            "Iterate through nums with outer loop index i from 0 to nums.length - 1.",
            "For each index i, call helper PES(nums, i) which initializes product = 1.",
            "In PES, inner loop j multiplies all elements nums[j] where j != i.",
            "Store the resulting product at result[i].",
            "Return result."
          ]
        },
        better: {
          idea: 'Precompute prefix products and suffix products using two separate arrays. For each index i, the product except itself is simply prefix[i] * suffix[i].',
          code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;

        int[] prefix = new int[n];
        int[] suffix = new int[n];
        int[] result = new int[n];

        prefix[0] = 1;
        for(int i=1; i<n; i++){                            // Loop: O(n)
            prefix[i] = prefix[i-1] * nums[i-1];
        }

        suffix[n-1] = 1;
        for(int i=n-2; i>=0; i--){                         // Loop: O(n)
            suffix[i] = suffix[i+1] * nums[i+1];
        }

        for(int i=0; i<n; i++){                            // Loop: O(n)
            result[i] = prefix[i] * suffix[i];
        }

        return result;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Prefix array build pass: O(n)\n• Suffix array build pass: O(n)\n• Combined product pass: O(n)\n• Total Time: O(3n) = O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space for prefix and suffix arrays of length n.',
          walkthrough: [
            "Initialize two arrays prefix and suffix of size n.",
            "Build prefix array: prefix[0] = 1, and for each i from 1 to n-1, prefix[i] = prefix[i-1] * nums[i-1].",
            "Build suffix array: suffix[n-1] = 1, and for each i from n-2 down to 0, suffix[i] = suffix[i+1] * nums[i+1].",
            "Compute result array: for each index i, result[i] = prefix[i] * suffix[i].",
            "Return result."
          ]
        },
        optimal: {
          idea: 'Optimize space to O(1) by directly storing prefix products in the result array, then traversing backward with a single running suffix product variable.',
          code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        result[0] = 1;
        for(int i=1; i<n; i++){                            // Loop: O(n)
            result[i] = result[i-1] * nums[i-1];
        }

        int suffix = 1;
        for(int i=n-1; i>=0; i--){                         // Loop: O(n)
            result[i] = result[i] * suffix;
            suffix = suffix * nums[i];
        }

        return result;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Forward pass building prefix products in result: O(n)\n• Backward pass multiplying running suffix: O(n)\n• Total Time: O(2n) = O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space (output array does not count as extra memory).',
          walkthrough: [
            "Initialize result array of size n with result[0] = 1.",
            "Forward pass (i from 1 to n-1): calculate prefix products directly in result[i] = result[i-1] * nums[i-1].",
            "Initialize variable suffix = 1.",
            "Backward pass (i from n-1 down to 0): multiply result[i] by suffix, then update suffix = suffix * nums[i].",
            "Return result."
          ]
        }
      },
      {
        id: 'valid-sudoku',
        title: 'Valid Sudoku',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/description/',
        definition: 'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the rules: each row, each column, and each of the nine 3 x 3 sub-boxes must contain the digits 1-9 without repetition.',
        examples: [
          {
            input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            output: 'true'
          },
          {
            input: 'board = [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            output: 'false'
          }
        ],
        optimal: {
          idea: 'Use arrays of HashSets to keep track of seen characters for each of the 9 rows, 9 columns, and 9 sub-boxes (indexed by (i/3)*3 + (j/3)). Traverse the 81 cells once; if any filled digit is seen again in its row, column, or 3x3 box, return false.',
          code: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        int N = 9;

        HashSet<Character>[] rows = new HashSet[N];
        HashSet<Character>[] cols = new HashSet[N];
        HashSet<Character>[] subBoxes = new HashSet[N];

        for(int i=0; i<N; i++){                            // Loop: O(9) ≈ O(1)
            rows[i] = new HashSet<Character>();
            cols[i] = new HashSet<Character>();
            subBoxes[i] = new HashSet<Character>();
        }

        for(int i=0; i<N; i++){                            // Outer loop: O(9) ≈ O(1)
            for(int j=0; j<N; j++){                        // Inner loop: O(9) ≈ O(1)
                char val = board[i][j];

                if(val == '.'){
                    continue;
                }

                if(rows[i].contains(val)){                 // Lookup: O(1) avg
                    return false;
                }
                rows[i].add(val);                          // Insert: O(1) avg

                if(cols[j].contains(val)){                 // Lookup: O(1) avg
                    return false;
                }
                cols[j].add(val);                          // Insert: O(1) avg

                int box = (i/3) * 3 + (j/3);
                if(subBoxes[box].contains(val)){           // Lookup: O(1) avg
                    return false;
                }
                subBoxes[box].add(val);                    // Insert: O(1) avg
            }
        }

        return true;
    }
}`,
          time: 'O(1)',
          timeDesc: '• Set initialization: 9 iterations: O(1)\n• Grid traversal: fixed 9 × 9 = 81 cells: O(1)\n• HashSet lookups & inserts: O(1) avg\n• Total Time: O(1) (fixed 9×9 board)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space: 3 arrays of 9 HashSets storing at most 81 characters.',
          walkthrough: [
            "Initialize three arrays of HashSets of size 9: rows, cols, and subBoxes.",
            "Iterate through each cell (i, j) on the 9×9 board.",
            "If board[i][j] == '.', skip to the next cell using continue.",
            "Check if rows[i] already contains val: if true, duplicate in row, return false.",
            "Check if cols[j] already contains val: if true, duplicate in column, return false.",
            "Compute 3×3 sub-box index box = (i / 3) * 3 + (j / 3): check if subBoxes[box] contains val, if true return false.",
            "Insert val into rows[i], cols[j], and subBoxes[box].",
            "If all cells are valid without duplicates, return true."
          ]
        }
      },
      {
        id: 'longest-consecutive-sequence',
        title: 'Longest Consecutive Sequence',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/description/',
        definition: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.',
        examples: [
          { input: 'nums = [100,4,200,1,3,2]', output: '4' },
          { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' }
        ],
        brute: {
          idea: 'For each number in the array, attempt to build a consecutive chain by repeatedly scanning the entire array for val + 1.',
          code: `class Solution {
    public int longestConsecutive(int[] nums) {
        int n = nums.length;
        if(n == 0) return 0;

        int longest = 1;

        for(int i=0; i<n; i++){                            // Outer loop: O(n)
            int val = nums[i];

            int currLongest = 1;

            while(true){                                   // Sequence loop: up to O(n)
                boolean found = false;

                for(int j=0; j<n; j++){                    // Inner scan: O(n)
                    if(nums[j] == (val+1)){
                        currLongest++;
                        val++;
                        found = true;
                        break;
                    }
                }

                if(!found){
                    break;
                }
            }

            longest = Math.max(longest, currLongest);
        }

        return longest;
    }
}`,
          time: 'O(n³)',
          timeDesc: '• Outer loop: O(n)\n• Sequence loop: up to O(n)\n• Inner array scan for val + 1: O(n)\n• Total Time: O(n) × O(n) × O(n) = O(n³)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space used.',
          walkthrough: [
            "If array is empty (n == 0), return 0.",
            "Iterate through each number nums[i] with outer pointer i as the potential sequence start.",
            "In while loop, search the entire array using pointer j for val + 1.",
            "If found, increment currLongest and val, and repeat.",
            "If not found, break out of while loop and update longest = Math.max(longest, currLongest).",
            "Return longest."
          ]
        },
        better: {
          idea: 'Sort the array first so consecutive elements become adjacent. Iterate through the sorted array, skipping duplicate values and tracking the length of consecutive sequences.',
          code: `class Solution {
    public int longestConsecutive(int[] nums) {
        int n = nums.length;
        if(n == 0) return 0;

        Arrays.sort(nums);                                 // Sorting: O(n log n)
        int longest = 1;
        int currLongest = 1;

        for (int i = 1; i < nums.length; i++) {            // Loop: O(n)
            if (nums[i] == nums[i - 1]) {
                continue;
            }

            if (nums[i] == nums[i - 1] + 1) {
                currLongest++;
            } else {
                currLongest = 1;
            }

            longest = Math.max(longest, currLongest);
        }

        return longest;
    }
}`,
          time: 'O(n log n)',
          timeDesc: '• Sorting the array: O(n log n)\n• Single pass scan: O(n)\n• Total Time: O(n log n)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space (or O(log n) recursion stack space for sorting).',
          walkthrough: [
            "If array is empty, return 0.",
            "Sort the array nums in ascending order using Arrays.sort(nums).",
            "Initialize longest = 1 and currLongest = 1.",
            "Iterate from index 1 to n - 1.",
            "If nums[i] == nums[i - 1], skip duplicate using continue.",
            "If nums[i] == nums[i - 1] + 1, increment currLongest; otherwise reset currLongest = 1.",
            "Update longest = Math.max(longest, currLongest) at each step.",
            "Return longest."
          ]
        },
        optimal: {
          idea: 'Insert all numbers into a HashSet for O(1) lookups. For each number, check if it is the start of a sequence (!set.contains(num - 1)). If it is, count consecutively upwards using while(set.contains(num + 1)).',
          code: `class Solution {
    public int longestConsecutive(int[] nums) {
        HashSet<Integer> set = new HashSet<>();

        for(int i=0; i<nums.length; i++){                  // Loop: O(n)
            set.add(nums[i]);                              // Insert: O(1) avg
        }

        int longest = 0;

        for(int num : set){                                // Loop: O(n)
            if(!set.contains(num - 1)){                    // Lookup: O(1) avg
                int currLongest = 1;

                while(set.contains(num + 1)){              // Lookup: O(1) avg
                    currLongest++;
                    num++;
                }

                longest = Math.max(longest, currLongest);
            }
        }

        return longest;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Building HashSet: O(n)\n• Traversing set and expanding sequences: O(n) (each number visited at most twice)\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space to store elements in the HashSet.',
          walkthrough: [
            "Insert all elements from nums into a HashSet for O(1) lookups.",
            "Initialize longest = 0.",
            "Iterate through each number num in the set.",
            "Check if !set.contains(num - 1): only begin counting if num is the start of a consecutive sequence.",
            "While set.contains(num + 1), increment currLongest and advance num.",
            "Update longest = Math.max(longest, currLongest).",
            "Return longest."
          ]
        }
      },
    ]
  };
