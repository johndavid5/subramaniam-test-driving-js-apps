var fs = require('fs');

var Stockfetch = function(){
};

Stockfetch.prototype.readTickersFile = function(filename, onError){

	var self = this;

	var processResponse = 
		function(err, data){
			if(err){	
				onError('Error reading file: ' + filename);
			}
			else{
				var tickers = self.parseTickers(data.toString()); 
				self.processTickers(tickers);
			}
		};

	fs.readFile(filename, processResponse);
};

Stockfetch.prototype.parseTickers = function(){};

Stockfetch.prototype.processTickers = function(){};


// ES6
//class Stockfetch {
//	readTickersFile(filename, onError){
//		// For now, just toss the error to pass the error test...
//		onError('Error reading file: ' + filename );
//	}
//}

module.exports = Stockfetch;
