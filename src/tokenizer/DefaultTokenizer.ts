import {Token, Tokenizer} from "./Tokenizer";


export class DefaultTokenizer implements Tokenizer {
    constructor(code: string) {
    }


    getTokens(): Token[] {
      return [];
    }

  }


