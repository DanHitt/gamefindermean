angular.module('GameFinder')
.service('storesInStateService', function($http){
    this.getStore = function() {
        return $http.get()
    }
})