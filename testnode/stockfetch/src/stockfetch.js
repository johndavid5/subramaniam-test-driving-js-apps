var fs = require('fs');
var http = require('http');

var Stockfetch = function(){

	this.tickersCount = 0;

	this.http = http;

    // Populate this.price like a "hashtable":
	// { 'GOOG': 127.72, 'IBM': 146.33 }
	this.prices = {}; 

    // Populate this.error like so: { "GOOG": "D'oh!" }
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
			this.prices[symbol] = le_price;
		}
	}

	this.printReport();

}; /* parsePrice() */


/* e.g., input of
*    {'GOOG': 12.34, 'MOOG': 13.34 }
* leads to output
*    [['GOOG', 12.34], ['MOOG', 13.34]]
*/
Stockfetch.prototype.toArray = function(dataObject){

	var outputArray = [];

	for( var key in dataObject ){
		var value = dataObject[key]; 				
		outputArray.push( [key, value] );
	}

	return outputArray;

}; /* toArray() */



// Delegates report printing to user-supplied reportCallback()... 
Stockfetch.prototype.printReport = function(){

	// Only call reportCallback() if all the responses have arrived...
	if(
		this.tickersCount === 
			Object.keys(this.prices).length + Object.keys(this.errors).length
	){
		this.reportCallback(this.toArray(this.prices), this.toArray(this.errors));
	}
}; /* printReport() */


//Stockfetch.prototype.sortData = function(){
//	return [];
//};

//Stockfetch.prototype.sortData = function(data){
//
//	console.log("sortData(): data =", data );
//
//	var output_array = [];
//
//	for( var ticker in data ){
//		output_array.push( [ ticker, data[ticker] ] );
//	}
//
//	console.log("sortData(): returning ", output_array );
//
//	return output_array;
//};

// Should be replaced with user-supplied reportCallback()...
// ...but this do-nothing callback will prevent any mishaps...
Stockfetch.prototype.reportCallback = function reportCallback(){
	//var sWho = "reportCallback";
	//console.log(sWho + "(): You should replace this with your own Stockfetch.prototype.reportCallback()...\n");
};

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
