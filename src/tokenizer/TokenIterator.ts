import { isNumber } from "util";
import {Iterator} from "../iterator/iterator"



export class TokenIterator extends Iterator<string> {

  isTamilCharacter(character: string) {
    const value = character.charCodeAt(0)
    // Is tamil character in range. ( supplements excluded)
    return value >= 2944 && value <= 3071

  }

  isNumber(value:any):boolean {
    return !isNaN(parseFloat(value)) && !isNaN(value - 0)
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