import {Token, TokenType} from "../tokenizer/Tokenizer";

export interface Statement {

}

export interface Expr extends Statement{

}


export class BinaryExpr implements Expr {

  constructor(
    public left: Expr,
    public operator: TokenType,
    public right: Expr) {
  }
}

export class GroupingExpr implements Expr {

  constructor(public expr:Expr) {
  }

}

export class UnaryExpr implements Expr {
  constructor(public operator: TokenType, public right: Expr) {

  }
}

export class LiteralExpr implements Expr {

    constructor(public value:any) {
    }

}