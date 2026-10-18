import { p } from '../helper.js';

export const slidingWindow = {
    id: 'sliding-window',
    name: 'Sliding Window',
    icon: '🪟',
    timestamp: '3:22:29',
    problems: [
      {
        id: 'best-time-to-buy-and-sell-stock',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/',
        definition: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
        examples: [
          { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
          { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'In this case, no transactions are done and the max profit = 0.' }
        ],
        brute: {
          idea: 'Consider all possible pairs of buy and sell days using nested loops. For each day i (buy), check every future day j (sell). Compute profit = prices[j] - prices[i] and track the maximum profit found.',
          code: `class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int maxProfit = 0;

        for(int i=0; i<n; i++){                            // Outer loop: choose buy day O(n)
            int buyingPrice = prices[i];

            for(int j=i+1; j<n; j++){                      // Inner loop: choose sell day O(n)
                int sellingPrice = prices[j];
                int profit = sellingPrice - buyingPrice;
                maxProfit = Math.max(maxProfit, profit);
            }
        }

        return maxProfit;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop runs n times: O(n)\n• Inner loop runs (n - 1), (n - 2), ..., 1 times: O(n)\n• Total pairs compared = n * (n - 1) / 2 = O(n²)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant extra space using only a few integer variables (buyingPrice, sellingPrice, profit, maxProfit).',
          walkthrough: [
            "Initialize n = prices.length and maxProfit = 0.",
            "Iterate outer loop with pointer i from 0 to n - 1 representing the buying day with buyingPrice = prices[i].",
            "Iterate inner loop with pointer j from i + 1 to n - 1 representing the future selling day with sellingPrice = prices[j].",
            "Calculate profit = sellingPrice - buyingPrice.",
            "Update maxProfit = Math.max(maxProfit, profit).",
            "After all pairs are checked, return maxProfit."
          ]
        },
        optimal: {
          idea: 'Maintain the minimum buying price seen so far as we iterate through the array. For each day, if current price is higher than buyingPrice, calculate potential profit and update maxProfit. Otherwise, update buyingPrice to current price since buying at a lower price yields better future profits.',
          code: `class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int buyingPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for(int i=0; i<n; i++){                            // Single pass: O(n)
            if(buyingPrice < prices[i]){                   // Profitable to sell today
                int profit = prices[i] - buyingPrice;
                maxProfit = Math.max(maxProfit, profit);
            } else {                                       // Found cheaper day to buy
                buyingPrice = prices[i];
            }
        }

        return maxProfit;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Single traversal across the prices array of length n: O(n)\n• Constant-time comparisons and math operations in each iteration: O(1)\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant extra space since we only store buyingPrice and maxProfit variables.',
          walkthrough: [
            "Initialize buyingPrice = Integer.MAX_VALUE and maxProfit = 0.",
            "Traverse through prices array from index i = 0 to n - 1.",
            "If buyingPrice < prices[i]: calculate current profit = prices[i] - buyingPrice and update maxProfit = Math.max(maxProfit, profit).",
            "Else: current price prices[i] is less than or equal to buyingPrice, so update buyingPrice = prices[i].",
            "After processing all days, return maxProfit."
          ]
        }
      },
      p('Longest Substring Without Repeating Characters', 'Medium', 'Find the length of the longest substring without repeating characters.'),
      p('Longest Repeating Character Replacement', 'Medium', 'Find longest substring with at most k character replacements.'),
      p('Permutation In String', 'Medium', 'Check if one string\'s permutation is a substring of another.'),
      p('Minimum Window Substring', 'Hard', 'Find minimum window in s that contains all characters of t.'),
      p('Sliding Window Maximum', 'Hard', 'Find the maximum in each sliding window of size k.'),
    ]
  };
