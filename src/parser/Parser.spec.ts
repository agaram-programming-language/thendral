import {TokenizerFactory} from "../tokenizer/Tokenizer";
import {ParserFactory} from "./ParserFactory";
import {UnaryExpr} from "./ParserTypes";

describe("Parser tests", () => {


  it("Test should correctly parse the unary expression", () => {

    const tokens = TokenizerFactory.getTokenizer("-2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0] instanceof UnaryExpr ).toBeTrue()
  });

})