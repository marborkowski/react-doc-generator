# React DOC Generator
[![npm version](https://img.shields.io/npm/v/react-doc-generator.svg?style=flat-square)](https://www.npmjs.com/package/react-doc-generator)
[![dependency status](https://img.shields.io/david/marborkowski/react-doc-generator.svg?style=flat-square)](https://david-dm.org/marborkowski/react-doc-generator)

Generate simple React components documentation in [Markdown](https://en.wikipedia.org/wiki/Markdown).


## Usage

Example:

`$ react-doc-generator src -o DOCUMENTATION.md`

Check every option runnig `react-doc-generator` with `--help` or `-h`:

```
$ react-doc-generator --help

Usage: react-doc-generator <dir> [options]

Options:

  -h, --help                      output usage information
  -V, --version                   output the version number
  -x, --extensions <items>        Include only these file extensions. Default: js,jsx
  -i, --ignore <items>            Folders to ignore. Default: node_modules,__tests__,__mocks__
  -e, --exclude-patterns <items>  Filename patterns to exclude. Default: []
  -t, --title [value]>            Document title. Default: 'Components'
  -o, --output <file>             Markdown file to write. Default: 'README.MD'
```

## Terminal

![Terminal](https://raw.githubusercontent.com/marborkowski/react-doc-generator/master/demo/terminal.png)

### License

<sub>MIT License</sub>  
<sub>Copyright (c) 2017 Marcin Borkowski (<marborkowski@gmail.com>)</sub>  
<sub>Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</sub>

<sub>The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.</sub>

<sub>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</sub>
