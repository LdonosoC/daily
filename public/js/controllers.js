var appControllers = angular.module('appControllers', []);

appControllers.controller('TeamCtrl', function ($scope, $http) {

    $scope.createMember = function () {
        console.log('crear miembro');
        console.log($scope.member);

        $http.post('/member', $scope.member)
        .success(function(data, status, headers, config) {
            console.log('ok', data);
            // this callback will be called asynchronously
            // when the response is available
        })
        .error(function(data, status, headers, config) {
            console.log('error', data);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };
});