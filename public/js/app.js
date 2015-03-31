var app = angular.module('dokifyApp', [
	'ngRoute',
	'ngResource',
	'appControllers',
	'appServices'
]);

app.run(function ($rootScope) {

});

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/html/team.html',
			controller: 'TeamCtrl'
		})
		.when('/:member', {
			templateUrl: '/html/member.html',
			controller: 'MemberCtrl'
		})
		.when('/task/:task', {
			templateUrl: '/html/task.html',
			controller: 'TaskCtrl'
		});
}]);