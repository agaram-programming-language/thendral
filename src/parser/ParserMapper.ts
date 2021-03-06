import {ParserIterator} from "./ParserIterator";
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
} from "./ParserTypes";
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
      this.statements.push(this.statement())
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
    return this.call()
  }

  private primary(): Statement {

    if (this.iterator.match(TokenType.NUMBER)) {
      return new NumericalExpr(parseInt(this.iterator.consume().value));
    }
    else if (this.iterator.match(TokenType.STRING)) {
      return new LiteralExpr(this.iterator.consume().value);
    }
    else if (this.iterator.match(TokenType.OPEN_BRACKET)) {
      this.iterator.advanceIf(TokenType.OPEN_BRACKET)
      const expr: Expr = this.expression();
      this.iterator.advanceIf(TokenType.CLOSE_BRACKET)
      return new GroupingExpr(expr)
    } else if (this.iterator.match(TokenType.TRUE, TokenType.FALSE)) {
      return new BooleanExpr(<any>this.iterator.consume().type)
    }
    else if ( this.iterator.match(TokenType.IDENTIFIER)) {
      return new IdentifierExpr(this.iterator.consume().value)
    }
    // @TODO: cant parse primary.


    throw new Error("cant parse primary expr " + JSON.stringify(this.iterator.unsafeCurrent()) )
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
    let expr: Expr = this.and();
    while (this.iterator.match(TokenType.LOGICAL_OR)) {
      expr = new BinaryExpr(expr, this.iterator.consume().type, this.and())
    }
    return expr
  }

  private and() {
    let expr: Expr = this.equality();
    while (this.iterator.match(TokenType.LOGICAL_AND)) {
      expr = new BinaryExpr(expr, this.iterator.consume().type, this.equality())
    }
    return expr
  }

  private statement():Statement {

    if (this.iterator.match(TokenType.CONSTANT, TokenType.VARIABLE)) {
      return this.variableStatement();
    }
    else if (this.iterator.match(TokenType.IDENTIFIER) && this.iterator.matchNext(TokenType.EQUALS)) {
      return this.assignmentStatement();
    }
    else if ( this.iterator.match(TokenType.PRINT)) {
      return this.printStatement();
    }
    else if (this.iterator.match(TokenType.IF)) {
      return this.ifStatement();
    } else if (this.iterator.match(TokenType.OPEN_BRACE)) {
      return this.blockStatement();
    }
    else if ( this.iterator.match(TokenType.WHILE)) {
      return this.whileStatement();
    }
    else if ( this.iterator.match(TokenType.FUNCTION)) {
      return this.functionStatement();
    }
    else if ( this.iterator.match(TokenType.RETURN)) {
      return this.returnStatement();
    }

    return this.expression();
  }

  private variableStatement() {
    const type: any = this.iterator.consumeIf(TokenType.CONSTANT, TokenType.VARIABLE).type
    const identifier = this.iterator.consumeIf(TokenType.IDENTIFIER).value
    // skip the equals sign
    this.iterator.advanceIf(TokenType.EQUALS)

    const expr = this.expression();
    return new AssignmentExpr(
      identifier,
      type,
      expr
    )
  }

  private ifStatement(): IfStmt {
    // consume the if token.
    this.iterator.advanceIf(TokenType.IF)
    // consume open bracket.
    this.iterator.advanceIf(TokenType.OPEN_BRACKET)
    const expr = this.expression();
    // consume close bracket.
    this.iterator.advanceIf(TokenType.CLOSE_BRACKET)
    // consume then branch
    const thenBranch = this.statement()

    const elseIfStatements = []
    while (! this.iterator.isAtEnd() && this.iterator.match(TokenType.ELSE_IF)) {
      // consume else if tokens.
      this.iterator.advance();
      this.iterator.advanceIf(TokenType.OPEN_BRACKET)
      const expression = this.expression()
      this.iterator.advanceIf(TokenType.CLOSE_BRACKET)
      elseIfStatements.push(new ElseIfStmt(
        expression,
        this.statement()
      ))
    }

    let elseBranch = undefined;

    if ( this.iterator.match(TokenType.ELSE) ) {
      // if else branch exists, then consume it.
      this.iterator.advance() // consume ELSE token
      elseBranch = this.statement();
    }

    return new IfStmt(expr, thenBranch, elseIfStatements, elseBranch)
  }

  private blockStatement():Statement {
    // consume open brace.
    this.iterator.advanceIf(TokenType.OPEN_BRACE)

    const statements: Statement[] = []

    while ((!this.iterator.isAtEnd() && !this.iterator.match(TokenType.CLOSE_BRACE))) {
      statements.push(this.statement())
    }

    // consume close brace.
    this.iterator.advanceIf(TokenType.CLOSE_BRACE)

    return new BlockStmt(statements);

  }

  private whileStatement():Statement {
    // consume while.
    this.iterator.advanceIf(TokenType.WHILE)
    // consume open brace.
    this.iterator.advanceIf(TokenType.OPEN_BRACKET)
    const expression = this.expression();
    this.iterator.advanceIf(TokenType.CLOSE_BRACKET)

    // consume the loop body.
    return new WhileStmt(expression, this.statement());

  }

  private functionStatement():Statement {
    // consume function.
    this.iterator.advanceIf(TokenType.FUNCTION)
    const functionName = this.iterator.consumeIf(TokenType.IDENTIFIER).value
    const identifiers:string[] = []
    this.iterator.advanceIf(TokenType.OPEN_BRACKET)

    if ( ! this.iterator.match(TokenType.CLOSE_BRACKET) ) {
      do {
        identifiers.push(this.iterator.consumeIf(TokenType.IDENTIFIER).value)
      } while (this.iterator.matchAndAdvance(TokenType.COMMA))
    }
    this.iterator.advanceIf(TokenType.CLOSE_BRACKET)
    const body = this.statement();

    return new FunctionStmt(functionName, identifiers, body)
  }

  private call():Expr {
    const expr:Expr = this.primary();

    if (! this.iterator.match(TokenType.OPEN_BRACKET) ) {
      return expr;
    }
    this.iterator.advanceIf(TokenType.OPEN_BRACKET)
    const args:Expr[] = []
    if ( ! this.iterator.match(TokenType.CLOSE_BRACKET) ) {
      do {
        args.push(this.expression())
      } while (this.iterator.matchAndAdvance(TokenType.COMMA))
    }

    this.iterator.advanceIf(TokenType.CLOSE_BRACKET)

    return new CallExpr(expr, args)

  }

  private returnStatement():Statement {
    this.iterator.advanceIf(TokenType.RETURN);
    return new ReturnStmt( this.expression() );
  }

  private assignmentStatement() {

    const identifier = this.iterator.consumeIf(TokenType.IDENTIFIER).value
    // skip the equals sign
    this.iterator.advanceIf(TokenType.EQUALS)

    const expr = this.expression();
    return new AssignmentExpr(
      identifier,
      TokenType.IDENTIFIER,
      expr
    )
  }

  private printStatement() {
    // consume print token.
    this.iterator.advanceIf(TokenType.PRINT)
    return new PrintStmt(this.expression())
  }
}