"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Component1 = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * General component description.
 */
var Component1 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Component1, _React$Component);

  function Component1() {
    _classCallCheck(this, Component1);

    return _possibleConstructorReturn(this, _getPrototypeOf(Component1).apply(this, arguments));
  }

  _createClass(Component1, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, "Hello");
    }
  }]);

  return Component1;
}(_react["default"].Component);
/**
 * General another component description.
 * Blah blah blah...
 * fdfdfsdf
 * fdsfsd
 */


exports.Component1 = Component1;

_defineProperty(Component1, "propTypes", {
  /**
   * Description of prop "foo".
   */
  foo: _react["default"].PropTypes.number,

  /**
   * Description of prop "bar" (a custom validation function).
   */
  bar: function bar(props, propName, componentName) {// ...
  },
  baz: _react["default"].PropTypes.oneOfType([_react["default"].PropTypes.number, _react["default"].PropTypes.string]),
  onExit: _react["default"].PropTypes.func
});

_defineProperty(Component1, "defaultProps", {
  foo: 10000099999,
  onExit: function onExit() {
    console.debug('onExit');
  }
});

var Component2 =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Component2, _React$Component2);

  function Component2() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Component2);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Component2)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "displayName", "DUPA");

    return _this;
  }

  _createClass(Component2, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, "Hello");
    }
  }]);

  return Component2;
}(_react["default"].Component);

_defineProperty(Component2, "propTypes", {
  /**
   * Description of prop "foo".
   */
  foo: _react["default"].PropTypes.number,

  /**
   * Description of prop "bar" (a custom validation function).
   */
  bar: function bar(props, propName, componentName) {// ...
  },
  baz: _react["default"].PropTypes.oneOfType([_react["default"].PropTypes.number, _react["default"].PropTypes.string])
});

var _default = Component2;
exports["default"] = _default;