var http = require('http');

var getPriceTrial = function(ticker){ 

	//var url = 'http://ichart.finance.yahoo.com/table.csv?s=' + ticker;
	//var url = 'https://ichart.finance.yahoo.com/table.csv?s=' + ticker;
	// e.g., https://finance.yahoo.com/quote/GOOG?p==GOOG
  	var url = "https://finance.yahoo.com/quote/" + ticker + "?p==" + ticker;
	
	console.log("url = " + url + "...");
	
	var options = {
	    url: url,
	    method: 'GET'
	};
	
	http.request(options, function (error, response, body) {
	
	        if (error) {
	            return console.error('request failed:', error);
	        }
	
	        //if (response.headers['content-length']) {
	        //    var file_size = response.headers['content-length'];
	        //    console.log(file_size);
	        // }
	
			console.log("response.headers = ", response.headers );
	
			console.log("body = ", body ); 
	    }
	);

}; /* getPriceTrial() */

getPriceTrial('GOOG');
