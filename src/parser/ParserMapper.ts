import {ParserIterator} from "./ParserIterator";
import {BinaryExpr, Expr, GroupingExpr, LiteralExpr, Statement, UnaryExpr} from "./ParserTypes";
import {TokenType} from "../tokenizer/Tokenizer";

export class ParserMapper {


  private statements: Statement[] = []

  constructor(private iterator: ParserIterator) {

  }

  getStatements(): Statement[] {
    this.startParsing()
    return this.statements;
  }

  private startParsing() {
    while (!this.iterator.isAtEnd()) {
      this.statements.push(this.expression())
    }
  }

  private expression(): Expr {
    return this.or();
  }

  private unary(): Expr {

    if (this.iterator.match(TokenType.MINUS, TokenType.NOT)) {
      return new UnaryExpr(
        this.iterator.consume().type,
        this.unary()
      )
    }
    return this.primary()
  }

  private primary(): Statement {

    if (this.iterator.match(TokenType.NUMBER)) {
      return new LiteralExpr(this.iterator.consume().value);
    }
    else if ( this.iterator.match(TokenType.OPEN_BRACKET) ) {
      this.iterator.advanceIf(TokenType.OPEN_BRACKET)
      const expr:Expr = this.expression();
      this.iterator.advanceIf(TokenType.CLOSE_BRACKET)
      return new GroupingExpr(expr)
    }
    // @TODO: cant parse primary.
    throw new Error("cant parse primary expr")
  }

  private equality(): Expr {
    let expression: Expr = this.comparsion()
    while (this.iterator.match(TokenType.EQUALS_EQUALS, TokenType.NOT_EQUALS)) {
      expression = new BinaryExpr(expression, this.iterator.consume().type, this.comparsion())
    }
    return expression;
  }

  private comparsion(): Expr {
    let term: Expr = this.term()
    while (this.iterator.match(TokenType.GREATER_THAN, TokenType.GREATER_THAN_OR_EQUAL_TO, TokenType.LESS_THAN, TokenType.LESSER_THAN_OR_EQUAL_TO)) {
      term = new BinaryExpr(term, this.iterator.consume().type, this.term())
    }
    return term;
  }

  private term() {
    let factor: Expr = this.factor()
    while (this.iterator.match(TokenType.PLUS, TokenType.MINUS)) {
      factor = new BinaryExpr(factor, this.iterator.consume().type, this.factor())
    }
    return factor;
  }


  private factor() {
    let unary: Expr = this.unary()
    while (this.iterator.match(TokenType.MULTIPLY, TokenType.DIVIDE)) {
      unary = new BinaryExpr(unary, this.iterator.consume().type, this.unary())
    }
    return unary;
  }

  private or() {
    let expr:Expr = this.equality();
    while (this.iterator.match(TokenType.LOGICAL_OR)) {
      expr = new BinaryExpr(expr, this.iterator.consume().type, this.equality())
    }
    return expr
  }
}