/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <li onClick={this.handleClick}>
        {this.props.item.text}
      </li>
    );
  },

  handleClick: function() {
    this.props.removeItem(this.props.item);
  }
});
