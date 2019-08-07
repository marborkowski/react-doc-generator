"use strict";

var _generatereactdoc = require("../generatereactdoc");

describe('isDefaultValueTypeString', function () {
  it('Should return false if type of default value is not string', function () {
    var mockInput = {
      type: {
        name: 'number'
      },
      defaultValue: {
        value: 23
      }
    };
    var isString = (0, _generatereactdoc.isDefaultValueTypeString)(mockInput);
    expect(isString).toEqual(false);
  });
  it('Should return false if type of default value is string but prop type is not string', function () {
    var mockInput = {
      type: {
        name: 'number'
      },
      defaultValue: {
        value: 'sdsd'
      }
    };
    var isString = (0, _generatereactdoc.isDefaultValueTypeString)(mockInput);
    expect(isString).toEqual(false);
  });
  it('Should return null if prop was undefined', function () {
    var isString = (0, _generatereactdoc.isDefaultValueTypeString)();
    expect(isString).toEqual(null);
  });
  it('Should return true if prop type was string and typeof default value was also string', function () {
    var mockInput = {
      type: {
        name: 'string'
      },
      defaultValue: {
        value: 'sdsd'
      }
    };
    var isString = (0, _generatereactdoc.isDefaultValueTypeString)(mockInput);
    expect(isString).toEqual(true);
  });
});