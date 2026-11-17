import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { executePython, type PythonExecutionPayload } from './pyRunner.ts';
import { executeMultiLanguage, type CompiledLang, type MultiLangPayload } from './treeSitterRunner.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    pythonSupported: true,
    languages: ['python', 'javascript', 'java', 'cpp', 'c', 'csharp'],
  });
});

app.post('/api/lang/execute', async (req, res) => {
  const body = req.body as MultiLangPayload;
  const supported: CompiledLang[] = ['java', 'cpp', 'c', 'csharp'];
  if (!body || !supported.includes(body.language) || typeof body.code !== 'string') {
    res.status(400).json({ error: 'Invalid language or missing code in request body.' });
    return;
  }

  try {
    const result = await executeMultiLanguage(body);
    res.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : `${body.language} execution failed`;
    if (body.mode === 'tests') {
      res.json({
        allPassed: false,
        passedCount: 0,
        totalCount: body.testCases?.length || 0,
        results: [],
        totalRuntimeMs: 0,
        error: msg,
      });
    } else {
      res.json({
        steps: [],
        finalOutput: null,
        stdout: [],
        error: msg,
        runtimeMs: 0,
      });
    }
  }
});

app.post('/api/python/execute', async (req, res) => {
  const body = req.body as PythonExecutionPayload;
  if (!body || typeof body.code !== 'string') {
    res.status(400).json({ error: 'Missing Python code in request body.' });
    return;
  }

  try {
    const result = await executePython(body, 5000);
    res.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Python execution failed';
    if (body.mode === 'tests') {
      res.json({
        allPassed: false,
        passedCount: 0,
        totalCount: body.testCases?.length || 0,
        results: [],
        totalRuntimeMs: 0,
        error: msg,
      });
    } else {
      res.json({
        steps: [],
        finalOutput: null,
        stdout: [],
        error: msg,
        runtimeMs: 0,
      });
    }
  }
});

const distDir = path.resolve(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir, { dotfiles: 'allow' }));
  app.use((_req, res) => {
    res.sendFile('index.html', { root: distDir, dotfiles: 'allow' });
  });
}

app.listen(PORT, () => {
  console.log(`AlgoLens API server listening on http://localhost:${PORT}`);
});

