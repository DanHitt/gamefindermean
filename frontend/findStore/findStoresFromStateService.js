angular
    .module('GameFinder')
    .service('findStoresFromStateService', function ($http) {
        console.log('findStores...Service: ');

        var that = this;
        var storeList = [];
        
        this.getStores = function (state) {
            return $http.get("http://localhost:8000/stores").then(function (response) {
                console.log("get stores: "+state);
                that.state = state;
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].address.state === state) {
                        storeList.push(response.data[i])
                    }
                }
                that.stateStoreList = storeList;
                return storeList;
            })
        }
    })