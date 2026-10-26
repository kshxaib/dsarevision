import { p } from '../helper.js';
import numIslandsTree from '@/assets/images/graph/DFS Recursion Tree for Number of Islands.png';
import maxAreaTree from '@/assets/images/graph/DFS Recursion Tree_ Max Island Area.png';
import cloneGraphTree from '@/assets/images/graph/BFS Clone Graph Infographic.png';
import rottingOrangesTree from '@/assets/images/graph/Rotting Oranges BFS Step-by-Step Infographic.png';

export const graphs = {
    id: 'graphs',
    name: 'Graphs',
    icon: '🕸️',
    problems: [
      {
        id: 'number-of-islands',
        title: 'Number of Islands',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/description/',
        image: {
          url: numIslandsTree,
          title: 'Dry Run'
        },
        definition: 'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
        examples: [
          {
            input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
            output: '1',
            explanation: 'All lands are connected horizontally or vertically into a single island.'
          },
          {
            input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
            output: '3',
            explanation: 'There are 3 separate connected components of land.'
          }
        ],
        optimal: {
          idea: '• **Pattern:** 2D Grid DFS Connected Components\n• **Grid Traversal:** Iterate through every cell `(i, j)` in the `N x M` grid. If `grid[i][j] == \'1\'` and not yet visited, an unexplored island is discovered.\n• **DFS Traversal:** Increment `count++` and trigger `dfs(i, j)` to traverse and mark the entire connected component of land as visited.\n• **Boundary and Water Check:** In `dfs`, return immediately if `(row, col)` is out of bounds, is water (`\'0\'`), or already visited.\n• **4-Directional Spread:** Mark `visited[row][col] = true`, then recursively explore up `(row - 1, col)`, down `(row + 1, col)`, left `(row, col - 1)`, and right `(row, col + 1)`.\n• **Return Value:** Once all cells are visited, return `count`.',
          code: `class Solution {
    public int numIslands(char[][] grid) {
        int n = grid.length;
        int m = grid[0].length;

        if (grid == null || n == 0 || m == 0) {
            return 0;
        }

        boolean visited[][] = new boolean[n][m]; // : O(N * M) visited array
        int count = 0;

        for (int i = 0; i < n; i++) { // : O(N) loop rows
            for (int j = 0; j < m; j++) { // : O(M) loop cols

                if (grid[i][j] == '1' && !visited[i][j]) {
                    dfs(grid, visited, i, j); // : traverse connected land
                    count++;
                }
            }
        } 

        return count;
    }

    private void dfs(char grid[][], boolean visited[][], int row, int col) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] == '0' || visited[row][col]) {
            return;
        }

        visited[row][col] = true;

        // 4-directional DFS traversal
        dfs(grid, visited, row - 1, col); // : up
        dfs(grid, visited, row + 1, col); // : down
        dfs(grid, visited, row, col - 1); // : left
        dfs(grid, visited, row, col + 1); // : right
    }
}`,
          time: 'O(N * M)',
          timeDesc: '• Every cell is visited at most once during the nested loops and DFS.\n• 4-directional checks take O(1) time per cell.\n• Total Time: O(N * M) where N and M are grid dimensions.',
          space: 'O(N * M)',
          spaceDesc: '• boolean visited[N][M] matrix takes O(N * M) memory.\n• Recursion call stack can reach at most O(N * M) in the worst case (grid full of land).'
        }
      },
      {
        id: 'max-area-of-island',
        title: 'Max Area of Island',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/max-area-of-island/description/',
        image: {
          url: maxAreaTree,
          title: 'Dry Run'
        },
        definition: 'You are given an m x n binary matrix grid. An island is a group of 1s (representing land) connected 4-directionally (horizontal or vertical). You may assume all four edges of the grid are surrounded by water. The area of an island is the number of cells with a value 1 in the island. Return the maximum area of an island in grid. If there is no island, return 0.',
        examples: [
          {
            input: 'grid = [\n  [0,0,1,0,0,0,0,1,0,0,0,0,0],\n  [0,0,0,0,0,0,0,1,1,1,0,0,0],\n  [0,1,1,0,1,0,0,0,0,0,0,0,0],\n  [0,1,0,0,1,1,0,0,1,0,1,0,0],\n  [0,1,0,0,1,1,0,0,1,1,1,0,0],\n  [0,0,0,0,0,0,0,0,0,0,1,0,0],\n  [0,0,0,0,0,0,0,1,1,1,0,0,0],\n  [0,0,0,0,0,0,0,1,1,0,0,0,0]\n]',
            output: '6',
            explanation: 'The maximum area island consists of 6 connected 1s.'
          },
          {
            input: 'grid = [[0,0,0,0,0,0,0,0]]',
            output: '0',
            explanation: 'There are no islands in the grid, so max area is 0.'
          }
        ],
        optimal: {
          idea: '• **Pattern:** 2D Grid DFS Connected Component Area\n• **Grid Traversal:** Iterate through all cells `(i, j)`. When `grid[i][j] == 1` and not visited, trigger `dfs` to compute the total area of this connected island.\n• **Area Accumulation:** For each valid land cell, initialize `count = 1`, mark `visited[row][col] = true`, and recursively add the return values from all 4 neighboring directions (up, down, left, right).\n• **Base Case:** Return `0` immediately if `(row, col)` is out of bounds, is water (`0`), or has already been visited.\n• **Global Maximum:** Update `maxArea = Math.max(maxArea, area)` after exploring each island component, and return `maxArea`.',
          code: `class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            return 0;
        }

        int n = grid.length;
        int m = grid[0].length;

        boolean visited[][] = new boolean[n][m]; // : O(N * M) visited matrix
        int maxArea = 0;
        
        for (int i = 0; i < n; i++) { // : O(N) loop rows
            for (int j = 0; j < m; j++) { // : O(M) loop cols

                if (grid[i][j] == 1 && !visited[i][j]) {
                    int area = dfs(grid, visited, i, j); // : traverse & sum component area
                    maxArea = Math.max(maxArea, area);
                }
            }
        }

        return maxArea;
    }

    private int dfs(int grid[][], boolean visited[][], int row, int col) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] == 0 || visited[row][col]) {
            return 0;
        }

        int count = 0;
        if (grid[row][col] == 1) {
            count++;
            visited[row][col] = true;
        }

        // 4-directional area summation
        count += dfs(grid, visited, row - 1, col); // : up
        count += dfs(grid, visited, row + 1, col); // : down
        count += dfs(grid, visited, row, col - 1); // : left
        count += dfs(grid, visited, row, col + 1); // : right

        return count;
    }
}`,
          time: 'O(N * M)',
          timeDesc: '• Every cell is visited at most once across the nested grid iteration and DFS.\n• 4 directional checks take O(1) time each.\n• Total Time: O(N * M) where N and M are rows and columns.',
          space: 'O(N * M)',
          spaceDesc: '• boolean visited[N][M] array takes O(N * M) memory.\n• Recursion call stack depth reaches at most O(N * M) in the worst case.'
        }
      },
      {
        id: 'clone-graph',
        title: 'Clone Graph',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/clone-graph/description/',
        image: {
          url: cloneGraphTree,
          title: 'Dry Run'
        },
        definition: 'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.',
        examples: [
          {
            input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
            output: '[[2,4],[1,3],[2,4],[1,3]]',
            explanation: 'There are 4 nodes in the graph. 1 is connected to 2 and 4. 2 is connected to 1 and 3. 3 is connected to 2 and 4. 4 is connected to 1 and 3.'
          },
          {
            input: 'adjList = [[]]',
            output: '[[]]',
            explanation: 'Graph has one node with val = 1 and no neighbors.'
          },
          {
            input: 'adjList = []',
            output: '[]',
            explanation: 'Graph is empty with null node.'
          }
        ],
        optimal: {
          idea: '• **Pattern:** Graph BFS Traversal and Hash Map Cloning\n• **Hash Map Mapping:** Use a hash map `HashMap<Node, Node>` to map each original node to its cloned counterpart, avoiding infinite loops in cycles and redundant node creations.\n• **BFS Queue:** Initialize a queue with the starting node. Create the root clone and put `(node, clone)` into the map.\n• **Neighbor Cloning and Wiring:** Dequeue `curr`, iterate over each `neighbor`. If not yet visited (not in map), create `neighborClone`, save to map, and push to queue. Then connect `cloned.neighbors.add(neighborClone)`.\n• **Return Deep Copy:** Return the cloned start node after the queue becomes empty.',
          code: `class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) {
            return null;
        }

        HashMap<Node, Node> map = new HashMap<>(); // : O(V) space map original to clone
        Queue<Node> queue = new LinkedList<>(); // : O(V) space BFS queue

        Node clone = new Node(node.val);
        map.put(node, clone);
        queue.offer(node);

        while (!queue.isEmpty()) { // : O(V) visits each vertex once
            Node curr = queue.poll();

            for (Node neighbor : curr.neighbors) { // : O(2E) iterates through all edge neighbors

                if (!map.containsKey(neighbor)) {
                    Node neighborClone = new Node(neighbor.val);
                    map.put(neighbor, neighborClone);
                    queue.offer(neighbor);
                }

                Node cloned = map.get(curr);
                Node neighborClone = map.get(neighbor);

                cloned.neighbors.add(neighborClone);
            }
        }

        return clone;
    }
}`,
          time: 'O(V + E)',
          timeDesc: '• BFS visits every vertex V once and checks all incident edges 2E across neighbor lists.\n• Hash map lookups and node creations take O(1) average time.\n• Total Time: O(V + E) where V is vertices and E is edges.',
          space: 'O(V)',
          spaceDesc: '• Hash map stores a mapping for all V nodes.\n• BFS queue stores at most V nodes at any level.\n• Total Space: O(V) auxiliary space excluding cloned graph output.'
        }
      },
      {
        id: 'rotting-oranges',
        title: 'Rotting Oranges',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/rotting-oranges/description/',
        image: {
          url: rottingOrangesTree,
          title: 'Dry Run'
        },
        definition: 'You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.',
        examples: [
          {
            input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
            output: '4',
            explanation: 'Oranges rot layer by layer each minute until all are rotten after 4 minutes.'
          },
          {
            input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]',
            output: '-1',
            explanation: 'The orange in the bottom left corner (row 2, col 0) is never reached because rotting cannot spread through empty cells.'
          },
          {
            input: 'grid = [[0,2]]',
            output: '0',
            explanation: 'Since there are already 0 fresh oranges at minute 0, the answer is just 0.'
          }
        ],
        optimal: {
          idea: '• **Pattern:** Multi-Source BFS on 2D Grid\n• **Queue Initialization:** First count total fresh oranges and push all initially rotten oranges (`grid[i][j] == 2`) as starting sources into a FIFO queue.\n• **Level-by-Level BFS:** While the queue is not empty and fresh oranges remain (`fresh > 0`), process the current level (`size = queue.size()`). For each rotten orange, inspect all 4 adjacent cells.\n• **Rotting Spread:** If an adjacent cell has a fresh orange (`1`), convert it to rotten (`2`), decrement `fresh--`, and enqueue it for the next minute.\n• **Result Check:** After completing a level, increment `minutes++`. Once BFS finishes, return `minutes` if `fresh == 0`, otherwise return `-1` if any fresh orange remains unreachable.',
          code: `class Solution {
    public int orangesRotting(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;

        Queue<int[]> queue = new LinkedList<>(); // : O(N * M) queue space

        int fresh = 0;

        for (int i = 0; i < n; i++) { // : O(N) loop rows
            for (int j = 0; j < m; j++) { // : O(M) loop cols

                if (grid[i][j] == 2) {
                    queue.offer(new int[]{i, j});
                } else if (grid[i][j] == 1) {
                    fresh++;
                }
            }
        }

        int minutes = 0;

        int dRow[] = {-1, 0, 1, 0};
        int dCol[] = {0, 1, 0, -1};

        while (!queue.isEmpty() && fresh > 0) { // : multi-source BFS levels
            int size = queue.size();

            for (int i = 0; i < size; i++) { // : process current minute batch
                int cell[] = queue.poll();
                int row = cell[0];
                int col = cell[1];

                for (int k = 0; k < 4; k++) { // : 4-directional spread
                    int newRow = row + dRow[k];
                    int newCol = col + dCol[k];

                    if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m &&
                       grid[newRow][newCol] == 1) {

                        grid[newRow][newCol] = 2;
                        fresh--;

                        queue.offer(new int[]{newRow, newCol});
                    }
                }
            }

            minutes++;
        }

        return fresh == 0 ? minutes : -1;
    }
}`,
          time: 'O(N * M)',
          timeDesc: '• Every cell in the N x M grid is initially scanned to count fresh and rotten oranges.\n• Each orange is enqueued and dequeued in BFS at most once, with 4 directional checks taking constant time.\n• Total Time: O(N * M) where N is rows and M is columns.',
          space: 'O(N * M)',
          spaceDesc: '• BFS queue can hold at most all cells in the grid in the worst case.\n• Grid is modified in place to mark visited rotten oranges without extra boolean array.\n• Total Space: O(N * M) auxiliary space for the queue.'
        }
      },
      p('Walls and Gates', 'Medium', 'Fill each empty room with distance to its nearest gate.'),
      p('Pacific Atlantic Water Flow', 'Medium', 'Find cells that can flow water to both Pacific and Atlantic oceans.'),
      p('Surrounded Regions', 'Medium', 'Capture all surrounded regions on a board.'),
      p('Course Schedule', 'Medium', 'Determine if all courses can be finished (cycle detection).'),
      p('Course Schedule II', 'Medium', 'Find a valid order to take all courses (topological sort).'),
      p('Number of Connected Components in an Undirected Graph', 'Medium', 'Count connected components in an undirected graph.'),
      p('Graph Valid Tree', 'Medium', 'Check if an undirected graph forms a valid tree.'),
      p('Redundant Connection', 'Medium', 'Find the edge that creates a cycle in an undirected graph.'),
      p('Word Ladder', 'Hard', 'Find shortest transformation sequence from begin to end word.'),
    ]
  };
