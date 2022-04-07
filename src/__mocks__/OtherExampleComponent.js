// @flow
import React from 'react';

type Component1PropType = {
  foo: number,
  /**
   * Description of prop "bar" (a custom validation function).
   */
  bar: () => void,
  baz: number|string,
  onExit: () => void
}
/**
 * General component description.
 */
export class Component1 extends React.Component<Component1PropType> {

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

type Component2PropType = {
 /**
       * Description of prop "foo".
       */
      foo: number,
      /**
       * Description of prop "bar" (a custom validation function).
       */
      bar: () => mixed,
      baz: number | string,
}
/**
 * General another component description.
 * Blah blah blah...
 * fdfdfsdf
 * fdsfsd
 */
function Component2(props: Component2PropType) {
      return (<div>Hello</div>);
}
Component2.displayName = "DUPA"
export default Component2;
