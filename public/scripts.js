$(function() {
	//Compile handlebars
	var source = $('#template').html();
	var template = Handlebars.compile(source);
	// set global id variable
	var id;

	// client side page info array
	var todoList = [];

	$.get('localhost:3000/api/todos', function(){
		todoItems = data.todos;
	});








































});