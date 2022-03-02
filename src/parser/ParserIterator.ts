import {Iterator} from "../iterator/iterator";
import {Token, TokenType} from "../tokenizer/Tokenizer";

export class ParserIterator extends Iterator<Token> {

  match(...tokenTypes:TokenType[]):boolean {

    for (let type of tokenTypes) {
      if( this.check(type)) {
        return true;
      }
    }
    return false;

  }

  matchAndAdvance(...tokenTypes:TokenType[]):boolean {

    for (let type of tokenTypes) {
      if( this.check(type)) {
        this.advance()
        return true;
      }
    }
    return false;

  }

  check(tokenType:TokenType):boolean {
    if ( this.isAtEnd() ) {
      return false;
    }
    return this.unsafePeek().type === tokenType;
  }


  isAtEnd(): boolean {
    return super.isAtEnd() || this.unsafePeek().type === TokenType.EOF;
  }

  advanceIf(expectedTokenType:TokenType) {
    if ( this.isAtEnd() ) {
      throw new Error("cant advance, reached EOF")
    }
    const token = this.unsafePeek();
    if ( token.type !== expectedTokenType ) {
      throw new Error(`expected ${expectedTokenType} but got ${token.type}`)
    }
    this.advance()
  }

  consumeIf(...tokenTypes:TokenType[]) {
    if ( this.isAtEnd() ) {
      throw new Error("cant advance, reached EOF")
    }
    const token = this.unsafePeek();
    for (let type of tokenTypes) {
      if( this.check(type)) {
        return this.consume();
      }
    }
    throw new Error(`expected token types ${tokenTypes.join(",")} doesnt match ${token.type}`)
  }
}