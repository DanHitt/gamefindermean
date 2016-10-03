var express = requir('express'),
    logoutRoutes = express.Router(),
    User = require('../models/userSchema');

logoutRoutes
.route('/logout')
.get(function(req,res) {
    console.log('logging out ');
    req.logout();
    res.redirect('/');
});