import "jasmine";
import {TokenizerFactory, TokenType} from "./Tokenizer";


describe("Tokenizer Tests", () => {


  it("Test should identify numerical tokens", () => {
    const tokens = TokenizerFactory.getTokenizer("+-*/%").getTokens()
    expect(tokens.length).toEqual(5)
    expect(tokens.map(e => e.tokenType)).toEqual(
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
    console.log(tokens)
    expect(tokens.length).toEqual(3)
    expect(tokens.map(e => e.tokenType)).toEqual(
      [
        TokenType.GREATER_THAN_OR_EQUAL_TO,
        TokenType.LESS_THAN_OR_EQUAL_TO,
        TokenType.EQUALS_EQUALS,
      ])
  });

  it("Test should identify braces and brackets", () => {
    const tokens = TokenizerFactory.getTokenizer("(){}[]").getTokens()
    console.log(tokens)
    expect(tokens.length).toEqual(6)
    expect(tokens.map(e => e.tokenType)).toEqual(
      [
        TokenType.OPEN_BRACKET,
        TokenType.CLOSE_BRACKET,
        TokenType.OPEN_BRACE,
        TokenType.CLOSE_BRACE,
        TokenType.OPEN_SQUARE_BRACKET,
        TokenType.CLOSE_SQUARE_BRACKET,
      ])
  });


})