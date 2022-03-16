var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("iterator/iterator", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Iterator = void 0;
    var Iterator = /** @class */ (function () {
        function Iterator(items) {
            this.items = items;
        }
        Iterator.prototype.isAtEnd = function () {
            return this.items.length === 0;
        };
        /**
         * @throws Error
         */
        Iterator.prototype.consume = function () {
            if (this.isAtEnd()) {
                throw new Error("Attempting to consume token at end");
            }
            return this.items.shift();
        };
        /**
         * @throws Error
         */
        Iterator.prototype.advance = function () {
            if (this.isAtEnd()) {
                throw new Error("Attempting to advance token at end");
            }
            this.items.shift();
        };
        Iterator.prototype.current = function () {
            if (this.isAtEnd()) {
                throw new Error("Attempting to find current token at end");
            }
            return this.items[0];
        };
        Iterator.prototype.peek = function () {
            if (this.isAtEnd()) {
                return false;
            }
            return this.items[1];
        };
        Iterator.prototype.unsafeCurrent = function () {
            return this.items[0];
        };
        Iterator.prototype.unsafePeek = function () {
            return this.items[1];
        };
        return Iterator;
    }());
    exports.Iterator = Iterator;
});
define("tokenizer/TokenIterator", ["require", "exports", "iterator/iterator"], function (require, exports, iterator_1) {
    "use strict";
    exports.__esModule = true;
    exports.TokenIterator = void 0;
    var alphaNumericCharacters = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
    ];
    var TokenIterator = /** @class */ (function (_super) {
        __extends(TokenIterator, _super);
        function TokenIterator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lineNumber = 1;
            _this.characterPos = 1;
            return _this;
        }
        TokenIterator.prototype.isTamilCharacter = function (character) {
            var value = character.charCodeAt(0);
            // Is tamil character in range. ( supplements excluded)
            return value >= 2944 && value <= 3071;
        };
        TokenIterator.prototype.isAlphaNumeric = function (character) {
            return alphaNumericCharacters.includes(character);
        };
        TokenIterator.prototype.isNumber = function (value) {
            return !isNaN(parseFloat(value)) && !isNaN(value - 0);
        };
        TokenIterator.prototype.incrementLineNumber = function () {
            this.lineNumber += 1;
        };
        TokenIterator.prototype.incrementCharacterPosition = function () {
            this.characterPos += 1;
        };
        TokenIterator.prototype.consume = function () {
            this.incrementCharacterPosition();
            return _super.prototype.consume.call(this);
        };
        TokenIterator.prototype.advance = function () {
            this.incrementCharacterPosition();
            _super.prototype.advance.call(this);
        };
        return TokenIterator;
    }(iterator_1.Iterator));
    exports.TokenIterator = TokenIterator;
});
define("tokenizer/TokenMapper", ["require", "exports", "tokenizer/Tokenizer"], function (require, exports, Tokenizer_1) {
    "use strict";
    exports.__esModule = true;
    exports.TokenMapper = void 0;
    var TokenMapper = /** @class */ (function () {
        function TokenMapper(iterator) {
            this.iterator = iterator;
            this.tokens = [];
        }
        TokenMapper.prototype.mapTokens = function () {
            while (!this.iterator.isAtEnd()) {
                var token = this.iterator.consume();
                // Handle numbers without going in to character loop.
                if (this.iterator.isNumber(token)) {
                    var number = token;
                    while (!this.iterator.isAtEnd() && this.iterator.isNumber(this.iterator.current())) {
                        number += this.iterator.consume();
                    }
                    this.addTokenWithValue(Tokenizer_1.TokenType.NUMBER, number);
                    continue;
                }
                // Handle keywords without going in to character loop
                if (this.iterator.isTamilCharacter(token)) {
                    var keyword = token;
                    while (!this.iterator.isAtEnd() && this.iterator.isTamilCharacter(this.iterator.current())) {
                        keyword += this.iterator.consume();
                    }
                    this.addTokenWithValue(this.getTokenTypeForKeyword(keyword), keyword);
                    continue;
                }
                // allow alpha numeric characters.
                if (this.iterator.isAlphaNumeric(token)) {
                    var keyword = token;
                    while (!this.iterator.isAtEnd() && this.iterator.isAlphaNumeric(this.iterator.current())) {
                        keyword += this.iterator.consume();
                    }
                    this.addTokenWithValue(Tokenizer_1.TokenType.IDENTIFIER, keyword);
                    continue;
                }
                switch (token) {
                    case ',':
                        this.addToken(Tokenizer_1.TokenType.COMMA);
                        break;
                    case '+':
                        this.addToken(Tokenizer_1.TokenType.PLUS);
                        break;
                    case '-':
                        this.addToken(Tokenizer_1.TokenType.MINUS);
                        break;
                    case '/':
                        this.addToken(Tokenizer_1.TokenType.DIVIDE);
                        break;
                    case '*':
                        this.addToken(Tokenizer_1.TokenType.MULTIPLY);
                        break;
                    case '%':
                        this.addToken(Tokenizer_1.TokenType.MODULO);
                        break;
                    case '(':
                        this.addToken(Tokenizer_1.TokenType.OPEN_BRACKET);
                        break;
                    case ')':
                        this.addToken(Tokenizer_1.TokenType.CLOSE_BRACKET);
                        break;
                    case '{':
                        this.addToken(Tokenizer_1.TokenType.OPEN_BRACE);
                        break;
                    case '}':
                        this.addToken(Tokenizer_1.TokenType.CLOSE_BRACE);
                        break;
                    case '[':
                        this.addToken(Tokenizer_1.TokenType.OPEN_SQUARE_BRACKET);
                        break;
                    case ']':
                        this.addToken(Tokenizer_1.TokenType.CLOSE_SQUARE_BRACKET);
                        break;
                    case '&':
                        if (this.iterator.current() === '&') {
                            this.iterator.advance();
                            this.addToken(Tokenizer_1.TokenType.LOGICAL_AND);
                        }
                        else {
                            //@TODO
                            throw new Error('');
                        }
                        break;
                    case '|':
                        if (this.iterator.current() === '|') {
                            this.iterator.advance();
                            this.addToken(Tokenizer_1.TokenType.LOGICAL_OR);
                        }
                        else {
                            //@TODO
                            throw new Error('');
                        }
                        break;
                    case '<':
                        if (this.iterator.current() === '=') {
                            this.iterator.advance();
                            this.addToken(Tokenizer_1.TokenType.LESSER_THAN_OR_EQUAL_TO);
                        }
                        else {
                            this.addToken(Tokenizer_1.TokenType.LESS_THAN);
                        }
                        break;
                    case '>':
                        if (this.iterator.current() === '=') {
                            this.iterator.advance();
                            this.addToken(Tokenizer_1.TokenType.GREATER_THAN_OR_EQUAL_TO);
                        }
                        else {
                            this.addToken(Tokenizer_1.TokenType.GREATER_THAN);
                        }
                        break;
                    case '=':
                        if (this.iterator.current() === '=') {
                            this.iterator.advance();
                            this.addToken(Tokenizer_1.TokenType.EQUALS_EQUALS);
                        }
                        else {
                            this.addToken(Tokenizer_1.TokenType.EQUALS);
                        }
                        break;
                    case "'":
                        var value = '';
                        while (!this.iterator.isAtEnd() && this.iterator.current() !== "'") {
                            value += this.iterator.consume();
                        }
                        // consume the stray ' character from string
                        this.iterator.advance();
                        this.addTokenWithValue(Tokenizer_1.TokenType.STRING, value);
                        break;
                    case "!":
                        if (!this.iterator.isAtEnd() && this.iterator.current() == '=') {
                            this.iterator.advance();
                            this.addToken(Tokenizer_1.TokenType.NOT_EQUALS);
                        }
                        else {
                            this.addToken(Tokenizer_1.TokenType.NOT);
                        }
                        break;
                }
            }
            // Add endof file token to denote the file end.
            this.addToken(Tokenizer_1.TokenType.EOF);
            return this.tokens;
        };
        TokenMapper.prototype.getTokenTypeForKeyword = function (keyword) {
            var keywordMap = {
                'நிலையற்ற': Tokenizer_1.TokenType.VARIABLE,
                'நிலையான': Tokenizer_1.TokenType.CONSTANT,
                'ஒருவேளை': Tokenizer_1.TokenType.IF,
                'எதுவும்இல்லையென்றால்': Tokenizer_1.TokenType.ELSE,
                'இருப்பின்வளையம்': Tokenizer_1.TokenType.WHILE,
                'சரி': Tokenizer_1.TokenType.TRUE,
                'தவறு': Tokenizer_1.TokenType.FALSE,
                'ஆகவளையம்': Tokenizer_1.TokenType.FOR,
                'இல்லையென்றால்': Tokenizer_1.TokenType.ELSE_IF,
                'செயல்பாடு': Tokenizer_1.TokenType.FUNCTION,
                'திருப்பு': Tokenizer_1.TokenType.RETURN,
                'எழுது': Tokenizer_1.TokenType.PRINT
            };
            return keywordMap[keyword] ? keywordMap[keyword] : Tokenizer_1.TokenType.IDENTIFIER;
        };
        TokenMapper.prototype.addToken = function (type) {
            this.tokens.push({
                type: type,
                lineNumber: 1,
                characterPosition: 1
            });
        };
        TokenMapper.prototype.addTokenWithValue = function (type, value) {
            this.tokens.push({
                type: type,
                lineNumber: 1,
                characterPosition: 1,
                value: value
            });
        };
        return TokenMapper;
    }());
    exports.TokenMapper = TokenMapper;
});
define("tokenizer/DefaultTokenizer", ["require", "exports", "tokenizer/TokenIterator", "tokenizer/TokenMapper"], function (require, exports, TokenIterator_1, TokenMapper_1) {
    "use strict";
    exports.__esModule = true;
    exports.DefaultTokenizer = void 0;
    var DefaultTokenizer = /** @class */ (function () {
        function DefaultTokenizer(code) {
            this.tokenMapper = new TokenMapper_1.TokenMapper(new TokenIterator_1.TokenIterator(code.split('')));
            this.tokens = [];
        }
        DefaultTokenizer.prototype.getTokens = function () {
            return this.tokenMapper.mapTokens();
        };
        return DefaultTokenizer;
    }());
    exports.DefaultTokenizer = DefaultTokenizer;
});
define("tokenizer/Tokenizer", ["require", "exports", "tokenizer/DefaultTokenizer"], function (require, exports, DefaultTokenizer_1) {
    "use strict";
    exports.__esModule = true;
    exports.TokenizerFactory = exports.TokenType = void 0;
    var TokenType;
    (function (TokenType) {
        TokenType["PLUS"] = "PLUS";
        TokenType["MINUS"] = "MINUS";
        TokenType["MULTIPLY"] = "MULTIPLY";
        TokenType["DIVIDE"] = "DIVIDE";
        TokenType["MODULO"] = "MODULO";
        TokenType["LESSER_THAN_OR_EQUAL_TO"] = "LESSER_THAN_OR_EQUAL_TO";
        TokenType["GREATER_THAN_OR_EQUAL_TO"] = "GREATER_THAN_OR_EQUAL_TO";
        TokenType["EQUALS_EQUALS"] = "EQUALS_EQUALS";
        TokenType["OPEN_BRACKET"] = "OPEN_BRACKET";
        TokenType["CLOSE_BRACKET"] = "CLOSE_BRACKET";
        TokenType["OPEN_BRACE"] = "OPEN_BRACE";
        TokenType["CLOSE_BRACE"] = "CLOSE_BRACE";
        TokenType["OPEN_SQUARE_BRACKET"] = "OPEN_SQUARE_BRACKET";
        TokenType["CLOSE_SQUARE_BRACKET"] = "CLOSE_SQUARE_BRACKET";
        TokenType["STRING"] = "STRING";
        TokenType["LESS_THAN"] = "LESS_THAN";
        TokenType["GREATER_THAN"] = "GREATER_THAN";
        TokenType["EQUALS"] = "EQUALS";
        TokenType["LOGICAL_AND"] = "LOGICAL_AND";
        TokenType["LOGICAL_OR"] = "LOGICAL_OR";
        TokenType["NUMBER"] = "NUMBER";
        TokenType["VARIABLE"] = "VARIABLE";
        TokenType["CONSTANT"] = "CONSTANT";
        TokenType["IF"] = "IF";
        TokenType["ELSE"] = "ELSE";
        TokenType["WHILE"] = "WHILE";
        TokenType["TRUE"] = "TRUE";
        TokenType["FALSE"] = "FALSE";
        TokenType["FOR"] = "FOR";
        TokenType["IDENTIFIER"] = "IDENTIFIER";
        TokenType["EOF"] = "EOF";
        TokenType["NOT_EQUALS"] = "NOT_EQUALS";
        TokenType["NOT"] = "NOT";
        TokenType["ELSE_IF"] = "ELSE_IF";
        TokenType["FUNCTION"] = "FUNCTION";
        TokenType["COMMA"] = "COMMA";
        TokenType["RETURN"] = "RETURN";
        TokenType["PRINT"] = "PRINT";
    })(TokenType = exports.TokenType || (exports.TokenType = {}));
    var TokenizerFactory = /** @class */ (function () {
        function TokenizerFactory() {
        }
        TokenizerFactory.getTokenizer = function (code) {
            return new DefaultTokenizer_1.DefaultTokenizer(code);
        };
        return TokenizerFactory;
    }());
    exports.TokenizerFactory = TokenizerFactory;
});
define("parser/ParserTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.BooleanExpr = exports.FunctionStmt = exports.ReturnStmt = exports.BlockStmt = exports.ElseIfStmt = exports.WhileStmt = exports.IfStmt = exports.PrintStmt = exports.AssignmentExpr = exports.NumericalExpr = exports.IdentifierExpr = exports.CallExpr = exports.LiteralExpr = exports.UnaryExpr = exports.GroupingExpr = exports.BinaryExpr = void 0;
    var BinaryExpr = /** @class */ (function () {
        function BinaryExpr(left, operator, right) {
            this.left = left;
            this.operator = operator;
            this.right = right;
        }
        return BinaryExpr;
    }());
    exports.BinaryExpr = BinaryExpr;
    var GroupingExpr = /** @class */ (function () {
        function GroupingExpr(expr) {
            this.expr = expr;
        }
        return GroupingExpr;
    }());
    exports.GroupingExpr = GroupingExpr;
    var UnaryExpr = /** @class */ (function () {
        function UnaryExpr(operator, right) {
            this.operator = operator;
            this.right = right;
        }
        return UnaryExpr;
    }());
    exports.UnaryExpr = UnaryExpr;
    var LiteralExpr = /** @class */ (function () {
        function LiteralExpr(value) {
            this.value = value;
        }
        return LiteralExpr;
    }());
    exports.LiteralExpr = LiteralExpr;
    var CallExpr = /** @class */ (function () {
        function CallExpr(functionName, args) {
            this.functionName = functionName;
            this.args = args;
        }
        return CallExpr;
    }());
    exports.CallExpr = CallExpr;
    var IdentifierExpr = /** @class */ (function () {
        function IdentifierExpr(identifier) {
            this.identifier = identifier;
        }
        return IdentifierExpr;
    }());
    exports.IdentifierExpr = IdentifierExpr;
    var NumericalExpr = /** @class */ (function () {
        function NumericalExpr(value) {
            this.value = value;
        }
        return NumericalExpr;
    }());
    exports.NumericalExpr = NumericalExpr;
    var AssignmentExpr = /** @class */ (function () {
        function AssignmentExpr(identifier, type, right) {
            this.identifier = identifier;
            this.type = type;
            this.right = right;
        }
        return AssignmentExpr;
    }());
    exports.AssignmentExpr = AssignmentExpr;
    var PrintStmt = /** @class */ (function () {
        function PrintStmt(expr) {
            this.expr = expr;
        }
        return PrintStmt;
    }());
    exports.PrintStmt = PrintStmt;
    var IfStmt = /** @class */ (function () {
        function IfStmt(expr, thenBranch, elseIfBranches, elseBranch) {
            this.expr = expr;
            this.thenBranch = thenBranch;
            this.elseIfBranches = elseIfBranches;
            this.elseBranch = elseBranch;
        }
        return IfStmt;
    }());
    exports.IfStmt = IfStmt;
    var WhileStmt = /** @class */ (function () {
        function WhileStmt(expr, statement) {
            this.expr = expr;
            this.statement = statement;
        }
        return WhileStmt;
    }());
    exports.WhileStmt = WhileStmt;
    var ElseIfStmt = /** @class */ (function () {
        function ElseIfStmt(expr, statement) {
            this.expr = expr;
            this.statement = statement;
        }
        return ElseIfStmt;
    }());
    exports.ElseIfStmt = ElseIfStmt;
    var BlockStmt = /** @class */ (function () {
        function BlockStmt(statements) {
            this.statements = statements;
        }
        return BlockStmt;
    }());
    exports.BlockStmt = BlockStmt;
    var ReturnStmt = /** @class */ (function () {
        function ReturnStmt(expr) {
            this.expr = expr;
        }
        return ReturnStmt;
    }());
    exports.ReturnStmt = ReturnStmt;
    var FunctionStmt = /** @class */ (function () {
        function FunctionStmt(identifier, parameters, body) {
            this.identifier = identifier;
            this.parameters = parameters;
            this.body = body;
        }
        return FunctionStmt;
    }());
    exports.FunctionStmt = FunctionStmt;
    var BooleanExpr = /** @class */ (function () {
        function BooleanExpr(type) {
            this.type = type;
        }
        return BooleanExpr;
    }());
    exports.BooleanExpr = BooleanExpr;
});
define("parser/Parser", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("parser/ParserIterator", ["require", "exports", "iterator/iterator", "tokenizer/Tokenizer"], function (require, exports, iterator_2, Tokenizer_2) {
    "use strict";
    exports.__esModule = true;
    exports.ParserIterator = void 0;
    var ParserIterator = /** @class */ (function (_super) {
        __extends(ParserIterator, _super);
        function ParserIterator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ParserIterator.prototype.match = function () {
            var tokenTypes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tokenTypes[_i] = arguments[_i];
            }
            for (var _a = 0, tokenTypes_1 = tokenTypes; _a < tokenTypes_1.length; _a++) {
                var type = tokenTypes_1[_a];
                if (this.check(type)) {
                    return true;
                }
            }
            return false;
        };
        ParserIterator.prototype.matchAndAdvance = function () {
            var tokenTypes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tokenTypes[_i] = arguments[_i];
            }
            for (var _a = 0, tokenTypes_2 = tokenTypes; _a < tokenTypes_2.length; _a++) {
                var type = tokenTypes_2[_a];
                if (this.check(type)) {
                    this.advance();
                    return true;
                }
            }
            return false;
        };
        ParserIterator.prototype.check = function (tokenType) {
            if (this.isAtEnd()) {
                return false;
            }
            return this.unsafeCurrent().type === tokenType;
        };
        ParserIterator.prototype.checkNext = function (tokenType) {
            if (this.isAtEnd()) {
                return false;
            }
            return this.unsafePeek().type === tokenType;
        };
        ParserIterator.prototype.isAtEnd = function () {
            return _super.prototype.isAtEnd.call(this) || this.unsafeCurrent().type === Tokenizer_2.TokenType.EOF;
        };
        ParserIterator.prototype.advanceIf = function (expectedTokenType) {
            if (this.isAtEnd()) {
                throw new Error("cant advance, reached EOF");
            }
            var token = this.unsafeCurrent();
            if (token.type !== expectedTokenType) {
                throw new Error("expected ".concat(expectedTokenType, " but got ").concat(token.type));
            }
            this.advance();
        };
        ParserIterator.prototype.consumeIf = function () {
            var tokenTypes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tokenTypes[_i] = arguments[_i];
            }
            if (this.isAtEnd()) {
                throw new Error("cant advance, reached EOF");
            }
            var token = this.unsafeCurrent();
            for (var _a = 0, tokenTypes_3 = tokenTypes; _a < tokenTypes_3.length; _a++) {
                var type = tokenTypes_3[_a];
                if (this.check(type)) {
                    return this.consume();
                }
            }
            throw new Error("expected token types ".concat(tokenTypes.join(","), " doesnt match ").concat(token.type));
        };
        ParserIterator.prototype.matchNext = function () {
            var tokenTypes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tokenTypes[_i] = arguments[_i];
            }
            for (var _a = 0, tokenTypes_4 = tokenTypes; _a < tokenTypes_4.length; _a++) {
                var type = tokenTypes_4[_a];
                if (this.checkNext(type)) {
                    return true;
                }
            }
            return false;
        };
        return ParserIterator;
    }(iterator_2.Iterator));
    exports.ParserIterator = ParserIterator;
});
define("parser/ParserMapper", ["require", "exports", "parser/ParserTypes", "tokenizer/Tokenizer"], function (require, exports, ParserTypes_1, Tokenizer_3) {
    "use strict";
    exports.__esModule = true;
    exports.ParserMapper = void 0;
    var ParserMapper = /** @class */ (function () {
        function ParserMapper(iterator) {
            this.iterator = iterator;
            this.statements = [];
        }
        ParserMapper.prototype.getStatements = function () {
            this.startParsing();
            return this.statements;
        };
        ParserMapper.prototype.startParsing = function () {
            while (!this.iterator.isAtEnd()) {
                this.statements.push(this.statement());
            }
        };
        ParserMapper.prototype.expression = function () {
            return this.or();
        };
        ParserMapper.prototype.unary = function () {
            if (this.iterator.match(Tokenizer_3.TokenType.MINUS, Tokenizer_3.TokenType.NOT)) {
                return new ParserTypes_1.UnaryExpr(this.iterator.consume().type, this.unary());
            }
            return this.call();
        };
        ParserMapper.prototype.primary = function () {
            if (this.iterator.match(Tokenizer_3.TokenType.NUMBER)) {
                return new ParserTypes_1.NumericalExpr(parseInt(this.iterator.consume().value));
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.STRING)) {
                return new ParserTypes_1.LiteralExpr(this.iterator.consume().value);
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.OPEN_BRACKET)) {
                this.iterator.advanceIf(Tokenizer_3.TokenType.OPEN_BRACKET);
                var expr = this.expression();
                this.iterator.advanceIf(Tokenizer_3.TokenType.CLOSE_BRACKET);
                return new ParserTypes_1.GroupingExpr(expr);
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.TRUE, Tokenizer_3.TokenType.FALSE)) {
                return new ParserTypes_1.BooleanExpr(this.iterator.consume().type);
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.IDENTIFIER)) {
                return new ParserTypes_1.IdentifierExpr(this.iterator.consume().value);
            }
            // @TODO: cant parse primary.
            throw new Error("cant parse primary expr " + JSON.stringify(this.iterator.unsafeCurrent()));
        };
        ParserMapper.prototype.equality = function () {
            var expression = this.comparsion();
            while (this.iterator.match(Tokenizer_3.TokenType.EQUALS_EQUALS, Tokenizer_3.TokenType.NOT_EQUALS)) {
                expression = new ParserTypes_1.BinaryExpr(expression, this.iterator.consume().type, this.comparsion());
            }
            return expression;
        };
        ParserMapper.prototype.comparsion = function () {
            var term = this.term();
            while (this.iterator.match(Tokenizer_3.TokenType.GREATER_THAN, Tokenizer_3.TokenType.GREATER_THAN_OR_EQUAL_TO, Tokenizer_3.TokenType.LESS_THAN, Tokenizer_3.TokenType.LESSER_THAN_OR_EQUAL_TO)) {
                term = new ParserTypes_1.BinaryExpr(term, this.iterator.consume().type, this.term());
            }
            return term;
        };
        ParserMapper.prototype.term = function () {
            var factor = this.factor();
            while (this.iterator.match(Tokenizer_3.TokenType.PLUS, Tokenizer_3.TokenType.MINUS)) {
                factor = new ParserTypes_1.BinaryExpr(factor, this.iterator.consume().type, this.factor());
            }
            return factor;
        };
        ParserMapper.prototype.factor = function () {
            var unary = this.unary();
            while (this.iterator.match(Tokenizer_3.TokenType.MULTIPLY, Tokenizer_3.TokenType.DIVIDE)) {
                unary = new ParserTypes_1.BinaryExpr(unary, this.iterator.consume().type, this.unary());
            }
            return unary;
        };
        ParserMapper.prototype.or = function () {
            var expr = this.and();
            while (this.iterator.match(Tokenizer_3.TokenType.LOGICAL_OR)) {
                expr = new ParserTypes_1.BinaryExpr(expr, this.iterator.consume().type, this.and());
            }
            return expr;
        };
        ParserMapper.prototype.and = function () {
            var expr = this.equality();
            while (this.iterator.match(Tokenizer_3.TokenType.LOGICAL_AND)) {
                expr = new ParserTypes_1.BinaryExpr(expr, this.iterator.consume().type, this.equality());
            }
            return expr;
        };
        ParserMapper.prototype.statement = function () {
            if (this.iterator.match(Tokenizer_3.TokenType.CONSTANT, Tokenizer_3.TokenType.VARIABLE)) {
                return this.variableStatement();
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.IDENTIFIER) && this.iterator.matchNext(Tokenizer_3.TokenType.EQUALS)) {
                return this.assignmentStatement();
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.PRINT)) {
                return this.printStatement();
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.IF)) {
                return this.ifStatement();
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.OPEN_BRACE)) {
                return this.blockStatement();
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.WHILE)) {
                return this.whileStatement();
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.FUNCTION)) {
                return this.functionStatement();
            }
            else if (this.iterator.match(Tokenizer_3.TokenType.RETURN)) {
                return this.returnStatement();
            }
            return this.expression();
        };
        ParserMapper.prototype.variableStatement = function () {
            var type = this.iterator.consumeIf(Tokenizer_3.TokenType.CONSTANT, Tokenizer_3.TokenType.VARIABLE).type;
            var identifier = this.iterator.consumeIf(Tokenizer_3.TokenType.IDENTIFIER).value;
            // skip the equals sign
            this.iterator.advanceIf(Tokenizer_3.TokenType.EQUALS);
            var expr = this.expression();
            return new ParserTypes_1.AssignmentExpr(identifier, type, expr);
        };
        ParserMapper.prototype.ifStatement = function () {
            // consume the if token.
            this.iterator.advanceIf(Tokenizer_3.TokenType.IF);
            // consume open bracket.
            this.iterator.advanceIf(Tokenizer_3.TokenType.OPEN_BRACKET);
            var expr = this.expression();
            // consume close bracket.
            this.iterator.advanceIf(Tokenizer_3.TokenType.CLOSE_BRACKET);
            // consume then branch
            var thenBranch = this.statement();
            var elseIfStatements = [];
            while (!this.iterator.isAtEnd() && this.iterator.match(Tokenizer_3.TokenType.ELSE_IF)) {
                // consume else if tokens.
                this.iterator.advance();
                this.iterator.advanceIf(Tokenizer_3.TokenType.OPEN_BRACKET);
                var expression = this.expression();
                this.iterator.advanceIf(Tokenizer_3.TokenType.CLOSE_BRACKET);
                elseIfStatements.push(new ParserTypes_1.ElseIfStmt(expression, this.statement()));
            }
            var elseBranch = undefined;
            if (this.iterator.match(Tokenizer_3.TokenType.ELSE)) {
                // if else branch exists, then consume it.
                this.iterator.advance(); // consume ELSE token
                elseBranch = this.statement();
            }
            return new ParserTypes_1.IfStmt(expr, thenBranch, elseIfStatements, elseBranch);
        };
        ParserMapper.prototype.blockStatement = function () {
            // consume open brace.
            this.iterator.advanceIf(Tokenizer_3.TokenType.OPEN_BRACE);
            var statements = [];
            while ((!this.iterator.isAtEnd() && !this.iterator.match(Tokenizer_3.TokenType.CLOSE_BRACE))) {
                statements.push(this.statement());
            }
            // consume close brace.
            this.iterator.advanceIf(Tokenizer_3.TokenType.CLOSE_BRACE);
            return new ParserTypes_1.BlockStmt(statements);
        };
        ParserMapper.prototype.whileStatement = function () {
            // consume while.
            this.iterator.advanceIf(Tokenizer_3.TokenType.WHILE);
            // consume open brace.
            this.iterator.advanceIf(Tokenizer_3.TokenType.OPEN_BRACKET);
            var expression = this.expression();
            this.iterator.advanceIf(Tokenizer_3.TokenType.CLOSE_BRACKET);
            // consume the loop body.
            return new ParserTypes_1.WhileStmt(expression, this.statement());
        };
        ParserMapper.prototype.functionStatement = function () {
            // consume function.
            this.iterator.advanceIf(Tokenizer_3.TokenType.FUNCTION);
            var functionName = this.iterator.consumeIf(Tokenizer_3.TokenType.IDENTIFIER).value;
            var identifiers = [];
            this.iterator.advanceIf(Tokenizer_3.TokenType.OPEN_BRACKET);
            if (!this.iterator.match(Tokenizer_3.TokenType.CLOSE_BRACKET)) {
                do {
                    identifiers.push(this.iterator.consumeIf(Tokenizer_3.TokenType.IDENTIFIER).value);
                } while (this.iterator.matchAndAdvance(Tokenizer_3.TokenType.COMMA));
            }
            this.iterator.advanceIf(Tokenizer_3.TokenType.CLOSE_BRACKET);
            var body = this.statement();
            return new ParserTypes_1.FunctionStmt(functionName, identifiers, body);
        };
        ParserMapper.prototype.call = function () {
            var expr = this.primary();
            if (!this.iterator.match(Tokenizer_3.TokenType.OPEN_BRACKET)) {
                return expr;
            }
            this.iterator.advanceIf(Tokenizer_3.TokenType.OPEN_BRACKET);
            var args = [];
            if (!this.iterator.match(Tokenizer_3.TokenType.CLOSE_BRACKET)) {
                do {
                    args.push(this.expression());
                } while (this.iterator.matchAndAdvance(Tokenizer_3.TokenType.COMMA));
            }
            this.iterator.advanceIf(Tokenizer_3.TokenType.CLOSE_BRACKET);
            return new ParserTypes_1.CallExpr(expr, args);
        };
        ParserMapper.prototype.returnStatement = function () {
            this.iterator.advanceIf(Tokenizer_3.TokenType.RETURN);
            return new ParserTypes_1.ReturnStmt(this.expression());
        };
        ParserMapper.prototype.assignmentStatement = function () {
            var identifier = this.iterator.consumeIf(Tokenizer_3.TokenType.IDENTIFIER).value;
            // skip the equals sign
            this.iterator.advanceIf(Tokenizer_3.TokenType.EQUALS);
            var expr = this.expression();
            return new ParserTypes_1.AssignmentExpr(identifier, Tokenizer_3.TokenType.IDENTIFIER, expr);
        };
        ParserMapper.prototype.printStatement = function () {
            // consume print token.
            this.iterator.advanceIf(Tokenizer_3.TokenType.PRINT);
            return new ParserTypes_1.PrintStmt(this.expression());
        };
        return ParserMapper;
    }());
    exports.ParserMapper = ParserMapper;
});
define("parser/DefaultParser", ["require", "exports", "parser/ParserMapper", "parser/ParserIterator"], function (require, exports, ParserMapper_1, ParserIterator_1) {
    "use strict";
    exports.__esModule = true;
    exports.DefaultParser = void 0;
    var DefaultParser = /** @class */ (function () {
        function DefaultParser(tokens) {
            this.tokens = tokens;
            this.mapper = new ParserMapper_1.ParserMapper(new ParserIterator_1.ParserIterator(tokens));
        }
        DefaultParser.prototype.parse = function () {
            return this.mapper.getStatements();
        };
        return DefaultParser;
    }());
    exports.DefaultParser = DefaultParser;
});
define("parser/ParserFactory", ["require", "exports", "parser/DefaultParser"], function (require, exports, DefaultParser_1) {
    "use strict";
    exports.__esModule = true;
    exports.ParserFactory = void 0;
    var ParserFactory = /** @class */ (function () {
        function ParserFactory() {
        }
        ParserFactory.getParser = function (tokens) {
            return new DefaultParser_1.DefaultParser(tokens);
        };
        return ParserFactory;
    }());
    exports.ParserFactory = ParserFactory;
});
define("translator/TranslatorIterator", ["require", "exports", "iterator/iterator", "tokenizer/Tokenizer"], function (require, exports, iterator_3, Tokenizer_4) {
    "use strict";
    exports.__esModule = true;
    exports.TranslatorIterator = void 0;
    var TranslatorIterator = /** @class */ (function (_super) {
        __extends(TranslatorIterator, _super);
        function TranslatorIterator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TranslatorIterator.prototype.translateTokenType = function (operator) {
            switch (operator) {
                case Tokenizer_4.TokenType.PLUS: return '+';
                case Tokenizer_4.TokenType.MINUS: return '-';
                case Tokenizer_4.TokenType.MULTIPLY: return '*';
                case Tokenizer_4.TokenType.DIVIDE: return '/';
                case Tokenizer_4.TokenType.MODULO: return '%';
                case Tokenizer_4.TokenType.LESSER_THAN_OR_EQUAL_TO: return '<=';
                case Tokenizer_4.TokenType.GREATER_THAN_OR_EQUAL_TO: return '>=';
                case Tokenizer_4.TokenType.EQUALS_EQUALS: return '==';
                case Tokenizer_4.TokenType.OPEN_BRACKET: return '(';
                case Tokenizer_4.TokenType.CLOSE_BRACKET: return ')';
                case Tokenizer_4.TokenType.OPEN_BRACE: return '{';
                case Tokenizer_4.TokenType.CLOSE_BRACE: return '}';
                case Tokenizer_4.TokenType.OPEN_SQUARE_BRACKET: return '[';
                case Tokenizer_4.TokenType.CLOSE_SQUARE_BRACKET: return ']';
                case Tokenizer_4.TokenType.LESS_THAN: return '<';
                case Tokenizer_4.TokenType.GREATER_THAN: return '>';
                case Tokenizer_4.TokenType.EQUALS: return '=';
                case Tokenizer_4.TokenType.LOGICAL_AND: return '&&';
                case Tokenizer_4.TokenType.LOGICAL_OR: return '||';
            }
        };
        return TranslatorIterator;
    }(iterator_3.Iterator));
    exports.TranslatorIterator = TranslatorIterator;
});
define("translator/TranslatorMapper", ["require", "exports", "parser/ParserTypes", "tokenizer/Tokenizer"], function (require, exports, ParserTypes_2, Tokenizer_5) {
    "use strict";
    exports.__esModule = true;
    exports.TranslatorMapper = void 0;
    var TranslatorMapper = /** @class */ (function () {
        function TranslatorMapper(iterator) {
            this.iterator = iterator;
            this.lines = [];
        }
        TranslatorMapper.prototype.getTranslation = function () {
            this.startTranslation();
            return this.lines;
        };
        TranslatorMapper.prototype.startTranslation = function () {
            this.translate();
        };
        TranslatorMapper.prototype.translate = function () {
            while (!this.iterator.isAtEnd()) {
                var statement = this.iterator.consume();
                this.add(this.visitStatement(statement));
            }
        };
        TranslatorMapper.prototype.add = function (s) {
            this.lines.push(s);
        };
        TranslatorMapper.prototype.visitStatement = function (stmt) {
            if (stmt instanceof ParserTypes_2.IfStmt) {
                return this.visitIfStmt(stmt);
            }
            else if (stmt instanceof ParserTypes_2.BlockStmt) {
                return this.visitBlockStmt(stmt);
            }
            else if (stmt instanceof ParserTypes_2.FunctionStmt) {
                return this.visitFunctionStmt(stmt);
            }
            else if (stmt instanceof ParserTypes_2.ReturnStmt) {
                return this.visitReturnStmt(stmt);
            }
            else if (stmt instanceof ParserTypes_2.WhileStmt) {
                return this.visitWhileStmt(stmt);
            }
            else if (stmt instanceof ParserTypes_2.PrintStmt) {
                return this.visitPrintStmt(stmt);
            }
            return this.visitExpression(stmt);
        };
        TranslatorMapper.prototype.visitExpression = function (expr) {
            if (expr instanceof ParserTypes_2.LiteralExpr) {
                return this.visitLiteralExpr(expr);
            }
            else if (expr instanceof ParserTypes_2.NumericalExpr) {
                return this.visitNumericalExpr(expr);
            }
            else if (expr instanceof ParserTypes_2.AssignmentExpr) {
                return this.visitAssignmentExpr(expr);
            }
            else if (expr instanceof ParserTypes_2.BinaryExpr) {
                return this.visitBinaryExpr(expr);
            }
            else if (expr instanceof ParserTypes_2.IdentifierExpr) {
                return this.visitIdentifierExpr(expr);
            }
            else if (expr instanceof ParserTypes_2.UnaryExpr) {
                return this.visitUnaryExpr(expr);
            }
            else if (expr instanceof ParserTypes_2.BooleanExpr) {
                return this.visitBooleanExpr(expr);
            }
            else if (expr instanceof ParserTypes_2.CallExpr) {
                return this.visitCallExpr(expr);
            }
            else if (expr instanceof ParserTypes_2.GroupingExpr) {
                return this.visitGroupingExpr(expr);
            }
        };
        TranslatorMapper.prototype.visitBinaryExpr = function (e) {
            var left = this.visitExpression(e.left);
            var operator = this.iterator.translateTokenType(e.operator);
            var right = this.visitExpression(e.right);
            return "".concat(left, " ").concat(operator, " ").concat(right);
        };
        TranslatorMapper.prototype.visitGroupingExpr = function (e) {
            return "( " + this.visitExpression(e.expr) + " )";
        };
        TranslatorMapper.prototype.visitUnaryExpr = function (e) {
            return "".concat(this.iterator.translateTokenType(e.operator)).concat(this.visitExpression(e.right));
        };
        TranslatorMapper.prototype.visitLiteralExpr = function (e) {
            return "'".concat(e.value, "'");
        };
        TranslatorMapper.prototype.visitCallExpr = function (e) {
            var _this = this;
            var args = e.args.map(function (el) { return _this.visitExpression(el); })
                .join(",");
            return "".concat(this.visitExpression(e.functionName), "(").concat(args, ")");
        };
        TranslatorMapper.prototype.visitIdentifierExpr = function (e) {
            return "".concat(e.identifier);
        };
        TranslatorMapper.prototype.visitNumericalExpr = function (e) {
            return e.value;
        };
        TranslatorMapper.prototype.visitAssignmentExpr = function (e) {
            var expr = this.visitExpression(e.right);
            if (e.type === Tokenizer_5.TokenType.IDENTIFIER) {
                return "".concat(e.identifier, " = ").concat(expr);
            }
            var assignmentType = e.type === Tokenizer_5.TokenType.CONSTANT ? 'const' : 'var';
            return "".concat(assignmentType, " ").concat(e.identifier, " = ").concat(expr);
        };
        TranslatorMapper.prototype.visitIfStmt = function (e) {
            var _this = this;
            var expr = this.visitExpression(e.expr);
            var thenBranch = this.visitStatement(e.thenBranch);
            var parts = '';
            if (e.elseIfBranches.length !== 0) {
                parts += e.elseIfBranches.map(function (elseIfBranch) { return _this.visitElseIfStmt(elseIfBranch); }).join("\n");
            }
            if (e.elseBranch !== undefined) {
                parts += "\nelse ".concat(this.visitStatement(e.elseBranch));
            }
            if (parts !== '') {
                return "if ( ".concat(expr, " ) ").concat(thenBranch, "\n") + parts;
            }
            return "if ( ".concat(expr, " ) ").concat(thenBranch);
        };
        TranslatorMapper.prototype.visitWhileStmt = function (e) {
            return "while ( ".concat(this.visitExpression(e.expr), " ) ").concat(this.visitStatement(e.statement));
        };
        TranslatorMapper.prototype.visitElseIfStmt = function (e) {
            return "else if ( ".concat(this.visitExpression(e.expr), " ) ").concat(this.visitStatement(e.statement));
        };
        TranslatorMapper.prototype.visitPrintStmt = function (e) {
            return "thendralPrint( ".concat(this.visitExpression(e.expr), " )");
        };
        TranslatorMapper.prototype.visitBlockStmt = function (e) {
            var _this = this;
            if (e.statements.length === 0) {
                return '{}';
            }
            return '{ ' + e.statements.map(function (e) { return _this.visitStatement(e); })
                .join("\n") + ' }';
        };
        TranslatorMapper.prototype.visitReturnStmt = function (e) {
            return "return ".concat(this.visitExpression(e.expr));
        };
        TranslatorMapper.prototype.visitFunctionStmt = function (e) {
            return "function ".concat(e.identifier, " (").concat(e.parameters.join(","), ") ").concat(this.visitStatement(e.body));
        };
        TranslatorMapper.prototype.visitBooleanExpr = function (e) {
            return e.type === Tokenizer_5.TokenType.TRUE ? 'true' : 'false';
        };
        return TranslatorMapper;
    }());
    exports.TranslatorMapper = TranslatorMapper;
});
define("translator/DefaultTranslator", ["require", "exports", "translator/TranslatorMapper", "translator/TranslatorIterator"], function (require, exports, TranslatorMapper_1, TranslatorIterator_1) {
    "use strict";
    exports.__esModule = true;
    exports.DefaultTranslator = void 0;
    var DefaultTranslator = /** @class */ (function () {
        function DefaultTranslator(statements) {
            this.statements = statements;
            this.translatorMapper = new TranslatorMapper_1.TranslatorMapper(new TranslatorIterator_1.TranslatorIterator(statements));
        }
        DefaultTranslator.prototype.translate = function () {
            return this.translatorMapper.getTranslation();
        };
        return DefaultTranslator;
    }());
    exports.DefaultTranslator = DefaultTranslator;
});
define("translator/Translator", ["require", "exports", "translator/DefaultTranslator"], function (require, exports, DefaultTranslator_1) {
    "use strict";
    exports.__esModule = true;
    exports.TranslatorFactory = void 0;
    var TranslatorFactory = /** @class */ (function () {
        function TranslatorFactory() {
        }
        TranslatorFactory.getTranslator = function (statements) {
            return new DefaultTranslator_1.DefaultTranslator(statements);
        };
        return TranslatorFactory;
    }());
    exports.TranslatorFactory = TranslatorFactory;
});
define("Transpiler", ["require", "exports", "tokenizer/Tokenizer", "parser/ParserFactory", "translator/Translator"], function (require, exports, Tokenizer_6, ParserFactory_1, Translator_1) {
    "use strict";
    exports.__esModule = true;
    exports.thendral = void 0;
    function thendral(code) {
        try {
            var tokens = Tokenizer_6.TokenizerFactory.getTokenizer(code).getTokens();
            var statements = ParserFactory_1.ParserFactory.getParser(tokens).parse();
            var translatedCode = Translator_1.TranslatorFactory.getTranslator(statements).translate();
            return {
                code: translatedCode.join("\n"),
                error: undefined
            };
        }
        catch (error) {
            return {
                code: undefined,
                error: error
            };
        }
    }
    exports.thendral = thendral;
});
