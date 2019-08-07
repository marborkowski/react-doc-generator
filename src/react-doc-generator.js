#!/usr/bin/env node
require("@babel/polyfill");
import fs from 'fs'
import generateReactDocs from './generatereactdoc'
import Command from './lib/command.js';
import Handlebars from 'handlebars';

import Colors from 'colors';
import Table from 'cli-table';
Handlebars.registerHelper('inc', (value, options) => {
    return parseInt(value, 10) + 1;
});
(async () => {
    const pkg = require('../package.json');
    const template = Handlebars.compile(`${fs.readFileSync(path.join(__dirname, 'template.handlebars'))}`);
    const table = new Table({
        head: [
            Colors.cyan('Path'),
            Colors.cyan('Components'),
            Colors.cyan('Status')
        ]
    });
    console.log(Colors.white(`\n\nREACT DOC GENERATOR v${pkg.version}`));
    console.log(Colors.white(`by Marcin Borkowski <marborkowski@gmail.com>`));
    try{
        if (Command.args.length !== 1) {
            console.log(`${Colors.red('Please specify <dir> as the first argument!')}`);
            Command.help();
        } else {
            const templateData = await generateReactDocs(Command.args[0],Command.extensions,Command.excludePatterns,Command.ignore,Command.output )
            const outputFile = fs.createWriteStream(Command.output);
            outputFile.write(template(templateData))
        }
    }catch(e){
        console.error('Error occurred',e)
    }
   
})()

