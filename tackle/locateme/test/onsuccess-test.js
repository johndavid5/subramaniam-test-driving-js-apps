describe('onSuccess() test', function(){
	it('should call createURL() with latitude and longitude', 
		function(){	
			// Spy for createUrl() function...will intercept/sniff
			// and record the parameters passed to the real
			// call, without blocking or circumventing the call...
			// the real function will be executed.
			var createURLSpy = sandbox.spy(window, 'createURL');

			// position object simulates the real Position object
			// that the geolocation API sends...but with
			// minimum data necessary, i.e., position.coords.latitude
			// and position.coords.longitude.
			var position = { 
				coords: { latitude: 40.41, longitude: -105.55 }
			};

			onSuccess(position);

			// Verify that the two expected arguments were passed
			// by the code under test to its dependency,
			// which has been replaced by the spy.
			expect(createURLSpy).to.have.been.calledWith(40.41, -105.55);

	});

	it('should call setLocation() with URL returned by createURL',
		function(){

			var fauxUrl = "http://www.example.com";

			// We're not testing createURL() here,
			// so we can stub it out to return
			// our fauxUrl...
			sandbox.stub(window, 'createURL')
				.returns(fauxUrl);

			// Use a spy for setLocation...we don't mind
			// if the real implementation is called...
			var setLocationSpy =	
				sandbox.spy(window, 'setLocation');

			var position = {
				coords: { latitude: 40.41, longitude: -105.55}
			};

			onSuccess(position);

			expect(setLocationSpy).to.have.been.calledWith(window, fauxUrl);
			
	});
});
