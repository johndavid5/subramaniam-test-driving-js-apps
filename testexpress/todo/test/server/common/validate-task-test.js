var expect = require('chai').expect;
var validateTask = require('../../../public/javascripts/common/validate-task'); 

describe('validate task tests', 
	function validateTheValidator(){

		var sampleTask;

		// Helper function...set a given property
		// on sampleTask to given value and assert
		// validateFunction() returns false.
		var expectFailForProperty =
			function(property, value){
				sampleTask[property] = value;
				expect(validateTask(sampleTask)).to.be.false;
		};

		// Create a sample task with all essential properties.
		beforeEach(function(){
			sampleTask = { name: 'a new task',
				month: 12, day: 10, year: 2016 };							
		});

		it('should return true for valid task (sampleTask).',
			function(){
				expect(validateTask(sampleTask)).to.be.true;
		});

		it('should return false for undefined task.',
			function(){
				expect(validateTask(undefined)).to.be.false;
		});

		it('should return false for null task.',
			function(){
				expect(validateTask(null)).to.be.false;
		});

		it('should return false for undefined name.',
			function(){
				expectFailForProperty('name', undefined );
		});

		it('should return false for null name.',
			function(){
				expectFailForProperty('name', undefined );
		});

});
