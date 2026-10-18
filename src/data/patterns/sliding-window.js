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
      {
        id: 'permutation-in-string',
        title: 'Permutation in String',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/permutation-in-string/description/',
        definition: 'Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1\'s permutations is the substring of s2.',
        examples: [
          { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true', explanation: 's2 contains one permutation of s1 ("ba").' },
          { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false', explanation: 'None of s1\'s permutations ("ab", "ba") exist as a substring in s2.' }
        ],
        brute: {
          idea: 'Generate all permutations of s1 recursively. For each complete permutation string ans, check if s2 contains it using s2.contains(ans). If any permutation is found in s2, return true. If all permutations are checked without a match, return false.',
          code: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if(s1.length() > s2.length()){
            return false;
        }

        return permute(s1, s2, "");
    }

    private boolean permute(String s1, String s2, String ans){
        if(s1.length() == 0){                              // Base case: full permutation formed
            return s2.contains(ans);                       // Check if s2 contains this permutation
        }

        for(int i=0; i<s1.length(); i++){
            char ch = s1.charAt(i);

            String remaining = s1.substring(0, i) + s1.substring(i+1, s1.length());

            if(permute(remaining, s2, ans + ch)){          // Recursive call with chosen char appended
                return true;
            }
        }

        return false;
    }
}`,
          time: 'O(n! * m)',
          timeDesc: '• Generating all permutations of s1 (length n) takes O(n!) recursive calls.\n• For each permutation, s2.contains(ans) takes O(m) substring search time where m is length of s2.\n• Total Time: O(n! * m)',
          space: 'O(n)',
          spaceDesc: 'O(n) recursion stack depth and substring allocations for permutations of length n.',
          walkthrough: [
            "Check base condition: if s1.length() > s2.length(), return false immediately.",
            "Call helper method permute(s1, s2, \"\").",
            "In permute, if s1 is empty (length == 0), check whether s2 contains the accumulated permutation string ans using s2.contains(ans).",
            "Otherwise, loop through characters of s1 at index i.",
            "Extract character ch = s1.charAt(i) and form remaining string by excluding index i.",
            "Recursively call permute(remaining, s2, ans + ch). If any branch returns true, propagate true upwards.",
            "If no permutation matches any substring of s2, return false."
          ]
        },
        optimal: {
          idea: 'A substring of s2 is a permutation of s1 if and only if both have the same length and identical character frequency counts. Use a fixed-size sliding window of length s1.length() over s2. Maintain two 26-size frequency arrays (s1Map and s2Map). Slide the window across s2 by adding the new character and removing the outgoing character, checking for matching frequency maps at each step.',
          code: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if(s1.length() > s2.length()){
            return false;
        }

        int s1Map[] = new int[26];
        int s2Map[] = new int[26];

        // Initializing the freq maps for s1 and the first window of s2
        for(int i=0; i<s1.length(); i++){
            s1Map[s1.charAt(i) - 'a']++;
            s2Map[s2.charAt(i) - 'a']++;
        }

        // Slide the window through s2
        for(int i=0; i<s2.length() - s1.length(); i++){
            if(matches(s1Map, s2Map)){
                return true;
            }

            s2Map[s2.charAt(i) - 'a']--;                   // Remove old char leaving the window
            s2Map[s2.charAt(i + s1.length()) - 'a']++;     // Add next char entering the window
        }

        return matches(s1Map, s2Map);                      // Check the final window
    }

    private boolean matches(int s1Map[], int s2Map[]){
        for(int i=0; i<26; i++){
            if(s1Map[i] != s2Map[i]){
                return false;
            }
        }

        return true;
    }
}`,
          time: 'O(m * 26) = O(m)',
          timeDesc: '• Initializing the first window of size n = s1.length() takes O(n).\n• Sliding the window over (m - n) positions and comparing two 26-length arrays takes O((m - n) * 26) time.\n• Total Time: O(26 * m) = O(m) where m is length of s2.',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space for two fixed-size frequency arrays of size 26.',
          walkthrough: [
            "If s1.length() > s2.length(), return false.",
            "Initialize two integer arrays s1Map and s2Map of size 26 for lowercase English letters.",
            "Populate s1Map with character counts of s1, and s2Map with character counts of the first window of s2 (from index 0 to s1.length() - 1).",
            "Loop i from 0 to s2.length() - s1.length() - 1 to slide the window:",
            "If matches(s1Map, s2Map) is true, return true as a valid permutation substring was found.",
            "Otherwise slide window: decrement count of s2.charAt(i) (outgoing character) and increment count of s2.charAt(i + s1.length()) (incoming character).",
            "After the loop finishes, check the last window with matches(s1Map, s2Map) and return the result."
          ]
        }
      },
      {
        id: 'minimum-window-substring',
        title: 'Minimum Window Substring',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/description/',
        definition: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".',
        examples: [
          { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.' },
          { input: 's = "a", t = "a"', output: '"a"', explanation: 'The entire string s is the minimum window.' },
          { input: 's = "a", t = "aa"', output: '""', explanation: 'Both \'a\'s from t must be included in the window. Since the largest window of s only has one \'a\', return empty string.' }
        ],
        brute: {
          idea: 'Generate all possible substrings of s using nested loops. For each substring sub, check if it contains all characters of t (accounting for frequencies) using a 256-size ASCII frequency array. Keep track of the substring with minimum length.',
          code: `class Solution {
    public String minWindow(String s, String t) {
        int n = s.length();
        int minLen = Integer.MAX_VALUE;
        String result = "";

        for(int i=0; i<n; i++){
            for(int j=i; j<n; j++){

                String sub = s.substring(i, j+1);

                if(containsAll(sub, t)){
                    int len = j - i + 1;

                    if(len < minLen){
                        minLen = len;
                        result = sub;
                    }

                    break;                         // Substrings starting at i beyond j will only be longer
                }
            }
        }

        return result;
    }

    private boolean containsAll(String sub, String t){
        int freq[] = new int[256];

        for(int i=0; i<t.length(); i++){
            freq[t.charAt(i)]++;                   // Count required characters in t
        }

        for(int i=0; i<sub.length(); i++){
            freq[sub.charAt(i)]--;                 // Consume characters from sub
        }

        for(int count : freq){
            if(count > 0){                         // Missing required character
                return false;
            }
        }

        return true;
    }
}`,
          time: 'O(n³)',
          timeDesc: '• Outer loops generate O(n²) substrings.\n• For each substring, substring extraction and containsAll check take O(n + |t|) time.\n• Total Time: O(n³ + n² * |t|)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space to store candidate substring sub and fixed 256-size frequency array.',
          walkthrough: [
            "Initialize n = s.length(), minLen = Integer.MAX_VALUE, and result = \"\".",
            "Outer loop iterates with start index i from 0 to n - 1.",
            "Inner loop iterates with end index j from i to n - 1, creating substring sub = s.substring(i, j + 1).",
            "Helper containsAll counts frequencies of characters in t and decrements using sub. If all required counts in freq <= 0, sub contains all characters of t.",
            "If containsAll(sub, t) is true: calculate len = j - i + 1. If len < minLen, update minLen = len and result = sub.",
            "Break inner loop since extending j further will only yield longer substrings starting at i.",
            "After all substrings are tested, return result."
          ]
        },
        optimal: {
          idea: 'Use sliding window with two pointers (left and right) and a 256-size frequency map hash[]. Prepopulate hash[] with characters of t. Expand right: decrement hash[rightChar] and increment count if rightChar was needed (> 0). When count == t.length(), all characters are matched: update minLen and startingIdx, then shrink window from left by incrementing hash[leftChar] and decrementing count if an essential character leaves.',
          code: `class Solution {
    public String minWindow(String s, String t) {
        int n = s.length();
        int minLen = Integer.MAX_VALUE;
        int startingIdx = -1;

        int hash[] = new int[256];                         // Frequency of characters needed from t
        int count = 0;                                     // Count of matched characters

        int left = 0;
        int right = 0;

        for (int i = 0; i < t.length(); i++) {
            hash[t.charAt(i)]++;
        }

        while(right < n){
            char rightChar = s.charAt(right);

            if(hash[rightChar] > 0){                       // Character is needed from t
                count++;
            }
            hash[rightChar]--;

            while(count == t.length()){                    // Valid window: contains all characters of t
                int len = right - left + 1;
                if(len < minLen){
                    minLen = len;
                    startingIdx = left;
                }

                char leftChar = s.charAt(left);
                hash[leftChar]++;

                if(hash[leftChar] > 0){                    // Removing an essential character from window
                    count--;
                }

                left++;                                    // Shrink window from left
            }

            right++;
        }

        if(startingIdx == -1) return "";
        return s.substring(startingIdx, startingIdx + minLen);
    }
}`,
          time: 'O(m + n)',
          timeDesc: '• Counting characters in t takes O(|t|).\n• Both left and right pointers traverse s at most once, and each character is processed at most twice: O(2 * |s|).\n• Total Time: O(|s| + |t|)',
          space: 'O(1)',
          spaceDesc: 'O(1) constant auxiliary space for fixed 256-size ASCII frequency array.',
          walkthrough: [
            "Initialize n = s.length(), minLen = Integer.MAX_VALUE, startingIdx = -1, and hash[] of size 256.",
            "Populate hash[] with character frequencies of t.",
            "Initialize count = 0, left = 0, and right = 0.",
            "While right < n: if hash[s.charAt(right)] > 0, increment count. Decrement hash[s.charAt(right)].",
            "While count == t.length() (valid window containing all chars of t):",
            "Calculate current window length right - left + 1. If smaller than minLen, update minLen and startingIdx = left.",
            "Contract window from left: increment hash[s.charAt(left)]. If hash[s.charAt(left)] > 0, decrement count as a required character is no longer satisfied.",
            "Increment left to continue shrinking window.",
            "Increment right to continue expanding window.",
            "Return empty string if startingIdx == -1, else return s.substring(startingIdx, startingIdx + minLen)."
          ]
        }
      },
      {
        id: 'sliding-window-maximum',
        title: 'Sliding Window Maximum',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/description/',
        definition: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.',
        examples: [
          { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]', explanation: 'Window positions and max:\n[1  3  -1] -3  5  3  6  7 -> 3\n 1 [3  -1  -3] 5  3  6  7 -> 3\n 1  3 [-1  -3  5] 3  6  7 -> 5\n 1  3  -1 [-3  5  3] 6  7 -> 5\n 1  3  -1  -3 [5  3  6] 7 -> 6\n 1  3  -1  -3  5 [3  6  7] -> 7' },
          { input: 'nums = [1], k = 1', output: '[1]' }
        ],
        brute: {
          idea: 'For every starting index i from 0 to n - k, iterate through the window of size k (from index i to i + k - 1) and find the maximum element. Store the maximum in ans[i].',
          code: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int ans[] = new int[n - k +1];

        for(int i=0; i <= n-k; i++){
            int max = Integer.MIN_VALUE;

            for(int j=i; j < i+k; j++){
                max = Math.max(max, nums[j]);
            }

            ans[i] = max;
        }

        return ans;
    }
}`,
          time: 'O((n - k + 1) * k)',
          timeDesc: '• Total of (n - k + 1) sliding windows.\n• In each window, scanning k elements takes O(k) time.\n• Total Time: O((n - k + 1) * k) = O(n * k)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space (excluding the output array ans of size n - k + 1).',
          walkthrough: [
            "Initialize n = nums.length and allocate result array ans of size n - k + 1.",
            "Outer loop iterates start index i from 0 to n - k.",
            "Initialize max = Integer.MIN_VALUE.",
            "Inner loop iterates j from i to i + k - 1 to inspect each element in the current window of size k.",
            "Update max = Math.max(max, nums[j]).",
            "Set ans[i] = max.",
            "After all windows are processed, return ans."
          ]
        },
        optimal: {
          idea: 'Use a monotonic decreasing Deque storing indices. Elements in the deque are kept in strictly decreasing order of their values: smaller elements at the back are popped before adding nums[i]. For sliding: discard indices that fall outside the current window (deque.peekFirst() <= i - k). The maximum of the current window is always at the front: nums[deque.peekFirst()].',
          code: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        Deque<Integer> deque = new ArrayDeque<>();
        int ans[] = new int[n - k + 1];

        for(int i=0; i<k; i++){
            while(!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]){
                deque.pollLast();
            }
            deque.offerLast(i);
        }
        ans[0] = nums[deque.peekFirst()];

        for(int i=k; i<n; i++){
            if(deque.peekFirst() <= i-k){
                deque.pollFirst();
            }

            while(!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]){
                deque.pollLast();
            }
            deque.offerLast(i);

            ans[i-k +1] = nums[deque.peekFirst()];
        }

        return ans;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Each element index is added to the deque exactly once and removed from the deque at most once (via pollFirst or pollLast).\n• Total deque operations across all iterations are at most 2n: O(n).\n• Total Time: O(n)',
          space: 'O(k)',
          spaceDesc: 'O(k) auxiliary space for the deque storing at most k indices at any time.',
          walkthrough: [
            "Initialize n = nums.length, ArrayDeque<Integer> deque to store indices, and ans[] of size n - k + 1.",
            "Process first window (i from 0 to k - 1): pop from back while nums[deque.peekLast()] <= nums[i], then offerLast(i).",
            "Set ans[0] = nums[deque.peekFirst()] (the largest element in the first window).",
            "Loop through remaining elements i from k to n - 1:",
            "If the front index deque.peekFirst() <= i - k, it is out of the current window; remove it via deque.pollFirst().",
            "While deque is not empty and nums[deque.peekLast()] <= nums[i], pop from back (deque.pollLast()) to maintain monotonic decreasing order.",
            "Add current index i to the back (deque.offerLast(i)).",
            "Record current window maximum at ans[i - k + 1] = nums[deque.peekFirst()].",
            "Return result array ans."
          ]
        }
      }
    ]
  };
