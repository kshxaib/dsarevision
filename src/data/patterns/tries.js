import { p } from '../helper.js';

export const tries = {
  id: 'tries',
  name: 'Tries',
  icon: '🔤',
  problems: [
    {
      id: 'implement-trie-prefix-tree',
      title: 'Implement Trie (Prefix Tree)',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/description/',
      youtubeUrl: 'https://www.youtube.com/watch?v=dBGUmUQhjaM',
      definition: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class with insert, search, and startsWith methods.',
      examples: [
        {
          input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]',
          output: '[null, null, true, false, true, null, true]',
          explanation: 'Trie trie = new Trie();\ntrie.insert("apple");\ntrie.search("apple");   // returns true\ntrie.search("app");     // returns false\ntrie.startsWith("app"); // returns true\ntrie.insert("app");\ntrie.search("app");     // returns true'
        }
      ],
      optimal: {
        idea: 'Use an array of 26 TrieNode pointers (for lowercase English letters a-z) and a boolean isEnd flag. For insert and search, traverse down char by char using index = ch - \'a\'. In search, ensure curr.isEnd is true. In startsWith, simply verify the path exists.',
        code: `class Trie {
    class TrieNode {
        TrieNode children[];
        boolean isEnd;

        TrieNode() {
            children = new TrieNode[26];
            isEnd = false;
        }
    }

    TrieNode root;

    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode curr = root;

        for (char ch : word.toCharArray()) {
            int index = ch - 'a';

            if (curr.children[index] == null) {
                curr.children[index] = new TrieNode();
            }

            curr = curr.children[index];
        }

        curr.isEnd = true;
    }
    
    public boolean search(String word) {
        TrieNode curr = root;

        for (char ch : word.toCharArray()) {
            int index = ch - 'a';

            if (curr.children[index] == null) {
                return false;
            }

            curr = curr.children[index];
        }

        return curr.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        TrieNode curr = root;

        for (char ch : prefix.toCharArray()) {
            int index = ch - 'a';

            if (curr.children[index] == null) {
                return false;
            }

            curr = curr.children[index];
        }

        return true;
    }
}`,
        time: 'O(m) per operation',
        timeDesc: '• insert(word): O(m) where m is the word length.\n• search(word): O(m) where m is the word length.\n• startsWith(prefix): O(p) where p is the prefix length.',
        space: 'O(N * m * 26)',
        spaceDesc: 'O(N * m) in the worst case where N is the number of inserted keys and m is the average key length, with each node allocating an array of size 26.',
        walkthrough: [
          'Create a TrieNode inner class containing TrieNode children[26] and boolean isEnd.',
          'Initialize root as an empty TrieNode in the Trie constructor.',
          'insert(word): Traverse from root character by character. If curr.children[ch - \'a\'] is null, instantiate a new TrieNode. Move curr down. Set curr.isEnd = true at the end.',
          'search(word): Traverse character by character. If any child is null, return false. Return curr.isEnd once traversal finishes.',
          'startsWith(prefix): Traverse prefix character by character. If any child is null, return false. Return true if all prefix characters exist.'
        ]
      }
    },
    {
      id: 'design-add-and-search-words-data-structure',
      title: 'Design Add and Search Words Data Structure',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/description/',
      youtubeUrl: 'https://www.youtube.com/watch?v=wyUO7Oq9uS4',
      definition: 'Design a data structure that supports adding new words and finding if a string matches any previously added string. Implement the WordDictionary class with addWord and search methods. The search string may contain dots \'.\' where dots can match any letter.',
      examples: [
        {
          input: '["WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search"]\n[[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]]',
          output: '[null, null, null, null, false, true, true, true]',
          explanation: 'WordDictionary wordDictionary = new WordDictionary();\nwordDictionary.addWord("bad");\nwordDictionary.addWord("dad");\nwordDictionary.addWord("mad");\nwordDictionary.search("pad"); // return False\nwordDictionary.search("bad"); // return True\nwordDictionary.search(".ad"); // return True\nwordDictionary.search("b.."); // return True'
        }
      ],
      optimal: {
        idea: 'Store words in a standard 26-ary Trie. For addWord, traverse down and set isEnd = true. For search, if a character is a wildcard \'.\', branch out across all 26 non-null child nodes and recursively search word.substring(i + 1). If any branch returns true, return true; otherwise return false.',
        code: `class WordDictionary {
    class TrieNode {
        TrieNode children[];
        boolean isEnd;

        public TrieNode() {
            children = new TrieNode[26];
            isEnd = false;
        }
    }

    TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }
    
    public void addWord(String word) {
        TrieNode curr = root;

        for (char ch : word.toCharArray()) {
            int index = ch - 'a';

            if (curr.children[index] == null) {
                curr.children[index] = new TrieNode();
            }

            curr = curr.children[index];
        }

        curr.isEnd = true;        
    }
    
    public boolean search(String word) {
        return searchUtil(root, word);
    }

    public boolean searchUtil(TrieNode root, String word) {
        TrieNode curr = root;

        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);

            if (ch == '.') {
                for (int j = 0; j < 26; j++) {
                    if (curr.children[j] != null) {
                        if (searchUtil(curr.children[j], word.substring(i + 1))) {
                            return true;
                        }
                    }
                }
                return false;
            }

            int index = ch - 'a';

            if (curr.children[index] == null) {
                return false;
            }

            curr = curr.children[index];
        }

        return curr.isEnd;
    }
}`,
        time: 'addWord: O(m), search: O(26^m) worst case',
        timeDesc: '• addWord(word): O(m) where m is word length.\n• search(word): O(m) for words without wildcards; up to O(26^m) in worst-case with multiple \'.\' wildcards branching through all 26 children.',
        space: 'O(N * m * 26) + O(m) recursion stack',
        spaceDesc: 'O(N * m) worst-case storage in the Trie for N words of length m, plus O(m) call stack depth for recursive DFS during wildcard matching.',
        walkthrough: [
          'Create a TrieNode inner class with TrieNode children[26] and boolean isEnd.',
          'Initialize root in the WordDictionary constructor.',
          'addWord(word): Standard Trie insert character-by-character; set curr.isEnd = true on the final node.',
          'search(word): Delegate to recursive helper searchUtil(root, word).',
          'searchUtil(root, word): For each character at index i, if ch == \'.\', loop through all non-null children[0..25] and recursively call searchUtil(child, word.substring(i + 1)). If any returns true, return true; otherwise return false.',
          'For standard characters, compute index = ch - \'a\'. If child is null, return false. After loop finishes, return curr.isEnd.'
        ]
      }
    },
    {
      id: 'word-search-ii',
      title: 'Word Search II',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/description/',
      youtubeUrl: 'https://www.youtube.com/watch?v=DMP2bqW6URA',
      definition: 'Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.',
      examples: [
        {
          input: 'board = [\n  ["o","a","a","n"],\n  ["e","t","a","e"],\n  ["i","h","k","r"],\n  ["i","f","l","v"]\n],\nwords = ["oath","pea","eat","rain"]',
          output: '["eat","oath"]',
          explanation: 'Both "eat" and "oath" can be constructed by sequentially neighboring cells on the board.'
        },
        {
          input: 'board = [\n  ["a","b"],\n  ["c","d"]\n],\nwords = ["abcb"]',
          output: '[]',
          explanation: 'The same cell cannot be reused, so "abcb" cannot be formed.'
        }
      ],
      optimal: {
        idea: 'Insert all dictionary words into a Trie, storing the full word at each leaf node (curr.word). Then, run a 4-directional DFS backtracking search across the grid starting at any cell whose character matches a root child in the Trie. Marking visited cells with "#" prevents revisiting cells in the current path. When curr.isEnd is true, add the word to ans and set curr.isEnd = false to prevent duplicate entries.',
        code: `class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        int n = board.length;
        int m = board[0].length;

        List<String> ans = new ArrayList<>();

        for (String word : words) {
            insert(word);
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                int index = board[i][j] - 'a';

                if (root.children[index] != null) {
                    TrieNode curr = root;
                    findWord(board, i, j, curr, ans);
                }
            }
        }

        return ans;
    }

    public void findWord(char board[][], int i, int j, TrieNode curr, List<String> ans) {
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
            return;
        }

        if (board[i][j] == '#' || curr.children[board[i][j] - 'a'] == null) {
            return;
        }

        curr = curr.children[board[i][j] - 'a'];

        if (curr.isEnd == true) {
            ans.add(curr.word);
            curr.isEnd = false;
        }

        char temp = board[i][j];
        board[i][j] = '#';

        findWord(board, i + 1, j, curr, ans);
        findWord(board, i - 1, j, curr, ans);
        findWord(board, i, j + 1, curr, ans);
        findWord(board, i, j - 1, curr, ans);

        board[i][j] = temp;
    }

    class TrieNode {
        TrieNode children[];
        boolean isEnd;
        String word;

        TrieNode() {
            children = new TrieNode[26];
            isEnd = false;
            word = "";
        }
    }

    TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode curr = root;

        for (char ch : word.toCharArray()) {
            int index = ch - 'a';

            if (curr.children[index] == null) {
                curr.children[index] = new TrieNode();
            }

            curr = curr.children[index];
        }

        curr.word = word;
        curr.isEnd = true;
    }
}`,
        time: 'O(M * N * 4 * 3^(L-1) + W * L)',
        timeDesc: '• Trie Building: O(W * L) where W is the number of words and L is the maximum word length.\n• Backtracking Search: From each cell (M * N), DFS explores up to 4 directions initially and 3 thereafter up to depth L, heavily pruned by Trie branches.',
        space: 'O(W * L + L)',
        spaceDesc: '• O(W * L) space in the Trie to store all dictionary words.\n• O(L) space for the recursive call stack during DFS backtracking (bounded by the max word length L).',
        walkthrough: [
          'Design TrieNode with children[26], boolean isEnd, and String word so matched words can be directly retrieved at the leaf without rebuilding the string.',
          'insert(word): Standard Trie insertion; on the terminal node, store curr.word = word and curr.isEnd = true.',
          'In findWords(), insert all words into the Trie. Then scan every cell (i, j) on the grid.',
          'If root.children[board[i][j] - \'a\'] is not null, start findWord(board, i, j, root, ans).',
          'In findWord(): Check boundaries and visited status (#). If curr.children[ch - \'a\'] is null, prune and backtrack immediately.',
          'Advance curr down to curr.children[ch - \'a\']. If curr.isEnd is true, add curr.word to ans and set curr.isEnd = false to avoid duplicate word additions.',
          'Mark board[i][j] = \'#\', recurse into all 4 neighboring cells (up, down, left, right), and backtrack by restoring board[i][j] = temp.'
        ]
      }
    }
  ]
};
