#!/usr/bin/env node
'use strict';

var _reactDocgen = require('react-docgen');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _nodeDir = require('node-dir');

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/team-767/simple-react-docgen/blob/master/src/simple-react-docgen.js
var pkg = require('../package.json');

var table = new _cliTable2.default({
    head: [_colors2.default.cyan('Path'), _colors2.default.cyan('Status')]
});

_handlebars2.default.registerHelper('inc', function (value, options) {
    return parseInt(value) + 1;
});

var list = function list(val) {
    val = val.replace(/[, ]+/g, ",").trim();
    return val.split(',').filter(function (value) {
        return value.length > 0;
    });
};

console.log(_colors2.default.white('\n\nREACT DOC GENERATOR v' + pkg.version));

_commander2.default.version(pkg.version).usage('<dir> [options]').option('-x, --extensions <items>', 'Include only these file extensions.', list, ['js', 'jsx']).option('-i, --ignore <items>', 'Folders to ignore.', list, ['node_modules', '__tests__', '__mocks__']).option('-e, --exclude-patterns <items>', 'Filename patterns to exclude.', list, []).option('-t, --title [title]>', 'Document title', 'Components').option('-o, --output <file>', 'Markdown file to write.', 'README.MD').parse(process.argv);

var output = _fs2.default.createWriteStream(_commander2.default.output);
var templateData = {
    files: [],
    version: pkg.version,
    documentTitle: _commander2.default.title
};

var template = _handlebars2.default.compile('' + _fs2.default.readFileSync(_path2.default.join(__dirname, 'template.handlebars')));

if (_commander2.default.args.length !== 1) {
    console.log('' + _colors2.default.red('Please specify <dir> as the first argument!'));
    _commander2.default.help();
} else {
    (0, _nodeDir.readFiles)(_commander2.default.args[0], {
        match: new RegExp('\\.(?:' + _commander2.default.extensions.join('|') + ')$'),
        exclude: _commander2.default.excludePatterns,
        excludeDir: _commander2.default.ignore
    }, function (err, content, filename, next) {
        if (err) {
            throw err;
        }

        try {
            var components = (0, _reactDocgen.parse)(content, _reactDocgen.resolver.findAllExportedComponentDefinitions);
            components = components.map(function (component) {
                if (component.description && !component.displayName) {
                    component.title = component.description.match(/^(.*)$/m)[0];
                    if (component.description.split('\n').length > 1) {
                        component.description = component.description.replace(/[\w\W]+?\n+?/, '');
                        component.description = component.description.replace(/(\n)/gm, '   \n');
                    } else {
                        component.description = null;
                    }
                } else {
                    component.title = component.displayName;
                }

                return component;
            });
            templateData.files.push({ filename: filename, components: components });
            table.push([filename, _colors2.default.green('OK.')]);
        } catch (e) {
            table.push([filename, _colors2.default.red('You have to export at least one valid React Class!')]);
        }

        next();
    }, function (err) {
        if (err) {
            throw err;
        }

        if (templateData.files.length === 0) {
            var extensions = _commander2.default.extensions.map(function (ext) {
                return '`*.' + ext + '`';
            });
            console.log(_colors2.default.bold.yellow('Warning:') + ' ' + _colors2.default.yellow('Could not find any files matching the file type: ' + extensions.join(' OR ')) + '\n');
        } else {
            console.log(table.toString() + '\n\n');
        }

        output.write(template(templateData));
    });
}