// A quick and dirty prototype...
var http = require('http');

var getPriceTrial = function(ticker){

	console.log("getPriceTrial(): ticker = " + ticker + "...");

	var url = 'http://ichart.finance.yahoo.com/table.csv?s=' + ticker;

	console.log("GET " + url + "...");

	http.get('http://ichart.finance.yahoo.com/table.csv?s=' + ticker,
			function getHandler(response){

				console.log("SHEMP: Moe, response.headers =", response.headers);

				if( response.statusCode === 200 ){
					var data = '';

					var getChunk = function(chunk){
						data += chunk;	
					};

					var onEnd = function(){
						console.log(`received data for ${ticker.toUpperCase()}`);
						console.log( data );
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

getPriceTrial('GOOG');
getPriceTrial('INVALID');
