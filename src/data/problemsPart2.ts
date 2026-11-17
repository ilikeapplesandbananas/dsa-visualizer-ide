import type { Problem } from '../types/problem';

export const PROBLEMS_PART_2: Problem[] = [
  {
    id: 'linked-list-cycle',
    number: 141,
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    category: 'Linked List',
    tags: ['Linked List', 'Two Pointers', "Floyd's Tortoise & Hare"],
    entryFunction: 'hasCycle',
    params: [{ name: 'head', type: 'linkedListCycle' }],
    returnType: 'boolean',
    compareMode: 'exact',
    description:
      'Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` denotes the index of the tail\'s `next` connection (`-1` if no cycle).',
    examples: [
      {
        input: 'head = { "values": [3, 2, 0, -4], "pos": 1 }',
        output: 'true',
        explanation: 'Tail connects back to node index 1 (value 2).',
      },
      { input: 'head = { "values": [1, 2], "pos": 0 }', output: 'true' },
      { input: 'head = { "values": [1], "pos": -1 }', output: 'false' },
    ],
    constraints: ['The number of nodes is in range [0, 10^4].', 'pos is -1 or a valid index in the linked list.'],
    hints: [
      'Use Floyd\'s Tortoise & Hare: `slow` moves 1 step per iteration, `fast` moves 2 steps per iteration.',
      'If there is a cycle, `fast` will lap `slow` inside the loop so `slow === fast`. If `fast` hits `null`, there is no cycle.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    visualHint: {
      primaryStructure: 'linkedList',
      description: 'See the cycle back-edge and watch `slow` (1x) and `fast` (2x) collide!',
    },
    starterCode: {
      python: `def hasCycle(head):
    # Write your solution here
    pass`,
      javascript: `function hasCycle(head) {
  // Write your solution here
  
}`,
      java: `public class Solution {
    public boolean hasCycle(ListNode head) {
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool hasCycle(ListNode* head) {
        return false;
    }
};`,
      c: `bool hasCycle(struct ListNode* head) {
    return false;
}`,
      csharp: `public class Solution {
    public bool HasCycle(ListNode head) {
        return false;
    }
}`,
    },
    optimalCode: {
      python: `def hasCycle(head):
    slow = head
    fast = head

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
      javascript: `function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}`,
      java: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool hasCycle(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`,
      c: `bool hasCycle(struct ListNode* head) {
    struct ListNode* slow = head;
    struct ListNode* fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      csharp: `public class Solution {
    public bool HasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
    },
    testCases: [
      { id: 'llc-1', label: 'Case 1 (Cycle)', args: [{ values: [3, 2, 0, -4], pos: 1 }], expected: true },
      { id: 'llc-2', label: 'Case 2 (2-Node Cycle)', args: [{ values: [1, 2], pos: 0 }], expected: true },
      { id: 'llc-3', label: 'Case 3 (No Cycle)', args: [{ values: [1, 2, 3, 4], pos: -1 }], expected: false },
      { id: 'llc-4', label: 'Empty List', args: [{ values: [], pos: -1 }], expected: false, isHidden: true },
      { id: 'llc-5', label: 'Self Loop', args: [{ values: [7], pos: 0 }], expected: true, isHidden: true },
    ],
  },
  {
    id: 'merge-two-sorted-lists',
    number: 21,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: 'Linked List',
    tags: ['Linked List', 'Two Pointers'],
    entryFunction: 'mergeTwoLists',
    params: [
      { name: 'list1', type: 'linkedList' },
      { name: 'list2', type: 'linkedList' },
    ],
    returnType: 'linkedList',
    compareMode: 'exact',
    description:
      'You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one **sorted** list by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    examples: [
      { input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]', output: '[1, 1, 2, 3, 4, 4]' },
      { input: 'list1 = [], list2 = [0]', output: '[0]' },
    ],
    constraints: ['0 <= list length <= 50', 'Both list1 and list2 are sorted in non-decreasing order.'],
    hints: [
      'Create a `dummy = new ListNode(0)` sentinel node and a `tail = dummy` pointer.',
      'Compare `list1.val` and `list2.val`, attach the smaller node to `tail.next`, and advance both `tail` and the chosen list pointer.',
    ],
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    visualHint: {
      primaryStructure: 'linkedList',
      description: 'Watch `dummy` and `tail` weave `list1` and `list2` together into one sorted chain.',
    },
    starterCode: {
      python: `def mergeTwoLists(list1, list2):
    # Write your solution here
    pass`,
      javascript: `function mergeTwoLists(list1, list2) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        return null;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        return nullptr;
    }
};`,
      c: `struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    return NULL;
}`,
      csharp: `public class Solution {
    public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
        return null;
    }
}`,
    },
    optimalCode: {
      python: `def mergeTwoLists(list1, list2):
    dummy = ListNode(0)
    tail = dummy

    while list1 is not None and list2 is not None:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    tail.next = list1 if list1 is not None else list2
    return dummy.next`,
      javascript: `function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 !== null ? list1 : list2;
  return dummy.next;
}`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode* dummy = new ListNode(0);
        ListNode* tail = dummy;
        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 != nullptr ? list1 : list2;
        return dummy->next;
    }
};`,
      c: `struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    if (list1 == NULL) return list2;
    if (list2 == NULL) return list1;
    if (list1->val <= list2->val) {
        list1->next = mergeTwoLists(list1->next, list2);
        return list1;
    } else {
        list2->next = mergeTwoLists(list1, list2->next);
        return list2;
    }
}`,
      csharp: `public class Solution {
    public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`,
    },
    testCases: [
      { id: 'mtl-1', label: 'Case 1', args: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
      { id: 'mtl-2', label: 'Case 2', args: [[], [0]], expected: [0] },
      { id: 'mtl-3', label: 'Both Empty', args: [[], []], expected: [] },
      { id: 'mtl-4', label: 'Disjoint', args: [[1, 2, 3], [10, 20]], expected: [1, 2, 3, 10, 20], isHidden: true },
    ],
  },
  {
    id: 'invert-binary-tree',
    number: 226,
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    category: 'Trees',
    tags: ['Tree', 'DFS', 'Recursion'],
    entryFunction: 'invertTree',
    params: [{ name: 'root', type: 'binaryTree' }],
    returnType: 'binaryTree',
    compareMode: 'exact',
    description:
      'Given the `root` of a binary tree, invert the tree (mirror its left and right subtrees recursively), and return its root.\n\n*Note: `TreeNode(val, left, right)` is pre-defined for you.*',
    examples: [
      { input: 'root = [4, 2, 7, 1, 3, 6, 9]', output: '[4, 7, 2, 9, 6, 3, 1]' },
      { input: 'root = [2, 1, 3]', output: '[2, 3, 1]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the tree is in range [0, 100].'],
    hints: [
      'Base case: if `root === null`, return `null`.',
      'Swap `root.left` and `root.right`, then recursively invert both children!',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) call stack',
    visualHint: {
      primaryStructure: 'tree',
      description: 'Watch the Binary Tree mirror live alongside the Recursion Call Stack!',
    },
    starterCode: {
      python: `def invertTree(root):
    # Write your solution here
    pass`,
      javascript: `function invertTree(root) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        return root;
    }
}`,
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        return root;
    }
};`,
      c: `struct TreeNode* invertTree(struct TreeNode* root) {
    return root;
}`,
      csharp: `public class Solution {
    public TreeNode InvertTree(TreeNode root) {
        return root;
    }
}`,
    },
    optimalCode: {
      python: `def invertTree(root):
    if root is None:
        return None

    root.left, root.right = root.right, root.left
    invertTree(root.left)
    invertTree(root.right)
    return root`,
      javascript: `function invertTree(root) {
  if (root === null) return null;

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);
  return root;
}`,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`,
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) return nullptr;
        TreeNode* temp = root->left;
        root->left = root->right;
        root->right = temp;
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`,
      c: `struct TreeNode* invertTree(struct TreeNode* root) {
    if (root == NULL) return NULL;
    struct TreeNode* temp = root->left;
    root->left = root->right;
    root->right = temp;
    invertTree(root->left);
    invertTree(root->right);
    return root;
}`,
      csharp: `public class Solution {
    public TreeNode InvertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        InvertTree(root.left);
        InvertTree(root.right);
        return root;
    }
}`,
    },
    testCases: [
      { id: 'ibt-1', label: 'Case 1', args: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1] },
      { id: 'ibt-2', label: 'Case 2', args: [[2, 1, 3]], expected: [2, 3, 1] },
      { id: 'ibt-3', label: 'Empty', args: [[]], expected: [] },
      { id: 'ibt-4', label: 'Skewed', args: [[1, 2, null, 3]], expected: [1, null, 2, null, 3], isHidden: true },
    ],
  },
  {
    id: 'level-order-traversal',
    number: 102,
    title: 'Binary Tree Level Order Traversal',
    scenario: 'Category Hierarchy / Permission Tree',
    difficulty: 'Medium',
    category: 'Trees',
    tags: ['Tree', 'BFS', 'Queue'],
    entryFunction: 'levelOrder',
    params: [{ name: 'root', type: 'binaryTree' }],
    returnType: 'number[][]',
    compareMode: 'exact',
    description:
      'Given the `root` of a binary tree (representing a category or permission hierarchy), return the **level order traversal** of its nodes\' values from left to right, depth level by depth level.',
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '[[3], [9, 20], [15, 7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the tree is in range [0, 2000].'],
    hints: [
      'Use a FIFO `queue` initialized with `[root]`.',
      'At each level, capture `levelSize = queue.length` and process exactly `levelSize` nodes before starting the next level list.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    visualHint: {
      primaryStructure: 'tree',
      description: 'See tree nodes glow as they enter the BFS `queue` and populate `result` level by level.',
    },
    starterCode: {
      python: `def levelOrder(root):
    # Write your solution here
    pass`,
      javascript: `function levelOrder(root) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        return new ArrayList<>();
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        return {};
    }
};`,
      c: `int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public IList<IList<int>> LevelOrder(TreeNode root) {
        return new List<IList<int>>();
    }
}`,
    },
    optimalCode: {
      python: `def levelOrder(root):
    if not root:
        return []
    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`,
      javascript: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
      java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> level;
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(level);
        }
        return result;
    }
};`,
      c: `int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    if (root == NULL) return NULL;
    int** result = (int**)malloc(2000 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(2000 * sizeof(int));
    struct TreeNode* queue[2000];
    int front = 0, back = 0;
    queue[back++] = root;
    while (front < back) {
        int levelSize = back - front;
        int* level = (int*)malloc(levelSize * sizeof(int));
        for (int i = 0; i < levelSize; i++) {
            struct TreeNode* node = queue[front++];
            level[i] = node->val;
            if (node->left != NULL) queue[back++] = node->left;
            if (node->right != NULL) queue[back++] = node->right;
        }
        result[*returnSize] = level;
        (*returnColumnSizes)[*returnSize] = levelSize;
        (*returnSize)++;
    }
    return result;
}`,
      csharp: `public class Solution {
    public IList<IList<int>> LevelOrder(TreeNode root) {
        var result = new List<IList<int>>();
        if (root == null) return result;
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        while (queue.Count > 0) {
            int levelSize = queue.Count;
            var level = new List<int>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.Dequeue();
                level.Add(node.val);
                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }
            result.Add(level);
        }
        return result;
    }
}`,
    },
    testCases: [
      { id: 'lot-1', label: 'Case 1', args: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]] },
      { id: 'lot-2', label: 'Case 2', args: [[1]], expected: [[1]] },
      { id: 'lot-3', label: 'Empty', args: [[]], expected: [] },
      { id: 'lot-4', label: 'Full 3 Levels', args: [[1, 2, 3, 4, 5, 6, 7]], expected: [[1], [2, 3], [4, 5, 6, 7]], isHidden: true },
    ],
  },
  {
    id: 'validate-bst',
    number: 98,
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    category: 'Trees',
    tags: ['Tree', 'BST', 'DFS'],
    entryFunction: 'isValidBST',
    params: [{ name: 'root', type: 'binaryTree' }],
    returnType: 'boolean',
    compareMode: 'exact',
    description:
      'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys **strictly less than** the node\'s key.\n- The right subtree of a node contains only nodes with keys **strictly greater than** the node\'s key.\n- Both the left and right subtrees must also be binary search trees.',
    examples: [
      { input: 'root = [2, 1, 3]', output: 'true' },
      { input: 'root = [5, 1, 4, null, null, 3, 6]', output: 'false', explanation: 'Root is 5, but its right child has value 4.' },
    ],
    constraints: ['The number of nodes in the tree is in range [1, 10^4].'],
    hints: [
      'Checking only `node.left.val < node.val < node.right.val` is NOT enough — every node in the entire left subtree must stay below ancestor bounds!',
      'Pass `(minBound, maxBound)` down recursion: going left updates `maxBound = node.val`; going right updates `minBound = node.val`.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    visualHint: {
      primaryStructure: 'tree',
      description: 'Follow `validate(node, minVal, maxVal)` descending the Tree SVG & Recursion Tree.',
    },
    starterCode: {
      python: `def isValidBST(root):
    # Write your solution here
    pass`,
      javascript: `function isValidBST(root) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return false;
    }
};`,
      c: `bool isValidBST(struct TreeNode* root) {
    return false;
}`,
      csharp: `public class Solution {
    public bool IsValidBST(TreeNode root) {
        return false;
    }
}`,
    },
    optimalCode: {
      python: `def isValidBST(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (
            validate(node.left, min_val, node.val)
            and validate(node.right, node.val, max_val)
        )
    return validate(root, float('-inf'), float('inf'))`,
      javascript: `function isValidBST(root) {
  function validate(node, minVal, maxVal) {
    if (!node) return true;
    if (node.val <= minVal || node.val >= maxVal) return false;
    return (
      validate(node.left, minVal, node.val) &&
      validate(node.right, node.val, maxVal)
    );
  }
  return validate(root, -Infinity, Infinity);
}`,
      java: `class Solution {
    private boolean validate(TreeNode node, long minVal, long maxVal) {
        if (node == null) return true;
        if (node.val <= minVal || node.val >= maxVal) return false;
        return validate(node.left, minVal, node.val) && validate(node.right, node.val, maxVal);
    }
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
}`,
      cpp: `class Solution {
public:
    bool validate(TreeNode* node, long long minVal, long long maxVal) {
        if (!node) return true;
        if (node->val <= minVal || node->val >= maxVal) return false;
        return validate(node->left, minVal, node->val) && validate(node->right, node->val, maxVal);
    }
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
};`,
      c: `bool validate(struct TreeNode* node, long minVal, long maxVal) {
    if (node == NULL) return true;
    if (node->val <= minVal || node->val >= maxVal) return false;
    return validate(node->left, minVal, node->val) && validate(node->right, node->val, maxVal);
}
bool isValidBST(struct TreeNode* root) {
    return validate(root, -2147483649, 2147483648);
}`,
      csharp: `public class Solution {
    private bool Validate(TreeNode node, long minVal, long maxVal) {
        if (node == null) return true;
        if (node.val <= minVal || node.val >= maxVal) return false;
        return Validate(node.left, minVal, node.val) && Validate(node.right, node.val, maxVal);
    }
    public bool IsValidBST(TreeNode root) {
        return Validate(root, long.MinValue, long.MaxValue);
    }
}`,
    },
    testCases: [
      { id: 'vbst-1', label: 'Case 1 (Valid)', args: [[2, 1, 3]], expected: true },
      { id: 'vbst-2', label: 'Case 2 (Invalid)', args: [[5, 1, 4, null, null, 3, 6]], expected: false },
      { id: 'vbst-3', label: 'Subtree Violation', args: [[5, 4, 6, null, null, 3, 7]], expected: false },
      { id: 'vbst-4', label: 'Equal Duplicate', args: [[2, 2, 2]], expected: false, isHidden: true },
      { id: 'vbst-5', label: 'Deep Valid', args: [[8, 3, 10, 1, 6, null, 14]], expected: true, isHidden: true },
    ],
  },
  {
    id: 'number-of-islands',
    number: 200,
    title: 'Number of Islands',
    scenario: 'Warehouse Robot / Server Cluster',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Matrix', 'DFS', 'BFS', 'Grid'],
    entryFunction: 'numIslands',
    params: [{ name: 'grid', type: 'string[][]' }],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'Given an `m x n` 2D binary grid `grid` which represents a map of `"1"`s (land) and `"0"`s (water), return the number of islands.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    examples: [
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: '3',
      },
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1',
      },
    ],
    constraints: ['1 <= m, n <= 300', 'grid[r][c] is "0" or "1".'],
    hints: [
      'Scan every cell `(r, c)`. Whenever you hit unvisited land `"1"`, increment `islands` and flood-fill the entire island.',
      'During DFS/BFS flood-fill, mark visited land cells as `"#"` (or `"0"`) so you never count the same island twice.',
    ],
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
    visualHint: {
      primaryStructure: 'matrix',
      highlightPointers: ['r', 'c'],
      description: 'Watch `(r, c)` scan the 2D land/water grid and flood-fill each discovered island!',
    },
    starterCode: {
      python: `def numIslands(grid):
    # Write your solution here
    pass`,
      javascript: `function numIslands(grid) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        return 0;
    }
};`,
      c: `int numIslands(char** grid, int gridSize, int* gridColSize) {
    return 0;
}`,
      csharp: `public class Solution {
    public int NumIslands(char[][] grid) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def numIslands(grid):
    rows, cols = len(grid), len(grid[0])
    islands = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '#'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)
    return islands`,
      javascript: `function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') {
      return;
    }
    grid[r][c] = '#';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islands++;
        dfs(r, c);
      }
    }
  }
  return islands;
}`,
      java: `class Solution {
    private void dfs(char[][] grid, int r, int c, int rows, int cols) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') return;
        grid[r][c] = '#';
        dfs(grid, r + 1, c, rows, cols);
        dfs(grid, r - 1, c, rows, cols);
        dfs(grid, r, c + 1, rows, cols);
        dfs(grid, r, c - 1, rows, cols);
    }
    public int numIslands(char[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        int islands = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    dfs(grid, r, c, rows, cols);
                }
            }
        }
        return islands;
    }
}`,
      cpp: `class Solution {
public:
    void dfs(vector<vector<char>>& grid, int r, int c, int rows, int cols) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') return;
        grid[r][c] = '#';
        dfs(grid, r + 1, c, rows, cols);
        dfs(grid, r - 1, c, rows, cols);
        dfs(grid, r, c + 1, rows, cols);
        dfs(grid, r, c - 1, rows, cols);
    }
    int numIslands(vector<vector<char>>& grid) {
        int rows = grid.size();
        int cols = grid[0].size();
        int islands = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    dfs(grid, r, c, rows, cols);
                }
            }
        }
        return islands;
    }
};`,
      c: `void dfsIsland(char** grid, int r, int c, int rows, int cols) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') return;
    grid[r][c] = '#';
    dfsIsland(grid, r + 1, c, rows, cols);
    dfsIsland(grid, r - 1, c, rows, cols);
    dfsIsland(grid, r, c + 1, rows, cols);
    dfsIsland(grid, r, c - 1, rows, cols);
}
int numIslands(char** grid, int gridSize, int* gridColSize) {
    int rows = gridSize;
    int cols = gridColSize[0];
    int islands = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                islands++;
                dfsIsland(grid, r, c, rows, cols);
            }
        }
    }
    return islands;
}`,
      csharp: `public class Solution {
    private void Dfs(char[][] grid, int r, int c, int rows, int cols) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') return;
        grid[r][c] = '#';
        Dfs(grid, r + 1, c, rows, cols);
        Dfs(grid, r - 1, c, rows, cols);
        Dfs(grid, r, c + 1, rows, cols);
        Dfs(grid, r, c - 1, rows, cols);
    }
    public int NumIslands(char[][] grid) {
        int rows = grid.Length;
        int cols = grid[0].Length;
        int islands = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    Dfs(grid, r, c, rows, cols);
                }
            }
        }
        return islands;
    }
}`,
    },
    testCases: [
      {
        id: 'noi-1',
        label: 'Case 1 (3 Islands)',
        args: [
          [
            ['1', '1', '0', '0', '0'],
            ['1', '1', '0', '0', '0'],
            ['0', '0', '1', '0', '0'],
            ['0', '0', '0', '1', '1'],
          ],
        ],
        expected: 3,
      },
      {
        id: 'noi-2',
        label: 'Case 2 (1 Island)',
        args: [
          [
            ['1', '1', '1', '0'],
            ['1', '0', '1', '0'],
            ['1', '1', '0', '0'],
          ],
        ],
        expected: 1,
      },
      { id: 'noi-3', label: 'All Water', args: [[['0', '0'], ['0', '0']]], expected: 0 },
      { id: 'noi-4', label: 'Checkerboard', args: [[['1', '0', '1'], ['0', '1', '0'], ['1', '0', '1']]], expected: 5, isHidden: true },
    ],
  },
  {
    id: 'course-schedule',
    number: 207,
    title: 'Course Schedule',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Graph', 'Topological Sort', 'BFS'],
    entryFunction: 'canFinish',
    params: [
      { name: 'numCourses', type: 'number' },
      { name: 'prerequisites', type: 'number[][]' },
    ],
    returnType: 'boolean',
    compareMode: 'exact',
    description:
      'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you **must** take course `b` first if you want to take course `a`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false` (cycle detected).',
    examples: [
      { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Cycle between course 0 and course 1.' },
    ],
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000'],
    hints: [
      'Build a directed graph `adj` (`b -> a`) and an `indegree` array counting prerequisites for each course.',
      'Using Kahn\'s BFS Topological Sort, enqueue all 0-indegree courses; peel edges off as you take courses and check if `taken === numCourses`.',
    ],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    visualHint: {
      primaryStructure: 'graph',
      highlightPointers: ['u', 'v'],
      description: 'Live directed graph `adj` + `indegree` array + topological BFS `queue`!',
    },
    starterCode: {
      python: `def canFinish(numCourses, prerequisites):
    # Write your solution here
    pass`,
      javascript: `function canFinish(numCourses, prerequisites) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        return false;
    }
};`,
      c: `bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {
    return false;
}`,
      csharp: `public class Solution {
    public bool CanFinish(int numCourses, int[][] prerequisites) {
        return false;
    }
}`,
    },
    optimalCode: {
      python: `def canFinish(numCourses, prerequisites):
    adj = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses

    for course, pre in prerequisites:
        adj[pre].append(course)
        indegree[course] += 1

    queue = deque()
    for i in range(numCourses):
        if indegree[i] == 0:
            queue.append(i)

    taken = 0
    while queue:
        u = queue.popleft()
        taken += 1
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                queue.append(v)
    return taken == numCourses`,
      javascript: `function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    indegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let taken = 0;
  while (queue.length > 0) {
    const u = queue.shift();
    taken++;
    for (const v of adj[u]) {
      indegree[v]--;
      if (indegree[v] === 0) queue.push(v);
    }
  }
  return taken === numCourses;
}`,
      java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[numCourses];
        for (int[] edge : prerequisites) {
            adj.get(edge[1]).add(edge[0]);
            indegree[edge[0]]++;
        }
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) queue.offer(i);
        }
        int taken = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            taken++;
            for (int v : adj.get(u)) {
                indegree[v]--;
                if (indegree[v] == 0) queue.offer(v);
            }
        }
        return taken == numCourses;
    }
}`,
      cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);
        for (auto& edge : prerequisites) {
            adj[edge[1]].push_back(edge[0]);
            indegree[edge[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.push(i);
        }
        int taken = 0;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            taken++;
            for (int v : adj[u]) {
                indegree[v]--;
                if (indegree[v] == 0) q.push(v);
            }
        }
        return taken == numCourses;
    }
};`,
      c: `bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {
    int* indegree = (int*)calloc(numCourses, sizeof(int));
    for (int i = 0; i < prerequisitesSize; i++) {
        indegree[prerequisites[i][0]]++;
    }
    int* queue = (int*)malloc(numCourses * sizeof(int));
    int front = 0, back = 0;
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) queue[back++] = i;
    }
    int taken = 0;
    while (front < back) {
        int u = queue[front++];
        taken++;
        for (int i = 0; i < prerequisitesSize; i++) {
            if (prerequisites[i][1] == u) {
                int v = prerequisites[i][0];
                indegree[v]--;
                if (indegree[v] == 0) queue[back++] = v;
            }
        }
    }
    return taken == numCourses;
}`,
      csharp: `public class Solution {
    public bool CanFinish(int numCourses, int[][] prerequisites) {
        var adj = new List<int>[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new List<int>();
        int[] indegree = new int[numCourses];
        foreach (var edge in prerequisites) {
            adj[edge[1]].Add(edge[0]);
            indegree[edge[0]]++;
        }
        var queue = new Queue<int>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) queue.Enqueue(i);
        }
        int taken = 0;
        while (queue.Count > 0) {
            int u = queue.Dequeue();
            taken++;
            foreach (int v in adj[u]) {
                indegree[v]--;
                if (indegree[v] == 0) queue.Enqueue(v);
            }
        }
        return taken == numCourses;
    }
}`,
    },
    testCases: [
      { id: 'cs-1', label: 'Case 1 (DAG)', args: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]], expected: true },
      { id: 'cs-2', label: 'Case 2 (Cycle)', args: [2, [[1, 0], [0, 1]]], expected: false },
      { id: 'cs-3', label: 'No Edges', args: [3, []], expected: true },
      { id: 'cs-4', label: '3-Cycle', args: [3, [[0, 1], [1, 2], [2, 0]]], expected: false, isHidden: true },
    ],
  },
  {
    id: 'climbing-stairs',
    number: 70,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Dynamic Programming', 'DP Array'],
    entryFunction: 'climbStairs',
    params: [{ name: 'n', type: 'number' }],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 5', output: '8', explanation: 'DP table fills [1, 1, 2, 3, 5, 8].' },
      { input: 'n = 3', output: '3' },
    ],
    constraints: ['1 <= n <= 45'],
    hints: [
      'To reach step `i`, you either came from step `i - 1` (1-step jump) or step `i - 2` (2-step jump).',
      'So `dp[i] = dp[i - 1] + dp[i - 2]` with base cases `dp[0] = 1`, `dp[1] = 1`.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    visualHint: {
      primaryStructure: 'dp',
      highlightPointers: ['i'],
      description: 'Watch the 1D `dp` array fill step by step from `i = 2` to `n`!',
    },
    starterCode: {
      python: `def climbStairs(n):
    # Write your solution here
    pass`,
      javascript: `function climbStairs(n) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int climbStairs(int n) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        return 0;
    }
};`,
      c: `int climbStairs(int n) {
    return 0;
}`,
      csharp: `public class Solution {
    public int ClimbStairs(int n) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def climbStairs(n):
    if n <= 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
      javascript: `function climbStairs(n) {
  if (n <= 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 1) return 1;
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 1) return 1;
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
};`,
      c: `int climbStairs(int n) {
    if (n <= 1) return 1;
    int* dp = (int*)calloc(n + 1, sizeof(int));
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
      csharp: `public class Solution {
    public int ClimbStairs(int n) {
        if (n <= 1) return 1;
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`,
    },
    testCases: [
      { id: 'cs70-1', label: 'Case 1 (n=5)', args: [5], expected: 8 },
      { id: 'cs70-2', label: 'Case 2 (n=3)', args: [3], expected: 3 },
      { id: 'cs70-3', label: 'Case 3 (n=1)', args: [1], expected: 1 },
      { id: 'cs70-4', label: 'n=8', args: [8], expected: 34, isHidden: true },
    ],
  },
  {
    id: 'coin-change',
    number: 322,
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    entryFunction: 'coinChange',
    params: [
      { name: 'coins', type: 'number[]' },
      { name: 'amount', type: 'number' },
    ],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the **fewest number of coins** that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.',
    examples: [
      { input: 'coins = [1, 2, 5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' },
    ],
    constraints: ['1 <= coins.length <= 12', '0 <= amount <= 10^4'],
    hints: [
      'Define `dp[a]` = minimum coins needed to make amount `a`, initialized to `amount + 1` (representing infinity), with `dp[0] = 0`.',
      'For each amount `a` from `1..amount` and each `coin <= a`, relax `dp[a] = min(dp[a], dp[a - coin] + 1)`.',
    ],
    timeComplexity: 'O(amount * coins.length)',
    spaceComplexity: 'O(amount)',
    visualHint: {
      primaryStructure: 'dp',
      highlightPointers: ['a'],
      description: 'Bottom-up `dp` array showing optimal coin counts for amounts `0..amount`.',
    },
    starterCode: {
      python: `def coinChange(coins, amount):
    # Write your solution here
    pass`,
      javascript: `function coinChange(coins, amount) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        return -1;
    }
};`,
      c: `int coinChange(int* coins, int coinsSize, int amount) {
    return -1;
}`,
      csharp: `public class Solution {
    public int CoinChange(int[] coins, int amount) {
        return -1;
    }
}`,
    },
    optimalCode: {
      python: `def coinChange(coins, amount):
    INF = amount + 1
    dp = [INF] * (amount + 1)
    dp[0] = 0

    for a in range(1, amount + 1):
        for coin in coins:
            if a - coin >= 0:
                dp[a] = min(dp[a], dp[a - coin] + 1)
    return -1 if dp[amount] > amount else dp[amount]`,
      javascript: `function coinChange(coins, amount) {
  const INF = amount + 1;
  const dp = new Array(amount + 1).fill(INF);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (a - coin >= 0) {
        dp[a] = Math.min(dp[a], dp[a - coin] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int INF = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (a - coin >= 0) {
                    dp[a] = Math.min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int INF = amount + 1;
        vector<int> dp(amount + 1, INF);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (a - coin >= 0) {
                    dp[a] = min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
      c: `int coinChange(int* coins, int coinsSize, int amount) {
    int INF = amount + 1;
    int* dp = (int*)malloc((amount + 1) * sizeof(int));
    for (int i = 0; i <= amount; i++) dp[i] = INF;
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int j = 0; j < coinsSize; j++) {
            int coin = coins[j];
            if (a - coin >= 0 && dp[a - coin] + 1 < dp[a]) {
                dp[a] = dp[a - coin] + 1;
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      csharp: `public class Solution {
    public int CoinChange(int[] coins, int amount) {
        int INF = amount + 1;
        int[] dp = new int[amount + 1];
        Array.Fill(dp, INF);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            foreach (int coin in coins) {
                if (a - coin >= 0) {
                    dp[a] = Math.Min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
    },
    testCases: [
      { id: 'cc-1', label: 'Case 1', args: [[1, 2, 5], 11], expected: 3 },
      { id: 'cc-2', label: 'Case 2', args: [[2], 3], expected: -1 },
      { id: 'cc-3', label: 'Zero Amount', args: [[1], 0], expected: 0 },
      { id: 'cc-4', label: 'Greedy Fails', args: [[1, 3, 4], 6], expected: 2, isHidden: true },
    ],
  },
  {
    id: 'longest-common-subsequence',
    number: 1143,
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['String', 'Dynamic Programming', '2D Matrix'],
    entryFunction: 'longestCommonSubsequence',
    params: [
      { name: 'text1', type: 'string' },
      { name: 'text2', type: 'string' },
    ],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'Given two strings `text1` and `text2`, return the length of their **longest common subsequence**. If there is no common subsequence, return `0`.\n\nA subsequence is derived by deleting some or no characters without changing the relative order of the remaining characters.',
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'LCS is "ace" of length 3.' },
      { input: 'text1 = "abc", text2 = "def"', output: '0' },
    ],
    constraints: ['1 <= text1.length, text2.length <= 1000'],
    hints: [
      'Build a 2D DP matrix `dp` of size `(m + 1) x (n + 1)` where `dp[i][j]` is LCS of `text1[0..i-1]` and `text2[0..j-1]`.',
      'If `text1[i - 1] === text2[j - 1]`, `dp[i][j] = 1 + dp[i - 1][j - 1]`; else `max(dp[i - 1][j], dp[i][j - 1])`.',
    ],
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
    visualHint: {
      primaryStructure: 'matrix',
      highlightPointers: ['i', 'j'],
      description: '2D DP matrix `dp[i][j]` filling cell-by-cell with `(i, j)` crosshair!',
    },
    starterCode: {
      python: `def longestCommonSubsequence(text1, text2):
    # Write your solution here
    pass`,
      javascript: `function longestCommonSubsequence(text1, text2) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        return 0;
    }
};`,
      c: `int longestCommonSubsequence(char* text1, char* text2) {
    return 0;
}`,
      csharp: `public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
      javascript: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}`,
      java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,
      cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size();
        int n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
};`,
      c: `int longestCommonSubsequence(char* text1, char* text2) {
    int m = strlen(text1);
    int n = strlen(text2);
    int** dp = (int**)malloc((m + 1) * sizeof(int*));
    for (int i = 0; i <= m; i++) {
        dp[i] = (int*)calloc(n + 1, sizeof(int));
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
            }
        }
    }
    return dp[m][n];
}`,
      csharp: `public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        int m = text1.Length;
        int n = text2.Length;
        int[][] dp = new int[m + 1][];
        for (int i = 0; i <= m; i++) dp[i] = new int[n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.Max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,
    },
    testCases: [
      { id: 'lcs-1', label: 'Case 1', args: ['abcde', 'ace'], expected: 3 },
      { id: 'lcs-2', label: 'Case 2', args: ['abc', 'def'], expected: 0 },
      { id: 'lcs-3', label: 'Identical', args: ['algo', 'algo'], expected: 4 },
      { id: 'lcs-4', label: 'Subsequence', args: ['bsbininm', 'jmjkbkjkv'], expected: 1, isHidden: true },
    ],
  },

  // --- PLAYGROUND TEMPLATES ---
  {
    id: 'playground-quicksort',
    number: 901,
    title: 'Playground: Quick Sort & Array Swaps',
    difficulty: 'Playground',
    category: 'Sorting & Playground',
    tags: ['Playground', 'Sorting', 'Recursion'],
    isPlayground: true,
    entryFunction: '',
    params: [],
    returnType: 'any',
    compareMode: 'playground',
    description:
      'Free **Sorting & Recursion Playground**! Write or tweak any sorting algorithm (Quick Sort, Merge Sort, Insertion Sort) and watch the bars swap, pointers move, and recursion call tree unfold in real time.',
    examples: [
      { input: 'arr = [38, 27, 43, 3, 9, 82, 10]', output: '[3, 9, 10, 27, 38, 43, 82]' },
    ],
    constraints: ['Runs top-level script or `main()` directly.'],
    hints: ['Try changing `arr` or replacing `quickSort` with `bubbleSort` or `mergeSort`!'],
    timeComplexity: 'O(n log n) avg',
    spaceComplexity: 'O(log n)',
    visualHint: {
      primaryStructure: 'bars',
      description: 'Live bar chart + partition pointers (`low`, `high`, `pivot`, `i`) + recursion tree!',
    },
    starterCode: {
      python: `arr = [38, 27, 43, 3, 9, 82, 10]

def partition(nums, low, high):
    pivot = nums[high]
    i = low
    for j in range(low, high):
        if nums[j] <= pivot:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
    nums[i], nums[high] = nums[high], nums[i]
    return i

def quickSort(nums, low, high):
    if low >= high:
        return
    p = partition(nums, low, high)
    quickSort(nums, low, p - 1)
    quickSort(nums, p + 1, high)

quickSort(arr, 0, len(arr) - 1)
print("Sorted:", arr)`,
      javascript: `const arr = [38, 27, 43, 3, 9, 82, 10];

function quickSort(nums, low, high) {
  if (low >= high) return;
  const p = partition(nums, low, high);
  quickSort(nums, low, p - 1);
  quickSort(nums, p + 1, high);
}

function partition(nums, low, high) {
  const pivot = nums[high];
  let i = low;
  for (let j = low; j < high; j++) {
    if (nums[j] <= pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  [nums[i], nums[high]] = [nums[high], nums[i]];
  return i;
}

quickSort(arr, 0, arr.length - 1);
console.log('Sorted:', arr);`,
      java: `class Main {
    static int partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                int tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
                i++;
            }
        }
        int tmp = nums[i];
        nums[i] = nums[high];
        nums[high] = tmp;
        return i;
    }
    static void quickSort(int[] nums, int low, int high) {
        if (low >= high) return;
        int p = partition(nums, low, high);
        quickSort(nums, low, p - 1);
        quickSort(nums, p + 1, high);
    }
    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}`,
      cpp: `int partition(vector<int>& nums, int low, int high) {
    int pivot = nums[high];
    int i = low;
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
            i++;
        }
    }
    int tmp = nums[i];
    nums[i] = nums[high];
    nums[high] = tmp;
    return i;
}

void quickSort(vector<int>& nums, int low, int high) {
    if (low >= high) return;
    int p = partition(nums, low, high);
    quickSort(nums, low, p - 1);
    quickSort(nums, p + 1, high);
}

int main() {
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    quickSort(arr, 0, arr.size() - 1);
    return 0;
}`,
      c: `int partition(int* nums, int low, int high) {
    int pivot = nums[high];
    int i = low;
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
            i++;
        }
    }
    int tmp = nums[i];
    nums[i] = nums[high];
    nums[high] = tmp;
    return i;
}

void quickSort(int* nums, int low, int high) {
    if (low >= high) return;
    int p = partition(nums, low, high);
    quickSort(nums, low, p - 1);
    quickSort(nums, p + 1, high);
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    quickSort(arr, 0, 6);
    return 0;
}`,
      csharp: `public class Program {
    static int Partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                int tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
                i++;
            }
        }
        int t = nums[i];
        nums[i] = nums[high];
        nums[high] = t;
        return i;
    }
    static void QuickSort(int[] nums, int low, int high) {
        if (low >= high) return;
        int p = Partition(nums, low, high);
        QuickSort(nums, low, p - 1);
        QuickSort(nums, p + 1, high);
    }
    public static void Main() {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        QuickSort(arr, 0, arr.Length - 1);
    }
}`,
    },
    optimalCode: {
      python: `arr = [38, 27, 43, 3, 9, 82, 10]

def partition(nums, low, high):
    pivot = nums[high]
    i = low
    for j in range(low, high):
        if nums[j] <= pivot:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
    nums[i], nums[high] = nums[high], nums[i]
    return i

def quickSort(nums, low, high):
    if low >= high:
        return
    p = partition(nums, low, high)
    quickSort(nums, low, p - 1)
    quickSort(nums, p + 1, high)

quickSort(arr, 0, len(arr) - 1)
print("Sorted:", arr)`,
      javascript: `const arr = [38, 27, 43, 3, 9, 82, 10];

function quickSort(nums, low, high) {
  if (low >= high) return;
  const p = partition(nums, low, high);
  quickSort(nums, low, p - 1);
  quickSort(nums, p + 1, high);
}

function partition(nums, low, high) {
  const pivot = nums[high];
  let i = low;
  for (let j = low; j < high; j++) {
    if (nums[j] <= pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  [nums[i], nums[high]] = [nums[high], nums[i]];
  return i;
}

quickSort(arr, 0, arr.length - 1);
console.log('Sorted:', arr);`,
      java: `class Main {
    static int partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                int tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
                i++;
            }
        }
        int tmp = nums[i];
        nums[i] = nums[high];
        nums[high] = tmp;
        return i;
    }
    static void quickSort(int[] nums, int low, int high) {
        if (low >= high) return;
        int p = partition(nums, low, high);
        quickSort(nums, low, p - 1);
        quickSort(nums, p + 1, high);
    }
    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}`,
      cpp: `int partition(vector<int>& nums, int low, int high) {
    int pivot = nums[high];
    int i = low;
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
            i++;
        }
    }
    int tmp = nums[i];
    nums[i] = nums[high];
    nums[high] = tmp;
    return i;
}

void quickSort(vector<int>& nums, int low, int high) {
    if (low >= high) return;
    int p = partition(nums, low, high);
    quickSort(nums, low, p - 1);
    quickSort(nums, p + 1, high);
}

int main() {
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    quickSort(arr, 0, arr.size() - 1);
    return 0;
}`,
      c: `int partition(int* nums, int low, int high) {
    int pivot = nums[high];
    int i = low;
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
            i++;
        }
    }
    int tmp = nums[i];
    nums[i] = nums[high];
    nums[high] = tmp;
    return i;
}

void quickSort(int* nums, int low, int high) {
    if (low >= high) return;
    int p = partition(nums, low, high);
    quickSort(nums, low, p - 1);
    quickSort(nums, p + 1, high);
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    quickSort(arr, 0, 6);
    return 0;
}`,
      csharp: `public class Program {
    static int Partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                int tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
                i++;
            }
        }
        int t = nums[i];
        nums[i] = nums[high];
        nums[high] = t;
        return i;
    }
    static void QuickSort(int[] nums, int low, int high) {
        if (low >= high) return;
        int p = Partition(nums, low, high);
        QuickSort(nums, low, p - 1);
        QuickSort(nums, p + 1, high);
    }
    public static void Main() {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        QuickSort(arr, 0, arr.Length - 1);
    }
}`,
    },
    testCases: [{ id: 'pg-qs', label: 'Run Script', args: [], expected: null }],
  },
  {
    id: 'playground-graph-bfs',
    number: 902,
    title: 'Playground: Graph BFS Traversal',
    difficulty: 'Playground',
    category: 'Sorting & Playground',
    tags: ['Playground', 'Graph', 'BFS'],
    isPlayground: true,
    entryFunction: '',
    params: [],
    returnType: 'any',
    compareMode: 'playground',
    description:
      'Interactive **Graph BFS Playground**! Edit the `adj` adjacency list, starting vertex, or replace BFS with DFS to watch vertices move from queued -> active -> visited in real time.',
    examples: [{ input: '6 vertices adjacency list, start = 0', output: 'order = [0, 1, 2, 3, 4, 5]' }],
    constraints: ['Runs top-level script or `main()` directly.'],
    hints: ['Name your adjacency list `adj` and `visited` Set + `queue` array to see automatic Graph visualization!'],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    visualHint: {
      primaryStructure: 'graph',
      description: 'Live adjacency graph `adj` + BFS `queue` + `visited` set!',
    },
    starterCode: {
      python: `adj = [
    [1, 2],
    [0, 3, 4],
    [0, 4],
    [1, 5],
    [1, 2, 5],
    [3, 4],
]

visited = {0}
queue = deque([0])
order = []

while queue:
    u = queue.popleft()
    order.append(u)
    for v in adj[u]:
        if v not in visited:
            visited.add(v)
            queue.append(v)

print("BFS Order:", order)`,
      javascript: `const adj = [
  [1, 2],
  [0, 3, 4],
  [0, 4],
  [1, 5],
  [1, 2, 5],
  [3, 4],
];

const visited = new Set([0]);
const queue = [0];
const order = [];

while (queue.length > 0) {
  const u = queue.shift();
  order.push(u);
  for (const v of adj[u]) {
    if (!visited.has(v)) {
      visited.add(v);
      queue.push(v);
    }
  }
}
console.log('BFS Order:', order);`,
      java: `class Main {
    public static void main(String[] args) {
        int[][] adj = {
            {1, 2},
            {0, 3, 4},
            {0, 4},
            {1, 5},
            {1, 2, 5},
            {3, 4}
        };
        Set<Integer> visited = new HashSet<>();
        visited.add(0);
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(0);
        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            order.add(u);
            for (int v : adj[u]) {
                if (!visited.contains(v)) {
                    visited.add(v);
                    queue.offer(v);
                }
            }
        }
        System.out.println("BFS Order:");
    }
}`,
      cpp: `int main() {
    vector<vector<int>> adj = {
        {1, 2},
        {0, 3, 4},
        {0, 4},
        {1, 5},
        {1, 2, 5},
        {3, 4}
    };
    unordered_set<int> visited;
    visited.insert(0);
    queue<int> q;
    q.push(0);
    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (!visited.count(v)) {
                visited.insert(v);
                q.push(v);
            }
        }
    }
    return 0;
}`,
      c: `int main() {
    int deg[] = {2, 3, 2, 2, 3, 2};
    int adj[6][3] = {
        {1, 2, -1},
        {0, 3, 4},
        {0, 4, -1},
        {1, 5, -1},
        {1, 2, 5},
        {3, 4, -1}
    };
    int visited[6] = {0, 0, 0, 0, 0, 0};
    visited[0] = 1;
    int queue[10];
    int front = 0, back = 0;
    queue[back++] = 0;
    int order[6];
    int k = 0;
    while (front < back) {
        int u = queue[front++];
        order[k++] = u;
        for (int j = 0; j < deg[u]; j++) {
            int v = adj[u][j];
            if (!visited[v]) {
                visited[v] = 1;
                queue[back++] = v;
            }
        }
    }
    return 0;
}`,
      csharp: `public class Program {
    public static void Main() {
        int[][] adj = new int[][] {
            new int[] {1, 2},
            new int[] {0, 3, 4},
            new int[] {0, 4},
            new int[] {1, 5},
            new int[] {1, 2, 5},
            new int[] {3, 4}
        };
        var visited = new HashSet<int>();
        visited.Add(0);
        var queue = new Queue<int>();
        queue.Enqueue(0);
        var order = new List<int>();
        while (queue.Count > 0) {
            int u = queue.Dequeue();
            order.Add(u);
            foreach (int v in adj[u]) {
                if (!visited.Contains(v)) {
                    visited.Add(v);
                    queue.Enqueue(v);
                }
            }
        }
    }
}`,
    },
    optimalCode: {
      python: `adj = [
    [1, 2],
    [0, 3, 4],
    [0, 4],
    [1, 5],
    [1, 2, 5],
    [3, 4],
]

visited = {0}
queue = deque([0])
order = []

while queue:
    u = queue.popleft()
    order.append(u)
    for v in adj[u]:
        if v not in visited:
            visited.add(v)
            queue.append(v)

print("BFS Order:", order)`,
      javascript: `const adj = [
  [1, 2],
  [0, 3, 4],
  [0, 4],
  [1, 5],
  [1, 2, 5],
  [3, 4],
];

const visited = new Set([0]);
const queue = [0];
const order = [];

while (queue.length > 0) {
  const u = queue.shift();
  order.push(u);
  for (const v of adj[u]) {
    if (!visited.has(v)) {
      visited.add(v);
      queue.push(v);
    }
  }
}
console.log('BFS Order:', order);`,
      java: `class Main {
    public static void main(String[] args) {
        int[][] adj = {
            {1, 2},
            {0, 3, 4},
            {0, 4},
            {1, 5},
            {1, 2, 5},
            {3, 4}
        };
        Set<Integer> visited = new HashSet<>();
        visited.add(0);
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(0);
        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            order.add(u);
            for (int v : adj[u]) {
                if (!visited.contains(v)) {
                    visited.add(v);
                    queue.offer(v);
                }
            }
        }
        System.out.println("BFS Order:");
    }
}`,
      cpp: `int main() {
    vector<vector<int>> adj = {
        {1, 2},
        {0, 3, 4},
        {0, 4},
        {1, 5},
        {1, 2, 5},
        {3, 4}
    };
    unordered_set<int> visited;
    visited.insert(0);
    queue<int> q;
    q.push(0);
    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (!visited.count(v)) {
                visited.insert(v);
                q.push(v);
            }
        }
    }
    return 0;
}`,
      c: `int main() {
    int deg[] = {2, 3, 2, 2, 3, 2};
    int adj[6][3] = {
        {1, 2, -1},
        {0, 3, 4},
        {0, 4, -1},
        {1, 5, -1},
        {1, 2, 5},
        {3, 4, -1}
    };
    int visited[6] = {0, 0, 0, 0, 0, 0};
    visited[0] = 1;
    int queue[10];
    int front = 0, back = 0;
    queue[back++] = 0;
    int order[6];
    int k = 0;
    while (front < back) {
        int u = queue[front++];
        order[k++] = u;
        for (int j = 0; j < deg[u]; j++) {
            int v = adj[u][j];
            if (!visited[v]) {
                visited[v] = 1;
                queue[back++] = v;
            }
        }
    }
    return 0;
}`,
      csharp: `public class Program {
    public static void Main() {
        int[][] adj = new int[][] {
            new int[] {1, 2},
            new int[] {0, 3, 4},
            new int[] {0, 4},
            new int[] {1, 5},
            new int[] {1, 2, 5},
            new int[] {3, 4}
        };
        var visited = new HashSet<int>();
        visited.Add(0);
        var queue = new Queue<int>();
        queue.Enqueue(0);
        var order = new List<int>();
        while (queue.Count > 0) {
            int u = queue.Dequeue();
            order.Add(u);
            foreach (int v in adj[u]) {
                if (!visited.Contains(v)) {
                    visited.Add(v);
                    queue.Enqueue(v);
                }
            }
        }
    }
}`,
    },
    testCases: [{ id: 'pg-bfs', label: 'Run Script', args: [], expected: null }],
  },
  {
    id: 'playground-scratchpad',
    number: 903,
    title: 'Playground: Free DSA Scratchpad',
    difficulty: 'Playground',
    category: 'Sorting & Playground',
    tags: ['Playground', 'Custom Code'],
    isPlayground: true,
    entryFunction: '',
    params: [],
    returnType: 'any',
    compareMode: 'playground',
    description:
      'Write **anything from scratch** — `TreeNode`, `ListNode`, arrays, hash maps, stacks, queues, dynamic programming, or recursive algorithms — and immediately watch your own code execute step-by-step!',
    examples: [
      { input: 'Build a TreeNode or ListNode or array algorithm', output: 'Live trace visualization' },
    ],
    constraints: ['Built-in classes available: ListNode, TreeNode, GraphNode'],
    hints: ['Try building a small Binary Tree with `new TreeNode(...)` and writing an inorder DFS!'],
    timeComplexity: 'Custom',
    spaceComplexity: 'Custom',
    visualHint: {
      primaryStructure: 'auto',
      description: 'Auto-detects every variable and data structure in your script!',
    },
    starterCode: {
      python: `# Build any data structure and visualize your code!
root = TreeNode(10,
    TreeNode(5, TreeNode(2), TreeNode(7)),
    TreeNode(15, None, TreeNode(20))
)

inorder = []
def dfs(node):
    if not node:
        return
    dfs(node.left)
    inorder.append(node.val)
    dfs(node.right)

dfs(root)
print("Inorder:", inorder)`,
      javascript: `// Build any data structure and visualize your code!
const root = new TreeNode(10,
  new TreeNode(5, new TreeNode(2), new TreeNode(7)),
  new TreeNode(15, null, new TreeNode(20))
);

const inorder = [];
function dfs(node) {
  if (!node) return;
  dfs(node.left);
  inorder.push(node.val);
  dfs(node.right);
}

dfs(root);
console.log('Inorder:', inorder);`,
      java: `class Main {
    static void dfs(TreeNode node, List<Integer> inorder) {
        if (node == null) return;
        dfs(node.left, inorder);
        inorder.add(node.val);
        dfs(node.right, inorder);
    }
    public static void main(String[] args) {
        TreeNode root = new TreeNode(10,
            new TreeNode(5, new TreeNode(2), new TreeNode(7)),
            new TreeNode(15, null, new TreeNode(20))
        );
        List<Integer> inorder = new ArrayList<>();
        dfs(root, inorder);
        System.out.println("Inorder done");
    }
}`,
      cpp: `void dfs(TreeNode* node, vector<int>& inorder) {
    if (!node) return;
    dfs(node->left, inorder);
    inorder.push_back(node->val);
    dfs(node->right, inorder);
}

int main() {
    TreeNode* root = new TreeNode(10,
        new TreeNode(5, new TreeNode(2), new TreeNode(7)),
        new TreeNode(15, nullptr, new TreeNode(20))
    );
    vector<int> inorder;
    dfs(root, inorder);
    return 0;
}`,
      c: `struct TreeNode* makeNode(int val, struct TreeNode* left, struct TreeNode* right) {
    struct TreeNode* n = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    n->val = val;
    n->left = left;
    n->right = right;
    return n;
}

void dfs(struct TreeNode* node, int* inorder, int* idx) {
    if (node == NULL) return;
    dfs(node->left, inorder, idx);
    inorder[(*idx)++] = node->val;
    dfs(node->right, inorder, idx);
}

int main() {
    struct TreeNode* root = makeNode(10,
        makeNode(5, makeNode(2, NULL, NULL), makeNode(7, NULL, NULL)),
        makeNode(15, NULL, makeNode(20, NULL, NULL))
    );
    int inorder[10];
    int idx[1] = {0};
    dfs(root, inorder, idx);
    return 0;
}`,
      csharp: `public class Program {
    static void Dfs(TreeNode node, List<int> inorder) {
        if (node == null) return;
        Dfs(node.left, inorder);
        inorder.Add(node.val);
        Dfs(node.right, inorder);
    }
    public static void Main() {
        TreeNode root = new TreeNode(10,
            new TreeNode(5, new TreeNode(2), new TreeNode(7)),
            new TreeNode(15, null, new TreeNode(20))
        );
        var inorder = new List<int>();
        Dfs(root, inorder);
    }
}`,
    },
    optimalCode: {
      python: `# Build any data structure and visualize your code!
root = TreeNode(10,
    TreeNode(5, TreeNode(2), TreeNode(7)),
    TreeNode(15, None, TreeNode(20))
)

inorder = []
def dfs(node):
    if not node:
        return
    dfs(node.left)
    inorder.append(node.val)
    dfs(node.right)

dfs(root)
print("Inorder:", inorder)`,
      javascript: `// Build any data structure and visualize your code!
const root = new TreeNode(10,
  new TreeNode(5, new TreeNode(2), new TreeNode(7)),
  new TreeNode(15, null, new TreeNode(20))
);

const inorder = [];
function dfs(node) {
  if (!node) return;
  dfs(node.left);
  inorder.push(node.val);
  dfs(node.right);
}

dfs(root);
console.log('Inorder:', inorder);`,
      java: `class Main {
    static void dfs(TreeNode node, List<Integer> inorder) {
        if (node == null) return;
        dfs(node.left, inorder);
        inorder.add(node.val);
        dfs(node.right, inorder);
    }
    public static void main(String[] args) {
        TreeNode root = new TreeNode(10,
            new TreeNode(5, new TreeNode(2), new TreeNode(7)),
            new TreeNode(15, null, new TreeNode(20))
        );
        List<Integer> inorder = new ArrayList<>();
        dfs(root, inorder);
        System.out.println("Inorder done");
    }
}`,
      cpp: `void dfs(TreeNode* node, vector<int>& inorder) {
    if (!node) return;
    dfs(node->left, inorder);
    inorder.push_back(node->val);
    dfs(node->right, inorder);
}

int main() {
    TreeNode* root = new TreeNode(10,
        new TreeNode(5, new TreeNode(2), new TreeNode(7)),
        new TreeNode(15, nullptr, new TreeNode(20))
    );
    vector<int> inorder;
    dfs(root, inorder);
    return 0;
}`,
      c: `struct TreeNode* makeNode(int val, struct TreeNode* left, struct TreeNode* right) {
    struct TreeNode* n = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    n->val = val;
    n->left = left;
    n->right = right;
    return n;
}

void dfs(struct TreeNode* node, int* inorder, int* idx) {
    if (node == NULL) return;
    dfs(node->left, inorder, idx);
    inorder[(*idx)++] = node->val;
    dfs(node->right, inorder, idx);
}

int main() {
    struct TreeNode* root = makeNode(10,
        makeNode(5, makeNode(2, NULL, NULL), makeNode(7, NULL, NULL)),
        makeNode(15, NULL, makeNode(20, NULL, NULL))
    );
    int inorder[10];
    int idx[1] = {0};
    dfs(root, inorder, idx);
    return 0;
}`,
      csharp: `public class Program {
    static void Dfs(TreeNode node, List<int> inorder) {
        if (node == null) return;
        Dfs(node.left, inorder);
        inorder.Add(node.val);
        Dfs(node.right, inorder);
    }
    public static void Main() {
        TreeNode root = new TreeNode(10,
            new TreeNode(5, new TreeNode(2), new TreeNode(7)),
            new TreeNode(15, null, new TreeNode(20))
        );
        var inorder = new List<int>();
        Dfs(root, inorder);
    }
}`,
    },
    testCases: [{ id: 'pg-free', label: 'Run Script', args: [], expected: null }],
  },
];
