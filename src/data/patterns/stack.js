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
      {
        id: 'min-stack',
        title: 'Min Stack',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/min-stack/description/',
        definition: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1). Implement the MinStack class with push(val), pop(), top(), and getMin() methods.',
        examples: [
          {
            input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
            output: '[null,null,null,null,-3,null,0,-2]',
            explanation: 'MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2'
          }
        ],
        brute: {
          idea: 'Use a single standard Stack. For push, pop, and top, perform standard O(1) stack operations. For getMin, iterate through the stack to find the minimum value in O(n) time.',
          code: `class MinStack {
    Stack<Integer> stack;

    public MinStack() {
        stack = new Stack<>();
    }
    
    public void push(int val) {
        stack.push(val);                                   // O(1) push
    }
    
    public void pop() {
        stack.pop();                                       // O(1) pop
    }
    
    public int top() {
        return stack.peek();                               // O(1) top
    }
    
    public int getMin() {
        int min = Integer.MAX_VALUE;
        for (int val : stack) {                            // Scan all elements: O(n)
            min = Math.min(min, val);
        }
        return min;
    }
}`,
          time: 'O(1) push/pop/top, O(n) getMin',
          timeDesc: '• push, pop, and top take O(1) constant time.\n• getMin iterates through all elements currently in the stack: O(n) time.',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space to store n elements in a single stack.',
          walkthrough: [
            "Initialize a single Stack<Integer> stack.",
            "push(val): Push val onto the stack directly in O(1).",
            "pop(): Pop the top element from the stack in O(1).",
            "top(): Return stack.peek() in O(1).",
            "getMin(): Initialize min = Integer.MAX_VALUE, loop through all elements in stack, and return the minimum value found."
          ]
        },
        optimal: {
          idea: 'Use two stacks: a primary stack for all elements and an auxiliary minStack to track minimum values. Only push to minStack if val <= current minimum. On pop, if top of minStack equals top of stack, pop from minStack as well. This guarantees O(1) for all operations.',
          code: `class MinStack {
    Stack<Integer> stack;
    Stack<Integer> minStack;                               // Tracks minimum elements

    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }
    
    public void push(int val) {
        stack.push(val);

        // Push to minStack if empty or val is <= current minimum
        if(minStack.isEmpty() || val <= minStack.peek()){
            minStack.push(val);
        }
    }
    
    public void pop() {
        // Use .equals() for Integer object value comparison
        if (minStack.peek().equals(stack.peek())) {
            minStack.pop();
        }
        stack.pop();
    }
    
    public int top() {
        return stack.peek();                               // Top of main stack
    }
    
    public int getMin() {
        return minStack.peek();                            // Current minimum in O(1)
    }
}`,
          time: 'O(1) for all operations',
          timeDesc: '• push, pop, top, and getMin all run in O(1) constant time.',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space for stack and minStack in the worst case (strictly non-increasing inputs).',
          walkthrough: [
            "Initialize two stacks: stack for all values, and minStack for minimums.",
            "push(val): Push val onto stack. If minStack is empty or val <= minStack.peek(), also push val onto minStack.",
            "pop(): If minStack.peek().equals(stack.peek()), pop from minStack. Then pop from stack.",
            "top(): Return stack.peek() in O(1).",
            "getMin(): Return minStack.peek() in O(1)."
          ]
        }
      },
      {
        id: 'evaluate-reverse-polish-notation',
        title: 'Evaluate Reverse Polish Notation',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/description/',
        definition: 'You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation. Evaluate the expression and return an integer that represents the value of the expression. Valid operators are "+", "-", "*", and "/". Each operand may be an integer or another expression.',
        examples: [
          { input: 'tokens = ["2","1","+","3","*"]', output: '9', explanation: '((2 + 1) * 3) = 9' },
          { input: 'tokens = ["4","13","5","/","+"]', output: '6', explanation: '(4 + (13 / 5)) = 6' },
          { input: 'tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]', output: '22' }
        ],
        optimal: {
          idea: 'Use a Stack to evaluate RPN. Iterate through tokens: if the token is an operand, push it onto the stack. If it is an operator, pop the top two operands (second operand b, then first operand a), apply the operation (a op b), and push the result back onto the stack. The final answer will be at the top of the stack.',
          code: `class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();              // Holds operands

        for(String token : tokens){
            // If operator: pop operands (b first, then a), apply operation, push result
            if(token.equals("+") || token.equals("-") || token.equals("/") || token.equals("*")){
                int b = stack.pop();                       // Second operand
                int a = stack.pop();                       // First operand

                int val = operate(a, b, token);
                stack.push(val);                           // Push evaluated result back
            } else {
                stack.push(Integer.parseInt(token));       // Operand: parse and push
            }
        }

        return stack.peek();                               // Final evaluated expression result
    }

    private int operate(int a, int b, String operator){
        if(operator.equals("+")){
            return a + b;
        } else if (operator.equals("-")){
            return a - b;
        } else if(operator.equals("*")) {
            return a * b;
        } else {
            return a / b;
        }
    }
}`,
          time: 'O(n)',
          timeDesc: '• Iterate through all n tokens once.\n• Stack push and pop operations take O(1) time.\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space for the stack storing operands.',
          walkthrough: [
            "Initialize an empty Stack<Integer> stack to store operands.",
            "Iterate through each token in tokens:",
            "If token is an operator ('+', '-', '*', '/'): pop the top two numbers from stack as b (second operand) and a (first operand).",
            "Calculate val = operate(a, b, token) and push the evaluated result onto stack.",
            "If token is a number: parse it with Integer.parseInt(token) and push onto stack.",
            "After processing all tokens, return stack.peek() as the evaluated result."
          ]
        }
      },
      p('Generate Parentheses', 'Medium', 'Generate all valid combinations of n pairs of parentheses.'),
      p('Daily Temperatures', 'Medium', 'Find number of days until a warmer temperature for each day.'),
      p('Car Fleet', 'Medium', 'Determine the number of car fleets that arrive at the destination.'),
      p('Largest Rectangle In Histogram', 'Hard', 'Find the largest rectangular area in a histogram.'),
    ]
  };
