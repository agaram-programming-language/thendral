import {Iterator} from "../iterator/iterator"


const alphaNumericCharacters = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
]


export class TokenIterator extends Iterator<string> {

  isTamilCharacter(character: string) {
    const value = character.charCodeAt(0)
    // Is tamil character in range. ( supplements excluded)
    return value >= 2944 && value <= 3071

  }

  isAlphaNumeric(character: string) {
    return alphaNumericCharacters.includes(character)
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