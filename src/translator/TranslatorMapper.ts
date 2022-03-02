import {TranslatorIterator} from "./TranslatorIterator";

export class TranslatorMapper {

  private lines: string[] = []

  constructor(private iterator: TranslatorIterator) {

  }

  getTranslation():string[] {
    return this.lines;
  }
}