"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processProp = processProp;
exports["default"] = exports.getTypeOfProp = exports.isInvalidDefaultValue = exports.isDefaultValueTypeString = void 0;

var _path = _interopRequireDefault(require("path"));

var _reactDocgen = require("react-docgen");

var _util = require("util");

var _nodeDir = require("node-dir");

var _colors = _interopRequireDefault(require("colors"));

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var readFilesPromise = (0, _util.promisify)(_nodeDir.readFiles);
var templateData = {
  files: [],
  version: _package["default"].version
};

var isDefaultValueTypeString = function isDefaultValueTypeString(prop) {
  if (!prop || !prop.type) {
    return null;
  }

  return prop.type.name === "string" && typeof prop.defaultValue.value === "string";
};

exports.isDefaultValueTypeString = isDefaultValueTypeString;

var isInvalidDefaultValue = function isInvalidDefaultValue(value) {
  return /[^\w\s.&:\-+*,!@%$]+/gim.test(value);
};

exports.isInvalidDefaultValue = isInvalidDefaultValue;

var getTypeOfProp = function getTypeOfProp(prop) {
  if (!prop) {
    return '';
  }

  if (prop.type) {
    return prop.type;
  } else if (prop.flowType) {
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
  return _objectSpread({}, prop, {
    defaultValue: _objectSpread({}, prop.defaultValue, {
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

    if (description) {
      if (description.split("\n").length > 1) {
        modifiedDescription = description.replace(/[\w\W]+?\n+?/, "");
        modifiedDescription = modifiedDescription.replace(/(\n)/gm, "   \n");
      }

      modifiedDescription = "".concat(modifiedDescription, "   \n\n");
    } // validate default values


    var propEntries = Object.entries(component.props);
    var modifiedPropEntries = propEntries.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          propName = _ref2[0],
          propObject = _ref2[1];

      var modifiedProp = processProp(propObject);
      return [propName, modifiedProp];
    });
    var modife = modifiedPropEntries.reduce(function (accum, current) {
      var modifiedAccum = _objectSpread({}, accum, _defineProperty({}, current[0], current[1]));

      return modifiedAccum;
    }, {});
    return _objectSpread({}, component, {
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
  _generateReactDocs = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref3) {
    var sourceDir, _ref3$extensions, extensions, _ref3$excludePatterns, excludePatterns, _ref3$ignoreDirectory, ignoreDirectory, outputDir, cliOutput, inputPath, allExtensions;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sourceDir = _ref3.sourceDir, _ref3$extensions = _ref3.extensions, extensions = _ref3$extensions === void 0 ? [] : _ref3$extensions, _ref3$excludePatterns = _ref3.excludePatterns, excludePatterns = _ref3$excludePatterns === void 0 ? [] : _ref3$excludePatterns, _ref3$ignoreDirectory = _ref3.ignoreDirectory, ignoreDirectory = _ref3$ignoreDirectory === void 0 ? [] : _ref3$ignoreDirectory, outputDir = _ref3.outputDir;
            cliOutput = [];
            inputPath = _path["default"].resolve(sourceDir);
            _context.next = 5;
            return readFilesPromise(inputPath, {
              match: new RegExp("\\.(?:" + extensions.join("|") + ")$"),
              exclude: excludePatterns,
              excludeDir: ignoreDirectory
            }, function (err, content, filename, next) {
              if (err) {
                console.log(err, "error");
                throw err;
              }

              try {
                var components = parseSingleFile(content);
                templateData.files.push({
                  filename: filename,
                  components: components
                });
                cliOutput.push([filename, components.length, _colors["default"].green("OK.")]);
              } catch (e) {
                console.error("In error");
                cliOutput.push([filename, 0, _colors["default"].red("You have to export at least one valid React Class!")]);
              }

              next();
            });

          case 5:
            if (templateData.files.length === 0) {
              allExtensions = extensions.map(function (ext) {
                return "`*.".concat(ext, "`");
              });
              console.log("".concat(_colors["default"].bold.yellow("Warning:"), " ").concat(_colors["default"].yellow("Could not find any files matching the file type: ".concat(allExtensions.join(" OR "))), "\n"));
            } else {
              console.log("".concat(cliOutput.toString(), "\n\n"));
            }

            return _context.abrupt("return", [templateData, cliOutput]);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generateReactDocs.apply(this, arguments);
}

var _default = generateReactDocs;
exports["default"] = _default;