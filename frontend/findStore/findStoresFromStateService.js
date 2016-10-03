angular
    .module('GameFinder')
    .service('findStoresFromStateService', function ($http) {
        console.log('findStores...Service: ');

        var that = this;


        this.getStores = function (state) {
            return $http.get("http://localhost:8000/stores").then(function (response) {
                //                console.log("get stores: "+state);
                //                console.log(response.data[0].address.city);
                that.state = state;
                that.storeList = [];
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].address.state === state) {
                        that.storeList.push(response.data[i])
                    }
                }
                return that.storeList;
            })
        }
    })