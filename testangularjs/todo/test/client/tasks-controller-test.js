describe('tasks controller tests', function(){

	it('should pass this canary test', function(){
		expect(true).to.be.true;
	});

	//it('should not pass this canary test', function(){
	//	expect(true).to.be.false;
	//});

	var controller;
	var tasksServiceMock;

	beforeEach(module('todoapp'));

	beforeEach(inject(function
	($controller){
		tasksServiceMock = {};

		controller = $controller('TasksController',
		{
			TasksService: tasksServiceMock
		});
	}));

	it('tasks should be empty on create', function(){
		expect(controller.tasks).to.be.eql([]);
	});

	it('message should be empty on create', function(){
		expect(controller.message).to.be.eql('');
	});

	it("getTasks() should interact with the service...calling service's get() function with the proper callback...after registering updateTasks() and updateError() with the controller...",
	function(done){

		controller.updateTasks = function(){};
		controller.updateError = function(){};
		
		tasksServiceMock.get = function(success, error){
			expect(success).to.be.eql(controller.updateTasks);
			expect(error).to.be.eql(controller.updateError);
			done();
		};

		controller.getTasks();
	});
});
