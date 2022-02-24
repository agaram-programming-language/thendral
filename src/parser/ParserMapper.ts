import {ParserIterator} from "./ParserIterator";
import {Statement} from "./ParserTypes";

export class ParserMapper {


  private statements:Statement[] = []

  constructor(private iterator: ParserIterator) {

  }

  getStatements():Statement[] {
    this.startParsing()
    return this.statements;
  }

  private startParsing() {
    // while ( this.iterator.isAtEnd() ) {
    //
    // }
  }

}