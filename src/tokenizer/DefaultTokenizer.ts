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
    // Increase the character position as we consume tokens.
    this.characterPos += 1;
    return this.characters.shift();
  }

  private peek(): string {
    return this.characters[0];
  }

  private advance(): void {
    this.characters.shift()
  }

  private iterateThroughTokens() {

    while (!this.isAtEnd()) {

      let token = this.consume();

      switch (token) {

      }

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

    if (validTokens.includes(currentToken)) {
      return token + this.consume();
    }

    return token
  }
}
