var React = require('react');
var TodoList = require('./app/todo_list.jsx');

window.React = React;

var data = window.preloadData ? JSON.parse(unescape(window.preloadData)) : [];

React.renderComponent(TodoList({initialData: data}), document.getElementById('app'));
