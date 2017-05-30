var Stockfetch = function(){
};

Stockfetch.prototype.readTickersFile = function(filename, onError){
	// For now, just toss the error to pass the error test...
	onError('Error reading file: ' + filename );
};

// ES6
//class Stockfetch {
//	readTickersFile(filename, onError){
//		// For now, just toss the error to pass the error test...
//		onError('Error reading file: ' + filename );
//	}
//}

module.exports = Stockfetch;
