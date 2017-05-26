describe('fetch location test', 
	function(){
		it('should get lat and lon from fetchLocation()',
				function(done){
			var onSuccess = function(location){	
				console.log("onSuccess(): location = ", location );
				expect(location).to.have.property('lat');
				expect(location).to.have.property('lon');
				done();
			};

			var onError = function(err){
				throw 'onError(): not expected';
			}

			this.timeout(10000);

			fetchLocation(onSuccess, onError);
		});

		
});
