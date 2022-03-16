import {TranslatorIterator} from "./TranslatorIterator";
import {
  AssignmentExpr,
  BinaryExpr,
  BlockStmt,
  BooleanExpr,
  CallExpr,
  ElseIfStmt,
  Expr,
  FunctionStmt,
  GroupingExpr,
  IdentifierExpr,
  IfStmt,
  LiteralExpr,
  NumericalExpr, PrintStmt,
  ReturnStmt,
  Statement,
  UnaryExpr,
  WhileStmt
} from "../parser/ParserTypes";
import {TokenType} from "../tokenizer/Tokenizer";

export class TranslatorMapper {

  private lines: string[] = []

  constructor(private iterator: TranslatorIterator) {

  }

  getTranslation(): string[] {
    this.startTranslation();
    return this.lines;
  }

  private startTranslation() {
    this.translate();
  }

  private translate() {
    while (!this.iterator.isAtEnd()) {
      const statement = this.iterator.consume()
      this.add(this.visitStatement(statement))
    }
  }

  private add(s: string) {
    this.lines.push(s)
  }

  private visitStatement(stmt: Statement):any {

    if ( stmt instanceof IfStmt ) {
      return this.visitIfStmt(stmt)
    }
    else if (stmt instanceof BlockStmt) {
      return this.visitBlockStmt(stmt)
    }
    else if ( stmt instanceof FunctionStmt ){
      return this.visitFunctionStmt(stmt)
    }
    else if ( stmt instanceof ReturnStmt ) {
      return this.visitReturnStmt(stmt)
    }
    else if  (stmt instanceof WhileStmt ) {
      return this.visitWhileStmt(stmt);
    }
    else if ( stmt instanceof PrintStmt ) {
      return this.visitPrintStmt(stmt)
    }

    return this.visitExpression(stmt);
  }

  private visitExpression(expr: Expr): string {
    if (expr instanceof LiteralExpr) {
      return this.visitLiteralExpr(expr)
    } else if (expr instanceof NumericalExpr) {
      return this.visitNumericalExpr(expr)
    }
    else if (expr instanceof AssignmentExpr ) {
      return this.visitAssignmentExpr(expr)
    }
    else if (expr instanceof BinaryExpr) {
      return this.visitBinaryExpr(expr)
    }
    else if ( expr instanceof IdentifierExpr ) {
      return this.visitIdentifierExpr(expr);
    }
    else if (expr instanceof UnaryExpr) {
      return this.visitUnaryExpr(expr)
    }
    else if ( expr instanceof  BooleanExpr ) {
      return this.visitBooleanExpr(expr)
    }
    else if (expr instanceof CallExpr ){
      return this.visitCallExpr(expr)
    }
    else if ( expr instanceof GroupingExpr ) {
      return this.visitGroupingExpr(expr)
    }
  }

  private visitBinaryExpr(e: BinaryExpr):string {
    const left = this.visitExpression( e.left )
    const operator = this.iterator.translateTokenType( e.operator );
    const right = this.visitExpression( e.right )
    return `${left} ${operator} ${right}`
  }

  private visitGroupingExpr(e: GroupingExpr) {
    return `( `  + this.visitExpression(e.expr) + ` )`
  }

  private visitUnaryExpr(e: UnaryExpr) {
    return `${this.iterator.translateTokenType(e.operator)}${this.visitExpression(e.right)}`
  }

  private visitLiteralExpr(e: LiteralExpr): string {
    return `'${e.value}'`;
  }

  private visitCallExpr(e: CallExpr):string {
    const args = e.args.map(el => this.visitExpression(el))
      .join(",")
    return `${this.visitExpression(e.functionName)}(${args})`
  }

  private visitIdentifierExpr(e: IdentifierExpr):string {
    return `${e.identifier}`
  }

  private visitNumericalExpr(e: NumericalExpr): any {
    return e.value;
  }

  private visitAssignmentExpr(e: AssignmentExpr):string {
    const expr = this.visitExpression(e.right);
    if ( e.type === TokenType.IDENTIFIER ) {
      return `${e.identifier} = ${expr}`
    }

    const assignmentType = e.type === TokenType.CONSTANT ? 'const' : 'var'

    return `${assignmentType} ${e.identifier} = ${expr}`
  }

  private visitIfStmt(e: IfStmt) {

    const expr = this.visitExpression(e.expr)
    const thenBranch = this.visitStatement(e.thenBranch)
    let parts = '';
    if ( e.elseIfBranches.length !== 0 ) {
      parts += e.elseIfBranches.map(elseIfBranch => this.visitElseIfStmt(elseIfBranch)).join("\n")
    }
    if ( e.elseBranch !== undefined ) {
      parts += `\nelse ${this.visitStatement(e.elseBranch)}`
    }

    if ( parts !== '') {
      return `if ( ${expr} ) ${thenBranch}\n` + parts
    }

    return `if ( ${expr} ) ${thenBranch}`
  }

  private visitWhileStmt(e: WhileStmt) {
    return `while ( ${this.visitExpression(e.expr)} ) ${this.visitStatement(e.statement)}`
  }

  private visitElseIfStmt(e: ElseIfStmt) {
    return `else if ( ${this.visitExpression(e.expr)} ) ${this.visitStatement(e.statement)}`
  }

  private visitPrintStmt(e:PrintStmt) {
    return `thendralPrint( ${this.visitExpression(e.expr)} )`
  }

  private visitBlockStmt(e: BlockStmt) {

    if ( e.statements.length === 0) {
      return  '{}'
    }

    return '{ ' + e.statements.map(e => this.visitStatement(e))
      .join("\n") + ' }';
  }

  private visitReturnStmt(e: ReturnStmt) {
    return `return ${this.visitExpression(e.expr)}`
  }

  private visitFunctionStmt(e: FunctionStmt) {
      return `function ${e.identifier} (${e.parameters.join(",")}) ${this.visitStatement(e.body)}`
  }

  private visitBooleanExpr(e: BooleanExpr) {
    return e.type === TokenType.TRUE ? 'true' : 'false';
  }

}