"use strict";

var _generatereactdoc = require("../generatereactdoc");

describe('ProcessProp', function () {
  it('Process prop should not modify the default value if the type is a string', function () {
    var mockProp = {
      type: {
        name: 'string'
      },
      defaultValue: {
        value: 'somestring'
      }
    };
    var output = (0, _generatereactdoc.processProp)(mockProp);
    expect(output).toMatchSnapshot();
  });
  it('Process prop should not modify the default value if the type is not string but default value doesnt have special characters', function () {
    var mockProp = {
      type: {
        name: 'number'
      },
      defaultValue: {
        value: 22
      }
    };
    var output = (0, _generatereactdoc.processProp)(mockProp);
    expect(output).toMatchSnapshot();
  });
  it('Process prop should overwrite the default value when type is not string and there are invalid characters', function () {
    var mockProp = {
      type: {
        name: 'number'
      },
      defaultValue: {
        value: '@#454'
      }
    };
    var output = (0, _generatereactdoc.processProp)(mockProp);
    expect(output).toMatchSnapshot();
  });
});