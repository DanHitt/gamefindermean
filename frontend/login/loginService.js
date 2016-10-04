angular
    .module('GameFinder')
    .service('loginService', function ($http) {
        console.log('login...Service: ');

        var that = this;
        
        this.login = function () {
            return $http.get("http://localhost:8000/login").then(function (response) {
                
            })
        }
    })