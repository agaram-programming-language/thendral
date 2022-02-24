import {TokenizerFactory, TokenType} from "../tokenizer/Tokenizer";
import {ParserFactory} from "./ParserFactory";

describe("Parser tests", () => {


  it("Test should correctly parse the binary expression", () => {

    const tokens = TokenizerFactory.getTokenizer("2+2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0] instanceof BinaryExpr ).toBeTrue()
  });

})