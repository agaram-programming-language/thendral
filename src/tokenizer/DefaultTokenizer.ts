import {Token, Tokenizer, TokenType} from "./Tokenizer";


export class DefaultTokenizer implements Tokenizer {
  private readonly characters: string[];
  private lineNumber: number;
  private characterPos: number;
  private readonly tokens: Token[];

  constructor(code: string) {
    this.characters = code.split('');
    this.tokens = []
  }


  getTokens(): Token[] {
    return this.tokens;
  }






}
