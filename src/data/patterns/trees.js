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
      {
        id: 'maximum-depth-of-binary-tree',
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/description/',
        definition: 'Given the root of a binary tree, return its maximum depth. A binary tree maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
        examples: [
          { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
          { input: 'root = [1,null,2]', output: '2' }
        ],
        optimal: {
          idea: 'Recursive DFS (Post-order Traversal):\n\n• Base case: If root is null, return 0.\n• Recursively calculate left subtree depth (lh) and right subtree depth (rh).\n• Return 1 + Math.max(lh, rh).',
          code: `class Solution {
    public int maxDepth(TreeNode root) {
        if(root == null) return 0;

        int lh = maxDepth(root.left);
        int rh = maxDepth(root.right);

        return 1+ Math.max(lh, rh);
    }
}`,
          time: 'O(n)',
          timeDesc: '• Visits every node in the binary tree exactly once.\n• Total Time: O(n)',
          space: 'O(h)',
          spaceDesc: 'O(h) call stack memory where h is tree height (O(log n) balanced, O(n) skewed).',
          walkthrough: [
            "Base case: If root == null, return 0.",
            "Compute left subtree depth: lh = maxDepth(root.left).",
            "Compute right subtree depth: rh = maxDepth(root.right).",
            "Return 1 + Math.max(lh, rh)."
          ]
        }
      },
      {
        id: 'same-tree',
        title: 'Same Tree',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/same-tree/description/',
        definition: 'Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.',
        examples: [
          { input: 'p = [1,2,3], q = [1,2,3]', output: 'true' },
          { input: 'p = [1,2], q = [1,null,2]', output: 'false' },
          { input: 'p = [1,2,1], q = [1,1,2]', output: 'false' }
        ],
        optimal: {
          idea: 'Recursive DFS traversal:\n\n• If both p and q are null, both trees are identical at this branch (return true).\n• If only one is null or values differ (p.val != q.val), trees are not identical (return false).\n• Recursively verify left and right subtrees match.',
          code: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if(p == null && q == null) return true;
        if(p == null || q == null) return false;

        if(p.val != q.val) return false;

        boolean left = isSameTree(p.left, q.left);
        boolean right = isSameTree(p.right, q.right);

        return left && right; 
    }
}`,
          time: 'O(n)',
          timeDesc: '• Visits every node up to min(n, m) where n and m are tree sizes.\n• Total Time: O(n)',
          space: 'O(h)',
          spaceDesc: 'O(h) call stack memory where h is the minimum tree height.',
          walkthrough: [
            "Base case: If both p == null && q == null, return true.",
            "If only one is null (p == null || q == null), return false.",
            "If values mismatch (p.val != q.val), return false.",
            "Recursively verify left children: left = isSameTree(p.left, q.left).",
            "Recursively verify right children: right = isSameTree(p.right, q.right).",
            "Return left && right."
          ]
        }
      },
      {
        id: 'diameter-of-binary-tree',
        title: 'Diameter of Binary Tree',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/description/',
        definition: 'Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.',
        examples: [
          { input: 'root = [1,2,3,4,5]', output: '3' },
          { input: 'root = [1,2]', output: '1' }
        ],
        optimal: {
          idea: 'Single-Pass Post-order DFS (Bottom-Up):\n\n• Calculate height of each subtree while simultaneously updating the diameter array.\n• At each node, diameter through this node = leftHeight + rightHeight.\n• Return 1 + max(leftHeight, rightHeight) to parent for height calculation in O(n) total time.',
          code: `class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        int diameter[] = new int[1];

        calHeight(root, diameter);
        return diameter[0];        
    }

    private int calHeight(TreeNode root, int diameter[]){
        if(root == null) return 0;

        int leftHeight = calHeight(root.left, diameter);
        int rightHeight = calHeight(root.right, diameter);

        diameter[0] = Math.max(diameter[0], leftHeight + rightHeight);
        return 1+ Math.max(leftHeight, rightHeight);
    }
}`,
          time: 'O(n)',
          timeDesc: '• Each node is visited once during bottom-up height computation.\n• Total Time: O(n)',
          space: 'O(h)',
          spaceDesc: 'O(h) call stack memory where h is tree height (O(log n) balanced, O(n) skewed).',
          walkthrough: [
            "Initialize a 1-element array int diameter[] = new int[1] to pass by reference.",
            "Call helper calHeight(root, diameter).",
            "Base case: If root is null, return 0.",
            "Recursively find leftHeight and rightHeight.",
            "Update max diameter: diameter[0] = Math.max(diameter[0], leftHeight + rightHeight).",
            "Return 1 + Math.max(leftHeight, rightHeight) to parent.",
            "Return diameter[0] as final answer."
          ]
        }
      },
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
