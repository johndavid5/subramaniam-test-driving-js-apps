var fs = require('fs');
var http = require('http');

var Stockfetch = function(){

	this.tickersCount = 0;

	this.http = http;

    // populate like this: { 'GOOG': 127.72, 'IBM': 146.33 }
	this.price = {}; 

    // populate like this: { "GOOG": "D'oh!" }
	this.errors = {}; 

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

// e.g., data = "close,day-range\n" +
//				"625.77002,625.67000-625.77002";
Stockfetch.prototype.parsePrice = function(symbol, data){
	var a_lines = data.split("\n");

	if( a_lines.length >= 2 ){
		var a_fields = a_lines[1].split(",");
		if( a_fields.length >= 1 ){
			var le_price = a_fields[0].trim();
			this.price[symbol] = le_price;
		}
	}

	this.printReport();
};

// Delegates report printing to user-supplied reportCallBack()... 
Stockfetch.prototype.printReport = function(){

	var prices_array = [];
	for( var ticker in this.prices ){
		prices_array.push( [ ticker, this.prices[ticker] ] );
	}

	var errors_array = [];
	for( var ticker in this.errors ){
		errors_array.push( [ ticker, this.errors[ticker] ] );
	}

	// Only do reportCallback() if all the responses have arrived...
	if( prices_array.length + errors_array.length >= this.tickersCount ){
		this.reportCallBack( prices_array, errors_array );
	}
};

// Should be replaced with user-supplied reportCallBack()...
Stockfetch.prototype.reportCallBack = function(){};

Stockfetch.prototype.processError = function(symbol, message){
	this.errors[symbol] = message;
	this.printReport();
};

Stockfetch.prototype.processHttpError = function(ticker, error){
	this.processError(ticker, error.code );
};

// ES6
//class Stockfetch {
//	readTickersFile(filename, onError){
//		// For now, just toss the error to pass the error test...
//		onError('Error reading file: ' + filename );
//	}
//}

module.exports = Stockfetch;
