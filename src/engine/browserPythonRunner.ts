import type { ExecutionTrace, RunTestsResponse } from '../types/trace';
import type { PythonRunRequest } from './pythonClient';

const PYODIDE_BASE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/';

interface PyodideInstance {
  FS: {
    writeFile(path: string, data: string): void;
  };
  globals: {
    set(name: string, value: unknown): void;
  };
  runPythonAsync(code: string): Promise<unknown>;
}

let pyodideReadyPromise: Promise<PyodideInstance> | null = null;

async function getPyodideRuntime(): Promise<PyodideInstance> {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = (async () => {
      const [{ loadPyodide }, tracerModule] = await Promise.all([
        import(/* @vite-ignore */ `${PYODIDE_BASE_URL}pyodide.mjs`) as Promise<{
          loadPyodide: (opts: { indexURL: string }) => Promise<PyodideInstance>;
        }>,
        import('../../server/py_tracer.py?raw'),
      ]);
      const pyodide = await loadPyodide({ indexURL: PYODIDE_BASE_URL });
      pyodide.FS.writeFile('/home/pyodide/algolens_tracer.py', tracerModule.default);
      await pyodide.runPythonAsync(
        'import sys\nif "/home/pyodide" not in sys.path:\n    sys.path.insert(0, "/home/pyodide")\nimport json, algolens_tracer as _algolens_tracer\n'
      );
      return pyodide;
    })().catch((err) => {
      pyodideReadyPromise = null;
      throw err;
    });
  }
  return pyodideReadyPromise;
}

async function runInPyodide<T>(payload: PythonRunRequest): Promise<T> {
  const pyodide = await getPyodideRuntime();
  pyodide.globals.set('_algolens_payload_json', JSON.stringify(payload));
  const fnName = payload.mode === 'tests' ? 'run_tests_mode' : 'run_trace_mode';
  const resultJson = (await pyodide.runPythonAsync(
    `json.dumps(_algolens_tracer.${fnName}(json.loads(_algolens_payload_json)))`
  )) as string;
  return JSON.parse(resultJson) as T;
}

export async function runBrowserPythonTrace(
  req: Omit<PythonRunRequest, 'mode'>
): Promise<ExecutionTrace> {
  try {
    return await runInPyodide<ExecutionTrace>({ ...req, mode: 'trace' });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Browser Python execution failed.';
    return {
      steps: [],
      finalOutput: null,
      stdout: [],
      error: `${msg} (Pyodide WebAssembly runtime)`,
      runtimeMs: 0,
    };
  }
}

export async function runBrowserPythonTests(
  req: Omit<PythonRunRequest, 'mode'>
): Promise<RunTestsResponse> {
  try {
    return await runInPyodide<RunTestsResponse>({ ...req, mode: 'tests' });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Browser Python execution failed.';
    return {
      allPassed: false,
      passedCount: 0,
      totalCount: req.testCases.length,
      results: [],
      totalRuntimeMs: 0,
      error: `${msg} (Pyodide WebAssembly runtime)`,
    };
  }
}
