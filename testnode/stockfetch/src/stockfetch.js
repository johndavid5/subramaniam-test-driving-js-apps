var fs = require('fs');
var http = require('http');

var Stockfetch = function(){

	this.tickersCount = 0;
	this.http = http;

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
				if( tickers.length == 0 ){ 
					onError(`File ${filename} has invalid content`); 
				}
				else {
					self.processTickers(tickers);
				}
			}
	};

	fs.readFile(filename, processResponse);

}; /* readTickersFile() */
 

Stockfetch.prototype.parseTickers = function(rawData){

	var isInRightFormat = function(str){
		return str.trim().length !== 0
			&& str.indexOf(' ') < 0
			&& str.toUpperCase() == str
	};

	return rawData.split('\n').filter(isInRightFormat);

}; /* parseTickers() */
 

Stockfetch.prototype.processTickers = function(tickersArray){

	var self = this;	

	self.tickersCount = tickersArray.length;

	tickersArray.forEach(function(ticker){
		self.getPrice(ticker);	
	});

};

Stockfetch.prototype.getPrice = function(symbol)
{
	var url = 'http://johndavidaynedjian.com/finance/' + symbol + '.csv';

	self = this;

	self.http.get(
		url,
		// Return bind() of context object and argument to this.processResponse()...
		self.processResponse.bind(self, symbol)
	)
	.on('error', self.processHttpError.bind(self, symbol));
	

}; /* getPrice() */

Stockfetch.prototype.processResponse = function(symbol, response){
	var self = this;

	if( response.statusCode === 200 ){
		var data = '';

		response.on('data', function(chunk){ data += chunk; });

		response.on('end', function(){ self.parsePrice(symbol, data); });
	}
	else {
		
		self.processError( symbol, response.statusCode );
		
	}

};

Stockfetch.prototype.parsePrice = function(){};

Stockfetch.prototype.processError = function(){};

Stockfetch.prototype.processHttpError = function(){};

// ES6
//class Stockfetch {
//	readTickersFile(filename, onError){
//		// For now, just toss the error to pass the error test...
//		onError('Error reading file: ' + filename );
//	}
//}

module.exports = Stockfetch;
