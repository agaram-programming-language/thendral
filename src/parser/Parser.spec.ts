import {TokenizerFactory, TokenType} from "../tokenizer/Tokenizer";
import {ParserFactory} from "./ParserFactory";
import {
  AssignmentExpr,
  BinaryExpr, BlockStmt,
  BooleanExpr, CallExpr, ElseIfStmt, FunctionStmt,
  GroupingExpr, IdentifierExpr,
  IfStmt,
  LiteralExpr, NumericalExpr, PrintStmt, ReturnStmt,
  UnaryExpr, WhileStmt
} from "./ParserTypes";


describe("Parser tests", () => {


  it("Test should correctly parse the unary expression", () => {
    const expectedStructure = new UnaryExpr(
      TokenType.MINUS,
      new NumericalExpr(2)
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
        new NumericalExpr(2)
      )
    )
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse the binary expression", () => {
    const expectedStructure = new BinaryExpr(
      new UnaryExpr(TokenType.MINUS, new NumericalExpr(2)),
      TokenType.PLUS,
      new NumericalExpr(2)
    )
    const tokens = TokenizerFactory.getTokenizer("-2 + 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });


  it("Test should correctly parse the grouping expression", () => {
    const expectedStructure = new GroupingExpr(
      new BinaryExpr(
        new NumericalExpr(2),
        TokenType.PLUS,
        new NumericalExpr(2)
      )
    )
    const tokens = TokenizerFactory.getTokenizer("(2 + 2)").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse comparsion operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new NumericalExpr(2),
        TokenType.GREATER_THAN,
        new NumericalExpr(2)
      )

    const tokens = TokenizerFactory.getTokenizer("2 > 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });


  it("Test should correctly parse equality operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new NumericalExpr(2),
        TokenType.EQUALS_EQUALS,
        new NumericalExpr(2)
      )

    const tokens = TokenizerFactory.getTokenizer("2 == 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse or operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new NumericalExpr(2),
        TokenType.LOGICAL_OR,
        new NumericalExpr(2)
      )

    const tokens = TokenizerFactory.getTokenizer("2 || 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("Test should correctly parse and operator", () => {
    const expectedStructure =
      new BinaryExpr(
        new NumericalExpr(2),
        TokenType.LOGICAL_AND,
        new NumericalExpr(2)
      )

    const tokens = TokenizerFactory.getTokenizer("2 && 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  });

  it("test should correctly parse constant assignment", () => {

    const expectedStructure =
      new AssignmentExpr("a", TokenType.CONSTANT, new NumericalExpr(2))

    const tokens = TokenizerFactory.getTokenizer("????????????????????? a = 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })


  it("test should correctly parse identifier assignment", () => {

    const expectedStructure =
      new AssignmentExpr("a", TokenType.IDENTIFIER, new NumericalExpr(2))

    const tokens = TokenizerFactory.getTokenizer("a = 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  it("test should correctly parse print statement", () => {

    const expectedStructure =
      new PrintStmt(new NumericalExpr(2))

    const tokens = TokenizerFactory.getTokenizer("??????????????? 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  it("test should correctly parse variable assignment", () => {

    const expectedStructure =
      new AssignmentExpr("a", TokenType.VARIABLE, new NumericalExpr(2))

    const tokens = TokenizerFactory.getTokenizer("???????????????????????? a = 2").getTokens()
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

    const tokens = TokenizerFactory.getTokenizer("????????? || ????????????").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  it("test should correctly parse if loop", () => {

    const expectedStructure =
      new IfStmt(
        new BooleanExpr(TokenType.TRUE),
        new BlockStmt([]),
        []
      )

    const tokens = TokenizerFactory.getTokenizer("?????????????????????( ????????? ) { }").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  it("test should correctly parse if else loop", () => {

    const expectedStructure =
      new IfStmt(
        new BooleanExpr(TokenType.TRUE),
        new BlockStmt([]),
        [],
        new BlockStmt([])
      )

    const tokens = TokenizerFactory.getTokenizer("?????????????????????( ????????? ) { } ???????????????????????????????????????????????????????????? {}").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  it("test should correctly parse if elseif else loop", () => {

    const expectedStructure =
      new IfStmt(
        new BooleanExpr(TokenType.TRUE),
        new BlockStmt([]),
        [new ElseIfStmt(new BooleanExpr(TokenType.TRUE), new BlockStmt([]))],
        new BlockStmt([])
      )

    const tokens = TokenizerFactory.getTokenizer("?????????????????????( ????????? ) { } ???????????????????????????????????????(?????????) { } ???????????????????????????????????????????????????????????? {}").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })


  it("test should correctly parse  while loop", () => {

    const expectedStructure =
      new WhileStmt(
        new BooleanExpr(TokenType.TRUE),
        new BlockStmt([]),
      )

    const tokens = TokenizerFactory.getTokenizer("?????????????????????????????????????????????(?????????) { }").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  it("test should correctly parse function", () => {

    const expectedStructure =
      new FunctionStmt(
        '?????????????????????',
        ['a', '???'],
        new BlockStmt([])
      )

    const tokens = TokenizerFactory.getTokenizer("??????????????????????????? ?????????????????????(a,???) { }").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })


  it("test should concatenate strings", () => {

    const expectedStructure =
      new AssignmentExpr("a", TokenType.VARIABLE, new LiteralExpr("2"))

    const tokens = TokenizerFactory.getTokenizer("???????????????????????? a = '2'").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })



  it("test should correctly parse call expression", () => {

    const expectedStructure =
      new CallExpr(
        new IdentifierExpr("?????????????????????" ),
        [ new IdentifierExpr("a"), new IdentifierExpr("???")]
      )

    const tokens = TokenizerFactory.getTokenizer("?????????????????????(a,???)").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })

  it("test should correctly parse return statement", () => {

    const expectedStructure =
      new ReturnStmt(
        new NumericalExpr(2)
      )

    const tokens = TokenizerFactory.getTokenizer("???????????????????????? 2").getTokens()
    const statements = ParserFactory.getParser(tokens).parse()
    expect(statements[0]).toEqual(expectedStructure)
  })


})