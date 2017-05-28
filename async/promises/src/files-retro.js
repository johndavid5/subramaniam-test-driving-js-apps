// This is one of my own personal hacks.
//
// Try using the traditional callback version
// of the "fs" module(as in ./async/files/rc/files.js),
// but return "retrofitted" promises...
var fs = require('fs');

// Try to follow example from...
// https://benmccormick.org/2015/12/30/es6-patterns-converting-callbacks-to-promises/
const fetch = (url, options = {method:'get'}) => new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();  
    request.onload = resolve
    request.onerror = reject;
    request.open(options.method, url, true);  
    request.send();
});

const linesCount = (fileName) => new Promise((resolve, reject) => {

	var processFile = function(err, data){
		if(err){
			reject(new Error('unable to open file ' + fileName));	
		}
		else{
			resolve(data.toString().split('\n').length);
		}
	};

	fs.readFile(fileName, processFile);
});

/* Or example from ... https://stackoverflow.com/questions/22519784/how-do-i-convert-an-existing-callback-api-to-promises */
function getUserDataAsync(userId){
    return new Promise(function(resolve,reject){
         getUserData(userId,resolve,reject);
    });
}

var linesCountNoArrows = function(fileName) {

	return new Promise( function(resolve, reject){

	var processFile = function(err, data){
		if(err){
			reject(new Error('unable to open file ' + fileName));	
		}
		else{
			resolve(data.toString().split('\n').length);
		}
	};

	fs.readFile(fileName, processFile);
  });
};

module.exports = linesCountNoArrows;

