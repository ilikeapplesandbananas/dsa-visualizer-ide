# trace (AlgoLens) — DSA & LeetCode Execution Visualizer IDE

**Live Website:** **https://ilikeapplesandbananas.github.io/dsa-visualizer-ide/**

An interactive, dual-surface coding IDE and step-by-step algorithm visualizer for LeetCode-style data structures & algorithms interview preparation across **6 programming languages** (`Python 3`, `JavaScript`, `Java`, `C++`, `C`, and `C#`) and **41 curated problems & sandboxes**.

Write your own solution or inspect clean optimal implementations, execute against sample/custom/hidden test cases, and scrub line-by-line through live synchronized animations of arrays, pointers, hash maps, trees, graphs/grids, heaps, stacks/queues, linked lists, intervals, and dynamic programming states—paired with mathematical callouts and a plain-English **"WHY THIS WORKS"** intuition card at every step.

> **100% Static Web + Local Full-Stack Support:** On GitHub Pages, all **6 languages** execute directly inside your browser (JavaScript in a sandboxed Web Worker, Python 3 via **Pyodide WebAssembly**, and Java / C++ / C / C# via **web-tree-sitter WASM**). Locally (`npm run dev` / `npm start`), the UI seamlessly uses the Express backend when available.

---

## Key Features

### 1. Focused Two-Surface Dark Workspace
- **Left Surface — Code & Test Drawer:**
  - [Monaco Editor](https://microsoft.github.io/monaco-editor/) (`trace-obsidian` dark theme) with active execution line highlighting and gutter indicators.
  - **6-Language Switcher:** Switch seamlessly between `Python 3`, `JavaScript`, `Java`, `C++`, `C`, and `C#` with starter templates and reference optimal solutions (`Optimal` / `Reset`).
  - **Collapsible Problem Summary & Slide-Over Details:** Compact single-line summary above the editor, with an expandable **Problem details** overlay (`Description`, `Hints`, `Submissions`) and a searchable **`trace / problems`** catalog drawer.
  - **Bottom Test Drawer (`Test case` / `Output`):** Switch between visible sample cases or edit custom JSON/literal arguments with live input validation, `+ Add case`, secondary `Run Tests`, `Submit All`, and `Trace`.
- **Right Surface — Live Visual Canvas:**
  - **Visualization Tab (Default):** Step headline (`01 / N`), multi-renderer algorithm canvas, inline formula strip (e.g. complement arithmetic, window invariants), and a **"WHY THIS WORKS"** narrative panel explaining the algorithmic invariant at the active step.
  - **Execution trace Tab:** Full call stack frames, recursion tree SVG, live heap/local variable inspector, return values, and captured `stdout`.
  - **Playback Scrubber:** Step backward/forward (`←` / `→`), Play/Pause (`Space`), custom timeline slider, and `0.5x–4x` speed control.

### 2. Automatic Data Structure & Algorithm Visualizers
Step frames from `ExecutionTrace` are analyzed by [`structureDetector.ts`](src/engine/structureDetector.ts) and narrated by [`stepNarrator.ts`](src/engine/stepNarrator.ts) to render specialized live views:
- **Arrays & Pointers (`ArrayVisualizer`):** Indexed cell strips with named pointer badges (`i`, `j`, `left`, `right`, `mid`, `slow`, `fast`), active highlights, swapped/written states, bar-height comparisons, and inline math formulas.
- **Grids & DP Matrices (`MatrixVisualizer`):** 2D board states for BFS/DFS flood-fill, shortest paths, and DP tables (`dp[r][c]`).
- **Hash Maps & Sets (`HashMapSetVisualizer`):** Live key/value tables and set memberships with highlighted lookups and updates.
- **Stacks & Queues (`StackQueueVisualizer`):** LIFO stacks, monotonic stacks, and FIFO `deque` buffers for BFS & parentheses matching.
- **Heaps / Priority Queues (`HeapVisualizer`):** Min-heap and max-heap tree/array views for Top-K, K-Closest, Merge-K, and scheduling problems.
- **Binary Trees (`TreeVisualizer`):** SVG hierarchical tree diagrams with active traversal pointers and recursion tree panels (`CallStackPanel`).
- **Graphs (`GraphVisualizer`):** Directed/undirected adjacency graph layouts for topological sort, BFS, and DFS.
- **Linked Lists (`LinkedListVisualizer`):** Node-pointer chains with cycle detection pointers (`slow`/`fast`) and pointer-rewiring highlights.
- **Intervals (`IntervalVisualizer`):** Sorted timeline bars showing merges and overlaps.

### 3. Real Multi-Language Execution & Tracing Engine
Every supported language is genuinely executed and traced step-by-step (no hardcoded canned animations):

| Language | Execution & Trace Strategy | Location |
| --- | --- | --- |
| **JavaScript** | Client-side sandboxed **Web Worker** using `acorn` AST parsing and `astring` code generation to instrument every statement, loop, branch, function call, and return. | [`src/engine/jsInstrumenter.ts`](src/engine/jsInstrumenter.ts), [`src/engine/jsRunner.ts`](src/engine/jsRunner.ts), [`src/engine/jsWorker.ts`](src/engine/jsWorker.ts) |
| **Python 3** | Server-side isolated Python subprocess (`python -I` / `python3 -I`) OR automatic in-browser **Pyodide (CPython WebAssembly)** runtime when hosted statically, using `sys.settrace` to capture frames, locals, heap objects (`ListNode`, `TreeNode`, `Node`, `deque`, `heapq`), and `stdout`. | [`src/engine/browserPythonRunner.ts`](src/engine/browserPythonRunner.ts), [`server/pyRunner.ts`](server/pyRunner.ts), [`server/py_tracer.py`](server/py_tracer.py) |
| **Java, C++, C, C#** | Isomorphic WASM CST parsing via `web-tree-sitter` + `tree-sitter-wasms` (`tree-sitter-java`, `tree-sitter-cpp`, `tree-sitter-c`, `tree-sitter-c_sharp`) loaded locally on Node or from `public/wasm/` in browser, lowered into sandboxed instrumented JS with typed containers (`AlgoDeque`, `AlgoMap`, `AlgoSet`, `TrackedHeap`, `RefBox`, pointers). | [`src/engine/treeSitterCore.ts`](src/engine/treeSitterCore.ts), [`src/engine/browserLangRunner.ts`](src/engine/browserLangRunner.ts), [`src/engine/langRuntime.ts`](src/engine/langRuntime.ts), [`server/treeSitterRunner.ts`](server/treeSitterRunner.ts) |

---

## Problem & Playground Catalog (41 Items)

All 41 entries ship with starter templates and tested optimal implementations in all 6 languages (`Python 3`, `JavaScript`, `Java`, `C++`, `C`, `C#`):

| # | Problem | Category | Difficulty | Interview Track / Scenario |
| --- | --- | --- | --- | --- |
| 1 | Two Sum | Arrays & Hashing | Easy | — |
| 238 | Product of Array Except Self | Arrays & Hashing | Medium | — |
| 560 | Subarray Sum Equals K | Arrays & Hashing | Medium | — |
| 11 | Container With Most Water | Two Pointers | Medium | — |
| 15 | 3Sum | Two Pointers | Medium | — |
| 42 | Trapping Rain Water | Two Pointers | Hard | — |
| 763 | Partition Labels | Two Pointers | Medium | Greedy last-occurrence slice bounds |
| 3 | Longest Substring Without Repeating Characters | Sliding Window | Medium | Kindle / CloudWatch Traffic Spike |
| 121 | Best Time to Buy and Sell Stock | Sliding Window | Easy | — |
| 395 | Longest Substring with At Least K Repeating Characters | Sliding Window | Medium | Divide & Conquer frequency split |
| 2461 | Maximum Sum of Distinct Subarrays With Length K | Sliding Window | Medium | Kindle / CloudWatch Traffic Spike |
| 704 | Binary Search | Binary Search | Easy | — |
| 33 | Search in Rotated Sorted Array | Binary Search | Medium | — |
| 20 | Valid Parentheses | Stack & Queue | Easy | — |
| 316 | Remove Duplicate Letters | Stack & Queue | Medium | Monotonic stack greedy smallest string |
| 739 | Daily Temperatures | Stack & Queue | Medium | — |
| 21 | Merge Two Sorted Lists | Linked List | Easy | — |
| 141 | Linked List Cycle | Linked List | Easy | — |
| 206 | Reverse Linked List | Linked List | Easy | — |
| 98 | Validate Binary Search Tree | Trees | Medium | — |
| 102 | Binary Tree Level Order Traversal | Trees | Medium | Category Hierarchy / Permission Tree |
| 113 | Path Sum II | Trees | Medium | Category Hierarchy / Permission Tree |
| 199 | Binary Tree Right Side View | Trees | Medium | Category Hierarchy / Permission Tree |
| 226 | Invert Binary Tree | Trees | Easy | — |
| 236 | Lowest Common Ancestor of a Binary Tree | Trees | Medium | Category Hierarchy / Permission Tree |
| 200 | Number of Islands | Graphs | Medium | Warehouse Robot / Server Cluster |
| 207 | Course Schedule | Graphs | Medium | — |
| 994 | Rotting Oranges | Graphs | Medium | Warehouse Robot / Server Broadcast |
| 1091 | Shortest Path in Binary Matrix | Graphs | Medium | Warehouse Robot / Server Broadcast |
| 23 | Merge k Sorted Lists | Heap & Priority Queue | Hard | Order Fulfillment / Log Aggregation |
| 253 | Meeting Rooms II | Heap & Priority Queue | Medium | Order Fulfillment / Log Aggregation |
| 347 | Top K Frequent Elements | Heap & Priority Queue | Medium | Order Fulfillment / Log Aggregation |
| 973 | K Closest Points to Origin | Heap & Priority Queue | Medium | Order Fulfillment / Log Aggregation |
| 56 | Merge Intervals | Intervals | Medium | — |
| 70 | Climbing Stairs | Dynamic Programming | Easy | — |
| 198 | House Robber | Dynamic Programming | Medium | — |
| 322 | Coin Change | Dynamic Programming | Medium | — |
| 1143 | Longest Common Subsequence | Dynamic Programming | Medium | — |
| 901 | Playground: Quick Sort & Array Swaps | Sorting & Playground | Playground | Interactive sorting sandbox |
| 902 | Playground: Graph BFS Traversal | Sorting & Playground | Playground | Interactive BFS sandbox |
| 903 | Playground: Free DSA Scratchpad | Sorting & Playground | Playground | Free-form algorithm scratchpad |

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), `@monaco-editor/react` + `monaco-editor`, `lucide-react`
- **Backend & Language Runtimes:** Node.js, Express 5, `tsx`, `web-tree-sitter`, `tree-sitter-wasms`, `acorn`, `astring`, Python 3 (`sys.settrace`)
- **Testing:** Vitest 5

---

## Project Structure

```text
dsa-visualizer-ide/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── wasm/                     # Tree-sitter runtime & Java/C++/C/C# WASM binaries for GitHub Pages
├── server/
│   ├── index.ts                  # Express API + production static server (port 3001)
│   ├── pyRunner.ts               # Spawns isolated python process for trace/tests
│   ├── py_tracer.py              # Python sys.settrace tracer & LeetCode test harness
│   ├── treeSitterRunner.ts       # Node WASM loader delegating to isomorphic treeSitterCore
│   └── langRuntime.ts            # Re-export barrel for shared multi-language container runtime
└── src/
    ├── App.tsx                   # Resizable 2-surface layout, execution state & hotkeys
    ├── index.css                 # Tailwind v4 theme tokens & custom Monaco/slider styles
    ├── main.tsx
    ├── types/
    │   ├── problem.ts            # Problem, Param, Language, TestCase & VisualHint types
    │   └── trace.ts              # TraceStep, StackFrame, HeapObject & API contracts
    ├── data/
    │   ├── problems.ts           # Unified export of all 38 problems & lookup helper
    │   └── problemsPart1..4.ts   # Problem definitions, 6-language templates & test cases
    ├── engine/
    │   ├── browserLangRunner.ts  # Client-side Java/C++/C/C# WASM execution runner
    │   ├── browserPythonRunner.ts# Client-side Pyodide WebAssembly Python runner
    │   ├── dataConverters.ts     # ListNode, TreeNode, GraphNode, AlgoHeap & comparators
    │   ├── inputPreview.ts       # Static pre-run structure previews before clicking Visualize
    │   ├── jsInstrumenter.ts     # Acorn AST instrumenter for JavaScript tracing
    │   ├── jsRunner.ts           # Instrumented JS trace & test suite runner
    │   ├── jsWorker.ts           # Dedicated browser Web Worker for JS execution
    │   ├── langRuntime.ts        # Shared multi-language tracked containers & pointer runtime
    │   ├── pythonClient.ts       # Hybrid dispatcher (local Express API or in-browser engines)
    │   ├── stepNarrator.ts       # Pedagogical headlines, formulas & WHY THIS WORKS generator
    │   ├── structureDetector.ts  # Infers arrays, trees, graphs, heaps, matrices & maps
    │   └── treeSitterCore.ts     # Isomorphic Java/C++/C/C# CST lowerer & executor
    ├── components/
    │   ├── Header.tsx            # Top nav bar, problem switcher, Run Tests & Visualize CTA
    │   ├── CodeEditorPanel.tsx   # Monaco editor, language selector & Problem details sheet
    │   ├── TestConsolePanel.tsx  # Test case editor drawer, Output results & validation
    │   ├── VisualizerPanel.tsx   # Visual canvas, WHY THIS WORKS card, scrubber & debug tab
    │   ├── ProblemDrawer.tsx     # Filterable problem & playground catalog overlay
    │   └── visualizers/          # Array, Matrix, Tree, Graph, LinkedList, Heap, Interval, StackQueue, HashMapSet, CallStack
    └── tests/
        ├── jsInstrumenter.test.ts
        ├── multiLangRunner.test.ts
        ├── narrator.test.ts
        ├── problems.test.ts
        └── visualizerIntegration.test.ts
```

---

## Getting Started

### Prerequisites
- **Node.js** (v20+ recommended) & `npm`
- **Python 3** available on `PATH` as `python` (Windows) or `python3` (macOS/Linux) for Python tracing

### Installation

```bash
npm install
```

### Development Mode (Hot Reload UI + API)

Starts both the Express API server (`http://localhost:3001`) and the Vite dev server (`http://localhost:5173`, proxying `/api` to port `3001`):

```bash
npm run dev
```

### Production Build & Serve

```bash
npm run build
npm start
```

Then open **`http://localhost:3001`** in your browser.

---

## Keyboard Shortcuts

- **`Cmd / Ctrl + Enter`** — Run **`Visualize`** on the active test case
- **`Space`** (outside editor/inputs) — Toggle Play / Pause playback
- **`←` / `→`** (outside editor/inputs) — Step backward / forward through execution steps

---

## API Endpoints

- `GET /api/health` — Server status, Python availability, and supported language list
- `POST /api/python/execute` — Runs Python code in `'trace'` or `'tests'` mode via [`py_tracer.py`](server/py_tracer.py)
- `POST /api/lang/execute` — Runs `java`, `cpp`, `c`, or `csharp` code in `'trace'` or `'tests'` mode via [`treeSitterRunner.ts`](server/treeSitterRunner.ts)

---

## Verification & Scripts

```bash
# Type-check frontend & server TypeScript
npm run typecheck

# Run full Vitest suite (JS/Python problem checks, 152 Java/C++/C/C# runtime checks, narrator & visualizer tests)
npm test
```
