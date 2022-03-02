import {DefaultTokenizer} from "./DefaultTokenizer";


export enum TokenType {
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
  MODULO = 'MODULO',
  LESSER_THAN_OR_EQUAL_TO = 'LESSER_THAN_OR_EQUAL_TO',
  GREATER_THAN_OR_EQUAL_TO = 'GREATER_THAN_OR_EQUAL_TO',
  EQUALS_EQUALS = 'EQUALS_EQUALS',
  OPEN_BRACKET = 'OPEN_BRACKET',
  CLOSE_BRACKET = 'CLOSE_BRACKET',
  OPEN_BRACE = 'OPEN_BRACE',
  CLOSE_BRACE = 'CLOSE_BRACE',
  OPEN_SQUARE_BRACKET = 'OPEN_SQUARE_BRACKET',
  CLOSE_SQUARE_BRACKET = 'CLOSE_SQUARE_BRACKET',
  STRING = 'STRING',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN = 'GREATER_THAN',
  EQUALS = 'EQUALS',
  LOGICAL_AND = 'LOGICAL_AND',
  LOGICAL_OR = 'LOGICAL_OR',
  NUMBER = 'NUMBER',
  VARIABLE = 'VARIABLE',
  CONSTANT = 'CONSTANT',
  IF = 'IF',
  ELSE = 'ELSE',
  WHILE = 'WHILE',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  FOR = 'FOR',
  IDENTIFIER = 'IDENTIFIER',
  EOF = 'EOF',
  NOT_EQUALS = 'NOT_EQUALS',
  NOT = 'NOT',
  ELSE_IF = 'ELSE_IF',
  FUNCTION = 'FUNCTION',
  COMMA = 'COMMA',
  RETURN = 'RETURN',
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


