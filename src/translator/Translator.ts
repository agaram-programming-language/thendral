import {Statement} from "../parser/ParserTypes";
import {DefaultTranslator} from "./DefaultTranslator";

export interface Translator {

  translate(): string[]


}

export class TranslatorFactory {
  static getTranslator(statements:Statement[]): Translator {
    return new DefaultTranslator(statements)
  }
}