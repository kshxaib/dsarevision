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
      {
        id: 'balanced-binary-tree',
        title: 'Balanced Binary Tree',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/balanced-binary-tree/description/',
        definition: 'Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.',
        examples: [
          { input: 'root = [3,9,20,null,null,15,7]', output: 'true' },
          { input: 'root = [1,2,2,3,3,null,null,4,4]', output: 'false' },
          { input: 'root = []', output: 'true' }
        ],
        brute: {
          idea: 'Top-Down Height Check for Every Node:\n\n• For each node, calculate left height (LH) and right height (RH).\n• If |LH - RH| > 1, tree is unbalanced (return false).\n• Recursively check that left and right subtrees are both balanced.',
          code: `class Solution {
    public boolean isBalanced(TreeNode root) {
        if(root == null) return true;

        int LH = findHeight(root.left);
        int RH = findHeight(root.right);

        if(Math.abs(LH - RH) > 1) return false;

        boolean left = isBalanced(root.left);
        boolean right = isBalanced(root.right);

        return left && right;
    }

    private int findHeight(TreeNode root) {
        if(root == null) return 0;

        int lh = findHeight(root.left);
        int rh = findHeight(root.right);

        return 1+ Math.max(lh, rh);
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Height calculation repeatedly scans subtrees at every node.\n• Total Time: O(n²)',
          space: 'O(h)',
          spaceDesc: 'O(h) call stack memory where h is tree height.',
          walkthrough: [
            "Base case: If root == null, return true.",
            "Find LH = findHeight(root.left) and RH = findHeight(root.right).",
            "If Math.abs(LH - RH) > 1, return false.",
            "Recursively verify left and right subtrees: isBalanced(root.left) && isBalanced(root.right).",
            "Return true if all nodes satisfy the condition."
          ]
        },
        optimal: {
          idea: 'Bottom-Up DFS with -1 Flag (Early Exit):\n\n• Traverse bottom-up. If any subtree is unbalanced, return -1 immediately.\n• If left height or right height is -1, or if |lh - rh| > 1, propagate -1 up.\n• Otherwise return 1 + max(lh, rh). If root returns -1, return false.',
          code: `class Solution {
    public boolean isBalanced(TreeNode root) {
        if(findHeight(root) == -1){
            return false;
        }

        return true;
    }

    private int findHeight(TreeNode root) {
        if(root == null) return 0;

        int lh = findHeight(root.left);
        int rh = findHeight(root.right);
        
        if(lh == -1 || rh == -1) return -1;

        if(Math.abs(lh - rh) > 1){
            return -1;
        }

        return 1+ Math.max(lh, rh);
    }
}`,
          time: 'O(n)',
          timeDesc: '• Visits every node once with immediate early exit when unbalanced.\n• Total Time: O(n)',
          space: 'O(h)',
          spaceDesc: 'O(h) call stack memory where h is tree height (O(log n) balanced, O(n) skewed).',
          walkthrough: [
            "Check if findHeight(root) == -1; return false if true, else return true.",
            "In findHeight: If root == null, return 0.",
            "Recursively get lh = findHeight(root.left) and rh = findHeight(root.right).",
            "If lh == -1 or rh == -1, return -1 (early termination).",
            "If Math.abs(lh - rh) > 1, return -1.",
            "Return 1 + Math.max(lh, rh) to parent."
          ]
        }
      },
      {
        id: 'subtree-of-another-tree',
        title: 'Subtree of Another Tree',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/description/',
        definition: 'Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.',
        examples: [
          { input: 'root = [3,4,5,1,2], subRoot = [4,1,2]', output: 'true' },
          { input: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', output: 'false' }
        ],
        brute: {
          idea: 'Recursive DFS with isSameTree Helper:\n\n• If subRoot is null, empty tree is always a valid subtree (return true).\n• If root is null, non-empty subRoot cannot match (return false).\n• If isSameTree(root, subRoot) is true, return true.\n• Otherwise recursively check left subtree or right subtree.',
          code: `class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if(subRoot == null) return true;
        if(root == null) return false;   

        if(isSameTree(root, subRoot)){
            return true;
        }  

        boolean leftTree = isSubtree(root.left, subRoot);
        boolean rightTree = isSubtree(root.right, subRoot);

        return leftTree || rightTree;
    }

    private boolean isSameTree(TreeNode p, TreeNode q){
        if(p == null && q == null) return true;
        if(p == null || q == null) return false;

        if(p.val != q.val) return false;

        boolean left = isSameTree(p.left, q.left);
        boolean right = isSameTree(p.right, q.right);

        return left && right;
    }
}`,
          time: 'O(n · m)',
          timeDesc: '• In worst case, compares subtree of size m at each of the n nodes.\n• Total Time: O(n · m)',
          space: 'O(h)',
          spaceDesc: 'O(h) call stack memory where h is root tree height.',
          walkthrough: [
            "Base case: If subRoot == null, return true; if root == null, return false.",
            "Check if tree starting at current node matches subRoot: if (isSameTree(root, subRoot)) return true.",
            "Recursively check left subtree: leftTree = isSubtree(root.left, subRoot).",
            "Recursively check right subtree: rightTree = isSubtree(root.right, subRoot).",
            "Return leftTree || rightTree."
          ]
        },
        optimal: {
          idea: 'Pre-order Traversal Serialization (String Matching):\n\n• Serialize both root and subRoot trees into strings using pre-order traversal with commas and null indicators.\n• Check if subRoot serialized string is a substring of fullTree using contains.',
          code: `class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        String fullTree = preOrderTraversal(root);
        String subTree = preOrderTraversal(subRoot);

        return fullTree.contains(subTree);
    }

    private String preOrderTraversal(TreeNode node) {
        if (node == null) {
            return "null";
        }

        StringBuilder sb = new StringBuilder(",");
        sb.append(node.val);
        sb.append(preOrderTraversal(node.left));
        sb.append(preOrderTraversal(node.right));

        return sb.toString();
    }
}`,
          time: 'O(n + m)',
          timeDesc: '• Pre-order traversal serializes both trees in linear time.\n• Total Time: O(n + m)',
          space: 'O(n + m)',
          spaceDesc: 'O(n + m) space to store serialized strings.',
          walkthrough: [
            "Serialize entire tree: fullTree = preOrderTraversal(root).",
            "Serialize target subtree: subTree = preOrderTraversal(subRoot).",
            "Return fullTree.contains(subTree).",
            "In preOrderTraversal: Append ',' + node.val + left traversal + right traversal with base case 'null'."
          ]
        }
      },
      {
        id: 'lowest-common-ancestor-of-a-binary-search-tree',
        title: 'Lowest Common Ancestor of a Binary Search Tree',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/',
        definition: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).',
        examples: [
          { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6' },
          { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2' },
          { input: 'root = [2,1], p = 2, q = 1', output: '2' }
        ],
        brute: {
          idea: 'Path Comparison (Root-to-Node Paths):\n\n• Find path from root to node p and path from root to node q using backtracking.\n• Compare both paths from index 0 to find the last common node before they diverge.\n• Return that last common node as the LCA.',
          code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        List<TreeNode> pathP = new ArrayList<>();
        List<TreeNode> pathQ = new ArrayList<>();

        findPath(root, p, pathP);
        findPath(root, q, pathQ);

        TreeNode lca = null;
        int i=0;

        while(i<pathP.size() && i<pathQ.size() && pathP.get(i) == pathQ.get(i)){
            lca = pathP.get(i);
            i++;
        }

        return lca;
    }

    private boolean findPath(TreeNode root, TreeNode target, List<TreeNode> path) {
        if(root == null) return false;

        path.add(root);

        if(root == target) return true;

        if(findPath(root.left, target, path) || findPath(root.right, target, path)){
            return true;
        }

        path.remove(path.size() -1);
        return false;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Backtracking finds root-to-node path for both nodes in O(n) time.\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary memory for path lists and recursion call stack.',
          walkthrough: [
            "Initialize List<TreeNode> pathP and pathQ.",
            "Call helper findPath(root, p, pathP) and findPath(root, q, pathQ).",
            "While both paths match at index i, update lca = pathP.get(i) and increment i.",
            "Return lca when paths diverge.",
            "In findPath: Backtrack path by adding current node, testing children, and removing if target not found."
          ]
        },
        optimal: {
          idea: 'BST Invariant Navigation (Iterative O(1) Space):\n\n• If both p and q values are greater than current node, LCA must be in right subtree.\n• If both p and q values are smaller than current node, LCA must be in left subtree.\n• Otherwise current node is the split point where p and q branch off (return curr).',
          code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode curr = root;

        while (curr != null) {
            if (curr.val < p.val && curr.val < q.val) {
                curr = curr.right;
            }

            else if (curr.val > p.val && curr.val > q.val) {
                curr = curr.left;
            }

            else {
                return curr;
            }
        }

        return null;
    }
}`,
          time: 'O(h)',
          timeDesc: '• Travels down a single path from root to LCA in O(h) steps (O(log n) balanced, O(n) skewed).\n• Total Time: O(h)',
          space: 'O(1)',
          spaceDesc: 'O(1) auxiliary space as it traverses iteratively without extra memory or recursion stack.',
          walkthrough: [
            "Start pointer at curr = root.",
            "If curr.val < p.val && curr.val < q.val, move right: curr = curr.right.",
            "Else if curr.val > p.val && curr.val > q.val, move left: curr = curr.left.",
            "Else (split point reached where p and q branch, or one matches curr), return curr."
          ]
        }
      },
      {
        id: 'binary-tree-level-order-traversal',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/description/',
        definition: 'Given the root of a binary tree, return the level order traversal of its nodes values (from left to right, level by level).',
        examples: [
          { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
          { input: 'root = [1]', output: '[[1]]' },
          { input: 'root = []', output: '[]' }
        ],
        optimal: {
          idea: 'Breadth-First Search (Queue Level-by-Level Traversal):\n\n• Use a Queue to process nodes level by level.\n• For each level, record queue.size() as currLvlSize.\n• Iterate currLvlSize times: dequeue node, add its value to currLvl, and enqueue non-null left and right children.\n• Append each completed level list currLvl to the final result ans.',
          code: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        List<List<Integer>> ans = new ArrayList<>();

        if(root == null) return ans;

        queue.offer(root);

        while(!queue.isEmpty()){
            int currLvlSize = queue.size();
            List<Integer> currLvl = new ArrayList<>();

            for(int i=0; i<currLvlSize; i++){
                TreeNode node = queue.poll();

                if(node.left != null){
                    queue.offer(node.left);
                }

                if(node.right != null){
                    queue.offer(node.right);
                }

                currLvl.add(node.val);
            }

            ans.add(currLvl);
        }       

        return ans;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Every node in the binary tree is enqueued and dequeued exactly once.\n• Total Time: O(n)',
          space: 'O(w)',
          spaceDesc: 'O(w) queue memory where w is the maximum width of the tree (up to n/2 in a complete tree).',
          walkthrough: [
            "Initialize Queue<TreeNode> queue and List<List<Integer>> ans.",
            "If root == null, return ans.",
            "Enqueue root into queue.",
            "While queue is not empty, get current level count: currLvlSize = queue.size().",
            "Loop currLvlSize times: poll current node, enqueue left and right children if present, and add node.val to currLvl.",
            "Append completed level list currLvl to ans.",
            "Return ans once queue is emptied."
          ]
        }
      },
      {
        id: 'binary-tree-right-side-view',
        title: 'Binary Tree Right Side View',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/description/',
        definition: 'Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.',
        examples: [
          { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]' },
          { input: 'root = [1,null,3]', output: '[1,3]' },
          { input: 'root = []', output: '[]' }
        ],
        optimal: {
          idea: 'Breadth-First Search (Level-by-Level Rightmost Node Tracking):\n\n• Traverse the tree level by level using a Queue.\n• For each level of size currLvlSize, iterate through all nodes from left to right.\n• Continuously update rightMostValue = node.val so that it holds the last (rightmost) value at level completion.\n• Add rightMostValue to ans after processing each level.',
          code: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> ans = new ArrayList<>();

        if(root == null) return ans;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while(!queue.isEmpty()){
            int currLvlSize = queue.size();
            int rightMostValue = 0;

            for(int i=0; i<currLvlSize; i++){
                TreeNode node = queue.poll();

                rightMostValue = node.val;

                if(node.left != null){
                    queue.offer(node.left);
                }

                if(node.right != null){
                    queue.offer(node.right);
                }
            }

            ans.add(rightMostValue);
        }

        return ans;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Visits every node in the binary tree exactly once.\n• Total Time: O(n)',
          space: 'O(w)',
          spaceDesc: 'O(w) queue memory where w is the maximum width of the tree.',
          walkthrough: [
            "Initialize List<Integer> ans; if root == null, return ans immediately.",
            "Initialize Queue<TreeNode> and offer root.",
            "While queue is not empty, get current level count: currLvlSize = queue.size().",
            "Loop currLvlSize times: poll node, set rightMostValue = node.val, and enqueue non-null left and right children.",
            "Append rightMostValue to ans.",
            "Return ans once traversal finishes."
          ]
        }
      },
      {
        id: 'count-good-nodes-in-binary-tree',
        title: 'Count Good Nodes in Binary Tree',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/description/',
        definition: 'Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X. Return the number of good nodes in the binary tree.',
        examples: [
          { input: 'root = [3,1,4,3,null,1,5]', output: '4' },
          { input: 'root = [3,3,null,4,2]', output: '3' },
          { input: 'root = [1]', output: '1' }
        ],
        brute: {
          idea: 'Level-Order Traversal with Path Verification:\n\n• For each node visited via BFS, reconstruct the full path from root using backtracking (findPath).\n• Scan the path: if any ancestor has a value strictly greater than node.val, it is not a good node.\n• Increment countGoodNodes whenever all path ancestors have values ≤ node.val.',
          code: `class Solution {
    public int goodNodes(TreeNode root) {
        if(root == null) return 0;

        int countGoodNodes = 0;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while(!queue.isEmpty()){
            int currLvlSize = queue.size();

            for(int i=0; i<currLvlSize; i++){
                TreeNode node = queue.poll();

                if(isGoodNode(root, node)){
                    countGoodNodes++;
                }

                if(node.left != null){
                    queue.offer(node.left);
                }
                if(node.right != null){
                    queue.offer(node.right);
                }
            }
        }

        return countGoodNodes;
    }

    private boolean isGoodNode(TreeNode root, TreeNode node){
        List<TreeNode> path = new ArrayList<>();
        findPath(root, node, path);

        for(int i=0; i<path.size(); i++){
            if(path.get(i).val > node.val){
                return false;
            }
        }

        return true;
    }

    private boolean findPath(TreeNode root, TreeNode target, List<TreeNode> path){
        if(root == null) return false;

        path.add(root);

        if(root == target) return true;

        if(findPath(root.left, target, path) || findPath(root.right, target, path)){
            return true;
        }

        path.remove(path.size() -1);
        return false;
    }
}`,
          time: 'O(n²)',
          timeDesc: '• Reconstructs and scans a path of length up to n for each of the n nodes.\n• Total Time: O(n²)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary memory for the queue, path list, and call stack.',
          walkthrough: [
            "If root == null, return 0.",
            "Initialize Queue<TreeNode> and add root.",
            "For each node polled from queue, call isGoodNode(root, node).",
            "In isGoodNode, backtrack path from root to target; return false if any ancestor has val > node.val.",
            "Enqueue non-null left and right children.",
            "Return countGoodNodes."
          ]
        },
        optimal: {
          idea: 'Single-Pass DFS with Running Maximum (maxTillNow):\n\n• Traverse down the tree while maintaining maxTillNow (the highest value seen on the current path from root).\n• If node.val >= maxTillNow, current node is good (count = 1) and update maxTillNow = node.val.\n• Recursively sum good nodes from left and right subtrees with the updated maxTillNow.',
          code: `class Solution {
    public int goodNodes(TreeNode root) {
        return dfs(root, Integer.MIN_VALUE);        
    }

    private int dfs(TreeNode node, int maxTillNow){
        if(node == null) return 0;

        int count = 0;

        if(node.val >= maxTillNow){
            count = 1;
            maxTillNow = node.val;
        }

        count += dfs(node.left, maxTillNow); 
        count += dfs(node.right, maxTillNow); 

        return count;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Each node in the tree is visited exactly once during DFS.\n• Total Time: O(n)',
          space: 'O(h)',
          spaceDesc: 'O(h) call stack memory where h is tree height (O(log n) balanced, O(n) skewed).',
          walkthrough: [
            "Start DFS from root with maxTillNow = Integer.MIN_VALUE.",
            "Base case: If node == null, return 0.",
            "If node.val >= maxTillNow, set count = 1 and update maxTillNow = node.val.",
            "Recursively add count from left child: dfs(node.left, maxTillNow).",
            "Recursively add count from right child: dfs(node.right, maxTillNow).",
            "Return total count."
          ]
        }
      },
      {
        id: 'validate-binary-search-tree',
        title: 'Validate Binary Search Tree',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/description/',
        definition: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST). The left subtree of a node contains only keys strictly less than the node key, the right subtree contains only keys strictly greater than the node key, and both left and right subtrees must also be valid BSTs.',
        examples: [
          { input: 'root = [2,1,3]', output: 'true' },
          { input: 'root = [5,1,4,null,null,3,6]', output: 'false' }
        ],
        optimal: {
          idea: 'Inorder Traversal Strictly Increasing Property:\n\n• An inorder traversal (Left → Root → Right) of any valid BST visits nodes in strictly ascending sorted order.\n• Collect all node values in inorderList and check that each element is strictly greater than its predecessor.\n• If any adjacent pair satisfies inorderList.get(i) <= inorderList.get(i-1), the tree is not a valid BST (return false).',
          code: `class Solution {
    public boolean isValidBST(TreeNode root) {
        List<Integer> inorderList = new ArrayList<>();
        inorderTraversal(root, inorderList);   

        for(int i=1; i<inorderList.size(); i++){
            if(inorderList.get(i) <= inorderList.get(i-1)){
                return false;
            }
        }  

        return true;
    }

    private void inorderTraversal(TreeNode node, List<Integer> inorderList){
        if(node == null) return;

        inorderTraversal(node.left, inorderList);
        inorderList.add(node.val);
        inorderTraversal(node.right, inorderList);
    }
}`,
          time: 'O(n)',
          timeDesc: '• Inorder traversal visits every node once and the verification scan runs in O(n).\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary memory for storing the inorder list plus O(h) recursion call stack.',
          walkthrough: [
            "Initialize List<Integer> inorderList.",
            "Call inorderTraversal(root, inorderList) using Left -> Root -> Right order.",
            "Loop through inorderList from index 1 to end.",
            "If inorderList.get(i) <= inorderList.get(i - 1), return false.",
            "Return true if all elements are strictly increasing."
          ]
        }
      },
      {
        id: 'kth-smallest-element-in-a-bst',
        title: 'Kth Smallest Element in a BST',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/',
        definition: 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
        examples: [
          { input: 'root = [3,1,4,null,2], k = 1', output: '1' },
          { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3' }
        ],
        brute: {
          idea: 'Full Inorder Traversal Collection:\n\n• Inorder traversal of a BST visits nodes in strictly sorted ascending order.\n• Traverse the entire tree and store all node values in inorderList.\n• Return the element at index k - 1 (since k is 1-indexed).',
          code: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        List<Integer> inorderList = new ArrayList<>();
        inorder(root, inorderList);

        return inorderList.get(k-1);        
    }

    private void inorder(TreeNode node, List<Integer> inorderList){
        if(node == null) return;

        inorder(node.left, inorderList);
        inorderList.add(node.val);
        inorder(node.right, inorderList);
    }
}`,
          time: 'O(n)',
          timeDesc: '• Visits all n nodes to populate the inorder list.\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary list storage to hold all tree elements.',
          walkthrough: [
            "Initialize List<Integer> inorderList.",
            "Traverse tree via inorder(root, inorderList) appending node.val.",
            "Return inorderList.get(k - 1)."
          ]
        },
        optimal: {
          idea: 'Inorder Traversal with Counter and Early Stop:\n\n• Maintain a 2-element array result[] where result[0] tracks visited node count and result[1] stores the target element.\n• Traverse left subtree, then increment result[0]++.\n• When result[0] == k, assign result[1] = node.val and return.\n• Avoids storing all elements in an auxiliary list.',
          code: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        int result[] = new int[2];  //[0]: counter, [1]: element
        inorder(root, result, k);

        return result[1];        
    }

    private void inorder(TreeNode node, int result[], int k){
        if(node == null) return;

        inorder(node.left, result, k);
        result[0]++;

        if(result[0] == k){
            result[1] = node.val;
            return;
        }

        inorder(node.right, result, k);
    }
}`,
          time: 'O(h + k)',
          timeDesc: '• Stops traversal as soon as the k-th node is reached without scanning remaining nodes.\n• Total Time: O(h + k)',
          space: 'O(h)',
          spaceDesc: 'O(h) call stack memory where h is tree height (O(log n) balanced, O(n) skewed).',
          walkthrough: [
            "Initialize int result[] = new int[2] where result[0] is counter and result[1] holds answer.",
            "Call inorder(root, result, k).",
            "In inorder: Traverse node.left, then increment result[0]++.",
            "If result[0] == k, assign result[1] = node.val and return.",
            "Otherwise traverse node.right.",
            "Return result[1]."
          ]
        }
      },
      {
        id: 'construct-binary-tree-from-preorder-and-inorder-traversal',
        title: 'Construct Binary Tree From Preorder and Inorder Traversal',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/',
        definition: 'Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.',
        examples: [
          { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' },
          { input: 'preorder = [-1], inorder = [-1]', output: '[-1]' }
        ],
        optimal: {
          idea: 'Divide and Conquer with HashMap Index Lookup:\n\n• The first element in preorder segment is always the root of the current subtree.\n• Lookup root location in inorder array using a HashMap in O(1) time.\n• Elements to the left of inRoot form the left subtree (count = inLeftNums = inRoot - inStart), and elements to the right form the right subtree.\n• Recursively construct root.left and root.right with partitioned index ranges.',
          code: `class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        Map<Integer, Integer> inorderIndexMap = new HashMap<>();
        for(int i=0; i<inorder.length; i++){
            inorderIndexMap.put(inorder[i], i);
        }        

        TreeNode root = buildTree(inorderIndexMap, preorder, 0, preorder.length -1, inorder, 0, inorder.length -1);
        return root;
    }

    private TreeNode buildTree(Map<Integer, Integer> inorderIndexMap, int preorder[], int preStart, int preEnd,  int inorder[], int inStart, int inEnd){
        if(preStart > preEnd || inStart > inEnd) return null;

        TreeNode root = new TreeNode(preorder[preStart]);

        int inRoot = inorderIndexMap.get(preorder[preStart]);
        int inLeftNums = inRoot - inStart;

        root.left = buildTree(inorderIndexMap, preorder, preStart +1, preStart + inLeftNums, inorder, inStart, inRoot -1);

        root.right = buildTree(inorderIndexMap, preorder, preStart + inLeftNums +1, preEnd, inorder, inRoot +1, inEnd);

        return root;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Building the HashMap takes O(n) and each node is constructed in O(1) time.\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary memory for HashMap storing inorder indices plus O(h) recursion stack.',
          walkthrough: [
            "Store all inorder elements and their indices in inorderIndexMap for O(1) lookup.",
            "Call recursive helper with initial boundaries [0, preorder.length - 1] and [0, inorder.length - 1].",
            "Base case: If preStart > preEnd or inStart > inEnd, return null.",
            "Create root node from preorder[preStart].",
            "Locate inRoot in HashMap and calculate inLeftNums = inRoot - inStart.",
            "Recursively construct root.left using left subtree segments.",
            "Recursively construct root.right using right subtree segments.",
            "Return root."
          ]
        }
      },
      {
        id: 'binary-tree-maximum-path-sum',
        title: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/description/',
        definition: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can only appear at most once. Given the root of a binary tree, return the maximum path sum of any non-empty path.',
        examples: [
          { input: 'root = [1,2,3]', output: '6' },
          { input: 'root = [-10,9,20,null,null,15,7]', output: '42' }
        ],
        optimal: {
          idea: 'Post-order DFS with Negative Path Pruning:\n\n• For each node, compute the max path gain from left and right subtrees using Math.max(0, ...), ignoring negative branches.\n• The max path curving through current node as root is currentPathSum = leftSum + rightSum + node.val (updates ans[0]).\n• Return node.val + Math.max(leftSum, rightSum) to parent because the parent path can only continue through one branch.',
          code: `class Solution {
    public int maxPathSum(TreeNode root) {
        int ans[] = new int[1];
        ans[0] = Integer.MIN_VALUE;

        findMaxPath(root, ans);
        return ans[0];
    }

    private int findMaxPath(TreeNode node, int ans[]) {
        if (node == null) {
            return 0;
        }

        int leftSum = Math.max(0, findMaxPath(node.left, ans));
        int rightSum = Math.max(0, findMaxPath(node.right, ans));

        int currentPathSum = leftSum + rightSum + node.val;
        ans[0] = Math.max(ans[0], currentPathSum);

        return node.val + Math.max(leftSum, rightSum);
    }
}`,
          time: 'O(n)',
          timeDesc: '• Visits every node in the binary tree exactly once.\n• Total Time: O(n)',
          space: 'O(h)',
          spaceDesc: 'O(h) call stack memory where h is tree height (O(log n) balanced, O(n) skewed).',
          walkthrough: [
            "Initialize int ans[] = new int[1] with ans[0] = Integer.MIN_VALUE to track global maximum.",
            "Call findMaxPath(root, ans).",
            "Base case: If node == null, return 0.",
            "Recursively calculate leftSum and rightSum, ignoring negative sums using Math.max(0, ...).",
            "Compute current path sum curving through current node: currentPathSum = leftSum + rightSum + node.val.",
            "Update global max: ans[0] = Math.max(ans[0], currentPathSum).",
            "Return node.val + Math.max(leftSum, rightSum) to parent.",
            "Return ans[0]."
          ]
        }
      },
      {
        id: 'serialize-and-deserialize-binary-tree',
        title: 'Serialize and Deserialize Binary Tree',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/',
        definition: 'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link. Design an algorithm to serialize and deserialize a binary tree.',
        examples: [
          { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]' },
          { input: 'root = []', output: '[]' }
        ],
        optimal: {
          idea: 'Breadth-First Search (Level-Order Queue Serialization & Deserialization):\n\n• Serialize: Use a Queue to traverse level-by-level. If node is null, append "N,"; otherwise append node.val + "," and enqueue its left and right children.\n• Deserialize: Split the comma-separated string into a values array. Rebuild the root using values[0], then use a Queue to iteratively attach left and right children using two advancing pointer steps per parent node.',
          code: `public class Codec {
    public String serialize(TreeNode root) {
        if(root == null) return "";

        StringBuilder ans = new StringBuilder();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while(!queue.isEmpty()){
            TreeNode node = queue.poll();
            if(node == null){
                ans.append("N,");
                continue;
            }

            ans.append(node.val + ",");
            queue.offer(node.left);
            queue.offer(node.right);
        }

        return ans.toString();
    }

    public TreeNode deserialize(String data) {
        if(data.equals("")) return null;

        String values[] = data.split(",");

        Queue<TreeNode> queue = new LinkedList<>();
        TreeNode root = new TreeNode(Integer.parseInt(values[0]));
        queue.add(root);

        int i=1;
        while(!queue.isEmpty()){
            TreeNode parent = queue.poll();
            
            if(!values[i].equals("N")){
                TreeNode leftNode = new TreeNode(Integer.parseInt(values[i]));
                parent.left = leftNode;
                queue.offer(leftNode);
            }
            i++;

            if(!values[i].equals("N")){
                TreeNode rightNode = new TreeNode(Integer.parseInt(values[i]));
                parent.right = rightNode;
                queue.offer(rightNode);
            }
            i++;
        }

        return root;
    }
}`,
          time: 'O(n)',
          timeDesc: '• Both serialize and deserialize visit each node and token exactly once.\n• Total Time: O(n)',
          space: 'O(n)',
          spaceDesc: 'O(n) auxiliary memory for the serialized string buffer, token array, and BFS queue.',
          walkthrough: [
            "Serialize: Return empty string if root == null. Level-order traverse with Queue, appending 'N,' for nulls and node.val + ',' for non-nulls.",
            "Deserialize: Return null if string is empty. Split string by comma into values array.",
            "Parse root = new TreeNode(Integer.parseInt(values[0])) and enqueue into queue.",
            "Initialize index pointer i = 1 to iterate through tokens.",
            "Poll parent: if values[i] != 'N', construct leftNode, attach parent.left = leftNode, and enqueue leftNode. Increment i.",
            "If values[i] != 'N', construct rightNode, attach parent.right = rightNode, and enqueue rightNode. Increment i.",
            "Return root once all tokens have been processed."
          ]
        }
      },
    ]
  };
