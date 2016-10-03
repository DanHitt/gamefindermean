angular.module('GameFinder')
    .controller('autoCompleteController', ['$timeout', '$scope', '$q', '$log', '$location', 'findStoresFromStateService', function ($timeout, $scope, $q, $log, $location, findStoresFromStateService) {
        $scope.state = null;
        $scope.showStateFinder = true;
        var self = this;
        self.simulateQuery = false;
        self.isDisabled = false;
        // list of states to be displayed
        self.states = loadStates();
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;

        //        self.newState = newState;
        //        function newState(state) {
        //            alert("add new stuff");
        //        }

        function querySearch(query) {
            var results = query ? self.states.filter(createFilterFor(query)) : self.states,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                        deferred.resolve(results);
                    },
                    Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + item.display);
            
            $scope.state = item.display;
            $scope.storeLister= [];
            $scope.showStateFinder = false;
            $scope.findStoreFunc = function () {
                findStoresFromStateService.getStores($scope.state).then(function(response){
                    console.dir('controller then: '+ response);
                    console.log(findStoresFromStateService.storeList);
                    $scope.storeList = findStoresFromStateService.storeList;
                    console.log($scope.storeList);
                    return response.data
                })
            }
            $scope.x = $scope.findStoreFunc();
        }
        //build list of states as map of key-value pairs
        function loadStates() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
                 Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                 Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                 Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                 North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                 South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                 Wisconsin, Wyoming';
            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }
        //filter function for search query
        function createFilterFor(query) {
            console.log("888" + query);
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }


}])
    //            var stateView = function () {
    //                $location.path("#/stores);
    //            }
    //            stateView();