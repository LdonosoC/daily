var appServices = angular.module('appServices', []);

appServices.factory('MemberSrvc', function ($resource) {
    return $resource('/member/:member');
});

appServices.factory('TaskSrvc', function ($resource) {
    return $resource('/task/:task');
});