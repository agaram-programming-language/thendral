import "jasmine";
import {TokenizerFactory, TokenType} from "./Tokenizer";


describe("Tokenizer Tests", () => {



  it("Test should identify numerical tokens", () => {
    const tokens = TokenizerFactory.getTokenizer("+-*/%").getTokens()
    expect(tokens.length).toEqual(5)
    expect(tokens.map(e=>e.tokenType)).toEqual(
      [
          TokenType.PLUS,
          TokenType.MINUS,
          TokenType.MULTIPLY,
          TokenType.DIVIDE,
          TokenType.MODULO
      ])
  });


  it("Test should identify two character tokens", () => {
    const tokens = TokenizerFactory.getTokenizer(">= <= ==").getTokens()
    expect(tokens.length).toEqual(5)
    expect(tokens.map(e=>e.tokenType)).toEqual(
      [
        TokenType.LESS_THAN_OR_EQUAL_TO,
        TokenType.GREATER_THAN_OR_EQUAL_TO,
        TokenType.EQUALS_EQUALS,
      ])
  });




})