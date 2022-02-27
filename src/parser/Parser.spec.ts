import {TokenizerFactory, TokenType} from "../tokenizer/Tokenizer";
import {ParserFactory} from "./ParserFactory";
import {LiteralExpr, UnaryExpr} from "./ParserTypes";

describe("Parser tests", () => {


  it("Test should correctly parse the unary expression", () => {
    const tokens = TokenizerFactory.getTokenizer("-2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    const unaryExpr:UnaryExpr = statements[0] as UnaryExpr
    expect(unaryExpr.operator.type).toEqual(TokenType.MINUS)
    expect(unaryExpr.right instanceof LiteralExpr).toBeTrue()
    expect((unaryExpr.right as LiteralExpr).value.type).toEqual(TokenType.NUMBER)
  });


  it("Test should correctly parse the unary expression with mutliple signs", () => {
    const tokens = TokenizerFactory.getTokenizer("--2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    const unaryExpr:UnaryExpr = statements[0] as UnaryExpr
    expect(unaryExpr.operator.type).toEqual(TokenType.MINUS)
    expect(unaryExpr.right instanceof UnaryExpr).toBeTrue()
    const nestedExpr = unaryExpr.right as UnaryExpr
    expect(nestedExpr.right instanceof LiteralExpr).toBeTrue()
    expect((nestedExpr.right as LiteralExpr).value.type).toEqual(TokenType.NUMBER)
    expect((nestedExpr.right as LiteralExpr).value.value).toEqual("2")
  });




})