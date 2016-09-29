angular
    .module("GameFinder")
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "frontend/findStore/findState.html",
                controller: "autoCompleteController",
                controllerAs: "ctrl"
            })
            .when("/state", {
                templateUrl: "frontend/findStore/findStore.html",
                controller: "findState"
            })
            .when("/stores", {
                templateUrl: "frontend/findStore/listAllStores.html"
            })
    });