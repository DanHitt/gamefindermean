angular.module('GameFinder')
    .controller('gameCompleteController', ['$timeout', '$scope', '$q', '$log', function ($timeout, $scope, $q, $log) {
        var self = this;
        self.simulateQuery = false;
        self.isDisabled = false;
        // list of states to be displayed
        self.states = loadStates();
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;

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
            $log.info('Item changed to ' + JSON.stringify(item));
        }
        //build list of states as map of key-value pairs
        function loadStates() {
            var allStates = 'Magic the Gathering, Settlers of Catan, Seven Wonders, Warhammer, Firefly, Agricola, Puerto Rico, Net Runner, Dungeons and Dragons';
            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }
        //filter function for search query
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }
}])