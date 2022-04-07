"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _generatereactdoc = _interopRequireDefault(require("../generatereactdoc"));

var _path = _interopRequireDefault(require("path"));

describe("GenerateReactDoc", function () {
  it("Whole thing should work",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var output;
    return _regenerator["default"].wrap(function _callee$(_context) {
      for (; 1;) switch (_context.prev = _context.next) {
        case 0:
          return _context.next = 2, (0, _generatereactdoc["default"])({
            sourceDir: _path["default"].resolve(__dirname, "../__mocks__"),
            extensions: ["js", "jsx"],
            outputDir: _path["default"].resolve(__dirname, "../__mocks__/output.md")
          });

        case 2:
          output = _context.sent, expect(output).toMatchSnapshot();

        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
});