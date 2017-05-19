function isPalindrome(phrase){
	//if( phrase == undefined ) >>---->
	//== operator covers both undefined and null,
	//but for greater clarity specify === undefined and == null
	if( phrase === undefined || phrase == null ){
		throw new Error('Invalid Argument');
	}

	return phrase.trim().length > 0 && phrase.split('').reverse().join('') === phrase;
}

module.exports = isPalindrome;
