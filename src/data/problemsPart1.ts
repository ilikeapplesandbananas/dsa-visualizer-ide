import type { Problem } from '../types/problem';

export const PROBLEMS_PART_1: Problem[] = [
  {
    id: 'two-sum',
    number: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table'],
    entryFunction: 'twoSum',
    params: [
      { name: 'nums', type: 'number[]' },
      { name: 'target', type: 'number' },
    ],
    returnType: 'number[]',
    compareMode: 'unorderedArray',
    description:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', output: '[0, 1]' },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    hints: [
      'Instead of checking all pairs in O(n^2), ask: what number would complete `nums[i]` to reach `target`?',
      'Store each visited number and its index inside a Hash Map (`seen[num] = i`) so you can look up `target - nums[i]` in O(1) time.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    visualHint: {
      primaryStructure: 'array',
      highlightPointers: ['i'],
      description: 'Watch `i` scan `nums` while `seen` Hash Map builds complement lookups.',
    },
    starterCode: {
      python: `def twoSum(nums, target):
    # Write your solution here
    pass`,
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your solution here
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`,
    },
    optimalCode: {
      python: `def twoSum(nums, target):
    seen = {}
    for i in range(len(nums)):
        complement = target - nums[i]
        if complement in seen:
            return [seen[complement], i]
        seen[nums[i]] = i
    return []`,
      javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                int* res = (int*)malloc(2 * sizeof(int));
                res[0] = i;
                res[1] = j;
                *returnSize = 2;
                return res;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        var seen = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++) {
            int complement = target - nums[i];
            if (seen.ContainsKey(complement)) {
                return new int[] { seen[complement], i };
            }
            seen[nums[i]] = i;
        }
        return new int[0];
    }
}`,
    },
    testCases: [
      { id: 'ts-1', label: 'Case 1', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { id: 'ts-2', label: 'Case 2', args: [[3, 2, 4], 6], expected: [1, 2] },
      { id: 'ts-3', label: 'Case 3', args: [[3, 3], 6], expected: [0, 1] },
      { id: 'ts-4', label: 'Negatives', args: [[-3, 4, 3, 90], 0], expected: [0, 2], isHidden: true },
      { id: 'ts-5', label: 'Last Pair', args: [[1, 5, 8, 12, 7], 19], expected: [3, 4], isHidden: true },
      { id: 'ts-6', label: 'Zeroes', args: [[0, 4, 3, 0], 0], expected: [0, 3], isHidden: true },
    ],
  },
  {
    id: 'best-time-buy-sell-stock',
    number: 121,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Sliding Window',
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
    entryFunction: 'maxProfit',
    params: [{ name: 'prices', type: 'number[]' }],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.',
    examples: [
      {
        input: 'prices = [7, 1, 5, 3, 6, 4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.',
      },
      {
        input: 'prices = [7, 6, 4, 3, 1]',
        output: '0',
        explanation: 'No profitable transaction is possible, so max profit is 0.',
      },
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    hints: [
      'Track two pointers: `left` (buy day) and `right` (sell day), or track the minimum price seen so far.',
      'Whenever `prices[right] < prices[left]`, move `left = right` because a cheaper buy price was found!',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    visualHint: {
      primaryStructure: 'bars',
      highlightPointers: ['left', 'right'],
      description: 'Buy pointer `left` jumps to new lows while `right` scans future sell days.',
    },
    starterCode: {
      python: `def maxProfit(prices):
    # Write your solution here
    pass`,
      javascript: `function maxProfit(prices) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        return 0;
    }
};`,
      c: `int maxProfit(int* prices, int pricesSize) {
    return 0;
}`,
      csharp: `public class Solution {
    public int MaxProfit(int[] prices) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def maxProfit(prices):
    left = 0
    best = 0
    for right in range(1, len(prices)):
        if prices[right] < prices[left]:
            left = right
        else:
            best = max(best, prices[right] - prices[left])
    return best`,
      javascript: `function maxProfit(prices) {
  let left = 0;
  let best = 0;
  for (let right = 1; right < prices.length; right++) {
    if (prices[right] < prices[left]) {
      left = right;
    } else {
      best = Math.max(best, prices[right] - prices[left]);
    }
  }
  return best;
}`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int left = 0;
        int best = 0;
        for (int right = 1; right < prices.length; right++) {
            if (prices[right] < prices[left]) {
                left = right;
            } else {
                best = Math.max(best, prices[right] - prices[left]);
            }
        }
        return best;
    }
}`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int left = 0;
        int best = 0;
        for (int right = 1; right < prices.size(); right++) {
            if (prices[right] < prices[left]) {
                left = right;
            } else {
                best = max(best, prices[right] - prices[left]);
            }
        }
        return best;
    }
};`,
      c: `int maxProfit(int* prices, int pricesSize) {
    int left = 0;
    int best = 0;
    for (int right = 1; right < pricesSize; right++) {
        if (prices[right] < prices[left]) {
            left = right;
        } else {
            int profit = prices[right] - prices[left];
            if (profit > best) best = profit;
        }
    }
    return best;
}`,
      csharp: `public class Solution {
    public int MaxProfit(int[] prices) {
        int left = 0;
        int best = 0;
        for (int right = 1; right < prices.Length; right++) {
            if (prices[right] < prices[left]) {
                left = right;
            } else {
                best = Math.Max(best, prices[right] - prices[left]);
            }
        }
        return best;
    }
}`,
    },
    testCases: [
      { id: 'stock-1', label: 'Case 1', args: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { id: 'stock-2', label: 'Case 2', args: [[7, 6, 4, 3, 1]], expected: 0 },
      { id: 'stock-3', label: 'Case 3', args: [[2, 4, 1, 7]], expected: 6 },
      { id: 'stock-4', label: 'Single Day', args: [[5]], expected: 0, isHidden: true },
      { id: 'stock-5', label: 'Flat', args: [[3, 3, 3, 3]], expected: 0, isHidden: true },
      { id: 'stock-6', label: 'Late Spike', args: [[5, 4, 3, 2, 10]], expected: 8, isHidden: true },
    ],
  },
  {
    id: 'product-except-self',
    number: 238,
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Prefix Sum'],
    entryFunction: 'productExceptSelf',
    params: [{ name: 'nums', type: 'number[]' }],
    returnType: 'number[]',
    compareMode: 'exact',
    description:
      'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in **O(n)** time and **without using the division operation**.',
    examples: [
      { input: 'nums = [1, 2, 3, 4]', output: '[24, 12, 8, 6]' },
      { input: 'nums = [-1, 1, 0, -3, 3]', output: '[0, 0, 9, 0, 0]' },
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30'],
    hints: [
      'Each position `i` needs `(product of elements to the left) * (product of elements to the right)`.',
      'Pass 1 (left to right) stores running `prefix` in `answer[i]`. Pass 2 (right to left) multiplies by running `suffix`.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) extra',
    visualHint: {
      primaryStructure: 'array',
      highlightPointers: ['i'],
      description: 'Two sweeps across `nums` and `answer`: prefix product left->right, suffix right->left.',
    },
    starterCode: {
      python: `def productExceptSelf(nums):
    # Write your solution here
    pass`,
      javascript: `function productExceptSelf(nums) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        return new int[0];
    }
}`,
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        return {};
    }
};`,
      c: `int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        return new int[0];
    }
}`,
    },
    optimalCode: {
      python: `def productExceptSelf(nums):
    n = len(nums)
    answer = [1] * n
    prefix = 1
    for i in range(n):
        answer[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= suffix
        suffix *= nums[i]
    return answer`,
      javascript: `function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }
  return answer;
}`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= suffix;
            suffix *= nums[i];
        }
        return answer;
    }
}`,
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n, 1);
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= suffix;
            suffix *= nums[i];
        }
        return answer;
    }
};`,
      c: `int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    int* answer = (int*)malloc(numsSize * sizeof(int));
    *returnSize = numsSize;
    int prefix = 1;
    for (int i = 0; i < numsSize; i++) {
        answer[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = numsSize - 1; i >= 0; i--) {
        answer[i] *= suffix;
        suffix *= nums[i];
    }
    return answer;
}`,
      csharp: `public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int n = nums.Length;
        int[] answer = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= suffix;
            suffix *= nums[i];
        }
        return answer;
    }
}`,
    },
    testCases: [
      { id: 'pes-1', label: 'Case 1', args: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { id: 'pes-2', label: 'Case 2', args: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
      { id: 'pes-3', label: 'Two Elements', args: [[5, 9]], expected: [9, 5] },
      { id: 'pes-4', label: 'Two Zeros', args: [[0, 2, 0, 4]], expected: [0, 0, 0, 0], isHidden: true },
      { id: 'pes-5', label: 'All Negatives', args: [[-2, -3, -4]], expected: [12, 8, 6], isHidden: true },
    ],
  },
  {
    id: 'container-with-most-water',
    number: 11,
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    entryFunction: 'maxArea',
    params: [{ name: 'height', type: 'number[]' }],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.',
    examples: [
      {
        input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]',
        output: '49',
        explanation: 'Lines at index 1 (height 8) and index 8 (height 7) hold min(8, 7) * (8 - 1) = 49.',
      },
      { input: 'height = [1, 1]', output: '1' },
    ],
    constraints: ['2 <= height.length <= 10^5', '0 <= height[i] <= 10^4'],
    hints: [
      'Start pointers at the widest possible container: `left = 0` and `right = n - 1`.',
      'Always move the pointer pointing to the **shorter** wall inward — moving the taller wall can never increase `min(h[left], h[right])` while width shrinks.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    visualHint: {
      primaryStructure: 'bars',
      highlightPointers: ['left', 'right'],
      description: 'Vertical elevation bars with `left` and `right` pointers closing inward.',
    },
    starterCode: {
      python: `def maxArea(height):
    # Write your solution here
    pass`,
      javascript: `function maxArea(height) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int maxArea(int[] height) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        return 0;
    }
};`,
      c: `int maxArea(int* height, int heightSize) {
    return 0;
}`,
      csharp: `public class Solution {
    public int MaxArea(int[] height) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def maxArea(height):
    left = 0
    right = len(height) - 1
    best = 0

    while left < right:
        width = right - left
        h = min(height[left], height[right])
        best = max(best, width * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best`,
      javascript: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    best = Math.max(best, width * h);
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return best;
}`,
      java: `class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int best = 0;
        while (left < right) {
            int width = right - left;
            int h = Math.min(height[left], height[right]);
            best = Math.max(best, width * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return best;
    }
}`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;
        int best = 0;
        while (left < right) {
            int width = right - left;
            int h = min(height[left], height[right]);
            best = max(best, width * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return best;
    }
};`,
      c: `int maxArea(int* height, int heightSize) {
    int left = 0;
    int right = heightSize - 1;
    int best = 0;
    while (left < right) {
        int width = right - left;
        int h = height[left] < height[right] ? height[left] : height[right];
        int area = width * h;
        if (area > best) best = area;
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return best;
}`,
      csharp: `public class Solution {
    public int MaxArea(int[] height) {
        int left = 0;
        int right = height.Length - 1;
        int best = 0;
        while (left < right) {
            int width = right - left;
            int h = Math.Min(height[left], height[right]);
            best = Math.Max(best, width * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return best;
    }
}`,
    },
    testCases: [
      { id: 'cwmw-1', label: 'Case 1', args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { id: 'cwmw-2', label: 'Case 2', args: [[1, 1]], expected: 1 },
      { id: 'cwmw-3', label: 'Center Peaks', args: [[2, 3, 10, 5, 7, 8, 9]], expected: 36 },
      { id: 'cwmw-4', label: 'Zeros', args: [[0, 2, 0, 4, 0]], expected: 4, isHidden: true },
      { id: 'cwmw-5', label: 'Monotonic', args: [[1, 2, 3, 4, 5, 6]], expected: 9, isHidden: true },
    ],
  },
  {
    id: 'trapping-rain-water',
    number: 42,
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Stack'],
    entryFunction: 'trap',
    params: [{ name: 'height', type: 'number[]' }],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.',
    examples: [
      {
        input: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]',
        output: '6',
        explanation: '6 units of rain water are trapped between the elevation bars.',
      },
      { input: 'height = [4, 2, 0, 3, 2, 5]', output: '9' },
    ],
    constraints: ['1 <= height.length <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    hints: [
      'Water above bar `i` equals `min(maxLeft[i], maxRight[i]) - height[i]`.',
      'With two pointers (`left`, `right`), whichever side has smaller `height` is guaranteed to be bounded by its own side max (`leftMax` or `rightMax`)!',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    visualHint: {
      primaryStructure: 'bars',
      highlightPointers: ['left', 'right'],
      description: 'Elevation map bars with converging `left` / `right` pointers and running wall maxima.',
    },
    starterCode: {
      python: `def trap(height):
    # Write your solution here
    pass`,
      javascript: `function trap(height) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int trap(int[] height) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        return 0;
    }
};`,
      c: `int trap(int* height, int heightSize) {
    return 0;
}`,
      csharp: `public class Solution {
    public int Trap(int[] height) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def trap(height):
    left, right = 0, len(height) - 1
    leftMax, rightMax = 0, 0
    water = 0

    while left < right:
        if height[left] < height[right]:
            leftMax = max(leftMax, height[left])
            water += leftMax - height[left]
            left += 1
        else:
            rightMax = max(rightMax, height[right])
            water += rightMax - height[right]
            right -= 1
    return water`,
      javascript: `function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,
      java: `class Solution {
    public int trap(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
};`,
      c: `int trap(int* height, int heightSize) {
    int left = 0;
    int right = heightSize - 1;
    int leftMax = 0;
    int rightMax = 0;
    int water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] > leftMax) leftMax = height[left];
            water += leftMax - height[left];
            left++;
        } else {
            if (height[right] > rightMax) rightMax = height[right];
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
      csharp: `public class Solution {
    public int Trap(int[] height) {
        int left = 0;
        int right = height.Length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = Math.Max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.Max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,
    },
    testCases: [
      { id: 'trap-1', label: 'Case 1', args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
      { id: 'trap-2', label: 'Case 2', args: [[4, 2, 0, 3, 2, 5]], expected: 9 },
      { id: 'trap-3', label: 'Single Bowl', args: [[3, 0, 3]], expected: 3 },
      { id: 'trap-4', label: 'Pyramid', args: [[1, 2, 3, 2, 1]], expected: 0, isHidden: true },
      { id: 'trap-5', label: 'Single Bar', args: [[5]], expected: 0, isHidden: true },
    ],
  },
  {
    id: 'longest-substring-no-repeat',
    number: 3,
    title: 'Longest Substring Without Repeating Characters',
    scenario: 'Kindle / CloudWatch Traffic Spike',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['String', 'Sliding Window', 'Hash Table'],
    entryFunction: 'lengthOfLongestSubstring',
    params: [{ name: 's', type: 'string' }],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'Given a string `s` (e.g. a CloudWatch stream of session IDs or log tokens), find the length of the **longest contiguous substring** without repeating characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      { input: 's = "bbbbb"', output: '1' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", not "pwke" (subsequence).' },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    hints: [
      'Maintain a sliding window `[left .. right]` whose characters are all unique.',
      'Use a Set (or Map of last seen index) so when `s[right]` duplicates a char in the window, you shrink `left` until uniqueness is restored.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, charset))',
    visualHint: {
      primaryStructure: 'array',
      highlightPointers: ['left', 'right'],
      description: 'Character array with live `[left..right]` sliding window bracket and HashSet.',
    },
    starterCode: {
      python: `def lengthOfLongestSubstring(s):
    # Write your solution here
    pass`,
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        return 0;
    }
};`,
      c: `int lengthOfLongestSubstring(char* s) {
    return 0;
}`,
      csharp: `public class Solution {
    public int LengthOfLongestSubstring(string s) {
        return 0;
    }
}`,
    },
    optimalCode: {
      python: `def lengthOfLongestSubstring(s):
    window_set = set()
    left = 0
    best = 0

    for right in range(len(s)):
        while s[right] in window_set:
            window_set.remove(s[left])
            left += 1
        window_set.add(s[right])
        best = max(best, right - left + 1)
    return best`,
      javascript: `function lengthOfLongestSubstring(s) {
  const windowSet = new Set();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    while (windowSet.has(s[right])) {
      windowSet.delete(s[left]);
      left++;
    }
    windowSet.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> windowSet = new HashSet<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            while (windowSet.contains(s.charAt(right))) {
                windowSet.remove(s.charAt(left));
                left++;
            }
            windowSet.add(s.charAt(right));
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> windowSet;
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.size(); right++) {
            while (windowSet.count(s[right])) {
                windowSet.erase(s[left]);
                left++;
            }
            windowSet.insert(s[right]);
            best = max(best, right - left + 1);
        }
        return best;
    }
};`,
      c: `int lengthOfLongestSubstring(char* s) {
    int n = strlen(s);
    int lastSeen[256];
    for (int k = 0; k < 256; k++) lastSeen[k] = -1;
    int left = 0;
    int best = 0;
    for (int right = 0; right < n; right++) {
        int code = (int)s[right];
        if (lastSeen[code] >= left) {
            left = lastSeen[code] + 1;
        }
        lastSeen[code] = right;
        int len = right - left + 1;
        if (len > best) best = len;
    }
    return best;
}`,
      csharp: `public class Solution {
    public int LengthOfLongestSubstring(string s) {
        var windowSet = new HashSet<char>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.Length; right++) {
            while (windowSet.Contains(s[right])) {
                windowSet.Remove(s[left]);
                left++;
            }
            windowSet.Add(s[right]);
            best = Math.Max(best, right - left + 1);
        }
        return best;
    }
}`,
    },
    testCases: [
      { id: 'lswrc-1', label: 'Case 1', args: ['abcabcbb'], expected: 3 },
      { id: 'lswrc-2', label: 'Case 2', args: ['bbbbb'], expected: 1 },
      { id: 'lswrc-3', label: 'Case 3', args: ['pwwkew'], expected: 3 },
      { id: 'lswrc-4', label: 'Empty', args: [''], expected: 0, isHidden: true },
      { id: 'lswrc-5', label: 'All Unique', args: ['abcdef'], expected: 6, isHidden: true },
      { id: 'lswrc-6', label: 'Bridge', args: ['dvdf'], expected: 3, isHidden: true },
    ],
  },
  {
    id: 'binary-search',
    number: 704,
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    entryFunction: 'search',
    params: [
      { name: 'nums', type: 'number[]' },
      { name: 'target', type: 'number' },
    ],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with **O(log n)** runtime complexity.',
    examples: [
      {
        input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4.',
      },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1' },
    ],
    constraints: ['1 <= nums.length <= 10^4', 'All integers in nums are unique.', 'nums is sorted in ascending order.'],
    hints: [
      'Use `left = 0`, `right = nums.length - 1`, and compute `mid = left + Math.floor((right - left) / 2)`.',
      'Compare `nums[mid]` with `target` to discard half of the search range each step.',
    ],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    visualHint: {
      primaryStructure: 'array',
      highlightPointers: ['left', 'mid', 'right'],
      description: 'Sorted search range `[left..right]` halving around `mid` on every iteration.',
    },
    starterCode: {
      python: `def search(nums, target):
    # Write your solution here
    pass`,
      javascript: `function search(nums, target) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        return -1;
    }
};`,
      c: `int search(int* nums, int numsSize, int target) {
    return -1;
}`,
      csharp: `public class Solution {
    public int Search(int[] nums, int target) {
        return -1;
    }
}`,
    },
    optimalCode: {
      python: `def search(nums, target):
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      javascript: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
};`,
      c: `int search(int* nums, int numsSize, int target) {
    int left = 0;
    int right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
      csharp: `public class Solution {
    public int Search(int[] nums, int target) {
        int left = 0;
        int right = nums.Length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,
    },
    testCases: [
      { id: 'bs-1', label: 'Case 1', args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { id: 'bs-2', label: 'Case 2', args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { id: 'bs-3', label: 'First Elem', args: [[1, 3, 5, 7, 9, 11], 1], expected: 0 },
      { id: 'bs-4', label: 'Single Hit', args: [[5], 5], expected: 0, isHidden: true },
      { id: 'bs-5', label: 'Single Miss', args: [[5], -5], expected: -1, isHidden: true },
    ],
  },
  {
    id: 'search-rotated-array',
    number: 33,
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    entryFunction: 'search',
    params: [
      { name: 'nums', type: 'number[]' },
      { name: 'target', type: 'number' },
    ],
    returnType: 'number',
    compareMode: 'exact',
    description:
      'There is an integer array `nums` sorted in ascending order (with **distinct** values), rotated at an unknown pivot index.\n\nGiven the rotated array `nums` and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with **O(log n)** runtime complexity.',
    examples: [
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0', output: '4' },
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 3', output: '-1' },
      { input: 'nums = [1], target = 0', output: '-1' },
    ],
    constraints: ['1 <= nums.length <= 5000', 'All values of nums are unique.'],
    hints: [
      'At any `mid`, at least one half (`[left..mid]` or `[mid..right]`) is strictly sorted!',
      'Check which half is sorted (`nums[left] <= nums[mid]`), then test whether `target` lies inside that sorted interval.',
    ],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    visualHint: {
      primaryStructure: 'array',
      highlightPointers: ['left', 'mid', 'right'],
      description: 'Identify the sorted half `[left..mid]` or `[mid..right]` at each step.',
    },
    starterCode: {
      python: `def search(nums, target):
    # Write your solution here
    pass`,
      javascript: `function search(nums, target) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        return -1;
    }
};`,
      c: `int search(int* nums, int numsSize, int target) {
    return -1;
}`,
      csharp: `public class Solution {
    public int Search(int[] nums, int target) {
        return -1;
    }
}`,
    },
    optimalCode: {
      python: `def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1`,
      javascript: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
};`,
      c: `int search(int* nums, int numsSize, int target) {
    int left = 0;
    int right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}`,
      csharp: `public class Solution {
    public int Search(int[] nums, int target) {
        int left = 0;
        int right = nums.Length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
    },
    testCases: [
      { id: 'rot-1', label: 'Case 1', args: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
      { id: 'rot-2', label: 'Case 2', args: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
      { id: 'rot-3', label: 'Case 3', args: [[1], 0], expected: -1 },
      { id: 'rot-4', label: 'Two Elements', args: [[3, 1], 1], expected: 1, isHidden: true },
      { id: 'rot-5', label: 'Pivot Left', args: [[5, 1, 2, 3, 4], 5], expected: 0, isHidden: true },
    ],
  },
  {
    id: 'valid-parentheses',
    number: 20,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack & Queue',
    tags: ['String', 'Stack'],
    entryFunction: 'isValid',
    params: [{ name: 's', type: 'string' }],
    returnType: 'boolean',
    compareMode: 'exact',
    description:
      'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "([)]"', output: 'false' },
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only: ()[]{}'],
    hints: [
      'Push opening brackets onto a Stack as you scan left to right.',
      'When you see a closing bracket, check if the Stack is non-empty and its top matches the expected opener.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    visualHint: {
      primaryStructure: 'stack',
      highlightPointers: ['i'],
      description: 'Watch characters push and pop on the LIFO Stack as `i` scans `s`.',
    },
    starterCode: {
      python: `def isValid(s):
    # Write your solution here
    pass`,
      javascript: `function isValid(s) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public boolean isValid(String s) {
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        return false;
    }
};`,
      c: `bool isValid(char* s) {
    return false;
}`,
      csharp: `public class Solution {
    public bool IsValid(string s) {
        return false;
    }
}`,
    },
    optimalCode: {
      python: `def isValid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}

    for i in range(len(s)):
        ch = s[i]
        if ch in ('(', '{', '['):
            stack.append(ch)
        else:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
    return len(stack) == 0`,
      javascript: `function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}`,
      java: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.push(ch);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (ch == ')' && top != '(') return false;
                if (ch == '}' && top != '{') return false;
                if (ch == ']' && top != '[') return false;
            }
        }
        return stack.isEmpty();
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (int i = 0; i < s.size(); i++) {
            char ch = s[i];
            if (ch == '(' || ch == '{' || ch == '[') {
                st.push(ch);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                st.pop();
                if (ch == ')' && top != '(') return false;
                if (ch == '}' && top != '{') return false;
                if (ch == ']' && top != '[') return false;
            }
        }
        return st.empty();
    }
};`,
      c: `bool isValid(char* s) {
    int n = strlen(s);
    char* stack = (char*)malloc((n + 1) * sizeof(char));
    int top = -1;
    for (int i = 0; i < n; i++) {
        char ch = s[i];
        if (ch == '(' || ch == '{' || ch == '[') {
            stack[++top] = ch;
        } else {
            if (top < 0) return false;
            char open = stack[top--];
            if (ch == ')' && open != '(') return false;
            if (ch == '}' && open != '{') return false;
            if (ch == ']' && open != '[') return false;
        }
    }
    return top == -1;
}`,
      csharp: `public class Solution {
    public bool IsValid(string s) {
        var stack = new Stack<char>();
        for (int i = 0; i < s.Length; i++) {
            char ch = s[i];
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.Push(ch);
            } else {
                if (stack.Count == 0) return false;
                char top = stack.Pop();
                if (ch == ')' && top != '(') return false;
                if (ch == '}' && top != '{') return false;
                if (ch == ']' && top != '[') return false;
            }
        }
        return stack.Count == 0;
    }
}`,
    },
    testCases: [
      { id: 'vp-1', label: 'Case 1', args: ['{[()]}'], expected: true },
      { id: 'vp-2', label: 'Case 2', args: ['()[]{}'], expected: true },
      { id: 'vp-3', label: 'Case 3', args: ['([)]'], expected: false },
      { id: 'vp-4', label: 'Unclosed', args: ['((('], expected: false, isHidden: true },
      { id: 'vp-5', label: 'Only Closer', args: [']'], expected: false, isHidden: true },
    ],
  },
  {
    id: 'daily-temperatures',
    number: 739,
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    category: 'Stack & Queue',
    tags: ['Array', 'Monotonic Stack'],
    entryFunction: 'dailyTemperatures',
    params: [{ name: 'temperatures', type: 'number[]' }],
    returnType: 'number[]',
    compareMode: 'exact',
    description:
      'Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature.\n\nIf there is no future day for which this is possible, keep `answer[i] == 0`.',
    examples: [
      { input: 'temperatures = [73, 74, 75, 71, 69, 72, 76, 73]', output: '[1, 1, 4, 2, 1, 1, 0, 0]' },
      { input: 'temperatures = [30, 40, 50, 60]', output: '[1, 1, 1, 0]' },
    ],
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    hints: [
      'Maintain a **monotonic decreasing stack** storing indices of days still waiting for a warmer day.',
      'When `temperatures[i] > temperatures[stack.top]`, pop `prevIdx` and record `answer[prevIdx] = i - prevIdx`!',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    visualHint: {
      primaryStructure: 'bars',
      highlightPointers: ['i'],
      description: 'Temperature bars + monotonic decreasing index stack popping whenever a warmer day arrives.',
    },
    starterCode: {
      python: `def dailyTemperatures(temperatures):
    # Write your solution here
    pass`,
      javascript: `function dailyTemperatures(temperatures) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        return new int[0];
    }
}`,
      cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        return {};
    }
};`,
      c: `int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {
    *returnSize = 0;
    return NULL;
}`,
      csharp: `public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        return new int[0];
    }
}`,
    },
    optimalCode: {
      python: `def dailyTemperatures(temperatures):
    answer = [0] * len(temperatures)
    stack = []

    for i in range(len(temperatures)):
        while stack and temperatures[i] > temperatures[stack[-1]]:
            prev_idx = stack.pop()
            answer[prev_idx] = i - prev_idx
        stack.append(i)
    return answer`,
      javascript: `function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIdx = stack.pop();
      answer[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return answer;
}`,
      java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIdx = stack.pop();
                answer[prevIdx] = i - prevIdx;
            }
            stack.push(i);
        }
        return answer;
    }
}`,
      cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> answer(n, 0);
        stack<int> st;
        for (int i = 0; i < n; i++) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prevIdx = st.top();
                st.pop();
                answer[prevIdx] = i - prevIdx;
            }
            st.push(i);
        }
        return answer;
    }
};`,
      c: `int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {
    int* answer = (int*)calloc(temperaturesSize, sizeof(int));
    int* stack = (int*)malloc(temperaturesSize * sizeof(int));
    int top = -1;
    *returnSize = temperaturesSize;
    for (int i = 0; i < temperaturesSize; i++) {
        while (top >= 0 && temperatures[i] > temperatures[stack[top]]) {
            int prevIdx = stack[top--];
            answer[prevIdx] = i - prevIdx;
        }
        stack[++top] = i;
    }
    return answer;
}`,
      csharp: `public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        int n = temperatures.Length;
        int[] answer = new int[n];
        var stack = new Stack<int>();
        for (int i = 0; i < n; i++) {
            while (stack.Count > 0 && temperatures[i] > temperatures[stack.Peek()]) {
                int prevIdx = stack.Pop();
                answer[prevIdx] = i - prevIdx;
            }
            stack.Push(i);
        }
        return answer;
    }
}`,
    },
    testCases: [
      {
        id: 'dt-1',
        label: 'Case 1',
        args: [[73, 74, 75, 71, 69, 72, 76, 73]],
        expected: [1, 1, 4, 2, 1, 1, 0, 0],
      },
      { id: 'dt-2', label: 'Case 2', args: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] },
      { id: 'dt-3', label: 'Falling', args: [[80, 70, 60, 50]], expected: [0, 0, 0, 0] },
      { id: 'dt-4', label: 'Equal Temps', args: [[50, 50, 50, 51]], expected: [3, 2, 1, 0], isHidden: true },
    ],
  },
  {
    id: 'reverse-linked-list',
    number: 206,
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    tags: ['Linked List', 'Pointers'],
    entryFunction: 'reverseList',
    params: [{ name: 'head', type: 'linkedList' }],
    returnType: 'linkedList',
    compareMode: 'exact',
    description:
      'Given the `head` of a singly linked list, reverse the list, and return the reversed list.\n\n*Note: `ListNode(val, next)` is pre-defined for you in the execution environment.*',
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
      { input: 'head = [1, 2]', output: '[2, 1]' },
      { input: 'head = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the list is in range [0, 5000].', '-5000 <= Node.val <= 5000'],
    hints: [
      'Keep three pointers: `prev = null`, `curr = head`, and `nextTemp = curr.next`.',
      'At each node, save `nextTemp`, reverse `curr.next = prev`, then advance `prev = curr` and `curr = nextTemp`.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    visualHint: {
      primaryStructure: 'linkedList',
      description: 'Watch `prev`, `curr`, and `nextTemp` rewire node `next` arrows step-by-step!',
    },
    starterCode: {
      python: `# class ListNode:
#     def __init__(self, val=0, next=None): ...
def reverseList(head):
    # Write your solution here
    pass`,
      javascript: `// class ListNode { constructor(val, next) { this.val = val; this.next = next; } }
function reverseList(head) {
  // Write your solution here
  
}`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        return null;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        return nullptr;
    }
};`,
      c: `struct ListNode* reverseList(struct ListNode* head) {
    return NULL;
}`,
      csharp: `public class Solution {
    public ListNode ReverseList(ListNode head) {
        return null;
    }
}`,
    },
    optimalCode: {
      python: `def reverseList(head):
    prev = None
    curr = head

    while curr is not None:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
      c: `struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;
    while (curr != NULL) {
        struct ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
      csharp: `public class Solution {
    public ListNode ReverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
    },
    testCases: [
      { id: 'rll-1', label: 'Case 1', args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { id: 'rll-2', label: 'Case 2', args: [[1, 2]], expected: [2, 1] },
      { id: 'rll-3', label: 'Empty', args: [[]], expected: [] },
      { id: 'rll-4', label: 'Single Node', args: [[42]], expected: [42], isHidden: true },
    ],
  },
];
