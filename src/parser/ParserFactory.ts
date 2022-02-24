import {Token} from "../tokenizer/Tokenizer";
import {DefaultParser} from "./DefaultParser";
import {Parser} from "./Parser";

export class ParserFactory {

  static getParser(tokens: Token[]): Parser {
    return new DefaultParser(tokens);
  }

}