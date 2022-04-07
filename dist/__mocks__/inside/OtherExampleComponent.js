"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Component1 = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var result, Super = (0, _getPrototypeOf2["default"])(Derived); if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else result = Super.apply(this, arguments); return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), true; } catch (e) { return false; } }

/**
 * General component description.
 */
var Component1 =
/*#__PURE__*/
function (_React$Component) {
  function Component1() {
    return (0, _classCallCheck2["default"])(this, Component1), _super.apply(this, arguments);
  }

  (0, _inherits2["default"])(Component1, _React$Component);

  var _super = _createSuper(Component1);

  return (0, _createClass2["default"])(Component1, [{
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _react["default"].createElement("div", null, "Hello")
      );
    }
  }]), Component1;
}(_react["default"].Component);
/**
 * General another component description.
 * Blah blah blah...
 * fdfdfsdf
 * fdsfsd
 */


exports.Component1 = Component1;
(0, _defineProperty2["default"])(Component1, "propTypes", {
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
(0, _defineProperty2["default"])(Component1, "defaultProps", {
  foo: 10000099999,
  onExit: function onExit() {
    console.debug('onExit');
  }
});

var Component2 =
/*#__PURE__*/
function (_React$Component2) {
  function Component2() {
    var _this;

    (0, _classCallCheck2["default"])(this, Component2);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];

    return _this = _super2.call.apply(_super2, [this].concat(args)), (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "displayName", "DUPA"), _this = _super2.call.apply(_super2, [this].concat(args)), (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "displayName", "DUPA"), _this;
  }

  (0, _inherits2["default"])(Component2, _React$Component2);

  var _super2 = _createSuper(Component2);

  return (0, _createClass2["default"])(Component2, [{
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _react["default"].createElement("div", null, "Hello")
      );
    }
  }]), Component2;
}(_react["default"].Component);

(0, _defineProperty2["default"])(Component2, "propTypes", {
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