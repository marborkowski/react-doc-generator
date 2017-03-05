#!/usr/bin/env node

import { parse, resolver } from 'react-docgen';
import fs from 'fs';
import path from 'path';
import Command from './lib/command.js';
import { readFiles } from 'node-dir';
import Handlebars from 'handlebars';
import Colors from 'colors';
import Table from 'cli-table';

const pkg = require('../package.json');
const table = new Table({
    head: [
        Colors.cyan('Path'),
        Colors.cyan('Components'),
        Colors.cyan('Status')
    ]
});

Handlebars.registerHelper('inc', (value, options) => {
    return parseInt(value, 10) + 1;
});

console.log(Colors.white(`\n\nREACT DOC GENERATOR v${pkg.version}`));
console.log(Colors.white(`by Marcin Borkowski <marborkowski@gmail.com>`));



const output = fs.createWriteStream(Command.output);
const templateData = {
    files: [],
    version: pkg.version,
    documentTitle: Command.title
};

const template = Handlebars.compile(`${fs.readFileSync(path.join(__dirname, 'template.handlebars'))}`);

if (Command.args.length !== 1) {
    console.log(`${Colors.red('Please specify <dir> as the first argument!')}`);
    Command.help();
} else {
    readFiles(
        Command.args[0],
        {
            match: new RegExp('\\.(?:' + Command.extensions.join('|') + ')$'),
            exclude: Command.excludePatterns,
            excludeDir: Command.ignore,
        },
        (err, content, filename, next) => {
            if (err) {
                throw err;
            }

            try {
                let components = parse(content, resolver.findAllExportedComponentDefinitions);
                components = components.map(component => {
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

                    if (component.description) {
                        component.description = `${component.description}   \n\n`;
                    }

                    // validate default values
                    if (component.props) {
                        Object.keys(component.props).forEach(key => {
                            let obj = component.props[key];
                            if (obj.defaultValue) {
                                if ((/[^\w\s.&:\-+*,!@%$]+/igm).test(obj.defaultValue.value)) {
                                    obj.defaultValue.value = '<See the source code>';
                                }
                            }
                        });
                    }

                    return component;
                });
                templateData.files.push({ filename, components });
                table.push([
                    filename,
                    components.length,
                    Colors.green(`OK.`)
                ]);
            } catch (e) {
                table.push([
                    filename,
                    0,
                    Colors.red(`You have to export at least one valid React Class!`)
                ]);
            }

            next();
        },
        err => {
            if (err) {
                throw err;
            }

            if (templateData.files.length === 0) {
                let extensions = Command.extensions.map(ext => {
                    return `\`*.${ext}\``;
                });
                console.log(`${Colors.bold.yellow('Warning:')} ${Colors.yellow(`Could not find any files matching the file type: ${extensions.join(' OR ')}`)}\n`);
            } else {
                console.log(`${table.toString()}\n\n`);
            }

            output.write(template(templateData));
        }
    );
}
