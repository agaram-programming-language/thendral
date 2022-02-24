import {Token, TokenizerFactory, TokenType} from "../tokenizer/Tokenizer";
import {ParserFactory} from "./ParserFactory";
import {UnaryExpr} from "./ParserTypes";

describe("Parser tests", () => {


  it("Test should correctly parse the unary expression", () => {

    const tokens = TokenizerFactory.getTokenizer("-2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    const unaryExpr:UnaryExpr = statements[0] as UnaryExpr
    expect(unaryExpr.operator.type).toEqual(TokenType.MINUS)
    expect(unaryExpr.right.type).toEqual(TokenType.NUMBER)
  });

})