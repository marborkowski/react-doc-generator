"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// https://travis-ci.org/marborkowski/react-doc-generator
var path = require("path");

var fs = require("fs");

var spawn = require("child_process").spawn;

function run(command, args) {
  var stdout = [];
  var stderr = [];
  return new Promise(function (resolve, reject) {
    var spawned = spawn(command, args);
    spawned.stdout.on("data", function (data) {
      stdout.push(data);
    }), spawned.stderr.on("data", function (data) {
      return stderr.push(data);
    }), spawned.on("close", function () {
      return resolve([stdout.join(""), stderr.join("")]);
    }), spawned.on("error", function (err) {
      throw err;
    });
  })["catch"](function (error) {
    throw console.log(error, "Error"), error;
  });
}

function loadDoc() {
  return new Promise(function (resolve, reject) {
    fs.readFile("./dist/DOCUMENTATION.md", "utf8", function (err, data) {
      err ? reject(err) : resolve(data);
    });
  });
}

var binPath = path.join(__dirname, "../../dist/react-doc-generator.js");
fs.chmodSync(binPath, "0777"), describe("react-doc-generator", function () {
  it("has the proper console output",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var stdout, output;
    return _regenerator["default"].wrap(function _callee$(_context) {
      for (; 1;) switch (_context.prev = _context.next) {
        case 0:
          return _context.prev = 0, _context.next = 3, run("node", [binPath, "src/__mocks__", "-o", "./dist/DOCUMENTATION.md"]);

        case 3:
          stdout = _context.sent, output = stdout[0], expect(output).toMatchSnapshot(), _context.next = 11;
          break;

        case 8:
          throw _context.prev = 8, _context.t0 = _context["catch"](0), (console.error(_context.t0), _context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }))), it("return the proper message when given extensions not found",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var stdout, output;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      for (; 1;) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.prev = 0, _context2.next = 3, run("node", [binPath, "src/__mocks__", "-o", "./dist/DOCUMENTATION.md", "-x", "4hs0,kku4"]);

        case 3:
          stdout = _context2.sent, output = stdout[0], expect(output).toMatchSnapshot(), _context2.next = 11;
          break;

        case 8:
          throw _context2.prev = 8, _context2.t0 = _context2["catch"](0), _context2.t0;

        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }))), it("contains help section if no argument is available in query",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var stdout, output;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      for (; 1;) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.prev = 0, _context3.next = 3, run("node", [binPath, "-o", "./dist/DOCUMENTATION.md"]);

        case 3:
          stdout = _context3.sent, output = stdout[0], expect(output).toMatchSnapshot(), _context3.next = 11;
          break;

        case 8:
          throw _context3.prev = 8, _context3.t0 = _context3["catch"](0), _context3.t0;

        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  })));
}), describe("output file", function () {
  it("has needed values",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var result, lines;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      for (; 1;) switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.prev = 0, _context4.next = 3, run("node", [binPath, "src/__mocks__", "-o", "./dist/DOCUMENTATION.md", "-t", "MyTitleXYZ"]);

        case 3:
          return _context4.next = 5, loadDoc();

        case 5:
          result = _context4.sent, lines = result.split("\n"), expect(lines).toMatchSnapshot(), _context4.next = 13;
          break;

        case 10:
          throw _context4.prev = 10, _context4.t0 = _context4["catch"](0), _context4.t0;

        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  })));
});