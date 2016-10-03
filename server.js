//REQUIRE NODE MODULES
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var parser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var exphbs = require('express-handlebars');
var expressValidator = require('connect-flash');
var session = require('express-session');
var mongo = require('mongodb');
var localStrategy = require('passport-local'). Strategy;


var configDB = require('./config/database.js');

//REQUIRE JS MODULES
var storeRoutes = require("./backend/routes/storeRoute");
var longinRoutes = require("./backend/routes/storeRoute");
var User = require("./backend/models/userSchema");
var Store = require("./backend/models/storeSchema");
var Game = require("./backend/models/gameSchema");


//SERVER VARIABLES
var app = express();
var configDB = require('mongodb://localhost/gameFinder');
mongoose.connect(configDB, function () {
    console.log("Mongoose is loose!");
});
require('./config/passport')(passport);



//MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(parser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 



//ROUTES
app.use(express.static(path.join(__dirname, "./")));
app.use("/stores", storeRoutes);

require('./backend/routes/loginRoute.js')(app, passport);





app.set('view engine', 'ejs');





//local server
app.listen(8000, function () {
    console.log("-->port: 8000")
})