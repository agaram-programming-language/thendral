import {ParserIterator} from "./ParserIterator";
import {BinaryExpr, Expr, LiteralExpr, Statement, UnaryExpr} from "./ParserTypes";
import {TokenType} from "../tokenizer/Tokenizer";

export class ParserMapper {


  private statements:Statement[] = []

  constructor(private iterator: ParserIterator) {

  }

  getStatements():Statement[] {
    this.startParsing()
    return this.statements;
  }

  private startParsing() {
    while ( ! this.iterator.isAtEnd() ) {
      this.statements.push(this.expression())
    }
  }

  private expression(): Statement {
    return this.equality();
  }

  private unary(): Statement {

    if ( this.iterator.match(TokenType.MINUS) ) {
      return new UnaryExpr(
        this.iterator.consume(),
        this.unary()
      )
    }
    return this.primary()
  }

  private primary():Statement {

    if (this.iterator.match(TokenType.NUMBER)) {
      return new LiteralExpr(this.iterator.consume());
    }
    // @TODO: cant parse primary.
    throw new Error()
  }

  private equality() {
    let expression:Expr = this.comparsion()
    while (this.iterator.match(TokenType.EQUALS_EQUALS, TokenType.)) {
      expression = new BinaryExpr()
    }
    return expression;
  }
}