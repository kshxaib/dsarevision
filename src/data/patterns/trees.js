import { p } from '../helper.js';

export const trees = {
    id: 'trees',
    name: 'Trees',
    icon: '🌲',
    problems: [
      {
        id: 'invert-binary-tree',
        title: 'Invert Binary Tree',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/description/',
        definition: 'Given the root of a binary tree, invert the tree, and return its root.',
        examples: [
          { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
          { input: 'root = [2,1,3]', output: '[2,3,1]' },
          { input: 'root = []', output: '[]' }
        ],
        brute: {
          idea: 'Recursive traversal (DFS):\n\n• Recursively invert left and right subtrees.\n• Swap root.left with root.right.\n• Base case: Return null if root is null.',
          code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if(root == null){
            return null;
        }        

        // Recursively invert left and right subtrees
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);

        // Swap children
        root.left = right;
        root.right = left;

        return root;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Visits every node in the binary tree exactly once.\n• Total Time: O(n)',
          space: 'O(h)',
          spaceDesc: 'O(h) call stack memory where h is tree height (O(log n) balanced, O(n) worst case).',
          walkthrough: [
            "Base case: If root == null, return null.",
            "Recursively invert left child: left = invertTree(root.left).",
            "Recursively invert right child: right = invertTree(root.right).",
            "Swap pointers: root.left = right and root.right = left.",
            "Return root."
          ]
        },
        optimal: {
          idea: 'Iterative BFS traversal using a Queue:\n\n• Push root into queue.\n• For each node polled, swap its left and right children.\n• Offer non-null children into queue and repeat.',
          code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if(root == null){
            return null;
        }        

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        // Level-order traversal swapping children
        while(!queue.isEmpty()){
            TreeNode curr = queue.poll();

            // Swap left and right children
            TreeNode temp = curr.left;
            curr.left = curr.right;
            curr.right = temp;

            if(curr.left != null){
                queue.offer(curr.left);
            }

            if(curr.right != null){
                queue.offer(curr.right);
            }
        }

        return root;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Every node is offered and polled from the queue exactly once.\n• Total Time: O(n)',
          space: 'O(w)',
          spaceDesc: 'O(w) space for the queue where w is maximum width of tree (up to n/2 in complete tree).',
          walkthrough: [
            "Base case: If root == null, return null.",
            "Initialize a Queue<TreeNode> and offer root.",
            "While queue is not empty, poll current node curr.",
            "Swap curr.left and curr.right using a temporary variable temp.",
            "Offer non-null children (curr.left and curr.right) to the queue.",
            "Return root once queue is empty."
          ]
        }
      },
      p('Maximum Depth of Binary Tree', 'Easy', 'Find the maximum depth of a binary tree.'),
      p('Same Tree', 'Easy', 'Check if two binary trees are structurally identical.'),
      p('Diameter of Binary Tree', 'Easy', 'Find the longest path between any two nodes in a tree.'),
      p('Balanced Binary Tree', 'Easy', 'Check if a binary tree is height-balanced.'),
      p('Subtree of Another Tree', 'Easy', 'Check if a tree is a subtree of another tree.'),
      p('Lowest Common Ancestor of a Binary Search Tree', 'Medium', 'Find the lowest common ancestor of two nodes in a BST.'),
      p('Binary Tree Level Order Traversal', 'Medium', 'Traverse the tree level by level (BFS).'),
      p('Binary Tree Right Side View', 'Medium', 'Return the values visible from the right side of the tree.'),
      p('Count Good Nodes in Binary Tree', 'Medium', 'Count nodes where the path from root has no greater value.'),
      p('Validate Binary Search Tree', 'Medium', 'Check if a binary tree is a valid BST.'),
      p('Kth Smallest Element in a BST', 'Medium', 'Find the kth smallest element in a BST.'),
      p('Construct Binary Tree From Preorder and Inorder Traversal', 'Medium', 'Build a tree from preorder and inorder traversal arrays.'),
      p('Binary Tree Maximum Path Sum', 'Hard', 'Find the maximum path sum in a binary tree.'),
      p('Serialize and Deserialize Binary Tree', 'Hard', 'Convert a tree to a string and reconstruct it back.'),
    ]
  };
