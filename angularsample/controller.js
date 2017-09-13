var app = angular.module('sampleApp', []);

/*
app.controller('SampleController', function($scope, $filter){
	alert('1.0: processing...');
	$scope.greet = $filter('lowercase')('HELLO');
	//$scope.greet = "hello";
});
*/

var SampleController = function($scope,$filter){

	// KARL STROMBERG: You're deluded, Mr. Bond...
	// SUBRAMANIAC: No, I am Subramaniac!

	// Joe Asks: Where's $scope?
	// SUBRAMANIAC: You may wonder about the $scope variable, or the absence of it, // in our code so far. Most AngularJS tutorials misuse a variable with that name.
	// This variable gives an implicit scope and removes the need to explicitly name
	// the controller in HTML pages. Unfortunately, it pollutes the design — the code lacks
	// clarity and it’s easy to introduce errors. Define a controller object and use it
	// with an explicit name for a cleaner design. With this approach, the scope of variables
	// and state is crystal clear. Designing and calling functions on the controller is also
	// a lot cleaner, not to mention the ease of testing.
	//   Subramaniam, Venkat. Test-Driving JavaScript Applications: Rapid, Confident, Maintainable Code
	//   (Kindle Locations 7540-7544). Pragmatic Bookshelf. Kindle Edition. 
	//
	// TRACER: Well...setting controller equal to "this" doesn't seem to do it, Venky, but
	// setting controller equal to $scope does work, and I think it's easier to create
	// directives this way...

	//var controller = this; 
	var controller = $scope;

	//alert('SHEMP: processin\', Moe...');

	controller.greet_input = "HELLO";
	controller.greet_name = "Subramaniac";
	controller.greet = $filter('uppercase')(controller.greet_input.substring(0,1)) + $filter('lowercase')(controller.greet_input.substring(1)) + ", " + controller.greet_name + "!";
	//controller.greet = 'HELLO';
	//$scope.greet = 'HELLO';
};

app.controller('SampleController', SampleController);
