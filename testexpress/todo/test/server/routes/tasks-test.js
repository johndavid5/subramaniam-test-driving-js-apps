var expect = require('chai').expect;
var sinon = require('sinon');
var task = require('../../../models/task');
var express = require('express');

describe('tasks routes tests', function(){
	var sandbox;
	var router;

	beforeEach(function(){
		// Create your stubs...in your sandbox...
		sandbox = sinon.sandbox.create();

		// Replace Router() function of express
		// with a stub that returns a JSON object
		// with three properties: get, post, and delete,
		// each refers to a spy() function--an empty
		// function which will simply record the 
		// parameters when called.
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
		function(){
			expect(router.get.calledWith('/', 
				sandbox.match.any)).to.be.true;
	});
});
