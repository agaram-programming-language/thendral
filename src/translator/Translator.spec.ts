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
        "function கூட்டல் (a,ச) {}"
      ])

  });

  it("Test should translate unary expression correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("--1").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "--1"
      ])

  });

  it("Test should translate unary expression correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("நிலையான a = சரி").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "const a = true"
      ])

  });


  it("Test should translate call expression correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("கூட்டல்(a,ச)").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "கூட்டல்(a,ச)"
      ])

  });

  it("Test should translate group expression correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("(1+1)").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "( 1 + 1 )"
      ])
  });


  it("Test should translate return statement correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("திருப்பு 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "return 2"
      ])
  });

  it("Test should while loop correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("இருப்பின்வளையம்(a > 20){}").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "while ( a > 20 ) {}"
      ])
  });

  it("Test should translate block statement correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("{ a=a+2 }").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "{ a = a + 2 }"
      ])
  });



  it("Test should translate if loop with else if branches correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("ஒருவேளை(a == 2){} இல்லையென்றால்(b==2){} எதுவும்இல்லையென்றால்{}").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "if ( a == 2 ) {}\nelseif ( b == 2 ) {}\nelse {}"
      ])
  });


  it("Test should translate print statement correctly", () => {

    const tokens = TokenizerFactory.getTokenizer("எழுது 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse();
    const translation = TranslatorFactory.getTranslator(statements).translate();

    expect(translation).toEqual(
      [
        "document.write( 2 )"
      ])
  });




})