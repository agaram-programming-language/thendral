import {Token, Tokenizer, TokenType} from "./Tokenizer";


export class DefaultTokenizer implements Tokenizer {
  private readonly characters: string[];
  private lineNumber: number;
  private characterPos: number;
  private readonly tokens: Token[];

  constructor(code: string) {
    this.characters = code.split('');
    this.lineNumber = 1;
    this.characterPos = 1;
    this.tokens = []
  }

  getTokens(): Token[] {
    this.iterateThroughTokens();
    return this.tokens;
  }

  private consume(): string {
    return this.characters.shift();
  }

  private peek(): string {
    return this.characters[0];
  }

  private iterateThroughTokens() {

    while (!this.isAtEnd()) {
      let token = this.consume();
      // Ignore spaces.
      if (token === ' ') {
        continue;
      }

      token = this.mayBeTwoCharacterToken(token)

      const type = token as TokenType;
      this.tokens.push({
        lineNumber: this.lineNumber,
        characterPosition: this.characterPos,
        tokenType: type
      })
    }

  }

  private isAtEnd() {
    return this.characters.length === 0
  }

  private mayBeTwoCharacterToken(token: string): string {
    // No point in looking when there are no characters left.
    if (this.isAtEnd()) {
      return token
    }

    const currentToken = token + this.peek();

    const validTokens = [
      '<=', '>=', '==', '&&', '||'
    ]

    if ( validTokens.includes(currentToken) ) {
      return token + this.consume();
    }

    return token
  }
}
