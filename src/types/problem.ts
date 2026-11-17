export type Language = 'python' | 'javascript' | 'java' | 'cpp' | 'c' | 'csharp';

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Playground';

export type Category =
  | 'Arrays & Hashing'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Binary Search'
  | 'Stack & Queue'
  | 'Linked List'
  | 'Trees'
  | 'Graphs'
  | 'Heap & Priority Queue'
  | 'Intervals'
  | 'Dynamic Programming'
  | 'Sorting & Playground';

export type ArgType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'number[]'
  | 'string[]'
  | 'number[][]'
  | 'string[][]'
  | 'linkedList'
  | 'linkedListCycle'
  | 'linkedListArray'
  | 'binaryTree'
  | 'treeNodeRef'
  | 'treeNodeVal'
  | 'graphAdjList'
  | 'any';

export type CompareMode =
  | 'exact'
  | 'unorderedArray'
  | 'unorderedOuterArray'
  | 'unorderedNestedArray'
  | 'float'
  | 'playground';

export interface ProblemParam {
  name: string;
  type: ArgType;
}

export interface TestCase {
  id: string;
  label: string;
  args: unknown[];
  expected: unknown;
  isHidden?: boolean;
  explanation?: string;
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface VisualHint {
  primaryStructure:
  | 'array'
  | 'bars'
  | 'matrix'
  | 'linkedList'
  | 'tree'
  | 'graph'
  | 'stack'
  | 'heap'
  | 'intervals'
  | 'dp'
  | 'auto';
  highlightPointers?: string[];
  description?: string;
}

export interface Problem {
  id: string;
  number: number;
  title: string;
  scenario?: string;
  difficulty: Difficulty;
  category: Category;
  tags: string[];
  isPlayground?: boolean;
  entryFunction: string;
  params: ProblemParam[];
  returnType: ArgType | 'void';
  compareMode: CompareMode;
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  hints: string[];
  timeComplexity: string;
  spaceComplexity: string;
  visualHint: VisualHint;
  starterCode: Record<Language, string>;
  optimalCode: Record<Language, string>;
  testCases: TestCase[];
}

