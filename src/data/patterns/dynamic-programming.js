import { p } from '../helper.js';

export const dynamicProgramming = {
  id: 'dynamic-programming',
  name: 'Dynamic Programming',
  problems: [
    // 1D Dynamic Programming
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

    // 2D Dynamic Programming
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
};

