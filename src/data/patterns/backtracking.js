import { p } from '../helper.js';
import subsetsTree from '@/assets/images/backtracking/Recursion Tree_ Generating All Subsets.png';
import combinationSumTree from '@/assets/images/backtracking/Combination Sum Recursion Tree.png';
import combinationSum2Tree from '@/assets/images/backtracking/Colorful Combination Sum II Recursion Tree.png';
import permutationsTree from '@/assets/images/backtracking/Colorful Permutation Recursion Tree.png';
import subsets2Tree from '@/assets/images/backtracking/Colorful Subsets Recursion Tree Infographic.png';
import phoneTree from '@/assets/images/backtracking/Phone Number Recursion Tree Infographic.png';
import parenthesesTree from '@/assets/images/backtracking/Colorful Parentheses Recursion Tree Infographic.png';
import palindromeTree from '@/assets/images/backtracking/Palindrome Partitioning Recursion Tree.png';
import wordSearchTree from '@/assets/images/backtracking/Word Search Recursion Tree Infographic.png';

export const backtracking = {
  id: 'backtracking',
  name: 'Backtracking',
  icon: '🔙',
  problems: [
    {
      id: 'subsets',
      title: 'Subsets',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/subsets/description/',
      image: {
        url: subsetsTree,
        title: 'Dry Run'
      },
      definition: 'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
      examples: [
        {
          input: 'nums = [1,2,3]',
          output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
          explanation: 'All subsets are generated from distinct elements, including the empty set and the entire array.'
        },
        {
          input: 'nums = [0]',
          output: '[[],[0]]',
          explanation: 'The power set contains the empty set and [0].'
        }
      ],
      optimal: {
        idea: '• **Pattern:** Include or Exclude Backtracking (Pick or Skip)\n• **Decision at each step:** At each `index`, explore two branching paths:\n  1. **Include:** Add `nums[index]` to the current subset (`curr`) and recurse to `index + 1`.\n  2. **Exclude (Backtrack):** Undo the choice by removing `nums[index]` from `curr` and recurse without it.\n• **Base Case:** When `index == nums.length`, all elements have been evaluated. Capture a snapshot (`new ArrayList<>(curr)`) into `ans`.',
        code: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> curr = new ArrayList<>();

        generateAns(nums, ans, curr, 0);

        return ans;
    }

    public void generateAns(int nums[], List<List<Integer>> ans, List<Integer> curr, int index) {
        if (index == nums.length) {
            ans.add(new ArrayList<>(curr)); // : O(N) copy into answer
            return;
        }

        // Include choice
        curr.add(nums[index]);
        generateAns(nums, ans, curr, index + 1); // : 2^N recursion paths

        // Exclude choice (Backtrack)
        curr.remove(curr.size() - 1);
        generateAns(nums, ans, curr, index + 1);
    }
}`,
        time: 'O(N * 2^N)',
        space: 'O(N)'
      }
    },
    {
      id: 'combination-sum',
      title: 'Combination Sum',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/combination-sum/description/',
      image: {
        url: combinationSumTree,
        title: 'Dry Run'
      },
      definition: 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.',
      examples: [
        {
          input: 'candidates = [2,3,6,7], target = 7',
          output: '[[2,2,3],[7]]',
          explanation: '2 and 3 are candidates, and 2 + 2 + 3 = 7 (2 is used multiple times). 7 = 7. These are the only two combinations.'
        },
        {
          input: 'candidates = [2,3,5], target = 8',
          output: '[[2,2,2,2],[2,3,3],[3,5]]',
          explanation: 'All unique combinations summing to 8.'
        },
        {
          input: 'candidates = [2], target = 1',
          output: '[]',
          explanation: 'No combinations possible.'
        }
      ],
      optimal: {
        idea: '• **Pattern:** Backtracking with Unlimited Element Reuse\n• **Decision at each step:** At each candidate, branch into two choices:\n  1. **Pick (Reuse):** If `candidates[index] <= target`, add it to `curr`, subtract from `target`, and recurse on the SAME `index`.\n  2. **Backtrack:** Remove the last added number from `curr` and restore `target`.\n  3. **Skip (Next candidate):** Advance to `index + 1` with unchanged `target` to explore combinations without this element.\n• **Base Case:** If `target == 0`, save `new ArrayList<>(curr)` into `ans` and return. If `index == candidates.length`, terminate the branch.',
        code: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> curr = new ArrayList<>();
        int index = 0;

        findCombinations(candidates, ans, curr, index, target);
        return ans;
    }

    public void findCombinations(int candidates[], List<List<Integer>> ans, List<Integer> curr, int index, int target) {
        if (index == candidates.length) {
            if (target == 0) {
                ans.add(new ArrayList<>(curr)); // : O(K) copy into answer
            }
            return;
        }

        // Pick choice (reusable: stay at same index)
        if (candidates[index] <= target) {
            curr.add(candidates[index]);
            target = target - candidates[index];

            findCombinations(candidates, ans, curr, index, target); // : recurse with reuse
            curr.remove(curr.size() - 1);
            target = target + candidates[index];
        }

        // Skip choice (advance to next candidate)
        findCombinations(candidates, ans, curr, index + 1, target); // : recurse skip
    }
}`,
        time: 'O(2^(target / min) * K)',
        space: 'O(target / min)'
      }
    },
    {
      id: 'combination-sum-ii',
      title: 'Combination Sum II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/combination-sum-ii/description/',
      image: {
        url: combinationSum2Tree,
        title: 'Dry Run'
      },
      definition: 'Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target. Each number in candidates may only be used once in the combination. The solution set must not contain duplicate combinations.',
      examples: [
        {
          input: 'candidates = [10,1,2,7,6,1,5], target = 8',
          output: '[\n  [1,1,6],\n  [1,2,5],\n  [1,7],\n  [2,6]\n]',
          explanation: 'All unique combinations where each element is used at most once and elements sum to 8.'
        },
        {
          input: 'candidates = [2,5,2,1,2], target = 5',
          output: '[\n  [1,2,2],\n  [5]\n]',
          explanation: 'Sorted candidates are [1,2,2,2,5]. Only unique combinations summing to 5 are included.'
        }
      ],
      optimal: {
        idea: '• **Pattern:** Backtracking with Duplicate Pruning (Single-Use Elements)\n• **Pre-sorting:** Sort `candidates` in ascending order so identical values are adjacent.\n• **Duplicate Pruning:** Loop `i` from `index` to `candidates.length - 1`. If `i > index && candidates[i] == candidates[i - 1]`, skip `candidates[i]` to avoid duplicate decision branches at the same recursion depth.\n• **State Transition:** If `candidates[i] <= target`, add it to `curr`, decrement `target`, and recurse to `i + 1` (preventing reuse).\n• **Backtrack:** Remove the element from `curr` and restore `target`.\n• **Base Case:** When `target == 0`, record `new ArrayList<>(curr)` into `ans` and return.',
        code: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> curr = new ArrayList<>();
        Arrays.sort(candidates);
        int index = 0;

        findCombinations(candidates, ans, curr, index, target);
        return ans;
    }

    public void findCombinations(int candidates[], List<List<Integer>> ans, List<Integer> curr, int index, int target) {
        if (target == 0) {
            ans.add(new ArrayList<>(curr)); // : O(K) copy into answer
            return;
        }

        for (int i = index; i < candidates.length; i++) { // : O(N) loop
            // Skip duplicates at the same tree depth
            if (i > index && candidates[i] == candidates[i - 1]) {
                continue;
            }

            if (candidates[i] <= target) {
                curr.add(candidates[i]);
                target = target - candidates[i];

                findCombinations(candidates, ans, curr, i + 1, target); // : recurse next index
                curr.remove(curr.size() - 1);
                target = target + candidates[i];
            }
        }
    }
}`,
        time: 'O(2^N * K)',
        space: 'O(K)'
      }
    },
    {
      id: 'permutations',
      title: 'Permutations',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/permutations/description/',
      image: {
        url: permutationsTree,
        title: 'Dry Run'
      },
      definition: 'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.',
      examples: [
        {
          input: 'nums = [1,2,3]',
          output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',
          explanation: 'All 3! = 6 possible permutations of [1,2,3].'
        },
        {
          input: 'nums = [0,1]',
          output: '[[0,1],[1,0]]',
          explanation: 'All 2! = 2 possible permutations of [0,1].'
        },
        {
          input: 'nums = [1]',
          output: '[[1]]',
          explanation: 'A single element has exactly 1 permutation.'
        }
      ],
      optimal: {
        idea: '• **Pattern:** Backtracking with Visited State Array\n• **State Tracking:** Use a boolean array `used[]` of size `nums.length` to keep track of elements already picked in the current permutation.\n• **Loop and Branching:** In each recursive call, loop `i` from `0` to `nums.length - 1`:\n  1. If `used[i]` is true, skip `nums[i]` since it is already in `curr`.\n  2. Otherwise, add `nums[i]` to `curr`, mark `used[i] = true`, and recurse.\n  3. Backtrack by removing `nums[i]` from `curr` and resetting `used[i] = false`.\n• **Base Case:** When `curr.size() == nums.length`, a full permutation has been formed. Add `new ArrayList<>(curr)` to `ans` and return.',
        code: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> curr = new ArrayList<>();
        boolean[] used = new boolean[nums.length];

        generateAns(nums, ans, curr, used);
        return ans;
    }

    public void generateAns(int[] nums, List<List<Integer>> ans, List<Integer> curr, boolean[] used) {
        if (curr.size() == nums.length) {
            ans.add(new ArrayList<>(curr)); // : O(N) copy into answer
            return;
        }

        for (int i = 0; i < nums.length; i++) { // : O(N) loop at each level
            if (used[i]) {
                continue;
            }

            curr.add(nums[i]);
            used[i] = true;

            generateAns(nums, ans, curr, used); // : O(N!) permutation paths

            curr.remove(curr.size() - 1);
            used[i] = false;
        }
    }
}`,
        time: 'O(N! * N)',
        space: 'O(N)'
      }
    },
    {
      id: 'subsets-ii',
      title: 'Subsets II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/subsets-ii/description/',
      image: {
        url: subsets2Tree,
        title: 'Dry Run'
      },
      definition: 'Given an integer array nums that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
      examples: [
        {
          input: 'nums = [1,2,2]',
          output: '[[],[1],[1,2],[1,2,2],[2],[2,2]]',
          explanation: 'All unique subsets formed from array with duplicate elements.'
        },
        {
          input: 'nums = [0]',
          output: '[[],[0]]',
          explanation: 'The power set contains the empty set and [0].'
        }
      ],
      optimal: {
        idea: '• **Pattern:** Backtracking with Duplicate Pruning\n• **Pre-sorting:** Sort `nums` first so identical values are adjacent.\n• **Subset Snapshot:** Add `new ArrayList<>(curr)` to `ans` at the start of each recursive call.\n• **Loop and Pruning:** Iterate `i` from `index` to `nums.length - 1`:\n  1. If `i > index && nums[i] == nums[i - 1]`, skip `nums[i]` to avoid duplicate subsets at the same depth.\n  2. Otherwise, add `nums[i]` to `curr`, recurse with `i + 1`, and backtrack by removing the last element.',
        code: `class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        Arrays.sort(nums); // : O(N log N) sorting

        findSubsets(nums, ans, new ArrayList<>(), 0);
        return ans;
    }

    public void findSubsets(int[] nums, List<List<Integer>> ans, List<Integer> curr, int index) {
        ans.add(new ArrayList<>(curr)); // : O(N) copy into answer

        for (int i = index; i < nums.length; i++) { // : O(N) loop
            if (i > index && nums[i] == nums[i - 1]) {
                continue;
            }

            curr.add(nums[i]);
            findSubsets(nums, ans, curr, i + 1); // : 2^N recursion paths
            curr.remove(curr.size() - 1);
        }
    }
}`,
        time: 'O(N * 2^N)',
        space: 'O(N)'
      }
    },
    {
      id: 'letter-combinations-of-a-phone-number',
      title: 'Letter Combinations of a Phone Number',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/',
      image: {
        url: phoneTree,
        title: 'Dry Run'
      },
      definition: 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digits to letters is just like on telephone buttons.',
      examples: [
        {
          input: 'digits = "23"',
          output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
          explanation: 'All combinations formed by choosing one letter from "abc" (2) and one letter from "def" (3).'
        },
        {
          input: 'digits = ""',
          output: '[]',
          explanation: 'Empty input string returns an empty list.'
        },
        {
          input: 'digits = "2"',
          output: '["a","b","c"]',
          explanation: 'Single digit returns its mapped characters.'
        }
      ],
      optimal: {
        idea: '• **Pattern:** Multi-Branch Recursive Backtracking\n• **Keypad Mapping:** Use an array `map` where index `2` maps to `"abc"`, `3` to `"def"`, up to `9` mapping to `"wxyz"`.\n• **Branching Choices:** At recursion level `index`, look up `letters = map[currNum]`. Loop through each character:\n  1. Append character to `curr`.\n  2. Recurse with `index + 1` for the next digit.\n  3. Backtrack by removing the last character from `curr`.\n• **Base Case:** When `index == digits.length()`, snapshot `curr.toString()` into `ans` and return.\n• **Edge Case:** If `digits` is empty, return an empty list immediately.',
        code: `class Solution {
    public List<String> letterCombinations(String digits) {
        List<String> ans = new ArrayList<>();

        if (digits.length() == 0) return ans; // : O(1) edge case

        String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

        findCombinations(ans, new StringBuilder(), digits, map, 0);
        return ans;
    }

    public void findCombinations(List<String> ans, StringBuilder curr, String digits, String[] map, int index) {
        if (index == digits.length()) {
            ans.add(curr.toString()); // : O(N) copy formed string
            return;
        }

        int currNum = digits.charAt(index) - '0';
        String letters = map[currNum];

        for (int i = 0; i < letters.length(); i++) { // : O(K) loop where K <= 4
            curr.append(letters.charAt(i));
            findCombinations(ans, curr, digits, map, index + 1); // : 4^N recursion paths
            curr.deleteCharAt(curr.length() - 1);
        }
    }
}`,
        time: 'O(4^N * N)',
        space: 'O(N)'
      }
    },
    {
      id: 'generate-parentheses',
      title: 'Generate Parentheses',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/description/',
      image: {
        url: parenthesesTree,
        title: 'Dry Run'
      },
      definition: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
      examples: [
        {
          input: 'n = 3',
          output: '["((()))","(()())","(())()","()(())","()()()"]',
          explanation: 'All 5 valid combinations of 3 pairs of parentheses (Catalan number C3 = 5).'
        },
        {
          input: 'n = 1',
          output: '["()"]',
          explanation: 'Only 1 valid combination of 1 pair of parentheses.'
        }
      ],
      optimal: {
        idea: '• **Pattern:** Constrained Backtracking with Invariant Validation\n• **Decision Rules:**\n  1. **Add \'(\':** Valid only when `open < n` (we have open brackets available to place).\n  2. **Add \')\':** Valid only when `close < open` (every closing bracket must pair with an already opened bracket).\n• **Pruning:** Invalid prefixes are never explored, keeping every recursion branch strictly well-formed.\n• **Base Case:** When `s.length() == 2 * n`, all `2 * n` brackets have been placed. Add `s` to `ans` and return.',
        code: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> ans = new ArrayList<>();
        generateAns(ans, "", 0, 0, n);
        return ans;
    }

    public void generateAns(List<String> ans, String s, int open, int close, int n) {
        if (s.length() == 2 * n) {
            ans.add(s); // : O(N) copy valid string
            return;
        }

        if (open < n) {
            generateAns(ans, s + "(", open + 1, close, n); // : branch adding '('
        }

        if (close < open) {
            generateAns(ans, s + ")", open, close + 1, n); // : branch adding ')'
        }
    }
}`,
        time: 'O(4^N / √N)',
        space: 'O(N)'
      }
    },
    {
      id: 'palindrome-partitioning',
      title: 'Palindrome Partitioning',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/palindrome-partitioning/description/',
      image: {
        url: palindromeTree,
        title: 'Dry Run'
      },
      definition: 'Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.',
      examples: [
        {
          input: 's = "aab"',
          output: '[["a","a","b"],["aa","b"]]',
          explanation: 'Both ["a","a","b"] and ["aa","b"] are valid partitions where each substring is a palindrome.'
        },
        {
          input: 's = "a"',
          output: '[["a"]]',
          explanation: 'Single character string has only 1 partition.'
        }
      ],
      optimal: {
        idea: '• **Pattern:** Backtracking with Palindrome Substring Validation\n• **Decision at each step:** Starting at `index`, evaluate every possible partition end position `i` from `index` to `s.length() - 1`:\n  1. **Palindrome Check:** If `s.substring(index, i + 1)` is a palindrome, add it to `curr`.\n  2. **Recurse:** Call `findPartitions` starting from `i + 1` to partition the remaining suffix.\n  3. **Backtrack:** Remove the last added substring from `curr` and explore the next partition point `i`.\n• **Base Case:** When `index == s.length()`, the entire string has been partitioned into valid palindromes. Add a copy of `curr` to `ans` and return.\n• **Palindrome Helper:** Use two pointers (`index` and `i`) moving inward to verify symmetry in O(N) time.',
        code: `class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> ans = new ArrayList<>();
        List<String> curr = new ArrayList<>();

        findPartitions(s, ans, curr, 0);
        return ans;
    }

    public void findPartitions(String s, List<List<String>> ans, List<String> curr, int index) {
        if (index == s.length()) {
            ans.add(new ArrayList<>(curr)); // : O(N) copy valid partition into answer
            return;
        }

        for (int i = index; i < s.length(); i++) { // : O(N) loop partition endpoints
            if (isPalindrome(s, index, i)) {
                curr.add(s.substring(index, i + 1));
                findPartitions(s, ans, curr, i + 1); // : 2^N recursion paths
                curr.remove(curr.size() - 1);
            }
        }
    }

    public boolean isPalindrome(String s, int index, int i) {
        while (index < i) { // : O(N) palindrome check
            if (s.charAt(index) != s.charAt(i)) {
                return false;
            }

            index++;
            i--;
        }

        return true;
    }
}`,
        time: 'O(N * 2^N)',
        space: 'O(N)'
      }
    },
    {
      id: 'word-search',
      title: 'Word Search',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/word-search/description/',
      image: {
        url: wordSearchTree,
        title: 'Dry Run'
      },
      definition: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.',
      examples: [
        {
          input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
          output: 'true',
          explanation: 'The word "ABCCED" can be traced following sequentially adjacent cells.'
        },
        {
          input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
          output: 'true',
          explanation: 'The word "SEE" exists in the grid.'
        },
        {
          input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
          output: 'false',
          explanation: 'Cannot reuse the same cell twice.'
        }
      ],
      optimal: {
        idea: '• **Pattern:** 2D Grid Backtracking with In-Place Visited Marking\n• **Starting Points:** Iterate through each cell `(i, j)` on the `N x M` board. When `board[i][j] == word.charAt(0)`, initiate recursive search.\n• **Base Case:** If `k == word.length()`, all characters in `word` have matched successfully. Return `true`.\n• **Boundary and Match Check:** Return `false` if `(i, j)` is out of bounds or `board[i][j] != word.charAt(k)`.\n• **In-Place Marking:** Temporarily save `temp = board[i][j]` and overwrite with `\'#\'` to mark the cell as visited without extra memory.\n• **4-Directional Exploration:** Recurse in 4 directions (down, up, right, left) for the next character `k + 1`.\n• **Backtrack:** Restore `board[i][j] = temp` to allow other path combinations to use the cell.',
        code: `class Solution {
    public boolean exist(char[][] board, String word) {
        int n = board.length;
        int m = board[0].length;

        for (int i = 0; i < n; i++) { // : O(N) loop rows
            for (int j = 0; j < m; j++) { // : O(M) loop cols
                if (board[i][j] == word.charAt(0)) {
                    if (search(board, word, n, m, i, j, 0)) { // : search from (i, j)
                        return true;
                    }
                }
            }
        }

        return false;
    }

    public boolean search(char[][] board, String word, int n, int m, int i, int j, int k) {
        if (k == word.length()) {
            return true;
        }

        if (i < 0 || j < 0 || i >= n || j >= m || board[i][j] != word.charAt(k)) {
            return false;
        }

        char temp = board[i][j];
        board[i][j] = '#'; // : mark visited in-place

        // 4-directional exploration: at most 3 choices per step
        boolean down = search(board, word, n, m, i + 1, j, k + 1);
        boolean up = search(board, word, n, m, i - 1, j, k + 1);
        boolean right = search(board, word, n, m, i, j + 1, k + 1);
        boolean left = search(board, word, n, m, i, j - 1, k + 1);

        board[i][j] = temp; // : backtrack restore cell

        return down || up || right || left;
    }
}`,
        time: 'O(N * M * 3^L)',
        space: 'O(L)'
      }
    },
    p('N Queens', 'Hard', 'Place n queens on an n×n chessboard with no conflicts.')
  ]
};