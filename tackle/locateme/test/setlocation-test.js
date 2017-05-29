describe('setLocation() test', function(){
	it('should set the URL into location of window',
		function(){
			// Stub, not a mock, because the test
			// wants to know the state of the dependency
			// after a call to the function under test.
			var windowStub = {};
			var url = 'http://example.com';
			setLocation(windowStub, url);
			expect(windowStub.location).to.be.eql(url);
	});
});
