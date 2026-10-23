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
    p('Word Search II', 'Hard', 'Find all words from a dictionary that exist in a 2D board.')
  ]
};
