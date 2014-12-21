var app = angular.module('dokifyApp', [
	'ngRoute',
	'appControllers'
]);

app.run(function ($rootScope) {

});

// app.factory('tasks', [function () {
// 	var db = new PouchDB('tasks');


// 	var changes = db.changes({
// 	  live: true
// 	}).on('change', function(change) {
// 		console.log('changes', change);
// 	});

// 	PouchDB.sync('tasks', 'http://localhost:5984/tasks', {live: true});

// 	return db;
// }]);

app.factory('MembersDB', [function () {
	var db = new PouchDB('members');

	PouchDB.sync('members', 'http://joserobleda.iriscouch.com//members', {live: true});
	return db;
}]);

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: '/html/team.html',
			controller: 'TeamCtrl'
		})
		.when('/:member', {
			templateUrl: '/html/member.html'
		});
}]);