import {Token, TokenType} from "../tokenizer/Tokenizer";

export interface Statement {

}

export interface Expr extends Statement {

}


export class BinaryExpr implements Expr {

  constructor(
    public left: Expr,
    public operator: TokenType,
    public right: Expr) {
  }
}

export class GroupingExpr implements Expr {

  constructor(public expr: Expr) {
  }

}

export class UnaryExpr implements Expr {
  constructor(public operator: TokenType, public right: Expr) {

  }
}

export class LiteralExpr implements Expr {

  constructor(public value: any) {
  }

}

export class CallExpr implements Expr {
  constructor(public functionName:Expr, public args:Expr[]) {
  }

}

export class IdentifierExpr implements Expr {
  constructor(public identifier:string) {
  }

}

export class NumericalExpr implements Expr {

  constructor(public value: number) {
  }

}


export class AssignmentExpr implements Expr {

  constructor(public identifier: string, public type: TokenType.CONSTANT| TokenType.VARIABLE|TokenType.IDENTIFIER, public right: Expr) {
  }
}

export class IfStmt implements Statement {
  constructor(public expr:Expr, public thenBranch:Statement, public elseIfBranches: ElseIfStmt[], public elseBranch?:Statement ) {
  }
}

export class WhileStmt implements Statement {
  constructor(public expr:Expr, public statement:Statement ) {
  }
}

export class ElseIfStmt implements Statement {
  constructor(public expr:Expr, public statement:Statement) {
  }
}

export class BlockStmt implements Statement {
  constructor(public statements: Statement[]) {
  }
}

export class ReturnStmt implements Statement {
  constructor(public expr: Expr) {
  }
}

export class FunctionStmt implements Statement {

  constructor(public identifier:string, public parameters:string[], public body:Statement ) {
  }
}

export class BooleanExpr implements Expr {
  constructor(public type: TokenType.TRUE | TokenType.FALSE) {
  }
}