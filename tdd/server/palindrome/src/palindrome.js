function isPalindrome(phrase){
	//if( phrase == undefined ) >>---->
	//== operator covers both undefined and null,
	//but for greater clarity specify === undefined and == null
	if( phrase === undefined ){
		throw new Error('Invalid Argument: undefined');
	}

	if( phrase == null ){
		throw new Error('Invalid Argument: null');
	}

	return phrase.trim().length > 0 && phrase.split('').reverse().join('') === phrase;
}

module.exports = isPalindrome;
