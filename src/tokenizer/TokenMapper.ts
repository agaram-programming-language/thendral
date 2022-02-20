import {TokenIterator} from "./TokenIterator";
import {Token, TokenType} from "./Tokenizer";

export class TokenMapper {

  private readonly tokens: Token[] = []

  constructor(private iterator: TokenIterator) {

  }

  mapTokens(): Token[] {

    while (!this.iterator.isAtEnd()) {

      const token = this.iterator.consume()

      switch (token) {

        case '+':
          this.addToken(TokenType.PLUS)
          break
        case '-':
          this.addToken(TokenType.MINUS)
          break
        case '/':
          this.addToken(TokenType.DIVIDE)
          break
        case '*':
          this.addToken(TokenType.MULTIPLY)
          break
        case '%':
          this.addToken(TokenType.MODULO)
          break


      }

    }

    return this.tokens;
  }

  addToken(type: TokenType) {
    this.tokens.push({
      type: type,
      lineNumber: 1,
      characterPosition: 1
    })
  }


}