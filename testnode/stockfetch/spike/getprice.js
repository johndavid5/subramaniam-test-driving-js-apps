// A quick and dirty prototype...
var http = require('http');
//var https = require('https');

var getPriceTrial = function(ticker){

	console.log("getPriceTrial(): ticker = " + ticker + "...");

	// Attempt to utilize the finance API, but as of May 2016 or so,
	// this is no longer available
	// unless you use cookie crumbs which are currently only implemented
	// in Python...
	//var url = 'http://ichart.finance.yahoo.com/table.csv?s=' + ticker;

	// Attempt to parse human-readable page, but this serves up a React
	// page, so you'd need to use selenium to scrape it.
  	//var url = "https://finance.yahoo.com/quote/" + ticker + "?p==" + ticker;
	// e.g., https://finance.yahoo.com/quote/GOOG?p==GOOG

	// Keep It Simple, Sam: Simulate fake-o API using the NGINX server serving
	// from the filesystem at my cloud site...
  	var url = "http://johndavidaynedjian.com/finance/" + ticker + ".csv";

	console.log("GET " + url + "...");

	http.get(url,
			function processResponse(response){

				console.log("SHEMP: Moe, response.headers =", response.headers);

				if( response.statusCode === 200 ){

					var data = '';

					var getChunk = function(chunk){
						data += chunk;	
					};

					var onEnd = function(){
						console.log("SHEMP: Moe, received all dha data for " + ticker.toUpperCase() + ":\n" +
						"================\n" 
						);
						console.log( data );
						console.log("=============\n");

					};


					response.on('data', getChunk);

					response.on('end', onEnd);
					
				}/* if( response.statusCode === 200 ) */
				else {
					console.log('error getting data for ' + ticker + ": " +
							"response.statusCode = " + response.statusCode
					);
				}

			}) 
			.on('error', function(err){
					console.log('error getting data for ' + ticker + ': ' +
							'err.code = ' + err.code );
			});


			// Also try running after disconnecting from the network...

}; /* getPriceTrial() */

getPriceTrial('MSFT');
getPriceTrial('IBM');
getPriceTrial('INVALID');
