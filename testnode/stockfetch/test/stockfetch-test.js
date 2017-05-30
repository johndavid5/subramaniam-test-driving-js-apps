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
	it('readTickersFile() should invoke error handler for invalid file',
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

	it('readTickersFile() should invoke processTickers() for valid file',
		function(done){
			/* Implement the readTickersFile() function in a way it uses
			* the parseTickers() and processTickers() functions
			* but without actually implementing those functions.
			*/
			var rawData = 
				'GOOG' + '\n' +
				'AAPL' + '\n' + 
				'ORCL' + '\n' + 
				'MSFT';

			var parsedData = ['GOOG', 'AAPL', 'ORCL', 'MSFT'];

			// Stub out stockfetch::parseTickers() to expect
			// the canned 'rawData' and, if and when it does receive
			// the canned 'rawData' as its argument, 
			// return the parsedData -- array of ticker symbols
			// as canned data.
			sandbox.stub(stockfetch, 'parseTickers')
				.withArgs(rawData).returns(parsedData);

			// Assert that the parameter received is
			// equal to the canned data that was
			// returned by the parseTickers() stub.
			sandbox.stub(stockfetch, 'processTickers',
				function(data){
					expect(data).to.be.eql(parsedData);
					// Signal completion of asynchronous callback...
					done();
				}
			);

			// Stub out fs::readFile() so it always
			// returns the canned rawData to the callback.
			sandbox.stub(fs, 'readFile', 
				function(fileName, callback){
					callback(null, rawData);
				}
			);

			// Happy path, so don't need to send
			// second argument, the onError callback...
			stockfetch.readTickersFile('tickers.txt');

	});

});
