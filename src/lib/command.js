import Commander from 'commander';
const pkg = require('../../package.json');

export default (function Command () {

  const list = (val) => {
      val = val.replace(/[, ]+/g, ',').trim();
      return val.split(',').filter(value => value.length > 0);
  }

  Commander
    .version(pkg.version)
    .usage(`<dir> [options]`)
    .option('-x, --extensions <items>', 'Include only these file extensions. Default: js,jsx', list, ['js', 'jsx'])
    .option('-i, --ignore <items>', 'Folders to ignore. Default: node_modules,__tests__,__mocks__', list, ['node_modules', '__tests__', '__mocks__'])
    .option('-e, --exclude-patterns <items>', 'Filename patterns to exclude. Default: []', list, ['.*\.spec.(jsx|js)' ])
	.option('-f, --format <format>', 'Output format (markdown|asciiddoc) [asciidoc]')
    .option('-t, --title [value]', 'Document title. Default: \'Components\'', 'Components')
    .option('-o, --output <file>', 'Output file to write. Default (asciidoc): \'DOCUMENTATION.ADOC\'')
	.option('--handlebar-template [path]', 'Custom handlebar output template. Alternative to --format.')
    .parse(process.argv);


    return Commander;
})()
