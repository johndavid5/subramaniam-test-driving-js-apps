var expect = require('chai').expect;
var sinon = require('sinon');
var fs = require('fs');
var Stockfetch = require('../src/stockfetch');

describe('Stockfetch tests', function(){

	var stockfetch;
	var sandbox;

	beforeEach(function(){
		stockfetch = new Stockfetch();
		sandbox = sinon.sandbox.create();
	});

	afterEach(function(){
		sandbox.restore();
	});

	it('should pass this canary test',
		function(){
			expect(true).to.be.true;		
	});

	// Error Handler Test
	it('read should invoke error handler for invalid file',
		function invalidFileTest(done){

			var onError = function(err){
				expect(err).to.be.eql('Error reading file: InvalidFile.txt');
				done();
			};
		
			// Since reading a file is brittle operation,
			// stub out fs::readFile() function to send
			// an error to its callback. 
			// (Stubs are not real implementations, but may
			//  readily return canned responses when called.)
			sandbox.stub(fs, 'readFile',
				function(fileName, callback){
					callback(new Error('failed'));
			});

			stockfetch.readTickersFile('InvalidFile.txt', onError);
	});

});
