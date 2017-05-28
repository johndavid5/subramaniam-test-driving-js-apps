//var expect = require('chai').expect;
var expect = require('chai').use(require('chai-as-promised')).expect;
// The use() function extends the Chai functions with an eventually
// property...so instead of
//     expect...to.be.eql(...)
// syntax, you can use
//     expect...to.eventually.eql(...)

var linesCount = require('../src/files-john');

describe('test promises', function (){
	it('should return correct lines count for a valid file - using done()',
		function(done){
			var checkCount = function(count){	
				expect(count).to.be.eql(17);
				done();
			};

			linesCount('./src/files-john.js')
			.then(checkCount);
	});

	it('should return correct lines count - using return of a Promise...',
	function(){
		var callback = function(count){
			expect(count).to.be.eql(15);
		}

		return linesCount('src/files.js')
			.then(callback);
	});			

	it('concise!  should return correct lines count - using chai-as-promised::eventually and returning Promise...',
		function(){

		// Simple, huh...?
		// The eventually property tactfully
		// makes the test concise and more expressive.
		//
		// The eventually bundles a Promise that will
		// be resolved if the expression in the expect
		// satisfies the value in the eql.  Otherwise,
		// the Promise will be rejected, resulting in
		// the failure of the test.
		//
		// SPOCK: I have made my request, Captain...
		// All I require from you is that you answer it...!
		//
		return expect(linesCount('src/files.js'))
			.to.eventually.eql(15);

	});			

	// If you're using a testing tool that's unaware of promises,
	// or simply prefer not to return a Promise...
	it('concise!  should return correct lines count - using chai-as_promised::eventually combined with notify(done) rather than returning a Promise...',
	function(done){
		expect(linesCount('src/files.js')).to.eventually.eql(15).notify(done);
	});


	// Negative Test - Promise rejected
	it('should report an error for an invalid file name - use notify(done)',
		function(done){
			// Venkat doesn't use eventually in his version...why...?
			// expect(linesCount('src/flies.js')).to.be.rejected.notify(done);
			expect(linesCount('src/flies.js')).to.eventually.be.rejected.notify(done);
	});

    // Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.
	 // it('should report an error for an invalid file name - use return Promise',
	//	function(done){
	//        this.timeout(10000);
	//		return expect(linesCount('src/flies.js')).to.eventually.be.rejected;
	//  });

	it('should report an error for an invalid file name - using rejectedWith()',
		function(done){
			// Venkat doesn't use eventually in his version...why...?
			// expect(linesCount('src/flies.js')).to.be.rejected.notify(done);
			expect(linesCount('src/flies.js')).to.eventually.be.rejectedWith('unable to open file src/flies.js').notify(done);
	});


});
