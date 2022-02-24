import {Token} from "../tokenizer/Tokenizer";

export interface Statement {

}


export class BinaryExpr implements Statement {

  constructor(
    private left: Token,
    private operator: Token,
    private right: Token) {

  }

}

export class UnaryExpr implements Statement {
  constructor(public right: Token, public operator?: Token) {

  }
}