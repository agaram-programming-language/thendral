import {Parser} from "./Parser";
import {Token} from "../tokenizer/Tokenizer";
import {Statement} from "./ParserTypes";
import {ParserMapper} from "./ParserMapper";
import {ParserIterator} from "./ParserIterator";

export class DefaultParser implements Parser {
  private mapper: ParserMapper;

  constructor(private tokens: Token[]) {
    this.mapper = new ParserMapper(
      new ParserIterator(tokens)
    )
  }

  parse(): Statement[] {
    return this.mapper.getStatements();
  }


}