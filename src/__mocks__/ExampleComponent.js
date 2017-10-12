var React = require('react');
var PropTypes = require('prop-types');

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
     * Description of prop "toe" has one break line
     * here following more comments and has default
     * empty string.
     */
    toe: PropTypes.string,
    /**
     * Description of prop "finger".
     */
    finger: PropTypes.string,
    /**
     * Description of prop "foo".
     */
    foo: PropTypes.number,
    /**
     * Description of prop "bar" (a custom validation function).
     */
    bar: function(props, propName, componentName) {
      // ...
    },
    baz: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
  },

  getDefaultProps: function() {
    return {
      finger: 'medium',
      toe: '',
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
