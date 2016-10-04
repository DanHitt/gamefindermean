angular
    .module('GameFinder')
    .service('loginService', function ($http) {
        console.log('login...Service: ');

        var that = this;

        this.login = function (email, pwd) {
            var obj = {
                username: email,
                password: pwd
            };
            return $http.post("http://localhost:8000/login/login", obj).then(function (response) {
                that.response = response;
                console.log(response);
            })
        }
    })