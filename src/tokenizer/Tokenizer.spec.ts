import "jasmine";
import {TokenizerFactory, TokenType} from "./Tokenizer";


describe("Tokenizer Tests", () => {


  it("Test should identify numerical tokens", () => {
    const tokens = TokenizerFactory.getTokenizer("+-*/%").getTokens()
    expect(tokens.length).toEqual(5)
    expect(tokens.map(e => TokenType[e.type])).toEqual(
      [
        TokenType[TokenType.PLUS],
        TokenType[TokenType.MINUS],
        TokenType[TokenType.MULTIPLY],
        TokenType[TokenType.DIVIDE],
        TokenType[TokenType.MODULO]
      ])
  });


  it("Test should identify two character tokens", () => {
    const tokens = TokenizerFactory.getTokenizer("< > = >= <= ==").getTokens()
    console.log(tokens)
    expect(tokens.length).toEqual(6)
    expect(tokens.map(e => TokenType[e.type])).toEqual(
      [
        TokenType[TokenType.LESS_THAN],
        TokenType[TokenType.GREATER_THAN],
        TokenType[TokenType.EQUALS],
        TokenType[TokenType.GREATER_THAN_OR_EQUAL_TO],
        TokenType[TokenType.LESS_THAN_OR_EQUAL_TO],
        TokenType[TokenType.EQUALS_EQUALS],

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


  it("Test should identify keyword", () => {
    const tokens = TokenizerFactory.getTokenizer("நிலையற்ற நிலையான ஒருவேளை இல்லையென்றால் இருப்பின்வளையம் உண்மை பொய் ஆகவளையம்").getTokens()
    expect(tokens.length).toEqual(1)
    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.VARIABLE,
        TokenType.CONSTANT,
        TokenType.IF,
        TokenType.ELSE,
        TokenType.WHILE,
        TokenType.TRUE,
        TokenType.FALSE,
        TokenType.FOR
      ])
  });


})