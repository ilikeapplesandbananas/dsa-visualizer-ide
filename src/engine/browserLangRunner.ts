import {
  WASM_MAP,
  executeMultiLanguageCore,
  type CompiledLang,
  type MultiLangPayload,
  type Parser,
} from './treeSitterCore';
import type { ExecutionTrace, RunTestsResponse } from '../types/trace';

function wasmAssetUrl(fileName: string): string {
  const base = import.meta.env.BASE_URL || './';
  const resolvedBase = new URL(base, window.location.href).href;
  const normalizedBase = resolvedBase.endsWith('/') ? resolvedBase : `${resolvedBase}/`;
  return new URL(`wasm/${fileName}`, normalizedBase).href;
}

type ParserClass = typeof import('web-tree-sitter');

let parserCtorPromise: Promise<ParserClass> | null = null;
const browserParserCache = new Map<CompiledLang, Parser>();

async function getBrowserParserCtor(): Promise<ParserClass> {
  if (!parserCtorPromise) {
    parserCtorPromise = (async () => {
      const mod = await import('web-tree-sitter');
      const ParserCtor = ((mod as { default?: ParserClass }).default ?? mod) as ParserClass;
      await ParserCtor.init({
        locateFile(scriptName: string) {
          return wasmAssetUrl(scriptName);
        },
      });
      return ParserCtor;
    })();
  }
  return parserCtorPromise;
}

async function getBrowserParser(lang: CompiledLang): Promise<Parser> {
  const existing = browserParserCache.get(lang);
  if (existing) return existing;

  const ParserCtor = await getBrowserParserCtor();
  const tsLang = await ParserCtor.Language.load(wasmAssetUrl(WASM_MAP[lang]));
  const parser = new ParserCtor();
  parser.setLanguage(tsLang);
  browserParserCache.set(lang, parser);
  return parser;
}

export async function runBrowserCompiledTrace(
  language: CompiledLang,
  req: Omit<MultiLangPayload, 'language' | 'mode'>
): Promise<ExecutionTrace> {
  try {
    return (await executeMultiLanguageCore(
      { ...req, language, mode: 'trace' },
      getBrowserParser
    )) as ExecutionTrace;
  } catch (err) {
    const msg = err instanceof Error ? err.message : `${language} browser runtime failed`;
    return {
      steps: [],
      finalOutput: null,
      stdout: [],
      error: msg,
      runtimeMs: 0,
    };
  }
}

export async function runBrowserCompiledTests(
  language: CompiledLang,
  req: Omit<MultiLangPayload, 'language' | 'mode'>
): Promise<RunTestsResponse> {
  try {
    return (await executeMultiLanguageCore(
      { ...req, language, mode: 'tests' },
      getBrowserParser
    )) as RunTestsResponse;
  } catch (err) {
    const msg = err instanceof Error ? err.message : `${language} browser runtime failed`;
    return {
      allPassed: false,
      passedCount: 0,
      totalCount: req.testCases.length,
      results: [],
      totalRuntimeMs: 0,
      error: msg,
    };
  }
}
