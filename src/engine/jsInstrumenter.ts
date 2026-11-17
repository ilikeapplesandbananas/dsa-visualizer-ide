import * as acorn from 'acorn';
import { generate } from 'astring';

/* eslint-disable @typescript-eslint/no-explicit-any */
type AstNode = any;

export interface InstrumentationResult {
  code: string;
  error?: string;
  errorLine?: number;
}

const SKIP_CALLBACK_METHODS = new Set([
  'sort',
  'map',
  'filter',
  'reduce',
  'reduceRight',
  'find',
  'findIndex',
  'some',
  'every',
  'flatMap',
]);

function extractPatternNames(node: AstNode, out: Set<string>): void {
  if (!node) return;
  switch (node.type) {
    case 'Identifier':
      out.add(node.name);
      break;
    case 'ArrayPattern':
      for (const el of node.elements) extractPatternNames(el, out);
      break;
    case 'ObjectPattern':
      for (const prop of node.properties) {
        if (prop.type === 'RestElement') extractPatternNames(prop.argument, out);
        else extractPatternNames(prop.value, out);
      }
      break;
    case 'RestElement':
      extractPatternNames(node.argument, out);
      break;
    case 'AssignmentPattern':
      extractPatternNames(node.left, out);
      break;
  }
}

function collectVarDecls(node: AstNode, out: Set<string>): void {
  if (!node || typeof node !== 'object') return;
  if (
    node.type === 'FunctionDeclaration' ||
    node.type === 'FunctionExpression' ||
    node.type === 'ArrowFunctionExpression' ||
    node.type === 'ClassDeclaration' ||
    node.type === 'ClassExpression'
  ) {
    if (node.type === 'FunctionDeclaration' && node.id) {
      // skip polluting variable watch with helper function names
    }
    return;
  }
  if (node.type === 'VariableDeclaration' && node.kind === 'var') {
    for (const decl of node.declarations) extractPatternNames(decl.id, out);
  }
  for (const key of Object.keys(node)) {
    if (key === 'loc' || key === 'start' || key === 'end') continue;
    const child = node[key];
    if (Array.isArray(child)) {
      for (const item of child) collectVarDecls(item, out);
    } else if (child && typeof child === 'object') {
      collectVarDecls(child, out);
    }
  }
}

function collectBlockLexicalNames(stmts: AstNode[]): string[] {
  const names = new Set<string>();
  for (const s of stmts) {
    if (!s) continue;
    if (s.type === 'VariableDeclaration' && (s.kind === 'let' || s.kind === 'const')) {
      for (const decl of s.declarations) {
        // Don't watch variable holding a function expression unless helpful; actually harmless, skip functions at runtime
        extractPatternNames(decl.id, names);
      }
    }
  }
  return Array.from(names);
}

function makeSnapshotFn(varNames: string[]): AstNode {
  const unique = Array.from(new Set(varNames)).filter((n) => !n.startsWith('__'));
  const bodyStatements: AstNode[] = [
    {
      type: 'VariableDeclaration',
      kind: 'const',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: '__s' },
          init: { type: 'ObjectExpression', properties: [] },
        },
      ],
    },
  ];

  for (const name of unique) {
    bodyStatements.push({
      type: 'TryStatement',
      block: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                object: { type: 'Identifier', name: '__s' },
                property: { type: 'Literal', value: name },
                computed: true,
              },
              right: { type: 'Identifier', name },
            },
          },
        ],
      },
      handler: {
        type: 'CatchClause',
        param: null,
        body: { type: 'BlockStatement', body: [] },
      },
      finalizer: null,
    });
  }

  bodyStatements.push({
    type: 'ReturnStatement',
    argument: { type: 'Identifier', name: '__s' },
  });

  return {
    type: 'ArrowFunctionExpression',
    id: null,
    params: [],
    body: { type: 'BlockStatement', body: bodyStatements },
    async: false,
    expression: false,
  };
}

function makeCallExpr(name: string, args: AstNode[]): AstNode {
  return {
    type: 'CallExpression',
    callee: { type: 'Identifier', name },
    arguments: args,
    optional: false,
  };
}

function makeStepStmt(line: number, varNames: string[]): AstNode {
  return {
    type: 'ExpressionStatement',
    expression: makeCallExpr('__step', [
      { type: 'Literal', value: line },
      makeSnapshotFn(varNames),
    ]),
  };
}

function makeGuardExpr(line: number): AstNode {
  return makeCallExpr('__guard', [{ type: 'Literal', value: line }]);
}

function makeStepExpr(line: number, varNames: string[]): AstNode {
  return makeCallExpr('__step', [
    { type: 'Literal', value: line },
    makeSnapshotFn(varNames),
  ]);
}

function ensureBlock(stmt: AstNode | null): AstNode | null {
  if (!stmt) return null;
  if (stmt.type === 'BlockStatement') return stmt;
  return {
    type: 'BlockStatement',
    body: [stmt],
    loc: stmt.loc,
  };
}

function getLine(node: AstNode, fallback = 1): number {
  return node?.loc?.start?.line ?? fallback;
}

function getEndLine(node: AstNode, fallback = 1): number {
  return node?.loc?.end?.line ?? fallback;
}

export function instrumentJavaScript(
  sourceCode: string,
  options: { traceTopLevel?: boolean; guardOnly?: boolean } = {}
): InstrumentationResult {
  const guardOnly = Boolean(options.guardOnly);
  let ast: AstNode;
  try {
    ast = acorn.parse(sourceCode, {
      ecmaVersion: 'latest',
      sourceType: 'script',
      locations: true,
    });
  } catch (err: any) {
    const line = err?.loc?.line ?? 1;
    return {
      code: '',
      error: `SyntaxError (line ${line}): ${err?.message ?? 'Invalid JavaScript syntax'}`,
      errorLine: line,
    };
  }

  function isSkippedCallback(node: AstNode, parent: AstNode | null): boolean {
    if (!parent) return false;
    if (
      parent.type === 'CallExpression' &&
      parent.callee?.type === 'MemberExpression' &&
      parent.callee.property?.type === 'Identifier' &&
      SKIP_CALLBACK_METHODS.has(parent.callee.property.name) &&
      parent.arguments?.includes(node)
    ) {
      return true;
    }
    return false;
  }

  function transformFunctionNode(
    fnNode: AstNode,
    funcName: string,
    outerScope: string[],
    isDerivedConstructor = false
  ): void {
    // Convert expression arrow body to block body so we can trace & return cleanly
    if (fnNode.type === 'ArrowFunctionExpression' && fnNode.expression) {
      const expr = fnNode.body;
      fnNode.body = {
        type: 'BlockStatement',
        body: [
          {
            type: 'ReturnStatement',
            argument: expr,
            loc: expr.loc ?? fnNode.loc,
          },
        ],
        loc: expr.loc ?? fnNode.loc,
      };
      fnNode.expression = false;
    }

    if (!fnNode.body || fnNode.body.type !== 'BlockStatement') return;

    const paramNames = new Set<string>();
    for (const p of fnNode.params ?? []) extractPatternNames(p, paramNames);

    const varDecls = new Set<string>();
    collectVarDecls(fnNode.body, varDecls);
    const bodyLexicals = collectBlockLexicalNames(fnNode.body.body);

    const fnBaseScope = Array.from(new Set([...outerScope, ...paramNames, ...varDecls, ...bodyLexicals]));

    // Transform body statements
    const bodyStmts = transformBlockStatements(fnNode.body.body, fnBaseScope, !guardOnly);
    const startLine = getLine(fnNode, 1);
    const endLine = getEndLine(fnNode.body, startLine);

    if (!guardOnly && bodyStmts.length > 0) {
      const last = bodyStmts[bodyStmts.length - 1];
      if (last.type !== 'ReturnStatement' && last.type !== 'ThrowStatement') {
        bodyStmts.push(makeStepStmt(endLine, fnBaseScope));
      }
    }

    // If derived class constructor has super(...), keep super(...) before __pushFrame
    let prefixStmts: AstNode[] = [];
    let restStmts = bodyStmts;
    if (isDerivedConstructor && bodyStmts.length > 0) {
      const superIdx = bodyStmts.findIndex(
        (s) =>
          s.type === 'ExpressionStatement' &&
          s.expression?.type === 'CallExpression' &&
          s.expression.callee?.type === 'Super'
      );
      if (superIdx >= 0) {
        prefixStmts = bodyStmts.slice(0, superIdx + 1);
        restStmts = bodyStmts.slice(superIdx + 1);
      }
    }

    if (guardOnly) {
      const enterCall: AstNode = {
        type: 'ExpressionStatement',
        expression: makeCallExpr('__guardDepth', [{ type: 'Literal', value: 1 }]),
      };
      const tryFinally: AstNode = {
        type: 'TryStatement',
        block: { type: 'BlockStatement', body: restStmts },
        handler: null,
        finalizer: {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: makeCallExpr('__guardDepth', [{ type: 'Literal', value: -1 }]),
            },
          ],
        },
      };
      fnNode.body.body = [...prefixStmts, enterCall, tryFinally];
      return;
    }

    const enterCall: AstNode = {
      type: 'ExpressionStatement',
      expression: makeCallExpr('__pushFrame', [
        { type: 'Literal', value: funcName },
        { type: 'Literal', value: startLine },
        makeSnapshotFn(fnBaseScope),
      ]),
    };

    const tryFinally: AstNode = {
      type: 'TryStatement',
      block: {
        type: 'BlockStatement',
        body: restStmts,
      },
      handler: null,
      finalizer: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: makeCallExpr('__popFrame', [
              { type: 'Literal', value: endLine },
              makeSnapshotFn(fnBaseScope),
            ]),
          },
        ],
      },
    };

    fnNode.body.body = [...prefixStmts, enterCall, tryFinally];
  }

  function transformExpression(expr: AstNode, scopeVars: string[], parent: AstNode | null = null): void {
    if (!expr || typeof expr !== 'object') return;

    if (expr.type === 'FunctionExpression' || expr.type === 'ArrowFunctionExpression') {
      if (isSkippedCallback(expr, parent)) return;
      let inferredName = expr.id?.name || 'anonymous';
      if (parent?.type === 'VariableDeclarator' && parent.id?.type === 'Identifier') {
        inferredName = parent.id.name;
      } else if (parent?.type === 'MethodDefinition' && parent.key?.type === 'Identifier') {
        inferredName = parent.key.name;
      } else if (parent?.type === 'Property' && parent.key?.type === 'Identifier') {
        inferredName = parent.key.name;
      }
      transformFunctionNode(expr, inferredName, scopeVars, false);
      return;
    }

    if (expr.type === 'ClassExpression') {
      transformClassNode(expr, scopeVars);
      return;
    }

    for (const key of Object.keys(expr)) {
      if (key === 'loc' || key === 'start' || key === 'end') continue;
      const child = expr[key];
      if (Array.isArray(child)) {
        for (const item of child) transformExpression(item, scopeVars, expr);
      } else if (child && typeof child === 'object' && child.type) {
        transformExpression(child, scopeVars, expr);
      }
    }
  }

  function transformClassNode(clsNode: AstNode, scopeVars: string[]): void {
    const hasSuper = Boolean(clsNode.superClass);
    const body = clsNode.body?.body ?? [];
    for (const member of body) {
      if (member.type === 'MethodDefinition' && member.value) {
        const mName =
          member.key?.type === 'Identifier'
            ? member.key.name
            : member.key?.value != null
              ? String(member.key.value)
              : 'method';
        const clsName = clsNode.id?.name ? `${clsNode.id.name}.${mName}` : mName;
        transformFunctionNode(
          member.value,
          clsName,
          scopeVars,
          hasSuper && member.kind === 'constructor'
        );
      }
    }
  }

  function transformStatement(
    stmt: AstNode,
    scopeVars: string[],
    shouldTraceStatements: boolean
  ): AstNode[] {
    if (!stmt) return [];

    // Declarations (never prepend __step before FunctionDeclaration / ClassDeclaration since they hoist)
    if (stmt.type === 'FunctionDeclaration') {
      const fnName = stmt.id?.name ?? 'fn';
      transformFunctionNode(stmt, fnName, scopeVars, false);
      return [stmt];
    }

    if (stmt.type === 'ClassDeclaration') {
      transformClassNode(stmt, scopeVars);
      return [stmt];
    }

    const line = getLine(stmt, 1);

    if (stmt.type === 'BlockStatement') {
      const blockLocals = collectBlockLexicalNames(stmt.body);
      const innerScope = Array.from(new Set([...scopeVars, ...blockLocals]));
      stmt.body = transformBlockStatements(stmt.body, innerScope, shouldTraceStatements);
      return [stmt];
    }

    if (stmt.type === 'ReturnStatement') {
      transformExpression(stmt.argument, scopeVars, stmt);
      if (!shouldTraceStatements) {
        return [stmt];
      }
      const retNode: AstNode = {
        type: 'ReturnStatement',
        argument: makeCallExpr('__ret', [
          { type: 'Literal', value: line },
          {
            type: 'ArrowFunctionExpression',
            id: null,
            params: [],
            body: stmt.argument ?? { type: 'Identifier', name: 'undefined' },
            expression: true,
            async: false,
          },
          makeSnapshotFn(scopeVars),
        ]),
      };
      return [retNode];
    }

    if (stmt.type === 'IfStatement') {
      transformExpression(stmt.test, scopeVars, stmt);
      stmt.consequent = ensureBlock(stmt.consequent);
      if (stmt.consequent) {
        const cLocals = collectBlockLexicalNames(stmt.consequent.body);
        stmt.consequent.body = transformBlockStatements(
          stmt.consequent.body,
          Array.from(new Set([...scopeVars, ...cLocals])),
          shouldTraceStatements
        );
      }
      if (stmt.alternate) {
        if (stmt.alternate.type === 'IfStatement') {
          const altTransformed = transformStatement(stmt.alternate, scopeVars, shouldTraceStatements);
          stmt.alternate =
            altTransformed.length === 1 && altTransformed[0].type === 'IfStatement'
              ? altTransformed[0]
              : { type: 'BlockStatement', body: altTransformed };
        } else {
          stmt.alternate = ensureBlock(stmt.alternate);
          if (stmt.alternate) {
            const aLocals = collectBlockLexicalNames(stmt.alternate.body);
            stmt.alternate.body = transformBlockStatements(
              stmt.alternate.body,
              Array.from(new Set([...scopeVars, ...aLocals])),
              shouldTraceStatements
            );
          }
        }
      }
      return shouldTraceStatements ? [makeStepStmt(line, scopeVars), stmt] : [stmt];
    }

    if (stmt.type === 'ForStatement') {
      const initNames = new Set<string>();
      if (stmt.init?.type === 'VariableDeclaration') {
        for (const decl of stmt.init.declarations) {
          extractPatternNames(decl.id, initNames);
          transformExpression(decl.init, scopeVars, decl);
        }
      } else if (stmt.init) {
        transformExpression(stmt.init, scopeVars, stmt);
      }

      const loopScope = Array.from(new Set([...scopeVars, ...initNames]));
      if (stmt.test) transformExpression(stmt.test, loopScope, stmt);
      if (stmt.update) transformExpression(stmt.update, loopScope, stmt);

      const originalTest = stmt.test ?? { type: 'Literal', value: true };
      if (shouldTraceStatements) {
        stmt.test = {
          type: 'SequenceExpression',
          expressions: [makeGuardExpr(line), makeStepExpr(line, loopScope), originalTest],
        };
      } else {
        stmt.test = {
          type: 'SequenceExpression',
          expressions: [makeGuardExpr(line), originalTest],
        };
      }

      stmt.body = ensureBlock(stmt.body);
      const bodyLocals = collectBlockLexicalNames(stmt.body.body);
      stmt.body.body = transformBlockStatements(
        stmt.body.body,
        Array.from(new Set([...loopScope, ...bodyLocals])),
        shouldTraceStatements
      );
      return [stmt];
    }

    if (stmt.type === 'WhileStatement') {
      transformExpression(stmt.test, scopeVars, stmt);
      if (shouldTraceStatements) {
        stmt.test = {
          type: 'SequenceExpression',
          expressions: [makeGuardExpr(line), makeStepExpr(line, scopeVars), stmt.test],
        };
      } else {
        stmt.test = {
          type: 'SequenceExpression',
          expressions: [makeGuardExpr(line), stmt.test],
        };
      }
      stmt.body = ensureBlock(stmt.body);
      const bodyLocals = collectBlockLexicalNames(stmt.body.body);
      stmt.body.body = transformBlockStatements(
        stmt.body.body,
        Array.from(new Set([...scopeVars, ...bodyLocals])),
        shouldTraceStatements
      );
      return [stmt];
    }

    if (stmt.type === 'DoWhileStatement') {
      transformExpression(stmt.test, scopeVars, stmt);
      stmt.body = ensureBlock(stmt.body);
      const bodyLocals = collectBlockLexicalNames(stmt.body.body);
      const innerScope = Array.from(new Set([...scopeVars, ...bodyLocals]));
      stmt.body.body = [
        { type: 'ExpressionStatement', expression: makeGuardExpr(line) },
        ...transformBlockStatements(stmt.body.body, innerScope, shouldTraceStatements),
      ];
      if (shouldTraceStatements) {
        stmt.test = {
          type: 'SequenceExpression',
          expressions: [makeStepExpr(line, scopeVars), stmt.test],
        };
      }
      return [stmt];
    }

    if (stmt.type === 'ForOfStatement' || stmt.type === 'ForInStatement') {
      transformExpression(stmt.right, scopeVars, stmt);
      const loopVars = new Set<string>();
      if (stmt.left?.type === 'VariableDeclaration') {
        for (const decl of stmt.left.declarations) extractPatternNames(decl.id, loopVars);
      } else if (stmt.left?.type === 'Identifier') {
        loopVars.add(stmt.left.name);
      }
      const loopScope = Array.from(new Set([...scopeVars, ...loopVars]));
      stmt.body = ensureBlock(stmt.body);
      const bodyLocals = collectBlockLexicalNames(stmt.body.body);
      const innerScope = Array.from(new Set([...loopScope, ...bodyLocals]));
      const prefix: AstNode[] = [
        { type: 'ExpressionStatement', expression: makeGuardExpr(line) },
      ];
      if (shouldTraceStatements) {
        prefix.push(makeStepStmt(line, loopScope));
      }
      stmt.body.body = [...prefix, ...transformBlockStatements(stmt.body.body, innerScope, shouldTraceStatements)];
      return [stmt];
    }

    if (stmt.type === 'SwitchStatement') {
      transformExpression(stmt.discriminant, scopeVars, stmt);
      for (const c of stmt.cases ?? []) {
        if (c.test) transformExpression(c.test, scopeVars, c);
        const cLocals = collectBlockLexicalNames(c.consequent);
        c.consequent = transformBlockStatements(
          c.consequent,
          Array.from(new Set([...scopeVars, ...cLocals])),
          shouldTraceStatements
        );
      }
      return shouldTraceStatements ? [makeStepStmt(line, scopeVars), stmt] : [stmt];
    }

    if (stmt.type === 'TryStatement') {
      if (stmt.block) {
        const bLocals = collectBlockLexicalNames(stmt.block.body);
        stmt.block.body = transformBlockStatements(
          stmt.block.body,
          Array.from(new Set([...scopeVars, ...bLocals])),
          shouldTraceStatements
        );
      }
      if (stmt.handler) {
        const errNames = new Set<string>();
        if (stmt.handler.param) extractPatternNames(stmt.handler.param, errNames);
        const hLocals = collectBlockLexicalNames(stmt.handler.body.body);
        stmt.handler.body.body = transformBlockStatements(
          stmt.handler.body.body,
          Array.from(new Set([...scopeVars, ...errNames, ...hLocals])),
          shouldTraceStatements
        );
      }
      if (stmt.finalizer) {
        const fLocals = collectBlockLexicalNames(stmt.finalizer.body);
        stmt.finalizer.body = transformBlockStatements(
          stmt.finalizer.body,
          Array.from(new Set([...scopeVars, ...fLocals])),
          shouldTraceStatements
        );
      }
      return [stmt];
    }

    if (stmt.type === 'VariableDeclaration') {
      for (const decl of stmt.declarations) {
        if (decl.init) transformExpression(decl.init, scopeVars, decl);
      }
      // Skip tracing top-level function definitions like `const dfs = () => ...` before they are called
      const isPureFnDecl = stmt.declarations.every(
        (d: AstNode) =>
          d.init &&
          (d.init.type === 'FunctionExpression' || d.init.type === 'ArrowFunctionExpression')
      );
      if (shouldTraceStatements && !isPureFnDecl) {
        return [makeStepStmt(line, scopeVars), stmt];
      }
      return [stmt];
    }

    if (stmt.type === 'ExpressionStatement') {
      transformExpression(stmt.expression, scopeVars, stmt);
      return shouldTraceStatements ? [makeStepStmt(line, scopeVars), stmt] : [stmt];
    }

    if (stmt.type === 'LabeledStatement') {
      const inner = transformStatement(stmt.body, scopeVars, shouldTraceStatements);
      if (inner.length === 1) {
        stmt.body = inner[0];
        return [stmt];
      }
      stmt.body = { type: 'BlockStatement', body: inner };
      return [stmt];
    }

    if (
      stmt.type === 'BreakStatement' ||
      stmt.type === 'ContinueStatement' ||
      stmt.type === 'ThrowStatement'
    ) {
      if (stmt.argument) transformExpression(stmt.argument, scopeVars, stmt);
      return shouldTraceStatements ? [makeStepStmt(line, scopeVars), stmt] : [stmt];
    }

    return [stmt];
  }

  function transformBlockStatements(
    stmts: AstNode[],
    scopeVars: string[],
    shouldTraceStatements: boolean
  ): AstNode[] {
    const out: AstNode[] = [];
    for (const stmt of stmts) {
      const transformed = transformStatement(stmt, scopeVars, shouldTraceStatements);
      out.push(...transformed);
    }
    return out;
  }

  const rootVars = new Set<string>();
  collectVarDecls(ast, rootVars);
  const rootLocals = collectBlockLexicalNames(ast.body);
  const topScope = Array.from(new Set([...rootVars, ...rootLocals]));
  const traceTop = Boolean(options.traceTopLevel) && !guardOnly;

  ast.body = transformBlockStatements(ast.body, topScope, traceTop);

  if (traceTop) {
    const endLine = getEndLine(ast, 1);
    ast.body = [
      {
        type: 'ExpressionStatement',
        expression: makeCallExpr('__pushFrame', [
          { type: 'Literal', value: 'main' },
          { type: 'Literal', value: 1 },
          makeSnapshotFn(topScope),
        ]),
      },
      {
        type: 'TryStatement',
        block: { type: 'BlockStatement', body: ast.body },
        handler: null,
        finalizer: {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: makeCallExpr('__popFrame', [
                { type: 'Literal', value: endLine },
                makeSnapshotFn(topScope),
              ]),
            },
          ],
        },
      },
    ];
  }

  return { code: generate(ast) };
}
