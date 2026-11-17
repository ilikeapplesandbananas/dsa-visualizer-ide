import type { Problem } from '../types/problem';

export const PROBLEMS_PART_4: Problem[] = [
  {
    id: 'top-k-frequent',
    number: 347,
    title: 'Top K Frequent Elements',
    scenario: 'Order Fulfillment / Log Aggregation',
    difficulty: 'Medium',
    category: 'Heap & Priority Queue',
    tags: ['Heap', 'Hash Table', 'Counting'],
    entryFunction: 'topKFrequent',
    params: [
      { name: 'nums', type: 'number[]' },
      { name: 'k', type: 'number' },
    ],
    returnType: 'number[]',
    compareMode: 'unorderedArray',
    description:
      'Given an integer array `nums` (e.g. product SKUs or error codes in log streams) and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
    examples: [
      { input: 'nums = [1, 1, 1, 2, 2, 3], k = 2', output: '[1, 2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '1 <= k <= unique elements'],
    hints: [
      'Count element frequencies in a Hash Map (`counts[val]++`).',
      'Push `(freq, val)` into a **min-heap** and pop whenever `heap.size > k` so the top `k` frequent elements stay in the heap.',
    ],
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(n + k)',
    visualHint: {
      primaryStructure: 'heap',
      description: 'Frequency hash table paired with a bounded min-heap of size `k`.',
    },
    starterCode: {
      python: `def topKFrequent(nums, k):
    # Count frequencies + min-heap of size k
    pass`,
      javascript: `function topKFrequent(nums, k) {
  // Use counts Map + new MinHeap((a, b) => a[0] - b[0])
  
}`,
      java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        return new int[0];
    }
}`,
      cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        return {};
    }
};`,
      c: `int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        return new int[0];
    }
}`,
    },
    optimalCode: {
      python: `def topKFrequent(nums, k):
    counts = {}
    for x in nums:
        counts[x] = counts.get(x, 0) + 1
    heap = []
    for num, freq in counts.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)
    return [pair[1] for pair in heap]`,
      javascript: `function topKFrequent(nums, k) {
  const counts = new Map();
  for (const x of nums) {
    counts.set(x, (counts.get(x) || 0) + 1);
  }
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  for (const [num, freq] of counts.entries()) {
    heap.push([freq, num]);
    if (heap.size > k) {
      heap.pop();
    }
  }
  const res = [];
  while (heap.size > 0) {
    res.push(heap.pop()[1]);
  }
  return res;
}`,
      java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums) {
            counts.put(x, counts.getOrDefault(x, 0) + 1);
        }
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        for (int num : counts.keySet()) {
            heap.offer(new int[] {counts.get(num), num});
            if (heap.size() > k) heap.poll();
        }
        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = heap.poll()[1];
        }
        return res;
    }
}`,
      cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> counts;
        for (int x : nums) counts[x]++;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;
        for (auto& kv : counts) {
            minHeap.push({kv.second, kv.first});
            if (minHeap.size() > k) minHeap.pop();
        }
        vector<int> res;
        while (!minHeap.empty()) {
            res.push_back(minHeap.top().second);
            minHeap.pop();
        }
        return res;
    }
};`,
      c: `int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    int vals[1005], freqs[1005];
    int unique = 0;
    for (int i = 0; i < numsSize; i++) {
        int found = -1;
        for (int j = 0; j < unique; j++) {
            if (vals[j] == nums[i]) { found = j; break; }
        }
        if (found >= 0) {
            freqs[found]++;
        } else {
            vals[unique] = nums[i];
            freqs[unique] = 1;
            unique++;
        }
    }
    for (int i = 0; i < unique; i++) {
        for (int j = i + 1; j < unique; j++) {
            if (freqs[j] > freqs[i]) {
                int tf = freqs[i]; freqs[i] = freqs[j]; freqs[j] = tf;
                int tv = vals[i]; vals[i] = vals[j]; vals[j] = tv;
            }
        }
    }
    int* res = (int*)malloc(k * sizeof(int));
    for (int i = 0; i < k; i++) res[i] = vals[i];
    *returnSize = k;
    return res;
}`,
      csharp: `public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        var counts = new Dictionary<int, int>();
        foreach (int x in nums) {
            counts[x] = counts.GetValueOrDefault(x, 0) + 1;
        }
        var heap = new PriorityQueue<int, int>();
        foreach (int num in counts.Keys) {
            heap.Enqueue(num, counts[num]);
            if (heap.Count > k) heap.Dequeue();
        }
        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = heap.Dequeue();
        }
        return res;
    }
}`,
    },
    testCases: [
      { id: 'tkf-1', label: 'Case 1', args: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2] },
      { id: 'tkf-2', label: 'Single', args: [[1], 1], expected: [1] },
      { id: 'tkf-3', label: 'Negative Values', args: [[4, 1, -1, 2, -1, 2, 3], 2], expected: [-1, 2], isHidden: true },
    ],
  },
  {
    id: 'k-closest-points',
    number: 973,
    title: 'K Closest Points to Origin',
    scenario: 'Order Fulfillment / Log Aggregation',
    difficulty: 'Medium',
    category: 'Heap & Priority Queue',
    tags: ['Heap', 'Geometry', 'Sorting'],
    entryFunction: 'kClosest',
    params: [
      { name: 'points', type: 'number[][]' },
      { name: 'k', type: 'number' },
    ],
    returnType: 'number[][]',
    compareMode: 'unorderedOuterArray',
    description:
      'Given an array of `points` where `points[i] = [x_i, y_i]` represents a warehouse drop point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)` in any order.',
    examples: [
      { input: 'points = [[1,3],[-2,2]], k = 1', output: '[[-2,2]]' },
      { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', output: '[[3,3],[-2,4]]' },
    ],
    constraints: ['1 <= k <= points.length <= 10^4'],
    hints: [
      'Avoid floating-point `sqrt`: squared distance `d2 = x*x + y*y` preserves exact order.',
      'Push `(x*x + y*y, x, y)` onto a max-heap of size `k` (or push negated `-d2` into a min-heap) and pop whenever `heap.size > k`.',
    ],
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
    visualHint: {
      primaryStructure: 'heap',
      description: 'Bounded size-k priority queue evicting farthest points by `x² + y²`.',
    },
    starterCode: {
      python: `def kClosest(points, k):
    # Max-heap via negated distance or size-k priority queue
    pass`,
      javascript: `function kClosest(points, k) {
  // Use new MaxHeap((a, b) => a[0] - b[0])
  
}`,
      java: `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        return new int[0][0];
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        return {};
    }
};`,
      c: `int** kClosest(int** points, int pointsSize, int* pointsColSize, int k, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public int[][] KClosest(int[][] points, int k) {
        return new int[0][];
    }
}`,
    },
    optimalCode: {
      python: `def kClosest(points, k):
    maxHeap = []
    for x, y in points:
        dist = x * x + y * y
        heapq.heappush(maxHeap, (-dist, x, y))
        if len(maxHeap) > k:
            heapq.heappop(maxHeap)
    return [[x, y] for _, x, y in maxHeap]`,
      javascript: `function kClosest(points, k) {
  const maxHeap = new MaxHeap((a, b) => b[0] - a[0]);
  for (const [x, y] of points) {
    const dist = x * x + y * y;
    maxHeap.push([dist, x, y]);
    if (maxHeap.size > k) {
      maxHeap.pop();
    }
  }
  const res = [];
  while (maxHeap.size > 0) {
    const item = maxHeap.pop();
    res.push([item[1], item[2]]);
  }
  return res;
}`,
      java: `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        for (int[] p : points) {
            int dist = p[0] * p[0] + p[1] * p[1];
            maxHeap.offer(new int[] {dist, p[0], p[1]});
            if (maxHeap.size() > k) maxHeap.poll();
        }
        int[][] res = new int[k][2];
        for (int i = 0; i < k; i++) {
            int[] item = maxHeap.poll();
            res[i] = new int[] {item[1], item[2]};
        }
        return res;
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<vector<int>, vector<vector<int>>, less<vector<int>>> maxHeap;
        for (auto& p : points) {
            int dist = p[0] * p[0] + p[1] * p[1];
            maxHeap.push({dist, p[0], p[1]});
            if (maxHeap.size() > k) maxHeap.pop();
        }
        vector<vector<int>> res;
        while (!maxHeap.empty()) {
            auto item = maxHeap.top();
            maxHeap.pop();
            res.push_back({item[1], item[2]});
        }
        return res;
    }
};`,
      c: `int** kClosest(int** points, int pointsSize, int* pointsColSize, int k, int* returnSize, int** returnColumnSizes) {
    for (int i = 0; i < pointsSize; i++) {
        for (int j = i + 1; j < pointsSize; j++) {
            int d1 = points[i][0] * points[i][0] + points[i][1] * points[i][1];
            int d2 = points[j][0] * points[j][0] + points[j][1] * points[j][1];
            if (d2 < d1) {
                int* tmp = points[i];
                points[i] = points[j];
                points[j] = tmp;
            }
        }
    }
    int** res = (int**)malloc(k * sizeof(int*));
    *returnColumnSizes = (int*)malloc(k * sizeof(int));
    for (int i = 0; i < k; i++) {
        res[i] = (int*)malloc(2 * sizeof(int));
        res[i][0] = points[i][0];
        res[i][1] = points[i][1];
        (*returnColumnSizes)[i] = 2;
    }
    *returnSize = k;
    return res;
}`,
      csharp: `public class Solution {
    public int[][] KClosest(int[][] points, int k) {
        var heap = new PriorityQueue<int[], int>();
        foreach (var p in points) {
            int dist = p[0] * p[0] + p[1] * p[1];
            heap.Enqueue(new int[] {p[0], p[1]}, -dist);
            if (heap.Count > k) heap.Dequeue();
        }
        int[][] res = new int[k][];
        for (int i = 0; i < k; i++) {
            res[i] = heap.Dequeue();
        }
        return res;
    }
}`,
    },
    testCases: [
      { id: 'kcp-1', label: 'Case 1', args: [[[1, 3], [-2, 2]], 1], expected: [[-2, 2]] },
      { id: 'kcp-2', label: 'Case 2', args: [[[3, 3], [5, -1], [-2, 4]], 2], expected: [[3, 3], [-2, 4]] },
      { id: 'kcp-3', label: 'Origin Ties', args: [[[0, 1], [1, 0]], 2], expected: [[0, 1], [1, 0]], isHidden: true },
    ],
  },
  {
    id: 'meeting-rooms-ii',
    number: 253,
    title: 'Meeting Rooms II',
    scenario: 'Order Fulfillment / Log Aggregation',
    difficulty: 'Medium',
    category: 'Heap & Priority Queue',
    tags: ['Heap', 'Intervals', 'Greedy'],
    entryFunction: 'minMeetingRooms',
    params: [{ name: 'intervals', type: 'number[][]' }],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'Given an array of job/meeting time intervals `intervals[i] = [start_i, end_i]`, return the **minimum number of conference rooms / parallel servers required** so overlapping jobs never collide.',
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2' },
      { input: 'intervals = [[7,10],[2,4]]', output: '1' },
    ],
    constraints: ['1 <= intervals.length <= 10^4'],
    hints: [
      'Sort intervals ascending by start time.',
      'Keep active room end times inside a **min-heap**. If `heap.peek() <= cur.start`, pop that freed room and push `cur.end`. The final heap size equals rooms needed!',
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    visualHint: {
      primaryStructure: 'heap',
      description: 'Interval schedule paired with a min-heap of active server end-times.',
    },
    starterCode: {
      python: `def minMeetingRooms(intervals):
    # Sort + min-heap of active end times
    pass`,
      javascript: `function minMeetingRooms(intervals) {
  // Sort by start + new MinHeap()
  
}`,
      java: `class Solution {
    public int minMeetingRooms(int[][] intervals) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        return 0;
    }
};`,
      c: `int minMeetingRooms(int** intervals, int intervalsSize, int* intervalsColSize) {
    return 0;
}`,
      csharp: `public class Solution {
    public int MinMeetingRooms(int[][] intervals) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def minMeetingRooms(intervals):
    if not intervals:
        return 0
    intervals.sort(key=lambda x: x[0])
    minHeap = [intervals[0][1]]
    for start, end in intervals[1:]:
        if start >= minHeap[0]:
            heapq.heappop(minHeap)
        heapq.heappush(minHeap, end)
    return len(minHeap)`,
      javascript: `function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;
  intervals.sort((a, b) => a[0] - b[0]);
  const minHeap = new MinHeap();
  minHeap.push(intervals[0][1]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= minHeap.peek()) {
      minHeap.pop();
    }
    minHeap.push(intervals[i][1]);
  }
  return minHeap.size;
}`,
      java: `class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals.length == 0) return 0;
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(intervals[0][1]);
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= minHeap.peek()) {
                minHeap.poll();
            }
            minHeap.offer(intervals[i][1]);
        }
        return minHeap.size();
    }
}`,
      cpp: `class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });
        priority_queue<int, vector<int>, greater<int>> minHeap;
        minHeap.push(intervals[0][1]);
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] >= minHeap.top()) {
                minHeap.pop();
            }
            minHeap.push(intervals[i][1]);
        }
        return minHeap.size();
    }
};`,
      c: `int minMeetingRooms(int** intervals, int intervalsSize, int* intervalsColSize) {
    if (intervalsSize == 0) return 0;
    int starts[1005], ends[1005];
    for (int i = 0; i < intervalsSize; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }
    for (int i = 0; i < intervalsSize; i++) {
        for (int j = i + 1; j < intervalsSize; j++) {
            if (starts[j] < starts[i]) {
                int ts = starts[i]; starts[i] = starts[j]; starts[j] = ts;
            }
            if (ends[j] < ends[i]) {
                int te = ends[i]; ends[i] = ends[j]; ends[j] = te;
            }
        }
    }
    int rooms = 0, endPtr = 0;
    for (int s = 0; s < intervalsSize; s++) {
        if (starts[s] < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
    }
    return rooms;
}`,
      csharp: `public class Solution {
    public int MinMeetingRooms(int[][] intervals) {
        if (intervals.Length == 0) return 0;
        Array.Sort(intervals, (a, b) => a[0] - b[0]);
        var minHeap = new PriorityQueue<int, int>();
        minHeap.Enqueue(intervals[0][1], intervals[0][1]);
        for (int i = 1; i < intervals.Length; i++) {
            if (intervals[i][0] >= minHeap.Peek()) {
                minHeap.Dequeue();
            }
            minHeap.Enqueue(intervals[i][1], intervals[i][1]);
        }
        return minHeap.Count;
    }
}`,
    },
    testCases: [
      { id: 'mr2-1', label: 'Case 1', args: [[[0, 30], [5, 10], [15, 20]]], expected: 2 },
      { id: 'mr2-2', label: 'Non-Overlapping', args: [[[7, 10], [2, 4]]], expected: 1 },
      { id: 'mr2-3', label: 'Three Simultaneous', args: [[[1, 10], [2, 7], [3, 19], [8, 12], [10, 20], [11, 30]]], expected: 4, isHidden: true },
    ],
  },
  {
    id: 'merge-k-sorted-lists',
    number: 23,
    title: 'Merge k Sorted Lists',
    scenario: 'Order Fulfillment / Log Aggregation',
    difficulty: 'Hard',
    category: 'Heap & Priority Queue',
    tags: ['Heap', 'Linked List', 'Divide & Conquer'],
    entryFunction: 'mergeKLists',
    params: [{ name: 'lists', type: 'linkedListArray' }],
    returnType: 'linkedList',
    compareMode: 'exact',
    description:
      'You are given an array of `k` sorted linked lists `lists` (e.g. time-ordered shard logs). Merge all linked lists into one sorted linked list and return its head.',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' },
    ],
    constraints: ['0 <= k <= 10^4'],
    hints: [
      'Push each non-null list head into a **min-heap** keyed by `node.val`.',
      'Repeatedly pop the smallest head `node`, append it to `tail.next`, and push `node.next` if non-null.',
    ],
    timeComplexity: 'O(N log k)',
    spaceComplexity: 'O(k)',
    visualHint: {
      primaryStructure: 'heap',
      description: 'Min-heap frontier of size `k` feeding the merged linked list chain.',
    },
    starterCode: {
      python: `def mergeKLists(lists):
    # Push (node.val, idx, node) to min-heap
    pass`,
      javascript: `function mergeKLists(lists) {
  // Use new MinHeap((a, b) => a[0] - b[0])
  
}`,
      java: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        return null;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        return nullptr;
    }
};`,
      c: `struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    return NULL;
}`,
      csharp: `public class Solution {
    public ListNode MergeKLists(ListNode[] lists) {
        return null;
    }
}`,
    },
    optimalCode: {
      python: `def mergeKLists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    dummy = ListNode(0)
    tail = dummy
    while heap:
        val, idx, node = heapq.heappop(heap)
        tail.next = node
        tail = tail.next
        if node.next:
            heapq.heappush(heap, (node.next.val, idx, node.next))
    return dummy.next`,
      javascript: `function mergeKLists(lists) {
  const minHeap = new MinHeap((a, b) => a[0] - b[0]);
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) minHeap.push([lists[i].val, i, lists[i]]);
  }
  const dummy = new ListNode(0);
  let tail = dummy;
  while (minHeap.size > 0) {
    const [, idx, node] = minHeap.pop();
    tail.next = node;
    tail = tail.next;
    if (node.next) minHeap.push([node.next.val, idx, node.next]);
  }
  return dummy.next;
}`,
      java: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode head : lists) {
            if (head != null) heap.offer(head);
        }
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (!heap.isEmpty()) {
            ListNode node = heap.poll();
            tail.next = node;
            tail = tail.next;
            if (node.next != null) heap.offer(node.next);
        }
        return dummy.next;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, greater<ListNode*>> heap;
        for (ListNode* head : lists) {
            if (head) heap.push(head);
        }
        ListNode* dummy = new ListNode(0);
        ListNode* tail = dummy;
        while (!heap.empty()) {
            ListNode* bestNode = nullptr;
            break;
        }
        // Clean divide-and-conquer / pairwise merge for C++ pointer safety
        if (lists.empty()) return nullptr;
        int n = lists.size();
        for (int step = 1; step < n; step *= 2) {
            for (int i = 0; i + step < n; i += step * 2) {
                ListNode* d = new ListNode(0);
                ListNode* t = d;
                ListNode* a = lists[i];
                ListNode* b = lists[i + step];
                while (a && b) {
                    if (a->val <= b->val) { t->next = a; a = a->next; }
                    else { t->next = b; b = b->next; }
                    t = t->next;
                }
                t->next = a ? a : b;
                lists[i] = d->next;
            }
        }
        return lists[0];
    }
};`,
      c: `struct ListNode* mergeTwoC(struct ListNode* a, struct ListNode* b) {
    if (a == NULL) return b;
    if (b == NULL) return a;
    if (a->val <= b->val) {
        a->next = mergeTwoC(a->next, b);
        return a;
    } else {
        b->next = mergeTwoC(a, b->next);
        return b;
    }
}
struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    if (listsSize == 0) return NULL;
    for (int step = 1; step < listsSize; step *= 2) {
        for (int i = 0; i + step < listsSize; i += step * 2) {
            lists[i] = mergeTwoC(lists[i], lists[i + step]);
        }
    }
    return lists[0];
}`,
      csharp: `public class Solution {
    public ListNode MergeKLists(ListNode[] lists) {
        var heap = new PriorityQueue<ListNode, int>();
        foreach (var head in lists) {
            if (head != null) heap.Enqueue(head, head.val);
        }
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (heap.Count > 0) {
            ListNode node = heap.Dequeue();
            tail.next = node;
            tail = tail.next;
            if (node.next != null) heap.Enqueue(node.next, node.next.val);
        }
        return dummy.next;
    }
}`,
    },
    testCases: [
      { id: 'mksl-1', label: 'Case 1', args: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
      { id: 'mksl-2', label: 'Empty Array', args: [[]], expected: [] },
      { id: 'mksl-3', label: 'Empty Inner', args: [[[], [1]]], expected: [1], isHidden: true },
    ],
  },
  {
    id: 'three-sum',
    number: 15,
    title: '3Sum',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    entryFunction: 'threeSum',
    params: [{ name: 'nums', type: 'number[]' }],
    returnType: 'number[][]',
    compareMode: 'unorderedOuterArray',
    description:
      'Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' },
    ],
    constraints: ['3 <= nums.length <= 3000'],
    hints: [
      'Sort `nums` ascending, then loop anchor `i` while skipping duplicate values (`nums[i] === nums[i - 1]`).',
      'Inside, use two converging pointers `left = i + 1` and `right = n - 1` to find pairs summing to `-nums[i]`.',
    ],
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1) extra',
    visualHint: {
      primaryStructure: 'array',
      highlightPointers: ['i', 'left', 'right'],
      description: 'Sorted array with anchor `i` and converging two-pointer search `left`/`right`.',
    },
    starterCode: {
      python: `def threeSum(nums):
    # Write your solution here
    pass`,
      javascript: `function threeSum(nums) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        return new ArrayList<>();
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        return {};
    }
};`,
      c: `int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public IList<IList<int>> ThreeSum(int[] nums) {
        return new List<IList<int>>();
    }
}`,
    },
    optimalCode: {
      python: `def threeSum(nums):
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                res.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return res`,
      javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (total === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (total < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
}`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = nums.length - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (total == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    left++;
                    right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (total < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = n - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (total == 0) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    left++;
                    right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (total < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
};`,
      c: `int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[j] < nums[i]) {
                int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
            }
        }
    }
    int** res = (int**)malloc(2000 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(2000 * sizeof(int));
    *returnSize = 0;
    for (int i = 0; i < numsSize - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = numsSize - 1;
        while (left < right) {
            int total = nums[i] + nums[left] + nums[right];
            if (total == 0) {
                int* tri = (int*)malloc(3 * sizeof(int));
                tri[0] = nums[i]; tri[1] = nums[left]; tri[2] = nums[right];
                res[*returnSize] = tri;
                (*returnColumnSizes)[*returnSize] = 3;
                (*returnSize)++;
                left++; right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
            } else if (total < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return res;
}`,
      csharp: `public class Solution {
    public IList<IList<int>> ThreeSum(int[] nums) {
        Array.Sort(nums);
        var res = new List<IList<int>>();
        for (int i = 0; i < nums.Length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = nums.Length - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (total == 0) {
                    res.Add(new List<int> {nums[i], nums[left], nums[right]});
                    left++;
                    right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (total < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
}`,
    },
    testCases: [
      { id: '3s-1', label: 'Case 1', args: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { id: '3s-2', label: 'None', args: [[0, 1, 1]], expected: [] },
      { id: '3s-3', label: 'All Zeros', args: [[0, 0, 0, 0]], expected: [[0, 0, 0]], isHidden: true },
    ],
  },
  {
    id: 'subarray-sum-equals-k',
    number: 560,
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Prefix Sum', 'Hash Table'],
    entryFunction: 'subarraySum',
    params: [
      { name: 'nums', type: 'number[]' },
      { name: 'k', type: 'number' },
    ],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'Given an array of integers `nums` (which may include negative values) and an integer `k`, return the total number of contiguous subarrays whose sum equals `k`.',
    examples: [
      { input: 'nums = [1, 1, 1], k = 2', output: '2' },
      { input: 'nums = [1, 2, 3], k = 3', output: '2' },
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000'],
    hints: [
      'Initialize `prefixCounts = {0: 1}` representing the empty prefix before index `0`.',
      'At each element, add `nums[i]` to `prefixSum`, add `prefixCounts[prefixSum - k]` to `count`, then increment `prefixCounts[prefixSum]`.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    visualHint: {
      primaryStructure: 'array',
      highlightPointers: ['i'],
      description: 'Running `prefixSum` + `prefixCounts` HashMap finding matching prior sums.',
    },
    starterCode: {
      python: `def subarraySum(nums, k):
    # Write your solution here
    pass`,
      javascript: `function subarraySum(nums, k) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int subarraySum(int[] nums, int k) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        return 0;
    }
};`,
      c: `int subarraySum(int* nums, int numsSize, int k) {
    return 0;
}`,
      csharp: `public class Solution {
    public int SubarraySum(int[] nums, int k) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def subarraySum(nums, k):
    prefixCounts = {0: 1}
    prefixSum = 0
    count = 0
    for i in range(len(nums)):
        prefixSum += nums[i]
        count += prefixCounts.get(prefixSum - k, 0)
        prefixCounts[prefixSum] = prefixCounts.get(prefixSum, 0) + 1
    return count`,
      javascript: `function subarraySum(nums, k) {
  const prefixCounts = new Map([[0, 1]]);
  let prefixSum = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    count += prefixCounts.get(prefixSum - k) || 0;
    prefixCounts.set(prefixSum, (prefixCounts.get(prefixSum) || 0) + 1);
  }
  return count;
}`,
      java: `class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixCounts = new HashMap<>();
        prefixCounts.put(0, 1);
        int prefixSum = 0;
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            prefixSum += nums[i];
            count += prefixCounts.getOrDefault(prefixSum - k, 0);
            prefixCounts.put(prefixSum, prefixCounts.getOrDefault(prefixSum, 0) + 1);
        }
        return count;
    }
}`,
      cpp: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCounts;
        prefixCounts[0] = 1;
        int prefixSum = 0;
        int count = 0;
        for (int i = 0; i < nums.size(); i++) {
            prefixSum += nums[i];
            if (prefixCounts.count(prefixSum - k)) {
                count += prefixCounts[prefixSum - k];
            }
            prefixCounts[prefixSum]++;
        }
        return count;
    }
};`,
      c: `int subarraySum(int* nums, int numsSize, int k) {
    int count = 0;
    for (int start = 0; start < numsSize; start++) {
        int sum = 0;
        for (int end = start; end < numsSize; end++) {
            sum += nums[end];
            if (sum == k) count++;
        }
    }
    return count;
}`,
      csharp: `public class Solution {
    public int SubarraySum(int[] nums, int k) {
        var prefixCounts = new Dictionary<int, int>();
        prefixCounts[0] = 1;
        int prefixSum = 0;
        int count = 0;
        for (int i = 0; i < nums.Length; i++) {
            prefixSum += nums[i];
            count += prefixCounts.GetValueOrDefault(prefixSum - k, 0);
            prefixCounts[prefixSum] = prefixCounts.GetValueOrDefault(prefixSum, 0) + 1;
        }
        return count;
    }
}`,
    },
    testCases: [
      { id: 'ssk-1', label: 'Case 1', args: [[1, 1, 1], 2], expected: 2 },
      { id: 'ssk-2', label: 'Case 2', args: [[1, 2, 3], 3], expected: 2 },
      { id: 'ssk-3', label: 'Negatives & Zero', args: [[1, -1, 0], 0], expected: 3, isHidden: true },
    ],
  },
  {
    id: 'house-robber',
    number: 198,
    title: 'House Robber',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    entryFunction: 'rob',
    params: [{ name: 'nums', type: 'number[]' }],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'Given an integer array `nums` representing the money stashed at each house along a street, return the maximum amount you can rob without alerting security (you cannot rob two adjacent houses).',
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: '4', explanation: 'Rob house 0 (1) + house 2 (3) = 4.' },
      { input: 'nums = [2, 7, 9, 3, 1]', output: '12', explanation: '2 + 9 + 1 = 12.' },
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    hints: [
      'At index `i`, you choose `max(skip, rob)`: either `dp[i - 1]` or `dp[i - 2] + nums[i]`.',
      'Compress `dp` into two rolling variables `prev2` and `prev1` for O(1) auxiliary space.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    visualHint: {
      primaryStructure: 'dp',
      highlightPointers: ['i'],
      description: '1D `dp` table contrasting adjacent skip vs include transitions.',
    },
    starterCode: {
      python: `def rob(nums):
    # Write your solution here
    pass`,
      javascript: `function rob(nums) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int rob(int[] nums) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        return 0;
    }
};`,
      c: `int rob(int* nums, int numsSize) {
    return 0;
}`,
      csharp: `public class Solution {
    public int Rob(int[] nums) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def rob(nums):
    n = len(nums)
    if n == 1:
        return nums[0]
    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    for i in range(2, n):
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
    return dp[n - 1]`,
      javascript: `function rob(nums) {
  const n = nums.length;
  if (n === 1) return nums[0];
  const dp = new Array(n).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  return dp[n - 1];
}`,
      java: `class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        int[] dp = new int[n];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[n - 1];
    }
}`,
      cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        vector<int> dp(n, 0);
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);
        for (int i = 2; i < n; i++) {
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[n - 1];
    }
};`,
      c: `int rob(int* nums, int numsSize) {
    if (numsSize == 1) return nums[0];
    int* dp = (int*)calloc(numsSize, sizeof(int));
    dp[0] = nums[0];
    dp[1] = nums[0] > nums[1] ? nums[0] : nums[1];
    for (int i = 2; i < numsSize; i++) {
        int skip = dp[i - 1];
        int take = dp[i - 2] + nums[i];
        dp[i] = skip > take ? skip : take;
    }
    return dp[numsSize - 1];
}`,
      csharp: `public class Solution {
    public int Rob(int[] nums) {
        int n = nums.Length;
        if (n == 1) return nums[0];
        int[] dp = new int[n];
        dp[0] = nums[0];
        dp[1] = Math.Max(nums[0], nums[1]);
        for (int i = 2; i < n; i++) {
            dp[i] = Math.Max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[n - 1];
    }
}`,
    },
    testCases: [
      { id: 'hr-1', label: 'Case 1', args: [[1, 2, 3, 1]], expected: 4 },
      { id: 'hr-2', label: 'Case 2', args: [[2, 7, 9, 3, 1]], expected: 12 },
      { id: 'hr-3', label: 'Single House', args: [[5]], expected: 5, isHidden: true },
    ],
  },
];
