import {TokenizerFactory, TokenType} from "../tokenizer/Tokenizer";
import {ParserFactory} from "./ParserFactory";
import {
  AssignmentExpr,
  BinaryExpr, BlockStmt,
  BooleanExpr, ElseIfStatement,
  GroupingExpr,
  IfStatement,
  LiteralExpr,
  UnaryExpr
} from "./ParserTypes";


describe("Parser tests", () => {


  it("Test should correctly parse the unary expression", () => {
    const expectedStructure = new UnaryExpr(
      TokenType.MINUS,
      new LiteralExpr("2")
    )
    const tokens = TokenizerFactory.getTokenizer("-2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });


  it("Test should correctly parse the unary expression with mutliple signs", () => {
    const tokens = TokenizerFactory.getTokenizer("--2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    const expectedStructure = new UnaryExpr(
      TokenType.MINUS,
      new UnaryExpr(
        TokenType.MINUS,
        new LiteralExpr("2")
      )
    )
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse the binary expression", () => {
    const expectedStructure = new BinaryExpr(
      new UnaryExpr(TokenType.MINUS, new LiteralExpr("2")),
      TokenType.PLUS,
      new LiteralExpr("2")
    )
    const tokens = TokenizerFactory.getTokenizer("-2 + 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });


  it("Test should correctly parse the grouping expression", () => {
    const expectedStructure = new GroupingExpr(
      new BinaryExpr(
        new LiteralExpr("2"),
        TokenType.PLUS,
        new LiteralExpr("2")
      )
    )
    const tokens = TokenizerFactory.getTokenizer("(2 + 2)").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse comparsion operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new LiteralExpr("2"),
        TokenType.GREATER_THAN,
        new LiteralExpr("2")
      )

    const tokens = TokenizerFactory.getTokenizer("2 > 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });


  it("Test should correctly parse equality operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new LiteralExpr("2"),
        TokenType.EQUALS_EQUALS,
        new LiteralExpr("2")
      )

    const tokens = TokenizerFactory.getTokenizer("2 == 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse or operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new LiteralExpr("2"),
        TokenType.LOGICAL_OR,
        new LiteralExpr("2")
      )

    const tokens = TokenizerFactory.getTokenizer("2 || 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse and operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new LiteralExpr("2"),
        TokenType.LOGICAL_AND,
        new LiteralExpr("2")
      )

    const tokens = TokenizerFactory.getTokenizer("2 && 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("test should correctly parse constant assignment", () => {

    const expectedStructure =
      new AssignmentExpr("a", TokenType.CONSTANT, new LiteralExpr("2"))

    const tokens = TokenizerFactory.getTokenizer("நிலையான a = 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  it("test should correctly parse variable assignment", () => {

    const expectedStructure =
      new AssignmentExpr("a", TokenType.VARIABLE, new LiteralExpr("2"))

    const tokens = TokenizerFactory.getTokenizer("நிலையற்ற a = 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })


  it("test should correctly parse boolean expression", () => {

    const expectedStructure =
      new BinaryExpr(
        new BooleanExpr(TokenType.TRUE),
        TokenType.LOGICAL_OR,
        new BooleanExpr(TokenType.FALSE)
      )

    const tokens = TokenizerFactory.getTokenizer("சரி || தவறு").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  it("test should correctly parse if loop", () => {

    const expectedStructure =
      new IfStatement(
        new BooleanExpr(TokenType.TRUE),
        new BlockStmt([]),
        []
      )

    const tokens = TokenizerFactory.getTokenizer("ஒருவேளை( சரி ) { }").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  it("test should correctly parse if else loop", () => {

    const expectedStructure =
      new IfStatement(
        new BooleanExpr(TokenType.TRUE),
        new BlockStmt([]),
        [],
        new BlockStmt([])
      )

    const tokens = TokenizerFactory.getTokenizer("ஒருவேளை( சரி ) { } எதுவும்இல்லையென்றால் {}").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  // it("test should correctly parse if elseif else loop", () => {
  //
  //   const expectedStructure =
  //     new IfStatement(
  //       new BooleanExpr(TokenType.TRUE),
  //       new BlockStmt([]),
  //       [new ElseIfStatement(new BooleanExpr(TokenType.TRUE), new BlockStmt([]))],
  //       new BlockStmt([])
  //     )
  //
  //   const tokens = TokenizerFactory.getTokenizer("ஒருவேளை( சரி ) { } இல்லையென்றால்(சரி) { } எதுவும்இல்லையென்றால் {}").getTokens()
  //   const statements = ParserFactory.getParser(tokens).parse()
  //   expect(statements[0]).toEqual(expectedStructure)
  // })


  // it("test should correctly parse function", () => {
  //
  //   const expectedStructure =
  //     new FunctionStmt(
  //       "a",
  //       [],
  //       new LiteralExpr("2")
  //     )
  //
  //   const tokens = TokenizerFactory.getTokenizer("நிலையற்ற a = 2").getTokens()
  //   const statements = ParserFactory.getParser(tokens).parse()
  //   expect(statements[0]).toEqual(expectedStructure)
  // })


})