var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoItems');
var Todo = require('./models/todos');


var app = express();

// Set up Body Parser
app.use(bodyParser.urlencoded({ extended : true }));

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

// HOME PAGE ROUTE
app.get('/', function (req, res){
	res.render('index');
});

// Set up routes
app.get('/api/todos', function (req, res){

	Todo.find(function (err, allTodos) {
		res.json({ todos: allTodos });
	});
});

// Finds one todo
app.get('/api/todos/:id', function (req, res){
	var todoId = req.params.id;
	Todo.findOne({_id: todoId}, function (err, foundTodo){
				res.json(foundTodo);
	});

});

app.post('/api/todos',function (req, res) {
	var newTodo = new Todo(req.body);

	newTodo.save(function(err, savedTodo){
			res.json(savedTodo);	
	});
	console.log("new TODO",newTodo);
});

app.put('/api/todos/:id', function (req, res) {
	var todoId = req.params.id;
	Todo.findOne({ _id: todoId }, function (err, foundTodo) {
		foundTodo.task = req.body.task;
		foundTodo.description = req.body.description;
		foundTodo.save(function (err, savedTodo) {
			res.json(savedTodo);
		});
	});
	
});

app.delete('/api/todos/:id', function (req, res){
	var todoId = req.params.id;
	console.log('todoId', todoId);
	Todo.findOneAndRemove({_id : todoId}, function (err, deletedTodo){
		res.json(deletedTodo);
	});
});

// Server listening check 
var server = app.listen(process.env.PORT || 3000, function(){
	console.log("HEY! LISTEN!");
});