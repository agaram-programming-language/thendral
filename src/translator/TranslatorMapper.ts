import {TranslatorIterator} from "./TranslatorIterator";
import {AssignmentExpr, Expr, LiteralExpr, NumericalExpr} from "../parser/ParserTypes";
import {TokenType} from "../tokenizer/Tokenizer";

export class TranslatorMapper {

  private lines: string[] = []

  constructor(private iterator: TranslatorIterator) {

  }

  getTranslation():string[] {
    this.startTranslation();
    return this.lines;
  }

  private startTranslation() {
    this.visitStatement();
  }

  private visitStatement() {
    while ( ! this.iterator.isAtEnd() ) {
      const statement = this.iterator.consume()
      if ( statement instanceof AssignmentExpr ) {
        this.visitAssignmentExpr(statement);
      }

    }
  }

  private visitAssignmentExpr(statement: AssignmentExpr) {
    const assignmentType = statement.type === TokenType.CONSTANT ? 'const' : 'var'
    const expr = this.visitExpression(statement.right);
    this.add(`${assignmentType} ${statement.identifier} = ${expr}`)
  }

  private add(s: string) {
    this.lines.push(s)
  }

  private visitExpression(expr: Expr):any {
    if ( expr instanceof LiteralExpr ) {
      return `'${expr.value}'`
    }
    else if ( expr instanceof NumericalExpr ) {
      return expr.value
    }
  }
}