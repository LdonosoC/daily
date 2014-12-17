var appControllers = angular.module('appControllers', []);

appControllers.controller('TeamCtrl', function ($scope, members) {
	$scope.members = members;
});