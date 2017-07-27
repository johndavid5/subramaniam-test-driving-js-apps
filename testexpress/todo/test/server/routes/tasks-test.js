var expect = require('chai').expect;
var sinon = require('sinon');
var task = require('../../../models/task');
var express = require('express');

describe('tasks routes tests', function(){

	var sandbox;
	var router;

	var DEBUG = true;

	beforeEach(function(){
		// Create your stubs...in your sandbox...
		sandbox = sinon.sandbox.create();

		// Replace Router() function of express
		// with a stub that returns a JSON object
		// with three properties: get, post, and delete,
		// each refers to a spy() function--an empty
		// function which will simply record the 
		// parameters when called.
		//
		// @reference: http://sinonjs.org/releases/v2.3.7/spies/
		sandbox.stub(express, 'Router').returns({
			get: sandbox.spy(),	
			post: sandbox.spy(),
			delete: sandbox.spy()
		});

		// When routes/tasks.js calls require(express),
		// the code in routes/tasks.js will use the
		// stub instead of the original Router function.
		// ...because the test has already required this
		// file and stubbed the Router.  Slick, eh?
		router = require('../../../routes/tasks');
			
	});

	afterEach(function(){
		// Dismantle your sandbox, restore back
		// to normal...
		sandbox.restore();
	});	

	it('should register URI / for get',
		// We stubbed out router.get() to be 
		// a spy, so it's simple to verify
		// that it was called with args '/', anything.
		function(){
			expect(router.get.calledWith('/', 
				sandbox.match.any)).to.be.true;
	});

	// Helper function that returns a "stub" for the
	// res::send(). Stub verifies that
	// the data it receives is equal to an expected
	// value and signals a completion of the test by
	// calling done().  Actually this is more of
	// a "mock" in that it tattletales and verifies,
	// n'est-ce pas?
	var stubResSend = function(expected, done){
		return {
			send: function sendTattler(data){	
				var sWho = "sendTattler";
				if( DEBUG ){	
					console.log(sWho + "(): data = ", data );
				}
				expect(data).to.be.eql(expected);	
				done();
			}
		};
	};

	it("GET / handler should call model's all() method " +
		"& return result",

		function(done){

			var sampleTasks = [
				{name: 't1', month: 12, day: 1, year: 2016},
				{name: 't2', month: 12, day: 2, year: 2016}
			];

			// Stub out task.all() in model/task.js,
			// returning a canned response...so
			// you won't hafta hit up the database...
			//
			// HANS: Hit it again.
			//
			// McCLEAN: We already hit up the database, Hans,
			// when testing out model/task.js, so there's no
			// need to hit it here...
			sandbox.stub(task, 'all', function(callback){
				callback(null, sampleTasks);
			});

			var req = {};
			var res = stubResSend(sampleTasks, done);

			// Ask the sinon.spy() filling in for router.get()
			// to give us the second argument passed to
			// its first call...this is the routes handler.
			var registeredCallback = router.get.firstCall.args[1];

			// Call the routes handler with JSON stub for _req_
			// and _res_ stub that we created via stubResSend().
			registeredCallback(req, res);
	});

	it('should register URI /:id for get()', function(){
		// Ask our spy() if router.get() was called 	
		// with args '/:id', anything...
		expect(router.get.calledWith('/:id', sandbox.match.any)).to.be.true;
	});

	it("get() /:validid handler should call model's get() & return a task",
		function(done){
			var sampleTask = {name: 't1', month: 12, day: 1, year: 2016};
			sandbox.stub(task, 'get', function(id, callback){
				expect(id).to.be.eql(req.params.id);
				callback(null, sampleTask);
			});

			var req = {params: {id: 1}};
			var res = stubResSend(sampleTask, done);

			// Relies on implementation detail
			// order of registration...
			var registeredCallback = 
				router.get.secondCall.args[1];

			registeredCallback(req, res);
	});

	it("get() /:invalidid handler should call model's get() & return a friendly {}",
		function(done){

			var sampleTask = {};

			sandbox.stub(task, 'get', function(id, callback){
				expect(id).to.be.eql(req.params.id);
				callback(null, null);
			});

			var req = {params: {id: 2319}};
			var res = stubResSend(sampleTask, done);

			// Relies on implementation detail
			// order of registration...
			var registeredCallback = 
				router.get.secondCall.args[1];

			registeredCallback(req, res);
	});

	it('should register URI / for POST', function(){
		expect(router.post.calledWith('/',
			sandbox.match.any)).to.be.true;
	});

	it("POST / handler should call model's add() and return success message", function(done){

		// Fetch the registered callback, and verify that
		// it calls the add() function of the task model.
		// ...brings the implementation into the handler
		// registered for POST...
		var sampleTask = {name: 't1', month: 12, day: 1, year: 2016};

		sandbox.stub(task, 'add', function(newTask, callback)
		{
			expect(newTask).to.be.eql(sampleTask);
			callback(null);
		});

		var req = { body: sampleTask };
		var res = stubResSend('task added', done);

		var registeredCallback = 
			router.post.firstCall.args[1];

		registeredCallback(req, res);
	});

		

});
