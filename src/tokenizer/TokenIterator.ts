import { isNumber } from "util";
import {Iterator} from "../iterator/iterator"

export class TokenIterator extends Iterator<string> {
  isNumber(value:string):boolean {
     return typeof value === 'number';
  }

  private lineNumber = 1;
  private characterPos = 1;


  private incrementLineNumber() {
    this.lineNumber += 1;
  }

  private incrementCharacterPosition() {
    this.characterPos += 1;
  }

  consume() {
    this.incrementCharacterPosition()
    return super.consume();
  }

  advance() {
    this.incrementCharacterPosition()
    super.advance()
  }


}