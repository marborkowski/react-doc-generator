// https://travis-ci.org/marborkowski/react-doc-generator
const TEST_TIMEOUT = 120000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = TEST_TIMEOUT; // eslint-disable-line no-undef

const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;
const pkg = require('../../package.json');

function run(args) {

  let stdout = [];
  let stderr = [];

  return new Promise(resolve => {
      let binPath = path.join(__dirname, '../../dist/react-doc-generator.js')
      fs.chmodSync(binPath, '0777');
      let spawned = spawn(binPath, args);

      spawned.stdout.on('data', data => stdout.push(data));
      spawned.stderr.on('data', data => stderr.push(data));
      spawned.on('close', () => resolve([stdout.join(''), stderr.join('')]));
      spawned.on('error', err => { throw err; } );
  })
}

function loadDoc() {
  return new Promise((resolve, reject) => {
      fs.readFile('./dist/DOCUMENTATION.md', 'utf8', function(err, data) {
          if (err) {
              reject(err);
          } else {
              resolve(data);
          }
      });
  })
}

describe('react-doc-generator', () => {
    it('has the proper console output', () => {
        return run(
            [
              'src/__mocks__',
              '-o',
              './dist/DOCUMENTATION.md'
            ]
        ).then((stdout, stderr) => {
            if (stderr) {
                throw stderr;
            }

            const output = stdout[0];
            const lines = output.split('\n').filter(line => line.length > 0);
            expect(lines[0]).toContain(pkg.version);
            expect(lines[1]).toContain('Marcin Borkowski <marborkowski@gmail.com>');
        });
    }, TEST_TIMEOUT);

    it('return the proper message when given extensions not found', () => {
        return run(
            [
              'src/__mocks__',
              '-o',
              './dist/DOCUMENTATION.md',
              '-x',
              '4hs0,kku4'
            ]
        ).then((stdout, stderr) => {
            if (stderr) {
                throw stderr;
            }

            const output = stdout[0];
            const lines = output.split('\n').filter(line => line.length > 0);
            expect(lines[2]).toContain('Warning');
            expect(lines[2]).toContain('*.4hs0');
            expect(lines[2]).toContain('*.kku4');
        });
    }, TEST_TIMEOUT);

    it('contains help section if no argument is available in query', () => {
        return run(['-o', './dist/DOCUMENTATION.md']).then((stdout, stderr) => {
            if (stderr) {
                throw stderr;
            }

            const output = stdout[0];
            expect(output).toContain('Usage:');
            expect(output).toContain('Options:');
        });
    }, TEST_TIMEOUT);

    describe('output file', () => {
        it('has needed values', () => {
            return run(
                [
                  'src/__mocks__',
                  '-o',
                  './dist/DOCUMENTATION.md',
                  '-t',
                  'MyTitleXYZ'
                ]
            ).then((stdout, stderr) => {
                if (stderr) {
                    throw stderr;
                }

                return loadDoc().then(
                    result => {
                        const lines = result.split('\n');
                        expect(lines[0]).toContain('MyTitleXYZ');
                        expect(result).toContain('Property | Type | Required | Default value | Description');
                        expect(result).toContain(':--- | :--- | :--- | :--- | :---');
                        expect((/^\*\*([a-zA-Z/_.]+)\*\*$/igm).test(result)).toBeTruthy();
                        expect((/^### (.*)$/igm).test(result)).toBeTruthy();
                        expect(lines[lines.length - 2]).toContain(pkg.version);
                        expect(lines[lines.length - 2]).toContain('marborkowski');
                    },
                    reason => {
                        throw reason;
                    }
                );
            });
        }, TEST_TIMEOUT);
    });
});
