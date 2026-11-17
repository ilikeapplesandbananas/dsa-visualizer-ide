import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Parser from 'web-tree-sitter';
import {
  ListNode,
  TreeNode,
  GraphNode,
  convertArgs,
  toJsonOutput,
  compareOutputs,
  formatDisplay,
} from '../src/engine/dataConverters';
import type { ProblemParam, TestCase, ArgType, CompareMode } from '../src/types/problem';
import type { ExecutionTrace, RunTestsResponse, SerializedValue, TestCaseResult, TraceStep } from '../src/types/trace';
import {
  AlgoDeque,
  AlgoMap,
  AlgoPair,
  AlgoSet,
  AlgoStringBuilder,
  LangHeapSerializer,
  RefBox,
  TraceLimitError,
  buildLanguageGlobals,
  type ActiveRuntimeFrame,
  type ContainerDialect,
} from './langRuntime';

export type CompiledLang = 'java' | 'cpp' | 'c' | 'csharp';

export interface MultiLangPayload {
  language: CompiledLang;
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WASM_MAP: Record<CompiledLang, string> = {
  java: 'tree-sitter-java.wasm',
  cpp: 'tree-sitter-cpp.wasm',
  c: 'tree-sitter-c.wasm',
  csharp: 'tree-sitter-c_sharp.wasm',
};

let initPromise: Promise<void> | null = null;
const parserCache = new Map<CompiledLang, Parser>();

async function getParser(lang: CompiledLang): Promise<Parser> {
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

function findFirstSyntaxError(node: Parser.SyntaxNode): { line: number; col: number; message: string } | null {
  if (node.type === 'ERROR' || node.isMissing()) {
    const line = node.startPosition.row + 1;
    const col = node.startPosition.column + 1;
    const snippet = node.text.trim().slice(0, 40);
    return {
      line,
      col,
      message: node.isMissing()
        ? `SyntaxError on line ${line}, col ${col}: missing ${node.type}`
        : `SyntaxError on line ${line}, col ${col}: unexpected token '${snippet}'`,
    };
  }
  if (node.hasError()) {
    for (let i = 0; i < node.childCount; i++) {
      const child = node.child(i);
      if (child && (child.hasError() || child.type === 'ERROR' || child.isMissing())) {
        const err = findFirstSyntaxError(child);
        if (err) return err;
      }
    }
  }
  return null;
}

type VarKind = 'int' | 'float' | 'string' | 'bool' | 'container' | 'other';

interface CParamMeta {
  name: string;
  isPointer: boolean;
  typeText: string;
}

interface LowerResult {
  jsCode: string;
  methodNames: string[];
  classNames: string[];
  topLevelFuncs: string[];
  cParamSig: CParamMeta[] | null;
  entryCandidates: string[];
  solutionFieldNames: string[];
}

function classifyTypeText(typeText: string): VarKind {
  const t = typeText.toLowerCase();
  if (/\b(double|float|decimal)\b/.test(t)) return 'float';
  if (/\b(string|str)\b/.test(t)) return 'string';
  if (/\bbool(ean)?\b/.test(t)) return 'bool';
  if (/\b(int|long|short|byte|size_t|uint|char)\b/.test(t) && !/\[|\*|vector|list/.test(t)) {
    return 'int';
  }
  if (/map|set|queue|stack|deque|priority|dict|list|vector/.test(t)) return 'container';
  return 'other';
}

function detectPriorityQueueComparatorKind(typeText: string, args: Parser.SyntaxNode[]): {
  kind: 'min' | 'max';
  isCppCustom: boolean;
} {
  if (/greater\s*</.test(typeText)) return { kind: 'min', isCppCustom: false };
  if (/less\s*</.test(typeText)) return { kind: 'max', isCppCustom: false };
  if (args.length >= 1) {
    return { kind: 'min', isCppCustom: true };
  }
  return { kind: 'min', isCppCustom: false };
}

class AstLowerer {
  private lang: CompiledLang;
  private scopes: Array<Map<string, VarKind>> = [new Map()];
  private classFields = new Set<string>();
  private helperMethodNames = new Set<string>();
  private tmpCounter = 0;
  private traceSteps: boolean;
  private cParamSig: CParamMeta[] | null = null;
  private classNames: string[] = [];
  private topLevelFuncs: string[] = [];
  private entryCandidates: string[] = [];

  constructor(lang: CompiledLang, traceSteps: boolean) {
    this.lang = lang;
    this.traceSteps = traceSteps;
  }

  private tmp(prefix = '_t'): string {
    this.tmpCounter += 1;
    return `${prefix}${this.tmpCounter}`;
  }

  private pushScope(initial?: Array<[string, VarKind]>) {
    const m = new Map<string, VarKind>();
    if (initial) {
      for (const [k, v] of initial) m.set(k, v);
    }
    this.scopes.push(m);
  }

  private popScope() {
    if (this.scopes.length > 1) this.scopes.pop();
  }

  private declareVar(name: string, kind: VarKind = 'other') {
    if (!name || name === 'this' || name === 'self') return;
    this.scopes[this.scopes.length - 1].set(name, kind);
  }

  private lookupVarKind(name: string): VarKind | undefined {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (this.scopes[i].has(name)) return this.scopes[i].get(name);
    }
    return undefined;
  }

  private visibleVars(): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    // Skip global file scope (index 0) and iterate function/block scopes
    for (let i = 1; i < this.scopes.length; i++) {
      for (const k of this.scopes[i].keys()) {
        if (!seen.has(k) && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k)) {
          seen.add(k);
          out.push(k);
        }
      }
    }
    return out;
  }

  private snapExpr(): string {
    const vars = this.visibleVars();
    const fieldProps = Array.from(this.classFields).map(
      (f) => `${f}: (typeof __thisRef !== 'undefined' && __thisRef ? __thisRef.${f} : undefined)`
    );
    const localProps = vars.map((v) => `${v}: ${v}`);
    const all = [...fieldProps, ...localProps];
    return `() => ({ ${all.join(', ')} })`;
  }

  private stepCall(line: number): string {
    if (!this.traceSteps) return '';
    return `__step(${line}, ${this.snapExpr()}); `;
  }

  private isFloatExpr(node: Parser.SyntaxNode | null | undefined): boolean {
    if (!node) return false;
    const t = node.type;
    if (t === 'float_literal' || t === 'real_literal') return true;
    if (t === 'number_literal' || t === 'decimal_floating_point_literal') {
      return node.text.includes('.') || /f$/i.test(node.text);
    }
    if (t === 'identifier') {
      return this.lookupVarKind(node.text) === 'float';
    }
    if (t === 'cast_expression') {
      const typeNode = node.childForFieldName('type');
      return Boolean(typeNode && /double|float/.test(typeNode.text));
    }
    if (t === 'binary_expression') {
      return (
        this.isFloatExpr(node.childForFieldName('left')) ||
        this.isFloatExpr(node.childForFieldName('right'))
      );
    }
    if (t === 'parenthesized_expression') {
      return this.isFloatExpr(node.namedChild(0));
    }
    return false;
  }

  lowerProgram(root: Parser.SyntaxNode, entryFunction: string): LowerResult {
    const bodyOut: string[] = [];
    const visitTop = (node: Parser.SyntaxNode) => {
      for (let i = 0; i < node.namedChildCount; i++) {
        const ch = node.namedChild(i);
        if (!ch) continue;
        const t = ch.type;
        if (
          t === 'import_declaration' ||
          t === 'package_declaration' ||
          t === 'preproc_include' ||
          t === 'using_declaration' ||
          t === 'using_directive' ||
          t === 'type_definition' ||
          t === 'alias_declaration' ||
          t === 'comment' ||
          t === 'line_comment' ||
          t === 'block_comment'
        ) {
          continue;
        }
        if (t === 'namespace_declaration' || t === 'file_scoped_namespace_declaration') {
          const b = ch.childForFieldName('body');
          if (b) visitTop(b);
          else visitTop(ch);
          continue;
        }
        if (t === 'class_declaration' || t === 'class_specifier' || t === 'struct_specifier') {
          const code = this.lowerClass(ch, entryFunction);
          if (code) bodyOut.push(code);
          continue;
        }
        if (t === 'function_definition' || t === 'method_declaration') {
          const fnCode = this.lowerTopFunction(ch, entryFunction);
          if (fnCode) bodyOut.push(fnCode);
          continue;
        }
        if (t === 'declaration') {
          bodyOut.push(this.lowerDeclaration(ch, false));
          continue;
        }
      }
    };

    visitTop(root);

    const exportsLines = [
      ...this.classNames.map((c) => `${JSON.stringify(c)}: (typeof ${c} !== 'undefined' ? ${c} : undefined)`),
      ...this.topLevelFuncs.map((f) => `${JSON.stringify(f)}: (typeof ${f} !== 'undefined' ? ${f} : undefined)`),
    ];

    const jsCode = `${bodyOut.join('\n')}\n;return { ${exportsLines.join(', ')} };`;
    return {
      jsCode,
      methodNames: Array.from(this.helperMethodNames),
      classNames: this.classNames,
      topLevelFuncs: this.topLevelFuncs,
      cParamSig: this.cParamSig,
      entryCandidates: this.entryCandidates,
      solutionFieldNames: Array.from(this.classFields),
    };
  }

  private lowerClass(clsNode: Parser.SyntaxNode, entryFunction: string): string {
    const nameNode = clsNode.childForFieldName('name');
    const clsName = nameNode ? nameNode.text : 'Solution';
    // Skip redeclaring built-in TreeNode / ListNode / Node
    if (clsName === 'ListNode' || clsName === 'TreeNode' || clsName === 'GraphNode') {
      return '';
    }

    const bodyNode = clsNode.childForFieldName('body');
    if (!bodyNode) return '';

    this.classNames.push(clsName);
    const isEntryClass = clsName === 'Solution' || clsName === 'Main' || clsName === 'Program';
    const fieldsInit: string[] = [];
    const methods: string[] = [];
    const nestedClasses: string[] = [];

    const prevHelperMethods = new Set(this.helperMethodNames);
    const prevClassFields = new Set(this.classFields);
    this.helperMethodNames.clear();
    this.classFields.clear();
    for (let i = 0; i < bodyNode.namedChildCount; i++) {
      const mem = bodyNode.namedChild(i);
      if (!mem) continue;
      if (mem.type === 'method_declaration' || mem.type === 'function_definition') {
        const mName = this.extractFunctionName(mem);
        if (mName) this.helperMethodNames.add(mName);
      } else if (mem.type === 'field_declaration') {
        for (const d of this.extractFieldNames(mem)) {
          this.classFields.add(d);
        }
      }
    }

    for (let i = 0; i < bodyNode.namedChildCount; i++) {
      const mem = bodyNode.namedChild(i);
      if (!mem) continue;
      if (mem.type === 'access_specifier' || mem.type === 'comment' || mem.type === 'line_comment' || mem.type === 'block_comment') {
        continue;
      }
      if (mem.type === 'class_declaration' || mem.type === 'class_specifier' || mem.type === 'struct_specifier') {
        const nc = this.lowerClass(mem, entryFunction);
        if (nc) nestedClasses.push(nc);
        continue;
      }
      if (mem.type === 'field_declaration') {
        fieldsInit.push(...this.lowerFieldDecl(mem));
        continue;
      }
      if (mem.type === 'method_declaration' || mem.type === 'function_definition') {
        methods.push(this.lowerMethod(mem, true));
        continue;
      }
      if (mem.type === 'constructor_declaration') {
        methods.push(this.lowerConstructor(mem));
        continue;
      }
    }

    const ctorLine =
      fieldsInit.length > 0 && !methods.some((m) => m.trimStart().startsWith('constructor('))
        ? `constructor() {\n${fieldsInit.map((f) => '    ' + f).join('\n')}\n  }`
        : '';

    const clsCode = `class ${clsName} {\n  ${ctorLine}\n${methods.join('\n')}\n}`;
    if (isEntryClass) {
      for (const m of this.helperMethodNames) {
        if (m.toLowerCase() === entryFunction.toLowerCase() || m === entryFunction) {
          this.entryCandidates.unshift(m);
        } else {
          this.entryCandidates.push(m);
        }
      }
    }
    this.helperMethodNames = prevHelperMethods;
    this.classFields = prevClassFields;
    return [clsCode, ...nestedClasses].filter(Boolean).join('\n');
  }

  private extractFieldNames(fieldNode: Parser.SyntaxNode): string[] {
    const names: string[] = [];
    for (let i = 0; i < fieldNode.namedChildCount; i++) {
      const ch = fieldNode.namedChild(i);
      if (!ch) continue;
      if (ch.type === 'variable_declarator') {
        const n = ch.childForFieldName('name') ?? ch.namedChildren.find((c) => c.type === 'identifier');
        if (n) names.push(n.text);
      } else if (ch.type === 'field_identifier' || ch.type === 'identifier') {
        names.push(ch.text);
      } else if (ch.type === 'init_declarator') {
        const d = ch.childForFieldName('declarator');
        const id = d ? this.extractIdent(d) : null;
        if (id) names.push(id);
      } else if (ch.type === 'variable_declaration') {
        for (let j = 0; j < ch.namedChildCount; j++) {
          const vd = ch.namedChild(j);
          if (vd?.type === 'variable_declarator') {
            const idNode = vd.childForFieldName('name') ?? vd.namedChildren.find((c) => c.type === 'identifier');
            if (idNode) names.push(idNode.text);
          }
        }
      }
    }
    return names;
  }

  private lowerFieldDecl(fieldNode: Parser.SyntaxNode): string[] {
    const typeNode = fieldNode.childForFieldName('type');
    const typeText = typeNode?.text ?? '';
    const out: string[] = [];

    const handleDeclarator = (vd: Parser.SyntaxNode) => {
      const nameNode = vd.childForFieldName('name') ?? vd.childForFieldName('declarator') ?? vd.namedChildren.find((c) => c.type === 'identifier' || c.type === 'field_identifier');
      const valNode = vd.childForFieldName('value') ?? vd.namedChildren.find((c) => c.type === 'equals_value_clause')?.namedChild(0);
      const name = nameNode ? this.extractIdent(nameNode) : null;
      if (!name) return;
      const rhs = valNode ? this.lowerExpr(valNode) : this.defaultValForType(typeText);
      out.push(`this.${name} = ${rhs};`);
    };

    for (let i = 0; i < fieldNode.namedChildCount; i++) {
      const ch = fieldNode.namedChild(i);
      if (!ch) continue;
      if (ch.type === 'variable_declarator' || ch.type === 'init_declarator') {
        handleDeclarator(ch);
      } else if (ch.type === 'variable_declaration') {
        for (let j = 0; j < ch.namedChildCount; j++) {
          const vd = ch.namedChild(j);
          if (vd?.type === 'variable_declarator') handleDeclarator(vd);
        }
      } else if (ch.type === 'field_identifier') {
        out.push(`this.${ch.text} = ${this.defaultValForType(typeText)};`);
      }
    }
    return out;
  }

  private extractFunctionName(fnNode: Parser.SyntaxNode): string | null {
    const nameNode = fnNode.childForFieldName('name');
    if (nameNode) return nameNode.text;
    const decl = fnNode.childForFieldName('declarator');
    if (decl) return this.extractDeclaratorFunctionName(decl);
    return null;
  }

  private extractDeclaratorFunctionName(decl: Parser.SyntaxNode): string | null {
    if (decl.type === 'function_declarator') {
      const inner = decl.childForFieldName('declarator');
      if (!inner) return null;
      if (inner.type === 'qualified_identifier') {
        const n = inner.childForFieldName('name');
        return n ? n.text : inner.text;
      }
      return inner.text;
    }
    if (decl.type === 'pointer_declarator' || decl.type === 'reference_declarator') {
      const inner = decl.childForFieldName('declarator') ?? decl.namedChild(0);
      return inner ? this.extractDeclaratorFunctionName(inner) : null;
    }
    return null;
  }

  private extractFunctionParamsNode(fnNode: Parser.SyntaxNode): Parser.SyntaxNode | null {
    const p = fnNode.childForFieldName('parameters');
    if (p) return p;
    const findInDecl = (d: Parser.SyntaxNode | null): Parser.SyntaxNode | null => {
      if (!d) return null;
      if (d.type === 'function_declarator') return d.childForFieldName('parameters');
      const inner = d.childForFieldName('declarator') ?? d.namedChild(0);
      return findInDecl(inner);
    };
    return findInDecl(fnNode.childForFieldName('declarator'));
  }

  private extractParams(fnNode: Parser.SyntaxNode): Array<{ name: string; kind: VarKind; isPointer: boolean; typeText: string }> {
    const pNode = this.extractFunctionParamsNode(fnNode);
    if (!pNode) return [];
    const params: Array<{ name: string; kind: VarKind; isPointer: boolean; typeText: string }> = [];
    for (let i = 0; i < pNode.namedChildCount; i++) {
      const p = pNode.namedChild(i);
      if (!p) continue;
      if (p.type === 'formal_parameter' || p.type === 'parameter') {
        const typeText = p.childForFieldName('type')?.text ?? '';
        const name = p.childForFieldName('name')?.text ?? '';
        if (name) {
          params.push({ name, kind: classifyTypeText(typeText), isPointer: false, typeText });
        }
      } else if (p.type === 'parameter_declaration') {
        const typeText = p.childForFieldName('type')?.text ?? '';
        const decl = p.childForFieldName('declarator');
        const isPtr = Boolean(decl && (decl.type === 'pointer_declarator' || decl.text.includes('*')));
        const name = decl ? this.extractIdent(decl) : null;
        if (name) {
          params.push({ name, kind: classifyTypeText(typeText), isPointer: isPtr, typeText });
        }
      }
    }
    return params;
  }

  private extractIdent(node: Parser.SyntaxNode): string | null {
    if (
      node.type === 'identifier' ||
      node.type === 'field_identifier' ||
      node.type === 'type_identifier'
    ) {
      return node.text;
    }
    if (
      node.type === 'pointer_declarator' ||
      node.type === 'reference_declarator' ||
      node.type === 'array_declarator' ||
      node.type === 'parenthesized_declarator' ||
      node.type === 'init_declarator'
    ) {
      const d = node.childForFieldName('declarator') ?? node.namedChild(0);
      return d ? this.extractIdent(d) : null;
    }
    for (let i = 0; i < node.namedChildCount; i++) {
      const ch = node.namedChild(i);
      if (ch) {
        const r = this.extractIdent(ch);
        if (r) return r;
      }
    }
    return null;
  }

  private lowerConstructor(ctorNode: Parser.SyntaxNode): string {
    const params = this.extractParams(ctorNode);
    const body = ctorNode.childForFieldName('body');
    this.pushScope(params.map((p) => [p.name, p.kind]));
    const bodyCode = body ? this.lowerBlockStatements(body, true) : '';
    this.popScope();
    return `  constructor(${params.map((p) => p.name).join(', ')}) {\n${bodyCode}\n  }`;
  }

  private lowerMethod(fnNode: Parser.SyntaxNode, isSolutionMethod: boolean): string {
    const fnName = this.extractFunctionName(fnNode) ?? 'solve';
    const params = this.extractParams(fnNode);
    const body = fnNode.childForFieldName('body');
    const startLine = fnNode.startPosition.row + 1;
    const endLine = fnNode.endPosition.row + 1;

    this.pushScope(params.map((p) => [p.name, p.kind]));
    const bodyCode = body ? this.lowerBlockStatements(body, false) : '';
    const exitSnap = this.snapExpr();
    this.popScope();

    const pList = params.map((p) => p.name).join(', ');
    if (this.traceSteps) {
      const initSnap = `() => ({ ${params.map((p) => `${p.name}: ${p.name}`).join(', ')} })`;
      return `  ${fnName}(${pList}) {
    const __thisRef = ${isSolutionMethod ? 'this' : 'undefined'};
    __pushFrame(${JSON.stringify(fnName)}, ${startLine}, ${initSnap});
    try {
${bodyCode}
    } finally {
      __popFrame(${endLine}, ${exitSnap});
    }
  }`;
    }
    return `  ${fnName}(${pList}) {
    const __thisRef = ${isSolutionMethod ? 'this' : 'undefined'};
    __guardDepth(1);
    try {
${bodyCode}
    } finally {
      __guardDepth(-1);
    }
  }`;
  }

  private lowerTopFunction(fnNode: Parser.SyntaxNode, entryFunction = ''): string {
    const fnName = this.extractFunctionName(fnNode) ?? 'solve';
    this.topLevelFuncs.push(fnName);
    this.entryCandidates.push(fnName);

    const params = this.extractParams(fnNode);
    if (
      this.lang === 'c' &&
      !fnName.startsWith('cmp') &&
      params.length > 0 &&
      (fnName.toLowerCase() === entryFunction.toLowerCase() || !this.cParamSig)
    ) {
      this.cParamSig = params.map((p) => ({ name: p.name, isPointer: p.isPointer, typeText: p.typeText }));
    }

    const body = fnNode.childForFieldName('body');
    const startLine = fnNode.startPosition.row + 1;
    const endLine = fnNode.endPosition.row + 1;

    this.pushScope(params.map((p) => [p.name, p.kind]));
    const bodyCode = body ? this.lowerBlockStatements(body, false) : '';
    const exitSnap = this.snapExpr();
    this.popScope();

    const pList = params.map((p) => p.name).join(', ');
    if (this.traceSteps) {
      const initSnap = `() => ({ ${params.map((p) => `${p.name}: ${p.name}`).join(', ')} })`;
      return `function ${fnName}(${pList}) {
  const __thisRef = undefined;
  __pushFrame(${JSON.stringify(fnName)}, ${startLine}, ${initSnap});
  try {
${bodyCode}
  } finally {
    __popFrame(${endLine}, ${exitSnap});
  }
}`;
    }
    return `function ${fnName}(${pList}) {
  __guardDepth(1);
  try {
${bodyCode}
  } finally {
    __guardDepth(-1);
  }
}`;
  }

  private lowerBlockStatements(blockNode: Parser.SyntaxNode, pushNewScope = true): string {
    if (pushNewScope) this.pushScope();
    const lines: string[] = [];
    for (let i = 0; i < blockNode.namedChildCount; i++) {
      const stmt = blockNode.namedChild(i);
      if (!stmt) continue;
      if (stmt.type === 'comment' || stmt.type === 'line_comment' || stmt.type === 'block_comment') {
        continue;
      }
      const code = this.lowerStmt(stmt);
      if (code) lines.push(code);
    }
    if (pushNewScope) this.popScope();
    return lines.join('\n');
  }

  private lowerStmt(node: Parser.SyntaxNode): string {
    const line = node.startPosition.row + 1;
    const t = node.type;

    if (t === 'block' || t === 'compound_statement') {
      return `{\n${this.lowerBlockStatements(node, true)}\n}`;
    }

    if (t === 'empty_statement') return '';

    if (t === 'local_variable_declaration' || t === 'local_declaration_statement' || t === 'declaration') {
      const stepBefore = this.traceSteps ? this.stepCall(line) : '';
      const declCode = this.lowerDeclaration(node, true);
      return `${stepBefore}${declCode}`;
    }

    if (t === 'expression_statement') {
      const expr = node.namedChild(0);
      if (!expr) return '';
      const stepBefore = this.traceSteps ? this.stepCall(line) : '';
      return `${stepBefore}${this.lowerExpr(expr)};`;
    }

    if (t === 'return_statement') {
      const expr = node.namedChild(0);
      if (this.traceSteps) {
        if (!expr) {
          return `return __ret(${line}, () => undefined, ${this.snapExpr()});`;
        }
        return `return __ret(${line}, () => (${this.lowerExpr(expr)}), ${this.snapExpr()});`;
      }
      return expr ? `return (${this.lowerExpr(expr)});` : 'return;';
    }

    if (t === 'if_statement') {
      const stepBefore = this.traceSteps ? this.stepCall(line) : '';
      const condNode = node.childForFieldName('condition');
      const condCode = condNode ? this.lowerCondition(condNode) : 'true';
      const consNode = node.childForFieldName('consequence');
      const altNode = node.childForFieldName('alternative');

      const consCode = consNode ? this.lowerAsBlock(consNode) : '{}';
      let altCode = '';
      if (altNode) {
        if (altNode.type === 'if_statement') {
          altCode = ` else ${this.lowerStmt(altNode)}`;
        } else if (altNode.type === 'else_clause' || altNode.type === 'if_clause') {
          const inner = altNode.namedChild(0);
          altCode = inner
            ? inner.type === 'if_statement'
              ? ` else ${this.lowerStmt(inner)}`
              : ` else ${this.lowerAsBlock(inner)}`
            : '';
        } else {
          altCode = ` else ${this.lowerAsBlock(altNode)}`;
        }
      }
      return `${stepBefore}if (${condCode}) ${consCode}${altCode}`;
    }

    if (t === 'while_statement') {
      const condNode = node.childForFieldName('condition') ?? node.namedChild(0);
      const bodyNode = node.childForFieldName('body') ?? node.namedChild(1);
      const condCode = condNode ? this.lowerCondition(condNode) : 'true';
      const loopStep = this.traceSteps ? `${this.stepCall(line)}__guard();` : '__guard();';
      const bodyInner = bodyNode ? this.lowerLoopBody(bodyNode, `${this.stepCall(line)}__guard();`) : '';
      return `${loopStep}\nwhile (${condCode}) {\n${bodyInner}\n}`;
    }

    if (t === 'do_statement') {
      const bodyNode = node.childForFieldName('body') ?? node.namedChild(0);
      const condNode = node.childForFieldName('condition') ?? node.namedChild(1);
      const condCode = condNode ? this.lowerCondition(condNode) : 'false';
      const bodyInner = bodyNode ? this.lowerLoopBody(bodyNode, `${this.stepCall(line)}__guard();`) : '';
      return `do {\n${bodyInner}\n} while (${condCode});`;
    }

    if (t === 'for_statement') {
      this.pushScope();
      const initNode = node.childForFieldName('init') ?? node.childForFieldName('initializer');
      const condNode = node.childForFieldName('condition');
      const updateNode = node.childForFieldName('update');
      const bodyNode = node.childForFieldName('body');

      let initCode = '';
      if (initNode) {
        if (
          initNode.type === 'local_variable_declaration' ||
          initNode.type === 'declaration' ||
          initNode.type === 'variable_declaration'
        ) {
          initCode = this.lowerDeclaration(initNode, true).replace(/;\s*$/, '');
        } else {
          initCode = this.lowerExpr(initNode);
        }
      }
      const condCode = condNode ? this.lowerCondition(condNode) : 'true';
      const updCode = updateNode
        ? updateNode.namedChildren.length > 0 && updateNode.type === 'expression_list'
          ? updateNode.namedChildren.map((c) => this.lowerExpr(c)).join(', ')
          : this.lowerExpr(updateNode)
        : '';

      const stepPre = this.traceSteps ? this.stepCall(line) : '';
      const bodyInner = bodyNode ? this.lowerLoopBody(bodyNode, `${this.stepCall(line)}__guard();`) : '';
      this.popScope();
      return `${stepPre}for (${initCode}; ${condCode}; ${updCode}) {\n${bodyInner}\n}`;
    }

    if (t === 'enhanced_for_statement' || t === 'for_range_loop' || t === 'for_each_statement') {
      this.pushScope();
      let leftPattern = '_item';
      if (t === 'enhanced_for_statement') {
        const nameN = node.childForFieldName('name');
        const typeText = node.childForFieldName('type')?.text ?? '';
        leftPattern = nameN ? nameN.text : '_item';
        this.declareVar(leftPattern, classifyTypeText(typeText));
      } else if (t === 'for_range_loop') {
        const decl = node.childForFieldName('declarator');
        const typeText = node.childForFieldName('type')?.text ?? '';
        if (decl) {
          const sb = this.findNodeType(decl, 'structured_binding_declarator');
          if (sb) {
            const ids = sb.namedChildren.map((c) => c.text);
            ids.forEach((id) => this.declareVar(id, 'other'));
            leftPattern = `[${ids.join(', ')}]`;
          } else {
            const id = this.extractIdent(decl) ?? '_item';
            this.declareVar(id, classifyTypeText(typeText));
            leftPattern = id;
          }
        }
      } else {
        // C# for_each_statement
        const leftNode = node.childForFieldName('left');
        const typeText = node.childForFieldName('type')?.text ?? '';
        if (leftNode?.type === 'tuple_pattern') {
          const ids = leftNode.namedChildren.map((c) => c.text);
          ids.forEach((id) => this.declareVar(id, 'other'));
          leftPattern = `[${ids.join(', ')}]`;
        } else {
          leftPattern = leftNode?.text ?? '_item';
          this.declareVar(leftPattern, classifyTypeText(typeText));
        }
      }

      const iterNode = node.childForFieldName('value') ?? node.childForFieldName('right');
      const iterCode = iterNode ? this.lowerExpr(iterNode) : '[]';
      const bodyNode = node.childForFieldName('body');
      const stepPre = this.traceSteps ? this.stepCall(line) : '';
      const bodyInner = bodyNode ? this.lowerLoopBody(bodyNode, `${this.stepCall(line)}__guard();`) : '';
      this.popScope();
      return `${stepPre}for (const ${leftPattern} of (${iterCode})) {\n${bodyInner}\n}`;
    }

    if (t === 'switch_expression' || t === 'switch_statement') {
      const stepBefore = this.traceSteps ? this.stepCall(line) : '';
      const cond = node.childForFieldName('condition');
      const body = node.childForFieldName('body');
      return `${stepBefore}switch (${cond ? this.lowerCondition(cond) : '0'}) ${body ? this.lowerSwitchBody(body) : '{}'}`;
    }

    if (t === 'break_statement') return `${this.stepCall(line)}break;`;
    if (t === 'continue_statement') return `${this.stepCall(line)}continue;`;
    if (t === 'throw_statement') {
      const expr = node.namedChild(0);
      return `${this.stepCall(line)}throw new Error(${expr ? this.lowerExpr(expr) : '""'});`;
    }

    return '';
  }

  private lowerSwitchBody(body: Parser.SyntaxNode): string {
    const parts: string[] = [];
    for (let i = 0; i < body.namedChildCount; i++) {
      const ch = body.namedChild(i);
      if (!ch) continue;
      if (ch.type === 'switch_block_statement_group' || ch.type === 'case_statement' || ch.type === 'switch_section') {
        const labels: string[] = [];
        const stmts: string[] = [];
        for (let j = 0; j < ch.namedChildCount; j++) {
          const item = ch.namedChild(j);
          if (!item) continue;
          if (item.type === 'switch_label' || item.type === 'case_switch_label' || item.type === 'default_switch_label') {
            const expr = item.namedChild(0);
            if (item.text.trim().startsWith('default')) labels.push('default:');
            else labels.push(`case ${expr ? this.lowerExpr(expr) : '0'}:`);
          } else {
            stmts.push(this.lowerStmt(item));
          }
        }
        parts.push(`${labels.join('\n')}\n${stmts.join('\n')}`);
      }
    }
    return `{\n${parts.join('\n')}\n}`;
  }

  private lowerAsBlock(node: Parser.SyntaxNode): string {
    if (node.type === 'block' || node.type === 'compound_statement') {
      return `{\n${this.lowerBlockStatements(node, true)}\n}`;
    }
    this.pushScope();
    const s = this.lowerStmt(node);
    this.popScope();
    return `{\n${s}\n}`;
  }

  private lowerLoopBody(node: Parser.SyntaxNode, perIterPrefix: string): string {
    if (node.type === 'block' || node.type === 'compound_statement') {
      return `${perIterPrefix}\n${this.lowerBlockStatements(node, true)}`;
    }
    this.pushScope();
    const s = this.lowerStmt(node);
    this.popScope();
    return `${perIterPrefix}\n${s}`;
  }

  private lowerCondition(node: Parser.SyntaxNode): string {
    if (node.type === 'condition_clause') {
      const v = node.childForFieldName('value') ?? node.namedChild(0);
      return v ? this.lowerExpr(v) : 'true';
    }
    if (node.type === 'parenthesized_expression' || node.type === 'condition') {
      const inner = node.namedChild(0);
      return inner ? this.lowerExpr(inner) : 'true';
    }
    return this.lowerExpr(node);
  }

  private lowerDeclaration(node: Parser.SyntaxNode, registerScope: boolean): string {
    // Handles Java local_variable_declaration, C/C++ declaration, C# local_declaration_statement
    let target = node;
    if (node.type === 'local_declaration_statement') {
      const vd = node.namedChildren.find((c) => c.type === 'variable_declaration');
      if (vd) target = vd;
    }

    const typeNode = target.childForFieldName('type') ?? target.namedChildren.find((c) => /type|generic|array/.test(c.type));
    const typeText = typeNode?.text ?? '';
    const vKind = classifyTypeText(typeText);
    const decls: string[] = [];

    for (let i = 0; i < target.namedChildCount; i++) {
      const ch = target.namedChild(i);
      if (!ch) continue;

      if (ch.type === 'variable_declarator') {
        const tuplePat = ch.namedChildren.find((c) => c.type === 'tuple_pattern');
        const valClause = ch.namedChildren.find((c) => c.type === 'equals_value_clause');
        const valNode = ch.childForFieldName('value') ?? valClause?.namedChild(0) ?? null;

        if (tuplePat) {
          const ids = tuplePat.namedChildren.map((c) => c.text);
          if (registerScope) ids.forEach((id) => this.declareVar(id, 'other'));
          const rhs = valNode ? this.lowerExpr(valNode, typeText) : '[]';
          decls.push(`[${ids.join(', ')}] = ${rhs}`);
          continue;
        }

        const nameNode =
          ch.childForFieldName('name') ??
          ch.namedChildren.find((c) => c.type === 'identifier');
        const name = nameNode ? nameNode.text : null;
        if (!name) continue;
        if (registerScope) this.declareVar(name, vKind);

        const dimNode = ch.namedChildren.find((c) => c.type === 'dimensions');
        let rhs: string;
        if (valNode) {
          rhs = this.lowerExpr(valNode, typeText);
        } else if (dimNode) {
          rhs = '[]';
        } else {
          rhs = this.defaultValForType(typeText);
        }
        decls.push(`${name} = ${rhs}`);
      } else if (ch.type === 'init_declarator') {
        const declPart = ch.childForFieldName('declarator');
        const valPart = ch.childForFieldName('value');
        // Check structured binding: auto [a, b] = ...
        if (declPart) {
          const sb = this.findNodeType(declPart, 'structured_binding_declarator');
          if (sb) {
            const ids = sb.namedChildren.map((c) => c.text);
            if (registerScope) ids.forEach((id) => this.declareVar(id, 'other'));
            const rhs = valPart ? this.lowerExpr(valPart, typeText) : '[]';
            decls.push(`[${ids.join(', ')}] = ${rhs}`);
            continue;
          }
        }
        // Check array_declarator: int dp[n] = {0} or int dp[m][n]
        const arrSpec = declPart ? this.extractArrayDeclSizes(declPart) : null;
        const name = declPart ? this.extractIdent(declPart) : null;
        if (!name) continue;
        if (registerScope) this.declareVar(name, vKind);

        if (arrSpec && arrSpec.sizes.length > 0 && !valPart) {
          decls.push(`${name} = ${this.buildVecFromSizes(arrSpec.sizes, this.defaultValForType(typeText))}`);
        } else if (arrSpec && arrSpec.sizes.length > 0 && valPart?.type === 'initializer_list' && valPart.namedChildCount <= 1) {
          const fillV = valPart.namedChild(0) ? this.lowerExpr(valPart.namedChild(0)!) : '0';
          decls.push(`${name} = ${this.buildVecFromSizes(arrSpec.sizes, fillV)}`);
        } else if (valPart?.type === 'argument_list') {
          decls.push(`${name} = ${this.lowerCppConstructorInit(typeText, valPart)}`);
        } else {
          const rhs = valPart ? this.lowerExpr(valPart, typeText) : this.defaultValForType(typeText);
          decls.push(`${name} = ${rhs}`);
        }
      } else if (ch.type === 'function_declarator' && registerScope) {
        const declNameNode = ch.childForFieldName('declarator');
        const name = declNameNode ? this.extractIdent(declNameNode) : null;
        const pList = ch.childForFieldName('parameters');
        if (name && pList) {
          this.declareVar(name, vKind);
          const initArgs = pList.namedChildren.map((p) => {
            const pDecl = p.childForFieldName('declarator');
            const pType = p.childForFieldName('type');
            if (pDecl) return this.extractIdent(pDecl) ?? p.text;
            return pType ? pType.text : p.text;
          });
          decls.push(`${name} = ${this.lowerCppDirectInit(typeText, initArgs)}`);
        }
      } else if (ch.type === 'identifier' && (!typeNode || ch.id !== typeNode.id)) {
        const name = ch.text;
        if (registerScope) this.declareVar(name, vKind);
        decls.push(`${name} = ${this.defaultValForType(typeText)}`);
      } else if (ch.type === 'pointer_declarator' || ch.type === 'reference_declarator') {
        const nestedArr = this.findNodeType(ch, 'array_declarator');
        if (nestedArr) {
          const arrSpec = this.extractArrayDeclSizes(nestedArr);
          if (arrSpec?.name) {
            if (registerScope) this.declareVar(arrSpec.name, 'container');
            decls.push(`${arrSpec.name} = ${this.buildVecFromSizes(arrSpec.sizes, this.defaultValForType(typeText))}`);
          }
        } else {
          const name = this.extractIdent(ch);
          if (name) {
            if (registerScope) this.declareVar(name, vKind);
            decls.push(`${name} = ${this.defaultValForType(typeText)}`);
          }
        }
      } else if (ch.type === 'array_declarator') {
        const arrSpec = this.extractArrayDeclSizes(ch);
        if (arrSpec?.name) {
          if (registerScope) this.declareVar(arrSpec.name, 'container');
          decls.push(`${arrSpec.name} = ${this.buildVecFromSizes(arrSpec.sizes, this.defaultValForType(typeText))}`);
        }
      }
    }

    if (decls.length === 0) return '';
    return `let ${decls.join(', ')};`;
  }

  private lowerCppDirectInit(typeText: string, args: string[]): string {
    if (/vector/.test(typeText)) {
      if (args.length >= 2) return `__vec(${args[0]}, () => (${args[1]}))`;
      if (args.length === 1) {
        const innerMatch = typeText.match(/vector\s*<(.*)>/);
        const innerType = innerMatch ? innerMatch[1].trim() : '';
        const innerDef = innerType ? this.defaultValForType(innerType) : '0';
        return `__vec(${args[0]}, () => (${innerDef}))`;
      }
      return '[]';
    }
    return args[0] ?? this.defaultValForType(typeText);
  }

  private extractArrayDeclSizes(node: Parser.SyntaxNode): { name: string | null; sizes: string[] } | null {
    if (node.type !== 'array_declarator') return null;
    const sizes: string[] = [];
    let cur: Parser.SyntaxNode | null = node;
    while (cur && cur.type === 'array_declarator') {
      const sz = cur.childForFieldName('size');
      sizes.unshift(sz ? this.lowerExpr(sz) : '0');
      cur = cur.childForFieldName('declarator');
    }
    return { name: cur ? this.extractIdent(cur) : null, sizes };
  }

  private buildVecFromSizes(sizes: string[], fillExpr: string): string {
    let inner = fillExpr;
    for (let i = sizes.length - 1; i >= 0; i--) {
      inner = `__vec(${sizes[i]}, () => (${inner}))`;
    }
    return inner;
  }

  private lowerCppConstructorInit(typeText: string, argList: Parser.SyntaxNode): string {
    const args = argList.namedChildren.map((a) => this.lowerExpr(a));
    if (/vector/.test(typeText)) {
      if (args.length === 2) return `__vec(${args[0]}, () => (${args[1]}))`;
      if (args.length === 1) return `__vec(${args[0]}, 0)`;
      return '[]';
    }
    if (/unordered_map|map/.test(typeText)) return `__newMap('unordered_map')`;
    if (/unordered_set|set/.test(typeText)) return `__newSet('unordered_set')`;
    if (/queue/.test(typeText) && !/priority/.test(typeText)) return `__newDeque('queue')`;
    if (/deque/.test(typeText)) return `__newDeque('deque')`;
    if (/stack/.test(typeText)) return `__newDeque('stack')`;
    if (/priority_queue/.test(typeText)) {
      const info = detectPriorityQueueComparatorKind(typeText, argList.namedChildren);
      return `__newHeap('${info.kind}')`;
    }
    if (/pair/.test(typeText)) return `__pair(${args[0] ?? 0}, ${args[1] ?? 0})`;
    return args[0] ?? 'undefined';
  }

  private defaultValForType(typeText: string): string {
    const t = typeText.trim();
    if (/^unordered_map\s*<|^map\s*</.test(t)) return `__newMap('unordered_map')`;
    if (/^unordered_set\s*<|^set\s*</.test(t)) return `__newSet('unordered_set')`;
    if (/^priority_queue\b/.test(t)) {
      const info = detectPriorityQueueComparatorKind(t, []);
      return `__newHeap('${info.kind}')`;
    }
    if (/^(std::)?queue\s*</.test(t)) return `__newDeque('queue')`;
    if (/^(std::)?deque\s*</.test(t)) return `__newDeque('deque')`;
    if (/^(std::)?stack\s*</.test(t)) return `__newDeque('stack')`;
    if (/^(std::)?vector\s*</.test(t)) return '[]';
    if (/^(std::)?string$/.test(t)) return '""';
    if (/^pair\s*</.test(t)) return '__pair(0, 0)';
    if (/\*|ListNode|TreeNode/.test(t)) return 'null';
    if (/^(int|long|short|byte|size_t|double|float)$/.test(t)) return '0';
    if (/^bool(ean)?$/.test(t)) return 'false';
    return 'null';
  }

  private lowerExpr(node: Parser.SyntaxNode, typeHint = ''): string {
    const t = node.type;

    if (
      t === 'decimal_integer_literal' ||
      t === 'hex_integer_literal' ||
      t === 'integer_literal' ||
      t === 'number_literal' ||
      t === 'real_literal' ||
      t === 'decimal_floating_point_literal'
    ) {
      return node.text.replace(/[uUlLfFdDmM]+$/, '');
    }

    if (t === 'character_literal') {
      return node.text;
    }

    if (t === 'string_literal' || t === 'raw_string_literal' || t === 'verbatim_string_literal') {
      return JSON.stringify(this.unescapeLiteralText(node.text));
    }

    if (t === 'true' || t === 'false' || t === 'boolean_literal') {
      return node.text;
    }

    if (t === 'null_literal' || t === 'null' || t === 'nullptr') {
      return 'null';
    }

    if (t === 'this' || t === 'this_expression') {
      return 'this';
    }

    if (t === 'identifier' || t === 'field_identifier' || t === 'type_identifier') {
      if (node.text === 'NULL' || node.text === 'nullptr') return 'null';
      if (node.text === 'INT_MAX') return '2147483647';
      if (node.text === 'INT_MIN') return '-2147483648';
      if (node.text === 'LONG_MAX' || node.text === 'LLONG_MAX') return 'Number.MAX_SAFE_INTEGER';
      if (node.text === 'LONG_MIN' || node.text === 'LLONG_MIN') return 'Number.MIN_SAFE_INTEGER';
      if (this.classFields.has(node.text) && !this.lookupVarKind(node.text)) {
        return `this.${node.text}`;
      }
      return node.text;
    }

    if (t === 'qualified_identifier' || t === 'scoped_identifier') {
      const txt = node.text.replace(/^std::/, '');
      if (txt === 'INT_MAX') return '2147483647';
      if (txt === 'INT_MIN') return '-2147483648';
      if (txt === 'LONG_MAX' || txt === 'LLONG_MAX') return 'Number.MAX_SAFE_INTEGER';
      if (txt === 'LONG_MIN' || txt === 'LLONG_MIN') return 'Number.MIN_SAFE_INTEGER';
      return txt.replace(/::/g, '.');
    }

    if (t === 'parenthesized_expression' || t === 'condition') {
      const inner = node.namedChild(0);
      return inner ? `(${this.lowerExpr(inner)})` : '()';
    }

    if (t === 'cast_expression') {
      const val = node.childForFieldName('value') ?? node.namedChild(node.namedChildCount - 1);
      const typeNode = node.childForFieldName('type');
      if (!val) return 'null';
      if (typeNode && (val.text.includes('malloc') || val.text.includes('calloc'))) {
        const nodeMatch = typeNode.text.match(/\b(TreeNode|ListNode|GraphNode)\b\s*\*/);
        if (nodeMatch) return `new ${nodeMatch[1]}()`;
      }
      const inner = this.lowerExpr(val);
      if (typeNode && /\b(int|long|short|byte|size_t|unsigned|uint)\b/.test(typeNode.text) && !/\*/.test(typeNode.text)) {
        return `__toInt(${inner})`;
      }
      return inner;
    }

    if (t === 'sizeof_expression') {
      return '4';
    }

    if (t === 'pointer_expression') {
      const opNode = node.child(0);
      const arg = node.childForFieldName('argument') ?? node.namedChild(0);
      if (!arg) return 'null';
      const op = opNode?.text ?? '';
      if (op === '*') return `__deref(${this.lowerExpr(arg)})`;
      if (op === '&') return this.lowerExpr(arg);
      return this.lowerExpr(arg);
    }

    if (t === 'unary_expression' || t === 'prefix_unary_expression' || t === 'postfix_unary_expression') {
      const operand = node.childForFieldName('operand') ?? node.childForFieldName('argument') ?? node.namedChild(0);
      if (!operand) return node.text;
      const opText = node.text.replace(operand.text, '').trim();
      if (opText === '++' || opText === '--') {
        const delta = opText === '++' ? 1 : -1;
        const isPostfix = node.type === 'postfix_unary_expression' || node.text.trimEnd().endsWith(opText);
        return this.lowerUpdateTarget(operand, delta, isPostfix);
      }
      return `${opText}${this.lowerExpr(operand)}`;
    }

    if (t === 'update_expression') {
      const operand = node.childForFieldName('argument') ?? node.namedChild(0);
      if (!operand) return node.text;
      const isInc = node.text.includes('++');
      const isPostfix = node.text.trimStart().startsWith(operand.text.trimStart());
      return this.lowerUpdateTarget(operand, isInc ? 1 : -1, isPostfix);
    }

    if (t === 'assignment_expression') {
      return this.lowerAssignment(node);
    }

    if (t === 'binary_expression') {
      return this.lowerBinary(node);
    }

    if (t === 'ternary_expression' || t === 'conditional_expression') {
      const cond = node.childForFieldName('condition');
      const cons = node.childForFieldName('consequence');
      const alt = node.childForFieldName('alternative');
      return `((${cond ? this.lowerExpr(cond) : 'false'}) ? (${cons ? this.lowerExpr(cons) : 'null'}) : (${alt ? this.lowerExpr(alt) : 'null'}))`;
    }

    if (t === 'array_access' || t === 'subscript_expression' || t === 'element_access_expression') {
      return this.lowerSubscript(node);
    }

    if (t === 'field_access' || t === 'field_expression' || t === 'member_access_expression') {
      return this.lowerMemberAccess(node);
    }

    if (t === 'method_invocation' || t === 'call_expression' || t === 'invocation_expression') {
      return this.lowerCall(node);
    }

    if (t === 'object_creation_expression') {
      return this.lowerObjectCreation(node, typeHint);
    }

    if (t === 'array_creation_expression') {
      return this.lowerArrayCreation(node);
    }

    if (t === 'array_initializer' || t === 'initializer_list' || t === 'initializer_expression') {
      const items = node.namedChildren.map((c) => this.lowerExpr(c));
      if (this.lang === 'cpp' && /pair/.test(typeHint) && items.length === 2) {
        return `__pair(${items[0]}, ${items[1]})`;
      }
      return `[${items.join(', ')}]`;
    }

    if (t === 'tuple_expression' || t === 'tuple_literal') {
      const args = node.namedChildren.map((c) => {
        const inner = c.type === 'argument' ? c.namedChild(0) : c;
        return inner ? this.lowerExpr(inner) : 'null';
      });
      return args.length === 2 ? `__pair(${args[0]}, ${args[1]})` : `[${args.join(', ')}]`;
    }

    if (t === 'lambda_expression') {
      return this.lowerLambda(node);
    }

    if (t === 'new_expression') {
      // C++ new ListNode(...) / new TreeNode(...)
      const typeN = node.childForFieldName('type');
      const argsN = node.childForFieldName('arguments');
      const typeName = typeN?.text ?? 'Object';
      const args = argsN ? argsN.namedChildren.map((a) => this.lowerExpr(a)) : [];
      return `new ${typeName}(${args.join(', ')})`;
    }

    if (t === 'argument') {
      const inner = node.namedChild(0);
      return inner ? this.lowerExpr(inner) : 'undefined';
    }

    return node.text;
  }

  private unescapeLiteralText(raw: string): string {
    if (raw.startsWith('@"') && raw.endsWith('"')) {
      return raw.slice(2, -1).replace(/""/g, '"');
    }
    if (raw.startsWith('"') && raw.endsWith('"')) {
      try {
        return JSON.parse(raw);
      } catch {
        return raw.slice(1, -1);
      }
    }
    return raw;
  }

  private unwrapParens(node: Parser.SyntaxNode): Parser.SyntaxNode {
    let cur = node;
    while (cur.type === 'parenthesized_expression' && cur.namedChild(0)) {
      cur = cur.namedChild(0)!;
    }
    return cur;
  }

  private lowerLValue(node: Parser.SyntaxNode): string {
    if (node.type === 'field_access' || node.type === 'field_expression' || node.type === 'member_access_expression') {
      const obj =
        node.childForFieldName('object') ??
        node.childForFieldName('argument') ??
        node.childForFieldName('expression');
      const fld =
        node.childForFieldName('field') ??
        node.childForFieldName('name');
      const objCode = obj ? this.lowerLValue(obj) : 'this';
      const fName = fld ? fld.text : '';
      return fName ? `${objCode}.${fName}` : objCode;
    }
    return this.lowerExpr(node);
  }

  private lowerUpdateTarget(operand: Parser.SyntaxNode, delta: number, isPostfix: boolean): string {
    const inner = this.unwrapParens(operand);
    if (inner.type === 'pointer_expression') {
      const opNode = inner.child(0);
      const ptrInner = inner.childForFieldName('argument') ?? inner.namedChild(0);
      if (ptrInner && (!opNode || opNode.text === '*')) {
        return `__ptrUpd(${this.lowerExpr(ptrInner)}, ${delta}, ${isPostfix})`;
      }
    }
    if (
      inner.type === 'array_access' ||
      inner.type === 'subscript_expression' ||
      inner.type === 'element_access_expression'
    ) {
      const { arrCode, keyCode } = this.extractSubscriptParts(inner);
      return `__idxUpd(${arrCode}, ${keyCode}, ${delta}, ${isPostfix})`;
    }
    const targetCode = this.lowerLValue(inner);
    const op = delta > 0 ? '++' : '--';
    return isPostfix ? `${targetCode}${op}` : `${op}${targetCode}`;
  }

  private lowerAssignment(node: Parser.SyntaxNode): string {
    const left = node.childForFieldName('left');
    const right = node.childForFieldName('right');
    const opNode = node.childForFieldName('operator');
    const op = opNode ? opNode.text : this.extractBinaryOp(node);
    const rhsCode = right ? this.lowerExpr(right) : 'undefined';

    if (!left) return node.text;

    // Handle C pointer deref assignment: *returnSize = 2
    if (left.type === 'pointer_expression') {
      const ptrInner = left.childForFieldName('argument') ?? left.namedChild(0);
      if (ptrInner) {
        const target = this.lowerExpr(ptrInner);
        if (op === '=') {
          return `(${target} instanceof RefBox ? (${target}.$ = ${rhsCode}) : Array.isArray(${target}) ? (${target}[0] = ${rhsCode}) : (${target} = ${rhsCode}))`;
        }
      }
    }

    // Handle subscript assignment / compound assignment on arrays or maps
    if (
      left.type === 'array_access' ||
      left.type === 'subscript_expression' ||
      left.type === 'element_access_expression'
    ) {
      const { arrCode, keyCode } = this.extractSubscriptParts(left);
      if (op === '=') return `__idxSet(${arrCode}, ${keyCode}, ${rhsCode})`;
      if (op === '+=') return `__idxUpd(${arrCode}, ${keyCode}, (${rhsCode}), false)`;
      if (op === '-=') return `__idxUpd(${arrCode}, ${keyCode}, -(${rhsCode}), false)`;
      return `__idxSet(${arrCode}, ${keyCode}, __idx(${arrCode}, ${keyCode}) ${op.slice(0, -1)} (${rhsCode}))`;
    }

    const lhsCode = this.lowerLValue(left);
    if (op === '/=' && !this.isFloatExpr(left) && !this.isFloatExpr(right)) {
      return `${lhsCode} = __idiv(${lhsCode}, ${rhsCode})`;
    }
    return `${lhsCode} ${op} ${rhsCode}`;
  }

  private extractBinaryOp(node: Parser.SyntaxNode): string {
    const left = node.childForFieldName('left');
    const right = node.childForFieldName('right');
    for (let i = 0; i < node.childCount; i++) {
      const c = node.child(i);
      if (c && c !== left && c !== right && (c.type === 'assignment_operator' || !c.isNamed())) {
        return c.text;
      }
    }
    return '=';
  }

  private lowerBinary(node: Parser.SyntaxNode): string {
    const opNode = node.childForFieldName('operator');
    const op = opNode ? opNode.text : this.extractBinaryOp(node);

    // Handle C++ std::cout << a << b << endl chains
    if (op === '<<' && this.isCoutChain(node)) {
      const parts = this.flattenCoutArgs(node);
      return `__cout(${parts.join(', ')})`;
    }

    const left = node.childForFieldName('left');
    const right = node.childForFieldName('right');
    const lCode = left ? this.lowerExpr(left) : '0';
    const rCode = right ? this.lowerExpr(right) : '0';

    if (op === '/' && !this.isFloatExpr(left) && !this.isFloatExpr(right)) {
      return `__idiv(${lCode}, ${rCode})`;
    }
    if (op === '-' && (this.isCharLike(left) || this.isCharLike(right))) {
      return `__sub(${lCode}, ${rCode})`;
    }
    if (op === '+' && this.isCharLike(left) && !this.isStringExpr(right)) {
      return `__add(${lCode}, ${rCode})`;
    }
    if (op === '==' && (lCode === 'null' || rCode === 'null')) {
      return `(${lCode} == ${rCode})`;
    }
    if (op === '!=' && (lCode === 'null' || rCode === 'null')) {
      return `(${lCode} != ${rCode})`;
    }
    return `(${lCode} ${op} ${rCode})`;
  }

  private isCoutChain(node: Parser.SyntaxNode): boolean {
    let cur: Parser.SyntaxNode | null = node;
    while (cur && cur.type === 'binary_expression') {
      cur = cur.childForFieldName('left');
    }
    return Boolean(cur && /^(std::)?cout$/.test(cur.text.trim()));
  }

  private flattenCoutArgs(node: Parser.SyntaxNode): string[] {
    if (node.type === 'binary_expression') {
      const op = node.childForFieldName('operator')?.text ?? this.extractBinaryOp(node);
      if (op === '<<') {
        const left = node.childForFieldName('left');
        const right = node.childForFieldName('right');
        const lParts =
          left && /^(std::)?cout$/.test(left.text.trim())
            ? []
            : left
              ? this.flattenCoutArgs(left)
              : [];
        const rParts = right ? [this.lowerExpr(right).replace(/^std::endl$/, 'endl')] : [];
        return [...lParts, ...rParts];
      }
    }
    return [this.lowerExpr(node)];
  }

  private isCharLike(node: Parser.SyntaxNode | null | undefined): boolean {
    if (!node) return false;
    return node.type === 'character_literal';
  }

  private isStringExpr(node: Parser.SyntaxNode | null | undefined): boolean {
    if (!node) return false;
    return node.type === 'string_literal' || node.type === 'raw_string_literal';
  }

  private extractSubscriptParts(node: Parser.SyntaxNode): { arrCode: string; keyCode: string } {
    if (node.type === 'array_access') {
      const arr = node.childForFieldName('array');
      const idx = node.childForFieldName('index');
      return {
        arrCode: arr ? this.lowerExpr(arr) : '[]',
        keyCode: idx ? this.lowerExpr(idx) : '0',
      };
    }
    if (node.type === 'subscript_expression') {
      const arg = node.childForFieldName('argument');
      const indices = node.childForFieldName('indices') ?? node.childForFieldName('index');
      let keyNode: Parser.SyntaxNode | null = indices;
      if (indices?.type === 'subscript_argument_list') {
        keyNode = indices.namedChild(0);
      }
      return {
        arrCode: arg ? this.lowerExpr(arg) : '[]',
        keyCode: keyNode ? this.lowerExpr(keyNode) : '0',
      };
    }
    // C# element_access_expression
    const expr = node.childForFieldName('expression') ?? node.namedChild(0);
    const argList = node.childForFieldName('subscript') ?? node.namedChild(1);
    const args = argList
      ? argList.namedChildren.map((a) => this.lowerExpr(a))
      : ['0'];
    if (args.length === 2) {
      // C# 2D matrix access dp[i, j]
      return {
        arrCode: `__idx(${expr ? this.lowerExpr(expr) : '[]'}, ${args[0]})`,
        keyCode: args[1],
      };
    }
    return {
      arrCode: expr ? this.lowerExpr(expr) : '[]',
      keyCode: args[0] ?? '0',
    };
  }

  private lowerSubscript(node: Parser.SyntaxNode): string {
    const { arrCode, keyCode } = this.extractSubscriptParts(node);
    return `__idx(${arrCode}, ${keyCode})`;
  }

  private lowerMemberAccess(node: Parser.SyntaxNode): string {
    const obj =
      node.childForFieldName('object') ??
      node.childForFieldName('argument') ??
      node.childForFieldName('expression');
    const fld =
      node.childForFieldName('field') ??
      node.childForFieldName('name');
    const objCode = obj ? this.lowerExpr(obj) : '';
    const fName = fld ? fld.text : '';

    if (objCode === 'Integer' && (fName === 'MAX_VALUE' || fName === 'MIN_VALUE')) {
      return `Integer.${fName}`;
    }
    if ((objCode === 'int' || objCode === 'Int32') && (fName === 'MaxValue' || fName === 'MinValue')) {
      return fName === 'MaxValue' ? '2147483647' : '-2147483648';
    }
    if ((objCode === 'long' || objCode === 'Int64' || objCode === 'Long') && (fName === 'MaxValue' || fName === 'MAX_VALUE' || fName === 'MinValue' || fName === 'MIN_VALUE')) {
      return fName === 'MaxValue' || fName === 'MAX_VALUE' ? 'Number.MAX_SAFE_INTEGER' : 'Number.MIN_SAFE_INTEGER';
    }
    if (fName === 'length' || fName === 'Length' || fName === 'Count') {
      return `__len(${objCode})`;
    }
    if (objCode === 'Math' || objCode === 'Arrays' || objCode === 'Collections' || objCode === 'Character' || objCode === 'Integer' || objCode === 'Long' || objCode === 'System' || objCode === 'Console' || objCode === 'String' || objCode === 'string') {
      if (objCode === 'string' && fName === 'Empty') return '""';
      return `${objCode}.${fName}`;
    }
    if (objCode === 'Array') return `ArrayCs.${fName}`;
    if (fName === 'first') return `(${objCode}?.first !== undefined ? ${objCode}.first : ${objCode}?.[0])`;
    if (fName === 'second') return `(${objCode}?.second !== undefined ? ${objCode}.second : ${objCode}?.[1])`;
    return `${objCode}?.${fName}`;
  }

  private lowerCall(node: Parser.SyntaxNode): string {
    // Handles Java method_invocation, C/C++ call_expression, C# invocation_expression
    const argListNode =
      node.childForFieldName('arguments') ??
      node.namedChildren.find((c) => c.type === 'argument_list');
    const rawArgs = argListNode ? argListNode.namedChildren : [];
    const args = rawArgs.map((a) => this.lowerExpr(a));

    let targetObjCode: string | null = null;
    let methodName = '';

    if (node.type === 'method_invocation') {
      const obj = node.childForFieldName('object');
      const nameN = node.childForFieldName('name');
      targetObjCode = obj ? this.lowerExpr(obj) : null;
      methodName = nameN?.text ?? '';
    } else {
      const fnNode = node.childForFieldName('function');
      if (!fnNode) return node.text;
      if (fnNode.type === 'field_expression' || fnNode.type === 'member_access_expression') {
        const obj = fnNode.childForFieldName('argument') ?? fnNode.childForFieldName('expression');
        const fld = fnNode.childForFieldName('field') ?? fnNode.childForFieldName('name');
        targetObjCode = obj ? this.lowerExpr(obj) : null;
        methodName = fld?.text ?? '';
      } else if (fnNode.type === 'template_function') {
        methodName = fnNode.childForFieldName('name')?.text ?? '';
      } else {
        methodName = fnNode.text.replace(/^std::/, '');
      }
    }

    // Bare / static calls
    if (!targetObjCode) {
      if (this.helperMethodNames.has(methodName)) {
        return `this.${methodName}(${args.join(', ')})`;
      }
      if (methodName === 'sort' && rawArgs.length >= 2) {
        // C++ std::sort(v.begin(), v.end(), cmp?)
        const firstArg = rawArgs[0];
        const vecExpr = this.extractBeginEndContainer(firstArg) ?? args[0];
        const cmpCode = args[2];
        return cmpCode ? `__sort(${vecExpr}, ${cmpCode}, true)` : `__sort(${vecExpr})`;
      }
      if (methodName === 'reverse' && rawArgs.length === 2) {
        const firstArg = rawArgs[0];
        const vecExpr = this.extractBeginEndContainer(firstArg) ?? args[0];
        return `__reverse(${vecExpr})`;
      }
      if (methodName === 'swap' && rawArgs.length === 2) {
        const aNode = rawArgs[0];
        const bNode = rawArgs[1];
        if (aNode.type === 'subscript_expression' && bNode.type === 'subscript_expression') {
          const pA = this.extractSubscriptParts(aNode);
          const pB = this.extractSubscriptParts(bNode);
          if (pA.arrCode === pB.arrCode) {
            return `__swap(${pA.arrCode}, ${pA.keyCode}, ${pB.keyCode})`;
          }
        }
        return `[${args[0]}, ${args[1]}] = [${args[1]}, ${args[0]}]`;
      }
      if (methodName === 'vector') {
        if (args.length >= 2) return `__vec(${args[0]}, () => (${args[1]}))`;
        if (args.length === 1) return `__vec(${args[0]}, 0)`;
        return '[]';
      }
      if (methodName === 'pair') {
        return `__pair(${args[0] ?? 0}, ${args[1] ?? 0})`;
      }
      if (methodName === 'ListNode' || methodName === 'TreeNode' || methodName === 'GraphNode') {
        return `new ${methodName}(${args.join(', ')})`;
      }
      return `${methodName}(${args.join(', ')})`;
    }

    // Method invocations on targets
    if (targetObjCode === 'StringBuilder') {
      return `new AlgoStringBuilder(${args.join(', ')})`;
    }
    if (targetObjCode === 'Math' && methodName === 'Max') return `Math.max(${args.join(', ')})`;
    if (targetObjCode === 'Math' && methodName === 'Min') return `Math.min(${args.join(', ')})`;
    if (targetObjCode === 'Math' && methodName === 'Abs') return `Math.abs(${args.join(', ')})`;
    if (targetObjCode === 'Array') return `ArrayCs.${methodName}(${args.join(', ')})`;
    if (targetObjCode === 'List' && methodName === 'of') return `[${args.join(', ')}]`;
    if (targetObjCode === 'Tuple' && methodName === 'Create') return `__pair(${args.join(', ')})`;
    if (targetObjCode === 'string' && methodName === 'Join') {
      return `__toArray(${args[1]}).join(${args[0]})`;
    }
    if (targetObjCode === 'String' && methodName === 'valueOf') return `String(${args[0] ?? ''})`;

    // Container / String methods mapped uniformly across Java / C++ / C#
    if (methodName === 'size' || methodName === 'length') return `__len(${targetObjCode})`;
    if (methodName === 'isEmpty' || methodName === 'empty') return `__empty(${targetObjCode})`;
    if (methodName === 'charAt') return `${targetObjCode}[${args[0] ?? 0}]`;
    if (methodName === 'toCharArray' || methodName === 'ToCharArray') return `${targetObjCode}.split("")`;
    if (methodName === 'substring') return `${targetObjCode}.slice(${args.join(', ')})`;
    if (methodName === 'substr') {
      return args.length === 2
        ? `${targetObjCode}.slice(${args[0]}, (${args[0]}) + (${args[1]}))`
        : `${targetObjCode}.slice(${args[0]})`;
    }
    if (methodName === 'Substring') {
      return args.length === 2
        ? `${targetObjCode}.slice(${args[0]}, (${args[0]}) + (${args[1]}))`
        : `${targetObjCode}.slice(${args[0]})`;
    }

    // Java ArrayList / C# List / C++ vector mutations
    if (methodName === 'push_back' || methodName === 'emplace_back' || methodName === 'Add' || methodName === 'add') {
      const argExpr =
        this.lang === 'cpp' && (methodName === 'push_back' || methodName === 'emplace_back')
          ? args.map((a) => `__cppCopy(${a})`).join(', ')
          : args.join(', ');
      return `(${targetObjCode}?.push ? ${targetObjCode}.push(${argExpr}) : ${targetObjCode}.add(${argExpr}))`;
    }
    if (methodName === 'pop_back') {
      return `${targetObjCode}.pop()`;
    }
    if (methodName === 'RemoveAt') {
      return `${targetObjCode}.splice(${args[0]}, 1)`;
    }
    if (methodName === 'Sort') {
      return `__sort(${targetObjCode}${args[0] ? `, ${args[0]}` : ''})`;
    }
    if (methodName === 'ToArray' || methodName === 'toArray') {
      return `__toArray(${targetObjCode})`;
    }
    if (methodName === 'get' && args.length === 1) {
      return `(Array.isArray(${targetObjCode}) ? ${targetObjCode}[${args[0]}] : ${targetObjCode}.get(${args[0]}))`;
    }
    if (methodName === 'set' && args.length === 2) {
      return `(Array.isArray(${targetObjCode}) ? (${targetObjCode}[${args[0]}] = ${args[1]}) : ${targetObjCode}.set(${args[0]}, ${args[1]}))`;
    }
    if (methodName === 'remove' && args.length === 1) {
      return `(Array.isArray(${targetObjCode}) ? ${targetObjCode}.splice(${args[0]}, 1)[0] : ${targetObjCode}.remove(${args[0]}))`;
    }
    if (methodName === 'contains' && args.length === 1) {
      return `(Array.isArray(${targetObjCode}) ? ${targetObjCode}.includes(${args[0]}) : ${targetObjCode}.contains(${args[0]}))`;
    }
    if (methodName === 'Contains' && args.length === 1) {
      return `(Array.isArray(${targetObjCode}) ? ${targetObjCode}.includes(${args[0]}) : ${targetObjCode}.Contains(${args[0]}))`;
    }
    if (methodName === 'back' && args.length === 0) {
      return `(Array.isArray(${targetObjCode}) ? ${targetObjCode}[${targetObjCode}.length - 1] : ${targetObjCode}.back())`;
    }
    if (methodName === 'front' && args.length === 0) {
      return `(Array.isArray(${targetObjCode}) ? ${targetObjCode}[0] : ${targetObjCode}.front())`;
    }
    if (methodName === 'begin' || methodName === 'end') {
      return `${targetObjCode}.${methodName}()`;
    }
    if (methodName === 'TryGetValue' && rawArgs.length === 2) {
      // Support dict.TryGetValue(key, out int val) or out val
      const outName = this.extractOutParamName(rawArgs[1]);
      if (outName) {
        this.declareVar(outName, 'other');
        return `(${targetObjCode}.containsKey(${args[0]}) ? ((${outName} = ${targetObjCode}.get(${args[0]})), true) : false)`;
      }
    }
    if (methodName === 'TryDequeue' && rawArgs.length === 2) {
      const eName = this.extractOutParamName(rawArgs[0]);
      const pName = this.extractOutParamName(rawArgs[1]);
      if (eName && pName) {
        this.declareVar(eName, 'other');
        this.declareVar(pName, 'other');
        return `${targetObjCode}.tryDequeue ? ${targetObjCode}.tryDequeue((v) => { ${eName} = v; }, (p) => { ${pName} = p; }) : ${targetObjCode}.TryDequeue((v) => { ${eName} = v; }, (p) => { ${pName} = p; })`;
      }
    }

    return `${targetObjCode}.${methodName}(${args.join(', ')})`;
  }

  private extractOutParamName(argNode: Parser.SyntaxNode): string | null {
    const inner = argNode.type === 'argument' ? argNode.namedChild(0) : argNode;
    if (!inner) return null;
    if (inner.type === 'declaration_expression') {
      return inner.childForFieldName('name')?.text ?? inner.namedChild(inner.namedChildCount - 1)?.text ?? null;
    }
    if (inner.type === 'identifier') return inner.text;
    const text = argNode.text.trim();
    const m = text.match(/out\s+(?:\w+\s+)?(\w+)$/);
    return m ? m[1] : null;
  }

  private extractBeginEndContainer(argNode: Parser.SyntaxNode): string | null {
    if (argNode.type === 'call_expression') {
      const fn = argNode.childForFieldName('function');
      if (fn?.type === 'field_expression') {
        const fld = fn.childForFieldName('field')?.text;
        const obj = fn.childForFieldName('argument');
        if (fld === 'begin' && obj) return this.lowerExpr(obj);
      }
    }
    return null;
  }

  private lowerObjectCreation(node: Parser.SyntaxNode, _typeHint: string): string {
    const typeNode = node.childForFieldName('type');
    const typeText = typeNode?.text ?? '';
    const baseName = typeText.replace(/<.*>/, '').replace(/^.*\./, '').trim();
    const argList = node.childForFieldName('arguments') ?? node.namedChildren.find((c) => c.type === 'argument_list');
    const rawArgs = argList ? argList.namedChildren : [];
    const args = rawArgs.map((a) => this.lowerExpr(a));

    const initExpr = node.namedChildren.find((c) => c.type === 'initializer_expression' || c.type === 'array_initializer');

    if (/^(HashMap|TreeMap|LinkedHashMap|Dictionary)$/.test(baseName)) {
      return `__newMap(${JSON.stringify(baseName)})`;
    }
    if (/^(HashSet|TreeSet|LinkedHashSet)$/.test(baseName)) {
      if (initExpr) return `__newSet(${JSON.stringify(baseName)}, ${this.lowerExpr(initExpr)})`;
      return args.length > 0 ? `__newSet(${JSON.stringify(baseName)}, ${args[0]})` : `__newSet(${JSON.stringify(baseName)})`;
    }
    if (baseName === 'ArrayList' || baseName === 'List') {
      if (initExpr) return this.lowerExpr(initExpr);
      return args.length === 1 && !/^\d+$/.test(args[0]) ? `[...(${args[0]})]` : '[]';
    }
    if (baseName === 'ArrayDeque' || baseName === 'LinkedList') {
      return `__newDeque('deque')`;
    }
    if (baseName === 'Queue') {
      return `__newDeque('queue')`;
    }
    if (baseName === 'Stack') {
      return `__newDeque('stack')`;
    }
    if (baseName === 'PriorityQueue') {
      if (rawArgs.length >= 1) {
        return `__newHeap('min', ${args[0]})`;
      }
      return `__newHeap('min')`;
    }
    if (baseName === 'StringBuilder') {
      return `new AlgoStringBuilder(${args.join(', ')})`;
    }
    if (baseName === 'int' || baseName === 'ListNode' || baseName === 'TreeNode' || baseName === 'GraphNode' || this.classNames.includes(baseName)) {
      return `new ${baseName}(${args.join(', ')})`;
    }
    return `new ${baseName}(${args.join(', ')})`;
  }

  private lowerArrayCreation(node: Parser.SyntaxNode): string {
    // Java or C# array_creation_expression
    const valNode = node.childForFieldName('value');
    const initExpr = node.namedChildren.find((c) => c.type === 'initializer_expression' || c.type === 'array_initializer');
    if (valNode) return this.lowerExpr(valNode);
    if (initExpr) return this.lowerExpr(initExpr);

    // Dimensions!
    const dimExprs = node.namedChildren.filter((c) => c.type === 'dimensions_expr');
    if (dimExprs.length > 0) {
      const sizes = dimExprs.map((d) => {
        const inner = d.namedChild(0);
        return inner ? this.lowerExpr(inner) : '0';
      });
      const elemType = node.childForFieldName('type')?.text ?? '';
      const defVal = /boolean|bool/.test(elemType) ? 'false' : /String|string|Integer|int\[\]/.test(elemType) ? '0' : '0';
      return this.buildVecFromSizes(sizes, defVal);
    }

    // C# new int[n] or new int[m][] where dimensions live inside array_type -> array_rank_specifier
    const arrType = node.childForFieldName('type') ?? node.namedChildren.find((c) => c.type === 'array_type');
    if (arrType) {
      const sizes: string[] = [];
      const collectRanks = (n: Parser.SyntaxNode) => {
        for (let i = 0; i < n.namedChildCount; i++) {
          const ch = n.namedChild(i);
          if (!ch) continue;
          if (ch.type === 'array_rank_specifier') {
            if (ch.namedChildCount > 0) {
              const rankArgs = ch.namedChildren.map((r) => this.lowerExpr(r));
              sizes.push(...rankArgs);
            }
          } else if (ch.type === 'array_type') {
            collectRanks(ch);
          }
        }
      };
      collectRanks(arrType);
      if (sizes.length > 0) {
        return this.buildVecFromSizes(sizes, '0');
      }
    }
    return '[]';
  }

  private lowerLambda(node: Parser.SyntaxNode): string {
    const paramsN = node.childForFieldName('parameters') ?? node.namedChildren.find((c) => /parameters/.test(c.type));
    const paramNames: string[] = [];
    if (paramsN) {
      for (let i = 0; i < paramsN.namedChildCount; i++) {
        const p = paramsN.namedChild(i);
        if (!p) continue;
        if (p.type === 'identifier') paramNames.push(p.text);
        else {
          const id = p.childForFieldName('name')?.text ?? this.extractIdent(p);
          if (id) paramNames.push(id);
        }
      }
    } else {
      // C++ lambda captures + declarator
      const decl = node.childForFieldName('declarator');
      const pList = decl?.childForFieldName('parameters');
      if (pList) {
        for (let i = 0; i < pList.namedChildCount; i++) {
          const p = pList.namedChild(i);
          const d = p?.childForFieldName('declarator');
          const id = d ? this.extractIdent(d) : p?.text;
          if (id) paramNames.push(id);
        }
      }
    }

    const bodyN = node.childForFieldName('body');
    if (!bodyN) return `(${paramNames.join(', ')}) => 0`;
    this.pushScope(paramNames.map((p) => [p, 'other']));
    let bodyCode: string;
    if (bodyN.type === 'block' || bodyN.type === 'compound_statement') {
      // Inside comparator lambdas avoid trace recursion clutter if just returning compare expr
      const innerStmts: string[] = [];
      for (let i = 0; i < bodyN.namedChildCount; i++) {
        const s = bodyN.namedChild(i);
        if (!s) continue;
        if (s.type === 'return_statement') {
          const ex = s.namedChild(0);
          innerStmts.push(ex ? `return (${this.lowerExpr(ex)});` : 'return;');
        } else {
          innerStmts.push(this.lowerStmt(s));
        }
      }
      bodyCode = `{\n${innerStmts.join('\n')}\n}`;
    } else {
      bodyCode = `(${this.lowerExpr(bodyN)})`;
    }
    this.popScope();
    return `(${paramNames.join(', ')}) => ${bodyCode}`;
  }

  private findNodeType(node: Parser.SyntaxNode, typeName: string): Parser.SyntaxNode | null {
    if (node.type === typeName) return node;
    for (let i = 0; i < node.namedChildCount; i++) {
      const ch = node.namedChild(i);
      if (ch) {
        const f = this.findNodeType(ch, typeName);
        if (f) return f;
      }
    }
    return null;
  }
}

function unwrapLangValue(val: unknown): unknown {
  if (val === null || val === undefined) return null;
  if (val instanceof RefBox) return unwrapLangValue(val.$);
  if (val instanceof AlgoPair) return [unwrapLangValue(val[0]), unwrapLangValue(val[1])];
  if (val instanceof AlgoStringBuilder) return val.toString();
  if (val instanceof AlgoDeque || val instanceof AlgoSet) return [...(val instanceof AlgoDeque ? val.items : val.toArray())].map(unwrapLangValue);
  if (val instanceof ListNode || val instanceof TreeNode) return val;
  if (Array.isArray(val)) return val.map(unwrapLangValue);
  return val;
}

function bindCArguments(
  rawArgs: unknown[],
  params: ProblemParam[],
  cSig: CParamMeta[] | null
): {
  callArgs: unknown[];
  returnSizeBox: RefBox<number> | null;
  returnColSizesBox: RefBox<number[]> | null;
} {
  const converted = convertArgs(rawArgs, params);
  if (!cSig || cSig.length === converted.length) {
    return { callArgs: converted, returnSizeBox: null, returnColSizesBox: null };
  }

  const callArgs: unknown[] = [];
  let returnSizeBox: RefBox<number> | null = null;
  let returnColSizesBox: RefBox<number[]> | null = null;
  let argIdx = 0;

  for (let pIdx = 0; pIdx < cSig.length; pIdx++) {
    const p = cSig[pIdx];
    if (/returnSize/i.test(p.name)) {
      returnSizeBox = new RefBox(0);
      callArgs.push(returnSizeBox);
      continue;
    }
    if (/returnColumnSizes/i.test(p.name)) {
      returnColSizesBox = new RefBox<number[]>([]);
      callArgs.push(returnColSizesBox);
      continue;
    }

    const prevArg = argIdx > 0 ? converted[argIdx - 1] : undefined;
    if (/ColSize$/i.test(p.name) && Array.isArray(prevArg)) {
      callArgs.push(prevArg.map((row) => (Array.isArray(row) ? row.length : 0)));
      continue;
    }
    if (/(Size|Len)$/i.test(p.name) && Array.isArray(prevArg)) {
      callArgs.push(prevArg.length);
      continue;
    }
    if (/(Size|Len)$/i.test(p.name) && typeof prevArg === 'string') {
      callArgs.push(prevArg.length);
      continue;
    }

    if (argIdx < converted.length) {
      callArgs.push(converted[argIdx]);
      argIdx += 1;
    } else {
      callArgs.push(0);
    }
  }

  return { callArgs, returnSizeBox, returnColSizesBox };
}

function resolveEntryCallable(
  exportsObj: Record<string, unknown>,
  entryFunction: string,
  candidates: string[],
  isPlayground?: boolean
): ((...args: unknown[]) => unknown) | null {
  if (isPlayground) {
    if (typeof exportsObj.main === 'function') return exportsObj.main as (...args: unknown[]) => unknown;
    for (const clsName of ['Main', 'Program', 'Solution']) {
      const Cls = exportsObj[clsName] as (new () => Record<string, unknown>) | undefined;
      if (typeof Cls === 'function') {
        const inst = new Cls();
        for (const m of ['main', 'Main', entryFunction]) {
          if (typeof inst[m] === 'function') {
            return (inst[m] as (...args: unknown[]) => unknown).bind(inst);
          }
        }
      }
    }
  }
  if (typeof exportsObj[entryFunction] === 'function') {
    return exportsObj[entryFunction] as (...args: unknown[]) => unknown;
  }
  // Check top-level case-insensitive
  for (const [k, v] of Object.entries(exportsObj)) {
    if (k.toLowerCase() === entryFunction.toLowerCase() && typeof v === 'function' && !/^(Solution|Main|Program)$/.test(k)) {
      return v as (...args: unknown[]) => unknown;
    }
  }
  const SolCtor = (exportsObj.Solution ?? exportsObj.Main ?? exportsObj.Program) as (new () => Record<string, unknown>) | undefined;
  if (typeof SolCtor === 'function') {
    const sol = new SolCtor();
    if (typeof sol[entryFunction] === 'function') {
      return (sol[entryFunction] as (...args: unknown[]) => unknown).bind(sol);
    }
    for (const c of candidates) {
      if (typeof sol[c] === 'function') {
        return (sol[c] as (...args: unknown[]) => unknown).bind(sol);
      }
    }
    const protoMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(sol)).filter(
      (m) => m !== 'constructor' && typeof sol[m] === 'function'
    );
    const match = protoMethods.find((m) => m.toLowerCase() === entryFunction.toLowerCase());
    if (match) return (sol[match] as (...args: unknown[]) => unknown).bind(sol);
    if (protoMethods.length > 0) {
      return (sol[protoMethods[0]] as (...args: unknown[]) => unknown).bind(sol);
    }
  }
  for (const [k, v] of Object.entries(exportsObj)) {
    if (typeof v === 'function' && !lowerStartsCapital(k)) {
      return v as (...args: unknown[]) => unknown;
    }
  }
  return null;
}

function lowerStartsCapital(s: string): boolean {
  return /^[A-Z]/.test(s);
}

export async function executeMultiLanguage(payload: MultiLangPayload): Promise<ExecutionTrace | RunTestsResponse> {
  const parser = await getParser(payload.language);
  const tree = parser.parse(payload.code);
  const synErr = findFirstSyntaxError(tree.rootNode);

  if (synErr) {
    if (payload.mode === 'tests') {
      return {
        allPassed: false,
        passedCount: 0,
        totalCount: payload.testCases.length,
        results: [],
        totalRuntimeMs: 0,
        error: synErr.message,
      };
    }
    return {
      steps: [],
      finalOutput: null,
      stdout: [],
      error: synErr.message,
      errorLine: synErr.line,
      runtimeMs: 0,
    };
  }

  const dialect: ContainerDialect = payload.language;
  const traceSteps = payload.mode === 'trace';
  const lowerer = new AstLowerer(payload.language, traceSteps);
  const lowered = lowerer.lowerProgram(tree.rootNode, payload.entryFunction);

  if (traceSteps) {
    return runTraceCompiled(payload, lowered, dialect);
  }
  return runTestsCompiled(payload, lowered, dialect);
}

function buildFnArgs(
  globals: Record<string, unknown>,
  extraNames: string[],
  extraVals: unknown[],
  jsCode: string
): () => Record<string, unknown> {
  const gKeys = Object.keys(globals);
  const gVals = gKeys.map((k) => globals[k]);
  const factory = new Function(...gKeys, ...extraNames, `"use strict";\n${jsCode}`);
  return () => factory(...gVals, ...extraVals) as Record<string, unknown>;
}

function runTraceCompiled(
  payload: MultiLangPayload,
  lowered: LowerResult,
  dialect: ContainerDialect
): ExecutionTrace {
  const startTime = performance.now();
  const maxSteps = payload.maxSteps ?? 1000;
  const maxLoopOps = 10000;
  const steps: TraceStep[] = [];
  const stdoutLines: string[] = [];
  const serializer = new LangHeapSerializer();
  const frameStack: ActiveRuntimeFrame[] = [];
  const prevLocals = new Map<number, Record<string, SerializedValue>>();
  let callCounter = 0;
  let loopOps = 0;
  let truncated = false;
  let finalOutput: unknown = null;
  let errorMsg: string | undefined;
  let errorLine: number | undefined;

  const printLine = (msg: string) => {
    stdoutLines.push(msg);
    if (stdoutLines.length > 200) stdoutLines.shift();
  };

  function captureStep(line: number, event: TraceStep['event'], returnVal?: unknown, errText?: string) {
    if (steps.length >= maxSteps) {
      truncated = true;
      throw new TraceLimitError(`Trace limit reached (${maxSteps} steps).`);
    }
    if (frameStack.length === 0) return;

    const { stack, heap, serFn } = serializer.serializeFrames(frameStack);
    const topFrame = stack[stack.length - 1];
    const prev = prevLocals.get(topFrame.callId) ?? {};
    const changedVars: string[] = [];
    for (const [k, v] of Object.entries(topFrame.locals)) {
      if (!(k in prev) || JSON.stringify(prev[k]) !== JSON.stringify(v)) {
        changedVars.push(k);
      }
    }
    prevLocals.set(topFrame.callId, topFrame.locals);

    const stepObj: TraceStep = {
      step: steps.length,
      line,
      event,
      funcName: topFrame.funcName,
      callId: topFrame.callId,
      parentCallId: topFrame.parentCallId,
      callStack: stack,
      heap,
      stdout: [...stdoutLines],
      changedVars,
    };
    if (event === 'return') stepObj.returnValue = serFn(returnVal);
    if (errText) stepObj.error = errText;
    steps.push(stepObj);
  }

  const __pushFrame = (funcName: string, line: number, snapFn: () => Record<string, unknown>) => {
    if (frameStack.length >= 120) throw new TraceLimitError('Maximum recursion depth (120) exceeded.');
    callCounter += 1;
    const parentCallId = frameStack.length > 0 ? frameStack[frameStack.length - 1].callId : null;
    frameStack.push({ id: `f${callCounter}`, callId: callCounter, parentCallId, funcName, line, snapFn, returned: false });
    captureStep(line, 'call');
  };

  const __step = (line: number, snapFn: () => Record<string, unknown>) => {
    if (frameStack.length > 0) {
      const top = frameStack[frameStack.length - 1];
      top.line = line;
      top.snapFn = snapFn;
    }
    captureStep(line, 'step');
  };

  const __ret = <T>(line: number, exprFn: () => T, snapFn: () => Record<string, unknown>): T => {
    const val = exprFn();
    if (frameStack.length > 0) {
      const top = frameStack[frameStack.length - 1];
      top.line = line;
      top.snapFn = snapFn;
      top.returned = true;
      captureStep(line, 'return', val);
    }
    return val;
  };

  const __popFrame = (line: number, snapFn: () => Record<string, unknown>) => {
    const top = frameStack[frameStack.length - 1];
    if (top && !top.returned) {
      top.line = line;
      top.snapFn = snapFn;
      try {
        captureStep(line, 'return', undefined);
      } catch {
        // ignore
      }
    }
    frameStack.pop();
  };

  const __guard = () => {
    loopOps += 1;
    if (loopOps > maxLoopOps) throw new TraceLimitError(`Loop iteration limit exceeded (${maxLoopOps}).`);
  };

  const globals = buildLanguageGlobals(dialect, printLine);
  try {
    const invokeExports = buildFnArgs(
      globals,
      ['__pushFrame', '__step', '__ret', '__popFrame', '__guard'],
      [__pushFrame, __step, __ret, __popFrame, __guard],
      lowered.jsCode
    );
    const exportsObj = invokeExports();
    const fn = resolveEntryCallable(exportsObj, payload.entryFunction, lowered.entryCandidates, payload.isPlayground);
    if (!fn) {
      throw new Error(`Could not find entry method '${payload.entryFunction}' in ${payload.language} code.`);
    }

    if (payload.isPlayground) {
      const rawRes = fn();
      finalOutput = toJsonOutput(unwrapLangValue(rawRes), 'any');
    } else {
      const tc = payload.testCases[0] ?? { args: [] };
      const { callArgs, returnSizeBox } = bindCArguments(tc.args ?? [], payload.params, lowered.cParamSig);
      const rawRes = fn(...callArgs);
      let unwrapped = unwrapLangValue(rawRes);
      if (returnSizeBox) {
        if (unwrapped === null && returnSizeBox.$ === 0) {
          unwrapped = [];
        } else if (Array.isArray(unwrapped)) {
          unwrapped = unwrapped.slice(0, Math.max(0, returnSizeBox.$));
        }
      }

      if (payload.returnType === 'void' && (unwrapped === null || unwrapped === undefined) && callArgs.length > 0) {
        finalOutput = toJsonOutput(callArgs[0], payload.params[0]?.type ?? 'any');
      } else {
        finalOutput = toJsonOutput(unwrapped, payload.returnType);
      }
    }
  } catch (err) {
    if (err instanceof TraceLimitError) errorMsg = err.message;
    else if (err instanceof Error) {
      errorMsg = `${err.name}: ${err.message}`;
      if (steps.length > 0) errorLine = steps[steps.length - 1].line;
    } else errorMsg = String(err);
  }

  return {
    steps,
    finalOutput,
    stdout: stdoutLines,
    error: errorMsg,
    errorLine,
    truncated,
    runtimeMs: Number((performance.now() - startTime).toFixed(2)),
  };
}

function runTestsCompiled(
  payload: MultiLangPayload,
  lowered: LowerResult,
  dialect: ContainerDialect
): RunTestsResponse {
  const totalStart = performance.now();
  if (payload.isPlayground) {
    const stdoutLines: string[] = [];
    const printLine = (msg: string) => {
      stdoutLines.push(msg);
      if (stdoutLines.length > 200) stdoutLines.shift();
    };
    let loopOps = 0;
    let depth = 0;
    const __guard = () => {
      loopOps += 1;
      if (loopOps > 150000) throw new TraceLimitError('Time Limit Exceeded (possible infinite loop).');
    };
    const __guardDepth = (delta: number) => {
      depth += delta;
      if (depth > 250) throw new TraceLimitError('Maximum recursion depth exceeded.');
    };
    const globals = buildLanguageGlobals(dialect, printLine);
    let err: string | undefined;
    try {
      const invokeExports = buildFnArgs(globals, ['__guard', '__guardDepth'], [__guard, __guardDepth], lowered.jsCode);
      const exportsObj = invokeExports();
      const fn = resolveEntryCallable(exportsObj, payload.entryFunction, lowered.entryCandidates, true);
      if (!fn) throw new Error('Could not find main/entry function in playground.');
      fn();
    } catch (e) {
      err = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
    }
    const rt = Number((performance.now() - totalStart).toFixed(2));
    return {
      allPassed: !err,
      passedCount: err ? 0 : 1,
      totalCount: 1,
      results: [
        {
          testCaseId: 'playground',
          label: 'Playground Execution',
          passed: !err,
          inputDisplay: '(custom script)',
          expectedDisplay: 'No runtime errors',
          actualDisplay: err ? err : 'Completed',
          stdout: stdoutLines,
          runtimeMs: rt,
          error: err,
        },
      ],
      totalRuntimeMs: rt,
      error: err,
    };
  }

  const results: TestCaseResult[] = [];
  let passedCount = 0;

  for (const tc of payload.testCases) {
    const tcStart = performance.now();
    const stdoutLines: string[] = [];
    const printLine = (msg: string) => {
      stdoutLines.push(msg);
      if (stdoutLines.length > 200) stdoutLines.shift();
    };
    let loopOps = 0;
    let depth = 0;
    const __guard = () => {
      loopOps += 1;
      if (loopOps > 150000) throw new TraceLimitError('Time Limit Exceeded (possible infinite loop).');
    };
    const __guardDepth = (delta: number) => {
      depth += delta;
      if (depth > 250) throw new TraceLimitError('Maximum recursion depth exceeded.');
    };

    const globals = buildLanguageGlobals(dialect, printLine);
    let err: string | undefined;
    let actualJson: unknown = null;
    let passed = false;

    try {
      const invokeExports = buildFnArgs(
        globals,
        ['__guard', '__guardDepth'],
        [__guard, __guardDepth],
        lowered.jsCode
      );
      const exportsObj = invokeExports();
      const fn = resolveEntryCallable(exportsObj, payload.entryFunction, lowered.entryCandidates, false);
      if (!fn) {
        throw new Error(`Could not find entry method '${payload.entryFunction}'.`);
      }

      const { callArgs, returnSizeBox } = bindCArguments(tc.args ?? [], payload.params, lowered.cParamSig);
      const rawRes = fn(...callArgs);
      let unwrapped = unwrapLangValue(rawRes);
      if (returnSizeBox) {
        if (unwrapped === null && returnSizeBox.$ === 0) {
          unwrapped = [];
        } else if (Array.isArray(unwrapped)) {
          unwrapped = unwrapped.slice(0, Math.max(0, returnSizeBox.$));
        }
      }

      if (payload.returnType === 'void' && (unwrapped === null || unwrapped === undefined) && callArgs.length > 0) {
        actualJson = toJsonOutput(callArgs[0], payload.params[0]?.type ?? 'any');
      } else {
        actualJson = toJsonOutput(unwrapped, payload.returnType);
      }

      passed = compareOutputs(actualJson, tc.expected, payload.compareMode);
      if (passed) passedCount += 1;
    } catch (e) {
      err = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
    }

    const inputDisplay = (tc.args ?? [])
      .map((val, idx) => `${payload.params[idx]?.name ?? `arg${idx}`} = ${formatDisplay(val)}`)
      .join(', ');

    results.push({
      testCaseId: tc.id,
      label: tc.label,
      passed,
      isHidden: tc.isHidden,
      inputDisplay,
      expectedDisplay: formatDisplay(tc.expected),
      actualDisplay: err ? err : formatDisplay(actualJson),
      stdout: stdoutLines,
      runtimeMs: Number((performance.now() - tcStart).toFixed(2)),
      error: err,
    });
  }

  return {
    allPassed: passedCount === payload.testCases.length && payload.testCases.length > 0,
    passedCount,
    totalCount: payload.testCases.length,
    results,
    totalRuntimeMs: Number((performance.now() - totalStart).toFixed(2)),
  };
}
