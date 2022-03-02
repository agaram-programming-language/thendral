import "jasmine";
import {TokenizerFactory, TokenType} from "./Tokenizer";


describe("Tokenizer Tests", () => {


  it("Test should identify numerical tokens", () => {
    const tokens = TokenizerFactory.getTokenizer("+-*/%").getTokens()

    expect(tokens.map(e => TokenType[e.type])).toEqual(
      [
        TokenType[TokenType.PLUS],
        TokenType[TokenType.MINUS],
        TokenType[TokenType.MULTIPLY],
        TokenType[TokenType.DIVIDE],
        TokenType[TokenType.MODULO],
        TokenType[TokenType.EOF]
      ])
  });


  it("Test should identify two character tokens", () => {
    const tokens = TokenizerFactory.getTokenizer("< > = >= <= == != !").getTokens()

    expect(tokens.map(e => TokenType[e.type])).toEqual(
      [
        TokenType[TokenType.LESS_THAN],
        TokenType[TokenType.GREATER_THAN],
        TokenType[TokenType.EQUALS],
        TokenType[TokenType.GREATER_THAN_OR_EQUAL_TO],
        TokenType[TokenType.LESSER_THAN_OR_EQUAL_TO],
        TokenType[TokenType.EQUALS_EQUALS],
        TokenType[TokenType.NOT_EQUALS],
        TokenType[TokenType.NOT],
        TokenType[TokenType.EOF]

      ])
  });

  it("Test should identify braces and brackets", () => {
    const tokens = TokenizerFactory.getTokenizer("(){}[]").getTokens()
    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.OPEN_BRACKET,
        TokenType.CLOSE_BRACKET,
        TokenType.OPEN_BRACE,
        TokenType.CLOSE_BRACE,
        TokenType.OPEN_SQUARE_BRACKET,
        TokenType.CLOSE_SQUARE_BRACKET,
        TokenType.EOF
      ])
  });


  it("Test should identify logical operators", () => {
    const tokens = TokenizerFactory.getTokenizer("&&||").getTokens()

    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.LOGICAL_AND,
        TokenType.LOGICAL_OR,
        TokenType.EOF
      ])
  });


  it("Test should identify string", () => {
    const tokens = TokenizerFactory.getTokenizer("'random_string'").getTokens()

    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.STRING,
        TokenType.EOF
      ])
    expect(tokens.map(e => e.value)).toEqual(
      [
        'random_string',
        undefined
      ])
  });

  it("Test should identify number", () => {
    const tokens = TokenizerFactory.getTokenizer("12345").getTokens()

    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.NUMBER,
        TokenType.EOF
      ])
    expect(tokens.map(e => e.value)).toEqual(
      [
        '12345',
        undefined
      ])
  });


  it("Test should identify keyword", () => {
    const tokens = TokenizerFactory.getTokenizer("நிலையற்ற நிலையான ஒருவேளை எதுவும்இல்லையென்றால் இல்லையென்றால் இருப்பின்வளையம் ஆகவளையம் ஆ சரி தவறு செயல்பாடு").getTokens()

    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.VARIABLE,
        TokenType.CONSTANT,
        TokenType.IF,
        TokenType.ELSE,
        TokenType.ELSE_IF,
        TokenType.WHILE,
        TokenType.FOR,
        TokenType.IDENTIFIER,
        TokenType.TRUE,
        TokenType.FALSE,
        TokenType.FUNCTION,
        TokenType.EOF
      ])
  });

  it('Test should identify english words as identifier', function () {
    const tokens = TokenizerFactory.getTokenizer("a b c d e").getTokens()

    expect(tokens.map(e => e.type)).toEqual(
      [
        TokenType.IDENTIFIER,
        TokenType.IDENTIFIER,
        TokenType.IDENTIFIER,
        TokenType.IDENTIFIER,
        TokenType.IDENTIFIER,
        TokenType.EOF
      ])
  });


})