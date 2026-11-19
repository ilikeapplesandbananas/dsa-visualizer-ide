import type { ExecutionTrace, RunTestsResponse } from '../types/trace';
import type { ProblemParam, TestCase, ArgType, CompareMode, Language } from '../types/problem';
import type { JsTracePayload, JsTestsPayload } from './jsRunner';

export interface PythonRunRequest {
  mode: 'trace' | 'tests';
  code: string;
  entryFunction: string;
  params: ProblemParam[];
  returnType: ArgType | 'void';
  compareMode: CompareMode;
  isPlayground?: boolean;
  testCases: TestCase[];
  maxSteps?: number;
}

let backendAvailablePromise: Promise<boolean> | null = null;

/** Probes once whether the local Express API server is present; static hosts use WASM/Pyodide directly. */
async function hasBackendApi(): Promise<boolean> {
  if (typeof window === 'undefined') return true;
  if (window.location.hostname.endsWith('github.io')) return false;

  if (!backendAvailablePromise) {
    backendAvailablePromise = (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 900);
      try {
        const res = await fetch('/api/health', { signal: controller.signal });
        const ct = res.headers.get('content-type') || '';
        if (!res.ok || !ct.includes('application/json')) return false;
        const data = (await res.json()) as { ok?: boolean };
        return data.ok === true;
      } catch {
        return false;
      } finally {
        clearTimeout(timer);
      }
    })();
  }
  return backendAvailablePromise;
}

async function runPythonViaBackendOrBrowser<T>(
  mode: 'trace' | 'tests',
  req: Omit<PythonRunRequest, 'mode'>,
  browserFallback: (r: Omit<PythonRunRequest, 'mode'>) => Promise<T>
): Promise<T> {
  if (await hasBackendApi()) {
    try {
      const res = await fetch('/api/python/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...req, mode }),
      });
      const ct = res.headers.get('content-type') || '';
      if (res.ok && ct.includes('application/json')) {
        return (await res.json()) as T;
      }
    } catch {
      // Fall back to Pyodide in browser when API becomes unreachable
    }
  }
  return browserFallback(req);
}

export async function runPythonTrace(req: Omit<PythonRunRequest, 'mode'>): Promise<ExecutionTrace> {
  return runPythonViaBackendOrBrowser('trace', req, async (r) => {
    const { runBrowserPythonTrace } = await import('./browserPythonRunner');
    return runBrowserPythonTrace(r);
  });
}

export async function runPythonTests(req: Omit<PythonRunRequest, 'mode'>): Promise<RunTestsResponse> {
  return runPythonViaBackendOrBrowser('tests', req, async (r) => {
    const { runBrowserPythonTests } = await import('./browserPythonRunner');
    return runBrowserPythonTests(r);
  });
}

// Worker-backed non-blocking JS execution with timeout safeguard so infinite code outside loops can't freeze UI
let activeWorker: Worker | null = null;
let reqCounter = 0;

function getJsWorker(): Worker {
  if (!activeWorker) {
    activeWorker = new Worker(new URL('./jsWorker.ts', import.meta.url), { type: 'module' });
  }
  return activeWorker;
}

function resetJsWorker() {
  if (activeWorker) {
    activeWorker.terminate();
    activeWorker = null;
  }
}

export function runJsTraceInWorker(payload: JsTracePayload, timeoutMs = 4000): Promise<ExecutionTrace> {
  return new Promise((resolve) => {
    const worker = getJsWorker();
    const requestId = ++reqCounter;
    let done = false;

    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        resetJsWorker();
        resolve({
          steps: [],
          finalOutput: null,
          stdout: [],
          error: `JavaScript execution timed out after ${timeoutMs}ms (worker terminated safely).`,
          runtimeMs: timeoutMs,
        });
      }
    }, timeoutMs);

    const onMsg = (e: MessageEvent) => {
      if (e.data?.requestId !== requestId || done) return;
      done = true;
      clearTimeout(timer);
      worker.removeEventListener('message', onMsg);
      if (e.data.ok) resolve(e.data.result as ExecutionTrace);
      else {
        resolve({
          steps: [],
          finalOutput: null,
          stdout: [],
          error: e.data.error || 'Worker execution error',
          runtimeMs: 0,
        });
      }
    };

    worker.addEventListener('message', onMsg);
    worker.postMessage({ requestId, kind: 'trace', payload });
  });
}

export function runJsTestsInWorker(payload: JsTestsPayload, timeoutMs = 4000): Promise<RunTestsResponse> {
  return new Promise((resolve) => {
    const worker = getJsWorker();
    const requestId = ++reqCounter;
    let done = false;

    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        resetJsWorker();
        resolve({
          allPassed: false,
          passedCount: 0,
          totalCount: payload.testCases.length,
          results: [],
          totalRuntimeMs: timeoutMs,
          error: `JavaScript tests timed out after ${timeoutMs}ms (worker terminated safely).`,
        });
      }
    }, timeoutMs);

    const onMsg = (e: MessageEvent) => {
      if (e.data?.requestId !== requestId || done) return;
      done = true;
      clearTimeout(timer);
      worker.removeEventListener('message', onMsg);
      if (e.data.ok) resolve(e.data.result as RunTestsResponse);
      else {
        resolve({
          allPassed: false,
          passedCount: 0,
          totalCount: payload.testCases.length,
          results: [],
          totalRuntimeMs: 0,
          error: e.data.error || 'Worker test execution error',
        });
      }
    };

    worker.addEventListener('message', onMsg);
    worker.postMessage({ requestId, kind: 'tests', payload });
  });
}

async function runCompiledViaBackendOrBrowser<T>(
  language: 'java' | 'cpp' | 'c' | 'csharp',
  mode: 'trace' | 'tests',
  req: Omit<PythonRunRequest, 'mode'>,
  browserFallback: (
    lang: 'java' | 'cpp' | 'c' | 'csharp',
    r: Omit<PythonRunRequest, 'mode'>
  ) => Promise<T>
): Promise<T> {
  if (await hasBackendApi()) {
    try {
      const res = await fetch('/api/lang/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...req, language, mode }),
      });
      const ct = res.headers.get('content-type') || '';
      if (res.ok && ct.includes('application/json')) {
        return (await res.json()) as T;
      }
    } catch {
      // Fall back to in-browser tree-sitter WASM runner when no API server is present
    }
  }
  return browserFallback(language, req);
}

export async function runCompiledLangTrace(
  language: 'java' | 'cpp' | 'c' | 'csharp',
  req: Omit<PythonRunRequest, 'mode'>
): Promise<ExecutionTrace> {
  return runCompiledViaBackendOrBrowser(language, 'trace', req, async (lang, r) => {
    const { runBrowserCompiledTrace } = await import('./browserLangRunner');
    return runBrowserCompiledTrace(lang, r);
  });
}

export async function runCompiledLangTests(
  language: 'java' | 'cpp' | 'c' | 'csharp',
  req: Omit<PythonRunRequest, 'mode'>
): Promise<RunTestsResponse> {
  return runCompiledViaBackendOrBrowser(language, 'tests', req, async (lang, r) => {
    const { runBrowserCompiledTests } = await import('./browserLangRunner');
    return runBrowserCompiledTests(lang, r);
  });
}

export async function runUnifiedTrace(
  language: Language,
  params: {
    code: string;
    entryFunction: string;
    params: ProblemParam[];
    returnType: ArgType | 'void';
    isPlayground?: boolean;
    testCase: TestCase;
    compareMode: CompareMode;
  }
): Promise<ExecutionTrace> {
  if (language === 'javascript') {
    return runJsTraceInWorker({
      code: params.code,
      entryFunction: params.entryFunction,
      params: params.params,
      returnType: params.returnType,
      isPlayground: params.isPlayground,
      testCase: params.testCase,
    });
  }
  if (language === 'python') {
    return runPythonTrace({
      code: params.code,
      entryFunction: params.entryFunction,
      params: params.params,
      returnType: params.returnType,
      compareMode: params.compareMode,
      isPlayground: params.isPlayground,
      testCases: [params.testCase],
    });
  }
  return runCompiledLangTrace(language, {
    code: params.code,
    entryFunction: params.entryFunction,
    params: params.params,
    returnType: params.returnType,
    compareMode: params.compareMode,
    isPlayground: params.isPlayground,
    testCases: [params.testCase],
  });
}

export async function runUnifiedTests(
  language: Language,
  params: {
    code: string;
    entryFunction: string;
    params: ProblemParam[];
    returnType: ArgType | 'void';
    compareMode: CompareMode;
    isPlayground?: boolean;
    testCases: TestCase[];
  }
): Promise<RunTestsResponse> {
  if (language === 'javascript') {
    return runJsTestsInWorker(params);
  }
  if (language === 'python') {
    return runPythonTests(params);
  }
  return runCompiledLangTests(language, params);
}
