/**
* @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
* String.prototype.split()
* 
* Note: When the string is empty, split() returns an array containing one empty string,
* rather than an empty array. If the string and separator are both empty strings, an empty
* array is returned.
*/
function splitString(stringToSplit, separator) {

  var arrayOfStrings = stringToSplit.split(separator);

  console.log('The original string is: "' + stringToSplit + '"');
  console.log('The separator is: "' + separator + '"');
  console.log('The array has ' + arrayOfStrings.length + ' elements: ' + arrayOfStrings.join('/'));
}

var tempestString = 'Oh brave new world that has such people in it.';
var monthString = 'Jan, Feb, Mar, Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec';

var space = ' ';
var comma = ',';

splitString(tempestString, space);
splitString(tempestString);
splitString(monthString, comma);	
splitString(monthString, comma+space);	
