import "jasmine";
import {TokenizerFactory} from "./Tokenizer";



describe("Tokenizer Tests", () => {
  it("Test should identify valid tokens", () => {
    const tokens = TokenizerFactory.getTokenizer("+-*/").getTokens()
    expect(tokens.length).toEqual(4)
  });




})