import type { Problem } from '../types/problem';

export const PROBLEMS_PART_3: Problem[] = [
  {
    id: 'rotting-oranges',
    number: 994,
    title: 'Rotting Oranges',
    scenario: 'Warehouse Robot / Server Broadcast',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Matrix', 'Multi-Source BFS', 'Queue'],
    entryFunction: 'orangesRotting',
    params: [{ name: 'grid', type: 'number[][]' }],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'You are given an `m x n` grid where each cell can have one of three values:\n- `0`: empty cell,\n- `1`: fresh orange (unreached node),\n- `2`: rotten orange (broadcast source).\n\nEvery minute, any fresh cell 4-directionally adjacent to a rotten cell becomes rotten.\n\nReturn the **minimum number of minutes** that must elapse until no fresh cell remains, or `-1` if impossible.',
    examples: [
      {
        input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
        output: '4',
        explanation: 'Rot spreads layer-by-layer simultaneously from (0, 0) in 4 minutes.',
      },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1', explanation: 'Bottom-left orange is unreachable.' },
      { input: 'grid = [[0,2]]', output: '0' },
    ],
    constraints: ['1 <= m, n <= 10', 'grid[r][c] is 0, 1, or 2.'],
    hints: [
      'Push ALL initially rotten `(r, c)` cells into `collections.deque` (Queue) together before starting BFS.',
      'Mark visited cells `grid[nr][nc] = 2` in-place immediately on enqueue so nothing gets queued twice.',
    ],
    timeComplexity: 'O(R * C)',
    spaceComplexity: 'O(R * C)',
    visualHint: {
      primaryStructure: 'matrix',
      highlightPointers: ['r', 'c'],
      description: 'Multi-source BFS wavefront spreading from `2` cells through `1` cells minute by minute.',
    },
    starterCode: {
      python: `def orangesRotting(grid):
    # Multi-source BFS with collections.deque
    pass`,
      javascript: `function orangesRotting(grid) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int orangesRotting(int[][] grid) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        return 0;
    }
};`,
      c: `int orangesRotting(int** grid, int gridSize, int* gridColSize) {
    return 0;
}`,
      csharp: `public class Solution {
    public int OrangesRotting(int[][] grid) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def orangesRotting(grid):
    rows, cols = len(grid), len(grid[0])
    q = deque()
    fresh = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                q.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1

    minutes = 0
    dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        minutes += 1
    return minutes if fresh == 0 else -1`,
      javascript: `function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const q = [];
  let fresh = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (q.length > 0 && fresh > 0) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = q.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          q.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}`,
      java: `class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) q.offer(new int[] {r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        int minutes = 0;
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.isEmpty() && fresh > 0) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0];
                    int nc = cur[1] + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.offer(new int[] {nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}`,
      cpp: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int rows = grid.size();
        int cols = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) q.push({r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        int minutes = 0;
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        while (!q.empty() && fresh > 0) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                auto cur = q.front();
                q.pop();
                for (int d = 0; d < 4; d++) {
                    int nr = cur.first + dr[d];
                    int nc = cur.second + dc[d];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
};`,
      c: `int orangesRotting(int** grid, int gridSize, int* gridColSize) {
    int rows = gridSize;
    int cols = gridColSize[0];
    int qr[105], qc[105];
    int front = 0, back = 0;
    int fresh = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 2) {
                qr[back] = r;
                qc[back] = c;
                back++;
            } else if (grid[r][c] == 1) {
                fresh++;
            }
        }
    }
    int minutes = 0;
    int dr[4] = {1, -1, 0, 0};
    int dc[4] = {0, 0, 1, -1};
    while (front < back && fresh > 0) {
        int size = back - front;
        for (int i = 0; i < size; i++) {
            int r = qr[front];
            int c = qc[front];
            front++;
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    qr[back] = nr;
                    qc[back] = nc;
                    back++;
                }
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}`,
      csharp: `public class Solution {
    public int OrangesRotting(int[][] grid) {
        int rows = grid.Length;
        int cols = grid[0].Length;
        var q = new Queue<int[]>();
        int fresh = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) q.Enqueue(new int[] {r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        int minutes = 0;
        int[] dr = {1, -1, 0, 0};
        int[] dc = {0, 0, 1, -1};
        while (q.Count > 0 && fresh > 0) {
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                int[] cur = q.Dequeue();
                for (int d = 0; d < 4; d++) {
                    int nr = cur[0] + dr[d];
                    int nc = cur[1] + dc[d];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.Enqueue(new int[] {nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}`,
    },
    testCases: [
      { id: 'ro-1', label: 'Case 1', args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expected: 4 },
      { id: 'ro-2', label: 'Unreachable', args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expected: -1 },
      { id: 'ro-3', label: 'Already Done', args: [[[0, 2]]], expected: 0 },
      { id: 'ro-4', label: 'Multi-Source', args: [[[2, 1, 1], [1, 1, 1], [1, 1, 2]]], expected: 2, isHidden: true },
    ],
  },
  {
    id: 'shortest-path-binary-matrix',
    number: 1091,
    title: 'Shortest Path in Binary Matrix',
    scenario: 'Warehouse Robot / Server Broadcast',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Matrix', 'BFS', 'Shortest Path'],
    entryFunction: 'shortestPathBinaryMatrix',
    params: [{ name: 'grid', type: 'number[][]' }],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'Given an `n x n` binary matrix `grid`, return the length of the shortest **clear path** from `(0, 0)` to `(n - 1, n - 1)`. If there is no clear path, return `-1`.\n\nA clear path visits only `0` cells moving in any **8 directions** (horizontal, vertical, or diagonal). Length is the number of visited cells.',
    examples: [
      { input: 'grid = [[0,1],[1,0]]', output: '2' },
      { input: 'grid = [[0,0,0],[1,1,0],[1,1,0]]', output: '4' },
      { input: 'grid = [[1,0,0],[1,1,0],[1,1,0]]', output: '-1' },
    ],
    constraints: ['n == grid.length == grid[i].length', '1 <= n <= 100'],
    hints: [
      'Check early exit: if `grid[0][0] === 1 || grid[n-1][n-1] === 1`, return `-1`.',
      'Run 8-directional BFS starting from `(0, 0, dist=1)` marking visited cells `grid[nr][nc] = 1` on enqueue.',
    ],
    timeComplexity: 'O(R * C)',
    spaceComplexity: 'O(R * C)',
    visualHint: {
      primaryStructure: 'matrix',
      highlightPointers: ['r', 'c'],
      description: 'Robot shortest-path 8-directional BFS wavefront over binary floor grid.',
    },
    starterCode: {
      python: `def shortestPathBinaryMatrix(grid):
    # Write your BFS solution here
    pass`,
      javascript: `function shortestPathBinaryMatrix(grid) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        return -1;
    }
};`,
      c: `int shortestPathBinaryMatrix(int** grid, int gridSize, int* gridColSize) {
    return -1;
}`,
      csharp: `public class Solution {
    public int ShortestPathBinaryMatrix(int[][] grid) {
        return -1;
    }
}`,
    },
    optimalCode: {
      python: `def shortestPathBinaryMatrix(grid):
    n = len(grid)
    if grid[0][0] == 1 or grid[n - 1][n - 1] == 1:
        return -1
    q = deque([(0, 0, 1)])
    grid[0][0] = 1
    dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]

    while q:
        r, c, dist = q.popleft()
        if r == n - 1 and c == n - 1:
            return dist
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                q.append((nr, nc, dist + 1))
    return -1`,
      javascript: `function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
  const q = [[0, 0, 1]];
  grid[0][0] = 1;
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

  while (q.length > 0) {
    const [r, c, dist] = q.shift();
    if (r === n - 1 && c === n - 1) return dist;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        grid[nr][nc] = 1;
        q.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1;
}`,
      java: `class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int n = grid.length;
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[] {0, 0, 1});
        grid[0][0] = 1;
        int[][] dirs = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int r = cur[0], c = cur[1], dist = cur[2];
            if (r == n - 1 && c == n - 1) return dist;
            for (int[] d : dirs) {
                int nr = r + d[0];
                int nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = 1;
                    q.offer(new int[] {nr, nc, dist + 1});
                }
            }
        }
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
        queue<vector<int>> q;
        q.push({0, 0, 1});
        grid[0][0] = 1;
        int dr[8] = {-1,-1,-1,0,0,1,1,1};
        int dc[8] = {-1,0,1,-1,1,-1,0,1};
        while (!q.empty()) {
            auto cur = q.front();
            q.pop();
            int r = cur[0], c = cur[1], dist = cur[2];
            if (r == n - 1 && c == n - 1) return dist;
            for (int d = 0; d < 8; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = 1;
                    q.push({nr, nc, dist + 1});
                }
            }
        }
        return -1;
    }
};`,
      c: `int shortestPathBinaryMatrix(int** grid, int gridSize, int* gridColSize) {
    int n = gridSize;
    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
    int qr[2500], qc[2500], qd[2500];
    int front = 0, back = 0;
    qr[back] = 0; qc[back] = 0; qd[back] = 1; back++;
    grid[0][0] = 1;
    int dr[8] = {-1,-1,-1,0,0,1,1,1};
    int dc[8] = {-1,0,1,-1,1,-1,0,1};
    while (front < back) {
        int r = qr[front];
        int c = qc[front];
        int dist = qd[front];
        front++;
        if (r == n - 1 && c == n - 1) return dist;
        for (int d = 0; d < 8; d++) {
            int nr = r + dr[d];
            int nc = c + dc[d];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                grid[nr][nc] = 1;
                qr[back] = nr; qc[back] = nc; qd[back] = dist + 1;
                back++;
            }
        }
    }
    return -1;
}`,
      csharp: `public class Solution {
    public int ShortestPathBinaryMatrix(int[][] grid) {
        int n = grid.Length;
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
        var q = new Queue<int[]>();
        q.Enqueue(new int[] {0, 0, 1});
        grid[0][0] = 1;
        int[] dr = {-1,-1,-1,0,0,1,1,1};
        int[] dc = {-1,0,1,-1,1,-1,0,1};
        while (q.Count > 0) {
            int[] cur = q.Dequeue();
            int r = cur[0], c = cur[1], dist = cur[2];
            if (r == n - 1 && c == n - 1) return dist;
            for (int d = 0; d < 8; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = 1;
                    q.Enqueue(new int[] {nr, nc, dist + 1});
                }
            }
        }
        return -1;
    }
}`,
    },
    testCases: [
      { id: 'spbm-1', label: 'Case 1', args: [[[0, 1], [1, 0]]], expected: 2 },
      { id: 'spbm-2', label: 'Case 2', args: [[[0, 0, 0], [1, 1, 0], [1, 1, 0]]], expected: 4 },
      { id: 'spbm-3', label: 'Blocked Start', args: [[[1, 0, 0], [1, 1, 0], [1, 1, 0]]], expected: -1 },
      { id: 'spbm-4', label: 'Single Zero', args: [[[0]]], expected: 1, isHidden: true },
    ],
  },
  {
    id: 'right-side-view',
    number: 199,
    title: 'Binary Tree Right Side View',
    scenario: 'Category Hierarchy / Permission Tree',
    difficulty: 'Medium',
    category: 'Trees',
    tags: ['Tree', 'BFS', 'DFS'],
    entryFunction: 'rightSideView',
    params: [{ name: 'root', type: 'binaryTree' }],
    returnType: 'number[]',
    compareMode: 'exact',
    description:
      'Given the `root` of a binary tree, imagine yourself standing on the **right side** of it; return the values of the nodes you can see ordered from top to bottom.',
    examples: [
      { input: 'root = [1, 2, 3, null, 5, null, 4]', output: '[1, 3, 4]' },
      { input: 'root = [1, null, 3]', output: '[1, 3]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes is in range [0, 100].'],
    hints: [
      'Run level-order BFS with a FIFO queue.',
      'For each depth level, record the LAST node dequeued (`i === levelSize - 1`).',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    visualHint: {
      primaryStructure: 'tree',
      description: 'Level-order BFS selecting the rightmost node at each hierarchy depth.',
    },
    starterCode: {
      python: `def rightSideView(root):
    # Write your solution here
    pass`,
      javascript: `function rightSideView(root) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        return new ArrayList<>();
    }
}`,
      cpp: `class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        return {};
    }
};`,
      c: `int* rightSideView(struct TreeNode* root, int* returnSize) {
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public IList<int> RightSideView(TreeNode root) {
        return new List<int>();
    }
}`,
    },
    optimalCode: {
      python: `def rightSideView(root):
    if not root:
        return []
    res = []
    q = deque([root])
    while q:
        level_size = len(q)
        for i in range(level_size):
            node = q.popleft()
            if i == level_size - 1:
                res.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
    return res`,
      javascript: `function rightSideView(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length > 0) {
    const levelSize = q.length;
    for (let i = 0; i < levelSize; i++) {
      const node = q.shift();
      if (i === levelSize - 1) res.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return res;
}`,
      java: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int levelSize = q.size();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = q.poll();
                if (i == levelSize - 1) res.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
        }
        return res;
    }
}`,
      cpp: `class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int levelSize = q.size();
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                if (i == levelSize - 1) res.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return res;
    }
};`,
      c: `int* rightSideView(struct TreeNode* root, int* returnSize) {
    *returnSize = 0;
    if (root == NULL) return NULL;
    int* res = (int*)malloc(105 * sizeof(int));
    struct TreeNode* q[105];
    int front = 0, back = 0;
    q[back++] = root;
    while (front < back) {
        int levelSize = back - front;
        for (int i = 0; i < levelSize; i++) {
            struct TreeNode* node = q[front++];
            if (i == levelSize - 1) {
                res[(*returnSize)++] = node->val;
            }
            if (node->left != NULL) q[back++] = node->left;
            if (node->right != NULL) q[back++] = node->right;
        }
    }
    return res;
}`,
      csharp: `public class Solution {
    public IList<int> RightSideView(TreeNode root) {
        var res = new List<int>();
        if (root == null) return res;
        var q = new Queue<TreeNode>();
        q.Enqueue(root);
        while (q.Count > 0) {
            int levelSize = q.Count;
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = q.Dequeue();
                if (i == levelSize - 1) res.Add(node.val);
                if (node.left != null) q.Enqueue(node.left);
                if (node.right != null) q.Enqueue(node.right);
            }
        }
        return res;
    }
}`,
    },
    testCases: [
      { id: 'rsv-1', label: 'Case 1', args: [[1, 2, 3, null, 5, null, 4]], expected: [1, 3, 4] },
      { id: 'rsv-2', label: 'Left Shadow', args: [[1, 2, 3, 4]], expected: [1, 3, 4] },
      { id: 'rsv-3', label: 'Empty', args: [[]], expected: [] },
    ],
  },
  {
    id: 'path-sum-ii',
    number: 113,
    title: 'Path Sum II',
    scenario: 'Category Hierarchy / Permission Tree',
    difficulty: 'Medium',
    category: 'Trees',
    tags: ['Tree', 'Backtracking', 'DFS'],
    entryFunction: 'pathSum',
    params: [
      { name: 'root', type: 'binaryTree' },
      { name: 'targetSum', type: 'number' },
    ],
    returnType: 'number[][]',
    compareMode: 'exact',
    description:
      'Given the `root` of a binary tree and an integer `targetSum`, return all **root-to-leaf paths** where the sum of node values along the path equals `targetSum`.',
    examples: [
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22', output: '[[5,4,11,2],[5,8,4,5]]' },
      { input: 'root = [1,2,3], targetSum = 5', output: '[]' },
    ],
    constraints: ['The number of nodes is in range [0, 5000].'],
    hints: [
      'Append `node.val` to `path` on entry and decrement `remaining -= node.val`.',
      'Copy `path` into `result` at leaves where `remaining === 0`, then `path.pop()` before returning to backtrack cleanly.',
    ],
    timeComplexity: 'O(n^2) worst / O(n) traverse',
    spaceComplexity: 'O(h)',
    visualHint: {
      primaryStructure: 'tree',
      description: 'Recursive backtracking along the tree with live `path` stack and `remaining` sum.',
    },
    starterCode: {
      python: `def pathSum(root, targetSum):
    # Write your solution here
    pass`,
      javascript: `function pathSum(root, targetSum) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        return new ArrayList<>();
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        return {};
    }
};`,
      c: `int** pathSum(struct TreeNode* root, int targetSum, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public IList<IList<int>> PathSum(TreeNode root, int targetSum) {
        return new List<IList<int>>();
    }
}`,
    },
    optimalCode: {
      python: `def pathSum(root, targetSum):
    res = []
    path = []

    def dfs(node, remaining):
        if not node:
            return
        path.append(node.val)
        remaining -= node.val
        if not node.left and not node.right and remaining == 0:
            res.append(list(path))
        else:
            dfs(node.left, remaining)
            dfs(node.right, remaining)
        path.pop()

    dfs(root, targetSum)
    return res`,
      javascript: `function pathSum(root, targetSum) {
  const res = [];
  const path = [];

  function dfs(node, remaining) {
    if (!node) return;
    path.push(node.val);
    remaining -= node.val;
    if (!node.left && !node.right && remaining === 0) {
      res.push([...path]);
    } else {
      dfs(node.left, remaining);
      dfs(node.right, remaining);
    }
    path.pop();
  }

  dfs(root, targetSum);
  return res;
}`,
      java: `class Solution {
    private void dfs(TreeNode node, int remaining, List<Integer> path, List<List<Integer>> res) {
        if (node == null) return;
        path.add(node.val);
        remaining -= node.val;
        if (node.left == null && node.right == null && remaining == 0) {
            res.add(new ArrayList<>(path));
        } else {
            dfs(node.left, remaining, path, res);
            dfs(node.right, remaining, path, res);
        }
        path.remove(path.size() - 1);
    }
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(root, targetSum, new ArrayList<>(), res);
        return res;
    }
}`,
      cpp: `class Solution {
public:
    void dfs(TreeNode* node, int remaining, vector<int>& path, vector<vector<int>>& res) {
        if (!node) return;
        path.push_back(node->val);
        remaining -= node->val;
        if (!node->left && !node->right && remaining == 0) {
            res.push_back(vector<int>(path));
        } else {
            dfs(node->left, remaining, path, res);
            dfs(node->right, remaining, path, res);
        }
        path.pop_back();
    }
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(root, targetSum, path, res);
        return res;
    }
};`,
      c: `void dfsPath(struct TreeNode* node, int remaining, int* path, int depth, int** res, int* returnSize, int* colSizes) {
    if (node == NULL) return;
    path[depth] = node->val;
    remaining -= node->val;
    if (node->left == NULL && node->right == NULL && remaining == 0) {
        int* copy = (int*)malloc((depth + 1) * sizeof(int));
        for (int i = 0; i <= depth; i++) copy[i] = path[i];
        res[*returnSize] = copy;
        colSizes[*returnSize] = depth + 1;
        (*returnSize)++;
        return;
    }
    dfsPath(node->left, remaining, path, depth + 1, res, returnSize, colSizes);
    dfsPath(node->right, remaining, path, depth + 1, res, returnSize, colSizes);
}
int** pathSum(struct TreeNode* root, int targetSum, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    int** res = (int**)malloc(500 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(500 * sizeof(int));
    int path[500];
    dfsPath(root, targetSum, path, 0, res, returnSize, *returnColumnSizes);
    return res;
}`,
      csharp: `public class Solution {
    private void Dfs(TreeNode node, int remaining, List<int> path, List<IList<int>> res) {
        if (node == null) return;
        path.Add(node.val);
        remaining -= node.val;
        if (node.left == null && node.right == null && remaining == 0) {
            res.Add(new List<int>(path));
        } else {
            Dfs(node.left, remaining, path, res);
            Dfs(node.right, remaining, path, res);
        }
        path.RemoveAt(path.Count - 1);
    }
    public IList<IList<int>> PathSum(TreeNode root, int targetSum) {
        var res = new List<IList<int>>();
        Dfs(root, targetSum, new List<int>(), res);
        return res;
    }
}`,
    },
    testCases: [
      {
        id: 'ps2-1',
        label: 'Case 1',
        args: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22],
        expected: [[5, 4, 11, 2], [5, 8, 4, 5]],
      },
      { id: 'ps2-2', label: 'No Match', args: [[1, 2, 3], 5], expected: [] },
      { id: 'ps2-3', label: 'Empty Tree', args: [[], 0], expected: [] },
    ],
  },
  {
    id: 'lowest-common-ancestor',
    number: 236,
    title: 'Lowest Common Ancestor of a Binary Tree',
    scenario: 'Category Hierarchy / Permission Tree',
    difficulty: 'Medium',
    category: 'Trees',
    tags: ['Tree', 'DFS', 'Recursion'],
    entryFunction: 'lowestCommonAncestor',
    params: [
      { name: 'root', type: 'binaryTree' },
      { name: 'p', type: 'treeNodeRef' },
      { name: 'q', type: 'treeNodeRef' },
    ],
    returnType: 'treeNodeVal',
    compareMode: 'exact',
    description:
      'Given a binary tree (`root`) and two target nodes `p` and `q`, find their **lowest common ancestor (LCA)** — the lowest node in the tree that has both `p` and `q` as descendants (a node can be a descendant of itself).',
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3' },
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5' },
    ],
    constraints: ['All Node.val are unique.', 'p != q and both exist in root.'],
    hints: [
      'If `root` is null, `p`, or `q`, return `root` directly.',
      'Recurse into `left` and `right`: if both sides return non-null nodes, `root` is their split point (LCA); otherwise return whichever side is non-null.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    visualHint: {
      primaryStructure: 'tree',
      description: 'Bottom-up recursion bubbling target hits `p` and `q` until they meet at their LCA.',
    },
    starterCode: {
      python: `def lowestCommonAncestor(root, p, q):
    # p and q are TreeNode references in root
    pass`,
      javascript: `function lowestCommonAncestor(root, p, q) {
  // p and q are TreeNode references in root
  
}`,
      java: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        return null;
    }
}`,
      cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        return nullptr;
    }
};`,
      c: `struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    return NULL;
}`,
      csharp: `public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        return null;
    }
}`,
    },
    optimalCode: {
      python: `def lowestCommonAncestor(root, p, q):
    if root is None or root is p or root is q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left is not None and right is not None:
        return root
    return left if left is not None else right`,
      javascript: `function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left !== null && right !== null) return root;
  return left !== null ? left : right;
}`,
      java: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
      cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (root == nullptr || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left != nullptr && right != nullptr) return root;
        return left != nullptr ? left : right;
    }
};`,
      c: `struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    if (root == NULL || root == p || root == q) return root;
    struct TreeNode* left = lowestCommonAncestor(root->left, p, q);
    struct TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left != NULL && right != NULL) return root;
    return left != NULL ? left : right;
}`,
      csharp: `public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = LowestCommonAncestor(root.left, p, q);
        TreeNode right = LowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
    },
    testCases: [
      { id: 'lca-1', label: 'Case 1', args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1], expected: 3 },
      { id: 'lca-2', label: 'Ancestor Self', args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4], expected: 5 },
      { id: 'lca-3', label: 'Two Nodes', args: [[1, 2], 1, 2], expected: 1, isHidden: true },
    ],
  },
  {
    id: 'max-sum-distinct-subarrays',
    number: 2461,
    title: 'Maximum Sum of Distinct Subarrays With Length K',
    scenario: 'Kindle / CloudWatch Traffic Spike',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Array', 'Sliding Window', 'Hash Table'],
    entryFunction: 'maximumSubarraySum',
    params: [
      { name: 'nums', type: 'number[]' },
      { name: 'k', type: 'number' },
    ],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'You are given an integer array `nums` (e.g. request traffic spikes) and an integer `k`. Find the **maximum subarray sum** of all subarrays of `nums` that meet:\n1. Length of the subarray is exactly `k`, and\n2. All elements in the subarray are **distinct**.\n\nReturn `0` if no valid subarray exists.',
    examples: [
      { input: 'nums = [1, 5, 4, 2, 9, 9, 9], k = 3', output: '15', explanation: '[4, 2, 9] has 3 distinct items summing to 15.' },
      { input: 'nums = [4, 4, 4], k = 3', output: '0' },
    ],
    constraints: ['1 <= k <= nums.length <= 10^5'],
    hints: [
      'Maintain a `counts` frequency map and `windowSum` across `[left .. right]`.',
      'Whenever `right - left + 1 > k` or `counts[nums[right]] > 1`, shrink `left` until both constraints hold; record `maxSum` whenever size equals `k` and `len(counts) == k`.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    visualHint: {
      primaryStructure: 'array',
      highlightPointers: ['left', 'right'],
      description: 'Fixed-k sliding window `[left..right]` with uniqueness `counts` map and `windowSum`.',
    },
    starterCode: {
      python: `def maximumSubarraySum(nums, k):
    # Write your solution here
    pass`,
      javascript: `function maximumSubarraySum(nums, k) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public long maximumSubarraySum(int[] nums, int k) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    long long maximumSubarraySum(vector<int>& nums, int k) {
        return 0;
    }
};`,
      c: `long long maximumSubarraySum(int* nums, int numsSize, int k) {
    return 0;
}`,
      csharp: `public class Solution {
    public long MaximumSubarraySum(int[] nums, int k) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def maximumSubarraySum(nums, k):
    counts = {}
    windowSum = 0
    maxSum = 0
    left = 0

    for right in range(len(nums)):
        val = nums[right]
        windowSum += val
        counts[val] = counts.get(val, 0) + 1

        while right - left + 1 > k or counts[val] > 1:
            rem = nums[left]
            windowSum -= rem
            counts[rem] -= 1
            if counts[rem] == 0:
                del counts[rem]
            left += 1

        if right - left + 1 == k:
            maxSum = max(maxSum, windowSum)
    return maxSum`,
      javascript: `function maximumSubarraySum(nums, k) {
  const counts = new Map();
  let windowSum = 0;
  let maxSum = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    const val = nums[right];
    windowSum += val;
    counts.set(val, (counts.get(val) || 0) + 1);

    while (right - left + 1 > k || counts.get(val) > 1) {
      const rem = nums[left];
      windowSum -= rem;
      const nextCnt = counts.get(rem) - 1;
      if (nextCnt === 0) counts.delete(rem);
      else counts.set(rem, nextCnt);
      left++;
    }

    if (right - left + 1 === k) {
      maxSum = Math.max(maxSum, windowSum);
    }
  }
  return maxSum;
}`,
      java: `class Solution {
    public long maximumSubarraySum(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        long windowSum = 0;
        long maxSum = 0;
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            int val = nums[right];
            windowSum += val;
            counts.put(val, counts.getOrDefault(val, 0) + 1);
            while (right - left + 1 > k || counts.get(val) > 1) {
                int rem = nums[left];
                windowSum -= rem;
                counts.put(rem, counts.get(rem) - 1);
                if (counts.get(rem) == 0) counts.remove(rem);
                left++;
            }
            if (right - left + 1 == k) {
                maxSum = Math.max(maxSum, windowSum);
            }
        }
        return maxSum;
    }
}`,
      cpp: `class Solution {
public:
    long long maximumSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> counts;
        long long windowSum = 0;
        long long maxSum = 0;
        int left = 0;
        for (int right = 0; right < nums.size(); right++) {
            int val = nums[right];
            windowSum += val;
            counts[val]++;
            while (right - left + 1 > k || counts[val] > 1) {
                int rem = nums[left];
                windowSum -= rem;
                counts[rem]--;
                if (counts[rem] == 0) counts.erase(rem);
                left++;
            }
            if (right - left + 1 == k) {
                if (windowSum > maxSum) maxSum = windowSum;
            }
        }
        return maxSum;
    }
};`,
      c: `long long maximumSubarraySum(int* nums, int numsSize, int k) {
    int maxVal = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] > maxVal) maxVal = nums[i];
    }
    int* counts = (int*)calloc(maxVal + 2, sizeof(int));
    long long windowSum = 0;
    long long maxSum = 0;
    int left = 0;
    for (int right = 0; right < numsSize; right++) {
        int val = nums[right];
        windowSum += val;
        counts[val]++;
        while (right - left + 1 > k || counts[val] > 1) {
            int rem = nums[left];
            windowSum -= rem;
            counts[rem]--;
            left++;
        }
        if (right - left + 1 == k && windowSum > maxSum) {
            maxSum = windowSum;
        }
    }
    return maxSum;
}`,
      csharp: `public class Solution {
    public long MaximumSubarraySum(int[] nums, int k) {
        var counts = new Dictionary<int, int>();
        long windowSum = 0;
        long maxSum = 0;
        int left = 0;
        for (int right = 0; right < nums.Length; right++) {
            int val = nums[right];
            windowSum += val;
            counts[val] = counts.GetValueOrDefault(val, 0) + 1;
            while (right - left + 1 > k || counts[val] > 1) {
                int rem = nums[left];
                windowSum -= rem;
                counts[rem] = counts[rem] - 1;
                if (counts[rem] == 0) counts.Remove(rem);
                left++;
            }
            if (right - left + 1 == k) {
                maxSum = Math.Max(maxSum, windowSum);
            }
        }
        return maxSum;
    }
}`,
    },
    testCases: [
      { id: 'msd-1', label: 'Case 1', args: [[1, 5, 4, 2, 9, 9, 9], 3], expected: 15 },
      { id: 'msd-2', label: 'Duplicates', args: [[4, 4, 4], 3], expected: 0 },
      { id: 'msd-3', label: 'All Unique', args: [[9, 1, 8, 2], 2], expected: 10, isHidden: true },
    ],
  },
  {
    id: 'merge-intervals',
    number: 56,
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Intervals',
    tags: ['Array', 'Sorting', 'Intervals'],
    entryFunction: 'merge',
    params: [{ name: 'intervals', type: 'number[][]' }],
    returnType: 'number[][]',
    compareMode: 'exact',
    description:
      'Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals sorted by start.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' },
    ],
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2'],
    hints: [
      'Sort intervals ascending by start coordinate.',
      'Compare each interval with `merged[last]`: if `cur.start <= merged[last].end`, extend `end = max(end, cur.end)`; else push `[cur.start, cur.end]`.',
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    visualHint: {
      primaryStructure: 'intervals',
      description: 'Interactive interval timeline bars showing overlap checks and merged spans.',
    },
    starterCode: {
      python: `def merge(intervals):
    # Write your solution here
    pass`,
      javascript: `function merge(intervals) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        return new int[0][0];
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        return {};
    }
};`,
      c: `int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public int[][] Merge(int[][] intervals) {
        return new int[0][];
    }
}`,
    },
    optimalCode: {
      python: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [list(intervals[0])]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
      javascript: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [[intervals[0][0], intervals[0][1]]];
  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i];
    const last = merged[merged.length - 1];
    if (cur[0] <= last[1]) {
      last[1] = Math.max(last[1], cur[1]);
    } else {
      merged.push([cur[0], cur[1]]);
    }
  }
  return merged;
}`,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> merged = new ArrayList<>();
        for (int[] iv : intervals) {
            if (merged.isEmpty() || iv[0] > merged.get(merged.size() - 1)[1]) {
                merged.add(new int[] {iv[0], iv[1]});
            } else {
                int[] last = merged.get(merged.size() - 1);
                last[1] = Math.max(last[1], iv[1]);
            }
        }
        return merged.toArray(new int[0][]);
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });
        vector<vector<int>> merged;
        for (auto& iv : intervals) {
            if (merged.empty() || iv[0] > merged.back()[1]) {
                merged.push_back({iv[0], iv[1]});
            } else {
                merged.back()[1] = max(merged.back()[1], iv[1]);
            }
        }
        return merged;
    }
};`,
      c: `int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    for (int i = 0; i < intervalsSize; i++) {
        for (int j = i + 1; j < intervalsSize; j++) {
            if (intervals[j][0] < intervals[i][0]) {
                int* tmp = intervals[i];
                intervals[i] = intervals[j];
                intervals[j] = tmp;
            }
        }
    }
    int** merged = (int**)malloc(intervalsSize * sizeof(int*));
    *returnColumnSizes = (int*)malloc(intervalsSize * sizeof(int));
    int count = 0;
    for (int i = 0; i < intervalsSize; i++) {
        if (count == 0 || intervals[i][0] > merged[count - 1][1]) {
            merged[count] = (int*)malloc(2 * sizeof(int));
            merged[count][0] = intervals[i][0];
            merged[count][1] = intervals[i][1];
            (*returnColumnSizes)[count] = 2;
            count++;
        } else {
            if (intervals[i][1] > merged[count - 1][1]) {
                merged[count - 1][1] = intervals[i][1];
            }
        }
    }
    *returnSize = count;
    return merged;
}`,
      csharp: `public class Solution {
    public int[][] Merge(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[0] - b[0]);
        var merged = new List<int[]>();
        foreach (var iv in intervals) {
            if (merged.Count == 0 || iv[0] > merged[merged.Count - 1][1]) {
                merged.Add(new int[] {iv[0], iv[1]});
            } else {
                var last = merged[merged.Count - 1];
                last[1] = Math.Max(last[1], iv[1]);
            }
        }
        return merged.ToArray();
    }
}`,
    },
    testCases: [
      { id: 'mi-1', label: 'Case 1', args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { id: 'mi-2', label: 'Touching', args: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
      { id: 'mi-3', label: 'Unsorted Enclosing', args: [[[2, 3], [1, 10], [4, 6]]], expected: [[1, 10]], isHidden: true },
    ],
  },
];
