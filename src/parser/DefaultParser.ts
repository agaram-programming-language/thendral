import {Parser, Statement} from "./Parser";
import {Token} from "../tokenizer/Tokenizer";

export class DefaultParser implements Parser {

  constructor(private tokens:Token[]) {
  }

  parse(): Statement[] {
    return [];
  }


}