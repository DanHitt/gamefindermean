angular.module('GameFinder')
    .controller('loginController', ["$scope", "loginService", function ($scope, loginService) {
        $scope.test = "test";
        $scope.loginFunc = function (email, pwd) {
            loginService.login(email, pwd).then(function (response) {
                $scope.user = loginService.response;
            })
        }
}])