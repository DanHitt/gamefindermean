var express = require('express'),
    loginRoutes = express.Router(),
    User = require("../models/userSchema");

loginRoutes
    .route("/")
    .post(passport.authenticate('local', {
            successRedirect: '/loginSuccess',
            failureRedirect: '/loginFailure'
        }),
        function (req, res) {
            res.redirect('/');
        })

.route('/loginFailure')
    .get(function (req, res, next) {
        res.send('Failed to authenticate');
    })

.route('/loginSuccess')
    .get(function (req, res, next) {
        res.send('Successfully authenticated');
    })

.route("/signup")
    .get(function (req, res) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    })
    .post(passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

.route('/:username/:password')
    .get(function (req, res) {
        var newUser = new User();
        newUser.local.username = req.params.username;
        newuser.local.password = req.params.password;
        console.log(newUser.local.username + " " + newUser.local.password);
        newUser.save(function (err) {
            if (err);
        });

        res.send("Success!");
    })



module.exports = loginRoutes;