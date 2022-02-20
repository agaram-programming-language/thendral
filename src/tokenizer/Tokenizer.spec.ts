import "jasmine";
import {TokenizerFactory, TokenType} from "./Tokenizer";


describe("Tokenizer Tests", () => {



  it("Test should identify valid tokens", () => {
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

  //
  // it("Test should throw exception for invalid token", () => {
  //   expect( TokenizerFactory.getTokenizer("").getTokens()).toThrowError(4)
  // });
  //
  //


})