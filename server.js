//REQUIRE NODE MODULES
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('connect-flash');
var session = require('express-session');
var mongo = require('mongodb');
var LocalStrategy = require('passport-local'). Strategy;


var configDB = require('./config/database.js');

//REQUIRE JS MODULES
var storeRoutes = require("./backend/routes/storeRoute");
var loginRoutes = require('./backend/routes/loginRoute');
var logoutRoutes = require('./backend/routes/logoutRoute');
var longinRoutes = require("./backend/routes/storeRoute");
var User = require("./backend/models/userSchema");
var Store = require("./backend/models/storeSchema");
var Game = require("./backend/models/gameSchema");


//SERVER VARIABLES
var app = express();
app.set('view engine', 'ejs');
app.get('/', function(req,res){
    res.render('index', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
})
app.listen(8000, function () {
    console.log("-->port: 8000")
})

var configDB = require('mongodb://localhost/gameFinder');
mongoose.connect(configDB, function () {
    console.log("Mongoose is loose!");
});
require('./config/passport')(passport);





//MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session({
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: false,
    resave: false
}));
passport.use(new localStrategy.Strategy(function(username,password, done){//verification function
    User.findBy() //get from database
    if (email === email && password === password){
        done(null, {email: email, password: password})
    } else {
        done(null,null); 
    }
}))
passport.serializeUser(function(user, done){
    //query against the database
    done(user.id)
})

passport.deserializeUser(function(id, done){
    //query database or cache here!
    done(null,{id:id, name:id});
})



//ROUTES
app.use(express.static(path.join(__dirname, "./")));
app.use("/stores", storeRoutes);
app.use('/login', loginRoutes);











