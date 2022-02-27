import {Token} from "../tokenizer/Tokenizer";

export interface Statement {

}


export class BinaryExpr implements Statement {

  constructor(
    public left: Statement,
    public operator: Token,
    public right: Statement) {

  }

}

export class UnaryExpr implements Statement {
  constructor(public operator: Token, public right: Statement) {

  }
}

export class LiteralExpr implements Statement {

    constructor(public value:Token) {
    }

}