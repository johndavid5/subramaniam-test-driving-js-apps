var expect = require('chai').expect;

var db = require('../../db');

describe('db tests', function(){

	it('should pass this canary test',
	function(){
		expect(true).to.be.true;
	});

	it('get() should return null connection by default',
	function(){
		expect(db.get()).to.be.null;
	});

	it('close() should set connection to null',
	function(){
		db.close();
		expect(db.connection).to.be.null;
	});

	it('close() should close existing connection',
	function(done){
		// Rather than relying upon the real connection,
		// stub out the connection.close() function
		// to verify that close called connection.close().
		db.connection = {
			close: function closeStub(){
				done();
			}		
		};

		db.close();

		expect(db.connection).to.be.null;
	});

	it('connect() should set connection given valid database name',
	function(done){
		// Verify the "happy path"...using the _actual_
		// -- yes, I said _actual_ -- MongoDb::connect()
		// function...

		// MongoDb's connect() function is asynchronous,
		// so we'll need asynchronous tests.

		var callback = function(err){

			expect(err).to.be.null;

			expect(db.get().databaseName).to.be.eql('todotest');

			db.close();

			done();
		};

		db.connect('mongodb://localhost/todotest', callback);

	});

	it('connect() should reject invalid schema',
			function(done){
		var callback = function(err){
			//expect(err instanceof Error).to.be.true;
			expect(err).to.be.instanceof(Error);
			done();
		};

		db.connect('badschema://localhost/todotest', callback);
	});

	it('connect() should reject invalid dbname',
			function(done){

		var callback = function(err){
			expect(err).to.be.instanceof(Error);
			done();
		};

		db.connect('mongodb', callback);
	});
});

