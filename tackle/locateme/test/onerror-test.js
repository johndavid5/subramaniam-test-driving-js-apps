describe('onError() test', function(){
	it('should set the error DOM element', function(){

		// A simple JSON object that stubs
		// the DOM element the code under
		// test suspects.
		var fauxDomElement = {innerHTML: ''};
		
		// Stub for document.getElementById():
		// (Stubs are not real implementations
		//  but may readily return canned 
		//  responses when called.  Stubs are
		//  used to verify state.  Mocks
		//  are used to verify behavior.)
		// Stub checks that the request
		// came in for the id 'error'
		// and return the domElement
		// in response to the call.
		sandbox.stub(document, 'getElementById')
				.withArgs('error')
				.returns(fauxDomElement);

		var leMessage = "you're kidding";

		// fauxPositionError is a lightweight JSON
		// object standing in for the PositionError
		// instance that the onError() function expects.
		var fauxPositionError = { message: leMessage };

		onError(fauxPositionError);

		expect(fauxDomElement.innerHTML).to.be.eql(leMessage);

	});
});
