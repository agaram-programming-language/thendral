import {Token, Tokenizer} from "./Tokenizer";


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
    // @TODO
    return '';
  }

  private iterateThroughTokens() {

    while (this.characters.length !== 0) {
      const character = this.consume();
    }

  }

}
