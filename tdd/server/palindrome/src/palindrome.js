function isPalindrome(phrase){
	return phrase.split('').reverse().join('') === phrase;
}

module.exports = isPalindrome;
