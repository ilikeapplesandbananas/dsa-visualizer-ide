import sys
import json
import time
import io
import math
import inspect
import traceback
from collections import deque, defaultdict, Counter
import heapq
from typing import List, Optional, Dict, Set, Tuple, Any


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


class TraceLimitError(Exception):
    pass


def build_linked_list(values, cycle_pos=-1):
    if not values:
        return None
    nodes = [ListNode(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if cycle_pos is not None and 0 <= cycle_pos < len(nodes):
        nodes[-1].next = nodes[cycle_pos]
    return nodes[0]


def linked_list_to_list(head, limit=2000):
    res = []
    seen = set()
    curr = head
    while curr is not None and len(res) < limit:
        obj_id = id(curr)
        if obj_id in seen:
            break
        seen.add(obj_id)
        res.append(curr.val)
        curr = curr.next
    return res


def build_binary_tree(values):
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    q = deque([root])
    idx = 1
    while q and idx < len(values):
        node = q.popleft()
        if idx < len(values):
            left_val = values[idx]
            idx += 1
            if left_val is not None:
                node.left = TreeNode(left_val)
                q.append(node.left)
        if idx < len(values):
            right_val = values[idx]
            idx += 1
            if right_val is not None:
                node.right = TreeNode(right_val)
                q.append(node.right)
    return root


def binary_tree_to_list(root):
    if root is None:
        return []
    res = []
    q = deque([root])
    seen = set()
    while q and len(res) < 2000:
        node = q.popleft()
        if node is None:
            res.append(None)
        else:
            if id(node) in seen:
                res.append(node.val)
                continue
            seen.add(id(node))
            res.append(node.val)
            q.append(node.left)
            q.append(node.right)
    while res and res[-1] is None:
        res.pop()
    return res


def find_tree_node(root, target_val):
    if root is None:
        return None
    if root.val == target_val:
        return root
    return find_tree_node(root.left, target_val) or find_tree_node(root.right, target_val)


def convert_arg(val, arg_type):
    if arg_type == "linkedList":
        return build_linked_list(val)
    if arg_type == "linkedListArray":
        return [build_linked_list(sub) for sub in (val or [])]
    if arg_type == "linkedListCycle":
        if isinstance(val, dict):
            return build_linked_list(val.get("values", []), val.get("pos", -1))
        return build_linked_list(val)
    if arg_type == "binaryTree":
        return build_binary_tree(val)
    if isinstance(val, list):
        return json.loads(json.dumps(val))
    if isinstance(val, dict):
        return json.loads(json.dumps(val))
    return val


def convert_args(raw_args, params):
    out = []
    first_tree = None
    for i, raw in enumerate(raw_args):
        ptype = params[i]["type"] if i < len(params) else "any"
        if ptype == "treeNodeRef":
            out.append(find_tree_node(first_tree, raw) if first_tree is not None else TreeNode(raw))
        else:
            conv = convert_arg(raw, ptype)
            if ptype == "binaryTree" and first_tree is None:
                first_tree = conv
            out.append(conv)
    return out


def to_json_output(val, return_type):
    if return_type in ("linkedList", "linkedListCycle"):
        return linked_list_to_list(val)
    if return_type == "binaryTree":
        return binary_tree_to_list(val)
    if return_type in ("treeNodeVal", "treeNodeRef"):
        return sanitize_json(val.val) if isinstance(val, TreeNode) else sanitize_json(val)
    return sanitize_json(val)


def sanitize_json(val, seen=None):
    if seen is None:
        seen = set()
    if val is None or isinstance(val, (bool, int, str)):
        return val
    if isinstance(val, float):
        if math.isnan(val):
            return "NaN"
        if math.isinf(val):
            return "Infinity" if val > 0 else "-Infinity"
        return val
    if isinstance(val, (list, tuple, deque)):
        obj_id = id(val)
        if obj_id in seen:
            return "[Circular]"
        seen.add(obj_id)
        return [sanitize_json(x, seen) for x in val]
    if isinstance(val, set):
        return sorted([sanitize_json(x, seen) for x in val], key=lambda x: str(x))
    if isinstance(val, dict):
        obj_id = id(val)
        if obj_id in seen:
            return {"_circular": True}
        seen.add(obj_id)
        return {str(k): sanitize_json(v, seen) for k, v in val.items()}
    if isinstance(val, ListNode):
        return linked_list_to_list(val)
    if isinstance(val, TreeNode):
        return binary_tree_to_list(val)
    return repr(val)


def compare_outputs(actual, expected, mode):
    if mode == "playground":
        return True
    if mode == "float":
        try:
            return abs(float(actual) - float(expected)) <= 1e-5
        except Exception:
            return False
    if mode == "unorderedArray":
        if not isinstance(actual, list) or not isinstance(expected, list):
            return False
        if len(actual) != len(expected):
            return False
        return sorted(actual, key=lambda x: json.dumps(x, sort_keys=True)) == sorted(
            expected, key=lambda x: json.dumps(x, sort_keys=True)
        )
    if mode == "unorderedOuterArray":
        if not isinstance(actual, list) or not isinstance(expected, list):
            return False
        if len(actual) != len(expected):
            return False
        return sorted(actual, key=lambda x: json.dumps(x, sort_keys=True)) == sorted(
            expected, key=lambda x: json.dumps(x, sort_keys=True)
        )
    if mode == "unorderedNestedArray":
        if not isinstance(actual, list) or not isinstance(expected, list):
            return False
        if len(actual) != len(expected):
            return False
        norm_a = sorted(
            [sorted(sub, key=lambda x: json.dumps(x, sort_keys=True)) if isinstance(sub, list) else sub for sub in actual],
            key=lambda x: json.dumps(x, sort_keys=True),
        )
        norm_e = sorted(
            [sorted(sub, key=lambda x: json.dumps(x, sort_keys=True)) if isinstance(sub, list) else sub for sub in expected],
            key=lambda x: json.dumps(x, sort_keys=True),
        )
        return norm_a == norm_e
    return actual == expected


def format_display(val):
    try:
        return json.dumps(val)
    except Exception:
        return repr(val)


class HeapSerializer:
    def __init__(self):
        self.id_map = {}
        self.keepalive = []
        self.counter = 0

    def get_id(self, obj):
        oid = id(obj)
        if oid not in self.id_map:
            self.counter += 1
            self.id_map[oid] = f"h{self.counter}"
            self.keepalive.append(obj)
        return self.id_map[oid]

    def serialize_step(self, frames):
        heap = {}
        serialized_frames = []

        def ser(val, depth=0):
            if val is None:
                return {"kind": "primitive", "type": "null", "value": None}
            if isinstance(val, bool):
                return {"kind": "primitive", "type": "boolean", "value": val}
            if isinstance(val, int):
                return {"kind": "primitive", "type": "number", "value": val}
            if isinstance(val, float):
                if math.isnan(val):
                    return {"kind": "primitive", "type": "string", "value": "NaN"}
                if math.isinf(val):
                    return {
                        "kind": "primitive",
                        "type": "string",
                        "value": "Infinity" if val > 0 else "-Infinity",
                    }
                return {"kind": "primitive", "type": "number", "value": val}
            if isinstance(val, str):
                return {"kind": "primitive", "type": "string", "value": val}

            if depth > 40 or len(heap) > 400:
                return {"kind": "primitive", "type": "string", "value": repr(val)[:80]}

            if isinstance(val, (list, tuple, deque, set, dict)) or hasattr(val, "__dict__"):
                hid = self.get_id(val)
                if hid in heap:
                    return {"kind": "ref", "id": hid}

                if isinstance(val, (list, tuple, deque)):
                    entry = {
                        "id": hid,
                        "kind": "array",
                        "items": [],
                        "className": type(val).__name__ if not isinstance(val, list) else None,
                    }
                    heap[hid] = entry
                    entry["items"] = [ser(x, depth + 1) for x in list(val)[:250]]
                    return {"kind": "ref", "id": hid}

                if isinstance(val, set):
                    entry = {
                        "id": hid,
                        "kind": "set",
                        "items": [],
                    }
                    heap[hid] = entry
                    ordered = sorted(list(val), key=lambda x: str(x))[:200]
                    entry["items"] = [ser(x, depth + 1) for x in ordered]
                    return {"kind": "ref", "id": hid}

                if isinstance(val, dict):
                    entry = {
                        "id": hid,
                        "kind": "map",
                        "entries": [],
                        "className": type(val).__name__ if type(val) is not dict else None,
                    }
                    heap[hid] = entry
                    items = []
                    for k, v in list(val.items())[:200]:
                        items.append({"key": str(k), "value": ser(v, depth + 1)})
                    entry["entries"] = items
                    return {"kind": "ref", "id": hid}

                if hasattr(val, "__dict__"):
                    cls_name = type(val).__name__
                    entry = {
                        "id": hid,
                        "kind": "object",
                        "className": cls_name,
                        "fields": {},
                    }
                    heap[hid] = entry
                    fields = {}
                    for k, v in list(vars(val).items())[:50]:
                        if not str(k).startswith("_") and not inspect.isroutine(v):
                            fields[str(k)] = ser(v, depth + 1)
                    entry["fields"] = fields
                    return {"kind": "ref", "id": hid}

            return {"kind": "primitive", "type": "string", "value": repr(val)[:100]}

        for f in frames:
            locals_ser = {}
            for k, v in f["locals"].items():
                if should_skip_var(k, v):
                    continue
                locals_ser[k] = ser(v)
            serialized_frames.append(
                {
                    "id": f["id"],
                    "callId": f["callId"],
                    "parentCallId": f["parentCallId"],
                    "funcName": f["funcName"],
                    "line": f["line"],
                    "locals": locals_ser,
                }
            )
        return serialized_frames, heap, ser


def should_skip_var(name, val):
    if name.startswith("__") or name in ("self", "cls"):
        return True
    if name in (
        "ListNode",
        "TreeNode",
        "Node",
        "deque",
        "defaultdict",
        "Counter",
        "heapq",
        "math",
        "List",
        "Optional",
        "Dict",
        "Set",
        "Tuple",
        "Any",
        "Solution",
    ):
        return True
    if inspect.isfunction(val) or inspect.isclass(val) or inspect.ismodule(val) or inspect.ismethod(val):
        return True
    if callable(val) and type(val).__name__ in ("builtin_function_or_method", "function", "type"):
        return True
    return False


def create_user_namespace():
    return {
        "__name__": "__main__",
        "ListNode": ListNode,
        "TreeNode": TreeNode,
        "Node": Node,
        "deque": deque,
        "defaultdict": defaultdict,
        "Counter": Counter,
        "heapq": heapq,
        "math": math,
        "List": List,
        "Optional": Optional,
        "Dict": Dict,
        "Set": Set,
        "Tuple": Tuple,
        "Any": Any,
    }


def resolve_entry_callable(ns, entry_name):
    def to_snake(s):
        out = []
        for ch in s:
            if ch.isupper():
                out.append("_" + ch.lower())
            else:
                out.append(ch)
        return "".join(out).lstrip("_")

    candidates = [entry_name, to_snake(entry_name)]

    if "Solution" in ns and inspect.isclass(ns["Solution"]):
        sol = ns["Solution"]()
        for c in candidates:
            if hasattr(sol, c) and callable(getattr(sol, c)):
                return getattr(sol, c)

    for c in candidates:
        if c in ns and callable(ns[c]):
            return ns[c]

    # Fallback: first user-defined function not starting with _
    for k, v in ns.items():
        if k not in create_user_namespace() and inspect.isfunction(v) and not k.startswith("_"):
            return v
    return None


class StdoutCapture:
    def __init__(self):
        self.lines = []
        self._buf = ""

    def write(self, s):
        self._buf += s
        while "\n" in self._buf:
            line, self._buf = self._buf.split("\n", 1)
            self.lines.append(line)

    def flush(self):
        if self._buf:
            self.lines.append(self._buf)
            self._buf = ""

    def snapshot(self):
        out = list(self.lines)
        if self._buf:
            out.append(self._buf)
        return out[-100:]


def run_trace_mode(payload):
    code = payload["code"]
    entry_function = payload.get("entryFunction", "")
    params = payload.get("params", [])
    return_type = payload.get("returnType", "any")
    is_playground = payload.get("isPlayground", False)
    test_cases = payload.get("testCases", [])
    max_steps = int(payload.get("maxSteps", 1000))

    start_time = time.perf_counter()
    compiled = compile(code, "<user_code>", "exec")
    ns = create_user_namespace()

    stdout_cap = StdoutCapture()
    old_stdout = sys.stdout
    sys.stdout = stdout_cap

    serializer = HeapSerializer()
    steps = []
    truncated = False
    error_msg = None
    error_line = None
    final_output = None

    call_counter = 0
    frame_stack = []
    frame_meta = {}
    prev_locals_ser = {}
    skip_code_names = {"<listcomp>", "<dictcomp>", "<setcomp>", "<genexpr>", "<lambda>"}

    def collect_active_frames(current_frame):
        active = []
        f = current_frame
        chain = []
        while f is not None:
            if (
                f.f_code.co_filename == "<user_code>"
                and f.f_code.co_name not in skip_code_names
                and not (is_playground is False and f.f_code.co_name == "<module>")
            ):
                chain.append(f)
            f = f.f_back
        chain.reverse()
        for cf in chain:
            fid = id(cf)
            meta = frame_meta.get(fid)
            if meta is None:
                continue
            active.append(
                {
                    "id": f"f{meta['callId']}",
                    "callId": meta["callId"],
                    "parentCallId": meta["parentCallId"],
                    "funcName": meta["funcName"],
                    "line": cf.f_lineno,
                    "locals": dict(cf.f_locals),
                }
            )
        return active

    def record_step(frame, event_name, return_val=None, err_text=None):
        nonlocal truncated
        if len(steps) >= max_steps:
            truncated = True
            raise TraceLimitError(
                f"Trace limit reached ({max_steps} steps). Your code may have an infinite loop or very large input."
            )

        active = collect_active_frames(frame)
        if not active:
            return

        ser_frames, heap, ser_fn = serializer.serialize_step(active)
        top_frame = ser_frames[-1]
        cur_locals = top_frame["locals"]
        prev_locals = prev_locals_ser.get(top_frame["callId"], {})
        changed = []
        for k, v in cur_locals.items():
            if k not in prev_locals or prev_locals[k] != v:
                changed.append(k)
        prev_locals_ser[top_frame["callId"]] = cur_locals

        step_obj = {
            "step": len(steps),
            "line": frame.f_lineno,
            "event": event_name,
            "funcName": top_frame["funcName"],
            "callId": top_frame["callId"],
            "parentCallId": top_frame["parentCallId"],
            "callStack": ser_frames,
            "heap": heap,
            "stdout": stdout_cap.snapshot(),
            "changedVars": changed,
        }
        if event_name == "return":
            step_obj["returnValue"] = ser_fn(return_val)
        if err_text:
            step_obj["error"] = err_text
        steps.append(step_obj)

    def trace_fn(frame, event, arg):
        nonlocal call_counter
        if frame.f_code.co_filename != "<user_code>":
            return None
        if frame.f_code.co_name in skip_code_names:
            return None
        if not is_playground and frame.f_code.co_name == "<module>":
            return None

        if event == "call":
            call_counter += 1
            parent_cid = frame_stack[-1] if frame_stack else None
            fname = "main" if frame.f_code.co_name == "<module>" else frame.f_code.co_name
            frame_meta[id(frame)] = {
                "callId": call_counter,
                "parentCallId": parent_cid,
                "funcName": fname,
            }
            frame_stack.append(call_counter)
            record_step(frame, "call")
            return trace_fn

        if event == "line":
            record_step(frame, "step")
            return trace_fn

        if event == "return":
            record_step(frame, "return", return_val=arg)
            if frame_stack:
                frame_stack.pop()
            frame_meta.pop(id(frame), None)
            return None

        if event == "exception":
            exc_type, exc_val, _ = arg
            if exc_type is not TraceLimitError:
                record_step(frame, "exception", err_text=f"{exc_type.__name__}: {exc_val}")
            return trace_fn

        return trace_fn

    prev_rec_limit = sys.getrecursionlimit()
    sys.setrecursionlimit(300)

    try:
        if is_playground:
            sys.settrace(trace_fn)
            exec(compiled, ns)
            sys.settrace(None)
        else:
            # Define classes/functions first WITHOUT tracing definition lines
            exec(compiled, ns)
            entry_fn = resolve_entry_callable(ns, entry_function)
            if entry_fn is None:
                raise NameError(
                    f"Could not find function '{entry_function}' or Solution.{entry_function} in your Python code."
                )
            tc = test_cases[0] if test_cases else {"args": []}
            raw_args = tc.get("args", [])
            py_args = convert_args(raw_args, params)
            sys.settrace(trace_fn)
            raw_res = entry_fn(*py_args)
            sys.settrace(None)

            # Handle in-place void algorithms (e.g., if function modifies first argument and returns None)
            if return_type == "void" and raw_res is None and len(py_args) > 0:
                final_output = to_json_output(py_args[0], params[0]["type"])
            else:
                final_output = to_json_output(raw_res, return_type)
    except TraceLimitError as e:
        sys.settrace(None)
        error_msg = str(e)
    except SyntaxError as e:
        sys.settrace(None)
        error_msg = f"SyntaxError: {e.msg}"
        error_line = e.lineno
    except Exception as e:
        sys.settrace(None)
        tb = traceback.extract_tb(e.__traceback__)
        for frame_tb in reversed(tb):
            if frame_tb.filename == "<user_code>":
                error_line = frame_tb.lineno
                break
        error_msg = f"{type(e).__name__}: {e}"
    finally:
        sys.settrace(None)
        sys.setrecursionlimit(prev_rec_limit)
        sys.stdout = old_stdout
        stdout_cap.flush()

    runtime_ms = round((time.perf_counter() - start_time) * 1000, 2)
    return {
        "steps": steps,
        "finalOutput": final_output,
        "stdout": stdout_cap.snapshot(),
        "error": error_msg,
        "errorLine": error_line,
        "truncated": truncated,
        "runtimeMs": runtime_ms,
    }


def run_tests_mode(payload):
    code = payload["code"]
    entry_function = payload.get("entryFunction", "")
    params = payload.get("params", [])
    return_type = payload.get("returnType", "any")
    compare_mode = payload.get("compareMode", "exact")
    is_playground = payload.get("isPlayground", False)
    test_cases = payload.get("testCases", [])

    total_start = time.perf_counter()
    try:
        compiled = compile(code, "<user_code>", "exec")
    except SyntaxError as e:
        return {
            "allPassed": False,
            "passedCount": 0,
            "totalCount": len(test_cases),
            "results": [],
            "totalRuntimeMs": 0,
            "error": f"SyntaxError at line {e.lineno}: {e.msg}",
        }

    if is_playground:
        stdout_cap = StdoutCapture()
        old_stdout = sys.stdout
        sys.stdout = stdout_cap
        err = None
        err_line = None
        ns = create_user_namespace()
        ops = 0

        def guard_trace(frame, event, arg):
            nonlocal ops
            if frame.f_code.co_filename == "<user_code>" and event in ("line", "call"):
                ops += 1
                if ops > 80000:
                    raise TraceLimitError("Operation limit exceeded (possible infinite loop).")
                return guard_trace
            return None

        prev_rec_limit = sys.getrecursionlimit()
        try:
            sys.setrecursionlimit(300)
            sys.settrace(guard_trace)
            exec(compiled, ns)
        except Exception as e:
            tb = traceback.extract_tb(e.__traceback__)
            for ftb in reversed(tb):
                if ftb.filename == "<user_code>":
                    err_line = ftb.lineno
                    break
            err = f"{type(e).__name__}: {e}"
        finally:
            sys.settrace(None)
            sys.setrecursionlimit(prev_rec_limit)
            sys.stdout = old_stdout
            stdout_cap.flush()

        rt = round((time.perf_counter() - total_start) * 1000, 2)
        return {
            "allPassed": err is None,
            "passedCount": 1 if err is None else 0,
            "totalCount": 1,
            "results": [
                {
                    "testCaseId": "playground",
                    "label": "Playground Execution",
                    "passed": err is None,
                    "inputDisplay": "(custom script)",
                    "expectedDisplay": "No runtime errors",
                    "actualDisplay": "Completed" if err is None else err,
                    "stdout": stdout_cap.snapshot(),
                    "runtimeMs": rt,
                    "error": err,
                    "errorLine": err_line,
                }
            ],
            "totalRuntimeMs": rt,
            "error": err,
        }

    results = []
    passed_count = 0

    for tc in test_cases:
        tc_start = time.perf_counter()
        stdout_cap = StdoutCapture()
        old_stdout = sys.stdout
        sys.stdout = stdout_cap
        ns = create_user_namespace()
        err = None
        err_line = None
        actual_json = None
        passed = False

        ops = 0

        def guard_trace(frame, event, arg):
            nonlocal ops
            if frame.f_code.co_filename == "<user_code>" and event in ("line", "call"):
                ops += 1
                if ops > 80000:
                    raise TraceLimitError("Time Limit Exceeded (possible infinite loop).")
                return guard_trace
            return None

        prev_rec_limit = sys.getrecursionlimit()
        try:
            sys.setrecursionlimit(300)
            exec(compiled, ns)
            entry_fn = resolve_entry_callable(ns, entry_function)
            if entry_fn is None:
                raise NameError(
                    f"Could not find function '{entry_function}' or Solution.{entry_function}."
                )
            raw_args = tc.get("args", [])
            py_args = convert_args(raw_args, params)
            sys.settrace(guard_trace)
            raw_res = entry_fn(*py_args)
            sys.settrace(None)

            if return_type == "void" and raw_res is None and len(py_args) > 0:
                actual_json = to_json_output(py_args[0], params[0]["type"])
            else:
                actual_json = to_json_output(raw_res, return_type)

            expected = tc.get("expected")
            passed = compare_outputs(actual_json, expected, compare_mode)
            if passed:
                passed_count += 1
        except Exception as e:
            sys.settrace(None)
            tb = traceback.extract_tb(e.__traceback__)
            for ftb in reversed(tb):
                if ftb.filename == "<user_code>":
                    err_line = ftb.lineno
                    break
            err = f"{type(e).__name__}: {e}"
        finally:
            sys.settrace(None)
            sys.setrecursionlimit(prev_rec_limit)
            sys.stdout = old_stdout
            stdout_cap.flush()

        rt = round((time.perf_counter() - tc_start) * 1000, 2)
        input_parts = []
        raw_args = tc.get("args", [])
        for i, arg_val in enumerate(raw_args):
            pname = params[i]["name"] if i < len(params) else f"arg{i}"
            input_parts.append(f"{pname} = {format_display(arg_val)}")

        results.append(
            {
                "testCaseId": tc.get("id", ""),
                "label": tc.get("label", "Case"),
                "passed": passed,
                "isHidden": bool(tc.get("isHidden", False)),
                "inputDisplay": ", ".join(input_parts),
                "expectedDisplay": format_display(tc.get("expected")),
                "actualDisplay": err if err else format_display(actual_json),
                "stdout": stdout_cap.snapshot(),
                "runtimeMs": rt,
                "error": err,
                "errorLine": err_line,
            }
        )

    total_rt = round((time.perf_counter() - total_start) * 1000, 2)
    return {
        "allPassed": passed_count == len(test_cases) and len(test_cases) > 0,
        "passedCount": passed_count,
        "totalCount": len(test_cases),
        "results": results,
        "totalRuntimeMs": total_rt,
    }


def main():
    raw = sys.stdin.read()
    try:
        payload = json.loads(raw)
        mode = payload.get("mode", "trace")
        if mode == "tests":
            out = run_tests_mode(payload)
        else:
            out = run_trace_mode(payload)
        sys.stdout.write(json.dumps(out))
    except Exception as e:
        sys.stdout.write(
            json.dumps(
                {
                    "error": f"Internal runner error: {type(e).__name__}: {e}",
                    "steps": [],
                    "stdout": [],
                    "runtimeMs": 0,
                }
            )
        )


if __name__ == "__main__":
    main()
