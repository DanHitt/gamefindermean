//REQUIRE NODE MODULES
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
//passport*
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//endpassport*



//REQUIRE JS MODULES
var storeRoutes = require("./backend/routes/storeRoute");
var routes = require("./backend/routes/routes");
//REQUIRE SCHEMAS
var Store = require("./backend/models/storeSchema");
var Game = require("./backend/models/gameSchema");

//SERVER VARIABLES
var app = express();
mongoose.connect("mongodb://localhost/gamefinder", function () {
    console.log("Mongoose is loose!");
})

//MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
//passport*
app.use(bodyParser.urlencoded({
    exended: false
}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//passport config
var Account = require('./backend/models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//endpassport*


//ROUTES
app.use(express.static(path.join(__dirname, "./")));
//passport*
app.use('/login', routes);
//endpassport*
app.use("/stores", storeRoutes);

//passport*
app.use(function (req, res, next) {
    var err = new Error('not fount');
    err.status = 404;
    next(err);
});
//   error print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//endpassport*




//local server
app.listen(8000, function () {
    console.log("-->port: 8000")
})

//passport*
module.export = app;
//endpassport*