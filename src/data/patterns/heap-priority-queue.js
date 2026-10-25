import { p } from '../helper.js';

export const heapPriorityQueue = {
    id: 'heap-priority-queue',
    name: 'Heap & Priority Queue',
    icon: '⏫',
    problems: [
      {
        id: 'kth-largest-element-in-an-array',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/description/',
        definition: 'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting?',
        examples: [
          {
            input: 'nums = [3,2,1,5,6,4], k = 2',
            output: '5',
            explanation: 'The sorted array is [1,2,3,4,5,6], and the 2nd largest element is 5.'
          },
          {
            input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4',
            output: '4',
            explanation: 'The sorted array is [1,2,2,3,3,4,5,5,6], and the 4th largest element is 4.'
          }
        ],
        optimal: {
          idea: 'Maintain a Min-Heap of size k. Add the first k elements into the heap. For each remaining element, if it is greater than the smallest element currently in the heap (pq.peek()), pop the root and push the new element. At the end, the heap contains the k largest elements seen, and pq.peek() is precisely the kth largest element.',
          code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        for (int i = 0; i < k; i++) {
            pq.add(nums[i]);
        }

        for (int i = k; i < nums.length; i++) {
            int curr = nums[i];

            if (curr > pq.peek()) {
                pq.remove();
                pq.add(curr);
            }
        }

        return pq.peek();
    }
}`,
          time: 'O(N log k)',
          timeDesc: '• Pushing first k elements: O(k log k)\n• Processing remaining (N - k) elements: at most O((N - k) log k)\n• Total Time: O(N log k), significantly faster than O(N log N) sorting when k << N.',
          space: 'O(k)',
          spaceDesc: '• The priority queue holds at most k elements simultaneously.',
          walkthrough: [
            'Initialize a standard Min-Heap (PriorityQueue<Integer> pq) where the smallest element is at the root.',
            'Push the first k elements of nums into pq.',
            'Iterate from index k to nums.length - 1. For each number curr, compare it with pq.peek().',
            'If curr > pq.peek(), remove the smallest element with pq.remove() and add curr via pq.add(curr).',
            'Return pq.peek(). The heap now holds the k largest elements, with the kth largest sitting at the top.'
          ]
        }
      },
      {
        id: 'last-stone-weight',
        title: 'Last Stone Weight',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/last-stone-weight/description/',
        youtubeUrl: 'https://www.youtube.com/watch?v=8txOQt0ZwTg',
        definition: 'You are given an array of integers stones where stones[i] is the weight of the ith stone. We play a game with the stones. On each turn, we choose the heaviest two stones with weights x and y with x <= y. If x == y, both stones are destroyed. If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x. At the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return 0.',
        examples: [
          {
            input: 'stones = [2,7,4,1,8,1]',
            output: '1',
            explanation: 'We combine 7 and 8 to get 1, array becomes [2,4,1,1,1].\nCombine 2 and 4 to get 2, array becomes [2,1,1,1].\nCombine 2 and 1 to get 1, array becomes [1,1,1].\nCombine 1 and 1 to get 0, array becomes [1]. Last stone is 1.'
          },
          {
            input: 'stones = [1]',
            output: '1',
            explanation: 'Only one stone is present, so its weight is 1.'
          }
        ],
        optimal: {
          idea: 'Use a Max-Heap (PriorityQueue with Collections.reverseOrder()) to always extract the two heaviest stones in O(log N) time. Repeatedly extract the top two stones x and y. If x != y, push the difference (x - y) back into the heap. Continue until at most 1 stone remains.',
          code: `class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());

        for (int stone : stones) {
            pq.add(stone);
        }

        while (pq.size() > 1) {
            int x = pq.poll();
            int y = pq.poll();

            if (x != y) {
                pq.add(x - y);
            }
        }

        return pq.isEmpty() ? 0 : pq.peek();
    }
}`,
          time: 'O(N log N)',
          timeDesc: '• Inserting N elements into Max-Heap: O(N log N)\n• At most (N - 1) collision iterations, each performing poll/add operations: O(N log N)\n• Overall Time Complexity: O(N log N).',
          space: 'O(N)',
          spaceDesc: '• The PriorityQueue holds up to N stone weights simultaneously.',
          walkthrough: [
            'Create a Max-Heap using PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder()).',
            'Add all stone weights into the Max-Heap.',
            'While pq.size() > 1, extract the two largest stones: x = pq.poll() and y = pq.poll().',
            'Since x >= y, if x != y, insert the remaining fragment (x - y) back into pq.',
            'When the loop ends (at most 1 stone left), return pq.isEmpty() ? 0 : pq.peek().'
          ]
        }
      },
      {
        id: 'k-closest-points-to-origin',
        title: 'K Closest Points to Origin',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/description/',
        youtubeUrl: 'https://www.youtube.com/watch?v=rI2EBUEMfTk',
        definition: 'Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0). The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)² + (y1 - y2)²). You may return the answer in any order.',
        examples: [
          {
            input: 'points = [[1,3],[-2,2]], k = 1',
            output: '[[-2,2]]',
            explanation: 'The distance between (1, 3) and origin is sqrt(10).\nThe distance between (-2, 2) and origin is sqrt(8).\nSince sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.'
          },
          {
            input: 'points = [[3,3],[5,-1],[-2,4]], k = 2',
            output: '[[3,3],[-2,4]]',
            explanation: 'The answer [[-2,4],[3,3]] would also be accepted.'
          }
        ],
        optimal: {
          idea: 'Use squared Euclidean distance (x² + y²) to avoid expensive sqrt computations. Store coordinates in a Min-Heap configured with a custom lambda comparator comparing distance from the origin. Insert all points, then extract the top k points with pq.poll().',
          code: `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(a[0] * a[0] + a[1] * a[1], b[0] * b[0] + b[1] * b[1])
        );

        for (int point[] : points) {
            pq.add(point);
        }

        int result[][] = new int[k][2];
        for (int i = 0; i < k; i++) {
            result[i] = pq.poll();
        }

        return result;
    }
}`,
          time: 'O(N log N)',
          timeDesc: '• Adding all N points to the Min-Heap: O(N log N)\n• Extracting the top k points: O(k log N)\n• Overall Time Complexity: O(N log N).',
          space: 'O(N)',
          spaceDesc: '• The PriorityQueue holds all N points in memory.',
          walkthrough: [
            'Initialize a Min-Heap PriorityQueue<int[]> with a custom comparator comparing Euclidean distance: Integer.compare(a[0]*a[0] + a[1]*a[1], b[0]*b[0] + b[1]*b[1]).',
            'Iterate through points and add each coordinate pair [x, y] to the heap.',
            'Create a 2D result array of dimensions k x 2.',
            'Loop k times and assign result[i] = pq.poll(), retrieving points in ascending order of distance from origin.',
            'Return the populated result array.'
          ]
        }
      },
      {
        id: 'kth-largest-element-in-a-stream',
        title: 'Kth Largest Element in a Stream',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/description/',
        definition: 'Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element. Implement the KthLargest class:\n• KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.\n• int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.',
        examples: [
          {
            input: '["KthLargest", "add", "add", "add", "add", "add"]\n[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]',
            output: '[null, 4, 5, 5, 8, 8]',
            explanation: 'KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);\nkthLargest.add(3);   // return 4\nkthLargest.add(5);   // return 5\nkthLargest.add(10);  // return 5\nkthLargest.add(9);   // return 8\nkthLargest.add(4);   // return 8'
          }
        ],
        optimal: {
          idea: 'Maintain a Min-Heap of size at most k. The smallest element among the top k largest is always at the root (pq.peek()). When adding a new value, if the heap has fewer than k elements or val > pq.peek(), insert val and evict the minimum if size exceeds k.',
          code: `class KthLargest {
    PriorityQueue<Integer> pq;
    int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        pq = new PriorityQueue<>();

        for (int i = 0; i < nums.length; i++) {
            add(nums[i]);
        }
    }
    
    public int add(int val) {
        if (pq.size() < k || val > pq.peek()) {
            pq.add(val);

            if (pq.size() > k) {
                pq.remove();
            }
        }

        return pq.peek();
    }
}`,
          time: 'Constructor: O(N log k), add: O(log k)',
          timeDesc: '• Constructor: Calls add() for N elements, taking O(N log k) time.\n• add(val): In the worst case, one push and one pop on a heap of size k: O(log k) time.',
          space: 'O(k)',
          spaceDesc: '• The Min-Heap contains at most k elements at any point.',
          walkthrough: [
            'Maintain a Min-Heap PriorityQueue<Integer> pq and the threshold size k.',
            'Constructor: Initialize the Min-Heap and insert all initial nums using the add() method.',
            'add(val): If the heap holds fewer than k elements, or val is greater than pq.peek(), add val to pq.',
            'If pq.size() exceeds k after insertion, remove the root element with pq.remove() so the heap stays at size k.',
            'Return pq.peek(), which is the kth largest element overall.'
          ]
        }
      },
      {
        id: 'task-scheduler',
        title: 'Task Scheduler',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/description/',
        youtubeUrl: 'https://www.youtube.com/watch?v=rYh-Kkbzsnw',
        definition: 'Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle. However, there is a non-negative integer n that represents the cooldown period between two same tasks, meaning there must be at least n units of time between any two identical tasks. Return the least number of units of time that the CPU will take to finish all the given tasks.',
        examples: [
          {
            input: 'tasks = ["A","A","A","B","B","B"], n = 2',
            output: '8',
            explanation: 'A -> B -> idle -> A -> B -> idle -> A -> B\nThere are at least 2 units of time between identical tasks. Total intervals = 8.'
          },
          {
            input: 'tasks = ["A","C","A","B","D","B"], n = 1',
            output: '6',
            explanation: 'A -> B -> C -> A -> D -> B\nNo idle units are needed because cooldown is 1. Total intervals = 6.'
          }
        ],
        optimal: {
          idea: 'Greedily schedule the most frequent tasks first using a Max-Heap. In each cycle of length (n + 1), poll up to (n + 1) highest-frequency tasks, decrement their remaining count, and re-add them if non-zero. If the heap becomes empty, add the exact tasks executed (temp.size()); otherwise, add the full (n + 1) frame including any idle slots.',
          code: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        Map<Character, Integer> map = new HashMap<>();
        for (char task : tasks) {
            map.put(task, map.getOrDefault(task, 0) + 1);   
        }

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int count : map.values()) {
            maxHeap.add(count);
        }

        int time = 0;
        while (!maxHeap.isEmpty()) {
            List<Integer> temp = new ArrayList<>();

            // if we add A then we can place A again at n+1 place
            for (int i = 1; i <= n + 1; i++) {
                if (!maxHeap.isEmpty()) {
                    int freq = maxHeap.poll();
                    freq--;

                    temp.add(freq);
                }
            }

            for (int i = 0; i < temp.size(); i++) {
                if (temp.get(i) > 0) {
                    maxHeap.add(temp.get(i));
                }
            }

            time += maxHeap.isEmpty() ? temp.size() : n + 1;
        }

        return time;
    }
}`,
          time: 'O(N)',
          timeDesc: '• Counting frequencies: O(N) where N is the total number of tasks.\n• Heap operations: limited to at most 26 unique characters, so each round takes O(26 log 26) = O(1).\n• Overall Time Complexity: O(N).',
          space: 'O(1)',
          spaceDesc: '• HashMap, Max-Heap, and temp list store at most 26 elements (uppercase English alphabet).',
          walkthrough: [
            'Count task frequencies using a HashMap<Character, Integer>.',
            'Insert all frequency values into a Max-Heap PriorityQueue<Integer>(Collections.reverseOrder()).',
            'Process in rounds of (n + 1) slots (the minimum gap needed before repeating a task).',
            'In each round, poll up to (n + 1) most frequent tasks, decrement their frequency by 1, and record them in a temp list.',
            'Push all remaining tasks with count > 0 from temp back into the Max-Heap.',
            'If maxHeap is empty, add temp.size() to time (the final round needs no trailing idles); otherwise add (n + 1).',
            'Return total time.'
          ]
        }
      },
      {
        id: 'find-median-from-data-stream',
        title: 'Find Median from Data Stream',
        difficulty: 'Hard',
        leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/description/',
        definition: 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the MedianFinder class:\n• MedianFinder() initializes the MedianFinder object.\n• void addNum(int num) adds the integer num from the data stream to the data structure.\n• double findMedian() returns the median of all elements so far. Answers within 10⁻⁵ of the actual answer will be accepted.',
        examples: [
          {
            input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]',
            output: '[null, null, null, 1.5, null, 2.0]',
            explanation: 'MedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)\nmedianFinder.addNum(3);    // arr = [1, 2, 3]\nmedianFinder.findMedian(); // return 2.0'
          }
        ],
        optimal: {
          idea: 'Use the Two-Heaps pattern: a Max-Heap for the smaller half of numbers and a Min-Heap for the larger half. For each incoming number, push to maxHeap and pass its maximum to minHeap. If minHeap grows larger than maxHeap, rebalance by pushing minHeap.poll() back to maxHeap. This ensures maxHeap holds either the same number of elements or one more than minHeap, allowing O(1) median retrieval.',
          code: `class MedianFinder {
    PriorityQueue<Integer> maxHeap;
    PriorityQueue<Integer> minHeap;

    public MedianFinder() {
        maxHeap = new PriorityQueue<>((a, b) -> b - a);
        minHeap = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        maxHeap.offer(num);

        minHeap.offer(maxHeap.poll());

        if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }
    
    public double findMedian() {
        if (maxHeap.size() == minHeap.size()) {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }

        return maxHeap.peek();
    }
}`,
          time: 'addNum: O(log N), findMedian: O(1)',
          timeDesc: '• addNum(num): Constant number of heap offer/poll operations on heaps of size N/2, taking O(log N) time.\n• findMedian(): Directly reads peek() of one or both heaps in O(1) time.',
          space: 'O(N)',
          spaceDesc: '• All N numbers in the stream are stored across the two heaps.',
          walkthrough: [
            'Maintain two heaps: maxHeap for the lower half and minHeap for the upper half.',
            'addNum(num): Offer num to maxHeap, then transfer the largest lower-half value (maxHeap.poll()) to minHeap.',
            'Balance: If minHeap has more elements than maxHeap, transfer minHeap.poll() to maxHeap. This guarantees maxHeap.size() >= minHeap.size().',
            'findMedian(): If sizes are equal, the median is the arithmetic mean of both tops: (maxHeap.peek() + minHeap.peek()) / 2.0.',
            'If sizes are unequal (odd total count), maxHeap contains the exact median element at maxHeap.peek().'
          ]
        }
      },
      {
        id: 'design-twitter',
        title: 'Design Twitter',
        difficulty: 'Medium',
        leetcodeUrl: 'https://leetcode.com/problems/design-twitter/description/',
        youtubeUrl: 'https://www.youtube.com/watch?v=tH051S6aM5M',
        definition: 'Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user\'s news feed. Implement the Twitter class:\n• Twitter() Initializes your twitter object.\n• void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId.\n• List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user\'s news feed. Each item must be posted by users who the user followed or by the user themself, ordered from most recent to least recent.\n• void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.\n• void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.',
        examples: [
          {
            input: '["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]\n[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]',
            output: '[null, null, [5], null, null, [6, 5], null, [5]]',
            explanation: 'Twitter twitter = new Twitter();\ntwitter.postTweet(1, 5); // User 1 posts tweet 5.\ntwitter.getNewsFeed(1);  // User 1\'s news feed returns [5].\ntwitter.follow(1, 2);    // User 1 follows user 2.\ntwitter.postTweet(2, 6); // User 2 posts tweet 6.\ntwitter.getNewsFeed(1);  // User 1\'s news feed returns [6, 5] (tweet 6 was posted after tweet 5).\ntwitter.unfollow(1, 2);  // User 1 unfollows user 2.\ntwitter.getNewsFeed(1);  // User 1\'s news feed returns [5], since user 1 no longer follows user 2.'
          }
        ],
        optimal: {
          idea: 'Model Tweet with a global timestamp and descending Comparable order. Each User maintains their own LinkedList of tweets (inserted at head for recent-first order) and a HashSet of followees. To retrieve the news feed, gather up to 10 most recent tweets from each followee and the user themself into a Max-Heap PriorityQueue, then poll at most 10 items.',
          code: `class Tweet implements Comparable<Tweet> {
    int tweetId;
    int time;

    Tweet(int tweetId, int time) {
        this.tweetId = tweetId;
        this.time = time;
    }

    @Override
    public int compareTo(Tweet newTweet) {
        return newTweet.time - this.time;   // descending order
    }
}

class User {
    int userId;
    HashSet<Integer> followees;
    List<Tweet> tweets;

    User(int userId) {
        this.userId = userId;
        followees = new HashSet<>();
        tweets = new LinkedList<>();
    }
}

class Twitter {
    HashMap<Integer, User> userMap;
    int timeCounter;

    public Twitter() {
        userMap = new HashMap<>();
        timeCounter = 0;
    }
    
    public void postTweet(int userId, int tweetId) {
        if (!userMap.containsKey(userId)) {
            userMap.put(userId, new User(userId));
        }

        User user = userMap.get(userId);
        timeCounter++;
        Tweet newTweet = new Tweet(tweetId, timeCounter);
        user.tweets.add(0, newTweet);
    }
    
    public List<Integer> getNewsFeed(int userId) {
        if (!userMap.containsKey(userId)) {
            return new ArrayList<>();
        }

        PriorityQueue<Tweet> pq = new PriorityQueue<>();
        User user = userMap.get(userId);

        for (int followee : user.followees) {
            int count = 0;

            for (Tweet tweet : userMap.get(followee).tweets) {
                pq.offer(tweet);
                count++;

                if (count == 10) {
                    break;
                }
            }
        }

        int count = 0;
        for (Tweet tweet : user.tweets) {
            pq.offer(tweet);
            count++;

            if (count == 10) {
                break;
            }
        }

        List<Integer> result = new ArrayList<>();
        int countLatestTweets = 0;

        while (!pq.isEmpty() && countLatestTweets < 10) {
            result.add(pq.poll().tweetId);
            countLatestTweets++;
        }

        return result;
    }
    
    public void follow(int followerId, int followeeId) {
        if (!userMap.containsKey(followerId)) {
            userMap.put(followerId, new User(followerId));
        }

        if (!userMap.containsKey(followeeId)) {
            userMap.put(followeeId, new User(followeeId));
        }

        User user = userMap.get(followerId);
        user.followees.add(followeeId);
    }
    
    public void unfollow(int followerId, int followeeId) {
        if (!userMap.containsKey(followerId) || !userMap.containsKey(followeeId)) {
            return;
        }

        User user = userMap.get(followerId);
        user.followees.remove(followeeId);
    }
}`,
          time: 'postTweet: O(1), follow/unfollow: O(1), getNewsFeed: O(F log(10 * F))',
          timeDesc: '• postTweet: O(1) inserting at index 0 of the user list.\n• follow / unfollow: O(1) HashSet add and remove.\n• getNewsFeed: Offers at most 10 tweets for each of F followees into a PriorityQueue, then polls at most 10: O(F * log(F)).',
          space: 'O(U + T + F)',
          spaceDesc: '• U users in the HashMap, T total tweets stored, and F total follower relationships.',
          walkthrough: [
            'Design Tweet with tweetId, global timestamp time, and Comparable sorted descending by time.',
            'Design User with userId, followees HashSet<Integer>, and tweets LinkedList<Tweet>.',
            'postTweet: Increment timeCounter, create a new Tweet, and prepend it (add(0, tweet)) to the user\'s list.',
            'getNewsFeed: Scan up to 10 most recent tweets from each user in user.followees, plus the user\'s own tweets, inserting them into a Max-Heap PriorityQueue<Tweet>.',
            'Poll up to 10 times from the Max-Heap to collect the 10 most recent tweet IDs in order.',
            'follow / unfollow: Ensure both users exist, then add or remove the followeeId from user.followees.'
          ]
        }
      }
    ]
  };
