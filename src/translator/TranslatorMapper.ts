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
  NumericalExpr,
  ReturnStmt, Statement,
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
    console.log(this.lines)
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
  }

  private visitBinaryExpr(e: BinaryExpr):string {
    const left = this.visitExpression( e.left )
    const operator = this.iterator.translateTokenType( e.operator );
    const right = this.visitExpression( e.right )
    return `${left} ${operator} ${right}`
  }

  private visitGroupingExpr(e: GroupingExpr) {
    return this.visitExpression(e.expr)
  }

  private visitUnaryExpr(e: UnaryExpr) {
    throw new Error("not implemented")
  }

  private visitLiteralExpr(e: LiteralExpr): string {
    return `'${e.value}'`;
  }

  private visitCallExpr(e: CallExpr) {
    throw new Error("not implemented")
  }

  private visitIdentifierExpr(e: IdentifierExpr):string {
    return `${e.identifier}`
  }

  private visitNumericalExpr(e: NumericalExpr): any {
    return e.value;
  }

  private visitAssignmentExpr(e: AssignmentExpr):string {
    const assignmentType = e.type === TokenType.CONSTANT ? 'const' : 'var'
    const expr = this.visitExpression(e.right);
    return `${assignmentType} ${e.identifier} = ${expr}`
  }

  private visitIfStmt(e: IfStmt) {

    const expr = this.visitExpression(e.expr)
    const thenBranch = this.visitStatement(e.thenBranch)
    return `if ( ${expr} ) {${thenBranch}}`
  }

  private visitWhileStmt(e: WhileStmt) {
    throw new Error("not implemented")
  }

  private visitElseIfStmt(e: ElseIfStmt) {
    throw new Error("not implemented")
  }

  private visitBlockStmt(e: BlockStmt) {

    if ( e.statements.length === 0) {
      return  ''
    }

    return e.statements.map(e => this.visitStatement(e))
      .join("\n");
  }

  private visitReturnStmt(e: ReturnStmt) {
    throw new Error("not implemented")
  }

  private visitFunctionStmt(e: FunctionStmt) {
      return `function ${e.identifier} (${e.parameters.join(",")}) {${this.visitStatement(e.body)}}`
  }

  private visitBooleanExpr(e: BooleanExpr) {
    return e.type === TokenType.TRUE ? 'true' : 'false';
  }

}