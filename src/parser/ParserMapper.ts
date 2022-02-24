import {ParserIterator} from "./ParserIterator";
import {LiteralExpr, Statement, UnaryExpr} from "./ParserTypes";
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
    return this.unary();
  }

  private unary(): Statement {
    console.log("trying to match minus")
    if ( this.iterator.match(TokenType.MINUS) ) {
      return new UnaryExpr(
        this.iterator.consume(),
        this.unary()
      )
    }
    return this.primary()
  }

  private primary():Statement {
    console.log("calling primary()")
    if (this.iterator.match(TokenType.NUMBER)) {
      return new LiteralExpr(this.iterator.consume());
    }
    // @TODO: cant parse primary.
    throw new Error()
  }
}