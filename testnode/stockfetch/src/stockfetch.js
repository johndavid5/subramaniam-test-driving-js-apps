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
 
Stockfetch.prototype.parseTickers = function(rawData){

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

Stockfetch.prototype.processTickers = function(){};


// ES6
//class Stockfetch {
//	readTickersFile(filename, onError){
//		// For now, just toss the error to pass the error test...
//		onError('Error reading file: ' + filename );
//	}
//}

module.exports = Stockfetch;
