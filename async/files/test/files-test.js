var expect = require('chai').expect;
var linesCount = require('../src/files');

describe('test server-side callbacks suite...', function testSuite(){

//		it('naive test: should return correct lines count for a valid file...except that the assert is never executed...except maybe by dumb luck...',
//			function naiveTest(){
//				// Good try, but this will not actually work...
//				var callback = function(count){
//					// Negative line count: should be false!
//					expect(count).to.be.eql(-2319);
//					expect(count).to.be.eql(-2319);
//				};
//
//				linesCount('src/files.js', callback);
//				console.log("\"From the automation point of view, there's nothing worse than tests that lie.\"");
//			});

		it('smarter test: should return correct lines count for a valid file...trick: have the function accept a done function parameter, and signal doneness via that function...',

			// If a parameter is present -- in this case _done_ --
			// Mocha does not assume a test is done when it completes
			// the test function.  Instead, it waits for a signal
			// through that parameter to decide that the test is done.
			function smarterTest(doneyBunnie){

				var callback = function(count){
					// Negative line count: should be false!
					expect(count).to.be.eql(15);

					// Call done() to signal completion...
					doneyBunnie();
				};

     			// Error: Timeout of 2000ms exceeded. For async
				// tests and hooks, ensure "done()" is called;
				// if returning a Promise, ensure it resolves.

				linesCount('src/files.js', callback);
			});

		it('should report error for an invalid file name',
			function(done){

				// 1: Arrange...

				var onError = function(error){
					// 3: Assert
					expect(error).to.be.eql('unable to open file src/flies.js');
					done();
				};

				// 2: Act...
				linesCount('src/flies.js', undefined, onError);
		});

});
	
