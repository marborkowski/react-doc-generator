import Commander from 'commander';
const pkg = require('../../package.json');

export default (function Command () {

  const list = (val) => {
      val = val.replace(/[, ]+/g, ",").trim();
      return val.split(',').filter(value => value.length > 0);
  }

  Commander
    .version(pkg.version)
    .usage(`<dir> [options]`)
    .option('-x, --extensions <items>', 'Include only these file extensions.', list, ['js', 'jsx'])
    .option('-i, --ignore <items>', 'Folders to ignore.', list, ['node_modules', '__tests__', '__mocks__'])
    .option('-e, --exclude-patterns <items>', 'Filename patterns to exclude.', list, [])
    .option('-t, --title [title]>', 'Document title', 'Components')
    .option('-o, --output <file>', 'Markdown file to write.', 'README.MD')
    .parse(process.argv);


    return Commander;
})()
