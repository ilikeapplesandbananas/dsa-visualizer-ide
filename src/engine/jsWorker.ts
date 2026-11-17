import { runJavaScriptTrace, runJavaScriptTests, type JsTracePayload, type JsTestsPayload } from './jsRunner';

type WorkerRequest =
  | { requestId: number; kind: 'trace'; payload: JsTracePayload }
  | { requestId: number; kind: 'tests'; payload: JsTestsPayload };

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const { requestId, kind, payload } = event.data;
  try {
    if (kind === 'trace') {
      const result = runJavaScriptTrace(payload);
      self.postMessage({ requestId, ok: true, result });
    } else {
      const result = runJavaScriptTests(payload);
      self.postMessage({ requestId, ok: true, result });
    }
  } catch (err) {
    self.postMessage({
      requestId,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
};

