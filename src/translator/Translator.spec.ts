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

  it("Test should translate if loop correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("ஒருவேளை(a == 2){}").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "if ( a == 2 ) {}"
      ])

  });


  it("Test should translate function correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("செயல்பாடு கூட்டல்(a,ச) { }").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "function (a,ச) {}"
      ])

  });



})