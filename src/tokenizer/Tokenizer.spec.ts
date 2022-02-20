import "jasmine";
import {TokenizerFactory} from "./Tokenizer";



describe("Tokenizer Tests", () => {
  it("Test should identify numerical tokens", () => {
    const tokens = TokenizerFactory.getTokenizer("+-*/").getTokens()
    expect(tokens.length).toEqual(4)
  });

})