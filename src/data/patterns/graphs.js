import { p } from '../helper.js';

export const graphs = {
    id: 'graphs',
    name: 'Graphs',
    problems: [
      {
        id: 'number-of-islands',
        title: 'Number of Islands',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/description/',
        image: null,
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
          idea: 'Traverse the 2D grid. When an unvisited \'1\' is found, increment the island count and use DFS to traverse and mark all 4-directionally connected land cells.',
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
          timeDesc: 'O(N * M) visits every cell at most once.',
          space: 'O(N * M)',
          spaceDesc: 'O(N * M) for visited matrix and DFS recursion stack.'
        }
      },
      {
        id: 'max-area-of-island',
        title: 'Max Area of Island',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/max-area-of-island/description/',
        image: null,
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
          idea: 'Iterate through all cells. When land 1 is found, use DFS to traverse its connected component, returning 1 plus the sum of areas from all 4 directions.',
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
          timeDesc: 'O(N * M) visits each cell at most once.',
          space: 'O(N * M)',
          spaceDesc: 'O(N * M) for visited array and recursion stack.'
        }
      },
      {
        id: 'clone-graph',
        title: 'Clone Graph',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/clone-graph/description/',
        image: null,
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
          idea: 'Traverse the graph using BFS and a HashMap to map each original node to its copy, wiring cloned neighbors without infinite loops.',
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
          timeDesc: 'O(V + E) visits every vertex and directed edge once.',
          space: 'O(V)',
          spaceDesc: 'O(V) for the hash map and queue.'
        }
      },
      {
        id: 'rotting-oranges',
        title: 'Rotting Oranges',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/rotting-oranges/description/',
        image: null,
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
          idea: 'Count fresh oranges and push all rotten oranges to a BFS queue. Spread rotting layer by layer each minute until all reachable fresh oranges turn rotten.',
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
          timeDesc: 'O(N * M) each cell processed at most once.',
          space: 'O(N * M)',
          spaceDesc: 'O(N * M) queue space for BFS.'
        }
      },
      {
        id: 'islands-and-treasure',
        title: 'Islands and Treasure',
        difficulty: 'Medium',
        leetcodeUrl: 'https://neetcode.io/problems/islands-and-treasure',
        image: null,
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
          idea: 'Enqueue all treasure chests (0) into a multi-source BFS queue, then expand level by level to compute the shortest distance to every empty land cell.',
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
          timeDesc: 'O(N * M) visits each cell at most once.',
          space: 'O(N * M)',
          spaceDesc: 'O(N * M) queue space in worst case.'
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
          idea: 'Run reverse multi-source BFS from ocean borders inland to cells of equal or greater height, then collect cells visited from both oceans.',
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
          timeDesc: 'O(N * M) each cell visited at most twice.',
          space: 'O(N * M)',
          spaceDesc: 'O(N * M) for ocean reachability matrices and queues.'
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
          idea: 'Run BFS from all border \'O\' cells to mark safe boundary regions with \'#\'. Then convert remaining \'O\'s to \'X\' and restore \'#\' back to \'O\'.',
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
          timeDesc: 'O(N * M) grid traversal and border BFS.',
          space: 'O(N * M)',
          spaceDesc: 'O(N * M) queue space for border BFS.'
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
          idea: 'Use Kahn algorithm (BFS topological sort): enqueue courses with in-degree 0 and decrement dependent courses. If total processed equals numCourses, no cycle exists.',
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
          timeDesc: 'O(V + E) building graph and Kahn BFS.',
          space: 'O(V + E)',
          spaceDesc: 'O(V + E) for adjacency list, in-degree array, and queue.'
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
          idea: 'Use Kahn algorithm to find a valid course ordering. Enqueue in-degree 0 courses and record them into the order array. Return an empty array if a cycle is detected.',
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
          timeDesc: 'O(V + E) building graph and Kahn BFS.',
          space: 'O(V + E)',
          spaceDesc: 'O(V + E) for adjacency list, in-degree array, and order array.'
        }
      },
      {
        id: 'number-of-connected-components-in-an-undirected-graph',
        title: 'Number of Connected Components in an Undirected Graph',
        difficulty: 'Medium',
        leetcodeUrl: 'https://neetcode.io/problems/count-connected-components',
        image: null,
        definition: 'You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an undirected edge between ai and bi in the graph. Return the number of connected components in the graph.',
        examples: [
          {
            input: 'n = 5, edges = [[0,1],[1,2],[3,4]]',
            output: '2',
            explanation: 'Component 1 is {0, 1, 2} and Component 2 is {3, 4}. Total = 2.'
          },
          {
            input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]',
            output: '1',
            explanation: 'All 5 nodes are connected together in a single component.'
          }
        ],
        optimal: {
          idea: 'Build an undirected adjacency list and loop through all vertices. When an unvisited vertex is found, increment component count and traverse it completely with DFS.',
          code: `class Solution {
    public int countComponents(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>(); // : O(V + E) adjacency list
        for (int i = 0; i < n; i++) { // : O(V) initialize nodes
            adj.add(new ArrayList<>());
        }

        for (int edge[] : edges) { // : O(E) build undirected edges
            int u = edge[0];
            int v = edge[1];

            adj.get(u).add(v);
            adj.get(v).add(u);
        }

        boolean visited[] = new boolean[n]; // : O(V) visited array
        int count = 0;

        for (int i = 0; i < n; i++) { // : O(V) scan each node
            if (!visited[i]) {
                dfs(adj, visited, i); // : traverse connected component
                count++;
            }
        }

        return count;
    }

    private void dfs(List<List<Integer>> adj, boolean[] visited, int node) {
        visited[node] = true;

        for (int neighbor : adj.get(node)) { // : explore neighboring nodes
            if (!visited[neighbor]) {
                dfs(adj, visited, neighbor);
            }
        }
    }
}`,
          time: 'O(V + E)',
          timeDesc: 'O(V + E) visits every vertex and edge once.',
          space: 'O(V + E)',
          spaceDesc: 'O(V + E) for adjacency list and visited array.'
        }
      },
      {
        id: 'graph-valid-tree',
        title: 'Graph Valid Tree',
        difficulty: 'Medium',
        leetcodeUrl: 'https://neetcode.io/problems/valid-tree',
        image: null,
        definition: 'Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree. A valid tree must be fully connected and contain no cycles.',
        examples: [
          {
            input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]',
            output: 'true',
            explanation: 'All 5 nodes are connected and there are exactly 4 edges with no cycles, forming a valid tree.'
          },
          {
            input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]',
            output: 'false',
            explanation: 'The edges [1,2], [2,3], and [1,3] form a cycle.'
          }
        ],
        optimal: {
          idea: 'A graph is a valid tree if it has exactly n - 1 edges and is fully connected. Verify edge count, then run DFS to confirm all n nodes are reachable from node 0.',
          code: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) {
            return false;
        }

        List<List<Integer>> adj = new ArrayList<>(); // : O(V + E) adjacency list
        for (int i = 0; i < n; i++) { // : O(V) initialize nodes
            adj.add(new ArrayList<>());
        }

        for (int edge[] : edges) { // : O(E) build undirected edges
            int u = edge[0];
            int v = edge[1];

            adj.get(u).add(v);
            adj.get(v).add(u);
        }

        boolean visited[] = new boolean[n]; // : O(V) visited array

        dfs(adj, visited, 0); // : traverse from root node 0

        for (boolean isVisited : visited) { // : O(V) check all nodes connected
            if (!isVisited) {
                return false;
            }
        }

        return true;
    }

    private void dfs(List<List<Integer>> adj, boolean[] visited, int node) {
        visited[node] = true;

        for (int neighbor : adj.get(node)) { // : explore neighboring nodes
            if (!visited[neighbor]) {
                dfs(adj, visited, neighbor);
            }
        }
    }
}`,
          time: 'O(V + E)',
          timeDesc: 'O(V + E) building graph and DFS traversal.',
          space: 'O(V + E)',
          spaceDesc: 'O(V + E) for adjacency list and visited array.'
        }
      },
      {
        id: 'redundant-connection',
        title: 'Redundant Connection',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/description/',
        image: null,
        definition: 'In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph. Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.',
        examples: [
          {
            input: 'edges = [[1,2],[1,3],[2,3]]',
            output: '[2,3]',
            explanation: 'Removing [2,3] breaks the cycle and restores a valid tree structure.'
          },
          {
            input: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]',
            output: '[1,4]',
            explanation: 'Both [1,2], [2,3], [3,4], and [1,4] form a cycle. [1,4] occurs later in the input and is returned.'
          }
        ],
        optimal: {
          idea: 'Process edges one by one: check with DFS if both endpoints are already connected. If yes, that edge creates a cycle and is redundant; otherwise add it to the graph.',
          code: `class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;

        List<List<Integer>> adj = new ArrayList<>(); // : O(V + E) adjacency list
        for (int i = 0; i <= n; i++) { // : O(V) 1-based indexing
            adj.add(new ArrayList<>());
        }

        for (int edge[] : edges) { // : iterate through input edges
            int u = edge[0];
            int v = edge[1];

            boolean visited[] = new boolean[n + 1]; // : O(V) visited array per edge
            if (dfs(adj, visited, u, v)) { // : check if u and v already connected
                return edge;
            }

            adj.get(u).add(v);
            adj.get(v).add(u);
        }

        return new int[] {};
    }

    private boolean dfs(List<List<Integer>> adj, boolean[] visited, int u, int v) {
        visited[u] = true;

        if (u == v) {
            return true;
        }

        for (int neighbor : adj.get(u)) { // : explore neighbors
            if (!visited[neighbor]) {
                if (dfs(adj, visited, neighbor, v)) {
                    return true;
                }
            }
        }

        return false;   
    }
}`,
          time: 'O(N^2)',
          timeDesc: 'O(N²) DFS connectivity check for each edge.',
          space: 'O(N)',
          spaceDesc: 'O(N) for adjacency list and visited array.'
        }
      },
      {
        id: 'word-ladder',
        title: 'Word Ladder',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/word-ladder/description/',
        image: null,
        definition: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by a single letter, and each si is in wordList. Note that beginWord does not need to be in wordList. Return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.',
        examples: [
          {
            input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
            output: '5',
            explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which has 5 words.'
          },
          {
            input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
            output: '0',
            explanation: 'The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.'
          }
        ],
        optimal: {
          idea: 'Run BFS from beginWord mutating one character at a time from \'a\' to \'z\'. If a mutation exists in the dictionary, enqueue it and remove it to find the shortest transformation sequence.',
          code: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList); // : O(N * L) dictionary set

        if (!set.contains(endWord)) {
            return 0;
        }

        Queue<String> queue = new LinkedList<>(); // : O(N * L) queue space
        queue.offer(beginWord);
        set.remove(beginWord);

        int steps = 1;
        while (!queue.isEmpty()) { // : level-by-level BFS traversal
            int size = queue.size();

            for (int i = 0; i < size; i++) { // : process current level words
                String curr = queue.poll();

                if (curr.equals(endWord)) {
                    return steps;
                }

                char arr[] = curr.toCharArray();   
                for (int j = 0; j < arr.length; j++) { // : loop word length L
                    char original = arr[j];

                    for (char ch = 'a'; ch <= 'z'; ch++) { // : try 26 alphabet letters
                        arr[j] = ch;

                        String newWord = new String(arr);
                        if (set.contains(newWord)) {
                            queue.offer(newWord);
                            set.remove(newWord);
                        }
                    }

                    arr[j] = original;
                }             
            }

            steps++;
        }

        return 0;
    }
}`,
          time: 'O(N * L^2)',
          timeDesc: 'O(N * L²) BFS scanning 26 mutations per character.',
          space: 'O(N * L)',
          spaceDesc: 'O(N * L) for hash set and BFS queue.'
        }
      },
      {
        id: 'network-delay-time',
        title: 'Network Delay Time',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/description/',
        image: null,
        definition: 'You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.',
        examples: [
          {
            input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2',
            output: '2',
            explanation: 'Signal starts at node 2. Reaches 1 and 3 in time 1, and reaches 4 through node 3 in time 1 + 1 = 2.'
          },
          {
            input: 'times = [[1,2,1]], n = 2, k = 1',
            output: '1',
            explanation: 'Signal travels from 1 to 2 in 1 unit of time.'
          },
          {
            input: 'times = [[1,2,1]], n = 2, k = 2',
            output: '-1',
            explanation: 'Signal cannot reach node 1 starting from node 2.'
          }
        ],
        optimal: {
          idea: 'Run Dijkstra algorithm with a min-heap from starting node k to find the shortest delivery time to all nodes, then return the maximum time.',
          code: `class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        // [[u] -> [v, w]]
        List<List<int[]>> adj = new ArrayList<>(); // : O(V + E) adjacency list
        for (int i = 0; i <= n; i++) { // : O(V) 1-based indexing
            adj.add(new ArrayList<>());
        }

        for (int edge[] : times) { // : O(E) build directed weighted edges
            int u = edge[0];
            int v = edge[1];
            int wt = edge[2];

            adj.get(u).add(new int[] {v, wt});
        }

        int dist[] = new int[n + 1]; // : O(V) shortest distance array
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;

        // [distance, node]
        PriorityQueue<int[]> pq = new PriorityQueue<>( // : min-heap ordered by distance
            (a, b) -> a[0] - b[0]
        );
        pq.offer(new int[] {0, k});

        while (!pq.isEmpty()) { // : Dijkstra shortest path expansion
            int pair[] = pq.poll();
            int currDistance = pair[0];
            int node = pair[1];

            for (int neighbor[] : adj.get(node)) { // : relax neighbor edges
                int v = neighbor[0];
                int wt = neighbor[1];

                if (currDistance + wt < dist[v]) {
                    dist[v] = currDistance + wt;
                    pq.offer(new int[] {dist[v], v});
                }
            }
        }

        int answer = 0;
        for (int i = 1; i <= n; i++) { // : O(V) check all nodes reachable
            if (dist[i] == Integer.MAX_VALUE) {
                return -1;
            }

            answer = Math.max(answer, dist[i]);
        }

        return answer;
    }
}`,
          time: 'O(E log V)',
          timeDesc: 'O(E log V) min-heap Dijkstra traversal.',
          space: 'O(V + E)',
          spaceDesc: 'O(V + E) for adjacency list, distances, and priority queue.'
        }
      },
      {
        id: 'cheapest-flights-within-k-stops',
        title: 'Cheapest Flights Within K Stops',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/description/',
        image: null,
        definition: 'There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei. You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.',
        examples: [
          {
            input: 'n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1',
            output: '700',
            explanation: 'The optimal path with at most 1 stop from city 0 to 3 is 0 -> 1 -> 3 with cost 100 + 600 = 700. The path 0 -> 1 -> 2 -> 3 costs 400 but requires 2 stops, which exceeds k = 1.'
          },
          {
            input: 'n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1',
            output: '200',
            explanation: 'The optimal path with at most 1 stop is 0 -> 1 -> 2 with cost 100 + 100 = 200.'
          },
          {
            input: 'n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0',
            output: '500',
            explanation: 'With 0 stops, only direct flight 0 -> 2 is allowed costing 500.'
          }
        ],
        optimal: {
          idea: 'Use BFS level-by-level tracking stops and accumulated cost, pruning paths when stops exceed k.',
          code: `class Solution {
    class Pair {
        int stops;
        int node;
        int cost;

        Pair(int stops, int node, int cost) {
            this.stops = stops;
            this.node = node;
            this.cost = cost;
        }
    }

    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        List<List<int[]>> adj = new ArrayList<>(); // : O(V + E) adjacency list
        for (int i = 0; i < n; i++) { // : O(V) initialize city nodes
            adj.add(new ArrayList<>());
        }

        for (int[] flight : flights) { // : O(E) build directed flight edges
            int u = flight[0];
            int v = flight[1];
            int price = flight[2];

            adj.get(u).add(new int[]{v, price});
        }

        int cost[] = new int[n]; // : O(V) minimum cost array
        Arrays.fill(cost, Integer.MAX_VALUE);

        Queue<Pair> queue = new LinkedList<>(); // : O(V) BFS queue
        queue.offer(new Pair(0, src, 0));

        cost[src] = 0;

        while (!queue.isEmpty()) { // : level-by-level BFS constrained by stops
            Pair curr = queue.poll();
            int stops = curr.stops;
            int node = curr.node;
            int currCost = curr.cost;

            if (stops > k) {
                break;
            }

            for (int neighbor[] : adj.get(node)) { // : explore outgoing flights
                int v = neighbor[0];
                int price = neighbor[1];

                if (currCost + price < cost[v]) {
                    cost[v] = currCost + price;
                    queue.offer(new Pair(stops + 1, v, cost[v]));
                }
            }
        }

        return cost[dst] == Integer.MAX_VALUE ? -1 : cost[dst];
    }
}`,
          time: 'O(K * E)',
          timeDesc: 'O(K * E) traversing up to K + 1 levels of flights.',
          space: 'O(V + E)',
          spaceDesc: 'O(V + E) for adjacency list, costs, and queue.'
        }
      },
      {
        id: 'min-cost-to-connect-all-points',
        title: 'Min Cost to Connect All Points',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/min-cost-to-connect-all-points/description/',
        image: null,
        definition: 'You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi]. The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val. Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.',
        examples: [
          {
            input: 'points = [[0,0],[2,2],[3,10],[5,2],[7,0]]',
            output: '20',
            explanation: 'Connect points to form a minimum spanning tree: (0,0)-(2,2) cost 4, (2,2)-(5,2) cost 3, (5,2)-(7,0) cost 4, (3,10)-(5,2) cost 9. Total cost = 4 + 3 + 4 + 9 = 20.'
          },
          {
            input: 'points = [[3,12],[-2,5],[-4,1]]',
            output: '18',
            explanation: 'Connect (-4,1)-(-2,5) cost 6 and (-2,5)-(3,12) cost 12. Total cost = 18.'
          }
        ],
        optimal: {
          idea: 'Use Prim algorithm with a min-heap to greedily add the closest unvisited point using Manhattan distance until an MST is formed.',
          code: `class Solution {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length;

        int sum = 0;
        boolean visited[] = new boolean[n]; // : O(V) visited array
        int connected = 0;

        // [weight, node]
        PriorityQueue<int[]> pq = new PriorityQueue<>( // : min-heap ordered by edge weight
            (a, b) -> a[0] - b[0]
        );

        pq.offer(new int[] {0, 0});

        while (!pq.isEmpty()) { // : Prim algorithm MST expansion
            int curr[] = pq.poll();
            int wt = curr[0];
            int node = curr[1];

            if (visited[node]) {
                continue;
            }

            visited[node] = true;
            sum += wt;
            connected++;

            if (connected == n) {
                break;
            }

            for (int neighbor = 0; neighbor < n; neighbor++) { // : O(V) compute Manhattan distance to all neighbors
                if (!visited[neighbor]) {
                    int edgeWt = Math.abs(points[node][0] - points[neighbor][0]) + Math.abs(points[node][1] - points[neighbor][1]);
                    pq.offer(new int[] {edgeWt, neighbor});
                }
            }
        }

        return sum;
    }
}`,
          time: 'O(V^2 log V)',
          timeDesc: 'O(V² log V) computing distances and pushing to min-heap.',
          space: 'O(V^2)',
          spaceDesc: 'O(V²) for priority queue edges and visited array.'
        }
      },
      {
        id: 'swim-in-rising-water',
        title: 'Swim in Rising Water',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/swim-in-rising-water/description/',
        image: null,
        definition: 'You are given an n x n integer matrix grid where each cell (i, j) has elevation grid[i][j]. The rain starts to fall at time t = 0. At time t, the depth of the water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares is at most t. You can swim infinite distances in zero time. You must stay within the boundaries of the grid during your swim. Return the least time until you can reach the bottom right square (n - 1, n - 1) starting from the top left square (0, 0).',
        examples: [
          {
            input: 'grid = [[0,2],[1,3]]',
            output: '3',
            explanation: 'At time 0, you are in (0,0). You cannot swim to any neighbor until t = 1, then t = 2, and finally at t = 3 the water rises enough to reach (1,1).'
          },
          {
            input: 'grid = [\n  [0,1,2,3,4],\n  [24,23,22,21,5],\n  [12,13,14,15,16],\n  [11,17,18,19,20],\n  [10,9,8,7,6]\n]',
            output: '16',
            explanation: 'The optimal path follows the perimeter to reach (4,4) at time 16.'
          }
        ],
        optimal: {
          idea: 'Run Dijkstra on the grid with a min-heap to minimize the maximum cell elevation encountered along the path from (0, 0) to (n - 1, n - 1).',
          code: `class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length;

        boolean visited[][] = new boolean[n][n]; // : O(N^2) visited matrix

        // [maximum time so far, row, col]
        PriorityQueue<int[]> pq = new PriorityQueue<>( // : min-heap ordered by elevation
            (a, b) -> a[0] - b[0]
        );

        pq.offer(new int[] {grid[0][0], 0, 0});

        int[] dRow = {-1, 1, 0, 0};
        int[] dCol = {0, 0, -1, 1};

        while (!pq.isEmpty()) { // : Dijkstra minimax expansion
            int curr[] = pq.poll();
            int time = curr[0];
            int row = curr[1];
            int col = curr[2];

            if (visited[row][col]) {
                continue;
            }

            visited[row][col] = true;

            if (row == n - 1 && col == n - 1) {
                return time;
            }

            for (int i = 0; i < 4; i++) { // : 4-directional neighbor exploration
                int newRow = row + dRow[i];
                int newCol = col + dCol[i];

                if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && !visited[newRow][newCol]) {
                    int newTime = Math.max(time, grid[newRow][newCol]);
                    pq.offer(new int[]{newTime, newRow, newCol});
                }
            }
        }

        return -1;
    }
}`,
          time: 'O(N^2 log N)',
          timeDesc: 'O(N² log N) pushing grid cells into min-heap.',
          space: 'O(N^2)',
          spaceDesc: 'O(N²) for visited matrix and priority queue.'
        }
      },
      p('Alien Dictionary', 'Hard', 'Derive character order from a sorted alien dictionary.'),
      p('Reconstruct Itinerary', 'Hard', 'Reconstruct a travel itinerary from flight tickets (Eulerian path).'),
    ]
  };
