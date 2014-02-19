/** @jsx React.DOM */

var React = require('react');
var TodoListItem = require('./todo_list_item.jsx');

var superagent = require('superagent');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          {this.state.items.map(function(item, i) {
            return <TodoListItem key={i} item={item} removeItem={this.removeItem} />
          }.bind(this))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type='text' ref='input' />
          <button>Add</button>
        </form>
      </div>
    );
  },

  getInitialState: function() {
    if (this.props.initialData) {
      return this.props.initialData;
    } else {
      return { items: [] };
    }
  },

  removeItem: function(item) {
    var items = this.state.items;
    var index = items.indexOf(item);
    if (index > -1) {
      items.splice(index, 1)
      this.setState({items: items});
      superagent
        .del('/todos')
        .send({index: index})
        .end();
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var items = this.state.items;
    var newItem = {text: this.refs.input.getDOMNode().value};
    items.push(newItem);
    this.setState({items: items});
    this.refs.input.getDOMNode().value = '';
    superagent
      .post('/todos')
      .send({item: newItem})
      .end();
  }
});
