import { p } from '../helper.js';

export const advancedGraphs = {
    id: 'advanced-graphs',
    name: 'Advanced Graphs',
    icon: '🗺️',
    problems: [
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
          idea: '• **Pattern:** Dijkstra Algorithm (Single-Source Shortest Path with Min-Heap)\n• **Adjacency Representation:** Build a directed adjacency list storing `(neighbor, weight)` pairs for each node using 1-based indexing.\n• **Distance Array and Min-Heap:** Initialize `dist[]` with infinity (`Integer.MAX_VALUE`) and set `dist[k] = 0`. Use a min-heap priority queue storing `[currentDistance, node]` ordered by distance.\n• **Dijkstra Relaxation:** Dequeue the pair with the smallest distance. For each directed neighbor, if traveling through the current node yields a shorter distance (`currDistance + wt < dist[v]`), relax `dist[v]` and push the updated `[dist[v], v]` into the priority queue.\n• **Max Latency:** After exhausting the priority queue, find the maximum value in `dist[1..n]`. If any node remains unreachable (distance still infinity), return -1; otherwise, return the maximum time.',
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
          timeDesc: '• Each edge can be pushed into the min-heap at most once during relaxation.\n• Priority queue insertions and removals take O(log V) time per operation.\n• Total Time: O(E log V) where E is times length and V is n.',
          space: 'O(V + E)',
          spaceDesc: '• Adjacency list requires O(V + E) space to store graph vertices and directed edges.\n• Distance array and min-heap priority queue require O(V) memory.\n• Total Space: O(V + E) auxiliary space.'
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
          idea: '• **Pattern:** Level-by-Level BFS with Pruning (Modified Bellman-Ford or Dijkstra by Stops)\n• **Adjacency Representation:** Build a directed adjacency list storing `(neighbor, price)` pairs for each city node.\n• **Cost Array and Queue:** Maintain a `cost[]` array initialized to infinity, setting `cost[src] = 0`. Use a queue storing `Pair(stops, node, cost)` starting from `Pair(0, src, 0)`.\n• **Stop-Constrained Traversal:** Dequeue elements step by step. If `stops > k`, prune further path expansions since exceeding k stops is invalid.\n• **Cost Relaxation:** For each outgoing flight from `node`, if reaching `neighbor` via the current flight yields a cheaper total price (`currCost + price < cost[v]`), update `cost[v]` and enqueue `Pair(stops + 1, v, cost[v])`.\n• **Destination Result:** Once BFS completes, return `cost[dst]` if reachable, or `-1` if no valid flight path exists.',
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
          timeDesc: '• BFS explores at most K + 1 levels of flights.\n• Across each stop level, at most E flight edges are relaxed.\n• Total Time: O(K * E) where K is max stops and E is flights count.',
          space: 'O(V + E)',
          spaceDesc: '• Adjacency list requires O(V + E) space to store cities and flights.\n• BFS queue and cost array require O(V) memory.\n• Total Space: O(V + E) auxiliary space.'
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
          idea: '• **Pattern:** Prim Algorithm for Minimum Spanning Tree (MST with Min-Heap)\n• **Greedy Cut Property:** Start from any point (point 0 with edge weight 0) and grow the MST by greedily picking the unvisited point with the smallest Manhattan distance to the current tree.\n• **Min-Heap Priority Queue:** Maintain a min-heap storing `[weight, node]` ordered by edge weight, along with a `boolean visited[]` array.\n• **MST Expansion:** Repeatedly pop the lowest-cost edge. If the node is already visited, discard it. Otherwise, mark `visited[node] = true`, accumulate `sum += wt`, and push all edges to unvisited neighbor points with their Manhattan distance.\n• **Termination:** Once all points are connected into the spanning tree, return the total accumulated `sum`.',
          code: `class Solution {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length;

        int sum = 0;
        boolean visited[] = new boolean[n]; // : O(V) visited array

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
          timeDesc: '• There are V vertices and up to V^2 possible edges in the complete coordinate graph.\n• Each edge can be inserted into the min-heap taking O(log V) time per operation.\n• Total Time: O(V^2 log V) where V is points length.',
          space: 'O(V^2)',
          spaceDesc: '• Min-heap priority queue can store up to V^2 edges in the worst case.\n• Visited boolean array requires O(V) memory.\n• Total Space: O(V^2) auxiliary space for the priority queue.'
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
          idea: '• **Pattern:** Modified Dijkstra Algorithm on 2D Grid (Minimax Path)\n• **Minimax Objective:** We want to reach the destination `(n - 1, n - 1)` while minimizing the maximum elevation encountered along the path.\n• **Min-Heap Priority Queue:** Store `[maxTimeSoFar, row, col]` in a min-heap priority queue, initialized with `[grid[0][0], 0, 0]`, along with a 2D boolean `visited[n][n]` array.\n• **Expansion with Monotonic Time:** Pop the state with the lowest maximum time. If already visited, skip it. If the bottom-right cell is reached, return `time` immediately.\n• **4-Directional Transitions:** For each unvisited adjacent cell `(newRow, newCol)`, the required time becomes `newTime = Math.max(time, grid[newRow][newCol])`. Push `[newTime, newRow, newCol]` to the priority queue.',
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
          timeDesc: '• There are N^2 cells in the grid, each added to the min-heap at most once.\n• Priority queue operations take O(log N^2) which simplifies to O(log N) time.\n• Total Time: O(N^2 log N) where N is grid side length.',
          space: 'O(N^2)',
          spaceDesc: '• boolean visited matrix of size N x N takes O(N^2) memory.\n• Priority queue holds at most O(N^2) cells at any time.\n• Total Space: O(N^2) auxiliary space.'
        }
      },
      p('Alien Dictionary', 'Hard', 'Derive character order from a sorted alien dictionary.'),
      p('Reconstruct Itinerary', 'Hard', 'Reconstruct a travel itinerary from flight tickets (Eulerian path).'),
    ]
  };
