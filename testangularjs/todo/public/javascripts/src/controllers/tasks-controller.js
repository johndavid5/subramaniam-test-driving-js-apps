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
};

angular.module('todoapp')
	.controller('TasksController', ['TasksService', TasksController]);
