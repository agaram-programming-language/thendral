import { TokenIterator } from "./TokenIterator";
import {Token, Tokenizer, TokenType} from "./Tokenizer";
import {TokenMapper} from "./TokenMapper";


export class DefaultTokenizer implements Tokenizer {

  private readonly tokens: Token[];
  private readonly tokenMapper: TokenMapper;

  constructor(code: string) {
    this.tokenMapper = new TokenMapper(
      new TokenIterator(code.split(''))
    )
    this.tokens = []
  }




  getTokens(): Token[] {
    return this.tokenMapper.mapTokens();
  }


}
