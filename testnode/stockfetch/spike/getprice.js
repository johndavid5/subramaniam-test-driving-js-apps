// A quick and dirty prototype...
var http = require('http');
//var https = require('https');

var htmlparser = require("htmlparser2");

var getPriceTrial = function(ticker){

	console.log("getPriceTrial(): ticker = " + ticker + "...");

	//var url = 'http://ichart.finance.yahoo.com/table.csv?s=' + ticker;
	//var url = 'http://ichart.finance.yahoo.com/table.csv?s=' + ticker;
	// e.g., https://finance.yahoo.com/quote/GOOG?p==GOOG
  	//var url = "https://finance.yahoo.com/quote/" + ticker + "?p==" + ticker;
  	var url = "http://johndavidaynedjian.com/finance/" + ticker + ".csv";

	console.log("GET " + url + "...");

	http.get(url,
			function getHandler(response){

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

						console.log("SHEMP: Moe, let's feed dha data t' htmlparser2...\n");

						parser.write(data);
						parser.end();

					};

					var parser = new htmlparser.Parser({

					    onopentag: function onOpenTag(tagname, attribs){
							var sWho = "onOpenTag";
					        //if(name === "script" && attribs.type === "text/javascript"){
					        //   console.log("JS! Hooray!");
					        //}
							console.log(sWho + "(): tagname = \"" + tagname + "\", attribs = ", attribs );
					    },

					    ontext: function onText(text){
							var sWho = "onText";
					        //console.log("-->", text);
							console.log(sWho + "(): text = \"" + text + "\"...\n");
					    },

					    onclosetag: function onCloseTag(tagname){
							var sWho = "onCloseTag";
					        //if(tagname === "script"){
					        //    console.log("That's it?!");
					        //}
							console.log(sWho + "(): tagname = \"" + tagname + "\"...\n");
					    },

					    onend: function onEnd(tagname){
							var sWho = "onEnd";
					        //if(tagname === "script"){
					        //    console.log("That's it?!");
					        //}
							console.log(sWho + "(): SHEMP: That's all she wrote, Moe...\n");
					    }
					}, {decodeEntities: true});

					//parser.write("Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>");
					//parser.end();

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

//getPriceTrial('GOOG');
getPriceTrial('MSFT');
getPriceTrial('IBM');
getPriceTrial('INVALID');
