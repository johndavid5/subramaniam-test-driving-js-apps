// Client-Side: use a regular function instead
// of an exported function...
var isPalindrome = function(phrase){

	if( phrase === undefined ){
		throw new Error('Invalid Argument: undefined');
	}

	if( phrase == null ){
		throw new Error('Invalid Argument: null');
	}

	return phrase.trim().length > 0 && phrase.split('').reverse().join('') === phrase;

};
