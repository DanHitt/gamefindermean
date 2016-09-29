//REQUIRE NODE MODULES
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var parser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');


//REQUIRE JS MODULES
var storeRoutes = require("./backend/routes/storeRoute");
var Store = require("./backend/models/storeSchema");
var Game = require("./backend/models/gameSchema");

//SERVER VARIABLES
var app = express();
mongoose.connect("mongodb://localhost/test", function (){
    console.log("Mongoose is loose!");
})

//MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(parser.json());

//ROUTES
app.use(express.static(path.join(__dirname, "./")));
app.use("/stores", storeRoutes);




//local server
app.listen(8000, function () {
    console.log("-->port: 8000")
})