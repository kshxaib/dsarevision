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
      p('Cheapest Flights Within K Stops', 'Medium', 'Find cheapest flight path with at most k stops.'),
      p('Min Cost to Connect All Points', 'Medium', 'Find minimum cost to connect all points (MST).'),
      p('Swim in Rising Water', 'Hard', 'Find minimum time to swim from top-left to bottom-right.'),
      p('Alien Dictionary', 'Hard', 'Derive character order from a sorted alien dictionary.'),
      p('Reconstruct Itinerary', 'Hard', 'Reconstruct a travel itinerary from flight tickets (Eulerian path).'),
    ]
  };
