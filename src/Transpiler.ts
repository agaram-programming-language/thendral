import {TokenizerFactory} from "./tokenizer/Tokenizer";
import {ParserFactory} from "./parser/ParserFactory";
import {TranslatorFactory} from "./translator/Translator";

interface Output {
  code: string,
  error: Error
}

function thendral(code:string): Output {

  try {
    const tokens = TokenizerFactory.getTokenizer(code).getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    const translatedCode = TranslatorFactory.getTranslator(statements).translate()
    return {
      code: translatedCode.join("\n"),
      error: undefined
    }
  } catch (error) {
    return {
      code: undefined,
      error
    }
  }

}