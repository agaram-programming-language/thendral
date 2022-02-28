import {TokenizerFactory, TokenType} from "../tokenizer/Tokenizer";
import {ParserFactory} from "./ParserFactory";
import {BinaryExpr, LiteralExpr, UnaryExpr} from "./ParserTypes";

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


})