// Mocha test file--by default Mocha
// looks for tests in the ./test directory.

// Use the chai assertion library
// and expect() assertion function...
var expect = require('chai').expect;

// The class that we're testing...
var Util = require('../src/util');

// Below is a test suite - a cohesive
// collection of tests that verify behavior
// of either one function or a small group
// of closely related functions.
//
// 'describe': Mocha keyword to define a test suite.
//   'it': Mocha keyword to define a test within a suite.
//
// describe('', function (){
//    it('', function one(){});
//    it('', function two(){});
//	  ...
// );
describe('util tests', function utilTestSuite(){ 
	it('should pass this canary test',	
		function canaryTest(){
		expect(true).to.eql(true);
		});

	var util;

	// beforeEach() and afterEach() are "sandwich
	// functions--they're executed around each of
	// the tests in the suite.
	beforeEach(function beforeEachFunction(){
		// Each test gets a fresh instance
		// of Util created just in time for
		// its run.
		util = new Util();
	});

	it('should pass if f2c() returns -40C for -40F',
		function(){
			var fahrenheit = -40; // Arrange

			var celsius = util.f2c(fahrenheit); // Act 

			expect(celsius).to.eql(-40); // Assert
	});

	it('should pass if f2c() returns 0C for 32F',
		function(){
			var fahrenheit = 32; // Arrange

			var celsius = util.f2c(fahrenheit); // Act 

			expect(celsius).to.eql(0); // Assert
	});

	it('should pass if f2c() returns 10C for 50F',
		function(){
			var fahrenheit = 50; // Arrange

			var celsius = util.f2c(fahrenheit); // Act 

			expect(celsius).to.eql(10); // Assert
	});

	it('should pass if f2c() returns 100C for 212F',
		function(){
			var fahrenheit = 212; // Arrange

			var celsius = util.f2c(fahrenheit); // Act 

			expect(celsius).to.eql(100); // Assert
	});

	afterEach(function afterEachFunction(){
			
	});
});
