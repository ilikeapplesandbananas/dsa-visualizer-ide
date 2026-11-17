import type { Problem } from '../types/problem';
import { PROBLEMS_PART_1 } from './problemsPart1';
import { PROBLEMS_PART_2 } from './problemsPart2';
import { PROBLEMS_PART_3 } from './problemsPart3';
import { PROBLEMS_PART_4 } from './problemsPart4';

export const PROBLEMS: Problem[] = [
  ...PROBLEMS_PART_1,
  ...PROBLEMS_PART_2,
  ...PROBLEMS_PART_3,
  ...PROBLEMS_PART_4,
];

export function getProblemById(id: string): Problem | undefined {
  return PROBLEMS.find((p) => p.id === id);
}
