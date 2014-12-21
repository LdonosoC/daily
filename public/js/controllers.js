var appControllers = angular.module('appControllers', []);

appControllers.controller('TeamCtrl', function ($scope, MembersDB) {

	$scope.getMembers = function () {
		console.log('getMembers');
		MembersDB.allDocs({include_docs: true}).then(function (response) {
			var members = [];

			angular.forEach(response.rows, function(member) {
				this.push(member.doc);
			}, members);

			$scope.$apply(function () {
				$scope.members = members;
			});
		});
	};

	$scope.createMember = function () {
		var member = {
			name: $scope.newMember
		};

		MembersDB.post(member).then(function () {
			$scope.getMembers();
		})
	};

	$scope.getMembers();
});