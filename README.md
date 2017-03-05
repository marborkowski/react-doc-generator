# React DOC Generator
[![npm version](https://img.shields.io/npm/v/react-doc-generator.svg?style=flat-square)](https://www.npmjs.com/package/react-doc-generator)
[![dependency status](https://img.shields.io/david/marborkowski/react-doc-generator.svg?style=flat-square)](https://david-dm.org/marborkowski/react-doc-generator)
[![build status](https://img.shields.io/travis/marborkowski/react-doc-generator.svg?style=flat-square)](https://travis-ci.org/marborkowski/react-doc-generator)

Generate simple React components documentation in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

## Installation

`$ npm install -save-dev react-doc-generator`

## Usage

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

### By the command line

Example:

`$ react-doc-generator src -o DOCUMENTATION.md`

### NPM script

Example:

In your `package.json` put:
```
{
  // ...
  "scripts": {
    "doc": "react-doc-generator ./app/components/custom -o DOCUMENTATION.md"
  }
  // ...
}
```

so then you are able to call this script by the command line:

`$ npm run doc`

## API

```js
/**
 * General component description.
 * You can even use the native Markdown here.
 * E.g.:
 * ```html
 * <MyComponent foo={541} />
 * ```
 */
export class MyComponent extends React.Component {
  static displayName = 'Official Component Name'
  static propTypes = {
      /**
       * Description of prop "foo".
       */
      foo: React.PropTypes.number,
      /**
       * Description of prop "bar" (a custom validation function).
       */
      bar: function(props, propName, componentName) {
        // ...
      },
      baz: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]),
  }

  static defaultProps = {
      foo: 10000099999
  }

  render () {
      return (<div>Hello</div>);
  }
}
```

Because [**react-doc-generator**](https://github.com/marborkowski/react-doc-generator) uses [**react-docgen**](https://github.com/reactjs/react-docgen) library, you can [follow other examples here](https://github.com/reactjs/react-docgen).

## Demo

  * [Example output](https://github.com/marborkowski/react-doc-generator/blob/master/demo/DOCUMENTATION.md)

## Terminal

This is an example of what you'll see in your terminal.

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
