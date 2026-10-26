import { p } from '../helper.js';
import numIslandsTree from '@/assets/images/graph/DFS Recursion Tree for Number of Islands.png';

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

        if (grid == null || n == 0 || m == 0) { // : O(1) edge case
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
      p('Max Area of Island', 'Medium', 'Find the island with the maximum area.'),
      p('Clone Graph', 'Medium', 'Deep copy an undirected graph.'),
      p('Rotting Oranges', 'Medium', 'Find minimum time for all oranges to become rotten.'),
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
