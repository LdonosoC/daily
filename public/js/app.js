var app = angular.module('dokifyApp', [
	'ngRoute',
	'appControllers'
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
		});
}]);