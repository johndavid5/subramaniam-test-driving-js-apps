var app = angular.module('sampleApp', []);

app.controller('SampleController', function($scope, $filter){
	alert('1.0: processing...');
	$scope.greet = $filter('lowercase')('HELLO');
	//$scope.greet = "hello";
});

//var SampleController = function($filter){
//	var controller = this;
//
//	alert('processing...');
//
//	controller.greet = $filter('lowercase')('HELLO');
//};
