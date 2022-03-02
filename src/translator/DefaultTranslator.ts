import {Translator} from "./Translator";
import {Statement} from "../parser/ParserTypes";
import {TranslatorMapper} from "./TranslatorMapper";
import {TranslatorIterator} from "./TranslatorIterator";

export class DefaultTranslator implements Translator {

  private translatorMapper: TranslatorMapper;

  constructor(private statements: Statement[]) {
    this.translatorMapper = new TranslatorMapper(new TranslatorIterator(statements))
  }

  getTranslation(): string[] {
    return this.translatorMapper.getTranslation();
  }


}