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

    public void generateAns(List<String> ans, String s, int open, int close, int n){
        // Base case: formed a valid string of length 2*n
        if(s.length() == 2*n){
            ans.add(s);
            return;
        }

        // Add '(' only if we have not used all n opening brackets
        if(open < n){
            generateAns(ans, s+"(", open +1, close, n);
        }

        // Add ')' only if it will match an existing unclosed '('
        if(close < open){
            generateAns(ans, s+")", open, close +1, n);
        }
    }
}`,
          time: 'O(4^n / √n)',
          timeDesc: '• The number of valid parentheses combinations is given by the n-th Catalan number: C_n = (1 / (n + 1)) * (2n choose n) ≈ O(4^n / (n^(1.5))).\n• Generating and appending each string takes O(n) time.\n• Total Time: O(4^n / √n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary recursion stack space for maximum depth 2n.',
          walkthrough: [
            "Initialize an empty list ans and call generateAns(ans, \"\", 0, 0, n).",
            "Base condition: if s.length() == 2 * n, a complete valid combination is formed; add s to ans and return.",
            "If open < n: we can safely add an opening bracket '(', increment open by 1, and recurse.",
            "If close < open: we can safely add a closing bracket ')' to pair with an unclosed '(', increment close by 1, and recurse.",
            "Return ans containing all well-formed parentheses combinations."
          ]
        }
      },
      {
        id: 'daily-temperatures',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/description/',
        definition: 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.',
        examples: [
          { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
          { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' },
          { input: 'temperatures = [30,60,90]', output: '[1,1,0]' }
        ],
        brute: {
          idea: 'For each day, look ahead through future days to find the first day with a strictly higher temperature. The difference in indices is the waiting time.',
          code: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int ans[] = new int[n];

        // For each day, look ahead to find the first warmer day
        for(int i=0; i<n; i++){
            for(int j=i+1; j<n; j++){
                if(temperatures[j] > temperatures[i]){
                    ans[i] = j - i;                        // Days waited
                    break;
                }
            }
        }

        return ans;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Outer loop runs n times.\n• For each day i, inner loop can look ahead up to (n - 1 - i) days in the worst case (e.g. strictly decreasing temperatures).\n• Total Time: O(n²)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space (excluding the output array ans).',
          walkthrough: [
            "Initialize n = temperatures.length and an answer array ans of size n initialized to 0.",
            "Outer loop iterates through each day i from 0 to n - 1.",
            "Inner loop looks forward from day j = i + 1 to n - 1.",
            "If temperatures[j] > temperatures[i], a warmer day is found: set ans[i] = j - i and break.",
            "If no warmer day is found, ans[i] remains 0.",
            "Return the ans array."
          ]
        },
        optimal: {
          idea: 'Use a Monotonic Decreasing Stack storing indices. Traversing backwards from right to left: pop indices of temperatures less than or equal to temperatures[i]. If stack is non-empty, stack.peek() is the next warmer day, so ans[i] = stack.peek() - i. Then push current index i.',
          code: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        Stack<Integer> stack = new Stack<>();              // Monotonic stack storing indices

        int n = temperatures.length;
        int ans[] = new int[n];

        // Traverse backwards from right to left
        for(int i=n-1; i>=0; i--){
            // Pop smaller or equal temperatures from stack
            while(!stack.isEmpty() && temperatures[stack.peek()] <= temperatures[i]){
                stack.pop();
            }

            // Next greater element index found at top of stack
            if(!stack.isEmpty()){
                ans[i] = stack.peek() - i;                 // Distance to next warmer day
            }

            stack.push(i);                                 // Push current day index
        }

        return ans;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Each day index is pushed onto the stack exactly once and popped at most once.\n• Across the entire array, at most 2n stack operations occur.\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space for the monotonic stack storing up to n indices.',
          walkthrough: [
            "Initialize an empty Stack<Integer> stack to store day indices and ans[] of size n.",
            "Traverse the temperatures array backwards from right to left (i from n - 1 down to 0).",
            "While stack is not empty and temperatures[stack.peek()] <= temperatures[i], pop from stack to maintain monotonic decreasing order.",
            "If stack is not empty, top of stack is the next warmer day: ans[i] = stack.peek() - i.",
            "Push current index i onto stack.",
            "Return the completed ans array."
          ]
        }
      },
      {
        id: 'car-fleet',
        title: 'Car Fleet',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/car-fleet/description/',
        definition: 'There are n cars at given miles away from the starting mile 0, traveling to reach the mile target. You are given two integer arrays position and speed, both of size n. A car fleet is some non-empty set of cars driving at the same position and same speed. Return the number of car fleets that will arrive at the destination.',
        examples: [
          { input: 'target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]', output: '3', explanation: 'The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet arrives at target (time 1).\nThe car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself (time 12).\nThe cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target (time 7).' },
          { input: 'target = 10, position = [3], speed = [3]', output: '1' },
          { input: 'target = 100, position = [0,2,4], speed = [4,2,1]', output: '1' }
        ],
        brute: {
          idea: 'Calculate time taken by each car to reach target. Sort cars in descending order of starting position. Use a Stack to track fleet lead times: push if current car takes strictly more time than stack top; otherwise it merges into the fleet ahead.',
          code: `class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        double[][] cars = new double[n][2];

        // Store [position, time to reach target]
        for (int i = 0; i < n; i++) {
            cars[i][0] = position[i];
            cars[i][1] = (double) (target - position[i]) / speed[i];
        }

        // Sort positions in descending order
        Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));

        Stack<Double> stack = new Stack<>();

        for (double[] car : cars) {
            double time = car[1];

            // If car takes longer than fleet ahead, it starts a new fleet
            if (stack.isEmpty() || time > stack.peek()) {
                stack.push(time);
            }
        }

        return stack.size();                               // Number of fleets
    }
}`,
          time: 'O(n log n)',
          timeDesc: '• Calculating time for n cars takes O(n).\n• Sorting cars array by position takes O(n log n).\n• Single pass with stack takes O(n).\n• Total Time: O(n log n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space for cars array and stack.',
          walkthrough: [
            "Initialize cars array of size n x 2, where cars[i][0] is position and cars[i][1] is time to target: (target - position[i]) / speed[i].",
            "Sort cars in descending order of position so we process cars closest to target first.",
            "Initialize a Stack<Double> stack.",
            "Iterate through sorted cars: if stack is empty or current car's time > stack.peek(), current car cannot catch up to the fleet ahead and forms a new fleet; push its time onto stack.",
            "Otherwise, if time <= stack.peek(), current car catches up to the fleet ahead and merges with it.",
            "Return stack.size(), which represents the total number of car fleets."
          ]
        },
        optimal: {
          idea: 'Instead of storing fleet times in a stack, keep a single variable prevTime tracking the arrival time of the current fleet leader ahead. If a car takes longer than prevTime, it cannot catch up and forms a new fleet, so increment count and update prevTime.',
          code: `class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        double cars[][] = new double[n][2];

        for(int i=0; i<n; i++){
            cars[i][0] = position[i];                      // Starting position
            cars[i][1] = (double) (target - position[i]) / speed[i]; // Time taken to reach destination
        }

        // Sort positions in descending order (closest to target first)
        Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));

        int count = 0;
        double prevTime = 0;                               // Arrival time of current fleet leader

        for(double car[] : cars){
            // If car takes more time, it cannot catch up and forms a new fleet
            if(car[1] > prevTime){
                count++;
                prevTime = car[1];                         // Update new fleet bottleneck time
            }
        }

        return count;
    }
}`,
          time: 'O(n log n)',
          timeDesc: '• Calculating arrival times takes O(n).\n• Sorting cars array by starting position takes O(n log n).\n• Linear scan to count fleets takes O(n).\n• Total Time: O(n log n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary space to store cars pairs [position, time]; O(1) extra space during traversal without needing a stack.',
          walkthrough: [
            "Create a 2D array cars of size n x 2 to store position and time to reach target: (target - position[i]) / speed[i].",
            "Sort cars in descending order of starting position.",
            "Initialize count = 0 and prevTime = 0 to track the bottleneck arrival time of the current fleet leader ahead.",
            "Iterate through cars: if car[1] > prevTime, this car takes longer than the fleet ahead, so it cannot catch up and forms a new fleet. Increment count and update prevTime = car[1].",
            "If car[1] <= prevTime, the car catches up before the target and joins the existing fleet.",
            "Return count."
          ]
        }
      },
      p('Largest Rectangle In Histogram', 'Hard', 'Find the largest rectangular area in a histogram.'),
    ]
  };
