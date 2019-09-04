"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// https://travis-ci.org/marborkowski/react-doc-generator
require("@babel/polyfill");

var TEST_TIMEOUT = 120000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = TEST_TIMEOUT; // eslint-disable-line no-undef

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
    });
    spawned.stderr.on("data", function (data) {
      return stderr.push(data);
    });
    spawned.on("close", function () {
      return resolve([stdout.join(""), stderr.join("")]);
    });
    spawned.on("error", function (err) {
      throw err;
    });
  })["catch"](function (error) {
    console.log(error, "Error");
    throw error;
  });
}

function loadDoc() {
  return new Promise(function (resolve, reject) {
    fs.readFile("./dist/DOCUMENTATION.md", "utf8", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

var binPath = path.join(__dirname, "../../dist/react-doc-generator.js");
fs.chmodSync(binPath, "0777");
describe("react-doc-generator", function () {
  it("has the proper console output",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var stdout, output;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return run("node", [binPath, "src/__mocks__", "-o", "./dist/DOCUMENTATION.md"]);

          case 3:
            stdout = _context.sent;
            output = stdout[0];
            expect(output).toMatchSnapshot();
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            throw _context.t0;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  })));
  it("return the proper message when given extensions not found",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var stdout, output;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return run("node", [binPath, "src/__mocks__", "-o", "./dist/DOCUMENTATION.md", "-x", "4hs0,kku4"]);

          case 3:
            stdout = _context2.sent;
            output = stdout[0];
            expect(output).toMatchSnapshot();
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  })));
  it("contains help section if no argument is available in query",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var stdout, output;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return run("node", [binPath, "-o", "./dist/DOCUMENTATION.md"]);

          case 3:
            stdout = _context3.sent;
            output = stdout[0];
            expect(output).toMatchSnapshot();
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  })));
});
describe("output file", function () {
  it("has needed values",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var result, lines;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return run("node", [binPath, "src/__mocks__", "-o", "./dist/DOCUMENTATION.md", "-t", "MyTitleXYZ"]);

          case 3:
            _context4.next = 5;
            return loadDoc();

          case 5:
            result = _context4.sent;
            lines = result.split("\n");
            expect(lines).toMatchSnapshot();
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  })));
});