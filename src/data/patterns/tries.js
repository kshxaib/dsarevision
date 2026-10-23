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
    p('Design Add and Search Words Data Structure', 'Medium', 'Trie supporting wildcard "." character search.'),
    p('Word Search II', 'Hard', 'Find all words from a dictionary that exist in a 2D board.')
  ]
};
