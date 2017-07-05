var expect = require('chai').expect;
var db = require('../../../db');
var ObjectId = require('mongodb').ObjectId;
var task = require('../../../models/task');
var validateTask = require('../../../public/javascripts/common/validate-task');

describe('task models tests', function()
{
	var sampleTask;
	var sampleTasks;
	var debug = 0; 

	// before() and after() with Mocha's watch option: keeps database
	// connection open only when necessary 

	// before() all tests...
	before(function(done){
		// Create a DB connection to 'todotest' before any tests run...
		db.connect('mongodb://localhost/todotest', done);	
	});

	// after() all tests...
	after(function(){
		// Close the connection at the end of the last test...
		db.close();
	});

	// Helper function to creat id of type
	// ObjectId expected by MOngoDB.
	var id = function(idValue){
		return new ObjectId(idValue);
	};

	// Before each test, create a test fixture of
	// sample tasks and insert them into the tasks
	// collection of the database.
	beforeEach(function(done){

		// Single canned task...use later for testing the add() function...
		sampleTask = {name: 'a new task', month: 12, day: 10, year: 2016 };

		sampleTasks = [
			{_id: id('123412341240'), name: 'task1', month: 10, day: 5, year: 2016},	
			{_id: id('123412341241'), name: 'task2', month: 11, day: 2, year: 2016},	
			{_id: id('123412341242'), name: 'task3', month: 12, day: 8, year: 2016},	
			
		];

		db.get().collection('tasks').insert(sampleTasks, done);
	}); /* beforeEach() */

	// Wipe out the 'tasks' collection after each test...
	afterEach(function(done){
		db.get().collection('tasks').drop(done);
	});

	it('all() should return all the tasks',
		function allTest(done){

			var callback = function allTestCallback(err, tasks){

				var sWho ="allTestCallback";

				if( debug ){
					console.log(sWho + "(): err = ", err );
					console.log(sWho + "(): tasks = ", tasks );
				}
				expect(tasks).to.be.eql(sampleTasks);
				done();
			};

			task.all(callback);

		}/* allTest() */
	); 

	it('get() should return task with a given id',
		function getTest(done){

			var ourCallback = function getTestCallback(err, task){

				var sWho ="getTestCallback";

				if( debug ){
					console.log(sWho + "(): err = ", err );
					console.log(sWho + "(): task = ", task );
				}
				expect(task.name).to.be.eql('task1');
				expect(task.month).to.be.eql(10);
				expect(task).to.be.eql(sampleTasks[0]);
				done();
			};

			task.get('123412341240', ourCallback);

		}/* getTest() */
	); 

	it('get() should return null for non-existing task...',
		function getNullTest(done){

			var ourCallback = function getNullCallback(err, task){

				var sWho ="getNullCallback";

				if( debug ){
					console.log(sWho + "(): err = ", err );
					console.log(sWho + "(): task = ", task );
				}
				//expect(task).to.be.eql(null);
				expect(task).to.be.null;
				done();
			};

			task.get(90210, ourCallback);

		}/* getNullTest() */
	); 

	it('add() should return null error for valid task, and should see new task in database...',
		function (done){

			var ourCallback = function addTestCallback(err){

				var sWho ="addTestCallback";

				if( debug ){
					console.log(sWho + "(): err = ", err );
					console.log(sWho + "(): task = ", task );
				}
				expect(err).to.be.null;

				task.all(function(err, tasks){
					// Confirm that fourth item returned from all() to be equal to the new task...
					expect(tasks[3].name).to.be.equal('a new task');
				});

				done();
			};

			task.add(sampleTask, ourCallback);

		}/* getNullTest() */
	); 

	var expectError = function(message, done){
		return function expect_error(err){
			
			var sWho = "expect_error";

			if( debug ){
				console.log(sWho + "(): outer: message = ", message);
				//console.log(sWho + "(): outer: done = ", done );
				console.log(sWho + "(): err.message = ", err.message );
				console.log(sWho + "(): err = ", err );
			}

			expect(err.message).to.be.eql(message);
			done();
		}
	};

	it('add() should return Error if task already exists',
		function(done){
			sampleTask = sampleTasks[0];	
	
			delete sampleTask._id;

			task.add(sampleTask, expectError('duplicate task', done));
	});

	it('validate() should refer to common validateTask()',
			function(){
		expect(task.validate).to.be.eql(validateTask);	
	});

	it('add() should call validate()',
		function(done){
			validateCalled = false;	

			// Create a spy for the validate property...
			task.validate = function spyForValidateProperty(task){

				// spy asserts that attached function is called
				// with the task sent to the add() function
				expect(task).to.be.eql(sampleTask);

				// Signal that spy was called by setting validateCalled flag...
				validateCalled = true;

				return validateTask(task); 
			};

			// Call add() function with sample task and no op/empty 
			// callback (but important for the test, because it calls
			// done()...)
			task.add(sampleTask, done);

			expect(validateCalled).to.be.true;

			// Clean up your mess.  Replace spy with original
			// reference to the validateTask() function...
			task.validate = validateTask;
	});

	it('add() should handle validation failure',
		function(done){
			// Setup onError callback to validate proper error
			// message is received...
			var onError = function onErrorCallback(err){
				expect(err.message).to.be.eql('D\'oh!  Unable to add task.');
				done();
			};			

			// Stub (hijack) the validate() property, returning
			// false to pretend the given task is invalid.
			// Kinda like Hogan's Heroes intercepting a call
			// to headquarters, eh...?
			task.validate = function(task){
				return false;
			};

			task.add(sampleTask, onError);	

			// Clean up our mess: Set task.validate() back
			// equal to validateTask()
			task.validate = validateTask;
	});

});


