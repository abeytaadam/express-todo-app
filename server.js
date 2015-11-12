var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Set up Body Parser
app.use(bodyParser.urlencoded({ extended : true }));

var todoList  = [
								{
								task : "Buy bread",
								description : "Obtain consumable wheat product, sliced",
								_id : 1},{
								task : "Buy bananas",
								description : "Obtain consumable fruit product, whole",
								_id : 2},{
								task : "Buy peanut butter",
								description : "Obtain consumable legume product, whipped",
								_id : 3
								}];

// Set up routes
app.get('/api/todos', function (req, res){
	res.json(todoList);
});

app.get('/api/todos/:id', function (req, res){
	var todoId = parseInt(req.params.id);
	var foundTodo = todoList.filter(function (todo){
		return todos._id == todoId;
	});
	res.json(foundTodo);
});

app.post('/api/todos',function (req, res) {
	var newTodo = req.body;
	if (todoList.length > 0) {
		newTodo._id = todoList[todoList.length - 1]._id + 1;
	} else {
		newTodo._id = 1;
	}
	todoList.push(newTodo);
	res.json(newTodo);
});

app.put('/api/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id);
	var todoToUpdate = todoList.filter(function (todo){
		return todo._id === todoId;
	})[0];
	todoToUpdate.task = req.body.task;
	todoToUpdate.description = req.body.description;
	res.json(todoToUpdate);
});

app.delete('/api/todos/:id', function (req, res){
	var todoId = parseInt(req.params.id);
	var todoToUpdate = todoList.filter(function (todo){
		return todo._id === todoId;
	})[0];
	var todoIndex = myTodos.indexOf(todoToDelete);
	myTodos.splice(todoIndex, 1);
	res.json(todoToDelete);
});

// Server listening check 
var server = app.listen(process.env.PORT || 3000, function(){
	console.log("HEY! LISTEN!");
});