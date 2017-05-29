describe('locate test', function(){

	it('should register handlers with getCurrentPosition()-using our own mock',
		function(done){

			// Remember the real getCurrentPosition()...
			var original = navigator.geolocation.getCurrentPosition;

			// Can't let locate call the real getCurrentPosition(),
			// since test would be slow, unpredictable, and non-deterministic...
			//
			// So, replace getCurrentPosition() with a test double,
			// in this case, since we're mainly interested 
			// in knowing if locate called its dependency,
			// it will be a mock instead of a stub.
			// (Mocks keep track of interactions and tattletale about them...)
			navigator.geolocation.getCurrentPosition =
				function getCurrentPositionMock(success, error){
					// Check that the passed-in values for the
					// first two arguments are the references
					// to the onSuccess() and onError() functions...
					expect(success).to.be.eql(onSuccess);
					expect(error).to.be.eql(onError);
					done();
				};	

			// locate will innocently call
			// navigator.geolocation.getCurrenPosition()
			//
			// Instead of injecting the dependency into locate(),
			// we sneakily copy the original
			// navigator.geolocation.getCurrentPosition(),
			// replace it with a mock function, then, at the end of the test,
			// replace navigator.geolocation.getCurrentPosition()
			// with the original function.  Ah, the code-o-plasticity
			// of JavaScript...
			locate();

			// Set it back to real getCurrentPosition()...
			// ...If you fail to do this, you bolix up everything...
			// ...that's why we're going to get Sinon to setup
			// and tear down our sandbox...
			navigator.geolocation.getCurrentPosition = original;
	});

	it('should register handlers with getCurrentPosition()-using Sinon mock',
		function(){
			// Mocks keep track of interactions and tattletale about them...
			// ...in this case, it will verify that getCurrentPosition()
			// is called with arguments onSuccess and onError...
			var getCurrentPositionMock = 
					sandbox.mock( navigator.geolocation)
					.expects('getCurrentPosition')
					.withArgs(onSuccess, onError);

			locate();

			getCurrentPositionMock.verify();
			
	});
});
