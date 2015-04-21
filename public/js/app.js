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
				member: function ($route, MemberSrvc) {
					return MemberSrvc.get({member: $route.current.params.member}).$promise;
				}
			}
		})
		.when('/task/:task', {
			templateUrl: '/html/task.html',
			controller: 'TaskCtrl',
			resolve: {
				task: function ($route, TaskSrvc, MemberSrvc) {
					var task, taskPromise, memberPromise, taskMemberPromise;

					task = TaskSrvc.get({task: $route.current.params.task});
					taskPromise = task.$promise;

					memberPromise = taskPromise.then(function (task) {
						return MemberSrvc.get({member: task.member}).$promise;
					});

					taskMemberPromise = memberPromise.then(function (member) {
						task.member = member;
						return task;
					});

					return taskMemberPromise;
				},
			}
		});
}]);