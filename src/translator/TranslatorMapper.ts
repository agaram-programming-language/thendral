import {TranslatorIterator} from "./TranslatorIterator";

export class TranslatorMapper {

  private lines: string[] = []

  constructor(private iterator: TranslatorIterator) {

  }

  getTranslation():string[] {
    this.startTranslation();
    return this.lines;
  }

  private startTranslation() {
    this.visitStatement();
  }

  private visitStatement() {

  }

}