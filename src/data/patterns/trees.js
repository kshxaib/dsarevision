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
      p('Validate Binary Search Tree', 'Medium', 'Check if a binary tree is a valid BST.'),
      p('Kth Smallest Element in a BST', 'Medium', 'Find the kth smallest element in a BST.'),
      p('Construct Binary Tree From Preorder and Inorder Traversal', 'Medium', 'Build a tree from preorder and inorder traversal arrays.'),
      p('Binary Tree Maximum Path Sum', 'Hard', 'Find the maximum path sum in a binary tree.'),
      p('Serialize and Deserialize Binary Tree', 'Hard', 'Convert a tree to a string and reconstruct it back.'),
    ]
  };
