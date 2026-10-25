import { p } from '../helper.js';

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
        idea: 'Use an Include / Exclude backtracking pattern. At each index, branch into two decisions: include nums[index] into the current subset and recurse, then backtrack by removing it and recurse without it. Once index reaches nums.length, record a deep copy of the subset into ans.',
        code: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> curr = new ArrayList<>();

        generateAns(nums, ans, curr, 0);

        return ans;
    }

    public void generateAns(int nums[], List<List<Integer>> ans, List<Integer> curr, int index) {
        if (index == nums.length) {
            ans.add(new ArrayList<>(curr));
            return;
        }

        // Include choice
        curr.add(nums[index]);
        generateAns(nums, ans, curr, index + 1);

        // Exclude choice (Backtrack)
        curr.remove(curr.size() - 1);
        generateAns(nums, ans, curr, index + 1);
    }
}`,
        time: 'O(N * 2^N)',
        timeDesc: '• There are 2^N total subsets for N unique elements.\n• Copying each subset of size up to N into the answer list takes O(N) time.\n• Total Time Complexity: O(N * 2^N).',
        space: 'O(N)',
        spaceDesc: '• O(N) recursion stack depth and O(N) auxiliary space for the curr list (excluding output storage).',
        walkthrough: [
          'Initialize the result list ans and a temporary list curr to track elements in the current subset path.',
          'Start recursion from index 0: generateAns(nums, ans, curr, 0).',
          'Base case: When index == nums.length, a complete subset choice has been made. Add new ArrayList<>(curr) to ans and return.',
          'Include choice: Append nums[index] to curr and recursively call generateAns(nums, ans, curr, index + 1).',
          'Exclude choice: Undo the inclusion via curr.remove(curr.size() - 1) and call generateAns(nums, ans, curr, index + 1) without including nums[index].',
          'Return ans containing all 2^N subsets.'
        ]
      }
    },
    p('Combination Sum', 'Medium', 'Find all combinations that sum to target (elements reusable).'),
    p('Combination Sum II', 'Medium', 'Find combinations that sum to target (each element used once).'),
    p('Permutations', 'Medium', 'Generate all permutations of an array of distinct integers.'),
    p('Subsets II', 'Medium', 'Generate all subsets, handling duplicate elements.'),
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
        idea: 'Use backtracking: maintain counts of used open and close brackets. Only add "(" if open < n, and only add ")" if close < open (to ensure every close bracket matches an existing open bracket). This guarantees that every generated string of length 2n is valid, completely avoiding invalid branches.',
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
