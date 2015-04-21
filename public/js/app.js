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
			controller: 'TeamCtrl',
			resolve: {
				members: function (MemberSrvc) {
					return MemberSrvc.query().$promise;
				},
			}
		})
		.when('/:member', {
			templateUrl: '/html/member.html',
			controller: 'MemberCtrl',
			resolve: {
				member: function (MemberSrvc, $route) {
					return MemberSrvc.get({member: $route.current.params.member}).$promise;
				}
			}
		})
		.when('/task/:task', {
			templateUrl: '/html/task.html',
			controller: 'TaskCtrl'
		});
}]);