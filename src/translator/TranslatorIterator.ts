import {Iterator} from "../iterator/iterator";
import {Statement} from "../parser/ParserTypes";
import {TokenType} from "../tokenizer/Tokenizer";


export class TranslatorIterator extends Iterator<Statement> {


  translateTokenType(operator: TokenType):string {
    switch (operator) {
      case TokenType.PLUS: return '+';
      case TokenType.MINUS: return '-';
      case TokenType.MULTIPLY: return '*';
      case TokenType.DIVIDE: return '/';
      case TokenType.MODULO: return '%';
      case TokenType.LESSER_THAN_OR_EQUAL_TO: return '<=';
      case TokenType.GREATER_THAN_OR_EQUAL_TO: return '>=';
      case TokenType.EQUALS_EQUALS: return '==';
      case TokenType.OPEN_BRACKET: return '(';
      case TokenType.CLOSE_BRACKET: return ')';
      case TokenType.OPEN_BRACE: return '{';
      case TokenType.CLOSE_BRACE: return '}';
      case TokenType.OPEN_SQUARE_BRACKET: return '[';
      case TokenType.CLOSE_SQUARE_BRACKET: return ']';
      case TokenType.LESS_THAN: return '<';
      case TokenType.GREATER_THAN: return '>';
      case TokenType.EQUALS: return '=';
      case TokenType.LOGICAL_AND: return '&&';
      case TokenType.LOGICAL_OR: return '||';
    }
  }
}