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
			controller: 'TeamCtrl',
			resolve: {
				members: function ($q, $http) {
					return $http.get('/members.json').then(function (res) {
						var members = res.data;
						var promises = [];

						angular.forEach(members, function (member) {
							var promise = $http.get(member.tasks).then(function (res) {
								var tasks = res.data;
								member.tasks = tasks;
							});

							promises.push(promise);
						});

						var promise = $q.all(promises).then(function () {
							return members;
						});

						return promise;
					});
				}
			}
		})
		.when('/:member', {
			templateUrl: '/html/member.html'
		});
}]);