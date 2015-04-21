var appControllers = angular.module('appControllers', []);

appControllers.controller('TeamCtrl', function (
    $scope,
    $http,
    MemberSrvc,
    members
) {
    $scope.members = members;
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

        var promise = MemberSrvc.save({
            login: login,
            email: email,
            name: name
        }).$promise;

        promise.then(function (member) {
            $scope.members = MemberSrvc.query();
            $scope.member = {};
        }).catch(function (response) {
            $scope.member.error = response.status;
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };
});


appControllers.controller('MemberCtrl', function (
    $scope,
    $http,
    $location,
    $routeParams,
    MemberSrvc,
    TaskSrvc,
    member
) {
    $scope.member = member;

    $scope.createTask = function () {
        var promise = TaskSrvc.save({
            login: $routeParams.member,
            title: $scope.task.title
        }).$promise;

        promise.then(function () {
            $scope.showTasks();
            $scope.task = {};
        });
    };

    $scope.updateMember = function () {
        MemberSrvc.save({member: $routeParams.member}, $scope.member);
    };

    $scope.deleteMember = function (e) {
        e.preventDefault();

        if (false === confirm('Seguro?')) {
            return;
        }

        MemberSrvc.delete({member: $routeParams.member}).$promise.then(function () {
            $location.path('/');
        });
    };

    $scope.showTasks = function () {
        $scope.tasks = TaskSrvc.query({login: $routeParams.member});
    }

    $scope.showTasks();
});


appControllers.controller('TaskCtrl', function (
    $scope,
    $http,
    $location,
    $routeParams,
    TaskSrvc,
    task
) {
    $scope.task = task;

    $scope.updateTask = function () {
        TaskSrvc.save({task: taskSlug}, $scope.task);
    };

    $scope.deleteTask = function (e) {
        e.preventDefault();

        if (false === confirm('Seguro?')) {
            return;
        }

        var promise = TaskSrvc.delete({task: taskSlug}).$promise;

        promise.then(function () {
            $location.path('/' + task.member.login);
        });
    };
});

