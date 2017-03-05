import React from 'react';

/**
 * General component description.
 */
export class Component1 extends React.Component {
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
      onExit: React.PropTypes.func
  }

  static defaultProps = {
      foo: 10000099999,
      onExit: () => {
          console.debug('onExit');
      }
  }

  render () {
      return (<div>Hello</div>);
  }
}

/**
 * General another component description.
 * Blah blah blah...
 * fdfdfsdf
 * fdsfsd
 */
class Component2 extends React.Component {
  displayName = "DUPA";
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

  render () {
      return (<div>Hello</div>);
  }
}

export default Component2;
