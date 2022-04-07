#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _generatereactdoc = _interopRequireDefault(require("./generatereactdoc"));

var _command = _interopRequireDefault(require("./lib/command.js"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _colors = _interopRequireDefault(require("colors"));

var _cliTable = _interopRequireDefault(require("cli-table"));

_handlebars["default"].registerHelper("inc", function (value, options) {
  return parseInt(value, 10) + 1;
}), (0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  var pkg, template, table, _yield$generateReactD, _yield$generateReactD2, templateData, cliOutput, outputFile;

  return _regenerator["default"].wrap(function _callee$(_context) {
    for (; 1;) switch (_context.prev = _context.next) {
      case 0:
        if (pkg = require("../package.json"), template = _handlebars["default"].compile("".concat(_fs["default"].readFileSync(_path["default"].join(__dirname, "template.handlebars")))), table = new _cliTable["default"]({
          head: [_colors["default"].cyan("Path"), _colors["default"].cyan("Components"), _colors["default"].cyan("Status")]
        }), console.log(_colors["default"].white("\n\nREACT DOC GENERATOR v".concat(pkg.version))), console.log(_colors["default"].white("by Marcin Borkowski <marborkowski@gmail.com>")), _context.prev = 4, _command["default"].args.length === 1) {
          _context.next = 9;
          break;
        }

        console.log("".concat(_colors["default"].red("Please specify <dir> as the first argument!"))), _command["default"].help(), _context.next = 17;
        break;

      case 9:
        return _context.next = 11, (0, _generatereactdoc["default"])({
          sourceDir: _command["default"].args[0],
          extensions: _command["default"].opts().extensions,
          excludePatterns: _command["default"].opts().excludePatterns,
          ignoreDirectory: _command["default"].opts().ignore
        });

      case 11:
        _yield$generateReactD = _context.sent, _yield$generateReactD2 = (0, _slicedToArray2["default"])(_yield$generateReactD, 2), templateData = _yield$generateReactD2[0], cliOutput = _yield$generateReactD2[1], outputFile = _fs["default"].createWriteStream(_command["default"].opts().output), outputFile.write(template(templateData)), cliOutput.forEach(function (cliRow) {
          table.push(cliRow);
        }), console.log(table.toString());

      case 17:
        _context.next = 22;
        break;

      case 19:
        _context.prev = 19, _context.t0 = _context["catch"](4), console.error("Error occurred", _context.t0);

      case 22:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[4, 19]]);
}))();