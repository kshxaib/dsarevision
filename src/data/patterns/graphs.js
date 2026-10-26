import { p } from '../helper.js';
import numIslandsTree from '@/assets/images/graph/DFS Recursion Tree for Number of Islands.png';
import maxAreaTree from '@/assets/images/graph/DFS Recursion Tree_ Max Island Area.png';
import cloneGraphTree from '@/assets/images/graph/BFS Clone Graph Infographic.png';
import rottingOrangesTree from '@/assets/images/graph/Rotting Oranges BFS Step-by-Step Infographic.png';
import islandsAndTreasureTree from '@/assets/images/graph/Multi-Source BFS_ Treasure Distances.png';

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
      {
        id: 'islands-and-treasure',
        title: 'Islands and Treasure',
        difficulty: 'Medium',
        leetcodeUrl: 'https://neetcode.io/problems/islands-and-treasure',
        image: {
          url: islandsAndTreasureTree,
          title: 'Dry Run'
        },
        definition: 'You are given an m x n 2D grid initialized with these possible values: -1 representing a water cell or obstacle, 0 representing a treasure chest, and 2147483647 (Integer.MAX_VALUE) representing an empty land cell. Fill each empty land cell with the distance to its nearest treasure chest. If it is impossible to reach a treasure chest, it should remain 2147483647.',
        examples: [
          {
            input: 'grid = [\n  [2147483647,-1,0,2147483647],\n  [2147483647,2147483647,2147483647,-1],\n  [2147483647,-1,2147483647,-1],\n  [0,-1,2147483647,2147483647]\n]',
            output: '[\n  [3,-1,0,1],\n  [2,2,1,-1],\n  [1,-1,2,-1],\n  [0,-1,3,4]\n]',
            explanation: 'Empty land cells are filled with the shortest distance to their nearest treasure chest (value 0).'
          },
          {
            input: 'grid = [\n  [0,-1],\n  [2147483647,2147483647]\n]',
            output: '[\n  [0,-1],\n  [1,2]\n]',
            explanation: 'Starting from the chest at (0,0), distance increases by 1 for adjacent empty rooms.'
          }
        ],
        optimal: {
          idea: '• **Pattern:** Multi-Source BFS on 2D Grid\n• **Queue Initialization:** Find all treasure chests (`grid[i][j] == 0`) and enqueue their coordinates simultaneously as starting sources for multi-source BFS.\n• **Shortest Distance Expansion:** Pop each cell `(row, col)` and check its 4 adjacent neighbors (up, down, left, right).\n• **Cell Update:** If a neighbor is valid and is an empty land cell (`grid[newRow][newCol] == Integer.MAX_VALUE`), update its distance to `grid[row][col] + 1` and push it into the queue.\n• **Optimality:** Since BFS explores layer by layer, the first time an empty land cell is reached from any chest, it is guaranteed to have the minimum shortest distance.',
          code: `class Solution {
    public void islandsAndTreasure(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;

        Queue<int[]> queue = new LinkedList<>(); // : O(N * M) queue space

        for (int i = 0; i < n; i++) { // : O(N) loop rows
            for (int j = 0; j < m; j++) { // : O(M) loop cols
                if (grid[i][j] == 0) {
                    queue.offer(new int[] {i, j}); // : enqueue all treasure chests
                }
            }
        }

        while (!queue.isEmpty()) { // : multi-source BFS traversal
            int cell[] = queue.poll();
            int row = cell[0];
            int col = cell[1];

            int dRow[] = {1, -1, 0, 0};
            int dCol[] = {0, 0, -1, 1};

            for (int i = 0; i < 4; i++) { // : explore 4 adjacent directions
                int newRow = row + dRow[i];
                int newCol = col + dCol[i];

                if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m && grid[newRow][newCol] == Integer.MAX_VALUE) {
                    grid[newRow][newCol] = grid[row][col] + 1; // : update shortest distance

                    queue.offer(new int[] {newRow, newCol});
                }
            }
        }    
    }
}`,
          time: 'O(N * M)',
          timeDesc: '• Initial grid scan visits every cell to enqueue treasure chests.\n• Each land cell is visited and updated at most once via multi-source BFS.\n• Total Time: O(N * M) where N and M are grid dimensions.',
          space: 'O(N * M)',
          spaceDesc: '• BFS queue can hold at most all cells in the grid in the worst case.\n• Distances are written directly into the grid in place without extra visited memory.\n• Total Space: O(N * M) auxiliary space for the queue.'
        }
      },
      {
        id: 'pacific-atlantic-water-flow',
        title: 'Pacific Atlantic Water Flow',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/description/',
        image: null,
        definition: 'There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island\'s top and left edges, and the Atlantic Ocean touches the island\'s bottom and right edges. Rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell\'s height is less than or equal to the current cell\'s height. Water can flow from any cell adjacent to an ocean into the ocean. Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.',
        examples: [
          {
            input: 'heights = [\n  [1,2,2,3,5],\n  [3,2,3,4,4],\n  [2,4,5,3,1],\n  [6,7,1,4,5],\n  [5,1,1,2,4]\n]',
            output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]',
            explanation: 'Water from these coordinates can flow uphill to both Pacific (top or left) and Atlantic (bottom or right).'
          },
          {
            input: 'heights = [[1]]',
            output: '[[0,0]]',
            explanation: 'The single cell touches both oceans directly.'
          }
        ],
        optimal: {
          idea: '• **Pattern:** Reverse Multi-Source BFS from Ocean Borders\n• **Reverse Flow Intuition:** Instead of checking if water from every cell can reach both oceans (which is repetitive), flow water in reverse: start from ocean borders and move inland to cells with equal or greater height (`heights[newRow][newCol] >= heights[row][col]`).\n• **Two Queues and Visited Sets:** Initialize `pQueue` and `pacific[N][M]` for Pacific (top and left borders), and `aQueue` and `atlantic[N][M]` for Atlantic (bottom and right borders).\n• **Multi-Source BFS Expansion:** Run BFS independently for Pacific and Atlantic. Water can spread to a neighbor if it has not been visited and its height is greater than or equal to current height.\n• **Intersection:** Iterate through all cells `(i, j)`. If both `pacific[i][j]` and `atlantic[i][j]` are true, water from that cell can reach both oceans. Add `[i, j]` to the result list.',
          code: `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        int n = heights.length;
        int m = heights[0].length;

        boolean[][] pacific = new boolean[n][m]; // : O(N * M) visited pacific
        boolean[][] atlantic = new boolean[n][m]; // : O(N * M) visited atlantic

        Queue<int[]> pQueue = new LinkedList<>(); // : O(N * M) queue space
        Queue<int[]> aQueue = new LinkedList<>(); // : O(N * M) queue space

        // Pacific: top and left borders
        // Atlantic: bottom and right borders
        for (int i = 0; i < n; i++) { // : O(N) left and right borders
            addCell(pQueue, pacific, i, 0);
            addCell(aQueue, atlantic, i, m - 1);
        }

        for (int j = 0; j < m; j++) { // : O(M) top and bottom borders
            addCell(pQueue, pacific, 0, j);
            addCell(aQueue, atlantic, n - 1, j);
        }

        bfs(heights, pQueue, pacific); // : multi-source BFS from Pacific
        bfs(heights, aQueue, atlantic); // : multi-source BFS from Atlantic

        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < n; i++) { // : O(N) check overlap rows
            for (int j = 0; j < m; j++) { // : O(M) check overlap cols
                if (pacific[i][j] && atlantic[i][j]) {
                    result.add(Arrays.asList(i, j));
                }
            }
        }

        return result;
    }

    private void addCell(Queue<int[]> queue, boolean[][] visited, int row, int col) {
        if (!visited[row][col]) {
            visited[row][col] = true;
            queue.offer(new int[]{row, col});
        }
    }

    private void bfs(int[][] heights, Queue<int[]> queue, boolean[][] visited) {
        int n = heights.length;
        int m = heights[0].length;

        int[] dRow = {-1, 1, 0, 0};
        int[] dCol = {0, 0, -1, 1};

        while (!queue.isEmpty()) { // : reverse BFS traversal
            int[] cell = queue.poll();
            int row = cell[0];
            int col = cell[1];

            for (int k = 0; k < 4; k++) { // : 4-directional reverse flow
                int newRow = row + dRow[k];
                int newCol = col + dCol[k];

                if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m && !visited[newRow][newCol] &&
                    heights[newRow][newCol] >= heights[row][col]) {

                    visited[newRow][newCol] = true;
                    queue.offer(new int[]{newRow, newCol});
                }
            }
        }
    }
}`,
          time: 'O(N * M)',
          timeDesc: '• Each cell is visited at most once per BFS for both Pacific and Atlantic oceans.\n• Intersection check loops through all cells in the N x M grid.\n• Total Time: O(N * M) where N is rows and M is columns.',
          space: 'O(N * M)',
          spaceDesc: '• boolean matrices pacific[N][M] and atlantic[N][M] take O(N * M) memory.\n• BFS queues hold at most O(N * M) cells in the worst case.\n• Total Space: O(N * M) auxiliary space.'
        }
      },
      {
        id: 'surrounded-regions',
        title: 'Surrounded Regions',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/surrounded-regions/description/',
        image: null,
        definition: 'You are given an m x n matrix board containing letters \'X\' and \'O\'. Capture regions that are surrounded: connect adjacent \'O\' cells horizontally or vertically, and flip surrounded \'O\' regions to \'X\'. An \'O\' region is NOT surrounded if any of its cells touches the border of the board.',
        examples: [
          {
            input: 'board = [\n  ["X","X","X","X"],\n  ["X","O","O","X"],\n  ["X","X","O","X"],\n  ["X","O","X","X"]\n]',
            output: '[\n  ["X","X","X","X"],\n  ["X","X","X","X"],\n  ["X","X","X","X"],\n  ["X","O","X","X"]\n]',
            explanation: 'Notice that an \'O\' should not be flipped if it is on the border, or if it is connected to an \'O\' on the border. The bottom \'O\' connects to the border so it stays \'O\'.'
          },
          {
            input: 'board = [["X"]]',
            output: '[["X"]]',
            explanation: 'A single cell with \'X\' remains unchanged.'
          }
        ],
        optimal: {
          idea: '• **Pattern:** Boundary Multi-Source BFS\n• **Boundary Invariance:** Any \'O\' connected to the 4 borders cannot be surrounded. Instead of finding surrounded cells directly, protect all boundary-connected \'O\'s.\n• **Border Seeding:** Scan the 4 outer edges (first and last row, first and last column). For any \'O\', temporarily change it to \'#\' and enqueue its coordinates.\n• **Multi-Source BFS:** Explore 4 adjacent neighbors for each dequeued cell. Any neighbor with \'O\' is connected to a border \'O\', so mark it \'#\' and push it to the queue.\n• **Final Conversion:** Scan the whole board. Convert remaining \'O\' cells to \'X\' (since they are fully surrounded), and restore \'#\' cells back to \'O\' (the safe border regions).',
          code: `class Solution {
    public void solve(char[][] board) {
        if (board == null || board.length == 0 || board[0].length == 0) {
            return;
        }

        int n = board.length;
        int m = board[0].length;

        Queue<int[]> queue = new LinkedList<>(); // : O(N * M) queue space

        // First and last row
        for (int j = 0; j < m; j++) { // : O(M) top and bottom border
            if (board[0][j] == 'O') {
                addCell(0, j, board, queue);
            }

            if (board[n - 1][j] == 'O') {
                addCell(n - 1, j, board, queue);
            }
        }

        // First and last column
        for (int i = 0; i < n; i++) { // : O(N) left and right border
            if (board[i][0] == 'O') {
                addCell(i, 0, board, queue);
            }

            if (board[i][m - 1] == 'O') {
                addCell(i, m - 1, board, queue);
            }
        }

        // BFS from all boundary 'O's
        bfs(board, queue); // : multi-source BFS mark safe boundary components

        // Convert remaining 'O's to 'X' and '#' back to 'O'
        for (int i = 0; i < n; i++) { // : O(N) flip grid rows
            for (int j = 0; j < m; j++) { // : O(M) flip grid cols
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                } else if (board[i][j] == '#') {
                    board[i][j] = 'O';
                }
            }
        }
    }

    private void addCell(int row, int col, char[][] board, Queue<int[]> queue) {
        board[row][col] = '#';
        queue.offer(new int[]{row, col});
    }

    private void bfs(char[][] board, Queue<int[]> queue) {
        int n = board.length;
        int m = board[0].length;

        int[] dRow = {-1, 0, 1, 0};
        int[] dCol = {0, 1, 0, -1};

        while (!queue.isEmpty()) { // : BFS traversal
            int[] cell = queue.poll();
            int row = cell[0];
            int col = cell[1];

            for (int k = 0; k < 4; k++) { // : 4-directional spread
                int newRow = row + dRow[k];
                int newCol = col + dCol[k];

                if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m && board[newRow][newCol] == 'O') {
                    // Mark before enqueueing to avoid duplicates
                    board[newRow][newCol] = '#';
                    queue.offer(new int[]{newRow, newCol});
                }
            }
        }
    }
}`,
          time: 'O(N * M)',
          timeDesc: '• Boundary scan and final board sweep iterate across all cells in the N x M grid.\n• Each boundary-connected cell is enqueued and processed at most once during BFS.\n• Total Time: O(N * M) where N is rows and M is columns.',
          space: 'O(N * M)',
          spaceDesc: '• BFS queue can hold at most all cells in the grid in the worst case.\n• Grid is modified in place using \'#\' without an auxiliary visited matrix.\n• Total Space: O(N * M) auxiliary space for the queue.'
        }
      },
      {
        id: 'course-schedule',
        title: 'Course Schedule',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/course-schedule/description/',
        youtubeUrl: 'https://www.youtube.com/watch?v=Oa4Srx9mDqs',
        image: null,
        definition: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.',
        examples: [
          {
            input: 'numCourses = 2, prerequisites = [[1,0]]',
            output: 'true',
            explanation: 'To take course 1 you must finish course 0. So you can take 0 then 1.'
          },
          {
            input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
            output: 'false',
            explanation: 'To take course 1 you need 0, and to take 0 you need 1, creating a cyclic dependency.'
          }
        ],
        optimal: {
          idea: '• **Pattern:** Topological Sort via Kahn Algorithm (BFS In-degree)\n• **Graph Representation:** Build a directed adjacency list `prerequisite -> course` and compute the in-degree for each course (number of prerequisite dependencies needed).\n• **Zero In-degree Queue:** Enqueue all courses that have an in-degree of 0 (courses with no prerequisites that can be taken immediately).\n• **Kahn BFS Traversal:** Repeatedly dequeue a completed course, increment `count++`, and decrement the in-degree of all dependent neighbor courses.\n• **Cycle Detection:** When a neighbor in-degree reaches 0, push it to the queue. If `count == numCourses`, all courses can be finished without cycles; otherwise, a cycle exists.',
          code: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>(); // : O(V + E) adjacency list

        for (int i = 0; i < numCourses; i++) { // : O(V) initialize graph nodes
            adj.add(new ArrayList<>());
        }

        for (int edge[] : prerequisites) { // : O(E) build directed edges
            int course = edge[0];
            int prerequisite = edge[1];

            adj.get(prerequisite).add(course);  // prerequisite -> course
        }

        int indegree[] = new int[numCourses]; // : O(V) in-degree array
        for (int i = 0; i < numCourses; i++) { // : O(V + E) calculate in-degrees
            for (int neighbor : adj.get(i)) {
                indegree[neighbor]++;
            }
        }

        Queue<Integer> queue = new LinkedList<>(); // : O(V) BFS queue
        for (int i = 0; i < numCourses; i++) { // : O(V) find zero in-degree sources
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        int count = 0;
        while (!queue.isEmpty()) { // : Kahn algorithm BFS processing
            int curr = queue.poll();
            count++;

            for (int neighbor : adj.get(curr)) { // : decrement dependent courses
                indegree[neighbor]--;

                if (indegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        return count == numCourses;
    }
}`,
          time: 'O(V + E)',
          timeDesc: '• Building the graph and computing in-degrees traverses all V vertices and E prerequisites.\n• Kahn BFS visits every node once and decrements each directed edge exactly once.\n• Total Time: O(V + E) where V is numCourses and E is prerequisites length.',
          space: 'O(V + E)',
          spaceDesc: '• Adjacency list stores V vertices and E directed edges.\n• In-degree array and BFS queue each require O(V) memory.\n• Total Space: O(V + E) auxiliary space.'
        }
      },
      {
        id: 'course-schedule-ii',
        title: 'Course Schedule II',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/description/',
        image: null,
        definition: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.',
        examples: [
          {
            input: 'numCourses = 2, prerequisites = [[1,0]]',
            output: '[0,1]',
            explanation: 'To take course 1 you must have finished course 0. So the correct course order is [0,1].'
          },
          {
            input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
            output: '[0,2,1,3]',
            explanation: 'There are multiple valid orderings. Both [0,1,2,3] and [0,2,1,3] are valid topological orders.'
          },
          {
            input: 'numCourses = 1, prerequisites = []',
            output: '[0]',
            explanation: 'There is only one course with no prerequisites.'
          }
        ],
        optimal: {
          idea: '• **Pattern:** Topological Sort via Kahn Algorithm (BFS In-degree)\n• **Directed Graph:** Build an adjacency list `prerequisite -> course` and maintain an `indegree` array representing prerequisites required for each course.\n• **Seed Queue:** Enqueue all courses with `indegree == 0` (courses with no prerequisites that can be scheduled first).\n• **Topological Ordering:** Repeatedly dequeue `curr`, append to `order[index++]`, and decrement in-degrees of its dependent neighbors. When a neighbor reaches in-degree 0, enqueue it.\n• **Cycle Validation:** After processing, if `index == numCourses`, return `order`. If `index != numCourses`, a cycle prevents taking all courses, so return an empty array `new int[]{}`.',
          code: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>(); // : O(V + E) adjacency list
        for (int i = 0; i < numCourses; i++) { // : O(V) initialize nodes
            adj.add(new ArrayList<>());
        }

        for (int edge[] : prerequisites) { // : O(E) build directed edges
            int course = edge[0];
            int prerequisite = edge[1];

            // prerequisite -> course
            adj.get(prerequisite).add(course);
        }

        int indegree[] = new int[numCourses]; // : O(V) in-degree array
        for (int i = 0; i < numCourses; i++) { // : O(V + E) compute in-degrees
            for (int neighbour : adj.get(i)) {
                indegree[neighbour]++;
            }
        }

        Queue<Integer> queue = new LinkedList<>(); // : O(V) BFS queue
        for (int i = 0; i < numCourses; i++) { // : O(V) find zero in-degree sources
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        int order[] = new int[numCourses]; // : O(V) topological ordering output
        int index = 0;
        
        while (!queue.isEmpty()) { // : Kahn algorithm BFS processing
            int curr = queue.poll();
            order[index] = curr;
            index++;

            for (int neighbour : adj.get(curr)) { // : decrement dependent courses
                indegree[neighbour]--;
                if (indegree[neighbour] == 0) {
                    queue.offer(neighbour);
                }
            }
        }

        // cycle exists
        if (index != numCourses) {
            return new int[]{};
        }

        return order;
    }
}`,
          time: 'O(V + E)',
          timeDesc: '• Constructing the graph and calculating in-degrees takes O(V + E) time.\n• Kahn BFS visits every course and decrements each prerequisite edge exactly once.\n• Total Time: O(V + E) where V is numCourses and E is prerequisites count.',
          space: 'O(V + E)',
          spaceDesc: '• Adjacency list requires O(V + E) space for vertices and edges.\n• In-degree array, BFS queue, and order array each require O(V) space.\n• Total Space: O(V + E) auxiliary space.'
        }
      },
      p('Number of Connected Components in an Undirected Graph', 'Medium', 'Count connected components in an undirected graph.'),
      p('Graph Valid Tree', 'Medium', 'Check if an undirected graph forms a valid tree.'),
      p('Redundant Connection', 'Medium', 'Find the edge that creates a cycle in an undirected graph.'),
      p('Word Ladder', 'Hard', 'Find shortest transformation sequence from begin to end word.'),
    ]
  };
