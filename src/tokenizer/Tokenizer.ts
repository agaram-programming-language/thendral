import {DefaultTokenizer} from "./DefaultTokenizer";


export enum TokenType {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  MODULO = '%',
  LESS_THAN_OR_EQUAL_TO = '<=',
  GREATER_THAN_OR_EQUAL_TO = '>=',
  EQUALS_EQUALS = '==',
  OPEN_BRACKET = '(',
  CLOSE_BRACKET = ')',
  OPEN_BRACE = '{',
  CLOSE_BRACE = '}',
  OPEN_SQUARE_BRACKET = '[',
  CLOSE_SQUARE_BRACKET = ']',

  // Logical operators.
  AND = '&&',
  OR = '||'
}

export interface Token {
  lineNumber: number,
  characterPosition: number,
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


