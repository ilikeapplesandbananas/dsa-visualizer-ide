import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PY_TRACER_PATH = path.join(__dirname, 'py_tracer.py');

export interface PythonExecutionPayload {
  mode: 'trace' | 'tests';
  code: string;
  entryFunction: string;
  params: Array<{ name: string; type: string }>;
  returnType: string;
  compareMode?: string;
  isPlayground?: boolean;
  testCases: Array<{
    id: string;
    label: string;
    args: unknown[];
    expected: unknown;
    isHidden?: boolean;
  }>;
  maxSteps?: number;
}

export function executePython(payload: PythonExecutionPayload, timeoutMs = 4500): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    const child = spawn(pythonCmd, ['-I', PY_TRACER_PATH], {
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
    });

    let stdout = '';
    let stderr = '';
    let finished = false;

    const timer = setTimeout(() => {
      if (!finished) {
        finished = true;
        child.kill('SIGKILL');
        reject(new Error(`Python execution timed out after ${timeoutMs}ms (possible infinite loop or heavy computation).`));
      }
    }, timeoutMs);

    child.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString('utf8');
      if (stdout.length > 12 * 1024 * 1024) {
        if (!finished) {
          finished = true;
          clearTimeout(timer);
          child.kill('SIGKILL');
          reject(new Error('Trace output exceeded maximum memory limit (12MB).'));
        }
      }
    });

    child.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString('utf8');
    });

    child.on('error', (err) => {
      if (!finished) {
        finished = true;
        clearTimeout(timer);
        reject(new Error(`Failed to launch Python runtime: ${err.message}`));
      }
    });

    child.on('close', (code) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);

      if (!stdout.trim()) {
        reject(new Error(stderr.trim() || `Python exited with code ${code} and no output.`));
        return;
      }

      try {
        const parsed = JSON.parse(stdout);
        resolve(parsed);
      } catch {
        reject(new Error(`Invalid JSON from Python runner: ${stderr || stdout.slice(0, 300)}`));
      }
    });

    child.stdin.write(JSON.stringify(payload));
    child.stdin.end();
  });
}

