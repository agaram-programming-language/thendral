import {DefaultTokenizer} from "./DefaultTokenizer";


export enum TokenType {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/'
}

export interface Token {
    lineNumber:string,
    characterPosition:string,
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


