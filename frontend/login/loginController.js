angular.module('GameFinder')
    .controller('loginController', ["$scope", "loginService", function ($scope, loginService) {
        console.log('loginController');
        $scope.test = "test";
        $scope.loginFunc = function (email, pwd) {
            return loginService.login(email, pwd).then(function (response) {
                console.log('loginFunc ');
                $scope.user = loginService.response;
                return $scope.user;
            })
        }
        console.log('** '+$scope.loginFunc);
}])