import {Iterator} from "../iterator/iterator";
import {Statement} from "../parser/ParserTypes";
import {TokenType} from "../tokenizer/Tokenizer";


export class TranslatorIterator extends Iterator<Statement> {


  translateTokenType(operator: TokenType):string {
    switch (operator) {
      case TokenType.PLUS: throw  new Error("foo"); break;
      case TokenType.MINUS: throw  new Error("foo"); break;
      case TokenType.MULTIPLY: throw  new Error("foo"); break;
      case TokenType.DIVIDE: throw  new Error("foo"); break;
      case TokenType.MODULO: throw  new Error("foo"); break;
      case TokenType.LESSER_THAN_OR_EQUAL_TO: throw  new Error("foo"); break;
      case TokenType.GREATER_THAN_OR_EQUAL_TO: throw  new Error("foo"); break;
      case TokenType.EQUALS_EQUALS: return '==';
      case TokenType.OPEN_BRACKET: throw  new Error("foo"); break;
      case TokenType.CLOSE_BRACKET: throw  new Error("foo"); break;
      case TokenType.OPEN_BRACE: throw  new Error("foo"); break;
      case TokenType.CLOSE_BRACE: throw  new Error("foo"); break;
      case TokenType.OPEN_SQUARE_BRACKET: throw  new Error("foo"); break;
      case TokenType.CLOSE_SQUARE_BRACKET: throw  new Error("foo"); break;
      case TokenType.STRING: throw  new Error("foo"); break;
      case TokenType.LESS_THAN: throw  new Error("foo"); break;
      case TokenType.GREATER_THAN: throw  new Error("foo"); break;
      case TokenType.EQUALS: return '=';
      case TokenType.LOGICAL_AND: throw  new Error("foo"); break;
      case TokenType.LOGICAL_OR: throw  new Error("foo"); break;
      case TokenType.NUMBER: throw  new Error("foo"); break;
      case TokenType.VARIABLE: throw  new Error("foo"); break;
      case TokenType.CONSTANT: throw  new Error("foo"); break;
      case TokenType.IF: throw  new Error("foo"); break;
      case TokenType.ELSE: throw  new Error("foo"); break;
      case TokenType.WHILE: throw  new Error("foo"); break;
      case TokenType.TRUE: throw  new Error("foo"); break;
      case TokenType.FALSE: throw  new Error("foo"); break;
      case TokenType.FOR: throw  new Error("foo"); break;
      case TokenType.IDENTIFIER: throw  new Error("foo"); break;
      case TokenType.EOF: throw  new Error("foo"); break;
      case TokenType.NOT_EQUALS: throw  new Error("foo"); break;
      case TokenType.NOT: throw  new Error("foo"); break;
      case TokenType.ELSE_IF: return 'else if';
      case TokenType.FUNCTION: throw  new Error("foo"); break;
      case TokenType.COMMA: throw  new Error("foo"); break;
      case TokenType.RETURN: throw  new Error("foo"); break;
    }
  }
}