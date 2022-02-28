import {Token} from "../tokenizer/Tokenizer";

export interface Statement {

}

export interface Expr extends Statement{

}


export class BinaryExpr implements Expr {

  constructor(
    public left: Expr,
    public operator: Token,
    public right: Expr) {

  }

}

export class UnaryExpr implements Expr {
  constructor(public operator: Token, public right: Expr) {

  }
}

export class LiteralExpr implements Expr {

    constructor(public value:Token) {
    }

}