var express = require('express');
var router = express.Router();

//get home page

router.route('/')
    .get(function (req, res) {
        res.render('index', {
            title: 'Express',
            user: req.user
        });
    })