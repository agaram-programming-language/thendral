import {Parser} from "./Parser";
import {Token} from "../tokenizer/Tokenizer";
import {Statement} from "./ParserTypes";

export class DefaultParser implements Parser {

  constructor(private tokens:Token[]) {

  }

  parse(): Statement[] {
    return [];
  }


}