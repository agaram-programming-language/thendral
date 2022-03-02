import {TokenizerFactory, TokenType} from "../tokenizer/Tokenizer";
import {ParserFactory} from "../parser/ParserFactory";
import {TranslatorFactory} from "./Translator";

describe("Translator Tests", () => {


  it("Test should translate variable assignment correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("நிலையற்ற a = '2'").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "var a = '2'"
      ])

  });

})