"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInvalidDefaultValue = exports.isDefaultValueTypeString = exports.getTypeOfProp = exports["default"] = void 0;
exports.processProp = processProp;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = _interopRequireDefault(require("path"));

var _reactDocgen = require("react-docgen");

var _util = require("util");

var _nodeDir = require("node-dir");

var _colors = _interopRequireDefault(require("colors"));

var _package = _interopRequireDefault(require("../package.json"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null == arguments[i] ? {} : arguments[i]; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var readFilesPromise = (0, _util.promisify)(_nodeDir.readFiles);
var templateData = {
  files: [],
  version: _package["default"].version
};

var isDefaultValueTypeString = function isDefaultValueTypeString(prop) {
  return prop && prop.type ? prop.type.name === "string" && typeof prop.defaultValue.value === "string" : null;
};

exports.isDefaultValueTypeString = isDefaultValueTypeString;

var isInvalidDefaultValue = function isInvalidDefaultValue(value) {
  return /[^\w\s.&:\-+*,!@%$]+/gim.test(value);
};

exports.isInvalidDefaultValue = isInvalidDefaultValue;

var getTypeOfProp = function getTypeOfProp(prop) {
  if (!prop) return "";
  if (prop.type) return prop.type;

  if (prop.flowType) {
    var typeName = prop.flowType.raw ? prop.flowType.raw : prop.flowType.name;
    return {
      name: typeName
    };
  }
};

exports.getTypeOfProp = getTypeOfProp;

function processProp(prop) {
  var _prop$defaultValue = prop.defaultValue,
      defaultValue = _prop$defaultValue === void 0 ? {} : _prop$defaultValue;
  var isString = isDefaultValueTypeString(prop);
  var isInvalidValue = isInvalidDefaultValue(defaultValue.value);
  var processedType = getTypeOfProp(prop);
  var processedDefaultValue = defaultValue && isInvalidValue && isString === false ? "See code" : defaultValue.value;
  var processedDescription = prop.description ? prop.description.split("\n").map(function (text) {
    return text.replace(/(^\s+|\s+$)/, "");
  }).map(function (hasValidValue) {
    return hasValidValue;
  }).join(" ") : "";
  return _objectSpread(_objectSpread({}, prop), {}, {
    defaultValue: _objectSpread(_objectSpread({}, prop.defaultValue), {}, {
      value: processedDefaultValue
    }),
    description: processedDescription,
    type: processedType
  });
}

function parseSingleFile(fileContent) {
  var components = (0, _reactDocgen.parse)(fileContent, _reactDocgen.resolver.findAllExportedComponentDefinitions);
  var componentObjects = components.map(function (component) {
    var description = component.description,
        displayName = component.displayName;
    var modifiedTitle = description && !displayName ? description.match(/^(.*)$/m)[0] : displayName;
    var modifiedDescription = null;
    description && (description.split("\n").length > 1 && (modifiedDescription = description.replace(/[\w\W]+?\n+?/, ""), modifiedDescription = modifiedDescription.replace(/(\n)/gm, "   \n")), modifiedDescription = "".concat(modifiedDescription, "   \n\n"));
    // validate default values
    var propEntries = Object.entries(component.props);
    var modifiedPropEntries = propEntries.map(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          propName = _ref2[0],
          propObject = _ref2[1];

      var modifiedProp = processProp(propObject);
      return [propName, modifiedProp];
    });
    var modife = modifiedPropEntries.reduce(function (accum, current) {
      var modifiedAccum = _objectSpread(_objectSpread({}, accum), {}, (0, _defineProperty2["default"])({}, current[0], current[1]));

      return modifiedAccum;
    }, {});
    return _objectSpread(_objectSpread({}, component), {}, {
      title: modifiedTitle,
      description: modifiedDescription,
      props: modife
    });
  });
  return componentObjects;
}

function generateReactDocs(_x) {
  return _generateReactDocs.apply(this, arguments);
}

function _generateReactDocs() {
  return _generateReactDocs = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref3) {
    var sourceDir, _ref3$extensions, extensions, _ref3$excludePatterns, excludePatterns, _ref3$ignoreDirectory, ignoreDirectory, cliOutput, inputPath, allExtensions;

    return _regenerator["default"].wrap(function _callee$(_context) {
      for (; 1;) switch (_context.prev = _context.next) {
        case 0:
          return sourceDir = _ref3.sourceDir, _ref3$extensions = _ref3.extensions, extensions = _ref3$extensions === void 0 ? [] : _ref3$extensions, _ref3$excludePatterns = _ref3.excludePatterns, excludePatterns = _ref3$excludePatterns === void 0 ? [] : _ref3$excludePatterns, _ref3$ignoreDirectory = _ref3.ignoreDirectory, ignoreDirectory = _ref3$ignoreDirectory === void 0 ? [] : _ref3$ignoreDirectory, cliOutput = [], inputPath = _path["default"].resolve(sourceDir), _context.next = 5, readFilesPromise(inputPath, {
            match: new RegExp("\\.(?:" + extensions.join("|") + ")$"),
            exclude: excludePatterns,
            excludeDir: ignoreDirectory
          }, function (err, content, filename, next) {
            if (err) throw console.log(err, "error"), err;

            try {
              var components = parseSingleFile(content);
              templateData.files.push({
                filename: filename,
                components: components
              }), cliOutput.push([filename, components.length, _colors["default"].green("OK.")]);
            } catch (e) {
              console.error("In error", e), cliOutput.push([filename, 0, _colors["default"].red("You have to export at least one valid React Class!")]);
            }

            next();
          });

        case 5:
          if (templateData.files.length !== 0) {
            _context.next = 8;
            break;
          }

          allExtensions = extensions.map(function (ext) {
            return "`*.".concat(ext, "`");
          }), console.log("".concat(_colors["default"].bold.yellow("Warning:"), " ").concat(_colors["default"].yellow("Could not find any files matching the file type: ".concat(allExtensions.join(" OR "))), "\n"));

        case 8:
          return _context.abrupt("return", [templateData, cliOutput]);

        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), _generateReactDocs.apply(this, arguments);
}

var _default = generateReactDocs;
exports["default"] = _default;