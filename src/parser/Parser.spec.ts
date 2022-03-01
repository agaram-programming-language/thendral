import {TokenizerFactory, TokenType} from "../tokenizer/Tokenizer";
import {ParserFactory} from "./ParserFactory";
import {AssignmentExpr, BinaryExpr, GroupingExpr, LiteralExpr, UnaryExpr} from "./ParserTypes";

describe("Parser tests", () => {


  it("Test should correctly parse the unary expression", () => {
    const expectedStructure = new UnaryExpr(
      TokenType.MINUS,
      new LiteralExpr("2")
    )
    const tokens = TokenizerFactory.getTokenizer("-2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });


  it("Test should correctly parse the unary expression with mutliple signs", () => {
    const tokens = TokenizerFactory.getTokenizer("--2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    const expectedStructure = new UnaryExpr(
      TokenType.MINUS,
      new UnaryExpr(
        TokenType.MINUS,
        new LiteralExpr("2")
      )
    )
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse the binary expression", () => {
    const expectedStructure = new BinaryExpr(
      new UnaryExpr(TokenType.MINUS, new LiteralExpr("2")),
      TokenType.PLUS,
      new LiteralExpr("2")
    )
    const tokens = TokenizerFactory.getTokenizer("-2 + 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });


  it("Test should correctly parse the grouping expression", () => {
    const expectedStructure = new GroupingExpr(
      new BinaryExpr(
        new LiteralExpr("2"),
        TokenType.PLUS,
        new LiteralExpr("2")
      )
    )
    const tokens = TokenizerFactory.getTokenizer("(2 + 2)").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse comparsion operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new LiteralExpr("2"),
        TokenType.GREATER_THAN,
        new LiteralExpr("2")
      )

    const tokens = TokenizerFactory.getTokenizer("2 > 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });


  it("Test should correctly parse equality operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new LiteralExpr("2"),
        TokenType.EQUALS_EQUALS,
        new LiteralExpr("2")
      )

    const tokens = TokenizerFactory.getTokenizer("2 == 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse or operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new LiteralExpr("2"),
        TokenType.LOGICAL_OR,
        new LiteralExpr("2")
      )

    const tokens = TokenizerFactory.getTokenizer("2 || 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse and operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new LiteralExpr("2"),
        TokenType.LOGICAL_AND,
        new LiteralExpr("2")
      )

    const tokens = TokenizerFactory.getTokenizer("2 && 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("test should correctly parse variable assignment", () => {

    const expectedStructure =
      new AssignmentExpr(
        "a",
        TokenType.CONSTANT,
        new LiteralExpr("2")
      )

    const tokens = TokenizerFactory.getTokenizer("நிலையான a = 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)

  })



})