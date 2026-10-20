import { p } from '../helper.js';

export const stack = {
    id: 'stack',
    name: 'Stack',
    icon: '📚',
    timestamp: '4:59:44',
    problems: [
      {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/description/',
        definition: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets, in the correct order, and every close bracket has a corresponding open bracket.',
        examples: [
          { input: 's = "()"', output: 'true' },
          { input: 's = "()[]{}"', output: 'true' },
          { input: 's = "(]"', output: 'false' },
          { input: 's = "([])"', output: 'true' }
        ],
        brute: {
          idea: 'Repeatedly replace adjacent matching pairs "()", "{}", and "[]" with empty strings until no more matching pairs are found. If the string becomes empty, the parentheses are valid.',
          code: `class Solution {
    public boolean isValid(String s) {
        // Repeatedly eliminate adjacent matching bracket pairs
        while (s.contains("()") || s.contains("{}") || s.contains("[]")) {
            s = s.replace("()", "")
                 .replace("{}", "")
                 .replace("[]", "");
        }

        return s.isEmpty();                                // True if all pairs were matched & removed
    }
}`,
          time: 'O(n²)',
          timeDesc: '• In the worst case (e.g. "((((...))))"), each replacement scan takes O(n) and runs up to n/2 times.\n• Total Time: O(n²)',
          space: 'O(n²)',
          spaceDesc: 'O(n) auxiliary space per replacement iteration to create new string copies.',
          walkthrough: [
            "Check if the string contains any adjacent matching pair: '()', '{}', or '[]'.",
            "While any of these pairs exist, replace all occurrences of '()', '{}', and '[]' with empty strings.",
            "Once no more matching pairs exist, check if the string is empty.",
            "Return true if s is empty (all brackets matched and eliminated), otherwise false."
          ]
        },
        optimal: {
          idea: 'Use a Stack to keep track of opening brackets. When a closing bracket is encountered, verify that the stack is non-empty and the top of the stack has the matching opening bracket, then pop it. At the end, the stack must be empty.',
          code: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();            // Stores opening brackets

        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);

            // Push opening brackets onto the stack
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.push(ch);
            } 
            else {
                // Closing bracket with empty stack -> invalid
                if (stack.isEmpty()) return false;

                char top = stack.peek();

                // If top matches current closing bracket, pop it
                if ((ch == ')' && top == '(') || (ch == '}' && top == '{') || (ch == ']' && top == '[')){
                    stack.pop();
                } else {
                    return false;                          // Mismatched bracket types
                }
            }
        }

        return stack.isEmpty();                            // True if all opened brackets were closed
    }
}`,
          time: 'O(n)',
          timeDesc: '• Iterate through the string of length n once.\n• Push, peek, and pop operations on the stack take O(1) time each.\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space for the stack in the worst case where all characters are opening brackets (e.g., "((((").',
          walkthrough: [
            "Initialize an empty Stack<Character> stack to track opening brackets.",
            "Loop through each character ch in string s from index 0 to s.length() - 1.",
            "If ch is an opening bracket ('(', '{', '['), push it onto the stack.",
            "Otherwise, ch is a closing bracket: check if the stack is empty (no matching opener) — if so, return false.",
            "Peek the top character from the stack. If ch matches top ('(' with ')', '{' with '}', '[' with ']'), pop the top element.",
            "If characters do not match, return false immediately.",
            "After traversing the entire string, return stack.isEmpty() (true if all brackets were properly matched and closed)."
          ]
        }
      },
      p('Min Stack', 'Medium', 'Design a stack that supports push, pop, top, and getMin in O(1).'),
      p('Evaluate Reverse Polish Notation', 'Medium', 'Evaluate an arithmetic expression in Reverse Polish Notation.'),
      p('Generate Parentheses', 'Medium', 'Generate all valid combinations of n pairs of parentheses.'),
      p('Daily Temperatures', 'Medium', 'Find number of days until a warmer temperature for each day.'),
      p('Car Fleet', 'Medium', 'Determine the number of car fleets that arrive at the destination.'),
      p('Largest Rectangle In Histogram', 'Hard', 'Find the largest rectangular area in a histogram.'),
    ]
  };
