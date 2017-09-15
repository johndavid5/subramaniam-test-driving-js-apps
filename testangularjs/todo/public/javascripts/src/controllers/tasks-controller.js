var TasksController = function(tasksService){
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
};

angular.module('todoapp')
	.controller('TasksController', ['TasksService', TasksController]);
