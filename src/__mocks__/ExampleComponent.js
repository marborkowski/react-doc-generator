var React = require('react');

/**
 * General component description.
 * fdgdfgdf gfdgfdg fdgfdgdfg
 * gdfgfdgdfg dfgdfgfdg dfg df getDefaultPropsg fdgfd
 * gfdgfdgdfgfdg.
 *
 *
 * Example:
 * ```html
 * <Component name="bebe" />
 * ```
 */
var Component = React.createClass({
  propTypes: {
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
  },

  getDefaultProps: function() {
    return {
      foo: 42,
      bar: 21
    };
  },

  render: function() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
});

module.exports = Component;
