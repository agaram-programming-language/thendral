import {Statement} from "./ParserTypes";


export interface Parser {

  parse(): Statement[]

}

