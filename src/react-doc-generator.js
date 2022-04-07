#!/usr/bin/env node
require("@babel/polyfill");
import fs from "fs";
import path from "path";
import generateReactDocs from "./generatereactdoc";
import Command from "./lib/command.js";
import Handlebars from "handlebars";

import Colors from "colors";
import Table from "cli-table";
Handlebars.registerHelper("inc", (value, options) => {
  return parseInt(value, 10) + 1;
});
(async () => {
  const pkg = require("../package.json");
  const template = Handlebars.compile(
    `${fs.readFileSync(path.join(__dirname, "template.handlebars"))}`
  );
  const table = new Table({
    head: [
      Colors.cyan("Path"),
      Colors.cyan("Components"),
      Colors.cyan("Status"),
    ],
  });
  console.log(Colors.white(`\n\nREACT DOC GENERATOR v${pkg.version}`));
  console.log(Colors.white(`by Marcin Borkowski <marborkowski@gmail.com>`));

  try {
    if (Command.args.length !== 1) {
      console.log(
        `${Colors.red("Please specify <dir> as the first argument!")}`
      );
      Command.help();
    } else {
      const [templateData, cliOutput] = await generateReactDocs({
        sourceDir: Command.args[0],
        extensions: Command.opts().extensions,
        excludePatterns: Command.opts().excludePatterns,
        ignoreDirectory: Command.opts().ignore,
      });
      const outputFile = fs.createWriteStream(Command.opts().output);
      outputFile.write(template(templateData));
      cliOutput.forEach((cliRow) => {
        table.push(cliRow);
      });
      console.log(table.toString());
    }
  } catch (e) {
    console.error("Error occurred", e);
  }
})();
