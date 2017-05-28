var expect = require('chai').expect;
var linesCount = require('../src/files-retro');

describe('test retro promises', function (){
	it('should return correct lines count for a valid file',
		function(done){
			var checkCount = function(count){	
				expect(count).to.be.eql(17);
				done();
			};

			linesCount('./src/files-john.js')
			.then(checkCount);
	});
});
