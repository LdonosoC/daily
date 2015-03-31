var appControllers = angular.module('appControllers', []);

appControllers.controller('TeamCtrl', function ($scope, $http) {
    $scope.member = {};

    var isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isLogin = /^[a-z\d_]{4,15}$/i;

    $scope.createMember = function () {
        var email = $scope.member.email || '';
        var login = $scope.member.login || '';
        var name  = $scope.member.name || '';

        if (name.length < 5) {
            return alert('El name está mal');
        }

        if (false === isEmail.test(email)) {
            return alert('El email está mal');
        }

        if (false === isLogin.test(login)) {
            return alert('El login está mal');
        }

        $http.post('/member', {
            login: login,
            email: email,
            name: name
        }).success(function(data, status, headers, config) {
            $scope.showMembers();
            $scope.member = {};
        })
        .error(function(data, status, headers, config) {
            $scope.member.error = status;
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


appControllers.controller('MemberCtrl', function ($scope, $http, $location, $routeParams) {

    $http.get('/member/' + $routeParams.member)
    .success(function (member) {
        $scope.member = member;
    });

    $scope.updateMember = function () {
        $http.post('/member/' + $routeParams.member, $scope.member);
    };

    $scope.deleteMember = function (e) {
        e.preventDefault();

        if (false === confirm('Seguro?')) {
            return;
        }

        $http.delete('/member/' + $routeParams.member)
        .success(function () {
            $location.path('/');
        });
    };

    $http.get('/task?login=' + $routeParams.member).success(function (tasks) {
        $scope.tasks = tasks;
    });
});


appControllers.controller('TaskCtrl', function ($scope, $http, $location, $routeParams) {
    var taskSlug = $routeParams.task;
    var task     = {};

    $http.get('/task/' + taskSlug).then(function (res) {
        task = res.data;

        return $http.get('/member/' + task.member);
    }).then(function (res) {
        task.member = res.data;

        // assign to scope
        $scope.task = task;
    });

    $scope.updateTask = function () {
        $http.post('/task/' + taskSlug, $scope.task);
    };

    $scope.deleteTask = function (e) {
        e.preventDefault();

        if (false === confirm('Seguro?')) {
            return;
        }

        $http.delete('/task/' + taskSlug)
        .success(function () {
            $location.path('/' + task.member.login);
        });
    };
});

