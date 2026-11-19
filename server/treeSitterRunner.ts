import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Parser from 'web-tree-sitter';
import {
  WASM_MAP,
  executeMultiLanguageCore,
  type CompiledLang,
  type MultiLangPayload,
} from '../src/engine/treeSitterCore';
import type { ExecutionTrace, RunTestsResponse } from '../src/types/trace';

export type { CompiledLang, MultiLangPayload };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let initPromise: Promise<void> | null = null;
const parserCache = new Map<CompiledLang, Parser>();

async function getNodeParser(lang: CompiledLang): Promise<Parser> {
  const existing = parserCache.get(lang);
  if (existing) return existing;

  if (!initPromise) {
    initPromise = Parser.init();
  }
  await initPromise;

  const wasmPath = path.resolve(__dirname, '../node_modules/tree-sitter-wasms/out', WASM_MAP[lang]);
  const tsLang = await Parser.Language.load(wasmPath);
  const parser = new Parser();
  parser.setLanguage(tsLang);
  parserCache.set(lang, parser);
  return parser;
}

export async function executeMultiLanguage(
  payload: MultiLangPayload
): Promise<ExecutionTrace | RunTestsResponse> {
  return executeMultiLanguageCore(payload, getNodeParser);
}
