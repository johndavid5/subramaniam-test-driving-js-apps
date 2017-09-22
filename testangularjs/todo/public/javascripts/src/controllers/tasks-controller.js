var TasksController = function(tasksService, $filter){
	var controller = this;

	controller.tasks = [];

	controller.message = '';

	controller.getTasks = function(){
		tasksService.get(
			// User should have registered updateTasks() and updateError()...
			controller.updateTasks,
			controller.updateError
		);
	};

	controller.updateTasks = function(tasks){
		controller.tasks = tasks;
	};

	controller.updateError = function(error_text, error_code){
		controller.message = error_text + " " + "(status: " + error_code + ")";
	};

	controller.sortTasks = function(tasks){
		// Use Angular's $filter...MARV: It's almost too easy...
		var orderBy = $filter('orderBy');	
		//return orderBy(tasks, 'year');
		//return orderBy(tasks, ['year', 'month']);
		//return orderBy(tasks, ['year', 'month','day']);
		return orderBy(tasks, ['year', 'month','day','name']);
	};
};

angular.module('todoapp')
	.controller('TasksController', ['TasksService', '$filter', TasksController]);
