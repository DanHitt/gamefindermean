var express = require('express'),
    storeRoutes = express.Router(),
    Store = require("../models/storeSchema");

storeRoutes.route("/")
    .get(function (req, res) {
        Store.find({}, function (err, stores) {
            if (err) res.status(500).send(err);
            res.send(stores);
        })
    })
    .post(function (req, res) {
        var newStore = new Store(req.body);
        console.log(newStore);
        newStore.save(function (err, savedStore) {
            if (err) res.status(500).send(err);
            res.send(savedStore);
        })
    })
    .put(function (req, res) {
        res.send("Can't add at this time");
    })
    .delete(function (req, res) {
        res.send("Can't delete at this time");
    });



module.exports = storeRoutes;