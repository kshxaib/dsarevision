import { p } from '../helper.js';
import subsetsTree from '@/assets/images/backtracking/Recursion Tree_ Generating All Subsets.png';
import combinationSumTree from '@/assets/images/backtracking/Combination Sum Recursion Tree.png';
import combinationSum2Tree from '@/assets/images/backtracking/Colorful Combination Sum II Recursion Tree.png';
import permutationsTree from '@/assets/images/backtracking/Colorful Permutation Recursion Tree.png';
import subsets2Tree from '@/assets/images/backtracking/Colorful Subsets Recursion Tree Infographic.png';

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
    p('Letter Combinations of a Phone Number', 'Medium', 'Generate all letter combinations from phone keypad digits.'),
    {
      id: 'generate-parentheses',
      title: 'Generate Parentheses',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/description/',
      definition: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
      examples: [
        { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' },
        { input: 'n = 1', output: '["()"]' }
      ],
      optimal: {
        idea: '• **Pattern:** Constrained Backtracking (State Validation Invariant)\n• **Invariant Rules:**\n  1. **Add \'(\':** Valid whenever `open < n` (we have opening brackets remaining).\n  2. **Add \')\':** Valid only when `close < open` (ensures every closing bracket pairs with an existing open bracket).\n• **Pruning:** Invalid branches are pruned before recursion starts; every formed prefix is guaranteed valid.\n• **Base Case:** When `s.length() == 2 * n`, a valid well-formed parenthesis sequence is complete; add `s` to `ans`.',
        code: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> ans = new ArrayList<>();
        generateAns(ans, "", 0, 0, n);
        return ans;
    }

    public void generateAns(List<String> ans, String s, int open, int close, int n) {
        // Base case: formed a valid string of length 2*n
        if (s.length() == 2 * n) {
            ans.add(s);
            return;
        }

        // Add '(' only if we have not used all n opening brackets
        if (open < n) {
            generateAns(ans, s + "(", open + 1, close, n);
        }

        // Add ')' only if it will match an existing unclosed '('
        if (close < open) {
            generateAns(ans, s + ")", open, close + 1, n);
        }
    }
}`,
        time: 'O(4^n / √n)',
        timeDesc: '• The number of valid parentheses combinations is given by the n-th Catalan number: C_n = (1 / (n + 1)) * (2n choose n) ≈ O(4^n / (n^(1.5))).\n• Generating and appending each string takes O(n) time.\n• Total Time: O(4^n / √n)',
        space: 'O(n)',
        spaceDesc: 'O(n) auxiliary recursion stack space for maximum depth 2n.',
        walkthrough: [
          'Initialize an empty list ans and call generateAns(ans, "", 0, 0, n).',
          'Base condition: if s.length() == 2 * n, a complete valid combination is formed; add s to ans and return.',
          'If open < n: we can safely add an opening bracket "(", increment open by 1, and recurse.',
          'If close < open: we can safely add a closing bracket ")" to pair with an unclosed "(", increment close by 1, and recurse.',
          'Return ans containing all well-formed parentheses combinations.'
        ]
      }
    },
    p('Palindrome Partitioning', 'Medium', 'Partition a string into all possible palindrome substrings.'),
    p('Word Search', 'Medium', 'Search for a word in a 2D board of characters.'),
    p('N Queens', 'Hard', 'Place n queens on an n×n chessboard with no conflicts.')
  ]
};