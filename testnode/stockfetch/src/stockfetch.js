var fs = require('fs');

var Stockfetch = function(){
	this.tickersCount = 0;
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
};
 
Stockfetch.prototype.parseTickersJohn = function(rawData){

	rawData = rawData.trim(); // Covers white-space-only situation, and makes for cleaner output...

	if( rawData.length == 0 ){
		return [];
	}
	else {
		rawArray = rawData.split('\n');

		returnArray = []; 

		rawArray.forEach(function(le_raw_element, le_index, le_array){ 
			var preened_element = le_raw_element.trim().toUpperCase();	

			// returnArray should only contain elements that 
			// when trimmed of whitespace and converted to upper case
			// remain unchanged.
			if(preened_element == le_raw_element ){
				returnArray.push( le_raw_element );
			}
		});

		return returnArray;
	}

	/* Note: When the string is empty, split() returns an array containing one empty string,
	* rather than an empty array. If the string and separator are both empty strings, an empty
	* array is returned.
	*/
};

/* Don't be so smart, Spock, you botched the Acetylcholine test...! */
/* Nice try, Venkat, but this code allows Blah to get through even
 * though it's not in ALL-CAPS
*/
Stockfetch.prototype.parseTickersVenkat = function(rawData){
	var isInRightFormat = function(str){
		return str.trim().length !== 0
			&& str.indexOf(' ') < 0;
	};

	return rawData.split('\n').filter(isInRightFormat);
};
   

Stockfetch.prototype.parseTickersVenkatJohn = function(rawData){
	var isInRightFormat = function(str){
		return str.trim().length !== 0
			&& str.indexOf(' ') < 0
			&& str.toUpperCase() == str
	};

	return rawData.split('\n').filter(isInRightFormat);
};
 

Stockfetch.prototype.parseTickers = Stockfetch.prototype.parseTickersVenkatJohn;

Stockfetch.prototype.processTickers = function(tickersArray){
	var self = this;	

	self.tickersCount = tickersArray.length;

	tickersArray.forEach(function(ticker){
		self.getPrice(ticker);	
	});

};

Stockfetch.prototype.getPrice = function(){};


// ES6
//class Stockfetch {
//	readTickersFile(filename, onError){
//		// For now, just toss the error to pass the error test...
//		onError('Error reading file: ' + filename );
//	}
//}

module.exports = Stockfetch;
