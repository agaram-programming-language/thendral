import {DefaultTokenizer} from "./DefaultTokenizer";


export enum TokenType {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  MODULO = '%',
  LESS_THAN_OR_EQUAL_TO = '<=',
}

export interface Token {
    lineNumber:number,
    characterPosition:number,
    tokenType: TokenType
  }

  export interface Tokenizer {
    getTokens(): Token[]
  }

  export class TokenizerFactory {
    static getTokenizer(code: string): Tokenizer {
      return new DefaultTokenizer(code)
    }
  }


