import type { Problem, TestCase } from '../types/problem';
import type { HeapObject, SerializedValue, TraceStep } from '../types/trace';
import {
  formatSerializedValue,
  type ArrayViewModel,
  type DetectedStructures,
  type MapViewModel,
  type MatrixViewModel,
} from './structureDetector';

export interface FormulaCallout {
  label: string;
  expression: string;
  badge?: string;
  badgeOk?: boolean;
}

export interface MapAnnotation {
  keyLabel: string;
  valueLabel: string;
  highlightKey?: string;
  noteFormatter: (mapName: string, key: string, value: string) => string;
}

export interface StepNarrative {
  headline: string;
  subtitle: string;
  formula?: FormulaCallout;
  whyTitle: string;
  whyBody: string;
  resultPreview?: {
    label: string;
    value: string;
    note?: string;
  };
  mapAnnotation?: MapAnnotation;
}

function getScalarNum(structures: DetectedStructures, ...names: string[]): number | null {
  for (const name of names) {
    const found = structures.scalars.find((s) => s.name === name);
    if (found) {
      const cleaned = found.display.replace(/^['"]|['"]$/g, '');
      const n = Number(cleaned);
      if (Number.isFinite(n) && cleaned !== '' && cleaned !== 'true' && cleaned !== 'false') {
        return n;
      }
    }
  }
  return null;
}

function getScalarDisplay(structures: DetectedStructures, ...names: string[]): string | null {
  for (const name of names) {
    const found = structures.scalars.find((s) => s.name === name);
    if (found) return found.display;
  }
  return null;
}

function findArray(structures: DetectedStructures, ...preferredNames: string[]): ArrayViewModel | undefined {
  for (const name of preferredNames) {
    const found = structures.arrays.find((a) => a.name === name);
    if (found) return found;
  }
  return structures.arrays[0];
}

function findMap(structures: DetectedStructures, ...preferredNames: string[]): MapViewModel | undefined {
  for (const name of preferredNames) {
    const found = structures.maps.find((m) => m.name === name);
    if (found) return found;
  }
  return structures.maps[0];
}

function findMatrix(structures: DetectedStructures, ...preferredNames: string[]): MatrixViewModel | undefined {
  for (const name of preferredNames) {
    const found = structures.matrices.find((m) => m.name === name);
    if (found) return found;
  }
  return structures.matrices[0];
}

function getActiveReturnValue(
  step: TraceStep | null,
  finalOutput: unknown
): string | null {
  if (step?.event === 'return' && step.returnValue !== undefined && step.callStack.length <= 1) {
    return formatSerializedValue(step.returnValue, step.heap);
  }
  if (step === null && finalOutput !== undefined) {
    return JSON.stringify(finalOutput);
  }
  return null;
}

function formatMatrixCount(matrix: MatrixViewModel | undefined, targetDisplay: string): number {
  if (!matrix) return 0;
  let count = 0;
  for (const row of matrix.rows) {
    for (const cell of row) {
      if (cell.display === targetDisplay) count++;
    }
  }
  return count;
}

function defaultMapNote(mapName: string, key: string, value: string): string {
  return `${mapName}[${key}] = ${value}`;
}

function createPreviewNarrative(problem: Problem, testCase: TestCase | undefined): StepNarrative {
  const scenarioTag = problem.scenario ? `${problem.scenario} · ` : '';
  const summary = problem.description.split('\n')[0].replace(/`([^`]+)`/g, '$1').slice(0, 110);
  const inputStr = testCase
    ? problem.params.map((p, i) => `${p.name} = ${JSON.stringify(testCase.args[i])}`).join(', ')
    : '';

  return {
    headline: problem.title,
    subtitle: `${scenarioTag}${problem.category} · ${problem.timeComplexity}`,
    whyTitle: 'Ready to trace every execution step.',
    whyBody: summary || 'Press Visualize to inspect live pointers, data structures, and state transitions.',
    resultPreview: inputStr
      ? {
          label: 'input',
          value: inputStr.length > 46 ? inputStr.slice(0, 43) + '...' : inputStr,
          note: `expected ${JSON.stringify(testCase?.expected ?? '')}`,
        }
      : undefined,
  };
}

export function narrateStep(
  problem: Problem,
  step: TraceStep | null,
  _prevStep: TraceStep | null,
  structures: DetectedStructures,
  testCase: TestCase | undefined,
  finalOutput: unknown,
  isPreview = false
): StepNarrative {
  if (isPreview || !step) {
    return createPreviewNarrative(problem, testCase);
  }

  const returnDisplay = getActiveReturnValue(step, finalOutput);
  const changed = new Set(step.changedVars);

  // Return final celebration card if root frame returned
  if (step.event === 'exception' || step.error) {
    return {
      headline: 'Execution error',
      subtitle: `Stopped on line ${step.line}`,
      whyTitle: 'Runtime exception raised.',
      whyBody: step.error ?? 'Check edge cases, array bounds, or syntax.',
    };
  }

  switch (problem.id) {
    case 'two-sum': {
      const numsArr = findArray(structures, 'nums');
      const seenMap = findMap(structures, 'seen', 'map', 'mp', 'prevMap', 'dict', 'lookup');
      const target = getScalarNum(structures, 'target') ?? (Number(testCase?.args?.[1]) || null);
      const i = getScalarNum(structures, 'i', 'idx');
      const curNum =
        getScalarNum(structures, 'num', 'n', 'x', 'val') ??
        (i !== null && numsArr?.items[i] ? numsArr.items[i].numericValue : null);
      const complement =
        getScalarNum(structures, 'complement', 'comp', 'diff', 'need', 'needed') ??
        (target !== null && curNum !== null ? target - curNum : null);
      const complementStr = complement !== null ? String(complement) : null;
      const matchedEntry = complementStr
        ? seenMap?.entries.find((e) => e.key.replace(/^['"]|['"]$/g, '') === complementStr)
        : undefined;

      const formula: FormulaCallout | undefined =
        target !== null && curNum !== null && complement !== null
          ? {
              label: 'complement',
              expression: `${target} - ${curNum} = ${complement}`,
              badge: matchedEntry ? '✓ in seen' : 'not in seen yet',
              badgeOk: Boolean(matchedEntry),
            }
          : undefined;

      const mapAnnotation: MapAnnotation = {
        keyLabel: 'VALUE',
        valueLabel: 'INDEX',
        highlightKey: complementStr ?? undefined,
        noteFormatter: defaultMapNote,
      };

      if (returnDisplay && matchedEntry) {
        return {
          headline: 'Match found',
          subtitle: 'Two values. One target.',
          formula,
          mapAnnotation,
          whyTitle: `${curNum} needs ${complement} to reach ${target}.`,
          whyBody: `We already saw ${complement} at index ${matchedEntry.valueDisplay}. Return both indices.`,
          resultPreview: {
            label: 'return',
            value: returnDisplay,
            note: `${complement} + ${curNum} = ${target}`,
          },
        };
      }

      if (matchedEntry && curNum !== null && complement !== null) {
        return {
          headline: 'Complement located',
          subtitle: 'Checking hash table lookup in O(1).',
          formula,
          mapAnnotation,
          whyTitle: `${curNum} needs ${complement} to reach ${target}.`,
          whyBody: `Hash map already holds ${complement} → index ${matchedEntry.valueDisplay}, avoiding a quadratic scan.`,
          resultPreview: {
            label: 'pair',
            value: `[${matchedEntry.valueDisplay}, ${i ?? '?'}]`,
            note: `${complement} + ${curNum} = ${target}`,
          },
        };
      }

      if (i !== null && curNum !== null && complement !== null) {
        const storedNow = changed.has('seen') || changed.has('mp') || changed.has('map');
        return {
          headline: storedNow ? 'Record seen value' : `Inspect index ${i}`,
          subtitle: 'Two values. One target.',
          formula,
          mapAnnotation,
          whyTitle: storedNow
            ? `Stored ${curNum} → index ${i}.`
            : `${curNum} needs ${complement} to reach ${target}.`,
          whyBody: storedNow
            ? `Future elements needing ${curNum} can now look up index ${i} in O(1) time.`
            : `${complement} has not appeared earlier in the pass, so we record ${curNum} after checking.`,
        };
      }

      return {
        headline: 'Initialize hash map',
        subtitle: 'Two values. One target.',
        mapAnnotation,
        whyTitle: 'Trade O(n) space for O(1) complement lookups.',
        whyBody: 'Instead of nested loops checking every pair, remember each visited number and its index.',
      };
    }

    case 'product-except-self': {
      const numsArr = findArray(structures, 'nums');
      const resArr = findArray(structures, 'res', 'ans', 'answer', 'output', 'result');
      const i = getScalarNum(structures, 'i');
      const prefix = getScalarNum(structures, 'prefix', 'left', 'pre');
      const suffix = getScalarNum(structures, 'suffix', 'right', 'post', 'postfix');

      const inSuffixPass = suffix !== null && (changed.has('suffix') || changed.has('right') || changed.has('post') || prefix === null || suffix !== 1 || (i !== null && changed.has('res')));
      const activeIdx = i !== null ? i : 0;
      const curNum = numsArr?.items[activeIdx]?.numericValue;
      const curRes = resArr?.items[activeIdx]?.numericValue;

      if (returnDisplay) {
        return {
          headline: 'Products complete',
          subtitle: 'Prefix pass + suffix pass in O(1) extra space.',
          whyTitle: 'Every index combined left and right products.',
          whyBody: 'Multiplying the prefix product (left of i) by the suffix product (right of i) excludes nums[i] without division.',
          resultPreview: { label: 'return', value: returnDisplay, note: 'Time O(n) · Space O(1) aux' },
        };
      }

      if (inSuffixPass && suffix !== null && curNum !== null) {
        return {
          headline: 'Suffix pass (right → left)',
          subtitle: 'Multiply stored left prefix by running right product.',
          formula: {
            label: `res[${activeIdx}]`,
            expression: `${curRes ?? '?'} × ${suffix} (suffix)`,
            badge: `next suffix = ${suffix} × ${curNum}`,
            badgeOk: true,
          },
          whyTitle: `Index ${activeIdx} carries its left product ${curRes ?? '?'}.`,
          whyBody: `Multiplying by suffix ${suffix} gives the full product excluding nums[${activeIdx}] = ${curNum}.`,
        };
      }

      return {
        headline: 'Prefix pass (left → right)',
        subtitle: 'Accumulate product of elements strictly before index i.',
        formula:
          prefix !== null
            ? {
                label: `res[${activeIdx}] = prefix`,
                expression: `${prefix}${curNum !== null ? `  (then prefix × ${curNum})` : ''}`,
                badge: 'left pass',
              }
            : undefined,
        whyTitle: prefix !== null ? `Prefix before index ${activeIdx} equals ${prefix}.` : 'Prepare output array for two linear passes.',
        whyBody: 'First pass writes product of nums[0..i-1] into answer[i]; second pass multiplies by nums[i+1..n-1].',
      };
    }

    case 'best-time-buy-sell-stock': {
      const prices = findArray(structures, 'prices');
      const minPrice = getScalarNum(structures, 'minPrice', 'min_price', 'low', 'buy');
      const maxProfit = getScalarNum(structures, 'maxProfit', 'max_profit', 'profit', 'best', 'res');
      const price = getScalarNum(structures, 'price', 'p');
      const i = getScalarNum(structures, 'i', 'r');
      const curPrice = price ?? (i !== null ? prices?.items[i]?.numericValue ?? null : null);
      const curProfit = minPrice !== null && curPrice !== null ? curPrice - minPrice : null;

      return {
        headline: returnDisplay ? 'Maximum profit found' : curProfit !== null && curProfit > (maxProfit ?? 0) ? 'New best sell day' : 'Scan price timeline',
        subtitle: 'Single-pass minimum buy tracking.',
        formula:
          minPrice !== null && curPrice !== null && curProfit !== null
            ? {
                label: 'profit today',
                expression: `${curPrice} - ${minPrice} = ${curProfit}`,
                badge: maxProfit !== null ? `best = ${maxProfit}` : undefined,
                badgeOk: curProfit >= 0 && curProfit >= (maxProfit ?? 0),
              }
            : undefined,
        whyTitle:
          curPrice !== null && minPrice !== null
            ? `Lowest buy price so far is ${minPrice}; selling at ${curPrice} yields ${curPrice - minPrice}.`
            : 'Track the running minimum buy price before today.',
        whyBody: 'A valid sale always comes after the buy day, so keeping minPrice from earlier indices guarantees temporal order in O(1) space.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'max profit' } : undefined,
      };
    }

    case 'container-with-most-water': {
      const h = findArray(structures, 'height', 'h');
      const l = getScalarNum(structures, 'l', 'left');
      const r = getScalarNum(structures, 'r', 'right');
      const best = getScalarNum(structures, 'best', 'maxArea', 'max_area', 'res', 'ans');
      const hl = l !== null ? h?.items[l]?.numericValue ?? null : null;
      const hr = r !== null ? h?.items[r]?.numericValue ?? null : null;
      const area = hl !== null && hr !== null && l !== null && r !== null ? Math.min(hl, hr) * (r - l) : null;

      return {
        headline: returnDisplay ? 'Maximum container area' : 'Shrink the shorter wall',
        subtitle: 'Two converging pointers maximize width × min height.',
        formula:
          area !== null && l !== null && r !== null && hl !== null && hr !== null
            ? {
                label: 'area',
                expression: `min(${hl}, ${hr}) × (${r} - ${l}) = ${area}`,
                badge: best !== null ? `best = ${best}` : undefined,
                badgeOk: best !== null && area >= best,
              }
            : undefined,
        whyTitle:
          hl !== null && hr !== null
            ? `Left height ${hl} vs right height ${hr}: move ${hl <= hr ? 'left' : 'right'} pointer.`
            : 'Width only shrinks as pointers move inward.',
        whyBody: 'Moving the taller wall inward can never increase min(h[l], h[r]) while reducing width, so only advancing the shorter wall can uncover a taller bound.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'max water area' } : undefined,
      };
    }

    case 'trapping-rain-water': {
      const h = findArray(structures, 'height', 'h');
      const l = getScalarNum(structures, 'l', 'left');
      const r = getScalarNum(structures, 'r', 'right');
      const lMax = getScalarNum(structures, 'leftMax', 'left_max', 'lMax');
      const rMax = getScalarNum(structures, 'rightMax', 'right_max', 'rMax');
      const water = getScalarNum(structures, 'water', 'res', 'ans', 'total');
      const curSide = lMax !== null && rMax !== null ? (lMax <= rMax ? 'left' : 'right') : null;
      const curIdx = curSide === 'left' ? l : r;
      const curH = curIdx !== null ? h?.items[curIdx]?.numericValue ?? null : null;

      return {
        headline: returnDisplay ? 'Total trapped water' : 'Two-pointer boundary water',
        subtitle: 'Lower max boundary locks the water level at current bar.',
        formula:
          lMax !== null && rMax !== null && curH !== null
            ? {
                label: curSide === 'left' ? 'left fill' : 'right fill',
                expression: `${curSide === 'left' ? lMax : rMax} - ${curH} = ${Math.max(0, (curSide === 'left' ? lMax : rMax) - curH)}`,
                badge: water !== null ? `total = ${water}` : undefined,
                badgeOk: true,
              }
            : undefined,
        whyTitle: lMax !== null && rMax !== null ? `leftMax=${lMax}, rightMax=${rMax} → safe side is ${curSide}.` : 'Maintain prefix/suffix walls dynamically.',
        whyBody: 'Water above a bar equals min(leftMax, rightMax) - height[i]. When leftMax <= rightMax, leftMax alone determines the cap at index l.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'units trapped' } : undefined,
      };
    }

    case 'longest-substring-no-repeat': {
      const l = getScalarNum(structures, 'left', 'l');
      const r = getScalarNum(structures, 'right', 'r');
      const ch = getScalarDisplay(structures, 'c', 'ch', 'char');
      const best = getScalarNum(structures, 'best', 'maxLen', 'max_len', 'res', 'ans');
      const winLen = l !== null && r !== null ? Math.max(0, r - l + 1) : null;

      return {
        headline: returnDisplay ? 'Longest unique window found' : changed.has('left') || changed.has('l') ? 'Shrink duplicate left edge' : 'Expand sliding window',
        subtitle: `${problem.scenario ? problem.scenario + ' · ' : ''}Sliding window + last-seen index.`,
        formula:
          l !== null && r !== null
            ? {
                label: 'window [l..r]',
                expression: `[${l}..${r}] length = ${winLen}${ch ? ` (char ${ch})` : ''}`,
                badge: best !== null ? `best = ${best}` : undefined,
                badgeOk: winLen !== null && best !== null && winLen >= best,
              }
            : undefined,
        whyTitle:
          ch !== null
            ? `Evaluating ${ch} inside active window [${l ?? 0}..${r ?? 0}].`
            : 'Jump left directly past duplicates.',
        whyBody: 'Whenever right hits a repeated character inside [left..right], jumping left to lastSeen[ch] + 1 restores uniqueness in O(1) without backtracking right.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'max distinct length' } : undefined,
      };
    }

    case 'max-sum-distinct-subarrays': {
      const l = getScalarNum(structures, 'left', 'l');
      const r = getScalarNum(structures, 'right', 'r');
      const k = getScalarNum(structures, 'k');
      const winSum = getScalarNum(structures, 'windowSum', 'window_sum', 'curSum', 'cur_sum', 'sum');
      const maxSum = getScalarNum(structures, 'maxSum', 'max_sum', 'best', 'ans', 'res');
      const counts = findMap(structures, 'counts', 'freq', 'count', 'mp', 'map');
      const uniqueCount = counts?.entries.length ?? structures.sets[0]?.items.length ?? null;
      const winLen = l !== null && r !== null ? r - l + 1 : null;
      const validWindow = k !== null && winLen === k && uniqueCount === k;

      return {
        headline: returnDisplay ? 'Max distinct k-sum' : validWindow ? 'Valid distinct k-window' : 'Slide & enforce uniqueness',
        subtitle: `${problem.scenario ? problem.scenario + ' · ' : ''}Fixed-size sliding window.`,
        formula:
          winSum !== null
            ? {
                label: 'window sum',
                expression: `${winSum} (${uniqueCount ?? '?'}/${k ?? '?'} unique)`,
                badge: validWindow ? '✓ valid k-window' : maxSum !== null ? `best = ${maxSum}` : undefined,
                badgeOk: validWindow,
              }
            : undefined,
        whyTitle: validWindow ? `Window holds ${k} distinct elements summing to ${winSum}.` : 'Maintain length ≤ k and zero duplicates.',
        whyBody: 'Evicting elements while size exceeds k or frequency > 1 ensures only valid distinct subarrays update maxSum.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'max distinct sum' } : undefined,
        mapAnnotation: {
          keyLabel: 'VALUE',
          valueLabel: 'FREQ',
          noteFormatter: defaultMapNote,
        },
      };
    }

    case 'three-sum': {
      const i = getScalarNum(structures, 'i');
      const l = getScalarNum(structures, 'l', 'left');
      const r = getScalarNum(structures, 'r', 'right');
      const numsArr = findArray(structures, 'nums');
      const a = i !== null ? numsArr?.items[i]?.numericValue ?? null : null;
      const b = l !== null ? numsArr?.items[l]?.numericValue ?? null : null;
      const c = r !== null ? numsArr?.items[r]?.numericValue ?? null : null;
      const sum = a !== null && b !== null && c !== null ? a + b + c : getScalarNum(structures, 'total', 'sum', 's');

      return {
        headline: returnDisplay ? 'All unique zero-sum triplets' : sum === 0 ? 'Triplet sum = 0' : 'Converge two pointers around anchor i',
        subtitle: 'Sort once, anchor nums[i], sweep sorted suffix.',
        formula:
          a !== null && b !== null && c !== null && sum !== null
            ? {
                label: 'triplet sum',
                expression: `${a} + (${b}) + (${c}) = ${sum}`,
                badge: sum === 0 ? '✓ record triplet' : sum < 0 ? 'too small → l++' : 'too large → r--',
                badgeOk: sum === 0,
              }
            : undefined,
        whyTitle: sum !== null ? `Current sum is ${sum} (anchor nums[${i ?? 0}] = ${a ?? '?'}).` : 'Sorting turns 2-sum suffix search into O(n).',
        whyBody: 'Skipping equal adjacent anchors and equal l/r values guarantees zero duplicate triplets without needing a set.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'unique triplets' } : undefined,
      };
    }

    case 'subarray-sum-equals-k': {
      const k = getScalarNum(structures, 'k');
      const prefix = getScalarNum(structures, 'prefixSum', 'prefix_sum', 'curr', 'cur', 'sum');
      const count = getScalarNum(structures, 'count', 'ans', 'res');
      const diff = prefix !== null && k !== null ? prefix - k : null;
      const prefMap = findMap(structures, 'prefixCounts', 'prefix_counts', 'counts', 'mp', 'map', 'seen');
      const hit = diff !== null ? prefMap?.entries.find((e) => e.key === String(diff)) : undefined;

      return {
        headline: returnDisplay ? 'Subarray count complete' : hit ? 'Matching prefix found' : 'Accumulate prefix sum',
        subtitle: 'Prefix sum difference equals target k.',
        formula:
          prefix !== null && k !== null && diff !== null
            ? {
                label: 'needed prefix',
                expression: `${prefix} - ${k} = ${diff}`,
                badge: hit ? `+${hit.valueDisplay} subarrays` : count !== null ? `count = ${count}` : undefined,
                badgeOk: Boolean(hit),
              }
            : undefined,
        whyTitle:
          diff !== null && hit
            ? `Seen ${hit.valueDisplay} prior prefix(es) equal to ${diff}.`
            : 'Every prior prefix of value (prefixSum - k) yields a valid ending subarray.',
        whyBody: 'Even with negative numbers where sliding window fails, prefixSum[r] - prefixSum[l-1] = k holds identically.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'subarrays summing to k' } : undefined,
        mapAnnotation: {
          keyLabel: 'PREFIX',
          valueLabel: 'COUNT',
          highlightKey: diff !== null ? String(diff) : undefined,
          noteFormatter: defaultMapNote,
        },
      };
    }

    case 'merge-intervals': {
      const merged = structures.intervals.find((iv) => iv.name.includes('merged') || iv.name === 'res' || iv.name === 'ans') ?? structures.intervals[structures.intervals.length - 1];
      const count = merged?.items.length ?? 0;

      return {
        headline: returnDisplay ? 'Intervals merged' : 'Sweep sorted intervals',
        subtitle: 'Sort by start time, extend end on overlap.',
        formula: merged && count > 0
          ? {
              label: 'last merged',
              expression: `[${merged.items[count - 1].start}, ${merged.items[count - 1].end}]`,
              badge: `${count} interval(s)`,
              badgeOk: true,
            }
          : undefined,
        whyTitle: 'Adjacent intervals overlap iff next.start ≤ current.end.',
        whyBody: 'After sorting by start coordinate, any interval that can merge with the current chain must touch the last merged interval.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'merged schedule' } : undefined,
      };
    }

    case 'binary-search':
    case 'search-rotated-array': {
      const nums = findArray(structures, 'nums');
      const l = getScalarNum(structures, 'l', 'left');
      const r = getScalarNum(structures, 'r', 'right');
      const m = getScalarNum(structures, 'mid', 'm');
      const target = getScalarNum(structures, 'target') ?? (Number(testCase?.args?.[1]) || null);
      const midVal = m !== null ? nums?.items[m]?.numericValue ?? null : null;
      const isMatch = midVal !== null && target !== null && midVal === target;

      return {
        headline: returnDisplay ? 'Search finished' : isMatch ? 'Target found at mid' : 'Halve search space',
        subtitle: problem.id === 'search-rotated-array' ? 'Identify sorted half before discarding.' : 'Binary search O(log n) narrowing.',
        formula:
          m !== null && midVal !== null && target !== null
            ? {
                label: `nums[${m}] vs target`,
                expression: `${midVal} ${midVal === target ? '==' : midVal < target ? '<' : '>'} ${target}`,
                badge: isMatch ? `✓ index ${m}` : l !== null && r !== null ? `range [${l}..${r}]` : undefined,
                badgeOk: isMatch,
              }
            : undefined,
        whyTitle:
          isMatch
            ? `Middle element nums[${m}] equals ${target}.`
            : l !== null && r !== null
              ? `Search space narrows to [${l}..${r}] (${Math.max(0, r - l + 1)} elements).`
              : 'Initialize left and right bounds.',
        whyBody:
          problem.id === 'search-rotated-array'
            ? 'At least one side of mid is guaranteed monotonically sorted; check whether target lies inside that sorted range.'
            : 'Comparing mid against target eliminates half the remaining elements on each iteration.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'target index' } : undefined,
      };
    }

    case 'valid-parentheses': {
      const stack = structures.stacksQueues[0];
      const ch = getScalarDisplay(structures, 'c', 'ch', 'char');
      const i = getScalarNum(structures, 'i');
      const sArr = findArray(structures, 's');
      const curChar = ch ?? (i !== null ? sArr?.items[i]?.display : undefined);

      return {
        headline: returnDisplay ? 'Validation complete' : 'Match brackets with LIFO stack',
        subtitle: 'Opening brackets push expected closers; closers verify top of stack.',
        formula: curChar
          ? {
              label: 'token',
              expression: curChar,
              badge: `stack depth = ${stack?.items.length ?? 0}`,
              badgeOk: true,
            }
          : undefined,
        whyTitle: 'Most recently opened bracket must close first (LIFO).',
        whyBody: 'If a closer meets an empty stack or mismatched opener, nesting is invalid immediately.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'valid brackets' } : undefined,
      };
    }

    case 'daily-temperatures': {
      const i = getScalarNum(structures, 'i');
      const temps = findArray(structures, 'temperatures', 'temps', 'T');
      const curTemp = i !== null ? temps?.items[i]?.numericValue ?? null : null;
      const stack = structures.stacksQueues[0];

      return {
        headline: returnDisplay ? 'Wait days computed' : 'Monotonic decreasing stack',
        subtitle: 'Resolve colder waiting days as soon as a warmer day arrives.',
        formula:
          i !== null && curTemp !== null
            ? {
                label: `day ${i}`,
                expression: `${curTemp}°${stack ? ` · waiting = ${stack.items.length}` : ''}`,
                badge: changed.has('res') || changed.has('ans') ? 'resolved colder day' : 'push index',
                badgeOk: changed.has('res') || changed.has('ans'),
              }
            : undefined,
        whyTitle: 'Each index is pushed once and popped once in O(n) total time.',
        whyBody: 'Whenever today is warmer than the day at the top of the stack, its exact wait distance is i - prevDay.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'days until warmer' } : undefined,
      };
    }

    case 'reverse-linked-list':
    case 'linked-list-cycle':
    case 'merge-two-sorted-lists': {
      const hasFast = structures.linkedList?.nodes.some((n) => n.pointers.includes('fast'));
      const ptrCount = structures.linkedList?.nodes.reduce((acc, n) => acc + n.pointers.length, 0) ?? 0;
      const titleMap: Record<string, string> = {
        'reverse-linked-list': 'Rewire next pointer backward',
        'linked-list-cycle': hasFast ? 'Floyd slow / fast pointer race' : 'Advance tortoise & hare pointers',
        'merge-two-sorted-lists': 'Splice smaller head node',
      };
      const whyMap: Record<string, string> = {
        'reverse-linked-list': 'Save curr.next before flipping curr.next = prev so the remaining list is never lost.',
        'linked-list-cycle': 'Fast advances 2 steps while slow advances 1; inside any cycle, their gap closes by 1 per step.',
        'merge-two-sorted-lists': 'Compare l1.val and l2.val and attach the smaller node directly without allocating copies.',
      };

      return {
        headline: returnDisplay ? 'Pointer traversal finished' : titleMap[problem.id],
        subtitle: 'In-place O(1) extra space pointer rewiring.',
        formula: {
          label: 'active pointers',
          expression: `${ptrCount} pointer(s) positioned`,
          badge: `${structures.linkedList?.nodes.length ?? 0} nodes`,
          badgeOk: true,
        },
        whyTitle: titleMap[problem.id],
        whyBody: whyMap[problem.id],
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay } : undefined,
      };
    }

    case 'invert-binary-tree':
    case 'level-order-traversal':
    case 'validate-bst':
    case 'right-side-view':
    case 'path-sum-ii':
    case 'lowest-common-ancestor': {
      const queue = structures.stacksQueues.find((sq) => sq.kind === 'queue');
      const depth = step.callStack.length;
      const pathArr = findArray(structures, 'path', 'res', 'level', 'ans');
      const curSum = getScalarNum(structures, 'remaining', 'rem', 'curSum', 'sum');

      const labels: Record<string, [string, string, string]> = {
        'invert-binary-tree': ['Swap left & right subtrees', 'DFS post/pre-order mirror flip.', 'Swapping children recursively mirrors every subtree bottom-up or top-down.'],
        'level-order-traversal': ['Drain current BFS level', `${problem.scenario ?? 'Category Hierarchy BFS'}`, 'Snapshots q.length before draining ensures nodes from each depth stay grouped cleanly.'],
        'validate-bst': ['Verify strict (low, high) bounds', 'Pass ancestor range down recursion.', 'Checking node.val against left/right immediate children misses deep violations; range bounds enforce global BST order.'],
        'right-side-view': ['Capture rightmost node at depth', `${problem.scenario ?? 'Hierarchy Right View'}`, 'Iterating level-by-level via BFS queue means the final node (i == levelSize - 1) is visible from the right.'],
        'path-sum-ii': ['Explore root-to-leaf path & backtrack', `${problem.scenario ?? 'Permission Path Accumulator'}`, 'Record path when a leaf hits remaining == 0, then pop on return so siblings share one mutable path buffer.'],
        'lowest-common-ancestor': ['Propagate target hits upward', `${problem.scenario ?? 'Shared Ancestor Lookup'}`, 'The first node receiving non-null matches from both left and right subtrees is the lowest common ancestor.'],
      };
      const [h, sub, body] = labels[problem.id];

      return {
        headline: returnDisplay ? 'Tree traversal complete' : h,
        subtitle: sub,
        formula:
          queue
            ? {
                label: 'BFS queue',
                expression: `${queue.items.length} node(s) queued`,
                badge: pathArr ? `output len = ${pathArr.items.length}` : undefined,
                badgeOk: true,
              }
            : curSum !== null
              ? {
                  label: 'remaining sum',
                  expression: `${curSum}`,
                  badge: `call depth ${depth}`,
                  badgeOk: curSum === 0,
                }
              : {
                  label: 'recursion depth',
                  expression: `frame ${depth} (${step.funcName})`,
                  badgeOk: true,
                },
        whyTitle: h,
        whyBody: body,
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay } : undefined,
      };
    }

    case 'rotting-oranges':
    case 'shortest-path-binary-matrix':
    case 'number-of-islands': {
      const mat = findMatrix(structures, 'grid');
      const queue = structures.stacksQueues.find((sq) => sq.kind === 'queue');
      const minutes = getScalarNum(structures, 'minutes', 'mins', 'dist', 'steps', 'islands', 'count');
      const fresh = getScalarNum(structures, 'fresh');

      if (problem.id === 'rotting-oranges') {
        const freshCount = fresh ?? formatMatrixCount(mat, '1');
        const rottenCount = formatMatrixCount(mat, '2');
        return {
          headline: returnDisplay ? 'Propagation finished' : queue && queue.items.length > 0 ? 'Expand rotten wavefront' : 'Seed multi-source BFS',
          subtitle: `${problem.scenario ?? 'Warehouse Multi-Source BFS'} · O(R·C)`,
          formula: {
            label: 'grid state',
            expression: `minutes = ${minutes ?? 0} · fresh = ${freshCount} · rotten = ${rottenCount}`,
            badge: queue ? `queue = ${queue.items.length}` : undefined,
            badgeOk: freshCount === 0,
          },
          whyTitle: 'All initially rotten cells start in the deque together (minute 0).',
          whyBody: 'Expanding level-by-level spreads rot simultaneously in O(R·C) time while marking visited cells 1 → 2 in-place.',
          resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'minutes elapsed' } : undefined,
        };
      }

      if (problem.id === 'shortest-path-binary-matrix') {
        return {
          headline: returnDisplay ? 'Shortest path resolved' : '8-directional unweighted BFS',
          subtitle: `${problem.scenario ?? 'Warehouse Robot Navigation'} · O(R·C)`,
          formula: {
            label: 'BFS wavefront',
            expression: `queue = ${queue?.items.length ?? 0}${minutes !== null ? ` · dist = ${minutes}` : ''}`,
            badge: mat && mat.activeRow !== null && mat.activeCol !== null ? `cell (${mat.activeRow}, ${mat.activeCol})` : undefined,
            badgeOk: true,
          },
          whyTitle: 'First arrival at (n-1, n-1) in unweighted BFS is guaranteed shortest.',
          whyBody: 'Marking visited cells 0 → 1 on enqueue prevents duplicate queue entries and bounds work to O(R·C).',
          resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'path length' } : undefined,
        };
      }

      return {
        headline: returnDisplay ? 'Island count complete' : 'Flood-fill connected land',
        subtitle: `${problem.scenario ?? 'Grid Cluster Discovery'} · O(R·C)`,
        formula: {
          label: 'islands',
          expression: `count = ${minutes ?? 0}${mat && mat.activeRow !== null && mat.activeCol !== null ? ` @ (${mat.activeRow},${mat.activeCol})` : ''}`,
          badgeOk: true,
        },
        whyTitle: 'Sink visited "1" cells to "0" during traversal.',
        whyBody: 'Every unvisited "1" starts one flood fill across its 4 neighbors, counting each connected component exactly once.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'total islands' } : undefined,
      };
    }

    case 'course-schedule': {
      const queue = structures.stacksQueues.find((sq) => sq.kind === 'queue');
      const visited = getScalarNum(structures, 'visited', 'count', 'taken');
      return {
        headline: returnDisplay ? 'Topological cycle check done' : 'Kahn topological BFS',
        subtitle: 'Drain 0-indegree prerequisites.',
        formula: {
          label: 'progress',
          expression: `completed = ${visited ?? 0} · ready queue = ${queue?.items.length ?? 0}`,
          badgeOk: true,
        },
        whyTitle: 'Only courses with all prerequisites satisfied enter the queue.',
        whyBody: 'If every course finishes (visited == numCourses), the dependency graph is a DAG with no cycle.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay } : undefined,
      };
    }

    case 'top-k-frequent': {
      const heap = structures.heaps[0];
      const freq = findMap(structures, 'counts', 'freq', 'count', 'mp', 'map');
      const k = getScalarNum(structures, 'k') ?? (Number(testCase?.args?.[1]) || null);
      return {
        headline: returnDisplay ? 'Top K items extracted' : heap && heap.items.length > 0 ? 'Maintain size-k min-heap' : 'Count item frequencies',
        subtitle: `${problem.scenario ?? 'Frequency + Heap Top-K'} · O(n log k)`,
        formula: {
          label: 'heap size',
          expression: `${heap?.items.length ?? 0}${k !== null ? ` / k=${k}` : ''}`,
          badge: freq ? `${freq.entries.length} distinct keys` : undefined,
          badgeOk: true,
        },
        whyTitle: 'Evicting the smallest frequency whenever heap size > k retains the top k.',
        whyBody: 'Bounding the min-heap to k entries keeps push/pop at O(log k) instead of sorting all unique keys.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'top k keys' } : undefined,
        mapAnnotation: {
          keyLabel: 'VALUE',
          valueLabel: 'FREQ',
          noteFormatter: defaultMapNote,
        },
      };
    }

    case 'k-closest-points': {
      const heap = structures.heaps[0];
      const k = getScalarNum(structures, 'k') ?? (Number(testCase?.args?.[1]) || null);
      const dist = getScalarNum(structures, 'dist', 'd');
      return {
        headline: returnDisplay ? 'K closest points ready' : 'Bound distance heap / order',
        subtitle: `${problem.scenario ?? 'Spatial Priority Queue'} · Squared distance`,
        formula: {
          label: 'x² + y²',
          expression: dist !== null ? `dist² = ${dist}` : `heap size = ${heap?.items.length ?? 0}${k ? ` / ${k}` : ''}`,
          badgeOk: true,
        },
        whyTitle: 'Squared Euclidean distance preserves ordering without sqrt overhead.',
        whyBody: 'Using a max-heap of size k (or min-heap) compares x² + y² directly in O(n log k) without floating-point rounding.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay } : undefined,
      };
    }

    case 'meeting-rooms-ii': {
      const heap = structures.heaps[0];
      const maxRooms = heap?.items.length ?? getScalarNum(structures, 'rooms', 'res', 'ans') ?? 0;
      return {
        headline: returnDisplay ? 'Minimum concurrency computed' : 'Track earliest finishing job in min-heap',
        subtitle: `${problem.scenario ?? 'Capacity & Overlapping Intervals'} · O(n log n)`,
        formula: {
          label: 'active rooms',
          expression: `${heap?.items.length ?? maxRooms}${heap?.items[0] ? ` · earliest free = ${heap.items[0].display}` : ''}`,
          badgeOk: true,
        },
        whyTitle: 'Reuse a room/server whenever the earliest end time ≤ next start time.',
        whyBody: 'If the heap top finishes before the new interval starts, pop and reuse that server; otherwise allocate one more.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'min rooms/servers' } : undefined,
      };
    }

    case 'merge-k-sorted-lists': {
      const heap = structures.heaps[0];
      return {
        headline: returnDisplay ? 'Merged k sorted lists' : 'Pop smallest head from min-heap',
        subtitle: `${problem.scenario ?? 'Multi-Way Log Merge'} · O(N log k)`,
        formula: {
          label: 'frontier heap',
          expression: `${heap?.items.length ?? 0} list heads queued`,
          badgeOk: true,
        },
        whyTitle: 'At most k nodes sit inside the min-heap at any moment.',
        whyBody: 'Popping the smallest node and pushing node.next merges all k lists in O(N log k) time.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay } : undefined,
      };
    }

    case 'climbing-stairs':
    case 'house-robber':
    case 'coin-change': {
      const isStairs = problem.id === 'climbing-stairs';
      const isRobber = problem.id === 'house-robber';
      const curAmt = getScalarNum(structures, 'a', 'i', 'step', 'amount');
      const dp = findArray(structures, 'dp');
      const prev1 = getScalarNum(structures, 'prev1', 'rob2', 'curr', 'b', 'one');
      const prev2 = getScalarNum(structures, 'prev2', 'rob1', 'prev', 'a', 'two');

      return {
        headline: returnDisplay ? 'Optimal DP answer' : 'Build bottom-up subproblems',
        subtitle: isStairs
          ? 'Fibonacci state transition dp[i] = dp[i-1] + dp[i-2].'
          : isRobber
            ? 'Exclude/Include recurrence dp[i] = max(dp[i-1], dp[i-2] + nums[i]).'
            : 'Unbounded knapsack min-coins recurrence.',
        formula:
          prev1 !== null && prev2 !== null && isStairs
            ? {
                label: 'recurrence',
                expression: `${prev2} + ${prev1} = ${prev2 + prev1}`,
                badgeOk: true,
              }
            : curAmt !== null && dp
              ? {
                  label: `dp[${curAmt}]`,
                  expression: `${dp.items[curAmt]?.display ?? '?'}`,
                  badgeOk: true,
                }
              : undefined,
        whyTitle: isRobber
          ? 'At house i: either skip (keep prev1) or rob (prev2 + nums[i]).'
          : isStairs
            ? 'Every step i is reached from step i-1 or i-2.'
            : 'dp[a] records minimum coins needed to form amount a.',
        whyBody: isRobber
          ? 'Two rolling variables preserve the adjacent constraint in O(1) auxiliary space.'
          : isStairs
            ? 'Reusing just two previous states computes dp[n] in O(n) time and O(1) space.'
            : 'Testing each coin ≤ a builds optimal answers monotonically from 0 up to amount.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay } : undefined,
      };
    }

    case 'longest-common-subsequence': {
      const dpMat = findMatrix(structures, 'dp');
      const r = getScalarNum(structures, 'i', 'r');
      const c = getScalarNum(structures, 'j', 'c');
      const cellVal = r !== null && c !== null ? dpMat?.rows[r]?.[c]?.display : undefined;
      return {
        headline: returnDisplay ? 'LCS table filled' : 'Compare characters in 2D DP grid',
        subtitle: 'Match adds +1 diagonally; mismatch takes max(top, left).',
        formula:
          r !== null && c !== null
            ? {
                label: `dp[${r}][${c}]`,
                expression: cellVal ?? 'evaluating',
                badgeOk: true,
              }
            : undefined,
        whyTitle: 'Prefix LCS of s1[0..i] and s2[0..j] depends only on shorter prefixes.',
        whyBody: 'Equal characters extend the diagonal LCS(i-1, j-1) + 1; unequal characters inherit the best without one character.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay, note: 'LCS length' } : undefined,
      };
    }

    default: {
      // Dynamic fallback for playgrounds & custom user algorithms
      const primaryScalarChanges = structures.scalars
        .filter((s) => s.changed)
        .slice(0, 3)
        .map((s) => `${s.name}=${s.display}`)
        .join(', ');
      const stdoutLast = step.stdout[step.stdout.length - 1];

      return {
        headline: returnDisplay
          ? 'Execution finished'
          : step.event === 'call'
            ? `Call ${step.funcName}()`
            : step.event === 'return'
              ? `Return from ${step.funcName}()`
              : `Step ${step.step} · Line ${step.line}`,
        subtitle: `${problem.category} · ${problem.timeComplexity}`,
        formula: primaryScalarChanges
          ? {
              label: 'updated',
              expression: primaryScalarChanges,
              badge: stdoutLast ? `stdout: ${stdoutLast.slice(0, 28)}` : undefined,
              badgeOk: true,
            }
          : stdoutLast
            ? { label: 'stdout', expression: stdoutLast.slice(0, 48), badgeOk: true }
            : undefined,
        whyTitle: primaryScalarChanges
          ? `Modified ${primaryScalarChanges} on line ${step.line}.`
          : `Executing ${step.funcName}() at line ${step.line}.`,
        whyBody: 'Live memory frames, arrays, maps, heaps, trees, and pointers synchronize automatically on every statement.',
        resultPreview: returnDisplay ? { label: 'return', value: returnDisplay } : undefined,
      };
    }
  }
}

export function extractReturnObjectPreview(
  val: SerializedValue | undefined,
  heap: Record<string, HeapObject>
): string | null {
  if (!val) return null;
  return formatSerializedValue(val, heap);
}
