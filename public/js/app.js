var app = angular.module('dokifyApp', [
	'ngRoute',
	'appControllers'
]);

app.run(function ($rootScope) {
	console.log('listo!');
});

app.config(['$routeProvider', function($routeProvider) {

}]);