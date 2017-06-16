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

	it('readTickersFile() should return error if the given file is empty',
	function(done){

		// This test documents our design decision...if parseTickers()
		// returns no ticker symbols, then readTickerFile will
		// report an error.

		var onError = function(err){				
			expect(err).to.be.eql('File tickers.txt has invalid content');
			done();
		};

		// stockfetch::parseTickers() stub returns empty array
		// if input is an empty string...which documents
		// our design decition for parseTickers()...
		sandbox.stub(stockfetch, 'parseTickers').withArgs('').returns([]);

		// fs::readFile() stub simulate readFile reading an empty file...
		sandbox.stub(fs, 'readFile', function(fileName, callback){
			callback(null, '');
		});

		stockfetch.readTickersFile('tickers.txt', onError);

	});

	it('parseTickers() receives an end-of-line delimited string and returns a list of tickers',
      function positiveTestForParseTickers(){			

			var rawData = 
				'GOOG' + '\n' +
				'AAPL' + '\n' + 
				'ORCL' + '\n' + 
				'MSFT';

			var parsedData = ['GOOG', 'AAPL', 'ORCL', 'MSFT'];

			// Synchronous function with no dependencies = easy-peasy...
			expect(stockfetch.parseTickers(	rawData )).to.eql(parsedData);
	});

	it('parseTickers() returns an empty array if content is empty',
      function positiveTestForParseTickers(){			

			// Synchronous function with no dependencies = easy-peasy...
			expect(stockfetch.parseTickers(	"" )).to.be.eql([]);
	});

	it('parseTickers() returns an empty array if content is empty',
      function negativeTestForParseTickers(){			
			expect(stockfetch.parseTickers(	"" )).to.be.eql([]);
	});

	it('parseTickers() returns an empty array upon receiving white-space-only content',
      function negativeTestForParseTickers(){			
			expect(stockfetch.parseTickers(	" \n " )).to.be.eql([]);
	});

	it('parseTickers() handles content with unexpected format',
      function(){			
			var rawData = "AAPL   \n" + // reject due to extraneous whitespace
					  "Blah\n" + // reject because not ALL-CAPS...
					  "GOOG\n\n";

			expect(stockfetch.parseTickers(	rawData )).to.be.eql([ 'GOOG' ]);
	});

	it('processTickers() should call getPrice() for each ticker symbol',
	function (){
		// Interaction tests...

		// We mock stockfetch::getPrice() with expectation
		// that it will be called thrice, with arguments
		// 'MSFT', 'DIS', and 'IBM'...
		var stockFetchMock = sandbox.mock(stockfetch);
		stockFetchMock.expects('getPrice').withArgs('MSFT');
		stockFetchMock.expects('getPrice').withArgs('DIS');
		stockFetchMock.expects('getPrice').withArgs('IBM');

		// ...then verify processTickers() interacts with
		// getPrice() as expected...
		stockfetch.processTickers(['MSFT', 'DIS', 'IBM']);
		stockFetchMock.verify();
	});

	it('processTickers() should save tickers count',
		function(){
			// Using a return-nothing-in-particular
			// cardboard cutout stub for
			// sandbox::getPrice()...
			sandbox.stub(stockfetch, 'getPrice');		

			stockfetch.processTickers(['MSFT', 'DIS', 'IBM']);

			expect(stockfetch.tickersCount).to.be.eql(3);
	});

	it('getPrice() should call get on http with valid URL',
		function(done){
			// Isn't this more of a mock...because
			// it keeps track of interactions...?

			// Make http a property of Stockfetch, thus easier to stub out...
			var httpStub = sandbox.stub(stockfetch.http, 'get',
				function (url){				
					expect(url).to.be.eql('http://johndavidaynedjian.com/finance/GOOG.csv');	
					done();
					// the get() function should return an object with
					// an on property.  So, the stub returns a JSON object
					// that has a dummy on() function.
					return { on: function(){} };
				}
			);

			stockfetch.getPrice('GOOG');

	});

	it('getPrice() should send a response handler to get',
		function(done){

			// Interaction Test: getPrice() should bind()
			// the given 'symbol' to the processResponse()
			// function (along with the context object)
			// and register it as a handler to the
			// http.get() function. 

			var aHandler = function(){};

			// Stub the bind() function of the processResponse()
			// function, assert it recieves the correct context
			// object (first parameter) and the symbol
			// (second parameter).  If arguments to bind()
			// are received as expected, then we return a 
			// stub to represent the result of the call to bind().
			sandbox.stub(stockfetch.processResponse, 'bind')
				.withArgs(stockfetch, 'GOOG')
				.returns(aHandler);

			// Stub the http.get() function, ensuring that
			// what the handler() recieved is what bind()
			// returned.
			var httpStub = sandbox.stub(stockfetch.http, 'get',
				function httpGetStub(url, handler){
					var sWho = "httpGetStub";
					console.log(sWho + "(): url = ", url, ", handler = ", handler );
					expect(handler).to.be.eql(aHandler);
					done();
					return { on: function(){} };
				}
			);

			// Now that we've set up all these stubs...call it!
			stockfetch.getPrice('GOOG');
	});


	it('getPrice() should register handler for failure to reach host',
			function(done){

				// Interaction Test: getPrice() should bind()
				// the given 'symbol' to the processHttpError()
				// function (along with the context object)
				// and register it as the on.error handler for the
				// http.get() function. 

				var errorHandler = function(){};

				sandbox.stub(stockfetch.processHttpError, 'bind')
					.withArgs(stockfetch, 'GOOG')
					.returns(errorHandler);

				var onStub = function(event, handler){
					expect(event).to.be.eql('error');
					expect(handler).to.be.eql(errorHandler);
					done();
				};

				sandbox.stub(stockfetch.http, 'get').returns(
					{on: onStub}
				);

				stockfetch.getPrice('GOOG');
	});

	it('processResponse() should call parsePrice() with valid data',
			function(){
		var dataFunction;
		var endFunction;

		/*
		* processResponse():
		* 1: Must register a 'data' event to gather the data chunks.
		*    from the HTTP responses.
		*
		* 2: ...and another event 'end' that signals there's no more data...
		*
		* 3: Once all data received, processResponse() has to call
		*    the parsePrice() function.
	    */

		// Fabricate a "faux" response object...
		// with statusCode of 200 for success...
		// ...allowing us to grab references to the
		// callbacks that processResponse() registers
		// with the on event of the response object...
		var response = {
			statusCode: 200,
			on: function(event, handler){
				if(event === 'data') dataFunction = handler;
				if(event === 'end') endFunction = handler;
			}
		};

		var parsePriceMock = sandbox.mock(stockfetch)
					.expects('parsePrice').withArgs('GOOG', 'some data');

		stockfetch.processResponse('GOOG', response);
		// Call the callbacks that processReponse() has registered...
		// simulating the actions of HTTP response sessions...
		dataFunction('some ');
		dataFunction('data');
		endFunction();

		// Verify with mock that parsePrice() was called within the
		// processResponse() with the appropriate simulated data...
		parsePriceMock.verify();
	});

	it('processResponse() should call processError() if response failed',
		function(){
			// Faux response object with statusCode 404 - failure...
			var response = { statusCode: 404 };

			var processErrorMock = sandbox.mock(stockfetch)
									.expects('processError')
									.withArgs('GOOG', 404);

			stockfetch.processResponse('GOOG', response);
			processErrorMock.verify();
	});

	it('processResponse() should call processError() only if response failed',
		function(){
			// Faux response object with statusCode 404 - failure...
			var response = {
					statusCode: 200,
					on: function(){}
			};

			var processErrorMock = sandbox.mock(stockfetch)
									.expects('processError')
									.never();

			stockfetch.processResponse('GOOG', response);
			processErrorMock.verify();
	});

	it('processHttpError(ticker, error) should call processError(ticker, error.code) with error details', 
		function(){
			var processErrorMock = sandbox.mock(stockfetch)
										  .expects('processError')
										  .withArgs('GOOG', '...error code...');

			var error = { code: '...error code...' };

			stockfetch.processHttpError('GOOG', error );
			processErrorMock.verify();
	});

	var data = "close,day-range\n" +
				"625.77002,625.67000-625.77002";

	it('parsePrice() should update prices in shared data structure',
		function(){
			stockfetch.parsePrice('GOOG', data);	
			expect(stockfetch.price.GOOG).to.be.eql('625.77002');
	});

	it('parsePrice() should call printReport()',
		function(){
			var printReportMock = sandbox.mock(stockfetch).expects('printReport');
			stockfetch.parsePrice('GOOG', data);
			printReportMock.verify();
	});

	it('processError() should update errors',
		function(){
			stockfetch.processError('GOOG', 'D\'oh!');	
			expect(stockfetch.errors.GOOG).to.be.eql("D'oh!");
	});

	it('processError() should call printReport()',
		function(){
			var printReportMock = sandbox.mock(stockfetch).expects('printReport');
			stockfetch.processError("GOOG", "D'oh!");
			printReportMock.verify();
	});

	it('printReport() should send price and errors via reportCallback() once all reponses arrive...',
		function(){
			stockfetch.prices = {'GOOG': 12.34 };
			stockfetch.errors = {'AAPL': 'error' };
			stockfetch.tickersCount = 2;

			var callbackMock = 
				sandbox.mock(stockfetch)	
					.expects('reportCallBack')
					.withArgs([['GOOG', 12.34]],[['AAPL','error']]); 
			
			stockfetch.printReport();
			callbackMock.verify();
		}
	);

	it('printReport() should not send price and errors via reportCallback() before all reponses arrive...',
		function(){
			stockfetch.prices = {'GOOG': 12.34 };
			stockfetch.errors = {'AAPL': 'error' };
			stockfetch.tickersCount = 3;

			var callbackMock = 
				sandbox.mock(stockfetch)	
					.expects('reportCallBack')
					.never();
			
			stockfetch.printReport();
			callbackMock.verify();
		}
	);

});
