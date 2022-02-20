import "jasmine";
import {TokenizerFactory, TokenType} from "./Tokenizer";


describe("Tokenizer Tests", () => {


  it("Test should identify numerical tokens", () => {
    const tokens = TokenizerFactory.getTokenizer("+-*/%").getTokens()
    expect(tokens.length).toEqual(5)
    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.PLUS,
        TokenType.MINUS,
        TokenType.MULTIPLY,
        TokenType.DIVIDE,
        TokenType.MODULO
      ])
  });


  it("Test should identify two character tokens", () => {
    const tokens = TokenizerFactory.getTokenizer("< > = >= <= ==").getTokens()
    expect(tokens.length).toEqual(6)
    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.LESS_THAN,
        TokenType.GREATER_THAN,
        TokenType.EQUALS,
        TokenType.GREATER_THAN_OR_EQUAL_TO,
        TokenType.LESS_THAN_OR_EQUAL_TO,
        TokenType.EQUALS_EQUALS,

      ])
  });

  it("Test should identify braces and brackets", () => {
    const tokens = TokenizerFactory.getTokenizer("(){}[]").getTokens()
    expect(tokens.length).toEqual(6)
    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.OPEN_BRACKET,
        TokenType.CLOSE_BRACKET,
        TokenType.OPEN_BRACE,
        TokenType.CLOSE_BRACE,
        TokenType.OPEN_SQUARE_BRACKET,
        TokenType.CLOSE_SQUARE_BRACKET,
      ])
  });


  it("Test should identify logical operators", () => {
    const tokens = TokenizerFactory.getTokenizer("&&||").getTokens()
    expect(tokens.length).toEqual(2)
    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.LOGICAL_AND,
        TokenType.LOGICAL_OR,
      ])
  });


  it("Test should identify string", () => {
    const tokens = TokenizerFactory.getTokenizer("'random_string'").getTokens()
    expect(tokens.length).toEqual(1)
    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.STRING,
      ])
    expect(tokens.map(e => e.value)).toEqual(
      [
        'random_string',
      ])
  });

  it("Test should identify number", () => {
    const tokens = TokenizerFactory.getTokenizer("12345").getTokens()
    expect(tokens.length).toEqual(1)
    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.NUMBER,
      ])
    expect(tokens.map(e => e.value)).toEqual(
      [
        '12345',
      ])
  });


})