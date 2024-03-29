
import {TokenIterator} from "./TokenIterator";
import {Token, TokenType} from "./Tokenizer";





export class TokenMapper {

  private readonly tokens: Token[] = []

  constructor(private iterator: TokenIterator) {

  }

  mapTokens(): Token[] {

    while (!this.iterator.isAtEnd()) {

      const token = this.iterator.consume()

      // Handle numbers without going in to character loop.
      if ( this.iterator.isNumber(token) ) {
        let number: string = token
        while (! this.iterator.isAtEnd() && this.iterator.isNumber(this.iterator.current()) ) {
          number += this.iterator.consume()
        }
        this.addTokenWithValue(TokenType.NUMBER, number)
        continue
      }

      // Handle keywords without going in to character loop
      if ( this.iterator.isTamilCharacter(token) ) {
        let keyword: string = token
        while (! this.iterator.isAtEnd() && this.iterator.isTamilCharacter(this.iterator.current()) ) {
          keyword += this.iterator.consume()
        }
        this.addTokenWithValue(this.getTokenTypeForKeyword(keyword), keyword)
        continue
      }


      // allow alpha numeric characters.
      if ( this.iterator.isAlphaNumeric(token) ) {
        let keyword: string = token
        while (! this.iterator.isAtEnd() && this.iterator.isAlphaNumeric(this.iterator.current()) ) {
          keyword += this.iterator.consume()
        }
        this.addTokenWithValue(TokenType.IDENTIFIER, keyword)
        continue
      }


      switch (token) {

        case ',':
          this.addToken(TokenType.COMMA)
          break

        case '+':
          this.addToken(TokenType.PLUS)
          break
        case '-':
          this.addToken(TokenType.MINUS)
          break
        case '/':
          this.addToken(TokenType.DIVIDE)
          break
        case '*':
          this.addToken(TokenType.MULTIPLY)
          break
        case '%':
          this.addToken(TokenType.MODULO)
          break

        case '(':
          this.addToken(TokenType.OPEN_BRACKET)
          break
        case ')':
          this.addToken(TokenType.CLOSE_BRACKET)
          break
        case '{':
          this.addToken(TokenType.OPEN_BRACE)
          break
        case '}':
          this.addToken(TokenType.CLOSE_BRACE)
          break
        case '[':
          this.addToken(TokenType.OPEN_SQUARE_BRACKET)
          break
        case ']':
          this.addToken(TokenType.CLOSE_SQUARE_BRACKET)
          break

        case '&':
          if (this.iterator.current() === '&') {
            this.iterator.advance()
            this.addToken(TokenType.LOGICAL_AND)
          } else {
            //@TODO
           throw new Error('')
          }
          break

        case '|':
          if (this.iterator.current() === '|') {
            this.iterator.advance()
            this.addToken(TokenType.LOGICAL_OR)
          } else {
            //@TODO
            throw new Error('')
          }
          break


        case '<':
          if (this.iterator.current() === '=') {
            this.iterator.advance()
            this.addToken(TokenType.LESSER_THAN_OR_EQUAL_TO)
          } else {
            this.addToken(TokenType.LESS_THAN)
          }
          break

        case '>':
          if (this.iterator.current() === '=') {
            this.iterator.advance()
            this.addToken(TokenType.GREATER_THAN_OR_EQUAL_TO)
          }
          else {
            this.addToken(TokenType.GREATER_THAN)
          }
          break

        case '=':
          if (this.iterator.current() === '=') {
            this.iterator.advance()
            this.addToken(TokenType.EQUALS_EQUALS)
          }
          else {
            this.addToken(TokenType.EQUALS)
          }
          break

        case "'":
          let value:string = '';
          while ( ! this.iterator.isAtEnd() && this.iterator.current() !== "'" ) {
            value += this.iterator.consume()
          }
          // consume the stray ' character from string
          this.iterator.advance();
          this.addTokenWithValue(TokenType.STRING, value)
          break
        case "!":
          if (! this.iterator.isAtEnd() && this.iterator.current() == '=') {
            this.iterator.advance()
            this.addToken(TokenType.NOT_EQUALS)
          }
          else {
            this.addToken(TokenType.NOT)
          }
          break
      }

    }


    // Add endof file token to denote the file end.
    this.addToken(TokenType.EOF);

    return this.tokens;
  }

  getTokenTypeForKeyword(keyword: string): TokenType {
    const keywordMap =  {
      'நிலையற்ற' : TokenType.VARIABLE,
      'நிலையான' : TokenType.CONSTANT,
      'ஒருவேளை' : TokenType.IF,
      'எதுவும்இல்லையென்றால்' : TokenType.ELSE,
      'இருப்பின்வளையம்' : TokenType.WHILE,
      'சரி' : TokenType.TRUE,
      'தவறு' : TokenType.FALSE,
      'ஆகவளையம்' : TokenType.FOR,
      'இல்லையென்றால்': TokenType.ELSE_IF,
      'செயல்பாடு' : TokenType.FUNCTION,
      'திருப்பு': TokenType.RETURN,
      'எழுது': TokenType.PRINT
    }
    return keywordMap[keyword] ? keywordMap[keyword] : TokenType.IDENTIFIER
  }

  addToken(type: TokenType) {
    this.tokens.push({
      type: type,
      lineNumber: 1,
      characterPosition: 1
    })
  }

  addTokenWithValue(type: TokenType, value:string) {
    this.tokens.push({
      type: type,
      lineNumber: 1,
      characterPosition: 1,
      value: value
    })
  }


}