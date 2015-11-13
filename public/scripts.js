$(function() {
			var id;
			//Compile handlebars
			var source = $('#todos-template').html();
			var template = Handlebars.compile(source);
			// client side page info array
			var todosCollection;


			function addTodo(todoList) {
				var html = template({
					todos: todoList
				});
				$('#listCanvas').append(html);
				document.getElementById('todoForm').reset();
			}
		
			$.get('/api/todos', function(data) {
				console.log(data);
				var todoList = data.todos;
				todosCollection = todoList;
				console.log("PUSHEDTDs",todosCollection);
				addTodo(todoList);
			});
			
			$(document).on('click', '.glyphicon-pencil', function(event) {
				event.preventDefault();
				id = $(this).attr('id');
				$('#form' + id).toggle();
				// console.log(id);

				console.log(this);
			});
			
			$('#listCanvas').on('submit', '.submitEdit', function (event) {
				event.preventDefault();
				var todoId = $(this).closest('.glyphicon-pencil').attr('data-id');
				console.log('TODO ID', todoId);
				var todoToUpdate = todosCollection.filter(function(todos) {
					return todos._id == id;
				})[0];
				var editTodo = $(this).serialize();
				console.log("THIS", this);
				console.log("todotoUpdate", todoToUpdate);
			
			$.ajax({
				type: 'PUT',
				url: '/api/todos/' + id,
				data: editTodo,
				success: function(data) {
					console.log("Edited");
					todosCollection.splice(booksCollection.indexOf(todoToUpdate), 1, data);
				}
			});
			});

			$(document).on('click', '.glyphicon-remove', function (event){
				event.preventDefault();
				console.log('clicked');
				var toDelete = todosCollection.filter(function(todos) {
					return todos._id == id;
			})[0];
				var DeleteTodo = $(this);
				console.log("DELETEID",toDelete);

			$.ajax({
				type: 'DELETE',
				url: '/api/todos/' + id,
				success: function(data){
					console.log('Deleted');
				}
			});
			});

			$('#todoForm').on('submit', function (event) {
				event.preventDefault();
				var newTodo = $(this).serialize();
				
				$.post("/api/todos", newTodo, function (data) {
					console.log("Data", data);
					todosCollection.push(data);
					var todos = todosCollection;
					$('#listCanvas').empty();
					console.log("TODOCOLLECTION", todosCollection);
					addTodo(todos);
				});
			
			});
			
			
});