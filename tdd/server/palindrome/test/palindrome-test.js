// Use the chai assertion library
// and expect() assertion function...
var expect = require('chai').expect;

var isPalindrome = require('../src/palindrome');

describe('palindrome-test-suite', function palindromeTestSuite(){ 
	it('should pass this canary test',	
		function canaryTest(){
			expect(true).to.eql(true);
		});

	// Positive Test...
	it('should return true for argument "mom"', function(){
		//expect(isPalindrome('mom')).to.be.true;	

		// 3-A's Pattern...

		// Arrange...
		var sInput = 'mom';
		
		// Act...
		var bIsPalindromeOutput = isPalindrome(sInput);
		
		// Assert...
		expect(bIsPalindromeOutput).to.be.true;
	});

	// Positive Test...
	it('should return true for argument "dad"', function(){
		// 3-A's Pattern...

		// Arrange...
		var sInput = 'dad';
		
		// Act...
		var bIsPalindromeOutput = isPalindrome(sInput);
		
		// Assert...
		expect(bIsPalindromeOutput).to.be.true;
	});

	// Negative Test...
	it('should return false for argument "dude"', function(){
		// 3-A's Pattern...

		// Arrange...
		var sInput = 'dude';
		
		// Act...
		var bIsPalindromeOutput = isPalindrome(sInput);
		
		// Assert...
		expect(bIsPalindromeOutput).to.be.false;
	});

	// Positive Test...
	it('should return true for argument "mom mom"', function(){
		// 3-A's Pattern...

		// Arrange...
		var sInput = 'mom mom';
		
		// Act...
		var bIsPalindromeOutput = isPalindrome(sInput);
		
		// Assert...
		expect(bIsPalindromeOutput).to.be.true;
	});

	// Negative Test...
	it('should return false for argument "mom dad"', function(){
		// 3-A's Pattern...

		// Arrange...
		var sInput = 'mom dad';
		
		// Act...
		var bIsPalindromeOutput = isPalindrome(sInput);
		
		// Assert...
		expect(bIsPalindromeOutput).to.be.false;
	});

	// Negative Test...
	it('should return false for argument "" (empty string)', function(){
		// 3-A's Pattern...

		// Arrange...
		var sInput = ''; // empty string
		
		// Act...
		var bIsPalindromeOutput = isPalindrome(sInput);
		
		// Assert...
		expect(bIsPalindromeOutput).to.be.false;
	});


	// Negative Test...
	it('should return false for argument "  " (two spaces)', function(){
		// 3-A's Pattern...

		// Arrange...
		var sInput = '  '; // two spaces
		
		// Act...
		var bIsPalindromeOutput = isPalindrome(sInput);
		
		// Assert...
		expect(bIsPalindromeOutput).to.be.false;
	});

 // Exception Test: should throw an exception...
 it('should throw an exception if argument is missing', function(){

 	var call = function(){
 		isPalindrome();
 	};
 	
 	// Assert...
 	//expect(call).to.throw(Error, 'Invalid argument');
 	expect(call).to.throw(Error, /invalid argument/i);
 });

 it('should throw an exception if argument is null', function(){

	var call = function(){
		isPalindrome(null);
	};
		
	// Assert...
	//expect(call).to.throw(Error, 'Invalid argument');
	expect(call).to.throw(Error, /invalid argument/i);
 });
});
