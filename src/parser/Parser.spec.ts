import {TokenizerFactory, TokenType} from "../tokenizer/Tokenizer";
import {ParserFactory} from "./ParserFactory";
import {LiteralExpr, UnaryExpr} from "./ParserTypes";

describe("Parser tests", () => {


  it("Test should correctly parse the unary expression", () => {

    const tokens = TokenizerFactory.getTokenizer("-2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    console.log(statements)
    const unaryExpr:UnaryExpr = statements[0] as UnaryExpr
    expect(unaryExpr.operator.type).toEqual(TokenType.MINUS)
    expect(unaryExpr.right instanceof LiteralExpr).toBeTrue()
    expect((unaryExpr.right as LiteralExpr).value.type).toEqual(TokenType.NUMBER)
  });

})