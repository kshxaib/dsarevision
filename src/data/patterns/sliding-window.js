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
      {
        id: 'longest-substring-without-repeating-characters',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/description/',
        definition: 'Given a string s, find the length of the longest substring without duplicate characters.',
        examples: [
          { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
          { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
          { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence and not a substring.' }
        ],
        brute: {
          idea: 'Generate all possible substrings starting at each index i. Use a HashSet to track characters seen in the current substring. If a duplicate character is encountered, break the inner loop and record the maximum length found.',
          code: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        int maxLen = 0;

        for(int i=0; i<n; i++){
            HashSet<Character> set = new HashSet<>();          // Track characters in current substring

            for(int j=i; j<n; j++){
                if(set.contains(s.charAt(j))){                 // Duplicate found, stop expanding
                    break;
                }

                set.add(s.charAt(j));
                maxLen = Math.max(maxLen, set.size());
            }
        }

        return maxLen;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop starts at each index i: O(n)\n• Inner loop expands substring up to n characters with O(1) HashSet lookups: O(n)\n• Total Time: O(n²)',
          space: 'O(min(n, m))',
          spaceDesc: 'O(min(n, m)) auxiliary space where n is string length and m is the size of the character set (at most 128 for ASCII or 26 for English letters).',
          walkthrough: [
            "Initialize n = s.length() and maxLen = 0.",
            "Iterate outer loop with pointer i from 0 to n - 1 (starting point of substring).",
            "Create a new HashSet<Character> to track unique characters in the substring starting at i.",
            "Iterate inner loop with pointer j from i to n - 1.",
            "If s.charAt(j) is already present in set, break out of inner loop as a duplicate was found.",
            "Otherwise, add s.charAt(j) to set and update maxLen = Math.max(maxLen, set.size()).",
            "After checking all substrings, return maxLen."
          ]
        },
        optimal: {
          idea: 'Use a sliding window with two pointers (left and right) and a HashSet. Expand right pointer to add characters. When a duplicate of s.charAt(right) is found, contract the window by incrementing left and removing s.charAt(left) until duplicate is removed. Maintain max window size.',
          code: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        HashSet<Character> set = new HashSet<>();

        int left = 0;
        int right = 0;
        int maxLen = 0;

        while(right < n){
            char currChar = s.charAt(right);

            while(set.contains(currChar)){                     // Shrink window from left until duplicate is removed
                set.remove(s.charAt(left));
                left++;
            }

            set.add(currChar);                                 // Add current character to window
            maxLen = Math.max(maxLen, right - left + 1);      // Update max window length (or set.size())
            right++;
        }

        return maxLen;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Both left and right pointers traverse the string at most once: each character is added and removed from the set at most once.\n• HashSet operations (contains, add, remove) take O(1) average time.\n• Total Time: O(2n) = O(n)',
          space: 'O(min(n, m))',
          spaceDesc: 'O(min(n, m)) auxiliary space for the sliding window HashSet, bounded by the character alphabet size m (e.g. at most 128 for ASCII).',
          walkthrough: [
            "Initialize n = s.length(), an empty HashSet<Character> set, left = 0, right = 0, and maxLen = 0.",
            "While right < n, fetch currChar = s.charAt(right).",
            "If set already contains currChar, run a while loop removing s.charAt(left) from set and incrementing left until currChar is no longer in set.",
            "Add currChar to set.",
            "Update maxLen = Math.max(maxLen, right - left + 1).",
            "Increment right pointer to continue expanding window.",
            "Return maxLen after right reaches end of string."
          ]
        }
      },
      {
        id: 'longest-repeating-character-replacement',
        title: 'Longest Repeating Character Replacement',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/description/',
        definition: 'You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.',
        examples: [
          { input: 's = "ABAB", k = 2', output: '4', explanation: 'Replace the two \'A\'s with \'B\'s or vice versa to get "BBBB" or "AAAA".' },
          { input: 's = "AABABBA", k = 1', output: '4', explanation: 'Replace the one \'B\' in the middle to form "AABA" or "ABBB". The substring "AABA" has length 4.' }
        ],
        brute: {
          idea: 'For every starting index i, expand the substring to index j. Maintain a frequency array of size 26 and track the count of the most frequent character (maxFreq). The number of characters to replace is (windowLen - maxFreq). If replacementsRequired <= k, update maxLen.',
          code: `class Solution {
    public int characterReplacement(String s, int k) {
        int n = s.length();
        int maxLen = 0;
        
        for(int i=0; i<n; i++){
            int freq[] = new int[26];                          // Frequency array for current substring
            int maxFreq = 0;

            for(int j=i; j<n; j++){
                char ch = s.charAt(j);
                freq[ch - 'A']++;

                maxFreq = Math.max(maxFreq, freq[ch - 'A']); // Most frequent char in substring

                int windowLen = j - i + 1;
                int replacementsRequired = windowLen - maxFreq;

                if(replacementsRequired <= k){                 // Valid substring with at most k replacements
                    maxLen = Math.max(maxLen, windowLen);
                }
            }
        }

        return maxLen;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop starts at each index i: O(n)\n• Inner loop runs up to n times with O(1) character updates and checks: O(n)\n• Total Time: O(n²)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space using a fixed 26-length frequency array.',
          walkthrough: [
            "Initialize n = s.length() and maxLen = 0.",
            "Iterate outer loop with pointer i from 0 to n - 1 (start of substring).",
            "Initialize freq array of size 26 and maxFreq = 0 for the current starting index.",
            "Iterate inner loop with pointer j from i to n - 1 (end of substring).",
            "Increment frequency of character s.charAt(j) and update maxFreq.",
            "Calculate windowLen = j - i + 1 and replacementsRequired = windowLen - maxFreq.",
            "If replacementsRequired <= k, the substring can be converted into identical characters with <= k replacements, so update maxLen = Math.max(maxLen, windowLen).",
            "Return maxLen after evaluating all substrings."
          ]
        },
        optimal: {
          idea: 'Use sliding window with two pointers (left and right) and a frequency array. Expand right pointer and update maxFreq (the count of the most frequent character in the current window). If (windowLen - maxFreq) > k, the window has more than k non-dominant characters, so shrink from the left until valid. Maintain maxLen.',
          code: `class Solution {
    public int characterReplacement(String s, int k) {
        int n = s.length();
        int freq[] = new int[26];                          // Frequency of uppercase characters in window
        
        int left = 0;
        int right = 0;

        int maxFreq = 0;
        int maxLen = 0;

        while(right < n){
            int currChar = s.charAt(right);
            freq[currChar - 'A']++;

            maxFreq = Math.max(maxFreq, freq[currChar - 'A']); // Track maximum frequency of any character

            while((right - left + 1) - maxFreq > k){       // Invalid window: more than k replacements needed
                freq[s.charAt(left) - 'A']--;
                left++;                                    // Shrink window from left
            }

            maxLen = Math.max(maxLen, right - left + 1);   // Valid window size
            right++;
        }

        return maxLen;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Both right and left pointers traverse the string at most once: O(2n) = O(n)\n• Frequency updates and array operations run in O(1) constant time.\n• Total Time: O(n)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space since frequency array is fixed to 26 uppercase English letters.',
          walkthrough: [
            "Initialize n = s.length(), freq array of size 26, left = 0, right = 0, maxFreq = 0, and maxLen = 0.",
            "While right < n, fetch currChar = s.charAt(right) and increment freq[currChar - 'A'].",
            "Update maxFreq = Math.max(maxFreq, freq[currChar - 'A']).",
            "Check if window is invalid: (right - left + 1) - maxFreq > k. If so, decrement freq[s.charAt(left) - 'A'] and increment left until valid.",
            "Update maxLen = Math.max(maxLen, right - left + 1).",
            "Increment right pointer to continue expanding window.",
            "Return maxLen after right reaches end of string."
          ]
        }
      },
      p('Permutation In String', 'Medium', 'Check if one string\'s permutation is a substring of another.'),
      p('Minimum Window Substring', 'Hard', 'Find minimum window in s that contains all characters of t.'),
      p('Sliding Window Maximum', 'Hard', 'Find the maximum in each sliding window of size k.'),
    ]
  };
