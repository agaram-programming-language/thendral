import {DefaultTokenizer} from "./DefaultTokenizer";


export enum TokenType {
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  MODULO,
  LESS_THAN_OR_EQUAL_TO,
  GREATER_THAN_OR_EQUAL_TO,
  EQUALS_EQUALS,
  OPEN_BRACKET,
  CLOSE_BRACKET,
  OPEN_BRACE,
  CLOSE_BRACE,
  OPEN_SQUARE_BRACKET,
  CLOSE_SQUARE_BRACKET,

  OR,
  KEYWORD,
  STRING,
  LESS_THAN,
  GREATER_THAN,
  EQUALS,

  LOGICAL_AND,
  LOGICAL_OR,
  NUMBER,
  VARIABLE,
  CONSTANT,
  IF,
  ELSE,
  WHILE,
  TRUE,
  FALSE,
  FOR,
  IDENTIFIER,
  EOF,
  NOT_EQUALS,
}


export interface Token {
  lineNumber: number,
  characterPosition: number,
  type: TokenType,
  value?: string
}

export interface Tokenizer {
  getTokens(): Token[]
}

export class TokenizerFactory {
  static getTokenizer(code: string): Tokenizer {
    return new DefaultTokenizer(code)
  }
}


