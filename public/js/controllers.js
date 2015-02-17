var appControllers = angular.module('appControllers', []);

appControllers.controller('TeamCtrl', function ($scope, $http) {

    $scope.createMember = function () {
        console.log('crear miembro');
        console.log($scope.member);

        $http.post('/member', $scope.member)
        .success(function(data, status, headers, config) {
            $scope.showMembers();
            $scope.member = {};
        })
        .error(function(data, status, headers, config) {
            console.log('error', data);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.showMembers = function () {
        $http.get('/member').success(function (members) {
            $scope.members = members;
        });
    }

    $scope.showMembers();
});


appControllers.controller('MemberCtrl', function ($scope, $http, $routeParams) {

    $http.get('/member/' + $routeParams.member)
    .success(function (member) {
        $scope.member = member;
    });

    $scope.updateMember = function () {
        $http.post('/member/' + $routeParams.member, $scope.member);
    };
});

