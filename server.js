require('node-jsx').install({extension: '.jsx'});
var http = require('http');
var express = require('express');
var React = require('react');
var TodoList = require('./app/todo_list.jsx');

var data = { items: [{id: 1, text: "Create an isomorphic app"}] };

var app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
  React.renderComponentToString(TodoList({initialData: data}), function(html) {
    res.render('index', { app: html, preloadData: data });
  });
});

app.post('/todos', function(req, res) {
  data.items.push(req.body.item);
  res.json({ok: true});
});

app.del('/todos', function(req, res) {
  data.items.splice(req.body.index, 1);
});

var port = process.env.PORT || 3000;
http.createServer(app).listen(port, function() {
  console.log("Listening on http://localhost:" + port);
});
