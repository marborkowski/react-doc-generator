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

function getOutputConfig() {
	const result = {
		outputFile: Command.output || 'DOCUMENTATION.TXT',
		template: null,
		format: Command.format || 'asciidoc'
	};
	
	if(['markdown', 'asciidoc'].indexOf(result.format) === -1){
		throw 'Invalid format: ' + result.format + ', expected one of (asciidoc|markdown)';
	}
	
	result.template = Command.handlebarTemplate || path.join(__dirname, 'template-' + result.format + '.handlebars');
	
	if(!Command.output && !Command.handlebarTemplate){		
		if(result.format == 'asciidoc') {
			result.outputFile = 'DOCUMENTATION.ADOC';
		} else if (result.format == 'markdown') {
			result.outputFile = 'DOCUMENTATION.MD';
		}
	}
	
	return result;
}

const templateData = {
    files: [],
    version: pkg.version,
    documentTitle: Command.title
};


if (Command.args.length !== 1) {
    console.log(`${Colors.red('Please specify <dir> as the first argument!')}`);
    Command.help();
} else {
	
	let outputConfig = getOutputConfig();

	const output = fs.createWriteStream(outputConfig.outputFile);
	const template = Handlebars.compile(`${fs.readFileSync(outputConfig.template)}`);

	const excludeFilePatterns = new RegExp('^.*(?:' + Command.excludePatterns.join('|') + ')$');
    readFiles(
        Command.args[0],
        {
            match: new RegExp('\\.(?:' + Command.extensions.join('|') + ')$'),
            excludeDir: Command.ignore,
        },
        (err, content, filename, next) => {
            if (err) {
                throw err;
            }
			
			if(!filename.match(excludeFilePatterns)) {

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
